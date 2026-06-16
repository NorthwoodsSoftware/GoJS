import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Link labels`,figures:!0},htmlContent:`<h1>Labels on Links</h1>\r
<p>\r
  It is common to add annotations or decorations on a link, particularly text.\r
</p>\r
\r
<h2 id="SimpleLinkLabels"><a class="not-prose heading-anchor" href="#SimpleLinkLabels">Simple Link labels</a></h2>\r
<p>\r
  By default if you add a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> to a <a href="../api/symbols/Link.html" target="api">Link</a>, it will be positioned at the middle of the link.\r
  In this example, we just add a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> to the link and bind its <a href="../api/symbols/TextBlock.html#text" target="api">TextBlock.text</a> property to the link data's "text" property.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Note that clicking on the text label results in selection of the whole Link.\r
</p>\r
\r
<p>\r
  Although it is commonplace to use a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> as the link label, it can be any <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> such as a <a href="../api/symbols/Shape.html" target="api">Shape</a>\r
  or an arbitrarily complex <a href="../api/symbols/Panel.html" target="api">Panel</a>. This also works if the link is orthogonally routed or bezier-curved. Here is an example\r
  of a simple panel label on both a straight link and an orthogonally routed link:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  Although positioning the label at the middle of the link is the default behavior, you can set <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> properties\r
  that start with "segment" to specify exactly where and how to arrange the object along the route of the link.\r
</p>\r
\r
<h2 id="LinkLabelSegmentIndexAndSegmentFraction"><a class="not-prose heading-anchor" href="#LinkLabelSegmentIndexAndSegmentFraction">Link label segmentIndex and segmentFraction</a></h2>\r
<p>\r
  Set the <a href="../api/symbols/GraphObject.html#segmentindex" target="api">GraphObject.segmentIndex</a> property in order to specify which segment of the link route the object should be on.\r
  Set the <a href="../api/symbols/GraphObject.html#segmentfraction" target="api">GraphObject.segmentFraction</a> property to control how far the object should be,\r
  as a fraction from the start of the segment (zero) to the end of the segment (one).\r
</p>\r
<p>\r
  When setting the <a href="../api/symbols/GraphObject.html#segmentindex" target="api">GraphObject.segmentIndex</a> property to NaN, the fraction will be calculated\r
  along the entire link route instead of a particular segment.\r
</p>\r
<p>\r
  In the case of a link that comes from a node with no <a href="../api/symbols/GraphObject.html#fromspot" target="api">GraphObject.fromSpot</a> (i.e. <a href="../api/symbols/Spot.html#none" target="api">Spot.None</a>)\r
  and goes to a node with no <a href="../api/symbols/GraphObject.html#tospot" target="api">GraphObject.toSpot</a>, there may be only one segment in the link, segment number zero.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  In the case of a link that has many segments in it, you will want to specify different segment numbers.\r
  Orthogonal links, for example, typically have 6 points in the route, which means five segments numbered from 0 to 4.\r
  Segments 0 and 4 are the stubs on the ends of the link that connect to the other node (or to its ports if it has any)\r
  and segments 1, 2, and 3 are the long segments that make up most of the link.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  However, you can also count segments backwards from the "to" end of the link. -1 is the last segment, -2 is the next to last, etc.\r
  When you use a negative segment index, the segment fraction goes from 0 closest to the "to" end to 1\r
  for the end of that segment that is farthest back along the route from the "to" end.\r
  Thus a segmentIndex of -1 with a segmentFraction of 0 is the very end point of the link route.\r
  A segmentIndex of -1 with a segmentFraction of 1 is the same point as segmentIndex -2 and segmentFraction 0.\r
</p>\r
<p>\r
  For labels that belong near the "to" end of a link, you will normally use negative values for <a href="../api/symbols/GraphObject.html#segmentindex" target="api">GraphObject.segmentIndex</a>.\r
  This convention works better when the number of segments in a link is unknown or may vary.\r
</p>\r
\r
<p>\r
  Lastly, one can specify a segmentIndex of NaN to have the fraction calculated along the entire link route instead of just a particular segment.\r
  This is also helpful when the number of segments of a link is unknown or varying. The following example uses this to place labels at the\r
  1/3 and 2/3 points on the entire link. Try selecting the link and reshaping it with the control point handles:\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<h3 id="more-dynamic-link-labels"><a class="not-prose heading-anchor" href="#more-dynamic-link-labels">More dynamic Link labels</a></h3>\r
