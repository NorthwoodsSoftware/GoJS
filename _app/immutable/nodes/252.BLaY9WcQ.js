import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Single Page Diagram Editor with Legend`,indexDescription:`Show a diagram on a sheet of paper, limiting dragging and resizing to stay within the page minus margins.`,screenshot:`singlepage`,priority:2,tags:[`grid`,`legend`],description:`A diagram that shows a sheet of paper; nodes cannot be dragged or resized beyond the edge of the sheet.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 650px"></div>`,jsCode:`const pageSize = new go.Size(792, 612); // landscape, or new go.Size(612, 792) for portrait\r
  const pageMargin = new go.Margin(8); // margin around the sheet\r
  const usableMargin = new go.Margin(16); // padding inside sheet border\r
  const pageBounds = new go.Rect(-usableMargin.left, -usableMargin.top, pageSize.width, pageSize.height);\r
  const usableArea = pageBounds.copy().subtractMargin(usableMargin);\r
\r
  myDiagram = new go.Diagram('myDiagramDiv', {\r
    fixedBounds: pageBounds.copy().addMargin(pageMargin),\r
    initialAutoScale: go.AutoScale.Uniform,\r
    'animationManager.isInitial': false,\r
    'undoManager.isEnabled': true,\r
    'draggingTool.isGridSnapEnabled': true,\r
    'draggingTool.gridSnapCellSize': new go.Size(10, 10),\r
    'resizingTool.isGridSnapEnabled': true,\r
    'resizingTool.cellSize': new go.Size(10, 10),\r
    // override ResizingTool methods to limit where the resizing may go\r
    'resizingTool.doMouseMove': function () {\r
      // method override must be function, not =>\r
      var e = this.diagram.lastInput;\r
      e.documentPoint = limitPoint(e.documentPoint);\r
      e.viewPoint = this.diagram.transformDocToView(e.documentPoint);\r
      go.ResizingTool.prototype.doMouseMove.call(this);\r
    },\r
    'resizingTool.doMouseUp': function () {\r
      // method override must be function, not =>\r
      var e = this.diagram.lastInput;\r
      e.documentPoint = limitPoint(e.documentPoint);\r
      e.viewPoint = this.diagram.transformDocToView(e.documentPoint);\r
      go.ResizingTool.prototype.doMouseUp.call(this);\r
    },\r
    // if text has changed, maybe the node bounds has changed too\r
    TextEdited: e => {\r
      var node = e.subject.part;\r
      node.ensureBounds(); // has been resized, compute its new bounds\r
      var pt = limitPoint(node.location);\r
      node.location = stayInFixedArea(node, pt, pt);\r
    }\r
  });\r
