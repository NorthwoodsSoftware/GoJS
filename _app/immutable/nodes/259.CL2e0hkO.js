import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`State Chart Diagram Editor with Labeled Transition Links`,titleShort:`State Chart Editor`,indexDescription:`A state chart diagram that also shows dynamic creation of new nodes and links on a button press.`,screenshot:`statechart`,priority:.5,tags:[`buttons`,`process`],description:`A finite state machine chart with editable and interactive features.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 470px; background: whitesmoke"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeKeyProperty": "id",\r
  "pointsDigits": 0,\r
  "nodeDataArray": [\r
  {"id":-1, "loc":"155 -150", "type":"Start", "text":"Start" },\r
  {"id":0, "loc":"190 15", "text":"Shopping"},\r
  {"id":1, "loc":"353 32", "text":"Browse Items"},\r
  {"id":2, "loc":"353 166", "text":"Search Items"},\r
  {"id":3, "loc":"552 12", "text":"View Item"},\r
  {"id":4, "loc":"700 -95", "text":"View Cart"},\r
  {"id":5, "loc":"660 100", "text":"Update Cart"},\r
  {"id":6, "loc":"850 20", "text":"Checkout"},\r
  {"id":-2, "loc":"830 200", "type":"End", "text":"End" }\r
  ],\r
  "linkDataArray": [\r
    { "from": -1, "to": 0, "progress": true, "text": "Visit online store", "curviness": -10 },\r
    { "from": 0, "to": 1,  "progress": true, "text": "Browse" },\r
    { "from": 0, "to": 2,  "progress": true, "text": "Use search bar", "curviness": -70 },\r
    { "from": 1, "to": 2,  "progress": true, "text": "Use search bar" },\r
    { "from": 2, "to": 3,  "progress": true, "text": "Click item", "curviness": -70 },\r
    { "from": 2, "to": 2,  "progress": false, "text": "Another search", "curviness": 40 },\r
    { "from": 1, "to": 3,  "progress": true, "text": "Click item" },\r
    { "from": 3, "to": 0,  "progress": false, "text": "Not interested", "curviness": -100 },\r
    { "from": 3, "to": 4,  "progress": true, "text": "Add to cart" },\r
    { "from": 4, "to": 0,  "progress": false, "text": "More shopping", "curviness": -150 },\r
    { "from": 4, "to": 5,  "progress": false, "text": "Update needed", "curviness": 70 },\r
    { "from": 5, "to": 4,  "progress": false, "text": "Update made" },\r
    { "from": 4, "to": 6,  "progress": true, "text": "Proceed" },\r
    { "from": 6, "to": 5,  "progress": false, "text": "Update needed"},\r
    { "from": 6, "to": -2, "progress": true, "text": "Purchase made" }\r
  ]\r
}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      padding: 12,\r
      'animationManager.initialAnimationStyle': go.AnimationStyle.None,\r
      InitialAnimationStarting: e => {\r
        var animation = e.subject.defaultAnimation;\r
        animation.easing = go.Animation.EaseOutExpo;\r
        animation.duration = 800;\r
        animation.add(e.diagram, 'scale', 0.3, 1);\r
        animation.add(e.diagram, 'opacity', 0, 1);\r
      },\r
\r
      // have mouse wheel events zoom in and out instead of scroll up and down\r
      'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,\r
      // support double-click in background creating a new node\r
      'clickCreatingTool.archetypeNodeData': { text: 'new node' },\r
      // enable undo & redo\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // when the document is modified, add a "*" to the title and enable the "Save" button\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
    });\r
\r
    const colors = {\r
      pink: '#facbcb',\r
      blue: '#b7d8f7',\r
      green: '#b9e1c8',\r
      yellow: '#faeb98',\r
      background: '#e8e8e8'\r
    };\r
    const colorsDark = {\r
      green: '#3fab76',\r
      yellow: '#f4d90a',\r
      blue: '#0091ff',\r
      pink: '#e65257',\r
      background: '#161616'\r
    };\r
    myDiagram.div.style.backgroundColor = colors.background;\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          isShadowed: true,\r
          shadowBlur: 0,\r
          shadowOffset: new go.Point(5, 5),\r
          shadowColor: 'black'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              strokeWidth: 1.5,\r
              fill: colors.blue,\r
              portId: '',\r
              fromLinkable: true, fromLinkableSelfNode: false, fromLinkableDuplicates: true,\r
              toLinkable: true, toLinkableSelfNode: false, toLinkableDuplicates: true,\r
              cursor: 'pointer'\r
            })\r
            .bind('fill', 'type', type => {\r
              if (type === 'Start') return colors.green;\r
              if (type === 'End') return colors.pink;\r
              return colors.blue;\r
            })\r
            .bind('figure', 'type', type => {\r
              if (type === 'Start' || type === 'End') return 'Circle';\r
              return 'RoundedRectangle';\r
            }),\r
          new go.TextBlock({\r
              font: 'bold small-caps 11pt helvetica, bold arial, sans-serif',\r
              shadowVisible: false,\r
              margin: 8,\r
              font: 'bold 14px sans-serif',\r
              stroke: '#333',\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    // unlike the normal selection Adornment, this one includes a Button\r
    myDiagram.nodeTemplate.selectionAdornmentTemplate =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', { fill: null, stroke: colors.pink, strokeWidth: 3 }),\r
              new go.Placeholder() // a Placeholder sizes itself to the selected Node\r
            ),\r
\r
          // the button to create a "next" node, at the top-right corner\r
          go.GraphObject.build('Button', {\r
              alignment: go.Spot.TopRight,\r
              click: addNodeAndLink // this function is defined below\r
            })\r
            .add(\r
              new go.Shape('PlusLine', { width: 6, height: 6 })\r
            ) // end button\r
        );\r
\r
    // clicking the button inserts a new node to the right of the selected node,\r
    // and adds a link to that new node\r
    function addNodeAndLink(e, obj) {\r
      var adornment = obj.part;\r
      var diagram = e.diagram;\r
      diagram.startTransaction('Add State');\r
\r
      // get the node data for which the user clicked the button\r
      var fromNode = adornment.adornedPart;\r
      var fromData = fromNode.data;\r
      // create a new "State" data object, positioned off to the right of the adorned Node\r
      var toData = { text: 'new' };\r
      var p = fromNode.location.copy();\r
      p.x += 200;\r
      toData.loc = go.Point.stringify(p); // the "loc" property is a string, not a Point object\r
      // add the new node data to the model\r
      var model = diagram.model;\r
      model.addNodeData(toData);\r
\r
      // create a link data from the old node data to the new node data\r
      var linkdata = {\r
        from: model.getKeyForNodeData(fromData), // or just: fromData.id\r
        to: model.getKeyForNodeData(toData),\r
        text: 'transition'\r
      };\r
      // and add the link data to the model\r
      model.addLinkData(linkdata);\r
\r
      // select the new Node\r
      var newnode = diagram.findNodeForData(toData);\r
      diagram.select(newnode);\r
      diagram.commitTransaction('Add State');\r
      // if the new node is off-screen, scroll the diagram to show the new node\r
      if (!diagram.viewportBounds.containsRect(newnode.actualBounds)) {\r
        diagram.commandHandler.scrollToPart(newnode);\r
      }\r
    }\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          // shadow options are for the label, not the link itself\r
          isShadowed: true,\r
          shadowBlur: 0,\r
          shadowColor: 'black',\r
          shadowOffset: new go.Point(2.5, 2.5),\r
\r
          curve: go.Curve.Bezier,\r
          curviness: 40,\r
          adjusting: go.LinkAdjusting.Stretch,\r
          reshapable: true,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          fromShortLength: 8,\r
          toShortLength: 10\r
        })\r
        .bindTwoWay('points')\r
        .bind('curviness')\r
        .add(\r
          // Main shape geometry\r
          new go.Shape({ strokeWidth: 2, shadowVisible: false, stroke: 'black' })\r
            .bind('strokeDashArray', 'progress', progress => progress ? [] : [5, 6])\r
            .bind('opacity', 'progress', progress => progress ? 1 : 0.5),\r
          // Arrowheads\r
          new go.Shape({ fromArrow: 'circle', strokeWidth: 1.5, fill: 'white' })\r
            .bind('opacity', 'progress', progress => progress ? 1 : 0.5),\r
          new go.Shape({ toArrow: 'standard', stroke: null, scale: 1.5, fill: 'black' })\r
            .bind('opacity', 'progress', progress => progress ? 1 : 0.5),\r
          // The link label\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', {\r
                shadowVisible: true,\r
                fill: colors.yellow,\r
                strokeWidth: 0.5\r
              }),\r
              new go.TextBlock({\r
                  font: '9pt helvetica, arial, sans-serif',\r
                  margin: 1,\r
                  editable: true, // enable in-place editing\r
                  text: 'Action' // default text\r
                })\r
                .bind('text')\r
              // editing the text automatically updates the model data\r
            )\r
        );\r
\r
    // read in the JSON data from the "mySavedModel" element\r
    load();\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample creates a state chart to story-board an online shopping experience.</p>\r
  <p>\r
    The text is editable for both the <a>Node</a>s and the <a>Link</a>s.\r
    The user can draw as many links from one <a>Node</a> to another <a>Node</a> as desired.\r
    To create a new <a>Link</a> start dragging from the edge of a <a>Node</a>.\r
    The <a>Link</a>s can be reshaped or deleted when selected.\r
    Double-clicking in the background of the <a>Diagram</a> creates a new node.\r
    The mouse wheel is set to zoom in and out instead of scroll.\r
  </p>\r
  <p>\r
    This sample customizes the <a>Part.selectionAdornmentTemplate</a> of the node to a template that contains a button.\r
    The button is positioned to be at the Top-Right corner of the node by being in a Spot Panel with\r
    its <a>GraphObject.alignment</a> property set to Spot.TopRight.\r
  </p>\r
  <p>\r
    The Button's <a>GraphObject.click</a> method creates a new node data, adds it to the model,\r
    and creates a link from the original node data to the new node data.\r
    All of this is done inside a transaction, so that it can be undone by the user\r
    (Ctrl+Z and Ctrl+Y will undo and redo transactions).\r
    After the node is created, <a>CommandHandler.scrollToPart</a> is called to try to center it.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`buttons`,`process`];var g=y();l(`1x0800c`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};