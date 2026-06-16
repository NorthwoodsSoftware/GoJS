import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Custom Expand and Collapse Buttons for Non-Tree Graphs`,titleShort:`Custom Expand/Collapse`,indexDescription:`Shows how to create Buttons with custom behavior for expanding/collapsing of a graph.`,screenshot:`customexpandcollapse`,priority:2,tags:[`layered-digraph`,`buttons`],description:`Custom policy for collapsing and expanding subtrees, different than TreeExpanderButton.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="border: solid 1px black; width: 100%; height: 700px;"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      padding: 10,\r
      layout: new go.LayeredDigraphLayout({\r
        direction: 90,\r
        layeringOption: go.LayeredDigraphLayering.LongestPathSource\r
      }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', {\r
          portId: '',\r
          fromLinkable: true,\r
          toLinkable: true\r
        })\r
        .bind('visible')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({\r
                  fill: 'white',\r
                  minSize: new go.Size(30, 30),\r
                  strokeWidth: 0,\r
                  cursor: 'pointer' // indicate that linking may start here\r
                })\r
                .bind('fill', 'color'),\r
              new go.TextBlock({\r
                  margin: 2,\r
                  fromLinkable: false,\r
                  toLinkable: false // don't start drawing a link from the text\r
                })\r
                .bind('text', 'key')\r
            ),\r
          go.GraphObject.build('Button', {\r
              // a replacement for "TreeExpanderButton" that works for non-tree-structured graphs\r
              visible: false, // assume initially not visible because there are no links coming out\r
              click: (e, obj) => {\r
                e.diagram.startTransaction();\r
                var node = obj.part;\r
                if (node.data.isCollapsed) {\r
                  expandFrom(node, node);\r
                } else {\r
                  collapseFrom(node, node);\r
                }\r
                e.diagram.commitTransaction('toggled visibility of dependencies');\r
              }\r
            })\r
            // bind the button visibility to whether it's not a leaf node\r
            .bindObject('visible', 'isTreeLeaf', leaf => !leaf)\r
            .add(\r
              new go.Shape({\r
                  name: 'ButtonIcon',\r
                  figure: 'MinusLine',\r
                  desiredSize: new go.Size(6, 6)\r
                })\r
                .bind('figure', 'isCollapsed', // data.isCollapsed remembers "collapsed" or "expanded"\r
                      collapsed => collapsed ? 'PlusLine' : 'MinusLine')\r
            )\r
        );\r
\r
    function collapseFrom(node, start) {\r
      if (node.data.isCollapsed) return;\r
      node.diagram.model.set(node.data, 'isCollapsed', true);\r
      if (node !== start) {\r
        node.diagram.model.set(node.data, 'visible', false);\r
      }\r
      node.findNodesOutOf().each(collapseFrom);\r
    }\r
\r
    function expandFrom(node, start) {\r
      if (!node.data.isCollapsed) return;\r
      node.diagram.model.set(node.data, 'isCollapsed', false);\r
      if (node !== start) {\r
        node.diagram.model.set(node.data, 'visible', true);\r
      }\r
      node.findNodesOutOf().each(expandFrom);\r
    }\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          corner: 10\r
        })\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 'A', color: 'lightgreen' },\r
        { key: 'B1', color: 'yellow' },\r
        { key: 'B2', color: 'yellow' },\r
        { key: 'C', color: 'lightblue' },\r
        { key: 'D1', color: 'orange' },\r
        { key: 'D2', color: 'orange' },\r
        { key: 'E', color: 'pink' },\r
        { key: 'F', color: 'lightgreen' },\r
        { key: 'Z1', color: 'lightgreen' },\r
        { key: 'Z2', color: 'yellow' },\r
        { key: 'Z3', color: 'orange' },\r
        { key: 'Z4', color: 'pink' }\r
      ],\r
      [\r
        { from: 'A', to: 'B1' },\r
        { from: 'B1', to: 'C' },\r
        { from: 'A', to: 'B2' },\r
        { from: 'B2', to: 'D2' },\r
        { from: 'C', to: 'D1' },\r
        { from: 'C', to: 'D2' },\r
        { from: 'D1', to: 'E' },\r
        { from: 'D2', to: 'E' },\r
        { from: 'D2', to: 'F' },\r
        { from: 'Z1', to: 'Z2' },\r
        { from: 'Z2', to: 'Z3' },\r
        { from: 'Z3', to: 'Z4' },\r
        { from: 'Z4', to: 'Z1' }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    The "TreeExpanderButton", which changes the\r
    <a>Node.isTreeExpanded</a> property, really only works with tree structures.\r
    When you want to hide/show the "downstream" nodes from a given node, using\r
    the "TreeExpanderButton" might not do what you like, especially when there\r
    are cycles in the graph structure.\r
  </p>\r
  <p>\r
    Instead, this sample implements a "Button" with custom behavior to modify\r
    the visibility of each Node. If this behavior is still not quite right for\r
    your app, you can adapt the behavior implemented in the\r
    <code>collapseFrom</code> and <code>expandFrom</code> functions to use\r
    different criteria for when to stop recursion.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`layered-digraph`,`buttons`];var g=y();l(`76bkap`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};