import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Curved Multi-Node Path Link Routes`,indexDescription:`Demonstrates custom routing for Links running through other Nodes.`,screenshot:`multinodepathlinks`,priority:2,tags:[`collections`,`links`],description:`A custom Link routing that goes smoothly through a sequence of Nodes.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 700px; min-width: 200px"></div>`,jsCode:`class MultiNodePathLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // ignores this.routing, this.adjusting, this.corner, this.smoothness, this.curviness\r
    computePoints() {\r
      // get the list of Nodes that should be along the path\r
      const nodes = [];\r
      if (this.fromNode !== null && this.fromNode.location.isReal()) {\r
        nodes.push(this.fromNode);\r
      }\r
      const midkeys = this.data.path;\r
      if (Array.isArray(midkeys)) {\r
        const diagram = this.diagram;\r
        for (let i = 0; i < midkeys.length; i++) {\r
          const node = diagram.findNodeForKey(midkeys[i]);\r
          if (node instanceof go.Node && node.location.isReal()) {\r
            nodes.push(node);\r
            // Optimization?: remember on each path Node all of\r
            // the MultiNodePathLinks that go through it;\r
            // but this optimization requires maintaining this cache\r
            // in a Diagram Changed event listener.\r
            let set = node._PathLinks;\r
            if (!set) set = node._PathLinks = new go.Set(/*go.Link*/);\r
            set.add(this);\r
          }\r
        }\r
      }\r
      if (this.toNode !== null && this.toNode.location.isReal()) {\r
        nodes.push(this.toNode);\r
      }\r
\r
      // now do the routing\r
      this.clearPoints();\r
      let prevloc = null;\r
      let thisloc = null;\r
      let nextloc = null;\r
      for (let i = 0; i < nodes.length; i++) {\r
        const node = nodes[i];\r
        thisloc = node.location;\r
        nextloc = i < nodes.length - 1 ? nodes[i + 1].location : null;\r
\r
        let prevpt = null;\r
        let nextpt = null;\r
        if (this.curve === go.Curve.Bezier) {\r
          if (prevloc !== null && nextloc !== null) {\r
            const prevang = thisloc.directionPoint(prevloc);\r
            const nextang = thisloc.directionPoint(nextloc);\r
            let avg = (prevang + nextang) / 2;\r
            let clockwise = prevang > nextang;\r
            if (Math.abs(prevang - nextang) > 180) {\r
              avg += 180;\r
              clockwise = !clockwise;\r
            }\r
            if (avg >= 360) avg -= 360;\r
            prevpt = new go.Point(Math.sqrt(thisloc.distanceSquaredPoint(prevloc)) / 4, 0);\r
            prevpt.rotate(avg + (clockwise ? 90 : -90));\r
            prevpt.add(thisloc);\r
            nextpt = new go.Point(Math.sqrt(thisloc.distanceSquaredPoint(nextloc)) / 4, 0);\r
            nextpt.rotate(avg - (clockwise ? 90 : -90));\r
            nextpt.add(thisloc);\r
          } else if (nextloc !== null) {\r
            prevpt = null;\r
            nextpt = thisloc; // fix this point after the loop\r
          } else if (prevloc !== null) {\r
            prevpt = thisloc; // fix this point after the loop\r
            nextpt = null;\r
          }\r
        }\r
\r
        if (prevpt !== null) this.addPoint(prevpt);\r
        this.addPoint(thisloc);\r
        if (nextpt !== null) this.addPoint(nextpt);\r
        prevloc = thisloc;\r
      }\r
\r
      // fix up the end points when it's Bezier\r
      if (this.curve === go.Curve.Bezier) {\r
        // fix up the first point and the first control point\r
        const start = this.getLinkPointFromPoint(this.fromNode, this.fromPort, this.fromPort.getDocumentPoint(go.Spot.Center), this.getPoint(3), true);\r
        const ctrl2 = this.getPoint(2);\r
        this.setPoint(0, start);\r
        this.setPoint(1, new go.Point((start.x * 3 + ctrl2.x) / 4, (start.y * 3 + ctrl2.y) / 4));\r
        // fix up the last point and the last control point\r
        const end = this.getLinkPointFromPoint(\r
          this.toNode,\r
          this.toPort,\r
          this.toPort.getDocumentPoint(go.Spot.Center),\r
          this.getPoint(this.pointsCount - 4),\r
          false\r
        );\r
        const ctrl1 = this.getPoint(this.pointsCount - 3);\r
        this.setPoint(this.pointsCount - 2, new go.Point((end.x * 3 + ctrl1.x) / 4, (end.y * 3 + ctrl1.y) / 4));\r
        this.setPoint(this.pointsCount - 1, end);\r
      }\r
\r
      return true;\r
    }\r
  }\r
  // end MultiNodePathLink class\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false, // would need to copy linkdata.path and update all of the refenced node keys\r
      allowDelete: false, // would need to update linkdata.path for all links going through that node\r
      Changed: invalidateLinkRoutes,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node("Auto", { locationSpot: go.Spot.Center })\r
        .bind('location', 'loc', go.Point.parse)\r
        .add(\r
          new go.Shape({ figure: 'Circle', fill: 'white' })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ font: 'bold 11pt sans-serif' })\r
            .bind('text')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new MultiNodePathLink({ // subclass of Link, defined above\r
          curve: go.Curve.Bezier,\r
          layerName: 'Background',\r
          toShortLength: 4\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 4 })\r
            .bind('stroke', 'color'),\r
          new go.Shape({\r
              toArrow: 'Standard',\r
              scale: 3,\r
              strokeWidth: 0\r
            })\r
            .bind('fill', 'color')\r
        );\r
