import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Serpentine Layout for Chains of Nodes`,titleShort:`Serpentine Layout`,indexDescription:`A custom Layout that positions a chain of nodes in rows of alternating direction.`,screenshot:`serpentine`,priority:2,tags:[`customlayout`,`extensions`],description:`Arrange a chain of nodes in rows, alternating directions, back and forth.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px; min-width: 200px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      isTreePathToChildren: false, // links go from child to parent\r
      layout: new SerpentineLayout() // defined in SerpentineLayout.js\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('RoundedRectangle', { fill: 'white' })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 4 })\r
            .bind('text', 'key')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 10 })\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    var model = new go.TreeModel();\r
    model.nodeParentKeyProperty = 'next';\r
    model.nodeDataArray = [\r
      { key: 'Alpha', next: 'Beta', color: 'coral' },\r
      { key: 'Beta', next: 'Gamma', color: 'tomato' },\r
      { key: 'Gamma', next: 'Delta', color: 'goldenrod' },\r
      { key: 'Delta', next: 'Epsilon', color: 'orange' },\r
      { key: 'Epsilon', next: 'Zeta', color: 'coral' },\r
      { key: 'Zeta', next: 'Eta', color: 'tomato' },\r
      { key: 'Eta', next: 'Theta', color: 'goldenrod' },\r
      { key: 'Theta', next: 'Iota', color: 'orange' },\r
      { key: 'Iota', next: 'Kappa', color: 'coral' },\r
      { key: 'Kappa', next: 'Lambda', color: 'tomato' },\r
      { key: 'Lambda', next: 'Mu', color: 'goldenrod' },\r
      { key: 'Mu', next: 'Nu', color: 'orange' },\r
      { key: 'Nu', next: 'Xi', color: 'coral' },\r
      { key: 'Xi', next: 'Omicron', color: 'tomato' },\r
      { key: 'Omicron', next: 'Pi', color: 'goldenrod' },\r
      { key: 'Pi', next: 'Rho', color: 'orange' },\r
      { key: 'Rho', next: 'Sigma', color: 'coral' },\r
      { key: 'Sigma', next: 'Tau', color: 'tomato' },\r
      { key: 'Tau', next: 'Upsilon', color: 'goldenrod' },\r
      { key: 'Upsilon', next: 'Phi', color: 'orange' },\r
      { key: 'Phi', next: 'Chi', color: 'coral' },\r
      { key: 'Chi', next: 'Psi', color: 'tomato' },\r
      { key: 'Psi', next: 'Omega', color: 'goldenrod' },\r
      { key: 'Omega', color: 'orange' }\r
    ];\r
    myDiagram.model = model;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/SerpentineLayout.js`],descriptionHtml:`<p>\r
    This sample demonstrates a custom <a>Layout</a>, SerpentineLayout, which\r
    assumes the graph consists of a single chain of <a>Node</a>s. The\r
    <a>Layout</a> is defined in its own file, as\r
    <a href="../extensions/SerpentineLayout.js">SerpentineLayout.js</a>.\r
  </p>\r
  <p>\r
    This <a>Layout</a> makes the <a>Node</a>s span out horizontally, left to\r
    right, until they hit the edge of the viewport. Then it moves down and\r
    switches directions.\r
  </p>\r
  <p>\r
    It also has <a>Layout.isViewportSized</a> set to true, so that resizing the\r
    <a>Diagram</a> or <a>Diagram.div</a> will automatically re-layout. Try\r
    zooming in and out to see how the <a>Layout</a> works.\r
  </p>\r
  <p>\r
    See also <a href="./Spiral">Spiral Layout</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`customlayout`,`extensions`];var g=y();l(`1cdtic8`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};