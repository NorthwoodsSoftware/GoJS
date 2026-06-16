import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Groups`,category:`Core Concepts`,categoryOrder:6},htmlContent:`<h1>Groups</h1>\r
<p>\r
  Use the <a href="../api/symbols/Group.html" target="api">Group</a> class to treat a collection of <a href="../api/symbols/Node.html" target="api">Node</a>s and <a href="../api/symbols/Link.html" target="api">Link</a>s as if they were a single <a href="../api/symbols/Node.html" target="api">Node</a>.\r
  Those nodes and links are members of the group; together they constitute a subgraph.\r
</p>\r
\r
<p>\r
  A subgraph is <em>not</em> another <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, so there is no separate HTML div element for the subgraph of a group.\r
  All of the <a href="../api/symbols/Part.html" target="api">Part</a>s that are members of a <a href="../api/symbols/Group.html" target="api">Group</a> belong to the same Diagram as the Group.\r
</p>\r
\r
<p>\r
  Groups can also be collapsed and expanded, to hide or show the member parts.\r
  This is distinct from collapsing and expanding trees.\r
</p>\r
\r
<p>\r
  The member parts of a group are available via the <a href="../api/symbols/Group.html#memberparts" target="api">Group.memberParts</a> property.\r
  Conversely, the <a href="../api/symbols/Part.html#containinggroup" target="api">Part.containingGroup</a> property refers to the group, or null if the part is a top-level part.\r
  A part can be member of at most one group at a time.\r
  You can set that property in order to add that part to a group.\r
  However you must make sure that no group contains itself, either directly or indirectly through other groups.\r
</p>\r
\r
<p>\r
  Because every <a href="../api/symbols/Group.html" target="api">Group</a> is a <a href="../api/symbols/Node.html" target="api">Node</a>, you can have nested groups.\r
  Although member <a href="../api/symbols/Node.html" target="api">Node</a>s and <a href="../api/symbols/Link.html" target="api">Link</a>s belong to the <a href="../api/symbols/Group.html" target="api">Group</a> that contains them,\r
  they are not in the visual tree of the group -- their <a href="../api/symbols/GraphObject.html#panel" target="api">GraphObject.panel</a> is null and\r
  no member part is in the group's <a href="../api/symbols/Panel.html#elements" target="api">Panel.elements</a> collection.\r
  No <a href="../api/symbols/Part.html" target="api">Part</a> can be in the visual tree of another <a href="../api/symbols/Part.html" target="api">Part</a>.\r
  Parts normally do belong directly to one <a href="../api/symbols/Layer.html" target="api">Layer</a>.\r
</p>\r
<p>\r
  See samples that make use of Groups in the <a href="../samples/#groups">samples index</a>.\r
</p>\r
<h2 id="SimpleGroups"><a class="not-prose heading-anchor" href="#SimpleGroups">Simple Groups</a></h2>\r
<p>\r
  In a <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> the <a href="../api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a> holds node data, each of which could be\r
  represented by a <a href="../api/symbols/Group.html" target="api">Group</a> rather than by a regular <a href="../api/symbols/Node.html" target="api">Node</a>.\r
  You can declare that it should be a group by setting the <code>isGroup</code> data property to true.\r
  You can declare that a node data be a member of a group by referring to the group's key\r
  as the <code>group</code> data property value.\r
</p>\r
<p>\r
  Here is a group containing two nested groups as well as two regular nodes.\r
  If you move a group, its member parts move along.\r
  If you copy a group, its member parts are copied too.\r
  If you delete a group, its member parts are deleted too.\r
  If you move a member node, its containing group inflates or shrinks to cover the area occupied by all of the members.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h3 id="GroupsLinks">Groups and Links</h2>\r
<p>\r
  Because <a href="../api/symbols/Group.html" target="api">Group</a>s are <a href="../api/symbols/Node.html" target="api">Node</a>s, a <a href="../api/symbols/Link.html" target="api">Link</a> may connect with a group as well as with a plain node.\r
