import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Various Visual Relationships`,titleShort:`Visual Relationships`,indexDescription:`Shows how you can create custom renderings for Links by repeatedly drawing GraphObjects along the route.`,screenshot:`relationships`,priority:2,tags:[`collections`,`links`,`treelayout`,`geometries`],description:`Examples of different visuals for relationships (links).`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 800px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.TreeLayout({\r
        layerSpacing: 150,\r
        arrangementSpacing: new go.Size(2, 2),\r
        setsPortSpot: false,\r
        setsChildPortSpot: false\r
      })\r
    });\r
\r
    // this typically represents a person\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical')\r
        .add(\r
          new go.Shape('Circle', {\r
              desiredSize: new go.Size(28, 28),\r
              fill: 'white',\r
              strokeWidth: 1.5,\r
              portId: ''\r
            })\r
            .bind('figure'),\r
          new go.TextBlock('name')\r
            .bind('text')\r
        );\r
\r
    // this template works for all kinds of relationships\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          curve: go.Curve.Bezier, // slightly curved, by default\r
          reshapable: true\r
        }) // users can reshape the link route\r
        .add(\r
          new go.Shape({ // the link's path shape\r
              isPanelMain: true,\r
              stroke: 'transparent'\r
            })\r
            .bind('stroke', 'patt', f => f === '' ? 'black' : 'transparent')\r
            .bind('pathPattern', 'patt', convertPathPatternToShape),\r
          new go.Shape({ // the link's path shape\r
              isPanelMain: true,\r
              stroke: 'transparent',\r
              strokeWidth: 3\r
            })\r
            .bind('pathPattern', 'patt2', convertPathPatternToShape),\r
          new go.Shape({ // the "to" arrowhead\r
              toArrow: '',\r
              fill: null,\r
              scale: 1.2\r
            })\r
            .bind('toArrow')\r
            .bind('stroke', 'patt', convertPathPatternToColor),\r
          new go.TextBlock({ // show the path object name\r
              segmentOffset: new go.Point(0, 12)\r
            })\r
            .bind('text', 'patt'),\r
          new go.TextBlock({ // show the second path object name, if any\r
              segmentOffset: new go.Point(0, -12)\r
            })\r
            .bind('text', 'patt2')\r
        );\r
\r
    // Conversion functions that make use of the PathPatterns store of pattern Shapes\r
    function convertPathPatternToShape(name) {\r
      if (!name) return null;\r
      return PathPatterns.get(name);\r
    }\r
\r
    function convertPathPatternToColor(name) {\r
      var pattobj = convertPathPatternToShape(name);\r
      return pattobj !== null ? pattobj.stroke : 'transparent';\r
    }\r
\r
    // Define a bunch of small Shapes that can be used as values for Shape.pathPattern\r
    var PathPatterns = new go.Map();\r
\r
    function definePathPattern(name, geostr, color, width, cap) {\r
      if (typeof name !== 'string' || typeof geostr !== 'string') throw new Error('invalid name or geometry string argument: ' + name + ' ' + geostr);\r
      if (color === undefined) color = 'black';\r
      if (width === undefined) width = 1;\r
      if (cap === undefined) cap = 'square';\r
      PathPatterns.set(\r
        name,\r
        new go.Shape({\r
          geometryString: geostr,\r
          fill: 'transparent',\r
          stroke: color,\r
          strokeWidth: width,\r
          strokeCap: cap\r
        })\r
      );\r
    }\r
\r
    definePathPattern('Single', 'M0 0 L1 0');\r
    definePathPattern('Double', 'M0 0 L1 0 M0 3 L1 3');\r
    definePathPattern('Triple', 'M0 0 L1 0 M0 3 L1 3 M0 6 L1 6');\r
    definePathPattern('DashR', 'M0 0 M3 0 L6 0', 'red');\r
    definePathPattern('DoubleDashR', 'M0 0 M3 0 L6 0 M3 3 L6 3', 'red');\r
    definePathPattern('TripleDashR', 'M0 0 M3 0 L6 0 M3 3 L6 3 M3 6 L6 6', 'red');\r
    definePathPattern('Dash', 'M0 0 M3 0 L6 0');\r
    definePathPattern('DoubleDash', 'M0 0 M3 0 L6 0 M3 3 L6 3');\r
    //definePathPattern("TripleDash", "M0 0 M3 0 L6 0 M3 3 L6 3 M3 6 L6 6");\r
    definePathPattern('Dot', 'M0 0 M4 0 L4.1 0', 'black', 2, 'round');\r
    definePathPattern('DoubleDot', 'M0 0 M4 0 L4.1 0 M4 3 L4.1 3', 'black', 2, 'round');\r
    definePathPattern('SingleG', 'M0 0 L1 0', 'green');\r
    definePathPattern('DoubleG', 'M0 0 L1 0 M0 3 L1 3', 'green');\r
    definePathPattern('SingleR', 'M0 0 L1 0', 'red');\r
    definePathPattern('TripleR', 'M0 0 L1 0 M0 3 L1 3 M0 6 L1 6', 'red');\r
    definePathPattern('ZigzagB', 'M0 3 L1 0 3 6 4 3', 'blue');\r
    definePathPattern('ZigzagR', 'M0 3 L1 0 3 6 4 3', 'red');\r
    definePathPattern('BigZigzagR', 'M0 4 L2 0 6 8 8 4', 'red');\r
    definePathPattern('DoubleZigzagB', 'M0 3 L1 0 3 6 4 3 M0 9 L1 6 3 12 4 9', 'blue');\r
    definePathPattern('CrossG', 'M0 0 M3 0 M1 0 L1 8', 'green');\r
    definePathPattern('CrossR', 'M0 0 M3 0 M1 0 L1 8', 'red');\r
    //definePathPattern("Railroad", "M0 2 L3 2 M0 6 L3 6 M1 0 L1 8");  // also == Double & Cross\r
    definePathPattern('BackSlash', 'M0 3 L2 6 M1 0 L5 6 M4 0 L6 3');\r
    definePathPattern('Slash', 'M0 3 L2 0 M1 6 L5 0 M4 6 L6 3');\r
    definePathPattern('Coil', 'M0 0 C2.5 0  5 2.5  5 5  C5 7.5  5 10  2.5 10  C0 10  0 7.5  0 5  C0 2.5  2.5 0  5 0');\r
    definePathPattern('Square', 'M0 0 M1 0 L7 0 7 6 1 6z');\r
    definePathPattern('Circle', 'M0 3 A3 3 0 1 0 6 4  A3 3 0 1 0 0 3');\r
    definePathPattern('BigCircle', 'M0 5 A5 5 0 1 0 10 5  A5 5 0 1 0 0 5');\r
    definePathPattern('Triangle', 'M0 0 L4 4 0 8z');\r
    definePathPattern('Diamond', 'M0 4 L4 0 8 4 4 8z');\r
    definePathPattern('Dentil', 'M0 0 L2 0  2 6  6 6  6 0  8 0');\r
    definePathPattern('Greek', 'M0 0 L1 0  1 3  0 3  M0 6 L4 6  4 0  8 0  M8 3 L7 3  7 6  8 6');\r
    definePathPattern('Seed', 'M0 0 A9 9 0 0 0 12 0  A9 9 180 0 0 0 0');\r
    definePathPattern('SemiCircle', 'M0 0 A4 4 0 0 1 8 0');\r
    definePathPattern('BlindHem', 'M0 4 L2 4  4 0  6 4  8 4');\r
    definePathPattern('Zipper', 'M0 4 L1 4 1 0 8 0 8 4 9 4  M0 6 L3 6 3 2 6 2 6 6 9 6');\r
    //definePathPattern("Zipper2", "M0 4 L1 4 1 0 8 0 8 4 9 4  M0 7 L3 7 3 3 6 3 6 7 9 7");\r
    definePathPattern('Herringbone', 'M0 2 L2 4 0 6  M2 0 L4 2  M4 6 L2 8');\r
    definePathPattern('Sawtooth', 'M0 3 L4 0 2 6 6 3');\r
\r
    // helper function for creating sequential chains of nodes\r
    function addLinks(patt1a, patt1b, patt2a, patt2b, patt3a, patt3b) {\r
      var arrow = 'OpenTriangle';\r
\r
      var left = { figure: 'Square' };\r
      myDiagram.model.addNodeData(left);\r
      var middle = { figure: 'Circle' };\r
      myDiagram.model.addNodeData(middle);\r
      myDiagram.model.addLinkData({ from: left.key, to: middle.key, patt: patt1a, patt2: patt1b, toArrow: arrow });\r
\r
      if (patt2a) {\r
        var right = { figure: 'Triangle' };\r
        myDiagram.model.addNodeData(right);\r
        myDiagram.model.addLinkData({ from: middle.key, to: right.key, patt: patt2a, patt2: patt2b, toArrow: arrow });\r
\r
        if (patt3a) {\r
          var farright = { figure: 'Diamond' };\r
          myDiagram.model.addNodeData(farright);\r
          myDiagram.model.addLinkData({ from: right.key, to: farright.key, patt: patt3a, patt2: patt3b, toArrow: arrow });\r
        }\r
      }\r
    }\r
\r
    // simple path objects\r
    var it = PathPatterns.iteratorKeys;\r
    while (it.next()) {\r
      addLinks(it.value, '', it.next() ? it.value : '', '', it.next() ? it.value : '');\r
    }\r
    // compound path objects\r
    addLinks('DoubleG', 'CrossG', 'Single', 'CrossR');\r
    addLinks('Dash', 'ZigzagR', 'Dash', 'BigZigzagR');\r
    addLinks('Double', 'ZigzagR', 'Double', 'BigZigzagR');\r
    addLinks('Triple', 'ZigzagR', 'Triple', 'BigZigzagR');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This illustrates how one can define custom strokes for Links (or really any Shape that is relatively straight) by making use of the\r
    <a>Shape.pathPattern</a> property to repeatedly draw a small Shape along the stroke path. These examples may be useful in generating diagrams showing social\r
    or emotional relationships or other cases where it is useful to distinguish kinds of relationships in more manners than just by the\r
    <a>Shape.stroke</a> (color) or <a>Shape.strokeWidth</a> or <a>Shape.strokeDashArray</a>.\r
  </p>\r
  <p>\r
    The first set of link triplets, at the top, demonstrate the basic pathPatterns defined by the <code>definePathPattern</code> function in this page. The last\r
    set of link doublets, at the bottom, demonstrate how those basic pathPatterns can be combined in a single <a>Link</a> that has two <a>Shape</a>s that have\r
    <a>GraphObject.isPanelMain</a> set to true, so that both shapes get the same <a>Geometry</a>\r
    computed by the link. Yet each such link shape draws a different path pattern.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`links`,`treelayout`,`geometries`];var g=y();l(`ob5ulw`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};