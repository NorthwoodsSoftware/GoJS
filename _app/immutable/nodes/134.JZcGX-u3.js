import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Entity Relationship Diagram Nodes have Collapsible Lists of Attributes`,titleShort:`Entity Relationship Diagram`,indexDescription:`An entity relationship diagram, showcasing data binding with item arrays.`,screenshot:`entityrelationship`,priority:2,tags:[`tables`,`itemarrays`,`force-directed`,`buttons`,`theme`],description:`Interactive entity-relationship diagram or data model diagram implemented by GoJS in JavaScript for HTML.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 700px"></div>\r
  Theme:\r
  <select id="theme" onchange="changeTheme()">\r
    <option value="system">System</option>\r
    <option value="light">Light</option>\r
    <option value="dark">Dark</option>\r
  </select>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowDelete: false,\r
      allowCopy: false,\r
      layout: new go.ForceDirectedLayout({ isInitial: false }),\r
      'undoManager.isEnabled': true,\r
      // use "Modern" themes from extensions/Themes\r
      'themeManager.themeMap': new go.Map([\r
        { key: 'light', value: Modern },\r
        { key: 'dark', value: ModernDark }\r
      ]),\r
      'themeManager.changesDivBackground': true,\r
      'themeManager.currentTheme': document.getElementById('theme').value\r
    });\r
\r
    myDiagram.themeManager.set('light', {\r
      colors: {\r
        primary: '#f7f9fc',\r
        green: '#62bd8e',\r
        blue: '#3999bf',\r
        purple: '#7f36b0',\r
        red: '#c41000'\r
      }\r
    });\r
    myDiagram.themeManager.set('dark', {\r
      colors: {\r
        primary: '#4a4a4a',\r
        green: '#429e6f',\r
        blue: '#3f9fc6',\r
        purple: '#9951c9',\r
        red: '#ff4d3d'\r
      }\r
    });\r
\r
    // the template for each attribute in a node's array of item data\r
    const itemTempl =\r
      new go.Panel('Horizontal', { margin: new go.Margin(2, 0) })\r
        .add(\r
          new go.Shape({\r
              desiredSize: new go.Size(15, 15),\r
              strokeWidth: 0,\r
              margin: new go.Margin(0, 5, 0, 0)\r
            })\r
            .bind('figure')\r
            .themeData('fill', 'color'),\r
          new go.TextBlock({\r
              font: '14px sans-serif',\r
              stroke: 'black'\r
            })\r
            .bind('text', 'name')\r
            .bind('font', 'iskey', k => k ? 'italic 14px sans-serif' : '14px sans-serif')\r
            .theme('stroke', 'text')\r
        );\r
