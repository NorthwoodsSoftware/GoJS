import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Flow PanelLayout Wrapping Elements Into Rows or Columns`,titleShort:`Flow Layout in Panels`,indexDescription:`A custom PanelLayout that arranges panel elements into rows or columns.`,screenshot:`panellayoutflow`,priority:2,tags:[`customlayout`,`extensions`],description:`The Flow PanelLayout arranges panel elements in rows or columns.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical')\r
        .add(\r
          new go.TextBlock({ font: 'bold 10pt sans-serif' })\r
            .bind('text'),\r
          new go.Shape({\r
              width: 40,\r
              height: 40,\r
              fill: 'white',\r
              portId: '',\r
              fromSpot: go.Spot.LeftRightSides,\r
              toSpot: go.Spot.LeftRightSides\r
            })\r
            .bind('fill', 'color')\r
            .bindTwoWay('figure'),\r
          new go.Panel('Flow', {\r
              maxSize: new go.Size(40, NaN),\r
              background: 'transparent',\r
              itemTemplate:\r
                new go.Panel()\r
                  .add(\r
                    new go.TextBlock({\r
                        font: '9pt sans-serif',\r
                        margin: new go.Margin(1, 1, 0, 1)\r
                      })\r
                      .bind('text', '')\r
                  )\r
            })\r
            .bind('itemArray', 'values')\r
        );\r
\r
    myDiagram.nodeTemplate.contextMenu =\r
      new go.Adornment('Table', {\r
          background: 'transparent',\r
          defaultAlignment: go.Spot.Top,\r
          padding: 10\r
        })\r
        .addRowDefinition(1, { height: 0 })\r
        .add(\r
          new go.Panel('Auto')\r
          .add(\r
            new go.Shape({ fill: 'transparent' }),\r
            new go.Panel('Horizontal', {\r
                row: 0,\r
                stretch: go.Stretch.Vertical,\r
                defaultStretch: go.Stretch.Horizontal\r
              })\r
              .add(\r
                makeTabLabel('Rectangles', true),\r
                makeTabLabel('Triangles'),\r
                makeTabLabel('Other')\r
              )\r
          ),\r
          new go.Panel('Auto', { row: 2, stretch: go.Stretch.Fill })\r
            .add(\r
              new go.Shape({ fill: 'white' }),\r
              new go.Panel('Auto')\r
                .add(\r
                  new go.Shape({ fill: '#eee', margin: 4 }),\r
                  makeFlowPanel('Rectangles', ['Square', 'RoundedRectangle', 'Diamond', 'RoundedTopRectangle', 'RoundedBottomRectangle'], true),\r
                  makeFlowPanel('Triangles', ['TriangleUp', 'TriangleRight', 'TriangleDown', 'TriangleLeft', 'TriangleDownLeft', 'TriangleDownRight', 'TriangleUpLeft', 'TriangleUpRight']),\r
                  makeFlowPanel('Other', ['LineH', 'LineV', 'Curve1', 'Curve2', 'PlusLine', 'XLine', 'Heart', 'Lightning', 'Trapezoid', 'Octagon'])\r
                )\r
            )\r
        );\r
\r
    //set the last thing for the context menu\r
    myDiagram.nodeTemplate.contextMenu.lastPanelName = 'Rectangles';\r
\r
    function makeTabLabel(name, selected) {\r
      let tabName = \`\${name}Tab\`;\r
      let textName = \`\${name}Text\`;\r
      return new go.Panel('Auto')\r
        .attach({\r
          _panelName: name //if we want the text content to be different than the name of the flow panel ever\r
        })\r
        .add(\r
          new go.Shape('Rectangle', {\r
            fill: selected ? '#ddd' : 'white',\r
            stroke: selected ? 'red' : 'white',\r
            strokeWidth: 1,\r
            name: tabName,\r
            mouseEnter: (e, obj) => {\r
              let lastPanel = obj.part.findObject(obj.part.lastPanelName);\r
              if (obj.part.lastPanelName != name) {\r
                //highlight this and unhighlight the old one\r
                obj.set({fill: '#ddd', stroke: 'red'});\r
                obj.part.findObject(textName)?.set({stroke: 'red'});\r
                if (lastPanel) {\r
                  let tab = obj.part.findObject(\`\${obj.part.lastPanelName}Tab\`);\r
                  let text = obj.part.findObject(\`\${obj.part.lastPanelName}Text\`);\r
                  tab?.set({fill: 'white', stroke: "white"});\r
                  text?.set({stroke: 'black'});\r
                  //make it invisible (the actual flow panel)\r
                  lastPanel.set({visible: false});\r
                }\r
              }\r
              //make the new panel visible\r
              obj.part.findObject(name)?.set({visible: true});\r
              obj.part.lastPanelName = name;\r
            }\r
          }),\r
          new go.TextBlock(name, {\r
            margin: 6,\r
            stroke: selected ? 'red' : 'black',\r
            name: textName\r
          })\r
        );\r
    }\r
\r
    function makeFlowPanel(name, figures, selected) {\r
      return new go.Panel('Auto', { padding: 10 })\r
        .add(\r
          new go.Shape({ fill: 'transparent', strokeWidth: 0 }),\r
          new go.Panel(new PanelLayoutFlow({\r
              spacing: new go.Size(5, 5),\r
              direction: 0\r
            }), {\r
            name: name,\r
            maxSize: new go.Size(150, 150),\r
            visible: !!selected\r
          })\r
          .add(\r
            ...figures.map(makeShape)\r
          )\r
        );\r
    }\r
\r
    function makeShape(fig) {\r
      return new go.Shape(fig, {\r
          width: 20,\r
          height: 20,\r
          fill: 'white',\r
          margin: 5,\r
          background: 'transparent', // to catch a click anywhere in bounds\r
          strokeWidth: 2,\r
          stroke: 'black',\r
          click: (e, shape) => {\r
            var ad = shape.part;\r
            e.diagram.commit(diag => {\r
              diag.model.set(ad.data, 'figure', fig);\r
              ad.adornedPart.invalidateConnectedLinks();\r
            }, 'modified figure');\r
          },\r
          mouseEnter: (e, obj) => {\r
            obj.fill = 'gray';\r
          },\r
          mouseLeave: (e, obj) => {\r
            obj.fill = 'white';\r
          }\r
        })\r
        .trigger('fill', { duration: 125 });\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue', values: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },\r
        { key: 2, text: 'Beta', color: 'orange', figure: 'Diamond', values: ['I', 'J'] },\r
        { key: 3, text: 'Gamma', color: 'lightgreen', figure: 'Circle', values: ['123', '456', '7890'] },\r
        { key: 4, text: 'Delta', color: 'pink', figure: 'Triangle' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/PanelLayoutFlow.js`],descriptionHtml:`<p>Each node has a "Flow" PanelLayout below the shape listing a bunch of text values in rows.</p>\r
  <p>\r
    The context menu shown for each node has three "tabs", each showing some number of shape figures, one of which the user can click to replace the node's\r
    shape's figure. These tab panels use a "Flow" PanelLayout to arrange the shapes in rows, by setting <a>PanelLayoutFlow.direction</a> to 0. Note how for\r
    a custom <a>PanelLayout</a> one cannot use its name directly, but must construct and initialize an instance of the PanelLayout.\r
  </p>\r
  <p>This extension is defined in its own file, as <a href="../extensions/PanelLayoutFlow.js">PanelLayoutFlow.js</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`customlayout`,`extensions`];var g=y();l(`lw2bmv`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};