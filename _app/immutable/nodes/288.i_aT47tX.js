import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Virtualized Diagram with Force Directed Layout`,indexDescription:`Shows a virtualized ForceDirectedLayout with GraphLinksModel.`,screenshot:`virtualizedforcelayout`,priority:2,tags:[`collections`,`force-directed`,`customlayout`,`tooltips`,`performance`],description:`An example of virtualization where a virtualized ForceDirectedLayout sets the bounds for each node data.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 600px"></div>\r
  <span id="mySpinner" class="loader"></span>\r
  <div>\r
    <p>This uses a <a>GraphLinksModel</a> and a virtualized <a>ForceDirectedLayout</a>.</p>\r
    Node data in Model: <span id="myMessage1"></span>. Actual Nodes in Diagram: <span id="myMessage2"></span>.<br />\r
    Link data in model: <span id="myMessage3"></span>. Actual Links in Diagram: <span id="myMessage4"></span>.\r
  </div>\r
  <br>\r
  <p>\r
    See also <a href="./virtualized">Virtualized</a>.\r
  </p>`,jsCode:`function init() {\r
    // The Diagram just shows what should be visible in the viewport.\r
    // Its model does NOT include node data for the whole graph, but only that\r
    // which might be visible in the viewport.\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // use a virtualized ForceDirectedLayout which does not require\r
      // that the Nodes and Links exist first for an accurate layout\r
      layout: new VirtualizedForceDirectedLayout(),\r
\r
      // Define the template for Nodes, used by virtualization.\r
      nodeTemplate:\r
        new go.Node('Auto', {\r
            isLayoutPositioned: false,  // optimization\r
            width: 70,\r
            height: 20,\r
            toolTip:\r
              go.GraphObject.build("ToolTip")\r
                .add(\r
                  new go.TextBlock({ margin: 3 })\r
                    .bind('text', '', d => 'key: ' + d.key + '\\nbounds: ' + d.bounds.toString())\r
                )\r
          })\r
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
        new go.Link({ isLayoutPositioned: false }) // optimization\r
          .add(new go.Shape()),\r
\r
      'animationManager.isEnabled': false\r
    });\r
\r
    // This model includes all of the data\r
    myWholeModel = new go.GraphLinksModel(); // must match the model used by the Diagram, below\r
\r
    // The virtualized layout works on the full model, not on the Diagram Nodes and Links\r
    myDiagram.layout.model = myWholeModel;\r
\r
    // Do not set myDiagram.model = myWholeModel -- that would create a zillion Nodes and Links!\r
    // In the future Diagram may have built-in support for virtualization.\r
    // For now, we have to implement virtualization ourselves by having the Diagram's model\r
    // be different than the "real" model.\r
    myDiagram.model = // this only holds nodes that should be in the viewport\r
      new go.GraphLinksModel(); // must match the model, above\r
\r
    // for now, we have to implement virtualization ourselves\r
    myDiagram.isVirtualized = true;\r
    myDiagram.addDiagramListener('ViewportBoundsChanged', onViewportChanged);\r
\r
    // once the layout has finished we can decide where to position the viewport\r
    myDiagram.addDiagramListener('InitialLayoutCompleted', e => {\r
      var firstdata = myWholeModel.findNodeDataForKey(0);\r
      if (firstdata !== null) {\r
        myDiagram.centerRect(firstdata.bounds);\r
      }\r
    });\r
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
      var x = Math.floor(diagram.div.offsetWidth / 2 - 12);\r
      var y = Math.floor(diagram.div.offsetHeight / 2 - 12);\r
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
    generateNodes(myWholeModel, 12345, 12345);\r
    generateLinks(myWholeModel, 1, 5);\r
    myDiagram.layoutDiagram(true);\r
  }\r
\r
  // Creates a random number of randomly colored nodes.\r
  function generateNodes(model, min, max) {\r
    if (isNaN(min) || min < 0) min = 2;\r
    if (isNaN(max) || max < min) max = min;\r
    var nodeArray = [];\r
    var numNodes = Math.floor(Math.random() * (max - min + 1)) + min;\r
    for (var i = 0; i < numNodes; i++) {\r
      var d = {\r
        key: i,\r
        color: go.Brush.randomColor() // the node's color\r
      };\r
      //!!!???@@@ this needs to be customized to account for your chosen Node template\r
      d.bounds = new go.Rect(0, 0, 70, 20);\r
      nodeArray.push(d);\r
    }\r
    model.nodeDataArray = nodeArray;\r
  }\r
