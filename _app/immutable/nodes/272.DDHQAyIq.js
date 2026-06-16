import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Horizontal Timeline with Events Laid Out Avoiding Overlaps`,titleShort:`Timeline`,indexDescription:`A simple timeline with events arranged along a line.`,screenshot:`timeline`,priority:2,tags:[`tables`,`itemarrays`,`links`,`customlayout`,`commands`],description:`A stretchable timeline.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; background: #252526; width: 100%; height: 400px"></div>`,jsCode:`// This custom Layout locates the timeline bar at (0,0)\r
  // and alternates the event Nodes above and below the bar at\r
  // the X-coordinate locations determined by their data.date values.\r
  class TimelineLayout extends go.Layout {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    doLayout(coll) {\r
      const diagram = this.diagram;\r
      if (diagram === null) return;\r
      coll = this.collectParts(coll);\r
      diagram.startTransaction('TimelineLayout');\r
\r
      let line = null;\r
      const parts = [];\r
      const it = coll.iterator;\r
      while (it.next()) {\r
        const part = it.value;\r
        if (part instanceof go.Link) continue;\r
        if (part.category === 'Line') {\r
          line = part;\r
          continue;\r
        }\r
        parts.push(part);\r
        let d = part.data.date;\r
        if (d === undefined) {\r
          d = new Date();\r
          part.data.date = d;\r
        }\r
      }\r
      if (!line) throw Error("No node of category 'Line' for TimelineLayout");\r
\r
      line.location = new go.Point(0, 0);\r
\r
      // lay out the events above the timeline\r
      if (parts.length > 0) {\r
        // determine the offset from the main shape to the timeline's boundaries\r
        const main = line.findMainElement();\r
        const sw = main.strokeWidth;\r
        const mainOffX = main.actualBounds.x;\r
        const mainOffY = main.actualBounds.y;\r
        // spacing is between the Line and the closest Nodes, defaults to 30\r
        let spacing = line.data.lineSpacing;\r
        if (!spacing) spacing = 30;\r
        for (let i = 0; i < parts.length; i++) {\r
          const part = parts[i];\r
          const bnds = part.actualBounds;\r
          const dt = part.data.date;\r
          const val = dateToValue(dt);\r
          const pt = line.graduatedPointForValue(val);\r
          const tempLoc = new go.Point(pt.x, pt.y - bnds.height / 2 - spacing);\r
          // check if this node will overlap with previously placed events, and offset if needed\r
          for (let j = 0; j < i; j++) {\r
            const partRect = new go.Rect(tempLoc.x, tempLoc.y, bnds.width, bnds.height);\r
            const otherLoc = parts[j].location;\r
            const otherBnds = parts[j].actualBounds;\r
            const otherRect = new go.Rect(otherLoc.x, otherLoc.y, otherBnds.width, otherBnds.height);\r
            if (partRect.intersectsRect(otherRect)) {\r
              tempLoc.offset(0, -otherBnds.height - 10);\r
              j = 0; // now that we have a new location, we need to recheck in case we overlap with an event we didn't overlap before\r
            }\r
          }\r
          part.location = tempLoc;\r
        }\r
      }\r
\r
      diagram.commitTransaction('TimelineLayout');\r
    }\r
  }\r
  // end TimelineLayout class\r
\r
  // This custom Link class was adapted from several of the samples\r
  class BarLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {\r
      const r = port.getDocumentBounds();\r
      const op = otherport.getDocumentPoint(go.Spot.Center);\r
      const main = node.category === 'Line' ? node.findMainElement() : othernode.findMainElement();\r
      const mainOffY = main.actualBounds.y;\r
      let y = r.top;\r
      if (node.category === 'Line') {\r
        y += mainOffY;\r
        if (op.x < r.left) return new go.Point(r.left, y);\r
        if (op.x > r.right) return new go.Point(r.right, y);\r
        return new go.Point(op.x, y);\r
      } else {\r
        return new go.Point(r.centerX, r.bottom);\r
      }\r
    }\r
  }\r
  // end BarLink class\r
\r
  function valueToDate(n) {\r
    const timeline = myDiagram.model.findNodeDataForKey('timeline');\r
    const startDate = timeline.start;\r
    const startDateMs = startDate.getTime() + startDate.getTimezoneOffset() * 60000;\r
    const msPerDay = 24 * 60 * 60 * 1000;\r
    const date = new Date(startDateMs + n * msPerDay);\r
    return date.toLocaleDateString();\r
  }\r
