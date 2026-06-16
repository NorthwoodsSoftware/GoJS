import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Coordinate systems`,category:`Core Concepts`,categoryOrder:9},htmlContent:`<h1>Coordinate systems</h1>\r
\r
<p>\r
  A diagram needs to both store information about itself, and then display it to the user. These needs correspond to the concept of a document and viewport.\r
</p>\r
\r
<p>\r
  The document contains the (document) coordinates of every <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> and is represented by a rectangle that contains all Nodes and Links, plus some padding.\r
  The document's bounds only change when the Diagram content changes.\r
</p>\r
\r
<p>\r
  The viewport is effectively the canvas that we view the document (and thus, diagram) through.\r
  It contains the coordinates of every <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> relative to the top left corner of the canvas.\r
  These coordinates are called viewport coordinates, and a node's viewport coordinates change when a user scrolls or zooms into or out of a diagram.\r
</p>\r
\r
<p>\r
  This example shows the relationship between the document and the viewport. Pan or zoom the\r
  diagram on the right and see the <a href="../api/symbols/Diagram.html#viewportbounds" target="api">Diagram.viewportBounds</a>, represented by the red rectangle, update on the left.\r
  The dashed border represents the <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a>. All coordinates at the top pertain to the diagram on the right.\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  This example does not use Overviews. For a more robust version of this example, see <a href="overview">Overviews</a>.\r
</p>\r
\r
<p>\r
  Here are a few things to try:\r
</p>\r
<ul>\r
  <li>When panning while the viewport is smaller than the document, the viewport cannot leave the document bounds, and vice versa when the viewport is larger.</li>\r
  <li>Zoom in or out very far and move your cursor slowly on the main diagram, and note the differing rates at which the viewport and document coordinates change. This is because zooming alters <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>, meaning that one "pixel" of the document may be represented by several pixels in the viewport, and vice versa.</li>\r
</ul>\r
\r
<p>\r
  This example illustrates a few important points:\r
</p>\r
<ul>\r
  <li>The viewport's (0, 0) is always the top-left of the canvas. The document's (0, 0) is usually close to the top-left-most node, but all sorts of things, like <a href="../api/symbols/Diagram.html#padding" target="api">Diagram.padding</a>, can change that.</li>\r
  <li>The top-left of the viewport is always at <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> in document coordinates. But, the top-left of the document has no special relationship to the viewport. This lends to the idea that the document "owns" the viewport.</li>\r
  <li>Viewport coordinates are determined entirely by your cursor's position, <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a>, and <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>.\r
</ul>\r
\r
<p>\r
  As well as a few less important but still notable points:\r
</p>\r
<ul>\r
  <li>If you align the viewport with the top left of the document bounds, you'll see that the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> is (-5, -5). This is because of the default <a href="../api/symbols/Diagram.html#padding" target="api">Diagram.padding</a>.</li>\r
  <li>Each of these (and all) coordinate systems use <a href="../api/symbols/Point.html" target="api">Point</a>s with increasing values of X going rightwards and of Y going downwards.</li>\r
  <li>The viewport does include the areas occupied by the diagram's scrollbars.\r
    <ul>\r
      <li>To hide scrollbars, set <a href="../api/symbols/Diagram.html#hashorizontalscrollbar" target="api">Diagram.hasHorizontalScrollbar</a> and/or <a href="../api/symbols/Diagram.html#hasverticalscrollbar" target="api">Diagram.hasVerticalScrollbar</a> to false.</li>\r
    </ul>\r
  </li>\r
</ul>\r
\r
<p class="box bg-info">\r
  To "move" a node one must change its <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a> or <a href="../api/symbols/Part.html#location" target="api">Part.location</a> in document coordinates.\r
  To "scroll" a diagram one must change the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a>.\r
  Either way will cause a node to appear at a different point in the viewport.\r
</p>\r
\r
<p>\r
  If you want to easily programmatically convert between these systems, you can use <a href="../api/symbols/Diagram.html#transformdoctoview" target="api">Diagram.transformDocToView</a> and <a href="../api/symbols/Diagram.html#transformviewtodoc" target="api">Diagram.transformViewToDoc</a>. But, most coordinates are in document or <a href="viewport#PanelCoordinates">Panel Coordinates</a>;\r
  <a href="../api/symbols/Panel.html" target="api">Panel</a>s inside <a href="../api/symbols/Part.html" target="api">Part</a>s have their own coordinate systems that their elements use.\r
</p>\r
\r
<h2 id="DocumentBounds"><a class="not-prose heading-anchor" href="#DocumentBounds">Document bounds</a></h2>\r
<p>\r
  In the previous example, the document bounds are represented by a dashed rectangle.\r
</p>\r
<p>\r
  All of the <a href="../api/symbols/Part.html" target="api">Part</a>s of a diagram have positions and sizes (their <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a>) in document coordinates.\r
  The union of all of those parts' actualBounds constitutes the <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a>.\r
  If all of the parts are close together, the document bounds might be small.\r
  If some or all of the parts are far apart from each other, the document bounds might be large,\r
  even if there are only two parts or if there is just one really large part.\r
</p>\r
\r
<p>\r
  The <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a> value is independent of the <a href="../api/symbols/Diagram.html#viewportbounds" target="api">Diagram.viewportBounds</a>.\r
  The former only depends on the bounds of the parts; the latter only depends on the size of the canvas and the diagram's position and scale.\r
</p>\r
\r
<p>\r
  <a href="../api/symbols/Diagram.html#computebounds" target="api">Diagram.computeBounds</a>, which is responsible for the bounds computation,\r
  also adds the <a href="../api/symbols/Diagram.html#padding" target="api">Diagram.padding</a> Margin, so that no Parts appear directly up against the edge of the diagram when scrolled to that side.\r
  You may want to keep some parts, particularly background decorations, from being included in the document bounds computation.\r
  Just set <a href="../api/symbols/Part.html#isindocumentbounds" target="api">Part.isInDocumentBounds</a> to false for such parts.\r
</p>\r
<p>\r
  The diagram does not compute a new value for <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a> immediately\r
  upon any change to any part or the addition or removal of a part.\r
  Thus the <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a> property value may not be up-to-date until after a transaction completes.\r