</p>\r
<p>\r
  Here is a simple example of four regular nodes and one group node.\r
  In this example the link from "Alpha" goes directly to the "Beta" node,\r
  but the link to "Delta" actually comes from the "Omega" group rather than from any particular member of the group.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  If you drag the "Delta" node around you can see how the link from the "Omega" group appears to come from the center\r
  of the group and start at the group's edge rather than at any member node.\r
  This is different than for the link from "Alpha" to "Beta".\r
</p>\r
<p>\r
  Note also how the link from "Beta" to "Gamma" is effectively owned by the "Omega" group because\r
  both of the nodes are owned by that group.  Copying the group automatically copies the link too.\r
</p>\r
<p>\r
  This example did not set any of the following properties:\r
  <a href="../api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a>, <a href="../api/symbols/Diagram.html#grouptemplate" target="api">Diagram.groupTemplate</a>, and <a href="../api/symbols/Diagram.html#linktemplate" target="api">Diagram.linkTemplate</a>,\r
  in order to demonstrate the default templates for Nodes, Groups, and Links.\r
</p>\r
\r
<h2 id="GroupTemplates"><a class="not-prose heading-anchor" href="#GroupTemplates">Group templates</a></h2>\r
<p>\r
  Here is an example of how one might define templates for nodes and for groups.\r
  The node template is very simple: some text inside an ellipse.\r
  The group template is different from a node template in several aspects.\r
</p>\r
<p>\r
  First, the group template builds a <code>go.Group</code>, not a <code>go.Node</code> or <code>go.Part</code>.\r
  The group can use a number of the panel types, just as a node may use various panel types.\r
</p>\r
<p>\r
  Second, the group template includes a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a> object.\r
  The group template can have at most a singular <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a> object within its visual tree.\r
  The <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a> assumes the size and position of the union of the bounds of all of the group's member parts, plus some padding.\r
  The use of a Placeholder results in the Group surrounding the collection of group members,\r
  no matter where the member nodes are placed.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  Note how when you move the "Beta" or "Gamma" nodes the "Omega" group automatically resizes so that the\r
  TextBlock on the group stays below and on the right side of the "RoundedRectangle" shape.\r
</p>\r
\r
<h2 id="Subgraphs"><a class="not-prose heading-anchor" href="#Subgraphs">Groups as subgraphs</a></h2>\r
<p>\r
  There are some common ways of treating the nodes and links that are the members of a group as if it were its own graph.\r
  One way to declutter a diagram is to "collapse" a <a href="../api/symbols/Group.html" target="api">Group</a> to hide the subgraph that it holds.\r
</p>\r
<p>\r
  A <a href="../api/symbols/Group.html" target="api">Group</a> has its own <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a> that is responsible for the positioning of member <a href="../api/symbols/Node.html" target="api">Node</a>s and the routing of member <a href="../api/symbols/Link.html" target="api">Link</a>s.\r
  This is exactly like a <a href="../api/symbols/Diagram.html" target="api">Diagram</a> having its own <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> that positions top-level Nodes and routes top-level Links.\r
</p>\r
<p>\r
  Keep in mind that subgraphs are not separate Diagrams and that Groups are just one way of organizing Parts.\r
  Because subgraphs are collections of Nodes and Links in the same Diagram as the Group itself,\r
  it is possible to have Links that connect Nodes that are inside a Group with Nodes that are outside of the group.\r
  It is also possible to have links that connect nodes with the group of which they are a member.\r
</p>\r
\r
<h2 id="LayoutsOfSubgraphs"><a class="not-prose heading-anchor" href="#LayoutsOfSubgraphs">Layouts of subgraphs</a></h2>\r
<p>\r
  You can specify a <a href="../api/symbols/Layout.html" target="api">Layout</a> that applies to a group's subgraph by setting the <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a> property.\r
  This operates on the group's member nodes and links as if it were its own diagram.\r
  A diagram layout of nodes that include groups with their own layout will treat those groups as if they were simple nodes,\r
  albeit probably larger than normal nodes.\r
</p>\r
<p>\r
  In this example each of the groups has a unique layout which are all different than the layout for the overall diagram.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  The default layout for a Group is an instance of <a href="../api/symbols/Layout.html" target="api">Layout</a>, just as it is for <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
  If you do not specify a value for <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a> the default layout for the group will position all member nodes that do not have a real <a href="../api/symbols/Part.html#location" target="api">Part.location</a>.\r
