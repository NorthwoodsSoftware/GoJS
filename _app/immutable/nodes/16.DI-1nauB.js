import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Commands`},htmlContent:`<h1>Commands</h1>\r
<p>\r
Commands such as <b>Delete</b> or <b>Paste</b> or <b>Undo</b> are implemented by the <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> class.\r
</p>\r
<p>\r
Keyboard events, like mouse and touch events, always go to the <a href="../api/symbols/Diagram.html#currenttool" target="api">Diagram.currentTool</a>.\r
The current tool, when the user is not performing some gesture, is the same as the <a href="../api/symbols/Diagram.html#defaulttool" target="api">Diagram.defaultTool</a>,\r
which normally is the <a href="../api/symbols/Diagram.html#toolmanager" target="api">Diagram.toolManager</a>.\r
The <a href="../api/symbols/ToolManager.html" target="api">ToolManager</a> handles keyboard events by delegating them to the <a href="../api/symbols/Diagram.html#commandhandler" target="api">Diagram.commandHandler</a>.\r
</p>\r
<p>\r
Basically, the diagram handles a keyboard event, creates an <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a> describing it,\r
and then calls <a href="../api/symbols/ToolManager.html#dokeydown" target="api">ToolManager.doKeyDown</a>.  That in turn just calls <a href="../api/symbols/CommandHandler.html#dokeydown" target="api">CommandHandler.doKeyDown</a>.\r
The same sequence happens for key-up events.\r
</p>\r
<p>\r
Please note that the handling of keyboard commands depends on the diagram getting focus and then getting keyboard events.\r
Do <b><i>not</i></b> apply any styling such as\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="KeyboardCommandBindings"><a class="not-prose heading-anchor" href="#KeyboardCommandBindings">Keyboard command bindings</a></h2>\r
<p>\r
The <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> implements the following commands for keyboard input.\r
</p>\r
<p>\r
  For all of these commands, you can freely interchange <kbd>Meta</kbd> (<kbd>⌘</kbd> on macOS) with <kbd>Ctrl</kbd>.\r
</p>\r
<table class="keytable">\r
  <thead>\r
    <tr>\r
      <th>Keys</th>\r
      <th>Effect</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td>\r
        <kbd>Del</kbd>\r
        <kbd>Backspace</kbd>\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#deleteselection" target="api">CommandHandler.deleteSelection</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + X</kbd>\r
        <kbd>Shift + Del</kbd>\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#cutselection" target="api">CommandHandler.cutSelection</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + C</kbd>\r
        <kbd>Ctrl + Insert</kbd>\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#copyselection" target="api">CommandHandler.copySelection</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + V</kbd>\r
        <kbd>Shift + Insert</kbd>\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#pasteselection" target="api">CommandHandler.pasteSelection</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Ctrl + A</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#selectall" target="api">CommandHandler.selectAll</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + Z</kbd>\r
        <kbd>Alt + Backspace</kbd>\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#undo" target="api">CommandHandler.undo</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + Y</kbd>\r
        <kbd>Ctrl + Shift + Z</kbd>\r
        <kbd>Alt + Shift + Backspace</kbd>\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#redo" target="api">CommandHandler.redo</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>↑</kbd>\r
        <kbd>↓</kbd>\r
        <kbd>←</kbd>\r
        <kbd>→</kbd>\r
      </td>\r
      <td>call <a href="../api/symbols/Diagram.html#scroll" target="api">Diagram.scroll</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>PgUp</kbd>\r
        <kbd>PgDn</kbd>\r
      </td>\r
      <td>call <a href="../api/symbols/Diagram.html#scroll" target="api">Diagram.scroll</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Home</kbd>\r
        <kbd>End</kbd>\r
      </td>\r
      <td>call <a href="../api/symbols/Diagram.html#scroll" target="api">Diagram.scroll</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Space</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#scrolltopart" target="api">CommandHandler.scrollToPart</a></td>\r
    </tr>\r
    <tr>\r
      <td class="align-center">\r
        <kbd>Ctrl + -</kbd>\r
        <kbd>Numpad-</kbd>\r
        (minus)\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#decreasezoom" target="api">CommandHandler.decreaseZoom</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + +</kbd>\r
        <kbd>Numpad+</kbd>\r
        (plus)\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#increasezoom" target="api">CommandHandler.increaseZoom</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Ctrl + 0</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#resetzoom" target="api">CommandHandler.resetZoom</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + Z</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#zoomtofit" target="api">CommandHandler.zoomToFit</a>; repeat to return to the original scale and position if <a href="../api/symbols/CommandHandler.html#iszoomtofitrestoreenabled" target="api">CommandHandler.isZoomToFitRestoreEnabled</a> is true</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Ctrl + G</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#groupselection" target="api">CommandHandler.groupSelection</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Ctrl + Shift + G</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#ungroupselection" target="api">CommandHandler.ungroupSelection</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>F2</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#edittextblock" target="api">CommandHandler.editTextBlock</a></td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Menu</kbd>\r
        <kbd>Shift + F10</kbd>\r
        <kbd>Ctrl + Shift + \\</kbd>\r
      </td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#showcontextmenu" target="api">CommandHandler.showContextMenu</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Escape</kbd></td>\r
      <td>invoke <a href="../api/symbols/CommandHandler.html#stopcommand" target="api">CommandHandler.stopCommand</a></td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Ctrl + Alt + Enter</kbd></td>\r
      <td>switch to <a href="accessibility">keyboard control mode</a></td>\r
    </tr>\r
  </tbody>\r