</p>\r
<p>\r
  The relative sizes of the <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a> and <a href="../api/symbols/Diagram.html#viewportbounds" target="api">Diagram.viewportBounds</a> control whether or not scrollbars are needed.\r
  You can set <a href="../api/symbols/Diagram.html#hashorizontalscrollbar" target="api">Diagram.hasHorizontalScrollbar</a> and/or <a href="../api/symbols/Diagram.html#hasverticalscrollbar" target="api">Diagram.hasVerticalScrollbar</a> to false to make sure no scrollbar appears even when needed.\r
  Or set <a href="../api/symbols/Diagram.html#scrollmode" target="api">Diagram.scrollMode</a> to <a href="../api/symbols/ScrollMode.html#infinite" target="api">ScrollMode.Infinite</a>.\r
</p>\r
<p>\r
  If you do not want the <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a> to always reflect the sizes and locations of all of the nodes and links,\r
  you can set the <a href="../api/symbols/Diagram.html#fixedbounds" target="api">Diagram.fixedBounds</a> property.\r
  However if there are any nodes that are located beyond the fixedBounds, the user may be unable to scroll the diagram to see them.\r
</p>\r
<p>\r
  If you want to be notified whenever the document bounds changes, you can register a "DocumentBoundsChanged" <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listener.\r
</p>\r
\r
<h2 id="ViewportBounds"><a class="not-prose heading-anchor" href="#ViewportBounds">Viewport bounds</a></h2>\r
<p>\r
  In the previous example, the viewport bounds of the right diagram is represented by the red rectangle. The left diagram's viewport bounds is not labeled, but is the entire white rectangle.\r
</p>\r
<p>\r
  The <a href="../api/symbols/Diagram.html#viewportbounds" target="api">Diagram.viewportBounds</a> always has x and y values that are given by <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a>.\r
  It always has width and height values that are computed from the canvas size and the <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>.\r
  In the previous example, you can see the viewportBounds' width and height by hovering your mouse over the bottom-right corner of the viewport (the red rectangle).\r
</p>\r
<p>\r
  Users can scroll the document contents using keyboard commands, scrollbars or panning.\r
  Programmatically, you can scroll using several means:\r
</p>\r
<ul>\r
  <li><code><a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> = Point</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#scrolltorect" target="api">Diagram.scrollToRect</a>(Rect)</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#centerrect" target="api">Diagram.centerRect</a>(Rect)</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#scroll" target="api">Diagram.scroll</a>(unit, dir)</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#aligndocument" target="api">Diagram.alignDocument</a>(documentSpot, viewportSpot)</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#contentalignment" target="api">Diagram.contentAlignment</a> = Spot</code></li>\r
  <li><code><a href="../api/symbols/CommandHandler.html#scrolltopart" target="api">CommandHandler.scrollToPart</a>(part)</code></li>\r
</ul>\r
<p>\r
  Furthermore, scrolling may happen automatically as nodes or links are added to or removed from or change visibility in the diagram.\r
  Also, zooming will typically result in scrolling as well.\r
</p>\r
<p>\r
  When scrolling, the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> normally will be limited to the range specified by the <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a>.\r
  The short or "line" scrolling distance is controlled by <a href="../api/symbols/Diagram.html#scrollhorizontallinechange" target="api">Diagram.scrollHorizontalLineChange</a> and <a href="../api/symbols/Diagram.html#scrollverticallinechange" target="api">Diagram.scrollVerticalLineChange</a>.\r
  The long or "page" scrolling distance is controlled by the size of the viewport.\r
  If you want to control the precise values that the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> may have, you can specify a\r
  <a href="../api/symbols/Diagram.html#positioncomputation" target="api">Diagram.positionComputation</a> function. See the example below.\r
</p>\r
<p>\r
  A user can zoom in or out using keyboard commands, mouse wheel, or pinching.\r
  Programmatically, you can zoom using several means:\r
</p>\r
<ul>\r
  <li><code><a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a> = number</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#zoomtofit" target="api">Diagram.zoomToFit</a>()</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#zoomtorect" target="api">Diagram.zoomToRect</a>(Rect)</code></li>\r
  <li><code><a href="../api/symbols/Diagram.html#autoscale" target="api">Diagram.autoScale</a> = AutoScale</code></li>\r
  <li><code><a href="../api/symbols/CommandHandler.html#decreasezoom" target="api">CommandHandler.decreaseZoom</a>()</code></li>\r
  <li><code><a href="../api/symbols/CommandHandler.html#increasezoom" target="api">CommandHandler.increaseZoom</a>()</code></li>\r
  <li><code><a href="../api/symbols/CommandHandler.html#resetzoom" target="api">CommandHandler.resetZoom</a>()</code></li>\r
  <li><code><a href="../api/symbols/CommandHandler.html#zoomtofit" target="api">CommandHandler.zoomToFit</a>()</code></li>\r
</ul>\r
<p>\r
  When zooming in or out, the <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a> normally will be limited to the range given by <a href="../api/symbols/Diagram.html#minscale" target="api">Diagram.minScale</a> and <a href="../api/symbols/Diagram.html#maxscale" target="api">Diagram.maxScale</a>.\r
  If you want to control the precise values that the <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a> may have, you can specify a <a href="../api/symbols/Diagram.html#scalecomputation" target="api">Diagram.scaleComputation</a> function.\r
  See the example below.\r
</p>\r
<p>\r
  If you want to be notified whenever the viewport bounds changes, you can register a "ViewportBoundsChanged" <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listener.\r
</p>\r
<p>\r
  If you want a Part to always be displayed within the viewport, no matter how the user scrolls or zooms,\r
  you can add them to a Layer that has <a href="../api/symbols/Layer.html#isviewportaligned" target="api">Layer.isViewportAligned</a> set to true, such as the "ViewportBackground" layer.\r
  Such Parts are positioned by the <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> and <a href="../api/symbols/GraphObject.html#alignmentfocus" target="api">GraphObject.alignmentFocus</a> properties\r
  rather than by the <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a> or <a href="../api/symbols/Part.html#location" target="api">Part.location</a> properties.\r
  Read more at <a href="legends#StaticParts">Static Parts</a>.\r
