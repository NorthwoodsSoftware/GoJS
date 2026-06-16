import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Ports in Nodes`,figures:!0},htmlContent:`<h1>Ports in Nodes</h1>\r
<p>\r
  Although you have some control over where links will connect to a node\r
  (at a particular spot, along one or more sides, or at the intersection with the edge),\r
  there are times when you want to have different logical and graphical places at which links should connect.\r
  The elements at which a link may connect are called <i>ports</i>.\r
  There may be any number of ports in a node.\r
  By default there is just one port, the whole node, which results in the effect of having the whole node act as the port,\r
  as you have seen in almost all of the previous examples.\r
</p>\r
<p>\r
  To declare that a particular element in a <a href="../api/symbols/Node.html" target="api">Node</a> is a port, set the <a href="../api/symbols/GraphObject.html#portid" target="api">GraphObject.portId</a> property to a string.\r
  Note that the port-or-link-related properties may apply to any element in the visual tree of the node,\r
  which is why they are properties of <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> rather than <a href="../api/symbols/Node.html" target="api">Node</a>.\r
</p>\r
<p>\r
  Port-like GraphObjects can only be in <a href="../api/symbols/Node.html" target="api">Node</a>s or <a href="../api/symbols/Group.html" target="api">Group</a>s, not in <a href="../api/symbols/Link.html" target="api">Link</a>s or <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s or simple <a href="../api/symbols/Part.html" target="api">Part</a>s.\r
  So there is no reason to try to set <a href="../api/symbols/GraphObject.html#portid" target="api">GraphObject.portId</a> on any object in a Link.\r
</p>\r
<p>\r
<p>\r
  See samples that make use of ports in the <a href="../samples/#ports">samples index</a>.\r
</p>\r
</p>\r
\r
<h2 id="SinglePorts"><a class="not-prose heading-anchor" href="#SinglePorts">Single ports</a></h2>\r
<p>\r
  In many situations you want to connect two nodes together, but you don't want links connecting to the whole node.\r
  In this case each node has only one port, but you do not want the whole node to act as the one port.\r
</p>\r
<p>\r
  For example, consider how links connect to the nodes when the whole node is acting as a port in one common manner.\r
  The <a href="../api/symbols/GraphObject.html#fromspot" target="api">GraphObject.fromSpot</a> and <a href="../api/symbols/GraphObject.html#tospot" target="api">GraphObject.toSpot</a> are at the middles of the sides.\r
  Because the height of the whole node includes the text label,\r
  the middle of the side is not the middle of the "icon", which in this case is a circle.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  This appearance does not look or behave quite right.\r
  Really we want links to connect to the circular <a href="../api/symbols/Shape.html" target="api">Shape</a>.\r
</p>\r
\r
<p>\r
  If you want a particular element to act as the port rather than the whole node,\r
  just set its <a href="../api/symbols/GraphObject.html#portid" target="api">GraphObject.portId</a> to the empty string.\r
  The empty string is the name of the default port.\r
</p>\r
<p>\r
  In this example, we set <a href="../api/symbols/GraphObject.html#portid" target="api">GraphObject.portId</a> on the circular shape.\r
  Note that we move the other port-related properties, such as the port spots, to that object too.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  Notice how the links nicely connect the circular shapes by ignoring the text labels.\r
</p>\r
\r
<h2 id="GeneralPorts"><a class="not-prose heading-anchor" href="#GeneralPorts">General ports</a></h2>\r
<p>\r
  It is also common to have diagrams where you want more than one port in a node.\r
  The number of ports might even vary dynamically.\r
