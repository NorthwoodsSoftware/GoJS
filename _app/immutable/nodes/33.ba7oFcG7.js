import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{category:`Core Concepts`,title:`Interactivity`,description:`Tutorial for interactivity with GoJS`},htmlContent:`<h1>Interacting with diagrams</h1>\r
\r
<h2 id="BuiltinGoJSInteractivity"><a class="not-prose heading-anchor" href="#BuiltinGoJSInteractivity">Built-in GoJS interactivity</a></h2>\r
\r
<p>\r
  GoJS implements a number of common editing operations such as manipulating parts --\r
  moving, adding, copying, cutting, and deleting Nodes and Links.\r
  These editing abilities are accessible via mouse or touch and keyboard by default,\r
  and can also be invoked programmatically in JavaScript.\r
</p>\r
\r
<p>\r
  The following Diagram defines a node template and has four nodes in its model:\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  Out of the box, several interactions are available:\r
</p>\r
<ul>\r
  <li>Click a node to select it.\r
    Press and drag on a node to move it around.\r
    Or press and drag in the diagram background to pan the entire Diagram.\r
  </li>\r
  <li>Common keyboard shortcuts such as <code>Ctrl-C</code>, <code>Ctrl-V</code>, <code>Ctrl-X</code>\r
    will copy, paste, and cut diagram parts, respectively.\r
    (Use the Command modifier on a Mac.)\r
    Note that copies will copy the location of the Node as well, unless a layout or the paste command moves the new node.\r
  </li>\r
  <li>Press-hold-and-drag in the background of the diagram allows you to create a selection box for selecting multiple nodes.\r
    Ctrl-clicking on nodes allows you to toggle their selection.\r
    Shift-clicking on nodes makes sure they are selected.\r
  </li>\r
  <li>Since the Diagram's undoManager was enabled, <code>Ctrl-Z</code> and <code>Ctrl-Y</code> (or <code>Ctrl-Shift-Z</code>)\r
    will undo and redo operations.\r
    Panning (scrolling), zooming, and selection are not considered undoable operations.\r
  </li>\r
</ul>\r
\r
<p>\r
  By setting a few properties you can expose more interaction to a user, including manipulating groups:\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
\r
<p>\r
<ul>\r
  <li><a href="../api/symbols/ClickCreatingTool.html#archetypenodedata" target="api">ClickCreatingTool.archetypeNodeData</a> allows a double-click in the background to create\r
    a new node with a copy of the specified data.\r
  </li>\r
  <li><a href="../api/symbols/CommandHandler.html#archetypegroupdata" target="api">CommandHandler.archetypeGroupData</a> allows <code>Ctrl-G</code> to group a selection of nodes,\r
    with the group getting a copy of the specified data in the model.\r
  </li>\r
  <li><a href="../api/symbols/Group.html#ungroupable" target="api">Group.ungroupable</a> allows <code>Ctrl-Shift-G</code> to ungroup a selected group.\r
  </li>\r
  <li><a href="../api/symbols/ToolManager.html#mousewheelbehavior" target="api">ToolManager.mouseWheelBehavior</a> allows the mouse wheel to zoom instead of scroll by default.\r
    You can toggle this property by clicking on the mouse-wheel.\r
    On touch devices, pinch-zooming is enabled by default.\r
  </li>\r
  <li><a href="../api/symbols/TextBlock.html#editable" target="api">TextBlock.editable</a> in the <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> definition allows the text to be edited in place by the user.\r
    Select a node and then click on the text, or press F2, to begin text editing.\r
    Click anywhere else on the diagram or press <code>Tab</code> to finish editing text.\r
  </li>\r
</ul>\r
</p>\r
\r
<p>\r
  These interactions (and more!) are all present in the <a href="../samples/basic">Basic sample</a>.\r
  Be sure to also see the <a href="commands">learn page on commands</a>.\r
</p>\r
\r
<p>\r
  You can disable portions of Diagram interactivity with several properties,\r
  depending on what you want to allow users to do.\r
  See the <a href="permissions">learn page on permissions</a> for more explanation.\r
</p>\r
\r
<h2 id="FocusKeyboardControlTools"><a class="not-prose heading-anchor" href="#FocusKeyboardControlTools">Focus and keyboard control of Tools</a></h2>\r
<p>\r
  You have always been able to manipulate diagrams using the mouse without using the keyboard,\r
  especially when making use of the default context menu, which has always been needed on touch devices.\r
  As of version 3.1 if you have a keyboard you no longer need to use the mouse to manipulate almost any diagram.\r
  This keyboard control mode, when enabled, is available as long as the diagram has keyboard focus.\r
  You can always <code>Tab</code> out of the diagram.\r
</p>\r
<p>\r
  Because the GraphObjects within a Diagram are not HTML elements, there is a separate GoJS focus object\r
  that is a GraphObject.\r
  The arrow keys, <code>Enter</code>, and <code>Escape</code> can change which GraphObject has GoJS focus.\r
</p>\r
<p>\r
  Additionally there is a virtual pointer acting as if it were the mouse, visible when the\r
  <code>Shift</code> key is held down.\r
  Control the virtual pointer using <code>Shift</code>-arrow keys, <code>Shift</code> Numpad0-9 keys,\r
  <code>Shift-Enter</code>, and a few other keys modified by <code>Shift</code>.\r
</p>\r
<p>\r
  Version 3.1 also includes built-in support for screen readers.\r
  However, we recommend that you customize the behavior to provide the best possible experience for your users.\r
</p>\r
\r
<h3 id="summary-of-focus-navigation-and-the-virtual-pointer"><a class="not-prose heading-anchor" href="#summary-of-focus-navigation-and-the-virtual-pointer">Summary of Focus Navigation and the Virtual Pointer</a></h3>\r
(On a Mac, use the Command modifier insead of the Control modifier.)\r
<ul>\r
  <li>Type <code>Ctrl-Alt-Enter</code> to enable "keyboard control mode", if it hasn't already been turned on programmatically.\r
    That key chord will toggle this mode on and off.\r
  </li>\r
  <li>GoJS focus is shown by a double-colored dashed box around the GraphObject.\r
  </li>\r
  <li>Use the arrow keys to move focus around to other Nodes or other kinds of Parts.\r
    Use <code>Ctrl</code> arrow keys to follow a Link connected with a focused Node.\r
  </li>\r
  <li>Type <code>Space</code> to select a Part (a Node or a Link), <code>Shift-Space</code> to add a Part to the selection,\r
    and <code>Ctrl-Space</code> to toggle selection of a Part.\r
  </li>\r
  <li>Using <code>Enter</code> on a focused Node, if there are any GraphObjects within the Node that can be focused,\r
    will change focus to be on one such object, and arrow keys will keep focus within the Node.\r
  </li>\r
  <li>When focus is inside a Node, <code>Enter</code> will activate the focused object:\r
    click a button, start editing a TextBlock, or show a tooltip.\r
    <code>Space</code> will only show a tooltip, if one is available.\r
  </li>\r
  <li>When focus is inside a Node, <code>Escape</code> will change focus to be on the Node again.\r
  </li>\r
  <li>When focus is on a Group, <code>Enter</code> will first focus on focusable GraphObjects, if any,\r
    just as for regular Nodes, and then <code>Escape</code> will focus on the Group's member Nodes, if any,\r
    and finally <code>Escape</code> will focus on the Group again.\r
  </li>\r
  <li>Use the <code>ContextMenu</code> key to show any context menu for the object with GoJS focus.\r
  </li>\r
  <li>All other keyboard commands work normally, such as <code>Delete</code> of the selection,\r
    or <code>Ctrl-Z</code> to undo.\r
  </li>\r
  <li>Hold down a <code>Shift</code> key to show a magenta cross-hair virtual pointer that acts like the mouse.\r
    You can let go of the <code>Shift</code> key at any time without losing any state.\r
  </li>\r
  <li><code>Shift</code> arrow keys move the virtual pointer around.\r
    With the <code>Ctrl-Shift</code> modifiers they only move a pixel at a time.\r
    You can also use <code>Shift-Numpad1</code> through <code>Shift-Numpad9</code> (except <code>Shift-Numpad5</code>)\r
    to move the virtual pointer around.\r
    Unlike the arrow keys, you will be able to move the virtual pointer on the diagonals.\r
  </li>\r
  <li><code>Shift-Enter</code> or <code>Shift-Numpad5</code> toggles the mouse button down or up.\r
  </li>\r
  <li><code>Tab</code> works normally to change keyboard focus to the next HTML element after the Diagram.\r
    If the diagram is showing scrollbars, <code>Tab</code> will focus on the HTML element holding the scrollbars,\r
    allowing for the arrow keys to scroll normally.\r
  </li>\r
  <li>Note that when using the Windows Narrator screen reader you will need to stop Scan Mode via the\r
    <code>CapsLock-Space</code> command.\r
  </li>\r
</ul>\r
<p>\r
  See the <a href="accessibility">learn page on accessibility</a> for demos and more explanation.\r
</p>\r
\r
<h2 id="ToolTips"><a class="not-prose heading-anchor" href="#ToolTips">Tooltips</a></h2>\r
\r
<p>\r
  GoJS provides a mechanism for you to define tooltips for any object or for the Diagram itself.\r
  In the example below, two tooltips are defined, one on the Node template and one on the Diagram.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<p>\r
  Hover over a node to show the node's tooltip for five seconds.\r
  Hover anywhere in the viewport not over a node to see the tooltip for the diagram.\r
</p>\r
<p>\r
  The <a href="../samples/basic">basic sample</a> contains more complex tooltip examples.\r
  See the <a href="tooltips">learn page on tooltips</a> for more discussion.\r
</p>\r
\r
<h2 id="ContextMenus"><a class="not-prose heading-anchor" href="#ContextMenus">Context menus</a></h2>\r
\r
<p>\r
  GoJS provides a mechanism for you to define context menus for any object or for the Diagram itself.\r
  In the example below, two context menus are defined, one on the Node template (with one button) and\r
  one on the Diagram (with two buttons).\r
</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  If you right-click (or long-tap on a touch device) on a Node or the Diagram,\r
  you will see the GoJS context menu appear with the defined options.\r
</p>\r
\r
<p>\r
  The <a href="../samples/basic">basic sample</a> contains more complex context menu examples.\r
  See the <a href="contextMenus">learn page on context menus</a> for more discussion.\r
</p>\r
\r
<h2 id="LinkInteractions"><a class="not-prose heading-anchor" href="#LinkInteractions">Link interactions</a></h2>\r
\r
<p>\r
  GoJS lets users draw new Links by dragging out from a port on a Node to another port on a Node.\r
  Users can reconnect existing links by selecting one and dragging one of its handles.\r
  To enable these behaviors, some properties need to be set:\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  In the above example:\r
</p>\r
<ul>\r
  <li>The Node's <a href="../api/symbols/Shape.html" target="api">Shape</a> has its <code>portId</code> set to make it the port instead of the entire Node.\r
    Then several <code>...Linkable...</code> properties are set, allowing each node to link to itself and to others.\r
    Depending on the functionality you want to provide to your users,\r
    you may not want to set all of those properties on your ports in your node templates.\r
  </li>\r
  <li>To draw a new link to another node, drag from the port (the edge of the Shape that is not behind the TextBlock)\r
    to any node, including itself.\r
  </li>\r
  <li>In the link template, <code>relinkable...</code> properties are set, so that when the link is selected,\r
    it shows handles that can be dragged in order to reconnect the link with a different node.\r
  </li>\r
</ul>\r
\r
<p>\r
  GoJS allows linking and re-linking to abide by custom criteria that controls whether a link connection would be valid.\r
  You can read about this in the <a href="validation">learn page on validation</a>.\r
</p>\r
\r
<p>\r
  GoJS links have many interesting properties that are covered in depth in the\r
  <a href="links">learn page on Links</a> and on the following pages.\r
</p>\r
\r
<p>\r
  You may want to read more tutorials, such as the <a href="./">Quick Start</a>\r
  and the <a href="graphObject">GraphObject Manipulation Tutorial</a>.\r
</p>\r
<p>\r
\r
  If you want to explore by example, have a look at <a href="../samples">the samples</a>\r
  to get a feel for what's possible with GoJS.\r
</p>\r
`,codeBlocks:[{id:`myDiagramDiv`,code:`const diagram =\r
  new go.Diagram("myDiagramDiv", { "undoManager.isEnabled": true });\r
\r
// define a simple Node template\r
diagram.nodeTemplate =\r
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
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ]);`,isExecutable:!0,animation:!1,noScaffolding:!0,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv2`,code:`const myDiagram =\r
  new go.Diagram("myDiagramDiv", {\r
    // background double-click creates a new node\r
    "clickCreatingTool.archetypeNodeData":\r
      { text: "Node", color: "lightgray" },\r
\r
    // allow Ctrl-G to group selected nodes\r
    "commandHandler.archetypeGroupData":\r
      { text: "Group", isGroup: true },\r
\r
    // have mouse wheel events zoom in and out\r
    // instead of scroll up and down\r
    "toolManager.mouseWheelBehavior": go.WheelMode.Zoom,\r
\r
    // enable undo & redo\r
    "undoManager.isEnabled": true\r
  });\r
\r
myDiagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
          margin: 6, font: "18px sans-serif",\r
          editable: true\r
        })\r
        .bindTwoWay("text")\r
    );\r
