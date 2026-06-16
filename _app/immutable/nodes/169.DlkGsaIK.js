import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Kanban Board Diagram Using Collapsible Groups as Task Lists`,titleShort:`Kanban Board Editor`,indexDescription:`A Kanban board editor, allowing the categorization of editable tasks.`,screenshot:`kanban`,priority:1,tags:[`tables`,`gridlayout`,`customlayout`,`groups`,`buttons`,`process`,`legend`],description:`An interactive Kanban board editor, a visual control used for organizing work items.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":"Problems", "text":"Problems", "isGroup":true, "loc":"0 23.52284749830794" },\r
{"key":"Reproduced", "text":"Reproduced", "isGroup":true, "color":"0", "loc":"109 23.52284749830794" },\r
{"key":"Identified", "text":"Identified", "isGroup":true, "color":"0", "loc":"235 23.52284749830794" },\r
{"key":"Fixing", "text":"Fixing", "isGroup":true, "color":"0", "loc":"343 23.52284749830794" },\r
{"key":"Reviewing", "text":"Reviewing", "isGroup":true, "color":"0", "loc":"451 23.52284749830794"},\r
{"key":"Testing", "text":"Testing", "isGroup":true, "color":"0", "loc":"562 23.52284749830794" },\r
{"key":"Customer", "text":"Customer", "isGroup":true, "color":"0", "loc":"671 23.52284749830794" },\r
{"key":1, "text":"text for oneA", "group":"Problems", "color":"0", "loc":"12 35.52284749830794"},\r
{"key":2, "text":"text for oneB", "group":"Problems", "color":"1", "loc":"12 65.52284749830794"},\r
{"key":3, "text":"text for oneC", "group":"Problems", "color":"0", "loc":"12 95.52284749830794"},\r
{"key":4, "text":"text for oneD", "group":"Problems", "color":"1", "loc":"12 125.52284749830794"},\r
{"key":5, "text":"text for twoA", "group":"Reproduced", "color":"1", "loc":"121 35.52284749830794"},\r
{"key":6, "text":"text for twoB", "group":"Reproduced", "color":"1", "loc":"121 65.52284749830794"},\r
{"key":7, "text":"text for twoC", "group":"Identified", "color":"0", "loc":"247 35.52284749830794"},\r
{"key":8, "text":"text for twoD", "group":"Fixing", "color":"0", "loc":"355 35.52284749830794"},\r
{"key":9, "text":"text for twoE", "group":"Reviewing", "color":"0", "loc":"463 35.52284749830794"},\r
{"key":10, "text":"text for twoF", "group":"Reviewing", "color":"1", "loc":"463 65.52284749830794"},\r
{"key":11, "text":"text for twoG", "group":"Testing", "color":"0", "loc":"574 35.52284749830794"},\r
{"key":12, "text":"text for fourA", "group":"Customer", "color":"1", "loc":"683 35.52284749830794"},\r
{"key":13, "text":"text for fourB", "group":"Customer", "color":"1", "loc":"683 65.52284749830794"},\r
{"key":14, "text":"text for fourC", "group":"Customer", "color":"1", "loc":"683 95.52284749830794"},\r
{"key":15, "text":"text for fourD", "group":"Customer", "color":"0", "loc":"683 125.52284749830794"},\r
{"key":16, "text":"text for fiveA", "group":"Customer", "color":"0", "loc":"683 155.52284749830795"}\r
],\r
  "linkDataArray": []}\r
  </textarea>`,jsCode:`// define a custom grid layout that makes sure the length of each lane is the same\r
  // and that each lane is broad enough to hold its subgraph\r
  class PoolLayout extends go.GridLayout {\r
    constructor(init) {\r
      super();\r
      this.MINLENGTH = 200; // this controls the minimum length of any swimlane\r
      this.MINBREADTH = 100; // this controls the minimum breadth of any non-collapsed swimlane\r
      this.cellSize = new go.Size(1, 1);\r
      this.wrappingColumn = Infinity;\r
      this.wrappingWidth = Infinity;\r
      this.spacing = new go.Size(0, 0);\r
      this.alignment = go.GridAlignment.Position;\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    doLayout(coll) {\r
      const diagram = this.diagram;\r
      if (diagram === null) return;\r
      diagram.startTransaction('PoolLayout');\r
      // make sure all of the Group Shapes are big enough\r
      const minlen = this.computeMinPoolLength();\r
      diagram.findTopLevelGroups().each(lane => {\r
        if (!(lane instanceof go.Group)) return;\r
        const shape = lane.selectionObject;\r
        if (shape !== null) {\r
          // change the desiredSize to be big enough in both directions\r
          const sz = this.computeLaneSize(lane);\r
          shape.width = !isNaN(shape.width) ? Math.max(shape.width, sz.width) : sz.width;\r
          // if you want the height of all of the lanes to shrink as the maximum needed height decreases:\r
          shape.height = minlen;\r
          // if you want the height of all of the lanes to remain at the maximum height ever needed:\r
          //shape.height = (isNaN(shape.height) ? minlen : Math.max(shape.height, minlen));\r
          const cell = lane.resizeCellSize;\r
          if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) {\r
            shape.width = Math.ceil(shape.width / cell.width) * cell.width;\r
          }\r
          if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) {\r
            shape.height = Math.ceil(shape.height / cell.height) * cell.height;\r
          }\r
        }\r
      });\r
      // now do all of the usual stuff, according to whatever properties have been set on this GridLayout\r
      super.doLayout(coll);\r
      diagram.commitTransaction('PoolLayout');\r
    }\r
