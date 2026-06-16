import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Grid patterns`},htmlContent:`<h1>Grid patterns</h1>\r
<p>\r
  It is common to want to display a grid of lines drawn at regular intervals. You may also want to force dragged parts to be aligned on grid points, and to\r
  resize parts to be multiples of the grid cell size.\r
</p>\r
<p>\r
  Grids are implemented using a type of <a href="../api/symbols/Panel.html" target="api">Panel</a>, <a href="../api/symbols/Panel.html#grid" target="api">Panel.Grid</a>. Grid Panels, like most other types of Panels, can be used within <a href="../api/symbols/Node.html" target="api">Node</a>s or any\r
  other kind of <a href="../api/symbols/Part.html" target="api">Part</a>. However when they are used as the <a href="../api/symbols/Diagram.html#grid" target="api">Diagram.grid</a>, they are effectively infinite in extent.\r
</p>\r
<p>\r
  Unlike in other kinds of <a href="../api/symbols/Panel.html" target="api">Panel</a>s, Grid Panel elements must be <a href="../api/symbols/Shape.html" target="api">Shape</a>s that are only used to control how the grid lines or grid bars are drawn.\r
</p>\r
<p>\r
  See samples that make use of grids in the <a href="../samples/#grid">samples index</a>.\r
</p>\r
\r
<h2 id="DefaultGrid"><a class="not-prose heading-anchor" href="#DefaultGrid">Default grid</a></h2>\r
<p>\r
  To display a grid pattern in the background of the diagram, you can just make the <a href="../api/symbols/Diagram.html#grid" target="api">Diagram.grid</a> visible:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="GridSnapping"><a class="not-prose heading-anchor" href="#GridSnapping">Grid snapping</a></h2>\r
<p>\r
  The <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a> and <a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a> can change their behavior based on the background grid pattern, if you set the\r
  <a href="../api/symbols/DraggingTool.html#isgridsnapenabled" target="api">DraggingTool.isGridSnapEnabled</a> and/or <a href="../api/symbols/ResizingTool.html#isgridsnapenabled" target="api">ResizingTool.isGridSnapEnabled</a> properties to true.\r
</p>\r
<p>\r
  Setting <a href="../api/symbols/DraggingTool.html#isgridsnapenabled" target="api">DraggingTool.isGridSnapEnabled</a> to true will not affect\r
  <a href="links#DisconnectedLinks" target="_blank">disconnected Links</a>, but these can snap if you define a custom\r
  <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a> to do so on the Link template.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="SimpleGridCustomization"><a class="not-prose heading-anchor" href="#SimpleGridCustomization">Simple grid customization</a></h2>\r
<p>\r
  You can change the size of the grid cell by setting <a href="../api/symbols/Panel.html#gridcellsize" target="api">Panel.gridCellSize</a>:\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  The cell size used when snapping the locations of Parts during a drag does not need to be exactly the same as the background grid's cell size. The value of\r
  <a href="../api/symbols/DraggingTool.html#gridsnapcellsize" target="api">DraggingTool.gridSnapCellSize</a> takes precedence over the <a href="../api/symbols/Panel.html#gridcellsize" target="api">Panel.gridCellSize</a>. Note that if DraggingTool.gridSnapCellSize is set but\r
  <a href="../api/symbols/ResizingTool.html#cellsize" target="api">ResizingTool.cellSize</a> is not, Parts will use the DraggingTool.gridSnapCellSize value when resizing.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h2 id="CustomGrids"><a class="not-prose heading-anchor" href="#CustomGrids">Custom grids</a></h2>\r
<p>\r
  Grid patterns are implemented by the <a href="../api/symbols/Panel.html" target="api">Panel</a> class when its <a href="../api/symbols/Panel.html#type" target="api">Panel.type</a> is <a href="../api/symbols/Panel.html#grid" target="api">Panel.Grid</a>. The elements of a Grid Panel must be <a href="../api/symbols/Shape.html" target="api">Shape</a>s\r
  whose <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> is one of a small set of known kinds of figures. The only figures it can accept are: "LineH", "LineV", "BarH", and "BarV". The two\r
  "Line" figures result in stroked lines separating the grid cells; the two "Bar" figures result in filled rectangles in the grid cells.\r
  Thus, set the <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> property on "Line" figures and the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> property on "bar" figures to change colors.\r
