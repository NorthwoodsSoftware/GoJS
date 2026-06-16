import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Gantt Chart With Collapsible Tree of Tasks, Scrolling, and Highlighting`,titleShort:`Gantt Chart`,indexDescription:`Demonstrates a Gantt chart with a collapsible tree of tasks`,screenshot:`gantt`,priority:2,tags:[`grid`],description:`A Gantt chart that supports zooming into the timeline.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between; border: solid 1px black">\r
    <div id="myTasksDiv" style="width: 280px; margin-right: 2px; border-right: solid 1px black; background: whitesmoke"></div>\r
    <div id="myGanttDiv" style="flex-grow: 1; height: 400px; background: whitesmoke"></div>\r
  </div>\r
  <div id="slider">\r
    <label>Spacing:</label>\r
    <input id="widthSlider" type="range" min="8" max="24" value="12" oninput="rescale()" />\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 250px"></textarea>`,jsCode:`// Custom Layout for myGantt Diagram\r
  class GanttLayout extends go.Layout {\r
    constructor(init) {\r
      super();\r
      this.cellHeight = GridCellHeight;\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    doLayout(coll) {\r
      coll = this.collectParts(coll);\r
      const diagram = this.diagram;\r
      diagram.startTransaction('Gantt Layout');\r
      const bars = [];\r
      this.assignTimes(diagram, bars);\r
      this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);\r
      let y = this.arrangementOrigin.y;\r
      bars.forEach(node => {\r
        const tasknode = myTasks.findNodeForData(node.data);\r
        node.visible = tasknode.isVisible();\r
        node.moveTo(convertStartToX(node.data.start), y);\r
        if (node.visible) y += this.cellHeight;\r
      });\r
      diagram.commitTransaction('Gantt Layout');\r
    }\r
\r
    // Update node data, to make sure each node has a start and a duration\r
    assignTimes(diagram, bars) {\r
      const roots = diagram.findTreeRoots();\r
      roots.each(root => this.walkTree(root, 0, bars));\r
    }\r
\r
    walkTree(node, start, bars) {\r
      bars.push(node);\r
      const model = node.diagram.model;\r
      if (node.isTreeLeaf) {\r
        let dur = node.data.duration;\r
        if (dur === undefined || isNaN(dur)) {\r
          dur = convertDaysToUnits(1); // default task length?\r
          model.set(node.data, 'duration', dur);\r
        }\r
        let st = node.data.start;\r
        if (st === undefined || isNaN(st)) {\r
          st = start; // use given START\r
          model.set(node.data, 'start', st);\r
        }\r
        return st + dur;\r
      } else {\r
        // first recurse to fill in any missing data\r
        node.findTreeChildrenNodes().each(n => {\r
          start = this.walkTree(n, start, bars);\r
        });\r
        // now can calculate this non-leaf node's data\r
        let min = Infinity;\r
        let max = -Infinity;\r
        const colors = new go.Set();\r
        node.findTreeChildrenNodes().each(n => {\r
          min = Math.min(min, n.data.start);\r
          max = Math.max(max, n.data.start + n.data.duration);\r
          if (n.data.color) colors.add(n.data.color);\r
        });\r
        model.set(node.data, 'start', min);\r
        model.set(node.data, 'duration', max - min);\r
        return max;\r
      }\r
    }\r
  }\r
  // end of GanttLayout\r
\r
  const GridCellHeight = 20; // document units; cannot be changed dynamically\r
  let GridCellWidth = 12; // document units per day; this can be modified -- see rescale()\r
  const TimelineHeight = 24; // document units; cannot be changed dynamically\r
\r
  const MsPerDay = 24 * 60 * 60 * 1000;\r
\r
  // By default the values for the data properties start and duration are in days,\r
  // and the start value is relative to the StartDate.\r
  // If you want the start and duration properties to be in a unit other than days,\r
  // you only need to change the implementation of convertDaysToUnits and convertUnitsToDays.\r
\r
  function convertDaysToUnits(n) {\r
    return n;\r
  }\r
