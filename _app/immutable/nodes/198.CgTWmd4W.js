import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Organizational Chart Diagram with Overview and Search`,titleShort:`Org Chart with Overview`,indexDescription:`Shows an organizational chart, uses an in-laid Overview to aid the user in navigation, and allows the user to search by example.`,screenshot:`orgchartstatic`,priority:.7,tags:[`tables`,`treelayout`,`overview`],description:`A larger org chart with an Overview and searching capability.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="background-color: #f2f2f2; border: solid 1px black; width: 100%; height: 700px"></div>\r
  <div id="myOverviewDiv"></div>\r
  <!-- Styled in a <style> tag at the top of the html page -->\r
  <div style="margin-block: .5em;">\r
    <input type="search" id="mySearch" onkeypress="if (event.keyCode === 13) searchDiagram()" style="padding: 8px; width: 200px;"/>\r
    <button onclick="searchDiagram()" style="padding: 8px">Search</button>    \r
  </div>`,jsCode:`function init() {\r
    // some constants that will be reused within templates\r
    const mt8 = new go.Margin(8, 0, 0, 0);\r
    const mr8 = new go.Margin(0, 8, 0, 0);\r
    const ml8 = new go.Margin(0, 0, 0, 8);\r
    const roundedRectangleParams = {\r
      parameter1: 2, // set the rounded corner\r
      spot1: go.Spot.TopLeft,\r
      spot2: go.Spot.BottomRight // make content go all the way to inside edges of rounded corners\r
    };\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // Put the diagram contents at the top center of the viewport\r
      initialDocumentSpot: go.Spot.Top,\r
      initialViewportSpot: go.Spot.Top,\r
      // OR: Scroll to show a particular node, once the layout has determined where that node is\r
      // "InitialLayoutCompleted": e => {\r
      //  var node = e.diagram.findNodeForKey(28);\r
      //  if (node !== null) e.diagram.commandHandler.scrollToPart(node);\r
      // },\r
      layout: new go.TreeLayout({\r
        // use a TreeLayout to position all of the nodes\r
        isOngoing: false, // don't relayout when expanding/collapsing panels\r
        treeStyle: go.TreeStyle.LastParents,\r
        // properties for most of the tree:\r
        angle: 90,\r
        layerSpacing: 80,\r
        // properties for the "last parents":\r
        alternateAngle: 0,\r
        alternateAlignment: go.TreeAlignment.Start,\r
        alternateNodeIndent: 15,\r
        alternateNodeIndentPastParent: 1,\r
        alternateNodeSpacing: 15,\r
        alternateLayerSpacing: 40,\r
        alternateLayerSpacingParentOverlap: 1,\r
        alternatePortSpot: new go.Spot(0.001, 1, 20, 0),\r
        alternateChildPortSpot: go.Spot.Left\r
      })\r
    });\r
\r
    // This function provides a common style for most of the TextBlocks.\r
    function textStyle(node, field) {\r
      node.font = '12px Roboto, sans-serif';\r
      node.stroke = 'rgba(0, 0, 0, .60)';\r
      node.visible = false; // only show textblocks when there is corresponding data for them\r
      node.bind('visible', field, val => val !== undefined);\r
    }\r
