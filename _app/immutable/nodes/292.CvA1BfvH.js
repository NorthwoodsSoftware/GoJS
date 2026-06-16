import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Visual Tree of another Diagram`,indexDescription:`This sample shows the actual visual tree of a running Diagram, using a second Diagram.`,screenshot:`visualtree`,priority:2,tags:[`treelayout`],description:`Show the visual elements of a simple diagram as a tree diagram -- each Node is data bound to an element of the other Diagram.`},htmlContent:`<b>myDiagram</b>, the diagram being inspected:<br />\r
  <div id="myDiagramDiv" style="border: 1px solid black; width: 100%; height: 200px"></div>\r
  <br />\r
  <button onclick="drawVisualTree()">Draw Visual Tree</button>\r
  <br />\r
  <br />\r
  <b>myVisualTree</b>, showing the Layers, Nodes and Links that are in <b>myDiagram</b> above:<br />\r
  <div id="myVisualTree" style="border: 1px solid black; background: #1f4963; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // define the "sample" Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bindTwoWay('location')\r
        .add(\r
          new go.Shape('RoundedRectangle', { fill: 'white', strokeWidth: 0 }) // define the node's outer shape\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // define the node's text\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ curve: go.Curve.Bezier })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue', location: new go.Point(0, 0) },\r
        { key: 2, text: 'Beta', color: 'pink', location: new go.Point(60, 80) }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 2, to: 1 }\r
      ]\r
    );\r
\r
    // Now we can initialize a Diagram that looks at the visual tree that constitutes the Diagram above.\r
    myVisualTree = new go.Diagram('myVisualTree', {\r
      initialContentAlignment: go.Spot.Left,\r
      initialAutoScale: go.AutoScale.Uniform,\r
      isReadOnly: true, // do not allow users to modify or select in this view\r
      allowSelect: false,\r
      layout: new go.TreeLayout({ nodeSpacing: 5 }) // automatically laid out as a tree\r
    });\r
\r
    myVisualTree.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape({ fill: 'white', stroke: null }), // assume a dark background\r
          new go.TextBlock({\r
              font: 'bold 13px monospace',\r
              stroke: 'black',\r
              margin: 3\r
            })\r
            // bind the text to the Diagram/Layer/Part/GraphObject converted to a string\r
            .bind('text', '', x => {\r
              // if the node represents a link, be sure to include the "to/from" data for that link\r
              if (x instanceof go.Link) {\r
                var s = 'Link#' + x.data.__gohashid;\r
                s += '(' + x.data.from + ' to ' + x.data.to + ')';\r
                return s;\r
              } else return x.toString();\r
            })\r
        );\r
\r
    myVisualTree.linkTemplate =\r
      new go.Link({ corner: 10 })\r
        .add(\r
          new go.Shape({ stroke: 'white', strokeWidth: 2 })\r
        );\r
\r
    drawVisualTree();\r
  }\r
\r
  function drawVisualTree() {\r
    var visualNodeDataArray = [];\r
\r
    // recursively walk the visual tree, collecting objects as we go\r
    function traverseVisualTree(obj, parent) {\r
      obj.vtkey = visualNodeDataArray.length;\r
      visualNodeDataArray.push(obj);\r
      if (parent) {\r
        obj.parentKey = parent.vtkey;\r
      }\r
      if (obj instanceof go.Diagram) {\r
        var lit = obj.layers;\r
        while (lit.next()) traverseVisualTree(lit.value, obj);\r
      } else if (obj instanceof go.Layer) {\r
        var pit = obj.parts;\r
        while (pit.next()) traverseVisualTree(pit.value, obj);\r
      } else if (obj instanceof go.Panel) {\r
        var eit = obj.elements;\r
        while (eit.next()) traverseVisualTree(eit.value, obj);\r
      }\r
    }\r
\r
    traverseVisualTree(myDiagram, null);\r
\r
    myVisualTree.model = new go.TreeModel({\r
      nodeKeyProperty: 'vtkey',\r
      nodeParentKeyProperty: 'parentKey',\r
      nodeDataArray: visualNodeDataArray\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows the actual visual tree of a running Diagram. The Diagram that we inspect is named "myDiagramDiv" and initially contains two simple Nodes\r
    and two Links. The Diagram below it is named "myVisualTree" and shows the visual tree of "myDiagramDiv".\r
  </p>\r
  <p>\r
    You can also try selecting, copying, and deleting parts in <b>myDiagram</b> and then click on "Draw Visual Tree" again to see how the visual tree in\r
    <b>myDiagram</b> changes.\r
  </p>\r
  <p>\r
    The <b>traverseVisualTree</b> function is what walks the visual tree of "myDiagramDiv" and constructs the corresponding Nodes and Links used in\r
    "myVisualTree". The text for each Node in "myVisualTree" is data-bound to the actual Diagram/Layer/Part/GraphObject object. That object is converted to a\r
    text string by using the <b>toString</b> method.\r
  </p>\r
  <p>\r
    See also the <a href="visualTreeGrouping">Visual Tree Using Groups</a> sample, to show the same visual tree using nested groups. For more uses of the\r
    <a>TreeLayout</a>, see the <a href="DOMTree">DOM Tree</a> and <a href="classHierarchy">Class Hierarchy Tree</a> samples.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`];var g=y();l(`10lhnyl`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};