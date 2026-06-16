import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Table Layout of Nodes in Rows and Columns`,indexDescription:`A custom Layout that arranges Nodes just as a Table Panel arranges GraphObjects.`,screenshot:`table`,priority:2,tags:[`tables`,`collections`,`customlayout`,`groups`,`tools`,`palette`,`extensions`],description:`Use the TableLayout extension to arrange nodes in a tabular or grid-like form.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div id="myPaletteDiv" style="width: 120px; height: 600px; margin-right: 2px; border: solid 1px black"></div>\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 600px; border: solid 1px black"></div>\r
  </div>`,jsCode:`// define a custom ResizingTool to limit how far one can shrink a row or column\r
  class LaneResizingTool extends go.ResizingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    computeMinSize() {\r
      const diagram = this.diagram;\r
      if (this.adornedObject === null) return new go.Size();\r
      const lane = this.adornedObject.part; // might be row or column\r
      if (lane === null) return new go.Size();\r
      const horiz = lane.category === 'Column Header'; // or "Row Header"\r
      const margin = diagram.nodeTemplate.margin;\r
      let bounds = new go.Rect();\r
      diagram.findTopLevelGroups().each(g => {\r
        if (lane === null) return;\r
        if (horiz ? g.column === lane.column : g.row === lane.row) {\r
          const b = diagram.computePartsBounds(g.memberParts);\r
          if (b.isEmpty()) return; // nothing in there?  ignore it\r
          b.unionPoint(g.location); // keep any empty space on the left and top\r
          b.addMargin(margin); // assume the same node margin applies to all nodes\r
          if (bounds.isEmpty()) {\r
            bounds = b;\r
          } else {\r
            bounds.unionRect(b);\r
          }\r
        }\r
      });\r
      // limit the result by the standard value of computeMinSize\r
      const msz = super.computeMinSize();\r
      if (bounds.isEmpty()) return msz;\r
      return new go.Size(Math.max(msz.width, bounds.width), Math.max(msz.height, bounds.height));\r
    }\r
\r
    resize(newr) {\r
      const diagram = this.diagram;\r
      if (this.adornedObject === null) return;\r
      const lane = this.adornedObject.part;\r
      if (lane === null) return;\r
      const horiz = lane.category === 'Column Header';\r
      const lay = diagram.layout; // the TableLayout\r
      if (horiz) {\r
        const col = lane.column;\r
        const coldef = lay.getColumnDefinition(col);\r
        coldef.width = newr.width;\r
      } else {\r
        const row = lane.row;\r
        const rowdef = lay.getRowDefinition(row);\r
        rowdef.height = newr.height;\r
      }\r
      lay.invalidateLayout();\r
    }\r
  } // end LaneResizingTool class\r
