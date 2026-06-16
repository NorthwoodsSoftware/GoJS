import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Table Panels`,category:`Building Blocks`,categoryOrder:5},htmlContent:`<h1>Table Panels</h1>\r
<p>The "Table" Panel, <a href="../api/symbols/Panel.html#table" target="api">Panel.Table</a>, arranges objects in rows and columns.</p>\r
<p>See samples that make use of tables in the <a href="../samples/#tables">samples index</a>.</p>\r
<p>\r
  In all but the last of these simplistic demonstrations, the code programmatically creates a Node and adds it to the Diagram.\r
  Once you learn about models and data binding you will generally not create parts (nodes or links) programmatically.\r
</p>\r
\r
<h2 id="SimpleTablePanels"><a class="not-prose heading-anchor" href="#SimpleTablePanels">Simple Table Panels</a></h2>\r
<p>\r
  Each object in a Table Panel is put into the cell indexed by the value of <a href="../api/symbols/GraphObject.html#row" target="api">GraphObject.row</a> and <a href="../api/symbols/GraphObject.html#column" target="api">GraphObject.column</a>. The panel will look at the\r
  rows and columns for all of the objects in the panel to determine how many rows and columns the table should have.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>Note that not every "cell" of the table needs to have a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> in it.</p>\r
<p>If there are multiple objects in a cell, they will probably overlap each other in the cell. By default objects are center-aligned in each cell.</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>If a column or a row has no objects in it, that column or row is ignored.</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="SizingOfRowsOrColumns"><a class="not-prose heading-anchor" href="#SizingOfRowsOrColumns">Sizing of rows or columns</a></h2>\r
<p>\r
  The height of each row is normally determined by the greatest height of all of the objects in that row. Similarly, the width of each column is normally\r
  determined by the greatest width of all of the objects in that column. However, you can provide row height or column width information for any row or column\r
  independent of any individual object by setting properties of the desired <a href="../api/symbols/RowColumnDefinition.html" target="api">RowColumnDefinition</a> of the Table panel.\r
</p>\r
<p>\r
  To fix a column's width or a row's height, you can call <a href="../api/symbols/Panel.html#getcolumndefinition" target="api">Panel.getColumnDefinition</a> or <a href="../api/symbols/Panel.html#getrowdefinition" target="api">Panel.getRowDefinition</a> and then set\r
  <a href="../api/symbols/RowColumnDefinition.html#width" target="api">RowColumnDefinition.width</a> or <a href="../api/symbols/RowColumnDefinition.html#height" target="api">RowColumnDefinition.height</a>. If you want to limit the width or height to certain ranges, set the\r
  <a href="../api/symbols/RowColumnDefinition.html#minimum" target="api">RowColumnDefinition.minimum</a> or <a href="../api/symbols/RowColumnDefinition.html#maximum" target="api">RowColumnDefinition.maximum</a>. The set maximum and minimum values will take precedence over the \r
  specified width and height if they are in conflict. For example, the second column in the sample below has its width set to 100, but it displays \r
  at its set minimum width of 150.\r
</p>\r
<p>This example demonstrates how the column width may be controlled.</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>Note how the column with a minimum of 150 has a lot of extra space in it, and how the column with a maximum of 70 results in its elements being clipped.</p>\r
\r
<h2 id="SpanningRowsOrColumns"><a class="not-prose heading-anchor" href="#SpanningRowsOrColumns">Spanning rows or columns</a></h2>\r
<p>\r
  An element in a Table Panel cell can cover more than one cell if you set the <a href="../api/symbols/GraphObject.html#rowspan" target="api">GraphObject.rowSpan</a> or <a href="../api/symbols/GraphObject.html#columnspan" target="api">GraphObject.columnSpan</a> properties. For\r
  example, if the value of GraphObject.columnSpan is greater than one, it specifies how many columns that object may cover, starting with the value of\r
  <a href="../api/symbols/GraphObject.html#column" target="api">GraphObject.column</a>, but excluding the column indexed by column + columnSpan. The following example uses both row and column span:\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<h2 id="SeparatorsAndRowColumnPadding"><a class="not-prose heading-anchor" href="#SeparatorsAndRowColumnPadding">Separators and row/column padding</a></h2>\r
