import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Swim Lane Layout Keeps Nodes in their Lanes`,indexDescription:`A custom Layout that puts nodes into swimlanes with dependencies that cross lanes.`,screenshot:`swimlanelayout`,priority:2,tags:[`customlayout`,`extensions`],description:`TypeScript: SwimLaneLayout, laying out the whole graph while assigning nodes to stay in lanes/groups.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px gray; margin: 10px; height: 700px"></div>\r
  <input type="radio" name="A" onclick="partitionBy('c')" id="conferenceButton" />\r
  <label for="conferenceButton">Conferences</label><br />\r
  <input type="radio" name="A" onclick="partitionBy('d')" id="divisionButton" checked />\r
  <label for="divisionButton">Divisions</label><br />`,jsCode:`var DIRECTION = 90; // used to customize the layout and the templates, only upon first initialization\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // automatically scale the diagram to fit the viewport's size\r
      initialAutoScale: go.AutoScale.Uniform,\r
      // disable user copying of parts\r
      allowCopy: false,\r
      // position all of the nodes and route all of the links\r
      layout: new SwimLaneLayout({\r
        laneProperty: 'group', // needs to know how to assign vertexes/nodes into lanes/groups\r
        direction: DIRECTION, // Group template also depends on DIRECTION\r
        setsPortSpots: false,\r
        layerSpacing: 20,\r
        columnSpacing: 5,\r
        commitLayers: function (layerRects, offset) {\r
          // method override requires function, not =>\r
          if (layerRects.length === 0) return;\r
\r
          var horiz = this.direction === 0 || this.direction === 180;\r
          var forwards = this.direction === 0 || this.direction === 90;\r
\r
          var rect = layerRects[forwards ? layerRects.length - 1 : 0];\r
          var totallength = horiz ? rect.right : rect.bottom;\r
          if (horiz) {\r
            offset.y -= this.columnSpacing*3/2;\r
          } else {\r
            offset.x -= this.columnSpacing*3/2;\r
          }\r
          for (var i = 0; i < this.laneNames.length; i++) {\r
            var lane = this.laneNames[i];\r
            // assume lane names do not conflict with node names\r
            var group = this.diagram.findNodeForKey(lane);\r
            if (group === null) {\r
              this.diagram.model.addNodeData({ key: lane, isGroup: true });\r
              group = this.diagram.findNodeForKey(lane);\r
            }\r
            if (horiz) {\r
              group.location = new go.Point(-this.layerSpacing / 2, this.lanePositions.get(lane) * this.columnSpacing + offset.y);\r
            } else {\r
              group.location = new go.Point(this.lanePositions.get(lane) * this.columnSpacing + offset.x, -this.layerSpacing / 2);\r
            }\r
            var ph = group.findObject('PLACEHOLDER'); // won't be a go.Placeholder, but just a regular Shape\r
            if (ph === null) ph = group;\r
            if (horiz) {\r
              ph.desiredSize = new go.Size(totallength, this.laneBreadths.get(lane) * this.columnSpacing);\r
            } else {\r
              ph.desiredSize = new go.Size(this.laneBreadths.get(lane) * this.columnSpacing, totallength);\r
            }\r
          }\r
        }\r
      })\r
    });\r
\r
    // replace the default Node template in the nodeTemplateMap\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', { // the whole node panel\r
          // when the DIRECTION is vertical, use the whole Node as the port\r
          fromSpot: go.Spot.TopBottomSides,\r
          toSpot: go.Spot.TopBottomSides\r
        })\r
        .add(\r
          new go.TextBlock() // the text label\r
            .bind('text', 'key'),\r
          new go.Picture({ // the icon showing the logo\r
              // You should set the desiredSize (or width and height)\r
              // whenever you know what size the Picture should be.\r
              desiredSize: new go.Size(50, 50),\r
              // when the DIRECTION is horizontal, use this icon as the port\r
              portId: DIRECTION === 0 || DIRECTION === 180 ? '' : null,\r
              fromSpot: go.Spot.LeftRightSides,\r
              toSpot: go.Spot.LeftRightSides\r
            })\r
            .bind('source', 'key', convertKeyImage)\r
        );\r