\r
  // Takes the random collection of nodes and creates a random tree with them.\r
  // Respects the minimum and maximum number of links from each node.\r
  // (The minimum can be disregarded if we run out of nodes to link to)\r
  function generateLinks(model, min, max) {\r
    if (model.nodeDataArray.length < 2) return;\r
    if (isNaN(min) || min < 1) min = 1;\r
    if (isNaN(max) || max < min) max = min;\r
    var linkArray = [];\r
    // make two Lists of nodes to keep track of where links already exist\r
    var nodes = new go.List();\r
    nodes.addAll(model.nodeDataArray);\r
    var available = new go.List();\r
    available.addAll(nodes);\r
    for (var i = 0; i < nodes.length; i++) {\r
      var next = nodes.get(i);\r
      available.delete(next);\r
      var children = Math.floor(Math.random() * (max - min + 1)) + min;\r
      for (var j = 1; j <= children; j++) {\r
        if (available.length === 0) break;\r
        var to = available.get(0);\r
        available.delete(to);\r
        linkArray.push({\r
          from: next.key,\r
          to: to.key\r
        });\r
      }\r
    }\r
    model.linkDataArray = linkArray;\r
  }\r
\r
  // The following functions implement virtualization of the Diagram\r
  // Assume data.bounds is a Rect of the area occupied by the Node in document coordinates.\r