<p>\r
  Table Panels allow you to draw lines between rows or columns. The <a href="../api/symbols/RowColumnDefinition.html#separatorstrokewidth" target="api">RowColumnDefinition.separatorStrokeWidth</a> property controls the\r
  extra space that comes before a particular row or column. The <a href="../api/symbols/RowColumnDefinition.html#separatorstroke" target="api">RowColumnDefinition.separatorStroke</a> and\r
  <a href="../api/symbols/RowColumnDefinition.html#separatordasharray" target="api">RowColumnDefinition.separatorDashArray</a> control if and how a line is drawn.\r
</p>\r
<p>\r
  For example, if you want to treat the first row and the first column as "headers", you can separate them from the rest of the table setting \r
  their separatorStroke property:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>If you want to have a default separator between each row, set the default separator properties of the <a href="../api/symbols/Panel.html" target="api">Panel</a>. These properties are:</p>\r
<ul>\r
  <li><a href="../api/symbols/Panel.html#defaultseparatorpadding" target="api">Panel.defaultSeparatorPadding</a></li>\r
  <li><a href="../api/symbols/Panel.html#defaultrowseparatorstrokewidth" target="api">Panel.defaultRowSeparatorStrokeWidth</a></li>\r
  <li><a href="../api/symbols/Panel.html#defaultrowseparatorstroke" target="api">Panel.defaultRowSeparatorStroke</a></li>\r
  <li><a href="../api/symbols/Panel.html#defaultrowseparatordasharray" target="api">Panel.defaultRowSeparatorDashArray</a></li>\r
  <li><a href="../api/symbols/Panel.html#defaultcolumnseparatorstrokewidth" target="api">Panel.defaultColumnSeparatorStrokeWidth</a></li>\r
  <li><a href="../api/symbols/Panel.html#defaultcolumnseparatorstroke" target="api">Panel.defaultColumnSeparatorStroke</a></li>\r
  <li><a href="../api/symbols/Panel.html#defaultcolumnseparatordasharray" target="api">Panel.defaultColumnSeparatorDashArray</a></li>\r
</ul>\r
\r
<p>\r
  Any separator properties set on a particular RowColumnDefinition will take precedence over the default values provided on the Panel. This permits keeping the\r
  special black line separating the header row and header column from the rest.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>\r
  RowColumnDefinitions also have a <a href="../api/symbols/RowColumnDefinition.html#separatorpadding" target="api">RowColumnDefinition.separatorPadding</a> property, which can be used to add extra space to rows or columns. When a\r
  <a href="../api/symbols/RowColumnDefinition.html#background" target="api">RowColumnDefinition.background</a> is set, it includes the padding in its area.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
<h2 id="TableRowsAndTableColumns"><a class="not-prose heading-anchor" href="#TableRowsAndTableColumns">TableRows and TableColumns</a></h2>\r
<p>\r
  To avoid having to specify the row for each object, you can make use of a special Panel that can only be used in Table Panels, the <a href="../api/symbols/Panel.html#tablerow" target="api">Panel.TableRow</a> panel\r
  type. Put all of the objects for each row into a TableRow Panel. You will still need to specify the column for each object in each row.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  TableRow panels are particularly useful when used as an <a href="../api/symbols/Panel.html#itemtemplate" target="api">Panel.itemTemplate</a>.\r
  Read more about Table Panels and item Arrays at <a href="itemArrays#DifferentPanelTypes">Item Arrays and Panels</a>.\r
</p>\r
<p>\r
  The same kind of organization is also possible with columns by using <a href="../api/symbols/Panel.html#tablecolumn" target="api">Panel.TableColumn</a> Panels.\r
</p>\r
\r
<h2 id="StretchAndAlignment"><a class="not-prose heading-anchor" href="#StretchAndAlignment">Stretch and Alignment</a></h2>\r
<p>\r
  The size of a GraphObject in a Panel is determined by many factors. The <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> property specifies whether the width and/or height should\r
  take up all of the space given to it by the Panel. When the width and/or height is not stretched to fill the given space, the\r
  <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> property controls where the object is placed if it is smaller than available space. One may also stretch the width while aligning\r
  vertically, just as one may also stretch vertically while aligning horizontally.\r
</p>\r
<p>\r
  If the alignment value for a GraphObject is not set with GraphObject.alignment, it still may be inherited from the <a href="../api/symbols/RowColumnDefinition.html#alignment" target="api">RowColumnDefinition.alignment</a> \r
  of the row and of the column that the object is in or, if not that, the <a href="../api/symbols/Panel.html#defaultalignment" target="api">Panel.defaultAlignment</a> property.\r
