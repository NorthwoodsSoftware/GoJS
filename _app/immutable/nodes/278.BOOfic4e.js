import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Tree Mapper Editor for Controlling Relationships between Fields in Two Trees`,titleShort:`Tree Mapper`,indexDescription:`Displays two trees, allowing the user to dynamically draw or reconnect links mapping data from field to another.`,screenshot:`treemapper`,priority:1,tags:[`groups`,`treelayout`,`buttons`],description:`A data mapping diagram to show and edit the relationships between items in two different trees.`},htmlContent:`<div id="myDiagramDiv" style="border: 1px solid black; width: 100%; height: 350px"></div>\r
  <p>\r
    This sample supports three different routing styles:<br />\r
    <input type="radio" name="MyRoutingStyle" onclick="changeStyle()" value="Normal" />\r
    "Normal"<br />\r
    <input\r
      type="radio"\r
      name="MyRoutingStyle"\r
      onclick="changeStyle()"\r
      value="ToGroup"\r
      checked="checked" />\r
    "ToGroup", where the links stop at the border of the group<br />\r
    <input type="radio" name="MyRoutingStyle" onclick="changeStyle()" value="ToNode" />\r
    "ToNode", where the links bend at the border of the group but go all the way to the node, as\r
    normal<br />\r
  </p>\r
  <p>The model data, automatically updated after each change or undo or redo:</p>\r
  <pre class="lang-js" style="height: 300px;"><code id="mySavedModel"></code></pre>`,jsCode:`// Use a TreeNode so that when a node is not visible because a parent is collapsed,\r
  // connected links seem to be connected with the lowest visible parent node.\r
  class TreeNode extends go.Node {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    findVisibleNode() {\r
      // redirect links to lowest visible "ancestor" in the tree\r
      var n = this;\r
      while (n !== null && !n.isVisible()) {\r
        n = n.findTreeParentNode();\r
      }\r
      return n;\r
    }\r
  }\r
  // end TreeNode\r
\r
  // Control how Mapping links are routed:\r
  // - "Normal": normal routing with fixed fromEndSegmentLength & toEndSegmentLength\r
  // - "ToGroup": so that the link routes stop at the edge of the group,\r
  //     rather than going all the way to the connected nodes\r
  // - "ToNode": so that they go all the way to the connected nodes\r
  //     but only bend at the edge of the group\r
  var ROUTINGSTYLE = 'ToGroup';\r
\r
  // If you want the regular routing where the Link.[from/to]EndSegmentLength controls\r
  // the length of the horizontal segment adjacent to the port, don't use this class.\r
  // Replace MappingLink with a go.Link in the "Mapping" link template.\r
  class MappingLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {\r
      if (ROUTINGSTYLE !== 'ToGroup') {\r
        return super.getLinkPoint(node, port, spot, from, ortho, othernode, otherport);\r
      } else {\r
        var r = port.getDocumentBounds();\r
        var group = node.containingGroup;\r
        var b = group !== null ? group.actualBounds : node.actualBounds;\r
        var op = othernode.getDocumentPoint(go.Spot.Center);\r
        var x = op.x > r.centerX ? b.right : b.left;\r
        return new go.Point(x, r.centerY);\r
      }\r
    }\r
\r
    computePoints() {\r
      var result = super.computePoints();\r
      if (result && ROUTINGSTYLE === 'ToNode') {\r
        var fn = this.fromNode;\r
        var tn = this.toNode;\r
        if (fn && tn) {\r
          var fg = fn.containingGroup;\r
          var fb = fg ? fg.actualBounds : fn.actualBounds;\r
          var fpt = this.getPoint(0);\r
          var tg = tn.containingGroup;\r
          var tb = tg ? tg.actualBounds : tn.actualBounds;\r
          var tpt = this.getPoint(this.pointsCount - 1);\r
          this.setPoint(1, new go.Point(fpt.x < tpt.x ? fb.right : fb.left, fpt.y));\r
          this.setPoint(\r
            this.pointsCount - 2,\r
            new go.Point(fpt.x < tpt.x ? tb.left : tb.right, tpt.y)\r
          );\r
        }\r
      }\r
      return result;\r
    }\r
  }\r
  // end MappingLink\r
\r
  function init() {\r
    function handleTreeCollapseExpand(e) {\r
      e.subject.each(n => {\r
        n.findExternalTreeLinksConnected().each(l => l.invalidateRoute());\r
      });\r
    }\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'commandHandler.copiesTree': true,\r
      'commandHandler.deletesTree': true,\r
      TreeCollapsed: handleTreeCollapseExpand,\r
      TreeExpanded: handleTreeCollapseExpand,\r
      // newly drawn links always map a node in one tree to a node in another tree\r
      'linkingTool.archetypeLinkData': { category: 'Mapping' },\r
      'linkingTool.linkValidation': checkLink,\r
      'relinkingTool.linkValidation': checkLink,\r
      'undoManager.isEnabled': true,\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) {\r
          // show the model data in the page's TextArea\r
          document.getElementById('mySavedModel').innerHTML = e.model.toJson();\r
        }\r
      }\r
    });\r
