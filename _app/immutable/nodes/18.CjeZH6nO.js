import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Context menus`},htmlContent:`<h1>Context menus</h1>\r
<p>GoJS provides a mechanism for you to define context menus for any object or for the diagram background.</p>\r
\r
<p class="box bg-info">\r
  Note: GoJS context menus cannot render outside of Diagrams,\r
  because they are objects inside the Diagram and therefore drawn only on the Diagram.\r
  If you need a context menu that may be drawn partially or fully outside the Diagram,\r
  use an <a href="#HTMLContextMenus">HTML context menu</a>.\r
</p>\r
\r
<p>\r
  A GoJS context menu is an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is shown when the user context-clicks\r
  (right mouse click or long touch hold) an object that has its <a href="../api/symbols/GraphObject.html#contextmenu" target="api">GraphObject.contextMenu</a> set.\r
  The context menu is bound to the same data as the part itself.\r
</p>\r
<p>See samples that make use of context menus in the <a href="../samples/#contextmenus">samples index</a>.</p>\r
<p>\r
  It is typical to implement a context menu as a "ContextMenu" Panel containing "ContextMenuButton"s,\r
  as you can see in the code below in the assignment of the Node's <a href="../api/symbols/GraphObject.html#contextmenu" target="api">GraphObject.contextMenu</a> and\r
  <a href="../api/symbols/Diagram.html#contextmenu" target="api">Diagram.contextMenu</a> properties.\r
  Each "ContextMenu" is just a "Vertical" Panel <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is shadowed.\r
  Each "ContextMenuButton" is a Panel on which you can set the <a href="../api/symbols/GraphObject.html#click" target="api">GraphObject.click</a> event handler.\r
  In the event handler <code>obj.part</code> will be the whole context menu Adornment.\r
  <code>obj.part.adornedPart</code> will be the adorned Node or Link.\r
  The bound data is <code>obj.part.data</code>, which will be the same as <code>obj.part.adornedPart.data</code>.\r
</p>\r
<p>\r
  You can see how the "ContextMenu" and "ContextMenuButton" builders are defined at\r
  <a href="../extensions/Buttons.js">Buttons.js</a>.\r
  There are examples of customizing buttons at the <a href="buttons">learn page on buttons</a>.\r
  You may also wish to theme your own context menus,\r
  described on the <a href="theming#BuilderObjects">theming learn page</a>.\r
</p>\r
<p>\r
  In this example each <a href="../api/symbols/Node.html" target="api">Node</a> has its <a href="../api/symbols/GraphObject.html#contextmenu" target="api">GraphObject.contextMenu</a> property set to an Adornment\r
  that shows a single button that when clicked changes the color property of the bound model data.\r
  The diagram gets its own context menu by setting <a href="../api/symbols/Diagram.html#contextmenu" target="api">Diagram.contextMenu</a>.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Try context clicking a node and invoking the "Change Color" command a few times.\r
  With the diagram context menu you will be able to "Undo" and/or "Redo",\r
  or you can use <kbd>Ctrl + Z</kbd> and/or <kbd>Ctrl + Y</kbd>.\r
</p>\r
\r
<h2 id="Positioning"><a class="not-prose heading-anchor" href="#Positioning">Positioning</a></h2>\r
<p>\r
  There are two ways to customize the positioning of the context menu relative to the adorned GraphObject.\r
  One way is to override <a href="../api/symbols/ContextMenuTool.html#positioncontextmenu" target="api">ContextMenuTool.positionContextMenu</a>.\r
  Another way is to have the context menu <a href="../api/symbols/Adornment.html" target="api">Adornment</a> include a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a>.\r
  The Placeholder is positioned to have the same size and position as the adorned object.\r
  The context menu will not to have a background, and thus will not display a shadow by\r
  default when using a Placeholder.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="HTMLContextMenus"><a class="not-prose heading-anchor" href="#HTMLContextMenus">HTML context menus</a></h2>\r
<p>\r
  It is possible to define custom context menus using HTML instead of Adornments\r
  by using the <a href="../api/symbols/HTMLInfo.html" target="api">HTMLInfo</a> class.\r
  The <a href="../samples/customContextMenu">Custom Context Menu sample</a> and\r
  <a href="../samples/htmlLightBoxContextMenu">Lightbox Context Menu sample</a>\r
  show two such custom context menus.\r
</p>\r
<p>\r
  HTML context menus require more effort to implement than using the default GoJS "ContextMenu" and "ContextMenuButton".\r
  However you would have the full power of HTML/CSS/JavaScript to show whatever you want.\r
  This includes creating context menus that can exist or float outside of the Diagram.\r
