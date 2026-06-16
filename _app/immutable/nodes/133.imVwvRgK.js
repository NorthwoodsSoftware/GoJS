import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Add/Remove/Modify Ports Dynamically on Nodes`,titleShort:`Dynamic Ports`,indexDescription:`Add ports to a selected node by clicking buttons or by using a context menu. Draw links by dragging between ports. If you select a link you can relink or reshape it.`,screenshot:`dynamicports`,priority:1,tags:[`tables`,`itemarrays`,`links`,`ports`,`contextmenus`,`buttons`,`theme`,`commands`],description:`Nodes with varying lists of ports on each of four sides.`},htmlContent:`<div style="display: flex; flex-wrap: wrap; gap: 1em; align-items: stretch;">\r
    <div id="myDiagramDiv" style="flex: 1 1 600px; min-width: 600px; height: 500px;"></div>\r
    <div style="flex: 1 1 400px; min-width: 320px; display: flex; flex-direction: column;">\r
    <div style="margin-block: .5em;">\r
      <p style="display: inline; margin-right: .5em;">Add port to selected nodes: </p>\r
      <button onclick="addPort('top')">Top</button>\r
      <button onclick="addPort('bottom')">Bottom</button>\r
      <button onclick="addPort('left')">Left</button>\r
      <button onclick="addPort('right')">Right</button>\r
    </div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
\r
    <textarea id="mySavedModel" style="flex: 1 1 auto; width: 100%; min-height: 250px">\r
{ "class": "GraphLinksModel",\r
  "copiesArrays": true,\r
  "copiesArrayObjects": true,\r
  "pointsDigits": 1,\r
  "linkFromPortIdProperty": "fromPort",\r
  "linkToPortIdProperty": "toPort",\r
  "nodeDataArray": [\r
  {"key":1,"name":"SWITCH-01","loc":"120 100",\r
  "leftArray":[{"portColor":0,"portId":"left0"}],\r
  "topArray":[{"portColor":1,"portId":"top0"}],\r
  "bottomArray":[{"portColor":2,"portId":"bottom0"}],\r
  "rightArray":[{"portColor":3,"portId":"right0"},{"portColor":0,"portId":"right1"}]},\r
  {"key":2,"name":"ROUTER-02","loc":"320 170",\r
  "leftArray":[{"portColor":0,"portId":"left0"},{"portColor":0,"portId":"left1"},{"portColor":0,"portId":"left2"}],\r
  "topArray":[{"portColor":3,"portId":"top0"}],\r
  "bottomArray":[{"portColor":2,"portId":"bottom0"},{"portColor":3,"portId":"bottom1"},{"portColor":0,"portId":"bottom2"}],\r
  "rightArray":[]},\r
  {"key":3,"name":"SERVER-03","loc":"410 310",\r
  "leftArray":[{"portColor":0,"portId":"left0"},{"portColor":0,"portId":"left1"},{"portColor":0,"portId":"left2"}],\r
  "topArray":[{"portColor":0,"portId":"top0"}],\r
  "bottomArray":[{"portColor":2,"portId":"bottom0"}],\r
  "rightArray":[]},\r
  {"key":4,"name":"STORAGE-04","loc":"120 380",\r
  "leftArray":[{"portColor":0,"portId":"left0"}],\r
  "topArray":[{"portColor":0,"portId":"top0"}],\r
  "bottomArray":[{"portColor":2,"portId":"bottom0"}],\r
  "rightArray":[{"portColor":0,"portId":"right0"},{"portColor":0,"portId":"right1"}]}\r
  ],\r
  "linkDataArray": [\r
  {"from":4,"to":2,"fromPort":"top0","toPort":"bottom0"},\r
  {"from":4,"to":2,"fromPort":"top0","toPort":"bottom0"},\r
  {"from":3,"to":2,"fromPort":"top0","toPort":"bottom1"},\r
  {"from":4,"to":3,"fromPort":"right0","toPort":"left0"},\r
  {"from":4,"to":3,"fromPort":"right1","toPort":"left2"},\r
  {"from":1,"to":2,"fromPort":"right0","toPort":"left1"},\r
  {"from":1,"to":2,"fromPort":"right1","toPort":"left2"}\r
]}\r
    </textarea>\r
    </div>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { //Diagram refers to its DIV HTML element by id\r
      'undoManager.isEnabled': true\r
    });\r
    myDiagram.routers.add(new AvoidsLinksRouter());\r
\r
    portColors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];\r
    myDiagram.themeManager.set('', {\r
      colors: { ports: portColors }\r
    });\r