\r
  function convertUnitsToDays(n) {\r
    return n;\r
  }\r
\r
  function convertStartToX(start) {\r
    return convertUnitsToDays(start) * GridCellWidth;\r
  }\r
\r
  function convertXToStart(x, node) {\r
    return convertDaysToUnits(x / GridCellWidth);\r
  }\r
\r
  // these four functions are used in TwoWay Bindings on the task/node template\r
  function convertDurationToW(duration) {\r
    return convertUnitsToDays(duration) * GridCellWidth;\r
  }\r
\r
  function convertWToDuration(w) {\r
    return convertDaysToUnits(w / GridCellWidth);\r
  }\r
\r
  function convertStartToPosition(start, node) {\r
    return new go.Point(convertStartToX(start), node.position.y || 0);\r
  }\r
\r
  function convertPositionToStart(pos) {\r
    return convertXToStart(pos.x);\r
  }\r
\r
  let StartDate = new Date(); // set from Model.modelData.origin\r
\r
  function valueToText(n) {\r
    // N document units after StartDate\r
    const startDate = StartDate;\r
    const startDateMs = startDate.getTime() + startDate.getTimezoneOffset() * 60000;\r
    const date = new Date(startDateMs + (n / GridCellWidth) * MsPerDay);\r
    return date.toLocaleDateString();\r
  }\r
\r
  function dateToValue(d) {\r
    // D is a Date\r
    const startDate = StartDate;\r
    const startDateMs = startDate.getTime() + startDate.getTimezoneOffset() * 60000;\r
    const dateInMs = d.getTime() + d.getTimezoneOffset() * 60000;\r
    const msSinceStart = dateInMs - startDateMs;\r
    return (msSinceStart / MsPerDay) * GridCellWidth;\r
  }\r
\r
  // the custom figure used for task bars that have downward points at their ends\r
  go.Shape.defineFigureGenerator('RangeBar', (shape, w, h) => {\r
    const b = Math.min(5, w);\r
    const d = Math.min(5, h);\r
    return new go.Geometry()\r
      .add(\r
        new go.PathFigure(0, 0, true)\r
          .add(new go.PathSegment(go.SegmentType.Line, w, 0))\r
          .add(new go.PathSegment(go.SegmentType.Line, w, h))\r
          .add(new go.PathSegment(go.SegmentType.Line, w - b, h - d))\r
          .add(new go.PathSegment(go.SegmentType.Line, b, h - d))\r
          .add(new go.PathSegment(go.SegmentType.Line, 0, h).close())\r
      );\r
  });\r
\r
  function standardContextMenu(obj) {\r
    obj.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => {\r
                const task = button.part.adornedPart;\r
                // not yet implemented...\r
              }\r
            })\r
            .add(new go.TextBlock('Details...')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => {\r
                const task = button.part.adornedPart;\r
                e.diagram.model.commit(m => {\r
                  const newdata = { key: undefined, text: 'New Task', color: task.data.color, duration: convertDaysToUnits(5) };\r
                  m.addNodeData(newdata);\r
                  m.addLinkData({ from: task.key, to: newdata.key });\r
                  e.diagram.select(e.diagram.findNodeForData(newdata));\r
                });\r
              }\r
            })\r
            .add(new go.TextBlock('New Task'))\r
        )\r
  }\r
