import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Pipes Diagram Editor`,titleShort:`Pipes Diagram Editor`,indexDescription:`Showcasing nodes (Pipes) that can be joined, and will snap and drag together.`,screenshot:`pipes`,priority:1,tags:[`itemarrays`,`collections`,`contextmenus`,`tools`,`palette`,`buttons`,`geometries`,`commands`],description:`An editor for snapping pipes together and moving and rotating them as a single assembly.`},htmlContent:`<div id="myPaletteDiv" style="border: solid 1px black; width: 100%; height: 160px"></div>\r
  <div\r
    id="myDiagramDiv"\r
    style="border: solid 1px black; width: 100%; height: 500px; margin-top: 3px"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "copiesArrays": true,\r
  "copiesArrayObjects": true,\r
  "linkFromPortIdProperty": "fid",\r
  "linkToPortIdProperty": "tid",\r
  "nodeDataArray": [\r
{"key":0, "category":"Comment", "text":"Use Shift to disconnect a shape", "loc":"0 -13"},\r
{"key":1, "category":"Comment", "text":"The Context Menu has more commands", "loc":"0 20"},\r
{"key":2, "category":"Comment", "text":"Gray Xs are unconnected ports", "loc":"0 -47"},\r
{"key":3, "category":"Comment", "text":"Dragged shapes snap to unconnected ports", "loc":"0 -80"},\r
{"key":11, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-187.33333333333331 -69.33333333333331", "angle":0},\r
{"key":12, "angle":90, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-147.33333333333331 -69.33333333333331"},\r
{"key":21, "geo":"F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U4", "spot":"0 0.25 0.5 0.25"},{"id":"U2", "spot":"0.5 1 0 -0.5"} ], "loc":"-137.33333333333331 -9.333333333333314", "angle":0},\r
{"key":5, "geo":"F1 M0 0 L20 0 20 60 0 60z", "ports":[ {"id":"U6", "spot":"0.5 0 0 0.5"},{"id":"U2", "spot":"0.5 1 0 -0.5"} ], "loc":"-197.33333333333331 -19.333333333333314", "angle":0},\r
{"key":13, "angle":180, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-147.33333333333331 30.666666666666685"},\r
{"key":14, "angle":270, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-187.33333333333331 30.666666666666685"},\r
{"key":-7, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-76.66666666666663 -8.666666666666657", "angle":0},\r
{"key":-8, "angle":90, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-36.66666666666663 -8.666666666666657"},\r
{"key":-9, "angle":180, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-36.66666666666663 31.333333333333343"},\r
{"key":-10, "angle":270, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-76.66666666666663 31.333333333333343"}\r
],\r
  "linkDataArray": [\r
{"from":12, "to":11, "fid":"U2", "tid":"U0"},\r
{"from":5, "to":11, "fid":"U6", "tid":"U2"},\r
{"from":13, "to":21, "fid":"U2", "tid":"U2"},\r
{"from":14, "to":5, "fid":"U0", "tid":"U2"},\r
{"from":13, "to":14, "fid":"U0", "tid":"U2"},\r
{"from":-8, "to":-7, "fid":"U2", "tid":"U0"},\r
{"from":-9, "to":-8, "fid":"U2", "tid":"U0"},\r
{"from":-10, "to":-7, "fid":"U0", "tid":"U2"},\r
{"from":-10, "to":-9, "fid":"U2", "tid":"U0"}\r
]}\r
    </textarea>\r
  </div>`,jsCode:`// Define a custom DraggingTool\r
  class SnappingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // This predicate checks to see if the ports can snap together.\r
    // The first letter of the port id should be "U", "F", or "M" to indicate which kinds of port may connect.\r
    // The second letter of the port id should be a digit to indicate which direction it may connect.\r
    // The ports also need to not already have any link connections and need to face opposite directions.\r
    compatiblePorts(p1, p2) {\r
      // already connected?\r
      const part1 = p1.part;\r
      const id1 = p1.portId;\r
      if (id1 === null || id1 === '') return false;\r
      if (part1.findLinksConnected(id1).filter(l => l.category === '').count > 0) return false;\r
      const part2 = p2.part;\r
      const id2 = p2.portId;\r
      if (id2 === null || id2 === '') return false;\r
      if (part2.findLinksConnected(id2).filter(l => l.category === '').count > 0) return false;\r
      // compatible fittings?\r
      if (\r
        (id1[0] === 'U' && id2[0] === 'U') ||\r
        (id1[0] === 'F' && id2[0] === 'M') ||\r
        (id1[0] === 'M' && id2[0] === 'F')\r
      ) {\r
        // find their effective sides, after rotation\r
        const a1 = this.effectiveAngle(id1, part1.angle);\r
        const a2 = this.effectiveAngle(id2, part2.angle);\r
        // are they in opposite directions?\r
        if (a1 - a2 === 180 || a1 - a2 === -180) return true;\r
      }\r
      return false;\r
    }\r
\r
    // At what angle can a port connect, adjusting for the node's rotation\r
    effectiveAngle(id, angle) {\r
      const dir = id[1];\r
      let a = 0;\r
      if (dir === '1') a = 45;\r
      else if (dir === '2') a = 90;\r
      else if (dir === '3') a = 135;\r
      else if (dir === '4') a = 180;\r
      else if (dir === '5') a = 225;\r
      else if (dir === '6') a = 270;\r
      else if (dir === '7') a = 315;\r
      a += angle;\r
      if (a < 0) a += 360;\r
      else if (a >= 360) a -= 360;\r
      return a;\r
    }\r
\r
    // Override this method to find the offset such that a moving port can\r
    // be snapped to be coincident with a compatible stationary port,\r
    // then move all of the parts by that offset.\r
    moveParts(parts, offset, check) {\r
      // when moving an actually copied collection of Parts, use the offset that was calculated during the drag\r
      if (\r
        this._snapOffset &&\r
        this.isActive &&\r
        this.diagram.lastInput.up &&\r
        parts === this.copiedParts\r
      ) {\r
        super.moveParts(parts, this._snapOffset, check);\r
        this._snapOffset = undefined;\r
        return;\r
      }\r
\r
      let commonOffset = offset;\r
\r
      // find out if any snapping is desired for any Node being dragged\r
      const sit = parts.iterator;\r
      while (sit.next()) {\r
        const node = sit.key;\r
        if (!(node instanceof go.Node)) continue;\r
        const info = sit.value;\r
        const newloc = info.point.copy().add(offset);\r
\r
        // now calculate snap point for this Node\r
        const snapoffset = newloc.copy().subtract(node.location);\r
        let nearbyports = null;\r
        let closestDistance = 20 * 20; // don't bother taking sqrt\r
        let closestPort = null;\r
        let closestPortPt = null;\r
        let nodePort = null;\r
        const mit = node.ports;\r
        while (mit.next()) {\r
          const port = mit.value;\r
          if (node.findLinksConnected(port.portId).filter(l => l.category === '').count > 0) continue;\r
          const portPt = port.getDocumentPoint(go.Spot.Center);\r
          portPt.add(snapoffset); // where it would be without snapping\r
\r
          if (nearbyports === null) {\r
            // this collects the Nodes that intersect with the NODE's bounds,\r
            // excluding nodes that are being dragged (i.e. in the PARTS collection)\r
            const nearbyparts = this.diagram.findObjectsIn(\r
              node.actualBounds,\r
              x => x.part,\r
              p => !parts.has(p),\r
              true\r
            );\r
\r
            // gather a collection of GraphObjects that are stationary "ports" for this NODE\r
            nearbyports = new go.Set(/*go.GraphObject*/);\r
            nearbyparts.each(n => {\r
              if (n instanceof go.Node) {\r
                nearbyports.addAll(n.ports);\r
              }\r
            });\r
          }\r
\r
          const pit = nearbyports.iterator;\r
          while (pit.next()) {\r
            const p = pit.value;\r
            if (!this.compatiblePorts(port, p)) continue;\r
            const ppt = p.getDocumentPoint(go.Spot.Center);\r
            const d = ppt.distanceSquaredPoint(portPt);\r
            if (d < closestDistance) {\r
              closestDistance = d;\r
              closestPort = p;\r
              closestPortPt = ppt;\r
              nodePort = port;\r
            }\r
          }\r
        }\r
\r
        // found something to snap to!\r
        if (closestPort !== null) {\r
          // move the node so that the compatible ports coincide\r
          const noderelpt = nodePort.getDocumentPoint(go.Spot.Center).subtract(node.location);\r
          const snappt = closestPortPt.copy().subtract(noderelpt);\r
          // save the offset, to ensure everything moves together\r
          commonOffset = snappt.subtract(newloc).add(offset);\r
          // ignore any node.dragComputation function\r
          // ignore any node.minLocation and node.maxLocation\r
          break;\r
        }\r
      }\r
\r
      // now do the standard movement with the single (perhaps snapped) offset\r
      this._snapOffset = commonOffset.copy(); // remember for mouse-up when copying\r
      super.moveParts(parts, commonOffset, check);\r
    }\r
\r
    // Establish links between snapped ports,\r
    // and remove obsolete links because their ports are no longer coincident.\r
    doDropOnto(pt, obj) {\r
      super.doDropOnto(pt, obj);\r
      // Need to iterate over all of the dropped nodes to see which ports happen to be snapped to stationary ports\r
      const coll = this.copiedParts || this.draggedParts;\r
      const it = coll.iterator;\r
      while (it.next()) {\r
        const node = it.key;\r
        if (!(node instanceof go.Node)) continue;\r
        // connect all snapped ports of this NODE (yes, there might be more than one) with links\r
        const pit = node.ports;\r
        while (pit.next()) {\r
          const port = pit.value;\r
          // maybe add a link -- see if the port is at another port that is compatible\r
          const portPt = port.getDocumentPoint(go.Spot.Center);\r
          if (!portPt.isReal()) continue;\r
          const nearbyports = this.diagram.findObjectsAt(\r
            portPt,\r
            x => {\r
              // some GraphObject at portPt\r
              let o = x;\r
              // walk up the chain of panels\r
              while (o !== null && o.portId === null) o = o.panel;\r
              return o;\r
            },\r
            p => {\r
              // a "port" Panel\r
              // the parent Node must not be in the dragged collection, and\r
              // this port P must be compatible with the NODE's PORT\r
              if (coll.has(p.part)) return false;\r
              const ppt = p.getDocumentPoint(go.Spot.Center);\r
              if (portPt.distanceSquaredPoint(ppt) >= 0.25) return false;\r
              return this.compatiblePorts(port, p);\r
            }\r
          );\r
          // did we find a compatible port?\r
          const np = nearbyports.first();\r
          if (np !== null) {\r
            // connect the NODE's PORT with the other port found at the same point\r
            this.diagram.toolManager.linkingTool.insertLink(node, port, np.part, np);\r
          }\r
        }\r
      }\r
    }\r
\r
    // Just move selected nodes when SHIFT moving, causing nodes to be unsnapped.\r
    // When SHIFTing, must disconnect all links that connect with nodes not being dragged.\r
    // Without SHIFT, move all nodes that are snapped to selected nodes, even indirectly.\r
    computeEffectiveCollection(parts) {\r
      if (this.diagram.lastInput.shift) {\r
        const links = new go.Set(/*go.Link*/);\r
        const coll = super.computeEffectiveCollection(parts);\r
        coll.iteratorKeys.each(node => {\r
          // disconnect all links of this node that connect with stationary node\r
          if (!(node instanceof go.Node)) return;\r
          node.findLinksConnected().each(link => {\r
            if (link.category !== '') return;\r
            // see if this link connects with a node that is being dragged\r
            const othernode = link.getOtherNode(node);\r
            if (othernode !== null && !coll.has(othernode)) {\r
              links.add(link); // remember for later deletion\r
            }\r
          });\r
        });\r
        // outside of nested loops we can actually delete the links\r
        links.each(l => l.diagram.remove(l));\r
        return coll;\r
      } else {\r
        const map = new go.Map(/*go.Part, Object*/);\r
        if (parts === null) return map;\r
        parts.iterator.each(n => this.gatherConnecteds(map, n));\r
        return map;\r
      }\r
    }\r
\r
    // Find other attached nodes.\r
    gatherConnecteds(map, node) {\r
      if (!(node instanceof go.Node)) return;\r
      if (map.has(node)) return;\r
      // record the original Node location, for relative positioning and for cancellation\r
      map.add(node, new go.DraggingInfo(node.location));\r
      // now recursively collect all connected Nodes and the Links to them\r
      node.findLinksConnected().each(link => {\r
        if (link.category !== '') return; // ignore comment links\r
        map.add(link, new go.DraggingInfo());\r
        this.gatherConnecteds(map, link.getOtherNode(node));\r
      });\r
    }\r
  }\r
  // end SnappingTool class\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialScale: 1.5,\r
      'commandHandler.defaultScale': 1.5,\r
      allowLink: false, // no user-drawn links\r
      // use a custom DraggingTool instead of the standard one, defined below\r
      draggingTool: new SnappingTool(),\r
      contextMenu:\r
        go.GraphObject.build('ContextMenu')\r
          .add(\r
            makeButton('Paste',\r
              (e, obj) => e.diagram.commandHandler.pasteSelection(\r
                            e.diagram.toolManager.contextMenuTool.mouseDownPoint),\r
              o => o.diagram.commandHandler.canPasteSelection(\r
                     o.diagram.toolManager.contextMenuTool.mouseDownPoint)\r
            ),\r
            makeButton('Undo',\r
              (e, obj) => e.diagram.commandHandler.undo(),\r
              o => o.diagram.commandHandler.canUndo()\r
            ),\r
            makeButton('Redo',\r
              (e, obj) => e.diagram.commandHandler.redo(),\r
              o => o.diagram.commandHandler.canRedo()\r
            )\r
          ),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // To simplify this code we define a function for creating a context menu button:\r
    function makeButton(text, action, visiblePredicate) {\r
      const button =\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(new go.TextBlock(text, { click: action }));\r
      // don't bother with binding GraphObject.visible if there's no predicate\r
      if (visiblePredicate) {\r
        button.bindObject('visible', '', (o, e) => (o.diagram ? visiblePredicate(o, e) : false));\r
      }\r
      return button;\r
    }\r
\r
    // when the document is modified, add a "*" to the title and enable the "Save" button\r
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
    myDiagram.nodeTemplateMap.add('Comment',\r
      new go.Node()\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.TextBlock({ stroke: 'brown', font: '9pt sans-serif' })\r
            .bind('text')\r
        )\r
    );\r
\r
    // Define the generic "pipe" Node.\r
    // The Shape gets it Geometry from a geometry path string in the bound data.\r
    // This node also gets all of its ports from an array of port data in the bound data.\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationObjectName: 'SHAPE',\r
          locationSpot: go.Spot.Center,\r
          selectionAdorned: false, // use a Binding on the Shape.stroke to show selection\r
          itemTemplate:\r
            // each port is an "X" shape whose alignment spot and port ID are given by the item data\r
            new go.Panel()\r
              .bind('portId', 'id')\r
              .bind('alignment', 'spot', go.Spot.parse)\r
              .add(\r
                new go.Shape('XLine', {\r
                    width: 6,\r
                    height: 6,\r
                    background: 'transparent',\r
                    fill: null,\r
                    stroke: 'gray'\r
                  })\r
                  .bind('figure', 'id', portFigure) // portFigure converter is defined below\r
                  .bind('angle', 'angle')\r
              ),\r
          // hide a port when it is connected\r
          linkConnected: (node, link, port) => {\r
            if (link.category === '') port.visible = false;\r
          },\r
          linkDisconnected: (node, link, port) => {\r
            if (link.category === '') port.visible = true;\r
          }\r
        })\r
        // this creates the variable number of ports for this Spot Panel, based on the data\r
        .bind('itemArray', 'ports')\r
        // remember the location of this Node\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        // remember the angle of this Node\r
        .bindTwoWay('angle', 'angle')\r
        // move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts\r
        .bindObject('layerName', 'isSelected', s => s ? 'Foreground' : '')\r
        .add(\r
          new go.Shape({\r
              name: 'SHAPE',\r
              // the following are default values;\r
              // actual values may come from the node data object via data binding\r
              geometryString: 'F1 M0 0 L20 0 20 20 0 20 z',\r
              fill: 'rgba(128, 128, 128, 0.5)'\r
            })\r
            // this determines the actual shape of the Shape\r
            .bind('geometryString', 'geo')\r
            // selection causes the stroke to be blue instead of black\r
            .bindObject('stroke', 'isSelected', s => s ? 'dodgerblue' : 'black')\r
        );\r
\r
    // Show different kinds of port fittings by using different shapes in this Binding converter\r
    function portFigure(pid) {\r
      if (pid === null || pid === '') return 'XLine';\r
      if (pid[0] === 'F') return 'CircleLine';\r
      if (pid[0] === 'M') return 'PlusLine';\r
      return 'XLine'; // including when the first character is 'U'\r
    }\r
\r
    myDiagram.nodeTemplate.contextMenu = go.GraphObject.build('ContextMenu')\r
      .add(\r
        makeButton('Rotate +45', (e, obj) => rotate(obj.part.adornedPart, 45)),\r
        makeButton('Rotate -45', (e, obj) => rotate(obj.part.adornedPart, -45)),\r
        makeButton('Rotate 180', (e, obj) => rotate(obj.part.adornedPart, 180)),\r
        makeButton('Detach', (e, obj) => detachSelection()),\r
        makeButton(\r
          'Cut',\r
          (e, obj) => e.diagram.commandHandler.cutSelection(),\r
          o => o.diagram.commandHandler.canCutSelection()\r
        ),\r
        makeButton(\r
          'Copy',\r
          (e, obj) => e.diagram.commandHandler.copySelection(),\r
          o => o.diagram.commandHandler.canCopySelection()\r
        ),\r
        makeButton(\r
          'Paste',\r
          (e, obj) =>\r
            e.diagram.commandHandler.pasteSelection(\r
              e.diagram.toolManager.contextMenuTool.mouseDownPoint\r
            ),\r
          o =>\r
            o.diagram.commandHandler.canPasteSelection(\r
              o.diagram.toolManager.contextMenuTool.mouseDownPoint\r
            )\r
        ),\r
        makeButton(\r
          'Delete',\r
          (e, obj) => e.diagram.commandHandler.deleteSelection(),\r
          o => o.diagram.commandHandler.canDeleteSelection()\r
        ),\r
        makeButton(\r
          'Undo',\r
          (e, obj) => e.diagram.commandHandler.undo(),\r
          o => o.diagram.commandHandler.canUndo()\r
        ),\r
        makeButton(\r
          'Redo',\r
          (e, obj) => e.diagram.commandHandler.redo(),\r
          o => o.diagram.commandHandler.canRedo()\r
        )\r
      );\r
\r
    // Change the angle of the parts connected with the given node\r
    function rotate(node, angle) {\r
      const tool = myDiagram.toolManager.draggingTool; // should be a SnappingTool\r
      myDiagram.startTransaction('rotate ' + angle.toString());\r
      const sel = new go.Set(/*go.Node*/);\r
      sel.add(node);\r
      const coll = tool.computeEffectiveCollection(sel).toKeySet();\r
      const bounds = myDiagram.computePartsBounds(coll);\r
      const center = bounds.center;\r
      coll.each(n => {\r
        n.angle += angle;\r
        n.location = n.location.copy().subtract(center).rotate(angle).add(center);\r
      });\r
      myDiagram.commitTransaction('rotate ' + angle.toString());\r
    }\r
\r
    function detachSelection() {\r
      myDiagram.startTransaction('detach');\r
      const coll = new go.Set(/*go.Link*/);\r
      myDiagram.selection.each(node => {\r
        if (!(node instanceof go.Node)) return;\r
        node.linksConnected.each(link => {\r
          if (link.category !== '') return; // ignore comments\r
          // ignore links to other selected nodes\r
          if (link.getOtherNode(node).isSelected) return;\r
          // disconnect this link\r
          coll.add(link);\r
        });\r
      });\r
      myDiagram.removeParts(coll, false);\r
      myDiagram.commitTransaction('detach');\r
    }\r
\r
    // no visual representation of any link data\r
    myDiagram.linkTemplate = new go.Link({ visible: false });\r
\r
    // support optional links from comment nodes to pipe nodes\r
    myDiagram.linkTemplateMap.add('Comment',\r
      new go.Link({ curve: go.Curve.Bezier })\r
        .add(\r
          new go.Shape({ stroke: 'brown', strokeWidth: 2 }),\r
          new go.Shape({ toArrow: 'OpenTriangle', stroke: 'brown' })\r
        )\r
    );\r
\r
    // this model needs to know about particular ports\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      linkFromPortIdProperty: 'fid',\r
      linkToPortIdProperty: 'tid'\r
    });\r
