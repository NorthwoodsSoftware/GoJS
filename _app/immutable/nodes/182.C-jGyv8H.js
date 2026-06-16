import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Magnified View of Portion of Diagram Using Overview`,titleShort:`Magnifier View`,indexDescription:`An Overview used as a magnifying glass.`,screenshot:`magnifier`,priority:2,tags:[`tables`,`treelayout`,`overview`,`commands`],description:`Use a draggable Overview as a kind of magnifying lens.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 700px"></div>\r
  <div id="myOverviewDiv"></div>\r
  <!-- Styled in a <style> tag at the top of the html page -->\r
  <button onclick="showMagnifier()">Show Magnifier</button>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      layout: new go.TreeLayout({ // use a TreeLayout to position all of the nodes\r
          treeStyle: go.TreeStyle.LastParents,\r
          angle: 90,\r
          layerSpacing: 80,\r
          alternateAngle: 0,\r
          alternateAlignment: go.TreeAlignment.Start,\r
          alternateNodeIndent: 20,\r
          alternateNodeIndentPastParent: 1,\r
          alternateNodeSpacing: 20,\r
          alternateLayerSpacing: 40,\r
          alternateLayerSpacingParentOverlap: 1,\r
          alternatePortSpot: new go.Spot(0, 0.999, 20, 0),\r
          alternateChildPortSpot: go.Spot.Left\r
        }),\r
      'commandHandler.doKeyDown': function () {\r
        // method override must be function, not =>\r
        // if (this.diagram.lastInput.key === 'Escape' || this.diagram.lastInput.key === 'Esc') clearMagnifier();\r
        // if (this.diagram.lastInput.key === 'Escape' || this.diagram.lastInput.key === 'Esc') clearMagnifier();\r
        if (this.diagram.lastInput.commandKey === 'Escape') clearMagnifier();\r
        go.CommandHandler.prototype.doKeyDown.call(this);\r
      }\r
    });\r
\r
    // define Converters to be used for Bindings\r
    function theNationFlagConverter(nation) {\r
      return 'https://nwoods.com/go/Flags/' + nation.toLowerCase().replace(/\\s/g, '-') + '-flag.Png';\r
    }\r
\r
    function theInfoTextConverter(info) {\r
      var str = '';\r
      if (info.title) str += 'Title: ' + info.title;\r
      if (info.headOf) str += '\\n\\nHead of: ' + info.headOf;\r
      if (typeof info.boss === 'number') {\r
        var bossinfo = myDiagram.model.findNodeDataForKey(info.boss);\r
        if (bossinfo !== null) {\r
          str += '\\n\\nReporting to: ' + bossinfo.name;\r
        }\r
      }\r
      return str;\r
    }\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { isShadowed: true })\r
        .add(\r
          // the outer shape for the node, surrounding the Table\r
          new go.Shape('Rectangle')\r
            .bindObject('fill', 'isHighlighted', h => h ? 'red' : 'azure'),\r
          // a table to contain the different parts of the node\r
          new go.Panel('Table', {\r
              margin: 4,\r
              maxSize: new go.Size(150, NaN)\r
            })\r
            // the two TextBlocks in column 0 both stretch in width\r
            // but align on the left side\r
            .addColumnDefinition(0, {\r
              stretch: go.Stretch.Horizontal,\r
              alignment: go.Spot.Left\r
            })\r
            .add(\r
              // the name\r
              new go.TextBlock({\r
                  row: 0,\r
                  column: 0,\r
                  maxSize: new go.Size(120, NaN),\r
                  margin: 2,\r
                  font: 'bold 8pt sans-serif',\r
                  alignment: go.Spot.Top\r
                })\r
                .bind('text', 'name'),\r
              // the country flag\r
              new go.Picture({\r
                  row: 0,\r
                  column: 1,\r
                  desiredSize: new go.Size(34, 26),\r
                  margin: 2,\r
                  imageStretch: go.ImageStretch.Uniform,\r
                  alignment: go.Spot.TopRight\r
                })\r
                .bind('source', 'nation', theNationFlagConverter),\r
              // the additional textual information\r
              new go.TextBlock({\r
                  row: 1,\r
                  column: 0,\r
                  columnSpan: 2,\r
                  font: '8pt sans-serif'\r
                })\r
                .bind('text', '', theInfoTextConverter)\r
            )\r
        );\r
\r
    // define the Link template, a simple orthogonal line\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Orthogonal,\r
          selectable: false\r
        })\r
        .add(\r
          new go.Shape({ stroke: '#222' })\r
        ); // the default black link shape\r
