import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Mind Map Diagram`,titleShort:`Mind Map Editor`,indexDescription:`A Mind Map, a double-tree whose nodes have an 'add' button when selected and a context menu.`,screenshot:`mindmap`,priority:2,tags:[`collections`,`treelayout`,`contextmenus`,`buttons`,`commands`],description:`A mind map editor, showing how subtrees can be moved, copied, deleted, and laid out.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 300px"></div>\r
  <button onclick="layoutAll()">Diagram Layout</button>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 400px">\r
{ "class": "go.TreeModel",\r
  "nodeDataArray": [\r
{"key":0, "text":"Mind Map", "loc":"0 0"},\r
{"key":1, "parent":0, "text":"Getting more time", "brush":"skyblue", "dir":"right"},\r
{"key":11, "parent":1, "text":"Wake up early", "brush":"skyblue", "dir":"right"},\r
{"key":12, "parent":1, "text":"Delegate", "brush":"skyblue", "dir":"right"},\r
{"key":13, "parent":1, "text":"Simplify", "brush":"skyblue", "dir":"right"},\r
{"key":2, "parent":0, "text":"More effective use", "brush":"darkseagreen", "dir":"right"},\r
{"key":21, "parent":2, "text":"Planning", "brush":"darkseagreen", "dir":"right"},\r
{"key":211, "parent":21, "text":"Priorities", "brush":"darkseagreen", "dir":"right"},\r
{"key":212, "parent":21, "text":"Ways to focus", "brush":"darkseagreen", "dir":"right"},\r
{"key":22, "parent":2, "text":"Goals", "brush":"darkseagreen", "dir":"right"},\r
{"key":3, "parent":0, "text":"Time wasting", "brush":"palevioletred", "dir":"left"},\r
{"key":31, "parent":3, "text":"Too many meetings", "brush":"palevioletred", "dir":"left"},\r
{"key":32, "parent":3, "text":"Too much time spent on details", "brush":"palevioletred", "dir":"left"},\r
{"key":33, "parent":3, "text":"Message fatigue", "brush":"palevioletred", "dir":"left"},\r
{"key":331, "parent":31, "text":"Check messages less", "brush":"palevioletred", "dir":"left"},\r
{"key":332, "parent":31, "text":"Message filters", "brush":"palevioletred", "dir":"left"},\r
{"key":4, "parent":0, "text":"Key issues", "brush":"coral", "dir":"left"},\r
{"key":41, "parent":4, "text":"Methods", "brush":"coral", "dir":"left"},\r
{"key":42, "parent":4, "text":"Deadlines", "brush":"coral", "dir":"left"},\r
{"key":43, "parent":4, "text":"Checkpoints", "brush":"coral", "dir":"left"}\r
 ]\r
}\r
  </textarea>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      padding: 14,\r
      // when the user drags a node, also move/copy/delete the whole subtree starting with that node\r
      'commandHandler.copiesTree': true,\r
      'commandHandler.copiesParentKey': true,\r
      'commandHandler.deletesTree': true,\r
      'draggingTool.dragsTree': true,\r
      'undoManager.isEnabled': true\r
    });\r
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
    // a node consists of some text with a line shape underneath\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', { selectionObjectName: 'TEXT' })\r
        // remember the locations of each node in the node data\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        // make sure text "grows" in the desired direction\r
        .bind('locationSpot', 'dir', d => spotConverter(d, false))\r
        .add(\r
          new go.TextBlock({\r
              name: 'TEXT',\r
              minSize: new go.Size(30, 15),\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
            .bindTwoWay('scale')\r
            .bindTwoWay('font'),\r
          new go.Shape('LineH', {\r
              stretch: go.Stretch.Horizontal,\r
              strokeWidth: 3,\r
              height: 3,\r
              // this line shape is the port -- what links connect with\r
              portId: '',\r
              fromSpot: go.Spot.LeftRightSides,\r
              toSpot: go.Spot.LeftRightSides\r
            })\r
            .bind('stroke', 'brush')\r
            // make sure links come in from the proper direction and go out appropriately\r
            .bind('fromSpot', 'dir', d => spotConverter(d, true))\r
            .bind('toSpot', 'dir', d => spotConverter(d, false))\r
        );\r
\r
    // selected nodes show a button for adding children\r
    myDiagram.nodeTemplate.selectionAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              // this Adornment has a rectangular blue Shape around the selected node\r
              new go.Shape({ fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),\r
              new go.Placeholder({ margin: new go.Margin(4, 2, 0, 4) })\r
            ),\r
          // and this Adornment has a Button to the right of the selected node\r
          go.GraphObject.build('Button', {\r
              alignment: go.Spot.Right,\r
              alignmentFocus: go.Spot.Left,\r
              click: addNodeAndLink // define click behavior for this Button in the Adornment\r
            })\r
            .add( // the Button content\r
              new go.TextBlock('+', { font: 'bold 8pt sans-serif' })\r
            )\r
        );\r
\r
    // the context menu allows users to change the font size and weight,\r
    // and to perform a limited tree layout starting at that node\r
    myDiagram.nodeTemplate.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => changeTextSize(obj, 1.1)\r
            })\r
            .add(new go.TextBlock('Bigger')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => changeTextSize(obj, 1 / 1.1)\r
            })\r
            .add(new go.TextBlock('Smaller')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => toggleTextWeight(obj)\r
            })\r
            .add(new go.TextBlock('Bold/Normal')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.copySelection()\r
            })\r
            .add(new go.TextBlock('Copy')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.deleteSelection()\r
            })\r
            .add(new go.TextBlock('Delete')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.undo()\r
            })\r
            .add(new go.TextBlock('Undo')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.redo()\r
            })\r
            .add(new go.TextBlock('Redo')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => {\r
                var adorn = obj.part;\r
                adorn.diagram.startTransaction('Subtree Layout');\r
                layoutTree(adorn.adornedPart);\r
                adorn.diagram.commitTransaction('Subtree Layout');\r
              }\r
            })\r
            .add(new go.TextBlock('Layout'))\r
        );\r
