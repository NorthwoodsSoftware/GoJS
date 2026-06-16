import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Shared States not using Groups`,indexDescription:`As an alternative to using Groups, this manages Nodes that simultaneously belong to multiple containers.`,screenshot:`sharedstates`,priority:2,tags:[`collections`,`customlayout`,`groups`,`tools`],description:`A diagram where nodes may belong to multiple groups.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
    { "key": -1, "text": "Operating", "category": "Super" },\r
    { "key": -2, "text": "Drying", "category": "Super", "supers": [-1] },\r
    { "key": -3, "text": "Non Drying", "category": "Super" },\r
\r
    { "key": 1, "loc": "100 100", "text": "Starting.End", "supers": [-2] },\r
    { "key": 2, "loc": "250 100", "text": "Running", "supers": [-2] },\r
    { "key": 3, "loc": "100 200", "text": "Starting.Init", "supers": [-1, -3] },\r
    { "key": 4, "loc": "250 200", "text": "Washing", "supers": [-1, -3] },\r
    { "key": 5, "loc": "100 300", "text": "Stopped", "supers": [-3] },\r
    { "key": 6, "loc": "250 300", "text": "Stopping", "supers": [-3] }\r
  ],\r
  "linkDataArray": [\r
    { "from":  1, "to": 2 },\r
    { "from":  3, "to": 1 },\r
    { "from":  4, "to": 2 },\r
    { "from": -2, "to": 4 },\r
    { "from":  5, "to": 3 },\r
    { "from":  6, "to": 5 },\r
    { "from": -1, "to": 5 }\r
  ]\r
}\r
</textarea\r
  >`,jsCode:`// A custom layout that sizes each "Super" node to be big enough to cover all of it member nodes\r
  class CustomLayout extends go.Layout {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    doLayout(coll) {\r
      coll = this.collectParts(coll);\r
\r
      const supers = new go.Set(/*go.Node*/);\r
      coll.each(p => {\r
        if (p instanceof go.Node && p.category === 'Super') supers.add(p);\r
      });\r
\r
      function membersOf(sup, diag) {\r
        const set = new go.Set(/*go.Part*/);\r
        const arr = sup.data._members;\r
        for (let i = 0; i < arr.length; i++) {\r
          const d = arr[i];\r
          set.add(diag.findNodeForData(d));\r
        }\r
        return set;\r
      }\r
\r
      function isReady(sup, supers, diag) {\r
        const arr = sup.data._members;\r
        for (let i = 0; i < arr.length; i++) {\r
          const d = arr[i];\r
          if (d.category !== 'Super') continue;\r
          const n = diag.findNodeForData(d);\r
          if (supers.has(n)) return false;\r
        }\r
        return true;\r
      }\r
\r
      // implementations of doLayout that do not make use of a LayoutNetwork\r
      // need to perform their own transactions\r
      this.diagram.startTransaction('Custom Layout');\r
\r
      while (supers.count > 0) {\r
        let ready = null;\r
        const it = supers.iterator;\r
        while (it.next()) {\r
          if (isReady(it.value, supers, this.diagram)) {\r
            ready = it.value;\r
            break;\r
          }\r
        }\r
        supers.remove(ready);\r
        const b = this.diagram.computePartsBounds(membersOf(ready, this.diagram));\r
        ready.location = b.position;\r
        const body = ready.findObject('BODY');\r
        if (body) body.desiredSize = b.size;\r
      }\r
\r
      this.diagram.commitTransaction('Custom Layout');\r
    }\r
  }\r
  // end CustomLayout\r
\r
  // Define a custom DraggingTool\r
  class CustomDraggingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    moveParts(parts, offset, check) {\r
      super.moveParts(parts, offset, check);\r
      this.diagram.layoutDiagram(true);\r
    }\r
\r
    computeEffectiveCollection(parts) {\r
      const coll = new go.Set(/*go.Part*/).addAll(parts);\r
      parts.each(p => this.walkSubTree(p, coll));\r
      return super.computeEffectiveCollection(coll);\r
    }\r
