import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Using Models`,category:`Core Concepts`,categoryOrder:1},htmlContent:`<h1>Using Models and Templates</h1>\r
<p>\r
  In GoJS, appearance is separated from data. You declare appearance in Diagram templates and data in a Model.\r
  Data bindings on the templates connect the two.\r
</p>\r
\r
<p>\r
  A <a href="../api/symbols/Model.html" target="api">Model</a> is a collection of data that holds only the essential information for each node and each link.\r
  Models, not Diagrams, are what you load and then save after editing.\r
  A template is a <a href="../api/symbols/Part.html" target="api">Part</a> that can be copied;\r
  there are different templates for <a href="../api/symbols/Node.html" target="api">Node</a>s, <a href="../api/symbols/Link.html" target="api">Link</a>s, and <a href="../api/symbols/Group.html" target="api">Group</a>s.\r
</p>\r
<p>\r
  A <a href="../api/symbols/Diagram.html" target="api">Diagram</a> already has very simple default templates for Nodes and Links.\r
  To customize the appearance of the nodes in your diagram,\r
  you replace the defaults by setting <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a> and <a href="../api/symbols/Diagram.html#linktemplate" target="api">Diagram.linkTemplate</a>.\r
</p>\r
\r
<p>\r
  A <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> holds <a href="../api/symbols/GraphLinksModel.html#nodedataarray" target="api">GraphLinksModel.nodeDataArray</a> and <a href="../api/symbols/GraphLinksModel.html#linkdataarray" target="api">GraphLinksModel.linkDataArray</a>.\r
  Setting <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a> creates <a href="../api/symbols/Node.html" target="api">Node</a>s and <a href="../api/symbols/Link.html" target="api">Link</a>s for all the data.\r
  Each node data must have a unique key value so that references can be resolved.\r
</p>\r
<p>\r
  Node and link data can be any JavaScript object. GoJS expects certain properties:\r
  "key" on node data, "from" and "to" on link data, and optionally "category".\r
  You can customize these names via model properties like <a href="../api/symbols/Model.html#nodekeyproperty" target="api">Model.nodeKeyProperty</a>.\r
</p>\r
\r
<p>A simple template and model example:</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Note how the nodes look identical! Typically we want to parameterize their appearance conditional on the Model data.\r
  We can achieve that parameterization by using data binding.\r
</p>\r
\r
<h2 id="ParameterizingNodesUsingDataBindings"><a class="not-prose heading-anchor" href="#ParameterizingNodesUsingDataBindings">Parameterizing Nodes using data binding</a></h2>\r
<p>\r
  A data binding is a declaration that the value of the property of one object should be used\r
  to set the value of a property of another object.\r
</p>\r
<p>\r
  In this case, we want to make sure that the <a href="../api/symbols/TextBlock.html#text" target="api">TextBlock.text</a> property gets the "key" value\r
  of the corresponding node data.\r
  And we want to make sure that the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> property gets set to the color/brush\r
  given by the "color" property value of the corresponding node data.\r
</p>\r
<p>\r
  We can declare such data-bindings by creating <a href="../api/symbols/Binding.html" target="api">Binding</a> objects and associating them with\r
  the target <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>.\r
  Programmatically you do this by calling <a href="../api/symbols/GraphObject.html#bind" target="api">GraphObject.bind</a>.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  You can easily add more node and link data to build bigger diagrams.\r
  And you can easily change the appearance of all of the nodes without modifying the data.\r
</p>\r
<p>\r
  Notice that the value of <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> in the template above gets a value twice.\r
  First it is set to <code>"white"</code>.\r
  Then the binding sets it to whatever value the node data's <code>color</code> property has.\r
  It may be useful to be able to specify an initial value that remains in case the node data\r
  does not have a <code>color</code> property. The third node has no <code>color</code>\r
  or <code>text</code> specified so it gets the defaults.\r
