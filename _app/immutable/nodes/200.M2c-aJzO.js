import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Resizing of Overview Box`,indexDescription:`A custom Tool which allows the user to resize the overview box.`,screenshot:`overviewresizing`,priority:2,tags:[`tools`,`overview`,`extensions`],description:`The OverviewResizingTool extension allows the user to change the viewport of the observed Diagram by resizing the box representing the viewport in an Overview.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <div id="myOverviewDiv" style="border: solid 1px black; width: 250px; height: 200px"></div>\r
  <p><button id="zoomToFit">Zoom to Fit</button><button id="expandAtRandom">Expand random Node</button></p>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.ForceDirectedLayout(),\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // Define the Node template.\r
    // This uses a Spot Panel to position a button relative\r
    // to the ellipse surrounding the text.\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          selectionObjectName: 'PANEL',\r
          isTreeExpanded: false,\r
          isTreeLeaf: false\r
        })\r
        .add(\r
          // the node's outer shape, which will surround the text\r
          new go.Panel('Auto', { name: 'PANEL' })\r
            .add(\r
              new go.Shape('Circle', { fill: '#03A9F4', stroke: 'black' }),\r
              new go.TextBlock({ font: '12pt sans-serif', margin: 5 })\r
                .bind('text', 'key')\r
            ),\r
          // the expand/collapse button, at the top-right corner\r
          go.GraphObject.build('TreeExpanderButton', {\r
            name: 'TREEBUTTON',\r
            width: 20,\r
            height: 20,\r
            alignment: go.Spot.TopRight,\r
            alignmentFocus: go.Spot.Center,\r
            // customize the expander behavior to\r
            // create children if the node has never been expanded\r
            click: (e, obj) => {\r
              // OBJ is the Button\r
              var node = obj.part; // get the Node containing this Button\r
              if (node === null) return;\r
              e.handled = true;\r
              expandNode(node);\r
            }\r
          }) // end TreeExpanderButton\r
        ); // end Node\r
\r
    // create the model with a root node data\r
    myDiagram.model = new go.TreeModel([{ key: 0, everExpanded: false }]);\r
\r
    // Overview\r
    myOverview = new go.Overview('myOverviewDiv', {\r
      resizingTool: new OverviewResizingTool(),\r
      observed: myDiagram,\r
      contentAlignment: go.Spot.Center,\r
      'box.resizable': true\r
    });\r
\r
    document.getElementById('zoomToFit').addEventListener('click', () => myDiagram.zoomToFit());\r
\r
    document.getElementById('expandAtRandom').addEventListener('click', () => expandAtRandom());\r
  }\r
\r
  function expandNode(node) {\r
    var diagram = node.diagram;\r
    diagram.startTransaction('CollapseExpandTree');\r
    // this behavior is specific to this incrementalTree sample:\r
    var data = node.data;\r
    if (!data.everExpanded) {\r
      // only create children once per node\r
      diagram.model.set(data, 'everExpanded', true);\r
      var numchildren = createSubTree(data);\r
      if (numchildren === 0) {\r
        // now known no children: don't need Button!\r
        node.findObject('TREEBUTTON').visible = false;\r
      }\r
    }\r
    // this behavior is generic for most expand/collapse tree buttons:\r
    if (node.isTreeExpanded) {\r
      diagram.commandHandler.collapseTree(node);\r
    } else {\r
      diagram.commandHandler.expandTree(node);\r
    }\r
    diagram.commitTransaction('CollapseExpandTree');\r
  }\r
\r
  // This dynamically creates the immediate children for a node.\r
  // The sample assumes that we have no idea of whether there are any children\r
  // for a node until we look for them the first time, which happens\r
  // upon the first tree-expand of a node.\r
  function createSubTree(parentdata) {\r
    var numchildren = Math.floor(Math.random() * 10);\r
    if (myDiagram.nodes.count <= 1) {\r
      numchildren += 1; // make sure the root node has at least one child\r
    }\r
    // create several node data objects and add them to the model\r
    var model = myDiagram.model;\r
    var parent = myDiagram.findNodeForData(parentdata);\r
\r
    var degrees = 1;\r
    var grandparent = parent.findTreeParentNode();\r
    while (grandparent) {\r
      degrees++;\r
      grandparent = grandparent.findTreeParentNode();\r
    }\r
\r
    for (var i = 0; i < numchildren; i++) {\r
      var childdata = {\r
        key: model.nodeDataArray.length,\r
        parent: parentdata.key,\r
        rootdistance: degrees\r
      };\r
      // add to model.nodeDataArray and create a Node\r
      model.addNodeData(childdata);\r
      // position the new child node close to the parent\r
      var child = myDiagram.findNodeForData(childdata);\r
      child.location = parent.location;\r
    }\r
    return numchildren;\r
  }\r
\r
  function expandAtRandom() {\r
    var eligibleNodes = [];\r
    myDiagram.nodes.each(n => {\r
      if (!n.isTreeExpanded) eligibleNodes.push(n);\r
    });\r
    var node = eligibleNodes[Math.floor(Math.random() * eligibleNodes.length)];\r
    expandNode(node);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/OverviewResizingTool.js`],descriptionHtml:`<p>\r
    Try resizing the diagram, the overview will change its size in response.\r
  </p>\r
  <p>\r
    This sample demonstrates a custom <a>ResizingTool</a> which allows the user to resize the overview box. It is defined in its own file, as\r
    <a href="../extensions/OverviewResizingTool.js">OverviewResizingTool.js</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`overview`,`extensions`];var g=y();l(`jl2m9`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};