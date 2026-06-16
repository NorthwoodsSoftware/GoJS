import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Flow Builder for Building Acyclic Graphs`,indexDescription:`Demonstrates a flow builder where nodes/links can be created or dropped onto a recycling node.`,screenshot:`flowbuilder`,priority:2,tags:[`layered-digraph`,`contextmenus`,`tools`,`buttons`],description:`An editor of flow diagrams that supports deletion by dropping onto a particular node and relinking by dragging a link.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  <button onclick="layout()">Diagram Layout</button>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
    { "key":1, "text":"Loading Screen", "category":"Loading" },\r
    { "key":2, "text":"Beginning" },\r
    { "key":3, "text":"Segment 1" },\r
    { "key":4, "text":"Segment 2" },\r
    { "key":5, "text":"Segment 3"},\r
    { "key":6, "text":"End Screen", "category":"End" },\r
    { "key":-2, "category": "Recycle" }\r
  ],\r
  "linkDataArray": [\r
    { "from":1, "to":2 },\r
    { "from":2, "to":3 },\r
    { "from":2, "to":5 },\r
    { "from":3, "to":4 },\r
    { "from":4, "to":6 }\r
  ]\r
}\r
  </textarea>`,jsCode:`// Define a custom tool that changes a drag operation on a Link to a relinking operation,\r
  // but that operates like a normal DraggingTool otherwise.\r
  class DragLinkingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      this.isGridSnapEnabled = true;\r
      this.isGridSnapRealtime = false;\r
      this.gridSnapCellSize = new go.Size(182, 1);\r
      this.gridSnapOrigin = new go.Point(5.5, 0);\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // Handle dragging a link specially -- by starting the RelinkingTool on that Link\r
    doActivate() {\r
      const diagram = this.diagram;\r
      if (diagram === null) return;\r
      this.standardMouseSelect();\r
      const main = this.currentPart; // this is set by the standardMouseSelect\r
      if (main instanceof go.Link) {\r
        // maybe start relinking instead of dragging\r
        const relinkingtool = diagram.toolManager.relinkingTool;\r
        // tell the RelinkingTool to work on this Link, not what is under the mouse\r
        relinkingtool.originalLink = main;\r
        // start the RelinkingTool\r
        diagram.currentTool = relinkingtool;\r
        // can activate it right now, because it already has the originalLink to reconnect\r
        relinkingtool.doActivate();\r
        relinkingtool.doMouseMove();\r
      } else {\r
        super.doActivate();\r
      }\r
    }\r
  }\r
  // end DragLinkingTool\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      layout: new go.LayeredDigraphLayout({\r
        setsPortSpots: false, // Links already know their fromSpot and toSpot\r
        columnSpacing: 5,\r
        isInitial: false,\r
        isOngoing: false\r
      }),\r
      validCycle: go.CycleMode.NotDirected,\r
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
    const graygrad = new go.Brush('Linear', { 0: 'white', 0.1: 'whitesmoke', 0.9: 'whitesmoke', 1: 'lightgray' });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', { // the default node template\r
          selectionAdorned: false,\r
          textEditable: true,\r
          locationObjectName: 'BODY'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        // the main body consists of a Rectangle surrounding the text\r
        .add(\r
          new go.Panel('Auto', { name: 'BODY' })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                  fill: graygrad,\r
                  stroke: 'gray',\r
                  minSize: new go.Size(120, 21)\r
                })\r
                .bindObject('fill', 'isSelected', s => s ? 'dodgerblue' : graygrad),\r
              new go.TextBlock({\r
                  stroke: 'black',\r
                  font: '12px sans-serif',\r
                  editable: true,\r
                  margin: new go.Margin(3, 3 + 11, 3, 3 + 4),\r
                  alignment: go.Spot.Left\r
                })\r
                .bindTwoWay('text')\r
            ),\r
          // output port\r
          new go.Panel('Auto', {\r
              alignment: go.Spot.Right,\r
              portId: 'from',\r
              fromLinkable: true,\r
              cursor: 'pointer',\r
              click: addNodeAndLink\r
            })\r
            .add(\r
              new go.Shape('Circle', { width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3 }),\r
              new go.Shape('PlusLine', { width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3 })\r
            ),\r
          // input port\r
          new go.Panel('Auto', {\r
              alignment: go.Spot.Left,\r
              portId: 'to',\r
              toLinkable: true\r
            })\r
            .add(\r
              new go.Shape('Circle', { width: 8, height: 8, fill: 'white', stroke: 'gray' }),\r
              new go.Shape('Circle', { width: 4, height: 4, fill: 'dodgerblue', stroke: null })\r
            )\r
        );\r
