import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`LassoSelectingTool lets the user draw a lasso to select nodes`,titleShort:`Lasso Selecting`,indexDescription:`A custom Tool that replaces the standard DragSelectingTool to allow the user to draw a lasso around the Parts they want to select.`,screenshot:`lassoselecting`,priority:2,tags:[`tools`,`extensions`],description:`A demonstration of the LassoSelectingTool extension.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:600px"></div>`,jsCode:`function init() {\r
      myDiagram =\r
        new go.Diagram("myDiagramDiv", {\r
            layout: new go.ForceDirectedLayout(),\r
            dragSelectingTool: new LassoSelectingTool(),\r
            "undoManager.isEnabled": true\r
          });\r
\r
      myDiagram.nodeTemplate =\r
        new go.Node("Auto")\r
          .add(\r
            new go.Shape({ fill: "white", portId: "" })\r
              .bind("fill", "color"),\r
            new go.TextBlock({ margin: 8 })\r
              .bind("text")\r
          );\r
\r
      myDiagram.model = new go.GraphLinksModel(\r
        [\r
          { key: 1, text: "Alpha", color: "lightblue" },\r
          { key: 2, text: "Beta", color: "orange" },\r
          { key: 3, text: "Gamma", color: "lightgreen" },\r
          { key: 4, text: "Delta", color: "pink" },\r
          { key: 5, text: "Epsilon", color: "coral" },\r
          { key: 6, text: "Zeta", color: "tomato" },\r
          { key: 7, text: "Eta", color: "goldenrod" },\r
          { key: 8, text: "Theta", color: "turquoise" }\r
        ],\r
        [\r
          { from: 1, to: 2 },\r
          { from: 1, to: 3 },\r
          { from: 2, to: 7 },\r
          { from: 3, to: 4 },\r
          { from: 3, to: 5 },\r
          { from: 4, to: 1 },\r
          { from: 5, to: 6 },\r
          { from: 5, to: 7 },\r
          { from: 5, to: 8 },\r
          { from: 8, to: 6 }\r
        ]);\r
    }\r
\r
    window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/LassoSelectingTool.js`],descriptionHtml:`<p>\r
    The <a>DragSelectingTool</a> has been replaced by the <a>LassoSelectingTool</a>.\r
    Mouse-down, wait 175 milliseconds, and drag the mouse around all nodes that you want to select.\r
    To be selected, a Node's <a>Node.selectionObject</a> must be completely within the temporarily-drawn magenta polygon.\r
    You can use the <code>Shift</code> and <code>Ctrl</code> modifiers to affect how the selection is affected.\r
  </p>\r
  <p>\r
    The tool is defined in its own file, as\r
    <a href="../extensions/LassoSelectingTool.js">LassoSelectingTool.js</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`y6qxxr`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};