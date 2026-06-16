import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Sized Groups`},htmlContent:`<h1>Groups without Placeholders</h1>\r
<p>\r
  Although it is very common to use a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a> inside a <a href="../api/symbols/Group.html" target="api">Group</a>, it is not required.\r
  Using a <a href="../api/symbols/Shape.html" target="api">Shape</a>, for example, instead of a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a> permits features such as having a group maintain a fixed size,\r
  independent of the sizes and positions of its member nodes, and even when there are no member nodes at all.\r
  It also may allow the user to resize the "area" if that functionality is desired.\r
</p>\r
\r
<h2 id="FixedSizeGroups"><a class="not-prose heading-anchor" href="#FixedSizeGroups">Fixed size Groups</a></h2>\r
<p>\r
  Not using a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a> in a <a href="../api/symbols/Group.html" target="api">Group</a> means that you have to maintain the size and position of the group,\r
  because it cannot depend on the size and position of its member nodes.\r
  In these examples we will explicitly set and/or bind the <a href="../api/symbols/Part.html#location" target="api">Part.location</a> of the nodes, including the groups.\r
  The <a href="../api/symbols/Shape.html" target="api">Shape</a> that replaces the Placeholder in the group's template\r
  should also get its <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> set or bound.\r
</p>\r
<p>\r
  The below example is a comparison between a Group with a Placeholder,\r
  which sizes automatically based on its members (see <a href="groups">Groups</a>),\r
  and one without, whose size you would have to maintain yourself.\r
  In this particular sample the size does not change.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Note that moving the "B1" or "B2" nodes does <i>not</i> change the size or position of the yellow (shape) group.\r
  However moving or copying or deleting the group includes those member nodes in the operation.\r
</p>\r
<p>\r
  One can control where the user may drag member nodes. For example, the <a href="../samples/swimLanes" target="_blank">Swim Lanes</a> sample demonstrates\r
  a custom <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a> function that limits the motion of a member node to stay within its containing group.\r
</p>\r
\r
<h2 id="ResizableGroups"><a class="not-prose heading-anchor" href="#ResizableGroups">Resizable Groups</a></h2>\r
<p>You can make the main shape resizable by the user. (At the current time groups are not rotatable.)</p>\r
<p>\r
  This example also makes the <a href="../api/symbols/Part.html#location" target="api">Part.location</a> and <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> data bindings TwoWay, so that as the user moves groups or resizes their\r
  main shapes, the data in the model is updated automatically.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  It is also possible to control how the user resizes a group.\r
  For example, the <a href="../samples/swimLanes" target="_blank">Swim Lanes</a> sample demonstrates a custom <a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a>\r
  that limits how small each lane can go.\r
  It also demonstrates a custom <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that has only two resize handles.\r
</p>\r
\r
<h2 id="ContainersThatAreNotGroups"><a class="not-prose heading-anchor" href="#ContainersThatAreNotGroups">Containers that are not Groups</a></h2>\r
<p>\r
  You do not have to use <a href="../api/symbols/Group.html" target="api">Group</a>s as the only mechanism by which to organize a collection of <a href="../api/symbols/Part.html" target="api">Part</a>s. For example, the\r
  <a href="../samples/swimBands" target="_blank">Layer Bands</a> sample demonstrates how some <a href="../api/symbols/Layout.html" target="api">Layout</a>s can be customized to automatically maintain\r
  the positions and sizes of special parts that are in the background, appearing to surround the nodes that belong to each layout layer.\r
</p>\r
<p>\r
  Not using <a href="../api/symbols/Group.html" target="api">Group</a>s also means that it becomes possible to avoid some of the restrictions inherent in Groups, such as the limitation that each Part can\r
  have at most one <a href="../api/symbols/Part.html#containinggroup" target="api">Part.containingGroup</a>. The <a href="../samples/sharedStates" target="_blank">Shared States</a> sample demonstrates how one can\r
  make it appear that more than one "group" can contain a node. However, this requires some additional custom <a href="../api/symbols/Tool.html" target="api">Tool</a>s and custom <a href="../api/symbols/Layout.html" target="api">Layout</a>s, or always\r
  explicitly setting/binding the location and size of every node and "group".\r
