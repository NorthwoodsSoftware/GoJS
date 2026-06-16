import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Bar Charts in Nodes`,indexDescription:`Simple bar charts or histograms within nodes.`,screenshot:`barcharts`,priority:2,tags:[`tables`,`itemarrays`,`tooltips`,`charts`],description:`GoJS nodes containing simple bar charts.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="background-color: white; border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv');\r
\r
    // the template for each item in a node's array of item data\r
    var itemTempl =\r
      new go.Panel('TableColumn')\r
        .add(\r
          new go.Shape({\r
              row: 0,\r
              alignment: go.Spot.Bottom,\r
              fill: 'slateblue',\r
              stroke: null,\r
              width: 40,\r
              toolTip:\r
                go.GraphObject.build('ToolTip')\r
                  .add(\r
                    new go.TextBlock({ margin: 4 })\r
                      .bind('text', 'val')\r
                  )\r
            })\r
            .bind('height', 'val')\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ row: 1 })\r
            .bind('text')\r
        );\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape({ fill: 'white' }),\r
          new go.Panel('Vertical')\r
            .add(\r
              new go.Panel('Table', {\r
                  margin: 6,\r
                  itemTemplate: itemTempl\r
                })\r
                .bind('itemArray', 'items'),\r
              new go.TextBlock({ font: 'bold 12pt sans-serif' })\r
                .bind('text')\r
            )\r
        );\r
\r
    const nodeDataArray = [\r
      {\r
        key: 1,\r
        text: 'Before',\r
        items: [\r
          { text: 'first', val: 50 },\r
          { text: 'second', val: 70 },\r
          { text: 'third', val: 60 },\r
          { text: 'fourth', val: 80 }\r
        ]\r
      },\r
      {\r
        key: 2,\r
        text: 'After',\r
        items: [\r
          { text: 'first', val: 50 },\r
          { text: 'second', val: 70 },\r
          { text: 'third', val: 75, color: 'red' },\r
          { text: 'fourth', val: 80 }\r
        ]\r
      }\r
    ];\r
    const linkDataArray = [{ from: 1, to: 2 }];\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: nodeDataArray,\r
      linkDataArray: linkDataArray\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Each node contains a Table Panel whose <a>Panel.itemArray</a> is data bound to the "items"\r
    property which holds an Array of data objects. That Table Panel has an\r
    <a>Panel.itemTemplate</a> which creates a bar (a rectangular Shape) and a TextBlock label for\r
    each item. Each bar also has a tooltip showing the value.\r
  </p>\r
  <p>\r
    For more sophisticated charts within nodes, see the\r
    <a href="canvases">Canvas Charts</a> sample.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`tooltips`,`charts`];var g=y();l(`oimt9f`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};