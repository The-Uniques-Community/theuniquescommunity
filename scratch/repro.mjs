import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9227;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\chrome-repro'
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

    // Find position of SlideCard navigation buttons and Sliding section
    const positions = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const slideCard = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Benefits You will Get'))?.closest('div');
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        const r1 = slideCard?.getBoundingClientRect();
        const r2 = sliding?.getBoundingClientRect();
        return {
          slideCardBottom: r1 ? r1.bottom + window.scrollY : null,
          slidingTop: r2 ? r2.top + window.scrollY : null,
          windowScrollY: window.scrollY
        };
      })()`
    });

    console.log('Positions:', positions.result?.result?.value);

    // Scroll so that the bottom of SlideCard and top of Sliding are visible
    const targetY = (positions.result?.result?.value?.slidingTop || 4000) - 150;
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${targetY})`
    });
    await new Promise(r => setTimeout(r, 500));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot.result?.data) {
      writeFileSync(`C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\repro_extra_space.png`, Buffer.from(shot.result.data, 'base64'));
      console.log('Saved repro_extra_space.png');
    }

    // Also take screenshot of the card text closeup
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${targetY + 250})`
    });
    await new Promise(r => setTimeout(r, 500));

    const shotCard = await send('Page.captureScreenshot', { format: 'png' });
    if (shotCard.result?.data) {
      writeFileSync(`C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\repro_card_text.png`, Buffer.from(shotCard.result.data, 'base64'));
      console.log('Saved repro_card_text.png');
    }

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
