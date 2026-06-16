import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Extending GoJS`},htmlContent:`<h1>Extending GoJS</h1>\r
<p>\r
  GoJS can be extended in a variety of ways. The most common way to change the standard behavior is to set properties on the <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>,\r
  <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>, <a href="../api/symbols/Tool.html" target="api">Tool</a>, or <a href="../api/symbols/Layout.html" target="api">Layout</a>. But when the desired property does not exist, you might need to override methods of\r
  CommandHandler, Tool, Layout, Link, or Node. Methods that you can override are documented in the API reference. This page describes how to override methods,\r
  either by replacing a method on an instance (a feature of JavaScript) or by defining a subclass. You should not modify the prototypes of any of the\r
  GoJS classes. GoJS also provides an extensions gallery that is detailed further at the <a href="#extensions-gallery-section">bottom of the page</a>.\r
</p>\r
\r
<h2 id="CommandHandler"><a class="not-prose heading-anchor" href="#CommandHandler">CommandHandler</a></h2>\r
<p>\r
  Overriding the <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> allows you to alter default functionality and create your own key bindings. See the\r
  <a href="commands">learn page on commands</a> for more. However, the techniques shown below for overriding methods on Tools and Layouts also applies to\r
  the CommandHandler.\r
</p>\r
\r
<h2 id="ToolsAndLayouts"><a class="not-prose heading-anchor" href="#ToolsAndLayouts">Tools and Layouts</a></h2>\r
<p>\r
  GoJS operates on nodes and links using many tools and layouts, all of which are subclasses of the <a href="../api/symbols/Tool.html" target="api">Tool</a> and <a href="../api/symbols/Layout.html" target="api">Layout</a> classes. See the\r
  <a href="tools">learn page on Tools</a> for more about Tools, and the <a href="layouts">learn page on Layouts</a> for more about Layouts.\r
</p>\r
<p>\r
  Tools can be modified, or they can be replaced in or added to the <a href="../api/symbols/Diagram.html#toolmanager" target="api">Diagram.toolManager</a>. All tools must inherit from the <a href="../api/symbols/Tool.html" target="api">Tool</a> class or from a\r
  class that inherits from Tool.\r
</p>\r
\r
<p>\r
  Layouts can be modified, or they can be used by setting <a href="../api/symbols/Diagram.html#layout" target="api">Diagram.layout</a> or <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a>. All Layouts must inherit from the <a href="../api/symbols/Layout.html" target="api">Layout</a> class or\r
  a class that inherits from Layout.\r
</p>\r
\r
<h2 id="OverridingMethodWithoutDefiningSubclass"><a class="not-prose heading-anchor" href="#OverridingMethodWithoutDefiningSubclass">Overriding a method without defining a subclass</a></h2>\r
<p>\r
  Due to a "feature" of JavaScript, often we can avoid subclassing a Tool in its entirety and merely override a single method. This is common when we want to\r
  make a small change to the behavior of a method of a Tool. Here we show how to override the <code>ClickSelectingTool.standardMouseSelect</code> method by\r
  modifying the tool instance of a particular Diagram.\r
</p>\r
\r
<p>\r
  One can override Layout methods in this manner also, but that is rarely done -- layouts are almost always subclassed. It cannot be done for layouts that are\r
  the value of <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a> because those layouts may be copied and cannot be shared.\r
</p>\r
\r
<p>\r
  Since we are not creating a new (sub)class, we set the method directly on the Diagram's <a href="../api/symbols/ClickSelectingTool.html" target="api">ClickSelectingTool</a>, which is referenced through its\r
  <a href="../api/symbols/ToolManager.html" target="api">ToolManager</a>. Typical scaffolding for overriding a method in such a manner is as follows:\r
</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  As a concrete example, we will override <a href="../api/symbols/Tool.html#standardmouseselect" target="api">Tool.standardMouseSelect</a> to select only Nodes and Links that have a width and height of less than 100 diagram\r
  units. This means that we must find the to-be-selected object using <code>diagram.findPartAt</code>, check its bounds, and quit if the bounds are too large.\r
  Otherwise, we call the base functionality to select as it normally would.\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="OverridingMethodsBySubclassingLayout"><a class="not-prose heading-anchor" href="#OverridingMethodsBySubclassingLayout">Overriding methods by subclassing a Layout</a></h2>\r
<p>Layouts and Tools can be subclassed to create custom classes that inherit the properties and methods of the predefined class.</p>\r
\r
<p>In modern JavaScript (ECMAScript) or in TypeScript, you can use newer syntax for defining classes:</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  You can define property getters and setters:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  If the layout might be used as the value of <a href="../api/symbols/Group.html#layout" target="api">Group.layout</a>, you will need to make sure the instance that you set in the Group template can be copied\r
  correctly.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  Lastly we'll define a <a href="../api/symbols/Layout.html#dolayout" target="api">Layout.doLayout</a>, being sure to look at the documentation and accommodate all possible input, as <code>doLayout</code> has one\r
  argument that can either be a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, or a <a href="../api/symbols/Group.html" target="api">Group</a>, or an <a href="../api/symbols/Iterable.html" target="api">Iterable</a> collection.\r
