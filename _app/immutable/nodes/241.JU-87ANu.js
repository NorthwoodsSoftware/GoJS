import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Seating Chart Diagram Editor Dropping People into Seats at Tables`,titleShort:`Seating Chart`,indexDescription:`This sample demonstrates custom logic in a GoJS diagram - a 'Person' node can be dropped onto a 'Table' node, causing the person to be assigned a position at the closest empty seat at that table.`,screenshot:`seatingchart`,priority:3,tags:[`tools`,`palette`],description:`A seating chart editor for assigning places at tables.`},htmlContent:`<div id="myFlexDiv">\r
    <div id="myGuests" style="border: solid 1px black; background: whitesmoke;"></div>\r
\r
    <div id="myDiagramDiv" style="border: solid 1px black"></div>\r
  </div>\r
  <div>\r
    Diagram Model saved in JSON format, automatically updated after each transaction:\r
    <pre class="lang-js"><code id="savedModel"></code></pre>\r
  </div>`,jsCode:`// Automatically drag people Nodes along with the table Node at which they are seated.\r
  class SpecialDraggingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    computeEffectiveCollection(parts) {\r
      const map = super.computeEffectiveCollection(parts);\r
      // for each Node representing a table, also drag all of the people seated at that table\r
      parts.each(table => {\r
        if (isPerson(table)) return; // ignore persons\r
        // this is a table Node, find all people Nodes using the same table key\r
        for (const nit = table.diagram.nodes; nit.next(); ) {\r
          const n = nit.value;\r
          if (isPerson(n) && n.data.table === table.data.key) {\r
            if (!map.has(n)) map.add(n, new go.DraggingInfo(n.location.copy()));\r
          }\r
        }\r
      });\r
      return map;\r
    }\r
  }\r
  // end SpecialDraggingTool\r
\r
  // Automatically move seated people as a table is rotated, to keep them in their seats.\r
  // Note that because people are separate Nodes, rotating a table Node means the people Nodes\r
  // are not rotated, so their names (TextBlocks) remain horizontal.\r
  class HorizontalTextRotatingTool extends go.RotatingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    rotate(newangle) {\r
      super.rotate(newangle);\r
      const node = this.adornedObject.part;\r
      positionPeopleAtSeats(node);\r
    }\r
  }\r
  // end HorizontalTextRotatingTool\r
\r
  function init() {\r
    // Initialize the main Diagram\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowDragOut: true, // to myGuests\r
      allowClipboard: false,\r
      draggingTool: new SpecialDraggingTool(),\r
      rotatingTool: new HorizontalTextRotatingTool(),\r
      // For this sample, automatically show the state of the diagram's model on the page\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) {\r
          document.getElementById('savedModel').innerHTML = myDiagram.model.toJson();\r
        }\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplateMap.add('', // default template, for people\r
      new go.Node('Auto', {\r
          background: 'transparent',\r
          locationSpot: go.Spot.Center,\r
          // what to do when a drag-over or a drag-drop occurs on a Node representing a table\r
          mouseDragEnter: (e, node, prev) => {\r
            const dragCopy = node.diagram.toolManager.draggingTool.copiedParts; // could be copied from palette\r
            highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, true);\r
          },\r
          mouseDragLeave: (e, node, next) => {\r
            const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;\r
            highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, false);\r
          },\r
          mouseDrop: (e, node) => {\r
            assignPeopleToSeats(node, node.diagram.selection, e.documentPoint);\r
          }\r
        }) // in front of all Tables\r
        // when selected is in foreground layer\r
        .bindObject('layerName', 'isSelected', s => s ? 'Foreground' : '')\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bind('text', 'key')\r
        .add(new go.Shape('Rectangle', { fill: 'blanchedalmond', stroke: null }))\r
        .add(\r
          new go.Panel('Viewbox', { desiredSize: new go.Size(50, 38) })\r
            .add(\r
              new go.TextBlock({\r
                  margin: 2,\r
                  desiredSize: new go.Size(55, NaN),\r
                  font: '8pt Verdana, sans-serif',\r
                  textAlign: 'center',\r
                  stroke: 'darkblue'\r
                })\r
                .bind('text', '', data => {\r
                  let s = data.key;\r
                  if (data.plus) s += ' +' + data.plus.toString();\r
                  return s;\r
                })\r
            )\r
        )\r
    );\r
