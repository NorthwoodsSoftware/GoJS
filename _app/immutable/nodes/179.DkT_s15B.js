import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Full Diagram and its Local View`,titleShort:`Diagram and Local View`,indexDescription:`Two diagrams, the one on top showing a full tree and the one below focusing on a specific node in the tree and those nodes that are logically 'near' it.`,screenshot:`localview`,priority:2,tags:[`treelayout`],description:`In one diagram show the whole tree and in a second diagram show a subset that is logically near a selected node.`},htmlContent:`<div id="fullDiagram" style="height: 250px; width: 100%; border: 1px solid black; margin: 2px"></div>\r
  <div id="localDiagram" style="height: 350px; width: 100%; border: 1px solid black; margin: 2px"></div>\r
  <button onclick="setupDiagram()">Create New Tree</button>`,jsCode:`function init() {\r
    myFullDiagram = new go.Diagram('fullDiagram', {\r
      initialAutoScale: go.AutoScale.Uniform, // automatically scale down to show whole tree\r
      contentAlignment: go.Spot.Center, // center the tree in the viewport if it fits\r
      isReadOnly: true, // don't allow user to change the diagram\r
      'animationManager.isEnabled': false,\r
      layout: new go.TreeLayout({ angle: 90, sorting: go.TreeSorting.Ascending }),\r
      maxSelectionCount: 1, // only one node may be selected at a time in each diagram\r
      // when the selection changes, update the myLocalDiagram view\r
      ChangedSelection: showLocalOnFullClick\r
    });\r
\r
    // this is very similar to the full Diagram\r
    myLocalDiagram = new go.Diagram('localDiagram', {\r
      initialAutoScale: go.AutoScale.UniformToFill,\r
      contentAlignment: go.Spot.Center,\r
      isReadOnly: true,\r
      'animationManager.isInitial': false,\r
      layout: new go.TreeLayout({ angle: 90, sorting: go.TreeSorting.Ascending }),\r
      LayoutCompleted: e => {\r
        var sel = e.diagram.selection.first();\r
        if (sel !== null) myLocalDiagram.scrollToRect(sel.actualBounds);\r
      },\r
      maxSelectionCount: 1,\r
      // when the selection changes, update the contents of the myLocalDiagram\r
      ChangedSelection: showLocalOnLocalClick\r
    });\r
\r
    // Define a node template that is shared by both diagrams\r
    var myNodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .bind('text', 'key', go.Binding.toString) // for sorting\r
        .add(\r
          new go.Shape('Rectangle', { stroke: null })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 5 })\r
            .bind('text', 'key', k => 'node' + k)\r
        );\r
    myFullDiagram.nodeTemplate = myNodeTemplate;\r
    myLocalDiagram.nodeTemplate = myNodeTemplate;\r
\r
    // Define a basic link template, not selectable, shared by both diagrams\r
    var myLinkTemplate =\r
      new go.Link({ corner: 10, selectable: false })\r
        .add(\r
          new go.Shape({ strokeWidth: 1 })\r
        );\r
    myFullDiagram.linkTemplate = myLinkTemplate;\r
    myLocalDiagram.linkTemplate = myLinkTemplate;\r
\r
    // Create the full tree diagram\r
    setupDiagram();\r
\r
    // Create a part in the background of the full diagram to highlight the selected node\r
    highlighter =\r
      new go.Part('Auto', { layerName: 'Grid', locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape('Ellipse', {\r
            fill: new go.Brush('Radial', { 0.0: 'gold', 0.5: 'gold', 1.0: 'white' }),\r
            stroke: null,\r
            desiredSize: new go.Size(300, 300)\r
          })\r
        );\r
    myFullDiagram.add(highlighter);\r
\r
    // Start by focusing the diagrams on the node at the top of the tree.\r
    // Wait until the tree has been laid out before selecting the root node.\r
    myFullDiagram.addDiagramListener('InitialLayoutCompleted', e => {\r
      var node0 = myFullDiagram.findPartForKey(0);\r
      if (node0 !== null) node0.isSelected = true;\r
      showLocalOnFullClick();\r
    });\r
  }\r
\r
  // Make the corresponding node in the full diagram to that selected in the local diagram selected,\r
  // then call showLocalOnFullClick to update the local diagram.\r
  function showLocalOnLocalClick() {\r
    var selectedLocal = myLocalDiagram.selection.first();\r
    if (selectedLocal !== null) {\r
      // there are two separate Nodes, one for each Diagram, but they share the same key value\r
      myFullDiagram.select(myFullDiagram.findPartForKey(selectedLocal.data.key));\r
    }\r
  }\r
\r
  function showLocalOnFullClick() {\r
    var node = myFullDiagram.selection.first();\r
    if (node !== null) {\r
      // make sure the selected node is in the viewport\r
      myFullDiagram.scrollToRect(node.actualBounds);\r
      // move the large gold part behind the selected node to highlight it\r
      highlighter.location = node.location;\r
      // create a new model for the local Diagram\r
      var model = new go.TreeModel();\r
      // add the selected node and its children and grandchildren to the local diagram\r
      var nearby = node.findTreeParts(3); // three levels of the (sub)tree\r
      // add parent and grandparent\r
      var parent = node.findTreeParentNode();\r
      if (parent !== null) {\r
        nearby.add(parent);\r
        var grandparent = parent.findTreeParentNode();\r
        if (grandparent !== null) {\r
          nearby.add(grandparent);\r
        }\r
      }\r
      // create the model using the same node data as in myFullDiagram's model\r
      nearby.each(n => {\r
        if (n instanceof go.Node) model.addNodeData(n.data);\r
      });\r
      myLocalDiagram.model = model;\r
      // select the node at the diagram's focus\r
      var selectedLocal = myLocalDiagram.findPartForKey(node.data.key);\r
      if (selectedLocal !== null) selectedLocal.isSelected = true;\r
    }\r
  }\r
\r
  // Create the tree model containing TOTAL nodes, with each node having a variable number of children\r
  function setupDiagram(total) {\r
    if (total === undefined) total = 100; // default to 100 nodes\r
    var nodeDataArray = [];\r
    for (var i = 0; i < total; i++) {\r
      nodeDataArray.push({\r
        key: nodeDataArray.length,\r
        color: go.Brush.randomColor()\r
      });\r
    }\r
    var j = 0;\r
    for (var i = 1; i < total; i++) {\r
      var data = nodeDataArray[i];\r
      data.parent = j;\r
      if (Math.random() < 0.3) j++; // this controls the likelihood that there are enough children\r
    }\r
    myFullDiagram.model = new go.TreeModel(nodeDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample includes two diagrams, the one on top showing a full tree and the one below focusing on a specific node in the tree and those nodes that are\r
    logically "near" it. When the selection changes in either diagram, the lower diagram changes its focus to the selected node. To show which node in the full\r
    tree is selected, a large gold highlighter part employing a radial <a>Brush</a> is placed in the background layer of the upper diagram behind the selected\r
    node. The Create New Tree button will randomly generate a new <a>TreeModel</a> to be used by the diagrams.\r
  </p>\r
  <p>\r
    Although it is not demonstrated in this sample, one could well use very simple templates for Nodes and for Links in the top Diagram. This would make the top\r
    Diagram more efficient to construct when there are very many more nodes. And one could use more detailed templates in the bottom Diagram, where there is\r
    more room to show information for each node.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`];var g=y();l(`13316zl`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};