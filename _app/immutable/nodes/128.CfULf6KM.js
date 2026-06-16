import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Drag Fields Out of Diagram to HTML Element`,indexDescription:`Drag out fields from record Nodes to an HTML element.`,screenshot:`records`,priority:2,tags:[`tables`,`itemarrays`,`collections`,`tools`,`html`],description:`Drag an item from a node out of the diagram and onto another HTML element.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 300px"></div>\r
  <p>Drag a field from one of the record nodes and drop onto the PRE element below.</p>\r
  <p>Here you can drop a field from one of the records above:</p>\r
  <pre id="myDroppedFields" style="padding: 5px; width: 200px; height: 300px; border: dashed; font: bold 11pt sans-serif"></pre>`,jsCode:`// Custom DraggingTool for dragging fields instead of whole Parts.\r
  // FieldDraggingTool.fieldTemplate needs to be set to a template of the field that you want shown while dragging.\r
  class FieldDraggingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      this.fieldTemplate = null; // THIS NEEDS TO BE SET before a drag starts\r
      this.temporaryPart = null;\r
      this.temporaryImage = null;\r
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
          new go.Part('Table', { layerName: 'Tool', locationSpot: go.Spot.Bottom })\r
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
      if (this.temporaryImage !== null) {\r
        document.body.removeChild(this.temporaryImage);\r
        this.temporaryImage = null;\r
      }\r
      // now do all the standard deactivation cleanup,\r
      // including setting isActive = false, clearing out draggedParts, calling stopTransaction(),\r
      // and setting diagram.isMouseCaptured = false\r
      super.doDeactivate();\r
    }\r
\r
    makeImage() {\r
      if (this.temporaryPart === null) return null;\r
      const parts = new go.List();\r
      parts.add(this.temporaryPart);\r
      return this.diagram.makeImage({\r
        parts: parts,\r
        showTemporary: true,\r
        callback: img => {\r
          this.temporaryImage = img;\r
          img.style.position = 'absolute';\r
          img.style.pointerEvents = 'none';\r
          img.style.zIndex = 999;\r
          document.body.appendChild(img);\r
          this.temporaryPart.opacity = 0;\r
        }\r
      });\r
    }\r
\r
    doMouseMove() {\r
      if (!this.isActive) return;\r
      if (this.temporaryPart === null) return super.doMouseMove();\r
      const diagram = this.diagram;\r
      // just move the temporaryPart (in draggedParts), without regard to moving or copying permissions of the Node\r
      const offset = diagram.lastInput.documentPoint.copy().subtract(diagram.firstInput.documentPoint);\r
      this.moveParts(this.draggedParts, offset, false);\r
      if (diagram.viewportBounds.containsPoint(diagram.lastInput.documentPoint)) {\r
        if (this.temporaryPart.opacity != 1) {\r
          this.temporaryPart.opacity = 1;\r
          if (this.temporaryImage !== null) {\r
            document.body.removeChild(this.temporaryImage);\r
            this.temporaryImage = null;\r
          }\r
        }\r
      } else {\r
        if (this.temporaryPart.opacity === 1) {\r
          this.makeImage(); // also sets temporaryPart.opacity = 0\r
        }\r
        // move a temporary Image element instead\r
        const img = this.temporaryImage;\r
        if (img !== null) {\r
          const e = diagram.lastInput.event;\r
          img.style.left = window.scrollX + e.clientX - img.width / 2 + 'px';\r
          img.style.top = window.scrollY + e.clientY - img.height / 2 + 'px';\r
          // position the Image to be just above the mouse pointer\r
        }\r
      }\r
    }\r
\r
    doMouseUp() {\r
      if (!this.isActive) return;\r
      if (this.temporaryPart === null) return super.doMouseUp();\r
      const diagram = this.diagram;\r
      const data = this.temporaryPart.data;\r
      const input = diagram.lastInput;\r
      let id = input.event.target.id;\r
      if (input.isTouchEvent) {\r
        // Touch events always target the first object touched, we want the last.\r
        // Determine if you are using Touch or Pointer:\r
        const evt = input.event.changedTouches ? input.event.changedTouches[0] : input.event;\r
        id = document.elementFromPoint(evt.clientX, evt.clientY).id;\r
      }\r
      if (input.event && id === 'myDroppedFields') {\r
        document.getElementById('myDroppedFields').textContent += data.name + ' (' + data.info + ')\\n';\r
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
      'undoManager.isEnabled': true\r
    });\r
\r
    // This template is a Panel that is used to represent each item in a Panel.itemArray.\r
    // The Panel is data bound to the item object.\r
    const fieldTemplate =\r
      new go.Panel('TableRow', { // this Panel is a row in the containing Table\r
          background: 'transparent', // so this port's background can be picked by the mouse\r
          fromSpot: go.Spot.Right, // links only go from the right side to the left side\r
          toSpot: go.Spot.Left\r
        }) // allow drawing links from or to this port\r
        .bind('portId', 'name') // this Panel is a "port"\r
        .add(\r
          new go.Shape({ width: 12, height: 12, column: 0, strokeWidth: 2, margin: 4 })\r
            .bind('figure')\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: new go.Margin(0, 2), column: 1, font: 'bold 13px sans-serif' })\r
            .bind('text', 'name'),\r
          new go.TextBlock({ margin: new go.Margin(0, 2), column: 2, font: '13px sans-serif' })\r
            .bind('text', 'info')\r
        );\r
\r
    // the FieldDraggingTool needs a template for what to show while dragging\r
    myDiagram.toolManager.draggingTool.fieldTemplate = fieldTemplate;\r
\r
    // This template represents a whole "record".\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
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
                  new go.Shape({ fill: '#1570A6', stroke: null }),\r
                  new go.TextBlock({\r
                      alignment: go.Spot.Center,\r
                      margin: 3,\r
                      stroke: 'white',\r
                      textAlign: 'center',\r
                      font: 'bold 12pt sans-serif'\r
                    })\r
                    .bind('text', 'key')\r
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
            )\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      linkFromPortIdProperty: 'fromPort',\r
      linkToPortIdProperty: 'toPort',\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          key: 'Record1',\r
          fields: [\r
            { name: 'field1', info: '', color: '#F7B84B', figure: 'Ellipse' },\r
            { name: 'field2', info: 'the second one', color: '#F25022', figure: 'Ellipse' },\r
            { name: 'fieldThree', info: '3rd', color: '#00BCF2' }\r
          ],\r
          loc: '0 0'\r
        },\r
        {\r
          key: 'Record2',\r
          fields: [\r
            { name: 'fieldA', info: '', color: '#FFB900', figure: 'Diamond', info: 'diamond' },\r
            { name: 'fieldB', info: '', color: 'green', figure: 'Circle', info: 'circle' },\r
            { name: 'fieldC', info: '', color: 'red', figure: 'Triangle', info: 'triangle' },\r
            { name: 'fieldD', info: '', figure: 'XLine', info: 'X' }\r
          ],\r
          loc: '250 0'\r
        }\r
      ]\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    See also <a href="../samples/dragDropFields">Drag and Drop Fields</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`collections`,`tools`,`html`];var g=y();l(`u3v0co`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};