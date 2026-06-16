import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Layouts`,category:`Core Concepts`,categoryOrder:5,figures:!0},htmlContent:`<h1>Diagram Layouts</h1>\r
<p>\r
  A "layout" is a way of sizing and positioning a collection of nodes and links.\r
  If you set <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a>, that layout will be performed automatically as nodes or links are added or removed\r
  in the diagram, or as nodes change size.\r
  If you want to let your users position all parts manually, you don't need to set <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a>.\r
</p>\r
\r
<p>GoJS offers several kinds of built-in automatic layouts, including:</p>\r
<ul>\r
  <li><a href="../api/symbols/GridLayout.html" target="api">GridLayout</a></li>\r
  <li><a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a></li>\r
  <li><a href="../api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a></li>\r
  <li><a href="../api/symbols/LayeredDigraphLayout.html" target="api">LayeredDigraphLayout</a></li>\r
  <li><a href="../api/symbols/CircularLayout.html" target="api">CircularLayout</a></li>\r
</ul>\r
<p>In addition there are many custom layouts in the extensions and in the samples.</p>\r
\r
<h2 id="GridLayout"><a class="not-prose heading-anchor" href="#GridLayout">Grid Layout</a></h2>\r
\r
<p>This is a simple layout for placing Nodes in a grid-like arrangement.\r
  By default the layout will be performed again as the diagram's host div changes width.\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  See the <a href="../samples/gLayout" target="samples">GridLayout Sample</a> for a demonstration of layout options. The\r
  <a href="../samples/swimLanes" target="samples">Swim Lanes</a> sample demonstrates a customization of <a href="../api/symbols/GridLayout.html" target="api">GridLayout</a>. See more samples that make use\r
  of <a href="../api/symbols/GridLayout.html" target="api">GridLayout</a> in the <a href="../samples/#gridlayout">samples index</a>.\r
</p>\r
\r
<h2 id="TreeLayout"><a class="not-prose heading-anchor" href="#TreeLayout">Tree Layout</a></h2>\r
\r
<p>\r
  This layout positions nodes of a tree-structured graph in layers, either rows or columns depending on the <a href="../api/symbols/TreeLayout.html#angle" target="api">TreeLayout.angle</a>.\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  See the <a href="../samples/tLayout" target="samples">TreeLayout sample</a> for a demonstration of layout options. The\r
  <a href="../samples/orgChartEditor" target="samples">Org Chart Editor</a>, <a href="../samples/parseTree" target="samples">Parse Tree</a>,\r
  <a href="../samples/swimBands" target="samples">Layer Bands</a>, and\r
  <a href="../samples/virtualizedTreeLayout" target="samples">Virtualized Tree</a>\r
  samples demonstrate customization of <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a>. See more samples that make use of <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a> in the\r
  <a href="../samples/#treelayout">samples index</a>.\r
</p>\r
\r
<h2 id="ForceDirectedLayout"><a class="not-prose heading-anchor" href="#ForceDirectedLayout">Force-Directed Layout</a></h2>\r
\r
<p>\r
  This layout treats the graph as if it were a system of physical bodies with forces acting on them and between them.\r
  Links between Nodes are treated as if they were springs.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  See the <a href="../samples/fdLayout" target="samples">ForceDirectedLayout sample</a> for a demonstration of layout options. That sample also\r
  demonstrates a simple customization of <a href="../api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a>. The\r
  <a href="../samples/virtualizedForceLayout" target="samples">Virtualized Force Directed</a> sample demonstrates a more complicated customization of\r
  <a href="../api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a>. See more samples that make use of <a href="../api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a> in the\r
  <a href="../samples/#forcedirected">samples index</a>.\r
</p>\r
\r
<h2 id="LayeredDigraphLayout"><a class="not-prose heading-anchor" href="#LayeredDigraphLayout">Layered Digraph Layout</a></h2>\r
\r
<p>\r
  This arranges nodes of directed graphs into layers, rows or columns depending on the <a href="../api/symbols/LayeredDigraphLayout.html#direction" target="api">LayeredDigraphLayout.direction</a>.\r
  Unlike <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a>, this works not only with tree-structured graphs, but with any graph, although it's best with directed acyclic graphs.\r
</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  See the <a href="../samples/ldLayout" target="samples">LayeredDigraphLayout sample</a> for a demonstration of layout options. The\r
  <a href="../samples/genogram" target="samples">Genogram</a> sample demonstrates a complex customization of <a href="../api/symbols/LayeredDigraphLayout.html" target="api">LayeredDigraphLayout</a>. See more samples\r
  that make use of <a href="../api/symbols/LayeredDigraphLayout.html" target="api">LayeredDigraphLayout</a> in the <a href="../samples/#layered-digraph">samples index</a>.\r
