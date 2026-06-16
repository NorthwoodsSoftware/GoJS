import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Simulating Input using InputEvents`,indexDescription:`Demonstrates use of the Diagram methods to simulate mouse events.`,screenshot:`robot`,priority:2,tags:[`collections`,`contextmenus`,`palette`,`buttons`,`extensions`,`html`],description:`Test a diagram by simulating abstract input events.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myPaletteDiv" style="width: 80px; height: 300px; margin-right: 2px; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 300px; border: solid 1px black"></div>\r
  </div>\r
  Message: <span id="myStatus" style="color: green; font:bold 10pt sans-serif;">(none)</span>\r
  <p>\r
    Click these buttons in order from top to bottom:<br />\r
    <p>\r
      <button onclick="clickLambda()">Click Lambda</button><br />\r
      <button onclick="doubleClickLambda()">Double Click Lambda</button><br />\r
    </p>\r
    <p>\r
      <button onclick="dragFromPalette()">Drag From Palette</button><br />\r
      <button onclick="copyNode()">Copy Node</button><br />\r
      <button onclick="linkNodes()">Link Nodes</button><br />\r
      <button onclick="dragSelectNodes()">Drag Select Nodes</button><br />\r
      <button onclick="clickContextMenu()">Context Menu Click Alpha</button><br />\r
      <button onclick="deleteSelection()">Delete</button><br />\r
    </p>\r
    <button onclick="pan()">Pan the Diagram</button><br />\r
  </p>`,jsCode:`function init() {\r
\r
    function showProperties(e, obj) {\r
      // executed by ContextMenuButton\r
      var node = obj.part.adornedPart;\r
      var msg = 'Context clicked: ' + node.data.key + '. ';\r
      msg += 'Selection includes:';\r
      myDiagram.selection.each(part => {\r
        msg += ' ' + part.toString();\r
      });\r
      document.getElementById('myStatus').textContent = msg;\r
    }\r
\r
    function nodeClicked(e, obj) {\r
      // executed by click and doubleclick handlers\r
      var evt = e.copy();\r
      var node = obj.part;\r
      var type = evt.clickCount === 2 ? 'Double-Clicked: ' : 'Clicked: ';\r
      var msg = type + node.data.key + '. ';\r
      document.getElementById('myStatus').textContent = msg;\r
    }\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialContentAlignment: go.Spot.Top,\r
      "InitialLayoutCompleted": e => {\r
        document.getElementById('myStatus').textContent = 'Initial Layout Completed';\r
      },\r
      nodeTemplate:\r
        new go.Node('Auto', {\r
            click: nodeClicked,\r
            doubleClick: nodeClicked,\r
            contextMenu:\r
              go.GraphObject.build('ContextMenu')\r
                .add(\r
                  go.GraphObject.build('ContextMenuButton', {\r
                      click: showProperties\r
                    })\r
                    .add(new go.TextBlock('Properties'))\r
                )\r
          })\r
          .add(\r
            new go.Shape('Rectangle', {\r
              fill: 'lightgray',\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true,\r
              cursor: 'pointer'\r
            }),\r
            new go.TextBlock({ margin: 6 })\r
              .bind('text', 'key')\r
          ),\r
      model: new go.GraphLinksModel({\r
        copiesKey: true, // so that the newly dropped node will have key == "Alpha"\r
        nodeDataArray: [{ key: 'Lambda' }, { key: 'Mu' }],\r
        linkDataArray: [{ from: 'Lambda', to: 'Mu' }]\r
      }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // initialize the Palette that is on the left side of the page\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplate: myDiagram.nodeTemplate,\r
      model: new go.GraphLinksModel([\r
        // specify the contents of the Palette\r
        { key: 'Alpha' },\r
        { key: 'Beta' },\r
        { key: 'Gamma' },\r
        { key: 'Delta' }\r
      ])\r
    });\r
  }\r
\r
  // These are the HTML button event handlers.\r
\r
  function clickLambda() {\r
    var lambda = myDiagram.findNodeForKey('Lambda');\r
    if (lambda === null) return;\r
    var loc = lambda.location;\r
\r
    // click on Lambda\r
    myDiagram.emitMouseDown(loc.x + 10, loc.y + 10, 0, {});\r
    myDiagram.emitMouseUp(loc.x + 10, loc.y + 10, 100, {});\r
\r
    // Clicking is just a sequence of input events.\r
    // There is no command in CommandHandler for such a basic gesture.\r
\r
    // Alternatively, if the GraphObject.click property is non null, you could just call it:\r
    // const clickfunc = lambda.click;\r
    // if (clickfunc !== null) {\r
    //   const ie = new go.InputEvent();\r
    //   ie.diagram = myDiagram;\r
    //   ie.documentPoint = new go.Point(loc.x + 10, loc.y + 10);\r
    //   ie.viewPoint = myDiagram.transformDocToView(ie.documentPoint);\r
    //   clickfunc(ie, lambda);\r
    // }\r
  }\r