\r
  // the tree on the left side of the page\r
  const myTasks = new go.Diagram('myTasksDiv', {\r
    initialContentAlignment: go.Spot.Right,\r
    // make room on top for myTimeline and a bit of spacing; on bottom for whole task row and a bit more\r
    padding: new go.Margin(TimelineHeight + 4, 0, GridCellHeight, 0), // needs to be the same vertically as for myGantt\r
    hasVerticalScrollbar: false,\r
    allowMove: false,\r
    allowCopy: false,\r
    'commandHandler.deletesTree': true,\r
    layout: new go.TreeLayout({\r
      alignment: go.TreeAlignment.Start,\r
      compaction: go.TreeCompaction.None,\r
      layerSpacing: 16,\r
      layerSpacingParentOverlap: 1,\r
      nodeIndentPastParent: 1,\r
      nodeSpacing: 0,\r
      portSpot: go.Spot.Bottom,\r
      childPortSpot: go.Spot.Left,\r
      arrangementSpacing: new go.Size(0, 0),\r
      // after the tree layout, change the width of each node so that all\r
      // of the nodes have widths such that the collection has a given width\r
      commitNodes: function () {\r
        // method override must be function, not =>\r
        go.TreeLayout.prototype.commitNodes.call(this);\r
        updateNodeWidths(400);\r
      }\r
    }),\r
    mouseLeave: (e, node) => (myHighlightTask.visible = false),\r
    'animationManager.isInitial': false,\r
    TreeCollapsed: e => myGantt.layoutDiagram(true),\r
    TreeExpanded: e => myGantt.layoutDiagram(true),\r
    ChangedSelection: e => {\r
      // selecting a bar also selects the corresponding task in myTasks\r
      if (myChangingSelection) return;\r
      myChangingSelection = true;\r
      const tasks = [];\r
      e.diagram.selection.each(part => {\r
        if (part instanceof go.Node) tasks.push(myGantt.findNodeForData(part.data));\r
      });\r
      myGantt.selectCollection(tasks);\r
      myChangingSelection = false;\r
    }\r
  });\r
\r
  var myChangingSelection = false;\r
\r
  myTasks.nodeTemplate =\r
    new go.Node('Table', {\r
        columnSizing: go.Sizing.None,\r
        selectionAdorned: false,\r
        height: GridCellHeight,\r
        mouseEnter: (e, node) => {\r
          node.background = 'rgba(0,0,255,0.2)';\r
          myHighlightTask.position = new go.Point(myGrid.actualBounds.x, node.actualBounds.y);\r
          myHighlightTask.width = myGrid.actualBounds.width;\r
          myHighlightTask.visible = true;\r
        },\r
        mouseLeave: (e, node) => {\r
          node.background = node.isSelected ? 'dodgerblue' : 'transparent';\r
          myHighlightTask.visible = false;\r
        },\r
        doubleClick: (e, node) => {\r
          // scroll myGantt so the corresponding bar is visible\r
          const bar = myGantt.findNodeForData(node.data);\r
          if (bar) myGantt.commandHandler.scrollToPart(bar);\r
        }\r
      })\r
      .apply(standardContextMenu)\r
      .bindObject('background', 'isSelected', s => s ? 'dodgerblue' : 'transparent')\r
      .bindTwoWay('isTreeExpanded')\r
      .addColumnDefinition(0, { width: 14 })\r
      .addColumnDefinition(1, { alignment: go.Spot.Left })\r
      .addColumnDefinition(2, {\r
        width: 40,\r
        alignment: go.Spot.Right,\r
        separatorPadding: new go.Margin(0, 4),\r
        separatorStroke: 'gray'\r
      })\r
      .addColumnDefinition(3, {\r
        width: 40,\r
        alignment: go.Spot.Right,\r
        separatorPadding: new go.Margin(0, 4),\r
        separatorStroke: 'gray'\r
      })\r
      .add(\r
        go.GraphObject.build('TreeExpanderButton', { column: 0, portId: '', scale: 0.85 }),\r
        new go.TextBlock({ column: 1, editable: true })\r
          .bindTwoWay('text'),\r
        // additional columns\r
        new go.TextBlock({ column: 2 })\r
          .bind('text', 'start', s => s.toFixed(2)),\r
        new go.TextBlock({ column: 3 })\r
          .bind('text', 'duration', d => d.toFixed(2))\r
      );\r
\r
  var TREEWIDTH = 160; // document units, may be modified, used by updateNodeWidths\r
