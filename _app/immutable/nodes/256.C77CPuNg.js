import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Spiral Layout of Node Chains`,indexDescription:`A custom Layout that positions a chain of nodes in a spiral.`,screenshot:`spiral`,priority:2,tags:[`customlayout`,`extensions`],description:`A custom layout that arranges a chain of nodes in a spiral manner.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 700px; min-width: 200px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      isTreePathToChildren: false, // links go from child to parent\r
      layout: new SpiralLayout() // defined in SpiralLayout.js\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape({ figure: 'Circle', fill: 'white' })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 4 })\r
            .bind('text', 'key')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ curve: go.Curve.Bezier, curviness: 10 })\r
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
      { key: 'Omega', next: 'Alpha2', color: 'orange' },\r
      { key: 'Alpha2', next: 'Beta2', color: 'coral' },\r
      { key: 'Beta2', next: 'Gamma2', color: 'tomato' },\r
      { key: 'Gamma2', next: 'Delta2', color: 'goldenrod' },\r
      { key: 'Delta2', next: 'Epsilon2', color: 'orange' },\r
      { key: 'Epsilon2', next: 'Zeta2', color: 'coral' },\r
      { key: 'Zeta2', next: 'Eta2', color: 'tomato' },\r
      { key: 'Eta2', next: 'Theta2', color: 'goldenrod' },\r
      { key: 'Theta2', next: 'Iota2', color: 'orange' },\r
      { key: 'Iota2', next: 'Kappa2', color: 'coral' },\r
      { key: 'Kappa2', next: 'Lambda2', color: 'tomato' },\r
      { key: 'Lambda2', next: 'Mu2', color: 'goldenrod' },\r
      { key: 'Mu2', next: 'Nu2', color: 'orange' },\r
      { key: 'Nu2', next: 'Xi2', color: 'coral' },\r
      { key: 'Xi2', next: 'Omicron2', color: 'tomato' },\r
      { key: 'Omicron2', next: 'Pi2', color: 'goldenrod' },\r
      { key: 'Pi2', next: 'Rho2', color: 'orange' },\r
      { key: 'Rho2', next: 'Sigma2', color: 'coral' },\r
      { key: 'Sigma2', next: 'Tau2', color: 'tomato' },\r
      { key: 'Tau2', next: 'Upsilon2', color: 'goldenrod' },\r
      { key: 'Upsilon2', next: 'Phi2', color: 'orange' },\r
      { key: 'Phi2', next: 'Chi2', color: 'coral' },\r
      { key: 'Chi2', next: 'Psi2', color: 'tomato' },\r
      { key: 'Psi2', next: 'Omega2', color: 'goldenrod' },\r
      { key: 'Omega2', color: 'orange' }\r
    ];\r
    myDiagram.model = model;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/SpiralLayout.js`],descriptionHtml:`<p>\r
    This sample demonstrates a custom Layout, SpiralLayout, which assumes the\r
    graph consists of a single chain of nodes. The layout is defined in its own\r
    file, as <a href="../extensions/SpiralLayout.js">SpiralLayout.js</a>.\r
  </p>\r
  <p>\r
    See also <a href="./Serpentine">Serpentine Layout</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`customlayout`,`extensions`];var g=y();l(`1fbm8o2`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};