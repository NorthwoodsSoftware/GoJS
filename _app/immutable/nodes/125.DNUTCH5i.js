import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Drag Creating Tool Lets Users Draw Box where New Node will be Created`,titleShort:`Drag Creating Tool`,indexDescription:`A custom Tool that lets a user draw a box showing where and how large a new node should be.`,screenshot:`dragcreating`,priority:2,tags:[`tools`,`extensions`],description:`Create nodes by dragging, thereby specifying their initial size.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 800px"></div>\r
  <label><input id="ToolEnabled" type="checkbox" checked="checked" onclick="toolEnabled()" />DragCreatingTool enabled</label>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // Define the template for Nodes, just some text inside a colored rectangle\r
      nodeTemplate:\r
        new go.Node('Auto', {\r
            minSize: new go.Size(60, 20),\r
            resizable: true\r
          })\r
          .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
          .bindTwoWay('position', 'pos', go.Point.parse, go.Point.stringify)\r
          // temporarily put selected nodes in Foreground layer\r
          .bindObject('layerName', 'isSelected', s => s ? 'Foreground' : '')\r
          .add(\r
            new go.Shape('Rectangle')\r
              .bind('fill', 'color'),\r
            new go.TextBlock({ margin: 2 })\r
              .bind('text', 'color')\r
          ),\r
        'undoManager.isEnabled': true\r
      });\r
\r
    myDiagram.add(\r
      new go.Part({\r
          layerName: 'Grid',\r
          location: new go.Point(0, 0)\r
        })\r
        .add(\r
          new go.TextBlock('Mouse-down and then drag in the background\\nto add a Node there with the drawn size.',\r
                           { stroke: 'brown' })\r
        )\r
      );\r
\r
    // Add an instance of the custom tool defined in DragCreatingTool.js.\r
    // This needs to be inserted before the standard DragSelectingTool,\r
    // which is normally the third Tool in the ToolManager.mouseMoveTools list.\r
    // Note that if you do not set the DragCreatingTool.delay, the default value will\r
    // require a wait after the mouse down event.  Not waiting will allow the DragSelectingTool\r
    // and the PanningTool to be able to run instead of the DragCreatingTool, depending on the delay.\r
    myDiagram.toolManager.mouseMoveTools.insertAt(2,\r
      new DragCreatingTool({\r
        isEnabled: true, // disabled by the checkbox\r
        delay: 0, // always canStart(), so PanningTool never gets the chance to run\r
        box:\r
          new go.Part({ layerName: 'Tool' })\r
            .add(\r
              new go.Shape({\r
                name: 'SHAPE',\r
                fill: null,\r
                stroke: 'cyan',\r
                strokeWidth: 2\r
              })\r
            ),\r
        archetypeNodeData: { color: 'white' }, // initial properties shared by all nodes\r
        insertPart: function (bounds) {  // method override of DragCreatingTool.insertPart\r
          // use a different color each time\r
          this.archetypeNodeData.color = go.Brush.randomColor();\r
          // call the base method to do normal behavior and return its result\r
          return DragCreatingTool.prototype.insertPart.call(this, bounds);\r
        }\r
      })\r
    );\r
  }\r
\r
  function toolEnabled() {\r
    var enable = document.getElementById('ToolEnabled').checked;\r
    var tool = myDiagram.toolManager.findTool('DragCreating');\r
    if (tool !== null) tool.isEnabled = enable;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DragCreatingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates the DragCreatingTool, which replaces the standard DragSelectingTool. It is defined in its own file, as\r
    <a href="../extensions/DragCreatingTool.js">DragCreatingTool.js</a>.\r
  </p>\r
  <p>\r
    Press in the background and then drag to show the area to be occupied by the new node. The mouse-up event will add a copy of the\r
    DragCreatingTool.archetypeNodeData object, causing a new node to be created. The tool will assign its <a>GraphObject.position</a> and\r
    <a>GraphObject.desiredSize</a>.\r
  </p>\r
  <p>\r
    See also <a href="../samples/basic">Basic</a> which uses the click\r
    creating tool.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`];var g=y();l(`8xxgoy`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};