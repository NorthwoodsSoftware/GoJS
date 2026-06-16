import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Org Chart With Extra Relationships`,indexDescription:`Shows an org chart with extra links and expand/collapse functionality.`,screenshot:`orgchartextras`,priority:2,tags:[`tables`,`treelayout`,`tooltips`,`buttons`],description:`An org chart that also shows non-tree-structure relationships.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; height: 550px"></div>\r
  <div>\r
    <div id="propertiesPanel" style="display: none; background-color: aliceblue; border: solid 1px black">\r
      <b>Properties</b><br />\r
      Name: <input type="text" id="name" value="" onchange="updateData(this.value, 'name')" /><br />\r
      Title: <input type="text" id="title" value="" onchange="updateData(this.value, 'title')" /><br />\r
      Comments: <input type="text" id="comments" value="" onchange="updateData(this.value, 'comments')" /><br />\r
    </div>\r
  </div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":"1", "name":"Corrado 'Junior' Soprano", "title":"The Boss"},\r
{"key":"2", "name":"Tony Soprano", "title":"Underboss"},\r
{"key":"3", "name":"Herman 'Hesh' Rabkin", "title":"Advisor"},\r
{"key":"4", "name":"Paulie Walnuts", "title":"Capo"},\r
{"key":"5", "name":"Ralph Cifaretto", "title":"Capo MIA"},\r
{"key":"6", "name":"Silvio Dante", "title":"Consigliere"},\r
{"key":"7", "name":"Bobby Baccilien", "title":"Capo"},\r
{"key":"8", "name":"Sal Bonpensiero", "title":"MIA"},\r
{"key":"9", "name":"Christopher Moltisanti", "title":"Made Man"},\r
{"key":"10", "name":"Furio Giunta", "title":"Muscle"},\r
{"key":"11", "name":"Patsy Parisi", "title":"Accountant"}\r
 ],\r
  "linkDataArray": [\r
{"from":"1", "to":"2"},\r
{"from":"1", "to":"3"},\r
{"from":"2", "to":"4"},\r
{"from":"2", "to":"5"},\r
{"from":"2", "to":"6"},\r
{"from":"2", "to":"7"},\r
{"from":"4", "to":"8"},\r
{"from":"4", "to":"9"},\r
{"from":"4", "to":"10"},\r
{"from":"4", "to":"11"},\r
{"from":"11", "to":"6", "category":"Support", "text":"50% support"},\r
{"from":"9", "to":"7", "category":"Motion", "text":"will change here in 2 months"}\r
 ]\r
}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // make sure users can only create trees\r
      validCycle: go.CycleMode.DestinationTree,\r
      // users can select only one part at a time\r
      maxSelectionCount: 1,\r
      layout: new go.TreeLayout({\r
        treeStyle: go.TreeStyle.LastParents,\r
        arrangement: go.TreeArrangement.Horizontal,\r
        // properties for most of the tree:\r
        angle: 90,\r
        layerSpacing: 35,\r
        // properties for the "last parents":\r
        alternateAngle: 0,\r
        alternateLayerSpacing: 35,\r
        alternateAlignment: go.TreeAlignment.Start,\r
        alternateNodeIndent: 10,\r
        alternateNodeIndentPastParent: 1.0,\r
        alternateNodeSpacing: 10,\r
        alternateLayerSpacing: 30,\r
        alternateLayerSpacingParentOverlap: 1.0,\r
        alternatePortSpot: new go.Spot(0.01, 1, 10, 0),\r
        alternateChildPortSpot: go.Spot.Left\r
      }),\r
      // support editing the properties of the selected person in HTML\r
      ChangedSelection: onSelectionChanged,\r
      TextEdited: onTextEdited,\r
      // newly drawn links are of type "Support" -- not a regular boss-employee relationship\r
      'linkingTool.archetypeLinkData': { category: 'Support', text: '100%' },\r
      // enable undo & redo\r
      'undoManager.isEnabled': true\r
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
    const graygrad = new go.Brush('Linear', { 0: 'rgb(125, 125, 125)', 0.5: 'rgb(86, 86, 86)', 1: 'rgb(86, 86, 86)' });\r
