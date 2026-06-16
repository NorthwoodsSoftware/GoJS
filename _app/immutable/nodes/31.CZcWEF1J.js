import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Initial viewport`},htmlContent:`<h1>Initial, programmatic, and automatic viewport management</h1>\r
<p>\r
  When one assigns a <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a> to a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, <a href="../api/symbols/Part.html" target="api">Part</a>s are created and an initial layout is performed.\r
  After this, the <a href="viewport">viewport</a> is moved to its initial location.\r
  Beyond the initial layout, you can programmatically move the viewport, as well as have those programmatic changes be called on specific events automatically.\r
</p>\r
\r
<h2 id="InitialViewport"><a class="not-prose heading-anchor" href="#InitialViewport">Initial viewport</a></h2>\r
<p>\r
  In large diagrams, it is often important to have the initial view be on a specific node, or in a specific area.\r
  The following properties control the initial position of the viewport. They apply <strong>after</strong> the initial layout of a diagram:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#initialposition" target="api">Diagram.initialPosition</a>, which sets <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a></li>\r
  <li><a href="../api/symbols/Diagram.html#initialdocumentspot" target="api">Diagram.initialDocumentSpot</a>, which "marks" the corresponding <a href="../api/symbols/Spot.html" target="api">Spot</a> on the document</li>\r
  <li><a href="../api/symbols/Diagram.html#initialviewportspot" target="api">Diagram.initialViewportSpot</a>, which moves the "marked" position to the given Spot in the viewport</li>\r
  <li><a href="../api/symbols/Diagram.html#initialcontentalignment" target="api">Diagram.initialContentAlignment</a>, which aligns the viewport with something</li>\r
</ul>\r
<p>\r
  These properties control the initial scale of the viewport:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#initialscale" target="api">Diagram.initialScale</a>, which sets <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a></li>\r
  <li><a href="../api/symbols/Diagram.html#initialautoscale" target="api">Diagram.initialAutoScale</a>, which is similar to <code>initialScale</code> but takes an <a href="../api/symbols/AutoScale.html" target="api">AutoScale</a>, allowing for particular behaviors</li>\r
</ul>\r
<p>\r
  For more information on what the viewport and document are, read <a href="viewport">Coordinate Systems</a>.\r
</p>\r
\r
<h3 id="initialdocumentspot-and-initialviewportspot"><a class="not-prose heading-anchor" href="#initialdocumentspot-and-initialviewportspot">initialDocumentSpot and initialViewportSpot</a></h3>\r
\r
<p>\r
  A common use case for <code>initialDocumentSpot</code> and <code>initialViewportSpot</code> is when displaying a large tree graph with a high\r
  initial zoom. The best starting position for this case is typically the highest level Nodes.\r
  The default initial viewport placement usually does this for <a href="layouts#TreeLayout">Tree Layouts</a> with an <code>angle</code> of <code>0</code>,\r
  but other angles cause the initial viewport to be placed far away from the highest level Nodes. For example, for a tree with an <code>angle</code> of <code>180</code>,\r
  this would achieve a similar result:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  This example visualizes how <code>initialDocumentSpot</code> is calculated, and how <code>initialViewportSpot</code> affects the final <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a>.\r
</p>\r
<p>\r
  Changing either dropdown re-aligns the document automatically by calling <a href="../api/symbols/Diagram.html#aligndocument" target="api">Diagram.alignDocument</a> with the new values,\r
  which is equivalent to creating the Diagram with the corresponding <code>initialDocumentSpot</code> and <code>initialViewportSpot</code> values.\r
  Importantly, <a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a> has been increased, which allows the viewport to go much further away from the document than normal.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  When either property is set to <code>None</code>, this example leaves the diagram at its default placement.\r
  Because calling <a href="../api/symbols/Diagram.html#aligndocument" target="api">Diagram.alignDocument</a> with Spots that have <code>NaN</code>s would not produce a meaningful position, we reassign the model to refire the initial layout event.\r
</p>\r
<p>\r
  The snippet below centers the initial viewport on the first Node in <a href="../api/symbols/Diagram.html#nodes" target="api">Diagram.nodes</a>\r
  (it leaves the viewport unchanged if that node is already entirely visible).\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h3 id="initialcontentalignment-and-initialautoscale"><a class="not-prose heading-anchor" href="#initialcontentalignment-and-initialautoscale">initialContentAlignment and initialAutoScale</a></h3>\r
