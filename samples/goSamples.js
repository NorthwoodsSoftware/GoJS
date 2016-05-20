// Highlight.js:
if (window.require) {
  require(["../assets/js/highlight.js"], function() {
    //This function is called after some/script.js has loaded.
  });
} else {
  document.write('<script src="../assets/js/highlight.js"></script>');
}

var link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "../assets/css/highlight.css";
document.getElementsByTagName("head")[0].appendChild(link);

/* Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved. */

function goSamples() {
  // save the body for goViewSource() before we modify it
  window.bodyHTML = document.body.innerHTML;
  window.bodyHTML = window.bodyHTML.replace(/</g, "&lt;");
  window.bodyHTML = window.bodyHTML.replace(/>/g, "&gt;");

  // look for links to API documentation and convert them
  _traverseDOM(document);

  // add standard footers
  window.hdr = document.createElement("div");  // remember for hiding in goViewSource()
  var p = document.createElement("p");
  p.innerHTML = "<a href='javascript:goViewSource()'>View this sample page's source in-page</a>";
  hdr.appendChild(p);
  var p1 = document.createElement("p");
  var samplename = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  p1.innerHTML = "<a href='https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/" + samplename + "' target='_blank'>View this sample page's source on GitHub</a>";
  hdr.appendChild(p1);

  var samplediv = document.getElementById("sample") || document.body;
  samplediv.appendChild(hdr);
  var ftr = document.createElement("div");
  ftr.className = "footer";
  var msg = "Copyright &copy; 1998-2016 by Northwoods Software Corporation.";
  if (window.go && window.go.version) {
    msg = "<b>GoJS</b>&reg; version " + window.go.version + " for JavaScript and HTML. " + msg;
  }
  ftr.innerHTML = msg;
  samplediv.appendChild(ftr);

  // add list of samples for navigation
  var menu = document.createElement("div");
  menu.id = "menu";
  menu.innerHTML = myMenu;
  document.body.insertBefore(menu, document.body.firstChild);

  // when the page loads, change the class of navigation LI's
  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex+1).toLowerCase();  // include "/" to avoid matching prefixes
  var lis = document.getElementById("sections").getElementsByTagName("li");
  var l = lis.length;
  var listed = false;
  for (var i = 0; i < l; i++) {
    var anchor = lis[i].childNodes[0];
    var span = document.createElement('span');
    span.className = "samplespan";
    var img = document.createElement('img');
    img.height = "200";
    // ....../samples/X.html becomes X.html becomes X
    var imgname = anchor.href.split('/').pop().split('.')[0];
    if (imgname === "index") continue;
    img.src = "../assets/images/screenshots/" + imgname + ".png";
    span.appendChild(img);
    anchor.appendChild(span);
    if (!anchor.href) continue;
    var lowerhref = anchor.href.toLowerCase();
    if (!listed && lowerhref.indexOf('/' + url) !== -1) {
      anchor.className = "selected";
      listed = true;
    }
  }
  if (!listed) {
    lis[lis.length -1].childNodes[0].className = "selected";
  }

}

// Traverse the whole document and replace <a>TYPENAME</a> with:
//    <a href="../api/symbols/TYPENAME.html">TYPENAME</a>
// and <a>TYPENAME.MEMBERNAME</a> with:
//    <a href="../api/symbols/TYPENAME.html#MEMBERNAME">TYPENAME.MEMBERNAME</a>
function _traverseDOM(node) {
  if (node.nodeType === 1 && node.nodeName === "A" && !node.getAttribute("href")) {
    var text = node.innerHTML.split(".");
    if (text.length === 1) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html");
      node.setAttribute("target", "api");
    } else if (text.length === 2) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html" + "#" + text[1]);
      node.setAttribute("target", "api");
    } else {
      alert("Unknown API reference: " + node.innerHTML);
    }
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    _traverseDOM(node.childNodes[i]);
  }
}

