import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Various Gesture Behaviors Demonstration`,titleShort:`Various Gestures Demo`,indexDescription:`Shows different options for ToolManager's gestureBehavior.`,screenshot:`minimal`,priority:2,description:`Example of ToolManager.gestureBehavior property.`},htmlContent:`<p>\r
    Set the value for the Diagram below:\r
  </p>\r
\r
  <p><label><input type="radio" id="GestureZoom" onclick="changegestureBehavior(this.id)" name="group1"><code>go.GestureMode.Zoom;</code></label>\r
  <p><label><input type="radio" id="GestureCancel" onclick="changegestureBehavior(this.id)" name="group1" checked="checked"><code>go.GestureMode.Cancel;</code></label>\r
  <p><label><input type="radio" id="GestureNone" onclick="changegestureBehavior(this.id)" name="group1"><code>go.GestureMode.None;</code></label>\r
\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height:400px"></div>`,jsCode:`function init() {\r
\r
    // define a simple Node template\r
    const myNodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 })\r
            .bind('text')\r
        );\r
\r
    const myModel = new go.GraphLinksModel(\r
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
      ]);\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowHorizontalScroll: false, allowVerticalScroll: false,\r
      'panningTool.isEnabled': false,\r
      'toolManager.gestureBehavior': go.GestureMode.Cancel,\r
      model: myModel,\r
      nodeTemplate: myNodeTemplate\r
    });\r
\r
  }\r
\r
  function changegestureBehavior(id) {\r
    switch (id) {\r
      case 'GestureZoom':\r
        myDiagram.toolManager.gestureBehavior = go.GestureMode.Zoom;\r
        break;\r
      case 'GestureCancel':\r
        myDiagram.toolManager.gestureBehavior = go.GestureMode.Cancel;\r
        break;\r
      case 'GestureNone':\r
        myDiagram.toolManager.gestureBehavior = go.GestureMode.None;\r
        break;\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates the different values of <a>ToolManager.gestureBehavior</a>.\r
  </p>\r
  <p>\r
    <ul>\r
      <li><a>GestureMode.Zoom</a> is the default value: Pinch gestures will zoom the Diagram.\r
      <li><a>GestureMode.None</a>: Pinch gestures zoom the browser page instead of the Diagram.\r
      <li><a>GestureMode.Cancel</a>: Pinch gestures will do nothing.\r
    </ul>\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[];var g=y();l(`1cmwmx6`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};