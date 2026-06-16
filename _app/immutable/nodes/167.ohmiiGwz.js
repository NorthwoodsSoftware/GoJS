import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Force Directed Layout During Dragging`,titleShort:`Continuous Interactive Force Layout`,indexDescription:`A continuous ForceDirectedLayout that occurs as the user drags around a node.`,screenshot:`interactiveforce`,priority:2,tags:[`force-directed`,`customlayout`],description:`A continuously operating ForceDirectedLayout lets the user push and pull nodes around.`},htmlContent:`<div id="myDiagramDiv" style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 700px"></div>`,jsCode:`// This variation on ForceDirectedLayout does not move any selected Nodes\r
  // but does move all other nodes (vertexes).\r
  class ContinuousForceDirectedLayout extends go.ForceDirectedLayout {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    isFixed(v) {\r
      return v.node.isSelected;\r
    }\r
\r
    // optimization: reuse the ForceDirectedNetwork rather than re-create it each time\r
    doLayout(coll) {\r
      if (!this._isObserving) {\r
        this._isObserving = true;\r
        // cacheing the network means we need to recreate it if nodes or links have been added or removed or relinked,\r
        // so we need to track structural model changes to discard the saved network.\r
        this.diagram.addModelChangedListener(e => {\r
          // modelChanges include a few cases that we don't actually care about, such as\r
          // "nodeCategory" or "linkToPortId", but we'll go ahead and recreate the network anyway.\r
          // Also clear the network when replacing the model.\r
          if (e.modelChange !== '' || (e.change === go.ChangeType.Transaction && e.propertyName === 'StartingFirstTransaction')) {\r
            this.network = null;\r
          }\r
        });\r
      }\r
      var net = this.network;\r
      if (net === null) {\r
        // the first time, just create the network as normal\r
        this.network = net = this.makeNetwork(coll);\r
      } else {\r
        // but on reuse we need to update the LayoutVertex.bounds for selected nodes\r
        this.diagram.nodes.each(n => {\r
          var v = net.findVertex(n);\r
          if (v !== null) v.bounds = n.actualBounds;\r
        });\r
      }\r
      // now perform the normal layout\r
      super.doLayout(coll);\r
      // doLayout normally discards the LayoutNetwork by setting Layout.network to null;\r
      // here we remember it for next time\r
      this.network = net;\r
\r
      // in the future, don't allow nodes to move as far\r
      //this.initialTemperature = x => 10;\r
    }\r
  }\r
  // end ContinuousForceDirectedLayout\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform, // an initial automatic zoom-to-fit\r
      contentAlignment: go.Spot.Center, // align document to the center of the viewport\r
      layout: new ContinuousForceDirectedLayout({ // automatically spread nodes apart while dragging\r
        moveLimit: 10,\r
        defaultElectricalCharge: 500\r
      }),\r
      // do an extra layout at the end of a move\r
      SelectionMoved: e => e.diagram.layout.invalidateLayout()\r
    });\r
\r
    // dragging a node invalidates the Diagram.layout, causing a layout during the drag\r
    myDiagram.toolManager.draggingTool.doMouseMove = function () {\r
      // method override must be function, not =>\r
      go.DraggingTool.prototype.doMouseMove.call(this);\r
      if (this.isActive) this.diagram.layout.doLayout(this.diagram);\r
    };\r
\r
    // define each Node's appearance\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the whole node panel\r
        // define the node's outer shape, which will surround the TextBlock\r
        .add(\r
          new go.Shape('Circle', {\r
            fill: 'CornflowerBlue',\r
            stroke: 'black',\r
            spot1: new go.Spot(0, 0, 5, 5),\r
            spot2: new go.Spot(1, 1, -5, -5)\r
          }),\r
          new go.TextBlock({\r
              font: 'bold 10pt helvetica, bold arial, sans-serif',\r
              textAlign: 'center',\r
              maxSize: new go.Size(100, NaN)\r
            })\r
            .bind('text')\r
        );\r
