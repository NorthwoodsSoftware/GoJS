import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Tapered Links Custom Computed Geometry for Link Path Shapes`,titleShort:`Tapered Links`,indexDescription:`Demonstrates a custom Geometry for Link paths.`,screenshot:`taperedlinks`,priority:2,tags:[`links`,`force-directed`,`geometries`],description:`A Link class using a custom tapered geometry by overriding Link.makeGeometry.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 700px; min-width: 200px"></div>`,jsCode:`// a Link class with custom path Geometry\r
  class TaperedLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // produce a Geometry from the Link's route\r
    makeGeometry() {\r
      // maybe use the standard geometry for this route, instead?\r
      const numpts = this.pointsCount;\r
      if (numpts < 4 || this.computeCurve() !== go.Curve.Bezier) {\r
        return super.makeGeometry();\r
      }\r
\r
      const p0 = this.getPoint(0);\r
      const p1 = this.getPoint(numpts > 4 ? 2 : 1);\r
      const p2 = this.getPoint(numpts > 4 ? numpts - 3 : 2);\r
      const p3 = this.getPoint(numpts - 1);\r
      const fromHoriz = Math.abs(p0.y - p1.y) < Math.abs(p0.x - p1.x);\r
      const toHoriz = Math.abs(p2.y - p3.y) < Math.abs(p2.x - p3.x);\r
\r
      let p0x = p0.x + (fromHoriz ? 0 : -4);\r
      let p0y = p0.y + (fromHoriz ? -4 : 0);\r
      let p1x = p1.x + (fromHoriz ? 0 : -3);\r
      let p1y = p1.y + (fromHoriz ? -3 : 0);\r
      let p2x = p2.x + (toHoriz ? 0 : -2);\r
      let p2y = p2.y + (toHoriz ? -2 : 0);\r
      let p3x = p3.x + (toHoriz ? 0 : -1);\r
      let p3y = p3.y + (toHoriz ? -1 : 0);\r
\r
      const fig = new go.PathFigure(p0x, p0y, true); // filled\r
      fig.add(new go.PathSegment(go.SegmentType.Bezier, p3x, p3y, p1x, p1y, p2x, p2y));\r
\r
      p0x = p0.x + (fromHoriz ? 0 : 4);\r
      p0y = p0.y + (fromHoriz ? 4 : 0);\r
      p1x = p1.x + (fromHoriz ? 0 : 3);\r
      p1y = p1.y + (fromHoriz ? 3 : 0);\r
      p2x = p2.x + (toHoriz ? 0 : 2);\r
      p2y = p2.y + (toHoriz ? 2 : 0);\r
      p3x = p3.x + (toHoriz ? 0 : 1);\r
      p3y = p3.y + (toHoriz ? 1 : 0);\r
      fig.add(new go.PathSegment(go.SegmentType.Line, p3x, p3y));\r
      fig.add(new go.PathSegment(go.SegmentType.Bezier, p0x, p0y, p2x, p2y, p1x, p1y).close());\r
\r
      const geo = new go.Geometry();\r
      geo.add(fig);\r
      geo.normalize();\r
      return geo;\r
    }\r
  }\r
  // end TaperedLink class\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.ForceDirectedLayout(),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // This controls whether links overlap each other at each side of the node,\r
    // or if the links are spread out on each side of the node.\r
    const SPREADLINKS = true; // must be set before defining templates!\r
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
              fromSpot: SPREADLINKS ? go.Spot.AllSides : go.Spot.None,\r
              toLinkable: true,\r
              toSpot: SPREADLINKS ? go.Spot.AllSides : go.Spot.None,\r
              cursor: 'pointer'\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 10, font: 'bold 12pt sans-serif' })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new TaperedLink({ // subclass of Link, defined below\r
          curve: go.Curve.Bezier,\r
          routing: SPREADLINKS ? go.Routing.Normal : go.Routing.Orthogonal,\r
          fromEndSegmentLength: SPREADLINKS ? 50 : 1,\r
          toEndSegmentLength: SPREADLINKS ? 50 : 1,\r
          relinkableFrom: true,\r
          relinkableTo: true\r
        })\r
        .add(\r
          new go.Shape({ stroke: null, strokeWidth: 0 })\r
            .bind('fill', 'color')\r
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
    The TaperedLink class in this sample inherits from Link and overrides the makeGeometry method. For Bezier-curve Links, this computes a Geometry that is\r
    thick at the "from" end and thin at the "to" end. The implementation is very simple and does not account for links that are coming out from a node at angles\r
    that are not a multiple of 90 degrees.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`force-directed`,`geometries`];var g=y();l(`thvywd`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};