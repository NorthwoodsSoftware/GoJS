import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Charts drawn by Chart.js in Nodes`,titleShort:`Chart.js Charts in Nodes`,indexDescription:`Shows how to render a data-driven chart within each Node using the Chart.js library.`,screenshot:`canvases`,priority:2,tags:[`charts`,`html`,`frameworks`],description:`A diagram where each node contains a chart rendered by Chart.js.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <button onclick="addNode()">Add Chart</button>\r
  <button onclick="modifyNodes()">Modify Charts of Selected Nodes</button>\r
  <!-- myCanvases is used by makeLineChart, but need not be seen by the user -->\r
  <div\r
    id="myCanvases"\r
    style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; opacity: 0"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.TreeLayout()\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: 'transparent' })\r
                .bind('stroke', 'color'),\r
              new go.Picture({ width: 300, height: 150, portId: '' })\r
                .bind('element', 'datasets', makeLineChart)\r
            ),\r
          new go.TextBlock({ margin: 8 })\r
            .bind('text')\r
        );\r
\r
    // This Binding conversion function creates a Canvas element for a Picture\r
    // that has a rendering of a line chart drawn by Chart.js.\r
    function makeLineChart(datasets, picture) {\r
      var canvases = document.getElementById('myCanvases');\r
\r
      canv = document.createElement('canvas');\r
      canv.width = canv.style.width = '600px';\r
      canv.height = canv.style.height = '300px';\r
\r
      // apparently Chart.js expects the Canvas to be in a DIV\r
      var div = document.createElement('div');\r
      div.style.position = 'absolute';\r
      div.appendChild(canv);\r
      // add the DIV/Canvas to the DOM, temporarily\r
      canvases.appendChild(div);\r
\r
      var config = {\r
        // Chart.js configuration, including the DATASETS data from the model data\r
        type: 'line',\r
        data: {\r
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],\r
          datasets: datasets\r
        },\r
        options: {\r
          animation: {\r
            onProgress: () => picture.redraw(),\r
            onComplete: () => {\r
              var canvases = document.getElementById('myCanvases');\r
              if (canvases) {\r
                // remove the Canvas that was in the DOM for rendering\r
                canvases.removeChild(div);\r
              }\r
              picture.redraw();\r
            }\r
          }\r
        }\r
      };\r
\r
      new Chart(canv, config);\r
\r
      return canv;\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          key: 1,\r
          text: 'Alpha',\r
          datasets: [\r
            {\r
              label: 'Random data',\r
              borderColor: 'black',\r
              data: makeRandomPoints(8, 10)\r
            }\r
          ]\r
        },\r
        {\r
          key: 2,\r
          text: 'Beta',\r
          datasets: [\r
            {\r
              label: 'First dataset',\r
              fill: false,\r
              backgroundColor: 'red',\r
              borderColor: 'red',\r
              data: makeRandomPoints(8)\r
            },\r
            {\r
              label: 'Second dataset',\r
              fill: false,\r
              backgroundColor: 'blue',\r
              borderColor: 'blue',\r
              data: makeRandomPoints(8)\r
            }\r
          ]\r
        },\r
        {\r
          key: 3,\r
          text: 'Gamma',\r
          color: 'green',\r
          datasets: [\r
            {\r
              label: 'some data',\r
              fill: false,\r
              backgroundColor: 'green',\r
              borderColor: 'green',\r
              data: makeRandomPoints()\r
            }\r
          ]\r
        }\r
      ],\r
      linkDataArray: [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 }\r
      ]\r
    });\r
  }\r
\r
  function makeRandomPoints(num, range) {\r
    if (!num) num = 20;\r
    if (!range) range = 100;\r
    var pts = [];\r
    for (var i = 0; i < num; i++) {\r
      pts.push(Math.random() * range);\r
    }\r
    return pts;\r
  }\r
\r
  function addNode() {\r
    myDiagram.model.commit(m => {\r
      var firstnode = myDiagram.nodes.first();\r
      var color = go.Brush.darken(go.Brush.randomColor());\r
      var data = {\r
        text: 'Node ' + (myDiagram.nodes.count + 1),\r
        color: color,\r
        datasets: [\r
          {\r
            label: 'some data',\r
            fill: false,\r
            backgroundColor: color,\r
            borderColor: color,\r
            data: makeRandomPoints()\r
          }\r
        ]\r
      };\r
      m.addNodeData(data);\r
      if (firstnode) {\r
        m.addLinkData({ from: firstnode.key, to: m.getKeyForNodeData(data) });\r
        // new node starts off at same location as the parent node\r
        var newnode = myDiagram.findNodeForData(data);\r
        if (newnode) newnode.location = firstnode.location;\r
      }\r
    }, 'added chart node');\r
  }\r
\r
  function modifyNodes() {\r
    myDiagram.commit(diag => {\r
      diag.selection.each(node => {\r
        var oldset = node.data.datasets;\r
        if (!oldset) return; // if it's a link, there's no datasets property\r
        diag.model.set(node.data, 'datasets', [\r
          {\r
            label: oldset[0].label,\r
            fill: false,\r
            backgroundColor: oldset[0].backgroundColor,\r
            borderColor: oldset[0].borderColor,\r
            data: makeRandomPoints()\r
          }\r
        ]);\r
      });\r
    }, 'modified selected nodes');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js`],descriptionHtml:`<p>\r
    This app demonstrates using a popular charting library,\r
    <a href="https://chartjs.org">Chart.js</a>, for rendering charts within nodes.\r
  </p>\r
  <p>\r
    The data for each chart is stored on the node data in the model. In this case the\r
    <code>datasets</code>\r
    property value has the same properties that are expected by the Chart.js configuration, but you\r
    could organize the data however you want.\r
  </p>\r
  <p>\r
    The <code>makeLineChart</code> conversion function is used by a <a>Binding</a> on\r
    <a>Picture.element</a> to generate a Canvas element that can be shown in the node. Most of the\r
    implementation of that function is specific to Chart.js. The rendering requires the Canvas to be\r
    in the HTML DOM. To avoid accumulating resources, the configuration of the chart defines an\r
    <code>onComplete</code> event handler to remove the Canvas element from the DOM. That allows any\r
    future removal of the Node from the Diagram not to leave an unused Canvas element behind.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`charts`,`html`,`frameworks`];var g=y();l(`meo1s9`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};