\r
  // The background Part showing the sheet of paper;\r
  // it includes the fixed bounds of the diagram contents\r
  myDiagram.add(\r
    new go.Part('Grid', {\r
        layerName: 'Grid',\r
        position: pageBounds.position,\r
        desiredSize: pageSize,\r
        isShadowed: true,\r
        background: 'floralwhite'\r
      })\r
      .add(\r
        new go.Shape('LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),\r
        new go.Shape('LineV', { stroke: 'lightgray', strokeWidth: 0.5 })\r
      )\r
  );\r
\r
  // This function is the Node.dragComputation, to limit the movement of the parts.\r
  function stayInFixedArea(part, pt, gridpt) {\r
    const diagram = part.diagram;\r
    if (diagram === null) return pt;\r
    // compute the document area without padding\r
    const v = usableArea;\r
    // get the bounds of the part being dragged\r
    const bnd = part.actualBounds;\r
    const loc = part.location;\r
    // now limit the location appropriately\r
    const l = v.x + (loc.x - bnd.x);\r
    const r = v.right - (bnd.right - loc.x);\r
    const t = v.y + (loc.y - bnd.y);\r
    const b = v.bottom - (bnd.bottom - loc.y);\r
    if (l <= gridpt.x && gridpt.x <= r && t <= gridpt.y && gridpt.y <= b) return gridpt;\r
    const p = gridpt.copy();\r
    if (diagram.toolManager.draggingTool.isGridSnapEnabled) {\r
      // find a location that is inside V but also keeps the part's bounds within V\r
      const cw = diagram.grid.gridCellSize.width;\r
      if (cw > 0) {\r
        while (p.x > r) p.x -= cw;\r
        while (p.x < l) p.x += cw;\r
      }\r
      const ch = diagram.grid.gridCellSize.height;\r
      if (ch > 0) {\r
        while (p.y > b) p.y -= ch;\r
        while (p.y < t) p.y += ch;\r
      }\r
      return p;\r
    } else {\r
      p.x = Math.max(l, Math.min(p.x, r));\r
      p.y = Math.max(t, Math.min(p.y, b));\r
      return p;\r
    }\r
  }\r
\r
  function limitPoint(p) {\r
    return new go.Point(Math.max(usableArea.left, Math.min(p.x, usableArea.right)), Math.max(usableArea.top, Math.min(p.y, usableArea.bottom)));\r
  }\r
\r
  myDiagram.nodeTemplate =\r
    new go.Node('Auto', {\r
        resizable: true, // but limited by overrides of ResizingTool methods, above\r
        dragComputation: stayInFixedArea // this limits the DraggingTool\r
      })\r
      .add(\r
        new go.Shape({ fill: 'white', portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' })\r
          .bind('fill', 'color'),\r
        new go.TextBlock({ margin: 8, editable: true })\r
          .bindTwoWay('text')\r
      );\r
\r
  myDiagram.linkTemplate =\r
    new go.Link({ relinkableFrom: true, relinkableTo: true })\r
      .add(\r
        new go.Shape(),\r
        new go.Shape({ toArrow: 'OpenTriangle' })\r
      );\r
\r
  // The Legend Part, presumably a singleton\r
\r
  function makeField(name, propname, row, col, span) {\r
    if (!span) span = 1;\r
    return [\r
      new go.TextBlock( name, {\r
        row: row,\r
        column: col,\r
        columnSpan: span,\r
        alignment: go.Spot.TopLeft,\r
        margin: new go.Margin(2, 0, 16, 2),\r
        stroke: 'gray',\r
        font: '9pt sans-serif',\r
        isMultiline: false\r
      }),\r
      new go.TextBlock({\r
          row: row,\r
          column: col,\r
          columnSpan: span,\r
          alignment: go.Spot.Center,\r
          margin: new go.Margin(16, 4, 1, 4),\r
          textAlign: 'center',\r
          editable: true\r
        })\r
        .bindTwoWay('text', propname)\r
    ];\r
  }\r
\r
  function makeSeparator(row, col) {\r
    return new go.Shape('LineV', { row: row, column: col, width: 0, stretch: go.Stretch.Vertical, stroke: 'gray' });\r
  }\r
\r
  myDiagram.nodeTemplateMap.add('Legend',\r
    new go.Part('Auto', {\r
        layerName: 'Background',\r
        locationSpot: go.Spot.BottomRight,\r
        location: new go.Point().setRectSpot(usableArea, go.Spot.BottomRight),\r
        deletable: false,\r
        movable: false,\r
        copyable: false,\r
        selectionAdorned: false\r
      })\r
      .add(\r
        new go.Shape({ fill: 'white', stroke: 'gray' }),\r
        new go.Panel('Table', { defaultRowSeparatorStroke: 'gray' })\r
          .add(\r
            ...makeField('Title:', 'title', 0, 0, 5),\r
            ...makeField('Project:', 'name', 1, 0, 3),\r
            makeSeparator(1, 3),\r
            ...makeField('Number:', 'number', 1, 4)\r
          )\r
      )\r
  );\r
\r
  myDiagram.model = new go.GraphLinksModel(\r
    [\r
      { category: 'Legend', title: 'Sample Fixed Diagram', name: 'Your Company', number: '123-45a' },\r
      { key: 1, text: 'Alpha', color: 'lightblue' },\r
      { key: 2, text: 'Beta', color: 'orange' },\r
      { key: 3, text: 'Gamma', color: 'lightgreen' },\r
      { key: 4, text: 'Delta', color: 'pink' }\r
    ],\r
    [\r
      { from: 1, to: 2 },\r
      { from: 1, to: 3 },\r
      { from: 2, to: 2 },\r
      { from: 3, to: 4 },\r
      { from: 4, to: 1 }\r
    ]\r
  );`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This pretends to show a sheet of paper with the diagram on it.</p>\r
  <p>\r
    Both the <a>DraggingTool</a> and the <a>ResizingTool</a> are constrained to keep the nodes within the area of the sheet of paper, minus the margins. The\r
    user can zoom and scroll/pan normally. There are several variables, such as <code>pageSize</code>, that govern how the sheet of paper is set up.\r
  </p>\r
  <p>\r
    The Legend is implemented with a template that is assumed to only be used for a single Part. It is located at the bottom right corner of the usable area.\r
    Its text can be edited, and the legend adapts in size automatically.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`grid`,`legend`];var g=y();l(`1qoje3c`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};