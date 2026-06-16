import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Selection`,figures:!0},htmlContent:`<h1>Selection</h1>\r
<p>\r
  Selection is a mechanism that provides the ability for the user to operate commands or tools on a\r
  subset of the <a href="../api/symbols/Part.html" target="api">Part</a>s in a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
  GoJS provides built-in appearances and behaviors for selection.\r
  Although this page describes how those built-in appearances and behaviors can be customized,\r
  if you want a more general highlighting capability with no built-in appearances or behaviors,\r
  please read the page on <a href="highlighting">Highlighting</a>.\r
</p>\r
<p>\r
  Users normally select Parts manually by clicking on them and they deselect them by clicking in the background.\r
  This behavior is implemented by the <a href="../api/symbols/ClickSelectingTool.html" target="api">ClickSelectingTool</a>.\r
  Users can also deselect all Parts by pressing the Esc key.\r
</p>\r
<p>\r
  Users can also drag in the background in order to select the Parts that are within a rectangular area, via the <a href="../api/symbols/DragSelectingTool.html" target="api">DragSelectingTool</a>.\r
  Read more about that in the learn page on Tools at <a href="tools#DragSelectingTool">DragSelectingTool</a>.\r
</p>\r
<p>\r
  You can select parts programmatically by setting <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> or calling one of several\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a> methods such as <a href="../api/symbols/Diagram.html#select" target="api">Diagram.select</a>, <a href="../api/symbols/Diagram.html#selectcollection" target="api">Diagram.selectCollection</a>, and <a href="../api/symbols/Diagram.html#clearselection" target="api">Diagram.clearSelection</a>.\r
</p>\r
<p>\r
  The <a href="../api/symbols/Diagram.html" target="api">Diagram</a> keeps a collection of selected parts, <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a>.\r
  That collection is read-only -- the only way to add or remove a Part in the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a> collection\r
  is by setting its <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> property.\r
  You can limit how many parts the user may select by setting <a href="../api/symbols/Diagram.html#maxselectioncount" target="api">Diagram.maxSelectionCount</a>.\r
  Prevent all selection by the user by setting <a href="../api/symbols/Diagram.html#allowselect" target="api">Diagram.allowSelect</a> to false.\r
  Or prevent a particular Part from being selected by setting or binding its <a href="../api/symbols/Part.html#selectable" target="api">Part.selectable</a> property to false.\r
</p>\r
<p>\r
  You can show that a part is selected by either or both of two general techniques:\r
  adding <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s or changing the appearance of some of the elements in the visual tree of the selected Part.\r
</p>\r
\r
<h2 id="SelectionAdornments"><a class="not-prose heading-anchor" href="#SelectionAdornments">Selection Adornments</a></h2>\r
<p>\r
  It is common to show that a Part is selected by displaying a selection <a href="../api/symbols/Adornment.html" target="api">Adornment</a> --\r
  for nodes, normally a blue rectangle.\r
  If you do not want such an adornment, you can set <a href="../api/symbols/Part.html#selectionadorned" target="api">Part.selectionAdorned</a> to false.\r
  By default the adornment surrounds the whole <a href="../api/symbols/Node.html" target="api">Node</a>.\r
  What if you want attention to be drawn only to the main piece of a node?\r
  You can accomplish that by naming that object and setting <a href="../api/symbols/Part.html#selectionobjectname" target="api">Part.selectionObjectName</a> to that name.\r
</p>\r
<p>\r
  The diagram below shows both behaviors at once. Both nodes use the same template except for\r
  one property: the left node doesn't set <a href="../api/symbols/Part.html#selectionobjectname" target="api">Part.selectionObjectName</a>;\r
  the right node sets it to <code>"ICON"</code>, so the adornment goes around only\r
  the named <code>"ICON"</code> Shape and ignores the text.\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  Note how the <a href="../api/symbols/Part.html#selectionobjectname" target="api">Part.selectionObjectName</a> property is similar to the <a href="../api/symbols/Part.html#locationobjectname" target="api">Part.locationObjectName</a>\r
  in helping to treat a node as if only one piece of it really matters.\r
