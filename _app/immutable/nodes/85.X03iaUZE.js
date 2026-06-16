import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Selection Adornment Showing Buttons for Nodes`,titleShort:`Adornment Buttons`,indexDescription:`Selected nodes show a row of buttons that execute commands or start tools.`,screenshot:`adornmentbuttons`,priority:2,tags:[`buttons`,`geometries`],description:`When a diagram node is selected show a selection Adornment holding buttons on which a click invokes a command or a drag starts a tool`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'linkingTool.isEnabled': false, // invoked explicitly by drawLink function, below\r
      'linkingTool.direction': go.LinkingDirection.ForwardsOnly, // only draw "from" towards "to"\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.AvoidsNodes, corner: 5 })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'OpenTriangle' })\r
        );\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          desiredSize: new go.Size(80, 80),\r
          // rearrange the link points evenly along the sides of the nodes as links are\r
          // drawn or reconnected -- these event handlers only make sense when the fromSpot\r
          // and toSpot are Spot.xxxSides\r
          linkConnected: (node, link, port) => {\r
            if (link.fromNode !== null) link.fromNode.invalidateConnectedLinks();\r
            if (link.toNode !== null) link.toNode.invalidateConnectedLinks();\r
          },\r
          linkDisconnected: (node, link, port) => {\r
            if (link.fromNode !== null) link.fromNode.invalidateConnectedLinks();\r
            if (link.toNode !== null) link.toNode.invalidateConnectedLinks();\r
          },\r
          locationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
              name: 'SHAPE', // named so that changeColor can modify it\r
              strokeWidth: 0, // no border\r
              fill: 'lightgray', // default fill color\r
              portId: '',\r
              // use the following property if you want users to draw new links\r
              // interactively by dragging from the Shape, and re-enable the LinkingTool\r
              // in the initialization of the Diagram\r
              //cursor: "pointer",\r
              fromSpot: go.Spot.AllSides,\r
              fromLinkable: true,\r
              fromLinkableDuplicates: true,\r
              fromLinkableSelfNode: true,\r
              toSpot: go.Spot.AllSides,\r
              toLinkable: true,\r
              toLinkableDuplicates: true,\r
              toLinkableSelfNode: true\r
            })\r
            .bindTwoWay('fill', 'color'),\r
          new go.TextBlock({\r
              name: 'TEXTBLOCK', // named so that editText can start editing it\r
              margin: 3,\r
              // use the following property if you want users to interactively start\r
              // editing the text by clicking on it or by F2 if the node is selected:\r
              //editable: true,\r
              overflow: go.TextOverflow.Ellipsis,\r
              maxLines: 5\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    // a selected node shows an Adornment that includes both a blue border\r
    // and a row of Buttons above the node\r
    myDiagram.nodeTemplate.selectionAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ stroke: 'dodgerblue', strokeWidth: 2, fill: null }),\r
              new go.Placeholder()\r
            ),\r
          new go.Panel('Horizontal', { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom })\r
            .add(\r
              go.GraphObject.build('Button', {\r
                  click: editText\r
                }) // defined below, to support editing the text of the node\r
                .add(\r
                  new go.TextBlock('t', {\r
                    font: 'bold 10pt sans-serif',\r
                    desiredSize: new go.Size(15, 15),\r
                    textAlign: 'center'\r
                  })\r
                ),\r
              go.GraphObject.build('Button', {\r
                  click: changeColor\r
                }) // defined below, to support changing the color of the node\r
                .bind('ButtonBorder.fill', 'color', nextColor)\r
                .add(new go.Shape({ fill: null, stroke: null, desiredSize: new go.Size(14, 14) })),\r
              go.GraphObject.build('Button', {\r
                  // drawLink is defined below, to support interactively drawing new links\r
                  click: drawLink, // click on Button and then click on target node\r
                  actionMove: drawLink // drag from Button to the target node\r
                })\r
                .add(new go.Shape({ geometryString: 'M0 0 L8 0 8 12 14 12 M12 10 L14 12 12 14' })),\r
              go.GraphObject.build('Button', {\r
                  actionMove: dragNewNode, // defined below, to support dragging from the button\r
                  _dragData: { text: 'a Node', color: 'lightgray' }, // node data to copy\r
                  click: clickNewNode // defined below, to support a click on the button\r
                })\r
                .add(\r
                  new go.Shape({\r
                    geometryString: 'M0 0 L3 0 3 10 6 10 x F1 M6 6 L14 6 14 14 6 14z',\r
                    fill: 'gray'\r
                  })\r
                )\r
            )\r
        );\r
\r
    function editText(e, button) {\r
      var node = button.part.adornedPart;\r
      e.diagram.commandHandler.editTextBlock(node.findObject('TEXTBLOCK'));\r
    }\r
\r
    // used by nextColor as the list of colors through which we rotate\r
    var myColors = ['lightgray', 'lightblue', 'lightgreen', 'yellow', 'orange', 'pink'];\r
\r
    // used by both the Button Binding and by the changeColor click function\r
    function nextColor(c) {\r
      var idx = myColors.indexOf(c);\r
      if (idx < 0) return 'lightgray';\r
      if (idx >= myColors.length - 1) idx = 0;\r
      return myColors[idx + 1];\r
    }\r
\r
    function changeColor(e, button) {\r
      var node = button.part.adornedPart;\r
      var shape = node.findObject('SHAPE');\r
      if (shape === null) return;\r
      node.diagram.startTransaction('Change color');\r
      button['_buttonFillOver'] = button['_buttonFillNormal'] = shape.fill = nextColor(shape.fill); // update the button too\r
      node.diagram.commitTransaction('Change color');\r
    }\r
\r
    function drawLink(e, button) {\r
      var node = button.part.adornedPart;\r
      var tool = e.diagram.toolManager.linkingTool;\r
      tool.startObject = node.port;\r
      e.diagram.currentTool = tool;\r
      tool.doActivate();\r
    }\r
\r
    // used by both clickNewNode and dragNewNode to create a node and a link\r
    // from a given node to the new node\r
    function createNodeAndLink(data, fromnode) {\r
      var diagram = fromnode.diagram;\r
      var model = diagram.model;\r
      var nodedata = model.copyNodeData(data);\r
      model.addNodeData(nodedata);\r
      var newnode = diagram.findNodeForData(nodedata);\r
      var linkdata = model.copyLinkData({});\r
      model.setFromKeyForLinkData(linkdata, model.getKeyForNodeData(fromnode.data));\r
      model.setToKeyForLinkData(linkdata, model.getKeyForNodeData(newnode.data));\r
      model.addLinkData(linkdata);\r
      diagram.select(newnode);\r
      return newnode;\r
    }\r
\r
    // the Button.click event handler, called when the user clicks the "N" button\r
    function clickNewNode(e, button) {\r
      var data = button._dragData;\r
      if (!data) return;\r
      e.diagram.startTransaction('Create Node and Link');\r
      var fromnode = button.part.adornedPart;\r
      var newnode = createNodeAndLink(button._dragData, fromnode);\r
      newnode.location = new go.Point(fromnode.location.x + 200, fromnode.location.y);\r
      e.diagram.commitTransaction('Create Node and Link');\r
    }\r
\r
    // the Button.actionMove event handler, called when the user drags within the "N" button\r
    function dragNewNode(e, button) {\r
      var tool = e.diagram.toolManager.draggingTool;\r
      if (tool.isBeyondDragSize()) {\r
        var data = button._dragData;\r
        if (!data) return;\r
        e.diagram.startTransaction('button drag'); // see doDeactivate, below\r
        var newnode = createNodeAndLink(data, button.part.adornedPart);\r
        newnode.location = e.diagram.lastInput.documentPoint;\r
        // don't commitTransaction here, but in tool.doDeactivate, after drag operation finished\r
        // set tool.currentPart to a selected movable Part and then activate the DraggingTool\r
        tool.currentPart = newnode;\r
        e.diagram.currentTool = tool;\r
        tool.doActivate();\r
      }\r
    }\r
\r
    // using dragNewNode also requires modifying the standard DraggingTool so that it\r
    // only calls commitTransaction when dragNewNode started a "button drag" transaction;\r
    // do this by overriding DraggingTool.doDeactivate:\r
    myDiagram.toolManager.draggingTool.doDeactivate = function () {\r
      // method override must be function, not =>\r
      // commit "button drag" transaction, if it is ongoing; see dragNewNode, above\r
      if (this.diagram.undoManager.nestedTransactionNames.elt(0) === 'button drag') {\r
        this.diagram.commitTransaction();\r
      }\r
      go.DraggingTool.prototype.doDeactivate.call(this); // call the base method\r
    };\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue', location: '0 0' },\r
        { key: 2, text: 'Beta', color: 'orange', location: '140 0' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen', location: '0 140' },\r
        { key: 4, text: 'Delta', color: 'pink', location: '140 140' }\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
\r
    myDiagram.findNodeForKey(4).isSelected = true;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    The node template uses a custom <a>Part.selectionAdornmentTemplate</a> to add a row of Buttons\r
    when the node is selected. Select a node and you will see the Buttons for the node.\r
  </p>\r
  <p>The first button, "T", when clicked, starts in-place editing of the text.</p>\r
  <p>\r
    The second button, "C", when clicked, changes the color of the node, rotating through a list of\r
    colors.\r
  </p>\r
  <p>\r
    The third button, "L", when clicked or dragged, starts the <a>LinkingTool</a>, drawing a new\r
    link starting at the selected node.\r
  </p>\r
  <p>\r
    The fourth button, "N", when clicked, adds a new node and creates a link from the selected node\r
    to the new node. Dragging from the fourth button does the same thing as a click but also\r
    activates the <a>DraggingTool</a>, allowing the user to drag the new node where they like.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`buttons`,`geometries`];var g=y();l(`l7sv2o`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};