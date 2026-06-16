import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Org Chart with Assistants on the Side`,indexDescription:`Shows an org chart with assistant nodes at the side, above regular child nodes.`,screenshot:`orgchartassistants`,priority:2,tags:[`tables`,`treelayout`,`tooltips`,`buttons`],description:`An organization chart editor with assistants shown on the side -- edit details and change relationships.`},htmlContent:`<div id="myDiagramDiv" style="background-color: #f3f4f6; border: solid 1px black; height: 500px"></div>\r
  <div>\r
    Edit details:<br />\r
    <div id="myInspector"></div>\r
  </div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 270px">\r
{ "class": "go.TreeModel",\r
  "nodeDataArray": [\r
{"key":1, "name":"Stella Payne Diaz", "title":"CEO", "pic":"1.jpg"},\r
{"key":2, "name":"Luke Warm", "title":"VP Marketing/Sales", "pic":"2.jpg", "parent":1},\r
{"key":3, "name":"Meg Meehan Hoffa", "title":"Sales", "pic":"3.jpg", "parent":2},\r
{"key":4, "name":"Peggy Flaming", "title":"VP Engineering", "pic":"4.jpg", "parent":1},\r
{"key":5, "name":"Saul Wellingood", "title":"Manufacturing", "pic":"5.jpg", "parent":4},\r
{"key":6, "name":"Al Ligori", "title":"Marketing", "pic":"6.jpg", "parent":2},\r
{"key":7, "name":"Dot Stubadd", "title":"Sales Rep", "pic":"7.jpg", "parent":3},\r
{"key":8, "name":"Les Ismore", "title":"Project Mgr", "pic":"8.jpg", "parent":5},\r
{"key":9, "name":"April Lynn Parris", "title":"Events Mgr", "pic":"9.jpg", "parent":6},\r
{"key":10, "name":"Xavier Breath", "title":"Engineering", "pic":"10.jpg", "parent":4},\r
{"key":11, "name":"Anita Hammer", "title":"Process", "pic":"11.jpg", "parent":5},\r
{"key":12, "name":"Billy Aiken", "title":"Software", "pic":"12.jpg", "parent":10},\r
{"key":13, "name":"Stan Wellback", "title":"Testing", "pic":"13.jpg", "parent":10},\r
{"key":14, "name":"Marge Innovera", "title":"Hardware", "pic":"14.jpg", "parent":10},\r
{"key":15, "name":"Evan Elpus", "title":"Quality", "pic":"15.jpg", "parent":5},\r
{"key":16, "name":"Lotta B. Essen", "title":"Sales Rep", "pic":"16.jpg", "parent":3},\r
{"key":17, "name":"Joaquin Closet", "title":"Wardrobe Assistant", "isAssistant":true, "parent":1},\r
{"key":18, "name":"Hannah Twomey", "title":"Engineering Assistant", "parent":10, "isAssistant":true}\r
 ]\r
}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      allowDelete: false,\r
      initialAutoScale: go.AutoScale.Uniform,\r
      maxSelectionCount: 1, // users can select only one part at a time\r
      validCycle: go.CycleMode.DestinationTree, // make sure users can only create trees\r
      layout: new SideTreeLayout({\r
        treeStyle: go.TreeStyle.LastParents,\r
        arrangement: go.TreeArrangement.Horizontal,\r
        // properties for most of the tree:\r
        angle: 90,\r
        layerSpacing: 35,\r
        // properties for the "last parents":\r
        alternateAngle: 90,\r
        alternateLayerSpacing: 35,\r
        alternateAlignment: go.TreeAlignment.Bus,\r
        alternateNodeSpacing: 20\r
      }),\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
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
    // This function provides a common style for most of the TextBlocks.\r
    // Some of these values may be overridden in a particular TextBlock.\r
    function textStyle(obj) {\r
      return Object.assign({ font: '9pt Segoe UI,sans-serif' }, obj || {});\r
    }\r
