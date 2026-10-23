import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9225;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\chrome-audit'
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

    for (const width of [375, 768]) {
      const height = width === 768 ? 1024 : 812;
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 1024
      });

      // Get all child elements of Community page and their positions
      const elements = await send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const bodyChildren = document.querySelector('.relative.z-10').children;
          // Find the router container
          const allDivs = Array.from(document.querySelectorAll('section, h1, h2, h3, hr, [class*="border"], [class*="card"], [class*="divider"]'));
          return allDivs.map(el => {
            const rect = el.getBoundingClientRect();
            const s = window.getComputedStyle(el);
            return {
              tag: el.tagName,
              id: el.id,
              text: el.textContent?.slice(0, 30).trim(),
              class: el.className?.toString().slice(0, 60),
              top: rect.top + window.scrollY,
              bottom: rect.bottom + window.scrollY,
              height: rect.height,
              borderTop: s.borderTop,
              borderBottom: s.borderBottom,
              margin: s.margin,
              padding: s.padding
            };
          }).filter(x => x.height > 0);
        })()`
      });

      console.log(`=== Viewport ${width}x${height} elements ===`);
      console.log(JSON.stringify(elements.result?.result?.value?.filter(e => 
        e.text?.includes('Join') || 
        e.text?.includes('Workshop') || 
        e.text?.includes('Perk') || 
        e.text?.includes('Exclusive') ||
        e.text?.includes('Guidelines') ||
        e.tag === 'HR' ||
        parseFloat(e.borderBottom) > 0 ||
        parseFloat(e.borderTop) > 0
      ), null, 2));
    }

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
