import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Allow Users to Drag Links and Reconnect Them on Drop`,titleShort:`Draggable Link`,indexDescription:`Showcases draggable disconnectable links that can be connected by dropping one or both ends at a valid port.`,screenshot:`draggablelink`,priority:2,tags:[`collections`,`links`,`tools`,`palette`,`geometries`,`grid`],description:`Drag a link to reconnect it. Nodes have custom Adornments for selection, resizing, and rotating.  The Palette includes links.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myPaletteDiv" style="width: 105px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 620px; border: solid 1px black"></div>\r
  </div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "linkFromPortIdProperty": "fromPort",\r
  "linkToPortIdProperty": "toPort",\r
  "pointsDigits": 1,\r
  "nodeDataArray": [\r
 ],\r
  "linkDataArray": [\r
 ]}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must name or refer to the DIV HTML element\r
      grid:\r
        new go.Panel('Grid')\r
          .add(\r
            new go.Shape('LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),\r
            new go.Shape('LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }),\r
            new go.Shape('LineV', { stroke: 'lightgray', strokeWidth: 0.5 }),\r
            new go.Shape('LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 })\r
          ),\r
      'draggingTool.dragsLink': true,\r
      'draggingTool.isGridSnapEnabled': true,\r
      'linkingTool.isUnconnectedLinkValid': true,\r
      'linkingTool.portGravity': 20,\r
      'relinkingTool.isUnconnectedLinkValid': true,\r
      'relinkingTool.portGravity': 20,\r
      'relinkingTool.fromHandleArchetype':\r
        new go.Shape('Diamond', {\r
          segmentIndex: 0,\r
          cursor: 'pointer',\r
          desiredSize: new go.Size(8, 8),\r
          fill: 'tomato',\r
          stroke: 'darkred'\r
        }),\r
      'relinkingTool.toHandleArchetype':\r
        new go.Shape('Diamond', {\r
          segmentIndex: -1,\r
          cursor: 'pointer',\r
          desiredSize: new go.Size(8, 8),\r
          fill: 'darkred',\r
          stroke: 'tomato'\r
        }),\r
      'linkReshapingTool.handleArchetype':\r
        new go.Shape('Diamond', {\r
          desiredSize: new go.Size(7, 7),\r
          fill: 'lightblue',\r
          stroke: 'deepskyblue'\r
        }),\r
      'rotatingTool.handleAngle': 270,\r
      'rotatingTool.handleDistance': 30,\r
      'rotatingTool.snapAngleMultiple': 15,\r
      'rotatingTool.snapAngleEpsilon': 15,\r
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
    // Define a function for creating a "port" that is normally transparent.\r
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect\r
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments\r
    // control whether the user can draw links from or to the port.\r
    function makePort(name, spot, output, input) {\r
      // the port is basically just a small transparent circle\r
      return new go.Shape('Circle', {\r
        fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below\r
        stroke: null,\r
        desiredSize: new go.Size(7, 7),\r
        alignment: spot, // align the port on the main Shape\r
        alignmentFocus: spot, // just inside the Shape\r
        portId: name, // declare this object to be a "port"\r
        fromSpot: spot,\r
        toSpot: spot, // declare where links may connect at this port\r
        fromLinkable: output,\r
        toLinkable: input, // declare whether the user may draw links to/from here\r
        cursor: 'pointer' // show a different cursor to indicate potential link point\r
      });\r
    }\r
\r
    var nodeSelectionAdornmentTemplate =\r
      new go.Adornment('Auto')\r
        .add(\r
          new go.Shape({ fill: null, stroke: 'deepskyblue', strokeWidth: 1.5, strokeDashArray: [4, 2] }),\r
          new go.Placeholder()\r
        );\r
\r
    var nodeResizeAdornmentTemplate =\r
      new go.Adornment('Spot', { locationSpot: go.Spot.Right })\r
        .add(\r
          new go.Placeholder(),\r
          new go.Shape({ alignment: go.Spot.TopLeft, cursor: 'nw-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ alignment: go.Spot.Top, cursor: 'n-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ alignment: go.Spot.TopRight, cursor: 'ne-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ alignment: go.Spot.Left, cursor: 'w-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ alignment: go.Spot.Right, cursor: 'e-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ alignment: go.Spot.BottomLeft, cursor: 'se-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ alignment: go.Spot.Bottom, cursor: 's-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ alignment: go.Spot.BottomRight, cursor: 'sw-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' })\r
        );\r
\r
    var nodeRotateAdornmentTemplate =\r
      new go.Adornment({\r
          locationSpot: go.Spot.Center,\r
          locationObjectName: 'ELLIPSE'\r
        })\r
        .add(\r
          new go.Shape('Ellipse', { name: 'ELLIPSE', cursor: 'pointer', desiredSize: new go.Size(7, 7), fill: 'lightblue', stroke: 'deepskyblue' }),\r
          new go.Shape({ geometryString: 'M3.5 7 L3.5 30', isGeometryPositioned: true, stroke: 'deepskyblue', strokeWidth: 1.5, strokeDashArray: [4, 2] })\r
        );\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationSpot: go.Spot.Center,\r
          selectable: true,\r
          selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,\r
          resizable: true,\r
          resizeObjectName: 'PANEL',\r
          resizeAdornmentTemplate: nodeResizeAdornmentTemplate,\r
          rotatable: true,\r
          rotateAdornmentTemplate: nodeRotateAdornmentTemplate,\r
          // handle mouse enter/leave events to show/hide the ports\r
          mouseEnter: (e, node) => showSmallPorts(node, true),\r
          mouseLeave: (e, node) => showSmallPorts(node, false)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bindTwoWay('angle')\r
        .add(\r
          // the main object is a Panel that surrounds a TextBlock with a Shape\r
          new go.Panel('Auto', { name: 'PANEL' })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
            .add(\r
              new go.Shape('Rectangle', { // default figure\r
                  portId: '', // the default port: if no spot on link data, use closest side\r
                  fromLinkable: true,\r
                  toLinkable: true,\r
                  cursor: 'pointer',\r
                  fill: 'white', // default color\r
                  strokeWidth: 2\r
                })\r
                .bind('figure')\r
                .bind('fill'),\r
              new go.TextBlock({\r
                  font: 'bold 10pt Helvetica, Arial, sans-serif',\r
                  margin: 8,\r
                  maxSize: new go.Size(160, NaN),\r
                  wrap: go.Wrap.Fit,\r
                  editable: true\r
                })\r
                .bindTwoWay('text')\r
            ),\r
          // four small named ports, one on each side:\r
          makePort('T', go.Spot.Top, false, true),\r
          makePort('L', go.Spot.Left, true, true),\r
          makePort('R', go.Spot.Right, true, true),\r
          makePort('B', go.Spot.Bottom, true, false)\r
        );\r
\r
    function showSmallPorts(node, show) {\r
      node.ports.each(port => {\r
        if (port.portId !== '') {\r
          // don't change the default port, which is the big shape\r
          port.fill = show ? 'rgba(0,0,0,.3)' : null;\r
        }\r
      });\r
    }\r
\r
    var linkSelectionAdornmentTemplate =\r
      new go.Adornment('Link')\r
        .add(\r
          new go.Shape({\r
            isPanelMain: true, // isPanelMain declares that this Shape shares the Link.geometry\r
            fill: null,\r
            stroke: 'deepskyblue',\r
            strokeWidth: 0 // use selection object's strokeWidth\r
          })\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ // the whole link panel\r
          selectable: true,\r
          selectionAdornmentTemplate: linkSelectionAdornmentTemplate,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          routing: go.Routing.AvoidsNodes,\r
          curve: go.Curve.JumpOver,\r
          corner: 5,\r
          toShortLength: 4\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          new go.Shape({ // the link path shape\r
            isPanelMain: true,\r
            strokeWidth: 2\r
          }),\r
          new go.Shape({ // the arrowhead\r
            toArrow: 'Standard',\r
            stroke: null\r
          }),\r
          new go.Panel('Auto')\r
            .bindObject('visible', 'isSelected')\r
            .add(\r
              new go.Shape('RoundedRectangle', { // the link shape\r
                fill: '#F8F8F8',\r
                stroke: null\r
              }),\r
              new go.TextBlock({\r
                  textAlign: 'center',\r
                  font: '10pt helvetica, arial, sans-serif',\r
                  stroke: '#919191',\r
                  margin: 2,\r
                  minSize: new go.Size(10, NaN),\r
                  editable: true\r
                })\r
                .bindTwoWay('text')\r
            )\r
        );\r
\r
    load(); // load an initial diagram from some JSON text\r
\r
    // initialize the Palette that is on the left side of the page\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      maxSelectionCount: 1,\r
      nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram\r
      // simplify the link template, just in this Palette\r
      linkTemplate:\r
        new go.Link({\r
            // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,\r
            // to line up the Link in the same manner we have to pretend the Link has the same location spot\r
            locationSpot: go.Spot.Center,\r
            selectionAdornmentTemplate:\r
              new go.Adornment('Link', { locationSpot: go.Spot.Center })\r
                .add(\r
                  new go.Shape({\r
                    isPanelMain: true,\r
                    fill: null,\r
                    stroke: 'deepskyblue',\r
                    strokeWidth: 0\r
                  }),\r
                  new go.Shape({ // the arrowhead\r
                    toArrow: 'Standard',\r
                    stroke: null\r
                  })\r
                ),\r
          routing: go.Routing.AvoidsNodes,\r
          curve: go.Curve.JumpOver,\r
          corner: 5,\r
          toShortLength: 4\r
        })\r
        .bind('points')\r
        .add(\r
          new go.Shape({ // the link path shape\r
            isPanelMain: true,\r
            strokeWidth: 2\r
          }),\r
          new go.Shape({ // the arrowhead\r
            toArrow: 'Standard',\r
            stroke: null\r
          })\r
        ),\r
      model: new go.GraphLinksModel(\r
        [\r
          // specify the contents of the Palette\r
          { text: 'Start', figure: 'Ellipse', size: '75 75', fill: '#00AD5F' },\r
          { text: 'Step' },\r
          { text: 'DB', figure: 'Database', fill: 'lightgray' },\r
          { text: '???', figure: 'Diamond', fill: 'lightskyblue' },\r
          { text: 'End', figure: 'Ellipse', size: '75 75', fill: '#CE0620' },\r
          { text: 'Comment', figure: 'RoundedRectangle', fill: 'lightyellow' }\r
        ],\r
        [\r
          // the Palette also has a disconnected Link, which the user can drag-and-drop\r
          { points: new go.List(/*go.Point*/).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]) }\r
        ]\r
      )\r
    });\r
  }\r
