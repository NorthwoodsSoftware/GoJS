import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Highlighting`,figures:!0},htmlContent:`<h1>Highlighting</h1>\r
<p>\r
  It is common to make a Node (or a part of a Node or a Link) stand out by "highlighting" it in some way.\r
  This happens with selection when a selection Adornment is shown.\r
  However one frequently wants to highlight Parts independently of selection.\r
  This can be done by changing the fill or stroke of a Shape, replacing a Picture source with another source, adding or removing a shadow, and so on.\r
</p>\r
\r
<h2 id="HighlightingNodeUponMouseOver"><a class="not-prose heading-anchor" href="#HighlightingNodeUponMouseOver">Highlighting a Node upon mouse over</a></h2>\r
<p>\r
  The most general kind of highlighting is to change appearance when an action occurs, such as mousing over a node.\r
  This can draw attention to interactive Nodes or Links or really any GraphObject, such as buttons.\r
  This is why the <a href="buttons">predefined buttons in GoJS</a> highlight on mouse-over.\r
</p>\r
<p>\r
  To achieve this effect you just need to define <a href="../api/symbols/GraphObject.html#mouseenter" target="api">GraphObject.mouseEnter</a> and <a href="../api/symbols/GraphObject.html#mouseleave" target="api">GraphObject.mouseLeave</a> event handlers.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>Mouse-over nodes to see them highlight.</p>\r
\r
<p>\r
  It is also commonplace to perform highlighting of stationary Parts during a drag, which is a different case of "mouse over".\r
  This can be implemented in a manner similar to the mouseEnter/mouseLeave events by implementing\r
  <a href="../api/symbols/GraphObject.html#mousedragenter" target="api">GraphObject.mouseDragEnter</a> and <a href="../api/symbols/GraphObject.html#mousedragleave" target="api">GraphObject.mouseDragLeave</a> event handlers.\r
  Several samples demonstrate this:\r
  <a href="../samples/orgChartEditor">Org Chart Editor</a>, <a href="../samples/vendingPlanogram">Planogram</a>,\r
  <a href="../samples/regrouping">Regrouping</a>, and <a href="../samples/seatingChart">Seating Chart</a>.\r
</p>\r
\r
<h2 id="HighlightingNodesAndLinks"><a class="not-prose heading-anchor" href="#HighlightingNodesAndLinks">Highlighting Nodes and Links</a></h2>\r
<p>\r
  It is common to want to show Nodes or Links that are related to a particular Node.\r
  Unlike the mouse-over scenarios, one may want to maintain the highlighting for many Parts independent of any mouse state or selection state.\r
</p>\r
<p>\r
  Here is an example of highlighting all of the nodes and links that come out of a node that the user clicks.\r
  This example uses the <a href="../api/symbols/Part.html#ishighlighted" target="api">Part.isHighlighted</a> property and data binding of visual properties to that Part.isHighlighted property.\r
  Unlike the <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> property, there are no pre-defined appearance behaviors defined when a Part is highlighted or loses highlight.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  Click on a node to highlight outbound connected links and nodes.\r
  Click in the diagram background to remove all highlights.\r
  Note that the highlighting is independent of selection.\r
</p>\r
<p>\r
  The use of data binding to modify the Shape properties allows you to avoid specifying names for each Shape\r
  and writing code to find the Shape and modify its properties.\r
  Note how the call to establish a Binding where the source object is the whole Node instead of the node data\r
  is to <a href="../api/symbols/GraphObject.html#bindobject" target="api">GraphObject.bindObject</a> instead of the usual <a href="../api/symbols/GraphObject.html#bind" target="api">GraphObject.bind</a>.\r
</p>\r
<p>\r
  However when the modifications you want to make are too complicated to implement using data binding,\r
  you can implement a <a href="../api/symbols/Part.html#highlightedchanged" target="api">Part.highlightedChanged</a> event handler.\r
  Similar to the restrictions of the analogous <a href="../api/symbols/Part.html#selectionchanged" target="api">Part.selectionChanged</a> event handler,\r
  you must not change the highlighting of any other Parts,\r
  and we recommend against making any changes that would cause a layout to happen or any links to be rerouted.\r
