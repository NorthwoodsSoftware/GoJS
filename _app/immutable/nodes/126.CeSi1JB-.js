import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Drag and Drop Fields Between Nodes`,indexDescription:`Drag and drop fields from/to record Nodes.`,screenshot:`records`,priority:2,tags:[`tables`,`itemarrays`,`collections`,`tools`],description:`Drag and drop items between nodes.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 300px"></div>\r
  <p>The model data, automatically updated after each change or undo or redo:</p>\r
  <pre class="lang-js" style="max-height: 300px"><code id="mySavedModel"></code></pre>`,jsCode:`// Custom DraggingTool for dragging fields instead of whole Parts.\r
  // FieldDraggingTool.fieldTemplate needs to be set to a template of the field that you want shown while dragging.\r
  class FieldDraggingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      this.fieldTemplate = null; // THIS NEEDS TO BE SET before a drag starts\r
      this.temporaryPart = null;\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // override this method\r
    findDraggablePart() {\r
      const diagram = this.diagram;\r
      let obj = diagram.findObjectAt(diagram.lastInput.documentPoint);\r
      while (obj !== null && obj.type !== go.Panel.TableRow) obj = obj.panel;\r
      if (obj !== null && obj.type === go.Panel.TableRow && this.fieldTemplate !== null && this.temporaryPart === null) {\r
        const tempPart =\r
          new go.Part('Table', { layerName: 'Tool', locationSpot: go.Spot.Center })\r
            .add(this.fieldTemplate.copy()); // copy the template!\r
        this.temporaryPart = tempPart;\r
        // assume OBJ is now a Panel representing a field, bound to field data\r
        // update the temporary Part via data binding\r
        tempPart.location = diagram.lastInput.documentPoint; // need to set location explicitly\r
        diagram.add(tempPart); // add to Diagram before setting data\r
        tempPart.data = obj.data; // bind to the same field data as being dragged\r
        return tempPart;\r
      }\r
      return super.findDraggablePart();\r
    }\r
\r
    doActivate() {\r
      if (this.temporaryPart === null) return super.doActivate();\r
      const diagram = this.diagram;\r
      this.standardMouseSelect();\r
      this.isActive = true;\r
      // instead of the usual result of computeEffectiveCollection, just use the temporaryPart alone\r
      const map = new go.Map(/*go.Part, go.DraggingInfo*/);\r
      map.set(this.temporaryPart, new go.DraggingInfo(diagram.lastInput.documentPoint.copy()));\r
      this.draggedParts = map;\r
      this.startTransaction('Drag Field');\r
      diagram.isMouseCaptured = true;\r
    }\r
\r
    doDeactivate() {\r
      if (this.temporaryPart === null) return super.doDeactivate();\r
      const diagram = this.diagram;\r
      // make sure the temporary Part is no longer in the Diagram\r
      diagram.remove(this.temporaryPart);\r
      this.temporaryPart = null;\r
      // now do all the standard deactivation cleanup,\r
      // including setting isActive = false, clearing out draggedParts, calling stopTransaction(),\r
      // and setting diagram.isMouseCaptured = false\r
      super.doDeactivate();\r
    }\r
\r
    doMouseMove() {\r
      if (!this.isActive) return;\r
      if (this.temporaryPart === null) return super.doMouseMove();\r
      const diagram = this.diagram;\r
      // just move the temporaryPart (in draggedParts), without regard to moving or copying permissions of the Node\r
      const offset = diagram.lastInput.documentPoint.copy().subtract(diagram.firstInput.documentPoint);\r
      this.moveParts(this.draggedParts, offset, false);\r
    }\r
