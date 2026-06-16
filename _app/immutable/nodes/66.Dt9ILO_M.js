import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Template maps`,figures:!0},htmlContent:`<h1>Template maps</h1>\r
<p>\r
  Many of the previous examples have provided custom templates for nodes, groups, or links.\r
  Those examples have shown how to make simple adaptations of the templates for particular data instances via data binding.\r
  But what if you want to have nodes with drastically different appearances or behaviors in a single diagram at the same time?\r
</p>\r
<p>\r
  It is possible to define a node template that includes all possible configurations for all of the kinds of nodes that you want to display.\r
  There would need to be a lot of data binding and/or code to make the needed changes.\r
  Often you will want to make not-<a href="../api/symbols/GraphObject.html#visible" target="api">GraphObject.visible</a> large parts of the template in order to make visible the one panel\r
  that you want to show.\r
  But this technique is difficult to use -- templates get way too complicated too quickly.\r
</p>\r
<p>\r
  Instead GoJS supports as many templates as you want -- you choose dynamically which one you want to use\r
  to represent a particular node data.\r
  This does mean potentially a lot of templates, but each one will be much simpler, easier to write, and easier to maintain.\r
</p>\r
<p>\r
  Each <a href="../api/symbols/Diagram.html" target="api">Diagram</a> actually holds a <a href="../api/symbols/Map.html" target="api">Map</a> of templates for each type of <a href="../api/symbols/Part.html" target="api">Part</a>: <a href="../api/symbols/Node.html" target="api">Node</a>, <a href="../api/symbols/Group.html" target="api">Group</a>, and <a href="../api/symbols/Link.html" target="api">Link</a>.\r
  Each Map associates a "category" name with a template.\r
  For example, when the diagram wants to create a <a href="../api/symbols/Node.html" target="api">Node</a> for a particular node data object, the diagram uses that node\r
  data's category to look up the node template in the <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a>.\r
  Similar lookups are done using the <a href="../api/symbols/Diagram.html#grouptemplatemap" target="api">Diagram.groupTemplateMap</a> and the <a href="../api/symbols/Diagram.html#linktemplatemap" target="api">Diagram.linkTemplateMap</a>.\r
</p>\r
<p>\r
  Each <a href="../api/symbols/Diagram.html" target="api">Diagram</a> initially has its own template maps stocked with predefined categories.\r
  The default category for any data object is the empty string, "".\r
  The <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a> initially contains for the empty string a very simple <a href="../api/symbols/Node.html" target="api">Node</a> template holding\r
  a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> whose <a href="../api/symbols/TextBlock.html#text" target="api">TextBlock.text</a> property is data bound to the data converted to a string.\r
  You can see the default templates for nodes, groups, and links in a number of the previous examples,\r
  such as the <a href="groups#GroupsLinks">Groups and Links</a> example.\r
</p>\r
<p>\r
  The value of <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a> is just the value of <code>thatDiagram.nodeTemplateMap.get("")</code>.\r
  Setting <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a> just replaces the template in <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a> named with the empty string.\r
</p>\r
<p>\r
  The implementations of all predefined templates are provided in <a href="../extensions/Templates.js">Templates.js</a>\r
  in the Extensions directory.\r
  You may wish to copy and adapt these definitions when creating your own templates.\r
</p>\r
\r
<h2 id="ExampleOfNodeTemplates"><a class="not-prose heading-anchor" href="#ExampleOfNodeTemplates">Example of Node templates</a></h2>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  By default the way that the model and diagram know about the category of a node data or a link data is by looking at its category property.\r
  If you want to use a different property on the data, for example because you want to use the category property to mean something different,\r
  set <a href="../api/symbols/Model.html#nodecategoryproperty" target="api">Model.nodeCategoryProperty</a> to be the name of the property that results in the actual category string value.\r
  Or set <a href="../api/symbols/Model.html#nodecategoryproperty" target="api">Model.nodeCategoryProperty</a> to be the empty string to cause all nodes to use the default node template.\r
