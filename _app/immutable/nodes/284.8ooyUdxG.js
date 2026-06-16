import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Update Demo Showing ChangedEvents, Transactions, UndoManager`,titleShort:`Update Demo`,indexDescription:`Showcases two Diagrams observing the same Model. Modifying positions in one Diagram will modify them in the model, updating the other Diagram as well.`,screenshot:`updatedemo`,priority:2,tags:[`treelayout`,`buttons`,`html`],description:`Show the ChangedEvents that occur as the user modifies diagrams that share a single model, and the state of the UndoManager.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       Also add a border to help see the edges. -->\r
  <div style="width: 100%; white-space: nowrap">\r
    <div style="display: inline-block; vertical-align: top; width: 50%">\r
      <div id="blueDiagram" style="border: solid 1px blue; width: 100%; height: 300px"></div>\r
      <div style="width: 100%; height: 20px"></div>\r
      <div id="greenDiagram" style="border: solid 1px green; width: 100%; height: 300px"></div>\r
    </div>\r
    <div style="display: inline-block; vertical-align: top; width: 50%">\r
      <div style="width: 100%; height: 300px">\r
        <button onclick="clearLog()" style="height: 20px; font-size: 11px">Clear Model log</button>\r
        <div id="modelChangedLog" style="height: 280px; border: solid 1px gray; font-family: Monospace; font-size: 11px; overflow: scroll"></div>\r
      </div>\r
      <div style="width: 100%; height: 20px"></div>\r
      <div>\r
        <button onclick="blueDiagram.commandHandler.undo()" style="height: 20px; font-size: 11px">Undo</button>\r
        <button onclick="blueDiagram.commandHandler.redo()" style="height: 20px; font-size: 11px">Redo</button>\r
        <div id="undoDisplay" style="height: 280px; border: solid 1px gray"></div>\r
      </div>\r
    </div>\r
  </div>`,jsCode:`function init() {\r
    blueDiagram = new go.Diagram('blueDiagram', {\r
      // double-click in background creates a new node there\r
      'clickCreatingTool.archetypeNodeData': { text: 'node' }\r
    });\r
\r
    blueDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'loc')\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
            fill: new go.Brush('Linear', { 0: '#00ACED', 0.5: '#00ACED', 1: '#0079A6' }),\r
            stroke: '#0079A6',\r
            portId: '',\r
            cursor: 'pointer', // the node's only port is the Shape\r
            fromLinkable: true,\r
            fromLinkableDuplicates: true,\r
            fromLinkableSelfNode: true,\r
            toLinkable: true,\r
            toLinkableDuplicates: true,\r
            toLinkableSelfNode: true\r
          }),\r
        new go.TextBlock({ margin: 3, font: 'bold 10pt Arial, sans-serif', stroke: 'whitesmoke', editable: true })\r
          .bindTwoWay('text')\r
      );\r
\r
    blueDiagram.linkTemplate =\r
      new go.Link({\r
          curve: go.Curve.Bezier,\r
          adjusting: go.LinkAdjusting.Stretch,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          toShortLength: 2\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 2, stroke: 'blue' }), // the link shape\r
          new go.Shape({ toArrow: 'standard', fill: 'blue', stroke: null }) // the arrowhead\r
        );\r
\r
    greenDiagram = new go.Diagram('greenDiagram', {\r
      // double-click in background creates a new node there\r
      'clickCreatingTool.archetypeNodeData': { key: 'node' }\r
    });\r
\r
    greenDiagram.nodeTemplate =\r
      new go.Node('Vertical')\r
        .bindTwoWay('location', 'loc')\r
        .add(\r
          new go.Shape('Ellipse', { fill: 'lightgreen', width: 20, height: 20, portId: '' }),\r
          new go.TextBlock({ margin: 3, font: 'bold 12px Georgia, sans-serif' })\r
            .bind('text')\r
        );\r
\r
    greenDiagram.linkTemplate =\r
      new go.Link({ toShortLength: 2 })\r
        .add(\r
          new go.Shape({ strokeWidth: 2, stroke: '#76C176' }), // the link shape\r
          new go.Shape({ toArrow: 'standard', fill: '#76C176', stroke: null }) // the arrowhead\r
        );\r
