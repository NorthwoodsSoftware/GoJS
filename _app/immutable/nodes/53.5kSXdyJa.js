import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Printing`,figures:!0},htmlContent:`<h1>Printing</h1>\r
<p>\r
  Printing a Diagram is typically accomplished by making several images of the Diagram and either saving them,\r
  inserting them into a PDF or other document, or printing them directly from the browser.\r
</p>\r
<p>\r
  This page uses <a href="../api/symbols/Diagram.html#makesvg" target="api">Diagram.makeSvg</a>, which has its own introduction page: <a href="makingSVG">Making Images with GoJS</a>.\r
  Depending on your situation, you may want to use raster images to print by calling <a href="../api/symbols/Diagram.html#makeimage" target="api">Diagram.makeImage</a> instead.\r
</p>\r
\r
<h3 id="printing-to-a-single-page"><a class="not-prose heading-anchor" href="#printing-to-a-single-page">Printing to a single page</a></h3>\r
\r
<p> \r
  The following sample demonstrates fitting a diagram of social media connections to the size of one page \r
  and printing it by opening the SVG in a separate window:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h3 id="printing-across-multiple-pages"><a class="not-prose heading-anchor" href="#printing-across-multiple-pages">Printing across multiple pages</a></h3>\r
\r
<p>\r
  In this example, the diagram depicts a very large server infrastructure diagram, and it would be best \r
  displayed across several pages. The diagram will be printed in either portrait or landscape depending on \r
  whether its width or height is greater.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  Our code for print preparation is in a <code>printDiagram</code> function that cuts the Diagram into several images\r
  of a given width and height and renders each such page individually. It also applies some minimal css by adding an \r
  <code>@page</code> rule to the document to make sure the svgs are placed correctly on their own pages.\r
  Those images are in a separate window just to make it easier to manage than combining them with the contents of this page.\r
