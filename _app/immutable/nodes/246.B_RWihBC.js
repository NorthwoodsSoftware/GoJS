import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Sequence Diagram with Actors, Lifelines, Activities, and Interactions`,titleShort:`Sequence Diagram`,indexDescription:`A sequence diagram illustrates how different processes interact with one-another and in what order.`,screenshot:`sequencediagram`,priority:2,tags:[`links`,`groups`,`tools`,`grid`,`process`],description:`A sequence diagram editor.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 240px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":"Fred", "text":"Fred: Patron", "isGroup":true, "loc":"0 0", "duration":9},\r
{"key":"Bob", "text":"Bob: Waiter", "isGroup":true, "loc":"100 0", "duration":9},\r
{"key":"Hank", "text":"Hank: Cook", "isGroup":true, "loc":"200 0", "duration":9},\r
{"key":"Renee", "text":"Renee: Cashier", "isGroup":true, "loc":"300 0", "duration":9},\r
{"group":"Bob", "start":1, "duration":2},\r
{"group":"Hank", "start":2, "duration":3},\r
{"group":"Fred", "start":3, "duration":1},\r
{"group":"Bob", "start":5, "duration":1},\r
{"group":"Fred", "start":6, "duration":2},\r
{"group":"Renee", "start":8, "duration":1}\r
 ],\r
  "linkDataArray": [\r
{"from":"Fred", "to":"Bob", "text":"order", "time":1},\r
{"from":"Bob", "to":"Hank", "text":"order food", "time":2},\r
{"from":"Bob", "to":"Fred", "text":"serve drinks", "time":3},\r
{"from":"Hank", "to":"Bob", "text":"finish cooking", "time":5},\r
{"from":"Bob", "to":"Fred", "text":"serve food", "time":6},\r
{"from":"Fred", "to":"Renee", "text":"pay", "time":8}\r
 ]}\r
    </textarea>\r
  </div>`,jsCode:`// a custom routed Link\r
  class MessageLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      this.time = 0; // use this "time" value when this is the temporaryLink\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {\r
      const p = port.getDocumentPoint(go.Spot.Center);\r
      const r = port.getDocumentBounds();\r
      const op = otherport.getDocumentPoint(go.Spot.Center);\r
\r
      const data = this.data;\r
      const time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property\r
\r
      const aw = this.findActivityWidth(node, time);\r
      const x = op.x > p.x ? p.x + aw / 2 : p.x - aw / 2;\r
      const y = convertTimeToY(time);\r
      return new go.Point(x, y);\r
    }\r
\r
    findActivityWidth(node, time) {\r
      let aw = ActivityWidth;\r
      if (node instanceof go.Group) {\r
        // see if there is an Activity Node at this point -- if not, connect the link directly with the Group's lifeline\r
        if (\r
          !node.memberParts.any(mem => {\r
            const act = mem.data;\r
            return act !== null && act.start <= time && time <= act.start + act.duration;\r
          })\r
        ) {\r
          aw = 0;\r
        }\r
      }\r
      return aw;\r
    }\r
\r
    getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport) {\r
      const p = port.getDocumentPoint(go.Spot.Center);\r
      const op = otherport.getDocumentPoint(go.Spot.Center);\r
      const right = op.x > p.x;\r
      return right ? 0 : 180;\r
    }\r
\r
    computePoints() {\r
      if (this.fromNode === this.toNode) {\r
        // also handle a reflexive link as a simple orthogonal loop\r
        const data = this.data;\r
        const time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property\r
        const p = this.fromNode.port.getDocumentPoint(go.Spot.Center);\r
        const aw = this.findActivityWidth(this.fromNode, time);\r
\r
        const x = p.x + aw / 2;\r
        const y = convertTimeToY(time);\r
        this.clearPoints();\r
        this.addPoint(new go.Point(x, y));\r
        this.addPoint(new go.Point(x + 50, y));\r
        this.addPoint(new go.Point(x + 50, y + 5));\r
        this.addPoint(new go.Point(x, y + 5));\r
        return true;\r
      } else {\r
        return super.computePoints();\r
      }\r
    }\r
  }\r
  // end MessageLink\r
