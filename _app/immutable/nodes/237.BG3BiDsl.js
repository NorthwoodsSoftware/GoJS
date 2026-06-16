import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Sankey Diagram Visualizing Proportional Width Flows by Volume`,titleShort:`Sankey Diagram`,indexDescription:`Sankey diagrams show the amount of flow between nodes by the width of the links.`,screenshot:`sankey`,priority:.99,tags:[`links`,`layered-digraph`,`customlayout`],description:`A Sankey diagram with the thickness of links indicating the flow quantity.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="border: solid 1px black; width: 99%; height: 850px; background-color: #f2e9da"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 250px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":"Coal reserves", "text":"Coal reserves", "color":"#562038"},\r
{"key":"Coal imports", "text":"Coal imports", "color":"#562038"},\r
{"key":"Oil reserves", "text":"Oil\\nreserves", "color":"#562038"},\r
{"key":"Oil imports", "text":"Oil imports", "color":"#562038"},\r
{"key":"Gas reserves", "text":"Gas reserves", "color":"#268251"},\r
{"key":"Gas imports", "text":"Gas imports", "color":"#268251"},\r
{"key":"UK land based bioenergy", "text":"UK land based bioenergy", "color":"#f6bcd5"},\r
{"key":"Marine algae", "text":"Marine algae", "color":"#681313"},\r
{"key":"Agricultural 'waste'", "text":"Agricultural 'waste'", "color":"#254d57"},\r
{"key":"Other waste", "text":"Other waste", "color":"#c9b7d8"},\r
{"key":"Biomass imports", "text":"Biomass imports", "color":"#fea19f"},\r
{"key":"Biofuel imports", "text":"Biofuel imports", "color":"#d93c3c"},\r
{"key":"Coal", "text":"Coal", "color":"#562038"},\r
{"key":"Oil", "text":"Oil", "color":"#562038"},\r
{"key":"Natural gas", "text":"Natural\\ngas", "color":"#254d57"},\r
{"key":"Solar", "text":"Solar", "color":"#c9a59d"},\r
{"key":"Solar PV", "text":"Solar PV", "color":"#c9a59d"},\r
{"key":"Bio-conversion", "text":"Bio-conversion", "color":"#b5cbe9"},\r
{"key":"Solid", "text":"Solid", "color":"#9c8000"},\r
{"key":"Liquid", "text":"Liquid", "color":"#e44d42"},\r
{"key":"Gas", "text":"Gas", "color":"#268251"},\r
{"key":"Nuclear", "text":"Nuclear", "color":"#c260ad"},\r
{"key":"Thermal generation", "text":"Thermal\\ngeneration", "color":"#254d57"},\r
{"key":"CHP", "text":"CHP", "color":"yellow"},\r
{"key":"Electricity imports", "text":"Electricity imports", "color":"yellow"},\r
{"key":"Wind", "text":"Wind", "color":"#cbcbcb"},\r
{"key":"Tidal", "text":"Tidal", "color":"#6f3a5f"},\r
{"key":"Wave", "text":"Wave", "color":"#8b8b8b"},\r
{"key":"Geothermal", "text":"Geothermal", "color":"#556171"},\r
{"key":"Hydro", "text":"Hydro", "color":"#7c3e06"},\r
{"key":"Electricity grid", "text":"Electricity grid", "color":"#c260ad"},\r
{"key":"H2 conversion", "text":"H2 conversion", "color":"#868686"},\r
{"key":"Solar Thermal", "text":"Solar Thermal", "color":"#c9a59d"},\r
{"key":"H2", "text":"H2", "color":"#868686"},\r
{"key":"Pumped heat", "text":"Pumped heat", "color":"#96665c"},\r
{"key":"District heating", "text":"District heating", "color":"#c9b7d8"},\r
{"key":"Losses", "ltext":"Losses", "color":"#254d57"},\r
{"key":"Over generation / exports", "ltext":"Over generation / exports", "color":"#f6bcd5"},\r
{"key":"Heating and cooling - homes", "ltext":"Heating and cooling - homes", "color":"#c7a39b"},\r
{"key":"Road transport", "ltext":"Road transport", "color":"#cbcbcb"},\r
{"key":"Heating and cooling - commercial", "ltext":"Heating and cooling - commercial", "color":"#c9a59d"},\r
{"key":"Industry", "ltext":"Industry", "color":"#96665c"},\r
{"key":"Lighting & appliances - homes", "ltext":"Lighting & appliances - homes", "color":"#2dc3d2"},\r
{"key":"Lighting & appliances - commercial", "ltext":"Lighting & appliances - commercial", "color":"#2dc3d2"},\r
{"key":"Agriculture", "ltext":"Agriculture", "color":"#5c5c10"},\r
{"key":"Rail transport", "ltext":"Rail transport", "color":"#6b6b45"},\r
{"key":"Domestic aviation", "ltext":"Domestic aviation", "color":"#40a840"},\r
{"key":"National navigation", "ltext":"National navigation", "color":"#268251"},\r
{"key":"International aviation", "ltext":"International aviation", "color":"#fec184"},\r
{"key":"International shipping", "ltext":"International shipping", "color":"#fec184"},\r
{"key":"Geosequestration", "ltext":"Geosequestration", "color":"#fec184"}\r
    ], "linkDataArray": [\r
{"from":"Coal reserves", "to":"Coal", "width":31},\r
{"from":"Coal imports", "to":"Coal", "width":86},\r
{"from":"Oil reserves", "to":"Oil", "width":244},\r
{"from":"Oil imports", "to":"Oil", "width":1},\r
{"from":"Gas reserves", "to":"Natural gas", "width":182},\r
{"from":"Gas imports", "to":"Natural gas", "width":61},\r
{"from":"UK land based bioenergy", "to":"Bio-conversion", "width":1},\r
{"from":"Marine algae", "to":"Bio-conversion", "width":1},\r
{"from":"Agricultural 'waste'", "to":"Bio-conversion", "width":1},\r
{"from":"Other waste", "to":"Bio-conversion", "width":8},\r
{"from":"Other waste", "to":"Solid", "width":1},\r
{"from":"Biomass imports", "to":"Solid", "width":1},\r
{"from":"Biofuel imports", "to":"Liquid", "width":1},\r
{"from":"Coal", "to":"Solid", "width":117},\r
{"from":"Oil", "to":"Liquid", "width":244},\r
{"from":"Natural gas", "to":"Gas", "width":244},\r
{"from":"Solar", "to":"Solar PV", "width":1},\r
{"from":"Solar PV", "to":"Electricity grid", "width":1},\r
{"from":"Solar", "to":"Solar Thermal", "width":1},\r
{"from":"Bio-conversion", "to":"Solid", "width":3},\r
{"from":"Bio-conversion", "to":"Liquid", "width":1},\r
{"from":"Bio-conversion", "to":"Gas", "width":5},\r
{"from":"Bio-conversion", "to":"Losses", "width":1},\r
{"from":"Solid", "to":"Over generation / exports", "width":1},\r
{"from":"Liquid", "to":"Over generation / exports", "width":18},\r
{"from":"Gas", "to":"Over generation / exports", "width":1},\r
{"from":"Solid", "to":"Thermal generation", "width":106},\r
{"from":"Liquid", "to":"Thermal generation", "width":2},\r
{"from":"Gas", "to":"Thermal generation", "width":87},\r
{"from":"Nuclear", "to":"Thermal generation", "width":41},\r
{"from":"Thermal generation", "to":"District heating", "width":2},\r
{"from":"Thermal generation", "to":"Electricity grid", "width":92},\r
{"from":"Thermal generation", "to":"Losses", "width":142},\r
{"from":"Solid", "to":"CHP", "width":1},\r
{"from":"Liquid", "to":"CHP", "width":1},\r
{"from":"Gas", "to":"CHP", "width":1},\r
{"from":"CHP", "to":"Electricity grid", "width":1},\r
{"from":"CHP", "to":"Losses", "width":1},\r
{"from":"Electricity imports", "to":"Electricity grid", "width":1},\r
{"from":"Wind", "to":"Electricity grid", "width":1},\r
{"from":"Tidal", "to":"Electricity grid", "width":1},\r
{"from":"Wave", "to":"Electricity grid", "width":1},\r
{"from":"Geothermal", "to":"Electricity grid", "width":1},\r
{"from":"Hydro", "to":"Electricity grid", "width":1},\r
{"from":"Electricity grid", "to":"H2 conversion", "width":1},\r
{"from":"Electricity grid", "to":"Over generation / exports", "width":1},\r
{"from":"Electricity grid", "to":"Losses", "width":6},\r
{"from":"Gas", "to":"H2 conversion", "width":1},\r
{"from":"H2 conversion", "to":"H2", "width":1},\r
{"from":"H2 conversion", "to":"Losses", "width":1},\r
{"from":"Solar Thermal", "to":"Heating and cooling - homes", "width":1},\r
{"from":"H2", "to":"Road transport", "width":1},\r
{"from":"Pumped heat", "to":"Heating and cooling - homes", "width":1},\r
{"from":"Pumped heat", "to":"Heating and cooling - commercial", "width":1},\r
{"from":"CHP", "to":"Heating and cooling - homes", "width":1},\r
{"from":"CHP", "to":"Heating and cooling - commercial", "width":1},\r
{"from":"District heating", "to":"Heating and cooling - homes", "width":1},\r
{"from":"District heating", "to":"Heating and cooling - commercial", "width":1},\r
{"from":"District heating", "to":"Industry", "width":2},\r
{"from":"Electricity grid", "to":"Heating and cooling - homes", "width":7},\r
{"from":"Solid", "to":"Heating and cooling - homes", "width":3},\r
{"from":"Liquid", "to":"Heating and cooling - homes", "width":3},\r
{"from":"Gas", "to":"Heating and cooling - homes", "width":81},\r
{"from":"Electricity grid", "to":"Heating and cooling - commercial", "width":7},\r
{"from":"Solid", "to":"Heating and cooling - commercial", "width":1},\r
{"from":"Liquid", "to":"Heating and cooling - commercial", "width":2},\r
{"from":"Gas", "to":"Heating and cooling - commercial", "width":19},\r
{"from":"Electricity grid", "to":"Lighting & appliances - homes", "width":21},\r
{"from":"Gas", "to":"Lighting & appliances - homes", "width":2},\r
{"from":"Electricity grid", "to":"Lighting & appliances - commercial", "width":18},\r
{"from":"Gas", "to":"Lighting & appliances - commercial", "width":2},\r
{"from":"Electricity grid", "to":"Industry", "width":30},\r
{"from":"Solid", "to":"Industry", "width":13},\r
{"from":"Liquid", "to":"Industry", "width":34},\r
{"from":"Gas", "to":"Industry", "width":54},\r
{"from":"Electricity grid", "to":"Agriculture", "width":1},\r
{"from":"Solid", "to":"Agriculture", "width":1},\r
{"from":"Liquid", "to":"Agriculture", "width":1},\r
{"from":"Gas", "to":"Agriculture", "width":1},\r
{"from":"Electricity grid", "to":"Road transport", "width":1},\r
{"from":"Liquid", "to":"Road transport", "width":122},\r
{"from":"Electricity grid", "to":"Rail transport", "width":2},\r
{"from":"Liquid", "to":"Rail transport", "width":1},\r
{"from":"Liquid", "to":"Domestic aviation", "width":2},\r
{"from":"Liquid", "to":"National navigation", "width":4},\r
{"from":"Liquid", "to":"International aviation", "width":38},\r
{"from":"Liquid", "to":"International shipping", "width":13},\r
{"from":"Electricity grid", "to":"Geosequestration", "width":1},\r
{"from":"Gas", "to":"Losses", "width":2}\r
 ]}\r
    </textarea>\r
  </div>`,jsCode:`class SankeyLayout extends go.LayeredDigraphLayout {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // determine the desired height of each node/vertex,\r
    // based on the thicknesses of the connected links;\r
    // actually modify the height of each node's SHAPE\r
    makeNetwork(coll) {\r
      const net = super.makeNetwork(coll);\r
      this.diagram.nodes.each(node => {\r
        // figure out how tall the node's bar should be\r
        const height = this.getAutoHeightForNode(node);\r
        const shape = node.findObject('SHAPE');\r
        if (shape) shape.height = height;\r
        const text = node.findObject('TEXT');\r
        const ltext = node.findObject('LTEXT');\r
        const font =\r
          'bold ' +\r
          Math.max(12, Math.round(height / 8)) +\r
          'pt Segoe UI, Roboto, Helvetica Neue, Noto Sans, sans-serif';\r
        if (text) text.font = font;\r
        if (ltext) ltext.font = font;\r
        // and update the vertex's dimensions accordingly\r
        const v = net.findVertex(node);\r
        if (v !== null) {\r
          node.ensureBounds();\r
          const r = node.actualBounds;\r
          v.width = r.width;\r
          v.height = r.height;\r
          v.focusY = v.height / 2;\r
        }\r
      });\r
      return net;\r
    }\r
\r
    getAutoHeightForNode(node) {\r
      let heightIn = 0;\r
      let it = node.findLinksInto();\r
      while (it.next()) {\r
        heightIn += it.value.computeThickness();\r
      }\r
      let heightOut = 0;\r
      it = node.findLinksOutOf();\r
      while (it.next()) {\r
        heightOut += it.value.computeThickness();\r
      }\r
      let h = Math.max(heightIn, heightOut);\r
      if (h < 10) h = 10;\r
      return h;\r
    }\r
\r
    // treat dummy vertexes as having the thickness of the link that they are in\r
    nodeMinColumnSpace(v, topleft) {\r
      if (v.node === null) {\r
        if (v.edgesCount >= 1) {\r
          let max = 1;\r
          const it = v.edges;\r
          while (it.next()) {\r
            const edge = it.value;\r
            if (edge.link != null) {\r
              const t = edge.link.computeThickness();\r
              if (t > max) max = t;\r
              break;\r
            }\r
          }\r
          return Math.max(2, Math.ceil(max / this.columnSpacing));\r
        }\r
        return 2;\r
      }\r
      return super.nodeMinColumnSpace(v, topleft);\r
    }\r
\r
    // treat dummy vertexes as being thicker, so that the Bezier curves are gentler\r
    nodeMinLayerSpace(v, topleft) {\r
      if (v.node === null) return 100;\r
      return super.nodeMinLayerSpace(v, topleft);\r
    }\r
\r
    assignLayers() {\r
      super.assignLayers();\r
      const maxlayer = this.maxLayer;\r
      // now make sure every vertex with no outputs is maxlayer\r
      for (const it = this.network.vertexes.iterator; it.next(); ) {\r
        const v = it.value;\r
        const node = v.node;\r
        if (v.destinationVertexes.count == 0) {\r
          v.layer = 0;\r
        }\r
        if (v.sourceVertexes.count == 0) {\r
          v.layer = maxlayer;\r
        }\r
      }\r
      // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is\r
      // (other than the ones that are the widest or tallest in their respective layer).\r
    }\r
\r
    commitLayout() {\r
      super.commitLayout();\r
      for (const it = this.network.edges.iterator; it.next(); ) {\r
        const link = it.value.link;\r
        if (link && link.curve === go.Curve.Bezier) {\r
          // depend on Link.adjusting === go.LinkAdjusting.End to fix up the end points of the links\r
          // without losing the intermediate points of the route as determined by LayeredDigraphLayout\r
          link.invalidateRoute();\r
        }\r
      }\r
    }\r
  }\r
  // end of SankeyLayout\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      'animationManager.isEnabled': false,\r
      layout: new SankeyLayout({\r
        setsPortSpots: false, // to allow the "Side" spots on the nodes to take effect\r
        layerSpacing: 200, // lots of space between layers, for nicer thick links\r
        columnSpacing: 1\r
      })\r
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
    // this function provides a common style for the TextBlocks\r
    function textStyle(tb) {\r
      tb.font = 'bold 12pt Segoe UI, sans-serif';\r
      tb.stroke = 'black';\r
      tb.margin = 5;\r
    }\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node(go.Panel.Horizontal, {\r
          locationObjectName: 'SHAPE',\r
          locationSpot: go.Spot.Left,\r
          portSpreading: go.PortSpreading.Packed // rather than the default go.PortSpreading.Evenly\r
        })\r
        .add(\r
          new go.TextBlock({ name: 'LTEXT' })\r
            .apply(textStyle)\r
            .bind('text', 'ltext'),\r
          new go.Shape({\r
              name: 'SHAPE',\r
              fill: '#2E8DEF', // default fill color\r
              strokeWidth: 0,\r
              portId: '',\r
              fromSpot: go.Spot.RightSide,\r
              toSpot: go.Spot.LeftSide,\r
              height: 10,\r
              width: 20\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ name: 'TEXT' })\r
            .apply(textStyle)\r
            .bind('text')\r
        );\r
