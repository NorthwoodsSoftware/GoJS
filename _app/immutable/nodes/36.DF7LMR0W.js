import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Layers`},htmlContent:`<h1>Layers and z-ordering</h1>\r
<p>\r
  All <a href="../api/symbols/Part.html" target="api">Part</a>s that are in a <a href="../api/symbols/Diagram.html" target="api">Diagram</a> actually belong to a <a href="../api/symbols/Layer.html" target="api">Layer</a> in the diagram. You can control the visibility, Z-order, and various user\r
  permissions for all of the parts in each layer.\r
</p>\r
\r
<p>\r
  Parts can be individually modified to toggle their visibility using <a href="../api/symbols/Part.html#visible" target="api">Part.visible</a> or <a href="../api/symbols/Part.html#opacity" target="api">Part.opacity</a>. Parts can be individually Z-ordered within\r
  layers using <a href="../api/symbols/Part.html#zorder" target="api">Part.zOrder</a>.\r
</p>\r
\r
<h2 id="StandardLayers"><a class="not-prose heading-anchor" href="#StandardLayers">Standard Layers</a></h2>\r
<p>\r
  Every Diagram starts off with several standard layers. These are their <a href="../api/symbols/Layer.html#name" target="api">Layer.name</a>s, in order from furthest behind to most in front:\r
</p>\r
<ul>\r
  <li><b>"Grid"</b>: holds the <a href="../api/symbols/Diagram.html#grid" target="api">Diagram.grid</a> and any other static Parts that you wish to be behind everything</li>\r
  <li><b>"ViewportBackground"</b>: holds Parts aligned to the viewport rather than in the document</li>\r
  <li><b>"Background"</b>: behind the default layer</li>\r
  <li><b>""</b>: the default layer</li>\r
  <li><b>"Foreground"</b>: in front of the default layer</li>\r
  <li><b>"ViewportForeground"</b>: holds Parts aligned to the viewport rather than in the document</li>\r
  <li><b>"Adornment"</b>: holds <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s for selection and various Tools</li>\r
  <li><b>"Tool"</b>: holds Parts used in the execution of various Tools</li>\r
</ul>\r
<p>\r
  The Layers "ViewportBackground" and "ViewportForeground" are for adding Parts that do not move with the Diagram scale or position. Because they are aligned to\r
  the viewport and not the diagram, such Parts stay fixed to a specific point in the viewport. See the <a href="legends#StaticParts">legends learn page</a> for more\r
  discussion.\r
</p>\r
<p>\r
  Each Part is placed in a Layer according to its <a href="../api/symbols/Part.html#layername" target="api">Part.layerName</a>. The default value is the empty string. Use <a href="../api/symbols/Diagram.html#findlayer" target="api">Diagram.findLayer</a> to find a Layer\r
  given a layer name. Change which layer a part is in by setting <a href="../api/symbols/Part.html#layername" target="api">Part.layerName</a>.\r
</p>\r
<p>\r
  Changes to Parts in the "Grid", "Adornment", "Tool", and "Viewport..." Layers are automatically ignored by the <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a>, because\r
  <a href="../api/symbols/Layer.html#istemporary" target="api">Layer.isTemporary</a> is true. Those Parts are also not selectable.\r
</p>\r
\r
<h2 id="LayersExample"><a class="not-prose heading-anchor" href="#LayersExample">Layers example</a></h2>\r
<p>\r
  This example adds several <a href="../api/symbols/Layer.html" target="api">Layer</a>s to the diagram, each named by suit, and then creates a bunch of playing card nodes at random locations. Every\r
  <a href="../api/symbols/Part.html#layername" target="api">Part.layerName</a> is data-bound to the "suit" property of the node data.\r
</p>\r
<p>\r
  In addition there are checkboxes for each layer, controlling the visibility of the respective layer. You can see how all of the cards of the same suit appear\r
  and disappear according to the value of the checkbox. Furthermore you can see how they all have the same depth in the Z-ordering.\r