\r
    // All links must go from a node inside the "Left Side" Group to a node inside the "Right Side" Group.\r
    function checkLink(fn, fp, tn, tp, link) {\r
      // make sure the nodes are inside different Groups\r
      if (fn.containingGroup === null || fn.containingGroup.data.key !== -1) return false;\r
      if (tn.containingGroup === null || tn.containingGroup.data.key !== -2) return false;\r
      //// optional limit to a single mapping link per node\r
      //if (fn.linksConnected.any(l => l.category === "Mapping")) return false;\r
      //if (tn.linksConnected.any(l => l.category === "Mapping")) return false;\r
      return true;\r
    }\r
\r
    // Each node in a tree is defined using the default nodeTemplate.\r
    myDiagram.nodeTemplate =\r
      new TreeNode({\r
          movable: false,\r
          copyable: false,\r
          deletable: false, // user cannot move an individual node\r
          // no Adornment: instead change panel background color by binding to Node.isSelected\r
\r
          selectionAdorned: false,\r
          background: 'white',\r
          mouseEnter: (e, node) => (node.background = 'aquamarine'),\r
          mouseLeave: (e, node) => (node.background = node.isSelected ? 'skyblue' : 'white')\r
        })\r
        .bindObject('background', 'isSelected', s => s ? 'skyblue' : 'white')\r
        // whether the user can start drawing a link from or to this node depends on which group it's in\r
        .bind('fromLinkable', 'group', k => k === -1)\r
        .bind('toLinkable', 'group', k => k === -2)\r
        .add(\r
          go.GraphObject.build('TreeExpanderButton', { // support expanding/collapsing subtrees\r
              width: 14,\r
              height: 14,\r
              'ButtonIcon.stroke': 'white',\r
              'ButtonIcon.strokeWidth': 2,\r
              'ButtonBorder.fill': 'goldenrod',\r
              'ButtonBorder.stroke': null,\r
              'ButtonBorder.figure': 'Rectangle',\r
              _buttonFillOver: 'darkgoldenrod',\r
              _buttonStrokeOver: null\r
            }),\r
          new go.Panel('Horizontal', { position: new go.Point(16, 0) })\r
            .add(\r
              //// optional icon for each tree node\r
              // new go.Picture(\r
              //  { width: 14, height: 14,\r
              //    margin: new go.Margin(0, 4, 0, 0),\r
              //    imageStretch: go.ImageStretch.Uniform,\r
              //    source: "images/defaultIcon.png" })\r
              //  .bind("source", "src"),\r
              new go.TextBlock()\r
                .bind('text', 'key', s => 'item ' + s)\r
            )\r
        );\r
\r
    // These are the links connecting tree nodes within each group.\r
\r
    myDiagram.linkTemplate = new go.Link(); // without lines\r
\r
    myDiagram.linkTemplate = // with lines\r
      new go.Link({\r
          selectable: false,\r
          routing: go.Routing.Orthogonal,\r
          fromEndSegmentLength: 4,\r
          toEndSegmentLength: 4,\r
          fromSpot: new go.Spot(0.001, 1, 7, 0),\r
          toSpot: go.Spot.Left\r
        })\r
        .add(new go.Shape({ stroke: 'lightgray' }));\r
