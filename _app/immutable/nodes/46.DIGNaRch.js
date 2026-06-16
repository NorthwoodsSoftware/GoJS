import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Palette`},htmlContent:`<h1>Palette Diagrams</h1>\r
<p>\r
  A <a href="../api/symbols/Palette.html" target="api">Palette</a> is a subclass of <a href="../api/symbols/Diagram.html" target="api">Diagram</a> that is used to display a number of <a href="../api/symbols/Part.html" target="api">Part</a>s\r
  that can be dragged into the diagram that is being modified by the user.\r
  The initialization of a <a href="../api/symbols/Palette.html" target="api">Palette</a> is just like the initialization of any <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
  Like Diagrams, you can have more than one Palette on the page at the same time.\r
</p>\r
<p>\r
  See samples that make use of <a href="../api/symbols/Palette.html" target="api">Palette</a>s in the <a href="../samples/#palette">samples index</a>.\r
</p>\r
<p>\r
  The following code initializes a Diagram with a family tree.\r
  Note that <a href="../api/symbols/Diagram.html#allowdrop" target="api">Diagram.allowDrop</a> must be true, which it is now by default.\r
</p>\r
<p>\r
  This code also creates two <a href="../api/symbols/Palette.html" target="api">Palette</a>s from which you can drag components of the family tree, above the main diagram, in the same manner as you would any Diagram.\r
  You initialize a Palette's model in order to show nodes in that Palette.\r
</p>\r
<p>\r
  Try dragging items from the <a href="../api/symbols/Palette.html" target="api">Palette</a>s (above) to the Diagram (below).\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  First, notice that each Diagram, and each Palette, has its own nodeTemplate or nodeTemplateMap.\r
  The main (target) Diagram and family palette have the same kind of model data for family members, but very different appearances.\r
  This is because their default nodeTemplates are different.\r
</p>\r
<p>\r
  Furthermore notice when you drag a part from the Palette on either side above into the Diagram below,\r
  that the appearance changes.\r
  <em>What is being dragged is just the model data, not the actual <a href="../api/symbols/Node.html" target="api">Node</a>s.</em>\r
  Because each diagram can use its own templates, the same data object can be represented completely differently.\r
</p>\r
<p>\r
  If you want the Palette to show exactly the same Nodes for the same data as your main Diagram,\r
  you can have it share the templates of the main Diagram:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  Because <a href="../api/symbols/Palette.html" target="api">Palette</a> inherits from <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, you can customize it in the normal manners.\r
  You can decide to set its <a href="../api/symbols/Diagram.html#initialscale" target="api">Diagram.initialScale</a> if you want its parts to be smaller or larger than normal.\r
</p>\r
<p>\r
  It is also commonplace to customize the ordering of the parts in the palette.\r
  The palette's layout property is a <a href="../api/symbols/GridLayout.html" target="api">GridLayout</a>, so you can set its <a href="../api/symbols/GridLayout.html#sorting" target="api">GridLayout.sorting</a> property,\r
  and if needed, its <a href="../api/symbols/GridLayout.html#comparer" target="api">GridLayout.comparer</a> property to a custom sorting function.\r
  For example, if you want the Palette to show its parts in exactly the same order in which they appear\r
  in the <code>myPalette.model.nodeDataArray</code>:\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  If you wanted to sort the parts in the Palette according to some property on the model data:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
