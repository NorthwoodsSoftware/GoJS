import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Subtrees`,figures:!0},htmlContent:`<h1>Subtrees</h1>\r
<p>\r
  Tree diagrams can get very large.\r
  One way to simplify the diagram is to hide branches of the tree.\r
  "Collapsing" a tree node means making all of its children and the links to them not visible,\r
  and recursively collapsing all of the children that have children.\r
</p>\r
<p>\r
  To collapse a node in a tree, set <a href="../api/symbols/Node.html#istreeexpanded" target="api">Node.isTreeExpanded</a> to false; to make sure it is expanded, set that property to true.\r
  You should not set this property to true on a <a href="../api/symbols/Node.html" target="api">Node</a> for which <a href="../api/symbols/Part.html#isvisible" target="api">Part.isVisible</a> returns false.\r
</p>\r
<p>\r
  It is commonplace to provide a button on a node to allow users to collapse and expand subtrees as they wish.\r
  GoJS makes this easy to implement by providing a predefined kind of <a href="../api/symbols/Panel.html" target="api">Panel</a>, named "TreeExpanderButton",\r
  that acts as a button to collapse and expand the subtree of a node.\r
  This button changes the visibility of all parts of the subtree except for the node itself.\r
</p>\r
<p>\r
  Clicking on an expander button also invalidates the layout that is responsible for the node.\r
  Collapsing a subtree often results in a large empty area, and expanding a subtree often results in overlapping nodes,\r
  so a new layout is performed again to make the tree look better.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Notice that if you first collapse the "Beta" node and then collapse the "Alpha" root node,\r
  if you then expand the "Alpha" node, the "Beta" node remains collapsed, whereas the "Epsilon" node remains expanded.\r
  This is because the collapsing operation remembers the state of nodes within the subtree, as the property <a href="../api/symbols/Node.html#wastreeexpanded" target="api">Node.wasTreeExpanded</a>.\r
  The expanding operation respects the value of that property when recursing through the subtree.\r
</p>\r
\r
<p>\r
  You may also want to start off the tree mostly or completely collapsed.\r
  First, set <a href="../api/symbols/Node.html#istreeexpanded" target="api">Node.isTreeExpanded</a> to false in the template.\r
  That will cause only the roots of the tree to be shown.\r
  Second, if you want to show some levels of the tree, call <a href="../api/symbols/Node.html#expandtree" target="api">Node.expandTree</a> on each root node.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="styling"><a class="not-prose heading-anchor" href="#styling">Styling</a></h2>\r
