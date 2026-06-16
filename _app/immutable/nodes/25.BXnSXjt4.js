import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Graduated Panels`,figures:!0},htmlContent:`<h1>Graduated Panels</h1>\r
<p>\r
  The "Graduated" Panel, <a href="../api/symbols/Panel.html#graduated" target="api">Panel.Graduated</a>, draws regular tick marks and/or text labels along the stroke of the main child <a href="../api/symbols/Shape.html" target="api">Shape</a>. Graduated Panels\r
  can be considered scales showing a range of values.\r
</p>\r
<p>\r
  For examples of Graduated Panels see the <a href="../samples/timeline">Timeline</a>, <a href="../samples/thermometer">Thermometer</a>,\r
  <a href="../samples/instrumentGauge">Instrument Gauge</a>, and <a href="../samples/ruleredDiagram">Rulered Diagram</a> samples.\r
</p>\r
\r
<h2 id="SimpleGraduatedPanels"><a class="not-prose heading-anchor" href="#SimpleGraduatedPanels">Simple Graduated Panels</a></h2>\r
<p>\r
  Similar to Auto and Spot Panels, Graduated Panels should have two or more elements in them. Elements must be either <a href="../api/symbols/Shape.html" target="api">Shape</a>s or <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s. The\r
  main Shape element may be declared by setting <a href="../api/symbols/GraphObject.html#ispanelmain" target="api">GraphObject.isPanelMain</a> to true; but no such setting is needed if it is the very first element of the\r
  panel. Shapes and TextBlocks, other than the main Shape, basically act as templates for the drawing of each tick mark and label.\r
</p>\r
<p>\r
  Tick mark <a href="../api/symbols/Shape.html" target="api">Shape</a>s within a Graduated Panel should have a measured size, either by setting a <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (or <code>width</code> and\r
  <code>height</code> properties), or by setting its <a href="../api/symbols/Shape.html#geometry" target="api">Shape.geometry</a>. For basic tick marks drawn normal to the main Shape's path, it is easiest to use a\r
  simple vertical line geometry string: <code>M0 0 V10</code>. The height of the geometry will determine the length of the tick mark.\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  Any shape, including custom geometries, can be used as the main Shape or as a tick mark Shape of a Graduated Panel.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  Graduated Panels can also be labeled with TextBlocks denoting the values along the scale. Often, these will be offset from the main stroke using\r
  <a href="../api/symbols/GraphObject.html#segmentoffset" target="api">GraphObject.segmentOffset</a>, as one would with Link labels, so that the text does not overlap the main stroke. More detail on placing labels is in the\r
  "Appearance" section below.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="GraduatedPanelProperties"><a class="not-prose heading-anchor" href="#GraduatedPanelProperties">Graduated Panel properties</a></h2>\r
<p>\r
  There are a number of properties that govern the appearance of tick marks and labels.\r
</p>\r
\r
<h3 id="TickMarkValues"><a class="not-prose heading-anchor" href="#TickMarkValues">Tick mark values</a></h3>\r
<p>\r
  The graduated values of a Graduated Panel will range on a linear scale from the start of the main shape's stroke to the end of the stroke. The values and\r
  frequency of tick marks and labels are governed by a few properties:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Panel.html#graduatedmin" target="api">Panel.graduatedMin</a> - the minimum value represented on the scale, at the beginning of the stroke of the main shape</li>\r
  <li><a href="../api/symbols/Panel.html#graduatedmax" target="api">Panel.graduatedMax</a> - the maximum value represented on the scale, at the end of the main shape</li>\r
  <li><a href="../api/symbols/Panel.html#graduatedtickbase" target="api">Panel.graduatedTickBase</a> - the value of the "origin" tick mark, the first tick mark if it is the same as graduatedMin</li>\r
  <li><a href="../api/symbols/Panel.html#graduatedtickunit" target="api">Panel.graduatedTickUnit</a> - tick marks are positioned at multiples of the graduatedTickUnit added to the graduatedTickBase</li>\r
  <li><a href="../api/symbols/Shape.html#interval" target="api">Shape.interval</a>/<a href="../api/symbols/TextBlock.html#interval" target="api">TextBlock.interval</a> - a multiple of the graduatedTickUnit at which to draw a tick or label</li>\r
