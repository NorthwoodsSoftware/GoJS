import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Deployment`,category:`Dev Environment`},htmlContent:`<h1>Deployment and license keys</h1>\r
<p>\r
  The GoJS library is software that is licensed under a commercial <a href="../license.html">license agreement</a>.\r
  It is not open-source. If you have downloaded a copy of the GoJS library from\r
  <a href="https://gojs.net">gojs.net</a> or npm or GitHub for use in your own app, you may have noticed that\r
  a watermark appears in the diagram.\r
</p>\r
<p>\r
  After you have\r
  <a href="https://nwoods.com/sales/index.html?p=GoJS" target="_blank">purchased a license</a> and are ready to deploy\r
  to your web site your app that uses GoJS, you will need to request a license key at:\r
  <a href="https://nwoods.com/activate.html?sku=gojs" target="_blank">https://nwoods.com/activate.html?sku=gojs</a>.\r
</p>\r
<p>\r
  Enter your e-mail address and the e-mail address of the person who purchased a license for\r
  GoJS, the order number for that purchase, and your web site's domain name or your Electron app's name\r
  (see below, <a href="#ForElectron">For Electron</a>).\r
  Please make sure that e-mail from "nwoods.com" is not caught in your corporate or personal spam filter. If you\r
  <a href="https://nwoods.com/contact.html">contact us</a> for further help either via our web site or by sending us\r
  email, please include the e-mail that our web server sent to you.\r
</p>\r
<p>\r
  Regarding domain names, if your app will be at:\r
  <code>https://www.example.com/app/ProcessEditor.html</code>, enter <code>example.com</code> as the domain name. This\r
  procedure works for internal corporate\r
  web sites as well as for public web sites, with hostnames and with IP addresses. The protocol (such as\r
  <code>https://</code>) and port number (such as\r
  <code>:8080</code>) do not matter, so do not include them.\r
</p>\r
<p>\r
  The license key will also work when the HTML page is served from a subdomain of the licensed domain, such as from\r
  <code>editors.example.com</code>. Any valid license key will automatically also work at the <code>localhost</code>\r
  domain, which is useful when debugging and testing.\r
</p>\r
<p>\r
  The GoJS library never "phones home" -- it will never initiate any network traffic other than when explicitly directed\r
  to do so, such as for downloading image files to show in <a href="../api/symbols/Picture.html" target="api">Picture</a> objects.\r
</p>\r
\r
<p>\r
  Our server will generate a GoJS license key for you, in the form of a JavaScript statement that you will need to\r
  include with your code. It must execute after the GoJS library file has been loaded, but before you create your first\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  This mechanism works when using either the release library, <code>go.js</code>, or the debug library,\r
  <code>go-debug.js</code>, or the ES module versions of\r
  the library, but only with GoJS version 1.8 or later. Note that this assignment is of a static property of the Diagram\r
  class: <a href="../api/symbols/Diagram.html#licensekey" target="api">Diagram.licenseKey</a>. Of\r
  course you will need to substitute your generated license key string for <code>"...YourKeyHere..."</code> in the\r
  <code>go.Diagram.licenseKey</code> assignment\r
  statement. License keys are long strings without any embedded whitespace or punctuation. You can request license keys\r
  for as many domains as you have licensed, plus for a separate test domain.\r
</p>\r
<p>\r
  Once your key is in place, you can continue to use the same key while updating the patch/baselevel version of GoJS.\r
  For example, a license key for version 2.0.1 will work for all versions 2.0.*.\r
  Remember to get a new license key when upgrading to a new major or minor version of GoJS.\r
  For example, when upgrading from version 2.0.1 to version 2.1.0, you will need a new license key.\r
</p>\r
<p>\r
  License keys only depend on the major/minor version number and the domain from which the HTML page was served.\r
  License keys are valid forever, as long as the major and minor version number of the library do not change and\r
  as long as the HTML page is served from the same domain.\r
</p>\r
\r
<h2 id="ForElectron"><a class="not-prose heading-anchor" href="#ForElectron">For Electron</a></h2>\r
<p>\r
  When building a desktop application using Electron, your HTML page is not being served from a web server at a domain.\r
  You will need to activate with the <code>"name"</code> you have specified in your project's <code>package.json</code>,\r
  or <code>"productName"</code> attribute if it is specified,\r
  to make sure your Diagram does not display a watermark.\r
</p>\r
\r
<h2 id="ForUnlimitedDomainsCustomers"><a class="not-prose heading-anchor" href="#ForUnlimitedDomainsCustomers">For unlimited domains customers</a></h2>\r
<p>\r
  If you are an ISV and intend to distribute your app to run on many customers' web sites, or if your app is hosted in a\r
  WebView as part of a desktop application,\r
  <a href="https://nwoods.com/contact.html">contact sales</a> for our our Unlimited Domains option and instructions.\r
  When requesting a license key at\r
  <a href="https://nwoods.com/activate.html?sku=gojs" target="_blank">Activate</a>, you do not need to specify a domain\r
  name.\r
</p>\r
\r
<h2 id="InternationalizationAndLocalization"><a class="not-prose heading-anchor" href="#InternationalizationAndLocalization">Internationalization and localization</a></h2>\r
<p>\r
  GoJS apps can display text in non-Latin languages. For example, see <a href="../samples/familyTreeJP"\r
    target="samples">Japanese Family Tree</a>.\r
</p>\r
<p>\r
  The GoJS library does not manipulate currency values or date/time values or addresses,\r
  so there are no localization issues with those data types and values.\r
  The library does not contain any of its own icons (images) or cursors.\r
</p>\r
<p>\r
  Nor does GoJS display any built-in text strings, so no translation is needed.\r
  There are error and warning messages that may be output to the console,\r
  but those messages are only meant for debugging by programmers, not for consumption by end users.\r
  Reading and writing of numeric values is only performed internally when reading and writing JSON or\r
  geometry path strings or CSS colors, which are all defined to use non-localized formats.\r
</p>\r
<p>\r
  All user-visible text is completely under the control of the programmer.\r
  For localizability you may find it convenient to use conversion functions in <a href="../api/symbols/Binding.html" target="api">Binding</a>s.\r
  The <a href="../api/symbols/TextEditingTool.html" target="api">TextEditingTool</a> uses an HTML TextArea element to implement in-place text input and text\r
  editing, thereby utilising the browser's support for input method editors.\r
</p>\r
<p>\r
  However, the <a href="../api/symbols/CommandHandler.html#describe" target="api">CommandHandler.describe</a> method, which is called for screen reader consumption,\r
  uses English words and will need to be replaced and generalized for localization.\r
</p>\r
\r
<h2 id="ThirdPartySoftwareNotices"><a class="not-prose heading-anchor" href="#ThirdPartySoftwareNotices">No use of third-party software</a></h2>\r
<p>\r
  The GoJS library has no dependencies, and uses no third-party libraries or other resources.\r
  The library does of course use the browser's DOM and JavaScript engine in which the library is running,\r
  but those are provided by the browser or server environment and are not library dependencies.\r
</p>\r
<p>\r
    The GoJS library is solely written by, and owned by, Northwoods Software Corporation, so there are no third party software notices.\r
</p>\r
`,codeBlocks:[{id:null,code:`// Must execute after loading the library and before you create your first Diagram:\r
go.Diagram.licenseKey = "...YourKeyHere...";`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1uxhog9`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};