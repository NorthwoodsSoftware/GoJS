import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Organizing Layers Visually with Bands`,titleShort:`Layer Bands`,indexDescription:`Layer Bands are automatically created for each 'layer' of a TreeLayout, and run perpendicular to the layout.`,screenshot:`swimbands`,priority:1.3,tags:[`itemarrays`,`treelayout`,`customlayout`],description:`Showing bands for the layers in a diagram.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`// this controls whether the layout is horizontal and the layer bands are vertical, or vice-versa:\r
  var HORIZONTAL = true; // this constant parameter can only be set here, not dynamically\r
\r
  // Perform a TreeLayout where commitLayers is overridden to modify the background Part whose key is "_BANDS".\r
  class SimpleBandedTreeLayout extends go.TreeLayout {\r
    constructor(init) {\r
      super();\r
      this.layerStyle = go.TreeLayerStyle.Uniform; // needed for straight layers\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    commitLayers(layerRects, offset) {\r
      // update the background object holding the visual "bands"\r
      var bands = this.diagram.findPartForKey('_BANDS');\r
      if (bands) {\r
        var model = this.diagram.model;\r
        bands.location = this.arrangementOrigin.copy().add(offset);\r
\r
        // make each band visible or not, depending on whether there is a layer for it\r
        for (var it = bands.elements; it.next(); ) {\r
          var idx = it.key;\r
          var elt = it.value; // the item panel representing a band\r
          elt.visible = idx < layerRects.length;\r
        }\r
\r
        // set the bounds of each band via data binding of the "bounds" property\r
        var arr = bands.data.itemArray;\r
        for (var i = 0; i < layerRects.length; i++) {\r
          var itemdata = arr[i];\r
          if (itemdata) {\r
            model.set(itemdata, 'bounds', layerRects[i]);\r
          }\r
        }\r
      }\r
    }\r
  }\r
  // end SimpleBandedTreeLayout\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new SimpleBandedTreeLayout({ // custom layout is defined above\r
        angle: HORIZONTAL ? 0 : 90,\r
        arrangement: HORIZONTAL ? go.TreeArrangement.Vertical : go.TreeArrangement.Horizontal\r
      }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node(go.Panel.Auto)\r
        .add(\r
          new go.Shape('Rectangle', { fill: 'white' }),\r
          new go.TextBlock({ margin: 5 })\r
            .bind('text', 'key')\r
        );\r
\r
    // There should be at most a single object of this category.\r
    // This Part will be modified by SimpleBandedTreeLayout.commitLayers to display visual "bands"\r
    // where each "layer" is a layer of the tree.\r
    // This template is parameterized at load time by the HORIZONTAL parameter.\r
    // You also have the option of showing rectangles for the layer bands or\r
    // of showing separator lines between the layers, but not both at the same time,\r
    // by commenting in/out the indicated code.\r
    myDiagram.nodeTemplateMap.add('Bands',\r
      new go.Part('Position', {\r
          isLayoutPositioned: false, // but still in document bounds\r
          locationSpot: new go.Spot(0, 0, HORIZONTAL ? 0 : 16, HORIZONTAL ? 16 : 0), // account for header height\r
          layerName: 'Background',\r
          pickable: false,\r
          selectable: false,\r
          isShadowed: true,\r
          shadowOffset: new go.Point(0, 0),\r
          itemTemplate:\r
            new go.Panel(HORIZONTAL ? 'Vertical' : 'Horizontal')\r
              .bind('position', 'bounds', b => b.position)\r
              .add(\r
                new go.TextBlock({\r
                    angle: HORIZONTAL ? 0 : 270,\r
                    textAlign: 'center',\r
                    wrap: go.Wrap.None,\r
                    font: 'bold 11pt sans-serif',\r
                    background: "gray",\r
                    stroke: "white"\r
                  })\r
                  .bind('text')\r
                  // always bind "width" because the angle does the rotation\r
                  .bind('width', 'bounds', r => HORIZONTAL ? r.width : r.height),\r
                // option 1: rectangular bands:\r
                new go.Shape({ stroke: null, strokeWidth: 0 })\r
                  .bind('desiredSize', 'bounds', r => r.size)\r
                  .bindObject('fill', 'itemIndex', i =>\r
                    i % 2 == 0 ? 'whitesmoke' : go.Brush.darken('whitesmoke')\r
                  )\r
                // option 2: separator lines:\r
                // (HORIZONTAL\r
                //  ? new go.Shape("LineV",\r
                //      { stroke: "gray", alignment: go.Spot.TopLeft, width: 1 })\r
                //      .bind("height", "bounds", r => r.height)\r
                //      .bindObject("visible", "itemIndex", i => i > 0)\r
                //  : new go.Shape("LineH",\r
                //      { stroke: "gray", alignment: go.Spot.TopLeft, height: 1 })\r
                //      .bind("width", "bounds", r => r.width)\r
                //      .bindObject("visible", "itemIndex", i => i > 0))\r
              )\r
        })\r
        .bind('itemArray')\r
    );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link()\r
        .add(new go.Shape()); // simple black line, no arrowhead needed\r
\r
    // define the tree node data\r
    var nodearray = [\r
      {\r
        // this is the information needed for the headers of the bands\r
        key: '_BANDS',\r
        category: 'Bands',\r
        itemArray: [\r
          { text: 'Zero' },\r
          { text: 'One' },\r
          { text: 'Two' },\r
          { text: 'Three' },\r
          { text: 'Four' },\r
          { text: 'Five' }\r
        ]\r
      },\r
      // these are the regular nodes in the TreeModel\r
      { key: 'root' },\r
      { key: 'oneB', parent: 'root' },\r
      { key: 'twoA', parent: 'oneB' },\r
      { key: 'twoC', parent: 'root' },\r
      { key: 'threeC', parent: 'twoC' },\r
      { key: 'threeD', parent: 'twoC' },\r
      { key: 'fourB', parent: 'threeD' },\r
      { key: 'fourC', parent: 'twoC' },\r
      { key: 'fourD', parent: 'fourB' },\r
      { key: 'twoD', parent: 'root' }\r
    ];\r
\r
    myDiagram.model = new go.TreeModel(nodearray);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Unlike swim lane diagrams where the nodes are supposed to stay in their lanes, layer bands run\r
    perpendicular to the growth direction of the layout.\r
  </p>\r
  <p>\r
    This sample uses a custom <a>TreeLayout</a> that overrides the\r
    <a>TreeLayout.commitLayers</a> method in order to specify the position and size of each "band"\r
    that surrounds a layer of the tree. The "bands" are held in a single Part that is bound to a\r
    particular node data object whose key is "_BANDS". The headers, and potentially any other\r
    information that you might want to display in the headers, are stored in this "_BANDS" object in\r
    an Array.\r
  </p>\r
  <p>\r
    This sample can be adapted to use a <a>GraphLinksModel</a> instead of a <a>TreeModel</a> and a\r
    <a>LayeredDigraphLayout</a> instead of a <a>TreeLayout</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`itemarrays`,`treelayout`,`customlayout`];var g=y();l(`ub19ej`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};