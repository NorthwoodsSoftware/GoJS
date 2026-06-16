import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Shifting Port by Dragging Individual Port within its Node`,titleShort:`Shifting Ports in Nodes`,indexDescription:`A custom Tool that lets the user drag a port in a Spot Panel of a Node.`,screenshot:`portshifting`,priority:2,tags:[`ports`,`tooltips`,`tools`,`palette`,`extensions`,`grid`],description:`Allow the user to shift ports that are in a node.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="palette" style="width: 100px; height: 500px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 500px; border: solid 1px black"></div>\r
  </div>\r
  \r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 200px">\r
{ "class": "go.GraphLinksModel",\r
  "linkFromPortIdProperty": "fromPort",\r
  "linkToPortIdProperty": "toPort",\r
  "nodeDataArray": [\r
{"category":"input", "key":"input1", "loc":"-150 -80" },\r
{"category":"or", "key":"or1", "loc":"-70 0" },\r
{"category":"not", "key":"not1", "loc":"10 0" },\r
{"category":"xor", "key":"xor1", "loc":"100 0" },\r
{"category":"or", "key":"or2", "loc":"200 0" },\r
{"category":"output", "key":"output1", "loc":"200 -100" }\r
 ],\r
  "linkDataArray": [\r
{"from":"input1", "fromPort":"out", "to":"or1", "toPort":"in1"},\r
{"from":"or1", "fromPort":"out", "to":"not1", "toPort":"in"},\r
{"from":"not1", "fromPort":"out", "to":"or1", "toPort":"in2"},\r
{"from":"not1", "fromPort":"out", "to":"xor1", "toPort":"in1"},\r
{"from":"xor1", "fromPort":"out", "to":"or2", "toPort":"in1"},\r
{"from":"or2", "fromPort":"out", "to":"xor1", "toPort":"in2"},\r
{"from":"xor1", "fromPort":"out", "to":"output1", "toPort":""}\r
 ]}\r
  </textarea>`,jsCode:`var red = 'orangered'; // 0 or false\r
  var green = 'forestgreen'; // 1 or true\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'draggingTool.isGridSnapEnabled': true, // dragged nodes will snap to a grid of 10x10 cells\r
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
    // install the PortShiftingTool as a "mouse move" tool\r
    myDiagram.toolManager.mouseMoveTools.insertAt(0, new PortShiftingTool());\r
\r
    var palette = new go.Palette('palette'); // create a new Palette in the HTML DIV element "palette"\r
\r
    // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          curve: go.Curve.JumpOver,\r
          corner: 3,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.\r
          shadowOffset: new go.Point(0, 0),\r
          shadowBlur: 5,\r
          shadowColor: 'blue'\r
        })\r
        .bindObject('isShadowed', 'isSelected')\r
        .add(\r
          new go.Shape({ name: 'SHAPE', strokeWidth: 2, stroke: red })\r
        );\r
\r
    // node template helpers\r
    var sharedToolTip =\r
      go.GraphObject.build('ToolTip', { 'Border.figure': 'RoundedRectangle' })\r
        .add(\r
          new go.TextBlock({ margin: 2 })\r
            .bind('text', '', d => d.category)\r
        );\r
\r
    // define some common property settings\r
    function nodeStyle(node) {\r
      node.selectionAdorned = false;\r
      node.shadowOffset = new go.Point(0, 0);\r
      node.shadowBlur = 15;\r
      node.shadowColor = 'blue';\r
      node.locationSpot = go.Spot.Center;\r
      node.locationObjectName = 'NODESHAPE';\r
      node.resizable = true;\r
      node.resizeObjectName = 'NODESHAPE';\r
      node.toolTip = sharedToolTip;\r
      node.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);\r
      node.bindObject('isShadowed', 'isSelected');\r
    }\r
\r
    function shapeStyle(shape) {\r
      shape.name = 'NODESHAPE';\r
      shape.fill = 'lightgray';\r
      shape.stroke = 'darkslategray';\r
      shape.desiredSize = new go.Size(40, 40);\r
      shape.strokeWidth = 2;\r
    }\r
\r
    function portStyle(port, id, input, align) {\r
      port.bindTwoWay('alignment', id + 'Spot', go.Spot.parse, go.Spot.stringify);\r
      port.portId = id;\r
      port.desiredSize = new go.Size(6, 6);\r
      port.alignment = align;\r
      port.fill = 'black';\r
      port.fromSpot = go.Spot.Right;\r
      port.fromLinkable = !input;\r
      port.toSpot = go.Spot.Left;\r
      port.toLinkable = input;\r
      port.toMaxLinks = 1;\r
      port.cursor = 'pointer';\r
    }\r
