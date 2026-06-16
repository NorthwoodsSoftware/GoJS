import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Panels`,category:`Building Blocks`,categoryOrder:1},htmlContent:`<h1>Panels</h1>\r
<p>\r
  <a href="../api/symbols/Panel.html" target="api">Panel</a>s are <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s that hold other <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s as their elements.\r
  A Panel is responsible for sizing and positioning all of its elements.\r
  Each Panel establishes its own coordinate system.\r
  The elements of a panel are drawn in order, thereby establishing an implicit Z-ordering of those elements.\r
</p>\r
<p>\r
  Although there is only one Panel class, there are many different kinds of panels, each with its own purpose in how it arranges its elements.\r
  When you construct a <a href="../api/symbols/Panel.html" target="api">Panel</a> you usually specify its <a href="../api/symbols/Panel.html#type" target="api">Panel.type</a> as the constructor argument.\r
  These are the predefined kinds of panels that you can use:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Panel.html#position" target="api">Panel.Position</a>, arranges elements by their <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a></li>\r
  <li><a href="../api/symbols/Panel.html#vertical" target="api">Panel.Vertical</a>, arranges elements in a vertical stack</li>\r
  <li><a href="../api/symbols/Panel.html#horizontal" target="api">Panel.Horizontal</a>, arranges elements in a horizontal row</li>\r
  <li><a href="../api/symbols/Panel.html#auto" target="api">Panel.Auto</a>, arranges the main element around all of the other elements, for a border</li>\r
  <li><a href="../api/symbols/Panel.html#spot" target="api">Panel.Spot</a>, arranges elements according to their <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a></li>\r
  <li><a href="../api/symbols/Panel.html#table" target="api">Panel.Table</a> (see the section about <a href="tablePanels">Table Panels</a>)</li>\r
  <li><a href="../api/symbols/Panel.html#viewbox" target="api">Panel.Viewbox</a>, scales its one element to fit inside the panel</li>\r
  <li><a href="../api/symbols/Panel.html#link" target="api">Panel.Link</a> (see the section about <a href="linkLabels">Link Labels</a>)</li>\r
  <li><a href="../api/symbols/Panel.html#grid" target="api">Panel.Grid</a> (see the section about <a href="grids">Grid Patterns</a>)</li>\r
  <li><a href="../api/symbols/Panel.html#graduated" target="api">Panel.Graduated</a> (see the section about <a href="graduatedPanels">Graduated Panels</a>)</li>\r
</ul>\r
<p>\r
  In most of these simplistic demonstrations, the code programmatically creates a <a href="../api/symbols/Node.html" target="api">Node</a> and adds it to the Diagram.\r
  Once you learn about models and data binding, which are demonstrated in a few multi-example cases, you will generally\r
  not create Nodes programmatically.\r
</p>\r
<p>\r
  Note also that one can only add <a href="../api/symbols/Part.html" target="api">Part</a>s (i.e. <a href="../api/symbols/Node.html" target="api">Node</a>s and <a href="../api/symbols/Link.html" target="api">Link</a>s) to <a href="../api/symbols/Diagram.html" target="api">Diagram</a>s,\r
  and that a Part cannot be an element of a Panel.\r
  Additionally, all Parts, and thus Nodes, are Panels because the <a href="../api/symbols/Part.html" target="api">Part</a> class inherits from <a href="../api/symbols/Panel.html" target="api">Panel</a> -- we are basically using Nodes as "top-level" Panels.\r
</p>\r
<p>\r
  Panels have no visual elements of their own, so to display their size the <a href="../api/symbols/GraphObject.html#background" target="api">GraphObject.background</a> is often used.\r
  Panels also have <a href="../api/symbols/Panel.html#padding" target="api">Panel.padding</a> in addition to <a href="../api/symbols/GraphObject.html#margin" target="api">GraphObject.margin</a>.\r
  The background brush covers the padding area, but does not cover the margin area.\r
  Setting a padding when the Panel is constrained in size will reduce the total area that it has to arrange its elements.\r
  Setting a margin will not do this -- instead the Panel will expand in size.\r
</p>\r
\r
<h2 id="PositionPanels"><a class="not-prose heading-anchor" href="#PositionPanels">Position Panels</a></h2>\r
<p>\r
  The simplest kind of <a href="../api/symbols/Panel.html" target="api">Panel</a> is "Position" (<a href="../api/symbols/Panel.html#position" target="api">Panel.Position</a>). Each element gets its normal size, whether its natural size or a specified\r
  <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (or equivalently the <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>).\r
</p>\r
<p>\r
  Each element's position is given by the <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a> property. If no position is specified, the element is positioned at (0,0). All positions\r
  are in the Panel's own coordinate system, not in the document-wide coordinate system. Positions may include negative coordinates.\r
</p>\r
<p>\r
  The Panel's size is just big enough to hold all of its elements. If you want it to be a bit bigger than that, you can set the <a href="../api/symbols/Panel.html#padding" target="api">Panel.padding</a> property.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  A Position Panel will always include the (0,0) origin point in its own panel coordinate system. Thus a Position Panel that has elements whose collective\r
  bounds does not include (0,0) is always extended to include the origin.\r
</p>\r
\r
<p>\r
  Note that when you position <a href="../api/symbols/Shape.html" target="api">Shape</a>s within a Position Panel the thickness of their strokes, <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a>, will be included. If you wish to\r
  position multiple Shapes so that their geometries line up with each other, independent of how thick their strokes are, set\r
  <a href="../api/symbols/Shape.html#isgeometrypositioned" target="api">Shape.isGeometryPositioned</a> to true on each of those Shapes. The following two position panels stretch to fit the origin and demonstrate\r
  this property using colored circles with a translucent gray stroke. Notice how the panel on the right aligns the circles to the left side of their strokes and not the\r
  colored circles themselves:\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="VerticalPanels"><a class="not-prose heading-anchor" href="#VerticalPanels">Vertical Panels</a></h2>\r
<p>\r
  A very common kind of <a href="../api/symbols/Panel.html" target="api">Panel</a> is "Vertical" (<a href="../api/symbols/Panel.html#vertical" target="api">Panel.Vertical</a>). In this Panel all of the panel elements are arranged vertically from top to bottom.\r
  Each element gets its normal height and either its normal width or, if stretched, the width of the panel. If the element's <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> property\r
  has any vertical stretch component, it is ignored.\r
</p>\r
<p>\r
  If the element's width does not happen to be the same as the width of the panel, it is aligned horizontally according to its\r
  <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> property.\r
</p>\r
<p>\r
  The following Vertical Panel shows how narrow objects are aligned horizontally and how a narrow object may be stretched horizontally. The width of the whole\r
  Panel is determined by the width of the widest object, which in this case is the first element. Note how the last element does not set the desired\r
  <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> property, so that the <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> value is effective.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="ConstrainedWidthVerticalPanels"><a class="not-prose heading-anchor" href="#ConstrainedWidthVerticalPanels">Constrained width Vertical Panels</a></h2>\r
