import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`All Predefined Arrowheads for Links`,indexDescription:`Showcases all pre-defined Link arrowheads. You can define your own named arrowhead geometries.`,screenshot:`arrowheads`,priority:2,tags:[`links`,`circularlayout`,`tooltips`,`geometries`],description:`Show all of the predefined kinds of arrowheads for links, which can be used by setting Shape.toArrow or Shape.fromArrow.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       Also add a border to help see the edges. -->\r
  <div\r
    id="myDiagramDiv"\r
    style="border: solid 1px black; background-color: #101920; width: 100%; height: 600px;"></div>\r
  <div id="myArrowheadInfo" style="color: red"></div>`,jsCode:`function init() {\r
    const colors = {\r
      gold: '#f3e601',\r
      white: '#FFFFFF',\r
      black: '#101920'\r
    };\r
\r
    var myDiagram = new go.Diagram('myDiagramDiv', {\r
      hoverDelay: 50,\r
      isReadOnly: true, // don't allow move or delete\r
      layout: new go.CircularLayout({\r
        radius: 100, // minimum radius\r
        spacing: 14, // circular nodes will touch each other\r
        nodeDiameterFormula: go.CircularNodeDiameterFormula.Circular, // assume nodes are circular\r
        startAngle: 270 // first node will be at top\r
      }),\r
      // define a DiagramEvent listener\r
      LayoutCompleted: e => {\r
        // now that the CircularLayout has finished, we know where its center is\r
        var cntr = myDiagram.findNodeForKey('Center');\r
        cntr.location = myDiagram.layout.actualCenter;\r
      }\r
    });\r
\r
    // these are the nodes that are in a circle\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          locationSpot: go.Spot.Center,\r
          click: showArrowInfo, // defined below\r
          // define a tooltip for each link that displays its information\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4 })\r
                  .bindObject('text', '', infoString)\r
              )\r
        })\r
        .add(\r
          new go.Shape('Circle', {\r
            desiredSize: new go.Size(25, 25),\r
            fill: 'transparent',\r
            strokeWidth: 1.5,\r
            stroke: colors.gold\r
          })\r
        );\r
\r
    // use a special template for the center node\r
    myDiagram.nodeTemplateMap.add('Center',\r
      new go.Node('Spot', {\r
          selectable: false,\r
          isLayoutPositioned: false, // the Diagram.layout will not position this node\r
          locationSpot: go.Spot.Center\r
        })\r
        .add(\r
          new go.Shape('Circle', {\r
            fill: 'transparent',\r
            strokeWidth: 1.5,\r
            stroke: colors.gold,\r
            desiredSize: new go.Size(250, 250)\r
          }),\r
          new go.TextBlock('Select or hover over\\na Node or Link\\nto see arrowhead names', {\r
            margin: 1,\r
            textAlign: 'center',\r
            stroke: colors.white,\r
            font: '16px Segoe UI, Roboto, Helvetica Neue, Noto Sans, sans-serif'\r
          })\r
        )\r
    );\r
\r
    // all Links have both "toArrow" and "fromArrow" Shapes,\r
    // where both arrow properties are data bound\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          // the whole link panel\r
          routing: go.Routing.Normal,\r
          click: showArrowInfo,\r
          // define a tooltip for each link that displays its information\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4 })\r
                  .bindObject('text', '', infoString)\r
              )\r
        })\r
        .add(\r
          // the link shape\r
          // the first element in a Link is assumed to be main element\r
          new go.Shape({ stroke: colors.white, strokeWidth: 1.5, strokeDashArray: [2, 5] }),\r
          // the "from" arrowhead\r
          new go.Shape({ scale: 2, stroke: colors.white, fill: colors.black })\r
            .bind('fromArrow'),\r
          // the "to" arrowhead\r
          new go.Shape({ scale: 2, stroke: colors.white, fill: colors.black })\r
            .bind('toArrow')\r
        );\r
\r
    // collect all of the predefined arrowhead names\r
    var arrowheads = go.Shape.getArrowheadGeometries().toKeySet().toArray();\r
    if (arrowheads.length % 2 === 1) arrowheads.push(''); // make sure there's an even number\r
\r
    // create all of the link data, two arrowheads per link\r
    var linkdata = [];\r
    var i = 0;\r
    for (var j = 0; j < arrowheads.length; j = j + 2) {\r
      linkdata.push({\r
        from: 'Center',\r
        to: i++,\r
        toArrow: arrowheads[j],\r
        fromArrow: arrowheads[j + 1]\r
      });\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      // this gets copied automatically when there's a link data reference to a new node key\r
      // and is then added to the nodeDataArray\r
      archetypeNodeData: {},\r
      // the node array starts with just the special Center node\r
      nodeDataArray: [{ category: 'Center', key: 'Center' }],\r
      // the link array was created above\r
      linkDataArray: linkdata\r
    });\r
  }\r
\r
  // a conversion function used to get arrowhead information for a Part\r
  function infoString(obj) {\r
    var part = obj.part;\r
    if (part instanceof go.Adornment) part = part.adornedPart;\r
    var msg = '';\r
    if (part instanceof go.Link) {\r
      var link = part;\r
      msg = 'toArrow: ' + link.data.toArrow + '\\nfromArrow: ' + link.data.fromArrow;\r
    } else if (part instanceof go.Node) {\r
      var node = part;\r
      var link = node.linksConnected.first();\r
      msg = 'toArrow: ' + link.data.toArrow + '\\nfromArrow: ' + link.data.fromArrow;\r
    }\r
    return msg;\r
  }\r
\r
  // a GraphObject.click event handler to show arrowhead information\r
  function showArrowInfo(e, obj) {\r
    var msg = infoString(obj);\r
    if (msg) {\r
      var status = document.getElementById('myArrowheadInfo');\r
      if (status) status.textContent = msg;\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample displays all predefined GoJS arrowheads. Select or hover over a Node or its Link to\r
    see the names of the arrowheads on the Link.\r
  </p>\r
  <p>\r
    Each Link shows two arrowheads. The Link template has a Shape whose\r
    <a>Shape.toArrow</a> property is bound to an arrowhead name. A different Shape in the template\r
    has its <a>Shape.fromArrow</a> property bound to a different arrowhead name. Each arrowhead has\r
    been scaled up to make it more easily visible.\r
  </p>\r
  <p>\r
    See the definitions of all these arrowheads in the file:\r
    <a href="../extensions/Arrowheads.js" target="_blank">Arrowheads.js</a>.\r
  </p>\r
  <p>For predefined shape geometries, see the <a href="shapes">Shapes</a> sample.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`circularlayout`,`tooltips`,`geometries`];var g=y();l(`83w3m5`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};