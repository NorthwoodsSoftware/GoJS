import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Node.js`,category:`Frameworks`},htmlContent:`<h1>Using GoJS with Node.js</h1>\r
\r
    <p>\r
      As of 2.0, GoJS can be used in DOM-less contexts like Node.js. However there are some considerations:\r
      <ul>\r
        <li>Since there is no Diagram DIV, you must instead set the <a href="../api/symbols/Diagram.html#viewsize" target="api">Diagram.viewSize</a> property.\r
          This affects all the same values as the DIV size, like Diagram.position and layout results from layouts that are viewport-sized.\r
        </li>\r
        <li>Cannot measure go.Pictures, you must set a <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> instead.</li>\r
        <li>Cannot measure go.TextBlocks accurately, you should set a <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> instead.</li></li>\r
      </ul>\r
    </p>\r
\r
    <p>\r
      For server-side operations that need to measure Pictures or TextBlocks, you should consider using a headless browser with Node.\r
      <a href="nodeJs#ServerSideImages">Click here for examples using Node with Puppeteer (headless Chrome)</a>.\r
    </p>\r
\r
    <h2 id="NodeJSExample"><a class="not-prose heading-anchor" href="#NodeJSExample">Node.js example</a></h2>\r
\r
    <p>\r
      If you saved the following JavaScript as <code>nodescript.js</code> and run it with node (<code>node nodescript.js</code>),\r
      it will output Model JSON results in the console, which include the locations of laid-out Nodes. You can use Node.js\r
      in this way to do server-side operations like large layouts, and then send the JSON to the client.\r
    </p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  Alternatively, if your code is saved as <code>nodescript.mjs</code> or your project is of <code>"type": "module"</code>,\r
  you can use GoJS as an ECMAScript module:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="ServerSideImages"><a class="not-prose heading-anchor" href="#ServerSideImages">Creating images on the server</a></h2>\r
<p>It may be useful for many applications to create images of Diagrams with GoJS, and this page details some of the options for such a task.</p>\r
<h2 id="Puppeteer"><a class="not-prose heading-anchor" href="#Puppeteer">Puppeteer</a></h2>\r
<p>\r
  <a href="https://github.com/GoogleChrome/puppeteer">Puppeteer</a> is a Node library which provides a high-level API to control headless Chrome. We can use it\r
  to create images server-side. If you have Node and npm installed you can install it with <code>npm install puppeteer</code>.\r
</p>\r
\r
<p>\r
  The following code is a small example using Puppeteer. If you saved the JavaScript as <code>puppet.js</code> and run it with node (<code\r
    >node createImage.js</code\r
  >) it demonstrate creating two images: One from the Diagram called <code>gojs-screenshot.png</code> and one of the HTML page called\r
  <code>page-screenshot.png</code>. The Diagram code in the sample is the same as that in the <a href="../samples/minimal">Minimal sample</a>.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>You can also use Puppeteer to fetch live HTML pages and do the same operations:</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
`,codeBlocks:[{id:null,code:`// nodescript.js\r
// This example loads the GoJS library, creates a Diagram with a layout and prints the JSON results.\r
\r
// Load GoJS.  This assumes using require and CommonJS:\r
const go = require("gojs");\r
\r
const myDiagram =\r
  new go.Diagram('', { // No DOM, so there can be no DIV!\r
    viewSize: new go.Size(400,400), // Set this property in DOM-less environments\r
    layout: new go.LayeredDigraphLayout()\r
  });\r
\r
myDiagram.nodeTemplate =\r
  new go.Node('Auto', {\r
    // specify the size of the node rather than measuring the size of the text\r
    width: 80, height: 40\r
  })\r
    // automatically save the Node.location to the node's data object\r
    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
        .bind('fill', 'color'),\r
      new go.TextBlock()\r
        .bind('text', 'key')\r
    );\r