</p>\r
\r
<h2 id="ScrollMargin"><a class="not-prose heading-anchor" href="#ScrollMargin">Scroll margin</a></h2>\r
<p>\r
  <a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a> allows the user to scroll into empty space at the edges of the viewport,\r
  beyond the document bounds (including its <a href="../api/symbols/Diagram.html#padding" target="api">Diagram.padding</a> margin) when it is greater than the viewport bounds.\r
  This can be useful when users need extra space at the edges of a Diagram, for instance to\r
  have an area to create new nodes with the <a href="../api/symbols/ClickCreatingTool.html" target="api">ClickCreatingTool</a>.\r
</p>\r
<p>\r
  <a href="../api/symbols/Diagram.html#padding" target="api">Diagram.padding</a> is added as if part of the document bounds,\r
  whereas <a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a> makes sure you can scroll to empty space beyond the document bounds.\r
  Because of this, <a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a> does not create additional scrollable empty space if none is needed to scroll the margin\r
  distance beyond, such as when the document bounds are very small in the viewport.\r
</p>\r
<p>\r
  Below is a Diagram with <a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a> set to <code>100</code>.\r
  As you drag to the boundary, you will find the additional space created by the margin.\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>This example also uses the <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a> for multiple node templates in one diagram.</p>\r
\r
<h2 id="ScrollingModes"><a class="not-prose heading-anchor" href="#ScrollingModes">Scrolling modes</a></h2>\r
<p>\r
  <a href="../api/symbols/Diagram.html#scrollmode" target="api">Diagram.scrollMode</a> allows the user to either scroll to document bound borders with <a href="../api/symbols/ScrollMode.html#document" target="api">ScrollMode.Document</a> (the default),\r
  or scroll endlessly with <a href="../api/symbols/ScrollMode.html#infinite" target="api">ScrollMode.Infinite</a>.\r
</p>\r
<p>\r
  <a href="../api/symbols/Diagram.html#positioncomputation" target="api">Diagram.positionComputation</a> and <a href="../api/symbols/Diagram.html#scalecomputation" target="api">Diagram.scaleComputation</a> allow you to\r
  determine what positions and scales are acceptable to be scrolled to or zoomed to.\r
  For instance, you could allow only integer position values, or only allow scaling to the values of 0.5, 1, or 2.\r
</p>\r
<p>\r
  The <a href="../samples/scrollModes">Scroll Modes sample</a> displays all the code for the example below,\r
  which lets you toggle these three properties.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>This example uses <a href="../api/symbols/GraphObject.html#bindobject" target="api">GraphObject.bindObject</a> for link colors that are based off their <a href="../api/symbols/Link.html#fromnode" target="api">Link.fromNode</a>.</p>\r
\r
<h2 id="PanelCoordinates"><a class="not-prose heading-anchor" href="#PanelCoordinates">Panel coordinates</a></h2>\r
<p>\r
  A <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> that is not a <a href="../api/symbols/Part.html" target="api">Part</a> but is an element of a <a href="../api/symbols/Panel.html" target="api">Panel</a> has measurements that are in panel coordinates,\r
  not in document coordinates.\r
  That means that <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a>, <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a>, <a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a>, <a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a>,\r
  <a href="../api/symbols/GraphObject.html#measuredbounds" target="api">GraphObject.measuredBounds</a>, <a href="../api/symbols/GraphObject.html#margin" target="api">GraphObject.margin</a>, and <a href="../api/symbols/RowColumnDefinition.html" target="api">RowColumnDefinition</a> properties\r
  apply to all elements of a panel using the same coordinate system.\r
</p>\r
<p>\r
  Some <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> properties use units that have values before they are transformed for use by the containing <a href="../api/symbols/Panel.html" target="api">Panel</a>'s coordinate system.\r
  In particular, <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (which means <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>), <a href="../api/symbols/GraphObject.html#naturalbounds" target="api">GraphObject.naturalBounds</a>,\r
  <a href="../api/symbols/Shape.html#geometry" target="api">Shape.geometry</a>, and <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a> are in "local" coordinates,\r
  before the object is scaled and rotated by the value of <a href="../api/symbols/GraphObject.html#scale" target="api">GraphObject.scale</a> and <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a>.\r
</p>\r
<p>\r
  <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a> will tell you the position and size of an element within its panel.\r
  If you want to get the document position of some object that is within a Node, call <a href="../api/symbols/GraphObject.html#getdocumentpoint" target="api">GraphObject.getDocumentPoint</a>.\r
</p>\r
<p>\r
  For examples of the sizes of elements in a panel, see <a href="sizing">Sizing GraphObjects</a>.\r
</p>\r
\r
<h3 id="NestedPanelCoordinates"><a class="not-prose heading-anchor" href="#NestedPanelCoordinates">Nested Panel coordinates</a></h3>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  The <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> that is "Bottom" has the default <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> of zero, so that the text is drawn upright.\r
  But that TextBlock is an element in the green "Spot" <a href="../api/symbols/Panel.html" target="api">Panel</a> whose <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> to 30,\r
  so it and its text should appear somewhat tilted.\r
  However the blue "Vertical" Panel itself has an <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> of 165.\r
  Because each Panel has its own coordinate system and because transformations on nested elements are compounded,\r
  the effective angle for the green Panel is 195 degrees, the sum of those individual angles (30 + 165), which is nearly upside down.\r
</p>\r
<p>\r
  The <a href="../api/symbols/GraphObject.html#scale" target="api">GraphObject.scale</a> property also affects how an object is sized in its container Panel.\r
  The brown "Position" <a href="../api/symbols/Panel.html" target="api">Panel</a> has a scale of 0.8 relative to its container.\r
  But because the "Vertical" Panel has a scale of 1.5, its effective scale is 1.2 overall, the product of those individual scales (0.8 x 1.5).\r
</p>\r
\r
<h2 id="FurtherReading"><a class="not-prose heading-anchor" href="#FurtherReading">Further reading</a></h2>\r
<ul>\r
  <li><a href="initialView">Initial view</a></li>\r
  <li><a href="overview">Overview diagrams</a></li>\r
  <li><a href="events">Diagram events</a></li>\r
  <li><a href="sizing">Sizing GraphObjects</a></li>\r
  <li><a href="layers">Layers</a></li>\r
