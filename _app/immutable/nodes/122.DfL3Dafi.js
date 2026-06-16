import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Donut Charts Implemented as Shapes in Nodes`,titleShort:`Donut Charts in Nodes`,indexDescription:`Ring-shaped pie charts within nodes.`,screenshot:`donutcharts`,priority:2,tags:[`itemarrays`,`geometries`,`charts`],description:`A donut chart in each node.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv');\r
\r
    const Inner = 40; // inner radius\r
    const Thickness = 30; // Inner + Thickness is outer radius\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot')\r
        .add(\r
          new go.Panel({\r
              itemTemplate:\r
                new go.Panel('Spot', {\r
                    toolTip:\r
                      go.GraphObject.build('ToolTip')\r
                        .add(\r
                          new go.TextBlock()\r
                            .bind('text', '', d => \`\${d.text}\\n#: \${d.value}\\n\${(d.sweep / 3.6).toFixed(1)}%\`)\r
                        )\r
                  })\r
                  .add(\r
                    new go.Shape({ fill: '#00000020', stroke: 'white' }) // this always occupies the full circle\r
                      .bind('geometry', '', makeAnnularWedge)\r
                      .bind('fill', 'color'),\r
                    new go.TextBlock({\r
                        width: Thickness,\r
                        textAlign: 'center',\r
                        font: '8pt sans-serif'\r
                      })\r
                      .bind('alignment', '', computeTextAlignment)\r
                      //.bind("angle", "", ensureUpright),  // does the text need to be rotated?\r
                      .bind('text', '', d => d.value + '\\n' + Math.round(d.sweep / 3.6) + '%')\r
                  )\r
            })\r
            .bind('itemArray', 'values', normalizeData),\r
          new go.TextBlock({\r
              maxSize: new go.Size(2 * Inner, 2 * Inner),\r
              font: 'bold 10pt sans-serif'\r
            })\r
            .bind('text')\r
        );\r
\r
    function normalizeData(arr) {\r
      const details = [];\r
      let total = 0;\r
      arr.forEach(item => {\r
        if (typeof item === 'object') {\r
          details.push(Object.assign({}, item));\r
          total += Math.max(item.value, 0.001);\r
        } else {\r
          details.push({ value: item });\r
          total += Math.max(Number(item), 0.001);\r
        }\r
      });\r
      let angle = 0;\r
      details.forEach(item => {\r
        item.angle = angle;\r
        const sw = (item.value / total) * 360;\r
        item.sweep = sw;\r
        angle += sw;\r
        item.radius = Inner;\r
        item.thick = Thickness;\r
      });\r
      return details;\r
    }\r
\r
    function makeAnnularWedge(data) {\r
      const angle = typeof data.angle === 'number' ? data.angle : 0; // start angle\r
      const sweep = typeof data.sweep === 'number' ? data.sweep : 90;\r
      const radius = typeof data.radius === 'number' ? data.radius : Inner; // inner radius\r
      const thick = typeof data.thick === 'number' ? data.thick : Thickness;\r
\r
      // the Geometry will be centered about (0,0)\r
      const outer = radius + thick; // the outer radius\r
      const inner = radius;\r
      const p = new go.Point(outer, 0).rotate(angle);\r
      const q = new go.Point(inner, 0).rotate(angle + sweep);\r
      const rad = Inner + Thickness;\r
      const geo = new go.Geometry()\r
        .add(new go.PathFigure(-rad, -rad)) // always make sure the Geometry includes the top left corner\r
        .add(new go.PathFigure(rad, rad)) // and the bottom right corner of the whole circular area\r
        .add(\r
          new go.PathFigure(p.x, p.y) // start at outer corner, go clockwise\r
            .add(new go.PathSegment(go.SegmentType.Arc, angle, sweep, 0, 0, outer, outer))\r
            .add(new go.PathSegment(go.SegmentType.Line, q.x, q.y)) // to opposite inner corner, then anticlockwise\r
            .add(new go.PathSegment(go.SegmentType.Arc, angle + sweep, -sweep, 0, 0, inner, inner).close())\r
        );\r
      return geo;\r
    }\r
\r
    function computeTextAlignment(data) {\r
      const angle = typeof data.angle === 'number' ? data.angle : 0; // start angle\r
      const sweep = typeof data.sweep === 'number' ? data.sweep : 90;\r
      const radius = typeof data.radius === 'number' ? data.radius : Inner; // inner radius\r
      const thick = typeof data.thick === 'number' ? data.thick : Thickness;\r
      const p = new go.Point(radius + thick / 2, 0).rotate(angle + sweep / 2);\r
      return new go.Spot(0.5, 0.5, p.x, p.y);\r
    }\r
\r
    // only used if rotating the text labels\r
    function ensureUpright(data) {\r
      const angle = typeof data.angle === 'number' ? data.angle : 0;\r
      const sweep = typeof data.sweep === 'number' ? data.sweep : 90;\r
      const a = angle + sweep / 2;\r
      if (a > 90 && a < 270) return a + 180;\r
      return a;\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', values: [10, 20, 30] },\r
        { key: 2, text: 'Beta', values: [{ value: 1, color: 'goldenrod' }] },\r
        {\r
          key: 3,\r
          text: 'Gamma',\r
          values: [\r
            { value: 3, color: '#EFFFFD' },\r
            { value: 9, color: '#B8FFF9' },\r
            { value: 12, color: '#85F4FF' },\r
            { value: 7, color: '#42C2FF' }\r
          ]\r
        },\r
        {\r
          key: 4,\r
          text: 'Delta',\r
          values: [\r
            { value: 30, color: 'pink' },\r
            { value: 90, color: 'lightgreen' }\r
          ]\r
        }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Each node contains a Position Panel containing a variable number of elements\r
    that get Geometry values such that each shows a data value as an annular bar\r
    in a circle. One can also specify the colors of the bars. The\r
    <a>Panel.itemTemplate</a> also includes a <a>TextBlock</a> that shows its\r
    actual value as well as the percentage that it represents of the whole Array\r
    of data values.\r
  </p>\r
  <p>\r
    For more sophisticated charts within nodes, see the\r
    <a href="canvases">Canvas Charts</a> sample.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`itemarrays`,`geometries`,`charts`];var g=y();l(`1vy5s82`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};