import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Geometry path strings`},htmlContent:`<h1>Geometry path strings</h1>\r
<p>\r
  The GoJS <a href="../api/symbols/Geometry.html" target="api">Geometry</a> class controls the "shape" of a <a href="../api/symbols/Shape.html" target="api">Shape</a>, whereas the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> and <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> and other shape properties\r
  control the colors and appearance of the shape. For common shape figures, there are predefined geometries that can be used by setting <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a>.\r
  However, you can also define custom geometries.\r
</p>\r
<p>\r
  One can construct any Geometry by allocating and initializing a <a href="../api/symbols/Geometry.html" target="api">Geometry</a> of at least one <a href="../api/symbols/PathFigure.html" target="api">PathFigure</a> holding some <a href="../api/symbols/PathSegment.html" target="api">PathSegment</a>s. However, you\r
  may find that using the string representation of a Geometry is easier to write and save in a database. Use the static method <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> or the\r
  <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a> property to transform a geometry path string into a <a href="../api/symbols/Geometry.html" target="api">Geometry</a> object.\r
</p>\r
<p>See samples that make use of Geometries in the <a href="../samples/#geometries">samples index</a>.</p>\r
\r
<h2 id="GeometryPathStringSyntax"><a class="not-prose heading-anchor" href="#GeometryPathStringSyntax">Geometry path string syntax</a></h2>\r
<p>\r
  The syntax for a geometry path string is an extension of the SVG path string syntax. The string consists of a number of commands, each a single letter\r
  followed by some command-specific numeric parameters.\r
</p>\r
<p>\r
  Below are the possible commands along with the parameters they take. The parameter notation <code>(x y)+</code> means that the command requires exactly two\r
  parameters, but there can be 1 or more sets of parameters for each command. For instance, the <code>L (x y)+</code> command can be written as\r
  <code>L 10 10 20 20</code> to denote two straight line segments, one from the previous point on the grid to (10, 10), and the next from (10, 10) to (20, 20).\r
</p>\r
<p>\r
  Commands written with an uppercase letter indicate absolute coordinates; lowercase commands specify coordinates relative to the last command. Some commands do\r
  not care about case because they do not take coordinates as arguments.\r
</p>\r
\r
  <!-- CODE_BLOCK_0 -->\r
\r
  <p>Move commands, as described above, begin a new subpath in a <a href="../api/symbols/PathFigure.html" target="api">PathFigure</a>. A move command is needed to begin a PathFigure, and therefore must be the first segment type in the path\r
  string, with the exception of a Fill command (<code>F</code>) that can precede it.\r
  </p>\r
  <p>\r
    Additional sets of parameters for a move command are automatically considered Line commands, so <code>M 10 10 20 20</code> is identical to\r
    <code>M 10 10 L 20 20</code>.\r
  </p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p><code>L</code>: Line command adds a straight line segment from the previous point to the new point.</p>\r
<p><code>H</code>, <code>V</code>: Horizontal line command extends a straight horizontal line to a given x value.\r
Vertical line command extends a straight vertical line to a given y value.</p>\r
\r
<p><code>Q</code>: Quadratic Bezier Curves, <code>x1</code>, <code>y1</code> is the control point, <code>x</code>, <code>y</code> is the destination.</p>\r
<p><code>T</code>: Short-hand Quadratic Bezier Curves, the control point is based on SVG's path rules.\r
  See <a href="https://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands">SVG Quadratic Bezier command</a> for more details.</p>\r
\r
<p><code>C</code>: Cubic Bezier Curves. <code>x1</code>, <code>y1</code> and <code>x2</code>, <code>y2</code> are the control points. See\r
<a href="https://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands">SVG Cubic Bezier command</a> for more details.\r
\r
<p><code>S</code>: Short-hand Cubic Bezier Curves. The two control points are calculated based on\r
<a href="https://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands">SVG's path rules.</a></p>\r
\r
<p><code>A</code>: Elliptical Arcs. These follow the <a href="https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands">SVG arc conventions</a>.</p>\r
\r
<p><code>Z</code>: Denotes that the current segment is closed. This is placed after the last segment of a subpath.\r
  There are no parameters, and case does not matter with this command.</p>\r
