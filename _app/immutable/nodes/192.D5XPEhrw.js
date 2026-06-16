import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Network Configuration Diagram Editor With Groups`,titleShort:`Network Editor`,indexDescription:`Shows a CISCO-style network configuration diagram, with the ability to group nodes into subnetworks.`,description:`A CISCO-style network configuration diagram, with a Palette to create new machines and the ability to group nodes into subnetworks.`,screenshot:`networkconfig`,priority:.8,tags:[`palette`,`links`,`groups`]},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       This also adds a border to help see the edges of the viewport. -->\r
    <div id="myPaletteDiv" style="width: 100px; margin-right: 2px; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="border: solid 1px black; flex-grow: 1; height: 450px"></div>\r
  </div>\r
\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">{ "class": "GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":0,"type":"Cloud","loc":"0 0","text":"Internet"},\r
{"key":1,"type":"Firewall","loc":"100 0","text":"FW-1"},\r
{"key":2,"type":"Router","loc":"200 0","text":"R-1"},\r
{"key":3,"type":"Server","loc":"300 0","text":"Server"},\r
{"key":4,"type":"Switch","loc":"200 100","text":"S-1"},\r
{"key":5,"type":"Firewall","loc":"25 100","text":"FW-2"},\r
{"key":6,"type":"Router","loc":"25 200","text":"R-2"},\r
{"key":7,"type":"Switch","loc":"400 100","text":"S-2"},\r
{"key":10,"isGroup":true,"text":"Intranet 1"},\r
{"key":11,"type":"PC","loc":"150 220","group":10},\r
{"key":12,"type":"PC","loc":"250 220","group":10},\r
{"key":13,"type":"PC","loc":"150 270","group":10},\r
{"key":14,"type":"PC","loc":"250 270","group":10},\r
{"key":20,"isGroup":true,"text":"Intranet 2"},\r
{"key":21,"type":"PC","loc":"350 220","group":20},\r
{"key":22,"type":"PC","loc":"450 220","group":20},\r
{"key":23,"type":"PC","loc":"350 270","group":20},\r
{"key":24,"type":"PC","loc":"450 270","group":20},\r
{"key":30,"isGroup":true,"text":"Isolation test"},\r
{"key":31,"type":"PC","loc":"-100 172","group":30},\r
{"key":32,"type":"PC","loc":"-100 242","group":30}\r
],\r
  "linkDataArray": [\r
{"from":0,"to":1},\r
{"from":1,"to":2},\r
{"from":2,"to":3},\r
{"from":2,"to":4},\r
{"from":5,"to":4},\r
{"from":5,"to":6},\r
{"from":4,"to":7},\r
{"from":4,"to":10},\r
{"from":7,"to":20},\r
{"from":6,"to":30}\r
]}</textarea>`,jsCode:`var myDiagram;\r
var myPalette;\r
\r
function init() {\r
  myDiagram = new go.Diagram('myDiagramDiv', {\r
    'commandHandler.archetypeGroupData': { isGroup: true, text: 'Subnet' },\r
    'undoManager.isEnabled': true\r
  }); // enable undo & redo\r
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
  myDiagram.nodeTemplate =\r
    new go.Node('Spot', {\r
        locationSpot: go.Spot.Center,\r
        locationObjectName: 'BODY',\r
        selectionObjectName: 'BODY'\r
      })\r
      .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
      .add(\r
        new go.Picture({\r
            name: 'BODY', width: 50, height: 50,\r
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'\r
          })\r
          .bind('source', 'type', t => \`images/network/\${t.toLowerCase()}.svg\`),\r
        new go.Shape({\r
          width: 25, height: 25,\r
          fill: 'transparent', strokeWidth: 0\r
        }),\r
        new go.TextBlock({\r
            alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.BottomLeft,\r
            font: '12px georgia',\r
            editable: true\r
          })\r
          .bindTwoWay('text')\r
      );\r
\r
  myDiagram.groupTemplate =\r
    new go.Group('Vertical', {\r
        locationSpot: go.Spot.Center,\r
        padding: 5 // to push the port out\r
      })\r
      // because of the always-visible Placeholder,\r
      // there's no need for a TwoWay Binding on "location"\r
      .add(\r
        new go.TextBlock({\r
            alignment: go.Spot.Left,\r
            font: '12px georgia',\r
            editable: true\r
          })\r
          .bindTwoWay('text'),\r
        new go.Panel('Auto')\r
          .add(\r
            new go.Shape('RoundedRectangle', {\r
              fill: 'transparent', stroke: '#333', strokeDashArray: [2, 6],\r
              portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'\r
            }),\r
            new go.Placeholder({ padding: 5, margin: 5, background: 'transparent' })\r
          )\r
      );\r
\r
  myPalette = new go.Palette('myPaletteDiv', {\r
    nodeTemplateMap: myDiagram.nodeTemplateMap,\r
    layout: new go.GridLayout({\r
      cellSize: new go.Size(2, 2),\r
      isViewportSized: true\r
    })\r
  });\r
\r
  myPalette.model.nodeDataArray = [\r
    { type: 'Cloud', text: 'Internet' },\r
    { type: 'Firewall', text: 'Firewall' },\r
    { type: 'Switch', text: 'Switch' },\r
    { type: 'Server', text: 'Server' },\r
    { type: 'Router', text: 'Router' },\r
    { type: 'PC', text: 'PC' }\r
  ];\r
\r
  myDiagram.linkTemplate =\r
    new go.Link({\r
        layerName: 'Background',\r
        routing: go.Routing.Orthogonal,\r
        fromSpot: go.Spot.AllSides,\r
        toSpot: go.Spot.AllSides,\r
        relinkableFrom: true,\r
        relinkableTo: true\r
      })\r
      .add(new go.Shape({ strokeWidth: 1.5, stroke: 'red' }))\r
      .add(new go.Shape({ strokeWidth: 0, fill: 'red', scale: 0.7, fromArrow: 'circle' }))\r
      .add(new go.Shape({ strokeWidth: 0, fill: 'red', scale: 0.7, toArrow: 'circle' }));\r
\r
  load();\r
}\r
\r
// Show the diagram's model in JSON format\r
function save() {\r
  document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
  myDiagram.isModified = false;\r
}\r
\r
function load() {\r
  myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
}\r
\r
window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    GoJS can be used to create network configuration diagrams for either monitoring or display.\r
    This example shows some editing capabilities:\r
  </p>\r
  <ul>\r
    <li>\r
      Drag-and-drop a Node from the Palette on the left side into the Diagram on the right side.\r
      You can move Nodes around in the Diagram, delete them, or copy them.\r
    </li>\r
    <li>\r
      You can edit any text that you see by first selecting the node or group, and then either using the F2\r
      key command or clicking on the text.\r
    </li>\r
    <li>\r
      You can draw new connections (Links) via mouse-down around the edges of a Node or Group,\r
      and then dragging to the desired Node or Group.  At such points the cursor will turn into a pointer.\r
    </li>\r
    <li>\r
      The Diagram <a>CommandHandler.archetypeGroupData</a> is set,\r
      allowing you to create new groups by pressing <code style="display: inline-block;">Ctrl + G</code>\r
      (or <code style="display: inline-block;">Cmd + G</code>) with two or more Nodes selected.\r
    </li>\r
  </ul>\r
  <p>\r
    Icons in this sample are open-licensed from <a href="https://www.svgrepo.com/collection/servers-isometric-icons/">here</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`palette`,`links`,`groups`];var g=y();l(`484xq3`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};