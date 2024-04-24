window.byId = (id) => {
  return document.getElementById(id);
};
document.addEventListener('DOMContentLoaded', () => {
  var p1 = document.createElement('p');
  window.dirName = location.pathname.split('/').slice(-2);
  window.samplePath = dirName.join('/'); // dir/name.html
  p1.innerHTML =
    "<a href='https://github.com/NorthwoodsSoftware/GoJS/blob/master/" +
    samplePath +
    "' target='_blank'>View this sample page's source on GitHub</a>";
  byId('sample').parentElement.appendChild(p1);
  window.b1 = document.createElement('button');
  window.b2 = document.createElement('button');
  b1.onclick = goViewSource;
  b2.onclick = goDownload;
  b1.innerText = 'View the code for this sample in-page';
  b2.innerText = 'Download the HTML and JS to use as a starting point';
  byId('sample').parentElement.appendChild(b1);
  byId('sample').parentElement.appendChild(b2);

  var copyright = 'Copyright 1998-2024 by Northwoods Software.';
  var p2 = document.createElement('p');
  p2.classList = 'text-xs';
  p2.innerHTML = window.go
    ? 'GoJS version ' + go.version + '. ' + copyright
    : copyright;
  byId('sample').appendChild(p2);

  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex + 1).toLowerCase();

  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-S5QK8VSK84';
  document.body.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-S5QK8VSK84');
  window.getOutboundLink = function (url, label) {
    gtag('event', 'click', {
      event_category: 'outbound',
      event_label: label,
      transport_type: 'beacon',
    });
  };

  _traverseDOM(document);
});

function _traverseDOM(node) {
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
      node.setAttribute('href', '../api/symbols/' + text[0] + '.html');
      node.setAttribute('target', 'api');
    } else if (text.length === 2) {
      node.setAttribute(
        'href',
        '../api/symbols/' +
          text[0] +
          '.html' +
          '#' +
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
    node.addEventListener('click', function (e) {
      window.location.hash = '#' + node.id;
    });
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    _traverseDOM(node.childNodes[i]);
  }
}

function goViewSource() {
  // load prism for code highlighting
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.href = '../assets/css/prism.css';
  document.head.appendChild(elem);
  var prism = document.createElement('script');
  prism.onload = () => {
    var script = byId('code');
    if (!script) return;
    var sp1 = document.createElement('pre');
    sp1.classList.add('lang-js');
    sp1.innerHTML = script.innerHTML;
    var samplediv = byId('sample') || document.body;
    samplediv.parentElement.appendChild(sp1);
    Prism.highlightElement(sp1);
    window.scrollBy(0, 100);
  };
  prism.src = '../assets/js/prism.js';
  document.head.appendChild(prism);
}

function goDownload() {
  var sampleHTML = byId('allSampleContent'); // or "sample" + "code", but this contains both and more
  var title = location.href.substring(location.href.lastIndexOf('/') + 1);
  var sampleParent = byId('sample').parentElement;
  sampleParent.removeChild(b1);
  sampleParent.removeChild(b2);
  var text = `
  <!DOCTYPE html>
  <html lang="en">
  <body>
  <script src="https://unpkg.com/gojs@${go.version}/release/go.js"><\/script>
  <p>
    This is a minimalist HTML and JavaScript skeleton of the GoJS Sample
    <a href="https://gojs.net/latest/${samplePath}">${title}<\/a>. It was automatically generated from a button on the sample page,
    and does not contain the full HTML. It is intended as a starting point to adapt for your own usage.
    For many samples, you may need to inspect the
    <a href="https://github.com/NorthwoodsSoftware/GoJS/blob/master/${samplePath}">full source on Github<\/a>
    and copy other files or scripts.
  <\/p>
  ${sampleHTML.outerHTML}
  </body>
  </html>`;
  // replace all uses of '../extensions' with unpkg equivalent
  text = text.replace(
    /\.\.\/extensions/g,
    `https://unpkg.com/create-gojs-kit@${go.version}/dist/extensions`
  );
  // any src that does not begin with 'http' should get `https://unpkg.com/gojs@${go.version}/CURRENTFOLDER/`
  text = text.replace(
    /<script src="(?:(?!http))+/g,
    `https://unpkg.com/gojs@${go.version}/${dirName}`
  );
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/html;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', title);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  sampleParent.appendChild(b1);
  sampleParent.appendChild(b2);
}
