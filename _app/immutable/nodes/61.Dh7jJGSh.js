import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Sizing of GraphObjects`,category:`Core Concepts`,categoryOrder:7,figures:!0},htmlContent:`<h1>Sizing GraphObjects</h1>\r
<p>\r
  The size of a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> is determined by the values of the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>, <a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a>, <a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a> and\r
  <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> properties. The actual size of an object after its containing panel measures and arranges it is given by several read-only\r
  properties: <a href="../api/symbols/GraphObject.html#naturalbounds" target="api">GraphObject.naturalBounds</a>, <a href="../api/symbols/GraphObject.html#measuredbounds" target="api">GraphObject.measuredBounds</a>, and <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a>.\r
</p>\r
<p>\r
  Setting <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a> is exactly the same as setting <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>; the GraphObject height and width properties correspond to the <a href="../api/symbols/Size.html#width" target="api">Size.width</a> and <a href="../api/symbols/Size.html#height" target="api">Size.height</a> components of the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>. The default value of <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> is <code>(NaN, NaN)</code> --\r
  meaning that the size must be computed. One can set the width to a real number and leave the height to be <code>NaN</code>, or vice-versa.\r
</p>\r
<p>\r
  Users can also change the size of an object within a Part via the <a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a>: <a href="tools#ResizingTool">ResizingTool learn page</a>.\r
</p>\r
\r
<h3 id="DesiredSizeMinSizeAndMaxSize"><a class="not-prose heading-anchor" href="#DesiredSizeMinSizeAndMaxSize">desiredSize, minSize, and maxSize</a></h3>\r
<p>\r
  When the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> property is not set to <code>NaN</code>, the value of the desiredSize property becomes the GraphObject's natural size.\r
  When the desiredSize property is not set but there is a <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> value, it will get the size of the available space.\r
  When desiredSize is not set and there is no stretch, an object prefers being its natural size, based on the type of object that\r
  it is and the other properties that it has.\r
</p>\r
<p>\r
  But the effective width and effective height, whether given by desiredSize or computed, are each constrained by the <a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a> and by the\r
  <a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a>. The minimum size takes precedence over the maximum size in case of conflict. For example, if the min width is 100 and max is 50, the effective width will be 100.\r
</p>\r
<p>\r
  The size for a GraphObject in a Table <a href="../api/symbols/Panel.html" target="api">Panel</a> may also be constrained by the width of the column and the height of the row that the object is in.\r
</p>\r
<p>\r
  By resizing the boxes and changing the <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> property in the sample below, you can get a feel for how sizing is computed with GraphObjects. The light purple box is the actual size of the object after applying these properties.\r
  There will be more about stretching in the <a href="#StretchingOfGraphObjects">Stretching of GraphObjects</a> section of this page, but note that the stretch property only has an effect when there is no desiredSize.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h3 id="StretchingOfGraphObjects"><a class="not-prose heading-anchor" href="#StretchingOfGraphObjects">Stretching of GraphObjects</a></h3>\r
<p>\r
  When you specify a <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> value other than <a href="../api/symbols/Stretch.html#none" target="api">Stretch.None</a>, the object will stretch or contract to fill the available space. However,\r
  the <a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a> and <a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a> properties still limit the size.\r
</p>\r
<p>\r
  But setting the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (or equivalently, the <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and/or <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>) will cause any stretch value\r
  to be ignored.\r
</p>\r
<p>In the following examples the left column is constrained to have a width of 200.</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  To summarize, the order of precedence is:\r
  <ul>\r
    <li><a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a>:\r
      <strong>No matter what, the GraphObject's size cannot be <em>smaller</em> than minSize.</strong>\r
      If minSize is greater than maxSize, minSize takes precedence.\r
      If minSize is greater than desiredSize, minSize takes precedence.\r
    </li>\r
    <li><a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a>:\r
      <strong>Unless minSize is greater than maxSize, the GraphObject's size cannot be <em>greater</em> than maxSize.</strong>\r
      If maxSize is smaller than desiredSize, the size will be constrained to maxSize.\r
      If there is a stretch value but maxSize is smaller than the container to stretch to, the size will be constrained to maxSize.\r
    </li>\r
    <li><a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>:\r
      <strong>desiredSize will be the object's size unless it conflicts with minSize or maxSize.</strong>\r
      If desiredSize is set to a real number (not <code>NaN</code>), any GraphObject.stretch is ignored. The desiredSize takes precedence over any stretch values.\r
    </li>\r
    <li><a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a>:\r
      The size will stretch to the container, provided that minSize is not greater than the container's size and maxSize is not smaller than the container's size. Stretch values are entirely ignored when desiredSize/width/height is set to a real number.\r
    </li>\r
  </ul>\r
  The width values are constrained independently of the height values. For example, if desiredSize is set to <code>(50, NaN)</code> and stretch is set to <code>Stretch.Fill</code>, the size will be constrained to 50 in width, but will stretch to fit the height of the container.\r
