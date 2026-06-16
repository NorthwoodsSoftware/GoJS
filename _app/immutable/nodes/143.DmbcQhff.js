import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Builder of Flowgrams, Flowcharts with Constrained Visual Syntax`,titleShort:`Flowgrammer Visual Editor`,indexDescription:`Demonstrates a flow-chart-like editor of a restricted syntax language.  Uses the ParallelLayout extension.`,screenshot:`flowgrammer`,priority:2,tags:[`collections`,`layered-digraph`,`palette`,`overview`],description:`An editor for a flowchart-like diagram with a restricted syntax -- add nodes by dropping them onto existing nodes or links.`},htmlContent:`<div id="myFlexDiv">\r
    <div id="myPODiv">\r
      <div id="myPaletteDiv" style="background-color: floralwhite; border: solid 1px black"></div>\r
      <div id="myOverviewDiv" style="background-color: whitesmoke; border: solid 1px black"></div>\r
    </div>\r
    <div id="myDiagramDiv" style="border: solid 1px black"></div>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    <button onclick="newDiagram()">New Diagram</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 200px">\r
{ "class": "GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":1,"text":"S","category":"Start"},\r
{"key":-1,"isGroup":true,"cat":"For","text":"For"},\r
{"key":2,"text":"For Each","category":"For","group":-1},\r
{"key":3,"text":"Action 1","group":-1},\r
{"key":-2,"isGroup":true,"cat":"If","text":"If","group":-1},\r
{"key":4,"text":"If","category":"If","group":-2},\r
{"key":5,"text":"Action 2","group":-2},\r
{"key":6,"text":"Action 3","group":-2},\r
{"key":-3,"isGroup":true,"cat":"For","text":"For 2","group":-2},\r
{"key":7,"text":"For Each\\n(nested)","category":"For","group":-3},\r
{"key":8,"text":"Action 4","group":-3},\r
{"key":9,"text":"","category":"EndFor","group":-3},\r
{"key":10,"text":"","category":"EndIf","group":-2},\r
{"key":11,"text":"Action 5","group":-1},\r
{"key":12,"text":"","category":"EndFor","group":-1},\r
{"key":13,"text":"E","category":"End"}\r
  ],\r
  "linkDataArray": [\r
{"from":1, "to":2},\r
{"from":2, "to":3},\r
{"from":3, "to":4},\r
{"from":4, "to":5, "text":"yes"},\r
{"from":4, "to":6, "text":"no"},\r
{"from":6, "to":7},\r
{"from":7, "to":8},\r
{"from":8, "to":9},\r
{"from":5, "to":10},\r
{"from":9, "to":10},\r
{"from":9, "to":7},\r
{"from":10, "to":11},\r
{"from":11, "to":12},\r
{"from":12, "to":2},\r
{"from":12, "to":13}\r
 ]}\r
  </textarea>`,jsCode:`// two custom figures, for "For Each" loops\r
  go.Shape.defineFigureGenerator('ForEach', (shape, w, h) => {\r
    var param1 = shape ? shape.parameter1 : NaN; // length of triangular area in direction that it is pointing\r
    if (isNaN(param1)) param1 = 10;\r
    var d = Math.min(h / 2, param1);\r
    var geo = new go.Geometry();\r
    var fig = new go.PathFigure(w, h - d, true);\r
    geo.add(fig);\r
    fig.add(new go.PathSegment(go.SegmentType.Line, w / 2, h));\r
    fig.add(new go.PathSegment(go.SegmentType.Line, 0, h - d));\r
    fig.add(new go.PathSegment(go.SegmentType.Line, 0, 0));\r
    fig.add(new go.PathSegment(go.SegmentType.Line, w, 0).close());\r
    geo.spot1 = go.Spot.TopLeft;\r
    geo.spot2 = new go.Spot(1, 1, 0, Math.min(-d + 2, 0));\r
    return geo;\r
  });\r
