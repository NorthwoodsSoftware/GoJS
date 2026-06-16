import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Class Hierarchy Diagram Showing All GoJS Classes`,titleShort:`Class Hierarchy Diagram`,indexDescription:`Displays the GoJS Class Hierarchy as a series of trees. Double-click to go to the class's API documentation.`,screenshot:`classhierarchy`,priority:2,tags:[`treelayout`],description:`The JavaScript class hierarchy defined by the GoJS library, arranged as a tree.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 725px; margin-right: 4px; border: solid 1px black"></div>\r
    <div id="mySingletons" style="width: 160px; background-color: whitesmoke; border: solid 1px black"></div>\r
  </div>`,jsCode:`function init() {\r
    var diagram = new go.Diagram('myDiagramDiv', {\r
      // Automatically lay out the diagram as a tree;\r
      // separate trees are arranged vertically above each other.\r
      layout: new go.TreeLayout({ nodeSpacing: 3 })\r
    });\r
\r
    // Define a node template showing class names.\r
    // Clicking on the node opens up the documentation for that class.\r
    diagram.nodeTemplate =\r
      new go.Node("Auto")\r
        .add(\r
          // define the visuals for the hyperlink, basically the whole node:\r
          new go.Shape({ fill: '#1F4963', stroke: null }),\r
          go.GraphObject.build('HyperlinkText', {\r
              font: 'bold 13px Helvetica, bold Arial, sans-serif',\r
              stroke: 'white',\r
              margin: 3\r
            },\r
            // compute the URL to open for the documentation\r
            node => '../api/symbols/' + node.data.key + '.html', node => node.data.key\r
          )\r
        );\r
\r
    // Define a trivial link template with no arrowhead\r
    diagram.linkTemplate =\r
      new go.Link({ corner: 10 })\r
        .add(new go.Shape({ strokeWidth: 1.5 })); // the link shape, with the default black stroke\r
\r
    // Collect all of the data for the model of the class hierarchy\r
    var nodeDataArray = [];\r
\r
    // Iterate over all of the classes in "go"\r
    for (const k in go) {\r
      var cls = go[k];\r
      // ignore enums and other stuff\r
      if (typeof cls !== 'function') continue;\r
      // find base class constructor\r
      const base = Object.getPrototypeOf(cls);\r
      if (base === Object) {\r
        // "root" node?\r
        nodeDataArray.push({ key: k });\r
      } else if (typeof base === 'function') {\r
        // add a node for this class and a tree-parent reference to the base class name\r
        nodeDataArray.push({ key: k, parent: base.name });\r
      }\r
    }\r
\r
    // Create the model for the hierarchy diagram\r
    diagram.model = new go.TreeModel(nodeDataArray);\r
\r
    // Now collect all node data that are singletons\r
    var singlesArray = []; // for classes that don't inherit from another class\r
    diagram.nodes.each(node => {\r
      if (node.linksConnected.count === 0) {\r
        singlesArray.push(node.data);\r
      }\r
    });\r
\r
    // Remove the unconnected class nodes from the main Diagram\r
    diagram.model.removeNodeDataCollection(singlesArray);\r
\r
    // Display the unconnected classes in a separate Diagram\r
    var singletons = new go.Diagram('mySingletons', {\r
      nodeTemplate: diagram.nodeTemplate, // share the node template with the main Diagram\r
      layout: new go.GridLayout({\r
        wrappingColumn: 1, // put the unconnected nodes in a column\r
        spacing: new go.Size(3, 3)\r
      }),\r
      model: new go.Model(singlesArray) // use a separate model\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/HyperlinkText.js`],descriptionHtml:`<p>\r
    The JavaScript class hierarchy defined by the GoJS library, laid out by a <a>TreeLayout</a>. Classes that do not have any inheritance relationship are shown\r
    at the right.\r
  </p>\r
  <p>Because the node template uses a "HyperlinkText", clicking on a node will open the API reference for that class in a new window.</p>\r
  <p>For more uses of the Tree Layout, see the <a href="DOMTree">DOM Tree</a> and <a href="visualTree">Visual Tree</a> samples.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`];var g=y();l(`1w01rrw`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};