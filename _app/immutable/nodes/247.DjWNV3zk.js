import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Sequential Function Chart for Control Systems with Steps, Transitions, Parallel Branches, and Convergences`,titleShort:`Sequential Function Chart`,indexDescription:`A sequence diagram that shows different node templates, LayeredDigraphLayout and in-place text editing.`,screenshot:`sequentialfunction`,priority:2,tags:[`layered-digraph`,`process`],description:`A sequential function chart.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width:100%;height:400px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":"S1", "category":"step", "text":"Step 1"},\r
{"key":"TR1", "category":"transition", "text":"Transition 1"},\r
{"key":"S2", "category":"step", "text":"Step 2"},\r
{"key":"TR2", "category":"transition", "text":"Transition 2"},\r
{"key":"BAR1", "category":"parallel" },\r
{"key":"S3", "category":"step", "text":"Step 3"},\r
{"key":"S4", "category":"step", "text":"Step 4"},\r
{"key":"BAR2", "category":"parallel" },\r
{"key":"TR3", "category":"transition", "text":"Transition 3"},\r
{"key":"S5", "category":"step", "text":"Step 5"}\r
 ],\r
  "linkDataArray": [\r
{"from":"S1", "to":"TR1"},\r
{"from":"TR1", "to":"S2"},\r
{"from":"S2", "to":"TR2"},\r
{"from":"TR2", "to":"BAR1"},\r
{"from":"BAR1", "to":"S3"},\r
{"from":"BAR1", "to":"S4"},\r
{"from":"S3", "to":"BAR2"},\r
{"from":"S4", "to":"BAR2"},\r
{"from":"BAR2", "to":"TR3"},\r
{"from":"TR3", "to":"S5"}\r
 ]}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
\r
      myDiagram = new go.Diagram('myDiagramDiv', {\r
        layout: new go.LayeredDigraphLayout({\r
          direction: 90,\r
          layerSpacing: 10,\r
          setsPortSpots: false\r
        }),\r
        'undoManager.isEnabled': true  // enable undo & redo\r
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
      // define the step Node template\r
      myDiagram.nodeTemplateMap.add('step',\r
        new go.Node('Spot', { locationSpot: go.Spot.Center })\r
          .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
          .add(\r
            new go.Shape('Rectangle', {\r
              fill: 'whitesmoke',\r
              stroke: 'gray',\r
              strokeWidth: 2,\r
              desiredSize: new go.Size(160, 60),\r
              portId: '',  // so that links connect to the Shape, not to the whole Node\r
              fromSpot: go.Spot.BottomSide,\r
              toSpot: go.Spot.TopSide,\r
              alignment: go.Spot.Center\r
            }),\r
            new go.TextBlock({\r
                font: 'bold 16px sans-serif',\r
                alignment: go.Spot.Center,\r
                wrap: go.Wrap.Fit,\r
                editable: true\r
              })\r
              .bindTwoWay('text')\r
          )\r
      );\r
\r
      // define the transition Node template.\r
      myDiagram.nodeTemplateMap.add('transition',\r
        new go.Node('Horizontal', {\r
            locationSpot: go.Spot.Center,\r
            locationObjectName: 'BAR'\r
          })\r
          .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
          .add(\r
            new go.Shape('Rectangle', {\r
              name: 'BAR',\r
              fill: 'black',\r
              stroke: null,\r
              desiredSize: new go.Size(60, 8),\r
              portId: '',\r
              fromSpot: go.Spot.BottomSide,\r
              toSpot: go.Spot.TopSide\r
            }),\r
            new go.TextBlock({\r
                editable: true,\r
                margin: 3\r
              })\r
              .bindTwoWay('text')\r
          )\r
      );\r
\r
      // define the parallel Node template.\r
      myDiagram.nodeTemplateMap.add('parallel',\r
        new go.Node({ locationSpot: go.Spot.Center })\r
          .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
          .add(\r
            new go.Shape('Rectangle', {\r
              fill: 'whitesmoke',\r
              stroke: 'black',\r
              fromSpot: go.Spot.Bottom,\r
              toSpot: go.Spot.Top,\r
              desiredSize: new go.Size(200, 6),\r
              portId: '',\r
              fromSpot: go.Spot.BottomSide,\r
              toSpot: go.Spot.TopSide\r
            })\r
          )\r
      );\r
\r
      // define the Link template\r
      myDiagram.linkTemplate =\r
        new go.Link({ routing: go.Routing.Orthogonal })\r
          .add(\r
            new go.Shape({ stroke: 'black', strokeWidth: 2 })\r
          );\r
\r
      // create the graph by reading the JSON data saved in "mySavedModel" textarea element\r
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
    window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    <em>Sequential function charts</em> are used for programmable logic controllers (PLCs) and other control systems.\r
  </p>\r
  <p>\r
    You can edit text in-place by clicking on the text of a selected node. The diagram uses 3 categories of node,\r
    each added to the <a>Diagram.nodeTemplateMap</a>:\r
    <ul>\r
      <li><b>step</b></li>\r
      <li><b>transition</b></li>\r
      <li><b>parallel</b></li>\r
    </ul>\r
  </p>\r
  <p>\r
    See also the <a href="grafcet">grafcet diagram sample</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`layered-digraph`,`process`];var g=y();l(`2yhclo`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};