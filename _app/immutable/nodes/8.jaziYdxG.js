import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Angular`,category:`Frameworks`},htmlContent:`<h1>Using GoJS with Angular</h1>\r
    <p class="box bg-info">\r
      Examples of most of the topics discussed on this page can be found in the <a\r
        href="https://github.com/NorthwoodsSoftware/gojs-angular-basic" target="_blank">gojs-angular-basic</a>\r
      project,\r
      which serves as a simple starter project.\r
    </p>\r
\r
    <p>\r
      If you are new to GoJS, it may be helpful to first visit the <a href="." target="_blank">\r
        Getting\r
        Started Tutorial\r
      </a>.\r
    </p>\r
\r
    <p>\r
      The easiest way to get a component set up for a GoJS Diagram is to use the <a\r
        href="https://github.com/NorthwoodsSoftware/gojs-angular" target="_blank">gojs-angular</a>\r
      package,\r
      which exports Angular components for GoJS Diagrams, Palettes, and Overviews.\r
      More information about the package, including the various props it takes, can be found on the\r
      <a href="https://npmjs.com/gojs-angular" target="_blank">NPM</a> page. Examples here will be using a\r
      <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a>,\r
      but any model can be used.\r
    </p>\r
\r
    <h2 id="GeneralInformation"><a class="not-prose heading-anchor" href="#GeneralInformation">General information</a></h2>\r
    <h3 id="Installation"><a class="not-prose heading-anchor" href="#Installation">Installation</a></h3>\r
    <p>\r
      To use the published components, make sure you install GoJS and gojs-angular:\r
      <code>npm install gojs gojs-angular</code>.\r
    </p>\r
\r
    <h3 id="AboutComponentStyling"><a class="not-prose heading-anchor" href="#AboutComponentStyling">About component styling</a></h3>\r
    <p>\r
      Whether you are using a Diagram, Palette, or Overview <code>gojs-angular</code> component, you will\r
      probably\r
      want to style them.\r
      First, you'll need to style a CSS class for the div of your GoJS Diagram / Palette / Overview such as:\r
    </p>\r
<!-- CODE_BLOCK_0 -->\r
\r
    <p>\r
      To style the GoJS Diagram / Palette / Overview div, which will reside in the <code>gojs-angular</code>\r
      component(s) you are using, make sure you set the <code>@Component</code> decorator's <code>encapsulation</code>\r
      property to either\r
      <code>ViewEncapsulation.None</code> or <code>ViewEncapsulation.ShadowDom</code>. Without this, your\r
      styling will not affect the component divs.\r
      Read more about Angular view encapsulation <a href="https://angular.dev/api/core/ViewEncapsulation">here</a>.\r
    </p>\r
    <p>\r
      Your <code>@Component</code> decorator for the component holding the your GoJS / Angular component(s)\r
      should\r
      look something\r
      like:\r
    </p>\r
    <!-- CODE_BLOCK_1 -->\r
    <p>\r
      <strong>Note:</strong> You may alternatively use the default <code>ViewEncapsulation.Emulated</code>\r
      value, if you assign additional CSS modifiers :host and ::ng-deep to your class selector. Be warned,\r
      however, ng-deep is technically deprecated, so this is not best practice.\r
    </p>\r
\r
    <h2 id="DataSyncService"><a class="not-prose heading-anchor" href="#DataSyncService">The DataSyncService</a></h2>\r