`,codeBlocks:[{id:`diagramPre`,code:`const FONT = "system-ui, sans-serif";\r
const colors = { m: "#bde0fe", f: "#ffccd5", x: "#e9ecef" };\r
const stickerColors = {\r
  HEIR: "#3a86ff", ADOPTED: "#3bceac",\r
  ESTRANGED: "#ff9f1c", TWIN: "#9b5de5"\r
}\r
const shapes = { m: "Rectangle", f: "Circle", x: "Diamond" };\r
\r
// just like how you give the id of the html div when making a diagram,\r
// you give the id of the div that will be the palette\r
const familyPalette = new go.Palette("myPaletteDiv");\r
\r
// you can set the nodeTemplate in the Palette.\r
// it will affect how items are shown in the Palette,\r
// but once they are dragged to a Diagram,\r
// they will use the Diagram's nodeTemplate\r
familyPalette.nodeTemplate =\r
  new go.Node("Horizontal", { margin: 6 }).add(\r
    new go.Shape("RoundedRectangle", {\r
      width: 22, height: 16,\r
      strokeWidth: 2 \r
    })\r
      .bind("fill", "type", t => colors[t] || colors[x]),\r
    new go.TextBlock({\r
      margin: new go.Margin(0, 0, 0, 8),\r
      font: \`bold 13px \${FONT}\`\r
    })\r
      .bind("text")\r
  );\r
\r
// these are the items you will be able to drag from the Palette to a Diagram\r
familyPalette.model = new go.GraphLinksModel([\r
  { text: "Family Member", type: "m" },\r
  { text: "Family Member", type: "f" },\r
  { text: "Family Member", type: "x" }\r
]);\r
\r
const stickerPalette = new go.Palette("myPaletteDiv2");\r
stickerPalette.nodeTemplate =\r
  new go.Node("Horizontal", { margin: 6 }).add(\r
    new go.Shape("RoundedRectangle", {\r
      width: 34, height: 18,\r
      strokeWidth: 2\r
    })\r
      .bind("fill", "type", t => stickerColors[t]),\r
    new go.TextBlock({\r
      margin: new go.Margin(0, 0, 0, 8),\r
      font: \`bold 12px \${FONT}\`\r
    })\r
      .bind("text", "type")\r
  );\r
\r
stickerPalette.model = new go.GraphLinksModel([\r
  { type: "HEIR",      category: "sticker" },\r
  { type: "ADOPTED",   category: "sticker" },\r
  { type: "ESTRANGED", category: "sticker" },\r
  { type: "TWIN",      category: "sticker" }\r
]);\r
\r
\r
// Main Diagram nodeTemplates\r
\r
const nodeMap = new go.Map();\r
\r
// Family member card, default Node\r
nodeMap.add("",\r
  new go.Node("Spot", {\r
    isShadowed: true,\r
    shadowOffset: new go.Point(4, 4),\r
    shadowBlur: 0,\r
    shadowColor: "black"\r
  })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Panel("Auto").add(\r
        new go.Shape("RoundedRectangle", {\r
          strokeWidth: 3,\r
          portId: "", // you can draw connections between nodes\r
          fromLinkable: true, toLinkable: true\r
        })\r
          .bind("fill", "type", t => colors[t] || colors[x]),\r
        new go.Panel("Vertical", { margin: 12 }).add(\r
          new go.Shape({\r
            width: 14, height: 14,\r
            strokeWidth: 2.5,\r
            fill: "#ffffff",\r
            margin: new go.Margin(0, 0, 8, 0)\r
          })\r
            .bind("figure", "type", t => shapes[t]),\r
          new go.TextBlock({\r
            font: \`bold 14px \${FONT}\`,\r
            editable: true,\r
            wrap: go.TextBlock.WrapFit,\r
            width: 110,\r
            textAlign: "center"\r
          })\r
            .bindTwoWay("text")\r
        )\r
      )\r
    )\r
);\r
\r
// Sticker (heir, adopted, estranged, twin)\r
nodeMap.add("sticker",\r
  new go.Node("Auto").add(\r
    new go.Shape("RoundedRectangle", { parameter1: 2, strokeWidth: 2 })\r
      .bind("fill", "type", t => stickerColors[t]),\r
    new go.TextBlock({ margin: new go.Margin(4, 8, 3, 8), font: \`bold 11px \${FONT}\` }).bind("text", "type")\r
  )\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
);\r
\r
diagram.nodeTemplateMap = nodeMap;\r
\r
diagram.linkTemplate = new go.Link({ routing: go.Link.Orthogonal })\r
  .add(new go.Shape({ strokeWidth: 3 }));\r
\r
// --- Data Model ---\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 2, text: "Mary Smith",        type: "f", loc: "120 0" },\r
    { key: 3, text: "John Smith Junior", type: "m", loc: "200 150" },\r
    { key: 4, text: "Jane Smith",        type: "f", loc: "0 150" },\r
    { category: "sticker", type: "TWIN", loc: "270 140" },\r
    { category: "sticker", type: "TWIN", loc: "70 140" },\r
  ],\r
  [\r
    { from: 2, to: 3 },\r
    { from: 2, to: 4 }\r
  ]\r
);`,isExecutable:!0,animation:!1,split:50,html:`<div style="width: 100%; display: flex; gap: 8px">
  <span id="paletteSpan" style="flex: 1; vertical-align: top">
    <b>Palette 1 (family):</b><br />
    <div id="myPaletteDiv" style="height: 180px" class="diagramStyling"></div>
  </span>
  <span id="paletteSpan2" style="flex: 1; vertical-align: top">
    <b>Palette 2 (stickers):</b><br />
    <div id="myPaletteDiv2" style="height: 180px" class="diagramStyling"></div>
  </span>
</div>`,language:`js`,initiallyVisible:!0},{id:null,code:`myPalette.nodeTemplateMap = myDiagram.nodeTemplateMap;`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myPalette.layout.sorting = go.GridSorting.Forwards;`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myPalette.layout.comparer = (a, b) => {\r
      // A and B are Parts\r
      const av = a.data.someProp;\r
      const bv = b.data.someProp;\r
      if (av < bv) return -1;\r
      if (av > bv) return 1;\r
      return 0;\r
    };`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`qzuxh9`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};