<p>You can add styling to the TreeExpanderButton the same way you add it to other custom <a href="../api/symbols/Panel.html" target="api">Panel</a>s. See the <a href="buttons">Buttons learn page</a> to learn more.</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
`,codeBlocks:[{id:`tree`,code:`diagram.div.style.backgroundColor = "white";\r
\r
const accentStrip = new go.Shape("Rectangle", {\r
  stretch: go.Stretch.Horizontal,\r
  height: 3,\r
  fill: "darkgray", strokeWidth: 0\r
});\r
\r
const cardContent =\r
  new go.Panel("Horizontal", {\r
    margin: new go.Margin(10, 15)\r
  })\r
    .add(\r
      new go.Shape("BpmnTaskUser", {\r
        width: 20, height: 20,\r
        stroke: "darkgray", fill: "white",\r
        margin: new go.Margin(0, 10, 0, 0)\r
      }),\r
      new go.TextBlock({\r
        font: "bold 12px monospace"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
diagram.nodeTemplate = new go.Node("Spot")\r
  .add(\r
    new go.Panel("Auto")\r
      .add(\r
        new go.Shape("Rectangle", { fill: "white", stroke: "darkgray" }),\r
        new go.Panel("Vertical")\r
          .add(\r
            accentStrip,\r
            cardContent\r
          )\r
      ),\r
      go.GraphObject.build("TreeExpanderButton", { alignment: go.Spot.Right })\r
  );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, selectable: false, layerName: "Background" })\r
    .add(\r
      new go.Shape({ stroke: "darkgray", strokeWidth: 1.2 }),\r
      new go.Shape({ toArrow: "Standard", fill: "darkgray", strokeWidth: 0, scale: 0.8 })\r
    );\r
\r
diagram.layout = new go.TreeLayout({ angle: 0, layerSpacing: 58.5, nodeSpacing: 21 });\r
\r
diagram.model = new go.GraphLinksModel({\r
  nodeDataArray: [\r
    { key: "Alpha" }, { key: "Beta" }, { key: "Gamma" }, { key: "Delta" },\r
    { key: "Epsilon" }, { key: "Zeta" }, { key: "Eta" }, { key: "Theta" }\r
  ],\r
  linkDataArray: [\r
    { from: "Alpha", to: "Beta" },\r
    { from: "Beta", to: "Gamma" },\r
    { from: "Beta", to: "Delta" },\r
    { from: "Alpha", to: "Epsilon" },\r
    { from: "Epsilon", to: "Zeta" },\r
    { from: "Epsilon", to: "Eta" },\r
    { from: "Epsilon", to: "Theta" }\r
  ]\r
});`,isExecutable:!0,animation:!1,highlight:[36],language:`js`,initiallyVisible:!0},{id:`tree2`,code:`diagram.div.style.backgroundColor = "white";\r
\r
const accentStrip = new go.Shape("Rectangle", {\r
  stretch: go.Stretch.Horizontal,\r
  height: 3,\r
  fill: "darkgray", strokeWidth: 0\r
});\r
\r
const cardContent =\r
  new go.Panel("Horizontal", {\r
    margin: new go.Margin(10, 15)\r
  })\r
    .add(\r
      new go.Shape("BpmnTaskUser", {\r
        width: 20, height: 20,\r
        stroke: "darkgray", fill: "white",\r
        margin: new go.Margin(0, 10, 0, 0)\r
      }),\r
      new go.TextBlock({\r
        font: "bold 12px monospace"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
diagram.nodeTemplate =\r
  // by default each node is collapsed\r
  new go.Node("Spot", { isTreeExpanded: false })\r
  .add(\r
    new go.Panel("Auto")\r
      .add(\r
        new go.Shape("Rectangle", { fill: "white", stroke: "darkgray" }),\r
        new go.Panel("Vertical")\r
          .add(\r
            accentStrip,\r
            cardContent\r
          )\r
      ),\r
      go.GraphObject.build("TreeExpanderButton", { alignment: go.Spot.Right })\r
  );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, selectable: false, layerName: "Background" })\r
    .add(\r
      new go.Shape({ stroke: "darkgray", strokeWidth: 1.2 }),\r
      new go.Shape({ toArrow: "Standard", fill: "darkgray", strokeWidth: 0, scale: 0.8 })\r
    );\r
\r
diagram.layout = new go.TreeLayout({ angle: 0, layerSpacing: 58.5, nodeSpacing: 21 });\r
\r
const nodeDataArray = [\r
  { key: "Alpha" }, { key: "Beta" }, { key: "Gamma" }, { key: "Delta" },\r
  { key: "Epsilon" }, { key: "Zeta" }, { key: "Eta" }, { key: "Theta" },\r
  { key: "Iota" }, { key: "Kappa" }, { key: "Lambda" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" },\r
  { from: "Beta", to: "Gamma" },\r
  { from: "Beta", to: "Delta" },\r
  { from: "Alpha", to: "Epsilon" },\r
  { from: "Epsilon", to: "Zeta" },\r
  { from: "Epsilon", to: "Eta" },\r
  { from: "Eta", to: "Theta" },\r
  { from: "Gamma", to: "Iota" },\r
  { from: "Iota", to: "Kappa" },\r
  { from: "Iota", to: "Lambda" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
\r
// After the nodes and links have been created,\r
// expand each of the tree roots to 2 levels deep.\r
diagram.findTreeRoots().each(r => r.expandTree(2));`,isExecutable:!0,animation:!1,highlight:[27,71],language:`js`,initiallyVisible:!0},{id:`tree3`,code:`diagram.div.style.backgroundColor = "black";\r
\r
const myTreeExpanderButton =\r
  go.GraphObject.build("TreeExpanderButton", {\r
    alignment: go.Spot.Right,\r
    width: 20, height: 20,\r
    // styles for button border\r
    "ButtonBorder.figure": "Circle",\r
    "ButtonBorder.fill": "#06121c",\r
    "ButtonBorder.stroke": "cyan",\r
    // styles for button border when on hover\r
    "_buttonFillOver": go.Brush.mix("cyan", "black"),\r
    "_buttonStrokeOver": "cyan",\r
    // styles for +/- text\r
    "ButtonIcon.stroke": "cyan",\r
    "ButtonIcon.strokeWidth": 2\r
  });\r
\r
const accentStrip = new go.Shape("Rectangle", { stretch: go.Stretch.Horizontal, height: 3, fill: "cyan", strokeWidth: 0 });\r
\r
const cardContent =\r
  new go.Panel("Horizontal", {\r
    margin: new go.Margin(10, 15)\r
  })\r
    .add(\r
      new go.Shape("BpmnTaskUser", {\r
        width: 20, height: 20,\r
        stroke: "cyan", fill: "#06121c",\r
        margin: new go.Margin(0, 10, 0, 0)\r
      }),\r
      new go.TextBlock({\r
        font: "bold 12px monospace",\r
        stroke: "lightgray"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
diagram.nodeTemplate = new go.Node("Spot")\r
  .add(\r
    new go.Panel("Auto")\r
      .add(\r
        new go.Shape("Rectangle", { fill: "#0a1a28", stroke: "cyan" }),\r
        new go.Panel("Vertical")\r
          .add(\r
            accentStrip,\r
            cardContent\r
          )\r
      ),\r
      myTreeExpanderButton\r
  );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, selectable: false, layerName: "Background" })\r
    .add(\r
      new go.Shape({\r
        stroke: "cyan", strokeWidth: 1.2,\r
        strokeDashArray: [7.5, 5.25]\r
      }),\r
      new go.Shape({\r
        toArrow: "Circle",\r
        fill: "cyan", strokeWidth: 0,\r
        width: 4.5, height: 4.5 })\r
    );\r
\r
diagram.layout = new go.TreeLayout({ angle: 0, layerSpacing: 58.5, nodeSpacing: 21 });\r
\r
diagram.model = new go.GraphLinksModel({\r
  nodeDataArray: [\r
    { key: "Alpha" }, { key: "Beta" }, { key: "Gamma" }, { key: "Delta" },\r
    { key: "Epsilon" }, { key: "Zeta" }, { key: "Eta" }, { key: "Theta" }\r
  ],\r
  linkDataArray: [\r
    { from: "Alpha", to: "Beta" },\r
    { from: "Beta", to: "Gamma" },\r
    { from: "Beta", to: "Delta" },\r
    { from: "Alpha", to: "Epsilon" },\r
    { from: "Epsilon", to: "Zeta" },\r
    { from: "Epsilon", to: "Eta" },\r
    { from: "Epsilon", to: "Theta" }\r
  ]\r
});`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`3kyl2p`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};