</p>\r
\r
<h2 id="CircularLayout"><a class="not-prose heading-anchor" href="#CircularLayout">Circular Layout</a></h2>\r
\r
<p>\r
  This layout positions nodes in a circular or elliptical arrangement.\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  See the <a href="../samples/cLayout" target="samples">CircularLayout sample</a> for a demonstration of layout options. The\r
  <a href="../samples/friendWheel" target="samples">Friend Wheel</a> sample demonstrates a simple customization of <a href="../api/symbols/CircularLayout.html" target="api">CircularLayout</a>. See more samples\r
  that make use of <a href="../api/symbols/CircularLayout.html" target="api">CircularLayout</a> in the <a href="../samples/#circularlayout">samples index</a>.\r
</p>\r
\r
<h2 id="CustomLayouts"><a class="not-prose heading-anchor" href="#CustomLayouts">Custom Layouts</a></h2>\r
\r
<p>\r
  GoJS encourages creation of custom layouts.\r
  The learn page on <a href="extensions">extensions</a> gives a simple example of a custom layout.\r
  See more samples that make use of custom layouts in the <a href="../samples/#customlayout">samples index</a>.\r
</p>\r
<p>\r
  There are also many layouts that are extensions -- not predefined in the <code>go.js</code> or <code>go-debug.js</code> library,\r
  but available as source code in one of the two extension directories, with some documentation, and with corresponding samples.\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/ArrangingLayout.html" target="api">ArrangingLayout</a>: sample at <a href="../samples/Arranging" target="samples">ArrangingLayout Sample</a>, defined in\r
    <a href="../extensions/ArrangingLayout.js">ArrangingLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/DoubleTreeLayout.html" target="api">DoubleTreeLayout</a>: sample at <a href="../samples/doubleTree" target="samples">DoubleTreeLayout Sample</a>, defined in\r
    <a href="../extensions/DoubleTreeLayout.js">DoubleTreeLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/FishboneLayout.html" target="api">FishboneLayout</a>: sample at <a href="../samples/Fishbone" target="samples">FishboneLayout Sample</a>, defined in\r
    <a href="../extensions/FishboneLayout.js">FishboneLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/PackedLayout.html" target="api">PackedLayout</a>: sample at <a href="../samples/PackedLayout" target="samples">PackedLayout Sample</a>, defined in\r
    <a href="../extensionsJSM/PackedLayout.js">PackedLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/ParallelLayout.html" target="api">ParallelLayout</a>: sample at <a href="../samples/Parallel" target="samples">ParallelLayout Sample</a>, defined in\r
    <a href="../extensions/ParallelLayout.js">ParallelLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/SerpentineLayout.html" target="api">SerpentineLayout</a>: sample at <a href="../samples/Serpentine" target="samples">SerpentineLayout Sample</a>, defined in\r
    <a href="../extensions/SerpentineLayout.js">SerpentineLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/SpiralLayout.html" target="api">SpiralLayout</a>: sample at <a href="../samples/Spiral" target="samples">SpiralLayout Sample</a>, defined in\r
    <a href="../extensions/SpiralLayout.js">SpiralLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/SwimLaneLayout.html" target="api">SwimLaneLayout</a>: sample at <a href="../samples/SwimLaneLayout" target="samples">SwimLaneLayout Sample</a>, defined in\r
    <a href="../extensions/SwimLaneLayout.js">SwimLaneLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/TableLayout.html" target="api">TableLayout</a>: sample at <a href="../samples/Table" target="samples">TableLayout Sample</a>, defined in\r
    <a href="../extensions/TableLayout.js">TableLayout.js</a>\r
  </li>\r
  <li><a href="../api/symbols/TreeMapLayout.html" target="api">TreeMapLayout</a>: sample at <a href="../samples/TreeMap" target="samples">TreeMapLayout Sample</a>, defined in\r
    <a href="../extensions/TreeMapLayout.js">TreeMapLayout.js</a>\r
  </li>\r