\r
  function dateToValue(d) {\r
    const timeline = myDiagram.model.findNodeDataForKey('timeline');\r
    const startDate = timeline.start;\r
    const startDateMs = startDate.getTime() + startDate.getTimezoneOffset() * 60000;\r
    const dateInMs = d.getTime() + d.getTimezoneOffset() * 60000;\r
    const msSinceStart = dateInMs - startDateMs;\r
    const msPerDay = 24 * 60 * 60 * 1000;\r
    return msSinceStart / msPerDay;\r
  }\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      'commandHandler.decreaseZoom': function () {\r
        changeScale(1 / 1.05);\r
      }, // method override must be function, not =>\r
      'commandHandler.increaseZoom': function () {\r
        changeScale(1.05);\r
      }, // method override must be function, not =>\r
      'commandHandler.resetZoom': function () {\r
        setScale(1.0);\r
      }, // method override must be function, not =>\r
      layout: new TimelineLayout(),\r
      isTreePathToChildren: false // arrows from children (events) to the parent (timeline bar)\r
    });\r
\r
    function changeScale(factor) {\r
      const oldscale = myDiagram.model.modelData.scale || 1.0;\r
      const newscale = factor ? oldscale * factor : 1.0;\r
      setScale(newscale);\r
    }\r
\r
    function setScale(scale) {\r
      const docpt = myDiagram.lastInput.documentPoint.copy();\r
      let line = null;\r
      myDiagram.commit(diag => {\r
        diag.model.set(diag.model.modelData, 'scale', scale);\r
        diag.nodes.each(n => {\r
          if (n.category === 'Line') {\r
            line = n;\r
            n.updateTargetBindings();\r
            return;\r
          }\r
        });\r
      }, null); // no UndoManager\r
      if (line !== null && docpt.x > line.position.x) {\r
        myDiagram.position = new go.Point(docpt.x - (docpt.x - line.position.x) / scale, myDiagram.position.y);\r
      }\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Table', { locationSpot: go.Spot.Center, movable: false })\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape('RoundedRectangle', {\r
                fill: '#252526',\r
                stroke: '#519ABA',\r
                strokeWidth: 3\r
              }),\r
              new go.Panel('Table')\r
                .add(\r
                  new go.TextBlock({\r
                      row: 0,\r
                      stroke: '#CCCCCC',\r
                      wrap: go.Wrap.Fit,\r
                      font: 'bold 12pt sans-serif',\r
                      textAlign: 'center',\r
                      margin: 4\r
                    })\r
                    .bind('text', 'event'),\r
                  new go.TextBlock({\r
                      row: 1,\r
                      stroke: '#A074C4',\r
                      textAlign: 'center',\r
                      margin: 4\r
                    })\r
                    .bind('text', 'date', d => d.toLocaleDateString())\r
                )\r
            )\r
        );\r
\r
    myDiagram.nodeTemplateMap.add('Line',\r
      new go.Node('Graduated', {\r
          movable: false,\r
          copyable: false,\r
          resizable: true,\r
          resizeObjectName: 'MAIN',\r
          background: 'transparent',\r
          graduatedMin: 0,\r
          graduatedMax: 365,\r
          graduatedTickUnit: 1,\r
          // only resizing at right end\r
          resizeAdornmentTemplate:\r
            new go.Adornment('Spot')\r
              .add(\r
                new go.Placeholder(),\r
                new go.Shape({\r
                  alignment: go.Spot.Right,\r
                  cursor: 'e-resize',\r
                  desiredSize: new go.Size(4, 16),\r
                  fill: 'lightblue',\r
                  stroke: 'deepskyblue'\r
                })\r
              )\r
        })\r
        .bind('graduatedMax', '', timelineDays)\r
        .add(\r
          new go.Shape('LineH', {\r
              name: 'MAIN',\r
              stroke: '#519ABA',\r
              height: 1,\r
              strokeWidth: 3\r
            })\r
            .bindTwoWay('width', 'length',\r
              (l, shape) => l * (shape.diagram.model.modelData.scale || 1.0),\r
              (w, data, model) => w / (model.modelData.scale || 1.0)\r
            ),\r
          new go.Shape({\r
            geometryString: 'M0 0 V10',\r
            interval: 7,\r
            stroke: '#519ABA',\r
            strokeWidth: 2\r
          }),\r
          new go.TextBlock({\r
              font: '10pt sans-serif',\r
              stroke: '#CCCCCC',\r
              interval: 14,\r
              alignmentFocus: go.Spot.Right,\r
              segmentOrientation: go.Orientation.Minus90,\r
              segmentOffset: new go.Point(0, 12),\r
              graduatedFunction: valueToDate\r
            })\r
            .bind('interval', 'length', calculateLabelInterval)\r
        )\r
      );\r
