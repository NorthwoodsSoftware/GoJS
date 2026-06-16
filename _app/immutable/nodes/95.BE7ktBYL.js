import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Block Diagram Editor`,titleShort:`Block Diagram Editor`,indexDescription:`A simple block diagram editor that makes it easy for the user to chain together new nodes, with
context menus for changing shapes and colors.`,screenshot:`blockeditor`,priority:1.5,tags:[`geometries`,`commands`],description:`A simple block diagram editor that includes context menus for changing shapes and colors.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "GraphLinksModel",\r
  "pointsDigits": 0,\r
  "nodeDataArray": [\r
{"text":"Find Problem","key":-9,"loc":"-20 -140","color":"#3358ff","fill":"white","figure":"Procedure","thickness":3},\r
{"text":"What do we want?","key":-10,"loc":"-110 -320","group":-16,"figure":"Ellipse","fill":"white"},\r
{"text":"What do our users want?","key":-11,"loc":"70 -320","group":-20,"figure":"Ellipse","fill":"#ffffff","color":"black"},\r
{"text":"Meetings","key":-12,"loc":"-110 -440","group":-16,"figure":"TriangleDown","fill":"#ffffff"},\r
{"text":"Reviews","key":-13,"loc":"70 -440","group":-20,"figure":"TriangleDown","fill":"#ffffff","color":"black"},\r
{"text":"Can we solve it?","key":-14,"loc":"190 -140","color":"#7d33ff","fill":"#ffffff","figure":"Diamond","size":"140 80","thickness":3},\r
{"text":"Design Prototype","key":-7,"loc":"337.191 -440","color":"black","fill":"#f2dfe0","group":-17,"figure":"Procedure","size":"140 80"},\r
{"text":"Does it work?","key":-8,"loc":"337.191 -300","color":"black","fill":"#f2dfe0","group":-17,"figure":"Diamond","size":"140 80"},\r
{"text":"Market/Sell\\nSolution","key":-15,"loc":"470 -157.5","color":"#25ad23","fill":"#ffffff","group":-19,"figure":"Rectangle","size":"120 60"},\r
{"isGroup":true,"text":"Problem-Solving Process","key":-17,"loc":"365.40458203125 -370","fill":"#fcbbbd","thickness":3,"color":"#000000"},\r
{"text":"Implement \\nSolution","key":-18,"loc":"470 -82.5","color":"#25ad23","fill":"#ffffff","group":-19,"figure":"Rectangle","size":"120 60"},\r
{"isGroup":true,"text":"Internal","key":-16,"loc":"-110 -380","fill":"#d5ebff","dash":null,"thickness":1,"group":-22},\r
{"isGroup":true,"text":"External","key":-20,"loc":"70 -380","fill":"#d5ebff","dash":null,"thickness":1,"group":-22},\r
{"isGroup":true,"text":"Distribute Solution","key":-19,"loc":"470 -120","fill":"#b3e6b3","thickness":2,"dash":[4,4]},\r
{"text":"Yes!","key":-21,"loc":"350 -120","size":"60 40","figure":"ManualOperation","fill":"#ffffff","color":"#25ad23","thickness":3},\r
{"isGroup":true,"text":"Sources","key":-22,"loc":"-20 -388.66328125","fill":"#a5d2fa","dash":[4,4],"color":"#3358ff"}\r
  ],\r
    "linkDataArray": [\r
{"from":-12,"to":-10,"points":[-110,-410,-110,-400,-110,-380,-110,-380,-110,-360,-110,-350],"dash":null,"dir":1},\r
{"from":-13,"to":-11,"points":[70,-410,70,-400,70,-380,70,-380,70,-360,70,-350],"dash":null,"color":"#000000","dir":1},\r
{"from":-10,"to":-9,"points":[-110,-290,-110,-280,-110,-230,-40,-230,-40,-180,-40,-170],"dir":2,"dash":[4,4]},\r
{"from":-11,"to":-9,"points":[70,-290,70,-280,70,-230,0,-230,0,-180,0,-170],"dash":[4,4],"dir":2},\r
{"from":-9,"to":-14,"points":[40,-140,50,-140,80,-140,80,-140,110,-140,120,-140],"dir":1,"color":"#3358ff"},\r
{"from":-14,"to":-9,"points":[190,-100,190,-90,190,-72.39579391479492,-20,-72.39579391479492,-20,-100,-20,-110],"fromSpot":"BottomSide","toSpot":"BottomSide","text":"No","color":"#ff3333","thickness":2,"dir":1},\r
{"from":-14,"to":-7,"points":[190,-180,190,-190,190,-440,223.5955,-440,257.191,-440,267.191,-440],"fromSpot":"TopSide","toSpot":"LeftSide","color":"#7d33ff","dir":1},\r
{"from":-7,"to":-8,"points":[337.191,-400,337.191,-390,337.191,-370,337.191,-370,337.191,-350,337.191,-340],"dir":1},\r
{"from":-8,"to":-15,"points":[360.5243333333333,-260,360.5243333333333,-250,360.5243333333333,-157.5,380.26216666666664,-157.5,400,-157.5,410,-157.5],"toSpot":"LeftSide","dir":1},\r
{"from":-8,"to":-18,"points":[313.85766666666666,-260,313.85766666666666,-242,313.85766666666666,-82.5,356.92883333333333,-82.5,400,-82.5,410,-82.5],"toSpot":"LeftSide","fromSpot":"BottomSide","text":"","dir":1},\r
{"from":-8,"to":-7,"points":[407.191,-300,417.191,-300,443,-300,443,-440,417.191,-440,407.191,-440],"toSpot":"RightSide","fromSpot":"RightSide","text":"No\\n","color":"#ff3333","dir":1},\r
{"from":-15,"to":-13,"points":[530,-157.5,540,-157.5,563.3333740234375,-157.5,563.3333740234375,-557.7291679382324,182.66668701171875,-557.7291679382324,182.66668701171875,-440,140,-440,130,-440],"toSpot":"RightSide","fromSpot":"RightSide","dash":[2,4],"dir":1},\r
{"from":-18,"to":-12,"points":[530,-82.5,540,-82.5,587.3333740234375,-82.5,587.3333740234375,-579.0624961853027,-238.66665649414062,-579.0624961853027,-238.66665649414062,-440,-180,-440,-170,-440],"fromSpot":"RightSide","toSpot":"LeftSide","dash":[2,4],"dir":1}\r
  ]}\r
  </textarea>`,jsCode:`function init() {\r
    // Colors are predefined to allow easy manipulation of themes\r
    const colors = {\r
      red: '#ff3333',\r
      blue: '#3358ff',\r
      green: '#25ad23',\r
      magenta: '#d533ff',\r
      purple: '#7d33ff',\r
      orange: '#ff6233',\r
      brown: '#8e571e',\r
      white: '#ffffff',\r
      black: '#000000',\r
      beige: '#fffcd5',\r
      extralightblue: '#d5ebff',\r
      extralightred: '#f2dfe0',\r
      lightblue: '#a5d2fa',\r
      lightgray: '#cccccc',\r
      lightgreen: '#b3e6b3',\r
      lightred: '#fcbbbd'\r
    };\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      padding: 20, // extra space when scrolled all the way\r
      grid:\r
        new go.Panel('Grid') // a simple 10x10 grid\r
          .add(\r
            new go.Shape('LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),\r
            new go.Shape('LineV', { stroke: 'lightgray', strokeWidth: 0.5 })\r
          ),\r
      'draggingTool.isGridSnapEnabled': true,\r
      handlesDragDropForTopLevelParts: true,\r
      mouseDrop: e => {\r
        // when the selection is dropped in the diagram's background,\r
        // make sure the selected Parts no longer belong to any Group\r
        var ok = e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true);\r
        if (!ok) e.diagram.currentTool.doCancel();\r
      },\r
      commandHandler: new DrawCommandHandler(), // support offset copy-and-paste\r
      // create a new node by double-clicking in background\r
      'clickCreatingTool.archetypeNodeData': { text: 'NEW NODE' },\r
      PartCreated: e => {\r
        var node = e.subject; // the newly inserted Node -- now need to snap its location to the grid\r
        node.location =\r
          node.location.copy()\r
            .snapToGridPoint(e.diagram.grid.gridOrigin, e.diagram.grid.gridCellSize);\r
        setTimeout(() => {\r
          // and have the user start editing its text\r
          e.diagram.commandHandler.editTextBlock();\r
        }, 20);\r
      },\r
      'commandHandler.archetypeGroupData': { isGroup: true, text: 'NEW GROUP' },\r
      SelectionGrouped: e => {\r
        var group = e.subject;\r
        setTimeout(() => {\r
          // and have the user start editing its text\r
          e.diagram.commandHandler.editTextBlock();\r
        });\r
      },\r
      LinkRelinked: e => {\r
        // re-spread the connections of other links connected with both old and new nodes\r
        var oldnode = e.parameter.part;\r
        oldnode.invalidateConnectedLinks();\r
        var link = e.subject;\r
        if (e.diagram.toolManager.linkingTool.isForwards) {\r
          link.toNode.invalidateConnectedLinks();\r
        } else {\r
          link.fromNode.invalidateConnectedLinks();\r
        }\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
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
    // Node template\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          locationObjectName: 'SHAPE',\r
          desiredSize: new go.Size(120, 60),\r
          minSize: new go.Size(40, 40),\r
          resizable: true,\r
          resizeCellSize: new go.Size(20, 20)\r
        })\r
        // these Bindings are TwoWay because the DraggingTool and ResizingTool modify the target properties\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        .add(\r
          new go.Shape({\r
              // the border\r
              name: 'SHAPE',\r
              fill: colors.white,\r
              cursor: 'pointer',\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true,\r
              fromLinkableDuplicates: true,\r
              toLinkableDuplicates: true,\r
              fromSpot: go.Spot.AllSides,\r
              toSpot: go.Spot.AllSides\r
            })\r
            .bind('figure')\r
            .bind('fill')\r
            .bind('stroke', 'color')\r
            .bind('strokeWidth', 'thickness')\r
            .bind('strokeDashArray', 'dash'),\r
        // this Shape prevents mouse events from reaching the middle of the port\r
          new go.Shape({ width: 100, height: 40, strokeWidth: 0, fill: 'transparent' }),\r
          new go.TextBlock({\r
              margin: 1,\r
              textAlign: 'center',\r
              overflow: go.TextOverflow.Ellipsis,\r
              editable: true\r
            })\r
            // this Binding is TwoWay due to the user editing the text with the TextEditingTool\r
            .bindTwoWay('text')\r
            .bind('stroke', 'color')\r
        );\r
