import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Link connection points`,figures:!0},htmlContent:`<h1>Link connection points on Nodes</h1>\r
<p>\r
  There is flexibility in controlling exactly how and where a link connects with a node.\r
  In the previous examples both ends of each link have always ended at the edge of the node.\r
  But you can specify the <a href="../api/symbols/Spot.html" target="api">Spot</a> on a node at which a link terminates.\r
</p>\r
\r
<h2 id="NonRectangularNodes"><a class="not-prose heading-anchor" href="#NonRectangularNodes">Non-rectangular Nodes</a></h2>\r
<p>\r
  When a <a href="../api/symbols/Node.html" target="api">Node</a> does not have a rectangular shape, by default links will end where the line toward the\r
  center of the node intersects with the edge of the node.\r
</p>\r
<p>\r
  Here is a demonstration of that -- drag one of the nodes around and watch how the link always connects to\r
  the nearest intersection or to the center of the node.\r
  This example includes circles centered at both ends of the link, to make it clear that the link route really\r
  ends right at the edge of the node rather than the end being hidden underneath the node.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="ToSpotAndFromSpot"><a class="not-prose heading-anchor" href="#ToSpotAndFromSpot">toSpot and fromSpot</a></h2>\r
<p>\r
  You can easily require links to end at a particular point within the bounds of the node, rather than at the nearest edge intersection. Set the\r
  <a href="../api/symbols/GraphObject.html#tospot" target="api">GraphObject.toSpot</a> to a <a href="../api/symbols/Spot.html" target="api">Spot</a> value other than <a href="../api/symbols/Spot.html#none" target="api">Spot.None</a> to cause links coming into the node to end at that spot within the node, with a\r
  direction that is appropriate for the side that the spot is at. Similarly, set the <a href="../api/symbols/GraphObject.html#fromspot" target="api">GraphObject.fromSpot</a> for the ends of links coming out of the node.\r
</p>\r
\r
<p>\r
  The following examples all display the same graph but use different templates to demonstrate how links can connect to nodes. They all call this common\r
  function to define some nodes and links.\r
</p>\r
\r
<p>\r
  Let us specify that links coming into a node connect at the middle of the left side, and that links going out of a node connect at the middle of the right\r
  side. Such a convention is appropriate for diagrams that have a general sense of direction to them, such as the following one which goes from left to right.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  You can also specify that the links go into a node not at a single spot but spread out along one side. Instead of <a href="../api/symbols/Spot.html#right" target="api">Spot.Right</a> use <a href="../api/symbols/Spot.html#rightside" target="api">Spot.RightSide</a>,\r
  and similarly for the left side.\r
</p>\r
<p>\r
  This is recommended when the sides of the node are flat.\r
  In the example below, the use of <a href="../api/symbols/Spot.html#rightside" target="api">Spot.RightSide</a> and <a href="../api/symbols/Spot.html#leftside" target="api">Spot.LeftSide</a> works well with the rounded rectangle,\r
  but doesn't connect properly to the circles.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>You need to be careful to specify sensible spots for how the graph is arranged.</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h3 id="UndirectedSpots"><a class="not-prose heading-anchor" href="#UndirectedSpots">Undirected Spots</a></h3>\r
<p>\r
  When no spot is specified for the <a href="../api/symbols/GraphObject.html#fromspot" target="api">GraphObject.fromSpot</a> or <a href="../api/symbols/GraphObject.html#tospot" target="api">GraphObject.toSpot</a>, the route computation will compute the furthest point on the route\r
  of the link from the center of the port to the other port that is an intersection of an edge of the port. This was demonstrated above in\r
  <a href="#NonRectangularNodes">Non-rectangular Nodes</a>.\r
</p>\r
\r
<p>\r
  However it is possible to specify a focus point that is different from the center of the port. Use a <a href="../api/symbols/Spot.html" target="api">Spot</a> value that has <a href="../api/symbols/Spot.html#x" target="api">Spot.x</a> and\r
  <a href="../api/symbols/Spot.html#y" target="api">Spot.y</a> equal to 0.5 but with <a href="../api/symbols/Spot.html#offsetx" target="api">Spot.offsetX</a> and <a href="../api/symbols/Spot.html#offsety" target="api">Spot.offsetY</a>\r
  values that specify where you want links to focus towards, relative to the center of the port.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  In this example, links appear to be coming from and going to the different dots in each linked line. Try moving\r
  the nodes to see this behavior. Note that the <a href="../api/symbols/Spot.html#x" target="api">Spot.x</a> and <a href="../api/symbols/Spot.html#y" target="api">Spot.y</a> values are both 0.5, with fixed offsets from the center of the port.\r
