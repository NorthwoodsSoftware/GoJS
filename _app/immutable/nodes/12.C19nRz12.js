import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Buttons`},htmlContent:`<h1>Buttons</h1>\r
<p>\r
  For your convenience we have defined several <a href="../api/symbols/Panel.html" target="api">Panel</a>s for common uses.\r
  These include "Button", "TreeExpanderButton", "SubGraphExpanderButton", "PanelExpanderButton", "ContextMenuButton",\r
  "CheckBoxButton", "ToggleSwitch", and "AutoRepeatButton".\r
  "ContextMenuButton"s are typically used inside of "ContextMenu" Panels;\r
  "CheckBoxButton"s are used in the implementation of "CheckBox" Panels.\r
  "ToggleSwitch"s are used in the implementation of "Toggle" Panels.\r
</p>\r
<p>\r
  These predefined panels can be used as if they were <a href="../api/symbols/Panel.html" target="api">Panel</a>-derived classes\r
  in calls to <a href="../api/symbols/GraphObject.html#build" target="api">GraphObject.build</a>.\r
  They are implemented as simple visual trees of <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s in <a href="../api/symbols/Panel.html" target="api">Panel</a>s,\r
  with pre-set properties and event handlers.\r
</p>\r
<p>\r
  You can see a copy of their definitions in this file:\r
  <a href="../extensions/Buttons.js">Buttons.js</a>.\r
</p>\r
<p>\r
  See samples that make use of buttons in the <a href="../samples/#buttons">samples index</a>.\r
  In addition, see the <a href="../samples/CheckBoxes">Checkboxes</a> extension for an example of using\r
  "CheckBoxButton".\r
</p>\r
\r
\r
<h2 id="GeneralButtons"><a class="not-prose heading-anchor" href="#GeneralButtons">General Buttons</a></h2>\r
<p>\r
  The most general kind of predefined <a href="../api/symbols/Panel.html" target="api">Panel</a> is "Button".\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  Buttons are just Panels holding a Shape that will surround whatever content you give it.\r
  The border Shape is named "ButtonBorder" so that you can easily set or bind its properties.\r
</p>\r
<p>\r
  The event handlers defined by all "Button"s make use of additional properties,\r
  not defined in the API, but that you can see in the definition of "Button":\r
  <a href="../extensions/Buttons.js">Buttons.js</a>.\r
  These properties parameterize the appearance of the button.\r
</p>\r
<p>\r
  In the following example, "Button"s contain both text and images.\r
  By setting the value of <a href="../api/symbols/Panel.html#isenabled" target="api">Panel.isEnabled</a> each "Button" can be disabled.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
\r
<h2 id="TreeExpanderButtons"><a class="not-prose heading-anchor" href="#TreeExpanderButtons">TreeExpanderButtons</a></h2>\r
<p>\r
  It is common to want to expand and collapse subtrees of nodes.\r
  It is easy to let the user control this by adding an instance of the "TreeExpanderButton" to your Node template.\r
  The button calls <a href="../api/symbols/CommandHandler.html#collapsetree" target="api">CommandHandler.collapseTree</a> or <a href="../api/symbols/CommandHandler.html#expandtree" target="api">CommandHandler.expandTree</a>\r
  depending on the value of <a href="../api/symbols/Node.html#istreeexpanded" target="api">Node.isTreeExpanded</a>.\r
  The button's icon's <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> changes as the value of\r
  <a href="../api/symbols/Node.html#istreeexpanded" target="api">Node.isTreeExpanded</a> changes.\r
</p>\r
\r
<p>\r
  A "TreeExpanderButton" is a "Button" that, by default, holds a Shape displaying either a "MinusLine" or a "PlusLine"\r
  figure, depending on the value of the <a href="../api/symbols/Node.html#istreeexpanded" target="api">Node.isTreeExpanded</a>.\r
  That shape is named "ButtonIcon", so that you can easily set or bind its properties,\r
  in addition to the properties of the "ButtonBorder" and of the "Button" itself.\r
