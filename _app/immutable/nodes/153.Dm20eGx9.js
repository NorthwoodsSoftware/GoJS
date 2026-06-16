import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Grafcet Diagram Editor, Type of Sequential Function Chart for Automation Design`,titleShort:`Grafcet Diagram Editor`,indexDescription:`A Grafcet is a kind of sequential function chart used in automation design.`,screenshot:`grafcet`,priority:2,tags:[`links`,`tooltips`,`tools`,`buttons`,`geometries`,`process`],description:`A Grafcet diagram editor, showing buttons for creating new nodes and links related to the selected node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":1, "category":"Start", "location":"300 50", "step":"1", "text":"Action 1"},\r
{"key":2, "category":"Parallel", "location":"300 100"},\r
{"key":3, "location":"225 125", "step":"3", "text":"Action 2"},\r
{"key":4, "location":"325 150", "step":"4", "text":"Action 3"},\r
{"key":5, "location":"225 175", "step":"5", "text":"Action 4"},\r
{"key":6, "category":"Parallel", "location":"300 200"},\r
{"key":7, "location":"300 250", "step":"7", "text":"Action 6"},\r
{"key":11, "category":"Start", "location":"300 350", "step":"11", "text":"Action 1"},\r
{"key":12, "category":"Exclusive", "location":"300 400"},\r
{"key":13, "location":"225 450", "step":"13", "text":"Action 2"},\r
{"key":14, "location":"325 475", "step":"14", "text":"Action 3"},\r
{"key":15, "location":"225 500", "step":"15", "text":"Action 4"},\r
{"key":16, "category":"Exclusive", "location":"300 550"},\r
{"key":17, "location":"300 600", "step":"17", "text":"Action 6"},\r
{"key":21, "location":"500 50", "step":"21", "text":"Act 1"},\r
{"key":22, "location":"500 100", "step":"22", "text":"Act 2"},\r
{"key":23, "location":"500 150", "step":"23", "text":"Act 3"},\r
{"key":24, "location":"500 200", "step":"24", "text":"Act 4"},\r
{"key":31, "location":"500 400", "step":"31", "text":"Act 1"},\r
{"key":32, "location":"500 450", "step":"32", "text":"Act 2"},\r
{"key":33, "location":"500 500", "step":"33", "text":"Act 3"},\r
{"key":34, "location":"500 550", "step":"34", "text":"Act 4"}\r
 ],\r
  "linkDataArray": [\r
{"from":1, "to":2, "text":"condition 1"},\r
{"from":2, "to":3},\r
{"from":2, "to":4},\r
{"from":3, "to":5, "text":"condition 2"},\r
{"from":4, "to":6},\r
{"from":5, "to":6},\r
{"from":6, "to":7, "text":"condition 5"},\r
{"from":11, "to":12, "text":"condition 1"},\r
{"from":12, "to":13, "text":"condition 12"},\r
{"from":12, "to":14, "text":"condition 13"},\r
{"from":13, "to":15, "text":"condition 2"},\r
{"from":14, "to":16, "text":"condition 14"},\r
{"from":15, "to":16, "text":"condition 15"},\r
{"from":16, "to":17, "text":"condition 5"},\r
{"from":21, "to":22, "text":"c1"},\r
{"from":22, "to":23, "text":"c2"},\r
{"from":23, "to":24, "text":"c3"},\r
{"from":21, "to":24, "text":"c14", "category":"Skip"},\r
{"from":31, "to":32, "text":"c1"},\r
{"from":32, "to":33, "text":"c2"},\r
{"from":33, "to":34, "text":"c3"},\r
{"from":33, "to":32, "text":"c14", "category":"Repeat"}\r
 ]}\r
  </textarea>`,jsCode:`// This custom LinkingTool just turns on Diagram.allowLink when it starts,\r
  // and turns it off again when it stops so that users cannot draw new links modelessly.\r
  class CustomLinkingTool extends go.LinkingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // user-drawn linking is normally disabled,\r
    // but needs to be turned on when using this tool\r
    doStart() {\r
      this.diagram.allowLink = true;\r
      super.doStart();\r
    }\r
