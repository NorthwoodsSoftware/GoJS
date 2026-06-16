import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Avoids Links Router for Reducing Overlapping Link Segments`,titleShort:`Avoids Links Router`,indexDescription:`A custom Router that moves Link segments to parallelize and avoid overlaps.`,screenshot:`avoidslinksrouter`,priority:2,tags:[`links`,`routers`,`extensions`],description:`A custom Router that moves Link segments to parallelize and avoid overlaps.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px;"></div>\r
  <button onclick="toggleRouter()">Toggle AvoidsLinksRouter</button>`,jsCode:`var myRouter = new AvoidsLinksRouter({ epsilonDistance: 2 });\r
  var myDiagram;\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bind('position', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape({\r
              fill: 'white',\r
              portId: '',\r
              fromSpot: go.Spot.AllSides,\r
              toSpot: go.Spot.AllSides\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ font: '15px serif', margin: 8 })\r
            .bind('text')\r
        );\r
    myDiagram.routers.push(myRouter);\r
\r
    myDiagram.nodeTemplateMap.add('Block',\r
      new go.Node({\r
          layerName: 'Background',\r
          background: '#6e6e6e'\r
        })\r
        .bind('desiredSize', 'size', go.Size.parse)\r
        .bind('position', 'pos', go.Point.parse)\r
      );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Link.AvoidsNodes, corner: 10 })\r
        .bind('fromSpot')\r
        .bind('toSpot')\r
        .add(\r
          // use a binding to create a different color for each node\r
          new go.Shape({ strokeWidth: 1 })\r
            .bind('stroke', '', linkStroke),\r
          new go.Shape({ toArrow: 'Triangle', scale: 0.4 })\r
        );\r
\r
    let lastColor = 'red';\r
    let colors = 0;\r
    function linkStroke() {\r
      lastColor = go.Brush.lightenBy(lastColor, 0.05);\r
      colors++;\r
      if (colors > 10) {\r
        colors = 0;\r
        lastColor = 'blue';\r
      }\r
      return lastColor; //go.Brush.randomColor();\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: go.Brush.lightenBy('red', 0.7), pos: '-100 0' },\r
        { key: 2, text: 'Beta', color: go.Brush.lightenBy('red', 0.6), pos: '100 0' },\r
        { key: 3, text: 'Gamma', color: go.Brush.lightenBy('red', 0.5), pos: '-100 60' },\r
        { key: 4, text: 'Delta', color: go.Brush.lightenBy('red', 0.4), pos: '182 60' },\r
        { key: 5, text: 'Epsilon', color: go.Brush.lightenBy('red', 0.3), pos: '100 260' },\r
        { key: 6, text: 'Zeta', color: go.Brush.lightenBy('red', 0.2), pos: '210 260' },\r
        { category: 'Block', pos: '0 60', size: '40 140' },\r
        { category: 'Block', pos: '20 140', size: '140 40' },\r
        { category: 'Block', pos: '180 140', size: '140 40' },\r
        { key: 11, text: 'S1', pos: '-100 -80' },\r
        { key: 21, text: 'S2', pos: '120 -80' },\r
        { key: 12, text: 'S3', pos: '-100 -190' },\r
        { key: 22, text: 'S4', pos: '120 -190' },\r
        { category: 'Block', pos: '0 -100', size: '40 140' },\r
        { category: 'Block', pos: '0 -280', size: '40 140' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 2 },\r
        { from: 2, to: 1 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 3 },\r
        { from: 2, to: 5 },\r
        { from: 2, to: 5 },\r
        { from: 5, to: 2 },\r
        { from: 4, to: 6 },\r
        { from: 6, to: 4 },\r
        { from: 11, to: 21, fromSpot: go.Spot.TopSide, toSpot: go.Spot.TopSide },\r
        { from: 11, to: 21, fromSpot: go.Spot.TopSide, toSpot: go.Spot.TopSide },\r
        { from: 11, to: 21, fromSpot: go.Spot.LeftSide, toSpot: go.Spot.RightSide },\r
        { from: 11, to: 21, fromSpot: go.Spot.LeftSide, toSpot: go.Spot.RightSide },\r
        { from: 11, to: 21, fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },\r
        { from: 11, to: 21, fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },\r
        { from: 11, to: 21, fromSpot: go.Spot.BottomSide, toSpot: go.Spot.BottomSide },\r
        { from: 11, to: 21, fromSpot: go.Spot.BottomSide, toSpot: go.Spot.BottomSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.TopSide, toSpot: go.Spot.TopSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.TopSide, toSpot: go.Spot.TopSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.LeftSide, toSpot: go.Spot.RightSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.LeftSide, toSpot: go.Spot.RightSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.BottomSide, toSpot: go.Spot.BottomSide },\r
        { from: 12, to: 22, fromSpot: go.Spot.BottomSide, toSpot: go.Spot.BottomSide }\r
      ]\r
    );\r
  }\r
\r
  function toggleRouter() {\r
    myDiagram.startTransaction('change link routes');\r
    if (myDiagram.routers.count > 1) {\r
      myDiagram.routers.pop();\r
    } else {\r
      myDiagram.routers.push(myRouter);\r
    }\r
\r
    for (const link of myDiagram.links) {\r
      link.invalidateRoute();\r
    }\r
    myDiagram.commitTransaction('change link routes');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/AvoidsLinksRouter.js`],descriptionHtml:`<p>\r
    The AvoidsLinksRouter attempts to reduce overlapping links. To see its function more clearly,\r
    try dragging the nodes around or disabling it.\r
  </p>\r
  <p>\r
    The <a>Diagram.router</a> is an instance of the <a>AvoidsLinksRouter</a> extension router,\r
    defined in <a href="../extensions/AvoidsLinksRouter.js">extensions/AvoidsLinksRouter.js</a>.\r
  </p>\r
  <p>\r
    The TypeScript source is at\r
    <a href="../extensionsJSM/AvoidsLinksRouter.ts">extensionsJSM/AvoidsLinksRouter.ts</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`routers`,`extensions`];var g=y();l(`y3xl1t`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};