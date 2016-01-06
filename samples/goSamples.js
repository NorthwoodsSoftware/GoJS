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
    var li = lis[i].parentNode;
    if (!li.href) continue;
    var lowerhref = li.href.toLowerCase();
    if (lowerhref.indexOf(url) !== -1) {
      lis[i].className = "selected";
      listed = true;
    }
  }
  if (!listed) {
    lis[lis.length -1].className = "selected";
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
  sp1.setAttribute("data-language", "javascript");
  sp1.innerHTML = script.innerHTML;
  var samplediv = document.getElementById("sample") || document.body;
  samplediv.appendChild(sp1);

  // show the body:
  var sp2 = document.createElement("pre");
  sp2.setAttribute("data-language", "javascript");
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
})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-1506307-5', 'gojs.net');
ga('send', 'pageview');

// commented out sample pages are listed in unlisted.html
//<![CDATA[
var myMenu = '\
  <ul id="sections">\
    <a href="index.html"><li><h2 class="index"><span class="glyphicon glyphicon-th"></span>Index</li></h2></a>\
    <a href="minimal.html"><li>Minimal</li></a>\
    <!--<a href="minimalJSON.html"><li>Minimal (JSON)</li></a>-->\
    <!--<a href="minimalXML.html"><li>Minimal (XML)</li></a>-->\
    <!--<a href="require.html"><li>Using RequireJS</li></a>-->\
    <!--<a href="angular.html"><li>Using AngularJS</li></a>-->\
    <!--<a href="hoverButtons.html"><li>Hover Buttons</li></a>-->\
    <a href="basic.html"><li>Basic</li></a>\
    <a href="classHierarchy.html"><li>Class Hierarchy</li></a>\
    <a href="DOMTree.html"><li>DOM Tree</li></a>\
    <a href="visualTree.html"><li>Visual Tree</li></a>\
    <!--<a href="visualTreeGrouping.html"><li>Visual Tree Groups</li></a>-->\
    <a href="shapes.html"><li>Shapes</li></a>\
    <!--<a href="tiger.html"><li>SVG Tiger</li></a>-->\
    <a href="icons.html"><li>SVG Icons</li></a>\
    <a href="arrowheads.html"><li>Arrowheads</li></a>\
    <a href="navigation.html"><li>Navigation</li></a>\
    <hr />\
    <a href="familyTree.html"><li>Family Tree</li></a>\
    <!--<a href="familyTreeJP.html"><li>Family Tree (Japanese)</li></a>-->\
    <a href="localView.html"><li>Local View</li></a>\
    <a href="decisionTree.html"><li>Decision Tree</li></a>\
    <a href="incrementalTree.html"><li>Incremental Tree</li></a>\
    <a href="doubleTree.html"><li>Double Tree</li></a>\
    <!--<a href="doubleTreeJSON.html"><li>Double Tree (JSON)</li></a>-->\
    <a href="orgChartStatic.html"><li>OrgChart (Static)</li></a>\
    <a href="orgChartEditor.html"><li>OrgChart Editor</li></a>\
    <!--<a href="orgChartExtras.html"><li>OrgChart (Extras)</li></a>-->\
    <a href="mindMap.html"><li>Mind Map</li></a>\
    <a href="tournament.html"><li>Tournament</li></a>\
    <a href="treeView.html"><li>Tree View</li></a>\
    <!--<a href="pipeTree.html"><li>Pipe Tree</li></a>-->\
    <a href="genogram.html"><li>Genogram</li></a>\
    <a href="IVRtree.html"><li>IVR Tree</li></a>\
    <a href="parseTree.html"><li>Parse Tree</li></a>\
    <hr />\
    <a href="beatPaths.html"><li>Beat Paths</li></a>\
    <a href="conceptMap.html"><li>Concept Map</li></a>\
    <a href="euler.html"><li>Euler Diagram</li></a>\
    <a href="dataVisualization.html"><li>Data Visualization</li></a>\
    <a href="entityRelationship.html"><li>Entity Relationship</li></a>\
    <a href="friendWheel.html"><li>Friend Wheel</li></a>\
    <a href="radial.html"><li>Recentering Radial</li></a>\
    <a href="distances.html"><li>Distances and Paths</li></a>\
    <a href="sankey.html"><li>Sankey</li></a>\
    <a href="PERT.html"><li>PERT</li></a>\
    <a href="gantt.html"><li>Gantt</li></a>\
    <!--<a href="timeline.html"><li>Timeline</li></a>-->\
    <a href="shopFloorMonitor.html"><li>Shop Floor Monitor</li></a>\
    <a href="kittenMonitor.html"><li>Kitten Monitor</li></a>\
    <!--<a href="constantSize.html"><li>Constant Size</li></a>-->\
    <!--<a href="spacingZoom.html"><li>Spacing Zoom</li></a>-->\
    <a href="grouping.html"><li>Grouping</li></a>\
    <a href="swimBands.html"><li>Layer Bands</li></a>\
    <a href="swimLanes.html"><li>Swim Lanes</li></a>\
    <!--<a href="swimLanesVertical.html"><li>Swim Lanes (V)</li></a>-->\
    <a href="kanban.html"><li>Kanban Board</li></a>\
    <!--<a href="spreadsheet.html"><li>Spreadsheet</li></a>-->\
    <a href="umlClass.html"><li>UML Class</li></a>\
    <!--<a href="virtualized.html"><li>Virtualized no Layout</li></a>-->\
    <!--<a href="virtualizedTree.html"><li>Virtualized Tree</li></a>-->\
    <!--<a href="virtualizedTreeLayout.html"><li>Virtualized TreeLayout</li></a>-->\
    <!--<a href="virtualizedForceLayout.html"><li>Virtualized ForceLayout</li></a>-->\
    <hr />\
    <a href="flowchart.html"><li>Flowchart</li></a>\
    <a href="pageFlow.html"><li>Page Flow</li></a>\
    <a href="processFlow.html"><li>Process Flow</li></a>\
    <!--<a href="flowBuilder.html"><li>Flow Builder</li></a>-->\
    <!--<a href="flowgrammer.html"><li>Flowgrammer</li></a>-->\
    <!--<a href="network.html"><li>Network Config</li></a>-->\
    <a href="stateChart.html"><li>State Chart</li></a>\
    <!--<a href="sharedStates.html"><li>Shared States</li></a>-->\
    <a href="sequentialFunction.html"><li>Sequential Function</li></a>\
    <a href="grafcet.html"><li>Grafcet Diagrams</li></a>\
    <a href="sequenceDiagram.html"><li>Sequence Diagram</li></a>\
    <a href="logicCircuit.html"><li>Logic Circuit</li></a>\
    <a href="records.html"><li>Record Mapper</li></a>\
    <!--<a href="selectableFields.html"><li>Selectable Fields</li></a>-->\
    <!--<a href="addRemoveColumns.html"><li>Add & Remove Columns</li></a>-->\
    <!--<a href="dragDropFields.html"><li>Drag & Drop Fields</li></a>-->\
    <!--<a href="dragOutFields.html"><li>Drag Out Fields</li></a>-->\
    <a href="dataFlow.html"><li>Data Flow</li></a>\
    <!--<a href="dataFlowVertical.html"><li>Data Flow (V)</li></a>-->\
    <a href="dynamicPorts.html"><li>Dynamic Ports</li></a>\
    <!--<a href="selectablePorts.html"><li>Selectable Ports</li></a>-->\
    <!--<a href="draggablePorts.html"><li>Draggable Ports</li></a>-->\
    <a href="planogram.html"><li>Planogram</li></a>\
    <a href="seatingChart.html"><li>Seating Chart</li></a>\
    <a href="regrouping.html"><li>Regrouping</li></a>\
    <!--<a href="regroupingScaled.html"><li>Regrouping Scaled</li></a>-->\
    <!--<a href="regroupingTreeView.html"><li>Regrouping with Tree View</li></a>-->\
    <a href="pipes.html"><li>Pipes</li></a>\
    <a href="draggableLink.html"><li>Draggable Link</li></a>\
    <a href="linksToLinks.html"><li>Links to Links</li></a>\
    <a href="updateDemo.html"><li>Update Demo</li></a>\
    <!--<a href="twoDiagrams.html"><li>Two Diagrams</li></a>-->\
    <!--<hr />-->\
    <!--<a href="curviness.html"><li>Curviness</li></a>-->\
    <!--<a href="multiNodePathLinks.html"><li>Path Links</li></a>-->\
    <!--<a href="taperedLinks.html"><li>Tapered Links</li></a>-->\
    <!--<a href="multiArrow.html"><li>Multi Arrow</li></a>-->\
    <!--<a href="barCharts.html"><li>Bar Charts</li></a>-->\
    <!--<a href="pieCharts.html"><li>Pie Charts</li></a>-->\
    <!--<a href="candlestickCharts.html"><li>Candlestick Charts</li></a>-->\
    <!--<a href="sparklineGraphs.html"><li>Sparkline Graphs</li></a>-->\
    <hr />\
    <a href="contentAlign.html"><li>Content Alignment</li></a>\
    <a href="htmlInteraction.html"><li>HTML Interaction</li></a>\
    <!--<a href="htmlDragDrop.html"><li>HTML Drag and Drop</li></a>-->\
    <!--<a href="jQueryDragDrop.html"><li>jQuery Drag and Drop</li></a>-->\
    <!--<a href="macros.html"><li>Macros via auto ungrouping</li></a>-->\
    <!--<a href="customTextEditingTool.html"><li>Text Editing</li></a>-->\
    <a href="customContextMenu.html"><li>Context Menu</li></a>\
    <!--<a href="htmlLightBoxContextMenu.html"><li>LightBox Context</li></a>-->\
    <!--<a href="tabs.html"><li>Tabbed Diagrams</li></a>-->\
    <a href="canvases.html"><li>Canvases</li></a>\
    <!--<a href="magnifier.html"><li>Magnifier</li></a>-->\
    <a href="comments.html"><li>Comments</li></a>\
    <hr />\
    <a href="gLayout.html"><li>Grid Layout</li></a>\
    <a href="tLayout.html"><li>Tree Layout</li></a>\
    <a href="fdLayout.html"><li>Force Directed</li></a>\
    <a href="ldLayout.html"><li>Layered Digraph</li></a>\
    <a href="cLayout.html"><li>Circular Layout</li></a>\
    <a href="interactiveForce.html"><li>Interactive Force</li></a>\
    <hr />\
    <a href="../extensions/index.html"><li>GoJS Extensions</li></a>\
    <a href="unlisted.html"><li>Unlisted Samples</li></a>\
  </ul>';
//]]>
// commented out sample pages are listed in unlisted.html
