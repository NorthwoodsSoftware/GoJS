import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Pie Charts in Nodes`,titleShort:`Pie Charts`,indexDescription:`Simple pie charts within nodes.`,screenshot:`piecharts`,priority:2,tags:[`itemarrays`,`tooltips`,`geometries`,`charts`],description:`GoJS nodes containing simple pie charts, each slice showing a tooltip.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      nodeTemplate:\r
        new go.Node('Vertical')\r
          .add(\r
            new go.Panel({\r
                itemTemplate:\r
                  new go.Panel({\r
                      toolTip:\r
                        go.GraphObject.build('ToolTip')\r
                          .add(\r
                            new go.TextBlock({ margin: 4 })\r
                              .bind('text', '', data => data.color + ': ' + data.start + ' to ' + (data.start + data.sweep))\r
                          )\r
                    })\r
                    .add(\r
                      new go.Shape({ fill: 'lightgreen', isGeometryPositioned: true })\r
                        .bind('fill', 'color')\r
                        .bind('geometry', '', makeGeo)\r
                    )\r
              })\r
              .bind('itemArray', 'slices'),\r
            new go.TextBlock()\r
              .bind('text')\r
          ),\r
      model: new go.GraphLinksModel({\r
        copiesArrays: true,\r
        copiesArrayObjects: true,\r
        nodeDataArray: [\r
          // node data\r
          {\r
            key: 1,\r
            text: 'full circle',\r
            slices: [\r
              { start: -30, sweep: 60, color: 'white' },\r
              { start: 30, sweep: 300, color: 'red' }\r
            ]\r
          },\r
          {\r
            key: 2,\r
            text: 'partial circle',\r
            slices: [\r
              { start: 0, sweep: 120, color: 'lightgreen' },\r
              { start: 120, sweep: 70, color: 'blue' },\r
              { start: 250, sweep: 20, color: 'yellow' }\r
            ]\r
          }\r
        ],\r
        linkDataArray: [\r
          // link data\r
          { from: 1, to: 2 }\r
        ]\r
      })\r
    });\r
\r
    function makeGeo(data) {\r
      return new go.Geometry()\r
        .add(\r
          new go.PathFigure(50, 50) // start point\r
            .add(\r
              new go.PathSegment(\r
                go.SegmentType.Arc,\r
                data.start,\r
                data.sweep, // angles\r
                50,\r
                50, // center\r
                50,\r
                50\r
              ) // radius\r
                .close()\r
            )\r
        );\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Each node has a Position Panel whose <a>Panel.itemArray</a> is data bound to the "slices" property of the node data. That "slices" property is an Array of\r
    data objects; for each item the <a>Panel.itemTemplate</a> produces a Shape whose <a>Shape.geometry</a> is computed using a conversion function to generate a\r
    pie-shaped slice given a start angle and a sweep angle from the item data. Note that <a>Shape.isGeometryPositioned</a> is true to make sure all of the\r
    Shapes are positioned by their computed geometries, independent of any stroke width. Each slice Panel also has a tooltip showing some information.\r
  </p>\r
  <p>For more sophisticated charts within nodes, see the <a href="canvases">Canvas Charts</a> sample.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`itemarrays`,`tooltips`,`geometries`,`charts`];var g=y();l(`1va5obo`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};