\r
    doMouseUp() {\r
      if (!this.isActive) return;\r
      if (this.temporaryPart === null) return super.doMouseUp();\r
      const diagram = this.diagram;\r
      const data = this.temporaryPart.data;\r
      const dest = diagram.findPartAt(diagram.lastInput.documentPoint, false);\r
      if (dest !== null && dest.data && dest.data.fields) {\r
        const panel = dest.findObject('TABLE');\r
        const idx = panel.findRowForLocalY(panel.getLocalPoint(diagram.lastInput.documentPoint).y);\r
        diagram.model.insertArrayItem(dest.data.fields, idx + 1, { name: data.name, info: data.info, color: data.color, figure: data.figure });\r
      }\r
      const src = this.currentPart;\r
      // whether or not there was a destination node, delete the original field\r
      if (!(diagram.lastInput.control || diagram.lastInput.meta)) {\r
        const sidx = src.data.fields.indexOf(data);\r
        if (sidx >= 0) {\r
          diagram.model.removeArrayItem(src.data.fields, sidx);\r
        }\r
      }\r
      this.transactionResult = 'Dragged Field';\r
      this.stopTool();\r
    }\r
  }\r
  // end of FieldDraggingTool\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      validCycle: go.CycleMode.NotDirected, // don't allow loops\r
      draggingTool: new FieldDraggingTool(), // use custom DraggingTool\r
      // automatically update the model that is shown on this page\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) showModel();\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // This template is a Panel that is used to represent each item in a Panel.itemArray.\r
    // The Panel is data bound to the item object.\r
    // This template needs to be used by the FieldDraggingTool as well as the Diagram.nodeTemplate.\r
    const fieldTemplate =\r
      new go.Panel('TableRow', {\r
          background: 'transparent', // so this port's background can be picked by the mouse\r
          fromSpot: go.Spot.Right, // links only go from the right side to the left side\r
          toSpot: go.Spot.Left\r
        }) // allow drawing links from or to this port\r
        // this Panel is a row in the containing Table\r
        .bind('portId', 'name') // this Panel is a "port"\r
        .add(\r
          new go.Shape({ width: 12, height: 12, column: 0, strokeWidth: 2, margin: 4 })\r
            .bind('figure')\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              margin: new go.Margin(0, 2),\r
              column: 1,\r
              font: 'bold 13px sans-serif'\r
            })\r
            .bind('text', 'name'),\r
          new go.TextBlock({\r
              margin: new go.Margin(0, 2),\r
              column: 2,\r
              font: '13px sans-serif'\r
            })\r
            .bind('text', 'info')\r
        );\r
\r
    // the FieldDraggingTool needs a template for what to show while dragging\r
    myDiagram.toolManager.draggingTool.fieldTemplate = fieldTemplate;\r
\r
    // This template represents a whole "record".\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          movable: false,\r
          copyable: false,\r
          deletable: false,\r
          locationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // this rectangular shape surrounds the content of the node\r
          new go.Shape({ fill: '#EEEEEE' }),\r
          // the content consists of a header and a list of items\r
          new go.Panel('Vertical')\r
            .add(\r
              // this is the header for the whole node\r
              new go.Panel('Auto', { stretch: go.Stretch.Horizontal }) // as wide as the whole node\r
                .add(\r
                  new go.Shape({\r
                    fill: '#1570A6',\r
                    stroke: null\r
                  }),\r
                  new go.TextBlock({\r
                      alignment: go.Spot.Center,\r
                      margin: 3,\r
                      stroke: 'white',\r
                      textAlign: 'center',\r
                      font: 'bold 12pt sans-serif'\r
                    })\r
                    .bind('text', 'title')\r
                ),\r
              // this Panel holds a Panel for each item object in the itemArray;\r
              // each item Panel is defined by the itemTemplate to be a TableRow in this Table\r
              new go.Panel('Table', {\r
                  name: 'TABLE',\r
                  padding: 2,\r
                  minSize: new go.Size(100, 10),\r
                  defaultStretch: go.Stretch.Horizontal,\r
                  itemTemplate: fieldTemplate\r
                })\r
                .bind('itemArray', 'fields')\r
            ) // end Table Panel of items\r
        ); // end Vertical Panel\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      linkFromPortIdProperty: 'fromPort',\r
      linkToPortIdProperty: 'toPort',\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          key: 1,\r
          title: 'Record1',\r
          fields: [\r
            { name: 'field1', info: '', color: '#F7B84B', figure: 'Ellipse' },\r
            { name: 'field2', info: 'the second one', color: '#F25022', figure: 'Ellipse' },\r
            { name: 'fieldThree', info: '3rd', color: '#00BCF2' }\r
          ],\r
          loc: '0 0'\r
        },\r
        {\r
          key: 2,\r
          title: 'Record2',\r
          fields: [{ name: 'fieldA', info: '', color: '#FFB900', figure: 'Diamond' }],\r
          loc: '250 0'\r
        }\r
      ]\r
    });\r
\r
    showModel(); // show the diagram's initial model\r
\r
    function showModel() {\r
      document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Drag fields between records to move them; dragging within the same node can reorder them. Fields can be copied when holding down the control key; they are\r
    deleted when dropped in the diagram's background. The "record" Nodes are not movable or copyable or deletable.\r
  </p>\r
  <p>\r
    See also <a href="../samples/dragOutFields">Drag Out Fields</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`collections`,`tools`];var g=y();l(`1dkwwov`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};