</table>\r
<p>\r
For the keyboard command bindings when in keyboard control mode, see\r
<a href="accessibility#KeyboardCommandTable">Keyboard commands</a>.\r
</p>\r
<p>\r
At the current time there are no keyboard bindings for commands such as <a href="../api/symbols/CommandHandler.html#collapsesubgraph" target="api">CommandHandler.collapseSubGraph</a>,\r
<a href="../api/symbols/CommandHandler.html#collapsetree" target="api">CommandHandler.collapseTree</a>, <a href="../api/symbols/CommandHandler.html#expandsubgraph" target="api">CommandHandler.expandSubGraph</a>, or <a href="../api/symbols/CommandHandler.html#expandtree" target="api">CommandHandler.expandTree</a>.\r
Such Nodes or Groups usually have buttons such as "TreeExpanderButton" or "SubGraphExpanderButton" in them\r
or provide expand/collapse ability via other means.\r
</p>\r
<p>\r
If you want to have a different behavior for the arrow keys, consider using the sample class extended from <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>:\r
<a href="../extensions/DrawCommandHandler.js">DrawCommandHandler</a>, which implements options for having\r
the arrow keys move the selection or change the selection.\r
</p>\r
<p>\r
That DrawCommandHandler extension also demonstrates a customization of the <b>Copy</b> and <b>Paste</b> commands\r
to automatically shift the location of pasted copies.\r
</p>\r
\r
<h2 id="CommandHandler"><a class="not-prose heading-anchor" href="#CommandHandler">CommandHandler</a></h2>\r
<p>\r
The <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> class implements pairs of methods:\r
a method to execute a command and a predicate that is true when the command may be executed.\r
For example, for the <b>Copy</b> command, there is a <a href="../api/symbols/CommandHandler.html#copyselection" target="api">CommandHandler.copySelection</a> method\r
and a <a href="../api/symbols/CommandHandler.html#cancopyselection" target="api">CommandHandler.canCopySelection</a> method.\r
</p>\r
<p>\r
Keyboard event handling always calls the "can..." predicate first.\r
Only if that returns true does it actually call the method to execute the command.\r
</p>\r
\r
<h3 id="UpdatingCommandUI"><a class="not-prose heading-anchor" href="#UpdatingCommandUI">Updating command UI</a></h3>\r
<p>\r
It is common to have HTML elements outside of the diagram that invoke commands.\r
You can use the <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>'s "can..." predicates to enable or disable UI that would invoke the command.\r
</p>\r
<p>\r
  The following demo depicts a file system working on a C program. Add files with the input at the top and use\r
  the buttons to edit the diagram. Files can be grouped into directories by multiple-selecting them and pressing\r
  "Create Directory". Press <kbd>T</kbd> to collapse directories and drag from file border to border to draw links\r
  showing if a file <code>#includes</code> another.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