\r
  // A custom LinkingTool that fixes the "time" (i.e. the Y coordinate)\r
  // for both the temporaryLink and the actual newly created Link\r
  class MessagingTool extends go.LinkingTool {\r
    constructor(init) {\r
      super();\r
      this.temporaryLink = new MessageLink()\r
        .add(\r
          new go.Shape('Rectangle', { stroke: 'magenta', strokeWidth: 2 }),\r
          new go.Shape({ toArrow: 'OpenTriangle', stroke: 'magenta' })\r
        );\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    doActivate() {\r
      super.doActivate();\r
      const time = convertYToTime(this.diagram.firstInput.documentPoint.y);\r
      this.temporaryLink.time = Math.ceil(time); // round up to an integer value\r
    }\r
\r
    insertLink(fromnode, fromport, tonode, toport) {\r
      const newlink = super.insertLink(fromnode, fromport, tonode, toport);\r
      if (newlink !== null) {\r
        const model = this.diagram.model;\r
        // specify the time of the message\r
        const start = this.temporaryLink.time;\r
        const duration = 1;\r
        newlink.data.time = start;\r
        model.set(newlink.data, 'text', 'msg');\r
        // and create a new Activity node data in the "to" group data\r
        const newact = {\r
          group: newlink.data.to,\r
          start: start,\r
          duration: duration\r
        };\r
        model.addNodeData(newact);\r
        // now make sure all Lifelines are long enough\r
        ensureLifelineHeights();\r
      }\r
      return newlink;\r
    }\r
  }\r
  // end MessagingTool\r
\r
  // A custom DraggingTool that supports dragging any number of MessageLinks up and down --\r
  // changing their data.time value.\r
  class MessageDraggingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // override the standard behavior to include all selected Links,\r
    // even if not connected with any selected Nodes\r
    computeEffectiveCollection(parts, options) {\r
      const result = super.computeEffectiveCollection(parts, options);\r
      // add a dummy Node so that the user can select only Links and move them all\r
      result.add(new go.Node(), new go.DraggingInfo(new go.Point()));\r
      // normally this method removes any links not connected to selected nodes;\r
      // we have to add them back so that they are included in the "parts" argument to moveParts\r
      parts.each(part => {\r
        if (part instanceof go.Link) {\r
          result.add(part, new go.DraggingInfo(part.getPoint(0).copy()));\r
        }\r
      });\r
      return result;\r
    }\r
\r
    // override to allow dragging when the selection only includes Links\r
    mayMove() {\r
      return !this.diagram.isReadOnly && this.diagram.allowMove;\r
    }\r
\r
    // override to move Links (which are all assumed to be MessageLinks) by\r
    // updating their Link.data.time property so that their link routes will\r
    // have the correct vertical position\r
    moveParts(parts, offset, check) {\r
      super.moveParts(parts, offset, check);\r
      const it = parts.iterator;\r
      while (it.next()) {\r
        if (it.key instanceof go.Link) {\r
          const link = it.key;\r
          const startY = it.value.point.y; // DraggingInfo.point.y\r
          let y = startY + offset.y; // determine new Y coordinate value for this link\r
          const cellY = this.gridSnapCellSize.height;\r
          y = Math.round(y / cellY) * cellY; // snap to multiple of gridSnapCellSize.height\r
          const t = Math.max(0, convertYToTime(y));\r
          link.diagram.model.set(link.data, 'time', t);\r
          link.invalidateRoute();\r
        }\r
      }\r
    }\r
  }\r
  // end MessageDraggingTool\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      linkingTool: new MessagingTool(), // defined below\r
      'resizingTool.isGridSnapEnabled': true,\r
      draggingTool: new MessageDraggingTool(), // defined below\r
      'draggingTool.gridSnapCellSize': new go.Size(1, MessageSpacing / 4),\r
      'draggingTool.isGridSnapEnabled': true,\r
      // automatically extend Lifelines as Activities are moved or resized\r
      SelectionMoved: ensureLifelineHeights,\r
      PartResized: ensureLifelineHeights,\r
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
    // define the Lifeline Node template.\r
    myDiagram.groupTemplate =\r
      new go.Group('Vertical', {\r
          locationSpot: go.Spot.Bottom,\r
          locationObjectName: 'HEADER',\r
          minLocation: new go.Point(0, 0),\r
          maxLocation: new go.Point(9999, 0),\r
          selectionObjectName: 'HEADER'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Auto', { name: 'HEADER' })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                fill: new go.Brush('Linear', {\r
                  0: '#bbdefb',\r
                  1: go.Brush.darkenBy('#bbdefb', 0.1)\r
                }),\r
                stroke: null\r
              }),\r
              new go.TextBlock({\r
                  margin: 5,\r
                  font: '400 10pt Source Sans Pro, sans-serif'\r
                })\r
                .bind('text')\r
            ),\r
          new go.Shape({\r
              figure: 'LineV',\r
              fill: null,\r
              stroke: 'gray',\r
              strokeDashArray: [3, 3],\r
              width: 1,\r
              alignment: go.Spot.Center,\r
              portId: '',\r
              fromLinkable: true,\r
              fromLinkableDuplicates: true,\r
              toLinkable: true,\r
              toLinkableDuplicates: true,\r
              cursor: 'pointer'\r
            })\r
            .bind('height', 'duration', computeLifelineHeight)\r
        );\r
