import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Animation of Tokens along Link Paths`,indexDescription:`Animation of diagram parts (tokens) along link paths.`,screenshot:`pathanimation`,priority:2,tags:[`collections`,`force-directed`,`animation`],description:`Animating diagram parts to travel along link paths from one node to another.`},htmlContent:`<div id="myDiagramDiv" style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 700px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform, // an initial automatic zoom-to-fit\r
      contentAlignment: go.Spot.Center, // align document to the center of the viewport\r
      layout: new go.ForceDirectedLayout({ // automatically spread nodes apart\r
        defaultElectricalCharge: 300,\r
        defaultSpringLength: 150\r
      }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // define each Node's appearance\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .add(\r
          // define the node's outer shape, which will surround the TextBlock\r
          new go.Shape('Rectangle', { fill: new go.Brush('Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }) }),\r
          new go.TextBlock({ font: 'bold 10pt helvetica, bold arial, sans-serif', margin: new go.Margin(4, 4, 3, 20) })\r
            .bind('text')\r
        );\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({ // the whole link panel\r
          // path animation works with these kinds of links too:\r
          // routing: go.Routing.AvoidsNodes,\r
          // curve: go.Curve.Bezier,\r
        })\r
        .add(\r
          new go.Shape(), // the link shape\r
          new go.Shape({ toArrow: 'standard', stroke: null }), // the arrowhead\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ // the label background, which becomes transparent around the edges\r
                fill: new go.Brush('Radial', { 0: 'rgb(240, 240, 240)', 0.3: 'rgb(240, 240, 240)', 1: 'rgba(240, 240, 240, 0)' }),\r
                strokeWidth: 0\r
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
    myDiagram.nodeTemplateMap.add('token',\r
      new go.Part({ locationSpot: go.Spot.Center, layerName: 'Foreground' })\r
        .add(\r
          new go.Shape('Circle', { width: 12, height: 12, fill: 'green', strokeWidth: 0 })\r
            .bind('fill', 'color')\r
        )\r
    );\r
\r
    // create the model for the concept map\r
    var nodeDataArray = [\r
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
    var linkDataArray = [\r
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
\r
    initTokens();\r
  }\r
\r
  function initTokens() {\r
    var oldskips = myDiagram.skipsUndoManager;\r
    myDiagram.skipsUndoManager = true;\r
    myDiagram.model.addNodeDataCollection([\r
      { category: 'token', at: 1, color: 'green' },\r
      { category: 'token', at: 2, color: 'blue' },\r
      { category: 'token', at: 4, color: 'yellow' },\r
      { category: 'token', at: 5, color: 'purple' },\r
      { category: 'token', at: 7, color: 'red' },\r
      { category: 'token', at: 8, color: 'black' },\r
      { category: 'token', at: 9, color: 'green' },\r
      { category: 'token', at: 11, color: 'blue' },\r
      { category: 'token', at: 12, color: 'yellow' },\r
      { category: 'token', at: 17, color: 'purple' },\r
      { category: 'token', at: 18, color: 'red' }\r
    ]);\r
    myDiagram.skipsUndoManager = oldskips;\r
    window.requestAnimationFrame(updateTokens);\r
  }\r
\r
  function updateTokens() {\r
    var oldskips = myDiagram.skipsUndoManager;\r
    myDiagram.skipsUndoManager = true; // don't record these changes in the UndoManager!\r
    var temp = new go.Point();\r
    myDiagram.parts.each(token => {\r
      var data = token.data;\r
      if (!data) return;\r
      var at = data.at;\r
      if (at === undefined) return;\r
      var from = myDiagram.findNodeForKey(at);\r
      if (from === null) return;\r
      var frac = data.frac;\r
      if (frac === undefined) frac = 0.0;\r
      var next = data.next;\r
      var to = myDiagram.findNodeForKey(next);\r
      if (to === null) {\r
        // nowhere to go?\r
        positionTokenAtNode(token, from); // temporarily stay at the current node\r
        data.next = chooseDestination(token, from); // and decide where to go next\r
      } else {\r
        // proceed toward the "to" port\r
        var link = from.findLinksTo(to).first();\r
        if (link !== null) {\r
          token.location = link.path.getDocumentPoint(link.path.geometry.getPointAlongPath(frac, temp));\r
        } else {\r
          // stay at the current node\r
          positionTokenAtNode(token, from);\r
        }\r
        if (frac >= 1.0) {\r
          // if beyond the end, it's "AT" the NEXT node\r
          data.frac = 0.0;\r
          data.at = next;\r
          data.next = undefined; // don't know where to go next\r
        } else {\r
          // otherwise, move fractionally closer to the NEXT node\r
          data.frac = frac + 0.01;\r
        }\r
      }\r
    });\r
    myDiagram.skipsUndoManager = oldskips;\r
    window.requestAnimationFrame(updateTokens);\r
  }\r
\r
  // determine where to position a token when it is resting at a node\r
  function positionTokenAtNode(token, node) {\r
    // these details depend on the node template\r
    token.location = node.position.copy().offset(4 + 6, 5 + 6);\r
  }\r
\r
  function chooseDestination(token, node) {\r
    var dests = new go.List().addAll(node.findNodesOutOf());\r
    if (dests.count > 0) {\r
      var dest = dests.elt(Math.floor(Math.random() * dests.count));\r
      return dest.data.key;\r
    }\r
    var arr = myDiagram.model.nodeDataArray;\r
    // choose a random next data object that is not a token and is not the current Node\r
    var data = null;\r
    while (((data = arr[Math.floor(Math.random() * arr.length)]), data.category === 'token' || data === node.data)) {}\r
    return data.key;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample is copied from the <a href="conceptMap">Concept Map</a> sample and augmented with tokens that traverse the graph, stopping at nodes and\r
    travelling along links.\r
  </p>\r
  <p>Note that the creation and movement of the tokens is <i>not</i> recorded by the <a>UndoManager</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`force-directed`,`animation`];var g=y();l(`vazq4c`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};