</ul>\r
<p>\r
  Graduated Panels can have multiple Shapes as tick marks and multiple TextBlocks as labels, with the interval property controlling at what multiples of the\r
  <code>graduatedTickUnit</code> they are drawn. In many of the examples below, larger ticks are drawn at intervals of 4; some have an interval of 5.\r
</p>\r
\r
<p>\r
  A <code>graduatedMin</code> of <code>0</code>, <code>graduatedMax</code> of <code>77</code>, <code>graduatedTickBase</code> of <code>0</code>,\r
  <code>graduatedTickUnit</code> of <code>2.5</code>, and intervals of 4 result in a scale that might appear as:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  Try changing some values. For example, try changing <code>graduatedMin</code> to <code>-23</code>.\r
  The range from the min to the max value (<a href="../api/symbols/Panel.html#graduatedrange" target="api">Panel.graduatedRange</a>) has increased from 77 to 100, so the tick marks are closer to each other for the same\r
  length main path.\r
</p>\r
\r
<p>\r
   If you change <code>graduatedTickBase</code> to <code>1.2</code>, the "origin" for the scale would shifted slightly,\r
   even though the end values remain the same. There will always be a tick mark at the\r
  <code>graduatedTickBase</code>\r
  if that value is within the range of the graduated scale.\r
</p>\r
\r
<p>\r
  Making these edits and doubling the <code>graduatedTickUnit</code> to <code>5</code> results in:\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  Doubling the tick unit halves the number of ticks for the same length path, but again the end values are unchanged.\r
</p>\r
\r
<p>\r
  Changing <code>graduatedTickBase</code> back to <code>0</code> and the intervals to <code>5</code> results in:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  You can have more than one label. For example, small text that is more frequent than larger text:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  Notice that the infrequent label, the 100s, overpowers the more frequent label (the 50s). You won't have two labels in one spot.\r
</p>\r
\r
<h3 id="TickMarkAppearance"><a class="not-prose heading-anchor" href="#TickMarkAppearance">Tick mark appearance</a></h3>\r
<p>\r
  The appearance of tick marks relative to the main shape path is controlled by a few properties:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Shape.html#graduatedstart" target="api">Shape.graduatedStart</a>/<a href="../api/symbols/TextBlock.html#graduatedstart" target="api">TextBlock.graduatedStart</a> - the fractional distance along the main stroke at which drawing this tick or label may begin\r
  </li>\r
  <li><a href="../api/symbols/Shape.html#graduatedend" target="api">Shape.graduatedEnd</a>/<a href="../api/symbols/TextBlock.html#graduatedend" target="api">TextBlock.graduatedEnd</a> - the fractional distance along the main stroke beyond which it will not draw this tick or label\r
  </li>\r
  <li><a href="../api/symbols/GraphObject.html#alignmentfocus" target="api">GraphObject.alignmentFocus</a> - the spot on the tick or label to align with the calculated path points, defaulting to the top center</li>\r
  <li><a href="../api/symbols/GraphObject.html#segmentoffset" target="api">GraphObject.segmentOffset</a> - how much to offset a TextBlock label from the main stroke -- the Y value specifies distance from the path</li>\r
  <li><a href="../api/symbols/GraphObject.html#segmentorientation" target="api">GraphObject.segmentOrientation</a> - how to rotate a TextBlock label relative to the main stroke</li>\r
</ul>\r
<p>\r
  Only TextBlock labels should set the <a href="../api/symbols/GraphObject.html#segmentoffset" target="api">GraphObject.segmentOffset</a> or <a href="../api/symbols/GraphObject.html#segmentorientation" target="api">GraphObject.segmentOrientation</a>. They have no impact on the main shape or tick\r
  shapes. These GraphObject properties are also commonly used to place Link labels, as seen in the\r
  <a href="linkLabels">learn page on Link labels</a>, and are used by Graduated Panels in a similar manner.\r
</p>\r
\r
<p>\r
  Setting <code>graduatedStart</code> and/or <code>graduatedEnd</code> allows for drawing ticks only along part of the main stroke:\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
<p>\r
  In this case, tick marks are now only drawn in the middle half of the main shape.\r
</p>\r
\r
<p>\r
  Setting <code>alignmentFocus</code> to <code>go.Spot.Bottom</code> will cause the ticks to have their bottoms aligned to the main stroke:\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  Setting <code>alignmentFocus</code> to <code>go.Spot.Center</code> will cause the ticks to be centered across the path:\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>\r
  Note the gap in the geometry of the shape.\r
