import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`PERT Chart with Legend`,indexDescription:`A simple PERT chart, showcasing GoJS table panels and RowColumnDefinition properties.`,screenshot:`pert`,priority:2,tags:[`tables`,`layered-digraph`,`legend`],description:`A PERT chart: a diagram for visualizing and analyzing task dependencies and bottlenecks.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
    // colors used, named for easier identification\r
    const blue = '#0288D1';\r
    const pink = '#B71C1C';\r
    const pinkfill = '#F8BBD0';\r
    const bluefill = '#B3E5FC';\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform,\r
      layout: new go.LayeredDigraphLayout()\r
    });\r
\r
    // The node template shows the activity name in the middle as well as\r
    // various statistics about the activity, all surrounded by a border.\r
    // The border's color is determined by the node data's ".critical" property.\r
    // Some information is not available as properties on the node data,\r
    // but must be computed -- we use converter functions for that.\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('Rectangle', { fill: 'white', strokeWidth: 2 }) // the border\r
            .bind('fill', 'critical', b => b ? pinkfill : bluefill)\r
            .bind('stroke', 'critical', b => b ? pink : blue),\r
          new go.Panel('Table', { padding: 0.5 })\r
            .addColumnDefinition(1, { separatorStroke: 'black' })\r
            .addColumnDefinition(2, { separatorStroke: 'black' })\r
            .addRowDefinition(1, { separatorStroke: 'black', background: 'white', coversSeparators: true })\r
            .addRowDefinition(2, { separatorStroke: 'black' })\r
            .add(\r
              // earlyStart\r
              new go.TextBlock({ row: 0, column: 0, margin: 5, textAlign: 'center' })\r
                .bind('text', 'earlyStart'),\r
              new go.TextBlock({ row: 0, column: 1, margin: 5, textAlign: 'center' })\r
                .bind('text', 'length'),\r
              new go.TextBlock({ row: 0, column: 2, margin: 5, textAlign: 'center' })\r
                .bind('text', '', d => (d.earlyStart + d.length).toFixed(2)),// earlyFinish\r
              new go.TextBlock({\r
                  row: 1,\r
                  column: 0,\r
                  columnSpan: 3,\r
                  margin: 5,\r
                  textAlign: 'center',\r
                  font: 'bold 14px sans-serif'\r
                })\r
                .bind('text'),\r
              new go.TextBlock({ row: 2, column: 0, margin: 5, textAlign: 'center' }) // lateStart\r
                .bind('text', '', d => (d.lateFinish - d.length).toFixed(2)),\r
              new go.TextBlock({ row: 2, column: 1, margin: 5, textAlign: 'center' }) // slack\r
                .bind('text', '', d => (d.lateFinish - (d.earlyStart + d.length)).toFixed(2)),\r
              new go.TextBlock({ row: 2, column: 2, margin: 5, textAlign: 'center' }) // lateFinish\r
                .bind('text', 'lateFinish')\r
            ) // end Table Panel\r
        ); // end Node\r
\r
    // The link data object does not have direct access to both nodes\r
    // (although it does have references to their keys: .from and .to).\r
    // This conversion function gets the GraphObject that was data-bound as the second argument.\r
    // From that we can get the containing Link, and then the Link.fromNode or .toNode,\r
    // and then its node data, which has the ".critical" property we need.\r
    //\r
    // But note that if we were to dynamically change the ".critical" property on a node data,\r
    // calling myDiagram.model.updateTargetBindings(nodedata) would only update the color\r
    // of the nodes.  It would be insufficient to change the appearance of any Links.\r
    function linkColorConverter(linkdata, elt) {\r
      var link = elt.part;\r
      if (!link) return blue;\r
      var f = link.fromNode;\r
      if (!f || !f.data || !f.data.critical) return blue;\r
      var t = link.toNode;\r
      if (!t || !t.data || !t.data.critical) return blue;\r
      return pink; // when both Link.fromNode.data.critical and Link.toNode.data.critical\r
    }\r
\r
    // The color of a link (including its arrowhead) is red only when both\r
    // connected nodes have data that is ".critical"; otherwise it is blue.\r
    // This is computed by the binding converter function.\r
    myDiagram.linkTemplate =\r
      new go.Link({ corner: 10, toShortLength: 6, toEndSegmentLength: 20 })\r
        .add(\r
          new go.Shape({ strokeWidth: 4 })\r
            .bind('stroke', '', linkColorConverter),\r
          new go.Shape( // arrowhead\r
            { toArrow: 'Triangle', stroke: null, scale: 1.5 })\r
            .bind('fill', '', linkColorConverter)\r
        );\r
\r
    // here's the data defining the graph\r
    var nodeDataArray = [\r
      { key: 1, text: 'Start', length: 0, earlyStart: 0, lateFinish: 0, critical: true },\r
      { key: 2, text: 'a', length: 4, earlyStart: 0, lateFinish: 4, critical: true },\r
      { key: 3, text: 'b', length: 5.33, earlyStart: 0, lateFinish: 9.17, critical: false },\r
      { key: 4, text: 'c', length: 5.17, earlyStart: 4, lateFinish: 9.17, critical: true },\r
      { key: 5, text: 'd', length: 6.33, earlyStart: 4, lateFinish: 15.01, critical: false },\r
      { key: 6, text: 'e', length: 5.17, earlyStart: 9.17, lateFinish: 14.34, critical: true },\r
      { key: 7, text: 'f', length: 4.5, earlyStart: 10.33, lateFinish: 19.51, critical: false },\r
      { key: 8, text: 'g', length: 5.17, earlyStart: 14.34, lateFinish: 19.51, critical: true },\r
      { key: 9, text: 'Finish', length: 0, earlyStart: 19.51, lateFinish: 19.51, critical: true }\r
    ];\r
    var linkDataArray = [\r
      { from: 1, to: 2 },\r
      { from: 1, to: 3 },\r
      { from: 2, to: 4 },\r
      { from: 2, to: 5 },\r
      { from: 3, to: 6 },\r
      { from: 4, to: 6 },\r
      { from: 5, to: 7 },\r
      { from: 6, to: 8 },\r
      { from: 7, to: 9 },\r
      { from: 8, to: 9 }\r
    ];\r
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);\r
\r
    // create an unbound Part that acts as a "legend" for the diagram\r
    myDiagram.add(\r
      new go.Node('Auto', { layerName: 'ViewportBackground' })\r
        .add(\r
          new go.Shape('Rectangle', { fill: '#EEEEEE' }), // the border\r
          new go.Panel('Table')\r
            .addColumnDefinition(1, { separatorStroke: 'black' })\r
            .addColumnDefinition(2, { separatorStroke: 'black' })\r
            .addRowDefinition(1, { separatorStroke: 'black', background: '#EEEEEE', coversSeparators: true })\r
            .addRowDefinition(2, { separatorStroke: 'black' })\r
            .add(\r
              new go.TextBlock('Early Start', { row: 0, column: 0, margin: 5, textAlign: 'center' }),\r
              new go.TextBlock('Length', { row: 0, column: 1, margin: 5, textAlign: 'center' }),\r
              new go.TextBlock('Early Finish', { row: 0, column: 2, margin: 5, textAlign: 'center' }),\r
\r
              new go.TextBlock('Activity Name', {\r
                row: 1,\r
                column: 0,\r
                columnSpan: 3,\r
                margin: 5,\r
                textAlign: 'center',\r
                font: 'bold 14px sans-serif'\r
              }),\r
\r
              new go.TextBlock('Late Start', { row: 2, column: 0, margin: 5, textAlign: 'center' }),\r
              new go.TextBlock('Slack', { row: 2, column: 1, margin: 5, textAlign: 'center' }),\r
              new go.TextBlock('Late Finish', { row: 2, column: 2, margin: 5, textAlign: 'center' })\r
            ) // end Table Panel\r
        )\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates how to create a simple PERT chart. A PERT chart is a project management tool used to schedule and coordinate tasks within a\r
    project.\r
  </p>\r
  <p>\r
    Each node represents an activity and displays several pieces of information about each one. The node template is basically a <a>Panel</a> of type\r
    <a>Panel.Table</a> holding several <a>TextBlock</a>s that are data-bound to properties of the Activity, all surrounded by a rectangular border. The lines\r
    separating the text are implemented by setting the <a>RowColumnDefinition.separatorStroke</a> for two columns and two rows. The separators are not seen in\r
    the middle because the middle row of each node has its <a>RowColumnDefinition.background</a> set to white, and\r
    <a>RowColumnDefinition.coversSeparators</a> set to true.\r
  </p>\r
  <p>\r
    The "critical" property on the activity data object controls whether the node is drawn with a red brush or a blue one. There is a special converter that is\r
    used to determine the brush used by the links.\r
  </p>\r
  <p>\r
    The light blue legend is implemented by a separate Part implemented in a manner similar to the Node template. However it is not bound to data -- there is no\r
    JavaScript object in the model representing the legend.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`layered-digraph`,`legend`];var g=y();l(`ncpcfa`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};