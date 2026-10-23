import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function testClickDot() {
  const port = 9222;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5aab6e1c-0665-4f14-a467-926a167918bb\\scratch\\chrome-test-click'
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

    // Scroll to section start first
    await send('Runtime.evaluate', {
      expression: `(() => {
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        sliding.scrollIntoView({ behavior: 'instant' });
      })()`
    });
    await new Promise(r => setTimeout(r, 500));

    // Click dot 5 (the 5th card: "Expand Your Network")
    await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button[aria-label^="Scroll to card"]'));
        if (buttons[4]) buttons[4].click();
      })()`
    });

    // Wait for smooth scroll to animate
    await new Promise(r => setTimeout(r, 1000));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/click_dot_result.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved click_dot_result.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testClickDot();
