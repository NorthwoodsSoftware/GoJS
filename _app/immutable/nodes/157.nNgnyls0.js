import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Buttons Shown on Hover over Node`,titleShort:`Buttons Shown on Hover`,indexDescription:`Shows buttons in an Adornment upon hover over a node.`,screenshot:`hoverbuttons`,priority:2,tags:[`buttons`],description:`When the mouse hovers over a node, show a set of Buttons that could perform various actions.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      hoverDelay: 200, // controls how long to wait motionless (msec) before showing Adornment\r
      'undoManager.isEnabled': true // enable undo & redo\r
    });\r
\r
    // this is shown by the mouseHover event handler\r
    var nodeHoverAdornment =\r
      new go.Adornment('Spot', {\r
          //background: "transparent",\r
          // hide the Adornment when the mouse leaves it\r
          mouseLeave: (e, obj) => {\r
            var ad = obj.part;\r
            ad.adornedPart.removeAdornment('mouseHover');\r
          }\r
        })\r
        .add(\r
          new go.Placeholder({\r
            //background: "transparent",  // to allow this Placeholder to be "seen" by mouse events\r
            isActionable: true, // needed because this is in a temporary Layer\r
            click: (e, obj) => {\r
              var node = obj.part.adornedPart;\r
              node.diagram.select(node);\r
            }\r
          }),\r
          go.GraphObject.build('Button', {\r
              alignment: go.Spot.Left, alignmentFocus: go.Spot.Right,\r
              click: (e, obj) => alert('Hi!')\r
            })\r
            .add(new go.TextBlock('Hi!')),\r
          go.GraphObject.build('Button', {\r
              alignment: go.Spot.Right, alignmentFocus: go.Spot.Left,\r
              click: (e, obj) => alert('Bye')\r
            })\r
            .add(new go.TextBlock('Bye'))\r
        );\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { // the Shape will go around the TextBlock\r
          // show the Adornment when a mouseHover event occurs\r
          mouseHover: (e, obj) => {\r
            var node = obj.part;\r
            nodeHoverAdornment.adornedObject = node;\r
            node.addAdornment('mouseHover', nodeHoverAdornment);\r
          }\r
        })\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
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
        { key: 4, text: 'Delta', color: 'pink' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates buttons that appear when the user hovers over a node with the mouse. The advantage of using an <a>Adornment</a> is that it keeps\r
    the Node template simpler. That means there are less resources used to create nodes -- only that one adornment can be shown.\r
  </p>\r
  <p>\r
    However, using a template as the <a>Part.selectionAdornmentTemplate</a> would allow for more than one set of buttons to be shown simultaneously, one set for\r
    each selected node.\r
  </p>\r
  <p>This technique does not work on touch devices.</p>\r
  <p>\r
    If you want to show such an Adornment on mouseEnter and mouseLeave, rather than on mouseHover, the code is given in the documentation for the\r
    <a>GraphObject.mouseEnter</a> property.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`buttons`];var g=y();l(`2bop3w`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};