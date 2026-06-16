import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Trees`},htmlContent:`<h1>Trees and TreeLayout</h1>\r
<p>\r
  There is no limit to the kinds of graphs that you can build in GoJS.\r
  But the most common kind of graph forms a "tree".\r
  A tree is a graph where each node may have at most one "tree parent" and at most one link connecting to that parent node,\r
  and where there are no cycles within the graph.\r
</p>\r
<p>\r
  Because trees occur so frequently in diagrams, there is also a predefined tree layout that offers many customizations specifically for trees.\r
</p>\r
\r
<h2 id="ManualLayoutOfTreeStructure"><a class="not-prose heading-anchor" href="#ManualLayoutOfTreeStructure">Manual layout of a tree structure</a></h2>\r
<p>\r
  You can of course position the nodes manually, either by hand or programmatically.\r
  In this first example, the node locations are stored in the node data, and there is a Binding of <a href="../api/symbols/Part.html#location" target="api">Part.location</a> to the node data property.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  You can also get the same results by using a <a href="../api/symbols/TreeModel.html" target="api">TreeModel</a>.\r
  Note how the node template and the link template are exactly the same as when using a <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a>, above.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="AutomaticTreeLayout"><a class="not-prose heading-anchor" href="#AutomaticTreeLayout">Automatic TreeLayout</a></h2>\r
<p>\r
  It is most common to use <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a> for laying out trees.\r
  Just assign <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> to an instance of <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a>.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<h2 id="CommonTreeLayoutProperties"><a class="not-prose heading-anchor" href="#CommonTreeLayoutProperties">Common TreeLayout properties</a></h2>\r
<p>\r
  The <a href="../api/symbols/TreeLayout.html#angle" target="api">TreeLayout.angle</a> property controls the general direction of tree growth. This must be zero (towards the right), 90 (downward), 180 (leftward), or\r
  270 (upward).\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  The <a href="../api/symbols/TreeLayout.html#alignment" target="api">TreeLayout.alignment</a> property controls how the parent node is positioned relative to its children. This must be one of the Alignment... constants\r
  defined on <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a>.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  For tree layouts, all of the nodes are placed into "layers" according to the length of the chain of links from the root node. These layers are not to be\r
  confused with Diagram <a href="../api/symbols/Layer.html" target="api">Layer</a>s, which control the Z-ordering of the nodes. The <a href="../api/symbols/TreeLayout.html#layerspacing" target="api">TreeLayout.layerSpacing</a> property controls how close the layers are\r
  to each other. The <a href="../api/symbols/TreeLayout.html#nodespacing" target="api">TreeLayout.nodeSpacing</a> property controls how close nodes are to each other in the same layer.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  The children of each node can be sorted. By default the <a href="../api/symbols/TreeLayout.html#comparer" target="api">TreeLayout.comparer</a> function compares the <a href="../api/symbols/Part.html#text" target="api">Part.text</a> property. So if that property is\r
  data bound by the node template, and if you set the <a href="../api/symbols/TreeLayout.html#sorting" target="api">TreeLayout.sorting</a> property to sort in either ascending or descending order, each parent node will\r
  have all of its children sorted in that order by their text strings. (In this example that means alphabetical ordering of the English names of the letters of\r
  the Greek alphabet.)\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>But you can provide your own function for ordering the children, such as:</p>\r