</p>\r
\r
<h3 id="CustomSelectionAdornments"><a class="not-prose heading-anchor" href="#CustomSelectionAdornments">Custom selection Adornments</a></h3>\r
<p>\r
  If you do want a selection adornment but want something different than the standard one, you can customize it.\r
  Such customization can be done by setting the <a href="../api/symbols/Part.html#selectionadornmenttemplate" target="api">Part.selectionAdornmentTemplate</a>.\r
  It's a template because it gets copied for each selected Part.\r
  In this example, nodes get thick blue circles surrounding the <code>"ICON"</code> of the selected Node,\r
  and links get thick blue lines following the selected link's path.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  Note that an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> is just a <a href="../api/symbols/Part.html" target="api">Part</a>.\r
  Adornments for nodes must contain a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a> in their visual tree.\r
  The Placeholder gets positioned where the selected object is.\r
</p>\r
<p>\r
  Adornments for links are assumed to be panels of <a href="../api/symbols/Panel.html#type" target="api">Panel.type</a> that is <a href="../api/symbols/Panel.html#link" target="api">Panel.Link</a>.\r
  Hence the main element may be a <a href="../api/symbols/Shape.html" target="api">Shape</a> that gets the geometry of the selected Link's path shape,\r
  and the other elements of the adornment may be positioned on or near the segments of the link route just as for a regular <a href="../api/symbols/Link.html" target="api">Link</a>.\r
</p>\r
\r
<h3 id="MoreComplexAdornments"><a class="not-prose heading-anchor" href="#MoreComplexAdornments">More complex Adornments</a></h3>\r
<p>\r
  The custom <a href="../api/symbols/Adornment.html" target="api">Adornment</a> for a <a href="../api/symbols/Node.html" target="api">Node</a> need not be only a simple <a href="../api/symbols/Shape.html" target="api">Shape</a> outlining the selected node.\r
  Here is an adornment that adds a button to the adornment which inserts a node and a link to that new node.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
<p>Select any node and click the "ADD" button. Note how the diagram is automatically laid out as a tree.</p>\r
\r
<h3 id="DataBinding"><a class="not-prose heading-anchor" href="#DataBinding">Data binding</a></h3>\r
<p>\r
  Like all <a href="../api/symbols/Part.html" target="api">Part</a>s, <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s support data binding. If the adorned Part has a data binding (i.e. if <a href="../api/symbols/Part.html#data" target="api">Part.data</a> is non-null), all adornments\r
  for that part will also be bound to the same data object.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  Notice how each Adornment has the same color as the selected node's <code>data.color</code>.\r
</p>\r
\r
<h2 id="SelectionAppearanceChanges"><a class="not-prose heading-anchor" href="#SelectionAppearanceChanges">Selection appearance changes</a></h2>\r
<p>\r
  Adding a selection adornment is not the only way to indicate visually that a <a href="../api/symbols/Part.html" target="api">Part</a> is selected.\r
  You can also modify the appearance of one or more objects in your Part.\r
</p>\r
<p>\r
  One way to do this is with data binding. Here we data bind the <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a>, <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a>, and <a href="../api/symbols/TextBlock.html#fill" target="api">TextBlock.fill</a> to the <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> property\r
  with a conversion function that converts the boolean value to a color string or brush.\r
  We also turn off the regular rectangular blue selection adornment.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  Here the "Paris" node is selected initially.\r
  Now when you select a node its background color changes to cyan.\r
</p>\r
\r
<p>\r
  More generally you can execute code to modify the Part when <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> has changed value.\r
  In this example we will have the same side effects as the previous example.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
<p>\r
  This basically has the same effect as the <a href="../api/symbols/GraphObject.html#bindobject" target="api">GraphObject.bindObject</a> binding of the previous example,\r
  but the possible changes you could make to that node are much greater and probably simpler than trying to use Bindings.\r
</p>\r
<p>\r
  There are some restrictions on what you can do in such an event handler:\r
  you should not select or deselect any parts, and you should not add or remove any parts from the diagram.\r
