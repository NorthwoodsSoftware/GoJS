import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Freehand Drawing Tool to Draw Lines with Mouse or Finger or Stylus, Supporting Resizing, Reshaping, and Rotating`,titleShort:`Freehand Drawing`,indexDescription:`A custom Tool that lets the user interactively draw a line, converting it into a Shape.`,screenshot:`freehanddrawing`,priority:2,tags:[`tools`,`extensions`,`geometries`],description:`Let the user draw a Shape using the mouse or finger without any constraints.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div id="buttons" style="user-select: none;">\r
    <button onclick="mode(false)" id="select">Select</button>\r
    <button onclick="mode(true)" id="draw">Draw Mode</button>\r
    <label><input type="checkbox" onclick="myDiagram.allowResize = !myDiagram.allowResize; updateAllAdornments()" checked="checked" />Allow Resizing</label>\r
    <label><input type="checkbox" onclick="myDiagram.allowReshape = !myDiagram.allowReshape; updateAllAdornments()" checked="checked" />Allow Reshaping</label>\r
    <label><input type="checkbox" onclick="myDiagram.allowRotate = !myDiagram.allowRotate; updateAllAdornments()" checked="checked" />Allow Rotating</label>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "position": "0 0",\r
  "model": { "class": "go.GraphLinksModel",\r
  "nodeDataArray": [ {"loc":"301 143", "category":"FreehandDrawing", "geo":"M0 70 L1 70 L2 70 L3 70 L5 70 L7 70 L8 70 L11 70 L13 70 L18 69 L21 69 L25 68 L29 67 L34 67 L38 67 L42 67 L47 66 L50 66 L53 66 L55 66 L57 66 L60 66 L63 66 L64 66 L66 66 L68 66 L70 66 L72 66 L74 66 L76 66 L78 65 L81 65 L83 65 L85 65 L88 65 L90 65 L92 65 L95 65 L98 65 L100 65 L102 65 L104 65 L106 65 L109 65 L110 65 L111 65 L112 65 L113 65 L114 65 L115 65 L116 65 L118 65 L119 65 L120 65 L121 65 L122 65 L123 65 L124 65 L125 65 L126 65 L127 65 L128 65 L129 65 L131 65 L131 64 L132 64 L133 64 L134 64 L135 64 L137 64 L138 64 L139 64 L140 64 L141 64 L140 64 L139 64 L138 64 L137 64 L135 65 L134 65 L132 66 L130 67 L129 67 L126 68 L123 70 L121 71 L119 72 L116 73 L114 74 L111 76 L109 77 L106 78 L104 79 L99 81 L96 84 L94 84 L90 87 L89 87 L87 88 L86 89 L84 89 L83 90 L81 91 L80 92 L79 92 L77 93 L76 94 L74 94 L74 95 L73 96 L71 96 L70 97 L68 98 L67 98 L66 99 L64 99 L64 100 L62 100 L61 101 L60 102 L59 102 L58 103 L57 103 L57 104 L56 104 L56 105 L54 105 L54 107 L53 107 L52 108 L51 108 L51 109 L49 110 L48 111 L47 112 L47 113 L46 113 L45 114 L44 114 L44 115 L44 116 L43 116 L43 117 L42 117 L42 119 L41 119 L41 120 L40 120 L40 121 L39 122 L39 123 L38 124 L37 125 L36 126 L36 127 L35 128 L34 128 L34 129 L33 130 L33 131 L32 131 L32 130 L32 129 L33 128 L34 125 L35 122 L37 119 L39 115 L41 111 L41 106 L43 103 L45 98 L47 93 L48 90 L49 86 L51 83 L52 81 L54 78 L55 74 L55 71 L56 68 L57 65 L58 62 L58 59 L58 55 L58 53 L58 51 L58 49 L58 48 L59 45 L60 44 L60 42 L61 40 L61 38 L62 36 L64 32 L64 30 L65 29 L66 27 L66 26 L66 25 L66 24 L67 23 L67 22 L67 21 L67 20 L67 19 L68 19 L68 18 L68 17 L69 16 L69 15 L69 14 L69 12 L69 11 L69 10 L70 9 L70 8 L70 7 L70 6 L71 5 L71 4 L71 3 L71 2 L71 1 L71 0 L71 1 L71 2 L71 5 L71 6 L71 8 L71 9 L71 12 L71 14 L72 16 L72 18 L73 20 L73 23 L74 25 L74 27 L75 29 L76 32 L77 34 L78 35 L79 38 L79 39 L81 42 L81 43 L82 45 L83 46 L83 47 L83 49 L85 50 L86 52 L86 55 L86 58 L88 60 L89 62 L89 64 L90 66 L91 67 L91 69 L92 70 L92 71 L93 72 L94 73 L94 74 L94 75 L95 76 L96 77 L96 79 L97 81 L98 82 L98 83 L98 84 L99 85 L99 86 L100 87 L100 90 L101 91 L102 92 L102 93 L103 95 L103 96 L103 97 L104 98 L104 100 L104 101 L105 102 L106 103 L106 104 L107 106 L108 108 L109 110 L110 111 L111 113 L112 114 L113 115 L113 117 L115 119 L116 121 L116 123 L118 124 L119 126 L120 127 L121 129 L121 130 L122 131 L123 131 L123 132 L124 132 L124 133 L125 134 L125 135 L126 135 L127 136 L128 137 L129 138 L130 139 L131 140 L130 139 L129 138 L128 138 L126 136 L124 136 L123 134 L121 133 L118 131 L116 130 L114 128 L111 127 L107 123 L105 122 L102 120 L100 119 L98 117 L95 116 L93 114 L90 113 L88 111 L85 110 L83 108 L81 106 L78 105 L77 104 L75 103 L72 102 L71 101 L70 100 L68 99 L67 98 L65 98 L64 97 L62 96 L60 96 L58 95 L57 94 L54 93 L53 93 L51 92 L49 91 L48 91 L47 91 L45 90 L44 90 L43 89 L42 89 L41 89 L40 88 L39 87 L37 87 L36 86 L35 85 L33 85 L32 84 L31 84 L30 83 L29 83 L28 82 L26 81 L25 81 L24 80 L22 80 L21 79 L21 78 L20 78 L19 78 L18 77 L17 77 L16 76 L15 76 L15 75 L14 75 L13 75 L12 74 L11 74 L10 74 L9 74 L7 73 L5 72 L4 72 L3 72 L2 71", "key":-1} ],\r
  "linkDataArray": [  ]\r
} }\r
  </textarea>`,jsCode:`function init() {\r
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
    myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool());\r