\r
    myDiagram.grid =\r
      new go.Panel("Grid")\r
        .add(\r
          new go.Shape("LineH", { strokeWidth: 1, strokeDashArray: [0, 19, 1, 0], interval: 2 })\r
        );\r
\r
    myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;\r
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
    // To simplify this code we define a function for creating a context menu button:\r
    function makeButton(text, action, visiblePredicate) {\r
      const button =\r
        go.GraphObject.build('ContextMenuButton', { click: action})\r
          .add(new go.TextBlock(text));\r
      if (visiblePredicate) {\r
        button.bindObject('visible', '', (o, e) => o.diagram ? visiblePredicate(o, e) : false);\r
      }\r
      return button;\r
    }\r
\r
    const nodeMenu = // context menu for each Node\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          makeButton('Copy', (e, obj) => e.diagram.commandHandler.copySelection()),\r
          makeButton('Delete', (e, obj) => e.diagram.commandHandler.deleteSelection()),\r
          new go.Shape('LineH', { strokeWidth: 2, height: 1, stretch: go.Stretch.Horizontal }),\r
          makeButton('Add top port', (e, obj) => addPort('top')),\r
          makeButton('Add left port', (e, obj) => addPort('left')),\r
          makeButton('Add right port', (e, obj) => addPort('right')),\r
          makeButton('Add bottom port', (e, obj) => addPort('bottom'))\r
        );\r
\r
    const portSize = new go.Size(9, 9);\r
\r
    const portMenu = // context menu for each port\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          makeButton('Swap order', (e, obj) => swapOrder(obj.part.adornedObject)),\r
          makeButton('Remove port',\r
            // in the click event handler, the obj.part is the Adornment;\r
            // its adornedObject is the port\r
            (e, obj) => removePort(obj.part.adornedObject)\r
          ),\r
          makeButton('Change color', (e, obj) => changeColor(obj.part.adornedObject)),\r
          makeButton('Remove side ports', (e, obj) => removeAll(obj.part.adornedObject))\r
        );\r
\r
    // the node template\r
    // includes a panel on each side with an itemArray of panels containing ports\r
    myDiagram.nodeTemplate =\r
      new go.Node('Table', {\r
          locationObjectName: 'BODY',\r
          selectionObjectName: 'BODY',\r
          contextMenu: nodeMenu\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // the body\r
          new go.Panel('Auto', {\r
              row: 1,\r
              column: 1,\r
              name: 'BODY',\r
              stretch: go.Stretch.Fill\r
            })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                fill: 'white',\r
                stroke: 'gray',\r
                strokeWidth: 1,\r
                minSize: new go.Size(130, 50)\r
              }),\r
              new go.Panel('Horizontal', { margin: 10 })\r
                .add(\r
                  new go.Shape('Circle', {\r
                    desiredSize: new go.Size(8, 8),\r
                    fill: '#22c55e',\r
                    stroke: null,\r
                    margin: new go.Margin(0, 8, 0, 0)\r
                  }),\r
                  new go.TextBlock({\r
                      textAlign: 'center',\r
                      font: 'bold 13px ui-monospace, "SF Mono", Menlo, monospace',\r
                      stroke: '#1e293b',\r
                      editable: true\r
                    })\r
                    .bindTwoWay('text', 'name')\r
                )\r
            ), // end Auto Panel body\r
\r
          // the Panel holding the left port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.leftArray\r
          new go.Panel('Vertical', {\r
              row: 1,\r
              column: 0,\r
              itemTemplate:\r
                new go.Panel({\r
                    fromSpot: go.Spot.Left,\r
                    toSpot: go.Spot.Left,\r
                    fromLinkable: true,\r
                    toLinkable: true,\r
                    cursor: 'pointer',\r
                    contextMenu: portMenu\r
                  })\r
                  .attach({ _side: 'left' }) // internal property to make it easier to tell which side it's on\r
                  .bind('portId', 'portId')\r
                  .add(\r
                    new go.Shape('Rectangle', {\r
                        stroke: 'gray',\r
                        strokeWidth: 0.5,\r
                        desiredSize: portSize,\r
                        margin: new go.Margin(1, 0)\r
                      })\r
                      .themeData('fill', 'portColor', 'ports')\r
                  )\r
            }) // end Vertical Panel\r
            .bind('itemArray', 'leftArray'),\r
