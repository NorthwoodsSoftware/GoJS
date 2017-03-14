/* Copyright (C) 1998-2017 by Northwoods Software Corporation. All Rights Reserved. */

// When adding samples or extensions, modify this file, samples/all.html, and samples/indexList.js
// along with adding a 400x400 screenshot in assets/images/screenshots.

// Load necessary scripts:
if (window.require) {
  // declare required libraries and ensure Bootstrap's dependency on jQuery
  require.config({
    paths: {
      "highlight": "../assets/js/highlight",
      "jquery": "../assets/js/jquery.min", // 1.11.3
      "bootstrap": "../assets/js/bootstrap.min"
    },
    shim: {
      "bootstrap": ["jquery"]
    }
  });
  require(["highlight", "jquery", "bootstrap"], function() {});
} else {
  function goLoadSrc(filenames) {
    var scripts = document.getElementsByTagName("script");
    var script = null;
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf("goSamples") > 0) {
        script = scripts[i];
        break;
      }
    }
    for (var i = 0; i < arguments.length; i++) {
      var filename = arguments[i];
      if (!filename) continue;
      var selt = document.createElement("script");
      selt.async = false;
      selt.defer = false;
      selt.src = "../assets/js/" + filename;
      script.parentNode.insertBefore(selt, script.nextSibling);
      script = selt;
    }
  }
  goLoadSrc("highlight.js", (window.jQuery ? "" : "jquery.min.js"), "bootstrap.min.js");
}

var head = document.getElementsByTagName("head")[0];

var link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "../assets/css/bootstrap.min.css";
head.appendChild(link);

link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "../assets/css/highlight.css";
head.appendChild(link);

link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "../assets/css/main.css";
head.appendChild(link);