\r
// After the layout, output results:\r
myDiagram.addDiagramListener('InitialLayoutCompleted', () => console.log(myDiagram.model.toJson()) );\r
\r
// load a model:\r
myDiagram.model = new go.GraphLinksModel([\r
  { key: 'Alpha', color: 'lightblue' },\r
  { key: 'Beta', color: 'orange' },\r
  { key: 'Gamma', color: 'lightgreen' },\r
  { key: 'Delta', color: 'pink' }\r
], [\r
  { from: 'Alpha', to: 'Beta' },\r
  { from: 'Alpha', to: 'Gamma' },\r
  { from: 'Gamma', to: 'Delta' },\r
  { from: 'Delta', to: 'Alpha' }\r
]);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// nodescript.mjs\r
// This example loads the GoJS library, creates a Diagram with a layout and prints the JSON results.\r
\r
// Load GoJS.  This assumes using import and ECMAScript modules:\r
import go from "gojs";\r
\r
. . .`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// This example loads the GoJS library then adds HTML from scratch and evaluates some JavaScript,\r
// then creates a screenshot of Diagram with makeImageData, plus a screenshot of the page.\r
\r
const puppeteer = require('puppeteer');\r
const fs = require('fs');\r
\r
const parseDataUrl = dataUrl => {\r
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);\r
  if (matches.length !== 3) {\r
    throw new Error('Could not parse data URL.');\r
  }\r
  return { mime: matches[1], buffer: Buffer.from(matches[2], 'base64') };\r
};\r
\r
(async () => {\r
  const browser = await puppeteer.launch();\r
  const page = await browser.newPage();\r
\r
  // Point to a version of go.js, either a local file or one on the web at a CDN\r
  await page.addScriptTag({\r
    url: 'https://cdn.jsdelivr.net/npm/gojs'\r
    // path: '../../release/go.js'\r
  });\r
\r
  // Create HTML for the page:\r
  page.setContent('<div id="myDiagramDiv" style="border: solid 1px black; width:400px; height:400px"></div>');\r
\r
  // Set up a Diagram, and return the result of makeImageData:\r
  const imageData = await page.evaluate(() => {\r
    const myDiagram = new go.Diagram("myDiagramDiv", {\r
      "animationManager.isEnabled": false,\r
      "undoManager.isEnabled": true  // enable undo & redo\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node("Auto")\r
        .add(  // the Shape will go around the TextBlock\r
          new go.Shape("RoundedRectangle", { strokeWidth: 0 })\r
            .bind("fill", "color"),\r
          new go.TextBlock({ margin: 8 })\r
            .bind("text", "key")\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel([\r
      { key: "Alpha", color: "lightblue" },\r
      { key: "Beta", color: "orange" },\r
      { key: "Gamma", color: "lightgreen" },\r
      { key: "Delta", color: "pink" }\r
    ], [\r
      { from: "Alpha", to: "Beta" },\r
      { from: "Alpha", to: "Gamma" },\r
      { from: "Beta", to: "Beta" },\r
      { from: "Gamma", to: "Delta" },\r
      { from: "Delta", to: "Alpha" }\r
    ]);\r
\r
    return myDiagram.makeImageData();\r
  });\r
\r
  // Output the GoJS makeImageData as a .png:\r
  const { buffer } = parseDataUrl(imageData);\r
  fs.writeFileSync('diagram-screenshot.png', buffer, 'base64');\r
\r
  // Output a page screenshot\r
  await page.screenshot({ path: 'page-screenshot.png' });\r
  await browser.close();\r
})();`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// This example loads a web page with a GoJS diagram,\r
// then creates a screenshot of the Diagram with makeImageData, plus a screenshot of the page.\r
\r
const puppeteer = require('puppeteer');\r
const fs = require('fs');\r
\r
const parseDataUrl = dataUrl => {\r
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);\r
  if (matches.length !== 3) {\r
    throw new Error('Could not parse data URL.');\r
  }\r
  return { mime: matches[1], buffer: Buffer.from(matches[2], 'base64') };\r
};\r
\r
(async () => {\r
  const browser = await puppeteer.launch();\r
  const page = await browser.newPage();\r
  // This does not have to be a page on the web, it can be a localhost page, or file://\r
  await page.goto('https://gojs.net/samples/orgChartEditor.html', {\r
    waitUntil: 'networkidle2' // ensures images are loaded\r
  });\r
\r
\r
  const imageData = await page.evaluate(() => {\r
    window.myDiagram.animationManager.stopAnimation();\r
    return window.myDiagram.makeImageData({\r
      background: window.myDiagram.div.style.backgroundColor\r
    });\r
  });\r
\r
  // Output the GoJS makeImageData as a .png:\r
  const { buffer } = parseDataUrl(imageData);\r
  fs.writeFileSync('diagram-screenshot.png', buffer, 'base64');\r
\r
  // Output a page screenshot\r
  await page.screenshot({ path: 'page-screenshot.png' });\r
  await browser.close();\r
})();`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1u2h6mt`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};