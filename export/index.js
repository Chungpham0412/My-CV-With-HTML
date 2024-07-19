const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("file:////Users/huemin/Documents/CV/html/index.html", {
    waitUntil: "networkidle2",
  });
  await page.pdf({ path: "output_file.pdf", format: "A4" });

  await browser.close();
})();
