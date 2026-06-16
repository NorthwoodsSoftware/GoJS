import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Diagram for Building Flowcharts`,titleShort:`Interactive Flowchart`,indexDescription:`A flowchart and palette, showing different node templates and data bindings. Each node has only one port element. Links are orthogonal and automatically route to avoid nodes.`,screenshot:`flowchart`,priority:.5,tags:[`palette`,`svg`,`process`,`theme`],description:`Interactive flowchart diagram implemented by GoJS in JavaScript for HTML.`},htmlContent:`<div class="sampleWrapper">\r
    <div style="width: 100%; height: fit-content; display: flex; flex: 2;">\r
      <div id="myPaletteDiv" style="width: 100px; margin-right: 2px"></div>\r
      <div id="myDiagramDiv" style="flex-grow: 1; height: 810px"></div>\r
    </div>\r
    <div style="flex: 1; min-width: 425px; display: flex; flex-direction: column; margin-top: .5em;">\r
      <div>\r
        Theme:\r
        <select id="theme" onchange="changeTheme()">\r
          <option value="system">System</option>\r
          <option value="light">Light</option>\r
          <option value="dark" selected>Dark</option>\r
        </select>\r
        <button onclick="printDiagram()">Print Diagram Using SVG</button>\r
      </div>\r
      <div style="margin-block: .5em;">\r
        <button id="SaveButton" onclick="save()">Save</button>\r
        <button onclick="load()">Load</button>\r
        Diagram Model saved in JSON format:\r
      </div>\r
      <textarea id="mySavedModel" style="width: 100%; flex: 1 1 auto; min-height: 375px">\r
{ "class": "GraphLinksModel",\r
  "pointsDigits": 0,\r
  "nodeDataArray": [\r
    {"key":-1,"category":"Start","loc":"-237 41","text":"Start"},\r
    {"key":-2,"category":"End","loc":"277 696","text":"End"},\r
    {"category":"Conditional","text":"Is data\\ntree-like?","key":-14,"loc":"40 165"},\r
    {"text":"Use a TreeModel","key":-5,"loc":"-100 230"},\r
    {"text":"Use a GraphLinksModel","key":-6,"loc":"180 230"},\r
    {"category":"Comment","text":"GraphLinksModel\\nalso allows Groups","key":-7,"loc":"362 230"},\r
    {"text":"Create DIV for Diagram","key":-8,"loc":"-64 41"},\r
    {"text":"Create new Diagram associated with DIV","key":-9,"loc":"164 41"},\r
    {"text":"Style node templates","key":-10,"loc":"40 617"},\r
    {"text":"Add data to node/linkDataArray","key":-12,"loc":"180 320"},\r
    {"text":"Add data to nodeDataArray, including parent","key":-13,"loc":"-100 320"},\r
    {"text":"Style link templates","key":-15,"loc":"277 617"},\r
    {"category":"Conditional","text":"Should nodes be auto-positioned?","key":-16,"loc":"40 460"},\r
    {"text":"Choose a layout","key":-18,"loc":"-100 525"},\r
    {"text":"Set location in node data and bind","key":-17,"loc":"180 525"}\r
  ],\r
  "linkDataArray": [\r
    {"from":-1,"to":-8},\r
    {"from":-8,"to":-9},\r
    {"from":-5,"to":-13},\r
    {"from":-6,"to":-12},\r
    {"from":-15,"to":-2},\r
    {"from":-14,"to":-5,"text":"Yes"},\r
    {"from":-14,"to":-6,"text":"No"},\r
    {"from":-9,"to":-14},\r
    {"from":-13,"to":-16},\r
    {"from":-12,"to":-16},\r
    {"from":-16,"to":-18,"text":"Yes"},\r
    {"from":-16,"to":-17,"text":"No"},\r
    {"from":-18,"to":-10},\r
    {"from":-17,"to":-10},\r
    {"from":-10,"to":-15}\r
  ]}\r
      </textarea>\r
      <p id="hidden" style="padding: 0; height: 0px">this forces the font to load in Chromium browsers</p>\r
    </div>\r
  </div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
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
        text: '#fff',\r
        start: '#064e3b',\r
        step: '#49939e',\r
        conditional: '#6a9a8a',\r
        end: '#7f1d1d',\r
        comment: '#a691cc',\r
        bgText: '#000',\r
        link: '#dcb263',\r
        linkOver: '#cbd5e1',\r
        div: '#ede9e0'\r
      }\r
    });\r
\r
    myDiagram.themeManager.set('dark', {\r
      colors: {\r
        text: '#fff',\r
        step: '#414a8d',\r
        conditional: '#88afa2',\r
        comment: '#bfb674',\r
        bgText: '#fff',\r
        link: '#fdb71c',\r
        linkOver: '#475569',\r
        div: '#141e37'\r
      }\r
    });\r
\r
    defineFigures();\r
