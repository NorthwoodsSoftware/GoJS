
/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

import { DrawCommandHandler } from '../../extensionsTS/DrawCommandHandler.js';
import '../../extensionsTS/Figures.js';
import * as go from '../../release/go.js';
import { BPMNLinkingTool, BPMNRelinkingTool, PoolLink } from './BPMNClasses.js';

declare var jQuery: any;

// This file holds all of the JavaScript code specific to the BPMN.html page.

let myDiagram: go.Diagram;

// Setup all of the Diagrams and what they need.
// This is called after the page is loaded.
export function init() {

  const $ = go.GraphObject.make;  // for more concise visual tree definitions

  // function checkLocalStorage() {
  //   try {
  //     window.localStorage.setItem('item', 'item');
  //     window.localStorage.removeItem('item');
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }

  if (!checkLocalStorage()) {
    const currentFile = document.getElementById('currentFile') as HTMLDivElement;
    currentFile.textContent = "Sorry! No web storage support. If you're using Internet Explorer / Microsoft Edge, you must load the page from a server for local storage to work.";
  }

  // setup the menubar
  (jQuery('#menuui') as any).menu();
  jQuery(function () {
    (jQuery('#menuui') as any).menu({ position: { my: 'left top', at: 'left top+30' } });
  });
  (jQuery('#menuui') as any).menu({
    icons: { submenu: 'ui-icon-triangle-1-s' }
  });

  // hides open HTML Element
  const openDocumentDiv = document.getElementById('openDocument') as HTMLDivElement;
  openDocumentDiv.style.visibility = 'hidden';
  // hides remove HTML Element
  const removeDocumentDiv = document.getElementById('removeDocument') as HTMLDivElement;
  removeDocumentDiv.style.visibility = 'hidden';

  // constants for design choices

  const GradientYellow = $(go.Brush, 'Linear', { 0: 'LightGoldenRodYellow', 1: '#FFFF66' });
  const GradientLightGreen = $(go.Brush, 'Linear', { 0: '#E0FEE0', 1: 'PaleGreen' });
  const GradientLightGray = $(go.Brush, 'Linear', { 0: 'White', 1: '#DADADA' });

  const ActivityNodeFill = $(go.Brush, 'Linear', { 0: 'OldLace', 1: 'PapayaWhip' });
  const ActivityNodeStroke = '#CDAA7D';
  const ActivityMarkerStrokeWidth = 1.5;
  const ActivityNodeWidth = 120;
  const ActivityNodeHeight = 80;
  const ActivityNodeStrokeWidth = 1;
  const ActivityNodeStrokeWidthIsCall = 4;

  const SubprocessNodeFill = ActivityNodeFill;
  const SubprocessNodeStroke = ActivityNodeStroke;

  const EventNodeSize = 42;
  const EventNodeInnerSize = EventNodeSize - 6;
  const EventNodeSymbolSize = EventNodeInnerSize - 14;
  const EventEndOuterFillColor = 'pink';
  const EventBackgroundColor = GradientLightGreen;
  const EventSymbolLightFill = 'white';
  const EventSymbolDarkFill = 'dimgray';
  const EventDimensionStrokeColor = 'green';
  const EventDimensionStrokeEndColor = 'red';
  const EventNodeStrokeWidthIsEnd = 4;

  const GatewayNodeSize = 80;
  const GatewayNodeSymbolSize = 45;
  const GatewayNodeFill = GradientYellow;
  const GatewayNodeStroke = 'darkgoldenrod';
  const GatewayNodeSymbolStroke = 'darkgoldenrod';
  const GatewayNodeSymbolFill = GradientYellow;
  const GatewayNodeSymbolStrokeWidth = 3;

  const DataFill = GradientLightGray;


  // custom figures for Shapes

  go.Shape.defineFigureGenerator('Empty', function (shape, w, h) {
    return new go.Geometry();
  });

  go.Shape.defineFigureGenerator('Annotation', function (shape, w, h) {
    var len = Math.min(w, 10);
    return new go.Geometry()
      .add(new go.PathFigure(len, 0)
           .add(new go.PathSegment(go.PathSegment.Line, 0, 0))
           .add(new go.PathSegment(go.PathSegment.Line, 0, h))
           .add(new go.PathSegment(go.PathSegment.Line, len, h)));
  });

  const gearStr = 'F M 391,5L 419,14L 444.5,30.5L 451,120.5L 485.5,126L 522,141L 595,83L 618.5,92L 644,106.5' +
    'L 660.5,132L 670,158L 616,220L 640.5,265.5L 658.122,317.809L 753.122,322.809L 770.122,348.309L 774.622,374.309' +
    'L 769.5,402L 756.622,420.309L 659.122,428.809L 640.5,475L 616.5,519.5L 670,573.5L 663,600L 646,626.5' +
    'L 622,639L 595,645.5L 531.5,597.5L 493.192,613.462L 450,627.5L 444.5,718.5L 421.5,733L 393,740.5L 361.5,733.5' +
    'L 336.5,719L 330,627.5L 277.5,611.5L 227.5,584.167L 156.5,646L 124.5,641L 102,626.5L 82,602.5L 78.5,572.5' +
    'L 148.167,500.833L 133.5,466.833L 122,432.5L 26.5,421L 11,400.5L 5,373.5L 12,347.5L 26.5,324L 123.5,317.5' +
    'L 136.833,274.167L 154,241L 75.5,152.5L 85.5,128.5L 103,105.5L 128.5,88.5001L 154.872,82.4758L 237,155' +
    'L 280.5,132L 330,121L 336,30L 361,15L 391,5 Z M 398.201,232L 510.201,275L 556.201,385L 505.201,491L 399.201,537' +
    'L 284.201,489L 242.201,385L 282.201,273L 398.201,232 Z';
  const gearGeo = go.Geometry.parse(gearStr);
  gearGeo.normalize();

  go.Shape.defineFigureGenerator('BpmnTaskService', function (shape, w, h) {
    const geo = gearGeo.copy();
    // calculate how much to scale the Geometry so that it fits in w x h
    const bounds = geo.bounds;
    const scale = Math.min(w / bounds.width, h / bounds.height);
    geo.scale(scale, scale);
    // text should go in the hand
    geo.spot1 = new go.Spot(0, 0.6, 10, 0);
    geo.spot2 = new go.Spot(1, 1);
    return geo;
  });

  const handGeo = go.Geometry.parse('F1M18.13,10.06 C18.18,10.07 18.22,10.07 18.26,10.08 18.91,' +
    '10.20 21.20,10.12 21.28,12.93 21.36,15.75 21.42,32.40 21.42,32.40 21.42,' +
    '32.40 21.12,34.10 23.08,33.06 23.08,33.06 22.89,24.76 23.80,24.17 24.72,' +
    '23.59 26.69,23.81 27.19,24.40 27.69,24.98 28.03,24.97 28.03,33.34 28.03,' +
    '33.34 29.32,34.54 29.93,33.12 30.47,31.84 29.71,27.11 30.86,26.56 31.80,' +
    '26.12 34.53,26.12 34.72,28.29 34.94,30.82 34.22,36.12 35.64,35.79 35.64,' +
    '35.79 36.64,36.08 36.72,34.54 36.80,33.00 37.17,30.15 38.42,29.90 39.67,' +
    '29.65 41.22,30.20 41.30,32.29 41.39,34.37 42.30,46.69 38.86,55.40 35.75,' +
    '63.29 36.42,62.62 33.47,63.12 30.76,63.58 26.69,63.12 26.69,63.12 26.69,' +
    '63.12 17.72,64.45 15.64,57.62 13.55,50.79 10.80,40.95 7.30,38.95 3.80,' +
    '36.95 4.24,36.37 4.28,35.35 4.32,34.33 7.60,31.25 12.97,35.75 12.97,' +
    '35.75 16.10,39.79 16.10,42.00 16.10,42.00 15.69,14.30 15.80,12.79 15.96,' +
    '10.75 17.42,10.04 18.13,10.06z ');
  handGeo.rotate(90, 0, 0);
  handGeo.normalize();
  go.Shape.defineFigureGenerator('BpmnTaskManual', function (shape, w, h) {
    const geo = handGeo.copy();
    // calculate how much to scale the Geometry so that it fits in w x h
    const bounds = geo.bounds;
    const scale = Math.min(w / bounds.width, h / bounds.height);
    geo.scale(scale, scale);
    // guess where text should go (in the hand)
    geo.spot1 = new go.Spot(0, 0.6, 10, 0);
    geo.spot2 = new go.Spot(1, 1);
    return geo;
  });


  // define the appearance of tooltips, shared by various templates
  const tooltiptemplate =
    $<go.Adornment>('ToolTip',
      $(go.TextBlock,
        { margin: 3, editable: true },
        new go.Binding('text', '', function (data) {
          if (data.item !== undefined) return data.item;
          return '(unnamed item)';
        }))
    );


  // conversion functions used by data Bindings

  function nodeActivityTaskTypeConverter(s: number) {
    const tasks = ['Empty',
      'BpmnTaskMessage',
      'BpmnTaskUser',
      'BpmnTaskManual',   // Custom hand symbol
      'BpmnTaskScript',
      'BpmnTaskMessage',  // should be black on white
      'BpmnTaskService',  // Custom gear symbol
      'InternalStorage'];
    if (s < tasks.length) return tasks[s];
    return 'NotAllowed'; // error
  }

  // location of event on boundary of Activity is based on the index of the event in the boundaryEventArray
  function nodeActivityBESpotConverter(s: number) {
    const x = 10 + (EventNodeSize / 2);
    if (s === 0) return new go.Spot(0, 1, x, 0);    // bottom left
    if (s === 1) return new go.Spot(1, 1, -x, 0);   // bottom right
    if (s === 2) return new go.Spot(1, 0, -x, 0);   // top right
    return new go.Spot(1, 0, -x - (s - 2) * EventNodeSize, 0);    // top ... right-to-left-ish spread
  }

  function nodeActivityTaskTypeColorConverter(s: number) {
    return (s === 5) ? 'dimgray' : 'white';
  }

  function nodeEventTypeConverter(s: number) {  // order here from BPMN 2.0 poster
    const tasks = ['NotAllowed',
      'Empty',
      'BpmnTaskMessage',
      'BpmnEventTimer',
      'BpmnEventEscalation',
      'BpmnEventConditional',
      'Arrow',
      'BpmnEventError',
      'ThinX',
      'BpmnActivityCompensation',
      'Triangle',
      'Pentagon',
      'ThinCross',
      'Circle'];
    if (s < tasks.length) return tasks[s];
    return 'NotAllowed'; // error
  }

  function nodeEventDimensionStrokeColorConverter(s: number) {
    if (s === 8) return EventDimensionStrokeEndColor;
    return EventDimensionStrokeColor;
  }

  function nodeEventDimensionSymbolFillConverter(s: number) {
    if (s <= 6) return EventSymbolLightFill;
    return EventSymbolDarkFill;
  }


  // ------------------------------------------  Activity Node Boundary Events   ----------------------------------------------

  const boundaryEventMenu =  // context menu for each boundaryEvent on Activity node
    $<go.Adornment>('ContextMenu',
      $('ContextMenuButton',
        $(go.TextBlock, 'Remove event'),
        // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
        { click: function (e: go.InputEvent, obj: go.GraphObject) { removeActivityNodeBoundaryEvent((obj.part as go.Adornment).adornedObject); } })
    );

  // removing a boundary event doesn't not reposition other BE circles on the node
  // just reassigning alignmentIndex in remaining BE would do that.
  function removeActivityNodeBoundaryEvent(obj: go.GraphObject | null) {
    if (obj === null || obj.panel === null || obj.panel.itemArray === null) return;
    myDiagram.startTransaction('removeBoundaryEvent');
    const pid = obj.portId;
    const arr = obj.panel.itemArray;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].portId === pid) {
        myDiagram.model.removeArrayItem(arr, i);
        break;
      }
    }
    myDiagram.commitTransaction('removeBoundaryEvent');
  }

  const boundaryEventItemTemplate =
    $(go.Panel, 'Spot',
      {
        contextMenu: boundaryEventMenu,
        alignmentFocus: go.Spot.Center,
        fromLinkable: true, toLinkable: false, cursor: 'pointer', fromSpot: go.Spot.Bottom,
        fromMaxLinks: 1, toMaxLinks: 0
      },
      new go.Binding('portId', 'portId'),
      new go.Binding('alignment', 'alignmentIndex', nodeActivityBESpotConverter),
      $(go.Shape, 'Circle',
        { desiredSize: new go.Size(EventNodeSize, EventNodeSize) },
        new go.Binding('strokeDashArray', 'eventDimension', function (s) { return (s === 6) ? [4, 2] : null; }),
        new go.Binding('fromSpot', 'alignmentIndex',
          function (s) {
            //  nodeActivityBEFromSpotConverter, 0 & 1 go on bottom, all others on top of activity
            if (s < 2) return go.Spot.Bottom;
            return go.Spot.Top;
          }),
        new go.Binding('fill', 'color')),
      $(go.Shape, 'Circle',
        {
          alignment: go.Spot.Center,
          desiredSize: new go.Size(EventNodeInnerSize, EventNodeInnerSize), fill: null
        },
        new go.Binding('strokeDashArray', 'eventDimension', function (s) { return (s === 6) ? [4, 2] : null; })
      ),
      $(go.Shape, 'NotAllowed',
        {
          alignment: go.Spot.Center,
          desiredSize: new go.Size(EventNodeSymbolSize, EventNodeSymbolSize), fill: 'white'
        },
        new go.Binding('figure', 'eventType', nodeEventTypeConverter)
      )
    );

  // ------------------------------------------  Activity Node contextMenu   ----------------------------------------------

  const activityNodeMenu =
    $<go.Adornment>('ContextMenu',
      $('ContextMenuButton',
        $(go.TextBlock, 'Add Email Event', { margin: 3 }),
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addActivityNodeBoundaryEvent(2, 5); } }),
      $('ContextMenuButton',
        $(go.TextBlock, 'Add Timer Event', { margin: 3 }),
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addActivityNodeBoundaryEvent(3, 5); } }),
      $('ContextMenuButton',
        $(go.TextBlock, 'Add Escalation Event', { margin: 3 }),
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addActivityNodeBoundaryEvent(4, 5); } }),
      $('ContextMenuButton',
        $(go.TextBlock, 'Add Error Event', { margin: 3 }),
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addActivityNodeBoundaryEvent(7, 5); } }),
      $('ContextMenuButton',
        $(go.TextBlock, 'Add Signal Event', { margin: 3 }),
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addActivityNodeBoundaryEvent(10, 5); } }),
      $('ContextMenuButton',
        $(go.TextBlock, 'Add N-I Escalation Event', { margin: 3 }),
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addActivityNodeBoundaryEvent(4, 6); } }),
      $('ContextMenuButton',
        $(go.TextBlock, 'Rename', { margin: 3 }),
        { click: function (e: go.InputEvent, obj: go.GraphObject) { rename(obj); } }));


  // sub-process,  loop, parallel, sequential, ad doc and compensation markers in horizontal array
  function makeSubButton(sub: boolean) {
    if (sub) {
      return [$('SubGraphExpanderButton'),
      { margin: 2, visible: false },
      new go.Binding('visible', 'isSubProcess')];
    }
    return [];
  }

  // sub-process,  loop, parallel, sequential, ad doc and compensation markers in horizontal array
  function makeMarkerPanel(sub: boolean, scale: number) {
    return $(go.Panel, 'Horizontal',
      { alignment: go.Spot.MiddleBottom, alignmentFocus: go.Spot.MiddleBottom },
      $(go.Shape, 'BpmnActivityLoop',
        { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
        new go.Binding('visible', 'isLoop')),
      $(go.Shape, 'BpmnActivityParallel',
        { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
        new go.Binding('visible', 'isParallel')),
      $(go.Shape, 'BpmnActivitySequential',
        { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
        new go.Binding('visible', 'isSequential')),
      $(go.Shape, 'BpmnActivityAdHoc',
        { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
        new go.Binding('visible', 'isAdHoc')),
      $(go.Shape, 'BpmnActivityCompensation',
        { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth, fill: null },
        new go.Binding('visible', 'isCompensation')),
      makeSubButton(sub)
    ); // end activity markers horizontal panel
  }

  const activityNodeTemplate =
    $(go.Node, 'Spot',
      {
        locationObjectName: 'SHAPE', locationSpot: go.Spot.Center,
        resizable: true, resizeObjectName: 'PANEL',
        toolTip: tooltiptemplate,
        selectionAdorned: false,  // use a Binding on the Shape.stroke to show selection
        contextMenu: activityNodeMenu,
        itemTemplate: boundaryEventItemTemplate
      },
      new go.Binding('itemArray', 'boundaryEventArray'),
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, 'Auto',
        {
          name: 'PANEL',
          minSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight),
          desiredSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight)
        },
        new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Panel, 'Spot',
          $(go.Shape, 'RoundedRectangle',  // the outside rounded rectangle
            {
              name: 'SHAPE',
              fill: ActivityNodeFill, stroke: ActivityNodeStroke,
              parameter1: 10, // corner size
              portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
              fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide
            },
            new go.Binding('fill', 'color'),
            new go.Binding('strokeWidth', 'isCall',
              function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })
          ),
          //        $(go.Shape, "RoundedRectangle",  // the inner "Transaction" rounded rectangle
          //          { margin: 3,
          //            stretch: go.GraphObject.Fill,
          //            stroke: ActivityNodeStroke,
          //            parameter1: 8, fill: null, visible: false
          //          },
          //          new go.Binding("visible", "isTransaction")
          //         ),
          // task icon
          $(go.Shape, 'BpmnTaskScript',    // will be None, Script, Manual, Service, etc via converter
            {
              alignment: new go.Spot(0, 0, 5, 5), alignmentFocus: go.Spot.TopLeft,
              width: 22, height: 22
            },
            new go.Binding('fill', 'taskType', nodeActivityTaskTypeColorConverter),
            new go.Binding('figure', 'taskType', nodeActivityTaskTypeConverter)
          ), // end Task Icon
          makeMarkerPanel(false, 1) // sub-process,  loop, parallel, sequential, ad doc and compensation markers
        ),  // end main body rectangles spot panel
        $(go.TextBlock,  // the center text
          {
            alignment: go.Spot.Center, textAlign: 'center', margin: 12,
            editable: true
          },
          new go.Binding('text').makeTwoWay())
      )  // end Auto Panel
    );  // end go.Node, which is a Spot Panel with bound itemArray

  // ------------------------------- template for Activity / Task node in Palette  -------------------------------

  const palscale = 2;
  const activityNodeTemplateForPalette =
    $(go.Node, 'Vertical',
      {
        locationObjectName: 'SHAPE',
        locationSpot: go.Spot.Center,
        selectionAdorned: false
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, 'Spot',
        {
          name: 'PANEL',
          desiredSize: new go.Size(ActivityNodeWidth / palscale, ActivityNodeHeight / palscale)
        },
        $(go.Shape, 'RoundedRectangle',  // the outside rounded rectangle
          {
            name: 'SHAPE',
            fill: ActivityNodeFill, stroke: ActivityNodeStroke,
            parameter1: 10 / palscale  // corner size (default 10)
          },
          new go.Binding('strokeWidth', 'isCall',
            function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })),
        $(go.Shape, 'RoundedRectangle',  // the inner "Transaction" rounded rectangle
          {
            margin: 3,
            stretch: go.GraphObject.Fill,
            stroke: ActivityNodeStroke,
            parameter1: 8 / palscale, fill: null, visible: false
          },
          new go.Binding('visible', 'isTransaction')),
        // task icon
        $(go.Shape, 'BpmnTaskScript',    // will be None, Script, Manual, Service, etc via converter
          {
            alignment: new go.Spot(0, 0, 5, 5), alignmentFocus: go.Spot.TopLeft,
            width: 22 / palscale, height: 22 / palscale
          },
          new go.Binding('fill', 'taskType', nodeActivityTaskTypeColorConverter),
          new go.Binding('figure', 'taskType', nodeActivityTaskTypeConverter)),
        makeMarkerPanel(false, palscale) // sub-process,  loop, parallel, sequential, ad doc and compensation markers
      ), // End Spot panel
      $(go.TextBlock,  // the center text
        { alignment: go.Spot.Center, textAlign: 'center', margin: 2 },
        new go.Binding('text'))
    );  // End Node

  const subProcessGroupTemplateForPalette =
    $(go.Group, 'Vertical',
      {
        locationObjectName: 'SHAPE',
        locationSpot: go.Spot.Center,
        isSubGraphExpanded: false,
        selectionAdorned: false
      },
      $(go.Panel, 'Spot',
        {
          name: 'PANEL',
          desiredSize: new go.Size(ActivityNodeWidth / palscale, ActivityNodeHeight / palscale)
        },
        $(go.Shape, 'RoundedRectangle',  // the outside rounded rectangle
          {
            name: 'SHAPE',
            fill: ActivityNodeFill, stroke: ActivityNodeStroke,
            parameter1: 10 / palscale  // corner size (default 10)
          },
          new go.Binding('strokeWidth', 'isCall', function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })
        ),
        $(go.Shape, 'RoundedRectangle',  // the inner "Transaction" rounded rectangle
          {
            margin: 3,
            stretch: go.GraphObject.Fill,
            stroke: ActivityNodeStroke,
            parameter1: 8 / palscale, fill: null, visible: false
          },
          new go.Binding('visible', 'isTransaction')),
        makeMarkerPanel(true, palscale) // sub-process,  loop, parallel, sequential, ad doc and compensation markers
      ), // end main body rectangles spot panel
      $(go.TextBlock,  // the center text
        { alignment: go.Spot.Center, textAlign: 'center', margin: 2 },
        new go.Binding('text'))
    );  // end go.Group

  // ------------------------------------------  Event Node Template  ----------------------------------------------

  const eventNodeTemplate =
    $(go.Node, 'Vertical',
      {
        locationObjectName: 'SHAPE',
        locationSpot: go.Spot.Center,
        toolTip: tooltiptemplate
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      // can be resided according to the user's desires
      { resizable: false, resizeObjectName: 'SHAPE' },
      $(go.Panel, 'Spot',
        $(go.Shape, 'Circle',  // Outer circle
          {
            strokeWidth: 1,
            name: 'SHAPE',
            desiredSize: new go.Size(EventNodeSize, EventNodeSize),
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide
          },
          // allows the color to be determined by the node data
          new go.Binding('fill', 'eventDimension', function (s) { return (s === 8) ? EventEndOuterFillColor : EventBackgroundColor; }),
          new go.Binding('strokeWidth', 'eventDimension', function (s) { return s === 8 ? EventNodeStrokeWidthIsEnd : 1; }),
          new go.Binding('stroke', 'eventDimension', nodeEventDimensionStrokeColorConverter),
          new go.Binding('strokeDashArray', 'eventDimension', function (s) { return (s === 3 || s === 6) ? [4, 2] : null; }),
          new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
        ),  // end main shape
        $(go.Shape, 'Circle',  // Inner circle
          { alignment: go.Spot.Center, desiredSize: new go.Size(EventNodeInnerSize, EventNodeInnerSize), fill: null },
          new go.Binding('stroke', 'eventDimension', nodeEventDimensionStrokeColorConverter),
          new go.Binding('strokeDashArray', 'eventDimension', function (s) { return (s === 3 || s === 6) ? [4, 2] : null; }), // dashes for non-interrupting
          new go.Binding('visible', 'eventDimension', function (s) { return s > 3 && s <= 7; }) // inner  only visible for 4 thru 7
        ),
        $(go.Shape, 'NotAllowed',
          { alignment: go.Spot.Center, desiredSize: new go.Size(EventNodeSymbolSize, EventNodeSymbolSize), stroke: 'black' },
          new go.Binding('figure', 'eventType', nodeEventTypeConverter),
          new go.Binding('fill', 'eventDimension', nodeEventDimensionSymbolFillConverter)
        )
      ),  // end Auto Panel
      $(go.TextBlock,
        { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: true },
        new go.Binding('text').makeTwoWay())

    ); // end go.Node Vertical

  // ------------------------------------------  Gateway Node Template   ----------------------------------------------

  function nodeGatewaySymbolTypeConverter(s: number) {
    const tasks = ['NotAllowed',
      'ThinCross',      // 1 - Parallel
      'Circle',         // 2 - Inclusive
      'AsteriskLine',   // 3 - Complex
      'ThinX',          // 4 - Exclusive  (exclusive can also be no symbol, just bind to visible=false for no symbol)
      'Pentagon',       // 5 - double cicle event based gateway
      'Pentagon',       // 6 - exclusive event gateway to start a process (single circle)
      'ThinCross'] ;   // 7 - parallel event gateway to start a process (single circle)
    if (s < tasks.length) return tasks[s];
    return 'NotAllowed'; // error
  }

  // tweak the size of some of the gateway icons
  function nodeGatewaySymbolSizeConverter(s: number) {
    const size = new go.Size(GatewayNodeSymbolSize, GatewayNodeSymbolSize);
    if (s === 4) {
      size.width = size.width / 4 * 3;
      size.height = size.height / 4 * 3;
    } else if (s > 4) {
      size.width = size.width / 1.6;
      size.height = size.height / 1.6;
    }
    return size;
  }
  function nodePalGatewaySymbolSizeConverter(s: number) {
    const size = nodeGatewaySymbolSizeConverter(s);
    size.width = size.width / 2;
    size.height = size.height / 2;
    return size;
  }

  const gatewayNodeTemplate =
    $(go.Node, 'Vertical',
      {
        locationObjectName: 'SHAPE',
        locationSpot: go.Spot.Center,
        toolTip: tooltiptemplate
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      // can be resided according to the user's desires
      { resizable: false, resizeObjectName: 'SHAPE' },
      $(go.Panel, 'Spot',
        $(go.Shape, 'Diamond',
          {
            strokeWidth: 1, fill: GatewayNodeFill, stroke: GatewayNodeStroke,
            name: 'SHAPE',
            desiredSize: new go.Size(GatewayNodeSize, GatewayNodeSize),
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            fromSpot: go.Spot.NotLeftSide, toSpot: go.Spot.NotRightSide
          },
          new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),  // end main shape
        $(go.Shape, 'NotAllowed',
          { alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke, fill: GatewayNodeSymbolFill },
          new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
          // new go.Binding("visible", "gatewayType", function(s) { return s !== 4; }),   // comment out if you want exclusive gateway to be X instead of blank.
          new go.Binding('strokeWidth', 'gatewayType', function (s) { return (s <= 4) ? GatewayNodeSymbolStrokeWidth : 1; }),
          new go.Binding('desiredSize', 'gatewayType', nodeGatewaySymbolSizeConverter)),
        // the next 2 circles only show up for event gateway
        $(go.Shape, 'Circle',  // Outer circle
          {
            strokeWidth: 1, stroke: GatewayNodeSymbolStroke, fill: null, desiredSize: new go.Size(EventNodeSize, EventNodeSize)
          },
          new go.Binding('visible', 'gatewayType', function (s) { return s >= 5; }) // only visible for > 5
        ),  // end main shape
        $(go.Shape, 'Circle',  // Inner circle
          {
            alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke,
            desiredSize: new go.Size(EventNodeInnerSize, EventNodeInnerSize),
            fill: null
          },
          new go.Binding('visible', 'gatewayType', function (s) { return s === 5; }) // inner  only visible for == 5
        )
      ),
      $(go.TextBlock,
        { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: true },
        new go.Binding('text').makeTwoWay())
    ); // end go.Node Vertical

  // --------------------------------------------------------------------------------------------------------------

  const gatewayNodeTemplateForPalette =
    $(go.Node, 'Vertical',
      {
        toolTip: tooltiptemplate,
        resizable: false,
        locationObjectName: 'SHAPE',
        locationSpot: go.Spot.Center,
        resizeObjectName: 'SHAPE'
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, 'Spot',
        $(go.Shape, 'Diamond',
          {
            strokeWidth: 1, fill: GatewayNodeFill, stroke: GatewayNodeStroke, name: 'SHAPE',
            desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 2)
          }),
        $(go.Shape, 'NotAllowed',
          { alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke, strokeWidth: GatewayNodeSymbolStrokeWidth, fill: GatewayNodeSymbolFill },
          new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
          // new go.Binding("visible", "gatewayType", function(s) { return s !== 4; }),   // comment out if you want exclusive gateway to be X instead of blank.
          new go.Binding('strokeWidth', 'gatewayType', function (s) { return (s <= 4) ? GatewayNodeSymbolStrokeWidth : 1; }),
          new go.Binding('desiredSize', 'gatewayType', nodePalGatewaySymbolSizeConverter)),
        // the next 2 circles only show up for event gateway
        $(go.Shape, 'Circle',  // Outer circle
          {
            strokeWidth: 1, stroke: GatewayNodeSymbolStroke, fill: null, desiredSize: new go.Size(EventNodeSize / 2, EventNodeSize / 2)
          },
          // new go.Binding("desiredSize", "gatewayType", new go.Size(EventNodeSize/2, EventNodeSize/2)),
          new go.Binding('visible', 'gatewayType', function (s) { return s >= 5; }) // only visible for > 5
        ),  // end main shape
        $(go.Shape, 'Circle',  // Inner circle
          {
            alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke,
            desiredSize: new go.Size(EventNodeInnerSize / 2, EventNodeInnerSize / 2),
            fill: null
          },
          new go.Binding('visible', 'gatewayType', function (s) { return s === 5; }) // inner  only visible for == 5
        )),

      $(go.TextBlock,
        { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: false },
        new go.Binding('text'))
    );

  // --------------------------------------------------------------------------------------------------------------

  const annotationNodeTemplate =
    $(go.Node, 'Auto',
      { background: GradientLightGray, locationSpot: go.Spot.Center },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'Annotation', // A left bracket shape
        {
          portId: '', fromLinkable: true, cursor: 'pointer', fromSpot: go.Spot.Left,
          strokeWidth: 2, stroke: 'gray', fill: 'transparent'
        }),
      $(go.TextBlock,
        { margin: 5, editable: true },
        new go.Binding('text').makeTwoWay())
    );

  const dataObjectNodeTemplate =
    $(go.Node, 'Vertical',
      { locationObjectName: 'SHAPE', locationSpot: go.Spot.Center },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'File',
        {
          name: 'SHAPE', portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
          fill: DataFill, desiredSize: new go.Size(EventNodeSize * 0.8, EventNodeSize)
        }),
      $(go.TextBlock,
        {
          margin: 5,
          editable: true
        },
        new go.Binding('text').makeTwoWay())
    );

  const dataStoreNodeTemplate =
    $(go.Node, 'Vertical',
      { locationObjectName: 'SHAPE', locationSpot: go.Spot.Center },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'Database',
        {
          name: 'SHAPE', portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
          fill: DataFill, desiredSize: new go.Size(EventNodeSize, EventNodeSize)
        }),
      $(go.TextBlock,
        { margin: 5, editable: true },
        new go.Binding('text').makeTwoWay())
    );

  // ------------------------------------------  private process Node Template Map   ----------------------------------------------

  const privateProcessNodeTemplate =
    $(go.Node, 'Auto',
      { layerName: 'Background', resizable: true, resizeObjectName: 'LANE' },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'Rectangle',
        { fill: null }),
      $(go.Panel, 'Table',     // table with 2 cells to hold header and lane
        {
          desiredSize: new go.Size(ActivityNodeWidth * 6, ActivityNodeHeight),
          background: DataFill, name: 'LANE', minSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight * 0.667)
        },
        new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.TextBlock,
          {
            row: 0, column: 0,
            angle: 270, margin: 5,
            editable: true, textAlign: 'center'
          },
          new go.Binding('text').makeTwoWay()),
        $(go.RowColumnDefinition, { column: 1, separatorStrokeWidth: 1, separatorStroke: 'black' }),
        $(go.Shape, 'Rectangle',
          {
            row: 0, column: 1,
            stroke: null, fill: 'transparent',
            portId: '', fromLinkable: true, toLinkable: true,
            fromSpot: go.Spot.TopBottomSides, toSpot: go.Spot.TopBottomSides,
            cursor: 'pointer', stretch: go.GraphObject.Fill
          })
      )
    );

  const privateProcessNodeTemplateForPalette =
    $(go.Node, 'Vertical',
      { locationSpot: go.Spot.Center },
      $(go.Shape, 'Process',
        { fill: DataFill, desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 4) }),
      $(go.TextBlock,
        { margin: 5, editable: true },
        new go.Binding('text'))
    );

  const poolTemplateForPalette =
    $(go.Group, 'Vertical',
      {
        locationSpot: go.Spot.Center,
        computesBoundsIncludingLinks: false,
        isSubGraphExpanded: false
      },
      $(go.Shape, 'Process',
        { fill: 'white', desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 4) }),
      $(go.Shape, 'Process',
        { fill: 'white', desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 4) }),
      $(go.TextBlock,
        { margin: 5, editable: true },
        new go.Binding('text'))
    );

  const swimLanesGroupTemplateForPalette =
    $(go.Group, 'Vertical'); // empty in the palette


  function assignGroupLayer(grp: go.Part): void {
    if (!(grp instanceof go.Group)) return;
    var lay = grp.isSelected ? "Foreground" : "";
    grp.layerName = lay;
    grp.findSubGraphParts().each(function(m: go.Part) { m.layerName = lay; });
  }

  const subProcessGroupTemplate =
    $(go.Group, 'Spot',
      {
        locationSpot: go.Spot.Center,
        locationObjectName: 'PH',
        // locationSpot: go.Spot.Center,
        isSubGraphExpanded: false,
        subGraphExpandedChanged: function(grp: go.Group) {
          if (grp.isSubGraphExpanded) grp.isSelected = true;
          assignGroupLayer(grp);
        },
        selectionChanged: assignGroupLayer,
        computesBoundsAfterDrag: true,
        memberValidation: function (group: go.Group, part: go.Part) {
          return !(part instanceof go.Group) ||
                 (part.category !== 'Pool' && part.category !== 'Lane');
        },
        mouseDrop: function (e: go.InputEvent, grp: go.GraphObject) {
          if (e.shift || !(grp instanceof go.Group) || grp.diagram === null) return;
          const ok = grp.addMembers(grp.diagram.selection, true);
          if (!ok) grp.diagram.currentTool.doCancel();
          else assignGroupLayer(grp);
        },
        contextMenu: activityNodeMenu,
        itemTemplate: boundaryEventItemTemplate,
        avoidable: false
      },
      new go.Binding('itemArray', 'boundaryEventArray'),
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, 'Auto',
        $(go.Shape, 'RoundedRectangle',
          {
            name: 'PH', fill: SubprocessNodeFill, stroke: SubprocessNodeStroke,
            minSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight),
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide
          },
          new go.Binding('strokeWidth', 'isCall', function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })
        ),
        $(go.Panel, 'Vertical',
          { defaultAlignment: go.Spot.Left },
          $(go.TextBlock,  // label
            { margin: 3, editable: true },
            new go.Binding('text', 'text').makeTwoWay(),
            new go.Binding('alignment', 'isSubGraphExpanded', function (s) { return s ? go.Spot.TopLeft : go.Spot.Center; })),
          // create a placeholder to represent the area where the contents of the group are
          $(go.Panel, "Auto",
            $(go.Shape, { opacity: 0.0 }),
            $(go.Placeholder,
              { padding: new go.Margin(5, 5) })
          ),  // end nested Auto Panel
          makeMarkerPanel(true, 1)  // sub-process,  loop, parallel, sequential, ad doc and compensation markers
        )  // end Vertical Panel
      )  // end border Panel
    );  // end Group


  // ------------------------ Lanes and Pools ------------------------------------------------------------

  function groupStyle() {  // common settings for both Lane and Pool Groups
    return [
      {
        layerName: 'Background',  // all pools and lanes are always behind all nodes and links
        background: 'transparent',  // can grab anywhere in bounds
        movable: true, // allows users to re-order by dragging
        copyable: false,  // can't copy lanes or pools
        avoidable: false  // don't impede AvoidsNodes routed Links
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
    ];
  }

  // hide links between lanes when either lane is collapsed
  function updateCrossLaneLinks(group: go.Group) {
    group.findExternalLinksConnected().each((l) => {
      l.visible = (l.fromNode !== null && l.fromNode.isVisible() && l.toNode !== null && l.toNode.isVisible());
    });
  }

  const laneEventMenu =  // context menu for each lane
    $<go.Adornment>('ContextMenu',
      $('ContextMenuButton',
        $(go.TextBlock, 'Add Lane'),
        // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addLaneEvent((obj.part as go.Adornment).adornedObject as go.Node); } })
    );

  // Add a lane to pool (lane parameter is lane above new lane)
  function addLaneEvent(lane: go.Node) {
    myDiagram.startTransaction('addLane');
    if (lane != null && lane.data.category === 'Lane') {
      // create a new lane data object
      const shape = lane.findObject('SHAPE');
      const size = new go.Size(shape ? shape.width : MINLENGTH, MINBREADTH);
      const newlanedata = {
        category: 'Lane',
        text: 'New Lane',
        color: 'white',
        isGroup: true,
        loc: go.Point.stringify(new go.Point(lane.location.x, lane.location.y + 1)), // place below selection
        size: go.Size.stringify(size),
        group: lane.data.group
      };
      // and add it to the model
      myDiagram.model.addNodeData(newlanedata);
    }
    myDiagram.commitTransaction('addLane');
  }

  const swimLanesGroupTemplate =
    $(go.Group, 'Spot', groupStyle(),
      {
        name: 'Lane',
        contextMenu: laneEventMenu,
        minLocation: new go.Point(NaN, -Infinity),  // only allow vertical movement
        maxLocation: new go.Point(NaN, Infinity),
        selectionObjectName: 'SHAPE',  // selecting a lane causes the body of the lane to be highlit, not the label
        resizable: true, resizeObjectName: 'SHAPE',  // the custom resizeAdornmentTemplate only permits two kinds of resizing
        layout: $(go.LayeredDigraphLayout,  // automatically lay out the lane's subgraph
          {
            isInitial: false,  // don't even do initial layout
            isOngoing: false,  // don't invalidate layout when nodes or links are added or removed
            direction: 0,
            columnSpacing: 10,
            layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
          }),
        computesBoundsAfterDrag: true,  // needed to prevent recomputing Group.placeholder bounds too soon
        computesBoundsIncludingLinks: false,  // to reduce occurrences of links going briefly outside the lane
        computesBoundsIncludingLocation: true,  // to support empty space at top-left corner of lane
        handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
        mouseDrop: function (e: go.InputEvent, grp: go.GraphObject) {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
          // don't allow drag-and-dropping a mix of regular Nodes and Groups
          if (!e.diagram.selection.any((n) => (n instanceof go.Group && n.category !== 'subprocess') || n.category === 'privateProcess')) {
            if (!(grp instanceof go.Group) || grp.diagram === null) return;
            const ok = grp.addMembers(grp.diagram.selection, true);
            if (ok) {
              updateCrossLaneLinks(grp);
              relayoutDiagram();
            } else {
              grp.diagram.currentTool.doCancel();
            }
          }
        },
        subGraphExpandedChanged: function (grp: go.Group) {
          if (grp.diagram === null) return;
          if (grp.diagram.undoManager.isUndoingRedoing) return;
          const shp = grp.resizeObject;
          if (grp.isSubGraphExpanded) {
            shp.height = grp.data.savedBreadth;
          } else {
            if (!isNaN(shp.height)) grp.diagram.model.set(grp.data, "savedBreadth", shp.height);
            shp.height = NaN;
          }
          updateCrossLaneLinks(grp);
        }
      },
      // new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),

      $(go.Shape, 'Rectangle',  // this is the resized object
        { name: 'SHAPE', fill: 'white', stroke: null },  // need stroke null here or you gray out some of pool border.
        new go.Binding('fill', 'color'),
        new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),

      // the lane header consisting of a Shape and a TextBlock
      $(go.Panel, 'Horizontal',
        {
          name: 'HEADER',
          angle: 270,  // maybe rotate the header to read sideways going up
          alignment: go.Spot.LeftCenter, alignmentFocus: go.Spot.LeftCenter
        },
        $(go.TextBlock,  // the lane label
          { editable: true, margin: new go.Margin(2, 0, 0, 8) },
          new go.Binding('visible', 'isSubGraphExpanded').ofObject(),
          new go.Binding('text', 'text').makeTwoWay()),
        $('SubGraphExpanderButton', { margin: 4, angle: -270 })  // but this remains always visible!
      ),  // end Horizontal Panel
      $(go.Placeholder,
        { padding: 12, alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft }),
      $(go.Panel, 'Horizontal', { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft },
        $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
          {
            name: 'LABEL',
            editable: true, visible: false,
            angle: 0, margin: new go.Margin(6, 0, 0, 20)
          },
          new go.Binding('visible', 'isSubGraphExpanded', function (e) { return !e; }).ofObject(),
          new go.Binding('text', 'text').makeTwoWay())
      )
    );  // end swimLanesGroupTemplate

  // define a custom resize adornment that has two resize handles if the group is expanded
  // myDiagram.groupTemplate.resizeAdornmentTemplate =
  swimLanesGroupTemplate.resizeAdornmentTemplate =
    $(go.Adornment, 'Spot',
      $(go.Placeholder),
      $(go.Shape,  // for changing the length of a lane
        {
          alignment: go.Spot.Right,
          desiredSize: new go.Size(7, 50),
          fill: 'lightblue', stroke: 'dodgerblue',
          cursor: 'col-resize'
        },
        new go.Binding('visible', '', function (ad) {
          if (ad.adornedPart === null) return false;
          return ad.adornedPart.isSubGraphExpanded;
        }).ofObject()),
      $(go.Shape,  // for changing the breadth of a lane
        {
          alignment: go.Spot.Bottom,
          desiredSize: new go.Size(50, 7),
          fill: 'lightblue', stroke: 'dodgerblue',
          cursor: 'row-resize'
        },
        new go.Binding('visible', '', function (ad) {
          if (ad.adornedPart === null) return false;
          return ad.adornedPart.isSubGraphExpanded;
        }).ofObject())
    );

  const poolGroupTemplate =
    $(go.Group, 'Auto', groupStyle(),
      {
        computesBoundsIncludingLinks: false,
        // use a simple layout that ignores links to stack the "lane" Groups on top of each other
        layout: $(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape,
        { fill: 'white' },
        new go.Binding('fill', 'color')),
      $(go.Panel, 'Table',
        { defaultColumnSeparatorStroke: 'black' },
        $(go.Panel, 'Horizontal',
          { column: 0, angle: 270 },
          $(go.TextBlock,
            { editable: true, margin: new go.Margin(5, 0, 5, 0) },  // margin matches private process (black box pool)
            new go.Binding('text').makeTwoWay())
        ),
        $(go.Placeholder,
          { background: 'darkgray', column: 1 })
      )
    ); // end poolGroupTemplate


  // ------------------------------------------  Template Maps  ----------------------------------------------

  // create the nodeTemplateMap, holding main view node templates:
  const nodeTemplateMap = new go.Map<string, go.Node>();
  // for each of the node categories, specify which template to use
  nodeTemplateMap.add('activity', activityNodeTemplate);
  nodeTemplateMap.add('event', eventNodeTemplate);
  nodeTemplateMap.add('gateway', gatewayNodeTemplate);
  nodeTemplateMap.add('annotation', annotationNodeTemplate);
  nodeTemplateMap.add('dataobject', dataObjectNodeTemplate);
  nodeTemplateMap.add('datastore', dataStoreNodeTemplate);
  nodeTemplateMap.add('privateProcess', privateProcessNodeTemplate);
  // for the default category, "", use the same template that Diagrams use by default
  // this just shows the key value as a simple TextBlock

  const groupTemplateMap = new go.Map<string, go.Group>();
  groupTemplateMap.add('subprocess', subProcessGroupTemplate);
  groupTemplateMap.add('Lane', swimLanesGroupTemplate);
  groupTemplateMap.add('Pool', poolGroupTemplate);

  // create the nodeTemplateMap, holding special palette "mini" node templates:
  const palNodeTemplateMap = new go.Map<string, go.Node>();
  palNodeTemplateMap.add('activity', activityNodeTemplateForPalette);
  palNodeTemplateMap.add('event', eventNodeTemplate);
  palNodeTemplateMap.add('gateway', gatewayNodeTemplateForPalette);
  palNodeTemplateMap.add('annotation', annotationNodeTemplate);
  palNodeTemplateMap.add('dataobject', dataObjectNodeTemplate);
  palNodeTemplateMap.add('datastore', dataStoreNodeTemplate);
  palNodeTemplateMap.add('privateProcess', privateProcessNodeTemplateForPalette);

  const palGroupTemplateMap = new go.Map<string, go.Group>();
  palGroupTemplateMap.add('subprocess', subProcessGroupTemplateForPalette);
  palGroupTemplateMap.add('Pool', poolTemplateForPalette);
  palGroupTemplateMap.add('Lane', swimLanesGroupTemplateForPalette);


  // ------------------------------------------  Link Templates   ----------------------------------------------

  const sequenceLinkTemplate =
    $(go.Link,
      {
        contextMenu:
        $<go.Adornment>('ContextMenu',
          $('ContextMenuButton',
            $(go.TextBlock, 'Default Flow'),
            // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
            { click: function (e: go.InputEvent, obj: go.GraphObject) { setSequenceLinkDefaultFlow((obj.part as go.Adornment).adornedObject as go.Link); } }),
          $('ContextMenuButton',
            $(go.TextBlock, 'Conditional Flow'),
            // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
            { click: function (e: go.InputEvent, obj: go.GraphObject) { setSequenceLinkConditionalFlow((obj.part as go.Adornment).adornedObject as go.Link); } })
        ),
        routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10,
        // fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide,
        reshapable: true, relinkableFrom: true, relinkableTo: true, toEndSegmentLength: 20
      },
      new go.Binding('points').makeTwoWay(),
      $(go.Shape, { stroke: 'black', strokeWidth: 1 }),
      $(go.Shape, { toArrow: 'Triangle', scale: 1.2, fill: 'black', stroke: null }),
      $(go.Shape, { fromArrow: '', scale: 1.5, stroke: 'black', fill: 'white' },
        new go.Binding('fromArrow', 'isDefault', function (s) {
          if (s === null) return '';
          return s ? 'BackSlash' : 'StretchedDiamond';
        }),
        new go.Binding('segmentOffset', 'isDefault', function (s) {
          return s ? new go.Point(5, 0) : new go.Point(0, 0);
        })),
      $(go.TextBlock, { // this is a Link label
        name: 'Label', editable: true, text: 'label', segmentOffset: new go.Point(-10, -10), visible: false
      },
        new go.Binding('text', 'text').makeTwoWay(),
        new go.Binding('visible', 'visible').makeTwoWay())
    );

  // set Default Sequence Flow (backslash From Arrow)
  function setSequenceLinkDefaultFlow(obj: go.Link) {
    myDiagram.startTransaction('setSequenceLinkDefaultFlow');
    const model = myDiagram.model;
    model.setDataProperty(obj.data, 'isDefault', true);
    // Set all other links from the fromNode to be isDefault=null
    if (obj.fromNode !== null) {
      obj.fromNode.findLinksOutOf().each(function (link) {
        if (link !== obj && link.data.isDefault) {
          model.setDataProperty(link.data, 'isDefault', null);
        }
      });
    }
    myDiagram.commitTransaction('setSequenceLinkDefaultFlow');
  }

  // set Conditional Sequence Flow (diamond From Arrow)
  function setSequenceLinkConditionalFlow(obj: go.Link) {
    myDiagram.startTransaction('setSequenceLinkConditionalFlow');
    const model = myDiagram.model;
    model.setDataProperty(obj.data, 'isDefault', false);
    myDiagram.commitTransaction('setSequenceLinkConditionalFlow');
  }

  const messageFlowLinkTemplate =
    $(PoolLink, // defined in BPMNClasses.js
      {
        routing: go.Link.Orthogonal, curve: go.Link.JumpGap, corner: 10,
        fromSpot: go.Spot.TopBottomSides, toSpot: go.Spot.TopBottomSides,
        reshapable: true, relinkableTo: true, toEndSegmentLength: 20
      },
      new go.Binding('points').makeTwoWay(),
      $(go.Shape, { stroke: 'black', strokeWidth: 1, strokeDashArray: [6, 2] }),
      $(go.Shape, { toArrow: 'Triangle', scale: 1, fill: 'white', stroke: 'black' }),
      $(go.Shape, { fromArrow: 'Circle', scale: 1, visible: true, stroke: 'black', fill: 'white' }),
      $(go.TextBlock, {
        editable: true, text: 'label'
      }, // Link label
        new go.Binding('text', 'text').makeTwoWay())
    );

  const dataAssociationLinkTemplate =
    $(go.Link,
      {
        routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10,
        fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,
        reshapable: true, relinkableFrom: true, relinkableTo: true
      },
      new go.Binding('points').makeTwoWay(),
      $(go.Shape, { stroke: 'black', strokeWidth: 1, strokeDashArray: [1, 3] }),
      $(go.Shape, { toArrow: 'OpenTriangle', scale: 1, fill: null, stroke: 'blue' })
    );

  const annotationAssociationLinkTemplate =
    $(go.Link,
      {
        reshapable: true, relinkableFrom: true, relinkableTo: true,
        toSpot: go.Spot.AllSides,
        toEndSegmentLength: 20, fromEndSegmentLength: 40
      },
      new go.Binding('points').makeTwoWay(),
      $(go.Shape, { stroke: 'black', strokeWidth: 1, strokeDashArray: [1, 3] }),
      $(go.Shape, { toArrow: 'OpenTriangle', scale: 1, stroke: 'black' })
    );

  const linkTemplateMap = new go.Map<string, go.Link>();
  linkTemplateMap.add('msg', messageFlowLinkTemplate);
  linkTemplateMap.add('annotation', annotationAssociationLinkTemplate);
  linkTemplateMap.add('data', dataAssociationLinkTemplate);
  linkTemplateMap.add('', sequenceLinkTemplate);  // default


  // ------------------------------------------the main Diagram----------------------------------------------

  myDiagram =
    new go.Diagram('myDiagramDiv',
      {
        nodeTemplateMap: nodeTemplateMap,
        linkTemplateMap: linkTemplateMap,
        groupTemplateMap: groupTemplateMap,

        commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js
        // default to having arrow keys move selected nodes
        'commandHandler.arrowKeyBehavior': 'move',

        mouseDrop: function (e: go.InputEvent) {
          // when the selection is dropped in the diagram's background,
          // make sure the selected Parts no longer belong to any Group
          const ok = myDiagram.commandHandler.addTopLevelParts(myDiagram.selection, true);
          if (!ok) myDiagram.currentTool.doCancel();
        },
        resizingTool: new LaneResizingTool(),
        linkingTool: new BPMNLinkingTool(), // defined in BPMNClasses.js
        relinkingTool: new BPMNRelinkingTool(), // defined in BPMNClasses.js
        'SelectionMoved': relayoutDiagram,  // defined below
        'SelectionCopied': relayoutDiagram,
        "LinkDrawn": function(e) { assignGroupLayer(e.subject.containingGroup); },
        "LinkRelinked": function(e) { assignGroupLayer(e.subject.containingGroup); }
      });

  myDiagram.addDiagramListener('LinkDrawn', function (e) {
    if (e.subject.fromNode.category === 'annotation') {
      e.subject.category = 'annotation'; // annotation association
    } else if (e.subject.fromNode.category === 'dataobject' || e.subject.toNode.category === 'dataobject') {
      e.subject.category = 'data'; // data association
    } else if (e.subject.fromNode.category === 'datastore' || e.subject.toNode.category === 'datastore') {
      e.subject.category = 'data'; // data association
    }
  });

  //  uncomment this if you want a subprocess to expand on drop.  We decided we didn't like this behavior
  //  myDiagram.addDiagramListener("ExternalObjectsDropped", function(e) {
  //    // e.subject is the collection that was just dropped
  //    e.subject.each(function(part) {
  //        if (part instanceof go.Node && part.data.item === "end") {
  //          part.move(new go.Point(part.location.x  + 350, part.location.y))
  //        }
  //      });
  //    myDiagram.commandHandler.expandSubGraph();
  //  });

  // change the title to indicate that the diagram has been modified
  myDiagram.addDiagramListener('Modified', function (e) {
    const currentFile = document.getElementById('currentFile') as HTMLDivElement;
    const idx = currentFile.textContent!.indexOf('*');
    if (myDiagram.isModified) {
      if (idx < 0) currentFile.textContent = currentFile.textContent + '*';
    } else {
      if (idx >= 0) currentFile.textContent = currentFile.textContent!.slice(0, idx);
    }
  });


  // ------------------------------------------  Palette   ----------------------------------------------

  // Make sure the pipes are ordered by their key in the palette inventory
  function keyCompare(a: go.Part, b: go.Part) {
    const at = a.data.key;
    const bt = b.data.key;
    if (at < bt) return -1;
    if (at > bt) return 1;
    return 0;
  }

  // initialize the first Palette, BPMN Spec Level 1
  const myPaletteLevel1 =
    new go.Palette('myPaletteLevel1',
      { // share the templates with the main Diagram
        nodeTemplateMap: palNodeTemplateMap,
        groupTemplateMap: palGroupTemplateMap,
        layout: $(go.GridLayout,
          {
            cellSize: new go.Size(1, 1),
            spacing: new go.Size(5, 5),
            comparer: keyCompare
          })
      });

  // initialize the second Palette, BPMN Spec Level 2
  const myPaletteLevel2 =
    new go.Palette('myPaletteLevel2',
      { // share the templates with the main Diagram
        nodeTemplateMap: palNodeTemplateMap,
        groupTemplateMap: palGroupTemplateMap,
        layout: $(go.GridLayout,
          {
            cellSize: new go.Size(1, 1),
            spacing: new go.Size(5, 5),
            comparer: keyCompare
          })
      });

  // initialize the third Palette, random other stuff
  const myPaletteLevel3 =
    new go.Palette('myPaletteLevel3',
      { // share the templates with the main Diagram
        nodeTemplateMap: palNodeTemplateMap,
        groupTemplateMap: palGroupTemplateMap,
        layout: $(go.GridLayout,
          {
            cellSize: new go.Size(1, 1),
            spacing: new go.Size(5, 5),
            comparer: keyCompare
          })
      });

  (jQuery('#accordion') as any).accordion({
    activate: function (event: go.InputEvent, ui: any) {
      myPaletteLevel1.requestUpdate();
      myPaletteLevel2.requestUpdate();
    }
  });

  myPaletteLevel1.model = $(go.GraphLinksModel,
    {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        // -------------------------- Event Nodes
        { key: 101, category: 'event', text: 'Start', eventType: 1, eventDimension: 1, item: 'start' },
        { key: 102, category: 'event', text: 'Message', eventType: 2, eventDimension: 2, item: 'Message' }, // BpmnTaskMessage
        { key: 103, category: 'event', text: 'Timer', eventType: 3, eventDimension: 3, item: 'Timer' },
        { key: 104, category: 'event', text: 'End', eventType: 1, eventDimension: 8, item: 'End' },
        { key: 107, category: 'event', text: 'Message', eventType: 2, eventDimension: 8, item: 'Message' }, // BpmnTaskMessage
        { key: 108, category: 'event', text: 'Terminate', eventType: 13, eventDimension: 8, item: 'Terminate' },
        // -------------------------- Task/Activity Nodes
        { key: 131, category: 'activity', text: 'Task', item: 'generic task', taskType: 0 },
        { key: 132, category: 'activity', text: 'User Task', item: 'User task', taskType: 2 },
        { key: 133, category: 'activity', text: 'Service\nTask', item: 'service task', taskType: 6 },
        // subprocess and start and end
        { key: 134, category: 'subprocess', loc: '0 0', text: 'Subprocess', isGroup: true, isSubProcess: true, taskType: 0 },
        { key: -802, category: 'event', loc: '0 0', group: 134, text: 'Start', eventType: 1, eventDimension: 1, item: 'start' },
        { key: -803, category: 'event', loc: '350 0', group: 134, text: 'End', eventType: 1, eventDimension: 8, item: 'end', name: 'end' },
        // -------------------------- Gateway Nodes, Data, Pool and Annotation
        { key: 201, category: 'gateway', text: 'Parallel', gatewayType: 1 },
        { key: 204, category: 'gateway', text: 'Exclusive', gatewayType: 4 },
        { key: 301, category: 'dataobject', text: 'Data\nObject' },
        { key: 302, category: 'datastore', text: 'Data\nStorage' },
        { key: 401, category: 'privateProcess', text: 'Black Box' },
        { key: '501', 'text': 'Pool 1', 'isGroup': 'true', 'category': 'Pool' },
        { key: 'Lane5', 'text': 'Lane 1', 'isGroup': 'true', 'group': '501', 'color': 'lightyellow', 'category': 'Lane' },
        { key: 'Lane6', 'text': 'Lane 2', 'isGroup': 'true', 'group': '501', 'color': 'lightgreen', 'category': 'Lane' },
        { key: 701, category: 'annotation', text: 'note' }
      ]  // end nodeDataArray
    });  // end model

  // an activity with a boundary event:
  //        {
  //          key: 1,
  //          category: "activity",
  //          text: "Message",
  //          taskType: 1,
  //          item: "Message Task",
  //          boundaryEventArray: [{ "portId": "be0", alignmentIndex: 0, eventType: 2, color: "white" }]   // portId # and alignmentIndex should match
  //        },

  myPaletteLevel2.model = $(go.GraphLinksModel,
    {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 1, category: 'activity', taskType: 1, text: 'Receive Task', item: 'Receive Task' },
        { key: 2, category: 'activity', taskType: 5, text: 'Send Task', item: 'Send Task' },
        { key: 3, category: 'activity', taskType: 7, text: 'Business\nRule Task', item: 'Business Rule Task' },
        { key: 4, category: 'activity', taskType: 2, text: 'User Task', item: 'User Task', isCall: true },

        { key: 101, text: 'Adhoc\nSubprocess', isGroup: true, isSubProcess: true, category: 'subprocess', isAdHoc: true, taskType: 0, loc: '0 0' },
        { key: -812, group: 101, category: 'event', text: 'Start', eventType: 1, eventDimension: 1, item: 'start', loc: '0 0' },
        { key: -813, group: 101, category: 'event', text: 'End', eventType: 1, eventDimension: 8, item: 'end', name: 'end' },

        { key: 102, text: 'Transactional\nSubprocess', isGroup: true, isSubProcess: true, category: 'subprocess', isTransaction: true, taskType: 0, loc: '0 0' },
        { key: -822, group: 102, category: 'event', text: 'Start', eventType: 1, eventDimension: 1, item: 'start', loc: '0 0' },
        { key: -823, group: 102, category: 'event', text: 'End', eventType: 1, eventDimension: 8, item: 'end', name: 'end', loc: '350 0' },

        { key: 103, text: 'Looping\nActivity', isGroup: true, isLoop: true, isSubProcess: true, category: 'subprocess', taskType: 0, loc: '0 0' },
        { key: -831, group: 103, category: 'event', text: 'Start', eventType: 1, eventDimension: 1, item: 'start', loc: '0 0' },
        { key: -832, group: 103, category: 'event', text: 'End', eventType: 1, eventDimension: 8, item: 'end', name: 'end', loc: '350 0' },

        { key: 104, text: 'Multi-Instance\nActivity', isGroup: true, isSubProcess: true, isParallel: true, category: 'subprocess', taskType: 0, loc: '0 0' },
        { key: -841, group: 104, category: 'event', text: 'Start', eventType: 1, eventDimension: 1, item: 'start', loc: '0 0' },
        { key: -842, group: 104, category: 'event', text: 'End', eventType: 1, eventDimension: 8, item: 'end', name: 'end', loc: '350 0' },

        { key: 105, text: 'Call\nSubprocess', isGroup: true, isSubProcess: true, category: 'subprocess', isCall: true, taskType: 0, loc: '0 0' },
        { key: -861, group: 105, category: 'event', text: 'Start', eventType: 1, eventDimension: 1, item: 'start', loc: '0 0' },
        { key: -862, group: 105, category: 'event', text: 'End', eventType: 1, eventDimension: 8, item: 'end', name: 'end', loc: '350 0' },

        // gateway nodes
        { key: 301, category: 'gateway', gatewayType: 2, text: 'Inclusive' },
        { key: 302, category: 'gateway', gatewayType: 5, text: 'Event\nGateway' },

        // events
        { key: 401, category: 'event', eventType: 5, eventDimension: 1, text: 'Conditional\nStart', item: 'BpmnEventConditional' },
        { key: 402, category: 'event', eventType: 10, eventDimension: 1, text: 'Signal\nStart', item: 'BpmnEventSignal' },  // start signal
        { key: 403, category: 'event', eventType: 10, eventDimension: 8, text: 'Signal\nEnd', item: 'end signal' },
        { key: 404, category: 'event', eventType: 7, eventDimension: 8, text: 'Error', item: 'BpmnEventError' },
        { key: 405, category: 'event', eventType: 4, eventDimension: 8, text: 'Escalation', item: 'BpmnEventEscalation' },
        // throwing / catching intermedicate events
        { key: 502, category: 'event', eventType: 6, eventDimension: 4, text: 'Catch\nLink', item: 'BpmnEventOffPage' },
        { key: 503, category: 'event', eventType: 6, eventDimension: 7, text: 'Throw\nLink', item: 'BpmnEventOffPage' },
        { key: 504, category: 'event', eventType: 2, eventDimension: 4, text: 'Catch\nMessage', item: 'Message' },
        { key: 505, category: 'event', eventType: 2, eventDimension: 7, text: 'Throw\nMessage', item: 'Message' },
        { key: 506, category: 'event', eventType: 5, eventDimension: 4, text: 'Catch\nConditional', item: '' },
        { key: 507, category: 'event', eventType: 3, eventDimension: 4, text: 'Catch\nTimer', item: '' },
        { key: 508, category: 'event', eventType: 4, eventDimension: 7, text: 'Throw\nEscalation', item: 'Escalation' },
        { key: 509, category: 'event', eventType: 10, eventDimension: 4, text: 'Catch\nSignal', item: '' },
        { key: 510, category: 'event', eventType: 10, eventDimension: 7, text: 'Throw\nSignal', item: '' }
      ]  // end nodeDataArray
    });  // end model

  myPaletteLevel3.model = $(go.GraphLinksModel,
    {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 108, category: 'event', eventType: 8, eventDimension: 5, text: 'Cancel', item: 'BpmnEventCancel' },
        { key: 109, category: 'event', eventType: 9, eventDimension: 5, text: 'Compensation', item: 'BpmnEventCompensation' },

        { key: 111, category: 'event', eventType: 11, eventDimension: 1, text: 'Multiple', item: 'Multiple' },
        { key: 112, category: 'event', eventType: 12, eventDimension: 1, text: 'Parallel', item: 'Parallel' },
        // activity nodes
        { key: 203, category: 'activity', taskType: 3, isAdHoc: true, text: 'Manual', item: 'Manual Task' },
        { key: 204, category: 'activity', taskType: 4, isSequential: true, text: 'Script', item: 'Script Task' },
        { key: 205, category: 'activity', taskType: 5, isParallel: true, text: 'Send Msg', item: 'Send Msg Task' },
        { key: 206, category: 'activity', taskType: 6, isLoop: true, isSubProcess: true, isTransaction: true, text: 'Service', item: 'service task' },

        // gateway nodes not in Level 1 or Level 2
        { key: 603, category: 'gateway', text: 'Complex', gatewayType: 3 },
        { key: 606, category: 'gateway', text: 'Exclusive Start', gatewayType: 6 },
        { key: 607, category: 'gateway', text: 'Parallel Start', gatewayType: 7 },

        {
          key: 4, category: 'activity', taskType: 2, text: 'User Task', item: 'User Task',
          isCall: true, isLoop: true, isParallel: true, isSequential: true
        }
      ]  // end nodeDataArray
    });  // end model

  // ------------------------------------------  Overview   ----------------------------------------------

  const myOverview =
    new go.Overview('myOverviewDiv',
      { observed: myDiagram, maxScale: 0.5, contentAlignment: go.Spot.Center });
  // change color of viewport border in Overview
  (myOverview.box.elt(0) as go.Shape).stroke = 'dodgerblue';

  // start with a simple preset model:
  loadJSON('BPMNdata/OMG BPMN by Example Figure 5.1.json');

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
} // end init


