import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Recentering Radial Partition Layout in Concentric Annular Wedges`,titleShort:`Radial Partition`,indexDescription:`Arrange people in rings around a central person, in layers according to distance from the central person.`,screenshot:`radialpartition`,priority:2,tags:[`collections`,`tooltips`,`geometries`,`customlayout`,`extensions`],description:`Arrange people in rings around a central person, in layers according to distance from the central person.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; background: white; width: 100%; height: 600px"></div>`,jsCode:`var layerThickness = 70; // how thick each ring should be\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      isReadOnly: true,\r
      maxSelectionCount: 1,\r
      layout: new RadialLayout({\r
        maxLayers: 5,\r
        layerThickness: layerThickness,\r
        rotateNode: function (node, angle, sweep, radius) {\r
          // method override must be function, not =>\r
          // all nodes are centered at the origin\r
          node.location = this.arrangementOrigin;\r
          // because the Shape.geometry will be centered at the origin --\r
          // see makeAnnularWedge, below\r
          node.diagram.model.set(node.data, 'angle', angle);\r
          node.diagram.model.set(node.data, 'sweep', sweep);\r
          node.diagram.model.set(node.data, 'radius', radius);\r
        }\r
      }),\r
      'animationManager.isEnabled': false\r
    });\r
\r
    var commonToolTip =\r
      go.GraphObject.build('ToolTip')\r
        .add(\r
          new go.Panel('Vertical', { margin: 3 })\r
            .add(\r
              new go.TextBlock({ // bound to node data\r
                  margin: 4,\r
                  font: 'bold 12pt sans-serif'\r
                })\r
                .bind('text'),\r
              new go.TextBlock() // bound to node data\r
                .bind('text', 'color', c => 'Color: ' + c),\r
              new go.TextBlock() // bound to Adornment because of call to Binding.ofObject\r
                .bindObject('text', '', ad => 'Connections: ' + ad.adornedPart.linksConnected.count)\r
            ) // end Vertical Panel\r
        ); // end Adornment\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationSpot: go.Spot.Center,\r
          selectionAdorned: false,\r
          click: nodeClicked,\r
          toolTip: commonToolTip\r
        })\r
        .add(\r
          // this always occupies the full circle\r
          new go.Shape({ fill: 'lightgray', strokeWidth: 0 })\r
            .bind('geometry', '', makeAnnularWedge)\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ width: layerThickness, textAlign: 'center' })\r
            .bind('alignment', '', computeTextAlignment)\r
            .bind('angle', 'angle', ensureUpright)\r
            .bind('text')\r
        );\r
\r
    function makeAnnularWedge(data) {\r
      var angle = data.angle;\r
      var sweep = data.sweep;\r
      var radius = data.radius; // the inner radius\r
      if (angle === undefined || sweep === undefined || radius === undefined) return null;\r
\r
      // the Geometry will be centered about (0,0)\r
      var outer = radius + layerThickness; // the outer radius\r
      var inner = radius;\r
      var p = new go.Point(outer, 0).rotate(angle - sweep / 2);\r
      var q = new go.Point(inner, 0).rotate(angle + sweep / 2);\r
      var geo = new go.Geometry()\r
        .add(new go.PathFigure(-outer, -outer)) // always make sure the Geometry includes the top left corner\r
        .add(new go.PathFigure(outer, outer)) // and the bottom right corner of the whole circular area\r
        .add(\r
          new go.PathFigure(p.x, p.y) // start at outer corner, go clockwise\r
            .add(new go.PathSegment(go.SegmentType.Arc, angle - sweep / 2, sweep, 0, 0, outer, outer))\r
            .add(new go.PathSegment(go.SegmentType.Line, q.x, q.y)) // to opposite inner corner, then anticlockwise\r
            .add(new go.PathSegment(go.SegmentType.Arc, angle + sweep / 2, -sweep, 0, 0, inner, inner).close())\r
        );\r
      return geo;\r
    }\r
\r
    function computeTextAlignment(data) {\r
      var angle = data.angle;\r
      var radius = data.radius;\r
      if (angle === undefined || radius === undefined) return go.Spot.Center;\r
      var p = new go.Point(radius + layerThickness / 2, 0).rotate(angle);\r
      return new go.Spot(0.5, 0.5, p.x, p.y);\r
    }\r
\r
    function ensureUpright(angle) {\r
      if (angle > 90 && angle < 270) return angle + 180;\r
      return angle;\r
    }\r
