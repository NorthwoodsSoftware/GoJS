import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Linking Via Repeated Clicks to Determine Path of New Link`,titleShort:`Polyline Linking`,indexDescription:`A custom LinkingTool that lets the user determine the route of a new Link by clicking.`,screenshot:`polylinelinking`,priority:2,tags:[`links`,`tools`,`extensions`],description:`Let the user draw a new link by clicking consecutive points through which the link's route must pass.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "pointsDigits": 1,\r
  "nodeDataArray": [\r
    { "key": 1, "text": "Node 1", "fill": "blueviolet", "loc": "100 100" },\r
    { "key": 2, "text": "Node 2", "fill": "orange", "loc": "400 100" }\r
  ],\r
  "linkDataArray": [  ]\r
}\r
  </textarea>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // install custom linking tool, defined in PolylineLinkingTool.js\r
      linkingTool: new PolylineLinkingTool(),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) { if (idx < 0) document.title += '*'; }\r
      else { if (idx >= 0) document.title = document.title.slice(0, idx); }\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', { locationSpot: go.Spot.Center })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
              width: 100,\r
              height: 100,\r
              fill: 'lightgray',\r
              portId: '',\r
              cursor: 'pointer',\r
              fromLinkable: true,\r
              fromLinkableSelfNode: true,\r
              fromLinkableDuplicates: true, // optional\r
              toLinkable: true,\r
              toLinkableSelfNode: true,\r
              toLinkableDuplicates: true // optional\r
            })\r
            .bind('fill'),\r
          new go.Shape({ width: 70, height: 70, fill: 'transparent', stroke: null }),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          reshapable: true, resegmentable: true,\r
          adjusting: go.LinkAdjusting.Stretch // optional\r
        })\r
        .bindTwoWay('points', 'points')\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'OpenTriangle' })\r
        );\r
\r
    load(); // load a simple diagram from the textarea\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/PolylineLinkingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates the PolylineLinkingTool, which replaces the standard LinkingTool. The tool is defined in its own file, as\r
    <a href="../extensions/PolylineLinkingTool.js">PolylineLinkingTool.js</a>.\r
  </p>\r
  <p>\r
    The user starts drawing a new link from a node in the normal manner, by dragging from a port, which for feedback purposes has a "pointer" cursor. Normally\r
    the user would have to release the mouse near the target port/node. However with the PolylineLinkingTool the user may click at various points to cause the\r
    new link to be routed along those points. Clicking on the target port completes the new link. Press <b>Escape</b> to cancel, or <b>Z</b> to remove the last\r
    point.\r
  </p>\r
  <p>\r
    Furthermore, because <a>Link.resegmentable</a> is true, the user can easily add or remove segments from the route of a selected link. To insert a segment,\r
    the user can start dragging the small diamond resegmenting handle. To remove a segment, the user needs to move a regular reshaping handle to cause the\r
    adjacent two segments to be in a straight line.\r
  </p>\r
  <p>\r
    The PolylineLinkingTool also works with orthogonally routed links. To demonstrate this, uncomment the two lines that initialize <a>Link.routing</a> to be\r
    <a>Routing.Orthogonal</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`tools`,`extensions`];var g=y();l(`1b674i3`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};