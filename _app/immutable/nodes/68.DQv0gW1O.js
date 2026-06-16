import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`TextBlocks`,category:`Building Blocks`,categoryOrder:3},htmlContent:`<h1>TextBlocks</h1>\r
\r
<p>Use the <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> class to display text.</p>\r
\r
<p>\r
  Setting the <a href="../api/symbols/TextBlock.html#text" target="api">TextBlock.text</a> property is the only way to show a text string. Because TextBlock inherits from <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>, some GraphObject\r
  properties will affect text. But there are additional text-only options regarding how that text is formatted and drawn.\r
  You can also pass the text string as the first argument to the constructor.\r
</p>\r
<p>\r
  In some of these simple examples, the code programmatically creates a Part and adds it to the Diagram.\r
  Once you learn about models and data binding you will generally not create parts (nodes or links) programmatically.\r
</p>\r
\r
<h2 id="FontAndColors"><a class="not-prose heading-anchor" href="#FontAndColors">Font and colors</a></h2>\r
<p>The size and stylistic appearance of the text is specified by the <a href="../api/symbols/TextBlock.html#font" target="api">TextBlock.font</a>. The value may be any CSS font specifier string.</p>\r
<p>The text is drawn using the <a href="../api/symbols/TextBlock.html#stroke" target="api">TextBlock.stroke</a> brush. The value may be any CSS color string or a <a href="../api/symbols/Brush.html" target="api">Brush</a>. By default the stroke is "black".</p>\r
<p>\r
  You can also specify the brush to use as the background: <a href="../api/symbols/GraphObject.html#background" target="api">GraphObject.background</a>. This defaults to no brush at all, which results in a transparent\r
  background. The background is always rectangular.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="NaturalSizingOfTextBlocksVariesByBrowser"><a class="not-prose heading-anchor" href="#NaturalSizingOfTextBlocksVariesByBrowser">Natural sizing of TextBlocks varies by browser</a></h2>\r
<p>\r
  Because different browsers measure canvas text differently, TextBlocks are the only objects in GoJS\r
  that may have inconsistent natural sizes between browsers or different devices.\r
  For this reason, if you need objects to measure precisely and consistently across all browsers (such as for testing),\r
  TextBlocks without an explicit size (<a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> or <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>)\r
  should not be used to dictate the size of any objects.\r
  For example, if you have a TextBlock with natural size inside an <a href="../api/symbols/Panel.html#auto" target="api">Panel.Auto</a> Panel, set the size on that Auto Panel\r
  to fix the size of the area occupied by both the panel and its text.\r
</p>\r
\r
<h2 id="SizingAndClipping"><a class="not-prose heading-anchor" href="#SizingAndClipping">Sizing and clipping</a></h2>\r
<p>\r
  The natural size of a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> is just big enough to render the text string with the given font. However the actual size of the TextBlock can be\r
  larger or smaller in either dimension. Larger dimensions result in areas with no text; smaller dimensions result in clipping.\r
</p>\r
<p>\r
  To demonstrate this, the examples below start with a naturally sized TextBlock, followed by ones with decreasing explicit sizes.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="MaxLinesAndOverflow"><a class="not-prose heading-anchor" href="#MaxLinesAndOverflow">Max lines and overflow</a></h2>\r
<p>\r
  You can constrain the TextBlock's available size using <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (width and height), but you can also limit the vertical height with\r
  <a href="../api/symbols/TextBlock.html#maxlines" target="api">TextBlock.maxLines</a>, which will limit the number allowed. When there isn't enough space to display all text, you can decide how to use the remaining\r
  space with different values for <a href="../api/symbols/TextBlock.html#overflow" target="api">TextBlock.overflow</a>. There are additional options in the wrapping section below.\r
</p>\r
<p>\r
  The example below starts with a naturally sized TextBlock, followed by one with a max of 2 lines using the default <a href="../api/symbols/TextBlock.html#overflow" target="api">TextBlock.overflow</a> value of\r
  <code>OverflowClip</code>, followed by one using the <a href="../api/symbols/TextBlock.html#overflow" target="api">TextBlock.overflow</a> value of <code>OverflowEllipsis</code>.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="Wrapping"><a class="not-prose heading-anchor" href="#Wrapping">Wrapping</a></h2>\r
<p>\r
  Text can also be automatically wrapped onto additional lines. In order for wrapping to happen, the <a href="../api/symbols/TextBlock.html#wrap" target="api">TextBlock.wrap</a> property must not be None, and there\r
  must be some constraint on the width to be narrower than it would naturally be.\r
</p>\r
<p>\r
  In the following example, the first TextBlock gets its natural size, the second is limited to 80 wide but is not allowed to wrap, and the other examples are\r
  limited to the same width but are allowed to wrap.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h2 id="TextAlignment"><a class="not-prose heading-anchor" href="#TextAlignment">Text alignment</a></h2>\r
<p>\r
  The <a href="../api/symbols/TextBlock.html#textalign" target="api">TextBlock.textAlign</a> property specifies where to draw the characters horizontally within the size of the <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>. The value must be a CSS\r
  string.\r
</p>\r
<p>\r
  This is different than the <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> property, which controls where to place the object within the area allocated by the parent\r
  <a href="../api/symbols/Panel.html" target="api">Panel</a>.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  The <a href="../api/symbols/TextBlock.html#verticalalignment" target="api">TextBlock.verticalAlignment</a> property controls the vertical alignment of the glyphs within the TextBlock. Neither <a href="../api/symbols/TextBlock.html#textalign" target="api">TextBlock.textAlign</a> nor\r
  <a href="../api/symbols/TextBlock.html#verticalalignment" target="api">TextBlock.verticalAlignment</a> affect the sizing of the TextBlock.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<h2 id="TextAlignAndMultiline"><a class="not-prose heading-anchor" href="#TextAlignAndMultiline">TextAlign and Multiline</a></h2>\r
<p>\r
  The <a href="../api/symbols/TextBlock.html#textalign" target="api">TextBlock.textAlign</a> property is useful even when the TextBlock has its natural size. This occurs when the text occupies multiple lines, whether by\r
  embedded newlines causing line breaks or by wrapping. You can control whether text starting with the first newline character is ignored by setting the\r
  <a href="../api/symbols/TextBlock.html#ismultiline" target="api">TextBlock.isMultiline</a>. By default multiline is enabled.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<h2 id="Editing"><a class="not-prose heading-anchor" href="#Editing">Editing</a></h2>\r
<p>GoJS also supports the in-place editing of text by the user. You just need to set the <a href="../api/symbols/TextBlock.html#editable" target="api">TextBlock.editable</a> property to true.</p>\r
<p>\r
  If you want to provide text validation of the user's input, you can set the <a href="../api/symbols/TextBlock.html#textvalidation" target="api">TextBlock.textValidation</a> property to a function. You can also provide a\r
  more customized or sophisticated text editor by setting the <a href="../api/symbols/TextBlock.html#texteditor" target="api">TextBlock.textEditor</a> property. There is an example of text validation on the\r
  <a href="validation">validation learn page.</a>\r
</p>\r
<p>\r
  When <a href="../api/symbols/TextBlock.html#editable" target="api">TextBlock.editable</a> is true, it is commonplace to add a TwoWay Binding on the <a href="../api/symbols/TextBlock.html#text" target="api">TextBlock.text</a> property,\r
  so that new values are automatically saved into the model.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
<h2 id="Indenting"><a class="not-prose heading-anchor" href="#Indenting">Indenting</a></h2>\r
<p>\r
  Each line of text is normally trimmed of leading and trailing spaces before rendering. If you wish to indent a line of text by preserving leading spaces,\r
  start the line with the zero-width space character: <code>\\u200B</code>.\r
  <a href="https://en.wikipedia.org/wiki/Zero-width_space" target="_blank">Wikipedia: Zero-width space</a>\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>You can also use a <code>\\u200B</code> character if you want to preserve spaces at the end of a line.</p>\r
\r
<h2 id="Flipping"><a class="not-prose heading-anchor" href="#Flipping">Flipping</a></h2>\r
<p>You can flip text horizontally and vertically with the <a href="../api/symbols/TextBlock.html#flip" target="api">TextBlock.flip</a> property:</p>\r
\r
<!-- CODE_BLOCK_9 -->\r
\r
<h2 id="SpacingAboveAndSpacingBelow"><a class="not-prose heading-anchor" href="#SpacingAboveAndSpacingBelow">Spacing above and spacing below</h3>\r
<p>\r
  When using monospace or custom fonts you can specify a <a href="../api/symbols/TextBlock.html#spacingabove" target="api">TextBlock.spacingAbove</a> or <a href="../api/symbols/TextBlock.html#spacingbelow" target="api">TextBlock.spacingBelow</a> to customize line spacing.\r
</p>\r
<p>\r
  In the example below, the first TextBlock uses the monospace font and default line spacing. The second TextBlock makes use of <a href="../api/symbols/TextBlock.html#spacingabove" target="api">TextBlock.spacingAbove</a> and <a href="../api/symbols/TextBlock.html#spacingbelow" target="api">TextBlock.spacingBelow</a> to improve readability.\r
</p>\r
\r
<!-- CODE_BLOCK_10 -->\r
\r
<h2 id="IconFonts">Icon fonts</h3>\r
<p>\r
  In some cases, you can show an icon that is provided by a font, instead of using a <a href="../api/symbols/Picture.html" target="api">Picture</a> or a <a href="../api/symbols/Shape.html" target="api">Shape</a>.\r
  First, make sure the font is loaded in the page before creating the diagram.\r
  Then you can show a string containing the Unicode code point for the desired icon.\r
</p>\r
\r
<!-- CODE_BLOCK_11 -->\r
\r
<h2 id="EmSizing">Em sizing</a></h2>\r
<p>\r
  Because GoJS uses an in-memory HTML Canvas to measure text, font sizes with <span class="italic">em, rem, or %</span> may not render as the correct size.\r
  We recommend you translate these font strings yourself to a pixel size. Typically this means multiplying em or rem by 16, or whatever the base pixel size of your document may be.\r
</p>\r
`,codeBlocks:[{id:`basicTextBlocks`,code:`diagram.add(\r
  new go.Node("Vertical")\r
    .add(\r
      // The default TextBlock\r
      new go.TextBlock("this is a default Text Block"),\r
\r
      // The stroke property specifies the color of the text\r
      new go.TextBlock("the color of the stroke can be changed", { stroke: "#E12713" }),\r
\r
      // The background property specifies the background of the Text Block\r
      new go.TextBlock("a different background color can be applied", { background: "#E12713"}),\r
\r
      // The font property specifies the font, font size, and allows for styling\r
      new go.TextBlock("font, font size, and styles can be set", { font: "italic bold 15pt serif" })\r
    ));`,isExecutable:!0,animation:!1,minHeight:315,language:`js`,initiallyVisible:!0},{id:`sizingTextBlocks`,code:`diagram.layout = new go.GridLayout({wrappingColumn: 1});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#FFC5D5"}),\r
      new go.TextBlock("an example of a TextBlock", { margin: 3, font: "13pt georgia"})\r
        .bind("width")\r
        .bind("height")\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, width: null, height: null},\r
    { key: 2, width: 300, height: 50},\r
    { key: 3, width: 200, height: 40},\r
    { key: 4, width: 140, height: 30},\r
    { key: 5, width: 100, height: 28}\r
  ]\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`sizingTextBlocks2`,code:`diagram.layout = new go.GridLayout({wrappingColumn: 1});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { stroke: "#424c78", fill: "white", strokeWidth: 3}),\r
      new go.TextBlock("a Text Block that takes 4 lines", {\r
        margin: 5,\r
        width: 100,\r
        font: "13pt verdana",\r
      })\r
        // TextBlock.overflow ← node.data.overflow\r
        .bind("overflow")\r
        // TextBlock.maxLines ← node.data.maxLines\r
        .bind("maxLines")\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1},\r
    { key: 2, overflow: go.TextOverflow.Clip /* Default Value */, maxLines: 2},\r
    { key: 3, overflow: go.TextOverflow.Ellipsis, maxLines: 2},\r
  ]\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`wrappingTextBlocks`,code:`diagram.layout = new go.GridLayout({wrappingColumn: 1});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(360, 80)})\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#E4E4E4"}),\r
      new go.TextBlock({ margin: 10, alignment: go.Spot.Left, font: "bold 11pt monospace"})\r
\r
        .bind("text"), // TextBlock.text ← node.data.text\r
      new go.Panel("Auto", { margin: 6, alignment: go.Spot.Right})\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "#F7D67C"}),\r
          new go.TextBlock("An example of a TextBlock", { margin: 4, font: "10pt sans-serif"})\r
            .bind("width") // TextBlock.width ← node.data.width\r
            .bind("wrap") // TextBlock.wrap ← node.data.wrap\r
        )\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, text: "Natural Width", width: null, wrap: null },\r
    { key: 2, text: "wrap: go.Wrap.None", width: 80, wrap: go.Wrap.None },\r
    { key: 3, text: "wrap: go.Wrap.DesiredSize\\n\\n(Default)", width: 80, wrap: go.Wrap.DesiredSize },\r
    { key: 4, text: "wrap: go.Wrap.Fit", width: 80, wrap: go.Wrap.Fit },\r
    { key: 5, text: "wrap: go.Wrap.BreakAll", width: 80, wrap: go.Wrap.BreakAll },\r
  ]\r
);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`textAlignTextBlocks`,code:`diagram.layout = new go.GridLayout({wrappingColumn: 1, spacing: new go.Size(0,15)});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {height: 32, width: 325})\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#A1C6EA", strokeWidth: 1}),\r
      new go.Panel("Auto", {  width: 180})\r
            .bind("alignment")\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "white", parameter1: 3}),\r
          new go.TextBlock(\r
            {\r
              // We set textAlign and a binding. If data doesn't specify, it uses this value:\r
              textAlign: "center", stretch: go.Stretch.Fill,\r
              font: "10pt sans-serif", margin: 3\r
            })\r
            .bind("text") // TextBlock.text ← node.data.text\r
            .bind("textAlign") // TextBlock.textAlign ← node.data.textAlign\r
        )\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, text: 'textAlign: "left"', textAlign: "left"},\r
    { key: 2, text: 'textAlign: "center"', textAlign: "center"},\r
    { key: 3, text: 'textAlign: "right"', textAlign: "right"},\r
    { key: 4, text: "alignment: go.Spot.Left", alignment: go.Spot.Left },\r
    { key: 5, text: "alignment: go.Spot.Center", alignment: go.Spot.Center },\r
    { key: 6, text: "alignment: go.Spot.Right", alignment: go.Spot.Right },\r
  ]\r
);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`verticalAlignment`,code:`diagram.layout = new go.GridLayout({wrappingColumn: 1});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#d2ccf2", strokeWidth: 2}),\r
      new go.TextBlock({\r
        height: 70,\r
        width: 300,\r
        font: "12pt verdana",\r
        textAlign: "center",\r
      })\r
        // TextBlock.text ← node.data.text\r
        .bind("text")\r
        // TextBlock.verticalAlignment ← node.data.verticalAlignment\r
        .bind("verticalAlignment")\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, text: "verticalAlignment: go.Spot.Top\\n(Default)", verticalAlignment: go.Spot.Top },\r
    { key: 2, text: "verticalAlignment: go.Spot.Center", verticalAlignment: go.Spot.Center },\r
    { key: 3, text: "verticalAlignment: go.Spot.Bottom", verticalAlignment: go.Spot.Bottom },\r
  ]\r
);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`multilineTextBlocks`,code:`diagram.layout = new go.GridLayout({wrappingColumn: 1});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { locationSpot: go.Spot.Center})\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#CDFC93", strokeWidth: 2}),\r
      new go.TextBlock("line one\\na longer second line\\nline three", {\r
        margin: 5,\r
        font: "12pt georgia",\r
      })\r
        // TextBlock.isMultiline ← node.data.isMultiline\r
        .bind("isMultiline")\r
        // TextBlock.textAlign ← node.data.textAlign\r
        .bind("textAlign")\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, isMultiline: false },\r
    { key: 2, textAlign: "left"},\r
    { key: 3, textAlign: "center"},\r
    { key: 4, textAlign: "right"}\r
  ]\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`editingTextBlocks`,code:`diagram.add(\r
  new go.Node("Auto", { width: 300, height: 300 })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#FEFF9C", stroke: "gray" }),\r
      new go.Panel("Table", { stretch: go.Stretch.Fill, defaultRowSeparatorStroke: "black" })\r
        .addRowDefinition(0, { height: 35 })\r
        .addRowDefinition(1, { stretch: go.Stretch.Vertical })\r
        .add(\r
          new go.Panel("Auto", { row: 0, stretch: go.Stretch.Fill })\r
            .add(\r
              new go.TextBlock("Title (Single Line)", {\r
                // Allows for editing the TextBlock\r
                editable: true,\r
                // Limits the TextBlock to a single line\r
                isMultiline: false,\r
                font: "18pt cursive",\r
                margin: 4,\r
                stretch: go.Stretch.Horizontal\r
              })\r
            ),\r
          new go.Panel("Auto", { row: 1, stretch: go.Stretch.Fill })\r
            .add(\r
              new go.TextBlock("Content Section\\n(Multiline)", {\r
                // Allows for editing the TextBlock\r
                editable: true,\r
                font: "14pt cursive",\r
                margin: 4,\r
                stretch: go.Stretch.Fill,\r
                verticalAlignment: go.Spot.Top,\r
                textAlign: "left"\r
              })\r
            )\r
        )\r
    )\r
);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`indent`,code:`const nodeText = \`Without the zero-width space characters:\\n1. Title\\n    a. Header\\n        i. Subheader\\n\r
With the zero-width space characters added:\\n1. Title\\n\\u200B    a. Header\\n\\u200B        i. Subheader\\n\r
\\u200B    Applying indentation and wrapping allows for paragraphs to be properly formatted when using TextBlocks.\`;\r
\r
diagram.add(\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#FCEBB9", strokeWidth: 2}),\r
      new go.TextBlock({\r
        margin: 5,\r
        height: 280,\r
        width: 350,\r
        font: "13pt serif",\r
        text: nodeText\r
      })\r
    )\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`flipPictures`,code:`diagram.layout = new go.GridLayout();\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical", { margin: 10})\r
    .add(\r
      new go.TextBlock("Hello", {margin: 8, font: "30px serif"})\r
        // TextBlock.flip ← node.data.flip\r
        .bind("flip"),\r
      new go.TextBlock({ font: "13px monospace" })\r
        // TextBlock.text ← node.data.text\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, text: "None (Default)", flip: go.Flip.None},\r
    { key: 2, text: "FlipHorizontal", flip: go.Flip.Horizontal},\r
    { key: 3, text: "FlipVertical", flip: go.Flip.Vertical},\r
    { key: 4, text: "FlipBoth", flip: go.Flip.Both}\r
  ]\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`fontSpacing`,code:`diagram.layout = new go.GridLayout({wrappingColumn: 1});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#CDFC93", strokeWidth: 2}),\r
      new go.TextBlock("when using monospace fonts, setting the spacingAbove and spacingBelow helps improve readability",\r
      { margin: 5, width: 220, font: "12pt monospace"})\r
        // TextBlock.spacingAbove ← node.data.spacingAbove\r
        .bind("spacingAbove")\r
        // TextBlock.spacingBelow ← node.data.spacingBelow\r
        .bind("spacingBelow")\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, spacingAbove: 0, spacingBelow: 0}, // default spacing values\r
    { key: 2, spacingAbove: 4, spacingBelow: 4}, // extra spacing\r
  ]\r
);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`awesomeFont`,code:`diagram.contentAlignment = go.Spot.Center;\r
// Explicitly load a font.  Only do this once, not each time you load a model.\r
const myFont = new FontFace("FontAwesome",\r
    "url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/webfonts/fa-solid-900.woff2)");\r
document.fonts.add(myFont);\r
// Wait for the Font Awesome font to load before actually loading the diagram.\r
myFont.load().then(() => {\r
  diagram.add(\r
    new go.Node("Auto")\r
      .add(\r
        new go.Shape("RoundedRectangle", { fill: "#F7D67C" }),\r
        new go.Panel("Horizontal", { margin: 8 })\r
          .add(\r
            new go.TextBlock("\\uf030", { margin: 4, font: "22pt FontAwesome" }),\r
            new go.TextBlock("an example using\\na FontAwesome icon",\r
            {\r
              font: "bold 12pt sans-serif",\r
              margin: new go.Margin(0, 0, 0, 6)\r
            })\r
          )\r
      ));\r
});`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1bn2i6f`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};