\r
    myDiagram.nodeTemplate.toolTip =\r
      go.GraphObject.build('ToolTip') // show some detailed information\r
        .add(\r
          new go.Panel('Vertical', { maxSize: new go.Size(200, NaN) }) // limit width but not height\r
            .add(\r
              new go.TextBlock({ font: 'bold 10pt sans-serif', textAlign: 'center' })\r
                .bind('text'),\r
              new go.TextBlock({ font: '10pt sans-serif', textAlign: 'center' })\r
                .bind('text', 'details')\r
            )\r
        );\r
\r
    // Node selection adornment\r
    // Include four large triangular buttons so that the user can easily make a copy\r
    // of the node, move it to be in that direction relative to the original node,\r
    // and add a link to the new node.\r
\r
    function makeArrowButton(spot, fig) {\r
      var maker = (e, shape) => {\r
        e.handled = true;\r
        e.diagram.model.commit(m => {\r
          var selnode = shape.part.adornedPart;\r
          // create a new node in the direction of the spot\r
          var p = new go.Point().setRectSpot(selnode.actualBounds, spot);\r
          p.subtract(selnode.location);\r
          p.scale(2, 2);\r
          p.x += Math.sign(p.x) * 30;\r
          p.y += Math.sign(p.y) * 30;\r
          p.add(selnode.location);\r
          p.snapToGridPoint(e.diagram.grid.gridOrigin, e.diagram.grid.gridCellSize);\r
          // make the new node a copy of the selected node\r
          var nodedata = m.copyNodeData(selnode.data);\r
          // add to same group as selected node\r
          m.setGroupKeyForNodeData(nodedata, m.getGroupKeyForNodeData(selnode.data));\r
          m.addNodeData(nodedata); // add to model\r
          // create a link from the selected node to the new node\r
          var linkdata = { from: selnode.key, to: m.getKeyForNodeData(nodedata) };\r
          m.addLinkData(linkdata); // add to model\r
          // move the new node to the computed location, select it, and start to edit it\r
          var newnode = e.diagram.findNodeForData(nodedata);\r
          newnode.location = p;\r
          e.diagram.select(newnode);\r
          setTimeout(() => {\r
            e.diagram.commandHandler.editTextBlock();\r
          }, 20);\r
        });\r
      };\r
      return new go.Shape({\r
        figure: fig,\r
        alignment: spot,\r
        alignmentFocus: spot.opposite(),\r
        width: spot.equals(go.Spot.Top) || spot.equals(go.Spot.Bottom) ? 25 : 18,\r
        height: spot.equals(go.Spot.Top) || spot.equals(go.Spot.Bottom) ? 18 : 25,\r
        fill: 'orange',\r
        stroke: colors.white,\r
        strokeWidth: 4,\r
        mouseEnter: (e, shape) => (shape.fill = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.fill = 'orange'),\r
        isActionable: true, // needed because it's in an Adornment\r
        click: maker,\r
        contextClick: maker\r
      });\r
    }\r
