import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Tooltips`},htmlContent:`<h1>Tooltips</h1>\r
<p>GoJS provides a way to create customized tooltips for any object or for the diagram background.</p>\r
<p>\r
  A tooltip is an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is shown when the mouse hovers over an object that has its <a href="../api/symbols/GraphObject.html#tooltip" target="api">GraphObject.toolTip</a> set. The tooltip part is bound to\r
  the same data as the part itself.\r
</p>\r
<p>See samples that make use of tooltips in the <a href="../samples/#tooltips">samples index</a>.</p>\r
<p>\r
  It is typical to implement a tooltip as a "ToolTip" Panel holding a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> or a Panel of TextBlocks and other objects. Each "ToolTip" is just an\r
  "Auto" Panel <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is shadowed, and where the border is a rectangular <a href="../api/symbols/Shape.html" target="api">Shape</a> with a light gray fill. However you can implement the\r
  tooltip as any arbitrarily complicated Adornment.\r
</p>\r
<p>\r
  You can see how the "ToolTip" builder is defined at\r
  <a href="../extensions/Buttons.js">Buttons.js</a>. You may also wish to theme the "ToolTip", as described on the\r
  <a href="theming#BuilderObjects">theming learn page</a>.\r
</p>\r
<p>\r
  In this example each <a href="../api/symbols/Node.html" target="api">Node</a> has its <a href="../api/symbols/GraphObject.html#tooltip" target="api">GraphObject.toolTip</a> property set to a Part that shows the data.color property via a normal data binding. The\r
  diagram gets its own tooltip by setting <a href="../api/symbols/Diagram.html#tooltip" target="api">Diagram.toolTip</a>.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Try pausing the mouse over each of the nodes or in the background of the diagram. If you copy some parts, you will see that the tooltip for the diagram\r
  displays newer information about the diagram.\r
</p>\r
<p>\r
  You can change how long the mouse has to wait motionless before a tooltip appears by setting <a href="../api/symbols/ToolManager.html#hoverdelay" target="api">ToolManager.hoverDelay</a>. For example, when initializing\r
  a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, <code>"toolManager.hoverDelay": 600</code> changes the delay to be 6/10ths of one second.\r
</p>\r
<p>\r
  You can change how long the tooltip remains visible by setting <a href="../api/symbols/ToolManager.html#tooltipduration" target="api">ToolManager.toolTipDuration</a>. For example,\r
  <code>"toolManager.toolTipDuration": 10000</code> changes the visible time to 10 seconds.\r
</p>\r
\r
<h3 id="Positioning"><a class="not-prose heading-anchor" href="#Positioning">Positioning</a></h3>\r
<p>\r
  There are two ways to customize the positioning of the tooltip relative to the adorned GraphObject. One way is to override <a href="../api/symbols/ToolManager.html#positiontooltip" target="api">ToolManager.positionToolTip</a>.\r
  Another way is to have the tooltip <a href="../api/symbols/Adornment.html" target="api">Adornment</a> include a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a>. The Placeholder is positioned to have the same size and position as the\r
  adorned object. When creating tooltips with Placeholders, don't use the predefined "ToolTip" builder as it will introduce an extra shape typically used as the\r
  border for the "Auto" Panel.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  Note how the <a href="../api/symbols/Adornment.html" target="api">Adornment</a> implementing the tooltip uses a "transparent" background so that the tooltip is not automatically removed when the mouse moves.\r
</p>\r
\r
<h2 id="HTMLTooltips"><a class="not-prose heading-anchor" href="#HTMLTooltips">HTML Tooltips</a></h2>\r
<p>\r
  It is possible to define custom tooltips using HTML instead of <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s using the <a href="../api/symbols/HTMLInfo.html" target="api">HTMLInfo</a> class. The\r
  <a href="../samples/dataVisualization">Data Visualization sample</a> shows such tooltips. See <a href="HTMLInteraction">HTML Interaction</a> for\r
  more discussion.\r
</p>\r
<p>\r
  HTML tooltips require more effort to implement than using the default GoJS "ToolTip" and GraphObjects. However you would have the full power of\r
  HTML/CSS/JavaScript to show whatever you want.\r