</p>\r
\r
<p>\r
  Setting <code>segmentOffset</code> for labels can make them more readable near tick marks:\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
\r
<p>\r
  Setting <code>segmentOrientation</code> for labels can alter the angle at which they are drawn relative to the main stroke,\r
  but note that in the below example, the top-center point of each label is exactly at the point along the path for that value.\r
  For this reason, you'll want to also add an <code>alignmentFocus</code> and <code>segmentOffset</code> to make it look nice.\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
<p>\r
  For vertical lines it's not necessary to rotate the text.\r
</p>\r
<p>\r
  Also, the scale follows the stroke's direction: a geometry running <b>down</b>\r
  (<code>V400</code>, a vertical line to the y-value 400) reads top-to-bottom, while one running <b>up</b> (<code>V-400</code>, since negative Y is higher on the page) reads\r
  bottom-to-top.\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
\r
<p>\r
  The properties <code>segmentOrientation</code>, <code>alignmentFocus</code> and <code>segmentOffset</code> behave similarly to Link labels, in that they respond to the direction of the main stroke. For example, let us turn the main shape so that it\r
  goes diagonally down from the top-left to the bottom-right.\r
</p>\r
<!-- CODE_BLOCK_13 -->\r
\r
<p>\r
  Now let us try a curve:\r
</p>\r
<!-- CODE_BLOCK_14 -->\r
\r
<p>\r
  Here's another commonplace configuration:\r
</p>\r
<!-- CODE_BLOCK_15 -->\r
\r
<p>\r
  Lastly, any angle specified on a label will be respected if orientation is one of <a href="../api/symbols/Orientation.html#none" target="api">Orientation.None</a>, <a href="../api/symbols/Orientation.html#along" target="api">Orientation.Along</a>, or\r
  <a href="../api/symbols/Orientation.html#upright" target="api">Orientation.Upright</a>. In the case of Along and Upright, the angle will be added to the slope of the main path at the point of the TextBlock.\r
</p>\r
<!-- CODE_BLOCK_16 -->\r
<p>\r
  With None, the labels are always 45 degrees. With Along, the labels are always 45 degrees more than the slope. With Upright, the labels are always 45 degrees\r
  more than the slope, then rotated upright if necessary.\r
</p>\r
\r
<h3 id="FunctionalAppearanceProperties"><a class="not-prose heading-anchor" href="#FunctionalAppearanceProperties">Functional appearance properties</a></h3>\r
<p>\r
  There are also some functional properties allowing for further customization of the appearance of ticks and labels.\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Shape.html#graduatedskip" target="api">Shape.graduatedSkip</a>/<a href="../api/symbols/TextBlock.html#graduatedskip" target="api">TextBlock.graduatedSkip</a> - an optional function which returns true for values that should be skipped while drawing a\r
    particular tick or label\r
  </li>\r
  <li><a href="../api/symbols/TextBlock.html#graduatedfunction" target="api">TextBlock.graduatedFunction</a> - an optional function which converts a value to a string to be displayed at that value -- if not defined, the default\r
    returns the value rounded to at most two decimals\r
  </li>\r
</ul>\r
\r
<p>\r
  Setting <code>graduatedSkip</code> allows for skipping ticks where the supplied function returns true:\r
</p>\r
<!-- CODE_BLOCK_17 -->\r
\r
<p>\r
  Setting <code>graduatedFunction</code> allows for changing the way labels are displayed:\r
</p>\r
<!-- CODE_BLOCK_18 -->\r
<h2 id="GraduatedValueComputations"><a class="not-prose heading-anchor" href="#GraduatedValueComputations">Graduated value computations</a></h2>\r
<p>\r
  There are two methods for converting between values and positions on a graduated path:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Panel.html#graduatedpointforvalue" target="api">Panel.graduatedPointForValue</a> — given a value between graduatedMin and graduatedMax, returns its Point on the main shape (in panel coordinates).</li>\r
  <li><a href="../api/symbols/Panel.html#graduatedvalueforpoint" target="api">Panel.graduatedValueForPoint</a> — given a Point, returns the nearest value along the main shape.</li>\r
