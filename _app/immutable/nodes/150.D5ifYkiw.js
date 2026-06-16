import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Geometry Reshaping Tool for Interactive Reshaping of Shape Geometries`,titleShort:`Geometry Reshaping`,indexDescription:`A custom Tool that supports interactive reshaping of Geometries.`,screenshot:`geometryreshaping`,priority:2,tags:[`tools`,`extensions`,`geometries`],description:`Allow the user to change a Shape by dragging a handle at a point of the Shape's Geometry.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 550px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool({ isResegmenting: true }));\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          rotatable: true,\r
          rotationSpot: go.Spot.Center,\r
          reshapable: true // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"\r
        })\r
        .add(\r
          new go.Shape({\r
              name: 'SHAPE',\r
              fill: 'lightgray',\r
              strokeWidth: 1.5\r
            })\r
            .bindTwoWay('geometryString', 'geo')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel([\r
      { geo: 'F M20 0 40 20 20 40 0 20z' },\r
      { geo: 'F M0 145 L75 8 C100 20 120 40 131 87 C160 70 180 50 195 0 L249 133z' }\r
    ]);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/GeometryReshapingTool.js`],descriptionHtml:`<p>\r
    The GeometryReshapingTool class allows for a Shape's Geometry to be modified by the user via the dragging of tool handles. Reshape handles are drawn as\r
    Adornments at each point in the geometry. It is defined in its own file, as <a href="../extensions/GeometryReshapingTool.js">GeometryReshapingTool.js</a>.\r
  </p>\r
  <p>Usage can also be seen in the <a href="FreehandDrawing">Freehand Drawing</a> and <a href="PolygonDrawing">Polygon Drawing</a> samples.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`,`geometries`];var g=y();l(`1tvjbmq`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};