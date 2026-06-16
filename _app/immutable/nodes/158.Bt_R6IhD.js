import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Drag and Drop From HTML Element to Diagram`,indexDescription:`Demonstrates dragging and dropping from HTML, and pasting from the external clipboard.`,screenshot:`htmldragdrop`,priority:2,tags:[`palette`,`html`,`commands`],description:`Use HTML drag-and-drop to implement dragging HTML elements onto a GoJS Diagram to create new nodes. Also demonstrates pasting from the external clipboard.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div\r
      id="paletteZone"\r
      style="\r
        width: 160px;\r
        height: 400px;\r
        margin-right: 2px;\r
        background-color: lightblue;\r
        padding: 10px;\r
      ">\r
      <div class="draggable" draggable="true">Water</div>\r
      <div class="draggable" draggable="true">Coffee</div>\r
      <div class="draggable" draggable="true">Tea</div>\r
    </div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 400px; border: solid 1px black"></div>\r
  </div>\r
  <input id="removeCheckBox" type="checkbox" /><label for="removeCheckBox"\r
    >Remove HTML item after drop</label\r
  >`,jsCode:`// *********************************************************\r
  // First, set up the infrastructure to do HTML drag-and-drop\r
  // *********************************************************\r
\r
  function init() {\r
    let dragged = null; // A reference to the element currently being dragged\r
\r
    // This event should only fire on the drag targets.\r
    // Instead of finding every drag target,\r
    // we can add the event to the document and disregard\r
    // all elements that are not of class "draggable"\r
    document.addEventListener('dragstart',\r
      event => {\r
        if (event.target.className !== 'draggable') return;\r
        // Some data must be set to allow drag\r
        event.dataTransfer.setData('text', event.target.textContent);\r
\r
        // store a reference to the dragged element and the offset of the mouse from the center of the element\r
        dragged = event.target;\r
        dragged.offsetX = event.offsetX - dragged.clientWidth / 2;\r
        dragged.offsetY = event.offsetY - dragged.clientHeight / 2;\r
        // Objects during drag will have a red border\r
        event.target.style.border = '2px solid red';\r
      },\r
      false\r
    );\r
\r
    // This event resets styles after a drag has completed (successfully or not)\r
    document.addEventListener('dragend',\r
      event => {\r
        // reset the border of the dragged element\r
        dragged.style.border = '';\r
        onHighlight(null);\r
      },\r
      false\r
    );\r
\r
    // Next, events intended for the drop target - the Diagram div\r
\r
    const div = document.getElementById('myDiagramDiv');\r
    div.addEventListener('dragenter',\r
      event => {\r
        // Here you could also set effects on the Diagram,\r
        // such as changing the background color to indicate an acceptable drop zone\r
\r
        // Requirement in some browsers, such as Internet Explorer\r
        event.preventDefault();\r
      },\r
      false\r
    );\r
\r
    div.addEventListener('dragover',\r
      event => {\r
        // We call preventDefault to allow a drop\r
        // But on divs that already contain an element,\r
        // we want to disallow dropping\r
\r
        if (div === myDiagram.div) {\r
          const can = event.target;\r
          const pixelratio = myDiagram.computePixelRatio();\r
\r
          // if the target is not the canvas, we may have trouble, so just quit:\r
          if (!(can instanceof HTMLCanvasElement)) return;\r
\r
          const bbox = can.getBoundingClientRect();\r
          let bbw = bbox.width;\r
          if (bbw === 0) bbw = 0.001;\r
          let bbh = bbox.height;\r
          if (bbh === 0) bbh = 0.001;\r
          const mx = event.clientX - bbox.left * (can.width / pixelratio / bbw);\r
          const my = event.clientY - bbox.top * (can.height / pixelratio / bbh);\r
          const point = myDiagram.transformViewToDoc(new go.Point(mx, my));\r
          const part = myDiagram.findPartAt(point, true);\r
          onHighlight(part);\r
        }\r
\r
        if (event.target.className === 'dropzone') {\r
          // Disallow a drop by returning before a call to preventDefault:\r
          return;\r
        }\r
\r
        // Allow a drop on everything else\r
        event.preventDefault();\r
      },\r
      false\r
    );\r
\r
    div.addEventListener('dragleave',\r
      event => {\r
        // reset background of potential drop target\r
        if (event.target.className == 'dropzone') {\r
          event.target.style.background = '';\r
        }\r
        onHighlight(null);\r
      },\r
      false\r
    );\r
\r
    div.addEventListener('drop',\r
      event => {\r
        // prevent default action\r
        // (open as link for some elements in some browsers)\r
        event.preventDefault();\r
\r
        // Dragging onto a Diagram\r
        if (div === myDiagram.div) {\r
          const can = event.target;\r
          const pixelratio = myDiagram.computePixelRatio();\r
\r
          // if the target is not the canvas, we may have trouble, so just quit:\r
          if (!(can instanceof HTMLCanvasElement)) return;\r
\r
          const bbox = can.getBoundingClientRect();\r
          let bbw = bbox.width;\r
          if (bbw === 0) bbw = 0.001;\r
          let bbh = bbox.height;\r
          if (bbh === 0) bbh = 0.001;\r
          const mx = event.clientX - bbox.left * (can.width / pixelratio / bbw);\r
          const my = event.clientY - bbox.top * (can.height / pixelratio / bbh);\r
          const point = myDiagram.transformViewToDoc(new go.Point(mx, my));\r
          // // if there's nothing at that point\r
          // if (myDiagram.findPartAt(point) === null) {\r
          //   // a return here doesn't allow the drop to happen\r
          //   return;\r
          // }\r
          // otherwise create a new node at the drop point\r
          myDiagram.startTransaction('new node');\r
          const newdata = {\r
            // assuming the locationSpot is Spot.Center:\r
            location: myDiagram.transformViewToDoc(\r
              new go.Point(mx - dragged.offsetX, my - dragged.offsetY)\r
            ),\r
            text: event.dataTransfer.getData('text'),\r
            color: 'lightyellow'\r
          };\r
          myDiagram.model.addNodeData(newdata);\r
          const newnode = myDiagram.findNodeForData(newdata);\r
          if (newnode) {\r
            newnode.ensureBounds();\r
            myDiagram.select(newnode);\r
            onDrop(newnode, point);\r
          }\r
          myDiagram.commitTransaction('new node');\r
\r
          // remove dragged element from its old location, if checkbox is checked\r
          if (document.getElementById('removeCheckBox').checked) {\r
            dragged.parentNode.removeChild(dragged);\r
          }\r
        }\r
\r
        // If we were using drag data, we could get it here, ie:\r
        // const data = event.dataTransfer.getData('text');\r
      },\r
      false\r
    );\r
\r
    // this is called on a stationary node or link during an external drag-and-drop into a Diagram\r
    function onHighlight(part) {\r
      // may be null\r
      const oldskips = myDiagram.skipsUndoManager;\r
      myDiagram.skipsUndoManager = true;\r
      myDiagram.startTransaction('highlight');\r
      if (part !== null) {\r
        myDiagram.highlight(part);\r
      } else {\r
        myDiagram.clearHighlighteds();\r
      }\r
      myDiagram.commitTransaction('highlight');\r
      myDiagram.skipsUndoManager = oldskips;\r
    }\r
\r
    // this is called upon an external drop in this diagram,\r
    // after a new node has been created and selected\r
    function onDrop(newNode, point) {\r
      // look for a drop directly onto a Node or Link\r
      const it = myDiagram.findPartsAt(point).iterator;\r
      while (it.next()) {\r
        const part = it.value;\r
        if (part === newNode) continue;\r
        // the drop happened on some Part -- call its mouseDrop handler\r
        if (part && part.mouseDrop) {\r
          const e = new go.InputEvent();\r
          e.diagram = myDiagram;\r
          e.documentPoint = point;\r
          e.viewPoint = myDiagram.transformDocToView(point);\r
          e.up = true;\r
          myDiagram.lastInput = e;\r
          // should be running in a transaction already\r
          part.mouseDrop(e, part);\r
          return;\r
        }\r
      }\r
      // didn't find anything to drop onto\r
    }\r
\r
    // *****************************\r
    // Second, set up a GoJS Diagram\r
    // *****************************\r
\r
    const myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.TreeLayout(),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // define a Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          // on mouse-over, highlight the node\r
          mouseDragEnter: (e, node) => (node.isHighlighted = true),\r
          mouseDragLeave: (e, node) => (node.isHighlighted = false),\r
          // on a mouse-drop add a link from the dropped-upon node to the new node\r
          mouseDrop: (e, node) => {\r
            const newnode = e.diagram.selection.first();\r
            if (!mayConnect(node, newnode)) return;\r
            const incoming = newnode.findLinksInto().first();\r
            if (incoming) e.diagram.remove(incoming);\r
            e.diagram.model.addLinkData({ from: node.key, to: newnode.key });\r
          }\r
        })\r
        .bind('location')\r
        .add(\r
          new go.Shape('Rectangle', { fill: 'white' })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color')\r
            // this binding changes the Shape.fill when Node.isHighlighted changes value\r
            .bindObject('fill', 'isHighlighted', (h, shape) => {\r
              if (h) return 'red';\r
              const c = shape.part.data.color;\r
              return c ? c : 'white';\r
            }),\r
          new go.TextBlock({ margin: 3, font: 'bold 16px sans-serif', width: 140, textAlign: 'center' })\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
        );\r