\r
    // create a button that brings up the context menu\r
    function CMButton(options) {\r
      return new go.Shape({\r
          fill: 'orange',\r
          stroke: 'rgba(0, 0, 0, 0)',\r
          strokeWidth: 15,\r
          background: 'transparent',\r
          geometryString: 'F1 M0 0 b 0 360 -4 0 4 z M10 0 b 0 360 -4 0 4 z M20 0 b 0 360 -4 0 4', // M10 0 A2 2 0 1 0 14 10 M20 0 A2 2 0 1 0 24 10,\r
          isActionable: true,\r
          cursor: 'context-menu',\r
          mouseEnter: (e, shape) => (shape.fill = 'dodgerblue'),\r
          mouseLeave: (e, shape) => (shape.fill = 'orange'),\r
          click: (e, shape) => {\r
            e.diagram.commandHandler.showContextMenu(shape.part.adornedPart);\r
          }\r
        },\r
        options || {}\r
      );\r
    }\r
\r
    myDiagram.nodeTemplate.selectionAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Placeholder({ padding: 10 }),\r
          makeArrowButton(go.Spot.Top, 'TriangleUp'),\r
          makeArrowButton(go.Spot.Left, 'TriangleLeft'),\r
          makeArrowButton(go.Spot.Right, 'TriangleRight'),\r
          makeArrowButton(go.Spot.Bottom, 'TriangleDown'),\r
          CMButton({ alignment: new go.Spot(0.75, 0) })\r
        );\r