\r
  function init() {\r
\r
    const tableLayout = new TableLayout();\r
    tableLayout.getRowDefinition(1).height = 22; // fixed size column headers\r
    tableLayout.getColumnDefinition(1).width = 22; // fixed size row headers\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: tableLayout,\r
      SelectionMoved: e => e.diagram.layoutDiagram(true),\r
      resizingTool: new LaneResizingTool(),\r
      // feedback that dropping in the background is not allowed\r
      mouseDragOver: e => (e.diagram.currentCursor = 'not-allowed'),\r
      // when dropped in the background, not on a Node or a Group, cancel the drop\r
      mouseDrop: e => e.diagram.currentTool.doCancel(),\r
      'animationManager.isInitial': false,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplateMap.add('Header', // an overall table header, at the top\r
      new go.Part('Auto', {\r
          row: 0,\r
          column: 1,\r
          columnSpan: 9999,\r
          stretch: go.Stretch.Horizontal,\r
          selectable: false,\r
          pickable: false\r
        })\r
        .add(\r
          new go.Shape({ fill: 'transparent', strokeWidth: 0 }),\r
          new go.TextBlock({ alignment: go.Spot.Center, font: 'bold 12pt sans-serif' })\r
            .bind('text')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Sider', // an overall table header, on the left side\r
      new go.Part('Auto', {\r
          row: 1,\r
          rowSpan: 9999,\r
          column: 0,\r
          stretch: go.Stretch.Vertical,\r
          selectable: false,\r
          pickable: false\r
        })\r
        .add(\r
          new go.Shape({ fill: 'transparent', strokeWidth: 0 }),\r
          new go.TextBlock({ alignment: go.Spot.Center, font: 'bold 12pt sans-serif', angle: 270 })\r
            .bind('text')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Column Header', // for each column header\r
      new go.Part('Spot', {\r
          row: 1,\r
          rowSpan: 9999,\r
          column: 2,\r
          minSize: new go.Size(100, NaN),\r
          stretch: go.Stretch.Fill,\r
          movable: false,\r
          resizable: true,\r
          resizeAdornmentTemplate:\r
            new go.Adornment('Spot')\r
              .add(\r
                new go.Placeholder(),\r
                new go.Shape({ // for changing the length of a lane\r
                  alignment: go.Spot.Right,\r
                  desiredSize: new go.Size(7, 50),\r
                  fill: 'lightblue',\r
                  stroke: 'dodgerblue',\r
                  cursor: 'col-resize'\r
                })\r
              )\r
        })\r
        .bind('column', 'col')\r
        .add(\r
          new go.Shape({ fill: null })\r
            .bind('fill', 'color'),\r
          new go.Panel('Auto', {\r
              // this is positioned above the Shape, in row 1\r
              alignment: go.Spot.Top,\r
              alignmentFocus: go.Spot.Bottom,\r
              stretch: go.Stretch.Horizontal,\r
              height: myDiagram.layout.getRowDefinition(1).height\r
            })\r
            .add(\r
              new go.Shape({ fill: 'transparent', strokeWidth: 0 }),\r
              new go.TextBlock({\r
                  font: 'bold 10pt sans-serif',\r
                  isMultiline: false,\r
                  wrap: go.Wrap.None,\r
                  overflow: go.TextOverflow.Ellipsis\r
                })\r
                .bind('text')\r
            )\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('Row Sider', // for each row header\r
      new go.Part('Spot', {\r
          row: 2,\r
          column: 1,\r
          columnSpan: 9999,\r
          minSize: new go.Size(NaN, 100),\r
          stretch: go.Stretch.Fill,\r
          movable: false,\r
          resizable: true,\r
          resizeAdornmentTemplate:\r
            new go.Adornment('Spot')\r
              .add(\r
                new go.Placeholder(),\r
                new go.Shape({ // for changing the breadth of a lane\r
                  alignment: go.Spot.Bottom,\r
                  desiredSize: new go.Size(50, 7),\r
                  fill: 'lightblue',\r
                  stroke: 'dodgerblue',\r
                  cursor: 'row-resize'\r
                })\r
              )\r
        })\r
        .bind('row')\r
        .add(\r
          new go.Shape({ fill: null })\r
            .bind('fill', 'color'),\r
          new go.Panel('Auto', {\r
              // this is positioned to the left of the Shape, in column 1\r
              alignment: go.Spot.Left,\r
              alignmentFocus: go.Spot.Right,\r
              stretch: go.Stretch.Vertical,\r
              angle: 270,\r
              height: myDiagram.layout.getColumnDefinition(1).width\r
            })\r
            .add(\r
              new go.Shape({ fill: 'transparent', strokeWidth: 0 }),\r
              new go.TextBlock({\r
                  font: 'bold 10pt sans-serif',\r
                  isMultiline: false,\r
                  wrap: go.Wrap.None,\r
                  overflow: go.TextOverflow.Ellipsis\r
                })\r
                .bind('text')\r
            )\r
        ));\r
\r
    myDiagram.nodeTemplate = // for regular nodes within cells (groups); you'll want to extend this\r
      new go.Node('Auto', { width: 100, height: 50, margin: 4 }) // assume uniform Margin, all around\r
        .bind('row')\r
        .bind('column', 'col')\r
        .add(\r
          new go.Shape({ fill: 'white' })\r
            .bind('fill', 'color'),\r
          new go.TextBlock()\r
            .bind('text', 'key')\r
        );\r
\r
    myDiagram.groupTemplate = // for cells\r
      new go.Group('Auto', {\r
          layerName: 'Background',\r
          stretch: go.Stretch.Fill,\r
          selectable: false,\r
          computesBoundsAfterDrag: true,\r
          computesBoundsIncludingLocation: true,\r
          handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links\r
          mouseDragEnter: (e, group, prev) => {\r
            group.isHighlighted = true;\r
          },\r
          mouseDragLeave: (e, group, next) => {\r
            group.isHighlighted = false;\r
          },\r
          mouseDrop: (e, group) => {\r
            // if any dropped part wasn't already a member of this group, we'll want to let the group's row\r
            // column allow themselves to be resized automatically, in case the row height or column width\r
            // had been set manually by the LaneResizingTool\r
            var anynew = e.diagram.selection.any(p => p.containingGroup !== group);\r
            // Don't allow headers/siders to be dropped\r
            var anyHeadersSiders = e.diagram.selection.any(p => p.category === 'Column Header' || p.category === 'Row Sider');\r
            if (!anyHeadersSiders && group.addMembers(e.diagram.selection, true)) {\r
              if (anynew) {\r
                e.diagram.layout.getRowDefinition(group.row).height = NaN;\r
                e.diagram.layout.getColumnDefinition(group.column).width = NaN;\r
              }\r
            } else {\r
              // failure upon trying to add parts to this group\r
              e.diagram.currentTool.doCancel();\r
            }\r
          }\r
        })\r
        .bind('row')\r
        .bind('column', 'col')\r
        .add(\r
          // the group is normally unseen -- it is completely transparent except when given a color or when highlighted\r
          new go.Shape({\r
              fill: 'transparent',\r
              stroke: 'transparent',\r
              strokeWidth: myDiagram.nodeTemplate.margin.left,\r
              stretch: go.Stretch.Fill\r
            })\r
            .bind('fill', 'color')\r
            .bindObject('stroke', 'isHighlighted', h => h ? 'red' : 'transparent'),\r
          new go.Placeholder({\r
            // leave a margin around the member nodes of the group which is the same as the member node margin\r
            alignment: (m => new go.Spot(0, 0, m.top, m.left))(myDiagram.nodeTemplate.margin),\r
            padding: (m => new go.Margin(0, m.right, m.bottom, 0))(myDiagram.nodeTemplate.margin)\r
          })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel([\r
      // headers\r
      { key: 'Header', text: 'Vacation Procedures', category: 'Header' },\r
      { key: 'Sider', text: 'Personnel', category: 'Sider' },\r
      // column and row headers\r
      { key: 'Request', text: 'Request', col: 2, category: 'Column Header' },\r
      { key: 'Approval', text: 'Approval', col: 3, category: 'Column Header' },\r
      { key: 'Employee', text: 'Employee', row: 2, category: 'Row Sider' },\r
      { key: 'Manager', text: 'Manager', row: 3, category: 'Row Sider' },\r
      { key: 'Administrator', text: 'Administrator', row: 4, category: 'Row Sider' },\r
      // cells, each a group assigned to a row and column\r
      { key: 'EmpReq', row: 2, col: 2, isGroup: true, color: 'lightyellow' },\r
      { key: 'EmpApp', row: 2, col: 3, isGroup: true, color: 'lightgreen' },\r
      { key: 'ManReq', row: 3, col: 2, isGroup: true, color: 'lightgreen' },\r
      { key: 'ManApp', row: 3, col: 3, isGroup: true, color: 'lightyellow' },\r
      { key: 'AdmReq', row: 4, col: 2, isGroup: true, color: 'lightyellow' },\r
      { key: 'AdmApp', row: 4, col: 3, isGroup: true, color: 'lightgreen' },\r
      // nodes, each assigned to a group/cell\r
      { key: 'Delta', color: 'orange', size: '100 100', group: 'EmpReq' },\r
      { key: 'Epsilon', color: 'coral', size: '100 50', group: 'EmpReq' },\r
      { key: 'Zeta', color: 'tomato', size: '50 70', group: 'ManReq' },\r
      { key: 'Eta', color: 'coral', size: '50 50', group: 'ManApp' },\r
      { key: 'Theta', color: 'tomato', size: '100 50', group: 'AdmApp' }\r
    ]);\r
\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      nodeTemplateMap: myDiagram.nodeTemplateMap,\r
      'model.nodeDataArray': [\r
        { key: 'Alpha', color: 'orange' },\r
        { key: 'Beta', color: 'tomato' },\r
        { key: 'Gamma', color: 'goldenrod' }\r
      ]\r
    });\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/TableLayout.js`],descriptionHtml:`<p>\r
    This sample demonstrates a custom Layout, TableLayout, that is very much like a simplified "Table" Panel layout, but working on non-Link Parts in a Diagram\r
    or a Group rather than on GraphObjects in a Panel. The layout is defined in its own file, as <a href="../extensions/TableLayout.js">TableLayout.js</a>.\r
  </p>\r
  <p>\r
    You can drag-and-drop nodes from the Palette into any Group. Dragging into a Group highlights the Group. Drops must occur inside Groups; otherwise the\r
    action is cancelled.\r
  </p>\r
  <p>\r
    Each row and each column is <a>Part.resizable</a> and has a custom <a>Part.resizeAdornmentTemplate</a>\r
    showing a single resize handle on the right side or on the bottom. There is a custom LaneResizingTool to provide a minimum width or height based on the\r
    contents of all of the groups (cells) in that column or row.\r
  </p>\r
  <p>\r
    This example assumes the Groups are predefined and exist in each cell at a particular row/column, but this sample could be extended to allow adding and\r
    removing rows and/or columns.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`collections`,`customlayout`,`groups`,`tools`,`palette`,`extensions`];var g=y();l(`1qyap63`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};