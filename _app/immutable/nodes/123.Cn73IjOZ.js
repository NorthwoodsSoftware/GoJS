import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Multiple Concentric Circles of Nodes Laid out by Circular Layout`,titleShort:`Double Circle`,indexDescription:`Multiple circles using repeated CircularLayouts.`,screenshot:`doublecircle`,priority:2,tags:[`collections`,`circularlayout`],description:`Arrange nodes into concentric circles using CircularLayout.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      'animationManager.isEnabled': false\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .bind('width')\r
        .bind('height', 'width')\r
        .add(\r
          new go.Shape('Circle', { fill: 'gray', stroke: '#D8D8D8' })\r
            .bind('fill', 'color'),\r
          // define the node's text\r
          new go.TextBlock({ margin: 5, font: 'bold 12pt sans-serif' })\r
            .bind('text', 'key')\r
        );\r
\r
    // create the model for the double circle\r
    const data = [];\r
    // if you want a node in the center, set its layer: 0\r
    //data.push({ layer: 0, width: 50 });\r
    for (let i = 0; i < 10; i++) data.push({ layer: 1, color: 'tomato', width: 50 + Math.random() * 50 });\r
    for (let i = 0; i < 20; i++) data.push({ layer: 2, color: 'orange', width: 50 + Math.random() * 50 });\r
    for (let i = 0; i < 15; i++) data.push({ layer: 3, color: 'gold', width: 50 + Math.random() * 50 });\r
    //for (let i = 0; i < 10; i++) data.push({ layer: 4, color: "lightgreen", width: 50 + Math.random()*50 });\r
    //for (let i = 0; i < 5; i++) data.push({ layer: 5, color: "lightblue", width: 50 + Math.random()*50 });\r
    myDiagram.model = new go.GraphLinksModel(data);\r
\r
    doubleCircleLayout(myDiagram);\r
  }\r
\r
  function doubleCircleLayout(diagram) {\r
    diagram.startTransaction('Multi Circle Layout');\r
\r
    let radius = NaN;\r
    let layer = 1;\r
    let nodes = null;\r
    while (((nodes = nodesByLayer(diagram, layer)), nodes.count > 0)) {\r
      const layout = new go.CircularLayout();\r
      layout.nodeDiameterFormula = go.CircularLayout.Circular;\r
      layout.radius = radius;\r
      layout.doLayout(nodes);\r
      // recenter at (0, 0)\r
      const cntr = layout.actualCenter;\r
      diagram.moveParts(nodes, new go.Point(-cntr.x, -cntr.y));\r
      // next layout uses a larger radius\r
      let t = 0; // compute how thick the layer needs to be\r
      nodes.each(n => (t = Math.max(t, n.actualBounds.width)));\r
      radius = Math.max(isNaN(radius) ? 0 : radius, layout.actualXRadius) + 10 + t;\r
      layer++;\r
    }\r
\r
    nodesByLayer(diagram, 0).each(n => { n.location = new go.Point(0, 0) });\r
\r
    diagram.commitTransaction('Multi Circle Layout');\r
  }\r
\r
  function nodesByLayer(diagram, layer) {\r
    return new go.Set(diagram.nodes.filter(n => n.data.layer === layer));\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample displays a diagram of two or more sets of nodes intended to be arranged in concentric circles. Note how because there are so many nodes in layer\r
    #2, with the orange nodes, its radius has to be larger than the radius of the inner layer #1 in order to avoid overlapping nodes. And the outer layer #3,\r
    with the gold nodes, there is greater space between the nodes because there are fewer nodes and the radius is larger.\r
  </p>\r
  <p>\r
    Unlike many <b>GoJS</b> apps, there is no <a>Diagram.layout</a> assigned. Layouts are performed explicitly in code -- a separate <a>CircularLayout</a> for\r
    each subset of nodes. Each layout's radius is determined by the <a>CircularLayout.actualXRadius</a> of the previous layout, except the first one which uses\r
    a radius of <code>NaN</code>, letting the nodes in layer #1 determine the natural radius that is required to avoid node overlaps.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`circularlayout`];var g=y();l(`e4ee`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};