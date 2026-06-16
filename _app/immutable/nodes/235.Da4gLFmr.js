import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Groups with Rounded Headers and Footers`,indexDescription:`Groups consisting of a RoundedTopRectangle and a RoundedBottomRectangle figure surrounding the Group's Placeholder.`,screenshot:`roundedgroups`,priority:2,tags:[`groups`,`geometries`],description:`Groups consisting of a RoundedTopRectangle and a RoundedBottomRectangle figure surrounding the Group's Placeholder.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.TreeLayout({\r
        setsPortSpot: false,\r
        setsChildPortSpot: false,\r
        isRealtime: false\r
      })\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', {\r
          defaultStretch: go.Stretch.Horizontal,\r
          fromSpot: go.Spot.RightSide,\r
          toSpot: go.Spot.LeftSide\r
        })\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedTopRectangle', { fill: 'white' })\r
                .bind('fill', 'role', r => r[0] === 't' ? 'lightgray' : 'white'),\r
              new go.TextBlock({\r
                  margin: new go.Margin(2, 2, 0, 2),\r
                  textAlign: 'center'\r
                })\r
                .bind('text', 'header')\r
            ),\r
          new go.Panel('Auto', { minSize: new go.Size(NaN, 70) })\r
            .add(\r
              new go.Shape('Rectangle', { fill: 'white' }),\r
              new go.TextBlock({\r
                  width: 120,\r
                  margin: new go.Margin(2, 2, 0, 2),\r
                  textAlign: 'center'\r
                })\r
                .bind('text'),\r
              new go.Shape('BpmnActivityLoop', {\r
                  visible: false,\r
                  width: 10,\r
                  height: 10,\r
                  alignment: new go.Spot(0.5, 1, 0, -3),\r
                  alignmentFocus: go.Spot.Bottom\r
                })\r
                .bind('visible', 'loop')\r
            ),\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedBottomRectangle', { fill: 'white' })\r
                .bind('fill', 'role', r => r[0] === 'b' ? 'lightgray' : 'white'),\r
              new go.TextBlock({\r
                  margin: new go.Margin(2, 2, 0, 2),\r
                  textAlign: 'center'\r
                })\r
                .bind('text', 'footer')\r
            )\r
        );\r
\r
    myDiagram.groupTemplate =\r
      new go.Group('Vertical', {\r
          layout: new go.TreeLayout({\r
            setsPortSpot: false,\r
            setsChildPortSpot: false\r
          }),\r
          defaultStretch: go.Stretch.Horizontal,\r
          fromSpot: go.Spot.RightSide,\r
          toSpot: go.Spot.LeftSide\r
        })\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', { // Rounded top rectangle via parameter2\r
                  fill: 'white',\r
                  parameter2: 1 | 2\r
                })\r
                .bind('fill', 'role', r => r[0] === 't' ? 'lightgray' : 'white'),\r
              new go.TextBlock({\r
                  margin: new go.Margin(2, 2, 0, 2),\r
                  textAlign: 'center'\r
                })\r
                .bind('text', 'header')\r
            ),\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: 'white' }),\r
              new go.Placeholder({ padding: 20 }),\r
              new go.Shape('BpmnActivityLoop', {\r
                  visible: false,\r
                  width: 10,\r
                  height: 10,\r
                  alignment: new go.Spot(0.5, 1, 0, -3),\r
                  alignmentFocus: go.Spot.Bottom\r
                })\r
                .bind('visible', 'loop')\r
            ),\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', { // Rounded bottom rectangle via parameter2\r
                  fill: 'white',\r
                  parameter2: 4 | 8\r
                })\r
                .bind('fill', 'role', r => r[0] === 'b' ? 'lightgray' : 'white'),\r
              new go.TextBlock({\r
                  margin: new go.Margin(2, 2, 0, 2),\r
                  textAlign: 'center'\r
                })\r
                .bind('text', 'footer')\r
            )\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 5 })\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'Triangle' })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, header: 'Supplier', text: 'Planned Order Variations', footer: 'Retailer', role: 'b' },\r
        { key: 2, header: 'Supplier', text: 'Order & Delivery Variations', footer: 'Retailer', role: 't', loop: true },\r
        { key: 3, header: 'Supplier', isGroup: true, footer: 'Shipper', role: 'b' },\r
        { key: 4, header: 'Supplier', text: 'Planned Order Variations', footer: 'Retailer', role: 'b', group: 3 },\r
        { key: 5, header: 'Supplier', text: 'Order & Delivery Variations', footer: 'Retailer', role: 't', group: 3 },\r
        { key: 13, header: 'Supplier', isGroup: true, footer: 'Shipper', role: 'b', loop: true },\r
        { key: 14, header: 'Supplier', text: 'Planned Order Variations', footer: 'Retailer', role: 'b', group: 13 },\r
        { key: 15, header: 'Supplier', text: 'Order & Delivery Variations', footer: 'Retailer', role: 't', group: 13 }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 2, to: 3 },\r
        { from: 2, to: 13 },\r
        { from: 4, to: 5 },\r
        { from: 14, to: 15 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>\r
    This Business Process Model and Notation (BPMN) Choreography diagram demonstrates how to define a group template to look like a node template, with a\r
    rounded header and a rounded footer.\r
  </p>\r
  <p>We also have a <a href="../samples/bpmn/BPMN.html" target="_blank">BPMN Process Editor</a> sample.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`groups`,`geometries`];var g=y();l(`rwwmly`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};