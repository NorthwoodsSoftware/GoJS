import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Nodes`,category:`Core Concepts`,categoryOrder:3,figures:!0},htmlContent:`<h1>Nodes</h1>\r
<p>\r
  You can customize your nodes to have exactly the appearance and behavior that you want.\r
  On this page we demonstrate some of the choices you can make when designing your nodes.\r
</p>\r
\r
<h2 id="SurroundingContent"><a class="not-prose heading-anchor" href="#SurroundingContent">Surrounding content</a></h2>\r
<p>\r
  It is common to surround interesting information with a border or other background.\r
</p>\r
<h3 id="SimpleBorders"><a class="not-prose heading-anchor" href="#SimpleBorders">Simple Nodes</a></h3>\r
<p>\r
  Many of the simplest nodes just consist of a <a href="../api/symbols/Panel.html" target="api">Panel</a> of type <a href="../api/symbols/Panel.html#auto" target="api">Panel.Auto</a> with a <a href="../api/symbols/Shape.html" target="api">Shape</a>\r
  surrounding a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>. The Shape surrounding the content need not be rectangular.\r
  This example demonstrates a number of shapes.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  The surrounding/background object need not be a <a href="../api/symbols/Shape.html" target="api">Shape</a>.\r
  You could use a <a href="../api/symbols/Picture.html" target="api">Picture</a> or even a more complex object such as a <a href="../api/symbols/Panel.html" target="api">Panel</a>.\r
</p>\r
\r
<h3 id="ComplexContents"><a class="not-prose heading-anchor" href="#ComplexContents">Complex contents</a></h3>\r
<p>\r
  Just like the surrounding object, the content of a <a href="../api/symbols/Panel.html" target="api">Panel</a> of type <a href="../api/symbols/Panel.html#auto" target="api">Panel.Auto</a> need not be limited to a single <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> --\r
  you can have arbitrarily complex panels of objects.\r
  In this example the content is a Panel of type <a href="../api/symbols/Panel.html#table" target="api">Panel.Table</a> with three rows of TextBlocks.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  This example uses <a href="brush#GradientBrushes">Gradient Brushes</a> for the background, <a href="../api/symbols/Shape.html#strokedasharray" target="api">Shape.strokeDashArray</a> for the border, and <a href="tablePanels">Table Panels</a> for the layout.\r
</p>\r
\r
<h3 id="FixedSizeNodes"><a class="not-prose heading-anchor" href="#FixedSizeNodes">Fixed-size Nodes</a></h3>\r
<p>\r
  The above examples use Auto Panels, which take the main element (the first child) and size it to surround the other elements (the content).\r
  That results in different sizes depending on the size of the content.\r
  For manual control over which element is the main element, explicitly mark children with <a href="../api/symbols/GraphObject.html#ispanelmain" target="api">GraphObject.isPanelMain</a>.\r
</p>\r
<p>\r
  If you want a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> to be a fixed size, you can set <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> on it. Because many classes extend GraphObject, this applies to <a href="../api/symbols/Panel.html" target="api">Panel</a>s, <a href="../api/symbols/Part.html" target="api">Part</a>s, and applicably here, <a href="../api/symbols/Node.html" target="api">Node</a>s.\r
  Setting <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a> is equivalent to setting desiredSize. Setting a fixed size may result in the clipping of content that is too large,\r
  or it may result in extra space if the content is smaller than the available area provided by the Panel.\r
</p>\r
<p>\r
  When manually setting sizing, prefer Spot Panels over Auto Panels. Manual sizing (setting desiredSize) works against the automatic main element sizing of Auto Panels.\r
  Using an Auto Panel for this purpose works, but can lead to unintuitive behavior.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  Note how the "Alpha..." and "Beta..." TextBlocks are sized with the width constraint of their parent Panel; in this case, a Node.\r
  That results in the text being wrapped before (maybe) being clipped.\r
</p>\r
\r
<p>\r
  You can change the "Spot" to "Auto" to see an example of undesired <a href="../api/symbols/Panel.html#auto" target="api">Panel.Auto</a> behavior.\r
</p>\r
\r
<p>\r
  When creating fixed size Nodes, you probably want to set the size of the parent, and not the siblings. In this example, the TextBlock extends outside of the Shape.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  In this case, the TextBlock does not "know" about the size constraint (because size constraints are not passed between siblings), and so does not respect it.\r