\r
    // define templates for each type of node\r
    const inputTemplate =\r
      new go.Node('Spot', {\r
          doubleClick: (e, obj) => {\r
            if (!(obj instanceof go.Node)) return;\r
            e.diagram.startTransaction('Toggle Input');\r
            const shp = obj.findObject('NODESHAPE');\r
            shp.fill = shp.fill === green ? red : green;\r
            updateStates();\r
            e.diagram.commitTransaction('Toggle Input');\r
          }\r
        })\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape('Circle').apply(shapeStyle)\r
            .set({ fill: red }), // override the default fill\r
          new go.Shape('Rectangle').apply(portStyle, '', false, new go.Spot(1, 0.5)) // the only port\r
        );\r
\r
    const outputTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('Rectangle').apply(shapeStyle)\r
            .set({ fill: green }), // override the default fill\r
          new go.Shape('Rectangle').apply(portStyle, '', true, new go.Spot(0, 0.5))\r
        ); // the only port\r
\r
    const andTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('AndGate').apply(shapeStyle),\r
          new go.Shape('Rectangle').apply(portStyle, 'in1', true, new go.Spot(0, 0.3)),\r
          new go.Shape('Rectangle').apply(portStyle, 'in2', true, new go.Spot(0, 0.7)),\r
          new go.Shape('Rectangle').apply(portStyle, 'out', false, new go.Spot(1, 0.5))\r
        );\r
\r
    const orTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('OrGate').apply(shapeStyle),\r
          new go.Shape('Rectangle').apply(portStyle, 'in1', true, new go.Spot(0.16, 0.3)),\r
          new go.Shape('Rectangle').apply(portStyle, 'in2', true, new go.Spot(0.16, 0.7)),\r
          new go.Shape('Rectangle').apply(portStyle, 'out', false, new go.Spot(1, 0.5))\r
        );\r
\r
    const xorTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('XorGate').apply(shapeStyle),\r
          new go.Shape('Rectangle').apply(portStyle, 'in1', true, new go.Spot(0.26, 0.3)),\r
          new go.Shape('Rectangle').apply(portStyle, 'in2', true, new go.Spot(0.26, 0.7)),\r
          new go.Shape('Rectangle').apply(portStyle, 'out', false, new go.Spot(1, 0.5))\r
        );\r
\r
    const norTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('NorGate').apply(shapeStyle),\r
          new go.Shape('Rectangle').apply(portStyle, 'in1', true, new go.Spot(0.16, 0.3)),\r
          new go.Shape('Rectangle').apply(portStyle, 'in2', true, new go.Spot(0.16, 0.7)),\r
          new go.Shape('Rectangle').apply(portStyle, 'out', false, new go.Spot(1, 0.5))\r
        );\r
\r
    const xnorTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('XnorGate').apply(shapeStyle),\r
          new go.Shape('Rectangle').apply(portStyle, 'in1', true, new go.Spot(0.26, 0.3)),\r
          new go.Shape('Rectangle').apply(portStyle, 'in2', true, new go.Spot(0.26, 0.7)),\r
          new go.Shape('Rectangle').apply(portStyle, 'out', false, new go.Spot(1, 0.5))\r
        );\r
\r
    const nandTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('NandGate').apply(shapeStyle),\r
          new go.Shape('Rectangle').apply(portStyle, 'in1', true, new go.Spot(0, 0.3)),\r
          new go.Shape('Rectangle').apply(portStyle, 'in2', true, new go.Spot(0, 0.7)),\r
          new go.Shape('Rectangle').apply(portStyle, 'out', false, new go.Spot(1, 0.5))\r
        );\r
\r
    const notTemplate =\r
      new go.Node('Spot').apply(nodeStyle)\r
        .add(\r
          new go.Shape('Inverter').apply(shapeStyle),\r
          new go.Shape('Rectangle').apply(portStyle, 'in', true, new go.Spot(0, 0.5)),\r
          new go.Shape('Rectangle').apply(portStyle, 'out', false, new go.Spot(1, 0.5))\r
        );\r
\r
    // add the templates created above to myDiagram and palette\r
    myDiagram.nodeTemplateMap.add('input', inputTemplate);\r
    myDiagram.nodeTemplateMap.add('output', outputTemplate);\r
    myDiagram.nodeTemplateMap.add('and', andTemplate);\r
    myDiagram.nodeTemplateMap.add('or', orTemplate);\r
    myDiagram.nodeTemplateMap.add('xor', xorTemplate);\r
    myDiagram.nodeTemplateMap.add('not', notTemplate);\r
    myDiagram.nodeTemplateMap.add('nand', nandTemplate);\r
    myDiagram.nodeTemplateMap.add('nor', norTemplate);\r
    myDiagram.nodeTemplateMap.add('xnor', xnorTemplate);\r
\r
    // share the template map with the Palette\r
    palette.nodeTemplateMap = myDiagram.nodeTemplateMap;\r
