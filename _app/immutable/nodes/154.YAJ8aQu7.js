import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Creating SubGraphs only when Expanding a Group the First Time`,titleShort:`Grouping`,indexDescription:`Demonstrates subgraphs that are created only as groups are expanded.`,screenshot:`grouping`,priority:2,tags:[`treelayout`,`groups`,`buttons`],description:`A diagram holding groups that incrementally grow the diagram as groups are expanded.`},htmlContent:`<div id="myDiagramDiv" style="height: 600px; width: 100%; border: 1px solid black"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.TreeLayout({ // the layout for the entire diagram\r
        angle: 90,\r
        arrangement: go.TreeArrangement.Horizontal,\r
        isRealtime: false\r
      })\r
    });\r
\r
    // define the node template for non-groups\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('Rectangle', { stroke: null, strokeWidth: 0 })\r
            .bind('fill', 'key'),\r
          new go.TextBlock({ margin: 7, font: 'Bold 14px Sans-Serif' })\r
            //the text, color, and key are all bound to the same property in the node data\r
            .bind('text', 'key')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 10 })\r
        .add(\r
          new go.Shape({ strokeWidth: 2 }),\r
          new go.Shape({ toArrow: 'OpenTriangle' })\r
        );\r
\r
    // define the group template\r
    myDiagram.groupTemplate =\r
      new go.Group('Auto', {\r
          // define the group's internal layout\r
          layout: new go.TreeLayout({ angle: 90, arrangement: go.TreeArrangement.Horizontal, isRealtime: false }),\r
          // the group begins unexpanded;\r
          // upon expansion, a Diagram Listener will generate contents for the group\r
          isSubGraphExpanded: false,\r
          // when a group is expanded, if it contains no parts, generate a subGraph inside of it\r
          subGraphExpandedChanged: group => {\r
            if (group.memberParts.count === 0) {\r
              randomGroup(group.data.key);\r
            }\r
          }\r
        })\r
        .add(\r
          new go.Shape('Rectangle', { fill: null, stroke: 'gray', strokeWidth: 2 }),\r
          new go.Panel('Vertical', { defaultAlignment: go.Spot.Left, margin: 4 })\r
            .add(\r
              new go.Panel('Horizontal', { defaultAlignment: go.Spot.Top })\r
                .add(\r
                  // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph\r
                  go.GraphObject.build('SubGraphExpanderButton'),\r
                  new go.TextBlock({ font: 'Bold 18px Sans-Serif', margin: 4 })\r
                    .bind('text', 'key')\r
                ),\r
              // create a placeholder to represent the area where the contents of the group are\r
              new go.Placeholder({ padding: new go.Margin(0, 10) })\r
            ) // end Vertical Panel\r
        ); // end Group\r
\r
    // generate the initial model\r
    randomGroup();\r
  }\r
\r
  // Generate a random number of nodes, including groups.\r
  // If a group's key is given as a parameter, put these nodes inside it\r
  function randomGroup(group) {\r
    // all modification to the diagram is within this transaction\r
    myDiagram.startTransaction('addGroupContents');\r
    var addedKeys = []; // this will contain the keys of all nodes created\r
    var groupCount = 0; // the number of groups in the diagram, to determine the numbers in the keys of new groups\r
    myDiagram.nodes.each(node => {\r
      if (node instanceof go.Group) groupCount++;\r
    });\r
    // create a random number of groups\r
    // ensure there are at least 10 groups in the diagram\r
    var groups = Math.floor(Math.random() * 2);\r
    if (groupCount < 10) groups += 1;\r
    for (var i = 0; i < groups; i++) {\r
      var name = 'group' + (i + groupCount);\r
      myDiagram.model.addNodeData({ key: name, isGroup: true, group: group });\r
      addedKeys.push(name);\r
    }\r
    var nodes = Math.floor(Math.random() * 3) + 2;\r
    // create a random number of non-group nodes\r
    for (var i = 0; i < nodes; i++) {\r
      var color = go.Brush.randomColor();\r
      // make sure the color, which will be the node's key, is unique in the diagram before adding the new node\r
      if (myDiagram.findPartForKey(color) === null) {\r
        myDiagram.model.addNodeData({ key: color, group: group });\r
        addedKeys.push(color);\r
      }\r
    }\r
    // add at least one link from each node to another\r
    // this could result in clusters of nodes unreachable from each other, but no lone nodes\r
    var arr = [];\r
    for (var x in addedKeys) arr.push(addedKeys[x]);\r
    arr.sort((x, y) => Math.random(2) - 1);\r
    for (var i = 0; i < arr.length; i++) {\r
      var from = Math.floor(Math.random() * (arr.length - i)) + i;\r
      if (from !== i) {\r
        myDiagram.model.addLinkData({ from: arr[from], to: arr[i] });\r
      }\r
    }\r
    myDiagram.commitTransaction('addGroupContents');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample demonstrates subgraphs that are created only as groups are expanded.</p>\r
  <p>\r
    The model is initially a random number of nodes, including some groups, in a tree layout. When a group is expanded, the\r
    <a>Group.subGraphExpandedChanged</a> event handler calls a function to generate a random number of nodes in a tree layout inside the group if it did not\r
    contain none any. Each non-group node added has a unique random color, and links are added by giving each node one link to another node.\r
  </p>\r
  <p>\r
    The addition of nodes and links is performed within a transaction to ensure that the diagram updates itself properly. The diagram's tree layout and the tree\r
    layouts within each group are performed again when a sub-graph is expanded or collapsed.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`groups`,`buttons`];var g=y();l(`2d2qzm`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};