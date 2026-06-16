import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Validation`},htmlContent:`<h1>Validation</h1>\r
<p>\r
  Some operations require more sophisticated controls than the binary permission flags discussed in\r
  the previous <a href="permissions">section</a>.\r
  When the user tries to draw a new link or reconnect an existing link, your application may want\r
  to restrict which links may be made, depending on the data.\r
  When the user tries to add a node to a group, your application may want to control whether it is\r
  permitted for that particular node in that particular group.\r
  When the user edits some text, your application may want to limit the kinds of strings that they enter.\r
</p>\r
<p>\r
  Although not exactly "validation", you can also limit how users drag (move or copy) parts by setting several properties\r
  on <a href="../api/symbols/Part.html" target="api">Part</a> and customizing the <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>.\r
</p>\r
\r
<h2 id="LinkingValidation"><a class="not-prose heading-anchor" href="#LinkingValidation">Linking validation</a></h2>\r
<p>\r
  There are a number of <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> properties that let you control what links the user may draw or reconnect.\r
  These properties apply to each port element and affect the links that may connect with that port.\r
</p>\r
\r
<h3 id="LinkableProperties"><a class="not-prose heading-anchor" href="#LinkableProperties">Linkable properties</a></h3>\r
<p>\r
  The primary properties are <a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a> and <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a>.\r
  If you do not have a <a href="../api/symbols/Node.html" target="api">Node</a> containing an element with fromLinkable: true and another node with toLinkable: true,\r
  the user will not be able to draw a new link between the nodes.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  Mouse down on one of the "From" nodes (the cursor changes to a "pointer") and drag to start drawing a new link.\r
  Note how the only permitted links are those going from a "From" node to a "To" node.\r
  This is true even if you start the linking gesture on a "To" node.\r
</p>\r
\r
<h3 id="SpanOfLinkableProperties"><a class="not-prose heading-anchor" href="#SpanOfLinkableProperties">Span of linkable properties</a></h3>\r
<p>\r
  Because the <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> in the above example is not declared to be a port\r
  (i.e. there is no value for <a href="../api/symbols/GraphObject.html#portid" target="api">GraphObject.portId</a>),\r
  mouse events on the TextBlock do not start the <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a>.\r
  This allows users the ability to select and move the node as well as any number of other operations.\r
</p>\r
<p>\r
  You can certainly declare a <a href="../api/symbols/Panel.html" target="api">Panel</a> to have <a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a> or <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a> be true.\r
  This will cause all elements inside that panel to behave as part of the port, including starting a linking operation.\r
  Sometimes you will want to make the whole <a href="../api/symbols/Node.html" target="api">Node</a> linkable.\r
  If you still want the user to be able to select and drag the node, you will need to make some easy-to-click elements\r
  not-"linkable" within the node.\r
  You can do that by explicitly setting <a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a> and/or <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a> to false.\r
  The default value for those two properties is null, which means the "linkable"-ness is inherited from the containing panel.\r
</p>\r
\r
<h2 id="OtherLinkingPermissionProperties"><a class="not-prose heading-anchor" href="#OtherLinkingPermissionProperties">Other linking permission properties</a></h2>\r
<p>\r
  Just because you have set <a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a> and <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a> to true on the desired port\r
  objects does not mean that you want to allow users to create a link from every such port/node to every other port/node.\r
  There are other <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> properties governing linkability for both the "from" and the "to" ends.\r