\r
  function doubleClickLambda() {\r
    var lambda = myDiagram.findNodeForKey('Lambda');\r
    if (lambda === null) return;\r
    var loc = lambda.location;\r
\r
    // double-click on Lambda\r
    myDiagram.emitMouseDown(loc.x + 10, loc.y + 10, 0, {});\r
    myDiagram.emitMouseUp(loc.x + 10, loc.y + 10, 100, {});\r
    myDiagram.emitMouseDown(loc.x + 10, loc.y + 10, 200, { clickCount: 2 });\r
    myDiagram.emitMouseUp(loc.x + 10, loc.y + 10, 300, { clickCount: 2 });\r
\r
    // Alternatively, if the GraphObject.doubleClick property is non null, you could just call it:\r
    // const clickfunc = lambda.doubleClick;\r
    // if (clickfunc !== null) {\r
    //   const ie = new go.InputEvent();\r
    //   ie.diagram = myDiagram;\r
    //   ie.documentPoint = new go.Point(loc.x + 10, loc.y + 10);\r
    //   ie.viewPoint = myDiagram.transformDocToView(ie.documentPoint);\r
    //   ie.clickCount = 2;\r
    //   clickfunc(ie, lambda);\r
    // }\r
  }\r
\r
  function dragFromPalette() {\r
    // simulate a drag-and-drop between Diagrams:\r
    var dragdrop = { sourceDiagram: myPalette, targetDiagram: myDiagram };\r
    myDiagram.emitMouseDown(5, 5, 0, dragdrop); // this should be where the Alpha node is in the source myPalette\r
    myDiagram.emitMouseMove(60, 60, 100, dragdrop);\r
    myDiagram.emitMouseUp(100, 100, 200, dragdrop); // this is where the node will be dropped in the target myDiagram\r
    // If successful in dragging a node from the Palette into the Diagram,\r
    // the DraggingTool will perform a transaction.\r
  }\r
\r
  function copyNode() {\r
    var alpha = myDiagram.findNodeForKey('Alpha');\r
    if (alpha === null) return;\r
    var loc = alpha.actualBounds.center;\r
\r
    var options = { control: true, alt: true };\r
    // Simulate a mouse drag to move the Alpha node:\r
    myDiagram.emitMouseDown(loc.x, loc.y, 0, options);\r
    myDiagram.emitMouseMove(loc.x + 80, loc.y + 50, 50, options);\r
    myDiagram.emitMouseMove(loc.x + 20, loc.y + 100, 100, options);\r
    myDiagram.emitMouseUp(loc.x + 20, loc.y + 100, 150, options);\r
    // If successful, will have made a copy of the "Alpha" node below it.\r
\r
    // Alternatively you could copy the Node using commands:\r
    // myDiagram.commandHandler.copySelection();\r
    // myDiagram.commandHandler.pasteSelection(new go.Point(loc.x+20, loc.y+100));\r
  }\r
\r
  function linkNodes() {\r
    var alpha = myDiagram.findNodeForKey('Alpha');\r
    if (alpha === null) return;\r
    var ptA = alpha.getDocumentPoint(go.Spot.Bottom);\r
    var alpha2 = myDiagram.findNodeForKey('Alpha2');\r
    if (alpha2 === null) return;\r
    var ptB = alpha.actualBounds.center;\r
\r
    // Simulate dragging from the inside edge of the Alpha node, to start drawing a new link.\r
    myDiagram.emitMouseDown(ptA.x, ptA.y-2, 0);\r
    myDiagram.emitMouseMove(ptA.x+10, ptA.y+10, 100);\r
    myDiagram.emitMouseMove((ptA.x+ptB.x)/2, (ptA.y+ptB.y)/2, 200);\r
    myDiagram.emitMouseUp(ptB.x, ptB.y, 250);\r
    // Now should have drawn a new Link\r
\r
    // Alternatively, you could draw a new Link via:\r
    // const tool = myDiagram.toolManager.linkingTool;\r
    // tool.insertLink(alpha, null, alpha2, null);\r
  }\r
