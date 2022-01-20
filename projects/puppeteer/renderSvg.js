/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

// This example uses GoJS to render a diagram in SVG.
// First, install Puppeteer:
//  $ npm i puppeteer
// Call this:
//  $ node renderSvg.js
// and it will write out a diagram.svg file.

// In addition to using your own diagram templates and layout and model,
// you might want to adapt this code to control the file name or to write to standard output.
// For more options, please read about how to use Puppeteer, at:
// https://gojs.net/latest/intro/serverSideImages.html

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Point to a version of go.js, either a local file or one on the web at a CDN
  await page.addScriptTag({
    url: 'https://unpkg.com/gojs'
    // path: '../../release/go.js'
  });

  // Create HTML for the page:
  page.setContent('<div id="myDiagramDiv" style="border: solid 1px black; width:400px; height:400px"></div>');

  // Set up a Diagram, and return the result of makeImageData:
  const svgString = await page.evaluate(() => {
    var $ = go.GraphObject.make;

    var myDiagram = $(go.Diagram, "myDiagramDiv",
      {
        "animationManager.isEnabled": false,
        layout: $(go.ForceDirectedLayout)
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

    return myDiagram.makeSvg({ scale: 1.0 }).outerHTML;
  });

  // Output the GoJS makeImageData as SVG text:
  //console.log(svgString);
  fs.writeFileSync('diagram.svg', svgString);

  await browser.close();
})();