\r
    // Create a seat element at a particular alignment relative to the table.\r
    function Seat(number, align, focus) {\r
      if (typeof align === 'string') align = go.Spot.parse(align);\r
      if (!align || !align.isSpot()) align = go.Spot.Right;\r
      if (typeof focus === 'string') focus = go.Spot.parse(focus);\r
      if (!focus || !focus.isSpot()) focus = align.opposite();\r
      return new go.Panel('Spot', {\r
          name: number.toString(),\r
          alignment: align,\r
          alignmentFocus: focus\r
        })\r
        .add(\r
          new go.Shape('Circle', {\r
              name: 'SEATSHAPE',\r
              desiredSize: new go.Size(40, 40),\r
              fill: 'burlywood',\r
              stroke: 'white',\r
              strokeWidth: 2\r
            })\r
            .bind('fill')\r
        )\r
        .add(\r
          new go.TextBlock(number.toString(), { font: '10pt Verdana, sans-serif' })\r
            .bind('angle', 'angle', n => -n)\r
        );\r
    }\r
\r
    function tableStyle(part) {\r
      part.background = 'transparent';\r
      part.layerName = 'Background'; // behind all Persons\r
      part.locationSpot = go.Spot.Center;\r
      //HorizontalTextRotatingTool = 'TABLESHAPE',\r
      part.rotatable = true;\r
      // what to do when a drag-over or a drag-drop occurs on a Node representing a table\r
      part.mouseDragEnter = (e, node, prev) => {\r
        const dragCopy = node.diagram.toolManager.draggingTool.copiedParts; // could be copied from palette\r
        highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, true);\r
      };\r
      part.mouseDragLeave = (e, node, next) => {\r
        const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;\r
        highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, false);\r
      };\r
      part.mouseDrop = (e, node) => assignPeopleToSeats(node, node.diagram.selection, e.documentPoint);\r
      part.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);\r
      part.bindTwoWay('angle');\r
    }\r
\r
    // various kinds of tables:\r
\r
    myDiagram.nodeTemplateMap.add('TableR8', // rectangular with 8 seats\r
      new go.Node('Spot')\r
        .apply(tableStyle)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Rectangle', {\r
                  name: 'TABLESHAPE',\r
                  desiredSize: new go.Size(160, 80),\r
                  fill: 'burlywood',\r
                  stroke: null\r
                })\r
                .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
                .bind('fill'),\r
              new go.TextBlock({\r
                  editable: true,\r
                  font: 'bold 11pt Verdana, sans-serif'\r
                })\r
                .bindTwoWay('text', 'name')\r
                .bind('angle', 'angle', n => -n)\r
            ),\r
          Seat(1, '0.2 0', '0.5 1'),\r
          Seat(2, '0.5 0', '0.5 1'),\r
          Seat(3, '0.8 0', '0.5 1'),\r
          Seat(4, '1 0.5', '0 0.5'),\r
          Seat(5, '0.8 1', '0.5 0'),\r
          Seat(6, '0.5 1', '0.5 0'),\r
          Seat(7, '0.2 1', '0.5 0'),\r
          Seat(8, '0 0.5', '1 0.5')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('TableR3', // rectangular with 3 seats in a line\r
      new go.Node('Spot')\r
        .apply(tableStyle)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Rectangle', {\r
                  name: 'TABLESHAPE',\r
                  desiredSize: new go.Size(160, 60),\r
                  fill: 'burlywood',\r
                  stroke: null\r
                })\r
                .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
                .bind('fill'),\r
              new go.TextBlock({\r
                  editable: true,\r
                  font: 'bold 11pt Verdana, sans-serif'\r
                })\r
                .bindTwoWay('text', 'name')\r
                .bind('angle', 'angle', n => -n)\r
            ),\r
          Seat(1, '0.2 0', '0.5 1'),\r
          Seat(2, '0.5 0', '0.5 1'),\r
          Seat(3, '0.8 0', '0.5 1')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('TableC8', // circular with 8 seats\r
      new go.Node('Spot')\r
        .apply(tableStyle)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Circle', {\r
                  name: 'TABLESHAPE',\r
                  desiredSize: new go.Size(120, 120),\r
                  fill: 'burlywood',\r
                  stroke: null\r
                })\r
                .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
                .bind('fill'),\r
              new go.TextBlock({\r
                  editable: true,\r
                  font: 'bold 11pt Verdana, sans-serif'\r
                })\r
                .bindTwoWay('text', 'name')\r
                .bind('angle', 'angle', n => -n)\r
            ),\r
          Seat(1, '0.50 0', '0.5 1'),\r
          Seat(2, '0.85 0.15', '0.15 0.85'),\r
          Seat(3, '1 0.5', '0 0.5'),\r
          Seat(4, '0.85 0.85', '0.15 0.15'),\r
          Seat(5, '0.50 1', '0.5 0'),\r
          Seat(6, '0.15 0.85', '0.85 0.15'),\r
          Seat(7, '0 0.5', '1 0.5'),\r
          Seat(8, '0.15 0.15', '0.85 0.85')\r
        ));\r
