/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
*  This index demonstrates building a maximal library from source.
*  There is a minimal example in the same directory
*/

/* tslint:disable:ordered-imports */
import { EnumValue } from '../../srcTS/enumValue';
import { Map, Set, List, EmptyIterator } from '../../srcTS/collections';
import { Point } from '../../srcTS/point';
import { Size } from '../../srcTS/size';
import { Rect } from '../../srcTS/rect';
import { Margin } from '../../srcTS/margin';
import { Spot } from '../../srcTS/spot';
import { PathSegment, PathFigure, Geometry } from '../../srcTS/geometry';
import { DiagramEvent, InputEvent } from '../../srcTS/inputEvent';
import { ChangedEvent } from '../../srcTS/changedEvent';
import { Binding, Model } from '../../srcTS/model';
import { UndoManager, Transaction } from '../../srcTS/undoManager';
import { Tool } from '../../srcTS/tool';
import { ToolManager } from '../../srcTS/toolManager';
import { AnimationManager } from '../../srcTS/animationManager';
import { Layer } from '../../srcTS/layer';
import { Diagram, DraggingInfo } from '../../srcTS/diagram';
import { Palette } from '../../srcTS/palette';
import { Overview } from '../../srcTS/overview';
import { Brush } from '../../srcTS/brush';
import { GraphObject } from '../../srcTS/graphObject';
import { Panel } from '../../srcTS/panel';
import { RowColumnDefinition } from '../../srcTS/rowColumnDefinition';
import { Shape } from '../../srcTS/shape';
import { TextBlock, TextBlockMetrics } from '../../srcTS/textBlock';
import { Picture } from '../../srcTS/picture';
import { Adornment, Part } from '../../srcTS/parts';
import { Node } from '../../srcTS/parts';
import { Link } from '../../srcTS/parts';
import { Group, Placeholder } from '../../srcTS/parts';
import { LayoutEdge, LayoutVertex, LayoutNetwork, Layout } from '../../srcTS/layout';
import { root } from '../../srcTS/root';
import { HTMLInfo } from '../../srcTS/htmlInfo';

// The following are optional to building:
import { SVGSurface } from '../../srcTS/svgContext';

import { CommandHandler } from '../../srcTS/commandHandler';
import { DraggingTool } from '../../srcTS/draggingTool';
import { RelinkingTool, LinkingTool, LinkingBaseTool } from '../../srcTS/linkingTools';
import { LinkReshapingTool } from '../../srcTS/linkReshapingTool';
import { ResizingTool } from '../../srcTS/resizingTool';
import { RotatingTool } from '../../srcTS/rotatingTool';
import { PanningTool, DragSelectingTool, ClickCreatingTool, ActionTool, ClickSelectingTool } from '../../srcTS/selectingTools';
import { TextEditingTool } from '../../srcTS/textEditingTool';
import { ContextMenuTool } from '../../srcTS/contextMenuTool';

import { GraphLinksModel } from '../../srcTS/graphLinksModel';
import { GraphLinksPartManager } from '../../srcTS/graphLinksPartManager';
import { TreeModel } from '../../srcTS/treeModel';
import { TreePartManager } from '../../srcTS/treePartManager';

import { GridLayout } from '../../srcTS/gridLayout';
import { CircularEdge, CircularVertex, CircularNetwork, CircularLayout } from '../../srcTS/circularLayout';
import { ForceDirectedEdge, ForceDirectedVertex, ForceDirectedNetwork, ForceDirectedLayout } from '../../srcTS/forceDirectedLayout';
import { LayeredDigraphEdge, LayeredDigraphVertex, LayeredDigraphNetwork, LayeredDigraphLayout } from '../../srcTS/layeredDigraphLayout';
import { TreeEdge, TreeVertex, TreeNetwork, TreeLayout } from '../../srcTS/treeLayout';

import { PanelLayoutPosition } from '../../srcTS/panelLayoutPosition';
import { PanelLayoutHorizontal } from '../../srcTS/panelLayoutHorizontal';
import { PanelLayoutVertical } from '../../srcTS/panelLayoutVertical';
import { PanelLayoutSpot } from '../../srcTS/panelLayoutSpot';
import { PanelLayoutAuto } from '../../srcTS/panelLayoutAuto';
import { PanelLayoutTable, PanelLayoutTableRow, PanelLayoutTableColumn } from '../../srcTS/panelLayoutTable';
import { PanelLayoutViewbox } from '../../srcTS/panelLayoutViewbox';
import { PanelLayoutLink } from '../../srcTS/panelLayoutLink';
import { PanelLayoutGrid } from '../../srcTS/panelLayoutGrid';
import { PanelLayoutGraduated } from '../../srcTS/panelLayoutGraduated';

/**
 * @suppress {duplicate}
 * @this {ToolManager}
 */
