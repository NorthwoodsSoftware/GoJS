import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Curved Link Reshaping Using Single Handle`,indexDescription:`A custom Tool that lets the user reshape curved links with a single handle.`,screenshot:`curvedlinkreshaping`,priority:2,tags:[`links`,`tools`,`buttons`,`extensions`],description:`Changing the curviness of a link using a single reshaping handle.`},htmlContent:`<div id="myDiagramDiv" style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 400px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeKeyProperty": "id",\r
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
</textarea\r
  >`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      padding: 12,\r
      // have mouse wheel events zoom in and out instead of scroll up and down\r
      'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,\r
      // support double-click in background creating a new node\r
      'clickCreatingTool.archetypeNodeData': { text: 'new node' },\r
      linkReshapingTool: new CurvedLinkReshapingTool(),\r
      // enable undo & redo\r
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
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // define the node's outer shape, which will surround the TextBlock\r
          new go.Shape('RoundedRectangle', {\r
            parameter1: 20, // the corner has a large radius\r
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
          new go.TextBlock({\r
              font: 'bold 11pt helvetica, bold arial, sans-serif',\r
              editable: true // editing the text automatically updates the model data\r
            })\r
            .bindTwoWay('text', 'text')\r
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
            }) // end button\r
            .add(\r
              new go.Shape('PlusLine', { desiredSize: new go.Size(6, 6) })\r
            )\r
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
          curve: go.Curve.Bezier,\r
          reshapable: true\r
        })\r
        // don't need to save Link.points, so don't need TwoWay Binding on "points"\r
        .bindTwoWay('curviness', 'curviness') // but save "curviness" automatically\r
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
                .bindTwoWay('text', 'text')\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/CurvedLinkReshapingTool.js`],descriptionHtml:`<p>\r
    This sample is a modification of the <a href="../samples/stateChart">State Chart</a> sample that makes use of the CurvedLinkReshapingTool that is\r
    defined in its own file, as <a href="../extensions/CurvedLinkReshapingTool.js">CurvedLinkReshapingTool.js</a>.\r
  </p>\r
  <p>\r
    Note that unlike the standard case of a Bezier-curved Link that is <a>Part.reshapable</a>, there is only one reshape handle When the user drags that handle,\r
    the value of <a>Link.curviness</a> is modified, causing the link to be curved differently. This sample also defines a TwoWay <a>Binding</a> on that\r
    property, thereby saving the curviness to the model data. Unlike the regular State Chart sample, there is no Binding on <a>Link.points</a>, which is no\r
    longer needed when the curviness is the only modified property.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`tools`,`buttons`,`extensions`];var g=y();l(`j1faoh`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};