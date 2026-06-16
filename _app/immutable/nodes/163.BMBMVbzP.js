import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Expanding SubTree First Time Incrementally Adds Nodes`,titleShort:`Incremental Tree`,indexDescription:`Demonstrates the expansion of a tree where nodes are only created 'on-demand', when the user clicks on the 'expand' Button.`,screenshot:`incrementaltree`,priority:2,tags:[`force-directed`,`buttons`,`commands`],description:`Incrementally grow a tree as each node is expanded for the first time.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 700px"></div>\r
  <p><button id="zoomToFit">Zoom to Fit</button><button id="expandAtRandom">Expand random Node</button></p>`,jsCode:`function init() {\r
\r
    const blues = ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'];\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must name or refer to the DIV HTML element\r
      initialContentAlignment: go.Spot.Center,\r
      layout: new go.ForceDirectedLayout({ moveLimit: 5 }),\r
      // moving and copying nodes also moves and copies their subtrees\r
      'commandHandler.copiesTree': true, // for the copy command\r
      'commandHandler.deletesTree': true, // for the delete command\r
      'draggingTool.dragsTree': true, // dragging for both move and copy\r
      'undoManager.isEnabled': true\r
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
        // the node's outer shape, which will surround the text\r
        .add(\r
          new go.Panel('Auto', { name: 'PANEL' })\r
            .add(\r
              new go.Shape('Circle', {\r
                  fill: 'whitesmoke',\r
                  stroke: 'black'\r
                })\r
                .bind('fill', 'rootdistance', dist => {\r
                  dist = Math.min(blues.length - 1, dist);\r
                  return blues[dist];\r
                }),\r
              new go.TextBlock({\r
                  font: '12pt sans-serif',\r
                  margin: 5\r
                })\r
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
    myDiagram.model = new go.TreeModel([{ key: 0, color: blues[0], everExpanded: false }]);\r
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
    myDiagram.zoomToFit();\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This diagram demonstrates the expansion of a tree where nodes are only created "on-demand", when the user clicks on the "expand" Button. As you expand the\r
    tree, it automatically performs a force-directed layout, which will make some room for the additional nodes.\r
  </p>\r
  <p>\r
    The data for each node is implemented by a JavaScript object held by the Diagram's model. Each node data has an <b>everExpanded</b> property that indicates\r
    whether we have already created all of its "child" data and added them to the model. The <b>everExpanded</b> property defaults to false, to match the\r
    initial value of <a>Node.isTreeExpanded</a> in the node template, which specifies that the nodes start collapsed.\r
  </p>\r
  <p>\r
    When the user clicks on the "expand" Button, the button click event handler finds the corresponding data object by going up the visual tree to find the Node\r
    via the <a>GraphObject.part</a> property and then getting the node data that the Node is bound to via <a>Part.data</a>. If <b>everExpanded</b> is false, the\r
    code creates a random number of child data for that node, each with a random <b>color</b> property. Then the button click event handler changes the value of\r
    <b>Node.isExpandedTree</b>, thereby expanding or collapsing the node.\r
  </p>\r
  <p>Some initial node expansions result in there being no children at all. In this case the Button is made invisible.</p>\r
  <p>\r
    All changes are performed within a transaction. You should always surround your code with calls to <a>Model.startTransaction</a> and\r
    <a>Model.commitTransaction</a>, or the same methods on <a>Diagram</a>.\r
  </p>\r
  <p>\r
    The diagram's <a>Diagram.layout</a> is an instance of <a>ForceDirectedLayout</a>. The standard conditions under which the layout will be performed include\r
    when nodes or links or group-memberships are added or removed from the model, or when they change visibility. In this case that means that when the user\r
    expands or collapses a node, another force-directed layout occurs again, even upon repeated expansions or collapses.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`force-directed`,`buttons`,`commands`];var g=y();l(`v6ffr7`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};