import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Industrial Process Diagram`,indexDescription:`Partial diagram of the process for extracting byproducts from crude oil.`,screenshot:`productionprocess`,priority:2,exclude:!0,tags:[`geometries`,`links`,`process`],description:`Oil and gas production diagram viewer, for end-users.`},htmlContent:`<div style="width: 100%">\r
    <div\r
      id="myDiagramDiv"\r
      style="border: solid 1px black; background-color: rgb(242, 233, 218); width: 100%; height: 600px; display: inline-block; vertical-align: top"></div>\r
  </div>\r
  <div>\r
    <textarea id="mySavedModel" style="display: none">\r
{ "class": "GraphLinksModel",\r
  "nodeDataArray": [\r
      { "key": "1", "category": "Output", "color": "yellow", "text": "Crude Oil", "location": "0 0", "textside": "left" },\r
      { "key": "2", "category": "Heater", "color": "red", "location": "150 -5" },\r
      { "key": "3", "category": "Tower", "color": "orange", "location": "250 -250", "height": 300 },\r
      { "key": "4", "category": "Heater", "color": "red", "location": "350 200"},\r
\r
      { "key": "5", "category": "Tower", "color": "orange", "height": 50, "location": "400 -200" },\r
      { "key": "6", "category": "Tower", "color": "orange", "height": 50, "location": "400 -100" },\r
      { "key": "7", "category": "Tower", "color": "orange", "height": 50, "location": "400 0" },\r
\r
      { "key": "8", "category": "Tower", "color": "orange", "height": 150, "location": "450 100" },\r
\r
      { "key": "9", "category": "Output", "color": "yellow", "text": "Light Vacuum Gas Oil", "textside": "right", "location": "600 150" },\r
      { "key": "10", "category": "Output", "color": "yellow", "text": "Heavy Vacuum Gas Oil", "textside": "right", "location": "600 200" },\r
      { "key": "11", "category": "Output", "color": "yellow", "text": "Vacuum Residue", "textside": "right", "location": "600 300" },\r
\r
      { "key": "12", "category": "Output", "color": "yellow", "text": "Kerosene", "textside": "right", "location": "600 -120" },\r
      { "key": "13", "category": "Output", "color": "yellow", "text": "Light Gas Oil", "textside": "right", "location": "600 -20" },\r
      { "key": "14", "category": "Output", "color": "yellow", "text": "Heavy Gas Oil", "textside": "right", "location": "600 80" },\r
\r
      { "key": "15", "color": "yellow", "text": "Steam", "textside": "left", "location": "480 -60" },\r
      { "key": "16", "color": "yellow", "text": "Steam", "textside": "left", "location": "480 30" },\r
\r
      { "key": "17", "category": "Tower", "color": "orange", "height": 50, "location": "400 -350" },\r
\r
      { "key": "18", "category": "Output", "color": "yellow", "text": "Light Gas Oil", "textside": "right", "location": "600 -300" },\r
      { "key": "19", "category": "Output", "color": "yellow", "text": "Heavy Gas Oil", "textside": "right", "location": "600 -350" }\r
 ],\r
  "linkDataArray": [\r
      { "from": "1", "to": "2" },\r
      { "from": "2", "to": "3", "fromSpot": "Right" },\r
      { "from": "3", "to": "4", "fromSpot": "Bottom", "toSpot": "LeftSide", "text": "Atmospheric Residue", "textFocus": "Left" },\r
      { "from": "3", "to": "5", "fromSpot": "1 0.2" },\r
      { "from": "5", "to": "3", "fromSpot": "0 0.75"},\r
      { "from": "3", "to": "6", "fromSpot": "1 0.5" },\r
      { "from": "6", "to": "3", "fromSpot": "0 0.75" },\r
      { "from": "3", "to": "7", "fromSpot": "1 0.8" },\r
      { "from": "7", "to": "3", "fromSpot": "0 0.75" },\r
      { "from": "4", "to": "8" },\r
      { "from": "8", "to": "9" },\r
      { "from": "8", "to": "10" },\r
      { "from": "8", "to": "11", "fromSpot": "Bottom" },\r
      { "from": "5", "to": "12", "fromSpot": "Bottom" },\r
      { "from": "6", "to": "13", "fromSpot": "Bottom" },\r
      { "from": "7", "to": "14", "fromSpot": "Bottom" },\r
      { "from": "15", "to": "6" },\r
      { "from": "16", "to": "7" },\r
      { "from": "3", "to": "17", "fromSpot": "Top", "toSpot": "Top" },\r
      { "from": "17", "to": "3", "fromSpot": "Bottom", "text": "Reflux", "textFocus": "Bottom" },\r
      { "from": "17", "to": "18" },\r
      { "from": "17", "to": "19" }\r
 ]}\r
    </textarea>\r
  </div>`,jsCode:`// A custom Link class that routes directly to the closest vertical point of a "Tower" node.\r
  // If the regular node is too far above or belown the "Tower" node, the link connects with\r
  // the closest end of the "Tower" node.\r
  // See "BarLink" in the Network Configuration sample for a similar class for connecting to horizontal Nodes.\r
  class TowerLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {\r
      if (!from && node.category === 'Tower' && spot !== Spot.Bottom && spot !== Spot.Top) {\r
        var op = super.getLinkPoint(othernode, otherport, this.computeSpot(!from), !from, ortho, node, port);\r
        var r = port.getDocumentBounds();\r
        var x = op.x > r.centerX ? r.right : r.left;\r
        if (op.y < r.top + 15) return new go.Point(x, r.top + 15);\r
        if (op.y > r.bottom - 15) return new go.Point(x, r.bottom - 15);\r
        return new go.Point(x, op.y);\r
      } else {\r
        return super.getLinkPoint(node, port, spot, from, ortho, othernode, otherport);\r
      }\r
    }\r
