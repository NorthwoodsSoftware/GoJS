import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`HTML interaction`},htmlContent:`<h1>HTML interaction</h1>\r
\r
<p>\r
  This page explains how to use GoJS Diagrams alongside other HTML elements in a webapp.\r
</p>\r
\r
<p>\r
  For custom Text Editors, Context Menus, and ToolTips invoked or hidden via GoJS tool operations, see the section on <a href="#HTMLInfo">HTMLInfo</a>.\r
</p>\r
\r
<h2 id="UsingHTMLAlongsideGoJS"><a class="not-prose heading-anchor" href="#UsingHTMLAlongsideGoJS">Using HTML alongside GoJS</a></h2>\r
\r
<h3 id="EditingPartsWithHTMLDataInspector"><a class="not-prose heading-anchor" href="#EditingPartsWithHTMLDataInspector">Editing Parts with the HTML data Inspector</a></h3>\r
\r
<p>\r
  Generally, GoJS can interact with the rest of the page via JavaScript that programmatically moves and modifies GoJS objects and the Diagram. If you have not\r
  read about programmatically interacting with Parts and the Model, there is a\r
  <a href="graphObject">GraphObject Manipulation tutorial</a> for this purpose.\r
</p>\r
\r
<p>\r
  To help programmers get started with HTML controls we have implemented a simple <a href="../samples/DataInspector">Data Inspector Extension</a>, an\r
  HTML-based property editor that displays and allows editing of data for the selected Part.\r
</p>\r
\r
<p>\r
  The Data Inspector chiefly works via a <code>"ChangedSelection"</code> <a href="events">Diagram Listener</a>. When triggered, it populates HTML Fields.\r
  Editing those fields and clicking away then update the selected Part by calling <code>diagram.model.setDataProperty</code> to update the model.\r
</p>\r
\r
<h3 id="HTMLFocusOnDiagrams"><a class="not-prose heading-anchor" href="#HTMLFocusOnDiagrams">HTML Focus on Diagrams</a></h3>\r
\r
<p>\r
  When a browser element gets focus, some browsers scroll that element into view. Because this behavior may be unwelcome in some web apps,\r
  <a href="../api/symbols/Diagram.html#scrollspageonfocus" target="api">Diagram.scrollsPageOnFocus</a> defaults to <code>false</code>. To get the default browser behavior, set this to <code>true</code>.\r
</p>\r
\r
<p>\r
  Additionally, browsers may outline selected elements. This is from CSS, not GoJS, and can be removed by removing the CSS outline from all\r
  HTML elements inside the Diagram div:\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="HTMLInfoClass"><a class="not-prose heading-anchor" href="#HTMLInfoClass">The HTMLInfo class</a></h2>\r
<p>\r
  The <a href="../api/symbols/HTMLInfo.html" target="api">HTMLInfo</a> class allows certain GoJS elements to be replaced by HTML elements.\r
  This is done by setting any of the following properties to an instance of <code>HTMLInfo</code>:\r
</p>\r
\r
<ul>\r
  <li><a href="../api/symbols/TextEditingTool.html#defaulttexteditor" target="api">TextEditingTool.defaultTextEditor</a></li>\r
  <li><a href="../api/symbols/TextBlock.html#texteditor" target="api">TextBlock.textEditor</a></li>\r
  <li><a href="../api/symbols/GraphObject.html#contextmenu" target="api">GraphObject.contextMenu</a></li>\r
  <li><a href="../api/symbols/Diagram.html#contextmenu" target="api">Diagram.contextMenu</a></li>\r
  <li><a href="../api/symbols/GraphObject.html#tooltip" target="api">GraphObject.toolTip</a></li>\r
  <li><a href="../api/symbols/Diagram.html#tooltip" target="api">Diagram.toolTip</a></li>\r
</ul>\r
\r
<h3 id="Usage"><a class="not-prose heading-anchor" href="#Usage">Usage</a></h3>\r
\r
<p>\r
  When replacing GoJS elements with custom HTML elements, the main concerns are when to show and hide the custom element and the positioning of the element.\r
  GoJS does not handle this automatically; <code>HTMLInfo</code> requires two functions to be provided:\r
</p>\r
\r
<ul>\r
  <li><a href="../api/symbols/HTMLInfo.html#show" target="api">HTMLInfo.show</a>, called by GoJS when custom HTML content should be displayed, such as when activating a ToolTip, ContextMenuTool, or\r
    TextEditingTool.\r
  </li>\r
  <li><a href="../api/symbols/HTMLInfo.html#hide" target="api">HTMLInfo.hide</a>, called by GoJS when the custom HTML content should be hidden, such as when cancelling tool usages.</li>\r
</ul>\r
\r
<p>\r
  In lieu of setting <a href="../api/symbols/HTMLInfo.html#hide" target="api">HTMLInfo.hide</a>, you can set the <a href="../api/symbols/HTMLInfo.html#mainelement" target="api">HTMLInfo.mainElement</a> property to the primary HTML Element that you are showing/hiding, and\r
  HTMLInfo will automatically hide the provided element by setting <code>mainElement.style.display</code> to <code>"none"</code>.\r
</p>\r
\r
<p>\r
  For positioning your element, a simple strategy is to programatically select\r
  the element and set its position according to <a href="../api/symbols/Diagram.html#lastinput" target="api">Diagram.lastInput</a>'s <a href="../api/symbols/InputEvent.html#viewpoint" target="api">InputEvent.viewPoint</a>, which can be seen in the examples below.\r
</p>\r
\r
<h3 id="HTMLInfoSamples"><a class="not-prose heading-anchor" href="#HTMLInfoSamples">HTMLInfo samples</a></h3>\r
\r
<ul>\r
  <li>Tooltips</li>\r
  <ul>\r
    <li><a href="../samples/dataVisualization">Data Visualization Tooltip</a></li>\r
  </ul>\r
\r
  <li>Context Menus</li>\r
  <ul>\r
    <li><a href="../samples/customContextMenu">HTML List Context Menu</a></li>\r
    <li><a href="../samples/htmlLightBoxContextMenu">HTML Lightbox Context Menu</a></li>\r
  </ul>\r
\r
  <li>Text Editors</li>\r
  <ul>\r
    <li><a href="../samples/customTextEditingTool">HTML Select Text Editor</a></li>\r
    <li><a href="../samples/TextEditor">HTML Text Editor</a></li>\r
  </ul>\r
</ul>\r
\r
<h3 id="Tooltips"><a class="not-prose heading-anchor" href="#Tooltips">Tooltips</a></h3>\r
\r
<p>\r
  For tooltips, if a <a href="../api/symbols/GraphObject.html#tooltip" target="api">GraphObject.toolTip</a> or <a href="../api/symbols/Diagram.html#tooltip" target="api">Diagram.toolTip</a> is set to an instance of <code>HTMLInfo</code>, GoJS calls\r
  <code>HTMLInfo.show</code> in <a href="../api/symbols/ToolManager.html#showtooltip" target="api">ToolManager.showToolTip</a>. After the tooltip delay, GoJS will call <code>HTMLInfo.hide</code> in\r
  <a href="../api/symbols/ToolManager.html#hidetooltip" target="api">ToolManager.hideToolTip</a>.\r
</p>\r
\r
<p>\r
  What follows is an example using <code>HTMLInfo.show</code> and <code>HTMLInfo.hide</code>, but the <code>HTMLInfo.hide</code> is simple enough that setting\r
  the <code>HTMLInfo.mainElement</code> to the tooltip div instead would be sufficient.\r
</p>\r
\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<h3 id="ContextMenus"><a class="not-prose heading-anchor" href="#ContextMenus">Context Menus</a></h3>\r
\r
<p>\r
  For context menus, <a href="../api/symbols/ContextMenuTool.html#showcontextmenu" target="api">ContextMenuTool.showContextMenu</a> will call <code>HTMLInfo.show</code>. <a href="../api/symbols/ContextMenuTool.html#hidecontextmenu" target="api">ContextMenuTool.hideContextMenu</a> will call\r
  <code>HTMLInfo.hide</code>.\r
</p>\r
\r
<p>\r
  This example adds a button by setting a container div's <code>innerHTML</code>, selecting the button with <code>document.getElementById</code>,\r
  and adding an <code>onClick</code> closure that will call the event handler on click. The container div is defined as:\r
</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  In this example, the Context Menu on a Node uses a <code>button</code> element, and so receives the same styling as defined in the site's CSS.\r
  In this case, it creates an odd look, but for other purposes, such as matching your app's existing buttons, this can be quite convenient.\r
</p>\r
\r
<h3 id="TextEditors"><a class="not-prose heading-anchor" href="#TextEditors">Text Editors</a></h3>\r
\r
<p>\r
  For custom text editors, <a href="../api/symbols/TextEditingTool.html#doactivate" target="api">TextEditingTool.doActivate</a> will call <code>HTMLInfo.show</code>. <a href="../api/symbols/TextEditingTool.html#dodeactivate" target="api">TextEditingTool.doDeactivate</a> will call\r
  <code>HTMLInfo.hide</code>.\r
</p>\r
\r
<p>\r
  HTMLInfos used as text editors must also define a <a href="../api/symbols/HTMLInfo.html#valuefunction" target="api">HTMLInfo.valueFunction</a>. When <a href="../api/symbols/TextEditingTool.html#accepttext" target="api">TextEditingTool.acceptText</a> is called, GoJS will call\r
  <code>HTMLInfo.valueFunction</code> and use the return value as the value for the TextEditingTool completion.\r
</p>\r
\r
<p>\r
  The example below constructs an HTMLInfo that uses <code>HTMLInfo.show</code> and <code>HTMLInfo.hide</code> to dynamically add, populate, and remove HTML\r
  elements from the page. This example does not need extra divs to be declared like the previous two examples.\r
</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
`,codeBlocks:[{id:null,code:`/* affect all elements inside myDiagramDiv */\r
#myDiagramDiv * {\r
  outline: none;\r
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */\r
}`,isExecutable:!1,language:`css`,initiallyVisible:!0},{id:null,code:`<!-- this must be added as a sibling of the Diagram -->\r
<div id="toolTipDiv" style="position: absolute; background: white; color: black; z-index: 1000; display: none;">\r
  <p id="toolTipParagraph">Tooltip</p>\r
</div>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:`toolTipExample`,code:`function showToolTip(obj, diagram, tool) {\r
  const toolTipDiv = document.getElementById('toolTipDiv');\r
  const pt = diagram.lastInput.viewPoint;\r
  toolTipDiv.style.left = (pt.x + 10) + "px";\r
  toolTipDiv.style.top = (pt.y + 10) + "px";\r
  document.getElementById('toolTipParagraph').textContent = "Tooltip for: " + obj.data.text;\r
  toolTipDiv.style.display = "block";\r
}\r
\r
function hideToolTip(diagram, tool) {\r
  const toolTipDiv = document.getElementById('toolTipDiv');\r
  toolTipDiv.style.display = "none";\r
}\r
\r
const myToolTip = new go.HTMLInfo({\r
  show: showToolTip,\r
  hide: hideToolTip\r
  /*\r
    since hideToolTip is very simple,\r
    we could have set mainElement instead of setting hide:\r
  mainElement: document.getElementById('toolTipDiv')\r
  */\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { toolTip: myToolTip })\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0})\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
[\r
  { text: "Alpha", color: "lightblue" },\r
  { text: "Beta", color: "orange" },\r
  { text: "Gamma", color: "lightgreen" },\r
  { text: "Delta", color: "pink" }\r
]);`,isExecutable:!0,animation:!1,html:`<div id="diagramParent" style="position: relative">
  <div id="toolTipDiv" style="position: absolute; background: white; color: black; z-index: 1000; display: none">
    <p id="toolTipParagraph">Tooltip</p>
  </div>