\r
    // what to do when a drag-drop occurs in the Diagram's background\r
    myDiagram.mouseDrop = e => {\r
      // when the selection is dropped in the diagram's background,\r
      // make sure the selected people no longer belong to any table\r
      e.diagram.selection.each(n => {\r
        if (isPerson(n)) unassignSeat(n.data);\r
      });\r
    };\r
\r
    // to simulate a "move" from the Palette, the source Node must be deleted.\r
    myDiagram.addDiagramListener('ExternalObjectsDropped', e => {\r
      // if any Tables were dropped, don't delete from myGuests\r
      if (!e.subject.any(isTable)) {\r
        myGuests.commandHandler.deleteSelection();\r
      }\r
    });\r
\r
    // put deleted people back in the myGuests diagram\r
    myDiagram.addDiagramListener('SelectionDeleted', e => {\r
      // no-op if deleted by myGuests' ExternalObjectsDropped listener\r
      if (myDiagram.disableSelectionDeleted) return;\r
      // e.subject is the myDiagram.selection collection\r
      e.subject.each(n => {\r
        if (isPerson(n)) {\r
          myGuests.model.addNodeData(myGuests.model.copyNodeData(n.data));\r
        }\r
      });\r
    });\r
\r
    // create some initial tables\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesKey: true,\r
      nodeDataArray: [\r
        { key: 1, category: 'TableR3', name: 'Head 1', guests: {}, loc: '143.5 58' },\r
        { key: 2, category: 'TableR3', name: 'Head 2', guests: {}, loc: '324.5 58' },\r
        { key: 3, category: 'TableR8', name: '3', guests: {}, loc: '121.5 203.5' },\r
        { key: 4, category: 'TableC8', name: '4', guests: {}, loc: '364.5 223.5' }\r
      ]\r
    }); // this sample does not make use of any links\r
\r
    // initialize the Palette\r
    myGuests = new go.Diagram('myGuests', {\r
      layout: new go.GridLayout({\r
        sorting: go.GridSorting.Ascending // sort by Node.text value\r
      }),\r
      allowDragOut: true, // to myDiagram\r
      allowMove: false\r
    });\r
\r
    myGuests.nodeTemplateMap = myDiagram.nodeTemplateMap;\r
\r
    // specify the contents of the Palette\r
    myGuests.model = new go.GraphLinksModel({\r
      copiesKey: true,\r
      nodeDataArray: [\r
        { key: 'Tyrion Lannister' },\r
        { key: 'Daenerys Targaryen', plus: 3 }, // dragons, of course\r
        { key: 'Jon Snow' },\r
        { key: 'Stannis Baratheon' },\r
        { key: 'Arya Stark' },\r
        { key: 'Jorah Mormont' },\r
        { key: 'Sandor Clegane' },\r
        { key: 'Joffrey Baratheon' },\r
        { key: 'Brienne of Tarth' },\r
        { key: 'Hodor' }\r
      ]\r
    });\r
\r
    myGuests.model.undoManager = myDiagram.model.undoManager; // shared UndoManager!\r
\r
    // To simulate a "move" from the Diagram back to the Palette, the source Node must be deleted.\r
    myGuests.addDiagramListener('ExternalObjectsDropped', e => {\r
      // e.subject is the myGuests.selection collection\r
      // if the user dragged a Table to the myGuests diagram, cancel the drag\r
      if (e.subject.any(isTable)) {\r
        myDiagram.currentTool.doCancel();\r
        myGuests.currentTool.doCancel();\r
        return;\r
      }\r
      myDiagram.selection.each(n => {\r
        if (isPerson(n)) unassignSeat(n.data);\r
      });\r
      myDiagram.disableSelectionDeleted = true;\r
      myDiagram.commandHandler.deleteSelection();\r
      myDiagram.disableSelectionDeleted = false;\r
      myGuests.selection.each(n => {\r
        if (isPerson(n)) unassignSeat(n.data);\r
      });\r
    });\r
\r
    go.AnimationManager.defineAnimationEffect(\r
      'location',\r
      (obj, startValue, endValue, easing, currentTime, duration, animationState) => {\r
        obj.location = new go.Point(\r
          easing(currentTime, startValue.x, endValue.x - startValue.x, duration),\r
          easing(currentTime, startValue.y, endValue.y - startValue.y, duration)\r
        );\r
      }\r
    );\r
  } // end init\r
\r
  function isPerson(n) {\r
    return n !== null && n.category === '';\r
  }\r
