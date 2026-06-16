import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Genogram Family Tree Diagram, with Custom Layout, Printing, Downloading SVG`,titleShort:`Genogram Family Tree`,indexDescription:`A genogram or pedigree chart is an extended family tree diagram that show information about each person or each relationship.`,screenshot:`genogram`,priority:.8,tags:[`itemarrays`,`collections`,`layered-digraph`,`customlayout`,`geometries`,`commands`],description:`A genogram is a family tree diagram for visualizing hereditary patterns.`},htmlContent:`<div style="position:relative">\r
    <div id="myDiagramDiv" style="background-color: #F8F8F8; border: solid 1px black; width:100%; height:600px;"></div>\r
    <div \r
      id="myInspectorDiv" class="inspector" \r
      style="display:none; z-index:99; position:absolute; padding: 8px; background-color: hsl(var(--card, 60 4.8% 95.9%));\r
      color: hsl(var(--card-foreground, 20 14.3% 4.1%)); border: 1px solid hsl(var(--border, 24 5.7% 82.9%));"\r
    ></div>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="myPrintButton">Print</button>\r
    <button id="myDownloadButton">Download SVG</button>\r
    <button id="myScrollToProband">Scroll to Proband</button>\r
  </div>\r
  <!-- the rest is just for demonstration -->\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton">Save</button>\r
    <button id="myLoadButton">Load</button>\r
    Diagram model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width:100%;height:250px">\r
{ "class": "GraphLinksModel",\r
"copiesArrays": true,\r
"pointsDigits": 1,\r
"linkLabelKeysProperty": "labelKeys",\r
"modelData": {"proband":4},\r
"nodeDataArray": [\r
{"key":0,"name":"Aaron","sex":"M","mother":-10,"father":-11,"birth":"","death":"","note":"","a":["A123","B74","D85","G4"]},\r
{"key":1,"name":"Alice","sex":"F","mother":-12,"father":-13,"birth":"","death":"","note":"","a":["B74","C12","D85","V4"]},\r
{"key":2,"name":"Bob","sex":"M","mother":1,"father":0,"birth":"","death":"","note":"","a":["E92","F4"]},\r
{"key":3,"name":"Barbara","sex":"F","mother":"","father":"","birth":"","death":"","note":"","a":["D99","M23"]},\r
{"key":4,"name":"Bill","sex":"M","mother":1,"father":0,"birth":"","death":"","note":"","a":["A6","B3"]},\r
{"key":5,"name":"Brooke","sex":"F","mother":"","father":"","birth":"","death":"","note":"","a":["A2"]},\r
{"key":6,"name":"Claire","sex":"F","mother":1,"father":0,"birth":"","death":"","note":"","a":["B34","G4"]},\r
{"key":7,"name":"Carol","sex":"F","mother":1,"father":0,"birth":"","death":"","note":"","a":["C23123","G4"]},\r
{"key":8,"name":"Chloe","sex":"F","mother":1,"father":0,"birth":"","death":"","note":"","a":["A123","Dev97","G4"]},\r
{"key":9,"name":"Chris","sex":"M","mother":"","father":"","birth":"","death":"","note":"","a":["C23123","E234","H54"]},\r
{"key":10,"name":"Ellie","sex":"F","mother":3,"father":2,"birth":"","death":"","note":"","a":["D99","F4","G0594"]},\r
{"key":11,"name":"Dan","sex":"M","mother":3,"father":2,"birth":"","death":"","note":"","a":["F4","G1212"]},\r
{"key":12,"name":"Elizabeth","sex":"F","mother":"","father":"","birth":"","death":"","note":"","a":["H"]},\r
{"key":13,"name":"David","sex":"M","mother":5,"father":4,"birth":"","death":"","note":"","a":["A2342","B3"]},\r
{"key":14,"name":"Emma","sex":"F","mother":5,"father":4,"birth":"","death":"","note":"","a":["B3"]},\r
{"key":15,"name":"Evan","sex":"M","mother":8,"father":9,"birth":"","death":"","note":"","a":["A123","CV9569"]},\r
{"key":16,"name":"Ethan","sex":"M","mother":8,"father":9,"birth":"","death":"","note":"","a":["A123","D343","G4"]},\r
{"key":17,"name":"Eve","sex":"F","mother":"","father":"","birth":"","death":"","note":"","a":["E509468"]},\r
{"key":18,"name":"Emily","sex":"F","mother":8,"father":9,"birth":"","death":"","note":"","a":["F68","G","H"]},\r
{"key":19,"name":"Fred","sex":"M","mother":17,"father":16,"birth":"","death":"","note":"","a":["C56","G345834058"]},\r
{"key":20,"name":"Faith","sex":"F","mother":17,"father":16,"birth":"","death":"","note":"","a":["H0452-a"]},\r
{"key":21,"name":"Felicia","sex":"F","mother":12,"father":13,"birth":"","death":"","note":"","a":["B3","A549"]},\r
{"key":22,"name":"Frank","sex":"M","mother":12,"father":13,"birth":"","death":"","note":"","a":["B349058","E867"]},\r
{"key":23,"name":"Castor","sex":"?","mother":12,"father":13,"birth":"","death":true,"reproduction":"MC","note":"","a":["B3","C23"]},\r
{"key":24,"name":"Nestor","sex":"?","mother":12,"father":13,"birth":"","death":true,"reproduction":"T","note":"","a":["D456"]},\r
{"key":27,"name":"Flora","sex":"F","mother":12,"father":13,"adopted":"in","birth":"","death":"","note":"","a":["E766"]},\r
{"key":28,"name":"Aurora","sex":"F","mother":12,"father":13,"adopted":"out","birth":"","death":"","note":"","a":["B3","F345"]},\r
{"key":70,"name":"Elsbeth","sex":"F","mother":3,"father":2,"birth":"","multiple":1,"death":"","note":"","a":["F4","D99","G0584"]},\r
{"key":71,"name":"Daneel","sex":"M","mother":3,"father":2,"birth":"","multiple":1,"death":"","note":"","a":["F4","G4","H567"]},\r
{"key":72,"name":"Tweedledee","sex":"M","mother":3,"father":2,"birth":"","multiple":2,"death":"","note":"","a":["F4","A37"]},\r
{"key":73,"name":"Tweedledum","sex":"M","mother":3,"father":2,"birth":"","multiple":2,"identical":72,"death":"","note":"","a":["F4","B54"]},\r
{"key":74,"name":"Tweedledoe","sex":"F","mother":3,"father":2,"birth":"","multiple":2,"death":"","note":"","a":["F4","D99","C305"]},\r
{"key":-10,"name":"Paternal Grandfather","sex":"M","mother":-33,"father":-32,"birth":"","death":true,"note":"","a":["D02934","G4"]},\r
{"key":-11,"name":"Paternal Grandmother","sex":"F","mother":"","father":"","birth":"","death":true,"note":"","a":["E5690"]},\r
{"key":-32,"name":"Paternal Great","sex":"M","mother":"","father":"","birth":"","death":true,"note":"","a":["F0834"]},\r
{"key":-33,"name":"Paternal Great","sex":"F","mother":"","father":"","birth":"","death":true,"note":"","a":["G294"]},\r
{"key":-40,"name":"Great Uncle","sex":"M","mother":-33,"father":-32,"birth":"","death":true,"note":"","a":["H45069","G4"]},\r
{"key":-41,"name":"Great Aunt","sex":"F","mother":-33,"father":-32,"birth":"","death":true,"note":"","a":["A2"]},\r
{"key":-20,"name":"Uncle","sex":"M","mother":-11,"father":-10,"birth":"","death":"","note":"","a":["B5408","G4"]},\r
{"key":-12,"name":"Maternal Grandfather","sex":"M","mother":"","father":"","birth":"","death":"","note":"","a":["C23894"]},\r
{"key":-13,"name":"Maternal Grandmother","sex":"F","mother":-31,"father":-30,"birth":"","death":"","note":"","a":["D23"]},\r
{"key":-21,"name":"Aunt","sex":"F","mother":-13,"father":-12,"birth":"","death":"","note":"","a":["E3405"]},\r
{"key":-22,"name":"Uncle","sex":"M","mother":"","father":"","birth":"","death":"","note":"","a":["F5408"]},\r
{"key":-23,"name":"Cousin","sex":"M","mother":-21,"father":-22,"birth":"","death":"","note":"","a":["G2173"]},\r
{"key":-30,"name":"Maternal Great","sex":"M","mother":"","father":"","birth":"","death":true,"note":"","a":["H34"]},\r
{"key":-31,"name":"Maternal Great","sex":"F","mother":-50,"father":-51,"birth":"","death":true,"note":"","a":["A34"]},\r
{"key":-42,"name":"Great Uncle","sex":"M","mother":-30,"father":-31,"birth":"","death":true,"note":"","a":["B997"]},\r
{"key":-43,"name":"Great Aunt","sex":"F","mother":-30,"father":-31,"birth":"","death":"","note":"","a":["C09568"]},\r
{"key":-50,"name":"Maternal Great Great","sex":"F","mother":"","father":"","birth":"","death":true,"note":"","a":["D68"]},\r
{"key":-51,"name":"Maternal Great Great","sex":"M","mother":"","father":"","birth":"","death":true,"note":"","a":["E568"]},\r
{"category":"MateLabel","key":-53},\r
{"category":"MateLabel","key":-54},\r
{"category":"MateLabel","key":-55},\r
{"category":"MateLabel","key":-56},\r
{"category":"MateLabel","key":-57},\r
{"category":"MateLabel","key":-58},\r
{"category":"MateLabel","key":-59},\r
{"category":"MateLabel","key":-60},\r
{"category":"MateLabel","key":-61},\r
{"category":"MateLabel","key":-62},\r
{"category":"MateLabel","key":-63},\r
{"category":"MateLabel","key":-64}\r
],\r
"linkDataArray": [\r
{"from":0,"to":1,"category":"Mate","labelKeys":[-53],"divorced":false},\r
{"from":2,"to":3,"category":"Mate","labelKeys":[-54],"divorced":false},\r
{"from":4,"to":5,"category":"Mate","labelKeys":[-55],"divorced":false},\r
{"from":8,"to":9,"category":"Mate","labelKeys":[-56],"divorced":false},\r
{"from":12,"to":13,"category":"Mate","labelKeys":[-57],"divorced":false},\r
{"from":17,"to":16,"category":"Mate","labelKeys":[-58],"divorced":false},\r
{"from":-10,"to":-11,"category":"Mate","labelKeys":[-59],"divorced":false},\r
{"from":-32,"to":-33,"category":"Mate","labelKeys":[-60],"divorced":false},\r
{"from":-12,"to":-13,"category":"Mate","labelKeys":[-61],"divorced":false},\r
{"from":-22,"to":-21,"category":"Mate","labelKeys":[-62],"divorced":false},\r
{"from":-30,"to":-31,"category":"Mate","labelKeys":[-63],"divorced":false},\r
{"from":-50,"to":-51,"category":"Mate","labelKeys":[-64],"divorced":false},\r
{"from":-59,"to":0},\r
{"from":-61,"to":1},\r
{"from":-53,"to":2},\r
{"from":-53,"to":4},\r
{"from":-53,"to":6},\r
{"from":-53,"to":7},\r
{"from":-53,"to":8},\r
{"from":-54,"to":10},\r
{"from":-54,"to":11},\r
{"from":-55,"to":13},\r
{"from":-55,"to":14},\r
{"from":-56,"to":15},\r
{"from":-56,"to":16},\r
{"from":-56,"to":18},\r
{"from":-58,"to":19},\r
{"from":-58,"to":20},\r
{"from":-57,"to":21},\r
{"from":-57,"to":22},\r
{"from":-57,"to":23},\r
{"from":-57,"to":24},\r
{"from":-57,"to":27},\r
{"from":-57,"to":28},\r
{"from":-54,"to":70},\r
{"from":-54,"to":71},\r
{"from":-54,"to":72},\r
{"from":-54,"to":73},\r
{"from":-54,"to":74},\r
{"from":-60,"to":-10},\r
{"from":-60,"to":-40},\r
{"from":-60,"to":-41},\r
{"from":-59,"to":-20},\r
{"from":-63,"to":-13},\r
{"from":-61,"to":-21},\r
{"from":-62,"to":-23},\r
{"from":-64,"to":-31},\r
{"from":-63,"to":-42},\r
{"from":-63,"to":-43}\r
]}\r
  </textarea>`,jsCode:`// A custom layout that shows the two families related to a person's parents\r