\r
    // compute the minimum length of the whole diagram needed to hold all of the Lane Groups\r
    computeMinPoolLength() {\r
      let len = this.MINLENGTH;\r
      myDiagram.findTopLevelGroups().each(lane => {\r
        const holder = lane.placeholder;\r
        if (holder !== null) {\r
          const sz = holder.actualBounds;\r
          len = Math.max(len, sz.height);\r
        }\r
      });\r
      return len;\r
    }\r
\r
    // compute the minimum size for a particular Lane Group\r
    computeLaneSize(lane) {\r
      // assert(lane instanceof go.Group);\r
      const sz = new go.Size(lane.isSubGraphExpanded ? this.MINBREADTH : 1, this.MINLENGTH);\r
      if (lane.isSubGraphExpanded) {\r
        const holder = lane.placeholder;\r
        if (holder !== null) {\r
          const hsz = holder.actualBounds;\r
          sz.width = Math.max(sz.width, hsz.width);\r
        }\r
      }\r
      // minimum breadth needs to be big enough to hold the header\r
      const hdr = lane.findObject('HEADER');\r
      if (hdr !== null) sz.width = Math.max(sz.width, hdr.actualBounds.width);\r
      return sz;\r
    }\r
  }\r
  // end PoolLayout class\r
\r
  // Put the dragged Part in the "Foreground" Layer with partial opacity\r
  class CustomDraggingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
    doActivate() {\r
      super.doActivate();\r
      this.currentPart.opacity = 0.6;\r
      this.currentPart.layerName = 'Foreground';\r
    }\r
    doDeactivate() {\r
      this.currentPart.opacity = 1;\r
      this.currentPart.layerName = '';\r
      super.doDeactivate();\r
    }\r
  }\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // make sure the top-left corner of the viewport is occupied\r
      contentAlignment: go.Spot.TopLeft,\r
      // use a simple layout to stack the top-level Groups next to each other\r
      layout: new PoolLayout(),\r
      // disallow nodes to be dragged to the diagram's background\r
      mouseDrop: e => e.diagram.currentTool.doCancel(),\r
      // a clipboard copied node is pasted into the original node's group (i.e. lane).\r
      'commandHandler.copiesGroupKey': true,\r
      // automatically re-layout the swim lanes after dragging the selection\r
      SelectionMoved: relayoutDiagram, // this DiagramEvent listener is\r
      SelectionCopied: relayoutDiagram, // defined above\r
      draggingTool: new CustomDraggingTool(),\r
      'undoManager.isEnabled': true,\r
      // allow TextEditingTool to start without selecting first\r
      'textEditingTool.starting': go.TextEditingStarting.SingleClick\r
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
    // this is called after nodes have been moved\r
    function relayoutDiagram() {\r
      myDiagram.selection.each(n => n.invalidateLayout());\r
      myDiagram.layoutDiagram();\r
    }\r
\r
    // There are only three note colors by default, blue, red, and yellow but you could add more here:\r
    const noteColors = ['#009CCC', '#CC293D', '#FFD700'];\r
    function getNoteColor(num) {\r
      return noteColors[Math.min(num, noteColors.length - 1)];\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Horizontal')\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Rectangle', {\r
              fill: '#009CCC',\r
              strokeWidth: 1,\r
              stroke: '#009CCC',\r
              width: 6,\r
              stretch: go.Stretch.Vertical,\r
              alignment: go.Spot.Left,\r
              // if a user clicks the colored portion of a node, cycle through colors\r
              click: (e, obj) => {\r
                myDiagram.startTransaction('Update node color');\r
                let newColor = parseInt(obj.part.data.color) + 1;\r
                if (newColor > noteColors.length - 1) newColor = 0;\r
                myDiagram.model.set(obj.part.data, 'color', newColor);\r
                myDiagram.commitTransaction('Update node color');\r
              }\r
            })\r
            .bind('fill', 'color', getNoteColor)\r
            .bind('stroke', 'color', getNoteColor)\r
        )\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('Rectangle', { fill: 'white', stroke: '#CCCCCC' }),\r
              new go.Panel('Table', { width: 130, minSize: new go.Size(NaN, 50) }),\r
              new go.TextBlock({\r
                  name: 'TEXT',\r
                  margin: 6,\r
                  font: '11px Lato, sans-serif',\r
                  editable: true,\r
                  stroke: '#000',\r
                  maxSize: new go.Size(130, NaN),\r
                  alignment: go.Spot.TopLeft\r
                })\r
                .bindTwoWay('text')\r
            )\r
        );\r