\r
  function isTable(n) {\r
    return n !== null && n.category !== '';\r
  }\r
\r
  // Highlight the empty and occupied seats at a "Table" Node\r
  function highlightSeats(node, coll, show) {\r
    if (isPerson(node)) {\r
      // refer to the person's table instead\r
      node = node.diagram.findNodeForKey(node.data.table);\r
      if (node === null) return;\r
    }\r
    const it = coll.iterator;\r
    while (it.next()) {\r
      const n = it.key;\r
      // if dragging a Table, don't do any highlighting\r
      if (isTable(n)) return;\r
    }\r
    const guests = node.data.guests;\r
    for (const sit = node.elements; sit.next(); ) {\r
      const seat = sit.value;\r
      if (seat.name) {\r
        const num = parseFloat(seat.name);\r
        if (isNaN(num)) continue;\r
        const seatshape = seat.findObject('SEATSHAPE');\r
        if (!seatshape) continue;\r
        if (show) {\r
          if (guests[seat.name]) {\r
            seatshape.stroke = 'red';\r
          } else {\r
            seatshape.stroke = 'green';\r
          }\r
        } else {\r
          seatshape.stroke = 'white';\r
        }\r
      }\r
    }\r
  }\r
\r
  // Given a "Table" Node, assign seats for all of the people in the given collection of Nodes;\r
  // the optional Point argument indicates where the collection of people may have been dropped.\r
  function assignPeopleToSeats(node, coll, pt) {\r
    if (isPerson(node)) {\r
      // refer to the person's table instead\r
      node = node.diagram.findNodeForKey(node.data.table);\r
      if (node === null) return;\r
    }\r
    if (coll.any(isTable)) {\r
      // if dragging a Table, don't allow it to be dropped onto another table\r
      myDiagram.currentTool.doCancel();\r
      return;\r
    }\r
    // OK -- all Nodes are people, call assignSeat on each person data\r
    coll.each(n => assignSeat(node, n.data, pt));\r
    positionPeopleAtSeats(node);\r
  }\r
\r
  // Given a "Table" Node, assign one guest data to a seat at that table.\r
  // Also handles cases where the guest represents multiple people, because guest.plus > 0.\r
  // This tries to assign the unoccupied seat that is closest to the given point in document coordinates.\r
  function assignSeat(node, guest, pt) {\r
    if (isPerson(node)) {\r
      // refer to the person's table instead\r
      node = node.diagram.findNodeForKey(node.data.table);\r
      if (node === null) return;\r
    }\r
    if (guest instanceof go.GraphObject) {\r
      throw Error('A guest object must not be a GraphObject: ' + guest.toString());\r
    }\r
    if (!(pt instanceof go.Point)) pt = node.location;\r
\r
    // in case the guest used to be assigned to a different seat, perhaps at a different table\r
    unassignSeat(guest);\r
\r
    const model = node.diagram.model;\r
    const guests = node.data.guests;\r
    // iterate over all seats in the Node to find one that is not occupied\r
    const closestseatname = findClosestUnoccupiedSeat(node, pt);\r
    if (closestseatname) {\r
      model.set(guests, closestseatname, guest.key);\r
      model.set(guest, 'table', node.data.key);\r
      model.set(guest, 'seat', parseFloat(closestseatname));\r
    }\r
\r
    const plus = guest.plus;\r
    if (plus) {\r
      // represents several people\r
      // forget the "plus" info, since next we create N copies of the node/data\r
      guest.plus = undefined;\r
      model.updateTargetBindings(guest);\r
      for (let i = 0; i < plus; i++) {\r
        const copy = model.copyNodeData(guest);\r
        // don't copy the seat assignment of the first person\r
        copy.table = undefined;\r
        copy.seat = undefined;\r
        model.addNodeData(copy);\r
        assignSeat(node, copy, pt);\r
      }\r
    }\r
  }\r
\r
  // Declare that the guest represented by the data is no longer assigned to a seat at a table.\r
  // If the guest had been at a table, the guest is removed from the table's list of guests.\r
  function unassignSeat(guest) {\r
    if (guest instanceof go.GraphObject) {\r
      throw Error('A guest object must not be a GraphObject: ' + guest.toString());\r
    }\r
    const model = myDiagram.model;\r
    // remove from any table that the guest is assigned to\r
    if (guest.table) {\r
      const table = model.findNodeDataForKey(guest.table);\r
      if (table) {\r
        const guests = table.guests;\r
        if (guests) model.set(guests, guest.seat.toString(), undefined);\r
      }\r
    }\r
    model.set(guest, 'table', undefined);\r
    model.set(guest, 'seat', undefined);\r
  }\r