</p>\r
`,codeBlocks:[{id:`onePage`,code:`window.myDiagram = diagram;\r
myDiagram.initialAutoScale = go.AutoScale.Uniform;\r
\r
// Print the diagram by opening a new window holding a single SVG image\r
// of the entire diagram, then scale uniformly to fill one page\r
function printDiagram(orientation) {\r
  const svgWindow = window.open();\r
  if (!svgWindow) return; // failure to open a new Window\r
  svgWindow.document.title = "GoJS Flowchart";\r
  const style = svgWindow.document.createElement("style");\r
  // force orientation, leave a margin so nothing is lost to the printer's \r
  // unprintable edges, stretch to 100% height and remove extra body margin\r
  style.textContent = \`\r
    @page { size: \${orientation}; margin: 0.5in; }\r
    html, body { height: 100%; margin: 0; }\r
  \`;\r
  svgWindow.document.head.appendChild(style);\r
\r
  const svg = myDiagram.makeSvg({\r
    scale: 1.0,\r
    background: myDiagram.div.style.background\r
  });\r
  // scale the SVG uniformly to fill the printable area of the page\r
  svg.style.width = "100%";\r
  svg.style.height = "100%";\r
  svg.removeAttribute("width");\r
  svg.removeAttribute("height");\r
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");\r
  svgWindow.document.body.appendChild(svg);\r
  setTimeout(() => { svgWindow.print(); svgWindow.close(); }, 1);\r
}\r
window.printDiagram = printDiagram;\r
\r
// Node template of an avatar and a user handle\r
myDiagram.nodeTemplate =\r
  new go.Node("Vertical", { \r
    locationSpot: go.Spot.Center,\r
    isShadowed: true,\r
    shadowOffset: new go.Point(1, 1),\r
    shadowBlur: 5\r
  })\r
    .add(\r
      new go.Panel("Auto").add(\r
        new go.Shape("Circle", {\r
          fill: "white",\r
          stroke: "dimgray"\r
        })\r
          .bind("stroke", "fill"),\r
        new go.Shape({\r
          geometryString : "F M628.736 528.896A416 416 0 0 1 928 "\r
          + "928H96a415.872 415.872 0 0 1 299.264-399.104L512 "\r
          + "704l116.736-175.104zM720 304a208 208 0 1 1-416 0 "\r
          + "208 208 0 0 1 416 0z",\r
          fill: "white",\r
          stroke: "dimgray",\r
          desiredSize: new go.Size(25, 25)\r
        })\r
      ),\r
      new go.TextBlock({ \r
        font: "12px Trebuchet MS", \r
        shadowVisible: false,\r
        margin: new go.Margin(4, 1, 1, 1) \r
      })\r
        .bind("text")\r
    );\r
\r
// Simple link template\r
myDiagram.linkTemplate =\r
  new go.Link({ selectable: false })\r
    .add(new go.Shape({ strokeWidth: 1.5, stroke: "lightgray" }));\r
\r
myDiagram.layout = new go.ForceDirectedLayout();\r
\r
// Web of people by social media connection\r
myDiagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "ava", text: "@pixelnomad", fill: "#f28b82" },\r
    { key: "ben", text: "@cloud_burst", fill: "#fbbc04" },\r
    { key: "cleo", text: "@neon_kitty", fill: "#fff475" },\r
    { key: "dan", text: "@dev_dunes", fill: "#ccff90" },\r
    { key: "eve", text: "@mossy_owl", fill: "#a7ffeb" },\r
    { key: "finn", text: "@tidal_finn", fill: "#cbf0f8" },\r
    { key: "gina", text: "@glitch_gina", fill: "#aecbfa" },\r
    { key: "hugo", text: "@hugo.exe", fill: "#d7aefb" },\r
    { key: "iris", text: "@iris_in_bloom", fill: "#fdcfe8" },\r
    { key: "jack", text: "@jackalope42", fill: "#e6c9a8" }\r
  ],\r
  [\r
    { from: "ava", to: "ben" },\r
    { from: "ava", to: "cleo" },\r
    { from: "ava", to: "eve" },\r
    { from: "ben", to: "cleo" },\r
    { from: "ben", to: "dan" },\r
    { from: "cleo", to: "finn" },\r
    { from: "dan", to: "eve" },\r
    { from: "dan", to: "gina" },\r
    { from: "eve", to: "finn" },\r
    { from: "finn", to: "gina" },\r
    { from: "gina", to: "hugo" },\r
    { from: "hugo", to: "iris" },\r
    { from: "iris", to: "jack" },\r
    { from: "jack", to: "gina" },\r
    { from: "hugo", to: "jack" }\r
  ]\r
);`,isExecutable:!0,animation:!1,html:`<button onclick="window.printDiagram('portrait')">Print Diagram (portrait)</button>
<button onclick="window.printDiagram('landscape')">Print Diagram (landscape)</button>
`,language:`js`,initiallyVisible:!1},{id:`diag`,code:`window.myDiagram = diagram;\r
myDiagram.initialAutoScale = go.AutoScale.Uniform;\r
\r
// Print the diagram by opening a new window holding SVG\r
// images of the diagram contents for each page\r
function printDiagram() {\r
  const bnds = myDiagram.documentBounds;\r
  // Print landscape when the diagram is wider than it is tall, \r
  // otherwise portrait\r
  // Set width and height accordingly\r
  const landscape = bnds.width > bnds.height;\r
  const width = landscape ? 960 : 720;\r
  const height = landscape ? 720 : 960;\r
  \r
  const svgWindow = window.open();\r
  if (!svgWindow) return; // failure to open a new Window\r
  svgWindow.document.title = "GoJS Network Diagram";\r
  // Add margin to account for page edges,\r
  // force portrait or landscape using above\r
  const style = svgWindow.document.createElement("style");\r
  style.textContent = \`\r
    @page { size: \${landscape ? "landscape" : "portrait"}; margin: 0.5in; }\r
    html, body { margin: 0; }\r
    /* Lay out each image on its own page as a block */\r
    svg { display: block; }\r
    svg + svg { break-before: page; }\r
  \`;\r
  svgWindow.document.head.appendChild(style);\r
\r
  const printSize = new go.Size(width, height);\r
  let x = bnds.x;\r
  let y = bnds.y;\r
  // Iterate through each tile/section of the diagram\r
  while (y < bnds.bottom) {\r
    while (x < bnds.right) {\r
      const svg = myDiagram.makeSvg({\r
        scale: 1.0,\r
        position: new go.Point(x, y),\r
        size: printSize,\r
        background: myDiagram.div.style.background\r
      });\r
      // let each page image scale to fit inside the printable area\r
      svg.removeAttribute("width");\r
      svg.removeAttribute("height");\r
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");\r
      svgWindow.document.body.appendChild(svg);\r
      x += printSize.width;\r
    }\r
    x = bnds.x;\r
    y += printSize.height;\r
  }\r
  setTimeout(() => { svgWindow.print(); svgWindow.close(); }, 1);\r
}\r
window.printDiagram = printDiagram;\r
\r
// Returns a node template that will be used for a layer of the diagram\r
function deviceNode(figure, width, height, fontSize, accent) {\r
  return new go.Node("Auto", { locationSpot: go.Spot.Center })\r
    .add(\r
      new go.Shape(figure, {\r
        fill: "#10325f",\r
        stroke: accent,\r
        strokeWidth: 1.5,\r
        desiredSize: new go.Size(width, height)\r
      }),\r
      new go.TextBlock({\r
        stroke: "#e6f7ff",\r
        font: fontSize + 'px "Consolas", "Courier New", monospace',\r
        margin: 4\r
      })\r
        .bind("text")\r
    );\r
}\r
\r
// Create a template for each tier, from core routers down to servers\r
myDiagram.nodeTemplateMap.add("core", deviceNode("Hexagon", 130, 52, 13, "#7ef0ff"));\r
myDiagram.nodeTemplateMap.add("dist", deviceNode("RoundedRectangle", 116, 42, 12, "#5fd2ff"));\r
myDiagram.nodeTemplateMap.add("access", deviceNode("Rectangle", 104, 36, 11, "#9bd0ff"));\r
myDiagram.nodeTemplateMap.add("server", deviceNode("Rectangle", 78, 30, 10, "#cfe8ff"));\r
\r
// Links to represent wiring between devices\r
myDiagram.linkTemplate =\r
  new go.Link({ selectable: false, routing: go.Routing.Orthogonal, corner: 4 })\r
    .add(new go.Shape({ stroke: "#3f88c5", strokeWidth: 1 }));\r
\r
// Re-run the layered layout flowing in the given direction, then fit the result;\r
// direction 0 lays the network out vertically, 90 lays it out horizontally\r
function relayout(direction) {\r
  myDiagram.layout = new go.LayeredDigraphLayout({\r
    direction: direction,\r
    layerSpacing: 60,\r
    columnSpacing: 12\r
  });\r
  myDiagram.layoutDiagram();\r
  myDiagram.zoomToFit();\r
}\r
window.relayout = relayout;\r
\r
// Start with a vertical layered diagram\r
relayout(0);\r
\r
// Generate a data center network diagram\r
// core routers -> distribution switches -> access switches -> servers\r
const nodeArray = [];\r
const linkArray = [];\r
let nextKey = 0;\r
\r
function addNode(text, category) {\r
  const key = nextKey++;\r
  nodeArray.push({ key: key, text: text, category: category });\r
  return key;\r
}\r
function connect(from, to) {\r
  linkArray.push({ from: from, to: to });\r
}\r
\r
// Core layer\r
const cores = [];\r
for (let i = 1; i <= 2; i++) cores.push(addNode("Core-R" + i, "core"));\r
\r
// Distribution layer\r
const distSwitches = [];\r
for (let i = 1; i <= 4; i++) {\r
  const dist = addNode("Dist-SW" + i, "dist");\r
  distSwitches.push(dist);\r
  cores.forEach((core) => connect(core, dist));\r
}\r
\r
// Access/server layer\r
const roles = ["web", "app", "db", "cache", "auth", "file"];\r
let rack = 1;\r
let serverNum = 1;\r
distSwitches.forEach((dist) => {\r
  for (let a = 1; a <= 3; a++) {\r
    const access = addNode("Acc-SW" + rack, "access");\r
    connect(dist, access);\r
    for (let s = 0; s < 4; s++) {\r
      const role = roles[s % roles.length];\r
      const name = role + "-" + String(serverNum).padStart(3, "0");\r
      connect(access, addNode(name, "server"));\r
      serverNum++;\r
    }\r
    rack++;\r
  }\r
});\r
\r
myDiagram.model = new go.GraphLinksModel(nodeArray, linkArray);`,isExecutable:!0,animation:!1,html:`<button onclick="window.printDiagram()">Print Diagram</button>
<button onclick="window.relayout(0)">Lay Out Vertically</button>
<button onclick="window.relayout(90)">Lay Out Horizontally</button>`,language:`js`,initiallyVisible:!1}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`12j8ti3`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};