\r
    // define the Activity Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          locationSpot: go.Spot.Top,\r
          locationObjectName: 'SHAPE',\r
          minLocation: new go.Point(NaN, LinePrefix - ActivityStart),\r
          maxLocation: new go.Point(NaN, 19999),\r
          selectionObjectName: 'SHAPE',\r
          resizable: true,\r
          resizeObjectName: 'SHAPE',\r
          resizeAdornmentTemplate:\r
            new go.Adornment('Spot')\r
              .add(\r
                new go.Placeholder(),\r
                new go.Shape({ // only a bottom resize handle\r
                  alignment: go.Spot.Bottom,\r
                  cursor: 'col-resize',\r
                  desiredSize: new go.Size(6, 6),\r
                  fill: 'yellow'\r
                })\r
              )\r
        })\r
        .bindTwoWay('location', '', computeActivityLocation, backComputeActivityLocation)\r
        .add(\r
          new go.Shape('Rectangle', {\r
              name: 'SHAPE',\r
              fill: 'white',\r
              stroke: 'black',\r
              width: ActivityWidth,\r
              // allow Activities to be resized down to 1/4 of a time unit\r
              minSize: new go.Size(ActivityWidth, computeActivityHeight(0.25))\r
            })\r
            .bindTwoWay('height', 'duration', computeActivityHeight, backComputeActivityHeight)\r
        );\r
\r
    // define the Message Link template.\r
    myDiagram.linkTemplate =\r
      new MessageLink({ // defined below\r
          selectionAdorned: true,\r
          curviness: 0\r
        })\r
        .add(\r
          new go.Shape('Rectangle', { stroke: 'black' }),\r
          new go.Shape({ toArrow: 'OpenTriangle', stroke: 'black' }),\r
          new go.TextBlock({\r
              font: '400 9pt Source Sans Pro, sans-serif',\r
              segmentIndex: 0,\r
              segmentOffset: new go.Point(NaN, NaN),\r
              isMultiline: false,\r
              editable: true\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    // create the graph by reading the JSON data saved in "mySavedModel" textarea element\r
    load();\r
  }\r
\r
  function ensureLifelineHeights(e) {\r
    // iterate over all Activities (ignore Groups)\r
    const arr = myDiagram.model.nodeDataArray;\r
    let max = -1;\r
    for (let i = 0; i < arr.length; i++) {\r
      const act = arr[i];\r
      if (act.isGroup) continue;\r
      max = Math.max(max, act.start + act.duration);\r
    }\r
    if (max > 0) {\r
      // now iterate over only Groups\r
      for (let i = 0; i < arr.length; i++) {\r
        const gr = arr[i];\r
        if (!gr.isGroup) continue;\r
        if (max > gr.duration) {\r
          // this only extends, never shrinks\r
          myDiagram.model.set(gr, 'duration', max);\r
        }\r
      }\r
    }\r
  }\r
\r
  // some parameters\r
  const LinePrefix = 20; // vertical starting point in document for all Messages and Activations\r
  const LineSuffix = 30; // vertical length beyond the last message time\r
  const MessageSpacing = 20; // vertical distance between Messages at different steps\r
  const ActivityWidth = 10; // width of each vertical activity bar\r
  const ActivityStart = 5; // height before start message time\r
  const ActivityEnd = 5; // height beyond end message time\r
\r
  function computeLifelineHeight(duration) {\r
    return LinePrefix + duration * MessageSpacing + LineSuffix;\r
  }\r
\r
  function computeActivityLocation(act) {\r
    const groupdata = myDiagram.model.findNodeDataForKey(act.group);\r
    if (groupdata === null) return new go.Point();\r
    // get location of Lifeline's starting point\r
    const grouploc = go.Point.parse(groupdata.loc);\r
    return new go.Point(grouploc.x, convertTimeToY(act.start) - ActivityStart);\r
  }\r
  function backComputeActivityLocation(loc, act) {\r
    myDiagram.model.set(act, 'start', convertYToTime(loc.y + ActivityStart));\r
  }\r
\r
  function computeActivityHeight(duration) {\r
    return ActivityStart + duration * MessageSpacing + ActivityEnd;\r
  }\r
  function backComputeActivityHeight(height) {\r
    return (height - ActivityStart - ActivityEnd) / MessageSpacing;\r
  }\r
\r
  // time is just an abstract small non-negative integer\r
  // here we map between an abstract time and a vertical position\r
  function convertTimeToY(t) {\r
    return t * MessageSpacing + LinePrefix;\r
  }\r
  function convertYToTime(y) {\r
    return (y - LinePrefix) / MessageSpacing;\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[`https://fonts.googleapis.com/css?family=Source+Sans+Pro`],externalScripts:[],descriptionHtml:`<p>\r
    A <em>sequence diagram</em> is an interaction diagram that shows how entities operate with one another and in what order. In this sample, we show the\r
    interaction between different people in a restaurant.\r
  </p>\r
  <p>\r
    The diagram uses the <a>Diagram.groupTemplate</a> for "lifelines," <a>Diagram.nodeTemplate</a> for "activities," and <a>Diagram.linkTemplate</a> for\r
    "messages" between the entities. Also featured are a custom Link class and custom <a>LinkingTool</a> to draw links between lifelines and create activities\r
    at the end of the new link. Nodes use a binding function on the location property to ensure they are anchored to their lifeline.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`groups`,`tools`,`grid`,`process`];var g=y();l(`olt975`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};