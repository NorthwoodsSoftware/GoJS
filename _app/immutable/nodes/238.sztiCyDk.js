import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Saving and Loading Models in local files`,titleShort:`Local Files`,indexDescription:`Demonstrates saving and loading model files on the local machine`,screenshot:`minimal`,priority:2,tags:[`extensions`,`commands`],description:`The DrawCommandHandler extension adds a command to save the Model as a JSON formatted text file, and a method and options for loading such files.`},htmlContent:`<div style="display: flex;">\r
    <span style="display: inline-block; vertical-align: to; flex: 1 1 auto">\r
      <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 300px; background: whitesmoke;"></div>\r
    </span>\r
    <span style="display: inline-block; vertical-align: top; flex: 1 1 auto">\r
      <div id="myDiagramDiv2" style="border: solid 1px black; width: 100%; height: 300px; background: whitesmoke;"></div>\r
    </span>\r
    <div>\r
      <p>\r
        <button style="margin: 4px;" id="myFileSaveButton" title="Save a file to the Downloads folder">Save left Diagram model file to Downloads folder as .gojs file</button>\r
      </p>\r
      <p>\r
        <div>\r
          <input type="file" id="myFileInput" multiple style="display:none"></input> <!-- this stays hidden -->\r
          <button id="myFileOpenButton" style="margin: 4px;" title="Load a saved file for first diagram">Load a saved file to left Diagram</button>\r
          <input type="file" id="myFileInput2" multiple style="display:none"></input> <!-- this stays hidden -->\r
          <button id="myFileOpenButton2" style="margin: 4px;" title="Load a saved file for second diagram">Load a saved file to right Diagram</button>\r
          <br>\r
          Or drag-and-drop from your Downloads folder directly into the desired Diagram.\r
        </div>\r
      </p>\r
    </div>\r
  </div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      commandHandler: new DrawCommandHandler({\r
        // options for saving:\r
        // The default saved file name comes from the Model.name; if there is no name it uses 'gojs'\r
        // localFileType: 'gojs'  // the default saved file type\r
\r
        // support for loading:\r
        localFileInput: document.getElementById('myFileInput'),\r
        localFileDropElement: document.getElementById('myDiagramDiv')\r
      }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // a second diagram, for demonstrating copy-and-paste\r
    myDiagram2 = new go.Diagram('myDiagramDiv2', {\r
      commandHandler: new DrawCommandHandler({\r
        // support for loading:\r
        localFileInput: document.getElementById('myFileInput2'),\r
        localFileDropElement: document.getElementById('myDiagramDiv2')\r
      }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto') // the Shape will go around the TextBlock\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8, editable: true }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bindTwoWay('text')\r
        );\r
\r
    // share the templates\r
    myDiagram2.nodeTemplate = myDiagram.nodeTemplate;\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel({\r
        name: 'example',\r
        nodeDataArray: [\r
          { key: 1, text: 'Alpha', color: 'lightblue' },\r
          { key: 2, text: 'Beta', color: 'orange' },\r
          { key: 3, text: 'Gamma', color: 'lightgreen' },\r
          { key: 4, text: 'Delta', color: 'pink' }\r
        ],\r
        linkDataArray: [\r
          { from: 1, to: 2 },\r
          { from: 1, to: 3 },\r
          { from: 2, to: 2 },\r
          { from: 3, to: 4 },\r
          { from: 4, to: 1 }\r
        ]\r
      });\r
\r
    myDiagram2.model = new go.GraphLinksModel({\r
        name: 'simple',\r
        nodeDataArray: [\r
          { key: 1, text: 'Alpha', color: 'lightblue' },\r
          { key: 2, text: 'Beta', color: 'orange' }\r
        ],\r
        linkDataArray: [\r
          { from: 1, to: 2 },\r
        ]\r
      });\r
\r
    // support for saving and loading files to and from the local machine\r
    document.getElementById('myFileSaveButton').addEventListener('click', () => myDiagram.commandHandler.saveLocalFile());\r
    document.getElementById('myFileOpenButton').addEventListener('click', () => document.getElementById('myFileInput').click());\r
    document.getElementById('myFileOpenButton2').addEventListener('click', () => document.getElementById('myFileInput2').click());\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DrawCommandHandler.js`],descriptionHtml:`<p>\r
    This example uses the <a>DrawCommandHandler</a> extension to save and load Diagram <a>Model</a>s on your local machine.\r
    Make some changes to either or both diagrams, click the "Save..." button, maybe make more changes,\r
    and then click either of the "Load..." buttons or just drag-and-drop the saved <code>.gojs</code> file\r
    directly into the Diagram.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`extensions`,`commands`];var g=y();l(`1bzkkdv`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};