import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Pipe Tree: Nodes at Alternating Angles of Decreasing Thickness`,titleShort:`Pipe Tree`,indexDescription:`A tree layout with rectangular nodes at alternating angles and no links.`,screenshot:`pipetree`,priority:2,tags:[`treelayout`],description:`A tree structure that does not use links.`},htmlContent:`<div id="myDiagramDiv" style="width: 100%; height: 600px; border: 1px solid black"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      isReadOnly: true,\r
      // define a TreeLayout where alternating layers of nodes grow in different directions\r
      // child and parent nodes have no space between them.\r
      layout: new go.TreeLayout({\r
        treeStyle: go.TreeStyle.Alternating,\r
        angle: 90,\r
        layerSpacing: 0,\r
        alternateAngle: 0,\r
        alternateLayerSpacing: 0\r
      })\r
    });\r
\r
    // the node template\r
    // the shape will be resized appropriately when the model is set up\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('Rectangle', { name: 'SHAPE', width: 30, height: 30 })\r
            .bind('fill', 'color')\r
            .bind('stroke', 'color'),\r
          new go.TextBlock({ name: 'TEXTBLOCK', margin: 5 })\r
            .bind('text', 'flow', flow => getText(flow))\r
        );\r
\r
    // the Links should have no graphical representation\r
    myDiagram.linkTemplate = new go.Link();\r
\r
    myDiagram.model = new go.TreeModel([\r
      { key: 1, flow: 92, color: '#808080' },\r
      { key: 2, parent: 1, flow: 47, color: '#808080' },\r
      { key: 3, parent: 1, flow: 45, color: '#808080' },\r
      { key: 4, parent: 2, flow: 15, color: '#808080' },\r
      { key: 5, parent: 2, flow: 17, color: '#808080' },\r
      { key: 6, parent: 2, flow: 15, color: '#808080' },\r
      { key: 7, parent: 5, flow: 8, color: '#FFFF00' },\r
      { key: 8, parent: 5, flow: 9, color: '#FF0000' },\r
      { key: 9, parent: 6, flow: 5, color: '#808080' },\r
      { key: 10, parent: 6, flow: 5, color: '#808080' },\r
      { key: 11, parent: 6, flow: 5, color: '#808080' }\r
    ]);\r
\r
    myDiagram.delayInitialization(updatePipes);\r
  }\r
\r
  // return the text for the TextBlock, using the current number to determine its name\r
  function getText(flow) {\r
    if (flow < 10) return 'SubLateral -- Current: ' + flow + ' gpm';\r
    if (flow < 25) return 'Lateral -- Current: ' + flow + ' gpm';\r
    if (flow < 50) return 'SubMain -- Current: ' + flow + ' gpm';\r
    return 'Main -- Max: 100 gpm  Current: ' + flow + ' gpm';\r
  }\r
\r
  // give all shapes the appropriate dimensions and text color, size, and orientation.\r
  function updatePipes(diagram) {\r
    var updated = 1; // when this is 0, no more nodes are in need of updating\r
    while (updated !== 0) {\r
      // have layout determine node positions first\r
      diagram.layoutDiagram();\r
      updated = 0;\r
      var nodes = diagram.nodes.iterator;\r
      while (nodes.next()) {\r
        var node = nodes.value;\r
        var shape = node.findObject('SHAPE');\r
        if (!areChildrenUpdated(node) || !(shape.width === shape.height)) continue;\r
        // update the node if all of its children have been updated and it has not\r
        // this allows its size to be determined based on its childrens' positions once they have been updated and repositioned\r
        else updated++;\r
        // depending on the lightness of the node's color, make the text black or white\r
        var colorBrightness = parseInt(shape.fill.substring(1, 3), 16) + parseInt(shape.fill.substring(3, 5), 16) + parseInt(shape.fill.substring(5, 7), 16);\r
        if (colorBrightness <= 384) {\r
          node.findObject('TEXTBLOCK').stroke = 'white';\r
        }\r
        var horiz;\r
        var linkIn = node.findTreeParentLink();\r
        if (linkIn === null) horiz = true;\r
        // the root node grows horizontally from the left, as do any nodes with links entering their left side\r
        else horiz = linkIn.toSpot.x === 0;\r
        var long = 70;\r
        // the length of the longer side of the shape\r
        if (node.findTreeChildrenLinks().count === 0) long = 170;\r
        var short = 20;\r
        // the length of the shorter side of the shape\r
        var flow = node.data.flow;\r
        // size of the shape depends on the node's "current"\r
        if (flow > 20) {\r
          short = 50;\r
          long += 30;\r
        }\r
        if (flow > 50) short = 100;\r
        // font size also depends on current\r
        node.findObject('TEXTBLOCK').font = Math.floor(10 + flow / 11) + 'px sans-serif';\r
        var chl = node.findTreeChildrenNodes();\r
        if (horiz) {\r
          var min = node.location.x;\r
          var max = min;\r
          while (chl.next()) {\r
            if (min === max) if (chl.value.location.x < min) min = chl.value.location.x;\r
            if (chl.value.location.x > max) max = chl.value.location.x;\r
          }\r
          long += max - min;\r
          // make sure the shape is large enough to reach all children\r
          if (long < 160) long = 160;\r
          // a minimum shape size\r
          shape.height = short;\r
          shape.width = long;\r
          // the horizontal side is longer\r
          // set the shape's size\r
        } else {\r
          var min = node.location.y;\r
          var max = min;\r
          while (chl.next()) {\r
            if (min === max) if (chl.value.location.y < min) min = chl.value.location.y;\r
            if (chl.value.location.y > max) max = chl.value.location.y;\r
          }\r
          long += max - min;\r
          if (long < 160) long = 160;\r
          shape.height = long;\r
          shape.width = short;\r
          // the longer size is the vertical one in this case\r
          node.findObject('TEXTBLOCK').angle = 90;\r
          // rotate the TextBlock if the shape is longer vertically\r
        }\r
      }\r
    }\r
  }\r
\r
  // check if the children of this node have all had their sizes changed from the initial one\r
  // if they have been updated, their widths and heights cannot be equal\r
  function areChildrenUpdated(node) {\r
    return node.findTreeChildrenNodes().all(child => child.findObject('SHAPE').width !== child.findObject('SHAPE').height);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This diagram does not display <a>Link</a>s. Instead the <a>TreeLayout.layerSpacing</a> is set to 0, so that each node and its children have no space between\r
    them.\r
  </p>\r
  <p>\r
    The <a>TreeLayout.treeStyle</a> is set to StyleAlternating, so that alternating layers of the tree grow in each of two directions. Each node's\r
    <a>TextBlock</a> is angled according to the direction of the layer of the tree that it is in, and the <a>Shape</a>'s size is set according to direction and\r
    the position of the node's children.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`];var g=y();l(`1wtwdf9`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};