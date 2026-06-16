import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Building GraphObjects`,category:`Core Concepts`,categoryOrder:0,figures:!0},htmlContent:`<h1>Building Parts with GraphObjects</h1>\r
<p>\r
  The following pages will discuss the basic kinds of objects you can use to build Parts.\r
  These pages build up a diagram by explicitly creating and adding nodes and links.\r
  Later pages will show how to build diagrams using models rather than adding Parts directly.\r
</p>\r
\r
<h2 id="BuildingBlocks"><a class="not-prose heading-anchor" href="#BuildingBlocks">The building blocks of GoJS</a></h2>\r
<p>\r
  GoJS Diagrams display top-level <a href="../api/symbols/Part.html" target="api">Part</a>s and Part subclasses: <a href="../api/symbols/Node.html" target="api">Node</a>s, <a href="../api/symbols/Link.html" target="api">Link</a>s, and <a href="../api/symbols/Group.html" target="api">Group</a>s.\r
</p>\r
<p>\r
  Parts are <a href="../api/symbols/Panel.html" target="api">Panel</a>s, which can hold any number of <a href="../api/symbols/Shape.html" target="api">Shape</a>s, <a href="../api/symbols/Picture.html" target="api">Picture</a>s, <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s, or other, nested <a href="../api/symbols/Panel.html" target="api">Panel</a>s.\r
  All together, these are subclasses of <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>.\r
</p>\r
\r
<p>\r
  Nodes and Links are usually composed of many GraphObjects, including several Panels that may be nested.\r
</p>\r
\r
<h2 id="BuildingWithChainingFunctions"><a class="not-prose heading-anchor" href="#BuildingWithChainingFunctions">Building Parts</a></h2>\r
\r
<p>\r
  Many GraphObject and Diagram methods return the object instance, <code>this</code>, such as\r
  <a href="../api/symbols/Panel.html#add" target="api">Panel.add</a> and <a href="../api/symbols/GraphObject.html#bind" target="api">GraphObject.bind</a>.\r
  These methods can be chained to build Parts.\r
</p>\r
<p>\r
  Panels hold any number of child elements, which are added as comma separated arguments: <code>Panel.add(elt1, elt2, elt3...)</code>\r
</p>\r
<p>\r
  Nodes and Links are typically a nested series of Panels. For example:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  Every GraphObject constructor takes an optional argument that is a JavaScript object,\r
  which can be used to set properties.\r
  In addition, GraphObject constructors optionally take a common setting as the first argument. These are:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/TextBlock.html#text" target="api">TextBlock.text</a> - for example, <code>new go.TextBlock("Hello")</code></li>\r
  <li><a href="../api/symbols/Picture.html#source" target="api">Picture.source</a> - for example, <code>new go.Picture("https://example.com/image1.jpg")</code></li>\r
  <li><a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> - for example, <code>new go.Shape("RoundedRectangle")</code>.\r
    See <a href="../api/symbols/Figures.html" target="api">Figures</a> for a complete list of predefined figure names, or define your own figures.</li>\r
  <li><a href="../api/symbols/Panel.html#type" target="api">Panel.type</a> as a string - for example, <code>new go.Panel("Auto")</code>.\r
    Built-in values include "Position", "Vertical", "Horizontal", "Auto", "Spot", "Table", and a few specialty panels.\r
    You can use the <a href="../api/symbols/PanelTypes.html" target="api">PanelTypes</a> constant instead of strings for autocompletion.\r
    See <a href="../api/symbols/PanelLayout.html" target="api">PanelLayout</a> or the page on <a href="panels">Panels</a> for more information.</li>\r
  <li>Nodes, Parts, and Groups all inherit from Panel, and take the same constructor argument.</li>\r
  <li>Links are a special type of Panel that are always of the "Link" type.</li>\r
</ul>\r
\r
<p>\r
  As mentioned earlier, it's uncommon to add Nodes directly to a Diagram.\r
  Usually you will want to create one or more templates, with data bindings,\r
  and have the model create the nodes and links:\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  See <a href="usingModels">Using Models</a> for more.\r