</p>\r
\r
<p>\r
  If you explicitly set <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a> to null, the Diagram will be responsible for laying out all of Nodes and Links as if the Group did not exist.\r
  This is possible because a subgraph is not another <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
</p>\r
\r
<h2 id="CollapsingAndExpandingGroups"><a class="not-prose heading-anchor" href="#CollapsingAndExpandingGroups">Collapsing and expanding Groups</a></h2>\r
<p>\r
  One common technique to visually simplify a diagram is to hide parts of them by "collapsing" them.\r
  In the case of <a href="../api/symbols/Group.html" target="api">Group</a>s, it may make sense to be able to hide the subgraph.\r
</p>\r
<p>\r
  To collapse a group, set or bind <a href="../api/symbols/Group.html#issubgraphexpanded" target="api">Group.isSubGraphExpanded</a> to false.\r
  To make sure it is expanded, set that property to true.\r
</p>\r
<p>\r
  It is commonplace to provide a button on a group to allow users to collapse and expand groups as they wish.\r
  GoJS makes this easy to implement by providing a predefined kind of <a href="../api/symbols/Panel.html" target="api">Panel</a>, named "SubGraphExpanderButton",\r
  that acts as a button to collapse and expand <a href="../api/symbols/Group.html" target="api">Group</a>s.\r
  This button changes the visibility of the member nodes and links but does not change the visibility of the group itself.\r
  When the group's visual tree includes a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a>, the placeholder will automatically shrink when the member parts\r
  become invisible and will inflate when the member parts become visible again.\r
</p>\r
<p>\r
  Click on the expander button to collapse or expand the group.\r
  Changing the size of the group also invalidates the layout that is responsible for positioning the group as a single node.\r
  Often the size of the group changes greatly, so a layout usually needs to be performed again.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  If you do not want a layout to be performed again when the group changes size,\r
  you can set the <a href="../api/symbols/Part.html#layoutconditions" target="api">Part.layoutConditions</a> property to control the circumstances under which the layout will be invalidated.\r
</p>\r
\r
<p>\r
  The following example demonstrates a Group with a header holding a button and some text.\r
  Note how when collapsing the group, the link from "Alpha" to "Beta" changes to appear to connect with the Group\r
  rather than with the now hidden "Beta" Node.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
`,codeBlocks:[{id:`simple`,code:`diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha", fill: "#9A7950", isGroup: true},\r
  { key: 2, text: "Beta", fill: "#BAEDA4", group: 1 },\r
  { key: 3, text: "Gamma", fill: "#976931", group: 1, isGroup: true },\r
  { key: 4, text: "Delta", fill: "#BAEDA4", group: 3 },\r
  { key: 5, text: "Epsilon", fill: "#BAEDA4", group: 3 },\r
  { key: 6, text: "Zeta", fill: "#BAEDA4", group: 1 },\r
  { key: 7, text: "Eta", fill: "#C1A98C", group: 1, isGroup: true },\r
  { key: 8, text: "Theta", fill: "#BAEDA4", group: 7 }\r
]);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Ellipse", { strokeWidth: 0 })\r
        .bind("fill"),\r
      new go.TextBlock({ margin: 3, font: "11pt serif" })\r
        .bind("text")\r
    );\r