</p>\r
`,codeBlocks:[{id:`adornmentCompare`,code:`diagram.div.style.backgroundColor = "#F7EBE8";\r
\r
const nodeDataArray = [\r
  // default node where selectionAdornment adorns the entire node\r
  { key: 1, text: "Paris", text2: "(whole node selected)" },\r
  // selectionAdornment only adorns the Shape\r
  { key: 2, selectionObjectName: "ICON",  text: "London", loc: "200 50", text2: "(only icon selected)" }\r
];\r
\r
diagram.nodeTemplate = new go.Node("Vertical")\r
  .bind("selectionObjectName")\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Shape("Location", {\r
      name: "ICON",\r
      strokeWidth: 2, stroke: "#E54B4B",\r
      width: 40, height: 40,\r
      fill: "#FFA987",\r
    }),\r
    new go.TextBlock({\r
      margin: new go.Margin(5, 0, 0, 0),\r
      stroke: "#E54B4B",\r
      font: "bold 15px system-ui, sans-serif"\r
    })\r
      .bind("text"),\r
    new go.TextBlock({\r
      margin: new go.Margin(5, 0, 0, 0),\r
      stroke: "#E54B4B",\r
      font: "12px system-ui, sans-serif"\r
    })\r
      .bind("text", "text2")\r
  );\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray);\r
\r
// select both nodes so you can compare them\r
diagram.selectCollection(diagram.nodes);`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`custom`,code:`diagram.div.style.backgroundColor = "#F7EBE8";\r
\r
const nodeDataArray = [\r
  { key: "Paris" },\r
  { key: "London", loc: "200 50" }\r
];\r
\r
const linkDataArray = [\r
  { from: "Paris", to: "London" }\r
];\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
      toEndSegmentLength: 40,\r
      toShortLength: 2,\r
      selectionAdornmentTemplate:\r
        new go.Adornment()\r
          .add(\r
            new go.Shape({ isPanelMain: true, stroke: "dodgerblue", strokeWidth: 8 }),\r
            new go.Shape({ toArrow: "Standard", fill: "dodgerblue", stroke: null, scale: 2.5 })\r
          )  // end Adornment\r
    })\r
    .add(\r
      new go.Shape({\r
        strokeWidth: 2.5,\r
        stroke: "#E54B4B",\r
      }),\r
      new go.Shape({\r
        toArrow: "Standard",\r
        fill: "#E54B4B",\r
        stroke: "#E54B4B"\r
      })\r
    );\r
\r
diagram.nodeTemplate = new go.Node("Vertical", {\r
  selectionObjectName: "ICON",\r
      selectionAdornmentTemplate:\r
        new go.Adornment("Auto")\r
          .add(\r
            new go.Shape("Ellipse", {\r
              fill: null, stroke: "dodgerblue",\r
              strokeWidth: 5,\r
            }),\r
            new go.Placeholder({ margin: 1 })\r
          )  // end Adornment\r
})\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Panel("Auto").add(\r
\r
      new go.Shape({ opacity: 0, width: 65, portId: "", fromSpot: go.Spot.Right, toSpot: go.Spot.Left }),\r
      new go.Shape("Location", {\r
        name: "ICON",\r
        strokeWidth: 2, stroke: "#E54B4B",\r
        width: 40, height: 40,\r
        fill: "#FFA987",\r
      })),\r
      new go.TextBlock({\r
        margin: new go.Margin(10, 0, 0, 0),\r
        stroke: "#E54B4B",\r
        font: "bold 15px system-ui, sans-serif"\r
      })\r
        .bind("text", "key")\r
    );\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray );\r