\r
    // the rest of this app is the same as samples/conceptMap.html\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link() // the whole link panel\r
        .add(\r
          new go.Shape({ stroke: 'black' }), // the link shape\r
          new go.Shape({ toArrow: 'standard', stroke: null }), // the arrowhead\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ // the label background, which becomes transparent around the edges\r
                fill: new go.Brush('Radial', { 0: 'rgb(240, 240, 240)', 0.3: 'rgb(240, 240, 240)', 1: 'rgba(240, 240, 240, 0)' }),\r
                stroke: null\r
              }),\r
              new go.TextBlock({ // the label text\r
                  textAlign: 'center',\r
                  font: '10pt helvetica, arial, sans-serif',\r
                  stroke: '#555555',\r
                  margin: 4\r
                })\r
                .bind('text')\r
            )\r
        );\r
\r
    // create the model for the concept map\r
    var nodeDataArray = [\r
      { key: 1, text: 'Concept Maps' },\r
      { key: 2, text: 'Organized Knowledge' },\r
      { key: 3, text: 'Context Dependent' },\r
      { key: 4, text: 'Concepts' },\r
      { key: 5, text: 'Propositions' },\r
      { key: 6, text: 'Associated Feelings or Affect' },\r
      { key: 7, text: 'Perceived Regularities' },\r
      { key: 8, text: 'Labeled' },\r
      { key: 9, text: 'Hierarchically Structured' },\r
      { key: 10, text: 'Effective Teaching' },\r
      { key: 11, text: 'Crosslinks' },\r
      { key: 12, text: 'Effective Learning' },\r
      { key: 13, text: 'Events (Happenings)' },\r
      { key: 14, text: 'Objects (Things)' },\r
      { key: 15, text: 'Symbols' },\r
      { key: 16, text: 'Words' },\r
      { key: 17, text: 'Creativity' },\r
      { key: 18, text: 'Interrelationships' },\r
      { key: 19, text: 'Infants' },\r
      { key: 20, text: 'Different Map Segments' }\r
    ];\r
    var linkDataArray = [\r
      { from: 1, to: 2, text: 'represent' },\r
      { from: 2, to: 3, text: 'is' },\r
      { from: 2, to: 4, text: 'is' },\r
      { from: 2, to: 5, text: 'is' },\r
      { from: 2, to: 6, text: 'includes' },\r
      { from: 2, to: 10, text: 'necessary\\nfor' },\r
      { from: 2, to: 12, text: 'necessary\\nfor' },\r
      { from: 4, to: 5, text: 'combine\\nto form' },\r
      { from: 4, to: 6, text: 'include' },\r
      { from: 4, to: 7, text: 'are' },\r
      { from: 4, to: 8, text: 'are' },\r
      { from: 4, to: 9, text: 'are' },\r
      { from: 5, to: 9, text: 'are' },\r
      { from: 5, to: 11, text: 'may be' },\r
      { from: 7, to: 13, text: 'in' },\r
      { from: 7, to: 14, text: 'in' },\r
      { from: 7, to: 19, text: 'begin\\nwith' },\r
      { from: 8, to: 15, text: 'with' },\r
      { from: 8, to: 16, text: 'with' },\r
      { from: 9, to: 17, text: 'aids' },\r
      { from: 11, to: 18, text: 'show' },\r
      { from: 12, to: 19, text: 'begins\\nwith' },\r
      { from: 17, to: 18, text: 'needed\\nto see' },\r
      { from: 18, to: 20, text: 'between' }\r
    ];\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>As you drag a node around, the custom <a>ForceDirectedLayout</a> operates continuously, causing other nodes to be pushed aside or pulled along.</p>\r
  <p>The graph is exactly the same as the <a href="conceptMap">Concept Map</a> sample. But the node template is different, and the layout is different.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`force-directed`,`customlayout`];var g=y();l(`ctvabs`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};