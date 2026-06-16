import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Making images`},htmlContent:`<style type="text/css">\r
  .imageResult {\r
    border: 1px solid var(--color-border);\r
    margin-bottom: 32px;\r
    display: inline-block;\r
  }\r
</style>\r
\r
<h1>Making raster images</h1>\r
<p>\r
  GoJS has two functions for creating raster images: <a href="../api/symbols/Diagram.html#makeimagedata" target="api">Diagram.makeImageData</a>, which outputs a Base64 image data string, and\r
  <a href="../api/symbols/Diagram.html#makeimage" target="api">Diagram.makeImage</a>, which is a convenience function that calls <a href="../api/symbols/Diagram.html#makeimagedata" target="api">Diagram.makeImageData</a> and returns a new HTMLImageElement with the image data as\r
  its source. Both functions have the same single argument, a JavaScript Object that contains several definable properties, enumerated in the documentation.\r
</p>\r
<p>\r
  This page is almost identical to the page on <a href="makingSVG">Making SVG</a>, which shows how to render SVG elements instead of PNG or JPEG images.\r
</p>\r
<p>\r
  All of the examples below use the following diagram:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>Calling makeImage with no arguments or with an empty properties object results in an image that is the same size as the Diagram's viewport.</p>\r
<!-- CODE_BLOCK_1 -->\r
<div id="result_code0"></div>\r
\r
<p>\r
  Calling makeImage with an object that has the "scale" property set to 1 results in an image that includes the whole diagram, not just the area visible in the\r
  viewport. However, the empty areas around the document bounds are trimmed away.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<div id="result_codeA"></div>\r
\r
<p>\r
  Setting the scale property will create a scaled image that is precisely large enough to contain the Diagram. The following image is created with a scale of 2.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<div id="result_code1"></div>\r
\r
\r
<p>\r
  The following image is created by setting the size option of makeImage. Note that the canvas is scaled uniformly and any extra space is placed on the bottom\r
  or right side of the image.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<div id="result_code2"></div>\r
\r
<p>\r
  The following image is also created by setting the size option of makeImage, but only the width is set. The height will be whatever size is needed to\r
  uniformly contain the Diagram.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<div id="result_code3"></div>\r
\r
<p>\r
  The parts option allows us to specify an <a href="../api/symbols/Iterable.html" target="api">Iterable</a> collection of Parts to draw. This is useful if you only want to make an image of part of the diagram,\r
  such as a selection of nodes.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<div id="result_code4"></div>\r
\r
<p>Or simply drawing only the links:</p>\r
<!-- CODE_BLOCK_7 -->\r
<div id="result_code4_2"></div>\r
\r
<p>Setting both scale and size creates an image that is scaled specifically and cropped to the given size, as in the following image.</p>\r
<!-- CODE_BLOCK_8 -->\r
<div id="result_code5"></div>\r
\r
<p>\r
  We may want a very large, scaled image that has a limit on its size, and we can use the maxSize property to constrain one or both dimensions. The following\r
  image has a very large scale applied but is limited in size horizontally, so some horizontal cropping will occur.\r
</p>\r
<p>\r
  The default value for maxSize is <code>go.Size(4000, 4000)</code>, and specifying <code>go.Size(600, NaN)</code> is equivalent to specifying\r
  <code>go.Size(600, 4000)</code>. If we wanted no cropping on the height we could instead write <code>go.Size(600, Infinity)</code>.\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<div id="result_code6"></div>\r
\r
<p>\r
  Setting both position and size creates a diagram image that is positioned specifically and cropped to the given size. When a position is set but no scale is\r
  set, the scale defaults to 1.\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
<div id="result_code7"></div>\r
\r
<p>Setting the background to a CSS color string will replace the transparent Diagram background with the given color.</p>\r
<!-- CODE_BLOCK_11 -->\r
<div id="result_code8"></div>\r
\r
<p>\r
  In the following code we use the document bounds to split the Diagram into four equal parts, making four images out of each part. In this way we can prepare\r
  images for pagination, making a gallery, or printing purposes. The four images created are shown below.\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
<div id="result_manyImg"></div>\r
\r
\r
<h2 id="ImageType"><a class="not-prose heading-anchor" href="#ImageType">Image type</a></h2>\r
<p>\r
  We can set the type and details properties of the argument object in order to retrieve different kinds of images.\r
  The default type is "image/png", and another widely supported MIME type is "image/jpeg".\r
  The details for a JPEG determine its quality by using values from 0 to 1 inclusive.\r
  JPEGs are not commonly used for Diagrams because their lossy compression can render text unreadable.\r
</p>\r
<p>\r
  The following image is an outputted JPEG. Note how the transparent background is turned black,\r
  because the JPEG format does not support alpha transparency,\r
  and the default state of the HTML canvas is that of fully transparent black pixels, rgba(0,0,0,0).\r
</p>\r
<!-- CODE_BLOCK_13 -->\r
<div id="result_codea1"></div>\r
\r
<p>The following image is a JPEG created with an AntiqueWhite background specified.</p>\r
<!-- CODE_BLOCK_14 -->\r
<div id="result_codea2"></div>\r
\r
<p>The following image is a JPEG created (with an AntiqueWhite background) and the details option, at very low quality.</p>\r
<!-- CODE_BLOCK_15 -->\r
<div id="result_codea3"></div>\r
\r
<h2 id="DownloadingImages"><a class="not-prose heading-anchor" href="#DownloadingImages">Downloading images</a></h2>\r
<p>\r
  You do not need to involve the web server if you want the user to download an image. See the sample\r
  <a href="../samples/minimalBlob" target="_blank">Minimal Blob</a>. Note that that sample only downloads a single image.\r
