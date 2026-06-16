import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Comment Nodes Laid out by Tree Layout`,titleShort:`Comment Nodes`,indexDescription:`GoJS supports the notion of 'Comments', including the ability to create balloon-like comments.`,screenshot:`comments`,priority:2,tags:[`links`,`treelayout`,`geometries`],description:`A tree-structured diagram annotated with balloon comments, automatically laid out.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <div style="display: inline">\r
    Initial Diagram.model saved in JSON format:<br />\r
    <pre id="savedModel" class="lang-js"></pre>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.TreeLayout({\r
        angle: 90,\r
        setsPortSpot: false,\r
        setsChildPortSpot: false,\r
        arrangement: go.TreeArrangement.Horizontal\r
      }),\r
      'undoManager.isEnabled': true,\r
      // When a Node is deleted by the user, also delete all of its Comment Nodes.\r
      // When a Comment Link is deleted, also delete the corresponding Comment Node.\r
      SelectionDeleting: e => {\r
        var parts = e.subject; // the collection of Parts to be deleted, the Diagram.selection\r
        // iterate over a copy of this collection,\r
        // because we may add to the collection by selecting more Parts\r
        parts.copy().each(p => {\r
          if (p instanceof go.Node) {\r
            var node = p;\r
            node.findNodesConnected().each(n => {\r
              // remove every Comment Node that is connected with this node\r
              if (n.category === 'Comment') {\r
                n.isSelected = true; // include in normal deletion process\r
              }\r
            });\r
          } else if (p instanceof go.Link && p.category === 'Comment') {\r
            var comlink = p; // a "Comment" Link\r
            var comnode = comlink.fromNode;\r
            // remove the Comment Node that is associated with this Comment Link,\r
            if (comnode.category === 'Comment') {\r
              comnode.isSelected = true; // include in normal deletion process\r
            }\r
          }\r
        });\r
      }\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape({ fill: 'white' })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 6 })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link()\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5 }),\r
          new go.Shape({ toArrow: 'Standard', stroke: null })\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Comment',\r
      new go.Node({ background: 'transparent' })\r
        .add( // this needs to act as a rectangular shape for BalloonLink,\r
          // which can be accomplished by setting the background.\r
          new go.TextBlock({ stroke: 'brown', margin: 3 })\r
            .bind('text')\r
        )\r
    );\r
\r
    myDiagram.linkTemplateMap.add('Comment',\r
      // if the BalloonLink class has been loaded from the Extensions directory, use it\r
      new (typeof BalloonLink === 'function' ? BalloonLink : go.Link)()\r
        .add(\r
          new go.Shape( // the Shape.geometry will be computed to surround the comment node and\r
            // point all the way to the commented node\r
            { stroke: 'brown', strokeWidth: 1, fill: 'lightyellow' })\r
        )\r
    );\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      nodeDataArray: [\r
        { key: 1, text: 'Alpha', color: 'orange' },\r
        { key: 2, text: 'Beta', color: 'lightgreen' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' },\r
        { key: -1, text: 'comment\\nabout Alpha', category: 'Comment' },\r
        { key: -2, text: 'comment\\nabout Beta', category: 'Comment' },\r
        { key: -3, text: 'comment\\nabout Gamma', category: 'Comment' }\r
      ],\r
      linkDataArray: [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 1, to: 4 },\r
        { from: -1, to: 1, category: 'Comment' },\r
        { from: -2, to: 2, category: 'Comment' },\r
        { from: -3, to: 3, category: 'Comment' }\r
      ]\r
    });\r
\r
    // show the model in JSON format\r
    document.getElementById('savedModel').innerHTML = \`<code>\${myDiagram.model.toJson()}</code>\`;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/BalloonLink.js`],descriptionHtml:`<p>\r
    <b>GoJS</b> supports the notion of "Comment"s. A "Comment" is a node that is linked with another\r
    node but is positioned by some layouts to go along with that other node, rather than be laid out\r
    like a regular node and link.\r
  </p>\r
  <p>\r
    In this sample there are three "Comment" nodes, connected with regular nodes by three "Comment"\r
    links. Node and link data are marked as "Comment"s by specifying "Comment" as the category. But\r
    the "Comment" nodes and links have a different default template, and thus a different\r
    appearance, than regular nodes and links. You can specify your own templates for "Comment" nodes\r
    and "Comment" links. The "Comment" link template defined here uses the\r
    <code>BalloonLink</code> class defined in\r
    <a href="../extensions/BalloonLink.js">BalloonLink.js</a> in the Extensions directory.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`treelayout`,`geometries`];var g=y();l(`bqhpq7`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};