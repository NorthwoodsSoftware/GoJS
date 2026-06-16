import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Data binding`,category:`Core Concepts`,categoryOrder:2},htmlContent:`<h1>Data Binding</h1>\r
<p>\r
  In GoJS, a <a href="../api/symbols/Model.html" target="api">Model</a> holds your data, and the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> displays that data.\r
  <b>Templates</b> (<a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a>, <a href="../api/symbols/Diagram.html#linktemplate" target="api">Diagram.linkTemplate</a>) connect the two,\r
    describing how to render each Node or Link from a data object.\r
</p>\r
<p>\r
  Templates have data bindings to connect your model data to the properties\r
  on your templates that you need to change on each node.\r
  Below is a Node template containing a <a href="../api/symbols/Shape.html" target="api">Shape</a> and a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>, each of which have a data binding via\r
  <a href="../api/symbols/GraphObject.html#bind" target="api">GraphObject.bind</a>:\r
</p>\r
\r
\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="kinds-of-bindings"><a class="not-prose heading-anchor" href="#kinds-of-bindings">Kinds of Bindings</a></h2>\r
\r
<p>You can make a binding by writing <code>new go.Binding(...)</code>, but the more common way is to call one of these methods on a GraphObject:</p>\r
\r
<ul>\r
  <li><code>.bind()</code> - <a href="../api/symbols/GraphObject.html#bind" target="api">GraphObject.bind</a> is used to set a GraphObject property from the Part's data in the model. For example, setting color or text, like above.\r
  </li>\r
  <li><code>.bindObject()</code> - <a href="../api/symbols/GraphObject.html#bindobject" target="api">GraphObject.bindObject</a> is used to set a GraphObject property from another GraphObject property. For example we might want to set the color of a GraphObject based on whether or not <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> is currently true or false.\r
  </li>\r
  <li><code>.bindModel()</code> - <a href="../api/symbols/GraphObject.html#bindmodel" target="api">GraphObject.bindModel</a> is used to set a GraphObject property from the <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a>.\r
  </li>\r
  <li><code>.bindTwoWay()</code> - <a href="../api/symbols/GraphObject.html#bindtwoway" target="api">GraphObject.bindTwoWay</a> is used to set a GraphObject property from the data, and <strong>also</strong> modifies the data if the GraphObject property changes. For example, it is common to use a two-way binding on <a href="../api/symbols/Part.html#location" target="api">Part.location</a> to make saving location changes easier. Use two-way bindings sparingly - only when you are sure you want this functionality.\r
  </li>\r
  <li><code>.theme()</code> - <a href="../api/symbols/GraphObject.html#theme" target="api">GraphObject.theme</a> is used to bind a GraphObject property from a <a href="../api/symbols/Theme.html" target="api">Theme</a> source. This is an advanced topic, you can read more about theming at the <a href="theming" target="_blank">learn page on theming</a>.\r
  </li>\r
</ul>\r
\r
<p>\r
  Data bindings are used to keep <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> properties in sync with their <a href="../api/symbols/Part.html" target="api">Part</a>'s data's properties.\r
  They are not used to establish or maintain relationships between Parts.\r
  Each kind of <a href="../api/symbols/Model.html" target="api">Model</a> has its own methods for identifying parts and declaring the relationships between them.\r
</p>\r
<p class="box bg-danger">\r
  Trying to bind a non-existent property of a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> will probably result in a warning or error that you can see in the console log.\r
  Providing a new value of the wrong type for a property may also result in a warning or error.\r
  Always check the console log for any kinds of potential exceptions.\r
</p>\r
\r
\r
<h2 id="BindingObjectPropertiesSuchAsLocation"><a class="not-prose heading-anchor" href="#BindingObjectPropertiesSuchAsLocation">Binding object properties such as Part.location</a></h2>\r
<p>\r
  You can data bind properties that have values that are JS objects.\r
  For example it is common to data bind the <a href="../api/symbols/Part.html#location" target="api">Part.location</a> property.\r
