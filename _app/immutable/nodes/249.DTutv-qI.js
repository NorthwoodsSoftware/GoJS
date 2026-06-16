import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Parameterized Shape Figures, both Built-in and Extensions`,titleShort:`Shape Figures`,indexDescription:`Showcases all GoJS figures. You can define your own named Shape figures.`,screenshot:`shapes`,priority:1.1,tags:[`gridlayout`,`geometries`],description:`All predefined GoJS Shape figures, displayed as Nodes with a name underneath.`},htmlContent:`<div id="myDiagramDiv" style="height: 600px; background-color: #ffffff; border: solid 1px black;"></div>\r
  <div id="myDiagramDiv2" style="background-color: #ffffff; border: solid 1px black; height: 130px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.GridLayout({\r
        cellSize: new go.Size(1, 1),\r
        sorting: go.GridSorting.Forwards\r
      }), // use a GridLayout\r
      padding: new go.Margin(5, 5, 25, 5) // to see the names of shapes on the bottom row\r
    });\r
\r
    // Names of the built in shapes, which we will color green instead of pink.\r
    // The pink shapes are instead defined in the "../extensions/Figures.js" file.\r
    var builtIn = [\r
      'Rectangle',\r
      'Square',\r
      'RoundedRectangle',\r
      'RoundedTopRectangle',\r
      'RoundedBottomRectangle',\r
      'RoundedLeftRectangle',\r
      'RoundedRightRectangle',\r
      'Border',\r
      'Ellipse',\r
      'Circle',\r
      'TriangleRight',\r
      'TriangleDown',\r
      'TriangleLeft',\r
      'TriangleUp',\r
      'Triangle',\r
      'Diamond',\r
      'LineH',\r
      'LineV',\r
      'None',\r
      'BarH',\r
      'BarV',\r
      'MinusLine',\r
      'PlusLine',\r
      'XLine',\r
      'LineRight',\r
      'LineDown',\r
      'LineLeft',\r
      'LineUp',\r
      'Capsule',\r
      'Borders'\r
    ];\r
    function isBuiltIn(shapeName) {\r
      return builtIn.indexOf(shapeName) >= 0;\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', {\r
          mouseEnter: (e, node) => (node.isHighlighted = true),\r
          mouseLeave: (e, node) => (node.isHighlighted = false),\r
          locationSpot: go.Spot.Center, // the location is the center of the Shape\r
          locationObjectName: 'SHAPE',\r
          selectionAdorned: false, // no selection handle when selected\r
          resizable: true,\r
          resizeObjectName: 'SHAPE', // user can resize the Shape\r
          rotatable: true,\r
          rotateObjectName: 'SHAPE', // rotate the Shape without rotating the label\r
          // don't re-layout when node changes size\r
          layoutConditions: go.LayoutConditions.Standard & ~go.LayoutConditions.NodeSized\r
        })\r
        .bindObject('layerName', 'isHighlighted', h => h ? 'Foreground' : '')\r
        .add(\r
          new go.Shape({\r
              name: 'SHAPE', // named so that the above properties can refer to this GraphObject\r
              width: 70,\r
              height: 70,\r
              strokeWidth: 3\r
            })\r
            // Color the built in shapes green, and the figures.js shapes Pink\r
            .bind('fill', 'key', k => isBuiltIn(k) ? 'palegreen' : 'lightpink')\r
            .bind('stroke', 'key', k => isBuiltIn(k) ? 'darkgreen' : '#C2185B')\r
            // bind the Shape.figure to the figure name, which automatically gives the Shape a Geometry\r
            .bind('figure', 'key'),\r
          new go.TextBlock({ // the label\r
              margin: 4,\r
              font: 'bold 18px sans-serif',\r
              background: 'white'\r
            })\r
            .bindObject('visible', 'isHighlighted')\r
            .bind('text', 'key')\r
        );\r
\r
    // initialize the model\r
    myDiagram.model.nodeDataArray = go.Shape.getFigureGenerators().toArray();\r
\r
    myDiagram2 = new go.Diagram('myDiagramDiv2', {\r
      layout: new go.GridLayout({ sorting: go.GridSorting.Forwards }) // use a GridLayout\r
    });\r
\r
    myDiagram2.nodeTemplate =\r
      new go.Node('Vertical')\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              width: 50,\r
              height: 50,\r
              strokeWidth: 2,\r
              fill: 'palegreen',\r
              stroke: 'darkgreen',\r
              parameter1: 30\r
            })\r
            .bind('parameter1')\r
            .bind('parameter2')\r
        )\r
        .add(\r
          new go.TextBlock({ margin: 12, font: 'bold 12px monospace' })\r
            .bind('text', 'text', val => 'parameter2: ' + val)\r
        );\r
\r
    myDiagram2.model.nodeDataArray = [\r
      { parameter2: 1 | 2, text: '1 | 2' },\r
      { parameter2: 4 | 8, text: '4 | 8' },\r
      { parameter2: 2 | 4, text: '2 | 4' },\r
      { parameter2: 1 | 8, text: '1 | 8' }\r
    ];\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>\r
    This sample showcases all predefined <b>GoJS</b> figures. This sample also makes use of\r
    <a href="../intro/highlighting">highlighting</a> data bindings: Mouse-hover over a\r
    shape to see its name.\r
  </p>\r
  <p>\r
    You can specify a predefined geometry for a <a>Shape</a> by setting its <a>Shape.figure</a>.\r
  </p>\r
  <p>\r
    In order to reduce the size of the GoJS library, most predefined figures are in the\r
    <a href="../extensions/Figures.js" target="_blank">Figures.js</a> file. You can load this file\r
    or simply load only those figures that you want to use by copying their definitions into your\r
    code.\r
  </p>\r
  <p>\r
    A number of very common figures are predefined in go.js:\r
    <code\r
      >"Rectangle", "Square", "RoundedRectangle", "RoundedTopRectangle", "RoundedBottomRectangle",\r
      "RoundedLeftRectangle", "RoundedRightRectangle", "Border", "Ellipse", "Circle",\r
      "TriangleRight", "TriangleDown", "TriangleLeft", "TriangleUp", "Triangle", "Diamond", "LineH",\r
      "LineV", "None", "BarH", "BarV", "MinusLine", "PlusLine", "XLine", "LineRight", "LineDown",\r
      "LineLeft", "LineUp", "Capsule"</code\r
    >. These figures are filled green above, instead of pink.\r
  </p>\r
  <p>\r
    With GoJS you can also define your own custom shapes with SVG-like path syntax, see the\r
    <a href="icons">SVG icons</a> sample for examples or the\r
    <a href="../intro/geometry">geometry path strings learn page</a> to learn more.\r
  </p>\r
  <p>For predefined arrowheads, see the <a href="arrowheads">Arrowheads</a> sample.</p>\r
  <p>\r
    For the "RoundedRectangle" figure, you can set the <a>Shape.parameter1</a> and\r
    <a>Shape.parameter2</a>\r
    values to modify the corner radius and which corners are rounded, respectively.\r
  </p>\r
  <p>\r
    <code>parameter2</code> is a number that is specified by four bit flags (1, 2, 4, 8), describing\r
    the top-left, top-right, bottom-right, and bottom-left corners respectively. The flags can be\r
    defined to specify which corners to round:\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gridlayout`,`geometries`];var g=y();l(`si0cm7`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};