</p>\r
\r
<h2 id="ExampleOfItemTemplates"><a class="not-prose heading-anchor" href="#ExampleOfItemTemplates">Example of item templates</a></h2>\r
<p>\r
  For Panels with a value for <a href="../api/symbols/Panel.html#itemarray" target="api">Panel.itemArray</a>, there is also the <a href="../api/symbols/Panel.html#itemtemplatemap" target="api">Panel.itemTemplateMap</a>.\r
  As with Nodes and Groups and Links, the <a href="../api/symbols/Panel.html#itemtemplate" target="api">Panel.itemTemplate</a> is just a reference to the template named with\r
  the empty string in the <a href="../api/symbols/Panel.html#itemtemplatemap" target="api">Panel.itemTemplateMap</a>.\r
  Similarly, the <a href="../api/symbols/Panel.html#itemcategoryproperty" target="api">Panel.itemCategoryProperty</a> names the property on the item data that identifies the template\r
  to use from the itemTemplateMap.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="ExampleOfTableHeaderShowingItemData"><a class="not-prose heading-anchor" href="#ExampleOfTableHeaderShowingItemData">Example of table header showing item data</a></h2>\r
<p>\r
  The natural way to have a distinct header for a Table Panel is to have the first row (i.e. the first item)\r
  hold the data for the header, but have it be styled differently.\r
  In this example we define a "Header" item template in the <a href="../api/symbols/Panel.html#itemtemplatemap" target="api">Panel.itemTemplateMap</a>.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  If you do not want to have the header data in the itemArray, and you want to define the header in the\r
  node template rather than as an item template, see the example in <a href="itemArrays">Item Arrays</a>.\r
</p>\r
\r
<h2 id="ChangingCategoryOfPart"><a class="not-prose heading-anchor" href="#ChangingCategoryOfPart">Changing category of a Part</a></h2>\r
<p>\r
  To change the representation of a data object, call <a href="../api/symbols/Model.html#setcategoryfornodedata" target="api">Model.setCategoryForNodeData</a> or <a href="../api/symbols/GraphLinksModel.html#setcategoryforlinkdata" target="api">GraphLinksModel.setCategoryForLinkData</a>.\r
  (If you set the <a href="../api/symbols/Part.html#category" target="api">Part.category</a> of a data bound <a href="../api/symbols/Part.html" target="api">Part</a>, it will call the Model method for you.)\r
  This causes the diagram to discard any existing Part for the data and re-create it using the new template\r
  that is associated with the new category value.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  Click the red pushpin on any note to toggle dynamically between the "simple" and the "detailed" category.\r
</p>\r
\r
<h2 id="ChangingTemplateMaps"><a class="not-prose heading-anchor" href="#ChangingTemplateMaps">Changing template maps</a></h2>\r
<p>\r
  You can also replace one or all of the diagram's template maps (e.g. <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a>)\r
  in order to discard and re-create all of the nodes in the diagram.\r
  If you are only using the default template for nodes, you would only need to replace the <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a>.\r
</p>\r
<p>\r
  One common circumstance for doing this is as the <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a> changes.\r
  When the user zooms out far enough, there is no point in having too much detail about each of the nodes.\r
</p>\r
<p>\r
  If you zoom out in this example, the <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listener will detect when the <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>\r
  becomes small enough to use the simpler template for all of the nodes.\r
  Zoom in again and suddenly it uses the more detailed template.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  Caution: if you modify a template <a href="../api/symbols/Map.html" target="api">Map</a>, there is no notification that the map has changed.\r
  You will need to call <a href="../api/symbols/Diagram.html#rebuildparts" target="api">Diagram.rebuildParts</a> explicitly.\r
  If you are replacing the <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a> or the <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a> or the\r
  corresponding properties for Groups or Links, the Diagram property setters will automatically call <a href="../api/symbols/Diagram.html#rebuildparts" target="api">Diagram.rebuildParts</a>.\r
</p>\r
<p>\r
  When one or more templates are replaced in a diagram, layouts are automatically performed again.\r
</p>\r
`,codeBlocks:[{id:`templates`,code:`// the "simple" template just shows the text string and the color in the background\r
const simpletemplate =\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Panel("Auto", { height: 35, width: 100 })\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "white", parameter2: 3, stroke: null }),\r
          new go.TextBlock()\r
            .bind("text")\r
            .bind("stroke", "color")\r
        ),\r
      new go.Panel("Auto", { height: 35, width: 100 })\r
        .add(\r
          new go.Shape("RoundedRectangle", { parameter2: 12, stroke: null })\r
            .bind("fill", "color"),\r
          new go.TextBlock({ stroke: "white", flip: go.Flip.Both })\r
            .bind("text")\r
        )\r
    );\r