</p>\r
\r
<h3 id="TheDiagramConstructor"><a class="not-prose heading-anchor" href="#TheDiagramConstructor">The Diagram constructor</a></h3>\r
<p>\r
  The Diagram constructor also takes an object of settable properties. However the Diagram constructor additionally\r
  uses <a href="../api/symbols/Diagram.html#setproperties" target="api">Diagram.setProperties</a> to process the initialization object to a <a href="../api/symbols/Diagram.html" target="api">Diagram</a> constructor.\r
  You can use property names that are strings consisting of two identifiers separated by a period.\r
  The name before the period is used as the name of a property on the Diagram or on the <a href="../api/symbols/Diagram.html#toolmanager" target="api">Diagram.toolManager</a>\r
  that returns an object whose property is to be set.\r
  The name after the period is the name of the property that is set.\r
  Note that because there is an embedded period, JavaScript property syntax requires that you use quotes.\r
</p>\r
<p>\r
  You can also declare <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listeners, as if calling <a href="../api/symbols/Diagram.html#adddiagramlistener" target="api">Diagram.addDiagramListener</a>,\r
  by pretending to set a Diagram property that is actually the name of a DiagramEvent.\r
  Because all DiagramEvents have names that are capitalized,\r
  the names will not conflict with any Diagram property names.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="FurtherReading"><a class="not-prose heading-anchor" href="#FurtherReading">Further Reading</a></h2>\r
<p>\r
  The fastest way to build the Node and Link templates you want might be to view the <a href="../samples">samples</a> and study the templates that are closest to what you want to build, or else <a href="https://nwoods.com/support" target="_blank">contact us</a> and we can help you get started.\r
</p>\r
<p>\r
  The following pages will provide more details about the basic building block classes,\r
  <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>, <a href="../api/symbols/Shape.html" target="api">Shape</a>, and <a href="../api/symbols/Picture.html" target="api">Picture</a>,\r
  and about ways of aggregating them with the <a href="../api/symbols/Panel.html" target="api">Panel</a> class.\r
</p>\r
<ul>\r
  <li><a href="textBlocks">TextBlocks</a></li>\r
  <li><a href="shapes">Shapes</a></li>\r
  <li><a href="pictures">Pictures</a></li>\r
  <li><a href="panels">Panels</a></li>\r
  <li><a href="tablePanels">Table Panels</a></li>\r
  <li><a href="sizing">Sizing of GraphObjects</a></li>\r
</ul>\r
`,codeBlocks:[{id:`simpleCode`,code:`// Create a Node with two elements: a Shape and a Panel\r
const node = new go.Node("Auto")\r
  .add(\r
    new go.Shape("RoundedRectangle", {\r
      fill: '#bbcfcc', // light blue-green\r
      stroke: '#4b5957', // dark green\r
      strokeWidth: 3.5\r
    }),\r
    // a Vertical Panel nested in our Auto Panel, with two TextBlocks\r
    new go.Panel("Vertical", { margin: 10 })\r
      .add(\r
        new go.TextBlock("Hello"),\r
        new go.TextBlock("World", { font: '18px georgia' })\r
      )\r
  );\r
\r
// Add the Node to the Diagram.\r
// This is uncommon in practice, usually we make templates\r
// and models add the nodes\r
diagram.add(node);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`simpleModelNoBind`,code:`// provide custom Node appearance\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { fill: "white" })\r
        .bind("strokeWidth")   // TextBlock.strokeWidth ← node.data.strokeWidth\r
        .bind("fill", "color"), // TextBlock.fill ← node.data.color\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text", "key") // TextBlock.text ← node.data.key\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", color: 'palegreen' },\r
  { key: "Beta", strokeWidth: 2.5 },\r
  { key: "Gamma" } // This node will get the default color and strokeWidth\r
];\r
\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:null,code:`const myDiagram = new go.Diagram("myDiagramDiv",  // must name or refer to the DIV HTML element\r
    {\r
      // *** Normal properties: ***\r
      scale: 2,\r
      layout: new go.GridLayout(),\r
\r
      // *** String properties for nested setters: ***\r
      // do arbitrary work after a new model has been loaded\r
      "InitialLayoutCompleted": (e) => { /* ... */},  // a DiagramEvent listener\r
      // have mouse wheel events zoom in and out instead of scroll up and down\r
      "toolManager.mouseWheelBehavior": go.WheelMode.Zoom,\r
      // specify a data object to copy for each new Node that is created by clicking\r
      "clickCreatingTool.archetypeNodeData": { text: "new node" }\r
    });`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1d3d7j6`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};