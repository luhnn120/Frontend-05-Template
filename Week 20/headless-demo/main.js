const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8080/main.html');
  const a = await page.$('a')
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();