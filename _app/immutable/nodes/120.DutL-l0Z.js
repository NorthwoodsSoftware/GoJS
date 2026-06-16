import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Finding and Highlighting Node-Link Paths in Graphs`,titleShort:`Distances and Paths`,indexDescription:`Show distances between two nodes and highlights one of all possible paths between the nodes.`,screenshot:`distances`,priority:2,tags:[`collections`,`force-directed`,`html`],description:`Interactive diagram showing all distances from a node, and highlighting all paths between two nodes.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; background: white; width: 100%; height: 700px"></div>\r
  <p>\r
    <button onclick="chooseTwoNodes()">Choose another two nodes at random</button>\r
  </p>\r
  <p>Here is a list of all paths between the first and second selected nodes. Select a path to highlight it in the diagram.</p>\r
  <select id="myPaths" style="min-width: 100px" size="10"></select>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      contentAlignment: go.Spot.Center,\r
      layout: new go.ForceDirectedLayout(),\r
      maxSelectionCount: 2\r
    });\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Horizontal', {\r
          locationSpot: go.Spot.Center, // Node.location is the center of the Shape\r
          locationObjectName: 'SHAPE',\r
          selectionAdorned: false,\r
          selectionChanged: nodeSelectionChanged // defined below\r
        })\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Circle', {\r
                  name: 'SHAPE',\r
                  fill: 'lightgray', // default value, but also data-bound\r
                  strokeWidth: 0,\r
                  desiredSize: new go.Size(30, 30),\r
                  portId: '' // so links will go to the shape, not the whole node\r
                })\r
                .bindObject('fill', 'isSelected', (s, obj) => s ? 'red' : obj.part.data.color),\r
              new go.TextBlock()\r
                .bind('text', 'distance', d => d === Infinity ? 'INF' : d | 0)\r
            ),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          selectable: false, // links cannot be selected by the user\r
          curve: go.Curve.Bezier,\r
          layerName: 'Background' // don't cross in front of any nodes\r
        })\r
        .add(\r
          new go.Shape({ // this shape only shows when it isHighlighted\r
              isPanelMain: true,\r
              stroke: null,\r
              strokeWidth: 5\r
            })\r
            .bindObject('stroke', 'isHighlighted', h => h ? 'red' : null),\r
          new go.Shape({ // mark each Shape to get the link geometry with isPanelMain: true\r
              isPanelMain: true,\r
              stroke: 'black',\r
              strokeWidth: 1\r
            })\r
            .bind('stroke', 'color'),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    // Override the clickSelectingTool's standardMouseSelect\r
    // If less than 2 nodes are selected, always add to the selection\r
    myDiagram.toolManager.clickSelectingTool.standardMouseSelect = function () {\r
      // method override must be function, not =>\r
      const diagram = this.diagram;\r
      if (diagram === null || !diagram.allowSelect) return;\r
      const e = diagram.lastInput;\r
      const count = diagram.selection.count;\r
      const curobj = diagram.findPartAt(e.documentPoint, false);\r
      if (curobj !== null) {\r
        if (count < 2) {\r
          // add the part to the selection\r
          if (!curobj.isSelected) {\r
            const part = curobj;\r
            if (part !== null) part.isSelected = true;\r
          }\r
        } else {\r
          if (!curobj.isSelected) {\r
            const part = curobj;\r
            if (part !== null) diagram.select(part);\r
          }\r
        }\r
      } else if (e.left && !(e.control || e.meta) && !e.shift) {\r
        // left click on background with no modifier: clear selection\r
        diagram.clearSelection();\r
      }\r
    };\r
\r
    generateGraph();\r
\r
    chooseTwoNodes();\r
  }\r
