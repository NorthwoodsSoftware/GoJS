/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';
import { TableLayout } from './TableLayout.js';

// define a custom ResizingTool to limit how far one can shrink a row or column
class LaneResizingTool extends go.ResizingTool {

  public computeMinSize(): go.Size {
    const diagram = this.diagram;
    if (this.adornedObject === null) return new go.Size();
    const lane = this.adornedObject.part;  // might be row or column
    if (lane === null) return new go.Size();
    const horiz = (lane.category === 'Column Header');  // or "Row Header"
    const margin = diagram.nodeTemplate.margin as go.Margin;
    let bounds = new go.Rect();
    diagram.findTopLevelGroups().each((g) => {
      if (lane === null) return;
      if (horiz ? (g.column === lane.column) : (g.row === lane.row)) {
        const b = diagram.computePartsBounds(g.memberParts);
        if (b.isEmpty()) return;  // nothing in there?  ignore it
        b.unionPoint(g.location);  // keep any empty space on the left and top
        b.addMargin(margin);  // assume the same node margin applies to all nodes
        if (bounds.isEmpty()) {
          bounds = b;
        } else {
          bounds.unionRect(b);
        }
      }
    });

    // limit the result by the standard value of computeMinSize
    const msz = super.computeMinSize();
    if (bounds.isEmpty()) return msz;
    return new go.Size(Math.max(msz.width, bounds.width), Math.max(msz.height, bounds.height));
  }

  public resize(newr: go.Rect) {
    const diagram = this.diagram;
    if (this.adornedObject === null) return;
    const lane = this.adornedObject.part;
    if (lane === null) return;
    const horiz = (lane.category === 'Column Header');
    const lay = diagram.layout as TableLayout;  // the TableLayout
    if (horiz) {
      const col = lane.column;
      const coldef = lay.getColumnDefinition(col);
      coldef.width = newr.width;
    } else {
      const row = lane.row;
      const rowdef = lay.getRowDefinition(row);
      rowdef.height = newr.height;
    }
    lay.invalidateLayout();
  }
  // end LaneResizingTool class
}