// ------------------------------------------  pools / lanes   ----------------------------------------------

// swimlanes
const MINLENGTH = 400;  // this controls the minimum length of any swimlane
const MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

// some shared functions

// this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
function relayoutDiagram() {
  myDiagram.layout.invalidateLayout();
  myDiagram.findTopLevelGroups().each(function (g) { if (g.category === 'Pool' && g.layout !== null) g.layout.invalidateLayout(); });
  myDiagram.layoutDiagram();
}

// compute the minimum size of a Pool Group needed to hold all of the Lane Groups
function computeMinPoolSize(pool: go.Group) {
  // assert(pool instanceof go.Group && pool.category === "Pool");
  let len = MINLENGTH;
  pool.memberParts.each(function (lane) {
    // pools ought to only contain lanes, not plain Nodes
    if (!(lane instanceof go.Group)) return;
    const holder = lane.placeholder;
    if (holder !== null) {
      const sz = holder.actualBounds;
      len = Math.max(len, sz.width);
    }
  });
  return new go.Size(len, NaN);
}

// compute the minimum size for a particular Lane Group
function computeLaneSize(lane: go.Group) {
  // assert(lane instanceof go.Group && lane.category !== "Pool");
  const sz = computeMinLaneSize(lane);
  if (lane.isSubGraphExpanded) {
    const holder = lane.placeholder;
    if (holder !== null) {
      const hsz = holder.actualBounds;
      sz.height = Math.max(sz.height, hsz.height);
    }
  }
  // minimum breadth needs to be big enough to hold the header
  const hdr = lane.findObject('HEADER');
  if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height);
  return sz;
}

