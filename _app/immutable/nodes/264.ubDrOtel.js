import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Collapsible, Resizable, Re-orderable Swim Lanes for Flow Diagram`,titleShort:`Swim Lanes`,indexDescription:`Demonstrates collapsible, resizable, re-orderable swimlanes, a kind of process-flow diagram, with custom dragging rules that disallow nodes from leaving their lane.`,screenshot:`swimlanes`,priority:1,tags:[`tables`,`gridlayout`,`layered-digraph`,`customlayout`,`groups`,`tools`,`buttons`],description:`Horizontal swim lanes and pools with collapsible lanes and limited dragging.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 700px"></div>\r
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
        len = Math.max(len, holder.actualBounds.width);\r
      }\r
    });\r
    return new go.Size(len, NaN);\r
  }\r
\r
  // compute the minimum size for a particular Lane Group\r
  function computeLaneSize(lane) {\r
    // assert(lane instanceof go.Group && lane.category !== "Pool");\r
    const sz = computeMinLaneSize(lane);\r
    if (lane.isSubGraphExpanded) {\r
      const holder = lane.placeholder;\r
      if (holder !== null) {\r
        sz.height = Math.ceil(Math.max(sz.height, holder.actualBounds.height));\r
      }\r
    }\r
    // minimum breadth needs to be big enough to hold the header\r
    const hdr = lane.findObject('HEADER');\r
    if (hdr !== null) sz.height = Math.ceil(Math.max(sz.height, hdr.actualBounds.height));\r
    return sz;\r
  }\r
\r
  // determine the minimum size of a Lane Group, even if collapsed\r
  function computeMinLaneSize(lane) {\r
    if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);\r
    return new go.Size(MINLENGTH, MINBREADTH);\r
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
      return this.handle.alignment === go.Spot.Right;\r
    }\r
\r
    computeMinSize() {\r
      const lane = this.adornedObject.part;\r
      // assert(lane instanceof go.Group && lane.category !== "Pool");\r
      const msz = computeMinLaneSize(lane); // get the absolute minimum size\r
      if (this.isLengthening()) {\r
        // compute the minimum length of all lanes\r
        const sz = computeMinPoolSize(lane.containingGroup);\r
        msz.width = Math.max(msz.width, sz.width);\r
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
            shape.width = newr.width;\r
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
      this.wrappingColumn = 1;\r
      this.wrappingWidth = Infinity;\r
      this.isRealtime = false; // don't continuously layout while dragging\r
      this.alignment = go.GridAlignment.Position;\r
      // This sorts based on the location of each Group.\r
      // This is useful when Groups can be moved up and down in order to change their order.\r
      this.comparer = (a, b) => {\r
        const ay = a.location.y;\r
        const by = b.location.y;\r
        if (isNaN(ay) || isNaN(by)) return 0;\r
        if (ay < by) return -1;\r
        if (ay > by) return 1;\r
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
              shape.width = isNaN(shape.width)\r
                ? minsize.width\r
                : Math.max(shape.width, minsize.width);\r
              shape.height = !isNaN(shape.height) ? Math.max(shape.height, sz.height) : sz.height;\r
              const cell = lane.resizeCellSize;\r
              if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) {\r
                shape.width = Math.ceil(shape.width / cell.width) * cell.width;\r
              }\r
              if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) {\r
                shape.height = Math.ceil(shape.height / cell.height) * cell.height;\r
              }\r
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
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
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
      const x =\r
        Math.max(r.x + m.left, Math.min(pt.x, r.right - m.right - b.width - 1)) + (loc.x - b.x);\r
      const y =\r
        Math.max(r.y + m.top, Math.min(pt.y, r.bottom - m.bottom - b.height - 1)) + (loc.y - b.y);\r
      return new go.Point(x, y);\r
    }\r
