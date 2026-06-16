import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Minimal SVG Download Using MakeSvg`,titleShort:`Download SVG`,indexDescription:`Minimal, showing SVG creation with Diagram.makeSvg, and download.`,screenshot:`minimal`,priority:2,tags:[`svg`,`export`],description:`Minimal, showing SVG rendering and download with Diagram.makeSvg.`},htmlContent:`<div>\r
    <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
    <button id="svgButton">Make SVG and Download</button>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          // two elements: the Shape will go around the TextBlock\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0, fill: 'white' }) // no border; default fill is white\r
            .bind('fill', 'color'), // Shape.fill is bound to Node.data.color\r
          new go.TextBlock({ margin: 8, font: 'bold 14px sans-serif', stroke: '#333' }) // some room around the text, bold font\r
            .bind('text') // TextBlock.text is bound to Node.data.text\r
        );\r
\r
    // but use the default Link template, by not setting Diagram.linkTemplate\r
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
      ]\r
    );\r
\r
    document.getElementById('svgButton').addEventListener('click', () => {\r
      myDiagram.commandHandler.downloadSvg({ name: "mySVGfile.svg" });\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample shows how to use <a>Diagram.makeSvg</a> function to render all or part of a diagram and to initiate a file download.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`svg`,`export`];var g=y();l(`19xuj4`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};