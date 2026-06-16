import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Euler Diagrams Show Sets and Varied Relationships`,titleShort:`Euler Diagram`,indexDescription:`A read-only diagram where clicking on a node will open a new webpage.`,screenshot:`euler`,priority:2,tags:[`extensions`],description:`A diagram showing nodes connected by different kinds of links with concentric circular backgrounds.  Clicking on a node opens a window to a Wikipedia page.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      isReadOnly: true, allowSelect: false,\r
      contentAlignment: go.Spot.Center\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .bind('location', 'loc', go.Point.parse)\r
        .add(\r
          new go.Shape('Ellipse', { fill: 'transparent' })\r
            .bind('stroke', 'color')\r
            .bind('strokeWidth', 'width')\r
            .bind('strokeDashArray', 'dash'),\r
          go.GraphObject.build('HyperlinkText', {\r
              margin: 1,\r
              maxSize: new go.Size(80, 80),\r
              textAlign: 'center'\r
            },\r
            node => 'https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(node.data.text),\r
            node => node.data.text\r
          )\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('center',\r
      new go.Node('Spot', { locationSpot: go.Spot.Center })\r
        .bind('location', 'loc', go.Point.parse)\r
        .add(\r
          new go.Shape('Circle', {\r
            fill: 'rgba(128,128,128,0.1)',\r
            stroke: 'lightgray',\r
            width: 550,\r
            height: 550\r
          }),\r
          new go.Shape('Circle', {\r
            fill: 'rgba(128,128,128,0.1)',\r
            stroke: 'lightgray',\r
            width: 400,\r
            height: 400\r
          }),\r
          new go.Shape('Circle', {\r
            fill: 'rgba(128,128,128,0.1)',\r
            stroke: 'lightgray',\r
            width: 250,\r
            height: 250\r
          }),\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Circle', {\r
                  isPanelMain: true,\r
                  fill: 'transparent',\r
                  portId: ''\r
                })\r
                .bind('stroke', 'hicolor')\r
                .bind('strokeWidth', 'hiwidth'),\r
              new go.Shape('Circle', {\r
                  isPanelMain: true,\r
                  fill: 'transparent'\r
                })\r
                .bind('stroke', 'color')\r
                .bind('strokeWidth', 'width')\r
                .bind('strokeDashArray', 'dash'),\r
              go.GraphObject.build('HyperlinkText', {\r
                  margin: 1,\r
                  maxSize: new go.Size(80, 80),\r
                  textAlign: 'center'\r
                },\r
                node => 'https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(node.data.text),\r
                node => node.data.text\r
              )\r
            )\r
        )\r
    );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link()\r
        .add(\r
          new go.Shape()\r
            .bind('stroke', 'color')\r
            .bind('strokeWidth', 'width')\r
            .bind('strokeDashArray', 'dash')\r
        );\r
\r
    const nodeDataArray = [\r
      { key: 1, text: 'Cognitive Procedural', loc: '300 300', category: 'center' },\r
      { key: 2, text: 'Cognitive Problem Solving', loc: '600 300', category: 'center', hicolor: 'lightblue', hiwidth: 7 },\r
      { key: 11, text: 'Logical Reasoning', loc: '450 275' },\r
      { key: 12, text: 'Scaffolding', loc: '450 325' },\r
      { key: 13, text: 'Part Task Training', loc: '425 400' },\r
      { key: 21, text: 'Training Wheels', loc: '325 125' },\r
      { key: 22, text: 'Exploratory Learning', loc: '250 150' },\r
      { key: 23, text: 'Learner Control', loc: '650 150' },\r
      { key: 31, text: 'Overlearning', loc: '450 475' }\r
    ];\r
    const linkDataArray = [\r
      { from: 1, to: 11, color: 'gray' },\r
      { from: 1, to: 12, color: 'gray', dash: [3, 2] },\r
      { from: 1, to: 13, color: 'olive', width: 2 },\r
      { from: 1, to: 21, color: 'olive', width: 3 },\r
      { from: 1, to: 22, color: 'olive', width: 2 },\r
      { from: 1, to: 23, color: 'crimson', width: 2 },\r
      { from: 1, to: 31 },\r
      { from: 2, to: 11, color: 'gray' },\r
      { from: 2, to: 12, color: 'olive', width: 2 },\r
      { from: 2, to: 13, color: 'gray', dash: [3, 2] },\r
      { from: 2, to: 21, color: 'crimson', width: 2 },\r
      { from: 2, to: 22, color: 'crimson', width: 2 },\r
      { from: 2, to: 23, color: 'black', width: 3 },\r
      { from: 2, to: 31, color: 'black', dash: [3, 2] }\r
    ];\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/HyperlinkText.js`],descriptionHtml:`<p>\r
    A sample of a Euler diagram: that is, a means of representing various sets and their relationships with one another. Euler diagrams have much in common with\r
    Venn diagrams. This diagram is read-only, but clicking on a node will search Wikipedia with a query string generated from the "text" property of the node\r
    data.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`extensions`];var g=y();l(`13aynse`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};