\r
<p>\r
  If instead of picking the best initial viewport for a zoomed-in Diagram, one wants to pick the best initial viewport for a zoomed-out or small Diagram,\r
  <a href="../api/symbols/Diagram.html#initialcontentalignment" target="api">Diagram.initialContentAlignment</a> and <a href="../api/symbols/Diagram.html#initialautoscale" target="api">Diagram.initialAutoScale</a> are usually a better solution.\r
</p>\r
<p>\r
  A simple case is wanting a small Diagram to appear at the top-center of the viewport. To do this, set <code>initialContentAlignment</code> to <a href="../api/symbols/Spot.html#top" target="api">Spot.Top</a>.\r
  Alternatively, a Diagram that is large or small can be zoomed-to-fit by setting <code>initialAutoScale</code> to <a href="../api/symbols/AutoScale.html#uniform" target="api">AutoScale.Uniform</a>.\r
  While you could set both, <code>AutoScale.Uniform</code> would mean that the content is already aligned with some Spot values, causing\r
  <code>initialContentAlignment</code> to appear ignored in some cases.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h3 id="the-initiallayoutcompleted-event"><a class="not-prose heading-anchor" href="#the-initiallayoutcompleted-event">The initialLayoutCompleted event</a></h3>\r
<p>\r
  When defining <code>initialViewportSpot</code>, <code>initialDocumentSpot</code> and most other "initial" properties,\r
  it is important to wait for all Parts to be created and positioned.\r
  This is what the <a href="events#InitialLayoutCompleted">InitialLayoutCompleted Event</a> tracks, and is what GoJS waits for before applying these properties\r
  to their non-initial counterparts.\r
  Because it is an event, it can be listened for like any other event, allowing customizable initial viewport positions.\r
</p>\r
<p>\r
  In this example, after the initial layout we find the <a href="../api/symbols/Node.html" target="api">Node</a> closest to the center of the document and zoom into it.\r
  To show the resultant viewport relative to the Diagram, there is an <a href="overview">Overview</a> in the top-left corner.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  Note: because by default one cannot scroll past any edge of the document plus any <a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a>,\r
  if the selected node happens to be at or near an edge, the node cannot actually be centered in the viewport\r
  unless you set <a href="../api/symbols/Diagram.html#scrollmode" target="api">Diagram.scrollMode</a>, <a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a>, or <a href="../api/symbols/Diagram.html#padding" target="api">Diagram.padding</a>.\r
</p>\r
\r
<h2 id="AutomaticViewportManagement"><a class="not-prose heading-anchor" href="#AutomaticViewportManagement">Automatic viewport management</a></h2>\r
<p>\r
  There are also times when you will want to control the viewport (i.e. the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> and <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>)\r
  after every change to the diagram.\r
  For example, if you always want to keep the document centered after the user has moved or deleted or inserted nodes,\r
  set <a href="../api/symbols/Diagram.html#contentalignment" target="api">Diagram.contentAlignment</a> (rather than <a href="../api/symbols/Diagram.html#initialcontentalignment" target="api">Diagram.initialContentAlignment</a>) to <a href="../api/symbols/Spot.html#center" target="api">Spot.Center</a>.\r
</p>\r
<p>\r
  Or if you always want to keep the document "zoomed-to-fit", set <a href="../api/symbols/Diagram.html#autoscale" target="api">Diagram.autoScale</a> (rather than <a href="../api/symbols/Diagram.html#initialautoscale" target="api">Diagram.initialAutoScale</a>)\r
  to <a href="../api/symbols/AutoScale.html#uniform" target="api">AutoScale.Uniform</a>.\r
  As an example, the <a href="../api/symbols/Overview.html" target="api">Overview</a> diagram does this.\r
