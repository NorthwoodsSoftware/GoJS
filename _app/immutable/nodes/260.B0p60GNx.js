import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`State Chart Editor Saving Incremental JSON`,indexDescription:`State Chart using incremental JSON.`,screenshot:`statechartincremental`,priority:2,tags:[`buttons`,`process`],description:`An editable finite state machine chart that saves incremental changes.`},htmlContent:`<div id="myDiagramDiv" style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 400px"></div>\r
  Last <a>Transaction</a> saved in incremental JSON format:\r
  <pre class="lang-js"><code id="myTransaction"></code></pre>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeKeyProperty": "id",\r
  "linkKeyProperty": "id",\r
  "pointsDigits": 1,\r
  "nodeDataArray": [\r
    { "id": 1, "loc": "120 120", "text": "Initial" },\r
    { "id": 3, "loc": "330 120", "text": "First down" },\r
    { "id": 5, "loc": "226 376", "text": "First up" },\r
    { "id": 7, "loc": "60 276", "text": "Second down" },\r
    { "id": 9, "loc": "226 226", "text": "Wait" }\r
  ],\r
  "linkDataArray": [\r
    { "id": 2, "from": 1, "to": 1, "text": "up or timer", "curviness": -20 },\r
    { "id": 4, "from": 1, "to": 3, "text": "down", "curviness": 20 },\r
    { "id": 6, "from": 3, "to": 1, "text": "up (moved)\\nPOST", "curviness": 20 },\r
    { "id": 8, "from": 3, "to": 3, "text": "down", "curviness": -20 },\r
    { "id": 10, "from": 3, "to": 5, "text": "up (no move)" },\r
    { "id": 12, "from": 3, "to": 9, "text": "timer" },\r
    { "id": 14, "from": 5, "to": 1, "text": "timer\\nPOST" },\r
    { "id": 16, "from": 5, "to": 7, "text": "down" },\r
    { "id": 18, "from": 7, "to": 1, "text": "up\\nPOST\\n(dblclick\\nif no move)" },\r
    { "id": 20, "from": 7, "to": 7, "text": "down or timer", "curviness": 20 },\r
    { "id": 22, "from": 9, "to": 1, "text": "up\\nPOST" },\r
    { "id": 24, "from": 9, "to": 9, "text": "down" }\r
  ]\r
}\r
</textarea\r
  >`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // have mouse wheel events zoom in and out instead of scroll up and down\r
      'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,\r
      // support double-click in background creating a new node\r
      'clickCreatingTool.archetypeNodeData': { text: 'new node' },\r
      ModelChanged: e => {\r
        if (e.change === go.ChangeType.Transaction &&\r
            e.propertyName === 'CommittedTransaction' &&\r
            e.oldValue !== 'Initial Layout') {\r
          // this records each Transaction as a JSON-format string\r
          showIncremental(myDiagram.model.toIncrementalJson(e));\r
        }\r
      },\r
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
            .add(new go.Shape('PlusLine', { desiredSize: new go.Size(6, 6) }))\r
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
          adjusting: go.LinkAdjusting.Stretch,\r
          reshapable: true,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .bindTwoWay('points')\r
        .bind('curviness', 'curviness')\r
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
    showIncremental('');\r
  }\r
  function load() {\r
    var model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
    // establish GraphLinksModel functions:\r
    // node data id's are odd numbers\r
    model.makeUniqueKeyFunction = (model, data) => {\r
      var i = model.nodeDataArray.length * 2 + 1;\r
      while (model.findNodeDataForKey(i) !== null) i += 2;\r
      data.id = i; // assume Model.nodeKeyProperty === "id"\r
      return i;\r
    };\r
    // link data id's are even numbers\r
    model.makeUniqueLinkKeyFunction = (model, data) => {\r
      var i = model.linkDataArray.length * 2 + 2;\r
      while (model.findLinkDataForKey(i) !== null) i += 2;\r
      data.id = i; // assume GraphLinksModel.linkKeyProperty === "id"\r
      return i;\r
    };\r
    myDiagram.model = model;\r
    showIncremental('');\r
  }\r
\r
  function showIncremental(str) {\r
console.log(str)\r
    // show the last transaction as an incremental update in JSON-formatted text\r
    var element = document.getElementById('myTransaction');\r
    element.innerHTML = str;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample is derived from the <a href="stateChart">State Chart</a> sample. This makes use of the new <a>GraphLinksModel.linkKeyProperty</a> property\r
    and the <a>Model.toIncrementalJson</a> and <a>Model.applyIncrementalJson</a> methods. It also demonstrates custom functions for\r
    <a>Model.makeUniqueKeyFunction</a> and <a>GraphLinksModel.makeUniqueLinkKeyFunction</a>, which assign odd numbers to new node data and even numbers to new\r
    link data. Unlike most models, this example uses "id" as the name of the <a>Model.nodeKeyProperty</a> rather than "key".\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`buttons`,`process`];var g=y();l(`1baqls2`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};