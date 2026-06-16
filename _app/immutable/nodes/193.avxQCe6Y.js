import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Dragging Labels of Nodes`,titleShort:`Dragging Node Label`,indexDescription:`A custom Tool that lets the user drag a label in a Spot Panel of a Node.`,screenshot:`nodelabeldragging`,priority:2,tags:[`tools`,`extensions`],description:`Allow the user to shift the label of a node.`},htmlContent:`<div id="myDiagramDiv" style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 400px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeKeyProperty": "id",\r
  "pointsDigits": 0,\r
  "nodeDataArray": [\r
    { "id": 0, "loc": "120 120", "text": "Initial" },\r
    { "id": 1, "loc": "330 120", "text": "First down" },\r
    { "id": 2, "loc": "226 376", "text": "First up" },\r
    { "id": 3, "loc": "60 276", "text": "Second down" },\r
    { "id": 4, "loc": "226 226", "text": "Wait" }\r
  ],\r
  "linkDataArray": [\r
    { "from": 0, "to": 0, "text": "up or timer", "curviness": -20 },\r
    { "from": 0, "to": 1, "text": "down", "curviness": 20 },\r
    { "from": 1, "to": 0, "text": "up (moved)\\nPOST", "curviness": 20 },\r
    { "from": 1, "to": 1, "text": "down", "curviness": -20 },\r
    { "from": 1, "to": 2, "text": "up (no move)" },\r
    { "from": 1, "to": 4, "text": "timer" },\r
    { "from": 2, "to": 0, "text": "timer\\nPOST" },\r
    { "from": 2, "to": 3, "text": "down" },\r
    { "from": 3, "to": 0, "text": "up\\nPOST\\n(dblclick\\nif no move)" },\r
    { "from": 3, "to": 3, "text": "down or timer", "curviness": 20 },\r
    { "from": 4, "to": 0, "text": "up\\nPOST" },\r
    { "from": 4, "to": 4, "text": "down" }\r
  ]\r
}\r
  </textarea>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // have mouse wheel events zoom in and out instead of scroll up and down\r
      'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,\r
      // support double-click in background creating a new node\r
      'clickCreatingTool.archetypeNodeData': { text: 'new node' },\r
      // enable undo & redo\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // install the NodeLabelDraggingTool as a "mouse move" tool\r
    myDiagram.toolManager.mouseMoveTools.insertAt(0, new NodeLabelDraggingTool());\r
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
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationObjectName: 'ICON',\r
          locationSpot: go.Spot.Center,\r
          selectionObjectName: 'ICON'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // define the node primary shape\r
          new go.Shape('RoundedRectangle', {\r
            name: 'ICON',\r
            parameter1: 10, // the corner has a medium radius\r
            desiredSize: new go.Size(40, 40),\r
            fill: new go.Brush('Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }),\r
            stroke: 'black',\r
            portId: '',\r
            fromLinkable: true,\r
            fromLinkableSelfNode: true,\r
            fromLinkableDuplicates: true,\r
            toLinkable: true,\r
            toLinkableSelfNode: true,\r
            toLinkableDuplicates: true,\r
            cursor: 'pointer'\r
          }),\r
          // provide interior area where the user can grab the node\r
          new go.Shape({ fill: 'transparent', stroke: null, desiredSize: new go.Size(30, 30) }),\r
          new go.TextBlock({\r
              font: 'bold 11pt helvetica, bold arial, sans-serif',\r
              editable: true, // editing the text automatically updates the model data\r
              cursor: 'move' // visual hint that the user can do something with this node label\r
            })\r
            .attach({ // GraphObject.attach() is used in method chaining to set properties that dont exist\r
              _isNodeLabel: true\r
            })\r
            .bindTwoWay('text')\r
            // The GraphObject.alignment property is what the NodeLabelDraggingTool modifies.\r
            // This TwoWay binding saves any changes to the same named property on the node data.\r
            .bindTwoWay('alignment', 'alignment', go.Spot.parse, go.Spot.stringify)\r
        );\r