</p>\r
`,codeBlocks:[{id:`fixedSize`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "gray" }),\r
      new go.TextBlock({ margin: 6 })\r
        .bind("text")\r
    );\r
\r
// group with PLACEHOLDER\r
diagram.groupTemplateMap.add("auto",\r
  new go.Group("Vertical")\r
    .add(\r
      new go.TextBlock({ font: "Bold 11pt Sans-Serif", margin: 4 })\r
        .bind("text"),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("Rectangle", { fill: "rgba(0,160,160,0.10)", stroke: "teal" }),\r
          new go.Placeholder({ padding: 12 })\r
        )\r
    )\r
);\r
\r
// group with SHAPE\r
diagram.groupTemplateMap.add("sized",\r
  new go.Group("Vertical", {\r
    selectionObjectName: "PH",\r
    locationObjectName: "PH"\r
  })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.TextBlock({ font: "Bold 11pt Sans-Serif" }) // group title\r
        .bind("text"),\r
      // using a Shape instead of a Placeholder\r
      new go.Shape({ fill: "lightyellow", stroke: "goldenrod", name: "PH" })\r
        .bind("desiredSize", "size", go.Size.parse)\r
    )\r
);\r
\r
const nodeDataArray = [\r
  // placeholder group\r
  { key: "A", text: "With Placeholder (auto-sizes)", isGroup: true, category: "auto" },\r
  { key: "a1", text: "A1", group: "A", loc: "0 40" },\r
  { key: "a2", text: "A2", group: "A", loc: "120 95" },\r
  // shape group\r
  { key: "B", text: "Shape, no Placeholder", isGroup: true, category: "sized", loc: "230 100", size: "210 130" },\r
  { key: "b1", text: "B1", group: "B", loc: "240 190" },\r
  { key: "b2", text: "B2", group: "B", loc: "395 110" }\r
]\r
\r
const linkDataArray = [\r
  { from: "a2", to: "b1" },  // from outside the Group to inside it\r
  { from: "b1", to: "b2" },  // this link is a member of the Group\r
  { from: "B", to: "a2" }  // from the Group to a Node\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,highlight:[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],language:`js`,initiallyVisible:!0},{id:`resizable`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "gray" }),\r
      new go.TextBlock({ margin: 6 })\r
        .bind("text")\r
    );\r
\r
// group with SHAPE\r
diagram.groupTemplate =\r
  new go.Group("Vertical", {\r
    selectionObjectName: "PH",\r
    locationObjectName: "PH",\r
    resizable: true,\r
    resizeObjectName: "PH"\r
  })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.TextBlock({ font: "Bold 11pt Sans-Serif" }) // group title\r
        .bind("text"),\r
      // using a Shape instead of a Placeholder\r
      new go.Shape({ fill: "lightyellow", stroke: "goldenrod", name: "PH" })\r
        .bindTwoWay("desiredSize", "size", go.Size.parse, go.Size.stringify)\r
    );\r
\r
const nodeDataArray = [\r
  { key: "a2", text: "A2", loc: "-100 20" },\r
  { key: "B", text: "Shape, no Placeholder", isGroup: true, size: "210 130" },\r
  { key: "b1", text: "B1", group: "B", loc: "10 100" },\r
  { key: "b2", text: "B2", group: "B", loc: "165 20" }\r
]\r
\r
const linkDataArray = [\r
  { from: "a2", to: "b1" },  // from outside the Group to inside it\r
  { from: "b1", to: "b2" },  // this link is a member of the Group\r
  { from: "B", to: "a2" }  // from the Group to a Node\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
\r
diagram.select(diagram.findNodeForKey("B"));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`4fmo25`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};