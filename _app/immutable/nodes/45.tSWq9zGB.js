import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Overview`},htmlContent:`<h1>Overview Diagrams</h1>\r
\r
<p>\r
  An <a href="../api/symbols/Overview.html" target="api">Overview</a> is a subclass of <a href="../api/symbols/Diagram.html" target="api">Diagram</a> that can display all <a href="../api/symbols/Part.html" target="api">Part</a>s of another diagram and also a representation of that \r
  diagram's viewport relative to those parts. Overviews allow the user to scroll on the diagram by clicking or dragging within the overview. \r
</p>\r
\r
<p>\r
  To use an Overview, provide the constructor with a div's name and set <a href="../api/symbols/Overview.html#observed" target="api">Overview.observed</a> to a Diagram. \r
  To show both your Diagram and Overview, you'll need two divs. You can change <a href="../api/symbols/Overview.html#observed" target="api">Overview.observed</a> to other Diagrams, or to null.\r
</p>\r
\r
<p>\r
  Overviews do not display Animations, Images, or SVG.\r
</p>\r
\r
<p>\r
  See samples that make use of Overviews in the <a href="../samples/#overview">samples index</a>.\r
</p>\r
\r
<p>\r
  Because Overview extends Diagram, you can, for some purposes, modify the Overview just like a Diagram. \r
  Because <a href="../api/symbols/Overview.html#observed" target="api">Overview.observed</a> overwrites many properties of the Overview we'd normally access, like the <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a>, \r
  modifcations are limited to simpler operations, like <a href="../api/symbols/Diagram.html#push" target="api">Diagram.push</a>. Still, programmatic usage of these simpler functions can acheive useful results, \r
  such as the city labels in this example. \r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  In addition to adding parts to the Overview, the box is referenced using <a href="../api/symbols/Panel.html#findobject" target="api">Panel.findObject</a> and then modified.\r
</p>\r
\r
<p>\r
  <a href="../api/symbols/Shape.html#addfiguregenerator" target="api">Shape.addFigureGenerator</a> is used to add a hexagon shape to the collection of valid figures.\r
  See the <a href="extensions">Figures Extension</a> for more shapes. A <a href="../api/symbols/Part.html#layername" target="api">Part.layerName</a> binding is used to show city names above adjacent nodes. \r
  <a href="../api/symbols/Brush.html#isdark" target="api">Brush.isDark</a> is used in a binding transformer to have text automatically adjust for the fill of the node.\r
</p>`,codeBlocks:[{id:`hexMap`,code:`// create the Overview\r
// initialize it to show the main Diagram\r
const overview =\r
  new go.Overview("hexMapOverviewDiv",\r
    { observed: diagram }\r
  );\r
\r
// find the default overview box and alter its properties\`\r
const boxShape = overview.box.findObject("BOXSHAPE");\r
boxShape.fill = "rgba(168, 50, 50, 0.18)";\r
boxShape.stroke = "#a83232";\r
\r
// allow html buttons to call functions\r
window.regenerate = generateMap;\r
window.jumpToCity = (i) => {\r
  const c = cities[i];\r
  if (!c) return;\r
  const part = diagram.findPartForData(c);\r
  if (part) diagram.commandHandler.scrollToPart(part);\r
};\r
\r
// generate map\r
go.Shape.defineFigureGenerator("Hexagon", (shape, w, h) => {\r
  const fig = new go.PathFigure(0.25 * w, 0);\r
  fig.add(new go.PathSegment(go.SegmentType.Line, 0.75 * w, 0));\r
  fig.add(new go.PathSegment(go.SegmentType.Line, w, 0.5 * h));\r
  fig.add(new go.PathSegment(go.SegmentType.Line, 0.75 * w, h));\r
  fig.add(new go.PathSegment(go.SegmentType.Line, 0.25 * w, h));\r
  fig.add(new go.PathSegment(go.SegmentType.Line, 0, 0.5 * h).close());\r
  return new go.Geometry().add(fig);\r
});\r
\r
diagram.allowSelect = false;\r
diagram.layout = new go.Layout();\r
diagram.initialScale = 1.6;\r
diagram.initialDocumentSpot = go.Spot.Center;\r
diagram.initialViewportSpot = go.Spot.Center;\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { locationSpot: go.Spot.Center, desiredSize: new go.Size(80, 35) })\r
    .bind("location", "loc")\r
    .bind("layerName")\r
    .add(\r
      new go.Shape("Hexagon", { strokeWidth: 0, desiredSize: new go.Size(40, 35) })\r
        .bind("fill"),\r
      new go.TextBlock({ font: "bold 8pt sans-serif", textAlign: "center" })\r
        .bind("text", "kind")\r
        .bind("stroke", "fill", c => go.Brush.isDark(c) ? "white" : "#222")\r
    );\r