\r
    function getAutoLinkColor(data) {\r
      const nodedata = myDiagram.model.findNodeDataForKey(data.from);\r
      const hex = nodedata.color;\r
      return go.Brush.lightenBy(hex, 0.2);\r
    }\r
\r
    // define the Link template\r
    const linkSelectionAdornmentTemplate =\r
      new go.Adornment('Link')\r
        .add(\r
          new go.Shape({\r
            isPanelMain: true,\r
            fill: null,\r
            stroke: 'rgba(0, 0, 255, 0.3)',\r
            strokeWidth: 0\r
          }) // use selection object's strokeWidth\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          curve: go.Curve.Bezier,\r
          selectionAdornmentTemplate: linkSelectionAdornmentTemplate,\r
          layerName: 'Background',\r
          fromEndSegmentLength: 150,\r
          toEndSegmentLength: 150,\r
          adjusting: go.LinkAdjusting.End\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 4, stroke: 'rgba(173, 173, 173, 0.25)', opacity: 0.65 })\r
            .bind('stroke', '', getAutoLinkColor)\r
            .bind('strokeWidth', 'width')\r
        );\r
\r
    // read in the JSON-format data from the "mySavedModel" element\r
    load();\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    A Sankey diagram is a type of flow diagram where the Link thickness is proportional to the flow\r
    quantity.\r
  </p>\r
  <p>This sample customizes LayeredDigraphLayout.</p>\r
  <p>\r
    This sample demonstrates one way of generating a Sankey or flow diagram. The data was derived from\r
    <a href="https://tamc.github.io/Sankey/">https://tamc.github.io/Sankey/</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`layered-digraph`,`customlayout`];var g=y();l(`1mj4to6`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};