// This depends on the "Mate" category Link relating a mother and a father.\r
// Each such "Mate" Link must also have a label Node (of category "MateLabel")\r
// that is the source for Links of the default category connected to their children.\r
class GenogramLayout extends go.LayeredDigraphLayout {\r
  constructor(init) {\r
    super();\r
    this.MateCategory = "Mate";  // a Link category, for a link connecting the mother and father of children\r
    this.MateLabelCategory = "MateLabel";  // a Node category, for a node on a "Mate" link, connecting to children\r
    this.ChildCategory = "";  // the default Link category, for a link connecting a MateLabel node with a child node\r
    this.initializeOption = go.LayeredDigraphInit.DepthFirstIn;\r
    this.spouseSpacing = 30;  // minimum space between spouses\r
    this.isRouting = false;\r
    if (init) Object.assign(this, init);\r
  }\r
\r
  makeNetwork(coll) {\r
    // generate LayoutEdges for each parent-child Link\r
    const net = this.createNetwork();\r
    if (coll instanceof go.Diagram) {\r
      this.add(net, coll.nodes, true);\r
      this.add(net, coll.links, true);\r
    } else if (coll instanceof go.Group) {\r
      this.add(net, coll.memberParts, false);\r
    } else if (coll.iterator) {\r
      this.add(net, coll.iterator, false);\r
    }\r
    return net;\r
  }\r
\r
  // internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented\r
  // by a single LayeredDigraphVertex corresponding to the label Node on the "Mate" Link\r
  add(net, coll, nonmemberonly) {\r
    const horiz = this.direction == 0.0 || this.direction == 180.0;\r
    const multiSpousePeople = new go.Set();\r
    // consider all Nodes in the given collection\r
    const it = coll.iterator;\r
    while (it.next()) {\r
      const node = it.value;\r
      if (!(node instanceof go.Node) || !node.data) continue;\r
      if (!node.isLayoutPositioned || !node.isVisible()) continue;\r
      if (nonmemberonly && node.containingGroup !== null) continue;\r
      // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it\r
      if (node.isLinkLabel) {\r
        // get "Mate" Link\r
        const link = node.labeledLink;\r
        if (link.category === this.MateCategory) {\r
          const spouseA = link.fromNode;\r
          const spouseB = link.toNode;\r
          // create vertex representing both husband and wife\r
          const vertex = net.addNode(node);\r
          // now define the vertex size to be big enough to hold both spouses\r
          if (horiz) {\r
            vertex.height = spouseA.actualBounds.height + this.spouseSpacing + spouseB.actualBounds.height;\r
            vertex.width = Math.max(spouseA.actualBounds.width, spouseB.actualBounds.width);\r
            vertex.focus = new go.Point(vertex.width / 2, spouseA.actualBounds.height + this.spouseSpacing / 2);\r
          } else {\r
            vertex.width = spouseA.actualBounds.width + this.spouseSpacing + spouseB.actualBounds.width;\r
            vertex.height = Math.max(spouseA.actualBounds.height, spouseB.actualBounds.height);\r
            vertex.focus = new go.Point(spouseA.actualBounds.width + this.spouseSpacing / 2, vertex.height / 2);\r
          }\r
        }\r
      } else {\r
        // don't add a vertex for any married person!\r
        // instead, code above adds label node for "Mate" link\r
        // assume a "Mate" Link has a label Node\r
        let mates = this.countMates(node);\r
        if (mates === 0) {\r
          net.addNode(node);\r
        } else if (mates > 1) {\r
          multiSpousePeople.add(node);\r
        }\r
      }\r
    }\r
    // now do all Links\r
    it.reset();\r
    while (it.next()) {\r
      const link = it.value;\r
      if (!(link instanceof go.Link)) continue;\r
      if (!link.isLayoutPositioned || !link.isVisible()) continue;\r
      if (nonmemberonly && link.containingGroup !== null) continue;\r
      // if it's a parent-child link, add a LayoutEdge for it\r
      if (link.category === this.ChildCategory && link.data) {\r
        const parent = net.findVertex(link.fromNode);  // should be a label node\r
        const child = net.findVertex(link.toNode);\r
        if (child !== null) {  // an unmarried child\r
          net.linkVertexes(parent, child, link);\r
        } else {  // a married child\r
          link.toNode.linksConnected.each(l => {\r
            if (l.category !== this.MateCategory || !l.data) return;  // if it has no label node, it's a parent-child link\r
            // found the Mate Link, now get its label Node\r
            const mlab = l.labelNodes.first();\r
            // parent-child link should connect with the label node,\r
            // so the LayoutEdge should connect with the LayoutVertex representing the label node\r
            const mlabvert = net.findVertex(mlab);\r
            if (mlabvert !== null) {\r
              net.linkVertexes(parent, mlabvert, link);\r
            }\r
          });\r
        }\r
      }\r
    }\r
\r
    while (multiSpousePeople.count > 0) {\r
      // find all collections of people that are indirectly married to each other\r
      const node = multiSpousePeople.first();\r
      const cohort = new go.Set();\r
      this.extendCohort(cohort, node);\r
      const sorted = cohort.toArray();\r
      sorted.sort((a, b) => this.countMates(b) - this.countMates(a));\r
      const start = sorted[0];\r
      const map = new go.Map();\r
      this.walkMates(start, false, 1000000000, 500000000, map);\r
      sorted.sort((a, b) => map.get(a) - map.get(b));\r
      const verts = [];\r
      const seen = new go.Set();\r
      for (let i = 0; i < sorted.length-1; i++) {\r
        const n = sorted[i];\r
        n.linksConnected.each(l => {\r
          if (l.category === this.MateCategory) {\r
            const lab = l.labelNodes.first();\r
            if (lab) {\r
              const v = net.findVertex(lab);\r
              if (v && !seen.has(v)) {\r
                verts.push(v);\r
                seen.add(v);\r
              }\r
            }\r
          }\r
        })\r
      }\r
      // then encourage them all to be the same generation by connecting them all with a common vertex\r
      const dummyvert = net.createVertex();\r
      net.addVertex(dummyvert);\r
      for (let i = 0; i < verts.length; i++) {\r
        const v = verts[i];\r
        net.linkVertexes(dummyvert, v, null);\r
        // add pairings to try to keep the desired order\r
        if (i > 0) {\r
          const w = verts[i-1];\r
          const dummy = net.createVertex();\r
          net.addVertex(dummy);\r
          net.linkVertexes(dummy, w, null);\r
          net.linkVertexes(dummy, v, null);\r
          net.linkVertexes(dummy, w, null);\r
          net.linkVertexes(dummy, v, null);\r
        }\r
      }\r
      // done with these people, now see if there are any other multiple-married people\r
      multiSpousePeople.removeAll(cohort);\r
    }\r
  }\r
\r
  // collect all of the people indirectly married with a person\r
  extendCohort(coll, node) {\r
    if (coll.has(node)) return;\r
    coll.add(node);\r
    node.linksConnected.each(l => {\r
      if (l.category === this.MateCategory) {  // if it's a "Mate" link, continue with both spouses\r
        this.extendCohort(coll, l.fromNode);\r
        this.extendCohort(coll, l.toNode);\r
      }\r
    });\r
  }\r
\r
  // how many Mate relationships does this person have?\r
  countMates(node) {\r
    let count = 0;\r
    node.linksConnected.each(l => {\r
      if (l.category === this.MateCategory) count++;\r
    });\r
    return count;\r
  }\r
\r
  walkMates(node, side, val, level, map) {\r
    if (map.has(node)) return;\r
    map.set(node, val);\r
    const count = this.countMates(node);\r
    level /= 2;\r
    let idx = 0;\r
    node.linksConnected.each(l => {\r
      if (l.category === this.MateCategory) {\r
        const other = l.getOtherNode(node);\r
        if (map.has(other)) return;\r
        idx++;\r
        const newside = (idx <= count/2) ? side : !side;\r
        this.walkMates(other, newside, val + (newside ? level : -level), level, map);\r
      }\r
    });\r
  }\r
\r
  assignLayers() {\r
    super.assignLayers();\r
    const horiz = this.direction == 0.0 || this.direction == 180.0;\r
    // for every vertex, record the maximum vertex width or height for the vertex's layer\r
    const maxsizes = [];\r
    this.network.vertexes.each(v => {\r
      const lay = v.layer;\r
      let max = maxsizes[lay];\r
      if (max === undefined) maxsizes[lay] = max = 0;\r
      const sz = (horiz ? v.width : v.height);\r
      if (sz > max) maxsizes[lay] = sz;\r
    });\r
    // now make sure every vertex has the maximum width or height according to which layer it is in,\r
    // and aligned on the left (if horizontal) or the top (if vertical)\r
    this.network.vertexes.each(v => {\r
      const lay = v.layer;\r
      const max = maxsizes[lay];\r
      if (horiz) {\r
        v.focus = new go.Point(0, v.height / 2);\r
        v.width = max;\r
      } else {\r
        v.focus = new go.Point(v.width / 2, 0);\r
        v.height = max;\r
      }\r
    });\r
    // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is\r
    // (other than the ones that are the widest or tallest in their respective layer).\r
  }\r
\r
  initializeIndices() {\r
    super.initializeIndices();\r
    const vertical = this.direction === 90 || this.direction === 270;\r
    this.network.edges.each(e => {\r
      if (e.fromVertex.node && e.fromVertex.node.isLinkLabel) {\r
        e.portFromPos = vertical ? e.fromVertex.focusX : e.fromVertex.focusY;\r
      }\r
      if (e.toVertex.node && e.toVertex.node.isLinkLabel) {\r
        e.portToPos = vertical ? e.toVertex.focusX : e.toVertex.focusY;\r
      }\r
    });\r
\r
    // get all vertexes for each layer\r
    var layers = [];  // Array of Arrays of LayeredDigraphVertexes\r
    this.network.vertexes.each(v => {\r
      var lay = v.layer;\r
      if (layers[lay] === undefined) {\r
        layers[lay] = [v];\r
      } else {\r
        layers[lay].push(v);\r
      }\r
    });\r
\r
    // Order the children so that twins/triplets are more likely to be together.\r
    // now sort them in each layer how you like\r
    layers.forEach(a => {\r
      a.sort((v, w) => {\r
        const vbirth = this.findMultipleBirth(v);\r
        const wbirth = this.findMultipleBirth(w);\r
        if (vbirth < wbirth) return -1;\r
        if (vbirth > wbirth) return 1;\r
        return 0;\r
      });\r
      a.forEach((v, i) => v.index = i);\r
    });\r
  }\r
\r
  // get the birth order for a person; assume zero if there is no data.multiple property value\r
  findMultipleBirth(v) {\r
    const node = v.node;\r
    if (node && node.data) {\r
      if (node.category === this.MateLabelCategory) {\r
        const link = node.labeledLink;\r
        if (link) {\r
          const fn = link.fromNode;\r
          if (fn && fn.data && fn.data.multiple !== undefined) return fn.data.multiple;\r
          const tn = link.toNode;\r
          if (tn && tn.data && tn.data.multiple !== undefined) return tn.data.multiple;\r
        }\r
      } else {\r
        if (node.data.multiple !== undefined) return node.data.multiple;\r
      }\r
    }\r
    return 0;\r
  }\r
\r
  commitNodes() {\r
    super.commitNodes();\r
    // position regular nodes\r
    this.network.vertexes.each(v => {\r
      if (v.node !== null && !v.node.isLinkLabel) {\r
        v.node.position = new go.Point(v.x, v.y);\r
      }\r
    });\r
    const horiz = this.direction == 0.0 || this.direction == 180.0;\r
    // position the spouses of each "Mate" vertex\r
    this.network.vertexes.each(v => {\r
      if (v.node === null) return;\r
      if (!v.node.isLinkLabel) return;\r
      const labnode = v.node;\r
      const lablink = labnode.labeledLink;\r
      // In case the spouses are not actually moved, we need to have the "Mate" link\r
      // position the label node, because LayoutVertex.commit() was called above on these vertexes.\r
      // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.\r
      lablink.invalidateRoute();\r
      let spouseA = lablink.fromNode;\r
      let spouseB = lablink.toNode;\r
      if (spouseA.opacity > 0 && spouseB.opacity > 0) {\r
        // maybe swap if multiple mates are on the other side\r
        const labA = this.findOtherMateLinkLabelNode(spouseA, lablink);\r
        const labB = this.findOtherMateLinkLabelNode(spouseB, lablink);\r
        if (labA) {\r
          const vA = this.network.findVertex(labA);\r
          if (vA && vA.x > v.x) {\r
            const temp = spouseA; spouseA = spouseB; spouseB = temp;\r
          }\r
        } else if (labB) {\r
          const vB = this.network.findVertex(labB);\r
          if (vB && vB.x < v.x) {\r
            const temp = spouseA; spouseA = spouseB; spouseB = temp;\r
          }\r
        }\r
        spouseA.moveTo(v.x, v.y);\r
        if (horiz) {\r
          spouseB.moveTo(v.x, v.y + spouseA.actualBounds.height + this.spouseSpacing);\r
        } else {\r
          spouseB.moveTo(v.x + spouseA.actualBounds.width + this.spouseSpacing, v.y);\r
        }\r
      } else if (spouseA.opacity === 0) {\r
        const pos = horiz\r
          ? new go.Point(v.x, v.centerY - spouseB.actualBounds.height / 2)\r
          : new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);\r
        spouseB.move(pos);\r
        if (horiz) pos.y++; else pos.x++;\r
        spouseA.move(pos);\r
      } else if (spouseB.opacity === 0) {\r
        const pos = horiz\r
          ? new go.Point(v.x, v.centerY - spouseA.actualBounds.height / 2)\r
          : new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);\r
        spouseA.move(pos);\r
        if (horiz) pos.y++; else pos.x++;\r
        spouseB.move(pos);\r
      }\r
    });\r
  }\r
