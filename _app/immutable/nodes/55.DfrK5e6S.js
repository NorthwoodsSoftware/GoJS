import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Replace/delete Diagrams`},htmlContent:`<h1>Replacing Diagrams and Models</h1>\r
\r
<p>\r
  Many applications will require the programmer to show different Diagrams in the same content area of the page.\r
  This is especially common in single-page webapps.\r
  Often, you do not need to remove the Diagram, and create another one, to do this.\r
  Since the Diagram is analogous to a <em>view</em> in a <em>model-view</em> architecture,\r
  you can instead replace the <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a>, and perhaps other settings,\r
  like the <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a> or <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a>.\r
  Or you could build larger template maps that accommodate all Models you wish to present.\r
</p>\r
\r
<p>\r
  This example swaps <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a> between two very different sets of node/link data.\r
  The <a href="../api/symbols/GraphLinksModel.html#linkdataarray" target="api">GraphLinksModel.linkDataArray</a>s share the same link template across both models, and so the links look the same,\r
  while the <a href="../api/symbols/GraphLinksModel.html#nodedataarray" target="api">GraphLinksModel.nodeDataArray</a>s define differnet <a href="../api/symbols/Part.html#category" target="api">Part.category</a>s, allowing them utilize difference Node templates to more drastically change appearance.\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  Note that changing the Model destroys all state not kept in the Model, such as the currently selected Parts,\r
  and if there are no data bindings for them, the positions of all Nodes as well, and so on.\r
  These can be saved in the Model before switching, when they are relevant.\r
</p>\r
\r
<h2 id="TwoDiagramsReusingOneDiv"><a class="not-prose heading-anchor" href="#TwoDiagramsReusingOneDiv">Two Diagrams re-using one div</a></h2>\r
\r
<p>\r
  Sometimes users want to work on two or more Diagrams at once and keep all Diagram state without repeatedly saving changes to the model.\r
  If this is the case, you may wish to put two Diagrams on the page (as all samples with a Palette do),\r
  or you may wish to put Diagrams into multiple "tabs" or some other mechanism, like the\r
  <a href="../samples/vendingPlanogram">Vending Machine Planogram sample does with its two Palettes</a>\r
  (a simpler version of this is the regular <a href="../samples/vendingPlanogram">Planogram sample with four Palettes</a>).\r
</p>\r
\r
<p>\r
  Alternatively, you may wish to display the two Diagrams in the same div, one at a time, by swapping them out.\r
  You can swap the div by setting <a href="../api/symbols/Diagram.html#div" target="api">Diagram.div</a> to <code>null</code> on the first Diagram,\r
  and setting the div on the second.\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  If you select a Node and move it, and toggle Diagrams back and forth,\r
  you will see that the selection and Node positioning persists.\r
  Both Diagrams remain in memory, only the div is swapped to use one or the other.\r
</p>\r
\r
<h2 id="PermanentlyDeletingDiagram"><a class="not-prose heading-anchor" href="#PermanentlyDeletingDiagram">Permanently deleting a Diagram</a></h2>\r
\r
<p>\r
  You may wish to remove a Diagram and ensure it leaves no memory footprint.\r
  To do this, if you have not created any other references to your Diagram or\r
  GraphObjects or Tools or Layouts within, you can write:\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  If you have used Pictures, you should also clear the Picture cache,\r
  which GoJS creates to store a map of source URLs to Image elements:\r
</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
`,codeBlocks:[{id:`first`,code:`diagram.layout = new go.Layout();\r
diagram.initialAutoScale = go.AutoScale.Uniform;\r
diagram.contentAlignment = go.Spot.Center;\r
diagram.padding = 24;\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Normal, layerName: "Background" })\r
    .add(\r
      new go.Shape({ isPanelMain: true, strokeWidth: 7, strokeCap: "round" })\r
        .bind("stroke", "color")\r
    );\r
\r
diagram.nodeTemplateMap.add("station",\r
  new go.Node("Spot", { locationSpot: go.Spot.Center })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Circle", {\r
        width: 9, height: 9, fill: "#1a1a1a", strokeWidth: 0, portId: ""\r
      }),\r
      new go.TextBlock({ font: "11px sans-serif", stroke: "#1a1a1a" })\r
        .bind("text", "key")\r
        .bind("alignment", "side", nameSpot)\r
        .bind("alignmentFocus", "side", nameFocus)\r
    )\r
  );\r
