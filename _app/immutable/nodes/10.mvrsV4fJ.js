import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Brushes`,figures:!0},htmlContent:`<h1>GoJS Brushes</h1>\r
<p>\r
  A <a href="../api/symbols/Brush.html" target="api">Brush</a> holds color information and describes how to draw the inside of a Shape or the stroke of a shape or a TextBlock or the background of any\r
  GraphObject.\r
</p>\r
\r
<p>\r
  A Brush must not be modified once it has been assigned to a GraphObject, such as the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> or <a href="../api/symbols/TextBlock.html#stroke" target="api">TextBlock.stroke</a> or\r
  <a href="../api/symbols/GraphObject.html#background" target="api">GraphObject.background</a>. However, a Brush may be shared by multiple GraphObjects.\r
</p>\r
\r
<h2 id="SolidBrushes"><a class="not-prose heading-anchor" href="#SolidBrushes">Solid Brushes</a></h2>\r
\r
The simplest brushes are defined by a single solid color. Because they are so simple, anywhere you want a single-color brush you can substitute a valid CSS\r
color string.\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>Many CSS color strings are valid, including named colors, hex values, RGB values, and RGBA values.</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="GradientBrushes"><a class="not-prose heading-anchor" href="#GradientBrushes">Gradient Brushes</a></h2>\r
\r
<p>Gradient brushes are defined by setting the type and adding a number of color stops to the Brush.</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>To simplify the syntax, you can use the constructor's initialization argument:</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>Some examples follow:</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>Brushes can have any number of color stops:</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  Radial gradient brushes can be controlled with <a href="../api/symbols/Brush.html#startradius" target="api">Brush.startRadius</a> and <a href="../api/symbols/Brush.html#endradius" target="api">Brush.endRadius</a>, which default to zero and NaN, respectively, meaning the\r
  gradient begins at the very center and goes to the farthest measured edge of the object.\r
</p>\r
\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>Several GraphObjects can share the same Brush:</p>\r
\r
<!-- CODE_BLOCK_7 -->\r
\r
<h2 id="PatternBrushes"><a class="not-prose heading-anchor" href="#PatternBrushes">Pattern Brushes</a></h2>\r
<p>The following example sets up two Pattern brushes, one using an HTML Canvas with content drawn to it, which looks like this:</p>\r
<div id="patternCanvas"></div>\r
\r
\r
<p>The other Pattern Brush uses this image:</p>\r
<p><img src="images/pattern.jpg" /></p>\r
<p>Try resizing the nodes below. As the size of the node changes, the pattern is used to tile its area.</p>\r
<!-- CODE_BLOCK_8 -->\r
\r
<h2 id="BrushFunctions"><a class="not-prose heading-anchor" href="#BrushFunctions">Brush functions</a></h2>\r
<p>There are some functions available for generating different colors or modifying Brush colors:</p>\r
<ul>\r
  <li><a href="../api/symbols/Brush.html#randomcolor" target="api">Brush.randomColor</a> - returns a random hexadecimal color value</li>\r
\r
  <li><a href="../api/symbols/Brush.html#lightenby" target="api">Brush.lightenBy</a> and <a href="../api/symbols/Brush.html#darkenby" target="api">Brush.darkenBy</a> - return lightened or darkened colors/brushes; there are both instance methods and static functions</li>\r
  <li><a href="../api/symbols/Brush.html#lighten" target="api">Brush.lighten</a> and <a href="../api/symbols/Brush.html#darken" target="api">Brush.darken</a> - convenience static functions which return lightened or darkened colors</li>\r
  <li><a href="../api/symbols/Brush.html#mix" target="api">Brush.mix</a> - mixes two colors together</li>\r
  <li><a href="../api/symbols/Brush.html#isdark" target="api">Brush.isDark</a> - determines whether a color is dark, often used in bindings; there are both instance methods and static functions</li>\r
</ul>\r
<p>In the following example, the lighten and darken functions are used on the stroke and fill of each node.</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>In the following example, the color of text is determined by whether the background shape is dark.</p>\r
<!-- CODE_BLOCK_10 -->\r
`,codeBlocks:[{id:`simpleBrushes`,code:`diagram.add(\r
  new go.Part("Auto", { width: 100, height: 100 })\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 0,\r
        fill: new go.Brush({ color: "darkred" }) // Solid Color go.Brush\r
      }),\r
      new go.TextBlock("go.Brush", { stroke: "white" })\r
    ));\r
\r
diagram.add(\r
  new go.Part("Auto", { width: 100, height: 100 })\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 0,\r
        fill: "darkred" // Using valid CSS color string\r
      }),\r
      new go.TextBlock("Color String", { stroke: "white" })\r
    ));`,isExecutable:!0,animation:!1,minHeight:350,language:`js`,initiallyVisible:!0},{id:`simpleBrushes2`,code:`diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 6, width: 140, height: 140,\r
        fill: "#6B9AC4", // Hex Color String\r
        stroke: "rgb(88,43,17)", // RGB Color String\r
        background: "coral" // CSS Color String\r
      })\r
    ));\r