</p>\r
<p>\r
  The same inheritance is true for the stretch value for a GraphObject: <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a>, then <a href="../api/symbols/RowColumnDefinition.html#stretch" target="api">RowColumnDefinition.stretch</a>, and finally\r
  <a href="../api/symbols/Panel.html#defaultstretch" target="api">Panel.defaultStretch</a>.\r
</p>\r
\r
<h3 id="AlignmentInColumnsAndRows"><a class="not-prose heading-anchor" href="#AlignmentInColumnsAndRows">Alignment in columns and rows</a></h3>\r
<!-- CODE_BLOCK_9 -->\r
\r
<h2 id="Examples"><a class="not-prose heading-anchor" href="#Examples">Examples</a></h2>\r
<p>\r
  In this org chart example, the employee avatars span two rows because <a href="../api/symbols/GraphObject.html#rowspan" target="api">GraphObject.rowSpan</a> is 2 on the panel that makes it up.\r
</p>\r
<p>\r
  The first column only takes as much width as it naturally needs and any excess width is given to the second column. This occurs because the\r
  <a href="../api/symbols/RowColumnDefinition.html" target="api">RowColumnDefinition</a> for column #0 has <a href="../api/symbols/RowColumnDefinition.html#sizing" target="api">RowColumnDefinition.sizing</a> set to None. The same is true for the first row -- any extra height is given to\r
  the second row.\r
</p>\r
<p>\r
  There is a column separator line just before the second column, and there is a row separator just before the second row because the respective\r
  <a href="../api/symbols/RowColumnDefinition.html#separatorstroke" target="api">RowColumnDefinition.separatorStroke</a> properties have been set to a color. However, the row separator is not visible in the first column because that column's\r
  definition sets <a href="../api/symbols/RowColumnDefinition.html#background" target="api">RowColumnDefinition.background</a> to "white" and <a href="../api/symbols/RowColumnDefinition.html#coversseparators" target="api">RowColumnDefinition.coversSeparators</a> to true.\r
</p>\r
<p>\r
  This example uses a <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a> and data bindings for reusability (see the section on <a href="dataBinding">Data Binding</a>) \r
  as well as a tree layout (see the section on <a href="layouts">Layouts</a>).\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
<p>\r
  Try resizing a node.\r
</p>\r
<p>\r
  Because the Table Panel and its TextBlocks are stretched, when they do not have enough room to render all of the text,\r
  the <a href="../api/symbols/TextBlock.html#overflow" target="api">TextBlock.overflow</a> value of <a href="../api/symbols/TextOverflow.html#ellipsis" target="api">TextOverflow.Ellipsis</a> causes "..." to be shown.\r
