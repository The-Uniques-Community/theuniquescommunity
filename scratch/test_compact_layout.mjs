import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function testCompact() {
  const port = 9222;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5aab6e1c-0665-4f14-a467-926a167918bb\\scratch\\chrome-test-compact'
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

    // 1. Mobile viewport test (like user's screenshots)
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

    // Measure exact spacings on mobile
    const metricsRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        const perksH2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Exciting Perks'));
        const perksSection = perksH2?.closest('.transition-colors');
        const testimonialCarousel = sliding.previousElementSibling;

        const rSlideCard = testimonialCarousel.getBoundingClientRect();
        const rSliding = sliding.getBoundingClientRect();
        const rPerks = perksSection.getBoundingClientRect();

        return {
          gapBetweenSlideCardAndSliding: rSliding.top - rSlideCard.bottom,
          gapBetweenSlidingAndPerks: rPerks.top - rSliding.bottom,
          slidingTotalHeight: sliding.offsetHeight
        };
      })()`
    });
    console.log('Mobile spacing metrics:', metricsRes.result?.result?.value);

    // Scroll to Sliding on mobile and capture view
    await send('Runtime.evaluate', {
      expression: `(() => {
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        sliding.scrollIntoView({ block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 500));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/mobile_sliding_compact.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved mobile_sliding_compact.png');

    // Scroll to see both SlideCard bottom and Sliding top
    await send('Runtime.evaluate', {
      expression: `window.scrollBy(0, -150)`
    });
    await new Promise(r => setTimeout(r, 400));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/mobile_gap_top.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved mobile_gap_top.png');

    // Scroll to see both Sliding bottom and Perks top
    await send('Runtime.evaluate', {
      expression: `window.scrollBy(0, 350)`
    });
    await new Promise(r => setTimeout(r, 400));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/mobile_gap_bottom.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved mobile_gap_bottom.png');

    // 2. Desktop viewport test
    await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Runtime.evaluate', {
      expression: `(() => {
        const sliding = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Join The Uniques Community Today!'));
        sliding.scrollIntoView({ block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('scratch/desktop_sliding_compact.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved desktop_sliding_compact.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testCompact();
