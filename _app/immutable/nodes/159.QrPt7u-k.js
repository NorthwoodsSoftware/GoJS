import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`HTML Interaction Showing Draggable Palette and Draggable Inspector`,titleShort:`HTML Interaction`,indexDescription:`Contains two draggable HTML elements (using jQuery UI). One of the two HTML elements houses a panel that interacts with the main Diagram.`,screenshot:`htmlinteraction`,priority:2,tags:[`palette`,`html`,`inspector`,`frameworks`],description:`Show a GoJS Palette in a floating window and use an Inspector for changing the appearance of the selected node.`},htmlContent:`<div id="paletteDraggable" class="draggable" style="height: 300px">\r
    <div id="paletteDraggableHandle" class="handle">Palette</div>\r
    <div id="paletteContainer">\r
      <div id="myPaletteDiv"></div>\r
    </div>\r
  </div>\r
\r
  <div id="infoDraggable" class="draggable" style="display: inline-block; vertical-align: top; padding: 5px; top: 20px; left: 380px">\r
    <div id="infoDraggableHandle" class="handle">Info</div>\r
    <div>\r
      <div id="myInfo"></div>\r
    </div>\r
  </div>\r
\r
  <div style="display: inline-block; vertical-align: top; width: 400px">\r
    <div id="myDiagramDiv" style="background-color: whitesmoke; border: solid 1px black; height: 400px"></div>\r
  </div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // define several shared Brushes\r
    const fill1 = 'rgb(105,210,231)';\r
    const brush1 = 'rgb(65,180,181)';\r
\r
    const fill2 = 'rgb(167,219,216)';\r
    const brush2 = 'rgb(127,179,176)';\r
\r
    const fill3 = 'rgb(224,228,204)';\r
    const brush3 = 'rgb(184,188,164)';\r
\r
    const fill4 = 'rgb(243,134,48)';\r
    const brush4 = 'rgb(203,84,08)';\r
\r
    myDiagram.nodeTemplateMap.add('', // default category\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Ellipse', { strokeWidth: 2, fill: fill1, name: 'SHAPE' })\r
            .bind('figure', 'figure')\r
            .bind('fill', 'fill')\r
            .bind('stroke', 'stroke'),\r
          new go.TextBlock({\r
              margin: 5,\r
              maxSize: new go.Size(200, NaN),\r
              wrap: go.Wrap.Fit,\r
              textAlign: 'center',\r
              editable: true,\r
              font: 'bold 9pt Helvetica, Arial, sans-serif',\r
              name: 'TEXT'\r
            })\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    // On selection changed, make sure infoDraggable will resize as necessary\r
    myDiagram.addDiagramListener('ChangedSelection', diagramEvent => {\r
      var idrag = document.getElementById('infoDraggable');\r
      idrag.style.width = '';\r
      idrag.style.height = '';\r
    });\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Ocean', fill: fill1, stroke: brush1, figure: 'Hexagon' },\r
        { key: 2, text: 'Lake', fill: fill2, stroke: brush2, figure: 'Diamond' }\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
\r
    // initialize the Palette that is in a floating, draggable HTML container\r
    myPalette = new go.Palette('myPaletteDiv');\r
    myPalette.nodeTemplateMap = myDiagram.nodeTemplateMap;\r
    myPalette.model = new go.GraphLinksModel([\r
      { text: 'Lake', fill: fill1, stroke: brush1, figure: 'Hexagon' },\r
      { text: 'Ocean', fill: fill2, stroke: brush2, figure: 'Rectangle' },\r
      { text: 'Sand', fill: fill3, stroke: brush3, figure: 'Diamond' },\r
      { text: 'Goldfish', fill: fill4, stroke: brush4, figure: 'Octagon' }\r
    ]);\r
\r
    myPalette.addDiagramListener('InitialLayoutCompleted', diagramEvent => {\r
      var pdrag = document.getElementById('paletteDraggable');\r
      var palette = diagramEvent.diagram;\r
      pdrag.style.width = palette.documentBounds.width + 28 + 'px'; // account for padding/borders\r
      pdrag.style.height = palette.documentBounds.height + 38 + 'px';\r
    });\r
\r
    $(() => {\r
      $('#paletteDraggable')\r
        .draggable({ handle: '#paletteDraggableHandle' })\r
        .resizable({\r
          // After resizing, perform another layout to fit everything in the palette's viewport\r
          stop: () => myPalette.layoutDiagram(true)\r
        });\r
\r
      $('#infoDraggable').draggable({ handle: '#infoDraggableHandle' });\r
\r
      var inspector = new Inspector('myInfo', myDiagram, {\r
        properties: {\r
          // key would be automatically added for nodes, but we want to declare it read-only also:\r
          key: { readOnly: true, show: Inspector.showIfPresent },\r
          // fill and stroke would be automatically added for nodes, but we want to declare it a color also:\r
          fill: { show: Inspector.showIfPresent, type: 'color' },\r
          stroke: { show: Inspector.showIfPresent, type: 'color' }\r
        }\r
      });\r
\r
      myDiagram.select(myDiagram.nodes.first());\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`.draggable {\r
    display: inline-block;\r
    vertical-align: top;\r
    border: 4px solid #bbb;\r
    border-radius: 4px;\r
    background-color: #f5f5f5;\r
    position: absolute;\r
    top: 20px;\r
    left: 20px;\r
    z-index: 500;\r
  }\r
\r
  .handle {\r
    background-color: lightblue;\r
    cursor: move;\r
    text-align: center;\r
    font: bold 12px sans-serif;\r
  }\r
\r
  #infoDraggable {\r
    font: 12px helvetica, sans-serif;\r
    min-width: 213px;\r
  }\r
\r
  #myInfo {\r
    width: 100%;\r
    overflow: hidden;\r
  }\r
\r
  #myPaletteDiv {\r
    background-color: #f5f5f5;\r
    width: 100%;\r
    height: 100%;\r
  }\r
\r
  /*\r
  One simple way of making a div fill its space,\r
  with allowances for the title (top) and the resize handle (bottom)\r
  */\r
  #paletteContainer {\r
    position: absolute;\r
    bottom: 14px;\r
    left: 0px;\r
    right: 0px;\r
    top: 14px;\r
  }`,externalStyles:[],externalScripts:[`https://code.jquery.com/jquery-3.6.0.min.js`,`https://code.jquery.com/ui/1.12.1/jquery-ui.min.js`,`../extensions/Figures.js`,`../extensions/DataInspector.js`],descriptionHtml:`<p>This sample contains a draggable HTML element (using jQuery UI), which houses a GoJS Palette.</p>\r
  <p>\r
    A DIV to the right of the diagram houses the <a href="../samples/DataInspector">GoJS Data inspector extension</a>, which displays some editable\r
    information about each Node.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`palette`,`html`,`inspector`,`frameworks`];var g=y();l(`x727ps`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};