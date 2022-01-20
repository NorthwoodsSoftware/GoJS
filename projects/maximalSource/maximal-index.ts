/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
*  This index demonstrates building a maximal library from source.
*  There is a minimal example in the same directory
*/

/* tslint:disable:ordered-imports */
import { EnumValue } from '../../srcTS/enumValue';
import { Map, Set, List } from '../../srcTS/collections';
import { Point } from '../../srcTS/point';
import { Size } from '../../srcTS/size';
import { Rect } from '../../srcTS/rect';
import { Margin } from '../../srcTS/margin';
import { Spot } from '../../srcTS/spot';
import { PathSegment, PathFigure, Geometry } from '../../srcTS/geometry';
import { DiagramEvent, InputEvent } from '../../srcTS/inputEvent';
import { ChangedEvent } from '../../srcTS/changedEvent';
import { Binding, Model } from '../../srcTS/model';
import { GraphLinksModel } from '../../srcTS/graphLinksModel';
import { TreeModel } from '../../srcTS/treeModel';
import { UndoManager, Transaction } from '../../srcTS/undoManager';
import { CommandHandler } from '../../srcTS/commandHandler';
import { Tool } from '../../srcTS/tool';
import { DraggingTool } from '../../srcTS/draggingTool';
import { RelinkingTool, LinkingTool, LinkingBaseTool } from '../../srcTS/linkingTools';
import { LinkReshapingTool } from '../../srcTS/linkReshapingTool';
import { ResizingTool } from '../../srcTS/resizingTool';
import { RotatingTool } from '../../srcTS/rotatingTool';
import { PanningTool, DragSelectingTool, ClickCreatingTool, ActionTool, ClickSelectingTool } from '../../srcTS/selectingTools';
import { TextEditingTool } from '../../srcTS/textEditingTool';
import { ToolManager } from '../../srcTS/toolManager';
import { Animation, AnimationManager, AnimationTrigger } from '../../srcTS/animationManager';
import { Layer } from '../../srcTS/layer';
import { Diagram, DraggingInfo } from '../../srcTS/diagram';
import { Palette } from '../../srcTS/palette';
import { Overview } from '../../srcTS/overview';
import { Brush } from '../../srcTS/brush';
import { GraphObject } from '../../srcTS/graphObject';
import { Panel } from '../../srcTS/panel';
import { RowColumnDefinition } from '../../srcTS/rowColumnDefinition';
import { Shape } from '../../srcTS/shape';
import { TextBlock } from '../../srcTS/textBlock';
import { Picture } from '../../srcTS/picture';
import { Adornment, Part } from '../../srcTS/parts';
import { Node } from '../../srcTS/parts';
import { Link } from '../../srcTS/parts';
import { Group, Placeholder } from '../../srcTS/parts';
import { LayoutEdge, LayoutVertex, LayoutNetwork, Layout } from '../../srcTS/layout';
import { GridLayout } from '../../srcTS/gridLayout';
import { GraphLinksPartManager } from '../../srcTS/graphLinksPartManager';
import { TreePartManager } from '../../srcTS/treePartManager';

import { CircularEdge, CircularVertex, CircularNetwork, CircularLayout } from '../../srcTS/circularLayout';
import { ForceDirectedEdge, ForceDirectedVertex, ForceDirectedNetwork, ForceDirectedLayout } from '../../srcTS/forceDirectedLayout';
import { LayeredDigraphEdge, LayeredDigraphVertex, LayeredDigraphNetwork, LayeredDigraphLayout } from '../../srcTS/layeredDigraphLayout';
import { TreeEdge, TreeVertex, TreeNetwork, TreeLayout } from '../../srcTS/treeLayout';
import { HTMLInfo } from '../../srcTS/htmlInfo';
import { ContextMenuTool } from '../../srcTS/contextMenuTool';
import { PanelLayout } from '../../srcTS/panelLayout';
import { PanelLayoutHorizontal } from '../../srcTS/panelLayoutHorizontal';
import { PanelLayoutSpot } from '../../srcTS/panelLayoutSpot';
import { PanelLayoutTable, PanelLayoutTableRow, PanelLayoutTableColumn } from '../../srcTS/panelLayoutTable';
import { PanelLayoutViewbox } from '../../srcTS/panelLayoutViewbox';
import { PanelLayoutGraduated } from '../../srcTS/panelLayoutGraduated';
import { PanelLayoutGrid } from '../../srcTS/panelLayoutGrid';