</ul>\r
\r
<h2 id="routing"><a class="not-prose heading-anchor" href="#routing">Routing</a></h2>\r
<p>\r
  Layouts also may also result in custom routing of the links, by setting properties on each <a href="../api/symbols/Link.html" target="api">Link</a>.\r
  For example <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a> also ensures that links are routed in the expected direction by setting\r
  <a href="../api/symbols/Link.html#fromspot" target="api">Link.fromSpot</a> and <a href="../api/symbols/Link.html#tospot" target="api">Link.toSpot</a> depending on the <a href="../api/symbols/TreeLayout.html#angle" target="api">TreeLayout.angle</a>.\r
  However, that behavior can be disabled by setting <a href="../api/symbols/TreeLayout.html#setsportspot" target="api">TreeLayout.setsPortSpot</a> and <a href="../api/symbols/TreeLayout.html#setschildportspot" target="api">TreeLayout.setsChildPortSpot</a>.\r
  The same is true for some other layouts.\r
</p>\r
<p>\r
  More general routing behaviors are implemented by <a href="../api/symbols/Router.html" target="api">Router</a>s.\r
  See <a href="routers">Routers</a> for more details.\r
</p>\r
\r
<h2 id="LayoutInvalidation"><a class="not-prose heading-anchor" href="#LayoutInvalidation">Layout Invalidation</a></h2>\r
<p>\r
  A layout is considered "valid" when it has performed its positioning of its nodes and perhaps routed its links.\r
  However some kinds of changes cause a layout to become "invalid", thereby causing it to be performed again in the near future.\r
  Because layouts can be computationally expensive, automatic layouts are not performed as soon as a layout is invalidated.\r
  Instead they are typically performed at the end of a transaction.\r
</p>\r
<p>\r
  The most common reasons for a layout to be invalidated are because a node or a link has been added or removed from the collection of\r
  nodes and links that a layout is responsible for, or because a node or a link has changed visibility, or because a node has changed size.\r
  If you do not want an automatic layout to happen when such a change occurs, it may be easiest to set <a href="../api/symbols/Layout.html#isongoing" target="api">Layout.isOngoing</a> to false.\r
</p>\r
<p>\r
  Another common situation is where you have set <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> to some kind of layout but you want to load a diagram (model)\r
  that contains manually positioned or adjusted node locations.\r
  The <a href="../api/symbols/Binding.html" target="api">Binding</a> of <a href="../api/symbols/Part.html#location" target="api">Part.location</a> to the model data is effective,\r
  but the locations are lost when a layout is performed immediately after loading.\r
  This situation can be avoided by setting <a href="../api/symbols/Layout.html#isinitial" target="api">Layout.isInitial</a> to false.\r
  After the initial layout the layout might still be invalidated by adding or removing or changing the visibility of a node or a link\r
  or by a change in node size, unless you have also set <a href="../api/symbols/Layout.html#isongoing" target="api">Layout.isOngoing</a> to false.\r
  When both <a href="../api/symbols/Layout.html#isinitial" target="api">Layout.isInitial</a> and <a href="../api/symbols/Layout.html#isongoing" target="api">Layout.isOngoing</a> are false, you can still explicitly cause a layout to happen\r
  by either calling <a href="../api/symbols/Layout.html#invalidatelayout" target="api">Layout.invalidateLayout</a> or by calling <a href="../api/symbols/Diagram.html#layoutdiagram" target="api">Diagram.layoutDiagram</a> with a <code>true</code> argument.\r
</p>\r
<p>\r
  For example, in diagram editors it is commonplace to have TwoWay Bindings on <a href="../api/symbols/Node.html#location" target="api">Node.location</a> to save manually adjusted node locations.\r
  This means that saved models will have saved locations for all of the nodes.\r
  But if you create a new model without all of the node data objects having real locations,\r
  you will want a layout to be performed initially when the model is loaded.\r
  You can accomplish this by setting <a href="../api/symbols/Layout.html#isinitial" target="api">Layout.isInitial</a> to false (and optionally <a href="../api/symbols/Layout.html#isongoing" target="api">Layout.isOngoing</a> to false,\r
  if that is what you want when users add or remove nodes or links) and then implementing an "InitialLayoutCompleted"\r
  <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listener that decides whether a layout is needed.\r
  The decision could be to look at a flag that you add to the <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a>.\r
  Or you could look at all of the nodes to make sure their locations have real values:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  But if you do not want a change to a particular Node or Link to cause an automatic layout,\r
  yet you do want that invalidation for other Nodes or Links, you can set the <a href="../api/symbols/Part.html#layoutconditions" target="api">Part.layoutConditions</a> property to\r
  the combination of <a href="../api/symbols/Part.html" target="api">Part</a> "Layout..." flags that suits your needs.\r
  It is most common to not want a layout for the <a href="../api/symbols/LayoutConditions.html#nodesized" target="api">LayoutConditions.NodeSized</a> condition:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  Parts that remain not visible or that are in layers that are <a href="../api/symbols/Layer.html#istemporary" target="api">Layer.isTemporary</a> also never invalidate any Layout.\r
