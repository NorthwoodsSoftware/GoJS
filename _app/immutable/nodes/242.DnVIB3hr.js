import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Reshaping and Rotating Sectors of Circles`,indexDescription:`A custom Tool that supports interactive reshaping of pie-shaped sectors of circles.`,screenshot:`sectorreshaping`,priority:2,tags:[`tools`,`extensions`,`geometries`],description:`A demonstration of the SectorReshapingTool extension.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // install the SectorReshapingTool as a mouse-down tool\r
    myDiagram.toolManager.mouseDownTools.add(new SectorReshapingTool());\r
\r
    function makeSector(data) {\r
      // Geometry converter for the node's "LAMP" Shape\r
      var radius = SectorReshapingTool.getRadius(data);\r
      var angle = SectorReshapingTool.getAngle(data);\r
      var sweep = SectorReshapingTool.getSweep(data);\r
      var start = new go.Point(radius, 0).rotate(angle);\r
      // this is much more efficient than using make:\r
      var geo = new go.Geometry()\r
        .add(\r
          new go.PathFigure(radius + start.x, radius + start.y) // start point\r
            .add(new go.PathSegment(go.SegmentType.Arc, angle, sweep, radius, radius, radius, radius))\r
            .add(new go.PathSegment(go.SegmentType.Line, radius, radius).close())\r
        )\r
        .add(new go.PathFigure(0, 0)) // make sure the Geometry always includes the whole circle\r
        .add(new go.PathFigure(2 * radius, 2 * radius)); // even if only a small sector is "lit"\r
      return geo;\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationSpot: go.Spot.Center,\r
          locationObjectName: 'LAMP',\r
          selectionObjectName: 'LAMP',\r
          selectionAdorned: false\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        // selecting a Node brings it forward in the z-order\r
        .bindObject('layerName', 'isSelected', s => s ? 'Foreground' : '')\r
        .add(\r
          new go.Panel('Spot', { name: 'LAMP' })\r
            .add(\r
              new go.Shape({ fill: 'yellow', stroke: 'lightgray', strokeWidth: 0.5 }) // arc\r
                .bind('geometry', '', makeSector),\r
              new go.Shape('Circle', { name: 'SHAPE', width: 6, height: 6 })\r
            ),\r
          new go.TextBlock({\r
              alignment: new go.Spot(0.5, 0.5, 0, 3),\r
              alignmentFocus: go.Spot.Top,\r
              stroke: 'blue',\r
              background: 'rgba(255,255,255,0.3)'\r
            })\r
            .bindTwoWay('alignment', 'spot', go.Spot.parse, go.Spot.stringify)\r
            .bind('text', 'name')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel([\r
      { name: 'Alpha', radius: 70, sweep: 120 },\r
      { name: 'Beta', radius: 70, sweep: 80, angle: 200 }\r
    ]);\r
\r
    myDiagram.commandHandler.selectAll(); // to show the tool handles\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/SectorReshapingTool.js`],descriptionHtml:`<p>Two of the handles permit changing the angles of the sector; one handle permits changing the radius of the sector.</p>\r
  <p>\r
    Note that the <a>Geometry</a> returned by <code>makeSector</code> always returns a Geometry that occupies the area that would be occupied by a full circle.\r
    That Geometry-creating function also depends on three data properties, <code>radius</code>, <code>angle</code>, and <code>sweep</code>.\r
  </p>\r
  <p>This extension tool is defined in its own file, as <a href="../extensions/SectorReshapingTool.js">SectorReshapingTool.js</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tools`,`extensions`,`geometries`];var g=y();l(`8dik2o`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};