\r
    // set up the nodeDataArray, describing each person/position\r
    var nodeDataArray = [\r
      { key: 0, name: 'Ban Ki-moon 반기문', nation: 'South Korea', title: 'Secretary-General of the United Nations', headOf: 'Secretariat' },\r
      {\r
        key: 1,\r
        boss: 0,\r
        name: "Patricia O'Brien",\r
        nation: 'Ireland',\r
        title: 'Under-Secretary-General for Legal Affairs and United Nations Legal Counsel',\r
        headOf: 'Office of Legal Affairs'\r
      },\r
      { key: 3, boss: 1, name: 'Peter Taksøe-Jensen', nation: 'Denmark', title: 'Assistant Secretary-General for Legal Affairs' },\r
      { key: 9, boss: 3, name: 'Other Employees' },\r
      { key: 4, boss: 1, name: 'Maria R. Vicien - Milburn', nation: 'Argentina', title: 'General Legal Division Director', headOf: 'General Legal Division' },\r
      { key: 10, boss: 4, name: 'Other Employees' },\r
      { key: 5, boss: 1, name: 'Václav Mikulka', nation: 'Czech Republic', title: 'Codification Division Director', headOf: 'Codification Division' },\r
      { key: 11, boss: 5, name: 'Other Employees' },\r
      {\r
        key: 6,\r
        boss: 1,\r
        name: 'Sergei Tarassenko',\r
        nation: 'Russia',\r
        title: 'Division for Ocean Affairs and the Law of the Sea Director',\r
        headOf: 'Division for Ocean Affairs and the Law of the Sea'\r
      },\r
      {\r
        key: 12,\r
        boss: 6,\r
        name: 'Alexandre Tagore Medeiros de Albuquerque',\r
        nation: 'Brazil',\r
        title: 'Chairman of the Commission on the Limits of the Continental Shelf',\r
        headOf: 'The Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 17,\r
        boss: 12,\r
        name: 'Peter F. Croker',\r
        nation: 'Ireland',\r
        title: 'Chairman of the Committee on Confidentiality',\r
        headOf: 'The Committee on Confidentiality'\r
      },\r
      { key: 31, boss: 17, name: 'Michael Anselme Marc Rosette', nation: 'Seychelles', title: 'Vice Chairman of the Committee on Confidentiality' },\r
      { key: 32, boss: 17, name: 'Kensaku Tamaki', nation: 'Japan', title: 'Vice Chairman of the Committee on Confidentiality' },\r
      { key: 33, boss: 17, name: 'Osvaldo Pedro Astiz', nation: 'Argentina', title: 'Member of the Committee on Confidentiality' },\r
      { key: 34, boss: 17, name: 'Yuri Borisovitch Kazmin', nation: 'Russia', title: 'Member of the Committee on Confidentiality' },\r
      {\r
        key: 18,\r
        boss: 12,\r
        name: 'Philip Alexander Symonds',\r
        nation: 'Australia',\r
        title: 'Chairman of the Committee on provision of scientific and technical advice to coastal States',\r
        headOf: 'Committee on provision of scientific and technical advice to coastal States'\r
      },\r
      {\r
        key: 35,\r
        boss: 18,\r
        name: 'Emmanuel Kalngui',\r
        nation: 'Cameroon',\r
        title: 'Vice Chairman of the Committee on provision of scientific and technical advice to coastal States'\r
      },\r
      {\r
        key: 36,\r
        boss: 18,\r
        name: 'Sivaramakrishnan Rajan',\r
        nation: 'India',\r
        title: 'Vice Chairman of the Committee on provision of scientific and technical advice to coastal States'\r
      },\r
      {\r
        key: 37,\r
        boss: 18,\r
        name: 'Francis L. Charles',\r
        nation: 'Trinidad and Tobago',\r
        title: 'Member of the Committee on provision of scientific and technical advice to costal States'\r
      },\r
      {\r
        key: 38,\r
        boss: 18,\r
        name: 'Mihai Silviu German',\r
        nation: 'Romania',\r
        title: 'Member of the Committee on provision of scientific and technical advice to costal States'\r
      },\r
      {\r
        key: 19,\r
        boss: 12,\r
        name: 'Lawrence Folajimi Awosika',\r
        nation: 'Nigeria',\r
        title: 'Vice Chairman of the Commission on the Limits of the Continental Shelf'\r
      },\r
      { key: 20, boss: 12, name: 'Harald Brekke', nation: 'Norway', title: 'Vice Chairman of the Commission on the Limits of the Continental Shelf' },\r
      { key: 21, boss: 12, name: 'Yong-Ahn Park', nation: 'South Korea', title: 'Vice Chairman of the Commission on the Limits of the Continental Shelf' },\r
      { key: 22, boss: 12, name: 'Abu Bakar Jaafar', nation: 'Malaysia', title: 'Chairman of the Editorial Committee', headOf: 'Editorial Committee' },\r
      { key: 23, boss: 12, name: 'Galo Carrera Hurtado', nation: 'Mexico', title: 'Chairman of the Training Committee', headOf: 'Training Committee' },\r
      { key: 24, boss: 12, name: 'Indurlall Fagoonee', nation: 'Mauritius', title: 'Member of the Commission on the Limits of the Continental Shelf' },\r
      { key: 25, boss: 12, name: 'George Jaoshvili', nation: 'Georgia', title: 'Member of the Commission on the Limits of the Continental Shelf' },\r
      { key: 26, boss: 12, name: 'Wenzhang Lu', nation: 'China', title: 'Member of the Commission on the Limits of the Continental Shelf' },\r
      { key: 27, boss: 12, name: 'Isaac Owusu Orudo', nation: 'Ghana', title: 'Member of the Commission on the Limits of the Continental Shelf' },\r
      {\r
        key: 28,\r
        boss: 12,\r
        name: 'Fernando Manuel Maia Pimentel',\r
        nation: 'Portugal',\r
        title: 'Member of the Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 7,\r
        boss: 1,\r
        name: 'Renaud Sorieul',\r
        nation: 'France',\r
        title: 'International Trade Law Division Director',\r
        headOf: 'International Trade Law Division'\r
      },\r
      { key: 13, boss: 7, name: 'Other Employees' },\r
      { key: 8, boss: 1, name: 'Annebeth Rosenboom', nation: 'Netherlands', title: 'Treaty Section Chief', headOf: 'Treaty Section' },\r
      { key: 14, boss: 8, name: 'Bradford Smith', nation: 'United States', title: 'Substantive Legal Issues Head', headOf: 'Substantive Legal Issues' },\r
      { key: 29, boss: 14, name: 'Other Employees' },\r
      { key: 15, boss: 8, name: 'Andrei Kolomoets', nation: 'Russia', title: 'Technical/Legal Issues Head', headOf: 'Technical/Legal Issues' },\r
      { key: 30, boss: 15, name: 'Other Employees' },\r
      { key: 16, boss: 8, name: 'Other Employees' },\r
      { key: 2, boss: 0, name: 'Heads of Other Offices/Departments' }\r
    ];\r