</ul>\r
`,codeBlocks:[{id:`viewportOverview`,code:`const mainDiagram = new go.Diagram("mainDiv", {\r
    layout: new go.TreeLayout({ angle: 90, layerSpacing: 30 }),\r
    isReadOnly: true,\r
    allowSelect: false,\r
    initialScale: 2,\r
    initialDocumentSpot: go.Spot.Center,\r
    initialViewportSpot: go.Spot.Center\r
  });\r
\r
  mainDiagram.nodeTemplate =\r
    new go.Node("Auto")\r
      .add(\r
        new go.Shape("RoundedRectangle", { fill: "lightskyblue" })\r
          .bind("strokeWidth"),\r
        new go.TextBlock({ margin: 8 })\r
          .bind("text", "key")\r
      );\r
\r
  mainDiagram.linkTemplate =\r
    new go.Link().add(new go.Shape({ strokeWidth: 1.5, stroke: "#555" }));\r
\r
  const miniDiagram = new go.Diagram("miniDiv", {\r
    isReadOnly: true,\r
    allowSelect: false,\r
    allowZoom: false,\r
    allowHorizontalScroll: false,\r
    allowVerticalScroll: false,\r
    hasHorizontalScrollbar: false,\r
    hasVerticalScrollbar: false,\r
    autoScale: go.AutoScale.Uniform,\r
    padding: 8,\r
    layout: new go.TreeLayout({ angle: 90, layerSpacing: 30 })\r
  });\r
\r
  // Using a spacially identical node template as the main diagram is neccesary for accurate coordinate mapping\r
  miniDiagram.nodeTemplate =\r
    new go.Node("Auto")\r
      .add(\r
        new go.Shape("RoundedRectangle", { fill: "lightskyblue", strokeWidth: 0 }),\r
        new go.TextBlock({ margin: 8 }).bind("text", "key")\r
      );\r
\r
  // Links don't matter for the technical workings\r
  miniDiagram.linkTemplate =\r
    new go.Link().add(new go.Shape({ stroke: "#888", strokeWidth: 0.5 }));\r
\r
  // Both diagrams use the same set of nodes and links\r
  const nodeData = [\r
    { key: "Root"  }, { key: "Alpha" }, { key: "Beta" },\r
    { key: "Gamma" }, { key: "Delta" }, { key: "Epsilon" },\r
    { key: "Zeta"  }, { key: "Eta"   }, { key: "Theta" },\r
    { key: "Iota"  }, { key: "Kappa" }, { key: "Lambda" }\r
  ];\r
  const linkData = [\r
    { from: "Root", to: "Alpha" }, { from: "Root", to: "Beta" }, { from: "Root", to: "Gamma" },\r
    { from: "Alpha", to: "Delta" }, { from: "Alpha", to: "Epsilon" },\r
    { from: "Beta", to: "Zeta" },\r
    { from: "Gamma", to: "Eta" }, { from: "Gamma", to: "Theta" },\r
    { from: "Delta", to: "Iota" },\r
    { from: "Epsilon", to: "Kappa" },\r
    { from: "Eta", to: "Lambda" }\r
  ];\r
\r
  mainDiagram.model = new go.GraphLinksModel(nodeData, linkData);\r
  miniDiagram.model = new go.GraphLinksModel(nodeData, linkData);\r
\r
  // A red rectangle in the mini diagram that mirrors the main diagram's viewport.\r
  // isInDocumentBounds is false so the indicator never affects the mini's autoScale.\r
  const viewportIndicator =\r
    new go.Part({\r
        layerName: "Foreground",\r
        selectable: false,\r
        pickable: false,\r
        isInDocumentBounds: false,\r
        locationSpot: go.Spot.TopLeft\r
      })\r
      .add(\r
        new go.Shape("Rectangle", {\r
          name: "BOX",\r
          fill: "rgba(255, 70, 70, 0.18)",\r
          stroke: "red",\r
          strokeWidth: 1\r
        })\r
      );\r
  miniDiagram.add(viewportIndicator);\r
\r
  const diaPosX = document.getElementById("diaPosX");\r
  const diaPosY = document.getElementById("diaPosY");\r
  const diaScale = document.getElementById("diaScale");\r
  function syncIndicator() {\r
    const b = mainDiagram.viewportBounds;\r
    if (!b.isReal()) return;\r
    viewportIndicator.location = new go.Point(b.x, b.y);\r
    const box = viewportIndicator.findObject("BOX");\r
    box.width = b.width;\r
    box.height = b.height;\r
\r
    const p = mainDiagram.position;\r
    diaPosX.textContent = p.x.toFixed(0);\r
    diaPosY.textContent = p.y.toFixed(0);\r
    diaScale.textContent = mainDiagram.scale.toFixed(2);\r
  }\r
  mainDiagram.addDiagramListener("ViewportBoundsChanged", syncIndicator);\r
  mainDiagram.addDiagramListener("InitialLayoutCompleted", syncIndicator);\r
\r
  function makeDocumentBorder() {\r
    return new go.Part({\r
        layerName: "Background",\r
        selectable: false,\r
        pickable: false,\r
        isInDocumentBounds: false,\r
        locationSpot: go.Spot.TopLeft\r
      })\r
      .add(\r
        new go.Shape("Rectangle", {\r
          name: "BORDER",\r
          fill: null,\r
          stroke: "#2c5aa0",\r
          strokeWidth: 1.5,\r
          strokeDashArray: [5, 3]\r
        })\r
      );\r
  }\r
  const mainBorder = makeDocumentBorder();\r
  const miniBorder = makeDocumentBorder();\r
  mainDiagram.add(mainBorder);\r
  miniDiagram.add(miniBorder);\r
\r
  function syncBorder() {\r
    const b = mainDiagram.documentBounds;\r
    if (!b.isReal()) return;\r
    for (const border of [mainBorder, miniBorder]) {\r
      border.location = new go.Point(b.x, b.y);\r
      const shape = border.findObject("BORDER");\r
      shape.width = b.width;\r
      shape.height = b.height;\r
    }\r
  }\r
  mainDiagram.addDiagramListener("DocumentBoundsChanged", syncBorder);\r
  mainDiagram.addDiagramListener("InitialLayoutCompleted", syncBorder);\r