\r
    // unlike the normal selection Adornment, this one includes a Button\r
    myDiagram.nodeTemplate.selectionAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: null, stroke: 'blue', strokeWidth: 2 }),\r
              new go.Placeholder() // this represents the selected Node\r
            ),\r
          // the button to create a "next" node, at the top-right corner\r
          go.GraphObject.build('Button', {\r
              alignment: go.Spot.TopRight,\r
              click: addNodeAndLink // this function is defined below\r
            })\r
            .add(\r
              new go.Shape('PlusLine', { desiredSize: new go.Size(6, 6) })\r
            ) // end button\r
        ); // end Adornment\r
\r
    // clicking the button inserts a new node to the right of the selected node,\r
    // and adds a link to that new node\r
    function addNodeAndLink(e, obj) {\r
      var adorn = obj.part;\r
      e.handled = true;\r
      var diagram = adorn.diagram;\r
      diagram.startTransaction('Add State');\r
\r
      // get the node data for which the user clicked the button\r
      var fromNode = adorn.adornedPart;\r
      var fromData = fromNode.data;\r
      // create a new "State" data object, positioned off to the right of the adorned Node\r
      var toData = { text: 'new' };\r
      var p = fromNode.location.copy();\r
      p.x += 200;\r
      toData.loc = go.Point.stringify(p); // the "loc" property is a string, not a Point object\r
      // add the new node data to the model\r
      var model = diagram.model;\r
      model.addNodeData(toData);\r
\r
      // create a link data from the old node data to the new node data\r
      var linkdata = {\r
        from: model.getKeyForNodeData(fromData), // or just: fromData.id\r
        to: model.getKeyForNodeData(toData),\r
        text: 'transition'\r
      };\r
      // and add the link data to the model\r
      model.addLinkData(linkdata);\r
\r
      // select the new Node\r
      var newnode = diagram.findNodeForData(toData);\r
      diagram.select(newnode);\r
\r
      diagram.commitTransaction('Add State');\r
\r
      // if the new node is off-screen, scroll the diagram to show the new node\r
      if (!diagram.viewportBounds.containsRect(newnode.actualBounds)) {\r
        diagram.commandHandler.scrollToPart(newnode);\r
      }\r
    }\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({ // the whole link panel\r
          curve: go.Curve.Bezier, adjusting: go.LinkAdjusting.Stretch, reshapable: true\r
        })\r
        .bindTwoWay('points')\r
        .bind('curviness')\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }), // the link shape\r
          new go.Shape({ toArrow: 'standard', stroke: null }), // the arrowhead\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ // the label background, which becomes transparent around the edges\r
                fill: new go.Brush('Radial', { 0: 'rgb(240, 240, 240)', 0.3: 'rgb(240, 240, 240)', 1: 'rgba(240, 240, 240, 0)' }),\r
                stroke: null\r
              }),\r
              new go.TextBlock('transition', { // the label text\r
                  textAlign: 'center',\r
                  font: '10pt helvetica, arial, sans-serif',\r
                  stroke: 'black',\r
                  margin: 4,\r
                  editable: true // editing the text automatically updates the model data\r
                })\r
                .bindTwoWay('text')\r
            )\r
        );\r
\r
    // read in the JSON-format data from the "mySavedModel" element\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/NodeLabelDraggingTool.js`],descriptionHtml:`<p>\r
    This sample is a modification of the <a href="../samples/stateChart">State Chart</a> sample that makes use of the NodeLabelDraggingTool that is defined\r
    in its own file, as <a href="../extensions/NodeLabelDraggingTool.js">NodeLabelDraggingTool.js</a>.\r
  </p>\r
  <p>\r
    Note that after dragging a node label you can move that node and the label maintains the same position relative to the node. That relative position is\r
    specified by the <a>GraphObject.alignment</a> property, used by the "Spot" <a>Panel</a>. This sample also saves any changes to that property by means of a\r
    TwoWay <a>Binding</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`1pfy41w`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};