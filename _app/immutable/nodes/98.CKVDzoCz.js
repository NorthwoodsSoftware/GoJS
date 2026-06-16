import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Various Styles of CheckBoxes in Nodes`,titleShort:`CheckBox Styles`,indexDescription:`Demonstrates simple uses of CheckBoxButtons.`,screenshot:`checkboxes`,priority:2,tags:[`tables`,`itemarrays`,`buttons`,`extensions`],description:`An implementation of CheckBoxes as GoJS objects to show and edit a boolean data property.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px;"></div>\r
  <pre class="lang-js"><code id="mySavedModel" style="width: 100%; height: 300px"></code></pre>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      ModelChanged: e => {\r
        if (!e.isTransactionFinished) return\r
        document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
      },\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // this template includes a lot of CheckBoxes, each configured in different manners\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the Shape will go around the whole table\r
        .add(\r
          new go.Shape({ strokeWidth: 0 }) // no border\r
            .bind('fill', 'color'),\r
          new go.Panel('Table', { padding: 3 })\r
            .add(\r
              new go.TextBlock({ row: 0,\r
                  column: 0,\r
                  columnSpan: 2,\r
                  margin: 3,\r
                  font: 'bold 10pt sans-serif'\r
                }) // some room around the bold text\r
                .bind('text'),\r
              // the first column has an assortment of CheckBoxes\r
              new go.Panel('Vertical', {\r
                  row: 1,\r
                  column: 0,\r
                  defaultAlignment: go.Spot.Left\r
                })\r
                .add(\r
                  go.GraphObject.build('CheckBox', null, 'choice1')\r
                    .add(new go.TextBlock('default')),\r
                  go.GraphObject.build('CheckBox', { 'ButtonIcon.stroke': 'green' }, 'choice2')\r
                    .add(new go.TextBlock('green')),\r
                  go.GraphObject.build('CheckBox', { 'ButtonIcon.stroke': 'red', 'ButtonIcon.figure': 'XLine' }, 'choice3')\r
                    .add(new go.TextBlock('red X')),\r
                  go.GraphObject.build('CheckBox', { _buttonFillOver: 'pink', _buttonStrokeOver: 'red' }, 'choice4')\r
                    .add(new go.TextBlock('pink over')),\r
                  go.GraphObject.build('CheckBox', { 'Button.width': 32, 'Button.height': 32 }, 'choice5')\r
                    .add(new go.TextBlock('BIG', {font: 'bold 12pt sans-serif'})),\r
                  go.GraphObject.build('CheckBox', {\r
                      'Button.width': 20,\r
                      'Button.height': 20,\r
                      'ButtonBorder.figure': 'Circle',\r
                      'ButtonBorder.stroke': 'blue',\r
                      'ButtonIcon.figure': 'Circle',\r
                      'ButtonIcon.fill': 'blue',\r
                      'ButtonIcon.strokeWidth': 0,\r
                      'ButtonIcon.desiredSize': new go.Size(10, 10)\r
                    }, 'choice6')\r
                    .add(new go.TextBlock('blue circle')),\r
                  go.GraphObject.build('CheckBox', {type: go.Panel.Vertical}, 'choice7')\r
                    .add(new go.TextBlock('vertical'))\r
                ),\r
              // the second column is a list of CheckBoxes\r
              new go.Panel('Table', {\r
                  row: 1,\r
                  column: 1,\r
                  alignment: go.Spot.Top,\r
                  minSize: new go.Size(50, NaN),\r
                  itemTemplate:\r
                    new go.Panel("TableRow")\r
                      .add(\r
                        go.GraphObject.build('CheckBox', {column: 1, alignment: go.Spot.Right}, '')\r
                          .apply(n => { // apply is needed because insertAt doesn't return anything\r
                            n.insertAt(0, // add the textblock before the check button so that it is on the left\r
                              new go.TextBlock({column: 0})\r
                                .bind('text', 'name')\r
                            )\r
                          })\r
                      )\r
                })\r
                .bind('itemArray', 'items'),\r
              go.GraphObject.build('CheckBox', { // now a checkbox at the bottom of the whole table, not data bound\r
                  row: 3,\r
                  columnSpan: 2,\r
                  alignment: go.Spot.Left,\r
                  // _doClick is executed within a transaction by the CheckBoxButton click function\r
                  _doClick: (e, obj) => {\r
                    obj.part.movable = !obj.part.movable; // toggle the Part.movable flag\r
                  }\r
                }, '')\r
                // this checkbox is not bound to model data, but it does toggle the Part.movable\r
                // property of the Node that this is in\r
                .add(new go.TextBlock('Node is not movable'))\r
            )\r
        );\r
\r
    // but use the default Link template, by not setting Diagram.linkTemplate\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          key: 1,\r
          text: 'Alpha',\r
          color: 'lightblue',\r
          choice1: true,\r
          choice2: true,\r
          choice3: true,\r
          choice4: true,\r
          choice5: true,\r
          choice6: true,\r
          choice7: true,\r
          items: [{ name: 'item 0' }, { name: 'item 1' }, { name: 'item 2' }]\r
        },\r
        {\r
          key: 2,\r
          text: 'Beta',\r
          color: 'orange',\r
          items: [\r
            { name: 'B1', checked: false },\r
            { name: 'Bee2', checked: true }\r
          ]\r
        },\r
        {\r
          key: 3,\r
          text: 'Gamma',\r
          color: 'lightgreen',\r
          items: [{ name: 'C-one', checked: true }, { name: 'C-two', checked: true }, { name: 'C-three' }]\r
        },\r
        {\r
          key: 4,\r
          text: 'Delta',\r
          color: 'pink',\r
          choice1: true,\r
          choice2: false,\r
          items: []\r
        }\r
      ],\r
      linkDataArray: [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows many examples of how to use the predefined checkboxes\r
    inside GoJS and how they can be customized. These premade <a>Panel</a>s exist for\r
    common structures needed in many <a>Node</a> templates. To create a checkbox call:\r
  </p>\r
\r
  <!-- DESC_CODE_BLOCK_0 -->\r
\r
  <p>\r
    <code>null</code> is in place of the optional properties object, <code>'choice1'</code>\r
    is the name of the <a>Shape</a> that has its <a>GraphObject.visible</a>\r
    property toggled. This represents the value of the checkbox.\r
  </p>\r
\r
  <p>\r
    For more inforamtion on these predefined panels see\r
    <a href="../intro/buttons">Buttons</a>. You can see how they are defined\r
    in <a href="../extensions/Buttons.js">Buttons.js</a>.\r
  </p>\r
  <p>\r
    Below is the <a>Diagram.model</a>'s <a>Model.modelData</a>. It will update\r
    automatically as the model data changes through interactions with the\r
    <a>Diagram</a>.\r
  </p>`,descriptionCodeBlocks:[{code:`go.GraphObject.build('CheckBox', null, 'choice1')`,language:`js`}]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`buttons`,`extensions`];var g=y();l(`18zxb86`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};