\r
<p>Additionally there are some tokens specific to GoJS:</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<p>\r
  <code>B</code>: Arcs following GoJS canvas arc convention. These arcs create a new line from the last point in the subpath to the first point of an arc defined by\r
  the five arguments. Unlike all other commands with parameters, multiple sets of parameters are not allowed for B-arcs.\r
</p>\r
\r
<p>\r
  <code>X</code>: Used before <code>M</code> commands to denote separate PathFigures instead of a subpath. There are no parameters, and case does not matter with this\r
  command. Separate PathFigures are important when different fills are desired per figure component.\r
</p>\r
\r
<p>\r
  <code>F</code>, <code>F0</code>: This command specifies whether the current PathFigure is filled (true if <code>F</code> is present). <code>F0</code> specifies a fill with\r
  the even-odd rule (setting <a href="../api/symbols/PathFigure.html#isevenodd" target="api">PathFigure.isEvenOdd</a>) instead of the default non-zero winding number rule. <code>F1</code> is a synonym of <code>F</code>.\r
  This is placed at the beginning of a figure. Case does not matter with this command.\r
</p>\r
\r
<p>\r
  <code>U</code>: This command specifies whether the current PathFigure is shadowed (<strong>false</strong> if <code>U</code> is present. A shadowed\r
  PathFigure is the default). Shadows on shapes (and therefore PathFigures) only exist if <a href="../api/symbols/Part.html#isshadowed" target="api">Part.isShadowed</a> is set to true on the containing part. This\r
  is placed at the beginning of a figure. Case does not matter with this command.\r
</p>\r
\r
\r
<h2 id="GeometryPathStringExamples"><a class="not-prose heading-anchor" href="#GeometryPathStringExamples">Geometry path string examples</a></h2>\r
<p>Here is a simple usage of a geometry path string when initializing a <a href="../api/symbols/Shape.html" target="api">Shape</a> without setting <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a>:</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>Here is a geometry path string that uses quadratic Bezier curves:</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>This geometry uses GoJS arcs:</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  The following example fits an auto panel around a custom geometry shape. Because the default value of\r
  <a href="../api/symbols/Shape.html#geometrystretch" target="api">Shape.geometryStretch</a> causes the <a href="../api/symbols/Geometry.html" target="api">Geometry</a> to be stretched around the TextBlock, the custom geometry\r
  is also stretched to fit around the text.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  In the following Diagram we use a path string that contains three PathFigures. Note the <code>X</code> commands separating the figures and the\r
  <code>F</code> commands denoting fill.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
<p>\r
  The first two PathFigures are open; the first and third figures are filled. The <code>Z</code> command only closes the PathFigure that it ends.\r
</p>\r
\r
<p>\r
  In the following Diagram we use a path string that contains four PathFigures, two of which have a shadow. Note that figures are shadowed by default if the\r
  containing Part has <a href="../api/symbols/Part.html#isshadowed" target="api">Part.isShadowed</a> set to true. To un-shadow specific path figures we use the <code>U</code> command.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
The first and last PathFigures are shadowed; the second and third are unshadowed.\r
\r
<h3 id="EvenOdd"><a class="not-prose heading-anchor" href="#EvenOdd">Even-odd</a></h3>\r
<!-- CODE_BLOCK_9 -->\r
\r
<p>\r
  Use <code>F</code> to fill with the (default) non-zero winding number rule, or <code>F0</code> to fill with the even-odd\r
  <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule">fill rule</a>.\r