\r
  // Expose the main diagram so zoom buttons can call their CommandHandler\r
  window.myDiagram = mainDiagram;\r
\r
  // A small dot on the other diagram that corresponds to the user's cursor\r
  function makeHoverMarker() {\r
    return new go.Part({\r
        layerName: "Foreground",\r
        selectable: false,\r
        pickable: false,\r
        isInDocumentBounds: false,\r
        locationSpot: go.Spot.Center,\r
        visible: false\r
      })\r
      .add(\r
        new go.Shape("Circle", {\r
          width: 10, height: 10,\r
          fill: "red", stroke: "white", strokeWidth: 1.5\r
        })\r
      );\r
  }\r
  const mainMarker = makeHoverMarker();\r
  const miniMarker = makeHoverMarker();\r
  mainDiagram.add(mainMarker);\r
  miniDiagram.add(miniMarker);\r
\r
  // Show information above the diagram\r
  const cLabel = document.getElementById("cLabel");\r
  const viewportX = document.getElementById("viewportX");\r
  const viewportY = document.getElementById("viewportY");\r
  const documentX = document.getElementById("documentX");\r
  const documentY = document.getElementById("documentY");\r
  const unscaledX = document.getElementById("unscaledX");\r
  const unscaledY = document.getElementById("unscaledY");\r
  const DASH = "—";\r
\r
  // Remember the last mouse position so we can recompute the readout when the\r
  // viewport changes due to panning/zooming, even if the mouse hasn't moved.\r
  let hoverState = null;  // { diagram, viewX, viewY, label } or null\r
  function updateReadout() {\r
    if (!hoverState) {\r
      cLabel.textContent = DASH;\r
      viewportX.textContent = viewportY.textContent = documentX.textContent = documentY.textContent =\r
        unscaledX.textContent = unscaledY.textContent = DASH;\r
      mainMarker.visible = false;\r
      miniMarker.visible = false;\r
      return;\r
    }\r
    const localViewPt = new go.Point(hoverState.viewX, hoverState.viewY);\r
    const docPt = hoverState.diagram.transformViewToDoc(localViewPt);\r
    // All numbers are reported relative to the main diagram so the legend's math reads end-to-end.\r
    const mainViewPt = mainDiagram.transformDocToView(docPt);\r
    const ux = docPt.x - mainDiagram.position.x;\r
    const uy = docPt.y - mainDiagram.position.y;\r
    cLabel.textContent = hoverState.label;\r
    documentX.textContent = docPt.x.toFixed(0);\r
    documentY.textContent = docPt.y.toFixed(0);\r
    unscaledX.textContent = ux.toFixed(0);\r
    unscaledY.textContent = uy.toFixed(0);\r
    viewportX.textContent = mainViewPt.x.toFixed(0);\r
    viewportY.textContent = mainViewPt.y.toFixed(0);\r
\r
    // Drop the dot onto the OTHER diagram at the same document point.\r
    const otherMarker = hoverState.diagram === mainDiagram ? miniMarker : mainMarker;\r
    const sameMarker  = hoverState.diagram === mainDiagram ? mainMarker : miniMarker;\r
    sameMarker.visible = false;\r
    otherMarker.location = docPt;\r
    otherMarker.visible = true;\r
  }\r
\r
  function trackPointer(d, label) {\r
    d.div.addEventListener("pointermove", (e) => {\r
      const r = d.div.getBoundingClientRect();\r
      hoverState = { diagram: d, viewX: e.clientX - r.left, viewY: e.clientY - r.top, label };\r
      updateReadout();\r
    });\r
    d.div.addEventListener("pointerleave", () => {\r
      hoverState = null;\r
      updateReadout();\r
    });\r
    // While the user pans against an edge, GoJS captures pointermove on window and\r
    // stops propagation, so the DOM listener above goes silent. doMouseMove is still\r
    // called by GoJS for every processed move (including during drag), so we mirror\r
    // the update from there using lastInput.viewPoint (canvas-relative coords).\r
    const origDoMouseMove = d.doMouseMove.bind(d);\r
    d.doMouseMove = function () {\r
      origDoMouseMove();\r
      const vp = d.lastInput && d.lastInput.viewPoint;\r
      if (!vp || isNaN(vp.x) || isNaN(vp.y)) return;\r
      hoverState = { diagram: d, viewX: vp.x, viewY: vp.y, label };\r
      updateReadout();\r
    };\r
  }\r
  trackPointer(mainDiagram, "Main Diagram");\r
  trackPointer(miniDiagram, "Mini Diagram");\r
\r
  // Pan or zoom changes the doc coord under a stationary cursor, so refresh the\r
  // readout on every ViewportBoundsChanged as well.\r
  mainDiagram.addDiagramListener("ViewportBoundsChanged", updateReadout);`,isExecutable:!0,animation:!1,noScaffolding:!0,html:`
<style>
  body.has-html #myDiagramDiv { display: none; }
  body.has-html .extra-html { padding: 8px; }
  .vp-controls { display: flex; align-items: flex-start; gap: 24px; padding-bottom: 8px; font: 11px monospace; }
  .vp-buttons { margin-top: auto; display: flex; gap: 8px; }
  .vp-readout {
    margin-left: auto;
    display: grid;
    grid-template-columns: repeat(9, auto);
    column-gap: 16px;
    row-gap: 2px;
    align-items: baseline;
  }
  .vp-readout-caption { grid-column: 1 / -1; }
  .vp-readout .num { display: inline-block; width: 4ch; text-align: right; }
  .vp-layout { display: flex; gap: 8px; justify-content: center; }
  .vp-readout span:has(.num) { text-align: center }
  /* Selectors are body.has-html-prefixed to override DiagramPreview's
     body.has-html .diagramStyling { flex: 1; height: auto; } rule. */
  body.has-html .vp-main { width: 600px; height: 400px; flex: none; }
  body.has-html .vp-mini { width: 600px; height: 400px; flex: none; }