</p>\r
<p>\r
  At this point we can also be a bit more precise about what a template is.\r
  A template is a <a href="../api/symbols/Part.html" target="api">Part</a> that may have some data <a href="../api/symbols/Binding.html" target="api">Binding</a>s and that is not\r
  itself in a diagram but may be copied to create parts that are added to a diagram.\r
</p>\r
\r
<h3 id="TemplateDefinitions"><a class="not-prose heading-anchor" href="#TemplateDefinitions">Template Definitions</a></h3>\r
<p>\r
  The implementations of all predefined templates are provided in\r
  <a href="../extensions/Templates.js">Templates.js</a> in the Extensions directory.\r
  You may wish to copy and adapt these definitions when creating your own templates.\r
  More likely you will want to adapt one of the more complex templates from a sample,\r
  or build your own from scratch.\r
</p>\r
\r
<h2 id="KindsOfModels"><a class="not-prose heading-anchor" href="#KindsOfModels">Kinds of Models</a></h2>\r
<p>\r
  A model is a way of interpreting a collection of data objects as an abstract graph with various kinds\r
  of relationships determined by data properties and the assumptions that the model makes.\r
  The simplest kind of model, <a href="../api/symbols/Model.html" target="api">Model</a>, can only hold "parts" without any relationships between\r
  them -- no links or groups.\r
  But that model class acts as the base class for other kinds of models.\r
</p>\r
\r
<h3 id="GraphLinksModel"><a class="not-prose heading-anchor" href="#GraphLinksModel">GraphLinksModel</a></h3>\r
<p>\r
  <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> is the most general model. It uses separate link data objects for each <a href="../api/symbols/Link.html" target="api">Link</a>,\r
  allowing reflexive links, duplicate links, and cycles (though you can restrict these via <a href="../api/symbols/Diagram.html#validcycle" target="api">Diagram.validCycle</a>).\r
  It also supports <a href="ports">ports</a> (multiple connection points per node)\r
  and <a href="groups">group membership</a>.\r
</p>\r
\r
<!--\r
TODO Graph with ports and a Group\r
-->\r
\r
<h3 id="TreeModel"><a class="not-prose heading-anchor" href="#TreeModel">TreeModel</a></h3>\r
<p>\r
  <a href="../api/symbols/TreeModel.html" target="api">TreeModel</a> is simpler, only supporting link relationships that form a\r
  tree-structured graph.\r
  There is no separate link data, so there is no "linkDataArray".\r
  There is no separate link data array. Instead, child nodes reference their parent by key\r
  via a "parent" property:\r
  Each <a href="../api/symbols/Link.html" target="api">Link</a> is still data bound, but the link's data is the child node data.\r
</p>\r
<!--\r
TODO style links also\r
-->\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  A tree-structured graph doesn't require TreeModel, you can use GraphLinksModel with\r
  separate link data if that fits your data better, or if you need features like Groups.\r
</p>\r
<p>\r
  Other pages such as <a href="trees">Trees</a> discuss tree-oriented features of GoJS in more detail.\r
</p>\r
\r
<h3 id="ReferencesToNodes"><a class="not-prose heading-anchor" href="#ReferencesToNodes">References to Nodes</a></h3>\r
<p>\r
  Although the identity of a node is the node's data object in the model,\r
  references to nodes are not "pointers" to those objects.\r
  Instead, references are always by the "key" of the node data.\r
  (The property need not be named "key" -- see <a href="../api/symbols/Model.html#nodekeyproperty" target="api">Model.nodeKeyProperty</a>.)\r
  Using keys instead of direct references to data objects makes it easier to read and write models,\r
  especially by <a href="../api/symbols/Model.html#tojson" target="api">Model.toJson</a> and <a href="../api/symbols/Model.html#fromjson" target="api">Model.fromJson</a>, and to debug them in memory.\r
  Thus <a href="../api/symbols/Link.html" target="api">Link</a>s are defined by data using keys, and <a href="../api/symbols/Group.html" target="api">Group</a> membership is determined\r
  by data using keys:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<h2 id="ModifyingModels"><a class="not-prose heading-anchor" href="#ModifyingModels">Modifying Models</a></h2>\r
