import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Drag Zooming Tool Lets User Draw Box for What Will Be Shown in Viewport`,titleShort:`Drag Zooming`,indexDescription:`A custom Tool that lets a user draw a box showing what to zoom in to.`,screenshot:`dragzooming`,priority:2,tags:[`treelayout`,`tools`,`extensions`],description:`Users can zoom into and out of a diagram by drawing a rectangle showing what part of the document should be shown by the new viewport.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 800px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialDocumentSpot: go.Spot.Center,\r
      initialViewportSpot: go.Spot.Center,\r
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
        new go.Link({ corner: 10 })\r
          .add(\r
            new go.Shape({ stroke: 'black' })\r
          ),\r
\r
      layout: new go.TreeLayout({\r
        angle: 90,\r
        nodeSpacing: 4,\r
        compaction: go.TreeCompaction.None\r
      }),\r
\r
      model: new go.TreeModel({\r
        // we use single character property names, to save space if rendered as JSON\r
        nodeKeyProperty: 'k',\r
        nodeParentKeyProperty: 'p'\r
      })\r
    });\r
\r
    // Add an instance of the custom tool defined in DragZoomingTool.js.\r
    // This needs to be inserted before the standard DragSelectingTool,\r
    // which is normally the third Tool in the ToolManager.mouseMoveTools list.\r
    myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragZoomingTool());\r
\r
    // This is a status message\r
    myLoading =\r
      new go.Part({ selectable: false, location: new go.Point(0, 0) })\r
        .add(\r
          new go.TextBlock('loading...', { stroke: 'red', font: '20pt sans-serif' })\r
        );\r
    // temporarily add the status indicator\r
    myDiagram.add(myLoading);\r
\r
    // allow the myLoading indicator to be shown now,\r
    // but allow objects added in loadTree to also be considered part of the initial Diagram\r
    myDiagram.delayInitialization(loadTree);\r
  }\r
\r
  function loadTree(diagram) {\r
    // create some tree data\r
    var total = 99;\r
    var treedata = [];\r
    for (var i = 0; i < total; i++) {\r
      // these property names are also specified when creating the TreeModel\r
      var d = {\r
        k: i, // this node data's key\r
        c: go.Brush.randomColor(), // the node's color\r
        p: i > 0 ? Math.floor((Math.random() * i) / 2) : undefined // the random parent's key\r
      };\r
      treedata.push(d);\r
    }\r
\r
    // give the Diagram's model all the data\r
    diagram.model.nodeDataArray = treedata;\r
\r
    // remove the status indicator\r
    diagram.remove(myLoading);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DragZoomingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates the DragZoomingTool, which replaces the standard DragSelectingTool. It is defined in its own file, as\r
    <a href="../extensions/DragZoomingTool.js">DragZoomingTool.js</a>.\r
  </p>\r
  <p>\r
    Press in the background, wait briefly, and then drag to zoom in to show the area of the drawn rectangle. Hold down the Shift key to zoom out. The rectangle\r
    always has the same aspect ratio as the viewport of the diagram.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`tools`,`extensions`];var g=y();l(`51haz8`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};