<p>\r
  A Vertical <a href="../api/symbols/Panel.html" target="api">Panel</a> normally has the width of its widest element and the height that is the sum of all of its elements. However, you can also set the\r
  width and/or height to be larger or smaller than the natural size. Or if there is a Panel containing this panel, it might impose size constraints on this\r
  panel. If the width and/or height are larger than the natural size, the panel is bigger, leaving empty space that may be filled with the background brush. If\r
  the width and/or height are smaller than the natural size, the content elements may be clipped.\r
</p>\r
<p>The sample below contains a simple Vertical Panel <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a> with data bindings for width and height, as well as location to position them in the diagram\r
  (see the section on <a href="dataBinding">Data Binding</a>).\r
  The first node sets the width to be 140, much wider than needed. You can see how the last element's width is stretched.</p>\r
<p>\r
  The next two nodes both have a width of 50, much less than natural. The latter one also has a restricted height. Note how the text is automatically\r
  wrapped to try to fit within the limited width, because the default value for <a href="../api/symbols/TextBlock.html#wrap" target="api">TextBlock.wrap</a> is to allow wrapping.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  Here is a Vertical Panel with a default <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> of <a href="../api/symbols/Stretch.html#horizontal" target="api">Stretch.Horizontal</a>. Because no width is specified for the whole panel, its width\r
  is the width of the widest element, in this case the second one. Note how all of the <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s have the same long width, as highlighted by the\r
  white backgrounds. However the last TextBlock has a limited width, so it is not stretched. One can limit the width but not the height by supplying a\r
  value of <code>NaN</code> or <code>Infinity</code> for the height.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  If you change that sample to set the <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> or <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>.width on one or more of the elements (just the last one in\r
  this case), the panel will get a width that is equal to the maximum of the set widths. The reduced width will cause the other, stretched, elements to be\r
  measured with the limited width (50 in this case), which cause those <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s to wrap to fit within the available width.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<h2 id="HorizontalPanels"><a class="not-prose heading-anchor" href="#HorizontalPanels">Horizontal Panels</a></h2>\r
<p>\r
  Horizontal <a href="../api/symbols/Panel.html" target="api">Panel</a>s are just like Vertical Panels, except that the elements are arranged horizontally instead of vertically. Elements are never stretched\r
  horizontally, but they may be stretched vertically. Because elements are never stretched horizontally, a stretch value of <a href="../api/symbols/Stretch.html#fill" target="api">Stretch.Fill</a> is the same as\r
  <a href="../api/symbols/Stretch.html#vertical" target="api">Stretch.Vertical</a>.\r
</p>\r
<p>\r
  Note that the last element in both panels do not specify a desired <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>, so that the <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> value may be effective.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<h3 id="FillingHorizontalAndVerticalPanelsInOppositeDirection"><a class="not-prose heading-anchor" href="#FillingHorizontalAndVerticalPanelsInOppositeDirection">Filling Horizontal and Vertical Panels in opposite directions</a></h3>\r
<p>\r
  Both Vertical and Horizontal <a href="../api/symbols/Panel.html" target="api">Panel</a>s can have their elements be arranged in the opposite direction: bottom-to-top for Vertical Panels and right-to-left\r
  for Horizontal Panels. Just set <a href="../api/symbols/Panel.html#isopposite" target="api">Panel.isOpposite</a> to true.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
<h2 id="DefaultAlignmentAndStretch"><a class="not-prose heading-anchor" href="#DefaultAlignmentAndStretch">Default Alignment and Stretch</a></h2>\r
<p>\r
  Both Vertical and Horizontal <a href="../api/symbols/Panel.html" target="api">Panel</a>s support the <a href="../api/symbols/Panel.html#defaultalignment" target="api">Panel.defaultAlignment</a> and <a href="../api/symbols/Panel.html#defaultstretch" target="api">Panel.defaultStretch</a> properties. This is a convenience so that\r
  you do not need to set the <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> or <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> property on each element.\r
</p>\r
<p>\r
  Here is a Horizontal Panel with a default <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> of <a href="../api/symbols/Spot.html#bottom" target="api">Spot.Bottom</a>. All of the <a href="../api/symbols/Shape.html" target="api">Shape</a>s are aligned at the bottom, even though\r
  the default alignment would normally be <a href="../api/symbols/Spot.html#center" target="api">Spot.Center</a>. However, the last Shape has its height stretched to the full height of the panel, 90. In this case\r
  the <a href="../api/symbols/GraphObject.html#margin" target="api">GraphObject.margin</a> provides a little extra space around the object.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  Vertical and Horizontal Panels are relatively simple ways of arranging a column or a row of objects. For more options, you may need to use a\r
  <a href="tablePanels">Table Panel</a>, even with the same set of objects. This is especially true when you want more control over the stretching of one\r
  or more elements.\r
</p>\r
\r
<h2 id="Spots"><a class="not-prose heading-anchor" href="#Spots">Spots</a></h2>\r
<p>\r
  Before we discuss other kinds of <a href="../api/symbols/Panel.html" target="api">Panel</a>s, we should elaborate a bit about the concept of spots.\r
  <a href="../api/symbols/Spot.html" target="api">Spot</a>s are a way of providing both relative and absolute positioning information.\r
</p>\r
\r
<p>\r
  You have already seen many of the most common uses of Spots, for specifying the alignment of objects within a panel,\r
  as constant values of the <a href="../api/symbols/Spot.html" target="api">Spot</a> class:\r
</p>\r
<table>\r
  <tr>\r
    <td class="pb-6"><a href="../api/symbols/Spot.html#topleft" target="api">Spot.TopLeft</a></td>\r
    <td class="px-12 pb-6 text-center"><a href="../api/symbols/Spot.html#top" target="api">Spot.Top</a></td>\r
    <td class="pl-6 pb-6 text-right"><a href="../api/symbols/Spot.html#topright" target="api">Spot.TopRight</a></td>\r
  </tr>\r
  <tr>\r
    <td class="py-3"><a href="../api/symbols/Spot.html#left" target="api">Spot.Left</a></td>\r
    <td class="px-12 py-3 text-center"><a href="../api/symbols/Spot.html#center" target="api">Spot.Center</a></td>\r
    <td class="pl-6 py-3 text-right"><a href="../api/symbols/Spot.html#right" target="api">Spot.Right</a></td>\r
  </tr>\r
  <tr>\r
    <td class="pt-6"><a href="../api/symbols/Spot.html#bottomleft" target="api">Spot.BottomLeft</a></td>\r
    <td class="px-12 pt-6 text-center"><a href="../api/symbols/Spot.html#bottom" target="api">Spot.Bottom</a></td>\r
    <td class="pl-6 pt-6 text-right"><a href="../api/symbols/Spot.html#bottomright" target="api">Spot.BottomRight</a></td>\r
  </tr>\r
