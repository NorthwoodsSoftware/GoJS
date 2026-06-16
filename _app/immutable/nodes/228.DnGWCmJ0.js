import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Regrouping Editor for Dragging Nodes into and out of Groups`,titleShort:`Regrouping Editor`,indexDescription:`Allows the user to drag nodes, including groups, into and out of groups, both from the Palette as
well as from within the Diagram.`,screenshot:`regrouping`,priority:1,tags:[`gridlayout`,`groups`,`palette`,`buttons`],description:`Create new collapsible groups, ungroup existing groups, and use drag-and-drop to change grouping
memberships.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myPaletteDiv" style="width: 130px; margin-right: 2px; background-color: #dfebe5; border: solid 1px black">\r
    </div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 500px; background-color: #dfebe5; border: solid 1px black">\r
    </div>\r
  </div>\r
  <p>\r
    The slider controls how many nested levels of Groups are expanded. </br>\r
    Semantic zoom level: <input id="levelSlider" type="range" min="0" max="5" />\r
  </p>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width:100%;height:300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":1, "isGroup":true, "text":"Main 1", "horiz":true},\r
{"key":2, "isGroup":true, "text":"Main 2", "horiz":true},\r
{"key":3, "isGroup":true, "text":"Group A", "group":1},\r
{"key":4, "isGroup":true, "text":"Group B", "group":1},\r
{"key":5, "isGroup":true, "text":"Group C", "group":2},\r
{"key":6, "isGroup":true, "text":"Group D", "group":2},\r
{"key":7, "isGroup":true, "text":"Group E", "group":6},\r
{"text":"First A", "group":3, "key":-7},\r
{"text":"Second A", "group":3, "key":-8},\r
{"text":"First B", "group":4, "key":-9},\r
{"text":"Second B", "group":4, "key":-10},\r
{"text":"Third B", "group":4, "key":-11},\r
{"text":"First C", "group":5, "key":-12},\r
{"text":"Second C", "group":5, "key":-13},\r
{"text":"First D", "group":6, "key":-14},\r
{"text":"First E", "group":7, "key":-15}\r
 ],\r
  "linkDataArray": [  ]}\r
  </textarea>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'InitialLayoutCompleted': e => updateTotalGroupDepth(),\r
      // when a drag-drop occurs in the Diagram's background, make it a top-level node\r
      mouseDrop: e => finishDrop(e, null),\r
      layout: new go.GridLayout({ // Diagram has simple horizontal layout\r
        wrappingWidth: Infinity,\r
        alignment: go.GridAlignment.Position,\r
        cellSize: new go.Size(1, 1)\r
      }),\r
      'commandHandler.archetypeGroupData': { isGroup: true, text: 'Group', horiz: false },\r
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
    const colors = {\r
      white: '#fffcf6',\r
      blue: '#dfebe5',\r
      darkblue: '#cae0d8',\r
      yellow: '#fcdba2',\r
      gray: '#59524c',\r
      black: '#000000'\r
    }\r
\r
    // The one template for Groups can be configured to either layout out its members\r
    // horizontally or vertically, each with a different default color.\r
\r
    function makeLayout(horiz) {  // a Binding conversion function\r
      return new go.GridLayout({\r
        wrappingColumn: horiz ? Infinity : 1,\r
        alignment: go.GridAlignment.Position,\r
        cellSize: new go.Size(1, 1),\r
        spacing: horiz ? new go.Size(8, 8) : new go.Size(5, 5)\r
      });\r
    }\r
\r
    function defaultColor(horiz) {  // a Binding conversion function\r
      return horiz ? colors.white : colors.darkblue;\r
    }\r
\r
    // this function is used to highlight a Group that the selection may be dropped into\r
    function highlightGroup(e, grp, show) {\r
      if (!grp) return;\r
      e.handled = true;\r
      if (show) {\r
        // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;\r
        // instead depend on the DraggingTool.draggedParts or .copiedParts\r
        var tool = grp.diagram.toolManager.draggingTool;\r
        var map = tool.draggedParts || tool.copiedParts;  // this is a Map\r
        // now we can check to see if the Group will accept membership of the dragged Parts\r
        if (grp.canAddMembers(map.toKeySet())) {\r
          grp.isHighlighted = true;\r
          return;\r
        }\r
      }\r
      grp.isHighlighted = false;\r
    }\r
\r
    // Upon a drop onto a Group, we try to add the selection as members of the Group.\r
    // Upon a drop onto the background, or onto a top-level Node, make selection top-level.\r
    // If this is OK, we're done; otherwise we cancel the operation to rollback everything.\r
    function finishDrop(e, grp) {\r
      var ok = (grp !== null\r
        ? grp.addMembers(grp.diagram.selection, true)\r
        : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));\r
      if (!ok) e.diagram.currentTool.doCancel();\r
\r
      const slider = document.getElementById('levelSlider');\r
      const oldMax = parseInt(slider.max);\r
\r
      updateTotalGroupDepth();\r
\r
      const newMax = parseInt(slider.max);\r
      // keep the slider value accurate to the current depth\r
      slider.value = parseInt(slider.value) +  newMax - oldMax;\r
    }\r
