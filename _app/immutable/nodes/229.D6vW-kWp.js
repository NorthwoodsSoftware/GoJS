import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Regrouping Editor and Simultaneous Tree View`,indexDescription:`Regrouping with tree view of grouping hierarchy.`,screenshot:`regroupingtreeview`,priority:2,tags:[`collections`,`gridlayout`,`treelayout`,`groups`,`buttons`,`commands`],description:`Keeping a TreeModel in synch with a GraphLinksModel in a Regrouping editor.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myTreeView" style="width: 150px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 500px; border: solid 1px black"></div>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":1, "text":"Main 1", "isGroup":true, "category":"OfGroups"},\r
{"key":2, "text":"Main 2", "isGroup":true, "category":"OfGroups"},\r
{"key":3, "text":"Group A", "isGroup":true, "category":"OfNodes", "group":1},\r
{"key":4, "text":"Group B", "isGroup":true, "category":"OfNodes", "group":1},\r
{"key":5, "text":"Group C", "isGroup":true, "category":"OfNodes", "group":2},\r
{"key":6, "text":"Group D", "isGroup":true, "category":"OfNodes", "group":2},\r
{"key":7, "text":"Group E", "isGroup":true, "category":"OfNodes", "group":6},\r
{"text":"first A", "group":3, "key":-7},\r
{"text":"second A", "group":3, "key":-8},\r
{"text":"first B", "group":4, "key":-9},\r
{"text":"second B", "group":4, "key":-10},\r
{"text":"third B", "group":4, "key":-11},\r
{"text":"first C", "group":5, "key":-12},\r
{"text":"second C", "group":5, "key":-13},\r
{"text":"first D", "group":6, "key":-14},\r
{"text":"first E", "group":7, "key":-15}\r
 ],\r
  "linkDataArray": [  ]}\r
  </textarea>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // what to do when a drag-drop occurs in the Diagram's background\r
      mouseDrop: e => finishDrop(e, null),\r
      // Diagram has simple horizontal layout\r
      layout: new go.GridLayout({\r
        wrappingWidth: Infinity,\r
        alignment: go.GridAlignment.Position,\r
        cellSize: new go.Size(1, 1)\r
      }),\r
      'commandHandler.archetypeGroupData': { isGroup: true, category: 'OfNodes' },\r
      'undoManager.isEnabled': true,\r
      // when a node is selected in the main Diagram, select the corresponding tree node\r
      ChangedSelection: e => {\r
        if (myChangingSelection) return;\r
        myChangingSelection = true;\r
        var diagnodes = new go.Set();\r
        myDiagram.selection.each(n => diagnodes.add(myTreeView.findNodeForData(n.data)));\r
        myTreeView.clearSelection();\r
        myTreeView.selectCollection(diagnodes);\r
        myChangingSelection = false;\r
      }\r
    });\r
\r
    var myChangingSelection = false; // to protect against recursive selection changes\r
\r
    // when the document is modified, add a "*" to the title and enable the "Save" button\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
    });\r
\r
    // There are two templates for Groups, "OfGroups" and "OfNodes".\r
\r
    // this function is used to highlight a Group that the selection may be dropped into\r
    function highlightGroup(e, grp, show) {\r
      if (!grp) return;\r
      e.handled = true;\r
      if (show) {\r
        // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;\r
        // instead depend on the DraggingTool.draggedParts or .copiedParts\r
        var tool = grp.diagram.toolManager.draggingTool;\r
        var map = tool.draggedParts || tool.copiedParts; // this is a Map\r
        // now we can check to see if the Group will accept membership of the dragged Parts\r
        if (grp.canAddMembers(map.toKeySet())) {\r
          grp.isHighlighted = true;\r
          return;\r
        }\r
      }\r
      grp.isHighlighted = false;\r
    }\r