\r
diagram.groupTemplate =\r
  new go.Group("Vertical")\r
    .add(\r
      new go.TextBlock({ alignment: go.Spot.Left, font: "bold 12pt georgia" })\r
        .bind("text"),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", { parameter1: 10, stroke: "#754000", strokeWidth: 4 })\r
            .bind("fill"),\r
          new go.Placeholder({ padding: 5})\r
        )\r
    );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`links`,code:`const nodeDataArray = [\r
  { key: 1, text: "Alpha", fill: "#A1C6EA" },\r
  { key: 2, text: "Beta", fill: "#FEFF9C", group: 4 },\r
  { key: 3, text: "Gamma", fill: "#FEFF9C", group: 4 },\r
  { key: 4, text: "Omega", fill: "#CDFC93", isGroup: true },\r
  { key: 5, text: "Delta", fill: "#EEC0C6" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 },  // from outside the Group to inside it\r
  { from: 2, to: 3 },  // this link is a member of the Group\r
  { from: 4, to: 5 }  // from the Group to a Node\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,minHeight:275,language:`js`,initiallyVisible:!0},{id:`groupTemplates`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Ellipse")\r
        .bind("fill"),\r
      new go.TextBlock({ margin: 3 })\r
        .bind("text")\r
    );\r
\r
diagram.groupTemplate =\r
  new go.Group("Vertical")\r
    .add(\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", { parameter1: 10 }) // surrounds the Placeholder\r
            .bind("fill"),\r
          // represents the area of all member parts\r
          new go.Placeholder({ padding: 5, background: "#EEC0C6" /* pink */ })\r
        ),\r
      new go.TextBlock({ alignment: go.Spot.Right, font: "bold 12pt georgia" })\r
        .bind("text")\r
    );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha", fill: "#A1C6EA" },\r
  { key: 2, text: "Delta", fill: "#A1C6EA" },\r
  { key: 3, text: "Omega", fill: "#CDFC93", isGroup: true },\r
  { key: 4, text: "Beta", fill: "#FEFF9C", group: 3 },\r
  { key: 5, text: "Gamma", fill: "#FEFF9C", group: 3 },\r
];\r
const linkDataArray = [\r
  { from: 1, to: 4 },  // from outside the Group to inside it\r
  { from: 4, to: 5},  // this link is a member of the Group\r
  { from: 3, to: 2 }  // from the Group to a Node\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`layouts`,code:`diagram.div.style.backgroundColor = "#0b0f19";\r
\r
// Layout for overall diagram which will position the groups\r
diagram.layout =\r
  new go.TreeLayout({\r
    angle: 90,\r
    layerSpacing: 50,\r
    nodeSpacing: 40,\r
    isRealtime: false\r
  });\r
\r
diagram.groupTemplate =\r
  new go.Group("Auto")\r
    // Binding the layout property to the unique layouts in each of the groups node data\r
    .bind("layout")\r
    .add(\r
      new go.Shape("RoundedRectangle", { parameter1: 10, strokeWidth: 2 })\r
        .bind("fill")\r
        .bind("stroke", "outline"),\r
      new go.Placeholder({ padding: 14 })\r
    );\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", { width: 20, height: 20 })\r
    .add(\r
      new go.Shape("Circle", { strokeWidth: 0 })\r
        .bind("fill")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ corner: 6 })\r
    .add(\r
      new go.Shape({ stroke: "#9fd6ff" }),\r
      new go.Shape({ toArrow: "standard", fill: "#9fd6ff", stroke: null })\r
    );\r
