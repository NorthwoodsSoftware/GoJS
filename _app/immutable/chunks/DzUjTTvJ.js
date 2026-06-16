import{$ as e,B as t,C as n,D as r,G as i,I as a,J as o,K as s,M as c,N as l,S as u,T as d,U as f,W as p,X as m,Y as h,_ as g,c as _,et as v,i as y,it as b,j as x,l as S,n as C,o as w,q as T,rt as E,u as ee,v as D,w as O,x as k,y as A,z as j}from"./BY_RssUb.js";import{l as M,u as N}from"./DTR9fq_7.js";import"./xihTtKlq.js";import{n as te,t as P}from"./CxMCXhHm.js";import{t as F}from"./CVMOr__I.js";import{a as I,i as L,n as R,t as ne}from"./BVhwz5iQ.js";import{t as re}from"./lxyaXZko.js";import{A as z,C as B,D as V,E as H,M as U,O as W,S as G,T as K,_ as q,a as J,b as Y,c as X,d as Z,f as Q,g as ie,h as $,i as ae,j as oe,k as se,l as ce,m as le,n as ue,o as de,p as fe,r as pe,s as me,t as he,u as ge,v as _e,w as ve,x as ye,y as be}from"./BjDsAonG.js";var xe=d(`<div class="flex flex-col bg-card"></div>`);function Se(t,i){v(i,!0);let a=y(i,`activeTab`,15),o=y(i,`editorOpen`,15),s=m(()=>i.hasCss?[{id:`js`,label:`JS`},{id:`html`,label:`HTML`},{id:`css`,label:`CSS`}]:[{id:`js`,label:`JS`},{id:`html`,label:`HTML`}]);function c(e){a()===e&&o()?o(!1):(a(e),o(!0))}var d=xe();D(d,21,()=>l(s),A,(e,t)=>{{let i=m(()=>te(a()===l(t).id&&o()&&`bg-muted text-muted-foreground`));P(e,{get class(){return l(i)},variant:`ghost`,onclick:()=>c(l(t).id),children:(e,i)=>{E();var a=r();j(()=>u(a,l(t).label)),n(e,a)},$$slots:{default:!0}})}}),b(d),n(t,d),e()}var Ce=d(`<div class="editor-container flex-1 overflow-hidden svelte-1swpx59"></div>`),we=d(`<div class="flex flex-row h-full bg-card"><div class="flex flex-col bg-card"><!></div> <!></div>`);function Te(r,o){v(o,!0);let s=y(o,`htmlCode`,15),c=y(o,`jsCode`,15),l=y(o,`cssCode`,15),u=y(o,`activeTab`,15),d=y(o,`editorOpen`,15),p,m=null,h=null;function g(e){switch(e){case`js`:return c();case`html`:return s();case`css`:return l()}}function _(e,t){switch(e){case`js`:c(t);break;case`html`:s(t);break;case`css`:l(t);break}}function x(e){let t=a(()=>g(e)),n=e===`js`?`javascript`:e;return I.create({doc:t,extensions:R(n,t=>{_(e,t)})})}t(()=>{if(d()&&p){let e=u();return m=new L({state:x(e),parent:p}),h=e,()=>{m?.destroy(),m=null,h=null}}}),t(()=>{let e=u();m&&d()&&h!==null&&h!==e&&(m.setState(x(e)),h=e)});var S=we(),C=f(S);Se(f(C),{get hasCss(){return o.hasCss},get activeTab(){return u()},set activeTab(e){u(e)},get editorOpen(){return d()},set editorOpen(e){d(e)}}),b(C);var T=i(C,2),E=e=>{var t=Ce();w(t,e=>p=e,()=>p),n(e,t)};k(T,e=>{d()&&e(E)}),b(S),n(r,S),e()}var Ee=d(`<div class="flex flex-col h-full"><iframe sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox" title="Preview"></iframe></div>`);function De(r,i){v(i,!0);let a,s=o(``),u=null;t(()=>{let e=i.document;return u&&clearTimeout(u),u=setTimeout(()=>{T(s,e,!0)},300),()=>{u&&clearTimeout(u)}}),t(()=>{i.refreshKey>0&&(T(s,``),requestAnimationFrame(()=>{T(s,i.document,!0)}))});function d(){a?.contentWindow?.postMessage({type:`setTheme`,isDark:F.isDark},`*`)}t(()=>{F.isDark,d()}),C(()=>{function e(e){e.data?.type===`contentHeight`&&i.onContentHeight&&i.onContentHeight(e.data.height)}return window.addEventListener(`message`,e),()=>window.removeEventListener(`message`,e)});var p=Ee(),m=f(p);let h;w(m,e=>a=e,()=>a),b(p),j(()=>{_(m,`srcdoc`,l(s)),h=ee(m,1,`flex-1 w-full border-none`,null,h,{"pointer-events-none":i.resizing})}),x(`load`,m,d),c(m),n(r,p),e()}var Oe=d(`<header class="text-xs py-3 bg-background border-b"><h1 class="text-4xl px-4 max-w-7xl mx-auto m-0 truncate"> </h1></header>`);function ke(e,t){var r=Oe(),i=f(r),a=f(i,!0);b(i),b(r),j(()=>u(a,t.title)),n(e,r)}var Ae=d(`<div class="prose p-4 w-full max-w-7xl mx-auto"></div>`),je=d(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg> <span>Reload</span>`,1),Me=d(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span>Reset</span>`,1),Ne=d(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> <span>Download</span>`,1),Pe=d(`<div class="flex flex-col"><div class="flex flex-col"><!> <!> <div class="mx-4 p-2 rounded-lg border dark:border-transparent bg-card text-card-foreground flex flex-col gap-1"><div class="flex items-center gap-2 px-2"><span class="font-mono mr-auto"> </span> <!> <!> <!></div> <div class="flex flex-col bg-card md:flex-row max-md:gap-1"><div><!></div> <!> <div class="flex-1 flex flex-col min-h-75 md:min-h-0 md:h-full min-w-0 max-md:min-h-50"><!></div></div></div></div></div>`);function Fe(t,r){v(r,!0);let a=o(s(r.data.htmlContent)),c=o(s(r.data.jsCode)),d=o(s(r.data.cssCode)),_=o(40),y=o(!1),x=o(!1),C=o(0),w=o(0),N=o(`js`),te=m(()=>r.data.cssCode.length>0),F=m(()=>{let e=l(a),t=l(c),n=l(d),i=r.data.externalStyles.map(e=>`<link rel="stylesheet" href="${e}">`).join(`
    `),o=r.data.externalScripts.map(e=>`<script src="${e.startsWith(`../`)?M(e.replace(`..`,``)):e}"><\/script>`).join(`
    `);return`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${i}
  ${r.data.metadata.module?`<script type="importmap">
  {
    "imports": {
      "gojs": "`+M(`/release/go.mjs`)+`",
      "../release/go.mjs": "`+M(`/release/go.mjs`)+`",
      "../extensionsJSM/": "`+M(`/extensionsJSM/`)+`"
    }
  }
<\/script>`:``}
  <link rel="stylesheet" href="${M(`/theme-tokens.css`)}">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    /* Color tokens come from the linked theme-tokens.css
       color-scheme stays inline so it never leaks into the main app. */
    :root { color-scheme: light; }
    :root.dark { color-scheme: dark; }
    html, body { margin: 0; padding: 0; font-family: system-ui, sans-serif; overflow-x: clip; }
    button { padding: 4px; }
    #theme { padding: 4px; }
    #myDiagramDiv, #myPaletteDiv { background: whitesmoke; }
    #__measure { display: flow-root; }
    a { color: hsl(var(--primary)); }
    ${n}
  </style>
  ${r.data.metadata.tailwind?`<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>`:``}
  ${r.data.metadata.module?``:`<script src="${M(`/release/go.js`)}"><\/script>`}
  ${o}
</head>
<body>
  <div id="__measure">
    ${e}
  </div>
  <script ${r.data.metadata.module?`type="module"`:``}>
    ${t}
  <\/script>
  <script>
    // Receive the site theme from the parent without reloading and mirror it onto
    // <html> so the color-scheme / token variables above respond.
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'setTheme') {
        document.documentElement.classList.toggle('dark', !!e.data.isDark);
      }
    });
    var __el = document.getElementById('__measure');
    new ResizeObserver(function() {
      // Measure the content wrapper (not documentElement) so the value is
      // independent of the iframe's own height -- otherwise the buffer below
      // would feed back and grow the iframe on every observation.
      var h = Math.ceil(__el.getBoundingClientRect().height);
      window.parent.postMessage({ type: 'contentHeight', height: h }, '*');
    }).observe(__el);
  <\/script>