</p>\r
`,codeBlocks:[{id:`simpleTable`,code:`diagram.add(\r
  // all Nodes are Panels\r
  new go.Node(go.Panel.Table, { // or "Table"\r
    isShadowed: true, shadowOffset: new go.Point(0,0) \r
  })\r
    .add(\r
      new go.TextBlock("row 0\\ncol 0",\r
        { row: 0, column: 0, margin: 2, background: "white" }),\r
      new go.TextBlock("row 0\\ncol 1",\r
        { row: 0, column: 1, margin: 2, background: "white" }),\r
      new go.TextBlock("row 1\\ncol 0",\r
        { row: 1, column: 0, margin: 2, background: "white" }),\r
      new go.TextBlock("row 1\\ncol 2",\r
        { row: 1, column: 2, margin: 2, background: "white" })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`multipleInCell`,code:`diagram.add(\r
  new go.Node("Table", {\r
    isShadowed: true, shadowOffset: new go.Point(0,0)\r
  })\r
    .add(\r
      new go.TextBlock("row 0\\ncol 0",\r
        { row: 0, column: 0, margin: 2, background: "white" }),\r
      new go.TextBlock("also in row 0 col 1",\r
        // first object in the cell (row: 0, col: 1)\r
        { row: 0, column: 1, margin: 2,\r
          background: "yellow" }),\r
      new go.TextBlock("row 0\\ncol 1",\r
        // second object in that cell overlaps the first one, the bigger yellow TextBlock\r
        { row: 0, column: 1, margin: 2,\r
          background: "white" }),\r
      new go.TextBlock("row 1\\ncol 0",\r
        { row: 1, column: 0, margin: 2, background: "white" }),\r
      new go.TextBlock("row 1\\ncol 2",\r
        { row: 1, column: 2, margin: 2, background: "white" })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`emptyColumns`,code:`diagram.add(\r
  new go.Node("Table", {\r
    isShadowed: true, shadowOffset: new go.Point(0,0)\r
  })\r
    .add(\r
      new go.TextBlock("row 0\\ncol 0",\r
        { row: 0, column: 0, margin: 2, background: "white" }),\r
      new go.TextBlock("row 0\\ncol 11",  // column 11 -- nothing in columns 1-10\r
        { row: 0, column: 11, margin: 2, background: "white" }),\r
      new go.TextBlock("row 1\\ncol 0",\r
        { row: 1, column: 0, margin: 2, background: "white" }),\r
      new go.TextBlock("row 1\\ncol 12",  // column 12\r
        { row: 1, column: 12, margin: 2, background: "white" })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`columnSizes`,code:`diagram.add(\r
  new go.Node("Auto", { isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: null }),\r
      new go.Panel("Table", { defaultAlignment: go.Spot.Center })\r
        .addColumnDefinition(0, { width: 100 })\r
        .addColumnDefinition(1, { width: 100, minimum: 150 })\r
        .addColumnDefinition(2, { width: 100, maximum: 70 })\r
        .addColumnDefinition(3, { width: 100, minimum: 150, maximum: 50 })\r
        .add(\r
          // Text blocks\r
          new go.TextBlock("Text Block", { row: 0, column: 0, stroke: "darkgreen", margin: 5 }),\r
          new go.TextBlock("Text Block", { row: 0, column: 1, stroke: "crimson", margin: 5 }),\r
          new go.TextBlock("Text Block", { row: 0, column: 2, stroke: "goldenrod", margin: 5 }),\r
          new go.TextBlock("Text Block", { row: 0, column: 3, stroke: "royalblue", margin: 5 }),\r
\r
          // Filled auto panels\r
          new go.Panel("Auto", { row: 1, column: 0, margin: new go.Margin(6) })\r
            .add(\r
              new go.Shape("RoundedRectangle", { fill: "seagreen", stroke: "lightgray" }),\r
              new go.TextBlock("Auto Panel", { stroke: "white", margin: new go.Margin(7, 14) })\r
            ),\r
          new go.Panel("Auto", { row: 1, column: 1, margin: new go.Margin(6) })\r
            .add(\r
              new go.Shape("RoundedRectangle", { fill: "crimson", stroke: "lightgray" }),\r
              new go.TextBlock("Auto Panel", { stroke: "white", margin: new go.Margin(7, 14) })\r
            ),\r
          new go.Panel("Auto", { row: 1, column: 2, margin: new go.Margin(6) })\r
            .add(\r
              new go.Shape("RoundedRectangle", { fill: "goldenrod", stroke: "lightgray" }),\r
              new go.TextBlock("Auto Panel", { stroke: "white", margin: new go.Margin(7, 14) })\r
            ),\r
          new go.Panel("Auto", { row: 1, column: 3, margin: new go.Margin(6) })\r
            .add(\r
              new go.Shape("RoundedRectangle", { fill: "royalblue", stroke: "lightgray" }),\r
              new go.TextBlock("Auto Panel", { stroke: "white", margin: new go.Margin(7, 14) })\r
            ),\r
\r
          // Constraint labels\r
          new go.TextBlock("width: 100",       { row: 2, column: 0, stroke: "slategray", margin: new go.Margin(4, 0) }),\r
          new go.TextBlock("min: 150",         { row: 2, column: 1, stroke: "slategray", margin: new go.Margin(4, 0) }),\r
          new go.TextBlock("max: 70",          { row: 2, column: 2, stroke: "slategray", margin: new go.Margin(4, 0) }),\r
          new go.TextBlock("min: 150 / max: 50", { row: 2, column: 3, stroke: "slategray", margin: new go.Margin(4, 0) }),\r
\r
          // Width markers\r
          new go.Shape({ row: 3, column: 0, height: 5, stretch: go.GraphObject.Horizontal, fill: "seagreen", stroke: null }),\r
          new go.Shape({ row: 3, column: 1, height: 5, stretch: go.GraphObject.Horizontal, fill: "crimson", stroke: null }),\r
          new go.Shape({ row: 3, column: 2, height: 5, stretch: go.GraphObject.Horizontal, fill: "goldenrod", stroke: null }),\r
          new go.Shape({ row: 3, column: 3, height: 5, stretch: go.GraphObject.Horizontal, fill: "royalblue", stroke: null }),\r
        )      \r
    )\r
);\r
\r
diagram.scale = .9;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`columnSpan`,code:`diagram.add(\r
  new go.Node("Table", {\r
    isShadowed: true, shadowOffset: new go.Point(0,0)\r
  })\r
    .add(\r
      new go.Panel("Auto", { \r
        row: 0, column: 0, columnSpan: 3, stretch: go.Stretch.Horizontal, margin: 2, background: "lightgray" \r
      })\r
        .add(\r
          new go.Shape({ fill: "white", stroke: null }),\r
          new go.TextBlock("Spans 3", { margin: 4 })\r
        ),\r
      new go.Panel("Auto", { \r
        row: 1, column: 0, rowSpan: 2, stretch: go.Stretch.Vertical, margin: 2, background: "lightgray"  \r
      })\r
        .add(\r
          new go.Shape({ fill: "white", stroke: null }),\r
          new go.TextBlock("Spans 2", { margin: 4, angle: 270 })\r
        ),\r
      new go.Panel("Auto", { row: 1, column: 1, margin: 2, background: "lightgray"  })\r
        .add(\r
          new go.Shape({ fill: "white", stroke: null }),\r
          new go.TextBlock("row 1\\ncol 1", { margin: 4 })\r
        ),\r
      new go.Panel("Auto", { row: 1, column: 2, margin: 2, background: "lightgray"  })\r
        .add(\r
          new go.Shape({ fill: "white", stroke: null }),\r
          new go.TextBlock("row 1\\ncol 2", { margin: 4 })\r
        ),\r
      new go.Panel("Auto", { row: 2, column: 1, margin: 2, background: "lightgray"  })\r
        .add(\r
          new go.Shape({ fill: "white", stroke: null }),\r
          new go.TextBlock("row 2\\ncol 1", { margin: 4 })\r
        ),\r
      new go.Panel("Auto", { row: 2, column: 3, margin: 2, background: "lightgray"  })\r
        .add(\r
          new go.Shape({ fill: "white", stroke: null }),\r
          new go.TextBlock("row 2\\ncol 3", { margin: 4 })\r
        ),\r
      new go.Panel("Auto", { \r
        row: 3, column: 2, columnSpan: 2, stretch: go.Stretch.Horizontal, margin: 2, background: "lightgray"  \r
      })\r
        .add(\r
          new go.Shape({ fill: "white", stroke: null }),\r
          new go.TextBlock("Spans 2", { margin: 4 })\r
        )\r
  ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`spacing`,code:`const itemMargin = new go.Margin(6, 14, 6, 14);\r
diagram.add(\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "white", stroke: "darkgray", strokeWidth: 1 }),\r
      new go.Panel("Table")\r
        .addRowDefinition(0, { background: "whitesmoke" })\r
        // separator line drawn before row 1\r
        .addRowDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        // separator line drawn before row 1\r
        .addColumnDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        .add(\r
          new go.TextBlock("Header 1",\r
            { row: 0, column: 1, font: "bold 11pt sans-serif", margin: itemMargin }),\r
          new go.TextBlock("Header 2",\r
            { row: 0, column: 2, font: "bold 11pt sans-serif", margin: itemMargin }),\r
          new go.TextBlock("One",\r
            { row: 1, column: 0, stroke: "seagreen", margin: new go.Margin(6, 10, 6, 14) }),\r
          new go.TextBlock("Two",\r
            { row: 2, column: 0, stroke: "seagreen", margin: new go.Margin(6, 10, 6, 14) }),\r
          new go.TextBlock("Three",\r
            { row: 3, column: 0, stroke: "seagreen", margin: new go.Margin(6, 10, 6, 14) }),\r
          new go.TextBlock("row 1 col 1", { row: 1, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 1 col 2", { row: 1, column: 2, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 2 col 1", { row: 2, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 2 col 2", { row: 2, column: 2, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 3 col 1", { row: 3, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 3 col 2", { row: 3, column: 2, stroke: "dimgray", margin: itemMargin })\r
        )\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`spacing2`,code:`const itemMargin = new go.Margin(6, 14, 6, 14);\r
diagram.add(\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "white", stroke: "darkgray", strokeWidth: 1 }),\r
      new go.Panel("Table",\r
          // Set defaults for all rows and columns:\r
          { defaultRowSeparatorStroke: "lightgray",\r
            defaultColumnSeparatorStroke: "lightgray" })\r
        .addRowDefinition(0, { background: "whitesmoke" })\r
        // specify separator before first row and first column\r
        .addRowDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        .addColumnDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        .add(\r
          new go.TextBlock("Header 1",\r
            { row: 0, column: 1, font: "bold 11pt sans-serif", margin: itemMargin }),\r
          new go.TextBlock("Header 2",\r
            { row: 0, column: 2, font: "bold 11pt sans-serif", margin: itemMargin }),\r
\r
          new go.TextBlock("One", { row: 1, column: 0, stroke: "seagreen", margin: itemMargin }),\r
          new go.TextBlock("row 1 col 1", { row: 1, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 1 col 2", { row: 1, column: 2, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("Two", { row: 2, column: 0, stroke: "seagreen", margin: itemMargin }),\r
          new go.TextBlock("row 2 col 1", { row: 2, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 2 col 2", { row: 2, column: 2, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("Three", { row: 3, column: 0, stroke: "seagreen", margin: itemMargin }),\r
          new go.TextBlock("row 3 col 1", { row: 3, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 3 col 2", { row: 3, column: 2, stroke: "dimgray", margin: itemMargin })\r
        )\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`padding`,code:`const itemMargin = new go.Margin(6, 14, 6, 14);\r
diagram.add(\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "white", stroke: "darkgray", strokeWidth: 1 }),\r
      new go.Panel("Table",\r
          // Set defaults for all rows and columns:\r
          { padding: 1.5,\r
            defaultRowSeparatorStroke: "lightgray",\r
            defaultColumnSeparatorStroke: "lightgray",\r
            defaultSeparatorPadding: new go.Margin(18, 0, 8, 0) })\r
        // Override the panel's default padding on the first row\r
        .addRowDefinition(0, { separatorPadding: 0, background: "whitesmoke" })\r
        .addRowDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        .addRowDefinition(2, { background: 'lightblue' })\r
        .addColumnDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        .add(\r
          new go.TextBlock("Header 1",\r
            { row: 0, column: 1, font: "bold 11pt sans-serif", margin: itemMargin }),\r
          new go.TextBlock("Header 2",\r
            { row: 0, column: 2, font: "bold 11pt sans-serif", margin: itemMargin }),\r
\r
          new go.TextBlock("One", { row: 1, column: 0, stroke: "seagreen", margin: itemMargin }),\r
          new go.TextBlock("row 1 col 1", { row: 1, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 1 col 2", { row: 1, column: 2, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("Two", { row: 2, column: 0, stroke: "seagreen", margin: itemMargin }),\r
          new go.TextBlock("row 2 col 1", { row: 2, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 2 col 2", { row: 2, column: 2, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("Three", { row: 3, column: 0, stroke: "seagreen", margin: itemMargin }),\r
          new go.TextBlock("row 3 col 1", { row: 3, column: 1, stroke: "dimgray", margin: itemMargin }),\r
          new go.TextBlock("row 3 col 2", { row: 3, column: 2, stroke: "dimgray", margin: itemMargin })\r
        )\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`spacing3`,code:`const itemMargin = new go.Margin(6, 14, 6, 14);\r
diagram.add(\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "white", stroke: "darkgray", strokeWidth: 1 }),\r
      new go.Panel("Table",\r
          // Set defaults for all rows and columns:\r
          { defaultRowSeparatorStroke: "lightgray",\r
            defaultColumnSeparatorStroke: "lightgray" })\r
        .addRowDefinition(0, { background: "whitesmoke" })\r
        .addRowDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        .addColumnDefinition(1, { separatorStrokeWidth: 1.5, separatorStroke: "dimgray" })\r
        .add(\r
          new go.Panel("TableRow", { row: 0 })\r
            .add(\r
              new go.TextBlock("Header 1",\r
                { column: 1, font: "bold 11pt sans-serif", margin: itemMargin }),\r
              new go.TextBlock("Header 2",\r
                { column: 2, font: "bold 11pt sans-serif", margin: itemMargin })\r
            ),\r
          new go.Panel("TableRow", { row: 1 })\r
            .add(\r
              new go.TextBlock("One", { column: 0, stroke: "seagreen", margin: itemMargin }),\r
              new go.TextBlock("row 1 col 1", { column: 1, stroke: "dimgray", margin: itemMargin }),\r
              new go.TextBlock("row 1 col 2", { column: 2, stroke: "dimgray", margin: itemMargin })\r
            ),\r
          new go.Panel("TableRow", { row: 2 })\r
            .add(\r
              new go.TextBlock("Two", { column: 0, stroke: "seagreen", margin: itemMargin }),\r
              new go.TextBlock("row 2 col 1", { column: 1, stroke: "dimgray", margin: itemMargin }),\r
              new go.TextBlock("row 2 col 2", { column: 2, stroke: "dimgray", margin: itemMargin })\r
            ),\r
          new go.Panel("TableRow", { row: 3 })\r
            .add(\r
              new go.TextBlock("Three", { column: 0, stroke: "seagreen", margin: itemMargin }),\r
              new go.TextBlock("row 3 col 1", { column: 1, stroke: "dimgray", margin: itemMargin }),\r
              new go.TextBlock("row 3 col 2", { column: 2, stroke: "dimgray", margin: itemMargin })\r
            )\r
        )\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`columnsAndRows`,code:`// Demonstrates alignment in columns\r
diagram.add(\r
  new go.Node("Auto", { \r
    isShadowed: true, shadowOffset: new go.Point(0, 0),\r
    location: new go.Point(0, -75), locationSpot: go.Spot.Center\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: null }),\r
      new go.Panel("Table", { defaultAlignment: go.Spot.Left, margin: 4, \r
        defaultRowSeparatorStroke: "dimgray" })\r
      .addColumnDefinition(0, { width: 200 })\r
      .addColumnDefinition(1, { separatorPadding: 10, separatorStroke: "dimgray" })\r
      .add(\r
        new go.Panel("Auto",\r
            { row: 0, column: 0, alignment: go.Spot.Left, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "seagreen", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment: Left", { row: 0, column: 1, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 1, column: 0, alignment: go.Spot.Center, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "seagreen", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment: Center", { row: 1, column: 1, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 2, column: 0, alignment: go.Spot.Right, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "seagreen", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment: Right", { row: 2, column: 1, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 3, column: 0, stretch: go.Stretch.Horizontal, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "goldenrod", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Stretch: Horizontal", { row: 3, column: 1, font: "10pt Trebuchet MS" })\r
      )\r
    )\r
  );\r
// Demonstrates alignment in rows\r
// Demonstrates alignment in columns\r
diagram.add(\r
  new go.Node("Auto", { \r
    isShadowed: true, shadowOffset: new go.Point(0, 0),\r
    location: new go.Point(0, -75), locationSpot: go.Spot.Center\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: null }),\r
      new go.Panel("Table", { defaultAlignment: go.Spot.Left, margin: 4, \r
        defaultRowSeparatorStroke: "dimgray" })\r
      .addColumnDefinition(0, { width: 200 })\r
      .addColumnDefinition(1, { separatorPadding: 10, separatorStroke: "dimgray" })\r
      .add(\r
        new go.Panel("Auto",\r
            { row: 0, column: 0, alignment: go.Spot.Left, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#0F6E56BB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment: Left", { row: 0, column: 1, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 1, column: 0, alignment: go.Spot.Center, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#0F6E56BB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment: Center", { row: 1, column: 1, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 2, column: 0, alignment: go.Spot.Right, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#0F6E56BB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment: Right", { row: 2, column: 1, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 3, column: 0, stretch: go.Stretch.Horizontal, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#993C1DBB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Stretch: Horizontal", { row: 3, column: 1, font: "10pt Trebuchet MS" })\r
      )\r
    )\r
  );\r
// Demonstrates alignment in rows\r
diagram.add(\r
  new go.Node("Auto", { \r
    isShadowed: true, shadowOffset: new go.Point(0, 0),\r
    location: new go.Point(0, 75), locationSpot: go.Spot.Center\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: null }),\r
      new go.Panel("Table", { defaultAlignment: go.Spot.Top, margin: 4,\r
        defaultColumnSeparatorStroke: "dimgray" })\r
      .addRowDefinition(0, { height: 50 })\r
      .addRowDefinition(1, { separatorPadding: 10, separatorStroke: "dimgray" })\r
      .add(\r
        new go.Panel("Auto",\r
            { row: 0, column: 0, alignment: go.Spot.Top, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#0F6E56BB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment:\\nTop", { row: 1, column: 0, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 0, column: 1, alignment: go.Spot.Center, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#0F6E56BB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment:\\nCenter", { row: 1, column: 1, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 0, column: 2, alignment: go.Spot.Bottom, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#0F6E56BB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Alignment:\\nBottom", { row: 1, column: 2, font: "10pt Trebuchet MS" }),\r
        new go.Panel("Auto",\r
            { row: 0, column: 3, stretch: go.Stretch.Vertical, margin: 4 })\r
          .add(\r
            new go.Shape("RoundedRectangle", { fill: "#993C1DBB", stroke: null }),\r
            new go.TextBlock("Auto Panel", { stroke: "white", font: "10pt Trebuchet MS", margin: new go.Margin(4, 2, 2, 2) })\r
          ),\r
        new go.TextBlock("Stretch:\\nVertical", { row: 1, column: 3, font: "10pt Trebuchet MS" })\r
      )\r
    )\r
  );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`example1`,code:`diagram.layout = new go.TreeLayout({ angle: 90, layerSpacing: 40, nodeSpacing: 20 })\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { resizable: true, width: 220, scale: 1.0 })\r
    .bindTwoWay("desiredSize", "size", go.Size.parse, go.Size.stringify)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "#D3D1C7", strokeWidth: 0.5, parameter1: 8 }),\r
      new go.Panel("Table", { stretch: go.Stretch.Fill })\r
        // first column (avatar) covers the row separator\r
        .addColumnDefinition(0, { sizing: go.Sizing.None, background: "white", coversSeparators: true })\r
        .addColumnDefinition(1, { separatorStroke: "#D3D1C7", background: "white" })\r
        .addRowDefinition(0, { sizing: go.Sizing.None })\r
        .addRowDefinition(1, { separatorStroke: "#D3D1C7" })\r
        .add(\r
          // Avatar that spans both rows\r
          new go.Panel("Spot", { row: 0, column: 0, rowSpan: 2, margin: 8 })\r
            .add(\r
              new go.Shape("Circle", { width: 44, height: 44, strokeWidth: 0 })\r
                .bind("fill", "bg"),\r
              new go.TextBlock({ font: "500 13px sans-serif", textAlign: "center" })\r
                .bind("text", "initials")\r
                .bind("stroke", "color")\r
            ),\r
          // Top row for a name, has fixed height\r
          new go.TextBlock({\r
              row: 0, column: 1,\r
              stretch: go.Stretch.Horizontal,\r
              margin: new go.Margin(8, 8, 2, 4),\r
              textAlign: "left",\r
              overflow: go.TextOverflow.Ellipsis,\r
              font: "500 13px sans-serif",\r
              stroke: "#2C2C2A"\r
            })\r
            .bind("text", "name"),\r
          // Bottom row for their role, gets extra space on resize\r
          new go.TextBlock({\r
              row: 1, column: 1,\r
              stretch: go.Stretch.Fill,\r
              margin: new go.Margin(4, 8, 8, 4),\r
              textAlign: "left",\r
              overflow: go.TextOverflow.Ellipsis,\r
              wrap: go.Wrap.Fit,\r
              font: "12px sans-serif",\r
              stroke: "#5F5E5A"\r
            })\r
            .bind("text", "role")\r
        )\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 6, selectable: false })\r
    .add(new go.Shape({ stroke: "#B4B2A9", strokeWidth: 1 }));\r
\r
diagram.model = new go.TreeModel([\r
  { key: 1, name: "Lena Okafor",    role: "VP Engineering · SF",         initials: "LO", color: "#534AB7", bg: "#EEEDFE" },\r
  { key: 2, name: "Marcus Tan",     role: "Director, Platform · NYC",    initials: "MT", color: "#0F6E56", bg: "#E1F5EE", parent: 1 },\r
  { key: 3, name: "Priya Shah",     role: "Director, Robotics · Boston", initials: "PS", color: "#0F6E56", bg: "#E1F5EE", parent: 1 },\r
  { key: 4, name: "Jordan Reyes",   role: "Staff Eng, Infra · Remote",   initials: "JR", color: "#993C1D", bg: "#FAECE7", parent: 2 },\r
  { key: 5, name: "Ana Beltran",    role: "Senior SWE, APIs · Austin",   initials: "AB", color: "#993C1D", bg: "#FAECE7", parent: 2 },\r
  { key: 6, name: "Kenji Watanabe", role: "Staff Eng, Motion · Boston",  initials: "KW", color: "#993C1D", bg: "#FAECE7", parent: 3 },\r
  { key: 7, name: "Sam Whitlock",   role: "Senior SWE, Vision · Boston", initials: "SW", color: "#993C1D", bg: "#FAECE7", parent: 3 }\r
]);`,isExecutable:!0,animation:!1,split:50,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`mshy3d`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};