\r
    // Common context menu button definitions\r
\r
    // All buttons in context menu work on both click and contextClick,\r
    // in case the user context-clicks on the button.\r
    // All buttons modify the node data, not the Node, so the Bindings need not be TwoWay.\r
\r
    // A button-defining helper function that returns a click event handler.\r
    // PROPNAME is the name of the data property that should be set to the given VALUE.\r
    function ClickFunction(propname, value) {\r
      return (e, obj) => {\r
        e.handled = true; // don't let the click bubble up\r
        e.diagram.model.commit(m => {\r
          m.set(obj.part.adornedPart.data, propname, value);\r
        });\r
      };\r
    }\r
\r
    // Create a context menu button for setting a data property with a color value.\r
    function ColorButton(color, propname) {\r
      if (!propname) propname = 'color';\r
      return new go.Shape({\r
        width: 16,\r
        height: 16,\r
        stroke: 'lightgray',\r
        fill: color,\r
        margin: 1,\r
        background: 'transparent',\r
        mouseEnter: (e, shape) => (shape.stroke = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.stroke = 'lightgray'),\r
        click: ClickFunction(propname, color),\r
        contextClick: ClickFunction(propname, color)\r
      });\r
    }\r
\r
    function LightFillButtons() {\r
      // used by multiple context menus\r
      return [\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(\r
            new go.Panel('Horizontal')\r
              .add(\r
                ColorButton(colors.white, 'fill'),\r
                ColorButton(colors.beige, 'fill'),\r
                ColorButton(colors.extralightblue, 'fill'),\r
                ColorButton(colors.extralightred, 'fill')\r
              )\r
          ),\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(\r
            new go.Panel('Horizontal')\r
              .add(\r
                ColorButton(colors.lightgray, 'fill'),\r
                ColorButton(colors.lightgreen, 'fill'),\r
                ColorButton(colors.lightblue, 'fill'),\r
                ColorButton(colors.lightred, 'fill')\r
              )\r
          )\r
      ];\r
    }\r