</p>\r
\r
<h2 id="StackedContent"><a class="not-prose heading-anchor" href="#StackedContent">Stacked content</a></h2>\r
<p>\r
  Many simple nodes consist of a few objects positioned above each other or next to each other.\r
</p>\r
\r
<h3 id="Icons"><a class="not-prose heading-anchor" href="#Icons">Icons</a></h3>\r
<p>\r
  Perhaps the most commonly seen kind of node can be implemented using a <a href="../api/symbols/Panel.html" target="api">Panel</a> of type <a href="../api/symbols/Panel.html#vertical" target="api">Panel.Vertical</a>. You can add as many <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s to a Vertical Panel as you'd like.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<h3 id="SmallIcons"><a class="not-prose heading-anchor" href="#SmallIcons">Small icons</a></h3>\r
<p>\r
  Another commonly seen kind of node can be implemented using a <a href="../api/symbols/Panel.html" target="api">Panel</a> of type <a href="../api/symbols/Panel.html#horizontal" target="api">Panel.Horizontal</a>.\r
  You can add as many <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s to a Horizontal Panel as you'd like.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<h2 id="NestedPanels"><a class="not-prose heading-anchor" href="#NestedPanels">Nested Panels</a></h2>\r
<p>\r
  Panels can be nested.\r
  For example, here is an elaborate node defined as a "Vertical" Panel consisting of an "Auto" Panel surrounding a "Vertical" Panel that itself includes "Horizontal" Panels, more nested "Vertical" Panels, and another nested "Auto" Panel.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<h2 id="DecoratedContent"><a class="not-prose heading-anchor" href="#DecoratedContent">Decorated content</a></h2>\r
<p>\r
  Sometimes you want to have a simple node that may display additional visuals to indicate what state it is in.\r
</p>\r
\r
<p>\r
  One way to implement this is to use a <a href="../api/symbols/Panel.html" target="api">Panel</a> of type <a href="../api/symbols/Panel.html#spot" target="api">Panel.Spot</a>, where the main element is itself a Panel containing the\r
  elements that you always want to display, and there are additional objects located at spots around the main element.\r
  The basic outline would be:\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
<p>\r
  So the basic body of the node is in any kind of Panel,\r
  which is surrounded by the Shape using an "Auto" Panel,\r
  which gets decorations using the "Spot" Panel that is also the Node.\r
</p>\r
<p>\r
 "Spot" Panels can also be used for placing <a href="ports#SinglePorts">Link ports</a> relative to the body of a node.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  Note the use of <a href="../api/symbols/Part.html#locationobjectname" target="api">Part.locationObjectName</a> and <a href="../api/symbols/GraphObject.html#name" target="api">GraphObject.name</a>. By using the main content as the location and not the whole Node, the decoration is not considered when positioning the Node.\r
  If one were to rename the Panel to something other than "BODY", Rack 2 would sit slightly lower than its neighbors. More detail is in the <a href="nodes#PositionAndLocation">"Position and Location"</a> section.\r
</p>\r
\r
<p>\r
  As another example of a node decoration, this implements a "ribbon" at the top right corner of the node.\r
  The ribbon is implemented by a <a href="../api/symbols/Panel.html" target="api">Panel</a> that contains both a <a href="../api/symbols/Shape.html" target="api">Shape</a> and a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>,\r
  and the panel is positioned by its <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> and <a href="../api/symbols/GraphObject.html#alignmentfocus" target="api">GraphObject.alignmentFocus</a> in\r
  the Spot Panel that also is the <a href="../api/symbols/Node.html" target="api">Node</a>.\r
  The appearance of the ribbon is achieved by using a custom <a href="../api/symbols/Geometry.html" target="api">Geometry</a> and binding <a href="../api/symbols/GraphObject.html#opacity" target="api">GraphObject.opacity</a>.\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
\r
<h2 id="PositionAndLocation"><a class="not-prose heading-anchor" href="#PositionAndLocation">Position and Location</a></h2>\r
<p>\r
  <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a> controls where the top-left corner of a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>'s <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a> is placed.\r
  <a href="../api/symbols/Part.html#location" target="api">Part.location</a> controls where the <a href="../api/symbols/Part.html#locationspot" target="api">Part.locationSpot</a> is placed.\r