\r
  findOtherMateLinkLabelNode(node, link) {\r
    const it = node.linksConnected;\r
    while (it.next()) {\r
      const l = it.value;\r
      if (l.category === this.MateCategory && l !== link) return l.labelNodes.first();\r
    }\r
    return null;\r
  }\r
}  // end GenogramLayout class\r
\r
// custom routing for same multiple birth siblings\r
class TwinLink extends go.Link {\r
  computePoints() {\r
    var result = super.computePoints();\r
    var pts = this.points;\r
    if (pts.length >= 4) {\r
      var birthId = this.toNode.data["multiple"];\r
      if (birthId) {\r
        var parents = this.fromNode;\r
        var sameBirth = 0;\r
        var sumX = 0;\r
        var it = parents.findNodesOutOf();\r
        while (it.next()) {\r
          var child = it.value;\r
          if (child.data["multiple"] === birthId) {\r
            sameBirth++;\r
            sumX += child.location.x;\r
          }\r
        }\r
        if (sameBirth > 0 && !isNaN(sumX)) {\r
          var midX = sumX / sameBirth;\r
          var oldp = pts.elt(pts.length - 3);\r
          pts.setElt(pts.length - 3, new go.Point(midX, oldp.y));\r
          pts.setElt(pts.length - 2, pts.elt(pts.length - 1));\r
        }\r
      }\r
    }\r
    return result;\r
  }\r
}  // end TwinLink class\r
\r
// Navigation functions\r
\r
function findParents(node) {  // returns an Array of zero or two Nodes\r
  const parents = [];\r
  if (!(node instanceof go.Node)) return parents;\r
  const parent = node.findTreeParentNode();\r
  if (parent && parent.category === parent.diagram.layout.MateLabelCategory) {\r
    const link = parent.labeledLink;\r
    if (link) {\r
      const from = link.fromNode;\r
      if (from) parents.push(from);\r
      const to = link.toNode;\r
      if (to) parents.push(to);\r
    }\r
  }\r
  return parents;\r
}\r
\r
function findMates(node) {  // returns an Array of Nodes\r
  const mates = [];\r
  if (!(node instanceof go.Node)) return mates;\r
  node.findLinksConnected().each(link => {\r
    if (link.category === link.diagram.layout.MateCategory) {\r
      mates.push(link.getOtherNode(node));\r
    }\r
  });\r
  // ??? sort this collection\r
  return mates;\r
}\r
\r
function findChildren(node, mate) {  // only children with mate; returns an Array of Nodes\r
  const children = [];\r
  node.findLinksConnected().each(link => {\r
    if (link.category === link.diagram.layout.MateCategory &&\r
        (!mate || link.getOtherNode(node) === mate)) {\r
      link.labelNodes.each(label => {\r
        if (label.category === label.diagram.layout.MateLabelCategory) {\r
          label.findNodesOutOf().each(child => {\r
            children.push(child);\r
          });\r
        }\r
      });\r
    }\r
  });\r
  // ??? sort this collection\r
  return children;\r
}\r
\r
// initialize the Diagram, including its templates\r
function init() {\r
  myDiagram = new go.Diagram("myDiagramDiv", {\r
    isReadOnly: true,\r
    // initial Diagram.scale will cause viewport to include the whole diagram\r
    initialAutoScale: go.AutoScale.Uniform,\r
    "animationManager.isInitial": false,\r
    "toolManager.hoverDelay": 100,  // quicker tooltips\r
    // if you want to limit how many Nodes or Links the user could select at one time\r
    maxSelectionCount: 1,\r
    "ChangedSelection": e => {\r
      const selnode = e.diagram.selection.first();\r
      // show the Inspector panel just below the selected Node\r
      const insp = document.getElementById("myInspectorDiv");\r
      if (selnode) {\r
        if (insp) {\r
          const dp = selnode.getDocumentPoint(go.Spot.BottomRight);\r
          const vp = e.diagram.transformDocToView(dp);\r
          insp.style.left = vp.x + "px";\r
          insp.style.top = vp.y + "px";\r
          insp.style.display = "block";\r
        }\r
      } else {\r
        if (insp) insp.style.display = "none";\r
      }\r
    },\r
    // use a custom layout, defined above\r
    layout:\r
      new GenogramLayout({ isInitial: false, direction: 90, layerSpacing: 20, columnSpacing: 10 }),\r
  });\r
\r
  // when the document is modified, add a "*" to the title and enable the "Save" button\r
  myDiagram.addDiagramListener("Modified", e => {\r
    const button = document.getElementById("SaveButton");\r
    if (button) button.disabled = !myDiagram.isModified;\r
    const idx = document.title.indexOf("*");\r
    if (myDiagram.isModified) {\r
      if (idx < 0) document.title += "*";\r
    } else {\r
      if (idx >= 0) document.title = document.title.slice(0, idx);\r
    }\r
  });\r
\r
  // conversion functions for the attribute/marker shapes\r
\r
  function computeFill(attr) {\r
    switch (attr[0].toUpperCase()) {\r
      case "A": return '#5d8cc1';\r
      case "B": return '#775a4a';\r
      case "C": return '#94251e';\r
      case "D": return '#ca6958';\r
      case "E": return '#68bfaf';\r
      case "F": return '#23848a';\r
      case "G": return '#cfdf41';\r
      case "H": return '#717c42';\r
      case "V": return '#332d31';\r
      default:  return "white";\r
    }\r
  }\r
\r
  function computeAlignment(idx) {\r
    return new go.Spot(0.5, 0.5, (idx & 1) === 0 ? -12.5 : 12.5, (idx & 2) === 0 ? -12.5 : 12.5);\r
  }\r
\r
  myDiagram.nodeTemplate =  // representing a person\r
    new go.Node("Spot", {\r
        locationSpot: go.Spot.Center,\r
        layoutConditions: go.LayoutConditions.Standard & ~go.LayoutConditions.NodeSized,\r
        mouseEnter: (e, node) => highlightRelated(node, true),\r
        mouseLeave: (e, node) => highlightRelated(node, false)\r
      })\r
      .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringifyFixed(1))\r
      .add(\r
        // the main Shape: circle or square\r
        new go.Shape({\r
            name: "ICON",\r
            width: 50, height: 50,\r
            fill: "white", stroke: "black", strokeWidth: 1,\r
            portId: ""\r
          })\r
          .bind("figure", "sex", s => s === "M" ? "Square" : (s === "F" ? "Circle" : "Triangle"))\r
          .bind("fill"),\r
        // show at most 4 attribute/marker shapes\r
        new go.Panel("Spot", {\r
            isClipping: true,\r
            width: 49, height: 49,  // account for strokeWidth of main Shape\r
            itemTemplate:\r
              new go.Panel()\r
                .bindObject("alignment", "itemIndex", computeAlignment)\r
                .add(  // a square shape that fills a quadrant\r
                  new go.Shape({\r
                      width: 25, height: 25, strokeWidth: 0,\r
                      toolTip:\r
                        go.GraphObject.build("ToolTip")\r
                          .add(\r
                            new go.TextBlock()\r
                              .bind("text", "")\r
                          )\r
                    })\r
                    .bind("fill", "", computeFill)\r
                )\r
          })\r
          .bind("itemArray", "a")  // an Array of strings, such as ["X23", "ABC3", "qxz23m"]\r
          .add(\r
            // the main Shape: circle or square, used as a clipping mask\r
            new go.Shape({ width: 49, height: 49, strokeWidth: 0 })  // fill and stroke don't matter when clipping\r
              .bind("figure", "sex", s => s === "M" ? "Square" : (s === "F" ? "Circle" : "Triangle"))\r
          ),\r
        // proband marker\r
        new go.Shape({\r
            alignment: go.Spot.BottomLeft, alignmentFocus: go.Spot.TopRight,\r
            fill: "darkorange", stroke: "darkorange", strokeWidth: 3, scale: 2,\r
            geometryString: "F1 M20 0 L14.5 5.5 12 1z M18 1 L0 10"\r
          })\r
          .bindModel("visible", "proband", (key, shp) => shp.part.key === key),\r
        // highlight\r
        new go.Shape({ fill: null, stroke: null, strokeWidth: 4, width: 55, height: 55 })\r
          .bindObject("stroke", "isHighlighted", h => h ? "lightcoral" : null),\r
        // dead symbol: a slash\r
        new go.Shape({ opacity: 0, geometryString: "M60 0 L0 60" })\r
          .bind("opacity", "", data => (isDead(data) && (!data.reproduction || data.reproduction === "T" || data.reproduction ===  "SB")) ? 1 : 0),\r
        // adoption symbol: brackets\r
        new go.Shape({ opacity: 0, width: 55,  height: 55, geometryString: "M10 0 L0 0 0 55 10 55 M45 0 L55 0 55 55 45 55" })\r
          .bind("opacity", "adopted", ad => (ad === "in" || ad === "out") ? 1 : 0),\r
        // name\r
        new go.TextBlock({\r
            alignment: go.Spot.Bottom, alignmentFocus: new go.Spot(0.5, 0, 0, -5),\r
            height: 28,  // fixed height so that nodes are all the same height\r
            font: "bold 10pt sans-serif",\r
            textAlign: "center",\r
            maxSize: new go.Size(85, NaN),\r
            background: "rgba(255,255,255,0.75)",\r
            editable: true\r
          })\r
          .bindTwoWay("text", "name")\r
      );\r
