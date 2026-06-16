import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Basic Sample Showing ToolTips and Context Menus for Nodes, Links, Groups, and Diagram`,titleShort:`Basic with ToolTips and Context Menus`,indexDescription:`Shows many of the commands possible in GoJS, templates for Links and for Groups, plus tooltips and context menus for Nodes, for Links, for Groups, and for the Diagram.`,screenshot:`basic`,priority:2,tags:[`groups`,`tooltips`,`contextmenus`,`buttons`,`commands`],description:`Interactive GoJS diagram demonstrating creating new nodes and links, reconnecting links, grouping and ungrouping, and context menus and tooltips for nodes, for links, and for the diagram background.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { // create a Diagram for the DIV HTML element\r
      // allow double-click in background to create a new node\r
      'clickCreatingTool.archetypeNodeData': { text: 'Node', color: 'white' },\r
\r
      // allow Ctrl-G to call groupSelection()\r
      'commandHandler.archetypeGroupData': { text: 'Group', isGroup: true, color: 'blue' },\r
\r
      // enable undo & redo\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // Define the appearance and behavior for Nodes:\r
\r
    // First, define the shared context menu for all Nodes, Links, and Groups.\r
\r
    // To simplify this code we define a function for creating a context menu button:\r
    function makeButton(text, action, visiblePredicate) {\r
      const button =\r
        go.GraphObject.build('ContextMenuButton')\r
          .add(new go.TextBlock(text, { click: action }));\r
      // don't bother with binding GraphObject.visible if there's no predicate\r
      if (visiblePredicate) {\r
        button.bindObject('visible', '', (o, e) => o.diagram ? visiblePredicate(o, e) : false);\r
      }\r
      return button;\r
    }\r
\r
    // a context menu is an Adornment with a bunch of buttons in them\r
    var partContextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          makeButton('Properties',\r
            (e, obj) => {\r
              // OBJ is this Button\r
              var contextmenu = obj.part; // the Button is in the context menu Adornment\r
              var part = contextmenu.adornedPart; // the adornedPart is the Part that the context menu adorns\r
              // now can do something with PART, or with its data, or with the Adornment (the context menu)\r
              if (part instanceof go.Link) alert(linkInfo(part.data));\r
              else if (part instanceof go.Group) alert(groupInfo(contextmenu));\r
              else alert(nodeInfo(part.data));\r
            }),\r
          makeButton('Cut',\r
            (e, obj) => e.diagram.commandHandler.cutSelection(),\r
            o => o.diagram.commandHandler.canCutSelection()\r
          ),\r
          makeButton('Copy',\r
            (e, obj) => e.diagram.commandHandler.copySelection(),\r
            o => o.diagram.commandHandler.canCopySelection()\r
          ),\r
          makeButton('Paste',\r
            (e, obj) =>\r
              e.diagram.commandHandler.pasteSelection(\r
                e.diagram.toolManager.contextMenuTool.mouseDownPoint\r
              ),\r
            o =>\r
              o.diagram.commandHandler.canPasteSelection(\r
                o.diagram.toolManager.contextMenuTool.mouseDownPoint\r
              )\r
          ),\r
          makeButton('Delete',\r
            (e, obj) => e.diagram.commandHandler.deleteSelection(),\r
            o => o.diagram.commandHandler.canDeleteSelection()\r
          ),\r
          makeButton('Undo',\r
            (e, obj) => e.diagram.commandHandler.undo(),\r
            o => o.diagram.commandHandler.canUndo()\r
          ),\r
          makeButton('Redo',\r
            (e, obj) => e.diagram.commandHandler.redo(),\r
            o => o.diagram.commandHandler.canRedo()\r
          ),\r
          makeButton('Group',\r
            (e, obj) => e.diagram.commandHandler.groupSelection(),\r
            o => o.diagram.commandHandler.canGroupSelection()\r
          ),\r
          makeButton('Ungroup',\r
            (e, obj) => e.diagram.commandHandler.ungroupSelection(),\r
            o => o.diagram.commandHandler.canUngroupSelection()\r
          )\r
        );\r
\r
    function nodeInfo(d) {\r
      // Tooltip info for a node data object\r
      var str = 'Node ' + d.key + ': ' + d.text + '\\n';\r
      if (d.group) str += 'member of ' + d.group;\r
      else str += 'top-level node';\r
      return str;\r
    }\r
