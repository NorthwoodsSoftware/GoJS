import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Scrolling Table Panels with ScrollBars`,indexDescription:`Demonstrates a custom Table Panel with a scrollbar implemented in GoJS, including two AutoRepeatButtons.`,screenshot:`scrollingtable`,priority:2,tags:[`tables`,`itemarrays`,`buttons`,`extensions`],description:`Allow users to scroll the items in a Table Panel.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      LayoutCompleted: e => {\r
        // update all of the scrollbars\r
        e.diagram.nodes.each(n => {\r
          var table = n.findObject('TABLE');\r
          if (table !== null && table.panel._updateScrollBar) table.panel._updateScrollBar(table);\r
        });\r
      }\r
    });\r
\r
    // support mouse wheel scrolling of table when the mouse is in the table\r
    myDiagram.toolManager.doMouseWheel = function () { // method override requires function, not =>\r
      var e = this.diagram.lastInput;\r
      var tab = this.diagram.findObjectAt(e.documentPoint);\r
      while (tab !== null && !tab._updateScrollBar) tab = tab.panel;\r
      if (tab !== null) {\r
        var table = tab.findObject('TABLE');\r
        if (table) {\r
          var dir = e.delta > 0 ? -1 : 1;\r
          var incr = e.shift ? 5 : 1;\r
          tab._scrollTable(table, incr * dir);\r
        }\r
        tab._updateScrollBar(table);\r
        e.handled = true;\r
        return;\r
      }\r
      go.ToolManager.prototype.doMouseWheel.call(this);\r
    };\r
\r
myDiagram.nodeTemplate =\r
  new go.Node('Vertical', {\r
      selectionObjectName: 'SCROLLER',\r
      resizable: true, resizeObjectName: 'SCROLLER',\r
      portSpreading: go.PortSpreading.None\r
    })\r
    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.TextBlock({ font: 'bold 14px sans-serif' })\r
        .bind('text', 'key'),\r
      new go.Panel('Auto')\r
        .add(\r
          new go.Shape({ fill: 'white' }),\r
          go.GraphObject.build('ScrollingTable', {\r
              name: 'SCROLLER',\r
              desiredSize: new go.Size(NaN, 60), // fixed height, but is resizable\r
              defaultColumnSeparatorStroke: 'gray',\r
              defaultColumnSeparatorStrokeWidth: 0.5,\r
              'TABLE.itemTemplate':\r
                new go.Panel('TableRow', {\r
                    defaultStretch: go.Stretch.Horizontal,\r
                    // each row is a port\r
                    fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides,\r
                    fromLinkable: true, toLinkable: true,\r
                  })\r
                  .bind('portId', 'name')  // each row is a port\r
                  .add( // add whatever you want as columns in the scrolled "Table" Panel\r
                    new go.TextBlock({ column: 0 })\r
                      .bind('text', 'name'),\r
                    new go.TextBlock({ column: 1 })\r
                      .bind('text', 'value')\r
                  ),\r
              // style some of the properties of the "Table" Panel\r
              'TABLE.defaultColumnSeparatorStroke': 'gray',\r
              'TABLE.defaultColumnSeparatorStrokeWidth': 0.5,\r
              'TABLE.defaultRowSeparatorStroke': 'gray',\r
              'TABLE.defaultRowSeparatorStrokeWidth': 0.5,\r
              'TABLE.defaultSeparatorPadding': new go.Margin(1, 3, 0, 3),\r
              'TABLE.rowSizing': go.Sizing.None\r
            })\r
            .bind('TABLE.itemArray', 'items')\r
            // This swaps the columns of the scrollbar and table.\r
            // If you look at the ScrollingTable extension source, the scrolling table itself\r
            // is implemented as a table with the scrollbar column 1 and the table content in column 0.\r
            // This simply switches them to make the scrollbar appear on the left.\r
            .bind('TABLE.column', 'left', left => left ? 2 : 0)\r
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        )\r
    );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      linkFromPortIdProperty: 'fromPort',\r
      linkToPortIdProperty: 'toPort',\r
      nodeDataArray: [\r
        {\r
          key: 'Alpha',\r
          left: true,\r
          loc: '0 0',\r
          size: '100 70',\r
          items: [\r
            { name: 'A', value: 1 },\r
            { name: 'B', value: 2 },\r
            { name: 'C', value: 3 },\r
            { name: 'D', value: 4 },\r
            { name: 'E', value: 5 },\r
            { name: 'F', value: 6 },\r
            { name: 'G', value: 7 }\r
          ]\r
        },\r
        {\r
          key: 'Beta',\r
          loc: '150 0',\r
          size: '80 40',\r
          items: [\r
            { name: 'Aa', value: 1 },\r
            { name: 'Bb', value: 2 },\r
            { name: 'Cc', value: 3 },\r
            { name: 'Dd', value: 4 },\r
            { name: 'Ee', value: 5 },\r
            { name: 'Ff', value: 6 },\r
            { name: 'Gg', value: 7 },\r
            { name: 'Hh', value: 8 },\r
            { name: 'Ii', value: 9 },\r
            { name: 'Jj', value: 10 },\r
            { name: 'Kk', value: 11 },\r
            { name: 'Ll', value: 12 },\r
            { name: 'Mm', value: 13 },\r
            { name: 'Nn', value: 14 }\r
          ]\r
        }\r
      ],\r
      linkDataArray: [\r
        { from: 'Alpha', fromPort: 'D', to: 'Beta', toPort: 'Ff' },\r
        { from: 'Alpha', fromPort: 'A', to: 'Beta', toPort: 'Nn' },\r
        { from: 'Alpha', fromPort: 'G', to: 'Beta', toPort: 'Aa' }\r
      ]\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/ScrollingTable.js`],descriptionHtml:`<p>\r
    This makes use of the "ScrollingTable" Panel defined in <a href="../extensions/ScrollingTable.js">ScrollingTable.js</a>. The "AutoRepeatButton" Panel is also defined in\r
    that file. Each node is resizable.\r
  </p>\r
  <p>\r
    Note how links connect particular port elements on each node. When an element has a <a>GraphObject.index</a> less than the <a>Panel.topIndex</a>, the panel\r
    arranges it be zero sized at the top of the panel. Similarly, elements beyond the last item in the panel are arranged to have zero size and be at the end of\r
    the list, which will be at the bottom of the panel.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`buttons`,`extensions`];var g=y();l(`1vxz73a`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};