</p>\r
\r
<h2 id="StretchAndAlignment"><a class="not-prose heading-anchor" href="#StretchAndAlignment">Stretch and alignment</a></h2>\r
<p>\r
  The size of a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> in a <a href="../api/symbols/Panel.html" target="api">Panel</a> is determined by many factors. The <a href="../api/symbols/GraphObject.html#stretch" target="api">GraphObject.stretch</a> property specifies whether the width and/or\r
  height should take up all of the space given to it by the Panel. When the width and/or height is not stretched to fill the given space, the\r
  <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a> property controls where the object is placed if it is smaller than available space. One may also stretch the width while aligning\r
  vertically, just as one may also stretch vertically while aligning along the X axis.\r
</p>\r
<p>\r
  The alignment value for a GraphObject, if not given by the value of <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a>, may be inherited. If the object is in a Table Panel, the\r
  value may inherit from the RowColumnDefinitions of the row and of the column that the object is in. Finally the value may be inherited from the\r
  <a href="../api/symbols/Panel.html#defaultalignment" target="api">Panel.defaultAlignment</a> property.\r
</p>\r
<p>\r
  If you specify a fill stretch (horizontal or vertical or both) and an alignment, the alignment will be ignored. Basically if an object is exactly the size\r
  that is available to it, there is only one position for it, so all alignments are the same.\r
</p>\r
\r
<h3 id="AlignmentOfShapes"><a class="not-prose heading-anchor" href="#AlignmentOfShapes">Alignment of Shapes</a></h3>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  When the element is larger than the available space, the <a href="../api/symbols/GraphObject.html#alignment" target="api">GraphObject.alignment</a>\r
  property still controls where the element is positioned. However, the element will be clipped to fit.\r
</p>\r
<p>\r
  To make things clearer, we have made the shape stroke thicker in the following example.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h3 id="MeasuredAndActualSizes"><a class="not-prose heading-anchor" href="#MeasuredAndActualSizes">Measured and actual sizes</a></h3>\r
<p>\r
  Every GraphObject also has a <a href="../api/symbols/GraphObject.html#measuredbounds" target="api">GraphObject.measuredBounds</a>, which describes how big the object seems to be, and a <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a>, which\r
  describes the position and size of an object. These read-only properties take into account any non-zero <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> or non-unitary\r
  <a href="../api/symbols/GraphObject.html#scale" target="api">GraphObject.scale</a>. These measurements are in the containing <a href="../api/symbols/Panel.html" target="api">Panel</a>'s coordinate system.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
<p>\r
  Note that the size of the regular, not scaled, shape is 52x52. The additional size is due to the thickness of the pen (<a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a>) used to outline the\r
  shape. Rotating or increasing the scale causes the 50x50 shape to actually take up significantly more space.\r
</p>\r
<p>\r
  To summarize: the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> (a.k.a. <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>) and the <a href="../api/symbols/GraphObject.html#naturalbounds" target="api">GraphObject.naturalBounds</a>\r
  are in the object's local coordinate system.\r
  The <a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a>, <a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a>, <a href="../api/symbols/GraphObject.html#margin" target="api">GraphObject.margin</a>, <a href="../api/symbols/GraphObject.html#measuredbounds" target="api">GraphObject.measuredBounds</a>, and <a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a>\r
  are all in the containing <a href="../api/symbols/Panel.html" target="api">Panel</a>'s coordinate system, or in document coordinates if there is no such panel because it is a <a href="../api/symbols/Part.html" target="api">Part</a>.\r
</p>\r
<ul>\r
  <li><a href="../api/symbols/GraphObject.html#naturalbounds" target="api">GraphObject.naturalBounds</a>:\r
    Size is determined only by minSize, maxSize, desiredSize and stretch.\r
    Position is always <code>(0, 0)</code>.\r
  </li>\r
  <li><a href="../api/symbols/GraphObject.html#measuredbounds" target="api">GraphObject.measuredBounds</a>:\r
    Size is determined by naturalBounds <em>and</em> taking into account angle and scale.\r
    Position takes into account angle and strokeWidth. It will be <code>(0, 0)</code> if the object's angle is 0 or a multiple of 90, and the strokeWidth is 0.\r
  </li>\r
  <li><a href="../api/symbols/GraphObject.html#actualbounds" target="api">GraphObject.actualBounds</a>:\r
    Size is the same as <a href="../api/symbols/GraphObject.html#measuredbounds" target="api">GraphObject.measuredBounds</a>.\r
    Position is the object's position in its surrounding panel. If there is another item above it in a panel, then the y value for measuredBounds will be greater than for actualBounds. Stroke width is also a factor.\r
  </li>\r