</table>\r
<p></p>\r
<p>\r
  But Spots are more general than that. The <a href="../api/symbols/Spot.html#x" target="api">Spot.x</a> and <a href="../api/symbols/Spot.html#y" target="api">Spot.y</a> properties can be any number between zero and one, inclusive. Those values are the\r
  fractional distances along the X and Y axes from the top-left corner of an arbitrary rectangle. So <a href="../api/symbols/Spot.html#topleft" target="api">Spot.TopLeft</a> is the same as new go.Spot(0, 0),\r
  <a href="../api/symbols/Spot.html#bottomright" target="api">Spot.BottomRight</a> is the same as new go.Spot(1, 1), and <a href="../api/symbols/Spot.html#right" target="api">Spot.Right</a> is the same as new go.Spot(1, 0.5).\r
</p>\r
\r
<p>Here are the standard nine Spots shown on a rectangular shape.</p>\r
<!-- CODE_BLOCK_9 -->\r
\r
<p>\r
  Besides the fractional positioning of a spot relative to some rectangular area, you can also specify an absolute offset. The <a href="../api/symbols/Spot.html#offsetx" target="api">Spot.offsetX</a> and\r
  <a href="../api/symbols/Spot.html#offsety" target="api">Spot.offsetY</a> properties determine a point that is a distance from the fractional point given by <a href="../api/symbols/Spot.html#x" target="api">Spot.x</a> and <a href="../api/symbols/Spot.html#y" target="api">Spot.y</a>. Here we show three\r
  TextBlocks near the bottom-left corner and three TextBlocks near the bottom-right corner. The ones on the left are offset along the X-axis plus or minus 40\r
  units; the ones on the right are offset along the Y-axis plus or minus 20 units.\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
\r
<h2 id="AutoPanels"><a class="not-prose heading-anchor" href="#AutoPanels">Auto Panels</a></h2>\r
<p>\r
  Auto <a href="../api/symbols/Panel.html" target="api">Panel</a>s fit a "main" element just around the other elements of the panel. The main element is usually the furthest back in the Z-order, i.e. the\r
  first element, so that the other elements are not obscured by it. The main element is declared by setting <a href="../api/symbols/GraphObject.html#ispanelmain" target="api">GraphObject.isPanelMain</a> to true; but often no\r
  such element is present, so it uses the very first element of the panel.\r
</p>\r
<p>\r
  Typically the Auto Panel will measure the non-"main" elements, determine a width and a height that can enclose all of them, and make the "main" element that\r
  size or slightly bigger. You do <em>not</em> set the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> or <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>) of the "main"\r
  element.\r
</p>\r
<p>\r
  An Auto Panel is the normal way to implement a border around an object. Use a <a href="../api/symbols/Shape.html" target="api">Shape</a> as the first/"main" element -- it becomes the border. The\r
  <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> is normally "Rectangle" or "RoundedRectangle" or "Ellipse", as shown below. The other elements become the "content" for the panel inside\r
  the border. In the examples below there is only a single "content" element, a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>. We have set the <a href="../api/symbols/GraphObject.html#background" target="api">GraphObject.background</a> and\r
  <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> properties to help show the sizes and positions of objects.\r
</p>\r
<p>\r
  Adding a <a href="../api/symbols/GraphObject.html#margin" target="api">GraphObject.margin</a> to the <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> in each of the same three panels adds a little space around the "content" element\r
  inside the "main" element.  In this example, that means more blue area around the text, as demonstrated on the bottom row.\r
</p>\r
<p>Auto Panels should have two or more elements in them.</p>\r
<!-- CODE_BLOCK_11 -->\r
\r
<p>\r
  For most <a href="../api/symbols/Shape.html" target="api">Shape</a>s other than the "Rectangle" figure we do not want to have the "main" shape be the same size as the "content" element.\r
  Ellipses, for example, need to be significantly larger than the content to avoid having the content corners spill over the edge of the shape.\r
  This can be controlled by setting the <a href="../api/symbols/Shape.html#spot1" target="api">Shape.spot1</a> and <a href="../api/symbols/Shape.html#spot2" target="api">Shape.spot2</a> properties, which determine the area where the content should go.\r
  Many of the predefined figures have their own default values for spot1 and spot2.\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
<p>\r
  The spot1 and spot2 properties on the main <a href="../api/symbols/Shape.html" target="api">Shape</a> are more general and more flexible than specifying the <a href="../api/symbols/GraphObject.html#margin" target="api">GraphObject.margin</a> on the content\r
  element(s).\r
</p>\r
\r
<h2 id="ConstrainedSizeAutoPanels"><a class="not-prose heading-anchor" href="#ConstrainedSizeAutoPanels">Constrained size Auto Panels</a></h2>\r
<p>\r
  If you constrain the size of the whole panel, there may be less or more space available to fit all of the "content" elements inside the "main" element. If an\r
  element has a size that won't fit in the available area, it will be clipped. That also applies to the main element -- you normally should not set its\r
  <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> or <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>, because that will cause it too to be clipped (if too big) or to not\r
  act as a proper border around the other elements of the panel (if too small).\r
</p>\r
<p>\r
  In the following example each Node has a total size of 60x60, causing the "content" <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s to be limited in width and height, less than the natural\r
  width, which results in wrapping of the text. However there may not be enough height available to show the whole content element(s), causing them to be\r
  clipped. You can see that in the third Node the text is clipped, because there is less available area within an ellipse than within a rectangle.\r
  Generally, it is best to use a Spot panel if you want to set a desired size (see the section below).\r
</p>\r
<!-- CODE_BLOCK_13 -->\r
<p>\r
  You should not set the size (<a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> or <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>) of the "main" element of an Auto Panel.\r
</p>\r
\r
<h2 id="SpotPanels"><a class="not-prose heading-anchor" href="#SpotPanels">Spot Panels</a></h2>\r
<p>\r
  Spot <a href="../api/symbols/Panel.html" target="api">Panel</a>s are like Auto Panels in that there is a "main" element and there are "other" elements that are not resized.\r
  The "other" elements are positioned about the "main" element based on the <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> property that has a <a href="../api/symbols/Spot.html" target="api">Spot</a> value.\r
  The main feature of Spot Panels, unlike Auto Panels, is that those elements may extend beyond the bounds of the "main" element.\r