\r
    myDiagram.nodeTemplate.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.editTextBlock()\r
            })\r
            .bindObject('visible', '', o => o.diagram && o.diagram.commandHandler.canEditTextBlock())\r
            .add(new go.TextBlock('Rename')),\r
          // add one for Editing...\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, obj) => e.diagram.commandHandler.deleteSelection()\r
            })\r
            .bindObject('visible', '', o => o.diagram && o.diagram.commandHandler.canDeleteSelection())\r
            .add(new go.TextBlock('Delete'))\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Loading',\r
      new go.Node('Spot', {\r
          selectionAdorned: false,\r
          textEditable: true,\r
          locationObjectName: 'BODY'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // the main body consists of a Rectangle surrounding the text\r
          new go.Panel('Auto', { name: 'BODY' })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                  fill: graygrad,\r
                  stroke: 'gray',\r
                  minSize: new go.Size(120, 21)\r
                })\r
                .bindObject('fill', 'isSelected', s => s ? 'dodgerblue' : graygrad),\r
              new go.TextBlock({\r
                  stroke: 'black',\r
                  font: '12px sans-serif',\r
                  editable: true,\r
                  margin: new go.Margin(3, 3 + 11, 3, 3 + 4),\r
                  alignment: go.Spot.Left\r
                })\r
                .bind('text')\r
            ),\r
          // output port\r
          new go.Panel('Auto', {\r
              alignment: go.Spot.Right,\r
              portId: 'from',\r
              fromLinkable: true,\r
              click: addNodeAndLink\r
            })\r
            .add(\r
              new go.Shape('Circle', { width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3 }),\r
              new go.Shape('PlusLine', { width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3 })\r
            )\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('End',\r
      new go.Node('Spot', {\r
          selectionAdorned: false,\r
          textEditable: true,\r
          locationObjectName: 'BODY'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // the main body consists of a Rectangle surrounding the text\r
          new go.Panel('Auto', { name: 'BODY' })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                  fill: graygrad,\r
                  stroke: 'gray',\r
                  minSize: new go.Size(120, 21)\r
                })\r
                .bindObject('fill', 'isSelected', s => s ? 'dodgerblue' : graygrad),\r
              new go.TextBlock({\r
                  stroke: 'black',\r
                  font: '12px sans-serif',\r
                  editable: true,\r
                  margin: new go.Margin(3, 3 + 11, 3, 3 + 4),\r
                  alignment: go.Spot.Left\r
                })\r
                .bind('text')\r
            ),\r
          // input port\r
          new go.Panel('Auto', {\r
              alignment: go.Spot.Left,\r
              portId: 'to',\r
              toLinkable: true\r
            })\r
            .add(\r
              new go.Shape('Circle', { width: 8, height: 8, fill: 'white', stroke: 'gray' }),\r
              new go.Shape('Circle', { width: 4, height: 4, fill: 'dodgerblue', stroke: null })\r
            )\r
        )\r
    );\r
