import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Resizing via Pinch Zooming`,indexDescription:`Demonstrates customization of pinch-zooming to scale a node.`,screenshot:`minimal`,priority:2,tags:[`tools`],description:`Customize the pinch-zooming action of GoJS.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       This also adds a border to help see the edges of the viewport. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`// Override normal panning & pinch zoom to rescale and rotate the selected node, instead of the Diagram.\r
  // This does not try to move the selected non-Link Part, but scaling or rotation might cause the Part's location to change.\r
  class PinchRescalingTool extends go.PanningTool {\r
    constructor(init) {\r
      super();\r
      this.currentPart = null;\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    doActivate() {\r
      const diagram = this.diagram;\r
      if (diagram === null) return;\r
      super.doActivate();\r
      const node = diagram.selection.first();\r
      if (node instanceof go.Node) {\r
        this.currentPart = node;\r
        this.originalPosition = node.location;\r
        this.originalScale = node.scale;\r
        this.originalAngle = node.angle;\r
        this.startTransaction("Rescaling");\r
      }\r
    }\r
\r
    doDeactivate() {\r
      super.doDeactivate();\r
      if (this.currentPart) {\r
        this.stopTransaction();\r
        this.currentPart = null;\r
      }\r
    }\r
\r
    doCancel() {\r
      if (this.currentPart) {\r
        this.currentPart.location = this.originalPosition;\r
        this.currentPart.scale = this.originalScale;\r
        this.currentPart.angle = this.originalAngle;\r
      }\r
      super.doCancel();\r
    }\r
\r
    doMouseUp() {\r
      this.transactionResult = "Rescaled";\r
      super.doMouseUp();\r
    }\r
\r
    // DIST will be zero if the event is not a multi-touch event\r
    pan(newposition, newscale, newangle, dist, angle, scalecenter) {\r
      const diagram = this.diagram;\r
      if (diagram === null) return;\r
      const node = this.currentPart;\r
      if (node !== null && (this.startedScaling || this.startedRotating)) {\r
        if (this.startedScaling && dist > this.scaleMinimumThreshold) node.scale = newscale;\r
        if (this.startedRotating && dist > 0) node.angle = newangle;\r
      } else {\r
        super.pan(newposition, newscale, newangle, dist, angle, scalecenter);\r
      }\r
    }\r
  }  // end of PinchResizingTool\r
\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // replace the standard ToolManager with a PinchResizingTool\r
      panningTool: new PinchRescalingTool(),\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the Shape will go around the TextBlock\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample gives an example of customizing <a>PanningTool</a>.\r
    Select a node and pinch zoom to see the action modify the scale and angle of the Node\r
    instead of the scale of the Diagram.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`];var g=y();l(`mpjoho`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};