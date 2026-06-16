import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Transactions and undo`,category:`Core Concepts`,categoryOrder:8},htmlContent:`<h1>Transactions and the UndoManager</h1>\r
<p>\r
  GoJS models and diagrams make use of an <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a> that can record all changes and support undoing and redoing those changes.\r
  Each state change (values before and aftert) is recorded in a <a href="../api/symbols/ChangedEvent.html" target="api">ChangedEvent</a>.\r
  Such changes are grouped together into <a href="../api/symbols/Transaction.html" target="api">Transaction</a>s so that a user action, which may result in many changes,\r
  can be undone and redone as a single operation.\r
</p>\r
\r
<h2 id="Enabling the Undo Manager"><a class="not-prose heading-anchor" href="#Enabling the Undo Manager">Enabling the Undo Manager</a></h2>\r
\r
<p>You can set <code>Diagram.undoManager.isEnabled</code> to <code>true</code> during Diagram initialization:</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
\r
\r
<p>\r
  Not all state changes result in <a href="../api/symbols/ChangedEvent.html" target="api">ChangedEvent</a>s that can be recorded by the UndoManager.\r
  Some properties are considered transient, such as <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a>, <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>, <a href="../api/symbols/Diagram.html#currenttool" target="api">Diagram.currentTool</a>,\r
  <a href="../api/symbols/Diagram.html#currentcursor" target="api">Diagram.currentCursor</a>, or <a href="../api/symbols/Diagram.html#ismodified" target="api">Diagram.isModified</a>.\r
  Some changes are structural or considered unchanging, such as <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a>, any property of <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>,\r
  or any of the tool or layout properties.\r
  But most <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> and model properties do raise a ChangedEvent on the Diagram or Model, respectively, when a property value has been changed.\r
</p>\r
\r
<h2 id="Transactions"><a class="not-prose heading-anchor" href="#Transactions">Transactions</a></h2>\r
<p>\r
  Whenever you modify a model or its data programmatically in response to some event, you should wrap the code in a transaction.\r
  Call <a href="../api/symbols/Diagram.html#starttransaction" target="api">Diagram.startTransaction</a> or <a href="../api/symbols/Model.html#starttransaction" target="api">Model.startTransaction</a>, make the changes,\r
  and then call <a href="../api/symbols/Diagram.html#committransaction" target="api">Diagram.commitTransaction</a> or <a href="../api/symbols/Model.html#committransaction" target="api">Model.commitTransaction</a>.\r
  Although the primary benefit from using transactions is to group together side-effects for undo/redo,\r
  you should use transactions even if your application does not support undo/redo by the user.\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  A typical case for using transactions is when some command makes a change to the model.\r
  Select a node and press the "addChild()" button to execute the manually created transaction.\r
  This creates a new node and link together, which can be undone.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  As with database transactions, you will want to perform transactions that are short and infrequent.\r
  Do not leave transactions ongoing between user actions.\r
  Consider whether it would be better to have a single transaction surrounding a loop instead of starting and finishing a transaction repeatedly within a loop.\r
  Do not execute transactions within a property setter -- such granularity is too small.\r
  Instead execute a transaction where the properties are set in response to some user action or external event.\r
</p>\r
\r
<p>\r
  The only exception is that transactions are unnecessary when initializing a model or a diagram before assigning the model to the\r
  <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a> property.\r
  (A Diagram only gets access to an UndoManager via the Model, the <a href="../api/symbols/Model.html#undomanager" target="api">Model.undoManager</a> property.)\r