\r
    // This converter is used by the Picture.\r
    function findHeadShot(pic) {\r
      if (!pic) return 'images/user.svg'; // There are only 16 images on the server\r
      return 'images/hs' + pic;\r
    }\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate = new go.Node('Auto')\r
      // for sorting, have the Node.text be the data.name\r
      .bind('text', 'name')\r
      // bind the Part.layerName to control the Node's layer depending on whether it isSelected\r
      .bindObject('layerName', 'isSelected', sel => (sel ? 'Foreground' : ''))\r
      .add(\r
        // define the node's outer shape\r
        new go.Shape('Rectangle', {\r
          name: 'SHAPE',\r
          fill: 'white',\r
          stroke: null\r
        }),\r
        new go.Panel('Horizontal')\r
          .add(\r
            new go.Picture({\r
              name: 'Picture',\r
              desiredSize: new go.Size(39, 50),\r
              margin: new go.Margin(6, 8, 6, 10),\r
              source: 'images/user.svg' // the default image\r
            })\r
              .bind('source', 'pic', findHeadShot),\r
            // define the panel where the text will appear\r
            new go.Panel('Table', {\r
              maxSize: new go.Size(150, 999),\r
              margin: new go.Margin(6, 10, 0, 3),\r
              defaultAlignment: go.Spot.Left\r
            })\r
              .addColumnDefinition(2, { width: 4 })\r
              .add(\r
                new go.TextBlock(\r
                  textStyle(\r
                    {\r
                      name: 'NAMETB',\r
                      row: 0,\r
                      column: 0,\r
                      columnSpan: 5,\r
                      font: '12pt Segoe UI, sans-serif',\r
                      editable: true,\r
                      isMultiline: false,\r
                      minSize: new go.Size(10, 16)\r
                    }\r
                  )) // the name\r
                  .bindTwoWay('text', 'name'),\r
                new go.TextBlock('Title: ', textStyle({ row: 1, column: 0 })),\r
                new go.TextBlock(\r
                  textStyle(\r
                    {\r
                      row: 1,\r
                      column: 1,\r
                      columnSpan: 4,\r
                      editable: true,\r
                      isMultiline: false,\r
                      minSize: new go.Size(10, 14),\r
                      margin: new go.Margin(0, 0, 0, 3)\r
                    }\r
                  ))\r
                  .bindTwoWay('text', 'title'),\r
                new go.TextBlock(textStyle({ row: 2, column: 0 }))\r
                  .bind('text', 'key', v => 'ID: ' + v),\r
                new go.TextBlock(\r
                    textStyle({ name: 'boss', row: 2, column: 3 }) // we include a name so we can access this TextBlock when deleting Nodes/Links\r
                  )\r
                  .bind('text', 'parent', v => 'Boss: ' + v),\r
                new go.TextBlock(\r
                  textStyle({\r
                      row: 3,\r
                      column: 0,\r
                      columnSpan: 5,\r
                      font: 'italic 9pt sans-serif',\r
                      wrap: go.Wrap.Fit,\r
                      editable: true, // by default newlines are allowed\r
                      minSize: new go.Size(10, 14)\r
                    }\r
                  )) // the comments\r
                  .bindTwoWay('text', 'comments')\r
              ) // end Table Panel\r
          ) // end Horizontal Panel\r
      ); // end Node\r
\r
    // the context menu allows users to make a position vacant,\r
    // remove a role and reassign the subtree, or remove a department\r
    myDiagram.nodeTemplate.contextMenu = go.GraphObject.build('ContextMenu')\r
      .add(\r
        go.GraphObject.build('ContextMenuButton', {\r
          click: (e, button) => {\r
            const node = button.part.adornedPart;\r
            if (node !== null) {\r
              const thisemp = node.data;\r
              myDiagram.startTransaction('add employee');\r
              const newemp = { name: '(new person)', title: '', comments: '', parent: thisemp.key };\r
              myDiagram.model.addNodeData(newemp);\r
              const newnode = myDiagram.findNodeForData(newemp);\r
              if (newnode) newnode.location = node.location;\r
              myDiagram.commitTransaction('add employee');\r
            }\r
          }\r
        })\r
          .add(new go.TextBlock('Add Employee')),\r
        go.GraphObject.build('ContextMenuButton', {\r
          click: (e, button) => {\r
            // remove the whole subtree, including the node itself\r
            const node = button.part.adornedPart;\r
            if (node !== null) {\r
              myDiagram.startTransaction('toggle assistant');\r
              myDiagram.model.set(node.data, 'isAssistant', !node.data.isAssistant);\r
              myDiagram.layout.invalidateLayout();\r
              myDiagram.commitTransaction('toggle assistant');\r
            }\r
          }\r
        })\r
          .add(new go.TextBlock('Toggle Assistant'))\r
      );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate = new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
      .add(new go.Shape({ strokeWidth: 4, stroke: '#00a4a4' })); // the link shape\r
\r
    // read in the JSON-format data from the "mySavedModel" element\r
    load();\r
