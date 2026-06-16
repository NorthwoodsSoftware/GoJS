import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Custom Select Box and Radio Button Text Editors for In-Place Editing of Text`,titleShort:`Custom Text Editors`,indexDescription:`Demonstrates using a custom HTML element for in-place editing of a TextBlock.`,screenshot:`customtexteditingtool`,priority:2,tags:[`html`],description:`Custom text editing using an HTML select box and some radio buttons.`},htmlContent:`<!--\r
  The div needs an explicit size or else we won't see anything.\r
  Lets also add a border to help see the edges.\r
  -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px; min-width: 200px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // default text editor is now a SelectBox\r
      'textEditingTool.defaultTextEditor': window.TextEditorSelectBox, // defined in textEditorSelectBox.js\r
      'undoManager.isEnabled': true\r
    });\r
\r
    var brush = new go.Brush(go.BrushType.Linear, { 0: 'rgb(255, 211, 89)', 1: 'rgb(255, 239, 113)' });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', {\r
          resizable: true,\r
          rotatable: true,\r
          locationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location')\r
        .add(\r
          new go.TextBlock({\r
              text: 'Alpha',\r
              editable: true,\r
              font: '32pt Georgia, serif',\r
              background: 'lightblue'\r
            })\r
            .bind('choices'),\r
          new go.TextBlock({\r
              text: 'Beta',\r
              editable: true,\r
              font: '22pt Georgia, serif',\r
              background: 'lightgreen',\r
              scale: 2\r
            })\r
            .bind('choices'),\r
          new go.TextBlock({\r
              text: 'Gamma',\r
              editable: true,\r
              font: '60pt Georgia, serif',\r
              background: 'orangered',\r
              scale: 0.4\r
            })\r
            .bind('choices'),\r
          new go.TextBlock({\r
            text: 'One',\r
            editable: true,\r
            font: 'bold 16pt Arial, Helvetica, sans-serif',\r
            background: brush,\r
            scale: 2,\r
            // this specific TextBlock uses a RadioButtons for editing text\r
            textEditor: window.TextEditorRadioButtons, // defined in textEditorRadioButtons.js\r
            // this specific TextBlock has its own choices:\r
            choices: ['One', 'Two', 'Three', 'Four']\r
          })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, choices: ['Alpha', 'Beta', 'Gamma', 'Theta'], location: new go.Point(250, 150) },\r
        { key: 2, choices: ['Alpha', 'Beta', 'Gamma', 'Theta'], location: new go.Point(50, 50) }\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/TextEditorSelectBox.js`,`../extensions/TextEditorRadioButtons.js`],descriptionHtml:`<p>This example shows how create custom textEditors for the TextEditingTool.</p>\r
  <p>\r
    Above is a Diagram with two nodes, each holding several TextBlocks. The TextEditingTool on the diagram has a custom editor that consists of an HTML select\r
    box with several preset values. This editor will change the text as soon as the user presses Enter, Tab, or clicks away from the select box.\r
  </p>\r
  <p>\r
    TextBlocks can also have their own custom editors that override the TextEditingTool's editor, by setting\r
    <a>TextBlock.textEditor</a>. The last TextBlock in each node has its own custom editor that consists of an HTML div with several radio buttons. This editor\r
    will change the text as soon as an option is selected.\r
  </p>\r
  <p>TextBlocks in this sample make use of <a>TextBlock.choices</a> to inform the custom text editing tools.</p>\r
  <p>\r
    The code for these text editors is in <a href="../extensions/TextEditorSelectBox.js" target="_blank">TextEditorSelectBox.js</a> and\r
    <a href="../extensions/TextEditorRadioButtons.js" target="_blank">TextEditorRadioButtons.js</a>.\r
  </p>\r
\r
  <p>You can see a re-implementation of the default text editors in the <a href="../samples/TextEditor">Text Editor extension</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`html`];var g=y();l(`8ht2w5`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};