\r
// the "detailed" template shows a more complex node\r
const detailtemplate =\r
  new go.Node("Spot", { width: 70, height: 70 })\r
    .add(\r
      new go.Shape("Circle", { fill: "white", strokeWidth: 3, angle: 270 })\r
        .bind("stroke", "color", n => new go.Brush("Linear", {\r
          0: go.Brush.darkenBy(n, 0.2), 1: go.Brush.lightenBy(n, 0.2)\r
        })),\r
      makeSlice(17, 0.43, 0.73),\r
      makeSlice(53, 0.33, 0.64),\r
      makeSlice(92, 0.29, 0.5),\r
      makeSlice(126, 0.32, 0.37),\r
      makeSlice(163, 0.42, 0.28),\r
      makeSlice(198, 0.56, 0.29),\r
      makeSlice(233, 0.67, 0.37),\r
      makeSlice(267, 0.72, 0.51),\r
      makeSlice(306, 0.68, 0.64),\r
      makeSlice(344, 0.57, 0.73),\r
    );\r
\r
function makeSlice(angle, x, y) {\r
  return new go.Shape({ geometryString: "F M 2 0 L 4 6 Q 2 7 0 6 L 2 0",\r
    strokeWidth: 0, height: 28, width: 15,\r
    alignment: new go.Spot(x, y),\r
    angle: angle,\r
  }).bind("fill", "color");\r
}\r
\r
// create the nodeTemplateMap, holding three separate node templates\r
const templmap = new go.Map(); // In TypeScript you could write: new go.Map<string, go.Node>();\r
// for each of the node categories, specify which template to use\r
templmap.add("simple", simpletemplate);\r
templmap.add("detailed", detailtemplate);\r
// for the default category, "", use the same template that Diagrams use by default;\r
// this just shows the name value as a simple TextBlock\r
templmap.add("", diagram.nodeTemplate);\r
\r
diagram.nodeTemplateMap = templmap;\r
diagram.layout = new go.GridLayout({ wrappingColumn: 2 });\r
diagram.model = new go.Model([\r
  { key: "O1", text: "Orange", color: "#f06932" },  // uses default category: ""\r
  { key: "L1", text: "Lime", color: "#01bf41" },  // uses default category: ""\r
  { key: "O2", text: "Orange", color: "#f06932", category: "detailed" },\r
  { key: "L2", text: "Lime", color: "#01bf41", category: "detailed" },\r
  { key: "O3", text: "Orange", color: "#f06932", category: "simple" },\r
  { key: "L3", text: "Lime", color: "#01bf41", category: "simple" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`itemTemplates`,code:`// create a template map for items\r
// In TypeScript you could write: new go.Map<string, go.Panel>();\r
const itemtemplates = new go.Map();\r
\r
// the template when type == "item"\r
itemtemplates.add("item",\r
  new go.Panel("Spot", { stretch: go.Stretch.Horizontal })\r
    .add(\r
      new go.Panel("Table", { stretch: go.Stretch.Horizontal, margin: new go.Margin(2, 0) })\r
        .addColumnDefinition(0, { width: 10 })\r
        .addColumnDefinition(1, { width: 50 })\r
        .add(\r
          new go.TextBlock("%", { alignment: go.Spot.Left, font: "bold 8pt courier new" }),\r
          new go.TextBlock({ column: 1, alignment: go.Spot.Right, font: "bold 8pt courier new" })\r
            .bind("text", "code"),\r
          new go.TextBlock({ column: 2, alignment: go.Spot.Left, font: "bold 8pt courier new",\r
            margin: new go.Margin(0, 8)\r
          })\r
            .bind("text", "name"),\r
          new go.TextBlock({ column: 3, alignment: go.Spot.Right, font: "bold 8pt courier new" })\r
            .bind("text", "price", n => n.toFixed(2))\r
        ),\r
    )\r
);\r
// the template when type == "final"\r
itemtemplates.add("final",\r
  new go.Panel("Auto", { stretch: go.Stretch.Horizontal, margin: new go.Margin(2, 0) })\r
    .add(\r
      new go.TextBlock({ alignment: go.Spot.Left, font: "bold 9pt courier new" })\r
        .bind("text", "name"),\r
      new go.TextBlock({ alignment: go.Spot.Right, font: "bold 9pt courier new" })\r
        .bind("text", "price", n => n.toFixed(2))\r
    )\r
);\r
// the template when type == "line"\r
itemtemplates.add("line",\r
  new go.Panel("Vertical")\r
    .add(\r
      new go.Shape("LineH", { stretch: go.Stretch.Horizontal, height: 1,\r
        margin: new go.Margin(9, 0), stroke: "#9a9a8f", strokeDashArray: [4, 2]\r
      })\r
    )\r
);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { isShadowed: true, shadowColor: "#00000044", shadowBlur: 9 })\r
    .add(\r
      new go.Shape("Rectangle", { fill: "#fcfbf6", stroke: "#d9d6c7", strokeWidth: 1 }),\r
      new go.Panel("Vertical", { width: 220, margin: 16, defaultStretch: go.Stretch.Horizontal })\r
        .add(\r
          new go.TextBlock("Grocery Store", { textAlign: "center", font: "bold 14pt serif" }),\r
          new go.TextBlock("1234 Main St, NH", { textAlign: "center", font: "8pt courier new" }),\r
          new go.TextBlock("1/1/1970 09:41 PM", { textAlign: "center", font: "8pt courier new",               stroke: "#6b6b6b", margin: new go.Margin(1, 0, 8, 0)\r
          }),\r
          new go.Panel("Vertical", { defaultStretch: go.Stretch.Horizontal,\r
            // this property controls the template used\r
            itemCategoryProperty: "type",\r
            // map was defined above\r
            itemTemplateMap: itemtemplates\r
          })\r
            .bind("itemArray", "lines"),\r
          new go.TextBlock("** THANK YOU **", { textAlign: "center", font: "9pt courier new" }),\r
          makeBarcode()\r
        )\r
    );\r
\r
function makeBarcode() {\r
  const widths = [1, 2, 1, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 2, 1, 3, 2, 1, 1, 2];\r
  const bars = new go.Panel("Horizontal");\r
  for (let i = 0; i < widths.length; i++) {\r
    bars.add(new go.Shape("LineV", { width: 1, height: 30, strokeWidth: widths[i] }));\r
  }\r
  return new go.Panel("Vertical", { margin: new go.Margin(8, 0, 0, 0) })\r
    .add(\r
      bars,\r
      new go.TextBlock("7 40239 25710", { font: "8pt courier new", margin: new go.Margin(3, 0) })\r
    );\r
}\r
\r
diagram.div.style.backgroundColor = "#d9d3c7";\r
\r
diagram.model = new go.Model([\r
  { key: 1,\r
    lines: [\r
      { type: "item", code: 63890, name: "BAGELS", price: 7.99 },\r
      { type: "item", code: 240063, name: "BANANAS", price: 1.99 },\r
      { type: "item", code: 422621, name: "CHPTLE RANCH", price: 4.85 },\r
      { type: "item", code: 80698, name: "ORGANIC MANGO", price: 3.75 },\r
      { type: "item", code: 47761, name: "GRND TURKEY", price: 9.99 },\r
      { type: "item", code: 430998, name: "18CT EGGS", price: 12.87 },\r
      { type: "item", code: 508986, name: "KOSHER SALT", price: 2.89 },\r
      { type: "item", code: 24230, name: "AAA 32 PK", price: 15.99 },\r
      { type: "line" },\r
      { type: "final", name: "SUBTOTAL", price: 60.32 },\r
      { type: "final", name: "TAX (8%)", price: 4.82 },\r
      { type: "final", name: "TOTAL", price: 65.14 },\r
      { type: "line" }\r
    ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`header`,code:`const myTemplateMap = new go.Map();\r
\r
// the default template\r
myTemplateMap.add("",\r
  new go.Panel("TableRow")\r
    .add(\r
      new go.TextBlock({ margin: 3, font: "12pt georgia", stroke: "#33503a" })\r
        .bind("text", "name"),\r
      new go.TextBlock({ column: 1, margin: 3, font: "italic 11pt georgia", stroke: "#9aa78c" })\r
        .bind("text", "color"),\r
      new go.TextBlock({ column: 2, margin: 3, font: "bold 12pt georgia", stroke: "#8f9c6c" })\r
        .bind("text", "bloom")\r
    ));\r
\r
// the "Header" template\r
myTemplateMap.add("Header",\r
  new go.Panel("TableRow")\r
    .add(\r
      new go.TextBlock({ margin: 4, font: "bold 9pt georgia", stroke: "#9aa78c" })\r
        .bind("text", "name"),\r
      new go.TextBlock({ column: 1, font: "bold 9pt georgia", stroke: "#9aa78c" })\r
        .bind("text", "color"),\r
      new go.TextBlock({ column: 2, font: "bold 9pt georgia", stroke: "#9aa78c" })\r
        .bind("text", "bloom")\r
    ));\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { parameter1: 15, fill: "#f3eede", stroke: "#8f9c6c" }),\r
      new go.Panel("Vertical", { margin: 24 })\r
        .add(\r
          new go.Panel("Horizontal")\r
            .add(\r
              new go.Panel("Spot", { margin: new go.Margin(0, 10) })\r
                .add(\r
                  new go.TextBlock("FLOWERS", { font: "bold 18pt verdana", stroke: "white" }),\r
                  new go.TextBlock("FLOWERS", { font: "bold 18pt verdana", stroke: "#33503a",\r
                    alignment: new go.Spot(0.5, 0.5, -2, -2)\r
                  })\r
                )\r
            ),\r
          new go.Panel("Table", { defaultAlignment: go.Spot.Left, itemTemplateMap: myTemplateMap })\r
            .bind("itemArray", "blooms")\r
            .addRowDefinition(1, { separatorStroke: "white", separatorStrokeWidth: 1 })\r
        )\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: "stand1",\r
    blooms: [\r
      { name: "FLOWER", color: "COLOR", bloom: "BLOOMS", category: "Header" },\r
      { name: "Snowdrop", color: "White", bloom: "Feb" },\r
      { name: "Tulip", color: "Scarlet", bloom: "Apr" },\r
      { name: "Peony", color: "Blush", bloom: "Jun" },\r
      { name: "Sunflower", color: "Gold", bloom: "Aug" },\r
      { name: "Aster", color: "Lilac", bloom: "Oct" }\r
    ]\r
  }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`changingCategory`,code:`// This function changes the category of the node data to cause the Node to be replaced\r
function changeCategory(e, obj) {\r
  const node = obj.part;\r
  if (node) {\r
    const diagram = node.diagram;\r
    diagram.startTransaction("changeCategory");\r
    let cat = diagram.model.getCategoryForNodeData(node.data);\r
    if (cat === "simple") cat = "detailed";\r
    else cat = "simple";\r
    diagram.model.setCategoryForNodeData(node.data, cat);\r
    diagram.commitTransaction("changeCategory");\r
  }\r
}\r
\r
const pin = { strokeWidth: 0.5, stroke: "#a90913", fill: "#cd0d1a" }\r
\r
function makePushpin() {\r
  return new go.Panel("Spot", { cursor: "pointer", alignment: go.Spot.Top, portId: "",\r
    click: changeCategory,\r
    mouseEnter: (e, pin) => pin.scale = 1.2,\r
    mouseLeave: (e, pin) => pin.scale = 1\r
  })\r
    .add(\r
      new go.Shape("Ellipse", { width: 14, height: 9, ...pin }),\r
      new go.Shape({ width: 6, height: 10, ...pin, alignment: new go.Spot(0.5, 0) }),\r
      new go.Shape("Ellipse", { width: 9, height: 5, ...pin, alignment: new go.Spot(0.5, -0.5) }),\r
      new go.Shape({ width: 2, height: 2, strokeWidth: 0, fill: "gray",\r
        alignment: new go.Spot(0.5, 1.1)\r
      })\r
    );\r
}\r
\r
const nodeStyle = { locationSpot: go.Spot.TopCenter, shadowColor: "#00000099",\r
  isShadowed: true, shadowOffset: new go.Point(4, 3) }\r
\r
// The "simple" template just shows a numbered note.\r
// Clicking on the pushpin invokes the changeCategory function.\r
const simpletemplate =\r
  new go.Node("Spot", nodeStyle)\r
    .bind("location", "loc", go.Point.parse, go.Point.stringify)\r
    .bind("angle", "tilt")\r
    .add(\r
      new go.Panel("Auto", { desiredSize: new go.Size(80, 80) })\r
        .add(\r
          new go.Shape("Rectangle", { strokeWidth: 0 })\r
            .bind("fill", "color"),\r
          new go.TextBlock({ margin: new go.Margin(22, 9, 9, 9), font: "bold 15pt cursive" })\r
            .bind("text", "key", n => "#" + n)\r
        ),\r
      makePushpin()\r
    );\r
\r
// The "detail" template just shows all the information on the node.\r
// Clicking on the pushpin invokes the changeCategory function.\r
const detailtemplate =\r
  new go.Node("Spot", nodeStyle)\r
    .bind("location", "loc", go.Point.parse, go.Point.stringify)\r
    .bind("angle", "tilt")\r
    .add(\r
      new go.Panel("Auto", { minSize: new go.Size(200, 0) })\r
        .add(\r
          new go.Shape("Rectangle", { fill: "#f6f1e1", stroke: "#cdbf9c" }),\r
          new go.Panel("Table", { margin: 10, defaultAlignment: go.Spot.Left })\r
            .add(\r
              new go.Panel("Auto", { columnSpan: 2, stretch: go.Stretch.Horizontal })\r
                .add(\r
                  new go.Shape("Rectangle", { strokeWidth: 0 })\r
                    .bind("fill", "color"),\r
                  new go.TextBlock("CASE FILE", { margin: 3, font: "bold 8pt courier new" })\r
                ),\r
              new go.TextBlock({ row: 1, columnSpan: 2, font: "bold 11pt georgia" })\r
                .bind("text"),\r
              new go.TextBlock("FILE #", { row: 2, font: "8pt courier new", stroke: "#8a7a5c" }),\r
              new go.TextBlock({ row: 2, column: 1, margin: 8, font: "8pt courier new" })\r
                .bind("text", "key"),\r
              new go.TextBlock("NOTE", { row: 3, font: "8pt courier new", stroke: "#8a7a5c" }),\r
              new go.TextBlock({ row: 3, column: 1, font: "8pt courier new",\r
                margin: new go.Margin(0, 0, 0, 8),\r
                maxSize: new go.Size(140, NaN)\r
              })\r
                .bind("text", "desc")\r
            )\r
        ),\r
      makePushpin()\r
    );\r
\r
const templmap = new go.Map(); // In TypeScript you could write: new go.Map<string, go.Node>();\r
templmap.add("simple", simpletemplate);\r
templmap.add("detailed", detailtemplate);\r
diagram.nodeTemplateMap = templmap;\r
\r
diagram.div.style.backgroundColor = "#efbf7d";\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier, selectable: false, curviness: 15 })\r
    .add(\r
      new go.Shape({ stroke: "#b3261c", strokeWidth: 1.5, strokeCap: "round" })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, color: "#f2e9c9", category: "detailed", loc: "0 0", tilt: -2,\r
    text: "Police Report", desc: "Stolen artwork from the museum gallery." },\r
  { key: 2, color: "#fff6a5", category: "simple", loc: "-150 -110", tilt: -5,\r
    text: "Red Hatchback", desc: "Possible getaway vehicle was parked outside the museum." },\r
  { key: 3, color: "#ffd1dc", category: "simple", loc: "120 -130", tilt: 4,\r
    text: "Security Tapes", desc: "Video tapes were found destroyed in the security office." },\r
  { key: 4, color: "#bfe3ff", category: "simple", loc: "-170 110", tilt: 3,\r
    text: "Witness", desc: "Claims to have seen suspect outside the museum." },\r
  { key: 5, color: "#c8f7c5", category: "simple", loc: "50 160", tilt: -3,\r
    text: "Suspect #1", desc: "No alibi for night in question." }\r
],\r
[\r
  { from: 1, to: 2 },\r
  { from: 3, to: 1 },\r
  { from: 1, to: 4 },\r
  { from: 5, to: 1 },\r
  { from: 5, to: 4 }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`changingMap`,code:`// The "simple" template (used when zoomed out) just shows a name and status icon,\r
const simpletemplate =\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Panel("Spot")\r
        .add(\r
          new go.Shape("RoundedRectangle", { width: 46, height: 34,\r
            fill: "#dfe6e9", stroke: "#636e72", strokeWidth: 1.5\r
          }),\r
          new go.Shape("Circle", { alignment: go.Spot.TopRight, alignmentFocus: go.Spot.Right,\r
            width: 11, height: 11, strokeWidth: 2, stroke: "#636e72"\r
          })\r
            .bind("fill", "status", n => (n === "online") ? "#00b894" : "#d63031")\r
        ),\r
      new go.TextBlock({ font: "bold 9pt sans-serif" })\r
        .bind("text", "key")\r
    );\r
