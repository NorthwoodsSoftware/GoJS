import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Zooming Changes Spaces Between Nodes without Changing Scale`,titleShort:`Spacing Zoom`,indexDescription:`When zooming, change the spacing of the Nodes, not the Diagram.scale.`,screenshot:`minimal`,priority:2,tags:[`commands`],description:`Zooming only changes the distance between nodes, not the apparent size of each node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  Spacing factor: <span id="SPACE">1.0</span>\r
  <br />\r
  <label><input type="checkbox" onclick="onIsYSpacedToggled()" checked="checked" />Is Y Axis Spaced?</label>`,jsCode:`// The custom CommandHandler that avoids changing the Diagram.scale\r
  class SpacingCommandHandler extends go.CommandHandler {\r
    constructor(init) {\r
      super();\r
      this._space = 1.0; // replaces Diagram.scale; also copied to/from Model.modelData.space\r
      this._spaceCenter = new go.Point(0, 0); // not currently used -- should this be saved on modelData too?\r
      this._isYSpaced = true; // scale Y along with X?  This option is just for demonstration purposes.\r
      this._isUpdating = false;\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // Overrides of commands that scale the diagram -- change the space instead\r
\r
    decreaseZoom(factor) {\r
      if (factor === undefined /*notpresent*/) factor = 1.0 / this.zoomFactor;\r
      this.setSpace(this.space * factor);\r
    }\r
    canDecreaseZoom(factor) {\r
      if (factor === undefined /*notpresent*/) factor = 1.0 / this.zoomFactor;\r
      return this.checkSpace(this.space * factor);\r
    }\r
\r
    increaseZoom(factor) {\r
      if (factor === undefined /*notpresent*/) factor = 1.0 / this.zoomFactor;\r
      this.setSpace(this.space / factor);\r
    }\r
    canIncreaseZoom(factor) {\r
      if (factor === undefined /*notpresent*/) factor = 1.0 / this.zoomFactor;\r
      return this.checkSpace(this.space / factor);\r
    }\r
\r
    resetZoom(newspace) {\r
      if (newspace === undefined /*notpresent*/) newspace = 1.0;\r
      this.setSpace(newspace);\r
    }\r
    canResetZoom(newspace) {\r
      return this.checkSpace(newspace);\r
    }\r
\r
    // actually set a new value for SPACE\r
    setSpace(s) {\r
      this.space = Math.max(0.1, Math.min(10.0, s));\r
    }\r
\r
    // validity check for a new value for SPACE\r
    checkSpace(s) {\r
      return 0.1 <= s && s <= 10.0;\r
    }\r
\r
    // Properties for SpacingCommandHandler\r
\r
    get space() {\r
      return this._space;\r
    }\r
    set space(val) {\r
      if (val !== this._space) {\r
        this._space = val;\r
        const diagram = this.diagram;\r
        if (diagram !== null) {\r
          // store in model too, and support undo\r
          diagram.model.set(diagram.model.modelData, 'space', val);\r
        }\r
        this.updateAllLocations();\r
        // update the page showing the current value\r
        document.getElementById('SPACE').textContent = val.toString();\r
      }\r
    }\r
\r
    get spaceCenter() {\r
      return this._spaceCenter;\r
    }\r
    set spaceCenter(val) {\r
      if (!val.equals(this._spaceCenter)) {\r
        this._spaceCenter = val.copy();\r
      }\r
    }\r
\r
    get isYSpaced() {\r
      return this._isYSpaced;\r
    }\r
    set isYSpaced(val) {\r
      if (val !== this._isYSpaced) {\r
        this._isYSpaced = val;\r
        this.updateAllLocations();\r
      }\r
    }\r
\r
    // If the spacing or isYSpaced properties change value,\r
    // we need to update the effective locations of all nodes.\r
    // Assume Node.location is data bound to "loc" property.\r
    updateAllLocations() {\r
      const diagram = this.diagram;\r
      if (diagram === null) return;\r
      this._isUpdating = true;\r
      diagram.skipsUndoManager = true;\r
      diagram.startTransaction('respace nodes');\r
      diagram.parts.each(p => p.updateTargetBindings('loc'));\r
      diagram.nodes.each(n => n.updateTargetBindings('loc'));\r
      diagram.commitTransaction('respace nodes');\r
      diagram.skipsUndoManager = false;\r
      this._isUpdating = false;\r
    }\r
  }\r
  // end SpacingCommandHandler class\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // create a Diagram for the DIV HTML element\r
      commandHandler: new SpacingCommandHandler(),\r
      // update the SpacingCommandHandler.space from the model at the end of each transaction\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) {\r
          myDiagram.commandHandler.space = myDiagram.model.modelData.space;\r
        }\r
      },\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // Define a simple Node template that cannot be shared with other Diagrams,\r
    // because of the use of the Node.location Binding conversion functions.\r
    // The SpacingCommandHandler also assumes the Node.location is bound to the data property named "loc".\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the Shape will go around the TextBlock\r
        .bindTwoWay('location', 'loc', spacedLocationParse, spacedLocationStringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
        );\r
