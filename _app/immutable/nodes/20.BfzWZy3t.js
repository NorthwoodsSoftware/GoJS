import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Debugging suggestions`,category:`Dev Environment`},htmlContent:`<h1>Debugging suggestions</h1>\r
\r
<p>\r
  Developing a diagramming app involves a lot more than just writing some JavaScript code that uses the GoJS library.\r
</p>\r
<ul>\r
  <li>You will need to be familiar with HTML DOM and CSS.</li>\r
  <li>You will need to test your app on many different devices using many different browsers.</li>\r
  <li>You will need to be familiar with your JavaScript framework (if any).</li>\r
  <li>You will need to know how to use each browser's development facilities, especially the console window and debugger.</li>\r
</ul>\r
\r
<h3 id="UseGoDebugJSLibrary"><a class="not-prose heading-anchor" href="#UseGoDebugJSLibrary">Use the <code>go-debug.js</code> library</a></h3>\r
<p>\r
  While developing your app make sure you use the debug library, <code>go-debug.js</code>, rather than the <code>go.js</code> library.\r
  The debug library does more error checking of property values and method arguments, and it detects more unusual situations.\r
  Most warning and errors will be written to the console window. Always check it for messages. We have tried to make them informative.\r
</p>\r
<p>\r
  For version 3 and later versions of 2.3 we have enhanced the <code>package.json</code> file so that tools that\r
  observe the "development" condition automatically make use of <code>go-debug.js</code> or <code>go-debug.mjs</code>\r
  as appropriate for the module system being used.  Look at the GoJS <code>package.json</code> for details.\r
</p>\r
\r
<h3 id="UseDocumentedAPI"><a class="not-prose heading-anchor" href="#UseDocumentedAPI">Use the documented API</a></h3>\r
<p>\r
  Try to limit your code to only use documented classes, properties, and methods, as listed in the\r
  <a href="../api/index.html" target="api">API</a> reference or in the TypeScript definition file,\r
  <a href="../release/go.d.ts" target="_blank">go.d.ts</a>.\r
</p>\r
<p>\r
  Please do not refer to some minified property name, which will only be one or two letters long.\r
  In another version of the library the minified names will be different, so such code would no longer work.\r
  Basically: never use one or two letter property names\r
  except for "x" and "y" on <a href="../api/symbols/Point.html" target="api">Point</a>, <a href="../api/symbols/Rect.html" target="api">Rect</a>, <a href="../api/symbols/Spot.html" target="api">Spot</a>, and <a href="../api/symbols/LayoutVertex.html" target="api">LayoutVertex</a> instances\r
  and the <a href="../api/symbols/InputEvent.html#up" target="api">InputEvent.up</a> property.\r
</p>\r
<p>\r
  Do not modify the prototypes of any of the GoJS classes.\r
  If you modify the built-in classes, we cannot support you.\r
  The way to modify the behavior of the GoJS classes is via the techniques discussed at\r
  <a href="extensions">Extensions</a>.\r
  However most of the GoJS classes cannot be subclassed and most of the documented methods cannot be overridden.\r
  Generally the <a href="../api/symbols/Tool.html" target="api">Tool</a> and <a href="../api/symbols/Layout.html" target="api">Layout</a> classes and the <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> and <a href="../api/symbols/Link.html" target="api">Link</a> classes may be subclassed;\r
  look at the API documentation to see if a method may be overridden.\r
</p>\r
\r
<h2 id="UsingConsoleWindow"><a class="not-prose heading-anchor" href="#UsingConsoleWindow">Using the console window</a></h2>\r
<p>\r
  First you will need to get a reference to your <a href="../api/symbols/Diagram.html" target="api">Diagram</a> object in the console window or the debugger window.\r
</p>\r
<p>\r
  One way to do that is by remembering it in your code.\r
  You can set a property on the <code>window</code> object to refer to the Diagram that you create.\r
  Many of the samples do this just by leaving out the <code>var</code> declaration:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Alternatively, in the console, if you know the name of the HTML DIV element,\r
  you can call the static function <a href="../api/symbols/Diagram.html#fromdiv" target="api">Diagram.fromDiv</a> to get the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> object:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  If that DIV element is not named, perhaps you have some other way of getting a reference to the DIV element.\r
  That may depend on the framework that you are using.\r
  You can still call <a href="../api/symbols/Diagram.html#fromdiv" target="api">Diagram.fromDiv</a> on that element to get the corresponding Diagram object.\r