</p>\r
\r
<h3 id="LinkableDuplicatesProperties"><a class="not-prose heading-anchor" href="#LinkableDuplicatesProperties">LinkableDuplicates properties</a></h3>\r
<p>\r
  One restriction that you may have noticed before is that the user cannot draw a second link between the same pair of nodes\r
  in the same direction.\r
  This example sets <a href="../api/symbols/GraphObject.html#fromlinkableduplicates" target="api">GraphObject.fromLinkableDuplicates</a> and <a href="../api/symbols/GraphObject.html#tolinkableduplicates" target="api">GraphObject.toLinkableDuplicates</a> to true,\r
  in order to permit such duplicate links between nodes.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  Now try drawing more links between "From" and "To" nodes.\r
  You can see how the links are automatically spread apart.\r
  Try dragging one of the nodes to see what happens with the link routing.\r
  A similar effect occurs also when the link's <a href="../api/symbols/Link.html#curve" target="api">Link.curve</a> is <a href="../api/symbols/Curve.html#bezier" target="api">Curve.Bezier</a>.\r
</p>\r
\r
<h3 id="LinkableSelfNodeProperties"><a class="not-prose heading-anchor" href="#LinkableSelfNodeProperties">LinkableSelfNode properties</a></h3>\r
<p>\r
  Another standard restriction is that the user cannot draw a link from a node to itself.\r
  Again it is easy to remove that restriction: just set <a href="../api/symbols/GraphObject.html#fromlinkableselfnode" target="api">GraphObject.fromLinkableSelfNode</a> and <a href="../api/symbols/GraphObject.html#tolinkableselfnode" target="api">GraphObject.toLinkableSelfNode</a> to true.\r
  Note though that each node has to be both <a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a> and <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a>.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  To draw a reflexive link, start drawing a new link but stay near the node when you release the mouse button.\r
  This example also sets the "...Duplicates" properties to true, so that you can draw multiple reflexive links.\r
</p>\r
\r
<p>\r
  In these examples there is only one port per node.\r
  When there are multiple ports in a node, the restrictions actually apply per port, not per node.\r
  But the restrictions of the "...LinkableSelfNode" properties do span the whole node,\r
  so they must be applied to both ports within a node for a link to connect to its own node.\r
</p>\r
\r
<h3 id="MaxLinksProperties"><a class="not-prose heading-anchor" href="#MaxLinksProperties">MaxLinks properties</a></h3>\r
<p>\r
  The final linking restriction properties control how many links may connect to a node/port.\r
  This example sets the <a href="../api/symbols/GraphObject.html#tomaxlinks" target="api">GraphObject.toMaxLinks</a> property to 2, even though <a href="../api/symbols/GraphObject.html#tolinkableduplicates" target="api">GraphObject.toLinkableDuplicates</a> is true,\r
  to limit how many links may go into "to" nodes.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  This example has no limit on the number of links that may come out of "from" nodes.\r
</p>\r
<p>\r
  If this property is set, it is most commonly set to one. Of course it should depend on the nature of the application.\r
</p>\r
<p>\r
  Note that the <a href="../api/symbols/GraphObject.html#tomaxlinks" target="api">GraphObject.toMaxLinks</a> and <a href="../api/symbols/GraphObject.html#frommaxlinks" target="api">GraphObject.fromMaxLinks</a> properties are independent of each other.\r
  If you want to control the total number of links connecting with a port, not only "to" or "from" but both directions,\r
  then you cannot use those two properties and instead must implement your own link validation predicate, as discussed below.\r
</p>\r
\r
<h2 id="CyclesInGraphs"><a class="not-prose heading-anchor" href="#CyclesInGraphs">Cycles in graphs</a></h2>\r
<p>\r
  If you want to make sure that the graph structure that your users create never have any cycles of links,\r
  or that the graph is always tree-structured, GoJS makes that easy to enforce.\r
  Just set <a href="../api/symbols/Diagram.html#validcycle" target="api">Diagram.validCycle</a> to <a href="../api/symbols/CycleMode.html#notdirected" target="api">CycleMode.NotDirected</a> or <a href="../api/symbols/CycleMode.html#destinationtree" target="api">CycleMode.DestinationTree</a>.\r
  The default value is <a href="../api/symbols/CycleMode.html#all" target="api">CycleMode.All</a>, which imposes no restrictions -- all kinds of link cycles are allowed.\r