\r
    // but use the default Link template, by not setting Diagram.linkTemplate\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue', loc: '0 0' },\r
        { key: 2, text: 'Beta', color: 'orange', loc: '100 0' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen', loc: '0 100' },\r
        { key: 4, text: 'Delta', color: 'pink', loc: '100 100' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
\r
    // the "space" property is kept on the Model.modelData too\r
    myDiagram.model.modelData.space = 1.0;\r
  }\r
\r
  // Conversion functions -- these only work with myDiagram, assuming it uses a SpacingCommandHandler\r
\r
  function spacedLocationParse(str) {\r
    const cmd = myDiagram.commandHandler;\r
    if (!(cmd instanceof SpacingCommandHandler)) throw new Error('not using SpacingCommandHandler');\r
    const pt = go.Point.parse(str);\r
    pt.x = (pt.x - cmd.spaceCenter.x) * cmd.space + cmd.spaceCenter.x;\r
    if (cmd.isYSpaced) {\r
      pt.y = (pt.y - cmd.spaceCenter.y) * cmd.space + cmd.spaceCenter.y;\r
    }\r
    return pt;\r
  }\r
\r
  function spacedLocationStringify(pt, data) {\r
    const cmd = myDiagram.commandHandler;\r
    if (!cmd._isUpdating) {\r
      pt = pt.copy();\r
      pt.x = (pt.x - cmd.spaceCenter.x) / cmd.space + cmd.spaceCenter.x;\r
      if (cmd.isYSpaced) {\r
        pt.y = (pt.y - cmd.spaceCenter.y) / cmd.space + cmd.spaceCenter.y;\r
      }\r
      return go.Point.stringify(pt);\r
    } else {\r
      return data.loc;\r
    }\r
  }\r
\r
  function onIsYSpacedToggled() {\r
    myDiagram.commandHandler.isYSpaced = !myDiagram.commandHandler.isYSpaced;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Click in the diagram and then try zooming in and out of the diagram by using control-mouse-wheel. If you don't want to hold down the control key, click the\r
    mouse wheel button in the diagram to toggle between mouse wheel events zooming instead of scrolling.\r
  </p>\r
  <p>\r
    This diagram uses a custom <a>CommandHandler</a> to replace the standard zooming behavior. The <a>CommandHandler.decreaseZoom</a>,\r
    <a>CommandHandler.increaseZoom</a>, and <a>CommandHandler.resetZoom</a> commands no longer change the <a>Diagram.scale</a>. Instead they change the\r
    effective <a>Part.location</a> for all of the <a>Node</a>s by changing the value of the conversion function that is getting the location from the "loc"\r
    property on the node data.\r
  </p>\r
  <p>\r
    As the value of SpacingCommandHandler.space changes, all of the Bindings on "loc" are re-evaluated, causing the nodes to get new locations. The value of the\r
    "loc" data property remains unchanged by the Binding. However the TwoWay Binding does cause the "loc" data property to be modified when the user drags a\r
    node.\r
  </p>\r
  <p>\r
    The conversion functions also depend on the SpacingCommandHandler.isYSpaced property, which can be toggled by the checkbox. When false the conversion\r
    functions do not space along the Y axis, but only along the X axis.\r
  </p>\r
  <p>\r
    Because the conversion functions are dependent on the particular Diagram, and because the node template depends on the conversion functions, the template\r
    cannot be used by other Diagrams.\r
  </p>\r
  <p>\r
    The SpacingCommandHandler.space property is duplicated on the <a>Model.modelData</a> object, both so that the information is saved in the model as well as\r
    to support undo/redo.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`commands`];var g=y();l(`1luvtjd`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};