\r
    // this is the root node, at the center of the circular layers\r
    myDiagram.nodeTemplateMap.add('Root',\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          selectionAdorned: false,\r
          toolTip: commonToolTip,\r
          width: layerThickness * 2,\r
          height: layerThickness * 2\r
        })\r
        .add(\r
          new go.Shape('Circle', {\r
            fill: 'white',\r
            strokeWidth: 0.5,\r
            spot1: go.Spot.TopLeft,\r
            spot2: go.Spot.BottomRight\r
          }),\r
          new go.TextBlock({\r
              font: 'bold 14pt sans-serif',\r
              textAlign: 'center'\r
            })\r
            .bind('text')\r
        )\r
    );\r
\r
    // define the Link template -- don't show anything!\r
    myDiagram.linkTemplate = new go.Link();\r
\r
    generateGraph();\r
  }\r
\r
  function generateGraph() {\r
    var names = [\r
      'Joshua',\r
      'Daniel',\r
      'Robert',\r
      'Noah',\r
      'Anthony',\r
      'Elizabeth',\r
      'Addison',\r
      'Alexis',\r
      'Ella',\r
      'Samantha',\r
      'Joseph',\r
      'Scott',\r
      'James',\r
      'Ryan',\r
      'Benjamin',\r
      'Walter',\r
      'Gabriel',\r
      'Christian',\r
      'Nathan',\r
      'Simon',\r
      'Isabella',\r
      'Emma',\r
      'Olivia',\r
      'Sophia',\r
      'Ava',\r
      'Emily',\r
      'Madison',\r
      'Tina',\r
      'Elena',\r
      'Mia',\r
      'Jacob',\r
      'Ethan',\r
      'Michael',\r
      'Alexander',\r
      'William',\r
      'Natalie',\r
      'Grace',\r
      'Lily',\r
      'Alyssa',\r
      'Ashley',\r
      'Sarah',\r
      'Taylor',\r
      'Hannah',\r
      'Brianna',\r
      'Hailey',\r
      'Christopher',\r
      'Aiden',\r
      'Matthew',\r
      'David',\r
      'Andrew',\r
      'Kaylee',\r
      'Juliana',\r
      'Leah',\r
      'Anna',\r
      'Allison',\r
      'John',\r
      'Samuel',\r
      'Tyler',\r
      'Dylan',\r
      'Jonathan'\r
    ];\r
\r
    var nodeDataArray = [];\r
    for (var i = 0; i < names.length; i++) {\r
      nodeDataArray.push({ key: i, text: names[i], color: go.Brush.randomColor(128, 240) });\r
    }\r
\r
    var linkDataArray = [];\r
    var num = nodeDataArray.length;\r
    for (var i = 0; i < num * 2; i++) {\r
      var a = Math.floor(Math.random() * num);\r
      var b = Math.floor((Math.random() * num) / 4) + 1;\r
      linkDataArray.push({ from: a, to: (a + b) % num, color: go.Brush.randomColor(0, 127) });\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
\r
    // layout based on a random person\r
    var someone = nodeDataArray[Math.floor(Math.random() * nodeDataArray.length)];\r
    var somenode = myDiagram.findNodeForData(someone);\r
    nodeClicked(null, somenode);\r
  }\r
\r
  function nodeClicked(e, root) {\r
    var diagram = root.diagram;\r
    if (diagram === null) return;\r
    // all other nodes should be visible and use the default category\r
    diagram.nodes.each(n => {\r
      n.visible = true;\r
      if (n !== root) n.category = '';\r
    });\r
    // make this Node the root\r
    root.category = 'Root';\r
    // the root node always gets a full circle for itself, just in case the "Root"\r
    // template has any bindings using these properties\r
    diagram.model.set(root.data, 'angle', 0);\r
    diagram.model.set(root.data, 'sweep', 360);\r
    diagram.model.set(root.data, 'radius', 0);\r
    // tell the RadialLayout what the root node should be\r
    // setting this property will automatically invalidate the layout and then perform it again\r
    diagram.layout.root = root;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/RadialLayout.js`],descriptionHtml:`<p>Click on a Node to center it and show its relationships.</p>\r
  <p>\r
    The <code>RadialLayout</code> class is an extension defined at <a href="../extensions/RadialLayout.js">RadialLayout.js</a>. The override of the\r
    <code>RadialLayout.rotateNode</code> sets the <code>angle</code>, <code>sweep</code>, and <code>radius</code> data properties. Bindings in the node template\r
    use those properties to produce the appropriate <a>Shape.geometry</a> and the <a>GraphObject.alignment</a> and <a>GraphObject.angle</a> for each\r
    <a>TextBlock</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`tooltips`,`geometries`,`customlayout`,`extensions`];var g=y();l(`1a5w92c`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};