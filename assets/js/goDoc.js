/* Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved. */

// Used on live samples on pages, like Intro
function goCodeExecute(pre, w, h, parentId, animation) {
  if (typeof pre === 'string') pre = document.getElementById(pre);
  var div = document.createElement('div');
  div.style.width = w + 'px';
  div.style.height = h + 'px';
  div.className = 'diagramStyling';
  var parent;
  if (!parentId) {
    pre.after(div);
  } else {
    parent = document.getElementById(parentId);
    parent.appendChild(div);
  }
  // temporarily bind "diagram" to the main Diagram for the DIV, and "$" to go.GraphObject.make
  var f = eval('(function (diagram, $) {' + pre.textContent + '\n})');
  var d = new go.Diagram(div);
  d.animationManager.isInitial = !!animation;
  f(d, go.GraphObject.make);
}

// Traverse document and replace <a>TYPENAME</a> with:
//    <a href="../api/symbols/TYPENAME.html">TYPENAME</a>
// and <a>TYPENAME.MEMBERNAME</a> with:
//    <a href="../api/symbols/TYPENAME.html#MEMBERNAME">TYPENAME.MEMBERNAME</a>
function goDoc() {
  _traverseDOM(document);
}

function _traverseDOM(node) {
  dir = window.location.href.indexOf('changelog.html') !== -1 ? '' : '../';
  if (
    node.nodeType === 1 &&
    node.nodeName === 'A' &&
    !node.getAttribute('href')
  ) {
    var inner = node.innerHTML;
    var text = [inner];
    var isStatic = false;
    if (inner.indexOf(',') > 0) {
      text = inner.split(',');
      isStatic = true;
      node.innerHTML = inner.replace(',', '.');
    } else {
      text = inner.split('.');
    }
    if (text.length === 1) {
      node.setAttribute('href', dir + 'api/symbols/' + text[0] + '.html');
      node.setAttribute('target', 'api');
    } else if (text.length === 2) {
      node.setAttribute(
        'href',
        dir +
          'api/symbols/' +
          text[0] +
          '.html#' +
          (isStatic ? 'static-' : '') +
          text[1]
      );
      node.setAttribute('target', 'api');
    } else {
      alert('Unknown API reference: ' + node.innerHTML);
    }
  }
  if (
    node.nodeType === 1 &&
    (node.nodeName === 'H2' ||
      node.nodeName === 'H3' ||
      node.nodeName === 'H4') &&
    node.id
  ) {
    node.addEventListener('click', e => {
      window.location.hash = '#' + node.id;
    });
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    _traverseDOM(node.childNodes[i]);
  }
}

var coll = document.getElementById('navButton');
var navList = document.getElementById('navList');
if (coll !== null) {
  coll.addEventListener('click', () => {
    coll.classList.toggle('active');
    navList.classList.toggle('hidden');
    document.getElementById('navOpen').classList.toggle('hidden');
    document.getElementById('navClosed').classList.toggle('hidden');
  });

  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex + 1).toLowerCase();
  var aTags = navList.getElementsByTagName('a');
  var currentindex = -1;
  for (var i = 0; i < aTags.length; i++) {
    var lowerhref = aTags[i].href.toLowerCase();
    if (lowerhref.indexOf('/' + url) !== -1) {
      currentindex = i;
      aTags[i].classList.add('bg-nwoods-secondary');
      aTags[i].style = 'color: white';
      break;
    }
  }
}
