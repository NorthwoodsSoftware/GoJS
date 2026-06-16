import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Record Mapper Diagram Editor Relating Fields to Fields`,titleShort:`Record Mapper`,indexDescription:`Displays a variable number of fields for each record, with links mapping one field to another.`,screenshot:`records`,priority:1,tags:[`tables`,`itemarrays`],description:`A diagram for displaying and editing the N to M relationships from one set of objects to another set of objects.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 300px"></div>\r
  <div>\r
    Diagram Model saved in JSON format, automatically updated after each change or undo or redo:\r
    <pre class="lang-js"><code id="mySavedModel" style="width: 100%; height: 250px"></code></pre>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      validCycle: go.CycleMode.NotDirected, // don't allow loops\r
      // For this sample, automatically show the state of the diagram's model on the page\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) showModel();\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // This template is a Panel that is used to represent each item in a Panel.itemArray.\r
    // The Panel is data bound to the item object.\r
    var fieldTemplate =\r
      new go.Panel('TableRow', {\r
          // this Panel is a row in the containing Table\r
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
              width: 12,\r
              height: 12,\r
              column: 0,\r
              strokeWidth: 2,\r
              margin: 4,\r
              // but disallow drawing links from or to this shape:\r
              fromLinkable: false,\r
              toLinkable: false\r
            })\r
            .bind('figure', 'figure')\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              margin: new go.Margin(0, 5),\r
              column: 1,\r
              font: 'bold 13px sans-serif',\r
              alignment: go.Spot.Left,\r
              // and disallow drawing links from or to this text:\r
              fromLinkable: false,\r
              toLinkable: false\r
            })\r
            .bind('text', 'name'),\r
          new go.TextBlock({\r
              margin: new go.Margin(0, 5),\r
              column: 2,\r
              font: '13px sans-serif',\r
              alignment: go.Spot.Left\r
            })\r
            .bind('text', 'info')\r
        );\r
\r
    // This template represents a whole "record".\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          copyable: false,\r
          deletable: false\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // this rectangular shape surrounds the content of the node\r
          new go.Shape({ fill: '#EEEEEE' }),\r
\r
          // the content consists of a header and a list of items\r
          new go.Panel('Vertical')\r
            // this is the header for the whole node\r
            .add(\r
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
                  padding: 2,\r
                  minSize: new go.Size(100, 10),\r
                  defaultStretch: go.Stretch.Horizontal,\r
                  itemTemplate: fieldTemplate\r
                })\r
                .bind('itemArray', 'fields')\r
            ) // end Table Panel of items\r
        ); // end Vertical Panel\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          relinkableFrom: true,\r
          relinkableTo: true, // let user reconnect links\r
          toShortLength: 4,\r
          fromShortLength: 2\r
        })\r
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
          loc: '280 0'\r
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
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This record mapper shows a number of "fields" for each "record" and how they are mapped between\r
    each other.\r
  </p>\r
  <p>\r
    Draw new links by dragging from the background of any field. Reconnect a selected link by\r
    dragging its diamond-shaped handle. The "record" Nodes use a\r
    <a>Panel.Table</a> to place the various fields into rows. Records are not copyable or deletable.\r
  </p>\r
  <p>\r
    For a variation on this sample with selectable fields in the record nodes, see the\r
    <a href="selectableFields">selectable fields</a> sample.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`];var g=y();l(`e2m06p`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};