import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Item arrays`,figures:!0},htmlContent:`<h1>Panel item arrays</h1>\r
<p>\r
  How does one display a variable number of elements in a node by data binding to a JavaScript Array?\r
  The answer is simple: just bind (or set) <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a>.\r
  The <a href="../api/symbols/Panel.html" target="api">Panel</a> will create an element in the panel for each value in the Array.\r
</p>\r
<p>\r
  See samples that make use of item Arrays in the <a href="../samples/#itemarrays">samples index</a>.\r
</p>\r
\r
<h2 id="SimpleItemLists"><a class="not-prose heading-anchor" href="#SimpleItemLists">Simple item lists</a></h2>\r
<p>\r
  Here is a very simple example demonstrating the standard way of binding <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a> to a data property whose value is an Array.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Note that the <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a> property is almost always bound to some data property that always has an Array as its value.\r
  One does not use a literal or constructed Array as the initial value for the Panel.itemArray property in a template,\r
  unless you expect all Parts copied from the template will always have exactly the same unchanging list of items.\r
</p>\r
<p>\r
  As with most data bindings, the name of the data property does not really matter.\r
  In this example, the property name is "items", but you can use whatever name seems appropriate to your app.\r
  You can also have more than one item array in a node or link.\r
</p>\r
\r
<h2 id="ItemTemplates"><a class="not-prose heading-anchor" href="#ItemTemplates">Item templates</a></h2>\r
<p>\r
  You can customize the elements created for each array item by specifying the <a href="../api/symbols/Panel.html#itemtemplate" target="api">Panel.itemTemplate</a>.\r
  The template must be an instance of <a href="../api/symbols/Panel.html" target="api">Panel</a>.\r
  Each item in the bound Array will get a copy of this Panel that is added to the Panel with the <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a>.\r
  The <a href="../api/symbols/Panel.html#data" target="api">Panel.data</a> will be the item in the Array, so all of the normal data binding functionality is available to customize each item Panel.\r
</p>\r
<p>\r
  This use of templates and data binding is similar to the way <a href="../api/symbols/Node.html" target="api">Node</a>s are created automatically in a <a href="../api/symbols/Diagram.html" target="api">Diagram</a> based on an Array of node data in the model.\r
  The value of <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a> must always be a <a href="../api/symbols/Node.html" target="api">Node</a> or a simple <a href="../api/symbols/Part.html" target="api">Part</a>;\r
  the value of <a href="../api/symbols/Panel.html#itemtemplate" target="api">Panel.itemTemplate</a> must always be a <a href="../api/symbols/Panel.html" target="api">Panel</a> and cannot be a <a href="../api/symbols/Part.html" target="api">Part</a>.\r
</p>\r
<p>\r
  Note that each item in the <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a> can be any JavaScript value, including strings and numbers.\r
  This is different from the values held by the <a href="../api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a>, which must all be JavaScript Objects.\r
  The item <a href="../api/symbols/Panel.html#data" target="api">Panel.data</a> value may be a string, as it is in this example; the <a href="../api/symbols/Part.html#data" target="api">Part.data</a> value will always be an Object.\r
</p>\r
<p>\r
  Here is a simple customization of the <a href="../api/symbols/Panel.html#itemtemplate" target="api">Panel.itemTemplate</a>, where each item Array is still just a list of strings.\r
  Note that the second argument to the <a href="../api/symbols/Binding.html" target="api">Binding</a> constructor in this case is the empty string,\r
  because strings (and numbers) do not have many useful properties.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  However even when binding to strings or numbers, one could make use of converters to get the desired binding values.\r
</p>\r
\r
<p>\r
  Of course if the array items are Objects, you can refer to their properties just as you can in a <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a>. As with node data, you can have\r
  as many properties on your item data as your app demands, using whatever property names you prefer. Use data binding to automatically use those property\r
  values to customize the appearance and behavior of your item Panels.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="DifferentPanelTypes"><a class="not-prose heading-anchor" href="#DifferentPanelTypes">Different Panel types</a></h2>\r