</p>\r
`,codeBlocks:[{id:`tooltips`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    toolTip:  // define a tooltip for each node that displays the color as text\r
      go.GraphObject.build("ToolTip")\r
        .add(\r
          new go.TextBlock({ margin: 4 })\r
            .bind("text", "color")\r
        )  // end of Adornment\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { stroke: null})\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 5, font: "16px verdana" })\r
        .bind("text")\r
    );\r
\r
// a function that produces the content of the diagram tooltip\r
function diagramInfo(model) {\r
  const numNodes = model.nodeDataArray.length;\r
  const numLinks = model.linkDataArray.length;\r
  return \`Model:\\n\${numNodes} \${numNodes == 1 ? "node" : "nodes"}, \${numLinks} \${numLinks == 1 ? "link" : "links"}\`;\r
}\r
\r
// provide a tooltip for the background of the Diagram, when not over any Part\r
diagram.toolTip =\r
  go.GraphObject.build("ToolTip")\r
    .add(\r
      new go.TextBlock({ margin: 4 })\r
        // use a converter to display information about the diagram model\r
        .bind("text", "", diagramInfo)\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha", color: "skyblue" },\r
  { key: 2, text: "Beta", color: "pink" },\r
  { key: 3, text: "Gamma", color: "coral" },\r
  { key: 4, text: "Delta", color: "palegreen" }\r
], [\r
  { from: 1, to: 2 },\r
  { from: 1, to: 3 }\r
]);`,isExecutable:!0,animation:!1,highlight:[3,4,5,6,7,8,25],language:`js`,initiallyVisible:!0},{id:`tooltipsplaceholder`,code:`diagram.toolManager.hoverDelay = 100; // shorten hover delay\r
\r
// this is a normal Node template that also has a toolTip defined for it\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    toolTip:  // define a tooltip for each node with several labels around it\r
      new go.Adornment("Spot", {\r
        background: "transparent" // avoid hiding when mouse moves\r
      })\r
        .add(\r
          new go.Placeholder({\r
            padding: 5 // placeholder will be a bit bigger than node\r
          }),\r
          // Text above\r
          new go.TextBlock({\r
            alignment: new go.Spot(0.5, 0, 0, -6),\r
            font: "bold 14px Georgia", stroke: "#2b2118"\r
          })\r
            .bind("text", "artist"),\r
          // Text below\r
          new go.TextBlock("Bottom", {\r
            alignment: new go.Spot(0.5, 1, 0, 6),\r
            font: "italic 13px Georgia", stroke: "#5b4a36"\r
          })\r
            .bind("text", "year", s => "Oil on canvas, " + s)\r
        )  // end Adornment\r
  })\r
    .add(\r
      // the rest of the node\r
      new go.Shape("Rectangle", {\r
        fill: "burlywood", stroke: "#c79f6b"\r
      }),\r
      new go.Panel("Spot", { margin: 7, width: 100, height: 80 })\r
        .add(\r
          new go.Shape("Rectangle", { fill: "white", stroke: "#c79f6b" })\r
            .bind("fill", "color"),\r
          new go.TextBlock({\r
            font: "15px cursive", stroke: "#33270f", textAlign: "center"\r
          })\r
            .bind("text")\r
        )\r
    );\r
\r
diagram.layout = new go.GridLayout({\r
  wrappingColumn: 3, spacing: new go.Size(26, 26)\r
});\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Water Lilies",\r
    artist: "Claude Monet", year: 1906, color: "#9ec9b480" },\r
  { key: 2, text: "Wheat Field",\r
    artist: "Vincent van Gogh", year: 1888, color: "#e3c14e80" },\r
  { key: 3, text: "Pink Roses",\r
    artist: "Pierre-Auguste Renoir", year: 1890, color: "#e8b7c480" }\r
]);\r
\r
diagram.div.style.backgroundColor = "#EDE8DC";\r
diagram.initialScale = 0.85;`,isExecutable:!0,animation:!1,minHeight:500,highlight:[7,8,9],language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`4xq2u0`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};