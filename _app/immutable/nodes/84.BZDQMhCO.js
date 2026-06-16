import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Adding Nodes to Palette from Diagram`,titleShort:`Adding Node to Palette`,indexDescription:`Select and edit a node and add a copy of it to the palette.`,screenshot:`addtopalette`,priority:2,tags:[`palette`,`overview`],description:`An example of having the user customize a Palette by adding copies of Diagram nodes to the Palette's Model.`},htmlContent:`<div style="width: 100%; white-space: nowrap; display: flex;">\r
    <span style="display: inline-block; vertical-align: top; padding: 2px; flex: 1 1 140px; min-width: 140px;">\r
      <div\r
        id="myPaletteDiv"\r
        style="background-color: whitesmoke; border: solid 1px black; height: 400px"></div>\r
      <div id="myOverviewDiv" style="border: solid 1px black; height: 100px"></div>\r
    </span>\r
    <span style="display: inline-block; vertical-align: top; padding: 2px; flex: 8 1 300px; min-width: 300px;">\r
      <div id="myDiagramDiv" style="border: solid 1px black; height: 500px"></div>\r
    </span>\r
    <span style="display: inline-block; vertical-align: top; padding: 2px; flex: 0 0 200px; min-width: 200px; margin-right: 20px;">\r
      <div id="myInspectorDiv" class="inspector"></div>\r
    </span>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button onclick="addToPalette()">Add To Palette</button>\r
    <button onclick="removeFromPalette()">Delete From Palette</button>\r
    Palette model:\r
  </div>\r
  <textarea id="mySavedPaletteModel" style="width: 100%; height: 200px"></textarea>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 200px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
    { "key": 1, "text": "hello", "figure":"Circle", "color":"green", "location":"0 0" },\r
    { "key": 2, "text": "world", "figure":"Rectangle", "color":"red", "location":"100 0" }\r
 ],\r
  "linkDataArray": [\r
    { "from":1, "to":2 }\r
 ]}\r
  </textarea>`,jsCode:`function init() {\r
    // initialize main Diagram\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
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
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Circle', {\r
              fill: 'white',\r
              stroke: 'gray',\r
              strokeWidth: 2,\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true,\r
              fromLinkableDuplicates: true,\r
              toLinkableDuplicates: true,\r
              fromLinkableSelfNode: true,\r
              toLinkableSelfNode: true\r
            })\r
            .bind('stroke', 'color')\r
            .bind('figure'),\r
          new go.TextBlock({\r
              margin: new go.Margin(5, 5, 3, 5),\r
              font: '10pt sans-serif',\r
              minSize: new go.Size(16, 16),\r
              maxSize: new go.Size(120, NaN),\r
              textAlign: 'center',\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    // initialize Palette\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplate: myDiagram.nodeTemplate,\r
      contentAlignment: go.Spot.Center,\r
      layout: new go.GridLayout({ wrappingColumn: 1, cellSize: new go.Size(2, 2) }),\r
      ModelChanged: e => {\r
        // just for demonstration purposes,\r
        if (e.isTransactionFinished) {\r
          // show the model data in the page's TextArea\r
          document.getElementById('mySavedPaletteModel').textContent = e.model.toJson();\r
        }\r
      }\r
    });\r
\r
    // now add the initial contents of the Palette\r
    myPalette.model.nodeDataArray = [\r
      { text: 'Circle', color: 'blue', figure: 'Circle' },\r
      { text: 'Square', color: 'purple', figure: 'Square' },\r
      { text: 'Ellipse', color: 'orange', figure: 'Ellipse' },\r
      { text: 'Rectangle', color: 'red', figure: 'Rectangle' },\r
      { text: 'Rounded\\nRectangle', color: 'green', figure: 'RoundedRectangle' },\r
      { text: 'Triangle', color: 'purple', figure: 'Triangle' }\r
    ];\r
\r
    // initialize Overview\r
    myOverview = new go.Overview('myOverviewDiv', {\r
      observed: myDiagram,\r
      contentAlignment: go.Spot.Center\r
    });\r
\r
    var inspector = new Inspector('myInspectorDiv', myDiagram, {\r
      // uncomment this line to only inspect the named properties below instead of all properties on each object:\r
      // includesOwnProperties: false,\r
      properties: {\r
        text: {},\r
        // key would be automatically added for nodes, but we want to declare it read-only also:\r
        key: { readOnly: true, show: Inspector.showIfPresent },\r
        // color would be automatically added for nodes, but we want to declare it a color also:\r
        color: { type: 'color' },\r
        figure: {}\r
      }\r
    });\r
\r
    // show placeholder text whenever nothing is selected (the Inspector\r
    // constructor clears the div, so set it here and on every deselect)\r
    function showInspectorPlaceholder() {\r
      if (myDiagram.selection.count === 0) {\r
        document.getElementById('myInspectorDiv').innerHTML =\r
          '<div class="inspector-placeholder">Data Inspector</div>';\r
      }\r
    }\r
    myDiagram.addDiagramListener('ChangedSelection', showInspectorPlaceholder);\r
    showInspectorPlaceholder();\r
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
  function addToPalette() {\r
    var node = myDiagram.selection.filter(p => p instanceof go.Node).first();\r
    if (node !== null) {\r
      myPalette.startTransaction();\r
      var item = myPalette.model.copyNodeData(node.data);\r
      myPalette.model.addNodeData(item);\r
      myPalette.commitTransaction('added item to palette');\r
    }\r
  }\r
\r
  // The user cannot delete selected nodes in the Palette with the Delete key or Ctrl-X,\r
  // but they can if they do so programmatically.\r
  function removeFromPalette() {\r
    myPalette.commandHandler.deleteSelection();\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/DataInspector.js`],descriptionHtml:`<p>\r
    This sample supports the normal kind of drag-and-drop from a <a>Palette</a> to a <a>Diagram</a>.\r
    The Data <a>Inspector</a> allows you to edit the properties of a selected node in the diagram.\r
  </p>\r
  <p>\r
    This sample also supports dynamically adding a copy of a selected node in the diagram to the\r
    palette by the "Add To Palette" button. See the current state of the palette's model in the top\r
    textarea. The palette is <a>Diagram.isReadOnly</a>, so the user cannot delete selected nodes\r
    from the palette. But the "Delete From Palette" button removes any selected nodes from the\r
    palette.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`palette`,`overview`];var g=y();l(`5psuda`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};