\r
    // support editing the properties of the selected person in HTML\r
    myInspector = new Inspector('myInspector', myDiagram, {\r
      properties: {\r
        key: { readOnly: true },\r
        comments: {},\r
        isAssistant: { type: 'boolean', defaultValue: false }\r
      },\r
      propertyModified: (name, val) => {\r
        if (name === 'isAssistant') myDiagram.layout.invalidateLayout();\r
      }\r
    });\r
  } // end init\r
\r
  // Assume that the SideTreeLayout determines whether a node is an "assistant" if a particular data property is true.\r
  // You can adapt this code to decide according to your app's needs.\r
  function isAssistant(n) {\r
    if (n === null) return false;\r
    return n.data.isAssistant;\r
  }\r
\r
  // This is a custom TreeLayout that knows about "assistants".\r
  // A Node for which isAssistant(n) is true will be placed at the side below the parent node\r
  // but above all of the other child nodes.\r
  // An assistant node may be the root of its own subtree.\r
  // An assistant node may have its own assistant nodes.\r
  class SideTreeLayout extends go.TreeLayout {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    makeNetwork(coll) {\r
      const net = super.makeNetwork(coll);\r
      // copy the collection of TreeVertexes, because we will modify the network\r
      const vertexcoll = new go.Set(/*go.TreeVertex*/);\r
      vertexcoll.addAll(net.vertexes);\r
      for (const it = vertexcoll.iterator; it.next(); ) {\r
        const parent = it.value;\r
        // count the number of assistants\r
        let acount = 0;\r
        const ait = parent.destinationVertexes;\r
        while (ait.next()) {\r
          if (isAssistant(ait.value.node)) acount++;\r
        }\r
        // if a vertex has some number of children that should be assistants\r
        if (acount > 0) {\r
          // remember the assistant edges and the regular child edges\r
          const asstedges = new go.Set(/*go.TreeEdge*/);\r
          const childedges = new go.Set(/*go.TreeEdge*/);\r
          let eit = parent.destinationEdges;\r
          while (eit.next()) {\r
            const e = eit.value;\r
            if (isAssistant(e.toVertex.node)) {\r
              asstedges.add(e);\r
            } else {\r
              childedges.add(e);\r
            }\r
          }\r
          // first remove all edges from PARENT\r
          eit = asstedges.iterator;\r
          while (eit.next()) {\r
            parent.deleteDestinationEdge(eit.value);\r
          }\r
          eit = childedges.iterator;\r
          while (eit.next()) {\r
            parent.deleteDestinationEdge(eit.value);\r
          }\r
          // if the number of assistants is odd, add a dummy assistant, to make the count even\r
          if (acount % 2 == 1) {\r
            const dummy = net.createVertex();\r
            net.addVertex(dummy);\r
            net.linkVertexes(parent, dummy, asstedges.first().link);\r
          }\r
          // now PARENT should get all of the assistant children\r
          eit = asstedges.iterator;\r
          while (eit.next()) {\r
            parent.addDestinationEdge(eit.value);\r
          }\r
          // create substitute vertex to be new parent of all regular children\r
          const subst = net.createVertex();\r
          net.addVertex(subst);\r
          // reparent regular children to the new substitute vertex\r
          eit = childedges.iterator;\r
          while (eit.next()) {\r
            const ce = eit.value;\r
            ce.fromVertex = subst;\r
            subst.addDestinationEdge(ce);\r
          }\r
          // finally can add substitute vertex as the final odd child,\r
          // to be positioned at the end of the PARENT's immediate subtree.\r
          const newedge = net.linkVertexes(parent, subst, null);\r
        }\r
      }\r
      return net;\r
    }\r
\r
    assignTreeVertexValues(v) {\r
      // if a vertex has any assistants, use Bus alignment\r
      let any = false;\r
      const children = v.children;\r
      for (let i = 0; i < children.length; i++) {\r
        const c = children[i];\r
        if (isAssistant(c.node)) {\r
          any = true;\r
          break;\r
        }\r
      }\r
      if (any) {\r
        // this is the parent for the assistant(s)\r
        v.alignment = go.TreeAlignment.Bus; // this is required\r
        v.nodeSpacing = 50; // control the distance of the assistants from the parent's main links\r
      } else if (v.node == null && v.childrenCount > 0) {\r
        // found the substitute parent for non-assistant children\r
        //v.alignment = go.TreeAlignment.CenterChildren;\r
        //v.breadthLimit = 3000;\r
        v.layerSpacing = 0;\r
      }\r
    }\r
\r
    commitLinks() {\r
      super.commitLinks();\r
      // make sure the middle segment of an orthogonal link does not cross over the assistant subtree\r
      const eit = this.network.edges.iterator;\r
      while (eit.next()) {\r
        const e = eit.value;\r
        if (e.link == null) continue;\r
        const r = e.link;\r
        // does this edge come from a substitute parent vertex?\r
        const subst = e.fromVertex;\r
        if (subst.node == null && r.routing == go.Routing.Orthogonal) {\r
          r.updateRoute();\r
          r.startRoute();\r
          // middle segment goes from point 2 to point 3\r
          const p1 = subst.center; // assume artificial vertex has zero size\r
          const p2 = r.getPoint(2).copy();\r
          const p3 = r.getPoint(3).copy();\r
          const p5 = r.getPoint(r.pointsCount - 1);\r
          let dist = 10;\r
          if (subst.angle == 270 || subst.angle == 180) dist = -20;\r
          if (subst.angle == 90 || subst.angle == 270) {\r
            p2.y = p5.y - dist; // (p1.y+p5.y)/2;\r
            p3.y = p5.y - dist; // (p1.y+p5.y)/2;\r
          } else {\r
            p2.x = p5.x - dist; // (p1.x+p5.x)/2;\r
            p3.x = p5.x - dist; // (p1.x+p5.x)/2;\r
          }\r
          r.setPoint(2, p2);\r
          r.setPoint(3, p3);\r
          r.commitRoute();\r
        }\r
      }\r
    }\r
  }\r
  // end of SideTreeLayout\r
