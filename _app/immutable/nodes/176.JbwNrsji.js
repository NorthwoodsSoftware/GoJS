import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Router Shifting Link Labels to Reduce Overlaps`,titleShort:`Link Label Router`,indexDescription:`A demonstration of the LinkLabelRouter extension based on the Dynamic Ports sample. Move Nodes or create new links to demonstrate that link labels will automatically move to a nearby location to avoid overlapping.`,screenshot:`linklabelrouter`,priority:2,tags:[`routers`,`extensions`],description:`A custom Router that prevents overlaps between labels on links.`},htmlContent:`<div id="myDiagramDiv" style="width: 100%; height: 500px; border: 1px solid black"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
\r
    <textarea id="mySavedModel" style="width: 100%; height: 250px">\r
      { "class": "GraphLinksModel",\r
      "copiesArrays": true,\r
      "copiesArrayObjects": true,\r
      "linkFromPortIdProperty": "fromPort",\r
      "linkToPortIdProperty": "toPort",\r
      "nodeDataArray": [\r
      {"key":1,"name":"Unit One","loc":"101 204","leftArray":[{"portColor":0,"portId":"left0"}],"topArray":[{"portColor":1,"portId":"top0"}],"bottomArray":[{"portColor":2,"portId":"bottom0"}],"rightArray":[{"portColor":3,"portId":"right0"},{"portColor":0,"portId":"right1"}]},\r
      {"key":2,"name":"Unit Two","loc":"320 152","leftArray":[{"portColor":0,"portId":"left0"},{"portColor":0,"portId":"left1"},{"portColor":0,"portId":"left2"}],"topArray":[{"portColor":3,"portId":"top0"}],"bottomArray":[{"portColor":2,"portId":"bottom0"},{"portColor":3,"portId":"bottom1"},{"portColor":0,"portId":"bottom2"}],"rightArray":[]},\r
      {"key":3,"name":"Unit Three","loc":"384 319","leftArray":[{"portColor":0,"portId":"left0"},{"portColor":0,"portId":"left1"},{"portColor":0,"portId":"left2"}],"topArray":[{"portColor":0,"portId":"top0"}],"bottomArray":[{"portColor":2,"portId":"bottom0"}],"rightArray":[]},\r
      {"key":4,"name":"Unit Four","loc":"138 351","leftArray":[{"portColor":0,"portId":"left0"}],"topArray":[{"portColor":0,"portId":"top0"}],"bottomArray":[{"portColor":2,"portId":"bottom0"}],"rightArray":[{"portColor":0,"portId":"right0"},{"portColor":0,"portId":"right1"}]},\r
      {"key":5,"name":"Unit Five","loc":"260 460","leftArray":[],"topArray":[{"portColor":0,"portId":"top0"},{"portColor":1,"portId":"top1"}],"bottomArray":[],"rightArray":[{"portColor":0,"portId":"right0"},{"portColor":0,"portId":"right1"}]},\r
      {"key":6,"name":"Unit Six","loc":"12 508","leftArray":[],"topArray":[{"portColor":0,"portId":"top0"},{"portColor":1,"portId":"top1"}],"bottomArray":[],"rightArray":[{"portColor":0,"portId":"right0"},{"portColor":0,"portId":"right1"}]}\r
      ],\r
        "linkDataArray": [\r
      {"from":4,"to":2,"fromPort":"top0","toPort":"bottom0","labelText":"Unit 4 to 2","labelColor":"lightblue"},\r
      {"from":4,"to":2,"fromPort":"top0","toPort":"bottom0","labelText":"Unit 4 to 2","labelColor":"lightblue"},\r
      {"from":3,"to":2,"fromPort":"top0","toPort":"bottom1","labelText":"Unit 3 to 2","labelColor":"lightblue"},\r
      {"from":4,"to":3,"fromPort":"right0","toPort":"left0","labelText":"Unit 4 to 3","labelColor":"lightblue"},\r
      {"from":4,"to":3,"fromPort":"right1","toPort":"left2","labelText":"Unit 4 to 3","labelColor":"lightblue"},\r
      {"from":1,"to":2,"fromPort":"right0","toPort":"left1","labelText":"Unit 1 to 2","labelColor":"lightblue"},\r
      {"from":1,"to":2,"fromPort":"right1","toPort":"left2","labelText":"Unit 1 to 2","labelColor":"lightblue"},\r
      {"from":6,"to":4,"fromPort":"top1","toPort":"left0","labelText":"Unit 6 to 4","labelColor":"lightblue"},\r
      {"from":6,"to":4,"fromPort":"top0","toPort":"left0","labelText":"Unit 6 to 4","labelColor":"lightblue"},\r
      {"from":6,"to":5,"fromPort":"right0","toPort":"top0","labelText":"Unit 6 to 5","labelColor":"lightblue"},\r
      {"from":6,"to":5,"fromPort":"right1","toPort":"right1","labelText":"Unit 6 to 5","labelColor":"lightblue"},\r
      {"from":6,"to":1,"fromPort":"top1","toPort":"bottom0","labelText":"Unit 6 to 1","labelColor":"lightblue"},\r
      {"from":6,"to":1,"fromPort":"top1","toPort":"top0","labelText":"Unit 6 to 1","labelColor":"lightblue"},\r
      {"from":5,"to":4,"fromPort":"top1","toPort":"bottom0","labelText":"Unit 5 to 4","labelColor":"lightblue"},\r
      {"from":5,"to":3,"fromPort":"right0","toPort":"bottom0","labelText":"Unit 5 to 3","labelColor":"lightblue"}\r
      ]}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });\r