\r
// The "detailed" template (used when zoomed in) shows all of the host information\r
const detailtemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "#b2bec3", strokeWidth: 1.5 }),\r
      new go.Panel("Table", { margin: 8, defaultAlignment: go.Spot.Left })\r
        .add(\r
          new go.TextBlock({ columnSpan: 2, font: "bold 12pt sans-serif" })\r
            .bind("text", "key"),\r
          new go.TextBlock("IP:", { row: 1, font: "9pt sans-serif", stroke: "#636e72" }),\r
          new go.TextBlock({ row: 1, column: 1, font: "9pt monospace" })\r
            .bind("text", "ip"),\r
          new go.TextBlock("Status:", { row: 2, font: "9pt sans-serif", stroke: "#636e72" }),\r
          new go.Panel("Horizontal", { row: 2, column: 1, alignment: go.Spot.Left })\r
            .add(\r
              new go.Shape("Circle", { width: 9, height: 9, strokeWidth: 0, margin: 2 })\r
                .bind("fill", "status", n => (n === "online") ? "#00b894" : "#d63031"),\r
              new go.TextBlock({ font: "9pt sans-serif" })\r
                .bind("text", "status")\r
            ),\r
          new go.TextBlock("CPU:", { row: 3, font: "9pt sans-serif", stroke: "#636e72"}),\r
          new go.TextBlock({ row: 3, column: 1, font: "9pt sans-serif" })\r
            .bind("text", "cpu", c => c + "% load")\r
        )\r
    );\r