</p>\r
\r
<p>\r
  By default, setting position is identical to setting location. In this example, the node on the left is positioned\r
  via "position" and the node on the right is positioned via "location".\r
</p>\r
\r
<!-- CODE_BLOCK_10 -->\r
\r
<p>\r
  Other than the x-offset, both nodes are positioned the same relative to the grid lines. This is because by default,\r
  <a href="../api/symbols/Part.html#location" target="api">Part.location</a> and <a href="../api/symbols/GraphObject.html#position" target="api">GraphObject.position</a> control the same point (the top-left of the element's bounds).\r
</p>\r
\r
<p>\r
  You can set the <a href="../api/symbols/Part.html#locationspot" target="api">Part.locationSpot</a> of a <a href="../api/symbols/Part.html" target="api">Part</a> to any <a href="../api/symbols/Spot.html" target="api">Spot</a> to change where <a href="../api/symbols/Part.html#location" target="api">Part.location</a> refers to. In this example, location now controls the center of the element, not the top-left.\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
\r
<p>\r
  The first node is only setting position, which ignores the locationSpot and just uses the top-left corner. The second node is only setting location,\r
  which means the locationSpot (the center) will be moved to the given Point instead of the top-left corner being moved.\r
</p>\r
<p>\r
  To summarize, using locationSpot alongside location allows you to control not only what coordinates a node is placed at,\r
  but exactly what part of the node is placed at those coordinates.\r
</p>\r
\r
<p>\r
  Commonly, one may wish to position an element while ignoring all decorations, labels, or extraneous elements that exist on top of the original element.\r
  Because positioning happens at the Node level, it may seem difficult to try to set the locationSpot of a Node on a particular piece of content.\r
  To achieve this, you can place a Part's (and therefore Node's) <a href="../api/symbols/Part.html#locationspot" target="api">Part.locationSpot</a> on a GraphObject inside of it by setting <a href="../api/symbols/Part.html#locationobjectname" target="api">Part.locationObjectName</a>\r
  to that object's <a href="../api/symbols/GraphObject.html#name" target="api">GraphObject.name</a>, like in this example.\r
</p>\r
\r
<!-- CODE_BLOCK_12 -->\r
\r
<p>\r
  The left node only has "position" set, so is positioned off of the gridlines due to the label. The right node only has "location" set,\r
  so is positioned according to both locationObjectName and locationSpot, which results in the center of the circle being placed at (100, 0).\r
</p>\r
\r
<p>\r
  If the position or location of a Node is not <a href="../api/symbols/Point.html#isreal" target="api">Point.isReal</a>, it will not be seen, because GoJS will not know where to draw the node.\r
  In fact, the default value for a node's position or location is <code>NaN, NaN</code> and it is the responsibility\r
  of either the <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> or data bindings to assign real point values for each node.\r
</p>\r
\r
<h2 id="further-reading"><a class="not-prose heading-anchor" href="#further-reading">Further reading</a></h2>\r
\r
<ul>\r
  <li><a href="links">Links</a></li>\r
  <li><a href="viewport">Coordinate Systems</a></li>\r
  <li><a href="groups">Groups</a></li>\r
