/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// This example loads the GoJS library then adds HTML from scratch and evaluates some JavaScript,
// then creates a screenshot of Diagram with makeImageData, plus a screenshot of the page.

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

  // Point to a version of go.js, either a local file or one on the web
  await page.addScriptTag({
    // url: 'https://cdnjs.cloudflare.com/ajax/libs/gojs/1.8.7/go.js'
    path: '../../release/go.js'
  });

  // Create HTML for the page:
  page.setContent('<div id="myDiagramDiv" style="border: solid 1px black; width:400px; height:400px"></div>');

  // Set up a Diagram, and return the result of makeImageData:
  const imageData = await page.evaluate(() => {
    var $ = go.GraphObject.make;

    var myDiagram = $(go.Diagram, "myDiagramDiv",
      {
        "animationManager.isEnabled": false,
        "undoManager.isEnabled": true  // enable undo & redo
      });

    // define a simple Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",  // the Shape will go around the TextBlock
        $(go.Shape, "RoundedRectangle", { strokeWidth: 0 },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8 },
          new go.Binding("text", "key"))
      );

    myDiagram.model = new go.GraphLinksModel(
      [
        { key: "Alpha", color: "lightblue" },
        { key: "Beta", color: "orange" },
        { key: "Gamma", color: "lightgreen" },
        { key: "Delta", color: "pink" }
      ],
      [
        { from: "Alpha", to: "Beta" },
        { from: "Alpha", to: "Gamma" },
        { from: "Beta", to: "Beta" },
        { from: "Gamma", to: "Delta" },
        { from: "Delta", to: "Alpha" }
      ]);


    return myDiagram.makeImageData();
  });

  // Output the GoJS makeImageData as a .png:
  const { buffer } = parseDataUrl(imageData);
  fs.writeFileSync('gojs-screenshot.png', buffer, 'base64');

  // Output a page screenshot
  await page.screenshot({ path: 'page-screenshot.png' });
  await browser.close();
})();