\r
  function updateNodeWidths(width) {\r
    let minx = Infinity;\r
    myTasks.nodes.each(n => {\r
      if (n instanceof go.Node) {\r
        minx = Math.min(minx, n.actualBounds.x);\r
      }\r
    });\r
    if (minx === Infinity) return;\r
    const right = minx + width;\r
    myTasks.nodes.each(n => {\r
      if (n instanceof go.Node) {\r
        n.width = Math.max(0, right - n.actualBounds.x);\r
        n.getColumnDefinition(1).width = TREEWIDTH - n.actualBounds.x;\r
      }\r
    });\r
    myTasksHeader.getColumnDefinition(1).width = TREEWIDTH - myTasksHeader.actualBounds.x;\r
  }\r
\r
  const myTasksHeader =\r
    new go.Part('Table', { // the timeline at the top of the myTasks viewport\r
        layerName: 'Adornment',\r
        pickable: false,\r
        position: new go.Point(-26, 0), // position will be set in "ViewportBoundsChanged" listener\r
        columnSizing: go.Sizing.None,\r
        selectionAdorned: false,\r
        height: GridCellHeight,\r
        background: 'lightgray'\r
      })\r
      .addColumnDefinition(0, { width: 14 })\r
      .addColumnDefinition(1)\r
      .addColumnDefinition(2, { width: 40, alignment: go.Spot.Right, separatorPadding: new go.Margin(0, 4), separatorStroke: 'gray' })\r
      .addColumnDefinition(3, { width: 40, alignment: go.Spot.Right, separatorPadding: new go.Margin(0, 4), separatorStroke: 'gray' })\r
      .add(\r
        new go.TextBlock('Name', { column: 1 }),\r
        // additional columns\r
        new go.TextBlock('Start', { column: 2 }),\r
        new go.TextBlock('Dur.', { column: 3 })\r
      );\r
  myTasks.add(myTasksHeader);\r
\r
  myTasks.linkTemplate =\r
    new go.Link({\r
        selectable: false,\r
        routing: go.Routing.Orthogonal,\r
        fromEndSegmentLength: 1,\r
        toEndSegmentLength: 1\r
      })\r
      .add(\r
        new go.Shape()\r
      );\r
\r
  myTasks.linkTemplateMap.add('Dep',\r
    new go.Link({ // ignore these links in the Tasks diagram\r
      selectable: false,\r
      visible: false,\r
      isTreeLink: false\r
    })\r
  );\r
\r
  // the right side of the page, holding both the timeline and all of the task bars\r
  myGantt = new go.Diagram('myGanttDiv', {\r
    initialPosition: new go.Point(-10, -100), // show labels\r
    // make room on top for myTimeline and a bit of spacing; on bottom for whole task row and a bit more\r
    padding: new go.Margin(TimelineHeight + 4, GridCellWidth * 7, GridCellHeight, 0), // needs to be the same vertically as for myTasks\r
    scrollMargin: new go.Margin(0, GridCellWidth * 7, 0, 0), // and allow scrolling to a week beyond that\r
    allowCopy: false,\r
    'commandHandler.deletesTree': true,\r
    'draggingTool.isGridSnapEnabled': true,\r
    'draggingTool.gridSnapCellSize': new go.Size(GridCellWidth, GridCellHeight),\r
    'draggingTool.dragsTree': true,\r
    'resizingTool.isGridSnapEnabled': true,\r
    'resizingTool.cellSize': new go.Size(GridCellWidth, GridCellHeight),\r
    'resizingTool.minSize': new go.Size(GridCellWidth, GridCellHeight),\r
    layout: new GanttLayout(),\r
    mouseOver: e => {\r
      if (!myGrid || !myHighlightDay) return;\r
      const lp = myGrid.getLocalPoint(e.documentPoint);\r
      const day = Math.floor(convertXToStart(lp.x)); // floor gets start of day\r
      myHighlightDay.position = new go.Point(convertStartToX(day), myGrid.position.y);\r
      myHighlightDay.width = GridCellWidth; // 1 day\r
      myHighlightDay.height = myGrid.actualBounds.height;\r
      myHighlightDay.visible = true;\r
    },\r
    mouseLeave: e => (myHighlightDay.visible = false),\r
    'animationManager.isInitial': false,\r
    SelectionMoved: e => e.diagram.layoutDiagram(true),\r
    DocumentBoundsChanged: e => {\r
      // the grid extends to only the area needed\r
      const b = e.diagram.documentBounds;\r
      myGrid.desiredSize = new go.Size(b.width + GridCellWidth * 7, b.bottom);\r
      // the timeline, which is not in the documentBounds, only covers the needed area\r
      // widen to cover whole weeks\r
      myTimeline.graduatedMax = Math.ceil(b.width / (GridCellWidth * 7)) * (GridCellWidth * 7);\r
      myTimeline.findObject('MAIN').width = myTimeline.graduatedMax;\r
      myTimeline.findObject('TICKS').height = Math.max(e.diagram.documentBounds.height, e.diagram.viewportBounds.height);\r
    },\r
    ChangedSelection: e => {\r
      // selecting a task also selects the corresponding bar in myGantt\r
      if (myChangingSelection) return;\r
      myChangingSelection = true;\r
      const bars = [];\r
      e.diagram.selection.each(part => {\r
        if (part instanceof go.Node) bars.push(myTasks.findNodeForData(part.data));\r
      });\r
      myTasks.selectCollection(bars);\r
      myChangingSelection = false;\r
    }\r
  });\r