</p>\r
<p>\r
  This example has nodes that allow links both to and from each node.\r
  However the assignment of <a href="../api/symbols/Diagram.html#validcycle" target="api">Diagram.validCycle</a> will prevent the user from drawing a\r
  second incoming link to any node and also ensures that the user draw no cycles in the graph.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  As you draw more links you can see how the set of potential linking destinations keeps getting smaller.\r
</p>\r
\r
<h2 id="GeneralLinkingValidation"><a class="not-prose heading-anchor" href="#GeneralLinkingValidation">General linking validation</a></h2>\r
<p>\r
  It may be the case that the semantics of your application will cause the set of valid link destinations to depend on\r
  the node data (i.e. at the node and port at which the link started from and at the possible destination node/port)\r
  in a manner that can only be implemented using code: a predicate function.\r
</p>\r
<p>\r
  You can implement such domain-specific validation by setting <a href="../api/symbols/LinkingBaseTool.html#linkvalidation" target="api">LinkingBaseTool.linkValidation</a> or <a href="../api/symbols/Node.html#linkvalidation" target="api">Node.linkValidation</a>.\r
  These predicates, if supplied, are called for each pair of ports that the linking tool considers.\r
  If the predicate returns false, the link may not be made.\r
  Setting the property on the <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a> or <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a> causes the predicate to be applied to all linking operations,\r
  whereas setting the property on the <a href="../api/symbols/Node.html" target="api">Node</a> only applies to linking operations involving that node.\r
  The predicates are called only if all of the standard link checks pass, based on the properties discussed above.\r
</p>\r
<p>\r
  In this example there are nodes of three different colors.\r
  The <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a> and <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a> are customized to use a function, <code>sameColor</code>,\r
  to make sure the links only connect nodes of the same color.\r
  Mouse-down and drag on the ellipses (where the cursor changes to a "pointer") to start drawing a new link.\r
  You will see that the only permitted link destinations are nodes of the same color that do not already\r
  have a link to it from the same node.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  To emphasize the color restriction, links have their colors bound to the "from" node data.\r
</p>\r
\r
<h3 id="Limitingtotalnumberoflinksconnectingwithanode"><a class="not-prose heading-anchor" href="#Limitingtotalnumberoflinksconnectingwithanode">Limiting total number of links connecting with a node</a></h3>\r
<p>\r
  One can limit the number of links coming into a port by setting <a href="../api/symbols/GraphObject.html#tomaxlinks" target="api">GraphObject.toMaxLinks</a>.\r
  Similarly, one can limit the number of links coming out of a port by setting <a href="../api/symbols/GraphObject.html#frommaxlinks" target="api">GraphObject.fromMaxLinks</a>.\r
  But what if you want to limit the total number of links connecting with a port regardless of whether they are\r
  coming into or going out of a port?\r
  Such constraints can only be implemented by a link validation predicate.\r
</p>\r
<p>\r
  When wanting to limit the total number of links in either direction, connecting with each port,\r
  one can use this <a href="../api/symbols/Node.html#linkvalidation" target="api">Node.linkValidation</a> predicate:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  When wanting to limit the total number of links in either direction, connecting with a node for all of its ports,\r
  one can use this <a href="../api/symbols/Node.html#linkvalidation" target="api">Node.linkValidation</a> predicate:\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
<h2 id="GroupingValidation"><a class="not-prose heading-anchor" href="#GroupingValidation">Grouping validation</a></h2>\r
<p>\r
  When you want to limit the kinds of nodes that the user may add to a particular group, you can implement a predicate as the\r
  <a href="../api/symbols/CommandHandler.html#membervalidation" target="api">CommandHandler.memberValidation</a> or <a href="../api/symbols/Group.html#membervalidation" target="api">Group.memberValidation</a> property.\r
  Setting the property on the <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> causes the predicate to be applied to all Groups,\r
  whereas setting the property on the <a href="../api/symbols/Group.html" target="api">Group</a> only applies to that group.\r