\r
  // The normal mechanism for determining the size of the document depends on all of the\r
  // Nodes and Links existing, so we need to use a function that depends only on the model data.\r
  function computeDocumentBounds() {\r
    var b = new go.Rect();\r
    var ndata = myWholeModel.nodeDataArray;\r
    for (var i = 0; i < ndata.length; i++) {\r
      var d = ndata[i];\r
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
    var diagram = e.diagram;\r
    // make sure there are Nodes for each node data that is in the viewport\r
    // or that is connected to such a Node\r
    var viewb = diagram.viewportBounds; // the new viewportBounds\r
    var model = diagram.model;\r
\r
    var oldskips = diagram.skipsUndoManager;\r
    diagram.skipsUndoManager = true;\r
\r
    var b = new go.Rect();\r
    var ndata = myWholeModel.nodeDataArray;\r
    for (var i = 0; i < ndata.length; i++) {\r
      var n = ndata[i];\r
      if (model.containsNodeData(n)) continue;\r
      if (!n.bounds) continue;\r
      if (n.bounds.intersectsRect(viewb)) {\r
        addNode(diagram, n);\r
      }\r
\r
      if (model instanceof go.TreeModel) {\r
        // make sure links to all parent nodes appear\r
        var parentkey = myWholeModel.getParentKeyForNodeData(n);\r
        var parent = myWholeModel.findNodeDataForKey(parentkey);\r
        if (parent !== null) {\r
          if (n.bounds.intersectsRect(viewb)) {\r
            // N is inside viewport\r
            addNode(diagram, parent); // so that link to parent appears\r
            var node = diagram.findNodeForData(n);\r
            if (node !== null) {\r
              var link = node.findTreeParentLink();\r
              if (link !== null) {\r
                // do this now to avoid delayed routing outside of transaction\r
                link.updateRoute();\r
              }\r
            }\r
          } else {\r
            // N is outside of viewport\r
            // see if there's a parent that is in the viewport,\r
            // or if the link might cross over the viewport\r
            b.set(n.bounds);\r
            b.unionRect(parent.bounds);\r
            if (b.intersectsRect(viewb)) {\r
              addNode(diagram, n); // add N so that link to parent appears\r
              var child = diagram.findNodeForData(n);\r
              if (child !== null) {\r
                var link = child.findTreeParentLink();\r
                if (link !== null) {\r
                  // do this now to avoid delayed routing outside of transaction\r
                  link.updateRoute();\r
                }\r
              }\r
            }\r
          }\r
        }\r
      }\r
    }\r
\r
    if (model instanceof go.GraphLinksModel) {\r
      var ldata = myWholeModel.linkDataArray;\r
      for (var i = 0; i < ldata.length; i++) {\r
        var l = ldata[i];\r
        if (model.containsLinkData(l)) continue;\r
\r
        var fromkey = myWholeModel.getFromKeyForLinkData(l);\r
        if (fromkey === undefined) continue;\r
        var from = myWholeModel.findNodeDataForKey(fromkey);\r
        if (from === null || !from.bounds) continue;\r
\r
        var tokey = myWholeModel.getToKeyForLinkData(l);\r
        if (tokey === undefined) continue;\r
        var to = myWholeModel.findNodeDataForKey(tokey);\r
        if (to === null || !to.bounds) continue;\r
\r
        const b = new go.Rect();\r
        b.set(from.bounds);\r
        b.unionRect(to.bounds);\r
        if (b.intersectsRect(viewb)) {\r
          // also make sure both connected nodes are present,\r
          // so that link routing is authentic\r
          addNode(diagram, from);\r
          addNode(diagram, to);\r
          model.addLinkData(l);\r
          var link = diagram.findLinkForData(l);\r
          if (link !== null) {\r
            // do this now to avoid delayed routing outside of transaction\r
            link.updateRoute();\r
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
  function addNode(diagram, data) {\r
    const model = diagram.model;\r
    if (model.containsNodeData(data)) return;\r
    model.addNodeData(data);\r
    const n = diagram.findNodeForData(data);\r
    if (n !== null) n.ensureBounds();\r
  }\r
\r
  // occasionally remove Parts that are offscreen from the Diagram\r
  var myRemoveTimer = null;\r
\r
  function removeOffscreen(diagram) {\r
    myRemoveTimer = null;\r
\r
    var viewb = diagram.viewportBounds;\r
    var model = diagram.model;\r
    var remove = []; // collect for later removal\r
    var removeLinks = new go.Set(); // links connected to a node data to remove\r
    var it = diagram.nodes;\r
    while (it.next()) {\r
      var n = it.value;\r
      var d = n.data;\r
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
      var oldskips = diagram.skipsUndoManager;\r
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
  // start of VirtualizedForceDirected[Layout/Network] classes\r
\r
  // Here we try to replace the dependence of ForceDirectedLayout on Nodes\r
  // with depending only on the data in the GraphLinksModel.\r
  class VirtualizedForceDirectedLayout extends go.ForceDirectedLayout {\r
    constructor(init) {\r
      super();\r
      this.isOngoing = false;\r
      this.model = null; // add this property for holding the whole GraphLinksModel\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    createNetwork() {\r
      return new VirtualizedForceDirectedNetwork(this); // defined below\r
    }\r
\r
    // ignore the argument, an (implicit) collection of Parts\r
    makeNetwork(coll) {\r
      var net = this.createNetwork();\r
      net.addData(this.model); // use the model data, not any actual Nodes and Links\r
      return net;\r
    }\r
\r
    commitLayout() {\r
      super.commitLayout();\r
      // can't depend on regular bounds computation that depends on all Nodes existing\r
      this.diagram.fixedBounds = computeDocumentBounds();\r
      // update the positions of any existing Nodes\r
      this.diagram.nodes.each(node => node.updateTargetBindings());\r
    }\r
  }\r
  // end VirtualizedForceDirectedLayout class\r
\r
  class VirtualizedForceDirectedNetwork extends go.ForceDirectedNetwork {\r
    constructor(layout) {\r
      super(layout);\r
    }\r
\r
    addData(model) {\r
      if (model instanceof go.GraphLinksModel) {\r
        var dataVertexMap = new go.Map();\r
        // create a vertex for each node data\r
        var ndata = model.nodeDataArray;\r
        for (var i = 0; i < ndata.length; i++) {\r
          var d = ndata[i];\r
          var v = this.createVertex();\r
          v.data = d; // associate this Vertex with data, not a Node\r
          dataVertexMap.set(model.getKeyForNodeData(d), v);\r
          this.addVertex(v);\r
        }\r
        // create an edge for each link data\r
        var ldata = model.linkDataArray;\r
        for (var i = 0; i < ldata.length; i++) {\r
          var d = ldata[i];\r
          // now find corresponding vertexes\r
          var from = dataVertexMap.get(model.getFromKeyForLinkData(d));\r
          var to = dataVertexMap.get(model.getToKeyForLinkData(d));\r
          if (from === null || to === null) continue; // skip\r
          // create and add VirtualizedForceDirectedEdge\r
          var e = this.createEdge();\r
          e.data = d; // associate this Edge with data, not a Link\r
          e.fromVertex = from;\r
          e.toVertex = to;\r
          this.addEdge(e);\r
        }\r
      } else {\r
        throw new Error('can only handle GraphLinksModel data');\r
      }\r
    }\r
\r
    deleteArtificialVertexes() {}\r
  }\r
  // end VirtualizedForceDirectedNetwork class\r
\r
  // end of VirtualizedForceDirected[Layout/Network] classes\r
\r
  // This function is only used in this sample to demonstrate the effects of the virtualization.\r
  // In a real application you would delete this function and all calls to it.\r
  function updateCounts() {\r
    document.getElementById('myMessage1').textContent = myWholeModel.nodeDataArray.length;\r
    document.getElementById('myMessage2').textContent = myDiagram.nodes.count;\r
    document.getElementById('myMessage3').textContent = myWholeModel.linkDataArray.length;\r
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
}`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`force-directed`,`customlayout`,`tooltips`,`performance`];var g=y();l(`sr3d7j`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};