\r
  const myTimeline =\r
    new go.Part('Graduated', { // the timeline at the top of the myGantt viewport\r
        layerName: 'Adornment',\r
        pickable: false,\r
        position: new go.Point(-26, 0), // position will be set in "ViewportBoundsChanged" listener\r
        graduatedTickUnit: GridCellWidth // each tick is one day\r
        // assume graduatedMax == length of line\r
      })\r
      .add(\r
        new go.Shape('LineH', {\r
          name: 'MAIN',\r
          strokeWidth: 0, // don't draw the actual line\r
          height: TimelineHeight, // width will be set in "DocumentBoundsChanged" listener\r
          background: 'lightgray'\r
        }),\r
        new go.Shape('LineV', {\r
          name: 'TICKS',\r
          interval: 7, // once per week\r
          alignmentFocus: new go.Spot(0.5, 0, 0, -TimelineHeight / 2), // tick marks cross over the timeline itself\r
          stroke: 'lightgray',\r
          strokeWidth: 0.5\r
        }),\r
        new go.TextBlock({\r
          alignmentFocus: go.Spot.Left,\r
          interval: 7, // once per week\r
          graduatedFunction: valueToText,\r
          graduatedSkip: (val, tb) => val > tb.panel.graduatedMax - GridCellWidth * 7 // don't show last label\r
        })\r
      );\r
  myGantt.add(myTimeline);\r
\r
  const myGrid =\r
    new go.Part('Grid', { // the grid of horizontal lines\r
        layerName: 'Grid',\r
        pickable: false,\r
        position: new go.Point(0, 0),\r
        gridCellSize: new go.Size(3000, GridCellHeight)\r
      })\r
      .add(\r
        new go.Shape('LineH', { strokeWidth: 0.5 })\r
      );\r
  myGantt.add(myGrid);\r
\r
  const myHighlightDay =\r
    new go.Part({ // the vertical highlighter covering the day where the mouse is\r
      layerName: 'Grid',\r
      visible: false,\r
      pickable: false,\r
      background: 'rgba(255,0,0,0.2)',\r
      position: new go.Point(0, 0),\r
      width: GridCellWidth,\r
      height: GridCellHeight\r
    });\r
  myGantt.add(myHighlightDay);\r
\r
  const myHighlightTask =\r
    new go.Part({ // the horizontal highlighter covering the current task\r
      layerName: 'Grid',\r
      visible: false,\r
      pickable: false,\r
      background: 'rgba(0,0,255,0.2)',\r
      position: new go.Point(0, 0),\r
      width: GridCellWidth,\r
      height: GridCellHeight\r
    });\r
  myGantt.add(myHighlightTask);\r
