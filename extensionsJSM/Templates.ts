/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */

// These are the definitions for all of the predefined templates and tool archetypes.
// You do not need to load this file in order to use the default templates and archetypes.

// Although we have tried to provide definitions here that are faithful to how they
// are actually implemented, there may be some differences from what is in the library.

// Caution: these may change in a future version.

import * as go from 'gojs';

// Set up the default templates that each Diagram starts off with.
export function setupDiagramTemplates(diagram: go.Diagram) {
  // Node Templates
  const nodeTemplateMap: go.Map<string, go.Part> = new go.Map<'string', go.Part>();

  // create the default Node template
  nodeTemplateMap.add(
    '',
    new go.Node().add(
      new go.TextBlock({ stroke: 'black', font: '10pt sans-serif' })
        .bind('text', '', go.Binding.toString)
        .theme('stroke', 'text')
        .theme('font', 'normal')
    )
  );

  // create the default Comment Node template
  nodeTemplateMap.add(
    'Comment',
    new go.Node().add(
      new go.TextBlock({ stroke: 'brown', font: '10pt sans-serif' })
        .bind('text', '', go.Binding.toString)
        .theme('stroke', 'comment')
        .theme('font', 'normal')
    )
  );

  // create the default Link Label Node template
  nodeTemplateMap.add(
    'LinkLabel',
    new go.Node({ selectable: false, avoidable: false }).add(
      new go.Shape('Ellipse', {
        fill: 'black',
        stroke: null,
        desiredSize: new go.Size(3, 3)
      }).theme('fill', 'link')
    )
  );

  diagram.nodeTemplateMap = nodeTemplateMap as any;

  // Group Templates
  const groupTemplateMap = new go.Map<string, go.Group>();

  // create the default Group template
  groupTemplateMap.add(
    '',
    new go.Group(go.Panel.Vertical, { selectionObjectName: 'GROUPPANEL' }).add(
      new go.TextBlock({ stroke: 'black', font: 'bold 12pt sans-serif' })
        .bind('text', '', go.Binding.toString)
        .theme('stroke', 'text')
        .theme('font', 'bold'),
      new go.Panel(go.Panel.Auto, { name: 'GROUPPPANEL' }).add(
        new go.Shape({ fill: 'rgba(128,128,128,0.2)', stroke: 'black', strokeWidth: 1 })
          .theme('fill', 'group')
          .theme('stroke', 'outline')
          .theme('strokeWidth', 'group'),
        new go.Placeholder({ padding: 5 }).theme('padding', 'group')
      )
    )
  );

  diagram.groupTemplateMap = groupTemplateMap as any;

  // Link Templates
  const linkTemplateMap = new go.Map<string, go.Link>();

  // create the default Link template
  linkTemplateMap.add(
    '',
    new go.Link().add(
      new go.Shape({ isPanelMain: true, stroke: 'black' }).theme('stroke', 'link'),
      new go.Shape({ toArrow: 'Standard', fill: 'black', stroke: null, strokeWidth: 0 })
        .theme('toArrow')
        .theme('fill', 'link')
    )
  );

  // create the default Comment Link template
  linkTemplateMap.add(
    'Comment',
    new go.Link().add(
      new go.Shape({ isPanelMain: true, stroke: 'brown' }).theme('stroke', 'comment')
    )
  );

  diagram.linkTemplateMap = linkTemplateMap as any;
}

// Set up the default Panel.itemTemplate.
export function setupDefaultItemTemplate(panel: go.Panel) {
  panel.itemTemplate = new go.Panel().add(
    new go.TextBlock().bind('text', '', go.Binding.toString).theme('stroke', 'text')
  );
}