\r
myDiagram.groupTemplate =\r
  new go.Group("Vertical", {\r
      // Ctrl-Shift-G ungroups a selected Group\r
      ungroupable: true\r
    })\r
    .add(\r
      new go.TextBlock({\r
          font: "bold 12pt sans-serif",\r
          editable: true\r
        })\r
        .bindTwoWay("text"),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape({ fill: "transparent" }),\r
          new go.Placeholder({ padding: 10 })\r
        )\r
    );\r
\r
myDiagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen", group: 5 },\r
    { key: 4, text: "Delta", color: "pink", group: 5 },\r
    { key: 5, text: "Group1", isGroup: true }\r
  ]);`,isExecutable:!0,animation:!1,noScaffolding:!0,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv3`,code:`const myDiagram =\r
  new go.Diagram("myDiagramDiv", {\r
    toolTip:\r
      // define a tooltip for the whole Diagram,\r
      // shown when the mouse hovers over the background\r
      go.GraphObject.build("ToolTip")\r
        .add(\r
          new go.TextBlock("Diagram info")\r
            .bindObject("text", "",\r
                ad => \`there are \${ad.diagram.nodes.count} nodes\`)\r
        ),\r
    "undoManager.isEnabled": true\r
  });\r
\r
myDiagram.nodeTemplate =\r
  new go.Node("Auto", {\r
      toolTip:\r
        // define a tooltip for a Node\r
        go.GraphObject.build("ToolTip")\r
          .add(\r
            new go.TextBlock("Node info")\r
              .bind("text", "color", c => \`This Node is \${c}\`)\r
          )\r
    })\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
          margin: 6, font: "18px sans-serif"\r
        })\r
        .bind("text")\r
    );\r
\r
myDiagram.model = new go.GraphLinksModel(\r
  [ // add a Node for each data object in this nodeDataArray\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ]);`,isExecutable:!0,animation:!1,noScaffolding:!0,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv4`,code:`const info = document.getElementById('info');\r