\r
    // create the model data that will be represented in both diagrams simultaneously\r
    var model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', loc: new go.Point(20, 20) },\r
        { key: 2, text: 'Beta', loc: new go.Point(160, 120) }\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
\r
    // the two Diagrams share the same model\r
    blueDiagram.model = model;\r
    greenDiagram.model = model;\r
\r
    // now turn on undo/redo\r
    model.undoManager.isEnabled = true;\r
\r
    // **********************************************************\r
    // A third diagram is on this page to display the undo state.\r
    // It functions as a tree view, showing the Transactions\r
    // in the UndoManager history.\r
    // **********************************************************\r
\r
    var undoDisplay = new go.Diagram('undoDisplay', {\r
      allowMove: false,\r
      maxSelectionCount: 1,\r
      initialContentAlignment: go.Spot.TopLeft,\r
      layout: new go.TreeLayout({\r
        alignment: go.TreeAlignment.Start,\r
        angle: 0,\r
        compaction: go.TreeCompaction.None,\r
        layerSpacing: 16,\r
        layerSpacingParentOverlap: 1,\r
        nodeIndentPastParent: 1.0,\r
        nodeSpacing: 0,\r
        setsPortSpot: false,\r
        setsChildPortSpot: false,\r
        arrangementSpacing: new go.Size(2, 2)\r
      }),\r
      'animationManager.isEnabled': false\r
    });\r
\r
    undoDisplay.nodeTemplate = new go.Node()\r
      .add(\r
        go.GraphObject.build("TreeExpanderButton", { width: 14, 'ButtonBorder.fill': 'whitesmoke' }),\r
        new go.Panel('Horizontal', { position: new go.Point(16, 0) })\r
          .bind('background', 'color')\r
          .add(\r
            new go.TextBlock({ margin: 2 })\r
              .bind('text')\r
          )\r
      );\r
\r
    undoDisplay.linkTemplate = new go.Link(); // not really used\r
\r
    var undoModel = new go.TreeModel({ isReadOnly: true }); // initially empty\r
    undoDisplay.model = undoModel;\r
\r
    // ******************************************************\r
    // Add an undo listener to the main model\r
    // ******************************************************\r
\r
    var changedLog = document.getElementById('modelChangedLog');\r
    var editToRedo = null; // a node in the undoDisplay\r
    var editList = [];\r
\r
    model.addChangedListener(e => {\r
      // do not display some uninteresting kinds of transaction notifications\r
      if (e.change === go.ChangeType.Transaction) {\r
        if (e.propertyName === 'CommittingTransaction' || e.modelChange === 'SourceChanged') return;\r
        // do not display any layout transactions\r
        if (e.oldValue === 'Layout') return;\r
      } // You will probably want to use e.isTransactionFinished instead\r
\r
      // Add entries into the log\r
      var changes = e.toString();\r
      if (changes[0] !== '*') changes = '&nbsp;&nbsp;' + changes;\r
      changedLog.innerHTML += changes + '<br/>';\r
      changedLog.scrollTop = changedLog.scrollHeight;\r
\r
      // Modify the undoDisplay Diagram, the tree view\r
      if (e.propertyName === 'CommittedTransaction') {\r
        if (editToRedo != null) {\r
          // remove from the undo display diagram all nodes after editToRedo\r
          for (var i = editToRedo.data.index + 1; i < editList.length; i++) {\r
            undoDisplay.remove(editList[i]);\r
          }\r
          editList = editList.slice(0, editToRedo.data.index);\r
          editToRedo = null;\r
        }\r
\r
        // delay the update of the undoDisplay tree, to catch the results of calls to Transaction.optimize\r
        setTimeout(() => {\r
          var tx = e.object;\r
          var txname = tx !== null ? e.object.name : '';\r
          var parentData = { text: txname, tag: e.object, index: editList.length - 1 };\r
          undoModel.addNodeData(parentData);\r
          var parentKey = undoModel.getKeyForNodeData(parentData);\r
          var parentNode = undoDisplay.findNodeForKey(parentKey);\r
          editList.push(parentNode);\r
          if (tx !== null) {\r
            var allChanges = tx.changes;\r
            var odd = true;\r
            allChanges.each(change => {\r
              var childData = {\r
                color: odd ? 'white' : '#E0FFED',\r
                text: change.toString(),\r
                parent: parentKey\r
              };\r
              undoModel.addNodeData(childData);\r
              odd = !odd;\r
            });\r
            undoDisplay.commandHandler.collapseTree(parentNode);\r
          }\r
        }, 10);\r
      } else if (e.propertyName === 'FinishedUndo' || e.propertyName === 'FinishedRedo') {\r
        var undoManager = model.undoManager;\r
        if (editToRedo !== null) {\r
          editToRedo.isSelected = false;\r
          editToRedo = null;\r
        }\r
        // Find the node that represents the undo or redo state and select it\r
        var nextEdit = undoManager.transactionToRedo;\r
        if (nextEdit !== null) {\r
          var itr = undoDisplay.nodes;\r
          while (itr.next()) {\r
            var node = itr.value;\r
            if (node.data.tag === nextEdit) {\r
              node.isSelected = true;\r
              editToRedo = node;\r
              break;\r
            }\r
          }\r
        }\r
      }\r
    }); // end model changed listener\r
  } // end init\r