\r
    const TEXT_STROKE = "#080f17";\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          // limit dragging of Nodes to stay within the containing Group, defined above\r
          dragComputation: stayInGroup\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Capsule', {\r
            fill: 'white',\r
            stroke: 'lightgray',\r
            portId: '',\r
            cursor: 'pointer',\r
            fromLinkable: true,\r
            toLinkable: true\r
          }),\r
          new go.TextBlock({ margin: 2, stroke: TEXT_STROKE })\r
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
      grp.minLocation = new go.Point(NaN, -Infinity); // only allow horizontal movement\r
      grp.maxLocation = new go.Point(NaN, Infinity);\r
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
      new go.Group('Horizontal')\r
        .apply(groupStyle)\r
        .set({\r
          selectionObjectName: 'SHAPE', // selecting a lane causes the body of the lane to be highlit, not the label\r
          resizable: true,\r
          resizeObjectName: 'SHAPE', // the custom resizeAdornmentTemplate only permits two kinds of resizing\r
          layout: new go.LayeredDigraphLayout({\r
            // automatically lay out the lane's subgraph\r
            isInitial: false, // don't even do initial layout\r
            isOngoing: false, // don't invalidate layout when nodes or links are added or removed\r
            direction: 0,\r
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
              shp.height = grp.data.savedBreadth;\r
            } else {\r
              if (!isNaN(shp.height)) grp.diagram.model.set(grp.data, 'savedBreadth', shp.height);\r
              shp.height = NaN;\r
            }\r
            updateCrossLaneLinks(grp);\r
          }\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bindTwoWay('isSubGraphExpanded', 'expanded')\r
        .add(\r
          // the lane header consisting of a Shape and a TextBlock\r
          new go.Panel('Horizontal', {\r
              name: 'HEADER',\r
              angle: 270, // maybe rotate the header to read sideways going up\r
              alignment: go.Spot.Center\r
            })\r
            .add(\r
              new go.Panel('Horizontal') // this is hidden when the swimlane is collapsed\r
                .bindObject('visible', 'isSubGraphExpanded')\r
                .add(\r
                  new go.Shape('Diamond', { width: 8, height: 8, fill: 'white', stroke: null })\r
                    .bind('fill', 'color'),\r
                  new go.TextBlock({\r
                      font: 'bold 13pt sans-serif',\r
                      editable: true,\r
                      margin: new go.Margin(2, 0, 0, 0),\r
                      stroke: TEXT_STROKE\r
                    })\r
                    .bindTwoWay('text')\r
                ),\r
              go.GraphObject.build('SubGraphExpanderButton', { // but this remains always visible!\r
                margin: 5, \r
                "ButtonBorder.stroke": "lightgray",\r
                "ButtonBorder.fill": "white",\r
                "ButtonIcon.stroke": TEXT_STROKE\r
              }) \r
            ), // end Horizontal Panel\r
          new go.Panel('Auto') // the lane consisting of a background Shape and a Placeholder representing the subgraph\r
            .add(\r
              new go.Shape('Rectangle', { // this is the resized object\r
                  name: 'SHAPE',\r
                  fill: 'white',\r
                  stroke: null\r
                })\r
                .bind('fill', 'color')\r
                .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify),\r
              new go.Placeholder({ padding: 12, alignment: go.Spot.TopLeft }),\r
              new go.TextBlock({\r
                  // this TextBlock is only seen when the swimlane is collapsed\r
                  name: 'LABEL',\r
                  font: 'bold 13pt sans-serif',\r
                  editable: true,\r
                  angle: 0,\r
                  alignment: go.Spot.TopLeft,\r
                  margin: new go.Margin(2, 0, 0, 4),\r
                  stroke: TEXT_STROKE\r
                })\r
                .bindObject('visible', 'isSubGraphExpanded', e => !e)\r
                .bindTwoWay('text')\r
            ) // end Auto Panel\r
        )\r
    ); // end Group\r
\r
    // define a custom resize adornment that has two resize handles if the group is expanded\r
    myDiagram.groupTemplateMap.get('Lane').resizeAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Placeholder(),\r
          new go.Shape({\r
              // for changing the length of a lane\r
              alignment: go.Spot.Right,\r
              desiredSize: new go.Size(7, 50),\r
              fill: 'lightblue',\r
              stroke: 'dodgerblue',\r
              cursor: 'col-resize'\r
            })\r
            .bindObject('visible', '', ad => {\r
              if (ad.adornedPart === null) return false;\r
              return ad.adornedPart.isSubGraphExpanded;\r
            }),\r
          new go.Shape({\r
              // for changing the breadth of a lane\r
              alignment: go.Spot.Bottom,\r
              desiredSize: new go.Size(50, 7),\r
              fill: 'lightblue',\r
              stroke: 'dodgerblue',\r
              cursor: 'row-resize'\r
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
          // use a simple layout that ignores links to stack the "lane" Groups on top of each other\r
          layout: new PoolLayout({ spacing: new go.Size(0, 0) }) // no space between lanes\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({ fill: 'white', stroke: 'lightgray' })\r
            .bind('fill', 'color'),\r
          new go.Panel('Table', { defaultColumnSeparatorStroke: 'lightgray' })\r
            .add(\r
              new go.Panel('Horizontal', { column: 0, angle: 270 })\r
                .add(\r
                  new go.TextBlock({\r
                      font: 'bold 16pt sans-serif',\r
                      editable: true,\r
                      margin: 6,\r
                      stroke: TEXT_STROKE\r
                    })\r
                    .bindTwoWay('text')\r
                ),\r
              new go.Placeholder({ column: 1 })\r
            )\r
        )\r
    );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 5,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          toShortLength: 5\r
        })\r
        .add(\r
          new go.Shape({ stroke: "lightgray", isPanelMain: true, strokeWidth: 2 }),\r
          new go.Shape({ stroke: "white", isPanelMain: true }),\r
          new go.Shape({ toArrow: 'Chevron', fill: "white", stroke: "lightgray", strokeWidth: .5 })\r
        );\r