</p>\r
<p>\r
  In this example the <code>samePrefix</code> predicate is used to determine if a Node may be dropped into a Group.\r
  Try dragging the simple textual nodes on the left side into either of the groups on the right side.\r
  Only when dropping the node onto a group that is highlit "green" will the node be added as a member of the group.\r
  You can verify that by moving the group to see if the textual node moves too.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  These groups are fixed size groups -- they do not use <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a>s.\r
  So when a node is dropped into them the group does not automatically resize itself to surround its member nodes.\r
  But that is also a benefit when dragging a node out of a group.\r
</p>\r
<p>\r
  The validation predicate is also called when dragging a node that is already a member of a group.\r
  You can see how it is acceptable to drop the node into its existing containing group.\r
  And when it is dragged outside of the group into the diagram's background, the predicate is called with null as the "group" argument.\r
</p>\r
<p>\r
  In this example it is always OK to drop a node in the background of the diagram rather than into a group.\r
  If you want to disallow dropping in the background, you can call <code>myDiagram.currentTool.doCancel()</code> in\r
  the <a href="../api/symbols/Diagram.html#mousedrop" target="api">Diagram.mouseDrop</a> event handler.\r
  If you want to show feedback during the drag in the background, you can implement a <a href="../api/symbols/Diagram.html#mousedragover" target="api">Diagram.mouseDragOver</a>\r
  event handler that sets <code>myDiagram.currentCursor = "not-allowed"</code>.\r
  This would be behavior similar to that implemented above when dragging inside a Group.\r
</p>\r
\r
<h2 id="TextEditingValidation"><a class="not-prose heading-anchor" href="#TextEditingValidation">Text editing validation</a></h2>\r
<p>\r
  You can also limit what text the user enters when they do in-place text editing of a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>.\r
  First, to enable any editing at all, you will need to set <a href="../api/symbols/TextBlock.html#editable" target="api">TextBlock.editable</a> to true.\r
  There may be many TextBlocks within a Part, but you might want to limit text editing to particular TextBlocks.\r
</p>\r
<p>\r
  Normally there is no limitation on what text the user may enter.\r
  If you want to provide a predicate to approve the input when the user finishes editing, set the <a href="../api/symbols/TextEditingTool.html#textvalidation" target="api">TextEditingTool.textValidation</a>\r
  or <a href="../api/symbols/TextBlock.html#textvalidation" target="api">TextBlock.textValidation</a> property.\r
  Setting the property on the <a href="../api/symbols/TextEditingTool.html" target="api">TextEditingTool</a> causes the predicate to be applied to the editing of all TextBlocks,\r
  whereas setting the property on the <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> only applies to that object's text.\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>\r
  Note how editing the top TextBlock has no validation,\r
  but the bottom one won't accept input containing non-numbers and instead leaves the text editor open.\r
</p>\r
<p>\r
  If you want to execute code after a text edit completes, implement a "TextEdited" <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listener.\r
</p>\r
\r
<h3 id="ShowingTextEditingErrorMessage"><a class="not-prose heading-anchor" href="#ShowingTextEditingErrorMessage">Showing a text editing error message</a></h3>\r
<p>\r
  If you would like to show a custom error message when text validation fails, one way is to show a tooltip <a href="../api/symbols/Adornment.html" target="api">Adornment</a>.\r
  Here is an example where a valid string must follow the password requirements.\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
<p>\r
  Try editing the text of a node by twice clicking on some text.\r
  If the string does not follow the password requirements, it will show an error message describing the requirements.\r