\r
    // While dragging, highlight the dragged-over group\r
    function highlightGroup(grp, show) {\r
      if (show) {\r
        const part = myDiagram.toolManager.draggingTool.currentPart;\r
        if (part.containingGroup !== grp) {\r
          grp.isHighlighted = true;\r
          return;\r
        }\r
      }\r
      grp.isHighlighted = false;\r
    }\r
\r
    myDiagram.groupTemplate =\r
      new go.Group('Vertical', {\r
          selectable: false,\r
          selectionObjectName: 'SHAPE', // even though its not selectable, this is used in the layout\r
          layerName: 'Background', // all lanes are always behind all nodes and links\r
          layout: new go.GridLayout({\r
            // automatically lay out the lane's subgraph\r
            wrappingColumn: 1,\r
            cellSize: new go.Size(1, 1),\r
            spacing: new go.Size(5, 5),\r
            alignment: go.GridAlignment.Position,\r
            comparer: (a, b) => {\r
              // can re-order tasks within a lane\r
              const ay = a.location.y;\r
              const by = b.location.y;\r
              if (isNaN(ay) || isNaN(by)) return 0;\r
              if (ay < by) return -1;\r
              if (ay > by) return 1;\r
              return 0;\r
            }\r
          }),\r
          click: (e, grp) => {\r
            // allow simple click on group to clear selection\r
            if (!e.shift && !e.control && !e.meta) e.diagram.clearSelection();\r
          },\r
          doubleClick: addNewNode,\r
          computesBoundsIncludingLocation: true,\r
          computesBoundsAfterDrag: true, // needed to prevent recomputing Group.placeholder bounds too soon\r
          handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links\r
          mouseDragEnter: (e, grp, prev) => highlightGroup(grp, true),\r
          mouseDragLeave: (e, grp, next) => highlightGroup(grp, false),\r
          mouseDrop: (e, grp) => {\r
            // dropping a copy of some Nodes and Links onto this Group adds them to this Group\r
            // don't allow drag-and-dropping a mix of regular Nodes and Groups\r
            if (e.diagram.selection.all(n => !(n instanceof go.Group))) {\r
              const ok = grp.addMembers(grp.diagram.selection, true);\r
              if (!ok) grp.diagram.currentTool.doCancel();\r
            }\r
          },\r
          subGraphExpandedChanged: grp => {\r
            const shp = grp.selectionObject;\r
            if (grp.diagram.undoManager.isUndoingRedoing) return;\r
            if (grp.isSubGraphExpanded) {\r
              shp.width = grp.data.savedBreadth;\r
            } else {\r
              // remember the original width\r
              if (!isNaN(shp.width)) grp.diagram.model.set(grp.data, 'savedBreadth', shp.width);\r
              shp.width = NaN;\r
            }\r
          }\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bindTwoWay('isSubGraphExpanded', 'expanded')\r
        // the lane header consisting of a TextBlock and an expander button\r
        .add(\r
          new go.Panel('Horizontal', { name: 'HEADER', alignment: go.Spot.Left })\r
            .add(\r
              go.GraphObject.build('SubGraphExpanderButton', { margin: 5 }), // this remains always visible\r
              new go.TextBlock({\r
                  // the lane label\r
                  font: '15px Lato, sans-serif',\r
                  editable: true,\r
                  margin: new go.Margin(2, 0, 0, 0)\r
                })\r
                // this is hidden when the swimlane is collapsed\r
                .bindObject('visible', 'isSubGraphExpanded')\r
                .bindTwoWay('text')\r
            ), // end Horizontal Panel\r
          new go.Panel('Auto') // the lane consisting of a background Shape and a Placeholder representing the subgraph\r
            .add(\r
              new go.Shape('Rectangle', { // this is the resized object\r
                  name: 'SHAPE',\r
                  fill: '#F1F1F1',\r
                  stroke: null,\r
                  strokeWidth: 4\r
                }) // strokeWidth controls space between lanes\r
                .bindObject('fill', 'isHighlighted', h => h ? '#D6D6D6' : '#F1F1F1')\r
                .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify),\r
              new go.Placeholder({ padding: 12, alignment: go.Spot.TopLeft }),\r
              new go.TextBlock({\r
                  // this TextBlock is only seen when the swimlane is collapsed\r
                  name: 'LABEL',\r
                  font: '15px Lato, sans-serif',\r
                  editable: true,\r
                  angle: 90,\r
                  alignment: go.Spot.TopLeft,\r
                  margin: new go.Margin(4, 0, 0, 2)\r
                })\r
                .bindObject('visible', 'isSubGraphExpanded', e => !e)\r
                .bindTwoWay('text')\r
            )\r
        ); // end Auto Panel\r
\r
    // Set up an unmodeled Part as a legend, and place it directly on the diagram.\r
    myDiagram.add(\r
      new go.Part('Table', { position: new go.Point(10, 10), selectable: false })\r
        .add(\r
          new go.TextBlock('Key', { row: 0, font: '700 14px Droid Serif, sans-serif' }), // end row 0\r
          new go.Panel('Horizontal', { row: 1, alignment: go.Spot.Left })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                desiredSize: new go.Size(10, 10),\r
                fill: '#CC293D',\r
                margin: 5\r
              }),\r
              new go.TextBlock('Halted', { font: '700 13px Droid Serif, sans-serif' })\r
            ),\r
          new go.Panel('Horizontal', { row: 2, alignment: go.Spot.Left })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                desiredSize: new go.Size(10, 10),\r
                fill: '#FFD700',\r
                margin: 5\r
              }),\r
              new go.TextBlock('In Progress', { font: '700 13px Droid Serif, sans-serif' })\r
            ),\r
          new go.Panel('Horizontal', { row: 3, alignment: go.Spot.Left })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                desiredSize: new go.Size(10, 10),\r
                fill: '#009CCC',\r
                margin: 5\r
              }),\r
              new go.TextBlock('Completed', { font: '700 13px Droid Serif, sans-serif' })\r
            ),\r
          new go.Panel('Horizontal', {\r
              row: 4,\r
              click: addNewNode,\r
              background: 'white',\r
              margin: new go.Margin(10, 4, 4, 4)\r
            })\r
            .add(\r
              new go.Panel('Auto')\r
                .add(\r
                  new go.Shape('Rectangle', { strokeWidth: 0, stroke: null, fill: '#6FB583' }),\r
                  new go.Shape('PlusLine', {\r
                    margin: 6,\r
                    strokeWidth: 2,\r
                    width: 12,\r
                    height: 12,\r
                    stroke: 'white',\r
                    background: '#6FB583'\r
                  })\r
                ),\r
              new go.TextBlock('New item', { font: '10px Lato, sans-serif', margin: 6 })\r
            )\r
        )\r
    );\r
