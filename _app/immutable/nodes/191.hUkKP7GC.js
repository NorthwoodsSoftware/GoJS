import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Network Configuration Diagram Editor With Bars`,titleShort:`Network Editor with Bars`,indexDescription:`Shows a network configurator with a Palette and Overview.`,screenshot:`network`,priority:3,tags:[`links`,`palette`,`overview`],description:`A simple network configuration editor.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div style="display: flex; flex-direction: column; margin-right: 2px">\r
      <div id="myPaletteDiv" style="flex-grow: 1; width: 100px; background-color: whitesmoke; border: solid 1px black"></div>\r
      <div id="myOverviewDiv" style="margin-top: 2px; width: 100px; height: 100px; background-color: lightgray; border: solid 1px black"></div>\r
    </div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 400px; border: solid 1px black"></div>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":0, "text":"Gen1", "category":"Generator", "location":"300 0"},\r
{"key":1, "text":"Bar1", "category":"HBar", "location":"100 100", "size":"500 4", "fill":"green"},\r
{"key":3, "text":"Cons1", "category":"Consumer", "location":"53 234"},\r
{"key":2, "text":"Bar2", "category":"HBar", "location":"0 300", "size":"600 4", "fill":"orange"},\r
{"key":4, "text":"Conn1", "category":"Connector", "location":"232.5 207.75"},\r
{"key":5, "text":"Cons3", "category":"Consumer", "location":"357.5 230.75"},\r
{"key":6, "text":"Cons2", "category":"Consumer", "location":"484.5 164.75"}\r
 ],\r
  "linkDataArray": [\r
{"from":0, "to":1},\r
{"from":0, "to":2},\r
{"from":3, "to":2},\r
{"from":4, "to":1},\r
{"from":4, "to":2},\r
{"from":5, "to":2},\r
{"from":6, "to":1}\r
 ]}\r
  </textarea>`,jsCode:`// A custom Link class that routes directly to the closest horizontal point of an "HBar" node.\r
  // If the regular node is too far to the left or right of the "HBar" node, the link connects\r
  // with the closest end of the "HBar" node.\r
  class BarLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    computeSpot(from, port) {\r
      if (from && this.toNode && this.toNode.category === 'HBar') return go.Spot.TopBottomSides;\r
      if (!from && this.fromNode && this.fromNode.category === 'HBar') return go.Spot.TopBottomSides;\r
      return super.computeSpot(from, port);\r
    }\r
\r
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {\r
      if (!from && node.category === 'HBar') {\r
        var op = super.getLinkPoint(othernode, otherport, this.computeSpot(!from), !from, ortho, node, port);\r
        var r = port.getDocumentBounds();\r
        var y = op.y > r.centerY ? r.bottom : r.top;\r
        if (op.x < r.left) return new go.Point(r.left, y);\r
        if (op.x > r.right) return new go.Point(r.right, y);\r
        return new go.Point(op.x, y);\r
      } else {\r
        return super.getLinkPoint(node, port, spot, from, ortho, othernode, otherport);\r
      }\r
    }\r
\r
    getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport) {\r
      if (node.category === 'HBar' || othernode.category === 'HBar') {\r
        var p = port.getDocumentPoint(go.Spot.Center);\r
        var op = otherport.getDocumentPoint(go.Spot.Center);\r
        var below = op.y > p.y;\r
        return below ? 90 : 270;\r
      } else {\r
        return super.getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport);\r
      }\r
    }\r
  }\r
  // end BarLink class\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'linkingTool.direction': go.LinkingDirection.ForwardsOnly,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // when the document is modified, add a "*" to the title and enable the "Save" button\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
    });\r