\r
    palette.model.nodeDataArray = [\r
      { category: 'input' },\r
      { category: 'output' },\r
      { category: 'and' },\r
      { category: 'or' },\r
      { category: 'xor' },\r
      { category: 'not' },\r
      { category: 'nand' },\r
      { category: 'nor' },\r
      { category: 'xnor' }\r
    ];\r
\r
    // load the initial diagram\r
    load();\r
\r
    // continually update the diagram\r
    loop();\r
  }\r
\r
  // update the diagram every 250 milliseconds\r
  function loop() {\r
    setTimeout(() => {\r
      updateStates();\r
      loop();\r
    }, 250);\r
  }\r
\r
  // update the value and appearance of each node according to its type and input values\r
  function updateStates() {\r
    var oldskip = myDiagram.skipsUndoManager;\r
    myDiagram.skipsUndoManager = true;\r
    // do all "input" nodes first\r
    myDiagram.nodes.each(node => {\r
      if (node.category === 'input') {\r
        doInput(node);\r
      }\r
    });\r
    // now we can do all other kinds of nodes\r
    myDiagram.nodes.each(node => {\r
      switch (node.category) {\r
        case 'and':\r
          doAnd(node);\r
          break;\r
        case 'or':\r
          doOr(node);\r
          break;\r
        case 'xor':\r
          doXor(node);\r
          break;\r
        case 'not':\r
          doNot(node);\r
          break;\r
        case 'nand':\r
          doNand(node);\r
          break;\r
        case 'nor':\r
          doNor(node);\r
          break;\r
        case 'xnor':\r
          doXnor(node);\r
          break;\r
        case 'output':\r
          doOutput(node);\r
          break;\r
        case 'input':\r
          break; // doInput already called, above\r
      }\r
    });\r
    myDiagram.skipsUndoManager = oldskip;\r
  }\r
\r
  // helper predicate\r
  function linkIsTrue(link) {\r
    // assume the given Link has a Shape named "SHAPE"\r
    return link.findObject('SHAPE').stroke === green;\r
  }\r
\r
  // helper function for propagating results\r
  function setOutputLinks(node, color) {\r
    node.findLinksOutOf().each(link => (link.findObject('SHAPE').stroke = color));\r
  }\r
\r
  // update nodes by the specific function for its type\r
  // determine the color of links coming out of this node based on those coming in and node type\r
\r
  function doInput(node) {\r
    // the output is just the node's Shape.fill\r
    setOutputLinks(node, node.findObject('NODESHAPE').fill);\r
  }\r
\r
  function doAnd(node) {\r
    var color = node.findLinksInto().all(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doNand(node) {\r
    var color = !node.findLinksInto().all(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doNot(node) {\r
    var color = !node.findLinksInto().all(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doOr(node) {\r
    var color = node.findLinksInto().any(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doNor(node) {\r
    var color = !node.findLinksInto().any(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doXor(node) {\r
    var truecount = 0;\r
    node.findLinksInto().each(link => {\r
      if (linkIsTrue(link)) truecount++;\r
    });\r
    var color = truecount % 2 !== 0 ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doXnor(node) {\r
    var truecount = 0;\r
    node.findLinksInto().each(link => {\r
      if (linkIsTrue(link)) truecount++;\r
    });\r
    var color = truecount % 2 === 0 ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doOutput(node) {\r
    // assume there is just one input link\r
    // we just need to update the node's Shape.fill\r
    node.linksConnected.each(link => {\r
      node.findObject('NODESHAPE').fill = link.findObject('SHAPE').stroke;\r
    });\r
  }\r
\r
  // save a model to and load a model from Json text, displayed below the Diagram\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/PortShiftingTool.js`],descriptionHtml:`<p>\r
      This is exactly like the <a href="../samples/logicCircuit">Logic Circuit sample</a> but also makes use of the PortShiftingTool, which is defined in\r
      <a href="../extensions/PortShiftingTool.js">PortShiftingTool.js</a>\r
    </p>\r
    <p>\r
      When the user wants to shift the position of a port on a node, the user can hold down the Shift key during a mouse-down on a port element. Dragging then\r
      will move the port within the node.\r
    </p>\r
    <p>Note how the relative position of the port within the node is maintained as you resize the node.</p>\r
    <p>\r
      If you want to persist the port's spot, you should add a TwoWay Binding of the <a>GraphObject.alignment</a>\r
      property with a property that you define on the node data for each port.\r
    </p>\r
    <p>\r
      This sample does not constrain the position of the port within the node, but you could adapt the PortShiftingTool.updateAlignment method to do so. For\r
      example if you wanted, you could keep a port stuck along one edge of the node.\r
    </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`ports`,`tooltips`,`tools`,`palette`,`extensions`,`grid`];var g=y();l(`lfuvjc`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};