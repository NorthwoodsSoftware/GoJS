document.addEventListener("DOMContentLoaded", function() {
  var p1 = document.createElement("p");
  var dirName = location.pathname.split('/').slice(-2);
  var path = dirName.join('/'); // dir/name.html
  p1.innerHTML = "<a href='https://github.com/NorthwoodsSoftware/GoJS/blob/master/" +
                path + "' target='_blank'>View this sample page's source on GitHub</a>";
  document.getElementById("sample").appendChild(p1);
  var version = '';
  if (window.go) version = 'GoJS version ' + go.version + '. '
  var p2 = document.createElement("p");
  p2.classList = "text-xs";
  p2.innerHTML = version + 'Copyright 1998-2021 by Northwoods Software.';
  document.getElementById("sample").appendChild(p2);

  document.getElementById("navSide").innerHTML = (dirName[0] === 'samples') ? (navContent + navContent2) : (navContent + navContentExtensions);
  var sidebutton = document.getElementById("navButton");
  var navList = document.getElementById("navList");
  sidebutton.addEventListener("click", function() {
    this.classList.toggle("active");
    navList.classList.toggle("hidden");
    document.getElementById("navOpen").classList.toggle("hidden");
    document.getElementById("navClosed").classList.toggle("hidden");
  });

  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex + 1).toLowerCase();
  var aTags = navList.getElementsByTagName("a");
  var currentindex = -1;
  for (var i = 0; i < aTags.length; i++) {
    var lowerhref = aTags[i].href.toLowerCase();
    if (lowerhref.indexOf('/' + url) !== -1) {
      currentindex = i;
      aTags[i].classList.add("bg-nwoods-secondary");
      aTags[i].style = "color: white";
      break;
    }
  }

  var s = document.createElement('script');
  s.src = "https://www.googletagmanager.com/gtag/js?id=UA-1506307-5";
  document.body.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date()); gtag('config', 'UA-1506307-5');
  var getOutboundLink = function(url, label) {
    gtag('event', 'click', {
      'event_category': 'outbound',
      'event_label': label,
      'transport_type': 'beacon'
    });
  }

  // topnav
  var topButton = document.getElementById("topnavButton");
  var topnavList = document.getElementById("topnavList");
  topButton.addEventListener("click", function() {
    this.classList.toggle("active");
    topnavList.classList.toggle("hidden");
    document.getElementById("topnavOpen").classList.toggle("hidden");
    document.getElementById("topnavClosed").classList.toggle("hidden");
  });
  _traverseDOM(document);
});

function _traverseDOM(node) {
  if (node.nodeType === 1 && node.nodeName === "A" && !node.getAttribute("href")) {
    var inner = node.innerHTML;
    var text = [inner];
    var isStatic = false;
    if (inner.indexOf(",") > 0) {
      text = inner.split(",");
      isStatic = true;
      node.innerHTML = inner.replace(",", ".");
    } else {
      text = inner.split(".");
    }
    if (text.length === 1) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html");
      node.setAttribute("target", "api");
    } else if (text.length === 2) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html" + "#" + (isStatic ? "static-" : "") + text[1]);
      node.setAttribute("target", "api");
    } else {
      alert("Unknown API reference: " + node.innerHTML);
    }
  }
  if (node.nodeType === 1 &&
    (node.nodeName === "H2" || node.nodeName === "H3" || node.nodeName === "H4") &&
    node.id) {
    node.addEventListener("click", function (e) {
      window.location.hash = "#" + node.id;
    });
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    _traverseDOM(node.childNodes[i]);
  }
}