</p>\r
<p>\r
  In order for a link data object to distinguish which port the link should connect to,\r
  the <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> supports two additional data properties that identify the names of the ports in the nodes\r
  at both ends of the link.\r
  <a href="../api/symbols/GraphLinksModel.html#gettokeyforlinkdata" target="api">GraphLinksModel.getToKeyForLinkData</a> identifies the node to connect to;\r
  <a href="../api/symbols/GraphLinksModel.html#gettoportidforlinkdata" target="api">GraphLinksModel.getToPortIdForLinkData</a> identifies the port within the node.\r
  Similarly, <a href="../api/symbols/GraphLinksModel.html#getfromkeyforlinkdata" target="api">GraphLinksModel.getFromKeyForLinkData</a> and <a href="../api/symbols/GraphLinksModel.html#getfromportidforlinkdata" target="api">GraphLinksModel.getFromPortIdForLinkData</a> identify the node and its port.\r
</p>\r
<p>\r
  Normally a <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> assumes that there is no need to recognize port information on link data.\r
  If you want to support port identifiers on link data, you need to set <a href="../api/symbols/GraphLinksModel.html#linktoportidproperty" target="api">GraphLinksModel.linkToPortIdProperty</a>\r
  and <a href="../api/symbols/GraphLinksModel.html#linkfromportidproperty" target="api">GraphLinksModel.linkFromPortIdProperty</a> to be the names of the link data properties.\r
  If you do not set these properties, all port identifiers are assumed to be the empty string,\r
  which is the name of the one default port for a node.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="DrawingNewLinks"><a class="not-prose heading-anchor" href="#DrawingNewLinks">Drawing new Links</a></h2>\r
<p>\r
  Setting either or both of the <a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a> and <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a>\r
  properties to true allows users to interactively draw new links between ports.\r
</p>\r
<p>\r
  To draw a new link, mouse down on an "Out" port, move (drag) to nearby an input port,\r
  and then mouse-up to complete the link.\r
</p>\r
<p class="box bg-danger">\r
  If you have set or bound <a href="../api/symbols/GraphObject.html#portid" target="api">GraphObject.portId</a> on any element to be a non-empty string,\r
  you will need to use a <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> and set <a href="../api/symbols/GraphLinksModel.html#linktoportidproperty" target="api">GraphLinksModel.linkToPortIdProperty</a>\r
  and <a href="../api/symbols/GraphLinksModel.html#linkfromportidproperty" target="api">GraphLinksModel.linkFromPortIdProperty</a> to be the names of two properties on your link data,\r
  or you will need to hard code the portId names in the link template(s)\r
  (i.e. <a href="../api/symbols/Link.html#fromportid" target="api">Link.fromPortId</a> and <a href="../api/symbols/Link.html#toportid" target="api">Link.toPortId</a>),\r
  in order for the user to be able to link with those ports.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  By default the user may not draw more than one link in the same direction between any pair of ports,\r
  nor may the user draw a link connecting a node with itself.\r
  Please read a general discussion of <a href="validation">Linking Validation</a>.\r
</p>\r
<p>\r
  By setting <a href="../api/symbols/GraphObject.html#tomaxlinks" target="api">GraphObject.toMaxLinks</a> to 1, as shown in this example, the user may draw at most one link going into that port.\r
  And because <a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a> is false for that port element, the user will not be able to connect any links coming out of that port.\r
</p>\r
<p>\r
  If you want to prevent the user from connecting any more than one Link with a Node, regardless of direction,\r
  you will need to implement a <a href="../api/symbols/LinkingBaseTool.html#linkvalidation" target="api">LinkingBaseTool.linkValidation</a> or a <a href="../api/symbols/Node.html#linkvalidation" target="api">Node.linkValidation</a> predicate.\r
  See the discussion about <a href="validation#GeneralLinkingValidation">General Linking Validation</a>\r