\r
  myGantt.nodeTemplate =\r
    new go.Node('Spot', {\r
        selectionAdorned: false,\r
        selectionChanged: node => {\r
          node.diagram.commit(diag => {\r
            node.findObject('SHAPE').fill = node.isSelected ? 'dodgerblue' : (node.data && node.data.color) || 'gray';\r
          }, null);\r
        },\r
        minLocation: new go.Point(0, NaN),\r
        maxLocation: new go.Point(Infinity, NaN),\r
        toolTip:\r
          go.GraphObject.build('ToolTip')\r
            .add(\r
              new go.Panel('Table', { defaultAlignment: go.Spot.Left })\r
                .addColumnDefinition(1, { separatorPadding: 3 })\r
                .add(\r
                  new go.TextBlock({ row: 0, column: 0, columnSpan: 9, font: 'bold 12pt sans-serif' })\r
                    .bind('text'),\r
                  new go.TextBlock({ row: 1, column: 0 }, 'start:'),\r
                  new go.TextBlock({ row: 1, column: 1 })\r
                    .bind('text', 'start', d => 'day ' + convertUnitsToDays(d).toFixed(0)),\r
                  new go.TextBlock({ row: 2, column: 0 }, 'length:'),\r
                  new go.TextBlock({ row: 2, column: 1 })\r
                    .bind('text', 'duration', d => convertUnitsToDays(d).toFixed(0) + ' days')\r
                )\r
            ),\r
        resizable: true,\r
        resizeObjectName: 'SHAPE',\r
        resizeAdornmentTemplate:\r
          new go.Adornment('Spot')\r
            .add(\r
              new go.Placeholder(),\r
              new go.Shape('Diamond', {\r
                alignment: go.Spot.Right,\r
                width: 8,\r
                height: 8,\r
                strokeWidth: 0,\r
                fill: 'fuchsia',\r
                cursor: 'e-resize'\r
              })\r
            ),\r
        mouseOver: (e, node) => myGantt.mouseOver(e)\r
      })\r
      .apply(standardContextMenu)\r
      .bindTwoWay('position', 'start', convertStartToPosition, convertPositionToStart)\r
      .bindObject('resizable', 'isTreeLeaf')\r
      .bindTwoWay('isTreeExpanded')\r
      .add(\r
        new go.Shape({\r
            name: 'SHAPE',\r
            height: 18,\r
            margin: new go.Margin(1, 0),\r
            strokeWidth: 0,\r
            fill: 'gray'\r
          })\r
          .bind('fill', 'color')\r
          .bindTwoWay('width', 'duration', convertDurationToW, convertWToDuration)\r
          .bindObject('figure', 'isTreeLeaf', leaf => leaf ? 'Rectangle' : 'RangeBar'),\r
        // "RangeBar" is defined above as a custom figure\r
        new go.TextBlock({\r
            font: '8pt sans-serif',\r
            alignment: go.Spot.TopLeft,\r
            alignmentFocus: new go.Spot(0, 0, 0, -2)\r
          })\r
          .bind('text')\r
          .bind('stroke', 'color', c => go.Brush.isDark(c) ? '#DDDDDD' : '#333333')\r
      );\r
\r
  myGantt.linkTemplate = new go.Link({ visible: false });\r
\r
  myGantt.linkTemplateMap.add('Dep',\r
    new go.Link({\r
        routing: go.Routing.Orthogonal,\r
        isTreeLink: false,\r
        isLayoutPositioned: false,\r
        fromSpot: new go.Spot(0.999999, 1),\r
        toSpot: new go.Spot(0.000001, 0),\r
        toShortLength: 3\r
      })\r
      .add(\r
        new go.Shape({ stroke: 'brown', strokeWidth: 3 }),\r
        new go.Shape({ toArrow: 'Standard', fill: 'brown', strokeWidth: 0, scale: 0.75 })\r
      )\r
  );\r