\r
    // define some sample graphs in some of the lanes\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        // node data\r
        { key: 'Pool1', text: 'Pool', isGroup: true, category: 'Pool' },\r
        { key: 'Pool2', text: 'Pool2', isGroup: true, category: 'Pool' },\r
        {\r
          key: 'Lane1',\r
          text: 'Lane1',\r
          isGroup: true,\r
          category: 'Lane',\r
          group: 'Pool1',\r
          color: 'lightblue'\r
        },\r
        {\r
          key: 'Lane2',\r
          text: 'Lane2',\r
          isGroup: true,\r
          category: 'Lane',\r
          group: 'Pool1',\r
          color: 'lightgreen'\r
        },\r
        {\r
          key: 'Lane3',\r
          text: 'Lane3',\r
          isGroup: true,\r
          category: 'Lane',\r
          group: 'Pool1',\r
          color: 'lightyellow'\r
        },\r
        {\r
          key: 'Lane4',\r
          text: 'Lane4',\r
          isGroup: true,\r
          category: 'Lane',\r
          group: 'Pool1',\r
          color: 'orange'\r
        },\r
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
        {\r
          key: 'Lane5',\r
          text: 'Lane5',\r
          isGroup: true,\r
          category: 'Lane',\r
          group: 'Pool2',\r
          color: 'lightyellow'\r
        },\r
        {\r
          key: 'Lane6',\r
          text: 'Lane6',\r
          isGroup: true,\r
          category: 'Lane',\r
          group: 'Pool2',\r
          color: 'lightgreen'\r
        },\r
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
    save();\r
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
    In this design each swimlane is implemented by a <a>Group</a>, and all lanes are inside a "Pool"\r
    Group. Each lane Group has its own <a>Group.layout</a>, which in this case is a\r
    <a>LayeredDigraphLayout</a>. Each pool Group has its own custom <a>GridLayout</a> that arranges\r
    all of its lanes in a vertical stack. That custom layout makes sure all of the pool's lanes have\r
    the same length. If you don't want each lane/group to have its own layout, you could use set the\r
    lane group's <a>Group.layout</a> to null and set the pool group's <a>Group.layout</a> to an\r
    instance of <a>SwimLaneLayout</a>, shown at\r
    <a href="../samples/SwimLaneLayout">Swim Lane Layout</a>.\r
  </p>\r
  <p>\r
    When dragging nodes note that the nodes are limited to stay within the lanes. This is\r
    implemented by a custom <a>Part.dragComputation</a> function, here named <b>stayInGroup</b>.\r
    Hold down the Shift key while dragging simple nodes to move the selection to another lane. Lane\r
    groups cannot be moved between pool groups.\r
  </p>\r
  <p>\r
    A Group (i.e. swimlane) is movable but not copyable. When the user moves a lane up or down the\r
    lanes automatically re-order. You can prevent lanes from being moved and thus re-ordered by\r
    setting Group.movable to false.\r
  </p>\r
  <p>\r
    Each Group is collapsible. The previous breadth of that lane is saved in the savedBreadth\r
    property, to be restored when expanded.\r
  </p>\r
  <p>\r
    When a Group/lane is selected, its custom <a>Part.resizeAdornmentTemplate</a> gives it a broad\r
    resize handle at the bottom of the Group and a broad resize handle at the right side of the\r
    Group. This allows the user to resize the "breadth" of the selected lane as well as the "length"\r
    of all of the lanes. However, the custom <a>ResizingTool</a> prevents the lane from being too\r
    narrow to hold the <a>Group.placeholder</a> that represents the subgraph, and it prevents the\r
    lane from being too short to hold any of the contents of the lanes. Each Group/lane is also has\r
    a <a>GraphObject.minSize</a> to keep it from being too narrow even if there are no member\r
    <a>Part</a>s at all.\r
  </p>\r
  <p>\r
    A different sample has its swim lanes vertically oriented:\r
    <a href="swimLanesVertical">Swim Lanes (vertical)</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`gridlayout`,`layered-digraph`,`customlayout`,`groups`,`tools`,`buttons`];var g=y();l(`z8voz0`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};