// determine the minimum size of a Lane Group, even if collapsed
function computeMinLaneSize(lane: go.Group) {
  if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
  return new go.Size(MINLENGTH, MINBREADTH);
}


// define a custom ResizingTool to limit how far one can shrink a lane Group
class LaneResizingTool extends go.ResizingTool {
  public isLengthening() {
    return (this.handle !== null && this.handle.alignment === go.Spot.Right);
  }

  public computeMinSize(): go.Size {
    if (this.adornedObject === null) return new go.Size(MINLENGTH, MINBREADTH);
    const lane = this.adornedObject.part;
    if (!(lane instanceof go.Group)) return go.ResizingTool.prototype.computeMinSize.call(this);
    // assert(lane instanceof go.Group && lane.category !== "Pool");
    const msz = computeMinLaneSize(lane);  // get the absolute minimum size
    if (lane.containingGroup !== null && this.isLengthening()) {  // compute the minimum length of all lanes
      const sz = computeMinPoolSize(lane.containingGroup);
      msz.width = Math.max(msz.width, sz.width);
    } else {  // find the minimum size of this single lane
      const sz = computeLaneSize(lane);
      msz.width = Math.max(msz.width, sz.width);
      msz.height = Math.max(msz.height, sz.height);
    }
    return msz;
  }

