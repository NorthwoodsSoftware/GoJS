import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Legends and titles`},htmlContent:`<h1>Legends and titles</h1>\r
<p>\r
  Sometimes in addition to the nodes and links that are the subject of a diagram, one also wants to display a "legend" or "key" describing the different kinds\r
  of nodes or links. Perhaps one also wants there to be "title" for the diagram in large letters.\r
</p>\r
\r
<h2 id="OutsideOfDiagram"><a class="not-prose heading-anchor" href="#OutsideOfDiagram">Outside of Diagram</a></h2>\r
<p>First, you must consider whether titles or legends should be part of the diagram or not. You can create whatever you want in HTML outside of the diagram.\r
\r
  Note that anything in HTML will not automatically scroll and zoom along with the diagram's contents shown in the viewport. But HTML elements could be\r
  positioned in front of or behind the diagram's DIV element.\r
</p>\r
\r
<h2 id="UnmodeledParts"><a class="not-prose heading-anchor" href="#UnmodeledParts">Unmodeled Parts</a></h2>\r
<p>Second, you should consider whether the title or legend should be held in your data model. Do you need to save and load that data in your database?</p>\r
<p>\r
  If you do not want to these objects to be included in your application's data model, you can just create them as simple <a href="../api/symbols/Part.html" target="api">Part</a>s and\r
  <a href="../api/symbols/Diagram.html#add" target="api">Diagram.add</a> them to your diagram at explicitly defined <a href="../api/symbols/Part.html#location" target="api">Part.location</a>s.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  If you do not assign a location or position for your Parts, and if your <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> (if any) does not assign any <a href="../api/symbols/Part.html#location" target="api">Part.location</a>, then there\r
  might not be a real location for those parts and they might not appear anywhere in the diagram.\r
</p>\r
<p class="box bg-info">\r
  All of the predefined <a href="../api/symbols/Layout.html" target="api">Layout</a>s that make use of <a href="../api/symbols/LayoutNetwork.html" target="api">LayoutNetwork</a>s, including <a href="../api/symbols/CircularLayout.html" target="api">CircularLayout</a>, do not operate on simple <a href="../api/symbols/Part.html" target="api">Part</a>s but only on\r
  <a href="../api/symbols/Node.html" target="api">Node</a>s and <a href="../api/symbols/Link.html" target="api">Link</a>s. If you had added a <a href="../api/symbols/Node.html" target="api">Node</a> to the diagram it would have been positioned as part of this diagram's normal tree layout, even\r
  though you explicitly set its location. Alternatively it could still be a Node if you set its <a href="../api/symbols/Part.html#islayoutpositioned" target="api">Part.isLayoutPositioned</a> property to false.\r
</p>\r
<p>\r
  You will notice that the title is selectable and movable and copyable and deletable in the diagram above. You may want to set properties such as\r
  <a href="../api/symbols/Part.html#selectable" target="api">Part.selectable</a> to false.\r
</p>\r
<p>For an example showing a legend, see the <a href="../samples/familyTreeJP" target="samples">Family Tree</a> sample.</p>\r
\r
<h3 id="ModeledParts"><a class="not-prose heading-anchor" href="#ModeledParts">Modeled Parts</a></h3>\r
<p>\r
  If on the other hand you do want to store your titles or legends in your model, you can do so using the normal mechanisms. Typically you will use\r
  <a href="templateMaps">node categories and template maps</a>.\r
</p>\r
\r
<h2 id="StaticParts"><a class="not-prose heading-anchor" href="#StaticParts">Static Parts</a></h2>\r
<p>\r
  Third, consider whether you want the title or legend to move or scale as the user scrolls or zooms the diagram. If you want to keep such a decoration at the\r
  same position in the viewport, you can place it in a Layer that has <a href="../api/symbols/Layer.html#isviewportaligned" target="api">Layer.isViewportAligned</a> set to <code>true</code>. There are two such layers that\r
  are predefined for you: "ViewportBackground" and "ViewportForeground". Parts added to these layers will position and scale themselves according to their\r
  alignment spots, <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> and <a href="../api/symbols/GraphObject.html#alignmentfocus" target="api">GraphObject.alignmentFocus</a>, relative to the viewport, and their drawn scale will not change with the\r
  Diagram scale. Thus they will not move as the user scrolls or zooms.\r
