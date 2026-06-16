import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Links`,category:`Core Concepts`,categoryOrder:4},htmlContent:`<h1>Links</h1>\r
<p>\r
  Use the <a href="../api/symbols/Link.html" target="api">Link</a> class to implement a visual relationship between nodes.\r
  See samples that make use of customized Links in the <a href="../samples/#links">samples index</a>.\r
</p>\r
\r
<h2 id="CreatingLinks"><a class="not-prose heading-anchor" href="#CreatingLinks">Creating Links</a></h2>\r
<p>\r
  Links are normally created in the following ways:\r
</p>\r
<ul>\r
  <li>Defining link data objects in the <a href="../api/symbols/GraphLinksModel.html#linkdataarray" target="api">GraphLinksModel.linkDataArray</a>.</li>\r
  <li>Creating link data objects using <a href="../api/symbols/GraphLinksModel.html#addlinkdata" target="api">GraphLinksModel.addLinkData</a>. This will update all diagrams that are using the model.</li>\r
  <li>Defining or creating a node data object with a property of name "parent" and a value of another node's key in a <a href="../api/symbols/TreeModel.html" target="api">TreeModel</a>.\r
    <ul>\r
      <li>Alternatively, a key other than "parent" can be used by setting <a href="../api/symbols/TreeModel.html#nodeparentkeyproperty" target="api">TreeModel.nodeParentKeyProperty</a>.</li>\r
    </ul>\r
  </li>\r
  <li>Users, when using <a href="tools#LinkingToolAndRelinkingTool">Linking Tools</a>.</li>\r
  <li>Using <a href="../api/symbols/LinkingTool.html#insertlink" target="api">LinkingTool.insertLink</a> on GraphLinksModels or TreeModels.</li>\r
  <li>Using the LinkingTool or RelinkingTool to create <a href="links#DisconnectedLinks">Disconnected Links</a>.</li>\r
</ul>\r
\r
<p>\r
  <a href="../api/symbols/LinkingTool.html#insertlink" target="api">LinkingTool.insertLink</a> is ideal when adding links while having minimal information about the model. An example of it can be found in the <a href="../samples/orgChartEditor" target="samples">Organizational Chart Editor</a> sample.\r
</p>\r
\r
<h2 id="NondirectionalLinks"><a class="not-prose heading-anchor" href="#NondirectionalLinks">Non-directional Links</a></h2>\r
<p>\r
  The simplest links are those without arrowheads to indicate a visual direction.\r
  Either the relationship really is non-directional, or the direction is implied by the organization of the diagram.\r
</p>\r
<p>\r
  The template contains a <a href="../api/symbols/Shape.html" target="api">Shape</a>, which is the main element and the line that is drawn between nodes.\r
  After the link's route is computed, the main Shape will get a <a href="../api/symbols/Geometry.html" target="api">Geometry</a> based on the points in the route.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  By default, the way that the model and diagram know about the node data references of a link data is by looking at its from and to properties.\r
  If you want to use different properties on the link data, set <a href="../api/symbols/GraphLinksModel.html#linkfromkeyproperty" target="api">GraphLinksModel.linkFromKeyProperty</a> to be the name of\r
  the property that results in the node data's key, and similarly for the <a href="../api/symbols/GraphLinksModel.html#linktokeyproperty" target="api">GraphLinksModel.linkToKeyProperty</a>.\r
</p>\r
\r
<h2 id="Arrowheads"><a class="not-prose heading-anchor" href="#Arrowheads">Arrowheads</a></h2>\r
<p>\r
  Often links need to indicate directionality by using arrowheads.\r
  GoJS makes it easy to create common arrowheads: just add a Shape and set its <a href="../api/symbols/Shape.html#toarrow" target="api">Shape.toArrow</a> property.\r
  Setting that property will automatically assign a <a href="../api/symbols/Geometry.html" target="api">Geometry</a> to the <a href="../api/symbols/Shape.html#geometry" target="api">Shape.geometry</a> and\r
  will set other properties so that the arrowhead is positioned at the head of the link and is pointing in the correct direction.\r
  Of course you can set the other Shape properties such as <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> in order to customize the appearance of the arrowhead.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  You can see all of the predefined arrowhead types in the <a href="../samples/arrowheads" target="samples">Arrowheads Sample</a>.\r
  For more information on gradients, see <a href="brush">Brushes</a>.\r