</p>\r
<p>\r
  The value of <a href="../api/symbols/Part.html#location" target="api">Part.location</a> is of type <a href="../api/symbols/Point.html" target="api">Point</a>,\r
  so in this example the data property value must be an instance of Point.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>But this is not ideal, since it means we'd have go.Point in our model data. Strings are more easily read and written in JSON and XML, so GoJS bindings routinely use conversion functions to keep model data cleaner.</p>\r
\r
<h2 id="ConversionFunctions"><a class="not-prose heading-anchor" href="#ConversionFunctions">Conversion functions</a></h2>\r
<p>\r
  The <a href="../api/symbols/Point.html" target="api">Point</a> class has a static function, <a href="../api/symbols/Point.html#parse" target="api">Point.parse</a>,\r
  that makes conversion from a string to a Point object easy.\r
  It expects two numbers representing the <a href="../api/symbols/Point.html#x" target="api">Point.x</a> and <a href="../api/symbols/Point.html#y" target="api">Point.y</a> values, and returns a Point object.\r
</p>\r
<p>\r
  You can pass a conversion function as the third argument to the <a href="../api/symbols/Binding.html" target="api">Binding</a> constructor.\r
  In this case it is <a href="../api/symbols/Point.html#parse" target="api">Point.parse</a>.\r
  This allows the location to be specified as a string (such as "100 50").\r
  For data properties on model objects, you will often want to use strings as the representation of\r
  <a href="../api/symbols/Point.html" target="api">Point</a>s, <a href="../api/symbols/Size.html" target="api">Size</a>s, <a href="../api/symbols/Rect.html" target="api">Rect</a>s, <a href="../api/symbols/Margin.html" target="api">Margin</a>s, and <a href="../api/symbols/Spot.html" target="api">Spot</a>s,\r
  rather than references to objects of those classes.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  Conversion functions can be named or anonymous functions.\r
  They should not have any side-effects.\r
  They may get called any number of times in any order, so they should be efficient.\r
</p>\r
<p>\r
  Here is an example that has several <a href="../api/symbols/Shape.html" target="api">Shape</a> properties data-bound to the same boolean data property\r
  named "highlight".\r
  Each conversion function takes the boolean value and returns the appropriate value for the property\r
  that is data-bound.\r
  This makes it trivial to control the appearance of each node from the\r
  data by setting the "highlight" data property to be either false or true.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p class="box bg-danger">\r
  Note that a conversion function can only return property values.\r
  You cannot return GraphObjects to replace objects in the visual tree of the Part.\r
  If you need to show different GraphObjects based on bound data,\r
  you can bind the <a href="../api/symbols/GraphObject.html#visible" target="api">GraphObject.visible</a> or the <a href="../api/symbols/GraphObject.html#opacity" target="api">GraphObject.opacity</a> property.\r
  If you really want different visual structures you can use multiple templates\r
  (see <a href="templateMaps">Template Maps</a>).\r
</p>\r
\r
\r
\r
<h2 id="updating-model-data-values"><a class="not-prose heading-anchor" href="#updating-model-data-values">Updating model data values</a></h2>\r
<p>\r
  The examples above all depend on the data bindings being evaluated when the <a href="../api/symbols/Part.html" target="api">Part</a> has been\r
  created and its <a href="../api/symbols/Panel.html#data" target="api">Panel.data</a> property is set to refer to the corresponding node or link data.\r
  These actions occur automatically when the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> creates diagram parts for the data\r
  in the model upon setting <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a>.\r
</p>\r
<p>\r
  However, GoJS cannot know when the data property of an arbitrary JavaScript object has been modified.\r
  If you want to change some data object in a model and have the diagram be automatically updated,\r
  what you should do depends on the nature of the property that you are changing.\r
