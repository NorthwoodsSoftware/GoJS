import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{category:`Further Reading`,title:`GraphObject manipulation`,description:`Tutorial for GraphObject manipulation with GoJS`},htmlContent:`<h1>GraphObject manipulation</h1>\r
\r
<h2 id="ProgrammaticallyInteractiveWithNodes"><a class="not-prose heading-anchor" href="#ProgrammaticallyInteractiveWithNodes">Programmatically interacting with Nodes</a></h2>\r
\r
<p>\r
  This guide will show you some basic ways of programmatically interacting with GoJS nodes and links and model data.\r
  Throughout this page, we will use the following diagram setup as our starting point:\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="FindingSingleNodesDiagramFindNodeForKey"><a class="not-prose heading-anchor" href="#FindingSingleNodesDiagramFindNodeForKey">Finding single nodes: Diagram.findNodeForKey</a></h2>\r
\r
<p>\r
  You can use <code>Diagram.findNodeForKey(key)</code> to get a reference to a Node in JavaScript.\r
  Key values in GoJS can be either strings or numbers.\r
  You can then use the Node reference to inspect and manipulate the Node or its data.\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  However <a href="../api/symbols/Diagram.html#findnodeforkey" target="api">Diagram.findNodeForKey</a> may return <code>null</code> if no node data object uses that key value.\r
  It only looks at the model to find a node data object that uses the given key value,\r
  from which it finds the corresponding Node in the Diagram.\r
  It does not look at the text values of any TextBlocks that are within the nodes,\r
  so it can work even if no text is shown at all, or if the node is not visible.\r
  And it does not look at any programmatically added parts that were not created from model data,\r
  such as titles or legends.\r
</p>\r
<p>\r
  Once you have a Node, you can get its key either via the <a href="../api/symbols/Node.html#key" target="api">Node.key</a> property or by looking at its data:\r
  <code>someNode.data.key</code>, just as you can look at any of the data properties.\r
</p>\r
\r
<h2 id="CollectionsOfNodesAndLinks"><a class="not-prose heading-anchor" href="#CollectionsOfNodesAndLinks">Collections of Nodes and Links</a></h2>\r
\r
<p>\r
  Diagrams have several properties and methods that return GoJS iterators describing collections of Parts.\r
  Both Nodes and Links are kinds of Parts.\r
  <a href="../api/symbols/Diagram.html#nodes" target="api">Diagram.nodes</a> and <a href="../api/symbols/Diagram.html#links" target="api">Diagram.links</a> return iterators of all Nodes and Links in the Diagram, respectively.\r
  <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a> returns an iterator of selected Parts (both selected Nodes and selected Links).\r
</p>\r
\r
<p>\r
  There are also more specific methods for common operations, such as <a href="../api/symbols/Diagram.html#findtreeroots" target="api">Diagram.findTreeRoots</a>\r
  which returns an iterator of all top-level Nodes that have no tree-parent node.\r
</p>\r
\r
<p>\r
  This next example uses <a href="../api/symbols/Diagram.html#nodes" target="api">Diagram.nodes</a> and shows how to iterate over the collection.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>As a result we have very scaled-down nodes, except for Beta:</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<h2 id="NamedGraphObjectsAndPanelFindObject"><a class="not-prose heading-anchor" href="#NamedGraphObjectsAndPanelFindObject">Named GraphObjects and Panel.findObject</a></h2>\r
\r
<p>\r
  Often we want to manipulate a property that belongs to one of the Node's elements,\r
  perhaps an element arbitrarily deep in the template.\r
  In our example Diagram, each Node has one Shape,\r
  and if we want to change the color of this Shape directly we would need a reference to it.\r
  To make it possible to find, we can give that Shape a name:\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  Names allow us to easily find GraphObjects inside of Panels (all Nodes are also Panels) using <a href="../api/symbols/Panel.html#findobject" target="api">Panel.findObject</a>,\r
  which will search the visual tree of a Panel starting at that panel.\r
  So when we have a reference to a Node, we can call <code>someNode.findObject("SomeName")</code> to search through the node\r
  for a GraphObject with that name.\r
  It will return a reference to the named GraphObject if it is found, or <code>null</code> otherwise.\r
</p>\r
\r
<p>Using this, we could make an HTML button that changes the fill of the Shape inside of a selected Node:</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
\r
<!-- LIVE -->\r
<!-- CODE_BLOCK_6 -->\r
\r
\r
<h2 id="ChangingProperteisAndUpdatingModelUsingDataBindings"><a class="not-prose heading-anchor" href="#ChangingProperteisAndUpdatingModelUsingDataBindings">Changing properties and updating the Model using data bindings</a></h2>\r
\r
<p>\r
  Looking again at our Node template, we have the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a>\r
  property data-bound to the "color" property of our Node data:\r
</p>\r
\r
<!-- CODE_BLOCK_7 -->\r
\r
<p>\r
  Changing the Shape's <code>fill</code> property inside our node will not,\r
  as the Node template currently stands, update the model data.\r
</p>\r
\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  This is undesirable in many cases.\r
  When we want the change to persist after saving and loading, we will want the model data updated too.\r
</p>\r
\r
<p>\r
  However, in some situations this lack of persistence might be a good thing.\r
  For instance if we want the color change for only cosmetic purposes,\r
  such as changing the color of a button when hovering over it with the mouse,\r
  we would not want to modify the model data that might be saved.\r
</p>\r
\r
<p>\r
  In this case, suppose that we do want to update the model.\r
  The preferred way to do this is to modify the data in the model and depend on the data binding to automatically update the Shape.\r
  However, we cannot modify the data directly by just setting the JavaScript property.\r
</p>\r
\r
<!-- CODE_BLOCK_9 -->\r
\r
<p>\r
  Instead we should set the data property using the method <code>Model.set(data, propertyName, propertyValue)</code>.\r
  As always, changes should always be performed within a transaction.\r
  There should only be a single transaction for all changes that need to be made at the same time,\r
  from the user's point of view.\r
  A convenient way to perform a transaction is to call <a href="../api/symbols/Model.html#commit" target="api">Model.commit</a>.\r
</p>\r
\r
<!-- CODE_BLOCK_10 -->\r
\r
<!-- LIVE -->\r
<!-- CODE_BLOCK_11 -->\r
\r
<p>\r
  Note that there is no longer any need to name the Shape "SHAPE",\r
  because there is no longer any need to call <a href="../api/symbols/Panel.html#findobject" target="api">Panel.findObject</a> to look for the particular Shape.\r
  Data binding will automatically update properties, so we do not have to do that ourselves.\r
</p>\r
\r
<!-- CODE_BLOCK_12 -->\r
\r
<h2 id="SubjectMentionedAndFurtherReading"><a class="not-prose heading-anchor" href="#SubjectMentionedAndFurtherReading">Subjects mentioned and further reading</a></h2>\r
<ul>\r
  <li>Data Binding — See the\r
    <a href="dataBinding">learn page on data binding</a> for lots more detail.\r
  </li>\r
  <li>Transactions — See the\r
    <a href="transactions">learn page on Transactions</a>.\r
  </li>\r
</ul>\r
<p>\r
  You may want to read more tutorials, such as the <a href=".">Learn GoJS</a> tutorial\r
  and the <a href="interactivity">Interactivity</a> tutorial.\r
</p>\r
<p>\r
  If you want to explore by example, have a look at <a href="../samples">the samples</a>\r
  to get a feel for what's possible with GoJS.\r
</p>\r
`,codeBlocks:[{id:`myDiagramDiv1`,code:`const myDiagram =\r
  new go.Diagram("myDiagramDiv", {\r
    "undoManager.isEnabled": true\r
  });\r
\r
myDiagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0 })\r
        // the Shape.fill comes from the\r
        // Node.data.color property\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 6, font: "18px sans-serif" })\r
        // the TextBlock.text comes from the\r
        // Node.data.text property\r
        .bind("text")\r
    );\r
\r
myDiagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ]);`,isExecutable:!0,animation:!1,noScaffolding:!0,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv2`,code:`// Note the first node data object has key: 1\r
const node = myDiagram.findNodeForKey(1);\r
\r
// Selects the node programmatically,\r
// rather than the user clicking interactively:\r
myDiagram.select(node);\r
\r
// Outputs a JavaScript object in the developer console window.\r
// The format of what is output will differ per browser, but is essentially the object:\r
// { key: 1, text: "Alpha", color: "lightblue" }\r
console.log(node.data);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// Calling Diagram.commit executes the given function between startTransaction and commitTransaction\r
// calls.  That automatically updates the display and allows the effects to be undone.\r
myDiagram.commit(diag => {  // diag === myDiagram\r
  // iterate over all nodes in Diagram\r
  diag.nodes.each(node => {\r
    if (node.data.text === "Beta") return; // skip Beta, just for contrast\r
    node.scale = 0.6; // shrink each node\r
  });\r
}, "decrease scale");`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv3`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0 })\r
        // the Shape.fill comes from the Node.data.color property\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 6, font: "18px sans-serif" })\r
        // the TextBlock.text comes from the Node.data.text property\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ]);\r
