import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Quick start`,description:`A dense, single-page primer for GoJS — the fastest path from zero to a working diagram. Designed for both new users and AI coding assistants.`,category:`Getting Started`,categoryOrder:0},htmlContent:`<h1>Get started with GoJS</h1>\r
\r
<p>\r
  This page covers the basics of GoJS, including installation,\r
  a minimal working diagram, templates, models, and bindings.\r
</p>\r
\r
<p>\r
  You can link straight to a GoJS library provided by a\r
  <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Glossary/CDN">CDN</a>\r
  such as:\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  <code>go</code> is the JavaScript namespace in which all GoJS types reside.\r
  In this documentation all code uses of GoJS classes such as Diagram or Node or Panel or\r
  Shape or TextBlock will be prefixed with <code>go.</code>.\r
</p>\r
\r
<p>\r
  If you are using a package manager such as <a target="_blank" href="https://npmjs.com/package/gojs">npm</a>\r
  you can install the "gojs" package:\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>See detailed installation options <a href="learn/installation">here</a>.</p>\r
\r
<h3 id="the-hosting-lt-div-gt"><a class="not-prose heading-anchor" href="#the-hosting-lt-div-gt">The hosting &lt;div&gt;</a></h3>\r
\r
<p>\r
  You'll also need a <code>&lt;div&gt;</code> with an explicit size to host the diagram.\r
  You can style the div, but not anything that GoJS inserts into the div.\r
</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  In JavaScript code you pass the <code>&lt;div&gt;</code>'s <code>id</code> when making a Diagram,\r
  or else a reference to the <code>&lt;div&gt;</code> element:\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<h2 id="DiagramsAndModels"><a class="not-prose heading-anchor" href="#DiagramsAndModels">A minimal diagram</a></h2>\r
\r
<p>\r
  Here's a small GoJS Diagram. Four nodes and four links, undo/redo enabled.\r