</p>\r
\r
<h3 id="GeometryParse"><a class="not-prose heading-anchor" href="#GeometryParse">Geometry.parse</a></h3>\r
<p>Use the static function <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> to convert a GoJS syntax path string into a <a href="../api/symbols/Geometry.html" target="api">Geometry</a>.</p>\r
<!-- CODE_BLOCK_10 -->\r
<p>\r
  Note that even though a <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> is specified, the shape does not appear filled. This is because the geometry's one <a href="../api/symbols/PathFigure.html" target="api">PathFigure</a> is not declared\r
  to be filled -- there is no <code>F</code> command. Importing SVG path strings that are filled also requires declaring that the geometry is filled. There are\r
  several ways to do that:\r
</p>\r
<ul>\r
  <li>Call <a href="../api/symbols/Geometry.html#fillpath" target="api">Geometry.fillPath</a> for converting the SVG path string to GoJS syntax before calling <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a>. For literal SVG path strings it\r
    is often easiest just to prefix it with "F ".\r
  </li>\r
  <li>Call <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> with a second argument that is true.</li>\r
  <li>Modify the <a href="../api/symbols/Geometry.html" target="api">Geometry</a> returned by <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a>, by setting <a href="../api/symbols/PathFigure.html#isfilled" target="api">PathFigure.isFilled</a> to true on the desired PathFigures.</li>\r
</ul>\r
<p>Here is the same example, but using a filled geometry path string.</p>\r
<!-- CODE_BLOCK_11 -->\r
\r
<p>\r
  All Geometry objects have bounds that contain the origin, so a geometry created with no points at x==0 or y==0 will have extra space to the left of it or\r
  above it. Note how there is extra space in the node on the left in the example below. To get rid of this extra space, we can call <a href="../api/symbols/Geometry.html#normalize" target="api">Geometry.normalize</a>,\r
  which modifies the Geometry's points in-place and returns a <a href="../api/symbols/Point.html" target="api">Point</a> describing the amount they were offset.\r
</p>\r
\r
<!-- CODE_BLOCK_12 -->\r
\r
<h3 id="ShapeGeometryString"><a class="not-prose heading-anchor" href="#ShapeGeometryString">Shape.geometryString</a></h3>\r
<p>\r
  The <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a> property setter parses a given GoJS path string as a Geometry, normalizes it, sets the <a href="../api/symbols/Shape.html#geometry" target="api">Shape.geometry</a> to this\r
  new Geometry, and offsets the Shape's position by the amount it was shifted in normalization. The positioning is useful when the shape is inside a\r
  <a href="../api/symbols/Panel.html#position" target="api">Panel.Position</a> panel. But when the shape is used in any other kind of panel (thus ignoring the <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a>), it is still useful to\r
  remove the extra space so that the shape fits in well with the other objects in the panel.\r
</p>\r
<p>\r
  The example below adds three Nodes with Shapes to the diagram. The first shape uses <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> to set the Shape's Geometry, the second one uses\r
  <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> and <a href="../api/symbols/Geometry.html#normalize" target="api">Geometry.normalize</a>. The third uses <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a>. Note the difference in size between the first Node and the\r
  other two.\r
</p>\r
<!-- CODE_BLOCK_13 -->\r
\r
<h2 id="FlippingGeometriesHorizontallyAndVertically"><a class="not-prose heading-anchor" href="#FlippingGeometriesHorizontallyAndVertically">Flipping geometries horizontally and vertically</a></h2>\r
<p>\r
  GoJS Geometries have several methods for modifying the geometry's points by a transformation matrix. We can use these methods to flip or mirror the geometries\r
  if needed.\r
</p>\r
<p><code>geometry.scale(-1, 1)</code> will flip a geometry horizontally. <code>geometry.scale(1, -1)</code> will flip a geometry vertically.</p>\r
\r
<!-- CODE_BLOCK_14 -->\r
\r
<h2 id="ConvertingPathStrings"><a class="not-prose heading-anchor" href="#ConvertingPathStrings">Converting path strings</a></h2>\r
<p>\r
  The static method <a href="../api/symbols/Geometry.html#stringify" target="api">Geometry.stringify</a> can be used to output a Geometry as a string. This string will have the GoJS path string syntax. You can\r
  use Geometry.stringify and Geometry.parse to data bind custom shape geometries.\r