\r
    myDiagram.groupTemplate =\r
      new go.Group('Auto', {\r
          ungroupable: true,  // allow the user to remove the Group while keeping its members\r
          // when selected, move the whole Group into the "Foreground" Layer\r
          selectionChanged: g => {\r
            const newlay = g.isSelected ? "Foreground" : "";\r
            g.layerName = newlay;\r
            g.findSubGraphParts().each(m => m.layerName = newlay);\r
          },\r
          // highlight when dragging into the Group\r
          mouseDragEnter: (e, grp, prev) => highlightGroup(e, grp, true),\r
          mouseDragLeave: (e, grp, next) => highlightGroup(e, grp, false),\r
          computesBoundsAfterDrag: true,  // don't stretch the Placeholder while dragging\r
          computesBoundsIncludingLocation: true,\r
          // when the selection is dropped into a Group, add the selected Parts into that Group;\r
          // if it fails, cancel the tool, rolling back any changes\r
          mouseDrop: finishDrop,\r
          handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links\r
          // Groups containing Groups lay out their members horizontally\r
          layout: makeLayout(false),\r
          background: defaultColor(false) // default value if not specified in data\r
        })\r
        .bind('background', 'horiz', defaultColor)\r
        .bind('layout', 'horiz', makeLayout)\r
        .add(\r
          new go.Shape('Rectangle', { stroke: colors.gray, strokeWidth: 1 })\r
            .bindObject('fill', 'isHighlighted', h => h ? 'rgba(0,255,0,.3)' : 'transparent'),\r
          new go.Panel('Vertical')  // title above Placeholder\r
            .add(\r
              new go.Panel('Horizontal', { stretch: go.Stretch.Horizontal }) // button next to TextBlock\r
                .add(\r
                  go.GraphObject.build('SubGraphExpanderButton', { alignment: go.Spot.Right, margin: 5 }),\r
                  new go.TextBlock({\r
                      alignment: go.Spot.Left,\r
                      editable: true,\r
                      margin: new go.Margin(6, 10, 6, 1),\r
                      font: 'bold 16px Lora, serif',\r
                      opacity: 0.95,  // allow some color to show through\r
                      stroke: colors.black\r
                    })\r
                    .bind('font', 'horiz', horiz => horiz ? 'bold 20px Lora, serif' : 'bold 16px Lora, serif')\r
                    .bindTwoWay('text')\r
                ),  // end Horizontal Panel\r
              new go.Placeholder({ padding: 8, margin: 4, alignment: go.Spot.TopLeft })\r
            )  // end Vertical Panel\r
        )  // end Auto Panel\r
\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          // dropping on a Node is the same as dropping on its containing Group, even if it's top-level\r
          mouseDrop: (e, node) => finishDrop(e, node.containingGroup),\r
          isShadowed: true,\r
          shadowBlur: 0,\r
          shadowColor: colors.gray,\r
          shadowOffset: new go.Point(4.5, 3.5)\r
        })\r
        .add(\r
          new go.Shape('RoundedRectangle', { fill: colors.yellow, stroke: null, strokeWidth: 0 }),\r
          new go.TextBlock({\r
              margin: 8,\r
              editable: true,\r
              font: '13px Lora, serif'\r
            })\r
            .bindTwoWay('text')\r
        );\r
\r
    // initialize the Palette and its contents\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplateMap: myDiagram.nodeTemplateMap,\r
      groupTemplateMap: myDiagram.groupTemplateMap\r
    });\r
\r
    myPalette.model = new go.GraphLinksModel([\r
      { text: 'New Node', color: '#ACE600' },\r
      { isGroup: true, text: 'H Group', horiz: true },\r
      { isGroup: true, text: 'V Group', horiz: false }\r
    ]);\r
\r
    var slider = document.getElementById('levelSlider');\r
    slider.addEventListener('change', reexpand);\r
    slider.addEventListener('input', reexpand);\r
\r
    load();\r
  }\r
\r
  function reexpand(e) {\r
    myDiagram.commit(diag => {\r
      var level = parseInt(document.getElementById('levelSlider').value);\r
      diag.findTopLevelGroups().each(g => expandGroups(g, 0, level))\r
    }, 'reexpand');\r
  }\r
  function expandGroups(g, i, level) {\r
    if (!(g instanceof go.Group)) return;\r
    g.isSubGraphExpanded = i < level;\r
    g.memberParts.each(m => expandGroups(m, i + 1, level))\r
  }\r
  function updateTotalGroupDepth() {\r
    let d = 0;\r
    myDiagram.findTopLevelGroups().each(g => d = Math.max(d, groupDepth(g)));\r
    document.getElementById('levelSlider').max = Math.max(0, d);\r
  }\r
  function groupDepth(g) {\r
    if (!(g instanceof go.Group)) return 0;\r
    let d = 1;\r
    g.memberParts.each(m => d = Math.max(d, groupDepth(m)+1));\r
    return d;\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[`https://fonts.googleapis.com/css2?family=Lora&display=swap`],externalScripts:[],descriptionHtml:`<p>\r
    This sample allows the user to drag nodes, including groups, into and out of groups,\r
    both from the Palette as well as from within the Diagram.\r
    See the <a href="../intro/groups">Groups learn page</a> for an explanation of GoJS Groups.\r
  </p>\r
  <p>\r
    Highlighting to show feedback about potential addition to a group during a drag is implemented\r
    using <a>GraphObject.mouseDragEnter</a> and <a>GraphObject.mouseDragLeave</a> event handlers.\r
    Because <a>Group.computesBoundsAfterDrag</a> is true, the Group's <a>Placeholder</a>'s bounds are\r
    not computed until the drop happens, so the group does not continuously expand as the user drags\r
    a member of a group.\r
  </p>\r
  <p>\r
    When a drop occurs on a Group or a regular Node, the <a>GraphObject.mouseDrop</a> event handler\r
    adds the selection (the dragged Nodes) to the Group as new members.\r
    The <a>Diagram.mouseDrop</a> event handler changes the dragged selected Nodes to be top-level,\r
    rather than members of whatever Groups they had been in.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gridlayout`,`groups`,`palette`,`buttons`];var g=y();l(`1w1b0s5`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};