</p>\r
`,codeBlocks:[{id:`linkable`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { portId: "", cursor: "pointer", width: 55, height: 35 })\r
        .bind("fromLinkable", "from")\r
        .bind("toLinkable", "to")\r
        .bind("fill", "color"),\r
      new go.TextBlock({ stroke: "white" })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "From", color: "#B20D30", loc: "0 0", from: true },\r
  { key: 2, text: "From", color: "#B20D30", loc: "0 100", from: true },\r
  { key: 3, text: "To", color: "#C17817", loc: "150 0", to: true },\r
  { key: 4, text: "To", color: "#C17817", loc: "150 100", to: true }\r
], [\r
  // initially no links\r
]);`,isExecutable:!0,animation:!1,minHeight:383,language:`js`,initiallyVisible:!0},{id:`linkableDuplicates`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { portId: "", cursor: "pointer", width: 55, height: 35,\r
        fromLinkableDuplicates: true,\r
        toLinkableDuplicates: true\r
      })\r
        .bind("fromLinkable", "from")\r
        .bind("toLinkable", "to")\r
        .bind("fill", "color"),\r
      new go.TextBlock({ stroke: "white" })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "From", color: "#B20D30", loc: "0 0", from: true },\r
  { key: 2, text: "From", color: "#B20D30", loc: "0 100", from: true },\r
  { key: 3, text: "To", color: "#C17817", loc: "150 0", to: true },\r
  { key: 4, text: "To", color: "#C17817", loc: "150 100", to: true }\r
], [\r
  { from: 1, to: 3 },\r
  { from: 2, to: 4 }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`linkableSelfNodes`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot")\r
    .add(\r
      new go.Shape("Circle", { portId: "", cursor: "pointer", fill: "#0a0a0a", \r
        fromLinkable: true,\r
        toLinkable: true,\r
        fromLinkableDuplicates: true,\r
        toLinkableDuplicates: true,\r
        fromLinkableSelfNode: true,\r
        toLinkableSelfNode: true\r
      }),\r
      new go.Shape("Circle", { width: 30, height: 30, fill: "#c0392b", stroke: "#7e1f15",  }),\r
      new go.Shape("Circle", { width: 4, height: 4, strokeWidth: 0 })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([ { key: "Node1" } ], []);`,isExecutable:!0,animation:!1,minHeight:300,language:`js`,initiallyVisible:!0},{id:`linkableMax`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { portId: "", cursor: "pointer", width: 55, height: 35,\r
        fromLinkableDuplicates: true,\r
        toLinkableDuplicates: true,\r
        toMaxLinks: 2 // at most TWO links can come into this node\r
      })\r
        .bind("fromLinkable", "from")\r
        .bind("toLinkable", "to")\r
        .bind("fill", "color"),\r
      new go.TextBlock({ stroke: "white" })\r
        .bind("text")\r
    );\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "From", color: "#B20D30", loc: "0 0", from: true },\r
  { key: 2, text: "From", color: "#B20D30", loc: "0 100", from: true },\r
  { key: 3, text: "To", color: "#C17817", loc: "150 0", to: true },\r
  { key: 4, text: "To", color: "#C17817", loc: "150 100", to: true }\r
], [\r
  { from: 1, to: 3 },\r
  { from: 2, to: 4 }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`tree`,code:`// only allow links that maintain tree-structure\r
diagram.validCycle = go.CycleMode.DestinationTree;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { cursor: "pointer", portId: "", width: 55, height: 35,\r
        fromLinkable: true,\r
        toLinkable: true\r
      })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ stroke: "white" })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Red", color: "#B20D30" }, { key: 2, text: "Blue", color: "#3F84E5" },\r
  { key: 3, text: "Green", color: "#3F784C" }, { key: 4, text: "Green", color: "#3F784C" },\r
  { key: 5, text: "Red", color: "#B20D30" }, { key: 6, text: "Blue", color: "#3F84E5" },\r
  { key: 7, text: "Red", color: "#B20D30" }, { key: 8, text: "Green", color: "#3F784C" },\r
  { key: 9, text: "Blue", color: "#3F84E5" }\r
], [\r
  // initially no links\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`linking`,code:`// this predicate is true if both nodes have the same color\r
function sameColor(fromnode, fromport, tonode, toport) {\r
  return fromnode.data.color === tonode.data.color;\r
  // this could look at the fromport.fill and toport.fill instead,\r
  // assuming that the ports are Shapes, which they are because portID was set on them,\r
  // and that there is a data Binding on the Shape.fill\r
}\r
\r
// only allow new links between ports of the same color\r
diagram.toolManager.linkingTool.linkValidation = sameColor;\r
\r
// only allow reconnecting an existing link to a port of the same color\r
diagram.toolManager.relinkingTool.linkValidation = sameColor;\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { cursor: "pointer", portId: "", width: 55, height: 35,\r
        fromLinkable: true,\r
        toLinkable: true\r
      })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ stroke: "white" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ curve: go.Curve.Bezier, relinkableFrom: true, relinkableTo: true })\r
    .add(\r
      new go.Shape({ strokeWidth: 2 })\r
        .bindObject("stroke", "fromNode", n => n.data.color),\r
      new go.Shape({ toArrow: "Standard", stroke: null })\r
        .bindObject("fill", "fromNode", n => n.data.color)\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Red", color: "#B20D30" }, { key: 2, text: "Blue", color: "#3F84E5" },\r
  { key: 3, text: "Green", color: "#3F784C" }, { key: 4, text: "Green", color: "#3F784C" },\r
  { key: 5, text: "Red", color: "#B20D30" }, { key: 6, text: "Blue", color: "#3F84E5" },\r
  { key: 7, text: "Red", color: "#B20D30" }, { key: 8, text: "Green", color: "#3F784C" },\r
  { key: 9, text: "Blue", color: "#3F84E5" }\r
], [\r
  // initially no links\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Node({\r
  linkValidation: (fromnode, fromport, tonode, toport) => {\r
    // total number of links connecting with a port is limited to 1:\r
    return fromnode.findLinksConnected(fromport.portId).count + tonode.findLinksConnected(toport.portId).count < 1;\r
  }\r
})`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Node({\r
  linkValidation: (fromnode, fromport, tonode, toport) => {\r
    // total number of links connecting with all ports of a node is limited to 1:\r
    return fromnode.linksConnected.count + tonode.linksConnected.count < 1;\r
  }\r
})`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`grouping`,code:`// this predicate is true if both node data keys start with the same letter\r
function samePrefix(group, node) {\r
  if (group === null) return true;  // when maybe dropping a node in the background\r
  if (node instanceof go.Group) return false;  // don't add Groups to Groups\r
  return group.data.key.charAt(0) === node.data.key.charAt(0);\r
};\r
\r
diagram.groupTemplate =\r
  new go.Group("Vertical", {\r
    layerName: "Background", // make sure all Groups are behind all regular Nodes\r
    memberValidation: samePrefix, // only allow simple nodes that have the same data key prefix\r
    handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links\r
    // support highlighting of Groups when allowing a drop to add a member\r
    mouseDragEnter: (e, grp, prev) => {\r
      // this will call samePrefix; it is true if any node has the same key prefix\r
      if (grp.canAddMembers(grp.diagram.selection)) {\r
        const shape = grp.findObject("SHAPE");\r
        if (shape) shape.fill = "#0A9A1D44";\r
        grp.diagram.currentCursor = "";\r
      } else {\r
        const shape = grp.findObject("SHAPE");\r
        if (shape) shape.fill = "#D80B0B44";\r
        grp.diagram.currentCursor = "not-allowed";\r
      }\r
    },\r
    mouseDragLeave: (e, grp, next) => {\r
      const shape = grp.findObject("SHAPE");\r
      if (shape) shape.fill = "#9264D044";\r
      grp.diagram.currentCursor = "";\r
    },\r
    // actually add permitted new members when a drop occurs\r
    mouseDrop: (e, grp) => {\r
      if (grp.canAddMembers(grp.diagram.selection)) {\r
        // this will only add nodes with the same key prefix\r
        grp.addMembers(grp.diagram.selection, true);\r
      } else {  // and otherwise cancel the drop\r
        grp.diagram.currentTool.doCancel();\r
      }\r
    }\r
  })\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.TextBlock({ alignment: go.Spot.Left, font: "Bold 12pt Sans-Serif" })\r
        .bind("text", "key"),\r
      new go.Shape({ name: "SHAPE", width: 130, height: 130, fill: "#9264D044" })\r
    );\r
\r
diagram.mouseDrop = e => {\r
  // dropping in diagram background removes nodes from any group\r
  diagram.commandHandler.addTopLevelParts(diagram.selection, true);\r
};\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { width: 55, height: 35, fill: "#9F86C0" })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ stroke: "white" })\r
        .bind("text", "key")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "A group", isGroup: true, loc: "100 0" },\r
  { key: "B group", isGroup: true, loc: "100 160" },\r
  { key: "A", loc: "10 0" }, // can be added to "A" group\r
  { key: "Apple", loc: "10 40" },\r
  { key: "Alpha", loc: "10 80" },\r
  { key: "B", loc: "10 120" }, // can be added to "B" group\r
  { key: "Beta", loc: "10 160" },\r
  { key: "Bravo", loc: "10 200" },\r
  { key: "C", loc: "10 240" }, // cannot be added to either group,\r
  { key: "Carrot", loc: "10 280" }\r
], [\r
  // No links\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`textEditing`,code:`// this predicate is true if the new string is made up of only numbers\r