\r
  // Find the name of the unoccupied seat that is closest to the given Point.\r
  // This returns null if no seat is available at this table.\r
  function findClosestUnoccupiedSeat(node, pt) {\r
    if (isPerson(node)) {\r
      // refer to the person's table instead\r
      node = node.diagram.findNodeForKey(node.data.table);\r
      if (node === null) return;\r
    }\r
    const guests = node.data.guests;\r
    let closestseatname = null;\r
    let closestseatdist = Infinity;\r
    // iterate over all seats in the Node to find one that is not occupied\r
    for (const sit = node.elements; sit.next(); ) {\r
      const seat = sit.value;\r
      if (seat.name) {\r
        const num = parseFloat(seat.name);\r
        if (isNaN(num)) continue; // not really a "seat"\r
        if (guests[seat.name]) continue; // already assigned\r
        const seatloc = seat.getDocumentPoint(go.Spot.Center);\r
        const seatdist = seatloc.distanceSquaredPoint(pt);\r
        if (seatdist < closestseatdist) {\r
          closestseatdist = seatdist;\r
          closestseatname = seat.name;\r
        }\r
      }\r
    }\r
    return closestseatname;\r
  }\r
\r
  // Position the nodes of all of the guests that are seated at this table\r
  // to be at their corresponding seat elements of the given "Table" Node.\r
  function positionPeopleAtSeats(node) {\r
    if (isPerson(node)) {\r
      // refer to the person's table instead\r
      node = node.diagram.findNodeForKey(node.data.table);\r
      if (node === null) return;\r
    }\r
    const guests = node.data.guests;\r
    const model = node.diagram.model;\r
    for (let seatname in guests) {\r
      const guestkey = guests[seatname];\r
      const guestdata = model.findNodeDataForKey(guestkey);\r
      positionPersonAtSeat(guestdata);\r
    }\r
  }\r
\r
  // Position a single guest Node to be at the location of the seat to which they are assigned.\r
  function positionPersonAtSeat(guest) {\r
    if (guest instanceof go.GraphObject) {\r
      throw Error('A guest object must not be a GraphObject: ' + guest.toString());\r
    }\r
    if (!guest || !guest.table || !guest.seat) return;\r
    const diagram = myDiagram;\r
    const table = diagram.findPartForKey(guest.table);\r
    const person = diagram.findPartForData(guest);\r
    if (table && person) {\r
      const seat = table.findObject(guest.seat.toString());\r
      const loc = seat.getDocumentPoint(go.Spot.Center);\r
      // animate movement, instead of: person.location = loc;\r
      const animation = new go.Animation();\r
      animation.add(person, 'location', person.location, loc);\r
      animation.start();\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* Use a Flexbox to make the Palette/Diagram responsive */\r
  #myFlexDiv {\r
    display: flex;\r
    width: 100%;\r
    justify-content: center;\r
  }\r
\r
  @media (min-width: 768px) {\r
    #myGuests {\r
      width: 100px;\r
      height: 500px;\r
      margin-right: 10px;\r
    }\r
\r
    #myDiagramDiv {\r
      height: 500px;\r
      flex: 1;\r
    }\r
  }\r
\r
  @media (max-width: 767px) {\r
    #myGuests {\r
      width: 20%;\r
      max-width: 100px;\r
      height: 500px;\r
    }\r
\r
    #myDiagramDiv {\r
      width: 80%;\r
      height: 500px;\r
      flex: 1;\r
    }\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates how a "Person" node can be dropped onto a "Table" node, causing the\r
    person to be assigned a position at the closest empty seat at that table. When a person is dropped\r
    into the background of the diagram, that person is no longer assigned a seat. People dragged\r
    between diagrams are automatically removed from the diagram they came from.\r
  </p>\r
  <p>\r
    "Table" nodes are defined by separate templates, to permit maximum customization of the shapes\r
    and sizes and positions of the tables and chairs.\r
  </p>\r
  <p>\r
    "Person" nodes in the <code>myGuests</code> diagram can also represent a group of people, for\r
    example a named person plus one whose name might not be known. When such a person is dropped\r
    onto a table, additional nodes are created in <code>myDiagram</code>. Those people are seated at\r
    the table if there is room.\r
  </p>\r
  <p>\r
    Tables can be moved or rotated. Moving or rotating a table automatically repositions the people\r
    seated at that table.\r
  </p>\r
  <p>\r
    The <a>UndoManager</a> is shared between the two Diagrams, so that one can undo/redo in either\r
    diagram and have it automatically handle drags between diagrams, as well as the usual changes\r
    within the diagram.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`palette`];var g=y();l(`340g4e`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};