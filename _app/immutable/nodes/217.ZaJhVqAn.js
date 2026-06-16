import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Drawing of Polygons or Polylines`,indexDescription:`A custom Tool that lets the user interactively draw polygons and polyline Shapes.`,screenshot:`polygondrawing`,priority:2,tags:[`tools`,`extensions`,`geometries`],description:`The user can draw a new polygon by clicking where its points should go.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 350px"></div>\r
  <div id="buttons">\r
    <button id="select">Select</button>\r
    <button id="drawPolygon">Draw Polygon</button>\r
    <button id="drawPolyline">Draw Polyline</button>\r
    <button id="finishDrawing">Finish Drawing</button>\r
    <button id="cancelDrawing">Cancel Drawing</button>\r
    <button id="undo">Undo Last Point</button>\r
    <br />\r
    <label><input type="checkbox" id="allowResizing" checked="checked" />Allow Resizing</label>\r
    <label><input type="checkbox" id="allowReshaping" checked="checked" />Allow Reshaping</label>\r
    <label><input type="checkbox" id="allowResegmenting" checked="checked" />Allow Resegmenting</label>\r
    <label><input type="checkbox" id="allowRotating" checked="checked" />Allow Rotating</label>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "position": "0 0",\r
  "model": { "class": "go.GraphLinksModel",\r
  "nodeDataArray": [ {"loc":"183 148", "geo":"F M0 145 L75 2 L131 87 L195 0 L249 143z", "key":-1} ],\r
  "linkDataArray": [  ]\r
} }\r
  </textarea>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv');\r
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
    myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool({ isResegmenting: true }));\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          selectionObjectName: 'SHAPE',\r
          // custom selection adornment: a blue rectangle\r
          selectionAdornmentTemplate:\r
            new go.Adornment('Auto')\r
              .add(\r
                new go.Shape({ stroke: 'dodgerblue', fill: null }),\r
                new go.Placeholder({ margin: -1 })\r
              ),\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          rotatable: true,\r
          rotationSpot: go.Spot.Center,\r
          reshapable: true // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bindTwoWay('angle')\r
        .add(\r
          new go.Shape({ name: 'SHAPE', fill: 'lightgray', strokeWidth: 1 })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
            .bindTwoWay('geometryString', 'geo')\r
            .bind('fill')\r
            .bind('stroke')\r
            .bind('strokeWidth')\r
        );\r
\r
    // create polygon drawing tool for myDiagram, defined in PolygonDrawingTool.js\r
    // install as first mouse-down-tool\r
    myDiagram.toolManager.mouseDownTools.insertAt(0, new PolygonDrawingTool({\r
      // provide the default JavaScript object for a new polygon in the model\r
      archetypePartData: { fill: 'yellow', stroke: 'blue', strokeWidth: 3 },\r
      isPolygon: true,\r
      isEnabled: false\r
    }));\r
\r
    document.getElementById('select').onclick = () => mode(false);\r
    document.getElementById('drawPolygon').onclick = () => mode(true, true);\r
    document.getElementById('drawPolyline').onclick = () => mode(true, false);\r
    document.getElementById('finishDrawing').onclick = () => finish(true);\r
    document.getElementById('cancelDrawing').onclick = () => finish(false);\r
    document.getElementById('undo').onclick = undo;\r
    document.getElementById('allowResizing').onclick = () => {\r
      myDiagram.commit(d => d.allowResize = !d.allowResize);\r
      updateAllAdornments();\r
    };\r
    document.getElementById('allowReshaping').onclick = () => {\r
      myDiagram.commit(d => d.allowReshape = !d.allowReshape);\r
      updateAllAdornments();\r
    };\r
    document.getElementById('allowResegmenting').onclick = () => {\r
      toggleResegmenting();\r
    };\r
    document.getElementById('allowRotating').onclick = () => {\r
      myDiagram.commit(d => d.allowRotate = !d.allowRotate);\r
      updateAllAdornments();\r
    };\r
    load(); // load a simple diagram from the textarea\r
  }\r