</ul>\r
<p>\r
  The two gauges below each use one. On the left, a <code>move()</code> loop calls\r
  <code>graduatedPointForValue</code> to move the red marker along the arc every 10ms. On the right, you can drag the marker: a\r
  <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a> gives the drag point to <code>graduatedValueForPoint</code> to find the nearest value, then back through\r
  <code>graduatedPointForValue</code>, to keep the marker on the nearest point on the graduated panel.\r
</p>\r
<!-- CODE_BLOCK_19 -->\r
<p>\r
  For demonstration the markers are separate Parts from their gauges. A real gauge would make the marker part of the gauge itself as an indicator\r
  of a value, optionally draggable. See more at\r
  <a href="../samples/controlGauges" target="_blank">Instrument Controls: Gauges and Meters</a>.\r
</p>\r
\r
<h2 id="OtherConsiderations"><a class="not-prose heading-anchor" href="#OtherConsiderations">Other considerations</a></h2>\r
<p>\r
  By default, only the main shape of a Graduated Panel can be used to pick the panel. As with Grid Panels, a Graduated Panel should have a non-null\r
  <code>background</code> if the entire panel needs to be pickable (set to transparent if you want it to be pickable without a visible background). You cannot set or bind the <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a> of a Graduated Panel. You can set and bind\r
  properties on tick <a href="../api/symbols/Shape.html" target="api">Shape</a>s and <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> labels as you can with any other <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> properties.\r
</p>\r
<!-- CODE_BLOCK_20 -->\r
<p>\r
  Events on the tick Shapes and TextBlock labels will be ignored. Rotating the main shape will not rotate the ticks, just as rotating a Spot Panel's main\r
  element won't rotate its children. Rotation should generally be done at the Panel level. Another similarity to Spot Panels is that resizing of a Graduated\r
  Panel should generally be done on the main shape. TextBlock labels cannot be edited.\r