\r
    // when a node is double-clicked, add a child to it\r
    function nodeDoubleClick(e, obj) {\r
      const clicked = obj.part;\r
      if (clicked !== null) {\r
        const thisemp = clicked.data;\r
        myDiagram.startTransaction('add employee');\r
        const nextkey = (myDiagram.model.nodeDataArray.length + 1).toString();\r
        const newemp = { key: nextkey, name: '(new person)', title: '' };\r
        myDiagram.model.addNodeData(newemp);\r
        myDiagram.model.addLinkData({ from: thisemp.key, to: nextkey });\r
        myDiagram.commitTransaction('add employee');\r
      }\r
    }\r
\r
    // this is used to determine feedback during drags\r
    function mayWorkFor(node1, node2) {\r
      if (!(node1 instanceof go.Node)) return false; // must be a Node\r
      if (node1 === node2) return false; // cannot work for yourself\r
      if (node2.isInTreeOf(node1)) return false; // cannot work for someone who works for you\r
      return true;\r
    }\r
\r
    // This function provides a common style for most of the TextBlocks.\r
    // Some of these values may be overridden in a particular TextBlock.\r
    function textStyle(tb) {\r
      tb.font = '9pt sans-serif';\r
      tb.stroke = 'white';\r
    }\r
\r
    function nodeEvents(node) {\r
      node.doubleClick = nodeDoubleClick;\r
      // handle dragging a Node onto a Node to (maybe) change the reporting relationship\r
      node.mouseDragEnter = (e, node, prev) => {\r
        const diagram = node.diagram;\r
        const selnode = diagram.selection.first();\r
        if (!mayWorkFor(selnode, node)) return;\r
        const shape = node.findObject('SHAPE');\r
        if (shape) shape.fill = 'darkred';\r
      };\r
      node.mouseDragLeave = (e, node, next) => {\r
        const shape = node.findObject('SHAPE');\r
        if (shape) shape.fill = graygrad;\r
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
      new go.Node('Auto')\r
        .apply(nodeEvents)\r
        // for sorting, have the Node.text be the data.name\r
        .bind('text', 'name')\r
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected\r
        .bindObject('layerName', 'isSelected', sel => sel ? 'Foreground' : '')\r
        .add(\r
          // define the node's outer shape\r
          new go.Shape('RoundedRectangle', {\r
            name: 'SHAPE',\r
            fill: graygrad,\r
            stroke: 'black',\r
            portId: '',\r
            fromLinkable: true,\r
            toLinkable: true,\r
            cursor: 'pointer'\r
          }),\r
          // define the panel where the text will appear\r
          new go.Panel('Table', {\r
              maxSize: new go.Size(150, 999),\r
              margin: new go.Margin(3, 3, 0, 3),\r
              defaultAlignment: go.Spot.Left\r
            })\r
            .addColumnDefinition(2, { width: 4 })\r
            .add(\r
              new go.TextBlock({ // the name\r
                  row: 0,\r
                  column: 0,\r
                  columnSpan: 5,\r
                  font: 'bold 9pt sans-serif',\r
                  editable: true,\r
                  isMultiline: false,\r
                  stroke: 'white',\r
                  minSize: new go.Size(10, 14),\r
                  name: 'name'\r
                })\r
                .bindTwoWay('text', 'name'),\r
              new go.TextBlock('Title: ')\r
                .apply(textStyle)\r
                .set({ row: 1, column: 0 }),\r
              new go.TextBlock()\r
                .apply(textStyle)\r
                .set({\r
                  row: 1,\r
                  column: 1,\r
                  columnSpan: 4,\r
                  editable: true,\r
                  isMultiline: false,\r
                  minSize: new go.Size(10, 14),\r
                  margin: new go.Margin(0, 0, 0, 3),\r
                  name: 'title'\r
                })\r
                .bindTwoWay('text', 'title'),\r
              new go.TextBlock('ID: ')\r
                .apply(textStyle)\r
                .set({ row: 2, column: 0 }), // the ID and the boss\r
              new go.TextBlock()\r
                .apply(textStyle)\r
                .set({ row: 2, column: 1 })\r
                .bind('text', 'key'),\r
              new go.TextBlock('Boss: ')\r
                .apply(textStyle)\r
                .set({ row: 2, column: 3 }),\r
              new go.TextBlock()\r
                .apply(textStyle)\r
                .set({ row: 2, column: 4 })\r
                .bind('text', 'parent'),\r
              new go.TextBlock({ // the comments\r
                  row: 3,\r
                  column: 0,\r
                  columnSpan: 5,\r
                  font: 'italic 9pt sans-serif',\r
                  wrap: go.Wrap.Fit,\r
                  editable: true, // by default newlines are allowed\r
                  stroke: 'white',\r
                  minSize: new go.Size(10, 14),\r
                  name: 'comments'\r
                })\r
                .bind('text', 'comments'),\r
              go.GraphObject.build('TreeExpanderButton', { row: 4, columnSpan: 99, alignment: go.Spot.Center })\r
            ) // end Table Panel\r
        ); // end Node\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
        .add(new go.Shape({ strokeWidth: 2 })); // the link shape\r
\r
    myDiagram.linkTemplateMap.add('Support',\r
      new go.Link({\r
          curve: go.Curve.Bezier,\r
          isLayoutPositioned: false,\r
          isTreeLink: false,\r
          curviness: -50,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .add(\r
          new go.Shape({ stroke: 'green', strokeWidth: 2 }),\r
          new go.Shape({ toArrow: 'OpenTriangle', stroke: 'green', strokeWidth: 2 }),\r
          new go.TextBlock({\r
              stroke: 'green',\r
              background: 'rgba(255,255,255,0.75)',\r
              maxSize: new go.Size(80, NaN),\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
      )\r
    );\r
\r
    myDiagram.linkTemplateMap.add('Motion',\r
      new go.Link({\r
          curve: go.Curve.Bezier,\r
          isLayoutPositioned: false,\r
          isTreeLink: false,\r
          curviness: -50,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .add(\r
          new go.Shape({ stroke: 'orange', strokeWidth: 2 }),\r
          new go.Shape({ toArrow: 'OpenTriangle', stroke: 'orange', strokeWidth: 2 }),\r
          new go.TextBlock({\r
              stroke: 'orange',\r
              background: 'rgba(255,255,255,0.75)',\r
              maxSize: new go.Size(80, NaN),\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
      )\r
    );\r
\r
    // read in the JSON-format data from the "mySavedModel" element\r
    load();\r
  }\r
\r
  // Allow the user to edit text when a single node is selected\r
  function onSelectionChanged(e) {\r
    const node = e.diagram.selection.first();\r
    if (node instanceof go.Node) {\r
      updateProperties(node.data);\r
    } else {\r
      updateProperties(null);\r
    }\r
  }\r
\r
  // Update the HTML elements for editing the properties of the currently selected node, if any\r
  function updateProperties(data) {\r
    if (data === null) {\r
      document.getElementById('propertiesPanel').style.display = 'none';\r
      document.getElementById('name').value = '';\r
      document.getElementById('title').value = '';\r
      document.getElementById('comments').value = '';\r
    } else {\r
      document.getElementById('propertiesPanel').style.display = 'block';\r
      document.getElementById('name').value = data.name || '';\r
      document.getElementById('title').value = data.title || '';\r
      document.getElementById('comments').value = data.comments || '';\r
    }\r
  }\r
\r
  // This is called when the user has finished inline text-editing\r
  function onTextEdited(e) {\r
    const tb = e.subject;\r
    if (tb === null || !tb.name) return;\r
    const node = tb.part;\r
    if (node instanceof go.Node) {\r
      updateData(tb.text, tb.name);\r
      updateProperties(node.data);\r
    }\r
  }\r
\r
  // Update the data fields when the text is changed\r
  function updateData(text, field) {\r
    const node = myDiagram.selection.first();\r
    // maxSelectionCount = 1, so there can only be one Part in this collection\r
    const data = node.data;\r
    if (node instanceof go.Node && data !== null) {\r
      const model = myDiagram.model;\r
      model.startTransaction('modified ' + field);\r
      if (field === 'name') {\r
        model.set(data, 'name', text);\r
      } else if (field === 'title') {\r
        model.set(data, 'title', text);\r
      } else if (field === 'comments') {\r
        model.set(data, 'comments', text);\r
      }\r
      model.commitTransaction('modified ' + field);\r
    }\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>Double click on a node in order to add a person. Drag a node onto another in order to change relationships.</p>\r
  <p>\r
    This is the <a href="orgChartEditor">Org Chart Editor</a> sample, but each node includes a TreeExpanderButton, and there are additional non-tree links\r
    connecting some of the nodes.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`,`tooltips`,`buttons`];var g=y();l(`xcqmjy`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};