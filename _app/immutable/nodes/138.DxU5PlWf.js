import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Fault Tree Analysis Diagram Where Gate-Figure Shapes Describe Relationships of Contributing Conditions to Subsystem Nodes`,titleShort:`Fault Tree Analysis`,indexDescription:`A fault tree diagram with collapsing/expanding subtrees and gates at each non-root node.`,screenshot:`faulttree`,priority:2,tags:[`treelayout`,`buttons`],description:`A Fault Tree diagram showing gate shapes at each non-root node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.TreeModel",\r
"nodeDataArray": [\r
{"key":1, "text":"No flow to receiver", "figure":"None"},\r
{"key":2, "text":"No flow from Component B", "parent":1, "figure":"OrGate", "choice":"G02"},\r
{"key":3, "text":"No flow into Component B", "parent":2, "figure":"AndGate", "choice":"G03"},\r
{"key":4, "text":"Component B blocks flow", "parent":2, "figure":"Circle", "choice":"B01"},\r
{"key":5, "text":"No flow from Component A1", "parent":3, "figure":"OrGate", "choice":"G04"},\r
{"key":6, "text":"No flow from Component A2", "parent":3, "figure":"OrGate", "choice":"G05"},\r
{"key":7, "text":"No flow from source1", "parent":5, "figure":"Triangle", "choice":"T01"},\r
{"key":8, "text":"Component A1 blocks flow", "parent":5, "figure":"Circle", "fill":"green", "choice":"B02"},\r
{"key":9, "text":"No flow from source2", "parent":6, "figure":"Triangle", "choice":"T02"},\r
{"key":10, "text":"Component A2 blocks flow", "parent":6, "figure":"Circle", "choice":"B03"}\r
]}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      allowDelete: false,\r
      'draggingTool.dragsTree': true,\r
      layout: new go.TreeLayout({\r
          angle: 90,\r
          layerSpacing: 30,\r
          arrangement: go.TreeArrangement.FixedRoots\r
        }),\r
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
    function nodeFillConverter(figure) {\r
      switch (figure) {\r
        case 'AndGate':\r
          // right to left so when it's rotated, it goes from top to bottom\r
          return new go.Brush('Linear', { 0: '#EA8100', 1: '#C66D00', start: go.Spot.Right, end: go.Spot.Left });\r
        case 'OrGate':\r
          return new go.Brush('Linear', { 0: '#0058D3', 1: '#004FB7', start: go.Spot.Right, end: go.Spot.Left });\r
        case 'Circle':\r
          return new go.Brush('Linear', { 0: '#009620', 1: '#007717' });\r
        case 'Triangle':\r
          return new go.Brush('Linear', { 0: '#7A0099', 1: '#63007F' });\r
        default:\r
          return 'whitesmoke';\r
      }\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', { // the default node template\r
          selectionObjectName: 'BODY',\r
          locationSpot: go.Spot.Center,\r
          locationObjectName: 'BODY'\r
        })\r
        // the main "BODY" consists of a Rectangle surrounding some text\r
        .add(\r
          new go.Panel('Auto', {\r
              name: 'BODY',\r
              portId: ''\r
            })\r
            .add(\r
              new go.Shape({\r
                fill: new go.Brush('Linear', {\r
                  0: '#770000',\r
                  1: '#600000'\r
                }),\r
                stroke: null\r
              }),\r
              new go.TextBlock({\r
                  margin: new go.Margin(2, 10, 1, 10),\r
                  maxSize: new go.Size(100, NaN),\r
                  stroke: 'whitesmoke',\r
                  font: '10pt Segoe UI, sans-serif'\r
                })\r
                .bind('text')\r
            ), // end "BODY", an Auto Panel\r
          go.GraphObject.build('TreeExpanderButton', {\r
            alignment: go.Spot.Right,\r
            alignmentFocus: go.Spot.Left,\r
            'ButtonBorder.figure': 'Rectangle'\r
          }),\r
          new go.Shape('LineV', {\r
              strokeWidth: 1.5,\r
              height: 20,\r
              alignment: new go.Spot(0.5, 1, 0, -1),\r
              alignmentFocus: go.Spot.Top\r
            })\r
            .bind('visible', 'figure', f => f !== 'None'),\r
          new go.Shape({\r
              alignment: new go.Spot(0.5, 1, 0, 5),\r
              alignmentFocus: go.Spot.Top,\r
              width: 30,\r
              height: 30,\r
              stroke: null\r
            })\r
            .bind('visible', 'figure', f => f !== 'None')\r
            .bind('figure')\r
            .bind('fill', 'figure', nodeFillConverter)\r
            // ORs and ANDs should point upwards\r
            .bind('angle', 'figure', f => (f === 'OrGate' || f === 'AndGate') ? -90 : 0),\r
          new go.TextBlock({\r
              alignment: new go.Spot(0.5, 1, 20, 20),\r
              alignmentFocus: go.Spot.Left,\r
              stroke: 'black',\r
              font: '10pt Segoe UI, sans-serif'\r
            })\r
            .bind('text', 'choice')\r
            .bind('visible', 'figure', f => f !== 'None') // if we don't have a figure, don't display any choice text\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Orthogonal,\r
          layerName: 'Background',\r
          curviness: 20,\r
          corner: 5\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 })\r
        );\r
\r
    load();\r
  }\r
\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>\r
    <em>Fault trees</em> are used to conduct deductive failure analysis in which an undesired state of a system is analyzed using Boolean logic to combine a\r
    series of lower-level events.\r
  </p>\r
  <p>\r
    This diagram uses a basic <a>TreeModel</a> and <a>TreeLayout</a> to layout nodes in a tree structure. The <a>Diagram.nodeTemplate</a> definition allows for\r
    text describing the undesirable states and, when necessary, a figure indicating an event/gate.\r
  </p>\r
  <p>\r
    The <b>visible</b> property on some of the node template's <a>Shape</a>s is set based on whether a figure is chosen for the node in the\r
    <a>Model.nodeDataArray</a>. The nodes also display a <b>TreeExpanderButton</b> allowing for expanding/collapsing of subtrees. See the\r
    <a href="../intro/buttons">learn page on buttons</a> for more GoJS button information.\r
  </p>\r
  <p>\r
    Related to deductive failure analysis is root cause analysis, or RCA. See the <a href="../samples/Fishbone">fishbone layout</a>\r
    extension page for a diagram format typically used in root cause analysis.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`buttons`];var g=y();l(`2foi9r`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};