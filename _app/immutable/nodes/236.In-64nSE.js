import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Diagram with Side and Top Rulers with Markers Showing Mouse Point`,titleShort:`Diagram with Rulers`,indexDescription:`A diagram with Graduated Panels at the edges acting as rulers.`,screenshot:`rulereddiagram`,priority:2,tags:[`geometries`,`grid`],description:`A diagram with Graduated panels at the edges acting as rulers`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:400px"></div>\r
  <button id="myPrintButton">Print</button>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true,  // enable undo & redo\r
      scrollMode: go.ScrollMode.Infinite,  // allow the diagram to be scrolled beyond content\r
      'grid.visible': true , // show that the ticks of the rulers always line up with the grid lines\r
      layout: new go.ForceDirectedLayout()\r
    });\r
\r
    // the templates don't really matter for this sample\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              strokeWidth: 0,\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 })\r
            .bind('text')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
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
      ]);\r
\r
    // Keep references to the scales and indicators to easily update them\r
    const gradScaleHoriz =\r
      new go.Part('Graduated', {\r
          graduatedTickUnit: 10,\r
          layerName: 'ViewportBackground',\r
          alignment: go.Spot.TopLeft,\r
          isAnimated: false\r
        })\r
        .add(\r
          new go.Shape({ geometryString: 'M0 0 H400' }),\r
          new go.Shape({ geometryString: 'M0 0 V4', interval: 1 }),\r
          new go.Shape({ geometryString: 'M0 0 V7', interval: 5 }),\r
          new go.Shape({ geometryString: 'M0 0 V15', interval: 10 }),\r
          new go.TextBlock({\r
            font: '10px sans-serif',\r
            interval: 10,\r
            alignmentFocus: go.Spot.TopLeft,\r
            segmentOffset: new go.Point(0, 7)\r
          })\r
        );\r
\r
    const gradScaleVert =\r
      new go.Part('Graduated', {\r
          graduatedTickUnit: 10,\r
          layerName: 'ViewportBackground',\r
          alignment: go.Spot.TopLeft,\r
          isAnimated: false\r
        })\r
        .add(\r
          new go.Shape({ geometryString: 'M0 0 V400' }),\r
          new go.Shape({ geometryString: 'M0 0 V4', interval: 1, alignmentFocus: go.Spot.Bottom }),\r
          new go.Shape({ geometryString: 'M0 0 V7', interval: 5, alignmentFocus: go.Spot.Bottom }),\r
          new go.Shape({ geometryString: 'M0 0 V15', interval: 10, alignmentFocus: go.Spot.Bottom }),\r
          new go.TextBlock({\r
            font: '10px sans-serif',\r
            segmentOrientation: go.Orientation.Opposite,\r
            interval: 10,\r
            alignmentFocus: go.Spot.BottomLeft,\r
            segmentOffset: new go.Point(0, -7)\r
          })\r
        );\r
\r
    const gradIndicatorHoriz =\r
      new go.Part({\r
          pickable: false,\r
          layerName: 'Grid',\r
          visible: false,\r
          isAnimated: false,\r
          locationSpot: go.Spot.Top\r
        })\r
        .add(\r
          new go.Shape({ geometryString: 'M0 0 V20', strokeWidth: 2, stroke: 'red' })\r
        );\r
\r
    const gradIndicatorVert =\r
      new go.Part({\r
          pickable: false,\r
          layerName: 'Grid',\r
          visible: false,\r
          isAnimated: false,\r
          locationSpot: go.Spot.Left\r
        })\r
        .add(\r
          new go.Shape({ geometryString: 'M0 0 H20', strokeWidth: 2, stroke: 'red' })\r
        );\r
\r
    // Add listeners to keep the scales/indicators in sync with the viewport\r
    myDiagram.addDiagramListener('InitialLayoutCompleted', setupScalesAndIndicators);\r
    myDiagram.addDiagramListener('ViewportBoundsChanged', e => { updateScales(); updateIndicators(); });\r
    myDiagram.mouseEnter = () => showIndicators(true);\r
    myDiagram.mouseLeave = () => showIndicators(false);\r
    // Override doMouseMove to keep indicators in sync\r
    myDiagram.doMouseMove = function() {  // method override must be function, not =>\r
      go.Diagram.prototype.doMouseMove.call(this);\r
      updateIndicators();\r
    }\r
\r
    function setupScalesAndIndicators() {\r
      myDiagram.commit(d => {\r
        // Add each node to the diagram\r
        d.add(gradScaleHoriz);\r
        d.add(gradScaleVert);\r
        d.add(gradIndicatorHoriz);\r
        d.add(gradIndicatorVert);\r
        updateScales();\r
        updateIndicators();\r
      }, null);  // null says to skip UndoManager recording of changes\r
    }\r
\r
    function updateScales(vb) {\r
      if (!vb) vb = myDiagram.viewportBounds;\r
      if (!vb.isReal()) return;\r
      myDiagram.commit(diag => {\r
        // Update properties of horizontal scale to reflect viewport\r
        gradScaleHoriz.elt(0).width = vb.width * diag.scale;\r
        gradScaleHoriz.graduatedMin = vb.x;\r
        gradScaleHoriz.graduatedMax = vb.right;\r
        // Update properties of vertical scale to reflect viewport\r
        gradScaleVert.elt(0).height = vb.height * diag.scale;\r
        gradScaleVert.graduatedMin = vb.y;\r
        gradScaleVert.graduatedMax = vb.bottom;\r
      }, null);\r
    }\r
\r
    function updateIndicators() {\r
      const vb = myDiagram.viewportBounds;\r
      if (!vb.isReal()) return;\r
      myDiagram.commit(diag => {\r
        const mouseCoords = diag.lastInput.documentPoint;\r
        // Keep the indicators in line with the mouse as viewport changes or mouse moves\r
        gradIndicatorHoriz.location = new go.Point(Math.max(mouseCoords.x, vb.x), vb.y);\r
        gradIndicatorHoriz.scale = 1 / diag.scale;\r
        gradIndicatorVert.location = new go.Point(vb.x, Math.max(mouseCoords.y, vb.y));\r
        gradIndicatorVert.scale = 1 / diag.scale;\r
      }, null);\r
    }\r
\r
    // Show indicators on mouseEnter of the diagram div; hide on mouseLeave\r
    function showIndicators(show) {\r
      myDiagram.commit(diag => {\r
        gradIndicatorHoriz.visible = show;\r
        gradIndicatorVert.visible = show;\r
      }, null);\r
    }\r
\r
\r
    // print the diagram by opening a new window holding SVG images of the diagram contents for each page\r
    function printDiagram() {\r
      const svgWindow = window.open();\r
      if (!svgWindow) return;  // failure to open a new Window\r
      svgWindow.document.title = 'GoJS Rulered Diagram';\r
      svgWindow.document.body.style.margin = '0px';\r
      const printSize = new go.Size(700, 960);\r
      const bnds = myDiagram.documentBounds.copy().unionRect(myDiagram.viewportBounds);\r
      let x = bnds.x;\r
      let y = bnds.y;\r
      while (y < bnds.bottom) {\r
        while (x < bnds.right) {\r
          const pagerect = new go.Rect(x, y, printSize.width, printSize.height);\r
          updateScales(pagerect);\r
          const svg = myDiagram.makeSvg({\r
            scale: 1.0,\r
            position: new go.Point(x, y),\r
            size: printSize,\r
            showGrid: true,\r
            showTemporary: true\r
          });\r
          svgWindow.document.body.appendChild(svg);\r
          x += printSize.width;\r
        }\r
        x = bnds.x;\r
        y += printSize.height;\r
      }\r
      // invoke the browser's print command\r
      setTimeout(() => { svgWindow.print(); svgWindow.updateScales(); svgWindow.close(); }, 1);\r
    }\r
\r
    document.getElementById('myPrintButton').addEventListener('click', printDiagram);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates a diagram with rulers at its edges and indicators which display the mouse's position.\r
  </p>\r
  <p>\r
    The rulers are implemented using <a href="../intro/graduatedPanels">Graduated Panels</a>. The main element of each panel is sized\r
    according to the width/height of the viewport, with the <a>Panel.graduatedMin</a> and <a>Panel.graduatedMax</a>\r
    being set to the edges of the viewport.\r
  </p>\r
  <p>\r
    Event listeners and Tool overrides are used to keep the rulers and indicators in sync as the viewport bounds change\r
    or the mouse moves around the diagram.\r
    <ul>\r
      <li>\r
        <code>ViewportBoundsChanged</code> listeners are used to keep the rulers and indicators against\r
        the edge of the diagram and to update the min and max values of the rulers.\r
      </li>\r
      <li>\r
        An <code>InitialLayoutCompleted</code> listener is used for initial placement after the diagram\r
        has positioned the rest of the nodes.\r
      </li>\r
      <li>\r
        <a>ToolManager.doMouseMove</a>, <a>LinkingTool.doMouseMove</a>, <a>DraggingTool.doMouseMove</a>,\r
        and <a>DragSelectingTool.doMouseMove</a> are overridden to update the mouse indicators after executing\r
        their default behavior. Each is overridden so that whichever tool is active will properly adjust the\r
        indicators in addition to its normal functionality.\r
      </li>\r
      <li>\r
        Finally, the Diagram's <a>Diagram.mouseEnter</a> and <a>Diagram.mouseLeave</a> event handlers show and hide\r
        the indicators as the mouse moves into or out of the diagram's HTMLDivElement.\r
      </li>\r
    </ul>\r
  </p>\r
  <p>\r
    The rulers and the indicators are implemented using simple <a>Part</a>s, not <a>Node</a>s, so that they\r
    are not treated as nodes by some layouts and so that they do not show up in the collection of <a>Diagram.nodes</a>.\r
    They are put in the "Grid" <a>Layer</a> so that any changes to them are not recorded\r
    by the UndoManager, because the "Grid" Layer has all of its Parts ignored by the UndoManager.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`geometries`,`grid`];var g=y();l(`qpvvdv`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};