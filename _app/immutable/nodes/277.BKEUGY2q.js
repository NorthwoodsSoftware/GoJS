import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Tree Map Layout of Nested Groups into Given Area`,titleShort:`Tree Map of Nested Groups`,indexDescription:`A custom Layout that renders nested Groups into the viewport with each Node having an area proportional to its declared 'size'.`,screenshot:`treemap`,priority:2,tags:[`collections`,`customlayout`,`groups`,`tooltips`,`extensions`,`html`],description:`Display hierarchical data by nesting, where the area of each node is proportional to some value for the node. Clicking consecutively results in selecting containing Groups.`},htmlContent:`<div style="margin-bottom: 5px; padding: 5px; background-color: aliceblue">\r
    <span style="display: inline-block; vertical-align: top; padding: 5px">\r
      <b>New Tree</b><br />\r
      MinNodes: <input type="number" width="2" id="minNodes" value="300" /><br />\r
      MaxNodes: <input type="number" width="2" id="maxNodes" value="500" /><br />\r
      MinChildren: <input type="number" width="2" id="minChil" value="2" /><br />\r
      MaxChildren: <input type="number" width="2" id="maxChil" value="5" /><br />\r
      <button type="button" onclick="rebuildGraph()">Generate Tree</button>\r
    </span>\r
  </div>\r
  <div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      'animationManager.isEnabled': false,\r
      layout: new TreeMapLayout({ isTopLevelHorizontal: false }),\r
      allowMove: false,\r
      allowCopy: false,\r
      allowDelete: false\r
    });\r
\r
    // change selection behavior to cycle up the chain of containing Groups\r
    myDiagram.toolManager.clickSelectingTool.standardMouseSelect = function () {\r
      // method override requires function, not =>\r
      var diagram = this.diagram;\r
      if (diagram === null || !diagram.allowSelect) return;\r
      var e = diagram.lastInput;\r
      if (!(e.control || e.meta) && !e.shift) {\r
        var part = diagram.findPartAt(e.documentPoint, false);\r
        if (part !== null) {\r
          var firstselected = null; // is this or any containing Group selected?\r
          var node = part;\r
          while (node !== null) {\r
            if (node.isSelected) {\r
              firstselected = node;\r
              break;\r
            } else {\r
              node = node.containingGroup;\r
            }\r
          }\r
          if (firstselected !== null) {\r
            // deselect this and select its containing Group\r
            firstselected.isSelected = false;\r
            var group = firstselected.containingGroup;\r
            if (group !== null) group.isSelected = true;\r
            return;\r
          }\r
        }\r
      }\r
      go.ClickSelectingTool.prototype.standardMouseSelect.call(this);\r
    };\r
\r
    // Nodes and Groups are the absolute minimum template: no elements at all!\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          background: 'rgba(99,99,99,0.2)',\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock()\r
                  .bindObject('text', '', tooltipString)\r
              )\r
        })\r
        .bind('background', 'fill');\r
\r
    myDiagram.groupTemplate =\r
      new go.Group('Auto', {\r
          layout: null,\r
          background: 'rgba(99,99,99,0.2)',\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock()\r
                  .bindObject('text', '', tooltipString)\r
              )\r
        })\r
        .bind('background', 'fill');\r
\r
    function tooltipString(part) {\r
      if (part instanceof go.Adornment) part = part.adornedPart;\r
      var msg = createPath(part);\r
      msg += '\\nsize: ' + part.data.size;\r
      if (part instanceof go.Group) {\r
        var group = part;\r
        msg += '\\n# children: ' + group.memberParts.count;\r
        msg += '\\nsubtotal size: ' + group.data.total;\r
      }\r
      return msg;\r
    }\r
\r
    function createPath(part) {\r
      var parent = part.containingGroup;\r
      return (parent !== null ? createPath(parent) + '/' : '') + part.data.text;\r
    }\r
\r
    // generate a tree with the default values\r
    rebuildGraph();\r
  }\r