<p>\r
  Although <a href="../api/symbols/Panel.html" target="api">Panel</a>s that have an item array are often of type <a href="../api/symbols/Panel.html#vertical" target="api">Panel.Vertical</a>,\r
  you can use other panel types that support a variable number of elements.\r
  The most common types are <a href="../api/symbols/Panel.html#vertical" target="api">Panel.Vertical</a>, <a href="../api/symbols/Panel.html#horizontal" target="api">Panel.Horizontal</a>, <a href="../api/symbols/Panel.html#table" target="api">Panel.Table</a>, and <a href="../api/symbols/Panel.html#position" target="api">Panel.Position</a>.\r
  It does not make sense to use a <a href="../api/symbols/Panel.html#viewbox" target="api">Panel.Viewbox</a> panel, because that panel type only supports a single element.\r
</p>\r
<p>\r
  If the panel type is <a href="../api/symbols/Panel.html#spot" target="api">Panel.Spot</a>, <a href="../api/symbols/Panel.html#auto" target="api">Panel.Auto</a>, or <a href="../api/symbols/Panel.html#link" target="api">Panel.Link</a>,\r
  the first child element of the Panel is assumed to be the "main" object and is kept as the first child\r
  in addition to all of the nested panels created for the values in the <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a>.\r
</p>\r
<p>\r
  Here is an example of a horizontal Panel:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  When using a <a href="../api/symbols/Panel.html" target="api">Panel</a> of type <a href="../api/symbols/Panel.html#table" target="api">Panel.Table</a> as the container,\r
  it is commonplace to use an item template that is of type <a href="../api/symbols/Panel.html#tablerow" target="api">Panel.TableRow</a> or <a href="../api/symbols/Panel.html#tablecolumn" target="api">Panel.TableColumn</a>.\r
  This is the only way to specify the individual column or row indexes for the elements inside the template.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  Note in this case the item template has a data binding of the TableRow Panel's <a href="../api/symbols/Panel.html#background" target="api">Panel.background</a> property to the item data's "back" property.\r
</p>\r
\r
<p>\r
  Sometimes one wants to get the row for a particular item, or one wants to have a property value depend on the row index.\r
  You can always depend on the value of <a href="../api/symbols/Panel.html#itemindex" target="api">Panel.itemIndex</a> to get the index.\r
  If the item Panel is of type <a href="../api/symbols/Panel.html#tablerow" target="api">Panel.TableRow</a>, the item Panel's <a href="../api/symbols/GraphObject.html#row" target="api">GraphObject.row</a> property will also be set to the zero-based row number,\r
  so you can access it in code by finding that Panel.\r
  The same is true for <a href="../api/symbols/GraphObject.html#column" target="api">GraphObject.column</a> if the itemTemplate is a <a href="../api/symbols/Panel.html#tablecolumn" target="api">Panel.TableColumn</a> Panel.\r
</p>\r
<p>\r
  Because that property is set when the item panels are created for Array item data,\r
  you can create <a href="../api/symbols/Binding.html" target="api">Binding</a>s where the source is that "row" property:\r
  <code>.bindObject("targetProperty", "row", i => ...)</code>.\r
  The following example demonstrates binding the Panel.background property to be light green if the row is even.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  The natural way to have a distinct header for a Table Panel is to have the first row (i.e. the first item) hold the data for the header, but have it be styled\r
  differently. If you want such a behavior, you will want to use multiple templates -- see the example in <a href="templateMaps#ExampleOfItemTemplates">Template Maps</a>.\r