</p>\r
<p>\r
  Then in the console you can use the <code>myDiagram</code> reference to the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> object.  Some examples:\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  The code that you execute in the console can be more complicated too.\r
  For example, you can find, select, and scroll to a particular node:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  If you don't know the key for the node that you want to see in the viewport,\r
  perhaps you know how to find the node data object in the model.\r
  The <a href="../api/symbols/Diagram.html#findnodesbyexample" target="api">Diagram.findNodesByExample</a> method might also be useful.\r
</p>\r
\r
<h3 id="ExaminingSelectedNode"><a class="not-prose heading-anchor" href="#ExaminingSelectedNode">Examining a selected Node</a></h3>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  returns the first selected <a href="../api/symbols/Part.html" target="api">Part</a>, which might be either a <a href="../api/symbols/Node.html" target="api">Node</a>, a <a href="../api/symbols/Link.html" target="api">Link</a>,\r
  or null if nothing is selected.\r
</p>\r
<p>\r
  If you remember the selected Node or Link, you can then examine it further more easily. For example:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  You could also look at other properties of the Node and call its methods.  For example:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  As another example, you can print out all of the nodes the selected node is connected to:\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
<p>\r
  You can find more examples of iterating at <a href="collections#MoreIterationExamples">Collections</a>\r
</p>\r
<p>\r
  You can also look at the structure of the visual tree of a node.  With this recursive function:\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  you could call\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>\r
  and in the Org Chart sample get results such as:\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
<p>\r
  So you can see how the Node is a panel composed of Shape surrounding a nested Table Panel,\r
  which in turn is composed of two TextBlocks and a Picture.\r
</p>\r
\r
<h2 id="DebuggingNodePanelDesigns"><a class="not-prose heading-anchor" href="#DebuggingNodePanelDesigns">Debugging Node designs</a></h2>\r
<p>\r
  When building your own node template, there may be times when the objects in the node are not sized and positioned the way that you would like.\r
  It is important that you understand how objects may be assembled within panels.  You will want to re-read:\r
</p>\r
<ul>\r
  <li><a href="buildingObjects">Building with GraphObjects</a></li>\r
  <li><a href="textBlocks">TextBlocks</a></li>\r
  <li><a href="shapes">Shapes</a></li>\r
  <li><a href="pictures">Pictures</a></li>\r
  <li><a href="panels">Panels</a></li>\r
  <li><a href="tablePanels">Table Panels</a></li>\r
  <li><a href="sizing">Sizing of GraphObjects</a></li>\r
</ul>\r
\r
<p>\r
  Say that you want a node consisting of two TextBlocks, one above the other, spaced nicely.\r
  You might start off with:\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
\r
<p>\r
  But wait -- you want the node to be a fixed size.  So you set the node's width and height:\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
\r
<p>\r
  That looks better, but you are surprised that both TextBlocks are near the center.  Why is that?\r
  For debugging purposes let's change the <a href="../api/symbols/GraphObject.html#background" target="api">GraphObject.background</a> colors of each TextBlock and the nested Panel.\r
</p>\r
<!-- CODE_BLOCK_13 -->\r
<p>\r
  It is now clear that the TextBlocks are no bigger than they need to be to hold the text,\r
  and that the Panel is also no bigger than need be to hold the two TextBlocks.\r
</p>\r
\r
<p>\r
  So you think that you just need to <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> the panel.\r
</p>\r
<!-- CODE_BLOCK_14 -->\r
<p>\r
  The Panel with the red background indeed fills up the whole outer Auto Panel,\r
  inside its main Shape acting as a border.\r
  But the lime green and cyan blue TextBlocks are still only their natural heights.\r
</p>\r
\r
<p>\r
  If you want the text to be spaced evenly vertically,\r
  you might think you only need to stretch those two TextBlocks.\r
</p>\r
<!-- CODE_BLOCK_15 -->\r
<p>\r
  Now the TextBlocks are stretching horizontally but not vertically!\r
  The reason is that a Vertical Panel never stretches its elements vertically.\r
  It always stacks its elements on top of each other with their natural heights.\r
  When a Vertical Panel is taller than the stack of its elements, there is extra space at the bottom.\r
  (Similarly, a Horizontal Panel never stretches its elements horizontally.)\r