</div>`,language:`js`,initiallyVisible:!0},{id:null,code:`<!-- this must be added as a sibling of the Diagram -->\r
<div id="contextMenuDiv" style="position: absolute; background: white; color: black; z-index: 1000; display: none;">\r
</div>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:`contextMenuExample`,code:`// Create HTMLInfo\r
const myContextMenu = new go.HTMLInfo({\r
  show: showContextMenu,\r
  // No \`hide\` since we are specifying mainElement\r
  mainElement: document.getElementById('contextMenuDiv')\r
});\r
// Assign to Diagram (also assign to nodeTemplate later on)\r
diagram.contextMenu = myContextMenu;\r
\r
const contextMenuDiv = document.getElementById("contextMenuDiv")\r
function showContextMenu(obj, diagram, tool) {\r
  // Position and show the context menu HTML element:\r
  const pt = diagram.lastInput.viewPoint;\r
  contextMenuDiv.style.left = pt.x + "px";\r
  contextMenuDiv.style.top = pt.y + "px";\r
  contextMenuDiv.style.display = "block";\r
\r
  // Also show relevant buttons given the current state\r
  if (obj) {\r
    contextMenuDiv.innerHTML = '<button id="deleteBtn">Delete</button>';\r
    const btn = document.getElementById('deleteBtn');\r
    btn.onclick = () => deleteClick(obj, diagram);\r
  }\r
\r
  // If GraphObject \`obj\` is null, the context menu is for the whole Diagram\r
  if (obj === null) {\r
    contextMenuDiv.innerHTML = '<p>No Action Available</p>'\r
  }\r
}\r
\r
function deleteClick(obj, diagram) {\r
  // Do some action when a context menu button is clicked\r
  diagram.commit(d => d.remove(obj.part ?? obj), "delete");\r
\r
  // Then:\r
  diagram.currentTool.stopTool();\r
}\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { contextMenu: myContextMenu })\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0})\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
[\r
  { text: "Alpha", color: "lightblue" },\r
  { text: "Beta", color: "orange" },\r
  { text: "Gamma", color: "lightgreen" },\r
  { text: "Delta", color: "pink" }\r
]);`,isExecutable:!0,animation:!1,html:`
  <div id="diagramParent" style="position: relative">
    <div id="contextMenuDiv" style="position: absolute; background: white; color: black; z-index: 1000; display: none"></div>
  </div>
`,language:`js`,initiallyVisible:!0},{id:`textEditorExample`,code:`// Create an HTMLInfo and dynamically create some HTML to show/hide\r
const myTextEditor = new go.HTMLInfo();\r
const mySelectBox = document.createElement("select");\r
\r
myTextEditor.show = (textBlock, diagram, tool) => {\r
  if (!(textBlock instanceof go.TextBlock)) return;\r
  // Populate the select box:\r
  mySelectBox.innerHTML = "";\r
\r
  // this sample assumes textBlock.choices is not null\r
  const list = textBlock.choices;\r
  for (let i = 0; i < list.length; i++) {\r
    const op = document.createElement("option");\r
    op.text = list[i];\r
    op.value = list[i];\r
    mySelectBox.add(op, null);\r
  }\r
\r
  // After the list is populated, set the value:\r
  mySelectBox.value = textBlock.text;\r
\r
  // Do a few different things when a user presses a key\r
  mySelectBox.addEventListener("keydown", e => {\r
    if (e.isComposing) return;\r
    const key = e.key;\r
    if (key === "Enter") { // Accept on Enter\r
      tool.acceptText(go.TextEditingAccept.Enter);\r
      return;\r
    } else if (key === "Tab") { // Accept on Tab\r
      tool.acceptText(go.TextEditingAccept.Tab);\r
      e.preventDefault();\r
      return false;\r
    } else if (key === "Escape") { // Cancel on Esc\r
      tool.doCancel();\r
      if (tool.diagram) tool.diagram.focus();\r
    }\r
  }, false);\r
\r
  const loc = textBlock.getDocumentPoint(go.Spot.TopLeft);\r
  const pos = diagram.transformDocToView(loc);\r
  mySelectBox.style.left = pos.x + "px";\r
  mySelectBox.style.top  = pos.y + "px";\r
  mySelectBox.style.position = 'absolute';\r
  mySelectBox.style.zIndex = 100; // place it in front of the Diagram\r
\r
  diagram.div.appendChild(mySelectBox);\r
  mySelectBox.focus();\r
}\r
\r
myTextEditor.hide = (diagram, tool) => {\r
  diagram.div.removeChild(mySelectBox);\r
}\r
\r
// This is necessary for HTMLInfo instances that are used as text editors\r
myTextEditor.valueFunction = () => mySelectBox.value;\r
\r
// Set the HTMLInfo:\r
diagram.toolManager.textEditingTool.defaultTextEditor = myTextEditor;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
          editable: true,\r
          margin: 8,\r
          choices: ['Alpha', 'Beta', 'Gamma', 'Delta']\r
        })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
[\r
  { text: "Alpha", color: "lightblue" },\r
  { text: "Beta",  color: "orange" },\r
  { text: "Gamma", color: "lightgreen" },\r
  { text: "Delta", color: "pink" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`12n9uwh`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};