\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) { if (idx < 0) document.title += '*'; }\r
      else { if (idx >= 0) document.title = document.title.slice(0, idx); }\r
    });\r
\r
    myDiagram.routers.add(new AvoidsLinksRouter());\r
    myDiagram.routers.add(new LinkLabelRouter());\r
\r
    // Use some colors for ports\r
    portColors = ['black', 'red', 'green', 'gray'];\r
    myDiagram.themeManager.set('', {\r
      colors: { ports: portColors }\r
    });\r
\r
    const portSize = new go.Size(8, 8);\r
\r
    // the node template\r
    // includes a panel on each side with an itemArray of panels that are ports\r
    myDiagram.nodeTemplate =\r
      new go.Node('Table', {\r
          locationObjectName: 'BODY',\r
          locationSpot: go.Spot.Center,\r
          selectionObjectName: 'BODY'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // the body\r
          new go.Panel('Auto', {\r
              row: 1,\r
              column: 1,\r
              name: 'BODY',\r
              stretch: go.Stretch.Fill\r
            })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                fill: 'lightgray',\r
                stroke: 'gray',\r
                strokeWidth: 0.5,\r
                minSize: new go.Size(60, 60)\r
              }),\r
              new go.TextBlock({\r
                  margin: 10,\r
                  textAlign: 'center',\r
                  font: 'bold 14px Segoe UI,sans-serif',\r
                  stroke: '#484848',\r
                  editable: true\r
                })\r
                .bindTwoWay('text', 'name')\r
            ), // end Auto Panel body\r
\r
          // the Panel holding the left port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.leftArray\r
          new go.Panel('Vertical', {\r
              row: 1,\r
              column: 0,\r
              itemTemplate:\r
                new go.Panel({\r
                    fromSpot: go.Spot.Left,\r
                    toSpot: go.Spot.Left,\r
                    fromLinkable: true,\r
                    toLinkable: true,\r
                    cursor: 'pointer'\r
                  })\r
                  .attach({ _side: 'left' })  // internal property to make it easier to tell which side it's on\r
                  .bind('portId')\r
                  .add(\r
                    new go.Shape('Rectangle', {\r
                        stroke: null,\r
                        strokeWidth: 0,\r
                        desiredSize: portSize,\r
                        margin: new go.Margin(1, 0)\r
                      })\r
                      .themeData('fill', 'portColor', 'ports')\r
                  ) // end itemTemplate\r
            }) // end Vertical Panel\r
            .bind('itemArray', 'leftArray'),\r
\r
          // the Panel holding the top port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.topArray\r
          new go.Panel('Horizontal', {\r
              row: 0,\r
              column: 1,\r
              itemTemplate:\r
                new go.Panel({\r
                    fromSpot: go.Spot.Top,\r
                    toSpot: go.Spot.Top,\r
                    fromLinkable: true,\r
                    toLinkable: true,\r
                    cursor: 'pointer'\r
                  })\r
                  .attach({ _side: 'top' })  // internal property to make it easier to tell which side it's on\r
                  .bind('portId')\r
                  .add(\r
                    new go.Shape('Rectangle', {\r
                        stroke: null,\r
                        strokeWidth: 0,\r
                        desiredSize: portSize,\r
                        margin: new go.Margin(0, 1)\r
                      })\r
                      .themeData('fill', 'portColor', 'ports')\r
                  ) // end itemTemplate\r
            }) // end Horizontal Panel\r
            .bind('itemArray', 'topArray'),\r