\r
    <p>\r
      The <code>gojs-angular</code> package comes with an Angular <a\r
        href="https://angular.dev/guide/di">service</a>\r
      called DataSyncService, used to\r
      easily merge changes (an <a href="../api/symbols/IncrementalData.html" target="api">IncrementalData</a>\r
      instance) with an Array of Node or Link Data, or a <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a> object.\r
    </p>\r
    <p>\r
      This service has three static functions:\r
    </p>\r
    <ul>\r
      <li><code>syncNodeData(changes, array)</code> - Merges any node data changes in an IncrementalData\r
        object\r
        with a given array of node data, then returns the new array.\r
      </li>\r
      <li><code>syncLinkData(changes, array)</code> - Merges any link data changes in an IncrementalData\r
        object\r
        with a given array of link data, then returns the new array. <strong>Note</strong>: Ensure you set\r
        the <a href="../api/symbols/GraphLinksModel.html#linkkeyproperty" target="api">GraphLinksModel.linkKeyProperty</a>\r
        if you are using GraphLinksModel, so data merging is possible.\r
      </li>\r
      <li><code>syncModelData(changes, object)</code> - Merges any modelData changes in an IncrementalData\r
        object\r
        with a given modelData object, then returns the new object.\r
      </li>\r
    </ul>\r
\r
    <p>\r
      These functions should allow you to keep your data synced up as needed, without needing to write lots\r
      of\r
      code.\r
    </p>\r
\r
    <h3 id="ListeningForModelChanges"><a class="not-prose heading-anchor" href="#ListeningForModelChanges">Listening for Model changes</a></h3>\r
    <p>\r
      It is common to listen for data changes in a Diagram or Palette, then do\r
      something with\r
      those changes on an application-level (such as syncing those changes with app-level data). That's why,\r
      for both the DiagramComponent\r
      and\r
      PaletteComponent, there is a <code>modelChange</code> <code>@Input</code> property function. This is a\r
      prime example of where the DataSyncService can be used.\r
    </p>\r
\r
    <p>\r
      As of <code>gojs-angular</code> 2.0, Array / object <code>@Input</code>\r
      properties are assumed to be immutable. As such, when updating these properties, new Arrays / objects\r
      must be generated -- one cannot simply mutate an element of the Array or object.\r
      Please see the <a href="https://github.com/NorthwoodsSoftware/gojs-angular-basic">gojs-angular-basic</a>\r
      project for examples of both maintaining state immutability and usage of the DataSyncService.\r
    </p>\r
\r
    <p>\r
      <strong>Note:</strong> The <a href="../api/symbols/UndoManager.html" target="api">UndoManager</a>\r
      should always be\r
      enabled to allow for transactions to take place, but its\r
      <a href="../api/symbols/UndoManager.html#maxhistorylength" target="api">UndoManager.maxHistoryLength</a>\r
      can be set to 0 to prevent undo and redo.\r
    </p>\r
\r
    <br>\r
    <h2 id="UsingDiagramComponent"><a class="not-prose heading-anchor" href="#UsingDiagramComponent">The Diagram and Palette components</a></h2>\r
    <p>\r
      The Diagram and Palette components accept a similar set of <code>@Input</code> properties.\r
    </p>\r
    <p>\r
      Diagram component accepts:\r
    </p>\r
    <ul>\r
      <li><code>initDiagram</code> - A function that must return a GoJS Diagram. You may define your\r
        Diagram's\r
        Node\r
        and Link templates here.\r
      </li>\r
      <li><code>divClassName</code> - A class name for your Diagram div.</li>\r
      <li><code>nodeDataArray</code> - An array containing data objects for your nodes.</li>\r
      <li><code>linkDataArray</code> - An array containing data objects for your links. Optional.</li>\r
      <li><code>modelData</code> - A data object,\r
        containing your diagram's <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a>.\r
        Optional.\r
      </li>\r
      <li><code>skipsDiagramUpdate</code> - A boolean flag, specifying whether the component should skip\r
        updating,\r
        often set when updating state from a GoJS model change.\r
      </li>\r
      <li><code>modelChange</code> - A function, which accepts an <a href="../api/symbols/IncrementalData.html" target="api">IncrementalData</a>\r
        object.\r
        This function will fire when your Diagram's model changes, allowing you to decide what to do\r
        with those\r
        changes. A common practice is to sync your app-level data to reflect the changes in the diagram\r
        model,\r
        which\r
        is made simple using the DataSyncService <code>gojs-angular</code> ships with.\r
      </li>\r
    </ul>\r
