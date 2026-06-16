import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Candlestick Charts or Range Charts in Nodes`,titleShort:`Candlestick Charts`,indexDescription:`Simple candlestick or range charts within nodes.`,screenshot:`candlestickcharts`,priority:2,tags:[`tables`,`itemarrays`,`geometries`,`charts`],description:`GoJS nodes containing simple range charts.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="background-color: white; border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv');\r
\r
    // the template for each attribute in a node's array of item data\r
    var itemTempl =\r
      new go.Panel('TableRow')\r
        .add(\r
          new go.TextBlock({ column: 0 })\r
            .bind('text'),\r
          new go.Shape({\r
              column: 1,\r
              alignment: go.Spot.Left,\r
              fill: 'slateblue',\r
              stroke: 'darkblue'\r
            })\r
            .bind('geometry', '', produceRange)\r
        );\r
\r
    function produceRange(d) {\r
      var h = 12; // total height for the markers\r
      var w = 3; // half width for the median marker\r
      // using constructors is more efficient than calling go.GraphObject.mak:\r
      return new go.Geometry()\r
        .add(\r
          new go.PathFigure(d.min, h / 2, false)\r
            .add(new go.PathSegment(go.SegmentType.Line, d.max, h / 2))\r
        )\r
        .add(\r
          new go.PathFigure(d.min, 0, false)\r
            .add(new go.PathSegment(go.SegmentType.Line, d.min, h))\r
        )\r
        .add(\r
          new go.PathFigure(d.max, 0, false)\r
            .add(new go.PathSegment(go.SegmentType.Line, d.max, h))\r
        )\r
        .add(\r
          new go.PathFigure(d.val - w, 0)\r
            .add(new go.PathSegment(go.SegmentType.Line, d.val + w, 0))\r
            .add(new go.PathSegment(go.SegmentType.Line, d.val + w, h))\r
            .add(new go.PathSegment(go.SegmentType.Line, d.val - w, h).close())\r
        );\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape({ fill: 'white' }),\r
          new go.Panel('Table', {\r
              margin: 6,\r
              itemTemplate: itemTempl\r
            })\r
            .bind('itemArray', 'items')\r
        );\r
\r
    const nodeDataArray = [\r
      {\r
        items: [\r
          { text: 'first', min: 10, val: 50, max: 60 },\r
          { text: 'second', min: 20, val: 70, max: 90 },\r
          { text: 'third', min: 40, val: 60, max: 110 },\r
          { text: 'fourth', min: 50, val: 80, max: 130 }\r
        ]\r
      }\r
    ];\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: nodeDataArray\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This is a simple example of a candlestick chart made using a custom <a>Geometry</a>\r
    inside the <a>Panel.itemTemplate</a>.\r
  </p>\r
  <p>\r
    For more sophisticated charts within nodes, see the\r
    <a href="canvases">Canvas Charts</a> sample.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`geometries`,`charts`];var g=y();l(`4gl1oh`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};