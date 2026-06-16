import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Custom Link Routing for Parallel Duplicate Links`,titleShort:`Parallel Routing`,indexDescription:`Demonstrates custom Links that route parallel to other Links between the same two ports.`,screenshot:`parallelroute`,priority:2,tags:[`links`,`geometries`,`extensions`],description:`Custom non-Orthogonal non-Bezier Links that have parallel routings for multiple links connecting the same pair of ports.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true,\r
              fromLinkableDuplicates: true,\r
              toLinkableDuplicates: true,\r
              cursor: 'pointer'\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new ParallelRouteLink({\r
          corner: 10,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true //, resegmentable: true\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
            .bindObject('stroke', 'fromNode', node => node.port.fill),\r
          new go.Shape({ toArrow: 'OpenTriangle', strokeWidth: 1.5 })\r
            .bindObject('stroke', 'fromNode', node => node.port.fill)\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue', loc: '0 0' },\r
        { key: 2, text: 'Beta', color: 'orange', loc: '130 70' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen', loc: '0 130' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 2, to: 1 },\r
        { from: 1, to: 3 },\r
        { from: 1, to: 3 },\r
        { from: 3, to: 1 },\r
        { from: 1, to: 3 },\r
        { from: 1, to: 3 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/ParallelRouteLink.js`],descriptionHtml:`<p>\r
    A <b>ParallelRouteLink</b> is a custom <a>Link</a> that overrides <a>Link.computePoints</a> in order to produce a middle segment that is parallel to the\r
    routes of other <b>ParallelRouteLink</b>s connecting the same two ports.\r
  </p>\r
  <p>This Link extension is defined in its own file, as <a href="../extensions/ParallelRouteLink.js">ParallelRouteLink.js</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`geometries`,`extensions`];var g=y();l(`1068dd3`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};