</ul>\r
</div>\r
`,codeBlocks:[{id:`shapes`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "lightskyblue" })\r
        // Node.data.fig -> Shape.figure\r
        .bind("figure", "fig"),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
diagram.scale = 2;\r
diagram.model = new go.GraphLinksModel([\r
  { text: "Alpha",   fig: "RoundedRectangle" },\r
  { text: "Beta",    fig: "Ellipse" },\r
  { text: "Delta",   fig: "FramedRectangle" },\r
  { text: "Zeta",    fig: "Diamond" }\r
]);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`borderedtable`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { scale: 1.75 })\r
    .add(\r
      new go.Shape({\r
          fill: new go.Brush("Linear", { 0: "paleturquoise", 1: "lightskyblue" }),\r
          stroke: "darkblue", strokeWidth: 2, strokeDashArray: [4, 4]\r
        }),\r
      new go.Panel("Table", { defaultAlignment: go.Spot.Left, margin: 10 })\r
        .addColumnDefinition(1, { width: 25 })\r
        .add(\r
          new go.TextBlock({\r
              row: 0, column: 0, columnSpan: 3, alignment: go.Spot.Center, margin: 5,\r
              font: "bold 12pt sans-serif"\r
            })\r
            .bind("text", "title"),\r
          new go.TextBlock("First: ", { row: 1, column: 0 }),\r
          new go.TextBlock({ row: 1, column: 2 })\r
            .bind("text", "firstText"),\r
          new go.TextBlock("Second: ", { row: 2, column: 0 }),\r
          new go.TextBlock({ row: 2, column: 2 })\r
            .bind("text", "secondText")\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { title: "Alpha", firstText: "This text's first", secondText: "This one's second" }\r
]);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`fixedsize`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot", { scale: 1.75, desiredSize: new go.Size(100, 50) })\r
    .add(\r
      new go.Shape({ fill: "lightskyblue" })\r
        .bind("figure"),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { text: "Alpha, Alpha, Alpha",  figure: "RoundedRectangle" },\r
  { text: "Beta, Beta, Beta",     figure: "Ellipse" },\r
  { text: "Epsilon",              figure: "Procedure" },\r
  { text: "Z",                    figure: "FramedRectangle" }\r
]);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`fixedsizewrong`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot", { scale: 2 }) // IT SHOULD BE SET HERE\r
    .add(\r
      new go.Shape({\r
        fill: "lightskyblue",\r
        desiredSize: new go.Size(100, 50) // DON'T SET THIS HERE\r
      })\r
        .bind("figure"),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { text: "Alpha, Alpha, Alpha",  figure: "RoundedRectangle" },\r
]);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`icons2`,code:`diagram.nodeTemplate =\r
  new go.Node("Vertical", { scale: 2 })\r
    .add(\r
      new go.TextBlock({\r
          margin: new go.Margin(0, 0, 3, 0),\r
          maxSize: new go.Size(50, 30),\r
          textAlign: "center",\r
          font: "bold 10pt sans-serif"\r
        })\r
        .bind("text", "header"),\r
      new go.Picture({ maxSize: new go.Size(50, 50) })\r
        .bind("source", "img"),\r
      new go.TextBlock({ margin: new go.Margin(3, 0, 0, 0) })\r
        .bind("text", "footer")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { header: "Troll Icon", footer: "Nawoods the Herbivore", img: "images/nawoods.jpg" }\r
]);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`smallicons`,code:`diagram.nodeTemplate =\r
  new go.Node("Horizontal")\r
    .add(\r
      new go.Picture({ maxSize: new go.Size(16, 16) })\r
        .bind("source", "img"),\r
      new go.TextBlock({ margin: new go.Margin(0, 0, 0, 2) })\r
        .bind("text")\r
    );\r
\r
diagram.scale = 2;\r
diagram.model = new go.GraphLinksModel([\r
  { text: "Nawoods", img: "images/nawoods.jpg" }\r
]);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`nestedpanel1`,code:`// common styling for each indicator\r
function makeIndicator(propName, label) {  // the data property name; the period label text\r
  return new go.Panel("Vertical", { margin: new go.Margin(0, 4) })  // stacks the pill above its period label\r
    .add(\r
      new go.Shape("RoundedRectangle", {  // the pill\r
        width: 22, height: 5, strokeWidth: 0, parameter1: 2.5\r
      })\r
        .bind("fill", propName),\r
      new go.TextBlock(label, {  // the period label below the pill\r
        font: "7pt sans-serif", stroke: "#94A3B8",\r
        margin: new go.Margin(3, 0, 0, 0)\r
      })\r
    );  // end Vertical Panel\r
}\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical") // Places the main contents of the Node on top and the TextBlock below\r
    .add(\r
      new go.Panel("Auto", { // Surrounds the main contents with a border, but not the TextBlock\r
        portId: ""  // this whole panel is the port for the node\r
      })\r
        .add(\r
          new go.Shape("RoundedRectangle",  // the border\r
            { fill: "white", stroke: "#E5E7EB", strokeWidth: 1, parameter1: 12 }),\r
          new go.Panel("Vertical", { padding: new go.Margin(16, 22) })  // everything in the border\r
            .add(\r
              new go.Panel("Horizontal", { margin: new go.Margin(0, 0, 12, 0) })\r
                .add(  // the row of status indicators\r
                  makeIndicator("ind0", "1D"), // Node.data.ind0 -> Shape.fill\r
                  makeIndicator("ind1", "1W"), // Node.data.ind1 -> Shape.fill\r
                  makeIndicator("ind2", "1M")  // Node.data.ind2 -> Shape.fill\r
                ),  // end Horizontal Panel\r
              new go.TextBlock({\r
                font: "bold 13pt sans-serif", stroke: "#64748B"\r
              })\r
                .bind("text", "ticker"),\r
              new go.TextBlock({\r
                font: "bold 24pt sans-serif", stroke: "#0F172A",\r
                margin: new go.Margin(2, 0, 4, 0)\r
              })\r
                .bind("text", "price"),\r
              new go.Panel("Horizontal", { margin: new go.Margin(0, 0, 12, 0) })\r
                .add(\r
                  new go.Shape({\r
                    width: 9, height: 9, strokeWidth: 0,\r
                    margin: new go.Margin(0, 5, 0, 0)\r
                  })\r
                    .bind("figure", "up", b => b ? "TriangleUp" : "TriangleDown")\r
                    .bind("fill", "up", b => b ? "#10B981" : "#EF4444"),\r
                  new go.TextBlock({ font: "bold 10pt sans-serif" })\r
                    .bind("text", "change")\r
                    .bind("stroke", "up", b => b ? "#10B981" : "#EF4444")\r
                ),\r
              new go.Panel("Auto")\r
                .add(\r
                  new go.Shape("RoundedRectangle",\r
                    { strokeWidth: 0, parameter1: 4 })\r
                    .bind("fill", "color"),\r
                  new go.TextBlock({\r
                    margin: new go.Margin(3, 10),\r
                    stroke: "white",\r
                    font: "bold 8pt sans-serif"\r
                  })\r
                    .bind("text", "sector")\r
                )\r
            )  // end Vertical Panel\r
        ),  // end Auto Panel\r
      new go.TextBlock({\r
        margin: new go.Margin(8, 0, 0, 0),\r
        font: "11pt sans-serif",\r
        stroke: "#64748B"\r
      })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  {\r
    key: 1,               text: "Acme Corp.", ticker: "ACME",\r
    price: "$182.52",     change: "+2.34%",   up: true,\r
    sector: "TECHNOLOGY", color: "#4F46E5",\r
    ind0: "#10B981",      ind1: "#10B981",    ind2: "#EF4444"\r
  },\r
  {\r
    key: 2,               text: "Zenith Motors", ticker: "ZNTH",\r
    price: "$248.91",     change: "-1.42%",      up: false,\r
    sector: "AUTOMOTIVE", color: "#DC2626",\r
    ind0: "#EF4444",      ind1: "#10B981",       ind2: "#10B981"\r
  }\r
],\r
[\r
  { from: 1, to: 2 }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`Node, "Spot"\r
    Panel, "Auto"  // the contents with border\r
        Shape        // the border\r
        Panel, ...   // the contents\r
           . . .\r
    Shape  // the decoration`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`spotdecorations`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot", {\r
      locationObjectName: "BODY",\r
      toolTip:\r
        new go.Adornment("Auto", { opacity: 0 })\r
          .add(\r
            new go.Shape({ fill: "khaki" }),\r
            new go.TextBlock({ margin: 4 })\r
              .bind("text", "warning")\r
          )\r
          .bind("opacity", "warning", w => w ? 1 : 0)\r
    })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      // the main content:\r
      new go.Panel("Auto", { name: "BODY" })\r
        .add(\r
          new go.Shape({ fill: "goldenrod", stroke: null, opacity: 0 })\r
            .bind("opacity", "warning", w => w ? .2 : 0),\r
          new go.Panel("Vertical", { margin: 5 })\r
            .add(\r
              new go.Picture({\r
                  maxSize: new go.Size(60, 60),\r
                  source: "../samples/images/network/server.svg"\r
                }),\r
              new go.TextBlock({ margin: new go.Margin(3, 0, 0, 0) })\r
                .bind("text")\r
            )\r
        ),\r
      // decorations:\r
      new go.Shape("TriangleUp", {\r
          alignment: go.Spot.TopRight,\r
          fill: "yellow", stroke: "black", strokeWidth: 2, width: 19, height: 16,\r
          visible: false\r
        })\r
        .bind("visible", "warning", w => !!w),\r
    );\r