ToolManager.prototype.initializeStandardTools = function(this: ToolManager): void {
  // For each of these lists, the tools need to be assigned in a specific order,
  // so that they are added to the list in the correct order.

  // mouse-down tools:
  this._replaceStandardTool('Action', new ActionTool(), this.mouseDownTools);
  this._replaceStandardTool('Relinking', new RelinkingTool(), this.mouseDownTools);
  this._replaceStandardTool('LinkReshaping', new LinkReshapingTool(), this.mouseDownTools);
  this._replaceStandardTool('Resizing', new ResizingTool(), this.mouseDownTools);
  this._replaceStandardTool('Rotating', new RotatingTool(), this.mouseDownTools);

  // mouse-move tools:
  this._replaceStandardTool('Linking', new LinkingTool(), this.mouseMoveTools);
  this._replaceStandardTool('Dragging', new DraggingTool(), this.mouseMoveTools);
  this._replaceStandardTool('DragSelecting', new DragSelectingTool(), this.mouseMoveTools);
  this._replaceStandardTool('Panning', new PanningTool(), this.mouseMoveTools);

  // mouse-up tools:
  this._replaceStandardTool('ContextMenu', new ContextMenuTool(), this.mouseUpTools);
  this._replaceStandardTool('TextEditing', new TextEditingTool(), this.mouseUpTools);
  this._replaceStandardTool('ClickCreating', new ClickCreatingTool(), this.mouseUpTools);
  this._replaceStandardTool('ClickSelecting', new ClickSelectingTool(), this.mouseUpTools);
};

Panel.definePanelLayout('Position', new PanelLayoutPosition());
Panel.definePanelLayout('Horizontal', new PanelLayoutHorizontal());
Panel.definePanelLayout('Vertical', new PanelLayoutVertical());
Panel.definePanelLayout('Spot', new PanelLayoutSpot());
Panel.definePanelLayout('Auto', new PanelLayoutAuto());
Panel.definePanelLayout('Table', new PanelLayoutTable());
Panel.definePanelLayout('Viewbox', new PanelLayoutViewbox());
Panel.definePanelLayout('TableRow', new PanelLayoutTableRow());
Panel.definePanelLayout('TableColumn', new PanelLayoutTableColumn());
Panel.definePanelLayout('Link', new PanelLayoutLink());
Panel.definePanelLayout('Grid', new PanelLayoutGrid());
Panel.definePanelLayout('Graduated', new PanelLayoutGraduated());

Diagram.addPartManager(GraphLinksModel.type, GraphLinksPartManager);
Diagram.addPartManager(TreeModel.type, TreePartManager);


export const go = {
  get licenseKey() {
    return Diagram.licenseKey;
  },
  set licenseKey (licx) {
    Diagram.licenseKey = licx;
  },
  get version() {
    return Diagram.version;
  },

  'Group': Group,
  'EnumValue': EnumValue,
  'List': List,
  'Set': Set,
  'Map': Map,
  'Point': Point,
  'Size': Size,
  'Rect': Rect,
  'Margin': Margin,
  'Spot': Spot,
  'Geometry': Geometry,
  'PathFigure': PathFigure,
  'PathSegment': PathSegment,
  'InputEvent': InputEvent,
  'DiagramEvent': DiagramEvent,
  'ChangedEvent': ChangedEvent,
  'Model': Model,
  'Binding': Binding,
  'Transaction': Transaction,
  'UndoManager': UndoManager,
  'Tool': Tool,
  'ToolManager': ToolManager,
  'AnimationManager': AnimationManager,
  'Layer': Layer,
  'Diagram': Diagram,
  'Brush': Brush,
  'GraphObject': GraphObject,
  'Panel': Panel,
  'RowColumnDefinition': RowColumnDefinition,
  'Shape': Shape,
  'TextBlock': TextBlock,
  'TextBlockMetrics': TextBlockMetrics,
  'Picture': Picture,
  'Part': Part,
  'Adornment': Adornment,
  'Node': Node,
  'Link': Link,
  'Placeholder': Placeholder,
  'Layout': Layout,
  'LayoutNetwork': LayoutNetwork,
  'LayoutVertex': LayoutVertex,
  'LayoutEdge': LayoutEdge,

  // optional:
  'DraggingTool': DraggingTool,
  'DraggingInfo': DraggingInfo,
  'LinkingBaseTool': LinkingBaseTool,
  'LinkingTool': LinkingTool,
  'RelinkingTool': RelinkingTool,
  'LinkReshapingTool': LinkReshapingTool,
  'ResizingTool': ResizingTool,
  'RotatingTool': RotatingTool,
  'ClickSelectingTool': ClickSelectingTool,
  'ActionTool': ActionTool,
  'ClickCreatingTool': ClickCreatingTool,
  'HTMLInfo': HTMLInfo,
  'ContextMenuTool': ContextMenuTool,
  'DragSelectingTool': DragSelectingTool,
  'PanningTool': PanningTool,
  'TextEditingTool': TextEditingTool,

  'GraphLinksModel': GraphLinksModel,
  'TreeModel': TreeModel,
  'CommandHandler': CommandHandler,
  'Palette': Palette,
  'Overview': Overview,
  'GridLayout': GridLayout,
  'CircularLayout': CircularLayout,
  'CircularNetwork': CircularNetwork,
  'CircularVertex': CircularVertex,
  'CircularEdge': CircularEdge,
  'ForceDirectedLayout': ForceDirectedLayout,
  'ForceDirectedNetwork': ForceDirectedNetwork,
  'ForceDirectedVertex': ForceDirectedVertex,
  'ForceDirectedEdge': ForceDirectedEdge,
  'LayeredDigraphLayout': LayeredDigraphLayout,
  'LayeredDigraphNetwork': LayeredDigraphNetwork,
  'LayeredDigraphVertex': LayeredDigraphVertex,
  'LayeredDigraphEdge': LayeredDigraphEdge,
  'TreeLayout': TreeLayout,
  'TreeNetwork': TreeNetwork,
  'TreeVertex': TreeVertex,
  'TreeEdge': TreeEdge
};
