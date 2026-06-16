import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Minimal Image Download Using MakeImageData and Blobs`,titleShort:`Download Image Blob`,indexDescription:`Minimal, showing image Blob creation with Diagram.makeImageData, and download.`,screenshot:`minimal`,priority:2,tags:[`export`],description:`Minimal, showing image Blob creation and download with Diagram.makeImageData.`},htmlContent:`<div>\r
    <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px;"></div>\r
    <button id="blobButton">Make Blob and Download</button>\r
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
    document.getElementById('blobButton').addEventListener('click', makeBlob);\r
  }\r
\r
  // When the blob is complete, make an anchor tag for it and use the tag to initiate a download\r
  // Works in Chrome, Firefox, Safari, Edge, IE11\r
  function myCallback(blob) {\r
    var url = window.URL.createObjectURL(blob);\r
    var filename = 'myBlobFile.png';\r
\r
    var a = document.createElement('a');\r
    a.style = 'display: none';\r
    a.href = url;\r
    a.download = filename;\r
\r
    // IE 11\r
    if (window.navigator.msSaveBlob !== undefined) {\r
      window.navigator.msSaveBlob(blob, filename);\r
      return;\r
    }\r
\r
    document.body.appendChild(a);\r
    requestAnimationFrame(() => {\r
      a.click();\r
      window.URL.revokeObjectURL(url);\r
      document.body.removeChild(a);\r
    });\r
  }\r
\r
  function makeBlob() {\r
    var blob = myDiagram.makeImageData({ background: 'white', returnType: 'blob', callback: myCallback });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows how to use <a>Diagram.makeImageData</a> with the <code>returnType: "blob"</code> option and the necessary <code>callback</code> option. It\r
    also shows how to download a file that the page has generated.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`export`];var g=y();l(`1k9o24n`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};