</p>\r
<p>\r
  There are two primary considerations when authoring HTML and CSS for context menus.\r
  The context menu should usually be a sibling Element of the Diagram and should never be nested\r
  inside a Diagram DIV:\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>And the ContextMenu may need a z-index set to ensure it is always on top.\r
  GoJS Diagrams have z-index of 2, and some tools a z-index of 100.</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  See the <a href="../samples/customContextMenu">Custom Context Menu sample</a> and\r
  <a href="../samples/htmlLightBoxContextMenu">Lightbox Context Menu sample</a> for HTML examples.\r
  See the <a href="HTMLInteraction">HTMLInteraction</a> page for more discussion on HTML in GoJS.\r
</p>\r
\r
<h2 id="DefaultContextMenuForTouchEnabledDevices"><a class="not-prose heading-anchor" href="#DefaultContextMenuForTouchEnabledDevices">Default context menu for touch-enabled devices</a></h2>\r
<p>\r
  Touch devices are presumed to have no keyboard ability, which makes actions like copying and pasting more difficult.\r
  Because of this, GoJS provides a built-in default context menu on touch devices, implemented in HTML.\r
  The buttons on this menu are populated dynamically, depending on the target GraphObject (if any) and\r
  Diagram and their properties.\r
</p>\r
<p>\r
  The default context menu can be disabled by setting <a href="../api/symbols/ContextMenuTool.html#defaulttouchcontextmenu" target="api">ContextMenuTool.defaultTouchContextMenu</a> to null.\r
  The <a href="../samples/htmlLightBoxContextMenu">Lightbox Context Menu sample</a> contains a\r
  re-implementation of this menu if you wish to modify it.\r
</p>\r
<p>\r
  If you define your own custom context menus,\r
  they will prevent the default context menu from appearing on touch devices.\r
  We recommend that your custom context menus include all common commands appropriate for your app.\r
</p>\r
`,codeBlocks:[{id:`contextmenus`,code:`const borderBrush = new go.Brush("Linear", { start: go.Spot.Left, end: go.Spot.Right,\r
  0: "#ecb504", 0.33: "#016b38", 0.66: "#015fad", 1: "#ab021d" })\r
\r
const myContextMenu = go.GraphObject.build("ContextMenu") // define a context menu for each node\r
  .add(\r
    go.GraphObject.build("ContextMenuButton", {\r
      click: changeColor,\r
      "ButtonBorder.stroke": borderBrush,\r
      "ButtonBorder.strokeWidth": 4,\r
      "_buttonFillOver": "#C5C5C5",\r
      "_buttonStrokeOver": borderBrush\r
    })\r
      .add(new go.TextBlock("Change Color", { font: "bold 9pt tahoma"}))\r
    // more ContextMenuButtons would go here\r
  )\r
\r
// this is a normal Node template using the contextMenu defined above\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    contextMenu: myContextMenu\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white" })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 5, stroke: "white" })\r
        .bind("text")\r
    );\r
\r
const buttonSettings = { "ButtonBorder.fill": "transparent", "ButtonBorder.stroke": null,\r
  "_buttonFillOver": "#e8f0fe", "_buttonStrokeOver": null }\r
// also define a context menu for the diagram's background\r
diagram.contextMenu =\r
  go.GraphObject.build("ContextMenu", { padding: 2 })\r
    .add(\r
      go.GraphObject.build("ContextMenuButton", { ...buttonSettings,\r
        click: (e, obj) => e.diagram.commandHandler.undo()\r
      }).bindObject("visible", "", o => o.diagram.commandHandler.canUndo())\r
        .add(\r
          new go.Panel("Horizontal", { alignment: go.Spot.Left })\r
            .add(\r
              new go.TextBlock("↶", { width: 18, stroke: "#202124" }),\r
              new go.TextBlock("Undo", { margin: new go.Margin(0, 6), stroke: "#202124" })\r
            )\r
        ),\r
      go.GraphObject.build("ContextMenuButton", { ...buttonSettings,\r
        click: (e, obj) => e.diagram.commandHandler.redo()\r
      }).bindObject("visible", "", o => o.diagram.commandHandler.canRedo())\r
        .add(\r
          new go.Panel("Horizontal", { alignment: go.Spot.Left })\r
            .add(\r
              new go.TextBlock("↷", { width: 18, stroke: "#202124" }),\r
              new go.TextBlock("Redo", { margin: new go.Margin(0, 6), stroke: "#202124" })\r
            )\r
        ),\r
      go.GraphObject.build("ContextMenuButton", { ...buttonSettings,\r
        click: (e, obj) => {\r
          e.diagram.commit(d => {\r
            const data = {};\r
            d.model.addNodeData(data);\r
            part = d.findPartForData(data);  // must be same data reference, not a new {}\r
            // set location to saved mouseDownPoint in ContextMenuTool\r
            part.location = d.toolManager.contextMenuTool.mouseDownPoint;\r
          }, 'new node')}\r
      })\r
        .add(\r
          new go.Panel("Horizontal", { alignment: go.Spot.Left })\r
            .add(\r
              new go.TextBlock("+", { width: 18, stroke: "#202124" }),\r
              new go.TextBlock("New Node", { margin: new go.Margin(0, 6), stroke: "#202124" })\r
            )\r
        )\r
    );\r