\r
// initially use the detailed templates\r
diagram.nodeTemplate = detailtemplate;\r
\r
// listens for scale changes and switches the nodeTemplate used by the diagram\r
diagram.addDiagramListener("ViewportBoundsChanged", e => {\r
  if (diagram.scale < 0.9) {\r
    diagram.nodeTemplate = simpletemplate;\r
  } else {\r
    diagram.nodeTemplate = detailtemplate;\r
  }\r
});\r
\r
diagram.layout = new go.TreeLayout();\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "core-01", ip: "10.0.0.1", status: "online", cpu: 38 },\r
  { key: "rtr-edge", ip: "10.0.1.1", status: "online", cpu: 56 },\r
  { key: "web-01", ip: "10.0.2.11", status: "online", cpu: 72 },\r
  { key: "web-02", ip: "10.0.2.12", status: "offline", cpu: 0 },\r
  { key: "db-01", ip: "10.0.3.21", status: "online", cpu: 64 }\r
],\r
[\r
  { from: "core-01", to: "rtr-edge" },\r
  { from: "rtr-edge", to: "web-01" },\r
  { from: "rtr-edge", to: "web-02" },\r
  { from: "core-01", to: "db-01" }\r
]);\r
// make accessible to the HTML buttons\r
myDiagram = diagram;`,isExecutable:!0,animation:!1,html:`<input id="ZoomOut" type="button" onclick="myDiagram.commandHandler.decreaseZoom()" value="Zoom Out" />
<input id="ZoomIn" type="button" onclick="myDiagram.commandHandler.increaseZoom()" value="Zoom In" />`,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`2izu8b`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};