\r
    function calculateLabelInterval(len) {\r
      if (len >= 800) return 7;\r
      else if (400 <= len && len < 800) return 14;\r
      else if (200 <= len && len < 400) return 21;\r
      else if (140 <= len && len < 200) return 28;\r
      else if (110 <= len && len < 140) return 35;\r
      else return 365;\r
    }\r
\r
    // The template for the link connecting the event node with the timeline bar node:\r
    myDiagram.linkTemplate =\r
      new BarLink({ toShortLength: 2, layerName: 'Background' }) // defined below\r
        .add(\r
          new go.Shape({ stroke: '#E37933', strokeWidth: 2 })\r
        );\r
\r
    // Setup the model data -- an object describing the timeline bar node\r
    // and an object for each event node:\r
    const data = [\r
      {\r
        // this defines the actual time "Line" bar\r
        key: 'timeline',\r
        category: 'Line',\r
        lineSpacing: 30, // distance between timeline and event nodes\r
        length: 700, // the width of the timeline\r
        start: new Date('1 Jan 2016'),\r
        end: new Date('31 Dec 2016')\r
      },\r
\r
      // the rest are just "events" --\r
      // you can add as much information as you want on each and extend the\r
      // default nodeTemplate to show as much information as you want\r
      { event: "New Year's Day", date: new Date('1 Jan 2016') },\r
      { event: 'MLK Jr. Day', date: new Date('18 Jan 2016') },\r
      { event: 'Presidents Day', date: new Date('15 Feb 2016') },\r
      { event: 'Memorial Day', date: new Date('30 May 2016') },\r
      { event: 'Independence Day', date: new Date('4 Jul 2016') },\r
      { event: 'Labor Day', date: new Date('5 Sep 2016') },\r
      { event: 'Columbus Day', date: new Date('10 Oct 2016') },\r
      { event: 'Veterans Day', date: new Date('11 Nov 2016') },\r
      { event: 'Thanksgiving', date: new Date('24 Nov 2016') },\r
      { event: 'Christmas', date: new Date('25 Dec 2016') }\r
    ];\r
\r
    // prepare the model by adding links to the Line\r
    for (let i = 0; i < data.length; i++) {\r
      const d = data[i];\r
      if (d.key !== 'timeline') d.parent = 'timeline';\r
    }\r
\r
    myDiagram.model = new go.TreeModel({ nodeDataArray: data });\r
  }\r
\r
  function timelineDays() {\r
    const timeline = myDiagram.model.findNodeDataForKey('timeline');\r
    const startDate = timeline.start;\r
    const endDate = timeline.end;\r
\r
    function treatAsUTC(date) {\r
      const result = new Date(date);\r
      result.setMinutes(result.getMinutes() - result.getTimezoneOffset());\r
      return result;\r
    }\r
\r
    const millisecondsPerDay = 24 * 60 * 60 * 1000;\r
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates an example usage of a <a href="../intro/graduatedPanels">Graduated Panel</a> to draw ticks and text labels along a timeline.\r
  </p>\r
  <p>The Panel uses a <a>Panel.graduatedTickUnit</a> of 1 to represent one day, and ticks are drawn at <a>Shape.interval</a>s of 7 to represent weeks.</p>\r
  <p>\r
    Labels are drawn at <a>TextBlock.interval</a>s of 14, or every two weeks. As the timeline is resized, the interval is updated to prevent overlaps. Text\r
    strings are generated by setting the <a>TextBlock.graduatedFunction</a>to convert from values in the graduated range to date strings. Also notice that\r
    labels use the <a>GraphObject.alignmentFocus</a>, <a>GraphObject.segmentOrientation</a>, and <a>GraphObject.segmentOffset</a> properties to place text below\r
    the timeline bar.\r
  </p>\r
  <p>\r
    Try resizing the timeline: select the timeline and drag the resize handle that is on the right side. Event nodes will automatically be laid out relative to\r
    the timeline using the <code>TimelineLayout</code>. TimelineLayout converts a date to a value, then uses <a>Panel.graduatedPointForValue</a> to help\r
    determine where event nodes will be placed.\r
  </p>\r
  <p>\r
    We have many other timeline samples available demonstrating various features.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`links`,`customlayout`,`commands`];var g=y();l(`1syhrv8`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};