import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Performance considerations`},htmlContent:`<h1>Performance considerations</h1>\r
\r
<p>\r
  Getting good performance for your diagrams does not require any effort on your part when the diagrams are limited to a few hundreds of nodes and links,\r
  especially on the desktop. However when your app might deal with thousands or tens of thousands of nodes and links, you may need to adapt your implementation\r
  to avoid expensive features.\r
</p>\r
\r
<p>The perceived performance of your diagram depends on many different factors.</p>\r
<ul>\r
  <li>JavaScript code is normally several to many times slower than Java or .NET code on the same hardware platform.</li>\r
  <li>JavaScript code performance varies between different browsers and versions of browsers.</li>\r
  <li>Memory limitations, particularly on mobile devices, affect performance.</li>\r
  <li>There can be a wide variation of drawing performance on different platforms.</li>\r
  <li>Drawing and animation effects take resources.</li>\r
  <li>Complicated nodes or links are slower to build and update and draw than simple ones.</li>\r
  <li>Some layouts are inherently slower than others.</li>\r
</ul>\r
\r
<h2 id="EffectsAndAppearances"><a class="not-prose heading-anchor" href="#EffectsAndAppearances">Effects and appearances</a></h2>\r
<p>\r
  Shadows are relatively expensive to draw, so consider not setting <a href="../api/symbols/Part.html#isshadowed" target="api">Part.isShadowed</a> to true. Gradient <a href="../api/symbols/Brush.html" target="api">Brush</a>es are slower to draw than solid\r
  colors. Complex <a href="../api/symbols/Shape.html" target="api">Shape</a> <a href="../api/symbols/Geometry.html" target="api">Geometry</a>s are slower to draw than simpler ones, and they require more computation when computing intersections.\r
</p>\r
<p>Animation takes up resources; consider setting <a href="../api/symbols/AnimationManager.html#isenabled" target="api">AnimationManager.isEnabled</a> to false.</p>\r
\r
<h2 id="ConstructingAndSizingNodes"><a class="not-prose heading-anchor" href="#ConstructingAndSizingNodes">Constructing and sizing Nodes</a></h2>\r
<p>\r
  Keep your Nodes and Links as simple as you can make it. Limit how many GraphObjects that you use in your templates. Use simpler Panel types when feasible --\r
  the "Table" Panel is the most featureful, but maybe you can just use a "Horizontal" or a "Vertical" or a "Spot" or an "Auto" Panel. A Panel should have two or\r
  more elements in them (although there can be exceptions). If you have no elements in a Panel, delete the panel. If you have only one element in a Panel,\r
  consider removing the panel and merging the element into the panel's containing panel.\r
</p>\r
<p>\r
  Do not include objects in your templates that will never be visible to the user.\r
  This includes objects that are always hidden behind other objects, or objects that always have <code>visible</code> set to <code>false</code>.\r
  If an element on your template is only rarely visible, consider making it its own template in the <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a>.\r
</p>\r
<p>\r
  Limit how many data bindings you use. Avoid <a href="../api/symbols/Binding.html" target="api">Binding</a>s with no source property name and avoid calling <a href="../api/symbols/Binding.html#ofobject" target="api">Binding.ofObject</a>.\r
</p>\r
<p>\r
  If you have a <a href="../api/symbols/Picture.html" target="api">Picture</a> and you know its intended size beforehand, it's best to set its <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and\r
  <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>) so that it does not have to re-measured once the image loads. When nodes change size a <a href="../api/symbols/Layout.html" target="api">Layout</a> might need to be performed\r
  again, so having fixed size nodes helps reduce diagram layouts. In general, setting <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> on the elements of your nodes, especially\r
  <a href="../api/symbols/Picture.html" target="api">Picture</a>s, will speed up how quickly GoJS can measure and arrange the <a href="../api/symbols/Panel.html" target="api">Panel</a>s that form your Nodes or Links.\r
</p>\r
\r
<h2 id="Shapes"><a class="not-prose heading-anchor" href="#Shapes">Shapes</a></h2>\r
<p>\r
  Shapes can decrease memory usage by sharing Geometries. Shapes that both resolve to the same final size and use a <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> of one of the simple cached figures -- such as "Rectangle",\r
  "Square", "Circle", "Ellipse", or "RoundedRectangle" and its variants (like "Border" or "RoundedTopRectangle") will\r
  have their geometries shared automatically. Giving a Shape a set size with either <code>desiredSize</code> or <code>width</code> and <code>height</code> makes all\r
  copies resolve to the same size, so they can all share one geometry.\r
