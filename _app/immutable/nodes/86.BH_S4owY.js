import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Animated Scrolling and Zooming Attention to Node`,titleShort:`Animated Node Attention`,indexDescription:`Aninmated focus by scrolling to a node along with animation of the size of the node to draw attention to it..`,screenshot:`animatedfocus`,priority:2,tags:[`animation`],description:`When focussing on a node, scroll with animation to it and show a magnified image of it shrinking in place.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <button onclick="focusOnNode()">Focus on random Node</button>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // allow some empty space to appear when scrolled to the edge of the document\r
      scrollMargin: 200,\r
      // the layout does not really matter for this sample\r
      layout: new go.GridLayout({ wrappingWidth: 4000 }),\r
      InitialLayoutCompleted: e => {\r
        // wait until initial layout and initial animation are finished,\r
        // then select the node and scroll to it with its own animation\r
        var node = null; // you might choose a particular node in your app\r
        setTimeout(() => focusOnNode(node), e.diagram.animationManager.duration);\r
      }\r
    });\r
\r
    // the templates do not really matter for this sample\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { width: 120, height: 60 })\r
        .add(\r
          new go.Shape()\r
            .bind('fill'),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    // create enough nodes so that only part of the document will fit in the viewport\r
    var arr = [];\r
    for (var i = 0; i < 1000; i++) {\r
      var color = go.Brush.randomColor();\r
      arr.push({ text: color, fill: color });\r
    }\r
    myDiagram.model = new go.GraphLinksModel(arr);\r
  }\r
\r
  function focusOnNode(node) {\r
    // node is optional\r
    // If no node is given, choose a node at random, and select it.\r
    if (!node) {\r
      var arr = myDiagram.model.nodeDataArray;\r
      var data = arr[Math.floor(Math.random() * arr.length)];\r
      node = myDiagram.findNodeForData(data);\r
    }\r
    if (!node) return;\r
    myDiagram.select(node);\r
\r
    // Set up an Animation that shows the node significantly larger than normal\r
    // and then scales it back down to normal.\r
    // This intentionally does not operate on the selected node itself,\r
    // but on a temporary copy of it, so that the node and the model are unaffected.\r
    var focus1 = node.copy();\r
    focus1.layerName = 'Tool';\r
    focus1.isInDocumentBounds = false;\r
    focus1.locationSpot = go.Spot.Center;\r
    focus1.location = node.actualBounds.center;\r
    // Figure out how large to scale it initially; assume maximum is one third of the viewport size\r
    var w = Math.max(node.actualBounds.width, 1);\r
    var h = Math.max(node.actualBounds.height, 1);\r
    var viewscale =\r
      Math.max(myDiagram.viewportBounds.width / w, myDiagram.viewportBounds.height / h) / 3;\r
    // Now create the Animation showing the temporary node scaled initially at VIEWSCALE\r
    var anim = new go.Animation();\r
    anim.addTemporaryPart(focus1, myDiagram);\r
    anim.add(focus1, 'scale', viewscale, 1.0); // and animating down to scale 1.0\r
    // This animation occurs concurrently with the scrolling animation.\r
    anim.duration = myDiagram.animationManager.duration + 1000;\r
    anim.start();\r
    // Meanwhile, make sure that the node is in the viewport, so the user can see it\r
    myDiagram.commandHandler.scrollToPart(node);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Click on this button to select a node at random, scroll to it, and animate a copy of it -- all\r
    to draw attention to it.\r
  </p>\r
  <p>\r
    This calls <a>CommandHandler.scrollToPart</a>, which conducts an animation to scroll the\r
    viewport to where the node is. Note that if the node is close to the edge of the document, the\r
    viewport cannot be scrolled so that the node is nearer to the center of the viewport unless you\r
    increase the <a>Diagram.scrollMargin</a>.\r
  </p>\r
  <p>\r
    This also creates an <a>Animation</a> that operates on a temporary copy of the selected node,\r
    making it appear much larger but animating the scale so that it appears to shrink to be the\r
    selected node where it is in the diagram.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`animation`];var g=y();l(`1kuabsc`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};