</p>\r
<p>\r
  Finally, you can set <a href="../api/symbols/Part.html#islayoutpositioned" target="api">Part.isLayoutPositioned</a> to false in order for the Layout to completely ignore that Part.\r
  But you will have to make sure that that Part does have a real <a href="../api/symbols/Part.html#location" target="api">Part.location</a>, since no layout will set it for you.\r
  Without a real location the part will not be visible anywhere in the diagram.\r
  Furthermore if a node has <b>isLayoutPositioned</b> set to false, Layouts will not only ignore that node\r
  but also all links connecting with that node.\r
  Because the node will not be moved by the layout, it might overlap with the laid-out nodes and links.\r
  You can also set or bind <a href="../api/symbols/Part.html#islayoutpositioned" target="api">Part.isLayoutPositioned</a> to false on Links in order to have the layout ignore those links.\r
  This is demonstrated in <a href="../samples/orgChartExtras" target="samples">Org Chart Extras</a>.\r
</p>\r
`,codeBlocks:[{id:`gridlayout`,code:`diagram.layout = new go.GridLayout();\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { isOpposite: true })\r
    .add(\r
      new go.Shape({ fill: null, stroke: "lightgray" }),\r
      new go.Panel("Vertical")\r
        .add(\r
          new go.Shape("Square", { width: 85, stroke: null, strokeWidth: 0 })\r
            .bind("fill", "hex"),\r
          new go.Panel("Spot")\r
            .add(\r
              new go.Shape("Rectangle", {\r
                fill: "white", stroke: null, strokeWidth: 0,\r
                width: 85, height: 20\r
              }),\r
              new go.TextBlock("Color Name", {\r
                stroke: "#001219",\r
                alignment: new go.Spot(0, 0, 2, 0),\r
                alignmentFocus: go.Spot.TopLeft,\r
                font: "bold 8pt Garamond, Serif"\r
              })\r
                .bind("text", "name"),\r
              new go.TextBlock("Hex Code", {\r
                stroke: "#001219",\r
                alignment: new go.Spot(0, 0, 2, 10),\r
                alignmentFocus: go.Spot.TopLeft,\r
                font: "6pt Garamond, Serif"\r
              })\r
                .bind("text", "hex")\r
            )\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "1", name: "Ink Black", hex: "#001219" },\r
    { key: "2", name: "Dark Teal", hex: "#005f73" },\r
    { key: "3", name: "Dark Cyan", hex: "#0a9396" },\r
    { key: "4", name: "Pearl Aqua", hex: "#94d2bd" },\r
    { key: "5", name: "Wheat", hex: "#e9d8a6" },\r
    { key: "6", name: "Golden Orange", hex: "#ee9b00" },\r
    { key: "7", name: "Burnt Caramel", hex: "#ca6702" },\r
    { key: "8", name: "Rusty Spice", hex: "#bb3e03" },\r
    { key: "9", name: "Oxidized Iron", hex: "#ae2012" },\r
    { key: "10", name: "Brown Red", hex: "#9b2226" },\r
    { key: "11", name: "Strawberry Red", hex: "#e63946" },\r
    { key: "12", name: "Honeydew", hex: "#f1faee" },\r
    { key: "13", name: "Frosted Blue", hex: "#a8dadc" },\r
    { key: "14", name: "Steel Blue", hex: "#457b9d" },\r
    { key: "15", name: "Deep Space Blue", hex: "#1d3557" },\r
    { key: "16", name: "Prussian Blue", hex: "#001d3d" }\r
  ]\r
  // [no links]\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!1},{id:`treelayout`,code:`diagram.layout = new go.TreeLayout({ angle: 90 });\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical", {\r
    background: "#1f4963",\r
    padding: new go.Margin(4, 0),\r
    isShadowed: true, shadowOffset: new go.Point(0,0)\r
  })\r
    .add(\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("Ellipse", {\r
            width: 40, height: 40, fill: "white", stroke: "lightgray"\r
          }),\r
          new go.Shape({\r
            geometryString: \`m8 1C6.3438 1 5 2.3438 5 4s1.3438 3 3 3 3-1.3438\r
              3-3-1.3438-3-3-3zM6.5 8C4.0078 8 2 10.0078 2 12.5v.5c0\r
              1.1094.8906 2 2 2h8c1.1094 0 2-.8906 2-2v-.5C14 10.0078\r
              11.9922 8 9.5 8z\`,\r
            desiredSize: new go.Size(20, 22)\r
          })\r
        ),\r
      new go.Panel("Vertical", {\r
        width: 100, background: "white", margin: new go.Margin(4,0,0,0)\r
      })\r
      .add(\r
        new go.TextBlock({\r
          font: "bold 8pt sans-serif", stroke: "#1a1e2c", textAlign: "center",\r
          margin: new go.Margin(4, 0, 0, 0), wrap: go.Wrap.DesiredSize\r
        })\r
          .bind("text", "name"),\r
        new go.TextBlock({\r
          font: "8pt sans-serif", stroke: "#1a1e2c", textAlign: "center",\r
          wrap: go.Wrap.DesiredSize\r
        })\r
          .bind("text", "role")\r
      )\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal })\r
    .add(\r
      new go.Shape({ stroke: "#333" })\r
      // no arrowhead\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "1", name: "Sandra Okafor", role: "Vice President" },\r
    { key: "2", name: "James Whitfield", role: "Director" },\r
    { key: "3", name: "Priya Nambiar", role: "Director" },\r
    { key: "4", name: "Carlos Delatorre", role: "Associate" },\r
    { key: "5", name: "Mei-Ling Chen", role: "Associate" },\r
    { key: "6", name: "Tobias Engström", role: "Associate" }\r
  ],\r
  [\r
    { from: "1", to: "2" },\r
    { from: "1", to: "3" },\r
    { from: "3", to: "4" },\r
    { from: "3", to: "5" },\r
    { from: "3", to: "6" }\r
  ]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!1},{id:`fdlayout`,code:`diagram.layout = new go.ForceDirectedLayout({\r
  defaultElectricalCharge: 50, defaultSpringLength: 20\r
});\r
diagram.initialAutoScale = go.AutoScale.Uniform;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot", {\r
    isShadowed: true, shadowColor: "lightyellow",\r
    shadowOffset: new go.Spot(0,0), shadowBlur: 20\r
  })\r
    .add(\r
      new go.Shape("Circle", {\r
        width: 5, portId: ""\r
      }),\r
      new go.Shape("TenPointedBurst", {\r
        fill: "#FFFFF0F0", stroke: null, strokeWidth: 3\r
      })\r
        .bind("desiredSize", "size", go.Size.parse)\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
    isShadowed: true, shadowOffset: new go.Spot(0,0), shadowBlur: 20,\r
    layerName: "Background"\r
  })\r
    .add(\r
      new go.Shape({ stroke: "#FFFFF0F0", strokeWidth: 0.5, opacity: 0.4 })\r
      // no arrowhead\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "1", size: "12 12" },\r
    { key: "2", size: "16 16" },\r
    { key: "3", size: "14 14" },\r
    { key: "4", size: "20 20" },\r
    { key: "5", size: "14 14" },\r
    { key: "6", size: "16 16" },\r
    { key: "7", size: "16 16" },\r
    { key: "8", size: "18 18" },\r
    { key: "9", size: "13 13" },\r
    { key: "10", size: "14 14" },\r
    { key: "11", size: "15 15" },\r
  ],\r
  [\r
    { from: "6", to: "2" },\r
    { from: "3", to: "4" },\r
    { from: "3", to: "5" },\r
    { from: "3", to: "6" },\r
    { from: "6", to: "1" },\r
    { from: "6", to: "7" },\r
    { from: "4", to: "8" },\r
    { from: "4", to: "9" },\r
    { from: "4", to: "10" },\r
    { from: "4", to: "11" },\r
  ]);\r