\r
<p>\r
  This behavior can be made interactive be defining custom tools that modify the segment fraction or segment index.\r
  See the <a href="../samples/LinkLabelOnPathDragging" target="_blank">Dragging Link Label along Path</a> sample for an example;\r
</p>\r
<p>\r
  If you desire even more dynamic behavior from link labels, you can create "link label" nodes that are really\r
  <a href="../api/symbols/Node.html" target="api">Node</a>s but look like link labels because they are referenced by their associated link (and/or vice versa).\r
  An example of this can be found in the <a href="../samples/linksToLinks" target="_blank">Connecting Links to Links Using Link Label Nodes</a> sample.\r
</p>\r
\r
<h2 id="LinkLabelSegmentOffsetAndAlignmentFocus"><a class="not-prose heading-anchor" href="#LinkLabelSegmentOffsetAndAlignmentFocus">Link label segmentOffset and alignmentFocus</a></h2>\r
<p>\r
  There are two ways of making small adjustments to the position of a label object given a particular point on a link segment\r
  specified by the segment index and fractional distance.\r
</p>\r
<p>\r
  The <a href="../api/symbols/GraphObject.html#segmentoffset" target="api">GraphObject.segmentOffset</a> property controls where to position the object relative to the point on a link segment\r
  determined by the <a href="../api/symbols/GraphObject.html#segmentindex" target="api">GraphObject.segmentIndex</a> and <a href="../api/symbols/GraphObject.html#segmentfraction" target="api">GraphObject.segmentFraction</a> properties.\r
  The offset is not a simple offset of the point -- it is rotated according to the angle of that link segment.\r
  A positive value for the Y offset moves the label element towards the right side of the link, as seen going in the\r
  direction of the link.\r
  Naturally a negative value for the Y offset moves it towards the left side. Try dragging the harbor and cove nodes\r
  to see this in action:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  If you drag one node around in a circle around the other one, you will see how the "Port" and "Starboard" labels\r
  always stay on their correct sides, just as they would on a ship sailing in the direction of the arrow.\r
</p>\r
\r
<p>\r
  Another way to change the effective offset is by changing the spot in the object that is being positioned relative to the link segment point.\r
  You can do that by setting the <a href="../api/symbols/GraphObject.html#alignmentfocus" target="api">GraphObject.alignmentFocus</a>, which as you have seen above defaults to <a href="../api/symbols/Spot.html#center" target="api">Spot.Center</a>.\r
  (<a href="../api/symbols/GraphObject.html#alignmentfocus" target="api">GraphObject.alignmentFocus</a> is also used by other <a href="../api/symbols/Panel.html" target="api">Panel</a> types, which is why its name does not start with "segment".)\r
  In the following example, the "West" label has its alignment focus set just to the right of its text and the "East" label has\r
  the opposite. This causes each to appear on their respective sides regardless of the orientation of the link.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  Yet you may instead want to control the angle of the individual labels based on the angle of the link segment.\r
</p>\r
\r
<h2 id="LinkLabelSegmentOrientation"><a class="not-prose heading-anchor" href="#LinkLabelSegmentOrientation">Link label segmentOrientation</a></h2>\r
<p>\r
  The <a href="../api/symbols/GraphObject.html#segmentorientation" target="api">GraphObject.segmentOrientation</a> property controls the angle of the label object relative to the angle of the link segment.\r
  There are several possible values that you can use.\r
  The default orientation is <a href="../api/symbols/Orientation.html#none" target="api">Orientation.None</a>, meaning no rotation at all.\r
  <a href="../api/symbols/Orientation.html#along" target="api">Orientation.Along</a> is commonly used to have the object always rotated at the same angle as the link segment.\r
  <a href="../api/symbols/Orientation.html#upright" target="api">Orientation.Upright</a> is like <a href="../api/symbols/Orientation.html#along" target="api">Orientation.Along</a>,\r
  but is often used when there is text in the label, to make it easier to read.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
<p>\r
  Now if you move a node around you will always be able to read the label texts, and yet each label stays on its intended side of the link,\r
  as seen going in the direction of the link.\r
</p>\r
<p>\r
  This points out a difference between a segmentIndex/segmentFraction pair of 0/1 and 1/0.\r
  Although they both refer to the same point, the angle associated with the first pair is the angle of the first segment (segment 0),\r
  whereas the angle associated with the second pair is the angle of the second segment.\r
