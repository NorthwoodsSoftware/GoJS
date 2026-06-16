import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Dragging Image of Selection Rather Than Moving Them in Realtime`,titleShort:`NonRealtime Dragging`,indexDescription:`A custom DraggingTool that lets the user drag a translucent image of the Nodes and Links to be moved, leaving them in place until the mouse up.`,screenshot:`nonrealtimedragging`,priority:2,tags:[`tools`,`extensions`],description:`A modification of DraggingTool to show a ghost image of what is being moved, rather than moving the nodes and links in realtime.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // install the replacement DraggingTool:\r
      draggingTool: new NonRealtimeDraggingTool({ duration: 600 }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto',{ locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape('Circle', {\r
              fill: 'white', // the default fill, if there is no data-binding\r
              portId: '',\r
              cursor: 'pointer', // the Shape is the port, not the whole Node\r
              // allow all kinds of links from and to this port\r
              fromLinkable: true,\r
              fromLinkableSelfNode: true,\r
              fromLinkableDuplicates: true,\r
              toLinkable: true,\r
              toLinkableSelfNode: true,\r
              toLinkableDuplicates: true\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              font: 'bold 14px sans-serif',\r
              stroke: '#333',\r
              margin: 6, // make some extra space for the shape around the text\r
              isMultiline: false, // don't allow newlines in text\r
              editable: true // allow in-place editing by user\r
            })\r
            .bindTwoWay('text') // the label shows the node data's text\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen', group: 5 },\r
        { key: 4, text: 'Delta', color: 'pink', group: 5 },\r
        { key: 5, text: 'Epsilon', color: 'green', isGroup: true }\r
      ],\r
      [\r
        { from: 1, to: 2, color: 'blue' },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4, color: 'green' },\r
        { from: 3, to: 1, color: 'purple' }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/NonRealtimeDraggingTool.js`],descriptionHtml:`<p>\r
    This custom <a>DraggingTool</a> class causes the user to drag around a translucent image of the Nodes and Links being moved, leaving the selected Parts in\r
    place, rather than actually moving those Nodes and Links in realtime. Only when the mouse up occurs does the move happen.\r
  </p>\r
  <p>This tool is defined in its own file, as <a href="../extensions/NonRealtimeDraggingTool.js">NonRealtimeDraggingTool.js</a></p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`h17u40`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};