</p>\r
\r
<p>\r
  In the example below, the TreeExpanderButton on the root node uses the default icons.\r
  By setting the _treeExpandedFigure and _treeCollapsedFigure properties on the other two buttons, their appearance is changed.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<h2 id="SubGraphExpanderButtons"><a class="not-prose heading-anchor" href="#SubGraphExpanderButtons">SubGraphExpanderButtons</a></h2>\r
<p>\r
  It is also common to want to expand and collapse groups containing subgraphs.\r
  You can let the user control this by adding an instance of the "SubGraphExpanderButton" to your Group template.\r
  The button calls <a href="../api/symbols/CommandHandler.html#collapsesubgraph" target="api">CommandHandler.collapseSubGraph</a> or <a href="../api/symbols/CommandHandler.html#expandsubgraph" target="api">CommandHandler.expandSubGraph</a>\r
  depending on the value of <a href="../api/symbols/Group.html#issubgraphexpanded" target="api">Group.isSubGraphExpanded</a>.\r
  The button's icon's <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> changes as the value of\r
  <a href="../api/symbols/Group.html#issubgraphexpanded" target="api">Group.isSubGraphExpanded</a> changes.\r
</p>\r
\r
<p>\r
  A "SubGraphExpanderButton" is like a "TreeExpanderButton" in its being a "Button"\r
  with a border Shape surrounding an icon Shape.\r
  That shape is named "ButtonIcon", so that you can easily set or bind its properties,\r
  in addition to the properties of the "ButtonBorder" and of the "Button" itself.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h2 id="PanelExpanderButtons"><a class="not-prose heading-anchor" href="#PanelExpanderButtons">PanelExpanderButtons</a></h2>\r
<p>\r
  It is common to want to expand and collapse a piece of a node,\r
  thereby showing or hiding details that are sometimes not needed.\r
  It is easy to let the user control this by adding an instance of the "PanelExpanderButton" to your node template.\r
  The third argument to <a href="../api/symbols/GraphObject.html#build" target="api">GraphObject.build</a>\r
  should be a string that names the element in the node whose\r
  <a href="../api/symbols/GraphObject.html#visible" target="api">GraphObject.visible</a> property you want the button to toggle.\r
  The default name is "COLLAPSIBLE".\r
</p>\r
\r
<p>\r
  A "PanelExpanderButton" is like a "TreeExpanderButton" or "SubGraphExpanderButton"\r
  in its being a "Button" with a border Shape surrounding an icon Shape.\r
  However, this panel binds the <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a> rather than the <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a>.\r
</p>\r
<p>\r
  You normally will <i>not</i> want to have the "PanelExpanderButton" inside the panel that will be collapsed.\r
</p>\r
<p>\r
  The example below has two independently collapsible sections in each node.\r
  The second button is customized: passing extra properties to <a href="../api/symbols/GraphObject.html#build" target="api">GraphObject.build</a>'s configuration\r
  changes the icon by setting <code>_buttonExpandedFigure</code> and <code>_buttonCollapsedFigure</code>\r
  to different <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a> values (here a minus and a plus), and gives the button\r
  a visible circular border by setting properties on its named <code>"ButtonBorder"</code> Shape.\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
\r
<h2 id="ContextMenuButtons"><a class="not-prose heading-anchor" href="#ContextMenuButtons">ContextMenuButtons and ContextMenus</a></h2>\r
<p>\r
  Although you can implement context menus in any way you choose, it is common to use the predefined\r
  "ContextMenuButton".\r
</p>\r
\r
<p>\r
  A "ContextMenuButton" is just a "Button" with a few properties set.\r
  One of those properties is <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a>, which is set to\r
  <code>go.Stretch.Horizontal</code> so that all of the "ContextMenuButton"s\r
  in a "ContextMenu" will be stretch to the same width.\r
  But you can set all of the usual properties on both its "ButtonBorder" Shape\r
  as well as on the button itself.\r
</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  For an example of defining context menus using HTML, see the <a href="../samples/customContextMenu">Custom\r
    ContextMenu sample</a>.\r
</p>\r
\r
<p>\r
  See also the fancier round context menu implemented in\r
  <a href="../samples/radialAdornment">Radial Context Menu</a>.\r