\r
    // define the Node template, representing an entity\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { // the whole node panel\r
          selectionAdorned: true,\r
          resizable: true,\r
          layoutConditions: go.LayoutConditions.Standard & ~go.LayoutConditions.NodeSized,\r
          fromSpot: go.Spot.LeftRightSides,\r
          toSpot: go.Spot.LeftRightSides\r
        })\r
        .bindTwoWay('location')\r
        // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,\r
        // clear out any desiredSize set by the ResizingTool.\r
        .bindObject('desiredSize', 'visible', v => new go.Size(NaN, NaN), undefined, 'LIST')\r
        .add(\r
          // define the node's outer shape, which will surround the Table\r
          new go.Shape('RoundedRectangle', {\r
              stroke: '#e8f1ff',\r
              strokeWidth: 3\r
            })\r
            .theme('fill', 'primary'),\r
          new go.Panel('Table', {\r
              margin: 8,\r
              stretch: go.Stretch.Fill\r
            })\r
            .addRowDefinition(0, { sizing: go.Sizing.None })\r
            .add(\r
              // the table header\r
              new go.TextBlock({\r
                  row: 0,\r
                  alignment: go.Spot.Center,\r
                  margin: new go.Margin(0, 24, 0, 2), // leave room for Button\r
                  font: 'bold 18px sans-serif'\r
                })\r
                .bind('text', 'key')\r
                .theme('stroke', 'text'),\r
              // the collapse/expand button\r
              go.GraphObject.build('PanelExpanderButton', {\r
                  row: 0,\r
                  alignment: go.Spot.TopRight\r
                },'LIST') // the name of the element whose visibility this button toggles\r
                .theme('ButtonIcon.stroke', 'text'),\r
              new go.Panel('Table', {\r
                  name: 'LIST',\r
                  row: 1,\r
                  alignment: go.Spot.TopLeft\r
                })\r
                .add(\r
                  new go.TextBlock('Attributes', {\r
                      row: 0,\r
                      alignment: go.Spot.Left,\r
                      margin: new go.Margin(3, 24, 3, 2),\r
                      font: 'bold 15px sans-serif'\r
                    })\r
                    .theme('stroke', 'text'),\r
                  go.GraphObject.build('PanelExpanderButton', {\r
                      row: 0,\r
                      alignment: go.Spot.Right\r
                    }, 'NonInherited')\r
                    .theme('ButtonIcon.stroke', 'text'),\r
                  new go.Panel('Vertical', {\r
                      row: 1,\r
                      name: 'NonInherited',\r
                      alignment: go.Spot.TopLeft,\r
                      defaultAlignment: go.Spot.Left,\r
                      itemTemplate: itemTempl\r
                    })\r
                    .bind('itemArray', 'items'),\r
                  new go.TextBlock('Inherited Attributes', {\r
                      row: 2,\r
                      alignment: go.Spot.Left,\r
                      margin: new go.Margin(3, 24, 3, 2), // leave room for Button\r
                      font: 'bold 15px sans-serif'\r
                    })\r
                    .bind('visible', 'inheritedItems', arr => Array.isArray(arr) && arr.length > 0)\r
                    .theme('stroke', 'text'),\r
                  go.GraphObject.build('PanelExpanderButton', {\r
                      row: 2,\r
                      alignment: go.Spot.Right\r
                    }, 'Inherited')\r
                    .bind('visible', 'inheritedItems', arr => Array.isArray(arr) && arr.length > 0)\r
                    .theme('ButtonIcon.stroke', 'text'),\r
                  new go.Panel('Vertical', {\r
                      row: 3,\r
                      name: 'Inherited',\r
                      alignment: go.Spot.TopLeft,\r
                      defaultAlignment: go.Spot.Left,\r
                      itemTemplate: itemTempl\r
                    })\r
                    .bind('itemArray', 'inheritedItems')\r
                )\r
            )\r
        );\r
\r
    // define the Link template, representing a relationship\r
    myDiagram.linkTemplate =\r
      new go.Link({ // the whole link panel\r
          selectionAdorned: true,\r
          layerName: 'Background',\r
          reshapable: true,\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 5,\r
          curve: go.Curve.JumpOver\r
        })\r
        .add(\r
          new go.Shape({ // the link shape\r
              stroke: '#f7f9fc',\r
              strokeWidth: 3\r
            })\r
            .theme('stroke', 'link'),\r
          new go.TextBlock({ // the "from" label\r
              textAlign: 'center',\r
              font: 'bold 14px sans-serif',\r
              stroke: 'black',\r
              segmentIndex: 0,\r
              segmentOffset: new go.Point(NaN, NaN),\r
              segmentOrientation: go.Orientation.Upright\r
            })\r
            .bind('text')\r
            .theme('stroke', 'text'),\r
          new go.TextBlock({ // the "to" label\r
              textAlign: 'center',\r
              font: 'bold 14px sans-serif',\r
              stroke: 'black',\r
              segmentIndex: -1,\r
              segmentOffset: new go.Point(NaN, NaN),\r
              segmentOrientation: go.Orientation.Upright\r
            })\r
            .bind('text', 'toText')\r
            .theme('stroke', 'text')\r
          );\r
