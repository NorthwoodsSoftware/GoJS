import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Multiple Arrowheads Along Link Path`,indexDescription:`A custom orthogonal Link that draws arrowheads at the end of each segment.`,screenshot:`multiarrow`,priority:2,tags:[`links`,`force-directed`,`geometries`],description:`A custom Link geometry that draws arrowheads at the end of each segment of orthogonally routed links.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 700px; min-width: 200px"></div>`,jsCode:`// Produce a Geometry that includes an arrowhead at the end of each segment.\r
  // This only works with orthogonal non-Bezier routing.\r
  class MultiArrowLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      this.routing = go.Routing.Orthogonal;\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // produce a Geometry from the Link's route\r
    makeGeometry() {\r
      // get the Geometry created by the standard behavior\r
      const geo = super.makeGeometry();\r
      if (geo.type !== go.GeometryType.Path || geo.figures.length === 0) return geo;\r
      const mainfig = geo.figures.elt(0); // assume there's just one PathFigure\r
      const mainsegs = mainfig.segments;\r
\r
      const arrowLen = 8; // length for each arrowhead\r
      const arrowWid = 3; // actually half-width of each arrowhead\r
      let fx = mainfig.startX;\r
      let fy = mainfig.startY;\r
      for (let i = 0; i < mainsegs.length; i++) {\r
        const a = mainsegs.elt(i);\r
        // assume each arrowhead is a simple triangle\r
        const ax = a.endX;\r
        const ay = a.endY;\r
        let bx = ax;\r
        let by = ay;\r
        let cx = ax;\r
        let cy = ay;\r
        if (fx < ax - arrowLen) {\r
          bx -= arrowLen;\r
          by += arrowWid;\r
          cx -= arrowLen;\r
          cy -= arrowWid;\r
        } else if (fx > ax + arrowLen) {\r
          bx += arrowLen;\r
          by += arrowWid;\r
          cx += arrowLen;\r
          cy -= arrowWid;\r
        } else if (fy < ay - arrowLen) {\r
          bx -= arrowWid;\r
          by -= arrowLen;\r
          cx += arrowWid;\r
          cy -= arrowLen;\r
        } else if (fy > ay + arrowLen) {\r
          bx -= arrowWid;\r
          by += arrowLen;\r
          cx += arrowWid;\r
          cy += arrowLen;\r
        }\r
        geo.add(\r
          new go.PathFigure(ax, ay, true)\r
            .add(new go.PathSegment(go.SegmentType.Line, bx, by))\r
            .add(new go.PathSegment(go.SegmentType.Line, cx, cy).close())\r
        );\r
        fx = ax;\r
        fy = ay;\r
      }\r
\r
      return geo;\r
    }\r
  }\r
  // end of MultiArrowLink class\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.ForceDirectedLayout(),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape({\r
              figure: 'RoundedRectangle',\r
              parameter1: 10,\r
              fill: 'orange', // default fill color\r
              portId: '',\r
              fromLinkable: true,\r
              fromSpot: go.Spot.AllSides,\r
              toLinkable: true,\r
              toSpot: go.Spot.AllSides,\r
              cursor: 'pointer'\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 10, font: 'bold 12pt sans-serif' })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new MultiArrowLink({ // subclass of Link, defined above\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          resegmentable: true\r
        })\r
        .add(\r
          new go.Shape({ isPanelMain: true })\r
            .bind('fill', 'color')\r
          // no arrowhead is defined here -- they are hard-coded in MultiArrowLink.makeGeometry\r
        );\r
\r
    // create a few nodes and links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'one', color: 'lightyellow' },\r
        { key: 2, text: 'two', color: 'brown' },\r
        { key: 3, text: 'three', color: 'green' },\r
        { key: 4, text: 'four', color: 'slateblue' },\r
        { key: 5, text: 'five', color: 'aquamarine' },\r
        { key: 6, text: 'six', color: 'lightgreen' },\r
        { key: 7, text: 'seven' }\r
      ],\r
      [\r
        { from: 5, to: 6, color: 'orange' },\r
        { from: 1, to: 2, color: 'red' },\r
        { from: 1, to: 3, color: 'blue' },\r
        { from: 1, to: 4, color: 'goldenrod' },\r
        { from: 2, to: 5, color: 'fuchsia' },\r
        { from: 3, to: 5, color: 'green' },\r
        { from: 4, to: 5, color: 'black' },\r
        { from: 6, to: 7 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample demonstrates customization of the <a>Link</a> <a>Shape</a>'s <a>Geometry</a>.</p>\r
  <p>\r
    The MultiArrowLink class in this sample inherits from Link and overrides the <a>Link.makeGeometry</a> method to add arrowheads at the end of each interior\r
    segment, assuming that the route is orthogonal.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`force-directed`,`geometries`];var g=y();l(`lglpq7`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};