import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`LightBox Style HTML Context Menu`,indexDescription:`Shows a LightBox style HTML Context Menu.`,screenshot:`htmllightboxcontextmenu`,priority:2,tags:[`contextmenus`,`html`],description:`Demonstrate context menus implemented in HTML covering the whole window.`},htmlContent:`<div style="display: inline-block">\r
    <div style="position: relative">\r
      <div id="myDiagramDiv" style="border: solid 1px black; width: 400px; height: 400px"></div>\r
    </div>\r
    \r
  </div>`,jsCode:`function init() {\r
\r
    // Initialize the Diagram\r
    myDiagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });\r
\r
    // define a simple Node template (but use the default Link template)\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          contextMenu: window.myHTMLLightBox // window.myHTMLLightBox is defined in extensions/LightBoxContextMenu.js\r
        })\r
        .add(\r
          new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8 }) // some room around the text\r
            // TextBlock.text is bound to Node.data.text\r
            .bind('text')\r
        );\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
\r
    myDiagram.contextMenu = window.myHTMLLightBox; // window.myHTMLLightBox is defined in extensions/LightBoxContextMenu.js\r
  } // end init\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* CSS for the lightbox context menu */\r
\r
  #cmLight {\r
    top: 0px;\r
    z-index: 10002;\r
    position: fixed;\r
    text-align: center;\r
    left: 25%;\r
    width: 50%;\r
    background-color: #f5f5f5;\r
    padding: 16px;\r
    border: 16px solid #444;\r
    border-radius: 10px;\r
    margin-top: 10px;\r
  }\r
\r
  #cmDark {\r
    z-index: 10001;\r
    position: fixed;\r
    top: 0;\r
    left: 0;\r
    width: 100%;\r
    height: 100%;\r
    background-color: black;\r
    opacity: 0.8;\r
  }\r
\r
  #cmLight ul {\r
    list-style: none;\r
  }\r
\r
  #cmLight li {\r
    font: 700 1.5em Helvetica, Arial, sans-serif;\r
    position: relative;\r
    min-width: 60px;\r
  }\r
\r
  #cmLight a {\r
    color: #444;\r
    display: inline-block;\r
    padding: 4px;\r
    text-decoration: none;\r
    margin: 2px;\r
    border: 1px solid gray;\r
    border-radius: 10px;\r
  }`,externalStyles:[],externalScripts:[`../extensions/LightBoxContextMenu.js`],descriptionHtml:`<p>\r
        This demonstrates the implementation of a custom HTML context menu using <a>HTMLInfo</a>. This sample is also a re-implementation of the built-in\r
        <a>ContextMenuTool.defaultTouchContextMenu</a>.\r
      </p>\r
\r
      <p>\r
        The implementation is contained in the files <a href="../extensions/LightBoxContextMenu.js">LightBoxContextMenu.js</a> and\r
        the CSS is at the top of this HTML page. The JavaScript file exposes <code>window.myHTMLLightBox</code>, which is\r
        used in this file as the value of <code>myDiagram.contextMenu</code>.\r
      </p>\r
\r
      <p>For a more regular HTML context menu implementation, see the <a href="customContextMenu">Custom Context Menu</a> sample.</p>\r
      <p>\r
        Right-click or tap-hold (mobile) on a Node to bring up a context menu. If you have a selection copied in the clipboard, you can bring up a context menu\r
        anywhere to paste.\r
      </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`contextmenus`,`html`];var g=y();l(`1u3d3kn`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};