\r
    function invalidateLinkRoutes(e) {\r
      // when a Node is moved, invalidate the route for all MultiNodePathLinks that go through it\r
      if (e.change === go.ChangeType.Property && e.propertyName === 'location' && e.object instanceof go.Node) {\r
        const diagram = e.diagram;\r
        const node = e.object;\r
        if (node._PathLinks) {\r
          node._PathLinks.each(l => l.invalidateRoute());\r
        }\r
      } else if (e.change === go.ChangeType.Remove && e.object instanceof go.Layer) {\r
        // when a Node is deleted that has MultiNodePathLinks going through it, invalidate those link routes\r
        if (e.oldValue instanceof go.Node) {\r
          const node = e.oldValue;\r
          if (node._PathLinks) {\r
            node._PathLinks.each(l => l.invalidateRoute());\r
          }\r
        } else if (e.oldValue instanceof MultiNodePathLink) {\r
          // when deleting a MultiNodePathLink, remove all references to it in Node._PathLinks\r
          const link = e.oldValue;\r
          const diagram = e.diagram;\r
          const midkeys = link.data.path;\r
          if (Array.isArray(midkeys)) {\r
            for (let i = 0; i < midkeys.length; i++) {\r
              const node = diagram.findNodeForKey(midkeys[i]);\r
              if (node !== null && node._PathLinks) node._PathLinks.remove(link);\r
            }\r
          }\r
        }\r
      }\r
    }\r
\r
    // create a few nodes and links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightyellow', loc: '0 0' },\r
        { key: 2, text: 'Beta', color: 'brown', loc: '200 0' },\r
        { key: 3, text: 'Gamma', color: 'green', loc: '300 100' },\r
        { key: 4, text: 'Delta', color: 'slateblue', loc: '100 200' },\r
        { key: 5, text: 'Epsilon', color: 'aquamarine', loc: '300 350' },\r
        { key: 6, text: 'Zeta', color: 'tomato', loc: '0 100' },\r
        { key: 7, text: 'Eta', color: 'goldenrod', loc: '0 300' },\r
        { key: 8, text: 'Theta', color: 'orange', loc: '300 200' }\r
      ],\r
      [\r
        { from: 1, to: 5, path: [2, 3, 4], color: 'blue' },\r
        { from: 6, to: 5, path: [7, 4, 8], color: 'red' }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates customization of the <a>Link</a>'s routing to go through multiple Nodes. The nodes are specified by key in the link data's "path"\r
    property, which must be an Array of node keys.\r
  </p>\r
  <p>As the user drags around Nodes on the "path", the routing is automatically recomputed to maintain a smooth curve.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`links`];var g=y();l(`ymfe08`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};