const myDiagram =\r
  new go.Diagram("myDiagramDiv", {\r
      "undoManager.isEnabled": true\r
    });\r
\r
// this is called when the context menu button is clicked\r
function nodeClicked(e, obj) {\r
  info.textContent = 'node ' + obj.part.data.key +\r
     ', "' + obj.part.data.text + '" was clicked';\r
}\r
\r
// defines a context menu to be used in the node template\r
const nodeContextMenu =\r
  go.GraphObject.build("ContextMenu")\r
    .add(\r
      go.GraphObject.build("ContextMenuButton",\r
          { click: nodeClicked })\r
        .add(new go.TextBlock("Click me!")),\r
      // more ContextMenuButtons would go here\r
    );\r
\r
myDiagram.nodeTemplate =\r
  new go.Node("Auto", { contextMenu: nodeContextMenu })\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
          margin: 6, font: "18px sans-serif"\r
        })\r
        .bind("text")\r
    );\r
\r
// this alerts the current number of nodes in the Diagram\r
function countNodes(e, obj) {\r
  info.textContent = 'there are ' + e.diagram.nodes.count + ' nodes';\r
}\r
\r
// this creates a new node and inserts it at the last event's point\r
function addNode(e, obj) {\r
  const data = { text: "Node", color: "white" };\r
  // do not need to set "key" property --\r
  // addNodeData will assign it automatically\r
  e.diagram.model.addNodeData(data);\r
  const node = e.diagram.findPartForData(data);\r
  node.location = e.diagram.lastInput.documentPoint;\r
}\r
\r
myDiagram.contextMenu =\r
  go.GraphObject.build("ContextMenu")\r
    .add(\r
      go.GraphObject.build("ContextMenuButton",\r
          { click: countNodes })\r
        .add(new go.TextBlock("Count Nodes")),\r
      go.GraphObject.build("ContextMenuButton",\r
          { click: addNode })\r
        .add(new go.TextBlock("Add Node")),\r
      // more ContextMenuButtons would go here\r
    );\r
