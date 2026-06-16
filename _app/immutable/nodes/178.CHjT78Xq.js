import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Connecting Links to Links Using Link Label Nodes`,indexDescription:`Demonstrates the ability for a Link to appear to connect with another Link, using label nodes that belong to links. `,screenshot:`linkstolinks`,priority:2,tags:[`links`],description:`Links can connect with Links by using label Nodes on Links.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:<br />\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 400px">\r
{ "class": "go.GraphLinksModel",\r
  "linkLabelKeysProperty": "labelKeys",\r
  "nodeDataArray": [\r
{"key":"Alpha", "color":"lightblue", "loc":"29 14"},\r
{"key":"Beta", "color":"orange", "loc":"129 14"},\r
{"key":"Gamma", "color":"lightgreen", "loc":"29 106"},\r
{"key":"Delta", "color":"pink", "loc":"129 106"},\r
{"key":"A-B", "category":"LinkLabel" },\r
{"key":"G-D", "category":"LinkLabel" },\r
{"key":"A-G", "category":"LinkLabel" },\r
{"key":"A-G-D", "category":"LinkLabel" },\r
{"key":"A-B-G-D", "category":"LinkLabel" }\r
 ],\r
  "linkDataArray": [\r
{"from":"Alpha", "to":"Beta", "labelKeys":[ "A-B" ]},\r
{"from":"Gamma", "to":"Delta", "labelKeys":[ "G-D" ]},\r
{"from":"Alpha", "to":"Gamma", "labelKeys":[ "A-G" ]},\r
{"from":"Alpha", "to":"G-D", "labelKeys":[ "A-G-D" ], "category":"linkToLink"},\r
{"from":"A-B", "to":"G-D", "labelKeys":[ "A-B-G-D" ], "category":"linkToLink"}\r
 ]}\r
      </textarea\r
    >\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      LinkDrawn: maybeChangeLinkCategory, // these two DiagramEvents call a\r
      LinkRelinked: maybeChangeLinkCategory, // function that is defined below\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // when the document is modified, add a "*" to the title and enable the "Save" button\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
    });\r
\r
    // the regular node template, which supports user-drawn links from the main Shape\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          layerName: 'Background'\r
        }) // always have regular nodes behind Links\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              fill: 'white',\r
              stroke: null,\r
              portId: '',\r
              fromLinkable: true,\r
              toLinkable: true,\r
              cursor: 'pointer'\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // make some extra space for the shape around the text\r
            .bind('text', 'key') // the label shows the node data's key\r
        );\r
\r
    // This is the template for a label node on a link: just an Ellipse.\r
    // This node supports user-drawn links to and from the label node.\r
    myDiagram.nodeTemplateMap.add('LinkLabel',\r
      new go.Node({\r
          selectable: false,\r
          movable: false,\r
          avoidable: false,\r
          layerName: 'Foreground'\r
        }) // always have link label nodes in front of Links\r
        .add(\r
          new go.Shape('Ellipse', {\r
            width: 5,\r
            height: 5,\r
            stroke: null,\r
            portId: '',\r
            fromLinkable: true,\r
            toLinkable: true,\r
            cursor: 'pointer'\r
          })\r
        )\r
    );\r
\r
    // the regular link template, a straight blue arrow\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          relinkableFrom: true, relinkableTo: true, toShortLength: 2\r
        })\r
        .add(\r
          new go.Shape({ stroke: '#2E68CC', strokeWidth: 2 }),\r
          new go.Shape({ fill: '#2E68CC', stroke: null, toArrow: 'Standard' })\r
        );\r
\r
    // This template shows links connecting with label nodes as green and arrow-less.\r
    myDiagram.linkTemplateMap.add('linkToLink',\r
      new go.Link({ relinkableFrom: true, relinkableTo: true })\r
        .add(\r
          new go.Shape({ stroke: '#2D9945', strokeWidth: 2 })\r
        ));\r
\r
    // GraphLinksModel support for link label nodes requires specifying two properties.\r
    myDiagram.model = new go.GraphLinksModel({ linkLabelKeysProperty: 'labelKeys' });\r
\r
    // Whenever a new Link is drawn by the LinkingTool, it also adds a node data object\r
    // that acts as the label node for the link, to allow links to be drawn to/from the link.\r
    myDiagram.toolManager.linkingTool.archetypeLabelNodeData = { category: 'LinkLabel' };\r
\r
    // this DiagramEvent handler is called during the linking or relinking transactions\r
    function maybeChangeLinkCategory(e) {\r
      var link = e.subject;\r
      var linktolink = link.fromNode.isLinkLabel || link.toNode.isLinkLabel;\r
      e.diagram.model.setCategoryForLinkData(link.data, linktolink ? 'linkToLink' : '');\r
    }\r
\r
    load();\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This demonstrates the ability for a <a>Link</a> to appear to connect with another Link. Regular links are blue. Link-connecting links are green. Try moving\r
    a node around to see how the links adapt. Initially the "Alpha" node connects with the link between Gamma and Delta. There is also a link between the two\r
    horizontal links.\r
  </p>\r
  <p>\r
    This effect is achieved by using "label nodes" that belong to links. Such "label nodes" are real <a>Node</a>s that are referenced from their owning\r
    <a>Link</a>. This sample customizes the "Link Label" Node template to allow the user to draw new links to/from such label nodes.\r
  </p>\r
  <p>\r
    Newly drawn links automatically get a label node by the <a>LinkingTool</a> because this sample initializes the\r
    <a>LinkingTool.archetypeLabelNodeData</a> property of the <a>ToolManager.linkingTool</a>. The category (i.e. template) of each link is determined by what\r
    kinds of nodes the link is connected with.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`];var g=y();l(`s7w64e`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};