</p>\r
<p>\r
  For most data properties, ones that the model does not treat specially but are data-bound,\r
  you can just call <a href="../api/symbols/Model.html#set" target="api">Model.set</a> within a transaction.\r
  In this example we modify the value of "highlight" on a node data object.\r
  For fun, this modification occurs about twice a second.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<h2 id="ChangingGraphStructure"><a class="not-prose heading-anchor" href="#ChangingGraphStructure">Changing graph structure</a></h2>\r
<p>\r
  Data binding is not used to establish relationships between parts.\r
  For data properties that a particular model knows about, such as "to" or "from" for link\r
  data in a <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a>,\r
  you must call the appropriate model methods in order to modify the data property.\r
  Modifying a data property directly without calling the appropriate model method may\r
  cause inconsistencies or undefined behavior.\r
</p>\r
<p>\r
  For node data, the model methods are\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Model.html#setcategoryfornodedata" target="api">Model.setCategoryForNodeData</a></li>\r
  <li><a href="../api/symbols/Model.html#setkeyfornodedata" target="api">Model.setKeyForNodeData</a></li>\r
  <li><a href="../api/symbols/GraphLinksModel.html#setgroupkeyfornodedata" target="api">GraphLinksModel.setGroupKeyForNodeData</a></li>\r
  <li><a href="../api/symbols/TreeModel.html#setparentkeyfornodedata" target="api">TreeModel.setParentKeyForNodeData</a></li>\r
  <li><a href="../api/symbols/TreeModel.html#setparentlinkcategoryfornodedata" target="api">TreeModel.setParentLinkCategoryForNodeData</a></li>\r
</ul>\r
<p>\r
  For link data, the model methods are\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/GraphLinksModel.html#setcategoryforlinkdata" target="api">GraphLinksModel.setCategoryForLinkData</a></li>\r
  <li><a href="../api/symbols/GraphLinksModel.html#setfromkeyforlinkdata" target="api">GraphLinksModel.setFromKeyForLinkData</a></li>\r
  <li><a href="../api/symbols/GraphLinksModel.html#setfromportidforlinkdata" target="api">GraphLinksModel.setFromPortIdForLinkData</a></li>\r
  <li><a href="../api/symbols/GraphLinksModel.html#settokeyforlinkdata" target="api">GraphLinksModel.setToKeyForLinkData</a></li>\r
  <li><a href="../api/symbols/GraphLinksModel.html#settoportidforlinkdata" target="api">GraphLinksModel.setToPortIdForLinkData</a></li>\r
  <li><a href="../api/symbols/GraphLinksModel.html#setlabelkeysforlinkdata" target="api">GraphLinksModel.setLabelKeysForLinkData</a></li>\r
</ul>\r
<p>\r
  This example changes the "to" property of a link data, causing the link to connect to a different node.\r
  This example uses the default Link template, which does not have any relevant data bindings.\r
  The change in the link relationship is accomplished by calling a model method, not via a data binding.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<h2 id="BindingToGraphObjectSources"><a class="not-prose heading-anchor" href="#BindingToGraphObjectSources">Binding to GraphObject sources</a></h2>\r
<p>\r
  Instead of binding to model data, you may want to bind to a property of the\r
  <a href="../api/symbols/Part.html" target="api">Part</a> or a named <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> in the same <a href="../api/symbols/Part.html" target="api">Part</a>.\r
  The source property must be a settable property of the class, and the\r
  binding is evaluated when the property is set to a new value.\r
</p>\r
<p>\r
  One common use of such a binding is to change the appearance of a Part when the <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a>\r
  is changed.\r
  Call <a href="../api/symbols/GraphObject.html#bindobject" target="api">GraphObject.bindObject</a> to cause the Binding to use the object whose <a href="../api/symbols/GraphObject.html#name" target="api">GraphObject.name</a>\r
  is the given name.\r
  Use the empty string, "", or no argument, to refer to the whole Part itself.\r
  This is a convenience so that you do not need to name the whole Part.\r
  "bindObject" really means "from the GraphObject named ...", as found by <a href="../api/symbols/Panel.html#findobject" target="api">Panel.findObject</a> when\r
  there is a string argument.\r
