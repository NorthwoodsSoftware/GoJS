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

  var copyr = 'Copyright &copy; 1998-2025 by Northwoods Software Corporation.';
  var p2 = document.createElement('p');
  p2.classList = 'text-xs';
  p2.innerHTML = window.go
    ? 'GoJS version ' + go.version + '. ' + copyr
    : copyr;
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
  const updateText = () => {
    var script = byId('code');
    if (!script) return;
    if (ele=document.getElementById('goViewSource')) {
      ele.style.display = ele.style.display ? '' : 'none';
      return;
    }
    var sp1 = document.createElement('pre');
    sp1.id = 'goViewSource';
    sp1.classList.add('lang-js');
    let text = script.innerHTML
      // .replaceAll('&', '&amp;')
      // .replaceAll('"', '&quot;')
      // .replaceAll(`'`, '&apos;')
      .replaceAll('<', '&lt;') // fixes tiger.html
      .replaceAll('>', '&gt;')
    sp1.innerHTML = text;
    var samplediv = byId('sample') || document.body;
    samplediv.parentElement.appendChild(sp1);
    Prism.highlightElement(sp1);
    window.scrollBy(0, 100);
  };
  if (typeof Prism === 'undefined') {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.href = '../assets/css/prism.css';
    document.head.appendChild(elem);
    var prism = document.createElement('script');
    prism.onload = updateText;
    prism.src = '../assets/js/prism.js';
    document.head.appendChild(prism);
  } else updateText();
}

// dontDownload=true will return the html that was meants to be downloaded
// instead of actually downloading it
async function goDownload(dontDownload) {
  const res = await fetch(location.href); // fetch this sample again
  const fullSampleHTML = await res.text();
  const iframe = document.createElement('iframe');
  document.body.append(iframe);
  iframe.sandbox = ''; // disable js in this iframe
  iframe.style.display = 'none'; // make sure this doesn't change the page height
  await new Promise((resolve) => {
    iframe.onload = () => {resolve()};
    setTimeout(resolve, 100); // wait at most 100ms
  });
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.documentElement.innerHTML = '<body>' + fullSampleHTML.split('<body>')[1];
  const sampleHTML = iframeDoc.getElementById('allSampleContent').outerHTML;  // or "sample" + "code", but this contains both and more
  iframe.remove();

  var title = location.href.substring(location.href.lastIndexOf('/') + 1);
  var sampleParent = byId('sample').parentElement;
  // sampleParent.removeChild(b1);
  // sampleParent.removeChild(b2);
  b1.remove();
  b2.remove();
  const hasPrism = typeof window.Prism !== 'undefined';
  const includeNonModule = `<script src="https://cdn.jsdelivr.net/npm/gojs@${go.version}/release/go.js"><\/script>`;
  const includeModule =`<script type="importmap">
    { "imports": { "gojs": "https://cdn.jsdelivr.net/npm/gojs@${go.version}/release/go-module.js" } }
  </script>`
  const scriptInclude = sampleHTML.includes("import * as go from 'gojs'") ? includeModule : includeNonModule;

  const prismImport =
`<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>`;

  var text =
`<!DOCTYPE html>
<html lang="en">
<body>
${scriptInclude}${hasPrism ? `\n${prismImport}` : ''}
<p>
  This is a minimalist HTML and JavaScript skeleton of the GoJS Sample
  <a href="https://gojs.net/latest/${samplePath}">${title}<\/a>. It was automatically generated from a button on the sample page,
  and does not contain the full HTML. It is intended as a starting point to adapt for your own usage.
  For many samples, you may need to inspect the
  <a href="https://github.com/NorthwoodsSoftware/GoJS/blob/master/${samplePath}">full source on Github<\/a>
  and copy other files or scripts.
<\/p>
${sampleHTML}
</body>
</html>`;
  // replace all uses of '../extensions' with CDN equivalent
  text = text.replace(
    /\.\.\/extensions/g,
    `https://cdn.jsdelivr.net/npm/create-gojs-kit@${go.version}/dist/extensions`
  );
  // any src that does not begin with 'http' should get `https://cdn.jsdelivr.net/npm/gojs@${go.version}/CURRENTFOLDER/`
  text = text.replace(
    /<script src="(?:(?!http))+/g,
    `https://cdn.jsdelivr.net/npm/gojs@${go.version}/${dirName}`
  );

  if (dontDownload === true) {
    // sampleParent.appendChild(b1);
    // sampleParent.appendChild(b2);
    return text;
  } else {
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
}
