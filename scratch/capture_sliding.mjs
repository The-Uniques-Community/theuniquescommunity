import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9222;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\b027dbb6-2768-4d44-a08e-7eeb4d86b075\\scratch\\chrome-inspect'
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
    await send('Runtime.enable');
    await new Promise(r => setTimeout(r, 2000));

    await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });

    await send('Runtime.evaluate', {
      expression: `(() => {
        const card = document.querySelector('.card');
        if (card) card.scrollIntoView({ block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/sliding_card_view.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved sliding_card_view.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
