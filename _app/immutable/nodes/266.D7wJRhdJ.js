import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`System Dynamics Diagram Editor: Storage, Flows, Control Factors`,titleShort:`System Dynamics Diagram`,indexDescription:`A System Dynamics diagram shows the storages and flows of material in some system, and the factors that influence the rates of flow.`,screenshot:`systemdynamics`,priority:1,tags:[`process`,`tools`],description:`A simple implementation of a system dynamics editor.`},htmlContent:`<div style="display:flex">\r
    <div\r
      id="myDiagramDiv"\r
      style="width: 100%; height: 500px; border: solid 1px black; flex: 1 1 auto">\r
    </div>\r
    <div style="border: 1px solid blue; height: fit-content;">\r
      <h4 style="background-color: blue; color: white; margin-top: 0px; margin-bottom: 2px;">On Click...</h4>\r
      <table class="table" style="background-color: white">\r
        <tbody>\r
          <th>Do Default</th>\r
          <tr>\r
            <td>\r
              <button onclick="setMode('pointer','pointer');">Pointer</button>\r
            </td>\r
          </tr>\r
\r
          <th>Create ______ Node</th>\r
          <tr>\r
            <td>\r
              <button onclick="setMode('node','stock');">\r
                Stock\r
              </button>\r
              <button onclick="setMode('node','cloud');">\r
                Cloud\r
              </button>\r
              <button\r
                onclick="setMode('node','variable');">\r
                Variable\r
              </button>\r
            </td>\r
          </tr>\r
\r
          <th>Create ______ Link</th>\r
          <tr>\r
            <td>\r
              <button onclick="setMode('link','flow');">\r
                Flow\r
              </button>\r
              <button\r
                onclick="setMode('link','influence');">\r
                Influence\r
              </button>\r
            </td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  </div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 400px">\r
{ "class": "go.GraphLinksModel",\r
  "linkLabelKeysProperty": "labelKeys",\r
  "nodeDataArray": [\r
{"key":"grass", "category":"stock", "label":"Grass", "loc":"30 220", "label_offset":"0.5 0.5 0 30"},\r
{"key":"cloud1", "category":"cloud", "loc":"200 220"},\r
{"key":"sheep", "category":"stock", "label":"Sheep", "loc":"30 20","label_offset":"0.5 0.5 0 -30"},\r
{"key":"cloud2", "category":"cloud", "loc":"200 20"},\r
{"key":"cloud3", "category":"cloud", "loc":"-150 220"},\r
{"key":"grass_loss", "category":"valve", "label":"grass_loss","label_offset":"0.5 0.5 0 20" },\r
{"key":"grazing", "category":"valve", "label":"grazing","label_offset":"0.5 0.5 45 0" },\r
{"key":"growth", "category":"valve", "label":"growth","label_offset":"0.5 0.5 0 20" },\r
{"key":"sheep_loss", "category":"valve",  "label":"sheep_loss","label_offset":"0.5 0.5 0 20" },\r
{"key":"k1", "category":"variable",  "label":"good weather", "loc": "-80 100"},\r
{"key":"k2", "category":"variable",  "label":"bad weather", "loc": "100 150"},\r
{"key":"k3", "category":"variable",  "label":"wolves", "loc": "150 -40"}\r
  ],\r
  "linkDataArray": [\r
{"from":"grass", "to":"cloud1", "category":"flow", "labelKeys":[ "grass_loss" ]},\r
{"from":"sheep", "to":"cloud2", "category":"flow", "labelKeys":[ "sheep_loss" ]},\r
{"from":"grass", "to":"sheep", "category":"flow", "labelKeys":[ "grazing" ]},\r
{"from":"cloud3", "to":"grass", "category":"flow", "labelKeys":[ "growth" ]},\r
{"from":"grass", "to":"grass_loss", "category":"influence"},\r
{"from":"sheep", "to":"sheep_loss", "category":"influence"},\r
{"from":"grass", "to":"growth", "category":"influence"},\r
{"from":"grass", "to":"grazing", "category":"influence"},\r
{"from":"sheep", "to":"grazing", "category":"influence"},\r
{"from":"k1", "to":"growth", "category":"influence"},\r
{"from":"k1", "to":"grazing", "category":"influence"},\r
{"from":"k2", "to":"grass_loss", "category":"influence"},\r
{"from":"k3", "to":"sheep_loss", "category":"influence"}\r
  ]\r
}\r
      </textarea\r
    >\r
  </div>`,jsCode:`// SD is a global variable, to avoid polluting global namespace and to make the global\r
  // nature of the individual variables obvious.\r
  var SD = {\r
    mode: 'pointer', // Set to default mode.  Alternatives are "node" and "link", for\r
    // adding a new node or a new link respectively.\r
    itemType: 'pointer', // Set when user clicks on a node or link button.\r
    nodeCounter: { stock: 0, cloud: 0, variable: 0, valve: 0 }\r
  };\r
  var myDiagram; // Declared as global\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true,\r
      allowLink: false, // linking is only started via buttons, not modelessly\r
      'animationManager.isEnabled': false,\r
\r
      'linkingTool.portGravity': 0, // no snapping while drawing new links\r
      'linkingTool.doActivate': function () {\r
        // an override must be function, not using an arrow\r
        // change the curve of the LinkingTool.temporaryLink\r
        this.temporaryLink.curve = SD.itemType === 'flow' ? go.Curve.None : go.Curve.Bezier;\r
        this.temporaryLink.path.stroke = SD.itemType === 'flow' ? 'blue' : 'green';\r
        this.temporaryLink.path.strokeWidth = SD.itemType === 'flow' ? 5 : 1;\r
        go.LinkingTool.prototype.doActivate.call(this);\r
      },\r
      // override the link creation process\r
      'linkingTool.insertLink': function (fromnode, fromport, tonode, toport) {\r
        // method override must be function, not =>\r
        // to control what kind of Link is created,\r
        // change the LinkingTool.archetypeLinkData's category\r
        myDiagram.model.setCategoryForLinkData(this.archetypeLinkData, SD.itemType);\r
        // Whenever a new Link is drawn by the LinkingTool, it also adds a node data object\r
        // that acts as the label node for the link, to allow links to be drawn to/from the link.\r
        this.archetypeLabelNodeData = SD.itemType === 'flow' ? { category: 'valve' } : null;\r
        // also change the text indicating the condition, which the user can edit\r
        this.archetypeLinkData.text = SD.itemType;\r
        return go.LinkingTool.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);\r
      },\r
\r
      'clickCreatingTool.archetypeNodeData': {}, // enable ClickCreatingTool\r
      'clickCreatingTool.isDoubleClick': false, // operates on a single click in background\r
      // but only in "node" creation mode\r
      'clickCreatingTool.canStart': function () {\r
        // method override must be function, not =>\r
        return SD.mode === 'node' && go.ClickCreatingTool.prototype.canStart.call(this);\r
      },\r
      // customize the data for the new node\r
      'clickCreatingTool.insertPart': function (loc) {\r
        // method override must be function, not =>\r
        SD.nodeCounter[SD.itemType] += 1;\r
        var newNodeId = SD.itemType + SD.nodeCounter[SD.itemType];\r
        this.archetypeNodeData = {\r
          key: newNodeId,\r
          category: SD.itemType,\r
          label: newNodeId\r
        };\r
        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);\r
      }\r
    });\r
\r
    // install the NodeLabelDraggingTool as a "mouse move" tool\r
    myDiagram.toolManager.mouseMoveTools.insertAt(0, new NodeLabelDraggingTool());\r
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
    // generate unique label for valve on newly-created flow link\r
    myDiagram.addDiagramListener('LinkDrawn', e => {\r
      var link = e.subject;\r
      if (link.category === 'flow') {\r
        myDiagram.startTransaction('updateNode');\r
        SD.nodeCounter.valve += 1;\r
        var newNodeId = 'flow' + SD.nodeCounter.valve;\r
        var labelNode = link.labelNodes.first();\r
        myDiagram.model.set(labelNode.data, 'label', newNodeId);\r
        myDiagram.commitTransaction('updateNode');\r
      }\r
    });\r
\r
    buildTemplates();\r
\r
    load();\r
    setMode('pointer', 'pointer');\r
  }\r
\r
  function buildTemplates() {\r
    // helper functions for the templates\r
    function nodeStyle(node) {\r
      node.type = go.Panel.Spot;\r
      node.layerName = 'Background';\r
      node.locationObjectName = 'SHAPE';\r
      node.selectionObjectName = 'SHAPE';\r
      node.locationSpot = go.Spot.Center;\r
      node.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);\r
    }\r
\r
    function shapeStyle(shp) {\r
      shp.name = 'SHAPE';\r
      shp.stroke = 'black';\r
      shp.fill = '#f0f0f0';\r
      shp.portId = ''; // So a link can be dragged from the Node = see /GraphObject.html#portId\r
      shp.fromLinkable = true;\r
      shp.toLinkable = true\r
    }\r
\r
    function textStyle(tb) {\r
      tb.font = 'bold 11pt helvetica, bold arial, sans-serif';\r
      tb.margin = 2;\r
      tb.editable = true;\r
      tb.bindTwoWay('text', 'label');\r
    }\r
\r
    function labelStyle(obj) {\r
      obj.attach({ _isNodeLabel: true }) // declare draggable by NodeLabelDraggingTool\r
      obj.alignment = new go.Spot(0.5, 0.5, 0, 30); // initial value\r
      obj.bindTwoWay('alignment', 'label_offset', go.Spot.parse, go.Spot.stringify);\r
    }\r
\r
    // Node templates\r
    myDiagram.nodeTemplateMap.add('stock',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape({ desiredSize: new go.Size(50, 30) })\r
            .apply(shapeStyle),\r
          new go.TextBlock()\r
            .apply(textStyle)\r
            .apply(labelStyle)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('cloud',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape('Cloud', { desiredSize: new go.Size(35, 35) })\r
            .apply(shapeStyle)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('valve',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .set({\r
          movable: false,\r
          layerName: 'Foreground',\r
          alignmentFocus: go.Spot.None\r
        })\r
        .add(\r
          new go.Shape('Ellipse', { desiredSize: new go.Size(20, 20) })\r
            .apply(shapeStyle),\r
          new go.TextBlock()\r
            .apply(textStyle)\r
            .apply(labelStyle)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('variable',\r
      new go.Node()\r
        .apply(nodeStyle)\r
        .set({ type: go.Panel.Auto })\r
        .add(\r
          new go.TextBlock({ isMultiline: false })\r
            .apply(textStyle),\r
          new go.Shape()\r
            .apply(shapeStyle)\r
            // the port is in front and transparent, even though it goes around the text;\r
            // in "link" mode will support drawing a new link\r
            .set({ isPanelMain: true, stroke: null, fill: 'transparent' })\r
        ));\r
\r
    // Link templates\r
    myDiagram.linkTemplateMap.add('flow',\r
      new go.Link({ toShortLength: 8 })\r
        .add(\r
          new go.Shape({ stroke: 'blue', strokeWidth: 5 }),\r
          new go.Shape({\r
            fill: 'blue',\r
            stroke: null,\r
            toArrow: 'Standard',\r
            scale: 2.5\r
          })\r
        )\r
    );\r
\r
    myDiagram.linkTemplateMap.add('influence',\r
      new go.Link({ curve: go.Curve.Bezier, toShortLength: 8 })\r
        .add(\r
          new go.Shape({ stroke: 'green', strokeWidth: 1.5 }),\r
          new go.Shape({\r
            fill: 'green',\r
            stroke: null,\r
            toArrow: 'Standard',\r
            scale: 1.5\r
          })\r
        )\r
    );\r
  }\r
\r
  function setMode(mode, itemType) {\r
    myDiagram.startTransaction();\r
    document.getElementById(SD.itemType + '_button').style.filter = 'brightness(100%)';\r
    document.getElementById(itemType + '_button').style.filter = 'brightness(180%)';\r
    SD.mode = mode;\r
    SD.itemType = itemType;\r
    if (mode === 'pointer') {\r
      myDiagram.allowLink = false;\r
      myDiagram.nodes.each(n => (n.port.cursor = ''));\r
    } else if (mode === 'node') {\r
      myDiagram.allowLink = false;\r
      myDiagram.nodes.each(n => (n.port.cursor = ''));\r
    } else if (mode === 'link') {\r
      myDiagram.allowLink = true;\r
      myDiagram.nodes.each(n => (n.port.cursor = 'pointer'));\r
    }\r
    myDiagram.commitTransaction('mode changed');\r
  }\r
\r
  // Show the diagram's model in JSON format that the user may edit\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/NodeLabelDraggingTool.js`],descriptionHtml:`<p>\r
    A <em>system dynamics diagram</em> shows the storages (stocks) and flows of material in some\r
    system, and the factors that influence the rates of flow. It is usually a cosmetic interface for\r
    building mathematical models -- you provide values and equations for the stocks and flows, and\r
    appropriate software can then simulate the system's behavior.\r
  </p>\r
  <p>\r
    The diagram has two types of link: flow links and influence links. In additon to the node\r
    attached to each flow, there are 3 types of node:\r
  </p>\r
  <ul>\r
    <li><b>stocks</b>, the amount of some substance</li>\r
    <li><b>clouds</b>, like stocks, but outside the system of interest</li>\r
    <li><b>variables</b>, either numeric constants or calculated from other elements</li>\r
  </ul>\r
  <p>\r
    The conventional user interface for building system dynamics diagrams is modal -- you select a\r
    tool in the toolbar, then either click in an empty part of the diagram to add a node or drag\r
    from one node to another to add a link. That is the approach used in this example, accomplished\r
    with the <a>clickCreatingTool</a> and <a>linkingTool</a>. Note that you need to click on the\r
    Pointer tool to revert to the normal mode.\r
  </p>\r
  <p>\r
    In addition to the above, the diagram also installs the\r
    <a href="../samples/NodeLabelDragging">NodeLabelDraggingTool</a> extension into\r
    <a>ToolManager.mouseMoveTools</a>.\r
  </p>\r
  <p>This sample is based on a prototype developed by Robert Muetzelfeldt.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`process`,`tools`];var g=y();l(`1hu4kxw`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};