\r
// Animates the nodes spreading out from the center\r
function animateStars() {\r
  const spread = new go.Animation();\r
  spread.duration = 500;\r
  const center = diagram.documentBounds.center;\r
  diagram.nodes.each(n => {\r
    spread.add(n, "position", center, n.position);\r
  });\r
  spread.start();\r
}\r
\r
// Triggers animation on initial layout\r
diagram.addDiagramListener("InitialLayoutCompleted", animateStars);\r
\r
// Re-seeds the nodes then redoes the layout\r
window.redoLayout = () => {\r
  const am = diagram.animationManager;\r
  const center = diagram.documentBounds.center;\r
  am.isEnabled = false; // Stop default animation\r
  diagram.commit(d => {\r
    d.nodes.each(n => n.position = center);\r
    d.layoutDiagram(true);\r
  });\r
  am.isEnabled = true; // Re-enable for custom animation\r
  animateStars();\r
  diagram.zoomToFit();\r
};\r
\r
diagram.div.style.backgroundColor = "#04092e";`,isExecutable:!0,animation:!1,html:`<button onclick="redoLayout()">Redo layout w/ random seeding</button>`,language:`js`,initiallyVisible:!1},{id:`ldlayout`,code:`// Added spacing between layers for clarity\r
diagram.layout = new go.LayeredDigraphLayout({ layerSpacing: 80 });\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot")\r
    .add(\r
      new go.Shape("Circle", {\r
        width: 36, fill: "white"\r
      })\r
        .bind("stroke", "key", k => {\r
          if (k[0] == "i") return "coral";\r
          if (k[0] == "h") return "skyblue";\r
          else return "seagreen";\r
        }),\r
      new go.TextBlock({\r
        font: "10pt monospace", alignmentFocus: new go.Spot(0.5, 0.5, 0, -2)\r
      })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier })\r
    .add(\r
      new go.Shape({ stroke: "#999" })\r
      // no arrowhead\r
    );\r
