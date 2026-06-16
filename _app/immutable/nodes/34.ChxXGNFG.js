import{$ as e,C as t,H as n,L as r,N as i,T as a,U as o,W as s,X as c,c as l,et as u,it as d,m as f,st as p,w as m,x as h,z as g}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as _}from"../chunks/CmgMociJ.js";var v=p({load:()=>y,prerender:()=>!0}),y=()=>({metadata:{title:`Introduction`,description:`GoJS Introduction Documentation`,category:`Getting Started`,categoryOrder:1},htmlContent:`<h1>Introduction to GoJS Diagramming Components</h1>\r
\r
<p>\r
  <b>GoJS</b> is a JavaScript library that lets you easily create interactive diagrams in web browsers.\r
  <b>GoJS</b> supports graphical templates and data-binding of graphical object properties to model data.\r
  You only need to save and restore the model, consisting of simple JavaScript objects holding\r
  whatever properties your app needs.\r
  Many predefined tools and commands implement the standard behaviors that most diagrams need.\r
  Customization of appearance and behavior is mostly a matter of setting properties.\r
</p>\r
\r
<h2 id="SimpleGoJSDiagram">A Simple GoJS Diagram</h2>\r
<p>\r
  The following code defines a node template and model data, which produces a small diagram with a handful of nodes and links.\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  You can interact with this diagram in many ways:\r
</p>\r
<ul>\r
  <li>You can select a part (a <a href="../api/symbols/Node.html" target="api">Node</a> or a <a href="../api/symbols/Link.html" target="api">Link</a>) by clicking on it.\r
    Selected nodes are highlighted with an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is a blue rectangle surrounding the node.\r
    Selected links are highlighted with a blue line following the path of the link.</li>\r
  <li>Multiple parts may be selected at once.\r
    Hold the Shift key down when clicking to add to the selection.\r
    Hold the Control key down when clicking to toggle whether that part is selected.\r
    (Use Commmand on a Mac.)</li>\r
  <li>Another way to multi-select is to mouse-down at a point in the background (not on a part),\r
    wait a moment, and then drag a box.\r
    Parts that are fully in the box when the mouse-up occurs are selected.\r
    The Shift and Control modifiers work then as well.</li>\r
  <li>Ctrl-A selects all parts in the diagram.</li>\r
  <li>Move one or more nodes by selecting them and dragging.</li>\r
  <li>Copying selected parts works with either copy/paste (Ctrl-C/Ctrl-V) or with Ctrl-mouse-drag.</li>\r
  <li>Delete selected parts with the Delete key.</li>\r
  <li>Ctrl-Z to undo the previous modification and Ctrl-Y or Ctrl-Shift-Z to redo it.</li>\r
  <li>If scrollbars are visible or if the whole collection of parts is smaller than the viewable area of the diagram\r
    (the "viewport"),\r
    you can pan the diagram with a mouse-down in the background (not on a part) if you drag without waiting.</li>\r
  <li>Use the mouse wheel to scroll up and down and Shift-mouse-wheel to scroll left and right.\r
    Ctrl-mouse-wheel zooms in and out.</li>\r
</ul>\r
<p>\r
  You can also pan, pinch zoom, select, copy, move, delete, undo, and redo with your fingers on a touch device.\r
  Most commands that can be invoked from a keyboard can be invoked from the default context menu that you get by\r
  pressing your finger and holding it motionless for a moment.\r
</p>\r
\r
<p>\r
  What is unique about all of the examples in the documentation is that they are all "live" -- there are no screenshots!\r
  They are actual <a href="../api/symbols/Diagram.html" target="api">Diagram</a>s implemented by the source code shown.\r
  You can interact with them -- some even display animation.\r
</p>\r
\r
<p>\r
  If you'd like to see more examples of what <b>GoJS</b> can do, see the <a href="../samples"\r
    target="samples">GoJS Samples directory</a>.\r
  To make it easier to search the JavaScript code and documentation or to experiment by modifying the samples,\r
  you can install the <b>GoJS</b> kit in various manners:\r
<ul>\r
  <li>Clone or download from <a href="https://github.com/NorthwoodsSoftware/GoJS">GoJS on GitHub</a>.</li>\r
  <li>Install GoJS using <code>npm install gojs</code> and <code>npm create gojs-kit@latest</code>.</li>\r
</ul>\r
</p>\r
\r
<h2 id="GoJSConcepts">GoJS Concepts</h2>\r
<p>\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a>s consist of <a href="../api/symbols/Part.html" target="api">Part</a>s: <a href="../api/symbols/Node.html" target="api">Node</a>s that may be connected by <a href="../api/symbols/Link.html" target="api">Link</a>s and that may be grouped\r
  together into <a href="../api/symbols/Group.html" target="api">Group</a>s.\r
  All of these parts are gathered together in <a href="../api/symbols/Layer.html" target="api">Layer</a>s and are arranged by <a href="../api/symbols/Layout.html" target="api">Layout</a>s and <a href="../api/symbols/Router.html" target="api">Router</a>s.\r
</p>\r
\r
<p>\r
  Each diagram has a <a href="../api/symbols/Model.html" target="api">Model</a> that holds and interprets your application data to determine node-to-node link\r
  relationships and group-member relationships.\r
  Most parts are data-bound to your application data.\r
  The diagram automatically creates a <a href="../api/symbols/Node.html" target="api">Node</a> or a <a href="../api/symbols/Group.html" target="api">Group</a> for each data item in the model's\r
  <a href="../api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a> and a <a href="../api/symbols/Link.html" target="api">Link</a> for each data item in the model's <a href="../api/symbols/GraphLinksModel.html#linkdataarray" target="api">GraphLinksModel.linkDataArray</a>.\r
  You can add whatever properties you need to each data object,\r
  but there are just a few properties that each kind of model expects.\r
  They are shown in bold in the gray data objects.\r
  </p>\r
  <!-- CODE_BLOCK_1 -->\r
\r
  <p>\r
  Each <a href="../api/symbols/Node.html" target="api">Node</a> or <a href="../api/symbols/Link.html" target="api">Link</a> is normally defined by a template that declares its appearance and behavior.\r
  Each template consists of <a href="../api/symbols/Panel.html" target="api">Panel</a>s of <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s such as <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s or <a href="../api/symbols/Shape.html" target="api">Shape</a>s.\r
  There are default templates for all parts, but almost all applications will specify custom templates\r
  in order to achieve the desired appearance and behavior.\r
  Data bindings of <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> properties to model data properties make each Node or Link unique for the data.\r
</p>\r
\r
<p>\r
  The nodes may be positioned manually (interactively or programmatically) or\r
  may be arranged automatically by the <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> and by each <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a>.\r
  Nodes are positioned either by their top-left corner point (<a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a>) or\r
  by a programmer-defined spot in the node (<a href="../api/symbols/Part.html#location" target="api">Part.location</a> and <a href="../api/symbols/Part.html#locationspot" target="api">Part.locationSpot</a>).\r
</p>\r
\r
<p>\r
  <a href="../api/symbols/Tool.html" target="api">Tool</a>s handle mouse and keyboard and touch or stylus events.\r
  Each diagram has a number of tools that perform interactive tasks such as\r
  selecting parts or dragging them or drawing a new link between two nodes.\r
  The <a href="../api/symbols/ToolManager.html" target="api">ToolManager</a> determines which tool should be running,\r
  depending on the mouse events and current circumstances.\r
</p>\r
\r
<p>\r
  Each diagram also has a <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> that implements various commands, such as Delete or Copy.\r
  The CommandHandler interprets keyboard events, such as Ctrl-Z, when the ToolManager is running.\r
</p>\r
\r
<p>\r
  The diagram provides the ability to scroll the parts of the diagram and to zoom in or out.\r
  The diagram also contains all of the layers, which in turn contain all of the parts (nodes and links).\r
  The parts in turn are composed of possibly nested panels of text, shapes, and images.\r
  This hierarchy of JavaScript objects in memory forms the "visual tree" of everything that may be drawn by the diagram.\r
</p>\r
\r
<p>\r
  Animations are implemented and controlled by the <a href="../api/symbols/AnimationManager.html" target="api">AnimationManager</a>.\r
  Automatic animations happen after automatic layouts and upon the execution of various commands.\r
  You can define your own custom <a href="../api/symbols/Animation.html" target="api">Animation</a>s.\r
</p>\r
\r
<p>\r
  The <a href="../api/symbols/Overview.html" target="api">Overview</a> class allows the user to see the whole model and to control what part of it that the diagram\r
  displays.\r
  The <a href="../api/symbols/Palette.html" target="api">Palette</a> class holds parts that the user may drag-and-drop into a diagram.\r
</p>\r
\r
<p>\r
  You can select one or more parts in the diagram. The template implementation may change the appearance\r
  of the node or link when it is selected. The diagram may also add <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s to indicate selection and to\r
  support tools such as resizing a node or reconnecting a link.\r
  Adornments are also how tooltips and context menus are implemented.\r
</p>\r
\r
<p>\r
  All programmatic changes to <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>, <a href="../api/symbols/Model.html" target="api">Model</a> or model data state should be performed\r
  within a single transaction per user action, to make sure updating happens correctly and to support undo/redo.\r
  All of the predefined tools and commands perform transactions, so each user action is automatically undoable\r
  if the <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a> is enabled.\r
  <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a>s on Diagrams, and event handlers on Diagrams and GraphObjects,\r
  are all documented whether they are raised within a transaction or whether you need to conduct a transaction in order\r
  to change the model or the diagram.\r
</p>\r
\r
\r
<h2 id="CreatingDiagram">Creating a Diagram</h2>\r
<p>\r
<b>GoJS</b> does not depend on any JavaScript library or framework, so you should be able to use it in any environment.\r
However it does require that the environment support modern HTML and JavaScript.\r
</p>\r
\r
<h3 id="LoadingGoJS">Loading GoJS</h3>\r
<p>\r
  Before you can execute any JavaScript code to build a Diagram, you will need to load the <b>GoJS</b> library.\r
  When you include the library, the "<code>go</code>" JavaScript object will hold all of the <b>GoJS</b> types.\r
  During development we recommend that you load "go-debug.js" instead of "go.js", for additional run-time error checking\r
  and debugging ability.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  If depending on your npm environment:\r
  <!-- CODE_BLOCK_3 -->\r
</p>\r
<p>\r
  If you want to use ECMAScript modules, use <code>go-module.js</code> or <code>go.mjs</code>\r
  from the <code>release/</code> directory.\r
  However your build environment may automatically make this choice for you.\r
</p>\r
<p>\r
  The extension classes are implemented in TypeScript and compiled as ECMAScript modules in the <code>extensionsJSM/</code> directory.\r
  That directory is present in <a href="https://github.com/NorthwoodsSoftware/GoJS">GitHub</a>,\r
  or in the <code>create-gojs-kit</code> npm package that you can install using <code>npm create gojs-kit@latest</code>.\r
  The extension classes are compiled into regular script-loadable JavaScript in the <code>extensions/</code> directory.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  If you are using <a href="https://requirejs.org" target="_blank">RequireJS</a>,\r
  the <b>GoJS</b> library supports UMD module definitions.\r
  Copy each extension file into your project, and update its <code>require</code> statement\r
  so that all of your code loads the same GoJS library and only does so once.\r
</p>\r
\r
<h3 id="HostingGoJSinaDivElement">Hosting GoJS in a Div Element</h3>\r
<p>\r
  Every <a href="../api/symbols/Diagram.html" target="api">Diagram</a> must be hosted by an HTML Div element.\r
  <b>GoJS</b> will manage the contents of that Div element, but you may position and size and style the Div as you would\r
  any HTML element.\r
  The diagram will add a Canvas element to that Div element that the diagram will draw in and receive events from --\r
  this is what users actually see.\r
  The Canvas element is automatically sized to have the same size as the Div element.\r
</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  Then you can create the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> in JavaScript with a reference to that Div element.\r
  Build the diagram by constructing plain JavaScript objects and adding them to the diagram's model.\r
  Note that all references in JavaScript code to <b>GoJS</b> types such as <a href="../api/symbols/Diagram.html" target="api">Diagram</a> are prefixed with\r
  "<code>go.</code>".\r
</p>\r
\r
<!-- CODE_BLOCK_6 -->\r
\r
<!-- CODE_BLOCK_7 -->\r
\r
<p>\r
  That one HTML DIV element and little bit of JavaScript code are the complete implementation of\r
  the "Hello World!" live diagram that you see above.\r
</p>\r
\r
<h3 id="DevelopingYourDiagram">Developing your Diagram</h3>\r
<p class="box bg-danger">\r
  <b>GoJS</b> outputs error or warning messages when something goes wrong.\r
  When developing with <b>GoJS</b>, be sure to check your browser's developer console for information.\r
  The "go-debug.js" version of the library contains extra type-checking and error-checking code, and should be used\r
  during development.\r
  The "go.js" version has less error checking, but is faster as a result, and should be used in production.\r
</p>\r
\r
<p>\r
  Your JavaScript code should only use properties and methods that are documented in the <a href="../api/index.html" target="api">API</a>.\r
  The <b>GoJS</b> libraries are "minified", so if you look at an instance of a <b>GoJS</b> class in the debugger,\r
  you will see many one or two letter property names. All of those are internal names that you should not use.\r
  At the current time the only one letter property names are "x" and "y" on <a href="../api/symbols/Point.html" target="api">Point</a>, <a href="../api/symbols/Rect.html" target="api">Rect</a>, <a href="../api/symbols/Spot.html" target="api">Spot</a> and\r
  <a href="../api/symbols/LayoutVertex.html" target="api">LayoutVertex</a>.\r
  The only two letter property name is <a href="../api/symbols/InputEvent.html#up" target="api">InputEvent.up</a>.\r
  Otherwise you should not try to use any one or two letter property names on any <b>GoJS</b>-defined objects.\r
</p>\r
\r
<p class="box bg-danger">\r
  Do not modify the prototypes of the <b>GoJS</b> classes.<br />\r
  Only use the properties and methods documented in the <a href="../api/index.html" target="api">API</a>.\r
</p>\r
\r
<p>\r
  You can also use <a href="https://www.typescriptlang.org/">TypeScript</a> in order to get better "edit-time" and\r
  "compile-time" type checking and "edit-time" documentation.\r
  The TypeScript definition file for <b>GoJS</b> is named "go.d.ts" and is located in the same directory as the libraries.\r
  The extension classes are implemented in TypeScript, available at <code>./extensionsJSM/</code>\r
  and compiled to JavaScript in <code>./extensionsJSM/</code> as modules and in <code>./extensions/</code> as scripts.\r
  Copy the extension definitions into your project and make sure they import the same <b>GoJS</b> library as all of your code does.\r
</p>\r
\r
<p>\r
  To learn about new features and bug fixes, read the <a href="https://gojs.net/latest/changelog.html" target="_blank">Change Log</a>.\r
  Read about getting the latest releases at <a href="installation">Installation</a>.\r
</p>\r
\r
<p>\r
  You can see the variety of kinds of diagrams that you can build at <a href="../samples" target="samples">GoJS Samples</a>.\r
</p>\r
`,codeBlocks:[{id:`minimal`,code:`// A Node template describes how each Node should be constructed\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle")\r
        // Shape.fill is bound to Node.data.color\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8})\r
        // TextBlock.text is bound to Node.data.text\r
        .bind("text")\r
    );\r
\r
// the Model holds the essential information describing the diagram\r
diagram.model = new go.GraphLinksModel(\r
[ // an Array of JS objects, one per node;\r
  // the "color" property is added specifically for this app\r
  { key: 1, text: "Alpha", color: "lightblue" },\r
  { key: 2, text: "Beta", color: "orange" },\r
  { key: 3, text: "Gamma", color: "lightgreen" },\r
  { key: 4, text: "Delta", color: "pink" }\r
],\r
[ // an Array of JS objects, one per link\r
  { from: 1, to: 2 },\r
  { from: 1, to: 3 },\r
  { from: 2, to: 2 },\r
  { from: 3, to: 4 },\r
  { from: 4, to: 1 }\r
]);\r
\r
// enable Ctrl-Z to undo and Ctrl-Y to redo\r
diagram.undoManager.isEnabled = true;`,isExecutable:!0,animation:!1,split:60,expanded:!0,language:`js`,initiallyVisible:!0},{id:`commented`,code:`diagram.nodeTemplate =\r
      $(go.Node, "Auto",\r
        { scale : 1.6, isShadowed: true },\r
        new go.Binding("location", "pos", go.Point.parse),\r
        { locationSpot: go.Spot.Center, portId: "NODE" },\r
        $(go.Shape, "RoundedRectangle",\r
          { fill: "white", portId: "SHAPE" },\r
          new go.Binding("fill", "color")),\r
        $(go.TextBlock,\r
          { margin: 4, portId: "TEXTBLOCK" },\r
          new go.Binding("text"))\r
    );\r
\r
    diagram.linkTemplate =\r
      $(go.Link,\r
        { layerName: "Background", isShadowed: true },\r
        $(go.Shape, { strokeWidth: 3 }),\r
        $(go.Shape, { toArrow: "Standard", scale: 1.5 })\r
    );\r
\r
    // Represents the nodeDataArray for the two nodes\r
    diagram.nodeTemplateMap.add("dataNode",\r
      $(go.Node, "Auto",\r
        {\r
          locationSpot: go.Spot.Center,\r
          scale: 1.2,\r
          selectionAdorned: true,\r
          fromSpot: go.Spot.AllSides,\r
          toSpot: go.Spot.AllSides,\r
          shadowColor: "#C5C1AA"\r
        },\r
        new go.Binding("location", "pos", go.Point.parse),\r
        $(go.Shape, "Rectangle",\r
          { fill: "lightgray" }),\r
        $(go.Panel, "Vertical",\r
          { defaultStretch: go.Stretch.Horizontal },\r
          $(go.TextBlock, headerStyle(), // Header:\r
            { portId: "HEADER" },\r
            new go.Binding("text", "head")),\r
          $(go.Shape, "LineH", { height: 1, stretch: go.Stretch.Fill }),\r
          $(go.TextBlock, textStyle(), // Location:\r
            { portId: "LOCATION" },\r
            new go.Binding("text", "loc")),\r
          $(go.Shape, "LineH", { height: 1, stretch: go.Stretch.Fill }),\r
          $(go.TextBlock, textStyle(), // Fill:\r
            { portId: "FILL" },\r
            new go.Binding("text", "color")),\r
          $(go.Shape, "LineH", { height: 1, stretch: go.Stretch.Fill }),\r
          $(go.TextBlock, textStyle(), // Text:\r
            { portId: "TEXT" },\r
            new go.Binding("text", "txt"))\r
        )\r
      )\r
    );\r
\r
    // Represents a linkDataArray object\r
    diagram.nodeTemplateMap.add("dataLink",\r
      $(go.Node, "Auto",\r
        {\r
          locationSpot: go.Spot.Center,\r
          scale: 1.2,\r
          selectionAdorned: true,\r
          fromSpot: go.Spot.AllSides,\r
          toSpot: go.Spot.AllSides,\r
          shadowColor: "#C5C1AA"\r
        },\r
        new go.Binding("location", "pos", go.Point.parse),\r
        $(go.Shape, "Rectangle",\r
          { fill: "lightgray" }),\r
        $(go.Panel, "Vertical",\r
          { defaultStretch: go.Stretch.Horizontal },\r
          $(go.TextBlock, textStyle(), // Location:\r
            { portId: "FROM", font: "bold 12pt sans-serif" },\r
            new go.Binding("text", "from")),\r
          $(go.Shape, "LineH", { height: 1, stretch: go.Stretch.Fill }),\r
          $(go.TextBlock, textStyle(), // Fill:\r
            { portId: "TO", font: "bold 12pt sans-serif" },\r
            new go.Binding("text", "to"))\r
        )\r
      )\r
    );\r
    diagram.linkTemplateMap.add("dataNode", // Links from dataNode to Nodes\r
      $(go.Link,\r
        { routing: go.Routing.Orthogonal, corner: 5 },\r
        $(go.Shape, { stroke: "gray", strokeWidth: 2 }),\r
        $(go.Shape, { toArrow: "Standard", stroke: "gray", fill: "gray" })\r
    ));\r
\r
    diagram.nodeTemplateMap.add("title",\r
       $(go.Node, "Auto",\r
        new go.Binding("location", "pos", go.Point.parse),\r
        $(go.TextBlock,\r
          { font: "bold 25pt sans-serif", textAlign: "center"},\r
          new go.Binding("text", "txt"))\r
    ));\r
\r
    diagram.nodeTemplateMap.add("nodeDataArray",\r
      $(go.Node, "Auto",\r
        {\r
          locationSpot: go.Spot.Center,\r
          scale: 1.2,\r
          selectionAdorned: true,\r
          fromSpot: go.Spot.AllSides,\r
          toSpot: go.Spot.AllSides,\r
          shadowColor: "#C5C1AA"\r
        },\r
        new go.Binding("location", "pos", go.Point.parse),\r
        $(go.Shape, "Rectangle", { fill: "lightgray" }),\r
        $(go.Panel, "Vertical",\r
          { defaultStretch: go.Stretch.Horizontal },\r
          $(go.TextBlock, headerStyle(),\r
            { portId: "HEADER", text: "nodeDataArray" }),\r
          $(go.Shape, "LineH", { height: 1, stretch: go.Stretch.Fill }),\r
          $(go.TextBlock, textStyle(),\r
            { portId: "dataNode1", desiredSize: new go.Size(NaN,16) }),\r
          $(go.Shape, "LineH", { height: 1, stretch: go.Stretch.Fill }),\r
          $(go.TextBlock, textStyle(),\r
            { portId: "dataNode2", desiredSize: new go.Size(NaN,16) })\r
        )\r
      ));\r
\r
    // Comments\r
    diagram.nodeTemplateMap.add("Comment", // Template for comment node\r
      $(go.Node,\r
        new go.Binding("location", "pos", go.Point.parse),\r
        { locationSpot: go.Spot.Center},\r
        $(go.TextBlock,\r
          { stroke: "brown", textAlign: "center" },\r
          new go.Binding("text", "txt"),\r
          new go.Binding("font", "bold", b => b ? "bold 10pt sans-serif" : "10pt sans-serif"))\r
    ));\r
\r
    diagram.nodeTemplateMap.add("LinkLabel", // Template for comments on links\r
      $(go.Node,\r
        new go.Binding("segmentIndex"),\r
        new go.Binding("segmentOffset"),\r
        new go.Binding("segmentFraction")\r
    ));\r
\r
    diagram.linkTemplateMap.add("Comment", // Template for links from comments\r
      $(go.Link,\r
        { curve: go.Curve.Bezier },\r
        new go.Binding("curviness"),\r
        $(go.Shape, { stroke: "brown" }),\r
        $(go.Shape, { toArrow: "OpenTriangle", stroke: "brown" })\r
    ));\r
\r
    diagram.linkTemplateMap.add("Binding",\r
      $(go.Link,\r
        { curve: go.Curve.Bezier },\r
        new go.Binding("curviness"),\r
        $(go.Shape, { stroke: "green" , strokeWidth: 2, strokeDashArray: [2, 7] }),\r
        $(go.Shape, { toArrow: "OpenTriangle", stroke: "green", strokeWidth: 2 })\r
    ));\r
\r
    diagram.linkTemplateMap.add("Data",\r
      $(go.Link,\r
        { curve: go.Curve.Bezier },\r
        new go.Binding("curviness"),\r
        $(go.Shape, { stroke: "gray", strokeWidth: 2 }),\r
        $(go.Shape, { toArrow: "Standard", fill: "gray", stroke: "gray", strokeWidth: 2 }),\r
        $(go.TextBlock, ".data", { font: "bold 12pt Courier", segmentOffset: new go.Point(0, -10) })\r
    ));\r
\r
    const model = new go.GraphLinksModel();\r
    model.linkFromPortIdProperty = "fPID";\r
    model.linkToPortIdProperty = "tPID"\r
    model.linkLabelKeysProperty = "labels";\r
\r
    model.nodeDataArray = [\r
      { key: 1, text: "Alpha", color: "lightblue",  pos: "50 20"},\r
      { key: 2, text: "Beta",  color: "orange", pos: "50 270"},\r
      { key: 3, category: "dataNode", pos: "300 66",  head: "key: 1", txt: "text: Alpha", color: "color: lightblue",  loc: "location: 50 0" },\r
      { key: 4, category: "dataNode", pos: "300 316", head: "key: 2", txt: "text: Beta",  color: "color: orange", loc: "location: 50 250" },\r
      { key: 5, category: "dataLink", pos: "450 200", from: "from: 1", to: "to: 2" },\r
      { key: 6, category: "title", pos: "220 -100", txt: "GraphLinksModel:\\ndata"},\r
      { key: 7, category: "title", pos: "-50 -100", txt: "Diagram:\\nNodes, Links"},\r
      { key: -2, category: "Comment", pos: "10 150", txt: "a Link", bold: true},\r
      { key: -21, category: "LinkLabel", segmentIndex: 0, segmentFraction: 0.5 },\r
      { key: -22, category: "LinkLabel", segmentIndex: 0, segmentFraction: 0.65 },\r
      { key: -3, category: "Comment", pos: "-30 130",  txt: "two Nodes", bold: true},\r
      { key: -4, category: "Comment", pos: "120 130",  txt: "data Bindings", bold: true},\r
      { key: -41, category: "LinkLabel", segmentOffset: new go.Point(25, 0)},\r
      { key: -42, category: "LinkLabel", segmentOffset: new go.Point(10, 0)},\r
      { key: -43, category: "LinkLabel", segmentOffset: new go.Point(-10, 0)},\r
      { key: -44, category: "LinkLabel", segmentOffset: new go.Point(25, 0)},\r
      { key: -45, category: "LinkLabel", segmentOffset: new go.Point(20, 0)},\r
      { key: -46, category: "LinkLabel", segmentOffset: new go.Point(-10, 0)},\r
      { key: -5, category: "Comment", pos: "300 0", txt: "in nodeDataArray:" },\r
      { key: -6, category: "Comment", pos: "300 250", txt: "in nodeDataArray:" },\r
      { key: -7, category: "Comment", pos: "450 165", txt: "in linkDataArray:" },\r
    ];\r
    model.linkDataArray = [\r
      { from: 1, to: 2, labels: [-21, -22] },\r
      { from: 1, to: 3, tPID: "HEADER", category: "Data", curviness: 20 },\r
      { from: 2, to: 4, tPID: "HEADER", category: "Data", curviness: 20 },\r
      { from: -22, to: 5, tPID: "FROM", category: "Data", curviness: 20 },\r
\r
      { from: -2, to: -21, category: "Comment", curviness: 0},\r
      { from: -3, to: 1, category: "Comment", curviness: 10},\r
      { from: -3, to: 2, category: "Comment", curviness: -10},\r
      { from: -4, to: -41, category: "Comment", curviness: 5},\r
      { from: -4, to: -42, category: "Comment", curviness: 5},\r
      { from: -4, to: -43, category: "Comment", curviness: 5},\r
\r
      { from: 3, fPID: "LOCATION", to: 1, tPID: "NODE", category: "Binding", curviness: 10, labels: [-41]},\r
      { from: 3, fPID: "FILL", to: 1, tPID: "SHAPE" , category: "Binding", curviness: 30, labels: [-42]},\r
      { from: 3, fPID: "TEXT", to: 1, tPID: "TEXTBLOCK", category: "Binding", curviness: 50, labels: [-43]},\r
      { from: 4, fPID: "LOCATION", to: 2, tPID: "NODE", category: "Binding", curviness: 10, labels: [-44]},\r
      { from: 4, fPID: "FILL", to: 2, tPID: "SHAPE" , category: "Binding", curviness: 30, labels: [-45]},\r
      { from: 4, fPID: "TEXT", to: 2, tPID: "TEXTBLOCK", category: "Binding", curviness: 50, labels: [-46]}\r
    ];\r
\r
    diagram.model = model;\r
\r
    // Formatting\r
    function headerStyle() {\r
      return {\r
        margin: 3,\r
        font: "bold 12pt sans-serif",\r
        minSize: new go.Size(16, 16),\r
        maxSize: new go.Size(120, NaN),\r
        textAlign: "center"\r
      };\r
    }\r
    function textStyle() {\r
      return {\r
        margin: 2,\r
        font: "10pt sans-serif",\r
        minSize: new go.Size(16, 16),\r
        maxSize: new go.Size(120, NaN),\r
        textAlign: "center"\r
      };\r
    }`,isExecutable:!0,animation:!1,split:40,language:`js`,initiallyVisible:!1},{id:null,code:`<!DOCTYPE html>\r
  <html>\r
    <head>\r
    . . .\r
    <!-- Include the GoJS library. -->\r
    <script src="go-debug.js"><\/script>\r
    </head>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`import go from "gojs";`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`import { DoubleTreeLayout } from "./path/to/gojs-kit/dist/extensionsJSM/DoubleTreeLayout.js";`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`<body>\r
    . . .\r
    <!-- The DIV for a Diagram needs an explicit size or else we won't see anything.\r
         In this case we also add a border to help see the edges. -->\r
    <div id="myDiagramDiv" style="border: solid 1px blue; width:400px; height:150px"></div>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`<!-- Create the Diagram in the DIV element using JavaScript. -->\r
  <!-- The "go" object is the "namespace" that holds all of the GoJS types. -->\r
  <script>\r
    const diagram = new go.Diagram("myDiagramDiv");\r
    diagram.model = new go.GraphLinksModel(\r
      // two node data, in an Array\r
      [{ key: 1, text: "Hello" },\r
       { key: 2, text: "World!" }],\r
      // one link data, in an Array \r
      [{ from: 1, to: 2 }]\r
    );\r
  <\/script>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:`minimal2`,code:`diagram.model = new go.GraphLinksModel(\r
      // two node data, in an Array\r
      [{ key: 1, text: "Hello" },\r
       { key: 2, text: "World!" }],\r
      // one link data, in an Array \r
      [{ from: 1, to: 2 }]\r
    );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!1}],externalStyles:[],extraScripts:[],pageScript:null}),b=a(`<meta name="description"/>`),x=a(`<article class="prose mx-auto px-4 py-8"><!></article>`);function S(a,p){u(p,!0);var v=x();f(`jga08g`,e=>{var i=m(),a=s(i),o=e=>{var n=b();g(()=>l(n,`content`,p.data.metadata.description)),t(e,n)};h(a,e=>{p.data.metadata.description&&e(o)}),r(()=>{n.title=`${p.data.metadata.title??``} | Learn GoJS`}),t(e,i)});var y=o(v);{let e=c(()=>p.data.extraScripts??[]);_(y,{get htmlContent(){return p.data.htmlContent},get codeBlocks(){return p.data.codeBlocks},get extraScripts(){return i(e)},get pageScript(){return p.data.pageScript}})}d(v),t(a,v),e()}export{S as component,v as universal};