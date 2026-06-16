import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Virtualized Tree with TreeLayout`,indexDescription:`Shows a virtualized TreeLayout with TreeModel.`,screenshot:`virtualizedtree`,priority:2,tags:[`collections`,`treelayout`,`customlayout`,`tooltips`,`performance`],description:`An example of virtualization where a virtualized TreeLayout sets the bounds for each node data.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 600px"></div>\r
  <span id="mySpinner" class="loader"></span>\r
  <div>\r
    <p>\r
      This uses a <a>TreeModel</a> and a virtualized <a>TreeLayout</a>. The virtualized layout lets the <a>Diagram</a>\r
      draw only necessary <a>Node</a>s and <a>Link</a>s, improving performance.\r
    </p>\r
    Node data in Model: <span id="myMessage1"></span>. Actual Nodes in Diagram: <span id="myMessage2"></span>. Actual Links in Diagram:\r
    <span id="myMessage4"></span>.\r
  </div>`,jsCode:`// this controls whether the tree grows deeper towards the right or downwards:\r
  const HORIZONTAL = true;\r
\r
  function init() {\r
\r
    // The Diagram just shows what should be visible in the viewport.\r
    // Its model does NOT include node data for the whole graph, but only that\r
    // which might be visible in the viewport.\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialDocumentSpot: go.Spot.Center,\r
      initialViewportSpot: go.Spot.Center,\r
\r
      // Use a virtualized TreeLayout which does not require\r
      // that the Nodes and Links exist first for an accurate layout\r
      layout: new VirtualizedTreeLayout({ angle: HORIZONTAL ? 0 : 90, nodeSpacing: 10 }),\r
\r
      // Define the template for Nodes, used by virtualization.\r
      nodeTemplate:\r
        new go.Node('Auto', {\r
            isLayoutPositioned: false,\r
            width: 70, height: 20, // in cooperation with the load function, below\r
            toolTip:\r
              go.GraphObject.build('ToolTip')\r
                .add(\r
                  new go.TextBlock({ margin: 3 })\r
                    .bind('text', '', d => 'key: ' + d.key + '\\nbounds: ' + d.bounds.toString())\r
                )\r
          }) // optimization\r
          .bindTwoWay('position', 'bounds', b => b.position, (p, d) => new go.Rect(p.x, p.y, d.bounds.width, d.bounds.height))\r
          .add(\r
            new go.Shape('Rectangle')\r
              .bind('fill', 'color'),\r
            new go.TextBlock({ margin: 2 })\r
              .bind('text', 'color')\r
          ),\r
\r
      // Define the template for Links\r
      linkTemplate:\r
        new go.Link({\r
            fromSpot: HORIZONTAL ? go.Spot.Right : go.Spot.Bottom,\r
            toSpot: HORIZONTAL ? go.Spot.Left : go.Spot.Top\r
          })\r
          .add(\r
            new go.Shape()\r
          ),\r
\r
      SelectionMoved: e => {\r
        e.subject.each(n => {\r
          if (n instanceof go.Node) n.data.points = undefined;\r
        });\r
      },\r
\r
      'animationManager.isEnabled': false\r
    });\r
\r
    // This model includes all of the data\r
    myWholeModel = new go.TreeModel(); // must match the model used by the Diagram, below\r
\r
    // The virtualized layout works on the full model, not on the Diagram Nodes and Links\r
    myDiagram.layout.model = myWholeModel;\r
\r
    // Do not set myDiagram.model = myWholeModel -- that would create a zillion Nodes and Links!\r
    // In the future Diagram may have built-in support for virtualization.\r
    // For now, we have to implement virtualization ourselves by having the Diagram's model\r
    // be different than the "real" model.\r
    myDiagram.model = // this only holds nodes that should be in the viewport\r
      new go.TreeModel(); // must match the model, above\r
\r
    // for now, we have to implement virtualization ourselves\r
    myDiagram.isVirtualized = true;\r
    myDiagram.addDiagramListener('ViewportBoundsChanged', onViewportChanged);\r