\r
    // These are the blue links connecting a tree node on the left side with one on the right side.\r
    myDiagram.linkTemplateMap.add('Mapping',\r
      new MappingLink({\r
          isTreeLink: false,\r
          isLayoutPositioned: false,\r
          layerName: 'Foreground',\r
          fromSpot: go.Spot.Right,\r
          toSpot: go.Spot.Left,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .add(new go.Shape({ stroke: 'blue', strokeWidth: 2 }))\r
    );\r
\r
    myDiagram.groupTemplate =\r
      new go.Group('Auto', { deletable: false, layout: makeGroupLayout() })\r
        .bindTwoWay('position', 'xy', go.Point.parse, go.Point.stringify)\r
        .bind('layout', 'width', makeGroupLayout)\r
        .add(\r
          new go.Shape({ fill: 'white', stroke: 'lightgray' }),\r
          new go.Panel('Vertical', { defaultAlignment: go.Spot.Left })\r
            .add(\r
              new go.TextBlock({\r
                  font: 'bold 14pt sans-serif',\r
                  margin: new go.Margin(5, 5, 0, 5)\r
                })\r
                .bind('text'),\r
              new go.Placeholder({ padding: 5 })\r
            )\r
        );\r
\r
    function makeGroupLayout() {\r
      return new go.TreeLayout({ // taken from samples/treeView.html\r
        alignment: go.TreeAlignment.Start,\r
        angle: 0,\r
        compaction: go.TreeCompaction.None,\r
        layerSpacing: 16,\r
        layerSpacingParentOverlap: 1,\r
        nodeIndentPastParent: 1.0,\r
        nodeSpacing: 0,\r
        setsPortSpot: false,\r
        setsChildPortSpot: false,\r
        // after the tree layout, change the width of each node so that all\r
        // of the nodes have widths such that the collection has a given width\r
        commitNodes: function () {\r
          // method override must be function, not =>\r
          go.TreeLayout.prototype.commitNodes.call(this);\r
          if (ROUTINGSTYLE === 'ToGroup') {\r
            updateNodeWidths(this.group, this.group.data.width || 100);\r
          }\r
        }\r
      });\r
    }\r
\r
    // Create some random trees in each group\r
    var nodeDataArray = [\r
      { isGroup: true, key: -1, text: 'Left Side', xy: '0 0', width: 150 },\r
      { isGroup: true, key: -2, text: 'Right Side', xy: '300 0', width: 150 }\r
    ];\r
    var linkDataArray = [\r
      { from: 6, to: 1012, category: 'Mapping' },\r
      { from: 4, to: 1006, category: 'Mapping' },\r
      { from: 9, to: 1004, category: 'Mapping' },\r
      { from: 1, to: 1009, category: 'Mapping' },\r
      { from: 14, to: 1010, category: 'Mapping' }\r
    ];\r
\r
    // initialize tree on left side\r
    var root = { key: 0, group: -1 };\r
    nodeDataArray.push(root);\r
    for (var i = 0; i < 11; ) {\r
      i = makeTree(3, i, 17, nodeDataArray, linkDataArray, root, -1, root.key);\r
    }\r
\r
    // initialize tree on right side\r
    root = { key: 1000, group: -2 };\r
    nodeDataArray.push(root);\r
    for (var i = 0; i < 15; ) {\r
      i = makeTree(3, i, 15, nodeDataArray, linkDataArray, root, -2, root.key);\r
    }\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
  }\r
\r
  // help create a random tree structure\r
  function makeTree(level, count, max, nodeDataArray, linkDataArray, parentdata, groupkey, rootkey) {\r
    var numchildren = Math.floor(Math.random() * 10);\r
    for (var i = 0; i < numchildren; i++) {\r
      if (count >= max) return count;\r
      count++;\r
      var childdata = { key: rootkey + count, group: groupkey };\r
      nodeDataArray.push(childdata);\r
      linkDataArray.push({ from: parentdata.key, to: childdata.key });\r
      if (level > 0 && Math.random() > 0.5) {\r
        count = makeTree(\r
          level - 1,\r
          count,\r
          max,\r
          nodeDataArray,\r
          linkDataArray,\r
          childdata,\r
          groupkey,\r
          rootkey\r
        );\r
      }\r
    }\r
    return count;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);\r
\r
  function updateNodeWidths(group, width) {\r
    if (isNaN(width)) {\r
      group.memberParts.each(n => {\r
        if (n instanceof go.Node) n.width = NaN; // back to natural width\r
      });\r
    } else {\r
      var minx = Infinity; // figure out minimum group width\r
      group.memberParts.each(n => {\r
        if (n instanceof go.Node) {\r
          minx = Math.min(minx, n.actualBounds.x);\r
        }\r
      });\r
      if (minx === Infinity) return;\r
      var right = minx + width;\r
      group.memberParts.each(n => {\r
        if (n instanceof go.Node) n.width = Math.max(0, right - n.actualBounds.x);\r
      });\r
    }\r
  }\r
\r
  // this function is only needed when changing the value of ROUTINGSTYLE dynamically\r
  function changeStyle() {\r
    // find user-chosen style name\r
    var stylename = 'ToGroup';\r
    var radio = document.getElementsByName('MyRoutingStyle');\r
    for (var i = 0; i < radio.length; i++) {\r
      if (radio[i].checked) {\r
        stylename = radio[i].value;\r
        break;\r
      }\r
    }\r
    if (stylename !== ROUTINGSTYLE) {\r
      myDiagram.commit(diag => {\r
        ROUTINGSTYLE = stylename;\r
        diag.findTopLevelGroups().each(g => updateNodeWidths(g, NaN));\r
        diag.layoutDiagram(true); // force layouts to happen again\r
        diag.links.each(l => l.invalidateRoute());\r
      });\r
    }\r
  }`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample is like the <a href="records">Mapping Fields of Records</a> sample, but it has\r
    a collapsible tree of nodes on each side, rather than a simple list of items. The implementation\r
    of the trees comes from the <a href="treeView">Tree View</a> sample.\r
  </p>\r
  <p>\r
    Draw new links by dragging from any field (i.e. any tree node). Reconnect a selected link by\r
    dragging its diamond-shaped handle. A minor enhancement to this diagram supports operator nodes\r
    that transform data from various fields on the left to provide values for fields on the right.\r
  </p>\r
  <p>\r
    There is a variation of this sample where the tree on the right is mirrored, so that the links\r
    naturally connect closer to the nodes in the tree.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`groups`,`treelayout`,`buttons`];var g=y();l(`fu23xi`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};