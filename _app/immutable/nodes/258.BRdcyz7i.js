import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Spreadsheet-like Nested Table Panels`,indexDescription:`An example of nested Table Panels forming a spreadsheet-like grid.`,screenshot:`spreadsheet`,priority:2,tags:[`tables`,`itemarrays`,`buttons`,`geometries`],description:`Nested Panels resulting in a spreadsheet-like node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 700px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      nodeSelectionAdornmentTemplate:\r
        new go.Adornment('Auto')\r
          .add(\r
            new go.Shape({ fill: null, stroke: 'orange', strokeWidth: 4 }),\r
            new go.Placeholder({ margin: 2 })\r
          )\r
    });\r
\r
    function textStyle(tb, big) {\r
      tb.stroke = 'white';\r
      tb.font = big ? '16pt sans-serif' : '10pt sans-serif';\r
      tb.alignment = go.Spot.Left;\r
    }\r
\r
    function borderStyle(shp) {\r
      shp.fill = 'cornflowerblue';\r
      shp.stroke = 'blue';\r
      shp.strokeWidth = 2;\r
    }\r
\r
    var aggregatedValue =\r
      new go.Panel('Auto', { margin: 5 })\r
        .add(\r
          new go.Shape().apply(borderStyle),\r
          new go.TextBlock({ margin: 10, width: 50 })\r
            .apply(textStyle)\r
            .bind('text', '')\r
        ); // assume just a number or a string\r
\r
    var aggregatedListH =\r
      new go.Panel('Auto', {\r
          margin: 4,\r
          stretch: go.Stretch.Fill\r
        })\r
        .add(\r
          new go.Shape().apply(borderStyle),\r
          new go.Panel('Table', {\r
              padding: 5,\r
              alignment: go.Spot.Left,\r
              stretch: go.Stretch.Fill,\r
              defaultAlignment: go.Spot.Left,\r
              defaultStretch: go.Stretch.Horizontal\r
            })\r
            .add(\r
              new go.TextBlock({ row: 0 })\r
                .apply(textStyle)\r
                .bind('text', 'header'),\r
              new go.Panel('Horizontal', { row: 1, itemTemplate: aggregatedValue })\r
                .bind('itemArray', 'values')\r
            )\r
        );\r
\r
    var aggregatedListV =\r
      new go.Panel('Auto', {\r
          margin: 4,\r
          stretch: go.Stretch.Fill\r
        })\r
        .add(\r
          new go.Shape().apply(borderStyle),\r
          new go.Panel('Vertical', {\r
              padding: 5,\r
              alignment: go.Spot.Top,\r
              defaultAlignment: go.Spot.Left\r
            })\r
            .add(\r
              new go.TextBlock({ maxSize: new go.Size(70, NaN) })\r
                .apply(textStyle)\r
                .bind('text', 'header'),\r
              new go.Panel('Vertical', {itemTemplate: aggregatedValue})\r
                .bind('itemArray', 'values')\r
            )\r
        );\r
\r
    var checkBoxTemplate =\r
      go.GraphObject.build('CheckBox', {\r
          'Button.width': 14,\r
          'Button.height': 14\r
        }, 'checked') // checked refers to the model data property name\r
        .add(\r
          new go.TextBlock()\r
            .apply(textStyle)\r
            .bind('text', 'label')\r
        );\r