</p>\r
`,codeBlocks:[{id:`graduatedSimple`,code:`diagram.add(\r
  // all Nodes are Panels, because all Parts are Panels\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape("MinusLine", { width: 400 }),  // the main shape, a horizontal line\r
      new go.Shape({ geometryString: "M0 0 V10" })  // a tick mark, a vertical line\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedCircle`,code:`diagram.add(\r
  new go.Node("Graduated",\r
      { background: "transparent" }) // make panel pickable\r
    .add(\r
      // main shape is a whole circle\r
      new go.Shape("Circle",\r
        { fill: null, desiredSize: new go.Size(150, 150) }),\r
      // tick shape is a double line\r
      new go.Shape({ geometryString: "M0 0 V10 M3 0 V10" })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedLabels`,code:`diagram.add(\r
  new go.Node("Graduated",\r
      { background: "transparent" }) // make panel pickable\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),  // the main shape\r
      new go.TextBlock({ segmentOffset: new go.Point(0, 12) })  // tick labels\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedVals1`,code:`diagram.add(\r
  new go.Node("Graduated", {\r
      graduatedMin: 0, graduatedMax: 77,\r
      graduatedTickBase: 0, graduatedTickUnit: 2.5,\r
      background: "transparent"\r
    })\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),  // the main Shape\r
      // a short, frequent tick mark\r
      new go.Shape({ geometryString: "M0 0 V5" }),\r
      // a longer tick mark every four ticks\r
      new go.Shape({ geometryString: "M0 0 V10", interval: 4 }),\r
      // text label only every four ticks, with a vertical offset\r
      new go.TextBlock( { segmentOffset: new go.Point(0, 12), interval: 4 })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedVals4`,code:`diagram.add(\r
  new go.Node("Graduated", {\r
      graduatedMin: -23, graduatedMax: 77,\r
      graduatedTickBase: 1.2, graduatedTickUnit: 5,\r
      background: "transparent"\r
    })\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),\r
      new go.Shape({ geometryString: "M0 0 V5" }),  // short tick mark\r
      new go.Shape({ geometryString: "M0 0 V10", interval: 4 }),  // long tick mark\r
      new go.TextBlock( { segmentOffset: new go.Point(0, 12), interval: 4 })  // labels\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedVals5`,code:`diagram.add(\r
  new go.Node("Graduated", {\r
      graduatedMin: -23, graduatedMax: 77,\r
      graduatedTickBase: 0, graduatedTickUnit: 5,\r
      background: "transparent"\r
    })\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),\r
      new go.Shape({ geometryString: "M0 0 V5" }),  // short tick mark\r
      new go.Shape({ geometryString: "M0 0 V10", interval: 5 }),  // long tick mark\r
      new go.TextBlock({ interval: 5, segmentOffset: new go.Point(0, 12) })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduated2Labels`,code:`diagram.div.style.backgroundColor = "#27272a";\r
\r
diagram.add(\r
  new go.Node("Graduated", {\r
      graduatedMin: 0, graduatedMax: 500,\r
      graduatedTickBase: 0, graduatedTickUnit: 25,\r
      background: "transparent",\r
    })\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H450", stroke: "mistyrose" }),  // longer line\r
      new go.Shape({ geometryString: "M0 0 V5", stroke: "mistyrose" }),\r
      // minor label (50s)\r
      new go.TextBlock({\r
          interval: 2, segmentOffset: new go.Point(0, 8),\r
          stroke: "#BAD1CD", font: "7pt sans-serif"\r
        }),\r
      new go.Shape({ geometryString: "M0 0 V10", interval: 4, stroke: "mistyrose" }),\r
      // major label (100s)\r
      new go.TextBlock({\r
          interval: 4, segmentOffset: new go.Point(0, 12),\r
          stroke: "mistyrose", font: "bold 12pt sans-serif"\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedAppr1`,code:`diagram.add(\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),\r
      new go.Shape({ geometryString: "M0 0 V10", graduatedStart: .25, graduatedEnd: .75 })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedAppr2`,code:`diagram.add(\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),\r
      new go.Shape({ geometryString: "M0 0 V10", alignmentFocus: go.Spot.Bottom })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedAppr21`,code:`diagram.add(\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),\r
      new go.Shape({ geometryString: "M0 0 V10 M0 20 V30", alignmentFocus: go.Spot.Center })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedAppr3`,code:`diagram.add(\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),\r
      new go.Shape({ geometryString: "M0 0 V10" }),\r
      // offset to display below ticks\r
      new go.TextBlock({ segmentOffset: new go.Point(0, 20) })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedAppr4`,code:`diagram.add(\r
  new go.Node("Vertical", { defaultAlignment: go.Spot.Left }).add(\r
    new go.TextBlock("segmentOrientation", { margin: new go.Margin(0,0,10,0) }),\r
    new go.Panel("Graduated", { margin: new go.Margin(0,0,40,0) })\r
      .add(\r
        new go.Shape({ geometryString: "M0 0 H400" }),\r
        new go.Shape({ geometryString: "M0 0 V10" }),\r
        // change the angle of the text\r
        new go.TextBlock({ segmentOrientation: go.Orientation.Minus90 })\r
      ),\r
\r
    new go.TextBlock("segmentOrientation, alignmentFocus", { margin: new go.Margin(0,0,10,0) }),\r
    new go.Panel("Graduated", { margin: new go.Margin(0,0,40,0) })\r
      .add(\r
        new go.Shape({ geometryString: "M0 0 H400" }),\r
        new go.Shape({ geometryString: "M0 0 V10" }),\r
        new go.TextBlock({\r
          alignmentFocus: go.Spot.Right,\r
          segmentOrientation: go.Orientation.Minus90\r
        })\r
      ),\r
\r
    new go.TextBlock("segmentOrientation, alignmentFocus, segmentOffset", { margin: new go.Margin(0,0,10,0) }),\r
    new go.Panel("Graduated")\r
      .add(\r
        new go.Shape({ geometryString: "M0 0 H400" }),\r
        new go.Shape({ geometryString: "M0 0 V10" }),\r
        new go.TextBlock({\r
          alignmentFocus: go.Spot.Right,\r
          segmentOffset: new go.Point(0, 12),\r
          segmentOrientation: go.Orientation.Minus90\r
        })\r
      )\r
  )\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`graduatedApprVertBoth`,code:`diagram.add(\r
  new go.Node("Horizontal", { defaultAlignment: go.Spot.Top })\r
    .add(\r
      // Normal, top-to-bottom\r
      new go.Panel("Vertical", { margin: 16, defaultAlignment: go.Spot.Left })\r
        .add(\r
          new go.TextBlock("Normal (V400)", { margin: new go.Margin(0, 0, 8, 0) }),\r
          new go.Panel("Graduated")\r
            .add(\r
              new go.Shape({ geometryString: "M0 0 V400" }),\r
              new go.Shape({ geometryString: "M0 0 V10", alignmentFocus: go.Spot.Bottom }),\r
              new go.TextBlock({\r
                alignmentFocus: go.Spot.Left,\r
                segmentOffset: new go.Point(0, -12)\r
              })\r
            )\r
        ),\r
      // bottom-to-top\r
      new go.Panel("Vertical", { margin: 16, defaultAlignment: go.Spot.Left })\r
        .add(\r
          new go.TextBlock("Bottom-to-top (V-400)", { margin: new go.Margin(0, 0, 8, 0) }),\r
          new go.Panel("Graduated")\r
            .add(\r
              new go.Shape({ geometryString: "M0 0 V-400" }),\r
              new go.Shape({ geometryString: "M0 0 V10", alignmentFocus: go.Spot.Top }),\r
              new go.TextBlock({\r
                alignmentFocus: go.Spot.Left,\r
                segmentOffset: new go.Point(0, 12)\r
              })\r
            )\r
        )\r
    ));`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`graduatedApprDiag`,code:`diagram.add(\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 L285 285" }),\r
      new go.Shape({ geometryString: "M0 0 V10", alignmentFocus: go.Spot.Bottom }),\r
      new go.TextBlock({\r
          alignmentFocus: go.Spot.Left,\r
          segmentOffset: new go.Point(0, -12),\r
          segmentOrientation: go.Orientation.Minus90\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:350,language:`js`,initiallyVisible:!0},{id:`graduatedApprCurve`,code:`diagram.add(\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape("Curve1", { desiredSize: new go.Size(285, 285) }),\r
      new go.Shape({ geometryString: "M0 0 V10", alignmentFocus: go.Spot.Bottom }),\r
      new go.TextBlock({\r
          alignmentFocus: go.Spot.Left,\r
          segmentOffset: new go.Point(0, -12),\r
          segmentOrientation: go.Orientation.Minus90\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:350,language:`js`,initiallyVisible:!0},{id:`graduatedApprCurve2`,code:`diagram.add(\r
  new go.Node("Graduated")\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 A120 120 0 0 1 200 0" }),  // an arc\r
      new go.Shape({ geometryString: "M0 0 V10" }),\r
      new go.TextBlock({\r
          segmentOffset: new go.Point(0, 12),\r
          segmentOrientation: go.Orientation.Along\r
        })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedApprTxtAngle`,code:`diagram.add(\r
    new go.Node("Spot")\r
      .add(\r
        new go.Panel("Graduated")\r
          .add(\r
            new go.Shape({ geometryString: "M0 0 L100 0 100 100 L0 100" }),\r
            new go.Shape({ geometryString: "M0 0 V10" }),\r
            new go.TextBlock({\r
                interval: 5,\r
                angle: 45,\r
                segmentOffset: new go.Point(0, 12)\r
              })\r
          ),\r
        new go.TextBlock( "None")\r
    ));\r
\r
  diagram.add(\r
    new go.Node("Spot")\r
      .add(\r
        new go.Panel("Graduated")\r
          .add(\r
            new go.Shape({ geometryString: "M0 0 L100 0 100 100 L0 100" }),\r
            new go.Shape({ geometryString: "M0 0 V10" }),\r
            new go.TextBlock({\r
                interval: 5,\r
                angle: 45,\r
                segmentOrientation: go.Orientation.Along,\r
                segmentOffset: new go.Point(0, 12)\r
              })\r
          ),\r
        new go.TextBlock( "Along")\r
      ));\r
\r
  diagram.add(\r
    new go.Node("Spot")\r
      .add(\r
        new go.Panel("Graduated")\r
          .add(\r
            new go.Shape({ geometryString: "M0 0 L100 0 100 100 L0 100" }),\r
            new go.Shape({ geometryString: "M0 0 V10" }),\r
            new go.TextBlock({\r
                interval: 5,\r
                angle: 45,\r
                segmentOrientation: go.Orientation.Upright,\r
                segmentOffset: new go.Point(0, 12)\r
              })\r
          ),\r
        new go.TextBlock( "Upright")\r
      ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedSkip`,code:`diagram.add(\r
    new go.Node("Graduated")\r
    .add(\r
      new go.Shape({ geometryString: "M0 0 H400" }),\r
      new go.Shape({\r
          // skip drawing tick at 30\r
          graduatedSkip: v => v === 30,\r
          geometryString: "M0 0 V10"\r
        }),\r
      new go.TextBlock({ segmentOffset: new go.Point(0, 12) })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedFunc`,code:`diagram.add(\r
    new go.Node("Graduated")\r
      .add(\r
        new go.Shape({ geometryString: "M0 0 H400" }),\r
        new go.Shape({ geometryString: "M0 0 V10" }),\r
        new go.TextBlock({\r
            // always display two decimals\r
            graduatedFunction: val => val.toFixed(2),\r
            segmentOffset: new go.Point(0, 12)\r
          })\r
      ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`graduatedPointValueCalc`,code:`let val = 0, reverse = false;\r
const increment = 0.25;\r
\r
// left marker animation\r
function move() {\r
  if (val >= 100) reverse = true;\r
  if (val <= 0) reverse = false;\r
  val += reverse ? -increment : increment;\r
\r
  const scale = diagram.findNodeForKey("gaugeA").findObject("SCALE");\r
  // This is the important line\r
  // For a point between 0 and 100 (since those are the values currently on the panel).\r
  // this function returns the coordinates of that point\r
  const newPt = scale.graduatedPointForValue(val);\r
  diagram.findNodeForKey("markerA").location = scale.getDocumentPoint(newPt);\r
\r
  setTimeout(move, 10);\r
}\r
\r
diagram.addDiagramListener("InitialLayoutCompleted", e => {\r
  // start draggable dot at 50\r
  const scaleDraggable = diagram.findNodeForKey("gaugeB").findObject("SCALE");\r
  const markerB = diagram.findNodeForKey("markerB");\r
  markerB.location = scaleDraggable.getDocumentPoint(scaleDraggable.graduatedPointForValue(50));\r
\r
  // start animation\r
  move();\r
});\r
\r
// drag computation of right dot\r
function snapToScale(node, pt) {\r
  const scale = diagram.findNodeForKey(node.data.gauge).findObject("SCALE");\r
  const loc = scale.getLocalPoint(pt);\r
  // get value between 0 and 100 closest to where you dragged the dot\r
  const v = scale.graduatedValueForPoint(loc);\r
  // get the point on the graduated panel for the value\r
  const newPt = scale.graduatedPointForValue(v);\r
  return scale.getDocumentPoint(newPt);\r
}\r
\r
diagram.nodeTemplateMap.add("gauge",\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Graduated", { name: "SCALE", margin: 10 })\r
        .add(\r
          new go.Shape({ name: "PATH", geometryString: "M0 0 A120 120 0 0 1 200 0" }),\r
          new go.Shape({ geometryString: "M0 0 V10" }),\r
          new go.TextBlock({ segmentOffset: new go.Point(0, 12), segmentOrientation: go.Orientation.Along })\r
        )\r
    ));\r
\r
diagram.nodeTemplateMap.add("marker",\r
  new go.Node("Spot", { locationSpot: go.Spot.Center, selectionAdorned: false })\r
    .bind("selectable", "draggable")\r
    .bind("dragComputation", "draggable", d => d ? snapToScale : null)\r
    .add(\r
      new go.Shape("Circle", {\r
        fill: "rgba(225,29,72,0.15)", strokeWidth: 0,\r
        width: 22, height: 22\r
      })\r
        .bind("visible", "draggable"),\r
      new go.Shape("Circle", { fill: "#e11d48", strokeWidth: 0, width: 8, height: 8 })\r
    ));\r
\r
diagram.model = new go.GraphLinksModel([\r
  // animated gauge and marker\r
  { key: "gaugeA", category: "gauge", loc: "10 20" },\r
  { key: "markerA", category: "marker", draggable: false },\r
  // gauge with draggable marker\r
  { key: "gaugeB", category: "gauge", loc: "260 20" },\r
  { key: "markerB", category: "marker", draggable: true, gauge: "gaugeB" }\r
]);`,isExecutable:!0,animation:!1,minHeight:200,language:`js`,initiallyVisible:!0},{id:`graduatedBackground`,code:`diagram.add(\r
  new go.Node("Graduated", { background: "white" })\r
    .add(  // or "Graduated"\r
      new go.Shape({ geometryString: "M0 0 H150", stroke: "blue", strokeWidth: 2 }),\r
      new go.Shape({ geometryString: "M0 0 V20", stroke: "blue", strokeDashArray: [2, 2] })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`fqo4qm`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};