</p>\r
<p>\r
  If instead you want to have a table header that is "fixed" and not dependent on item Array data, you can have a single "TableRow" (or "TableColumn") Panel in\r
  the "Table" Panel that is kept if <a href="../api/symbols/Panel.html#ispanelmain" target="api">Panel.isPanelMain</a> is true.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  In such cases the constant header element, the literal "TableRow" Panel in the node template,\r
  will have a <a href="../api/symbols/GraphObject.html#row" target="api">GraphObject.row</a> == 0 and a <a href="../api/symbols/Panel.html#itemindex" target="api">Panel.itemIndex</a> that is NaN.\r
  The "TableRow" Panel corresponding to the first item data, <code>panel.itemArray[0]</code>,\r
  will have a <a href="../api/symbols/GraphObject.html#row" target="api">GraphObject.row</a> == 1, matching its position in the list of <a href="../api/symbols/Panel.html#elements" target="api">Panel.elements</a>.\r
  But it will have a <a href="../api/symbols/Panel.html#itemindex" target="api">Panel.itemIndex</a> == 0, matching its position in the itemArray.\r
</p>\r
\r
<h2 id="ArraysInModels"><a class="not-prose heading-anchor" href="#ArraysInModels">Arrays in Models</a></h2>\r
<p>\r
  When a data-bound Part is copied, the Part's <a href="../api/symbols/Part.html#data" target="api">Part.data</a>, which must be a JavaScript Object, is copied too.\r
  The normal copying method, <a href="../api/symbols/Model.html#copynodedata" target="api">Model.copyNodeData</a>, makes a shallow copy of the original data object.\r
</p>\r
<p>\r
  However that is probably not the desired behavior for Arrays.\r
  When you use item Arrays, you normally do <em>not</em> want to share those Arrays between copies of the Node.\r
  If your node data is not copied correctly, unexpected behavior may occur.\r
  So when you are using item Arrays and permit users to copy nodes, you will need to make sure such Arrays and their objects are copied.\r
  For the simplest cases, it may be sufficient to set <a href="../api/symbols/Model.html#copiesarrays" target="api">Model.copiesArrays</a> and <a href="../api/symbols/Model.html#copiesarrayobjects" target="api">Model.copiesArrayObjects</a> to true.\r
  More generally you may want to implement your own node data copier function and assign it to <a href="../api/symbols/Model.html#copynodedatafunction" target="api">Model.copyNodeDataFunction</a>.\r
</p>\r
<p>\r
  This is demonstrated by the <a href="../samples/dynamicPorts">Dynamic Ports</a> sample,\r
  which not only needs to copy the four item Arrays that each node data holds,\r
  but also each Object that is in each of those Arrays.\r
  In that sample the <a href="../api/symbols/Model.html#copiesarrays" target="api">Model.copiesArrays</a> and <a href="../api/symbols/Model.html#copiesarrayobjects" target="api">Model.copiesArrayObjects</a> properties\r
  are set to true in the JSON-formatted representation of the model that is loaded into the diagram.\r
</p>\r
<p>\r
  For <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a>s, there is also a similar members for link data: the <a href="../api/symbols/GraphLinksModel.html#copylinkdata" target="api">GraphLinksModel.copyLinkData</a> method and\r
  <a href="../api/symbols/GraphLinksModel.html#copylinkdatafunction" target="api">GraphLinksModel.copyLinkDataFunction</a> property.\r
</p>\r
<p>\r
  If you need to dynamically modify the value of a property of an item data, call <a href="../api/symbols/Model.html#setdataproperty" target="api">Model.setDataProperty</a>, just as you would for node data or link data.\r
</p>\r
<p>\r
  If you need to add or remove items from an item Array, call the <a href="../api/symbols/Model.html#insertarrayitem" target="api">Model.insertArrayItem</a> or <a href="../api/symbols/Model.html#removearrayitem" target="api">Model.removeArrayItem</a> methods.\r
