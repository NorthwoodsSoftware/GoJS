import{$ as e,B as t,C as n,D as r,G as i,I as a,J as o,K as s,N as c,S as l,T as u,U as d,W as f,X as p,Y as m,_ as h,b as g,c as _,d as v,et as y,i as b,it as x,l as S,n as C,o as w,q as T,rt as E,u as D,v as O,w as k,x as A,y as j,z as M}from"./BY_RssUb.js";import{l as N}from"./DTR9fq_7.js";import"./xihTtKlq.js";import{n as P,t as F}from"./CxMCXhHm.js";import{a as I,i as L,n as R,r as z,t as B}from"./BVhwz5iQ.js";var V=u(`<div class="overflow-hidden flex flex-col gap-1 svelte-yayuls"><div><div class="svelte-yayuls"></div></div> <!></div>`);function H(u,f){y(f,!0);let m=b(f,`code`,15),h=b(f,`editable`,3,!1),g,_=o(null),C=o(!1);t(()=>{m()&&T(C,!0)});let O=o(s(f.initialExpanded??!1)),k=o(!1),j=p(()=>f.minHeight||450);t(()=>{if(g&&c(C)){let e=a(()=>m()),t=a(()=>f.highlight),n=h()?R(f.language,e=>{m(e)},t):z(f.language,t);return T(_,new L({state:I.create({doc:e,extensions:n}),parent:g}),!0),()=>{c(_)?.destroy(),T(_,null)}}}),t(()=>{if(g){let e=new ResizeObserver(()=>{T(k,g.scrollHeight>c(j))});return e.observe(g),()=>e.disconnect()}});let N=o(!1);t(()=>{if(c(N)||!c(_)||!f.highlight?.length||!c(k)||c(O))return;let e=c(_),t=g.parentElement,n=Math.min(...f.highlight);if(t&&n>=1&&n<=e.state.doc.lines){let r=e.lineBlockAt(e.state.doc.line(n).from);t.scrollTop=r.top+r.height/2-t.clientHeight/2,T(N,!0)}});function P(e){c(_)&&c(_).dispatch({changes:{from:0,to:c(_).state.doc.length,insert:e}})}var B={updateContent:P},H=V(),U=d(H);w(d(U),e=>g=e,()=>g),x(U);var W=i(U,2),G=e=>{F(e,{variant:`outline`,size:`sm`,onclick:()=>T(O,!c(O)),children:(e,t)=>{E();var i=r();M(()=>l(i,c(O)?`Show Less`:`Show More`)),n(e,i)},$$slots:{default:!0}})};return A(W,e=>{c(k)&&e(G)}),x(H),M(()=>{D(U,1,v(!c(O)&&c(k)?`overflow-auto`:`overflow-hidden`),`svelte-yayuls`),S(U,!c(O)&&c(k)?`max-height: ${c(j)}px`:void 0)}),n(u,H),e(B)}var U=u(`<iframe sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" title="Diagram Preview" class="w-full h-full min-h-75 lg:min-h-100"></iframe>`);function W(r,i){y(i,!0);let a=b(i,`animation`,3,!1),s=b(i,`noScaffolding`,3,!1),l=b(i,`extraScripts`,19,()=>[]),u=o(``),d=null;t(()=>{let e=p();return d&&clearTimeout(d),d=setTimeout(()=>{T(u,e,!0)},300),()=>{d&&clearTimeout(d)}});function f(e){return e.replace(/\\/g,`\\\\`).replace(/`/g,"\\`").replace(/\$/g,`\\$`)}function p(){let e=f(i.code),t=l().map(e=>`  <script src="${e}"><\/script>`).join(`
`),n=s()?`// goCode2: user code creates its own diagram
        const userCode = \`${e}\`;
        const fn = new Function('go', userCode);
        fn(go);`:`const div = document.createElement('div');
        div.className = 'diagramStyling';

        ${i.parentElementId?`const parentEl = document.getElementById('${i.parentElementId}');
        if (parentEl) {
          parentEl.appendChild(div);
        } else {
          document.body.appendChild(div);
        }`:`document.body.appendChild(div);`}

        // Create diagram and provide goCode scaffolding variables
        const diagram = new go.Diagram(div);
        diagram.animationManager.isInitial = ${a()};
        const $ = go.GraphObject.make;

        // Execute user code with diagram and $ in scope
        const userCode = \`${e}\`;
        const fn = new Function('diagram', '$', userCode);
        fn(diagram, $);`;return`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="${N(`/release/go.js`)}"><\/script>
${t}
  <style>
    body, html {
      color-scheme: dark;
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      height: 100%;
      overflow: hidden;
    }
    .diagramStyling {
      background: whitesmoke;
      width: 100%;
      height: 100%;
      margin: -1px;
      max-height: 700px;
    }
    body.has-html {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    body.has-html .diagramStyling {
      flex: 1;
      height: auto;
    }
    .extra-html {
      padding: 8px;
      flex-shrink: 0;
    }
    button, input[type="button"] {
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 6px 12px; border-radius: 6px; font: 12px sans-serif; margin: 4px;
    }
  </style>
</head>
<body${i.html?` class="has-html"`:``}>
  ${s()?`<div id="myDiagramDiv" class="diagramStyling"></div>`:i.parentElementId?`<div id="${i.parentElementId}"></div>`:``}
  <script>
    requestAnimationFrame(function() {
      try {
        ${n}
      } catch (error) {
        console.error('Error executing diagram code:', error);
        document.body.innerHTML = '<div style="color: red; padding: 10px;">Error: ' + error.message + '</div>';
      }
    });
  <\/script>
  ${i.html?`<div class="extra-html">${i.html}</div>`:``}
</body>
</html>`}var m=U();M(()=>{_(m,`srcdoc`,c(u)),S(m,typeof i.minHeight==`number`?`min-height: ${i.minHeight}px`:``)}),n(r,m),e()}var G=u(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span>Reset</span>`,1),K=u(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> <span>Download</span>`,1),q=u(`<div class="flex items-center gap-2 bg-editor-bg"><!> <!></div>`);function J(e,t){var r=q(),a=d(r);F(a,{variant:`ghost`,size:`sm`,get onclick(){return t.onReset},title:`Reset to original code`,children:(e,t)=>{var r=G();E(2),n(e,r)},$$slots:{default:!0}}),F(i(a,2),{variant:`ghost`,size:`sm`,get onclick(){return t.onDownload},title:`Download as HTML file`,children:(e,t)=>{var r=K();E(2),n(e,r)},$$slots:{default:!0}}),x(r),n(e,r)}function Y(e){let t=e.match(/\/extensions\/(.+)$/);return t?`https://cdn.jsdelivr.net/npm/create-gojs-kit@latest/dist/extensions/${t[1]}`:e}function X({code:e,noScaffolding:t=!1,parentElementId:n,animation:r=!1,html:i,extraScripts:a=[]}){let o=a.map(e=>`  <script src="${Y(e)}"><\/script>`).join(`
`),s=t?`      // User code creates its own diagram
      ${e}`:`      const div = document.createElement('div');
      div.className = 'diagramStyling';

      ${n?`const parentEl = document.getElementById('${n}');
      if (parentEl) {
        parentEl.appendChild(div);
      } else {
        document.body.appendChild(div);
      }`:`document.body.appendChild(div);`}

      // Create diagram and provide GoJS scaffolding
      const diagram = new go.Diagram(div);
      ${r?`diagram.animationManager.isInitial = true;`:``};

      // User code
      ${e}`,c=`${t?`<div id="myDiagramDiv" class="diagramStyling"></div>`:n?`<div id="${n}"></div>`:``}
<script>
  function init() {
${s}
  }

  // Wait until the DOM is ready before creating the diagram
  document.addEventListener('DOMContentLoaded', init);
<\/script>`;return`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GoJS Diagram</title>
  <script src="https://cdn.jsdelivr.net/npm/gojs@latest"><\/script>${o?`\n${o}`:``}
  <style>
    body, html {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      height: 100%;
    }
    .diagramStyling {
      background: white;
      width: 100%;
      height: 100%;
    }${i?`
    body.has-html {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    body.has-html .diagramStyling {
      flex: 1;
      height: auto;
    }
    .extra-html {
      padding: 8px;
      flex-shrink: 0;
    }`:``}
  </style>
</head>
<body${i?` class="has-html"`:``}>
  ${c}
  ${i?`<div class="extra-html">${i}</div>`:``}
</body>
</html>`}var Z=u(`<div><!> <!></div>`),Q=u(`<div><!> <div><!></div></div>`);function $(r,a){y(a,!0);let s=b(a,`animation`,3,!1),l=b(a,`split`,3,60),u=b(a,`wide`,3,!1),f=b(a,`noScaffolding`,3,!1),p=b(a,`stacked`,3,!1),h=b(a,`hideCode`,3,!1);b(a,`initiallyVisible`,3,!0);let _=b(a,`extraScripts`,19,()=>[]),C=o(``),w=o(``),E=o(0);t(()=>{c(C)||(T(C,a.code,!0),T(w,a.code,!0))});function O(){T(w,c(C),!0),m(E)}function k(){let e=X({code:c(w),noScaffolding:f(),parentElementId:a.parentElementId,animation:s(),html:a.html,extraScripts:_()}),t=new Blob([e],{type:`text/html`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`diagram.html`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}var j=Q();let N;var F=d(j),I=e=>{var t=Z(),r=d(t);J(r,{onReset:O,onDownload:k}),g(i(r,2),()=>c(E),e=>{H(e,{language:`javascript`,editable:!0,get highlight(){return a.highlight},get minHeight(){return a.minHeight},get initialExpanded(){return a.expanded},get code(){return c(w)},set code(e){T(w,e,!0)}})}),x(t),M(e=>{D(t,1,e,`svelte-1x7kvj4`),S(t,p()?void 0:`flex: ${l()}`)},[()=>v(P(!p()&&`flex-[${l()}] lg:min-w-0 lg:flex lg:flex-col lg:gap-1`))]),n(e,t)};A(F,e=>{h()||e(I)});var L=i(F,2);W(d(L),{get code(){return c(w)},get parentElementId(){return a.parentElementId},get animation(){return s()},get noScaffolding(){return f()},get html(){return a.html},get minHeight(){return a.minHeight},get extraScripts(){return _()}}),x(L),x(j),M((e,t)=>{N=D(j,1,e,`svelte-1x7kvj4`,N,{wide:u()}),D(L,1,t,`svelte-1x7kvj4`),S(L,p()||h()?void 0:`flex: ${100-l()}`)},[()=>v(P(`code-example dark scheme-dark my-4 p-2 rounded-lg bg-editor-bg flex flex-col gap-1`,!(p()||h())&&`lg:flex-row lg:items-stretch`)),()=>v(P(`flex justify-center items-start`,!(p()||h())&&`lg:min-w-0`))]),n(r,j),e()}var ee=u(`<div class="max-w-5xl ms-0 2xl:mx-auto"></div>`),te=u(`<div class="max-w-7xl mx-auto"></div>`);function ne(t,r){y(r,!0);let i=b(r,`extraScripts`,19,()=>[]),a=b(r,`pageScript`,3,null),o=p(()=>r.htmlContent.split(/<!-- CODE_BLOCK_(\d+) -->/));C(()=>{let e=decodeURIComponent(location.hash.slice(1));e&&(document.fonts?.ready??Promise.resolve()).then(()=>{requestAnimationFrame(()=>requestAnimationFrame(()=>{document.getElementById(e)?.scrollIntoView()}))})}),C(()=>{if(!a())return;let e=N(`/release/go.js`),t=document.createElement(`script`);t.src=e,t.onload=()=>{let e=document.createElement(`script`);e.textContent=a(),document.body.appendChild(e)},document.head.appendChild(t)});var s=te();O(s,21,()=>c(o),j,(e,t,a)=>{var o=k(),s=f(o),l=e=>{var r=ee();h(r,()=>c(t),!0),x(r),n(e,r)},u=e=>{let a=p(()=>parseInt(c(t))),o=p(()=>r.codeBlocks[c(a)]);var s=k(),l=f(s),u=e=>{var t=k(),r=f(t),a=e=>{{let t=p(()=>c(o).initiallyVisible??!0);$(e,{get code(){return c(o).code},get parentElementId(){return c(o).parentElementId},get animation(){return c(o).animation},get split(){return c(o).split},get expanded(){return c(o).expanded},get wide(){return c(o).wide},get noScaffolding(){return c(o).noScaffolding},get stacked(){return c(o).stacked},get html(){return c(o).html},get hideCode(){return c(o).hideCode},get minHeight(){return c(o).minHeight},get highlight(){return c(o).highlight},get initiallyVisible(){return c(t)},get extraScripts(){return i()}})}},s=e=>{B(e,{get code(){return c(o).code},get language(){return c(o).language}})};A(r,e=>{c(o).isExecutable?e(a):e(s,-1)}),n(e,t)};A(l,e=>{c(o)&&e(u)}),n(e,s)};A(s,e=>{a%2==0?e(l):e(u,-1)}),n(e,o)}),x(s),n(t,s),e()}export{ne as t};