\r
    // create the Model with data for the tree, and assign to the Diagram\r
    myDiagram.model = new go.TreeModel({\r
      nodeParentKeyProperty: 'boss', // this property refers to the parent node data\r
      nodeDataArray: nodeDataArray\r
    });\r
  }\r
\r
  var myOverview = null;\r
\r
  function showMagnifier() {\r
    myDiagram.focus();\r
    var myOverviewDiv = document.getElementById('myOverviewDiv');\r
    if (myOverview === null || myOverviewDiv.style.display === 'none') {\r
      // show DIV\r
      myOverviewDiv.style.display = 'inline';\r
      myOverviewDiv.style.left = '0px';\r
      myOverviewDiv.style.top = myDiagram.div.scrollHeight - myOverviewDiv.scrollHeight + 'px';\r
      if (myOverview !== null) {\r
        myOverview.observed = myDiagram;\r
        myOverview.position = new go.Point(-9999, -9999);\r
        return;\r
      }\r
\r
      // create Overview\r
      myOverview = new go.Overview(myOverviewDiv, {\r
        scrollMode: go.ScrollMode.Infinite,\r
        'box.visible': false,\r
        observed: myDiagram, // tell it which Diagram to show\r
        // disable normal Overview functionality to make it act as a magnifying glass:\r
        initialScale: 2, // zoom in even more than normal\r
        autoScale: go.AutoScale.None, // don't show whole observed Diagram\r
        hasHorizontalScrollbar: false, // don't show any scrollbars\r
        hasVerticalScrollbar: false\r
      });\r
\r
      // implement the magnifying glass functionality, to have the Overview show part of the Diagram where the mouse is\r
      myDiagram.toolManager.doMouseMove = function () {\r
        // method override must be function, not =>\r
        go.ToolManager.prototype.doMouseMove.call(this);\r
        var myOverviewDiv = document.getElementById('myOverviewDiv');\r
        if (myOverviewDiv.style.display !== 'none') {\r
          var e = myDiagram.lastInput;\r
          var osize = myOverview.viewportBounds.size;\r
          myOverview.position = new go.Point(e.documentPoint.x - osize.width / 2, e.documentPoint.y - osize.height / 2);\r
          myOverviewDiv.style.left = e.viewPoint.x - myOverviewDiv.scrollWidth / 2 + 'px';\r
          myOverviewDiv.style.top = e.viewPoint.y - myOverviewDiv.scrollHeight / 2 + 'px';\r
        }\r
      };\r
\r
      // implement the magnifying glass functionality, to have the Overview show part of the Diagram where the mouse is\r
      myDiagram.toolManager.doMouseDown = function () {\r
        // method override must be function, not =>\r
        go.ToolManager.prototype.doMouseDown.call(this);\r
        clearMagnifier();\r
      };\r
    } else {\r
      clearMagnifier();\r
    }\r
  }\r
\r
  function clearMagnifier() {\r
    if (myOverview) myOverview.observed = null;\r
    var myOverviewDiv = document.getElementById('myOverviewDiv');\r
    if (myOverviewDiv) myOverviewDiv.style.display = 'none';\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`#myOverviewDiv {\r
    display: none;\r
    position: absolute;\r
    background-color: white;\r
    z-index: 300; /* make sure its in front */\r
    border: solid 1px blue;\r
    width: 200px;\r
    height: 200px;\r
    pointer-events: none;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This variation of the <a href="orgChartStatic">Org Chart (Static)</a> sample uses the <a>Overview</a> diagram as a magnifying glass. The primary\r
    behavior of showing an observed Diagram is kept, but all other behaviors of the Overview are disabled.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`,`overview`,`commands`];var g=y();l(`16l6umb`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};