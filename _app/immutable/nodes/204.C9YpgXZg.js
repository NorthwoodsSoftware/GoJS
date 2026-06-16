import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Custom Panel Layout: Cascading Elements`,indexDescription:`Shows how to create a custom PaneLayout.`,screenshot:`panellayout`,priority:2,description:`Example custom PanelLayout.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       This also adds a border to help see the edges of the viewport. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 800px"></div>`,jsCode:`class PanelLayoutCascading extends go.PanelLayout {\r
    constructor(init) {\r
      super();\r
      this.name = 'Cascading';\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    /**\r
     * Given the available size, measure the Panel and\r
     * determine its expected drawing size. Sets the measuredBounds of the object.\r
     *\r
     * This must call {@link #measureElement} with each Panel element.\r
     *\r
     * This must also construct the union.width and union.height of the passed in union Rect argument.\r
     *\r
     * @this {PanelLayout}\r
     * @param {Panel} panel Panel which called this layout\r
     * @param {number} width expected width of the panel\r
     * @param {number} height expected width of the panel\r
     * @param {Array.<GraphObject>} elements Array of Panel elements\r
     * @param {Rect} union rectangle to contain the expected union bounds of every element in the Panel. Useful for arrange.\r
     * @param {number} minw minimum width of the panel\r
     * @param {number} minh minimum height of the panel\r
     */\r
    measure(panel, width, height, elements, union, minw, minh) {\r
      const l = elements.length;\r
      for (let i = 0; i < l; i++) {\r
        const elem = elements[i];\r
        this.measureElement(elem, width, height, minw, minh);\r
        const mb = elem.measuredBounds;\r
        union.width += mb.width;\r
        union.height += mb.height;\r
      }\r
    }\r
\r
    /**\r
     * Given the panel and its list of elements, arrange each element.\r
     *\r
     * This must call {@link #arrangeElement} with each Panel element, which will set that element's {@link GraphObject#actualBounds}.\r
     *\r
     * For arranging some elements, it is useful to know the total unioned area of every element.\r
     * This Rect can be used to right-align or center-align, etc, elements within an area.\r
     *\r
     * @this {PanelLayout}\r
     * @param {Panel} panel Panel which called this layout\r
     * @param {Array.<GraphObject>} elements Array of Panel elements\r
     * @param {Rect} union rectangle, if properly constructed in {@link #measure}, that contains the expected union bounds of every element in the Panel.\r
     */\r
    arrange(panel, elements, union) {\r
      const l = elements.length;\r
      let x = 0;\r
      let y = 0;\r
      for (let i = 0; i < l; i++) {\r
        const elem = elements[i];\r
        const mb = elem.measuredBounds;\r
        this.arrangeElement(elem, x, y, mb.width, mb.height);\r
        /*\r
         * By incrementing the arranged x and y by the width and height, we arrange each object in a diagonal fashion:\r
         *  A\r
         *    B\r
         *      C\r
         *        D\r
         */\r
        x += mb.width;\r
        y += mb.height;\r
      }\r
    }\r
  }\r
  // end of PanelLayoutCascading\r
\r
  // Register the PanelLayout so that go.GraphObject.build can use it by name:\r
  go.Panel.definePanelLayout('Cascading', new PanelLayoutCascading());\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });\r
\r
    // Define a simple Node template that includes a Cascading Panel holding\r
    // some number of item Panels holding Shapes, based on data.items being an Array\r
    // of item descriptor objects.\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { width: 100, height: 100 })\r
        .add(\r
          new go.Shape({ fill: 'transparent', strokeWidth: 2 })\r
            .bind('stroke', 'color'),\r
          new go.Panel('Cascading', {\r
              itemTemplate:\r
                new go.Panel()\r
                  .add(\r
                    new go.Shape({ width: 20, height: 20, strokeWidth: 0 })\r
                      .bind('figure', 'fig')\r
                      .bind('fill', 'color')\r
                  )\r
            })\r
            .bind('itemArray', 'items')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel([\r
      {\r
        key: 1,\r
        color: 'lightgreen',\r
        items: [\r
          { fig: 'RoundedRectangle', color: 'lightblue' },\r
          { fig: 'Triangle', color: 'pink' }\r
        ]\r
      },\r
      {\r
        key: 2,\r
        color: 'lightblue',\r
        items: [\r
          { fig: 'RoundedRectangle', color: 'lightgray' },\r
          { fig: 'Square', color: 'yellow' },\r
          { fig: 'Circle', color: 'orange' }\r
        ]\r
      },\r
      {\r
        key: 3,\r
        color: 'purple',\r
        items: [{ fig: 'Diamond', color: 'red' }]\r
      },\r
      {\r
        key: 4,\r
        color: 'orange',\r
        items: [\r
          { fig: 'Circle', color: 'green' },\r
          { fig: 'Square', color: 'blue' },\r
          { fig: 'Triangle', color: 'red' },\r
          { fig: 'TriangleRight', color: 'green' }\r
        ]\r
      }\r
    ]);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates creating a simple custom <a>PanelLayout</a>. It merely cascades the elements diagonally, as if combining a Horizontal and Vertical\r
    panel.\r
  </p>\r
  <p>\r
    Creating your own Panel layouts is very uncommon, and you should not need to create your own to use GoJS effectively. However there may be apps that require\r
    creating a custom Panel layout because the standard panel layouts do not offer the precise behavior that you want.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[];var g=y();l(`m4cf83`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};