\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,highlight:[16,17,18,19,20,21,22,23,24,40,41,42,43,44,45,46,47,48],language:`js`,initiallyVisible:!0},{id:`complex`,code:`diagram.div.style.backgroundColor = "#F7EBE8";\r
\r
const firstNames = [\r
  "James", "Mary", "John", "Patricia", "Robert",\r
  "Jennifer", "Michael", "Linda", "David", "Elizabeth"\r
];\r
\r
function addNodeAndLink(e, b) {\r
  // Take a button panel in an Adornment,\r
  // get its Adornment,\r
  // and then get its adorned Node\r
  const node = b.part.adornedPart;\r
  // we are modifying the model,\r
  // so conduct a transaction\r
  const diagram = node.diagram;\r
  diagram.startTransaction("add node and link");\r
  // have the Model add the node data\r
  const newnode = {\r
    text: firstNames[Math.floor(Math.random() * firstNames.length)]\r
  };\r
  diagram.model.addNodeData(newnode);\r
  // locate the node initially where the parent node is\r
  diagram.findNodeForData(newnode).location = node.location;\r
  // and then add a link data connecting the original\r
  // node with the new one\r
  const newlink = { from: node.data.key, to: newnode.key };\r
  diagram.model.addLinkData(newlink);\r
  // finish the transaction -- will automatically\r
  // perform a layout\r
  diagram.commitTransaction("add node and link");\r
}\r
\r
const buttonForAdornment =\r
  go.GraphObject.build("Button", {\r
    alignment: new go.Spot(1, 0.5, 5, 0),\r
    alignmentFocus: go.Spot.Left,\r
    click: addNodeAndLink,\r
    "ButtonBorder.fill": "dodgerblue",\r
    "ButtonBorder.strokeWidth": 0,\r
    "_buttonFillOver": "#E54B4B",\r
    "_buttonStrokeOver": null\r
  })\r
    .add(\r
      new go.TextBlock("Add", {\r
        stroke: "white",\r
        font: "bold 16px system-ui, sans-serif"\r
      })\r
    )\r
\r
const adornmentWithButton =new go.Adornment("Spot")\r
  .add(\r
    new go.Panel("Auto")\r
      .add(\r
        // this Adornment has a rounded blue\r
        // Shape around the selected node\r
        new go.Shape("RoundedRectangle", {\r
          fill: null, stroke: "dodgerblue",\r
          strokeWidth: 5,\r
        }),\r
        new go.Placeholder()\r
      ),\r
    // and this Adornment has a Button\r
    // to the right of the selected node\r
    buttonForAdornment\r
  )  // end Adornment\r
\r
diagram.nodeTemplate = new go.Node("Vertical", {\r
  selectionObjectName: "ICON",\r
  selectionAdornmentTemplate: adornmentWithButton\r
})\r
  .add(\r
    new go.Panel("Auto").add(\r
      new go.Shape({ opacity: 0, width: 65, portId: "", fromSpot: go.Spot.Right, toSpot: go.Spot.Left }),\r
      new go.Shape("BpmnTaskUser", {\r
        name: "ICON",\r
        strokeWidth: 2, stroke: "#E54B4B",\r
        width: 40, height: 40,\r
        fill: "#FFA987",\r
      })\r
    ),\r
    new go.TextBlock({\r
      margin: new go.Margin(10, 0, 0, 0),\r
      stroke: "#E54B4B",\r
      font: "bold 15px system-ui, sans-serif"\r
    })\r
      .bind("text")\r
  );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Paris" },\r
  { key: 2, text: "London" }\r
];\r
\r
const linkDataArray = [\r
  { from: 1, to: 2 }\r
];\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
    toEndSegmentLength: 40,\r
    toShortLength: 2,\r
  })\r
    .add(\r
      new go.Shape({\r
        strokeWidth: 2.5,\r
        stroke: "#E54B4B",\r
      }),\r
      new go.Shape({\r
        toArrow: "Standard",\r
        fill: "#E54B4B",\r
        stroke: "#E54B4B"\r
      })\r
    );\r
\r
diagram.layout = new go.TreeLayout();\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`binding`,code:`diagram.div.style.backgroundColor = "#F7EBE8";\r
\r
const nodeDataArray = [\r
  { key: "Paris", color: "crimson" },\r
  { key: "London", color: "seagreen", loc: "200 50" }\r
];\r
\r
const myAdornment = new go.Adornment("Auto")\r
  .add(\r
    new go.Shape("Diamond", {\r
      fill: null, stroke: "dodgerblue",\r
      strokeWidth: 5,\r
    })\r
      // selectionAdornment color matches the node\r
      .bind("stroke", "color"),\r
    new go.Placeholder({ margin: 1 })\r
  );\r
\r
const darkerColor = c => go.Brush.mix(c, "black"),\r
  lighterColor = c => go.Brush.mix(c, "white");\r
\r
diagram.nodeTemplate = new go.Node("Vertical", {\r
  selectionAdornmentTemplate: myAdornment\r
})\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Panel("Auto").add(\r
      new go.Shape({ opacity: 0, width: 65, portId: "", fromSpot: go.Spot.Right, toSpot: go.Spot.Left }),\r
      new go.Shape("Location", {\r
        name: "ICON",\r
        strokeWidth: 2,\r
        width: 40, height: 40,\r
      })\r
        .bind("stroke", "color", darkerColor)\r
        .bind("fill", "color", lighterColor)\r
    ),\r
    new go.TextBlock({\r
      margin: new go.Margin(10, 0, 0, 0),\r
      font: "bold 15px system-ui, sans-serif"\r
    })\r
      .bind("text", "key")\r
      .bind("stroke", "color", darkerColor)\r
  );\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray);\r
