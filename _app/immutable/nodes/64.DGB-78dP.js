import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`SVG renderer`},htmlContent:`<h1>SVG renderer</h1>\r
<p>\r
  By default, GoJS renders to an HTML Canvas.\r
  This is more performant, especially with larger graphs, and is the right choice for most users.\r
  However, a few use-cases may require an SVG rendering context instead.\r
  Some examples:\r
</p>\r
<ul>\r
  <li><strong>Animated GIFs:</strong>\r
    The SVG context can display animated GIF content, unlike the default Canvas renderer.\r
  </li>\r
  <li><strong>Selectability:</strong>\r
    When pointer events are turned off via CSS, users have the option of selecting text within TextBlocks.\r
  </li>\r
  <li><strong>Testing:</strong>\r
    Test code can examine the SVG DOM to determine the visual state of the diagram.\r
    However the SVG DOM might not include Parts that are outside of the viewport.\r
  </li>\r
</ul>\r
<p>\r
  Unless you have a specific use case in mind, usage of the default Canvas context is recommended instead.\r
  SVG content is more susceptible to interference from other content on the site such as CSS rules.\r
</p>\r
<p>\r
  Note that GoJS also has <a href="makingSVG">SVG export</a>, which a can be useful for generating\r
  static SVG diagrams or content for a PDF, and its usage is more common.\r
</p>\r
\r
<p>\r
  Enabling SVG rendering of the viewport is done by setting <a href="../api/symbols/Diagram.html#renderer" target="api">Diagram.renderer</a> to <code>'svg'</code>:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h2 id="AnimatedGIFs"><a class="not-prose heading-anchor" href="#AnimatedGIFs">Animated GIFs</a></h2>\r
<p>\r
  Due to limitations in the HTML Canvas, GIF image frames beyond the first cannot be displayed.\r
  The SVG context avoids this problem, and will show GIF animations:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<h2 id="ContentSecurityPolicy"><a class="not-prose heading-anchor" href="#ContentSecurityPolicy">Content security policy</a></h2>\r
<p>\r
  Rendering SVG requires dynamically creating, modifying, and deleting SVG DOM elements.\r
  If your app must run on a server with a\r
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP" target="_blank">Content Security Policy</a>,\r
  you will need to allow rendering SVG DOM.\r
</p>\r
<p>\r
  This is an example of a policy directive that is restrictive to only allow same-origin sources but still allows SVG to be rendered:\r
</p>\r
<code>\r
  Content-Security-Policy: default-src 'self'; style-src-attr 'self' 'unsafe-inline'\r
</code>\r
<p>\r
  If the browsers that you need to operate on might not support the\r
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr" target="_blank">style-src-attr</a>\r
  directive, you can use the less restrictive "style-src" directive:\r
</p>\r
<code>\r
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'\r
</code>\r
`,codeBlocks:[{id:null,code:`const diagram = new go.Diagram('myDiagramDiv', { renderer: 'svg' });`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`gif-bad`,code:`// Using HTML Canvas, the GIF cannot animate\r
diagram.add(\r
  new go.Part("Vertical")\r
    .add(\r
      new go.Picture("./images/caffeine.gif",\r
          { width: 100, height: 100 }),\r
      new go.TextBlock("caffeine")\r
    )\r
)`,isExecutable:!0,animation:!1,minHeight:210,language:`js`,initiallyVisible:!0},{id:`gif`,code:`// Set the renderer to use SVG:\r
diagram.renderer = 'svg';\r
diagram.add(\r
  new go.Part("Vertical")\r
    .add(\r
      new go.Picture("./images/caffeine.gif",\r
          { width: 100, height: 100 }),\r
      new go.TextBlock("caffeine")\r
    )\r
)`,isExecutable:!0,animation:!1,minHeight:220,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1tt3gm3`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};