</p>\r
<p>In other words, a single shape in a Node template defined like this:</p>\r
<code> new go.Shape("RoundedRectangle", { width: 50, height: 50 }) </code>\r
<p>Will create a single geometry that is shared among all copies of the Node.</p>\r
\r
<h2 id="Links"><a class="not-prose heading-anchor" href="#Links">Links</a></h2>\r
<p>\r
  The <a href="../api/symbols/Link.html#routing" target="api">Link.routing</a> property value <a href="../api/symbols/Routing.html#avoidsnodes" target="api">Routing.AvoidsNodes</a> can be slow in very large graphs. Consider not using it in performance-minded large graphs,\r
  or setting it only after the initial layout is completed (use "InitialLayoutCompleted" <a href="events#InitialLayoutCompleted">Diagram event listener</a>), or ideally setting\r
  it at that time only on select Links.\r
</p>\r
<p>\r
  Using a <a href="../api/symbols/Link.html#curve" target="api">Link.curve</a> value of either <a href="../api/symbols/Curve.html#jumpover" target="api">Curve.JumpOver</a> or <a href="../api/symbols/Curve.html#jumpgap" target="api">Curve.JumpGap</a> is a lot slower than not having to compute all the points where such\r
  links cross and drawing the small arc or drawing a gap.\r
</p>\r
\r
<h2 id="Layouts"><a class="not-prose heading-anchor" href="#Layouts">Layouts</a></h2>\r
<p><a href="../api/symbols/GridLayout.html" target="api">GridLayout</a> and <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a> and most other layouts are fast.</p>\r
<p>\r
  <a href="../api/symbols/LayeredDigraphLayout.html" target="api">LayeredDigraphLayout</a> can be very slow on graphs with thousands of nodes and links. The documentation of <a href="../api/symbols/LayeredDigraphLayout.html" target="api">LayeredDigraphLayout</a> suggests some\r
  properties that you can set in order to improve performance. Contact us if you continue to have any problems.\r
</p>\r
<p>\r
  <a href="../api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a> can also be slow on large graphs. You can see the <a href="../samples/fdLayout">ForceDirectedLayout Demo</a> to see options\r
  for reducing the work that the Layout needs to do.\r
</p>\r
\r
<h2 id="Overviews"><a class="not-prose heading-anchor" href="#Overviews">Overviews</a></h2>\r
<p>\r
  Overviews generally require drawing a Diagram a second time, so there may be some performance impact on large graphs. Consider setting\r
  <a href="../api/symbols/Overview.html#drawsgrid" target="api">Overview.drawsGrid</a> to <code>false</code> and/or setting <a href="../api/symbols/Overview.html#updatedelay" target="api">Overview.updateDelay</a> to a value of 1 or more (milliseconds).\r
</p>\r
\r
<h2 id="Virtualization"><a class="not-prose heading-anchor" href="#Virtualization">Virtualization</a></h2>\r
<p>\r
  For diagrams with many nodes and links that only display a fraction of them at a time, you could implement some form of virtualization to optimize your\r
  diagram. The <a href="../samples/virtualizedTree">Virtualized Tree sample</a> contains 123,456 total nodes, yet is fairly quick to load and render,\r
  because it only constructs nodes and links that intersect with the viewport.\r
</p>\r
<p>\r
  But this does complicate the implementation of the diagram, because you need to use a separate model from the <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a> and manage adding and\r
  removing Nodes and Links when the viewport changes. Furthermore layout is more complicated because it needs to work on <a href="../api/symbols/LayoutVertex.html" target="api">LayoutVertex</a>es and\r
  <a href="../api/symbols/LayoutEdge.html" target="api">LayoutEdge</a>s, not on <a href="../api/symbols/Node.html" target="api">Node</a>s and <a href="../api/symbols/Link.html" target="api">Link</a>s.\r
</p>\r
<p>Other virtualization samples are listed in the <a href="../samples/#performance">samples index</a>.</p>\r
\r
<h2 id="OtherConsiderations"><a class="not-prose heading-anchor" href="#OtherConsiderations">Other considerations</a></h2>\r
<p>\r
  If you want to disassociate the Diagram from the HTML div element, set <a href="../api/symbols/Diagram.html#div" target="api">Diagram.div</a> to null. If you remove a part of the HTML DOM containing a div with\r
  a Diagram, you will need to set <a href="../api/symbols/Diagram.html#div" target="api">Diagram.div</a> to null in order for the page to garbage collect the memory.\r
</p>\r
<p>\r
  Depending on your app, it may be worthwhile to selectively toggle off some features (like shadows and animation) or to use simpler templates altogether, when\r
  slower environments are present, such as on mobile devices.\r
</p>\r
<p>\r
  You can use multiple templates depending on your zoom level. If you are zoomed out far enough (and therefore have a lot of nodes on the screen) you can switch\r
  to a simplified template so that rendering (when panning, dragging, etc) is faster. The process of switching templates has a performance cost, though, since\r
  Parts have to rebuild themselves.\r
</p>\r
\r
<p>\r
  If you think you have a unique or high node count Diagramming situation that may benefit from other drawing optimizations,\r
  <a href="https://nwoods.com/contact.html">contact support</a>.\r
</p>\r
`,codeBlocks:[],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`3noha0`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};