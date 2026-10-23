import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const port = 9229;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\chrome-gap-2'
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 1,
      mobile: true
    });

    // Inspect layout of Sliding and Eligiblity
    const info = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        const stickyWrapper = sliding.querySelector('.sticky');
        const cardsWrapper = stickyWrapper.querySelector('.relative.w-full.overflow-hidden');
        const divider = sliding.querySelector('.border-b')?.parentElement;
        const perksH2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Exciting Perks'));
        const perksSection = perksH2?.closest('.transition-colors');

        const rSliding = sliding.getBoundingClientRect();
        const rSticky = stickyWrapper.getBoundingClientRect();
        const rCards = cardsWrapper.getBoundingClientRect();
        const rH2 = perksH2.getBoundingClientRect();
        const rPerksSection = perksSection.getBoundingClientRect();

        return {
          slidingH: sliding.offsetHeight,
          stickyH: stickyWrapper.offsetHeight,
          cardsH: cardsWrapper.offsetHeight,
          gapInsideStickyBelowCards: rSticky.bottom - rCards.bottom,
          gapBetweenStickyAndDivider: divider ? divider.getBoundingClientRect().top - rSticky.bottom : null,
          gapBetweenDividerAndPerksSection: divider ? rPerksSection.top - divider.getBoundingClientRect().bottom : null,
          perksSectionPaddingTop: window.getComputedStyle(perksSection).paddingTop,
          perksH2MarginBottom: window.getComputedStyle(perksH2).marginBottom,
          totalDistanceCardsBottomToPerksH2: rH2.top - rCards.bottom,
          slidingTopY: rSliding.top + window.scrollY,
          slidingBottomY: rSliding.bottom + window.scrollY
        };
      })()`
    });

    console.log('Detailed Spacing:', JSON.stringify(info.result?.result?.value, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