\r
diagram.nodeTemplateMap.add("interchange",\r
  new go.Node("Spot", { locationSpot: go.Spot.Center })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Circle", {\r
        width: 17, height: 17, fill: "white", stroke: "#1a1a1a", strokeWidth: 3, portId: ""\r
      }),\r
      new go.TextBlock({ font: "bold 11px sans-serif", stroke: "#1a1a1a" })\r
        .bind("text", "key")\r
        .bind("alignment", "side", nameSpot)\r
        .bind("alignmentFocus", "side", nameFocus)\r
    )\r
  );\r
\r
diagram.nodeTemplateMap.add("busStop",\r
  new go.Node("Spot", { locationSpot: go.Spot.Center })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Circle", { width: 8, height: 8, fill: "white", stroke: "#9e9e9e", strokeWidth: 1.5, portId: "" })\r
    )\r
  );\r
\r
diagram.nodeTemplateMap.add("road",\r
  new go.Node("Spot", { locationSpot: go.Spot.Center, layerName: "Grid", pickable: false })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#d4d4d4", strokeWidth: 0 })\r
        .bind("desiredSize", "size", go.Size.parse)\r
    )\r
  );\r
\r
diagram.nodeTemplateMap.add("busBullet",\r
  new go.Node("Spot", { locationSpot: go.Spot.Center })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Circle", {\r
        width: 32, height: 32, strokeWidth: 2, stroke: "white", portId: ""\r
      })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ font: "bold 11px sans-serif", stroke: "white" })\r
        .bind("text", "route")\r
    )\r
  );\r
\r
const RED = "#EE352E", YELLOW = "#FCCC0A", PURPLE = "#B933AD",\r
  BLUE = "#005DAA", TEAL = "#00A9CE", GREEN = "#00873C";\r