\r
  function highlightRelated(node, show) {\r
    if (show) {\r
      const parts = new go.Set();\r
      highlightAncestors(node, parts);\r
      highlightDependents(node, parts);\r
      if (node.diagram) node.diagram.highlightCollection(parts);\r
    } else {\r
      if (node.diagram) node.diagram.clearHighlighteds();\r
    }\r
  }\r
\r
  function highlightAncestors(node, parts) {\r
    const parents = findParents(node);\r
    parts.addAll(parents);\r
    if (node.data.adopted === "in") return;\r
    parents.forEach(parent => highlightAncestors(parent, parts));\r
  }\r
\r
  function highlightDependents(node, parts) {\r
    const children = findChildren(node);\r
    children.forEach(child => {\r
      if (child.data.adopted === "in") return;\r
      parts.add(child);\r
      highlightDependents(child, parts);\r
    });\r
  }\r
\r
  function isDead(data) {  // the birth and death properties really ought to be dates in some form\r
    return !!data.death ? 1 : 0;\r
  }\r
\r
  function scrollToData(persondata) {\r
    const node = myDiagram.findNodeForData(persondata);\r
    if (node) {\r
      node.diagram.select(node);\r
      setTimeout(() => node.diagram.commandHandler.scrollToPart(node), 1);\r
    }\r
  }\r