\r
  // The Model that is shared by both Diagrams\r
  const myModel = new go.GraphLinksModel({\r
    modelData: {\r
      origin: 1531540800000 // new Date(2018, 6, 14);\r
    },\r
    nodeDataArray: [\r
      { key: 0, text: 'Project X' },\r
      { key: 1, text: 'Task 1', color: 'darkgreen' },\r
      { key: 11, text: 'Task 1.1', color: 'green', duration: convertDaysToUnits(7) },\r
      { key: 12, text: 'Task 1.2', color: 'green' },\r
      { key: 121, text: 'Task 1.2.1', color: 'lightgreen', duration: convertDaysToUnits(3) },\r
      { key: 122, text: 'Task 1.2.2', color: 'lightgreen', duration: convertDaysToUnits(5) },\r
      { key: 123, text: 'Task 1.2.3', color: 'lightgreen', duration: convertDaysToUnits(4) },\r
      { key: 2, text: 'Task 2', color: 'darkblue' },\r
      { key: 21, text: 'Task 2.1', color: 'blue', duration: convertDaysToUnits(15), start: convertDaysToUnits(10) },\r
      { key: 22, text: 'Task 2.2', color: 'goldenrod' },\r
      { key: 221, text: 'Task 2.2.1', color: 'yellow', duration: convertDaysToUnits(8) },\r
      { key: 222, text: 'Task 2.2.2', color: 'yellow', duration: convertDaysToUnits(6) },\r
      { key: 23, text: 'Task 2.3', color: 'darkorange' },\r
      { key: 231, text: 'Task 2.3.1', color: 'orange', duration: convertDaysToUnits(11) },\r
      { key: 3, text: 'Task 3', color: 'maroon' },\r
      { key: 31, text: 'Task 3.1', color: 'brown', duration: convertDaysToUnits(10) },\r
      { key: 32, text: 'Task 3.2', color: 'brown' },\r
      { key: 321, text: 'Task 3.2.1', color: 'lightsalmon', duration: convertDaysToUnits(8) },\r
      { key: 322, text: 'Task 3.2.2', color: 'lightsalmon', duration: convertDaysToUnits(3) },\r
      { key: 323, text: 'Task 3.2.3', color: 'lightsalmon', duration: convertDaysToUnits(7) },\r
      { key: 324, text: 'Task 3.2.4', color: 'lightsalmon', duration: convertDaysToUnits(5), start: convertDaysToUnits(71) },\r
      { key: 325, text: 'Task 3.2.5', color: 'lightsalmon', duration: convertDaysToUnits(4) },\r
      { key: 326, text: 'Task 3.2.6', color: 'lightsalmon', duration: convertDaysToUnits(5) }\r
    ],\r
    linkDataArray: [\r
      { from: 0, to: 1 },\r
      { from: 1, to: 11 },\r
      { from: 1, to: 12 },\r
      { from: 12, to: 121 },\r
      { from: 12, to: 122 },\r
      { from: 12, to: 123 },\r
      { from: 0, to: 2 },\r
      { from: 2, to: 21 },\r
      { from: 2, to: 22 },\r
      { from: 22, to: 221 },\r
      { from: 22, to: 222 },\r
      { from: 2, to: 23 },\r
      { from: 23, to: 231 },\r
      { from: 0, to: 3 },\r
      { from: 3, to: 31 },\r
      { from: 3, to: 32 },\r
      { from: 32, to: 321 },\r
      { from: 32, to: 322 },\r
      { from: 32, to: 323 },\r
      { from: 32, to: 324 },\r
      { from: 32, to: 325 },\r
      { from: 32, to: 326 },\r
      { from: 11, to: 2, category: 'Dep' }\r
    ]\r
  });\r
  StartDate = new Date(myModel.modelData.origin);\r
\r
  // share model\r
  myTasks.model = myModel;\r
  myGantt.model = myModel;\r
  myModel.undoManager.isEnabled = true;\r
