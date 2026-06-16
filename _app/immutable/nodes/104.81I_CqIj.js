import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Concept Map Showing Idea Nodes Connected by Relationship Links Laid out by Force Directed Layout`,titleShort:`Concept Map`,indexDescription:`A web of interlinked concepts displayed with a ForceDirected Layout, showcasing link labels.`,screenshot:`conceptmap`,priority:2,tags:[`force-directed`],description:`A concept map diagram implemented with labeled links and ForceDirectedLayout.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 700px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform, // an initial automatic zoom-to-fit\r
      contentAlignment: go.Spot.Center, // align document to the center of the viewport\r
      layout: new go.ForceDirectedLayout({ // automatically spread nodes apart\r
        defaultElectricalCharge: 300,\r
        defaultSpringLength: 150\r
      })\r
    });\r
\r
    // define each Node's appearance\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { // the whole node panel\r
          locationSpot: go.Spot.Center\r
        })\r
        .add(\r
          // define the node's outer shape, which will surround the TextBlock\r
          new go.Shape('Rectangle', {\r
            fill: new go.Brush('Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }),\r
            stroke: 'black'\r
          }),\r
          new go.TextBlock({ font: 'bold 10pt helvetica, bold arial, sans-serif', margin: 4 })\r
            .bind('text')\r
        );\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link() // the whole link panel\r
        .add(\r
          new go.Shape({ stroke: 'black' }), // the link shape\r
          new go.Shape({ toArrow: 'standard', stroke: null }), // the arrowhead\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ // the label background, which becomes transparent around the edges\r
                fill: new go.Brush('Radial', {\r
                  0: 'rgb(240, 240, 240)',\r
                  0.3: 'rgb(240, 240, 240)',\r
                  1: 'rgba(240, 240, 240, 0)'\r
                }),\r
                stroke: null\r
              }),\r
              new go.TextBlock({ // the label text\r
                  textAlign: 'center',\r
                  font: '10pt helvetica, arial, sans-serif',\r
                  stroke: '#555555',\r
                  margin: 4\r
                })\r
                .bind('text')\r
            )\r
        );\r
\r
    // create the model for the concept map\r
    const nodeDataArray = [\r
      { key: 1, text: 'Concept Maps' },\r
      { key: 2, text: 'Organized Knowledge' },\r
      { key: 3, text: 'Context Dependent' },\r
      { key: 4, text: 'Concepts' },\r
      { key: 5, text: 'Propositions' },\r
      { key: 6, text: 'Associated Feelings or Affect' },\r
      { key: 7, text: 'Perceived Regularities' },\r
      { key: 8, text: 'Labeled' },\r
      { key: 9, text: 'Hierarchically Structured' },\r
      { key: 10, text: 'Effective Teaching' },\r
      { key: 11, text: 'Crosslinks' },\r
      { key: 12, text: 'Effective Learning' },\r
      { key: 13, text: 'Events (Happenings)' },\r
      { key: 14, text: 'Objects (Things)' },\r
      { key: 15, text: 'Symbols' },\r
      { key: 16, text: 'Words' },\r
      { key: 17, text: 'Creativity' },\r
      { key: 18, text: 'Interrelationships' },\r
      { key: 19, text: 'Infants' },\r
      { key: 20, text: 'Different Map Segments' }\r
    ];\r
    const linkDataArray = [\r
      { from: 1, to: 2, text: 'represent' },\r
      { from: 2, to: 3, text: 'is' },\r
      { from: 2, to: 4, text: 'is' },\r
      { from: 2, to: 5, text: 'is' },\r
      { from: 2, to: 6, text: 'includes' },\r
      { from: 2, to: 10, text: 'necessary\\nfor' },\r
      { from: 2, to: 12, text: 'necessary\\nfor' },\r
      { from: 4, to: 5, text: 'combine\\nto form' },\r
      { from: 4, to: 6, text: 'include' },\r
      { from: 4, to: 7, text: 'are' },\r
      { from: 4, to: 8, text: 'are' },\r
      { from: 4, to: 9, text: 'are' },\r
      { from: 5, to: 9, text: 'are' },\r
      { from: 5, to: 11, text: 'may be' },\r
      { from: 7, to: 13, text: 'in' },\r
      { from: 7, to: 14, text: 'in' },\r
      { from: 7, to: 19, text: 'begin\\nwith' },\r
      { from: 8, to: 15, text: 'with' },\r
      { from: 8, to: 16, text: 'with' },\r
      { from: 9, to: 17, text: 'aids' },\r
      { from: 11, to: 18, text: 'show' },\r
      { from: 12, to: 19, text: 'begins\\nwith' },\r
      { from: 17, to: 18, text: 'needed\\nto see' },\r
      { from: 18, to: 20, text: 'between' }\r
    ];\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    A concept map sample depicting various suggested relationships between different ideas. See also\r
    the\r
    <a href="interactiveForce">Interactive Force</a> sample that uses the exact same data but a\r
    different node template and an interactive <a>ForceDirectedLayout</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`force-directed`];var g=y();l(`6mk7dv`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};