import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Tree View Implemented with TreeLayout of Nodes and Links`,titleShort:`Tree View`,indexDescription:`Demonstrates a traditional 'Tree View' in a GoJS diagram, with optional orthogonal links between the nodes.`,screenshot:`treeview`,priority:1.1,tags:[`treelayout`,`buttons`],description:`A traditional tree view using TreeLayout and orthogonal links.`},htmlContent:`<div id="myDiagramDiv" style="border: 1px solid black; width: 300px; height: 500px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowMove: false,\r
      allowCopy: false,\r
      allowDelete: false,\r
      allowHorizontalScroll: false,\r
      layout: new go.TreeLayout({\r
        alignment: go.TreeAlignment.Start,\r
        angle: 0,\r
        compaction: go.TreeCompaction.None,\r
        layerSpacing: 16,\r
        layerSpacingParentOverlap: 1,\r
        nodeIndentPastParent: 1.0,\r
        nodeSpacing: 0,\r
        setsPortSpot: false,\r
        setsChildPortSpot: false\r
      })\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          // no Adornment: instead change panel background color by binding to Node.isSelected\r
          selectionAdorned: false,\r
          // a custom function to allow expanding/collapsing on double-click\r
          // this uses similar logic to a TreeExpanderButton\r
          doubleClick: (e, node) => {\r
            var cmd = myDiagram.commandHandler;\r
            if (node.isTreeExpanded) {\r
              if (!cmd.canCollapseTree(node)) return;\r
            } else {\r
              if (!cmd.canExpandTree(node)) return;\r
            }\r
            e.handled = true;\r
            if (node.isTreeExpanded) {\r
              cmd.collapseTree(node);\r
            } else {\r
              cmd.expandTree(node);\r
            }\r
          }\r
        })\r
        .add(\r
          go.GraphObject.build('TreeExpanderButton', {\r
            // customize the button's appearance\r
            _treeExpandedFigure: 'LineDown',\r
            _treeCollapsedFigure: 'LineRight',\r
            'ButtonBorder.fill': 'whitesmoke',\r
            'ButtonBorder.stroke': null,\r
            _buttonFillOver: 'rgba(0,128,255,0.25)',\r
            _buttonStrokeOver: null\r
          }),\r
          new go.Panel('Horizontal', { position: new go.Point(18, 0) })\r
            .bindObject('background', 'isSelected', s => (s ? 'lightblue' : 'white'))\r
            .add(\r
              new go.Picture({\r
                  width: 18,\r
                  height: 18,\r
                  margin: new go.Margin(0, 4, 0, 0),\r
                  imageStretch: go.ImageStretch.Uniform\r
                })\r
                // bind the picture source on two properties of the Node\r
                // to display open folder, closed folder, or document\r
                .bindObject('source', 'isTreeExpanded', imageConverter)\r
                .bindObject('source', 'isTreeLeaf', imageConverter)\r
            )\r
            .add(\r
              new go.TextBlock({ font: '9pt Verdana, sans-serif' })\r
                .bind('text', 'key', s => 'item ' + s)\r
            )\r
        );\r
\r
    // without lines\r
    myDiagram.linkTemplate = new go.Link();\r
\r
    // with lines\r
    // myDiagram.linkTemplate =\r
    //   new go.Link({\r
    //       selectable: false,\r
    //       routing: go.Routing.Orthogonal,\r
    //       fromEndSegmentLength: 4,\r
    //       toEndSegmentLength: 4,\r
    //       fromSpot: new go.Spot(0.001, 1, 7, 0),\r
    //       toSpot: go.Spot.Left }\r
    //     )\r
    //     .add(\r
    //       new go.Shape({ stroke: 'gray', strokeDashArray: [1,2] })\r
    //     );\r
\r
    // create a random tree\r
    var nodeDataArray = [{ key: 0 }];\r
    var max = 499;\r
    var count = 0;\r
    while (count < max) {\r
      count = makeTree(3, count, max, nodeDataArray, nodeDataArray[0]);\r
    }\r
    myDiagram.model = new go.TreeModel(nodeDataArray);\r
  }\r
\r
  function makeTree(level, count, max, nodeDataArray, parentdata) {\r
    var numchildren = Math.floor(Math.random() * 10);\r
    for (var i = 0; i < numchildren; i++) {\r
      if (count >= max) return count;\r
      count++;\r
      var childdata = { key: count, parent: parentdata.key };\r
      nodeDataArray.push(childdata);\r
      if (level > 0 && Math.random() > 0.5) {\r
        count = makeTree(level - 1, count, max, nodeDataArray, childdata);\r
      }\r
    }\r
    return count;\r
  }\r
\r
  // takes a property change on either isTreeLeaf or isTreeExpanded and selects the correct image to use\r
  function imageConverter(prop, picture) {\r
    var node = picture.part;\r
    if (node.isTreeLeaf) {\r
      return 'images/document.svg';\r
    } else {\r
      if (node.isTreeExpanded) {\r
        return 'images/openFolder.svg';\r
      } else {\r
        return 'images/closedFolder.svg';\r
      }\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This shows how to create a traditional "TreeView" in a <b>GoJS</b> diagram. There are 500 nodes\r
    in the tree.\r
  </p>\r
  <p>Look at this page's source code to see how the properties on the <a>TreeLayout</a> are set.</p>\r
  <p>\r
    The node template makes use of a "TreeExpanderButton" panel to implement the expand/collapse\r
    button. It also implements a custom doubleClick function to allow nodes to be expanded/collapsed\r
    on double-click. Lastly, the source of the picture on each node is bound to two different\r
    properties,\r
    <a>Node.isTreeLeaf</a> and <a>Node.isTreeExpanded</a>; the <b>imageConverter</b> function is\r
    used to select the correct image based on these properties.\r
  </p>\r
  <p>\r
    There are two link templates in the source code, one which uses no lines, and one which connects\r
    the items with dotted lines.\r
  </p>\r
  <p>\r
    See the <a href="../intro/buttons" target="_blank">learn page on buttons</a> for more GoJS\r
    button information. The\r
    <a href="triStateCheckBoxTree" target="_blank">Tri-state CheckBox Tree</a> sample\r
    demonstrates a "tree view" where each item has a three-state checkbox. The\r
    <a href="treeMapper" target="_blank">Tree Mapper</a> sample demonstrates how to map (draw\r
    associations) between items in two trees. The\r
    <a href="updateDemo" target="_blank">Update Demo</a> sample also uses a "tree view" for its\r
    own purposes.\r
  </p>\r
  <p>\r
    The icons in this sample are from <a href="https://icons8.com/" target="blank">icons8.com</a>\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`buttons`];var g=y();l(`1jti`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};