\r
    // These nodes have text surrounded by a rounded rectangle\r
    // whose fill color is bound to the node data.\r
    // The user can drag a node by dragging its TextBlock label.\r
    // Dragging from the Shape will start drawing a new link.\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
        locationSpot: go.Spot.Center,\r
        // this tooltip Adornment is shared by all nodes\r
        toolTip:\r
          go.GraphObject.build('ToolTip')\r
            .add(\r
              new go.TextBlock({ margin: 4 }) // the tooltip shows the result of calling nodeInfo(data)\r
                .bind('text', '', nodeInfo)\r
            ),\r
        // this context menu Adornment is shared by all nodes\r
        contextMenu: partContextMenu\r
      })\r
      .add(\r
        new go.Shape('RoundedRectangle', {\r
            fill: 'white', // the default fill, if there is no data bound value\r
            portId: '',\r
            cursor: 'pointer', // the Shape is the port, not the whole Node\r
            // allow all kinds of links from and to this port\r
            fromLinkable: true,\r
            fromLinkableSelfNode: true,\r
            fromLinkableDuplicates: true,\r
            toLinkable: true,\r
            toLinkableSelfNode: true,\r
            toLinkableDuplicates: true\r
          })\r
          .bind('fill', 'color'),\r
        new go.TextBlock({\r
            font: 'bold 14px sans-serif',\r
            stroke: '#333',\r
            margin: 6, // make some extra space for the shape around the text\r
            isMultiline: false, // don't allow newlines in text\r
            editable: true // allow in-place editing by user\r
          })\r
          .bindTwoWay('text', 'text')\r
      );\r
\r
    // Define the appearance and behavior for Links:\r
\r
    function linkInfo(d) {\r
      // Tooltip info for a link data object\r
      return 'Link:\\nfrom ' + d.from + ' to ' + d.to;\r
    }\r
\r
    // The link shape and arrowhead have their stroke brush data bound to the "color" property\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          toShortLength: 3,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          // this tooltip Adornment is shared by all links\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4 }) // the tooltip shows the result of calling linkInfo(data)\r
                  .bind('text', '', linkInfo)\r
              ),\r
          // the same context menu Adornment is shared by all links\r
          contextMenu: partContextMenu\r
        }) // allow the user to relink existing links\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
            .bind('stroke', 'color'),\r
          new go.Shape({ toArrow: 'Standard', stroke: null })\r
            .bind('fill', 'color')\r
        );\r
\r
    // Define the appearance and behavior for Groups:\r
\r
    function groupInfo(adornment) {\r
      // takes the tooltip or context menu, not a group node data object\r
      var g = adornment.adornedPart; // get the Group that the tooltip adorns\r
      var mems = g.memberParts.count;\r
      var links = 0;\r
      g.memberParts.each(part => {\r
        if (part instanceof go.Link) links++;\r
      });\r
      return (\r
        'Group ' +\r
        g.data.key +\r
        ': ' +\r
        g.data.text +\r
        '\\n' +\r
        mems +\r
        ' members including ' +\r
        links +\r
        ' links'\r
      );\r
    }\r
\r
    // Groups consist of a title in the color given by the group node data\r
    // above a translucent gray rectangle surrounding the member parts\r
    myDiagram.groupTemplate =\r
      new go.Group('Vertical', {\r
          selectionObjectName: 'PANEL', // selection handle goes around shape, not label\r
          ungroupable: true, // enable Ctrl-Shift-G to ungroup a selected Group\r
          // this tooltip Adornment is shared by all groups\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4 })\r
                  // bind to tooltip, not to Group.data, to allow access to Group properties\r
                  .bindObject('text', '', groupInfo)\r
              ),\r
          // the same context menu Adornment is shared by all groups\r
          contextMenu: partContextMenu\r
        })\r
        .add(\r
          new go.TextBlock({\r
              //alignment: go.Spot.Right,\r
              font: 'bold 19px sans-serif',\r
              isMultiline: false, // don't allow newlines in text\r
              editable: true // allow in-place editing by user\r
            })\r
            .bindTwoWay('text', 'text')\r
            .bind('stroke', 'color'),\r
          new go.Panel('Auto', { name: 'PANEL' })\r
            .add(\r
              new go.Shape('Rectangle', {\r
                // the rectangular shape around the members\r
                fill: 'rgba(128,128,128,0.2)',\r
                stroke: 'gray',\r
                strokeWidth: 3,\r
                portId: '',\r
                cursor: 'pointer', // the Shape is the port, not the whole Node\r
                // allow all kinds of links from and to this port\r
                fromLinkable: true,\r
                fromLinkableSelfNode: true,\r
                fromLinkableDuplicates: true,\r
                toLinkable: true,\r
                toLinkableSelfNode: true,\r
                toLinkableDuplicates: true\r
              }),\r
              new go.Placeholder({ margin: 10, background: 'transparent' })\r
            ) // represents where the members are\r
        );\r
