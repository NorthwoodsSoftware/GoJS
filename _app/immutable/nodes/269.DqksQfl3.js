import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Standard HTMLInfo Text Editor`,indexDescription:`Demonstrates using an HTMLInfo that acts as a re-implementation of the default text editor.`,screenshot:`texteditor`,priority:2,tags:[`html`,`extensions`],description:`A re-implementation of the default text editor, implemented by the TextEditor extension.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       Also add a border to help see the edges. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    myDiagram.toolManager.textEditingTool.defaultTextEditor = window.TextEditor;\r
\r
    // this predicate is true if the new string has at least three characters\r
    // and has a vowel in it\r
    function okName(textblock, oldstr, newstr) {\r
      return newstr.length >= 3 && /[aeiouy]/i.test(newstr);\r
    }\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the Shape will go around the TextBlock\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              margin: 8, // some room around the text\r
              editable: true,\r
              textValidation: okName\r
            })\r
            .bind('text')\r
        );\r
\r
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
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/TextEditor.js`],descriptionHtml:`<p>This sample constructs an <a>HTMLInfo</a> that acts as a re-implementation of the default text editor.</p>\r
  <p>\r
    The implementation is contained in the file <a href="../extensions/TextEditor.js" target="_blank">TextEditor.js</a> and exposes <code>window.TextEditor</code>, which is\r
    used in this file as the value of <code>myDiagram.toolManager.textEditingTool.defaultTextEditor</code>.\r
  </p>\r
  <p>\r
    This also adds a text validation predicate, <code>okName</code>, as the <a>TextBlock.textValidation</a> property. That predicate makes sure that the new\r
    string has at least three characters and contains a vowel.\r
  </p>\r
  <p>You can see additional custom text editors in the <a href="../samples/customTextEditingTool">Custom TextEditingTool sample</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`html`,`extensions`];var g=y();l(`18sh5f3`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};