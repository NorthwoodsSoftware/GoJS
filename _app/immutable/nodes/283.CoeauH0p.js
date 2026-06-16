import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`UML Class Diagram Editor`,indexDescription:`A UML Class diagram shows software classes and their properties and methods, and the relationships between them.`,screenshot:`umlclass`,priority:2,tags:[`tables`,`itemarrays`,`treelayout`,`buttons`],description:`UML Class-like nodes showing two collapsible lists of items.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:600px"></div>`,jsCode:`function init() {\r
\r
      myDiagram =\r
        new go.Diagram('myDiagramDiv', {\r
          'undoManager.isEnabled': true,\r
          layout: new go.TreeLayout({\r
            // this only lays out in trees nodes connected by "generalization" links\r
            angle: 90,\r
            path: go.TreePath.Source,  // links go from child to parent\r
            setsPortSpot: false,  // keep Spot.AllSides for link connection spot\r
            setsChildPortSpot: false,  // keep Spot.AllSides\r
            // nodes not connected by "generalization" links are laid out horizontally\r
            arrangement: go.TreeArrangement.Horizontal\r
          })\r
        });\r
\r
      // show visibility or access as a single character at the beginning of each property or method\r
      function convertVisibility(v) {\r
        switch (v) {\r
          case 'public': return '+';\r
          case 'private': return '-';\r
          case 'protected': return '#';\r
          case 'package': return '~';\r
          default: return v;\r
        }\r
      }\r
\r
      // the item template for properties\r
      var propertyTemplate =\r
        new go.Panel('Horizontal')\r
          .add(\r
            // property visibility/access\r
            new go.TextBlock({ isMultiline: false, editable: false, width: 12 })\r
              .bind('text', 'visibility', convertVisibility),\r
            // property name, underlined if scope=="class" to indicate static property\r
            new go.TextBlock({ isMultiline: false, editable: true })\r
              .bindTwoWay('text', 'name')\r
              .bind('isUnderline', 'scope', s => s[0] === 'c'),\r
            // property type, if known\r
            new go.TextBlock('')\r
              .bind('text', 'type', t => t ? ': ' : ''),\r
            new go.TextBlock({ isMultiline: false, editable: true })\r
              .bindTwoWay('text', 'type'),\r
            // property default value, if any\r
            new go.TextBlock({ isMultiline: false, editable: false })\r
              .bind('text', 'default', s => s ? ' = ' + s : '')\r
          );\r
\r
      // the item template for methods\r
      var methodTemplate =\r
        new go.Panel('Horizontal')\r
          .add(\r
            // method visibility/access\r
            new go.TextBlock({ isMultiline: false, editable: false, width: 12 })\r
              .bind('text', 'visibility', convertVisibility),\r
            // method name, underlined if scope=="class" to indicate static method\r
            new go.TextBlock({ isMultiline: false, editable: true })\r
              .bindTwoWay('text', 'name')\r
              .bind('isUnderline', 'scope', s => s[0] === 'c'),\r
            // method parameters\r
            new go.TextBlock('()')\r
              // this does not permit adding/editing/removing of parameters via inplace edits\r
              .bind('text', 'parameters', parr => {\r
                var s = '(';\r
                for (var i = 0; i < parr.length; i++) {\r
                  var param = parr[i];\r
                  if (i > 0) s += ', ';\r
                  s += param.name + ': ' + param.type;\r
                }\r
                return s + ')';\r
              }),\r
            // method return type, if any\r
            new go.TextBlock('')\r
              .bind('text', 'type', t => t ? ': ' : ''),\r
            new go.TextBlock({ isMultiline: false, editable: true })\r
              .bindTwoWay('text', 'type')\r
          );\r
\r
      // this simple template does not have any buttons to permit adding or\r
      // removing properties or methods, but it could!\r
\r
      myDiagram.nodeTemplate =\r
        new go.Node('Auto', {\r
            locationSpot: go.Spot.Center,\r
            fromSpot: go.Spot.AllSides,\r
            toSpot: go.Spot.AllSides\r
          })\r
          .add(\r
            new go.Shape({ fill: 'lightyellow' }),\r
            new go.Panel('Table', { defaultRowSeparatorStroke: 'black' })\r
              .add(\r
                // header\r
                new go.TextBlock({\r
                    row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,\r
                    font: 'bold 12pt sans-serif',\r
                    isMultiline: false, editable: true\r
                  })\r
                  .bindTwoWay('text', 'name'),\r
                // properties\r
                new go.TextBlock('Properties', { row: 1, font: 'italic 10pt sans-serif' })\r
                  .bindObject('visible', 'visible', v => !v, undefined, 'PROPERTIES'),\r
                new go.Panel('Vertical', {\r
                    name: 'PROPERTIES',\r
                    row: 1,\r
                    margin: 3,\r
                    stretch: go.Stretch.Horizontal,\r
                    defaultAlignment: go.Spot.Left,\r
                    background: 'lightyellow',\r
                    itemTemplate: propertyTemplate\r
                  })\r
                  .bind('itemArray', 'properties'),\r
                go.GraphObject.build("PanelExpanderButton", {\r
                    row: 1,\r
                    column: 1,\r
                    alignment: go.Spot.TopRight,\r
                    visible: false\r
                  }, "PROPERTIES")\r
                  .bind('visible', 'properties', arr => arr.length > 0),\r
                // methods\r
                new go.TextBlock('Methods', { row: 2, font: 'italic 10pt sans-serif' })\r
                  .bindObject('visible', 'visible', v => !v, undefined, 'METHODS'),\r
                new go.Panel('Vertical', {\r
                    name: 'METHODS',\r
                    row: 2,\r
                    margin: 3,\r
                    stretch: go.Stretch.Horizontal,\r
                    defaultAlignment: go.Spot.Left,\r
                    background: 'lightyellow',\r
                    itemTemplate: methodTemplate\r
                  })\r
                  .bind('itemArray', 'methods'),\r
                go.GraphObject.build("PanelExpanderButton", {\r
                    row: 2,\r
                    column: 1,\r
                    alignment: go.Spot.TopRight,\r
                    visible: false\r
                  }, "METHODS")\r
                  .bind('visible', 'methods', arr => arr.length > 0)\r
              )\r
          );\r
\r
      const LinkStyle = { isTreeLink: false, fromEndSegmentLength: 0, toEndSegmentLength: 0 };\r
\r
      myDiagram.linkTemplate =\r
        new go.Link(LinkStyle) // by default, "Inheritance" or "Generalization"\r
          .set({ isTreeLink: true })\r
          .add(\r
            new go.Shape(),\r
            new go.Shape({ toArrow: 'Triangle', fill: 'white' })\r
          );\r
\r
      myDiagram.linkTemplateMap.add('Association',\r
        new go.Link(LinkStyle)\r
          .add(\r
            new go.Shape()\r
          ));\r
\r
      myDiagram.linkTemplateMap.add('Realization',\r
        new go.Link(LinkStyle)\r
          .add(\r
            new go.Shape({ strokeDashArray: [3, 2] }),\r
            new go.Shape({ toArrow: 'Triangle', fill: 'white' })\r
          ));\r
\r
      myDiagram.linkTemplateMap.add('Dependency',\r
        new go.Link(LinkStyle)\r
          .add(\r
            new go.Shape({ strokeDashArray: [3, 2] }),\r
            new go.Shape({ toArrow: 'OpenTriangle' })\r
          ));\r
\r
      myDiagram.linkTemplateMap.add('Composition',\r
        new go.Link(LinkStyle)\r
          .add(\r
            new go.Shape(),\r
            new go.Shape({ fromArrow: 'StretchedDiamond', scale: 1.3 }),\r
            new go.Shape({ toArrow: 'OpenTriangle' })\r
          ));\r
\r
      myDiagram.linkTemplateMap.add('Aggregation',\r
        new go.Link(LinkStyle)\r
          .add(\r
            new go.Shape(),\r
            new go.Shape({ fromArrow: 'StretchedDiamond', fill: 'white', scale: 1.3 }),\r
            new go.Shape({ toArrow: 'OpenTriangle' })\r
          ));\r
\r
      // setup a few example class nodes and relationships\r
      var nodedata = [\r
        {\r
          key: 1,\r
          name: 'BankAccount',\r
          properties: [\r
            { name: 'owner', type: 'String', visibility: 'public' },\r
            { name: 'balance', type: 'Currency', visibility: 'public', default: '0' }\r
          ],\r
          methods: [\r
            { name: 'deposit', parameters: [{ name: 'amount', type: 'Currency' }], visibility: 'public' },\r
            { name: 'withdraw', parameters: [{ name: 'amount', type: 'Currency' }], visibility: 'public' }\r
          ]\r
        },\r
        {\r
          key: 11,\r
          name: 'Person',\r
          properties: [\r
            { name: 'name', type: 'String', visibility: 'public' },\r
            { name: 'birth', type: 'Date', visibility: 'protected' }\r
          ],\r
          methods: [\r
            { name: 'getCurrentAge', type: 'int', visibility: 'public' }\r
          ]\r
        },\r
        {\r
          key: 12,\r
          name: 'Student',\r
          properties: [\r
            { name: 'classes', type: 'List<Course>', visibility: 'public' }\r
          ],\r
          methods: [\r
            { name: 'attend', parameters: [{ name: 'class', type: 'Course' }], visibility: 'private' },\r
            { name: 'sleep', visibility: 'private' }\r
          ]\r
        },\r
        {\r
          key: 13,\r
          name: 'Professor',\r
          properties: [\r
            { name: 'classes', type: 'List<Course>', visibility: 'public' }\r
          ],\r
          methods: [\r
            { name: 'teach', parameters: [{ name: 'class', type: 'Course' }], visibility: 'private' }\r
          ]\r
        },\r
        {\r
          key: 14,\r
          name: 'Course',\r
          properties: [\r
            { name: 'name', type: 'String', visibility: 'public' },\r
            { name: 'description', type: 'String', visibility: 'public' },\r
            { name: 'professor', type: 'Professor', visibility: 'public' },\r
            { name: 'location', type: 'String', visibility: 'public' },\r
            { name: 'times', type: 'List<Time>', visibility: 'public' },\r
            { name: 'prerequisites', type: 'List<Course>', visibility: 'public' },\r
            { name: 'students', type: 'List<Student>', visibility: 'public' }\r
          ],\r
          //should figure out a better way to fix this sometime\r
          methods: []\r
        }\r
      ];\r
      var linkdata = [\r
        { from: 12, to: 11 },\r
        { from: 13, to: 11 },\r
        { from: 14, to: 13, relationship: 'Association' }\r
      ];\r
      myDiagram.model = new go.GraphLinksModel({\r
          copiesArrays: true,\r
          copiesArrayObjects: true,\r
          linkCategoryProperty: 'relationship',\r
          nodeDataArray: nodedata,\r
          linkDataArray: linkdata\r
        });\r
    }\r
\r
    window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
      This sample demonstrates one way of defining a UML (Unified Modeling Language) Class Diagram.\r
      Note the use of a separate Panel for the properties and one for the methods,\r
      allowing for an item template for properties and a separate item template for methods. <a href="../intro/buttons#panelExpanderButton"\r
        target="_blank">PanelExpanderButton</a>s are used to hide/show class properties and methods.\r
    </p>\r
    <p>\r
      In this example, symbol prefixes indicate the visibility of methods and properties. The three possibilities are:\r
      <ul>\r
        <li>+ (Public)</li>\r
        <li>- (Private)</li>\r
        <li># (Protected)</li>\r
      </ul>\r
      Additionally, the ~ symbol is used to indicate an item is a package.\r
    </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`treelayout`,`buttons`];var g=y();l(`grt4uz`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};