</p>\r
<p>\r
  You can also have an arrowhead at the start of the link: set the <a href="../api/symbols/Shape.html#fromarrow" target="api">Shape.fromArrow</a> property.\r
  Note that an arrowhead normally goes along the path of the link regardless of its position on the path,\r
  so just as with a real arrow, setting <code>{ fromArrow: "TripleFeathers" }</code> has the "feathers" pointing forward.\r
  If the link is meant to be bi-directional, the arrowhead name for the "from" end of a link should start with the string "Backward...".\r
</p>\r
\r
<h2 id="Routing"><a class="not-prose heading-anchor" href="#Routing">Routing</a></h2>\r
<p>\r
  If you want to customize the path that each <a href="../api/symbols/Link.html" target="api">Link</a> takes, you need to set properties on the link.\r
  The property that has the most general effect on the points that the link's route follows is <a href="../api/symbols/Link.html#routing" target="api">Link.routing</a>.\r
</p>\r
<p>\r
  This example shows the two most common routing values: <a href="../api/symbols/Routing.html#normal" target="api">Routing.Normal</a> (the default) and <a href="../api/symbols/Routing.html#orthogonal" target="api">Routing.Orthogonal</a>.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  Note that the computed route also depends on the properties of the node, including its shape.\r
  There are other properties, including <a href="../api/symbols/GraphObject.html#fromspot" target="api">GraphObject.fromSpot</a> and <a href="../api/symbols/GraphObject.html#tospot" target="api">GraphObject.toSpot</a>, that affect the route.\r
  For more discussion about spots, please read this learn page: <a href="connectionPoints">Link connection points</a>.\r
  Furthermore, some <a href="../api/symbols/Layout.html" target="api">Layout</a>s set properties on links to control their routing according to what the layout expects.\r
</p>\r
\r
<p>\r
  You can also set <a href="../api/symbols/Link.html#routing" target="api">Link.routing</a> to <a href="../api/symbols/Routing.html#avoidsnodes" target="api">Routing.AvoidsNodes</a>:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  If you move the nodes interactively, you can see how the link's route adjusts to avoid crossing over nodes.\r
  Notice that a small gap between nodes might not be considered wide enough for links to go through.\r
</p>\r
<p>\r
  If a node is very close to or overlaps with either the link's <a href="../api/symbols/Link.html#fromnode" target="api">Link.fromNode</a> or <a href="../api/symbols/Link.html#tonode" target="api">Link.toNode</a>\r
  and would block the link's route, it ignores that node, treating it as if it were just an extension of the connected node.\r
  Also, if no node-avoiding route exists because there is a ring of nodes around one of the connected nodes,\r
  the routing algorithm will give up and cross over some nodes anyway.\r
</p>\r
<p>\r
  You can declare that it is OK to route through a node by setting <a href="../api/symbols/Node.html#avoidable" target="api">Node.avoidable</a> to false.\r
  This is commonly done for <a href="../api/symbols/Group.html" target="api">Group</a>s to allow links connecting outside of the group to route nicely within the group.\r
</p>\r
<p>\r
  Note that the use of AvoidsNodes routing is distinctly slower than normal Orthogonal routing, especially for large diagrams.\r
</p>\r
\r
<p>\r
  For more complex and customizable routing behaviors, you can use the <a href="../api/symbols/Router.html" target="api">Router</a> class.\r
  Routers operate on the collection of links in a <a href="../api/symbols/Diagram.html" target="api">Diagram</a> or <a href="../api/symbols/Group.html" target="api">Group</a> after the <a href="../api/symbols/Layout.html" target="api">Layout</a> has been completed.\r
  See the learn page on <a href="routers">Routers</a> for more information.\r
