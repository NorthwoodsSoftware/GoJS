<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Update Demo GoJS Sample</title>
<meta name="description" content="Show the ChangedEvents that occur as the user modifies diagrams that share a single model, and the state of the UndoManager." />
<!-- Copyright 1998-2018 by Northwoods Software Corporation. -->
<meta charset="UTF-8">
<script src="../release/go.js"></script>
<script src="../assets/js/goSamples.js"></script>  <!-- this is only for the GoJS Samples framework -->
<script id="code">
function init() {
  if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
  var $ = go.GraphObject.make;  // for conciseness in defining templates

  blueDiagram =
    $(go.Diagram, "blueDiagram",
      {
        // start everything in the middle of the viewport
        initialContentAlignment: go.Spot.Center,
        // double-click in background creates a new node there
        "clickCreatingTool.archetypeNodeData": { text: "node" }
      });

  blueDiagram.nodeTemplate =
    $(go.Node, "Auto",
      new go.Binding("location", "loc").makeTwoWay(),
      $(go.Shape, "RoundedRectangle",
        {
          fill: $(go.Brush, "Linear", { 0: "#00ACED", 0.5: "#00ACED", 1: "#0079A6" }),
          stroke: "#0079A6",
          portId: "", cursor: "pointer",  // the node's only port is the Shape
          fromLinkable: true, fromLinkableDuplicates: true, fromLinkableSelfNode: true,
          toLinkable: true, toLinkableDuplicates: true, toLinkableSelfNode: true
        }),
      $(go.TextBlock,
        { margin: 3, font: "bold 10pt Arial, sans-serif", stroke: "whitesmoke", editable: true },
        new go.Binding("text").makeTwoWay())
    );

  blueDiagram.linkTemplate =
    $(go.Link,
      {
        curve: go.Link.Bezier, adjusting: go.Link.Stretch,
        relinkableFrom: true, relinkableTo: true, reshapable: true
      },
      $(go.Shape,  // the link shape
        { strokeWidth: 2, stroke: "blue" }),
      $(go.Shape,  // the arrowhead
        { toArrow: "standard",
          fill: "blue", stroke: null })
    );


  greenDiagram =
    $(go.Diagram, "greenDiagram",
      {
        // start everything in the middle of the viewport
        initialContentAlignment: go.Spot.Center,
        // double-click in background creates a new node there
        "clickCreatingTool.archetypeNodeData": { key: "node" }
      });

  greenDiagram.nodeTemplate =
    $(go.Node, "Vertical",
      new go.Binding("location", "loc").makeTwoWay(),
      $(go.Shape, "Ellipse",
        { fill: "lightgreen", width: 20, height: 20, portId: "" }),
      $(go.TextBlock,
        { margin: 3, font: "bold 12px Georgia, sans-serif" },
        new go.Binding("text"))
    );

  greenDiagram.linkTemplate =
    $(go.Link,
      $(go.Shape,  // the link shape
        { strokeWidth: 2, stroke: "#76C176" }),
      $(go.Shape,  // the arrowhead
        { toArrow: "standard",
          fill: "#76C176", stroke: null })
    );


  // create the model data that will be represented in both diagrams simultaneously
  var model = new go.GraphLinksModel(
  [
    { key: 1, text: "Alpha", loc: new go.Point(20,20) },
    { key: 2, text: "Beta", loc: new go.Point(160,120) }
  ],
  [
    { from: 1, to: 2 }
  ]);

  // the two Diagrams share the same model
  blueDiagram.model = model;
  greenDiagram.model = model;

  // now turn on undo/redo
  model.undoManager.isEnabled = true;


  // **********************************************************
  // A third diagram is on this page to display the undo state.
  // It functions as a tree view, showing the Transactions
  // in the UndoManager history.
  // **********************************************************

  var undoDisplay =
    $(go.Diagram, "undoDisplay",
      {
        allowMove: false,
        maxSelectionCount: 1,
        layout:
          $(go.TreeLayout,
            {
              alignment: go.TreeLayout.AlignmentStart,
              angle: 0,
              compaction: go.TreeLayout.CompactionNone,
              layerSpacing: 16,
              layerSpacingParentOverlap: 1,
              nodeIndent: 2,
              nodeIndentPastParent: 0.88,
              nodeSpacing: 0,
              setsPortSpot: false,
              setsChildPortSpot: false,
              arrangementSpacing: new go.Size(2, 2)
            }),
        "animationManager.isEnabled": false
      });

  undoDisplay.nodeTemplate =
    $(go.Node,
      $("TreeExpanderButton",
        { width: 14, "ButtonBorder.fill": "whitesmoke" }),
      $(go.Panel, "Horizontal",
        { position: new go.Point(16, 0) },
        new go.Binding("background", "color"),
        $(go.TextBlock, {margin: 2},
          new go.Binding("text", "text"))
      )
    );

  undoDisplay.linkTemplate = $(go.Link);  // not really used

  var undoModel =
    $(go.TreeModel,  // initially empty
      { isReadOnly: true });
  undoDisplay.model = undoModel;

  // ******************************************************
  // Add an undo listener to the main model
  // ******************************************************

  var changedLog = document.getElementById("modelChangedLog");
  var editToRedo = null; // a node in the undoDisplay
  var editList = [];

  model.addChangedListener(function(e) {
    // do not display some uninteresting kinds of transaction notifications
    if (e.change === go.ChangedEvent.Transaction) {
      if (e.propertyName === "CommittingTransaction" || e.modelChange === "SourceChanged") return;
      // do not display any layout transactions
      if (e.oldValue === "Layout") return;
    }  // You will probably want to use e.isTransactionFinished instead

    // Add entries into the log
    var changes = e.toString();
    if (changes[0] !== "*") changes = "&nbsp;&nbsp;" + changes;
    changedLog.innerHTML += changes + "<br/>";
    changedLog.scrollTop = changedLog.scrollHeight;

    // Modify the undoDisplay Diagram, the tree view
    if (e.propertyName === "CommittedTransaction") {
      if (editToRedo != null) {
        // remove from the undo display diagram all nodes after editToRedo
        for (var i = editToRedo.data.index+1; i < editList.length; i++) {
          undoDisplay.remove(editList[i]);
        }
        editList = editList.slice(0, editToRedo.data.index);
        editToRedo = null;
      }

      var tx = e.object;
      var txname = (tx !== null ? e.object.name : "");
      var parentData = {text: txname, tag: e.object, index: editList.length - 1};
      undoModel.addNodeData(parentData)
      var parentKey = undoModel.getKeyForNodeData(parentData);
      var parentNode = undoDisplay.findNodeForKey(parentKey);
      editList.push(parentNode);
      if (tx !== null) {
        var allChanges = tx.changes;
        var odd = true;
        allChanges.each(function(change) {
            var childData = {
              color: (odd ? "white" : "#E0FFED"),
              text: change.toString(),
              parent: parentKey
            };
            undoModel.addNodeData(childData)
            odd = !odd;
          });
        undoDisplay.commandHandler.collapseTree(parentNode);
      }
    } else if (e.propertyName === "FinishedUndo" || e.propertyName === "FinishedRedo") {
      var undoManager = model.undoManager;
      if (editToRedo !== null) {
        editToRedo.isSelected = false;
        editToRedo = null;
      }
      // Find the node that represents the undo or redo state and select it
      var nextEdit = undoManager.transactionToRedo;
      if (nextEdit !== null) {
        var itr = undoDisplay.nodes;
        while (itr.next()) {
          var node = itr.value;
          if (node.data.tag === nextEdit) {
            node.isSelected = true;
            editToRedo = node;
            break;
          }
        }
      }
    }
  }); // end model changed listener

  model.addChangedListener(function(e) {
    if (e.isTransactionFinished) {
      var tx = e.object;
      if (tx instanceof go.Transaction && window.console) {
        window.console.log(tx.toString());
        tx.changes.each(function(c) {
          if (c.model) window.console.log("  " + c.toString());
        });
      }
    }
  });
} // end init