\r
          // the Panel holding the top port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.topArray\r
          new go.Panel('Horizontal', {\r
              row: 0,\r
              column: 1,\r
              itemTemplate:\r
                new go.Panel({\r
                    fromSpot: go.Spot.Top,\r
                    toSpot: go.Spot.Top,\r
                    fromLinkable: true,\r
                    toLinkable: true,\r
                    cursor: 'pointer',\r
                    contextMenu: portMenu\r
                  })\r
                  .attach({ _side: 'top' }) // internal property to make it easier to tell which side it's on\r
                  .bind('portId', 'portId')\r
                  .add(\r
                    new go.Shape('Rectangle', {\r
                        stroke: 'gray',\r
                        strokeWidth: 0.5,\r
                        desiredSize: portSize,\r
                        margin: new go.Margin(0, 1)\r
                      })\r
                      .themeData('fill', 'portColor', 'ports')\r
                  )\r
            }) // end Horizontal Panel\r
            .bind('itemArray', 'topArray'),\r
\r
          // the Panel holding the right port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.rightArray\r
          new go.Panel('Vertical', {\r
              row: 1,\r
              column: 2,\r
              itemTemplate:\r
                new go.Panel({\r
                    fromSpot: go.Spot.Right,\r
                    toSpot: go.Spot.Right,\r
                    fromLinkable: true,\r
                    toLinkable: true,\r
                    cursor: 'pointer',\r
                    contextMenu: portMenu\r
                  })\r
                  .attach({ _side: 'right' }) // internal property to make it easier to tell which side it's on\r
                  .bind('portId', 'portId')\r
                  .add(\r
                    new go.Shape('Rectangle', {\r
                        stroke: 'gray',\r
                        strokeWidth: 0.5,\r
                        desiredSize: portSize,\r
                        margin: new go.Margin(1, 0)\r
                      })\r
                      .themeData('fill', 'portColor', 'ports')\r
                  )\r
            }) // end Vertical Panel\r
            .bind('itemArray', 'rightArray'),\r
\r
          // the Panel holding the bottom port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.bottomArray\r
          new go.Panel('Horizontal', {\r
              row: 2,\r
              column: 1,\r
              itemTemplate:\r
                new go.Panel({\r
                    fromSpot: go.Spot.Bottom,\r
                    toSpot: go.Spot.Bottom,\r
                    fromLinkable: true,\r
                    toLinkable: true,\r
                    cursor: 'pointer',\r
                    contextMenu: portMenu\r
                  })\r
                  .attach({ _side: 'bottom' }) // internal property to make it easier to tell which side it's on\r
                  .bind('portId', 'portId')\r
                  .add(\r
                    new go.Shape('Rectangle', {\r
                        stroke: 'gray',\r
                        strokeWidth: 0.5,\r
                        desiredSize: portSize,\r
                        margin: new go.Margin(0, 1)\r
                      })\r
                      .themeData('fill', 'portColor', 'ports')\r
                  ) // end itemTemplate\r
            }) // end Horizontal Panel\r
            .bind('itemArray', 'bottomArray')\r
        ); // end Node\r
\r
    // an orthogonal link template, reshapable and relinkable\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 8,\r
          curve: go.Curve.JumpGap,\r
          reshapable: true,\r
          resegmentable: true,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          new go.Shape({ stroke: 'gray', strokeWidth: 2, strokeCap: 'round', strokeJoin: 'round' })\r
        );\r
\r
    // support double-clicking in the background to add a copy of this data as a node\r
    myDiagram.toolManager.clickCreatingTool.archetypeNodeData = {\r
      name: 'DEVICE',\r
      leftArray: [],\r
      rightArray: [],\r
      topArray: [],\r
      bottomArray: []\r
    };\r
\r
    myDiagram.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          makeButton('Paste',\r
            (e, obj) => e.diagram.commandHandler.pasteSelection(\r
                          e.diagram.toolManager.contextMenuTool.mouseDownPoint\r
                        ),\r
            o => o.diagram.commandHandler.canPasteSelection(\r
                    o.diagram.toolManager.contextMenuTool.mouseDownPoint\r
                  )\r
          ),\r
          makeButton('Undo',\r
            (e, obj) => e.diagram.commandHandler.undo(),\r
            o => o.diagram.commandHandler.canUndo()\r
          ),\r
          makeButton('Redo',\r
            (e, obj) => e.diagram.commandHandler.redo(),\r
            o => o.diagram.commandHandler.canRedo()\r
          )\r
        );\r
\r
    // load the diagram from JSON data\r
    load();\r
  }\r