\r
    <p>\r
      The Palette component accepts:\r
    </p>\r
    <ul>\r
      <li><code>initPalette</code> - A function that must return a GoJS Palette. You may define your\r
        Palette's Node\r
        and Link templates here.\r
      </li>\r
      <li><code>divClassName</code> - A class name for the div your Palette div.</li>\r
      <li><code>nodeDataArray</code> - An array containing data objects for your nodes.</li>\r
      <li><code>linkDataArray</code> - An array containing data objects for your links. Optional.</li>\r
      <li><code>modelData</code> - A data object,\r
        containing your palette's <a href="../api/symbols/Model.html#modeldata" target="api">Model.modelData</a>.\r
        Optional.\r
      </li>\r
    </ul>\r
    <p>\r
      Because GoJS Palettes are read-only by default, there is no <code>modelChange</code> property in PaletteComponent.\r
      Since there won't be user-driven changes to a Palette's model,\r
      changes to node/link/model data should be achieved by immutably altering the analogous above @Input properties.\r
    </p>\r
\r
    <h2 id="sample-diagram-palette-component-usage"><a class="not-prose heading-anchor" href="#sample-diagram-palette-component-usage">Sample Diagram / Palette component usage</a></h2>\r
    <p>\r
      Here is an example of how one might set up their Diagram / Palette component properties\r
    </p>\r
    <!-- CODE_BLOCK_2 -->\r
\r
    <p>\r
      Once you've defined your <code>@Input</code> properties for your components, pass these properties\r
      to your DiagramComponent and PaletteComponent in your template, like so:\r
    </p>\r
\r
    <!-- CODE_BLOCK_3 -->\r
\r
    <p>\r
      You will now have a GoJS Diagram and Palette working in your Angular application. Again, for a full\r
      example of a <code>gojs-angular</code> application, see <a\r
        href="https://github.com/NorthwoodsSoftware/gojs-angular-basic">gojs-angular-basic</a>.\r
    </p>\r
\r
    <h4>A note on Diagram reinitialization</h4>\r
    <p>\r
      Occasionally you may want to treat a model update as if you were loading a completely new model.\r
      But initialization is only done in your <code>initDiagram</code> function,\r
      within the <code>DiagramComponent</code>'s <code>ngAfterViewInit</code> lifecycle hook, and only once.\r
      A regular model update is not treated as an initialization, so none of the <code>initial...</code> properties\r
      of your Diagram will apply.\r
    </p>\r
    <p>\r
      To address this problem, <code>DiagramComponent</code> exposes a <code>clear</code> method.\r
      When called, it clears its diagram of all nodes, links, and model data, and\r
      prepares the next state update to be treated as a diagram initialization.\r
      That will result in an initial layout and perform initial diagram content alignment and scaling.\r
      Note that <code>initDiagram</code> is not called again.\r
    </p>\r
    <p>\r
      Here is a small sample of how one might trigger diagram reinitialization using the <code>clear</code> method with\r
      <code>gojs-angular</code> 2.0.\r
    </p>\r
    <!-- CODE_BLOCK_4 -->\r
\r
    <br>\r
    <h2 id="UsingOverviewComponent"><a class="not-prose heading-anchor" href="#UsingOverviewComponent">Using the Overview component</a></h2>\r
    <p>\r
      The Overview component accepts the following Angular <code>@Input()</code> properties.\r
    </p>\r
    <ul>\r
      <li><code>initOverview</code> - A function that must return a GoJS Overview.</li>\r
      <li><code>divClassName</code> - A class name for your Overview div.</li>\r
      <li><code>observedDiagram</code> - The GoJS Diagram this Overview observes.</li>\r
    </ul>\r
\r
    <p>\r
      Define these properties in the component that will hold your Overview component, like:\r
    </p>\r
\r
    <!-- CODE_BLOCK_5 -->\r
