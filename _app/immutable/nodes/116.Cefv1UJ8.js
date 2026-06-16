import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Data Inspector, Expedient Way to Implement HTML Editor of Data Properties of Selected Node`,titleShort:`Data Inspector`,indexDescription:`A simple drop-in for inspecting and editing Part data.`,screenshot:`datainspector`,priority:2,tags:[`groups`,`extensions`,`inspector`,`html`],description:`An HTML panel that displays the properties of some model data and allows the user to edit their values.`},htmlContent:`<div style="display: flex">\r
    <span style="display: inline-block; vertical-align: top; flex: 1 1">\r
      <div style="margin-left: 10px">\r
        <div\r
          id="myDiagramDiv"\r
          style="border: solid 1px black; width: 100%; height: 500px"></div>\r
      </div>\r
    </span>\r
    <span style="display: inline-block; vertical-align: top">\r
      Selected Part:<br />\r
      <div id="myInspectorDiv" class="inspector"></div>\r
      <br />\r
      First Node's data:<br />\r
      <div id="myInspectorDiv2" class="inspector"></div>\r
      <br />\r
      Model.modelData:<br />\r
      <div id="myInspectorDiv3" class="inspector"></div>\r
      <br />\r
    </span>    \r
  </div>\r
  <div>\r
    <p>This shows the contents of the model after each transaction:</p>\r
\r
    <pre class="lang-js"><code id="savedModel"></code></pre>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      // allow double-click in background to create a new node\r
      'clickCreatingTool.archetypeNodeData': { text: 'Node', color: 'white' },\r
      // allow Ctrl-G to call groupSelection()\r
      'commandHandler.archetypeGroupData': {\r
        text: 'Group',\r
        isGroup: true,\r
        color: 'blue'\r
      },\r
      // enable undo & redo\r
      'undoManager.isEnabled': true,\r
      // automatically show the state of the diagram's model on the page\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) {\r
          document.getElementById('savedModel').textContent =\r
            myDiagram.model.toJson();\r
        }\r
      }\r
    });\r
\r
    // These nodes have text surrounded by a rounded rectangle\r
    // whose fill color is bound to the node data.\r
    // The user can drag a node by dragging its TextBlock label.\r
    // Dragging from the Shape will start drawing a new link.\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Rectangle', {\r
              stroke: null,\r
              strokeWidth: 0,\r
              fill: 'white', // the default fill, if there is no data-binding\r
              portId: '',\r
              cursor: 'pointer', // the Shape is the port, not the whole Node\r
              // allow all kinds of links from and to this port\r
              fromLinkable: true,\r
              fromLinkableSelfNode: true,\r
              fromLinkableDuplicates: true,\r
              toLinkable: true,\r
              toLinkableSelfNode: true,\r
              toLinkableDuplicates: true\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({\r
              font: 'bold 18px sans-serif',\r
              stroke: '#111',\r
              margin: 8, // make some extra space for the shape around the text\r
              isMultiline: false, // don't allow newlines in text\r
              editable: true // allow in-place editing by user\r
            })\r
            .bindTwoWay('text', 'text')\r
        );\r
\r
    // The link shape and arrowhead have their stroke brush data bound to the "color" property\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          toShortLength: 3,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        }) // allow the user to relink existing links\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
            .bind('stroke', 'color'),\r
          new go.Shape({ toArrow: 'Standard', stroke: null })\r
            .bind('fill', 'color')\r
        );\r
\r
    // Groups consist of a title in the color given by the group node data\r
    // above a translucent gray rectangle surrounding the member parts\r
    myDiagram.groupTemplate =\r
      new go.Group('Vertical', {\r
          selectionObjectName: 'PANEL', // selection handle goes around shape, not label\r
          ungroupable: true\r
        }) // enable Ctrl-Shift-G to ungroup a selected Group\r
        .add(\r
          new go.TextBlock({\r
              font: 'bold 19px sans-serif',\r
              isMultiline: false, // don't allow newlines in text\r
              editable: true // allow in-place editing by user\r
            })\r
            .bindTwoWay('text', 'text')\r
            .bind('stroke', 'color'),\r
          new go.Panel('Auto', { name: 'PANEL' })\r
            .add(\r
              new go.Shape('Rectangle', { // the rectangular shape around the members\r
                fill: 'rgba(128,128,128,0.2)',\r
                stroke: 'gray',\r
                strokeWidth: 3\r
              }),\r
              new go.Placeholder({ padding: 10 }) // represents where the members are\r
            )\r
        );\r
\r
    // Create the Diagram's Model:\r
    const nodeDataArray = [\r
      { key: 1, text: 'Alpha', color: '#B2DFDB', state: 'one' },\r
      {\r
        key: 2,\r
        text: 'Beta',\r
        color: '#B2B2DB',\r
        state: 'two',\r
        password: '1234'\r
      },\r
      {\r
        key: 3,\r
        text: 'Gamma',\r
        color: '#1DE9B6',\r
        state: 2,\r
        group: 5,\r
        flag: false,\r
        choices: [1, 2, 3, 4, 5]\r
      },\r
      {\r
        key: 4,\r
        text: 'Delta',\r
        color: '#00BFA5',\r
        state: 'three',\r
        group: 5,\r
        flag: true\r
      },\r
      { key: 5, text: 'Epsilon', color: '#00BFA5', isGroup: true }\r
    ];\r
    const linkDataArray = [\r
      { from: 1, to: 2, color: '#5E35B1' },\r
      { from: 2, to: 2, color: '#5E35B1' },\r
      { from: 3, to: 4, color: '#6200EA' },\r
      { from: 3, to: 1, color: '#6200EA' }\r
    ];\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
