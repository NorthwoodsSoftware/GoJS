import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Beat Paths, Graphs Showing Win Relationships Between Teams`,titleShort:`Beat Paths`,indexDescription:`Demonstrates reading JSON data describing the relative rankings of NFL teams at a particular moment in time and generating a diagram from that data.`,screenshot:`beatpaths`,priority:2,tags:[`layered-digraph`],description:`A precedence diagram showing a hierarchical relationship between nodes, using archetypeNodeData, LayeredDigraphLayout, and Bezier curved links.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; margin: 10px; height: 700px"></div>`,jsCode:`function init() {\r
    // Must name or refer to the DIV HTML element\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // automatically scale the diagram to fit the viewport's size\r
      initialAutoScale: go.AutoScale.Uniform,\r
      // disable user copying of parts\r
      allowCopy: false,\r
      // position all of the nodes and route all of the links\r
      layout: new go.LayeredDigraphLayout({\r
        direction: 90,\r
        layerSpacing: 10,\r
        columnSpacing: 15,\r
        setsPortSpots: false\r
      })\r
    });\r
\r
    // replace the default Node template in the nodeTemplateMap\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical') // the whole node panel\r
        .add(\r
          new go.TextBlock()\r
            .bind('text', 'key'),\r
          new go.Picture( {  // the icon showing the logo\r
              // You should set the desiredSize (or width and height)\r
              // whenever you know what size the Picture should be.\r
              desiredSize: new go.Size(75, 50)\r
            })\r
            .bind('source', 'key', convertKeyImage)\r
        );\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({ curve: go.Curve.Bezier, toShortLength: 2 }) // the whole link panel\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }), // the link shape\r
          new go.Shape({ toArrow: 'Standard', stroke: null }) // the arrowhead\r
        );\r
\r
    // the array of link data objects: the relationships between the nodes\r
    const linkDataArray = [\r
      { from: 'CAR', to: 'ARI' },\r
      { from: 'ARI', to: 'CIN' },\r
      { from: 'ARI', to: 'GB' },\r
      { from: 'DEN', to: 'GB' },\r
      { from: 'DEN', to: 'CIN' },\r
      { from: 'DEN', to: 'NE' },\r
      { from: 'GB', to: 'WAS' },\r
      { from: 'WAS', to: 'STL' },\r
      { from: 'CIN', to: 'STL' },\r
      { from: 'STL', to: 'SEA' },\r
      { from: 'SEA', to: 'SF' },\r
      { from: 'SEA', to: 'MIN' },\r
      { from: 'NE', to: 'NYG' },\r
      { from: 'NE', to: 'KC' },\r
      { from: 'MIN', to: 'DET' },\r
      { from: 'MIN', to: 'KC' },\r
      { from: 'KC', to: 'HOU' },\r
      { from: 'KC', to: 'BUF' },\r
      { from: 'KC', to: 'BAL' },\r
      { from: 'KC', to: 'OAK' },\r
      { from: 'BUF', to: 'NYJ' },\r
      { from: 'BAL', to: 'PIT' },\r
      { from: 'DET', to: 'NO' },\r
      { from: 'DET', to: 'PHI' },\r
      { from: 'DET', to: 'CHI' },\r
      { from: 'HOU', to: 'JAC' },\r
      { from: 'HOU', to: 'TEN' },\r
      { from: 'PIT', to: 'IND' },\r
      { from: 'PIT', to: 'SD' },\r
      { from: 'OAK', to: 'NYJ' },\r
      { from: 'OAK', to: 'SD' },\r
      { from: 'NO', to: 'ATL' },\r
      { from: 'NO', to: 'NYG' },\r
      { from: 'PHI', to: 'NYG' },\r
      { from: 'CHI', to: 'TB' },\r
      { from: 'NYJ', to: 'IND' },\r
      { from: 'NYJ', to: 'CLE' },\r
      { from: 'IND', to: 'TB' },\r
      { from: 'TB', to: 'ATL' },\r
      { from: 'SD', to: 'CLE' },\r
      { from: 'ATL', to: 'DAL' },\r
      { from: 'ATL', to: 'JAC' },\r
      { from: 'CLE', to: 'TEN' },\r
      { from: 'DAL', to: 'MIA' },\r
      { from: 'MIA', to: 'TEN' }\r
    ];\r
\r
    // create the model and assign it to the Diagram\r
    myDiagram.model = new go.GraphLinksModel({\r
      // automatically create node data objects for each "from" or "to" reference\r
      // (set this property before setting the linkDataArray)\r
      archetypeNodeData: {},\r
      // process all of the link relationship data\r
      linkDataArray: linkDataArray\r
    });\r
  }\r
\r
  function convertKeyImage(key) {\r
    if (!key) key = 'NE';\r
    return 'https://nwoods.com/go/beatpaths/' + key + '_logo-75x50.png';\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates reading JSON data describing the relative rankings of NFL teams during\r
    the 2015 season and generating a diagram from that data. The ranking information came from\r
    beatgraphs.com.\r
  </p>\r
  <p>\r
    The JSON data is basically just a list of relationships. Unlike most model data, there are no\r
    elements describing the nodes -- the node definitions are implicit in the references from the\r
    links. Hence the <a>Diagram.model</a> has <a>GraphLinksModel.archetypeNodeData</a> set to a\r
    JavaScript object.\r
  </p>\r
  <p>\r
    The node template uses the <b>convertKeyImage</b> function to convert the team name into a URI\r
    referring to an image on our web site.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`layered-digraph`];var g=y();l(`15rmkoz`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};