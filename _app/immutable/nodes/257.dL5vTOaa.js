import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Rotating Node about Movable Rotation Spot`,indexDescription:`A custom RotatingTool that lets the user shift the rotation point.`,screenshot:`spotrotating`,priority:2,tags:[`tools`,`extensions`],description:`Allow the user to shift the rotation point as well as rotate objects by using the SpotRotatingTool extension.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px; background-color: gray"></div>\r
  <p>\r
    Auto updating Model Data:\r
  </p>\r
  <pre class="lang-js"><code id="mySavedModel" style="width: 100%; height: 200px"></code></pre>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      rotatingTool: new SpotRotatingTool(),\r
      'undoManager.isEnabled': true,\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) {\r
          document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
        }\r
      }\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationObjectName: 'SHAPE',\r
          locationSpot: go.Spot.Center,\r
          selectionObjectName: 'SHAPE',\r
          resizable: true,\r
          resizeObjectName: 'SHAPE', // name of the graph object to be resized\r
          rotatable: true,\r
          rotateObjectName: 'SHAPE', // name of the graph object to be rotate\r
          rotationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bindTwoWay('rotationSpot', 'rotSpot', go.Spot.parse, go.Spot.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              name: 'SHAPE',\r
              fill: 'orange',\r
              strokeWidth: 2\r
            })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
            .bindTwoWay('angle'),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 3, to: 4 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/SpotRotatingTool.js`],descriptionHtml:`<p>\r
    The user can resize and rotate the Shape named "SHAPE" in the Nodes. In addition to the normal features of the RotatingTool, the SpotRotatingTool shows a\r
    handle at the <a>Part.rotationSpot</a>, which is also at the <a>RotatingTool.rotationPoint</a>. The user can drag that handle and thereby move the\r
    rotationPoint and the <a>Part.rotationSpot</a>. When the handle is inside the rectangular area of the <a>Part.rotateObject</a>, the Spot is purely\r
    fractional. When the handle moves outside of the object's rectangular area, the spot will be at the edge of the rectangle plus an offset.\r
  </p>\r
  <p>This extension tool is defined in its own file, as <a href="../extensions/SpotRotatingTool.js">SpotRotatingTool.js</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`7hwjml`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};