\r
    doStop() {\r
      super.doStop();\r
      this.diagram.allowLink = false;\r
    }\r
  }\r
  // end CustomLinkingTool\r
\r
  // This custom Link class is smart about computing the link point and direction\r
  // at "Parallel" and "Exclusive" nodes.\r
  class BarLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {\r
      const r = port.getDocumentBounds();\r
      const op = otherport.getDocumentBounds();\r
      const below = op.centerY > r.centerY;\r
      const y = below ? r.bottom : r.top;\r
      if (node.category === 'Parallel' || node.category === 'Exclusive') {\r
        if (op.right < r.left) return new go.Point(r.left, y);\r
        if (op.left > r.right) return new go.Point(r.right, y);\r
        return new go.Point((Math.max(r.left, op.left) + Math.min(r.right, op.right)) / 2, y);\r
      } else {\r
        return new go.Point(r.centerX, y);\r
      }\r
    }\r
\r
    getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport) {\r
      const p = port.getDocumentPoint(go.Spot.Center);\r
      const op = otherport.getDocumentPoint(go.Spot.Center);\r
      const below = op.y > p.y;\r
      return below ? 90 : 270;\r
    }\r
  }\r
  // end BarLink class\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowLink: false, // linking is only started via buttons, not modelessly;\r
      // see the "startLink..." functions and CustomLinkingTool defined above\r
      // double-click in the background creates a new "Start" node\r
      'clickCreatingTool.archetypeNodeData': { category: 'Start', step: 1, text: 'Action' },\r
      linkingTool: new CustomLinkingTool(), // defined above to automatically turn on allowLink\r
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
    // This implements a selection Adornment that is a horizontal bar of command buttons\r
    // that appear when the user selects a node.\r
    // Each button has a click function to execute the command, a tooltip for a textual description,\r
    // and a Binding of "visible" to hide the button if it cannot be executed for that particular node.\r
\r
    const commandsAdornment =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({\r
                fill: null,\r
                stroke: 'deepskyblue',\r
                strokeWidth: 2,\r
                shadowVisible: false\r
              }),\r
              new go.Placeholder()\r
            ),\r
          new go.Panel('Horizontal', { defaultStretch: go.Stretch.Vertical })\r
            .add(\r
              go.GraphObject.build('Button', {\r
                  click: addExclusive,\r
                  toolTip: makeTooltip('Add Exclusive')\r
                })\r
                .bindObject('visible', '', canAddSplit)\r
                .add(\r
                  new go.Shape({\r
                    geometryString: 'M0 0 L10 0',\r
                    fill: null,\r
                    stroke: 'red',\r
                    margin: 3\r
                  })\r
                ),\r
              go.GraphObject.build('Button', {\r
                  click: addParallel,\r
                  toolTip: makeTooltip('Add Parallel')\r
                })\r
                .bindObject('visible', '', canAddSplit)\r
                .add(\r
                  new go.Shape({\r
                    geometryString: 'M0 0 L10 0 M0 3 10 3',\r
                    fill: null,\r
                    stroke: 'red',\r
                    margin: 3\r
                  })\r
                ),\r
              go.GraphObject.build('Button', {\r
                  click: addStep,\r
                  toolTip: makeTooltip('Add Step')\r
                })\r
                .bindObject('visible', '', canAddStep)\r
                .add(\r
                  new go.Shape({\r
                    geometryString: 'M0 0 L10 0 10 6 0 6z',\r
                    fill: 'lightyellow',\r
                    margin: 3\r
                  })\r
                ),\r
              go.GraphObject.build('Button', {\r
                  click: startLinkDown,\r
                  toolTip: makeTooltip('Draw Link Down')\r
                })\r
                .bindObject('visible', '', canStartLink)\r
                .add(\r
                  new go.Shape({\r
                    geometryString: 'M0 0 M5 0 L5 10 M3 8 5 10 7 8 M10 0',\r
                    fill: null,\r
                    margin: 3\r
                  })\r
                ),\r
              go.GraphObject.build('Button', {\r
                  click: startLinkAround,\r
                  toolTip: makeTooltip('Draw Link Skip')\r
                })\r
                .bindObject('visible', '', canStartLink)\r
                .add(\r
                  new go.Shape({\r
                    geometryString: 'M0 0 M3 0 L3 2 7 2 7 6 3 6 3 10 M1 8 3 10 5 8 M10 0',\r
                    fill: null,\r
                    margin: 3\r
                  })\r
                ),\r
              go.GraphObject.build('Button', {\r
                  click: startLinkUp,\r
                  toolTip: makeTooltip('Draw Link Repeat')\r
                })\r
                .bindObject('visible', '', canStartLink)\r
                .add(\r
                  new go.Shape({\r
                    geometryString: 'M0 0 M3 2 L3 0 7 0 7 10 3 10 3 8 M5 6 7 4 9 6 M10 0',\r
                    fill: null,\r
                    margin: 3\r
                  })\r
                )\r
            )\r
        );\r