\r
  // Create an assign a model that has a bunch of nodes with a bunch of random links between them.\r
  function generateGraph() {\r
    const names = [\r
      'Joshua',\r
      'Kathryn',\r
      'Robert',\r
      'Jason',\r
      'Scott',\r
      'Betsy',\r
      'John',\r
      'Walter',\r
      'Gabriel',\r
      'Simon',\r
      'Emily',\r
      'Tina',\r
      'Elena',\r
      'Samuel',\r
      'Jacob',\r
      'Michael',\r
      'Juliana',\r
      'Natalie',\r
      'Grace',\r
      'Ashley',\r
      'Dylan'\r
    ];\r
\r
    const nodeDataArray = [];\r
    for (let i = 0; i < names.length; i++) {\r
      nodeDataArray.push({ key: i, text: names[i], color: go.Brush.randomColor(128, 240) });\r
    }\r
\r
    const linkDataArray = [];\r
    const num = nodeDataArray.length;\r
    for (let i = 0; i < num * 2; i++) {\r
      const a = Math.floor(i / 2);\r
      const b = Math.floor((Math.random() * num) / 4) + 1;\r
      linkDataArray.push({ from: a, to: (a + b) % num, color: go.Brush.randomColor(0, 127) });\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
  }\r
\r
  // Select two nodes at random for which there is a path that connects from the first one to the second one.\r
  function chooseTwoNodes() {\r
    myDiagram.clearSelection();\r
    const num = myDiagram.model.nodeDataArray.length;\r
    let node1 = null;\r
    let node2 = null;\r
    for (let i = Math.floor(Math.random() * num); i < num * 2; i++) {\r
      node1 = myDiagram.findNodeForKey(i % num);\r
      const distances = findDistances(node1);\r
      for (let j = Math.floor(Math.random() * num); j < num * 2; j++) {\r
        node2 = myDiagram.findNodeForKey(j % num);\r
        const dist = distances.get(node2);\r
        if (dist > 1 && dist < Infinity) {\r
          node1.isSelected = true;\r
          node2.isSelected = true;\r
          break;\r
        }\r
      }\r
      if (myDiagram.selection.count > 0) break;\r
    }\r
  }\r
\r
  // This event handler is declared in the node template and is called when a node's\r
  //   Node.isSelected property changes value.\r
  // When a node is selected show distances from the first selected node.\r
  // When a second node is selected, highlight the shortest path between two selected nodes.\r
  // If a node is deselected, clear all highlights.\r
  function nodeSelectionChanged(node) {\r
    const diagram = node.diagram;\r
    if (diagram === null) return;\r
    diagram.clearHighlighteds();\r
    if (node.isSelected) {\r
      // when there is a selection made, always clear out the list of all paths\r
      const sel = document.getElementById('myPaths');\r
      sel.innerHTML = '';\r
\r
      // show the distance for each node from the selected node\r
      const begin = diagram.selection.first();\r
      showDistances(begin);\r
\r
      if (diagram.selection.count === 2) {\r
        const end = node; // just became selected\r
\r
        // highlight the shortest path\r
        highlightShortestPath(begin, end);\r
\r
        // list all paths\r
        listAllPaths(begin, end);\r
      }\r
    }\r
  }\r
\r
  // Have each node show how far it is from the BEGIN node.\r
  // This sets the "distance" property on each node.data.\r
  function showDistances(begin) {\r
    // compute and remember the distance of each node from the BEGIN node\r
    distances = findDistances(begin);\r
\r
    // show the distance on each node\r
    const it = distances.iterator;\r
    while (it.next()) {\r
      const n = it.key;\r
      const dist = it.value;\r
      myDiagram.model.set(n.data, 'distance', dist);\r
    }\r
  }\r
\r
  // Highlight links along one of the shortest paths between the BEGIN and the END nodes.\r
  // Assume links are directional.\r
  function highlightShortestPath(begin, end) {\r
    highlightPath(findShortestPath(begin, end));\r
  }\r
\r
  // A collection of all of the paths between a pair of nodes, a List of Lists of Nodes\r
  var paths = null;\r
\r
  // List all paths from BEGIN to END\r
  function listAllPaths(begin, end) {\r
    // compute and remember all paths from BEGIN to END: Lists of Nodes\r
    paths = collectAllPaths(begin, end);\r
\r
    // update the Selection element with a bunch of Option elements, one per path\r
    const sel = document.getElementById('myPaths');\r
    sel.innerHTML = ''; // clear out any old Option elements\r
    paths.each(p => {\r
      const opt = document.createElement('option');\r
      opt.text = pathToString(p);\r
      sel.add(opt, null);\r
    });\r
    sel.onchange = highlightSelectedPath;\r
  }\r
\r
  // Return a string representation of a path for humans to read.\r
  function pathToString(path) {\r
    let s = path.length + ': ';\r
    for (let i = 0; i < path.length; i++) {\r
      if (i > 0) s += ' -- ';\r
      s += path.get(i).data.text;\r
    }\r
    return s;\r
  }\r
\r
  // This is only used for listing all paths for the selection onchange event.\r
\r
  // When the selected item changes in the Selection element,\r
  // highlight the corresponding path of nodes.\r
  function highlightSelectedPath() {\r
    const sel = document.getElementById('myPaths');\r
    highlightPath(paths.get(sel.selectedIndex));\r
  }\r
\r
  // Highlight a particular path, a List of Nodes.\r
  function highlightPath(path) {\r
    myDiagram.clearHighlighteds();\r
    for (let i = 0; i < path.count - 1; i++) {\r
      const f = path.get(i);\r
      const t = path.get(i + 1);\r
      f.findLinksTo(t).each(l => l.isHighlighted = true);\r
    }\r
  }\r
\r
  // There are three bits of functionality here:\r
  // 1: findDistances(Node) computes the distance of each Node from the given Node.\r
  //    This function is used by showDistances to update the model data.\r
  // 2: findShortestPath(Node, Node) finds a shortest path from one Node to another.\r
  //    This uses findDistances.  This is used by highlightShortestPath.\r
  // 3: collectAllPaths(Node, Node) produces a collection of all paths from one Node to another.\r
  //    This is used by listAllPaths.  The result is remembered in a global variable\r
  //    which is used by highlightSelectedPath.  This does not depend on findDistances.\r
\r
  // Returns a Map of Nodes with distance values from the given source Node.\r
  // Assumes all links are directional.\r
  function findDistances(source) {\r
    const diagram = source.diagram;\r
    // keep track of distances from the source node\r
    const distances = new go.Map(/*go.Node, "number"*/);\r
    // all nodes start with distance Infinity\r
    const nit = diagram.nodes;\r
    while (nit.next()) {\r
      const n = nit.value;\r
      distances.set(n, Infinity);\r
    }\r
    // the source node starts with distance 0\r
    distances.set(source, 0);\r
    // keep track of nodes for which we have set a non-Infinity distance,\r
    // but which we have not yet finished examining\r
    const seen = new go.Set(/*go.Node*/);\r
    seen.add(source);\r
\r
    // keep track of nodes we have finished examining;\r
    // this avoids unnecessary traversals and helps keep the SEEN collection small\r
    const finished = new go.Set(/*go.Node*/);\r
    while (seen.count > 0) {\r
      // look at the unfinished node with the shortest distance so far\r
      const least = leastNode(seen, distances);\r
      const leastdist = distances.get(least);\r
      // by the end of this loop we will have finished examining this LEAST node\r
      seen.delete(least);\r
      finished.add(least);\r
      // look at all Links connected with this node\r
      const it = least.findLinksOutOf();\r
      while (it.next()) {\r
        const link = it.value;\r
        const neighbor = link.getOtherNode(least);\r
        // skip nodes that we have finished\r
        if (finished.has(neighbor)) continue;\r
        const neighbordist = distances.get(neighbor);\r
        // assume "distance" along a link is unitary, but could be any non-negative number.\r
        const dist = leastdist + 1; //Math.sqrt(least.location.distanceSquaredPoint(neighbor.location));\r
        if (dist < neighbordist) {\r
          // if haven't seen that node before, add it to the SEEN collection\r
          if (neighbordist === Infinity) {\r
            seen.add(neighbor);\r
          }\r
          // record the new best distance so far to that node\r
          distances.set(neighbor, dist);\r
        }\r
      }\r
    }\r
\r
    return distances;\r
  }\r
\r
  // This helper function finds a Node in the given collection that has the smallest distance.\r
  function leastNode(coll, distances) {\r
    let bestdist = Infinity;\r
    let bestnode = null;\r
    const it = coll.iterator;\r
    while (it.next()) {\r
      const n = it.value;\r
      const dist = distances.get(n);\r
      if (dist < bestdist) {\r
        bestdist = dist;\r
        bestnode = n;\r
      }\r
    }\r
    return bestnode;\r
  }\r
\r
  // Find a path that is shortest from the BEGIN node to the END node.\r
  // (There might be more than one, and there might be none.)\r
  function findShortestPath(begin, end) {\r
    // compute and remember the distance of each node from the BEGIN node\r
    distances = findDistances(begin);\r
\r
    // now find a path from END to BEGIN, always choosing the adjacent Node with the lowest distance\r
    const path = new go.List();\r
    path.add(end);\r
    while (end !== null) {\r
      let next = leastNode(end.findNodesInto(), distances);\r
      if (next !== null) {\r
        if (distances.get(next) < distances.get(end)) {\r
          path.add(next); // making progress towards the beginning\r
        } else {\r
          next = null; // nothing better found -- stop looking\r
        }\r
      }\r
      end = next;\r
    }\r
    // reverse the list to start at the node closest to BEGIN that is on the path to END\r
    // NOTE: if there's no path from BEGIN to END, the first node won't be BEGIN!\r
    path.reverse();\r
    return path;\r
  }\r
\r
  // Recursively walk the graph starting from the BEGIN node;\r
  // when reaching the END node remember the list of nodes along the current path.\r
  // Finally return the collection of paths, which may be empty.\r
  // This assumes all links are directional.\r
  function collectAllPaths(begin, end) {\r
    const stack = new go.List(/*go.Node*/);\r
    const coll = new go.List(/*go.List*/);\r
\r
    function find(source, end) {\r
      source.findNodesOutOf().each(n => {\r
        if (n === source) return; // ignore reflexive links\r
        if (n === end) {\r
          // success\r
          const path = stack.copy();\r
          path.add(end); // finish the path at the end node\r
          coll.add(path); // remember the whole path\r
        } else if (!stack.has(n)) {\r
          // inefficient way to check having visited\r
          stack.add(n); // remember that we've been here for this path (but not forever)\r
          find(n, end);\r
          stack.removeAt(stack.count - 1);\r
        } // else might be a cycle\r
      });\r
    }\r
\r
    stack.add(begin); // start the path at the begin node\r
    find(begin, end);\r
    return coll;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Click on a node to show distances from that node to each other node. Click on a second node to show a shortest path from the first node to the second node.\r
    (Note that there might not be any path between the nodes.) Clicking on a third node will de-select the first two.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`force-directed`,`html`];var g=y();l(`hduvxz`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};