import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{category:`Getting Started`,title:`Installation`,categoryOrder:2},htmlContent:`<h1>Installing GoJS</h1>\r
<p>\r
  GoJS has no external dependencies or build tooling, so getting up and running can be quite simple.\r
</p>\r
\r
\r
<h2 id="TryGoJS"><a class="not-prose heading-anchor" href="#TryGoJS">Try GoJS</a></h2>\r
<p>\r
  Feel free to play around with our code examples throughout the learn pages and samples.\r
  There is no need to install anything -- just edit the code.\r
  For example, try changing a text string in this example's JavaScript code:\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  You can download these playgrounds as simple HTML files that will run locally.\r
</p>\r
\r
<h2 id="DebugRelease"><a class="not-prose heading-anchor" href="#DebugRelease">Development vs Deployment</a></h2>\r
<p>\r
  The GoJS library comes in both "debug" and "release" variations in the <code>release</code> directory:\r
</p>\r
<ul>\r
  <li><a href="../release/go.js">go.js</a>, the standard runtime library, used for &lt;script&gt; tags or <b>require</b>.</li>\r
  <li><a href="../release/go-debug.js">go-debug.js</a>,\r
    the same functionality as <code>go.js</code>, but with more error checking, for use during development.</li>\r
  <li><a href="../release/go.mjs">go.mjs</a> and <a href="../release/go-debug.mjs">go-debug.mjs</a>\r
    are the same functionality but as ECMAScript modules, for bundling or for Node.js.</li>\r
  <li><a href="../release/go-module.js">go-module.js</a> and <a href="../release/go-debug-module.js">go-debug-module.js</a>,\r
    copies of the <code>*.mjs</code> files.</li>\r
</ul>\r
<p>\r
  We recommend that you use <code>go-debug.js</code> (or <code>go-debug.mjs</code>) while doing your initial development --\r
  it is more likely to signal errors or provide meaningful error messages than when using <code>go.js</code>.\r
  Always remember to look at the console log to see if there are any error or warning messages.\r
</p>\r
\r
<h2 id="CDNs"><a class="not-prose heading-anchor" href="#CDNs">Using GoJS from a CDN</a></h2>\r
<p>You can use GoJS directly from a CDN via a script tag:</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<a href="https://unpkg.com/gojs/" target="_blank" rel="noopener">unpkg</a>:\r
<ul>\r
  <li>Latest release library: <code>"https://unpkg.com/gojs"</code>\r
  </li>\r
  <li>Latest v3.1 library: <code>"https://unpkg.com/gojs@3.1"</code>\r
  </li>\r
  <li>Latest debug library: <code>"https://unpkg.com/gojs/release/go-debug.js"</code>\r
  </li>\r
</ul>\r
\r
<a href="https://www.jsdelivr.com/package/npm/gojs" target="_blank" rel="noopener">JSDELIVR</a>:\r
<ul>\r
  <li>Latest release library: <code>"https://cdn.jsdelivr.net/npm/gojs"</code>\r
  </li>\r
  <li>Latest v3.1 library: <code>"https://cdn.jsdelivr.net/npm/gojs@3.1"</code>\r
  </li>\r
  <li>Latest debug library: <code>"https://cdn.jsdelivr.net/npm/gojs/release/go-debug.js"</code>\r
  </li>\r
</ul>\r
\r
<h2 id="npm"><a class="not-prose heading-anchor" href="#npm">Installing via npm</a></h2>\r
<p>You can also download GoJS via <a href="https://www.npmjs.com/package/gojs" target="_blank" rel="noopener">npm</a>:</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  When importing the module, environments that support development/production\r
  distinctions (like Vite) will automatically choose to use <code>go-debug.js</code> when developing\r
  and <code>go.js</code> when building/bundling.\r
</p>\r
\r
<p>\r
  The contents of that package only include the library.\r
  If you want to download the extensions, samples, or documentation, they are in the <code>create-gojs-kit</code> package.\r
  Download its contents by executing:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h2 id="Github"><a class="not-prose heading-anchor" href="#Github">GitHub</a></h2>\r
<p>\r
  We also maintain a <a href="https://github.com/NorthwoodsSoftware/GoJS" target="_blank" rel="noopener">GitHub\r
    Repository</a> of all libraries,\r
  documentation, samples, and extensions.\r
  This allows you to <a href="https://github.com/NorthwoodsSoftware/GoJS/search?q=setDataProperty&amp;type=Code"\r
    target="_blank" rel="noopener">search\r
    through documentation and code online</a>.\r
</p>\r
\r
<h2 id="Versions"><a class="not-prose heading-anchor" href="#Versions">New versions</a></h2>\r
<p>\r
  You can learn about new releases in several manners:\r
</p>\r
<ul>\r
  <li>read or follow the <a href="https://forum.nwoods.com/c/gojs" target="_blank" rel="noopener">Northwoods GoJS Forum</a></li>\r
  <li>"watch" the <a href="https://github.com/NorthwoodsSoftware/GoJS" target="_blank" rel="noopener">GoJS GitHub\r
      repository</a> for new releases</li>\r
  <li>read the <a href="https://www.npmjs.com/package/gojs" target="_blank" rel="noopener">GoJS npm package</a> page, or\r
    write a "hook" for it</li>\r
  <li>follow us on Twitter: <a href="https://twitter.com/northwoodsgo" target="_blank" rel="noopener">@NorthwoodsGo</a></li>\r
  <li>read the GoJS Change Log page (<a href="https://gojs.net/latest/changelog.html" target="_blank"\r
      rel="noopener">latest<span id="thisversion"></span>)</a></li>\r
</ul>\r
<p>\r
  When updating or upgrading to a newer version, please read the <a href="../changelog.html" target="_blank">Change Log</a>.\r
</p>\r
\r
<h2 id="Evaluation"><a class="not-prose heading-anchor" href="#Evaluation">Evaluation License Agreement</a></h2>\r
<p>\r
  If you wish to use the GoJS library for your private evaluation,\r
  you may do so only under the terms of the <a href="../evaluationLicense.html" target="_blank" rel="noopener">Evaluation License Agreement</a>.\r
  We encourage you to <a href="https://nwoods.com/register.html" target="_blank" rel="noopener">register</a> if you\r
  discover you need\r
  technical support during your evaluation.\r
</p>\r
<p>\r
  After purchasing a license, you may deploy by acquiring a license key for your web site's domain.\r
  See <a href="deployment">Deployment</a> for more discussion.\r
</p>\r
`,codeBlocks:[{id:`play`,code:`diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Hello" },\r
  { key: 2, text: "world" }\r
],\r
[\r
  { key: -1, from: 1, to: 2 }\r
]);`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:null,code:`<script src="https://unpkg.com/gojs"><\/script>\r
<!-- or -->\r
<script src="https://cdn.jsdelivr.net/npm/gojs"><\/script>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`$ npm install gojs`,isExecutable:!1,language:`shell`,initiallyVisible:!0},{id:null,code:`$ npm create gojs-kit@latest`,isExecutable:!1,language:`shell`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`p2em0o`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};