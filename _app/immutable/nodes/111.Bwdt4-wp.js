import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Custom HTML Context Menu for Nodes and Diagram`,titleShort:`HTML Context Menu`,indexDescription:`Demonstrates the implementation of a custom HTML context menu.`,screenshot:`customcontextmenu`,priority:2,tags:[`contextmenus`,`html`],description:`Context menus implemented in HTML rather than as GoJS objects.`},htmlContent:`<div style="display: inline-block">\r
    <!-- We make a div to contain both the Diagram div and the context menu (such that they are siblings)\r
         so that absolute positioning works easily.\r
         This DIV containing both MUST have a non-static CSS position (we use position: relative)\r
         so that our context menu's absolute coordinates work correctly. -->\r
    <div style="position: relative">\r
      <div id="myDiagramDiv" style="border: solid 1px black; width: 400px; height: 400px"></div>\r
      <ul id="contextMenu" class="menu">\r
        <li id="cut" class="menu-item" onpointerdown="cxcommand(event)">Cut</li>\r
        <li id="copy" class="menu-item" onpointerdown="cxcommand(event)">Copy</li>\r
        <li id="paste" class="menu-item" onpointerdown="cxcommand(event)">Paste</li>\r
        <li id="delete" class="menu-item" onpointerdown="cxcommand(event)">Delete</li>\r
        <li id="color" class="menu-item">\r
          Color\r
          <ul class="menu">\r
            <li class="menu-item" style="background-color: #f38181" onpointerdown="cxcommand(event, 'color')">Red</li>\r
            <li class="menu-item" style="background-color: #eaffd0" onpointerdown="cxcommand(event, 'color')">Green</li>\r
            <li class="menu-item" style="background-color: #95e1d3" onpointerdown="cxcommand(event, 'color')">Blue</li>\r
            <li class="menu-item" style="background-color: #fce38a" onpointerdown="cxcommand(event, 'color')">Yellow</li>\r
          </ul>\r
        </li>\r
      </ul>\r
    </div>\r
\r
    \r
  </div>`,jsCode:`var myDiagram = null;\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // This is the actual HTML context menu:\r
    var cxElement = document.getElementById('contextMenu');\r
\r
    // an HTMLInfo object is needed to invoke the code to set up the HTML cxElement\r
    var myContextMenu = new go.HTMLInfo({\r
      show: showContextMenu,\r
      hide: hideContextMenu\r
    });\r
\r
    // define a simple Node template (but use the default Link template)\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { contextMenu: myContextMenu })\r
        .add(\r
          new go.Shape('RoundedRectangle')\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 3 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
        );\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: '#f38181' },\r
        { key: 2, text: 'Beta', color: '#eaffd0' },\r
        { key: 3, text: 'Gamma', color: '#95e1d3' },\r
        { key: 4, text: 'Delta', color: '#fce38a' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
\r
    myDiagram.contextMenu = myContextMenu;\r
\r
    // We don't want the div acting as a context menu to have a (browser) context menu!\r
    cxElement.addEventListener('contextmenu',\r
      e => {\r
        e.preventDefault();\r
        return false;\r
      },\r
      false\r
    );\r
\r
    function hideCX() {\r
      if (myDiagram.currentTool instanceof go.ContextMenuTool) {\r
        myDiagram.currentTool.doCancel();\r
      }\r
    }\r
\r
    function showContextMenu(obj, diagram, tool) {\r
      // Show only the relevant buttons given the current state.\r
      var cmd = diagram.commandHandler;\r
      var hasMenuItem = false;\r
      function maybeShowItem(elt, pred) {\r
        if (pred) {\r
          elt.style.display = 'block';\r
          hasMenuItem = true;\r
        } else {\r
          elt.style.display = 'none';\r
        }\r
      }\r
      maybeShowItem(document.getElementById('cut'), cmd.canCutSelection());\r
      maybeShowItem(document.getElementById('copy'), cmd.canCopySelection());\r
      maybeShowItem(document.getElementById('paste'), cmd.canPasteSelection(diagram.toolManager.contextMenuTool.mouseDownPoint));\r
      maybeShowItem(document.getElementById('delete'), cmd.canDeleteSelection());\r
      maybeShowItem(document.getElementById('color'), obj !== null);\r
\r
      // Now show the whole context menu element\r
      if (hasMenuItem) {\r
        cxElement.classList.add('show-menu');\r
        // we don't bother overriding positionContextMenu, we just do it here:\r
        var mousePt = diagram.lastInput.viewPoint;\r
        cxElement.style.left = mousePt.x + 5 + 'px';\r
        cxElement.style.top = mousePt.y + 'px';\r
      }\r
\r
      // Optional: Use a \`window\` pointerdown listener with event capture to\r
      //           remove the context menu if the user clicks elsewhere on the page\r
      window.addEventListener('pointerdown', hideCX, true);\r
    }\r
\r
    function hideContextMenu() {\r
      cxElement.classList.remove('show-menu');\r
      // Optional: Use a \`window\` pointerdown listener with event capture to\r
      //           remove the context menu if the user clicks elsewhere on the page\r
      window.removeEventListener('pointerdown', hideCX, true);\r
    }\r
  }\r