function goViewSource() {
  // show the code:
  var script = document.getElementById("code");
  if (!script) {
    var scripts = document.getElementsByTagName("script");
    script = scripts[scripts.length - 1];
  }
  var sp1 = document.createElement("pre");
  sp1.setAttribute("class", "javascript");
  sp1.innerHTML = script.innerHTML;
  var samplediv = document.getElementById("sample") || document.body;
  samplediv.appendChild(sp1);

  // show the body:
  var sp2 = document.createElement("pre");
  sp2.innerHTML = window.bodyHTML;
  samplediv.appendChild(sp2);

  window.hdr.children[0].style.display = "none"; // hide the "View Source" link

  // apply formatting
  hljs.highlightBlock(sp1);
  hljs.highlightBlock(sp2);
  window.scrollBy(0,100);
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-1506307-5', 'auto');
ga('send', 'pageview');

// commented out sample pages are listed in unlisted.html
//<![CDATA[
var myMenu = '\
  <ul id="sections">\
    <li><a href="index.html"><h2 class="index"><span class="glyphicon glyphicon-th"></span>Index</li></h2></a>\
    <li><a href="minimal.html">Minimal</a></li>\
    <!--<li><a href="minimalJSON.html">Minimal (JSON)</a></li>-->\
    <!--<li><a href="minimalXML.html">Minimal (XML)</a></li>-->\
    <!--<li><a href="require.html">Using RequireJS</a></li>-->\
    <!--<li><a href="angular.html">Using AngularJS</a></li>-->\
    <li><a href="basic.html">Basic</a></li>\
    <li><a href="classHierarchy.html">Class Hierarchy</a></li>\
    <li><a href="DOMTree.html">DOM Tree</a></li>\
    <li><a href="visualTree.html">Visual Tree</a></li>\
    <!--<li><a href="visualTreeGrouping.html">Visual Tree Groups</a></li>-->\
    <li><a href="shapes.html">Shapes</a></li>\
    <!--<li><a href="tiger.html">SVG Tiger</a></li>-->\
    <li><a href="icons.html">SVG Icons</a></li>\
    <li><a href="arrowheads.html">Arrowheads</a></li>\
    <!--<li><a href="relationships.html">Relationships</a></li>-->\
    <li><a href="navigation.html">Navigation</a></li>\
    <li><a href="adornmentButtons.html">Adornment Buttons</a></li>\
    <!--<li><a href="hoverButtons.html">Hover Buttons</a></li>-->\
    <hr />\
    <li><a href="familyTree.html">Family Tree</a></li>\
    <!--<li><a href="familyTreeJP.html">Family Tree (Japanese)</a></li>-->\
    <li><a href="localView.html">Local View</a></li>\
    <li><a href="decisionTree.html">Decision Tree</a></li>\
    <li><a href="incrementalTree.html">Incremental Tree</a></li>\
    <li><a href="doubleTree.html">Double Tree</a></li>\
    <!--<li><a href="doubleTreeJSON.html">Double Tree (JSON)</a></li>-->\
    <li><a href="orgChartStatic.html">OrgChart (Static)</a></li>\
    <li><a href="orgChartEditor.html">OrgChart Editor</a></li>\
    <!--<li><a href="orgChartExtras.html">OrgChart (Extras)</a></li>-->\
    <li><a href="mindMap.html">Mind Map</a></li>\
    <li><a href="tournament.html">Tournament</a></li>\
    <li><a href="treeView.html">Tree View</a></li>\
    <!--<li><a href="pipeTree.html">Pipe Tree</a></li>-->\
    <li><a href="genogram.html">Genogram</a></li>\
    <li><a href="IVRtree.html">IVR Tree</a></li>\
    <li><a href="parseTree.html">Parse Tree</a></li>\
    <!--<li><a href="faultTree.html">Parse Tree</a></li>-->\
    <hr />\
    <li><a href="beatPaths.html">Beat Paths</a></li>\
    <li><a href="conceptMap.html">Concept Map</a></li>\
    <!--<li><a href="pathAnimation.html">Path Animation</a></li>-->\
    <li><a href="euler.html">Euler Diagram</a></li>\
    <li><a href="dataVisualization.html">Data Visualization</a></li>\
    <li><a href="entityRelationship.html">Entity Relationship</a></li>\
    <!--<li><a href="doubleCircle.html">Double Circle</a></li>-->\
    <li><a href="friendWheel.html">Friend Wheel</a></li>\
    <li><a href="radial.html">Recentering Radial</a></li>\
    <!--<li><a href="radialPartition.html">Radial Partition</a></li>-->\
    <li><a href="distances.html">Distances and Paths</a></li>\
    <li><a href="sankey.html">Sankey</a></li>\
    <li><a href="PERT.html">PERT</a></li>\
    <li><a href="gantt.html">Gantt</a></li>\
    <!--<li><a href="timeline.html">Timeline</a></li>-->\
    <li><a href="shopFloorMonitor.html">Shop Floor Monitor</a></li>\
    <li><a href="kittenMonitor.html">Kitten Monitor</a></li>\
    <!--<li><a href="constantSize.html">Constant Size</a></li>-->\
    <!--<li><a href="spacingZoom.html">Spacing Zoom</a></li>-->\
    <li><a href="grouping.html">Grouping</a></li>\
    <li><a href="swimBands.html">Layer Bands</a></li>\
    <li><a href="swimLanes.html">Swim Lanes</a></li>\
    <!--<li><a href="swimLanesVertical.html">Swim Lanes (V)</a></li>-->\
    <li><a href="kanban.html">Kanban Board</a></li>\
    <!--<li><a href="spreadsheet.html">Spreadsheet</a></li>-->\
    <li><a href="umlClass.html">UML Class</a></li>\
    <!--<li><a href="virtualized.html">Virtualized no Layout</a></li>-->\
    <!--<li><a href="virtualizedTree.html">Virtualized Tree</a></li>-->\
    <!--<li><a href="virtualizedTreeLayout.html">Virtualized TreeLayout</a></li>-->\
    <!--<li><a href="virtualizedForceLayout.html">Virtualized ForceLayout</a></li>-->\
    <hr />\
    <li><a href="flowchart.html">Flowchart</a></li>\
    <li><a href="pageFlow.html">Page Flow</a></li>\
    <li><a href="processFlow.html">Process Flow</a></li>\
    <!--<li><a href="productionProcess.html">Production Process</a></li>-->\
    <li><a href="systemDynamics.html">System Dynamics</a></li>\
    <!--<li><a href="flowBuilder.html">Flow Builder</a></li>-->\
    <!--<li><a href="flowgrammer.html">Flowgrammer</a></li>-->\
    <!--<li><a href="network.html">Network Config</a></li>-->\
    <li><a href="stateChart.html">State Chart</a></li>\
    <!--<li><a href="stateChartIncremental.html">State Chart using incremental JSON</a></li>-->\
    <!--<li><a href="sharedStates.html">Shared States</a></li>-->\
    <li><a href="sequentialFunction.html">Sequential Function</a></li>\
    <li><a href="grafcet.html">Grafcet Diagrams</a></li>\
    <li><a href="sequenceDiagram.html">Sequence Diagram</a></li>\
    <li><a href="logicCircuit.html">Logic Circuit</a></li>\
    <li><a href="records.html">Record Mapper</a></li>\
    <!--<li><a href="selectableFields.html">Selectable Fields</a></li>-->\
    <!--<li><a href="treeMapper.html">Tree Mapper</a></li>-->\
    <!--<li><a href="addRemoveColumns.html">Add & Remove Columns</a></li>-->\
    <!--<li><a href="dragDropFields.html">Drag & Drop Fields</a></li>-->\
    <!--<li><a href="dragOutFields.html">Drag Out Fields</a></li>-->\
    <li><a href="dataFlow.html">Data Flow</a></li>\
    <!--<li><a href="dataFlowVertical.html">Data Flow (V)</a></li>-->\
    <li><a href="dynamicPorts.html">Dynamic Ports</a></li>\
    <!--<li><a href="selectablePorts.html">Selectable Ports</a></li>-->\
    <!--<li><a href="draggablePorts.html">Draggable Ports</a></li>-->\
    <li><a href="planogram.html">Planogram</a></li>\
    <li><a href="seatingChart.html">Seating Chart</a></li>\
    <li><a href="regrouping.html">Regrouping</a></li>\
    <!--<li><a href="regroupingScaled.html">Regrouping Scaled</a></li>-->\
    <!--<li><a href="regroupingTreeView.html">Regrouping with Tree View</a></li>-->\
    <li><a href="pipes.html">Pipes</a></li>\
    <li><a href="draggableLink.html">Draggable Link</a></li>\
    <li><a href="linksToLinks.html">Links to Links</a></li>\
    <li><a href="updateDemo.html">Update Demo</a></li>\
    <!--<li><a href="twoDiagrams.html">Two Diagrams</a></li>-->\
    <!--<hr />-->\
    <!--<li><a href="curviness.html">Curviness</a></li>-->\
    <!--<li><a href="multiNodePathLinks.html">Path Links</a></li>-->\
    <!--<li><a href="taperedLinks.html">Tapered Links</a></li>-->\
    <!--<li><a href="multiArrow.html">Multi Arrow</a></li>-->\
    <!--<li><a href="barCharts.html">Bar Charts</a></li>-->\
    <!--<li><a href="pieCharts.html">Pie Charts</a></li>-->\
    <!--<li><a href="candlestickCharts.html">Candlestick Charts</a></li>-->\
    <!--<li><a href="sparklineGraphs.html">Sparkline Graphs</a></li>-->\
    <hr />\
    <li><a href="contentAlign.html">Content Alignment</a></li>\
    <!--<li><a href="absolute.html">Absolute Positioning</a></li>-->\
    <li><a href="htmlInteraction.html">HTML Interaction</a></li>\
    <!--<li><a href="htmlDragDrop.html">HTML Drag and Drop</a></li>-->\
    <!--<li><a href="jQueryDragDrop.html">jQuery Drag and Drop</a></li>-->\
    <!--<li><a href="macros.html">Macros via auto ungrouping</a></li>-->\
    <!--<li><a href="dragUnoccupied.html">Custom Part.dragComputation function to avoid overlapping nodes when dragging</a>-->\
    <!--<li><a href="customTextEditingTool.html">Text Editing</a></li>-->\
    <li><a href="customContextMenu.html">Context Menu</a></li>\
    <!--<li><a href="htmlLightBoxContextMenu.html">LightBox Context</a></li>-->\
    <!--<li><a href="tabs.html">Tabbed Diagrams</a></li>-->\
    <li><a href="canvases.html">Canvases</a></li>\
    <!--<li><a href="magnifier.html">Magnifier</a></li>-->\
    <li><a href="comments.html">Comments</a></li>\
    <hr />\
    <li><a href="gLayout.html">Grid Layout</a></li>\
    <li><a href="tLayout.html">Tree Layout</a></li>\
    <li><a href="fdLayout.html">Force Directed</a></li>\
    <li><a href="ldLayout.html">Layered Digraph</a></li>\
    <li><a href="cLayout.html">Circular Layout</a></li>\
    <li><a href="interactiveForce.html">Interactive Force</a></li>\
    <hr />\
    <li><a href="../extensions/index.html">GoJS Extensions</a></li>\
    <li><a href="unlisted.html">Unlisted Samples</a></li>\
  </ul>';
//]]>
// commented out sample pages are listed in unlisted.html