\r
    // a link is just a Bezier-curved line of the same color as the node to which it is connected\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          curve: go.Curve.Bezier,\r
          fromShortLength: -2,\r
          toShortLength: -2,\r
          selectable: false\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 3 })\r
            .bindObject('stroke', 'toNode', n => {\r
              if (n.data.brush) return n.data.brush;\r
              return 'black';\r
            })\r
        );\r
\r
    // the Diagram's context menu just displays commands for general functionality\r
    myDiagram.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint)\r
            })\r
            .bindObject('visible', '',\r
              o => o.diagram && o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint)\r
            )\r
            .add(new go.TextBlock('Paste')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.undo()\r
            })\r
            .bindObject('visible', '', o => o.diagram && o.diagram.commandHandler.canUndo())\r
            .add(new go.TextBlock('Undo')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.redo()\r
            })\r
            .bindObject('visible', '', o => o.diagram && o.diagram.commandHandler.canRedo())\r
            .add(new go.TextBlock('Redo')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => save()\r
            })\r
            .add(new go.TextBlock('Save')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => load()\r
            })\r
            .add(new go.TextBlock('Load'))\r
        );\r
\r
    myDiagram.addDiagramListener('SelectionMoved', e => {\r
      var rootX = myDiagram.findNodeForKey(0).location.x;\r
      myDiagram.selection.each(node => {\r
        if (node.data.parent !== 0) return; // Only consider nodes connected to the root\r
        var nodeX = node.location.x;\r
        if (rootX < nodeX && node.data.dir !== 'right') {\r
          updateNodeDirection(node, 'right');\r
        } else if (rootX > nodeX && node.data.dir !== 'left') {\r
          updateNodeDirection(node, 'left');\r
        }\r
        layoutTree(node);\r
      });\r
    });\r
\r
    // read in the predefined graph using the JSON format data held in the "mySavedModel" textarea\r
    load();\r
  }\r
\r
  function spotConverter(dir, from) {\r
    if (dir === 'left') {\r
      return from ? go.Spot.Left : go.Spot.Right;\r
    } else {\r
      return from ? go.Spot.Right : go.Spot.Left;\r
    }\r
  }\r
\r
  function changeTextSize(obj, factor) {\r
    var adorn = obj.part;\r
    adorn.diagram.startTransaction('Change Text Size');\r
    var node = adorn.adornedPart;\r
    var tb = node.findObject('TEXT');\r
    tb.scale *= factor;\r
    adorn.diagram.commitTransaction('Change Text Size');\r
  }\r
\r
  function toggleTextWeight(obj) {\r
    var adorn = obj.part;\r
    adorn.diagram.startTransaction('Change Text Weight');\r
    var node = adorn.adornedPart;\r
    var tb = node.findObject('TEXT');\r
    // assume "bold" is at the start of the font specifier\r
    var idx = tb.font.indexOf('bold');\r
    if (idx < 0) {\r
      tb.font = 'bold ' + tb.font;\r
    } else {\r
      tb.font = tb.font.slice(idx + 5);\r
    }\r
    adorn.diagram.commitTransaction('Change Text Weight');\r
  }\r
