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


/* Copyright (C) 1998-2015 by Northwoods Software Corporation. All Rights Reserved. */

// Create a DIV and add it to the document just after the PRE element.
// Evaluate the JavaScript text that is in the PRE element in order to initialize the Diagram.
function goCode(pre, w, h, diagramclass, parentid) {
  if (diagramclass === undefined) diagramclass = go.Diagram;
  if (typeof pre === "string") pre = document.getElementById(pre);
  var div = document.createElement("div");
  div.style.width = w + "px";
  div.style.height = h + "px";
  div.className = "diagramContainer";
  var parent;
  if (parentid === undefined) {
    parent = pre.parentNode;
  } else {
    parent = document.getElementById(parentid);
  }
  parent.appendChild(div);
  // temporarily bind "diagram" to the main Diagram for the DIV, and "$" to go.GraphObject.make
  var f = eval("(function (diagram, $) {" + pre.textContent + "})");
  f(new diagramclass(div), go.GraphObject.make);
}

// Traverse the whole document and replace <a>TYPENAME</a> with:
//    <a href="../api/symbols/TYPENAME.html">TYPENAME</a>
// and <a>TYPENAME.MEMBERNAME</a> with:
//    <a href="../api/symbols/TYPENAME.html#MEMBERNAME">TYPENAME.MEMBERNAME</a>
function goIntro() {
  _traverseDOM(document);
  // add standard header and footer
  var hdr = document.createElement("div");
  hdr.className = "header";
  hdr.innerHTML = "GoJS&reg; Diagramming Components for JavaScript and HTML by Northwoods Software&reg;";
  document.body.insertBefore(hdr, document.body.firstChild);
  var ftr = document.createElement("div");
  ftr.className = "footer";
  var msg = "Copyright &copy; 1998-2015 by Northwoods Software Corporation.";
  if (go && go.version) {
    msg = "GoJS&reg; version " + go.version + ". " + msg;
  }
  ftr.innerHTML = msg;
  document.body.appendChild(ftr);

  var menu = document.createElement('div');
  menu.id = "menu";
  menu.innerHTML = myMenu;
  document.body.insertBefore(menu, document.body.firstChild);

  // When the page loads, change the class of li's
  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex+1).toLowerCase();
  var lis = document.getElementById("sections").getElementsByTagName("li");
  var l = lis.length;
  for (var i = 0; i < l; i++) {
    var lowerhref = lis[i].parentNode.href.toLowerCase();
    if (lowerhref.indexOf('intro') === -1) continue;
    if (lowerhref.indexOf(url) !== -1) {
      lis[i].className = "selected";
      return;
    }
  }
}

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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-1506307-5', 'gojs.net');
ga('send', 'pageview');


//<![CDATA[
var myMenu = '\
  <ul id="sections">\
    <a href="../index.html" target="home"><li>GoJS Home</li></a>\
    <hr />\
    <a href="index.html"><li>Introduction</li></a>\
    <a href="buildingObjects.html"><li>Building Parts</li></a>\
    <a href="textBlocks.html"><li>TextBlocks</li></a>\
    <a href="shapes.html"><li>Shapes</li></a>\
    <a href="pictures.html"><li>Pictures</li></a>\
    <a href="panels.html"><li>Panels</li></a>\
    <a href="tablePanels.html"><li>Table Panels</li></a>\
    <a href="sizing.html"><li>Sizing Objects</li></a>\
    <a href="usingModels.html"><li>Using Models</li></a>\
    <a href="dataBinding.html"><li>Data Binding</li></a>\
    <a href="itemArrays.html"><li>Item Arrays</li></a>\
    <a href="changedEvents.html"><li>Changed Events</li></a>\
    <a href="transactions.html"><li>Transactions</li></a>\
    <a href="viewport.html"><li>Coordinates</li></a>\
    <a href="initialView.html"><li>Initial View</li></a>\
    <a href="collections.html"><li>Collections</li></a>\
    <a href="links.html"><li>Links</li></a>\
    <a href="linkLabels.html"><li>Link Labels</li></a>\
    <a href="connectionPoints.html"><li>Link Points</li></a>\
    <a href="ports.html"><li>Ports</li></a>\
    <a href="nodes.html"><li>Nodes</li></a>\
    <a href="layouts.html"><li>Layouts</li></a>\
    <a href="trees.html"><li>Trees</li></a>\
    <a href="subtrees.html"><li>SubTrees</li></a>\
    <a href="groups.html"><li>Groups</li></a>\
    <a href="subgraphs.html"><li>SubGraphs</li></a>\
    <a href="sizedGroups.html"><li>Sized Groups</li></a>\
    <a href="selection.html"><li>Selection</li></a>\
    <a href="highlighting.html"><li>Highlighting</li></a>\
    <a href="toolTips.html"><li>ToolTips</li></a>\
    <a href="contextmenus.html"><li>Context Menus</li></a>\
    <a href="events.html"><li>Diagram Events</li></a>\
    <a href="tools.html"><li>Tools</li></a>\
    <a href="commands.html"><li>Commands</li></a>\
    <a href="permissions.html"><li>Permissions</li></a>\
    <a href="validation.html"><li>Validation</li></a>\
    <a href="layers.html"><li>Layers</li></a>\
    <a href="palette.html"><li>Palette</li></a>\
    <a href="overview.html"><li>Overview</li></a>\
    <a href="resizing.html"><li>Resizing Diagrams</li></a>\
    <a href="buttons.html"><li>Buttons</li></a>\
    <a href="templateMaps.html"><li>Template Maps</li></a>\
    <a href="legends.html"><li>Legends and Titles</li></a>\
    <a href="extensions.html"><li>Extensions</li></a>\
    <a href="geometry.html"><li>Geometry Strings</li></a>\
    <a href="grids.html"><li>Grid Patterns</li></a>\
    <a href="makingImages.html"><li>Diagram Images</li></a>\
    <a href="makingSVG.html"><li>Diagram SVG</li></a>\
    <a href="printing.html"><li>Printing</li></a>\
    <a href="serverSideImages.html"><li>Server-side Images</li></a>\
    <a href="performance.html"><li>Performance</li></a>\
    <a href="deployment.html"><li>Deployment</li></a>\
  </ul>';
//]]>