\r
    // some shared model data\r
    myDiagram.model.modelData = { test: true, hello: 'world', version: 42 };\r
\r
    // select a Node, so that the first Inspector shows something\r
    myDiagram.select(myDiagram.nodes.first());\r
\r
    // Declare which properties to show and how.\r
    // By default, all properties on the model data objects are shown unless the inspector option "includesOwnProperties" is set to false.\r
\r
    // Show the primary selection's data, or blanks if no Part is selected:\r
    const inspector =\r
      new Inspector('myInspectorDiv', myDiagram, {\r
        // allows for multiple nodes to be inspected at once\r
        multipleSelection: true,\r
        // max number of node properties will be shown when multiple selection is true\r
        showSize: 4,\r
        // when multipleSelection is true, when showUnionProperties is true it takes the union of properties\r
        // otherwise it takes the intersection of properties\r
        showUnionProperties: true,\r
        // uncomment this line to only inspect the named properties below instead of all properties on each object:\r
        // includesOwnProperties: false,\r
        properties: {\r
          text: {},\r
          // key would be automatically added for nodes, but we want to declare it read-only also:\r
          key: { readOnly: true, show: Inspector.showIfPresent },\r
          // color would be automatically added for nodes, but we want to declare it a color also:\r
          color: { show: Inspector.showIfPresent, type: 'color' },\r
          // Comments and LinkComments are not in any node or link data (yet), so we add them here:\r
          Comments: { show: Inspector.showIfNode },\r
          LinkComments: { show: Inspector.showIfLink },\r
          isGroup: { readOnly: true, show: Inspector.showIfPresent },\r
          flag: { show: Inspector.showIfNode, type: 'checkbox' },\r
          state: {\r
            show: Inspector.showIfNode,\r
            type: 'select',\r
            choices: (node, propName) => {\r
              if (Array.isArray(node.data.choices)) return node.data.choices;\r
              return ['one', 'two', 'three', 'four', 'five'];\r
            }\r
          },\r
          choices: { show: false }, // must not be shown at all\r
          // an example of specifying the <input> type\r
          password: { show: Inspector.showIfPresent, type: 'password' }\r
        }\r
      });\r
\r
    // Always show the first Node:\r
    const inspector2 =\r
      new Inspector('myInspectorDiv2', myDiagram, {\r
        // By default the inspector works on the Diagram selection.\r
        // This property lets us inspect a specific object by calling Inspector.inspectObject.\r
        inspectSelection: false,\r
        properties: {\r
          text: {},\r
          // This property we want to declare as a color, to show a color-picker:\r
          color: { type: 'color' },\r
          // key would be automatically added for node data, but we want to declare it read-only also:\r
          key: { readOnly: true, show: Inspector.showIfPresent }\r
        }\r
      });\r
    // If not inspecting a selection, you can programatically decide what to inspect (a Part, or a JavaScript object)\r
    inspector2.inspectObject(myDiagram.nodes.first().data);\r
\r
    // Always show the model.modelData:\r
    const inspector3 =\r
      new Inspector('myInspectorDiv3', myDiagram, {\r
        inspectSelection: false\r
      });\r
    inspector3.inspectObject(myDiagram.model.modelData);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* Default CSS for the Data inspector */\r
  .inspector {\r
    display: inline-block;\r
    font: bold 14px helvetica, sans-serif;\r
    background-color: #212121;\r
\r
    /* Grey 100 */\r
    cursor: default;\r
  }\r
\r
  .inspector table {\r
    border-collapse: separate;\r
    border-spacing: 2px;\r
  }\r
\r
  .inspector td,\r
  th {\r
    /* Grey 900 */\r
    color: #f5f5f5;\r
    padding: 2px;\r
  }\r
\r
  .inspector input {\r
    background-color: #424242;\r
    /* Grey 800 */\r
    color: #f5f5f5;\r
    /* Grey 100 */\r
    font: bold 12px helvetica, sans-serif;\r
    border: 0px;\r
    padding: 2px;\r
  }\r
\r
  .inspector input:disabled {\r
    background-color: #bdbdbd;\r
    /* Grey 400 */\r
    color: #616161;\r
    /* Grey 700 */\r
  }\r
\r
  .inspector select {\r
    background-color: #424242;\r
  }`,externalStyles:[],externalScripts:[`../extensions/DataInspector.js`],descriptionHtml:`<p>\r
    An HTML-based inspector that displays and allows editing of data for the\r
    selected Part (if any), or for a particular JavaScript object, or for the\r
    shared\r
    <a>Model.modelData</a> object, which exists even if there are no nodes or\r
    links.\r
  </p>\r
\r
  <p>\r
    The inspector code lies in\r
    <a href="../extensions/DataInspector.js">DataInspector.js</a>.\r
    This code is meant to\r
    be a starting point for making your own model data inspector.\r
  </p>\r
\r
  <p>\r
    On browsers that support it, color types display a color picker. There are\r
    various plugins and polyfills for this functionality if you wish to extend\r
    the data inspector.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`groups`,`extensions`,`inspector`,`html`];var g=y();l(`17aebge`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};