</p>\r
\r
<h2 id="ProgrammaticViewportManagement"><a class="not-prose heading-anchor" href="#ProgrammaticViewportManagement">Programmatic viewport management</a></h2>\r
<p>\r
  If you do not want continual repositioning or rescaling of the diagram,\r
  but you do sometimes want to change the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> and/or the <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>,\r
  you can set those properties to whatever values you like.\r
  However, please note that the ultimate value for <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> is normally limited by the <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a>\r
  and the size of the viewport and the scale of the diagram.\r
  The <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a> is limited by <a href="../api/symbols/Diagram.html#minscale" target="api">Diagram.minScale</a> and <a href="../api/symbols/Diagram.html#maxscale" target="api">Diagram.maxScale</a>.\r
</p>\r
<p>\r
  But it is more common to call a method on Diagram to achieve the results that you want.\r
  For example, to get the effect of the <a href="../api/symbols/Diagram.html#initialdocumentspot" target="api">Diagram.initialDocumentSpot</a> and <a href="../api/symbols/Diagram.html#initialviewportspot" target="api">Diagram.initialViewportSpot</a> properties\r
  that are used when the "InitialLayoutCompleted" DiagramEvent occurs, call <a href="../api/symbols/Diagram.html#aligndocument" target="api">Diagram.alignDocument</a> with the two\r
  desired Spots that you want to have coincide.\r
</p>\r
<p>\r
  As already demonstrated above, if you want to try to center a particular node in the viewport,\r
  you can call <a href="../api/symbols/Diagram.html#centerrect" target="api">Diagram.centerRect</a> with the node's <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a>.\r
</p>\r
<p>\r
  If you want to make sure that a particular node is within the viewport, but not necessarily centered, call <a href="../api/symbols/Diagram.html#scrolltorect" target="api">Diagram.scrollToRect</a>.\r
</p>\r
<p>\r
  If you just want to scroll the diagram, in the same manners as the user might via a scrollbar or the mouse wheel,\r
  call <a href="../api/symbols/Diagram.html#scroll" target="api">Diagram.scroll</a> with arguments that specify how much to scroll and in which direction.\r
</p>\r
\r
<p>\r
  The just-mentioned Diagram methods do not change the <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>.\r
  If you want to rescale the diagram so that the whole document bounds are shown, call <a href="../api/symbols/Diagram.html#zoomtofit" target="api">Diagram.zoomToFit</a>.\r
  More generally, if you want a particular area of your diagram to be shown at whatever scale will make it fit in the viewport,\r
  call <a href="../api/symbols/Diagram.html#zoomtorect" target="api">Diagram.zoomToRect</a>.\r