<!-- CODE_BLOCK_7 -->\r
`,codeBlocks:[{id:`tree`,code:`const myModel = new go.GraphLinksModel([\r
  { key: 1, loc: "0 120", tax: "Subfamily", title: "Felinae" },\r
  { key: 2, loc: "150 40", tax: "Genus", title: "Felis" },\r
  { key: 3, loc: "150 190", tax: "Genus", title: "Leopardus" },\r
  { key: 4, loc: "300 0", tax: "Species", title: "(Felis catus)", name: "Domestic Cat" },\r
  { key: 5, loc: "300 75", tax: "Species", title: "(Felis nigripes)", name: "Black-Footed Cat" },\r
  { key: 6, loc: "300 150", tax: "Species", title: "(Leopardus jacobita)", name: "Andean Cat" },\r
  { key: 7, loc: "300 225", tax: "Species", title: "(Leopardus pardalis)", name: "Ocelot" }\r
], [\r
  { from: 1, to: 2 },\r
  { from: 2, to: 4 },\r
  { from: 2, to: 5 },\r
  { from: 1, to: 3 },\r
  { from: 3, to: 6 },\r
  { from: 3, to: 7 }\r
]);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(105, 0) })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0, parameter1: 8 })\r
        .bind("fill", "tax", getColor),\r
      new go.Panel("Vertical", { stretch: go.Stretch.Horizontal, margin: new go.Margin(3, 0) })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif", margin: 3 })\r
            .bind("text", "tax"),\r
          new go.Panel("Auto", { stretch: go.Stretch.Horizontal })\r
            .add(\r
              new go.Shape({ fill: "white", strokeWidth: 0 }),\r
              new go.Panel("Vertical", { padding: 3 })\r
                .add(\r
                  new go.TextBlock({ font: "bold 8pt georgia" })\r
                    .bind("text", "name")\r
                    .bind("visible", "tax", n => (n == "Species")),\r
                  new go.TextBlock({ margin: new go.Margin(2, 0) })\r
                    .bind("text", "title")\r
                    .bind("font", "tax", n => (n == "Species")? "italic 6pt sans-serif" : "" ),\r
                )\r
            )\r
        )\r
    );\r
\r
function getColor(tax) {\r
  if (tax == "Subfamily") return "#dd5420"\r
  if (tax == "Genus") return "#2E5CB8"\r
  if (tax == "Species") return "#14950E"\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
    .add(\r
      new go.Shape()\r
    );\r
\r
diagram.model = myModel;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`tree2`,code:`const myModel = new go.TreeModel([\r
  { key: 1, loc: "0 120", tax: "Subfamily", title: "Felinae" },\r
  { key: 2, loc: "150 40", parent: 1, tax: "Genus", title: "Felis" },\r
  { key: 3, loc: "150 190", parent: 1, tax: "Genus", title: "Leopardus" },\r
  { key: 4, loc: "300 0", parent: 2, tax: "Species", title: "(Felis catus)",\r
    name: "Domestic Cat" },\r
  { key: 5, loc: "300 75", parent: 2, tax: "Species", title: "(Felis nigripes)",\r
    name: "Black-Footed Cat" },\r
  { key: 6, loc: "300 150", parent: 3, tax: "Species", title: "(Leopardus jacobita)",\r
    name: "Andean Cat" },\r
  { key: 7, loc: "300 225", parent: 3, tax: "Species", title: "(Leopardus pardalis)",\r
    name: "Ocelot" }\r
]);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(105, 0) })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0, parameter1: 8 })\r
        .bind("fill", "tax", getColor),\r
      new go.Panel("Vertical", { stretch: go.Stretch.Horizontal, margin: new go.Margin(3, 0) })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif", margin: 3 })\r
            .bind("text", "tax"),\r
          new go.Panel("Auto", { stretch: go.Stretch.Horizontal })\r
            .add(\r
              new go.Shape({ fill: "white", strokeWidth: 0 }),\r
              new go.Panel("Vertical", { padding: 3 })\r
                .add(\r
                  new go.TextBlock({ font: "bold 8pt georgia" })\r
                    .bind("text", "name")\r
                    .bind("visible", "tax", n => (n == "Species")),\r
                  new go.TextBlock({ margin: new go.Margin(2, 0) })\r
                    .bind("text", "title")\r
                    .bind("font", "tax", n => (n == "Species")? "italic 6pt sans-serif" : "" ),\r
                )\r
            )\r
        )\r
    );\r
\r
function getColor(tax) {\r
  if (tax == "Subfamily") return "#dd5420"\r
  if (tax == "Genus") return "#2E5CB8"\r
  if (tax == "Species") return "#14950E"\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
    .add(\r
      new go.Shape()\r
    );\r
\r
diagram.model = myModel;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`treeLayout`,code:`// automatic tree layout\r
diagram.layout = new go.TreeLayout();\r
\r
diagram.model = new go.TreeModel([\r
  { key: 1, tax: "Subfamily", title: "Felinae" },\r
  { key: 2, parent: 1, tax: "Genus", title: "Felis" },\r
  { key: 3, parent: 1, tax: "Genus", title: "Leopardus" },\r
  { key: 4, parent: 2, tax: "Species", title: "(Felis catus)", name: "Domestic Cat" },\r
  { key: 5, parent: 2, tax: "Species", title: "(Felis nigripes)", name: "Black-Footed Cat" },\r
  { key: 6, parent: 3, tax: "Species", title: "(Leopardus jacobita)", name: "Andean Cat" },\r
  { key: 7, parent: 3, tax: "Species", title: "(Leopardus pardalis)", name: "Ocelot" }\r
]);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(105, 0) })\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0, parameter1: 8 })\r
        .bind("fill", "tax", getColor),\r
      new go.Panel("Vertical", { stretch: go.Stretch.Horizontal, margin: new go.Margin(3, 0) })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif", margin: 3 })\r
            .bind("text", "tax"),\r
          new go.Panel("Auto", { stretch: go.Stretch.Horizontal })\r
            .add(\r
              new go.Shape({ fill: "white", strokeWidth: 0 }),\r
              new go.Panel("Vertical", { padding: 3 })\r
                .add(\r
                  new go.TextBlock({ font: "bold 8pt georgia" })\r
                    .bind("text", "name")\r
                    .bind("visible", "tax", n => (n == "Species")),\r
                  new go.TextBlock({ margin: new go.Margin(2, 0) })\r
                    .bind("text", "title")\r
                    .bind("font", "tax", n => (n == "Species")? "italic 6pt sans-serif" : "" ),\r
                )\r
            )\r
        )\r
    );\r