\r
  // Assume that the SideTreeLayout determines whether a node is an "assistant" if a particular data property is true.\r
  // You can adapt this code to decide according to your app's needs.\r
  function isAssistant(n) {\r
    if (n === null) return false;\r
    return n.data.isAssistant;\r
  }\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      allowDelete: false,\r
      initialAutoScale: go.AutoScale.Uniform,\r
      maxSelectionCount: 1, // users can select only one part at a time\r
      validCycle: go.CycleMode.DestinationTree, // make sure users can only create trees\r
      layout: new SideTreeLayout({\r
        treeStyle: go.TreeStyle.LastParents,\r
        arrangement: go.TreeArrangement.Horizontal,\r
        // properties for most of the tree:\r
        angle: 90,\r
        layerSpacing: 35,\r
        // properties for the "last parents":\r
        alternateAngle: 90,\r
        alternateLayerSpacing: 35,\r
        alternateAlignment: go.TreeAlignment.Bus,\r
        alternateNodeSpacing: 20\r
      }),\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
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
    // This function provides a common style for most of the TextBlocks.\r
    // Some of these values may be overridden in a particular TextBlock.\r
    function textStyle(tb) {\r
      tb.font = '9pt Segoe UI,sans-serif';\r
    }\r
\r
    // This converter is used by the Picture.\r
    function findHeadShot(pic) {\r
      if (!pic) return 'images/user.svg'; // There are only 16 images on the server\r
      return 'images/hs' + pic;\r
    }\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        // for sorting, have the Node.text be the data.name\r
        .bind('text', 'name')\r
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected\r
        .bindObject('layerName', 'isSelected', sel => sel ? 'Foreground' : '')\r
        .add(\r
          // define the node's outer shape\r
          new go.Shape('Rectangle', { name: 'SHAPE', fill: 'white', stroke: null }),\r
          new go.Panel('Horizontal')\r
            .add(\r
              new go.Picture({\r
                  name: 'Picture',\r
                  desiredSize: new go.Size(39, 50),\r
                  margin: new go.Margin(6, 8, 6, 10),\r
                  source: 'images/user.svg' // the default image\r
                })\r
                .bind('source', 'pic', findHeadShot),\r
              // define the panel where the text will appear\r
              new go.Panel('Table', {\r
                  maxSize: new go.Size(150, 999),\r
                  margin: new go.Margin(6, 10, 0, 3),\r
                  defaultAlignment: go.Spot.Left\r
                })\r
                .addColumnDefinition(2, { width: 4 })\r
                .add(\r
                  new go.TextBlock()\r
                  .apply(textStyle)\r
                  .set({\r
                      name: 'NAMETB',\r
                      row: 0,\r
                      column: 0,\r
                      columnSpan: 5,\r
                      font: '12pt Segoe UI, sans-serif',\r
                      editable: true,\r
                      isMultiline: false,\r
                      minSize: new go.Size(10, 16)\r
                    })\r
                    .bindTwoWay('text', 'name'),\r
                  new go.TextBlock('Title: ')\r
                    .apply(textStyle)\r
                    .set({ row: 1, column: 0 }),\r
                  new go.TextBlock()\r
                    .apply(textStyle)\r
                    .set({ // the name\r
                      row: 1,\r
                      column: 1,\r
                      columnSpan: 4,\r
                      editable: true,\r
                      isMultiline: false,\r
                      minSize: new go.Size(10, 14),\r
                      margin: new go.Margin(0, 0, 0, 3)\r
                    })\r
                    .bindTwoWay('text', 'title'),\r
                  new go.TextBlock()\r
                    .apply(textStyle)\r
                    .set({ row: 2, column: 0 })\r
                    .bind('text', 'key', v => 'ID: ' + v),\r
                  new go.TextBlock()\r
                    .apply(textStyle)\r
                    .set({\r
                      name: 'boss', row: 2, column: 3 // we include a name so we can access this TextBlock when deleting Nodes/Links\r
                    })\r
                    .bind('text', 'parent', v => 'Boss: ' + v),\r
                  new go.TextBlock()\r
                    .apply(textStyle)\r
                    .set({ // the comments\r
                      row: 3,\r
                      column: 0,\r
                      columnSpan: 5,\r
                      font: 'italic 9pt sans-serif',\r
                      wrap: go.Wrap.Fit,\r
                      editable: true, // by default newlines are allowed\r
                      minSize: new go.Size(10, 14)\r
                    })\r
                    .bindTwoWay('text', 'comments')\r
                ) // end Table Panel\r
            ) // end Horizontal Panel\r
        ); // end Node\r
