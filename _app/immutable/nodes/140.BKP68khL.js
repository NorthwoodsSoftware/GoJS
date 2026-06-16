import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Fishbone Layout of Cause-and-Effect Diagrams for Root Cause Analysis`,titleShort:`Fishbone Layout`,indexDescription:`The Fishbone or Ishikawa layout is a tree layout for cause-and-effect relationships.`,screenshot:`fishbone`,priority:2,tags:[`collections`,`links`,`treelayout`,`customlayout`,`extensions`],description:`Cause-and-effect diagrams using FishboneLayout, also known as Ishikawa or herringbone diagrams.`},htmlContent:`<div id="myDiagramDiv" style="height: 550px; width: 100%; border: 1px solid black"></div>\r
  <div id="buttons">\r
    <label>Layout:</label>\r
    <button onclick="layoutFishbone()">Fishbone</button>\r
    <button onclick="layoutBranching()">Branching</button>\r
    <button onclick="layoutNormal()">Normal</button>\r
  </div>\r
  <br />`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      isReadOnly: true // do not allow the user to modify the diagram\r
    });\r
\r
    // define the normal node template, just some text\r
    myDiagram.nodeTemplate =\r
      new go.Node()\r
        .add(\r
          new go.TextBlock()\r
            .bind('text')\r
            .bind('font', '', convertFont)\r
        )\r
\r
    function convertFont(data) {\r
      var size = data.size;\r
      if (size === undefined) size = 13;\r
      var weight = data.weight;\r
      if (weight === undefined) weight = '';\r
      return weight + ' ' + size + 'px sans-serif';\r
    }\r
\r
    // This demo switches the Diagram.linkTemplate between the "normal" and the "fishbone" templates.\r
    // If you are only doing a FishboneLayout, you could just set Diagram.linkTemplate\r
    // to the template named "fishbone" here, and not switch templates dynamically.\r
\r
    // define the non-fishbone link template\r
    myDiagram.linkTemplateMap.add('normal',\r
      new go.Link({\r
          routing: go.Routing.Orthogonal,\r
          corner: 4\r
        })\r
        .add(\r
          new go.Shape()\r
        ));\r
\r
    // use this link template for fishbone layouts\r
    myDiagram.linkTemplateMap.add('fishbone',\r
      new FishboneLink() // defined above\r
        .add(\r
          new go.Shape()\r
        ));\r
\r
    // here is the structured data used to build the model\r
    var json = {\r
      text: 'Incorrect Deliveries',\r
      size: 18,\r
      weight: 'Bold',\r
      causes: [\r
        {\r
          text: 'Skills',\r
          size: 14,\r
          weight: 'Bold',\r
          causes: [\r
            {\r
              text: 'knowledge',\r
              weight: 'Bold',\r
              causes: [\r
                {\r
                  text: 'procedures',\r
                  causes: [{ text: 'documentation' }]\r
                },\r
                { text: 'products' }\r
              ]\r
            },\r
            { text: 'literacy', weight: 'Bold' }\r
          ]\r
        },\r
        {\r
          text: 'Procedures',\r
          size: 14,\r
          weight: 'Bold',\r
          causes: [\r
            {\r
              text: 'manual',\r
              weight: 'Bold',\r
              causes: [{ text: 'consistency' }]\r
            },\r
            {\r
              text: 'automated',\r
              weight: 'Bold',\r
              causes: [{ text: 'correctness' }, { text: 'reliability' }]\r
            }\r
          ]\r
        },\r
        {\r
          text: 'Communication',\r
          size: 14,\r
          weight: 'Bold',\r
          causes: [\r
            { text: 'ambiguity', weight: 'Bold' },\r
            {\r
              text: 'sales staff',\r
              weight: 'Bold',\r
              causes: [\r
                {\r
                  text: 'order details',\r
                  causes: [{ text: 'lack of knowledge' }]\r
                }\r
              ]\r
            },\r
            {\r
              text: 'telephone orders',\r
              weight: 'Bold',\r
              causes: [{ text: 'lack of information' }]\r
            },\r
            {\r
              text: 'picking slips',\r
              weight: 'Bold',\r
              causes: [{ text: 'details' }, { text: 'legibility' }]\r
            }\r
          ]\r
        },\r
        {\r
          text: 'Transport',\r
          size: 14,\r
          weight: 'Bold',\r
          causes: [\r
            {\r
              text: 'information',\r
              weight: 'Bold',\r
              causes: [\r
                { text: 'incorrect person' },\r
                {\r
                  text: 'incorrect addresses',\r
                  causes: [\r
                    {\r
                      text: 'customer data base',\r
                      causes: [{ text: 'not up-to-date' }, { text: 'incorrect program' }]\r
                    }\r
                  ]\r
                },\r
                { text: 'incorrect dept' }\r
              ]\r
            },\r
            {\r
              text: 'carriers',\r
              weight: 'Bold',\r
              causes: [{ text: 'efficiency' }, { text: 'methods' }]\r
            }\r
          ]\r
        }\r
      ]\r
    };\r
\r
    function walkJson(obj, arr) {\r
      var key = arr.length;\r
      obj.key = key;\r
      arr.push(obj);\r
\r
      var children = obj.causes;\r
      if (children) {\r
        for (var i = 0; i < children.length; i++) {\r
          var o = children[i];\r
          o.parent = key; // reference to parent node data\r
          walkJson(o, arr);\r
        }\r
      }\r
    }\r
\r
    // build the tree model\r
    var nodeDataArray = [];\r
    walkJson(json, nodeDataArray);\r
    myDiagram.model = new go.TreeModel(nodeDataArray);\r
\r
    layoutFishbone();\r
  }\r
\r
  // use FishboneLayout and FishboneLink\r
  function layoutFishbone() {\r
    myDiagram.startTransaction('fishbone layout');\r
    myDiagram.linkTemplate = myDiagram.linkTemplateMap.get('fishbone');\r
    myDiagram.layout = new FishboneLayout({\r
      // defined above\r
      angle: 180,\r
      layerSpacing: 10,\r
      nodeSpacing: 20,\r
      rowSpacing: 10\r
    });\r
    myDiagram.commitTransaction('fishbone layout');\r
  }\r
\r
  // make the layout a branching tree layout and use a normal link template\r
  function layoutBranching() {\r
    myDiagram.startTransaction('branching layout');\r
    myDiagram.linkTemplate = myDiagram.linkTemplateMap.get('normal');\r
    myDiagram.layout = new go.TreeLayout({\r
      angle: 180,\r
      layerSpacing: 20,\r
      alignment: go.TreeAlignment.BusBranching\r
    });\r
    myDiagram.commitTransaction('branching layout');\r
  }\r
\r
  // make the layout a basic tree layout and use a normal link template\r
  function layoutNormal() {\r
    myDiagram.startTransaction('normal layout');\r
    myDiagram.linkTemplate = myDiagram.linkTemplateMap.get('normal');\r
    myDiagram.layout = new go.TreeLayout({\r
      angle: 180,\r
      breadthLimit: 1000,\r
      alignment: go.TreeAlignment.Start\r
    });\r
    myDiagram.commitTransaction('normal layout');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/FishboneLayout.js`],descriptionHtml:`<p>\r
      This sample shows a "fishbone" layout of a tree model of cause-and-effect relationships. This type of layout is often seen in root cause analysis, or RCA.\r
      The layout is defined in its own file, as <a href="../extensions/FishboneLayout.js">FishboneLayout.js</a>. When using FishboneLayout the diagram uses FishboneLink in\r
      order to get custom routing for the links.\r
    </p>\r
    <p>The buttons each set the <a>Diagram.layout</a> within a transaction.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`links`,`treelayout`,`customlayout`,`extensions`];var g=y();l(`1tnpxxp`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};