\r
    function convertKeyImage(key) {\r
      if (!key) key = 'NE';\r
      return 'https://nwoods.com/go/beatpaths/' + key + '_logo-50x50.png';\r
    }\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          curve: go.Curve.Bezier, fromEndSegmentLength: 50, toEndSegmentLength: 50,\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }), // the link shape\r
        );\r
\r
    myDiagram.groupTemplate = // assumes SwimLaneLayout.direction === 0\r
      new go.Group(DIRECTION === 0 || DIRECTION === 180 ? 'Horizontal' : 'Vertical', {\r
          layerName: 'Background', // always behind all regular nodes and links\r
          movable: false, // user cannot move or copy any lanes\r
          copyable: false,\r
          locationObjectName: 'PLACEHOLDER', // this object will be sized and located by SwimLaneLayout\r
          layout: null, // no lane lays out its member nodes\r
          avoidable: false // don't affect any AvoidsNodes link routes\r
        })\r
        .add(\r
          new go.TextBlock({\r
              font: 'bold 12pt sans-serif',\r
              angle: DIRECTION === 0 || DIRECTION === 180 ? 270 : 0\r
            })\r
            .bind('text', 'key'),\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({\r
                fill: 'transparent',\r
                stroke: 'orange'\r
              }),\r
              new go.Shape({\r
                name: 'PLACEHOLDER',\r
                fill: null,\r
                stroke: null,\r
                strokeWidth: 0\r
              })\r
            ),\r
          new go.TextBlock({\r
              font: 'bold 12pt sans-serif',\r
              angle: DIRECTION === 0 || DIRECTION === 180 ? 90 : 0\r
            })\r
            .bind('text', 'key')\r
        );\r
\r
    partitionBy('d');\r
  }\r
\r
  // the array of node data describing each team, each division, and each conference\r
  var nodeDataArray = [\r
    { key: 'AFC', isGroup: true },\r
    { key: 'NFC', isGroup: true },\r
    { key: 'AFCE', isGroup: true },\r
    { key: 'AFCN', isGroup: true },\r
    { key: 'AFCS', isGroup: true },\r
    { key: 'AFCW', isGroup: true },\r
    { key: 'NFCE', isGroup: true },\r
    { key: 'NFCN', isGroup: true },\r
    { key: 'NFCS', isGroup: true },\r
    { key: 'NFCW', isGroup: true },\r
    { key: 'NE', conf: 'AFC', div: 'AFCE' },\r
    { key: 'PIT', conf: 'AFC', div: 'AFCN' },\r
    { key: 'DAL', conf: 'NFC', div: 'NFCE' },\r
    { key: 'CLE', conf: 'AFC', div: 'AFCN' },\r
    { key: 'NYG', conf: 'NFC', div: 'NFCE' },\r
    { key: 'GB', conf: 'NFC', div: 'NFCN' },\r
    { key: 'SEA', conf: 'NFC', div: 'NFCW' },\r
    { key: 'IND', conf: 'AFC', div: 'AFCS' },\r
    { key: 'MIN', conf: 'NFC', div: 'NFCN' },\r
    { key: 'PHI', conf: 'NFC', div: 'NFCE' },\r
    { key: 'DET', conf: 'NFC', div: 'NFCN' },\r
    { key: 'JAC', conf: 'AFC', div: 'AFCS' },\r
    { key: 'SD', conf: 'AFC', div: 'AFCW' },\r
    { key: 'CHI', conf: 'NFC', div: 'NFCN' },\r
    { key: 'TB', conf: 'NFC', div: 'NFCS' },\r
    { key: 'KC', conf: 'AFC', div: 'AFCW' },\r
    { key: 'DEN', conf: 'AFC', div: 'AFCW' },\r
    { key: 'TEN', conf: 'AFC', div: 'AFCS' },\r
    { key: 'BUF', conf: 'AFC', div: 'AFCE' },\r
    { key: 'OAK', conf: 'AFC', div: 'AFCW' },\r
    { key: 'HOU', conf: 'AFC', div: 'AFCS' },\r
    { key: 'ATL', conf: 'NFC', div: 'NFCS' },\r
    { key: 'WAS', conf: 'NFC', div: 'NFCE' },\r
    { key: 'CIN', conf: 'AFC', div: 'AFCN' },\r
    { key: 'NYJ', conf: 'AFC', div: 'AFCE' },\r
    { key: 'CAR', conf: 'NFC', div: 'NFCS' },\r
    { key: 'NO', conf: 'NFC', div: 'NFCS' },\r
    { key: 'BAL', conf: 'AFC', div: 'AFCN' },\r
    { key: 'MIA', conf: 'AFC', div: 'AFCE' },\r
    { key: 'ARI', conf: 'NFC', div: 'NFCW' },\r
    { key: 'STL', conf: 'NFC', div: 'NFCW' },\r
    { key: 'SF', conf: 'NFC', div: 'NFCW' }\r
  ];\r