\r
    function makeTooltip(str) {\r
      // a helper function for defining tooltips for buttons\r
      return go.GraphObject.build('ToolTip')\r
        .add(new go.TextBlock(str));\r
    }\r
\r
    // Commands for adding new Nodes\r
\r
    function addStep(e, obj) {\r
      const node = obj.part.adornedPart;\r
      const model = myDiagram.model;\r
      model.startTransaction('add Step');\r
      const loc = node.location.copy();\r
      loc.y += 50;\r
      const nodedata = { location: go.Point.stringify(loc) };\r
      model.addNodeData(nodedata);\r
      const nodekey = model.getKeyForNodeData(nodedata);\r
      const linkdata = { from: model.getKeyForNodeData(node.data), to: nodekey, text: 'c' };\r
      model.addLinkData(linkdata);\r
      const newnode = myDiagram.findNodeForData(nodedata);\r
      myDiagram.select(newnode);\r
      model.commitTransaction('add Step');\r
    }\r
\r
    function canAddStep(adorn) {\r
      const node = adorn.adornedPart;\r
      if (node.category === '' || node.category === 'Start') {\r
        return node.findLinksOutOf().count === 0;\r
      } else if (node.category === 'Parallel' || node.category === 'Exclusive') {\r
        return true;\r
      }\r
      return false;\r
    }\r
\r
    function addParallel(e, obj) {\r
      addSplit(obj.part.adornedPart, 'Parallel');\r
    }\r
    function addExclusive(e, obj) {\r
      addSplit(obj.part.adornedPart, 'Exclusive');\r
    }\r
\r
    function addSplit(node, type) {\r
      const model = myDiagram.model;\r
      model.startTransaction('add ' + type);\r
      const loc = node.location.copy();\r
      loc.y += 50;\r
      const nodedata = { category: type, location: go.Point.stringify(loc) };\r
      model.addNodeData(nodedata);\r
      const nodekey = model.getKeyForNodeData(nodedata);\r
      const linkdata = { from: model.getKeyForNodeData(node.data), to: nodekey };\r
      model.addLinkData(linkdata);\r
      const newnode = myDiagram.findNodeForData(nodedata);\r
      myDiagram.select(newnode);\r
      model.commitTransaction('add ' + type);\r
    }\r
\r
    function canAddSplit(adorn) {\r
      const node = adorn.adornedPart;\r
      if (node.category === '' || node.category === 'Start') {\r
        return node.findLinksOutOf().count === 0;\r
      } else if (node.category === 'Parallel' || node.category === 'Exclusive') {\r
        return false;\r
      }\r
      return false;\r
    }\r
\r
    // Commands for starting drawing new Links\r
\r
    function startLinkDown(e, obj) {\r
      startLink(obj.part.adornedPart, '', 'c');\r
    }\r
    function startLinkAround(e, obj) {\r
      startLink(obj.part.adornedPart, 'Skip', 's');\r
    }\r
    function startLinkUp(e, obj) {\r
      startLink(obj.part.adornedPart, 'Repeat', 'r');\r
    }\r