\r
    // define Converters to be used for Bindings\r
    function theNationFlagConverter(nation) {\r
      return 'https://nwoods.com/images/emojiflags/' + nation + '.png';\r
    }\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Top,\r
          isShadowed: true,\r
          shadowBlur: 1,\r
          shadowOffset: new go.Point(0, 1),\r
          shadowColor: 'rgba(0, 0, 0, .14)',\r
          // selection adornment to match shape of nodes\r
          selectionAdornmentTemplate:\r
            new go.Adornment('Auto')\r
              .add(\r
                new go.Shape('RoundedRectangle', { fill: null, stroke: '#7986cb', strokeWidth: 3 })\r
                  .set(roundedRectangleParams),\r
                new go.Placeholder()\r
              ) // end Adornment\r
        })\r
        .add(\r
          new go.Shape('RoundedRectangle', { name: 'SHAPE', fill: '#ffffff', strokeWidth: 0 })\r
            .set(roundedRectangleParams)\r
            // gold if highlighted, white otherwise\r
            .bindObject('fill', 'isHighlighted', h => h ? 'gold' : '#ffffff'),\r
          new go.Panel('Vertical')\r
            .add(\r
              new go.Panel('Horizontal', { margin: 8 })\r
                .add(\r
                  new go.Picture({ // flag image, only visible if a nation is specified\r
                      margin: mr8,\r
                      visible: false,\r
                      desiredSize: new go.Size(50, 50)\r
                    })\r
                    .bind('source', 'nation', theNationFlagConverter)\r
                    .bind('visible', 'nation', nat => nat !== undefined),\r
                  new go.Panel('Table')\r
                    .add(\r
                      new go.TextBlock({\r
                          row: 0,\r
                          alignment: go.Spot.Left,\r
                          font: '16px Roboto, sans-serif',\r
                          stroke: 'rgba(0, 0, 0, .87)',\r
                          maxSize: new go.Size(160, NaN)\r
                        })\r
                        .bind('text', 'name'),\r
                      new go.TextBlock({\r
                          row: 1,\r
                          alignment: go.Spot.Left,\r
                          maxSize: new go.Size(160, NaN)\r
                        })\r
                        .apply(textStyle, 'title')\r
                        .bind('text', 'title'),\r
                      go.GraphObject.build('PanelExpanderButton', { row: 0, column: 1, rowSpan: 2, margin: ml8 }, 'INFO')\r
                    )\r
                ),\r
              new go.Shape('LineH', {\r
                  stroke: 'rgba(0, 0, 0, .60)',\r
                  strokeWidth: 1,\r
                  height: 1,\r
                  stretch: go.Stretch.Horizontal\r
                })\r
                .bindObject('visible', undefined, null, null, 'INFO'), // only visible when info is expanded\r
              new go.Panel('Vertical', {\r
                  name: 'INFO', // identify to the PanelExpanderButton\r
                  stretch: go.Stretch.Horizontal, // take up whole available width\r
                  margin: 8,\r
                  defaultAlignment: go.Spot.Left // thus no need to specify alignment on each element\r
                })\r
                .add(\r
                  new go.TextBlock()\r
                    .apply(textStyle, 'headOf')\r
                    .bind('text', 'headOf', head => 'Head of: ' + head),\r
                  new go.TextBlock()\r
                    .apply(textStyle, 'boss')\r
                    .bind('margin', 'headOf', head => mt8) // some space above if there is also a headOf value\r
                    .bind('text', 'boss', boss => {\r
                      var boss = myDiagram.model.findNodeDataForKey(boss);\r
                      if (boss !== null) return 'Reporting to: ' + boss.name;\r
                      return '';\r
                    })\r
                )\r
            )\r
        );\r
\r
    // define the Link template, a simple orthogonal line\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Orthogonal,\r
          corner: 5,\r
          selectable: false\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 3, stroke: '#424242' }) // dark gray, rounded corner links\r
        );\r