</style>
<div class="vp-controls">
  <div class="vp-buttons">
    <input type="button" onclick="myDiagram.commandHandler.increaseZoom()" value="Zoom In" />
    <input type="button" onclick="myDiagram.commandHandler.decreaseZoom()" value="Zoom Out" />
  </div>
  <div class="vp-readout">
    <div class="vp-readout-caption">Hovering: <span id="cLabel">—</span></div>
    <span>Document Coordinates</span>
    <span>−</span><span>Diagram.position</span><!-- The first span has fun minus signs. Theres also some EM dashes a few lines down. They are not very human-typable but look substantially better than hyphens. -->
    <span>=</span><span>Viewport Coordinates in Document Space</span>
    <span>x</span><span>Diagram.scale</span>
    <span>=</span><span>Viewport Coordinates</span>

    <span>(<span class="num" id="documentX">—</span>,<span class="num" id="documentY">—</span>)</span>
    <span>−</span><span>(<span class="num" id="diaPosX">0</span>,<span class="num" id="diaPosY">0</span>)</span>
    <span>=</span><span>(<span class="num" id="unscaledX">—</span>,<span class="num" id="unscaledY">—</span>)</span>
    <span>x</span><span><span class="num" id="diaScale">2</span></span>
    <span>=</span><span>(<span class="num" id="viewportX">—</span>,<span class="num" id="viewportY">—</span>)</span>
  </div>
</div>
<div class="vp-layout">
  <div id="miniDiv" class="diagramStyling vp-mini"></div>
  <div id="mainDiv" class="diagramStyling vp-main"></div>
</div>
`,hideCode:!0,minHeight:480,language:`js`,initiallyVisible:!1},{id:`scrollmargin`,code:`diagram.grid =\r
    new go.Panel("Grid")\r
      .add(\r
        new go.Shape("LineH", { stroke: "gray", strokeWidth: 0.25 }),\r
        new go.Shape("LineH", { stroke: "darkslategray", strokeWidth: 1, interval: 10 }),\r
        new go.Shape("LineV", { stroke: "gray", strokeWidth: 0.25 }),\r
        new go.Shape("LineV", { stroke: "darkslategray", strokeWidth: 1, interval: 10 })\r
      );\r
  diagram.scrollMargin = 100;\r
\r
  diagram.nodeTemplateMap.add("wall",\r
    new go.Node("Auto")\r
      .bind("location", "loc", go.Point.parse)\r
      .add(\r
        new go.Shape("Rectangle", {\r
          width: 50, height: 50, strokeWidth: 0\r
        })\r
          .bind("fill", "color")\r
      )\r
  );\r
\r
  diagram.nodeTemplateMap.add("bush",\r
    new go.Node("Vertical")\r
      .bind("location", "loc", go.Point.parse)\r
      .add(\r
        new go.Shape("Rectangle", {\r
          width: 60, height: 96, strokeWidth: 0\r
        })\r
          .bind("fill", "color"),\r
        new go.Shape("Rectangle", {\r
          width: 44, height: 24,\r
          fill: "#888888", strokeWidth: 0\r
        }),\r
        new go.TextBlock({ margin: 4 })\r
          .bind("text", "key")\r
      )\r
  );\r