</p>\r
\r
<p>\r
  <code>Geometry.parse(Geometry.stringify(myGeometry))</code> will return a geometry equal to <code>myGeometry</code>, though if myGeometry was created from a\r
  string, the string itself is not guaranteed to be the same. If you merely want to copy a Geometry you should use <a href="../api/symbols/Geometry.html#copy" target="api">Geometry.copy</a>.\r
</p>\r
\r
<!-- CODE_BLOCK_15 -->\r
\r
<p>Because of the additional non-SVG commands, a string generated from <a href="../api/symbols/Geometry.html#stringify" target="api">Geometry.stringify</a> will not necessarily be a valid SVG path.</p>\r
<p>\r
  The static method <a href="../api/symbols/Geometry.html#fillpath" target="api">Geometry.fillPath</a> takes a path string of either syntax and adds <code>F</code> tokens before each PathFigure that does not have them.\r
  Because SVG path strings are not considered to be "filled" by themselves, if you are converting an SVG Path shape to GoJS you will want to call\r
  <a href="../api/symbols/Geometry.html#fillpath" target="api">Geometry.fillPath</a> on the SVG string.\r
</p>\r
<!-- CODE_BLOCK_16 -->\r
The result can then be passed to <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> or <a href="../api/symbols/Shape.html#geometrystring" target="api">Shape.geometryString</a>.\r
\r
<h2 id="ParameterizedGeometries"><a class="not-prose heading-anchor" href="#ParameterizedGeometries">Parameterized Geometries</a></h2>\r
<p>\r
  Although individual <a href="../api/symbols/Geometry.html" target="api">Geometry</a> objects cannot be dynamically parameterized based on the intended size or other properties, the <a href="../api/symbols/Shape.html" target="api">Shape</a> class does\r
  support such parameterization via <a href="../api/symbols/Shape.html#definefiguregenerator" target="api">Shape.defineFigureGenerator</a>. When you set or bind the <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a> property, the shape will call the named\r
  figure generator to generate a Geometry appropriate for the desired width and height and other Shape properties.\r
</p>\r
<p>\r
  You can see the definitions of all of the predefined figures in the extensions file:\r
  <a href="../extensions/Figures.js" target="_blank">Figures.js</a>.\r
</p>\r
<p>\r
  The example below defines a custom figure named <code>"MyPlus"</code> that draws a plus/cross shape. The generator function takes the <a href="../api/symbols/Shape.html" target="api">Shape</a> along\r
  with the desired width <code>w</code> and height <code>h</code>, and uses <a href="../api/symbols/Shape.html#parameter1" target="api">Shape.parameter1</a> to control the arm thickness as a fraction of the smaller\r
  dimension, with the default being .3. The same figure name is then used by several shapes at different sizes and different parameters. The generator\r
  function is called each time to parametrize a new geometry.\r
