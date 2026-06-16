import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Organizational Chart Diagram Editor`,titleShort:`Organizational Chart Editor`,indexDescription:`An organizational chart that allows user editing and re-organizing of the hierarchy.`,screenshot:`orgcharteditor`,priority:.5,tags:[`tables`,`treelayout`,`contextmenus`,`buttons`,`inspector`,`theme`],description:`An organization chart editor -- edit details and change relationships.`},htmlContent:`<div class="sample-layout">\r
    <div id="myDiagramDiv"></div>\r
    <div class="sample-controls">\r
      <div style="display: inline;">\r
        Theme:\r
        <select id="theme" onchange="changeTheme()">\r
          <option value="system">System</option>\r
          <option value="light">Light</option>\r
          <option value="dark" selected>Dark</option>\r
        </select>\r
        <div style="margin-block: .5em;">\r
          <button id="zoomToFit">Zoom to Fit</button>\r
          <button id="centerRoot">Center on root</button>\r
        </div>\r
      </div>\r
      <div id="inspectorContainer">\r
        Edit details:<br />\r
        <div id="myInspector" style="margin-block: .5em"></div>\r
      </div>\r
    </div>\r
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
{"key":1, "name":"Stella Payne Diaz", "title":"CEO", "dept": "Management", "pic":"1.jpg", "email": "sdiaz@example.com", "phone": "(234) 555-6789" },\r
{"key":2, "name":"Luke Warm", "title":"VP Marketing/Sales", "dept": "Management", "pic":"2.jpg", "email": "lwarm@example.com", "phone": "(234) 555-6789", "parent":1},\r
{"key":3, "name":"Meg Meehan Hoffa", "title":"Sales", "dept": "Sales", "pic":"3.jpg", "email": "mhoffa@example.com", "phone": "(234) 555-6789", "parent":2},\r
{"key":4, "name":"Peggy Flaming", "title":"VP Engineering", "dept": "Management", "pic":"4.jpg", "email": "pflaming@example.com", "phone": "(234) 555-6789", "parent":1},\r
{"key":5, "name":"Saul Wellingood", "title":"Manufacturing", "dept": "Production", "pic":"5.jpg", "email": "swellingood@example.com", "phone": "(234) 555-6789", "parent":4},\r
{"key":6, "name":"Al Ligori", "title":"Marketing", "dept": "Marketing", "pic":"6.jpg", "email": "aligori@example.com", "phone": "(234) 555-6789", "parent":2},\r
{"key":7, "name":"Dot Stubadd", "title":"Sales Rep", "dept": "Sales", "pic":"7.jpg", "email": "dstubadd@example.com", "phone": "(234) 555-6789", "parent":3},\r
{"key":8, "name":"Les Ismore", "title":"Project Mgr", "dept": "Production", "pic":"8.jpg", "email": "lismore@example.com", "phone": "(234) 555-6789", "parent":5},\r
{"key":9, "name":"April Lynn Parris", "title":"Events Mgr", "dept": "Marketing", "pic":"9.jpg", "email": "aparris@example.com", "phone": "(234) 555-6789", "parent":6},\r
{"key":10, "name":"Xavier Breath", "title":"Engineering", "dept": "Engineering", "pic":"10.jpg", "email": "xbreath@example.com", "phone": "(234) 555-6789", "parent":4},\r
{"key":11, "name":"Anita Hammer", "title":"Process", "dept": "Production", "pic":"11.jpg", "email": "ahammer@example.com", "phone": "(234) 555-6789", "parent":5},\r
{"key":12, "name":"Billy Aiken", "title":"Software", "dept": "Engineering", "pic":"12.jpg", "email": "baiken@example.com", "phone": "(234) 555-6789", "parent":10},\r
{"key":13, "name":"Stan Wellback", "title":"Testing", "dept": "Engineering", "pic":"13.jpg", "email": "swellback@example.com", "phone": "(234) 555-6789", "parent":10},\r
{"key":14, "name":"Marge Innovera", "title":"Hardware", "dept": "Engineering", "pic":"14.jpg", "email": "minnovera@example.com", "phone": "(234) 555-6789", "parent":10},\r
{"key":15, "name":"Evan Elpus", "title":"Quality", "dept": "Production", "pic":"15.jpg", "email": "eelpus@example.com", "phone": "(234) 555-6789", "parent":5},\r
{"key":16, "name":"Lotta B. Essen", "title":"Sales Rep", "dept": "Sales", "pic":"16.jpg", "email": "lessen@example.com", "phone": "(234) 555-6789", "parent":3}\r
 ]\r
}\r
    </textarea>\r
  </div>\r
  <dialog>\r
    <div style="display: flex; flex-direction: column">\r
      <p></p>\r
      <p>Click anywhere to close</p>\r
    </div>\r
  </dialog>\r
  <p id="hidden">this forces the font to load in Chromium browsers</p>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      allowDelete: false,\r
      initialAutoScale: go.AutoScale.UniformToFill,\r
      maxSelectionCount: 1, // users can select only one part at a time\r
      validCycle: go.CycleMode.DestinationTree, // make sure users can only create trees\r
      'clickCreatingTool.archetypeNodeData': {\r
        // allow double-click in background to create a new node\r
        name: '(New person)',\r
        title: '(Title)',\r
        dept: '(Dept)'\r
      },\r
      'clickCreatingTool.insertPart': function (loc) {\r
        // method override must be function, not =>\r
        const node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);\r
        if (node !== null) {\r
          this.diagram.select(node);\r
          this.diagram.commandHandler.scrollToPart(node);\r
          this.diagram.commandHandler.editTextBlock(node.findObject('NAMETB'));\r
        }\r
        return node;\r
      },\r
      layout: new go.TreeLayout({\r
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
      'undoManager.isEnabled': true, // enable undo & redo\r
      'themeManager.changesDivBackground': true,\r
      'themeManager.currentTheme': document.getElementById('theme').value\r
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
    // set up some colors/fonts for the default ('light') and dark Themes\r
    myDiagram.themeManager.set('light', {\r
      colors: {\r
        background: '#fff',\r
        text: '#111827',\r
        textHighlight: '#11a8cd',\r
        subtext: '#6b7280',\r
        badge: '#f0fdf4',\r
        badgeBorder: '#16a34a33',\r
        badgeText: '#15803d',\r
        divider: '#6b7280',\r
        shadow: '#9ca3af',\r
        tooltip: '#1f2937',\r
        levels: [\r
          '#AC193D',\r
          '#2672EC',\r
          '#8C0095',\r
          '#5133AB',\r
          '#008299',\r
          '#D24726',\r
          '#008A00',\r
          '#094AB2'\r
        ],\r
        dragOver: '#f0f9ff',\r
        link: '#9ca3af',\r
        div: '#f3f4f6'\r
      },\r
      fonts: {\r
        name: '500 0.875rem InterVariable, sans-serif',\r
        normal: '0.875rem InterVariable, sans-serif',\r
        badge: '500 0.75rem InterVariable, sans-serif',\r
        link: '600 0.875rem InterVariable, sans-serif'\r
      }\r
    });\r
\r
    myDiagram.themeManager.set('dark', {\r
      colors: {\r
        background: '#111827',\r
        text: '#fff',\r
        subtext: '#d1d5db',\r
        badge: '#22c55e19',\r
        badgeBorder: '#22c55e21',\r
        badgeText: '#4ade80',\r
        shadow: '#111827',\r
        dragOver: '#082f49',\r
        link: '#6b7280',\r
        div: '#1f2937'\r
      }\r
    });\r
\r
    // this is used to determine feedback during drags\r
    function mayWorkFor(node1, node2) {\r
      if (!(node1 instanceof go.Node)) return false; // must be a Node\r
      if (node1 === node2) return false; // cannot work for yourself\r
      if (node2.isInTreeOf(node1)) return false; // cannot work for someone who works for you\r
      return true;\r
    }\r
\r
    // This converter is used by the Picture.\r
    function findHeadShot(pic) {\r
      if (!pic) return '../samples/images/user.svg'; // There are only 16 images on the server\r
      return '../samples/images/hs' + pic;\r
    }\r
\r
    // Used to convert the node's tree level into a theme color\r
    function findLevelColor(node) {\r
      return node.findTreeLevel();\r
    }\r
\r
    // Gets the text for a tooltip based on the adorned object's name\r
    function toolTipTextConverter(obj) {\r
      if (!obj) return '';\r
      if (obj.name === 'EMAIL') return obj.part.data.email;\r
      if (obj.name === 'PHONE') return obj.part.data.phone;\r
      if (obj.name === 'BUTTON') return 'Add employee';\r
      if (obj.name === 'BUTTONX') return obj.part.isTreeExpanded ? 'Collapse tree' : 'Expand tree';\r
      return '';\r
    }\r
\r
    // Align the tooltip based on the adorned object's viewport bounds\r
    function toolTipAlignConverter(obj, tt) {\r
      const d = obj.diagram;\r
      const bot = obj.getDocumentPoint(go.Spot.Bottom);\r
      const viewPt = d.transformDocToView(bot).offset(0, 35);\r
      // if tooltip would be below viewport, show above instead\r
      const align =\r
        d.viewportBounds.height >= viewPt.y / d.scale\r
          ? new go.Spot(0.5, 1, 0, 6)\r
          : new go.Spot(0.5, 0, 0, -6);\r
\r
      tt.alignment = align;\r
      tt.alignmentFocus = align.y === 1 ? go.Spot.Top : go.Spot.Bottom;\r
    }\r
\r
    // a tooltip for the Email and Phone buttons\r
    const toolTip =\r
      new go.Adornment(go.Panel.Spot, {\r
          isShadowed: true,\r
          shadowOffset: new go.Point(0, 2)\r
        })\r
        .add(\r
          new go.Placeholder(),\r
          new go.Panel(go.Panel.Auto)\r
            .add(\r
              new go.Shape('RoundedRectangle', { strokeWidth: 0, shadowVisible: true })\r
                .theme('fill', 'background'),\r
              new go.TextBlock({ margin: 2 })\r
                .bindObject('text', 'adornedObject', toolTipTextConverter)\r
                .theme('stroke', 'text')\r
                .theme('font', 'normal')\r
            )\r
            // sets alignment and alignmentFocus based on adorned object's position in viewport\r
            .bindObject('', 'adornedObject', toolTipAlignConverter)\r
        )\r
        .theme('shadowColor', 'shadow');\r
\r
    function nodeEvents(node) {\r
      // show/hide buttons when mouse enters/leaves\r
      node.mouseEnter = (e, node) =>\r
        (node.findObject('BUTTON').opacity = node.findObject('BUTTONX').opacity = 1);\r
      node.mouseLeave = (e, node) => {\r
        if (node.isSelected) return; // if selected dont hide buttons\r
        node.findObject('BUTTON').opacity = node.findObject('BUTTONX').opacity = 0;\r
      };\r
      // handle dragging a Node onto a Node to (maybe) change the reporting relationship\r
      node.mouseDragEnter = (e, node, prev) => {\r
        const diagram = node.diagram;\r
        const selnode = diagram.selection.first();\r
        if (!mayWorkFor(selnode, node)) return;\r
        const shape = node.findObject('SHAPE');\r
        if (shape) {\r
          shape._prevFill = shape.fill; // remember the original brush\r
          shape.fill = diagram.themeManager.findValue('dragOver', 'colors'); // "#e0f2fe";\r
        }\r
      };\r
      node.mouseDragLeave = (e, node, next) => {\r
        const shape = node.findObject('SHAPE');\r
        if (shape && shape._prevFill) {\r
          shape.fill = shape._prevFill; // restore the original brush\r
        }\r
      };\r
      node.mouseDrop = (e, node) => {\r
        const diagram = node.diagram;\r
        const selnode = diagram.selection.first(); // assume just one Node in selection\r
        if (mayWorkFor(selnode, node)) {\r
          // find any existing link into the selected node\r
          const link = selnode.findTreeParentLink();\r
          if (link !== null) {\r
            // reconnect any existing link\r
            link.fromNode = node;\r
          } else {\r
            // else create a new link\r
            diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);\r
          }\r
        }\r
      };\r
    }\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node(go.Panel.Spot, {\r
          isShadowed: true,\r
          shadowOffset: new go.Point(0, 2),\r
          selectionObjectName: 'BODY'\r
        })\r
        .apply(nodeEvents)\r
        .add(\r
          new go.Panel(go.Panel.Auto, { name: 'BODY' })\r
            .add(\r
              // define the node's outer shape\r
              new go.Shape('RoundedRectangle', {\r
                  name: 'SHAPE',\r
                  strokeWidth: 0,\r
                  portId: '',\r
                  spot1: go.Spot.TopLeft,\r
                  spot2: go.Spot.BottomRight\r
                })\r
                .theme('fill', 'background'),\r
              new go.Panel(go.Panel.Table, { margin: 0.5, defaultRowSeparatorStrokeWidth: 0.5 })\r
                .theme('defaultRowSeparatorStroke', 'divider')\r
                .add(\r
                  new go.Panel(go.Panel.Table, { padding: new go.Margin(18, 18, 18, 24) })\r
                    .addColumnDefinition(0, { width: 240 })\r
                    .add(\r
                      new go.Panel(go.Panel.Table, {\r
                          column: 0,\r
                          alignment: go.Spot.Left,\r
                          stretch: go.Stretch.Vertical,\r
                          defaultAlignment: go.Spot.Left\r
                        })\r
                        .add(\r
                          new go.Panel(go.Panel.Horizontal, { row: 0 })\r
                            .add(\r
                              new go.TextBlock({ editable: true, minSize: new go.Size(10, 14) })\r
                                .bindTwoWay('text', 'name')\r
                                .theme('stroke', 'text')\r
                                .theme('font', 'name'),\r
                              new go.Panel(go.Panel.Auto, { margin: new go.Margin(0, 0, 0, 10) })\r
                                .add(\r
                                  new go.Shape('Capsule', { parameter1: 6, parameter2: 6 })\r
                                    .theme('fill', 'badge')\r
                                    .theme('stroke', 'badgeBorder'),\r
                                  new go.TextBlock({\r
                                      editable: true,\r
                                      minSize: new go.Size(10, 12),\r
                                      margin: new go.Margin(2, -1)\r
                                    })\r
                                    .bindTwoWay('text', 'dept')\r
                                    .theme('stroke', 'badgeText')\r
                                    .theme('font', 'badge')\r
                                )\r
                            ),\r
                          new go.TextBlock({ row: 1, editable: true, minSize: new go.Size(10, 14) })\r
                            .bindTwoWay('text', 'title')\r
                            .theme('stroke', 'subtext')\r
                            .theme('font', 'normal')\r
                        ),\r
                      new go.Panel(go.Panel.Spot, { isClipping: true, column: 1 })\r
                        .add(\r
                          new go.Shape('Circle', { desiredSize: new go.Size(50, 50), strokeWidth: 0 }),\r
                          new go.Picture({\r
                              name: 'PICTURE',\r
                              source: '../samples/images/user.svg',\r
                              desiredSize: new go.Size(50, 50)\r
                            })\r
                            .bind('source', 'pic', findHeadShot)\r
                        )\r
                    ),\r
                  new go.Panel(go.Panel.Table, {\r
                      row: 1,\r
                      stretch: go.Stretch.Horizontal,\r
                      defaultColumnSeparatorStrokeWidth: 0.5\r
                    })\r
                    .theme('defaultColumnSeparatorStroke', 'divider')\r
                    .add(makeBottomButton('EMAIL'), makeBottomButton('PHONE'))\r
                )\r
            ), // end Auto Panel\r
          new go.Shape('RoundedLeftRectangle', {\r
              alignment: go.Spot.Left,\r
              alignmentFocus: go.Spot.Left,\r
              stretch: go.Stretch.Vertical,\r
              width: 6,\r
              strokeWidth: 0\r
            })\r
            .themeObject('fill', '', 'levels', findLevelColor),\r
          go.GraphObject.build('Button', {\r
              name: 'BUTTON',\r
              alignment: go.Spot.Right,\r
              opacity: 0, // initially not visible\r
              click: (e, button) => addEmployee(button.part),\r
              toolTip: toolTip\r
            })\r
            // button is visible either when node is selected or on mouse-over\r
            .bindObject('opacity', 'isSelected', s => s ? 1 : 0)\r
            .add(\r
              new go.Shape('PlusLine', { width: 8, height: 8, stroke: '#0a0a0a', strokeWidth: 2 })\r
            ),\r
          go.GraphObject.build('TreeExpanderButton', {\r
              _treeExpandedFigure: 'LineUp',\r
              _treeCollapsedFigure: 'LineDown',\r
              name: 'BUTTONX',\r
              alignment: go.Spot.Bottom,\r
              opacity: 0, // initially not visible\r
              toolTip: toolTip\r
            })\r
            // button is visible either when node is selected or on mouse-over\r
            .bindObject('opacity', 'isSelected', s => s ? 1 : 0)\r
        )\r
        .theme('shadowColor', 'shadow')\r
        // for sorting, have the Node.text be the data.name\r
        .bind('text', 'name')\r
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected\r
        .bindObject('layerName', 'isSelected', sel => sel ? 'Foreground' : '')\r
        .bindTwoWay('isTreeExpanded');\r
\r
    function makeBottomButton(name) {\r
      const phonePath =\r
        'F M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z';\r
      const emailPath =\r
        'F M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3zM19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z';\r
      const isEmail = name === 'EMAIL';\r
      return new go.Panel(go.Panel.Table, {\r
          name,\r
          background: 'transparent',\r
          cursor: 'pointer',\r
          column: isEmail ? 0 : 1,\r
          width: 140,\r
          height: 40,\r
          toolTip: toolTip,\r
          mouseEnter: (e, pnl) => {\r
            const overbrush = e.diagram.themeManager.findValue('textHighlight', 'colors') || 'skyblue';\r
            pnl._oldBrush = pnl.elt(0).elt(0).fill;\r
            pnl.elt(0).elt(0).fill = overbrush;\r
            pnl.elt(0).elt(1).stroke = overbrush;\r
          },\r
          mouseLeave: (e, pnl) => {\r
            pnl.elt(0).elt(0).fill = pnl._oldBrush;\r
            pnl.elt(0).elt(1).stroke = pnl._oldBrush;\r
          },\r
          click: (e, obj) => {\r
            dialog.firstElementChild.firstElementChild.innerHTML =\r
              // the modal's span\r
              \`You clicked to \${isEmail ? 'send email to' : 'call'} \${obj.part.data.name} at \${obj.part.data[name.toLowerCase()]}\`;\r
            dialog.showModal();\r
          }\r
        })\r
        .add(\r
          new go.Panel(go.Panel.Horizontal)\r
            .add(\r
              new go.Shape({\r
                  geometryString: isEmail ? emailPath : phonePath,\r
                  strokeWidth: 0,\r
                  desiredSize: isEmail ? new go.Size(20, 16) : new go.Size(20, 20),\r
                  margin: new go.Margin(0, 12, 0, 0)\r
                })\r
                .theme('fill', 'text'),\r
              new go.TextBlock(isEmail ? 'Email' : 'Phone')\r
                .theme('stroke', 'text')\r
                .theme('font', 'link')\r
            )\r
        );\r
    }\r
\r
    function addEmployee(node) {\r
      if (!node) return;\r
      const thisemp = node.data;\r
      let newnode;\r
      myDiagram.model.commit(m => {\r
        const newemp = {\r
          name: '(New person)',\r
          title: '(Title)',\r
          dept: thisemp.dept,\r
          email: '',\r
          phone: '',\r
          parent: thisemp.key,\r
        };\r
        m.addNodeData(newemp);\r
        newnode = myDiagram.findNodeForData(newemp);\r
        // set location so new node doesn't animate in from top left\r
        if (newnode) {\r
          newnode.location = node.location;\r
          myDiagram.select(newnode);\r
        }\r
      }, 'add employee');\r
      myDiagram.commandHandler.scrollToPart(newnode);\r
    }\r
\r
    // the context menu allows users to make a position vacant,\r
    // remove a role and reassign the subtree, or remove a department\r
    myDiagram.nodeTemplate.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => addEmployee(button.part.adornedPart)\r
            })\r
            .add(new go.TextBlock('Add Employee')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => {\r
                const node = button.part.adornedPart;\r
                if (node !== null) {\r
                  const thisemp = node.data;\r
                  myDiagram.model.commit(m => {\r
                    // update the name, picture, email, and phone, but leave the title/department\r
                    m.set(thisemp, 'name', '(Vacant)');\r
                    m.set(thisemp, 'pic', '');\r
                    m.set(thisemp, 'email', 'none');\r
                    m.set(thisemp, 'phone', 'none');\r
                  }, 'vacate');\r
                }\r
              }\r
            })\r
            .add(new go.TextBlock('Vacate Position')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => {\r
                // reparent the subtree to this node's boss, then remove the node\r
                const node = button.part.adornedPart;\r
                if (node !== null) {\r
                  myDiagram.model.commit(m => {\r
                    const parent = node.findTreeParentNode();\r
                    const chl = new go.List(node.findTreeChildrenNodes()).iterator;\r
                    // iterate through the children and set their parent key to our selected node's parent key\r
                    while (chl.next()) {\r
                      const emp = chl.value;\r
                      m.setParentKeyForNodeData(emp.data, parent ? parent.key : undefined);\r
                    }\r
                    // and now remove the selected node itself\r
                    m.removeNodeData(node.data);\r
                  }, 'reparent remove');\r
                }\r
              }\r
            })\r
            .add(new go.TextBlock('Remove Role')),\r
          go.GraphObject.build('ContextMenuButton', {\r
              click: (e, button) => {\r
                // remove the whole subtree, including the node itself\r
                const node = button.part.adornedPart;\r
                if (node !== null) {\r
                  myDiagram.commit(d => d.removeParts(node.findTreeParts()), 'remove dept');\r
                }\r
              }\r
            })\r
            .add(new go.TextBlock('Remove Department'))\r
        );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Orthogonal,\r
          layerName: 'Background',\r
          corner: 5\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 2 }) // the link shape\r
            .theme('stroke', 'link')\r
        );\r
\r
    // read in the JSON-format data from the "mySavedModel" element\r
    load();\r
\r
    // support editing the properties of the selected person in HTML\r
    myInspector = new Inspector('myInspector', myDiagram, {\r
      properties: {\r
        key: { readOnly: true }\r
      }\r
    });\r
\r
    // Setup zoom to fit button\r
    document\r
      .getElementById('zoomToFit')\r
      .addEventListener('click', () => myDiagram.commandHandler.zoomToFit());\r
\r
    document.getElementById('centerRoot').addEventListener('click', () => {\r
      myDiagram.scale = 1;\r
      myDiagram.commandHandler.scrollToPart(myDiagram.findNodeForKey(1));\r
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
  function changeTheme() {\r
    const myDiagram = go.Diagram.fromDiv('myDiagramDiv');\r
    if (myDiagram) {\r
      myDiagram.themeManager.currentTheme = document.getElementById('theme').value;\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', () => {\r
    dialog = document.querySelector('dialog');\r
    dialog.addEventListener('click', e => {\r
      dialog.close();\r
    });\r
    // setTimeout only to ensure font is loaded before loading diagram\r
    // you may want to use an asset loading library for this\r
    // to keep this sample simple, it does not\r
    setTimeout(() => {\r
      init();\r
    }, 300);\r
  });`,cssCode:`:modal {\r
    padding: 2rem;\r
    border-radius: 0.25rem;\r
    border-width: 0;\r
    box-shadow:\r
      0 0 #0000,\r
      0 0 #0000,\r
      0 1px 3px 0 rgb(0 0 0 / 0.1);\r
  }\r
\r
  #hidden {\r
    font: 500 0px Inter;\r
    opacity: 0;\r
  }\r
\r
  .sample-layout {\r
    display: flex;\r
    gap: 1em;\r
    align-items: flex-start;\r
  }\r
\r
  #myDiagramDiv {\r
    flex: 1;\r
    min-width: 0;\r
    height: 625px;\r
    border: solid 1px black;\r
  }\r
\r
  .sample-controls {\r
    flex: none;\r
    width: 280px;\r
  }\r
\r
  #inspectorContainer {\r
    margin-top: 2em;\r
  }\r
\r
  /* On narrow screens, stack the controls below the diagram */\r
  @media (max-width: 1024px) {\r
    .sample-layout {\r
      flex-direction: column;\r
      align-items: stretch;\r
    }\r
\r
    #myDiagramDiv {\r
      flex: none;\r
      width: 100%;\r
    }\r
\r
    .sample-controls {\r
      width: 100%;\r
    }\r
\r
    #inspectorContainer {\r
      margin-top: 1em;\r
    }\r
  }`,externalStyles:[`https://fonts.googleapis.com/css?family=Inter:400,500,600&subset=latin,latin-ext`],externalScripts:[`../extensions/DataInspector.js`],descriptionHtml:`<p>\r
    This editable organizational chart sample color-codes the Nodes according to the tree level in\r
    the hierarchy.\r
  </p>\r
  <p>\r
    Select a node to edit its data values. This sample uses the\r
    <a href="../samples/DataInspector">Data Inspector</a> extension to display and modify Part\r
    data. Because this simple app is part of a static web site, there is no way to upload a\r
    photograph for a person.\r
  </p>\r
  <p>\r
    Double click in the diagram background to add a new boss. That uses the\r
    <a>ClickCreatingTool</a> with a custom <a>ClickCreatingTool.insertPart</a> to scroll to the new\r
    node and start editing the <a>TextBlock</a> for its name .\r
  </p>\r
  <p>\r
    Drag a node onto another in order to change relationships, if permitted. Right-click or tap-hold\r
    a Node to bring up a context menu that allows you to:\r
  </p>\r
  <ul>\r
    <li>Add Employee - add a new person as a direct report to this person</li>\r
    <li>Vacate Position - remove the information specific to the current person in that role</li>\r
    <li>\r
      Remove Role - removes the person entirely and changes the direct reports to report to the\r
      (former) boss\r
    </li>\r
    <li>Remove Department - removes the person and whole subtree</li>\r
  </ul>\r
  <p>\r
    To learn how to build an org chart from scratch with GoJS, see the\r
    <a href="../learn">Getting Started tutorial</a>.\r
  </p>\r
  <p>This sample is set to the dark theme by default.</p>\r
  <p>\r
    For this exact same sample but enhanced for screen readers, please examine the\r
    <a href="Accessibility">Accessibility</a> sample.\r
  </p>\r
  <p>\r
    If you want to have some "assistant" nodes on the side, above the regular reports, see the\r
    <a href="orgChartAssistants">Org Chart Assistants</a> sample, which is a more simply styled\r
    version of this sample that uses a custom <a>TreeLayout</a> to position "assistants" that way.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`,`contextmenus`,`buttons`,`inspector`,`theme`];var g=y();l(`1cy3cbw`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};