\r
    // Make sure the pipes are ordered by their key in the palette inventory\r
    function keyCompare(a, b) {\r
      const at = a.data.key;\r
      const bt = b.data.key;\r
      if (at < bt) return -1;\r
      if (at > bt) return 1;\r
      return 0;\r
    }\r
\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      initialScale: 1.2,\r
      contentAlignment: go.Spot.Center,\r
      nodeTemplate: myDiagram.nodeTemplate, // shared with the main Diagram\r
      'contextMenuTool.isEnabled': false,\r
      layout: new go.GridLayout({\r
        cellSize: new go.Size(1, 1),\r
        spacing: new go.Size(5, 5),\r
        comparer: keyCompare\r
      }),\r
      // initialize the Palette with a few "pipe" nodes\r
      model: new go.GraphLinksModel({\r
        copiesArrays: true,\r
        copiesArrayObjects: true,\r
        linkFromPortIdProperty: 'fid',\r
        linkToPortIdProperty: 'tid',\r
        nodeDataArray: [\r
          // Several different kinds of pipe objects, some already rotated for convenience.\r
          // Each "glue point" is implemented by a port.\r
          // The port's identifier's first letter must be the type of connector or "fitting".\r
          // The port's identifier's second letter must be indicate the direction in which a\r
          // connection may be made: 0-7, indicating multiples of 45-degree angles starting at zero.\r
          // If you want more than one port of a particular type in the same direction,\r
          // you will need to add a suffix to the port identifier.\r
          // The Spot determines the approximate location of the port on the shape.\r
          // The exact position is offset in order to account for the thickness of the stroke.\r
          // Each should be shifted towards the center of the shape by the fraction of its\r
          // distance from the center times the stroke thickness.\r
          // The following offsets assume the strokeWidth == 1.\r
          {\r
            key: 1,\r
            geo: 'F1 M0 0 L20 0 20 20 0 20z',\r
            ports: [\r
              { id: 'U6', spot: '0.5 0 0 0.5' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 3,\r
            angle: 90,\r
            geo: 'F1 M0 0 L20 0 20 20 0 20z',\r
            ports: [\r
              { id: 'U6', spot: '0.5 0 0 0.5' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 5,\r
            geo: 'F1 M0 0 L20 0 20 60 0 60z',\r
            ports: [\r
              { id: 'U6', spot: '0.5 0 0 0.5' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 7,\r
            angle: 90,\r
            geo: 'F1 M0 0 L20 0 20 60 0 60z',\r
            ports: [\r
              { id: 'U6', spot: '0.5 0 0 0.5' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 11,\r
            geo: 'F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U2', spot: '0.25 1 0.25 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 12,\r
            angle: 90,\r
            geo: 'F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U2', spot: '0.25 1 0.25 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 13,\r
            angle: 180,\r
            geo: 'F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U2', spot: '0.25 1 0.25 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 14,\r
            angle: 270,\r
            geo: 'F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U2', spot: '0.25 1 0.25 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 21,\r
            geo: 'F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U4', spot: '0 0.25 0.5 0.25' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 22,\r
            angle: 90,\r
            geo: 'F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U4', spot: '0 0.25 0.5 0.25' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 23,\r
            angle: 180,\r
            geo: 'F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U4', spot: '0 0.25 0.5 0.25' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 24,\r
            angle: 270,\r
            geo: 'F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z',\r
            ports: [\r
              { id: 'U0', spot: '1 0.25 -0.5 0.25' },\r
              { id: 'U4', spot: '0 0.25 0.5 0.25' },\r
              { id: 'U2', spot: '0.5 1 0 -0.5' }\r
            ]\r
          },\r
          {\r
            key: 31,\r
            geo: 'F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z',\r
            ports: [\r
              { id: 'U6', spot: '0 0 10.5 0.5' },\r
              { id: 'U1', spot: '1 1 -7.571 -7.571', angle: 45 }\r
            ]\r
          },\r
          {\r
            key: 32,\r
            angle: 90,\r
            geo: 'F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z',\r
            ports: [\r
              { id: 'U6', spot: '0 0 10.5 0.5' },\r
              { id: 'U1', spot: '1 1 -7.571 -7.571', angle: 45 }\r
            ]\r
          },\r
          {\r
            key: 33,\r
            angle: 180,\r
            geo: 'F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z',\r
            ports: [\r
              { id: 'U6', spot: '0 0 10.5 0.5' },\r
              { id: 'U1', spot: '1 1 -7.571 -7.571', angle: 45 }\r
            ]\r
          },\r
          {\r
            key: 34,\r
            angle: 270,\r
            geo: 'F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z',\r
            ports: [\r
              { id: 'U6', spot: '0 0 10.5 0.5' },\r
              { id: 'U1', spot: '1 1 -7.571 -7.571', angle: 45 }\r
            ]\r
          },\r
          {\r
            key: 41,\r
            geo: 'F1 M14.142 0 L28.284 14.142 14.142 28.284 0 14.142z',\r
            ports: [\r
              { id: 'U1', spot: '1 1 -7.321 -7.321' },\r
              { id: 'U3', spot: '0 1 7.321 -7.321' },\r
              { id: 'U5', spot: '0 0 7.321 7.321' },\r
              { id: 'U7', spot: '1 0 -7.321 7.321' }\r
            ]\r
          }\r
\r
          // Example M-F connector pipes\r
          /*\r
                  {\r
                    key: 107, //angle: 90,\r
                    geo: "F1 M0 0 L5 0, 5 10, 15 10, 15 0, 20 0, 20 40, 0 40z",\r
                    ports: [\r
                      { id: "F6", spot: "0.5 0 0 10.5" },\r
                      { id: "U2", spot: "0.5 1 0 -0.5" }\r
                    ]\r
                  },\r
                  {\r
                    key: 108, //angle: 90,\r
                    geo: "F1 M0 0, 20 0, 20 30, 15 30, 15 40, 5 40, 5 30, 0 30z",\r
                    ports: [\r
                      { id: "U6", spot: "0.5 0 0 10.5" },\r
                      { id: "M2", spot: "0.5 1 0 -0.5" }\r
                    ]\r
                  }\r
                  */\r
        ] // end nodeDataArray\r
      }) // end model\r
    }); // end Palette\r
\r
    load();\r
  } // end init\r
\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates snapping sections that can be joined (snapped) together, and rotated.\r
  </p>\r
  <p>\r
    Nodes in this sample use <a>Shape.geometryString</a> to determine their shape. You can see more\r
    custom geometry examples and read about geometryString on the\r
    <a href="../intro/geometry">geometry path strings learn page.</a>\r
  </p>\r
  <p>\r
    As a part's unconnected port (shown by an X) comes close to a stationary port with which it is\r
    compatible, the dragged selection snaps so that those ports coincide. A custom\r
    <a>DraggingTool</a>, called <b>SnappingTool</b>, is used to check compatibility.\r
  </p>\r
  <p>\r
    Dragging automatically drags all connected parts. Hold down the Shift key before dragging in\r
    order to detach a part from the parts it is connected with. These functionalities are also\r
    controlled by the custom SnappingTool.\r
  </p>\r
  <p>\r
    Use the <a>GraphObject.contextMenu</a> to rotate, detach, or delete a node. If it is connected\r
    with other parts, the whole collection rotates.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`itemarrays`,`collections`,`contextmenus`,`tools`,`palette`,`buttons`,`geometries`,`commands`];var g=y();l(`1y567n6`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};