import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Shifting Link Connection Points along Side of Node`,titleShort:`Shifting Link Connections`,indexDescription:`A custom Tool that adds handles on Links to allow the user to shift the end point of the Link along the sides of the port without disconnecting it.`,screenshot:`linkshifting`,priority:2,tags:[`links`,`tools`,`extensions`,`geometries`],description:`Allow the user to shift the end of a link that is connected with a rectangular node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
    myDiagram.toolManager.mouseDownTools.add(new LinkShiftingTool());\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
            fill: 'lightgray',\r
            portId: '', cursor: 'pointer',\r
            fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,\r
            fromLinkable: true, toLinkable: true\r
          }),\r
          new go.TextBlock({ margin: 10 })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          reshapable: true,\r
          resegmentable: true,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          adjusting: go.LinkAdjusting.Stretch\r
        })\r
        // remember the (potentially) user-modified route\r
        .bindTwoWay('points')\r
        // remember any spots modified by LinkShiftingTool\r
        .bindTwoWay('fromSpot', 'fromSpot', go.Spot.parse, go.Spot.stringify)\r
        .bindTwoWay('toSpot', 'toSpot', go.Spot.parse, go.Spot.stringify)\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      pointsDigits: 0,\r
      nodeDataArray:\r
      [\r
        { key: 1, text: 'Alpha', location: '0 0' },\r
        { key: 2, text: 'Beta', location: '0 100' },\r
        { key: 3, text: 'Gamma', location: '-100 50' },\r
        { key: 4, text: 'Delta', location: '100 50' }\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/LinkShiftingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates the LinkShiftingTool, which is an extra tool that can be installed in the ToolManager to allow users to shift the end point of the\r
    link to be anywhere along the sides of the port with which it remains connected. This extension tool is defined in its own file, as\r
    <a href="../extensions/LinkShiftingTool.js">LinkShiftingTool.js</a>.\r
  </p>\r
  <p>\r
    This only looks good for ports that occupy the whole of a rectangular node. If you want to restrict the user's permitted sides, you can adapt the\r
    <code>LinkShiftingTool.doReshape</code> method to do what you want.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`tools`,`extensions`,`geometries`];var g=y();l(`6mglgd`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};