  public resize(newr: go.Rect): void {
    if (this.adornedObject === null) return;
    const lane = this.adornedObject.part;
    if (!(lane instanceof go.Group)) return go.ResizingTool.prototype.resize.call(this, newr);
    if (lane instanceof go.Group && lane.containingGroup !== null && this.isLengthening()) {  // changing the length of all of the lanes
      lane.containingGroup.memberParts.each((l) => {
        if (!(l instanceof go.Group)) return;
        const shape = l.resizeObject;
        if (shape !== null) {  // set its desiredSize length, but leave each breadth alone
          shape.width = newr.width;
        }
      });
    } else {  // changing the breadth of a single lane
      super.resize.call(this, newr);
    }
    relayoutDiagram();  // now that the lane has changed size, layout the pool again
  }
}
// end LaneResizingTool class


// define a custom grid layout that makes sure the length of each lane is the same
// and that each lane is broad enough to hold its subgraph
class PoolLayout extends go.GridLayout {
  public cellSize = new go.Size(1, 1);
  public wrappingColumn = 1;
  public wrappingWidth = Infinity;
  public isRealtime = false;  // don't continuously layout while dragging
  public alignment = go.GridLayout.Position;
  // This sorts based on the location of each Group.
  // This is useful when Groups can be moved up and down in order to change their order.
  public comparer = function (a: go.Part, b: go.Part) {
    const ay = a.location.y;
    const by = b.location.y;
    if (isNaN(ay) || isNaN(by)) return 0;
    if (ay < by) return -1;
    if (ay > by) return 1;
    return 0;
  };
  public doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
    const diagram = this.diagram;
    if (diagram === null) return;
    diagram.startTransaction('PoolLayout');
    const pool = this.group;
    if (pool !== null && pool.category === 'Pool') {
      // make sure all of the Group Shapes are big enough
      const minsize = computeMinPoolSize(pool);
      pool.memberParts.each(function (lane) {
        if (!(lane instanceof go.Group)) return;
        if (lane.category !== 'Pool') {
          const shape = lane.resizeObject;
          if (shape !== null) {  // change the desiredSize to be big enough in both directions
            const sz = computeLaneSize(lane);
            shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
            shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
            const cell = lane.resizeCellSize;
            if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
            if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
          }
        }
      });
    }
    // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
    super.doLayout.call(this, coll);
    diagram.commitTransaction('PoolLayout');
  }
}
// end PoolLayout class

