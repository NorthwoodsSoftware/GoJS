import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Vertical, Collapsible, Resizable, Re-orderable Swim Lanes for Flow Diagram`,titleShort:`Swim Lanes (Vertical)`,indexDescription:`Demonstrates collapsible, resizable, re-orderable swimlanes, a kind of process-flow diagram, with custom dragging rules that disallow nodes from leaving their lane.`,screenshot:`swimlanesvertical`,priority:2,tags:[`tables`,`gridlayout`,`layered-digraph`,`customlayout`,`groups`,`tools`,`buttons`],description:`Vertical swim lanes and pools with collapsible lanes and limited dragging.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <button onclick="relayoutLanes()">Diagram Layout</button>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px"></textarea>`,jsCode:`// These parameters need to be set before defining the templates.\r
  const MINLENGTH = 200; // this controls the minimum length of any swimlane\r
  const MINBREADTH = 20; // this controls the minimum breadth of any non-collapsed swimlane\r
\r
  // some shared functions\r
\r
  // this may be called to force the lanes to be laid out again\r
  function relayoutLanes() {\r
    myDiagram.nodes.each(lane => {\r
      if (!(lane instanceof go.Group)) return;\r
      if (lane.category === 'Pool') return;\r
      lane.layout.isValidLayout = false; // force it to be invalid\r
    });\r
    myDiagram.layoutDiagram();\r
  }\r
\r
  // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again\r
  function relayoutDiagram(diagram) {\r
    diagram.layout.invalidateLayout();\r
    diagram.findTopLevelGroups().each(g => {\r
      if (g.category === 'Pool') g.layout.invalidateLayout();\r
    });\r
    diagram.layoutDiagram();\r
  }\r
\r
  // compute the minimum size of a Pool Group needed to hold all of the Lane Groups\r
  function computeMinPoolSize(pool) {\r
    // assert(pool instanceof go.Group && pool.category === "Pool");\r
    let len = MINLENGTH;\r
    pool.memberParts.each(lane => {\r
      // pools ought to only contain lanes, not plain Nodes\r
      if (!(lane instanceof go.Group)) return;\r
      const holder = lane.placeholder;\r
      if (holder !== null) {\r
        len = Math.max(len, holder.actualBounds.height);\r
      }\r
    });\r
    return new go.Size(NaN, len);\r
  }\r
\r
  // compute the minimum size for a particular Lane Group\r
  function computeLaneSize(lane) {\r
    // assert(lane instanceof go.Group && lane.category !== "Pool");\r
    const sz = computeMinLaneSize(lane);\r
    if (lane.isSubGraphExpanded) {\r
      const holder = lane.placeholder;\r
      if (holder !== null) {\r
        const hsz = holder.actualBounds;\r
        sz.width = Math.ceil(Math.max(sz.width, hsz.width));\r
      }\r
    }\r
    // minimum breadth needs to be big enough to hold the header\r
    const hdr = lane.findObject('HEADER');\r
    if (hdr !== null) sz.width = Math.ceil(Math.max(sz.width, hdr.actualBounds.width));\r
    return sz;\r
  }\r
\r
  // determine the minimum size of a Lane Group, even if collapsed\r
  function computeMinLaneSize(lane) {\r
    if (!lane.isSubGraphExpanded) return new go.Size(1, MINLENGTH);\r
    return new go.Size(MINBREADTH, MINLENGTH);\r
  }\r
\r
  // define a custom ResizingTool to limit how far one can shrink a lane Group\r
  class LaneResizingTool extends go.ResizingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    isLengthening() {\r
      return this.handle.alignment === go.Spot.Bottom;\r
    }\r