</p>\r
<p>\r
  The following sample will show how Spot Panels align their content.\r
  A Spot Panel aligns its content elements in the general location given by its <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a>.\r
  The precise point in the content element that is positioned defaults to <a href="../api/symbols/Spot.html#center" target="api">Spot.Center</a>, as seen in the top node.\r
  Note in this example that the TextBlocks are centered at the four corners, causing the panel to be larger than the main shape,\r
  as can be seen with the lightblue background.\r
  You can also set the element's <a href="../api/symbols/GraphObject.html#alignmentfocus" target="api">GraphObject.alignmentFocus</a> to use a different spot.\r
  For example, if you use the same alignmentFocus as the alignment, the elements will be just inside the main element's bounds, as in the middle node.\r
  If you use the opposite alignmentFocus as the alignment, the elements will be just outside the main element's bounds, as demonstrated in the bottom node.\r
</p>\r
<p>Spot Panels should have two or more elements in them.</p>\r
<!-- CODE_BLOCK_14 -->\r
\r
<p>alignmentFocus offsetX/Y will also work to offset the alignmentFocus point, the same way it works for Link labels:</p>\r
<!-- CODE_BLOCK_15 -->\r
\r
<h3 id="AligningSubElementsSpotPanels"><a class="not-prose heading-anchor" href="#AligningSubElementsSpotPanels">Aligning to sub-elements with Spot Panels</a></h3>\r
<p>\r
  You may find it necessary to align an object nested inside a Spot panel with that panel's main element.\r
  This is often the case when you want an element of a Spot panel to appear to have its own text label or other decorator.\r
</p>\r
<p>\r
  To do this, you can use <a href="../api/symbols/Panel.html#alignmentfocusname" target="api">Panel.alignmentFocusName</a>.\r
  In the example below, a Spot panel contains a main element and another Panel.\r
  We want to align the corners of the main element the shape within this panel,\r
  so we give it a name and set <a href="../api/symbols/Panel.html#alignmentfocusname" target="api">Panel.alignmentFocusName</a> on the panel.\r
</p>\r
\r
<!-- CODE_BLOCK_16 -->\r
\r
<h3 id="StretchingWithSpotPanels"><a class="not-prose heading-anchor" href="#StretchingWithSpotPanels">Stretching with Spot Panels</a></h3>\r
<p>\r
  When a non-main element in a Spot panel stretches, it takes on the width and/or height of the main element.\r
  This can be useful for aligning elements within the Panel.\r
</p>\r
<p>\r
  In the example below, the red main element has three elements around it which stretch to its side's length.\r
  The main element is the Node's inherited <a href="../api/symbols/Part.html#resizeobject" target="api">Part.resizeObject</a>, and as it changes size the stretched elements will change size accordingly.\r
</p>\r
<!-- CODE_BLOCK_17 -->\r
\r
<h3 id="ConstrainingSizeWithSpotPanels"><a class="not-prose heading-anchor" href="#ConstrainingSizeWithSpotPanels">Constraining size with Spot Panels</a></h3>\r
\r
<p>\r
  If you constrain the size of the whole panel, the panel may clip its elements.\r
  For example, when the whole panel must be 100x50, there is room horizontally\r
  but not vertically for the main element plus all of its other elements after arranging them.\r
  Notice in the example below that, when this fixed size is applied, the bottom left and bottom right\r
  squares are clipped vertically by the panel, but there is excess space horizontally.\r
</p>\r
<!-- CODE_BLOCK_18 -->\r
\r
<h3 id="ConstrainingSizeWithSpotPanels"><a class="not-prose heading-anchor" href="#ConstrainingSizeWithSpotPanels">Order of the main element</a></h3>\r
\r
<p>\r
  Remember that the elements of every panel are drawn in order.\r
  Normally you want the main element to be behind all of the other elements, so the main element will come first.\r
  However if you want the main element to be in front of some or all of the other elements,\r
  you can move the main element not to be the first element of the panel,\r
  if you also set its <a href="../api/symbols/GraphObject.html#ispanelmain" target="api">GraphObject.isPanelMain</a> property to true.\r
</p>\r
<!-- CODE_BLOCK_19 -->\r
<p>\r
  Note how the opaque Shape, explicitly declared to be the main element, is now visually in front of the\r
  non-main elements of the Spot Panel because it has been moved to be the last element in the panel.\r
</p>\r
<p>\r
  Without setting <a href="../api/symbols/GraphObject.html#ispanelmain" target="api">GraphObject.isPanelMain</a> to true on the desired main element,\r
  in this example <a href="../api/symbols/Panel.html#findmainelement" target="api">Panel.findMainElement</a> would return the first TextBlock.\r
  This would cause all of the other elements to be arranged around that TextBlock.\r
  Since the TextBlock is small and the rectangular Shape is big and opaque,\r
  the Shape would cover all of the other TextBlocks, so the user might not see any text,\r
  depending on the size and alignment of those other TextBlocks.\r
</p>\r
\r
<h3 id="ClippingWithSpotPanels"><a class="not-prose heading-anchor" href="#ClippingWithSpotPanels">Clipping with Spot Panels</a></h3>\r
<p>\r
  Spot Panels can set <a href="../api/symbols/Panel.html#isclipping" target="api">Panel.isClipping</a> to true to use the main Panel element as a clipping area instead of a drawn Shape.\r
  If used, the main element must be a Shape and its stroke and fill will not be drawn.\r
  When <a href="../api/symbols/Panel.html#isclipping" target="api">Panel.isClipping</a> is true, the Spot panel will size itself to be the <strong>intersection</strong> of the\r
  main element bounds and all other elements' bounds, rather than the union of these bounds.\r
</p>\r
<p>The following example shows the same Spot Panel containing a main circle Shape element and an image, first without clipping,\r
  then with clipping, and finally with clipping and surrounded in an outer panel:</p>\r
\r
<!-- CODE_BLOCK_20 -->\r
\r
<h2 id="ViewboxPanels"><a class="not-prose heading-anchor" href="#ViewboxPanels">Viewbox Panels</a></h2>\r
<p>\r
  Viewbox <a href="../api/symbols/Panel.html" target="api">Panel</a>s contain only a single element that is rescaled to fit the size of the Panel.\r
</p>\r
<p>\r
  This is useful for taking an arbitrary element, especially a <a href="../api/symbols/Panel.html" target="api">Panel</a>,\r
  and automatically squeezing it to fit in a small fixed-size area.\r
  The same can be achieved by setting the <a href="../api/symbols/GraphObject.html#scale" target="api">GraphObject.scale</a> on that element,\r
  but with a Viewbox Panel that computation is performed automatically.\r
</p>\r
<p>\r
  In this diagram there are two copies of the same Auto <a href="../api/symbols/Panel.html" target="api">Panel</a>, each consisting of a <a href="../api/symbols/Picture.html" target="api">Picture</a> and\r
  a caption <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> surrounded by an Ellipse <a href="../api/symbols/Shape.html" target="api">Shape</a>.\r
  The one on the left is inside a Viewbox <a href="../api/symbols/Panel.html" target="api">Panel</a> forced to fit in an 80x80 area; the one on the right is its natural size.\r
  Note that you can still see all of the elements of the panel at a reduced scale so that it can fit inside the Viewbox panel.\r
  But because the nested panel is taller than it is wider, there is empty space on the sides of the 80x80 Viewbox.\r