\r
    <p>\r
      Then pass these properties to your Overview Component in your template, like:\r
    </p>\r
\r
    <!-- CODE_BLOCK_6 -->\r
\r
    <p>\r
      But, we're not done yet. <code>observedDiagram</code> is null, so the Overview won't observe\r
      anything.\r
      To assign your Overview a Diagram to observe, you will have to reassign the <code>observedDiagram</code>\r
      property after initialization. To do so,\r
      reassign the bound <code>observedDiagram</code> property in your component holding your Overview\r
      Component in the <code>ngAfterViewInit</code> lifecycle hook.\r
    </p>\r
    <p>\r
      <strong>Note</strong>: To avoid a <code>ExpressionChangedAfterItHasBeenCheckedError</code>, you\r
      must\r
      inform\r
      Angular\r
      to then detect changes.\r
      This can be done with the <a\r
        href="https://angular.dev/api/core/ChangeDetectorRef#detectChanges">ChangeDetectorRef.detectChanges()</a>\r
      method. You can inject a ChangeDetectorRef instance\r
      into your wrapper Component constructor, and use that after you alter <code>observedDiagram</code>\r
      to\r
      call\r
      detectChanges(). Like so:\r
    </p>\r
\r
    <!-- CODE_BLOCK_7 -->\r
\r
    <p>\r
      Now, after initialization, your Overview should display appropriately.\r
    </p>\r
\r
    <br>\r
    <h2 id="UpdatingPropertiesBasedOnAppState"><a class="not-prose heading-anchor" href="#UpdatingPropertiesBasedOnAppState">Updating properties based on app state</a></h2>\r
    <p>\r
      You may have some app-level properties you want to affect the behavior / appearance of your\r
      Diagram,\r
      Palette,\r
      or Overview. You could subclass their respective components and add <code>@Input</code> bindings\r
      with\r
      specific\r
      setter methods, or, more simply, you can have an <code>ngOnChanges</code> function in your\r
      app-level\r
      component\r
      that updates various Diagram / Palette / Component properties based on your app state.\r
    </p>\r
\r
    <p>\r
      For example, say you have an app-level property called <code>showGrid</code>. When <code>showGrid</code>\r
      is\r
      true, your Diagram's grid should be visible -- when false, it should be invisible. In your\r
      AppComponent, you\r
      could do something like:\r
    </p>\r
\r
<!-- CODE_BLOCK_8 -->\r
`,codeBlocks:[{id:null,code:`/* app.component.css */\r
.myDiagramDiv {\r
  background: whitesmoke;\r
  width: 800px;\r
  height: 300px;\r
  border: 1px solid black;\r
}`,isExecutable:!1,language:`css`,initiallyVisible:!0},{id:null,code:`@Component({\r
  selector: 'app-root',\r
  templateUrl: './app.component.html',\r
  styleUrls: ['./app.component.css'],\r
  encapsulation: ViewEncapsulation.None\r
})`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`// Big object that holds app-level state data\r
// As of gojs-angular 2.0, immutability is required of state for change detection\r
public state = {\r
  // Diagram state props\r
  diagramNodeData: [\r
    { id: 'Alpha', text: "Alpha", color: 'lightblue' },\r
    { id: 'Beta', text: "Beta", color: 'orange' }\r
  ],\r
  diagramLinkData: [\r
    { key: -1, from: 'Alpha', to: 'Beta' }\r
  ],\r
  diagramModelData: { prop: 'value' },\r
  skipsDiagramUpdate: false,\r
\r
  // Palette state props\r
  paletteNodeData: [\r
    { key: 'PaletteNode1', color: 'firebrick' },\r
    { key: 'PaletteNode2', color: 'blueviolet' }\r
  ]\r
}; // end state object\r
\r
public diagramDivClassName: string = 'myDiagramDiv';\r
public paletteDivClassName = 'myPaletteDiv';\r
\r
// initialize diagram / templates\r
public initDiagram(): go.Diagram {\r
  const dia = new go.Diagram({\r
    'undoManager.isEnabled': true,\r
    model: new go.GraphLinksModel(\r
      {\r
        nodeKeyProperty: 'id',\r
        linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel\r
      }\r
    )\r
  });\r
\r
  // define the Node template\r
  dia.nodeTemplate =\r
    new go.Node('Auto')\r
      .add(\r
        new go.Shape('RoundedRectangle', { stroke: null })\r
          .bind('fill', 'color'),\r
        new go.TextBlock({ margin: 8, editable: true })\r
          .bindTwoWay('text', 'text')\r
      );\r
\r
  return dia;\r
}\r
\r
/**\r
  * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.\r
  * This method should iterate over those changes and update state to keep in sync with the GoJS model.\r
  * This can be done with any preferred state management method, as long as immutability is preserved.\r
  */\r