</p>\r
\r
<h2 id="CheckBoxButtons"><a class="not-prose heading-anchor" href="#CheckBoxButtons">CheckBoxButtons and CheckBoxes</a></h2>\r
<p>\r
  A "CheckBoxButton" is a "Button" that is configured to toggle the boolean value of a data property.\r
  By default the button is clear when the value is false and shows a check mark when the value is true,\r
  but a great deal of customization is possible.\r
</p>\r
<p>\r
  A "CheckBoxButton" is used in the definition of the "CheckBox" Panel, which is a convenient way to associate\r
  any GraphObject as a label for the "CheckBoxButton".\r
</p>\r
<p>\r
  The third argument to <a href="../api/symbols/GraphObject.html#build" target="api">GraphObject.build</a> when defining a "CheckBox" or "CheckBoxButton"\r
  should be a string that names the data property holding the checked state of the "CheckBoxButton".\r
  If you do not want clicking on the button to toggle the value of a data property,\r
  specify a data property name that is the empty string.\r
</p>\r
<p>\r
  In the example below, each menu item is a "CheckBox" bound to a boolean data property.\r
  The "CheckBox" updates its designated property when selected.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  Many examples of "CheckBox"es with various customizations are shown in the <a\r
    href="../samples/CheckBoxes">CheckBoxes</a> sample.\r
</p>\r
<p>\r
  You can find the definition of a "TriStateCheckBoxButton" in the <a\r
    href="../samples/triStateCheckBoxTree">Tri-State CheckBox Tree</a> sample.\r
</p>\r
\r
<h2 id="Toggles"><a class="not-prose heading-anchor" href="#Toggles">ToggleSwitches and Toggles</a></h2>\r
<p>\r
  A "ToggleSwitch" is a "Button" that is configured to toggle the boolean value of a data property.\r
  By default the button shows a circular Shape at either end of a "Capsule" Shape\r
  depending on the value of the boolean property, but a great deal of customization is possible.\r
</p>\r
<p>\r
  A "ToggleSwitch" is used in the definition of the "Toggle" Panel, which is a convenient way to associate\r
  any GraphObject as a label for the "ToggleSwitch".\r
</p>\r
<p>\r
  The third argument to <a href="../api/symbols/GraphObject.html#build" target="api">GraphObject.build</a> when defining a "Toggle" or "ToggleSwitch"\r
  should be a string that names the data property holding the checked state of the "ToggleSwitch".\r
  If you do not want clicking on the button to toggle the value of a data property,\r
  specify a data property name that is the empty string.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
<p>\r
  Many examples of "Toggle"s with various customization are shown in the\r
  <a href="../samples/Toggles">Toggles</a> sample.\r
</p>\r
\r
<h2 id="AutoRepeatButtons"><a class="not-prose heading-anchor" href="#AutoRepeatButtons">AutoRepeatButtons</a></h2>\r
<p>\r
  The "AutoRepeatButton" had been defined for many years in the definition of the "ScrollingTable" extension.\r
  It has now been moved into the main library to make it easier to use both in your code as well as in various extensions.\r
  You can see it in action in the <a href="../samples/ScrollingTable">ScrollingTable</a> sample.\r
</p>\r
\r
<h2 id="ButtonDefinitions"><a class="not-prose heading-anchor" href="#ButtonDefinitions">Button definitions</a></h2>\r
<p>\r
  The implementation of all predefined buttons is provided in <a href="../extensions/Buttons.js">Buttons.js</a>\r
  in the Extensions directory.\r
  You may wish to copy and adapt these definitions when creating your own buttons.\r
  You may also wish to theme your own buttons, described on the\r
  <a href="theming#BuilderObjects">theming learn page</a>.\r
</p>\r
<p>\r
  Note that the definitions of those buttons makes use of the <a href="../api/symbols/GraphObject.html#definebuilder" target="api">GraphObject.defineBuilder</a> static function.\r
  That extends the behavior of <a href="../api/symbols/GraphObject.html#build" target="api">GraphObject.build</a>\r
  to allow the creation of fairly complex visual trees by name with optional arguments.\r
  You can find the definitions of various kinds of builders in the samples and extensions, such as at:\r