</p>\r
\r
<h3 id="EndSegmentLengths"><a class="not-prose heading-anchor" href="#EndSegmentLengths">End segment lengths</a></h3>\r
<p>\r
  One might want to change the length of the link segment attached to the node. As in, require the node to go straight for a certain distance before letting it\r
  route normally. The properties that control this are <a href="../api/symbols/GraphObject.html#fromendsegmentlength" target="api">GraphObject.fromEndSegmentLength</a> and <a href="../api/symbols/GraphObject.html#toendsegmentlength" target="api">GraphObject.toEndSegmentLength</a>.\r
  While this can be useful for nearly all routing/curve combinations, a common usage is in orthognal routing.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  Using <a href="../api/symbols/Link.html#fromspot" target="api">Link.fromSpot</a> and <a href="../api/symbols/Link.html#tospot" target="api">Link.toSpot</a>, these links have been forced to take a roundabout route.\r
  In the top pair of nodes, you can see the default behavior of the routing in this case.\r
  In the bottom pair, you can see a shortened <code>fromEndSegmentLength</code> and a lengthened <code>toEndSegmentLength</code>\r
</p>\r
\r
<h2 id="CurveCurvinessCorner"><a class="not-prose heading-anchor" href="#CurveCurvinessCorner">Curves</a></h2>\r
<p>\r
  Once the <a href="../api/symbols/Link.html#routing" target="api">Link.routing</a> determines the route (i.e., the sequence of points) that the link will take,\r
  other properties control the details of how the link shape gets its path geometry.\r
  The first such property is <a href="../api/symbols/Link.html#curve" target="api">Link.curve</a>, which controls whether the link shape has basically straight segments or is a big curve.\r
</p>\r
<p>\r
  The default value for <a href="../api/symbols/Link.html#curve" target="api">Link.curve</a> is <a href="../api/symbols/Curve.html#none" target="api">Curve.None</a>, which produces link shapes with straight segments as you see above.\r
</p>\r
<p>\r
  A value of <a href="../api/symbols/Curve.html#bezier" target="api">Curve.Bezier</a> produces a naturally curved path for the link shape.\r
</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  If there are multiple links, GoJS will automatically compute reasonable values for the curviness of each link, unless you assign\r
  <a href="../api/symbols/Link.html#curviness" target="api">Link.curviness</a> explicitly.\r
</p>\r
\r
<p>\r
  You can control how curved it is by setting the <a href="../api/symbols/Link.html#curviness" target="api">Link.curviness</a> property. The default produces a slight curve.\r
</p>\r
\r
<p>\r
  Another kind of curviness comes from rounded corners when the <a href="../api/symbols/Link.html#routing" target="api">Link.routing</a> is Orthogonal or AvoidsNodes.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>\r
  Another kind of curviness (or lack thereof) comes from setting <a href="../api/symbols/Link.html#curve" target="api">Link.curve</a> to <a href="../api/symbols/Curve.html#jumpover" target="api">Curve.JumpOver</a> or <a href="../api/symbols/Curve.html#jumpgap" target="api">Curve.JumpGap</a>.\r
  JumpOver causes little "hops" in the path of an orthogonal link that crosses another orthogonal link that also has a JumpOver/JumpGap curve.\r
  JumpGap causes little "gaps" in the path instead.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
<p>\r
  This example uses a custom font for icons. See more about fonts in the <a href="textBlocks#IconFonts">TextBlocks</a> page.\r
</p>\r
\r
<p>\r
  Note that the use of link jumping is distinctly slower than normal links because all of the crossing points must be computed\r
  and the geometry of the link shape will be more complex.\r
</p>\r
\r
<h2 id="EasierClickingOnLinks"><a class="not-prose heading-anchor" href="#EasierClickingOnLinks">Easier clicking on Links</a></h2>\r
<p>\r
  It can be difficult to click on links that have a thin <a href="../api/symbols/Link.html#path" target="api">Link.path</a>.\r
  One could set the <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a> to a larger value, such as <code>8</code>, but you may not want that appearance.\r
\r
  One common solution is to add a thick path Shape that remains transparent.\r
  This is easily done by setting <code>{ stroke: "transparent", strokeWidth: 8 }</code>.\r
  However, if you want to keep the original path Shape, <em>both</em> Shapes need to be declared as the\r
  "main" element for the Link by setting <a href="../api/symbols/GraphObject.html#ispanelmain" target="api">GraphObject.isPanelMain</a> to true.\r
  This indicates to the Link panel that all such Shapes should get the same computed Geometry for the link path.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  In this example, you will find it easier to select the link than it would be without the extra transparent link path shape.\r