\r
  // the array of link data objects: the relationships between the nodes\r
  var linkDataArray = [\r
    { from: 'NE', to: 'CLE' },\r
    { from: 'NE', to: 'DAL' },\r
    { from: 'NE', to: 'IND' },\r
    { from: 'PIT', to: 'CLE' },\r
    { from: 'DAL', to: 'NYG' },\r
    { from: 'DAL', to: 'GB' },\r
    { from: 'CLE', to: 'SEA' },\r
    { from: 'NYG', to: 'DET' },\r
    { from: 'GB', to: 'MIN' },\r
    { from: 'GB', to: 'PHI' },\r
    { from: 'SEA', to: 'PHI' },\r
    { from: 'SEA', to: 'CIN' },\r
    { from: 'IND', to: 'TB' },\r
    { from: 'IND', to: 'JAC' },\r
    { from: 'MIN', to: 'SD' },\r
    { from: 'PHI', to: 'NYJ' },\r
    { from: 'DET', to: 'CHI' },\r
    { from: 'DET', to: 'DEN' },\r
    { from: 'JAC', to: 'DEN' },\r
    { from: 'SD', to: 'DEN' },\r
    { from: 'CHI', to: 'OAK' },\r
    { from: 'TB', to: 'TEN' },\r
    { from: 'DEN', to: 'TEN' },\r
    { from: 'DEN', to: 'KC' },\r
    { from: 'DEN', to: 'BUF' },\r
    { from: 'TEN', to: 'OAK' },\r
    { from: 'TEN', to: 'ATL' },\r
    { from: 'TEN', to: 'HOU' },\r
    { from: 'BUF', to: 'WAS' },\r
    { from: 'OAK', to: 'MIA' },\r
    { from: 'HOU', to: 'MIA' },\r
    { from: 'HOU', to: 'CAR' },\r
    { from: 'WAS', to: 'NYJ' },\r
    { from: 'WAS', to: 'ARI' },\r
    { from: 'CIN', to: 'BAL' },\r
    { from: 'NYJ', to: 'MIA' },\r
    { from: 'CAR', to: 'ARI' },\r
    { from: 'CAR', to: 'STL' },\r
    { from: 'CAR', to: 'SF' },\r
    { from: 'NO', to: 'SF' },\r
    { from: 'BAL', to: 'STL' },\r
    { from: 'BAL', to: 'SF' }\r
  ];\r
\r
  function partitionBy(a) {\r
    // create the model and assign it to the Diagram\r
    var model = new go.GraphLinksModel();\r
    // depending on how we are partitioning the graph, each node belongs either\r
    // to a conference group or to a division group\r
    model.nodeGroupKey = a === 'c' ? 'conf' : 'div';\r
    model.nodeDataArray = nodeDataArray;\r
    model.linkDataArray = linkDataArray;\r
    // each node's lane information is the same as the group information\r
    myDiagram.layout.laneProperty = model.nodeGroupKey;\r
    // optionally, specify the order of known lane names, without setting laneComparer\r
    myDiagram.layout.laneNames = a === 'c' ? ['AFC', 'NFC'] : ['AFCE', 'AFCN', 'AFCS', 'AFCW', 'NFCE', 'NFCN', 'NFCS', 'NFCW'];\r
    myDiagram.model = model;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/SwimLaneLayout.js`],descriptionHtml:`<p><b>Beat Paths</b>: The 2007 NFL Season, divided by conference or by division</p>\r
  <p>\r
    This sample uses the <code>SwimLaneLayout</code> from\r
    <a href="../extensions/SwimLaneLayout.js">SwimLaneLayout.js</a>\r
    to place <a>Node</a>s into swim lanes based on 2007 NFL season data. To do\r
    this it overwites <a>Layout.commitLayers</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`customlayout`,`extensions`];var g=y();l(`grrtj9`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};