\r
    myDiagram.delayInitialization(diagram => spinDuring(diagram, 'mySpinner', load));\r
  }\r
\r
  // implement a wait spinner in HTML with CSS animation\r
  function spinDuring(diagram, spinner, compute) {\r
    // where compute is a function of zero args\r
    // show the animated spinner\r
    if (typeof spinner === 'string') spinner = document.getElementById(spinner);\r
    if (spinner) {\r
      // position it in the middle of the viewport DIV\r
      const x = Math.floor(diagram.div.offsetWidth / 2 - 12);\r
      const y = Math.floor(diagram.div.offsetHeight / 2 - 12);\r
      spinner.style.left = x + 'px';\r
      spinner.style.top = y + 'px';\r
      spinner.style.display = 'inline';\r
    }\r
    setTimeout(() => {\r
      try {\r
        compute(); // do the computation\r
      } finally {\r
        if (spinner) spinner.style.display = 'none';\r
      }\r
    }, 20);\r
  }\r
\r
  function load() {\r
    // create a lot of data for the myWholeModel\r
    const total = 123456;\r
    const treedata = [];\r
    for (let i = 0; i < total; i++) {\r
      const d = {\r
        key: i, // this node data's key\r
        color: go.Brush.randomColor(), // the node's color\r
        parent: i > 0 ? Math.floor((Math.random() * i) / 2) : undefined // the random parent's key\r
      };\r
      //!!!???@@@ this needs to be customized to account for your chosen Node template\r
      d.bounds = new go.Rect(0, 0, 70, 20);\r
      treedata.push(d);\r
    }\r
    myWholeModel.nodeDataArray = treedata;\r
    myDiagram.layoutDiagram(true);\r
  }\r
\r
  // The following functions implement virtualization of the Diagram\r
  // Assume data.bounds is a Rect of the area occupied by the Node in document coordinates.\r
\r
  // The normal mechanism for determining the size of the document depends on all of the\r
  // Nodes and Links existing, so we need to use a function that depends only on the model data.\r
  function computeDocumentBounds() {\r
    const b = new go.Rect();\r
    const ndata = myWholeModel.nodeDataArray;\r
    for (let i = 0; i < ndata.length; i++) {\r
      const d = ndata[i];\r
      if (!d.bounds) continue;\r
      if (i === 0) {\r
        b.set(d.bounds);\r
      } else {\r
        b.unionRect(d.bounds);\r
      }\r
    }\r
    return b;\r
  }\r