\r
  diagram.commit(diag => {  // diag === myDiagram\r
    // iterate over all nodes in Diagram\r
    diag.nodes.each(node => {\r
      if (node.data.text === 'Beta') return; //skip Beta, just to contrast\r
      node.scale = 0.6; // shrink each node\r
    });\r
  }, 'decrease scale');`,isExecutable:!0,animation:!1,hideCode:!0,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", {\r
          strokeWidth: 0,\r
          name: "SHAPE" // added the name property\r
        })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 6, font: "18px sans-serif" }),\r
        .bind("text")\r
    );`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const selectionButton = document.getElementById("selectionButton");\r
selectionButton.addEventListener("click", () => {\r
  myDiagram.commit(diag => {\r
    diag.selection.each(node => {\r
      const shape = node.findObject("SHAPE");\r
      // If there was a GraphObject in the node named SHAPE,\r
      // then set its fill to red:\r
      if (shape !== null) {\r
        shape.fill = "red";\r
      }\r
    });\r
  }, "change color");\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv4`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0, name: 'SHAPE' })\r
        // the Shape.fill comes from the Node.data.color property\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 6, font: "18px sans-serif" })\r
        // the TextBlock.text comes from the Node.data.text property\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ]);\r
\r
window.diagram = diagram;\r
  const selectionButton = document.getElementById('selectionButton');\r
  selectionButton.addEventListener('click', () => {\r
    diagram.commit(diag => {\r
      diag.selection.each(node => {\r
        const shape = node.findObject('SHAPE');\r
        // If there was a GraphObject in the node named SHAPE, then set its fill to red:\r
        if (shape !== null) {\r
          shape.fill = 'red';\r
        }\r
      });\r
    }, 'change color');\r
  });`,isExecutable:!0,animation:!1,html:`<button id="selectionButton">Select some Nodes, then click here to change their Shape.fill</button>`,hideCode:!0,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0, name: "SHAPE" })\r
        .bind("fill", "color"),  // note this data binding\r
      new go.TextBlock({ margin: 6, font: "18px sans-serif" })\r
        .bind("text")\r
    );`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const node = myDiagram.findNodeForKey(1);\r
const shape = node.findObject("SHAPE");\r
shape.fill = "red";\r
\r
// outputs "lightblue" - the model has not changed!\r
console.log(node.data.color);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const node = myDiagram.findNodeForKey(1);\r
\r
// DO NOT DO THIS!\r
// This would update the data, but GoJS would not be notified\r
// that this arbitrary JavaScript object has been modified,\r
// and the associated Node will not be updated appropriately,\r
// nor will undo or redo work.\r
node.data.color = "red";`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const node = myDiagram.findNodeForKey(1);\r
\r
// Model.commit executes the given function within a transaction\r
myDiagram.model.commit(m => {  // m == the Model\r
  // This is the safe way to change model data.\r
  // GoJS will be notified that the data has changed\r
  // so that it can update the node in the Diagram\r
  // and record the change in the UndoManager.\r
  m.set(node.data, "color", "red");\r
}, "changed color");\r
\r
// outputs "red" - the model has changed!\r
console.log(node.data.color);\r
// and the user will see the red node`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv5`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0 })\r
        // the Shape.fill comes from the Node.data.color property\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 6, font: "18px sans-serif" })\r
        // the TextBlock.text comes from the Node.data.text property\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ]);\r
\r
  const node5 = diagram.findNodeForKey(1);\r
  // Model.commit executes the given function within a transaction\r
  diagram.model.commit(m => {\r
    // m == the Model\r
    // This is the safe way to change model data.\r
    // GoJS will be notified that the data has changed\r
    // so that it can update the node in the Diagram\r
    // and record the change in the UndoManager.\r
    m.set(node5.data, 'color', 'red');\r
  }, 'changed color');`,isExecutable:!0,animation:!1,hideCode:!0,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0 })\r
        // removed the name property\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 6, font: "18px sans-serif" })\r
        .bind("text")\r
    );`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`fvql9d`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};