</p>\r
\r
<h2 id="gojs-commands-and-handlers-create-transactions-for-you"><a class="not-prose heading-anchor" href="#gojs-commands-and-handlers-create-transactions-for-you">GoJS Commands and handlers create transactions for you</a></h2>\r
\r
<p>\r
  Many event handlers and listeners are already executed within transactions that are conducted by <a href="../api/symbols/Tool.html" target="api">Tool</a>s or <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> commands,\r
  so you often will not need to start and commit a transaction within such functions.\r
  For example, implementing an "ExternalObjectsDropped" <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listener,\r
  which usually does want to modify the just-dropped Parts in the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a>,\r
  is called within the <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>'s transaction, so no additional start/commit transaction calls are needed.\r
  However, the <a href="../api/symbols/GraphObject.html#click" target="api">GraphObject.click</a> event handler to respond to a click on a GraphObject needs to perform a transaction if\r
  it wants to modify the model or the diagram.\r
  Most custom click event handlers do not change the diagram but instead update some HTML.\r
</p>\r
<p>\r
Read the API documentation for details about whether a function is called within a transaction,\r
  and see the <a href="commands">Commands</a> page and <a href="events">Events</a> page for built-in transaction examples.\r
</p>\r
<p>\r
  Finally, some customizations, such as the <a href="../api/symbols/Node.html#linkvalidation" target="api">Node.linkValidation</a> predicate, should not modify the diagram or model at all.\r
</p>\r
<p>\r
  Both model changes and diagram changes are recorded in the <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a> only if the model's <a href="../api/symbols/UndoManager.html#isenabled" target="api">UndoManager.isEnabled</a> has been set to true.\r
  If you do not want the user to be able to perform undo or redo and also prevent the recording of any <a href="../api/symbols/Transaction.html" target="api">Transaction</a>s,\r
  but you still want to get "Transaction"-type <a href="../api/symbols/ChangedEvent.html" target="api">ChangedEvent</a>s because you want to update a database,\r
  you can set <a href="../api/symbols/UndoManager.html#maxhistorylength" target="api">UndoManager.maxHistoryLength</a> to zero.\r
</p>\r
\r
\r
<h2 id="SupportUndoManager"><a class="not-prose heading-anchor" href="#SupportUndoManager">Supporting the UndoManager</a></h2>\r
<p>\r
  Changes to JavaScript data properties do not automatically result in any notifications that can be observed.\r
  Thus when you want to change the value of a property in a manner that can be undone and redone,\r
  you should call <a href="../api/symbols/Model.html#setdataproperty" target="api">Model.setDataProperty</a> (or <a href="../api/symbols/Model.html#set" target="api">Model.set</a>, which is an abbreviation for that method).\r
  This will get the previous value for the property, set the property to the new value, and call <a href="../api/symbols/Model.html#raisedatachanged" target="api">Model.raiseDataChanged</a>,\r
  which will also automatically update any target bindings in the Node corresponding to the data.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