\r
  // As the user scrolls or zooms, make sure the Parts (Nodes and Links) exist in the viewport.\r
  function onViewportChanged(e) {\r
    const diagram = e.diagram;\r
    // make sure there are Nodes for each node data that is in the viewport\r
    // or that is connected to such a Node\r
    const viewb = diagram.viewportBounds; // the new viewportBounds\r
    const model = diagram.model;\r
\r
    const oldskips = diagram.skipsUndoManager;\r
    diagram.skipsUndoManager = true;\r
\r
    const b = new go.Rect();\r
    const ndata = myWholeModel.nodeDataArray;\r
    for (let i = 0; i < ndata.length; i++) {\r
      const n = ndata[i];\r
      if (model.containsNodeData(n)) continue;\r
      if (!n.bounds) continue;\r
      if (n.bounds.intersectsRect(viewb)) {\r
        model.addNodeData(n);\r
      }\r
      if (model instanceof go.TreeModel) {\r
        // make sure links to all parent nodes appear\r
        const parentkey = myWholeModel.getParentKeyForNodeData(n);\r
        const parent = myWholeModel.findNodeDataForKey(parentkey);\r
        if (parent !== null) {\r
          if (n.bounds.intersectsRect(viewb)) {\r
            // N is inside viewport\r
            model.addNodeData(parent); // so that link to parent appears\r
            const child = diagram.findNodeForData(n);\r
            if (child !== null) {\r
              const link = child.findTreeParentLink();\r
              if (link !== null) {\r
                // do this now to avoid delayed routing outside of transaction\r
                link.fromNode.ensureBounds();\r
                link.toNode.ensureBounds();\r
                if (child.data.fromSpot) link.fromSpot = child.data.fromSpot;\r
                if (child.data.toSpot) link.toSpot = child.data.toSpot;\r
                if (child.data.points) {\r
                  link.points = child.data.points;\r
                } else {\r
                  link.updateRoute();\r
                }\r
              }\r
            }\r
          } else {\r
            // N is outside of viewport\r
            // see if there's a parent that is in the viewport,\r
            // or if the link might cross over the viewport\r
            b.set(n.bounds);\r
            b.unionRect(parent.bounds);\r
            if (b.intersectsRect(viewb)) {\r
              model.addNodeData(n); // add N so that link to parent appears\r
              const child = diagram.findNodeForData(n);\r
              if (child !== null) {\r
                const link = child.findTreeParentLink();\r
                if (link !== null) {\r
                  // do this now to avoid delayed routing outside of transaction\r
                  link.fromNode.ensureBounds();\r
                  link.toNode.ensureBounds();\r
                  if (child.data.fromSpot) link.fromSpot = child.data.fromSpot;\r
                  if (child.data.toSpot) link.toSpot = child.data.toSpot;\r
                  if (child.data.points) {\r
                    link.points = child.data.points;\r
                  } else {\r
                    link.updateRoute();\r
                  }\r
                }\r
              }\r
            }\r
          }\r
        }\r
      }\r
    }\r
\r
    if (model instanceof go.GraphLinksModel) {\r
      const ldata = myWholeModel.linkDataArray;\r
      for (let i = 0; i < ldata.length; i++) {\r
        const l = ldata[i];\r
        const fromkey = myWholeModel.getFromKeyForLinkData(l);\r
        if (fromkey === undefined) continue;\r
        const from = myWholeModel.findNodeDataForKey(fromkey);\r
        if (from === null || !from.bounds) continue;\r
\r
        const tokey = myWholeModel.getToKeyForLinkData(l);\r
        if (tokey === undefined) continue;\r
        const to = myWholeModel.findNodeDataForKey(tokey);\r
        if (to === null || !to.bounds) continue;\r
\r
        b.set(from.bounds);\r
        b.unionRect(to.bounds);\r
        if (b.intersectsRect(viewb)) {\r
          // also make sure both connected nodes are present,\r
          // so that link routing is authentic\r
          model.addNodeData(from);\r
          model.addNodeData(to);\r
          model.addLinkData(l);\r
          const link = diagram.findLinkForData(l);\r
          if (link !== null) {\r
            // do this now to avoid delayed routing outside of transaction\r
            link.fromNode.ensureBounds();\r
            link.toNode.ensureBounds();\r
            if (link.data.fromSpot) link.fromSpot = link.data.fromSpot;\r
            if (link.data.toSpot) link.toSpot = link.data.toSpot;\r
            //if (link.data.points) {\r
            //  link.points = link.data.points;\r
            //} else {\r
            link.updateRoute();\r
            //}\r
          }\r
        }\r
      }\r
    }\r
\r
    diagram.skipsUndoManager = oldskips;\r
\r
    if (myRemoveTimer === null) {\r
      // only remove offscreen nodes after a delay\r
      myRemoveTimer = setTimeout(() => removeOffscreen(diagram), 3000);\r
    }\r
\r
    updateCounts(); // only for this sample\r
  }\r
\r
  // occasionally remove Parts that are offscreen from the Diagram\r
  var myRemoveTimer = null;\r