public diagramModelChange = function(changes: go.IncrementalData) {\r
  console.log(changes);\r
  // see gojs-angular-basic for an example model changed handler that preserves immutability\r
  // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update\r
};\r
\r
public initPalette(): go.Palette {\r
  const palette = new go.Palette();\r
\r
  // define the Node template\r
  palette.nodeTemplate =\r
    new go.Node('Auto')\r
      .add(\r
        new go.Shape('RoundedRectangle', { stroke: null })\r
          .bind('fill', 'color'),\r
        new go.TextBlock({ margin: 8 })\r
          .bind('text', 'key')\r
      );\r
\r
  palette.model = new go.GraphLinksModel(\r
    {\r
      linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel\r
    });\r
\r
  return palette;\r
}`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`<gojs-diagram\r
  [initDiagram]='initDiagram'\r
  [nodeDataArray]='state.diagramNodeData'\r
  [linkDataArray]='state.diagramLinkData'\r
  [modelData]='state.diagramModelData'\r
  [skipsDiagramUpdate]='state.skipsDiagramUpdate'\r
  (modelChange)='diagramModelChange($event)'\r
  [divClassName]='diagramDivClassName'>\r
</gojs-diagram>\r
\r
<gojs-palette\r
  [initPalette]='initPalette'\r
  [nodeDataArray]='state.paletteNodeData'\r
  [divClassName]='paletteDivClassName'>\r
</gojs-palette>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`public reinitModel() {\r
    this.myDiagramComponent.clear();\r
    this.state = produce(this.state, draft => {\r
        draft.skipsDiagramUpdate = false;\r
        draft.diagramNodeData = [{ id: "Alpha", text: "Zorro", color: "red" }];\r
        draft.diagramLinkData = [];\r
    });\r
}`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`public oDivClassName = 'myOverviewDiv';\r
public initOverview(): go.Overview {\r
  return new go.Overview();\r
}\r
public observedDiagram = null;`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`<gojs-overview\r
  [initOverview]='initOverview'\r
  [divClassName]='oDivClassName'\r
  [observedDiagram]='observedDiagram'>\r
</gojs-overview>`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:null,code:`constructor(private cdr: ChangeDetectorRef) { }\r
\r
public ngAfterViewInit() {\r
  if (this.observedDiagram) return;\r
  // in this snippet, this.myDiagramComponent is a reference to a GoJS/Angular Diagram Component\r
  // that has a valid GoJS Diagram\r
  this.observedDiagram = this.myDiagramComponent.diagram;\r
\r
  // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)\r
  this.cdr.detectChanges();\r
}`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`// myDiagramComponent is a reference to your DiagramComponent\r
@ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;\r
\r
public ngOnChanges () {\r
  // whenever showGrid changes, update the diagram.grid.visible in the child DiagramComponent\r
  if (this.myDiagramComponent && this.myDiagramComponent.diagram instanceof go.Diagram) {\r
    this.myDiagramComponent.diagram.grid.visible = this.showGrid;\r
  }\r
}`,isExecutable:!1,language:`ts`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`eg1abs`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};