function okName(textblock, oldstr, newstr) {\r
  return /^\\d+$/.test(newstr);\r
};\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape({ fill: "lightyellow" }),\r
      new go.Panel("Vertical", { margin: 3 })\r
        .add(\r
          new go.TextBlock({ editable: true })  // no validation predicate\r
            .bind("text", "text1"),\r
          new go.TextBlock({\r
            editable: true,\r
            isMultiline: false,  // don't allow embedded newlines\r
            textValidation: okName\r
          })  // new string must be an OK name\r
            .bind("text", "text2")\r
        )\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: 1, text1: "Phone Number", text2: "6038869173" }\r
]);`,isExecutable:!0,animation:!1,minHeight:500,language:`js`,initiallyVisible:!0},{id:`textEditingMessage`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", cursor: "pointer" })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
        margin: 8,\r
        editable: true,\r
        isMultiline: false,\r
        textValidation: (tb, olds, news) => {\r
          return news.length >= 8 &&\r
                 /[a-z]/.test(news) &&\r
                 /[A-Z]/.test(news) &&\r
                 /[0-9]/i.test(news);\r
        },\r
        errorFunction: (tool, olds, news) => {\r
          // create and show tooltip about why editing failed for this textblock\r
          const mgr = tool.diagram.toolManager;\r
          mgr.hideToolTip();  // hide any currently showing tooltip\r
          const node = tool.textBlock.part;\r
          // create a GoJS tooltip, which is an Adornment\r
          const tt = go.GraphObject.build("ToolTip", {\r
            "Border.fill": "pink", \r
            "Border.stroke": "red",\r
            "Border.strokeWidth": 3\r
          })\r
            .add(\r
              new go.TextBlock(\r
                "Invalid Password: '" + news +\r
                "'\\nPassword must be at least 8 characters long" +\r
                "\\nContain an uppercase letter" +\r
                "\\nContain a lowercase letter" +\r
                "\\nContain a number"\r
              )\r
            );\r
          mgr.showToolTip(tt, node);\r
        },\r
        textEdited: (tb, olds, news) => {\r
          const mgr = tb.diagram.toolManager;\r
          mgr.hideToolTip();\r
        }\r
      })\r
        .bindTwoWay("text")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Password" }\r
], []);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`191g5tx`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};