import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Warehouse Designer`,indexDescription:`Warehouse layout designer with a drag-and-drop palette, reshapable areas, and disconnected links.`,screenshot:`warehouse`,priority:1.1,tags:[`monitoring`,`grid`],description:`Warehouse layout designer with a drag-and-drop palette of parts, reshapable areas, and disconnected links showing picking paths.`},htmlContent:`<div style="display: flex; gap: 2px">\r
    <div id="myPaletteDiv" style="width: 150px; height: 800px; border: solid 1px black; background-color: #f8fafc"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 800px; border: solid 1px black"></div>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "GraphLinksModel",\r
  "pointsDigits": 0,\r
  "nodeDataArray": [\r
{"key":0,"category":"building","size":"640 680","loc":"-90 -190"},\r
{"key":1,"label":"Rack A","color":"#334155","size":"420 60","loc":"70 -130"},\r
{"key":-13,"label":"Rack B","color":"#334155","size":"420 60","loc":"70 -10"},\r
{"key":2,"label":"Rack C","color":"#334155","size":"420 60","loc":"70 110"},\r
{"key":4,"label":"Returns","color":"#94a3b8","size":"80 100","loc":"-70 -130"},\r
{"key":5,"category":"zone","label":"Inbound\\nStaging","color":"#16a34a","size":"100 160","loc":"-70 30"},\r
{"key":6,"label":"Free Area","category":"zone","color":"#94a3b8","size":"180 100","loc":"70 210"},\r
{"key":7,"label":"Free Area","category":"zone","color":"#94a3b8","size":"180 100","loc":"310 210"},\r
{"key":8,"label":"Overflow\\nStaging","color":"#94a3b8","size":"80 80","loc":"410 370"},\r
{"key":9,"label":"Labeling","color":"#94a3b8","size":"120 80","loc":"250 370"},\r
{"key":10,"label":"Packing","color":"#94a3b8","size":"120 40","loc":"70 410"},\r
{"key":11,"label":"Packing","color":"#94a3b8","size":"120 40","loc":"70 350"},\r
{"key":12,"category":"zone","label":"Outbound\\nShipping","color":"#dc2626","size":"100 120","loc":"-70 330"},\r
{"key":13,"category":"door","size":"20 120","loc":"-110 70"},\r
{"key":14,"category":"door","size":"20 120","loc":"-110 270"}\r
],\r
  "linkDataArray": [\r
{"points":[156,-47,386,-47],"text":"Picking Path"},\r
{"points":[156,73,386,73],"text":"Picking Path"},\r
{"points":[156,-167,386,-167],"text":"Picking Path"},\r
{"points":[511,-125,511,150],"text":"Transfer"},\r
{"points":[480,330,250,330],"text":"To Packing"}\r
]}\r
</textarea>`,jsCode:`let myDiagram, myPalette;\r
\r
  function init() {\r
    const CellSize = new go.Size(20, 20);\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      contentAlignment: go.Spot.Center,\r
      initialAutoScale: go.AutoScale.Uniform,\r
      padding: 24,\r
      'grid.visible': true,\r
      'grid.gridCellSize': CellSize,\r
      'animationManager.isEnabled': false,\r
      'undoManager.isEnabled': true,\r
      'draggingTool.dragsLink': true,\r
      'relinkingTool.isUnconnectedLinkValid': true,\r
      'linkingTool.isUnconnectedLinkValid': true,\r
      'draggingTool.isGridSnapEnabled': true,\r
      'draggingTool.gridSnapCellSpot': go.Spot.Center,\r
      'resizingTool.isGridSnapEnabled': true\r
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
    // The default node template represents racks and work areas, node data's color property sets \r
    // the stroke and the fill is always transparent (making it's inside selectable)\r
    myDiagram.nodeTemplateMap.add('',\r
      new go.Node('Spot', {\r
          resizable: true,\r
          resizeObjectName: 'mainShape',\r
          isShadowed: true,\r
          shadowOffset: new go.Point(0, 1.5),\r
          shadowBlur: 6,\r
          shadowColor: 'rgba(15, 23, 42, 0.1)',\r
          // because the gridSnapCellSpot is Center, offset the Node's location\r
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
              name: 'mainShape',\r
              fill: 'transparent',\r
              stroke: '#334155',\r
              strokeWidth: 1.5,\r
              minSize: CellSize,\r
              desiredSize: CellSize // defaults to 1x1 cell\r
            })\r
            .bind('stroke', 'color')\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify),\r
          new go.TextBlock({ \r
            font: '600 12px ' + FONT_FAM, \r
            stroke: '#1f2937', \r
            textAlign: 'center',\r
            editable: true\r
          })\r
            .bindTwoWay('text', 'label')\r
        )\r
    );\r