\r
    function DarkColorButtons() {\r
      // used by multiple context menus\r
      return [\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(\r
            new go.Panel('Horizontal')\r
              .add(\r
                ColorButton(colors.black),\r
                ColorButton(colors.green),\r
                ColorButton(colors.blue),\r
                ColorButton(colors.red)\r
              )\r
          ),\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(\r
            new go.Panel('Horizontal')\r
              .add(\r
                ColorButton(colors.white),\r
                ColorButton(colors.magenta),\r
                ColorButton(colors.purple),\r
                ColorButton(colors.orange)\r
              )\r
          )\r
      ];\r
    }\r
\r
    // Create a context menu button for setting a data property with a stroke width value.\r
    function ThicknessButton(sw, propname) {\r
      if (!propname) propname = 'thickness';\r
      return new go.Shape('LineH', {\r
        width: 16,\r
        height: 16,\r
        strokeWidth: sw,\r
        margin: 1,\r
        background: 'transparent',\r
        mouseEnter: (e, shape) => (shape.background = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.background = 'transparent'),\r
        click: ClickFunction(propname, sw),\r
        contextClick: ClickFunction(propname, sw)\r
      });\r
    }\r
\r
    // Create a context menu button for setting a data property with a stroke dash Array value.\r
    function DashButton(dash, propname) {\r
      if (!propname) propname = 'dash';\r
      return new go.Shape('LineH', {\r
        width: 24,\r
        height: 16,\r
        strokeWidth: 2,\r
        strokeDashArray: dash,\r
        margin: 1,\r
        background: 'transparent',\r
        mouseEnter: (e, shape) => (shape.background = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.background = 'transparent'),\r
        click: ClickFunction(propname, dash),\r
        contextClick: ClickFunction(propname, dash)\r
      });\r
    }\r
\r
    function StrokeOptionsButtons() {\r
      // used by multiple context menus\r
      return [\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(\r
            new go.Panel('Horizontal')\r
              .add(\r
                ThicknessButton(1),\r
                ThicknessButton(2),\r
                ThicknessButton(3),\r
                ThicknessButton(4)\r
              )\r
          ),\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(\r
            new go.Panel('Horizontal')\r
              .add(\r
                DashButton(null),\r
                DashButton([2, 4]),\r
                DashButton([4, 4])\r
              )\r
          )\r
      ];\r
    }\r
\r
    // Node context menu\r
\r
    function FigureButton(fig, propname) {\r
      if (!propname) propname = 'figure';\r
      return new go.Shape({\r
        width: 32,\r
        height: 32,\r
        scale: 0.5,\r
        fill: 'lightgray',\r
        figure: fig,\r
        margin: 1,\r
        background: 'transparent',\r
        mouseEnter: (e, shape) => (shape.fill = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.fill = 'lightgray'),\r
        click: ClickFunction(propname, fig),\r
        contextClick: ClickFunction(propname, fig)\r
      });\r
    }\r