\r
    // Upon a drop onto a Group, we try to add the selection as members of the Group.\r
    // Upon a drop onto the background, or onto a top-level Node, make selection top-level.\r
    // If this is OK, we're done; otherwise we cancel the operation to rollback everything.\r
    function finishDrop(e, grp) {\r
      var ok = grp !== null ? grp.addMembers(grp.diagram.selection, true) : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true);\r
      if (!ok) e.diagram.currentTool.doCancel();\r
    }\r
\r
    // common styling for Groups\r
    function groupStyle(grp) {\r
      grp.background = 'transparent';\r
      grp.ungroupable = true;  // allow the user to remove the Group while keeping its members\r
      // when selected, move the whole Group into the "Foreground" Layer\r
      grp.selectionChanged = g => {\r
        const newlay = g.isSelected ? "Foreground" : "";\r
        g.layerName = newlay;\r
        g.findSubGraphParts().each(m => m.layerName = newlay);\r
      };\r
      // highlight when dragging into the Group\r
      grp.mouseDragEnter = (e, grp, prev) => highlightGroup(e, grp, true);\r
      grp.mouseDragLeave = (e, grp, next) => highlightGroup(e, grp, false);\r
      grp.computesBoundsAfterDrag = true;\r
      grp.computesBoundsIncludingLocation = true;\r
      // when the selection is dropped into a Group, add the selected Parts into that Group;\r
      // if it fails, cancel the tool, rolling back any changes\r
      grp.mouseDrop = finishDrop;\r
      grp.handlesDragDropForMembers = true; // don't need to define handlers on member Nodes and Links\r
      grp.bindObject('background', 'isHighlighted', h => h ? 'rgba(255,0,0,0.2)' : 'transparent')\r
    }\r
\r
    myDiagram.groupTemplateMap.add('OfGroups',\r
      new go.Group("Auto", {\r
          // Groups containing Groups lay out their members horizontally\r
          layout: new go.GridLayout({\r
            wrappingWidth: Infinity,\r
            alignment: go.GridAlignment.Position,\r
            cellSize: new go.Size(1, 1),\r
            spacing: new go.Size(4, 4)\r
          })\r
        })\r
        .apply(groupStyle)\r
        .add(\r
          new go.Shape('Rectangle', { fill: null, stroke: '#E69900', strokeWidth: 2 }),\r
          new go.Panel('Vertical') // title above Placeholder\r
            .add(\r
              new go.Panel('Horizontal', { // button next to TextBlock\r
                  stretch: go.Stretch.Horizontal,\r
                  background: '#FFDD33',\r
                  margin: 1\r
                })\r
                .add(\r
                  go.GraphObject.build('SubGraphExpanderButton', { alignment: go.Spot.Right, margin: 5 }),\r
                  new go.TextBlock({\r
                      alignment: go.Spot.Left,\r
                      editable: true,\r
                      margin: 5,\r
                      font: 'bold 18px sans-serif',\r
                      stroke: '#9A6600'\r
                    })\r
                    .bindTwoWay('text')\r
                ), // end Horizontal Panel\r
              new go.Placeholder({ padding: 5, alignment: go.Spot.TopLeft })\r
            ) // end Vertical Panel\r
        )\r
    ); // end Group and call to add to template Map\r
\r
    myDiagram.groupTemplateMap.add('OfNodes',\r
      new go.Group("Auto", {\r
          // Groups containing Nodes lay out their members vertically\r
          layout: new go.GridLayout({\r
            wrappingColumn: 1,\r
            alignment: go.GridAlignment.Position,\r
            cellSize: new go.Size(1, 1),\r
            spacing: new go.Size(4, 4)\r
          })\r
        })\r
        .apply(groupStyle)\r
        .add(\r
          new go.Shape('Rectangle', { fill: null, stroke: '#0099CC', strokeWidth: 2 }),\r
          new go.Panel('Vertical') // title above Placeholder\r
            .add(\r
              new go.Panel('Horizontal', { // button next to TextBlock\r
                  stretch: go.Stretch.Horizontal,\r
                  background: '#33D3E5',\r
                  margin: 1\r
                })\r
                .add(\r
                  go.GraphObject.build('SubGraphExpanderButton', { alignment: go.Spot.Right, margin: 5 }),\r
                  new go.TextBlock({\r
                      alignment: go.Spot.Left,\r
                      editable: true,\r
                      margin: 5,\r
                      font: 'bold 16px sans-serif',\r
                      stroke: '#006080'\r
                    })\r
                    .bindTwoWay('text')\r
                ), // end Horizontal Panel\r
              new go.Placeholder({ padding: 5, alignment: go.Spot.TopLeft })\r
            ) // end Vertical Panel\r
        )\r
    ); // end Group and call to add to template Map\r