\r
    myDiagram.nodeTemplateMap.add('FreehandDrawing',\r
      new go.Part({\r
          isLayoutPositioned: false,\r
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
          new go.Shape({ name: 'SHAPE', fill: null, strokeWidth: 1 })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
            .bindTwoWay('geometryString', 'geo')\r
            .bind('fill')\r
            .bind('stroke')\r
            .bind('strokeWidth')\r
        )\r
    );\r
\r
    // create drawing tool for myDiagram, defined in FreehandDrawingTool.js\r
    const tool = new FreehandDrawingTool();\r
    // provide the default JavaScript object for a new polygon in the model\r
    tool.archetypePartData = { stroke: 'green', strokeWidth: 1, category: 'FreehandDrawing' };\r
    // allow the tool to start on top of an existing Part\r
    tool.isBackgroundOnly = false;\r
    // install as first mouse-move-tool\r
    myDiagram.toolManager.mouseMoveTools.insertAt(0, tool);\r
\r
    load(); // load a simple diagram from the textarea\r
    mode(false);\r
  }\r
\r
  function mode(draw) {\r
    var tool = myDiagram.toolManager.findTool('FreehandDrawing');\r
    tool.isEnabled = draw;\r
\r
    if (draw) {\r
      document.getElementById('draw').style.filter = 'brightness(180%)';\r
      document.getElementById('select').style.filter = '';\r
    } else {\r
      document.getElementById('draw').style.filter = '';\r
      document.getElementById('select').style.filter = 'brightness(180%)';\r
    }\r
  }\r
\r
  function updateAllAdornments() {\r
    // called after checkboxes change Diagram.allow...\r
    myDiagram.selection.each(p => p.updateAdornments());\r
  }\r
\r
  // save a model to and load a model from Json text, displayed below the Diagram.\r
  // This sample wraps the model in a { position, model } object to also persist the viewport.\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/FreehandDrawingTool.js`,`../extensions/GeometryReshapingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates the FreehandDrawingTool. It is defined in its own file, as <a href="../extensions/FreehandDrawingTool.js">FreehandDrawingTool.js</a>. It also\r
    demonstrates the GeometryReshapingTool, another custom tool, defined in <a href="../extensions/GeometryReshapingTool.js">GeometryReshapingTool.js</a>.\r
  </p>\r
  <p>Press and drag to draw a line.</p>\r
  <p>\r
    Click the "Select" button to switch back to the normal selection behavior, so that you can select, resize, and rotate the shapes. The checkboxes control\r
    whether you can resize, reshape, and/or rotate selected shapes.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`,`geometries`];var g=y();l(`1i1n1cc`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};