</p>\r
<p>\r
  In the example below, the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> is bound to the <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> property.\r
  When the node is selected or de-selected, the <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> property changes value,\r
  so the binding is evaluated.\r
  The conversion function gets a boolean value and returns the desired brush color\r
  to be used as the shape's fill.\r
  This example also turns off selection adornments, so that the only visual way to tell\r
  that a node is selected is by the shape's fill color.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>\r
  Caution: do not declare cycles of binding dependencies -- that will result in undefined behavior.\r
  <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> binding sources also require the <a href="../api/symbols/Part.html" target="api">Part</a> to be bound to data\r
  (i.e. <a href="../api/symbols/Part.html#data" target="api">Part.data</a> must be non-null).\r
  The property on the GraphObject must be settable, so it does not work on read-only properties\r
  such as ones that return computed values (e.g. <a href="../api/symbols/Part.html#istoplevel" target="api">Part.isTopLevel</a>) or Iterators (e.g. <a href="../api/symbols/Node.html#linksconnected" target="api">Node.linksConnected</a>).\r
</p>\r
\r
<h2 id="BindingToSharedModelDataSource"><a class="not-prose heading-anchor" href="#BindingToSharedModelDataSource">Binding to the shared Model data source</a></h2>\r
\r
<p>\r
  The binding source object may be a third kind of source, besides the <a href="../api/symbols/Panel.html#data" target="api">Panel.data</a> or some <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> within the panel.\r
  It can also be the JavaScript Object that is the shared <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a> object.\r
  This permits binding of Node or Link element properties to shared properties in the model\r
  that will exist and may be modified even though no nodes or links exist in the model.\r
</p>\r
<p>\r
  In the example below, the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> is bound to the "color" property on the\r
  <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a> object.\r
  As you click the button the <code>changeColor</code> function modifies the <code>modelData</code>\r
  object by calling <a href="../api/symbols/Model.html#set" target="api">Model.set</a>.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
\r
<h2 id="TwoWayDataBinding"><a class="not-prose heading-anchor" href="#TwoWayDataBinding">Two-way data binding</a></h2>\r
\r
<p>Two-way data bindings allow us to edit GraphObject properties and automatically save those edits to the model.</p>\r
\r
<p>A conversion function lets us take model data (like a string) and convert it to another type (like a Point), but we might also want to do the reverse,\r
  converting a Point to a string. Two-way bindings allow us to use both a conversion and a back-conversion function. They are declared with <code>bindTwoWay</code>.\r
  The conversion function goes from source (model) to target (diagram) and the back-conversion function goes from target to source.\r
  This is commonly used with <code>"position"</code> or <code>"location"</code> to store a more redable string representation in the model rather than a\r
  <a href="../api/symbols/Point.html" target="api">Point</a>:\r
</p>\r
\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  Two-way bindings make it easy for user interaction, like dragging a Node, or using the the TextEditingTool, to\r
  update the model automatically. Try dragging this node around, or selecting it, clicking on the text, and editing.\r
</p>\r
\r
<!-- CODE_BLOCK_9 -->\r
\r
<h3 id="ReasonsForTwoWayBindings"><a class="not-prose heading-anchor" href="#ReasonsForTwoWayBindings">Reasons for TwoWay Bindings</a></h3>\r
<p>\r
  The basic reason for using a TwoWay <a href="../api/symbols/Binding.html" target="api">Binding</a> on a settable property is to make sure that\r
  any changes to that property will be copied to the corresponding model data.\r
  By making sure that the <a href="../api/symbols/Model.html" target="api">Model</a> is up-to-date, you can easily "save the diagram"\r
  just by saving the model and "loading a diagram" is just a matter of loading a model into memory\r
  and setting <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a>.\r
  If you are careful to only hold JSON-serializable data in the model data,\r
  you can just use the <a href="../api/symbols/Model.html#tojson" target="api">Model.toJson</a> and <a href="../api/symbols/Model.html#fromjson" target="api">Model.fromJson</a> methods for converting a model\r
  to and from a textual representation.\r