\r
    // Find other attached nodes.\r
    walkSubTree(sup, coll) {\r
      if (sup === null) return;\r
      coll.add(sup);\r
      if (sup.category !== 'Super') return;\r
      // recurse through this super state's members\r
      const model = this.diagram.model;\r
      const mems = sup.data._members;\r
      if (mems) {\r
        for (let i = 0; i < mems.length; i++) {\r
          const mdata = mems[i];\r
          this.walkSubTree(this.diagram.findNodeForData(mdata), coll);\r
        }\r
      }\r
    }\r
  }\r
  // end CustomDraggingTool class\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must name or refer to the DIV HTML element\r
      allowCopy: false,\r
      allowDelete: false,\r
      draggingTool: new CustomDraggingTool(),\r
      layout: new CustomLayout(),\r
      // enable undo & redo\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) { if (idx < 0) document.title += '*'; }\r
      else { if (idx >= 0) document.title = document.title.slice(0, idx); }\r
    });\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // define the node's outer shape, which will surround the TextBlock\r
          new go.Shape('RoundedRectangle', {\r
            fill: 'rgb(254, 201, 0)',\r
            stroke: 'black',\r
            parameter1: 20, // the corner has a large radius\r
            portId: '',\r
            fromSpot: go.Spot.AllSides,\r
            toSpot: go.Spot.AllSides\r
          }),\r
          new go.TextBlock()\r
            .bindTwoWay('text')\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Super',\r
      new go.Node('Auto', { locationObjectName: 'BODY' })\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
            fill: 'rgba(128, 128, 64, 0.5)',\r
            strokeWidth: 1.5,\r
            parameter1: 20,\r
            spot1: go.Spot.TopLeft,\r
            spot2: go.Spot.BottomRight,\r
            minSize: new go.Size(30, 30)\r
          }),\r
          new go.Panel('Vertical', { margin: 10 })\r
            .add(\r
              new go.TextBlock({\r
                  font: 'bold 10pt sans-serif',\r
                  margin: new go.Margin(0, 0, 5, 0)\r
                })\r
                .bind('text'),\r
              new go.Shape({ name: 'BODY', opacity: 0 })\r
            )\r
        )\r
    );\r
\r
    // replace the default Link template in the linkTemplateMap\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 10 })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'Standard', stroke: null })\r
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
\r
    // make sure all data have up-to-date "members" collections\r
    // this does not prevent any "cycles" of membership, which would result in undefined behavior\r
    const arr = myDiagram.model.nodeDataArray;\r
    for (let i = 0; i < arr.length; i++) {\r
      const data = arr[i];\r
      const supers = data.supers;\r
      if (supers) {\r
        for (let j = 0; j < supers.length; j++) {\r
          const sdata = myDiagram.model.findNodeDataForKey(supers[j]);\r
          if (sdata) {\r
            // update _supers to be an Array of references to node data\r
            if (!data._supers) {\r
              data._supers = [sdata];\r
            } else {\r
              data._supers.push(sdata);\r
            }\r
            // update _members to be an Array of references to node data\r
            if (!sdata._members) {\r
              sdata._members = [data];\r
            } else {\r
              sdata._members.push(data);\r
            }\r
          }\r
        }\r
      }\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This demonstrates the ability to simulate having nodes be members of multiple "groups". Regular <a>Group</a>s only support a single\r
    <a>Part.containingGroup</a> for nodes. This sample does not make use of <a>Group</a>s at all, but simulates one possible "grouping" relationship using a\r
    custom <a>Layout</a> and a custom <a>DraggingTool</a>.\r
  </p>\r
  <p>\r
    The CustomLayout assumes regular nodes already have real locations, and only\r
    assigns <a>Part.location</a> to "Super" nodes. These are the nodes that\r
    represent <a>Group</a>s. It also sets the <a>GraphObject.desiredSize</a> on\r
    the "BODY" element of each "Super" node, based on the area occupied by all\r
    of its member nodes. The CustomDraggingTool overrides the\r
    <a>DraggingTool.computeEffectiveCollection</a> method to determine what\r
    nodes to drag around.\r
  </p>\r
  <p>This sample does not support dynamic restructuring of the relationships in the graph.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`customlayout`,`groups`,`tools`];var g=y();l(`1ulzg8w`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};