\r
  // Show the diagram's model in JSON format that the user may edit\r
  function save() {\r
    saveDiagramProperties(); // do this first, before writing to JSON\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
    loadDiagramProperties(); // do this after the Model.modelData has been brought into memory\r
  }\r
\r
  function saveDiagramProperties() {\r
    myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);\r
  }\r
  function loadDiagramProperties(e) {\r
    // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects\r
    var pos = myDiagram.model.modelData.position;\r
    if (pos) myDiagram.initialPosition = go.Point.parse(pos);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>\r
    This sample demonstrates the ability for the user to drag around a Link as if it were a Node. When either end of the link passes over a valid port, the port\r
    is highlighted.\r
  </p>\r
  <p>\r
    The link-dragging functionality is enabled by setting some or all of the following properties:\r
    <a>DraggingTool.dragsLink</a>, <a>LinkingTool.isUnconnectedLinkValid</a>, and <a>RelinkingTool.isUnconnectedLinkValid</a>.\r
  </p>\r
  <p>\r
    Note that a Link is present in the <a>Palette</a> so that it too can be dragged out and onto the main Diagram. Because links are not automatically routed\r
    when either end is not connected with a Node, the route is provided explicitly when that Palette item is defined.\r
  </p>\r
  <p>\r
    This also demonstrates several custom Adornments:\r
    <a>Part.selectionAdornmentTemplate</a>, <a>Part.resizeAdornmentTemplate</a>, and <a>Part.rotateAdornmentTemplate</a>.\r
  </p>\r
  <p>\r
    Finally this sample demonstrates saving and restoring the <a>Diagram.position</a> as a property on the <a>Model.modelData</a> object that is automatically\r
    saved and restored when calling <a>Model.toJson</a> and <a>Model.fromJson</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`links`,`tools`,`palette`,`geometries`,`grid`];var g=y();l(`833ues`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};