// Set up the diagram's selection Adornments
export function setupSelectionAdornments(diagram: go.Diagram) {
  // create the default Adornment for selection
  diagram.nodeSelectionAdornmentTemplate = new go.Adornment(go.Panel.Auto).add(
    new go.Shape({ fill: null, stroke: 'dodgerblue', strokeWidth: 3 })
      .theme('stroke', 'selection')
      .theme('strokeWidth', 'selection'),
    new go.Placeholder({ margin: 1.5 }).theme('margin', 'numbers.selection', '', null, (sw) =>
      sw ? new go.Margin(sw / 2) : 1.5
    )
  );

  // reuse the default Node Adornment for selection
  diagram.groupSelectionAdornmentTemplate = diagram.nodeSelectionAdornmentTemplate;

  // create the default Link Adornment for selection
  diagram.linkSelectionAdornmentTemplate = new go.Adornment(go.Panel.Link).add(
    new go.Shape({ isPanelMain: true, fill: null, stroke: 'dodgerblue', strokeWidth: 3 })
      .theme('stroke', 'selection')
      .theme('strokeWidth', 'selection')
  );
}

// Set up the background Grid Panel.
export function setupDefaultBackgroundGrid(diagram: go.Diagram) {
  const grid = new go.Panel(go.Panel.Grid, { name: 'GRID' }).add(
    new go.Shape('LineH', { stroke: 'lightgray', strokeWidth: 0.5, interval: 1 }).theme(
      'stroke',
      'gridMinor'
    ),
    new go.Shape('LineV', { stroke: 'lightgray', strokeWidth: 0.5, interval: 1 }).theme(
      'stroke',
      'gridMinor'
    ),
    new go.Shape('LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 5 }).theme(
      'stroke',
      'gridMajor'
    ),
    new go.Shape('LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 5 }).theme(
      'stroke',
      'gridMajor'
    ),
    new go.Shape('LineH', { stroke: 'gray', strokeWidth: 1, interval: 10 }).theme(
      'stroke',
      'gridMajor'
    ),
    new go.Shape('LineV', { stroke: 'gray', strokeWidth: 1, interval: 10 }).theme(
      'stroke',
      'gridMajor'
    )
  );

  grid.visible = false; // by default the grid is not visible

  // Create the Part that holds the grid.
  // const gridpart =
  //   new go.Part({
  //       layerName: 'Grid',  // goes in the "Grid" layer
  //       zOrder: 0,  // to make it easier for other background parts to be behind the grid
  //       isInDocumentBounds: false,  // never part of the document bounds
  //       isAnimated: false,  // not animated
  //       pickable: false,  // user cannot pick it with mouse/touch/stylus
  //       locationObjectName: 'GRID'
  //     })
  //     .add(grid);
  // diagram.add(gridpart);
  // So then: diagram.grid === grid

  // BUT, the gridpart is not actually in the Diagram.parts collection,
  // and that Part cannot be replaced; so the above code is commented out.
  // Instead, this works in an existing GoJS environment:
  diagram.grid = grid;
}

// Set up the "viewport" box part that is the initial value of Overview.box.
export function setupOverviewBox(overview: go.Overview) {
  overview.box = new go.Part({
    selectable: true,
    selectionAdorned: false,
    selectionObjectName: 'BOXSHAPE',
    locationObjectName: 'BOXSHAPE',
    resizeObjectName: 'BOXSHAPE',
    cursor: 'move'
  }).add(
    new go.Shape({
      name: 'BOXSHAPE',
      fill: 'transparent',
      stroke: 'magenta',
      strokeWidth: 2
    }).theme('stroke', 'overviewBox')
  );
}

