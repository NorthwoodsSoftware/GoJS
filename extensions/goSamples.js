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
  p1.innerHTML = "<a href='https://github.com/NorthwoodsSoftware/GoJS/blob/master/extensions/" + samplename + "' target='_blank'>View this sample page's source on GitHub</a>";
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
    lis[lis.length - 1].className = "selected";
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
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-1506307-5', 'auto');
ga('send', 'pageview');

// commented out sample pages are listed in unlisted.html
//<![CDATA[
var myMenu = '\
  <ul id="sections">\
    <a href="../index.html" target="home"><li>GoJS Home</li></a>\
    <hr />\
    <a href="Fishbone.html"><li>Fishbone Layout</li></a>\
    <a href="Parallel.html"><li>Parallel Layout</li></a>\
    <a href="Serpentine.html"><li>Serpentine Layout</li></a>\
    <a href="Spiral.html"><li>Spiral Layout</li></a>\
    <a href="TreeMap.html"><li>Tree Map Layout</li></a>\
    <a href="Table.html"><li>Table Layout</li></a>\
    <hr />\
    <a href="RealtimeDragSelecting.html"><li>Realtime Selecting</li></a>\
    <a href="DragCreating.html"><li>Drag Creating</li></a>\
    <a href="DragZooming.html"><li>Drag Zooming</li></a>\
    <a href="FreehandDrawing.html"><li>Freehand Drawing</li></a>\
    <a href="CurvedLinkReshaping.html"><li>Link Reshaping</li></a>\
    <a href="PolygonDrawing.html"><li>Polygon Drawing</li></a>\
    <a href="PolylineLinking.html"><li>Polyline Linking</li></a>\
    <a href="LinkShifting.html"><li>Link Shifting</li></a>\
    <a href="LinkLabelDragging.html"><li>Link Label Dragging</li></a>\
    <a href="NodeLabelDragging.html"><li>Node Label Dragging</li></a>\
    <a href="PortShifting.html"><li>Port Shifting</li></a>\
    <a href="ColumnResizing.html"><li>Column Resizing</li></a>\
    <hr />\
    <a href="CheckBoxes.html"><li>CheckBoxes</li></a>\
    <a href="ScrollingTable.html"><li>Scrolling Table</li></a>\
    <a href="Dimensioning.html"><li>Dimensioning Links</li></a>\
    <a href="Robot.html"><li>Simulating Input</li></a>\
    <hr />\
    <a href="DataInspector.html"><li>Data Inspector</li></a>\
    <a href="DebugInspector.html"><li>Debug Inspector</li></a>\
    <hr />\
    <a target="_blank" href="BPMN.html"><li>BPMN Editor</li></a>\
    <hr />\
    <a target="_blank" href="FloorPlanEditor.html"><li>Floor Plan Editor</li></a>\
    <a target="_blank" href="FloorPlanMonitor.html"><li>&nbsp;&nbsp;&nbsp;&nbsp;... and Monitor</li></a>\
    <hr />\
    <a href="../samples/index.html"><li>GoJS Samples</li></a>\
  </ul>';
//]]>
// commented out sample pages are listed in unlisted.html