Each button is implemented in the following fashion:\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
Whenever the selection changes or whenever a transaction or undo or redo occurs,\r
the updateButtons function is called to update the <code>disabled</code> property of each of the buttons.\r
</p>\r
\r
<h3 id="custom-behavior"><a class="not-prose heading-anchor" href="#custom-behavior">Custom behavior</a></h3>\r
\r
<p>\r
There are a number of properties that you can set to affect the CommandHandler's standard behavior.\r
For example, if you want to allow the user to create a <a href="../api/symbols/Group.html" target="api">Group</a> of selected parts with the <a href="../api/symbols/CommandHandler.html#groupselection" target="api">CommandHandler.groupSelection</a>,\r
you will need to set <a href="../api/symbols/CommandHandler.html#archetypegroupdata" target="api">CommandHandler.archetypeGroupData</a> to the desired group node data object.\r
Use <kbd>Ctrl + G</kbd> to create groups and <kbd>Ctrl + Shift + G</kbd> to ungroup:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
That data object is copied and added to the model as the new group data object by <a href="../api/symbols/CommandHandler.html#groupselection" target="api">CommandHandler.groupSelection</a>.\r
</p>\r
\r
<p>\r
If you want to add your own keyboard bindings, you can override the <a href="../api/symbols/CommandHandler.html#dokeydown" target="api">CommandHandler.doKeyDown</a> method.\r
For example, to support using the <kbd>T</kbd> key to collapse or expand the currently selected <a href="../api/symbols/Group.html" target="api">Group</a>:\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
Do not forget to call the base method in order to handle all of the keys that your method does not handle.\r
</p>\r
<p>\r
Note that calling the base method involves getting the base class's prototype's method.\r
If the base method takes arguments, be sure to pass arguments to the call to the base method.\r
</p>\r
\r
<h2 id="Accessibility"><a class="not-prose heading-anchor" href="#Accessibility">Accessibility</a></h2>\r
<p>\r
Although much of the predefined functionality of the <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> is accessible\r
with keyboard commands or the default context menu, not all of it is,\r
and the functionality of the <a href="../api/symbols/Tool.html" target="api">Tool</a>s mostly depends on mouse or touch events.\r
Your users can use <a href="accessibility">keyboard control mode</a>\r
if they cannot use a mouse or finger or if they prefer to use a keyboard.\r
</p>\r
<p>\r
That mode also supports updating through screen readers.\r
Since for efficiency and flexibility reasons, GoJS is designed not to use regular HTML DOM elements,\r
making an app that is accessible to screen readers or other accessibility devices\r
is a matter of producing the appropriate application-specific information in an\r
HTML element and implementing a <a href="../api/symbols/CommandHandler.html#focuschanged" target="api">CommandHandler.focusChanged</a> event handler that updates that element.\r
Read more at <a href="accessibility#CustomizingforScreenReaders">Customizing for screen readers</a>.\r
</p>\r
\r
<h2 id="MoreCommandHandlerOverrideExamples"><a class="not-prose heading-anchor" href="#MoreCommandHandlerOverrideExamples">More CommandHandler override examples</a></h2>\r
\r
<p>\r
Stop <kbd>Ctrl + Z</kbd>/<kbd>Ctrl + Y</kbd> from doing an undo/redo,\r
but still allow <a href="../api/symbols/CommandHandler.html#undo" target="api">CommandHandler.undo</a> and <a href="../api/symbols/CommandHandler.html#redo" target="api">CommandHandler.redo</a> to be called programmatically:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
Override <a href="../api/symbols/CommandHandler.html#copyselection" target="api">CommandHandler.copySelection</a> to prevent copying any selected <a href="../api/symbols/Group.html" target="api">Group</a>s\r
so users cannot duplicate whole groups but can still copy individual nodes:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
`,codeBlocks:[{id:null,code:`canvas:focus { display: none; } /* DO NOT DO THIS! */`,isExecutable:!1,language:`css`,initiallyVisible:!0},{id:`commands`,code:`// enable or disable a particular button\r
function enable(name, ok) {\r
  const button = document.getElementById(name);\r
  if (button) button.disabled = !ok;\r
}\r
// enable or disable all command buttons\r
function updateButtons() {\r
  const cmd = diagram.commandHandler;\r
  enable("SelectAll", cmd.canSelectAll());\r
  enable("Cut", cmd.canCutSelection());\r
  enable("Copy", cmd.canCopySelection());\r
  enable("Paste", cmd.canPasteSelection());\r
  enable("Delete", cmd.canDeleteSelection());\r
  enable("Group", cmd.canGroupSelection());\r
  enable("Ungroup", cmd.canUngroupSelection());\r
  enable("Undo", cmd.canUndo());\r
  enable("Redo", cmd.canRedo());\r
}\r
// notice whenever the selection may have changed\r
diagram.addDiagramListener("ChangedSelection", e => updateButtons());\r
// notice when the Paste command may need to be reenabled\r
diagram.addDiagramListener("ClipboardChanged", e => updateButtons());\r
// notice whenever a transaction or undo/redo has occurred\r
diagram.addModelChangedListener(e => {\r
  if (e.isTransactionFinished) updateButtons();\r
});\r
// perform initial enablements after everything has settled down\r
setTimeout(updateButtons, 100);\r
// make the diagram accessible to button onclick handlers\r
window.myDiagram = diagram;\r
// calls updateButtons() due to Model Changed listener\r
\r
// Code for group collapse keybind, see section below\r
// must be a function, not an arrow =>\r
diagram.commandHandler.doKeyDown = function() {\r
  const e = this.diagram.lastInput;\r
  if (e.code === "KeyT") {  // could also check for e.control or e.shift\r
    if (this.canCollapseSubGraph()) {\r
      this.collapseSubGraph();\r
    } else if (this.canExpandSubGraph()) {\r
      this.expandSubGraph();\r
    }\r
  } else {\r
    // call base method with no arguments\r
    go.CommandHandler.prototype.doKeyDown.call(this);\r
  }\r
};\r
\r
// Allows the commandHandler to group nodes, see section below\r
diagram.commandHandler.archetypeGroupData =\r
  { key: "Group", isGroup: true, text: "new_dir/" };\r
