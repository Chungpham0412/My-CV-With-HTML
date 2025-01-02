const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

function getUniqueFilePath(filePath) {
  let counter = 1;
  let newFilePath = filePath;
  const { dir, ext, name } = path.parse(filePath);

  while (fs.existsSync(newFilePath)) {
    newFilePath = path.join(dir, `${name}-${counter}${ext}`);
    counter++;
  }

  return newFilePath;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Path to the HTML file
  // const htmlFilePath = "file:////Users/huemin/Documents/My Project/Portfolio/My-CV-With-HTML/index.html"; // Update this with the correct path
  // get ten file tu command line
  const htmlFileName = process.argv[2];
  console.log("htmlFileName", htmlFileName);
  let htmlFilePath = "file:///D:/Chungpq/My-CV-With-HTML/laravel.html";
  if (htmlFileName !== undefined) {
    htmlFilePath = "file:///D:/Chungpq/My-CV-With-HTML/" + htmlFileName;
  }

  // const htmlFilePath = "file:////Users/huemin/Documents/My Project/Portfolio/My-CV-With-HTML/index-reactjs.html"; // Update this with the correct path
  // await page.goto(htmlFilePath, { waitUntil: "networkidle2", timeout: 600000 });
  try {
    await page.goto(htmlFilePath, {
      waitUntil: "networkidle2",
      timeout: 120000,
    });
  } catch (error) {
    console.error("Lỗi khi tải tệp HTML:", error);
    await browser.close();
    process.exit(1);
  }
  // Directory and file paths
  const outputDir = path.resolve(__dirname, "../export");
  let pdfFilePath = path.join(outputDir, "ChungPQ-PHP-Developer.pdf");

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get a unique file path
  pdfFilePath = getUniqueFilePath(pdfFilePath);

  // Save the PDF
  // await page.pdf({ path: pdfFilePath, format: "A4" });
  await page.pdf({
    path: pdfFilePath,
    format: "A4",
    margin: {
      top: "0.5in",
      bottom: "0.5in",
      left: "0.75in",
      right: "0.75in",
    },
  });

  await browser.close();
})();