\r
    // Nodes have a trivial definition\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          // dropping on a Node is the same as dropping on its containing Group, even if it's top-level\r
          mouseDrop: (e, nod) => finishDrop(e, nod.containingGroup)\r
        })\r
        .add(\r
          new go.Shape('Rectangle', {\r
              fill: '#ACE600',\r
              stroke: '#558000',\r
              strokeWidth: 2\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              margin: 5,\r
              editable: true,\r
              font: 'bold 13px sans-serif',\r
              stroke: '#446700'\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    var myChangingModel = false; // to protect against recursive model changes\r
\r
    myDiagram.addModelChangedListener(e => {\r
      if (e.model.skipsUndoManager) return;\r
      if (myChangingModel) return;\r
      myChangingModel = true;\r
      // don't need to start/commit a transaction because the UndoManager is shared with myTreeView\r
      if (e.modelChange === 'nodeGroupKey' || e.modelChange === 'nodeParentKey') {\r
        // handle structural change: group memberships\r
        var treenode = myTreeView.findNodeForData(e.object);\r
        if (treenode !== null) treenode.updateRelationshipsFromData();\r
      } else if (e.change === go.ChangeType.Property) {\r
        var treenode = myTreeView.findNodeForData(e.object);\r
        if (treenode !== null) treenode.updateTargetBindings();\r
      } else if (e.change === go.ChangeType.Insert && e.propertyName === 'nodeDataArray') {\r
        // pretend the new data isn't already in the nodeDataArray for myTreeView\r
        myTreeView.model.nodeDataArray.splice(e.newParam, 1);\r
        // now add to the myTreeView model using the normal mechanisms\r
        myTreeView.model.addNodeData(e.newValue);\r
      } else if (e.change === go.ChangeType.Remove && e.propertyName === 'nodeDataArray') {\r
        // remove the corresponding node from myTreeView\r
        var treenode = myTreeView.findNodeForData(e.oldValue);\r
        if (treenode !== null) myTreeView.remove(treenode);\r
      }\r
      myChangingModel = false;\r
    });\r
\r
    // setup the tree view; will be initialized with data by the load() function\r
    myTreeView = new go.Diagram('myTreeView', {\r
      initialContentAlignment: go.Spot.TopLeft,\r
      allowMove: false, // don't let users mess up the tree\r
      allowCopy: true, // but you might want this to be false\r
      'commandHandler.copiesTree': true,\r
      'commandHandler.copiesParentKey': true,\r
      allowDelete: true, // but you might want this to be false\r
      'commandHandler.deletesTree': true,\r
      allowHorizontalScroll: false,\r
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
        arrangementSpacing: new go.Size(0, 0)\r
      }),\r
      // when a node is selected in the tree, select the corresponding node in the main diagram\r
      ChangedSelection: e => {\r
        if (myChangingSelection) return;\r
        myChangingSelection = true;\r
        var diagnodes = new go.Set();\r
        myTreeView.selection.each(n => diagnodes.add(myDiagram.findNodeForData(n.data)));\r
        myDiagram.clearSelection();\r
        myDiagram.selectCollection(diagnodes);\r
        myChangingSelection = false;\r
      }\r
    });\r
\r
    myTreeView.nodeTemplate =\r
      new go.Node({ selectionAdorned: false })\r
        .add(\r
          // no Adornment: instead change panel background color by binding to Node.isSelected\r
          go.GraphObject.build('TreeExpanderButton', {\r
            width: 14,\r
            'ButtonBorder.fill': 'white',\r
            'ButtonBorder.stroke': null,\r
            _buttonFillOver: 'rgba(0,128,255,0.25)',\r
            _buttonStrokeOver: null\r
          }),\r
          new go.Panel('Horizontal', { position: new go.Point(16, 0) })\r
            .bindObject('background', 'isSelected', s => s ? 'lightblue' : 'white')\r
            .add(\r
              // Icon is not needed?\r
              //new go.Picture(\r
              //  {\r
              //    width: 14, height: 14,\r
              //    margin: new go.Margin(0, 4, 0, 0),\r
              //    imageStretch: go.ImageStretch.Uniform,\r
              //    source: "images/50x40.png"\r
              //  }),\r
              new go.TextBlock({ editable: true })\r
                .bindTwoWay('text')\r
            ) // end Horizontal Panel\r
        ); // end Node\r
\r
    // without lines\r
    myTreeView.linkTemplate = new go.Link();\r
\r
    // cannot share the model itself, but can share all of the node data from the main Diagram,\r
    // pretending the "group" relationship is the "tree parent" relationship\r
    myTreeView.model = new go.TreeModel({ nodeParentKeyProperty: 'group' });\r
\r
    myTreeView.addModelChangedListener(e => {\r
      if (e.model.skipsUndoManager) return;\r
      if (myChangingModel) return;\r
      myChangingModel = true;\r
      // don't need to start/commit a transaction because the UndoManager is shared with myDiagram\r
      if (e.modelChange === 'nodeGroupKey' || e.modelChange === 'nodeParentKey') {\r
        // handle structural change: tree parent/children\r
        var node = myDiagram.findNodeForData(e.object);\r
        if (node !== null) node.updateRelationshipsFromData();\r
      } else if (e.change === go.ChangeType.Property) {\r
        // propagate simple data property changes back to the main Diagram\r
        var node = myDiagram.findNodeForData(e.object);\r
        if (node !== null) node.updateTargetBindings();\r
      } else if (e.change === go.ChangeType.Insert && e.propertyName === 'nodeDataArray') {\r
        // pretend the new data isn't already in the nodeDataArray for the main Diagram model\r
        myDiagram.model.nodeDataArray.splice(e.newParam, 1);\r
        // now add to the myDiagram model using the normal mechanisms\r
        myDiagram.model.addNodeData(e.newValue);\r
      } else if (e.change === go.ChangeType.Remove && e.propertyName === 'nodeDataArray') {\r
        // remove the corresponding node from the main Diagram\r
        var node = myDiagram.findNodeForData(e.oldValue);\r
        if (node !== null) myDiagram.remove(node);\r
      }\r
      myChangingModel = false;\r
    });\r
\r
    load();\r
  }\r
\r
  // save a model to and load a model from JSON text, displayed below the Diagram\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
\r
    // share all of the data with the tree view\r
    myTreeView.model.nodeDataArray = myDiagram.model.nodeDataArray;\r
\r
    // share the UndoManager too!\r
    myTreeView.model.undoManager = myDiagram.model.undoManager;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates the synchronization of two different models, necessitated by their being different types:\r
    <a>TreeModel</a> for the tree view and <a>GraphLinksModel</a> for the general diagram on the right. Normally in such situations one would have a single\r
    model with two diagrams showing the shared model. However in this case there are two separate models but the model data, including the\r
    <a>Model.nodeDataArray</a>, are shared. That means the "group" property is used in the normal fashion in the GraphLinksModel but is used as the "parent"\r
    reference in the TreeModel.\r
  </p>\r
  <p>\r
    That introduces some complications when there are changes to the data, since they need to be reflected in other other model even though the data properties\r
    have already been changed! This is accomplished by having a Model Changed listener on each model that explicitly updates the other model.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`gridlayout`,`treelayout`,`groups`,`buttons`,`commands`];var g=y();l(`1c4d8om`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};