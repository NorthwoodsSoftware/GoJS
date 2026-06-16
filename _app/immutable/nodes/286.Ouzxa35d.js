import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Venn Diagram`,indexDescription:`Venn Diagram of Common Glyphs in Greek, Latin, and Russian`,screenshot:`venn`,priority:2,tags:[`customlayout`,`circularlayout`],description:`Venn diagram showing common characters of two or three alphabets, using either CircularLayout or PackedLayout.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:600px"></div>\r
  <p>\r
    <button onclick="lgr()">Greek, Latin, and Russian</button>\r
    <button onclick="lg()">Greek and Latin</button>\r
    <button onclick="gr()">Greek and Russian</button>\r
    <button onclick="lr()">Latin and Russian</button>\r
  </p>\r
  <p>\r
    <button onclick="circular()">Circular Layout</button>\r
    <button onclick="packed()">Packed Layout</button>\r
  </p>`,jsCode:`/**\r
 * \r
 * This Venn-style layout handles two or three sets of nodes, where each node.data object\r
 * has a "sets" property that is an Array listing which "Set"s the node belongs in.\r
 * The model should also hold a category: "Set" node data object for each collection\r
 * that is represented by a circular Shape.\r
 *\r
 * The name of the data property is given by the setsProperty property and defaults to "sets".\r
 * The value must be an Array of keys of the "Set"s.\r
 *\r
 * To arrange the collection of nodes in each "Set" intersection, you can either use\r
 * the default CircularLayout or you can use a different one such as PackedLayout.\r
 * Set the intersectionLayout property to determine the Layout to use.\r
 *\r
 * The spacing property, default zero, can provide extra space between each intersection collection.\r
 *\r
 * The circleName and labelName properties declare which GraphObject in the "Set" is a "Circle" Shape\r
 * and which GraphObject is the label to be aligned relative to the "Circle" Shape.\r
 * The names default to "SHAPE" and "LABEL" respectively.\r
 */\r