</p>\r
`,codeBlocks:[{id:null,code:`new go.Diagram("myDiagramDiv", {\r
  initialDocumentSpot: go.Spot.Right,\r
  initialViewportSpot: go.Spot.Right\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`collatztree`,code:`const diagram = new go.Diagram("mainDiv", {\r
  layout: new go.TreeLayout({ angle: 180, layerSpacing: 5, nodeSpacing: 5 }),\r
  scrollMargin: 450,\r
});\r
diagram.div.style.background = "#06060f";\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { isShadowed: true, shadowBlur: 12, shadowOffset: new go.Point(0, 0) })\r
    .bind("shadowColor", "depth", depthColor)\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 0, desiredSize: new go.Size(22, 22) })\r
        .bind("fill", "depth", depthColor),\r
      new go.TextBlock({ font: "bold 10px sans-serif", stroke: "#222" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ isShadowed: true, shadowBlur: 5, shadowOffset: new go.Point(0, 0), toEndSegmentLength: 0, fromEndSegmentLength: 0, })\r
    .bindObject("shadowColor", "fromNode", node => depthColor(node.data.depth))\r
    .add(\r
      new go.Shape({ strokeWidth: 1.5 })\r
        .bindObject("stroke", "fromNode", node => depthColor(node.data.depth))\r
    );\r
\r
// Compute the collatz conjecture up to 100\r
let maxDepth = 1;\r
function buildModel() {\r
  const nodeDataArray = [];\r
  const linkDataArray = [];\r
  const queue = [{ key: 1, depth: 0 }];\r
  maxDepth = 0;\r
  while (queue.length > 0) {\r
    const { key, depth } = queue.shift();\r
    nodeDataArray.push({ key, depth });\r
    maxDepth = Math.max(maxDepth, depth);\r
    const predecessors = (key % 6 === 4 && (key - 1) / 3 > 1) ? [2 * key, (key - 1) / 3] : [2 * key];\r
    for (const pred of predecessors) {\r
      if (pred < 100) {\r
        linkDataArray.push({ from: key, to: pred });\r
        queue.push({ key: pred, depth: depth + 1 });\r
      }\r
    }\r
  }\r
  return new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
}\r
\r
function depthColor(depth) {\r
  return \`oklch(0.72 0.19 \${264 - 235 * (depth / maxDepth)})\`;\r
}\r
\r
const overview = new go.Overview("overviewDiv", { observed: diagram });\r
overview.div.style.background = "#06060f";\r
overview.box.elt(0).stroke = "white";\r
\r
// frame the overview on the document plus its scroll margin so it stays put as the viewport moves\r
overview.computeBounds = () => {\r
  const b = diagram.documentBounds;\r
  if (!b.isReal()) return b;\r
  const m = diagram.scrollMargin;\r
  const mScale = .5\r
  return new go.Rect(\r
    b.x - m.left * mScale,\r
    b.y - m.top  * mScale,\r
    b.width  + m.left * mScale + m.right  * mScale,\r
    b.height + m.top  * mScale + m.bottom * mScale\r
  );\r
};\r
\r
const documentBorder =\r
  new go.Part({\r
      layerName: "Background",\r
      isInDocumentBounds: false,\r
      selectable: false, pickable: false,\r
      locationSpot: go.Spot.TopLeft\r
    })\r
    .add(\r
      new go.Shape("Rectangle", {\r
        name: "BORDER", fill: null,\r
        stroke: "#aaaaaa", strokeWidth: 4, strokeDashArray: [8, 6]\r
      })\r
    );\r
overview.add(documentBorder);\r
\r
// Indicator for the current initialDocumentSpot\r
function makeSpotMarker(size) {\r
  return new go.Part({\r
      layerName: "Foreground",\r
      isInDocumentBounds: false,\r
      selectable: false, pickable: false,\r
      locationSpot: go.Spot.Center\r
    })\r
    .add(\r
      new go.Shape("Circle", {\r
        width: size, height: size, fill: "white", stroke: "#06060f", strokeWidth: 2\r
      })\r
    );\r
}\r
const spotMarker = makeSpotMarker(24);\r
overview.add(spotMarker);\r
const mainSpotMarker = makeSpotMarker(12);\r
diagram.add(mainSpotMarker);\r
\r
const documentSpotSelect = document.getElementById("documentSpot");\r
const viewportSpotSelect = document.getElementById("viewportSpot");\r
\r
function syncOverview() {\r
  // Update document border\r
  const b = diagram.documentBounds;\r
  if (!b.isReal()) return;\r
  documentBorder.location = new go.Point(b.x, b.y);\r
  const shape = documentBorder.findObject("BORDER");\r
  shape.width = b.width;\r
  shape.height = b.height;\r
\r
  // Update dots\r
  const ds = documentSpotSelect.value;\r
  spotMarker.visible = mainSpotMarker.visible = ds !== "None";\r
  if (ds === "None") return;\r
  const spot = go.Spot[ds];\r
  const point = new go.Point(b.x + spot.x * b.width + spot.offsetX, b.y + spot.y * b.height + spot.offsetY);\r
  spotMarker.location = point;\r
  mainSpotMarker.location = point;\r
}\r
// align to the chosen spots once a layout finishes; if either spot is None, leave the\r
// diagram at the default placement the initial layout just produced\r
function alignIfSet() {\r
  const ds = documentSpotSelect.value, vs = viewportSpotSelect.value;\r
  if (ds !== "None" && vs !== "None") diagram.alignDocument(go.Spot[ds], go.Spot[vs]);\r
}\r
diagram.addDiagramListener("DocumentBoundsChanged", syncOverview);\r
diagram.addDiagramListener("InitialLayoutCompleted", () => { syncOverview(); alignIfSet(); });\r
\r
// on a dropdown change, just re-align if both spots are set; if either is None, reassign the\r
// model so the initial layout runs again and naturally falls back to the default placement\r
function onSpotChange() {\r
  syncOverview();\r
  const ds = documentSpotSelect.value, vs = viewportSpotSelect.value;\r
  if (ds === "None" || vs === "None") diagram.model = buildModel();\r
  else alignIfSet();\r
}\r
documentSpotSelect.addEventListener("change", onSpotChange);\r
viewportSpotSelect.addEventListener("change", onSpotChange);\r
\r
diagram.model = buildModel();`,isExecutable:!0,animation:!1,noScaffolding:!0,html:`
    <style>
      body.has-html #myDiagramDiv { display: none; }
      .iv-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding-bottom: 8px; font: 13px sans-serif; }
      .iv-layout { display: flex; gap: 8px; justify-content: center; }
      body.has-html .iv-over { width: 360px; height: 380px; flex: 1; }
      body.has-html .iv-main { width: 420px; height: 380px; flex: none; }
    </style>
    <div class="iv-controls">
      <label>initialDocumentSpot:
        <select id="documentSpot">
          <option>None</option>
          <option>TopLeft</option><option>Top</option><option>TopRight</option>
          <option>Left</option><option>Center</option><option selected>Right</option>
          <option>BottomLeft</option><option>Bottom</option><option>BottomRight</option>
        </select>
      </label>
      <label>initialViewportSpot:
        <select id="viewportSpot">
          <option>None</option>
          <option>TopLeft</option><option>Top</option><option>TopRight</option>
          <option>Left</option><option selected>Center</option><option>Right</option>
          <option>BottomLeft</option><option>Bottom</option><option>BottomRight</option>
        </select>
      </label>
    </div>
    <div class="iv-layout">
      <div id="mainDiv" class="diagramStyling iv-main"></div>
      <div id="overviewDiv" class="diagramStyling iv-over"></div>
    </div>`,hideCode:!0,language:`js`,initiallyVisible:!1},{id:null,code:`function update() {\r
  diagram.scrollToRect(diagram.nodes.first().actualBounds);\r
  diagram.scale = 1;\r
}\r
diagram.addDiagramListener("InitialLayoutCompleted", update);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Diagram("myDiagramDiv",\r
  {\r
    initialAutoScale: go.AutoScale.Uniform\r
  })`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`centernode`,code:`const diagram = new go.Diagram("mainDiv", { scrollMargin: 100 });\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#6366F1", strokeWidth: 0 }),\r
      new go.TextBlock({ margin: new go.Margin(9, 16), stroke: "white", font: "13px system-ui" })\r
        .bind("text", "loc", p => p.x.toFixed() + ", " + p.y.toFixed())\r
    );\r
\r
new go.Overview("overDiv", { observed: diagram });\r
\r
function reset() {\r
  const nodeDataArray = [];\r
  for (let i = 0; i < 20; i++) {\r
    nodeDataArray.push({ loc: new go.Point(Math.random() * 600, Math.random() * 300) });\r
  }\r
  diagram.model = new go.GraphLinksModel(nodeDataArray);\r
}\r
document.getElementById("regen").addEventListener("click", reset);\r
\r
// after each layout, zoom into the node nearest the document center\r
diagram.addDiagramListener("InitialLayoutCompleted", e => {\r
  const center = diagram.documentBounds.center;\r
  let node = null, min = Infinity;\r
  diagram.nodes.each(n => {\r
    const dist = n.actualBounds.center.distanceSquaredPoint(center);\r
    if (dist < min) { min = dist; node = n; }\r
  });\r
  diagram.scale = 2;\r
  diagram.centerRect(node.actualBounds);\r
  diagram.select(node);\r
});\r
\r
reset();`,isExecutable:!0,animation:!1,expanded:!0,noScaffolding:!0,html:`
    <style>
      body.has-html #myDiagramDiv { display: none; }
      body.has-html .extra-html { flex: 1; display: flex; flex-direction: column; min-height: 0; }
      .cn-wrap { position: relative; flex: 1; min-height: 0; }
      .cn-main { position: absolute; inset: 0; background: whitesmoke}
      .cn-over { position: absolute; top: 10px; left: 10px; width: 130px; height: 95px;
                 background: white; border: 1px solid #d4d4d8; z-index: 100;
                 box-shadow: 0 2px 8px rgba(0,0,0,0.18); overflow: hidden; }
    </style>
    <div><button id="regen">New layout</button></div>
    <div class="cn-wrap">
      <div id="mainDiv" class="cn-main"></div>
      <div id="overDiv" class="cn-over"></div>
    </div>`,minHeight:440,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`19u2ywb`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};