\r
myDiagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" }\r
  ]);`,isExecutable:!0,animation:!1,noScaffolding:!0,html:`<div id="info"></div>`,language:`js`,initiallyVisible:!0},{id:`myDiagramDiv5`,code:`const myDiagram =\r
  new go.Diagram("myDiagramDiv", { "undoManager.isEnabled": true });\r
\r
myDiagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", {\r
          strokeWidth: 0,\r
          // declare this Shape to be the\r
          // port element for the Node\r
          portId: "",\r
          cursor: "pointer",\r
          // set various port-related properties\r
          // here on this port element\r
          fromLinkable: true,\r
          fromLinkableSelfNode: true,\r
          fromLinkableDuplicates: true,\r
          toLinkable: true,\r
          toLinkableSelfNode: true,\r
          toLinkableDuplicates: true\r
        })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
          margin: 6, font: "18px sans-serif"\r
        })\r
        .bind("text")\r
    );\r
\r
myDiagram.linkTemplate =\r
  new go.Link({\r
      // allow the user to reconnect existing links:\r
      relinkableFrom: true, relinkableTo: true,\r
      // draw the link path shorter than normal,\r
      // so that it does not interfere with the appearance of the arrowhead\r
      toShortLength: 2\r
    })\r
    .add(\r
      new go.Shape({ strokeWidth: 2 }),\r
      new go.Shape({ toArrow: "Standard", strokeWidth: 0 })\r
    );\r
\r
myDiagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "Alpha", color: "lightblue" },\r
    { key: 2, text: "Beta", color: "orange" },\r
    { key: 3, text: "Gamma", color: "lightgreen" },\r
    { key: 4, text: "Delta", color: "pink" }\r
  ],\r
  [\r
    { from: 1, to: 2 },\r
    { from: 1, to: 4 }\r
  ]);`,isExecutable:!0,animation:!1,noScaffolding:!0,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1udb9xp`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};