</p>\r
<p>\r
  Finally, each card has a <a href="../api/symbols/Part.html#selectionchanged" target="api">Part.selectionChanged</a> function which puts the part in the "Foreground" layer when it is selected and back in its normal suit\r
  layer when it is not selected.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="ZOrderExample"><a class="not-prose heading-anchor" href="#ZOrderExample">zOrder example</a></h2>\r
<p>\r
  This example adds several resizable application window <a href="../api/symbols/Node.html" target="api">Node</a>s to one Layer (the default) in the diagram.\r
  Every <a href="../api/symbols/Node.html#zorder" target="api">Node.zOrder</a> is data-bound to the "zOrder" property of the node data, as is its text.\r
</p>\r
<p>\r
  Buttons on the Nodes can be used to modify the z-order of each.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
`,codeBlocks:[{id:`layers`,code:`// These new layers come in front of the standard regular layers,\r
// but behind the "Foreground" layer:\r
const forelayer = diagram.findLayer("Foreground");\r
diagram.addLayerBefore(new go.Layer({ name: "Hearts" }), forelayer);\r
diagram.addLayerBefore(new go.Layer({ name: "Diamonds" }), forelayer);\r
diagram.addLayerBefore(new go.Layer({ name: "Clubs" }), forelayer);\r
diagram.addLayerBefore(new go.Layer({ name: "Spades" }), forelayer);\r
\r
// Playing card node template\r
diagram.nodeTemplate =\r
  new go.Node("Spot", {\r
    selectionChanged: p => {\r
      p.layerName = (p.isSelected ? "Foreground" : p.data.suit);\r
    }\r
  })\r
    .bind("layerName", "suit")\r
    .bind("location", "loc")\r
    .bind("angle")\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        width: 70, height: 100, fill: "white", stroke: "lightgray"\r
      }),\r
      // Text block for the suit symbol\r
      new go.TextBlock({ font: "bold 44px serif" })\r
        .bind("text", "symbol")\r
        .bind("stroke", "color"),\r
      // Text blocks for the cards rank\r
      new go.TextBlock({\r
        alignment: new go.Spot(0, 0, 7, 5),\r
        alignmentFocus: go.Spot.TopLeft,\r
        margin: 4, font: "bold 14px serif"\r
      })\r
        .bind("text", "rank")\r
        .bind("stroke", "color"),\r
      new go.TextBlock({\r
        alignment: new go.Spot(1, 1, -7, -5),\r
        alignmentFocus: go.Spot.BottomRight,\r
        margin: 4, font: "bold 14px serif"\r
      })\r
        .bind("text", "rank")\r
        .bind("stroke", "color")\r
    );\r
