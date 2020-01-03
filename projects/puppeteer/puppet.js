/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// This example loads a web page with a GoJS diagram,
// then creates a screenshot of the Diagram with makeImageData, plus a screenshot of the page.

const puppeteer = require('puppeteer');
const fs = require('fs');

const parseDataUrl = (dataUrl) => {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (matches.length !== 3) {
    throw new Error('Could not parse data URL.');
  }
  return { mime: matches[1], buffer: Buffer.from(matches[2], 'base64') };
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // This does not have to be a page on the web, it can be a localhost page, or file://
  await page.goto('https://gojs.net/samples/orgChartEditor.html', {
    waitUntil: 'networkidle2' // ensures images are loaded
  });


  const imageData = await page.evaluate(() => {
    window.myDiagram.animationManager.stopAnimation();

    return window.myDiagram.makeImageData();
  });

  // Output the GoJS makeImageData as a .png:
  const { buffer } = parseDataUrl(imageData);
  fs.writeFileSync('gojs-screenshot.png', buffer, 'base64');

  // Output a page screenshot
  await page.screenshot({ path: 'page-screenshot.png' });
  await browser.close();
})();