\r
    // Define the behavior for the Diagram background:\r
\r
    function diagramInfo(model) {\r
      // Tooltip info for the diagram's model\r
      return (\r
        'Model:\\n' + model.nodeDataArray.length + ' nodes, ' + model.linkDataArray.length + ' links'\r
      );\r
    }\r
\r
    // provide a tooltip for the background of the Diagram, when not over any Part\r
    myDiagram.toolTip =\r
      go.GraphObject.build('ToolTip')\r
        .add(\r
          new go.TextBlock({ margin: 4 })\r
            .bind('text', '', diagramInfo)\r
        );\r
\r
    // provide a context menu for the background of the Diagram, when not over any Part\r
    myDiagram.contextMenu =\r
      go.GraphObject.build('ContextMenu')\r
        .add(\r
          makeButton('Paste',\r
            (e, obj) =>\r
              e.diagram.commandHandler.pasteSelection(\r
                e.diagram.toolManager.contextMenuTool.mouseDownPoint\r
              ),\r
            o =>\r
              o.diagram.commandHandler.canPasteSelection(\r
                o.diagram.toolManager.contextMenuTool.mouseDownPoint\r
              )\r
          ),\r
          makeButton('Undo',\r
            (e, obj) => e.diagram.commandHandler.undo(),\r
            o => o.diagram.commandHandler.canUndo()\r
          ),\r
          makeButton('Redo',\r
            (e, obj) => e.diagram.commandHandler.redo(),\r
            o => o.diagram.commandHandler.canRedo()\r
          )\r
        );\r
\r
    // Create the Diagram's Model:\r
    const nodeDataArray = [\r
      { key: 1, text: 'Alpha', color: 'lightblue' },\r
      { key: 2, text: 'Beta', color: 'orange' },\r
      { key: 3, text: 'Gamma', color: 'lightgreen', group: 5 },\r
      { key: 4, text: 'Delta', color: 'pink', group: 5 },\r
      { key: 5, text: 'Epsilon', color: 'green', isGroup: true }\r
    ];\r
    const linkDataArray = [\r
      { from: 1, to: 2, color: 'blue' },\r
      { from: 2, to: 2 },\r
      { from: 3, to: 4, color: 'green' },\r
      { from: 3, to: 1, color: 'purple' }\r
    ];\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates tooltips and context menus for all parts and for the diagram\r
    background, as well as several other powerful diagram editing abilities.\r
  </p>\r
  <p>\r
    Unlike the <a href="minimal">Minimal</a> sample, this sample has templates for Links and\r
    for Groups, plus tooltips and context menus for Nodes, for Links, for Groups, and for the\r
    Diagram.\r
  </p>\r
  <p>\r
    This sample has all of the functionality of the Minimal sample, but additionally allows the user\r
    to:\r
  </p>\r
  <ul>\r
    <li>create new nodes: double-click in the background of the diagram</li>\r
    <li>edit text: select the node and then click on the text, or select the node and press F2</li>\r
    <li>draw new links: drag from the inner edge of the node's or the group's shape</li>\r
    <li>\r
      reconnect existing links: select the link and then drag the diamond-shaped handle at either\r
      end of the link\r
    </li>\r
    <li>\r
      group nodes and links: select some nodes and links and then type Ctrl-G (or invoke via context\r
      menu)\r
    </li>\r
    <li>\r
      ungroup an existing group: select a group and then type Ctrl-Shift-G (or invoke via context\r
      menu)\r
    </li>\r
  </ul>\r
  <p>\r
    GoJS contains many other possible commands, which can be invoked by either mouse/keyboard/touch\r
    or programmatically.\r
    <a href="../intro/commands">See an overview of possible commands here.</a>\r
    On a Mac, use CMD instead of Ctrl.\r
  </p>\r
  <p>\r
    On touch devices, hold your finger stationary to bring up a context menu. The default context\r
    menu supports most of the standard commands that are enabled at that time for that object.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`groups`,`tooltips`,`contextmenus`,`buttons`,`commands`];var g=y();l(`s01e09`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};