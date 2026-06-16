import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`GoJS on different platforms`,category:`Frameworks`,categoryOrder:0},htmlContent:`<h1>Using GoJS on different platforms</h1>\r
<p>\r
  GoJS is intended to run in any environment that executes JavaScript. This includes on browsers and within browser frameworks, and also in headless contexts\r
  such as Node.js.\r
</p>\r
\r
<h2 id="react-vue-svelte-angular"><a class="not-prose heading-anchor" href="#react-vue-svelte-angular">React, Vue, Svelte, Angular</a></h2>\r
<p>\r
  We provide samples and components for common JavaScript UI frameworks. GoJS has no dependencies of its own, and it is our expectation that the library should\r
  run within any framework. If you are encountering integration issues with an uncommon framework, please\r
  <a href="https://nwoods.com/contact.html" target="_blank">contact us</a>.\r
</p>\r
<p>We maintain examples for common frameworks:</p>\r
<ul>\r
  <li><strong>React:</strong> We provide a <a href="https://github.com/NorthwoodsSoftware/gojs-react" target="_blank">React component</a> as an\r
    <a href="https://npmjs.com/gojs-react" target="_blank">NPM package</a> and a usage\r
    <a href="https://github.com/NorthwoodsSoftware/gojs-react-basic" target="_blank">sample</a>. See the learn page\r
    <a href="react">Using GoJS with React</a> for more information on React integration. We also have a <a href="../samples#react">React sample</a>.\r
  </li>\r
  <li><strong>Vue:</strong> We provide a <a href="../samples#vue">Vue.js sample</a>. For a Vue 3 sample, clone the GitHub repository:\r
    <a href="https://github.com/NorthwoodsSoftware/gojs-vue-basic">Vue 3 sample using GoJS called <strong>gojs-vue-basic</strong></a>.\r
  </li>\r
  <li><strong>Svelte:</strong> Read the learn page about using <a href="svelte">Svelte</a>. We provide multiple <a href="../samples#svelte">Svelte samples</a>.\r
  </li>\r
  <li><strong>Angular:</strong> We provide an <a href="https://github.com/NorthwoodsSoftware/gojs-angular" target="_blank">Angular component</a> as an\r
    <a href="https://npmjs.com/gojs-angular" target="_blank">NPM package</a> and a usage\r
    <a href="https://github.com/NorthwoodsSoftware/gojs-angular-basic" target="_blank">sample</a>. See the learn page\r
    <a href="angular">Using GoJS with Angular</a> for more information on Angular integration.\r
  </li>\r
</ul>\r
\r
<h2 id="electron"><a class="not-prose heading-anchor" href="#electron">Electron</a></h2>\r
<p>\r
  GoJS can be used in Electron apps. We provide a\r
  <a href="https://github.com/NorthwoodsSoftware/GoJS-projects/tree/master/electron-circuit" target="_blank">sample Electron app using GoJS</a>. Note that an\r
  unlimited domains license is required for use with versions of GoJS before v2.2. As of v2.2, you can specify your Electron app's\r
  <code>package.json</code> "name" attribute when you request a license key.\r
</p>\r
\r
<h2 id="blazor"><a class="not-prose heading-anchor" href="#blazor">Blazor</a></h2>\r
\r
<p>\r
  GoJS can be used alongside Blazor, though all code must be written in JavaScript or TypeScript. We have a\r
  <a href="https://github.com/NorthwoodsSoftware/GoJS-Alongside-Blazor" target="_blank">sample integrating GoJS into a Blazor project</a>.\r
</p>\r
\r
<p>\r
  There is also the <a href="https://godiagram.com/?fromgojs" target="_blank">GoDiagram library</a>, which is based on the GoJS API, that can be used in C#\r
  environments. It will work headlessly or as a WinForms control. When headless, this can be used to output static diagram images for Blazor projects, purely in\r
  C#.\r
</p>\r
\r
<h2 id="node-js-and-headless-environments"><a class="not-prose heading-anchor" href="#node-js-and-headless-environments">Node.js and headless environments</a></h2>\r
<p>\r
  GoJS can be used in environments that do not have a DOM. This can be useful for running on a server. We provide a\r
  <a href="nodeJs">Node example</a>.\r
</p>\r
<p>We also have a Puppeteer example in the <a href="nodeJs#ServerSideImages">server-side images section</a> for running on a server with a DOM.</p>\r
\r
<h2 id="within-iframes"><a class="not-prose heading-anchor" href="#within-iframes">Within iFrames</a></h2>\r
<p>\r
  GoJS can run within iFrames. However, since the library references the global context, such as <code>window</code> on browsers, it is best to invoke GoJS code\r
  from within the frame it is used.\r
</p>\r
`,codeBlocks:[],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`gt3xze`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};