\r
function getColor(tax) {\r
  if (tax == "Subfamily") return "#dd5420"\r
  if (tax == "Genus") return "#2E5CB8"\r
  if (tax == "Species") return "#14950E"\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
    .add(\r
      new go.Shape()\r
    );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`angle`,code:`diagram.layout = new go.TreeLayout({ angle: 90 });\r
\r
diagram.model = new go.TreeModel([\r
  { key: 1, tax: "Subfamily", title: "Felinae" },\r
  { key: 2, parent: 1, tax: "Genus", title: "Felis" },\r
  { key: 3, parent: 1, tax: "Genus", title: "Leopardus" },\r
  { key: 4, parent: 2, tax: "Species", title: "(Felis catus)", name: "Domestic Cat" },\r
  { key: 5, parent: 2, tax: "Species", title: "(Felis nigripes)", name: "Black-Footed Cat" },\r
  { key: 6, parent: 3, tax: "Species", title: "(Leopardus jacobita)", name: "Andean Cat" },\r
  { key: 7, parent: 3, tax: "Species", title: "(Leopardus pardalis)", name: "Ocelot" }\r
]);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(105, 0) })\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0, parameter1: 8 })\r
        .bind("fill", "tax", getColor),\r
      new go.Panel("Vertical", { stretch: go.Stretch.Horizontal, margin: new go.Margin(3, 0) })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif", margin: 3 })\r
            .bind("text", "tax"),\r
          new go.Panel("Auto", { stretch: go.Stretch.Horizontal })\r
            .add(\r
              new go.Shape({ fill: "white", strokeWidth: 0 }),\r
              new go.Panel("Vertical", { padding: 3 })\r
                .add(\r
                  new go.TextBlock({ font: "bold 8pt georgia" })\r
                    .bind("text", "name")\r
                    .bind("visible", "tax", n => (n == "Species")),\r
                  new go.TextBlock({ margin: new go.Margin(2, 0) })\r
                    .bind("text", "title")\r
                    .bind("font", "tax", n => (n == "Species")? "italic 6pt sans-serif" : "" ),\r
                )\r
            )\r
        )\r
    );\r
\r
function getColor(tax) {\r
  if (tax == "Subfamily") return "#dd5420"\r
  if (tax == "Genus") return "#2E5CB8"\r
  if (tax == "Species") return "#14950E"\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
    .add(\r
      new go.Shape()\r
    );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`alignment`,code:`diagram.layout = new go.TreeLayout({ angle: 90, alignment: go.TreeAlignment.Start });\r
\r
diagram.model = new go.TreeModel([\r
  { key: 1, tax: "Subfamily", title: "Felinae" },\r
  { key: 2, parent: 1, tax: "Genus", title: "Felis" },\r
  { key: 3, parent: 1, tax: "Genus", title: "Leopardus" },\r
  { key: 4, parent: 2, tax: "Species", title: "(Felis catus)", name: "Domestic Cat" },\r
  { key: 5, parent: 2, tax: "Species", title: "(Felis nigripes)", name: "Black-Footed Cat" },\r
  { key: 6, parent: 3, tax: "Species", title: "(Leopardus jacobita)", name: "Andean Cat" },\r
  { key: 7, parent: 3, tax: "Species", title: "(Leopardus pardalis)", name: "Ocelot" }\r
]);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(105, 0) })\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0, parameter1: 8 })\r
        .bind("fill", "tax", getColor),\r
      new go.Panel("Vertical", { stretch: go.Stretch.Horizontal, margin: new go.Margin(3, 0) })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif", margin: 3 })\r
            .bind("text", "tax"),\r
          new go.Panel("Auto", { stretch: go.Stretch.Horizontal })\r
            .add(\r
              new go.Shape({ fill: "white", strokeWidth: 0 }),\r
              new go.Panel("Vertical", { padding: 3 })\r
                .add(\r
                  new go.TextBlock({ font: "bold 8pt georgia" })\r
                    .bind("text", "name")\r
                    .bind("visible", "tax", n => (n == "Species")),\r
                  new go.TextBlock({ margin: new go.Margin(2, 0) })\r
                    .bind("text", "title")\r
                    .bind("font", "tax", n => (n == "Species")? "italic 6pt sans-serif" : "" ),\r
                )\r
            )\r
        )\r
    );\r