export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  const myDiagram =
    $(go.Diagram, 'myDiagramDiv',
      {
        layout: $(TableLayout,
          $(go.RowColumnDefinition, { row: 1, height: 22 }),  // fixed size column headers
          $(go.RowColumnDefinition, { column: 1, width: 22 }) // fixed size row headers
        ),
        'SelectionMoved': (e: go.DiagramEvent) => { e.diagram.layoutDiagram(true); },
        'resizingTool': new LaneResizingTool(),
        // feedback that dropping in the background is not allowed
        mouseDragOver: (e: go.InputEvent) => { e.diagram.currentCursor = 'not-allowed'; },
        // when dropped in the background, not on a Node or a Group, cancel the drop
        mouseDrop: (e: go.InputEvent) => { e.diagram.currentTool.doCancel(); },
        'animationManager.isInitial': false,
        'undoManager.isEnabled': true
      });

  myDiagram.nodeTemplateMap.add('Header',  // an overall table header, at the top
    $(go.Part, 'Auto',
      {
        row: 0, column: 1, columnSpan: 9999,
        stretch: go.GraphObject.Horizontal,
        selectable: false, pickable: false
      },
      $(go.Shape, { fill: 'transparent', strokeWidth: 0 }),
      $(go.TextBlock, { alignment: go.Spot.Center, font: 'bold 12pt sans-serif' },
        new go.Binding('text'))
    ));

  myDiagram.nodeTemplateMap.add('Sider',  // an overall table header, on the left side
    $(go.Part, 'Auto',
      {
        row: 1, rowSpan: 9999, column: 0,
        stretch: go.GraphObject.Vertical,
        selectable: false, pickable: false
      },
      $(go.Shape, { fill: 'transparent', strokeWidth: 0 }),
      $(go.TextBlock, { alignment: go.Spot.Center, font: 'bold 12pt sans-serif', angle: 270 },
        new go.Binding('text'))
    ));

  myDiagram.nodeTemplateMap.add('Column Header',  // for each column header
    $(go.Part, 'Spot',
      {
        row: 1, rowSpan: 9999, column: 2,
        minSize: new go.Size(100, NaN),
        stretch: go.GraphObject.Fill,
        movable: false,
        resizable: true,
        resizeAdornmentTemplate:
          $(go.Adornment, 'Spot',
            $(go.Placeholder),
            $(go.Shape,  // for changing the length of a lane
              {
                alignment: go.Spot.Right,
                desiredSize: new go.Size(7, 50),
                fill: 'lightblue', stroke: 'dodgerblue',
                cursor: 'col-resize'
              })
          )
      },
      new go.Binding('column', 'col'),
      $(go.Shape, { fill: null },
        new go.Binding('fill', 'color')),
      $(go.Panel, 'Auto',
        { // this is positioned above the Shape, in row 1
          alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom,
          stretch: go.GraphObject.Horizontal,
          height: (myDiagram.layout as TableLayout).getRowDefinition(1).height
        },
        $(go.Shape, { fill: 'transparent', strokeWidth: 0 }),
        $(go.TextBlock,
          {
            font: 'bold 10pt sans-serif', isMultiline: false,
            wrap: go.TextBlock.None, overflow: go.TextBlock.OverflowEllipsis
          },
          new go.Binding('text'))
      )
    ));

  myDiagram.nodeTemplateMap.add('Row Sider',  // for each row header
    $(go.Part, 'Spot',
      {
        row: 2, column: 1, columnSpan: 9999,
        minSize: new go.Size(NaN, 100),
        stretch: go.GraphObject.Fill,
        movable: false,
        resizable: true,
        resizeAdornmentTemplate:
          $(go.Adornment, 'Spot',
            $(go.Placeholder),
            $(go.Shape,  // for changing the breadth of a lane
              {
                alignment: go.Spot.Bottom,
                desiredSize: new go.Size(50, 7),
                fill: 'lightblue', stroke: 'dodgerblue',
                cursor: 'row-resize'
              })
          )
      },
      new go.Binding('row'),
      $(go.Shape, { fill: null },
        new go.Binding('fill', 'color')),
      $(go.Panel, 'Auto',
        { // this is positioned to the left of the Shape, in column 1
          alignment: go.Spot.Left, alignmentFocus: go.Spot.Right,
          stretch: go.GraphObject.Vertical, angle: 270,
          height: (myDiagram.layout as TableLayout).getColumnDefinition(1).width
        },
        $(go.Shape, { fill: 'transparent', strokeWidth: 0 }),
        $(go.TextBlock,
          {
            font: 'bold 10pt sans-serif', isMultiline: false,
            wrap: go.TextBlock.None, overflow: go.TextBlock.OverflowEllipsis
          },
          new go.Binding('text'))
      )
    ));

  myDiagram.nodeTemplate =  // for regular nodes within cells (groups); you'll want to extend this
    $(go.Node, 'Auto',
      { width: 100, height: 50, margin: 4 },  // assume uniform Margin, all around
      new go.Binding('row'),
      new go.Binding('column', 'col'),
      $(go.Shape, { fill: 'white' },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        new go.Binding('text', 'key'))
    );

  myDiagram.groupTemplate =  // for cells
    $(go.Group, 'Auto',
      {
        layerName: 'Background',
        stretch: go.GraphObject.Fill,
        selectable: false,
        computesBoundsAfterDrag: true,
        computesBoundsIncludingLocation: true,
        handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
        mouseDragEnter: (e: go.InputEvent, group: go.GraphObject) => { if (group instanceof go.Group) group.isHighlighted = true; },
        mouseDragLeave: (e: go.InputEvent, group: go.GraphObject) => { if (group instanceof go.Group) group.isHighlighted = false; },
        mouseDrop: (e: go.InputEvent, group: go.GraphObject) => {
          if (!(group instanceof go.Group)) return;
          // if any dropped part wasn't already a member of this group, we'll want to let the group's row
          // column allow themselves to be resized automatically, in case the row height or column width
          // had been set manually by the LaneResizingTool
          const anynew = e.diagram.selection.any((p) => p.containingGroup !== group);
          // Don't allow headers/siders to be dropped
          const anyHeadersSiders = e.diagram.selection.any((p) => {
            return p.category === 'Column Header' || p.category === 'Row Sider';
          });
          if (!anyHeadersSiders && group.addMembers(e.diagram.selection, true)) {
            if (anynew) {
              (e.diagram.layout as TableLayout).getRowDefinition(group.row).height = NaN;
              (e.diagram.layout as TableLayout).getColumnDefinition(group.column).width = NaN;
            }
          } else {  // failure upon trying to add parts to this group
            e.diagram.currentTool.doCancel();
          }
        }
      },
      new go.Binding('row'),
      new go.Binding('column', 'col'),
      // the group is normally unseen -- it is completely transparent except when given a color or when highlighted
      $(go.Shape,
        {
          fill: 'transparent', stroke: 'transparent',
          strokeWidth: (myDiagram.nodeTemplate.margin as go.Margin).left,
          stretch: go.GraphObject.Fill
        },
        new go.Binding('fill', 'color'),
        new go.Binding('stroke', 'isHighlighted', (h) => h ? 'red' : 'transparent').ofObject()),
      $(go.Placeholder,
        { // leave a margin around the member nodes of the group which is the same as the member node margin
          alignment: ((m: go.Margin) => new go.Spot(0, 0, m.top, m.left))(myDiagram.nodeTemplate.margin as go.Margin),
          padding: ((m: go.Margin) => new go.Margin(0, m.right, m.bottom, 0))(myDiagram.nodeTemplate.margin as go.Margin)
        })
    );

  myDiagram.model = new go.GraphLinksModel([
    // headers
    { key: 'Header', text: 'Vacation Procedures', category: 'Header' },
    { key: 'Sider', text: 'Personnel', category: 'Sider' },
    // column and row headers
    { key: 'Request', text: 'Request', col: 2, category: 'Column Header' },
    { key: 'Approval', text: 'Approval', col: 3, category: 'Column Header' },
    { key: 'Employee', text: 'Employee', row: 2, category: 'Row Sider' },
    { key: 'Manager', text: 'Manager', row: 3, category: 'Row Sider' },
    { key: 'Administrator', text: 'Administrator', row: 4, category: 'Row Sider' },
    // cells, each a group assigned to a row and column
    { key: 'EmpReq', row: 2, col: 2, isGroup: true, color: 'lightyellow' },
    { key: 'EmpApp', row: 2, col: 3, isGroup: true, color: 'lightgreen' },
    { key: 'ManReq', row: 3, col: 2, isGroup: true, color: 'lightgreen' },
    { key: 'ManApp', row: 3, col: 3, isGroup: true, color: 'lightyellow' },
    { key: 'AdmReq', row: 4, col: 2, isGroup: true, color: 'lightyellow' },
    { key: 'AdmApp', row: 4, col: 3, isGroup: true, color: 'lightgreen' },
    // nodes, each assigned to a group/cell
    { key: 'Delta', color: 'orange', size: '100 100', group: 'EmpReq' },
    { key: 'Epsilon', color: 'coral', size: '100 50', group: 'EmpReq' },
    { key: 'Zeta', color: 'tomato', size: '50 70', group: 'ManReq' },
    { key: 'Eta', color: 'coral', size: '50 50', group: 'ManApp' },
    { key: 'Theta', color: 'tomato', size: '100 50', group: 'AdmApp' }
  ]);

  const myPalette =
    $(go.Palette, 'myPaletteDiv',
      {
        nodeTemplateMap: myDiagram.nodeTemplateMap,
        'model.nodeDataArray': [
          { key: 'Alpha', color: 'orange' },
          { key: 'Beta', color: 'tomato' },
          { key: 'Gamma', color: 'goldenrod' }
        ]
      });
}