\r
  // sync viewports\r
  var changingView = false; // for preventing recursive updates\r
  myTasks.addDiagramListener('ViewportBoundsChanged', e => {\r
    if (changingView) return;\r
    changingView = true;\r
    myTasksHeader.position = new go.Point(myTasksHeader.position.x, myTasks.viewportBounds.position.y);\r
    myGantt.scale = myTasks.scale;\r
    myGantt.position = new go.Point(myGantt.position.x, myTasks.position.y);\r
    myTimeline.position = new go.Point(myTimeline.position.x, myGantt.viewportBounds.position.y);\r
    changingView = false;\r
  });\r
  myGantt.addDiagramListener('ViewportBoundsChanged', e => {\r
    if (changingView) return;\r
    changingView = true;\r
    myTasks.scale = myGantt.scale;\r
    myTasks.position = new go.Point(myTasks.position.x, myGantt.position.y);\r
    myTasksHeader.position = new go.Point(myTasksHeader.position.x, myTasks.viewportBounds.position.y);\r
    myGantt.position = new go.Point(myGantt.position.x, myTasks.position.y); // don't scroll more if myTasks can't scroll more\r
    myTimeline.position = new go.Point(myTimeline.position.x, myGantt.viewportBounds.position.y);\r
    changingView = false;\r
  });\r
\r
  // change horizontal scale\r
  function rescale() {\r
    const val = parseFloat(document.getElementById('widthSlider').value);\r
    myGantt.commit(diag => {\r
      GridCellWidth = val;\r
      diag.scrollMargin = new go.Margin(0, GridCellWidth * 7, 0, 0);\r
      diag.toolManager.draggingTool.gridSnapCellSize = new go.Size(GridCellWidth, GridCellHeight);\r
      diag.toolManager.resizingTool.cellSize = new go.Size(GridCellWidth, GridCellHeight);\r
      diag.toolManager.resizingTool.minSize = new go.Size(GridCellWidth, GridCellHeight);\r
      diag.updateAllTargetBindings();\r
      diag.layout.cellHeight = GridCellHeight;\r
      diag.layoutDiagram(true);\r
      myTimeline.graduatedTickUnit = GridCellWidth;\r
      diag.padding = new go.Margin(TimelineHeight + 4, GridCellWidth * 7, GridCellHeight, 0);\r
      myTasks.padding = new go.Margin(TimelineHeight + 4, 0, GridCellHeight, 0);\r
    }, null); // skipsUndoManager\r
  }\r
\r
  // keep the page's TextArea in sync with the shared model\r
  function showModelInTextArea(e) {\r
    if (e.isTransactionFinished) {\r
      // show the model data in the page's TextArea\r
      document.getElementById('mySavedModel').value = e.model.toJson();\r
    }\r
  }\r
  myModel.addChangedListener(showModelInTextArea);\r
\r
  // Show the diagram's model in JSON format.\r
  // The two diagrams (myTasks and myGantt) share one model, so load() reassigns the parsed\r
  // model to both. The custom GanttLayout mutates the model during layout, and the text area\r
  // auto updates.\r
  function save() {\r
    document.getElementById('mySavedModel').value = myGantt.model.toJson();\r
    myGantt.isModified = false;\r
  }\r
  function load() {\r
    const model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
    model.undoManager.isEnabled = true;\r
    StartDate = new Date(model.modelData.origin);\r
    model.addChangedListener(showModelInTextArea);\r
    myTasks.model = model;\r
    myGantt.model = model;\r
  }`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates a simple Gantt chart. Gantt charts are used to illustrate project schedules, denoting the start and end dates for terminal and\r
    summary elements of the project.\r
  </p>\r
  <p>\r
    You can zoom in on the diagram by changing the "Spacing" value, which scales the diagram using a data binding function for nodes' widths and locations. This\r
    is in place of changing the <a>Diagram.scale</a>.\r
  </p>\r
  <p>The current model in JSON format, automatically updated as the diagram is modified:</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`grid`];var g=y();l(`1vmetj5`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};