\r
    // set up the nodeDataArray, describing each person/position\r
    var nodeDataArray = [\r
      {\r
        key: 0,\r
        name: 'Ban Ki-moon 반기문',\r
        nation: 'SouthKorea',\r
        title: 'Secretary-General of the United Nations',\r
        headOf: 'Secretariat'\r
      },\r
      {\r
        key: 1,\r
        boss: 0,\r
        name: "Patricia O'Brien",\r
        nation: 'Ireland',\r
        title: 'Under-Secretary-General for Legal Affairs and United Nations Legal Counsel',\r
        headOf: 'Office of Legal Affairs'\r
      },\r
      {\r
        key: 3,\r
        boss: 1,\r
        name: 'Peter Taksøe-Jensen',\r
        nation: 'Denmark',\r
        title: 'Assistant Secretary-General for Legal Affairs'\r
      },\r
      { key: 9, boss: 3, name: 'Other Employees' },\r
      {\r
        key: 4,\r
        boss: 1,\r
        name: 'Maria R. Vicien - Milburn',\r
        nation: 'Argentina',\r
        title: 'General Legal Division Director',\r
        headOf: 'General Legal Division'\r
      },\r
      { key: 10, boss: 4, name: 'Other Employees' },\r
      {\r
        key: 5,\r
        boss: 1,\r
        name: 'Václav Mikulka',\r
        nation: 'CzechRepublic',\r
        title: 'Codification Division Director',\r
        headOf: 'Codification Division'\r
      },\r
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
      {\r
        key: 31,\r
        boss: 17,\r
        name: 'Michael Anselme Marc Rosette',\r
        nation: 'Seychelles',\r
        title: 'Vice Chairman of the Committee on Confidentiality'\r
      },\r
      {\r
        key: 32,\r
        boss: 17,\r
        name: 'Kensaku Tamaki',\r
        nation: 'Japan',\r
        title: 'Vice Chairman of the Committee on Confidentiality'\r
      },\r
      {\r
        key: 33,\r
        boss: 17,\r
        name: 'Osvaldo Pedro Astiz',\r
        nation: 'Argentina',\r
        title: 'Member of the Committee on Confidentiality'\r
      },\r
      {\r
        key: 34,\r
        boss: 17,\r
        name: 'Yuri Borisovitch Kazmin',\r
        nation: 'Russia',\r
        title: 'Member of the Committee on Confidentiality'\r
      },\r
      {\r
        key: 18,\r
        boss: 12,\r
        name: 'Philip Alexander Symonds',\r
        nation: 'Australia',\r
        title:\r
          'Chairman of the Committee on provision of scientific and technical advice to coastal States',\r
        headOf: 'Committee on provision of scientific and technical advice to coastal States'\r
      },\r
      {\r
        key: 35,\r
        boss: 18,\r
        name: 'Emmanuel Kalngui',\r
        nation: 'Cameroon',\r
        title:\r
          'Vice Chairman of the Committee on provision of scientific and technical advice to coastal States'\r
      },\r
      {\r
        key: 36,\r
        boss: 18,\r
        name: 'Sivaramakrishnan Rajan',\r
        nation: 'India',\r
        title:\r
          'Vice Chairman of the Committee on provision of scientific and technical advice to coastal States'\r
      },\r
      {\r
        key: 37,\r
        boss: 18,\r
        name: 'Francis L. Charles',\r
        nation: 'TrinidadAndTobago',\r
        title:\r
          'Member of the Committee on provision of scientific and technical advice to costal States'\r
      },\r
      {\r
        key: 38,\r
        boss: 18,\r
        name: 'Mihai Silviu German',\r
        nation: 'Romania',\r
        title:\r
          'Member of the Committee on provision of scientific and technical advice to costal States'\r
      },\r
      {\r
        key: 19,\r
        boss: 12,\r
        name: 'Lawrence Folajimi Awosika',\r
        nation: 'Nigeria',\r
        title: 'Vice Chairman of the Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 20,\r
        boss: 12,\r
        name: 'Harald Brekke',\r
        nation: 'Norway',\r
        title: 'Vice Chairman of the Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 21,\r
        boss: 12,\r
        name: 'Yong-Ahn Park',\r
        nation: 'SouthKorea',\r
        title: 'Vice Chairman of the Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 22,\r
        boss: 12,\r
        name: 'Abu Bakar Jaafar',\r
        nation: 'Malaysia',\r
        title: 'Chairman of the Editorial Committee',\r
        headOf: 'Editorial Committee'\r
      },\r
      {\r
        key: 23,\r
        boss: 12,\r
        name: 'Galo Carrera Hurtado',\r
        nation: 'Mexico',\r
        title: 'Chairman of the Training Committee',\r
        headOf: 'Training Committee'\r
      },\r
      {\r
        key: 24,\r
        boss: 12,\r
        name: 'Indurlall Fagoonee',\r
        nation: 'Mauritius',\r
        title: 'Member of the Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 25,\r
        boss: 12,\r
        name: 'George Jaoshvili',\r
        nation: 'Georgia',\r
        title: 'Member of the Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 26,\r
        boss: 12,\r
        name: 'Wenzhang Lu',\r
        nation: 'China',\r
        title: 'Member of the Commission on the Limits of the Continental Shelf'\r
      },\r
      {\r
        key: 27,\r
        boss: 12,\r
        name: 'Isaac Owusu Orudo',\r
        nation: 'Ghana',\r
        title: 'Member of the Commission on the Limits of the Continental Shelf'\r
      },\r
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
      {\r
        key: 8,\r
        boss: 1,\r
        name: 'Annebeth Rosenboom',\r
        nation: 'Netherlands',\r
        title: 'Treaty Section Chief',\r
        headOf: 'Treaty Section'\r
      },\r
      {\r
        key: 14,\r
        boss: 8,\r
        name: 'Bradford Smith',\r
        nation: 'UnitedStates',\r
        title: 'Substantive Legal Issues Head',\r
        headOf: 'Substantive Legal Issues'\r
      },\r
      { key: 29, boss: 14, name: 'Other Employees' },\r
      {\r
        key: 15,\r
        boss: 8,\r
        name: 'Andrei Kolomoets',\r
        nation: 'Russia',\r
        title: 'Technical/Legal Issues Head',\r
        headOf: 'Technical/Legal Issues'\r
      },\r
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
\r
    // Overview\r
    myOverview = new go.Overview('myOverviewDiv', {\r
      observed: myDiagram, // tell it which Diagram to show and pan\r
      contentAlignment: go.Spot.Center\r
    });\r
  }\r