\r
    myDiagram.nodeTemplate =\r
      new go.Part("Table")\r
        // insert an empty row and an empty column\r
        .addRowDefinition(1, { height: 8 })\r
        .addColumnDefinition(1, { width: 8 })\r
        .add(\r
          new go.Panel('Auto', {\r
              row: 0,\r
              column: 0,\r
              columnSpan: 3,\r
              stretch: go.Stretch.Fill\r
            })\r
            .add(\r
              new go.Shape()\r
                .apply(borderStyle),\r
              new go.TextBlock({ margin: 10, alignment: go.Spot.Center })\r
                .apply(textStyle, true)\r
                .bind('text', 'title')\r
            ),\r
          // the aggregated values\r
          new go.Panel('Auto', {\r
              row: 2,\r
              column: 0,\r
              stretch: go.Stretch.Fill\r
            })\r
            .add(\r
              new go.Shape()\r
                .apply(borderStyle),\r
              new go.Panel('Table', { padding: 4 })\r
                .add(\r
                  new go.TextBlock()\r
                    .apply(textStyle, true)\r
                    .bind('text', 'aggTitle'),\r
                  // The B Aggregated Values\r
                  new go.Panel('Auto', {\r
                      column: 0,\r
                      row: 1,\r
                      stretch: go.Stretch.Fill,\r
                      margin: new go.Margin(10, 0)\r
                    })\r
                    .add(\r
                      new go.Shape().apply(borderStyle),\r
                      new go.Panel('Table', {\r
                          padding: 4,\r
                          stretch: go.Stretch.Fill,\r
                          defaultStretch: go.Stretch.Fill\r
                        })\r
                        .add(\r
                          new go.TextBlock({ row: 0 })\r
                            .apply(textStyle, true)\r
                            .bind('text', 'aggHeaderB'),\r
                          new go.Panel('Horizontal', {\r
                              row: 1,\r
                              itemTemplate: aggregatedValue\r
                            })\r
                            .bind('itemArray', 'aggValuesB')\r
                        )\r
                    ),\r
                    // Now the C Aggregated Values\r
                    new go.Panel('Auto', {\r
                        column: 0,\r
                        row: 2,\r
                        alignment: go.Spot.TopLeft\r
                      })\r
                      .add(\r
                        new go.Shape().apply(borderStyle),\r
                        new go.Panel('Table', {\r
                            padding: 4,\r
                            stretch: go.Stretch.Fill,\r
                            defaultStretch: go.Stretch.Fill\r
                          })\r
                          .add(\r
                            new go.TextBlock({\r
                                row: 0,\r
                                column: 0,\r
                                columnSpan: 2\r
                              })\r
                              .apply(textStyle, true)\r
                              .bind('text', 'aggSubtitle'),\r
                            new go.Panel('Vertical', {\r
                                row: 1,\r
                                column: 0,\r
                                alignment: go.Spot.Left,\r
                                itemTemplate: aggregatedListH\r
                              })\r
                              .bind('itemArray', 'aggValuesH'),\r
                            new go.Panel('Horizontal', {\r
                                row: 1,\r
                                column: 1,\r
                                alignment: go.Spot.Left,\r
                                itemTemplate: aggregatedListV\r
                              })\r
                              .bind('itemArray', 'aggValuesV')\r
                          )\r
                      )\r
                )\r
            ),\r
      // the checkboxes\r
      new go.Panel('Auto', {\r
          row: 2,\r
          column: 2,\r
          stretch: go.Stretch.Fill\r
        })\r
        .add(\r
          new go.Shape()\r
            .apply(borderStyle),\r
          new go.Panel('Vertical', {\r
              padding: 4,\r
              alignment: go.Spot.Top,\r
              stretch: go.Stretch.Vertical,\r
              defaultAlignment: go.Spot.Left\r
            })\r
            .add(\r
              new go.TextBlock()\r
                .apply(textStyle, true)\r
                .bind('text', 'choices'),\r
              new go.Panel('Vertical', { itemTemplate: checkBoxTemplate })\r
                .bind('itemArray', 'checkBoxes')\r
            )\r
        )\r
    );\r
\r
    myDiagram.model.nodeDataArray = [\r
      {\r
        title: 'The Main Title',\r
\r
        aggTitle: 'A-Aggregated Values (from B and C)',\r
\r
        aggHeaderB: 'B-Aggregated Values (from B1-B2)',\r
        aggValuesB: [101.01, 102.02],\r
\r
        aggSubtitle: 'C-Aggregated Values (from D, E, F, and G)',\r
        aggValuesH: [\r
          {\r
            header: 'D-Aggregated Values (from D1..Dx)',\r
            values: [1.01, 2.02, 3.03, 4.04]\r
          },\r
          {\r
            header: 'E-Aggregated Values (from E1..Ex)',\r
            values: [11.01, 12.02]\r
          },\r
          {\r
            header: 'F-Aggregated Values (from F1..Fx)',\r
            values: [21.01, 22.02, 23.03, 24.04, 25.05]\r
          }\r
        ],\r
\r
        aggValuesV: [\r
          {\r
            header: 'G-Aggregated Values (from G1..Gx)',\r
            values: [31.01, 32.02, 33.03]\r
          }\r
        ],\r
\r
        choices: 'Check Boxes',\r
        checkBoxes: [\r
          { label: 'Checkbox 1', checked: true },\r
          { label: 'Checkbox 2', checked: false },\r
          { label: 'Checkbox 3', checked: true },\r
          { label: 'Checkbox 4' }\r
        ]\r
      }\r
    ];\r
    myDiagram.model.copiesArrays = true;\r
    myDiagram.model.copiesArrayObjects = true;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    An example of a single <a>Diagram.nodeTemplate</a> which contains many\r
    nested auto <a>Panel</a>s. The deepest nested <a>Panel</a>s have\r
    <a>Panel.itemTemplate</a> set to either checkboxes or auto <a>Panel</a>s\r
    with a blue rectangle and a textblock inside. Panels will then have\r
    <a>Panel.itemArray</a> bound to Arrays of numbers or checkbox labels.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`buttons`,`geometries`];var g=y();l(`boavwd`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};