\r
  function removeOffscreen(diagram) {\r
    myRemoveTimer = null;\r
\r
    const viewb = diagram.viewportBounds;\r
    const model = diagram.model;\r
    const remove = []; // collect for later removal\r
    const removeLinks = new go.Set(); // links connected to a node data to remove\r
    const it = diagram.nodes;\r
    while (it.next()) {\r
      const n = it.value;\r
      const d = n.data;\r
      if (d === null) continue;\r
      if (!n.actualBounds.intersectsRect(viewb) && !n.isSelected) {\r
        // even if the node is out of the viewport, keep it if it is selected or\r
        // if any link connecting with the node is still in the viewport\r
        if (!n.linksConnected.any(l => l.actualBounds.intersectsRect(viewb))) {\r
          remove.push(d);\r
          if (model instanceof go.GraphLinksModel) {\r
            removeLinks.addAll(n.linksConnected);\r
          }\r
        }\r
      }\r
    }\r
\r
    if (remove.length > 0) {\r
      const oldskips = diagram.skipsUndoManager;\r
      diagram.skipsUndoManager = true;\r
      model.removeNodeDataCollection(remove);\r
      if (model instanceof go.GraphLinksModel) {\r
        removeLinks.each(l => {\r
          if (!l.isSelected) model.removeLinkData(l.data);\r
        });\r
      }\r
      diagram.skipsUndoManager = oldskips;\r
    }\r
\r
    updateCounts(); // only for this sample\r
  }\r
  // end of virtualized Diagram\r
\r
  // start of VirtualizedTree[Layout/Network] classes\r