diagram.undoManager.isEnabled = true;\r
\r
const phosphor = "#33ff66";\r
const phosphorDim = "#1a8033";\r
const screen = "#0a140a";\r
const mono = "13px 'Courier New', monospace";\r
diagram.div.style.backgroundColor = screen;\r
\r
// Node template for file node\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { margin: 2 })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      // Main panel\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("Rectangle",\r
            { fill: screen, stroke: null }),\r
          new go.Panel("Horizontal", { margin: new go.Margin(3, 8) })\r
            .add(\r
              new go.TextBlock("$ ",\r
                { font: mono, stroke: phosphorDim }),\r
              new go.TextBlock(\r
                { font: mono, stroke: phosphor })\r
                .bindTwoWay("text", "key")\r
            )\r
        ),\r
      // Visible border\r
      new go.Shape("Rectangle",\r
        { fill: null, stroke: phosphor, strokeWidth: 1,\r
          stretch: go.Stretch.Fill }),\r
      // Port\r
      new go.Shape("Rectangle",\r
        { fill: null, stroke: "transparent", strokeWidth: 8,\r
          stretch: go.Stretch.Fill,\r
          margin: new go.Margin(-4),\r
          portId: "",\r
          fromLinkable: true, toLinkable: true,\r
          fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,\r
          cursor: "pointer" })\r
    );\r
\r
// Link template for showing #includes\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 4 })\r
    .add(\r
      new go.Shape({ stroke: phosphorDim, strokeWidth: 1 }),\r
      new go.Shape({ toArrow: "OpenTriangle",\r
        stroke: phosphorDim, fill: null }),\r
      new go.TextBlock("#include",\r
        { segmentOffset: new go.Point(0, -8),\r
          font: "11px 'Courier New', monospace",\r
          stroke: phosphorDim,\r
          background: screen })\r
    );\r
\r
// Group template that represents a directory with an editable name label\r
diagram.groupTemplate =\r
  new go.Group("Vertical",\r
    // Allows ungrouping\r
    { ungroupable: true, background: "rgba(51,255,102,0.04)" })\r
    .add(\r
      new go.Panel("Horizontal",\r
        { alignment: go.Spot.Left, margin: new go.Margin(4, 8) })\r
        .add(\r
          new go.TextBlock(\r
            { font: "bold " + mono,\r
              stroke: phosphor,\r
              editable: true })\r
            .bindTwoWay("text"),\r
          new go.TextBlock(" (collapsed)",\r
            { font: "bold " + mono, stroke: phosphor })\r
            .bindObject("visible", "isSubGraphExpanded", e => !e)\r
        ),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("Rectangle",\r
            { fill: null, stroke: phosphor, strokeWidth: 1,\r
              strokeDashArray: [4, 3] }),\r
          new go.Placeholder({ padding: 10 })\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "main.c", loc: "0 0", group: "dir1" },\r
    { key: "utils.c", loc: "100 -50", group: "dir1" },\r
    { key: "parser.c", loc: "100 50", group: "dir1" },\r
    { key: "lexer.c", loc: "150 125", group: "dir1" },\r
    { key: "Makefile", loc: "50 175", group: "dir1" },\r
    { key: "README.md", loc: "150 175", group: "dir1" },\r
    { key: "dir1", isGroup: true, text: "my_project/" }\r
  ],\r
  [\r
    { from: "main.c", to: "utils.c" },\r
    { from: "main.c", to: "parser.c" },\r
    { from: "parser.c", to: "lexer.c" }\r
  ]\r
);\r
\r
addFile = () => {\r
  const input = document.getElementById("filename-input");\r
  if (!input || !input.value) return;\r
  const name = input.value;\r
  const isDupe = diagram.model.findNodeDataForKey(name);\r
  if (isDupe) {\r
    const dupeWarning = document.getElementById("dupe-warning");\r
    if (dupeWarning) dupeWarning.style.display = "";\r
    input.value = "";\r
    return;\r
  }\r
  diagram.model.addNodeData({ key: name, loc: "0 50" });\r
  const dupeWarning = document.getElementById("dupe-warning");\r
  if (dupeWarning) dupeWarning.style.display = "none";\r
  input.value = "";\r
}`,isExecutable:!0,animation:!1,html:`
<div>
  <input placeholder="filename" id="filename-input"/>
  <button type="button" onclick="addFile()">Create File</button>
