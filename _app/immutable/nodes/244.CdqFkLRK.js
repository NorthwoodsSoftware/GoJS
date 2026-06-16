import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Selectable Fields in Record Nodes`,indexDescription:`Records with fields that the user can select.`,screenshot:`selectablefields`,priority:2,tags:[`tables`,`itemarrays`,`commands`],description:`Support selecting items inside nodes.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 300px"></div>\r
  <p>The model data, automatically updated after each change or undo or redo:</p>\r
  <pre class="lang-js"><code id="mySavedModel"></code></pre>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      validCycle: go.CycleMode.NotDirected, // don't allow loops\r
      // For this sample, automatically show the state of the diagram's model on the page\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) showModel();\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
    const UnselectedBrush = 'transparent'; // item appearance, if not "selected"\r
    const SelectedBrush = 'dodgerblue'; // item appearance, if "selected"\r
\r
    function isFieldSelected(item) {\r
      return item.background !== UnselectedBrush;\r
    }\r
\r
    function setFieldSelected(item, sel) {\r
      if (sel) {\r
        item.background = SelectedBrush;\r
      } else {\r
        item.background = UnselectedBrush;\r
      }\r
    }\r
\r
    function onFieldClick(e, item) {\r
      var oldskips = item.diagram.skipsUndoManager;\r
      item.diagram.skipsUndoManager = true;\r
      if (e.control || e.meta) {\r
        setFieldSelected(item, !isFieldSelected(item));\r
        item.part.isSelected = item.panel.elements.any(isFieldSelected);\r
      } else if (e.shift) {\r
        // alternative policy: select all fields between this item and some other one??\r
        if (!isFieldSelected(item)) setFieldSelected(item, true);\r
        item.part.isSelected = true;\r
      } else {\r
        if (!isFieldSelected(item)) {\r
          // deselect all sibling items\r
          item.panel.elements.each(it => {\r
            if (it !== item) setFieldSelected(it, false);\r
          });\r
          setFieldSelected(item, true);\r
        }\r
        item.part.isSelected = true;\r
      }\r
      item.diagram.skipsUndoManager = oldskips;\r
    }\r
\r
    // This template is a Panel that is used to represent each item in a Panel.itemArray.\r
    // The Panel is data bound to the item object.\r
    var fieldTemplate =\r
      new go.Panel('TableRow', { // this Panel is a row in the containing Table\r
          background: UnselectedBrush, // so this port's background can be picked by the mouse\r
          fromSpot: go.Spot.LeftRightSides, // links only go from the right side to the left side\r
          toSpot: go.Spot.LeftRightSides,\r
          // allow drawing links from or to this port:\r
          fromLinkable: true,\r
          toLinkable: true,\r
          // select items -- the background indicates "selected" when not UnselectedBrush\r
          click: onFieldClick\r
        })\r
        .bind('portId', 'name') // this Panel is a "port"\r
        .add(\r
          new go.Shape({\r
              width: 12,\r
              height: 12,\r
              column: 0,\r
              strokeWidth: 2,\r
              margin: 4,\r
              // but disallow drawing links from or to this shape:\r
              fromLinkable: false,\r
              toLinkable: false\r
            })\r
            .bind('figure')\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              margin: new go.Margin(0, 2),\r
              column: 1,\r
              font: 'bold 13px sans-serif',\r
              // and disallow drawing links from or to this text:\r
              fromLinkable: false,\r
              toLinkable: false\r
            })\r
            .bind('text', 'name'),\r
          new go.TextBlock({ margin: new go.Margin(0, 2), column: 2, font: '13px sans-serif' })\r
            .bind('text', 'info')\r
        );\r
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
            ) // end Vertical Panel\r
        ); // end Node\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          toShortLength: 4\r
        }) // let user reconnect links\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'Standard', stroke: null })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      linkFromPortIdProperty: 'fromPort',\r
      linkToPortIdProperty: 'toPort',\r
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
            { name: 'fieldA', info: '', color: '#FFB900', figure: 'Diamond' },\r
            { name: 'fieldB', info: '', color: '#F25022', figure: 'Rectangle' },\r
            { name: 'fieldC', info: '', color: '#7FBA00', figure: 'Diamond' },\r
            { name: 'fieldD', info: 'fourth', color: '#00BCF2', figure: 'Rectangle' }\r
          ],\r
          loc: '250 0'\r
        }\r
      ],\r
      linkDataArray: [\r
        { from: 'Record1', fromPort: 'field1', to: 'Record2', toPort: 'fieldA' },\r
        { from: 'Record1', fromPort: 'field2', to: 'Record2', toPort: 'fieldD' },\r
        { from: 'Record1', fromPort: 'fieldThree', to: 'Record2', toPort: 'fieldB' }\r
      ]\r
    });\r
\r
    // this is a bit inefficient, but should be OK for normal-sized graphs with reasonable numbers of items per node\r
    function findAllSelectedItems() {\r
      var items = [];\r
      for (var nit = myDiagram.nodes; nit.next(); ) {\r
        var node = nit.value;\r
        var table = node.findObject('TABLE');\r
        if (table) {\r
          for (var iit = table.elements; iit.next(); ) {\r
            var itempanel = iit.value;\r
            if (isFieldSelected(itempanel)) items.push(itempanel);\r
          }\r
        }\r
      }\r
      return items;\r
    }\r
\r
    // Override the standard CommandHandler deleteSelection behavior.\r
    // If there are any selected items, delete them instead of deleting any selected nodes or links.\r
    myDiagram.commandHandler.canDeleteSelection = function () {\r
      // method override must be function, not =>\r
      // true if there are any selected deletable nodes or links,\r
      // or if there are any selected items within nodes\r
      return go.CommandHandler.prototype.canDeleteSelection.call(this) || findAllSelectedItems().length > 0;\r
    };\r
\r
    myDiagram.commandHandler.deleteSelection = function () {\r
      // method override must be function, not =>\r
      var items = findAllSelectedItems();\r
      if (items.length > 0) {\r
        // if there are any selected items, delete them\r
        myDiagram.startTransaction('delete items');\r
        for (var i = 0; i < items.length; i++) {\r
          var panel = items[i];\r
          var nodedata = panel.part.data;\r
          var itemarray = nodedata.fields;\r
          var itemdata = panel.data;\r
          var itemindex = itemarray.indexOf(itemdata);\r
          myDiagram.model.removeArrayItem(itemarray, itemindex);\r
        }\r
        myDiagram.commitTransaction('delete items');\r
      } else {\r
        // otherwise just delete nodes and/or links, as usual\r
        go.CommandHandler.prototype.deleteSelection.call(this);\r
      }\r
    };\r
\r
    showModel(); // show the diagram's initial model\r
\r
    function showModel() {\r
      document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This shows a variable number of selectable "fields" for each "record".</p>\r
  <p>\r
    To select multiple fields press <code>Ctrl + Click</code> or on mac\r
    <code>Cmd + Click</code>. Draw new links by dragging from the background of\r
    any field. Reconnect a selected link by dragging its diamond-shaped handle.\r
    The user can delete a selected field.\r
  </p>\r
  <p>This sample was derived from the <a href="records">Records</a> sample.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`commands`];var g=y();l(`1wermea`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};