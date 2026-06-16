import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Double Tree of Nodes and Links Laid out by TreeLayout in Two Opposite Directions from Root Node`,titleShort:`Double Tree`,indexDescription:`Displays a single diagram of two trees sharing a single root node growing in opposite directions, using the DoubleTreeLayout extension.`,screenshot:`doubletree`,priority:2,tags:[`collections`,`treelayout`],description:`Layout of two trees in opposite directions, assuming a single root, using TreeLayout.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
        layout: new DoubleTreeLayout({\r
            //vertical: true,  // default directions are horizontal\r
            // choose whether this subtree is growing towards the right or towards the left:\r
            directionFunction: n => n.data && n.data.dir !== 'left'\r
            // controlling the parameters of each TreeLayout:\r
            //bottomRightOptions: { nodeSpacing: 0, layerSpacing: 20 },\r
            //topLeftOptions: { alignment: go.TreeAlignment.Start },\r
          })\r
      });\r
\r
    // define all of the gradient brushes\r
    const graygrad = new go.Brush('Linear', { 0: '#F5F5F5', 1: '#F1F1F1' });\r
    const bluegrad = new go.Brush('Linear', { 0: '#CDDAF0', 1: '#91ADDD' });\r
    const yellowgrad = new go.Brush('Linear', { 0: '#FEC901', 1: '#FEA200' });\r
    const lavgrad = new go.Brush('Linear', { 0: '#EF9EFA', 1: '#A570AD' });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { isShadowed: true })\r
        .add(\r
          // define the node's outer shape\r
          new go.Shape('RoundedRectangle', {\r
              fill: graygrad, // default fill is gray\r
              stroke: '#D8D8D8'\r
            })\r
            .bind('fill', 'color'),\r
          // define the node's text\r
          new go.TextBlock({\r
              margin: 5,\r
              font: 'bold 11px Helvetica, bold Arial, sans-serif'\r
            })\r
            .bind('text', 'key')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ selectable: false, corner: 10 }) // the whole link panel\r
        .add(\r
          new go.Shape() // the link shape\r
        );\r
\r
    // create the model for the double tree; could be eiher TreeModel or GraphLinksModel\r
    myDiagram.model = new go.TreeModel([\r
      { key: 'Root', color: lavgrad },\r
      { key: 'Left1', parent: 'Root', dir: 'left', color: bluegrad },\r
      { key: 'leaf1', parent: 'Left1' },\r
      { key: 'leaf2', parent: 'Left1' },\r
      { key: 'Left2', parent: 'Left1', color: bluegrad },\r
      { key: 'leaf3', parent: 'Left2' },\r
      { key: 'leaf4', parent: 'Left2' },\r
      { key: 'leaf5', parent: 'Left1' },\r
      { key: 'Right1', parent: 'Root', dir: 'right', color: yellowgrad },\r
      { key: 'Right2', parent: 'Right1', color: yellowgrad },\r
      { key: 'leaf11', parent: 'Right2' },\r
      { key: 'leaf12', parent: 'Right2' },\r
      { key: 'leaf13', parent: 'Right2' },\r
      { key: 'leaf14', parent: 'Right1' },\r
      { key: 'leaf15', parent: 'Right1' },\r
      { key: 'Right3', parent: 'Root', dir: 'right', color: yellowgrad },\r
      { key: 'leaf16', parent: 'Right3' },\r
      { key: 'leaf17', parent: 'Right3' }\r
    ]);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DoubleTreeLayout.js`],descriptionHtml:`<p>\r
    This sample displays a bow-tie diagram of two trees sharing a single root node growing in opposite directions. The immediate child data of the ROOT node\r
    have a "dir" property that describes the direction that subtree should grow.\r
  </p>\r
  <p>\r
    The <a>Diagram.layout</a> is an instance of the <a>DoubleTreeLayout</a> extension layout, defined in\r
    <a href="../extensions/DoubleTreeLayout.js">extensions/DoubleTreeLayout.js</a>. The layout requires a <a>DoubleTreeLayout.directionFunction</a> predicate to\r
    decide for a child node of the root node which way the subtree should grow.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`treelayout`];var g=y();l(`1jb7ev6`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};