\r
    // dropping a node on this special node will cause the selection to be deleted;\r
    // linking or relinking to this special node will cause the link to be deleted\r
    myDiagram.nodeTemplateMap.add('Recycle',\r
      new go.Node('Auto', {\r
          portId: 'to',\r
          toLinkable: true,\r
          deletable: false,\r
          layerName: 'Background',\r
          locationSpot: go.Spot.Center,\r
          dragComputation: (node, pt, gridpt) => pt,\r
          mouseDrop: (e, obj) => e.diagram.commandHandler.deleteSelection()\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
            fill: 'lightgray',\r
            stroke: 'gray'\r
          }),\r
          new go.TextBlock('Drop Here\\nTo Delete', {\r
            margin: 5,\r
            textAlign: 'center'\r
          })\r
        )\r
    );\r
\r
    // this is a click event handler that adds a node and a link to the diagram,\r
    // connecting with the node on which the click occurred\r
    function addNodeAndLink(e, obj) {\r
      const fromNode = obj.part;\r
      const diagram = fromNode.diagram;\r
      diagram.startTransaction('Add State');\r
      // get the node data for which the user clicked the button\r
      const fromData = fromNode.data;\r
      // create a new "State" data object, positioned off to the right of the fromNode\r
      const p = fromNode.location.copy();\r
      p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width;\r
      const toData = {\r
        text: 'new',\r
        loc: go.Point.stringify(p)\r
      };\r
      // add the new node data to the model\r
      const model = diagram.model;\r
      model.addNodeData(toData);\r
      // create a link data from the old node data to the new node data\r
      const linkdata = {\r
        from: model.getKeyForNodeData(fromData),\r
        to: model.getKeyForNodeData(toData)\r
      };\r
      // and add the link data to the model\r
      model.addLinkData(linkdata);\r
      // select the new Node\r
      const newnode = diagram.findNodeForData(toData);\r
      diagram.select(newnode);\r
      // snap the new node to a valid location\r
      newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p);\r
      // then account for any overlap\r
      shiftNodesToEmptySpaces();\r
      diagram.commitTransaction('Add State');\r
    }\r
\r
    // Highlight ports when they are targets for linking or relinking.\r
    let OldTarget = null; // remember the last highlit port\r
    function highlight(port) {\r
      if (OldTarget !== port) {\r
        lowlight(); // remove highlight from any old port\r
        OldTarget = port;\r
        port.scale = 1.3; // highlight by enlarging\r
      }\r
    }\r
    function lowlight() {\r
      // remove any highlight\r
      if (OldTarget) {\r
        OldTarget.scale = 1.0;\r
        OldTarget = null;\r
      }\r
    }\r
\r
    // Connecting a link with the Recycle node removes the link\r
    myDiagram.addDiagramListener('LinkDrawn', e => {\r
      const link = e.subject;\r
      if (link.toNode.category === 'Recycle') myDiagram.remove(link);\r
      lowlight();\r
    });\r
    myDiagram.addDiagramListener('LinkRelinked', e => {\r
      const link = e.subject;\r
      if (link.toNode.category === 'Recycle') myDiagram.remove(link);\r
      lowlight();\r
    });\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          selectionAdorned: false,\r
          fromPortId: 'from',\r
          toPortId: 'to',\r
          relinkableTo: true\r
        })\r
        .add(\r
          new go.Shape({\r
            stroke: 'gray',\r
            strokeWidth: 2,\r
            mouseEnter: (e, obj) => {\r
              obj.strokeWidth = 5;\r
              obj.stroke = 'dodgerblue';\r
            },\r
            mouseLeave: (e, obj) => {\r
              obj.strokeWidth = 2;\r
              obj.stroke = 'gray';\r
            }\r
          })\r
        );\r