// ------------------------------------------  Commands for this application  ----------------------------------------------

// Add a port to the specified side of the selected nodes.   name is beN  (be0, be1)
// evDim is 5 for Interrupting, 6 for non-Interrupting
export function addActivityNodeBoundaryEvent(evType: number, evDim: number) {
  myDiagram.startTransaction('addBoundaryEvent');
  myDiagram.selection.each(function (node) {
    // skip any selected Links
    if (!(node instanceof go.Node)) return;
    if (node.data && (node.data.category === 'activity' || node.data.category === 'subprocess')) {
      // compute the next available index number for the side
      let i = 0;
      const defaultPort = node.findPort('');
      while (node.findPort('be' + i.toString()) !== defaultPort) i++;           // now this new port name is unique within the whole Node because of the side prefix
      const name = 'be' + i.toString();
      if (!node.data.boundaryEventArray) { myDiagram.model.setDataProperty(node.data, 'boundaryEventArray', []); }       // initialize the Array of port data if necessary
      // create a new port data object
      const newportdata = {
        portId: name,
        eventType: evType,
        eventDimension: evDim,
        color: 'white',
        alignmentIndex: i
        // if you add port data properties here, you should copy them in copyPortData above  ** BUG...  we don't do that.
      };
      // and add it to the Array of port data
      myDiagram.model.insertArrayItem(node.data.boundaryEventArray, -1, newportdata);
    }
  });
  myDiagram.commitTransaction('addBoundaryEvent');
}

