import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Resizing Rows and Columns in Table Panels in Nodes`,titleShort:`Table Row and Column Resizing`,indexDescription:`Two custom Tools that let the user resize the width of columns or the height of rows in a Table Panel of a Node.`,screenshot:`columnresizing`,priority:2,tags:[`tables`,`itemarrays`,`tools`,`extensions`,`geometries`],description:`Using the RowResizingTool and ColumnResizingTool to allow the user to change the size of rows and columns in a Table Panel.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <pre style="width: 100%; height: 300px" class="lang-js"><code id="mySavedModel"></code></pre>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      validCycle: go.CycleMode.NotDirected, // don't allow loops\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.toolManager.mouseDownTools\r
      .add(\r
        new RowResizingTool({\r
          doResize: function (rowdef, height) {  // override method\r
            rowdef.height = height;\r
          }\r
        })\r
      );\r
    myDiagram.toolManager.mouseDownTools.add(new ColumnResizingTool());\r
\r
    // This template is a Panel that is used to represent each item in a Panel.itemArray.\r
    // The Panel is data bound to the item object.\r
    var fieldTemplate =\r
      new go.Panel('TableRow', { // this Panel is a row in the containing Table\r
          background: 'transparent', // so this port's background can be picked by the mouse\r
          fromSpot: go.Spot.Right, // links only go from the right side to the left side\r
          toSpot: go.Spot.Left,\r
          // allow drawing links from or to this port:\r
          fromLinkable: true,\r
          toLinkable: true\r
        })\r
        .bind('portId', 'name') // this Panel is a "port"\r
        .add(\r
          new go.Shape({\r
              column: 0,\r
              width: 12,\r
              height: 12,\r
              margin: 4,\r
              // but disallow drawing links from or to this shape:\r
              fromLinkable: false,\r
              toLinkable: false\r
            })\r
            .bind('figure', 'figure')\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              name: 'TB',\r
              column: 1,\r
              margin: new go.Margin(0, 2),\r
              stretch: go.Stretch.Horizontal,\r
              font: 'bold 13px sans-serif',\r
              wrap: go.Wrap.None,\r
              verticalAlignment: go.Spot.Center, // keep this text centered when resized\r
              overflow: go.TextOverflow.Ellipsis,\r
              // and disallow drawing links from or to this text:\r
              fromLinkable: false,\r
              toLinkable: false\r
            })\r
            .bind('text', 'name'),\r
          new go.TextBlock({\r
              column: 2,\r
              margin: new go.Margin(0, 2),\r
              stretch: go.Stretch.Horizontal,\r
              font: '13px sans-serif',\r
              maxLines: 3,\r
              overflow: go.TextOverflow.Ellipsis,\r
              editable: true\r
            })\r
            .bindTwoWay('text', 'info')\r
        );\r
\r
    // Return initialization for a RowColumnDefinition, specifying a particular column\r
    // and adding a Binding of RowColumnDefinition.width to the IDX'th number in the data.widths Array\r
    function makeWidthBinding(idx) {\r
      // These two conversion functions are closed over the IDX variable.\r
      // This source-to-target conversion extracts a number from the Array at the given index.\r
      function getColumnWidth(arr) {\r
        if (Array.isArray(arr) && idx < arr.length) return arr[idx];\r
        return NaN;\r
      }\r
      // This target-to-source conversion sets a number in the Array at the given index.\r
      function setColumnWidth(w, data) {\r
        var arr = data.widths;\r
        if (!arr) arr = [];\r
        if (idx >= arr.length) {\r
          for (var i = arr.length; i <= idx; i++) arr[i] = NaN; // default to NaN\r
        }\r
        arr[idx] = w;\r
        return arr; // need to return the Array (as the value of data.widths)\r
      }\r
      return new go.RowColumnDefinition({ column: idx })\r
        .bindTwoWay('width', 'widths', getColumnWidth, setColumnWidth);\r
    }\r
\r
    // This template represents a whole "record".\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // this rectangular shape surrounds the content of the node\r
          new go.Shape({ fill: '#EEEEEE' }),\r
          // the content consists of a header and a list of items\r
          new go.Panel('Vertical', { stretch: go.Stretch.Horizontal, margin: 0.5 })\r
            .add(\r
              // this is the header for the whole node\r
              new go.Panel('Auto', { stretch: go.Stretch.Horizontal }) // as wide as the whole node\r
                .add(\r
                  new go.Shape({ fill: '#1570A6', strokeWidth: 0 }),\r
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
                  stretch: go.Stretch.Horizontal,\r
                  minSize: new go.Size(100, 10),\r
                  defaultAlignment: go.Spot.Left,\r
                  defaultStretch: go.Stretch.Horizontal,\r
                  defaultColumnSeparatorStroke: 'gray',\r
                  defaultRowSeparatorStroke: 'gray',\r
                  itemTemplate: fieldTemplate\r
                })\r
                .bind('itemArray', 'fields')\r
                .addRowColumnDefinition(makeWidthBinding(0))\r
                .addRowColumnDefinition(makeWidthBinding(1))\r
                .addRowColumnDefinition(makeWidthBinding(2))\r
                // end Table Panel of items\r
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
      // automatically update the model that is shown on this page\r
      Changed: e => {\r
        if (e.isTransactionFinished) showModel();\r
      },\r
      nodeDataArray: [\r
        {\r
          key: 'Record1',\r
          widths: [NaN, NaN, 60],\r
          fields: [\r
            { name: 'field1', info: 'first field', color: '#F7B84B', figure: 'Ellipse' },\r
            { name: 'field2', info: 'the second one', color: '#F25022', figure: 'Ellipse' },\r
            { name: 'fieldThree', info: '3rd', color: '#00BCF2' }\r
          ],\r
          loc: '0 0'\r
        },\r
        {\r
          key: 'Record2',\r
          widths: [NaN, NaN, NaN],\r
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
    showModel(); // show the diagram's initial model\r
\r
    function showModel() {\r
      document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/ColumnResizingTool.js`,`../extensions/RowResizingTool.js`],descriptionHtml:`<p>\r
    This makes use of two tools, defined in their own files:\r
    <a href="../extensions/ColumnResizingTool.js">ColumnResizingTool.js</a> and\r
    <a href="../extensions/RowResizingTool.js">RowResizingTool.js</a>. Each tool adds an\r
    <a>Adornment</a> to a selected node that has a resize handle for each column or each row of a\r
    "Table" <a>Panel</a>. While resizing, you can press the Tab or the Delete key in order to stop\r
    the tool and restore the column or row to its natural size.\r
  </p>\r
  <p>\r
    This sample also adds TwoWay Bindings to the <a>RowColumnDefinition.width</a> property for the\r
    columns. Each column width is stored in the corresponding index of the node data's "widths"\r
    property, which must be an Array of numbers. The default value is NaN, allowing the column to\r
    occupy its natural width. Note that there are <b>no</b> Bindings for the row heights.\r
  </p>\r
  <p>The model data, automatically updated after each change or undo or redo.</p>\r
  <p>\r
    See also the <a href="../samples/addRemoveColumns">Add & Remove Rows & Columns</a> sample.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`tools`,`extensions`,`geometries`];var g=y();l(`14d7mmy`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};