</p>\r
`,codeBlocks:[{id:`simple`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#D4FAFC" }),\r
      new go.Panel("Vertical")\r
        .bind("itemArray", "items")\r
    )\r
\r
diagram.model = new go.Model([\r
  { key: 1, items: [ "Alpha", "Beta", "Gamma", "Delta" ] },\r
  { key: 2, items: [ "first", "second", "third" ] }\r
]);`,isExecutable:!0,animation:!1,minHeight:260,language:`js`,initiallyVisible:!0},{id:`vertical`,code:`const myTemplate = new go.Panel("Auto", { margin: new go.Margin(0, 0, 1, 0) })\r
  .add(\r
    new go.Shape("RoundedRectangle", { fill: "#e2e8f0", stroke: null }),\r
    new go.TextBlock({ margin: new go.Margin(5, 15), alignment: go.Spot.Left, stroke: "#334155"})\r
      .bind("text", "", n => "# " + n) // binds text to the item value\r
  );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "#f1f5f9", stroke: "#e2e8f0", strokeWidth: 1 }),\r
      new go.Panel("Vertical", { margin: 8, defaultStretch: go.Stretch.Horizontal,\r
        // itemTemplate is used to define a panel for each of the items\r
        itemTemplate: myTemplate\r
      })\r
        .bind("itemArray", "items")\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: 1, items: [ "general", "random", "engineering", "design" ] }\r
]);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`verticalobjects`,code:`const lineSettings = { height: 0, stretch: go.Stretch.Horizontal, stroke: "#d8b75a" }\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Panel("Vertical", {\r
        itemTemplate:\r
          new go.Panel("Auto")\r
            .add(\r
              new go.Shape("RoundedRectangle", { parameter1: 1, stroke: "#2b1a0e" })\r
                // each book is an Object, so you can bind to its properties\r
                .bind("fill", "color")\r
                .bind("width")\r
                .bind("height"),\r
              new go.Panel("Vertical", { margin: new go.Margin(5, 26) })\r
                .add(\r
                  new go.Shape("LineH", lineSettings),\r
                  new go.TextBlock({ font: "italic 11pt serif", stroke: "#e8cd83", margin: 1 })\r
                    .bind("text", "title"), // binding to the title property of each item\r
                  new go.Shape("LineH", lineSettings)\r
                )\r
            )\r
      })\r
        .bind("itemArray", "books")\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: 1,\r
    books: [\r
      { title: "Lexicon", color: "#432135", width: 110, height: 30 },\r
      { title: "The Odyssey", color: "#1f2d4a", width: 180, height: 30 },\r
      { title: "Moby-Dick", color: "#6e1f1f", width: 155, height: 25 },\r
      { title: "Paradise Lost", color: "#2f4a36", width: 175, height: 30 },\r
      { title: "Atlas of the World", color: "#5c3a1a", width: 240, height: 40 }\r
    ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`horizontal`,code:`const myTemplate = new go.Panel("Auto", { margin: 1 })\r
  .add(\r
    new go.Shape("RoundedRectangle", { fill: "white", desiredSize: new go.Size(30, 44) }),\r
    new go.Panel("Vertical")\r
      .add(\r
        new go.TextBlock({ font: "bold 13pt sans-serif" })\r
          .bind("text", "r")\r
          .bind("stroke", "s", s => (s === "♥" || s === "♦") ? "red" : "black"),\r
        new go.TextBlock({ font: "13pt sans-serif" })\r
          .bind("text", "s")\r
          .bind("stroke", "s", s => (s === "♥" || s === "♦") ? "red" : "black")\r
      )\r
  );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#15803d", strokeWidth: 2 }),\r
      new go.Panel("Vertical", { margin: 8 })\r
        .add(\r
          new go.TextBlock({ stroke: "white", font: "bold 10pt sans-serif" })\r
            .bind("text", "key"),\r
          // Horizontal Panel organizes item array from left to right\r
          new go.Panel("Horizontal", { margin: new go.Margin(7, 0, 0, 0),\r
            itemTemplate: myTemplate // Item template design for each card\r
          })\r
            .bind("itemArray", "hand")\r
        )\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: "Player 1",\r
    hand: [ {r:"A", s:"♠"}, {r:"K", s:"♠"}, {r:"Q", s:"♠"}, {r:"J", s:"♠"}, {r:"10", s:"♠"} ]\r
  },\r
  { key: "Player 2",\r
    hand: [ {r:"7", s:"♥"}, {r:"7", s:"♦"}, {r:"7", s:"♣"}, {r:"9", s:"♥"}, {r:"2", s:"♠"} ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`table`,code:`const lineSettings = { stroke: "#bab383", fill: null, width: 2, stretch: go.Stretch.Vertical }\r
\r
const myTemp = new go.Panel("TableRow", { defaultStretch: go.Stretch.Horizontal })\r
  .bind("background", "back") // highlight the featured row via the "back" property\r
  .add(\r
    new go.TextBlock({ margin: 2, font: "8pt georgia", stroke: "#85b38f" })\r
      .bind("text", "rank", r => (r < 10 ? "0" : "") + r),\r
    new go.Shape({ ...lineSettings, column: 1 }),\r
    new go.TextBlock({ column: 2, width: 150, margin: new go.Margin(2, 15), font: "10pt georgia" })\r
      .bind("text", "name"),\r
    new go.Shape({ ...lineSettings, column: 3 }),\r
    new go.TextBlock("$", { column: 4, width: 92, stroke: "#85b38f", margin: 3 }),\r
    new go.TextBlock({ column: 4, margin: new go.Margin(2, 14), font: "10pt georgia" })\r
      .bind("text", "sales", s => s.toLocaleString())\r
  );\r
\r
const header = new go.Panel("Horizontal", { alignment: go.Spot.Left })\r
  .add(\r
    new go.TextBlock("Title", { font: "8pt sans-serif", stroke: "#85b38f", margin: 2 }),\r
    new go.TextBlock("Sales Ledger", { font: "9pt georgia", margin: new go.Margin(0, 20) }),\r
    makeLine(true)\r
  );\r
\r
const subheader = new go.Panel("Horizontal", { alignment: go.Spot.Left })\r
  .add(\r
    new go.TextBlock("Date", { font: "7pt sans-serif", stroke: "#85b38f", margin: 2 }),\r
    new go.TextBlock("4/1/1995", { font: "7pt georgia", margin: new go.Margin(0, 12)}),\r
    makeLine(true),\r
    new go.TextBlock("Company", { font: "7pt sans-serif", stroke: "#85b38f", margin: 2 }),\r
    new go.TextBlock("Northwoods Software", { font: "7pt georgia", margin: new go.Margin(0, 12) })\r
  );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {desiredSize: new go.Size(375, 250)})\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#eef0db", strokeWidth: 0, parameter1: 40 }),\r
      new go.Panel("Horizontal")\r
        .add(\r
          makeLine(true),\r
          new go.Panel("Vertical")\r
            .add(\r
              makeLine(),\r
              header,\r
              makeLine(),\r
              subheader,\r
              makeLine(),\r
              new go.Panel("Table", { defaultRowSeparatorStroke: "#85b38f", itemTemplate: myTemp })\r
                .bind("itemArray", "reps"),\r
              makeLine()\r
            ),\r
          makeLine(true),\r
          new go.Panel("Vertical", { stretch: go.Stretch.Vertical })\r
            .add(\r
              new go.Shape("Circle", { fill: "white", margin: new go.Margin(0,5), width: 12 }),\r
              new go.Shape("Circle", { fill: "white", margin: new go.Margin(28,5), width: 12 }),\r
              new go.Shape("Circle", { fill: "white", margin: new go.Margin(28,5), width: 12 }),\r
              new go.Shape("Circle", { fill: "white", margin: new go.Margin(0,5), width: 12 })\r
            ),\r
        ),\r
    );\r