<p>\r
  To add or remove nodes, call <a href="../api/symbols/Model.html#addnodedata" target="api">Model.addNodeData</a> and <a href="../api/symbols/Model.html#removenodedata" target="api">Model.removeNodeData</a>.\r
  Use <a href="../api/symbols/Model.html#findnodedataforkey" target="api">Model.findNodeDataForKey</a> to look up node data by key.\r
  You may also call <a href="../api/symbols/Model.html#copynodedata" target="api">Model.copyNodeData</a> to make a copy of a node data object that you can then modify and pass to <a href="../api/symbols/Model.html#addnodedata" target="api">Model.addNodeData</a>.\r
</p>\r
<p>\r
  <b>Important:</b> Do not directly mutate the <a href="../api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a> — GoJS won't be notified.\r
  Similarly, do not directly set properties on node data objects — bindings won't update.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  Use <a href="../api/symbols/Model.html#set" target="api">Model.set</a> instead:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  These model methods are only required once data is part of the Model.\r
  When initially building your arrays before setting <a href="../api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a>, you can set properties directly.\r
</p>\r
\r
<h2 id="SavingAndLoadingModels"><a class="not-prose heading-anchor" href="#SavingAndLoadingModels">Saving and Loading Models</a></h2>\r
<p>\r
  Call <a href="../api/symbols/Model.html#tojson" target="api">Model.toJson</a> to serialize a model to a JSON string, and <a href="../api/symbols/Model.html#fromjson" target="api">Model.fromJson</a> to deserialize one.\r
  Data properties are saved as long as they are enumerable, don't start with an underscore,\r
  and have JSON-compatible values (numbers, strings, Arrays, or plain Objects).\r
</p>\r
<p>\r
  To associate metadata with the model itself (not any particular node), use the <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a> object,\r
  which is also included in JSON serialization.\r
</p>\r
\r
<h3 id="ExternallyModifiedData"><a class="not-prose heading-anchor" href="#ExternallyModifiedData">Externally Modified Data</a></h3>\r
<p>\r
  In some software architectures it might not be possible to insist that all data changes go through <a href="../api/symbols/Model.html" target="api">Model</a> methods.\r
  In such cases it is possible to call <a href="../api/symbols/Diagram.html#updateallrelationshipsfromdata" target="api">Diagram.updateAllRelationshipsFromData</a> and <a href="../api/symbols/Diagram.html#updatealltargetbindings" target="api">Diagram.updateAllTargetBindings</a>.\r
</p>\r
<p>\r
  However, please note that doing so will prevent the <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a> from properly recording state changes.\r
  There would be no way for the <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a> to know what had been the previous values of properties.\r
  Furthermore it makes it hard to have more than one Diagram showing the Model.\r
</p>\r
\r
<h3 id="ImmutableData"><a class="not-prose heading-anchor" href="#ImmutableData">Immutable Data</a></h3>\r
<p>\r
  In some software architectures it is customary to have "models" consist of immutable (unmodifiable) data.\r
  However, as the GoJS diagram is modified, its model data will be modified,\r
  so you cannot use that immutable data in the model.\r
  You could make a copy of all of the immutable data and then replace the <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a>\r
  whenever the data has changed outside of the diagram/model.\r
  But that would cause old Nodes and Links to be re-created, and that would be\r
  unworkably expensive in time and space when the model is large.\r