\r
  // This is the general menu command handler, parameterized by the name of the command.\r
  function cxcommand(event, val) {\r
    if (val === undefined) val = event.currentTarget.id;\r
    var diagram = myDiagram;\r
    switch (val) {\r
      case 'cut':\r
        diagram.commandHandler.cutSelection();\r
        break;\r
      case 'copy':\r
        diagram.commandHandler.copySelection();\r
        break;\r
      case 'paste':\r
        diagram.commandHandler.pasteSelection(diagram.toolManager.contextMenuTool.mouseDownPoint);\r
        break;\r
      case 'delete':\r
        diagram.commandHandler.deleteSelection();\r
        break;\r
      case 'color': {\r
        var color = window.getComputedStyle(event.target)['background-color'];\r
        changeColor(diagram, color);\r
        break;\r
      }\r
    }\r
    diagram.currentTool.stopTool();\r
  }\r
\r
  // A custom command, for changing the color of the selected node(s).\r
  function changeColor(diagram, color) {\r
    // Always make changes in a transaction, except when initializing the diagram.\r
    diagram.startTransaction('change color');\r
    diagram.selection.each(node => {\r
      if (node instanceof go.Node) {\r
        // ignore any selected Links and simple Parts\r
        // Examine and modify the data, not the Node directly.\r
        var data = node.data;\r
        // Call setDataProperty to support undo/redo as well as\r
        // automatically evaluating any relevant bindings.\r
        diagram.model.set(data, 'color', color);\r
      }\r
    });\r
    diagram.commitTransaction('change color');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* CSS for the traditional context menu */\r
  .menu {\r
    display: none;\r
    position: absolute;\r
    opacity: 0;\r
    margin: 0;\r
    padding: 8px 0;\r
    z-index: 999;\r
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\r
    list-style: none;\r
    background-color: #ffffff;\r
    border-radius: 4px;\r
  }\r
\r
  .menu-item {\r
    display: block;\r
    position: relative;\r
    min-width: 60px;\r
    margin: 0;\r
    padding: 6px 16px;\r
    font: bold 12px sans-serif;\r
    color: rgba(0, 0, 0, 0.87);\r
    cursor: pointer;\r
  }\r
\r
  .menu-item::before {\r
    position: absolute;\r
    top: 0;\r
    left: 0;\r
    opacity: 0;\r
    pointer-events: none;\r
    content: '';\r
    width: 100%;\r
    height: 100%;\r
    background-color: #000000;\r
  }\r
\r
  .menu-item:hover::before {\r
    opacity: 0.04;\r
  }\r
\r
  .menu .menu {\r
    top: -8px;\r
    left: 100%;\r
  }\r
\r
  .show-menu,\r
  .menu-item:hover > .menu {\r
    display: block;\r
    opacity: 1;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This demonstrates the implementation of a custom HTML context menu.</p>\r
      <p>For a light-box style HTML context menu implementation, see the <a href="htmlLightBoxContextMenu">LightBox Context Menu</a> sample.</p>\r
      <p>\r
        Right-click or tap-hold on a Node to bring up a context menu. If you have a selection copied in the clipboard, you can bring up a context menu anywhere\r
        to paste.\r
      </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`contextmenus`,`html`];var g=y();l(`u7gchm`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};