</div>
<span style="color: red; display: none;" id="dupe-warning">Filename already exists</span>
<div>
  <button id="SelectAll" type="button" onclick="myDiagram.commandHandler.selectAll()">Select All</button>
  <button id="Cut" type="button" onclick="myDiagram.commandHandler.cutSelection()">Cut</button>
  <button id="Copy" type="button" onclick="myDiagram.commandHandler.copySelection()">Copy</button>
  <button id="Paste" type="button" onclick="myDiagram.commandHandler.pasteSelection()">Paste</button>
  <button id="Delete" type="button" onclick="myDiagram.commandHandler.deleteSelection()">Delete</button>
  <button id="Undo" type="button" onclick="myDiagram.commandHandler.undo()">Undo</button>
  <button id="Redo" type="button" onclick="myDiagram.commandHandler.redo()">Redo</button>
  <button id="Group" type="button" onclick="myDiagram.commandHandler.groupSelection()">Create Directory</button>
  <button id="Ungroup" type="button" onclick="myDiagram.commandHandler.ungroupSelection()">Flatten Directory</button>
</div>
`,minHeight:500,language:`js`,initiallyVisible:!0},{id:null,code:`<button id="SelectAll" type="button"\r
        onclick="myDiagram.commandHandler.selectAll()">Select All</button>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:`groupSelection`,code:`// Allows the commandHandler to group nodes, gives group node data\r
diagram.commandHandler.archetypeGroupData =\r
  { key: "Group", isGroup: true, text: "new_dir/" };\r
diagram.undoManager.isEnabled = true;\r
\r
const phosphor = "#33ff66";\r
const phosphorDim = "#1a8033";\r
const screen = "#0a140a";\r
const mono = "13px 'Courier New', monospace";\r
diagram.div.style.backgroundColor = screen;\r
diagram.scale = 1.3;\r
\r
// Node template for file node\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { margin: 2 })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape("Rectangle",\r
        { fill: screen, stroke: phosphor, strokeWidth: 1 }),\r
      new go.Panel("Horizontal", { margin: new go.Margin(3, 8) })\r
        .add(\r
          new go.TextBlock("$ ",\r
            { font: mono, stroke: phosphorDim }),\r
          new go.TextBlock(\r
            { font: mono, stroke: phosphor })\r
            .bindTwoWay("text", "key")\r
        )\r
    );\r
\r
// Group template that represents a directory with an editable name label\r
diagram.groupTemplate =\r
  new go.Group("Vertical",\r
    // Allows ungrouping\r
    { ungroupable: true, background: "rgba(51,255,102,0.04)" })\r
    .add(\r
      new go.Panel("Horizontal",\r
        { alignment: go.Spot.Left, margin: new go.Margin(4, 8) })\r
        .add(\r
          new go.TextBlock(\r
            { font: "bold " + mono,\r
              stroke: phosphor,\r
              editable: true })\r
            .bindTwoWay("text"),\r
          new go.TextBlock(" (collapsed)",\r
            { font: "bold " + mono, stroke: phosphor })\r
            .bindObject("visible", "isSubGraphExpanded", e => !e)\r
        ),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("Rectangle",\r
            { fill: null, stroke: phosphor, strokeWidth: 1,\r
              strokeDashArray: [4, 3] }),\r
          new go.Placeholder({ padding: 10 })\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "dir1", isGroup: true, text: "ex_group/" },\r
    { key: "file1.c", loc: "0 0", group: "dir1" },\r
    { key: "file2.c", loc: "150 0", group: "dir1" },\r
    { key: "file3.c", loc: "0 100" },\r
    { key: "file4.c", loc: "150 100" }\r
  ]\r
);`,isExecutable:!0,animation:!1,highlight:[2,3],language:`js`,initiallyVisible:!0},{id:`keyDown`,code:`// must be a function, not an arrow =>\r
diagram.commandHandler.doKeyDown = function() {\r
  const e = this.diagram.lastInput;\r
  if (e.code === "KeyT") {  // could also check for e.control or e.shift\r
    if (this.canCollapseSubGraph()) {\r
      this.collapseSubGraph();\r
    } else if (this.canExpandSubGraph()) {\r
      this.expandSubGraph();\r
    }\r
  } else {\r
    // call base method with no arguments\r
    go.CommandHandler.prototype.doKeyDown.call(this);\r
  }\r
};\r
\r
const phosphor = "#33ff66";\r
const phosphorDim = "#1a8033";\r
const screen = "#0a140a";\r
const mono = "13px 'Courier New', monospace";\r
diagram.div.style.backgroundColor = screen;\r
diagram.scale = 1.3;\r
\r
// Node template for file node\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { margin: 2 })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape("Rectangle",\r
        { fill: screen, stroke: phosphor, strokeWidth: 1 }),\r
      new go.Panel("Horizontal", { margin: new go.Margin(3, 8) })\r
        .add(\r
          new go.TextBlock("$ ",\r
            { font: mono, stroke: phosphorDim }),\r
          new go.TextBlock(\r
            { font: mono, stroke: phosphor })\r
            .bindTwoWay("text", "key")\r
        )\r
    );\r
\r
// Link template for showing #includes\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 4 })\r
    .add(\r
      new go.Shape({ stroke: phosphorDim, strokeWidth: 1 }),\r
      new go.Shape({ toArrow: "OpenTriangle",\r
        stroke: phosphorDim, fill: null }),\r
      new go.TextBlock("#include",\r
        { segmentOffset: new go.Point(0, -8),\r
          font: "11px 'Courier New', monospace",\r
          stroke: phosphorDim,\r
          background: screen })\r
    );\r
\r
// Group template that represents a directory with an editable name label\r
diagram.groupTemplate =\r
  new go.Group("Vertical",\r
    { background: "rgba(51,255,102,0.04)" })\r
    .add(\r
      new go.Panel("Horizontal",\r
        { alignment: go.Spot.Left, margin: new go.Margin(4, 8) })\r
        .add(\r
          new go.TextBlock(\r
            { font: "bold " + mono,\r
              stroke: phosphor,\r
              editable: true })\r
            .bindTwoWay("text"),\r
          new go.TextBlock(" (collapsed)",\r
            { font: "bold " + mono, stroke: phosphor })\r
            .bindObject("visible", "isSubGraphExpanded", e => !e)\r
        ),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("Rectangle",\r
            { fill: null, stroke: phosphor, strokeWidth: 1,\r
              strokeDashArray: [4, 3] }),\r
          new go.Placeholder({ padding: 10 })\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "main.c", loc: "0 0", group: "dir1" },\r
    { key: "utils.c", loc: "100 -50", group: "dir1" },\r
    { key: "parser.c", loc: "100 50", group: "dir1" },\r
    { key: "dir1", isGroup: true, text: "my_project/" }\r
  ],\r
  [\r
    { from: "main.c", to: "utils.c" },\r
    { from: "main.c", to: "parser.c" }\r
  ]\r
);`,isExecutable:!0,animation:!1,highlight:[2],language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.commandHandler.doKeyDown = function() { // must be a function, not an arrow =>\r
  const e = this.diagram.lastInput;\r
  // The meta (Command) key substitutes for "control" for Mac commands\r
  const control = e.control || e.meta;\r
  const code = e.code;\r
  const key = e.key.toLowerCase();\r
  // Quit on any undo/redo key combination:\r
  if (control && (code === 'KeyZ' || key === 'z' || code === 'KeyY' || key === 'y')) return;\r
\r
  // call base method with no arguments (default functionality)\r
  go.CommandHandler.prototype.doKeyDown.call(this);\r
};`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.commandHandler.copySelection = function() { // must be a function, not an arrow =>\r
  // Quit if any selected part is a Group:\r
  const it = this.diagram.selection.iterator;\r
  while (it.next()) {\r
    if (it.value instanceof go.Group) return;\r
  }\r
\r
  // call base method with no arguments (default functionality)\r
  go.CommandHandler.prototype.copySelection.call(this);\r
};`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1maa5we`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};