\r
  function mode(draw, polygon) {\r
    // assume PolygonDrawingTool is the first tool in the mouse-down-tools list\r
    var tool = myDiagram.toolManager.mouseDownTools.elt(0);\r
    tool.isEnabled = draw;\r
    tool.isPolygon = polygon;\r
    tool.archetypePartData.fill = polygon ? 'yellow' : null;\r
    tool.temporaryShape.fill = polygon ? 'yellow' : null;\r
    if (draw) myDiagram.currentTool = tool;\r
  }\r
\r
  // this command ends the PolygonDrawingTool\r
  function finish(commit) {\r
    var tool = myDiagram.currentTool;\r
    if (commit && tool instanceof PolygonDrawingTool) {\r
      var lastInput = myDiagram.lastInput;\r
      if (lastInput.event instanceof window.MouseEvent) tool.removeLastPoint(); // remove point from last mouse-down\r
      tool.finishShape();\r
    } else {\r
      tool.doCancel();\r
    }\r
  }\r
\r
  // this command removes the last clicked point from the temporary Shape\r
  function undo() {\r
    var tool = myDiagram.currentTool;\r
    if (tool instanceof PolygonDrawingTool) {\r
      var lastInput = myDiagram.lastInput;\r
      if (lastInput.event instanceof window.MouseEvent) tool.removeLastPoint(); // remove point from last mouse-down\r
      tool.undo();\r
    }\r
  }\r
\r
  function updateAllAdornments() {\r
    // called after checkboxes change Diagram.allow...\r
    myDiagram.selection.each(p => p.updateAdornments());\r
  }\r
\r
  function toggleResegmenting() {\r
    var tool = myDiagram.toolManager.findTool('GeometryReshaping');\r
    tool.isResegmenting = !tool.isResegmenting;\r
    updateAllAdornments();\r
  }\r
\r
  // save a model to and load a model from Json text, displayed below the Diagram.\r
  // wraps the model in a { position, model } object to save the viewport.\r
  function save() {\r
    var str = '{ "position": "' + go.Point.stringify(myDiagram.position) + '",\\n  "model": ' + myDiagram.model.toJson() + ' }';\r
    document.getElementById('mySavedModel').value = str;\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    var str = document.getElementById('mySavedModel').value;\r
    try {\r
      var json = JSON.parse(str);\r
      myDiagram.initialPosition = go.Point.parse(json.position || '0 0');\r
      myDiagram.model = go.Model.fromJson(json.model);\r
      myDiagram.model.undoManager.isEnabled = true;\r
    } catch (ex) {\r
      alert(ex);\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/PolygonDrawingTool.js`,`../extensions/GeometryReshapingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates the PolygonDrawingTool, a custom <a>Tool</a> added to the Diagram's mouseDownTools. It is defined in its own file, as\r
    <a href="../extensions/PolygonDrawingTool.js">PolygonDrawingTool.js</a>. It also demonstrates the GeometryReshapingTool, another custom tool, defined in\r
    <a href="../extensions/GeometryReshapingTool.js">GeometryReshapingTool.js</a>.\r
  </p>\r
  <p>\r
    These extensions serve as examples of features that can be added to GoJS by writing new classes. With the PolygonDrawingTool, a new mode is supported that\r
    allows the user to draw custom shapes. With the GeometryReshapingTool, users can change the geometry (i.e. the "shape") of a <a>Shape</a>s in a selected\r
    <a>Node</a>.\r
  </p>\r
  <p>\r
    Click a "Draw" button and then click in the diagram to place a new point in a polygon or polyline shape. Right-click, double-click, or Enter to finish.\r
    Press <b>Escape</b> to cancel, or <b>Z</b> to remove the last point. Click the "Select" button to switch back to the normal selection behavior, so that you\r
    can select, resize, and rotate the shapes. The checkboxes control whether you can resize, reshape, and/or rotate selected shapes.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`,`geometries`];var g=y();l(`zhxsgx`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};