\r
function getColor(tax) {\r
  if (tax == "Subfamily") return "#dd5420"\r
  if (tax == "Genus") return "#2E5CB8"\r
  if (tax == "Species") return "#14950E"\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
    .add(\r
      new go.Shape()\r
    );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`spacing`,code:`diagram.layout = new go.TreeLayout({ layerSpacing: 20, nodeSpacing: 0 });\r
\r
diagram.model = new go.TreeModel([\r
  { key: 1, tax: "Subfamily", title: "Felinae" },\r
  { key: 2, parent: 1, tax: "Genus", title: "Felis" },\r
  { key: 3, parent: 1, tax: "Genus", title: "Leopardus" },\r
  { key: 4, parent: 2, tax: "Species", title: "(Felis catus)", name: "Domestic Cat" },\r
  { key: 5, parent: 2, tax: "Species", title: "(Felis nigripes)", name: "Black-Footed Cat" },\r
  { key: 6, parent: 3, tax: "Species", title: "(Leopardus jacobita)", name: "Andean Cat" },\r
  { key: 7, parent: 3, tax: "Species", title: "(Leopardus pardalis)", name: "Ocelot" }\r
]);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(105, 0) })\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0, parameter1: 8 })\r
        .bind("fill", "tax", getColor),\r
      new go.Panel("Vertical", { stretch: go.Stretch.Horizontal, margin: new go.Margin(3, 0) })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif", margin: 3 })\r
            .bind("text", "tax"),\r
          new go.Panel("Auto", { stretch: go.Stretch.Horizontal })\r
            .add(\r
              new go.Shape({ fill: "white", strokeWidth: 0 }),\r
              new go.Panel("Vertical", { padding: 3 })\r
                .add(\r
                  new go.TextBlock({ font: "bold 8pt georgia" })\r
                    .bind("text", "name")\r
                    .bind("visible", "tax", n => (n == "Species")),\r
                  new go.TextBlock({ margin: new go.Margin(2, 0) })\r
                    .bind("text", "title")\r
                    .bind("font", "tax", n => (n == "Species")? "italic 6pt sans-serif" : "" ),\r
                )\r
            )\r
        )\r
    );\r
\r
function getColor(tax) {\r
  if (tax == "Subfamily") return "#dd5420"\r
  if (tax == "Genus") return "#2E5CB8"\r
  if (tax == "Species") return "#14950E"\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
    .add(\r
      new go.Shape()\r
    );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`sort`,code:`diagram.layout = new go.TreeLayout({ sorting: go.TreeSorting.Ascending });\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { minSize: new go.Size(105, 0) })\r
    .bind("text", "name")  // bind Part.text to support sorting\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0, parameter1: 8 })\r
        .bind("fill", "tax", getColor),\r
      new go.Panel("Vertical", { stretch: go.Stretch.Horizontal, margin: new go.Margin(3, 0) })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif", margin: 3 })\r
            .bind("text", "tax"),\r
          new go.Panel("Auto", { stretch: go.Stretch.Horizontal })\r
            .add(\r
              new go.Shape({ fill: "white", strokeWidth: 0 }),\r
              new go.Panel("Vertical", { padding: 3 })\r
                .add(\r
                  new go.TextBlock({ font: "bold 8pt georgia" })\r
                    .bind("text", "name")\r
                    .bind("visible", "tax", n => (n == "Species")),\r
                  new go.TextBlock({ margin: new go.Margin(2, 0) })\r
                    .bind("text", "title")\r
                    .bind("font", "tax", n => (n == "Species")? "italic 6pt sans-serif" : "" ),\r
                )\r
            )\r
        )\r
    );\r