\r
    myDiagram.nodeTemplateMap.add('Generator',\r
      new go.Node('Spot', { locationSpot: go.Spot.Center, selectionObjectName: 'BODY' })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('ACVoltageSource', {\r
            name: 'BODY',\r
            stroke: 'white',\r
            strokeWidth: 3,\r
            fill: 'transparent',\r
            background: 'darkblue',\r
            width: 40,\r
            height: 40,\r
            margin: 5,\r
            portId: '',\r
            fromLinkable: true,\r
            cursor: 'pointer',\r
            fromSpot: go.Spot.TopBottomSides,\r
            toSpot: go.Spot.TopBottomSides\r
          }),\r
          new go.TextBlock({ alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, editable: true })\r
            .bindTwoWay('text')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Connector',\r
      new go.Node('Spot', { locationSpot: go.Spot.Center, selectionObjectName: 'BODY' })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Circle', {\r
            name: 'BODY',\r
            stroke: null,\r
            fill: new go.Brush('Linear', { 0: 'lightgray', 1: 'gray' }),\r
            background: 'gray',\r
            width: 20,\r
            height: 20,\r
            margin: 2,\r
            portId: '',\r
            fromLinkable: true,\r
            cursor: 'pointer',\r
            fromSpot: go.Spot.TopBottomSides,\r
            toSpot: go.Spot.TopBottomSides\r
          }),\r
          new go.TextBlock({ alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, editable: true })\r
            .bindTwoWay('text')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Consumer',\r
      new go.Node('Spot', {\r
          locationSpot: go.Spot.Center,\r
          locationObjectName: 'BODY',\r
          selectionObjectName: 'BODY'\r
        })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Picture('images/pc.jpg', {\r
            name: 'BODY',\r
            width: 50,\r
            height: 40,\r
            margin: 2,\r
            portId: '',\r
            fromLinkable: true,\r
            cursor: 'pointer',\r
            fromSpot: go.Spot.TopBottomSides,\r
            toSpot: go.Spot.TopBottomSides\r
          }),\r
          new go.TextBlock({ alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, editable: true })\r
            .bindTwoWay('text')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('HBar',\r
      new go.Node('Spot', {\r
          layerName: 'Background',\r
          // special resizing: just at the ends\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          resizeAdornmentTemplate:\r
            new go.Adornment('Spot')\r
              .add(\r
                new go.Placeholder(),\r
                new go.Shape({ // left resize handle\r
                  alignment: go.Spot.Left,\r
                  cursor: 'col-resize',\r
                  desiredSize: new go.Size(6, 6),\r
                  fill: 'lightblue',\r
                  stroke: 'dodgerblue'\r
                }),\r
                new go.Shape({ // right resize handle\r
                  alignment: go.Spot.Right,\r
                  cursor: 'col-resize',\r
                  desiredSize: new go.Size(6, 6),\r
                  fill: 'lightblue',\r
                  stroke: 'dodgerblue'\r
                })\r
              )\r
        })\r
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Rectangle', {\r
              name: 'SHAPE',\r
              fill: 'black',\r
              stroke: null,\r
              strokeWidth: 0,\r
              width: 1000,\r
              height: 4,\r
              minSize: new go.Size(100, 4),\r
              maxSize: new go.Size(Infinity, 4),\r
              portId: '',\r
              toLinkable: true\r
            })\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
            .bind('fill'),\r
          new go.TextBlock({ alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, editable: true })\r
            .bindTwoWay('text')\r
        ));\r
\r
    myDiagram.linkTemplate =\r
      new BarLink({ // subclass defined above\r
          routing: go.Routing.Orthogonal,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          toPortChanged: (link, oldport, newport) => {\r
            if (newport instanceof go.Shape) link.path.stroke = newport.fill;\r
          }\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
        );\r
\r
    // start off with a simple diagram\r
    load();\r
\r
    // initialize Palette\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplateMap: myDiagram.nodeTemplateMap,\r
      layout: new go.GridLayout({\r
        cellSize: new go.Size(2, 2),\r
        isViewportSized: true\r
      })\r
    });\r
\r
    myPalette.model.nodeDataArray = [\r
      { text: 'Generator', category: 'Generator' },\r
      { text: 'Consumer', category: 'Consumer' },\r
      { text: 'Connector', category: 'Connector' },\r
      { text: 'Bar', category: 'HBar', size: '100 4' }\r
    ];\r
\r
    // remove cursors on all ports in the Palette\r
    // make TextBlocks invisible, to reduce size of Nodes\r
    myPalette.nodes.each(node => {\r
      node.ports.each(port => (port.cursor = ''));\r
      node.elements.each(tb => {\r
        if (tb instanceof go.TextBlock) tb.visible = false;\r
      });\r
    });\r
\r
    // initialize Overview\r
    myOverview = new go.Overview('myOverviewDiv', {\r
      observed: myDiagram,\r
      contentAlignment: go.Spot.Center\r
    });\r
  }\r
\r
  // save a model to and load a model from JSON text, displayed below the Diagram\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>\r
    This sample creates and uses a custom <a>Link</a> class <code>BarLink</code>.\r
    It draws the perpendicular line between the <a>Node</a> and the HBar\r
    <a>Node</a>. When the <a>Node</a> doesn't line up horizontally with the HBAR\r
    it will draw an Orthogonal <a>Link</a> at close between them as possible.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`palette`,`overview`];var g=y();l(`d1rmbl`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};