</p>\r
<p>\r
  All together, we can see the cascade layout in action:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<h2 id="extensions-gallery-section"><a class="not-prose heading-anchor" href="#extensions-gallery-section">Extensions gallery</a></h2>\r
\r
<p>\r
  In addition to our samples, GoJS provides an <strong><a href="../samples#extensions">extensions gallery</a></strong>, showcasing the creation of custom tools and layouts. \r
  Those classes and samples are written in TypeScript, available at <code>../extensionsJSM/</code>, as\r
  ECMAScript/JavaScript modules -- these use the <code>../release/go-module.js</code> library. We recommend that you copy the files that you need into your\r
  project, so that you can adjust how they refer to the GoJS library that you choose and so that you can include them into your own building and packaging\r
  procedures.\r
</p>\r
\r
<div class="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-4">\r
  <div class="lg:grid lg:grid-rows-subgrid lg:row-span-2">\r
    <p>\r
      For example, the <a href="../samples/GeometryReshaping" target="_blank">Geometry Reshaping Tool</a> is a custom class extending the <a href="../api/symbols/Tool.html" target="api">Tool</a> \r
      class that allows the user to resize and reshape custom geometries via dragging tool handles:\r
    </p>\r
    <img class="w-4/5 mx-auto lg:w-full lg:max-w-full lg:h-auto" src="images/geometry-reshape.png" alt="Screenshot of the Geometry Reshaping Tool">\r
  </div>\r
  <div class="lg:grid lg:grid-rows-subgrid lg:row-span-2">\r
    <p>\r
      There are also several extension layouts such as the <a href="../samples/radial" target="_blank">Radial Layout</a>, which arranges connected nodes in concentric rings:\r
    </p>\r
    <img class="w-4/5 mx-auto lg:w-full lg:max-w-full lg:h-auto" src="images/radial-layout.png" alt="Screenshot of the Radial Layout">\r
  </div>\r
</div>\r
\r
<p class="box bg-danger">\r
  Note that the API for extension classes may change with any version, even point releases. If you intend to use an extension in production, you should copy the\r
  code to your own source directory.\r
</p>\r
`,codeBlocks:[{id:null,code:`const tool = diagram.toolManager.clickSelectingTool;\r
tool.standardMouseSelect = function() { // must not be an arrow function =>\r
  // Maybe do something else before\r
  // ...\r
\r
  // In cases where you want normal behavior, call the base functionality.\r
  // Note the reference to the prototype and the call to 'call' passing it 'this'.\r
  go.ClickSelectingTool.prototype.standardMouseSelect.call(this);\r
\r
  // Maybe do something else after\r
  // ...\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`tool`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape()\r
        .bind("geometryString", "geo")\r
        .bind("fill", "color")\r
    );\r
