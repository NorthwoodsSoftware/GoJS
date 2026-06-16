import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Shapes`,category:`Building Blocks`,categoryOrder:2,figures:!0},htmlContent:`<h1>Shapes</h1>\r
<p>\r
  Use the <a href="../api/symbols/Shape.html" target="api">Shape</a> class to paint a geometrical figure.\r
  You can control what kind of shape is drawn and how its outline is stroked and how its interior is filled.\r
</p>\r
<p>\r
  Shapes, like <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s and <a href="../api/symbols/Picture.html" target="api">Picture</a>s, are "atomic" objects -- they cannot contain any other objects.\r
  So a Shape will never draw some text or an image.\r
</p>\r
\r
<h2 id="Figures"><a class="not-prose heading-anchor" href="#Figures">Figures</a></h2>\r
<p>\r
  You can set the <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> property to commonly named kinds of shapes.\r
  When using the constructor, you can pass the figure name as a string argument.\r
  You may also need to set the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a> properties,\r
  although it is also common to have the size determined by the Panel that the shape is in.\r
</p>\r
<p>Here are several of the most often used Shape figures. You can click to select a Node and resize the Shape:</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  You can see all of the named geometrical figures in the <a href="../samples/shapes" target="samples">shapes</a> sample.\r
  Some of the most commonly used figures are predefined in the GoJS library.\r
  But most figures are defined in the <a href="../extensions/Figures.js" target="_blank">Figures.js</a> file in the extensions directory.\r
</p>\r
\r
<h2 id="FillAndStrokes"><a class="not-prose heading-anchor" href="#FillAndStrokes">Fill and strokes</a></h2>\r
<p>\r
  The <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> property specifies the brush used to draw the shape's outline.\r
  The <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> property specifies the brush used to fill the shape's outline.\r
  Additional "stroke..." properties also control how the shape's outline is drawn.\r
  The most common such property is <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a>.\r
  It is often set to zero so that no stroke is drawn at all -- only the fill occupying the geometry of the shape.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  The <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> and <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> properties take <a href="../api/symbols/Brush.html" target="api">Brush</a>es but most often are given a CSS color string\r
  to specify a solid color brush.\r
  These two properties default to a solid black brush.\r
  However it is common to assign one of them to be either null or "transparent".\r
  A null brush means that nothing is drawn for that stroke or fill.\r
  A transparent brush produces the same appearance but different hit-testing behavior.\r
  A shape with a null <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> produces a hollow shape -- clicking inside the shape will not hit that shape and\r
  thus not select the <a href="../api/symbols/Node.html" target="api">Node</a> that that shape is in.\r
  But a shape with a "transparent" fill produces a filled shape -- a mouse event inside the shape will hit that shape.\r
</p>\r
<p>\r
  Note that specifying a null or transparent <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> still means that the size of the shape includes the width of the stroke,\r
  even though nothing is drawn there.\r
  If you don't want any stroke at all, it is usually best to set <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a> to zero.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  Try clicking inside each of the shapes to see which ones will respond to the click and cause the whole panel to be selected.\r
  Note that with the "transparent" fill you can see the diagram background, yet when you click in it you hit the Shape.\r
  Only the last one, with a null fill, is truly hollow.\r
  Clicking in the last shape will only result in a click on the diagram background, unless you click on the stroke outline.\r
</p>\r
\r
<h2 id="Geometry"><a class="not-prose heading-anchor" href="#Geometry">Geometry</a></h2>\r
<p>\r
  Every <a href="../api/symbols/Shape.html" target="api">Shape</a> gets its "shape" from the <a href="../api/symbols/Geometry.html" target="api">Geometry</a> that it uses.\r
  A Geometry is just a saved description of how to draw some lines given a set of points.\r
  Setting <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> uses a named predefined geometry that can be parameterized.\r
  In general it is most efficient to give a Shape a Geometry rather than giving it a figure.\r
</p>\r
<p>\r
  If you want something different from all of the predefined figures in GoJS,\r
  you can construct your own Geometry and set <a href="../api/symbols/Shape.html#geometry" target="api">Shape.geometry</a>.\r
  One way of building your own <a href="../api/symbols/Geometry.html" target="api">Geometry</a> is by building <a href="../api/symbols/PathFigure.html" target="api">PathFigure</a>s consisting of <a href="../api/symbols/PathSegment.html" target="api">PathSegment</a>s.\r
  This is often necessary when building a geometry whose points are computed based on some data.\r