\r
    computeMinPoolSize() {\r
      const lane = this.adornedObject.part;\r
      // assert(lane instanceof go.Group && lane.category !== "Pool");\r
      const msz = computeMinLaneSize(lane); // get the absolute minimum size\r
      if (this.isLengthening()) {\r
        // compute the minimum length of all lanes\r
        const sz = computeMinPoolSize(lane.containingGroup);\r
        msz.height = Math.max(msz.height, sz.height);\r
      } else {\r
        // find the minimum size of this single lane\r
        const sz = computeLaneSize(lane);\r
        msz.width = Math.max(msz.width, sz.width);\r
        msz.height = Math.max(msz.height, sz.height);\r
      }\r
      return msz;\r
    }\r
\r
    resize(newr) {\r
      const lane = this.adornedObject.part;\r
      if (this.isLengthening()) {\r
        // changing the length of all of the lanes\r
        lane.containingGroup.memberParts.each(lane => {\r
          if (!(lane instanceof go.Group)) return;\r
          const shape = lane.resizeObject;\r
          if (shape !== null) {\r
            // set its desiredSize length, but leave each breadth alone\r
            shape.height = newr.height;\r
          }\r
        });\r
      } else {\r
        // changing the breadth of a single lane\r
        super.resize(newr);\r
      }\r
      relayoutDiagram(this.diagram); // now that the lane has changed size, layout the pool again\r
    }\r
  }\r
  // end LaneResizingTool class\r
\r
  // define a custom grid layout that makes sure the length of each lane is the same\r
  // and that each lane is broad enough to hold its subgraph\r
  class PoolLayout extends go.GridLayout {\r
    constructor(init) {\r
      super();\r
      this.cellSize = new go.Size(1, 1);\r
      this.wrappingColumn = Infinity;\r
      this.wrappingWidth = Infinity;\r
      this.isRealtime = false; // don't continuously layout while dragging\r
      this.alignment = go.GridAlignment.Position;\r
      // This sorts based on the location of each Group.\r
      // This is useful when Groups can be moved up and down in order to change their order.\r
      this.comparer = (a, b) => {\r
        const ax = a.location.x;\r
        const bx = b.location.x;\r
        if (isNaN(ax) || isNaN(bx)) return 0;\r
        if (ax < bx) return -1;\r
        if (ax > bx) return 1;\r
        return 0;\r
      };\r
      this.boundsComputation = (part, layout, rect) => {\r
        part.getDocumentBounds(rect);\r
        rect.inflate(-1, -1); // negative strokeWidth of the border Shape\r
        return rect;\r
      };\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    doLayout(coll) {\r
      const diagram = this.diagram;\r
      if (diagram === null) return;\r
      diagram.startTransaction('PoolLayout');\r
      const pool = this.group;\r
      if (pool !== null && pool.category === 'Pool') {\r
        // make sure all of the Group Shapes are big enough\r
        const minsize = computeMinPoolSize(pool);\r
        pool.memberParts.each(lane => {\r
          if (!(lane instanceof go.Group)) return;\r
          if (lane.category !== 'Pool') {\r
            const shape = lane.resizeObject;\r
            if (shape !== null) {\r
              // change the desiredSize to be big enough in both directions\r
              const sz = computeLaneSize(lane);\r
              shape.width = !isNaN(shape.width) ? Math.max(shape.width, sz.width) : sz.width;\r
              shape.height = isNaN(shape.height) ? minsize.height : Math.max(shape.height, minsize.height);\r
              const cell = lane.resizeCellSize;\r
              if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;\r
              if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;\r
            }\r
          }\r
        });\r
      }\r
      // now do all of the usual stuff, according to whatever properties have been set on this GridLayout\r
      super.doLayout(coll);\r
      diagram.commitTransaction('PoolLayout');\r
    }\r
  }\r
  // end PoolLayout class\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // use a custom ResizingTool (along with a custom ResizeAdornment on each Group)\r
      resizingTool: new LaneResizingTool(),\r
      // use a simple layout that ignores links to stack the top-level Pool Groups next to each other\r
      layout: new PoolLayout(),\r
      // don't allow dropping onto the diagram's background unless they are all Groups (lanes or pools)\r
      mouseDragOver: e => {\r
        if (!e.diagram.selection.all(n => n instanceof go.Group)) {\r
          e.diagram.currentCursor = 'not-allowed';\r
        }\r
      },\r
      mouseDrop: e => {\r
        if (!e.diagram.selection.all(n => n instanceof go.Group)) {\r
          e.diagram.currentTool.doCancel();\r
        }\r
      },\r
      // a clipboard copied node is pasted into the original node's group (i.e. lane).\r
      'commandHandler.copiesGroupKey': true,\r
      // automatically re-layout the swim lanes after dragging the selection\r
      SelectionMoved: e => relayoutDiagram(e.diagram),\r
      SelectionCopied: e => relayoutDiagram(e.diagram),\r
      'animationManager.isEnabled': false,\r
      // enable undo & redo\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) { if (idx < 0) document.title += '*'; }\r
      else { if (idx >= 0) document.title = document.title.slice(0, idx); }\r
    });\r
