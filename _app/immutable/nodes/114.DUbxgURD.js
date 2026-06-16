import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Data Flow Diagram of SQL Operation Nodes with Multiple Labeled Input and Output Ports`,titleShort:`Data Flow Diagram`,indexDescription:`Show the processing steps involved in a database transformation or query, with labeled ports.`,screenshot:`dataflow`,priority:2,tags:[`tables`,`layered-digraph`,`ports`,`process`],description:`Data flow or workflow graph of nodes with varying input and output ports with labels, oriented horizontally.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeCategoryProperty": "type",\r
  "linkFromPortIdProperty": "frompid",\r
  "linkToPortIdProperty": "topid",\r
  "nodeDataArray": [\r
{"key":1, "type":"Table", "name":"Product"},\r
{"key":2, "type":"Table", "name":"Sales"},\r
{"key":3, "type":"Table", "name":"Period"},\r
{"key":4, "type":"Table", "name":"Store"},\r
{"key":11, "type":"Join", "name":"Product, Class"},\r
{"key":12, "type":"Join", "name":"Period"},\r
{"key":13, "type":"Join", "name":"Store"},\r
{"key":21, "type":"Project", "name":"Product, Class"},\r
{"key":31, "type":"Filter", "name":"Boston, Jan2014"},\r
{"key":32, "type":"Filter", "name":"Boston, 2014"},\r
{"key":41, "type":"Group", "name":"Sales"},\r
{"key":42, "type":"Group", "name":"Total Sales"},\r
{"key":51, "type":"Join", "name":"Product Name"},\r
{"key":61, "type":"Sort", "name":"Product Name"},\r
{"key":71, "type":"Export", "name":"File"}\r
  ],\r
  "linkDataArray": [\r
{"from":1, "frompid":"OUT", "to":11, "topid":"L"},\r
{"from":2, "frompid":"OUT", "to":11, "topid":"R"},\r
{"from":3, "frompid":"OUT", "to":12, "topid":"R"},\r
{"from":4, "frompid":"OUT", "to":13, "topid":"R"},\r
{"from":11, "frompid":"M", "to":12, "topid":"L"},\r
{"from":12, "frompid":"M", "to":13, "topid":"L"},\r
{"from":13, "frompid":"M", "to":21},\r
{"from":21, "frompid":"OUT", "to":31},\r
{"from":21, "frompid":"OUT", "to":32},\r
{"from":31, "frompid":"OUT", "to":41},\r
{"from":32, "frompid":"OUT", "to":42},\r
{"from":41, "frompid":"OUT", "to":51, "topid":"L"},\r
{"from":42, "frompid":"OUT", "to":51, "topid":"R"},\r
{"from":51, "frompid":"OUT", "to":61},\r
{"from":61, "frompid":"OUT", "to":71}\r
  ]}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialContentAlignment: go.Spot.Left,\r
      initialAutoScale: go.AutoScale.UniformToFill,\r
      layout: new go.LayeredDigraphLayout({ direction: 0 }),\r
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
    function makePort(name, leftside) {\r
      const port = new go.Shape('Rectangle', {\r
        fill: 'gray',\r
        stroke: null,\r
        desiredSize: new go.Size(8, 8),\r
        portId: name, // declare this object to be a "port"\r
        toMaxLinks: 1, // don't allow more than one link into a port\r
        cursor: 'pointer' // show a different cursor to indicate potential link point\r
      });\r
\r
      const lab = new go.TextBlock(\r
        name, // the name of the port\r
        { font: '7pt sans-serif' }\r
      );\r
\r
      const panel = new go.Panel('Horizontal', { margin: new go.Margin(2, 0) });\r
\r
      // set up the port/panel based on which side of the node it will be on\r
      if (leftside) {\r
        port.toSpot = go.Spot.Left;\r
        port.toLinkable = true;\r
        lab.margin = new go.Margin(1, 0, 0, 1);\r
        panel.alignment = go.Spot.TopLeft;\r
        panel.add(port);\r
        panel.add(lab);\r
      } else {\r
        port.fromSpot = go.Spot.Right;\r
        port.fromLinkable = true;\r
        lab.margin = new go.Margin(1, 1, 0, 0);\r
        panel.alignment = go.Spot.TopRight;\r
        panel.add(lab);\r
        panel.add(port);\r
      }\r
      return panel;\r
    }\r
