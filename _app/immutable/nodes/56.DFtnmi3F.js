import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Resizing Diagrams`},htmlContent:`<h1>Resizing Diagrams</h1>\r
<p>\r
  Sometimes it may be necessary to resize the div that contains a GoJS Diagram. Recent browsers let GoJS detect changes to the div's size on their own,\r
  but some older browsers do not, in which case <a href="../api/symbols/Diagram.html#requestupdate" target="api">Diagram.requestUpdate</a> is neccessary.\r
</p>\r
\r
<h2 id="UsingRequestUpdateToResizeDiv"><a class="not-prose heading-anchor" href="#UsingRequestUpdateToResizeDiv">Using <a href="../api/symbols/Diagram.html#requestupdate" target="api">Diagram.requestUpdate</a> to resize a div</a></h2>\r
<p>\r
  The following example has a button that changes the width Diagram's div without calling <a href="../api/symbols/Diagram.html#requestupdate" target="api">Diagram.requestUpdate</a>. When it is clicked, the div is visibly resized and the document is moved to be visible.\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  In this case there is a delay when resizing the div. This is because these changes are debounced, or effectively delayed, by defaualt. When you want\r
  the Diagram to resize immediately after its div does, add a call to <a href="../api/symbols/Diagram.html#requestupdate" target="api">Diagram.requestUpdate</a> after you have resized the div.\r
</p>\r
<p>\r
  Below is nearly identical code, except that a call to <a href="../api/symbols/Diagram.html#requestupdate" target="api">Diagram.requestUpdate</a> has been added.\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->`,codeBlocks:[{id:`first`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0} )\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text", "key")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "Alpha", color: "lightblue" },\r
  { key: "Beta", color: "orange" },\r
  { key: "Gamma", color: "lightgreen" },\r
  { key: "Delta", color: "pink" }\r
], [\r
  { from: "Alpha", to: "Beta" },\r
  { from: "Alpha", to: "Gamma" },\r
  { from: "Gamma", to: "Delta" },\r
  { from: "Delta", to: "Alpha" }\r
]);\r
\r
// Resize the diagram with this button\r
const button1 = document.getElementById('button1');\r
button1.addEventListener('click', () => {\r
  const div = diagram.div;\r
  if (div.style.width === '200px') div.style.width = '100%' \r
  else div.style.width = '200px';\r
});`,isExecutable:!0,animation:!1,html:`<p><button id="button1">Resize div</button></p>`,language:`js`,initiallyVisible:!0},{id:`second`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0} )\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text", "key")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "Alpha", color: "lightblue" },\r
  { key: "Beta", color: "orange" },\r
  { key: "Gamma", color: "lightgreen" },\r
  { key: "Delta", color: "pink" }\r
], [\r
  { from: "Alpha", to: "Beta" },\r
  { from: "Alpha", to: "Gamma" },\r
  { from: "Gamma", to: "Delta" },\r
  { from: "Delta", to: "Alpha" }\r
]);\r
\r
// Resize the diagram with this button\r
const button2 = document.getElementById('button2');\r
button2.addEventListener('click', () => {\r
  const div = diagram.div;\r
  div.style.width = '200px';\r
  diagram.requestUpdate(); // Needed!\r
});`,isExecutable:!0,animation:!1,html:`<button id="button2">Resize div</button>`,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`ox4clp`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};