\r
// Three input neurons, four hidden neurons, and two output neurons\r
const nodeDataArray = [\r
  { key: "i1" },\r
  { key: "i2" },\r
  { key: "i3" },\r
  { key: "h1" },\r
  { key: "h2" },\r
  { key: "h3" },\r
  { key: "h4" },\r
  { key: "o1" },\r
  { key: "o2" }\r
];\r
\r
// Full connect each layer to the one ahead of it\r
const inputs = ["i1", "i2", "i3"];\r
const hidden = ["h1", "h2", "h3", "h4"];\r
const outputs = ["o1", "o2"];\r
const linkDataArray = [];\r
inputs.forEach(i =>\r
  hidden.forEach(h =>\r
    linkDataArray.push({ from: i, to: h })\r
  )\r
);\r
hidden.forEach(h =>\r
  outputs.forEach(o =>\r
    linkDataArray.push({ from: h, to: o })\r
  )\r
);\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!1},{id:`circularLayout`,code:`diagram.layout = new go.CircularLayout({\r
  sorting: go.CircularSorting.Ascending, // Sort by given order\r
  startAngle: -90 // First node on top\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot")\r
    .add(\r
      new go.Shape("Ellipse", {\r
        width: 40, height: 40, strokeWidth: 3, stroke: "#333"\r
      })\r
        .bind("fill"),\r
      new go.TextBlock({\r
        font: "bold 16px 'Marker Felt', 'Ink Free', 'Segoe Print', serif",\r
        stroke: "#333"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({ strokeWidth: 3, stroke: "#333" })\r
      // no arrowhead\r
    );\r
\r
// create the model data that will be represented by Nodes and Links\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: "C", fill: "#acd8f5" },\r
    { key: "G", fill: "#a8e0d8" },\r
    { key: "D", fill: "#b8ecc0" },\r
    { key: "A", fill: "#e0f0a8" },\r
    { key: "E", fill: "#ffeaa8" },\r
    { key: "B", fill: "#ffcfa0" },\r
    { key: "F#", fill: "#ffb3a8" },\r
    { key: "Db", fill: "#ffcfa0" },\r
    { key: "Ab", fill: "#ffeaa8" },\r
    { key: "Eb", fill: "#e0f0a8" },\r
    { key: "Bb", fill: "#b8ecc0" },\r
    { key: "F", fill: "#a8e0d8" }\r
  ],\r
  [\r
    { from: "Bb", to: "D" },\r
    { from: "D", to: "F#" },\r
    { from: "F#", to: "Bb" }\r
  ]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!1},{id:null,code:`new go.Diagram(. . ., {\r
    . . .,\r
    layout: new go.TreeLayout({ isInitial: false, isOngoing: false }, . . .),\r
    "InitialLayoutCompleted": e => {\r
      // if not all Nodes have real locations, force a layout to happen\r
      if (!e.diagram.nodes.all(n => n.location.isReal())) {\r
        e.diagram.layoutDiagram(true);\r
      }\r
    }\r
  })`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Node(. . ., {\r
      layoutConditions: go.LayoutConditions.Standard & ~go.LayoutConditions.NodeSized,\r
      . . .\r
    })\r
    . . .`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1izj10d`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};