\r
  function rebuildGraph() {\r
    var minNodes = document.getElementById('minNodes').value;\r
    minNodes = parseInt(minNodes, 10);\r
\r
    var maxNodes = document.getElementById('maxNodes').value;\r
    maxNodes = parseInt(maxNodes, 10);\r
\r
    var minChil = document.getElementById('minChil').value;\r
    minChil = parseInt(minChil, 10);\r
\r
    var maxChil = document.getElementById('maxChil').value;\r
    maxChil = parseInt(maxChil, 10);\r
\r
    // create and assign a new model\r
    var model = new go.GraphLinksModel();\r
    model.nodeGroupKeyProperty = 'parent';\r
    model.nodeDataArray = generateNodeData(minNodes, maxNodes, minChil, maxChil);\r
    myDiagram.model = model;\r
  }\r
\r
  // Creates a random number (between MIN and MAX) of randomly colored nodes.\r
  function generateNodeData(minNodes, maxNodes, minChil, maxChil) {\r
    var nodeArray = [];\r
    if (minNodes === undefined || isNaN(minNodes) || minNodes < 1) minNodes = 1;\r
    if (maxNodes === undefined || isNaN(maxNodes) || maxNodes < minNodes) maxNodes = minNodes;\r
\r
    // Create a bunch of node data\r
    var numNodes = Math.floor(Math.random() * (maxNodes - minNodes + 1)) + minNodes;\r
    for (var i = 0; i < numNodes; i++) {\r
      var size = Math.random() * Math.random() * 10000; // non-uniform distribution\r
      nodeArray.push({\r
        key: i, // the unique identifier\r
        isGroup: false, // many of these turn into groups, by code below\r
        parent: undefined, // is set by code below that assigns children\r
        text: i.toString(), // some text to be shown by the node template\r
        fill: go.Brush.randomColor(), // a color to be shown by the node template\r
        size: size,\r
        total: -1 // use a negative value to indicate that the total for the group has not been computed\r
      });\r
    }\r
\r
    // Takes the random collection of node data and creates a random tree with them.\r
    // Respects the minimum and maximum number of links from each node.\r
    // The minimum can be disregarded if we run out of nodes to link to.\r
    if (nodeArray.length > 1) {\r
      if (minChil === undefined || isNaN(minChil) || minChil < 0) minChil = 0;\r
      if (maxChil === undefined || isNaN(maxChil) || maxChil < minChil) maxChil = minChil;\r
\r
      // keep the Set of node data that do not yet have a parent\r
      var available = new go.Set();\r
      available.addAll(nodeArray);\r
      for (var i = 0; i < nodeArray.length; i++) {\r
        var parent = nodeArray[i];\r
        available.remove(parent);\r
\r
        // assign some number of node data as children of this parent node data\r
        var children = Math.floor(Math.random() * (maxChil - minChil + 1)) + minChil;\r
        for (var j = 0; j < children; j++) {\r
          var child = available.first();\r
          if (child === null) break; // oops, ran out already\r
          available.remove(child);\r
          // have the child node data refer to the parent node data by its key\r
          child.parent = parent.key;\r
          if (!parent.isGroup) {\r
            // make sure PARENT is a group\r
            parent.isGroup = true;\r
          }\r
          var par = parent;\r
          while (par !== null) {\r
            par.total += child.total; // sum up sizes of all children\r
            if (par.parent !== undefined) {\r
              par = nodeArray[par.parent];\r
            } else {\r
              break;\r
            }\r
          }\r
        }\r
      }\r
    }\r
    return nodeArray;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/TreeMapLayout.js`],descriptionHtml:`<p>\r
    This sample demonstrates a custom Layout, TreeMapLayout, which assumes that the diagram consists of nested Groups and simple Nodes. Each node is positioned\r
    and sized to fill an area of the viewport proportionate to its "size", as determined by its Node.data.size property. Each Group gets a size that is the sum\r
    of all of its member Nodes.\r
  </p>\r
  <p>The layout is defined in its own file, as <a href="../extensions/TreeMapLayout.js">TreeMapLayout.js</a>.</p>\r
  <p>\r
    Clicking repeatedly at the same point will initially select the Node at that point, and then its containing Group, and so on up the chain of containers.\r
  </p>\r
  <p>\r
    We have additional samples demonstrating variations.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`customlayout`,`groups`,`tooltips`,`extensions`,`html`];var g=y();l(`abkgzh`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};