</p>\r
<p>\r
  Here is a simple grid consisting of blue horizontal lines and green vertical lines:\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  The <a href="../api/symbols/Shape.html#interval" target="api">Shape.interval</a> property is also used by a Grid Panel to determine how frequently a line should be drawn. The value should be a positive integer\r
  specifying how many cells there are between drawings of this particular line. So if you wanted darker blue and darker green lines every five cells:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  Note that the Shapes are drawn in the order in which they appear in the Panel, so you can see that the dark blue horizontal lines are drawn in front of the\r
  light green vertical lines, and that the dark green vertical line crosses in front of the dark blue horizontal lines.\r
</p>\r
<p>\r
  Here is the definition of the predefined <a href="../api/symbols/Diagram.html#grid" target="api">Diagram.grid</a>:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  You can get a green-bar pattern by using the "BarH" figure. Note the use of <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> instead of <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> and explicitly setting the\r
  <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>:\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
<p>\r
  This example also demonstrates how one can use the <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a> property to customize where the user can drag the node. In this case the\r
  <a href="../api/symbols/Part.html#location" target="api">Part.location</a>.y is limited to be multiples of 100, corresponding to the rows of cells filled by the green bars.\r
</p>\r
<p>\r
  To get a tablecloth effect, one can use both vertical and horizontal bars with a translucent color:\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  This example limits dragging of all nodes by setting <a href="../api/symbols/DraggingTool.html#isgridsnapenabled" target="api">DraggingTool.isGridSnapEnabled</a> to true.\r
</p>\r
<p>\r
  Another custom grid: dots\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>\r
  "Grid" <a href="../api/symbols/Panel.html" target="api">Panel</a>s can also be used like any other Panel element as part of a Node.\r
  Here is a simple example using one as a regular data bound element.\r
  Try resizing the Nodes to see how they tile based on their grid properties:\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
\r
<h3 id="temporarily-ignoring-grid-snap"><a class="not-prose heading-anchor" href="#temporarily-ignoring-grid-snap">Temporarily ignoring grid snap</a></h3>\r
<p>\r
  The <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a> property passes both the Part's precise location and snapped location to its given function,\r
  and thus it can easily be used to allow the user to precision drag and ignore the grid. The following example contains a simple\r
  drag computation that allows users to precision drag when holding down <kbd>Shift</kbd>:\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
\r
<h2 id="OtherConsiderations"><a class="not-prose heading-anchor" href="#OtherConsiderations">Other considerations</a></h2>\r
<p>\r
  A Grid Panel should have a non-null <code>background</code> if it needs to be pickable.\r
  One cannot set or bind the <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a> of a Grid Panel.\r
</p>\r
<p>\r
  Events on the Shapes will be ignored. Shapes in a Grid Panel must not be scaled or rotated.\r
</p>\r
`,codeBlocks:[{id:`defaultGrid`,code:`diagram.grid.visible = true;`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`gridSnapping`,code:`diagram.grid.visible = true;\r
diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
diagram.toolManager.resizingTool.isGridSnapEnabled = true;\r
diagram.scale = 1.5;\r
\r
diagram.add(new go.Node("Auto", { selectionAdorned: false, resizable: true, height: 50, width: 50 })\r
  .add(\r
    new go.Shape("Rectangle", { fill: "#A72608", strokeWidth: 1 })\r
  ));`,isExecutable:!0,animation:!1,minHeight:250,language:`js`,initiallyVisible:!0},{id:`biggerGrid`,code:`diagram.grid.visible = true;\r