\r
  go.Shape.defineFigureGenerator('EndForEach', (shape, w, h) => {\r
    var param1 = shape ? shape.parameter1 : NaN; // length of triangular area in direction that it is pointing\r
    if (isNaN(param1)) param1 = 10;\r
    var d = Math.min(h / 2, param1);\r
    var geo = new go.Geometry();\r
    var fig = new go.PathFigure(w, d, true);\r
    geo.add(fig);\r
    fig.add(new go.PathSegment(go.SegmentType.Line, w, h));\r
    fig.add(new go.PathSegment(go.SegmentType.Line, 0, h));\r
    fig.add(new go.PathSegment(go.SegmentType.Line, 0, d));\r
    fig.add(new go.PathSegment(go.SegmentType.Line, w / 2, 0).close());\r
    geo.spot1 = new go.Spot(0, 0, 0, Math.min(d, 0));\r
    geo.spot2 = go.Spot.BottomRight;\r
    return geo;\r
  });\r
\r
  function init() {\r
    // initialize main Diagram\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowMove: false,\r
      allowCopy: false,\r
      SelectionDeleting: e => {\r
        // before a delete happens\r
        // handle deletions by excising the node and reconnecting the link where the node had been\r
        new go.List(e.diagram.selection).each(part => deletingNode(part));\r
      },\r
      layout: new ParallelLayout({ angle: 90, layerSpacing: 21, nodeSpacing: 30 }),\r
      ExternalObjectsDropped: e => {\r
        // handle drops from the Palette\r
        var newnode = e.diagram.selection.first();\r
        if (!newnode) return;\r
        if (!(newnode instanceof go.Group) && newnode.linksConnected.count === 0) {\r
          // when the selection is dropped but not hooked up to the rest of the graph, delete it\r
          e.diagram.removeParts(e.diagram.selection, false);\r
        } else {\r
          e.diagram.commandHandler.scrollToPart(newnode);\r
        }\r
      },\r
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
    // dragged nodes are translucent so that the user can see highlighting of links and nodes\r
    myDiagram.findLayer('Tool').opacity = 0.5;\r
\r
    // some common styles for most of the node templates\r
    function nodeStyle(node) {\r
      node.deletable = false;\r
      node.locationSpot = go.Spot.Center;\r
      node.mouseDragEnter = (e, node) => {\r
        var sh = node.findObject('SHAPE');\r
        if (sh) sh.fill = 'lime';\r
      };\r
      node.mouseDragLeave = (e, node) => {\r
        var sh = node.findObject('SHAPE');\r
        if (sh) sh.fill = 'white';\r
      };\r
      node.mouseDrop = dropOntoNode;\r
    }\r
\r
    function shapeStyle(shp) {\r
      shp.name = 'SHAPE';\r
      shp.fill = 'white';\r
    }\r
\r
    function textStyle(tb) {\r
      tb.name = 'TEXTBLOCK';\r
      tb.textAlign = 'center';\r
      tb.editable = true;\r
      tb.bindTwoWay('text');\r
    }\r
\r
    // define the Node templates\r
    myDiagram.nodeTemplate = // regular action steps\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .set({ deletable: true, minSize: new go.Size(10, 20) })\r
        .add(\r
          new go.Shape()\r
            .apply(shapeStyle),\r
          new go.TextBlock()\r
            .apply(textStyle)\r
            .set({ margin: 4 })\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Start',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .set({ desiredSize: new go.Size(32, 32)})\r
        .add(\r
          new go.Shape('Circle')\r
            .apply(shapeStyle),\r
          new go.TextBlock('Start')\r
            .apply(textStyle)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('End',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .set({ desiredSize: new go.Size(32, 32) })\r
        .add(\r
          new go.Shape('Circle')\r
            .apply(shapeStyle),\r
          new go.TextBlock('End')\r
            .apply(textStyle)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('For',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .set({ minSize: new go.Size(64, 32) })\r
        .add(\r
          new go.Shape('ForEach')\r
            .apply(shapeStyle),\r
          new go.TextBlock('For Each')\r
            .apply(textStyle)\r
            .set({ margin: 4 })\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('EndFor',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .set({ avoidable: false })\r
        .add(\r
          new go.Shape('EndForEach')\r
            .apply(shapeStyle)\r
            .set({ desiredSize: new go.Size(4, 4) })\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('While',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .set({ minSize: new go.Size(32, 32) })\r
        .add(\r
          new go.Shape('ForEach')\r
            .apply(shapeStyle)\r
            .set({ angle: -90, spot2: new go.Spot(1, 1, -6, 0) }),\r
          new go.TextBlock('While')\r
            .apply(textStyle)\r
            .set({ margin: 4 })\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('EndWhile',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .set({ avoidable: false })\r
        .add(\r
          new go.Shape('Circle')\r
            .apply(shapeStyle)\r
            .set({ desiredSize: new go.Size(4, 4) })\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('If',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .set({ minSize: new go.Size(64, 32) })\r
        .add(\r
          new go.Shape('Diamond')\r
            .apply(shapeStyle),\r
          new go.TextBlock('If')\r
            .apply(textStyle)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('EndIf',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .set({ avoidable: false })\r
        .add(\r
          new go.Shape('Diamond')\r
            .apply(shapeStyle)\r
            .set({ desiredSize: new go.Size(4, 4) })\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Switch',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .set({ minSize: new go.Size(64, 32) })\r
        .add(\r
          new go.Shape('TriangleUp')\r
            .apply(shapeStyle),\r
          new go.TextBlock('Switch')\r
            .apply(textStyle)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Merge',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .set({ avoidable: false })\r
        .add(\r
          new go.Shape('TriangleDown')\r
            .apply(shapeStyle)\r
            .set({ desiredSize: new go.Size(4, 4) })\r
        ));\r
\r
    function groupColor(cat) {\r
      switch (cat) {\r
        case 'If':\r
          return 'rgba(255,0,0,0.05)';\r
        case 'For':\r
          return 'rgba(0,255,0,0.05)';\r
        case 'While':\r
          return 'rgba(0,0,255,0.05)';\r
        default:\r
          return 'rgba(0,0,0,0.05)';\r
      }\r
    }\r
\r
    // define the Group template, required but unseen\r
    myDiagram.groupTemplate =\r
      new go.Group('Spot', {\r
          locationSpot: go.Spot.Center,\r
          layout: new ParallelLayout({ angle: 90, layerSpacing: 24, nodeSpacing: 30 }),\r
          mouseDragEnter: (e, group) => {\r
            var sh = group.findObject('SHAPE');\r
            if (sh) sh.stroke = 'lime';\r
          },\r
          mouseDragLeave: (e, group) => {\r
            var sh = group.findObject('SHAPE');\r
            if (sh) sh.stroke = null;\r
          },\r
          mouseDrop: dropOntoNode\r
        })\r
        .bindTwoWay('isSubGraphExpanded')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', {\r
                  fill: 'rgba(0,0,0,0.05)',\r
                  strokeWidth: 0,\r
                  spot1: go.Spot.TopLeft,\r
                  spot2: go.Spot.BottomRight\r
                })\r
                .bind('fill', 'cat', groupColor),\r
              new go.Panel('Vertical')\r
                .add(\r
                  new go.Panel('Horizontal', { alignment: go.Spot.Left })\r
                    .add(\r
                      go.GraphObject.build('SubGraphExpanderButton', { margin: 2 }),\r
                      new go.TextBlock({ editable: true })\r
                        .bindTwoWay('text')\r
                    ),\r
                  new go.Placeholder({ padding: new go.Margin(0, 10) })\r
                )\r
            ),\r
          new go.Shape('LineH', {\r
            name: 'SHAPE',\r
            alignment: go.Spot.Bottom,\r
            height: 0,\r
            stretch: go.Stretch.Horizontal,\r
            stroke: null,\r
            strokeWidth: 8\r
          })\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          selectable: false,\r
          deletable: false,\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 5,\r
          toShortLength: 2,\r
          // links cannot be deleted\r
          // If a node from the Palette is dragged over this node, its outline will turn green\r
          mouseDragEnter: (e, link) => {\r
            if (!isLoopBack(link)) link.isHighlighted = true;\r
          },\r
          mouseDragLeave: (e, link) => {\r
            link.isHighlighted = false;\r
          },\r
          // if a node from the Palette is dropped on a link, the link is replaced by links to and from the new node\r
          mouseDrop: dropOntoLink\r
        })\r
        .add(\r
          new go.Shape({ isPanelMain: true, stroke: 'transparent', strokeWidth: 8 })\r
            .bindObject('stroke', 'isHighlighted', h => h ? 'lime' : 'transparent'),\r
          new go.Shape({ isPanelMain: true, stroke: 'black', strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'Standard', strokeWidth: 0 }),\r
          new go.TextBlock({\r
              segmentFraction: 0.5,\r
              segmentOffset: new go.Point(-10, 0),\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
            .bind('background', 'text', t => t ? 'white' : null)\r
            .bindObject('segmentIndex', 'fromNode', n => n.category === 'If' ? 1 : (n.category === 'Switch' ? -2 : -Infinity))\r
        );\r
\r
    function isLoopBack(link) {\r
      if (!link || !link.fromNode || !link.toNode) return false;\r
      if (link.fromNode.containingGroup !== link.toNode.containingGroup) return false;\r
      var cat = link.fromNode.category;\r
      return cat === 'EndFor' || cat === 'EndWhile' || cat === 'EndIf';\r
    }\r
\r
    // A node dropped onto a Merge node is spliced into a link coming into that node;\r
    // otherwise it is spliced into a link that is coming out of that node.\r
    function dropOntoNode(e, oldnode) {\r
      if (oldnode instanceof go.Group) {\r
        var merge = oldnode.layout.mergeNode;\r
        if (merge) {\r
          var it = merge.findLinksOutOf();\r
          while (it.next()) {\r
            var link = it.value;\r
            if (link.fromNode.containingGroup !== link.toNode.containingGroup) {\r
              dropOntoLink(e, link);\r
              break;\r
            }\r
          }\r
        }\r
      } else if (oldnode instanceof go.Node) {\r
        var cat = oldnode.category;\r
        if (cat === 'Merge' || cat === 'End' || cat === 'EndFor' || cat === 'EndWhile' || cat === 'EndIf') {\r
          var link = oldnode.findLinksInto().first();\r
          if (link) dropOntoLink(e, link);\r
        } else {\r
          var link = oldnode.findLinksOutOf().first();\r
          if (link) dropOntoLink(e, link);\r
        }\r
      }\r
    }\r
\r
    // Splice a node into a link.\r
    // If the new node is of category "For" or "While" or "If", create a Group and splice it in,\r
    // and add the new node to that group, and add any other desired nodes and links to that group.\r
    function dropOntoLink(e, oldlink) {\r
      if (!(oldlink instanceof go.Link)) return;\r
      var diagram = e.diagram;\r
      var newnode = diagram.selection.first();\r
      if (!(newnode instanceof go.Node)) return;\r
      if (!newnode.isTopLevel) return;\r
      if (isLoopBack(oldlink)) {\r
        // can't add nodes into links going back to the "For" node\r
        diagram.remove(newnode);\r
        return;\r
      }\r
\r
      var fromnode = oldlink.fromNode;\r
      var tonode = oldlink.toNode;\r
      if (newnode.category === '') {\r
        // add simple step into chain of actions\r
        newnode.containingGroup = oldlink.containingGroup;\r
        // Reconnect the existing link to the new node\r
        oldlink.toNode = newnode;\r
        // Then add links from the new node to the old node\r
        if (newnode.category === 'If') {\r
          diagram.model.addLinkData({ from: newnode.key, to: tonode.key, text: 'yes' });\r
          diagram.model.addLinkData({ from: newnode.key, to: tonode.key, text: 'no' });\r
        } else {\r
          diagram.model.addLinkData({ from: newnode.key, to: tonode.key });\r
        }\r
      } else if (newnode.category === 'For' || newnode.category === 'While') {\r
        // add loop group\r
        // add group for loop\r
        var groupdata = { isGroup: true, cat: newnode.category, text: newnode.category };\r
        diagram.model.addNodeData(groupdata);\r
        var group = diagram.findNodeForData(groupdata);\r
        group.containingGroup = oldlink.containingGroup;\r
        diagram.select(group);\r
\r
        newnode.containingGroup = group;\r
\r
        var enddata = { category: 'End' + newnode.category };\r
        diagram.model.addNodeData(enddata);\r
        var endnode = diagram.findNodeForData(enddata);\r
        endnode.containingGroup = group;\r
        endnode.location = e.documentPoint;\r
\r
        diagram.model.addLinkData({ from: newnode.key, to: endnode.key });\r
        diagram.model.addLinkData({ from: endnode.key, to: newnode.key });\r
\r
        // Reconnect the existing link to the new node\r
        oldlink.toNode = newnode;\r
        // Then add a link from the end node to the old node\r
        diagram.model.addLinkData({ from: endnode.key, to: tonode.key });\r
      } else if (newnode.category === 'If') {\r
        // add Conditional group\r
        // add group for conditional\r
        var groupdata = { isGroup: true, cat: newnode.category, text: newnode.category };\r
        diagram.model.addNodeData(groupdata);\r
        var group = diagram.findNodeForData(groupdata);\r
        group.containingGroup = oldlink.containingGroup;\r
        diagram.select(group);\r
\r
        newnode.containingGroup = group;\r
\r
        var enddata = { category: 'EndIf' };\r
        diagram.model.addNodeData(enddata);\r
        var endnode = diagram.findNodeForData(enddata);\r
        endnode.containingGroup = group;\r
        endnode.location = e.documentPoint;\r
\r
        var truedata = { from: newnode.key, to: endnode.key, text: 'yes' };\r
        diagram.model.addLinkData(truedata);\r
        var truelink = diagram.findLinkForData(truedata);\r
        var falsedata = { from: newnode.key, to: endnode.key, text: 'no' };\r
        diagram.model.addLinkData(falsedata);\r
        var falselink = diagram.findLinkForData(falsedata);\r
\r
        // Reconnect the existing link to the new node\r
        oldlink.toNode = newnode;\r
        // Then add a link from the new node to the old node\r
        diagram.model.addLinkData({ from: endnode.key, to: tonode.key });\r
      } else if (newnode.category === 'Switch') {\r
        // add multi-way Switch group\r
        // add group for loop\r
        var groupdata = { isGroup: true, cat: newnode.category, text: newnode.category };\r
        diagram.model.addNodeData(groupdata);\r
        var group = diagram.findNodeForData(groupdata);\r
        group.containingGroup = oldlink.containingGroup;\r
        diagram.select(group);\r
\r
        newnode.containingGroup = group;\r
\r
        var enddata = { category: 'Merge' };\r
        diagram.model.addNodeData(enddata);\r
        var endnode = diagram.findNodeForData(enddata);\r
        endnode.containingGroup = group;\r
        endnode.location = e.documentPoint;\r
\r
        var yesdata = { text: 'yes,\\ndo it' };\r
        diagram.model.addNodeData(yesdata);\r
        var yesnode = diagram.findNodeForData(yesdata);\r
        yesnode.containingGroup = group;\r
        yesnode.location = e.documentPoint;\r
        diagram.model.addLinkData({ from: newnode.key, to: yesnode.key, text: 'yes' });\r
        diagram.model.addLinkData({ from: yesnode.key, to: endnode.key });\r
\r
        var nodata = { text: "no,\\ndon't" };\r
        diagram.model.addNodeData(nodata);\r
        var nonode = diagram.findNodeForData(nodata);\r
        nonode.containingGroup = group;\r
        nonode.location = e.documentPoint;\r
        diagram.model.addLinkData({ from: newnode.key, to: nonode.key, text: 'no' });\r
        diagram.model.addLinkData({ from: nonode.key, to: endnode.key });\r
\r
        var maybedata = { text: '??' };\r
        diagram.model.addNodeData(maybedata);\r
        var maybenode = diagram.findNodeForData(maybedata);\r
        maybenode.containingGroup = group;\r
        maybenode.location = e.documentPoint;\r
        diagram.model.addLinkData({ from: newnode.key, to: maybenode.key, text: 'maybe' });\r
        diagram.model.addLinkData({ from: maybenode.key, to: endnode.key });\r
\r
        // Reconnect the existing link to the new node\r
        oldlink.toNode = newnode;\r
        // Then add a link from the end node to the old node\r
        diagram.model.addLinkData({ from: endnode.key, to: tonode.key });\r
      }\r
      diagram.layoutDiagram(true);\r
    }\r
\r
    function deletingNode(node) {\r
      // excise node from the chain that it is in\r
      if (!(node instanceof go.Node)) return;\r
      if (node instanceof go.Group) {\r
        var externals = node.findExternalLinksConnected();\r
        var next = null;\r
        externals.each(link => {\r
          if (link.fromNode.isMemberOf(node)) next = link.toNode;\r
        });\r
        if (next) {\r
          externals.each(link => {\r
            if (link.toNode.isMemberOf(node)) link.toNode = next;\r
          });\r
        }\r
      } else if (node.category === '') {\r
        var next = node.findNodesOutOf().first();\r
        if (next) {\r
          new go.List(node.findLinksInto()).each(link => { link.toNode = next });\r
        }\r
      }\r
    }\r
\r
    // initialize Palette\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      maxSelectionCount: 1,\r
      nodeTemplateMap: myDiagram.nodeTemplateMap,\r
      model: new go.GraphLinksModel([\r
        { text: 'Action' },\r
        { text: 'For Each', category: 'For' },\r
        { text: 'While', category: 'While' },\r
        { text: 'If', category: 'If' },\r
        { text: 'Switch', category: 'Switch' }\r
      ])\r
    });\r
\r
    // initialize Overview\r
    myOverview = new go.Overview('myOverviewDiv', {\r
      observed: myDiagram,\r
      contentAlignment: go.Spot.Center\r
    });\r
\r
    load();\r
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
  function newDiagram() {\r
    myDiagram.model = new go.GraphLinksModel({\r
      nodeDataArray: [\r
        { key: 1, text: 'S', category: 'Start' },\r
        { key: 2, text: 'E', category: 'End' }\r
      ],\r
      linkDataArray: [{ from: 1, to: 2 }]\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* Use a Flexbox to make the Palette/Overview/Diagram responsive and size things relatively */\r
  #myFlexDiv {\r
    display: flex;\r
    width: 100%;\r
    height: 600px;\r
  }\r
  #myPODiv {\r
    display: flex;\r
  }\r
  @media (min-width: 768px) {\r
    #myFlexDiv {\r
      flex-flow: row;\r
    }\r
    #myPODiv {\r
      width: 105px;\r
      height: 100%;\r
      margin-right: 3px;\r
      flex-flow: column;\r
    }\r
    #myPaletteDiv {\r
      height: 80%;\r
    }\r
    #myOverviewDiv {\r
      margin-top: 3px;\r
      flex: 1;\r
    }\r
    #myDiagramDiv {\r
      flex: 1;\r
    }\r
  }\r
  @media (max-width: 767px) {\r
    #myFlexDiv {\r
      flex-flow: column;\r
      align-items: center;\r
    }\r
    #myPODiv {\r
      width: 90%;\r
      height: 105px;\r
      margin-bottom: 3px;\r
      flex-flow: row;\r
    }\r
    #myPaletteDiv {\r
      width: 75%;\r
    }\r
    #myOverviewDiv {\r
      margin-left: 3px;\r
      flex: 1;\r
    }\r
    #myDiagramDiv {\r
      width: 90%;\r
      flex: 1;\r
    }\r
  }`,externalStyles:[],externalScripts:[`../extensions/ParallelLayout.js`],descriptionHtml:`<p>\r
    The Flowgrammer sample demonstrates how one can build a flowchart with a constrained syntax. You can drag and drop Nodes onto Links and Nodes in the diagram\r
    in order to splice them into the graph. There is visual feedback during the dragging process. Nodes dropped onto the diagram's background are automatically\r
    deleted. Edit text by clicking on the text of selected nodes. Deleting an action or step Node excises it from the chain of steps that it is in. The "For",\r
    "While", and "If" are not deletable, but you can select and delete the Group holding the whole body of the loop or conditional. The "Start" and "End" nodes\r
    and Links are not deletable.\r
  </p>\r
  <p>The automatic layout of the diagram is accomplished with the <a>ParallelLayout</a> extension.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`layered-digraph`,`palette`,`overview`];var g=y();l(`9oa7se`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};