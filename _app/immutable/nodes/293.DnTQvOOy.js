import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Visual Tree using Groups`,indexDescription:`This shows the same visual tree using nested Groups instead of nodes and links.`,screenshot:`visualtreegrouping`,priority:2,tags:[`gridlayout`,`treelayout`,`groups`],description:`Show the visual elements of a simple diagram as a nested grouping diagram -- each Group is data bound to an element of the other Diagram.`},htmlContent:`<b>myDiagram</b>, the diagram being inspected:<br />\r
  <div id="myDiagramDiv" style="border: 1px solid black; width: 100%; height: 200px"></div>\r
  <br />\r
  <button onclick="drawVisualTree()">Draw Visual Tree</button>\r
  <br />\r
  <br />\r
  <b>myVisualTree</b>, showing the Layers, Nodes and Links that are in <b>myDiagram</b> above:<br />\r
  <div id="myVisualTree" style="border: 1px solid black; width: 100%; height: 400px; background-color: whitesmoke;"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // define the "sample" Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('RoundedRectangle', { // define the node's outer shape\r
              fill: 'rgb(150, 60, 60)',\r
              stroke: 'rgb(235, 194, 117)',\r
              strokeWidth: 2\r
            })\r
            .bind('fill', 'color')\r
            .bind('stroke'),\r
          new go.TextBlock({ margin: 7 }) // define the node's text\r
            .bind('text')\r
            .bind('stroke')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ toShortLength: 2 })\r
        .add(\r
          new go.Shape({\r
              stroke: "rgb(150, 60, 60)",\r
              strokeWidth: 2\r
            }),  // the link shape\r
          new go.Shape({   // the arrowhead\r
              toArrow: "OpenTriangle",\r
              stroke: "rgb(150, 60, 60)",\r
              strokeWidth: 2\r
            })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'rgba(243, 153, 73, 0.2)', stroke: 'rgb(150, 60, 60)'},\r
        { key: 2, text: 'Beta', color: 'rgba(243, 153, 73, 0.2)', stroke: 'rgb(243, 153, 73)'}\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
\r
    // Now we can initialize a Diagram that looks at the visual tree that constitutes the Diagram above.\r
    myVisualTree = new go.Diagram('myVisualTree', {\r
      isReadOnly: true, // do not allow users to modify or select in this view\r
      allowSelect: false,\r
      layout: new go.TreeLayout({ nodeSpacing: 5 }) // automatically laid out as a tree\r
    });\r
\r
    // use Groups, not regular Nodes or Links, to show relationship of GraphObjects in myDiagram\r
    myVisualTree.groupTemplate =\r
      new go.Group('Auto', {\r
          layout: new go.GridLayout({\r
            wrappingColumn: 2,\r
            alignment: go.GridAlignment.Position,\r
            cellSize: new go.Size(1, 1)\r
          })\r
        })\r
        .add(\r
          new go.Shape({ fill: "rgba(243, 153, 73, 0.2)", stroke: "rgb(150, 60, 60)", strokeWidth: 2 }),\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Placeholder({ padding: new go.Margin(15, 5, 5, 5) }),\r
              new go.TextBlock({\r
                  font: 'bold 13px monospace',\r
                  stroke: 'rgb(150, 60, 60)',\r
                  margin: 5,\r
                  alignment: go.Spot.Top,\r
                  alignmentFocus: go.Spot.Top\r
                })\r
                // bind the text to the Diagram/Layer/Part/GraphObject converted to a string\r
                .bind('text', '', x => x.toString())\r
            )\r
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
    myVisualTree.model = new go.GraphLinksModel({\r
      nodeKeyProperty: 'vtkey',\r
      nodeGroupKeyProperty: 'parentKey',\r
      // always return true so that all node data is represented by groups\r
      nodeIsGroupProperty: data => true,\r
      nodeDataArray: visualNodeDataArray\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    You can also try selecting, copying, and deleting parts in <b>myDiagram</b> and then click on "Draw Visual Tree" again to see how the visual tree in\r
    <b>myDiagram</b> changes.\r
  </p>\r
  <p>See also the <a href="visualTree">Visual Tree</a> sample, to show the same visual tree using nodes and links in a traditional tree structure.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gridlayout`,`treelayout`,`groups`];var g=y();l(`qxrxcq`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};