\r
    // define a Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          // on mouse-over, highlight the link\r
          mouseDragEnter: (e, link) => (link.isHighlighted = true),\r
          mouseDragLeave: (e, link) => (link.isHighlighted = false),\r
          // on a mouse-drop splice the new node in between the dropped-upon link's fromNode and toNode\r
          mouseDrop: (e, link) => {\r
            const oldto = link.toNode;\r
            const newnode = e.diagram.selection.first();\r
            if (!mayConnect(newnode, oldto)) return;\r
            if (!mayConnect(link.fromNode, newnode)) return;\r
            link.toNode = newnode;\r
            e.diagram.model.addLinkData({ from: newnode.key, to: oldto.key });\r
          }\r
        })\r
        .add(\r
          // two path Shapes: the transparent one becomes visible during mouse-over\r
          new go.Shape({ isPanelMain: true, strokeWidth: 6, stroke: 'transparent' })\r
            .bindObject('stroke', 'isHighlighted', h => h ? 'red' : 'transparent'),\r
          new go.Shape({ isPanelMain: true, strokeWidth: 1 }),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    // Decide whether a link from node1 to node2 may be created by a drop operation\r
    function mayConnect(node1, node2) {\r
      return node1 !== node2;\r
    }\r
\r
    // Modify the CommandHandler's doKeyDown to do nothing except bubble the event\r
    // on a potential Paste command:\r
    myDiagram.commandHandler.doKeyDown = function () {\r
      // method override must be function, not =>\r
      const diagram = this.diagram;\r
      const e = diagram.lastInput;\r
      // The meta (Command) key substitutes for "control" for Mac commands\r
      const control = e.meta || e.control;\r
      const shift = e.shift;\r
      const k = e.commandKey;\r
      if (((control && k === 'v') || (shift && k === 'Insert')) &&\r
          (!diagram.commandHandler.canPasteSelection() || diagram.selection.count === 0)) {\r
        // Instead of the usual behavior:\r
        // if (this.canPasteSelection()) this.pasteSelection();\r
        // let the event bubble up the DOM:\r
        e.bubbles = true;\r
      } else {\r
        go.CommandHandler.prototype.doKeyDown.call(this);\r
      }\r
    };\r
\r
    // handle inserting a new node using text that is in the system clipboard\r
    document.addEventListener('paste', e => {\r
      const paste = e.clipboardData.getData('text');\r
      // Decide if the clipboard should be pasted, or if we should let GoJS paste\r
      // This sample pastes from the clipboard if it contains any text at all,\r
      // Otherwise, it pastes from GoJS\r
      if (paste.length > 0) {\r
        // Create a new node out of the text and paste it at the mouse location\r
        const loc = myDiagram.lastInput.documentPoint;\r
        const newdata = { text: paste, location: loc };\r
        myDiagram.model.addNodeData(newdata);\r
        const newnode = myDiagram.findNodeForData(newdata);\r
        if (newnode) myDiagram.select(newnode);\r
        // clear the GoJS clipboard\r
        myDiagram.commandHandler.copyToClipboard(null);\r
      } else {\r
        // If the clipbooard does not contain anything, paste from GoJS instead\r
        const commandHandler = myDiagram.commandHandler;\r
        if (commandHandler.canPasteSelection()) commandHandler.pasteSelection();\r
      }\r
    });\r
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
        { from: 1, to: 3 }\r
      ]\r
    );\r
  }\r
  init();`,cssCode:`.draggable {\r
    font: bold 16px sans-serif;\r
    width: 140px;\r
    height: 20px;\r
    text-align: center;\r
    background: white;\r
    cursor: move;\r
    margin-top: 20px;\r
  }\r
