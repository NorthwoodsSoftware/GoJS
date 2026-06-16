import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Diagram Scroll Modes`,indexDescription:`Shows infinite scrolling and positionComputation.`,screenshot:`scrollmodes`,priority:2,tags:[`grid`],description:`Infinite scrolling and custom limits on Diagram position and scale.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height:400px;margin-bottom: 1rem;"></div>\r
\r
  <p>\r
    <label><input id="infscroll" type="checkbox" />Enable Infinite Scrolling, setting <a>Diagram.scrollMode</a></label>\r
    <pre class="lang-js"><code>\r
myDiagram.scrollMode = checked ? go.ScrollMode.Infinite : go.ScrollMode.Document;\r
    </code></pre>\r
  </p>\r
\r
  <p>\r
    <label><input id="poscomp" type="checkbox" />Enable <a>Diagram.positionComputation</a> function</label>\r
    <pre class="lang-js"><code>\r
function positionfunc(diagram, pos) {\r
  var size = diagram.grid.gridCellSize;\r
  return new go.Point(\r
    Math.round(pos.x / size.width) * size.width,\r
    Math.round(pos.y / size.height) * size.height);\r
}\r
    </code></pre>\r
  </p>\r
\r
  <p>\r
    <label><input id="scalecomp" type="checkbox" />Enable <a>Diagram.scaleComputation</a> function</label>\r
    <pre class="lang-js"><code>\r
function scalefunc(diagram, scale) {\r
  var oldscale = diagram.scale;\r
  if (scale > oldscale) {\r
    return oldscale + 0.25;\r
  } else if (scale < oldscale) {\r
    return oldscale - 0.25;\r
  }\r
  return oldscale;\r
}\r
    </code></pre>\r
  </p>`,jsCode:`function init() {\r
\r
      myDiagram = new go.Diagram('myDiagramDiv', {\r
        minScale: 0.25,  // so that the contents and the grid cannot appear too small\r
        grid:\r
          new go.Panel('Grid')\r
            .add(\r
              new go.Shape('LineH', { stroke: 'gray', strokeWidth: .5 }),\r
              new go.Shape('LineH', { stroke: 'darkslategray', strokeWidth: 1.5, interval: 10 }),\r
              new go.Shape('LineV', { stroke: 'gray', strokeWidth: .5 }),\r
              new go.Shape('LineV', { stroke: 'darkslategray', strokeWidth: 1.5, interval: 10 })\r
            ),\r
        'draggingTool.isGridSnapEnabled': true,\r
        'undoManager.isEnabled': true  // enable undo & redo\r
      });\r
\r
      myDiagram.nodeTemplate =\r
        new go.Node('Auto')  // the Shape will go around the TextBlock\r
          .add(\r
            new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
              // Shape.fill is bound to Node.data.color\r
              .bind('fill', 'color'),\r
            new go.TextBlock({ margin: 8 })  // some room around the text\r
              // TextBlock.text is bound to Node.data.text\r
              .bind('text')\r
          );\r
\r
      // create the model data that will be represented by Nodes and Links\r
      myDiagram.model = new go.GraphLinksModel(\r
        [\r
          { key: 1, text: 'Alpha', color: 'lightblue' },\r
          { key: 2, text: 'Beta', color: 'orange' },\r
          { key: 3, text: 'Gamma', color: 'lightgreen' },\r
          { key: 4, text: 'Delta', color: 'pink' }\r
        ],\r
        [\r
          { from: 1, to: 2 },\r
          { from: 1, to: 3 },\r
          { from: 2, to: 2 },\r
          { from: 3, to: 4 },\r
          { from: 4, to: 1 }\r
        ]);\r
\r
      function positionfunc(diagram, pos) {\r
        var size = diagram.grid.gridCellSize;\r
        return new go.Point(\r
          Math.round(pos.x / size.width) * size.width,\r
          Math.round(pos.y / size.height) * size.height);\r
      }\r
\r
      function scalefunc(diagram, scale) {\r
        var oldscale = diagram.scale;\r
        if (scale > oldscale) {\r
          return oldscale + 0.25;\r
        } else if (scale < oldscale) {\r
          return oldscale - 0.25;\r
        }\r
        return oldscale;\r
      }\r
\r
      var infscroll = document.getElementById('infscroll');\r
      infscroll.addEventListener('change', e => {\r
        myDiagram.startTransaction('change scroll mode');\r
        myDiagram.scrollMode = infscroll.checked ? go.ScrollMode.Infinite : go.ScrollMode.Document;\r
        myDiagram.commitTransaction('change scroll mode');\r
      });\r
\r
      var poscomp = document.getElementById('poscomp');\r
      poscomp.addEventListener('change', e => {\r
        myDiagram.startTransaction('change position computation');\r
        myDiagram.positionComputation = poscomp.checked ? positionfunc : null;\r
        myDiagram.commitTransaction('change position computation');\r
      });\r
\r
      var scalecomp = document.getElementById('scalecomp');\r
      scalecomp.addEventListener('change', e => {\r
        myDiagram.startTransaction('change scale computation');\r
        myDiagram.scaleComputation = scalecomp.checked ? scalefunc : null;\r
        myDiagram.commitTransaction('change scale computation');\r
      });\r
\r
    }\r
    window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates the scrolling and scaling options that have been\r
    available since <strong style="display: inline-block;">GoJS 1.5</strong>.\r
    Enable and disable the options and interact with the <a>Diagram</a> to see\r
    how they work.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`grid`];var g=y();l(`1yk8zxo`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};