\r
diagram.selectCollection(diagram.nodes);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`isSelected`,code:`diagram.div.style.backgroundColor = "#F7EBE8";\r
\r
const nodeDataArray = [\r
  { key: "Paris", color: "crimson" },\r
  { key: "London", color: "seagreen", loc: "200 50" }\r
];\r
\r
diagram.nodeTemplate = new go.Node("Vertical", {\r
  // don't bother with any selection adornment\r
  selectionAdorned: false\r
})\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Panel("Auto").add(\r
      new go.Shape({ opacity: 0, width: 65, portId: "", fromSpot: go.Spot.Right, toSpot: go.Spot.Left }),\r
      new go.Shape("Location", {\r
        name: "ICON",\r
        strokeWidth: 2,\r
        width: 40, height: 40,\r
      })\r
        // when this Part.isSelected changes value,\r
        // change this Shape.stroke value:\r
        .bindObject("stroke", "isSelected", (isSelected, target) => {\r
          if (isSelected) return "dodgerblue";\r
          else return target.part.data.color;\r
        })\r
        // when this Part.isSelected changes value,\r
        // change this Shape.fill value:\r
        .bindObject("fill", "isSelected", (isSelected, target) => {\r
          if (isSelected) return "cyan";\r
          else return go.Brush.mix(target.part.data.color, "white");\r
        })\r
    ),\r
    new go.TextBlock({\r
      margin: new go.Margin(10, 0, 0, 0),\r
      font: "bold 15px system-ui, sans-serif"\r
    })\r
      .bind("text", "key")\r
      .bindObject("stroke", "isSelected", sel => sel ? "dodgerblue" : "black")\r
  );\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray);\r
\r
// select paris\r
diagram.select(diagram.findNodeForKey("Paris"));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`selectionChanged`,code:`diagram.div.style.backgroundColor = "#F7EBE8";\r
\r
const nodeDataArray = [\r
  { key: "Paris", color: "crimson" },\r
  { key: "London", color: "seagreen", loc: "200 50" }\r
];\r
\r
function onSelectionChanged(node) {\r
  const icon = node.findObject("ICON");\r
  const text = node.findObject("TEXTBLOCK");\r
  const color = node.data.color;\r
  if (icon !== null && text !== null) {\r
    if (node.isSelected) {\r
      icon.fill = "cyan";\r
      icon.stroke = "dodgerblue";\r
      text.stroke = "dodgerblue";\r
    }\r
    else {\r
      icon.stroke = color;\r
      icon.fill = go.Brush.mix(color, "white");\r
      text.stroke = "black";\r
    }\r
  }\r
}\r
\r
diagram.nodeTemplate = new go.Node("Vertical", {\r
  // don't bother with any selection adornment\r
  selectionAdorned: false,\r
  selectionChanged: onSelectionChanged\r
})\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Panel("Auto").add(\r
      new go.Shape({ opacity: 0, width: 65, portId: "", fromSpot: go.Spot.Right, toSpot: go.Spot.Left }),\r
      new go.Shape("Location", {\r
        name: "ICON",\r
        strokeWidth: 2,\r
        width: 40, height: 40,\r
      })\r
        .bind("stroke", "color")\r
        .bind("fill", "color", c => go.Brush.mix(c, "white"))\r
    ),\r
    new go.TextBlock({\r
      margin: new go.Margin(10, 0, 0, 0),\r
      name: "TEXTBLOCK",\r
      font: "bold 15px system-ui, sans-serif"\r
    })\r
      .bind("text", "key")\r
  );\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray);\r
\r
// select paris\r
diagram.select(diagram.findNodeForKey("Paris"));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1xry6ug`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};