\r
diagram.add(\r
  new go.Part("Spot")\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 0,\r
        fill: "rgba(05,255,255,0.5)" // RGBA Color String\r
      }),\r
      new go.Shape("Circle", { strokeWidth: 0, alignment: new go.Spot(0.2,1),\r
        fill: "rgba(255,255,0,0.5)" // RGBA Color String\r
      }),\r
      new go.Shape("Circle", { strokeWidth: 0, alignment: new go.Spot(0.8,1),\r
        fill: "rgba(255,0,255,0.5)" // RGBA Color String\r
      })\r
    ));\r
diagram.layout = new go.GridLayout();`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// constructs a Linear gradient brush\r
  const brush = new go.Brush(go.BrushType.Linear);\r
  brush.addColorStop(0, "blue");\r
  brush.addColorStop(1, "red");`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// constructs the same Brush\r
  const brush = new go.Brush("Linear", { 0.0: "blue", 1.0: "red" });`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`gradients1`,code:`diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 2,\r
        // A linear gradient brush from blue to red, going from top to bottom (default)\r
        fill: new go.Brush("Linear", { 0.0: "#ff0000", 1.0: "#fdcf58" })\r
      }),\r
    ));\r
diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 2,\r
        // A linear gradient brush from blue to red, going from bottom to top\r
        // by defining start and end spots\r
        fill: new go.Brush("Linear", { start: go.Spot.Bottom, end: go.Spot.Top,\r
          0.0: "#ff0000", 1.0: "#fdcf58" \r
        })\r
      })\r
    ));`,isExecutable:!0,animation:!1,minHeight:380,language:`js`,initiallyVisible:!0},{id:`gradients2`,code:`diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape({ strokeWidth: 2,\r
        // A rainbow linear gradient brush:\r
        fill: new go.Brush("Linear", {\r
          0: "#EF9393", 0.25: "#E17DC2", 0.5: "#998EE0", 0.75: "#43ADD0", 1: "#8BDEDA"\r
        })\r
      })\r
    ));\r
diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 2,\r
        // A rainbow radial gradient brush:\r
        fill: new go.Brush("Radial", {\r
          0: "#EF9393", 0.25: "#E17DC2", 0.5: "#998EE0", 0.75: "#43ADD0",1: "#8BDEDA"\r
        })\r
      })\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`gradients21`,code:`diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape({\r
        // A rainbow radial gradient brush:\r
        fill: new go.Brush("Radial", { 0: "#870000", 1: "black" })\r
      })\r
    ));\r
diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape({\r
        // A rainbow radial gradient brush:\r
        fill: new go.Brush("Radial", {  0: "#870000", 1: "black" })\r
      })\r
    ));\r
diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape({\r
        // A rainbow radial gradient brush:\r
        fill: new go.Brush("Radial", { startRadius: 20, endRadius: 40, 0: "#870000", 1: "black" })\r
      })\r
    ));\r
diagram.layout = new go.GridLayout();`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`gradients3`,code:`// Create one brush for several GraphObjects to share:\r
const rainbow = new go.Brush("Linear", {\r
  0.0: "#ff75c3", 0.2: "#ffa647", 0.4: "#ffe83f", 0.6: "#9fff5b", 0.8: "#70e2ff", 1: "#cd93ff"\r
});\r
\r
diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape({ fill: rainbow, strokeWidth: 0 })\r
    ));\r
diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape("Circle", { fill: null, strokeWidth: 14, stroke: rainbow, width: 90 })\r
    ));\r
diagram.add(\r
  new go.Part()\r
    .add(\r
      new go.Shape("Fragile", { width: 50, height: 50, angle: 45, fill: rainbow })\r
    ));\r
diagram.add(\r
  new go.Part("Auto")\r
    .add(\r
      new go.Shape(),\r
      new go.TextBlock("text", { font: 'bold 32pt sans-serif', stroke: rainbow })\r
    ));`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`diagramPre`,code:`// set up an 40x40 HTML Canvas and draw on it to create a repeating "tile" to use as a pattern\r
function makePattern() {\r
  const patternCanvas = document.createElement('canvas');\r
  patternCanvas.width = 40;\r
  patternCanvas.height = 40;\r
  const pctx = patternCanvas.getContext('2d');\r
\r
  // This creates a shape similar to a diamond leaf\r
  pctx.beginPath();\r
  pctx.moveTo(0.0, 40.0);\r
  pctx.lineTo(26.9, 36.0);\r
  pctx.bezierCurveTo(31.7, 36.0, 36.0, 32.1, 36.0, 27.3);\r
  pctx.lineTo(40.0, 0.0);\r
  pctx.lineTo(11.8, 3.0);\r
  pctx.bezierCurveTo(7.0, 3.0, 3.0, 6.9, 3.0, 11.7);\r
  pctx.lineTo(0.0, 40.0);\r
  pctx.closePath();\r
  pctx.fillStyle = "rgb(188, 222, 178)";\r
  pctx.fill();\r
  pctx.lineWidth = 0.8;\r
  pctx.strokeStyle = "rgb(0, 156, 86)";\r
  pctx.lineJoin = "miter";\r
  pctx.miterLimit = 4.0;\r
  pctx.stroke();\r
\r
  return patternCanvas;\r
}\r
\r
const img = new Image();\r
img.src = 'images/pattern.jpg';\r
\r
// Use an image as a pattern\r
const patternBrush = new go.Brush("Pattern", { pattern: img });\r
\r
// use a reference to an HTML Canvas (with renderings on it) as a pattern:\r
const patternBrush2 = new go.Brush("Pattern", { pattern: makePattern() });\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { resizable: true, resizeObjectName: 'SHAPE' })\r
    .add(\r
      new go.Shape("Rectangle", { name: 'SHAPE', strokeWidth: 0, stroke: null })\r
        .bind("fill"),\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: 1, fill: patternBrush },\r
  { key: 2, fill: patternBrush2 }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`functions`,code:`const color = go.Brush.randomColor(140, 200);\r
