import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Making SVG`},htmlContent:`<style type="text/css">\r
  .imageResult {\r
    border: 1px solid var(--color-border);\r
    margin-bottom: 32px;\r
    display: inline-block;\r
  }\r
</style>\r
\r
<h1>Making SVG images</h1>\r
<p>\r
  GoJS has one function for creating SVG: <a href="../api/symbols/Diagram.html#makesvg" target="api">Diagram.makeSvg</a>, which returns a new SVGElement with a representation of a GoJS Diagram. The method has\r
  a single argument, a JavaScript Object that contains several definable properties, enumerated in the documentation.\r
</p>\r
<p>\r
  SVG export can be useful as content for a PDF, because the rendering is vector oriented instead of raster oriented. Most GoJS users who create PDFs do so by\r
  exporting Diagrams to SVG or images and place that content in their PDFs, on the server or elsewhere.\r
</p>\r
<p>\r
  This page is almost identical to the page on <a href="makingImages">Making Images</a>, which shows how to render raster images instead of SVG elements.\r
</p>\r
<p>\r
  <a href="../api/symbols/Diagram.html#makesvg" target="api">Diagram.makeSvg</a> produces a static SVG "image" — the SVG will not be interactive. Note that exporting a diagram to SVG is different from the\r
  functionality introduced in v2.3 that allows the interactive diagram to be rendered in SVG rather than in Canvas. For more information please read:\r
  <a href="SVGContext">SVG Drawing Context</a>\r
</p>\r
\r
<p>Below are several examples of using <a href="../api/symbols/Diagram.html#makesvg" target="api">Diagram.makeSvg</a> on the following diagram:</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
\r
<p>Calling makeSvg with no arguments or with an empty properties object results in a scene that is the same size as the Diagram's viewport.</p>\r
<p>\r
  <em>Note how, unlike an image, you can select the text.</em>\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<div id="result_code0"></div>\r
\r
\r
<p>\r
  Calling makeSvg with an object that has the "scale" property set to 1 results in a scene that includes the whole diagram, not just the area visible in the\r
  viewport. However, the empty areas around the document bounds are trimmed away.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<div id="result_codeA"></div>\r
\r
\r
<p>\r
  Setting the scale property will create a scaled SVG Scene that is precisely large enough to contain the Diagram. The following SVG is created with a scale of\r
  2.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<div id="result_code1"></div>\r
\r
\r
<p>\r
  The following SVG is created by setting the size option of makeSvg. Note that the canvas is scaled uniformly and any extra space is placed on the bottom or\r
  right side of the SVG.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<div id="result_code2"></div>\r
\r
\r
\r
<p>\r
  The following SVG is also created by setting the size option of makeSvg, but only the width is set. The height will be whatever size is needed to uniformly\r
  contain the Diagram.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<div id="result_code3"></div>\r
\r
\r
\r
<p>\r
  The parts option allows us to specify an <a href="../api/symbols/Iterable.html" target="api">Iterable</a> collection of Parts to draw. This is useful if you only want to make an image of part of the diagram,\r
  such as a selection of nodes.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<div id="result_code4"></div>\r
<p>Or drawing only the links:</p>\r
<!-- CODE_BLOCK_7 -->\r
<div id="result_code4_2"></div>\r
\r
\r
\r
<p>Setting both scale and size creates an image that is scaled specifically and cropped to the given size, as in the following image.</p>\r
<!-- CODE_BLOCK_8 -->\r
<div id="result_code5"></div>\r
\r
\r
\r
<p>\r
  Setting both position and size creates a diagram image that is positioned specifically and cropped to the given size. When a position is set but no scale is\r
  set, the scale defaults to 1.\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<div id="result_code7"></div>\r
\r
<p>Setting the background to a CSS color string will replace the transparent Diagram background with the given color.</p>\r
<!-- CODE_BLOCK_10 -->\r
<div id="result_code8"></div>\r
\r
\r
\r
<p>\r
  In the following code we use the document bounds to split the Diagram into four equal parts, making four images out of each part. In this way we can prepare\r
  images for pagination, making a gallery, or printing purposes. The four images created are shown below.\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
<div id="result_manySvg"></div>\r
\r
\r
\r
<h2 id="DownloadingSVGFiles"><a class="not-prose heading-anchor" href="#DownloadingSVGFiles">Downloading SVG files</a></h2>\r
<p>\r
  You do not need to involve the web server if you want the user to download an SVG file. See the sample\r
  <a href="../samples/minimalSvg" target="_blank">Minimal SVG</a>. Note that that sample only downloads a single SVG file, but that file can cover the\r
  whole document.\r
</p>\r
\r
<h2 id="SVG Data"><a class="not-prose heading-anchor" href="#SVG Data">SVG data</a></h2>\r
<p>\r
  As of version 2.3.11, <a href="../api/symbols/Diagram.html#makesvg" target="api">Diagram.makeSvg</a> and the <a href="SVGContext">SVG Rendering Context</a> both set some\r
  <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/data-*">SVG data attributes</a>\r
  on some of the SVG DOM elements.\r
  These are:\r