// Already imported in Panel
// import { PanelLayoutPosition } from '../../srcTS/panelLayoutPosition';
// import { PanelLayoutVertical } from '../../srcTS/panelLayoutVertical';
// import { PanelLayoutAuto } from '../../srcTS/panelLayoutAuto';
// import { PanelLayoutLink } from '../../srcTS/panelLayoutLink';
// import { PanelLayoutGrid } from '../../srcTS/panelLayoutGrid';

/**
 * @suppress {duplicate}
 * @this {ToolManager}
 */
ToolManager.prototype.initializeStandardTools = function(this: ToolManager): void {
  // For each of these lists, the tools need to be assigned in a specific order,
  // so that they are added to the list in the correct order.

  // mouse-down tools:
  this.replaceStandardTool('Action', new ActionTool(), this.mouseDownTools);
  this.replaceStandardTool('Relinking', new RelinkingTool(), this.mouseDownTools);
  this.replaceStandardTool('LinkReshaping', new LinkReshapingTool(), this.mouseDownTools);
  this.replaceStandardTool('Rotating', new RotatingTool(), this.mouseDownTools);
  this.replaceStandardTool('Resizing', new ResizingTool(), this.mouseDownTools);

  // mouse-move tools:
  this.replaceStandardTool('Linking', new LinkingTool(), this.mouseMoveTools);
  this.replaceStandardTool('Dragging', new DraggingTool(), this.mouseMoveTools);
  this.replaceStandardTool('DragSelecting', new DragSelectingTool(), this.mouseMoveTools);
  this.replaceStandardTool('Panning', new PanningTool(), this.mouseMoveTools);

  // mouse-up tools:
  this.replaceStandardTool('ContextMenu', new ContextMenuTool(), this.mouseUpTools);
  this.replaceStandardTool('TextEditing', new TextEditingTool(), this.mouseUpTools);
  this.replaceStandardTool('ClickCreating', new ClickCreatingTool(), this.mouseUpTools);
  this.replaceStandardTool('ClickSelecting', new ClickSelectingTool(), this.mouseUpTools);
};

// By default, these are added to the library in index.ts. When building from source, you must add them manually.
Panel.definePanelLayout('Horizontal', new PanelLayoutHorizontal());
Panel.definePanelLayout('Spot', new PanelLayoutSpot());
Panel.definePanelLayout('Table', new PanelLayoutTable());
Panel.definePanelLayout('Viewbox', new PanelLayoutViewbox());
Panel.definePanelLayout('TableRow', new PanelLayoutTableRow());
Panel.definePanelLayout('TableColumn', new PanelLayoutTableColumn());
Panel.definePanelLayout('Graduated', new PanelLayoutGraduated());
Panel.definePanelLayout('Grid', new PanelLayoutGrid());
// These PanelLayouts are essential to GoJs and are added in panel.ts, so we don't add them here:
// Panel.definePanelLayout('Position', new PanelLayoutPosition());
// Panel.definePanelLayout('Vertical', new PanelLayoutVertical());
// Panel.definePanelLayout('Auto', new PanelLayoutAuto());
// Panel.definePanelLayout('Link', new PanelLayoutLink());


// Add PartManagers for model subclasses.
Diagram.addPartManager('GraphLinksModel', GraphLinksPartManager);
Diagram.addPartManager('TreeModel', TreePartManager);

/**
 * @hidden @internal
 */
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

  // 'Util': Util, // could add back for debug
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
  'GraphLinksModel': GraphLinksModel,
  'TreeModel': TreeModel,
  'Binding': Binding,
  'Transaction': Transaction,
  'UndoManager': UndoManager,
  'CommandHandler': CommandHandler,
  'Tool': Tool,
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
  'ToolManager': ToolManager,
  'Animation': Animation,
  'AnimationManager': AnimationManager,
  'AnimationTrigger': AnimationTrigger,
  'Layer': Layer,
  'Diagram': Diagram,
  'Palette': Palette,
  'Overview': Overview,
  'Brush': Brush,
  'GraphObject': GraphObject,
  'Panel': Panel,
  'RowColumnDefinition': RowColumnDefinition,
  'Shape': Shape,
  'TextBlock': TextBlock,
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
  'GridLayout': GridLayout,
  'PanelLayout': PanelLayout,

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