\r
  .palettezone {\r
    width: 160px;\r
    height: 400px;\r
    background: lightblue;\r
    padding: 10px;\r
    padding-top: 1px;\r
    float: left;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    The "Palette" in this sample is not a <a>Palette</a> (or GoJS component) at all. It is a\r
    collection of HTML elements with draggable attributes using the\r
    <a href="https://developer.mozilla.org/en-US/docs/DragDrop/Drag_and_Drop"\r
      >HTML Drag and Drop API</a\r
    >.\r
  </p>\r
  <p>\r
    This sample lets you drag these HTML elements onto the Diagram to create GoJS nodes. As the\r
    mouse passes over stationary nodes or links in the Diagram, they are highlighted.\r
  </p>\r
  <p>\r
    If a drop happens (based on the mouse point) on an existing node, a new link is also drawn from\r
    that existing node to the newly dropped node. If a drop happens on an existing link, the link is\r
    reconnected to go to the newly dropped node, and a new link is added to go from that newly\r
    dropped node to whatever node the link had been connected to before.\r
  </p>\r
  <p>\r
    This sample also demonstrates allowing external clipboard pasting, by modifying\r
    <code>myDiagram.commandHandler.doKeyDown</code> to do nothing but allow the event to bubble, and\r
    then defining a <code>"paste"</code> event on the <code>document</code>. So the user can select\r
    some text, either on the page or in some other app, and then a paste in the diagram will create\r
    a new node using that text.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`palette`,`html`,`commands`];var g=y();l(`1mq6dpb`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};