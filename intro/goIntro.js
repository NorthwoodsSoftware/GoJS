/* Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved. */

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
  require(["highlight", "jquery", "bootstrap"], function () { });
} else {
  function goLoadSrc(filenames) {
    var scripts = document.getElementsByTagName("script");
    var script = null;
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf("goIntro") > 0) {
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

// Create a DIV and add it to the document just after the PRE element.
// Evaluate the JavaScript text that is in the PRE element in order to initialize the Diagram.
function goCode(pre, w, h, diagramclass, parentid) {
  if (diagramclass === undefined) diagramclass = go.Diagram;
  if (typeof pre === "string") pre = document.getElementById(pre);
  var div = document.createElement("div");
  div.style.width = w + "px";
  div.style.height = h + "px";
  div.className = "diagramStyling";
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

  // add class to main content
  var content = document.getElementById('content');
  content.className = "col-md-10";

  // side navigation
  var navindex = document.createElement('div');
  navindex.id = "navindex";
  navindex.className = "col-md-2";
  navindex.innerHTML = myMenu;
  var container = document.getElementById('container');
  container.insertBefore(navindex, content);


  // top navbar
  var navbar = document.createElement('div');
  navbar.innerHTML = myNavbar;
  document.body.insertBefore(navbar, container);

  // When the page loads, change the class of li's to highlight the current page
  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex + 1).toLowerCase();
  var lis = document.getElementById("sections").getElementsByTagName("li");
  var l = lis.length;

  var currentindex = -1;
  for (var i = 0; i < l; i++) {
    var lowerhref = lis[i].childNodes[0].href.toLowerCase();
    if (lowerhref.indexOf('intro') === -1) continue;
    if (lowerhref.indexOf('/' + url) !== -1) {
      currentindex = i;
      lis[i].childNodes[0].className = "selected";
      break;
    }
  }

  // prev & next page navigation
  var pagenav = document.createElement("div");
  var nav = "<div>";
  if (currentindex > 0) {
    var prevurl = lis[currentindex - 1].childNodes[0].href.toLowerCase();
    nav += "<a href='" + prevurl + "'>&lt;Previous Intro Page</a>";
  } else {
    nav += "<a href='../learn/index.html'>&lt;Learn</a>";
  }
  if (currentindex < lis.length - 1) {
    var nexturl = lis[currentindex + 1].childNodes[0].href.toLowerCase();
    nav += "<a style='float:right' href='" + nexturl + "'>Next Intro Page&gt;</a>";
  }
  nav += "</div>";
  pagenav.innerHTML = nav;
  content.appendChild(pagenav);

  // footer
  var footer = document.createElement("div");
  footer.className = "footer";
  var msg = "Copyright &copy; 1998-2020 by Northwoods Software Corporation.";
  if (window.go && go.version) {
    msg = "GoJS&reg; version " + go.version + ". " + msg;
  }
  footer.innerHTML = msg;
  content.appendChild(footer);
}

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


(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-1506307-5', 'auto');
ga('send', 'pageview');



//<![CDATA[
var myMenu = '\
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
        <span class="navbar-brand">Introduction</span>\
      </div>\
    </div>\
    <div id="DiagramNavbar" class="navbar-collapse collapse sidebar-navbar-collapse">\
    <ul id="sections" class="classList nav navbar-nav">\
      <li><a href="index.html">Basics</a></li>\
      <li><a href="buildingObjects.html">Building Parts</a></li>\
      <li><a href="usingModels.html">Using Models</a></li>\
      <li><a href="dataBinding.html">Data Binding</a></li>\
      <li><a href="react.html">GoJS with React</a></li>\
      <li><a href="angular.html">GoJS with Angular</a></li>\
      <li><a href="textBlocks.html">TextBlocks</a></li>\
      <li><a href="shapes.html">Shapes</a></li>\
      <li><a href="pictures.html">Pictures</a></li>\
      <li><a href="panels.html">Panels</a></li>\
      <li><a href="tablePanels.html">Table Panels</a></li>\
      <li><a href="brush.html">Brushes</a></li>\
      <li><a href="sizing.html">Sizing Objects</a></li>\
      <li><a href="itemArrays.html">Item Arrays</a></li>\
      <li><a href="changedEvents.html">Changed Events</a></li>\
      <li><a href="transactions.html">Transactions</a></li>\
      <li><a href="viewport.html">Coordinates</a></li>\
      <li><a href="initialView.html">Initial View</a></li>\
      <li><a href="collections.html">Collections</a></li>\
      <li><a href="links.html">Links</a></li>\
      <li><a href="linkLabels.html">Link Labels</a></li>\
      <li><a href="connectionPoints.html">Link Points</a></li>\
      <li><a href="ports.html">Ports</a></li>\
      <li><a href="nodes.html">Nodes</a></li>\
      <li><a href="debugging.html">Debugging</a></li>\
      <li><a href="layouts.html">Layouts</a></li>\
      <li><a href="trees.html">Trees</a></li>\
      <li><a href="subtrees.html">SubTrees</a></li>\
      <li><a href="groups.html">Groups</a></li>\
      <li><a href="subgraphs.html">SubGraphs</a></li>\
      <li><a href="sizedGroups.html">Sized Groups</a></li>\
      <li><a href="selection.html">Selection</a></li>\
      <li><a href="highlighting.html">Highlighting</a></li>\
      <li><a href="animation.html">Animation</a></li>\
      <li><a href="toolTips.html">ToolTips</a></li>\
      <li><a href="contextmenus.html">Context Menus</a></li>\
      <li><a href="events.html">Diagram Events</a></li>\
      <li><a href="tools.html">Tools</a></li>\
      <li><a href="commands.html">Commands</a></li>\
      <li><a href="permissions.html">Permissions</a></li>\
      <li><a href="validation.html">Validation</a></li>\
      <li><a href="HTMLInteraction.html">HTML Interaction</a></li>\
      <li><a href="layers.html">Layers &amp; Z-ordering</a></li>\
      <li><a href="palette.html">Palette</a></li>\
      <li><a href="overview.html">Overview</a></li>\
      <li><a href="resizing.html">Resizing Diagrams</a></li>\
      <li><a href="replacingDeleting.html">Replacing and Deleting</a></li>\
      <li><a href="buttons.html">Buttons</a></li>\
      <li><a href="templateMaps.html">Template Maps</a></li>\
      <li><a href="legends.html">Legends and Titles</a></li>\
      <li><a href="extensions.html">Extensions</a></li>\
      <li><a href="geometry.html">Geometry Strings</a></li>\
      <li><a href="grids.html">Grid Patterns</a></li>\
      <li><a href="graduatedPanels.html">Graduated Panels</a></li>\
      <li><a href="makingImages.html">Diagram Images</a></li>\
      <li><a href="makingSVG.html">Diagram SVG</a></li>\
      <li><a href="printing.html">Printing</a></li>\
      <li><a href="serverSideImages.html">Server-side Images</a></li>\
      <li><a href="nodeScript.html">GoJS in Node.js</a></li>\
      <li><a href="storage.html">Storage</a></li>\
      <li><a href="performance.html">Performance</a></li>\
      <li><a href="source.html">Building from Source</a></li>\
      <li><a href="deployment.html">Deployment</a></li>\
    </ul>\
    </div>\
  </div>\
  </div>';
//]]>


//<![CDATA[
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
          <li><a href="../download.html">Download</a></li>\
          <li><a href="https://forum.nwoods.com/c/gojs">Forum</a></li>\
          <li><a href="https://www.nwoods.com/contact.html" onclick="ga(\'send\',\'event\',\'Outbound Link\',\'click\',\'contact\');">Contact</a></li>\
          <li class="buy"><a href="https://www.nwoods.com/sales/index.html" onclick="ga(\'send\',\'event\',\'Outbound Link\',\'click\',\'buy\');">Buy</a></li>\
          <li class="activate"><a href="https://www.nwoods.com/app/activate.aspx?sku=gojs">Activate</a></li>\
        </ul>\
      </div><!--/.nav-collapse -->\
    </div>\
  </nav>';
//]]>