</p>\r
\r
<h3 id="ChangingNodeSizeWhenHighlighting"><a class="not-prose heading-anchor" href="#ChangingNodeSizeWhenHighlighting">Changing Node size When highlighting</a></h3>\r
<p>\r
  You may want to increase the size of a node or of an element in a node in order to highlight it.\r
  For example you could have a Binding on <a href="../api/symbols/GraphObject.html#scale" target="api">GraphObject.scale</a> or <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a>:\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  However, doing so will change the size of the object.\r
  That is likely to invalidate the route of any links that are connected with that node.\r
  That might not matter in many apps, but in some cases the routes of some links may have been reshaped by the user.\r
  Any recomputation of the route due to a connected node moving or changing size might lose that route.\r
</p>\r
\r
<p>\r
  If that is a consideration in your app, you might consider instead having each node hold an additional Shape\r
  that would provide the highlighting when shown and that would be unseen otherwise.\r
  But do not toggle the <a href="../api/symbols/GraphObject.html#visible" target="api">GraphObject.visible</a> property, because that would cause the node to change size.\r
  Instead toggle the <a href="../api/symbols/GraphObject.html#opacity" target="api">GraphObject.opacity</a> property between 0.0 and 1.0.\r
</p>\r
\r
<p>\r
  In the below example, there is not a separate highlight shape\r
  -- changes are made directly to the Node's content --\r
  but rather an invisible (<code>opacity: 0</code>) placeholder Shape with a set width and height to keep the node's boundaries the same when the content is scaled up.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  The placeholder Shape is always hidden by having zero opacity, and has <a href="../api/symbols/GraphObject.html#pickable" target="api">GraphObject.pickable</a> set to false so that the user can click outside the boundary of the visible node without clicking the node.\r
</p>`,codeBlocks:[{id:`highlighting1`,code:`diagram.div.style.backgroundColor = "#242424";\r
\r
function mouseEnter(e, node) {\r
  const shape = node.findObject("BORDER");\r
  shape.stroke = "#E2C044" /* yellow */;\r
};\r
\r
function mouseLeave(e, node) {\r
  const shape = node.findObject("BORDER");\r
  // Return the Shape's stroke to the default\r
  shape.stroke = "#555555";\r
};\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    mouseEnter: mouseEnter,\r
    mouseLeave: mouseLeave\r
  })\r
  .add(\r
    new go.Shape("RoundedRectangle", {\r
      name: "BORDER",\r
      fill: "#2A2A2A",\r
      stroke: "#555555", strokeWidth: 1.5\r
    }),\r
    new go.Panel("Horizontal", { margin: 6 })\r
      .add(\r
        new go.Shape("Package", {\r
          width: 27, height: 21,\r
          strokeWidth: 0,\r
          margin: new go.Margin(0, 8, 0, 0),\r
          fill: "#E99158" /* orange */\r
        }),\r
        new go.TextBlock({\r
          font: "17px monospace", stroke: "lightgray",\r
          margin: new go.Margin(4,0,0,0)\r
        })\r
          .bind("text")\r
      )\r
  );\r
\r
diagram.layout = new go.TreeLayout({ angle: 90 });\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Link.Normal, toShortLength: 2 })\r
    .add(\r
      new go.Shape({ stroke: "#444444", strokeWidth: 1.5 }),\r
      new go.Shape({ toArrow: "Standard", fill: "#444444", stroke: null })\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "/" },\r
    { key: 2, text: "bin" },\r
    { key: 3, text: "home" },\r
    { key: 4, text: "user1" },\r
    { key: 5, text: "user2" }\r
  ],\r
  [\r
    { from: 1, to: 2 },\r
    { from: 1, to: 3 },\r
    { from: 3, to: 4 },\r
    { from: 3, to: 5 },\r
  ]);`,isExecutable:!0,animation:!1,highlight:[3,4,5,6,7,8,9,10,11,12,16,17],language:`js`,initiallyVisible:!0},{id:`highlighting2`,code:`diagram.div.style.backgroundColor = "#242424";\r
