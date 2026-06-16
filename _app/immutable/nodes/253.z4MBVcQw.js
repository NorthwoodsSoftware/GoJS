import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Reshaping Links Snaps to Grid`,indexDescription:`A custom Tool that allows reshaping links with grid snapping.`,screenshot:`snaplinkreshaping`,priority:2,tags:[`links`,`tools`,`palette`,`extensions`,`grid`],description:`When reshaping an orthogonal link, make sure the points are moved onto a grid.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myPaletteDiv" style="width: 105px; height: 620px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 620px; border: solid 1px black"></div>\r
  </div>\r
  <label><input type="checkbox" id="AvoidsNodesCheckBox" checked="checked" />SnapLinkReshapingTool.avoidsNodes</label>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "linkFromPortIdProperty": "fromPort",\r
  "linkToPortIdProperty": "toPort",\r
  "pointsDigits": 0,\r
  "modelData": {"position":"0 0"},\r
  "nodeDataArray": [\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-3, "loc":"184 176"},\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-2, "loc":"248 248"},\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-4, "loc":"424 192"},\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-5, "loc":"320 152"},\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-6, "loc":"424 320"},\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-7, "loc":"352 256"},\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-8, "loc":"176 296"},\r
{"text":"DB", "figure":"Database", "fill":"lightgray", "key":-9, "loc":"288 344"},\r
{"text":"Step", "key":-10, "loc":"96 240"},\r
{"text":"Step", "key":-11, "loc":"536 280"}\r
 ],\r
  "linkDataArray": [\r
{"from":-10, "to":-11, "fromPort":"R", "toPort":"L", "points":[121,240,131,240,132,240,132,240,216,240,216,176,264,176,264,104,392,104,392,240,480,240,480,280,501,280,511,280]}\r
  ]}\r
  </textarea>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must name or refer to the DIV HTML element\r
      // supply a simple narrow grid that manually reshaped link routes will follow\r
      grid:\r
        new go.Panel('Grid', { gridCellSize: new go.Size(8, 8) })\r
          .add(\r
            new go.Shape('LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),\r
            new go.Shape('LineV', { stroke: 'lightgray', strokeWidth: 0.5 })\r
          ),\r
      'draggingTool.isGridSnapEnabled': true,\r
      linkReshapingTool: new SnapLinkReshapingTool(),\r
      // when the user reshapes a Link, change its Link.routing from AvoidsNodes to Orthogonal,\r
      // so that combined with Link.adjusting == End the link will retain its reshaped mid points\r
      // even after nodes are moved\r
      LinkReshaped: e => {\r
        e.subject.adjusting = go.LinkAdjusting.End;\r
        e.subject.routing = go.Routing.Orthogonal;\r
      },\r
      'animationManager.isEnabled': false,\r
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
      // the port is basically just a small transparent square\r
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
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationSpot: go.Spot.Center,\r
          selectable: true,\r
          resizable: true,\r
          resizeObjectName: 'PANEL',\r
          // handle mouse enter/leave events to show/hide the ports\r
          mouseEnter: (e, node) => showSmallPorts(node, true),\r
          mouseLeave: (e, node) => showSmallPorts(node, false)\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
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
                  fill: 'white' // default color\r
                })\r
                .bind('figure')\r
                .bind('fill'),\r
              new go.TextBlock({\r
                  font: 'bold 11pt Helvetica, Arial, sans-serif',\r
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
    myDiagram.linkTemplate =\r
      new go.Link({\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          resegmentable: true,\r
          routing: go.Routing.AvoidsNodes, // but this is changed to go.Routing.Orthogonal when the Link is reshaped\r
          curve: go.Curve.JumpOver,\r
          corner: 5,\r
          toShortLength: 4\r
        })\r
        .bindTwoWay('points')\r
        // remember the Link.routing too\r
        .bindTwoWay('routing')\r
        .bindTwoWay('adjusting')\r
        .add(\r
          new go.Shape({ strokeWidth: 2 }), // the link path shape\r
          new go.Shape({ toArrow: 'Standard', stroke: null }) // the arrowhead\r
        );\r
\r
    load(); // load an initial diagram from some JSON text\r
\r
    var link = myDiagram.links.first();\r
    if (link) link.isSelected = true;\r
\r
    // initialize the Palette that is on the left side of the page\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      maxSelectionCount: 1,\r
      nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram\r
      model: new go.GraphLinksModel([\r
        // specify the contents of the Palette\r
        { text: 'Start', figure: 'Circle', fill: 'green' },\r
        { text: 'Step' },\r
        { text: 'DB', figure: 'Database', fill: 'lightgray' },\r
        { text: '???', figure: 'Diamond', fill: 'lightskyblue' },\r
        { text: 'End', figure: 'Circle', fill: 'red' },\r
        { text: 'Comment', figure: 'RoundedRectangle', fill: 'lightyellow' }\r
      ])\r
    });\r
\r
    document.getElementById('AvoidsNodesCheckBox').onclick = e => {\r
      myDiagram.toolManager.linkReshapingTool.avoidsNodes = e.target.checked;\r
    };\r
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
    loadDiagramProperties();\r
  }\r
\r
  function saveDiagramProperties() {\r
    myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);\r
  }\r
  // Called by "InitialLayoutCompleted" DiagramEvent listener, NOT directly by load()!\r
  function loadDiagramProperties(e) {\r
    // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects\r
    var pos = myDiagram.model.modelData.position;\r
    if (pos) myDiagram.initialPosition = go.Point.parse(pos);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/SnapLinkReshapingTool.js`],descriptionHtml:`<p>\r
    This sample is a simplified version of the <a href="../samples/draggableLink">Draggable Link</a> sample. Links are not draggable, there are no custom\r
    <a>Adornment</a>s, nodes are not rotatable, and links do not have text labels.\r
  </p>\r
  <p>\r
    Its purpose is to demonstrate the <a href="../extensions/SnapLinkReshapingTool.js">SnapLinkReshapingTool</a>, an extension of <a>LinkReshapingTool</a> that snaps each\r
    dragged reshape handle of selected Links to the nearest grid point. If the <a>SnapLinkReshapingTool.avoidsNodes</a> option is true, as it is by default,\r
    then the reshaping is limited to points where the adjacent segments would not be crossing over any avoidable nodes.\r
  </p>\r
  <p>\r
    Note how the "LinkReshaped" DiagramEvent listener changes the <a>Link.routing</a> of the reshaped Link, so that it is no longer AvoidsNodes routing but\r
    simple Orthogonal routing. This combined with <a>Link.adjusting</a> being End permits the middle points of the link route to be retained even after the user\r
    moves or resizes nodes. Furthermore there is a TwoWay <a>Binding</a> on <a>Link.routing</a>, so that the model remembers whether the link route had ever\r
    been reshaped manually.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`tools`,`palette`,`extensions`,`grid`];var g=y();l(`8n79re`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};