\r
    // create the model for the E-R diagram\r
    const nodeDataArray = [\r
      {\r
        key: 'Products',\r
        location: new go.Point(250, 250),\r
        items: [\r
          { name: 'ProductID', iskey: true, figure: 'Decision', color: 'purple' },\r
          { name: 'ProductName', iskey: false, figure: 'Hexagon', color: 'blue' },\r
          { name: 'ItemDescription', iskey: false, figure: 'Hexagon', color: 'blue' },\r
          { name: 'WholesalePrice', iskey: false, figure: 'Circle', color: 'green' },\r
          { name: 'ProductPhoto', iskey: false, figure: 'TriangleUp', color: 'red' }\r
        ],\r
        inheritedItems: [\r
          { name: 'SupplierID', iskey: false, figure: 'Decision', color: 'purple' },\r
          { name: 'CategoryID', iskey: false, figure: 'Decision', color: 'purple' }\r
        ]\r
      },\r
      {\r
        key: 'Suppliers',\r
        location: new go.Point(500, 0),\r
        items: [\r
          { name: 'SupplierID', iskey: true, figure: 'Decision', color: 'purple' },\r
          { name: 'CompanyName', iskey: false, figure: 'Hexagon', color: 'blue' },\r
          { name: 'ContactName', iskey: false, figure: 'Hexagon', color: 'blue' },\r
          { name: 'Address', iskey: false, figure: 'Hexagon', color: 'blue' },\r
          { name: 'ShippingDistance', iskey: false, figure: 'Circle', color: 'green' },\r
          { name: 'Logo', iskey: false, figure: 'TriangleUp', color: 'red' }\r
        ],\r
        inheritedItems: []\r
      },\r
      {\r
        key: 'Categories',\r
        location: new go.Point(0, 30),\r
        items: [\r
          { name: 'CategoryID', iskey: true, figure: 'Decision', color: 'purple' },\r
          { name: 'CategoryName', iskey: false, figure: 'Hexagon', color: 'blue' },\r
          { name: 'Description', iskey: false, figure: 'Hexagon', color: 'blue' },\r
          { name: 'Icon', iskey: false, figure: 'TriangleUp', color: 'red' }\r
        ],\r
        inheritedItems: [{ name: 'SupplierID', iskey: false, figure: 'Decision', color: 'purple' }]\r
      },\r
      {\r
        key: 'Order Details',\r
        location: new go.Point(600, 350),\r
        items: [\r
          { name: 'OrderID', iskey: true, figure: 'Decision', color: 'purple' },\r
          { name: 'UnitPrice', iskey: false, figure: 'Circle', color: 'green' },\r
          { name: 'Quantity', iskey: false, figure: 'Circle', color: 'green' },\r
          { name: 'Discount', iskey: false, figure: 'Circle', color: 'green' }\r
        ],\r
        inheritedItems: [{ name: 'ProductID', iskey: false, figure: 'Decision', color: 'purple' }]\r
      }\r
    ];\r
    const linkDataArray = [\r
      { from: 'Products', to: 'Suppliers', text: '0..N', toText: '1' },\r
      { from: 'Products', to: 'Categories', text: '0..N', toText: '1' },\r
      { from: 'Order Details', to: 'Products', text: '0..N', toText: '1' },\r
      { from: 'Categories', to: 'Suppliers', text: '0..N', toText: '1' }\r
    ];\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: nodeDataArray,\r
      linkDataArray: linkDataArray\r
    });\r
  }\r
\r
  const changeTheme = () => {\r
    const myDiagram = go.Diagram.fromDiv('myDiagramDiv');\r
    if (myDiagram) {\r
      myDiagram.themeManager.currentTheme = document.getElementById('theme').value;\r
    }\r
  };\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/Themes.js`],descriptionHtml:`<p>\r
    Sample for representing the relationship between various entities. Try dragging the nodes -- their links will avoid other nodes, by virtue of the\r
    <a>Routing.AvoidsNodes</a> property assigned to the custom link template's <a>Link.routing</a>. Also note the use of\r
    <a href="../intro/buttons" target="_blank">Panel Expander Buttons</a> to allow for expandable/collapsible node data.\r
  </p>\r
  <p>Buttons are defined in <a href="../extensions/Buttons.js">Buttons.js</a>.</p>\r
  <p>The dark and light themes are controlled using the <a>ThemeManager</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`force-directed`,`buttons`,`theme`];var g=y();l(`1rq1i32`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};