\r
    // helper definitions for node templates\r
    function nodeStyle(node) {\r
      node\r
        // the Node.location is at the center of each node\r
        .set({ locationSpot: go.Spot.Center })\r
        // The Node.location comes from the "loc" property of the node data,\r
        // converted by the Point.parse static method.\r
        // If the Node.location is changed, it updates the "loc" property of the node data,\r
        // converting back using the Point.stringify static method.\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);\r
    }\r
\r
    function shapeStyle(shape) {\r
      // make the whole node shape a port\r
      shape.set({ strokeWidth: 0, portId: '', cursor: 'pointer' });\r
    }\r
\r
    function textStyle(textblock) {\r
      textblock\r
        .set({ font: 'bold 11pt Figtree, sans-serif' })\r
        .theme('stroke', 'text');\r
    }\r
\r
    // define the Node templates for regular nodes\r
    myDiagram.nodeTemplateMap.add('', // the default category\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape('Rectangle', {\r
              fromLinkable: true,\r
              toLinkable: true,\r
              fromSpot: go.Spot.AllSides,\r
              toSpot: go.Spot.AllSides\r
            })\r
            .apply(shapeStyle)\r
            .theme('fill', 'step'),\r
          new go.TextBlock({\r
              margin: 12,\r
              maxSize: new go.Size(160, NaN),\r
              wrap: go.Wrap.Fit,\r
              editable: true\r
            })\r
            .apply(textStyle)\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Conditional',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape('Conditional', { fromLinkable: true, toLinkable: true })\r
            .apply(shapeStyle)\r
            .theme('fill', 'conditional'),\r
          new go.TextBlock({\r
              margin: 8,\r
              maxSize: new go.Size(160, NaN),\r
              wrap: go.Wrap.Fit,\r
              textAlign: 'center',\r
              editable: true\r
            })\r
            .apply(textStyle)\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Start',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape('Capsule', { fromLinkable: true })\r
            .apply(shapeStyle)\r
            .theme('fill', 'start'),\r
          new go.TextBlock('Start', { margin: new go.Margin(5, 6) })\r
            .apply(textStyle)\r
            .bind('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('End',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape('Capsule', { toLinkable: true })\r
            .apply(shapeStyle)\r
            .theme('fill', 'end'),\r
          new go.TextBlock('End', { margin: new go.Margin(5, 6) })\r
            .apply(textStyle)\r
            .bind('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Comment',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape('File', { strokeWidth: 3 })\r
            .theme('fill', 'div')\r
            .theme('stroke', 'comment'),\r
          new go.TextBlock({\r
              font: '9pt Figtree, sans-serif',\r
              margin: 8,\r
              maxSize: new go.Size(200, NaN),\r
              wrap: go.Wrap.Fit,\r
              textAlign: 'center',\r
              editable: true\r
            })\r
            .theme('stroke', 'bgText')\r
            .bindTwoWay('text')\r
          // no ports, because no links are allowed to connect with a comment\r
        )\r
    );\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          curve: go.Curve.JumpOver,\r
          corner: 5,\r
          toShortLength: 4,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          resegmentable: true,\r
          // mouse-overs subtly highlight links:\r
          mouseEnter: (e, link) => (link.findObject('HIGHLIGHT').stroke = link.diagram.themeManager.findValue('linkOver', 'colors')),\r
          mouseLeave: (e, link) => (link.findObject('HIGHLIGHT').stroke = 'transparent'),\r
          // context-click creates an editable link label\r
          contextClick: (e, link) => {\r
            e.diagram.model.commit(m => {\r
              m.set(link.data, 'text', 'Label');\r
            });\r
          }\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          // the highlight shape, normally transparent\r
          new go.Shape({\r
            isPanelMain: true,\r
            strokeWidth: 8,\r
            stroke: 'transparent',\r
            name: 'HIGHLIGHT'\r
          }),\r
          // the link path shape\r
          new go.Shape({ isPanelMain: true, strokeWidth: 2 })\r
            .theme('stroke', 'link'),\r
          // the arrowhead\r
          new go.Shape({ toArrow: 'standard', strokeWidth: 0, scale: 1.5 })\r
            .theme('fill', 'link'),\r
          // the link label\r
          new go.Panel('Auto', { visible: false })\r
            .bind('visible', 'text', t => typeof t === 'string' && t.length > 0) // only shown if there is text\r
            .add(\r
              // a gradient that fades into the background\r
              new go.Shape('Ellipse', { strokeWidth: 0 })\r
                .theme('fill', 'div', null, null, c => new go.Brush("Radial", { 0: c, 0.5: \`\${c}00\` })),\r
              new go.TextBlock({\r
                  name: 'LABEL',\r
                  font: '9pt Figtree, sans-serif',\r
                  margin: 3,\r
                  editable: true\r
                })\r
                .theme('stroke', 'bgText')\r
                .bindTwoWay('text')\r
            )\r
        );\r
\r
    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:\r
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Routing.Orthogonal;\r
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Routing.Orthogonal;\r
\r
    load(); // load an initial diagram from some JSON text\r
\r
    // initialize the Palette that is on the left side of the page\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram\r
      themeManager: myDiagram.themeManager, // share the ThemeManager used by myDiagram\r
      model: new go.GraphLinksModel([\r
        // specify the contents of the Palette\r
        { category: 'Start', text: 'Start' },\r
        { text: 'Step' },\r
        { category: 'Conditional', text: '???' },\r
        { category: 'End', text: 'End' },\r
        { category: 'Comment', text: 'Comment' }\r
      ])\r
    });\r
  } // end init\r
\r
  // define some custom shapes for node templates\r
  function defineFigures() {\r
    go.Shape.defineFigureGenerator('Conditional', (shape, w, h) => {\r
      const geo = new go.Geometry();\r
      const fig = new go.PathFigure(w * 0.15, 0, true);\r
      geo.add(fig);\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w * 0.85, 0));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w, 0.5 * h));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w * 0.85, h));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w * 0.15, h));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, 0, 0.5 * h).close());\r
      geo.spot1 = new go.Spot(0.15, 0);\r
      geo.spot2 = new go.Spot(0.85, 1);\r
      return geo;\r
    });\r
\r
    // taken from ../extensions/Figures.js:\r
    go.Shape.defineFigureGenerator('File', (shape, w, h) => {\r
      const geo = new go.Geometry();\r
      const fig = new go.PathFigure(0, 0, true); // starting point\r
      geo.add(fig);\r
      fig.add(new go.PathSegment(go.SegmentType.Line, 0.75 * w, 0));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w, 0.25 * h));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, w, h));\r
      fig.add(new go.PathSegment(go.SegmentType.Line, 0, h).close());\r
      const fig2 = new go.PathFigure(0.75 * w, 0, false);\r
      geo.add(fig2);\r
      // The Fold\r
      fig2.add(new go.PathSegment(go.SegmentType.Line, 0.75 * w, 0.25 * h));\r
      fig2.add(new go.PathSegment(go.SegmentType.Line, w, 0.25 * h));\r
      geo.spot1 = new go.Spot(0, 0.25);\r
      geo.spot2 = go.Spot.BottomRight;\r
      return geo;\r
    });\r
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
  // print the diagram by opening a new window holding SVG images of the diagram contents for each page\r
  function printDiagram() {\r
    const svgWindow = window.open();\r
    if (!svgWindow) return; // failure to open a new Window\r
    svgWindow.document.title = "GoJS Flowchart";\r
    svgWindow.document.body.style.margin = "0px";\r
    const printSize = new go.Size(700, 960);\r
    const bnds = myDiagram.documentBounds;\r
    let x = bnds.x;\r
    let y = bnds.y;\r
    while (y < bnds.bottom) {\r
      while (x < bnds.right) {\r
        const svg = myDiagram.makeSvg({\r
          scale: 1.0,\r
          position: new go.Point(x, y),\r
          size: printSize,\r
          background: myDiagram.themeManager.findValue('div', 'colors')\r
        });\r
        svgWindow.document.body.appendChild(svg);\r
        x += printSize.width;\r
      }\r
      x = bnds.x;\r
      y += printSize.height;\r
    }\r
    setTimeout(() => { svgWindow.print(); svgWindow.close(); }, 1);\r
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
    // setTimeout only to ensure font is loaded before loading diagram\r
    // you may want to use an asset loading library for this\r
    // to keep this sample simple, it does not\r
    setTimeout(() => {\r
      init();\r
    }, 300);\r
  });`,cssCode:`#hidden {\r
    font: 600 0px Figtree;\r
    opacity: 0;\r
  }
.sampleWrapper {\r
    display: flex;\r
    flex-direction: column;\r
\r
    @media (min-width: 1280px) {\r
      flex-direction: row;\r
    }\r
\r
    & > div:first-child {\r
      margin-bottom: 0.5rem;\r
\r
      @media (min-width: 1280px) {\r
        margin-right: 0.5rem;\r
        margin-bottom: 0;\r
      }\r
    }\r
  }`,externalStyles:[`https://fonts.googleapis.com/css?family=Figtree:400,600&subset=latin,latin-ext`],externalScripts:[],descriptionHtml:`<p>\r
    The Flowchart sample demonstrates several key features of GoJS, namely\r
    <a href="../intro/palette">Palette</a>s, <a href="../intro/links">linkable nodes</a>, drag/drop behavior,\r
    <a href="../intro/textBlocks">text editing</a>, and the use of <a href="../intro/templateMaps">Node template maps</a> in Diagrams.\r
  </p>\r
  <p>\r
    Drag from the edges of a Node to create new Links. Selecting Links allows you to re-shape and re-link them. Selecting a Node and then clicking its\r
    TextBlock will allow you to edit text (except on the Start and End Nodes). Context clicking a Link creates an editable link label.\r
  </p>\r
  <p>The dark and light themes are controlled using the <a>ThemeManager</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`palette`,`svg`,`process`,`theme`];var g=y();l(`18bamdr`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};