\r
    myDiagram.nodeTemplate.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          go.GraphObject.build('ContextMenuButton')\r
            .add(\r
              new go.Panel('Horizontal')\r
                .add(\r
                  FigureButton('Rectangle'),\r
                  FigureButton('RoundedRectangle'),\r
                  FigureButton('Ellipse'),\r
                  FigureButton('Diamond')\r
                )\r
            ),\r
          go.GraphObject.build('ContextMenuButton')\r
            .add(\r
              new go.Panel('Horizontal')\r
                .add(\r
                  FigureButton('Parallelogram2'),\r
                  FigureButton('ManualOperation'),\r
                  FigureButton('Procedure'),\r
                  FigureButton('Cylinder1')\r
                )\r
            ),\r
          go.GraphObject.build('ContextMenuButton')\r
            .add(\r
              new go.Panel('Horizontal')\r
                .add(\r
                  FigureButton('Terminator'),\r
                  FigureButton('CreateRequest'),\r
                  FigureButton('Document'),\r
                  FigureButton('TriangleDown')\r
                )\r
            ),\r
          ...LightFillButtons(),\r
          ...DarkColorButtons(),\r
          ...StrokeOptionsButtons()\r
        );\r
\r
    // Group template\r
\r
    myDiagram.groupTemplate =\r
      new go.Group('Spot', {\r
          layerName: 'Background',\r
          ungroupable: true,\r
          locationSpot: go.Spot.Center,\r
          selectionObjectName: 'BODY',\r
          computesBoundsAfterDrag: true, // allow dragging out of a Group that uses a Placeholder\r
          handlesDragDropForMembers: true, // don't need to define handlers on Nodes and Links\r
          mouseDrop: (e, grp) => {\r
            // add dropped nodes as members of the group\r
            var ok = grp.addMembers(grp.diagram.selection, true);\r
            if (!ok) grp.diagram.currentTool.doCancel();\r
          },\r
          avoidable: false\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Auto', { name: 'BODY' })\r
            .add(\r
              new go.Shape({\r
                  parameter1: 10,\r
                  fill: colors.white,\r
                  strokeWidth: 2,\r
                  cursor: 'pointer',\r
                  fromLinkable: true,\r
                  toLinkable: true,\r
                  fromLinkableDuplicates: true,\r
                  toLinkableDuplicates: true,\r
                  fromSpot: go.Spot.AllSides,\r
                  toSpot: go.Spot.AllSides\r
                })\r
                .bind('fill')\r
                .bind('stroke', 'color')\r
                .bind('strokeWidth', 'thickness')\r
                .bind('strokeDashArray', 'dash'),\r
              new go.Placeholder({ background: 'transparent', margin: 20 })\r
            ),\r
          new go.TextBlock({\r
              alignment: go.Spot.Top,\r
              alignmentFocus: go.Spot.Bottom,\r
              font: 'bold 12pt sans-serif',\r
              editable: true\r
            })\r
            .bind('text')\r
            .bind('stroke', 'color')\r
        );\r
\r
    myDiagram.groupTemplate.selectionAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),\r
              new go.Placeholder({ margin: 1.5 })\r
            ),\r
          CMButton({ alignment: go.Spot.TopRight, alignmentFocus: go.Spot.BottomRight })\r
        );\r
\r
    myDiagram.groupTemplate.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          ...LightFillButtons(),\r
          ...DarkColorButtons(),\r
          ...StrokeOptionsButtons()\r
        );\r
