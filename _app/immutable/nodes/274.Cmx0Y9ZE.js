import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Various Styles of Toggles in Nodes`,titleShort:`Toggle Styles`,indexDescription:`Demonstrates simple uses of ToggleSwitches.`,screenshot:`Toggles`,priority:2,tags:[`tables`,`itemarrays`,`buttons`,`extensions`],description:`An implementation of Toggles as GoJS objects to show and edit a boolean data property.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  <p>\r
    Below is the <a>Diagram.model</a>'s <a>Model.modelData</a>. It will update\r
    automatically as you toggle the switches above, which update the model data.\r
  </p>\r
  <pre class="lang-js"><code id="mySavedModel" style="width: 100%; height: 300px"></code></pre>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      ModelChanged: e => {\r
        if (!e.isTransactionFinished) return\r
        document.getElementById('mySavedModel').innerHTML = myDiagram.model.toJson();\r
      },\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "lightgray" }),\r
          new go.Panel("Vertical", { margin: 8 })\r
            .add(\r
              new go.TextBlock({ font: "bold 10pt sans-serif", margin: 2 })\r
                .bind("text"),\r
              new go.Panel("Horizontal")\r
                .add(\r
                  // without a label, default\r
                  go.GraphObject.build("ToggleSwitch", { margin: 2 }, "tog0"),\r
                  // without a label, vertical\r
                  go.GraphObject.build("ToggleSwitch", { margin: 2 }, "togV", true)\r
                ),\r
              // without a label, but lots of customizations\r
              go.GraphObject.build("ToggleSwitch", {\r
                  margin: 2,\r
                  width: 50, height: 20,\r
                }, "tog1")\r
                .attach({\r
                  "ButtonIcon.width": 15, "ButtonIcon.height": 15,\r
                  "ButtonBorder.figure": "Rectangle", "ButtonIcon.figure": "Square",\r
                  "ButtonBorder.fill": "#AAAAAA", "ButtonBorder.stroke": "gray", "ButtonIcon.fill": "lightgray",\r
                  "_buttonFillOff": "#AAAAAA", "_buttonBorderOff": "gray", "_buttonIconFillOff": "lightgray",\r
                  "_buttonFillOn": "skyblue", "_buttonBorderOn": "deepskyblue", "_buttonIconFillOn": "deepskyblue",\r
                }),\r
              // with a label, bound color, label first\r
              go.GraphObject.build("Toggle", {\r
                  margin: 2, isOpposite: true,  // label first\r
                  "Button._buttonIconFillOn": "gold", "Button._buttonIconFillOff": "#FFFF0040",\r
                }, "tog2")\r
                .bind("Button._buttonFillOn", "color")\r
                .bind("Button._buttonBorderOn", "color")\r
                .bind("ButtonBorder.fill", "", (d, border) => d.tog2 ? d.color : border.panel["_buttonFillOff"])\r
                .bind("ButtonBorder.stroke", "", (d, border) => d.tog2 ? d.color : border.panel["_buttonBorderOff"])\r
                .add(new go.TextBlock("Toggle 2:", { margin: new go.Margin(0, 2, 0, 0) })),\r
              go.GraphObject.build("Toggle", { margin: 2, type: go.Panel.Vertical }, "tog3")\r
                .add(new go.TextBlock("label below")),\r
              go.GraphObject.build("Toggle", { margin: 2, isEnabled: false }, "tog4")\r
                .add(new go.TextBlock("(disabled)", { font: "italic 10pt sans-serif" }))\r
            )\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: "Alpha", color: "lightblue", tog0: true, togV: true, tog1: true, tog2: true, tog3: true, tog4: true },\r
        { key: 2, text: "Beta", color: "orange", tog0: false, togV: false, tog1: false, tog2: false, tog3: false, tog4: false },\r
        { key: 3, text: "Gamma", color: "lightgreen", togV: true, tog1: false, tog2: true },\r
        { key: 4, text: "Delta", color: "pink", tog0: true, tog1: true, tog2: true, tog3: true }\r
      ]);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows many examples of how to use the predefined toggle buttons\r
    inside GoJS and how they can be customized. These premade <a>Panel</a>s exist for\r
    common structures needed in many <a>Node</a> templates. To create a toggle switch call:\r
  </p>\r
  <!-- DESC_CODE_BLOCK_0 -->\r
  <p>\r
    <code>null</code> is in the place of the optional properties object,\r
    <code>'choice1'</code> is the name of the boolean data property whose value is toggled by this button.\r
    This represents the value of the toggle switch.\r
  </p>\r
  <p>\r
    Add a GraphObject to the "Toggle" to provide a label for the switch.\r
  </p>\r
  <p>\r
    For more information on these predefined panels see\r
    <a href="../intro/buttons">Buttons</a>. You can see how they are defined\r
    in <a href="../extensions/Buttons.js">Buttons.js</a>.\r
  </p>`,descriptionCodeBlocks:[{code:`go.GraphObject.build('Toggle', null, 'choice1')`,language:`js`}]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`buttons`,`extensions`];var g=y();l(`ez4c32`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};