</p>\r
\r
<ul>\r
  <li><code>portId</code> if a <a href="../api/symbols/GraphObject.html#portid" target="api">GraphObject.portId</a> is set.</li>\r
  <li><code>itemIndex</code> if a <a href="../api/symbols/Panel.html#itemindex" target="api">Panel.itemIndex</a> is set.</li>\r
  <li><code>className</code> if a Part.</li>\r
  <li><code>key</code> if a Part, if <a href="../api/symbols/Part.html#key" target="api">Part.key</a> is set.</li>\r
  <li><code>fromKey</code> if a Link with a fromNode, the <a href="../api/symbols/Part.html#key" target="api">Part.key</a> of that Node.</li>\r
  <li><code>fromPortId</code> if a <a href="../api/symbols/Link.html#fromportid" target="api">Link.fromPortId</a> is set.</li>\r
  <li><code>toKey</code> if a Link with a toNode, the <a href="../api/symbols/Part.html#key" target="api">Part.key</a> of that Node.</li>\r
  <li><code>toPortId</code> if a <a href="../api/symbols/Link.html#toportid" target="api">Link.toPortId</a> is set.</li>\r
</ul>\r
\r
<p>So a Node with Node data with <code>{ key: 'Evaporation' }</code> would have data properties:</p>\r
\r
<!-- CODE_BLOCK_12 -->\r
\r
<h2 id="ContentSecurityPolicy"><a class="not-prose heading-anchor" href="#ContentSecurityPolicy">Content security policy</a></h2>\r
<p>\r
  If your app is served with a Content Security Policy, you may need to enable the dynamic rendering of SVG DOM.\r
  Read more at <a href="SVGContext#ContentSecurityPolicy">SVG Drawing Context</a>.\r
