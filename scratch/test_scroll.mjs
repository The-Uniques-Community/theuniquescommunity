import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function testScroll() {
  const port = 9222;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5aab6e1c-0665-4f14-a467-926a167918bb\\scratch\\chrome-test'
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

    // Find section top position
    const evalRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        const rect = sliding.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          height: sliding.offsetHeight
        };
      })()`
    });

    const info = evalRes.result?.result?.value;
    console.log('Section info:', info);

    // 1. Scroll to section start
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${info.top}, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 500));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/scroll_card_start.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved scroll_card_start.png');

    // 2. Scroll half-way through cards (progress ~ 0.5)
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${info.top + 700}, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/scroll_card_middle.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved scroll_card_middle.png');

    // 3. Scroll to end of cards (progress ~ 1)
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${info.top + 1380}, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/scroll_card_end.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved scroll_card_end.png');

    // 4. Scroll slightly further into Exciting Perks
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${info.top + 1800}, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/scroll_into_perks.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved scroll_into_perks.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testScroll();