</p>\r
\r
<p>\r
  It is also possible to have links go directly to particular spots within a port. Use regular <a href="../api/symbols/Spot.html" target="api">Spot</a> values, but set the Link's end segment length to\r
  zero, <a href="../api/symbols/Link.html#fromendsegmentlength" target="api">Link.fromEndSegmentLength</a> or <a href="../api/symbols/Link.html#toendsegmentlength" target="api">Link.toEndSegmentLength</a>.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  Again, links always appear to be coming from and going to the different dots, but now they go all the way rather than stop at the edge.\r
  Note that the middle line of nodes has <a href="../api/symbols/Spot.html#x" target="api">Spot.x</a> and <a href="../api/symbols/Spot.html#y" target="api">Spot.y</a> values both set to the default value of 0.5 so the links stop at the edge of the node.\r
</p>\r
\r
<h2 id="SpotsForIndividualLinks"><a class="not-prose heading-anchor" href="#SpotsForIndividualLinks">Spots for individual Links</a></h2>\r
<p>\r
  Setting the <a href="../api/symbols/GraphObject.html#fromspot" target="api">GraphObject.fromSpot</a> and <a href="../api/symbols/GraphObject.html#tospot" target="api">GraphObject.toSpot</a> properties specifies\r
  the default link connection point for all links connected with the node.\r
  What if you want some links to go to the middle-top spot but some other links to go to the\r
  middle-left spot of the same node?\r
  You can achieve this by setting the <a href="../api/symbols/Link.html#fromspot" target="api">Link.fromSpot</a> and <a href="../api/symbols/Link.html#tospot" target="api">Link.toSpot</a> properties,\r
  which take precedence over the correspondingly named properties of what the link connects with.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<h3 id="SomeLayoutsSetLinkSpots"><a class="not-prose heading-anchor" href="#SomeLayoutsSetLinkSpots">Some Layouts set Link Spots</a></h3>\r
<p>\r
  Some of the predefined <a href="../api/symbols/Layout.html" target="api">Layout</a>s automatically set <a href="../api/symbols/Link.html#fromspot" target="api">Link.fromSpot</a> and <a href="../api/symbols/Link.html#tospot" target="api">Link.toSpot</a> when the nature of the layout implies a natural direction.\r
  So, for example, a <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a> with a <a href="../api/symbols/TreeLayout.html#angle" target="api">TreeLayout.angle</a> <code>== 90</code> will set each Link's fromSpot to be <a href="../api/symbols/Spot.html#bottom" target="api">Spot.Bottom</a> and each Link's\r
  toSpot to be <a href="../api/symbols/Spot.html#top" target="api">Spot.Top</a>.\r
</p>\r
<p>\r
  You can disable the setting of Link spots for TreeLayout by setting <a href="../api/symbols/TreeLayout.html#setsportspot" target="api">TreeLayout.setsPortSpot</a> and/or <a href="../api/symbols/TreeLayout.html#setschildportspot" target="api">TreeLayout.setsChildPortSpot</a> to false. For\r
  LayeredDigraphLayout, set <a href="../api/symbols/LayeredDigraphLayout.html#setsportspots" target="api">LayeredDigraphLayout.setsPortSpots</a> to false. For ForceDirectedLayout, set <a href="../api/symbols/ForceDirectedLayout.html#setsportspots" target="api">ForceDirectedLayout.setsPortSpots</a> to false,\r
  although this is rarely needed.\r