</p>\r
\r
<h2 id="LinkLabelsNearEnds"><a class="not-prose heading-anchor" href="#LinkLabelsNearEnds">Link labels near the ends</a></h2>\r
<p>\r
  For labels that are near either end of a link, it may be convenient to set the <a href="../api/symbols/GraphObject.html#segmentoffset" target="api">GraphObject.segmentOffset</a> to Point(NaN, NaN).\r
  This causes the offset to be half the width and half the height of the label object.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
\r
<h2 id="Arrowheads"><a class="not-prose heading-anchor" href="#Arrowheads">Arrowheads</a></h2>\r
<p>\r
  Now that you know more about the <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> "segment..." properties for controlling the position and angle of objects in a <a href="../api/symbols/Link.html" target="api">Link</a>,\r
  it is easy to explain how arrowheads are defined.\r
  Arrowheads are just labels: <a href="../api/symbols/Shape.html" target="api">Shape</a>s that are initialized in a convenient manner.\r
</p>\r
<p>\r
  You can see a copy of all of the built-in arrowhead definitions in this file: <a href="../extensions/Arrowheads.js">Arrowheads.js</a>.\r
</p>\r
<p>\r
  Here are the equivalent settings for initializing an arrowhead <a href="../api/symbols/Shape.html" target="api">Shape</a> by setting <a href="../api/symbols/Shape.html#toarrow" target="api">Shape.toArrow</a> to "Standard" with diagram zoomed in 2x:\r
</p>\r
\r
<!-- CODE_BLOCK_9 -->\r
`,codeBlocks:[{id:`simple`,code:`diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      // this is the link shape (the line)\r
      new go.Shape({ stroke: "dimgray" }),\r
      // this is an arrowhead\r
      new go.Shape({\r
        toArrow: "Standard", fill: "dimgray", stroke: "dimgray"\r
      }),\r
      // this is a Link label\r
      new go.TextBlock()\r
        .bind("text")\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "lightgray" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta", loc: "200 50" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta", text: "a label" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`labels`,code:`diagram.linkTemplate =\r
  new go.Link()\r
    .bind("routing")\r
    .add(\r
      new go.Shape({ stroke: "dimgray" }),\r
      new go.Shape({ toArrow: "Standard", fill: "dimgray", stroke: "dimgray" }),\r
      // this whole Panel is a link label\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("HexagonalCapsule",\r
            { fill: "yellow", stroke: "gray" }),\r
          new go.TextBlock({ margin: 1 })\r
            .bind("text")\r
        )\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "lightgray" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta", loc: "300 50" },\r
  { key: "Gamma", loc: "0 100" },\r
  { key: "Delta", loc: "300 150" }\r
];\r
const linkDataArray = [\r
  // added information for link label\r
  { from: "Alpha", to: "Beta", text: "hello!" },\r
  { from: "Gamma", to: "Delta", text: "on an ortho link", routing: go.Routing.Orthogonal }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`fraction`,code:`// creates a label panel, represents a station plate\r