class VennLayout extends go.Layout {\r
  _sets = null;\r
  _bins = null;\r
  _setsProperty = "sets";\r
  _circleName = "SHAPE";\r
  _labelName = "LABEL";\r
  _intersectionLayout = new go.CircularLayout({ arrangement: go.CircularArrangement.Packed, spacing: 0 });\r
  _spacing = 0;\r
\r
  constructor(init) {\r
    super();\r
    if (init) Object.assign(this, init);\r
  }\r
\r
  // Gets or sets the name of the node data property holding an Array of keys to the "Set"s of which the node is a member.\r
  // This defaults to "sets".\r
  get setsProperty() { return this._setsProperty; }\r
  set setsProperty(name) {\r
    if (name !== this.setsProperty) {\r
      this._setsProperty = name;\r
      this.invalidateLayout();\r
    }\r
  }\r
\r
  // Gets or sets the GraphObject.name of the "Circle" Shape in Nodes of "Set" category.\r
  // This defaults to "SHAPE".\r
  get circleName() { return this._circleName; }\r
  set circleName(name) {\r
    if (name !== this.circleName) {\r
      this._circleName = name;\r
      this.invalidateLayout();\r
    }\r
  }\r
\r
  // Gets or sets the GraphObject.name of the "Circle" Shape in Nodes of "Set" category.\r
  // This defaults to "LABEL".\r
  get labelName() { return this._labelName; }\r
  set labelName(name) {\r
    if (name !== this.labelName) {\r
      this._labelName = name;\r
      this.invalidateLayout();\r
    }\r
  }\r
\r
  // Gets or sets the Layout to use for each collection of nodes.\r
  // This defaults to CircularLayout.\r
  get intersectionLayout() { return this._intersectionLayout; }\r
  set intersectionLayout(lay) {\r
    if (lay !== this.intersectionLayout) {\r
      this._intersectionLayout = lay;\r
      this.invalidateLayout();\r
    }\r
  }\r
\r
  // Gets or sets the minimum distance between intersection collections.\r
  // This may want to be larger than zero when the intersections are laid out in a rectangular fashion,\r
  // since the circles of the "Set"s will tend to intersect with the corners of rectangles.\r
  // This defaults to 0.\r
  get spacing() { return this._spacing; }\r
  set spacing(sp) {\r
    if (sp !== this.spacing) {\r
      this._spacing = sp;\r
      this.invalidateLayout();\r
    }\r
  }\r
\r
  doLayout(coll) {\r
    if (coll === this.diagram) {\r
      coll = this.diagram.nodes.filter(n => n.isVisible());\r
    } else if (coll instanceof go.Group) {\r
      coll = coll.memberParts.filter(p => p.isVisible() && !(p instanceof go.Link));\r
    } else {\r
      coll = coll.filter(p => p.isVisible() && !(p instanceof go.Link));\r
    }\r
    this._sets = new go.Map();\r
    // first generate an array of the keys that name the "Sets"\r
    const setarr = [];\r
    coll.each(n => {\r
      if (n.category === "Set") {\r
        const key = n.key;\r
        this._sets.add(key, { members: [], key: key, node: n });\r
        setarr.push(key);\r
      }\r
    });\r
    // build tree structure with all combinations\r
    this._bins = this._buildBin(setarr, 0, []);\r
    // for each node that is not a "Set", add to bin corresponding to node.data.sets array of keys\r
    coll.each(n => {\r
      if (n.category === "Set") return;\r
      const a = n.data[this.setsProperty];\r
      if (!Array.isArray(a)) return;\r
      a.forEach(k => {\r
        const setinfo = this._sets.get(k);\r
        if (setinfo) {\r
          setinfo.members.push(n);\r
        } else {\r
          // be tolerant of superfluous Set membership information -- ignore it\r
          // throw new Error("unknown set: " + k + " for node " + n.key);\r
        }\r
      });\r
      this._walkBin(this._bins,\r
        intinfo => {\r
          const a = n.data[this.setsProperty];\r
          return Array.isArray(a) && a.indexOf(intinfo.key) >= 0\r
        },\r
        intinfo => {\r
          const a = n.data[this.setsProperty];\r
          return Array.isArray(a) && a.indexOf(intinfo.key) < 0\r
        },\r
        intinfo => intinfo.members.push(n));\r
    });\r
    // compute how big each laid-out collection of nodes in each intersection is\r
    let maxdia = 0.0;\r
    this._walkBin(this._bins, null, null, intinfo => {\r
      this._layoutIntersection(intinfo);\r
      const bounds = this.diagram.computePartsBounds(intinfo.members);\r
      intinfo.center = bounds.center;\r
      maxdia = Math.max(maxdia, Math.max(bounds.width + this.spacing/2, bounds.height + this.spacing/2));\r
    });\r
    // position the "Set"s\r
    // their diameters should depend on the maximum size of the intersection collections after their layout\r
    let i = 1;\r
    const dia = maxdia * this._sets.count;\r
    this._sets.iteratorValues.each(setinfo => {\r
      const shp = setinfo.node.findObject(this.circleName);\r
      if (shp) shp.desiredSize = new go.Size(dia, dia);\r
      const lab = setinfo.node.findObject(this.labelName);\r
      if (i === 1) {\r
        if (lab) { lab.alignment = new go.Spot(0.14, 0.14); lab.alignmentFocus = go.Spot.BottomRight; }\r
        setinfo.node.location = new go.Point(0, 0); i++;\r
      } else if (i === 2) {\r
        if (lab) { lab.alignment = new go.Spot(0.86, 0.14); lab.alignmentFocus = go.Spot.BottomLeft; }\r
        setinfo.node.location = new go.Point(dia / 2, 0); i++;\r
      } else if (i === 3) {\r
        if (lab) { lab.alignment = go.Spot.Bottom; lab.alignmentFocus = go.Spot.Top; }\r
        setinfo.node.location = new go.Point(dia / 4, 0.86 * dia / 2); i++;\r
      } else if (i > 3) {\r
        throw new Error("too many sets: " + i);\r
      }\r
    });\r
    // position the intersection collections\r
    const center = this._average(setarr);\r
    this._walkBin(this._bins, null, null, intinfo => {\r
      const avg = this._average(intinfo.path);\r
      const c = intinfo.center;\r
      intinfo.members.forEach(n => {\r
        const dst = new go.Point(center.x + 2 * (avg.x - center.x), center.y + 2 * (avg.y - center.y));\r
        n.moveTo(dst.x + n.location.x - c.x, dst.y + n.location.y - c.y, true);\r
      });\r
    });\r
  };\r
\r
  _buildBin(arr, idx, path) {\r
    if (idx < arr.length) {\r
      const k = arr[idx];\r
      const t = { key: k };\r
      t[false] = this._buildBin(arr, idx + 1, path);\r
      path.push(k);\r
      t[true] = this._buildBin(arr, idx + 1, path);\r
      path.pop();\r
      return t;\r
    } else {\r
      return {\r
        members: [],\r
        path: path.slice(),\r
        size: new go.Size()\r
      };\r
    }\r
  };\r
\r
  _walkBin(bins, present, absent, leaf) {\r
    if (Array.isArray(bins.members)) {\r
      if (leaf) leaf(bins);\r
    } else {\r
      const k = bins.key;\r
      if (!present || present(bins)) {\r
        this._walkBin(bins[true], present, absent, leaf);\r
      }\r
      if (!absent || absent(bins)) {\r
        this._walkBin(bins[false], present, absent, leaf);\r
      }\r
    }\r
  };\r
\r
  _layoutIntersection(intinfo) {\r
    const arr = intinfo.members;\r
    const coll = new go.List().addAll(arr);\r
    this._intersectionLayout.doLayout(coll);\r
  };\r
\r
  _average(keys) {\r
    const len = keys.length;\r
    let x = 0.0;\r
    let y = 0.0;\r
    for (let i = 0; i < len; i++) {\r
      const key = keys[i];\r
      const node = this._sets.get(key).node;\r
      if (i === 0) {\r
        x = node.location.x;\r
        y = node.location.y;\r
      } else {\r
        x += node.location.x;\r
        y += node.location.y;\r
      }\r
    }\r
    if (len > 0) {\r
      x = x / len;\r
      y = y / len;\r
    }\r
    return new go.Point(x, y);\r
  }\r
}\r
// end VennLayout\r
\r
\r
function init() {\r
  myDiagram = new go.Diagram("myDiagramDiv", {\r
    "animationManager.isEnabled": false,\r
    layout: new VennLayout()\r
  });\r
\r
  // this should have a "Circle" Shape named "SHAPE" and may have a label named "LABEL"\r
  myDiagram.nodeTemplateMap.add("Set",\r
    new go.Node("Spot", {\r
        locationSpot: go.Spot.Center, locationObjectName: "SHAPE",\r
        layerName: "Background",\r
        selectable: false\r
      })\r
      .add(\r
        new go.Shape("Circle", { name: "SHAPE", fill: "transparent" }),\r
        new go.TextBlock({ name: "LABEL", font: "bold 12pt sans-serif" })\r
          .bind("text")\r
      ));\r
\r
  myDiagram.nodeTemplate =\r
    new go.Node({ locationSpot: go.Spot.Center })\r
      .add(\r
        new go.TextBlock()\r
          .bind("text")\r
      );\r
\r
  // The model should have category "Set" data for each overall collection,\r
  // and each element node data should have a "sets" property that is an Array\r
  // holding the keys of those "Set"s.\r
  myDiagram.model = new go.GraphLinksModel([\r
    { key: "G", text: "Greek", category: "Set" },\r
    { key: "L", text: "Latin", category: "Set" },\r
    { key: "R", text: "Russian", category: "Set" },\r
    { text: "A", sets: ["G", "L", "R"] },\r
    { text: "B", sets: ["G", "L", "R"] },\r
    { text: "C", sets: ["L", "R"] },\r
    { text: "D", sets: ["L"] },\r
    { text: "E", sets: ["G", "L", "R"] },\r
    { text: "F", sets: ["L"] },\r
    { text: "G", sets: ["L"] },\r
    { text: "H", sets: ["G", "L", "R"] },\r
    { text: "I", sets: ["G", "L"] },\r
    { text: "J", sets: ["L"] },\r
    { text: "K", sets: ["G", "L", "R"] },\r
    { text: "L", sets: ["L"] },\r
    { text: "M", sets: ["G", "L", "R"] },\r
    { text: "N", sets: ["G", "L"] },\r
    { text: "O", sets: ["G", "L", "R"] },\r
    { text: "P", sets: ["G", "L", "R"] },\r
    { text: "Q", sets: ["L"] },\r
    { text: "R", sets: ["L"] },\r
    { text: "S", sets: ["L"] },\r
    { text: "T", sets: ["G", "L", "R"] },\r
    { text: "U", sets: ["L"] },\r
    { text: "V", sets: ["L"] },\r
    { text: "W", sets: ["L"] },\r
    { text: "X", sets: ["G", "L", "R"] },\r
    { text: "Y", sets: ["G", "L", "R"] },\r
    { text: "Z", sets: ["G", "L"] },\r
    { text: "Γ", sets: ["G", "R"] },\r
    { text: "Δ", sets: ["G"] },\r
    { text: "Θ", sets: ["G"] },\r
    { text: "Λ", sets: ["G"] },\r
    { text: "Ξ", sets: ["G"] },\r
    { text: "Π", sets: ["G", "R"] },\r
    { text: "Σ", sets: ["G"] },\r
    { text: "Φ", sets: ["G", "R"] },\r
    { text: "Ψ", sets: ["G"] },\r
    { text: "Ω", sets: ["G"] },\r
    { text: "Б", sets: ["R"] },\r
    { text: "Д", sets: ["R"] },\r
    { text: "Ж", sets: ["R"] },\r
    { text: "З", sets: ["R"] },\r
    { text: "И", sets: ["R"] },\r
    { text: "Л", sets: ["R"] },\r
    { text: "Ц", sets: ["R"] },\r
    { text: "Ч", sets: ["R"] },\r
    { text: "Ш", sets: ["R"] },\r
    { text: "Щ", sets: ["R"] },\r
    { text: "Ъ", sets: ["R"] },\r
    { text: "Ы", sets: ["R"] },\r
    { text: "Ь", sets: ["R"] },\r
    { text: "Э", sets: ["R"] },\r
    { text: "Ю", sets: ["R"] },\r
    { text: "Я", sets: ["R"] }\r
  ]);\r
}\r
\r
\r
function lgr() {  // make all Nodes visible\r
  myDiagram.commit(d => {\r
    d.nodes.each(n => n.visible = true);\r
  });\r
}\r
\r
function setVisibleIf(a, b) {\r
  myDiagram.commit(d => {\r
    d.nodes.each(n => {\r
      if (n.category === "Set") {\r
        n.visible = n.key === a || n.key === b;\r
      } else {\r
        n.visible = n.data.sets.indexOf(a) >= 0 || n.data.sets.indexOf(b) >= 0;\r
      }\r
    });\r
  });\r
}\r
\r
function lg() { setVisibleIf("L", "G"); }\r
function gr() { setVisibleIf("G", "R"); }\r
function lr() { setVisibleIf("L", "R"); }\r
\r
function circular() {\r
  myDiagram.commit(d => {\r
    d.layout.intersectionLayout = new go.CircularLayout({ arrangement: go.CircularArrangement.Packed, spacing: 0 })\r
    d.layout.spacing = 0;\r
  });\r
}\r
\r
function packed() {\r
  myDiagram.commit(d => {\r
    d.layout.intersectionLayout = new PackedLayout({ spacing: 0 });\r
    d.layout.spacing = 20;\r
  });\r
}\r
\r
window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Quadtree.js`,`../extensions/PackedLayout.js`],descriptionHtml:`<p>\r
    Venn Diagram of Greek, Latin, and Russian Glyphs\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`customlayout`,`circularlayout`];var g=y();l(`6iccoa`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};