// Set up LinkingBaseTool's default temporary nodes and link.
export function setupLinkingToolTemporaryNodesAndLink(tool: go.LinkingBaseTool) {
  // LinkingTool.temporaryLink
  tool.temporaryLink = new go.Link({ layerName: 'Tool' }).add(
    new go.Shape({ isPanelMain: true, stroke: 'blue' }).theme('stroke', 'tempLink'),
    new go.Shape({ toArrow: 'Standard', fill: 'blue', stroke: 'blue' })
      .theme('fill', 'tempLink')
      .theme('stroke', 'tempLink')
  );

  // LinkingTool.temporaryFromNode and .temporaryFromPort
  tool.temporaryFromPort = new go.Shape('Rectangle', {
    portId: '',
    fill: null,
    stroke: 'magenta',
    strokeWidth: 2,
    desiredSize: new go.Size(1, 1)
  }).theme('stroke', 'tempPort');
  tool.temporaryFromNode = new go.Node({ selectable: false, layerName: 'Tool' }).add(
    tool.temporaryFromPort
  );

  // LinkingTool.temporaryToNode and .temporaryToPort
  tool.temporaryToPort = new go.Shape('Rectangle', {
    portId: '',
    fill: null,
    stroke: 'magenta',
    strokeWidth: 2,
    desiredSize: new go.Size(1, 1)
  }).theme('stroke', 'tempPort');
  tool.temporaryToNode = new go.Node({ selectable: false, layerName: 'Tool' }).add(
    tool.temporaryToPort
  );
}

// Set up RelinkingTool's default handle archetypes
export function setupRelinkingToolHandles(tool: go.RelinkingTool) {
  tool.fromHandleArchetype = new go.Shape('Diamond', {
    desiredSize: new go.Size(8, 8),
    fill: 'lightblue',
    stroke: 'dodgerblue',
    cursor: tool.linkingCursor,
    segmentIndex: 0
  })
    .theme('fill', 'adornmentFill')
    .theme('stroke', 'adornmentStroke');

  tool.toHandleArchetype = new go.Shape('Diamond', {
    desiredSize: new go.Size(8, 8),
    fill: 'lightblue',
    stroke: 'dodgerblue',
    cursor: tool.linkingCursor,
    segmentIndex: -1
  })
    .theme('fill', 'adornmentFill')
    .theme('stroke', 'adornmentStroke');
}

// Set up LinkReshapingTool's default handle archetypes
export function setupLinkReshapingToolHandles(tool: go.LinkReshapingTool) {
  tool.handleArchetype = new go.Shape('Rectangle', {
    desiredSize: new go.Size(6, 6),
    fill: 'lightblue',
    stroke: 'dodgerblue'
  })
    .theme('fill', 'adornmentFill')
    .theme('stroke', 'adornmentStroke');

  tool.midHandleArchetype = new go.Shape('Diamond', {
    desiredSize: new go.Size(8, 8),
    fill: 'lightblue',
    stroke: 'dodgerblue',
    cursor: 'move'
  })
    .theme('fill', 'adornmentFill')
    .theme('stroke', 'adornmentStroke');
}

// Set up ResizingTool's default handle archetype
export function setupResizingToolHandles(tool: go.ResizingTool) {
  tool.handleArchetype = new go.Shape('Rectangle', {
    alignmentFocus: go.Spot.Center,
    desiredSize: new go.Size(6, 6),
    fill: 'lightblue',
    stroke: 'dodgerblue',
    strokeWidth: 1,
    cursor: 'pointer'
  })
    .theme('fill', 'adornmentFill')
    .theme('stroke', 'adornmentStroke');
}

// Set up RotatingTool's default handle archetype
export function setupRotatingToolHandles(tool: go.RotatingTool) {
  tool.handleArchetype = new go.Shape('Ellipse', {
    desiredSize: new go.Size(8, 8),
    fill: 'lightblue',
    stroke: 'dodgerblue',
    strokeWidth: 1,
    cursor: 'pointer'
  })
    .theme('fill', 'adornmentFill')
    .theme('stroke', 'adornmentStroke');
}

// Set up DragSelectingTool's default box
export function setupDragSelectingToolBox(tool: go.DragSelectingTool) {
  tool.box = new go.Part({ layerName: 'Tool', selectable: false }).add(
    new go.Shape('Rectangle', { name: 'SHAPE', fill: null, stroke: 'magenta' }).theme(
      'stroke',
      'dragSelect'
    )
  );
}
