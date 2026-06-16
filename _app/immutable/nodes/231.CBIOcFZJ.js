import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Rescaling by Dragging Handle`,indexDescription:`A custom Tool that lets a user change the scale of an object.`,screenshot:`rescaling`,priority:2,tags:[`tools`,`extensions`],description:`A demonstration of the RescalingTool extension.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true, // enable undo & redo\r
      layout: new go.TreeLayout()\r
    });\r
\r
    // install the RescalingTool as a mouse-down tool\r
    myDiagram.toolManager.mouseDownTools.add(new RescalingTool());\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bindTwoWay('scale')\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 })\r
            .bind('text')\r
        );\r
\r
    // but use the default Link template, by not setting Diagram.linkTemplate\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel({\r
      nodeDataArray: [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' }\r
      ],\r
      linkDataArray: [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 3, to: 4 }\r
      ]\r
  });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/RescalingTool.js`],descriptionHtml:`<p>\r
    Selecting a node will show a rescaling handle that when dragged will modify the node's <a>GraphObject.scale</a>\r
    property.\r
  </p>\r
  <p>\r
    Just as the <a>ResizingTool</a> changes the <a>GraphObject.desiredSize</a> of an object, and just as the <a>RotatingTool</a> changes the\r
    <a>GraphObject.angle</a> of an object, the <a>RescalingTool</a> changes the <a>GraphObject.scale</a> of an object.\r
  </p>\r
  <p>This extension tool is defined in its own file, as <a href="../extensions/RescalingTool.js">RescalingTool.js</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`nytci1`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};