\r
const nodeDataArray = [\r
  { key: "BG", isGroup: true, fill: "#002842", outline: "#00e5ff",\r
    // Grid Layout for the blue group which will arrange its members\r
    layout: new go.GridLayout({ wrappingColumn: 2 }),\r
  },\r
  { key: "PG", isGroup: true, fill: "#280028", outline: "#ff3df0",\r
    // Circular Layout for the pink group which will arrange its members\r
    layout: new go.CircularLayout({ radius: 32 }),\r
  },\r
  { key: "GG", isGroup: true, fill: "#002814", outline: "#39ff88",\r
    // Layered Digraph Layout for the green group which will arrange its members\r
    layout: new go.LayeredDigraphLayout({ direction: 90,layerSpacing: 16, columnSpacing: 14 }),\r
  },\r
\r
  { key: "B1", group: "BG", fill: "#0088aa" },\r
  { key: "B2", group: "BG", fill: "#00bbcc" },\r
  { key: "B3", group: "BG", fill: "#33e0ee" },\r
  { key: "B4", group: "BG", fill: "#88f0ff" },\r
  { key: "P1", group: "PG", fill: "#990077" },\r
  { key: "P2", group: "PG", fill: "#bb22aa" },\r
  { key: "P3", group: "PG", fill: "#dd55cc" },\r
  { key: "P4", group: "PG", fill: "#ff88ee" },\r
  { key: "P5", group: "PG", fill: "#ffbbf5" },\r
  { key: "G1", group: "GG", fill: "#009955" },\r
  { key: "G2", group: "GG", fill: "#22cc77" },\r
  { key: "G3", group: "GG", fill: "#66ee99" },\r
  { key: "G4", group: "GG", fill: "#aaffcc" }\r
];\r
const linkDataArray = [\r
  // group links\r
  { from: "BG", to: "PG" },\r
  { from: "BG", to: "GG" },\r
\r
  // blue\r
  { from: "B1", to: "B2" },\r
  { from: "B3", to: "B4" },\r
\r
  // pink\r
  { from: "P1", to: "P2" },\r
  { from: "P2", to: "P3" },\r
  { from: "P3", to: "P4" },\r
  { from: "P4", to: "P5" },\r
  { from: "P5", to: "P1" },\r
\r
  // green\r
  { from: "G1", to: "G2" },\r
  { from: "G1", to: "G3" },\r
  { from: "G2", to: "G4" },\r
  { from: "G3", to: "G4" }\r
];\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`collapseExpand`,code:`diagram.div.style.backgroundColor = "#eef1f7";\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "#cdd5e4", strokeWidth: 1.5 }),\r
      new go.TextBlock({ margin: new go.Margin(7, 14), font: "bold 14px sans-serif" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 6 })\r
    .add(\r
      new go.Shape({ stroke: "#9aa6c0", strokeWidth: 1.5 }),\r
      new go.Shape({ toArrow: "Standard", fill: "#9aa6c0", stroke: null })\r
    );\r
\r
diagram.groupTemplate =\r
  new go.Group("Auto", { layout: new go.TreeLayout() })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#e3e9f7", stroke: "#aab8da", parameter1: 10 }),\r
      new go.Panel("Table", { margin: 3 })\r
        .addRowDefinition(0, { background: "#4a5da8" })\r
        .add(\r
          go.GraphObject.build("SubGraphExpanderButton", { margin: 4 }),\r
          new go.TextBlock({ column: 1, font: "bold 14px sans-serif",\r
            stroke: "white", textAlign: "center", margin: 8\r
          })\r
            .bind("text"),\r
          new go.Placeholder({ row: 1, columnSpan: 2, padding: 12 })\r
        )\r
    );\r
\r
diagram.layout = new go.LayeredDigraphLayout({ direction: 90, isRealtime: false });\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "GROUP", isGroup: true },\r
  { key: 3, text: "Beta", group: 2 },\r
  { key: 4, text: "Gamma", group: 2 },\r
  { key: 5, text: "Delta" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 },\r
  { from: 3, to: 4 },\r
  { from: 2, to: 5 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`collapseExpand2`,code:`diagram.div.style.backgroundColor = "#eef1f7";\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "white", stroke: "#cdd5e4", strokeWidth: 1.5 }),\r
      new go.TextBlock({ margin: new go.Margin(7, 14), font: "bold 14px sans-serif" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 6 })\r
    .add(\r
      new go.Shape({ stroke: "#9aa6c0", strokeWidth: 1.5 }),\r
      new go.Shape({ toArrow: "Standard", fill: "#9aa6c0", stroke: null })\r
    );\r
\r
diagram.groupTemplate =\r
  new go.Group("Auto", { layout: new go.TreeLayout() })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "#e3e9f7", stroke: "#aab8da", parameter1: 10 }),\r
      new go.Panel("Table", { margin: 3 })\r
        .addRowDefinition(0, { background: "#4a5da8" })\r
        .add(\r
          go.GraphObject.build("SubGraphExpanderButton", { margin: 4 }),\r
          new go.TextBlock({ column: 1, font: "bold 14px sans-serif",\r
            stroke: "white", textAlign: "center", margin: 8\r
          })\r
            .bind("text"),\r
          new go.Placeholder({ row: 1, columnSpan: 2, padding: 12 })\r
        )\r
    );\r
\r
diagram.layout = new go.TreeLayout({ isRealtime: false });\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "GROUP", isGroup: true },\r
  { key: 3, text: "Beta", group: 2 },\r
  { key: 4, text: "Gamma", group: 2 },\r
  { key: 5, text: "Delta" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 3 },\r
  { from: 3, to: 4 },\r
  { from: 1, to: 5 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`bbri7s`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};