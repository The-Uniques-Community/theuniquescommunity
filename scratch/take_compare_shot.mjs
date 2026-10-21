import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9234;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\c4c2ddc1-9be2-4de6-8feb-54b4f8ff21ba\\scratch\\chrome-test'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const fileUrl = 'file:///c:/Users/hp/Desktop/uniques/theuniquescommunity/scratch/compare.html';
    const newTabRes = await fetch(`http://127.0.0.1:${port}/json/new?${fileUrl}`, { method: 'PUT' });
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1000,
      height: 600,
      deviceScaleFactor: 1,
      mobile: false
    });

    await new Promise(r => setTimeout(r, 1000));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('c:/Users/hp/Desktop/uniques/theuniquescommunity/scratch/compare_result.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved compare_result.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

run();