\r
  myDiagram.linkTemplate =  // for parent-child relationships\r
    new TwinLink({  // for twins as well as for regular parent-child links, defined above\r
        selectable: false,\r
        routing: go.Routing.Orthogonal, fromEndSegmentLength: 50,\r
        fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top,\r
        layerName: "Background"\r
      })\r
      .bindTwoWay("points")\r
      .add(\r
        new go.Shape({ stroke: "black", strokeWidth: 2, strokeMiterLimit: 1 })\r
          .bindObject("strokeDashArray", "toNode", child => child.data.adopted === "in" ? [6, 4] : null)\r
          .bindObject("stroke", "isHighlighted", h => h ? "green" : "black")\r
      );\r
\r
  myDiagram.linkTemplateMap.add("Mate",  // for relationships that produce offspring\r
    new go.Link({ // AvoidsNodes routing might be better when people have multiple mates\r
        selectable: false,\r
        routing: go.Routing.AvoidsNodes,\r
        fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides,\r
        isTreeLink: false, layerName: "Background"\r
      })\r
      .bindTwoWay("points")\r
      .add(\r
        new go.Shape({ strokeWidth: 2, stroke: "blue" })\r
          .bindObject("stroke", "isHighlighted", h => h ? "green" : "blue"),\r
        new go.Shape({ visible: false, geometryString: "M12 0 L0 16 M16 0 L 4 16", segmentIndex: 1 })\r
          .bind("visible", "divorced")\r
      ));\r
