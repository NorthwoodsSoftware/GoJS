import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Planogram Editor: Drag-and-Drop items onto Shelves and Racks`,titleShort:`Planogram`,indexDescription:`Drag-and-drop items from the Palette onto racks in the Diagram.`,screenshot:`planogram`,priority:2,tags:[`groups`,`palette`,`grid`,`frameworks`,`commands`],description:`An editor for defining planograms: visual displays of merchandise.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div style="width: 135px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black">\r
      <div class="tabs">\r
        <div class="tab">\r
          <input type="radio" id="rd1" name="rd" checked="true" />\r
          <label class="tab-label" for="rd1">Small items</label>\r
          <div class="tab-content">\r
            <div id="myPaletteSmall" style="width: 140px; height: 340px"></div>\r
          </div>\r
        </div>\r
        <div class="tab">\r
          <input type="radio" id="rd2" name="rd" />\r
          <label class="tab-label" for="rd2">Tall items</label>\r
          <div class="tab-content">\r
            <div id="myPaletteTall" style="width: 140px; height: 340px"></div>\r
          </div>\r
        </div>\r
        <div class="tab">\r
          <input type="radio" id="rd3" name="rd" />\r
          <label class="tab-label" for="rd3">Wide items</label>\r
          <div class="tab-content">\r
            <div id="myPaletteWide" style="width: 140px; height: 340px"></div>\r
          </div>\r
        </div>\r
        <div class="tab">\r
          <input type="radio" id="rd4" name="rd" />\r
          <label class="tab-label" for="rd4">Big items</label>\r
          <div class="tab-content">\r
            <div id="myPaletteBig" style="width: 140px; height: 340px"></div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 500px; border: solid 1px black"></div>\r
  </div>\r
  <div>\r
    Diagram Model saved in JSON format, automatically updated after each transaction:\r
    <pre id="savedModel" style="height: 250px"></pre>\r
  </div>`,jsCode:`// General Parameters for this app, used during initialization\r
  var AllowTopLevel = false;\r
  var CellSize = new go.Size(50, 50);\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      grid:\r
        new go.Panel('Grid', { gridCellSize: CellSize })\r
          .add(\r
            new go.Shape('LineH', { stroke: 'lightgray' }),\r
            new go.Shape('LineV', { stroke: 'lightgray' })\r
          ),\r
      // support grid snapping when dragging and when resizing\r
      'draggingTool.isGridSnapEnabled': true,\r
      'draggingTool.gridSnapCellSpot': go.Spot.Center,\r
      'resizingTool.isGridSnapEnabled': true,\r
      // For this sample, automatically show the state of the diagram's model on the page\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) {\r
          document.getElementById('savedModel').textContent = myDiagram.model.toJson();\r
        }\r
      },\r
      'animationManager.isEnabled': false,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // Regular Nodes represent items to be put onto racks.\r
    // Nodes are currently resizable, but if that is not desired, just set resizable to false.\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          // because the gridSnapCellSpot is Center, offset the Node's location\r
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2),\r
          // provide a visual warning about dropping anything onto an "item"\r
          mouseDragEnter: (e, node) => {\r
            e.handled = true;\r
            node.findObject('SHAPE').fill = 'red';\r
            e.diagram.currentCursor = 'not-allowed';\r
            highlightGroup(node.containingGroup, false);\r
          },\r
          mouseDragLeave: (e, node) => node.updateTargetBindings(),\r
          // disallow dropping anything onto an "item"\r
          mouseDrop: (e, node) => node.diagram.currentTool.doCancel()\r
        })\r
        // always save/load the point that is the top-left corner of the node, not the location\r
        .bindTwoWay('position', 'pos', go.Point.parse, go.Point.stringify)\r
        // this is the primary thing people see\r
        .add(\r
          new go.Shape('Rectangle', {\r
              name: 'SHAPE',\r
              fill: 'white',\r
              minSize: CellSize,\r
              desiredSize: CellSize // initially 1x1 cell\r
            })\r
            .bind('fill', 'color')\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify),\r
          // with the textual key in the middle\r
          new go.TextBlock({\r
              alignment: go.Spot.Center,\r
              font: 'bold 16px sans-serif'\r
            })\r
            .bind('text', 'key')\r
        ); // end Node\r
\r
    // Groups represent racks where items (Nodes) can be placed.\r
    // Currently they are movable and resizable, but you can change that\r
    // if you want the racks to remain "fixed".\r
    // Groups provide feedback when the user drags nodes onto them.\r