\r
    // this is a Part.dragComputation function for limiting where a Node may be dragged\r
    // use GRIDPT instead of PT if DraggingTool.isGridSnapEnabled and movement should snap to grid\r
    function stayInGroup(part, pt, gridpt) {\r
      // don't constrain top-level nodes\r
      const grp = part.containingGroup;\r
      if (grp === null) return pt;\r
      // try to stay within the background Shape of the Group\r
      const back = grp.resizeObject;\r
      if (back === null) return pt;\r
      // allow dragging a Node out of a Group if the Shift key is down\r
      if (part.diagram.lastInput.shift) return pt;\r
      const r = back.getDocumentBounds();\r
      const b = part.actualBounds;\r
      const loc = part.location;\r
      // find the padding inside the group's placeholder that is around the member parts\r
      const m = grp.placeholder.padding;\r
      // now limit the location appropriately\r
      const x = Math.max(r.x + m.left, Math.min(pt.x, r.right - m.right - b.width - 1)) + (loc.x - b.x);\r
      const y = Math.max(r.y + m.top, Math.min(pt.y, r.bottom - m.bottom - b.height - 1)) + (loc.y - b.y);\r
      return new go.Point(x, y);\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          dragComputation: stayInGroup // limit dragging of Nodes to stay within the containing Group, defined above\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Rectangle', {\r
            fill: 'white',\r
            portId: '',\r
            cursor: 'pointer',\r
            fromLinkable: true,\r
            toLinkable: true\r
          }),\r
          new go.TextBlock({ margin: 5 })\r
            .bind('text', 'key')\r
        );\r
\r
    function groupStyle(grp) {\r
      // common settings for both Lane and Pool Groups\r
      grp.layerName = 'Background'; // all pools and lanes are always behind all nodes and links\r
      grp.background = 'transparent'; // can grab anywhere in bounds\r
      grp.movable = true; // allows users to re-order by dragging\r
      grp.copyable = false; // can't copy lanes or pools\r
      grp.avoidable = false; // don't impede AvoidsNodes routed Links\r
      grp.minLocation = new go.Point(-Infinity, NaN); // only allow horizontal movement\r
      grp.maxLocation = new go.Point(Infinity, NaN);\r
      grp.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);\r
    }\r
\r
    // hide links between lanes when either lane is collapsed\r
    function updateCrossLaneLinks(group) {\r
      group.findExternalLinksConnected().each(l => {\r
        l.visible = l.fromNode.isVisible() && l.toNode.isVisible();\r
      });\r
    }\r
