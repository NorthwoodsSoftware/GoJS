import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Svelte`,category:`Frameworks`},htmlContent:`<h1>Diagrams in Svelte with GoJS</h1>\r
\r
<p>If you are new to GoJS, it may be helpful to first visit the <a href="./" target="_blank">Quick Start Tutorial</a>.</p>\r
\r
<p>Svelte requires almost no special considerations for use with GoJS. In your project, install GoJS via npm or yarn:</p>\r
<p>\r
<code>npm i gojs</code>\r
</p>\r
<p>\r
  And you can use it in a Svelte app. GoJS Diagrams require a DIV, so you should initialize them within <code>onMount</code> to ensure the DOM is ready. An\r
  example:\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>Svelte discourages referencing DOM <code>Id</code>s, so you can also reference the DIV directly with Svelte's <code>bind:this</code> attribute:</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<h3 id="sharing-diagram-data-with-other-components-in-svelte-5"><a class="not-prose heading-anchor" href="#sharing-diagram-data-with-other-components-in-svelte-5">Sharing Diagram data with other components in Svelte 5</a></h3>\r
\r
<p>\r
  With Svelte 5, you can share reactive data from the diagram with other components by writing into a rune with <code>$state</code>.\r
  For example, you can use a <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> listener such as <code>ChangedSelection</code> that\r
  copies data out of the diagram into a rune. Any component that reads that rune updates automatically.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>The child component receives the data through <code>$props</code> and renders it like any other reactive value:</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<h3 id="examples"><a class="not-prose heading-anchor" href="#examples">Examples</a></h3>\r
\r
<p>We maintain several SvelteKit sample apps that use GoJS to demonstrate Diagramming in Svelte, and they can be found <a href="../samples/#svelte">here</a>.</p>\r
\r
<p>\r
  For example, the <a href="https://gojs.net/latest/projects/gojs-floorplanner/" target="_blank">Svelte Floorplanner</a> \r
  is a single-page Svelte app with a GoJS diagram and palette and their own respective Svelte components. It uses runes to pass data \r
  about selected items and the whole floor from the diagram to the floor info section below (as described above) and \r
  save and load a JSON model of the diagram from local storage. Svelte reactivity also controls menu options such as visibility toggles \r
  and unit switching. The source code can be found <a href="https://github.com/NorthwoodsSoftware/GoJS-projects/tree/master/gojs-floorplanner" target="_blank">here</a>.\r
</p>\r
\r
<img src="images/floorplan_image.png" alt="Screenshot of the floorplanning app in use">\r
\r
<p></p>\r
<p>\r
  The <a href="https://gojs.net/latest/projects/gojs-jsondiagram/" target="_blank">JSON Diagram Editor</a> uses GoJS to create a node-based \r
  visualization of JSON data in a side-by-side editor. It uses Svelte to pass data between the GoJS diagram component and a  \r
  <a href="https://microsoft.github.io/monaco-editor/" target="_blank">Monaco Editor</a> component. Edits made to one side will live-update on the other.\r
  Its source code can be found <a href="https://github.com/NorthwoodsSoftware/GoJS-projects/tree/master/gojs-jsondiagram" target="_blank">here</a>.\r
</p>\r
\r
<img src="images/jsondiagram_image.png" alt="Screenshot of the JSON Diagram editor app in use">\r
\r
<p></p>\r
<p>\r
  The <a href="https://gojs.net/latest/projects/gojs-3d/" target="_blank">GoJS with 3D</a> sample uses three GoJS Diagrams that all observe a single \r
  model alongside a 3D representation of the model using <a href="https://threejs.org/" target="_blank">ThreeJS</a>. One Svelte component creates the model \r
  and then passes it to two children components, which all bind the model to pass its state up to update the 3D viewer.\r
  Its source code can be found <a href="https://github.com/NorthwoodsSoftware/GoJS-projects/tree/master/gojs-3d" target="_blank">here</a>.\r
</p>\r
\r
<img src="images/gojs3d_image.png" alt="Screenshot of the GoJS with 3D sample in use">`,codeBlocks:[{id:null,code:`<!-- +page.svelte -->\r
<script lang="ts">\r
  import go from 'gojs';\r
  import { onMount } from 'svelte';\r
  let myDiagram;\r
\r
  onMount(() => {\r
    myDiagram = new go.Diagram('myDiagramID');\r
    // Set up the rest of the diagram:\r
    myDiagram.model = new go.Model([ { key: 'Alpha' } ])\r
  });\r
<\/script>\r
\r
<div id="myDiagramID" style="width: 500px; height: 500px;" ></div>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`<!-- +page.svelte -->\r
<script lang="ts">\r
  import go from 'gojs';\r
  import { onMount } from 'svelte';\r
  let myDiagram;\r
  let diagramDiv: HTMLDivElement;\r
\r
  onMount(() => {\r
    myDiagram = new go.Diagram(diagramDiv);\r
    // Set up the rest of the diagram:\r
    myDiagram.model = new go.Model([ { key: 'Alpha' } ])\r
  });\r
<\/script>\r
\r
<div bind:this={diagramDiv}  style="width: 500px; height: 500px;" ></div>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`<!-- +page.svelte -->\r
<script lang="ts">\r
  import go from 'gojs';\r
  import { onMount } from 'svelte';\r
  import NodeInspector from './NodeInspector.svelte'; // other Svelte component\r
\r
  let diagramDiv: HTMLDivElement;\r
  let selectedNodeData = $state<go.ObjectData | null>(null); // rune holding data we want to share with other components\r
\r
  onMount(() => {\r
    const myDiagram = new go.Diagram(diagramDiv);\r
    myDiagram.nodeTemplate = new go.Node('Auto')\r
      .add(new go.Shape('RoundedRectangle').bind('fill', 'color'))\r
      .add(new go.TextBlock({ margin: 8 }).bind('text', 'key'));\r
    myDiagram.model = new go.GraphLinksModel([\r
      { key: 'Alpha', color: 'lightblue' },\r
      { key: 'Beta', color: 'orange' }\r
    ]);\r
\r
    // When the selection changes, copy the selected node's data into the rune\r
    myDiagram.addDiagramListener('ChangedSelection', (e) => {\r
      const node = e.diagram.selection.first();\r
      selectedNodeData = node instanceof go.Node ? node.data : null;\r
    });\r
  });\r
<\/script>\r
\r
<div bind:this={diagramDiv} style="width: 500px; height: 500px;"></div>\r
\r
<!-- selectedNodeData is reactive, so NodeInspector re-renders on every selection change -->\r
<NodeInspector data={selectedNodeData} />`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`<!-- NodeInspector.svelte -->\r
<script lang="ts">\r
  import type go from 'gojs';\r
  let { data }: { data: go.ObjectData | null } = $props();\r
<\/script>\r
\r
{#if data}\r
  <p>Selected node: <strong>{data.key}</strong></p>\r
{:else}\r
  <p>No node selected.</p>\r
{/if}`,isExecutable:!1,language:`html`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1rc8749`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};