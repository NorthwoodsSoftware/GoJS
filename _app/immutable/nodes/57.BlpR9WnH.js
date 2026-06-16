import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Custom Routers`},htmlContent:`<h1>Custom Routers</h1>\r
<p>\r
  Each Link performs a very fast default computation of its desired path, its "route", based only on the properties of the Link and the properties of the port\r
  objects that it is connected with. This is discussed in the pages on <a href="links#Routing">Links</a> and <a href="connectionPoints">Link connection points</a>.\r
</p>\r
<p>\r
  To implement more complex behavior, GoJS provides a way to customize link routing by allowing consideration of other Nodes and Links with the\r
  <a href="../api/symbols/Router.html" target="api">Router</a> class. Routers can be created and added to the Diagram's <a href="../api/symbols/Diagram.html#routers" target="api">Diagram.routers</a> list, and these will operate on links during updates.\r
</p>\r
\r
<h2 id="RoutingBasics"><a class="not-prose heading-anchor" href="#RoutingBasics">Routing basics</a></h2>\r
<p>\r
  Routers work by defining a method, <a href="../api/symbols/Router.html#routelinks" target="api">Router.routeLinks</a>, which takes a collection of recently recomputed link routes, plus a collection context that is\r
  either a Group or the Diagram. This method is called by the Diagram during the update phase after layouts are performed.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  During updates to the Diagram, GoJS does a depth-first walk of all <a href="../api/symbols/Group.html" target="api">Group</a>s in the Diagram,\r
  starting with the leaf-most Groups, and performs their layouts if invalid.\r
  For each of the routers present in <a href="../api/symbols/Diagram.html#routers" target="api">Diagram.routers</a>, the Diagram calls <a href="../api/symbols/Router.html#canroute" target="api">Router.canRoute</a>, passing it the Group.\r
  If that predicate returns true, it calls <a href="../api/symbols/Router.html#routelinks" target="api">Router.routeLinks</a>.\r
  Finally, the Diagram performs the <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> if it is invalid,\r
  and calls <a href="../api/symbols/Router.html#canroute" target="api">Router.canRoute</a> and possibly <a href="../api/symbols/Router.html#routelinks" target="api">Router.routeLinks</a> with the Diagram itself.\r
</p>\r
<p class="box bg-info">\r
  Group bounds are normally affected by their member links because <a href="../api/symbols/Group.html#computesboundsincludinglinks" target="api">Group.computesBoundsIncludingLinks</a> is true by default. You can set this property to\r
  false if you do not want or need the bounds of member links to affect the bounds of any Groups.\r
</p>\r
\r
<h2 id="simple-router-example"><a class="not-prose heading-anchor" href="#simple-router-example">Simple Router example</a></h2>\r
The sample below shows a simple use case of a <a href="../api/symbols/Router.html" target="api">Router</a>, which will cause the vertical segments of links in a <a href="../api/symbols/TreeLayout.html" target="api">TreeLayout</a> to be positioned at a fixed\r
distance from the next node in the tree. This custom router is designed to only operate on the whole <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, not individual <a href="../api/symbols/Group.html" target="api">Group</a>s.\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="AvoidsLinksRouter"><a class="not-prose heading-anchor" href="#AvoidsLinksRouter">Avoids Links Router</a></h2>\r
<p>\r
  When creating diagrams with many Links using Orthogonal or AvoidsNodes routing,\r
  it is common to have segments of separate links overlapping.\r
  GoJS provides an extension, the <a href="../api/symbols/AvoidsLinksRouter.html" target="api">AvoidsLinksRouter</a>,\r
  which will cause such segments to instead be routed in parallel while minimizing the number of crossings between segments.\r
</p>\r
<p>\r
  For a demonstration of the AvoidsLinksRouter in a diagram with many links,\r
  see the <a href="../samples/AvoidsLinksRouter">Avoids Links Router sample</a>.\r