\r
  // the Search functionality highlights all of the nodes that have at least one data property match a RegExp\r
  function searchDiagram() {\r
    // called by button\r
    var input = document.getElementById('mySearch');\r
    if (!input) return;\r
    myDiagram.focus();\r
\r
    myDiagram.startTransaction('highlight search');\r
\r
    if (input.value) {\r
      // search four different data properties for the string, any of which may match for success\r
      // create a case insensitive RegExp from what the user typed\r
      var safe = input.value.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');\r
      var regex = new RegExp(safe, 'i');\r
      var results = myDiagram.findNodesByExample(\r
        { name: regex },\r
        { nation: regex },\r
        { title: regex },\r
        { headOf: regex }\r
      );\r
      myDiagram.highlightCollection(results);\r
      // try to center the diagram at the first node that was found\r
      if (results.count > 0) myDiagram.commandHandler.scrollToPart(results.first());\r
    } else {\r
      // empty string only clears highlighteds collection\r
      myDiagram.clearHighlighteds();\r
    }\r
\r
    myDiagram.commitTransaction('highlight search');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`#myOverviewDiv {\r
    position: absolute;\r
    width: 200px;\r
    height: 100px;\r
    top: 10px;\r
    left: 10px;\r
    background-color: #f2f2f2;\r
    z-index: 300;\r
    /* make sure its in front */\r
    border: solid 1px #7986cb;\r
  }`,externalStyles:[`https://fonts.googleapis.com/css?family=Roboto:400,500`],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows an organizational chart diagram and uses an in-laid GoJS <a>Overview</a> to\r
    aid the user in navigation. The diagram uses a <a>TreeLayout</a> featuring\r
    <a>TreeStyle.LastParents</a> to allow for different alignments on the last parents. The data was\r
    taken from the UN web site in August 2009.\r
  </p>\r
  <p>\r
    A search box demonstrates one way of finding and highlighting nodes whose data includes\r
    particular strings. Note that one can see all of the highlighted nodes in the Overview.\r
  </p>\r
  <p>\r
    To learn how to build an org chart from scratch with GoJS, see the\r
    <a href="../learn">Getting Started tutorial</a>.\r
  </p>\r
  <p>\r
    If you want to have some "assistant" nodes on the side, above the regular reports, see the\r
    <a href="orgChartAssistants">Org Chart Assistants</a> sample, which is a copy of this\r
    sample that uses a custom <a>TreeLayout</a> to position "assistants" that way.\r
  </p>\r
  <p>\r
    Flag images are from <a href="https://openmoji.org/">OpenMoji</a> – the open-source emoji and\r
    icon project. License: CC BY-SA 4.0.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`,`overview`];var g=y();l(`cyvwh`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};