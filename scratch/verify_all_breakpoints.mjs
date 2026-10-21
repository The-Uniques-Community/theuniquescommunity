import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9226;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\chrome-verify'
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

    const breakpoints = [
      { width: 320, height: 600, name: '320' },
      { width: 360, height: 740, name: '360' },
      { width: 375, height: 812, name: '375' },
      { width: 390, height: 844, name: '390' },
      { width: 430, height: 932, name: '430' },
      { width: 768, height: 1024, name: '768' },
      { width: 820, height: 1180, name: '820' },
      { width: 1024, height: 800, name: '1024' },
      { width: 1280, height: 800, name: '1280' },
    ];

    for (const bp of breakpoints) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: bp.width,
        height: bp.height,
        deviceScaleFactor: 1,
        mobile: bp.width < 1024
      });

      // 1. Scroll to Sliding cards section showing Engaging Workshops
      await send('Runtime.evaluate', {
        expression: `(() => {
          const target = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
          if (target) {
            target.scrollIntoView();
            window.scrollBy(0, 200);
          }
        })()`
      });
      await new Promise(r => setTimeout(r, 600));

      const shotCards = await send('Page.captureScreenshot', { format: 'png' });
      if (shotCards.result?.data) {
        writeFileSync(`C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\verify_cards_${bp.name}.png`, Buffer.from(shotCards.result.data, 'base64'));
        console.log(`Saved verify_cards_${bp.name}.png`);
      }

      // 2. Scroll to bottom of Sliding cards section where divider and transition to next section happens
      await send('Runtime.evaluate', {
        expression: `(() => {
          const target = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
          if (target) {
            const rect = target.getBoundingClientRect();
            window.scrollBy(0, rect.height - 300);
          }
        })()`
      });
      await new Promise(r => setTimeout(r, 600));

      const shotDivider = await send('Page.captureScreenshot', { format: 'png' });
      if (shotDivider.result?.data) {
        writeFileSync(`C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\verify_divider_${bp.name}.png`, Buffer.from(shotDivider.result.data, 'base64'));
        console.log(`Saved verify_divider_${bp.name}.png`);
      }
    }

    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    chrome.kill();
  }
}

run();
