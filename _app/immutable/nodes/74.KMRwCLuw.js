import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Typings`,category:`Dev Environment`},htmlContent:`<h1>GoJS typings for TypeScript and JavaScript</h1>\r
\r
<p>\r
  This page assumes you will be using NPM to get the TypeScript typings for use in either JavaScript or TypeScript.\r
  This page also assumes you have a npm project already -- if you do not, you may need to run <code>npm init</code>.\r
</p>\r
\r
<p>\r
  In a TypeScript environment, GoJS typings will appear automatically if you have the <code>gojs</code> npm package installed.\r
  These typings will offer auto-completion, inline documentation, and value error checking.\r
  For example when defining a shape, it will auto-complete <code>strokeWidth</code> and display documentation:\r
</p>\r
\r
<img class="w-full my-1 md:p-8 max-w-5xl" src="images/types01.png"></img>\r
\r
<p>\r
  And since <code>strokeWidth</code> does not exist on <a href="../api/symbols/Node.html" target="api">Node</a>, it will point out an error:\r
</p>\r
\r
<img class="w-full my-1 md:p-8 max-w-5xl" src="images/types02.png"></img>\r
\r
<h2 id="typings-in-javascript-files"><a class="not-prose heading-anchor" href="#typings-in-javascript-files">Typings in JavaScript files</a></h2>\r
\r
<p>\r
  If you have a compatible editor, such as VS Code, you can use TypeScript typings in plain JavaScript,\r
  provided you have TypeScript installed.\r
  The easiest way to use typings is to install the GoJS npm package,\r
  even if you are referencing the <code>go.js</code> library from somewhere else, such as from your own server.\r
  And of course you must also install TypeScript in your project, or globally.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  And you must create a TypeScript configuration file:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
In your <code>tsconfig.json</code> file, you will have to enable the <code>allowJs</code> and <code>checkJs</code> options:\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  Typescript will then note that "go" is not defined.\r
  The best course of action depends on whether the JavaScript file is a module.\r
</p>\r
\r
<h3 id="plain-javascript-files"><a class="not-prose heading-anchor" href="#plain-javascript-files">Plain JavaScript files</a></h3>\r
<p>\r
  To make sure the symbol is accessible, you must add this triple-slash directive to the top of your <code>.js</code> files:\r
  This allows type checking in JS files without defining "go".\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
<p>\r
  TypeScript will identify this as a valid export of the "go" global object.\r
</p>\r
\r
<h3 id="javascript-modules"><a class="not-prose heading-anchor" href="#javascript-modules">JavaScript modules</a></h3>\r
<p>\r
  If you are using JavaScript modules, a triple-slash directive is not necessary --\r
  you can access the <code>go</code> object through import and TypeScript typings will work:\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<h2 class="mt-6" id="typings-without-npm"><a class="not-prose heading-anchor" href="#typings-without-npm">Typings without npm</a></h2>\r
\r
<p>\r
  Every release of GoJS contains the <a href="../release/go.d.ts" target="_blank">go.d.ts</a> file, in the <code>release/</code> folder.\r
  You can view and copy these files and others from <a href="https://github.com/NorthwoodsSoftware/gojs" target="_blank">GitHub</a>.\r
</p>\r
`,codeBlocks:[{id:null,code:`npm i typescript\r
npm i gojs`,isExecutable:!1,language:`shell`,initiallyVisible:!0},{id:null,code:`npx tsc --init`,isExecutable:!1,language:`shell`,initiallyVisible:!0},{id:null,code:`{\r
  "compilerOptions": {\r
    "allowJs": true, /* Allow javascript files to be compiled. */\r
    "checkJs": true, /* Report errors in .js files. */\r
\r
    // ... rest of tsconfig.json options\r
  }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`/// <reference path="./node_modules/gojs/release/go.d.ts" />`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`import go from 'gojs';`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1gftnom`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};