\r
  function clearLog() {\r
    var div = (document.getElementById('modelChangedLog').innerHTML = '');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>Update Demo <b>GoJS</b> Sample</p>\r
  <p>\r
    This sample has two Diagrams, named "blueDiagram" and "greenDiagram", that display the same Model. Each diagram uses its own templates for its nodes and\r
    links, causing the appearance of each diagram to be different. However making a change in one diagram that changes the model causes those model changes to\r
    be reflected in the other diagram.\r
  </p>\r
  <p>\r
    This sample also shows, next to the blue diagram, almost all of the <a>ChangedEvent</a>s that the shared model undergoes. (For clarity it leaves out some of\r
    the Transaction-oriented events.) The model Changed listener adds a line for each ChangedEvent to the "modelChangedLog" DIV. Transaction notification events\r
    start with an asterisk "*", while property changes and collection insertions and removals start with an exclamation mark "!".\r
  </p>\r
  <p>\r
    Next to the green diagram there is a tree view display of the <a>UndoManager</a>'s history. The <a>UndoManager.history</a> is a <a>List</a> of\r
    <a>Transaction</a>s, where each <a>Transaction.changes</a> property holds all of the ChangedEvents that occurred due to some command or tool operation.\r
    These ChangedEvents are reflective of both changes to the model (prefixed with "!m") and to the diagram (prefixed with "!d"). You will note that there are\r
    often several diagram changes for each model change.\r
  </p>\r
  <p>\r
    This demo is different from the <a href="twoDiagrams">Two Diagrams</a> sample, which is an example of two Diagrams, each sharing/showing a different\r
    <a>Model</a>, but sharing the same <a>UndoManager</a>.\r
  </p>\r
  <p>\r
    Many of the other samples demonstrate saving the whole model by calling <a>Model.toJson</a>. If you want to save incrementally, you should do so at the end\r
    of each transaction, when <a>ChangedEvent.isTransactionFinished</a>. The <a>ChangedEvent.object</a> may be a <a>Transaction</a> or null if there were no\r
    recorded changes. Look through the <a>Transaction.changes</a> list for the model changes that you want to save. This code demonstrates the basic idea:\r
  </p>\r
  <!-- DESC_CODE_BLOCK_0 -->`,descriptionCodeBlocks:[{code:`model.addChangedListener(e => {\r
    if (e.isTransactionFinished) {\r
      const tx = e.object;\r
      if (tx instanceof go.Transaction) {\r
        console.log(tx.toString());\r
        tx.changes.each(c => {\r
          // consider which ChangedEvents to record\r
          if (c.model) console.log("  " + c.toString());\r
        });\r
      }\r
    }\r
  });`,language:`js`}]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`buttons`,`html`];var g=y();l(`1ky16k3`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};