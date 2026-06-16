var e=`<h4>Animation</h4>\r
<p>\r
  <b>GoJS</b> offers several built-in animations, enabled by default, as well as the\r
  ability to create arbitrary animations.\r
</p>\r
<p>\r
  The\r
  <a href="../api/symbols/Diagram.html#animationManager" target="api"\r
    >Diagram.animationManager</a\r
  >\r
  handles animations within a\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a>. The\r
  <a href="../api/symbols/AnimationManager.html" target="api">AnimationManager</a>\r
  automatically sets up and dispatches default animations, and has properties to customize\r
  and disable them. Custom animations are possible by creating instances of\r
  <a href="../api/symbols/Animation.html" target="api">Animation</a> or\r
  <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>. More\r
  information can be found in the <a href="../learn/animation">GoJS learn pages</a>.\r
</p>\r
`,t=`<h4>Buttons</h4>\r
<p>\r
  GoJS defines several <a href="../api/symbols/Panel.html" target="api">Panel</a>s for\r
  common uses. These include "Button", "TreeExpanderButton", "SubGraphExpanderButton",\r
  "PanelExpanderButton", "ContextMenuButton", and "CheckBoxButton". "ContextMenuButton"s\r
  are typically used inside of "ContextMenu" Panels; "CheckBoxButton"s are used in the\r
  implementation of "CheckBox" Panels.\r
</p>\r
<p>\r
  These predefined panels can be used as if they were\r
  <a href="../api/symbols/Panel.html" target="api">Panel</a>-derived classes in calls to\r
  <a href="../api/symbols/GraphObject.html#build" target="api">GraphObject.build</a>. They\r
  are implemented as simple visual trees of\r
  <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s in\r
  <a href="../api/symbols/Panel.html" target="api">Panel</a>s, with pre-set properties and\r
  event handlers.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/buttons">GoJS learn pages</a>.\r
</p>\r
`,n=`<h4>Circular Layout</h4>\r
<p>\r
  This predefined layout is used for placing Nodes in a cirular or elliptical arrangement.\r
  More information can be found in the\r
  <a href="../learn/layouts#CircularLayout">GoJS learn pages</a>.\r
</p>\r
`,r=`<h4>Collections</h4>\r
<p>\r
  <b>GoJS</b> provides its own collection classes:\r
  <a href="../api/symbols/List.html" target="api">List</a>,\r
  <a href="../api/symbols/Set.html" target="api">Set</a>, and\r
  <a href="../api/symbols/Map.html" target="api">Map</a>. You can iterate over a\r
  collection by using an <a href="../api/symbols/Iterator.html" target="api">Iterator</a>.\r
  More information can be found in the\r
  <a href="../learn/collections">GoJS learn pages</a>.\r
</p>\r
`,i=`<h4>Commands</h4>\r
<p>\r
  A <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> handles\r
  all default keyboard input events in a Diagram. There are many predefined methods on\r
  <a>CommandHandler</a> that implement common commands to operate on the Diagram or the\r
  current <a>Diagram.selection></a>.\r
</p>\r
<p>\r
  You can override <a>CommandHandler.doKeyDown</a> to handle additional keyboard shortcuts\r
  or to change which commands are invoked via the keyboard.\r
</p>\r
\r
<p>\r
  Your code can invoke a command by calling the appropriate method on the\r
  <a>Diagram.commandHandler</a>. Each command method has a corresponding\r
  <b>can...</b> predicate that your code can use to enable or disable any buttons that\r
  invoke the command. Your code can customize the behavior of a command by overriding the\r
  method on <a>CommandHandler</a>, or by setting properties on the\r
  <a>CommandHandler</a> or <a>Diagram</a> or <a>Part</a>s -- see\r
  <a href="../learn/permissions">GoJS Permissions</a>.\r
</p>\r
<p>There are several CommandHandler extensions that provide additional functionality.</p>\r
\r
<p>\r
  More information can be found in the <a href="../learn/commands">GoJS learn pages</a>.\r
</p>\r
`,a=`<h4>Context Menus</h4>\r
<p>\r
  A GoJS context menu is an\r
  <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is shown when\r
  the user context-clicks (right mouse click or long touch hold) an object that has its\r
  <a href="../api/symbols/GraphObject.html#contextMenu" target="api"\r
    >GraphObject.contextMenu</a\r
  >\r
  set. The context menu is bound to the same data as the part itself.\r
</p>\r
<p>\r
  It is typical to implement a context menu as a "ContextMenu" Panel containing\r
  "ContextMenuButton"s, as you can see in the code below in the assignment of the Node's\r
  <a href="../api/symbols/GraphObject.html#contextMenu" target="api"\r
    >GraphObject.contextMenu</a\r
  >\r
  and\r
  <a href="../api/symbols/Diagram.html#contextMenu" target="api">Diagram.contextMenu</a>\r
  properties. Each "ContextMenu" is just a "Vertical" Panel\r
  <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is shadowed.\r
  Each "ContextMenuButton" is a Panel on which you can set the\r
  <a href="../api/symbols/GraphObject.html#click" target="api">GraphObject.click</a> event\r
  handler. In the event handler <code>obj.part</code> will be the whole context menu\r
  Adornment. <code>obj.part.adornedPart</code> will be the adorned Node or Link. The bound\r
  data is <code>obj.part.data</code>, which will be the same as\r
  <code>obj.part.adornedPart.data</code>.\r
</p>\r
<p>\r
  More information can be found in the\r
  <a href="../learn/contextMenus">GoJS learn pages</a>.\r
</p>\r
`,o=`<h4>Custom Layouts</h4>\r
<p>GoJS allows for the creation of custom layouts to meet specific needs.</p>\r
<p>\r
  There are also many layouts that are extensions -- not predefined in the\r
  <code>go.js</code> or <code>go-debug.js</code> library, but available as source code in\r
  one of the three extension directories, with some documentation and corresponding\r
  samples. More information can be found in the\r
  <a href="../learn/layouts#CustomLayouts">GoJS learn pages</a>.\r
</p>\r
`,s=`<h4>Exporting Raster Images</h4>\r
<p>\r
  <b>GoJS</b> has two functions for creating raster images:\r
  <a href="../api/symbols/Diagram.html#makeImageData" target="api"\r
    >Diagram.makeImageData</a\r
  >, which outputs a Base64 image data string, and\r
  <a href="../api/symbols/Diagram.html#makeImage" target="api">Diagram.makeImage</a>,\r
  which is a convenience function that calls\r
  <a href="../api/symbols/Diagram.html#makeImageData" target="api"\r
    >Diagram.makeImageData</a\r
  >\r
  and returns a new HTMLImageElement with the image data as its source. Both functions\r
  have the same single argument, a JavaScript Object that contains several definable\r
  properties, enumerated in the documentation. More information can be found in the\r
  <a href="../learn/makingImages">GoJS learn pages</a>.\r
</p>\r
`,c=`<h4>GoJS Extensions</h4>\r
<p>\r
  <b>GoJS</b> can be extended in a variety of ways. The most common way to change the\r
  standard behavior is to set properties on the\r
  <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>,\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a>,\r
  <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>,\r
  <a href="../api/symbols/Tool.html" target="api">Tool</a>, or\r
  <a href="../api/symbols/Layout.html" target="api">Layout</a>. But when the desired\r
  property does not exist, you might need to override methods of CommandHandler, Tool,\r
  Layout, Link, or Node. Methods that you can override are documented in the API\r
  reference. Various features of GoJS can be overriden, either by replacing a method on an\r
  instance (a feature of JavaScript) or by defining a subclass. You should not modify the\r
  prototypes of any of the <b>GoJS</b> classes.\r
</p>\r
<p>\r
  In addition to our samples, <b>GoJS</b> provides an\r
  <strong><a href="../samples/#extensions">extensions gallery</a></strong\r
  >, showcasing the creation of custom tools and layouts. Those classes and samples are\r
  written in TypeScript, available at <code>../extensionsJSM/</code>, as\r
  ECMAScript/JavaScript modules -- these use the\r
  <code>../release/go-module.js</code> library. We recommend that you copy the files that\r
  you need into your project, so that you can adjust how they refer to the GoJS library\r
  that you choose and so that you can include them into your own building and packaging\r
  procedures.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/extensions">GoJS learn pages</a>.\r
</p>\r
`,l=`<h4>Force Directed Layout</h4>\r
<p>\r
  This predefined layout treats the graph as if it were a system of physical bodies with\r
  forces acting on and between them. The layout iteratively moves nodes and links to\r
  minimize the total sum of forces on each node. The resulting layout will normally not\r
  contain overlapping Nodes, excluding cases where the graph is densely interconnected.\r
  More information can be found in the\r
  <a href="../learn/layouts#ForceDirectedLayout">GoJS learn pages</a>.\r
</p>\r
`,u=`<h4>GoJS on Different Platforms</h4>\r
<p>\r
  GoJS is intended to run in any environment that executes JavaScript. This includes on\r
  browsers and within browser frameworks, and also in headless contexts such as Node.js.\r
</p>\r
<p>We maintain examples for common frameworks:</p>\r
<ul>\r
  <li>\r
    <strong>React:</strong> We provide a\r
    <a\r
      href="https://github.com/NorthwoodsSoftware/gojs-react"\r
      target="_blank"\r
      rel="noopener"\r
      >React Component</a\r
    >\r
    as an\r
    <a href="https://npmjs.com/gojs-react" target="_blank" rel="noopener">NPM package</a>\r
    and a usage\r
    <a\r
      href="https://github.com/NorthwoodsSoftware/gojs-react-basic"\r
      target="_blank"\r
      rel="noopener"\r
      >sample</a\r
    >. See the learn page on <a href="../learn/react">GoJS with React</a> for more\r
    information on React integration.\r
  </li>\r
  <li>\r
    <strong>Angular:</strong> We provide an\r
    <a\r
      href="https://github.com/NorthwoodsSoftware/gojs-angular"\r
      target="_blank"\r
      rel="noopener"\r
      >Angular Component</a\r
    >\r
    as an\r
    <a href="https://npmjs.com/gojs-angular" target="_blank" rel="noopener"\r
      >NPM package</a\r
    >\r
    and a usage\r
    <a\r
      href="https://github.com/NorthwoodsSoftware/gojs-angular-basic"\r
      target="_blank"\r
      rel="noopener"\r
      >sample</a\r
    >. See the learn page on <a href="../learn/angular">GoJS with Angular</a> for more\r
    information on Angular integration.\r
  </li>\r
  <li>\r
    <strong>Vue:</strong> We provide a <a href="../samples/vue.html">Vue.js Sample</a>.\r
  </li>\r
</ul>\r
<p>\r
  More information, including usage on frameworks including Electron, Blazor, and node.js,\r
  can be found at the <a href="../learn/platforms">GoJS learn pages</a>.\r
</p>\r
`,d=`<h4>Geometry Path Strings</h4>\r
<p>\r
  The <b>GoJS</b> <a href="../api/symbols/Geometry.html" target="api">Geometry</a> class\r
  controls the "shape" of a <a href="../api/symbols/Shape.html" target="api">Shape</a>,\r
  whereas the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> and\r
  <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> and other shape\r
  properties control the colors and appearance of the shape. For common shape figures,\r
  there are predefined geometries that can be used by setting\r
  <a href="../api/symbols/Shape.html#figure" target="api">Shape.figure</a>. However one\r
  can also define custom geometries.\r
</p>\r
<p>\r
  One can construct any Geometry by allocating and initializing a\r
  <a href="../api/symbols/Geometry.html" target="api">Geometry</a> of at least one\r
  <a href="../api/symbols/PathFigure.html" target="api">PathFigure</a> holding some\r
  <a href="../api/symbols/PathSegment.html" target="api">PathSegment</a>s. But you may\r
  find that using the string representation of a Geometry is easier to write and save in a\r
  database. Use the static method\r
  <a href="../api/symbols/Geometry.html#parse" target="api">Geometry.parse</a> or the\r
  <a href="../api/symbols/Shape.html#geometryString" target="api">Shape.geometryString</a>\r
  property to transform a geometry path string into a\r
  <a href="../api/symbols/Geometry.html" target="api">Geometry</a> object.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/geometry">GoJS learn pages</a>.\r
</p>\r
`,f=`<h4>Grid Patterns</h4>\r
<p>\r
  <b>GoJS</b> provides functionality to display a grid of lines drawn at regular\r
  intervals. Grid Panels can also force dragged parts to be aligned on grid points, and\r
  resize parts to be multiples of the grid cell size.\r
</p>\r
<p>\r
  Grids are implemented using a type of\r
  <a href="../api/symbols/Panel.html" target="api">Panel</a>,\r
  <a href="../api/symbols/PanelLayout.html#Grid" target="api">Panel.Grid</a>. Grid Panels,\r
  like most other types of Panels, can be used within\r
  <a href="../api/symbols/Node.html" target="api">Node</a>s or any other kind of\r
  <a href="../api/symbols/Part.html" target="api">Part</a>. However when they are used as\r
  the <a href="../api/symbols/Diagram.html#grid" target="api">Diagram.grid</a>, they are\r
  effectively infinite in extent.\r
</p>\r
<p>More information can be found in the <a href="../learn/grids">GoJS learn pages</a>.</p>\r
`,p=`<h4>Grid Layouts</h4>\r
<p>\r
  This predefined layout is used for placing Nodes in a grid-like arrangement. Nodes can\r
  be ordered, spaced apart, and wrapped as needed. This Layout ignores any Links\r
  connecting the nodes being laid out. More information can be found in the\r
  <a href="../learn/layouts#GridLayout">GoJS learn pages</a>.\r
</p>\r
`,m=`<h4>Groups</h4>\r
<p>\r
  The <a href="../api/symbols/Group.html" target="api">Group</a> class is used to treat a\r
  collection of <a href="../api/symbols/Node.html" target="api">Node</a>s and\r
  <a href="../api/symbols/Link.html" target="api">Link</a>s as if they were a single\r
  <a href="../api/symbols/Node.html" target="api">Node</a>. Those nodes and links are\r
  members of the group; together they constitute a subgraph.\r
</p>\r
<p>\r
  A subgraph is <em>not</em> another\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, so there is no separate\r
  HTML div element for the subgraph of a group. All of the\r
  <a href="../api/symbols/Part.html" target="api">Part</a>s that are members of a\r
  <a href="../api/symbols/Group.html" target="api">Group</a> belong to the same Diagram as\r
  the Group. There can be links between member nodes and nodes outside of the group as\r
  well as links between the group itself and other nodes. There can even be links between\r
  member nodes and the containing group itself.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/groups">GoJS learn pages</a>.\r
</p>\r
`,h=`<h4>HTML Interaction</h4>\r
<p>\r
  GoJS Diagrams can be used alongside other HTML elements in a webapp. For custom Text\r
  Editors, Context Menus, and ToolTips, which are invoked and hidden via GoJS tool\r
  operations, it is best to use the\r
  <a href="../api/symbols/HTMLInfo.html" target="api">HTMLInfo</a> class.\r
</p>\r
<p>\r
  More information can be found in the\r
  <a href="../learn/HTMLInteraction">GoJS learn pages</a>.\r
</p>\r
`,g=`<h4>Data Inspector</h4>\r
<p>\r
  Using a premade GoJS extension, you can create an HTML-based inspector that displays and\r
  allows editing of data for the selected Part (if any), or for a particular JavaScript\r
  object, or for the shared\r
  <a href="../api/symbols/Model.html#modelData" target="api">Model.modelData</a> object,\r
  which exists even if there are no nodes or links.\r
</p>\r
<p>\r
  The inspector code lies in\r
  <a href="../extensions/DataInspector.js">DataInspector.js</a>. This code is meant to be\r
  a starting point for making your own model data inspector.\r
</p>\r
<p>\r
  A generic demonstration of this extension can be found in the\r
  <a href="../samples/DataInspector.html">GoJS learn pages</a>.\r
</p>\r
`,_=`<h4>Item Arrays</h4>\r
<p>\r
  It is sometimes useful to display a variable number of elements in a node by data\r
  binding to a JavaScript Array. In GoJS, this is simply achieved by binding (or setting)\r
  <a href="../api/symbols/Panel.html#itemArray" target="api">Panel.itemArray</a>. The\r
  <a href="../api/symbols/Panel.html" target="api">Panel</a> will create an element in the\r
  panel for each value in the Array. More information can be found in the\r
  <a href="../learn/itemArrays">GoJS learn pages</a>.\r
</p>\r
`,v=`<h4>Layered Digraph Layout</h4>\r
<p>\r
  This predefined layout is used for placing Nodes of a general directed graph in layers\r
  (rows or columns). This is more general than\r
  <a href="../api/symbols/TreeLayout.html">TreeLayout</a>, as it does not require that the\r
  graph be tree-structured. More information can be found in the\r
  <a href="../learn/layouts#LayeredDigraphLayout">GoJS learn pages</a>.\r
</p>\r
`,y=`<h4>Legend</h4>\r
<p>\r
  A Legend can be created for a Diagram using a simple <a>Part</a>. Typically that is\r
  added directly to the Diagram as an unmodeled Part, not as a template with data in the\r
  Model. However you may want to define a template and add a legend data object to the\r
  model so that you can parameterize the legend with information persisted with the model.\r
</p>\r
<p>\r
  Usually a legend will be created as an "Auto" Panel for a border around a "Table" Panel\r
  holding information about the types of nodes and/or links that are in the diagram.\r
</p>\r
<p>\r
  It probably will want to be in the "ViewportBackground" or "ViewportForeground" Layer so\r
  that it is always visible in the viewport despite scrolling or zooming. Set the\r
  <a>GraphObject.alignment</a> property to position it where you want it to be; by default\r
  it will be in the lower right corner. However you may want to treat the legend Part as a\r
  regular Part in the Diagram, possibly laid out by the diagram's <a>Diagram.layout</a>.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/legends">GoJS learn pages</a>.\r
</p>\r
`,b=`<h4>Links</h4>\r
<p>\r
  The <a href="../api/symbols/Link.html" target="api">Link</a> class is used to implement\r
  a visual relationship between nodes. Links are normally created by the presence of link\r
  data objects in the\r
  <a href="../api/symbols/GraphLinksModel.html#linkDataArray" target="api"\r
    >GraphLinksModel.linkDataArray</a\r
  >\r
  or by a parent key reference as the value of the\r
  <a href="../api/symbols/TreeModel.html#nodeParentKeyProperty" target="api"\r
    >TreeModel.nodeParentKeyProperty</a\r
  >\r
  of a node data object in a\r
  <a href="../api/symbols/TreeModel.html" target="api">TreeModel</a>. More information can\r
  be found in the <a href="../learn/links">GoJS learn pages</a>.\r
</p>\r
`,x=`<h4>Overview Diagrams</h4>\r
<p>\r
  An <a href="../api/symbols/Overview.html" target="api">Overview</a> is a subclass of\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a> that is used to display\r
  all of the <a href="../api/symbols/Part.html" target="api">Part</a>s of another diagram\r
  and to show where that diagram's viewport is relative to all of those parts. The user\r
  can also scroll the overviewed diagram by clicking or dragging within the overview.\r
</p>\r
<p>\r
  The initialization of an\r
  <a href="../api/symbols/Overview.html" target="api">Overview</a> is just a matter of\r
  setting\r
  <a href="../api/symbols/Overview.html#observed" target="api">Overview.observed</a> to\r
  refer to the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> that you\r
  want it to show. So there needs to be a DIV for your main diagram, for which you create\r
  a Diagram in the normal manner, and a separate DIV for your overview, for which you\r
  create the Overview in a very simple manner.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/overview">GoJS learn pages</a>.\r
</p>\r
`,S=`<h4>Palette</h4>\r
<p>\r
  A <a href="../api/symbols/Palette.html" target="api">Palette</a> is a subclass of\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a> that is used to display a\r
  number of <a href="../api/symbols/Part.html" target="api">Part</a>s that can be dragged\r
  into the diagram that is being modified by the user. The initialization of a\r
  <a href="../api/symbols/Palette.html" target="api">Palette</a> is just like the\r
  initialization of any <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
  Like Diagrams, you can have more than one Palette on the page at the same time.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/palette">GoJS learn pages</a>.\r
</p>\r
`,C=`<h4>Ports in Nodes</h4>\r
<p>\r
  Specific elements of a Node at which links may connect are called <i>ports</i>. There\r
  may be any number of ports in a node. By default there is just one port, the whole node,\r
  which results in the effect of having the whole node act as the port. Port-like\r
  GraphObjects can only be in <a href="../api/symbols/Node.html" target="api">Node</a>s or\r
  <a href="../api/symbols/Group.html" target="api">Group</a>s, not in\r
  <a href="../api/symbols/Link.html" target="api">Link</a>s or\r
  <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s or simple\r
  <a href="../api/symbols/Part.html" target="api">Part</a>s.\r
</p>\r
<p>More information can be found in the <a href="../learn/ports">GoJS learn pages</a>.</p>\r
`,w=`<h4>Custom Link Routing</h4>\r
<p>\r
  Each Link performs a very fast default computation of its desired path, its "route",\r
  based only on the properties of the Link and the properties of the port objects that it\r
  is connected with. GoJS provides a way to customize link routing by allowing\r
  consideration of other Nodes and Links, with the\r
  <a>Router</a> class.\r
</p>\r
<p>\r
  Routers work by defining a method, <a>Router.routeLinks</a>, which takes a collection of\r
  recently recomputed link routes, plus a collection context that is either a Group or the\r
  Diagram. This method is called by the Diagram during the update phase after layouts are\r
  performed.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/routers">GoJS learn pages</a>.\r
</p>\r
`,T=`<h4>SCADA Diagrams</h4>\r
<p>\r
  SCADA (supervisory control and data acquisition) diagrams are used to display, control, and supervise machines and processes. GoJS is used worldwide to build human-machine interface diagrams in monitoring and control software. GoJS SCADA applications include power plant and refinery monitoring, heavy industry management, building security monitoring, and more.\r
</p>`,E=`<h4>Exporting SVGs</h4>\r
<p>\r
  <b>GoJS</b> has one function for creating SVG:\r
  <a href="../api/symbols/Diagram.html#makeSVG" target="api">Diagram.makeSVG</a>, which\r
  returns a new SVGElement with a representation of a GoJS Diagram. The method has a\r
  single argument, a JavaScript Object that contains several definable properties,\r
  enumerated in the documentation. More information can be found in the\r
  <a href="../learn/makingSVG">GoJS learn pages</a>.\r
</p>\r
`,D=`<h4>Table Panels</h4>\r
<p>\r
  The "Table" Panel,\r
  <a href="../api/symbols/Panel.html#static-Table" target="api">Panel.Table</a>, arranges\r
  objects in rows and columns. Each object in a Table Panel is put into the cell indexed\r
  by the value of\r
  <a href="../api/symbols/GraphObject.html#row" target="api">GraphObject.row</a> and\r
  <a href="../api/symbols/GraphObject.html#column" target="api">GraphObject.column</a>.\r
  The panel will look at the rows and columns for all of the objects in the panel to\r
  determine how many rows and columns the table should have. More information can be found\r
  in the <a href="../learn/tablePanels">GoJS learn pages</a>.\r
</p>\r
`,O=`<h4>Theming</h4>\r
<p>\r
  <b>GoJS</b> allows diagrams to be themed. This is commonly used to provide a light and\r
  dark mode for diagrams.\r
</p>\r
<p>\r
  The\r
  <a href="../api/symbols/Diagram.html#themeManager" target="api">Diagram.themeManager</a>\r
  handles themes within a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
  The <a href="../api/symbols/ThemeManager.html" target="api">ThemeManager</a> can by\r
  shared by multiple diagrams, and is responsible to managing the current theme and\r
  default theme, along with any theme updates. More information can be found in the\r
  <a href="../learn/theming">GoJS learn pages</a>.\r
</p>\r
`,k=`<h4>Tools</h4>\r
<p>\r
  <a href="../api/symbols/Tool.html" target="api">Tool</a>s handle all input events, such\r
  as mouse and keyboard interactions, in a Diagram. There are many kinds of predefined\r
  Tool classes that implement all of the common operations that users do.\r
</p>\r
<p>\r
  For flexibility and simplicity, all input events are canonicalized as\r
  <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s and redirected by\r
  the diagram to go to the\r
  <a href="../api/symbols/Diagram.html#currentTool" target="api">Diagram.currentTool</a>.\r
  By default the Diagram.currentTool is an instance of\r
  <a href="../api/symbols/ToolManager.html" target="api">ToolManager</a> held as the\r
  <a href="../api/symbols/Diagram.html#toolManager" target="api">Diagram.toolManager</a>.\r
  The ToolManager implements support for all mode-less tools. The ToolManager is\r
  responsible for finding another tool that is ready to run and then making it the new\r
  current tool. This causes the new tool to process all of the input events (mouse,\r
  keyboard, and touch) until the tool decides that it is finished, at which time the\r
  diagram's current tool reverts back to the\r
  <a href="../api/symbols/Diagram.html#defaultTool" target="api">Diagram.defaultTool</a>,\r
  which is normally the ToolManager, again.\r
</p>\r
<p>More information can be found in the <a href="../learn/tools">GoJS learn pages</a>.</p>\r
`,A=`<h4>ToolTips</h4>\r
<p>\r
  A tooltip is an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that\r
  is shown when the mouse hovers over an object that has its\r
  <a href="../api/symbols/GraphObject.html#toolTip" target="api">GraphObject.toolTip</a>\r
  set. The tooltip part is bound to the same data as the part itself.\r
</p>\r
<p>\r
  It is typical to implement a tooltip as a "ToolTip" Panel holding a\r
  <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> or a Panel of\r
  TextBlocks and other objects. Each "ToolTip" is just an "Auto" Panel\r
  <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is shadowed, and\r
  where the border is a rectangular\r
  <a href="../api/symbols/Shape.html" target="api">Shape</a> with a light gray fill.\r
  However you can implement the tooltip as any arbitrarily complicated Adornment.\r
</p>\r
<p>\r
  More information can be found in the <a href="../learn/tooltips">GoJS learn pages</a>.\r
</p>\r
`,j=`<h4>Tree Layout</h4>\r
<p>\r
  This predefined layout is used for placing Nodes of a tree-structured graph in layers\r
  (rows or columns). For discussion and examples of the most commonly used properties of\r
  the <a href="../api/symbols/TreeLayout.html">TreeLayout</a>, see the learn\r
  <a href="../learn/trees">Trees</a> page. More information can be found in the\r
  <a href="../learn/layouts#TreeLayout">GoJS learn pages</a>.\r
</p>\r
`;export{n as A,l as C,a as D,o as E,e as M,i as O,u as S,s as T,h as _,D as a,f as b,w as c,x as d,b as f,g,_ as h,O as i,t as j,r as k,C as l,v as m,A as n,E as o,y as p,k as r,T as s,j as t,S as u,m as v,c as w,d as x,p as y};