\r
    // Zone node template represents open floor areas, drawn as colored dashed\r
    // outlines with null fill (makes them only selectable on their stroke or text)\r
    myDiagram.nodeTemplateMap.add('zone',\r
      new go.Node('Spot', {\r
          resizable: true,\r
          resizeObjectName: 'mainShape',\r
          // because the gridSnapCellSpot is Center, offset the Node's location\r
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              name: 'mainShape',\r
              parameter1: 6,\r
              fill: null,\r
              stroke: '#94a3b8',\r
              strokeDashArray: [8, 6],\r
              strokeWidth: 1.6,\r
              minSize: CellSize,\r
              desiredSize: CellSize // defaults to 1x1 cell\r
            })\r
            .bind('stroke', 'color')\r
            // a transparent fill makes the interior pickable in the Palette\r
            // a null fill leaves it click-through in the diagram\r
            .bindObject('fill', '', (p) => (p.diagram instanceof go.Palette ? 'transparent' : null))\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify),\r
          new go.TextBlock({ \r
            font: '600 11px ' + FONT_FAM, \r
            stroke: '#94a3b8', \r
            textAlign: 'center',\r
            editable: true\r
          })\r
            .bindTwoWay('text', 'label')\r
            .bind('stroke', 'color')\r
        )\r
    );\r
\r
    // Building node template, represents exterior walls, in background layer so can't be selected\r
    myDiagram.nodeTemplateMap.add('building',\r
      new go.Node('Spot', {\r
          layerName: 'Background',\r
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2),\r
          selectable: false,\r
          pickable: false\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
              name: 'mainShape',\r
              stroke: '#0f172a',\r
              fill: 'rgba(15, 23, 42, 0.02)',\r
              strokeWidth: 3,\r
              minSize: CellSize,\r
              desiredSize: CellSize // defaults to 1x1 cell\r
            })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        )\r
    );\r
\r
    // Door node template represents dock doors placed against the walls\r
    myDiagram.nodeTemplateMap.add('door',\r
      new go.Node('Spot', {\r
          resizable: true,\r
          resizeObjectName: 'mainShape',\r
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
              name: 'mainShape',\r
              fill: '#0f172a',\r
              stroke: null,\r
              minSize: CellSize,\r
              desiredSize: CellSize\r
            })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        )\r
    );\r
\r
    // Disconnected links show picking and transfer paths\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          toShortLength: 4\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          new go.Shape({ stroke: '#64748b', strokeDashArray: [7, 5], isPanelMain: true, strokeWidth: 2 }),\r
          new go.Shape({ stroke: '#64748b', fill: '#64748b', toArrow: 'Triangle', scale: 1.3 }),\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', { fill: 'white', stroke: '#e2e8f0', strokeWidth: 1, parameter1: 3 }),\r
              new go.TextBlock({\r
                  textAlign: 'center',\r
                  font: '600 9px ' + FONT_FAM,\r
                  stroke: '#64748b',\r
                  margin: new go.Margin(2, 5),\r
                  minSize: new go.Size(10, NaN),\r
                  editable: true\r
                })\r
                .bindTwoWay('text')\r
            )\r
        );\r
\r
    // load the initial diagram from the JSON text below\r
    load();\r
\r
    // Palette of parts the user can drag onto the floor plan: every node type\r
    // except the building, plus a disconnected link for a new path. It shares\r
    // the diagram's templates so dropped parts look identical.\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplateMap: myDiagram.nodeTemplateMap,\r
      linkTemplateMap: myDiagram.linkTemplateMap,\r
      layout: new go.GridLayout({ wrappingColumn: 1, spacing: new go.Size(10, 16) }),\r
      model: new go.GraphLinksModel(\r
        [\r
          { label: 'Rack', color: '#334155', size: '120 40' },\r
          { label: 'Work Area', color: '#94a3b8', size: '100 40' },\r
          { category: 'zone', label: 'Inbound', color: '#16a34a', size: '100 60' },\r
          { category: 'zone', label: 'Outbound', color: '#dc2626', size: '100 60' },\r
          { category: 'zone', label: 'Free Area', color: '#94a3b8', size: '100 60' },\r
          { category: 'door', size: '20 80' }\r
        ],\r
        [\r
          // a disconnected link, which the user can drag-and-drop onto the floor plan\r
          { text: 'Path', points: new go.List().addAll([new go.Point(0, 0), new go.Point(70, 0)]) }\r
        ]\r
      )\r
    });\r
  } // end init\r
\r
  const FONT_FAM = 'Helvetica, sans-serif';\r
\r
  // save a model to and load a model from JSON text, displayed below the Diagram\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  document.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    GoJS can be used to create industrial editors or monitors, such as the editing of warehouse layouts or HVAC layouts, or the monitoring of industrial systems\r
    or building security.\r
  </p>\r
  <p>\r
    Drag racks, work areas, zones, and dock doors from the <a href="../learn/palette.html">Palette</a> on the left onto the floor plan, where they snap to the grid.\r
    Parts can be moved and resized, and text can be edited with a double-click and saved to the model. Disconnected links show suggested picking and transfer paths: \r
    drag the link out of the palette to add a new one and drag a link's endpoints to reroute it.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`monitoring`,`grid`];var g=y();l(`l0lbc8`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};