var navContent = `
<div class="flex-shrink-0 px-8 py-4">
  <button id="navButton" class="rounded-lg md:hidden focus:outline-none focus:ring" aria-label="Navigation">
    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
      <path id="navOpen" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
      <path id="navClosed" class="hidden" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </button>
</div>
<nav id="navList" class="min-h-screen hidden md:block sidebar-nav flex-grow px-4 pb-4 md:pb-0 md:overflow-y-auto break-words">
`;
var navContent2 = `<a href="index.html">Samples Index</a>
<hr>
<a href="../samples/orgChartStatic.html">OrgChart (Static)</a>
<a href="../samples/orgChartEditor.html">OrgChart Editor</a>
<a href="../samples/familyTree.html">Family Tree</a>
<a href="../samples/genogram.html">Genogram</a>
<a href="../samples/doubleTree.html">Double Tree</a>
<a href="../samples/mindMap.html">Mind Map</a>
<a href="../samples/decisionTree.html">Decision Tree</a>
<a href="../samples/IVRtree.html">IVR Tree</a>
<a href="../samples/incrementalTree.html">Incremental Tree</a>
<a href="../samples/parseTree.html">Parse Tree</a>
<a href="../samples/treeView.html">Tree View</a>
<a href="../samples/tournament.html">Tournament</a>
<a href="../samples/localView.html">Local View</a>
<hr>
<a href="../samples/flowchart.html">Flowchart</a>
<a href="../samples/blockEditor.html">Block Editor</a>
<a href="../samples/pageFlow.html">Page Flow</a>
<a href="../samples/processFlow.html">Process Flow</a>
<a href="../samples/systemDynamics.html">System Dynamics</a>
<a href="../samples/stateChart.html">State Chart</a>
<a href="../samples/kanban.html">Kanban Board</a>
<a href="../samples/sequentialFunction.html">Sequential Function</a>
<a href="../samples/grafcet.html">Grafcet Diagrams</a>
<a href="../samples/sequenceDiagram.html">Sequence Diagram</a>
<a href="../samples/logicCircuit.html">Logic Circuit</a>
<a href="../samples/records.html">Record Mapper</a>
<a href="../samples/dataFlow.html">Data Flow</a>
<a href="../samples/dynamicPorts.html">Dynamic Ports</a>
<a href="../samples/planogram.html">Planogram</a>
<a href="../samples/seatingChart.html">Seating Chart</a>
<a href="../samples/regrouping.html">Regrouping</a>
<a href="../samples/pipes.html">Pipes</a>
<a href="../samples/draggableLink.html">Draggable Link</a>
<a href="../samples/linksToLinks.html">Links to Links</a>
<hr>
<a href="../samples/beatPaths.html">Beat Paths</a>
<a href="../samples/conceptMap.html">Concept Map</a>
<a href="../samples/euler.html">Euler Diagram</a>
<a href="../samples/dataVisualization.html">Data Visualization</a>
<a href="../samples/entityRelationship.html">Entity Relationship</a>
<a href="../samples/friendWheel.html">Friend Wheel</a>
<a href="../samples/radial.html">Recentering Radial</a>
<a href="../samples/radialPartition.html">Radial Partition</a>
<a href="../samples/distances.html">Distances and Paths</a>
<a href="../samples/sankey.html">Sankey</a>
<a href="../samples/PERT.html">PERT</a>
<a href="../samples/gantt.html">Gantt</a>
<a href="../samples/shopFloorMonitor.html">Shop Floor Monitor</a>
<a href="../samples/kittenMonitor.html">Kitten Monitor</a>
<a href="../samples/grouping.html">Grouping</a>
<a href="../samples/swimBands.html">Layer Bands</a>
<a href="../samples/swimLanes.html">Swim Lanes</a>
<a href="../samples/umlClass.html">UML Class</a>
<hr>
<a href="../samples/minimal.html">Minimal</a>
<a href="../samples/basic.html">Basic (editing)</a>
<a href="../samples/classHierarchy.html">Class Hierarchy</a>
<a href="../samples/DOMTree.html">DOM Tree</a>
<a href="../samples/visualTree.html">Visual Tree</a>
<a href="../samples/shapes.html">Shape Figures</a>
<a href="../samples/icons.html">SVG Icons</a>
<a href="../samples/arrowheads.html">Arrowheads</a>
<a href="../samples/navigation.html">Navigation</a>
<a href="../samples/updateDemo.html">Update Demo</a>
<a href="../samples/contentAlign.html">Content Alignment</a>
<a href="../samples/htmlInteraction.html">HTML Interaction</a>
<a href="../samples/customContextMenu.html">Context Menu</a>
<a href="../samples/canvases.html">Canvases</a>
<a href="../samples/comments.html">Comments</a>
<hr>
<a href="../samples/gLayout.html">Grid Layout</a>
<a href="../samples/tLayout.html">Tree Layout</a>
<a href="../samples/fdLayout.html">Force Directed</a>
<a href="../samples/ldLayout.html">Layered Digraph</a>
<a href="../samples/cLayout.html">Circular Layout</a>
<a href="../samples/interactiveForce.html">Interactive Force</a>
<hr>
<a href="../samples/index.html#extensions">GoJS Extensions</a>
<a href="../projects/index.html">GoJS Projects</a>
<a href="../samples/all.html">Complete List</a>
</nav>
`;

var navContentExtensions = ` <a href="../samples/index.html#extensions">Index of Extensions</a>
</nav>
`;