\r
    // Link template\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          layerName: 'Foreground',\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 10,\r
          fromShortLength: 10,\r
          toShortLength: 15, // assume arrowhead at "to" end, need to avoid bad appearance when path is thick\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          resegmentable: true\r
        })\r
        .bind('fromSpot', 'fromSpot', go.Spot.parse)\r
        .bind('toSpot', 'toSpot', go.Spot.parse)\r
        .bind('fromShortLength', 'dir', dir => dir >= 1 ? 10 : 0)\r
        .bind('toShortLength', 'dir', dir => dir >= 1 ? 10 : 0)\r
        .bindTwoWay('points') // TwoWay due to user reshaping with LinkReshapingTool\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
            .bind('stroke', 'color')\r
            .bind('strokeWidth', 'thickness')\r
            .bind('strokeDashArray', 'dash'),\r
          new go.Shape({\r
              // custom arrowheads to create the lifted effect\r
              segmentIndex: 0,\r
              segmentOffset: new go.Point(15, 0),\r
              segmentOrientation: go.Orientation.Along,\r
              alignmentFocus: go.Spot.Right,\r
              figure: 'circle',\r
              width: 10,\r
              strokeWidth: 0\r
            })\r
            .bind('fill', 'color')\r
            .bind('visible', 'dir', dir => dir === 1),\r
          new go.Shape({\r
              segmentIndex: -1,\r
              segmentOffset: new go.Point(-10, 6),\r
              segmentOrientation: go.Orientation.Plus90,\r
              alignmentFocus: go.Spot.Right,\r
              figure: 'triangle',\r
              width: 12,\r
              height: 12,\r
              strokeWidth: 0\r
            })\r
            .bind('fill', 'color')\r
            .bind('visible', 'dir', dir => dir >= 1)\r
            .bind('width', 'thickness', t => 7 + 3 * t) // custom arrowhead must scale with the size of the while\r
            .bind('height', 'thickness', t => 7 + 3 * t) // while remaining centered on line\r
            .bind('segmentOffset', 'thickness', t => new go.Point(-15, 4 + 1.5 * t)),\r
          new go.Shape({\r
              segmentIndex: 0,\r
              segmentOffset: new go.Point(15, -6),\r
              segmentOrientation: go.Orientation.Minus90,\r
              alignmentFocus: go.Spot.Right,\r
              figure: 'triangle',\r
              width: 12,\r
              height: 12,\r
              strokeWidth: 0\r
            })\r
            .bind('fill', 'color')\r
            .bind('visible', 'dir', dir => dir === 2)\r
            .bind('width', 'thickness', t => 7 + 3 * t)\r
            .bind('height', 'thickness', t => 7 + 3 * t)\r
            .bind('segmentOffset', 'thickness', t => new go.Point(-15, 4 + 1.5 * t)),\r
          new go.TextBlock({\r
              alignmentFocus: new go.Spot(0, 1, -4, 0),\r
              editable: true\r
            })\r
            .bindTwoWay('text') // TwoWay due to user editing with TextEditingTool\r
            .bind('stroke', 'color')\r
        );\r
\r
    myDiagram.linkTemplate.selectionAdornmentTemplate =\r
      new go.Adornment() // use a special selection Adornment that does not obscure the link path itself\r
        .add(\r
          new go.Shape({\r
              // this uses a pathPattern with a gap in it, in order to avoid drawing on top of the link path Shape\r
              isPanelMain: true,\r
              stroke: 'transparent',\r
              strokeWidth: 6,\r
              pathPattern: makeAdornmentPathPattern(2) // == thickness or strokeWidth\r
            })\r
            .bind('pathPattern', 'thickness', makeAdornmentPathPattern),\r
          CMButton({ alignmentFocus: new go.Spot(0, 0, -6, -4) })\r
        );\r
\r
    function makeAdornmentPathPattern(w) {\r
      return new go.Shape({\r
        stroke: 'dodgerblue',\r
        strokeWidth: 2,\r
        strokeCap: 'square',\r
        geometryString: 'M0 0 M4 2 H3 M4 ' + (w + 4).toString() + ' H3'\r
      });\r
    }\r
\r
    // Link context menu\r
    // All buttons in context menu work on both click and contextClick,\r
    // in case the user context-clicks on the button.\r
    // All buttons modify the link data, not the Link, so the Bindings need not be TwoWay.\r
\r
    function ArrowButton(num) {\r
      var geo = 'M0 0 M8 16 M0 8 L16 8  M12 11 L16 8 L12 5';\r
      if (num === 0) {\r
        geo = 'M0 0 M16 16 M0 8 L16 8';\r
      } else if (num === 2) {\r
        geo = 'M0 0 M16 16 M0 8 L16 8  M12 11 L16 8 L12 5  M4 11 L0 8 L4 5';\r
      }\r
      return new go.Shape({\r
        geometryString: geo,\r
        margin: 2,\r
        background: 'transparent',\r
        mouseEnter: (e, shape) => (shape.background = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.background = 'transparent'),\r
        click: ClickFunction('dir', num),\r
        contextClick: ClickFunction('dir', num)\r
      });\r
    }\r