</ul>\r
`,codeBlocks:[{id:`shapeSizes`,code:`const tool = diagram.toolManager.resizingTool;\r
let currentStretch = go.Stretch.None;\r
\r
// container box width; also width of cards\r
const CONTAINER_W = 420;\r
\r
// ---------------------------------\r
// ------ Resizable boxes ----------\r
// ---------------------------------\r
diagram.nodeTemplate = new go.Node("Spot", {\r
  location: new go.Point(0, 0),\r
  locationSpot: go.Spot.TopLeft,\r
  resizable: true,\r
  movable: false,\r
  deletable: false,\r
  resizeObjectName: "RESIZEOBJECT",\r
  selectionAdorned: false\r
})\r
  .bind("zOrder")\r
  .add(\r
    new go.Shape("Rectangle", {\r
      name: "RESIZEOBJECT",\r
      fill: "transparent",\r
      strokeWidth: 2.5\r
    })\r
      .bind("stroke", "color")\r
      .bind("strokeDashArray", "dash")\r
      .bind("desiredSize", "size", go.Size.parse),\r
    // label: minSize, desiredSize, maxSize\r
    new go.TextBlock({\r
      name: "TEXT",\r
      // 0, 1 for bottom left. 12, -12 offset to give it some space\r
      alignment: new go.Spot(0, 1, 12, -12),\r
      alignmentFocus: go.Spot.BottomLeft,\r
      font: "bold 10px sans-serif"\r
    })\r
      .bind("text", "label")\r
      .bind("stroke", "color")\r
  );\r
\r
// ---------------------------------\r
// ------ Container box ------------\r
// ---------------------------------\r
const container = new go.Part("Spot", {\r
  location: new go.Point(0, 0),\r
  locationSpot: go.Spot.TopLeft,\r
  selectable: false, pickable: false\r
})\r
  .add(\r
    new go.Panel("Spot")\r
      .add(\r
        // Container rectangle\r
        new go.Shape("Rectangle", {\r
          fill: "white",\r
          stroke: "lightgray",\r
          strokeWidth: 2,\r
          width: CONTAINER_W, height: 260,\r
        }),\r
        // effective size rectangle\r
        new go.Shape("Rectangle", {\r
          name: "SHAPE",\r
          fill: "rgba(225, 174, 255, 0.4)",\r
          stroke: null,\r
          alignment: go.Spot.TopLeft,\r
          alignmentFocus: go.Spot.TopLeft\r
        })\r
      ),\r
    new go.TextBlock("container", {\r
      alignment: new go.Spot(0, 1, 12, -12),\r
      alignmentFocus: go.Spot.BottomLeft,\r
      font: "bold 10px sans-serif",\r
      stroke: "#777"\r
    })\r
  );\r