\r
  function updateNodeDirection(node, dir) {\r
    myDiagram.model.set(node.data, 'dir', dir);\r
    // recursively update the direction of the child nodes\r
    var chl = node.findTreeChildrenNodes(); // gives us an iterator of the child nodes related to this particular node\r
    while (chl.next()) {\r
      updateNodeDirection(chl.value, dir);\r
    }\r
  }\r
\r
  function addNodeAndLink(e, obj) {\r
    var adorn = obj.part;\r
    var diagram = adorn.diagram;\r
    diagram.startTransaction('Add Node');\r
    var oldnode = adorn.adornedPart;\r
    var olddata = oldnode.data;\r
    // copy the brush and direction to the new node data\r
    var newdata = { text: 'idea', brush: olddata.brush, dir: olddata.dir, parent: olddata.key };\r
    diagram.model.addNodeData(newdata);\r
    layoutTree(oldnode);\r
    diagram.commitTransaction('Add Node');\r
\r
    // if the new node is off-screen, scroll the diagram to show the new node\r
    var newnode = diagram.findNodeForData(newdata);\r
    if (newnode !== null) {\r
      if (!diagram.viewportBounds.containsRect(newnode.actualBounds)) {\r
        diagram.commandHandler.scrollToPart(newnode);\r
      }\r
    }\r
  }\r
\r
  function layoutTree(node) {\r
    if (node.isTreeRoot) {  // is this a root node?\r
      // adding to the root?\r
      layoutAll(); // lay out everything\r
    } else {\r
      // otherwise lay out only the subtree starting at this parent node\r
      var parts = node.findTreeParts();\r
      layoutAngle(parts, node.data.dir === 'left' ? 180 : 0);\r
    }\r
  }\r
\r
  function layoutAngle(parts, angle) {\r
    var layout = new go.TreeLayout({\r
      angle: angle,\r
      arrangement: go.TreeArrangement.FixedRoots,\r
      nodeSpacing: 5,\r
      layerSpacing: 20,\r
      setsPortSpot: false, // don't set port spots since we're managing them with our spotConverter function\r
      setsChildPortSpot: false\r
    });\r
    layout.doLayout(parts);\r
  }\r
\r
  function layoutAll() {\r
    var root = myDiagram.findTreeRoots().first();\r
    if (root === null) return;\r
    myDiagram.startTransaction('Layout');\r
    // split the nodes and links into two collections\r
    var rightward = new go.Set(/*go.Part*/);\r
    var leftward = new go.Set(/*go.Part*/);\r
    root.findLinksConnected().each(link => {\r
      var child = link.toNode;\r
      if (child.data.dir === 'left') {\r
        leftward.add(root); // the root node is in both collections\r
        leftward.add(link);\r
        leftward.addAll(child.findTreeParts());\r
      } else {\r
        rightward.add(root); // the root node is in both collections\r
        rightward.add(link);\r
        rightward.addAll(child.findTreeParts());\r
      }\r
    });\r
    // do one layout and then the other without moving the shared root node\r
    layoutAngle(rightward, 0);\r
    layoutAngle(leftward, 180);\r
    myDiagram.commitTransaction('Layout');\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
    // if any nodes don't have locations assigned from the model, force a layout of everything\r
    if (myDiagram.nodes.any(n => !n.location.isReal())) layoutAll();\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>A mind map is a kind of spider diagram that organizes information around a central concept, with connecting branches.</p>\r
  <p>\r
    The layout is controlled by moving the nodes closest to the tree's root node. When one of these nodes is moved horizontally to the other side of the root,\r
    all of its children will be sent to <a>Layout.doLayout</a> with a new direction, causing text to always be moved outwards from the root. The\r
    <b>spotConverter</b> function is used to manage <a>GraphObject.fromSpot</a> and <a>GraphObject.toSpot</a> for nodes manually, so the\r
    <a>TreeLayout.setsPortSpot</a> and <a>TreeLayout.setsChildPortSpot</a>\r
    properties are set to false so that laying out the diagram will not overwrite the values.\r
  </p>\r
  <p>\r
    When a node is deleted the <a>CommandHandler.deletesTree</a> property ensures that all of its children are deleted with it. When a node is dragged the\r
    <a>DraggingTool.dragsTree</a>\r
    property ensures that all its children are dragged with it. Both of these are set during the the Diagram's initalization.\r
  </p>\r
  <p>\r
    Node templates also have a <a>Part.selectionAdornmentTemplate</a> defined to allow for new nodes to be created and a <a>GraphObject.contextMenu</a> with\r
    additional commands.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`treelayout`,`contextmenus`,`buttons`,`commands`];var g=y();l(`tluxu1`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};