\r
  function dragSelectNodes() {\r
    var alpha = myDiagram.findNodeForKey('Alpha');\r
    if (alpha === null) return;\r
    var alpha2 = myDiagram.findNodeForKey('Alpha2');\r
    if (alpha2 === null) return;\r
    var coll = new go.Set();\r
    coll.add(alpha);\r
    coll.add(alpha2);\r
    var area = myDiagram.computePartsBounds(coll);\r
    area.inflate(30, 30);\r
\r
    // Simulate dragging in the background around the two Alpha nodes.\r
    // This uses timestamps to pretend to wait a while to avoid activating the PanningTool.\r
    // Hopefully this mouse down does not hit any Part, but in the Diagram's background:\r
    myDiagram.emitMouseDown(area.x, area.y, 0);\r
    // NOTE that this mouseMove timestamp needs to be > myDiagram.toolManager.dragSelectingTool.delay:\r
    myDiagram.emitMouseMove(area.x+10, area.y+10, 300);\r
    myDiagram.emitMouseMove(area.right-10, area.bottom-10, 350);\r
    myDiagram.emitMouseUp(area.right, area.bottom, 500);\r
    // Now should have selected both "Alpha" and "Alpha2", and any Link between them, using the DragSelectingTool.\r
\r
    // Alternatively you could select the Nodes programmatically:\r
    // alpha.isSelected = true;\r
    // alpha2.isSelected = true;\r
\r
    // Or you could select all Parts in the rectangular AREA:\r
    //myDiagram.selectCollection(myDiagram.findPartsIn(area));\r
  }\r
\r
  function clickContextMenu() {\r
    var alpha = myDiagram.findNodeForKey('Alpha');\r
    if (alpha === null) return;\r
    var loc = alpha.location;\r
\r
    // right click on Alpha\r
    myDiagram.emitMouseDown(loc.x + 10, loc.y + 10, 0, { right: true });\r
    myDiagram.emitMouseUp(loc.x + 10, loc.y + 10, 100, { right: true });\r
\r
    // Alternatively you could invoke the Show Context Menu command directly:\r
    // myDiagram.commandHandler.showContextMenu(alpha);\r
\r
    // move mouse over first context menu button\r
    myDiagram.emitMouseMove(loc.x + 20, loc.y + 20, 200);\r
    // and click that button\r
    myDiagram.emitMouseDown(loc.x + 20, loc.y + 20, 300);\r
    myDiagram.emitMouseUp(loc.x + 20, loc.y + 20, 350);\r
    // This should have invoked the ContextMenuButton's click function, showProperties,\r
    // which should have put a green message in the myStatus DIV.\r
  }\r
\r
  function deleteSelection() {\r
    // Simulate clicking the "Delete" key:\r
    myDiagram.emitKeyDown('Delete');\r
    myDiagram.emitKeyUp('Delete');\r
    // Now the selected Nodes are deleted.\r
\r
    // Alternatively you could invoke the Delete command directly:\r
    // myDiagram.commandHandler.deleteSelection();\r
  }\r
\r
  function pan() {\r
    var pos1 = myDiagram.position.copy();\r
\r
    var pt = new go.Point(myDiagram.viewportBounds.x + 30, myDiagram.viewportBounds.centerY);\r
    myDiagram.emitMouseDown(pt.x, pt.y, 0, {});\r
    // Minimal wait after mouseDown when moving, else the PanningTool will be pre-empted\r
    // by the DragSelectingTool, which is controlled by the DragSelectingTool.delay property.\r
    // Remember that these are document coordinates, which are shifted by the panning motion.\r
    myDiagram.emitMouseMove(pt.x + 20, pt.y + 10, 10, {});\r
    myDiagram.emitMouseMove(pt.x + 20, pt.y + 10, 30, {});\r
    myDiagram.emitMouseMove(pt.x + 20, pt.y + 10, 50, {});\r
    myDiagram.emitMouseUp(pt.x + 20, pt.y + 10, 70, {});\r
\r
    var pos2 = myDiagram.position.copy();\r
    document.getElementById('myStatus').textContent = 'Document.position before: ' + pos1.toString() + ' ' + 'Document.position after: ' + pos2.toString();\r
\r
    // Alternatively, you could scroll programmatically:\r
    // const newpos = myDiagram.position.copy();\r
    // newpos.offset(-80, -40);\r
    // myDiagram.position = newpos;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>To simulate mouse events the buttons above use the <b>emit...</b> methods of the Diagram class.</p>\r
  <p>\r
    The <a>UndoManager</a> has been enabled in the main Diagram. Give focus to the Diagram and you can undo everything and then redo everything to confirm what\r
    was executed by the simulated events.\r
  </p>\r
  <p>\r
    The <a>Robot</a> extension class has been deprecated, because the functionality has been moved to the Diagram class.\r
    The extension remains here for compatibility, but we recommend that you use the "emit..." methods of <a>Diagram</a>,\r
    which are compatible with the functionality of the extension, except that their names start with "emit...".\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`contextmenus`,`palette`,`buttons`,`extensions`,`html`];var g=y();l(`ub9jtv`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};