\r
function getColor(tax) {\r
  if (tax == "Subfamily") return "#dd5420"\r
  if (tax == "Genus") return "#2E5CB8"\r
  if (tax == "Species") return "#14950E"\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
    .add(\r
      new go.Shape()\r
    );\r
\r
diagram.model = new go.TreeModel([\r
  { key: 1, tax: "Subfamily", title: "Felinae" },\r
  { key: 2, parent: 1, tax: "Genus", title: "Felis" },\r
  { key: 3, parent: 1, tax: "Genus", title: "Leopardus" },\r
  { key: 4, parent: 2, tax: "Species", title: "(Felis catus)", name: "Domestic Cat" },\r
  { key: 5, parent: 2, tax: "Species", title: "(Felis nigripes)", name: "Black-Footed Cat" },\r
  { key: 6, parent: 3, tax: "Species", title: "(Leopardus jacobita)", name: "Andean Cat" },\r
  { key: 7, parent: 3, tax: "Species", title: "(Leopardus pardalis)", name: "Ocelot" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Diagram("myDiagram", {\r
  layout:\r
    new go.TreeLayout({\r
      sorting: go.TreeSorting.Ascending,\r
      comparer: (a, b) => {\r
        // A and B are TreeVertexes\r
        const av = a.node.data.someProp;\r
        const bv = b.node.data.someProp;\r
        if (av < bv) return -1;\r
        if (av > bv) return 1;\r
        return 0;\r
      }\r
    })\r
})`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`15wuydf`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};