\r
diagram.scale = 1.25;\r
diagram.model = new go.GraphLinksModel([\r
  { text: "Rack 1", loc: "0 0" },\r
  { text: "Rack 2", loc: "100 0", warning: "High disk temperature" },\r
  { text: "Rack 3", loc: "200 0" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`ribbondecorations`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot", {\r
      locationSpot: go.Spot.Center, locationObjectName: "BODY",\r
      selectionObjectName: "BODY"\r
    })\r
    .add(\r
      new go.Panel("Auto", {\r
          name: "BODY", width: 150, height: 100, portId: ""\r
        })\r
        .add(\r
          new go.Shape({ fill: "lightgray", stroke: null, strokeWidth: 0 }),\r
          new go.TextBlock()\r
            .bind("text")\r
        ),  // end "Auto" Panel\r
      new go.Panel("Spot", {\r
          // note that the opacity defaults to zero (not visible),\r
          // in case there is no "ribbon" property\r
          opacity: 0,\r
          alignment: new go.Spot(1, 0, 2, -2),\r
          alignmentFocus: go.Spot.TopRight\r
        })\r
        .bind("opacity", "ribbon", t => t ? 1 : 0)\r
        .add(\r
          new go.Shape({  // the ribbon itself\r
              geometryString: "F1 M0 0 L30 0 70 40 70 70z",\r
              fill: "red", stroke: null, strokeWidth: 0\r
            }),\r
          new go.TextBlock({\r
              alignment: new go.Spot(1, 0, -29, 29),\r
              angle: 45, maxSize: new go.Size(100, NaN),\r
              stroke: "white", font: "bold 13px sans-serif", textAlign: "center"\r
            })\r
            .bind("text", "ribbon")\r
        )  // end inner "Spot" Panel\r
    );  // end outer "Spot" Panel\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "Beta", ribbon: "NEWEST" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`positionbasic`,code:`diagram.grid.visible = true;\r
diagram.scale = 3;\r
diagram.nodeTemplate =\r
  new go.Part({\r
    desiredSize: new go.Size(25, 25)\r
  })\r
    .bind("position")\r
    .bind("location")\r
    .add(new go.Shape({ fill: "rgba(255, 0, 0, .5)", strokeWidth: 0 }));\r
\r
diagram.model = new go.GraphLinksModel([\r
  { position: new go.Point(0, 0) },\r
  { location: new go.Point(50, 0) }\r
]);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:`locationbasic`,code:`diagram.grid.visible = true;\r
diagram.scale = 3;\r
diagram.nodeTemplate =\r
  new go.Part({\r
    desiredSize: new go.Size(25, 25),\r
    locationSpot: go.Spot.Center // Only difference from previous example\r
  })\r
    .bind("position")\r
    .bind("location")\r
    .add(new go.Shape({ fill: "rgba(255, 0, 0, .5)", strokeWidth: 0 }));\r
\r
diagram.model = new go.GraphLinksModel([\r
  { position: new go.Point(0, 0) },\r
  { location: new go.Point(50, 0) }\r
]);`,isExecutable:!0,animation:!1,minHeight:0,highlight:[6],language:`js`,initiallyVisible:!0},{id:`positionlocation`,code:`diagram.grid.visible = true;\r
diagram.scale = 2;\r
diagram.nodeTemplate =\r
  new go.Node("Vertical", {\r
    locationObjectName: "SHAPE",\r
    locationSpot: go.Spot.Center\r
  })\r
    .bind("position")\r
    .bind("location")\r
    .add(\r
      new go.TextBlock("Label", { editable: true }),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("Circle", { width: 8, height: 8, fill: "lightgreen", name: "SHAPE" }),\r
          new go.Shape("Circle", { width: 3, height: 3, strokeWidth: 0 })\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { position: new go.Point(0, 0) },\r
  { location: new go.Point(100, 0) }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`en0z2j`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};