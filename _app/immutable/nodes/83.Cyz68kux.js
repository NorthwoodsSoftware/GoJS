import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Add/Remove/Swap Columns in Table Panels`,indexDescription:`Demonstrates adding and removing and swapping columns of a Table Panel.`,screenshot:`addremovecolumns`,priority:2,tags:[`tables`,`itemarrays`,`html`],description:`Interactively adding and removing rows and columns of a Table Panel in a GoJS Node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <p>Add a row or Remove the second row of the table held by the selected node:</p>\r
  <button onclick="insertIntoArray()">Insert Into Array</button>\r
  <button onclick="removeFromArray()">Remove From Array</button>\r
  <p>Add a column or Remove the fourth column from the table of the selected node:</p>\r
  <button onclick="addColumn()">Add Column</button>\r
  <button onclick="removeColumn()">Remove Column</button>\r
  <p>Swap the "phone" and "office" columns for each selected node:</p>\r
  <button onclick="swapTwoColumns()">Swap Two Columns</button>`,jsCode:`function tableRowItemTemplate() {\r
    return (\r
      new go.Panel({\r
          // each of which as "attr" and "text" properties\r
          stretch: go.Stretch.Fill,\r
          alignment: go.Spot.TopLeft\r
        })\r
        .bind('column', 'attr', (a, elt) => {\r
          // ELT is this bound item/cell Panel\r
          // elt.data will be the cell object\r
          // elt.panel.data will be the person/row data object\r
          // elt.part.data will be the node data object\r
          // "columnDefinitions" is on the node data object, so:\r
          var cd = findColumnDefinitionForName(elt.part.data, a);\r
          if (cd !== null) return cd.column;\r
          throw new Error('unknown column name: ' + a);\r
        })\r
        // you could also have other Bindings here for this cell\r
        .add(\r
          new go.TextBlock({\r
              editable: true,\r
              margin: new go.Margin(2, 2, 0, 2),\r
              wrap: go.Wrap.None\r
            })\r
            .bindTwoWay('text')\r
        )\r
    );\r
  }\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape({ fill: 'white' }),\r
          new go.Panel('Table', {\r
              margin: 0.5,\r
              // the rows for the people\r
              name: 'TABLE',\r
              defaultAlignment: go.Spot.Left,\r
              defaultColumnSeparatorStroke: 'black',\r
              // bound to a person/row data object\r
              itemTemplate:\r
                new go.Panel('TableRow', { itemTemplate: tableRowItemTemplate() })\r
                  .bind('itemArray', 'columns')\r
            })\r
            .bind('itemArray', 'people')\r
            .addRowDefinition(0, { background: 'lightgray' })\r
            .addRowDefinition(1, { separatorStroke: 'black' })\r
            // the table headers -- remains even if itemArray is empty\r
            .add(\r
              new go.Panel('TableRow', {\r
                isPanelMain: true,\r
                // bound to a column definition object\r
                itemTemplate:\r
                  new go.Panel()\r
                    .bind('column')\r
                    .add(\r
                      new go.TextBlock({\r
                          margin: new go.Margin(2, 2, 0, 2),\r
                          font: 'bold 10pt sans-serif'\r
                        })\r
                        .bind('text')\r
                    )\r
              })\r
              .bind('itemArray', 'columnDefinitions')\r
            )\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          // first node\r
          key: 1,\r
          columnDefinitions: [\r
            // each column definition needs to specify the column used\r
            { attr: 'name', text: 'Name', column: 0 },\r
            { attr: 'phone', text: 'Phone #', column: 1 },\r
            { attr: 'office', text: 'Office', column: 2 }\r
          ],\r
          people: [\r
            // the table of people\r
            // each row is a person with an Array of Objects associating a column name with a text value\r
            {\r
              columns: [\r
                { attr: 'name', text: 'Alice' },\r
                { attr: 'phone', text: '2345' },\r
                { attr: 'office', text: 'C4-E18' }\r
              ]\r
            },\r
            {\r
              columns: [\r
                { attr: 'name', text: 'Bob' },\r
                { attr: 'phone', text: '9876' },\r
                { attr: 'office', text: 'E1-B34' }\r
              ]\r
            },\r
            {\r
              columns: [\r
                { attr: 'name', text: 'Carol' },\r
                { attr: 'phone', text: '1111' },\r
                { attr: 'office', text: 'C4-E23' }\r
              ]\r
            },\r
            {\r
              columns: [\r
                { attr: 'name', text: 'Ted' },\r
                { attr: 'phone', text: '2222' },\r
                { attr: 'office', text: 'C4-E197' }\r
              ]\r
            }\r
          ]\r
        },\r
        {\r
          // second node\r
          key: 2,\r
          columnDefinitions: [\r
            { attr: 'name', text: 'Name', column: 0 },\r
            { attr: 'phone', text: 'Phone #', column: 2 }, // note the different order of columns\r
            { attr: 'office', text: 'Office', column: 1 }\r
          ],\r
          people: [\r
            {\r
              columns: [\r
                { attr: 'name', text: 'Robert' },\r
                { attr: 'phone', text: '5656' },\r
                { attr: 'office', text: 'B1-A27' }\r
              ]\r
            },\r
            {\r
              columns: [\r
                { attr: 'name', text: 'Natalie' },\r
                { attr: 'phone', text: '5698' },\r
                { attr: 'office', text: 'B1-B6' }\r
              ]\r
            }\r
          ]\r
        }\r
      ],\r
      linkDataArray: [{ from: 1, to: 2 }]\r
    });\r
  }\r
