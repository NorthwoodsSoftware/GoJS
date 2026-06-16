import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Parse Tree Diagram With Leaf Nodes in Horizontal Line`,titleShort:`Parse Tree`,indexDescription:`A Parse tree representing the syntactic structure of a sentence. The leaf nodes are shown in a horizontal line.`,screenshot:`parsetree`,priority:2,tags:[`treelayout`,`customlayout`,`buttons`],description:`A collapsible tree layout with all of the leaf nodes at the same layer.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:500px"></div>`,jsCode:`// Customize the TreeLayout to position all of the leaf nodes at the same vertical Y position.\r
    class FlatTreeLayout extends go.TreeLayout {\r
      constructor(init) {\r
        super();\r
        if (init) Object.assign(this, init);\r
      }\r
\r
      // This assumes the TreeLayout.angle is 90 -- growing downward\r
      commitLayout() {\r
        super.commitLayout();  // call base method first\r
        // find maximum Y position of all Nodes\r
        var y = -Infinity;\r
        this.network.vertexes.each(v => y = Math.max(y, v.node.position.y));\r
        // move down all leaf nodes to that Y position, but keeping their X position\r
        this.network.vertexes.each(v => {\r
          if (v.destinationEdges.count === 0) {\r
            // shift the node down to Y\r
            v.node.moveTo(v.node.position.x, y);\r
            // extend the last segment vertically\r
            v.node.toEndSegmentLength = Math.abs(v.centerY - y);\r
          } else {  // restore to normal value\r
            v.node.toEndSegmentLength = 10;\r
          }\r
        });\r
      }\r
    }\r
    // end FlatTreeLayout\r
