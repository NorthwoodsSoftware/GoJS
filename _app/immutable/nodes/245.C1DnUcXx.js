import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Selectable, Deletable Ports in Nodes`,indexDescription:`A Node with ports that can be selected and deleted.`,screenshot:`selectableports`,priority:2,tags:[`itemarrays`,`ports`,`geometries`,`commands`],description:`Support selecting ports within nodes.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
  <p>The model data, automatically updated after each change or undo or redo:</p>\r
  <pre class="lang-js"><code id="mySavedModel"></code></pre>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // For this sample, automatically show the state of the diagram's model on the page\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) showModel();\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
    const UnselectedBrush = 'lightgray'; // item appearance, if not "selected"\r
    const SelectedBrush = 'dodgerblue'; // item appearance, if "selected"\r
\r
    function isPortSelected(item) {\r
      return item && item.fill !== UnselectedBrush; // assume the port is a Shape\r
    }\r
\r
    function setPortSelected(item, sel) {\r
      if (!item) return;\r
      if (sel) {\r
        item.fill = SelectedBrush;\r
      } else {\r
        item.fill = UnselectedBrush;\r
      }\r
    }\r
\r
    function onPortClick(e, tb) {\r
      var shape = tb.panel.findObject('SHAPE');\r
      if (shape !== null) {\r
        var oldskips = shape.diagram.skipsUndoManager;\r
        shape.diagram.skipsUndoManager = true;\r
        if (e.control || e.meta) {\r
          setPortSelected(shape, !isPortSelected(shape));\r
          shape.part.isSelected = shape.part.ports.any(isPortSelected);\r
        } else if (e.shift) {\r
          // alternative policy: select all Ports between this item and some other one??\r
          if (!isPortSelected(shape)) setPortSelected(shape, true);\r
          shape.part.isSelected = true;\r
        } else {\r
          if (!isPortSelected(shape)) {\r
            // deselect all sibling items\r
            shape.part.ports.each(it => {\r
              if (it !== shape) setPortSelected(it, false);\r
            });\r
            setPortSelected(shape, true);\r
          }\r
          shape.part.isSelected = true;\r
        }\r
        shape.diagram.skipsUndoManager = oldskips;\r
      }\r
    }\r
\r
    function makeItemTemplate(leftside) {\r
      return new go.Panel('Auto', { margin: new go.Margin(1, 0) }) // some space between ports\r
        .add(\r
          new go.Shape({\r
              name: 'SHAPE',\r
              fill: UnselectedBrush,\r
              stroke: 'gray',\r
              geometryString: 'F1 m 0,0 l 5,0 1,4 -1,4 -5,0 1,-4 -1,-4 z',\r
              spot1: new go.Spot(0, 0, 5, 1), // keep the text inside the shape\r
              spot2: new go.Spot(1, 1, -5, 0),\r
              // some port-related properties\r
              toSpot: go.Spot.Left,\r
              toLinkable: leftside,\r
              fromSpot: go.Spot.Right,\r
              fromLinkable: !leftside,\r
              cursor: 'pointer'\r
            })\r
            .bind('portId', 'name'),\r
          new go.TextBlock({\r
              // allow the user to select items -- the background color indicates whether "selected"\r
              isActionable: true,\r
              click: onPortClick\r
            })\r
            .bind('text', 'name')\r
        );\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          selectionAdorned: false,\r
          locationSpot: go.Spot.Center,\r
          locationObjectName: 'BODY'\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Auto', { name: 'BODY' })\r
            .add(\r
              new go.Shape('RoundedRectangle', {\r
                  stroke: 'gray',\r
                  strokeWidth: 2,\r
                  fill: 'transparent'\r
                })\r
                .bindObject('stroke', 'isSelected', b => b ? SelectedBrush : UnselectedBrush),\r
              new go.Panel('Vertical', { margin: 6 })\r
                .add(\r
                  new go.TextBlock({ alignment: go.Spot.Left })\r
                    .bind('text', 'name'),\r
                  new go.Picture('images/60x90.png', {\r
                    width: 30,\r
                    height: 45,\r
                    margin: new go.Margin(10, 10)\r
                  })\r
                )\r
            ),\r
          new go.Panel('Vertical', {\r
              name: 'LEFTPORTS',\r
              alignment: new go.Spot(0, 0.5, 0, 7),\r
              itemTemplate: makeItemTemplate(true)\r
            })\r
            .bind('itemArray', 'inservices'),\r
          new go.Panel('Vertical', {\r
              name: 'RIGHTPORTS',\r
              alignment: new go.Spot(1, 0.5, 0, 7),\r
              itemTemplate: makeItemTemplate(false)\r
            })\r
            .bind('itemArray', 'outservices')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Orthogonal,\r
          corner: 10,\r
          toShortLength: -3,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          resegmentable: true\r
        })\r
        .add(\r
          new go.Shape({ stroke: 'gray', strokeWidth: 2.5 })\r
        );\r
\r
    function findAllSelectedItems() {\r
      var items = [];\r
      for (var nit = myDiagram.nodes; nit.next(); ) {\r
        var node = nit.value;\r
        //?? Maybe this should only return selected items that are within selected Nodes\r
        //if (!node.isSelected) continue;\r
        node.ports.each(port => {\r
          if (isPortSelected(port)) items.push(port.findBindingPanel());\r
        });\r
      }\r
      return items;\r
    }\r
\r
    // Override the standard CommandHandler deleteSelection and canDeleteSelection behavior.\r
    // If there are any selected items, delete them instead of deleting any selected nodes or links.\r
\r
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
          var item = items[i];\r
          var nodedata = item.part.data;\r
          var itemdata = item.data;\r
          // find the item array that the item data is in; try "inservices" first\r
          var itemarray = nodedata.inservices;\r
          var itemindex = itemarray.indexOf(itemdata);\r
          if (itemindex < 0) {\r
            // otherwise try "outservices"\r
            itemarray = nodedata.outservices;\r
            itemindex = itemarray.indexOf(itemdata);\r
          }\r
          if (itemindex >= 0) {\r
            myDiagram.model.removeArrayItem(itemarray, itemindex);\r
          }\r
        }\r
        myDiagram.commitTransaction('delete items');\r
      } else {\r
        // otherwise just delete nodes and/or links, as usual\r
        go.CommandHandler.prototype.deleteSelection.call(this);\r
      }\r
    };\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      linkFromPortIdProperty: 'fromPort',\r
      linkToPortIdProperty: 'toPort',\r
      nodeDataArray: [\r
        { key: 1, name: 'Server', inservices: [{ name: 's1' }, { name: 's2' }], outservices: [{ name: 'o1' }], loc: '0 0' },\r
        { key: 2, name: 'Other', inservices: [{ name: 's1' }, { name: 's2' }], loc: '200 60' }\r
      ],\r
      linkDataArray: [{ from: 1, fromPort: 'o1', to: 2, toPort: 's2' }]\r
    });\r
\r
    showModel();\r
\r
    function showModel() {\r
      document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Click on a port to select it. To select multiple press <code>Ctrl + Click</code>\r
    or on mac <code>Cmd + Click</code>. The Delete command will only delete\r
    selected ports, if there are any; otherwise it will delete Nodes and Links\r
    as it normally would.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`itemarrays`,`ports`,`geometries`,`commands`];var g=y();l(`1u3pngb`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};