\r
    function highlightGroup(grp, show) {\r
      if (!grp) return false;\r
      // check that the drop may really happen into the Group\r
      var tool = grp.diagram.toolManager.draggingTool;\r
      grp.isHighlighted = show && grp.canAddMembers(tool.draggingParts);\r
      return grp.isHighlighted;\r
    }\r
\r
    var groupFill = 'rgba(128,128,128,0.2)';\r
    var groupStroke = 'gray';\r
    var dropFill = 'rgba(128,255,255,0.2)';\r
    var dropStroke = 'red';\r
\r
    myDiagram.groupTemplate =\r
      new go.Group({\r
          layerName: 'Background',\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          // because the gridSnapCellSpot is Center, offset the Group's location\r
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2),\r
          // what to do when a drag-over or a drag-drop occurs on a Group\r
          mouseDragEnter: (e, grp, prev) => {\r
            if (!highlightGroup(grp, true)) e.diagram.currentCursor = 'not-allowed';\r
            else e.diagram.currentCursor = '';\r
          },\r
          mouseDragLeave: (e, grp, next) => highlightGroup(grp, false),\r
          mouseDrop: (e, grp) => {\r
            var ok = grp.addMembers(grp.diagram.selection, true);\r
            if (!ok) grp.diagram.currentTool.doCancel();\r
          }\r
        })\r
        // always save/load the point that is the top-left corner of the node, not the location\r
        .bindTwoWay('position', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Rectangle', { // the rectangular shape around the members\r
              name: 'SHAPE',\r
              fill: groupFill,\r
              stroke: groupStroke,\r
              minSize: new go.Size(CellSize.width * 2, CellSize.height * 2)\r
            })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
            .bindObject('fill', 'isHighlighted', h => h ? dropFill : groupFill)\r
            .bindObject('stroke', 'isHighlighted', h => h ? dropStroke : groupStroke)\r
        );\r
\r
    // decide what kinds of Parts can be added to a Group\r
    myDiagram.commandHandler.memberValidation = (grp, node) => {\r
      if (grp instanceof go.Group && node instanceof go.Group) return false; // cannot add Groups to Groups\r
      // but dropping a Group onto the background is always OK\r
      return true;\r
    };\r
\r
    // what to do when a drag-drop occurs in the Diagram's background\r
    myDiagram.mouseDragOver = e => {\r
      if (!AllowTopLevel) {\r
        // OK to drop a group anywhere or any Node that is a member of a dragged Group\r
        var tool = e.diagram.toolManager.draggingTool;\r
        if (!tool.draggingParts.all(p => p instanceof go.Group || (!p.isTopLevel && tool.draggingParts.has(p.containingGroup)))) {\r
          e.diagram.currentCursor = 'not-allowed';\r
        } else {\r
          e.diagram.currentCursor = '';\r
        }\r
      }\r
    };\r
\r
    myDiagram.mouseDrop = e => {\r
      if (AllowTopLevel) {\r
        // when the selection is dropped in the diagram's background,\r
        // make sure the selected Parts no longer belong to any Group\r
        if (!e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true)) {\r
          e.diagram.currentTool.doCancel();\r
        }\r
      } else {\r
        // disallow dropping any regular nodes onto the background, but allow dropping "racks",\r
        // including any selected member nodes\r
        if (\r
          !e.diagram.selection.all(p => {\r
            return p instanceof go.Group || (!p.isTopLevel && p.containingGroup.isSelected);\r
          })\r
        ) {\r
          e.diagram.currentTool.doCancel();\r
        }\r
      }\r
    };\r
\r
    // start off with four "racks" that are positioned next to each other\r
    myDiagram.model = new go.GraphLinksModel([\r
      { key: 'G1', isGroup: true, pos: '0 0', size: '200 200' },\r
      { key: 'G2', isGroup: true, pos: '200 0', size: '200 200' },\r
      { key: 'G3', isGroup: true, pos: '0 200', size: '200 200' },\r
      { key: 'G4', isGroup: true, pos: '200 200', size: '200 200' }\r
    ]);\r
    // this sample does not make use of any links\r
\r
    // initialize the first Palette\r
    myPaletteSmall = new go.Palette('myPaletteSmall', {\r
      // share the templates with the main Diagram\r
      nodeTemplate: myDiagram.nodeTemplate,\r
      groupTemplate: myDiagram.groupTemplate\r
    });\r
\r
    var green = '#B2FF59';\r
    var blue = '#81D4FA';\r
    var yellow = '#FFEB3B';\r
