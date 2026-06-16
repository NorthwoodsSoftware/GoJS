import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Drawing Commands for Aligning, Spacing, Rotating, Z-Ordering, and Arrow Keys`,titleShort:`Draw Command Handler`,indexDescription:`Demonstrates custom CommandHandler which provides alignment commands and additional behaviors for the arrow keys.`,screenshot:`drawcommandhandler`,priority:2,tags:[`extensions`,`commands`],description:`The DrawCommandHandler extension implements various commands for aligning and rotating objects and for handling arrow keys to select or shift.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       Also add a border to help see the edges. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height:400px"></div>\r
  <p>\r
    Align:\r
    <button onclick="myDiagram.commandHandler.alignLeft()">Left Sides</button>\r
    <button onclick="myDiagram.commandHandler.alignRight()">Right Sides</button>\r
    <button onclick="myDiagram.commandHandler.alignTop()">Tops</button>\r
    <button onclick="myDiagram.commandHandler.alignBottom()">Bottoms</button>\r
    <button onclick="myDiagram.commandHandler.alignCenterX()">Center X</button>\r
    <button onclick="myDiagram.commandHandler.alignCenterY()">Center Y</button>\r
    </br>\r
    Space Evenly:\r
    <button onclick="myDiagram.commandHandler.alignRow(30)">Into Row (space 30)</button>\r
    <button onclick="myDiagram.commandHandler.alignColumn(30)">Into Column (space 30)</button>\r
    <button onclick="myDiagram.commandHandler.spaceEvenlyHorizontally()">Horizontally</button>\r
    <button onclick="myDiagram.commandHandler.spaceEvenlyVertically()">Vertically</button>\r
    </br>\r
    Rotate:\r
    <button onclick="myDiagram.commandHandler.rotate(45)">45°</button>\r
    <button onclick="myDiagram.commandHandler.rotate(-45)">-45°</button>\r
    <button onclick="myDiagram.commandHandler.rotate(90)">90°</button>\r
    <button onclick="myDiagram.commandHandler.rotate(-90)">-90°</button>\r
    <button onclick="myDiagram.commandHandler.rotate(180)">180°</button>\r
    </br>\r
    Z-Order:\r
    <button onclick="myDiagram.commandHandler.pullToFront()">Pull to Front</button>\r
    <button onclick="myDiagram.commandHandler.pushToBack()">Push to Back</button>\r
    </br>\r
    Arrow Mode:\r
    <input type="radio" name="arrow" id="move" onclick="arrowMode()" checked="checked">Move</input>\r
    <input type="radio" name="arrow" id="select" onclick="arrowMode()">Select</input>\r
    <input type="radio" name="arrow" id="scroll" onclick="arrowMode()">Scroll</input>\r
    <input type="radio" name="arrow" id="tree" onclick="arrowMode()">Tree</input>\r
    <input type="radio" name="arrow" id="none" onclick="arrowMode()">None</input>\r
  </p>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.TreeLayout(),\r
      commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js\r
      'commandHandler.archetypeGroupData': { isGroup: true },\r
      'undoManager.isEnabled': true  // enable undo & redo\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { // the Shape will go around the TextBlock\r
          locationSpot: go.Spot.Center\r
        })\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            .bind('fill', 'color'), // Shape.fill is bound to Node.data.color\r
          new go.TextBlock({margin: 8 })  // some room around the text\r
            .bind('text')\r
        );\r
\r
    // but use the default Link template, by not setting Diagram.linkTemplate\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' },\r
        { key: 5, text: 'Epsilon', color: 'yellow' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 3, to: 4 },\r
        { from: 3, to: 5 }\r
      ]);\r
  }\r
\r
  // update arrowkey function\r
  function arrowMode() {\r
    // no transaction needed, because we are modifying the CommandHandler for future use\r
    if (document.getElementById('move').checked === true) {\r
      myDiagram.commandHandler.arrowKeyBehavior = 'move';\r
    } else if (document.getElementById('select').checked === true) {\r
      myDiagram.commandHandler.arrowKeyBehavior = 'select';\r
    } else if (document.getElementById('scroll').checked === true) {\r
      myDiagram.commandHandler.arrowKeyBehavior = 'scroll';\r
    } else if (document.getElementById('tree').checked === true) {\r
      myDiagram.commandHandler.arrowKeyBehavior = 'tree';\r
    } else if (document.getElementById('none').checked === true) {\r
      myDiagram.commandHandler.arrowKeyBehavior = 'none';\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DrawCommandHandler.js`],descriptionHtml:`<p>\r
    This example demonstrates a custom <a>CommandHandler</a>.\r
    It allows the user to position selected Parts in a diagram relative to each other,\r
    overrides <a>CommandHandler.doKeyDown</a> to allow handling the arrow keys in additional manners,\r
    and uses a "paste offset" so that pasting objects will cascade them rather than place them on top of one another.\r
    It is defined in its own file, as <a href="../extensions/DrawCommandHandler.js">DrawCommandHandler.js</a>.\r
  </p>\r
  <p>\r
    The above buttons can be used to align Parts, rotate Parts, or change the behavior of the arrow keys.\r
  </p>\r
  <p>\r
    <!-- Usage can also be seen in the <a href="../samples/bpmn/BPMN.html">BPMN Editor</a> sample. -->\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`extensions`,`commands`];var g=y();l(`c266ca`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};