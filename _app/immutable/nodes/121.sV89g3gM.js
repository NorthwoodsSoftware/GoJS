import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Showing HTML DOM Tree as Nodes and Links with TreeLayout`,titleShort:`DOM Tree`,indexDescription:`Shows the DOM of this page displayed as a tree. Selection highlights the DOM element in the page.`,screenshot:`domtree`,priority:2,tags:[`treelayout`,`buttons`],description:`Interactive diagram showing the structure of the HTML DOM of this HTML page, allowing collapsing/expanding of subtrees.`},htmlContent:`<!-- The DIV needs an explicit size or else we won't see anything. -->\r
  <div\r
    id="myDiagramDiv"\r
    style="border: 1px solid black; width: 100%; height: 500px"></div>\r
  <p id="lastParagraph">\r
    Elements with an id attribute are noted in parenthesis.\r
  </p>\r
  <div id="otherInfo">\r
    <div id="tableContainer" style="display: inline-block">\r
      <table style="border: 1px; border-collapse: collapse">\r
        <tr>\r
          <th id="firstHeader">Table header</th>\r
          <th id="secondHeader">Table header 2</th>\r
        </tr>\r
        <tr>\r
          <td>row 1, cell 1</td>\r
          <td>row 1, cell 2</td>\r
        </tr>\r
        <tr>\r
          <td>row 2, cell 1</td>\r
          <td>row 2, cell 2</td>\r
        </tr>\r
      </table>\r
    </div>\r
    <div\r
      id="listContainer"\r
      style="\r
        display: inline-block;\r
        border: 1px solid gray;\r
        margin-left: 10px;\r
        padding: 4px;\r
      ">\r
      <p>My grocery list</p>\r
      <ul id="groceryList">\r
        <li>Coffee</li>\r
        <li>Milk</li>\r
        <li>Bread</li>\r
      </ul>\r
    </div>\r
  </div>`,jsCode:`const names = {}; // hash to keep track of what names have been used\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.UniformToFill,\r
      // define the layout for the diagram\r
      layout: new go.TreeLayout({\r
        nodeSpacing: 5,\r
        layerSpacing: 30,\r
        arrangement: go.TreeArrangement.FixedRoots\r
      })\r
    });\r
\r
    // Define a simple node template consisting of text followed by an expand/collapse button\r
    myDiagram.nodeTemplate =\r
      new go.Node('Horizontal', {\r
          selectionChanged: nodeSelectionChanged\r
        }) // this event handler is defined below\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: '#1F4963', stroke: null }),\r
              new go.TextBlock({\r
                  font: 'bold 13px Helvetica, bold Arial, sans-serif',\r
                  stroke: 'white',\r
                  margin: 3\r
                })\r
                .bind('text', 'key')\r
            ),\r
          go.GraphObject.build('TreeExpanderButton')\r
        );\r
\r
    // Define a trivial link template with no arrowhead.\r
    myDiagram.linkTemplate =\r
      new go.Link({ selectable: false, corner: 10 })\r
        .add(\r
          new go.Shape()\r
        ); // the link shape\r
\r
    // create the model for the DOM tree\r
    myDiagram.model = new go.TreeModel({\r
      isReadOnly: true, // don't allow the user to delete or copy nodes\r
      // build up the tree in an Array of node data\r
      nodeDataArray: traverseDom(document.activeElement)\r
    });\r
  }\r
\r
  // Walk the DOM, starting at document, and return an Array of node data objects representing the DOM tree\r
  // Typical usage: traverseDom(document.activeElement)\r
  // The second and third arguments are internal, used when recursing through the DOM\r
  function traverseDom(node, parentName, dataArray) {\r
    if (parentName === undefined) parentName = null;\r
    if (dataArray === undefined) dataArray = [];\r
    // skip everything but HTML Elements\r
    if (!(node instanceof Element)) return;\r
    // Ignore the navigation menus\r
    if (node.id === 'navSide' || node.id === 'navTop') return;\r
    // add this node to the nodeDataArray\r
    const name = getName(node);\r
    const data = { key: name, name: name };\r
    dataArray.push(data);\r
    // add a link to its parent\r
    if (parentName !== null) {\r
      data.parent = parentName;\r
    }\r
    // find all children\r
    const l = node.childNodes.length;\r
    for (let i = 0; i < l; i++) {\r
      traverseDom(node.childNodes[i], name, dataArray);\r
    }\r
    return dataArray;\r
  }\r
\r
  // Give every node a unique name\r
  function getName(node) {\r
    let n = node.nodeName;\r
    if (node.id) n = n + ' (' + node.id + ')';\r
    let namenum = n; // make sure the name is unique\r
    let i = 1;\r
    while (names[namenum] !== undefined) {\r
      namenum = n + i;\r
      i++;\r
    }\r
    names[namenum] = node;\r
    return namenum;\r
  }\r
\r
  // When a Node is selected, highlight the corresponding HTML element.\r
  function nodeSelectionChanged(node) {\r
    if (node.isSelected) {\r
      names[node.data.name].style.backgroundColor = 'lightblue';\r
    } else {\r
      names[node.data.name].style.backgroundColor = '';\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows the DOM (Document Object Model) of this webpage displayed\r
    as a tree. Each Node in the Diagram shows information about the\r
    corresponding HTML element in the DOM.\r
  </p>\r
  <p>\r
    When a node is selected, the background color of the corresponding HTML\r
    Element changes to lightblue. Below the diagram are some more HTML elements\r
    to illustrate the effect. This sample also makes use of the\r
    <a href="../intro/buttons" target="_blank">TreeExpanderButton</a>,\r
    which allows for parent nodes to expand and collapse their child nodes.\r
    Buttons are defined in <a href="../extensions/Buttons.js">Buttons.js</a>.\r
  </p>\r
  <p>\r
    For more uses of the <a>TreeLayout</a> see the\r
    <a href="DOMTree">DOM Tree</a> and\r
    <a href="visualTree">Visual Tree</a> samples.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`buttons`];var g=y();l(`1wq1zkb`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};