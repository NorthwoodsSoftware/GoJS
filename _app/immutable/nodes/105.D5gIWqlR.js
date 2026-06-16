import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Connection Box Editor with Custom Link Validation`,titleShort:`Connection Box Editor`,indexDescription:`A Node containing ports that allow linking between them, within the node as well as between nodes, with custom link validation.`,screenshot:`connectionboxnode`,priority:2,tags:[`tables`,`itemarrays`,`links`,`ports`],description:`Support link connections within a node as well as between nodes.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <pre class="lang-js" style="max-height: 250px;"><code id="mySavedModel"></code></pre>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialContentAlignment: go.Spot.Center, // for v1.*\r
      initialScale: 1.4,\r
      'undoManager.isEnabled': true,\r
      'linkingTool.direction': go.LinkingDirection.ForwardsOnly,\r
      ModelChanged: e => {\r
        // just for demonstration purposes,\r
        if (e.isTransactionFinished) {\r
          // show the model data in the page's TextArea\r
          document.getElementById('mySavedModel').innerHTML = e.model.toJson();\r
        }\r
      }\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Table', {\r
          selectionObjectName: 'BODY',\r
          linkValidation: (fromnode, fromport, tonode, toport, link) => {\r
            if (!fromport || !toport) return false;\r
            if (fromnode === tonode) {\r
              // inside a node must go from an input port to an output port\r
              return fromport.portId[0] === 'i' && toport.portId[0] === 'o';\r
            } else {\r
              // between nodes the port colors must match\r
              if (fromport.fill !== toport.fill) return false;\r
              // between nodes must go from an output port to an input port\r
              return fromport.portId[0] === 'o' && toport.portId[0] === 'i';\r
            }\r
            return true;\r
          }\r
        })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .addColumnDefinition(1, { width: 70 })\r
        .add(\r
          new go.Shape({\r
            name: 'BODY',\r
            row: 0,\r
            rowSpan: 99,\r
            column: 0,\r
            columnSpan: 3,\r
            stretch: go.Stretch.Fill,\r
            fill: 'gray',\r
            strokeWidth: 0,\r
            margin: new go.Margin(0, 8)\r
          }),\r
          new go.TextBlock({ row: 0, columnSpan: 3, margin: new go.Margin(4, 2, 2, 2) })\r
            .bind('text'),\r
          new go.TextBlock({ row: 2, columnSpan: 3, margin: new go.Margin(4, 2, 2, 2) })\r
            .bind('text', 'text2'),\r
          new go.Panel('Table', {\r
              row: 1,\r
              column: 0,\r
              defaultSeparatorPadding: new go.Margin(4, 0),\r
              // input ports\r
              itemTemplate:\r
                new go.Panel('TableRow', { background: 'white' })\r
                  .add(\r
                    new go.Shape({\r
                        width: 6,\r
                        height: 6,\r
                        strokeWidth: 0,\r
                        margin: new go.Margin(2, 6, 2, 0),\r
                        fromSpot: go.Spot.Right,\r
                        toSpot: go.Spot.Left,\r
                        fromLinkable: true,\r
                        toLinkable: true,\r
                        fromLinkableSelfNode: true,\r
                        toLinkableSelfNode: true,\r
                        cursor: 'pointer'\r
                      })\r
                      .bindObject('portId', 'row', r => 'i' + r)\r
                      .bind('fill', '', convertToColor)\r
                  )\r
            })\r
            .bind('itemArray', 'inPorts'),\r
          new go.Shape({\r
            row: 1,\r
            column: 1,\r
            fill: 'white',\r
            strokeWidth: 0,\r
            stretch: go.Stretch.Fill\r
          }),\r
          new go.Panel('Table', {\r
              row: 1,\r
              column: 2,\r
              defaultSeparatorPadding: new go.Margin(4, 0),\r
              // output ports\r
              itemTemplate:\r
                new go.Panel('TableRow', { background: 'white' })\r
                  .add(\r
                    new go.Shape({\r
                        width: 6,\r
                        height: 6,\r
                        strokeWidth: 0,\r
                        margin: new go.Margin(2, 0, 2, 6),\r
                        fromSpot: go.Spot.Right,\r
                        toSpot: go.Spot.Left,\r
                        fromLinkable: true,\r
                        toLinkable: true,\r
                        fromLinkableSelfNode: true,\r
                        toLinkableSelfNode: true,\r
                        cursor: 'pointer'\r
                      })\r
                      .bindObject('portId', 'row', r => 'o' + r)\r
                      .bind('fill', '', convertToColor)\r
                  )\r
            })\r
            .bind('itemArray', 'outPorts')\r
        );\r
\r
    function convertToColor(n) {\r
      switch (n) {\r
        case 'r':\r
          return 'brown';\r
        case 'g':\r
          return 'olivedrab';\r
        case 'b':\r
          return 'cornflowerblue';\r
        default:\r
          return 'black';\r
      }\r
    }\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ corner: 10, relinkableFrom: true, relinkableTo: true })\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
            .bindObject('stroke', 'fromPort', p => p.fill)\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      linkFromPortIdProperty: 'fpid',\r
      linkToPortIdProperty: 'tpid',\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          key: 1,\r
          text: 'Alpha',\r
          location: '0 0',\r
          inPorts: ['r', 'r', 'r', 'g', 'b'],\r
          outPorts: ['r', 'g', 'g', 'b', 'b']\r
        },\r
        {\r
          key: 2,\r
          text: 'Beta',\r
          location: '200 -80',\r
          inPorts: ['r', 'r', 'g', 'g', 'b'],\r
          outPorts: ['r', 'r', 'g', 'g', 'b']\r
        },\r
        {\r
          key: 3,\r
          text: 'Gamma',\r
          location: '200 80',\r
          inPorts: ['r', 'r', 'g', 'g', 'b'],\r
          outPorts: ['r', 'r', 'g', 'g', 'b']\r
        }\r
      ],\r
      linkDataArray: [\r
        { from: 1, fpid: 'i0', to: 1, tpid: 'o1' },\r
        { from: 1, fpid: 'i1', to: 1, tpid: 'o4' },\r
        { from: 1, fpid: 'i2', to: 1, tpid: 'o0' },\r
        { from: 1, fpid: 'i3', to: 1, tpid: 'o3' },\r
        { from: 1, fpid: 'i4', to: 1, tpid: 'o2' },\r
\r
        { from: 1, fpid: 'o0', to: 2, tpid: 'i0' },\r
        { from: 1, fpid: 'o2', to: 2, tpid: 'i2' },\r
        { from: 1, fpid: 'o2', to: 3, tpid: 'i2' },\r
        { from: 1, fpid: 'o3', to: 2, tpid: 'i4' },\r
        { from: 1, fpid: 'o3', to: 3, tpid: 'i4' },\r
\r
        { from: 2, fpid: 'i0', to: 2, tpid: 'o1' },\r
        { from: 2, fpid: 'i2', to: 2, tpid: 'o0' },\r
        { from: 2, fpid: 'i4', to: 2, tpid: 'o2' },\r
        { from: 3, fpid: 'i2', to: 3, tpid: 'o3' },\r
        { from: 3, fpid: 'i1', to: 3, tpid: 'o1' }\r
      ]\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    You can draw new links between ports, both between nodes and within a node. Between nodes, the\r
    link validation predicate requires new link connections to connect ports of the same color.\r
    However, within a node, links may connect ports of different colors.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`links`,`ports`];var g=y();l(`1169pku`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};