\r
// This method is called as a context menu button's click handler.\r
// Rotate the selected node's color through a predefined sequence of colors.\r
function changeColor(e, obj) {\r
  diagram.commit(d => {\r
    // get the context menu that holds the button that was clicked\r
    const contextmenu = obj.part;\r
    // get the node data to which the Node is data bound\r
    const nodedata = contextmenu.data;\r
    // compute the next color for the node\r
    let newcolor = "#ecb504";\r
    switch (nodedata.color) {\r
      case "#ecb504": newcolor = "#016b38"; break;\r
      case "#016b38": newcolor = "#015fad"; break;\r
      case "#015fad": newcolor = "#ab021d"; break;\r
      case "#ab021d": newcolor = "#ecb504"; break;\r
    }\r
    // modify the node data\r
    // this evaluates data Bindings and records changes in the UndoManager\r
    d.model.set(nodedata, "color", newcolor);\r
  }, "changed color");\r
}\r
diagram.model = new go.Model([\r
  { key: 1, text: "Alpha", color: "#015fad" },\r
  { key: 2, text: "Beta", color: "#016b38" }\r
]);\r
diagram.undoManager.isEnabled = true;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`contextmenusplaceholder`,code:`const buttonSettings = {\r
  "ButtonBorder.stroke": "black",\r
  "_buttonStrokeOver": "black",\r
  "ButtonBorder.fill": "#FFFFFFE0",\r
  "ButtonBorder.strokeWidth": 1,\r
}\r
\r
const myContextMenu = go.GraphObject.build("ContextMenu", { type: go.Panel.Spot })\r
  .add( // a Placeholder object\r
    new go.Placeholder({ padding: 5 }),\r
    go.GraphObject.build("ContextMenuButton", { ...buttonSettings,\r
      alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom,\r
      click: (e, obj) => shiftNode(obj, 0, -20)\r
    })\r
      .add(new go.TextBlock("Top", { stroke: "#015fad", font: "bold 10pt tahoma" })),\r
    go.GraphObject.build("ContextMenuButton", { ...buttonSettings,\r
      alignment: go.Spot.Right, alignmentFocus: go.Spot.Left,\r
      click: (e, obj) => shiftNode(obj, 20, 0)\r
    })\r
      .add(new go.TextBlock("Right", { stroke: "#015fad", font: "bold 10pt tahoma" })),\r
    go.GraphObject.build("ContextMenuButton", { ...buttonSettings,\r
      alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top,\r
      click: (e, obj) => shiftNode(obj, 0, 20)\r
    })\r
      .add(new go.TextBlock("Bottom", { stroke: "#015fad", font: "bold 10pt tahoma" })),\r
    go.GraphObject.build("ContextMenuButton", { ...buttonSettings,\r
      alignment: go.Spot.Left, alignmentFocus: go.Spot.Right,\r
      click: (e, obj) => shiftNode(obj, -20, 0)\r
    })\r
      .add(new go.TextBlock("Left", { stroke: "#015fad", font: "bold 10pt tahoma" }))\r
  )  // end ContextMenu\r
\r
// this is a shared context menu button click event handler, just for demonstration\r
function shiftNode(obj, horiz, vert) {\r
  const adorn = obj.part;\r
  const node = adorn.adornedPart;\r
  node.diagram.commit(d => {\r
    const pos = node.location.copy();\r
    pos.x += horiz;\r
    pos.y += vert;\r
    node.location = pos;\r
  }, "Shift");\r
}\r
\r
// this is a normal Node template that also has a contextMenu defined for it\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    contextMenu: myContextMenu // use a context menu for each node\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", height: 25, width: 50 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 5, stroke: "white" })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: 1, text: "Alpha", color: "#016b38" },\r
  { key: 2, text: "Beta", color: "#ab021d" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`<div style="position: relative;">\r
  <div id="myDiagramDiv" style="border: solid 1px black; width:400px; height:400px;"></div>\r
  <div id="contextMenu">\r
    <!-- ... context menu HTML -->\r
  </div>\r
</div>`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`#contextMenu {\r
  z-index: 1000;\r
  ...\r
}`,isExecutable:!1,language:`css`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`13umdtv`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};