</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  Four major concepts:\r
</p>\r
<ul>\r
  <li>A <a href="api/symbols/Diagram.html" target="api">Diagram</a> can be thought of as a view of a <a href="api/symbols/Model.html" target="api">Model</a>.\r
  </li>\r
  <li><a href="api/symbols/Model.html" target="api">Model</a>s hold the data that describe the nodes and links.\r
    Models, not Diagrams, are what you load and then save after editing.\r
  </li>\r
  <li><b>Templates</b> (<a href="api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a>, <a href="api/symbols/Diagram.html#linktemplate" target="api">Diagram.linkTemplate</a>)\r
    describe how to render each Node or Link from a data object.\r
  </li>\r
  <li><a href="api/symbols/Binding.html" target="api">Binding</a>s (<a href="api/symbols/GraphObject.html#bind" target="api">GraphObject.bind</a>) connect template properties to\r
    data fields in the model.\r
  </li>\r
</ul>\r
\r
<p>\r
  You'll also notice above that some interaction is already possible:\r
</p>\r
<ul>\r
  <li>Click and drag the background in the above diagram to pan the view.</li>\r
  <li>Click a node to select it, or click and drag to move it around.</li>\r
  <li>To create a selection box, click and hold on the background, then start dragging.</li>\r
  <li>Use <kbd>Ctrl + C</kbd> and <kbd>Ctrl + V</kbd>, or control-drag-and-drop, to make a copy of the selection.\r
    (On a Mac, use <kbd>⌘</kbd> as the modifier for all commands,\r
    but you must use <kbd>Alt</kbd> as the modifier for a copying drag-and-drop.)\r
  </li>\r
  <li>Press <kbd>Delete</kbd> to delete selected nodes.\r
    (Read about <a href="learn/commands">Keyboard Commands</a>.)\r
  </li>\r
  <li>On touch devices, press and hold to bring up a context menu.\r
    (Read about <a href="learn/contextMenus">Context Menus</a>.)\r
  </li>\r
  <li>Since the undo manager was enabled, <kbd>Ctrl + Z</kbd> and <kbd>Ctrl + Y</kbd> (or <kbd>Ctrl + Shift + Z</kbd>) will undo and redo moves and copies and deletions.</li>\r
</ul>\r
\r
\r
<h2 id="BuildingParts"><a class="not-prose heading-anchor" href="#BuildingParts">Building Parts</a></h2>\r
\r
<p>\r
  A Part (Node, Link, Group) is a tree of visual <a href="api/symbols/GraphObject.html" target="api">GraphObject</a>s, mostly\r
  <a href="api/symbols/Shape.html" target="api">Shape</a>s, <a href="api/symbols/TextBlock.html" target="api">TextBlock</a>s, <a href="api/symbols/Picture.html" target="api">Picture</a>s, and nested <a href="api/symbols/Panel.html" target="api">Panel</a>s.\r
  Construct each object with <code>new</code>,\r
  set properties via the constructor argument, and add elements to Panels with\r
  <a href="api/symbols/Panel.html#add" target="api">Panel.add</a>. GraphObject methods return <code>this</code>, so chaining works.\r
</p>\r
\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>\r
  Panel types control how Panel elements (children) are laid out. The most common:\r
</p>\r
<ul>\r
  <li><code>'Auto'</code> or <code>go.PanelTypes.Auto</code> — the first element surrounds all the others (e.g. shape wraps a text block).</li>\r
  <li><code>'Vertical'</code> or <code>go.PanelTypes.Vertical</code> — stack elements top-to-bottom.</li>\r
  <li><code>'Horizontal'</code> or <code>go.PanelTypes.Horizontal</code> — stack elements left-to-right.</li>\r
  <li><code>'Spot'</code> or <code>go.PanelTypes.Spot</code> — position elements at named spots (e.g. <code>go.Spot.Center</code>, <code>go.Spot.TopRight</code>) around the main (first) element.</li>\r
  <li><code>'Table'</code> or <code>go.PanelTypes.Table</code> — grid of rows and columns.</li>\r
</ul>\r
\r
<p>\r
  Most of our code uses a quoted string, but the <code>go.PanelTypes</code> constant enumerates all possibilities,\r
  and may be easier to use with auto-completion.\r
</p>\r
\r
<p>\r
  See <a href="learn/panels">Panels</a> for the full list, and many Panel examples.\r
</p>\r
\r
<h2 id="Models"><a class="not-prose heading-anchor" href="#Models">Models and data</a></h2>\r
\r
<p>\r
  GoJS has three built-in model types. Choose the type of model based on the relationships in your data:\r
</p>\r
\r
<ul>\r
  <li><a href="api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> — Arbitrary graphs with independent link data. Also allows <a href="api/symbols/Group.html" target="api">Group</a>s.\r
    Use this unless you have a reason not to.\r
  </li>\r
  <li><a href="api/symbols/TreeModel.html" target="api">TreeModel</a> — Each node data has a <code>parent</code> reference; no\r
    separate link data array. Good for org charts and other pure trees.\r
  </li>\r
  <li><a href="api/symbols/Model.html" target="api">Model</a> — If you don't need <a href="api/symbols/Link.html" target="api">Link</a>s or <a href="api/symbols/Group.html" target="api">Group</a>s and you have a <em>lot</em> of parts,\r
    you can use simple <a href="api/symbols/Part.html" target="api">Part</a>s instead of <a href="api/symbols/Node.html" target="api">Node</a>s for efficiency.\r
  </li>\r
\r
</ul>\r
\r
<!-- CODE_BLOCK_7 -->\r
\r
<p>\r
  In TypeScript, models are generic so you can have optional type safety on node/link data:\r
</p>\r
\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  See <a href="learn/usingModels">Using Models</a> for more discussion.\r
</p>\r
\r
<h2 id="Bindings"><a class="not-prose heading-anchor" href="#Bindings">Data bindings</a></h2>\r
\r
<p>\r
  A binding connects a property of a GraphObject in the template to a property\r
  of the data object in the model. Three forms, from most to least common:\r
</p>\r
\r
<!-- CODE_BLOCK_9 -->\r
\r
<p>\r
  Use a conversion function when the source property value type doesn't match\r
  the target property type:\r
</p>\r
\r
<!-- CODE_BLOCK_10 -->\r
\r
<p>\r
  See <a href="learn/dataBinding">Data Binding</a> for full details including\r
  converter signatures and two-way back-converters.\r
</p>\r
\r
<h2 id="LinkTemplates"><a class="not-prose heading-anchor" href="#LinkTemplates">Link templates</a></h2>\r
\r
<p>\r
  Links follow the same template pattern as nodes, but a Link has a special\r
  panel type that normally contains a path Shape and optional arrowheads and labels.\r
</p>\r
\r
<!-- CODE_BLOCK_11 -->\r
\r
<p>The <code>curve: go.Curve.Bezier</code> Link option gives the Link a Bezier arc path.</p>\r
\r
<p>See many more Link options on the <a href="learn/links">Links page</a>.</p>\r
\r
<h2 id="Interaction"><a class="not-prose heading-anchor" href="#Interaction">Interaction and commands</a></h2>\r
\r
<p>\r
  A diagram has a <a href="api/symbols/CommandHandler.html" target="api">CommandHandler</a> (for standard commands like copy, delete, undo, redo)\r
  and a <a href="api/symbols/ToolManager.html" target="api">ToolManager</a> (for mouse- and touch-driven interaction).\r
  You infrequently construct these for each Diagram; normally you just set their properties.\r
</p>\r
\r
<!-- CODE_BLOCK_12 -->\r
\r
<p>\r
  For more on the built-in possibilities, see the <a href="learn/interactivity">Interactivity</a> and <a href="learn/commands">Commands</a> pages.\r
</p>\r
\r
<h2 id="Layouts"><a class="not-prose heading-anchor" href="#Layouts">Layouts</a></h2>\r
\r
<p>\r
  In many diagrams the user can position nodes manually by moving them.\r
  A <a href="api/symbols/Layout.html" target="api">Layout</a> positions nodes automatically according to some algorithm.\r
  Common choices:\r
</p>\r
\r
<!-- CODE_BLOCK_13 -->\r
<p>\r
  Automatic layouts occur after nodes or links are added or removed or they change visibility or after nodes change size.\r
</p>\r
\r
<p>\r
  If you do not set <a href="api/symbols/Diagram.html#layout" target="api">Diagram.layout</a>, each node must be given a location,\r
  either manually via the user's dragging, or via data binding.\r
</p>\r
<p>\r
  For more on how layouts can work, see the <a href="learn/layouts">Layouts</a> page.\r
</p>\r
\r
<h2 id="Routing"><a class="not-prose heading-anchor" href="#Routing">Routing</a></h2>\r
\r
<p>\r
  Each <a href="api/symbols/Link.html" target="api">Link</a> has a built-in efficient behavior that controls the path that it takes, depending on the link's properties,\r
  as you have seen above with the <a href="api/symbols/Link.html#curve" target="api">Link.curve</a> property.\r
</p>\r
<p>\r
  More generally, the routes of links can also be determined by a <a href="api/symbols/Router.html" target="api">Router</a>, allowing the consideration of other nodes\r
  or links besides the two nodes connected by the link.\r
  In the following example, the AvoidsNodes router is used to plot a path that avoids crossing over nodes.\r
  The functionality is enabled by setting <a href="api/symbols/Link.html#routing" target="api">Link.routing</a> in the link template:\r
  <code>routing: go.Routing.AvoidsNodes</code>.\r
</p>\r
\r
<!-- CODE_BLOCK_14 -->\r
\r
<p>\r
  Try dragging the "Beta" node around.\r
  The link will automatically try to re-route around Nodes to avoid crossing them,\r
  except when it is unavoidable.\r
</p>\r
<p>\r
  For more on how routers can work, see the <a href="learn/routers">Routers</a> page.\r
</p>\r
\r
<h2 id="Issues"><a class="not-prose heading-anchor" href="#Issues">Common issues</a></h2>\r
\r
<ul>\r
  <li>The host <code>&lt;div&gt;</code> must have an <b>explicit width and\r
    height</b> (CSS units). A zero width or height div renders a blank diagram.\r
  </li>\r
  <li>You <i>do not</i> commonly construct <a href="api/symbols/Node.html" target="api">Node</a> or <a href="api/symbols/Link.html" target="api">Link</a> instances and add\r
    them to a diagram directly. Instead, add <i>data</i> to the model, and GoJS\r
    constructs <a href="api/symbols/Part.html" target="api">Part</a>s from your data, based on your templates.\r
  </li>\r
  <li>To modify the model after the diagram exists, you must call\r
    <a href="api/symbols/Model.html#set" target="api">Model.set</a> or another Model method with the Node data, in a transaction.\r
    Modifying node data in the <code>nodeDataArray</code> directly will not update the diagram.\r
  </li>\r
  <li>Property names in templates are the <b>target</b>; property names in data\r
    are the <b>source</b>. <code>.bind("visible", "vis")</code> means\r
    <i>automatically</i> set the <a href="api/symbols/GraphObject.html#visible" target="api">GraphObject.visible</a> property from the <code>data.vis</code> property.\r
  </li>\r
</ul>\r
\r
<h2 id="NextSteps"><a class="not-prose heading-anchor" href="#NextSteps">Where to go next</a></h2>\r
\r
<ul>\r
  <li><a href="learn/buildingObjects">Building GraphObjects</a> — detail on panels, shapes, text.</li>\r
  <li><a href="learn/usingModels">Using Models and Templates</a> — model types and node/link data conventions.</li>\r
  <li><a href="learn/dataBinding">Data Binding</a> — one-way, two-way, converters, model bindings.</li>\r
    <li><a href="samples">Samples</a> — 200+ examples across every major feature.</li>\r
  <li><a href="api">API Reference</a> — the full type-accurate documentation.</li>\r
</ul>\r
\r
<p>\r
  You may want to read more tutorials, such as the\r
  <a href="learn/graphObject">GraphObject Manipulation</a> tutorial and the <a href="learn/interactivity">Interactivity</a> tutorial.\r
</p>\r
<p>\r
  If you want to explore by example, have a look at <a href="samples">the samples</a>\r
  to get a feel for what's possible with GoJS.\r
</p>\r
`,codeBlocks:[{id:null,code:'<script src="https://cdn.jsdelivr.net/npm/gojs"><\/script>\r\n<!-- `go` is now available as a global. -->',isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`npm install gojs`,isExecutable:!1,language:`shell`,initiallyVisible:!0},{id:null,code:`import go from "gojs";`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`<div id="myDiagramDiv" style="width:600px; height:400px; border:1px solid #ccc"></div>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`const myDiagram = new go.Diagram('myDiagramDiv');`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`simpleModel`,code:`const myDiagram =\r
  new go.Diagram("myDiagramDiv", {\r
    // enables Ctrl-Z/Ctrl-Y to undo/redo\r
    "undoManager.isEnabled": true\r
  });\r
\r
// A node template describes how each Node is constructed from its data.\r
myDiagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle")\r
        // Shape.fill ← node.data.color\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        // TextBlock.text ← node.data.text\r
        .bind("text")\r
    );\r
\r
// The model holds the plain-JS data for the diagram.\r
// constructor args: Array of node data, Array of link data\r
myDiagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta",  color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ],\r
  [\r
    { from: 1, to: 2 },\r
    { from: 2, to: 2 },\r
    { from: 3, to: 4 },\r
    { from: 4, to: 1 }\r
  ]\r
);`,isExecutable:!0,animation:!1,expanded:!0,noScaffolding:!0,language:`js`,initiallyVisible:!0},{id:`chaining`,code:`diagram.nodeTemplate =\r
  new go.Node("Vertical")\r
    .add(\r
      // setting portId makes this shape the default connection point\r
      new go.Shape("Ellipse", { width: 50, height: 50, portId: '' })\r
        // Shape.fill ← node.data.color\r
        .bind("fill", "color"),\r
      new go.TextBlock({ font: "bold 14px sans-serif" })\r
        // TextBlock.text ← node.data.label\r
        .bind("text", "label")\r
    );\r
\r
// Specify the desired automatic layout, before assiging the model\r
diagram.layout = new go.TreeLayout();\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "a", label: "One",   color: "#fde68a" },\r
    { key: "b", label: "Two",   color: "#bbf7d0" },\r
    { key: "c", label: "Three", color: "#bfdbfe" },\r
    { key: "d", label: "Four", color: "#ecd2e0" },\r
    { key: "e", label: "Five", color: "#f8b9b6" },\r
  ],\r
  [\r
    { from: "a", to: "b" }, { from: "b", to: "c" },\r
    { from: "b", to: "d" }, { from: "a", to: "e" }\r
  ]\r
);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:null,code:`// GraphLinksModel: separate node and link arrays\r
// "key" is the default keyword for Node data keys\r
// "from" and "to" are the default keywords for Links to refer to Node data keys\r
myDiagram.model = new go.GraphLinksModel(\r
  // the Model.nodeDataArray\r
  [\r
    { key: "A" },\r
    { key: "B" },\r
    { key: "C" }\r
  ],\r
  // the GraphLinksModel.linkDataArray\r
  [\r
    { from: "A", to: "B" },\r
    { from: "B", to: "C" }\r
  ]);\r
\r
// TreeModel: parent key on each node\r
// "key" is the default keyword for Node data keys\r
// "parent" is the default keyword for parents - automatically creating a link from "parent" to "key"\r
myDiagram.model = new go.TreeModel(\r
  // the Model.nodeDataArray\r
  [\r
    { key: "A" },\r
    { key: "B", parent: "A" },\r
    { key: "C", parent: "B" }\r
  ]);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`interface MyNodeData { key: number; text: string; color?: string; }\r
interface MyLinkData { from: number; to: number; label?: string; }\r
\r
const model = new go.GraphLinksModel<MyNodeData, MyLinkData>(nodes, links);\r
model.nodeDataArray[0].text   // string — typed`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`// One-way: data → graph object\r
new go.TextBlock()\r
  .bind("text", "label")\r
// or, if the data property has the same name:\r
new go.TextBlock()\r
  .bind("text")\r
\r
// Two-way: data → graph object AND graph object → data\r
new go.TextBlock({ editable: true })\r
  .bindTwoWay("text", "label")\r
\r
// Model-level: bind to a field of Model.modelData, not per-node data\r
new go.Shape()\r
  .bindModel("fill", "themeColor")`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Shape()\r
  .bind("fill", "priority", p => p === "high" ? "red" : "lightgray")`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`linkTemplate`,code:`diagram.layout = new go.GridLayout({ wrappingColumn: 2, cellSize: new go.Size(200, 50) })\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier })\r
    .add(\r
      // The first element of a Link is the link path\r
      new go.Shape({ strokeWidth: 2, stroke: "#555" }),\r
      // Any element of a link with \`toArrow\` or \`fromArrow\` becomes an arrowhead\r
      new go.Shape({ toArrow: 'Standard', fill: "#555", stroke: null }),\r
      // All other elements are labels.\r
      // They can be arbitrarily complex Panels, or just a TextBlock:\r
      new go.TextBlock({ background: "#bbf7d0" })\r
        .bind("text", "label")\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape(go.Figures.RoundedRectangle, { fill: "#fef3c7" }),\r
      new go.TextBlock({ margin: 6, font: '15px Georgia' }).bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Order" },\r
    { key: 2, text: "Ship" }\r
  ],\r
  [ { from: 1, to: 2, label: "when paid" } ]\r
);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:null,code:`// Set properties:\r
const myDiagram = new go.Diagram();\r
// Enable undo/redo\r
myDiagram.undoManager.isEnabled = true;\r
// Snap nodes to grid\r
myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
// Deleting a node deletes subtrees\r
myDiagram.commandHandler.deletesTree = true;\r
\r
// Equivalently, as shortcuts:\r
const myDiagram = new go.Diagram({\r
  'undoManager.isEnabled': true,\r
  'draggingTool.isGridSnapEnabled': true,\r
  'commandHandler.deletesTree': true\r
})`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`diagram.layout = new go.TreeLayout();           // hierarchical tree\r
diagram.layout = new go.LayeredDigraphLayout(); // flowcharts\r
diagram.layout = new go.ForceDirectedLayout();  // relationship graphs\r
diagram.layout = new go.GridLayout();           // grid of independent parts\r
diagram.layout = new go.CircularLayout();       // circular or elliptical ring`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`linkTemplate`,code:`diagram.linkTemplate =\r
  new go.Link({\r
      routing: go.Routing.AvoidsNodes,\r
      corner: 10\r
    })\r
    .add(\r
      new go.Shape({ strokeWidth: 2, stroke: "#111" }),\r
      new go.Shape({ toArrow: 'Standard', fill: "#111", stroke: null })\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape(go.Figures.RoundedRectangle, { fill: "#bfdbfe" }),\r
      new go.TextBlock({ margin: 6, font: '15px sans-serif' }).bind("text", "key")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "Alpha", loc: "0 0" },\r
    { key: "Beta", loc: "250 40" },\r
    { key: "Gamma", loc: "100 -10" },\r
    { key: "Delta", loc: "75 50" },\r
    { key: "Epsilon", loc: "150 30" }\r
  ], [\r
    { from: "Alpha", to: "Beta" }\r
  ]\r
);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`8s3559`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};