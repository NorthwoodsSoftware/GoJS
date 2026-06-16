import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Page Flow Diagram Editor`,indexDescription:`A diagram representation of webpage flow.`,screenshot:`pageflow`,priority:2,tags:[`itemarrays`,`layered-digraph`,`palette`,`buttons`,`process`],description:`A workflow diagram showing navigation between web pages, with an editable list of comments and to-dos.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between; background-color: #fcfcfc">\r
    <div id="myPaletteDiv" style="width: 100px; margin-right: 2px; background-color: whitesmoke; border: 1px solid black; position: relative">\r
      <canvas\r
        tabindex="0"\r
        style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; touch-action: none; width: 99px; height: 479px"\r
        width="148"\r
        height="718"\r
        >This text is displayed if your browser does not support the Canvas HTML element.</canvas\r
      >\r
      <div style="position: absolute; overflow: auto; width: 99px; height: 479px; z-index: 1">\r
        <div style="position: absolute; width: 1px; height: 1px"></div>\r
      </div>\r
    </div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 480px; border: 1px solid black; position: relative">\r
      <canvas\r
        tabindex="0"\r
        style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; touch-action: none; width: 953px; height: 479px"\r
        width="1429"\r
        height="718"\r
        >This text is displayed if your browser does not support the Canvas HTML element.</canvas\r
      >\r
      <div style="position: absolute; overflow: auto; width: 953px; height: 479px; z-index: 1">\r
        <div style="position: absolute; width: 1px; height: 1px"></div>\r
      </div>\r
    </div>\r
  </div>\r
  <button onclick="layout()">Diagram Layout</button>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