</p>\r
<p>\r
  If you do have immutable model data, you can update the existing <a href="../api/symbols/Model.html" target="api">Model</a> and thus its <a href="../api/symbols/Diagram.html" target="api">Diagram</a>s\r
  by calling the <a href="../api/symbols/Model.html#mergenodedataarray" target="api">Model.mergeNodeDataArray</a> and <a href="../api/symbols/GraphLinksModel.html#mergelinkdataarray" target="api">GraphLinksModel.mergeLinkDataArray</a> methods.\r
  This will be much more efficient than replacing the <a href="../api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a> and <a href="../api/symbols/GraphLinksModel.html#linkdataarray" target="api">GraphLinksModel.linkDataArray</a>\r
  Arrays each time, because it will preserve the existing Nodes and Links if possible.\r
</p>\r
<p>\r
  Note that this scheme depends on maintaining the "key"s for all of the node data and for all of the link data.\r
  That happens automatically for all nodes, but for GraphLinksModels, it means setting\r
  <a href="../api/symbols/GraphLinksModel.html#linkkeyproperty" target="api">GraphLinksModel.linkKeyProperty</a> to the name of the property on the link data that you want\r
  to use to remember the key value.\r
</p>\r
<p>\r
  After each diagram transaction some of the model data may have changed.\r
  But you cannot share references to that modified data with the rest of the software that is\r
  expecting immutable data.\r
  Instead you can call <a href="../api/symbols/Model.html#toincrementaldata" target="api">Model.toIncrementalData</a> which will provide copies of the modified data.\r
  That data can then be used to update the rest of the app's state.\r
  Read more about this at <a href="react">Using GoJS with React</a> and the\r
  <a href="https://github.com/NorthwoodsSoftware/gojs-react">gojs-react package</a>,\r
  which provides generic Diagram components that you can use in your app using React.\r
</p>\r
`,codeBlocks:[{id:`simpleModelNoBind`,code:`// provide custom Node appearance\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { fill: "white" }),\r
      new go.TextBlock("hello!", { margin: 8 })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha" },\r
  { key: "Beta" }\r
];\r
\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`simpleModelWithBind`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      // fill: "white" acts as a default value\r
      new go.Shape("RoundedRectangle", { fill: "white" })\r
        .bind("fill", "color"),  // Shape.fill ← node.data.color\r
      new go.TextBlock("hello!", { margin: 5 })\r
        .bind("text")  // TextBlock.text ← node.data.text\r
    );\r
\r
const nodeDataArray = [\r
  // note extra properties for each node data: text and color\r
  { key: 1, text: "Alpha", color: "lightblue" },\r
  { key: 2, text: "Beta", color: "pink" },\r
  // This Node data has no text or color, it will get the defaults:\r
  { key: 3 }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 },\r
  { from: 2, to: 3 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`simpleTree`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Ellipse")\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha", color: "lightblue" },\r
  { key: 2, text: "Beta", parent: 1, color: "yellow" },  // note the "parent" property\r
  { key: 3, text: "Gamma", parent: 1, color: "orange" },\r
  { key: 4, text: "Delta", parent: 1, color: "lightgreen" }\r
];\r
diagram.model = new go.TreeModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.model = new go.GraphLinksModel([\r
    { key: "Alpha" },\r
    { key: "Beta", group: "Gamma" },\r
    { key: "Gamma", isGroup: true }\r
  ],\r
  [\r
    { from: "Alpha", to: "Beta"}\r
  ];`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.model = new go.TreeModel([\r
    { key: "Alpha" },\r
    { key: "Beta", parent: "Alpha" }\r
  ]);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const data = myDiagram.model.findNodeDataForKey("Delta");\r
// WRONG: direct mutation won't update the diagram\r
if (data !== null) data.color = "red";`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const data = myDiagram.model.findNodeDataForKey("Delta");\r
// CORRECT: modifies data.color and notifies bindings and the UndoManager\r
if (data !== null) myDiagram.model.set(data, "color", "red");\r
\r
// Even better: Make the programmatic change within a transaction so that it is undoable\r
myDiagram.commit(() => {\r
  if (data !== null) myDiagram.model.set(data, "color", "red");\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`3nbt6c`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};