\r
    getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport) {\r
      if (node.category === 'Tower' && spot !== Spot.Bottom && spot !== Spot.Top) {\r
        const p = port.getDocumentPoint(go.Spot.Center);\r
        const op = otherport.getDocumentPoint(go.Spot.Center);\r
        const below = op.x > p.x;\r
        return below ? 0 : 180;\r
      } else {\r
        return super.getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport);\r
      }\r
    }\r
  }\r
  // end BarLink class\r
\r
  function gradientBrush(color) {\r
    const brush = new go.Brush(go.Brush.Linear);\r
    brush.addColorStop(0, color);\r
    brush.addColorStop(0.5, Brush.lightenBy(color));\r
    brush.addColorStop(1, color);\r
    brush.start = go.Spot.Left;\r
    brush.end = go.Spot.Right;\r
    return brush;\r
  }\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform, // scale to show all of the contents\r
      maxSelectionCount: 1, // don't allow users to select more than one thing at a time\r
      isReadOnly: true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bind('location', 'location', go.Point.parse)\r
        .add(\r
          new go.TextBlock({ margin: 3, font: 'bold 15px sans-serif' })\r
            .bind('text')\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Tower',\r
      new go.Node('Position', {})\r
        .bind('location', 'location', go.Point.parse)\r
        .add(\r
          new go.Shape('Rectangle', {\r
              width: 30,\r
              strokeWidth: 1,\r
              stroke: 'black'\r
            })\r
            .bind('fill', 'color', gradientBrush)\r
            .bind('height'),\r
          new go.Shape({\r
              geometryString: 'F M0 0 L30 0 A15 15 15 0 0 0 0',\r
              strokeWidth: 1,\r
              stroke: 'black'\r
            })\r
            .bind('fill', 'color', gradientBrush),\r
          new go.Shape({\r
              geometryString: 'F M0 0 L30 0 A15 15 15 0 1 0 0',\r
              strokeWidth: 1,\r
              stroke: 'black'\r
            })\r
            .bind('fill', 'color', gradientBrush)\r
            .bind('position', 'height', height => new go.Point(0, height))\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Output',\r
      new go.Node('Table')\r
        .bind('location', 'location', go.Point.parse)\r
        .add(\r
          new go.Shape('Arrow', {\r
              width: 30,\r
              height: 30,\r
              strokeWidth: 1,\r
              stroke: 'black',\r
              row: 0\r
            })\r
            .bind('fill', 'color', gradientBrush)\r
            .bind('column', 'textside', side => side === 'right' ? 0 : 1),\r
          new go.TextBlock({ margin: 3, font: 'bold 15px sans-serif' })\r
            .bind('text')\r
            .bind('column', 'textside', side => side === 'right' ? 1 : 0)\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Heater',\r
      new go.Node('Position')\r
        .bind('location', 'location', go.Point.parse)\r
        .add(\r
          new go.Shape({\r
              geometryString: 'F M10 0 L20 0 20 10 30 20 30 40 0 40 0 20 10 10 10 0',\r
              strokeWidth: 1,\r
              width: 30,\r
              height: 40,\r
              stroke: 'black'\r
            })\r
            .bind('fill', 'color', gradientBrush),\r
          new go.Shape({\r
            geometryString: 'M-15 0 L-10 0 -5 -8 0 8 5 0 10 0',\r
            strokeWidth: 2,\r
            stroke: 'black',\r
            position: new go.Point(2, 18)\r
          })\r
        ));\r
\r
    myDiagram.linkTemplate =\r
      new TowerLink({\r
          routing: go.Routing.Orthogonal,\r
          toShortLength: 2\r
        })\r
        .bind('fromSpot', 'fromSpot', go.Spot.parse)\r
        .bind('toSpot', 'toSpot', go.Spot.parse)\r
        .add(\r
          new go.Shape({ strokeWidth: 2 }),\r
          new go.Shape({ toArrow: 'Triangle' }),\r
          new go.TextBlock({\r
              alignmentFocus: go.Spot.Right,\r
              segmentOffset: new go.Point(0, 10)\r
            })\r
            .bind('text')\r
        );\r
\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').textContent);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[`https://fonts.googleapis.com/css?family=Lato:400,700`],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>This process flow diagram partially simulates the production process for gas and oil byproducts into their end products.</p>\r
  <p>This diagram uses several GoJS features, including a custom TowerLink class that causes links to the tall "Tower" Nodes to be consistently aligned.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`geometries`,`links`,`process`];var g=y();l(`1q6fc5b`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};