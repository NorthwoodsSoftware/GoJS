import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`HTML Zoom Slider for Zooming`,indexDescription:`Demonstrates use of the ZoomSlider class to zoom in/out using a control.`,screenshot:`zoomslider`,priority:2,tags:[`extensions`,`html`],description:`HTML controls for panning and zooming that are shown in front of a Diagram.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the Shape will go around the TextBlock\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0, fill: 'white' })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
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
    zoomSlider = new ZoomSlider(myDiagram);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* Styling for Zoom Slider extension */\r
  .zoomSlider {\r
    position: absolute;\r
    padding: 0;\r
    opacity: 0.75;\r
    z-index: 99;\r
    width: 125px;\r
    height: 25px;\r
    top: 0px;\r
    left: 0px;\r
  }\r
\r
  .zoomButton {\r
    display: inline-block;\r
    vertical-align: top;\r
    text-align: center;\r
    padding: 0;\r
    margin: 0;\r
    transition: opacity 0.2s;\r
  }\r
\r
  .zoomRangeContainer {\r
    display: inline-block;\r
    vertical-align: top;\r
    padding: 0;\r
  }\r
\r
  .zoomRangeInput {\r
    margin: 0;\r
    padding: 0;\r
    outline: none;\r
    transition: opacity 0.2s;\r
    background: transparent;\r
    appearance: none;\r
  }\r
\r
  /* Set up additional styling to ensure consistenty across browsers */\r
  .zoomRangeInput::-webkit-slider-runnable-track {\r
    box-sizing: border-box;\r
    border: none;\r
    width: 100%;\r
    height: 3px;\r
    background: #ccc;\r
  }\r
\r
  .zoomRangeInput::-moz-range-track {\r
    box-sizing: border-box;\r
    border: none;\r
    width: 100%;\r
    height: 3px;\r
    background: #ccc;\r
  }\r
\r
  .zoomRangeInput::-ms-track {\r
    box-sizing: border-box;\r
    border: none;\r
    width: 100%;\r
    height: 3px;\r
    background: #ccc;\r
    color: transparent;\r
  }\r
\r
  .zoomRangeInput::-webkit-slider-thumb {\r
    -webkit-appearance: none;\r
    margin-top: -3.33px;\r
    box-sizing: border-box;\r
    border: none;\r
    width: 10px;\r
    height: 10px;\r
    border-radius: 50%;\r
    background: #444;\r
  }\r
\r
  .zoomRangeInput::-moz-range-thumb {\r
    box-sizing: border-box;\r
    border: none;\r
    width: 10px;\r
    height: 10px;\r
    border-radius: 50%;\r
    background: #444;\r
  }\r
\r
  .zoomRangeInput::-ms-thumb {\r
    margin-top: 0;\r
    box-sizing: border-box;\r
    border: none;\r
    width: 10px;\r
    height: 10px;\r
    border-radius: 50%;\r
    background: #444;\r
  }\r
\r
  .zoomRangeInput::-ms-tooltip,\r
  .zoomRangeInput::-ms-fill-lower,\r
  .zoomRangeInput::-ms-fill-upper {\r
    display: none;\r
  }`,externalStyles:[],externalScripts:[`../extensions/ZoomSlider.js`],descriptionHtml:`<p>\r
    This sample demonstrates the use of the ZoomSlider extension. When using the ZoomSlider extension, the diagram div must always be a direct child of a div\r
    using <code>position: relative</code> or <code>position: absolute</code>, so that the ZoomSlider HTML DOM can be positioned correctly relative to the\r
    Diagram div.\r
  </p>\r
  <p>This extension HTML is defined in its own file, as <a href="../extensions/ZoomSlider.js">ZoomSlider.js</a>, with the CSS at the top of this HTML page.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`extensions`,`html`];var g=y();l(`8bn8o7`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};