</p>\r
\r
<h2 id="LinkLabelRouter"><a class="not-prose heading-anchor" href="#LinkLabelRouter">Link Label Router</a></h2>\r
<p>\r
  When creating diagrams with many Links that have labels on them,\r
  it is common to have those labels sometimes overlapping each other.\r
  GoJS provides an extension, the <a href="../api/symbols/LinkLabelRouter.html" target="api">LinkLabelRouter</a>,\r
  which will cause such labels to be shifted slightly in order to reduce the overlaps.\r
</p>\r
<p>\r
  Although that Router does not actually modify any Link routes, it may modify the bounds of some Links,\r
  and it can only do so after the default routing of all Links has already taken place.\r
</p>\r
<p>\r
  For a demonstration of the LinkLabelRouter in a diagram with many links,\r
  see the <a href="../samples/LinkLabelRouter">Link Label Router sample</a>.\r
</p>\r
`,codeBlocks:[{id:null,code:`class MyRouter extends go.Router {\r
  // links is a Set of Links that may need to be re-routed to avoid other Links\r
  // container is either a Group or a Diagram\r
  routeLinks(links, container) {\r
    // if container is a Group, operate on those links that are members of that Group\r
    // if container is a Diagram, operate on those links that are top-level (i.e. not in a Group)\r
  }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`routing2`,code:`class CustomTreeRouter extends go.Router {\r
  constructor(init) {\r
    super();\r
    this.name = "CustomTree";\r
    if (init) Object.assign(this, init);\r
  }\r
\r
  canRoute(container) {\r
    if (!super.canRoute(container)) return false;\r
    if (container instanceof go.Diagram) return true;\r
    // only perform routing on the whole Diagram,\r
    // never on Groups\r
    return false;\r
  }\r
\r
  // We do not use the second \`container\` argument\r
  // in this router, because we implemented\r
  // canRoute to ignore groups\r
  routeLinks(links, container) {\r
    links.each(link => {\r
      // only applies to orthogonal links\r
      if (!link.isOrthogonal) return;\r
\r
      // assume links are going left to right\r
      const childX = link.getPoint(link.pointsCount - 1).x;\r
\r
      const p2 = link.getPoint(2);\r
      const p3 = link.getPoint(3);\r
      // don't route horizontal segments\r
      if (Math.abs(p2.x - p3.x) < 0.01) {\r
        link.startRoute();\r
        link.setPoint(2, new go.Point(childX - 10, p2.y));\r
        link.setPoint(3, new go.Point(childX - 10, p3.y));\r
        link.commitRoute();\r
      }\r
    });\r
  }\r
}  // end of CustomTreeRouter\r
\r
diagram.routers.add(new CustomTreeRouter());\r
\r
diagram.layout = new go.TreeLayout();\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("RoundedRectangle", { strokeWidth: 0 })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 8 })\r
        .bind("text", "key")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal })\r
    .add(\r
      new go.Shape({ strokeWidth: 1.5, stroke: '#444' })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "A", color: "lightblue" },\r
  { key: "B", color: "orange" },\r
  { key: "C", color: "lightgreen" },\r
  { key: "D", color: "pink" },\r
  { key: "E", color: "lightblue" },\r
  { key: "F", color: "orange" }\r
], [\r
  { from: "A", to: "B" },\r
  { from: "A", to: "C" },\r
  { from: "B", to: "D" },\r
  { from: "C", to: "E" },\r
  { from: "C", to: "F" }\r
]);\r
\r
window.toggleRouter = () => {\r
  diagram.commit(diag => {\r
    const router = diag.findRouter("CustomTree");\r
    if (router instanceof CustomTreeRouter) {\r
      router.isEnabled = !router.isEnabled;\r
      // this is needed due to dynamically enabling/disabling routers\r
      diag.links.each(link => link.invalidateRoute());\r
    }\r
    document.getElementById("toggleRouter").textContent = \r
      router.isEnabled ? "Disable Router" : "Enable Router";\r
  });\r
}`,isExecutable:!0,animation:!1,html:`<button id="toggleRouter" onclick="toggleRouter();">Disable Router</button>`,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1jknt14`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};