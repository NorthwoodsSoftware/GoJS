import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Virtualized Tree`,indexDescription:`An example of virtualization where the model holds 123,456 node data yet the diagram only creates a few nodes at a time.`,screenshot:`virtualizedtree`,priority:2,tags:[`treelayout`,`tooltips`,`performance`],description:`An example of virtualization where a very simple tree layout sets the bounds for each node data.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div>\r
    <p>This uses a <a>TreeModel</a> but not <a>TreeLayout</a>.</p>\r
    Node data in Model: <span id="myMessage1"></span>. Actual Nodes in Diagram: <span id="myMessage2"></span>. Actual Links in Diagram:\r
    <span id="myMessage4"></span>.\r
  </div>\r
  <br>\r
  <p>\r
    See also <a href="./virtualized">Virtualized</a>.\r
  </p>`,jsCode:`// this controls whether the tree grows deeper towards the right or downwards:\r
  var HORIZONTAL = true;\r
\r
  function init() {\r
    // The Diagram just shows what should be visible in the viewport.\r
    // Its model does NOT include node data for the whole graph, but only that\r
    // which might be visible in the viewport.\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialDocumentSpot: go.Spot.Center,\r
      initialViewportSpot: go.Spot.Center,\r
\r
      // Do manual layout in the layoutTree function below, rather than automatic layout using a\r
      // TreeLayout which would require the Nodes and Links to exist first for an accurate layout.\r
      //layout: new go.TreeLayout(\r
      //          { nodeSpacing: 4, compaction: go.TreeCompaction.None }),\r
      // Assume there's no Layout -- all data.bounds are calculated in layoutTree\r
      layout: new go.Layout({ isInitial: false, isOngoing: false }), // never invalidates\r
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
            isLayoutPositioned: false, // optimization\r
            fromSpot: HORIZONTAL ? go.Spot.Right : go.Spot.Bottom,\r
            toSpot: HORIZONTAL ? go.Spot.Left : go.Spot.Top\r
          })\r
          .add(\r
            new go.Shape()\r
          ),\r
\r
      'animationManager.isEnabled': false\r
    });\r
\r
    // This model includes all of the data\r
    myWholeModel = new go.TreeModel(); // must match the TreeModel used by the Diagram, below\r
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
    // This is a status message\r
    const textBlock = new go.TextBlock('loading...', { stroke: 'red', font: '20pt sans-serif' });\r
    myLoading =\r
      new go.Part({ layerName: 'ViewportForeground', alignment: go.Spot.Center })\r
        .add(textBlock);\r
\r
    // // temporarily add the status indicator\r
    // const animate = state => {\r
    //   textBlock.text = 'loading' + '.'.repeat(state);\r
    //   setTimeout(() => {\r
    //     animate(state++);\r
    //   }, 50);\r
    // };\r
    // animate(0);\r
    myDiagram.add(myLoading);\r
\r
    // Allow the myLoading indicator to be shown now,\r
    // but allow objects added in load to also be considered part of the initial Diagram.\r
    // If you are not going to add temporary initial Parts, don't call delayInitialization.\r
    myDiagram.delayInitialization(load);\r
  }\r
\r
  function load(diagram) {\r
    // create a lot of data for the myWholeModel\r
    var total = 123456;\r
    var treedata = [];\r
    for (var i = 0; i < total; i++) {\r
      var d = {\r
        key: i, // this node data's key\r
        color: go.Brush.randomColor(), // the node's color\r
        parent: i > 0 ? Math.floor((Math.random() * i) / 2) : undefined // the random parent's key\r
      };\r
      //!!!???@@@ this needs to be customized to account for your chosen Node template\r
      d.bounds = new go.Rect(0, 0, 70, 20);\r
      treedata.push(d);\r
    }\r
    myWholeModel.nodeDataArray = treedata;\r
\r
    // make it faster to get from a model parent data object to all of the children data\r
    improveNavigation(myWholeModel);\r
\r
    // this sets the data.bounds on each node data\r
    // and Diagram.fixedBounds on the diagram, so the diagram knows how far it can scroll\r
    layoutTree(myWholeModel);\r
\r
    // remove the status indicator\r
    diagram.remove(myLoading);\r
  }\r