\r
// when the user clicks on the background of the Diagram, remove all highlighting\r
diagram.click = e => {\r
  e.diagram.commit(d => d.clearHighlighteds(), "no highlighteds");\r
};\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    // when the user clicks on a Node, highlight all Links coming out of the node\r
    // and all of the Nodes at the other ends of those Links.\r
    click: (e, node) => {\r
      // highlight all Links and Nodes coming out of a given Node\r
      const diagram = node.diagram;\r
      diagram.startTransaction("highlight");\r
      // remove any previous highlighting\r
      diagram.clearHighlighteds();\r
      // for each Link coming out of the Node, set Link.isHighlighted\r
      node.findLinksOutOf().each(l => l.isHighlighted = true);\r
      // for each Node destination for the Node, set Node.isHighlighted\r
      node.findNodesOutOf().each(n => n.isHighlighted = true);\r
      diagram.commitTransaction("highlight");\r
    },\r
  })\r
  .add(\r
    new go.Shape("RoundedRectangle", {\r
      name: "BORDER",\r
      fill: "#2A2A2A",\r
      strokeWidth: 1.5\r
    })\r
      // the Shape.stroke color depends on whether Node.isHighlighted is true\r
      .bindObject("stroke", "isHighlighted", h => h ? "#E2C044" /* yellow */ : "#555555"),\r
    new go.Panel("Horizontal", { margin: 6 })\r
      .add(\r
        new go.Shape("Package", {\r
          width: 27, height: 21,\r
          strokeWidth: 0,\r
          margin: new go.Margin(0, 8, 0, 0),\r
          fill: "#E99158" /* orange */\r
        }),\r
        new go.TextBlock({\r
          font: "17px monospace", stroke: "lightgray",\r
          margin: new go.Margin(4,0,0,0)\r
        })\r
          .bind("text")\r
      )\r
  );\r
\r
diagram.layout = new go.TreeLayout({ angle: 90 });\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Link.Normal, toShortLength: 4 })\r
    .add(\r
      new go.Shape({ stroke: "#444444", strokeWidth: 1.5 })\r
        // the Shape.stroke color depends on whether Link.isHighlighted is true\r
        .bindObject("stroke", "isHighlighted", h => h ? "#E2C044" : "#444444")\r
        // the Shape.strokeWidth depends on whether Link.isHighlighted is true\r
        .bindObject("strokeWidth", "isHighlighted", h => h ? 3 : 1.5),\r
      new go.Shape({ toArrow: "Standard", fill: "#444444", stroke: null })\r
        // the Shape.fill color depends on whether Link.isHighlighted is true\r
        .bindObject("fill", "isHighlighted", h => h ? "#E2C044" : "#444444")\r
    );\r