\r
  // Add a port to the specified side of the selected nodes.\r
  function addPort(side) {\r
    myDiagram.startTransaction('addPort');\r
    myDiagram.selection.each(node => {\r
      // skip any selected Links\r
      if (!(node instanceof go.Node)) return;\r
      // compute the next available index number for the side\r
      let i = 0;\r
      while (node.findPort(side + i.toString()) !== node) i++;\r
      // now this new port name is unique within the whole Node because of the side prefix\r
      const name = side + i.toString();\r
      // get the Array of port data to be modified\r
      const arr = node.data[side + 'Array'];\r
      if (arr) {\r
        // create a new port data object\r
        const newportdata = {\r
          portId: name,\r
          portColor: getPortColor()\r
        };\r
        // and add it to the Array of port data\r
        myDiagram.model.insertArrayItem(arr, -1, newportdata);\r
      }\r
    });\r
    myDiagram.commitTransaction('addPort');\r
  }\r
\r
  // Exchange the position/order of the given port with the next one.\r
  // If it's the last one, swap with the previous one.\r
  function swapOrder(port) {\r
    const arr = port.panel.itemArray;\r
    if (arr.length >= 2) {\r
      // only if there are at least two ports!\r
      for (let i = 0; i < arr.length; i++) {\r
        if (arr[i].portId === port.portId) {\r
          myDiagram.startTransaction('swap ports');\r
          if (i >= arr.length - 1) i--; // now can swap I and I+1, even if it's the last port\r
          const newarr = arr.slice(0); // copy Array\r
          newarr[i] = arr[i + 1]; // swap items\r
          newarr[i + 1] = arr[i];\r
          // remember the new Array in the model\r
          myDiagram.model.set(port.part.data, port._side + 'Array', newarr);\r
          port.part.findLinksConnected(newarr[i].portId).each(l => l.invalidateRoute());\r
          port.part.findLinksConnected(newarr[i + 1].portId).each(l => l.invalidateRoute());\r
          myDiagram.commitTransaction('swap ports');\r
          break;\r
        }\r
      }\r
    }\r
  }\r
\r
  // Remove the clicked port from the node.\r
  // Links to the port will be redrawn to the node's shape.\r
  function removePort(port) {\r
    myDiagram.startTransaction('removePort');\r
    const pid = port.portId;\r
    const arr = port.panel.itemArray;\r
    for (let i = 0; i < arr.length; i++) {\r
      if (arr[i].portId === pid) {\r
        myDiagram.model.removeArrayItem(arr, i);\r
        break;\r
      }\r
    }\r
    myDiagram.commitTransaction('removePort');\r
  }\r
\r
  // Remove all ports from the same side of the node as the clicked port.\r
  function removeAll(port) {\r
    myDiagram.startTransaction('removePorts');\r
    const nodedata = port.part.data;\r
    const side = port._side; // there are four property names, all ending in "Array"\r
    myDiagram.model.set(nodedata, side + 'Array', []); // an empty Array\r
    myDiagram.commitTransaction('removePorts');\r
  }\r
\r
  // Change the color of the clicked port.\r
  function changeColor(port) {\r
    myDiagram.startTransaction('colorPort');\r
    const data = port.data;\r
    myDiagram.model.set(data, 'portColor', getPortColor());\r
    myDiagram.commitTransaction('colorPort');\r
  }\r
\r
  function getPortColor() {\r
    return Math.floor(Math.random() * portColors.length);\r
  }\r
\r
  // Save the model to / load it from JSON text shown on the page itself, not in a database.\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
\r
    // When copying a node, we need to copy the data that the node is bound to.\r
    // This JavaScript object includes properties for the node as a whole, and\r
    // four properties that are Arrays holding data for each port.\r
    // Those arrays and port data objects need to be copied too.\r
    // Thus Model.copiesArrays and Model.copiesArrayObjects both need to be true.\r
\r
    // Link data includes the names of the to- and from- ports;\r
    // so the GraphLinksModel needs to set these property names:\r
    // linkFromPortIdProperty and linkToPortIdProperty.\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/AvoidsLinksRouter.js`],descriptionHtml:`<p>\r
    Double-click in the diagram background in order to add a new node there. In this sample you can\r
    add ports to a selected node by clicking the above buttons or by using the context menu. Draw\r
    links between ports by dragging between ports. If you select a link you can relink or reshape\r
    it. Right-click or touch-hold on a port to bring up a context menu that allows you to remove it\r
    or change its color.\r
  </p>\r
  <p>\r
    See the <a href="../intro/ports">ports learn page</a> for an explanation of GoJS ports.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`links`,`ports`,`contextmenus`,`buttons`,`theme`,`commands`];var g=y();l(`1qw7890`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};