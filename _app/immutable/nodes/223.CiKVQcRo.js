import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Recentering Radial Layout in Concentric Layers`,titleShort:`Radial Layout`,indexDescription:`Arrange people in circles around a central person, in layers according to distance from the central person.`,screenshot:`radial`,priority:2,tags:[`collections`,`tooltips`,`customlayout`,`extensions`],description:`Radial layout of an arbitrary graph given a start node; selecting a node re-lays out using it as a new root node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; background: white; width: 100%; height: 600px"></div>\r
  <label for="maxLayersChanger">Max Layers: </label><input type="text" id="maxLayersChanger" name="maxLayers" style="width: 50px" value="2" />\r
  <button onclick="adjustMaxLayers()">Set Max Layers</button>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      padding: 10,\r
      isReadOnly: true,\r
      layout: new RadialLayout({\r
        maxLayers: 2,\r
        rotateNode: function (node, angle, sweep, radius) {\r
          // method override must be function, not =>\r
          // rotate the nodes and make sure the text is not upside-down\r
          node.angle = angle;\r
          var label = node.findObject('TEXTBLOCK');\r
          if (label !== null) {\r
            label.angle = (angle > 90 && angle < 270) || angle < -90 ? 180 : 0;\r
          }\r
        },\r
        commitLayers: function () {\r
          // method override must be function, not =>\r
          // optional: add circles in the background\r
          // need to remove any old ones first\r
          const diagram = this.diagram;\r
          var gridlayer = diagram.findLayer('Grid');\r
          var circles = new go.Set(/*go.Part*/);\r
          gridlayer.parts.each(circle => {\r
            if (circle.name === 'CIRCLE') circles.add(circle);\r
          });\r
          circles.each(circle => diagram.remove(circle));\r
          // add circles centered at the root\r
          for (var lay = 1; lay <= this.maxLayers; lay++) {\r
            var radius = lay * this.layerThickness;\r
            var circle = new go.Part(\r
              {\r
                name: 'CIRCLE',\r
                layerName: 'Grid',\r
                locationSpot: go.Spot.Center,\r
                location: this.root.location\r
              })\r
              .add(\r
                new go.Shape('Circle', { width: radius * 2, height: radius * 2, fill: 'rgba(200,200,200,0.2)', stroke: null })\r
              );\r
            diagram.add(circle);\r
          }\r
        }\r
      }),\r
      'animationManager.isEnabled': false\r
    });\r
\r
    // shows when hovering over a node\r
    var commonToolTip =\r
      go.GraphObject.build('ToolTip')\r
        .add(\r
          new go.Panel('Vertical', { margin: 3 })\r
            .add(\r
              new go.TextBlock( // bound to node data\r
                { margin: 4, font: 'bold 12pt sans-serif' })\r
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
          locationObjectName: 'SHAPE', // Node.location is the center of the Shape\r
          selectionAdorned: false,\r
          click: nodeClicked,\r
          toolTip: commonToolTip\r
        })\r
        .add(\r
          new go.Shape('Circle', {\r
              name: 'SHAPE',\r
              fill: 'lightgray', // default value, but also data-bound\r
              stroke: 'transparent',\r
              strokeWidth: 2,\r
              desiredSize: new go.Size(20, 20),\r
              portId: '' // so links will go to the shape, not the whole node\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              name: 'TEXTBLOCK',\r
              alignment: go.Spot.Right,\r
              alignmentFocus: go.Spot.Left\r
            })\r
            .bind('text')\r
        );\r
\r
    // this is the root node, at the center of the circular layers\r
    myDiagram.nodeTemplateMap.add('Root',\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          selectionAdorned: false,\r
          toolTip: commonToolTip\r
        })\r
        .add(\r
          new go.Shape('Circle', { fill: 'white' }),\r
          new go.TextBlock({ font: 'bold 12pt sans-serif', margin: 5 })\r
            .bind('text')\r
        )\r
    );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Normal,\r
          curve: go.Curve.Bezier,\r
          selectionAdorned: false,\r
          layerName: 'Background'\r
        })\r
        .add(\r
          new go.Shape({\r
              stroke: 'black', // default value, but is data-bound\r
              strokeWidth: 1\r
            })\r
            .bind('stroke', 'color')\r
        );\r
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
    var someone = nodeDataArray[Math.floor(Math.random() * nodeDataArray.length)];\r
    nodeClicked(null, myDiagram.findNodeForData(someone));\r
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
    // tell the RadialLayout what the root node should be\r
    diagram.layout.root = root;\r
    diagram.layoutDiagram(true);\r
  }\r
\r
  // called when "Set Max Layers" button is clicked\r
  function adjustMaxLayers() {\r
    var newMaxLayers = parseInt(document.getElementById('maxLayersChanger').value);\r
    function isInteger(val) {\r
      return typeof val === 'number' && isFinite(val) && Math.floor(val) === val;\r
    }\r
    if (!isInteger(newMaxLayers) || newMaxLayers < 1 || newMaxLayers > 10) {\r
      alert('Please enter an integer larger than zero and less than or equal to 10.');\r
    } else {\r
      myDiagram.layout.maxLayers = Math.max(1, Math.min(newMaxLayers, 10));\r
      nodeClicked(null, myDiagram.layout.root);\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/RadialLayout.js`],descriptionHtml:`<p>\r
    Click on a Node to center it and show its relationships. It is also easy to add more information to each node, including pictures, or to put such\r
    information into <a href="../intro/tooltips" target="_blank">tooltips</a>.\r
  </p>\r
  <p>\r
    The <code>RadialLayout</code> class is an extension defined at <a href="../extensions/RadialLayout.js">RadialLayout.js</a>. You can control how many layers\r
    to show, whether to draw the circles, and whether to rotate the text, by modifying RadialLayout properties or changing overrides of\r
    <code>RadialLayout.rotateNode</code> and/or <code>RadialLayout.commitLayers</code>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`tooltips`,`customlayout`,`extensions`];var g=y();l(`d7395g`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};