diagram.add(container);\r
\r
// ---------------------------------\r
// ------ Model --------------------\r
// ---------------------------------\r
diagram.model = new go.GraphLinksModel([\r
  {\r
    key: "MIN",\r
    label: "minSize",\r
    color: "forestgreen",\r
    dash: [4, 4],\r
    size: "110 80",\r
    zOrder: 1\r
  },\r
  {\r
    key: "DES",\r
    label: "desiredSize",\r
    color: "dodgerblue",\r
    dash: null,\r
    size: "200 140",\r
    zOrder: 2\r
  },\r
  {\r
    key: "MAX",\r
    label: "maxSize",\r
    color: "crimson",\r
    dash: [8, 4],\r
    size: "320 210",\r
    zOrder: 3\r
  }\r
]);\r
\r
// ---------------------------------\r
// ------ Info / buttons area ------\r
// ---------------------------------\r
const pControls = new go.Part("Vertical", {\r
  locationSpot: go.Spot.LeftCenter,\r
  location: new go.Point(450, 130),\r
  defaultAlignment: go.Spot.Left,\r
  selectable: false\r
});\r
// Top row with stretch buttons\r
const stretchRow = new go.Panel("Horizontal", {\r
  margin: new go.Margin(0, 0, 12, 0)\r
}).add(\r
  new go.TextBlock("graphObject.stretch: ", {\r
    font: "bold 12px sans-serif",\r
    width: 130\r
  })\r
);\r
const modes = [\r
  { text: "None", val: go.Stretch.None },\r
  { text: "Fill", val: go.Stretch.Fill },\r
  { text: "Horizontal", val: go.Stretch.Horizontal },\r
  { text: "Vertical", val: go.Stretch.Vertical }\r
];\r
// Stretch mode buttons\r
modes.forEach(m => {\r
  stretchRow.add(\r
    new go.Panel("Auto", {\r
      name: "BTN_" + m.text,\r
      cursor: "pointer",\r
      margin: new go.Margin(0, 4, 0, 0),\r
      click: () => {\r
        currentStretch = m.val;\r
        syncConstraints(false);\r
      }\r
    })\r
      .add(\r
        new go.Shape("RoundedRectangle", {\r
          name: "BG",\r
          strokeWidth: 0\r
        }),\r
        new go.TextBlock(m.text, {\r
          name: "TXT",\r
          margin: new go.Margin(4, 8, 4, 8),\r
          font: "11px sans-serif"\r
        })\r
      )\r
  );\r
});\r
pControls.add(stretchRow);\r
\r
const cfgs = [\r
  { label: "minSize", key: "MIN" },\r
  { label: "desiredSize", key: "DES" },\r
  { label: "maxSize", key: "MAX" },\r
  { label: "Effective Size", key: "REAL" }\r
];\r
\r
// ---------------------------------\r
// ------ Cards --------------------\r
// ---------------------------------\r
const COL_W = CONTAINER_W / 3;\r
\r
// add/remove button\r
function makeButton(c) {\r
  return new go.Panel("Auto", {\r
    cursor: "pointer",\r
    mouseEnter: (e, panel) => { panel.findObject("TOGGLE_ICON_" + c.key).font = "bold 19px sans-serif"; },\r
    mouseLeave: (e, panel) => { panel.findObject("TOGGLE_ICON_" + c.key).font = "bold 14px sans-serif"; },\r
    click: () => {\r
      diagram.commit((d) => {\r
        const n = d.findNodeForKey(c.key);\r
        n.visible = !n.visible;\r
      });\r
      syncConstraints(false);\r
    }\r
  }).add(\r
    new go.Shape("RoundedRectangle", {\r
      name: "TOGGLE_BG_" + c.key,\r
      strokeWidth: 0\r
    }),\r
    new go.Panel("Horizontal", { margin: new go.Margin(5, 12, 5, 12) }).add(\r
      new go.TextBlock("", {\r
        name: "TOGGLE_ICON_" + c.key,\r
        width: 20, height: 22,\r
        textAlign: "center",\r
        verticalAlignment: go.Spot.Center,\r
        font: "bold 14px sans-serif",\r
        margin: new go.Margin(0, 6, 0, 0)\r
      }),\r
      new go.TextBlock("", {\r
        name: "TOGGLE_TXT_" + c.key,\r
        font: "bold 12px sans-serif",\r
        width: 56\r
      })\r
    )\r
  );\r
}\r
\r
// minSize, desiredSize, maxSize cards\r
const topRow = new go.Panel("Table");\r
["MIN", "DES", "MAX"].forEach((key, i) => {\r
  topRow.getColumnDefinition(i).width = COL_W;\r
  const data = diagram.model.findNodeDataForKey(key);\r
  const label = cfgs.find(c => c.key === key).label;\r
  topRow.add(\r
    new go.Panel("Auto", {\r
      name: "CARD_" + key,\r
      column: i,\r
      stretch: go.Stretch.Fill,\r
      margin: new go.Margin(0, 4, 0, 4)\r
    }).add(\r
      new go.Shape("RoundedRectangle", {\r
        name: "CARD_BORDER_" + key,\r
        parameter1: 8,\r
        fill: "white",\r
        stroke: data.color,\r
        strokeWidth: 3,\r
        strokeDashArray: data.dash,\r
        stretch: go.Stretch.Fill\r
      }),\r
      new go.Panel("Vertical", {\r
        margin: new go.Margin(12, 10, 12, 10),\r
        defaultAlignment: go.Spot.Center\r
      }).add(\r
        // minSize, desiredSize, maxSize\r
        new go.TextBlock(label, {\r
          name: "TITLE_" + key,\r
          font: "bold 13px sans-serif",\r
          stroke: "#222",\r
          margin: new go.Margin(0, 0, 6, 0)\r
        }),\r
        // current size\r
        new go.TextBlock({\r
          name: "TXT_" + key,\r
          font: "12px monospace",\r
          stroke: "#444",\r
          margin: new go.Margin(0, 0, 10, 0)\r
        }),\r
        makeButton({ key })\r
      )\r
    )\r
  );\r
});\r
\r
// effective size card\r
const effective = new go.Panel("Auto", {\r
  stretch: go.Stretch.Horizontal,\r
  margin: new go.Margin(8, 4, 0, 4)\r
}).add(\r
  new go.Shape("RoundedRectangle", {\r
    name: "CARD_BORDER_REAL",\r
    parameter1: 8,\r
    fill: "rgba(225, 174, 255, 0.4)",\r
    strokeWidth: 0,\r
    stretch: go.Stretch.Fill\r
  }),\r
  new go.Panel("Horizontal", {\r
    margin: new go.Margin(10, 14, 10, 14),\r
    defaultAlignment: go.Spot.Center\r
  }).add(\r
    new go.TextBlock("Effective Size", {\r
      font: "bold 13px sans-serif",\r
      stroke: "#222",\r
      margin: new go.Margin(0, 10, 0, 0)\r
    }),\r
    // current size\r
    new go.TextBlock({\r
      name: "TXT_REAL",\r
      font: "12px monospace",\r
      stroke: "#444"\r
    })\r
  )\r
);\r
\r
const cardsRow = new go.Panel("Vertical", {\r
  width: CONTAINER_W,\r
}).add(topRow, effective);\r
pControls.add(cardsRow);\r
\r
// ---------------------------------\r
// ------ Hint message box ---------\r
// ---------------------------------\r
const hintBox = new go.Panel("Auto", {\r
  width: CONTAINER_W,\r
  margin: new go.Margin(14, 0, 0, 0)\r
}).add(\r
  new go.Shape("RoundedRectangle", {\r
    name: "HINT_BG",\r
    parameter1: 6,\r
    strokeWidth: 1.5,\r
    stretch: go.Stretch.Fill\r
  }),\r
  new go.Panel("Horizontal", {\r
    margin: new go.Margin(10, 12, 10, 12),\r
    defaultAlignment: go.Spot.Top\r
  }).add(\r
    new go.Shape("Rectangle", {\r
      name: "HINT_ACCENT",\r
      width: 4,\r
      strokeWidth: 0,\r
      stretch: go.Stretch.Vertical,\r
      margin: new go.Margin(0, 10, 0, 0)\r
    }),\r
    new go.TextBlock("", {\r
      name: "HINT_TXT",\r
      font: "12px sans-serif",\r
      width: CONTAINER_W - 64,\r
      wrap: go.Wrap.Fit\r
    })\r
  )\r
);\r
pControls.add(hintBox);\r
\r
diagram.add(pControls);\r
\r
// ---------------------------------\r
// ------ Math ---------------------\r
// ---------------------------------\r
const rw = n => n.resizeObject.width, rh = n => n.resizeObject.height;\r
\r
function getHint(min, des, max) {\r
  const stretchOn = currentStretch !== go.Stretch.None;\r
  const minW = min.visible ? rw(min) : 0;\r
  const minH = min.visible ? rh(min) : 0;\r
  const maxW = max.visible ? rw(max) : Infinity;\r
  const maxH = max.visible ? rh(max) : Infinity;\r
  const desW = des.visible ? rw(des) : null;\r
  const desH = des.visible ? rh(des) : null;\r
\r
  if (des.visible && stretchOn)\r
    return { warn: true, text: "Stretch does nothing while there is a desiredSize.\\nTry removing desiredSize" };\r
  if (min.visible && max.visible && (minW > maxW || minH > maxH))\r
    return { warn: true, text: "minSize is bigger than maxSize, so it wins." };\r
  if (des.visible && max.visible && (desW > maxW || desH > maxH))\r
    return { warn: true, text: "maxSize wins over desiredSize." };\r
  if (des.visible && min.visible && (desW < minW || desH < minH))\r
    return { warn: true, text: "minSize wins over desiredSize." };\r
  if (!des.visible && !stretchOn)\r
    return { warn: false, text: "No size set, so it stays at its natural size.\\n(but stays between min and max)" };\r
  if (!des.visible && stretchOn)\r
    return { warn: false, text: "Stretch is filling the container." };\r
  return { warn: false, text: "Size is desiredSize when it's between min and max." };\r
}\r
\r
function updateHintMessage(min, des, max) {\r
  const hint = getHint(min, des, max);\r
  const hintBg = pControls.findObject("HINT_BG");\r
  const hintTxt = pControls.findObject("HINT_TXT");\r
  hintBg.fill = hint.warn ? "#fff4d6" : "#eef3fb";\r
  hintBg.stroke = hint.warn ? "#e6a700" : "#9db8e0";\r
  hintTxt.stroke = hint.warn ? "#6a4e00" : "#33425e";\r
  hintTxt.text = hint.text;\r
  pControls.findObject("HINT_ACCENT").fill = hint.warn ? "#e6a700" : "#9db8e0";\r
}\r
\r
// visible nodes z order increased so the smallest node is on top\r
function filterZOrder(nodes) {\r
  nodes.filter(n => n.visible)\r
    .sort((a, b) => {\r
      return (b.resizeObject.width * b.resizeObject.height) - (a.resizeObject.width * a.resizeObject.height)\r
    }).forEach((n, i) => n.zOrder = i + 1);\r
}\r
\r
// selected stretch button is orange, others are lightgray\r
function stretchButtonColors(modes) {\r
  modes.forEach(m => {\r
    const btn = stretchRow.findObject("BTN_" + m.text);\r
    if (btn) {\r
      btn.findObject("BG").fill = m.val === currentStretch ? "orange" : "lightgray";\r
      btn.findObject("TXT").stroke = m.val === currentStretch ? "white" : "black";\r
    }\r
  });\r
}\r
\r
// when a property is disabled the card looks faded\r
function cardFadedWhenDisabled(node) {\r
  const faded = node.visible ? 1 : 0.45;\r
  cardsRow.findObject("CARD_BORDER_" + node.key).opacity = faded;\r
  cardsRow.findObject("TITLE_" + node.key).opacity = faded;\r
  cardsRow.findObject("TXT_" + node.key).opacity = faded;\r
}\r
\r
// Change enable and disable buttons color + symbol\r
function enableDisableButtonUpdate(node) {\r
  const bg = cardsRow.findObject("TOGGLE_BG_" + node.key);\r
  bg.fill = node.visible ? "orange" : "lightgray";\r
  const icon = cardsRow.findObject("TOGGLE_ICON_" + node.key);\r
  icon.text = node.visible ? "✕" : "＋";\r
  icon.stroke = node.visible ? "white" : "#333";\r
  const txt = cardsRow.findObject("TOGGLE_TXT_" + node.key);\r
  txt.text = node.visible ? "Remove" : "Add";\r
  txt.stroke = node.visible ? "white" : "#333";\r
}\r
\r
function syncConstraints(isDragging) {\r
  // get the nodes for all 3 boxes\r
  const nodes = ["MIN", "DES", "MAX"].map(k => diagram.findNodeForKey(k));\r
  const [min, des, max] = nodes;\r
\r
  if (!isDragging) diagram.startTransaction("sync");\r
  // if it IS dragging, the ResizingTool handles the transaction\r
\r
  filterZOrder(nodes); // smallest node on top\r
  stretchButtonColors(modes); // selected stretch button is orange, others are lightgray\r
\r
  nodes.forEach(n => {\r
    // Change enable and disable buttons color + symbol\r
    enableDisableButtonUpdate(n);\r
\r
    cardFadedWhenDisabled(n);\r
\r
    // Boxes' text hides if the box is too small\r
    const tb = n.findObject("TEXT");\r
    tb.visible = n.resizeObject.width >= 85 && n.resizeObject.height >= 30;\r
  });\r
\r
  const box = container.findObject("SHAPE"); // effective size box\r
\r
  // Update size & stretch of effective size box\r
  box.minSize = min.visible ? new go.Size(rw(min), rh(min)) : new go.Size(0, 0);\r
  box.maxSize = max.visible ? new go.Size(rw(max), rh(max)) : new go.Size(NaN, NaN);\r
  box.desiredSize = des.visible ? new go.Size(rw(des), rh(des)) : new go.Size(NaN, NaN);\r
  // Pretend default size is 100,100\r
  if (!des.visible && currentStretch !== go.Stretch.Fill) {\r
    if (currentStretch === go.Stretch.None || currentStretch === go.Stretch.Horizontal) {\r
      box.height = 100;\r
    }\r
    if (currentStretch === go.Stretch.None || currentStretch === go.Stretch.Vertical) {\r
      box.width = 100;\r
    }\r
  }\r
  box.stretch = currentStretch;\r
  container.ensureBounds(); // force measure so naturalBounds is current\r
\r
  // Update size text\r
  const formatSize = (node, fallback) => {\r
    if (node.visible) {\r
      return \`\${Math.round(rw(node))} x \${Math.round(rh(node))}\`\r
    } else return fallback\r
  };\r
\r
  cardsRow.findObject("TXT_MIN").text = formatSize(min, "0 x 0");\r
  cardsRow.findObject("TXT_DES").text = formatSize(des, "NaN x NaN");\r
  cardsRow.findObject("TXT_MAX").text = formatSize(max, "NaN x NaN");\r
  cardsRow.findObject("TXT_REAL").text = \`\${Math.round(box.naturalBounds.width)} x \${Math.round(box.naturalBounds.height)}\`;\r
\r
  if (!isDragging) {\r
    updateHintMessage(min, des, max);\r
    diagram.commitTransaction("sync");\r
  }\r
}\r
\r
\r
// syncConstraints as you resize a box\r
const baseMouseMove = tool.doMouseMove;\r
tool.doMouseMove = function() {\r
  baseMouseMove.call(tool);\r
  syncConstraints(true);\r
};\r
diagram.addDiagramListener("PartResized", () => syncConstraints(false));\r
\r
diagram.addDiagramListener("InitialLayoutCompleted", () => syncConstraints(false));`,isExecutable:!0,animation:!1,hideCode:!0,minHeight:500,language:`js`,initiallyVisible:!0},{id:`stretchSizes`,code:`const nodeDataArray = [\r
  {\r
    stretch: go.Stretch.Horizontal,\r
    text: "stretch: Horizontal\\nno minSize\\nno maxSize",\r
    color: "seagreen"\r
  },\r
  {\r
    stretch: go.Stretch.Horizontal,\r
    minSize: new go.Size(150, 24),\r
    text: "stretch: Horizontal\\nmin: 150 x 24",\r
    color: "seagreen"\r
  },\r
  {\r
    stretch: go.Stretch.Horizontal,\r
    maxSize: new go.Size(50, 24),\r
    text: "stretch: Horizontal\\nmax: 50 x 24",\r
    color: "crimson"\r
  },\r
  {\r
    stretch: go.Stretch.Horizontal,\r
    minSize: new go.Size(150, 24),\r
    maxSize: new go.Size(50, 24),\r
    text: "stretch: Horizontal\\nmin: 150 x 24\\nmax: 50 x 24",\r
    color: "crimson"\r
  },\r
  {\r
    stretch: go.Stretch.Horizontal,\r
    desiredSize: new go.Size(100, 24),\r
    text: "desired width & stretch\\nignore stretch",\r
    color: "goldenrod"\r
  },\r
];\r
\r
diagram.nodeTemplate = new go.Node("Auto", {\r
  })\r
  .add(\r
    new go.Shape("RoundedRectangle", {\r
      fill: "whitesmoke",\r
      stroke: "lightgray",\r
      parameter1: 6\r
    }),\r
\r
    new go.Panel("Table", {\r
      margin: new go.Margin(10, 14)\r
    })\r
      .addColumnDefinition(0, { width: 200 })\r
      .addColumnDefinition(1, { width: 16 })\r
      .add(\r
        new go.Shape("RoundedRectangle", {\r
          row: 0, column: 0,\r
          strokeWidth: 0,\r
          // // Note that we don't set a width here\r
          // Setting desiredSize or width/height overrides stretch\r
          height: 24,\r
          parameter1: 4,\r
          alignment: go.Spot.Left\r
        })\r
          .bind("stretch")\r
          .bind("fill", "color")\r
          .bind("minSize")\r
          .bind("maxSize")\r
          .bind("desiredSize"),\r
\r
        new go.TextBlock({\r
          row: 0, column: 2,\r
          font: "500 12px monospace",\r
          stroke: "dimgray",\r
          alignment: go.Spot.LeftCenter,\r
          textAlign: "left",\r
          spacingBelow: 5, spacingAbove: 5,\r
        })\r
          .bind("text", "alignment", a => "alignment: " + a)\r
          .bind("text", "text")\r
      )\r
  );\r
\r
diagram.model = new go.Model(nodeDataArray);\r
\r
diagram.layout = new go.GridLayout({ wrappingColumn: 1, spacing: new go.Size(0, 20) });`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`shapeAlignment`,code:`const nodeDataArray = [\r
  { alignment: "Left" },\r
  { alignment: "Center" },\r
  { alignment: "Right" },\r
  { stretch: go.Stretch.Horizontal, text: "stretch: Horizontal" },\r
  { alignment: "Right", stretch: go.Stretch.Horizontal, text: "stretch: Horizontal\\n(ignore alignment)" }\r
];\r
\r
diagram.nodeTemplate = new go.Node("Auto")\r
  .add(\r
    new go.Shape("RoundedRectangle", {\r
      fill: "whitesmoke",\r
      stroke: "lightgray",\r
      parameter1: 6\r
    }),\r
\r
    new go.Panel("Table", {\r
      margin: new go.Margin(10, 14)\r
    })\r
      .addColumnDefinition(0, { width: 200 })\r
      .addColumnDefinition(1, { width: 16 })\r
      .add(\r
        new go.Shape("RoundedRectangle", {\r
          row: 0, column: 0,\r
          fill: "black",\r
          strokeWidth: 0,\r
          // // Note that we don't set a width here\r
          // Setting desiredSize or width/height overrides stretch\r
          height: 24,\r
          parameter1: 4,\r
        })\r
          .bind("alignment", "alignment", go.Spot.parse)\r
          .bind("stretch")\r
          .bind("fill", "stretch", s => "seagreen"),\r
\r
        new go.TextBlock({\r
          row: 0, column: 2,\r
          font: "500 12px monospace",\r
          stroke: "dimgray",\r
          alignment: go.Spot.LeftCenter,\r
          textAlign: "left",\r
          spacingBelow: 5, spacingAbove: 5,\r
        })\r
          .bind("text", "alignment", a => "alignment: " + a)\r
          .bind("text", "text")\r
      )\r
  );\r
\r
diagram.model = new go.Model(nodeDataArray);\r
\r
diagram.layout = new go.GridLayout({ wrappingColumn: 1, spacing: new go.Size(0, 20) });`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`bigShapeAlignment`,code:`const nodeDataArray = [\r
  { alignment: "Left" },\r
  { alignment: "Center" },\r
  { alignment: "Right" }\r
];\r
\r
diagram.nodeTemplate = new go.Node("Auto")\r
  .add(\r
    // background\r
    new go.Shape("RoundedRectangle", {\r
      fill: "whitesmoke",\r
      stroke: "lightgray",\r
      parameter1: 6\r
    }),\r
\r
    new go.Panel("Table", {\r
      margin: new go.Margin(10, 14)\r
    })\r
      .addColumnDefinition(0, { width: 200 })\r
      .addColumnDefinition(1, { width: 16 })\r
      .add(\r
        // the shape whose alignment we're looking at\r
        new go.Shape("RoundedRectangle", {\r
          row: 0, column: 0,\r
          fill: "seagreen",\r
          stroke: "darkslategrey", strokeWidth: 3,\r
          height: 24, width: 300, // bigger than the column\r
          parameter1: 10,\r
        })\r
          .bind("alignment", "alignment", go.Spot.parse),\r
\r
        new go.TextBlock({\r
          row: 0, column: 2,\r
          font: "500 12px monospace",\r
          stroke: "dimgray",\r
          alignment: go.Spot.LeftCenter,\r
          textAlign: "left",\r
          spacingBelow: 5, spacingAbove: 5,\r
        })\r
          .bind("text", "alignment", a => "big obj alignment: " + a)\r
      )\r
  ),\r
\r
diagram.model = new go.Model(nodeDataArray);\r
\r
diagram.layout = new go.GridLayout({ wrappingColumn: 1, spacing: new go.Size(0, 20) });`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`sizedShapes`,code:`function getSizeString(s) {\r
  return \`\${s.width.toFixed(2)}x\${s.height.toFixed(2)} ... (\${Math.round(s.x)}, \${Math.round(s.y)})\`;\r
}\r
\r
diagram.scale = 0.8;\r
diagram.model = new go.Model([\r
  { color: "#3b82f6", title: "Regular" }, // default angle is 0\r
  { color: "#f43f5e", angle: 30, title: "Angle: 30" }, // default scale is 1\r
  { color: "#f43f5e", scale: 1.5, title: "Scale: 1.5" },\r
  { color: "#3b82f6", scale: 1.5, angle: 30, title: "Scale: 1.5, Angle: 30" }\r
])\r
\r
diagram.nodeTemplate = new go.Node("Auto")\r
.add(\r
  // border\r
  new go.Shape("RoundedRectangle", {\r
    stroke: "lightgray",\r
    strokeWidth: 2,\r
    fill: "white"\r
  }),\r
  // contents\r
  new go.Panel("Vertical", {\r
    margin: 10,\r
    defaultAlignment: go.Spot.Left\r
  }).add(\r
    new go.Shape("Club", {\r
      name: "SHAPE",\r
      background: "whitesmoke",\r
      height: 50, width: 50,\r
      strokeWidth: 2,\r
      margin: new go.Margin(0,0,10,0),\r
      alignment: go.Spot.Center\r
    })\r
      .bind("fill", "color")\r
      .bind("stroke", "color", c => go.Brush.mix(c, "black"))\r
      .bind("angle")\r
      .bind("scale"),\r
    new go.TextBlock({\r
      font: "bold 20px sans-serif",\r
      margin: new go.Margin(0,0,10,0),\r
      alignment: go.Spot.Center\r
    })\r
      .bind("text", "title"),\r
    new go.TextBlock({\r
      font: "13px sans-serif",\r
      margin: new go.Margin(0,0,5,0)\r
    })\r
      .bindObject("text", "naturalBounds", b => "naturalBounds: "+getSizeString(b), null, "SHAPE"),\r
    new go.TextBlock({\r
      font: "13px sans-serif",\r
      margin: new go.Margin(0,0,5,0)\r
    })\r
      .bindObject("text", "measuredBounds", b => "measuredBounds: "+getSizeString(b), null,  "SHAPE"),\r
    new go.TextBlock({\r
      font: "13px sans-serif"\r
    })\r
      .bindObject("text", "actualBounds", b => "actualBounds: "+getSizeString(b), null, "SHAPE"),\r
  )\r
)\r
\r
// cause bindings to be evaluated after Shapes are measured\r
diagram.addDiagramListener("InitialLayoutCompleted", e => { diagram.updateAllTargetBindings(); });`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1o1wfmi`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};