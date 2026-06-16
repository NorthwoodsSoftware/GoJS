import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Dragging Link Label along Path`,indexDescription:`A custom Tool that lets the user drag a label on a Link and that keeps the label along the path of the link.`,screenshot:`linklabelonpathdragging`,priority:2,tags:[`tools`,`extensions`],description:`This variation on the LinkLabelDraggingTool extension restricts link labels to stay on the link's route while the user is dragging it.`},htmlContent:`<div id="myDiagramDiv" style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.ForceDirectedLayout({ defaultSpringLength: 50, defaultElectricalCharge: 50 }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // install the LinkLabelDraggingTool as a "mouse move" tool\r
    myDiagram.toolManager.mouseMoveTools.insertAt(0, new LinkLabelOnPathDraggingTool());\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape({\r
              fill: 'orange', // default fill color\r
              portId: '',\r
              fromLinkable: true,\r
              fromSpot: go.Spot.AllSides,\r
              toLinkable: true,\r
              toSpot: go.Spot.AllSides,\r
              cursor: 'pointer'\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 10, font: 'bold 12pt sans-serif' })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 5,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          resegmentable: true\r
        })\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'OpenTriangle' }),\r
          new go.Panel('Auto', {\r
              // mark this Panel as being a draggable label, and set default segment props\r
              segmentIndex: NaN, segmentFraction: 0.5\r
            })\r
            .attach({ // GraphObject.attach() is used to set non-predefined properties\r
              _isLinkLabel: true\r
            })\r
            // remember any modified segment properties in the link data object\r
            .bindTwoWay('segmentFraction')\r
            .add(\r
              new go.Shape({ fill: 'white' }),\r
              new go.TextBlock('?', { margin: 3 })\r
                .bind('text', 'color')\r
            )\r
        );\r
\r
    // create a few nodes and links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'one', color: 'lightyellow' },\r
        { key: 2, text: 'two', color: 'brown' },\r
        { key: 3, text: 'three', color: 'green' },\r
        { key: 4, text: 'four', color: 'slateblue' },\r
        { key: 5, text: 'five', color: 'aquamarine' },\r
        { key: 6, text: 'six', color: 'lightgreen' },\r
        { key: 7, text: 'seven' }\r
      ],\r
      [\r
        { from: 5, to: 6, color: 'orange' },\r
        { from: 1, to: 2, color: 'red' },\r
        { from: 1, to: 3, color: 'blue' },\r
        { from: 1, to: 4, color: 'goldenrod' },\r
        { from: 2, to: 5, color: 'fuchsia' },\r
        { from: 3, to: 5, color: 'green' },\r
        { from: 4, to: 5, color: 'black' },\r
        { from: 6, to: 7 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/LinkLabelOnPathDraggingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates a custom Tool, LinkLabelOnPathDraggingTool, that allows the user to drag the label of a Link, but that keeps the label exactly on\r
    the path of the link. The tool is defined at <a href="../extensions/LinkLabelOnPathDraggingTool.js">LinkLabelOnPathDraggingTool.js</a>.\r
  </p>\r
  <p>\r
    The label on the link can be any arbitrarily complex object. It is positioned by the <a>GraphObject.segmentIndex</a> and\r
    <a>GraphObject.segmentFraction</a> properties. The segmentIndex is set to NaN such that the whole link path acts as the segment, and the segmentFraction is\r
    set by the LinkLabelOnPathDraggingTool. A two-way data binding on segmentFraction automatically remembers any modified value on the link data object in the\r
    model.\r
  </p>\r
  <p>\r
    The tool is derived from a similar tool, <a href="../extensions/LinkLabelDraggingTool.js">LinkLabelDraggingTool.js</a>, that allows the user to drag the label in any\r
    direction from the mid-point of the Link path.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`l1e8yi`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};