</p>\r
<p>\r
  <em>Most bindings do not need to be TwoWay.</em>\r
  For performance reasons you should not make a Binding be TwoWay unless you actually need to propagate\r
  changes back to the data.\r
  Most settable properties are only set on initialization and then never change.\r
</p>\r
<p>\r
  Settable properties only change value when some code sets them.\r
  That code might be in code that you write as part of your app.\r
  Or it might be in a command (see <a href="commands">Commands</a>) or\r
   a tool (see <a href="tools">Tools</a>).\r
   Here is a list of properties for which a TwoWay Binding is\r
  plausible because one of the predefined commands or tools modify them:\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/Part.html#location" target="api">Part.location</a> or <a href="../api/symbols/Part.html#position" target="api">Part.position</a>, by <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a> if it is enabled</li>\r
  <li><a href="../api/symbols/Link.html#points" target="api">Link.points</a>, by <a href="../api/symbols/LinkReshapingTool.html" target="api">LinkReshapingTool</a> if it is enabled</li>\r
  <li><a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>, by <a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a> if it is enabled</li>\r
  <li><a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a>, by <a href="../api/symbols/RotatingTool.html" target="api">RotatingTool</a> if it is enabled</li>\r
  <li><a href="../api/symbols/TextBlock.html#text" target="api">TextBlock.text</a>, by <a href="../api/symbols/TextEditingTool.html" target="api">TextEditingTool</a> if it is enabled</li>\r
  <li><a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a>, by many tools and commands</li>\r
  <li><a href="../api/symbols/Node.html#istreeexpanded" target="api">Node.isTreeExpanded</a> and <a href="../api/symbols/Node.html#wastreeexpanded" target="api">Node.wasTreeExpanded</a>,\r
    by <a href="../api/symbols/CommandHandler.html#collapsetree" target="api">CommandHandler.collapseTree</a> and <a href="../api/symbols/CommandHandler.html#expandtree" target="api">CommandHandler.expandTree</a>,\r
    called by a "TreeExpanderButton"\r
  </li>\r
  <li><a href="../api/symbols/Group.html#issubgraphexpanded" target="api">Group.isSubGraphExpanded</a> and <a href="../api/symbols/Group.html#wassubgraphexpanded" target="api">Group.wasSubGraphExpanded</a>,\r
    by <a href="../api/symbols/CommandHandler.html#collapsesubgraph" target="api">CommandHandler.collapseSubGraph</a> and <a href="../api/symbols/CommandHandler.html#expandsubgraph" target="api">CommandHandler.expandSubGraph</a>,\r
    called by a "SubGraphExpanderButton"\r
  </li>\r
</ul>\r
<p>\r
  You probably will not need a TwoWay binding on any other properties unless you write code to modify them.\r
  And even then it is sometimes better to write the code to modify the model data directly by\r
  calling <a href="../api/symbols/Model.html#set" target="api">Model.set</a>, depending on a OneWay Binding to update the GraphObject property.\r
</p>\r
<p>\r
  It is also possible to use TwoWay Bindings where the source is a GraphObject rather than model data.\r
  This is needed less frequently, when you do <em>not</em> want to have the state stored in the model,\r
  but you do want to synchronize properties of GraphObjects within the same Part.\r
</p>\r
<p>\r
  <em>Use TwoWay Bindings sparingly.</em>\r