\r
const tiles = [\r
  { fill: "#2a6db3", kind: "deep"   },\r
  { fill: "#6bb6e8", kind: "sea"    },\r
  { fill: "#e8d27a", kind: "sand"   },\r
  { fill: "#8bbc54", kind: "grass"  },\r
  { fill: "#3a7a3a", kind: "forest" },\r
  { fill: "#6a6a6a", kind: "stone"  }\r
];\r
const cols = 45, rows = 45, hexW = 40, hexH = 35;\r
const cityNames = ["Jacks's Arm", "Cow Head", "Fogo"];\r
const mapW = (cols - 1) * hexW * 0.75;\r
const mapH = (rows - 1) * hexH + hexH / 2;\r
let cities = [];\r
const cityMarkers = [];\r
\r
function generateMap() {\r
  for (const m of cityMarkers) overview.remove(m);\r
  cityMarkers.length = 0;\r
  const phaseA = Math.random() * Math.PI * 2;\r
  const phaseB = Math.random() * Math.PI * 2;\r
  function elevation(c, r) {\r
    const dist = Math.hypot(c - cols / 2, r - rows / 2) / (cols / 2);\r
    return Math.sin(c * 0.18 + phaseA)\r
         + Math.cos(r * 0.18 + phaseB)\r
         + Math.sin((c + r) * 0.11)\r
         + Math.sin(c * 0.45 + r * 0.55) * 0.7\r
         - dist * 1.0;\r
  }\r
  function pickTile(c, r) {\r
    const e = elevation(c, r);\r
    if (e < -2.0) return tiles[0];\r
    if (e < -1.0) return tiles[1];\r
    if (e < -0.4) return tiles[2];\r
    if (e <  0.8) return tiles[3];\r
    if (e <  1.8) return tiles[4];\r
    return tiles[5];\r
  }\r
  const nodeDataArray = [];\r
  for (let r = 0; r < rows; r++) {\r
    for (let c = 0; c < cols; c++) {\r
      const x = c * hexW * 0.75;\r
      const y = r * hexH + (c % 2 ? hexH / 2 : 0);\r
      const shrink = .98\r
      nodeDataArray.push({ ...pickTile(c, r), loc: new go.Point(shrink * x, shrink * y) });\r
    }\r
  }\r
  \r
  // find random grass tiles and modify their node data to become cities\r
  const grassIndices = nodeDataArray.map((d, i) => d.kind === "grass" ? i : -1).filter(i => i >= 0);\r
  cities = [];\r
  for (const name of cityNames) {\r
    if (grassIndices.length === 0) break;\r
    const randomGrassIndex = grassIndices.splice(Math.floor(Math.random() * grassIndices.length), 1)[0];\r
    nodeDataArray[randomGrassIndex] = { \r
      ...nodeDataArray[randomGrassIndex],\r
      fill: "#a83232",\r
      kind: name,\r
      layerName: go.LayerNames.Foreground\r
    };\r
    cities.push(nodeDataArray[randomGrassIndex]);\r
  }\r
  diagram.model = new go.Model(nodeDataArray);\r
  for (const c of cities) {\r
    const marker =\r
      new go.Part({\r
          location: c.loc,\r
          locationSpot: new go.Spot(c.loc.x / mapW, c.loc.y / mapH),\r
          selectable: false\r
        })\r
        .add(\r
          new go.Panel("Auto").add(\r
            new go.Shape("RoundedRectangle", { fill: "#a83232", stroke: "white", strokeWidth: 3 }),\r
            new go.TextBlock(c.kind, { stroke: "white", font: "bold 36pt sans-serif", margin: 8 })\r
          )\r
        );\r
    cityMarkers.push(marker);\r
    overview.add(marker);\r
  }\r
}\r
\r
generateMap();`,isExecutable:!0,animation:!1,split:40,html:`
<style>
  body.has-html { flex-direction: row; }
  body.has-html .extra-html { padding: 0; display: flex; }
  body.has-html #hexMapOverviewWrapper { flex: none; width: 360px; border-left: 1px solid #555; display: flex; flex-direction: column; }
  body.has-html #hexMapOverviewDix { flex: 1; }
  #cityBar { padding: 8px; display: flex; gap: 6px; flex-wrap: wrap; }
</style>
<div id="hexMapOverviewWrapper">
  <div id="cityBar">
    <input type="button" onclick="regenerate()" value="New Map" />
    <input type="button" onclick="jumpToCity(0)" value="Jack's Arm" />
    <input type="button" onclick="jumpToCity(1)" value="Cow Head" />
    <input type="button" onclick="jumpToCity(2)" value="Fogo" />
  </div>
  <div id="hexMapOverviewDiv" class="diagramStyling"></div>
</div>`,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1tv8ftp`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};