\r
    function startLink(node, category, condition) {\r
      const tool = myDiagram.toolManager.linkingTool;\r
      // to control what kind of Link is created,\r
      // change the LinkingTool.archetypeLinkData's category\r
      myDiagram.model.setCategoryForLinkData(tool.archetypeLinkData, category);\r
      // also change the text indicating the condition, which the user can edit\r
      tool.archetypeLinkData.text = condition;\r
      tool.startObject = node.port;\r
      myDiagram.currentTool = tool;\r
      tool.doActivate();\r
    }\r
\r
    function canStartLink(adorn) {\r
      const node = adorn.adornedPart;\r
      return true; // this could be smarter\r
    }\r
\r
    // The various kinds of Nodes\r
\r
    function nodeStyle(node) {\r
      node.locationSpot = go.Spot.Center;\r
      node.selectionAdornmentTemplate = commandsAdornment; // shared selection Adornment\r
      node.bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify);\r
    }\r
\r
    myDiagram.nodeTemplateMap.add('Start',\r
      new go.Node('Horizontal', { locationObjectName: 'STEPPANEL', selectionObjectName: 'STEPPANEL' })\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Panel('Auto', {\r
              // this is the port element, not the whole Node\r
              name: 'STEPPANEL',\r
              portId: '',\r
              fromSpot: go.Spot.Bottom,\r
              fromLinkable: true\r
            })\r
            .add(\r
              new go.Shape({ fill: 'lightgreen' }),\r
              new go.Panel('Auto', { margin: 3 })\r
                .add(\r
                  new go.Shape({\r
                      fill: null,\r
                      minSize: new go.Size(20, 20)\r
                    }),\r
                  new go.TextBlock('Start', {\r
                      margin: 3,\r
                      editable: true\r
                    })\r
                    .bindTwoWay('text', 'step')\r
                )\r
            ),\r
          // a connector line between the texts\r
          new go.Shape('LineH', { width: 10, height: 1 }),\r
          // the boxed, editable text on the side\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: 'white' }),\r
              new go.TextBlock('Action', {\r
                  margin: 3,\r
                  editable: true\r
                })\r
                .bindTwoWay('text')\r
            )\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('',\r
      new go.Node('Horizontal', { locationObjectName: 'STEPPANEL', selectionObjectName: 'STEPPANEL' })\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Panel('Auto', {\r
              // this is the port element, not the whole Node\r
              name: 'STEPPANEL',\r
              portId: '',\r
              fromSpot: go.Spot.Bottom,\r
              fromLinkable: true,\r
              toSpot: go.Spot.Top,\r
              toLinkable: true\r
            })\r
            .add(\r
              new go.Shape({\r
                  fill: 'lightyellow',\r
                  minSize: new go.Size(20, 20)\r
                }),\r
              new go.TextBlock('Step', {\r
                  margin: 3,\r
                  editable: true\r
                })\r
                .bindTwoWay('text', 'step')\r
            ),\r
          new go.Shape('LineH', {\r
              width: 10,\r
              height: 1\r
            }),\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: 'white' }),\r
              new go.TextBlock('Action', {\r
                  margin: 3,\r
                  editable: true\r
                })\r
                .bindTwoWay('text')\r
            )\r
        ));\r