\r
    function commonLinkingToolInit(tool) {\r
      // the temporary link drawn during a link drawing operation (LinkingTool) is thick and blue\r
      tool.temporaryLink =\r
        new go.Link({ layerName: 'Tool' })\r
          .add(\r
            new go.Shape({ stroke: 'dodgerblue', strokeWidth: 5 })\r
          );\r
\r
      // change the standard proposed ports feedback from blue rectangles to transparent circles\r
      tool.temporaryFromPort.figure = 'Circle';\r
      tool.temporaryFromPort.stroke = null;\r
      tool.temporaryFromPort.strokeWidth = 0;\r
      tool.temporaryToPort.figure = 'Circle';\r
      tool.temporaryToPort.stroke = null;\r
      tool.temporaryToPort.strokeWidth = 0;\r
\r
      // provide customized visual feedback as ports are targeted or not\r
      tool.portTargeted = (realnode, realport, tempnode, tempport, toend) => {\r
        if (realport === null) {\r
          // no valid port nearby\r
          lowlight();\r
        } else if (toend) {\r
          highlight(realport);\r
        }\r
      };\r
    }\r
\r
    const ltool = myDiagram.toolManager.linkingTool;\r
    commonLinkingToolInit(ltool);\r
    // do not allow links to be drawn starting at the "to" port\r
    ltool.direction = go.LinkingDirection.ForwardsOnly;\r
\r
    const rtool = myDiagram.toolManager.relinkingTool;\r
    commonLinkingToolInit(rtool);\r
    // change the standard relink handle to be a shape that takes the shape of the link\r
    rtool.toHandleArchetype = new go.Shape({\r
      isPanelMain: true,\r
      fill: null,\r
      stroke: 'dodgerblue',\r
      strokeWidth: 5\r
    });\r
\r
    // use a special DraggingTool to cause the dragging of a Link to start relinking it\r
    myDiagram.toolManager.draggingTool = new DragLinkingTool();\r
\r
    // detect when dropped onto an occupied cell\r
    myDiagram.addDiagramListener('SelectionMoved', shiftNodesToEmptySpaces);\r
\r
    function shiftNodesToEmptySpaces() {\r
      myDiagram.selection.each(node => {\r
        if (!(node instanceof go.Node)) return;\r
        // look for Parts overlapping the node\r
        while (true) {\r
          const exist = myDiagram\r
            .findObjectsIn(\r
              node.actualBounds,\r
              // only consider Parts\r
              obj => obj.part,\r
              // ignore Links and the dropped node itself\r
              part => part instanceof go.Node && part !== node,\r
              // check for any overlap, not complete containment\r
              true\r
            )\r
            .first();\r
          if (exist === null) break;\r
          // try shifting down beyond the existing node to see if there's empty space\r
          node.moveTo(node.actualBounds.x, exist.actualBounds.bottom + 10);\r
        }\r
      });\r
    }\r
\r
    // prevent nodes from being dragged to the left of where the layout placed them\r
    myDiagram.addDiagramListener('LayoutCompleted', e => {\r
      myDiagram.nodes.each(node => {\r
        if (node.category === 'Recycle') return;\r
        node.minLocation = new go.Point(node.location.x, -Infinity);\r
      });\r
    });\r
\r
    load(); // load initial diagram from the mySavedModel textarea\r
  }\r
\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
    // if any nodes don't have a real location, explicitly do a layout\r
    if (myDiagram.nodes.any(n => !n.location.isReal())) layout();\r
  }\r
\r
  function layout() {\r
    myDiagram.layoutDiagram(true);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample let's users construct a flowing diagrmam with a few quality of\r
    life features. <a>Node</a>s can be deleted by dragging them over the\r
    "Drop Here To Delete" box.\r
  </p>\r
  <p>\r
    This sample implements a custom DragLinkingTool that allows <a>Link</a>s to\r
    be re-linked by dragging them to different <a>Node</a>s.\r
  </p>\r
  <p>\r
    To create a new <a>Node</a>, click the "+". This will create and link a new\r
    <a>Node</a>.\r
  </p>\r
  <p>\r
    When <a>Nodes</a> are dragged to new locations they will be snapped to the\r
    nearest lane.\r
  </p>\r
  <p>\r
    All <a>Node</a>s <a>TextBlock</a>s are editable.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`layered-digraph`,`contextmenus`,`tools`,`buttons`];var g=y();l(`hc71gc`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};