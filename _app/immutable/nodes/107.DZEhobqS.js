import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Content Alignment Demonstration`,titleShort:`Content Alignment Demo`,indexDescription:`Showcases alignment properties of the Diagram.`,screenshot:`contentalign`,priority:2,tags:[`html`],description:`An interactive GoJS Diagram demonstrating viewports and document bounds and alignment and scaling.`},htmlContent:`<div style="width: 100%; display: flex;flex-direction: row;flex-wrap: wrap; gap: 5px;">\r
    <div style="flex: 1;min-width: 330px;">\r
      <div id="myDiagramDiv" style="height: 400px; background: whitesmoke; border: solid 1px black"></div>\r
    </div>\r
\r
    <div style="flex: 1; min-width: 330px;">\r
      <div style="border: solid 1px black; padding: 5px">\r
        Diagram.documentBounds:\r
        <div id="docBounds" style="display: inline-block"></div>\r
\r
        <p id="alignP">\r
          Diagram.contentAlignment:<br />\r
          <input type="radio" name="contentAlign" onclick="changeContentAlign(this.id)" id="None" checked /><label for="None">None</label>\r
          <input type="radio" name="contentAlign" onclick="changeContentAlign(this.id)" id="Center" /><label for="Center">Center</label><br />\r
          <input type="radio" name="contentAlign" onclick="changeContentAlign(this.id)" id="Left" /><label for="Left">Left</label>\r
          <input type="radio" name="contentAlign" onclick="changeContentAlign(this.id)" id="Right" /><label for="Right">Right</label><br />\r
          <input type="radio" name="contentAlign" onclick="changeContentAlign(this.id)" id="Top" /><label for="Top">Top</label>\r
          <input type="radio" name="contentAlign" onclick="changeContentAlign(this.id)" id="Bottom" /><label for="Bottom">Bottom</label><br />\r
        </p>\r
        <p id="posP">\r
          Diagram.position:<br />\r
          <input type="text" size="3" id="positionX" value="NaN" />\r
          <input type="text" size="3" id="positionY" value="NaN" />\r
          <button onclick="changePosition(positionX.value, positionY.value)">Set</button>\r
        </p>\r
\r
        <p id="scaleP">\r
          Diagram.scale:<br />\r
          <input type="text" size="3" id="scale" value="1" />\r
          <button onclick="changeScale(scale.value)">Set</button>\r
          <button onclick="scale.value=1;changeScale(scale.value)">Reset</button>\r
        </p>\r
\r
        <p id="fixedP">\r
          Diagram.fixedBounds (x, y, width, height):<br />\r
          <input type="text" size="3" id="fixedX" value="NaN" />\r
          <input type="text" size="3" id="fixedY" value="NaN" />\r
          <input type="text" size="3" id="fixedW" value="NaN" />\r
          <input type="text" size="3" id="fixedH" value="NaN" />\r
          <button id="fixedSet" onclick="changeFixedBounds(fixedX.value, fixedY.value, fixedW.value, fixedH.value)">Set</button>\r
          <button onclick="fixedX.value=NaN;fixedY.value=NaN;fixedW.value=NaN;fixedH.value=NaN;fixedSet.onclick()">Reset</button>\r
        </p>\r
\r
        <p id="padP">\r
          Diagram.padding (top, right, bottom, left):<br />\r
          <input type="text" size="3" id="padT" value="5" />\r
          <input type="text" size="3" id="padR" value="5" />\r
          <input type="text" size="3" id="padB" value="5" />\r
          <input type="text" size="3" id="padL" value="5" />\r
          <button onclick="changePadding(padT.value, padR.value, padB.value, padL.value)">Set</button>\r
        </p>\r
\r
        <p id="autoP">\r
          Diagram.autoScale:<br />\r
          <input type="radio" name="autoScale" onclick="changeAutoScale(this.value)" id="DiagramNone" value="None" checked /><label for="DiagramNone"\r
            >AutoScale.None</label\r
          ><br />\r
          <input type="radio" name="autoScale" onclick="changeAutoScale(this.id)" id="Uniform" /><label for="Uniform">AutoScale.Uniform</label><br />\r
          <input type="radio" name="autoScale" onclick="changeAutoScale(this.id)" id="UniformToFill" /><label for="UniformToFill">AutoScale.UniformToFill</label\r
          ><br />\r
          (but no greater than CommandHandler.defaultScale)\r
        </p>\r
        <button onclick="myDiagram.commandHandler.zoomToFit()">Zoom to Fit</button>\r
      </div>\r
    </div>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    for (var i = 0; i < 15; i++) {\r
      myDiagram.add(\r
        // add an unbound Node to the diagram at a random position\r
        new go.Node({\r
            position: new go.Point(Math.random() * 251, Math.random() * 251)\r
          })\r
          .add(\r
            new go.Shape('Circle', {\r
              fill: go.Brush.randomColor(150),\r
              strokeWidth: 2,\r
              desiredSize: new go.Size(30, 30)\r
            })\r
          )\r
      );\r
    }\r