\r
    // the context menu allows users to make a position vacant,\r
    // remove a role and reassign the subtree, or remove a department\r
    myDiagram.nodeTemplate.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => {\r
                const node = button.part.adornedPart;\r
                if (node !== null) {\r
                  const thisemp = node.data;\r
                  myDiagram.startTransaction('add employee');\r
                  const newemp = { name: '(new person)', title: '', comments: '', parent: thisemp.key };\r
                  myDiagram.model.addNodeData(newemp);\r
                  const newnode = myDiagram.findNodeForData(newemp);\r
                  if (newnode) newnode.location = node.location;\r
                  myDiagram.commitTransaction('add employee');\r
                }\r
              }\r
            })\r
            .add(new go.TextBlock('Add Employee')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => {\r
                // remove the whole subtree, including the node itself\r
                const node = button.part.adornedPart;\r
                if (node !== null) {\r
                  myDiagram.startTransaction('toggle assistant');\r
                  myDiagram.model.set(node.data, 'isAssistant', !node.data.isAssistant);\r
                  myDiagram.layout.invalidateLayout();\r
                  myDiagram.commitTransaction('toggle assistant');\r
                }\r
              }\r
            })\r
            .add(new go.TextBlock('Toggle Assistant'))\r
        );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
        .add(\r
          new go.Shape({ strokeWidth: 4, stroke: '#00a4a4' })\r
        );\r
\r
    // read in the JSON-format data from the "mySavedModel" element\r
    load();\r
\r
    // support editing the properties of the selected person in HTML\r
    myInspector = new Inspector('myInspector', myDiagram, {\r
      properties: {\r
        key: { readOnly: true },\r
        comments: {},\r
        isAssistant: { type: 'boolean', defaultValue: false }\r
      },\r
      propertyModified: (name, val) => {\r
        if (name === 'isAssistant') myDiagram.layout.invalidateLayout();\r
      }\r
    });\r
  } // end init\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
    // make sure new data keys are unique positive integers\r
    let lastkey = 1;\r
    myDiagram.model.makeUniqueKeyFunction = (model, data) => {\r
      let k = data.key || lastkey;\r
      while (model.findNodeDataForKey(k)) k++;\r
      data.key = lastkey = k;\r
      return k;\r
    };\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DataInspector.js`],descriptionHtml:`<p>\r
    This editable organizational chart sample is a simplified <a href="orgChartEditor">Org Chart Editor</a> that adds support for "assistant" nodes that are\r
    laid out by a custom <a>TreeLayout</a> below the side of the parent node and above the regular child nodes. See that sample for an org chart with more\r
    stylized nodes.\r
  </p>\r
  <p>\r
    Whether or not a node is considered to be an "assistant" node is determined by the <code>isAssistant</code> property of the node data. The user can modify\r
    this data property via an additional context menu command.\r
  </p>\r
  <p>Assistant employees may themselves be bosses of their own employees. All of a boss's reports may be assistants.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`,`tooltips`,`buttons`];var g=y();l(`d3qldc`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};