\r
  // The representation of the one label node on a "Mate" Link -- but nothing shows on a Mate Link.\r
  // Links to children come out from this node, not directly from the mother or the father nodes.\r
  myDiagram.nodeTemplateMap.add("MateLabel",\r
    new go.Node({\r
        selectable: false,\r
        width: 1, height: 1,\r
        locationSpot: go.Spot.Center\r
      })\r
      .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringifyFixed(1)));\r
\r
  // The horizontal line connecting the parent links for identical twins\r
  myDiagram.linkTemplateMap.add("Identical",  // for connecting twins/triplets\r
    new go.Link({\r
        selectable: false, isLayoutPositioned: false,\r
        isTreeLink: false, layerName: "Background"\r
      })\r
      .add(\r
        new go.Shape({ strokeWidth: 2, stroke: "slateblue"  })\r
      ));\r
\r
  // The representation of each twin label node -- nothing shows on a parent-child Link.\r
  // These are connected by "Identical" links.\r
  myDiagram.nodeTemplateMap.add("TwinLabel",\r
    new go.Node({\r
        selectable: false, isLayoutPositioned: false,\r
        width: 1, height: 1,\r
        segmentIndex: -2, segmentFraction: 0.333\r
      }));\r
\r
  // set up Data Inspector -- YOU SHOULD REPLACE THIS CODE WITH YOUR OWN DETAIL EDITORS\r
  myInspector =\r
    new Inspector("myInspectorDiv", myDiagram, {\r
      properties: {\r
        // key would be automatically added for nodes, but we want to declare it read-only also:\r
        key: { readOnly: true, show: Inspector.showIfPresent },\r
        name: { show: Inspector.showIfPresent },\r
        sex: { show: Inspector.showIfPresent },\r
        mother: { readOnly: true, show: Inspector.showIfPresent },\r
        father: { readOnly: true, show: Inspector.showIfPresent },\r
        birth: { show: Inspector.showIfPresent },\r
        death: { show: Inspector.showIfPresent },\r
        note: { show: Inspector.showIfPresent },\r
        multiple: { show: Inspector.showIfPresent },\r
        identical: { show: Inspector.showIfPresent },\r
        loc: { show: false },\r
        points: { readOnly: true, show: false },\r
        from: { readOnly: true, show: Inspector.showIfPresent },\r
        to: { readOnly: true, show: Inspector.showIfPresent },\r
        labelKeys: { show: false },\r
        category: { show: false },\r
      }\r
    });\r