</p>\r
`,codeBlocks:[{id:`nonRectangular`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { selectionAdorned: false })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("FivePointedStar", { fill: "#a163a2" })\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape(),\r
      // the "from" end arrowhead\r
      new go.Shape({ fromArrow: "Circle",\r
        fill: null, stroke: "red", scale: 1.5, alignmentFocus: go.Spot.Center\r
      }),\r
      // the "to" end arrowhead\r
      new go.Shape({ toArrow: "Circle",\r
        fill: null, stroke: "red", scale: 1.5, alignmentFocus: go.Spot.Center\r
      })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, loc: "0 0" },\r
  { key: 2, loc: "100 50" }\r
],\r
[\r
  { from: 1, to: 2 }\r
]);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`leftright`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    // coming out from middle-right\r
    fromSpot: go.Spot.Right,\r
    // going into middle-left\r
    toSpot: go.Spot.Left\r
  })\r
    .add(\r
      new go.Shape("Ellipse", { width: 85, height: 40, strokeWidth: 2 })\r
        .bind("fill"),\r
      new go.TextBlock({ font: "bold 8pt Tahoma"})\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape(),\r
      new go.Shape({ toArrow: "Standard", scale: 0.6 })\r
    );\r
\r
diagram.layout = new go.LayeredDigraphLayout({ setsPortSpots: false, columnSpacing: 5  });\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "LIDAR", fill: "#c4e3f2" },\r
  { key: "IMU", fill: "#c4e3f2" },\r
  { key: "Camera", fill: "#c4e3f2" },\r
  { key: "Controller", fill: "#a89be4" },\r
  { key: "Actuator 1", fill: "#e2b5e1" },\r
  { key: "Motor 1", fill: "#f9cce2" },\r
  { key: "Motor 2", fill: "#f9cce2" },\r
  { key: "Servo 1", fill: "#ffdbea" }\r
],\r
[\r
  { from: "LIDAR", to: "Controller" },\r
  { from: "IMU", to: "Controller" },\r
  { from: "Camera", to: "Controller" },\r
  { from: "Controller", to: "Actuator 1" },\r
  { from: "Controller", to: "Motor 1" },\r
  { from: "Controller", to: "Motor 2" },\r
  { from: "Controller", to: "Servo 1" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`leftrightSides`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    // coming out from right side\r
    fromSpot: go.Spot.RightSide,\r
    // going into left side\r
    toSpot: go.Spot.LeftSide\r
  })\r
    .add(\r
      new go.Shape({ strokeWidth: 2 })\r
        .bind("figure")\r
        .bind("fill")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape(),\r
      new go.Shape({ toArrow: "Standard" })\r
    );\r
\r
diagram.layout = new go.LayeredDigraphLayout({ setsPortSpots: false });\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, figure: "Circle", fill: "#ffd3b6"},\r
  { key: 2, figure: "RoundedRectangle", fill: "#ffaaa5" },\r
  { key: 3, figure: "Circle", fill: "#ff8b94" }\r
],\r
[\r
  { from: 1, to: 2 },\r
  { from: 1, to: 2 },\r
  { from: 1, to: 2 },\r
  { from: 1, to: 2 },\r
  { from: 1, to: 2 },\r
  { from: 2, to: 3 },\r
  { from: 2, to: 3 },\r
  { from: 2, to: 3 },\r
  { from: 2, to: 3 },\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`leftrightSidesBad`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    // coming out from top side -- BAD!\r
    fromSpot: go.Spot.TopSide,\r
    // going into right side -- BAD!\r
    toSpot: go.Spot.RightSide\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "lightgray", width: 50, height: 30 })\r
        .bind("fill")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape(),\r
      new go.Shape({ toArrow: "Standard", scale: 0.6  })\r
    );\r
\r
diagram.layout = new go.LayeredDigraphLayout({ setsPortSpots: false, columnSpacing: 5 });\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, fill: "#f9cce2" },\r
  { key: 2, fill: "#ffdbea" }, { key: 3, fill: "#ffdbea" }, { key: 4, fill: "#ffdbea" },\r
  { key: 5, fill: "#e2b5e1" }, { key: 6, fill: "#e2b5e1" },\r
  { key: 7, fill: "#e2b5e1" }, { key: 8, fill: "#e2b5e1" }\r
],\r
[\r
  { from: 2, to: 1 },\r
  { from: 3, to: 1 },\r
  { from: 4, to: 1 },\r
  { from: 1, to: 5 },\r
  { from: 1, to: 6 },\r
  { from: 1, to: 7 },\r
  { from: 1, to: 8 }\r
]);\r
\r
diagram.add(  // "Bad Spots" label\r
  new go.Part({ location: new go.Point(70, 150) })\r
    .add(\r
      new go.TextBlock("Bad Spots", { font: "20pt bold", stroke: "red" })\r
    )\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`noSpotFocus1`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { width: 30, height: 60, portId: "" })\r
        .bind("fill", "color")\r
        .bind("toSpot", "offsetY", n => new go.Spot(0.5, 0.5, 0, n))\r
        .bind("fromSpot", "offsetY", n => new go.Spot(0.5, 0.5, 0, -n)),\r
      new go.Shape("Circle", { width: 5, height: 5, alignment: new go.Spot(0.5, 0.5, 0, -15) }),\r
      new go.Shape("Circle", { width: 5, height: 5, alignment: new go.Spot(0.5, 0.5, 0, 0) }),\r
      new go.Shape("Circle", { width: 5, height: 5, alignment: new go.Spot(0.5, 0.5, 0, 15) })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, color: "lightblue", loc: "0 60", offsetY: 15 },\r
  { key: 2, color: "orange", loc: "90 30", offsetY: 15 },\r
  { key: 3, color: "lightgreen", loc: "180 0", offsetY: 15 },\r
  { key: 4, color: "lightblue", loc: "0 130", offsetY: 0 },\r
  { key: 5, color: "orange", loc: "90 130", offsetY: 0 },\r
  { key: 6, color: "lightgreen", loc: "180 130", offsetY: 0 },\r
  { key: 7, color: "lightblue", loc: "0 200", offsetY: -15 },\r
  { key: 8, color: "orange", loc: "90 230", offsetY: -15 },\r
  { key: 9, color: "lightgreen", loc: "180 260", offsetY: -15 }\r
],\r
[\r
  { from: 1, to: 2 }, { from: 2, to: 3 },\r
  { from: 4, to: 5 }, { from: 5, to: 6 },\r
  { from: 7, to: 8 }, { from: 8, to: 9 }\r
]);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`noSpotFocus2`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { width: 30, height: 60, portId: "",\r
        fromEndSegmentLength: 0,\r
        toEndSegmentLength: 0\r
      })\r
        .bind("fill", "color")\r
        .bind("toSpot", "offsetY", n => new go.Spot(0.5, 0.5 + n))\r
        .bind("fromSpot", "offsetY", n => new go.Spot(0.5, 0.5 - n)),\r
      new go.Shape("Circle", { width: 5, height: 5, alignment: new go.Spot(0.5, 0.75) }),\r
      new go.Shape("Circle", { width: 5, height: 5, alignment: new go.Spot(0.5, 0.5) }),\r
      new go.Shape("Circle", { width: 5, height: 5, alignment: new go.Spot(0.5, 0.25) })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, color: "lightblue", loc: "0 60", offsetY: 0.25 },\r
  { key: 2, color: "orange", loc: "90 30", offsetY: 0.25 },\r
  { key: 3, color: "lightgreen", loc: "180 0", offsetY: 0.25 },\r
  { key: 4, color: "lightblue", loc: "0 130", offsetY: 0 },\r
  { key: 5, color: "orange", loc: "90 130", offsetY: 0 },\r
  { key: 6, color: "lightgreen", loc: "180 130", offsetY: 0 },\r
  { key: 7, color: "lightblue", loc: "0 200", offsetY: -0.25 },\r
  { key: 8, color: "orange", loc: "90 230", offsetY: -0.25 },\r
  { key: 9, color: "lightgreen", loc: "180 260", offsetY: -0.25 }\r
],\r
[\r
  { from: 1, to: 2 }, { from: 2, to: 3 },\r
  { from: 4, to: 5 }, { from: 5, to: 6 },\r
  { from: 7, to: 8 }, { from: 8, to: 9 }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`customSpots`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot")\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#6D98BA", width: 70, height: 40 }),\r
      new go.Shape("Circle", { width: 6, height: 6, alignment: go.Spot.Top }),\r
      new go.Shape("Circle", { width: 6, height: 6, alignment: go.Spot.Bottom }),\r
      new go.Shape("Circle", { width: 6, height: 6, alignment: go.Spot.Left }),\r
      new go.Shape("Circle", { width: 6, height: 6, alignment: go.Spot.Right })\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    // get the link spots from the link data\r
    .bind("fromSpot", "fromSpot", go.Spot.parse)\r
    .bind("toSpot", "toSpot", go.Spot.parse)\r
    .add(\r
      new go.Shape(),\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1 }, { key: 2 },\r
  { key: 3 }, { key: 4 }\r
], [\r
  { from: 1, to: 2, fromSpot: "Top", toSpot: "Top" },\r
  { from: 1, to: 3, fromSpot: "Left", toSpot: "Left" },\r
  { from: 1, to: 4, fromSpot: "Bottom", toSpot: "Top" }\r
]);`,isExecutable:!0,animation:!1,minHeight:500,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1h94bl5`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};