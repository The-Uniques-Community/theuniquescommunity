import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9228;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\chrome-lead'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const newTabRes = await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:5173/community-main`, { method: 'PUT' });
    const tab = await newTabRes.json();
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let id = 1;
    const pending = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    };

    await new Promise(r => ws.onopen = r);
    const send = (method, params = {}) => new Promise(resolve => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    await new Promise(r => setTimeout(r, 2000));

    // Mobile viewport 375x812
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 1,
      mobile: true
    });

    const positions = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        const r2 = sliding?.getBoundingClientRect();
        return { slidingTop: r2 ? r2.top + window.scrollY : null };
      })()`
    });

    // Scroll to show Card 3 (Lead Project Development) which is step = 2 (around scroll 320px into sliding)
    const targetY = (positions.result?.result?.value?.slidingTop || 5500) + 330;
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${targetY})`
    });
    await new Promise(r => setTimeout(r, 600));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot.result?.data) {
      writeFileSync(`C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\lead_project_card.png`, Buffer.from(shot.result.data, 'base64'));
      console.log('Saved lead_project_card.png');
    }

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