\r
    load();\r
  } // end init\r
\r
  function addNewNode(e, obj) {\r
    const diagram = e ? e.diagram : myDiagram;\r
    // maybe add to clicked group\r
    let sel = obj ? obj.part : null;\r
    if (sel && !(sel instanceof go.Group)) sel = sel.containingGroup;\r
    // else add to group of selected node\r
    if (!sel) sel = diagram.selection.first();\r
    if (sel && !(sel instanceof go.Group)) sel = sel.containingGroup;\r
    // else add to first group\r
    if (!sel) sel = diagram.findTopLevelGroups().first();\r
    if (!sel) return;\r
    diagram.startTransaction('add node');\r
    const newdata = {\r
      group: sel.key,\r
      loc: '0 9999',\r
      text: 'New item ' + sel.memberParts.count,\r
      color: 0\r
    };\r
    diagram.model.addNodeData(newdata);\r
    diagram.commitTransaction('add node');\r
    const newnode = diagram.findNodeForData(newdata);\r
    diagram.select(newnode);\r
    diagram.commandHandler.scrollToPart(newnode);\r
    diagram.commandHandler.editTextBlock();\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[`https://fonts.googleapis.com/css?family=Lato:300,400,700`],externalScripts:[],descriptionHtml:`<p>\r
    A Kanban board is a work and workflow visualization used to communicate the status and progress\r
    of work items. Click on the color of a note to cycle through colors.\r
  </p>\r
  <p>\r
    This design and implementation were adapted from the\r
    <a href="swimLanesVertical">Swim Lanes (vertical)</a> sample. Unlike that sample:\r
  </p>\r
  <ul>\r
    <li>there are no Links</li>\r
    <li>lanes cannot be nested into "pools"</li>\r
    <li>lanes cannot be resized</li>\r
    <li>the user cannot drop tasks into the diagram's background</li>\r
    <li>all tasks are ordered within a single column; the user can rearrange the order</li>\r
    <li>tasks can freely be moved into other lanes</li>\r
    <li>lanes are not movable or copyable or deletable</li>\r
  </ul>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`gridlayout`,`customlayout`,`groups`,`buttons`,`process`,`legend`];var g=y();l(`1l8mqrc`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};