\r
// Suits with their symbol and color\r
const suits = [\r
  { suit: "Hearts", symbol: "♥", color: "crimson" },\r
  { suit: "Diamonds", symbol: "♦", color: "crimson" },\r
  { suit: "Clubs", symbol: "♣", color: "black" },\r
  { suit: "Spades", symbol: "♠", color: "black" }\r
];\r
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];\r
\r
// Draws 16 cards and randomly positions them on the diagram\r
function drawCards() {\r
  const array = [];\r
  const suitRanks = {\r
    "Hearts": ranks.slice(),\r
    "Diamonds": ranks.slice(),\r
    "Clubs": ranks.slice(),\r
    "Spades": ranks.slice()\r
  }\r
  for (let i = 0; i < 16; i++) {\r
    // Only pick unused cards\r
    const available = suits.filter(s => suitRanks[s.suit].length > 0);\r
    if (available.length === 0) break;\r
    const s = available[Math.floor(Math.random()*available.length)];\r
    const remaining = suitRanks[s.suit];\r
    const rank =\r
      remaining.splice(Math.floor(Math.random()*remaining.length), 1)[0];\r
    array.push({ ...s, rank, loc: new go.Point(Math.random()*520,\r
      Math.random()*200), angle: (Math.random()*40 - 20) });\r
  }\r
  diagram.model.nodeDataArray = array;\r
  diagram.zoomToFit();\r
\r
  const spread = new go.Animation();\r
  spread.duration = 500;\r
  const center = diagram.documentBounds.center;\r
  diagram.nodes.each(n => {\r
    spread.add(n, "location", center, n.location);\r
  });\r
  spread.start();\r
}\r
handleDraw = () => drawCards();\r
\r
diagram.model = new go.GraphLinksModel();\r
drawCards();\r
diagram.undoManager.isEnabled = true;\r
diagram.initialAutoScale = go.AutoScale.Uniform;\r
\r
// Define this function so that the checkbox event handlers can call it\r
toggleVisible = (layername, e) => {\r
  diagram.commit(d => {\r
    const layer = d.findLayer(layername);\r
    if (layer !== null) layer.visible = e.currentTarget.checked;\r
  }, 'toggle ' + layername);\r
};`,isExecutable:!0,animation:!1,html:`
<div style="display: flex; align-items: center; justify-content: space-between;">
  Layer visibility:
  <button type="button" onclick=handleDraw()>Draw Cards</button>
</div>
<div>
  <input type="checkbox" checked="checked" onclick="toggleVisible('Hearts', event)" />Hearts
  <input type="checkbox" checked="checked" onclick="toggleVisible('Diamonds', event)" />Diamonds
  <input type="checkbox" checked="checked" onclick="toggleVisible('Clubs', event)" />Clubs
  <input type="checkbox" checked="checked" onclick="toggleVisible('Spades', event)" />Spades
  <input type="checkbox" checked="checked" onclick="toggleVisible('Foreground', event)" />Foreground
</div>
`,language:`js`,initiallyVisible:!0},{id:`zOrder`,code:`// Function to change zOrder of node\r
function changeZOrder(amt, obj) {\r
  diagram.commit(d => {\r
    const data = obj.part.data;\r
    d.model.set(data, "zOrder", data.zOrder + amt);\r
  }, 'modified zOrder');\r
}\r
\r
// Creates top left window buttons\r
function trafficLight(fill, leftMargin) {\r
  return [\r
    new go.Shape("Circle", {\r
      width: 11, height: 11, strokeWidth: 0, fill: "#ff5f57",\r
      margin: new go.Margin(0, 0, 0, 0)\r
    }),\r
    new go.Shape("Circle", {\r
      width: 11, height: 11, strokeWidth: 0, fill: "#febc2e",\r
      margin: new go.Margin(0, 0, 0, 6)\r
    }),\r
    new go.Shape("Circle", {\r
      width: 11, height: 11, strokeWidth: 0, fill: "#28c840",\r
      margin: new go.Margin(0, 0, 0, 6)\r
    })\r
  ]\r
}\r
\r
// Creates application window style node\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    isShadowed: true,\r
    shadowBlur: 12,\r
    shadowOffset: new go.Point(0, 6),\r
    shadowColor: "rgba(0,0,0,0.25)",\r
    resizable: true,\r
    resizeObjectName: "SHAPE",\r
    // Change shadow color when selected\r
    selectionAdorned: false,\r
    selectionChanged: n => n.shadowColor = n.isSelected\r
      ? "rgba(66, 135, 245,0.3)" : "rgba(0,0,0,0.25)"\r
  })\r
    .bind("location", "loc")\r
    .bind("zOrder")\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        parameter1: 12, fill: "white", stroke: "#d8d8dd", strokeWidth: 1\r
      }),\r
      new go.Panel("Vertical", {\r
        width: 168, name: "SHAPE", minSize: new go.Size(100, 40)\r
      })\r
        .bindTwoWay("width")\r
        .bindTwoWay("height")\r
        .add(\r
          // Window title bar\r
          new go.Panel("Horizontal", {\r
            stretch: go.Stretch.Horizontal, alignment: go.Spot.Left,\r
            padding: new go.Margin(9, 12)\r
          })\r
            .add(\r
              ...trafficLight(),\r
              new go.TextBlock({\r
                margin: new go.Margin(0, 0, 0, 12),\r
                font: "600 11px sans-serif", stroke: "#8a8a8f"\r
              })\r
                .bind("text", "name")\r
            ),\r
          new go.Shape("LineH", {\r
            stretch: go.Stretch.Horizontal, height: 1,\r
            strokeWidth: 1, stroke: "#ececec"\r
          }),\r
          // Data-bound zOrder, number displayed in center\r
          new go.TextBlock({\r
            margin: new go.Margin(16, 0, 2, 0),\r
            font: "600 40px sans-serif", stroke: "#1d1d1f"\r
          })\r
            .bind("text", "zOrder"),\r
          new go.TextBlock("z-order", {\r
            margin: new go.Margin(0, 0, 10, 0),\r
            font: "14px sans-serif", stroke: "#a1a1a6"\r
          }),\r
          // Buttons to adjust zOrder\r
          new go.Panel("Horizontal", { margin: new go.Margin(0, 0, 12, 0) })\r
            .add(\r
              go.GraphObject.build("Button", {\r
                margin: new go.Margin(0, 5, 0, 0),\r
                click: (e, obj) => changeZOrder(-1, obj),\r
                "ButtonBorder.fill": "white"\r
              })\r
                .add(\r
                  new go.Shape("TriangleDown", {\r
                    width: 10, height: 10, strokeWidth: 0, fill: "#6b7280"\r
                  })\r
                ),\r
              go.GraphObject.build("Button", {\r
                click: (e, obj) => changeZOrder(1, obj),\r
                "ButtonBorder.fill": "white"\r
              })\r
                .add(\r
                  new go.Shape("TriangleUp", {\r
                    width: 10, height: 10, strokeWidth: 0, fill: "#6b7280"\r
                  })\r
                )\r
            )\r
        )\r
    );\r
