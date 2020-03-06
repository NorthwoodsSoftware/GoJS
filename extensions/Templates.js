"use strict";
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// These are the definitions for all of the predefined templates and tool archetypes.
// You do not need to load this file in order to use the default templates and archetypes.

// Although we have tried to provide definitions here that are faithful to how they
// are actually implemented, there may be some differences from what is in the library.

// Caution: these may change in a future version.

// Set up the default templates that each Diagram starts off with.
function setupDiagramTemplates(diagram /* : go.Diagram */) {
  // Node Templates
  var nodeTemplateMap = new go.Map(/*'string', go.Part*/);

  // create the default Node template
  var archnode = new go.Node();
  var nodet = new go.TextBlock();
  nodet.bind(new go.Binding('text', '', go.Binding.toString));
  archnode.add(nodet);
  nodeTemplateMap.add('', archnode);

  // create the default Comment Node template
  var archcmnt = new go.Node();
  var nodec = new go.TextBlock();
  nodec.stroke = 'brown';
  nodec.bind(new go.Binding('text', '', go.Binding.toString));
  archcmnt.add(nodec);
  nodeTemplateMap.add('Comment', archcmnt);

  // create the default Link Label Node template
  var archllab = new go.Node();
  archllab.selectable = false;
  archllab.avoidable = false;
  var nodel = new go.Shape();
  nodel.figure = 'Ellipse';
  nodel.fill = 'black';
  nodel.stroke = null;
  nodel.desiredSize = new go.Size(3, 3);
  archllab.add(nodel);
  nodeTemplateMap.add('LinkLabel', archllab);

  diagram.nodeTemplateMap = nodeTemplateMap;

  // Group Templates
  var groupTemplateMap = new go.Map(/*'string', go.Group*/);

  // create the default Group template
  var archgrp = new go.Group();
  archgrp.selectionObjectName = 'GROUPPANEL';
  archgrp.type = go.Panel.Vertical;
  var grpt = new go.TextBlock();
  grpt.font = 'bold 12pt sans-serif';
  grpt.bind(new go.Binding('text', '', go.Binding.toString));
  archgrp.add(grpt);
  var grppan = new go.Panel(go.Panel.Auto);
  grppan.name = 'GROUPPANEL';
  var grpbord = new go.Shape();
  grpbord.figure = 'Rectangle';
  grpbord.fill = 'rgba(128,128,128,0.2)';
  grpbord.stroke = 'black';
  grppan.add(grpbord);
  var phold = new go.Placeholder();
  phold.padding = new go.Margin(5, 5, 5, 5);
  grppan.add(phold);
  archgrp.add(grppan);
  groupTemplateMap.add('', archgrp);

  diagram.groupTemplateMap = groupTemplateMap;

  // Link Templates
  var linkTemplateMap = new go.Map(/*'string', go.Link*/);

  // create the default Link template
  var archlink = new go.Link();
  var archpath = new go.Shape();
  archpath.isPanelMain = true;
  archlink.add(archpath);
  var archarrow = new go.Shape();
  archarrow.toArrow = 'Standard';
  archarrow.fill = 'black';
  archarrow.stroke = null;
  archarrow.strokeWidth = 0;
  archlink.add(archarrow);
  linkTemplateMap.add('', archlink);

  // create the default Comment Link template
  var archcmntlink = new go.Link();
  var archcmntpath = new go.Shape();
  archcmntpath.isPanelMain = true;
  archcmntpath.stroke = 'brown';
  archcmntlink.add(archcmntpath);
  linkTemplateMap.add('Comment', archcmntlink);

  diagram.linkTemplateMap = linkTemplateMap;
}


// Set up the default Panel.itemTemplate.
function setupDefaultItemTemplate(panel /* : go.Panel */) {
  var architem = new go.Panel();
  var itemtxt = new go.TextBlock();
  itemtxt.bind(new go.Binding('text', '', go.Binding.toString));
  architem.add(itemtxt);
  panel.itemTemplate = architem;
}