\r
function makeLine(v) {\r
  return new go.Shape({ strokeWidth: 1, stroke: "#bab383", fill: null,\r
    width: (v)? 2 : NaN,\r
    height: (v)? NaN : 2,\r
    stretch: (v)? go.Stretch.Vertical : go.Stretch.Horizontal\r
  });\r
}\r
\r
diagram.model = new go.Model([\r
  { key: "leaderboard",\r
    reps: [\r
      { rank: 1, name: "Alice", sales: 248500 },\r
      { rank: 2, name: "You", sales: 223100, back: "#F5FF3795" },\r
      { rank: 3, name: "Bob", sales: 199800 },\r
      { rank: 4, name: "Carol", sales: 184200 },\r
      { rank: 5, name: "Robert", sales: 156000 },\r
      { rank: 6, name: "Ted", sales: 142100 }\r
    ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`alternating`,code:`const myTemplate = new go.Panel("TableRow", { defaultStretch: go.Stretch.Horizontal })\r
  // binds the background property to the row value to create alternating rows\r
  .bindObject("background", "row", i => (i % 2 === 0) ? "#e6f4ea" : "white")\r
  .add(\r
    new go.TextBlock({ margin: new go.Margin(4,8), stroke: "#80868b" })\r
      .bindObject("text", "row", i => (i + 1).toString()),\r
    new go.TextBlock({ column: 1, font: "bold 10pt sans-serif", stroke: "#202124" })\r
      .bind("text", "symbol"),\r
    new go.TextBlock({ column: 2, margin: new go.Margin(4, 8), stroke: "#3c4043" })\r
      .bind("text", "price", p => "$" + p.toFixed(2)),\r
    new go.TextBlock({ column: 3, margin: new go.Margin(4, 8) })\r
      // binding functions format the text and color based on the change\r
      .bind("text", "change", c => (c >= 0 ? "+" : "") + c.toFixed(2) + "%")\r
      .bind("stroke", "change", c => c >= 0 ? "#1e8e3e" : "#d93025")\r
  );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "#dadce0", strokeWidth: 1 }),\r
      new go.Panel("Table", { margin: 6, itemTemplate: myTemplate })\r
        .bind("itemArray", "stocks")\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: "watchlist",\r
    stocks: [\r
      { symbol: "ZYNX", price: 189.25, change: 1.24 },\r
      { symbol: "QORP", price: 142.60, change: -0.85 },\r
      { symbol: "VNTA", price: 412.30, change: 2.10 },\r
      { symbol: "BLZE", price: 178.90, change: 0.45 },\r
      { symbol: "NUVO", price: 245.15, change: -3.20 },\r
      { symbol: "ORBX", price: 875.40, change: 5.60 }\r
    ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`header`,code:`const settings = { margin: new go.Margin(2, 12, 2, 0), font: "13px cursive"}\r
\r
const myTemplate = new go.Panel("TableRow")\r
  .add(\r
    new go.TextBlock({ column: 0, ...settings})\r
      .bind("text", "name"),\r
    new go.TextBlock({ column: 1, ...settings})\r
      .bind("text", "phone"),\r
    new go.TextBlock({ column: 2, ...settings})\r
      .bind("text", "loc")\r
  );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { isShadowed: true, shadowOffset: new go.Point(3, 3) })\r
    .add(\r
      new go.Shape("Rectangle", { strokeWidth: 0, fill: "#fff6a0" }),\r
      new go.Panel("Table", { margin: 16, itemTemplate: myTemplate })\r
        .bind("itemArray", "people")\r
        .add(\r
          // Header panel with isPanelMain set to true so the item array doesn't overwrite it\r
          new go.Panel("TableRow", { isPanelMain: true })\r
            .add(\r
              new go.TextBlock("Contacts", { columnSpan: 3, alignment: go.Spot.Center,\r
                margin: new go.Margin(0, 0, 10, 0), font: "bold 22px cursive"\r
              })\r
            )\r
        )\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: "group1",\r
    people: [\r
      { name: "Alice", phone: "x2345", loc: "C4-E18" },\r
      { name: "Bob", phone: "x9876", loc: "E1-B34" },\r
      { name: "Carol", phone: "x1111", loc: "C4-E23" },\r
      { name: "Ted", phone: "x2222", loc: "C4-E197" },\r
      { name: "Robert", phone: "x5656", loc: "B1-A27" },\r
      { name: "Natalie", phone: "x5698", loc: "B1-B6" }\r
    ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1nen40z`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};