"copiesArrays": true,\r
"copiesArrayObjects": true,\r
"nodeDataArray": [\r
  { "key": -1, "category": "Source", "text": "Search" },\r
  { "key": -2, "category": "Source", "text": "Referral" },\r
  { "key": -3, "category": "Source", "text": "Advertising" },\r
\r
  { "key": 0, "text": "Homepage" },\r
  { "key": 1, "text": "Products" },\r
  { "key": 2, "text": "Buy" },\r
  { "key": 3, "text": "Samples" },\r
  { "key": 5, "text": "Documentation" },\r
  { "key": 6, "text": "Download" },\r
\r
  { "key": 100, "category": "DesiredEvent", "text": "Ordered!" },\r
  { "key": 101, "category": "DesiredEvent", "text": "Downloaded!" },\r
\r
  { "key": 200, "category": "UndesiredEvent",\r
    "reasonsList": [\r
      {"text":"Needs redesign?"},\r
      {"text":"Wrong Product?"} ]},\r
  { "key": 201, "category": "UndesiredEvent",\r
    "reasonsList": [\r
      {"text":"Need better samples?"},\r
      {"text":"Bad landing page for Advertising?"} ]},\r
  { "key": 202, "category": "UndesiredEvent",\r
    "reasonsList": [\r
      {"text":"Reconsider Pricing?"},\r
      {"text":"Confusing Cart?"} ]},\r
\r
  { "key": 300, "category": "Comment", "text": "Add notes with general comments for the next team meeting" }\r
\r
],\r
"linkDataArray": [\r
  { "from": -1, "to": 0 },\r
  { "from": -2, "to": 0 },\r
  { "from": -2, "to": 3 },\r
  { "from": -3, "to": 3 },\r
  { "from":  0, "to": 1 },\r
  { "from":  1, "to": 2 },\r
  { "from":  1, "to": 3 },\r
  { "from":  0, "to": 5 },\r
  { "from":  5, "to": 3 },\r
  { "from":  3, "to": 2 },\r
\r
\r
  { "from":  3, "to": 6 },\r
\r
  { "from":  2, "to": 100 },\r
  { "from":  6, "to": 101 },\r
\r
  { "from":  0, "to": 200 },\r
  { "from":  3, "to": 201 },\r
  { "from":  2, "to": 202 }\r
]\r
}\r
</textarea\r
  >`,jsCode:`var isDarkMode = false; // is accessed by html elements (button) so must be declared in script scope\r
  function init() {\r
\r
    // colors are almost entirely defined up here to allow for easier theming\r
    var yellow = '#FFB400';\r
\r
    var green = '#7FB800';\r
    var blue = '#00A6ED';\r
    var red = '#D73909';\r
    var white = '#DCE9F9';\r
\r
    var blueShadow = '#407090';\r
    var greenShadow = '#406050';\r
    var yellowShadow = '#804040';\r
    var redShadow = '#705020';\r
    var whiteShadow = '#404050';\r
\r
    var selectColor = 'dodgerBlue';\r
    var undesiredEventTextColor = 'whitesmoke';\r
\r
    var lineColor = '#0D2C54';\r
    var commentLineColor = 'darkgreen';\r
\r
    var darkModeBackgroundColor = '#06162a';\r
    var lightModeBackgroundColor = '#FFFFFF';\r
\r
    var bigfont = 'bold 13pt Helvetica, Arial, sans-serif';\r
    var smallfont = 'bold 11pt Helvetica, Arial, sans-serif';\r
\r
    // Common text styling\r
    function textStyle(tb) {\r
      tb.margin = 10;\r
      tb.wrap = go.Wrap.Fit;\r
      tb.textAlign = 'center';\r
      tb.editable = true;\r
      tb.font = bigfont;\r
    }\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // have mouse wheel events zoom in and out instead of scroll up and down\r
      'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,\r
      initialAutoScale: go.AutoScale.Uniform,\r
      'linkingTool.direction': go.LinkingDirection.ForwardsOnly,\r
      layout: new go.LayeredDigraphLayout({\r
        isInitial: false,\r
        isOngoing: false,\r
        layerSpacing: 100\r
      }),\r
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
    var defaultAdornment =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: null, stroke: selectColor, strokeWidth: 3 }),\r
              new go.Placeholder()\r
            ),\r
          // the button to create a "next" node, at the top-right corner\r
          go.GraphObject.build('Button', {\r
              alignment: new go.Spot(1, 0, -5, 5),\r
              click: addNodeAndLink\r
            }) // this function is defined below\r
            .bindObject('visible', '', a => !a.diagram.isReadOnly)\r
            .add(\r
              new go.Shape('PlusLine', { desiredSize: new go.Size(6, 6) })\r
            )\r
        );\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          selectionAdornmentTemplate: defaultAdornment,\r
          isShadowed: true,\r
          shadowBlur: 2,\r
          shadowColor: yellowShadow,\r
          shadowOffset: new go.Point(4, 6)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Rectangle', {\r
            fill: yellow,\r
            stroke: 'rgba(0, 0, 0, 0)',\r
            portId: '',\r
            fromLinkable: true,\r
            toLinkable: true,\r
            cursor: 'pointer',\r
            toEndSegmentLength: 50,\r
            fromEndSegmentLength: 40\r
          }),\r
          new go.TextBlock('Page', {\r
              margin: 10,\r
              font: bigfont,\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Source',\r
      new go.Node('Auto', {\r
          isShadowed: true,\r
          shadowBlur: 2,\r
          shadowColor: blueShadow,\r
          shadowOffset: new go.Point(4, 6)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              name: 'SHAPE',\r
              fill: blue,\r
              stroke: 'rgba(0, 0, 0, 0)',\r
              portId: '',\r
              fromLinkable: true,\r
              cursor: 'pointer',\r
              fromEndSegmentLength: 40\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock('Source')\r
            .apply(textStyle)\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('DesiredEvent',\r
      new go.Node('Auto', {\r
          isShadowed: true,\r
          shadowBlur: 2,\r
          shadowColor: greenShadow,\r
          shadowOffset: new go.Point(4, 6)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              fill: green,\r
              stroke: null,\r
              portId: '',\r
              toLinkable: true,\r
              toEndSegmentLength: 50\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock('Success!')\r
            .apply(textStyle)\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    // Undesired events have special adornments that allows adding and removing additional "reasons"\r
    var UndesiredEventAdornmentModify =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: null, stroke: selectColor, strokeWidth: 4 }),\r
              new go.Placeholder()\r
            ),\r
          // the button to create a new reason, at the bottom-left corner\r
          go.GraphObject.build('Button', {\r
              alignment: new go.Spot(1, 1, -5, -5),\r
              click: addReason\r
            }) // this function is defined below\r
            .bindObject('visible', '', a => !a.diagram.isReadOnly)\r
            .add(\r
              new go.Shape('TriangleDown', { desiredSize: new go.Size(10, 10) })\r
            ),\r
          //the button to remove the most recent reason, above the "create" button\r
          go.GraphObject.build('Button', {\r
              alignment: new go.Spot(1, 1, -5, -22),\r
              click: removeReason\r
            }) //this function is also defined below\r
            .bindObject('visible', '', a => !a.diagram.isReadOnly)\r
            .add(\r
              new go.Shape('TriangleUp', { desiredSize: new go.Size(10, 10) })\r
            )\r
        );\r
\r
    var reasonTemplate =\r
      new go.Panel('Horizontal')\r
        .add(\r
          new go.TextBlock('•', {\r
            margin: 4,\r
            stroke: undesiredEventTextColor,\r
            font: smallfont\r
          }),\r
          new go.TextBlock('Reason', {\r
              margin: 4,\r
              maxSize: new go.Size(200, NaN),\r
              wrap: go.Wrap.Fit,\r
              stroke: undesiredEventTextColor,\r
              editable: true,\r
              font: smallfont\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('UndesiredEvent',\r
      new go.Node('Auto', {\r
          isShadowed: true,\r
          shadowBlur: 2,\r
          shadowColor: redShadow,\r
          shadowOffset: new go.Point(4, 6),\r
          selectionAdornmentTemplate: UndesiredEventAdornmentModify\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
            fill: red,\r
            stroke: null,\r
            portId: '',\r
            toLinkable: true,\r
            toEndSegmentLength: 50\r
          }),\r
          new go.Panel('Vertical', { defaultAlignment: go.Spot.Top })\r
            .add(\r
              new go.TextBlock('Drop')\r
                .apply(textStyle)\r
                .set({\r
                  stroke: undesiredEventTextColor,\r
                  minSize: new go.Size(80, NaN)\r
                })\r
                .bindTwoWay('text'),\r
              new go.Panel('Vertical', {\r
                  defaultAlignment: go.Spot.TopLeft,\r
                  itemTemplate: reasonTemplate\r
                })\r
                .bindTwoWay('itemArray', 'reasonsList')\r
            )\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Comment',\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Rectangle', {\r
            portId: '',\r
            fill: white,\r
            stroke: null,\r
            fromLinkable: true\r
          }),\r
          new go.TextBlock('A comment', {\r
              margin: 10,\r
              maxSize: new go.Size(200, NaN),\r
              wrap: go.Wrap.Fit,\r
              editable: true,\r
              font: smallfont\r
            })\r
            .bindTwoWay('text')\r
          // no ports, because no links are allowed to connect with a comment\r
        )\r
    );\r
\r
    // clicking the add button on an UndesiredEvent node inserts a new text object into the panel\r
    function addReason(e, obj) {\r
      var adorn = obj.part;\r
      if (adorn === null) return;\r
      e.handled = true;\r
      var arr = adorn.adornedPart.data.reasonsList;\r
      myDiagram.startTransaction('add reason');\r
      myDiagram.model.addArrayItem(arr, {});\r
      myDiagram.commitTransaction('add reason');\r
    }\r
\r
    // clicking the remove button will remove the most recent text object added to the panel\r
    function removeReason(e, obj) {\r
      var adorn = obj.part;\r
      if (adorn === null) return;\r
      e.handled = true;\r
      var arr = adorn.adornedPart.data.reasonsList;\r
      myDiagram.startTransaction('remove reason');\r
      myDiagram.model.removeArrayItem(arr, arr.length - 1);\r
      myDiagram.commitTransaction('remove reason');\r
    }\r
\r
    // clicking the button of a default node inserts a new node to the right of the selected node,\r
    // and adds a link to that new node\r
    function addNodeAndLink(e, obj) {\r
      var adorn = obj.part;\r
      if (adorn === null) return;\r
      e.handled = true;\r
      var diagram = adorn.diagram;\r
      diagram.startTransaction('Add State');\r
      // get the node data for which the user clicked the button\r
      var fromNode = adorn.adornedPart;\r
      var fromData = fromNode.data;\r
      // create a new "State" data object, positioned off to the right of the adorned Node\r
      var toData = { text: 'new' };\r
      var p = fromNode.location;\r
      toData.loc = p.x + 200 + ' ' + p.y; // the "loc" property is a string, not a Point object\r
      // add the new node data to the model\r
      var model = diagram.model;\r
      model.addNodeData(toData);\r
      // create a link data from the old node data to the new node data\r
      var linkdata = {};\r
      linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);\r
      linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);\r
      // and add the link data to the model\r
      model.addLinkData(linkdata);\r
      // select the new Node\r
      var newnode = diagram.findNodeForData(toData);\r
      diagram.select(newnode);\r
      diagram.commitTransaction('Add State');\r
    }\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({ // the whole link panel\r
          curve: go.Curve.Bezier,\r
          toShortLength: 5,\r
          fromSpot: go.Spot.Right,\r
          toSpot: go.Spot.Left\r
        })\r
        .add(\r
          new go.Shape({ // the link shape\r
            stroke: lineColor,\r
            strokeWidth: 2.5\r
          }),\r
          new go.Shape({ // the arrowhead\r
            toArrow: 'Kite',\r
            fill: lineColor,\r
            stroke: lineColor,\r
            scale: 1.5\r
          })\r
        );\r
\r
    // comments will have different links\r
    myDiagram.linkTemplateMap.add('Comment',\r
      new go.Link({\r
          fromSpot: go.Spot.Center,\r
          toSpot: go.Spot.Center\r
        })\r
        .add(\r
          new go.Shape({\r
            strokeWidth: 1.5,\r
            stroke: 'darkgreen'\r
          })\r
        )\r
    );\r
\r
    // when a new link is created, determine what template to use\r
    myDiagram.addDiagramListener('LinkDrawn', e => {\r
      var link = e.subject;\r
      if (link.fromNode.category === 'Comment') {\r
        link.category = 'Comment';\r
      }\r
    });\r
\r
    var palette = new go.Palette('myPaletteDiv', {\r
      // share the template map with the Palette\r
      nodeTemplateMap: myDiagram.nodeTemplateMap,\r
      autoScale: go.AutoScale.Uniform // everything always fits in viewport\r
    });\r
\r
    palette.model.nodeDataArray = [\r
      { category: 'Source' },\r
      {}, // default node\r
      { category: 'DesiredEvent' },\r
      { category: 'UndesiredEvent', reasonsList: [{}] },\r
      { category: 'Comment' }\r
    ];\r
\r
    // read in the JSON-format data from the "mySavedModel" element\r
    load();\r
    layout();\r
  }\r
\r
  function layout() {\r
    myDiagram.layoutDiagram(true);\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This workflow diagram uses the <a href="../api/symbols/LayeredDigraphLayout.html" target="api">LayeredDigraphLayout</a> to display some data about the flow\r
    of a fictional web site. You can add to the Diagram by dragging Nodes from the <a href="../api/symbols/Palette.html" target="api">Palette</a> and by buttons\r
    that appear when clicking on the Page (yellow) and Drop (red) Nodes.\r
  </p>\r
  <p>\r
    All nodes in this sample have editable text. To activate the <a href="../api/symbols/TextEditingTool.html" target="api">TextEditingTool</a>, click on a node\r
    to select it and click on its text once selected.\r
  </p>\r
  <p>\r
    Several Link relationships are defined. Hovering over the sides of many nodes changes the mouse cursor to a pointer. Clicking and dragging in these areas\r
    creates a new link with the <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a>. The node definitions contain several rules, for instance\r
    you cannot drag links to Source (blue) Nodes, only from them, and you cannot have multiple links between the same two nodes, among others.\r
  </p>\r
  <p>\r
    Most of the source code for this sample is in defining pleasing Node templates. Much of the functionality seen is done with built-in GoJS components. This\r
    is by no means an exhaustive sample, so be sure to check out the other samples to the left, or take a look at the\r
    <a href="../intro/">learn pages</a> for a more structured tutorial on different GoJS concepts.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`itemarrays`,`layered-digraph`,`palette`,`buttons`,`process`];var g=y();l(`ivobuo`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};