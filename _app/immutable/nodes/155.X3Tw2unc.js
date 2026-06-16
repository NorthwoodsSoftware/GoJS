import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Guided Dragging Shows Guidelines During Dragging for Equal Spacing between Nodes or for Aligning Nodes to other Nodes`,titleShort:`Guided Dragging`,indexDescription:`A custom DraggingTool that makes guidelines visible as a Part is dragged around a Diagram and is nearly aligned with another Part.`,screenshot:`guideddragging`,priority:2,tags:[`tools`,`extensions`],description:`A demonstration of the GuidedDraggingTool extension.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       Also add a border to help see the edges. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      draggingTool: new GuidedDraggingTool(), // defined in GuidedDraggingTool.js\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        // have various width and height nodes based on existing data properties\r
        .bind('width', 'text', t => Math.max(50, t.length*12))\r
        .bind('height', 'color', c => Math.max(30, c.length*8))\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            .bind('fill', 'color'),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { text: 'Alpha', color: 'lightblue' },\r
        { text: 'Beta', color: 'orange' },\r
        { text: 'Gamma', color: 'lightgreen' },\r
        { text: 'Delta', color: 'pink' },\r
        { text: 'Epsilon', color: 'yellow' },\r
        { text: 'Zeta', color: 'coral' },\r
        { text: 'Eta', color: 'tomato' },\r
        { text: 'Theta', color: 'goldenrod' },\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/GuidedDraggingTool.js`],descriptionHtml:`<p>\r
    This custom <a>DraggingTool</a> class makes guidelines visible as a Part is dragged around a Diagram and is nearly aligned with another Part. If a\r
    locationObjectName is set, then this aligns <a>Part.locationObject</a>s instead. The tool is defined in its own file, as\r
    <a href="../extensions/GuidedDraggingTool.js">GuidedDraggingTool.js</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`18x01ri`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};