\r
    // specify the contents of the Palette\r
    myPaletteSmall.model = new go.GraphLinksModel([\r
      { key: 'g', color: green },\r
      { key: 'b', color: blue },\r
      { key: 'y', color: yellow }\r
    ]);\r
\r
    // initialize the second Palette, of tall items\r
    myPaletteTall = new go.Palette('myPaletteTall', {\r
      // share the templates with the main Diagram\r
      nodeTemplate: myDiagram.nodeTemplate,\r
      groupTemplate: myDiagram.groupTemplate\r
    });\r
\r
    // specify the contents of the Palette\r
    myPaletteTall.model = new go.GraphLinksModel([\r
      { key: 'g', color: green, size: '50 100' },\r
      { key: 'b', color: blue, size: '50 100' },\r
      { key: 'y', color: yellow, size: '50 100' }\r
    ]);\r
\r
    // initialize the third Palette, of wide items\r
    myPaletteWide = new go.Palette('myPaletteWide', {\r
      // share the templates with the main Diagram\r
      nodeTemplate: myDiagram.nodeTemplate,\r
      groupTemplate: myDiagram.groupTemplate\r
    });\r
\r
    // specify the contents of the Palette\r
    myPaletteWide.model = new go.GraphLinksModel([\r
      { key: 'g', color: green, size: '100 50' },\r
      { key: 'b', color: blue, size: '100 50' },\r
      { key: 'y', color: yellow, size: '100 50' }\r
    ]);\r
\r
    // initialize the fourth Palette, of big items\r
    myPaletteBig = new go.Palette('myPaletteBig', {\r
      // share the templates with the main Diagram\r
      nodeTemplate: myDiagram.nodeTemplate,\r
      groupTemplate: myDiagram.groupTemplate\r
    });\r
\r
    // specify the contents of the Palette\r
    myPaletteBig.model = new go.GraphLinksModel([\r
      { key: 'g', color: green, size: '100 100' },\r
      { key: 'b', color: blue, size: '100 100' },\r
      { key: 'y', color: yellow, size: '100 100' }\r
    ]);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* This CSS is used to create the accordion for the Palettes */\r
  input {\r
    position: absolute;\r
    opacity: 0;\r
    z-index: -1;\r
  }\r
\r
  /* Accordion styles */\r
  .tabs {\r
    overflow: hidden;\r
  }\r
\r
  .tab {\r
    width: 100%;\r
    color: white;\r
    overflow: hidden;\r
  }\r
  .tab-label {\r
    display: flex;\r
    justify-content: space-between;\r
    padding: 0.5em;\r
    background: #1f4963;\r
    cursor: pointer;\r
  }\r
  .tab-label:hover {\r
    background: #627f91;\r
  }\r
  .tab-label::after {\r
    content: '❯';\r
    width: 1em;\r
    height: 1em;\r
    text-align: center;\r
    transition: all 0.35s;\r
  }\r
  .tab-content {\r
    max-height: 0;\r
    color: #2c3e50;\r
    background: white;\r
  }\r
  .tab-close {\r
    display: flex;\r
    justify-content: flex-end;\r
    padding: 1em;\r
    font-size: 0.75em;\r
    background: #2c3e50;\r
    cursor: pointer;\r
  }\r
  .tab-close:hover {\r
    background: #1a252f;\r
  }\r
\r
  input:checked + .tab-label {\r
    background: #1a252f;\r
  }\r
  input:checked + .tab-label::after {\r
    transform: rotate(90deg);\r
  }\r
  input:checked ~ .tab-content {\r
    max-height: 100vh;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>A <em>planogram</em> is a visual representation of a store's products or services, often used as a tool to maximize sales.</p>\r
  <p>\r
    Drag-and-drop "items" from the Palette onto "racks" in the Diagram. "Items" are implemented as Nodes; "racks" are implemented as Groups. Once items have\r
    been placed on a rack, they can be resized, if necessary. The <a>DraggingTool.isGridSnapEnabled</a> and <a>ResizingTool.isGridSnapEnabled</a> are both set\r
    to true to allow for snapping to the background grid. Node and Group templates both use dragging functions to allow for highlighting so the user knows which\r
    rack an item will belong to.\r
  </p>\r
  <p>A pure CSS Accordion is used to create the four collapsible Palettes.</p>\r
  <p>See also Northwoods Software's planogramming services: <a href="https://goplanogram.com" target="_blank">GoPlanogram</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`groups`,`palette`,`grid`,`frameworks`,`commands`];var g=y();l(`bifbhw`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};