</p>\r
\r
\r
`,codeBlocks:[{id:`diag`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        parameter1: 8,\r
        stroke: "#374151",\r
        strokeWidth: 2\r
      })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
        margin: 4,\r
        stroke: "#374151",\r
        font: "bold 14px 'Marker Felt', 'Ink Free', 'Segoe Print', cursive"\r
      })\r
        .bind("text", "key")\r
    );\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier, curviness: -20 })\r
    .add(\r
      new go.Shape({ stroke: "#374151", strokeWidth: 2 }),\r
      new go.Shape({ toArrow: "Standard", stroke: "#374151", fill: "#374151" })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Transpiration", color: "#bbf7d0" },\r
  { key: "Condensation", color: "#bae6fd" },\r
  { key: "Precipitation", color: "#93c5fd" },\r
  { key: "Collection", color: "#a5f3fc" },\r
  { key: "Evaporation", color: "#fde68a" },\r
];\r
const linkDataArray = [\r
  { from: "Condensation", to: "Precipitation" },\r
  { from: "Precipitation", to: "Collection" },\r
  { from: "Collection", to: "Evaporation" },\r
  { from: "Evaporation", to: "Condensation" },\r
  { from: "Transpiration", to: "Condensation" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.layout = new go.CircularLayout({\r
  radius: 100, sorting: go.CircularSorting.Forwards,\r
  direction: go.CircularDirection.Counterclockwise\r
});`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!1},{id:null,code:`myDiagram.makeSvg();`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  scale: 1\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  scale: 2\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  size: new go.Size(100,100)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  size: new go.Size(100,NaN)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const myPartsList = new go.List();\r
myPartsList.add(myDiagram.findNodeForKey("Evaporation"));\r
myPartsList.add(myDiagram.findNodeForKey("Precipitation"));\r
myDiagram.makeSvg({\r
  parts: myPartsList\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  parts: myDiagram.links\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  scale: 1.5,\r
  size: new go.Size(100,100)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  position: new go.Point(20,20),\r
  size: new go.Size(50,50)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeSvg({\r
  size: new go.Size(NaN,250),\r
  background: "rgba(0, 255, 100, 0.5)" // semi-transparent green background\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const d = myDiagram.documentBounds;\r
const halfWidth = d.width / 2;\r
const halfHeight = d.height / 2;\r
let svg = myDiagram.makeSvg({\r
            position: new go.Point(d.x, d.y),\r
            size: new go.Size(halfWidth,halfHeight)\r
          });\r
addSVG(svg);\r
\r
svg = myDiagram.makeSvg({\r
        position: new go.Point(d.x + halfWidth, d.y),\r
        size: new go.Size(halfWidth,halfHeight)\r
      });\r
addSVG(svg);\r
\r
svg = myDiagram.makeSvg({\r
        position: new go.Point(d.x, d.y + halfHeight),\r
        size: new go.Size(halfWidth,halfHeight)\r
      });\r
addSVG(svg);\r
\r
svg = myDiagram.makeSvg({\r
        position: new go.Point(d.x + halfWidth, d.y + halfHeight),\r
        size: new go.Size(halfWidth,halfHeight)\r
      });\r
addSVG(svg);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`<g transform="matrix(1, 0, 0, 1, 0, 0)" data-class-name="Node" data-key="Evaporation">\r
...\r
</g>`,isExecutable:!1,language:`html`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:`(function() {\r
  // Create a hidden diagram for generating SVGs\r
  const div = document.createElement('div');\r
  div.style.cssText = 'position:absolute;left:-9999px;width:500px;height:500px;';\r
  document.body.appendChild(div);\r
\r
  const myDiagram = new go.Diagram(div);\r
  myDiagram.animationManager.isInitial = false;\r
  const diagram = myDiagram;\r
\r
  // the same "hand-drawn" water cycle diagram shown above\r
  diagram.nodeTemplate =\r
    new go.Node("Auto")\r
      .add(\r
        new go.Shape("RoundedRectangle", {\r
            parameter1: 8,\r
            stroke: "#374151",\r
            strokeWidth: 2\r
          })\r
          .bind("fill", "color"),\r
        new go.TextBlock({\r
            margin: 4,\r
            stroke: "#374151",\r
            font: "bold 14px 'Marker Felt', 'Ink Free', 'Segoe Print', cursive"\r
          })\r
          .bind("text", "key")\r
      );\r
  diagram.linkTemplate =\r
    new go.Link({ curve: go.Curve.Bezier, curviness: -20 })\r
      .add(\r
        new go.Shape({ stroke: "#374151", strokeWidth: 2 }),\r
        new go.Shape({ toArrow: "Standard", stroke: "#374151", fill: "#374151" })\r
      );\r
\r
  diagram.model = new go.GraphLinksModel(\r
    [\r
      { key: "Transpiration", color: "#bbf7d0" },\r
      { key: "Condensation", color: "#bae6fd" },\r
      { key: "Precipitation", color: "#93c5fd" },\r
      { key: "Collection", color: "#a5f3fc" },\r
      { key: "Evaporation", color: "#fde68a" }\r
    ],\r
    [\r
      { from: "Condensation", to: "Precipitation" },\r
      { from: "Precipitation", to: "Collection" },\r
      { from: "Collection", to: "Evaporation" },\r
      { from: "Evaporation", to: "Condensation" },\r
      { from: "Transpiration", to: "Condensation" }\r
    ]\r
  );\r
  diagram.layout = new go.CircularLayout({\r
    radius: 100, sorting: go.CircularSorting.Forwards,\r
    direction: go.CircularDirection.Counterclockwise\r
  });\r
\r
  function addResult(id, el) {\r
    const container = document.getElementById(id);\r
    if (container && el) {\r
      el.classList.add('imageResult');\r
      el.style.display = 'inline-block'; // change from svg block default\r
      container.appendChild(el);\r
    }\r
  }\r
\r
  // Each example\r
  addResult('result_code0', myDiagram.makeSvg());\r
  addResult('result_codeA', myDiagram.makeSvg({ scale: 1 }));\r
  addResult('result_code1', myDiagram.makeSvg({ scale: 2 }));\r
  addResult('result_code2', myDiagram.makeSvg({ size: new go.Size(100, 100) }));\r
  addResult('result_code3', myDiagram.makeSvg({ size: new go.Size(100, NaN) }));\r
\r
  // Parts example\r
  const myPartsList = new go.List();\r
  myPartsList.add(myDiagram.findNodeForKey("Evaporation"));\r
  myPartsList.add(myDiagram.findNodeForKey("Precipitation"));\r
  addResult('result_code4', myDiagram.makeSvg({ parts: myPartsList }));\r
  addResult('result_code4_2', myDiagram.makeSvg({ parts: myDiagram.links }));\r
\r
  addResult('result_code5', myDiagram.makeSvg({ scale: 1.5, size: new go.Size(100, 100) }));\r
  addResult('result_code7', myDiagram.makeSvg({ position: new go.Point(20, 20), size: new go.Size(50, 50) }));\r
  addResult('result_code8', myDiagram.makeSvg({ size: new go.Size(NaN, 250), background: "rgba(0, 255, 100, 0.5)" }));\r
\r
  // Multi-SVG example\r
  const d = myDiagram.documentBounds;\r
  const halfWidth = d.width / 2;\r
  const halfHeight = d.height / 2;\r
  const container = document.getElementById('result_manySvg');\r
  function addSVG(svg) { svg.classList.add('imageResult'); svg.style.display = 'inline-block'; container.appendChild(svg); }\r
\r
  addSVG(myDiagram.makeSvg({ position: new go.Point(d.x, d.y), size: new go.Size(halfWidth, halfHeight) }));\r
  addSVG(myDiagram.makeSvg({ position: new go.Point(d.x + halfWidth, d.y), size: new go.Size(halfWidth, halfHeight) }));\r
  addSVG(myDiagram.makeSvg({ position: new go.Point(d.x, d.y + halfHeight), size: new go.Size(halfWidth, halfHeight) }));\r
  addSVG(myDiagram.makeSvg({ position: new go.Point(d.x + halfWidth, d.y + halfHeight), size: new go.Size(halfWidth, halfHeight) }));\r
\r
  // Clean up\r
  myDiagram.div = null;\r
  div.remove();\r
})();`}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`12cyi6r`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};