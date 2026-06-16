import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Balloon Links for Creating Speech Bubbles or Comments for Nodes`,titleShort:`Ballon Links`,indexDescription:`Demonstrates custom Links that create a 'Balloon' around the fromNode.`,screenshot:`balloonlink`,priority:2,tags:[`links`,`geometries`,`extensions`],description:`A demonstration of the BalloonLink extension for implementing word balloons or speech bubbles as comments in diagrams about particular objects.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px;"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { margin: 2 }) // the Shape will go around the TextBlock\r
        .add(\r
          new go.Shape('Rectangle', { strokeWidth: 0 })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new BalloonLink()\r
        .add(\r
          new go.Shape({ stroke: 'limegreen', strokeWidth: 3, fill: 'limegreen' })\r
        );\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' }\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/BalloonLink.js`],descriptionHtml:`<p>\r
    A <b>BalloonLink</b> is a custom <a>Link</a> that draws a "balloon" shape around the Link.fromNode. It will create a triangular shape with the base at the\r
    fromNode and the other point at the toNode. It is defined in its own file, as <a href="../extensions/BalloonLink.js">BalloonLink.js</a>.\r
  </p>\r
  <p>Usage can also be seen in the <a href="../samples/comments">Comments</a> sample.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`geometries`,`extensions`];var g=y();l(`1drvx3s`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};