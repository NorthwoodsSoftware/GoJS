import{$ as e,C as t,H as n,L as r,N as i,T as a,U as o,W as s,X as c,c as l,et as u,it as d,m as f,st as p,w as m,x as h,z as g}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as _}from"../chunks/CmgMociJ.js";var v=p({load:()=>y,prerender:()=>!0}),y=()=>({metadata:{title:`Using Models`,category:`Core Concepts`,categoryOrder:1},htmlContent:`<h1>Using Models and Templates</h1>
<p>
  In <b>GoJS</b>, appearance is separated from data. You declare appearance in templates and data in a model. Data bindings on the templates connect the two.
</p>

<h2 id="UsingModelAndTemplates">Using a Model and Templates</h2>
<p>
  A model holds the data for each node and link.
  A template is a <a href="/api/symbols/Part.html" target="api">Part</a> that can be copied — you have different templates for <a href="/api/symbols/Node.html" target="api">Node</a>s and <a href="/api/symbols/Link.html" target="api">Link</a>s.
  A <a href="/api/symbols/Diagram.html" target="api">Diagram</a> already has simple default templates for both.
</p>
<p>
  A <a href="/api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> holds <a href="/api/symbols/GraphLinksModel.html#nodedataarray" target="api">GraphLinksModel.nodeDataArray</a> and <a href="/api/symbols/GraphLinksModel.html#linkdataarray" target="api">GraphLinksModel.linkDataArray</a>.
  Setting <a href="/api/symbols/Diagram.html#model" target="api">Diagram.model</a> creates <a href="/api/symbols/Node.html" target="api">Node</a>s and <a href="/api/symbols/Link.html" target="api">Link</a>s for all the data.
  Each node data must have a unique key value so that references can be resolved.
</p>
<p>
  Node and link data can be any JavaScript object. <b>GoJS</b> expects certain properties:
  "key" on node data, "from" and "to" on link data, and optionally "category".
  You can customize these names via <a href="/api/symbols/Model.html#nodekeyproperty" target="api">Model.nodeKeyProperty</a>, etc.
</p>
<p>
  Here is a minimal example:
</p>
<!-- CODE_BLOCK_0 -->
<p>
  The nodes use the default template. To customize appearance, set <a href="/api/symbols/Diagram.html#nodetemplate" target="api">Diagram.nodeTemplate</a>:
</p>
<!-- CODE_BLOCK_1 -->
<p>
  Now the nodes look better, but they're all identical. We need data binding to parameterize them.
</p>

<h2 id="ParameterizingNodesUsingDataBindings">Data Bindings</h2>
<p>
  A <a href="/api/symbols/Binding.html" target="api">Binding</a> sets a property on a <a href="/api/symbols/GraphObject.html" target="api">GraphObject</a> from a property on the node data.
  Call <a href="/api/symbols/GraphObject.html#bind" target="api">GraphObject.bind</a> to add bindings to a template:
</p>
<!-- CODE_BLOCK_2 -->
<p>
  Now each node gets its text and color from the data. The <code>fill: "white"</code> acts as a default
  in case the data doesn't have a "color" property.
</p>

<h3 id="TemplateDefinitions">Template Definitions</h3>
<p>
  The implementations of all predefined templates are provided in
  <a href="/extensions/Templates.js">Templates.js</a> in the Extensions directory.
  You may wish to copy and adapt these when creating your own templates.
</p>

<h2 id="KindsOfModels">Kinds of Models</h2>

<h3 id="GraphLinksModel">GraphLinksModel</h3>
<p>
  <a href="/api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> is the most general model. It uses separate link data objects for each <a href="/api/symbols/Link.html" target="api">Link</a>,
  allowing reflexive links, duplicate links, and cycles (though you can restrict these via <a href="/api/symbols/Diagram.html#validcycle" target="api">Diagram.validCycle</a>).
  It also supports <a href="ports">ports</a> (multiple connection points per node)
  and <a href="groups">group membership</a>.
</p>

<h3 id="TreeModel">TreeModel</h3>
<p>
  <a href="/api/symbols/TreeModel.html" target="api">TreeModel</a> is simpler — it only supports tree-structured graphs.
  There is no separate link data array. Instead, child nodes reference their parent by key
  via a "parent" property:
</p>
<!-- CODE_BLOCK_3 -->
<p>
  A tree-structured graph doesn't require TreeModel — you can use GraphLinksModel with
  separate link data if that fits your data better.
</p>

<h2 id="ModifyingModels">Modifying Models</h2>
<p>
  To add or remove nodes, call <a href="/api/symbols/Model.html#addnodedata" target="api">Model.addNodeData</a> and <a href="/api/symbols/Model.html#removenodedata" target="api">Model.removeNodeData</a>.
  Use <a href="/api/symbols/Model.html#findnodedataforkey" target="api">Model.findNodeDataForKey</a> to look up node data by key.
</p>
<p>
  <b>Important:</b> Do not directly mutate the <a href="/api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a> — GoJS won't be notified.
  Similarly, do not directly set properties on node data objects — bindings won't update.
</p>
<!-- CODE_BLOCK_4 -->
<p>
  Use <a href="/api/symbols/Model.html#setdataproperty" target="api">Model.setDataProperty</a> instead:
</p>
<!-- CODE_BLOCK_5 -->
<p>
  These model methods are only required once data is part of the Model.
  When initially building your arrays before setting <a href="/api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a>, you can set properties directly.
</p>

<h2 id="SavingAndLoadingModels">Saving and Loading Models</h2>
<p>
  Call <a href="/api/symbols/Model.html#tojson" target="api">Model.toJson</a> to serialize a model to a JSON string, and <a href="/api/symbols/Model.html#fromjson" target="api">Model.fromJson</a> to deserialize one.
  Data properties are saved as long as they are enumerable, don't start with an underscore,
  and have JSON-compatible values (numbers, strings, Arrays, or plain Objects).
</p>
<p>
  To associate metadata with the model itself (not any particular node), use the <a href="/api/symbols/Model.html#modeldata" target="api">Model.modelData</a> object,
  which is also included in JSON serialization.
</p>
`,codeBlocks:[{id:`simpleModelNoTemplates`,code:`const nodeDataArray = [
    { key: "Alpha"},
    { key: "Beta" }
  ];
  const linkDataArray = [
    { from: "Alpha", to: "Beta" }
  ];
  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`simpleModelNoBind`,code:`diagram.nodeTemplate =
    new go.Node("Auto")
      .add(
        new go.Shape("RoundedRectangle", { fill: "white" }),
        new go.TextBlock("hello!", { margin: 5 })
      );

  const nodeDataArray = [
    { key: "Alpha" },
    { key: "Beta" }
  ];
  const linkDataArray = [
    { from: "Alpha", to: "Beta" }
  ];
  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`simpleModelWithBind`,code:`diagram.nodeTemplate =
    new go.Node("Auto")
      .add(
        new go.Shape("RoundedRectangle", { fill: "white" })  // default Shape.fill value
          .bind("fill", "color"),  // binding to get fill from nodedata.color
        new go.TextBlock({ margin: 5 })
          .bind("text")  // binding to get TextBlock.text from nodedata.text
      );

  const nodeDataArray = [
    { key: 1, text: "Alpha", color: "lightblue" },
    { key: 2, text: "Beta", color: "pink" }
  ];
  const linkDataArray = [
    { from: 1, to: 2 }
  ];
  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`simpleTree`,code:`diagram.nodeTemplate =
    new go.Node("Auto")
      .add(
        new go.Shape("Ellipse")
          .bind("fill", "color"),
        new go.TextBlock({ margin: 5 })
          .bind("text")
      );

  const nodeDataArray = [
    { key: 1, text: "Alpha", color: "lightblue" },
    { key: 2, text: "Beta", parent: 1, color: "yellow" },
    { key: 3, text: "Gamma", parent: 1, color: "orange" },
    { key: 4, text: "Delta", parent: 1, color: "lightgreen" }
  ];
  diagram.model = new go.TreeModel(nodeDataArray);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const data = myDiagram.model.findNodeDataForKey("Delta");
    // WRONG: direct mutation won't update the diagram
    if (data !== null) data.color = "red";`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const data = myDiagram.model.findNodeDataForKey("Delta");
    // CORRECT: notifies bindings and the UndoManager
    if (data !== null) myDiagram.model.setDataProperty(data, "color", "red");`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),b=a(`<meta name="description"/>`),x=a(`<article class="prose mx-auto px-4 py-8"><!></article>`);function S(a,p){u(p,!0);var v=x();f(`1b7vrxk`,e=>{var i=m(),a=s(i),o=e=>{var n=b();g(()=>l(n,`content`,p.data.metadata.description)),t(e,n)};h(a,e=>{p.data.metadata.description&&e(o)}),r(()=>{n.title=`${p.data.metadata.title??``} | Learn GoJS`}),t(e,i)});var y=o(v);{let e=c(()=>p.data.extraScripts??[]);_(y,{get htmlContent(){return p.data.htmlContent},get codeBlocks(){return p.data.codeBlocks},get extraScripts(){return i(e)},get pageScript(){return p.data.pageScript}})}d(v),t(a,v),e()}export{S as component,v as universal};