\r
          // the Panel holding the right port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.rightArray\r
          new go.Panel('Vertical', {\r
              row: 1,\r
              column: 2,\r
              itemTemplate:\r
                new go.Panel({\r
                    fromSpot: go.Spot.Right,\r
                    toSpot: go.Spot.Right,\r
                    fromLinkable: true,\r
                    toLinkable: true,\r
                    cursor: 'pointer'\r
                  })\r
                  .attach({ _side: 'right' })  // internal property to make it easier to tell which side it's on\r
                  .bind('portId')\r
                  .add(\r
                    new go.Shape('Rectangle', {\r
                        stroke: null,\r
                        strokeWidth: 0,\r
                        desiredSize: portSize,\r
                        margin: new go.Margin(1, 0)\r
                      })\r
                      .themeData('fill', 'portColor', 'ports')\r
                  ) // end itemTemplate\r
            }) // end Vertical Panel\r
            .bind('itemArray', 'rightArray'),\r
\r
          // the Panel holding the bottom port elements, which are themselves Panels,\r
          // created for each item in the itemArray, bound to data.bottomArray\r
          new go.Panel('Horizontal', {\r
              row: 2,\r
              column: 1,\r
              itemTemplate:\r
                new go.Panel({\r
                  fromSpot: go.Spot.Bottom,\r
                  toSpot: go.Spot.Bottom,\r
                  fromLinkable: true,\r
                  toLinkable: true,\r
                  cursor: 'pointer'\r
                })\r
                .attach({ _side: 'bottom' })  // internal property to make it easier to tell which side it's on\r
                .bind('portId')\r
                .add(\r
                  new go.Shape('Rectangle', {\r
                      stroke: null,\r
                      strokeWidth: 0,\r
                      desiredSize: portSize,\r
                      margin: new go.Margin(0, 1)\r
                    })\r
                    .themeData('fill', 'portColor', 'ports')\r
                ) // end itemTemplate\r
          }) // end Horizontal Panel\r
          .bind('itemArray', 'bottomArray')\r
        );\r
\r
    // an orthogonal link template, reshapable and relinkable\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 4,\r
          curve: go.Curve.JumpGap,\r
          reshapable: true,\r
          resegmentable: true,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          new go.Shape({ stroke: '#2F4F4F', strokeWidth: 1.5 }),\r
          new go.Panel("Auto")\r
            .add(\r
              new go.Shape("RoundedRectangle", { fill: "white" })\r
                .bind("fill", "labelColor")\r
                .bind("width", "labelWidth")\r
                .bind("height", "labelHeight"),\r
              new go.TextBlock({\r
                  font: "bold 10px Segoe UI,sans-serif",\r
                  stroke: '#484848',\r
                  margin: 2\r
                })\r
                .bind("text", "labelText")\r
            )\r
        );\r
\r
    myDiagram.toolManager.linkingTool.archetypeLinkData = {\r
      labelColor: "lightblue",\r
      labelText: "Link Label"\r
    }\r
\r
    // load the diagram from JSON data\r
    load();\r
  }\r
\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
\r
    // When copying a node, we need to copy the data that the node is bound to.\r
    // This JavaScript object includes properties for the node as a whole, and\r
    // four properties that are Arrays holding data for each port.\r
    // Those arrays and port data objects need to be copied too.\r
    // Thus Model.copiesArrays and Model.copiesArrayObjects both need to be true.\r
\r
    // Link data includes the names of the to- and from- ports;\r
    // so the GraphLinksModel needs to set these property names:\r
    // linkFromPortIdProperty and linkToPortIdProperty.\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/AvoidsLinksRouter.js`,`../extensions/LinkLabelRouter.js`],descriptionHtml:`<p>\r
    The <a>Diagram.routers</a> <a>List</a> has both the\r
    <a href="../extensions/LinkLabelRouter.js">Link Label Router</a> and\r
    <a href="./AvoidsLinksRouter">Avoids Links Router</a>, this way <a>Link</a>s\r
    and labels won't overlap allowing the <a>Diagram</a> be more readable.\r
  </p>\r
  <p>\r
    The <a href="./AvoidsLinksRouter">Avoids Links Router</a>\r
    live updates while <a>Node</a>s are being dragged, after the <a>Node</a> is\r
    released the <a href="../extensions/LinkLabelRouter.js">Link Label Router</a>\r
    will adjust the labels to prevent overlapping when possible.\r
  </p>\r
  <p>See <a href="../extensionsJSM/AvoidsLinksRouter.ts">AvoidsLinksRouter.ts</a> for the TypeScript source.</p>\r
  <p>See the <a href="../intro/ports">Ports learn page</a> for an explanation of GoJS ports.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`routers`,`extensions`];var g=y();l(`ryty38`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};