function stop(name, fraction) {\r
  return new go.Panel("Auto", { segmentIndex: 0, segmentFraction: fraction })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#fbf4e3", stroke: "#8a5a2b" }),\r
      new go.TextBlock(name, {\r
        margin: new go.Margin(1, 4), font: "italic 10pt Georgia, serif",\r
        stroke: "#5c3a21"\r
      })\r
    );\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      // the shapes make a train track style link\r
      new go.Shape({\r
        isPanelMain: true, stroke: "#6b4423", strokeWidth: 2\r
      }),\r
      new go.Shape({\r
        isPanelMain: true, stroke: "#6b4423", strokeWidth: 8,\r
        strokeDashArray: [2, 7]\r
      }),\r
      // labels with segment fractions given\r
      stop("Oakdale", 0.15),\r
      stop("Riverton", 0.5),\r
      stop("Pinehurst", 0.85)\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#fbf4e3", stroke: "#8a5a2b", strokeWidth: 2\r
      }),\r
      new go.TextBlock({\r
        margin: 4, font: "bold 11pt Georgia, serif", stroke: "#4a2f17"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Ashford", loc: "0 0" },\r
  { key: "Belmont", loc: "300 200" }\r
];\r
const linkDataArray = [\r
  { from: "Ashford", to: "Belmont" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.div.style.backgroundColor = "#efe3c8";`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`fractionOrtho`,code:`// creates a label panel, represents a station plate\r
function stop(name, index) {\r
  return new go.Panel("Auto", { segmentIndex: index, segmentFraction: 0.5 })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#fbf4e3", stroke: "#8a5a2b" }),\r
      new go.TextBlock(name, {\r
        margin: new go.Margin(1, 4), font: "italic 10pt Georgia, serif",\r
        stroke: "#5c3a21"\r
      })\r
    );\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal })\r
    .add(\r
      new go.Shape({\r
        isPanelMain: true, stroke: "#6b4423", strokeWidth: 2\r
      }),\r
      new go.Shape({\r
        isPanelMain: true, stroke: "#6b4423", strokeWidth: 8,\r
        strokeDashArray: [2, 7]\r
      }),\r
      // labels with segment fractions given\r
      stop("Junction", 1),\r
      stop("Crossing", 2),\r
      stop("Depot", 3)\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#fbf4e3", stroke: "#8a5a2b", strokeWidth: 2\r
      }),\r
      new go.TextBlock({\r
        margin: 4, font: "bold 11pt Georgia, serif", stroke: "#4a2f17"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Harbor", loc: "0 0" },\r
  { key: "Summit", loc: "300 200" }\r
];\r
const linkDataArray = [\r
  { from: "Harbor", to: "Summit" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.div.style.backgroundColor = "#efe3c8";`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`fractionNoIndex`,code:`// segmentIndex NaN places it by fraction of the whole route\r
function stop(name, fraction) {\r
  return new go.Panel("Auto", { segmentIndex: NaN, segmentFraction: fraction })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#fbf4e3", stroke: "#8a5a2b" }),\r
      new go.TextBlock(name, {\r
        margin: new go.Margin(1, 4), font: "italic 10pt Georgia, serif",\r
        stroke: "#5c3a21"\r
      })\r
    );\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier, curviness: 50, reshapable: true })\r
    .add(\r
      new go.Shape({\r
        isPanelMain: true, stroke: "#6b4423", strokeWidth: 2\r
      }),\r
      new go.Shape({\r
        isPanelMain: true, stroke: "#6b4423", strokeWidth: 8,\r
        strokeDashArray: [2, 7]\r
      }),\r
      // fractions measured along the whole route, not one segment\r
      stop("Brookline", 0.33),\r
      stop("Hawthorne", 0.67)\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#fbf4e3", stroke: "#8a5a2b", strokeWidth: 2\r
      }),\r
      new go.TextBlock({\r
        margin: 4, font: "bold 11pt Georgia, serif", stroke: "#4a2f17"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Glenwood", loc: "0 0" },\r
  { key: "Fairhaven", loc: "300 200" }\r
];\r
const linkDataArray = [\r
  { from: "Glenwood", to: "Fairhaven" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.div.style.backgroundColor = "#efe3c8";`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`offset`,code:`function sign(label, offset, fill) {\r
  return new go.Panel("Auto", { segmentOffset: offset })\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: fill, stroke: "white", strokeWidth: 2\r
      }),\r
      new go.TextBlock(label, {\r
        margin: new go.Margin(1, 4), stroke: "white",\r
        font: "10pt Verdana, sans-serif"\r
      })\r
    );\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      // a dashed route with an arrowhead showing the direction of travel\r
      new go.Shape({\r
        stroke: "white", strokeWidth: 3, strokeDashArray: [7, 5]\r
      }),\r
      new go.Shape({ toArrow: "Standard", fill: "white", stroke: "white" }),\r
      // negative Y: left of travel\r
      sign("Port", new go.Point(0, -35), "#ef476f"),\r
      // positive Y: right of travel\r
      sign("Starboard", new go.Point(0, 35), "#06d6a0"),\r
      new go.Shape({\r
        geometryString: "F M 0 5 Q 3 3 10 3 V 0 H 50" +\r
          "Q 60 3 65 13 Q 60 23 50 26 H 10 V 23 Q 3 23 0 21 z",\r
        fill: "white", stroke: "#415a77", strokeWidth: 2, scale: 0.7,\r
        segmentFraction: 0.5, segmentOrientation: go.Orientation.Along\r
        // see following section for orientation\r
      })\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#7f4f24", stroke: "white", strokeWidth: 2\r
      }),\r
      new go.TextBlock({\r
        margin: 6, font: "bold 11pt Verdana, sans-serif", stroke: "white"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Harbor", loc: "0 0" },\r
  { key: "Cove", loc: "250 80" }\r
];\r
const linkDataArray = [\r
  { from: "Harbor", to: "Cove" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.div.style.backgroundColor = "#0077b6";`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`alignmentFocus`,code:`function sign(label, focus, fill) {\r
  return new go.Panel("Auto", { alignmentFocus: focus })\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: fill, stroke: "white", strokeWidth: 2\r
      }),\r
      new go.TextBlock(label, {\r
        margin: new go.Margin(1, 4), stroke: "white",\r
        font: "10pt Verdana, sans-serif"\r
      })\r
    );\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier, curviness: 30 })\r
    .add(\r
      new go.Shape({\r
        stroke: "white", strokeWidth: 3, strokeDashArray: [7, 5]\r
      }),\r
      new go.Shape({ toArrow: "Standard", fill: "white", stroke: "white" }),\r
      // focus on the plate's right edge keeps it to the left, and vice versa\r
      sign("West", new go.Spot(1, 0.5, 30, 0), "#ef476f"),\r
      sign("East", new go.Spot(0, 0.5, -30, 0), "#06d6a0"),\r
      new go.Shape({\r
        geometryString: "F M 0 5 Q 3 3 10 3 V 0 H 50" +\r
          "Q 60 3 65 13 Q 60 23 50 26 H 10 V 23 Q 3 23 0 21 z",\r
        fill: "white", stroke: "#415a77", strokeWidth: 2, scale: 0.7,\r
        segmentFraction: 0.5, segmentOrientation: go.Orientation.Along\r
        // see following section for orientation\r
      })\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#7f4f24", stroke: "white", strokeWidth: 2\r
      }),\r
      new go.TextBlock({\r
        margin: 6, font: "bold 11pt Verdana, sans-serif", stroke: "white"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Wharf", loc: "0 0" },\r
  { key: "Marina", loc: "200 200" }\r
];\r
const linkDataArray = [\r
  { from: "Wharf", to: "Marina" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.div.style.backgroundColor = "#0077b6";`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`orient`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Rectangle", { stroke: "#00a80e", strokeWidth: 3 }),\r
      new go.TextBlock({\r
        margin: 8, stroke: "#00a80e", font: "11pt Monospace"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
const textLabelSettings = { segmentOrientation: go.Orientation.Upright, stroke: "#00a80e", background: "#191c19", font: "9pt Monospace" };\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({\r
        stroke: "#00a80e", strokeDashArray: [5, 5], strokeWidth: 3\r
      }),\r
      new go.Shape({ toArrow: "Standard", fill: "#00a80e", stroke: "#00a80e" }),\r
      new go.TextBlock("left",{\r
        segmentOffset: new go.Point(0, -15), ...textLabelSettings\r
      }),\r
      new go.TextBlock("middle", {\r
        segmentOffset: new go.Point(0, 0), ...textLabelSettings\r
      }),\r
      new go.TextBlock("right", {\r
        segmentOffset: new go.Point(0, 15), ...textLabelSettings\r
      })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "200 0" },\r
  { key: "Beta", loc: "0 50" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.div.style.backgroundColor = "#191c19";`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`nearEnds`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Rectangle", { stroke: "#00a80e", strokeWidth: 3 }),\r
      new go.TextBlock({\r
        margin: 8, stroke: "#00a80e", font: "11pt Monospace"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
const textLabelSettings = { segmentOrientation: go.Orientation.Upright, stroke: "#00a80e", background: "#191c19", font: "9pt Monospace" };\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({\r
        stroke: "#00a80e", strokeDashArray: [5, 5], strokeWidth: 3\r
      }),\r
      new go.Shape({ toArrow: "Standard", fill: "#00a80e", stroke: "#00a80e" }),\r
      new go.TextBlock("from", {\r
        segmentIndex: 0, segmentOffset: new go.Point(NaN, NaN),\r
        ...textLabelSettings\r
      }),\r
      new go.TextBlock("to", {\r
        segmentIndex: -1, segmentOffset: new go.Point(NaN, NaN),\r
        ...textLabelSettings\r
      })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta", loc: "200 50" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.div.style.backgroundColor = "#191c19";`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`arrowheads`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "lightgray" }),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({ stroke: "dimgray" }),\r
      new go.Shape({\r
        // the following are the same as { toArrow: "Standard" }:\r
        fill: "dimgray",\r
        stroke: "dimgray",\r
        segmentIndex: -1,\r
        segmentOrientation: go.Orientation.Along,\r
        alignmentFocus: go.Spot.Right,\r
        geometry: go.Geometry.parse("F1 m0 0 l8 4  -8 4  2 -4 z")\r
      })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "Alpha", loc: "0 0" },\r
  { key: "Beta", loc: "100 25" }\r
];\r
const linkDataArray = [\r
  { from: "Alpha", to: "Beta" }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
diagram.scale = 2;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`6zdr55`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};