<ul>\r
  <li><a href="../extensions/Buttons.js">Buttons.js</a>,\r
    showing the implementation of all of the built-in buttons.\r
  </li>\r
  <li><a href="../extensions/HyperlinkText.js">HyperlinkText.js</a>,\r
    implementing underlined text that calls <code>window.open</code>,\r
    used in the <a href="../samples/Hyperlink">Hyperlink</a> sample.\r
  </li>\r
  <li><a href="../extensions/ScrollingTable.js">ScrollingTable.js</a>,\r
    implementing a "ScrollingTable" Panel using two "AutoRepeatButtons",\r
    used in the <a href="../samples/ScrollingTable">ScrollingTable</a> sample.\r
  </li>\r
</ul>\r
</p>\r
`,codeBlocks:[{id:`button`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#efefef", strokeWidth: 3 }),\r
      new go.Panel("Vertical", { margin: 14 })\r
        .add(\r
          new go.TextBlock({ font: "bold 60pt Trebuchet MS" })\r
            .bind("text", "clickCount"),\r
          go.GraphObject.build("Button", {\r
            margin: new go.Margin(40,2,2,2),\r
            click: incrementCounter,\r
            "ButtonBorder.fill": "red",\r
            "ButtonBorder.stroke": "black",\r
            "_buttonFillOver": "#AA0000",\r
            "_buttonStrokeOver": "black",\r
          })\r
            .add(\r
              new go.TextBlock("Click Here", { stroke: "white", font: "20pt tahoma", margin: 5 })\r
            )\r
        )\r
    );\r
\r
function incrementCounter(e, obj) {\r
  const node = obj.part;\r
  const data = node.data;\r
  if (data && typeof(data.clickCount) === "number") {\r
    node.diagram.model.commit(m => m.set(data, "clickCount", data.clickCount + 1), "clicked");\r
  }\r
}\r
\r
diagram.model = new go.GraphLinksModel([ { clickCount: 0 } ]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`button2`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#efefef", strokeWidth: 2 }),\r
      new go.Panel("Vertical", { margin: 14 })\r
        .add(\r
          new go.TextBlock({ font: "bold 50pt Trebuchet MS" })\r
            .bind("text", "clickCount"),\r
          go.GraphObject.build("Button", { margin: 2,\r
            click: resetCounter,\r
            "ButtonBorder.fill": "#D94A4A", // Fill of the border Shape\r
            "ButtonBorder.stroke": "black", // Stroke color of the border Shape\r
            "ButtonBorder.strokeWidth": 2, // Stroke width of the border Shape\r
            "_buttonStrokeOver": "black", // Stroke color of the border Shape when hovered\r
            "_buttonFillOver": "#A84646", // Fill color of the border Shape when hovered\r
          })\r
            // You can enable and disabled buttons by binding the isEnabled parameter\r
            .bind("isEnabled", "clickCount", c => (c == 0)? false : true )\r
            .add(\r
              new go.TextBlock({ stroke: "white", font: "bold 13pt sans-serif", margin: 2 })\r
                .bind("text", "clickCount", c => (c == 0)? "Reset (Disabled)" : "Reset (Enabled)")\r
            ),\r
          new go.Panel("Horizontal")\r
            .add(\r
              go.GraphObject.build("Button", { margin: 3, width: 40, height: 40,\r
                click: (e, obj) => {incrementCounter(e, obj, -1)},\r
                "ButtonBorder.figure": "triangle", // Figure of the border Shape\r
                "ButtonBorder.stroke": "green", // Stroke color of the border Shape\r
                "_buttonStrokeOver": "green", // Stroke color of the border Shape when hovered\r
                "ButtonBorder.strokeWidth": 3, // Stroke width of the border Shape\r
                "ButtonBorder.fill": "#30BC32", // Fill of the border Shape\r
                "_buttonFillOver": "#1E8D20", // Fill color of the border Shape when hovered\r
              })\r
                .bind("isEnabled", "clickCount", c => (typeof(c) === "number")? true : false)\r
                .add(\r
                  new go.TextBlock("-", { stroke: "white", font: "bold 24pt Trebuchet MS",\r
                    margin: new go.Margin(7, 0, 0, 0)\r
                  })\r
                ),\r
              go.GraphObject.build("Button", { margin: 3,\r
                click: cat,\r
                "ButtonBorder.figure": "Rectangle" // Figure of the border Shape\r
              })\r
                .add(\r
                  // the button content can be anything -- it doesn't have to be a TextBlock\r
                  new go.Picture("images/50x40.png", { name: "PIC", width: 50, height: 40 })\r
                ),\r
              go.GraphObject.build("Button", { margin: 3, width: 40, height: 40,\r
                click: (e, obj) => {incrementCounter(e, obj, 1)},\r
                "ButtonBorder.figure": "circle", // Figure of the border Shape\r
                "ButtonBorder.fill": "#5775CF", // Fill of the border Shape\r
                "_buttonFillOver": "#3755AF", // Fill color of the border Shape when hovered\r
                "ButtonBorder.stroke": "blue", // Stroke color of the border Shape\r
                "_buttonStrokeOver": "blue", // Stroke color of the border Shape when hovered\r
                "ButtonBorder.strokeWidth": 3, // Stroke width of the border Shape\r
              })\r
                .bind("isEnabled", "clickCount", c => (typeof(c) === "number")? true : false)\r
                .add(\r
                  new go.TextBlock("+", { stroke: "white", font: "bold 24pt Trebuchet MS",\r
                    margin: new go.Margin(2, 1, 0, 0)\r
                  })\r
                )\r
            )\r
        )\r
    );\r
\r
function incrementCounter(e, obj, val) {\r
  const node = obj.part;\r
  const data = node.data;\r
  if (data && typeof(data.clickCount) === "number") {\r
    node.diagram.model.commit(m => m.set(data, "clickCount", data.clickCount + val), "clicked");\r
  }\r
}\r
function resetCounter(e, obj) {\r
  const node = obj.part;\r
  const data = node.data;\r
  node.diagram.model.commit(m => m.set(data, "clickCount", 0), "clicked");\r
}\r
function cat(e, obj) {\r
  const node = obj.part;\r
  const data = node.data;\r
  node.diagram.model.commit(m => m.set(data, "clickCount", "cat"), "clicked");\r
}\r
diagram.model = new go.GraphLinksModel([ { clickCount: 0 } ]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`treeExpanderButton`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot")\r
    .add(\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", {\r
            fill: "#4f8cff",\r
            strokeWidth: 1.5,\r
            width: 64,\r
            height: 48\r
          })\r
            .bind("fill", "color"),\r
          new go.TextBlock({ stroke: "white", margin: 6, font: "bold 13pt sans-serif" })\r
            .bind("text")\r
        ),\r
      go.GraphObject.build("TreeExpanderButton", {\r
        alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top,\r
        "ButtonBorder.stroke": "black",\r
        "ButtonIcon.stroke": "black",\r
        "ButtonIcon.strokeWidth": 1\r
      })\r
        // the figures shown when expanded/collapsed are bindable\r
        .bind("_treeExpandedFigure")\r
        .bind("_treeCollapsedFigure")\r
        .bind("ButtonIcon.fill", "color")\r
    );\r
\r
diagram.layout = new go.TreeLayout({ angle: 90, layerSpacing: 40, nodeSpacing: 24 });\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    // the root node uses the default "MinusLine"/"PlusLine" icons\r
    { key: 1, text: "Root", color: "#4f8cff" },\r
    // these two parents override the icons with custom figures\r
    { key: 2, text: "A", color: "#34c38f",\r
      _treeExpandedFigure: "TriangleUp",\r
      _treeCollapsedFigure: "TriangleDown"\r
    },\r
    { key: 3, text: "B", color: "#f1734f",\r
      _treeExpandedFigure: "Rectangle",\r
      _treeCollapsedFigure: "Circle"\r
    },\r
    { key: 4, text: "A1", color: "#34c38f" },\r
    { key: 5, text: "A2", color: "#34c38f" },\r
    { key: 6, text: "B1", color: "#f1734f" },\r
    { key: 7, text: "B2", color: "#f1734f" },\r
  ],\r
  [\r
    { from: 1, to: 2 },\r
    { from: 1, to: 3 },\r
    { from: 2, to: 4 },\r
    { from: 2, to: 5 },\r
    { from: 3, to: 6 },\r
    { from: 3, to: 7 },\r
  ]\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`subgraphExpanderButton`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { margin: 4 })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", parameter1: 6 }),\r
      new go.Panel("Horizontal", { margin: 5 })\r
        .add(\r
          new go.Shape("Circle", { width: 9, height: 9, margin: new go.Margin(0, 8, 1, 0) })\r
            .bind("fill", "color"),\r
          new go.TextBlock({ stroke: "#2f3440" })\r
            .bind("text")\r
        )\r
    );\r
\r
diagram.groupTemplate =\r
  new go.Group("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 1.5, fill: "#EDEDED" })\r
        .bind("stroke", "color"),\r
      new go.Panel("Vertical", { margin: 8, defaultAlignment: go.Spot.Left })\r
        .add(\r
          new go.Panel("Horizontal")\r
            .add(\r
              go.GraphObject.build("SubGraphExpanderButton", {\r
                margin: new go.Margin(0, 6, 2, 0),\r
                "ButtonBorder.fill": "white",\r
                "ButtonBorder.stroke": "black"\r
              })\r
                // the figures are bindable, so the second group can override them\r
                .bind("_subGraphExpandedFigure")\r
                .bind("_subGraphCollapsedFigure")\r
                .bind("ButtonIcon.fill", "color")\r
                .bind("ButtonIcon.stroke", "color"),\r
              new go.TextBlock({ font: "bold 12pt sans-serif", stroke: "#3a3f4b" })\r
                .bind("text")\r
                .bind("stroke", "color")\r
            ),\r
          new go.Placeholder({ padding: 4 })\r
        )\r
    );\r
\r
diagram.layout = new go.GridLayout({ wrappingColumn: 1 });\r
\r
diagram.model = new go.GraphLinksModel([\r
  // this group leaves the figures unset, so it uses the default minus/plus button\r
  { key: "GT", isGroup: true, text: "Green Team", color: "#2f8f5b" },\r
  // this group overrides the icons with custom figures\r
  { key: "PT", isGroup: true, text: "Purple Team", color: "#8a4fd0",\r
    _subGraphExpandedFigure: "TriangleUp", _subGraphCollapsedFigure: "TriangleDown" },\r
  { key: 1, group: "GT", text: "Employee 1", color: "#2f8f5b" },\r
  { key: 2, group: "GT", text: "Employee 2", color: "#2f8f5b" },\r
  { key: 3, group: "PT", text: "Employee 1", color: "#8a4fd0" },\r
  { key: 4, group: "PT", text: "Employee 2", color: "#8a4fd0" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`panelExpanderButton`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 200 })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "#bdbdbd"}),\r
      new go.Panel("Table", { margin: 8, stretch: go.Stretch.Horizontal })\r
        .addColumnDefinition(0, { stretch: go.Stretch.Horizontal })\r
        .add(\r
          new go.TextBlock({ columnSpan: 2, font: "bold 12pt sans-serif", stroke: "#1565c0" })\r
            .bind("text"),\r
          new go.TextBlock("Fruits", { row: 1, font: "bold 11pt sans-serif" }),\r
          new go.Shape({ row: 1, alignment: go.Spot.Bottom, height: 1, stroke: "#D74141" }),\r
          // PanelExpanderButton with default button figures\r
          go.GraphObject.build("PanelExpanderButton", { row: 1, column: 1 }, "FRUITS"),\r
          new go.Panel("Vertical", { name: "FRUITS", row: 2,\r
            margin: new go.Margin(2, 0, 8, 10),\r
            defaultAlignment: go.Spot.Left\r
          })\r
            .bind("itemArray", "fruits"),\r
          new go.TextBlock("Vegetables", { row: 3, font: "bold 11pt sans-serif" }),\r
          new go.Shape({ row: 3, alignment: go.Spot.Bottom, height: 1, stroke: "#4CDC69" }),\r
          // PanelExpanderButton with custom button figures\r
          go.GraphObject.build("PanelExpanderButton", { row: 3, column: 1,\r
            // use a minus icon when expanded and a plus icon when collapsed\r
            "_buttonExpandedFigure": "M0 0 M0 5 L10 5 M10 10",\r
            "_buttonCollapsedFigure": "M0 0 M5 1 L5 9 M1 5 L9 5 M10 10",\r
          }, "VEGGIES"),\r
          new go.Panel("Vertical", { name: "VEGGIES", row: 4,\r
            margin: new go.Margin(2, 0, 0, 10),\r
            defaultAlignment: go.Spot.Left\r
          })\r
            .bind("itemArray", "veggies")\r
        )\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: 1, text: "Produce Order: 34g1a",\r
    fruits: [ "Apple", "Banana", "Cherry" ],\r
    veggies: [ "Carrot", "Asparagus" ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`contextMenuButtons`,code:`diagram.nodeTemplate =\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Picture({ width: 60, height: 60, imageStretch: go.ImageStretch.Uniform })\r
        .bind("source", "icon"),\r
      new go.TextBlock({ name: "TITLE", margin: 2, wrap: go.Wrap.Fit })\r
        .bind("text")\r
    );\r
