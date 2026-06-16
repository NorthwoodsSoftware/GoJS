import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Drag-and-Drop Between Two Diagrams Controlled by Permissions`,titleShort:`Two Diagrams Drag-and-Drop`,indexDescription:`Demonstrates drag and drop between two different diagrams using a shared UndoManager.`,screenshot:`minimal`,priority:2,tags:[`html`],description:`Moving (not copying) nodes between two Diagrams and two different Models sharing an UndoManager.`},htmlContent:`<div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center; gap: 40px">\r
    <div>\r
      <div id="myDiagramDiv" style="border: solid 1px black; width: 400px; height: 300px; margin: 0 2px 0 0; background: whitesmoke;"></div>\r
      <p>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD1allowDragOut" />allowDragOut</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD1allowDrop" />allowDrop</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD1isReadOnly" />isReadOnly</label>\r
      </p>\r
      <p>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD1allowCopy" />allowCopy</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD1allowDelete" />allowDelete</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD1allowInsert" />allowInsert</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD1allowMove" />allowMove</label>\r
      </p>\r
    </div>\r
    <div>\r
      <div id="myDiagramDiv2" style="border: solid 1px black; width: 400px; height: 300px; background: whitesmoke;"></div>\r
      <p>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD2allowDragOut" />allowDragOut</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD2allowDrop" />allowDrop</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD2isReadOnly" />isReadOnly</label>\r
      </p>\r
      <p>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD2allowCopy" />allowCopy</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD2allowDelete" />allowDelete</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD2allowInsert" />allowInsert</label>\r
        <label><input type="checkbox" onclick="allChecks()" id="MD2allowMove" />allowMove</label>\r
      </p>\r
    </div>\r
  </div>\r
  <div>\r
    Using simulated InputEvents:<br />\r
    <button onclick="dragBetaAcross()">Drag Beta across</button><br />\r
    <button onclick="copyBetaBack()">Copy Beta back</button>\r
  </div>`,jsCode:`function init() {\r
\r
    // ****** First Diagram ******\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowDragOut: true,\r
      'commandHandler.archetypeGroupData': { isGroup: true },\r
      // handle undo or redo maybe changing Diagram properties controlled by check boxes\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) allChecks(true);\r
      },\r
      // A Diagram listener must be placed on both Diagrams.\r
      // When a collection of Parts is dragged into a diagram and dropped, the normal behavior is\r
      // to copy the data and create new Parts in the destination diagram.\r
      // To simulate a "move", the source Node must be deleted.\r
      // To allow a forced "copy", don't delete if the control key was held down in the source diagram.\r
      ExternalObjectsDropped: e => {\r
        if (myDiagram2.commandHandler.canDeleteSelection() && !(myDiagram2.lastInput.control || myDiagram2.lastInput.meta)) {\r
          myDiagram2.commandHandler.deleteSelection();\r
        }\r
      }\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add( // the Shape will go around the TextBlock\r
          new go.Shape('RoundedRectangle', {\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true,\r
              cursor: 'pointer',\r
              strokeWidth: 0\r
            })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' }\r
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
    // ****** Second Diagram ******\r
\r
    myDiagram2 = new go.Diagram('myDiagramDiv2', {\r
      allowDragOut: true,\r
      'commandHandler.archetypeGroupData': { isGroup: true },\r
      // handle undo or redo maybe changing Diagram properties controlled by check boxes\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) allChecks(true);\r
      },\r
      // A Diagram listener must be placed on both Diagrams.\r
      // When a collection of Parts is dragged into a diagram and dropped, the normal behavior is\r
      // to copy the data and create new Parts in the destination diagram.\r
      // To simulate a "move", the source Node must be deleted.\r
      // To allow a forced "copy", don't delete if the control key was held down in the source diagram.\r
      ExternalObjectsDropped: e => {\r
        if (myDiagram.commandHandler.canDeleteSelection() && !(myDiagram.lastInput.control || myDiagram.lastInput.meta)) {\r
          myDiagram.commandHandler.deleteSelection();\r
        }\r
      }\r
    });\r
\r
    // share templates with the first diagram\r
    myDiagram2.nodeTemplate = myDiagram.nodeTemplate;\r
\r
    // show a different model\r
    myDiagram2.model = new go.GraphLinksModel(\r
      [\r
        { key: 'a', text: 'Zeta', color: 'lightblue' },\r
        { key: 'b', text: 'Eta', color: 'orange' }\r
      ],\r
      [{ from: 'a', to: 'b' }]\r
    );\r
\r
    // But the Diagrams share the same undo manager!\r
    myDiagram.model.undoManager = myDiagram2.model.undoManager;\r
    myDiagram.model.undoManager.isEnabled = true;\r
\r
    // initialize all the HTML checkboxes\r
    allChecks(true);\r
  }\r