\r
    // each Group is a "swimlane" with a header on the left and a resizable lane on the right\r
    myDiagram.groupTemplateMap.add('Lane',\r
      new go.Group('Vertical')\r
        .apply(groupStyle)\r
        .set({\r
          selectionObjectName: 'SHAPE', // selecting a lane causes the body of the lane to be highlit, not the label\r
          resizable: true,\r
          resizeObjectName: 'SHAPE', // the custom resizeAdornmentTemplate only permits two kinds of resizing\r
          layout: new go.LayeredDigraphLayout({ // automatically lay out the lane's subgraph\r
            isInitial: false, // don't even do initial layout\r
            isOngoing: false, // don't invalidate layout when nodes or links are added or removed\r
            direction: 90,\r
            columnSpacing: 10,\r
            layeringOption: go.LayeredDigraphLayering.LongestPathSource\r
          }),\r
          computesBoundsAfterDrag: true, // needed to prevent recomputing Group.placeholder bounds too soon\r
          computesBoundsIncludingLinks: false, // to reduce occurrences of links going briefly outside the lane\r
          computesBoundsIncludingLocation: true, // to support empty space at top-left corner of lane\r
          handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links\r
          mouseDrop: (e, grp) => {\r
            // dropping a copy of some Nodes and Links onto this Group adds them to this Group\r
            if (!e.shift) return; // cannot change groups with an unmodified drag-and-drop\r
            // don't allow drag-and-dropping a mix of regular Nodes and Groups\r
            if (!e.diagram.selection.any(n => n instanceof go.Group)) {\r
              const ok = grp.addMembers(grp.diagram.selection, true);\r
              if (ok) {\r
                updateCrossLaneLinks(grp);\r
              } else {\r
                grp.diagram.currentTool.doCancel();\r
              }\r
            } else {\r
              e.diagram.currentTool.doCancel();\r
            }\r
          },\r
          subGraphExpandedChanged: grp => {\r
            const shp = grp.resizeObject;\r
            if (grp.diagram.undoManager.isUndoingRedoing) return;\r
            if (grp.isSubGraphExpanded) {\r
              shp.width = grp.data.savedBreadth;\r
            } else {\r
              if (!isNaN(shp.width)) grp.diagram.model.set(grp.data, 'savedBreadth', shp.width);\r
              shp.width = NaN;\r
            }\r
            updateCrossLaneLinks(grp);\r
          }\r
        })\r
        .bindTwoWay('isSubGraphExpanded', 'expanded')\r
        .add(\r
          // the lane header consisting of a Shape and a TextBlock\r
          new go.Panel('Horizontal', {\r
              name: 'HEADER',\r
              angle: 0, // maybe rotate the header to read sideways going up\r
              alignment: go.Spot.Center\r
            })\r
            .add(\r
              new go.Panel('Horizontal') // this is hidden when the swimlane is collapsed\r
                .bindObject('visible', 'isSubGraphExpanded')\r
                .add(\r
                  new go.Shape('Diamond', {\r
                      width: 8,\r
                      height: 8,\r
                      fill: 'white'\r
                    })\r
                    .bind('fill', 'color'),\r
                  new go.TextBlock({ // the lane label\r
                      font: 'bold 13pt sans-serif',\r
                      editable: true,\r
                      margin: new go.Margin(2, 0, 0, 0)\r
                    })\r
                    .bindTwoWay('text')\r
                ),\r
                go.GraphObject.build('SubGraphExpanderButton', { margin: 5 }) // but this remains always visible!\r
            ),\r
          new go.Panel('Auto') // the lane consisting of a background Shape and a Placeholder representing the subgraph\r
            .add(\r
              new go.Shape('Rectangle', { // this is the resized object\r
                  name: 'SHAPE',\r
                  fill: 'white'\r
                })\r
                .bind('fill', 'color')\r
                .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify),\r
              new go.Placeholder({ padding: 12, alignment: go.Spot.TopLeft }),\r
              new go.TextBlock({ // this TextBlock is only seen when the swimlane is collapsed\r
                  name: 'LABEL',\r
                  font: 'bold 13pt sans-serif',\r
                  editable: true,\r
                  angle: 90,\r
                  alignment: go.Spot.TopLeft,\r
                  margin: new go.Margin(4, 0, 0, 2)\r
                })\r
                .bindObject('visible', 'isSubGraphExpanded', e => !e)\r
                .bindTwoWay('text')\r
            )\r
        ));\r
