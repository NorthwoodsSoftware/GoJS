import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Layout of Parallel Flows from Split Node to Merge Node`,titleShort:`Parallel Layout`,indexDescription:`A custom Layout that assumes there is a single split and a single merge node with parallel lines of nodes connecting them.`,screenshot:`parallel`,priority:2,tags:[`treelayout`,`customlayout`,`groups`,`buttons`,`extensions`],description:`A custom Layout that arranges a collection of nodes and links where there is a single split node and a single merge node, and all nodes are in paths of links that come from the split node and go to the merge node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; background: white; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must be the ID or reference to div\r
      allowCopy: false, // would need to merge copied nodes and links to\r
      allowDelete: false, //   use the single "Split" and "Merge" nodes\r
      layout: new ParallelLayout({\r
          layerSpacing: 20,\r
          nodeSpacing: 10\r
        })\r
    });\r
\r
    // define the Node templates\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape('Rectangle', {\r
            fill: 'wheat',\r
            stroke: null,\r
            strokeWidth: 0\r
          }),\r
          new go.TextBlock({ margin: 3 })\r
            .bind('text')\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Split',\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape('Diamond', {\r
            fill: 'deepskyblue',\r
            stroke: null,\r
            strokeWidth: 0,\r
            desiredSize: new go.Size(28, 28)\r
          }),\r
          new go.TextBlock()\r
            .bind('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Merge',\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape('Circle', {\r
            fill: 'deepskyblue',\r
            stroke: null,\r
            strokeWidth: 0,\r
            desiredSize: new go.Size(28, 28)\r
          }),\r
          new go.TextBlock()\r
            .bind('text')\r
        )\r
    );\r
\r
    // define the Link template to be minimal\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
        .add(\r
          new go.Shape({ stroke: 'gray', strokeWidth: 1.5 })\r
        );\r
\r
    // define the Group template to be fairly simple\r
    myDiagram.groupTemplate =\r
      new go.Group('Auto', {\r
          layout: new ParallelLayout({\r
            layerSpacing: 20,\r
            nodeSpacing: 10\r
          })\r
        })\r
        .add(\r
          new go.Shape({\r
            fill: 'transparent',\r
            stroke: 'darkgoldenrod'\r
          }),\r
          new go.Placeholder({ padding: 10 }),\r
          go.GraphObject.build('SubGraphExpanderButton', {\r
            alignment: go.Spot.TopLeft,\r
            'ButtonBorder.figure': 'Rectangle'\r
          })\r
        );\r
\r
    var model = new go.GraphLinksModel();\r
    model.nodeDataArray = [\r
      { key: -1, isGroup: true },\r
      { key: -2, isGroup: true },\r
      { key: -3, isGroup: true },\r
\r
      { key: 1, text: 'S', category: 'Split', group: -1 },\r
      { key: 2, text: 'C', group: -1 },\r
      { key: 3, text: 'Longer Node', group: -1 },\r
      { key: 4, text: 'A', group: -1 },\r
      { key: 5, text: 'B\\nB', group: -1 },\r
      { key: 6, text: 'Another', group: -1 },\r
      { key: 9, text: 'J', category: 'Merge', group: -1 },\r
      { key: 11, text: 'T', category: 'Split', group: -2 },\r
      { key: 12, text: 'C', group: -2 },\r
      { key: 13, text: 'Here', group: -2 },\r
      { key: 14, text: 'D', group: -2 },\r
      { key: 15, text: 'Everywhere', group: -2 },\r
      { key: 16, text: 'EEEEE', group: -2 },\r
      { key: 19, text: 'K', category: 'Merge', group: -2 },\r
      { key: 21, text: 'U', category: 'Split', group: -3 },\r
      { key: 22, text: 'F', group: -3 },\r
      { key: 23, text: 'Medium\\nTall\\nNode', group: -3 },\r
      { key: 24, text: 'G', group: -3 },\r
      { key: 25, text: 'AS', group: -3 },\r
      { key: 26, text: 'H\\nHH\\nHHH', group: -3 },\r
      { key: 27, text: 'I', group: -3 },\r
      { key: 29, text: 'L', category: 'Merge', group: -3 },\r
      { key: 101, text: '0', category: 'Split' },\r
      { key: 107, text: 'ABCDEFG' },\r
      { key: 109, text: '*', category: 'Merge' }\r
    ];\r
    model.linkDataArray = [\r
      { from: 1, to: 2 },\r
      { from: 2, to: 3 },\r
      { from: 3, to: 4 },\r
      { from: 4, to: 9 },\r
      { from: 1, to: 5 },\r
      { from: 5, to: 6 },\r
      { from: 6, to: 9 },\r
      { from: 9, to: 11 },\r
      { from: 9, to: 21 },\r
      { from: 11, to: 12 },\r
      { from: 12, to: 13 },\r
      { from: 13, to: 14 },\r
      { from: 14, to: 19 },\r
      { from: 11, to: 15 },\r
      { from: 15, to: 16 },\r
      { from: 16, to: 19 },\r
      { from: 21, to: 22 },\r
      { from: 22, to: 24 },\r
      { from: 24, to: 26 },\r
      { from: 23, to: 29 },\r
      { from: 21, to: 25 },\r
      { from: 25, to: 23 },\r
      { from: 21, to: 27 },\r
      { from: 26, to: 29 },\r
      { from: 27, to: 29 },\r
      { from: 101, to: 1 },\r
      { from: 19, to: 109 },\r
      { from: 29, to: 107 },\r
      { from: 107, to: 109 }\r
    ];\r
    myDiagram.model = model;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/ParallelLayout.js`],descriptionHtml:`<p>\r
    This sample demonstrates a custom <a>TreeLayout</a>, ParallelLayout, which assumes that there is a single "Split" node that is the root of a tree, other\r
    than links that connect with a single "Merge" node. The layout is defined in its own file, as <a href="../extensions/ParallelLayout.js">ParallelLayout.js</a>.\r
  </p>\r
  <p>Both the <a>Diagram.layout</a> and the <a>Group.layout</a> are instances of ParallelLayout, allowing for nested layouts that appear in parallel.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`customlayout`,`groups`,`buttons`,`extensions`];var g=y();l(`7le9i8`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};