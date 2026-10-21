import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function audit() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/community-main', { waitUntil: 'networkidle0' });

  // Get all sections and their rects
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section, [class*="container"], [id]')).map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className.toString().slice(0, 100),
        rect: {
          top: rect.top + window.scrollY,
          height: rect.height,
          bottom: rect.bottom + window.scrollY
        },
        borderTop: style.borderTop,
        borderBottom: style.borderBottom,
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom
      };
    });
  });

  fs.writeFileSync('C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\sections.json', JSON.stringify(sections, null, 2));

  // Take screenshot when scrolled to Sliding section start, middle, and end, and where the next section appears
  // Find sliding section
  const slidingTop = await page.evaluate(() => {
    // find section containing "Join The Uniques Community Today!"
    const h1 = Array.from(document.querySelectorAll('h1')).find(h => h.textContent.includes('Join'));
    if (!h1) return null;
    const sec = h1.closest('section');
    const r = sec.getBoundingClientRect();
    return {
      top: r.top + window.scrollY,
      height: r.height,
      bottom: r.bottom + window.scrollY
    };
  });

  console.log('Sliding section bounds:', slidingTop);

  // Scroll to slidingTop.top
  await page.evaluate((y) => window.scrollTo(0, y), slidingTop.top);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\slide_start_375.png' });

  // Scroll to sliding progress 0.5
  await page.evaluate((y) => window.scrollTo(0, y), slidingTop.top + 800);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\slide_mid_375.png' });

  // Scroll to near end of sliding
  await page.evaluate((y) => window.scrollTo(0, y), slidingTop.bottom - 850);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\slide_end_375.png' });

  // Scroll to bottom of sliding / start of next section
  await page.evaluate((y) => window.scrollTo(0, y), slidingTop.bottom - 400);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\slide_after_375.png' });

  // Now do tablet 768x1024
  await page.setViewport({ width: 768, height: 1024 });
  await page.evaluate((y) => window.scrollTo(0, y), slidingTop.top);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\slide_start_768.png' });

  await page.evaluate((y) => window.scrollTo(0, y), slidingTop.bottom - 1050);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\495adf68-650e-461d-8f9c-ce0c05ca883b\\scratch\\slide_end_768.png' });

  await browser.close();
  console.log('Audit complete');
}

audit().catch(console.error);
