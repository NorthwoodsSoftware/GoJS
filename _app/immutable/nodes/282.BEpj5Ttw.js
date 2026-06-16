import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Two Rounded Halves`,indexDescription:`Nodes consisting of two Panels, using a RoundedTopRectangle and a RoundedBottomRectangle figure.`,screenshot:`twohalves`,priority:2,tags:[`geometries`],description:`Nodes consisting of two Panels, using a RoundedTopRectangle and a RoundedBottomRectangle figure.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <pre class="lang-js" style="height: 215px"><code id="mySavedModel">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
    { "key": "Alpha", "topText": "A", "topColor": "lightgray", "bottomText": "B", "bottomColor": "green" },\r
    { "key": "Beta", "topText": "C", "bottomText": "D", "bottomColor": "red", "star": true }\r
  ],\r
  "linkDataArray": [\r
    { "from": "Alpha", "to": "Beta" }\r
  ]\r
}\r
  </code></pre>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialScale: 2.0,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    var NodeInfoSize = new go.Size(50, 25); // controls the size of each half\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          selectionAdorned: false,\r
          locationSpot: go.Spot.Center\r
        })\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', {\r
                  stroke: 'transparent',\r
                  strokeWidth: 3,\r
                  spot1: go.Spot.TopLeft,\r
                  spot2: go.Spot.BottomRight\r
                })\r
                .bindObject('stroke', 'isSelected', s => s ? 'dodgerblue' : 'transparent'), // shown when selected\r
              new go.Panel()\r
                .add(\r
                  new go.Panel('Auto', { desiredSize: NodeInfoSize })\r
                    .add(\r
                      new go.Shape('RoundedTopRectangle', { fill: 'white' })\r
                        .bind('fill', 'topColor'),\r
                      new go.TextBlock()\r
                        .bind('text', 'topText')\r
                    ),\r
                  new go.Panel('Auto', {\r
                      desiredSize: NodeInfoSize,\r
                      position: new go.Point(0, NodeInfoSize.height - 1)\r
                    })\r
                    .add(\r
                      new go.Shape('RoundedBottomRectangle', { fill: 'white' })\r
                        .bind('fill', 'bottomColor'),\r
                      new go.TextBlock()\r
                        .bind('text', 'bottomText')\r
                    )\r
                )\r
            ),\r
          // decorations...\r
          new go.Shape('Triangle', {\r
              desiredSize: new go.Size(12, 12),\r
              fill: 'yellow',\r
              alignment: new go.Spot(1, 0, -2, 2),\r
              opacity: 0.0\r
            })\r
            .bind('opacity', 'star', v => v ? 1.0 : 0.0)\r
        );\r
\r
    load();\r
  }\r
\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').innerText);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This defines a node template consisting of a top half and a bottom half. Each half's text and color are data bound. However the size of each node is fixed,\r
    so if the text is too long, it will be clipped.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`geometries`];var g=y();l(`h4npus`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};