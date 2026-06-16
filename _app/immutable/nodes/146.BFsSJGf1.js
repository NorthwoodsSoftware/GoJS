import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Friend Wheel Diagram for Elliptical Arrangement of Nodes and Curved Links Inside Ellipse`,titleShort:`Friend Wheel`,indexDescription:`Demonstrates a customized CircularLayout.`,screenshot:`friendwheel`,priority:2,tags:[`circularlayout`,`customlayout`],description:`Show the relationships between people using a friend wheel diagram, implemented using circular layout.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; background: white; width: 100%; height: 600px"></div>`,jsCode:`class WheelLayout extends go.CircularLayout {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // override makeNetwork to set the diameter of each node and ignore the TextBlock label\r
    makeNetwork(coll) {\r
      const net = super.makeNetwork(coll);\r
      net.vertexes.each(v => v.diameter = 25); // pretend nodes are 25x25 in size\r
      return net;\r
    }\r
\r
    // override commitNodes to rotate nodes so the text goes away from the center,\r
    // and flip text if it would be upside-down\r
    commitNodes() {\r
      super.commitNodes();\r
      const num = this.network.vertexes.count;\r
      if (num < 2) return;\r
      this.network.vertexes.each(v => {\r
        const node = v.node;\r
        if (node === null) return;\r
        // get the angle of the node towards the center, and rotate it accordingly\r
        const a = v.actualAngle;\r
        // make sure the text isn't upside down\r
        const textBlock = node.findObject('TEXTBLOCK');\r
        if (textBlock !== null) {\r
          textBlock.angle = (a > 90 && a < 270) ? 180 : 0;\r
        }\r
        node.angle = a;\r
      });\r
    }\r
\r
    // override commitLinks in order to make sure all of the Bezier links are "inside" the ellipse;\r
    // this helps avoid links crossing over any other nodes\r
    commitLinks() {\r
      super.commitLinks();\r
      this.network.edges.each(e => {\r
        const link = e.link;\r
        if (link === null) return;\r
        let da = e.toVertex.actualAngle;\r
        let sa = e.fromVertex.actualAngle;\r
        if (da - sa > 180) da -= 360;\r
        else if (sa - da > 180) sa -= 360;\r
        let c = sa - da;\r
        if (c < 0) c = Math.max(-60, Math.min(c, -30));\r
        else c = Math.max(30, Math.min(c, 60));\r
        link.curviness = c;\r
      });\r
    }\r
  }\r
  // end WheelLayout class\r
\r
  const highlightColor = 'red'; // color parameterization\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      initialAutoScale: go.AutoScale.Uniform,\r
      padding: 10,\r
      contentAlignment: go.Spot.Center,\r
      layout: new WheelLayout({ // set up a custom CircularLayout\r
        // set some properties appropriate for this sample\r
        arrangement: go.CircularArrangement.ConstantDistance,\r
        nodeDiameterFormula: go.CircularNodeDiameterFormula.Circular,\r
        spacing: 10,\r
        aspectRatio: 0.7,\r
        sorting: go.CircularSorting.Optimized\r
      }),\r
      isReadOnly: true,\r
      click: e => {\r
        // background click clears any remaining highlighteds\r
        e.diagram.commit(d => d.clearHighlighteds());\r
      }\r
    });\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Horizontal', {\r
          selectionAdorned: false,\r
          locationSpot: go.Spot.Center, // Node.location is the center of the Shape\r
          locationObjectName: 'SHAPE',\r
          mouseEnter: (e, node) => {\r
            e.diagram.clearHighlighteds();\r
            node.linksConnected.each(l => highlightLink(l, true));\r
            node.isHighlighted = true;\r
            const tb = node.findObject('TEXTBLOCK');\r
            if (tb !== null) tb.stroke = highlightColor;\r
          },\r
          mouseLeave: (e, node) => {\r
            e.diagram.clearHighlighteds();\r
            const tb = node.findObject('TEXTBLOCK');\r
            if (tb !== null) tb.stroke = 'black';\r
          }\r
        })\r
        .bind('text', 'text') // for sorting the nodes\r
        .add(\r
          new go.Shape('Circle', {\r
              name: 'SHAPE',\r
              fill: 'lightgray', // default value, but also data-bound\r
              stroke: 'transparent', // modified by highlighting\r
              strokeWidth: 2,\r
              desiredSize: new go.Size(25, 25),\r
              portId: ''\r
            }) // so links will go to the shape, not the whole node\r
            .bind('fill', 'color')\r
            .bindObject('stroke', 'isHighlighted', h => h ? highlightColor : 'transparent'),\r
          new go.TextBlock({ name: 'TEXTBLOCK' }) // for search\r
            .bind('text', 'text')\r
        );\r
\r
    function highlightLink(link, show) {\r
      link.isHighlighted = show;\r
      link.fromNode.isHighlighted = show;\r
      link.toNode.isHighlighted = show;\r
    }\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          // routing: go.Routing.Orthogonal,\r
          curve: go.Curve.Bezier,\r
          selectionAdorned: false,\r
          mouseEnter: (e, link) => highlightLink(link, true),\r
          mouseLeave: (e, link) => highlightLink(link, false)\r
        })\r
        .add(\r
          new go.Shape()\r
            .bindObject('stroke', 'isHighlighted', (h, shape) => h ? highlightColor : go.Brush.darken(shape.part.data.color))\r
            .bindObject('strokeWidth', 'isHighlighted', h => h ? 3 : 1.5)\r
          // no arrowhead -- assume directionality of relationship need not be shown\r
        );\r
\r
    generateGraph();\r
  }\r
\r
  function generateGraph() {\r
    const names = [\r
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
    const colors = ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'];\r
    const nodeDataArray = [];\r
    for (let i = 0; i < names.length; i++) {\r
      nodeDataArray.push({ key: i, text: names[i], color: colors[i % colors.length] });\r
    }\r
\r
    const linkDataArray = [];\r
    const num = nodeDataArray.length;\r
    for (let i = 0; i < num * 2; i++) {\r
      const a = Math.floor(Math.random() * num);\r
      const b = Math.floor((Math.random() * num) / 4) + 1;\r
      linkDataArray.push({ from: a, to: (a + b) % num, color: colors[i % colors.length] });\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This "friend wheel" demonstrates the use of <a>CircularLayout</a>. The layout has been customized to make sure each node is considered to have a fixed\r
    diameter, ignoring the size of any <a>TextBlock</a>.\r
  </p>\r
  <p>\r
    The custom layout also rotates each <a>Node</a> according to the actual angle at which the node was positioned. This information is available on the\r
    <a>CircularVertex</a> used by the <a>LayoutNetwork</a> that the <a>CircularLayout</a> constructs from the nodes and links of the diagram. Furthermore, when\r
    laying out the nodes it also flips the angle of the <a>TextBlock</a> so that the text is not upside-down.\r
  </p>\r
  <p>\r
    <a>GraphObject.mouseEnter</a> and <a>GraphObject.mouseLeave</a> event handlers on the <a>Node</a> template highlight both the Node and all of the Links that\r
    connect with the Node. The same event handlers on the <a>Link</a>s highlight that Link and both connected Nodes. Changes made in these event handlers\r
    automatically are not recorded in the <a>UndoManager</a>, although this sample does not enable the UndoManager anyway.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`circularlayout`,`customlayout`];var g=y();l(`il2bsc`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};