// Set up the diagram's selection Adornments
function setupSelectionAdornments(diagram /* : go.Diagram */) {
  // create the default Adornment for selection
  var selad = new go.Adornment();
  selad.type = go.Panel.Auto;
  var seladhandle = new go.Shape();
  seladhandle.fill = null;
  seladhandle.stroke = 'dodgerblue';
  seladhandle.strokeWidth = 3;
  selad.add(seladhandle);
  var selplace = new go.Placeholder();
  selplace.margin = new go.Margin(1.5, 1.5, 1.5, 1.5);
  selad.add(selplace);
  diagram.nodeSelectionAdornmentTemplate = selad;

  // reuse the default Node Adornment for selection
  diagram.groupSelectionAdornmentTemplate = selad;

  // create the default Link Adornment for selection
  selad = new go.Adornment();
  selad.type = go.Panel.Link;
  seladhandle = new go.Shape();
  seladhandle.isPanelMain = true;
  seladhandle.fill = null;
  seladhandle.stroke = 'dodgerblue';
  seladhandle.strokeWidth = 3;  //?? zero to use selection object's strokeWidth is often not wide enough
  selad.add(seladhandle);
  diagram.linkSelectionAdornmentTemplate = selad;
}


// Set up the background Grid Panel.
function setupDefaultBackgroundGrid(diagram /* : go.Diagram */) {
  var grid = new go.Panel(go.Panel.Grid);
  grid.name = 'GRID';

  var hlines = new go.Shape();
  hlines.figure = 'LineH';
  hlines.stroke = 'lightgray';
  hlines.strokeWidth = 0.5;
  hlines.interval = 1;
  grid.add(hlines);

  hlines = new go.Shape();
  hlines.figure = 'LineH';
  hlines.stroke = 'gray';
  hlines.strokeWidth = 0.5;
  hlines.interval = 5;
  grid.add(hlines);

  hlines = new go.Shape();
  hlines.figure = 'LineH';
  hlines.stroke = 'gray';
  hlines.strokeWidth = 1;
  hlines.interval = 10;
  grid.add(hlines);

  var vlines = new go.Shape();
  vlines.figure = 'LineV';
  vlines.stroke = 'lightgray';
  vlines.strokeWidth = 0.5;
  vlines.interval = 1;
  grid.add(vlines);

  vlines = new go.Shape();
  vlines.figure = 'LineV';
  vlines.stroke = 'gray';
  vlines.strokeWidth = 0.5;
  vlines.interval = 5;
  grid.add(vlines);

  vlines = new go.Shape();
  vlines.figure = 'LineV';
  vlines.stroke = 'gray';
  vlines.strokeWidth = 1;
  vlines.interval = 10;
  grid.add(vlines);

  grid.visible = false;  // by default the grid is not visible

  // Create the Part that holds the grid.
  //var gridpart = new go.Part();
  //gridpart.add(grid);
  //gridpart.layerName = 'Grid';  // goes in the "Grid" layer
  //gridpart.zOrder = 0;  // to make it easier for other background parts to be behind the grid
  //gridpart.isInDocumentBounds = false;  // never part of the document bounds
  //gridpart.isAnimated = false;  // not animated
  //gridpart.pickable = false;  // user cannot pick it with mouse/touch/stylus
  //gridpart.locationObjectName = 'GRID';
  //diagram.add(gridpart);
  // So then: diagram.grid === grid

  // BUT, the gridpart is not actually in the Diagram.parts collection,
  // and that Part cannot be replaced; so the above code is commented out.
  // Instead, this works in an existing GoJS environment:
  diagram.grid = grid;
}


// Set up the "viewport" box part that is the initial value of Overview.box.
function setupOverviewBox(overview /* : go.Overview */) {
  var box = new go.Part();
  var s = new go.Shape();
  s.stroke = 'magenta';
  s.strokeWidth = 2;
  s.fill = 'transparent';
  s.name = 'BOXSHAPE';
  box.selectable = true;
  box.selectionObjectName = 'BOXSHAPE';
  box.locationObjectName = 'BOXSHAPE';
  //box.resizable = true;
  box.resizeObjectName = 'BOXSHAPE';
  box.cursor = 'move';
  box.add(s);

  // only resize the bottom-right corner
  var ad = new go.Adornment();
  ad.type = go.Panel.Spot;
  ad.locationSpot = go.Spot.Center;
  var ph = new go.Placeholder();
  ph.isPanelMain = true;
  ad.add(ph);
  var hnd = new go.Shape();
  hnd.alignmentFocus = go.Spot.Center;
  hnd.figure = 'Rectangle';
  hnd.desiredSize = new go.Size(64, 64);
  hnd.cursor = 'se-resize';
  hnd.alignment = go.Spot.BottomRight;
  ad.add(hnd);
  box.resizeAdornmentTemplate = ad;

  overview.box = box;
}


