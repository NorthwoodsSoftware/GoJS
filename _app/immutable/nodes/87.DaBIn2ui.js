import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Arranging Layout, Layout of Layouts, plus Layout on the Side`,titleShort:`Arranging Layout`,indexDescription:`The Arranging layout is a layout of layouts, plus a third layout for arranging left-overs.`,screenshot:`arranging`,priority:2,tags:[`gridlayout`,`customlayout`,`extensions`],description:`Arrange disconnected circular subgraphs in a circle and put disconnected nodes in a grid underneath.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="border: solid 1px black; width: 100%; height: 800px; min-width: 200px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      layout: new ArrangingLayout({\r
        // create a circular arrangement of circular layouts\r
        primaryLayout: new go.CircularLayout(), // must specify the primaryLayout\r
        arrangingLayout: new go.CircularLayout({\r
          nodeDiameterFormula: go.CircularNodeDiameterFormula.Circular,\r
          spacing: 30\r
        }),\r
\r
        // Uncommenting this filter will force all of the nodes and links to go into the main subset and thus\r
        // will cause all those nodes to be arranged by this.arrangingLayout, here a CircularLayout,\r
        // rather than by the this.sideLayout, which by default is a GridLayout.\r
        //filter: part => true,\r
\r
        // additional custom properties for use by preparePrimaryLayout\r
        _colors: ['red', 'orange', 'yellow', 'lime', 'cyan'], // possible node colors\r
        _colorIndex: 0, // cycle through the given colors\r
\r
        // called for each separate connected subgraph\r
        // color all of the nodes in each subgraph\r
        preparePrimaryLayout: function (lay, coll) {\r
          // method override requires function, not =>\r
          var root = null; // find the root node in this subgraph\r
          coll.each(node => {\r
            if (node instanceof go.Node && node.findLinksInto().count === 0) root = node;\r
          });\r
          var color = 'white'; // determine the color for the nodes in this subgraph\r
          if (root !== null) {\r
            // root.key will be the name of the class that this node represents\r
            // Special case: "LayoutNetwork", "LayoutVertex", and "LayoutEdge" classes are "violet"\r
            if (root.key.indexOf('Layout') === 0 && root.key.length > 'Layout'.length) {\r
              color = 'violet';\r
            } else {\r
              // otherwise cycle through the Array of colors\r
              color = this._colors[this._colorIndex++ % this._colors.length];\r
            }\r
          }\r
          coll.each(node => {\r
            // assign the fill color for all of the nodes in the subgraph\r
            if (node instanceof go.Node) {\r
              var shape = node.findObject('SHAPE');\r
              if (shape !== null) shape.fill = color;\r
            }\r
          });\r
        },\r
\r
        // called once for the sideLayout\r
        prepareSideLayout: function (lay, coll, b) {\r
          // method override requires function, not =>\r
          // adjust how wide the GridLayout lays out\r
          lay.wrappingWidth = Math.max(b.width, this.diagram.viewportBounds.width);\r
        }\r
      })\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape({ name: 'SHAPE', figure: 'RoundedRectangle', fill: 'lightgray' })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 2, textAlign: 'center' })\r
            .bind('text', 'key', s => {\r
              // insert newlines between lowercase followed by uppercase characters\r
              var arr = s.split('');\r
              for (var i = 1; i < arr.length - 1; i++) {\r
                var a = arr[i - 1];\r
                var b = arr[i];\r
                if (a === a.toLowerCase() && b === b.toUpperCase()) {\r
                  arr.splice(i, 0, '\\n');\r
                  i += 2;\r
                }\r
              }\r
              return arr.join('');\r
            })\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ layerName: 'Background' })\r
        .add(new go.Shape());\r
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
      var base = Object.getPrototypeOf(cls);\r
      if (base === Object) {\r
        // "root" node?\r
        nodeDataArray.push({ key: k });\r
      } else {\r
        // add a node for this class and a tree-parent reference to the base class name\r
        nodeDataArray.push({ key: k, parent: base.name });\r
      }\r
    }\r
\r
    // Create the model for the hierarchy diagram\r
    myDiagram.model = new go.TreeModel(nodeDataArray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/ArrangingLayout.js`],descriptionHtml:`<p>\r
    This sample demonstrates a custom Layout, <a>ArrangingLayout</a>, that provides layouts of\r
    layouts. It assumes the graph should be split up and laid out by potentially three separate\r
    Layouts.\r
  </p>\r
  <p>\r
    The first step of ArrangingLayout is that all unconnected nodes are separated out to be laid out\r
    later by the <a>ArrangingLayout.sideLayout</a>, which by default is a <a>GridLayout</a>.\r
  </p>\r
  <p>\r
    The remaining nodes and links are partitioned into separate subgraphs with no links between\r
    subgraphs. The <a>ArrangingLayout.primaryLayout</a> is performed on each subgraph.\r
  </p>\r
  <p>\r
    If there is more than one subgraph, those subgraphs are treated as if they were individual nodes\r
    and are laid out by the\r
    <a>ArrangingLayout.arrangingLayout</a>.\r
  </p>\r
  <p>\r
    Finally the unconnected nodes are laid out by <a>ArrangingLayout.sideLayout</a> and they are all\r
    positioned at the <a>ArrangingLayout.side</a> Spot relative to the main body of nodes and links.\r
  </p>\r
  <p>\r
    This sample has an <a>ArrangingLayout.primaryLayout</a> and <a>ArrangingLayout.arrangingLayout</a>\r
    of <a>CircularLayout</a>. This means the subgraphs will have their nodes arranged in a circle.\r
    Then each of the subgraphs are in a larger circle. The disconnected nodes are in a\r
    <a>GridLayout</a> positioned at the bottom of the diagram.\r
  </p>\r
  <p>This extension layout is defined in its own file, as <a href="../extensions/ArrangingLayout.js">ArrangingLayout.js</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gridlayout`,`customlayout`,`extensions`];var g=y();l(`2r83cg`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};