</p>\r
`,codeBlocks:[{id:`defaultPort`,code:`diagram.div.style.backgroundColor = "#f7f5f0";\r
\r
diagram.model = new go.GraphLinksModel({\r
  nodeDataArray: [\r
    { key: 1, text: "Alpha" },\r
    { key: 2, text: "Beta" }\r
  ],\r
  linkDataArray: [\r
    { from: 1, to: 2 }\r
  ]\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical", {\r
    // port properties on the node\r
    fromSpot: go.Spot.Right,\r
    toSpot: go.Spot.Left\r
  })\r
    .add(\r
      new go.Shape("Ellipse", { width: 50, height: 50, fill: "green",\r
        fill: "#e8d5a0",\r
        stroke: "#8a6d3b", strokeWidth: 1.5\r
      }),\r
      new go.TextBlock({\r
        font: "500 16px system-ui, sans-serif",\r
        margin: new go.Margin(6, 0, 0, 0),\r
        stroke: "#3a2f1a"\r
      })\r
        .bind("text")\r
    );\r
\r
// space out the nodes\r
diagram.layout = new go.LayeredDigraphLayout({ layerSpacing: 120 });`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`singlePort`,code:`diagram.div.style.backgroundColor = "#f7f5f0";\r
\r
diagram.model = new go.GraphLinksModel({\r
  nodeDataArray: [\r
    { key: 1, text: "Alpha" },\r
    { key: 2, text: "Beta" }\r
  ],\r
  linkDataArray: [\r
    { from: 1, to: 2 }\r
  ]\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical")\r
    .add(\r
      new go.Shape("Ellipse", { width: 50, height: 50, fill: "green",\r
        fill: "#e8d5a0",\r
        stroke: "#8a6d3b", strokeWidth: 1.5,\r
        // now the Shape is the port, not the whole Node\r
        portId: "",\r
        // port properties go on the port, not the node!\r
        fromSpot: go.Spot.Right,\r
        toSpot: go.Spot.Left\r
      }),\r
      new go.TextBlock({\r
        font: "500 16px system-ui, sans-serif",\r
        margin: new go.Margin(6, 0, 0, 0),\r
        stroke: "#3a2f1a"\r
      })\r
        .bind("text")\r
    );\r
\r
// space out the nodes\r
diagram.layout = new go.LayeredDigraphLayout({ layerSpacing: 120 });`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`ports`,code:`diagram.div.style.backgroundColor = "#1e1e1e";\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical")\r
    .add(\r
      // the Node title\r
      new go.TextBlock({\r
        font: "14px system-ui, sans-serif", stroke: "darkgray", margin: new go.Margin(0, 0, 5, 0)\r
      })\r
        .bind("text", "fig"),\r
      new go.Panel("Spot")\r
        .add(\r
          new go.Shape({\r
            desiredSize: new go.Size(70, 70),\r
            fill: "#3a3a3a", stroke: "#3a3a3a", strokeWidth: 2\r
          })\r
            .bind("figure", "fig"),\r
          // the "A" port\r
          new go.Shape("Circle", {\r
            portId: "in1",\r
            alignment: new go.Spot(0, 0.3),\r
            desiredSize: new go.Size(8, 8),\r
            fill: "cornflowerblue",\r
            strokeWidth: 0\r
          }),\r
          // the "B" port\r
          new go.Shape("Circle", {\r
            portId: "in2",\r
            alignment: new go.Spot(0, 0.7),\r
            desiredSize: new go.Size(8, 8),\r
            fill: "cornflowerblue",\r
            strokeWidth: 0\r
          }),\r
          // the "Out" port\r
          new go.Shape("Circle", {\r
            portId: "out", alignment: new go.Spot(1, 0.5),\r
            desiredSize: new go.Size(8, 8), fill: "coral",\r
            strokeWidth: 0\r
          }),\r
          // port labels\r
          new go.TextBlock("a", {\r
            alignment: new go.Spot(0, 0.3, 12),\r
            font: "12px system-ui, sans-serif", stroke: "cornflowerblue"\r
          }),\r
          new go.TextBlock("b", {\r
            alignment: new go.Spot(0, 0.7, 12),\r
            font: "12px system-ui, sans-serif", stroke: "cornflowerblue"\r
          }),\r
          new go.TextBlock("out", {\r
            alignment: new go.Spot(1, 0.65),\r
            font: "12px system-ui, sans-serif", stroke: "coral"\r
          })\r
        )\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Link.Orthogonal, corner: 6 })\r
    .add(new go.Shape({ stroke: "darkgray", strokeWidth: 2 }));\r
\r
diagram.model = new go.GraphLinksModel({\r
  linkFromPortIdProperty: "fpid",\r
  linkToPortIdProperty: "tpid",\r
  nodeDataArray: [\r
    { key: "1", fig: "AndGate" },\r
    { key: "2", fig: "XorGate" },\r
    { key: "3", fig: "NorGate" }\r
  ],\r
  linkDataArray: [\r
    { from: "1", fpid: "out", to: "3", tpid: "in1" },\r
    { from: "2", fpid: "out", to: "3", tpid: "in2" }\r
  ]\r
});\r
\r
diagram.layout = new go.LayeredDigraphLayout({ layerSpacing: 50 });`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`linkablePorts`,code:`diagram.div.style.backgroundColor = "#1e1e1e";\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical")\r
    .add(\r
      // the Node title\r
      new go.TextBlock({\r
        font: "14px system-ui, sans-serif", stroke: "darkgray", margin: new go.Margin(0, 0, 5, 0)\r
      })\r
        .bind("text", "fig"),\r
      new go.Panel("Spot")\r
        .add(\r
          new go.Shape({\r
            desiredSize: new go.Size(70, 70),\r
            fill: "#3a3a3a", stroke: "#3a3a3a", strokeWidth: 2\r
          })\r
            .bind("figure", "fig"),\r
          // the "A" port\r
          new go.Shape("Circle", {\r
            portId: "in1",\r
            alignment: new go.Spot(0, 0.3),\r
            desiredSize: new go.Size(8, 8),\r
            fill: "cornflowerblue",\r
            strokeWidth: 0,\r
            // allow user-drawn links to here\r
            toLinkable: true, toMaxLinks: 1\r
          }),\r
          // the "B" port\r
          new go.Shape("Circle", {\r
            portId: "in2",\r
            alignment: new go.Spot(0, 0.7),\r
            desiredSize: new go.Size(8, 8),\r
            fill: "cornflowerblue",\r
            strokeWidth: 0,\r
            // allow user-drawn links to here\r
            toLinkable: true, toMaxLinks: 1\r
          }),\r
          // the "Out" port\r
          new go.Shape("Circle", {\r
            portId: "out", alignment: new go.Spot(1, 0.5),\r
            desiredSize: new go.Size(8, 8), fill: "coral",\r
            strokeWidth: 0,\r
            // allow user-drawn links from here\r
            fromSpot: go.Spot.Right,\r
            fromLinkable: true,\r
          }),\r
          // port labels\r
          new go.TextBlock("a", {\r
            alignment: new go.Spot(0, 0.3, 12),\r
            font: "12px system-ui, sans-serif", stroke: "cornflowerblue"\r
          }),\r
          new go.TextBlock("b", {\r
            alignment: new go.Spot(0, 0.7, 12),\r
            font: "12px system-ui, sans-serif", stroke: "cornflowerblue"\r
          }),\r
          new go.TextBlock("out", {\r
            alignment: new go.Spot(1, 0.65),\r
            font: "12px system-ui, sans-serif", stroke: "coral"\r
          })\r
        )\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Link.Orthogonal, corner: 6 })\r
    .add(new go.Shape({ stroke: "darkgray", strokeWidth: 2 }));\r
\r
diagram.model = new go.GraphLinksModel({\r
  linkFromPortIdProperty: "fromPort",  // required information:\r
  linkToPortIdProperty: "toPort",      // identifies data property names\r
  nodeDataArray: [\r
    { key: "1", fig: "AndGate" },\r
    { key: "2", fig: "XorGate" },\r
    { key: "3", fig: "NorGate" }\r
  ],\r
  linkDataArray: [\r
    // no predeclared links\r
  ]\r
});\r
\r
diagram.layout = new go.LayeredDigraphLayout({ layerSpacing: 50 });`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`gzyf52`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};