// Set up LinkingBaseTool's default temporary nodes and link.
function setupLinkingToolTemporaryNodesAndLink(tool /* : go.LinkingBaseTool */) {
  // LinkingTool.temporaryLink
  var link = new go.Link();
  var path = new go.Shape();
  path.isPanelMain = true;
  path.stroke = 'blue';
  link.add(path);
  var arrow = new go.Shape();
  arrow.toArrow = 'Standard';
  arrow.fill = 'blue';
  arrow.stroke = 'blue';
  link.add(arrow);
  link.layerName = 'Tool';

  tool.temporaryLink = link;

  // LinkingTool.temporaryFromNode and .temporaryFromPort
  var fromNode = new go.Node();
  var fromPort = new go.Shape();
  fromPort.portId = '';
  fromPort.figure = 'Rectangle';
  fromPort.fill = null;
  fromPort.stroke = 'magenta';
  fromPort.strokeWidth = 2;
  fromPort.desiredSize = new go.Size(1, 1);
  fromNode.add(fromPort);
  fromNode.selectable = false;
  fromNode.layerName = 'Tool';

  tool.temporaryFromNode = fromNode;
  tool.temporaryFromPort = fromPort;

  // LinkingTool.temporaryToNode and .temporaryToPort
  var toNode = new go.Node();
  var toPort = new go.Shape();
  toPort.portId = '';
  toPort.figure = 'Rectangle';
  toPort.fill = null;
  toPort.stroke = 'magenta';
  toPort.strokeWidth = 2;
  toPort.desiredSize = new go.Size(1, 1);
  toNode.add(toPort);
  toNode.selectable = false;
  toNode.layerName = 'Tool';

  tool.temporaryToNode = toNode;
  tool.temporaryToPort = toPort;
}


// Set up RelinkingTool's default handle archetypes
function setupRelinkingToolHandles(tool /* : go.RelinkingTool */) {
  var h = new go.Shape();
  h.figure = 'Diamond';
  h.desiredSize = new go.Size(8, 8);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';
  h.cursor = 'pointer';
  h.segmentIndex = 0;

  tool.fromHandleArchetype = h;

  h = new go.Shape();
  h.figure = 'Diamond';
  h.desiredSize = new go.Size(8, 8);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';
  h.cursor = 'pointer';
  h.segmentIndex = -1;

  tool.toHandleArchetype = h;
}


// Set up LinkReshapingTool's default handle archetypes
function setupLinkReshapingToolHandles(tool /* : go.LinkReshapingTool */) {
  var h = new go.Shape();
  h.figure = 'Rectangle';
  h.desiredSize = new go.Size(6, 6);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';

  tool.handleArchetype = h;

  h = new go.Shape();
  h.figure = 'Diamond';
  h.desiredSize = new go.Size(8, 8);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';
  h.cursor = 'move';

  tool.midHandleArchetype = h;
}


// Set up ResizingTool's default handle archetype
function setupResizingToolHandles(tool /* : go.ResizingTool */) {
  var h = new go.Shape();
  h.alignmentFocus = go.Spot.Center;
  h.figure = 'Rectangle';
  h.desiredSize = new go.Size(6, 6);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';
  h.strokeWidth = 1;
  h.cursor = 'pointer';

  tool.handleArchetype = h;
}


// Set up RotatingTool's default handle archetype
function setupRotatingToolHandles(tool /* : go.RotatingTool */) {
  var h = new go.Shape();
  h.figure = 'Ellipse';
  h.desiredSize = new go.Size(8, 8);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';
  h.strokeWidth = 1;
  h.cursor = 'pointer';

  tool.handleArchetype = h;
}


// Set up DragSelectingTool's default box
function setupDragSelectingToolBox(tool /* : go.DragSelectingTool */) {
  var b = new go.Part();
  b.layerName = 'Tool';
  b.selectable = false;
  var r = new go.Shape();
  r.name = 'SHAPE';
  r.figure = 'Rectangle';
  r.fill = null;
  r.stroke = 'magenta';
  b.add(r);

  tool.box = b;
}
