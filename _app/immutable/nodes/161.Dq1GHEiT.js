import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Hyperlinks: Underlined Text When Clicked Opens a URL`,titleShort:`Hyperlink Text`,indexDescription:`Demonstrates usage of the HyperlinkText extension.`,screenshot:`hyperlink`,priority:2,tags:[`extensions`],description:`Implement a 'hyperlink' that allows the user to open a page by clicking.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv');\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('Ellipse', { fill: 'lightskyblue' }),\r
          go.GraphObject.build('HyperlinkText', { margin: 10 },\r
            node => 'https://gojs.net/' + node.data.version,\r
            node => 'Visit GoJS' +\r
                    ("0123456789".includes(node.data.version[0]) ? ", v" : " ") +\r
                    node.data.version\r
          )\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, version: '3.0.22' },\r
        { key: 2, version: 'latest' }\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/HyperlinkText.js`],descriptionHtml:`<p>This uses the "HyperlinkText" builder defined in <a href="../extensions/HyperlinkText.js">HyperlinkText.js</a>.</p>\r
  <p>\r
    Click on the text to open a window to a computed URL. A mouse-over on the text will underline the text. Hover on the text and you will see a tooltip showing\r
    the destination URL.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`extensions`];var g=y();l(`1m8vs81`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};