// changes the item of the object
export function rename(obj: go.GraphObject) {
  if (obj === null || obj.part === null || obj.part.data === null) return;
  myDiagram.startTransaction('rename');
  const newName = prompt('Rename ' + obj.part.data.item + ' to:');
  myDiagram.model.setDataProperty(obj.part.data, 'item', newName);
  myDiagram.commitTransaction('rename');
}

// shows/hides gridlines
// to be implemented onclick of a button
export function updateGridOption() {
  myDiagram.startTransaction('grid');
  const grid = document.getElementById('grid') as any;
  myDiagram.grid.visible = grid.checked;
  myDiagram.commitTransaction('grid');
}

// enables/disables snapping tools, to be implemented by buttons
export function updateSnapOption() {
  // no transaction needed, because we are modifying tools for future use
  const snap = document.getElementById('snap') as any;
  if (snap.checked) {
    myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
    myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;
  } else {
    myDiagram.toolManager.draggingTool.isGridSnapEnabled = false;
    myDiagram.toolManager.resizingTool.isGridSnapEnabled = false;
  }
}

// user specifies the amount of space between nodes when making rows and column
export function askSpace(): number {
  const space = parseFloat(prompt('Desired space between nodes (in pixels):') || '0');
  return space;
}

const UnsavedFileName = '(Unsaved File)';