function goSamples() {
  // determine if it's an extension
  var isExtension = (location.pathname.split('/').slice(-2)[0] === "extensions");

  // save the body for goViewSource() before we modify it
  window.bodyHTML = document.body.innerHTML;
  window.bodyHTML = window.bodyHTML.replace(/</g, "&lt;");
  window.bodyHTML = window.bodyHTML.replace(/>/g, "&gt;");

  // look for links to API documentation and convert them
  _traverseDOM(document);

  // wrap the sample div and sidebar in a fluid container
  var container = document.createElement('div');
  container.className = "container-fluid";
  document.body.appendChild(container);

  // sample content
  var samplediv = document.getElementById('sample') || document.body.firstChild;
  samplediv.className = "col-md-10";
  container.appendChild(samplediv);

  // side navigation
  var navindex = document.createElement('div');
  navindex.id = "navindex";
  navindex.className = "col-md-2";
  navindex.innerHTML = isExtension ? myExtensionMenu : mySampleMenu;
  container.insertBefore(navindex, samplediv);

  // top navbar
  var navbar = document.createElement('div');
  navbar.id = "navtop";
  navbar.innerHTML = myNavbar;
  document.body.insertBefore(navbar, container);

  // footer
  window.hdr = document.createElement("div");  // remember for hiding in goViewSource()
  var p = document.createElement("p");
  p.innerHTML = "<a href='javascript:goViewSource()'>View this sample page's source in-page</a>";
  hdr.appendChild(p);
  var p1 = document.createElement("p");
  var samplename = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  p1.innerHTML = "<a href='https://github.com/NorthwoodsSoftware/GoJS/blob/master/" + (isExtension ? "extensions/" : "samples/") + samplename + "' target='_blank'>View this sample page's source on GitHub</a>";
  hdr.appendChild(p1);

  samplediv.appendChild(hdr);
  var footer = document.createElement("div");
  footer.className = "footer";
  var msg = "Copyright &copy; 1998-2017 by Northwoods Software Corporation.";
  if (go && go.version) {
    msg = "GoJS&reg; version " + go.version + ". " + msg;
  }
  footer.innerHTML = msg;
  samplediv.appendChild(footer);

  // when the page loads, change the class of navigation LI's
  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex+1).toLowerCase();  // include "/" to avoid matching prefixes
  var lis = document.getElementById("sections").getElementsByTagName("li");
  var l = lis.length;
  var listed = false;
  for (var i = 0; i < l; i++) {
    var anchor = lis[i].childNodes[0];
    // ....../samples/X.html becomes X.html becomes X
    var split = anchor.href.split('/').pop().split('.');
    var imgname = split[0];
    if (imgname === "index" || imgname === "all") continue;
    var imgtype = split[1];
    if (imgtype === "js") continue;
    var span = document.createElement('span');
    span.className = "samplespan";
    var img = document.createElement('img');
    img.height = "200";
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

var mySampleMenu = '\
  <div class="sidebar-nav">\
    <div class="navbar navbar-default" role="navigation">\
      <div class="navbar-header">\
        <div class="navheader-container">\
          <div class="navheader-collapse" data-toggle="collapse" data-target="#DiagramNavbar">\
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#DiagramNavbar">\
              <span class="sr-only">Toggle navigation</span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
            </button>\
          </div>\
          <span class="navbar-brand">Samples</span>\
        </div>\
      </div>\
      <div id="DiagramNavbar" class="navbar-collapse collapse sidebar-navbar-collapse">\
        <ul id="sections" class="classList nav navbar-nav">\
          <li><a href="index.html"><b>Index</b></a></li>\
          <li><a href="minimal.html">Minimal</a></li>\
          <li><a href="basic.html">Basic</a></li>\
          <li><a href="classHierarchy.html">Class Hierarchy</a></li>\
          <li><a href="DOMTree.html">DOM Tree</a></li>\
          <li><a href="visualTree.html">Visual Tree</a></li>\
          <li><a href="shapes.html">Shapes</a></li>\
          <li><a href="icons.html">SVG Icons</a></li>\
          <li><a href="arrowheads.html">Arrowheads</a></li>\
          <li><a href="navigation.html">Navigation</a></li>\
          <hr>\
          <li><a href="familyTree.html">Family Tree</a></li>\
          <li><a href="localView.html">Local View</a></li>\
          <li><a href="decisionTree.html">Decision Tree</a></li>\
          <li><a href="incrementalTree.html">Incremental Tree</a></li>\
          <li><a href="doubleTree.html">Double Tree</a></li>\
          <li><a href="orgChartStatic.html">OrgChart (Static)</a></li>\
          <li><a href="orgChartEditor.html">OrgChart Editor</a></li>\
          <li><a href="mindMap.html">Mind Map</a></li>\
          <li><a href="tournament.html">Tournament</a></li>\
          <li><a href="treeView.html">Tree View</a></li>\
          <li><a href="genogram.html">Genogram</a></li>\
          <li><a href="IVRtree.html">IVR Tree</a></li>\
          <li><a href="parseTree.html">Parse Tree</a></li>\
          <hr>\
          <li><a href="beatPaths.html">Beat Paths</a></li>\
          <li><a href="conceptMap.html">Concept Map</a></li>\
          <li><a href="euler.html">Euler Diagram</a></li>\
          <li><a href="dataVisualization.html">Data Visualization</a></li>\
          <li><a href="entityRelationship.html">Entity Relationship</a></li>\
          <li><a href="friendWheel.html">Friend Wheel</a></li>\
          <li><a href="radial.html">Recentering Radial</a></li>\
          <li><a href="radialPartition.html">Radial Partition</a></li>\
          <li><a href="distances.html">Distances and Paths</a></li>\
          <li><a href="sankey.html">Sankey</a></li>\
          <li><a href="PERT.html">PERT</a></li>\
          <li><a href="gantt.html">Gantt</a></li>\
          <li><a href="shopFloorMonitor.html">Shop Floor Monitor</a></li>\
          <li><a href="kittenMonitor.html">Kitten Monitor</a></li>\
          <li><a href="grouping.html">Grouping</a></li>\
          <li><a href="swimBands.html">Layer Bands</a></li>\
          <li><a href="swimLanes.html">Swim Lanes</a></li>\
          <li><a href="umlClass.html">UML Class</a></li>\
          <hr>\
          <li><a href="flowchart.html">Flowchart</a></li>\
          <li><a href="pageFlow.html">Page Flow</a></li>\
          <li><a href="processFlow.html">Process Flow</a></li>\
          <li><a href="systemDynamics.html">System Dynamics</a></li>\
          <li><a href="stateChart.html">State Chart</a></li>\
          <li><a href="kanban.html">Kanban Board</a></li>\
          <li><a href="sequentialFunction.html">Sequential Function</a></li>\
          <li><a href="grafcet.html">Grafcet Diagrams</a></li>\
          <li><a href="sequenceDiagram.html">Sequence Diagram</a></li>\
          <li><a href="logicCircuit.html">Logic Circuit</a></li>\
          <li><a href="records.html">Record Mapper</a></li>\
          <li><a href="dataFlow.html">Data Flow</a></li>\
          <li><a href="dynamicPorts.html">Dynamic Ports</a></li>\
          <li><a href="planogram.html">Planogram</a></li>\
          <li><a href="seatingChart.html">Seating Chart</a></li>\
          <li><a href="regrouping.html">Regrouping</a></li>\
          <li><a href="pipes.html">Pipes</a></li>\
          <li><a href="draggableLink.html">Draggable Link</a></li>\
          <li><a href="linksToLinks.html">Links to Links</a></li>\
          <li><a href="updateDemo.html">Update Demo</a></li>\
          <li><a href="contentAlign.html">Content Alignment</a></li>\
          <li><a href="htmlInteraction.html">HTML Interaction</a></li>\
          <li><a href="customContextMenu.html">Context Menu</a></li>\
          <li><a href="canvases.html">Canvases</a></li>\
          <li><a href="comments.html">Comments</a></li>\
          <li><a href="gLayout.html">Grid Layout</a></li>\
          <li><a href="tLayout.html">Tree Layout</a></li>\
          <li><a href="fdLayout.html">Force Directed</a></li>\
          <li><a href="ldLayout.html">Layered Digraph</a></li>\
          <li><a href="cLayout.html">Circular Layout</a></li>\
          <li><a href="interactiveForce.html">Interactive Force</a></li>\
          <li><a href="../extensions/Fishbone.html">GoJS Extensions</a></li>\
          <li><a href="all.html">Complete List</a></li>\
        </ul>\
      </div>\
    </div>\
  </div>';

var myExtensionMenu = '\
  <div class="sidebar-nav">\
    <div class="navbar navbar-default" role="navigation">\
      <div class="navbar-header">\
        <div class="navheader-container">\
          <div class="navheader-collapse" data-toggle="collapse" data-target="#DiagramNavbar">\
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#DiagramNavbar">\
              <span class="sr-only">Toggle navigation</span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
            </button>\
          </div>\
          <span class="navbar-brand">Extensions</span>\
        </div>\
      </div>\
      <div id="DiagramNavbar" class="navbar-collapse collapse sidebar-navbar-collapse">\
        <ul id="sections" class="classList nav navbar-nav">\
          <li><a href="../samples/index.html"><b>Index</b></a></li>\
          <li><a href="Fishbone.html">Fishbone Layout</a></li>\
          <li><a href="Parallel.html">Parallel Layout</a></li>\
          <li><a href="Serpentine.html">Serpentine Layout</a></li>\
          <li><a href="Spiral.html">Spiral Layout</a></li>\
          <li><a href="TreeMap.html">Tree Map Layout</a></li>\
          <li><a href="Table.html">Table Layout</a></li>\
          <hr>\
          <li><a href="RealtimeDragSelecting.html">Realtime Selecting</a></li>\
          <li><a href="DragCreating.html">Drag Creating</a></li>\
          <li><a href="DragZooming.html">Drag Zooming</a></li>\
          <li><a href="ResizeMultiple.html">Resize Multiple</a></li>\
          <li><a href="RotateMultiple.html">Rotate Multiple</a></li>\
          <li><a href="CurvedLinkReshaping.html">Bez. Link Reshaping</a></li>\
          <li><a href="OrthogonalLinkReshaping.html">Orth. Link Reshaping</a></li>\
          <li><a href="SnapLinkReshaping.html">Snap Link Reshaping</a></li>\
          <li><a href="GeometryReshaping.html">Geometry Reshaping</a></li>\
          <li><a href="SectorReshaping.html">Sector Reshaping</a></li>\
          <li><a href="FreehandDrawing.html">Freehand Drawing</a></li>\
          <li><a href="PolygonDrawing.html">Polygon Drawing</a></li>\
          <li><a href="PolylineLinking.html">Polyline Linking</a></li>\
          <li><a href="LinkShifting.html">Link Shifting</a></li>\
          <li><a href="LinkLabelDragging.html">Link Label Dragging</a></li>\
          <li><a href="NodeLabelDragging.html">Node Label Dragging</a></li>\
          <li><a href="GuidedDragging.html">Guided Dragging</a></li>\
          <li><a href="PortShifting.html">Port Shifting</a></li>\
          <li><a href="ColumnResizing.html">Column Resizing</a></li>\
          <hr>\
          <li><a href="ScrollingTable.html">Scrolling Table</a></li>\
          <li><a href="BalloonLink.html">Balloon Links</a></li>\
          <li><a href="Dimensioning.html">Dimensioning Links</a></li>\
          <li><a href="DrawCommandHandler.html">Drawing Commands</a></li>\
          <li><a href="LocalStorageCommandHandler.html">Local Storage</a></li>\
          <li><a href="Robot.html">Simulating Input</a></li>\
          <li><a href="DataInspector.html">Data Inspector</a></li>\
          <li><a href="DebugInspector.html">Debug Inspector</a></li>\
          <hr>\
          <li><a href="BPMN.html" target="_blank">BPMN Editor</a></li>\
          <li><a href="FloorPlanEditor.html" target="_blank">Floor Plan Editor</a></li>\
          <li><a href="FloorPlanMonitor.html" target="_blank">Floor Plan Monitor</a></li>\
          <li><a href="FloorPlanner.html" target="_blank">Floor Planner</a></li>\
          <hr>\
          <li><a href="CheckBoxes.html">CheckBoxes</a></li>\
          <li><a href="Hyperlink.html">Hyperlinks</a></li>\
          <li><a href="TextEditor.html">Text Editor</a></li>\
          <hr>\
          <li><a href="Buttons.js" target="_blank">Buttons.js</a></li>\
          <li><a href="Figures.js" target="_blank">Figures.js</a></li>\
          <li><a href="Arrowheads.js" target="_blank">Arrowheads.js</a></li>\
          <li><a href="Templates.js" target="_blank">Templates.js</a></li>\
          <li><a href="TextEditor.js" target="_blank">TextEditor.js</a></li>\
          <li><a href="TextEditorRadioButtons.js" target="_blank">TextEditorRadioButtons.js</a></li>\
          <li><a href="TextEditorSelectBox.js" target="_blank">TextEditorSelectBox.js</a></li>\
          <li><a href="../samples/flowchart.html">GoJS Samples</a></li>\
          <li><a href="../samples/all.html">Complete List</a></li>\
        </ul>\
      </div>\
    </div>\
  </div>';

var myNavbar = '\
  <!-- non-fixed navbar -->\
  <nav id="non-fixed-nav" class="navbar navbar-inverse navbar-top">\
    <div class="container-fluid">\
      <div class="navbar-header">\
        <div class="navheader-container">\
          <div class="navheader-collapse" data-toggle="collapse" data-target="#navbar">\
            <a id="toplogo" class="navbar-brand" href="../index.html">GoJS</a>\
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">\
              <span class="sr-only">Toggle navigation</span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
            </button>\
          </div>\
        </div>\
      </div>\
      <div id="navbar" class="navbar-collapse collapse">\
        <ul class="nav navbar-nav navbar-right">\
          <li><a href="../index.html">Home</a></li>\
          <li><a href="../learn/index.html">Learn</a></li>\
          <li><a href="../samples/index.html">Samples</a></li>\
          <li><a href="../intro/index.html">Intro</a></li>\
          <li><a href="../api/index.html" target="api">API</a></li>\
          <li><a href="https://www.nwoods.com/components/evalform.htm">Register</a></li>\
          <li><a href="../doc/download.html">Download</a></li>\
          <li><a href="https://forum.nwoods.com/c/gojs">Forum</a></li>\
          <li><a href="https://www.nwoods.com/contact.html" onclick="ga(\'send\',\'event\',\'Outbound Link\',\'click\',\'contact\');">Contact</a></li>\
          <li class="buy"><a href="https://www.nwoods.com/sales/index.html" onclick="ga(\'send\',\'event\',\'Outbound Link\',\'click\',\'buy\');">Buy</a></li>\
          <li class="activate"><a href="https://www.nwoods.com/app/activate.aspx?sku=gojs">Activate</a></li>\
        </ul>\
      </div><!--/.nav-collapse -->\
    </div>\
  </nav>';