const labels = ["lightenBy(0.4)", "lighten()", "normal", "darken()", "darkenBy(0.4)"];\r
\r
function applyMod(c, i) {\r
  switch (i) {\r
    case 0: return go.Brush.lightenBy(c, .4);\r
    case 1: return go.Brush.lighten(c);\r
    case 2: return c;\r
    case 3: return go.Brush.darken(c);\r
    case 4: return go.Brush.darkenBy(c, .4);\r
  }\r
}\r
\r
const cellW = 80;\r
const cellH = 60;\r
\r
labels.forEach((label, x) => {\r
  diagram.add(\r
    new go.Part({ location: new go.Point((x + 1) * cellW, 0), locationSpot: go.Spot.Center })\r
      .add(new go.TextBlock(label, { font: "bold 8pt sans-serif" }))\r
  );\r
});\r
\r
labels.forEach((label, y) => {\r
  diagram.add(\r
    new go.Part({ location: new go.Point(0, (y + 1) * cellH), locationSpot: go.Spot.Center })\r
      .add(\r
        new go.TextBlock(label, { font: "bold 8pt sans-serif" })\r
      )\r
  );\r
});\r
\r
for (let y = 0; y < 5; y++) {\r
  for (let x = 0; x < 5; x++) {\r
    diagram.add(\r
      new go.Part({\r
        location: new go.Point((x + 1) * cellW, (y + 1) * cellH),\r
        locationSpot: go.Spot.Center\r
      }).add(\r
        new go.Shape("RoundedRectangle", { width: 70, height: 45, strokeWidth: 6,\r
          fill: applyMod(color, y),\r
          stroke: applyMod(color, x)\r
        })\r
      )\r
    );\r
  }\r
}`,isExecutable:!0,animation:!1,minHeight:500,language:`js`,initiallyVisible:!0},{id:`functions2`,code:`diagram.layout = new go.GridLayout( { wrappingColumn: 4 });\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 40 })\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("stroke", "color",\r
              // dark nodes use white text, light nodes use dark text\r
              c => go.Brush.isDark(c) ? "white" : "black")\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.Model([\r
  { text: "Alpha", color: "white" },\r
  { text: "Beta", color: "black" },\r
  { text: "Gamma", color: "darkblue" },\r
  { text: "Delta", color: "lightblue" },\r
  { text: "Epsilon", color: "darkgreen" },\r
  { text: "Zeta", color: "lightgreen" },\r
  { text: "Eta", color: "darkred" },\r
  { text: "Theta", color: "lightcoral" }\r
]);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:`// set up an 40x40 HTML Canvas and draw on it to create a repeating "tile" to use as a pattern\r
  const patternCanvas = document.createElement('canvas');\r
  patternCanvas.width = 40;\r
  patternCanvas.height = 40;\r
  const pctx = patternCanvas.getContext('2d');\r
\r
  // This creates a shape similar to a diamond leaf\r
  pctx.beginPath();\r
  pctx.moveTo(0.0, 40.0);\r
  pctx.lineTo(26.9, 36.0);\r
  pctx.bezierCurveTo(31.7, 36.0, 36.0, 32.1, 36.0, 27.3);\r
  pctx.lineTo(40.0, 0.0);\r
  pctx.lineTo(11.8, 3.0);\r
  pctx.bezierCurveTo(7.0, 3.0, 3.0, 6.9, 3.0, 11.7);\r
  pctx.lineTo(0.0, 40.0);\r
  pctx.closePath();\r
  pctx.fillStyle = 'rgb(188, 222, 178)';\r
  pctx.fill();\r
  pctx.lineWidth = 0.8;\r
  pctx.strokeStyle = 'rgb(0, 156, 86)';\r
  pctx.lineJoin = 'miter';\r
  pctx.miterLimit = 4.0;\r
  pctx.stroke();\r
\r
  document.getElementById('patternCanvas').appendChild(patternCanvas);`}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`b4qrei`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};