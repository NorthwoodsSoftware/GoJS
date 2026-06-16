import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Sparkline Charts in Nodes`,indexDescription:`Simple sparkline charts within nodes.`,screenshot:`sparklinegraphs`,priority:2,tags:[`treelayout`,`geometries`,`charts`],description:`Sparkline charts in a Diagram.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       This also adds a border to help see the edges of the viewport. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.GridLayout({\r
        wrappingColumn: 2,\r
        isOngoing: false\r
      }),\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    var SPARK_STROKEWIDTH = 1;\r
    var SPARK_INTERVAL = 3;\r
    var BASELINE_LENGTH = 75;\r
\r
    function makeStringFromValues(values) {\r
      if (values.length < 1) return 'M 0 ' + values + ' L ' + BASELINE_LENGTH + ' 0';\r
      // if only one value, make a line BASELINE_LENGTHpx long at that value\r
      var str = 'M 0 ' + Math.round(-values[0] * SPARK_INTERVAL);\r
      if (values.length < 2) str += ' L ' + BASELINE_LENGTH * SPARK_INTERVAL + ' ' + Math.round(-values[0] * SPARK_INTERVAL);\r
\r
      for (var i = 0; i < values.length; i++) {\r
        str += 'L ' + Math.round((i + 1) * SPARK_INTERVAL) + ' ' + Math.round(-values[i] * SPARK_INTERVAL);\r
      }\r
      return str;\r
    }\r
\r
    // determine y offset\r
    function makeAlignmentFromValues(values) {\r
      var min = Infinity;\r
      for (var i = 0; i < values.length; i++) {\r
        min = Math.min(min, values[i]);\r
      }\r
      var y = -min * SPARK_INTERVAL;\r
      if (min > 0) {\r
        y = -SPARK_STROKEWIDTH;\r
      } // add the strokeWidth\r
\r
      return new go.Spot(0, 1, 0, -y);\r
    }\r
\r
    var sparkLine =\r
      new go.Panel('Horizontal', {\r
          alignment: go.Spot.Left,\r
          alignmentFocusName: 'spark'\r
        })\r
        .bind('alignmentFocus', 'values', makeAlignmentFromValues)\r
        .add(\r
          new go.TextBlock({\r
              visible: false,\r
              margin: 1,\r
              font: '11px sans-serif',\r
              background: 'white'\r
            })\r
            .bind('alignment', 'values', values => {\r
              var min = Infinity;\r
              var max = -Infinity;\r
              for (var i = 0; i < values.length; i++) {\r
                min = Math.min(min, values[i]);\r
                max = Math.max(max, values[i]);\r
              }\r
              if (max - min === 0) return go.Spot.Center;\r
              return new go.Spot(0, 1 - Math.abs((values[0] - min) / (max - min)), 0, 0);\r
            })\r
            .bind('stroke', 'color')\r
            .bind('text', 'label')\r
            .bind('visible', 'label', l => true),\r
          new go.Shape({\r
              fill: null,\r
              strokeWidth: SPARK_STROKEWIDTH,\r
              stroke: 'gray',\r
              name: 'spark'\r
            })\r
            .bind('stroke', 'color')\r
            .bind('geometryString', 'values', makeStringFromValues)\r
        );\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape({\r
            fill: 'rgba(200,200,255,.3)',\r
            strokeWidth: 0\r
          }),\r
          new go.Panel('Spot', { itemTemplate: sparkLine })\r
            .bind('itemArray', 'items')\r
            .add(\r
              new go.Shape({\r
                width: 1,\r
                height: 200,\r
                fill: 'red',\r
                stroke: null,\r
                strokeWidth: 0\r
              })\r
            )\r
        );\r
\r
    function rand(min, max) {\r
      return Math.random() * (max - min) + min;\r
    }\r
\r
    // startValue optional\r
    function makeRandomValues(numberOfValues, /* optional! */ startValue) {\r
      var values = [];\r
      var last = startValue || rand(-30, 30);\r
      for (var i = 0; i < numberOfValues; i++) {\r
        var newval = last + rand(-3, 3);\r
        values.push(newval);\r
        last = newval;\r
      }\r
      return values;\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          key: 'Alpha',\r
          items: [\r
            { color: '#FF69B4', values: makeRandomValues(50, 20) },\r
            { color: '#FFB6C1', values: makeRandomValues(50) },\r
            { color: '#FF69B4', values: makeRandomValues(50) },\r
            { color: '#C71585', values: makeRandomValues(50, -20) },\r
            { color: 'gray', values: [0] }\r
          ]\r
        },\r
\r
        {\r
          key: 'Beta',\r
          items: [\r
            { color: 'rgba(255,0,0,.6)', values: makeRandomValues(50), label: 'label A' },\r
            { color: 'rgba(0,0,255,.6)', values: makeRandomValues(50), label: 'long label B' },\r
            { color: 'darkgray', values: makeRandomValues(50), label: 'label C' },\r
            { color: 'lime', values: makeRandomValues(50), label: 'label D' },\r
            { color: 'gray', values: [0] }\r
          ]\r
        },\r
\r
        {\r
          key: 'Gamma',\r
          items: [\r
            { color: 'rgba(255,0,0,.6)', values: makeRandomValues(50, -10), label: 'Important\\nYear' },\r
            { color: 'gray', values: makeRandomValues(20, 30) },\r
            { color: 'gray', values: makeRandomValues(40, 30) },\r
            { color: 'gray', values: makeRandomValues(50, 30) },\r
            { color: 'gray', values: [0] }\r
          ]\r
        }\r
      ]\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample shows how to create and align sparkline style charts in a Node, using Spot Panel and <code>Panel.alignmentFocusName</code>.</p>\r
  <p>\r
    The Spot Panel's main element is a red vertical line, and its other elements are items in an item array. Instead of aligning to these item array items,\r
    which are Horizontal Panels, we want to align to the Shape that represents the sparkline, inside of the Panel. To do this we set\r
    <code>Panel.alignmentFocusName</code> to <code>"spark"</code>, and then set the <code>alignmentFocus</code> in\r
    <code>function makeAlignmentFromValues()</code> to the top left point, plus some offset to normalize the y-axis of the sparklines.\r
  </p>\r
  <p>\r
    The Sparklines exist in a horizontal panel with optional labels at the front, and these sparkline labels also have their alignment computed within the\r
    horizontal panel, based on the fractional height of the starting value of the sparkline.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`geometries`,`charts`];var g=y();l(`1gdwowp`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};