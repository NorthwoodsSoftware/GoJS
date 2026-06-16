import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Reshaping of Orthogonal Links and Adding/Removing Segments`,titleShort:`Orthogonal Link Reshaping`,indexDescription:`A custom Tool that lets the user reshape orthogonal links by dragging entire segments.`,screenshot:`orthogonallinkreshaping`,priority:2,tags:[`links`,`tools`,`extensions`,`geometries`],description:`An elaboration of the standard LinkReshapingTool that adds a broad handle to allow the user to easily drag a segment.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  Routing:\r
  <input type="radio" name="routing" id="option1" onclick="updateRouting()" value="orthogonal" />\r
  <label for="option1">Orthogonal</label>\r
  <input type="radio" name="routing" id="option2" onclick="updateRouting()" value="avoidsnodes" checked="checked" />\r
  <label for="option2">AvoidsNodes</label>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true,\r
      linkReshapingTool: new OrthogonalLinkReshapingTool()\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          width: 80,\r
          height: 50,\r
          locationSpot: go.Spot.Center\r
        })\r
        .add(\r
          new go.Shape({ fill: 'lightgray' }),\r
          new go.TextBlock({ margin: 10 })\r
            .bind('text')\r
        )\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify);\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          reshapable: true,\r
          resegmentable: true\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      pointsDigits: 0,\r
      nodeDataArray:\r
      [\r
        { key: 1, text: 'Alpha', location: '0 0' },\r
        { key: 2, text: 'Beta', location: '200 0' },\r
        { key: 3, text: 'Gamma', location: '100 0' }\r
      ],\r
      linkDataArray: [{ from: 1, to: 2 }]\r
    });\r
\r
    myDiagram.addDiagramListener('InitialLayoutCompleted', e => {\r
      // select the Link in order to show its two additional Adornments, for shifting the ends\r
      myDiagram.links.first().isSelected = true;\r
    });\r
  }\r
\r
  function updateRouting() {\r
    var routing = getRadioValue('routing');\r
    var newRouting = routing === 'orthogonal' ? go.Routing.Orthogonal : go.Routing.AvoidsNodes;\r
    myDiagram.startTransaction('update routing');\r
    myDiagram.linkTemplate.routing = newRouting;\r
    myDiagram.links.each(l => {\r
      l.routing = newRouting;\r
    });\r
    myDiagram.commitTransaction('update routing');\r
  }\r
\r
  function getRadioValue(name) {\r
    var radio = document.getElementsByName(name);\r
    for (var i = 0; i < radio.length; i++) if (radio[i].checked) return radio[i].value;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/OrthogonalLinkReshapingTool.js`],descriptionHtml:`<p style="margin-top: 1rem;">\r
    This sample demonstrates the OrthogonalLinkReshapingTool that is defined in its own file, as\r
    <a href="../extensions/OrthogonalLinkReshapingTool.js">OrthogonalLinkReshapingTool.js</a>. This tool allow users to shift the sections of orthogonal links in addition to\r
    resegmenting them. The Diagram's <a>ToolManager.linkReshapingTool</a> and link template's <a>Part.reshapable</a> properties must be set to use this tool.\r
    The <a>Link.resegmentable</a> property can still optionally be used.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`tools`,`extensions`,`geometries`];var g=y();l(`xbid7r`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};