</p>\r
<p>\r
  If you set or bind the <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a> or <a href="../api/symbols/Part.html#location" target="api">Part.location</a> properties of Parts in such Layers, those new values will be ignored because the\r
  alignment properties take precedence. However those properties still have valid values, with Points that are in document coordinates.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  Note that as the user pans or scrolls or zooms the diagram, the title remains at the same top-left corner at apparently the same effective size. This example\r
  makes use of the "ViewportBackground" <a href="../api/symbols/Layer.html" target="api">Layer</a> (see <a href="layers">learn page on Layers</a>), which is convenient for making sure the title (or legend)\r
  stays in the background and does not participate in selection or mouse events or the <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a>.\r
</p>\r
`,codeBlocks:[{id:`unmodeled`,code:`diagram.layout = new go.CircularLayout({ radius: 80, startAngle: 90 })\r
diagram.add(\r
  new go.Part({ location: new go.Point(-50, -40) })\r
    .add(\r
      new go.TextBlock("Rock Paper Scissors", { font: "bold 20pt sans-serif" })\r
    ));\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { })\r
        .bind("fill", "color"),\r
      new go.Shape({ fill: "white", margin: 8 })\r
        .bind("geometryString", "svg")\r
        .bind("width")\r
        .bind("height")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier, curviness: 25 })\r
    .add(\r
      new go.Shape({ strokeWidth: 2 }),\r
      new go.Shape({ strokeWidth: 1, toArrow: "Standard" })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "Rock", color: "#79ADDC", width: 70, height: 50,\r
    svg: "F M 0 9 C 0 7 1 6 2 5 C 3 3 4 2 6 1 C 7 0 9 0 10 0 C 19 0 21 1 22 3 C 22 6 24 8 24 9 C 25 12 22 14 21 14 C 18 15 16 13 13 13 C 11 13 11 11 7 12 C 7 12 4 12 2 11 C 1 11 1 10 0 9" },\r
  { key: "Paper", color: "#0C7C59", width: 50, height: 70,\r
    svg: "F M 0 0 V 7 H 5 V 2 L 3 0 H 0 M 3 0 L 3 2 L 5 2" },\r
  { key: "Scissors", color: "#EF476F", width: 70, height: 50,\r
    svg: "F M 41 6 C 40 4 38 4 35 5 l -16 6 c -5 -3 -9 -2 -9 -3 c 0 -1 1 -1 1 -3 c 0 -2 -2 -4 -5 -4 c -2 0 -5 2 -5 4 c 0 3 2 5 5 5 c 3 0 8 -1 11 3 c -3 4 -8 3 -11 3 c -3 0 -5 2 -5 5 c 0 2 3 4 5 4 c 3 0 5 -1 5 -3 c 0 -2 -1 -3 -1 -4 c 0 -1 4 0 9 -3 L 34 21 C 37 22 40 22 41 20 L 22 13 L 41 6 M 6 3 C 9 3 10 5 9 7 C 8 9 3 9 3 5 C 3 4 4 3 6 3 M 6 23 C 4 23 3 22 3 21 C 3 17 8 17 9 19 C 10 21 9 23 6 23" }\r
],\r
[\r
  { from: "Paper", to: "Rock"},\r
  { from: "Rock", to: "Scissors"},\r
  { from: "Scissors", to: "Paper"}\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`static`,code:`// this Layer is behind everything and is not interactive\r
// the title stays pinned to the top-left corner of the viewport\r
const myTitle =\r
  new go.Part({ layerName: "ViewportBackground", alignment: go.Spot.TopLeft })\r
    .add(\r
      new go.Panel("Vertical", { margin: 8 })\r
        .add(\r
          new go.TextBlock("MBTA", { font: "bold 45pt sans-serif" }),\r
          new go.TextBlock("Boston Subway Map", { margin: -16, font: "bold 12pt tahoma" })\r
        )\r
    );\r
// add the title to the diagram\r
diagram.add(myTitle);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { selectable: false, locationObjectName: "DOT" })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Circle", { name: "DOT", width: 4, height: 4, fill: "white", portId: "" }),\r
      new go.TextBlock({ font: "bold 5pt sans-serif" })\r
        .bind("text", "name")\r
        .bind("alignment", "dir", labelAlignment)\r
        .bind("alignmentFocus", "dir", labelFocus)\r
    );\r
diagram.linkTemplate =\r
  new go.Link({ selectable: false, layerName: "Background",\r
    fromShortLength: -2.5, toShortLength: -2.5\r
  })\r
    .add(\r
      new go.Shape({ strokeWidth: 6, strokeCap: "round" })\r
        .bind("stroke", "color")\r
    );\r
\r
function labelAlignment(dir) {\r
  if (dir === "L") return new go.Spot(0, 0.5, -3, 0);\r
  if (dir === "T") return new go.Spot(0.5, 0, 0, -2);\r
  if (dir === "R") return new go.Spot(1, 0.5, 5, 0);\r
}\r
function labelFocus(dir) {\r
  if (dir === "L") return go.Spot.Right;\r
  if (dir === "T") return go.Spot.Bottom;\r
  if (dir === "R") return go.Spot.Left;\r
}\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, name: "BOSTON\\nCOLLEGE", loc: "0 135", dir: "L" },\r
  { key: 2, name: "CLEVELAND\\nCIRCLE", loc: "15 170", dir: "L" },\r
  { key: 3, name: "RIVERSIDE", loc: "25 210", dir: "L" },\r
  { key: 4, name: "HEATH ST", loc: "85 205", dir: "L" },\r
  { key: 5, name: "UNION SQ", loc: "170 60", dir: "T" },\r
  { key: 6, name: "WONDERLAND", loc: "300 15", dir: "T" },\r
  { key: 7, name: "BOWDOIN", loc: "180 95", dir: "T" },\r
  { key: 8, name: "OAK GROVE", loc: "205 0", dir: "L" },\r
  { key: 9, name: "FOREST HILLS", loc: "85 250", dir: "R" },\r
  { key: 10, name: "ALEWIFE", loc: "85 25", dir: "L" },\r
  { key: 11, name: "BRAINTREE", loc: "265 300", dir: "R" },\r
  { key: 12, name: "MATTAPAN", loc: "165 285", dir: "T" },\r
  { key: 13, loc: "55 90"}, { key: 14, loc: "105 135"}, { key: 15, loc: "205 113"},\r
  { key: 16, loc: "195 135"}, { key: 17, loc: "180 120"}, { key: 18, loc: "193 105"},\r
  { key: 19, loc: "165 135"}, { key: 20, loc: "220 160"}, { key: 21, loc: "220 225"},\r
  { key: 22, loc: "205 240"}, { key: 23, loc: "205 285"}, { key: 24, loc: "265 280"},\r
  { key: 25, loc: "125 160"}, { key: 26, loc: "125 135"}, { key: 27, loc: "72 122"},\r
  { key: 28, loc: "87 135"}, { key: 29, loc: "199 98"}, { key: 30, loc: "199 78"}\r
],\r
[\r
  { from: 14, to: 19, color: "#009969" }, { from: 19, to: 17, color: "#009969" },\r
  { from: 17, to: 18, color: "#009969" }, { from: 4, to: 25, color: "#009969" },\r
  { from: 25, to: 26, color: "#009969" }, { from: 13, to: 14, color: "#009969" },\r
  { from: 1, to: 13, color: "#009969" }, { from: 3, to: 14, color: "#009969" },\r
  { from: 2, to: 27, color: "#009969" }, { from: 27, to: 28, color: "#009969" },\r
  { from: 28, to: 14, color: "#009969" }, { from: 18, to: 29, color: "#009969" },\r
  { from: 29, to: 30, color: "#009969" }, { from: 30, to: 5, color: "#009969" },\r
\r
  { from: 10, to: 17, color: "#DA291C" }, { from: 17, to: 16, color: "#DA291C" },\r
  { from: 16, to: 20, color: "#DA291C" }, { from: 20, to: 21, color: "#DA291C" },\r
  { from: 21, to: 22, color: "#DA291C" }, { from: 22, to: 23, color: "#DA291C" },\r
  { from: 23, to: 12, color: "#DA291C" }, { from: 21, to: 24, color: "#DA291C" },\r
  { from: 24, to: 11, color: "#DA291C" },\r
\r
  { from: 7, to: 18, color: "#0084CD" }, { from: 18, to: 15, color: "#0084CD" },\r
  { from: 15, to: 6, color: "#0084CD" },\r
\r
  { from: 8, to: 15, color: "#ED8B00" }, { from: 15, to: 16, color: "#ED8B00" },\r
  { from: 16, to: 9, color: "#ED8B00" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`qq1w44`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};