\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "/" },\r
    { key: 2, text: "etc" },\r
    { key: 3, text: "home" },\r
    { key: 4, text: "ssh" },\r
    { key: 5, text: "user1" },\r
    { key: 6, text: "user2" },\r
  ],\r
  [\r
    { from: 1, to: 2 },\r
    { from: 1, to: 3 },\r
    { from: 2, to: 4 },\r
    { from: 3, to: 5 },\r
    { from: 3, to: 6 },\r
  ]);`,isExecutable:!0,animation:!1,html:`<p>Select a node:</p>`,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Node(...)\r
    .add(\r
      new go.Shape(...)\r
        .bindObject("strokeWidth", "isHighlighted", h => h ? 5 : 1),\r
      ...\r
    )`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`highlighting3`,code:`diagram.div.style.backgroundColor = "#242424";\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    // when the user clicks on a Node, highlight all Links coming out of the node\r
    // and all of the Nodes at the other ends of those Links.\r
    click: (e, node) => {\r
      const diagram = node.diagram;\r
      diagram.startTransaction("highlight");\r
      diagram.clearHighlighteds();\r
      node.findLinksOutOf().each(l => l.isHighlighted = true);\r
      node.findNodesOutOf().each(n => n.isHighlighted = true);\r
      diagram.commitTransaction("highlight");\r
    },\r
    selectionObjectName: "CONTENT"\r
  })\r
    .add(\r
      // Placeholder: transparent shape to keep node's size the same.\r
      // links connect to this outer boundary, ensuring their routes never change.\r
      new go.Shape("Rectangle", {\r
        opacity: 0,\r
        width: 140, height: 45,\r
        pickable: false\r
      }),\r
\r
      // content\r
      new go.Panel("Auto", { name: "CONTENT", alignment: go.Spot.Center })\r
        // scale increases when the object is highlighted\r
        .bindObject("scale", "isHighlighted", h => h ? 1.3 : 1.0)\r
        .trigger("scale", { duration: 300 }) // scale animation\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "#2A2A2A" })\r
            .bindObject("stroke", "isHighlighted", h => h ? "#E2C044" : "#555555")\r
            .bindObject("strokeWidth", "isHighlighted", h => h ? 3 : 1.5),\r
\r
          new go.Panel("Horizontal", { margin: 6 })\r
            .add(\r
              new go.Shape({ height: 14, strokeWidth: 0, margin: new go.Margin(0, 5, 0, 0) })\r
                .bind("figure", "type", t => t === "folder" ? "Package" : "File")\r
                .bind("width", "type", t => t === "folder" ? 18 : 14)\r
                .bind("fill", "type", t => t === "folder" ? "#E99158" /* orange */ : "#A3C9A8" /* light blue */),\r
              new go.TextBlock({ font: "11px monospace", stroke: "lightgray" })\r
                .bind("text")\r
            )\r
        )\r
    );\r
\r
// when the user clicks on the background of the Diagram, remove all highlighting\r
diagram.click = e => {\r
  e.diagram.commit(d => d.clearHighlighteds(), "no highlighteds");\r
};\r
\r
diagram.layout = new go.TreeLayout({ angle: 90 });\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Link.Normal, toShortLength: 4 })\r
    .add(\r
      new go.Shape({ stroke: "#444444", strokeWidth: 1.5 })\r
        // the Shape.stroke color depends on whether Link.isHighlighted is true\r
        .bindObject("stroke", "isHighlighted", h => h ? "#E2C044" : "#444444")\r
        // the Shape.strokeWidth depends on whether Link.isHighlighted is true\r
        .bindObject("strokeWidth", "isHighlighted", h => h ? 3 : 1.5),\r
      new go.Shape({ toArrow: "Standard", fill: "#444444", stroke: null })\r
        // the Shape.fill color depends on whether Link.isHighlighted is true\r
        .bindObject("fill", "isHighlighted", h => h ? "#E2C044" : "#444444")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(\r
  [\r
    { key: 1, text: "/", type: "folder" },\r
    { key: 2, text: "bin", type: "folder" },\r
    { key: 3, text: "home", type: "folder" },\r
    { key: 4, text: "mkdir", type: "file" },\r
    { key: 5, text: "alice", type: "folder" },\r
    { key: 6, text: ".bashrc", type: "file" },\r
    { key: 7, text: "docs", type: "folder" },\r
    { key: 8, text: "resume.txt", type: "file" }\r
  ],\r
  [\r
    { from: 1, to: 2 },\r
    { from: 1, to: 3 },\r
    { from: 2, to: 4 },\r
    { from: 3, to: 5 },\r
    { from: 5, to: 6 },\r
    { from: 5, to: 7 },\r
    { from: 7, to: 8 }\r
  ]);`,isExecutable:!0,animation:!1,highlight:[20,21,22,23,24,29],language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`kh36uc`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};