import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function testInteractions() {
  const port = 9222;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5aab6e1c-0665-4f14-a467-926a167918bb\\scratch\\chrome-test-interact'
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
    await new Promise(r => setTimeout(r, 1500));

    // Test wheel event dispatch on the card container
    const wheelRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const cardContainer = document.querySelector('.card')?.closest('.flex.flex-col.items-center.justify-center');
        if (!cardContainer) return 'Container not found';
        
        // Initial active title
        const getTitle = () => document.querySelector('.card h2')?.textContent;
        const initial = getTitle();

        // Dispatch wheel event
        const wheelEv = new WheelEvent('wheel', { deltaY: 50, bubbles: true, cancelable: true });
        cardContainer.dispatchEvent(wheelEv);

        return { initial };
      })()`
    });
    console.log('Wheel test:', wheelRes.result?.result?.value);

    await new Promise(r => setTimeout(r, 500));

    const afterRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        return { afterTitle: document.querySelector('.card h2')?.textContent };
      })()`
    });
    console.log('After wheel:', afterRes.result?.result?.value);

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testInteractions();