diagram.grid.gridCellSize = new go.Size(30, 20);\r
diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
diagram.toolManager.resizingTool.isGridSnapEnabled = true;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { resizable: true })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#A72608" }),\r
      new go.TextBlock({ margin: 5, stroke: "white" })\r
        .bind("text", "key")\r
    );\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta", loc: "150 0" },\r
  { key: "Gamma", loc: "0 100" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`gridSnapping2`,code:`diagram.grid.visible = true;\r
diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
diagram.toolManager.resizingTool.isGridSnapEnabled = true;\r
\r
// snap to every other point both vertically and horizontally\r
// (the default background grid has a cell size of 10x10)\r
diagram.toolManager.draggingTool.gridSnapCellSize = new go.Size(20, 20);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { resizable: true })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#A72608" }),\r
      new go.TextBlock({ margin: 5, stroke: "white" })\r
        .bind("text", "key")\r
    );\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta", loc: "100 0" },\r
  { key: "Gamma", loc: "0 100" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`customBackground`,code:`diagram.grid =\r
  new go.Panel("Grid", { gridCellSize: new go.Size(25, 25) })\r
    .add(\r
      new go.Shape("LineH", { stroke: "blue" }),\r
      new go.Shape("LineV", { stroke: "green" })\r
    );`,isExecutable:!0,animation:!1,minHeight:200,language:`js`,initiallyVisible:!0},{id:`customBackground2`,code:`diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
diagram.toolManager.resizingTool.isGridSnapEnabled = true;\r
diagram.scale = 2;\r
diagram.grid =\r
  new go.Panel("Grid", { gridCellSize: new go.Size(10, 10) })\r
    .add(\r
      new go.Shape("LineH", { stroke: "lightblue" }),\r
      new go.Shape("LineV", { stroke: "lightgreen" }),\r
      new go.Shape("LineH", { stroke: "blue", interval: 5 }),\r
      new go.Shape("LineV", { stroke: "green", interval: 5 })\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { resizable: true })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "white" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
const nodeDataArray = [\r
  { key: "Alpha" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`standardGrid`,code:`diagram.grid =\r
  new go.Panel("Grid", {\r
    name: "GRID",\r
    visible: false,\r
    gridCellSize: new go.Size(10, 10),\r
    gridOrigin: new go.Point(0, 0)\r
  })\r
    .add(\r
      new go.Shape("LineH", { stroke: "lightgray", strokeWidth: 0.5, interval: 1 }),\r
      new go.Shape("LineH", { stroke: "gray", strokeWidth: 0.5, interval: 5 }),\r
      new go.Shape("LineH", { stroke: "gray", strokeWidth: 1.0, interval: 10 }),\r
      new go.Shape("LineV", { stroke: "lightgray", strokeWidth: 0.5, interval: 1 }),\r
      new go.Shape("LineV", { stroke: "gray", strokeWidth: 0.5, interval: 5 }),\r
      new go.Shape("LineV", { stroke: "gray", strokeWidth: 1.0, interval: 10 })\r
    );\r
\r
diagram.grid.visible = true;  // so that this example shows the standard grid\r
diagram.div.style.background = "white";`,isExecutable:!0,animation:!1,split:70,language:`js`,initiallyVisible:!0},{id:`customBackground3`,code:`diagram.grid =\r
  new go.Panel("Grid", { gridCellSize: new go.Size(50, 50) })\r
    .add(\r
      new go.Shape("BarH", { fill: "lightgreen", interval: 2, height: 50 })\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
      dragComputation: (node, pt, gridpt) => {\r
        pt.y = Math.round(pt.y/100)*100;\r
        return pt;\r
      }\r
    })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "white", height: 49 }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
const nodeDataArray = [\r
  { key: "Alpha" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`customBackground4`,code:`diagram.grid =\r
  new go.Panel("Grid", { gridCellSize: new go.Size(100, 100) })\r
    .add(\r
      new go.Shape("BarV", { fill: "rgba(255,0,0,0.1)", width: 50 }),\r
      new go.Shape("BarH", { fill: "rgba(255,0,0,0.1)", height: 50 })\r
    );\r
\r
diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 50, height: 50 })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "white" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
const nodeDataArray = [\r
  { key: "Alpha" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`customBackground5`,code:`diagram.div.style.background = "white";\r
\r
diagram.grid =\r
  new go.Panel("Grid")\r
    .add(\r
      new go.Shape("LineH", { strokeWidth: 1, strokeDashArray: [0, 9, 1, 0] })\r
    );\r
\r
diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { fill: "white" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
const nodeDataArray = [\r
  { key: "Alpha" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`nodeGrid`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { resizable: true, resizeObjectName: "GRID" })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "transparent" }),\r
      new go.Panel("Grid", {\r
        name: "GRID",\r
        desiredSize: new go.Size(100, 100),\r
        gridCellSize: new go.Size(20, 20)\r
      })\r
        .bindTwoWay("desiredSize", "size", go.Size.parse, go.Size.stringify)\r
        .bindTwoWay("gridCellSize", "cell", go.Size.parse, go.Size.stringify)\r
        .add(\r
          new go.Shape("LineV")\r
            .bind("stroke"),\r
          new go.Shape("LineH")\r
            .bind("stroke")\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "Alpha", cell: "25 25", stroke: "lightgreen" },\r
  { key: "Beta", cell: "15 30", size: "150 75" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`dragComp`,code:`diagram.grid.visible = true;\r
diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
diagram.toolManager.resizingTool.isGridSnapEnabled = true;\r
diagram.scale = 1.5;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    // Ignore grid snap while user has shift key held\r
    dragComputation:\r
      (node, pt, gridpt) => node.diagram.lastInput.shift ? pt : gridpt\r
  })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "white" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
const nodeDataArray = [\r
  { key: "Alpha" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1551ytz`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};