\r
  // Add or remove a person row from the selected node's table of people.\r
\r
  function insertIntoArray() {\r
    var n = myDiagram.selection.first();\r
    if (n === null) return;\r
    var d = n.data;\r
    myDiagram.startTransaction('insertIntoTable');\r
    // add item as second in the list, at index #1\r
    // of course this new data could be more realistic:\r
    myDiagram.model.insertArrayItem(d.people, 1, {\r
      columns: [\r
        { attr: 'name', text: 'Elena' },\r
        { attr: 'phone', text: '456' },\r
        { attr: 'office', text: 'LA' }\r
      ]\r
    });\r
    myDiagram.commitTransaction('insertIntoTable');\r
  }\r
\r
  function removeFromArray() {\r
    var n = myDiagram.selection.first();\r
    if (n === null) return;\r
    var d = n.data;\r
    myDiagram.startTransaction('removeFromTable');\r
    // remove second item of list, at index #1\r
    if (d.people.length > 1) myDiagram.model.removeArrayItem(d.people, 1);\r
    myDiagram.commitTransaction('removeFromTable');\r
  }\r
\r
  // add or remove a column from the selected node's table of people\r
\r
  function findColumnDefinitionForName(nodedata, attrname) {\r
    var columns = nodedata.columnDefinitions;\r
    for (var i = 0; i < columns.length; i++) {\r
      if (columns[i].attr === attrname) return columns[i];\r
    }\r
    return null;\r
  }\r
\r
  function findColumnDefinitionForColumn(nodedata, idx) {\r
    var columns = nodedata.columnDefinitions;\r
    for (var i = 0; i < columns.length; i++) {\r
      if (columns[i].column === idx) return columns[i];\r
    }\r
    return null;\r
  }\r
\r
  function addColumn(attrname) {\r
    var n = myDiagram.selection.first();\r
    if (n === null) return;\r
    var d = n.data;\r
    // if name is not given, find an unused column name\r
    if (attrname === undefined || attrname === '') {\r
      attrname = 'new';\r
      var count = 1;\r
      while (findColumnDefinitionForName(d, attrname) !== null) {\r
        attrname = 'new' + (count++).toString();\r
      }\r
    }\r
    // find an unused column #\r
    var col = 3;\r
    while (findColumnDefinitionForColumn(d, col) !== null) {\r
      col++;\r
    }\r
    myDiagram.startTransaction('addColumn');\r
    var model = myDiagram.model;\r
    // add a column definition for the node's whole table\r
    model.addArrayItem(d.columnDefinitions, {\r
      attr: attrname,\r
      text: attrname,\r
      column: col\r
    });\r
    // add cell to each person in the node's table of people\r
    var people = d.people;\r
    for (var j = 0; j < people.length; j++) {\r
      var person = people[j];\r
      model.addArrayItem(person.columns, {\r
        attr: attrname,\r
        text: Math.floor(Math.random() * 1000).toString()\r
      });\r
    }\r
    myDiagram.commitTransaction('addColumn');\r
  }\r
\r
  function removeColumn() {\r
    var n = myDiagram.selection.first();\r
    if (n === null) return;\r
    var d = n.data;\r
    var coldef = d.columnDefinitions[3]; // get the fourth column\r
    if (coldef === undefined) return;\r
    var attrname = coldef.attr;\r
    myDiagram.startTransaction('removeColumn');\r
    var model = myDiagram.model;\r
    model.removeArrayItem(d.columnDefinitions, 3);\r
    n.findObject('TABLE').removeColumnDefinition(coldef.column);\r
    // update columns for each person in this table\r
    var people = d.people;\r
    for (var j = 0; j < people.length; j++) {\r
      var person = people[j];\r
      var columns = person.columns;\r
      for (var k = 0; k < columns.length; k++) {\r
        var cell = columns[k];\r
        if (cell.attr === attrname) {\r
          // get rid of this attribute cell from the person.columns Array\r
          model.removeArrayItem(columns, k);\r
          break;\r
        }\r
      }\r
    }\r
    myDiagram.commitTransaction('removeColumn');\r
  }\r
\r
  function swapTwoColumns() {\r
    myDiagram.startTransaction('swapColumns');\r
    var model = myDiagram.model;\r
    myDiagram.selection.each(n => {\r
      if (!(n instanceof go.Node)) return;\r
      var d = n.data;\r
      var phonedef = findColumnDefinitionForName(d, 'phone');\r
      if (phonedef === null) return;\r
      var phonecolumn = phonedef.column; // remember the column number\r
      var officedef = findColumnDefinitionForName(d, 'office');\r
      if (officedef === null) return;\r
      var officecolumn = officedef.column; // and this one too\r
      model.set(phonedef, 'column', officecolumn);\r
      model.set(officedef, 'column', phonecolumn);\r
      model.updateTargetBindings(d); // update all bindings, to get the cells right\r
    });\r
    myDiagram.commitTransaction('swapColumns');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows how table panel row and columns can be manipulated using\r
    HTML interactions. See also the\r
    <a href="../samples/ColumnResizing">Column and Row Resizing Tools</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`html`];var g=y();l(`jawnjr`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};