\r
const tool = diagram.toolManager.clickSelectingTool;\r
tool.standardMouseSelect = function() { // must not be an arrow function =>\r
  const diagram = this.diagram;\r
  const e = diagram.lastInput;\r
  // to select containing Group if Part.canSelect() is false\r
  const curobj = diagram.findPartAt(e.documentPoint, false);\r
  if (curobj !== null) {\r
    const bounds = curobj.actualBounds;\r
    console.log(bounds)\r
    // End the selection process if the bounds are greater than 100 width or height\r
    if (bounds.width > 100 || bounds.height > 100) {\r
      // If this was a left click with no modifier, we want to act the same as if\r
      // we are clicking on the Diagram background, so we clear the selection\r
      if (e.left && !e.control && !e.shift) {\r
        diagram.clearSelection();\r
      }\r
      // Then return, so that we do not call the base functionality\r
      return;\r
    }\r
  }\r
  // otherwise, call the base functionality\r
  // (would be a <code>super</code> method when in a subclass)\r
  go.ClickSelectingTool.prototype.standardMouseSelect.call(this);\r
}\r
\r
diagram.model = new go.Model([\r
  { geo: "F M0 105v10l128 4 5 5 4 2 1 10 3 4 6 2 2 3 22 13-2 11-7 7 1 3 10-5h11l12-1 36-17-1-2-8 2-2-5-6 2-5 6H195l-3 3-6-1-9 2 3-4-3-5 7-4-2-3 2-30 7-28-2-2 1-3V57l-2-3-2 2-2-1 3-10-3-7 2-7 2-3-1-7-1-6 1-7-1-8H148l-3-1-13 7-12 11-1 4-4 5-13 8 1 3 4 4-4 4 3 3-1 9-6 1-9 7-5 2-2 2-2-3-16 2-3-4-21-2-17 3-1 8 2 1v3l3 2 1 5-6 3-1 2-2 2L0 105",\r
    color: "#ae2012", loc: "0 0" },\r
  { geo: "F M0 100 6 10 29 0V11l128 4 3 2 1 3 4 2 1 3v8l5 4h4l1 4-3 2-2 5-3 2v2l-5 4 3 4-3 4-2 7 4 1v5l3 1 2 4 2 4 3 1 2 3-5 1-3 1-6 4-1 4h-3l-4 2-4-2-4 1-4 4L0 100",\r
    color: "#ee9b00", loc: "-27.95824443192035 104.93067600954686"},\r
  { geo: "F M0 0 50-1l1 5-2 6 2 5-1 4-7 7-5 1-1 3 1 6-2 3v4l-2 2v4l-2 1-3 5-1 6v8l-1 7v4l-2 2v3l1 4v2H4L2 88l2-3V57L2 55 0 57-1 55 1 48-2 39l1-6 3-4V24L0 19V12 9 0",\r
    color: "#94d2bd", loc: "183.05821581111877 0.021104230115426503" },\r
  { geo: "F M1 100 0 96V92l2-2L4 66l3-6 1-1 1-4 2-1V49l2-4-1-4 1-4 5-1 2-2 4-4 2-5-2-6 2-5V9l1-3 2-4-1-2 5-3 3 2 2-1 6 74 5 7v5l3 3-3 6H46l-3 2-3 1-1 2H37l-1 2H1",\r
    color: "#90be6d", loc: "209.58085081222583 -11.792313702430363"}\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`export class CascadeLayout extends go.Layout {\r
  // new data properties (fields) get declared and initialized here\r
\r
  constructor(init) {\r
    super();\r
    // other initializations can be done here\r
    if (init) Object.assign(this, init);\r
  }\r
\r
  // optionally, define property getters and setters here\r
\r
  // override or define methods\r
  public doLayout(coll) {\r
    // Layout logic goes here.\r
  }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`this._offset = new go.Size(30, 20);\r
\r
get offset() { return this._offset; }\r
set offset(val) {\r
  if (!(val instanceof go.Size)) {\r
    throw new Error("new value for CascadeLayout.offset must be a Size, not: " + val);\r
  }\r
  if (!this._offset.equals(val)) {\r
    this._offset = val;\r
    this.invalidateLayout();\r
  }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`cloneProtected(copy) {\r
  super.cloneProtected(copy);\r
  copy._offset = this._offset;\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`example`,code:`/**\r
* This layout arranges nodes in a cascade specified by the offset property\r
*/\r
class CascadeLayout extends go.Layout {\r
  constructor(init) {\r
    super();\r
    this._offset = new go.Size(30, 20);\r
    if (init) Object.assign(this, init);\r
  }\r
\r
  cloneProtected(copy) {\r
    super.cloneProtected(copy);\r
    copy._offset = this._offset;\r
  }\r
\r
  get offset() { return this._offset; }\r
  set offset(val) {\r
    if (!(val instanceof go.Size)) {\r
      throw new Error("new value for CascadeLayout.offset must be a Size, not: " + val);\r
    }\r
    if (!this._offset.equals(val)) {\r
      this._offset = val;\r
      this.invalidateLayout();\r
    }\r
  }\r
\r
  /**\r
  * This method positions all Nodes and ignores all Links.\r
  * @param {Diagram|Group|Iterable} coll the collection of Parts to layout.\r
  */\r
  doLayout(coll) {\r
    // get the Nodes and Links to be laid out\r
    const parts = this.collectParts(coll);\r
\r
    // Start the layout at the arrangement origin, a property inherited from Layout\r
    let x = this.arrangementOrigin.x;\r
    let y = this.arrangementOrigin.y;\r
    const offset = this.offset;\r
\r
    for (let node of parts) {\r
      if (!(node instanceof go.Node)) continue;  // ignore Links\r
      node.move(new go.Point(x, y));\r
      x += offset.width;\r
      y += offset.height;\r
    }\r
  }\r
}  // end of CascadeLayout\r
\r
// Regular diagram setup:\r
\r
diagram.layout = new CascadeLayout();\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { isShadowed: true, shadowOffset: new go.Point(0,0) })\r
    .add(\r
      new go.Shape({ stroke: "#343a40",\r
        geometryString: "F M0 20Q0 0 20 0H100V130Q90 141 100 150L10 150Q0 150 0 140L0 20M0 140Q0 130 10 130L100 130" \r
      })\r
        .bind("fill", "color"),\r
      new go.TextBlock({ margin: 5, width: 100, textAlign: "center", stroke: "#343a40",\r
        font: "11pt Trebuchet MS", alignment: new go.Spot(.5, .5, 0, -10) \r
      })\r
        .bind("text")\r
    );\r
\r
diagram.model = new go.Model([\r
  { text: "The Great Gatsby", color: "#ccd5ae" },\r
  { text: "Moby-Dick", color: "#e9edc9" },\r
  { text: "Pride and Prejudice", color: "#fefae0" },\r
  { text: "Frankenstein", color: "#faedcd" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1qd6e7y`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};