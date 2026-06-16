import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Minimal Diagram Showing Built-in Operations`,titleShort:`Minimal`,indexDescription:`Shows default Diagram interactivity and basic data binding. Select, move, copy, delete, undo, redo with keyboard or touch.`,screenshot:`minimal`,priority:2,description:`An almost minimal diagram using a very simple node template and the default link template.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       This also adds a border to help see the edges of the viewport. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px; margin-inline: auto;"></div>`,jsCode:`const myDiagram =\r
    new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
  // define a simple Node template\r
\r
  // if you don't set this template, the default node template will just make the node appear as the text\r
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
  );`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This isn't a truly <i>minimal</i> demonstration of <b>GoJS</b>, because we do specify a custom Node template and turn on undo/redo support, but it's pretty\r
    simple. The whole source for the sample is shown below if you click on the link.\r
  </p>\r
  <p>\r
    This sample sets the <a>Diagram.nodeTemplate</a>, with a <a>Node</a> template that data binds both the text string and the shape's fill color. For an\r
    overview of building your own templates and model data, see the <a href="../learn">Getting Started tutorial.</a>\r
  </p>\r
  <p>\r
    Using the mouse and common keyboard commands, you can pan, select, move, copy, delete, undo, and redo. On touch devices, use your finger to act as the\r
    mouse, and press and hold your finger stationary to bring up a context menu. The default context menu supports most of the standard commands that are\r
    enabled at that time for the selected object.\r
  </p>\r
  <p>For a more elaborate sample, supporting grouping and tooltips and custom context menus, see the <a href="basic">Basic</a> sample.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[];var g=y();l(`v7pqew`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};