\r
  // Initialize and implement the various HTML buttons\r
\r
  // Load a model from Json text, displayed below the Diagram\r
\r
  function load() {\r
    myDiagram.clear();  // get rid of any left-over "Identical" links (they are not in the model)\r
    const str = document.getElementById("mySavedModel").value;\r
    myDiagram.model = go.Model.fromJson(str);\r
    myDiagram.model.pointsDigits = 1;  // limit decimals in JSON output for "points" Arrays\r
    // if not all person nodes have real locations, need to force a layout\r
    if (!myDiagram.nodes.all(node => node.isLinkLabel || node.location.isReal())) {\r
      myDiagram.layoutDiagram(true);\r
    }\r
    setupIdenticalTwins(myDiagram);  // maybe add some unmodeled "Identical" links\r
  }\r
\r
  // Show the diagram's model in JSON format, displayed below the Diagram\r
  function save() {\r
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
\r
  // Do some extra work in order to show fraternal or identical twins.\r
  function setupIdenticalTwins(diagram) {\r
    const model = diagram.model;\r
    const nodeDataArray = model.nodeDataArray;\r
    for (let i = 0; i < nodeDataArray.length; i++) {\r
      const data1 = nodeDataArray[i];\r
      let identical = data1.identical;\r
      if (typeof identical === "string") identical = parseInt(identical);\r
      if (typeof identical === "number" && !isNaN(identical)) {\r
        const key1 = data1.key;\r
        const key2 = identical;\r
        const data2 = model.findNodeDataForKey(key2);\r
        // check that both parents are the same\r
        if (data2 !== null && data1.mother === data2.mother && data1.father === data2.father) {\r
          const T1 = diagram.findNodeForKey(key1);\r
          const T2 = diagram.findNodeForKey(key2);\r
          const TPL1 = T1.findTreeParentLink();\r
          const TPL2 = T2.findTreeParentLink();\r
          if (TPL1 && TPL2) {\r
            const tlabtempl = diagram.nodeTemplateMap.get("TwinLabel");\r
            let TLN1 = TPL1.labelNodes.first();\r
            if (!TLN1) {\r
              TLN1 = tlabtempl.copy();\r
              TLN1.labeledLink = TPL1;\r
              diagram.add(TLN1);\r
            }\r
            let TLN2 = TPL2.labelNodes.first();\r
            if (!TLN2) {\r
              TLN2 = tlabtempl.copy();\r
              TLN2.labeledLink = TPL2;\r
              diagram.add(TLN2);\r
            }\r
            let TL = TLN1.findLinksBetween(TLN2).first();\r
            if (!TL) {\r
              const tlinktempl = diagram.linkTemplateMap.get("Identical");\r
              TL = tlinktempl.copy();\r
              TL.fromNode = TLN1;\r
              TL.toNode = TLN2;\r
              diagram.add(TL);\r
            }\r
          }\r
        }\r
      }\r
    }\r
  }\r
\r
  function print() {\r
    const svgWindow = window.open();\r
    if (!svgWindow) return; // failure to open a new Window\r
    svgWindow.document.title = "Genogram";\r
    svgWindow.document.body.style.margin = "0px";\r
    const printSize = new go.Size(700, 960);\r
    const bnds = myDiagram.documentBounds;\r
    let x = bnds.x;\r
    let y = bnds.y;\r
    while (y < bnds.bottom) {\r
      while (x < bnds.right) {\r
        const svg = myDiagram.makeSvg({\r
          scale: 1.0,\r
          position: new go.Point(x, y),\r
          size: printSize,\r
          background: "white"\r
        });\r
        svgWindow.document.body.appendChild(svg);\r
        x += printSize.width;\r
      }\r
      x = bnds.x;\r
      y += printSize.height;\r
    }\r
    requestAnimationFrame(() => { svgWindow.print(); svgWindow.close(); });\r
  }\r
  document.getElementById("myPrintButton").addEventListener("click", print);\r
\r
  document.getElementById("myDownloadButton").addEventListener("click", () => {\r
    myDiagram.commandHandler.downloadSvg({ name: "genogram.svg" });\r
  });\r
\r
  function scrollToProband() {\r
    if (typeof myDiagram.model.modelData.proband === "number") {\r
      const node = myDiagram.findNodeForKey(myDiagram.model.modelData.proband);\r
      if (node) myDiagram.commandHandler.scrollToPart(node);\r
    }\r
  }\r
  document.getElementById("myScrollToProband").addEventListener("click", scrollToProband);\r
\r
  document.getElementById("SaveButton").addEventListener("click", save);\r
  document.getElementById("myLoadButton").addEventListener("click", load);\r
\r
  load();\r
}  // end of init\r
\r
window.addEventListener("DOMContentLoaded", init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DataInspector.js`],descriptionHtml:`<p>A <em>genogram</em> or <em>pedigree chart</em> is an extended family tree diagram that displays information about\r
    each person or each relationship.\r
    The <em>proband</em> is the person about whom the genetic study is focused -- that node is highlighted with an arrow.\r
    In this case we focus on "Bill".\r
  </p>\r
  <p>\r
    There is support for twins or triplets, both fraternal and identical.\r
  </p>\r
  <p>\r
    When the mouse passes over a node, all other nodes representing people who are direct ancestors or descendants are highlighted.\r
  </p>\r
  <p>\r
    Note that the term "marriage" here does not refer to a legal or cultural kind of relationship,\r
    but simply one representing the female and male genetic sources for any children.\r
  </p>\r
  <p>\r
    There are functions that convert an attribute value into a brush color or Shape geometry,\r
    to be added to the Node representing the person.  These can be adapted for your app's specific purposes.\r
  </p>\r
  <p>\r
    Although this uses an <a>Inspector</a> to show the values of the data properties for the first selected node, nothing can be changed in this sample.\r
    We also have a version of this sample that supports editing the graph.\r
  </p>\r
  <p>\r
    A custom <a>LayeredDigraphLayout</a> does the layout, assuming there is a central person whose mother and father\r
    each have their own ancestors.\r
    Husband/wife node pairs are represented by a single <a>LayeredDigraphVertex</a>.\r
  </p>\r
  <p>For a simpler family tree, see the <a href="familyTree">family tree</a> sample or\r
    <a href="familyTreeJP">Japanese family tree</a> sample.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`itemarrays`,`collections`,`layered-digraph`,`customlayout`,`geometries`,`commands`];var g=y();l(`1sxel6t`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};