</p>\r
<p>\r
  The transparent shape can also be used for highlighting purposes.\r
  For example, to implement the effect of highlighting the link when the mouse passes over it,\r
  add <a href="../api/symbols/GraphObject.html#mouseenter" target="api">GraphObject.mouseEnter</a> and <a href="../api/symbols/GraphObject.html#mouseleave" target="api">GraphObject.mouseLeave</a> event handlers:\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>\r
  Pass the mouse over the link to see the effect. Such feedback also helps the user click or context click on the link.\r
</p>\r
\r
<h2 id="ShortLengths"><a class="not-prose heading-anchor" href="#ShortLengths">Short lengths</a></h2>\r
<p>\r
  Note that in the example above with the thick black path shape, the arrowhead seems to have disappeared due to the thickness of the link path.\r
  One can avoid the problem by increasing the <a href="../api/symbols/GraphObject.html#scale" target="api">GraphObject.scale</a> of the arrowhead, perhaps to 2.  This would make the arrowhead clearly visible, but would in turn show that the arrowhead is still obscured at the very end of the link path,\r
  where it is too wide to show the point of the arrowhead.\r
</p>\r
\r
<p>\r
  That problem can be avoided by setting <a href="../api/symbols/Link.html#toshortlength" target="api">Link.toShortLength</a> to a value such as 8, depending on the kind of arrowhead used.\r
  The path geometry will be shortened by that distance so that the link path does not interfere with the arrowhead. This example shows the before\r
  and after of this change.\r
</p>\r
\r
<!-- CODE_BLOCK_10 -->\r
\r
<p>\r
  There is also a <a href="../api/symbols/Link.html#fromshortlength" target="api">Link.fromShortLength</a> property to control how far the "from" end of the link path is drawn.\r
  If there is an end segment, the distance that it can be shortened is limited to the corresponding <a href="../api/symbols/Link.html#toendsegmentlength" target="api">Link.toEndSegmentLength</a>\r
  or <a href="../api/symbols/Link.html#fromendsegmentlength" target="api">Link.fromEndSegmentLength</a>.\r
  Note also that the short length may be negative, which would cause the link path to be drawn longer -- into the port at which the link is connected.\r
</p>\r
\r
<h2 id="DisconnectedLinks"><a class="not-prose heading-anchor" href="#DisconnectedLinks">Disconnected Links</a></h2>\r
<p>\r
  The normal expectation is that one cannot have a link relationship unless it connects two nodes.\r
  However, GoJS does support the creation and manipulation of links that have either or both of the <a href="../api/symbols/Link.html#fromnode" target="api">Link.fromNode</a>\r
  and <a href="../api/symbols/Link.html#tonode" target="api">Link.toNode</a> properties with null values.\r
  This is demonstrated by the <a href="../samples/draggableLink">Draggable Link</a> sample.\r
</p>\r
<p>\r
  Both ends of the link must be connected to nodes in order for the standard link routing to operate.\r
  If a link does not know where to start or where to end, it cannot compute a route or a position for the link.\r
  However, you can provide a route by setting or binding <a href="../api/symbols/Link.html#points" target="api">Link.points</a> to a list of two or more Points.\r
  That will automatically give the link a position so that it can be seen in the diagram.\r
</p>\r
<p>\r
  The linking tools, <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a> and <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a>, normally do not permit the creation or reconnection of links that connect with "nothing".\r
  However, you can set <a href="../api/symbols/LinkingBaseTool.html#isunconnectedlinkvalid" target="api">LinkingBaseTool.isUnconnectedLinkValid</a> to true to allow the user to do so, as the Draggable Link sample demonstrates.\r
</p>\r
<p>\r
  Links cannot normally be dragged unless they are part of a collection that includes the connected nodes.\r
  However, you can set <a href="../api/symbols/DraggingTool.html#dragslink" target="api">DraggingTool.dragsLink</a> to true to allow the user to drag a solitary <a href="../api/symbols/Link.html" target="api">Link</a>.\r
  This mode allows the user to disconnect a link by dragging it away from the node(s)/port(s) to which it was attached.\r
  It also allows the user to reconnect one or both ends of the link by dropping it so that the end(s) are at valid port(s).\r
  This is demonstrated by the Draggable Link sample.\r