\r
// Creates an invisible resize handle to change cursors\r
function resizeHandle(spot, cursor) {\r
  return new go.Shape({\r
    alignment: spot, cursor: cursor,\r
    desiredSize: new go.Size(10, 10),\r
    fill: "transparent", stroke: "transparent"\r
  });\r
}\r
\r
diagram.nodeTemplate.resizeAdornmentTemplate =\r
  new go.Adornment("Spot")\r
    .add(\r
      new go.Placeholder(),\r
      resizeHandle(go.Spot.TopLeft, "nwse-resize"),\r
      resizeHandle(go.Spot.Top, "ns-resize"),\r
      resizeHandle(go.Spot.TopRight, "nesw-resize"),\r
      resizeHandle(go.Spot.Left, "ew-resize"),\r
      resizeHandle(go.Spot.Right, "ew-resize"),\r
      resizeHandle(go.Spot.BottomLeft, "nesw-resize"),\r
      resizeHandle(go.Spot.Bottom, "ns-resize"),\r
      resizeHandle(go.Spot.BottomRight, "nwse-resize")\r
    );\r
\r
const appNames = ["Files", "Notes", "Mail", "Photos", "Music", "Calendar",\r
  "Maps", "Browser", "Reminders", "Preview", "Clock", "Stocks"];\r
\r
const array = [];\r
for (let i = 0; i < 12; i++) {\r
  array.push({\r
    name: appNames[i],\r
    loc: new go.Point(Math.random()*500, Math.random()*200),\r
    zOrder: Math.floor(Math.random()*20),\r
    width: 138 + Math.random()*60,\r
    height: 140\r
  });\r
}\r
diagram.model = new go.GraphLinksModel(array);\r
diagram.undoManager.isEnabled = true;\r
diagram.initialAutoScale = go.AutoScale.Uniform;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`3ytlz6`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};