</p>\r
\r
<p>\r
  Instead of a Vertical Panel we should use a Table Panel.\r
  This requires assigning the <a href="../api/symbols/GraphObject.html#row" target="api">GraphObject.row</a> on each element (i.e. each TextBlock).\r
</p>\r
<!-- CODE_BLOCK_16 -->\r
<p>\r
  Because by default elements are centered within the cells of a Table Panel, no stretching of the TextBlocks is needed.\r
  (You could change that by setting <a href="../api/symbols/Panel.html#defaultalignment" target="api">Panel.defaultAlignment</a> or <a href="../api/symbols/Panel.html#defaultstretch" target="api">Panel.defaultStretch</a>.)\r
</p>\r
\r
<p>\r
  Are we all done?  Maybe.  What happens when the text changes size?\r
  One way to test that is to create a bunch of nodes using different model data, using short and long strings.\r
</p>\r
<p>\r
  But to demonstrate one more debugging technique, we'll make the Node <a href="../api/symbols/Part.html#resizable" target="api">Part.resizable</a>.\r
  You can interactively resize the node (the whole node because we haven't set <a href="../api/symbols/Part.html#resizeobjectname" target="api">Part.resizeObjectName</a>)\r
  so you can see how the nested Panel and the TextBlocks handle constrained sizing.\r
</p>\r
<!-- CODE_BLOCK_17 -->\r
<p>\r
  Note how when the node becomes narrow, it clips the text rather than make the text wrap.\r
  Let's say that you would rather that the text wrap.\r
</p>\r
\r
<p>\r
  This can be implemented by stretching the TextBlocks horizontally, which will define their widths, forcing the text to wrap.\r
  But text normally is drawn at the left side of the bounds of the TextBlock when the text direction is left-to-right.\r
  If you want each TextBlock to be centered within its bounds, you'll need to set <a href="../api/symbols/TextBlock.html#textalign" target="api">TextBlock.textAlign</a> to "center".\r
</p>\r
<!-- CODE_BLOCK_18 -->\r
<p>\r
  The TextBlocks can be seen to stretch across the width of the available area.\r
  Note how the text wraps as the node becomes narrow, causing the TextBlocks to become more narrow.\r
  Of course when there's not enough room to render all of the text, the TextBlocks will be clipped.\r
</p>\r
\r
<p>\r
  Now we just need to get rid of the colored backgrounds and resizable-ness used for debugging\r
  and assign the desired colors and fonts.\r
</p>\r
<!-- CODE_BLOCK_19 -->\r
`,codeBlocks:[{id:null,code:`myDiagram = new go.Diagram("myDiagramDiv", . . .);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram = go.Diagram.fromDiv("myDiagramDiv");`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.nodes.count; // returns the number of Nodes in the Diagram.\r
myDiagram.links.count; // returns the number of Links.\r
myDiagram.model.nodeDataArray[0]; // returns the first node data object in the diagram's model's Model.nodeDataArray.\r
myDiagram.layoutDiagram(true); // forces all layouts to happen, rearranging the nodes and routing the links.`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myNode = myDiagram.findNodeForKey("Omega");\r
myNode.isSelected = true;\r
myDiagram.commandHandler.scrollToPart(myNode); // scrolls to myNode`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myDiagram.selection.first()`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myNode = myDiagram.selection.first(); // get a reference to the first selected Part\r
myNode.data.key // inspect its data.key\r
myNode.data // or look at the whole data object`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myNode.location // returns a Point whose properties the debugger may show\r
myNode.location.toString(); // More readable Point`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`myNode.findNodesOutOf().each(n => console.log(n.data.key))`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`function walk(x, level, index) {\r
  console.log(level + "," + index + ": " + x.toString());\r
  if (!(x instanceof go.Panel)) return;\r
  for (let i = 0; i < x.elements.count; i++) walk(x.elt(i), level + 1, i);\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`walk(myNode, 0, 0)`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`0,0: Node#653(Kensaku Tamaki)\r
1,0: Shape(Rectangle)#656\r
1,1: Panel(Table)#657\r
2,0: TextBlock("Kensaku Tamaki")\r
2,1: Picture(https://nwoods.com/go/Flags/japan-flag.Png)#664\r
2,2: TextBlock("Title: Vice Chairman"...)`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`first`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Vertical", { margin: 3 })\r
        .add(\r
          new go.TextBlock()\r
            .bind("text", "t1"),\r
          new go.TextBlock()\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top", t2: "Bottom"}]);`,isExecutable:!0,animation:!1,minHeight:265,language:`js`,initiallyVisible:!0},{id:`second`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100 })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Vertical", { margin: 3 })\r
        .add(\r
          new go.TextBlock()\r
            .bind("text", "t1"),\r
          new go.TextBlock()\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top", t2: "Bottom"}]);`,isExecutable:!0,animation:!1,minHeight:265,language:`js`,initiallyVisible:!0},{id:`third`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100 })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Vertical", { margin: 3, background: "red" })\r
        .add(\r
          new go.TextBlock({ background: "lime" })\r
            .bind("text", "t1"),\r
          new go.TextBlock({ background: "cyan" })\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model( [{ t1: "Top", t2: "Bottom"}]);`,isExecutable:!0,animation:!1,minHeight:265,language:`js`,initiallyVisible:!0},{id:`fourth`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100 })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Vertical", { margin: 3, stretch: go.Stretch.Fill, background: "red" })\r
        .add(\r
          new go.TextBlock({ background: "lime" })\r
            .bind("text", "t1"),\r
          new go.TextBlock({ background: "cyan" })\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top", t2: "Bottom"}]);`,isExecutable:!0,animation:!1,minHeight:265,language:`js`,initiallyVisible:!0},{id:`fifth`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100 })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Vertical", { margin: 3, stretch: go.Stretch.Fill, background: "red" })\r
        .add(\r
          new go.TextBlock({ stretch: go.Stretch.Fill, background: "lime" })\r
            .bind("text", "t1"),\r
          new go.TextBlock({ stretch: go.Stretch.Fill, background: "cyan" })\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top", t2: "Bottom"}]);`,isExecutable:!0,animation:!1,minHeight:265,language:`js`,initiallyVisible:!0},{id:`sixth`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100 })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Table", { margin: 3, stretch: go.Stretch.Fill, background: "red" })\r
        .add(\r
          new go.TextBlock({ row: 0, background: "lime" })\r
            .bind("text", "t1"),\r
          new go.TextBlock({ row: 1, background: "cyan" })\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top", t2: "Bottom"}]);`,isExecutable:!0,animation:!1,minHeight:265,language:`js`,initiallyVisible:!0},{id:`seventh`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100, resizable: true })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Table", { margin: 3, stretch: go.Stretch.Fill, background: "red" })\r
        .add(\r
          new go.TextBlock({ row: 0, background: "lime" })\r
            .bind("text", "t1"),\r
          new go.TextBlock({ row: 1, background: "cyan" })\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top String", t2: "Bottom String"}]);\r
diagram.findNodeForData(diagram.model.nodeDataArray[0]).isSelected = true;`,isExecutable:!0,animation:!1,minHeight:285,language:`js`,initiallyVisible:!0},{id:`eighth`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100, resizable: true })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Table", { margin: 3, background: "red",\r
        stretch: go.Stretch.Fill,\r
        defaultStretch: go.Stretch.Horizontal\r
      })\r
        .add(\r
          new go.TextBlock({ row: 0, background: "lime" })\r
            .bind("text", "t1"),\r
          new go.TextBlock({ row: 1, background: "cyan" })\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top String", t2: "Bottom String"}]);\r
diagram.findNodeForData(diagram.model.nodeDataArray[0]).isSelected = true;`,isExecutable:!0,animation:!1,minHeight:350,language:`js`,initiallyVisible:!0},{id:`ninth`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 80, height: 100 })\r
    .add(\r
      new go.Shape({ fill: "white" }),\r
      new go.Panel("Table", { margin: 3, background: "tan",\r
        stretch: go.Stretch.Fill,\r
        defaultStretch: go.Stretch.Horizontal\r
      })\r
        .add(\r
          new go.TextBlock({ row: 0, textAlign: "center", font: "bold 11pt serif" })\r
            .bind("text", "t1"),\r
          new go.TextBlock({ row: 1, textAlign: "center", font: "bold 11pt tahoma" })\r
            .bind("text", "t2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([{ t1: "Top String", t2: "Bottom String"}]);`,isExecutable:!0,animation:!1,minHeight:350,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`36qwca`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};