import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Rendering SVG to Data URL with Inline Images`,indexDescription:`In makeSvg, replace image sources with Base64`,screenshot:`svgdataurl`,priority:2,tags:[`svg`,`export`],description:`Export SVG with Base64 URIs instead of URLs for picture hrefs.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <button onclick="makeSvg()">Make SVG</button>\r
  <div id="SVGResult"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the Shape will go around the TextBlock\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.Picture({ margin: 8, width: 55, height: 55 })\r
            .bind('source')\r
        );\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', source: 'images/55x55.png', color: 'lightblue' },\r
        { key: 2, text: 'Beta', source: 'images/55x55.png', color: 'orange' },\r
        { key: 3, text: 'Gamma', source: 'images/55x55.png', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', source: 'images/55x55.png', color: 'pink' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
  } // end init\r
\r
  function toDataURL(url, callback) {\r
    var xhr = new XMLHttpRequest();\r
    xhr.onload = () => {\r
      var reader = new FileReader();\r
      reader.onloadend = () => {\r
        callback(reader.result);\r
      };\r
      reader.readAsDataURL(xhr.response);\r
    };\r
    xhr.open('GET', url);\r
    xhr.responseType = 'blob';\r
    xhr.send();\r
  }\r
\r
  // Make SVG, but modify the SVG <image> Element's href to refer to a Base64 URI instead of the go.Picture source URL.\r
  function makeSvg() {\r
    var svg = myDiagram.makeSvg({\r
      elementFinished: (graphobject, svgelement) => {\r
        if (!(graphobject instanceof go.Picture)) return;\r
        toDataURL(svgelement.href.baseVal, dataUrl => {\r
          svgelement.setAttribute('href', dataUrl);\r
        });\r
      }\r
    });\r
    document.getElementById('SVGResult').appendChild(svg);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows how to setup an <code>elementFinished</code> option for <a>Diagram.makeSvg</a> that will replace the SVG <code>&lt;image&gt;</code> tag's\r
    <code>href</code> with a Base64 URI instead of pointing to the <a>Picture.source</a>. This can be useful to reduce external dependencies within your\r
    exported SVG.\r
  </p>\r
  <p>\r
    This method will only work if you assets are at the same origin, or otherwise not blocked by a\r
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">cross-origin request policy</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`svg`,`export`];var g=y();l(`lmclqw`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};