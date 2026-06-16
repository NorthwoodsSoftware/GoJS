import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Realtime Selection During Background Dragging`,titleShort:`Realtime Selection`,indexDescription:`A custom Tool that lets a user drag and create a box to select nodes and links.`,screenshot:`realtimedragselecting`,priority:2,tags:[`collections`,`treelayout`,`tools`,`extensions`],description:`This customized DragSelectingTool selects and deselects parts continuously while the user is dragging a box, rather than when the tool finishes.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialDocumentSpot: go.Spot.Center,\r
      initialViewportSpot: go.Spot.Center,\r
\r
      // replace the standard DragSelectingTool with one that selects while dragging,\r
      // and also only requires overlapping bounds with the dragged box to be selected\r
      dragSelectingTool: new RealtimeDragSelectingTool({\r
        isPartialInclusion: true,\r
        delay: 50,\r
          // replace the magenta box with a red one\r
        box:\r
          new go.Part({ layerName: 'Tool', selectable: false })\r
            .add(\r
              new go.Shape({\r
                name: 'SHAPE',\r
                fill: 'rgba(255,0,0,0.1)',\r
                stroke: 'red',\r
                strokeWidth: 2\r
              })\r
            )\r
      }),\r
\r
      // Define the template for Nodes, just some text inside a colored rectangle\r
      nodeTemplate:\r
        new go.Node('Spot', { width: 70, height: 20 })\r
          .add(\r
            new go.Shape('Rectangle')\r
              .bind('fill', 'c'),\r
            new go.TextBlock({ margin: 2 })\r
              .bind('text', 'c')\r
          ),\r
\r
      // Define the template for Links, just a simple line\r
      linkTemplate:\r
        new go.Link()\r
          .add(\r
            new go.Shape({ stroke: 'black' })\r
          ),\r
\r
      layout: new go.TreeLayout()\r
    });\r
\r
    myDiagram.model = loadTree();\r
  }\r
\r
  function loadTree() {\r
    // create some tree data\r
    var total = 49;\r
    var treedata = [];\r
    for (var i = 0; i < total; i++) {\r
      // these property names are also specified when creating the TreeModel\r
      var d = {\r
        key: i, // this node data's key\r
        c: go.Brush.randomColor(), // the node's color\r
        parent: i > 0 ? Math.floor((Math.random() * i) / 2) : undefined // the random parent's key\r
      };\r
      treedata.push(d);\r
    }\r
    return new go.TreeModel(treedata);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/RealtimeDragSelectingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates the RealtimeDragSelectingTool, which replaces the standard <a>DragSelectingTool</a>. Press in the background, wait briefly, and\r
    then drag to start selecting Nodes or Links that intersect with the box. You can press or release Control (Command on Mac) or Shift while dragging to see\r
    how the selection changes.\r
  </p>\r
  <p>\r
    Load it in your own app by including <a href="../extensions/RealtimeDragSelectingTool.js">RealtimeDragSelectingTool.js</a>. Initialize your Diagram by setting\r
    <a>ToolManager.dragSelectingTool</a> to a new instance of this tool. For example:\r
  </p>\r
  <!-- DESC_CODE_BLOCK_0 -->\r
  or\r
  <!-- DESC_CODE_BLOCK_1 -->`,descriptionCodeBlocks:[{code:`myDiagram.toolManager.dragSelectingTool = new RealtimeDragSelectingTool();`,language:`js`},{code:`new go.Diagram({\r
  . . .,\r
  "toolManager.dragSelectingTool": new RealtimeDragSelectingTool({ isPartialInclusion: true }),\r
  . . .\r
})`,language:`js`}]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`treelayout`,`tools`,`extensions`];var g=y();l(`el2862`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};