\r
    // define a custom resize adornment that has two resize handles if the group is expanded\r
    myDiagram.groupTemplateMap.get('Lane').resizeAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Placeholder(),\r
          new go.Shape({ // for changing the length of a lane\r
              alignment: go.Spot.Bottom,\r
              desiredSize: new go.Size(50, 7),\r
              fill: 'lightblue',\r
              stroke: 'dodgerblue',\r
              cursor: 'row-resize'\r
            })\r
            .bindObject('visible', '', ad => {\r
              if (ad.adornedPart === null) return false;\r
              return ad.adornedPart.isSubGraphExpanded;\r
            }),\r
          new go.Shape({ // for changing the breadth of a lane\r
              alignment: go.Spot.Right,\r
              desiredSize: new go.Size(7, 50),\r
              fill: 'lightblue',\r
              stroke: 'dodgerblue',\r
              cursor: 'col-resize'\r
            })\r
            .bindObject('visible', '', ad => {\r
              if (ad.adornedPart === null) return false;\r
              return ad.adornedPart.isSubGraphExpanded;\r
            })\r
        );\r
\r
    myDiagram.groupTemplateMap.add('Pool',\r
      new go.Group('Auto')\r
        .apply(groupStyle)\r
        .set({\r
          // use a simple layout that ignores links to stack the "lane" Groups next to each other\r
          layout: new PoolLayout({\r
              cellSize: new go.Size(1, 1),\r
              spacing: new go.Size(0, 0)\r
            }) // no space between lanes\r
        })\r
        .add(\r
          new go.Shape({ fill: 'white' })\r
            .bind('fill', 'color'),\r
          new go.Panel('Table', { defaultRowSeparatorStroke: 'black' })\r
            .add(\r
              new go.Panel('Horizontal', { row: 0, angle: 0 })\r
                .add(\r
                  new go.TextBlock({\r
                      font: 'bold 16pt sans-serif',\r
                      editable: true,\r
                      margin: new go.Margin(2, 0, 0, 0)\r
                    })\r
                    .bindTwoWay('text')\r
                ),\r
              new go.Placeholder({ row: 1 })\r
            )\r
        ));\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 5,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    // define some sample graphs in some of the lanes\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        // node data\r
        { key: 'Pool1', text: 'Pool', isGroup: true, category: 'Pool' },\r
        { key: 'Pool2', text: 'Pool2', isGroup: true, category: 'Pool' },\r
        { key: 'Lane1', text: 'Lane1', isGroup: true, category: 'Lane', group: 'Pool1', color: 'lightblue' },\r
        { key: 'Lane2', text: 'Lane2', isGroup: true, category: 'Lane', group: 'Pool1', color: 'lightgreen' },\r
        { key: 'Lane3', text: 'Lane3', isGroup: true, category: 'Lane', group: 'Pool1', color: 'lightyellow' },\r
        { key: 'Lane4', text: 'Lane4', isGroup: true, category: 'Lane', group: 'Pool1', color: 'orange' },\r
        { key: 'oneA', group: 'Lane1' },\r
        { key: 'oneB', group: 'Lane1' },\r
        { key: 'oneC', group: 'Lane1' },\r
        { key: 'oneD', group: 'Lane1' },\r
        { key: 'twoA', group: 'Lane2' },\r
        { key: 'twoB', group: 'Lane2' },\r
        { key: 'twoC', group: 'Lane2' },\r
        { key: 'twoD', group: 'Lane2' },\r
        { key: 'twoE', group: 'Lane2' },\r
        { key: 'twoF', group: 'Lane2' },\r
        { key: 'twoG', group: 'Lane2' },\r
        { key: 'fourA', group: 'Lane4' },\r
        { key: 'fourB', group: 'Lane4' },\r
        { key: 'fourC', group: 'Lane4' },\r
        { key: 'fourD', group: 'Lane4' },\r
        { key: 'Lane5', text: 'Lane5', isGroup: true, category: 'Lane', group: 'Pool2', color: 'lightyellow' },\r
        { key: 'Lane6', text: 'Lane6', isGroup: true, category: 'Lane', group: 'Pool2', color: 'lightgreen' },\r
        { key: 'fiveA', group: 'Lane5' },\r
        { key: 'sixA', group: 'Lane6' }\r
      ],\r
      [\r
        // link data\r
        { from: 'oneA', to: 'oneB' },\r
        { from: 'oneA', to: 'oneC' },\r
        { from: 'oneB', to: 'oneD' },\r
        { from: 'oneC', to: 'oneD' },\r
        { from: 'twoA', to: 'twoB' },\r
        { from: 'twoA', to: 'twoC' },\r
        { from: 'twoA', to: 'twoF' },\r
        { from: 'twoB', to: 'twoD' },\r
        { from: 'twoC', to: 'twoD' },\r
        { from: 'twoD', to: 'twoG' },\r
        { from: 'twoE', to: 'twoG' },\r
        { from: 'twoF', to: 'twoG' },\r
        { from: 'fourA', to: 'fourB' },\r
        { from: 'fourB', to: 'fourC' },\r
        { from: 'fourC', to: 'fourD' }\r
      ]\r
    );\r
    // force all lanes' layouts to be performed\r
    relayoutLanes();\r
  } // end init\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
    myDiagram.delayInitialization(relayoutDiagram);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    In this design each swimlane is implemented by a <a>Group</a>, and all lanes are inside a "Pool" Group. Each lane Group has its own <a>Group.layout</a>,\r
    which in this case is a <a>LayeredDigraphLayout</a>. Each pool Group has its own custom <a>GridLayout</a> that arranges all of its lanes in a vertical\r
    stack. That custom layout makes sure all of the pool's lanes have the same length. If you don't want each lane/group to have its own layout, you could use\r
    set the lane group's <a>Group.layout</a> to null and set the pool group's <a>Group.layout</a> to an instance of <a>SwimLaneLayout</a>, shown at\r
    <a href="../samples/SwimLaneLayout">Swim Lane Layout</a>.\r
  </p>\r
  <p>\r
    When dragging nodes note that the nodes are limited to stay within the lanes. This is implemented by a custom <a>Part.dragComputation</a> function, here\r
    named <b>stayInGroup</b>. Hold down the Shift key while dragging simple nodes to move the selection to another lane. Lane groups cannot be moved between\r
    pool groups.\r
  </p>\r
  <p>\r
    A Group (i.e. swimlane) is movable but not copyable. When the user moves a lane up or down the lanes automatically re-order. You can prevent lanes from\r
    being moved and thus re-ordered by setting Group.movable to false.\r
  </p>\r
  <p>Each Group is collapsible. The previous breadth of that lane is saved in the savedBreadth property, to be restored when expanded.</p>\r
  <p>\r
    When a Group/lane is selected, its custom <a>Part.resizeAdornmentTemplate</a> gives it a broad resize handle at the bottom of the Group and a broad resize\r
    handle at the right side of the Group. This allows the user to resize the "breadth" of the selected lane as well as the "length" of all of the lanes.\r
    However, the custom <a>ResizingTool</a> prevents the lane from being too narrow to hold the <a>Group.placeholder</a> that represents the subgraph, and it\r
    prevents the lane from being too short to hold any of the contents of the lanes. Each Group/lane is also has a <a>GraphObject.minSize</a> to keep it from\r
    being too narrow even if there are no member <a>Part</a>s at all.\r
  </p>\r
  <p>A different sample has its swim lanes horizontally oriented: <a href="swimLanes">Swim Lanes (horizontal)</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`gridlayout`,`layered-digraph`,`customlayout`,`groups`,`tools`,`buttons`];var g=y();l(`u51fsu`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};