export function getCurrentFileName(): string {
  const currentFile = document.getElementById('currentFile') as HTMLDivElement;
  const name = currentFile.textContent || '';
  if (name && name[name.length - 1] === '*') return name.slice(0, -1);
  return name;
}

export function setCurrentFileName(name: string) {
  const currentFile = document.getElementById('currentFile') as HTMLDivElement;
  if (myDiagram.isModified) {
    name += '*';
  }
  currentFile.textContent = name;
}

export function newDocument() {
  // checks to see if all changes have been saved
  if (myDiagram.isModified) {
    const save = confirm('Would you like to save changes to ' + getCurrentFileName() + '?');
    if (save) {
      saveDocument();
    }
  }
  setCurrentFileName(UnsavedFileName);
  // loads an empty diagram
  myDiagram.model = new go.GraphLinksModel();
  resetModel();
}

export function resetModel() {
  myDiagram.model.undoManager.isEnabled = true;
  (myDiagram.model as go.GraphLinksModel).linkFromPortIdProperty = 'fromPort';
  (myDiagram.model as go.GraphLinksModel).linkToPortIdProperty = 'toPort';

  myDiagram.model.copiesArrays = true;
  myDiagram.model.copiesArrayObjects = true;
  myDiagram.isModified = false;
}

export function checkLocalStorage() {
  return (typeof (Storage) !== 'undefined') && (window.localStorage !== undefined);
}

