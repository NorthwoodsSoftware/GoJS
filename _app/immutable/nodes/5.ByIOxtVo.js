import{$ as e,C as t,H as n,R as r,T as i,U as a,et as o,it as s,m as c,rt as l,st as u}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as d}from"../chunks/CmgMociJ.js";var f=u({load:()=>p,prerender:()=>!0}),p=()=>({htmlContent:`<h1>GoJS Change Log</h1>\r
<p id="ver"></p>\r
\r
<p>\r
  We maintain a\r
  <a href="https://github.com/NorthwoodsSoftware/GoJS" target="_blank" rel="noopener"\r
    >GitHub Repository</a\r
  >\r
  that you can star to follow version updates.\r
</p>\r
\r
<h2>GoJS 4.0</h2>\r
\r
<p>GoJS 4.0 brings a number of new features.</p>\r
<ul>\r
  <li>Performance improvements for large graphs, especially during dragging and object picking.</li>\r
  <li><a href="api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a> has been re-implemented to be much faster.</li>\r
  <li>Several improvements for stronger type checking and use with AI tooling.\r
    Regardless of tooling, we will continue to make it easier to create and verify code.</li>\r
  <li>\r
    The functionality of the <a href="api/symbols/Robot.html" target="api">Robot</a> extension has now been merged into the\r
    <a href="api/symbols/Diagram.html" target="api">Diagram</a> class.\r
  </li>\r
  <li>We have added a <a href="api/symbols/HeatMap.html" target="api">HeatMap</a> extension.</li>\r
</ul>\r
\r
<h2 id="APIFeatures">API Improvements for Structured Authoring</h2>\r
<ul>\r
  <li>\r
    Added typed constant objects for string-based registries, providing autocomplete and\r
    compile-time checking for values that were previously plain strings. The new constants\r
    are: <b>Figures</b>, <b>Arrowheads</b>, <b>PanelTypes</b>, <b>ToolNames</b>,\r
    <b>Builders</b>, and <b>LayerNames</b>. For example,\r
    <code>go.Figures.RoundedRectangle</code> instead of <code>"RoundedRectangle"</code>,\r
    or <code>go.Arrowheads.Standard</code> instead of <code>"Standard"</code>.\r
    Corresponding union types (<b>FigureName</b>, <b>ArrowheadName</b>,\r
    <b>PanelTypeName</b>, <b>ToolName</b>, <b>BuilderName</b>, <b>LayerName</b>) are\r
    exported for use in TypeScript. However, because the programmer can define new names\r
    for each of these kinds of things, those types only represent the built-in subset of possibilities.\r
  </li>\r
  <li>\r
    Model classes are now generic, accepting <b>NodeDataType</b> and\r
    <b>LinkDataType</b> type parameters. These can be optionally specified to get stronger\r
    type checking on model data, and in methods such as <a href="api/symbols/Model.html#nodedataarray" target="api">Model.nodeDataArray</a>,\r
    <a href="api/symbols/GraphLinksModel.html#linkdataarray" target="api">GraphLinksModel.linkDataArray</a>, <a href="api/symbols/Model.html#copynodedata" target="api">Model.copyNodeData</a>, and\r
    <a href="api/symbols/GraphLinksModel.html#copylinkdata" target="api">GraphLinksModel.copyLinkData</a>.\r
\r
    <a href="api/symbols/Model.html" target="api">Model</a>, <a href="api/symbols/TreeModel.html" target="api">TreeModel</a>, and <a href="api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> accept a\r
    <b>NodeDataType</b> parameter, while <a href="api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a> accepts both\r
    <b>NodeDataType</b> and <b>LinkDataType</b>. These default to <a href="api/symbols/ObjectData.html" target="api">ObjectData</a> and\r
    are fully backward compatible.\r
  </li>\r
</ul>\r
\r
<p>Model typing examples:</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<!--\r
<p>The complete list of new features is <a href="#4.0">detailed below</a>.</p>\r
\r
<h3 id="4.0.1">Changes for 4.0.1</h3>\r
<ul>\r
  <li></li>\r
</ul>\r
-->\r
\r
<h2 id="4.0">Other New Features and Changes for GoJS 4.0</h2>\r
<p>New features of <a href="api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a>:</p>\r
<ul>\r
  <li>\r
    <a href="api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a> now uses a Barnes-Hut approximation algorithm, that uses a\r
    quadtree to render large graphs significantly faster. We have observed 7-10x\r
    performance boosts on graphs with node counts in the low thousands.\r
  </li>\r
  <li>\r
    The <a href="api/symbols/ForceDirectedLayout.html#theta" target="api">ForceDirectedLayout.theta</a> parameter has been added. This parameter controls\r
    the accuracy versus speed of the layout. Higher values of theta will produce a faster,\r
    but potentially less accurate, layout.\r
  </li>\r
</ul>\r
<p>Incompatible changes in <a href="api/symbols/ForceDirectedLayout.html" target="api">ForceDirectedLayout</a>:</p>\r
<ul>\r
  <li>\r
    Repulsion between Nodes no longer scales as aggressively with the size of the nodes.\r
    If you are using a ForceDirectedLayout with large, or varying, node sizes, you may\r
    have to increase the value <a href="api/symbols/ForceDirectedLayout.html#defaultelectricalcharge" target="api">ForceDirectedLayout.defaultElectricalCharge</a>.\r
  </li>\r
  <li>\r
    Some parameters have changed their default values, which should produce strictly\r
    better results for most use cases:\r
  </li>\r
  <li>\r
    The default value of <a href="api/symbols/ForceDirectedLayout.html#movelimit" target="api">ForceDirectedLayout.moveLimit</a> has changed from 10 to\r
    Infinity, which allows nodes to move arbitrarily far per iteration. For large layouts\r
    performed all at once, this will produce better results. If your layout is small or\r
    incremental, you may have to set a value for this parameter to prevent nodes from\r
    moving too much during incremental changes.\r
  </li>\r
  <li>\r
    The default value of <a href="api/symbols/ForceDirectedLayout.html#infinitydistance" target="api">ForceDirectedLayout.infinityDistance</a> has changed from 1000\r
    to Infinity, which means Nodes will always interact regardless of how far apart they\r
    are. For large layouts performed all at once, this will produce better results. If\r
    your layout depends on a limited distance between interacting Nodes, you may have to\r
    add an explicit value for this parameter.\r
  </li>\r
</ul>\r
\r
<p>\r
  Added the <a href="api/symbols/HeatMap.html" target="api">HeatMap</a> extension, which assumes each Node or Link could have a\r
  temperature used in drawing a heat map in the viewport. There is also a\r
  <a href="api/symbols/HeatMap.html#renderimagedata" target="api">HeatMap.renderImageData</a> method to generate a raster image for any given area.\r
</p>\r
\r
<p>\r
  The functionality of the <a href="api/symbols/Robot.html" target="api">Robot</a> extension class for simulating mouse and keyboard\r
  events has been moved into the <a href="api/symbols/Diagram.html" target="api">Diagram</a> class, with the method names prepended\r
  with "emit..."/. This makes it easier to write regression tests and automation scripts,\r
  because you no longer need to load the Robot extension code. The <a href="api/symbols/Robot.html" target="api">Robot</a> extension\r
  has been deprecated, although for compatibility it remains in the extensionsJSM and\r
  extensions directories. The <a href="../latest/samples/Robot.html">Robot sample</a> has\r
  been rewritten to call the new Diagram methods. The new methods are:\r
</p>\r
<ul>\r
  <li><a href="api/symbols/Diagram.html#emitmousedown" target="api">Diagram.emitMouseDown</a></li>\r
  <li><a href="api/symbols/Diagram.html#emitmousemove" target="api">Diagram.emitMouseMove</a></li>\r
  <li><a href="api/symbols/Diagram.html#emitmouseup" target="api">Diagram.emitMouseUp</a></li>\r
  <li><a href="api/symbols/Diagram.html#emitmousewheel" target="api">Diagram.emitMouseWheel</a></li>\r
  <li><a href="api/symbols/Diagram.html#emitkeydown" target="api">Diagram.emitKeyDown</a></li>\r
  <li><a href="api/symbols/Diagram.html#emitkeyup" target="api">Diagram.emitKeyUp</a></li>\r
</ul>\r
\r
<p>\r
  The <b>maxSize</b> option used by <a href="api/symbols/Diagram.html#makeimagedata" target="api">Diagram.makeImageData</a> and\r
  <a href="api/symbols/Diagram.html#makeimage" target="api">Diagram.makeImage</a> has been moved from the <a href="api/symbols/DiagramRendererOptions.html" target="api">DiagramRendererOptions</a> interface\r
  to the <a href="api/symbols/ImageRendererOptions.html" target="api">ImageRendererOptions</a> interface. And due to increased memory available in\r
  all devices, the default value has increased from 2000x2000 to 4000x4000.\r
</p>\r
\r
\r
\r
<h3 id="OtherNewFeatures">Other New Features and Changes</h3>\r
<ul>\r
  <li>\r
    Enhanced the <a href="api/symbols/PanningTool.html" target="api">PanningTool</a> to support two-finger panning as well as pinch-zooming\r
    and one-finger panning. Added the <a href="api/symbols/PanningTool.html#pan" target="api">PanningTool.pan</a> method, taking several\r
    arguments to make it easier to override in order to implement custom behaviors. For\r
    example, the\r
    <a href="../latest/samples/pinchResizing.html">Pinch Resizing sample</a> now overrides\r
    that method to demonstrate resizing and rotating a selected node.\r
  </li>\r
  <li>\r
    Added the <a href="api/symbols/DragSelectingTool.html#findinrect" target="api">DragSelectingTool.findInRect</a> method that can be overridden to\r
    customize the criteria by which Parts are selected.\r
  </li>\r
  <li>\r
    Added the <a href="api/symbols/Tool.html#canstartbutton" target="api">Tool.canStartButton</a> overridable predicate, which defaults to\r
    returning true if the <a href="api/symbols/Diagram.html#lastinput" target="api">Diagram.lastInput</a> has <a href="api/symbols/InputEvent.html#left" target="api">InputEvent.left</a> true -- i.e.\r
    whether the left mouse button is held down. You can override this method to change the\r
    behavior of many predefined Tools to operate with a mouse button other than the left\r
    one.\r
  </li>\r
  <li>\r
    Added an optional "result" argument to a number of methods that allocated Points or\r
    Rects, so that memory allocation can be reduced by passing one to the method and it\r
    can be modified and returned. Those methods are: <a href="api/symbols/Diagram.html#transformdoctoview" target="api">Diagram.transformDocToView</a>,\r
    <a href="api/symbols/Diagram.html#transformviewtodoc" target="api">Diagram.transformViewToDoc</a>, <a href="api/symbols/Link.html#computeotherpoint" target="api">Link.computeOtherPoint</a>,\r
    <a href="api/symbols/Geometry.html#computeboundswithoutorigin" target="api">Geometry.computeBoundsWithoutOrigin</a>.\r
  </li>\r
  <li>\r
    Some methods now return <b>this</b> instead of returning <b>void</b>, for convenience\r
    in chaining calls. Those methods include: <a href="api/symbols/Diagram.html#add" target="api">Diagram.add</a>, <a href="api/symbols/Diagram.html#remove" target="api">Diagram.remove</a>,\r
    <a href="api/symbols/Diagram.html#removeparts" target="api">Diagram.removeParts</a>, <a href="api/symbols/Diagram.html#addlayer" target="api">Diagram.addLayer</a>, <a href="api/symbols/Diagram.html#addlayerafter" target="api">Diagram.addLayerAfter</a>,\r
    <a href="api/symbols/Diagram.html#addlayerbefore" target="api">Diagram.addLayerBefore</a>, <a href="api/symbols/Diagram.html#removelayer" target="api">Diagram.removeLayer</a>,\r
    <a href="api/symbols/Diagram.html#addchangedlistener" target="api">Diagram.addChangedListener</a>, <a href="api/symbols/Diagram.html#removechangedlistener" target="api">Diagram.removeChangedListener</a>,\r
    <a href="api/symbols/Diagram.html#addmodelchangedlistener" target="api">Diagram.addModelChangedListener</a>, <a href="api/symbols/Diagram.html#removemodelchangedlistener" target="api">Diagram.removeModelChangedListener</a>,\r
    <a href="api/symbols/Diagram.html#adddiagramlistener" target="api">Diagram.addDiagramListener</a>, <a href="api/symbols/Diagram.html#removediagramlistener" target="api">Diagram.removeDiagramListener</a>,\r
    <a href="api/symbols/Panel.html#insertat" target="api">Panel.insertAt</a>, <a href="api/symbols/Panel.html#remove" target="api">Panel.remove</a>, <a href="api/symbols/Panel.html#removeat" target="api">Panel.removeAt</a>,\r
    <a href="api/symbols/ToolManager.html#initializestandardtools" target="api">ToolManager.initializeStandardTools</a>.\r
  </li>\r
  <li>\r
    <a href="api/symbols/Link.html#computeendsegmentlength" target="api">Link.computeEndSegmentLength</a> now takes an optional "dir" argument, defaulting\r
    to NaN for compatibility.\r
  </li>\r
  <li>\r
    <a href="api/symbols/Link.html#computeotherpoint" target="api">Link.computeOtherPoint</a> now takes optional "otherspot", "from", and "result"\r
    arguments. When none of those arguments are supplied, the behavior should be\r
    compatible.\r
  </li>\r
  <li>\r
    <a href="api/symbols/RotatingTool.html#handleangle" target="api">RotatingTool.handleAngle</a> now supports angles other than multiples of 90\r
    degrees. <a href="api/symbols/RotatingTool.html#originallocation" target="api">RotatingTool.originalLocation</a> is a new property that remembers the\r
    original location of the Part with the rotated object.\r
  </li>\r
  <li>\r
    Potentially Incompatible: Library use of <code>Math.random</code> has been replaced\r
    with <code>Crypto.getRandomValues()</code>. No random numbers were used for\r
    cryptographic purposes, but this should reduce false positives in static analysis\r
    tools. Use of <code>Crypto.getRandomValues()</code> may require Node 19 or higher.\r
  </li>\r
  <li>\r
    Potentially Incompatible: The default value of <a href="api/symbols/AnimationManager.html#isinitial" target="api">AnimationManager.isInitial</a> is\r
    now <code>false</code>. This means there is no initial animation by default. This can\r
    be set to true to maintain compatibility.\r
  </li>\r
</ul>\r
\r
<h3 id="Fixes">Bug fix changes in 4.0 since 3.1</h3>\r
<ul>\r
  <li><a href="api/symbols/ToolManager.html#gesturemode" target="api">ToolManager.GestureMode</a> now works without needing to alter CSS.</li>\r
  <li>\r
    Fixed some uses of <a href="api/symbols/GraphObject.html#shadowvisible" target="api">GraphObject.shadowVisible</a> incorrectly propagating a\r
    no-shadow rule.\r
  </li>\r
  <li>\r
    Clicking on a button in GoJS no longer triggers a focus ring as if a keyboard was used.\r
  </li>\r
</ul>\r
\r
<hr />\r
\r
<h3 id="OldChangeLogs">Old Change Logs</h3>\r
<h4><a href="../3.1.10/changelog.html">Change log for 3.1</a></h4>\r
<h4><a href="../3.0.28/changelog.html">Change log for 3.0</a></h4>\r
<h4><a href="../2.3.19/changelog.html">Change log for 2.3</a> (unsupported)</h4>\r
<h4><a href="../2.2.23/changelog.html">Change log for 2.2</a> (unsupported)</h4>\r
<h4><a href="../2.1.56/changelog.html">Change log for 2.1</a> (unsupported)</h4>\r
<h4><a href="../2.0.21/changelog.html">Change log for 2.0</a> (unsupported)</h4>`,codeBlocks:[{id:null,code:`import go from 'gojs';\r
\r
// Create your own node and link data types\r
interface MyNodeData { key: string; text: string; color: string; }\r
interface MyLinkData { key: number; from: string; to: string; }\r
\r
// Create typed models: keeps type info\r
const treeModel = new go.TreeModel<MyNodeData>();\r
const model = new go.GraphLinksModel<MyNodeData, MyLinkData>();\r
diagram.model = model;\r
\r
// TYPED: use model variable for data operations\r
model.addNodeData({ key: '1', name: 'Alpha', color: 'red' }); // type-checked\r
model.addNodeData({ key: '2', color: 'blue' });               // Error: missing 'name'\r
const found = model.findNodeDataForKey('1');                  // MyNodeData | null\r
model.nodeDataArray.forEach(nd => nd.name);                   // autocompletes .name, .color, .key\r
\r
model.addLinkData({ key: 1, from: '1', to: '2' });            // type-checked\r
model.linkDataArray.forEach(ld => ld.thickness);              // autocompletes .from, .to, .thickness\r
\r
// NON-TYPED: diagram.model is fine for non-data operations\r
diagram.model.commit(m => { /* ... */ });\r
const json = diagram.model.toJson();\r
diagram.model.undoManager.isEnabled = true;`,isExecutable:!1,language:`ts`,initiallyVisible:!0}]}),m=i(`<meta property="og:title" content="Change Log | GoJS"/> <meta name="description" content="GoJS Change Log"/> <meta property="og:description" content="GoJS Change Log"/>`,1),h=i(`<article class="prose max-w-5xl mx-auto px-4 py-8"><!></article>`);function g(i,u){o(u,!0);var f=h();c(`c3nf25`,e=>{var i=m();l(4),r(()=>{n.title=`Change Log | GoJS`}),t(e,i)}),d(a(f),{get htmlContent(){return u.data.htmlContent},get codeBlocks(){return u.data.codeBlocks}}),s(f),t(i,f),e()}export{g as component,f as universal};