</p>\r
\r
<p class="box bg-danger">\r
  You must not have a TwoWay binding on the node data property that is the "key" property.\r
  (That defaults to the name "key" but is actually the value of <a href="../api/symbols/Model.html#nodekeyproperty" target="api">Model.nodeKeyProperty</a>.)\r
  That property value must always be unique among all node data within the model and is known by the Model.\r
  A TwoWay binding might change the value, causing a multitude of problems.\r
  Similarly, the <a href="../api/symbols/Node.html#key" target="api">Node.key</a> property is read-only, to prevent accidental changes of the key value.\r
</p>\r
\r
\r
<h2 id="theming"><a class="not-prose heading-anchor" href="#theming">Theming</a></h2>\r
<p>\r
  The ability to automatically update properties from <a href="../api/symbols/Theme.html" target="api">Theme</a> objects is basically\r
  provided by data binding using a subclass of <a href="../api/symbols/Binding.html" target="api">Binding</a>.\r
  However, theme binding is OneWay only.\r
  Read more about theming at the <a href="theming">learn page on theming</a>.\r
</p>\r
`,codeBlocks:[{id:`simpleModelWithBind`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "palegreen", strokeWidth: 0 })\r
        .bind("fill", "color"),  // Shape.fill ← node.data.color\r
      new go.TextBlock({ margin: 10, font: '16px verdana' })\r
        .bind("text")  // TextBlock.text ← node.data.text\r
    );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha", color: "skyblue" },\r
  { key: 2, text: "Beta", color: "pink" },\r
  { key: 3, text: "Gamma", color: "coral" },\r
  { key: 4, text: "Delta" }, // No color specified in data - uses default value\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!1,minHeight:300,highlight:[5,7],language:`js`,initiallyVisible:!0},{id:`bindLocationPoint`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc")  // get Node.location from the data.loc value\r
    .add(\r
      new go.Shape(),\r
      new go.TextBlock({ margin: 5 })\r
    );\r
\r
const nodeDataArray = [\r
  // for each node specify the location using Point values\r
  { key: 1, text: "Alpha", color: "lightblue", loc: new go.Point(0, 0) },\r
  { key: 2, text: "Beta", color: "pink", loc: new go.Point(100, 50) }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`bindLocationString`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    // Bind the model's "x y" to a go.Point using Point.parse:\r
    .bind("location", "loc", go.Point.parse)\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha", loc: "0 0" },\r
  { key: 2, text: "Beta", loc: "100 50" },\r
  { key: 3, text: "Gamma", loc: "0 100" }\r
]);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`bindHighlight`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        // default values if the data.highlight is undefined:\r
        fill: "white", stroke: "gray", strokeWidth: 2\r
      })\r
        .bind("fill", "highlight", v => v ? "yellow" : "white")\r
        .bind("stroke", "highlight", v => v ? "orange" : "dodgerblue")\r
        .bind("strokeWidth", "highlight", v => v ? 3 : 1),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha", loc: "0 0", highlight: false },\r
  { key: 2, text: "Beta", loc: "100 50", highlight: true },\r
  { key: 3, text: "Gamma", loc: "0 100" }  // highlight undefined: use defaults\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`changeBoundValue`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { locationSpot: go.Spot.Center })\r
    .add(\r
      new go.Shape("RoundedRectangle",\r
        { // default values if the data.highlight is undefined:\r
          fill: "yellow", stroke: "orange", strokeWidth: 2 })\r
        .bind("fill", "highlight", v => v ? "yellowgreen" : "pink")\r
        .bind("stroke", "highlight", v => v ? "seagreen" : "red")\r
        .bind("strokeWidth", "highlight", v => v ? 5 : 1),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.Model([\r
  { text: "Alpha", highlight: false }  // just one node, and no links\r
]);\r
\r
function flash() {\r
  // all model changes should happen in a transaction\r
  diagram.model.commit(m => {\r
    const data = m.nodeDataArray[0];  // get the first node data\r
    m.set(data, "highlight", !data.highlight);\r
  });\r
}\r
function loop() {\r
  setTimeout(() => { flash(); loop(); }, 500);\r
}\r
loop();`,isExecutable:!0,animation:!1,expanded:!0,highlight:[19,20,21,22,23],language:`js`,initiallyVisible:!0},{id:`changeLinkTo`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { locationSpot: go.Spot.Center })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "coral" })\r
        .bind("stroke"),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "Beta", stroke: "dodgerblue" },\r
  { key: 3, text: "Gamma", stroke: "seagreen" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
\r
function switchTo() {\r
  // all model changes should happen in a transaction\r
  diagram.model.commit(m => {\r
    const data = m.linkDataArray[0];  // get the first link data\r
    if (m.getToKeyForLinkData(data) === 2)\r
      m.setToKeyForLinkData(data, 3);\r
    else\r
      m.setToKeyForLinkData(data, 2);\r
  }, "reconnect link");\r
}\r
function loop() {\r
  setTimeout(() => { switchTo(); loop(); }, 1000);\r
}\r
loop();`,isExecutable:!0,animation:!1,highlight:[19,20,21,22,23,24,25,26],language:`js`,initiallyVisible:!0},{id:`bindingElements`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto",\r
    { selectionAdorned: false })  // no blue selection handle!\r
    .add(\r
      new go.Shape("RoundedRectangle", { stroke: "lightgray" })\r
        // bind Shape.fill to Node.isSelected converted to a color\r
        .bindObject("fill", "isSelected",\r
                    sel => sel ? "dodgerblue" : "white"),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text", "description")\r
    );\r
\r
diagram.model = new go.Model([\r
  { description: "Select me!" },\r
  { description: "I turn blue when selected." }\r
]);`,isExecutable:!0,animation:!1,minHeight:300,highlight:[7,8],language:`js`,initiallyVisible:!0},{id:`bindingModel`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle")\r
        .bindModel("fill", "color"),\r
      new go.TextBlock({ margin: 5 })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel({\r
  modelData: {\r
    color: "yellow" // start all nodes yellow\r
  },\r
  nodeDataArray: [\r
    { text: "Alpha" },\r
    { text: "Beta" }\r
  ]\r
});\r
\r
changeColor = () => {\r
  diagram.model.commit(m => {\r
    const oldcolor = m.modelData.color;\r
    const newcolor = (oldcolor === "lightblue" ? "lightgreen" : "lightblue");\r
    m.set(m.modelData, "color", newcolor);\r
  }, "changed shared color");\r
}`,isExecutable:!0,animation:!1,expanded:!0,html:`<button id="changeColorButton" onclick="changeColor()">Change shared color</button>`,highlight:[5,21,22,23,24,25],language:`js`,initiallyVisible:!0},{id:`bindHighlight`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    // store Points as strings, not objects:\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    // Size/Rect/Margin/Spot also have both parse and stringify static functions\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha", loc: "0 0" },\r
  { key: 2, text: "Beta", loc: "100 50" }\r
]);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`bindTwoWay`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { locationSpot: go.Spot.Center })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "dodgerblue" }),\r
      new go.TextBlock({ margin: 5, editable: true, isMultiline: false })\r
        .bindTwoWay("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { text: "Alpha", loc: "50 50" }\r
]);\r
\r
// Every time the model changes, show the user:\r
diagram.model.addChangedListener(() => {\r
  const modelJSON = diagram.model.toJSON();\r
  const formatted = JSON.stringify(JSON.parse(modelJSON), null, 2);\r
  document.getElementById("bindTwoWayData").textContent = formatted;\r
})`,isExecutable:!0,animation:!1,html:`<p>
  The Model, updated on drag or text edit:
</p>
<textarea id="bindTwoWayData" style="width: 100%; height: 200px;"></textarea >`,minHeight:500,highlight:[3,7],language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`9tefrv`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};