// saves the current floor plan to local storage
export function saveDocument() {
  if (checkLocalStorage()) {
    const saveName = getCurrentFileName();
    if (saveName === UnsavedFileName) {
      saveDocumentAs();
    } else {
      saveDiagramProperties();
      window.localStorage.setItem(saveName, myDiagram.model.toJson());
      myDiagram.isModified = false;
    }
  }
}

// saves floor plan to local storage with a new name
export function saveDocumentAs() {
  if (checkLocalStorage()) {
    const saveName = prompt('Save file as...') || getCurrentFileName();
    if (saveName && saveName !== UnsavedFileName) {
      setCurrentFileName(saveName);
      saveDiagramProperties();
      window.localStorage.setItem(saveName, myDiagram.model.toJson());
      myDiagram.isModified = false;
    }
  }
}

// checks to see if all changes have been saved -> shows the open HTML element
export function openDocument() {
  if (checkLocalStorage()) {
    if (myDiagram.isModified) {
      const save = confirm('Would you like to save changes to ' + getCurrentFileName() + '?');
      if (save) {
        saveDocument();
      }
    }
    openElement('openDocument', 'mySavedFiles');
  }
}

// shows the remove HTML element
export function removeDocument() {
  if (checkLocalStorage()) {
    openElement('removeDocument', 'mySavedFiles2');
  }
}

// these functions are called when panel buttons are clicked

export function loadFile() {
  const listbox = document.getElementById('mySavedFiles') as any;
  // get selected filename
  let fileName;
  for (let i = 0; i < listbox.options.length; i++) {
    if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
  }
  if (fileName !== undefined) {
    // changes the text of "currentFile" to be the same as the floor plan now loaded
    setCurrentFileName(fileName);
    // actually load the model from the JSON format string
    const savedFile = window.localStorage.getItem(fileName) || '';
    myDiagram.model = go.Model.fromJson(savedFile);
    loadDiagramProperties();
    myDiagram.model.undoManager.isEnabled = true;
    myDiagram.isModified = false;
    // eventually loadDiagramProperties will be called to finish
    // restoring shared saved model/diagram properties
  }
  closeElement('openDocument');
}

export function loadJSON(file: string) {
  jQuery.getJSON(file, function (jsondata: string) {
    // set these kinds of Diagram properties after initialization, not now
    myDiagram.addDiagramListener('InitialLayoutCompleted', loadDiagramProperties);  // defined below
    // create the model from the data in the JavaScript object parsed from JSON text
    // myDiagram.model = new go.GraphLinksModel(jsondata["nodes"], jsondata["links"]);
    myDiagram.model = go.Model.fromJson(jsondata);
    loadDiagramProperties();
    myDiagram.model.undoManager.isEnabled = true;
    myDiagram.isModified = false;
  });
}

// Store shared model state in the Model.modelData property
// (will be loaded by loadDiagramProperties)
export function saveDiagramProperties() {
  myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
}

// Called by loadFile and loadJSON.
export function loadDiagramProperties(e?: go.DiagramEvent) {
  // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
  const pos = myDiagram.model.modelData.position;
  if (pos) myDiagram.initialPosition = go.Point.parse(pos);
}


// deletes the selected file from local storage
export function removeFile() {
  const listbox = document.getElementById('mySavedFiles2') as any;
  if (listbox === null) return;
  // get selected filename
  let fileName;
  for (let i = 0; i < listbox.options.length; i++) {
    if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
  }
  if (fileName !== undefined) {
    // removes file from local storage
    window.localStorage.removeItem(fileName);
    // the current document remains open, even if its storage was deleted
  }
  closeElement('removeDocument');
}

export function updateFileList(id: string) {
  // displays cached floor plan files in the listboxes
  const listbox = document.getElementById(id) as any;
  if (listbox === null) return;
  // remove any old listing of files
  let last;
  while (last = listbox.lastChild) listbox.removeChild(last);
  // now add all saved files to the listbox
  for (const key in window.localStorage) {
    const storedFile = window.localStorage.getItem(key);
    if (!storedFile) continue;
    const option = document.createElement('option');
    option.value = key;
    option.text = key;
    listbox.add(option, null);
  }
}

export function openElement(id: string, listid: string) {
  const panel = document.getElementById(id);
  if (panel !== null && panel.style.visibility === 'hidden') {
    updateFileList(listid);
    panel.style.visibility = 'visible';
  }
}

// hides the open/remove elements when the "cancel" button is pressed
export function closeElement(id: string) {
  const panel = document.getElementById(id);
  if (panel !== null && panel.style.visibility === 'visible') {
    panel.style.visibility = 'hidden';
  }
}

export function undo() { myDiagram.commandHandler.undo(); }
export function redo() { myDiagram.commandHandler.redo(); }
export function cutSelection() { myDiagram.commandHandler.cutSelection(); }
export function copySelection() { myDiagram.commandHandler.copySelection(); }
export function pasteSelection() { myDiagram.commandHandler.pasteSelection(); }
export function deleteSelection() { myDiagram.commandHandler.deleteSelection(); }
export function selectAll() { myDiagram.commandHandler.selectAll(); }
export function alignLeft() { (myDiagram.commandHandler as DrawCommandHandler).alignLeft(); }
export function alignRight() { (myDiagram.commandHandler as DrawCommandHandler).alignRight(); }
export function alignTop() { (myDiagram.commandHandler as DrawCommandHandler).alignTop(); }
export function alignBottom() { (myDiagram.commandHandler as DrawCommandHandler).alignBottom(); }
export function alignCemterX() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterX(); }
export function alignCenterY() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterY(); }
export function alignRows() { (myDiagram.commandHandler as DrawCommandHandler).alignRow(askSpace()); }
export function alignColumns() { (myDiagram.commandHandler as DrawCommandHandler).alignColumn(askSpace()); }
export function basicOrderProcess() { loadJSON('BPMNdata/BasicOrderProcess.json'); }
export function BPMNdata51() { loadJSON('BPMNdata/OMG BPMN by Example Figure 5.1.json'); }
export function BPMNdata52() { loadJSON('BPMNdata/OMG BPMN by Example Figure 5.2.json'); }
export function BPMNdata53() { loadJSON('BPMNdata/OMG BPMN by Example Figure 5.3.json'); }
export function cancel1() { closeElement('openDocument'); }
export function cancel2() { closeElement('removeDocument'); }