`,codeBlocks:[{id:`simpleModel`,code:`const diagram =\r
  new go.Diagram("myDiagramDiv", {\r
    "undoManager.isEnabled": true // enables Ctrl-Z/Ctrl-Y to undo/redo\r
  });\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle")\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta",  color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" }\r
  ],\r
  [\r
    { from: 1, to: 2 }\r
  ]\r
);\r
\r
// --- HTML buttons for sample: ---\r
function enable(name, ok) {\r
  const button = document.getElementById(name);\r
  if (button) button.disabled = !ok;\r
}\r
// enable or disable buttons\r
function updateButtons() {\r
  const cmd = diagram.commandHandler;\r
  enable("Delete", cmd.canDeleteSelection());\r
  enable("Undo", cmd.canUndo());\r
  enable("Redo", cmd.canRedo());\r
}\r
// notice whenever the selection may have changed\r
diagram.addDiagramListener("ChangedSelection", e => updateButtons());\r
// notice whenever a transaction or undo/redo has occurred\r
diagram.addModelChangedListener(e => {\r
  if (e.isTransactionFinished) updateButtons();\r
});\r
// perform initial enablements after everything has settled down\r
setTimeout(updateButtons, 100);\r
// make the diagram accessible to button onclick handlers\r
window.diagram = diagram;`,isExecutable:!0,animation:!1,noScaffolding:!0,html:`
<div>
<input id="Delete" type="button" onclick="diagram.commandHandler.deleteSelection()" value="Delete" />
<input id="Undo" type="button" onclick="diagram.commandHandler.undo()" value="Undo" />
<input id="Redo" type="button" onclick="diagram.commandHandler.redo()" value="Redo" />
</div>
`,language:`js`,initiallyVisible:!0},{id:`simpleModel`,code:`// Transaction names are optional\r
\r
// Make a transaction:\r
myDiagram.startTransaction("modify something");\r
// Modify Nodes, Links, or the Diagram here\r
myDiagram.commitTransaction("modify something");\r
\r
// Alternatively:\r
myDiagram.commit(diag => {  // diag === myDiagram\r
  // Modify Nodes, Links, or the Diagram here\r
}, "modify something");`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`transaction`,code:`// define a function named "addChild" that is invoked by a button click\r
addChild = () => {\r
  const selnode = diagram.selection.first();\r
  if (!(selnode instanceof go.Node)) return;\r
  // have the Model add a new node data,\r
  // then add new link data connecting the original node with the new one\r
  diagram.commit(d => {\r
    const newnode = { key: "N", text: \`New \${d.model.nodeDataArray.length}\` };\r
    d.model.addNodeData(newnode); // this will ensure a unique key\r
    const newlink = { from: selnode.data.key, to: newnode.key };\r
    d.model.addLinkData(newlink);\r
  }, "add node and link");\r
};\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "whitesmoke" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
diagram.layout = new go.TreeLayout();\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "Beta" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.model.undoManager.isEnabled = true;\r
// --- HTML buttons for sample: ---\r
function enable(name, ok) {\r
  const button = document.getElementById(name);\r
  if (button) button.disabled = !ok;\r
}\r
// enable or disable buttons\r
function updateButtons() {\r
  const cmd = diagram.commandHandler;\r
  enable("Delete", cmd.canDeleteSelection());\r
  enable("Undo", cmd.canUndo());\r
  enable("Redo", cmd.canRedo());\r
  enable("addChild", diagram.selection.count > 0);\r
}\r
// notice whenever the selection may have changed\r
diagram.addDiagramListener("ChangedSelection", e => updateButtons());\r
// notice whenever a transaction or undo/redo has occurred\r
diagram.addModelChangedListener(e => {\r
  if (e.isTransactionFinished) updateButtons();\r
});\r
// perform initial enablements after everything has settled down\r
setTimeout(updateButtons, 100);\r
// make the diagram accessible to button onclick handlers\r
window.diagram = diagram;`,isExecutable:!0,animation:!1,html:`
  <button id="addChild" onclick="addChild()">addChild() to selected Node</button>
 <div style="margin: 4px;">
<input id="Delete" type="button" onclick="diagram.commandHandler.deleteSelection()" value="Delete" />
<input id="Undo" type="button" onclick="diagram.commandHandler.undo()" value="Undo" />
<input id="Redo" type="button" onclick="diagram.commandHandler.redo()" value="Redo" />
</div>


  `,language:`js`,initiallyVisible:!0},{id:`changingData`,code:`diagram.nodeTemplate =\r
    new go.Node("Auto")\r
      .add(\r
        new go.Shape("RoundedRectangle", { fill: "whitesmoke" }),\r
        new go.TextBlock({ margin: 5 })\r
          .bind("text", "someValue")  // bind to the "someValue" data property\r
      );\r
\r
  const nodeDataArray = [\r
    { key: "Alpha", someValue: 1 }\r
  ];\r
  diagram.model = new go.GraphLinksModel(nodeDataArray);\r
  diagram.model.undoManager.isEnabled = true;\r
\r
  // define a function named "incrementData" callable by onclick\r
  incrementData = () => {\r
    diagram.model.commit(m => {\r
      const data = m.nodeDataArray[0];  // get the first node data\r
      m.set(data, "someValue", (data.someValue || 0) + 1);\r
    }, "increment");\r
  };`,isExecutable:!0,animation:!1,html:`<button onclick="incrementData()">incrementData()</button>`,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1gookuv`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};