\r
  function allChecks(set) {\r
    var MD1allowDragOut = document.getElementById('MD1allowDragOut');\r
    var MD1allowDrop = document.getElementById('MD1allowDrop');\r
    var MD1isReadOnly = document.getElementById('MD1isReadOnly');\r
    var MD1allowDelete = document.getElementById('MD1allowDelete');\r
    var MD1allowInsert = document.getElementById('MD1allowInsert');\r
    var MD1allowMove = document.getElementById('MD1allowMove');\r
\r
    var MD2allowDragOut = document.getElementById('MD2allowDragOut');\r
    var MD2allowDrop = document.getElementById('MD2allowDrop');\r
    var MD2isReadOnly = document.getElementById('MD2isReadOnly');\r
    var MD2allowDelete = document.getElementById('MD2allowDelete');\r
    var MD2allowInsert = document.getElementById('MD2allowInsert');\r
    var MD2allowMove = document.getElementById('MD2allowMove');\r
\r
    if (set) {\r
      MD1allowDragOut.checked = myDiagram.allowDragOut;\r
      MD1allowDrop.checked = myDiagram.allowDrop;\r
      MD1isReadOnly.checked = myDiagram.isReadOnly;\r
      MD1allowCopy.checked = myDiagram.allowCopy;\r
      MD1allowDelete.checked = myDiagram.allowDelete;\r
      MD1allowInsert.checked = myDiagram.allowInsert;\r
      MD1allowMove.checked = myDiagram.allowMove;\r
\r
      MD2allowDragOut.checked = myDiagram2.allowDragOut;\r
      MD2allowDrop.checked = myDiagram2.allowDrop;\r
      MD2isReadOnly.checked = myDiagram2.isReadOnly;\r
      MD2allowCopy.checked = myDiagram2.allowCopy;\r
      MD2allowDelete.checked = myDiagram2.allowDelete;\r
      MD2allowInsert.checked = myDiagram2.allowInsert;\r
      MD2allowMove.checked = myDiagram2.allowMove;\r
    } else {\r
      myDiagram.startTransaction('a');\r
      myDiagram.allowDragOut = MD1allowDragOut.checked;\r
      myDiagram.allowDrop = MD1allowDrop.checked;\r
      myDiagram.isReadOnly = MD1isReadOnly.checked;\r
      myDiagram.allowCopy = MD1allowCopy.checked;\r
      myDiagram.allowDelete = MD1allowDelete.checked;\r
      myDiagram.allowInsert = MD1allowInsert.checked;\r
      myDiagram.allowMove = MD1allowMove.checked;\r
\r
      myDiagram2.allowDragOut = MD2allowDragOut.checked;\r
      myDiagram2.allowDrop = MD2allowDrop.checked;\r
      myDiagram2.isReadOnly = MD2isReadOnly.checked;\r
      myDiagram2.allowCopy = MD2allowCopy.checked;\r
      myDiagram2.allowDelete = MD2allowDelete.checked;\r
      myDiagram2.allowInsert = MD2allowInsert.checked;\r
      myDiagram2.allowMove = MD2allowMove.checked;\r
      myDiagram.commitTransaction('a');\r
    }\r
  }\r
\r
  function dragBetaAcross() {\r
    var beta = myDiagram.findNodeForKey(2);\r
    if (beta !== null) {\r
      var opts = { sourceDiagram: myDiagram, targetDiagram: myDiagram2 };\r
      var loc = beta.location;\r
      myDiagram.emitMouseDown(loc.x + 15, loc.y + 15, 0, opts);\r
      myDiagram.emitMouseMove(loc.x + 20, loc.y + 10, 100, opts);\r
      myDiagram.emitMouseMove(60, 20, 200, opts);\r
      myDiagram.emitMouseUp(80, 50, 300, opts);\r
    } else {\r
      console.log('Beta not found in myDiagram');\r
    }\r
  }\r
\r
  function copyBetaBack() {\r
    var beta = myDiagram2.findNodesByExample({ text: 'Beta' }).first();\r
    if (beta !== null) {\r
      // turn off deletion in myDiagram2\r
      var delbutton = document.getElementById('MD2allowDelete');\r
      delbutton.checked = false;\r
      delbutton.onclick(); // better way to simulate clicking on check box?\r
\r
      // now dragging between diagrams won't delete the source node in myDiagram2\r
      var opts = { sourceDiagram: myDiagram2, targetDiagram: myDiagram };\r
      var loc = beta.location;\r
      myDiagram.emitMouseDown(loc.x + 15, loc.y + 15, 0, opts);\r
      myDiagram.emitMouseMove(loc.x - 20, loc.y + 10, 100, opts);\r
      myDiagram.emitMouseMove(160, 40, 200, opts);\r
      myDiagram.emitMouseUp(80, 10, 300, opts);\r
    } else {\r
      console.log('Beta not found in myDiagram2');\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    In this sample dragging from one Diagram to the other effectively "moves" the selection. It does this by having an "ExternalObjectsDropped" Diagram listener\r
    on each Diagram, which deletes the selection in the original Diagram when it is dropped on an external one.\r
  </p>\r
  <p>The two Diagrams do not share a Model, but the two Models do share the same UndoManager:</p>\r
  <!-- DESC_CODE_BLOCK_0 -->\r
  <p>Hence an undo or redo in one Diagram affects the other Diagram. This allows Node "moves" to be undone across Diagrams.</p>\r
  <p>(This is different from the <a href="updateDemo">Update Demo</a>, which is an example of two Diagrams sharing/showing the same Model.)</p>`,descriptionCodeBlocks:[{code:`myDiagram.model.undoManager = myDiagram2.model.undoManager;`,language:`js`}]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`html`];var g=y();l(`vzk75j`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};