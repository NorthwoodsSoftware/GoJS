import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Virtualized Diagram no Layout`,indexDescription:`Virtualized no Layout, an example of virtualization where the model holds 123,456 node data yet the diagram only creates a few nodes at a time.`,screenshot:`virtualized`,priority:2,tags:[`collections`,`groups`,`tooltips`,`buttons`,`performance`],description:`An example of virtualization where node bounds information is present in the node data, so no layout is required.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 600px"></div>\r
  <span id="mySpinner" class="loader"></span>\r
  <div>\r
    <p>This uses a <a>GraphLinksModel</a> but not any <a>Layout</a>. It demonstrates the virtualization of Links as well as simple Nodes.</p>\r
    Node data in Model: <span id="myMessage1"></span>. Actual Nodes in Diagram: <span id="myMessage2"></span>.<br />\r
    Link data in model: <span id="myMessage3"></span>. Actual Links in Diagram: <span id="myMessage4"></span>.\r
  </div>`,jsCode:`// The Diagram just shows what should be visible in the viewport.\r
  // Its model does NOT include node data for the whole graph, but only that\r
  // which might be visible in the viewport.\r
  const myDiagram = new go.Diagram('myDiagramDiv', {\r
    initialDocumentSpot: go.Spot.Center,\r
    initialViewportSpot: go.Spot.Center,\r
\r
    // Assume there's no Layout -- all data.bounds are provided\r
    layout: new go.Layout({ isInitial: false, isOngoing: false }), // never invalidates\r
\r
    // Define the template for Nodes, used by virtualization.\r
    nodeTemplate:\r
      new go.Node('Auto', {\r
          isLayoutPositioned: false,\r
          width: 70,\r
          height: 70,\r
          toolTip:\r
            go.GraphObject.build("ToolTip")\r
              .add(\r
                new go.TextBlock({ margin: 3 })\r
                  .bind('text', '', d => \`key: \${d.key}\\nbounds: \${d.bounds}\\ntext: \${d.text}\\nprop1: \${d.prop1}\\nprop2: \${d.prop2}\`)\r
              )\r
        })\r
        .bindTwoWay('position', 'bounds', b => b.position, (p, d) => new go.Rect(p.x, p.y, d.bounds.width, d.bounds.height))\r
        .add(\r
          new go.Shape('Rectangle')\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 2 })\r
            .bind('text', 'color')\r
        ),\r
    // Define the template for Links\r
    linkTemplate:\r
      new go.Link({ isLayoutPositioned: false })\r
        .add( // optimization\r
          new go.Shape({ strokeWidth: 2 })\r
            .bind('stroke', 'state', s => LinkColors[s]),\r
          new go.Shape({ toArrow: 'OpenTriangle', strokeWidth: 2 })\r
            .bind('stroke', 'state', s => LinkColors[s])\r
        ),\r
\r
    'animationManager.isEnabled': false\r
  });\r
\r
  const LinkColors = ['black', 'green', 'blue', 'red'];\r
\r
  // This model includes all of the data\r
  const myWholeModel = new go.GraphLinksModel(); // must match the model used by the Diagram, below\r
  const myWholeQuadtree = new go.Quadtree();\r
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
  myDiagram.addModelChangedListener(onModelChanged);\r
  myDiagram.model.makeUniqueKeyFunction = virtualUniqueKey; // ensure uniqueness in myWholeModel\r
  myDiagram.commandHandler.selectAll = () => {}; // make Select All command a no-op\r
\r
  myDiagram.delayInitialization(() => spinDuring(myDiagram, 'mySpinner', load));\r
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
    // create a lot of node data for the myWholeModel, and almost that many link data\r
    const total = 123456;\r
    const sqrt = Math.floor(Math.sqrt(total));\r
    const data = [];\r
    const ldata = [];\r
    myWholeQuadtree.clear();\r
    const temp = new go.Rect();\r
    for (let i = 0; i < total; i++) {\r
      const nd = {\r
        key: i, // this node data's key\r
        color: go.Brush.randomColor(), // the node's color\r
        //!!!???@@@ this needs to be customized to account for your chosen Node template\r
        bounds: new go.Rect((i % sqrt) * 140, Math.floor(i / sqrt) * 140, 70, 70),\r
        text: 'Node ' + i.toString(),\r
        prop1: Math.random() * 100,\r
        prop2: Math.random() * 100\r
      };\r
      data.push(nd);\r
      myWholeQuadtree.set(nd, nd.bounds.copy());\r
\r
      if (i > 0 && i % sqrt > 0) {\r
        // link sequential nodes\r
        const ld = {\r
          from: i - 1,\r
          to: i,\r
          state: Math.floor(Math.random() * 4)\r
        };\r
        ldata.push(ld);\r
      }\r
      if (i > sqrt) {\r
        // link nodes vertically\r
        const ld = {\r
          from: i - sqrt,\r
          to: i,\r
          state: Math.floor(Math.random() * 4)\r
        };\r
        ldata.push(ld);\r
      }\r
    }\r
    myWholeModel.nodeDataArray = data;\r
    myWholeModel.linkDataArray = ldata;\r
\r
    // there is no virtualized layout to perform, but we still\r
    // can't depend on regular bounds computation that depends on all Nodes existing\r
    myDiagram.fixedBounds = computeDocumentBounds();\r
  }\r
\r
  // The following functions implement virtualization of the Diagram\r
  // Assume data.bounds is a Rect of the area occupied by the Node in document coordinates.\r
\r
  // It's not good enough to ensure keys are unique in the limited model that is myDiagram.model --\r
  // need to ensure uniqueness in myWholeModel.\r
  function virtualUniqueKey(model, data) {\r
    myWholeModel.makeNodeDataKeyUnique(data);\r
    return myWholeModel.getKeyForNodeData(data);\r
  }\r
\r
  // The normal mechanism for determining the size of the document depends on all of the\r
  // Nodes and Links existing, so we need to use a function that depends only on the model data.\r
  function computeDocumentBounds() {\r
    const b = new go.Rect();\r
    const ndata = myWholeModel.nodeDataArray;\r
    for (let i = 0; i < ndata.length; i++) {\r
      const d = ndata[i];\r
      if (!d.bounds) continue;\r
      if (b.isEmpty()) b.set(d.bounds);\r
      else b.unionRect(d.bounds);\r
    }\r
    return b;\r
  }\r
\r
  // As the user scrolls or zooms, make sure the Parts (Nodes and Links) exist in the viewport.\r
  function onViewportChanged(e) {\r
    const diagram = e.diagram;\r
    // make sure there are Nodes for each node data that is in the viewport\r
    // and each Link that is connected to such a Node\r
    const viewb = diagram.viewportBounds; // the new viewportBounds\r
    const model = diagram.model;\r
\r
    const oldskips = diagram.skipsUndoManager;\r
    diagram.skipsUndoManager = true;\r
\r
    //?? this does NOT remove Nodes or Links that are outside of the viewport\r
\r
    const nset = myWholeQuadtree.find(viewb); // myWholeModel.nodeDataArray;\r
    nset.forEach(nd => {\r
      if (model.containsNodeData(nd)) return;\r
      if (!nd.bounds) return;\r
      if (nd.bounds.intersectsRect(viewb)) {\r
        addNode(diagram, myWholeModel, nd);\r
      }\r
    });\r
\r
    // not considering TreeModel\r
    if (model instanceof go.GraphLinksModel) {\r
      // this could be much more efficient if we kept track of links in a Quadtree;\r
      // but then we would need to be able to update the Quadtree efficiently as nodes moved\r
      const ldata = myWholeModel.linkDataArray;\r
      for (let i = 0; i < ldata.length; i++) {\r
        const l = ldata[i];\r
        if (model.containsLinkData(l)) continue;\r
\r
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
        const b = new go.Rect();\r
        b.set(from.bounds);\r
        b.unionRect(to.bounds);\r
        if (b.intersectsRect(viewb)) {\r
          // also make sure both connected nodes are present,\r
          // so that link routing is authentic\r
          addNode(diagram, myWholeModel, from);\r
          addNode(diagram, myWholeModel, to);\r
          model.addLinkData(l);\r
          const link = diagram.findLinkForData(l);\r
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
    updateCounts(); // only for this sample\r
  }\r
\r
  function addNode(diagram, wholeModel, data) {\r
    const model = diagram.model;\r
    if (model.containsNodeData(data)) return;\r
    model.addNodeData(data);\r
    const n = diagram.findNodeForData(data);\r
    if (n !== null) n.ensureBounds();\r
  }\r
\r
  function onModelChanged(e) {\r
    // handle moves and insertions and removals\r
    if (e.model.skipsUndoManager) return;\r
    if (e.change === go.ChangeType.Property) {\r
      if (e.propertyName === 'bounds') {\r
        myWholeQuadtree.move(e.object, e.newValue.bounds);\r
      }\r
    } else if (e.change === go.ChangeType.Insert) {\r
      if (e.propertyName === 'nodeDataArray') {\r
        myWholeModel.addNodeData(e.newValue);\r
        myWholeQuadtree.set(e.newValue, e.newValue.bounds);\r
      } else if (e.propertyName === 'linkDataArray') {\r
        myWholeModel.addLinkData(e.newValue);\r
      }\r
    } else if (e.change === go.ChangeType.Remove) {\r
      if (e.propertyName === 'nodeDataArray') {\r
        myWholeModel.removeNodeData(e.oldValue);\r
        myWholeQuadtree.delete(e.oldValue);\r
      } else if (e.propertyName === 'linkDataArray') {\r
        myWholeModel.removeLinkData(e.oldValue);\r
      }\r
    }\r
  }\r
  // end of virtualized Diagram\r
\r
  // This function is only used in this sample to demonstrate the effects of the virtualization.\r
  // In a real application you would delete this function and all calls to it.\r
  function updateCounts() {\r
    document.getElementById('myMessage1').textContent = myWholeModel.nodeDataArray.length;\r
    document.getElementById('myMessage2').textContent = myDiagram.nodes.count;\r
    document.getElementById('myMessage3').textContent = myWholeModel.linkDataArray.length;\r
    document.getElementById('myMessage4').textContent = myDiagram.links.count;\r
  }`,cssCode:`.loader {\r
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
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`groups`,`tooltips`,`buttons`,`performance`];var g=y();l(`1h3467m`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};