function clearLog() {
  var div = document.getElementById("modelChangedLog").innerHTML = "";
}
</script>
</head>
<body onload="init()">
<div id="sample">
  <p>Update Demo <b>GoJS</b> Sample</p>
  <!-- The DIV for the Diagram needs an explicit size or else we won't see anything.
       Also add a border to help see the edges. -->
  <div style="width:100%; white-space:nowrap">
    <div style="display: inline-block; vertical-align: top; width:50%">
      <div id="blueDiagram" style="border: solid 1px blue; width:100%; height:300px;"></div>
      <div style="width:100%; height:20px"></div>
      <div id="greenDiagram" style="border: solid 1px green; width:100%; height:300px"></div>
    </div>
    <div style="display: inline-block; vertical-align: top; width:50%">
      <div style="width:100%; height:300px">
        <input type="button" onclick="clearLog()" style="height:20px; font-size: 11px;" value="Clear Model log" />
        <div id="modelChangedLog" style="height:280px;border: solid 1px gray; font-family:Monospace; font-size:11px; overflow:scroll"></div>
      </div>
      <div style="width:100%; height:20px"></div>
      <div style="">
        <input type="button" onclick="blueDiagram.commandHandler.undo()" style="height:20px; font-size: 11px;" value="Undo" />
        <input type="button" onclick="blueDiagram.commandHandler.redo()" style="height:20px; font-size: 11px;" value="Redo" />
        <div id="undoDisplay" style="height:280px; border: solid 1px gray"></div>
      </div>
    </div>
  </div>
  <p>
  This sample has two Diagrams, named "blueDiagram" and "greenDiagram", that display the same Model.
  Each diagram uses its own templates for its nodes and links, causing the appearance of each diagram to be different.
  However making a change in one diagram that changes the model causes those model changes to be reflected in the other diagram.
  </p>
  <p>
  This sample also shows, next to the blue diagram, almost all of the <a>ChangedEvent</a>s that the shared model undergoes.
  (For clarity it leaves out some of the Transaction-oriented events.)
  The model Changed listener adds a line for each ChangedEvent to the "modelChangedLog" DIV.
  Transaction notification events start with an asterisk "*",
  while property changes and collection insertions and removals start with an exclamation mark "!".
  </p>
  <p>
  Next to the green diagram there is a tree view display of the <a>UndoManager</a>'s history.
  The <a>UndoManager.history</a> is a <a>List</a> of <a>Transaction</a>s,
  where each <a>Transaction.changes</a> property holds all of the ChangedEvents that occurred due to some command or tool operation.
  These ChangedEvents are reflective of both changes to the model (prefixed with "!m") and to the diagram (prefixed with "!d").
  You will note that there are often several diagram changes for each model change.
  </p>
  <p>
  This demo is different from the <a href="twoDiagrams.html">Two Diagrams</a> sample, which is an example of two Diagrams,
  each sharing/showing a different <a>Model</a>, but sharing the same <a>UndoManager</a>.
  </p>
  <p>
  Many of the other samples demonstrate saving the whole model by calling <a>Model.toJson</a>.
  If you want to save incrementally, you should do so at the end of each transaction, when <a>ChangedEvent.isTransactionFinished</a>.
  The <a>ChangedEvent.object</a> may be a <a>Transaction</a>.
  Look through the <a>Transaction.changes</a> list for the model changes that you want to save.
  This code demonstrates the basic idea:
  </p>
  <pre>
  model.addChangedListener(function(e) {
    if (e.isTransactionFinished) {
      var tx = e.object;
      if (tx instanceof go.Transaction && window.console) {
            window.console.log(tx.toString());
        tx.changes.each(function(c) {
          // consider which ChangedEvents to record
          if (c.model) window.console.log("  " + c.toString());
        });
      }
    }
  });
  </pre>
</div>
</body>
</html>