</body>
</html>`});function I(){T(a,r.data.htmlContent,!0),T(c,r.data.jsCode,!0),T(d,r.data.cssCode,!0)}function L(){h(C)}function R(){let e=l(d).trim()?`<style>
${l(d)}
  </style>`:``,t=r.data.descriptionHtml?`<div id="description">
${r.data.descriptionHtml.replace(/<!-- DESC_CODE_BLOCK_(\d+) -->/g,(e,t)=>{let n=r.data.descriptionCodeBlocks[Number(t)];if(!n)return``;let i=n.code.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`);return`<pre class="lang-${n.language}"><code>${i}</code></pre>`})}
  </div>`:``,n=r.data.externalStyles.map(e=>`<link rel="stylesheet" href="${e}">`).join(`
  `),i=`https://cdn.jsdelivr.net/npm/create-gojs-kit@latest/dist`,o=r.data.externalScripts.map(e=>{if(/^https?:\/\//.test(e))return`<script src="${e}"><\/script>`;let t=e.match(/\/extensionsJSM\/(.+)$/);if(t)return`<script type="module" src="${i}/extensionsJSM/${t[1]}"><\/script>`;let n=e.match(/\/extensions\/(.+)$/);return n?`<script src="${i}/extensions/${n[1]}"><\/script>`:`<script src="${e}"><\/script>`}).join(`
  `),s=r.data.metadata.module?`<script type="importmap">
  {
    "imports": {
      "gojs": "https://cdn.jsdelivr.net/npm/gojs@latest/release/go.mjs",
      "../release/go.mjs": "https://cdn.jsdelivr.net/npm/gojs@latest/release/go.mjs",
      "../extensionsJSM/": "https://cdn.jsdelivr.net/npm/gojs@latest/extensionsJSM/"
    }
  }
<\/script>`:``,u=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${r.data.metadata.title}</title>
  ${r.data.metadata.module?``:`<script src="https://cdn.jsdelivr.net/npm/gojs@latest"><\/script>`}
  ${s}
  ${o}
  ${n}
  ${e}
</head>
<body>
${l(a)}
  ${t}
  <script ${r.data.metadata.module?`type="module"`:``}>
${l(c)}
  <\/script>
</body>
</html>`,f=new Blob([u],{type:`text/html`}),p=URL.createObjectURL(f),m=document.createElement(`a`);m.href=p,m.download=`${r.data.metadata.title.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``)}.html`,document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(p)}var z=Pe(),B=f(z),V=f(B);ke(V,{get title(){return r.data.metadata.title}});var H=i(V,2),U=e=>{var t=Ae();D(t,21,()=>r.data.descriptionHtml.split(/<!-- DESC_CODE_BLOCK_(\d+) -->/),A,(e,t,i)=>{var a=O(),o=p(a),s=e=>{var r=O();g(p(r),()=>l(t)),n(e,r)},c=e=>{let i=m(()=>r.data.descriptionCodeBlocks[Number(l(t))]);var a=O(),o=p(a),s=e=>{ne(e,{get code(){return l(i).code},get language(){return l(i).language}})};k(o,e=>{l(i)&&e(s)}),n(e,a)};k(o,e=>{i%2==0?e(s):e(c,-1)}),n(e,a)}),b(t),n(e,t)};k(H,e=>{r.data.descriptionHtml&&e(U)});var W=i(H,2),G=f(W),K=f(G),q=f(K);b(K);var J=i(K,2);P(J,{variant:`ghost`,size:`sm`,onclick:L,title:`Reload sample`,children:(e,t)=>{var r=je();E(2),n(e,r)},$$slots:{default:!0}});var Y=i(J,2);P(Y,{variant:`ghost`,size:`sm`,onclick:I,title:`Reset to original code`,children:(e,t)=>{var r=Me();E(2),n(e,r)},$$slots:{default:!0}}),P(i(Y,2),{variant:`ghost`,size:`sm`,onclick:R,title:`Download as HTML file`,children:(e,t)=>{var r=Ne();E(2),n(e,r)},$$slots:{default:!0}}),b(G);var X=i(G,2),Z=f(X);Te(f(Z),{get hasCss(){return l(te)},get htmlCode(){return l(a)},set htmlCode(e){T(a,e,!0)},get jsCode(){return l(c)},set jsCode(e){T(c,e,!0)},get cssCode(){return l(d)},set cssCode(e){T(d,e,!0)},get activeTab(){return l(N)},set activeTab(e){T(N,e,!0)},get editorOpen(){return l(x)},set editorOpen(e){T(x,e,!0)}}),b(Z);var Q=i(Z,2),ie=e=>{re(e,{get splitPosition(){return l(_)},set splitPosition(e){T(_,e,!0)},get resizing(){return l(y)},set resizing(e){T(y,e,!0)}})};k(Q,e=>{l(x)&&e(ie)});var $=i(Q,2);De(f($),{get document(){return l(F)},get resizing(){return l(y)},get refreshKey(){return l(C)},onContentHeight:e=>T(w,e,!0)}),b($),b(X),b(W),b(B),b(z),j(()=>{u(q,`Sample: ${r.data.metadata.title??``}`),S(X,`height: ${l(w)>0?`${l(w)}px`:`70vh`}`),ee(Z,1,`flex flex-col min-h-0 min-w-0 md:h-full max-md:w-full! max-md:h-auto max-md:flex-none
            ${l(x)?`max-md:h-1/2! md:min-w-50`:``}`),S(Z,`width: ${l(x)?l(_)+`%`:`auto`}; flex: none;`)}),n(t,z),e()}function Ie(t,r){v(r,!0);let i=Object.assign({"../../content/tags/animation.html":U,"../../content/tags/buttons.html":oe,"../../content/tags/circularlayout.html":z,"../../content/tags/collections.html":se,"../../content/tags/commands.html":W,"../../content/tags/contextmenus.html":V,"../../content/tags/customlayout.html":H,"../../content/tags/export.html":K,"../../content/tags/extensions.html":ve,"../../content/tags/force-directed.html":B,"../../content/tags/frameworks.html":G,"../../content/tags/geometries.html":ye,"../../content/tags/grid.html":Y,"../../content/tags/gridlayout.html":be,"../../content/tags/groups.html":_e,"../../content/tags/html.html":q,"../../content/tags/inspector.html":ie,"../../content/tags/itemarrays.html":$,"../../content/tags/layered-digraph.html":le,"../../content/tags/legend.html":fe,"../../content/tags/links.html":Q,"../../content/tags/overview.html":Z,"../../content/tags/palette.html":ge,"../../content/tags/ports.html":ce,"../../content/tags/routers.html":X,"../../content/tags/scada.html":me,"../../content/tags/svg.html":de,"../../content/tags/tables.html":J,"../../content/tags/theme.html":ae,"../../content/tags/tools.html":pe,"../../content/tags/tooltips.html":ue,"../../content/tags/treelayout.html":he});function a(e){let t=i[`../../content/tags/${e}.html`];return typeof t==`string`?t:``}let o=m(()=>a(r.tag));var s=O(),c=p(s),u=e=>{var t=O();g(p(t),()=>l(o)),n(e,t)};k(c,e=>{l(o)&&e(u)}),n(t,s),e()}var Le=d(`<!> <p><a>Related samples</a></p>`,1),Re=d(`<div id="allTagDescriptions" class="prose p-4 max-w-7xl mx-auto"><h3 class="text-xl">GoJS Features in this sample</h3> <!></div>`);function ze(t,r){v(r,!0);let a=[`all`,`featured`,`performance`,`process`,`monitoring`,`gauges`,`charts`];var o=O(),s=p(o),c=e=>{var t=Re();D(i(f(t),2),17,()=>r.tags,A,(e,t)=>{var r=O(),o=p(r),s=e=>{var r=Le(),a=p(r);Ie(a,{get tag(){return l(t)}});var o=i(a,2),s=f(o);b(o),j(e=>_(s,`href`,`${e??``}#${l(t)??``}`),[()=>N(`/samples`)]),n(e,r)},c=m(()=>!a.includes(l(t)));k(o,e=>{l(c)&&e(s)}),n(e,r)}),b(t),n(e,t)};k(s,e=>{r.tags.length>0&&e(c)}),n(t,o),e()}export{Fe as n,ze as t};