</p>\r
<p>\r
  But an easier way to create constant geometries is by calling <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> to read a string that has a geometry-defining path expression,\r
  or to set <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a> to such a string.\r
  These expressions have commands for moving an imaginary "pen".\r
  The syntax for geometry paths is documented in the <a href="geometry">Geometry Path Strings</a> page.\r
</p>\r
<p>\r
  This example creates a Geometry that looks like the letter "W" and uses it in several Shape objects with different stroke characteristics.\r
  Geometry objects may be shared by multiple Shapes.\r
  Note that there may be no need to specify the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>,\r
  because the Geometry defines its own size.\r
  If the size is set or if it is imposed by the containing Panel, the effective geometry is determined by the <a href="../api/symbols/Shape.html#geometrystretch" target="api">Shape.geometryStretch</a> property.\r
  Depending on the value of the geometryStretch property, this may result in extra empty space or the clipping of the shape.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<!-- CODE_BLOCK_4 -->\r
\r
<h2 id="AngleAndScale"><a class="not-prose heading-anchor" href="#AngleAndScale">Angle and scale</a></h2>\r
<p>\r
  Besides setting the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a> to declare the size of a <a href="../api/symbols/Shape.html" target="api">Shape</a>, you can\r
  also set other properties to affect the appearance. For example, you can set the <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> and <a href="../api/symbols/GraphObject.html#scale" target="api">GraphObject.scale</a> properties.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>The <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> and <a href="../api/symbols/GraphObject.html#background" target="api">GraphObject.background</a> brushes scale and rotate along with the shape.</p>\r
<p>\r
  The following shapes show how three separate linear gradient brushes are drawn for the\r
  <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a>, <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a>, and <a href="../api/symbols/GraphObject.html#background" target="api">GraphObject.background</a> of a Shape whose angle isn't zero.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<h2 id="SimpleIconsUsingFonts"><a class="not-prose heading-anchor" href="#SimpleIconsUsingFonts">Simple icons using fonts</a></h2>\r
<p>\r
  Note: for showing simple icons you may want to use an icon font.\r
  See the example using a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> rather than a <a href="../api/symbols/Shape.html" target="api">Shape</a> at:\r
  <a href="textBlocks#IconFonts">Icon Fonts</a>\r
</p>\r
\r
<h2 id="CustomFigures"><a class="not-prose heading-anchor" href="#CustomFigures">Custom figures</a></h2>\r
<p>\r
  As shown above, one can easily create custom shapes just by setting <a href="../api/symbols/Shape.html#geometry" target="api">Shape.geometry</a> or <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a>. This is particularly convenient when\r
  importing SVG. However it is also possible to define additional named figures, which is convenient when you want to be able to easily specify or change the\r
  geometry of an existing Shape by setting or data binding the <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> property.\r
</p>\r
<p>\r
  The static function <a href="../api/symbols/Shape.html#definefiguregenerator" target="api">Shape.defineFigureGenerator</a> can be used to define new figure names. The second argument is a function that is called with the\r
  <a href="../api/symbols/Shape.html" target="api">Shape</a> and the expected width and height in order to generate and return a <a href="../api/symbols/Geometry.html" target="api">Geometry</a>. This permits parameterization of the geometry based on\r
  properties of the Shape and the expected size. In particular, the <a href="../api/symbols/Shape.html#parameter1" target="api">Shape.parameter1</a> and <a href="../api/symbols/Shape.html#parameter2" target="api">Shape.parameter2</a> properties can be considered, in\r
  addition to the width and height, while producing the Geometry. To be valid, the generated Geometry bounds must be equal to or less than the supplied width\r
  and height.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
<p>\r
  Note how the <a href="../api/symbols/Shape.html#parameter1" target="api">Shape.parameter1</a> property, data bound to the "p1" property, controls how thick the sides are. The <a href="../api/symbols/Shape.html#parameter2" target="api">Shape.parameter2</a> property, data\r
  bound to the "p2" property, controls how thick the top and bottom are. You can see the effects by resizing a shape. Notice how it doesn't bother drawing the\r
  empty area in the middle when there isn't enough width or height.\r
</p>\r
<p>\r
  You can find the definitions for many figures at: <a href="../extensions/Figures.js" target="_blank">Figures.js</a> or\r
  <a href="../extensionsJSM/Figures.ts" target="_blank">Figures.ts</a>\r