\r
const subwayModel = new go.GraphLinksModel(\r
  [\r
    { category: "station",     key: "Columbus Circle", loc: "70 50",  side: "left" },\r
    { category: "interchange", key: "Times Sq",        loc: "70 120", side: "left" },\r
    { category: "station",     key: "Penn Station",    loc: "70 190", side: "left" },\r
\r
    { category: "station",     key: "Lexington Av",    loc: "280 50",  side: "right" },\r
    { category: "interchange", key: "Grand Central",   loc: "280 120", side: "right" },\r
    { category: "station",     key: "33 St",           loc: "280 190", side: "right" },\r
    { category: "interchange", key: "Union Sq",        loc: "280 260", side: "right" },\r
    { category: "station",     key: "Brooklyn Bridge", loc: "280 330", side: "right" },\r
\r
    { category: "station", key: "Bryant Pk",       loc: "175 120", side: "above" },\r
    { category: "station", key: "23 St",           loc: "210 260", side: "below" }\r
  ],\r
  [\r
    // west side\r
    { from: "Columbus Circle", to: "Times Sq",     color: RED },\r
    { from: "Times Sq",        to: "Penn Station", color: RED },\r
    // east side\r
    { from: "Lexington Av",  to: "Grand Central",   color: GREEN },\r
    { from: "Grand Central", to: "33 St",           color: GREEN },\r
    { from: "33 St",         to: "Union Sq",        color: GREEN },\r
    { from: "Union Sq",      to: "Brooklyn Bridge", color: GREEN },\r
    // crosstown\r
    { from: "Times Sq",  to: "Bryant Pk",     color: PURPLE },\r
    { from: "Bryant Pk", to: "Grand Central", color: PURPLE },\r
    // diagonal\r
    { from: "Times Sq",  to: "23 St", color: YELLOW },\r
    { from: "23 St",     to: "Union Sq",  color: YELLOW }\r
  ]\r
);\r
\r
const busModel = new go.GraphLinksModel(\r
  [\r
    { category: "road", loc: "90 180",  size: "10 250" },\r
    { category: "road", loc: "200 180", size: "10 250" },\r
    { category: "road", loc: "310 180", size: "10 250" },\r
    { category: "road", loc: "200 90",  size: "290 10" },\r
    { category: "road", loc: "200 180", size: "290 10" },\r
    { category: "road", loc: "200 270", size: "290 10" },\r
\r
    { category: "busBullet", key: "M15", route: "M15", loc: "200 40",  color: BLUE },\r
    { category: "busBullet", key: "M34", route: "M34", loc: "360 180", color: TEAL },\r
    { category: "busBullet", key: "B41", route: "B41", loc: "310 40",  color: GREEN },\r
\r
    { category: "busStop", key: "ctr",    loc: "200 180" },\r
    { category: "busStop", key: "east",   loc: "310 180" },\r
    { category: "busStop", key: "m15end", loc: "200 270" },\r
    { category: "busStop", key: "m34end", loc: "90 180"  },\r
    { category: "busStop", key: "corner", loc: "310 270" },\r
    { category: "busStop", key: "b41end", loc: "90 270"  }\r
  ],\r
  [\r
    { from: "M15", to: "ctr",    color: BLUE },\r
    { from: "ctr", to: "m15end", color: BLUE },\r
\r
    { from: "M34",  to: "east",   color: TEAL },\r
    { from: "east", to: "ctr",    color: TEAL },\r
    { from: "ctr",  to: "m34end", color: TEAL },\r
\r
    { from: "B41",    to: "east",   color: GREEN },\r
    { from: "east",   to: "corner", color: GREEN },\r
    { from: "corner", to: "b41end", color: GREEN }\r
  ]\r
);\r
\r
function nameSpot(side) {\r
  if (side === "left")  return new go.Spot(0, 0.5, -7, 0);\r
  if (side === "above") return new go.Spot(0.5, 0, 0, -5);\r
  if (side === "below") return new go.Spot(0.5, 1, 0, 5);\r
  return new go.Spot(1, 0.5, 7, 0); // right\r
}\r
function nameFocus(side) {\r
  if (side === "left")  return go.Spot.Right;\r
  if (side === "above") return go.Spot.Bottom;\r
  if (side === "below") return go.Spot.Top;\r
  return go.Spot.Left;\r
}\r
\r
let showingMetro = true;\r
\r
const button1 = document.getElementById("button1");\r
button1.addEventListener("click", swapMaps);\r
swapMaps();\r
\r
function swapMaps() {\r
  diagram.model = showingMetro ? subwayModel : busModel;\r
  button1.textContent = showingMetro ? "Show the bus map" : "Show the subway map";\r
  showingMetro = !showingMetro;\r
}`,isExecutable:!0,animation:!1,html:`<p><button id="button1">Show bus map</button></p>`,minHeight:460,highlight:[161],language:`js`,initiallyVisible:!0},{id:`second`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 0 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text", "key")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "Alpha", color: "lightskyblue" },\r
  { key: "Beta", color: "orange" }\r
], [\r
  { from: "Alpha", to: "Beta" }\r
]);\r
\r
const diagram2 = new go.Diagram();\r
\r
diagram2.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: 'springgreen', strokeWidth: 2, parameter1: 20\r
      }),\r
      new go.TextBlock({ margin: 10, font: 'bold 22px sans-serif' })\r
        .bind("text", "key")\r
    );\r
\r
diagram2.model = new go.GraphLinksModel([\r
  { key: "Node1" },\r
  { key: "Node2" },\r
  { key: "Node3" },\r
]);\r
\r
let currentDiagram = diagram;\r
\r
// Toggle the Diagram within this div with this button\r
const button2 = document.getElementById('button2');\r
button2.addEventListener('click', () => {\r
  // Set one Diagram.div to null,\r
  // and the other Diagram.div to this div\r
  if (currentDiagram === diagram) {\r
    const div = diagram.div;\r
    diagram.div = null;\r
    diagram2.div = div;\r
    currentDiagram = diagram2;\r
  } else {\r
    const div = diagram2.div;\r
    diagram2.div = null;\r
    diagram.div = div;\r
    currentDiagram = diagram;\r
  }\r
});`,isExecutable:!0,animation:!1,html:`<button id="button2">Toggle Diagram within div</button>`,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.div = null;\r
myDiagram = null; // Assumes this is the only reference to your Diagram`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// Clear any Image references that GoJS is holding onto\r
go.Picture.clearCache();`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1y3z2dt`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};