</p>\r
<!-- CODE_BLOCK_21 -->\r
`,codeBlocks:[{id:`positionPanels`,code:`diagram.add(\r
  // all Nodes are Panels\r
  new go.Node(go.Panel.Position,  // or "Position"\r
      { background: "white", isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      new go.TextBlock("(0,0)", { background: "lightgreen" }),\r
        // Default position is (0, 0), marked in light green\r
      new go.TextBlock("(100, 0)", { position: new go.Point(100, 0) }),\r
      new go.TextBlock("(0, 100)", { position: new go.Point(0, 100) }),\r
      new go.TextBlock("(55, 28)", { position: new go.Point(55, 28) }),\r
      new go.TextBlock("(33, 70)", { position: new go.Point(33, 70) }),\r
      new go.TextBlock("(100, 100)", { position: new go.Point(100, 100) })\r
    ));`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`zeroPositionPanel`,code:`diagram.add(\r
  new go.Node("Position", { background: "white", isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      // Bounds will always include the (0, 0) despite the first element being at y = 20\r
      new go.TextBlock("true", { position: new go.Point(18, 20) }),\r
      new go.Shape("Circle", { position: new go.Point(0, 50), width: 60, stroke: "rgba(211, 211, 211, .8)",\r
        isGeometryPositioned: true, strokeWidth: 4, fill: "lightgreen" }),\r
      new go.Shape("Circle", { position: new go.Point(0, 95), width: 60, stroke: "rgba(211, 211, 211, .8)",\r
        isGeometryPositioned: true, strokeWidth: 12, fill: "yellow" }),\r
      new go.Shape("Circle", { position: new go.Point(0, 140), width: 60, stroke: "rgba(211, 211, 211, .8)",\r
        isGeometryPositioned: true, strokeWidth: 24, fill: "salmon" }),\r
    ));\r
\r
diagram.add(\r
  new go.Node("Position", { background: "white", isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      new go.TextBlock("false", { position: new go.Point(28, 20) }),\r
      new go.Shape("Circle", { position: new go.Point(0, 50), width: 60, stroke: "rgba(211, 211, 211, .8)",\r
        isGeometryPositioned: false, strokeWidth: 4, fill: "lightgreen" }),\r
      new go.Shape("Circle", { position: new go.Point(0, 95), width: 60, stroke: "rgba(211, 211, 211, .8)",\r
        isGeometryPositioned: false, strokeWidth: 12, fill: "yellow" }),\r
      new go.Shape("Circle", { position: new go.Point(0, 140), width: 60, stroke: "rgba(211, 211, 211, .8)",\r
        isGeometryPositioned: false, strokeWidth: 24, fill: "salmon" })\r
    )\r
)`,isExecutable:!0,animation:!1,split:70,expanded:!0,language:`js`,initiallyVisible:!0},{id:`verticalPanels`,code:`diagram.add(\r
  new go.Node(go.Panel.Vertical,  // or "Vertical"\r
      { background: "white", isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      new go.TextBlock("a longer string", { background: "lightgreen" }),\r
      new go.TextBlock("left", { alignment: go.Spot.Left, background: "lightblue" }),\r
      new go.TextBlock("center", { alignment: go.Spot.Center, background: "lightgreen" }),\r
      new go.TextBlock("right", { alignment: go.Spot.Right, background: "lightblue" }),\r
      new go.TextBlock("stretch", { stretch: go.Stretch.Fill, background: "lightgreen" })\r
    ));`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`excessWidth`,code:`diagram.nodeTemplate = new go.Node("Vertical", {\r
  background: "white", isShadowed: true, shadowOffset: new go.Point(0,0), locationSpot: go.Spot.Center\r
})\r
  .bind("width")\r
  .bind("height")\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.TextBlock("a longer string", { background: "lightgreen" }),\r
    new go.TextBlock("left", { alignment: go.Spot.Left, background: "lightblue" }),\r
    new go.TextBlock("center", { alignment: go.Spot.Center, background: "lightgreen" }),\r
    new go.TextBlock("right", { alignment: go.Spot.Right, background: "lightblue" }),\r
    new go.TextBlock("stretch", { stretch: go.Stretch.Fill, background: "lightgreen" })\r
  );\r
\r
diagram.model.nodeDataArray = [\r
  { width: 140,            loc: "0 -50" },\r
  { width: 50,             loc: "-60 100" },\r
  { width: 50, height: 65, loc: "60 100" }\r
];`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`defaultStretch`,code:`diagram.add(\r
  new go.Node("Vertical",\r
      { background: "lightblue", defaultStretch: go.Stretch.Horizontal })\r
    .add(\r
      new go.TextBlock("short", { margin: 2, background: "white" }),\r
      new go.TextBlock("a much longer string", { margin: 2, background: "white" }),\r
      new go.TextBlock("medium length", { margin: 2, background: "white" }),\r
      new go.TextBlock("short2", { margin: 2, background: "white" }),\r
      new go.TextBlock("max 50", { margin: 2, maxSize: new go.Size(50, NaN), background: "white" })\r
    ));`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`defaultStretch2`,code:`diagram.add(\r
  new go.Node("Vertical",\r
      { background: "lightblue", defaultStretch: go.Stretch.Horizontal })\r
    .add(\r
      new go.TextBlock("short", { margin: 2, background: "white" }),\r
      new go.TextBlock("a much longer string", { margin: 2, background: "white" }),\r
      new go.TextBlock("medium length", { margin: 2, background: "white" }),\r
      new go.TextBlock("short2", { margin: 2, background: "white" }),\r
      new go.TextBlock("= 50", { margin: 2, width: 50, background: "white" })\r
    ));`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`horizontalPanels`,code:`diagram.add(\r
  new go.Node(go.Panel.Horizontal,  // or "Horizontal"\r
      { position: new go.Point(0, 0), background: "lightblue" })\r
    .add(\r
      // Panel size isn't specified so its height is the\r
      // highest set height of its members, here being 100\r
      new go.Shape({ width: 30, height: 100, fill: "white" }),\r
      new go.Shape({ width: 30, height: 50, alignment: go.Spot.Top, fill: "white" }),\r
      new go.Shape({ width: 30, height: 50, alignment: go.Spot.Center, fill: "white" }),\r
      new go.Shape({ width: 30, height: 50, alignment: go.Spot.Bottom, fill: "white" }),\r
      // This element stretches to the height of the panel\r
      new go.Shape({ width: 30, stretch: go.Stretch.Fill, fill: "white" })\r
    ));\r
diagram.add(\r
  new go.Node("Horizontal",\r
      { position: new go.Point(200, 0), background: "lightblue", height: 120 })\r
    .add(\r
      // Here, the panel height is set, so it spaces elements according to that\r
      // and elements set to stretch will stretch to that height\r
      new go.Shape({ width: 30, height: 50, alignment: go.Spot.Top, fill: "white" }),\r
      new go.Shape({ width: 30, height: 50, alignment: go.Spot.Center, fill: "white" }),\r
      new go.Shape({ width: 30, height: 50, alignment: go.Spot.Bottom, fill: "white" }),\r
      new go.Shape({ width: 30, stretch: go.Stretch.Fill, fill: "white" })\r
    ));`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`opposite`,code:`const podiumFill = "#EEEDFE", podiumText = "#3C3489", podiumEdge = "#7F77DD";\r
const feedFill   = "#E1F5EE", feedText   = "#085041", feedEdge   = "#1D9E75";\r
\r
function makeRankRow(rank, name, score, barWidth, isWinner) {\r
  return new go.Panel("Horizontal", { margin: new go.Margin(3, 0) })\r
    .add(\r
      new go.TextBlock("#" + rank, {\r
        margin: new go.Margin(0, 8, 0, 0),\r
        stroke: "dimgray", width: 24, textAlign: "right"\r
      }),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", {\r
            fill: podiumFill, stroke: isWinner ? podiumEdge : "transparent",\r
            strokeWidth: isWinner ? 1.5 : 0,\r
            width: barWidth, height: 32, parameter1: 4\r
          }),\r
          new go.Panel("Horizontal", { margin: new go.Margin(0, 10) })\r
            .add(\r
              new go.TextBlock(name, {\r
                stroke: podiumText, margin: new go.Margin(0, 5)\r
              }),\r
              new go.TextBlock("  " + score, {\r
                stroke: podiumText, opacity: 0.75\r
              })\r
            )\r
        )\r
    );\r
}\r
\r
function makeFeedCard(timeAgo, label) {\r
  return new go.Panel("Auto", { margin: new go.Margin(0, 4) })\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: feedFill,\r
        stroke: feedEdge,\r
        strokeWidth: 0.5,\r
        width: 64, height: 56, parameter1: 6\r
      }),\r
      new go.Panel("Vertical")\r
        .add(\r
          new go.TextBlock(label, { stroke: feedText }),\r
          new go.TextBlock(timeAgo + " ago", {\r
            margin: new go.Margin(4, 0, 0, 0),\r
            stroke: feedText, opacity: 0.7\r
          })\r
        )\r
    );\r
}\r
\r
// Vertical panel with isOpposite: true, fills bottom-to-top.\r
// Rank 1 is added first but ends up on the bottom.\r
diagram.add(\r
  new go.Part("Vertical", {\r
    location: new go.Point(0, 0),\r
    locationSpot: go.Spot.Center,\r
    isOpposite: true\r
  })\r
    .add(\r
      makeRankRow("1", "Aria K.",  "2,840 pts", 220, true),\r
      makeRankRow("2", "Diego M.", "2,615 pts", 200, false),\r
      makeRankRow("3", "Yuki T.",  "2,490 pts", 180, false),\r
      makeRankRow("4", "Sam P.",   "2,205 pts", 160, false),\r
      makeRankRow("5", "Lena O.",  "1,970 pts", 140, false)\r
    )\r
);\r
\r
// Contains a horizontal panel with isOpposite: true, fills right-to-left.\r
// Newest event is added first but ends up on the right.\r
diagram.add(\r
  new go.Part("Horizontal", {\r
    location: new go.Point(0, 200),\r
    locationSpot: go.Spot.Center,\r
    isOpposite: true\r
  })\r
    .add(\r
      makeFeedCard("5m",  "Login"),\r
      makeFeedCard("18m", "Deploy"),\r
      makeFeedCard("1h",  "Commit"),\r
      makeFeedCard("3h",  "Review"),\r
      makeFeedCard("6h",  "Branch")\r
    )\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`defaultAlignment`,code:`diagram.add(\r
    new go.Node("Horizontal",\r
        { background: "lightblue", height: 90, defaultAlignment: go.Spot.Bottom })\r
      .add(\r
        new go.Shape({ width: 30, margin: 2, height: 60, fill: "white" }),\r
        new go.Shape({ width: 30, margin: 2, height: 30, fill: "white" }),\r
        new go.Shape({ width: 30, margin: 2, height: 40, fill: "white" }),\r
        new go.Shape({ width: 30, margin: 2, stretch: go.Stretch.Fill, fill: "white" })\r
      ));`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`standardSpots`,code:`diagram.add(\r
  new go.Node(go.Panel.Spot)  // or "Spot"\r
    .add(\r
      new go.Shape("Rectangle",  // the main element\r
        { fill: "white", stroke: "lightgray", width: 200, height: 150 }),\r
      new go.TextBlock("0, 0",     { alignment: new go.Spot(0, 0) }),\r
      new go.TextBlock("0.5, 0",   { alignment: new go.Spot(0.5, 0) }),\r
      new go.TextBlock("1, 0",     { alignment: new go.Spot(1, 0) }),\r
      new go.TextBlock(".25, .25", { alignment: new go.Spot(.25, .25)}),\r
      new go.TextBlock("0, 0.5",   { alignment: new go.Spot(0, 0.5) }),\r
      new go.TextBlock("0.5, 0.5", { alignment: new go.Spot(0.5, 0.5) }),\r
      new go.TextBlock("1, 0.5",   { alignment: new go.Spot(1, 0.5) }),\r
      new go.TextBlock("0, 1",     { alignment: new go.Spot(0, 1) }),\r
      new go.TextBlock("0.5, 1",   { alignment: new go.Spot(0.5, 1) }),\r
      new go.TextBlock("1, 1",     { alignment: new go.Spot(1, 1) })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`spotOffsets`,code:`diagram.add(\r
  new go.Node("Spot")\r
    .add(\r
      new go.Shape("Rectangle",\r
        { fill: "white", stroke: "lightgray", width: 200, height: 50 }),\r
      // Near bottom-left corner:\r
      new go.TextBlock("(-40,0)",  { alignment: new go.Spot(0, 1, -40, 0) }),\r
      new go.TextBlock("(0,0)",    { alignment: new go.Spot(0, 1, 0, 0) }),\r
      new go.TextBlock("(40,0)",   { alignment: new go.Spot(0, 1, 40, 0) }),\r
\r
      // Near bottom-right corner:\r
      new go.TextBlock("(0,-20)",  { alignment: new go.Spot(1, 1, 0, -20) }),\r
      new go.TextBlock("(0,0)",    { alignment: new go.Spot(1, 1, 0, 0) }),\r
      new go.TextBlock("(0,20)",   { alignment: new go.Spot(1, 1, 0, 20) })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`autoPanels`,code:`diagram.nodeTemplate = new go.Node("Auto", {\r
  background: "white", isShadowed: true,\r
  shadowOffset: new go.Point(0,0), locationSpot: go.Spot.Center\r
})\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Shape({ fill: "lightblue", stroke: "#457b9d" })\r
      .bind("figure"),\r
    new go.TextBlock("some text", { stroke: "#1d3557" })\r
      .bind("text")\r
      .bind("margin")\r
  );\r
\r
diagram.model.nodeDataArray = [\r
  { loc: "0, 0", figure: "Rectangle" },\r
  { loc: "100, 0", figure: "RoundedRectangle" },\r
  { loc: "200, 0", figure: "Ellipse" },\r
  { loc: "0, 100", figure: "Rectangle", margin: 5, text: "with margin" },\r
  { loc: "100, 100", figure: "RoundedRectangle", margin: 5, text: "with margin" },\r
  { loc: "220, 100", figure: "Ellipse", margin: 5, text: "with margin" }\r
];`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`spotAreaAutoPanels`,code:`diagram.nodeTemplate = new go.Node("Auto", {\r
  locationSpot: go.Spot.Center\r
})\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Shape({\r
      fill: "lightblue",\r
      stroke: "#457b9d",\r
      strokeWidth: 2\r
    })\r
      .bind("figure")\r
      .bind("spot1")\r
      .bind("spot2"),\r
    new go.TextBlock({\r
      margin: 4,\r
      font: "bold 12px sans-serif",\r
      stroke: "#1d3557",\r
      textAlign: "center"\r
    })\r
      .bind("text")\r
  );\r
\r
diagram.model.nodeDataArray = [\r
  { loc: "0 0", text: "default\\nspot1 (0,0)\\nspot2 (1,1)",\r
    figure: "RoundedRectangle",\r
    spot1: new go.Spot(0, 0), spot2: new go.Spot(1, 1) },\r
  { loc: "140 0", text: "inset 10px horizontally\\nand 10px on the bottom",\r
    figure: "RoundedRectangle",\r
    spot1: new go.Spot(0, 0, 10, 0), spot2: new go.Spot(1, 1, -10, -10) },\r
  { loc: "280 0", text: "inset 20px\\nvertically",\r
    figure: "RoundedRectangle",\r
    spot1: new go.Spot(0, 0, 0, 20), spot2: new go.Spot(1, 1, 0, -20) }\r
];`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`autoPanelsConstrained`,code:`diagram.nodeTemplate = new go.Node("Auto", {\r
  width: 60, height: 60,  // set the size of the whole panel\r
  background: "white", isShadowed: true, shadowOffset: new go.Point(0,0)\r
})\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Shape({ fill: "lightblue", stroke: "#457b9d" })\r
      .bind("figure"),\r
    new go.TextBlock("Some Wrapping Text", { stroke: "#1d3557" })\r
  );\r
\r
diagram.model.nodeDataArray = [\r
  { loc: "0, 0", figure: "Rectangle" },\r
  { loc: "100, 0", figure: "RoundedRectangle" },\r
  { loc: "200, 0", figure: "Ellipse" }\r
];`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`spotPanels`,code:`diagram.nodeTemplate = new go.Node("Spot", {\r
  background: "lightblue", locationSpot: go.Spot.Center\r
})\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Shape("Rectangle",  // the main element\r
      { fill: "#457b9d", width: 100, height: 50 }),\r
    new go.TextBlock("TL", { background: "white", alignment: go.Spot.TopLeft })\r
      .bind("alignmentFocus", "alignmentFocusTL"),\r
    new go.TextBlock("TR", { background: "white", alignment: go.Spot.TopRight })\r
      .bind("alignmentFocus", "alignmentFocusTR"),\r
    new go.TextBlock("BL", { background: "white", alignment: go.Spot.BottomLeft })\r
      .bind("alignmentFocus", "alignmentFocusBL"),\r
    new go.TextBlock("BR", { background: "white", alignment: go.Spot.BottomRight })\r
      .bind("alignmentFocus", "alignmentFocusBR")\r
  );\r
\r
diagram.model.nodeDataArray = [\r
  { // Default\r
    alignmentFocusTL: null,\r
    alignmentFocusTR: null,\r
    alignmentFocusBL: null,\r
    alignmentFocusBR: null,\r
    loc: "0, -100"\r
  },\r
  { // Same alignmentFocus as alignment\r
    alignmentFocusTL: go.Spot.TopLeft,\r
    alignmentFocusTR: go.Spot.TopRight,\r
    alignmentFocusBL: go.Spot.BottomLeft,\r
    alignmentFocusBR: go.Spot.BottomRight,\r
    loc: "0, 0"\r
  },\r
  { // Opposite alignmentFocus from alignment\r
    alignmentFocusTL: go.Spot.BottomRight,\r
    alignmentFocusTR: go.Spot.BottomLeft,\r
    alignmentFocusBL: go.Spot.TopRight,\r
    alignmentFocusBR: go.Spot.TopLeft,\r
    loc: "0, 100"\r
  }\r
];`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`focusSpotPanels2`,code:`diagram.nodeTemplate = new go.Node("Vertical", {\r
  locationObjectName: 'main'\r
})\r
  .add(\r
    new go.Panel("Spot")\r
      .add(\r
        new go.Shape("Rectangle", {\r
          name: 'main', stroke: null, width: 80, height: 80, fill: "lightgreen"\r
        }),\r
        new go.Shape("Rectangle", {\r
          fill: "lightcoral", stroke: null, width: 30, height: 30,\r
          alignment: go.Spot.TopRight\r
        })\r
          .bind("alignmentFocus")\r
      ),\r
    new go.TextBlock({ font: '11px sans-serif' })\r
      .bind("text")\r
  );\r
\r
diagram.model.nodeDataArray = [\r
  { text: "alignment: TopRight,\\n alignmentFocus: TopRight",\r
    alignmentFocus: go.Spot.TopRight },\r
  { text: "alignment: TopRight,\\n alignmentFocus: BottomRight",\r
    alignmentFocus: go.Spot.BottomRight },\r
  { text: "alignment: TopRight,\\n alignmentFocus: BottomRight with offsetX = 15",\r
    alignmentFocus: new go.Spot(1, 1, 15, 0) }\r
];`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`alignmentFocusName`,code:`diagram.add(\r
  new go.Node("Spot")\r
    .add(\r
      // Main shape\r
      new go.Shape({ strokeWidth: 4, fill: 'lightblue' }),\r
      // Instead of aligning this Panel, we want to align the shape inside of it, to the corner of the main shape\r
      new go.Panel("Horizontal", {\r
            background: 'rgba(255,255,255,0.8)',\r
            alignment: go.Spot.TopRight,\r
            alignmentFocus: go.Spot.BottomLeft,\r
            alignmentFocusName: 'SHAPE'\r
          })\r
        .add(\r
          new go.TextBlock("some\\nlabel", { margin: 8 }),\r
          new go.Shape({ name: 'SHAPE', width: 30, height: 30, strokeWidth: 4, fill: 'lightblue' })\r
        )\r
    ));`,isExecutable:!0,animation:!1,split:70,language:`js`,initiallyVisible:!0},{id:`StretchSpotPanels`,code:`diagram.add(\r
  new go.Node("Spot", { resizable: true, resizeObjectName: 'MAIN' })\r
    .add(\r
      new go.Shape({\r
        name: 'MAIN', strokeWidth: 0, width: 80, height: 60,\r
        fill: 'rgba(255,0,0,.8)'  // red\r
      }),\r
\r
      new go.Shape({\r
        stretch: go.Stretch.Vertical, strokeWidth: 0, width: 20,\r
        fill: 'rgba(0,255,0,.3)', // green\r
        alignment: go.Spot.Left,\r
        alignmentFocus: go.Spot.Right\r
      }),\r
      new go.Shape({\r
        stretch: go.Stretch.Vertical, strokeWidth: 0, width: 20,\r
        fill: 'rgba(0,0,255,.3)' , // blue\r
        alignment: go.Spot.Right,\r
        alignmentFocus: go.Spot.Left\r
      }),\r
      new go.Shape({\r
        stretch: go.Stretch.Horizontal, strokeWidth: 0, height: 20,\r
        fill: 'rgba(255,0,255,.3)' , // pink\r
        alignment: go.Spot.Bottom,\r
        alignmentFocus: go.Spot.Top\r
      })\r
    ));\r
diagram.select(diagram.parts.first());`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`clipping`,code:`diagram.add( // Size not fixed\r
  new go.Node("Spot", {\r
      background: "lightblue", location: new go.Point(0, -75)\r
    })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#457b9d", width: 40, height: 40 }),\r
      new go.TextBlock("TL", { background: "white",\r
        alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.BottomRight }),\r
      new go.TextBlock("TR", { background: "white",\r
        alignment: go.Spot.TopRight, alignmentFocus: go.Spot.BottomLeft }),\r
      new go.TextBlock("BL", { background: "white",\r
        alignment: go.Spot.BottomLeft, alignmentFocus: go.Spot.TopRight }),\r
      new go.TextBlock("BR", { background: "white",\r
        alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.TopLeft })\r
    ));\r
\r
diagram.add( // Size fixed\r
  new go.Node("Spot", {\r
      background: "lightblue", location: new go.Point(0, 75),\r
      width: 100, height: 50  // it is unusual to set the size!\r
    })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#457b9d", width: 40, height: 40 }),\r
      new go.TextBlock("TL", { background: "white",\r
        alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.BottomRight }),\r
      new go.TextBlock("TR", { background: "white",\r
        alignment: go.Spot.TopRight, alignmentFocus: go.Spot.BottomLeft }),\r
      new go.TextBlock("BL", { background: "white",\r
        alignment: go.Spot.BottomLeft, alignmentFocus: go.Spot.TopRight }),\r
      new go.TextBlock("BR", { background: "white",\r
        alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.TopLeft })\r
    ));`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`spotZorder`,code:`diagram.add(\r
  new go.Node("Spot",\r
      { background: "lightblue" })\r
    .add(\r
    new go.TextBlock("TL", { background: "white", alignment: go.Spot.TopLeft }),\r
    new go.TextBlock("TR", { background: "white", alignment: go.Spot.TopRight }),\r
    new go.TextBlock("BL", { background: "white", alignment: go.Spot.BottomLeft }),\r
    new go.TextBlock("BR", { background: "white", alignment: go.Spot.BottomRight }),\r
\r
    // NOTE: the main element isn't first, so it must be declared by setting isPanelMain to true\r
    new go.Shape("Rectangle", {\r
        isPanelMain: true,\r
        fill: "#457b9d", width: 100, height: 50\r
      })\r
  ));`,isExecutable:!0,animation:!1,split:70,minHeight:0,language:`js`,initiallyVisible:!0},{id:`clipPictures`,code:`diagram.layout = new go.GridLayout();\r
\r
// Without Panel.isClipping\r
diagram.add(\r
  new go.Node("Spot", { scale: 2 })\r
    .add(\r
      new go.Shape("Circle", { width: 55, height: 55, strokeWidth: 0 }),\r
      new go.Picture("../samples/images/55x55.png", { width: 55, height: 55 })\r
    ));\r
\r
// Using Panel.isClipping\r
diagram.add(\r
  new go.Node("Spot", { isClipping: true, scale: 2 })\r
    .add(\r
      new go.Shape("Circle", { width: 55, height: 55, strokeWidth: 0 }),\r
      new go.Picture("../samples/images/55x55.png", { width: 55, height: 55 })\r
    ));\r
\r
// Using Panel.isClipping and also having a surrounding panel\r
diagram.add(\r
  new go.Node("Spot", { scale: 2 })\r
    .add(\r
      new go.Shape("Circle", { width: 65, height: 65, strokeWidth: 0, fill: "lightgray" }),\r
      new go.Panel("Spot", { isClipping: true })\r
        .add(\r
          new go.Shape("Circle", { width: 55, height: 55, strokeWidth: 0 }),\r
          new go.Picture("../samples/images/55x55.png", { width: 55, height: 55 })\r
        )\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`viewboxPanel`,code:`function makePanel(caption) { // returns a copy of the same panel with a given caption\r
  return new go.Panel("Auto")\r
    .add(\r
      new go.Shape("Ellipse", { fill: "white", stroke: "lightgray", strokeWidth: 5 }),\r
      new go.Panel("Vertical")\r
        .add(\r
          new go.Picture({ source: "images/120x160.png" }),\r
          new go.TextBlock(caption)\r
        )\r
    );\r
}\r
\r
diagram.add(\r
  new go.Node(go.Panel.Viewbox, { // or "Viewbox"\r
      position: new go.Point(0, 0), isShadowed: true,\r
      shadowOffset: new go.Point(2,2), width: 80, height: 80\r
    })\r
    .add(  // just a single element\r
      makePanel("An 80x80 kitten")\r
    ));\r
\r
diagram.add(\r
  new go.Node("Auto", {  // no Viewbox Panel\r
      position: new go.Point(100, 0), isShadowed: true,\r
      shadowOffset: new go.Point(4,4),\r
      // no width or height\r
    })\r
    .add(\r
      makePanel("A 120x160 kitten")\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`cy2jdl`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};