\r
  // Here we try to replace the dependence of TreeLayout on Nodes\r
  // with depending only on the data in the TreeModel.\r
  class VirtualizedTreeLayout extends go.TreeLayout {\r
    constructor(init) {\r
      super();\r
      this.isOngoing = false;\r
      this.model = null; // add this property for holding the whole TreeModel\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    static _cachedLinks = [];\r
\r
    createNetwork() {\r
      return new VirtualizedTreeNetwork(this); // defined below\r
    }\r
\r
    // ignore the argument, an (implicit) collection of Parts\r
    makeNetwork(coll) {\r
      const net = this.createNetwork();\r
      net.addData(this.model); // use the model data, not any actual Nodes and Links\r
      return net;\r
    }\r
\r
    commitLayout() {\r
      VirtualizedTreeEdge._dummyLink = this.diagram.linkTemplate.copy();\r
      VirtualizedTreeEdge._dummyFromNode = this.diagram.nodeTemplate.copy();\r
      VirtualizedTreeEdge._dummyToNode = this.diagram.nodeTemplate.copy();\r
      VirtualizedTreeEdge._dummyLink.fromNode = VirtualizedTreeEdge._dummyFromNode;\r
      VirtualizedTreeEdge._dummyLink.toNode = VirtualizedTreeEdge._dummyToNode;\r
      this.diagram.add(VirtualizedTreeEdge._dummyFromNode);\r
      this.diagram.add(VirtualizedTreeEdge._dummyToNode);\r
      this.diagram.add(VirtualizedTreeEdge._dummyLink);\r
\r
      super.commitLayout();\r
      // can't depend on regular bounds computation that depends on all Nodes existing\r
      this.diagram.fixedBounds = computeDocumentBounds();\r
\r
      this.diagram.remove(VirtualizedTreeEdge._dummyFromNode);\r
      this.diagram.remove(VirtualizedTreeEdge._dummyToNode);\r
      this.diagram.remove(VirtualizedTreeEdge._dummyLink);\r
\r
      // update the positions of any existing Nodes\r
      this.diagram.nodes.each(node => node.updateTargetBindings());\r
    }\r
\r
    setPortSpots(v) {\r
      v.destinationEdges.each(e => {\r
        e.link = VirtualizedTreeLayout._cachedLinks.pop() || new go.Link();\r
      });\r
      super.setPortSpots(v);\r
      v.destinationEdges.each(e => {\r
        if (e.data) {\r
          e.data.fromSpot = e.link.fromSpot.copy();\r
          e.data.toSpot = e.link.toSpot.copy();\r
        }\r
        VirtualizedTreeLayout._cachedLinks.push(e.link);\r
        e.link = null;\r
      });\r
    }\r
  }\r
  // end VirtualizedTreeLayout class\r
\r
  class VirtualizedTreeNetwork extends go.TreeNetwork {\r
    constructor(layout) {\r
      super(layout);\r
    }\r
\r
    createEdge() {\r
      return new VirtualizedTreeEdge(this);\r
    }\r
\r
    addData(model) {\r
      if (model instanceof go.TreeModel) {\r
        const dataVertexMap = new go.Map();\r
        const ndata = model.nodeDataArray;\r
        for (let i = 0; i < ndata.length; i++) {\r
          const d = ndata[i];\r
          const v = this.createVertex();\r
          v.data = d; // associate this Vertex with data, not a Node\r
          dataVertexMap.set(d, v);\r
          this.addVertex(v);\r
        }\r
\r
        for (let i = 0; i < ndata.length; i++) {\r
          const child = ndata[i];\r
          const parentkey = model.getParentKeyForNodeData(child);\r
          const parent = model.findNodeDataForKey(parentkey);\r
          if (parent !== null) {\r
            // if there is a parent, there should be an edge\r
            // now find corresponding vertexes\r
            const f = dataVertexMap.get(parent);\r
            const t = dataVertexMap.get(child);\r
            if (f === null || t === null) continue; // skip\r
            // create and add VirtualizedTreeEdge\r
            const e = this.createEdge();\r
            e.data = child; // associate this Edge with data, not a Link\r
            e.fromVertex = f;\r
            e.toVertex = t;\r
            this.addEdge(e);\r
          }\r
        }\r
      } else {\r
        throw new Error('can only handle TreeModel data');\r
      }\r
    }\r
  }\r
  // end VirtualizedTreeNetwork class\r
\r
  class VirtualizedTreeEdge extends go.TreeEdge {\r
    constructor(network) {\r
      super(network);\r
    }\r
\r
    static _dummyLink = null;\r
    static _dummyFromNode = null;\r
    static _dummyToNode = null;\r
\r
    commit() {\r
      const parentv = this.fromVertex;\r
      if (!parentv) return;\r
      const routed = parentv.alignment === go.TreeAlignment.Start || parentv.alignment === go.TreeAlignment.End;\r
      if (this.data && routed) {\r
        this.link = VirtualizedTreeEdge._dummyLink;\r
        this.link.fromNode.moveTo(this.fromVertex.x, this.fromVertex.y);\r
        this.link.toNode.moveTo(this.toVertex.x, this.toVertex.y);\r
        this.link.fromNode.ensureBounds();\r
        this.link.toNode.ensureBounds();\r
        this.link.updateRoute();\r
      }\r
      super.commit();\r
      if (this.data && routed) {\r
        this.data.points = this.link.points.copy();\r
        this.link = null;\r
      }\r
    }\r
  }\r
\r
  // end of VirtualizedTree[Layout/Network] classes\r
\r
  // This function is only used in this sample to demonstrate the effects of the virtualization.\r
  // In a real application you would delete this function and all calls to it.\r
  function updateCounts() {\r
    document.getElementById('myMessage1').textContent = myWholeModel.nodeDataArray.length;\r
    document.getElementById('myMessage2').textContent = myDiagram.nodes.count;\r
    document.getElementById('myMessage4').textContent = myDiagram.links.count;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`.loader {\r
    display: none;\r
    position: absolute;\r
    width: 24px;\r
    height: 24px;\r
    border: 4px solid #777;\r
    border-bottom-color: #ccc;\r
    border-radius: 50%;\r
    animation: rotation 1s linear infinite;\r
  }\r
\r
  @keyframes rotation {\r
    0% {\r
        transform: rotate(0deg);\r
    }\r
    100% {\r
        transform: rotate(360deg);\r
    }\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`treelayout`,`customlayout`,`tooltips`,`performance`];var g=y();l(`797s24`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};