</p>\r
\r
<h2 id="further-reading"><a class="not-prose heading-anchor" href="#further-reading">Further Reading</a></h2>\r
\r
<ul>\r
  <li><a href="connectionPoints">Link Connection Points</a></li>\r
  <li><a href="routers">Routers</a></li>\r
  <li><a href="linkLabels">Link Labels</a></li>\r
  <li><a href="nodes">Nodes</a></li>\r
</ul>\r
`,codeBlocks:[{id:`noArrowheads`,code:`diagram.scale = 2;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape({ fill: "#f5f5f5", strokeWidth: .1 })\r
        .bind("figure"),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), stroke: "#555" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()       // the whole link panel\r
    .add(\r
      new go.Shape()  // the link shape, default black stroke\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0",   figure: "RoundedRectangle" },\r
  { key: "Beta",  loc: "80 50", figure: "Diamond" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`arrowheads`,code:`diagram.scale = 1.75;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape({ fill: "#f5f5f5", strokeWidth: .1 })\r
        .bind("figure"),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), stroke: "#555" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({ // the link shape\r
        stroke: new go.Brush(go.BrushType.Linear, { 0: "limegreen", 1: "skyblue" })\r
      }),\r
      new go.Shape({ // the arrowhead (with toArrow defined)\r
        toArrow: "Triangle",\r
        stroke: "skyblue",\r
        fill: go.Brush.lighten("skyblue")\r
      }),\r
      new go.Shape({ // another arrowhead (with fromArrow defined)\r
        fromArrow: "BackwardOpenTriangle",\r
        stroke: "limegreen"\r
      })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0",    figure: "RoundedRectangle", color: "limegreen" },\r
  { key: "Beta",  loc: "100 50", figure: "Diamond",          color: "skyblue" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`routing`,code:`diagram.div.style.backgroundColor = "#333"\r
diagram.scale = 1.75;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#444", stroke: "#999" }),\r
      new go.Panel("Horizontal", { margin: 5 })\r
        .add(\r
          new go.Shape("Circle", { width: 10, height: 10, stroke: null, margin: 5 })\r
            // Node.data.status -> Shape.fill\r
            .bind("fill", "status"),\r
          new go.TextBlock({\r
            font: "11pt monospace",\r
            stroke: "#eee",\r
            spacingAbove: 5,\r
            margin: new go.Margin(0, 15)\r
          })\r
            .bind("text", "key")\r
        )\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    // link.data.routing => link.routing\r
    .bind("routing", "routing")\r
    .add(\r
      new go.Shape({ stroke: "#999", strokeWidth: 1.5 }),\r
      new go.Shape({ toArrow: "Triangle", fill: "#999", stroke: "#999" })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "build", loc: "0 0",    status: "limegreen" },\r
  { key: "test",  loc: "-50 80", status: "goldenrod" },\r
  { key: "lint",  loc: "60 80",  status: "limegreen" }\r
];\r
const linkDataArray = [\r
  { from: "build", to: "test", routing: go.Routing.Normal },\r
  { from: "build", to: "lint", routing: go.Routing.Orthogonal }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`avoidsNodes`,code:`diagram.scale = 1.6;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .bind("avoidable")\r
    .bind("angle")\r
    .add(\r
      new go.Shape({ fill: "#f5f5f5", strokeWidth: .5 })\r
        .bind("figure")\r
        .bind("fill"),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), stroke: "#555" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.AvoidsNodes })  // link route should avoid nodes\r
    .add(\r
      new go.Shape()\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta",  loc: "180 0" },\r
  { key: "Obstacle 1", loc: "120 -50",  figure: "RoundedRectangle", angle: 90 },\r
  { key: "Obstacle 2", loc: "10 40", figure: "RoundedRectangle" },\r
\r
\r
  { key: "Gamma", loc: "0 150" },\r
  { key: "Delta", loc: "180 150" },\r
  { key: "Obstacle 3", loc: "120 95",  figure: "RoundedRectangle", angle: 90 },\r
  { key: "avoidable: false", loc: "10 190", figure: "RoundedRectangle", fill: "#fab040", avoidable: false }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" },\r
  { from: "Gamma", to: "Delta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`endseg`,code:`diagram.div.style.backgroundColor = "#333"\r
diagram.scale = 2;\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { locationSpot: go.Spot.Center })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape({ figure: "RoundedRectangle", fill: "#eee", strokeWidth: 0 }),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), stroke: "#222" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
    routing: go.Routing.Orthogonal,\r
    fromSpot: go.Spot.Left, toSpot: go.Spot.Right\r
  })\r
    .bind("fromEndSegmentLength")\r
    .bind("toEndSegmentLength")\r
    .add(\r
      new go.Shape({ stroke: "#eee" }),\r
      new go.Shape({ toArrow: "Triangle", stroke: "#eee", fill: "#eee" })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta",  loc: "60 50" },\r
  { key: "Gamma",  loc: "0 85" },\r
  { key: "Delta",  loc: "60 135" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" },\r
  { from: "Gamma", to: "Delta", fromEndSegmentLength: 4, toEndSegmentLength: 40 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`beziers`,code:`diagram.contentAlignment = go.Spot.Center;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 0 })\r
        .bind("fill"),\r
      new go.TextBlock({ margin: 5, font: "9pt cursive" })\r
        .bind("text", "key")\r
        .bind("stroke")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier })\r
    .bind("curviness")\r
    .add(\r
      new go.Shape()\r
        // Link.data.dotted -> Shape.strokeDashArray ([4, 4] if true, null (solid) if false)\r
        .bind("strokeDashArray", "dotted", v => v ? [4, 4] : null),\r
      new go.Shape( { toArrow: "Chevron" })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Earth", loc: "0 0",     fill: "skyblue" },\r
  { key: "Moon",  loc: "80 -40",  fill: "gray" },\r
  { key: "Mars",  loc: "150 130", fill: "brown", stroke: "white" },\r
];\r
const linkDataArray = [   // multiple links between the same nodes\r
  { from: "Earth", to: "Mars" },\r
  { from: "Earth", to: "Mars", dotted: true, curviness: -100 },\r
\r
  { from: "Earth", to: "Moon" },\r
  { from: "Moon",  to: "Earth", dotted: true },\r
  { from: "Earth", to: "Moon" },\r
  { from: "Moon",  to: "Earth", dotted: true }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`corners`,code:`diagram.scale = 1.2;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape({ fill: "#f5f5f5", strokeWidth: .1 }),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), stroke: "#555" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
    routing: go.Routing.AvoidsNodes,\r
    corner: 10    // rounded corners\r
  })\r
    .add(\r
      new go.Shape({ strokeDashArray: [6, 3] }),\r
      new go.Shape({ toArrow: "OpenTriangle" })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha",   loc: "0 0" },\r
  { key: "Beta",    loc: "250 40" },\r
  { key: "Gamma",   loc: "100 0" },\r
  { key: "Delta",   loc: "75 50" },\r
  { key: "Epsilon", loc: "150 30" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,split:50,expanded:!0,language:`js`,initiallyVisible:!0},{id:`jumpOvers`,code:`const myFont = new FontFace("FontAwesome",\r
    "url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/webfonts/fa-solid-900.woff2)");\r
document.fonts.add(myFont);\r
\r
diagram.grid =\r
    new go.Panel("Grid", {\r
      gridCellSize: new go.Size(50, 50),\r
      opacity: 0.25,\r
      gridOrigin: new go.Point(25, 25)\r
    })\r
      .add(\r
        new go.Shape("LineH", { stroke: "black" }),\r
        new go.Shape("LineV", { stroke: "black" })\r
      );\r
\r
diagram.scale = 1.2;\r
diagram.contentAlignment = go.Spot.Center;\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { locationSpot: go.Spot.Center })\r
    .bind("location", "loc")\r
    .bind("toSpot")\r
    .add(\r
      new go.TextBlock({ font: "11pt fontawesome" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
    routing: go.Routing.Orthogonal,  // may be either Orthogonal or AvoidsNodes\r
  })\r
    .bind("curve")\r
    .add(\r
      new go.Shape({ strokeWidth: 2 }).bind('stroke'),\r
      new go.Shape({ toArrow: "Triangle" })\r
    );\r
\r
function coord(x, y) {\r
  return new go.Point(x * 50, y * 50)\r
}\r
const nodeDataArray = [\r
  { key: "Main1", text: "\\uf447",  loc: coord(0, 1) },\r
  { key: "Main2", text: "\\uf447",   loc: coord(4, 1) },\r
  { key: "Bird1", text: "\\uf520", loc: coord(1, 0) },\r
  { key: "Bird2", text: "\\uf520", loc: coord(1, 2) },\r
  { key: "Horse1", text: "\\uf6f0", loc: coord(3, 0)},\r
  { key: "Horse2", text: "\\uf6f0", loc: coord(2, 2), toSpot: go.Spot.Right }\r
];\r
const linkDataArray = [\r
  { from: "Main1",  to: "Main2", curve: go.Curve.JumpGap },\r
  { from: "Bird1", to: "Bird2", curve: go.Curve.JumpGap, stroke: 'green' },\r
  { from: "Horse1", to: "Horse2", curve: go.Curve.JumpOver, stroke: 'blue' }\r
];\r
myFont.load().then(() => {\r
  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
})`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`doublePath`,code:`diagram.scale = 1.2;\r
diagram.contentAlignment = go.Spot.Center;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape({ fill: "#f5f5f5", strokeWidth: .1 }),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), stroke: "#555" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({ isPanelMain: true, stroke: "transparent", strokeWidth: 8 }),  // thick undrawn path\r
      new go.Shape({ isPanelMain: true }),  // default stroke ({ stroke: "black", strokeWidth: 1 })\r
      new go.Shape({ toArrow: "Standard" })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta",  loc: "100 50" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`doublePathHighlight`,code:`diagram.scale = 1.2;\r
diagram.contentAlignment = go.Spot.Center;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape({ fill: "#f5f5f5", strokeWidth: .1 }),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), stroke: "#555" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
      // a mouse-over highlights the link by changing the first main path shape's stroke:\r
      mouseEnter: (e, link) => link.elt(0).stroke = "rgba(0,90,156,0.3)",\r
      mouseLeave: (e, link) => link.elt(0).stroke = "transparent"\r
    })\r
    .add(\r
      new go.Shape({ isPanelMain: true, stroke: "transparent", strokeWidth: 8 }),  // thick undrawn path\r
      new go.Shape({ isPanelMain: true }),  // default stroke === "black", strokeWidth === 1\r
      new go.Shape({ toArrow: "Standard" })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta",  loc: "100 50" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`shortLength`,code:`diagram.themeManager.set('light', {\r
  colors: { primary: "#f5ecd9" }\r
})\r
\r
diagram.scale = 1.2;\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle")\r
        .theme("fill", "primary")\r
        .theme("stroke", "primary", null, null, v => go.Brush.darkenBy(v, .5)),\r
      new go.TextBlock({ margin: new go.Margin(5, 10), font: "11pt serif" })\r
        .bind("text", "key")\r
        .theme("stroke", "primary", null, null, v => go.Brush.darkenBy(v, .5))\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
    routing: go.Routing.Orthogonal,\r
    fromSpot: go.Spot.Left, toSpot: go.Spot.Right,\r
    fromEndSegmentLength: 10,\r
    toEndSegmentLength: 40,\r
  })\r
    .bind("toShortLength")\r
    .add(\r
      new go.Shape({ isPanelMain: true, stroke: "#3a3a3a", strokeWidth: 8 }),\r
      new go.Shape({ isPanelMain: true, stroke: "#f3c14b", strokeDashArray: [5, 5] }),\r
      new go.Shape({ toArrow: "Triangle", fill: "#3a3a3a", stroke: "#3a3a3a", scale: 2 })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Manchester", loc: "0 0" },\r
  { key: "Rochester",  loc: "80 60" },\r
  { key: "Boston",     loc: "0 100" },\r
  { key: "Ridgeston",  loc: "80 160" }\r
];\r
const linkDataArray = [\r
  { from: "Manchester", to: "Rochester" },\r
  { from: "Boston",     to: "Ridgeston", toShortLength: 10 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1g2dfsf`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};