\r
    function makeTemplate(typename, icon, background, inports, outports) {\r
      myDiagram.nodeTemplateMap.set(typename,\r
        new go.Node('Spot')\r
          .add(\r
            new go.Panel('Auto', { width: 100, height: 120 })\r
              .add(\r
                new go.Shape('Rectangle', {\r
                  fill: background,\r
                  stroke: null,\r
                  strokeWidth: 0,\r
                  spot1: go.Spot.TopLeft,\r
                  spot2: go.Spot.BottomRight\r
                }),\r
                new go.Panel('Table')\r
                  .add(\r
                    new go.TextBlock(typename, {\r
                      row: 0,\r
                      margin: 3,\r
                      maxSize: new go.Size(80, NaN),\r
                      stroke: 'black',\r
                      font: 'bold 12pt sans-serif'\r
                    }),\r
                    new go.Picture(icon, { row: 1, width: 16, height: 16, scale: 3.0 }),\r
                    new go.TextBlock({\r
                        row: 2,\r
                        margin: 3,\r
                        editable: true,\r
                        maxSize: new go.Size(80, 40),\r
                        stroke: 'white',\r
                        font: 'bold 9pt sans-serif'\r
                      })\r
                      .bindTwoWay('text', 'name')\r
                  )\r
              ),\r
            new go.Panel('Vertical', {\r
                alignment: go.Spot.Left,\r
                alignmentFocus: new go.Spot(0, 0.5, 8, 0)\r
              })\r
              .add(...inports),\r
            new go.Panel('Vertical', {\r
                alignment: go.Spot.Right,\r
                alignmentFocus: new go.Spot(1, 0.5, -8, 0)\r
              })\r
              .add(...outports)\r
          ));\r
    }\r
\r
    makeTemplate('Table', 'images/table.svg', 'forestgreen',\r
      [],\r
      [makePort('OUT', false)]\r
    );\r
\r
    makeTemplate('Join', 'images/join.svg', 'mediumorchid',\r
      [makePort('L', true), makePort('R', true)],\r
      [\r
        makePort('UL', false),\r
        makePort('ML', false),\r
        makePort('M', false),\r
        makePort('MR', false),\r
        makePort('UR', false)\r
      ]\r
    );\r
\r
    makeTemplate('Project', 'images/project.svg', 'darkcyan',\r
      [makePort('', true)],\r
      [makePort('OUT', false)]\r
    );\r
\r
    makeTemplate('Filter', 'images/filter.svg', 'cornflowerblue',\r
      [makePort('', true)],\r
      [makePort('OUT', false), makePort('INV', false)]\r
    );\r
\r
    makeTemplate('Group', 'images/group.svg', 'mediumpurple',\r
      [makePort('', true)],\r
      [makePort('OUT', false)]\r
    );\r
\r
    makeTemplate('Sort', 'images/sort.svg', 'sienna',\r
      [makePort('', true)],\r
      [makePort('OUT', false)]\r
    );\r
\r
    makeTemplate('Export', 'images/upload.svg', 'darkred',\r
      [makePort('', true)],\r
      []\r
    );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Orthogonal,\r
          corner: 25,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          toShortLength: 2\r
        })\r
        .add(\r
          new go.Shape({ stroke: 'gray', strokeWidth: 2 }),\r
          new go.Shape({ stroke: 'gray', fill: 'gray', toArrow: 'Standard' })\r
        );\r
\r
    load();\r
  }\r
\r
  // Show the diagram's model in JSON format that the user may edit\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(\r
      document.getElementById('mySavedModel').value\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates a data flow or workflow graph with labeled ports on\r
    nodes. A real application would provide the ability to edit the details\r
    (properties) of each node so that the actual database operation could be\r
    executed.\r
  </p>\r
  <p>\r
    The ports of each node are set up as panels, created within the\r
    <b>makePort</b> function. This function sets various properties of the\r
    <a>Shape</a> and <a>TextBlock</a> that make up the panel, and properties of\r
    the panel itself. Most notable are <a>GraphObject.portId</a> to declare the\r
    shape as a port, and <a>GraphObject.fromLinkable</a> and\r
    <a>GraphObject.toLinkable</a> to set the way the ports can be linked.\r
  </p>\r
  <p>\r
    The diagram also uses the <b>makeTemplate</b> function to create the node\r
    templates with shared features. This function takes a type, an image, a\r
    background color, and arrays of ports to create the node to be added to the\r
    <a>Diagram.nodeTemplateMap</a>.\r
  </p>\r
  <p>\r
    For the same data model rendered somewhat differently, see the\r
    <a href="dataFlowVertical">Data Flow (vertical)</a> sample.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`layered-digraph`,`ports`,`process`];var g=y();l(`165x781`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};