\r
    function init() {\r
\r
      myDiagram = new go.Diagram('myDiagramDiv', {\r
        allowCopy: false,\r
        allowDelete: false,\r
        allowMove: false,\r
        initialAutoScale: go.AutoScale.Uniform,\r
        layout: new FlatTreeLayout({  // custom Layout, defined below\r
          angle: 90,\r
          compaction: go.TreeCompaction.None,\r
          arrangement: go.TreeArrangement.FixedRoots\r
        }),\r
        'undoManager.isEnabled': true\r
      });\r
\r
      myDiagram.nodeTemplate =\r
        new go.Node('Vertical', { selectionObjectName: 'BODY' })\r
          .add(\r
            new go.Panel('Auto', { name: 'BODY' })\r
              .add(\r
                new go.Shape('RoundedRectangle')\r
                  .bind('fill')\r
                  .bind('stroke'),\r
                new go.TextBlock({\r
                    font: 'bold 12pt Arial, sans-serif',\r
                    margin: new go.Margin(4, 2, 2, 2)\r
                  })\r
                  .bind('text')\r
              ),\r
            new go.Panel({ height: 17 }) // always this height, even if the TreeExpanderButton is not visible\r
              .add(\r
                go.GraphObject.build('TreeExpanderButton')\r
              )\r
          );\r
\r
      myDiagram.linkTemplate =\r
        new go.Link()\r
          .add(\r
            new go.Shape({ strokeWidth: 1.5 })\r
          );\r
\r
      // set up the nodeDataArray, describing each part of the sentence\r
      var nodeDataArray = [\r
        { key: 1, text: "Sentence", fill: "#f68c06", stroke: "#4d90fe" },\r
        { key: 2, text: "NP", fill: "#f68c06", stroke: "#4d90fe", parent: 1 },\r
        { key: 3, text: "DT", fill: "#ccc", stroke: "#4d90fe", parent: 2 },\r
        { key: 4, text: "A", fill: "#f8f8f8", stroke: "#4d90fe", parent: 3 },\r
        { key: 5, text: "JJ", fill: "#ccc", stroke: "#4d90fe", parent: 2 },\r
        { key: 6, text: "rare", fill: "#f8f8f8", stroke: "#4d90fe", parent: 5 },\r
        { key: 7, text: "JJ", fill: "#ccc", stroke: "#4d90fe", parent: 2 },\r
        { key: 8, text: "black", fill: "#f8f8f8", stroke: "#4d90fe", parent: 7 },\r
        { key: 9, text: "NN", fill: "#ccc", stroke: "#4d90fe", parent: 2 },\r
        { key: 10, text: "squirrel", fill: "#f8f8f8", stroke: "#4d90fe", parent: 9 },\r
        { key: 11, text: "VP", fill: "#f68c06", stroke: "#4d90fe", parent: 1 },\r
        { key: 12, text: "VBZ", fill: "#ccc", stroke: "#4d90fe", parent: 11 },\r
        { key: 13, text: "has", fill: "#f8f8f8", stroke: "#4d90fe", parent: 12 },\r
        { key: 14, text: "VP", fill: "#f68c06", stroke: "#4d90fe", parent: 11 },\r
        { key: 15, text: "VBN", fill: "#ccc", stroke: "#4d90fe", parent: 14 },\r
        { key: 16, text: "become", fill: "#f8f8f8", stroke: "#4d90fe", parent: 15 },\r
        { key: 17, text: "NP", fill: "#f68c06", stroke: "#4d90fe", parent: 14 },\r
        { key: 18, text: "NP", fill: "#f68c06", stroke: "#4d90fe", parent: 17 },\r
        { key: 19, text: "DT", fill: "#ccc", stroke: "#4d90fe", parent: 18 },\r
        { key: 20, text: "a", fill: "#f8f8f8", stroke: "#4d90fe", parent: 19 },\r
        { key: 21, text: "JJ", fill: "#ccc", stroke: "#4d90fe", parent: 18 },\r
        { key: 22, text: "regular", fill: "#f8f8f8", stroke: "#4d90fe", parent: 21 },\r
        { key: 23, text: "NN", fill: "#ccc", stroke: "#4d90fe", parent: 18 },\r
        { key: 24, text: "visitor", fill: "#f8f8f8", stroke: "#4d90fe", parent: 23 },\r
        { key: 25, text: "PP", fill: "#f68c06", stroke: "#4d90fe", parent: 17 },\r
        { key: 26, text: "TO", fill: "#ccc", stroke: "#4d90fe", parent: 25 },\r
        { key: 27, text: "to", fill: "#f8f8f8", stroke: "#4d90fe", parent: 26 },\r
        { key: 28, text: "NP", fill: "#f68c06", stroke: "#4d90fe", parent: 25 },\r
        { key: 29, text: "DT", fill: "#ccc", stroke: "#4d90fe", parent: 28 },\r
        { key: 30, text: "a", fill: "#f8f8f8", stroke: "#4d90fe", parent: 29 },\r
        { key: 31, text: "JJ", fill: "#ccc", stroke: "#4d90fe", parent: 28 },\r
        { key: 32, text: "suburban", fill: "#f8f8f8", stroke: "#4d90fe", parent: 31 },\r
        { key: 33, text: "NN", fill: "#ccc", stroke: "#4d90fe", parent: 28 },\r
        { key: 34, text: "garden", fill: "#f8f8f8", stroke: "#4d90fe", parent: 33 },\r
        { key: 35, text: ".", fill: "#ccc", stroke: "#4d90fe", parent: 1 },\r
        { key: 36, text: ".", fill: "#f8f8f8", stroke: "#4d90fe", parent: 35 }\r
      ]\r
\r
      // create the Model with data for the tree, and assign to the Diagram\r
      myDiagram.model =\r
        new go.TreeModel(nodeDataArray);\r
    }\r
\r
    window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>A <em>parse tree</em> is an ordered, rooted tree representing the structure of a sentence, broken down to parts-of-speech.</p>\r
  <p>\r
    This diagram uses a custom <a>TreeLayout</a> called <b>FlatTreeLayout</b> that places all leaf nodes at the same Y position.\r
    It also makes use of a <b>TreeExpanderButton</b> on the node template. See the <a href="../intro/buttons">learn page on buttons</a> for more GoJS button information.\r
  </p>\r
  <p>\r
    The abbreviations used in this diagram are:\r
  </p>\r
  <ul>\r
    <li><b>NP</b>, a noun phrase</li>\r
    <li><b>VP</b>, a verb phrase</li>\r
    <li><b>PP</b>, a prepositional phrase</li>\r
    <li><b>DT</b>, a determiner</li>\r
    <li><b>JJ</b>, an adjective</li>\r
    <li><b>NN</b>, a common noun</li>\r
    <li><b>VBZ</b>, a third person singular present verb</li>\r
    <li><b>VBN</b>, a past participle verb</li>\r
  </ul>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`customlayout`,`buttons`];var g=y();l(`5p9zi0`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};