</p>\r
`,codeBlocks:[{id:`figureShapes`,code:`diagram.div.style.backgroundColor = "#0b0f19";\r
diagram.layout = new go.GridLayout({\r
  wrappingColumn: 3, // three shapes per row\r
  spacing: new go.Size(1, 40),\r
  isOngoing: false // don't relayout when people resize objects\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical",\r
    {\r
      locationSpot: go.Spot.Center,\r
      resizable: true, resizeObjectName: 'myShape',\r
      selectionAdorned: false\r
    })\r
  .add(\r
    new go.Shape({\r
      name: 'myShape',\r
      width: 50, height: 50,\r
      fill: "rgba(0, 242, 254, 0.2)",\r
      stroke: "#00f2fe",\r
      strokeWidth: 2\r
    })\r
      .bind("figure", "fig")\r
      .bind("width"),\r
    new go.TextBlock({\r
      stroke: 'white', font: '15px monospace', margin: 10\r
    })\r
      .bind('text', 'fig')\r
  );\r
\r
const figures1 = [ "Capsule", "Ellipse" ];\r
const figures2 = [\r
  "Rectangle", "RoundedRectangle", "Diamond", "TriangleRight",\r
  "TriangleDown", "TriangleLeft", "TriangleUp", "MinusLine",\r
  "PlusLine", "XLine"\r
];\r
const nodeDataArray = [\r
  // making capsule and ellipse a bit wider than they are tall,\r
  // to show the difference between them\r
  ...figures1.map(fig => ({ fig, width: 70 })),\r
  ...figures2.map(fig => ({ fig }))\r
];\r
diagram.model = new go.Model(nodeDataArray);`,isExecutable:!0,animation:!1,split:50,language:`js`,initiallyVisible:!0},{id:`strokedShapes`,code:`diagram.layout = new go.GridLayout({ wrappingColumn: 2 });\r
\r
const nodeDataArray = [\r
  {\r
    title: "Defaults", desc: "Default fill & stroke are black"\r
  },\r
  {\r
    title: "Stroke Only", desc: "Transparent fill",\r
    stroke: "slategray", strokeWidth: 2,\r
    fill: "transparent"\r
  },\r
  {\r
    title: "Fill Only", desc: "strokeWidth: 0",\r
    strokeWidth: 0,\r
    fill: "darkorange",\r
  },\r
  {\r
    title: "Combined", desc: "strokeWidth: 5",\r
    stroke: "darkslateblue", strokeWidth: 5,\r
    fill: "lavender",\r
  }\r
];\r
\r
diagram.nodeTemplate = new go.Node("Vertical")\r
  .add(\r
    // shape\r
    new go.Shape("ElectricalHazard", {\r
      margin: 32,\r
      width: 60, height: 60\r
    })\r
      .bind("fill")\r
      .bind("stroke")\r
      .bind("strokeWidth"),\r
\r
    // label\r
    new go.Panel("Vertical", { margin: 10, defaultAlignment: go.Spot.Center })\r
      .add(\r
        new go.TextBlock({ font: "bold 10pt sans-serif" })\r
          .bind("text", "title"),\r
\r
        new go.TextBlock({\r
          font: "8.5pt sans-serif",\r
          stroke: "slategray",\r
          margin: 4,\r
          desiredSize: new go.Size(140, NaN),\r
          textAlign: "center"\r
        })\r
          .bind("text", "desc")\r
      )\r
  );\r
\r
diagram.model = new go.Model(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`fill`,code:`diagram.div.style.backgroundColor = "whitesmoke";\r
diagram.layout = new go.GridLayout({ spacing: new go.Size(20, 20) });\r
\r
const nodeDataArray = [\r
  { fill: "white", desc: "Can click inside" },\r
  { fill: "transparent", desc: "Can click inside" },\r
  { fill: null, desc: "Can click border only" }\r
];\r
\r
const settings = {\r
  figure: "SpeechBubble",\r
  stroke: "darkgray",\r
  strokeWidth: 2,\r
  margin: 24\r
};\r
\r
diagram.nodeTemplate = new go.Node("Vertical")\r
  .add(\r
    new go.Shape(settings)\r
      .bind("fill"),\r
\r
    // labels\r
    new go.Panel("Vertical", {\r
      margin: new go.Margin(8, 0, 0, 0),\r
    })\r
      .add(\r
        // fill label\r
        new go.TextBlock({\r
          font: "bold 10pt monospace",\r
          stroke: "black"\r
        })\r
          .bind("text", "fill", f => f === null ? "null" : f),\r
\r
        // description\r
        new go.TextBlock({\r
          font: "8pt sans-serif",\r
          margin: new go.Margin(4, 0, 0, 0)\r
        })\r
          .bind("text", "desc")\r
          .bind("stroke", "fill", f => f === null ? "lightcoral" : "olivedrab")\r
      )\r
  );\r
\r
diagram.model = new go.Model(nodeDataArray);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`geometries-dotted`,code:`const W_geometry = go.Geometry.parse("M 0,10 L 20,50 40,15 60,50 80,10", false);\r
\r
diagram.add(\r
  new go.Node("Horizontal")\r
    .add(\r
      new go.Shape({ geometry: W_geometry, stroke: "purple", strokeWidth: 3, strokeDashArray: [8, 4], margin: new go.Margin(0, 20, 0, 0) }),\r
      new go.Shape({ geometry: W_geometry, stroke: "purple", strokeWidth: 2, strokeDashArray: [6, 6, 2, 2] })\r
    )\r
);`,isExecutable:!0,animation:!1,split:75,minHeight:0,language:`js`,initiallyVisible:!0},{id:`geometries`,code:`const W_geometry = go.Geometry.parse("M 0,10 L 20,50 40,15 60,50 80,10", false);\r
\r
diagram.layout = new go.GridLayout({\r
  wrappingColumn: 3 /* 3 shapes per row */,\r
  spacing: new go.Size(40, 40)\r
});\r
\r
const colors = [\r
  "#003ba6" /* blue */,\r
  "#a6001e" /* red */,\r
  "#477a5c" /* green */\r
];\r
\r
const strokeJoins = ["miter", "bevel", "round"];\r
const strokeCaps  = ["round", "butt", "square"];\r
\r
// These 3 lines create the data for the model\r
const nodeDataArray = strokeJoins.flatMap((join, r) =>\r
  strokeCaps.map((cap, c) => ({ join, cap, color: colors[r] }))\r
);\r
\r
diagram.nodeTemplate = new go.Node()\r
  .add(\r
    new go.Panel("Spot")\r
      .add(\r
        // W shape\r
        new go.Shape({\r
          geometry: W_geometry,\r
          strokeWidth: 10,\r
        })\r
          .bind("stroke", "color")\r
          // This is where the actual values of strokeJoin and strokeCap are set\r
          .bind("strokeJoin", "join")\r
          .bind("strokeCap", "cap"),\r
\r
        // strokeJoin label\r
        new go.TextBlock({ font: "9pt monospace", alignment: go.Spot.BottomRight })\r
          .bind("text", "join")\r
          .bind("stroke", "color"),\r
\r
        // strokeCap label\r
        new go.TextBlock({ font: "9pt monospace", alignment: go.Spot.TopLeft })\r
          .bind("text", "cap")\r
          .bind("stroke", "color")\r
      )\r
  );\r
\r
diagram.model = new go.Model(nodeDataArray);`,isExecutable:!0,animation:!1,split:50,language:`js`,initiallyVisible:!0},{id:`transformedShapes`,code:`diagram.div.style.backgroundColor = "#f9f6f0";\r
diagram.layout = new go.GridLayout({ spacing: new go.Size(40, 40) });\r
\r
const nodeDataArray = [\r
  {}, // The default angle is 0 and the default scale is 1.\r
  { scale: 2, angle: 45 },\r
  { scale: 1.3, angle: 180 },\r
  { scale: 0.5 }\r
];\r
\r
diagram.nodeTemplate = new go.Node("Horizontal", {\r
    background: "white",\r
    padding: 12,\r
\r
    rotatable: true,\r
    selectionObjectName: "SHAPE", // bounding box goes around shape\r
    rotateObjectName: "SHAPE",\r
\r
  })\r
  .add(\r
    // Shape\r
    new go.Panel("Table", { minSize: new go.Size(100, 100) })\r
      .add(\r
        new go.Shape("TriangleUp", {\r
          name: "SHAPE",\r
          alignment: go.Spot.Center,\r
          width: 32,\r
          height: 32,\r
          fill: "#e6dfd3",\r
          stroke: "#c97a63",\r
          strokeWidth: 2\r
        })\r
        .bindTwoWay("angle", undefined, undefined, Math.round)\r
        .bind("scale")\r
      ),\r
\r
      // labels\r
      new go.TextBlock(\r
        {\r
          stroke: "#3d3a35",\r
          font: "10pt Georgia, serif",\r
          alignment: go.Spot.Left,\r
          margin: new go.Margin(0, 12, 0, 20),\r
        })\r
        .bind("text", "", data => {\r
          const a = data.angle !== undefined ? data.angle : 0;\r
          const s = data.scale !== undefined ? data.scale : 1;\r
          return \`Angle: \${a}\\nScale: \${s}\`;\r
        })\r
  );\r
\r
diagram.model = new go.Model(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`backgrounds`,code:`const bluepurple = new go.Brush("Linear", { 0.0: "lightblue", 1.0: "purple" });\r
\r
const settings = {\r
  figure: "Club", width: 40, height: 40,\r
  fill: "transparent", stroke: "white",\r
  strokeWidth: 3,\r
  scale: 2,\r
  margin: new go.Margin(15, 25, 15, 25)\r
}\r
\r
const settingsFill = { ...settings, fill: bluepurple, strokeWidth: 0 };\r
const settingsStroke = { ...settings, stroke: bluepurple, strokeWidth: 3 };\r
const settingsBg = { ...settings, background: bluepurple };\r
\r
diagram.add(\r
  new go.Node("Table")\r
    .add(\r
      new go.Shape({ row: 0, column: 0, angle: 0 }).set(settingsFill),\r
      new go.Shape({ row: 0, column: 1, angle: 45 }).set(settingsFill),\r
\r
      new go.Shape({ row: 1, column: 0, angle: 0 }).set(settingsStroke),\r
      new go.Shape({ row: 1, column: 1, angle: 45 }).set(settingsStroke),\r
\r
      new go.Shape({ row: 2, column: 0, angle: 0 }).set(settingsBg),\r
      new go.Shape({ row: 2, column: 1, angle: 45 }).set(settingsBg)\r
    ));`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`defineFigure`,code:`diagram.div.style.backgroundColor = "#0b0f19";\r
\r
go.Shape.defineFigureGenerator('FramedRectangle', (shape, w, h) => {\r
  let param1 = shape ? shape.parameter1 : NaN;\r
  let param2 = shape ? shape.parameter2 : NaN;\r
  if (isNaN(param1))\r
      param1 = 8; // default values PARAMETER 1 is for WIDTH\r
  if (isNaN(param2))\r
      param2 = 8; // default values PARAMETER 2 is for HEIGHT\r
  const geo = new go.Geometry();\r
  const fig = new go.PathFigure(0, 0, true);\r
  geo.add(fig);\r
  // outer rectangle, clockwise\r
  fig.add(new go.PathSegment(go.SegmentType.Line, w, 0));\r
  fig.add(new go.PathSegment(go.SegmentType.Line, w, h));\r
  fig.add(new go.PathSegment(go.SegmentType.Line, 0, h).close());\r
  if (param1 < w / 2 && param2 < h / 2) {\r
      // inner rectangle, counter-clockwise\r
      fig.add(new go.PathSegment(go.SegmentType.Move, param1, param2)); // subpath\r
      fig.add(new go.PathSegment(go.SegmentType.Line, param1, h - param2));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w - param1, h - param2));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w - param1, param2).close());\r
  }\r
  geo.setSpots(0, 0, 1, 1, param1, param2, -param1, -param2);\r
  return geo;\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot", {\r
        selectionAdorned: false,  // don't show the standard selection handle\r
        resizable: true, resizeObjectName: "SHAPE",  // user can resize the Shape\r
      })\r
    .add(\r
      new go.Shape('FramedRectangle', {\r
            name: "SHAPE",\r
            desiredSize: new go.Size(100, 50),\r
            fill: "rgba(0, 242, 254, 0.2)",\r
            stroke: "#00f2fe",\r
            strokeWidth: 2\r
          })\r
        .bind("parameter1", "p1")\r
        .bind("parameter2", "p2"),\r
      new go.TextBlock({ stroke: "#00f2fe" })\r
        .bindObject("text", "", s => \`\${s.parameter1}, \${s.parameter2}\`, null, "SHAPE")\r
    );\r
\r
diagram.model = new go.Model([\r
  { },  // unspecified parameter values treated as 8 by "FramedRectangle" figure\r
  { p1: 0 },\r
  { p1: 5 },\r
  { p1: 15 },\r
  { p1: 5, p2: 5 },\r
  { p1: 15, p2: 15 },\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`egvmoa`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};