</p>\r
<!-- CODE_BLOCK_17 -->\r
`,codeBlocks:[{id:null,code:`M (x y)+`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// Line command\r
L (x y)+\r
// Horizontal line command\r
H (x)+\r
// Vertical line command\r
V (y)+\r
\r
// Quadratic Bezier\r
Q (x1 y1 x y)+\r
// Short-hand Quadratic Bezier\r
T (x y)+\r
\r
// Cubic Bezier\r
C (x1 y1 x2 y2 x y)+\r
// Short-hand Cubic Bezier\r
S (x2 y2 x y)+\r
\r
// Arc command\r
A (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+\r
// Close path command\r
Z`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// Canvas Arc\r
B (startAngle, sweepAngle, centerX, centerY, radiusX, radiusY)\r
// Separate PathFigures\r
X\r
// Fill commands (start of string only)\r
F\r
F0\r
// Un-shadow a PathFigure\r
U`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`s1`,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Shape({\r
          geometryString: "F M120 0 L80 80 0 50z",\r
          fill: "darkseagreen", stroke: null\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`s2`,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Shape({\r
          geometryString: "F M0 0 L100 0 Q150 50 100 100 L0 100 Q50 50 0 0z",\r
          fill: "darkseagreen", stroke: null\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`s3`,code:`diagram.add(\r
  new go.Node("Spot")\r
    .add(\r
      new go.Shape({\r
          geometryString: "F M0 0 L80 0 B-90 90 80 20 20 20 L100 100 20 100 B90 90 20 80 20 20z",\r
          fill: "darkseagreen", stroke: null\r
        }),\r
      new go.TextBlock("custom shape", { font: "11pt Trebuchet MS", margin: 4 })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`s4`,code:`diagram.add(\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({\r
          geometryString: "F M0 0 L.8 0 Q 1 0 1 .2 L1 1 .2 1 Q 0 1 0 .8 z",\r
          fill: "darkseagreen", stroke: null\r
        }),\r
      new go.TextBlock("custom shape", { font: "11pt Trebuchet MS", margin: 4 })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`a`,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Shape({\r
          geometryString:\r
            "F M 0 0 l 30 30 10 10 35 0 0 -35"\r
            + "x m 50 0 l 0 -50 10 0 35 35"\r
            + "x f m 50 0 l 0 -50 10 0 35 35 z",\r
          strokeWidth: 10, stroke: "lightblue",\r
          fill: "gray"\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`a2`,code:`diagram.add(\r
  new go.Node({ isShadowed: true, shadowOffset: new go.Point(10, 10) })\r
    .add(\r
      new go.Shape({\r
          geometryString:\r
            // can comma separate coordinates for more visual clarity\r
            "F M 0 0 l 30,30 10,10 35,0 0,-35" +\r
            // next two paths are not shadowed\r
            "x u m 50 0 l 0,-50 10,0 35,35" +\r
            "x u f m 50 0 l 0,-50 10,0 35,35 z" +\r
            "x m 70 0 l 0,30 30,0 5,-35 z",\r
          strokeWidth: 8, stroke: "lightblue",\r
          fill: "lightcoral"\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`even-odd`,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Shape({\r
        geometryString:\r
          "F M 0 100 L 100 100 100 30 20 30 20 50 70 50 70 80 40 80 40 0 0 0z",\r
        strokeWidth: 2, stroke: "black",\r
        fill: "lightcoral"\r
      })\r
    ));\r
\r
diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Shape({\r
        geometryString:\r
          "F0 M 0 100 L 100 100 100 30 20 30 20 50 70 50 70 80 40 80 40 0 0 0z",\r
        strokeWidth: 2, stroke: "black",\r
        fill: "lightcoral"\r
      })\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`s11`,code:`// Geometry is not filled\r
const geo = go.Geometry.parse("M29.22,13.95h-.28v-2.07c0-4.75-5.76-8.61-12.84-8.61S3.26,7.14,3.26,11.88v2.07h-.48c-.84,0-1.52,.68-1.52,1.52v1.06c0,.84,.68,1.52,1.52,1.52h.48v2.07c0,4.74,5.76,8.6,12.84,8.6s12.84-3.86,12.84-8.6v-2.07h.28c.84,0,1.52-.68,1.52-1.52v-1.06c0-.84-.68-1.52-1.52-1.52ZM16.1,4.78c5.85,0,10.68,2.79,11.28,6.36H4.82c.6-3.57,5.43-6.36,11.28-6.36ZM4.76,12.63H27.44v1.32H4.76v-1.32Zm11.34,14.58c-5.85,0-10.68-2.79-11.28-6.35h12.49l1.8,3c.14,.23,.38,.36,.64,.36s.51-.14,.64-.36l1.8-3h5.17c-.6,3.56-5.43,6.35-11.28,6.35Zm11.34-7.85h-5.66c-.26,0-.51,.14-.64,.36l-1.38,2.29-1.38-2.29c-.14-.23-.38-.36-.64-.36H4.76v-1.32H27.44v1.32Zm1.78-2.82l-26.46-.02,.02-1.08h1.22s0,0,0,0H28.19s0,0,0,0h1.02s.02,.02,.02,.02l-.02,1.08Z");\r
\r
diagram.add(\r
  new go.Node("Horizontal")\r
    .add(\r
      new go.Panel("Auto", { margin: new go.Margin(0, 10, 0, 0) })\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "white", stroke: "dimgray" }),\r
          new go.TextBlock("Custom Icon:", { font: "11pt Trebuchet MS", margin: 4 })\r
        ),\r
      new go.Shape({\r
          geometry: geo, fill: "darkgoldenrod", stroke: "dimgray",\r
          strokeWidth: 2, desiredSize: new go.Size(150, 150)\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`s11a`,code:`// Geometry filled\r
const geo = go.Geometry.parse("F M29.22,13.95h-.28v-2.07c0-4.75-5.76-8.61-12.84-8.61S3.26,7.14,3.26,11.88v2.07h-.48c-.84,0-1.52,.68-1.52,1.52v1.06c0,.84,.68,1.52,1.52,1.52h.48v2.07c0,4.74,5.76,8.6,12.84,8.6s12.84-3.86,12.84-8.6v-2.07h.28c.84,0,1.52-.68,1.52-1.52v-1.06c0-.84-.68-1.52-1.52-1.52ZM16.1,4.78c5.85,0,10.68,2.79,11.28,6.36H4.82c.6-3.57,5.43-6.36,11.28-6.36ZM4.76,12.63H27.44v1.32H4.76v-1.32Zm11.34,14.58c-5.85,0-10.68-2.79-11.28-6.35h12.49l1.8,3c.14,.23,.38,.36,.64,.36s.51-.14,.64-.36l1.8-3h5.17c-.6,3.56-5.43,6.35-11.28,6.35Zm11.34-7.85h-5.66c-.26,0-.51,.14-.64,.36l-1.38,2.29-1.38-2.29c-.14-.23-.38-.36-.64-.36H4.76v-1.32H27.44v1.32Zm1.78-2.82l-26.46-.02,.02-1.08h1.22s0,0,0,0H28.19s0,0,0,0h1.02s.02,.02,.02,.02l-.02,1.08Z");\r
\r
diagram.add(\r
  new go.Node("Horizontal")\r
    .add(\r
      new go.Panel("Auto", { margin: new go.Margin(0, 10, 0, 0) })\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "white", stroke: "dimgray" }),\r
          new go.TextBlock("Custom Icon:", { font: "11pt Trebuchet MS", margin: 4 })\r
        ),\r
      new go.Shape({\r
          geometry: geo, fill: "darkgoldenrod", stroke: "black",\r
          strokeWidth: 2, desiredSize: new go.Size(150, 150)\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`s12`,code:`// Geometry is filled by passing true as a second parameter\r
const geo = go.Geometry.parse("M29.22,13.95h-.28v-2.07c0-4.75-5.76-8.61-12.84-8.61S3.26,7.14,3.26,11.88v2.07h-.48c-.84,0-1.52,.68-1.52,1.52v1.06c0,.84,.68,1.52,1.52,1.52h.48v2.07c0,4.74,5.76,8.6,12.84,8.6s12.84-3.86,12.84-8.6v-2.07h.28c.84,0,1.52-.68,1.52-1.52v-1.06c0-.84-.68-1.52-1.52-1.52ZM16.1,4.78c5.85,0,10.68,2.79,11.28,6.36H4.82c.6-3.57,5.43-6.36,11.28-6.36ZM4.76,12.63H27.44v1.32H4.76v-1.32Zm11.34,14.58c-5.85,0-10.68-2.79-11.28-6.35h12.49l1.8,3c.14,.23,.38,.36,.64,.36s.51-.14,.64-.36l1.8-3h5.17c-.6,3.56-5.43,6.35-11.28,6.35Zm11.34-7.85h-5.66c-.26,0-.51,.14-.64,.36l-1.38,2.29-1.38-2.29c-.14-.23-.38-.36-.64-.36H4.76v-1.32H27.44v1.32Zm1.78-2.82l-26.46-.02,.02-1.08h1.22s0,0,0,0H28.19s0,0,0,0h1.02s.02,.02,.02,.02l-.02,1.08Z", true);\r
\r
diagram.add(\r
  new go.Node("Horizontal", { isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      new go.Panel("Auto", { margin: new go.Margin(0, 10, 0, 0) })\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "white", stroke: "dimgray" }),\r
          new go.TextBlock("Custom Icon:", { font: "11pt Trebuchet MS", margin: 4 })\r
        ),\r
      new go.Shape({\r
          geometry: geo,\r
          fill: "darkgoldenrod", background: "white",\r
          stroke: "black", strokeWidth: 2, desiredSize: new go.Size(150, 150)\r
        })\r
    ));\r
\r
geoNormalized = geo.copy();\r
geoNormalized.normalize(); // normalizes the geometry\r
\r
diagram.add(\r
  new go.Node("Horizontal", { isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      new go.Panel("Auto", { margin: new go.Margin(0, 10, 0, 0) })\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "white", stroke: "dimgray" }),\r
          new go.TextBlock("Custom Icon\\nNormalized:", { font: "11pt Trebuchet MS", margin: 4 })\r
        ),\r
      new go.Shape({\r
          geometry: geoNormalized,\r
          fill: "darkgoldenrod", background: "white",\r
          stroke: "black", strokeWidth: 2, desiredSize: new go.Size(150, 150)\r
        })\r
    ));\r
\r
diagram.layout = new go.GridLayout({ columnWrap: 1 })`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`b`,code:`const pathstring = "M30 100 C 50 50, 70 20, 100 100, 110, 130, 45, 150, 65, 100";\r
\r
// Just parsing the geometry\r
diagram.add(\r
  new go.Node("Vertical", {\r
    isShadowed: true, shadowOffset: new go.Point(0,0), background: "white"\r
  })\r
    .add(\r
      new go.Shape({\r
          geometry: go.Geometry.parse(pathstring),\r
          strokeWidth: 10, stroke: "lightcoral"\r
        }),\r
      new go.TextBlock("parse", { font: "11pt Trebuchet MS", margin: new go.Margin(10, 0, 0, 0) })\r
    ));\r
\r
// Parsing the geometry and normalizing it\r
const geo = go.Geometry.parse(pathstring);\r
geo.normalize();\r
diagram.add(\r
  new go.Node("Vertical", {\r
    isShadowed: true, shadowOffset: new go.Point(0,0), background: "white"\r
  })\r
    .add(\r
      new go.Shape({\r
          geometry: geo,\r
          strokeWidth: 10, stroke: "lightgreen"\r
        }),\r
      new go.TextBlock("parse/normalize", { font: "11pt Trebuchet MS", margin: new go.Margin(10, 0, 0, 0) })\r
    ));\r
\r
// Using geometryString to parse and normalize the geometry\r
diagram.add(\r
  new go.Node("Vertical", {\r
    isShadowed: true, shadowOffset: new go.Point(0,0), background: "white"\r
  })\r
    .add(\r
      new go.Shape({\r
          geometryString: pathstring,\r
          strokeWidth: 10, stroke: "lightblue"\r
        }),\r
      new go.TextBlock("geometryString", { font: "11pt Trebuchet MS", margin: new go.Margin(10, 0, 0, 0) })\r
    ));\r
\r
diagram.layout = new go.GridLayout();`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`b2`,code:`const pathstring = "M30 100 C 50 50, 70 20, 100 100, 110, 130, 45, 150, 65, 100";\r
const geo = go.Geometry.parse(pathstring);\r
geo.normalize();\r
\r
diagram.add(\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Shape({\r
        geometry: geo,\r
          strokeWidth: 10, stroke: "lightgreen"\r
        }),\r
      new go.TextBlock("geometry from string\\n(normalized)", {\r
        font: "11pt Trebuchet MS", margin: new go.Margin(10, 0)\r
      })\r
    ));\r
\r
const geo2 = geo.copy();\r
geo2.scale(-1, 1); // flips a geometry horizontally\r
diagram.add(\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Shape({\r
        geometry: geo2,\r
        strokeWidth: 10, stroke: "lightgreen"\r
      }),\r
      new go.TextBlock("flipped horizontally", {\r
        font: "11pt Trebuchet MS", margin: new go.Margin(10, 0)\r
      })\r
    ));\r
\r
const geo3 = geo.copy();\r
geo3.scale(1, -1); // flips a geometry vertically\r
diagram.add(\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Shape({\r
        geometry: geo3,\r
        strokeWidth: 10, stroke: "lightgreen"\r
      }),\r
      new go.TextBlock("flipped vertically", {\r
        font: "11pt Trebuchet MS", margin: new go.Margin(10, 0)\r
      })\r
    ));\r
\r
diagram.layout = new go.GridLayout();`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`convertingPathStrings`,code:`// These path strings represent identical geometries:\r
const a = "m0 0 t 50 50, q 40 20, 50 10 h 10 v -23 l 45, 5, 65, 100"\r
const b = "M0 0 Q0 0 50 50 Q90 70 100 60 L110 60 L110 37 L155 42 L220 142"\r
go.Geometry.stringify(go.Geometry.parse(a)); // returns the string in b\r
go.Geometry.stringify(go.Geometry.parse(b)); // returns the string in b\r
\r
diagram.add(\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Shape({ geometryString: a, scale: .8 }),\r
      new go.TextBlock("Geometry a", { font: "11pt Trebuchet MS" })\r
    )\r
);\r
diagram.add(\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Shape({ geometryString: b, scale: .8 }),\r
      new go.TextBlock("Geometry b", { font: "11pt Trebuchet MS" })\r
    )\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`go.Geometry.fillPath("M0 0 L20 20 L20 0");\r
// returns           "F M0 0 L20 20 L20 0"`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`parameterizedFigure`,code:`go.Shape.defineFigureGenerator("MyPlus", (shape, w, h) => {\r
  let p1 = shape ? shape.parameter1 : NaN;\r
  if (isNaN(p1) || p1 <= 0 || p1 >= 1) p1 = 0.3; // default arm thickness\r
  const t = Math.min(w, h) * p1;\r
  const cx = w / 2, cy = h / 2; // x and y coords based on size\r
  const a = cx - t / 2, b = cx + t / 2; // vertices of cross\r
  const c = cy - t / 2, d = cy + t / 2;\r
  const pathString = \`F M\${a} 0 H\${b} V\${c} H\${w} V \${d}\` +\r
                     \` H\${b} V \${h} H \${a} V \${d}\` +\r
                     \` H 0 V \${c} H \${a} z\`;\r
  // converts the geometry string to a Geometry\r
  return go.Geometry.parse(pathString);\r
});\r
\r
// Reuse the same figure name at different sizes and parameter1 values\r
function plus(w, h, color, p1) {\r
  return new go.Node("Vertical", { locationSpot: go.Spot.Center })\r
    .add(\r
      new go.Shape("MyPlus", {\r
        desiredSize: new go.Size(w, h),\r
        parameter1: p1,\r
        fill: color, stroke: "dimgray", strokeWidth: 1.5\r
      }),\r
      new go.TextBlock(\`\${w} x \${h}\` + (p1 !== undefined ? \`\\nparameter1=\${p1}\` : ""),\r
        { margin: new go.Margin(6, 0, 0, 0), textAlign: "center", font: "11pt Trebuchet MS" })\r
    );\r
}\r
\r
diagram.add(plus(60, 60, "lightcoral"));\r
diagram.add(plus(120, 80, "lightgreen"));\r
diagram.add(plus(120, 80, "lightblue", .5));\r
diagram.add(plus(100, 100, "khaki", 0.6));\r
diagram.layout = new go.GridLayout({ wrappingColumn: 2 });`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`xeujsw`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};