import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Absolute Positioning of Parts in div Element`,titleShort:`Absolute Positioning`,indexDescription:`A diagram that does not scroll or zoom or allow parts to be dragged out of a fixed area.`,screenshot:`absolute`,priority:2,description:`A diagram that does not scroll or zoom and has a fixed area in which to move parts.`},htmlContent:`<div id="myDiagramDiv" style="width: 100%; height: 400px; border: 1px solid black;"></div>\r
  <pre class="lang-js" style="max-height: 300px"><code id="mySavedModel"></code></pre>`,jsCode:`function init() {\r
    myDiagram =\r
      new go.Diagram('myDiagramDiv', {\r
        fixedBounds: new go.Rect(0, 0, 500, 300), // document is always 500x300 units\r
        contentAlignment: go.Spot.Center,\r
        allowHorizontalScroll: false, // disallow scrolling or panning\r
        allowVerticalScroll: false,\r
        allowZoom: false, // disallow zooming\r
        'animationManager.isEnabled': false,\r
        'undoManager.isEnabled': true,\r
        ModelChanged: e => {\r
          // just for demonstration purposes,\r
          if (e.isTransactionFinished) {\r
            // show the model data in the page's TextArea\r
            document.getElementById('mySavedModel').innerHTML = e.model.toJson();\r
          }\r
        }\r
      });\r
\r
    // the background Part showing the fixed bounds of the diagram contents\r
    myDiagram.add(\r
      new go.Part({\r
          layerName: 'ViewportBackground',\r
          alignment: go.Spot.Center,\r
          isShadowed: true,\r
          padding: 1\r
        })\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({strokeWidth: 0}),\r
              new go.Shape({\r
                fill: new go.Brush('Linear', {\r
                  0: go.Brush.lightenBy('oldlace', 0.5),\r
                  0.5: 'oldlace',\r
                  1: go.Brush.darkenBy('oldlace', 0.01),\r
                  start: go.Spot.TopLeft,\r
                  end: go.Spot.BottomRight\r
                }),\r
                strokeWidth: 1,\r
                stroke: 'transparent',\r
                desiredSize: myDiagram.fixedBounds.size,\r
                margin: 1\r
              })\r
            )\r
        ));\r
\r
    // This function is the Node.dragComputation, to limit the movement of the parts.\r
    function stayInFixedArea(part, pt, gridpt) {\r
      var diagram = part.diagram;\r
      if (diagram === null) return pt;\r
      // compute the document area without padding\r
      var v = diagram.documentBounds.copy().subtractMargin(diagram.padding);\r
      // get the bounds of the part being dragged\r
      var bnd = part.actualBounds;\r
      var loc = part.location;\r
      // now limit the location appropriately\r
      var l = v.x + (loc.x - bnd.x);\r
      var r = v.right - (bnd.right - loc.x);\r
      var t = v.y + (loc.y - bnd.y);\r
      var b = v.bottom - (bnd.bottom - loc.y);\r
      if (l <= gridpt.x && gridpt.x <= r && t <= gridpt.y && gridpt.y <= b) return gridpt;\r
      var p = gridpt.copy();\r
      if (diagram.toolManager.draggingTool.isGridSnapEnabled) {\r
        // find a location that is inside V but also keeps the part's bounds within V\r
        var cw = diagram.grid.gridCellSize.width;\r
        if (cw > 0) {\r
          while (p.x > r) p.x -= cw;\r
          while (p.x < l) p.x += cw;\r
        }\r
        var ch = diagram.grid.gridCellSize.height;\r
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
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          dragComputation: stayInFixedArea\r
        })\r
        .bind('desiredSize', 'size', go.Size.parse) // get the size from the model data\r
        .bindTwoWay('position', 'pos', go.Point.parse, go.Point.stringify) // get and set the position\r
        .bindObject('layerName', 'isSelected', s => s ? 'Foreground' : '') // temporarily put selected nodes in Foreground layer\r
        .add(\r
          new go.Shape('Rectangle', {\r
              strokeWidth: 1\r
            }) // avoid extra thickness from the stroke\r
            .bind('fill', 'color')\r
            .bind('stroke', 'color', value => go.Brush.darken(value)),\r
          new go.TextBlock()\r
            .bind('text', 'color')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 'Alpha', pos: '0 0', size: '50 50', color: 'lightblue' },\r
        { key: 'Beta', pos: '276 19', size: '100 100', color: 'orange' },\r
        { key: 'Gamma', pos: '44 214', size: '100 50', color: 'lightgreen' },\r
        { key: 'Delta', pos: '239 171', size: '50 100', color: 'pink' }\r
      ],\r
      [\r
        { from: 'Alpha', to: 'Beta' },\r
        { from: 'Alpha', to: 'Gamma' },\r
        { from: 'Gamma', to: 'Delta' },\r
        { from: 'Delta', to: 'Alpha' }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Absolute positioning within the viewport (represented by the paper-colored\r
    rectangle with the shadow), with no scrolling, panning, or zooming allowed.\r
  </p>\r
  <p>\r
    The special colored background Part shows the fixed area where Parts may\r
    be. It is in the "Grid" Layer so that it is not selectable and is\r
    always behind the regular Parts.\r
  </p>\r
  <p>\r
    Parts may not be dragged outside of the fixed document area of the diagram.\r
    This is implemented by a custom <a>Part.dragComputation</a> function.\r
  </p>\r
  <p>Note that the user may still scroll or zoom the whole page.</p>\r
  <p>\r
    The model data, automatically updated after each change or undo or redo:\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[];var g=y();l(`qm4r8q`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};