\r
diagram.nodeTemplate.contextMenu =\r
  go.GraphObject.build("ContextMenu", { padding: 2 })\r
    .add(\r
      makeMenuItem("✎", "Rename", (e, obj) => renameNode(obj)),\r
      makeMenuItem("⧉", "Copy", (e, obj) => e.diagram.commandHandler.copySelection()),\r
      makeMenuItem("⎘", "Paste", (e, obj) => e.diagram.commandHandler.pasteSelection()),\r
      new go.Shape("LineH",{ stretch: go.Stretch.Horizontal, height: 1, stroke: "#dadce0"}),\r
      makeMenuItem("✕", "Delete", (e, obj) => e.diagram.commandHandler.deleteSelection())\r
    );\r
// returns ContextMenuButtons for each option in the context menu\r
function makeMenuItem(icon, text, action) {\r
  const color = (text == "Delete") ? "#d33b2c" : "#202124";\r
  return go.GraphObject.build("ContextMenuButton", {\r
    click: action,\r
    "ButtonBorder.fill": "transparent",\r
    "ButtonBorder.stroke": null,\r
    "_buttonFillOver": (text == "Delete") ? "#fce8e6" : "#e8f0fe",\r
    "_buttonStrokeOver": null\r
  })\r
    .add(\r
      new go.Panel("Horizontal", { alignment: go.Spot.Left })\r
        .add(\r
          new go.TextBlock(icon, { width: 18, font: "13pt sans-serif", stroke: color }),\r
          new go.TextBlock(text, { margin: new go.Margin(0, 8), stroke: color })\r
        )\r
    );\r
}\r
\r
function renameNode(obj) {\r
  const node = obj.part.adornedPart;\r
  const tb = node.findObject("TITLE");\r
  if (tb !== null) node.diagram.commandHandler.editTextBlock(tb);\r
}\r
\r
diagram.model = new go.Model([\r
  { key: 1, text: "Notes.txt", icon: "../samples/images/document.svg" },\r
  { key: 2, text: "Photo.png", icon: "images/100x65.png" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`checkBoxButtons`,code:`const lineSettings = { stretch: go.Stretch.Horizontal, height: 1, margin: new go.Margin(7, 0) }\r
\r
function makeRow(prop, n, c) {\r
  return new go.Panel("Table", { stretch: go.Stretch.Horizontal, margin: new go.Margin(5, 0) })\r
    .add(\r
      new go.Panel("Horizontal")\r
        .add(\r
          // CheckBox button which toggles the boolean property\r
          go.GraphObject.build("CheckBox", { margin: new go.Margin(0, 10),\r
            "ButtonIcon.stroke": "#7a1f1f",\r
            "ButtonIcon.strokeWidth": 2.5,\r
            "ButtonBorder.fill": "#fffdf5",\r
            "ButtonBorder.stroke": "#c9b079"\r
          }, prop), // in this example the name of the boolean property is given by "prop"\r
          new go.TextBlock(n, { font: "12pt serif", stroke: "#3a2f22" })\r
        ),\r
      new go.Shape("LineH", { column: 1, height: 1, margin: 5, stroke: "#c9b079",\r
        stretch: go.Stretch.Horizontal, alignment: go.Spot.Bottom, strokeDashArray: [1.5, 3]\r
      }),\r
      new go.TextBlock("$" + c.toFixed(2), { column: 2, font: "12pt serif", stroke: "#7a6a4a" })\r
    );\r
}\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#f7efda", stroke: "#9c7a3c", strokeWidth: 3 }),\r
      new go.Panel("Auto", { margin: 5 })\r
        .add(\r
          new go.Shape("Rectangle", { fill: null, stroke: "#c9b079", strokeWidth: 1 }),\r
          new go.Panel("Vertical", { margin: new go.Margin(18, 22), width: 250 })\r
            .add(\r
              new go.TextBlock("✦   ✦   ✦", { font: "9pt serif", stroke: "#b9a36a" }),\r
              new go.TextBlock("Pizzeria", { font: "italic 22pt serif", stroke: "#3a2f22" }),\r
              new go.TextBlock("-Build Your Own-", { font: "11pt serif", stroke: "#9c7a3c" }),\r
              new go.Shape("LineH", { strokeWidth: 2, stroke: "#9c7a3c", ...lineSettings }),\r
              makeRow("mushroom", "Wild Mushroom", 3.00),\r
              makeRow("olive", "Kalamata Olive", 2.50),\r
              makeRow("pepper", "Roasted Pepper", 2.50),\r
              makeRow("basil", "Fresh Basil", 2.00),\r
              makeRow("prosciutto", "Prosciutto", 4.50),\r
              new go.Shape("LineH", { strokeWidth: 2, stroke: "#9c7a3c", ...lineSettings }),\r
              new go.TextBlock({ font: "bold 13pt serif", stroke: "#7a1f1f" })\r
                .bind("text", "", (d) => {\r
                  let total = (d.mushroom + d.olive + d.pepper + d.basil + d.prosciutto);\r
                  return total + ((total === 1)? " topping" : " toppings");\r
                })\r
            )\r
        )\r
    );\r
\r
diagram.model = new go.Model([\r
    { key: 1, mushroom: true, olive: false, pepper: true, basil: false, prosciutto: false }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`toggleSwitches`,code:`function makeChannel(label, color) {\r
  return new go.Panel("Vertical", { margin: new go.Margin(0, 9) })\r
    .add(\r
      new go.Shape({ width: 18, height: 8, strokeWidth: 0})\r
        .bind("fill", label, (b) => b ? color : "#1f2937"),\r
      // ToggleSwitch\r
      go.GraphObject.build("ToggleSwitch", { margin: new go.Margin(10, 0),\r
        "_buttonFillOff": "#374151",\r
        "_buttonFillOn": color\r
      },\r
        label, // supplies the name of the data property to toggle\r
        true // turns the ToggleSwitch vertical\r
      ),\r
      new go.TextBlock(label, { font: "bold 7pt sans-serif", stroke: "#9ca3af" })\r
    );\r
}\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#0b1220", strokeWidth: 0, parameter1: 12 }),\r
      new go.Panel("Vertical", { margin: 16 })\r
        .add(\r
          new go.TextBlock("MIXER", { stroke: "white", margin: 8, alignment: go.Spot.Left }),\r
          new go.Panel("Horizontal")\r
            .add(\r
              makeChannel("kick", "#f43f5e"),\r
              makeChannel("snare", "#f59e0b"),\r
              makeChannel("bass", "#22c55e" ),\r
              makeChannel("synth", "#3b82f6" ),\r
              makeChannel("vox", "#a855f7")\r
            )\r
        )\r
    );\r
\r
diagram.model = new go.Model([\r
    { key: 1, kick: true, snare: false, bass: true, synth: false, vox: true }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`ggwiwv`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};