\r
  // this adds ._parent and ._children properties on each node data\r
  function improveNavigation(model) {\r
    // this must be a TreeModel\r
    var ndata = model.nodeDataArray;\r
    // create an Array of child data references for each parent data\r
    for (var i = 0; i < ndata.length; i++) {\r
      var child = ndata[i];\r
      var parentkey = model.getParentKeyForNodeData(child);\r
      var parent = model.findNodeDataForKey(parentkey);\r
      if (parent) {\r
        child._parent = parent;\r
        var childarr = parent._children;\r
        if (childarr) {\r
          childarr.push(child);\r
        } else {\r
          parent._children = [child];\r
        }\r
      }\r
    }\r
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
        model.addNodeData(n);\r
      }\r
      // make sure links to all parent nodes appear\r
      var parentkey = myWholeModel.getParentKeyForNodeData(n);\r
      var parent = myWholeModel.findNodeDataForKey(parentkey);\r
      if (parent !== null) {\r
        if (n.bounds.intersectsRect(viewb)) {\r
          // N is inside viewport\r
          model.addNodeData(parent); // so that link to parent appears\r
        } else {\r
          // N is outside of viewport\r
          // see if there's a parent that is in the viewport,\r
          // or if the link might cross over the viewport\r
          b.set(n.bounds);\r
          b.unionRect(parent.bounds);\r
          if (b.intersectsRect(viewb)) {\r
            model.addNodeData(n); // add N so that link to parent appears\r
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
    var viewb = diagram.viewportBounds;\r
    var model = diagram.model;\r
    var remove = []; // collect for later removal\r
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
        }\r
      }\r
    }\r
\r
    if (remove.length > 0) {\r
      var oldskips = diagram.skipsUndoManager;\r
      diagram.skipsUndoManager = true;\r
      model.removeNodeDataCollection(remove);\r
      diagram.skipsUndoManager = oldskips;\r
    }\r
\r
    updateCounts(); // only for this sample\r
  }\r
  // end of virtualized Diagram\r
\r
  // A very simple tree layout.\r
  // Basic tree layout parameters\r
  var nodeSpacing = 4;\r
  var layerSpacing = 50;\r
\r
  // Layout the whole tree just using the model, not any Nodes or Links.\r
  function layoutTree(model) {\r
    var ndata = model.nodeDataArray;\r
    // layout each tree root\r
    if (HORIZONTAL) {\r
      var y = 0;\r
      for (var i = 0; i < ndata.length; i++) {\r
        var d = ndata[i];\r
        // is this a root node?\r
        if (!d._parent) {\r
          y = walkTreeH(d, 0, y) + d.bounds.height + nodeSpacing;\r
        }\r
      }\r
    } else {\r
      // !HORIZONTAL\r
      var x = 0;\r
      for (var i = 0; i < ndata.length; i++) {\r
        var d = ndata[i];\r
        // is this a root node?\r
        if (!d._parent) {\r
          x = walkTreeV(d, x, 0) + d.bounds.width + nodeSpacing;\r
        }\r
      }\r
    }\r
\r
    // can't depend on regular bounds computation that depends on all Nodes existing\r
    myDiagram.fixedBounds = computeDocumentBounds();\r
  }\r
\r
  // Walk subtrees from each root node, positioning as we go.\r
  function walkTreeH(parent, oldx, oldy) {\r
    // HORIZONTAL\r
    var origy = oldy;\r
    var newy = oldy;\r
    var childarr = parent._children;\r
    if (childarr) {\r
      for (var i = 0; i < childarr.length; i++) {\r
        var child = childarr[i];\r
        newy = walkTreeH(child, oldx + child.bounds.width + layerSpacing, oldy);\r
        oldy = newy + child.bounds.height + nodeSpacing;\r
      }\r
    }\r
    parent.bounds.x = oldx;\r
    parent.bounds.y = (origy + newy) / 2;\r
    return newy;\r
  }\r
\r
  function walkTreeV(parent, oldx, oldy) {\r
    // !HORIZONTAL\r
    var origx = oldx;\r
    var newx = oldx;\r
    var childarr = parent._children;\r
    if (childarr) {\r
      for (var i = 0; i < childarr.length; i++) {\r
        var child = childarr[i];\r
        newx = walkTreeV(child, oldx, oldy + child.bounds.height + layerSpacing);\r
        oldx = newx + child.bounds.width + nodeSpacing;\r
      }\r
    }\r
    parent.bounds.x = (origx + newx) / 2;\r
    parent.bounds.y = oldy;\r
    return newx;\r
  }\r
  // end of layoutTree functionality\r
\r
  // This function is only used in this sample to demonstrate the effects of the virtualization.\r
  // In a real application you would delete this function and all calls to it.\r
  function updateCounts() {\r
    document.getElementById('myMessage1').textContent = myWholeModel.nodeDataArray.length;\r
    document.getElementById('myMessage2').textContent = myDiagram.nodes.count;\r
    document.getElementById('myMessage4').textContent = myDiagram.links.count;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`tooltips`,`performance`];var g=y();l(`1dpj01a`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};