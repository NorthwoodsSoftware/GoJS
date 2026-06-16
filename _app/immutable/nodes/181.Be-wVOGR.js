import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Macros -- Automatic Ungrouping of Dropped Elements`,titleShort:`Macros from Palette`,indexDescription:`Demonstrates an automatic ungrouping of nodes when dropping an element on the diagram.`,screenshot:`macros`,priority:2,tags:[`groups`,`palette`],description:`Automatically start editing dropped nodes and ungroup dropped groups to create subgraphs.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myPaletteDiv" style="width: 135px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 500px; border: solid 1px black"></div>\r
  </div>\r
  Diagram Model saved in JSON format:\r
  <br />\r
  <pre class="lang-js" style="max-height: 300px"><code id="mySavedModel"></code></pre>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // automatically show the state of the diagram's model on the page in a PRE element\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) {\r
          document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
        }\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // define the Node template for regular nodes\r
    myDiagram.nodeTemplateMap.add('', // the default category\r
      new go.Node('Auto')\r
        // The Node.location comes from the "loc" property of the node data,\r
        // converted by the Point.parse method.\r
        // If the Node.location is changed, it updates the "loc" property of the node data,\r
        // converting back using the Point.stringify method.\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // the main object is a Panel that surrounds a TextBlock with a rectangular Shape\r
          new go.Shape({\r
              figure: 'Rectangle',\r
              fill: 'white',\r
              strokeWidth: 2,\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true,\r
              cursor: 'pointer'\r
            })\r
            .bind('stroke', 'color'),\r
          new go.TextBlock({\r
              maxSize: new go.Size(150, NaN),\r
              textAlign: 'center',\r
              margin: 6,\r
              editable: true,\r
              name: 'TEXT',\r
              font: '16pt Helvetica, Arial, sans-serif'\r
            })\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    myDiagram.groupTemplate =\r
      new go.Group('Auto', {\r
          isSubGraphExpanded: false, // only show the Group itself, not any of its members\r
          ungroupable: true\r
        }) // allow the ExternalObjectsDropped event handler to ungroup\r
        .add(\r
          // the members to be top-level parts, via a command\r
          new go.Shape('Rectangle', { // the rectangular shape around the members\r
            fill: 'rgba(128,128,128,0.2)', stroke: 'gray', strokeWidth: 3\r
          }),\r
          new go.Placeholder({ alignment: go.Spot.TopLeft }),\r
          new go.TextBlock({ font: 'bold 16pt Helvetica, Arial, sans-serif', margin: 10 })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link()\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'Standard', stroke: null })\r
        );\r
\r
    // this DiagramEvent is raised when the user has drag-and-dropped something\r
    // from another Diagram (a Palette in this case) into this Diagram\r
    myDiagram.addDiagramListener('ExternalObjectsDropped', e => {\r
      // stop any ongoing text editing\r
      if (myDiagram.currentTool instanceof go.TextEditingTool) {\r
        myDiagram.currentTool.acceptText(go.TextEditingAccept.LostFocus);\r
      }\r
      // expand any "macros"\r
      myDiagram.commandHandler.ungroupSelection();\r
      // start editing the first node that was dropped after ungrouping\r
      var tb = myDiagram.selection.first().findObject('TEXT');\r
      if (tb) myDiagram.commandHandler.editTextBlock(tb);\r
    });\r
\r
    // initialize the Palette that is on the left side of the page\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplateMap: myDiagram.nodeTemplateMap,\r
      groupTemplateMap: myDiagram.groupTemplateMap\r
    });\r
\r
    myPalette.model = new go.GraphLinksModel(\r
      [\r
        // a regular node\r
        { key: 'B', text: 'some block', color: 'blue' },\r
        // a group node, plus three member nodes in that group\r
        { key: 'G', text: 'Macro', isGroup: true },\r
        { key: 'Ga', text: 'A block', color: 'green', group: 'G', loc: '0 0' },\r
        { key: 'Gb', text: 'B block', color: 'orange', group: 'G', loc: '150 25' },\r
        { key: 'Gc', text: 'C block', color: 'red', group: 'G', loc: '50 100' }\r
      ],\r
      [\r
        { from: 'Ga', to: 'Gb' },\r
        { from: 'Ga', to: 'Gc' },\r
        { from: 'Gb', to: 'Gc' }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    When one drags the "Macro" node (actually a <a>Group</a>) from the Palette into the main Diagram, the "ExternalObjectsDropped" <a>DiagramEvent</a> listener\r
    automatically ungroups that group node to show all of its members nodes and links that were copied by the drag-and-drop.\r
  </p>\r
  <p>Note also that a drop causes the <a>TextEditingTool</a> to automatically start editing the text in the node.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`groups`,`palette`];var g=y();l(`xz98pi`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};