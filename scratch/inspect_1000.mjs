import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9255;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\c4c2ddc1-9be2-4de6-8feb-54b4f8ff21ba\\scratch\\chrome-inspect'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const targetUrl = 'http://localhost:5173/community-main';
    const newTabRes = await fetch(`http://127.0.0.1:${port}/json/new?${targetUrl}`, { method: 'PUT' });
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
    // Test at 1000px width (close to user 967px)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1000,
      height: 700,
      deviceScaleFactor: 1,
      mobile: false
    });

    await new Promise(r => setTimeout(r, 1500));

    // Scroll to the About section
    await send('Runtime.evaluate', {
      expression: `
        const svg = document.querySelector('clipPath#aboutClip');
        if (svg) {
          svg.closest('div.container')?.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      `
    });

    await new Promise(r => setTimeout(r, 800));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('c:/Users/hp/Desktop/uniques/theuniquescommunity/scratch/about_current_1000.png', Buffer.from(shot.result.data, 'base64'));

    const domInfo = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const svg = document.querySelector('clipPath#aboutClip')?.closest('svg');
          const leftCol = svg?.parentElement?.parentElement;
          const grid = leftCol?.parentElement;
          const container = grid?.parentElement;
          const rightCol = grid?.children[1];
          const header = rightCol?.querySelector('p');

          return {
            svgRect: svg?.getBoundingClientRect(),
            leftColRect: leftCol?.getBoundingClientRect(),
            gridRect: grid?.getBoundingClientRect(),
            containerRect: container?.getBoundingClientRect(),
            rightColRect: rightCol?.getBoundingClientRect(),
            headerRect: header?.getBoundingClientRect(),
            gridClasses: grid?.className,
            containerClasses: container?.className,
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth
          };
        })()
      `
    });

    console.log('DOM Info:', JSON.stringify(domInfo.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

run();