\r
    // automatically update information in the panel\r
    myDiagram.addDiagramListener('DocumentBoundsChanged', updateDOM);\r
    myDiagram.addDiagramListener('ViewportBoundsChanged', updateDOM);\r
\r
    var myPosX = document.getElementById('positionX');\r
    var myPosY = document.getElementById('positionY');\r
    var myScale = document.getElementById('scale');\r
    var myDocBounds = document.getElementById('docBounds');\r
\r
    function updateDOM(e) {\r
      var d = e.diagram;\r
      var pos = d.position;\r
      myPosX.value = Math.round(pos.x, 2);\r
      myPosY.value = Math.round(pos.y, 2);\r
      myScale.value = d.scale;\r
      var b = d.documentBounds;\r
      myDocBounds.textContent = b.x.toFixed(2) + ', ' + b.y.toFixed(2) + '  ' + b.width.toFixed(2) + ' x ' + b.height.toFixed(2);\r
    }\r
  }\r
\r
  // disable all inputs and buttons in the specified element\r
  function setDisabled(elem, isDisabled) {\r
    for (let c of elem.children) {\r
      if (c.tagName === 'INPUT' || c.tagName === 'BUTTON') {\r
        c.disabled = !!isDisabled;\r
      }\r
    }\r
  }\r
\r
  // occurs when one of the contentAlign radio buttons is clicked\r
  function changeContentAlign(spot) {\r
    myDiagram.startTransaction('');\r
    myDiagram.contentAlignment = go.Spot[spot];\r
    myDiagram.commitTransaction('');\r
\r
    setDisabled(document.getElementById('posP'), spot !== 'None');\r
  }\r
\r
  function changePosition(posx, posy) {\r
    myDiagram.startTransaction('');\r
    var x = parseInt(posx);\r
    var y = parseInt(posy);\r
    myDiagram.position = new go.Point(x, y);\r
    myDiagram.commitTransaction('');\r
  }\r
\r
  function changeScale(scale) {\r
    var scale = parseFloat(scale);\r
    if (scale > 0) {\r
      myDiagram.startTransaction('');\r
      myDiagram.scale = scale;\r
      myDiagram.commitTransaction('');\r
    }\r
  }\r
\r
  function changeFixedBounds(fx, fy, fw, fh) {\r
    myDiagram.startTransaction('');\r
    var x = parseFloat(fx);\r
    var y = parseFloat(fy);\r
    var h = parseFloat(fw);\r
    var w = parseFloat(fh);\r
    myDiagram.fixedBounds = new go.Rect(x, y, Math.max(1, w), Math.max(1, h));\r
    myDiagram.commitTransaction('');\r
  }\r
\r
  function changePadding(pt, pr, pb, pl) {\r
    myDiagram.startTransaction('');\r
    var t = parseFloat(pt);\r
    var r = parseFloat(pr);\r
    var b = parseFloat(pb);\r
    var l = parseFloat(pl);\r
    myDiagram.padding = new go.Margin(t, r, b, l);\r
    myDiagram.commitTransaction('');\r
  }\r
\r
  function changeAutoScale(scaleType) {\r
    myDiagram.startTransaction('');\r
    myDiagram.autoScale = go.Diagram[scaleType];\r
    myDiagram.commitTransaction('');\r
\r
    setDisabled(document.getElementById('scaleP'), scaleType !== 'None');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    A Diagram's <a>Diagram.contentAlignment</a> property determines how parts\r
    are positioned when the <a>Diagram.viewportBounds</a> width or height is\r
    different than the <a>Diagram.documentBounds</a> width or height.\r
  </p>\r
\r
  <p>\r
    <a>Diagram.position</a> changes where in the document the view port is located.\r
    This means that <a>Diagram.position</a> is always equal to\r
    <a>Diagram.viewportBounds</a> x and y.\r
  </p>\r
\r
  <p>\r
    <a>Diagram.scale</a> changes how zoomed in/out the diagram is.\r
  </p>\r
\r
  <p>\r
    <a>Diagram.fixedBounds</a> changes the bound returned by <a>Diagram.documentBounds</a>,\r
    by default this is <code>NaN, NaN, NaN, NaN</code> meaning that <a>Diagram.documentBounds</a>\r
    returns <a>Diagram.computeBounds</a>.\r
  </p>\r
\r
  <p>\r
    <a>Diagram.padding</a> is the extra space between the nodes and the edge of\r
    the canvas.\r
  </p>\r
\r
  <p>\r
    <a>Diagram.autoScale</a> automatically sets the <a>Diagram.scale</a> and\r
    <a>Diagram.position</a> of the diagram to fit the document bounds inside the\r
    view. <a>AutoScale.Uniform</a> will fit the document to the view. <a>AutoScale.UniformToFill</a>\r
    will scale and position the diagram such that in on direction it fits the\r
    view, and the other requires a scroll bar.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`html`];var g=y();l(`z5dbnn`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};