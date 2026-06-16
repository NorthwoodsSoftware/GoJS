import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Limit Dragging of Nodes to Unoccupied Areas in Diagram`,titleShort:`Drag Unoccupied`,indexDescription:`Demonstrates a function to avoid any overlapping of nodes during dragging.`,screenshot:`dragunoccupied`,priority:2,description:`Limit the dragging of nodes to avoid any overlap with other nodes.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myPaletteDiv" style="width: 100px; background-color: floralwhite; border: solid 1px black; margin-right: 2px"></div>\r
    <div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 400px"></div>\r
  </div>`,jsCode:`function init() {\r
    // R is a Rect in document coordinates\r
    // NODE is the Node being moved -- ignore when looking for Parts intersecting the Rect\r
    function isUnoccupied(r, node) {\r
      const diagram = node.diagram;\r
\r
      // nested function used by Layer.findObjectsIn, below\r
      // only consider Parts, and ignore the given Node, any Links, and Group members\r
      function navig(obj) {\r
        const part = obj.part;\r
        if (part === node) return null;\r
        if (part instanceof go.Link) return null;\r
        if (part.isMemberOf(node)) return null;\r
        if (node.isMemberOf(part)) return null;\r
        return part;\r
      }\r
\r
      // only consider non-temporary Layers\r
      const lit = diagram.layers;\r
      while (lit.next()) {\r
        const lay = lit.value;\r
        if (lay.isTemporary) continue;\r
        if (lay.findObjectsIn(r, navig, null, true).count > 0) return false;\r
      }\r
      return true;\r
    }\r
\r
    // a Part.dragComputation function that prevents a Part from being dragged to overlap another Part\r
    // use PT instead of GRIDPT if DraggingTool.isGridSnapEnabled but movement should not snap to grid\r
    function avoidNodeOverlap(node, pt, gridpt) {\r
      if (node.diagram instanceof go.Palette) return gridpt;\r
      // this assumes each node is fully rectangular\r
      const bnds = node.actualBounds;\r
      const loc = node.location;\r
      // use PT instead of GRIDPT if you want to ignore any grid snapping behavior\r
      // see if the area at the proposed location is unoccupied\r
      const r = new go.Rect(gridpt.x - (loc.x - bnds.x), gridpt.y - (loc.y - bnds.y), bnds.width, bnds.height);\r
      // maybe inflate R if you want some space between the node and any other nodes\r
      r.inflate(-0.5, -0.5); // by default, deflate to avoid edge overlaps with "exact" fits\r
      // when dragging a node from another Diagram, choose an unoccupied area\r
      if (!(node.diagram.currentTool instanceof go.DraggingTool) && (!node._temp || !node.layer.isTemporary)) {\r
        // in Temporary Layer during external drag-and-drop\r
        node._temp = true; // flag to avoid repeated searches during external drag-and-drop\r
        while (!isUnoccupied(r, node)) {\r
          r.x += 10; // note that this is an unimaginative search algorithm --\r
          r.y += 2; // you can improve the search here to be more appropriate for your app\r
        }\r
        r.inflate(0.5, 0.5); // restore to actual size\r
        // return the proposed new location point\r
        return new go.Point(r.x - (loc.x - bnds.x), r.y - (loc.y - bnds.y));\r
      }\r
      if (isUnoccupied(r, node)) return gridpt; // OK\r
      return loc; // give up -- don't allow the node to be moved to the new location\r
    }\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // Define the template for Nodes, just some text inside a colored rectangle\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          dragComputation: avoidNodeOverlap,\r
          minSize: new go.Size(50, 20),\r
          resizable: true\r
        })\r
        .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        .bindTwoWay('position', 'pos', go.Point.parse, go.Point.stringify)\r
        // temporarily put selected nodes in Foreground layer\r
        .bindObject('layerName', 'isSelected', s => s ? 'Foreground' : '')\r
        .add(\r
          new go.Shape('Rectangle')\r
            .bind('fill', 'color'),\r
          new go.TextBlock()\r
            .bind('text', 'color')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel([\r
      { pos: '-30 0', size: '50 300', color: go.Brush.randomColor() },\r
      { pos: '120 20', size: '300 50', color: go.Brush.randomColor() },\r
      { pos: '100 200', size: '300 50', color: go.Brush.randomColor() },\r
      { pos: '500 50', size: '50 300', color: go.Brush.randomColor() },\r
      { key: 1, pos: '100 100', size: '50 50', color: 'gray' },\r
      { key: 2, pos: '200 140', size: '50 50', color: 'gray' }\r
    ]);\r
\r
    myDiagram.findNodeForKey(1).isSelected = true;\r
\r
    // initialize the Palette that is on the left side of the page\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram\r
      model: new go.GraphLinksModel([\r
        // specify the contents of the Palette\r
        { size: '50 50', color: go.Brush.randomColor() },\r
        { size: '60 40', color: go.Brush.randomColor() }\r
      ])\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Drag a node around. Notice how you cannot force the dragged node to overlap any other (stationary) node. If you drag more than one node, notice how the\r
    relative positions of the dragged nodes are maintained except when forced to be shifted in order to avoid overlapping other nodes.\r
  </p>\r
  <p>\r
    This functionality is implemented by a custom <a>Part.dragComputation</a> property function, which affects how the <a>DraggingTool</a> can move selected\r
    nodes. You will want to adjust how it finds an empty spot for the dragged node when dragging from another Diagram.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[];var g=y();l(`x8pnv2`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};