\r
  const wallShades = [\r
    "#4a6b3d", "#5e7d44", "#6b8a4f",\r
    "#7a9555", "#557240", "#688248"\r
  ];\r
  const walls = [];\r
  for (let row = 0; row < 3; row++) {\r
    for (let col = 0; col < 14; col++) {\r
      walls.push({\r
        category: "wall",\r
        key: \`wall-\${row}-\${col}\`,\r
        loc: \`\${col * 49} \${row * 49}\`,\r
        color: wallShades[(row * 5 + col * 7) % wallShades.length]\r
      });\r
    }\r
  }\r
\r
  const bushes = [\r
    { key: "Redbelly",    color: "#3d5a30" },\r
    { key: "Duckbill",   color: "#5e7d44" },\r
    { key: "Box",    color: "#6b8a4f" },\r
    { key: "Bluefoot", color: "#4a6b3d" },\r
    { key: "Lessergreen",  color: "#5a7d3f" },\r
    { key: "Bush",     color: "#4d6b3e" }\r
  ].map((bush, i) => ({\r
    category: "bush",\r
    loc: \`\${i * 110 + 30} 200\`,\r
    ...bush\r
  }));\r
\r
  diagram.model = new go.GraphLinksModel([...walls, ...bushes]);\r
\r
  window.myDiagram3 = diagram;\r
  const marginSlider = document.getElementById('marginSlider');\r
  const marginValue = document.getElementById('marginValue');\r
  marginSlider.addEventListener('input', e => {\r
    const value = Number(marginSlider.value);\r
    myDiagram3.scrollMargin = value;\r
    marginValue.textContent = value;\r
    const docBounds = myDiagram3.documentBounds;\r
    const viewBounds = myDiagram3.viewportBounds;\r
    const currentPos = myDiagram3.position;\r
    myDiagram3.position = new go.Point(\r
      Math.min(Math.max(currentPos.x, docBounds.x - value), docBounds.right - viewBounds.width + value),\r
      Math.min(Math.max(currentPos.y, docBounds.y - value), docBounds.bottom - viewBounds.height + value)\r
    );\r
  });`,isExecutable:!0,animation:!1,html:`
    <style>
      .centered {
        display: flex;
        align-items: center;
      }
    </style>
    <p>
      <label class="centered"><code>Diagram.scrollMargin</code>&nbsp;:&nbsp;<input id="marginSlider" type="range" min="0" max="300" value="100" /> <span id="marginValue">100</span></label>
    </p>`,language:`js`,initiallyVisible:!1},{id:`scrollmodes`,code:`diagram.scale = 1.5;\r
diagram.minScale = 0.25;\r
diagram.grid =\r
  new go.Panel("Grid")\r
    .add(\r
      new go.Shape("LineH", { stroke: "gray", strokeWidth: 0.1 }),\r
      new go.Shape("LineH", { stroke: "darkslategray", strokeWidth: .25, interval: 10 }),\r
      new go.Shape("LineV", { stroke: "gray", strokeWidth: 0.1 }),\r
      new go.Shape("LineV", { stroke: "darkslategray", strokeWidth: .25, interval: 10 })\r
    );\r
diagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
diagram.undoManager.isEnabled = true;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 1, fill: "#fff6" })\r
        .bind("stroke", "color"),\r
      new go.TextBlock({ margin: 3 })\r
        .bind("text")\r
        .bind("stroke", "color", go.Brush.darken)\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link().add(\r
    new go.Shape()\r
      .bindObject("stroke", "fromNode", n => n.data.color),\r
    new go.Shape({ toArrow: "Triangle", scale: .75 })\r
      .bindObject("stroke", "fromNode", n => n.data.color)\r
      .bindObject("fill", "fromNode", n => n.data.color)\r
  );\r
\r
// create the model data that will be represented by Nodes and Links\r
diagram.model = new go.GraphLinksModel(\r
[\r
  { key: 1, text: "Alpha", color: "lightskyblue" },\r
  { key: 2, text: "Beta",  color: "orange" },\r
  { key: 3, text: "Gamma", color: "lightgreen" },\r
  { key: 4, text: "Delta", color: "pink" }\r
],\r
[\r
  { from: 1, to: 2 },\r
  { from: 1, to: 3 },\r
  { from: 3, to: 4 },\r
  { from: 4, to: 1 }\r
]);\r
\r
// make accessible to the HTML buttons\r
window.myDiagram2 = diagram;\r
function positionfunc(diagram, pos) {\r
  const size = diagram.grid.gridCellSize;\r
  return new go.Point(Math.round(pos.x / size.width) * size.width, Math.round(pos.y / size.height) * size.height);\r
}\r
\r
function scalefunc(diagram, scale) {\r
  const oldscale = diagram.scale;\r
  if (scale > oldscale) {\r
    return oldscale + 0.25;\r
  } else if (scale < oldscale) {\r
    return oldscale - 0.25;\r
  }\r
  return oldscale;\r
}\r
\r
const infscroll = document.getElementById('infscroll');\r
infscroll.addEventListener('change', e => {\r
  myDiagram2.commit(d => {\r
    d.scrollMode = infscroll.checked ? go.ScrollMode.Infinite : go.ScrollMode.Document;\r
  });\r
});\r
\r
const poscomp = document.getElementById('poscomp');\r
poscomp.addEventListener('change', e => {\r
  myDiagram2.commit(d => {\r
    d.positionComputation = poscomp.checked ? positionfunc : null;\r
  });\r
});\r
\r
const scalecomp = document.getElementById('scalecomp');\r
scalecomp.addEventListener('change', e => {\r
  myDiagram2.commit(d => {\r
    d.scaleComputation = scalecomp.checked ? scalefunc : null;\r
  });\r
});`,isExecutable:!0,animation:!1,html:`<p>
  <label><input id="infscroll" type="checkbox" />Enable Infinite Scrolling, setting <code>Diagram.scrollMode</code></label>
</p>
<p>
  <label><input id="poscomp" type="checkbox" />Enable <code>Diagram.positionComputation</code> function</label>
</p>
<p>
  <label><input id="scalecomp" type="checkbox" />Enable <a>Diagram.scaleComputation</a> function</label>
</p>
`,language:`js`,initiallyVisible:!1},{id:`nestedpanelcoords`,code:`// read-only to avoid accidentally moving any Part in document coordinates\r
  diagram.isReadOnly = true;\r
  diagram.allowSelect = false;\r
  diagram.initialPosition = new go.Point(-5, -5);\r
  diagram.initialScale = 0.45;\r
\r
  // data objects for data tables.\r
  function InfoBox(key,gro,loc) {\r
    this.category = "info";\r
    this.key = key;\r
    this.location = go.Point.parse(loc);\r
    this.gro = gro;\r
  }\r
\r
  // alignment properties for TextBlocks in data tables.\r
  function AlignmentObject(column,columnSpan) {\r
    this.column = column;\r
    this.columnSpan = columnSpan;\r
    this.verticalAlignment = go.Spot.Center;\r
    this.textAlign = "center";\r
    this.alignment = go.Spot.Center;\r
    this.height = 28;\r
  }\r
\r
  // creates functions which have limited precision return values.\r
  function prec(conv) { return g => conv(g).toPrecision(3); }\r
\r
  // generates cells in data tables\r
  function dataBlock(conv, alo1, alo2) {\r
    return new go.TextBlock(new AlignmentObject(alo1, alo2))\r
      .bind("text", "gro", prec(conv));\r
  }\r
\r
  const nodeTemplates = new go.Map();\r
\r
  // Template for data tables\r
  nodeTemplates.add("info",\r
    new go.Node("Auto", { padding: 0, scale: 2 })\r
      // Allows location to be set in data object\r
      .bind("location")\r
      .add(\r
        new go.Panel("Table", {\r
            name: "table",\r
            defaultRowSeparatorStroke: "black", defaultColumnSeparatorStroke: "black",\r
            defaultAlignment: go.Spot.Center, background: "white"\r
          })\r
          // sets a different look for the defining row.\r
          .addRowDefinition(0, {\r
            background: "lightgray", separatorStrokeWidth: 0,\r
            separatorPadding: 0, coversSeparators: true,\r
            height: 28\r
          })\r
          // sets a different look for the defining column.\r
          .addColumnDefinition(0, {\r
            coversSeparators: true, separatorStrokeWidth: 0,\r
            separatorPadding: 0, background: "lightgray",\r
            width: 60\r
          })\r
          // necessary to keep weirdness involving the columnSpan of certain elements in the table\r
          // from causing separators to go through elements.\r
          .addColumnDefinition(1, { width: 50, separatorPadding: new go.Margin(2, 6) })\r
          .addColumnDefinition(2, { separatorStroke: "transparent", width: 50, separatorPadding: new go.Margin(2, 6) })\r
          .addColumnDefinition(3, { width: 50, separatorPadding: new go.Margin(2, 6) })\r
          .addColumnDefinition(4, { separatorStroke: "transparent", width: 50, separatorPadding: new go.Margin(2, 6) })\r
          .add(\r
            // defining row\r
            new go.Panel("TableRow", { row: 0 })\r
              .add(\r
                new go.TextBlock("Container", new AlignmentObject(1, 2)),\r
                new go.TextBlock("Diagram", new AlignmentObject(3, 2))\r
              ),\r
\r
            // angle row\r
            new go.Panel("TableRow", { row: 1 })\r
              .add(\r
                new go.TextBlock("angle", { column: 0 }),\r
                // container angle\r
                dataBlock(g => g.angle, 1, 2),\r
                // document angle\r
                dataBlock(g => g.getDocumentAngle(), 3, 2)\r
              ),\r
\r
            // scale row\r
            new go.Panel("TableRow", { row: 2 })\r
              .add(\r
                new go.TextBlock("scale", { column: 0 }),\r
                // container scale\r
                dataBlock(g => g.scale, 1, 2),\r
                // document scale\r
                dataBlock(g => g.getDocumentScale(), 3, 2)\r
              ),\r
\r
            // position row\r
            new go.Panel("TableRow", { row: 3 })\r
              .add(\r
                new go.TextBlock("X Y", { column: 0 }),\r
\r
                // container x and y values\r
                dataBlock(g => g.actualBounds.x, 1, 1),\r
                dataBlock(g => g.actualBounds.y, 2, 1),\r
\r
                // document x and y values\r
                dataBlock(g => g.getDocumentBounds().x, 3, 1),\r
                dataBlock(g => g.getDocumentBounds().y, 4, 1)\r
              ),\r
\r
            // dimension row\r
            new go.Panel("TableRow", { row: 4 })\r
              .add(\r
                new go.TextBlock("size", { column: 0 }),\r
\r
                // container width and height\r
                dataBlock(g => g.actualBounds.width, 1, 1),\r
                dataBlock(g => g.actualBounds.height, 2, 1),\r
\r
                // document width and height\r
                dataBlock(g => g.getDocumentBounds().width, 3, 1),\r
                dataBlock(g => g.getDocumentBounds().height, 4, 1)\r
              )\r
          )\r
      ));\r
\r
\r
  // data object for labels on data tables\r
  function WordBubble(key,width,loc,desc,color) {\r
    this.key = key; this.category = "words"; this.width = width;\r
    this.desc = desc; this.location = go.Point.parse(loc); this.color = color;\r
  }\r
\r
  // template for wordbubble objects\r
  nodeTemplates.add("words",\r
    new go.Node("Auto")\r
      .bind("location")\r
      .add(\r
        new go.TextBlock("", { textAlign: "center", font: "24pt sans-serif" })\r
          .bind("text", "desc")\r
          .bind("stroke", "color")\r
          .bind("width")\r
      ));\r
\r
  // creating the main node's template, adding the nested Panels to it, and adding it to the node template map.\r
  let vertPanel, posPanel, spotPanel, vertLabel, bottomLabel;\r
\r
  vertLabel = new go.TextBlock("Vertical Panel", { font: "bold 12pt sans-serif" });\r
\r
  posPanel =\r
    new go.Panel("Position", {\r
        portId: "posPanel",\r
        angle: 120, scale: 0.8, padding: 50,\r
        background: go.Brush.mix("brown", "lightyellow", 0.4)\r
      })\r
      .add(\r
        new go.Panel("Auto", { position: new go.Point(25, 0), desiredSize: new go.Size(60, 90) })\r
          .add(\r
            new go.Shape("Triangle", { fill: "transparent" }),\r
            new go.TextBlock("This Side Up")\r
          ),\r
        new go.TextBlock("Position Panel", { position: new go.Point(0, 100), font: "bold 12pt sans-serif" })\r
      );\r
\r
  bottomLabel =\r
    new go.TextBlock("Bottom", {\r
      portId: "bottomLabel",\r
      font: "bold 12pt sans-serif",\r
      alignment: go.Spot.Bottom\r
    });\r
\r
  spotPanel =\r
    new go.Panel("Spot", {\r
        portId: "spotPanel",\r
        angle: 30, scale: 1.5,\r
        background: "lightgreen"\r
      })\r
      .add(\r
        new go.Shape("RoundedRectangle", { strokeWidth: 0, desiredSize: new go.Size(50, 100), fill: "transparent" }),\r
        new go.TextBlock("Spot Panel", {\r
          font: "bold 12pt sans-serif",\r
          alignment: go.Spot.Center\r
        }),\r
        new go.TextBlock("Top", {\r
          margin: 5,\r
          font: "bold 12pt sans-serif",\r
          alignment: go.Spot.Top\r
        }),\r
        bottomLabel\r
      );\r
\r
  vertPanel =\r
    new go.Panel("Vertical", {\r
        portId: "vertPanel",\r
        angle: 165, scale: 1.5,\r
        background: "lightskyblue",\r
        padding: 20\r
      })\r
      .add(\r
        vertLabel,\r
        posPanel,\r
        spotPanel\r
      );\r
\r
  const BigNode =\r
    new go.Node("Auto", { location: new go.Point(300, 0) })\r
      .add(vertPanel);\r
  nodeTemplates.add("", BigNode);\r
\r
  diagram.nodeTemplateMap = nodeTemplates;\r
\r
  diagram.linkTemplate =\r
    new go.Link()\r
      .bind("toPortId")\r
      .add(\r
        new go.Shape({ strokeWidth: 5 }),\r
        new go.Shape({ scale: 3, toArrow: "Standard" })\r
      );\r
\r
  diagram.model = new go.GraphLinksModel(\r
  [\r
    {key: "bn"},\r
    // creating infoboxes\r
    new InfoBox(0,vertPanel,"-400 120"),\r
    new InfoBox(1,posPanel,"-400 540"),\r
    new InfoBox(2,spotPanel,"950 540"),\r
    new InfoBox(3,bottomLabel,"950 120"),\r
\r
    // creating wordbubbles (positioned to center over the table below, with padding)\r
    new WordBubble(4,250,"-217 68","Vertical Panel","blue"),\r
    new WordBubble(5,250,"-217 488","Position Panel","red"),\r
    new WordBubble(6,250,"1133 488","Spot Panel","green"),\r
    new WordBubble(7,275,"1120 36","TextBlock aligned at Spot.Bottom","black")\r
  ],\r
  [\r
    // linking each infobox to an item on the main node.\r
    {from: 0, to: "bn", toPortId: "vertPanel"},\r
    {from: 1, to: "bn", toPortId: "posPanel"},\r
    {from: 2, to: "bn", toPortId: "spotPanel"},\r
    {from: 3, to: "bn", toPortId: "bottomLabel"}\r
  ]);`,isExecutable:!0,animation:!1,hideCode:!0,language:`js`,initiallyVisible:!1}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1bc103y`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};