\r
    function AllSidesButton(to) {\r
      const setter = (e, shape) => {\r
        e.handled = true;\r
        e.diagram.model.commit(m => {\r
          const link = shape.part.adornedPart;\r
          m.set(link.data, to ? 'toSpot' : 'fromSpot', go.Spot.stringify(go.Spot.AllSides));\r
          // re-spread the connections of other links connected with the node\r
          (to ? link.toNode : link.fromNode).invalidateConnectedLinks();\r
        });\r
      };\r
      return new go.Shape({\r
        width: 12,\r
        height: 12,\r
        fill: 'transparent',\r
        mouseEnter: (e, shape) => (shape.background = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.background = 'transparent'),\r
        click: setter,\r
        contextClick: setter\r
      });\r
    }\r
\r
    function SpotButton(spot, to) {\r
      let ang = 0;\r
      let side = go.Spot.RightSide;\r
      if (spot.equals(go.Spot.Top)) {\r
        ang = 270;\r
        side = go.Spot.TopSide;\r
      } else if (spot.equals(go.Spot.Left)) {\r
        ang = 180;\r
        side = go.Spot.LeftSide;\r
      } else if (spot.equals(go.Spot.Bottom)) {\r
        ang = 90;\r
        side = go.Spot.BottomSide;\r
      }\r
      if (!to) ang -= 180;\r
      const setter = (e, shape) => {\r
        e.handled = true;\r
        e.diagram.model.commit(m => {\r
          var link = shape.part.adornedPart;\r
          m.set(link.data, to ? 'toSpot' : 'fromSpot', go.Spot.stringify(side));\r
          // re-spread the connections of other links connected with the node\r
          (to ? link.toNode : link.fromNode).invalidateConnectedLinks();\r
        });\r
      };\r
      return new go.Shape({\r
        alignment: spot,\r
        alignmentFocus: spot.opposite(),\r
        geometryString: 'M0 0 M12 12 M12 6 L1 6 L4 4 M1 6 L4 8',\r
        angle: ang,\r
        background: 'transparent',\r
        mouseEnter: (e, shape) => (shape.background = 'dodgerblue'),\r
        mouseLeave: (e, shape) => (shape.background = 'transparent'),\r
        click: setter,\r
        contextClick: setter\r
      });\r
    }\r
\r
    myDiagram.linkTemplate.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          ...DarkColorButtons(),\r
          ...StrokeOptionsButtons(),\r
          go.GraphObject.build('ContextMenuButton')\r
            .add(\r
              new go.Panel('Horizontal')\r
                .add(\r
                  ArrowButton(0),\r
                  ArrowButton(1),\r
                  ArrowButton(2)\r
                )\r
            ),\r
          go.GraphObject.build('ContextMenuButton')\r
            .add(\r
              new go.Panel('Horizontal')\r
                .add(\r
                  new go.Panel('Spot')\r
                    .add(\r
                      AllSidesButton(false),\r
                      SpotButton(go.Spot.Top, false),\r
                      SpotButton(go.Spot.Left, false),\r
                      SpotButton(go.Spot.Right, false),\r
                      SpotButton(go.Spot.Bottom, false)\r
                    ),\r
                  new go.Panel('Spot', { margin: new go.Margin(0, 0, 0, 2) })\r
                    .add(\r
                      AllSidesButton(true),\r
                      SpotButton(go.Spot.Top, true),\r
                      SpotButton(go.Spot.Left, true),\r
                      SpotButton(go.Spot.Right, true),\r
                      SpotButton(go.Spot.Bottom, true)\r
                    )\r
                )\r
            )\r
        );\r
\r
    load();\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/DrawCommandHandler.js`],descriptionHtml:`<p>\r
    Double-click in the background to create a new node. Create groups by selecting nodes and\r
    invoking Ctrl-G; Ctrl-Shift-G to ungroup a selected group. A selected node will have four orange\r
    triangles that when clicked will automatically copy the node and link to it. Use the context\r
    menu to change the shape, color, thickness, and dashed-ness.\r
  </p>\r
  <p>\r
    Links can be drawn by dragging from the side of each node. A selected link can be reconnected by\r
    dragging an end handle. Use the context menu to change the color, thickness, dashed-ness, and\r
    which side the link should connect with. Press the F2 key to start editing the label of a\r
    selected link.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`geometries`,`commands`];var g=y();l(`1amq787`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};