</p>\r
<p>\r
  We suggest that you use SVG for downloading an image, if that choice is acceptable to your users. That sample is at\r
  <a href="../samples/minimalSvg" target="_blank">Minimal SVG</a>.\r
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
});`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!1},{id:null,code:`myDiagram.makeImage();`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  scale: 1\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  scale: 2\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  size: new go.Size(100,100)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  size: new go.Size(100,NaN)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const myPartsList = new go.List();\r
myPartsList.add(myDiagram.findNodeForKey("Evaporation"));\r
myPartsList.add(myDiagram.findNodeForKey("Precipitation"));\r
myDiagram.makeImage({\r
  parts: myPartsList\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  parts: myDiagram.links\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  scale: 1.5,\r
  size: new go.Size(100,100)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  scale: 9,\r
  maxSize: new go.Size(600, NaN)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  position: new go.Point(20,20),\r
  size: new go.Size(50,50)\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  size: new go.Size(NaN,250),\r
  background: "rgba(0, 255, 100, 0.5)" // semi-transparent green background\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const d = myDiagram.documentBounds;\r
const halfWidth = d.width / 2;\r
const halfHeight = d.height / 2;\r
let img = myDiagram.makeImage({\r
            position: new go.Point(d.x, d.y),\r
            size: new go.Size(halfWidth,halfHeight)\r
          });\r
addImage(img);\r
\r
img = myDiagram.makeImage({\r
        position: new go.Point(d.x + halfWidth, d.y),\r
        size: new go.Size(halfWidth,halfHeight)\r
      });\r
addImage(img);\r
\r
img = myDiagram.makeImage({\r
        position: new go.Point(d.x, d.y + halfHeight),\r
        size: new go.Size(halfWidth,halfHeight)\r
      });\r
addImage(img);\r
\r
img = myDiagram.makeImage({\r
        position: new go.Point(d.x + halfWidth, d.y + halfHeight),\r
        size: new go.Size(halfWidth,halfHeight)\r
      });\r
addImage(img);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  scale: 1,\r
  type: "image/jpeg"\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  scale: 1,\r
  background: "AntiqueWhite",\r
  type: "image/JPEG"\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.makeImage({\r
  scale: 1,\r
  background: "AntiqueWhite",\r
  type: "image/jpeg",\r
  details: 0.05\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:`(function() {\r
  // Create a hidden diagram for generating images\r
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
      el.className = 'imageResult';\r
      container.appendChild(el);\r
    }\r
  }\r
\r
  // Each example\r
  addResult('result_code0', myDiagram.makeImage());\r
  addResult('result_codeA', myDiagram.makeImage({ scale: 1 }));\r
  addResult('result_code1', myDiagram.makeImage({ scale: 2 }));\r
  addResult('result_code2', myDiagram.makeImage({ size: new go.Size(100, 100) }));\r
  addResult('result_code3', myDiagram.makeImage({ size: new go.Size(100, NaN) }));\r
\r
  // Parts example\r
  const myPartsList = new go.List();\r
  myPartsList.add(myDiagram.findNodeForKey("Evaporation"));\r
  myPartsList.add(myDiagram.findNodeForKey("Precipitation"));\r
  addResult('result_code4', myDiagram.makeImage({ parts: myPartsList }));\r
  addResult('result_code4_2', myDiagram.makeImage({ parts: myDiagram.links }));\r
\r
  addResult('result_code5', myDiagram.makeImage({ scale: 1.5, size: new go.Size(100, 100) }));\r
  addResult('result_code6', myDiagram.makeImage({ scale: 9, maxSize: new go.Size(600, NaN) }));\r
  addResult('result_code7', myDiagram.makeImage({ position: new go.Point(20, 20), size: new go.Size(50, 50) }));\r
  addResult('result_code8', myDiagram.makeImage({ size: new go.Size(NaN, 250), background: "rgba(0, 255, 100, 0.5)" }));\r
\r
  // Multi-image example\r
  const d = myDiagram.documentBounds;\r
  const halfWidth = d.width / 2;\r
  const halfHeight = d.height / 2;\r
  const container = document.getElementById('result_manyImg');\r
  function addImage(img) { img.className = 'imageResult'; container.appendChild(img); }\r
\r
  addImage(myDiagram.makeImage({ position: new go.Point(d.x, d.y), size: new go.Size(halfWidth, halfHeight) }));\r
  addImage(myDiagram.makeImage({ position: new go.Point(d.x + halfWidth, d.y), size: new go.Size(halfWidth, halfHeight) }));\r
  addImage(myDiagram.makeImage({ position: new go.Point(d.x, d.y + halfHeight), size: new go.Size(halfWidth, halfHeight) }));\r
  addImage(myDiagram.makeImage({ position: new go.Point(d.x + halfWidth, d.y + halfHeight), size: new go.Size(halfWidth, halfHeight) }));\r
\r
  // JPEG examples\r
  addResult('result_codea1', myDiagram.makeImage({ scale: 1, type: "image/jpeg" }));\r
  addResult('result_codea2', myDiagram.makeImage({ scale: 1, background: "AntiqueWhite", type: "image/jpeg" }));\r
  addResult('result_codea3', myDiagram.makeImage({ scale: 1, background: "AntiqueWhite", type: "image/jpeg", details: 0.05 }));\r
\r
  // Clean up\r
  myDiagram.div = null;\r
  div.remove();\r
})();`}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`16exffh`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};