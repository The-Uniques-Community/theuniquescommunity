import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9245;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\c4c2ddc1-9be2-4de6-8feb-54b4f8ff21ba\\scratch\\chrome-comm'
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await new Promise(r => setTimeout(r, 2000));

    await send('Runtime.evaluate', {
      expression: `
        const svg = document.querySelector('clipPath#aboutClip');
        if (svg) {
          svg.closest('div.container, section, div')?.scrollIntoView({ behavior: 'instant', block: 'center' });
        } else {
          window.scrollTo(0, 750);
        }
      `
    });

    await new Promise(r => setTimeout(r, 800));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('c:/Users/hp/Desktop/uniques/theuniquescommunity/scratch/about_current_1280.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved about_current_1280.png');

    // Also get bounding rects of the elements
    const rects = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const imgSvg = document.querySelector('svg clipPath#aboutClip')?.closest('svg');
          const header = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('What is the Criteria for Being an Ambassador?'));
          const container = imgSvg?.closest('.container');
          return {
            svg: imgSvg ? imgSvg.getBoundingClientRect() : null,
            header: header ? header.getBoundingClientRect() : null,
            container: container ? container.getBoundingClientRect() : null,
            windowWidth: window.innerWidth,
            scrollWidth: document.documentElement.scrollWidth
          };
        })()
      `
    });

    console.log('Layout metrics:', JSON.stringify(rects.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

run();