\r
    const resizeAdornment =\r
      new go.Adornment("Spot")\r
        .add(\r
          new go.Placeholder(),\r
          new go.Shape({ // left resize handle\r
              alignment: go.Spot.Left,\r
              cursor: 'col-resize',\r
              desiredSize: new go.Size(6, 6),\r
              fill: 'lightblue',\r
              stroke: 'dodgerblue'\r
            }),\r
          new go.Shape({ // right resize handle\r
              alignment: go.Spot.Right,\r
              cursor: 'col-resize',\r
              desiredSize: new go.Size(6, 6),\r
              fill: 'lightblue',\r
              stroke: 'dodgerblue'\r
            })\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Parallel',\r
      new go.Node({\r
          // special resizing: just at the ends\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          resizeAdornmentTemplate: resizeAdornment,\r
          fromLinkable: true,\r
          toLinkable: true\r
        })\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape({\r
              // horizontal pair of lines stretched to an initial width of 200\r
              name: 'SHAPE',\r
              geometryString: 'M0 0 L100 0 M0 4 L100 4',\r
              fill: 'transparent',\r
              stroke: 'red',\r
              width: 200\r
            })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Exclusive',\r
      new go.Node({\r
          // special resizing: just at the ends\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          resizeAdornmentTemplate: resizeAdornment,\r
          fromLinkable: true,\r
          toLinkable: true\r
        })\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape({\r
              // horizontal line stretched to an initial width of 200\r
              name: 'SHAPE',\r
              geometryString: 'M0 0 L100 0',\r
              fill: 'transparent',\r
              stroke: 'red',\r
              width: 200\r
            })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        ));\r
\r
    // the various kinds of Links\r
\r
    myDiagram.linkTemplateMap.add('',\r
      new BarLink({ routing: go.Routing.Orthogonal }) // subclass defined above\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape('LineH', { // only visible when there is text\r
              width: 20,\r
              height: 1,\r
              visible: false\r
            })\r
            .bind('visible', 'text', t => t !== ''),\r
          new go.TextBlock({  // only visible when there is text\r
              alignmentFocus: new go.Spot(0, 0.5, -12, 0),\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
            .bind('visible', 'text', t => t !== '')\r
        ));\r
\r
    myDiagram.linkTemplateMap.add('Skip',\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          fromSpot: go.Spot.Bottom,\r
          toSpot: go.Spot.Top,\r
          fromEndSegmentLength: 4,\r
          toEndSegmentLength: 4\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape('LineH', { // only visible when there is text\r
              width: 20,\r
              height: 1,\r
              visible: false\r
            })\r
            .bind('visible', 'text', t => t !== ''),\r
          new go.TextBlock({ // only visible when there is text\r
              alignmentFocus: new go.Spot(1, 0.5, 12, 0),\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
            .bind('visible', 'text', t => t !== '')\r
        ));\r
\r
    myDiagram.linkTemplateMap.add('Repeat',\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          fromSpot: go.Spot.Bottom,\r
          toSpot: go.Spot.Top,\r
          fromEndSegmentLength: 4,\r
          toEndSegmentLength: 4\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({\r
              toArrow: 'OpenTriangle',\r
              segmentIndex: 3,\r
              segmentFraction: 0.75\r
            }),\r
          new go.Shape({\r
              toArrow: 'OpenTriangle',\r
              segmentIndex: 3,\r
              segmentFraction: 0.25\r
            }),\r
          new go.Shape('LineH', { // only visible when there is text\r
              width: 20,\r
              height: 1,\r
              visible: false\r
            })\r
            .bind('visible', 'text', t => t !== ''),\r
          new go.TextBlock({ // only visible when there is text\r
              alignmentFocus: new go.Spot(1, 0.5, 12, 0),\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
            .bind('visible', 'text', t => t !== '')\r
        ));\r
\r
    // start off with a simple diagram\r
    load();\r
  }\r
\r
  // save a model to and load a model from JSON text, displayed below the Diagram\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>A grafcet diagram is similar to a <a href="sequentialFunction">sequential function chart</a>.</p>\r
  <p>\r
    All the <a>TextBlock</a>s in this sample are editable on double click.\r
  </p>\r
  <p>\r
    Select a Node to show a list of Buttons that enable creating new Nodes or drawing new Links. These buttons are defined as an adornment that is used in a\r
    common <a>Part.selectionAdornmentTemplate</a>. This diagram uses many custom functions, including an overridden <a>LinkingTool</a> and a special Link class,\r
    <b>BarLink</b>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`tooltips`,`tools`,`buttons`,`geometries`,`process`];var g=y();l(`yi2kn5`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};