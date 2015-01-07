"use strict";
/*
*  Copyright (C) 1998-2015 by Northwoods Software Corporation. All Rights Reserved.
*/

function init() {
  if (typeof (Storage) === "undefined") {
    var currentFile = document.getElementById("currentFile");
    currentFile.textContent = "Sorry! No web storage support.\nIf you're using Internet Explorer, you must load the page from a server for local storage to work.";
  }

  // hides open HTML Element
  var openDocument = document.getElementById("openDocument");
  openDocument.style.visibility = "hidden";
  // hides remove HTML Element
  var removeDocument = document.getElementById("removeDocument");
  removeDocument.style.visibility = "hidden";

  var $ = go.GraphObject.make;  // for more concise visual tree definitions

  // constants for design choices
  var gradYellow = $(go.Brush, go.Brush.Linear, { 0: "LightGoldenRodYellow ", 1: "#FFFF66" });
  var paper = $(go.Brush, go.Brush.Linear, { 0: "OldLace", 1: "PapayaWhip" });
  var gradLightGreen = $(go.Brush, go.Brush.Linear, { 0: "#E0FEE0", 1: "PaleGreen" });
  var gradLightGray = $(go.Brush, go.Brush.Linear, { 0: "White", 1: "#DADADA" });

  var activityNodeFill = paper;
  var activityNodeStroke = "#CDAA7D";
  var activityMarkerStrokeWidth = 1.5;
  var activityNodeWidth = 120;
  var activityNodeHeight = 80;
  var activityNodeStrokeWidth = 1;
  var activityNodeStrokeWidthIsCall = 4;

  var subprocessNodeFill = activityNodeFill;
  var subprocessNodeStroke = activityNodeStroke;

  var eventNodeSize = 42;
  var eventNodeInnerSize = eventNodeSize - 6;
  var eventNodeSymbolSize = eventNodeInnerSize - 14;
  var EventEndOuterFillColor = "pink";
  var EventBackgroundColor = gradLightGreen;
  var EventSymbolLightFill = "white";
  var EventSymbolDarkFill = "dimgray";
  var EventDimensionStrokeColor = "green";
  var EventDimensionStrokeEndColor = "red";
  var eventNodeStrokeWidthIsEnd = 4;

  var gatewayNodeSize = 80;
  var gatewayNodeSymbolSize = 45;
  var gatewayNodeFill = gradYellow;
  var gatewayNodeStroke = "gold";
  var gatewayNodeSymbolStroke = "gold";
  var gatewayNodeSymbolFill = gradYellow;
  var gatewayNodeSymbolStrokeWidth = 3;

  var dataFill = gradLightGray;

  window.myDiagram =
    $(go.Diagram, "myDiagram",
      {
        allowDrop: true,  // accept drops from palette

        commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js
        // default to having arrow keys move selected nodes
        "commandHandler.arrowKeyBehavior": "move",

        mouseDrop: function(e) {
          // when the selection is dropped in the diagram's background,
          // make sure the selected Parts no longer belong to any Group
          var ok = myDiagram.commandHandler.addTopLevelParts(myDiagram.selection, true);
          if (!ok) myDiagram.currentTool.doCancel();
        },

        linkingTool: new BPMNLinkingTool(), // defined in BPMNClasses.js
        "linkingTool.linkValidation": sameLevel,  // defined below
        "relinkingTool.linkValidation": sameLevel,

        // set these kinds of Diagram properties after initialization, not now
        "InitialLayoutCompleted": loadDiagramProperties  // defined below
      });

  // Custom Figures for Shapes

  go.Shape.defineFigureGenerator("Empty", function(shape, w, h) {
    return new go.Geometry();
  });

  var annotationStr = "M 150,0L 0,0L 0,600L 150,600 M 800,0";
  var annotationGeo = go.Geometry.parse(annotationStr);
  annotationGeo.normalize();
  go.Shape.defineFigureGenerator("Annotation", function(shape, w, h) {
    var geo = annotationGeo.copy();
    // calculate how much to scale the Geometry so that it fits in w x h
    var bounds = geo.bounds;
    var scale = Math.min(w / bounds.width, h / bounds.height);
    geo.scale(scale, scale);
    return geo;
  });

  var gearStr = "F M 391,5L 419,14L 444.5,30.5L 451,120.5L 485.5,126L 522,141L 595,83L 618.5,92L 644,106.5" +
    "L 660.5,132L 670,158L 616,220L 640.5,265.5L 658.122,317.809L 753.122,322.809L 770.122,348.309L 774.622,374.309" +
    "L 769.5,402L 756.622,420.309L 659.122,428.809L 640.5,475L 616.5,519.5L 670,573.5L 663,600L 646,626.5" +
    "L 622,639L 595,645.5L 531.5,597.5L 493.192,613.462L 450,627.5L 444.5,718.5L 421.5,733L 393,740.5L 361.5,733.5" +
    "L 336.5,719L 330,627.5L 277.5,611.5L 227.5,584.167L 156.5,646L 124.5,641L 102,626.5L 82,602.5L 78.5,572.5" +
    "L 148.167,500.833L 133.5,466.833L 122,432.5L 26.5,421L 11,400.5L 5,373.5L 12,347.5L 26.5,324L 123.5,317.5" +
    "L 136.833,274.167L 154,241L 75.5,152.5L 85.5,128.5L 103,105.5L 128.5,88.5001L 154.872,82.4758L 237,155" +
    "L 280.5,132L 330,121L 336,30L 361,15L 391,5 Z M 398.201,232L 510.201,275L 556.201,385L 505.201,491L 399.201,537" +
    "L 284.201,489L 242.201,385L 282.201,273L 398.201,232 Z";
  var gearGeo = go.Geometry.parse(gearStr);
  gearGeo.normalize();

  go.Shape.defineFigureGenerator("BpmnTaskService", function(shape, w, h) {
    var geo = gearGeo.copy();
    // calculate how much to scale the Geometry so that it fits in w x h
    var bounds = geo.bounds;
    var scale = Math.min(w / bounds.width, h / bounds.height);
    geo.scale(scale, scale);
    // text should go in the hand
    geo.spot1 = new go.Spot(0, 0.6, 10, 0);
    geo.spot2 = new go.Spot(1, 1);
    return geo;
  });

  var handGeo = go.Geometry.parse("F1M18.13,10.06 C18.18,10.07 18.22,10.07 18.26,10.08 18.91," +
    "10.20 21.20,10.12 21.28,12.93 21.36,15.75 21.42,32.40 21.42,32.40 21.42," +
    "32.40 21.12,34.10 23.08,33.06 23.08,33.06 22.89,24.76 23.80,24.17 24.72," +
    "23.59 26.69,23.81 27.19,24.40 27.69,24.98 28.03,24.97 28.03,33.34 28.03," +
    "33.34 29.32,34.54 29.93,33.12 30.47,31.84 29.71,27.11 30.86,26.56 31.80," +
    "26.12 34.53,26.12 34.72,28.29 34.94,30.82 34.22,36.12 35.64,35.79 35.64," +
    "35.79 36.64,36.08 36.72,34.54 36.80,33.00 37.17,30.15 38.42,29.90 39.67," +
    "29.65 41.22,30.20 41.30,32.29 41.39,34.37 42.30,46.69 38.86,55.40 35.75," +
    "63.29 36.42,62.62 33.47,63.12 30.76,63.58 26.69,63.12 26.69,63.12 26.69," +
    "63.12 17.72,64.45 15.64,57.62 13.55,50.79 10.80,40.95 7.30,38.95 3.80," +
    "36.95 4.24,36.37 4.28,35.35 4.32,34.33 7.60,31.25 12.97,35.75 12.97," +
    "35.75 16.10,39.79 16.10,42.00 16.10,42.00 15.69,14.30 15.80,12.79 15.96," +
    "10.75 17.42,10.04 18.13,10.06z ");
  handGeo.rotate(90, 0, 0);
  handGeo.normalize();
  go.Shape.defineFigureGenerator("BpmnTaskManual", function(shape, w, h) {
    var geo = handGeo.copy();
    // calculate how much to scale the Geometry so that it fits in w x h
    var bounds = geo.bounds;
    var scale = Math.min(w / bounds.width, h / bounds.height);
    geo.scale(scale, scale);
    // guess where text should go (in the hand)
    geo.spot1 = new go.Spot(0, 0.6, 10, 0);
    geo.spot2 = new go.Spot(1, 1);
    return geo;
  });


  // sets the qualities of the tooltip
  var tooltiptemplate =
    $(go.Adornment, go.Panel.Auto,
      $(go.Shape, "RoundedRectangle",
        { fill: "whitesmoke", stroke: "gray" }),
      $(go.TextBlock,
        { margin: 3, editable: true },
        new go.Binding("text", "", function (data) {
          if (data.item !== undefined) return data.item;
          return "(unnamed item)";
        }))
    );

  function nodeActivityTaskTypeConverter(s) {
    var tasks = ["Empty",
                  "BpmnTaskMessage",
                  "BpmnTaskUser",
                  "BpmnTaskManual",   // Custom hand symbol
                  "BpmnTaskScript",
                  "BpmnTaskMessage",  // should be black on white
                  "BpmnTaskService",  // Custom gear symbol
                  "InternalStorage"];
    if (s < tasks.length) return tasks[s];
    return "NotAllowed"; // error
  }

  // location of event on boundary of Activity is based on the index of the event in the boundaryEventArray
  function nodeActivityBESpotConverter(s) {
    var x = 10 + (eventNodeSize / 2);
    if (s === 0) return new go.Spot(0, 1, x, 0);    // bottom left
    if (s === 1) return new go.Spot(1, 1, -x, 0);   // bottom right
    if (s === 2) return new go.Spot(1, 0, -x, 0);   // top right
    return new go.Spot(1, 0, -x - (s - 2) * eventNodeSize, 0);    // top ... right-to-left-ish spread
  }

  function nodeActivityTaskTypeColorConverter(s) {
    return (s == 5) ? "dimgray" : "white";
  }

  function nodeEventTypeConverter(s) {  // order here from BPMN 2.0 poster
    var tasks = [ "NotAllowed",
                  "Empty",
                  "BpmnTaskMessage",
                  "BpmnEventTimer",
                  "BpmnEventEscalation",
                  "BpmnEventConditional",
                  "Arrow",
                  "BpmnEventError",
                  "ThinX",
                  "BpmnActivityCompensation",
                  "Triangle",
                  "Pentagon",
                  "ThickCross",
                  "Circle"];
    if (s < tasks.length) return tasks[s];
    return "NotAllowed"; // error
  }

  function nodeEventDimensionStrokeColorConverter(s) {
    if (s === 8) return EventDimensionStrokeEndColor;
    return EventDimensionStrokeColor;
  }

  function nodeEventDimensionSymbolFillConverter(s) {
    if (s <= 6) return EventSymbolLightFill;
    return EventSymbolDarkFill;
  }


  //------------------------------------------  Activity Node Boundary Events   ----------------------------------------------

  var boundaryEventMenu =  // context menu for each boundaryEvent on Activity node
  $(go.Adornment, "Vertical",
    $("ContextMenuButton",
      $(go.TextBlock, "Remove event"),
      // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
      { click: function(e, obj) { removeActivityNodeBoundaryEvent(obj.part.adornedObject); } })
   );

  // removing a boundary event doesn't not reposition other BE circles on the node
  // just reassigning alignmentIndex in remaining BE would do that.
  function removeActivityNodeBoundaryEvent(obj) {
    myDiagram.startTransaction("removeBoundaryEvent");
    var pid = obj.portId;
    var arr = obj.panel.itemArray;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].portId === pid) {
        myDiagram.model.removeArrayItem(arr, i);
        break;
      }
    }
    myDiagram.commitTransaction("removeBoundaryEvent");
  }

  var boundaryEventItemTemplate =
    $(go.Panel, "Spot",
       { contextMenu: boundaryEventMenu,
         alignmentFocus: go.Spot.Center,
         fromLinkable: true, toLinkable: false, cursor: "pointer", fromSpot: go.Spot.Bottom,
         fromMaxLinks: 1, toMaxLinks: 0
       },
       new go.Binding("portId", "portId"),
       new go.Binding("alignment", "alignmentIndex", nodeActivityBESpotConverter),
      $(go.Shape, "Circle",
        { desiredSize: new go.Size(eventNodeSize, eventNodeSize) },
        new go.Binding("fromSpot", "alignmentIndex",
          function(s) {
            //  nodeActivityBEFromSpotConverter, 0 & 1 go on bottom, all others on top of activity
            if (s < 2) return go.Spot.Bottom;
            return go.Spot.Top;
          }),
        new go.Binding("fill", "color")),
      $(go.Shape, "Circle",
          { alignment: go.Spot.Center,
            desiredSize: new go.Size(eventNodeInnerSize, eventNodeInnerSize), fill: null }),
      $(go.Shape, "NotAllowed",
          { alignment: go.Spot.Center,
            desiredSize: new go.Size(eventNodeSymbolSize, eventNodeSymbolSize), fill: "white" },
            new go.Binding("figure", "eventType", nodeEventTypeConverter)
        )
    );

  //------------------------------------------  Activity Node contextMenu   ----------------------------------------------

  var activityNodeMenu =
       $(go.Adornment, "Vertical",
         $("ContextMenuButton",
             $(go.TextBlock, "Add Email Event", { margin: 3 }),
             { click: function(e, obj) { addActivityNodeBoundaryEvent(2); } }),
         $("ContextMenuButton",
             $(go.TextBlock, "Add Timer Event", { margin: 3 }),
             { click: function(e, obj) { addActivityNodeBoundaryEvent(3); } }),
         $("ContextMenuButton",
             $(go.TextBlock, "Add Escalation Event", { margin: 3 }),
             { click: function(e, obj) { addActivityNodeBoundaryEvent(4); } }),
         $("ContextMenuButton",
             $(go.TextBlock, "Add Error Event", { margin: 3 }),
             { click: function(e, obj) { addActivityNodeBoundaryEvent(7); } }),
         $("ContextMenuButton",
             $(go.TextBlock, "Rename", { margin: 3 }),
             { click: function(e, obj) { rename(obj); } }));


  // sub-process,  loop, parallel, sequential, ad doc and compensation markers in horizontal array
  function makeSubButton(sub) {
    if (sub)
      return [$("SubGraphExpanderButton"), { name: "subExpandBtn", margin: 2, visible: false },
                   new go.Binding("visible", "isSubProcess")];
    return [];
  }

  // sub-process,  loop, parallel, sequential, ad doc and compensation markers in horizontal array
  function makeMarkerPanel(sub, scale) {
    return $(go.Panel, "Horizontal",
            { alignment: go.Spot.MiddleBottom, alignmentFocus: go.Spot.MiddleBottom },
            $(go.Shape, "BpmnActivityLoop",
              { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
              new go.Binding("visible", "isLoop")),
            $(go.Shape, "BpmnActivityParallel",
              { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
              new go.Binding("visible", "isParallel")),
            $(go.Shape, "BpmnActivitySequential",
              { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
              new go.Binding("visible", "isSequential")),
            $(go.Shape, "BpmnActivityAdHoc",
              { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
              new go.Binding("visible", "isAdHoc")),
            $(go.Shape, "BpmnActivityCompensation",
              { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth, fill: null },
              new go.Binding("visible", "isCompensation")),
            makeSubButton(sub)
          ); // end activity markers horizontal panel
  }

  var activityNodeTemplate =
  $(go.Node, "Spot",
     { locationObjectName: "SHAPE", locationSpot: go.Spot.Center,
       resizable: true, resizeObjectName: "PANEL",
       toolTip: tooltiptemplate,
       selectionAdorned: false,  // use a Binding on the Shape.stroke to show selection
       contextMenu: activityNodeMenu,
       itemTemplate: boundaryEventItemTemplate
     },
     new go.Binding("itemArray", "boundaryEventArray"),
     new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
     // move a selected part into the Foreground layer, so it isn"t obscured by any non-selected parts
     new go.Binding("layerName", "isSelected", function(s) { return s ? "Foreground" : ""; }).ofObject(),
    $(go.Panel, "Auto",
      { name: "PANEL",
        minSize: new go.Size(activityNodeWidth, activityNodeHeight),
        desiredSize: new go.Size(activityNodeWidth, activityNodeHeight)
      },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
       $(go.Panel, "Spot",
        $(go.Shape, "RoundedRectangle",  // the outside rounded rectangle
          { name: "SHAPE",
            fill: activityNodeFill, stroke: activityNodeStroke,
            parameter1: 10, // corner size
            portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer",
            fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides
          },
          new go.Binding("fill", "color"),
          new go.Binding("strokeWidth", "isCall",
            function(s) { return s ? activityNodeStrokeWidthIsCall : activityNodeStrokeWidth; })),
        $(go.Shape, "RoundedRectangle",  // the inner "Transaction" rounded rectangle
          { margin: 3,
            stretch: go.GraphObject.Fill,
            stroke: activityNodeStroke,
            parameter1: 8, fill: null, visible: false
          },
          new go.Binding("visible", "isTransaction")),
        // task icon
        $(go.Shape, "BpmnTaskScript",    // will be None, Script, Manual, Service, etc via converter
          { alignment: new go.Spot(0, 0, 5, 5), alignmentFocus: go.Spot.TopLeft,
            width: 22, height: 22
          },
          new go.Binding("fill", "taskType", nodeActivityTaskTypeColorConverter),
          new go.Binding("figure", "taskType", nodeActivityTaskTypeConverter)
          ), // end Task Icon
        makeMarkerPanel(false, 1) // sub-process,  loop, parallel, sequential, ad doc and compensation markers

      ),  // end main body rectangles spot panel
      $(go.TextBlock,  // the center text
        { alignment: go.Spot.Center, textAlign: "center", margin: 12,
          editable: true
        },
        new go.Binding("text").makeTwoWay())
      )
    );  // end go.Node

  // ---------------------------------------- template for Activity / Task node in Palette

  var palscale = 2;
  var activityNodeTemplateForPalette =
  $(go.Node, "Vertical",
     { locationObjectName: "SHAPE",
       locationSpot: go.Spot.Center,
       selectionAdorned: false
     },
    $(go.Panel, "Auto",
      { name: "PANEL",
        desiredSize: new go.Size(activityNodeWidth / palscale, activityNodeHeight / palscale)
      },
      $(go.Panel, "Spot",
        $(go.Shape, "RoundedRectangle",  // the outside rounded rectangle
          { name: "SHAPE",
            fill: activityNodeFill, stroke: activityNodeStroke,
            parameter1: 10 / palscale  // corner size (default 10)
          },
          new go.Binding("strokeWidth", "isCall",
            function(s) { return s ? activityNodeStrokeWidthIsCall : activityNodeStrokeWidth; })),
        $(go.Shape, "RoundedRectangle",  // the inner "Transaction" rounded rectangle
          { margin: 3,
            stretch: go.GraphObject.Fill,
            stroke: activityNodeStroke,
            parameter1: 8 / palscale, fill: null, visible: false
          },
          new go.Binding("visible", "isTransaction")),
        // task icon
        $(go.Shape, "BpmnTaskScript",    // will be None, Script, Manual, Service, etc via converter
          { alignment: new go.Spot(0, 0, 5, 5), alignmentFocus: go.Spot.TopLeft,
            width: 22 / palscale, height: 22 / palscale
          },
          new go.Binding("fill", "taskType", nodeActivityTaskTypeColorConverter),
          new go.Binding("figure", "taskType", nodeActivityTaskTypeConverter)),
        makeMarkerPanel(false, palscale) // sub-process,  loop, parallel, sequential, ad doc and compensation markers
        ) // End Spot panel
      ), // End Auto Panel
      $(go.TextBlock,  // the center text
        { alignment: go.Spot.Center, textAlign: "center", margin: 2 },
        new go.Binding("text"))
    );  // End Node


  var subProcessGroupTemplateForPalette =
  $(go.Group, "Vertical",
     { locationObjectName: "SHAPE",
       locationSpot: go.Spot.Center,
       isSubGraphExpanded: false,
       selectionAdorned: false
     },
    $(go.Panel, "Auto",
      { name: "PANEL",
        desiredSize: new go.Size(activityNodeWidth / palscale, activityNodeHeight / palscale)
      },
      $(go.Panel, "Spot",
        $(go.Shape, "RoundedRectangle",  // the outside rounded rectangle
              { name: "SHAPE",
                fill: activityNodeFill, stroke: activityNodeStroke,
                parameter1: 10 / palscale  // corner size (default 10)
              },
              new go.Binding("strokeWidth", "isCall", function(s) { return s ? activityNodeStrokeWidthIsCall : activityNodeStrokeWidth; })
            ),
        $(go.Shape, "RoundedRectangle",  // the inner "Transaction" rounded rectangle
          { margin: 3,
            stretch: go.GraphObject.Fill,
            stroke: activityNodeStroke,
            parameter1: 8 / palscale, fill: null, visible: false
          },
          new go.Binding("visible", "isTransaction")),
        $(go.Panel, "Horizontal",
          { alignment: go.Spot.MiddleBottom, alignmentFocus: go.Spot.MiddleBottom },
           $(go.Shape, "BpmnActivityLoop",
              { width: 12 / palscale, height: 12 / palscale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
                 new go.Binding("visible", "isLoop")),
            $(go.Shape, "BpmnActivityParallel",
              { width: 12 / palscale, height: 12 / palscale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
                 new go.Binding("visible", "isParallel")),
            $(go.Shape, "BpmnActivitySequential",
              { width: 12 / palscale, height: 12 / palscale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
                 new go.Binding("visible", "isSequential")),
            $(go.Shape, "BpmnActivityAdHoc",
              { width: 12 / palscale, height: 12 / palscale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth },
                 new go.Binding("visible", "isAdHoc")),
            $(go.Shape, "BpmnActivityCompensation",
              { width: 12 / palscale, height: 12 / palscale, margin: 2, visible: false, strokeWidth: activityMarkerStrokeWidth, fill: null },
                 new go.Binding("visible", "isCompensation")),
            // add a fake subgraph button (so we can scale it)
            $(go.Panel, "Auto", { margin: 2, visible: false },  // don't have a plus with a box around it, so make one from 2 parts
              $(go.Shape, "Rectangle",
                { width: 12 / palscale, height: 12 / palscale, strokeWidth: activityMarkerStrokeWidth, fill: null }),
              $(go.Shape, "PlusLine",
                { width: 8 / palscale, height: 8 / palscale, strokeWidth: activityMarkerStrokeWidth }),
                 new go.Binding("visible", "isSubProcess")
             )
          ) // end activity markers horizontal panel
        )
      ),  // end main body rectangles spot panel
      $(go.TextBlock,  // the center text
        { alignment: go.Spot.Center, textAlign: "center", margin: 2 },
        new go.Binding("text"))
    );  // end go.Group


  //------------------------------------------  Event Node Template   ----------------------------------------------

  var eventNodeTemplate =
    $(go.Node, "Vertical",
      { locationObjectName: "SHAPE",
        locationSpot: go.Spot.Center,
        toolTip: tooltiptemplate
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      // move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts
      new go.Binding("layerName", "isSelected", function(s) { return s ? "Foreground" : ""; }).ofObject(),
      // can be resided according to the user's desires
      { resizable: false, resizeObjectName: "SHAPE" },
        $(go.Panel, "Spot",
          $(go.Shape, "Circle",  // Outer circle
            { strokeWidth: 1,
              name: "SHAPE",
              desiredSize: new go.Size(eventNodeSize, eventNodeSize),
              portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
            },
            // allows the color to be determined by the node data
            new go.Binding("fill", "eventDimension", function(s) { return (s === 8) ? EventEndOuterFillColor : EventBackgroundColor; }),
            new go.Binding("strokeWidth", "eventDimension", function(s) { return s === 8 ? eventNodeStrokeWidthIsEnd : 1; }),
            new go.Binding("stroke", "eventDimension", nodeEventDimensionStrokeColorConverter),
            new go.Binding("strokeDashArray", "eventDimension", function(s) { return (s === 3 || s === 6) ? [4, 2] : null; }),
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
          ),  // end main shape
          $(go.Shape, "Circle",  // Inner circle
              { alignment: go.Spot.Center, desiredSize: new go.Size(eventNodeInnerSize, eventNodeInnerSize), fill: null },
              new go.Binding("stroke", "eventDimension", nodeEventDimensionStrokeColorConverter),
              new go.Binding("strokeDashArray", "eventDimension", function(s) { return (s === 3 || s === 6) ? [4, 2] : null; }), // dashes for non-interrupting
              new go.Binding("visible", "eventDimension", function(s) { return s > 3 && s <= 7; }) // inner  only visible for 4 thru 7
            ),
          $(go.Shape, "NotAllowed",
              { alignment: go.Spot.Center, desiredSize: new go.Size(eventNodeSymbolSize, eventNodeSymbolSize), stroke: "black" },
                new go.Binding("figure", "eventType", nodeEventTypeConverter),
                new go.Binding("fill", "eventDimension", nodeEventDimensionSymbolFillConverter)
            )
        ),  // end Auto Panel
        $(go.TextBlock,
          { alignment: go.Spot.Center, textAlign: "center", margin: 5, editable: true },
          new go.Binding("text").makeTwoWay())

      ); // end go.Node Vertical

  //------------------------------------------  Gateway Node Template   ----------------------------------------------

  function nodeGatewaySymbolTypeConverter(s) {
    var tasks =  ["NotAllowed",
                  "ThinCross",      // Parallel
                  "Circle",         // Inclusive
                  "AsteriskLine",   // Complex
                  "ThinX",          // Exclusive
                  "BpmnTaskManual",
                  "BpmnTaskUser",
                  "BpmnTaskMessage"]
    if (s < tasks.length) return tasks[s];
    return "NotAllowed"; // error
  }

  // tweak the size of some of the gateway icons
  function nodeGatewaySymbolSizeConverter(s) {
    var size = new go.Size(gatewayNodeSymbolSize, gatewayNodeSymbolSize);
    if (s === 4) {
      size.width = size.width / 4 * 3;
      size.height = size.height / 4 * 3;
    }
    return size;
  }
  function nodePalGatewaySymbolSizeConverter(s) {
    var size = nodeGatewaySymbolSizeConverter(s);
    size.width = size.width / 2;
    size.height = size.height / 2;
    return size;
  }

  var gatewayNodeTemplate =
    $(go.Node, "Vertical",
      { locationObjectName: "SHAPE",
        locationSpot: go.Spot.Center,
        toolTip: tooltiptemplate
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      // move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts
      new go.Binding("layerName", "isSelected", function(s) { return s ? "Foreground" : ""; }).ofObject(),
      // can be resided according to the user's desires
      { resizable: false, resizeObjectName: "SHAPE" },
        $(go.Panel, "Spot",
          $(go.Shape, "Diamond",
            { strokeWidth: 1, fill: gatewayNodeFill, stroke: gatewayNodeStroke,
              name: "SHAPE",
              desiredSize: new go.Size(gatewayNodeSize, gatewayNodeSize),
              portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer",
              fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides
            },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),  // end main shape
          $(go.Shape, "NotAllowed",
              { alignment: go.Spot.Center, stroke: gatewayNodeSymbolStroke, strokeWidth: gatewayNodeSymbolStrokeWidth, fill: gatewayNodeSymbolFill },
                new go.Binding("figure", "gatewayType", nodeGatewaySymbolTypeConverter),
                new go.Binding("desiredSize", "gatewayType", nodeGatewaySymbolSizeConverter))
        ),  // end Auto Panel
        $(go.TextBlock,
          { alignment: go.Spot.Center, textAlign: "center", margin: 5, editable: true },
          new go.Binding("text").makeTwoWay())
      ); // end go.Node Vertical

  //--------------------------------------------------------------------------------------------------------------

  var gatewayNodeTemplateForPalette =
    $(go.Node, "Vertical",
      { toolTip: tooltiptemplate,
        resizable: false,
        locationObjectName: "SHAPE",
        locationSpot: go.Spot.Center,
        resizeObjectName: "SHAPE" },
      $(go.Panel, "Spot",
        $(go.Shape, "Diamond",
          { strokeWidth: 1, fill: gatewayNodeFill, stroke: gatewayNodeStroke, name: "SHAPE",
            desiredSize: new go.Size(gatewayNodeSize / 2, gatewayNodeSize / 2)
          }),
        $(go.Shape, "NotAllowed",
            { alignment: go.Spot.Center, stroke: gatewayNodeSymbolStroke, strokeWidth: gatewayNodeSymbolStrokeWidth, fill: gatewayNodeSymbolFill },
              new go.Binding("figure", "gatewayType", nodeGatewaySymbolTypeConverter),
              new go.Binding("desiredSize", "gatewayType", nodePalGatewaySymbolSizeConverter))),
      $(go.TextBlock,
        { alignment: go.Spot.Center, textAlign: "center", margin: 5, editable: false },
        new go.Binding("text"))
    );

  //--------------------------------------------------------------------------------------------------------------

  var annotationNodeTemplate =
    $(go.Node, "Auto",
      { background: gradLightGray },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "Annotation", // A left bracket shape
        { portId: "", fromLinkable: true, cursor: "pointer", fromSpot: go.Spot.Left, strokeWidth: 2, stroke: "gray" }),
      $(go.TextBlock,
        { margin: 5, editable: true },
        new go.Binding("text").makeTwoWay())
    );

  var dataObjectNodeTemplate =
    $(go.Node, "Vertical",
      { locationObjectName: "SHAPE", locationSpot: go.Spot.Center },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "File",
        { name: "SHAPE", portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer",
          fill: dataFill, desiredSize: new go.Size(eventNodeSize * 0.8, eventNodeSize)}),
      $(go.TextBlock,
        { margin: 5,
          editable: true },
          new go.Binding("text").makeTwoWay())
    );

  var dataStoreNodeTemplate =
    $(go.Node, "Vertical",
      { locationObjectName: "SHAPE", locationSpot: go.Spot.Center },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "Database",
        { name: "SHAPE", portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer",
          fill: dataFill, desiredSize: new go.Size(eventNodeSize, eventNodeSize) }),
      $(go.TextBlock,
        { margin: 5, editable: true },
        new go.Binding("text").makeTwoWay())
    );

  //------------------------------------------  private process Node Template Map   ----------------------------------------------

  var privateProcessNodeTemplate =
    $(go.Node, "Auto",
      { layerName: "Background", resizable: true, resizeObjectName: "LANE" },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "Rectangle",
        { fill: null }),
      $(go.Panel, "Table",     // table with 2 cells to hold header and lane
        { desiredSize: new go.Size(activityNodeWidth * 6, activityNodeHeight),
          background: dataFill, name: "LANE", minSize: new go.Size(activityNodeWidth, activityNodeHeight * 0.667)
        },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.TextBlock,
          { row: 0, column: 0,
            angle: 270, margin: 5,
            editable: true, textAlign: "center"
          },
          new go.Binding("text").makeTwoWay()),
        $(go.RowColumnDefinition, { column: 1, separatorStrokeWidth: 1, separatorStroke: "black" }),
        $(go.Shape, "Rectangle",
          { row: 0, column: 1,
            stroke: null, fill: "transparent",
            portId: "", fromLinkable: true, toLinkable: true,
            fromSpot: go.Spot.TopBottomSides, toSpot: go.Spot.TopBottomSides,
            cursor: "pointer", stretch: go.GraphObject.Fill })
       )
    );

  var privateProcessNodeTemplateForPalette =
    $(go.Node, "Vertical",
      { locationSpot: go.Spot.Center },
      $(go.Shape, "Process",
        { fill: dataFill, desiredSize: new go.Size(gatewayNodeSize / 2, gatewayNodeSize / 4) }),
      $(go.TextBlock,
        { margin: 5, editable: true },
        new go.Binding("text"))
    );

  var subProcessGroupTemplate =
    $(go.Group, "Spot",
      { locationSpot: go.Spot.Center,
        locationObjectName: "PH",
        //locationSpot: go.Spot.Center,
        isSubGraphExpanded: false,
        mouseDrop:
        function(e, grp) {
          var ok = grp.addMembers(grp.diagram.selection, true);
          if (!ok) grp.diagram.currentTool.doCancel();
        },
        contextMenu: activityNodeMenu,
        itemTemplate: boundaryEventItemTemplate
      },
      new go.Binding("itemArray", "boundaryEventArray"),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      // move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts
      // new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(),
      $(go.Panel, "Auto",
        $(go.Shape, "RoundedRectangle",
            {
              name: "PH", fill: subprocessNodeFill, stroke: subprocessNodeStroke,
              minSize: new go.Size(activityNodeWidth, activityNodeHeight),
              portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
            },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            new go.Binding("strokeWidth", "isCall", function(s) { return s ? activityNodeStrokeWidthIsCall : activityNodeStrokeWidth; })
           ),
          $(go.Panel, "Vertical",
            { defaultAlignment: go.Spot.Left },
            $(go.TextBlock,  // label
              { margin: 3, editable: true },
              new go.Binding("text", "text")),
              new go.Binding("alignment", "isSubGraphExpanded", function(s) { return s ? go.Spot.TopLeft : go.Spot.Center; }),
            // create a placeholder to represent the area where the contents of the group are
            $(go.Placeholder,
              { padding: new go.Margin(10, 10) }),
            makeMarkerPanel(true, 1)  // sub-process,  loop, parallel, sequential, ad doc and compensation markers
          )  // end Vertical Panel
        )
      );  // end Group

  // square off the default button
  function fixExpandBtn(panel, subgraphBtn) {
    var sgBtn = panel.findObject(subgraphBtn);
    var border = sgBtn.findObject("ButtonBorder");
    if (border instanceof go.Shape) {
      border.figure = "Rectangle";
      border.spot1 = new go.Spot(0, 0, 2, 2);
      border.spot2 = new go.Spot(1, 1, -2, -2);
    }
  }
  fixExpandBtn(subProcessGroupTemplate, "subExpandBtn");

  var grouptemplmap = new go.Map("string", go.Group);
  grouptemplmap.add("subprocess", subProcessGroupTemplate);
  myDiagram.groupTemplateMap = grouptemplmap;

  //------------------------------------------  Node Template Map   ----------------------------------------------

  // create the nodeTemplateMap, holding main view node templates:
  var templmap = new go.Map("string", go.Node);
  // for each of the node categories, specify which template to use
  templmap.add("activity", activityNodeTemplate);
  templmap.add("event", eventNodeTemplate);
  templmap.add("gateway", gatewayNodeTemplate);
  templmap.add("annotation", annotationNodeTemplate);
  templmap.add("dataobject", dataObjectNodeTemplate);
  templmap.add("datastore", dataStoreNodeTemplate);
  templmap.add("privateProcess", privateProcessNodeTemplate);
  // for the default category, "", use the same template that Diagrams use by default
  // this just shows the key value as a simple TextBlock
  templmap.add("", myDiagram.nodeTemplate);

  myDiagram.nodeTemplateMap = templmap;

  // create the nodeTemplateMap, holding special palette "mini" node templates:
  var palTemplateMap = new go.Map("string", go.Node);
  palTemplateMap.add("activity", activityNodeTemplateForPalette);
  palTemplateMap.add("event", eventNodeTemplate);
  palTemplateMap.add("gateway", gatewayNodeTemplateForPalette);
  palTemplateMap.add("annotation", annotationNodeTemplate);
  palTemplateMap.add("dataobject", dataObjectNodeTemplate);
  palTemplateMap.add("datastore", dataStoreNodeTemplate);
  palTemplateMap.add("privateProcess", privateProcessNodeTemplateForPalette);

  var palGroupTemplateMap = new go.Map("string", go.Group);
  palGroupTemplateMap.add("subprocess", subProcessGroupTemplateForPalette);

  //------------------------------------------  Link Templates   ----------------------------------------------

  var sequenceLinkTemplate =
    $(go.Link,
      { contextMenu:
          $(go.Adornment, "Vertical",
            $("ContextMenuButton",
              $(go.TextBlock, "Default Flow"),
              // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
              { click: function(e, obj) { setSequenceLinkDefaultFlow(obj.part.adornedObject); } }),
            $("ContextMenuButton",
              $(go.TextBlock, "Conditional Flow"),
              // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
              { click: function(e, obj) { setSequenceLinkConditionalFlow(obj.part.adornedObject); } })
           ),
        routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10,
        reshapable: true, relinkableFrom: true, relinkableTo: true, toEndSegmentLength: 20
      },
      new go.Binding("points").makeTwoWay(),
      $(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 1 }),
      $(go.Shape, { toArrow: "Triangle", scale: 1.2, fill: "black", stroke: null }),
      $(go.Shape, { fromArrow: "", scale: 1.5, stroke: "black", fill: "white" },
                  new go.Binding("fromArrow", "isDefault", function(s) {
                    if (s === null) return "";
                    return s ? "BackSlash" : "StretchedDiamond"; }),
                  new go.Binding("segmentOffset", "isDefault", function(s) {
                    return s ? new go.Point(5, 0) : new go.Point(0, 0);
                  })),
      $(go.TextBlock, { // this is a Link label
        name: "Label", editable: true, text: "label", segmentOffset: new go.Point(-10, -10), visible: false
        },
        new go.Binding("text", "text").makeTwoWay(),
        new go.Binding("visible", "visible").makeTwoWay())
   );

  // set Default Sequence Flow (backslash From Arrow)
  function setSequenceLinkDefaultFlow(obj) {
    myDiagram.startTransaction("setSequenceLinkDefaultFlow");
    var model = myDiagram.model;
    model.setDataProperty(obj.data, "isDefault", true);
    // Set all other links from the fromNode to be isDefault=null
    obj.fromNode.findLinksOutOf().each(function(link) {
      if (link !== obj && link.data.isDefault) {
        model.setDataProperty(link.data, "isDefault", null);
      }
    });
    myDiagram.commitTransaction("setSequenceLinkDefaultFlow");
  }

  // set Conditional Sequence Flow (diamond From Arrow)
  function setSequenceLinkConditionalFlow(obj) {
    myDiagram.startTransaction("setSequenceLinkConditionalFlow");
    var model = myDiagram.model;
    model.setDataProperty(obj.data, "isDefault", false);
    myDiagram.commitTransaction("setSequenceLinkConditionalFlow");
  }

  var messageFlowLinkTemplate =
     $(PoolLink, // defined in BPMNClasses.js
       { routing: go.Link.Orthogonal, curve: go.Link.JumpGap, corner: 10,
         reshapable: true, relinkableTo: true, toEndSegmentLength: 20 },
       new go.Binding("points").makeTwoWay(),
       $(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 1, strokeDashArray: [6, 2] }),
       $(go.Shape, { toArrow: "Triangle", scale: 1, fill: "white", stroke: "black" }),
       $(go.Shape, { fromArrow: "Circle", scale: 1, visible: true, stroke: "black", fill: "white" }),
       $(go.TextBlock, {
         editable: true, text: "label"
       }, // Link label
       new go.Binding("text", "text").makeTwoWay())
    );

  var dataAssociationLinkTemplate =
    $(go.Link,
      { routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10,
        reshapable: true, relinkableFrom: true, relinkableTo: true },
      new go.Binding("points").makeTwoWay(),
      $(go.Shape, { stroke: "black", strokeWidth: 1, strokeDashArray: [1, 3] }),
      $(go.Shape, { toArrow: "OpenTriangle", scale: 1, fill: null, stroke: "blue" })
   );

  var annotationAssociationLinkTemplate =
    $(go.Link,
      { reshapable: true, relinkableFrom: true, relinkableTo: true,
        toEndSegmentLength: 20, fromEndSegmentLength: 40 },
      new go.Binding("points").makeTwoWay(),
      $(go.Shape, { stroke: "black", strokeWidth: 1, strokeDashArray: [1, 3] }),
      $(go.Shape, { toArrow: "OpenTriangle", scale: 1, stroke: "black" })
   );

  // in BPMN, can't like across subprocess boundaries.
  function sameLevel(fromnode, fromport, tonode, toport) {
    return fromnode.containingGroup === tonode.containingGroup;
  }

  var linkTemplateMap = new go.Map("string", go.Link);
  linkTemplateMap.add("msg", messageFlowLinkTemplate);
  linkTemplateMap.add("annotation", annotationAssociationLinkTemplate);
  linkTemplateMap.add("data", dataAssociationLinkTemplate);
  linkTemplateMap.add("", sequenceLinkTemplate);  // default

  myDiagram.linkTemplateMap = linkTemplateMap;

  //------------------------------------------  Diagram Listeners   ----------------------------------------------

  myDiagram.addDiagramListener("LinkDrawn", function(e) {
    if (e.subject.fromNode.category === "annotation") {
      e.subject.category = "annotation"; // annotation association
    } else if (e.subject.fromNode.category === "dataobject" || e.subject.toNode.category === "dataobject") {
      e.subject.category = "data"; // data association
    } else if (e.subject.fromNode.category === "datastore" || e.subject.toNode.category === "datastore") {
      e.subject.category = "data"; // data association
    }
  });

  myDiagram.addDiagramListener("ExternalObjectsDropped", function(e) {
    // e.subject is the collection that was just dropped
    e.subject.each(function(part) {
        if (part instanceof go.Node && part.data.item === "end") {
          part.moveTo(part.location.x  + 350, part.location.y)
        }
      });
    myDiagram.commandHandler.expandSubGraph();
  });

  // change the title to indicate that the diagram has been modified
  myDiagram.addDiagramListener("Modified", function(e) {
    var currentFile = document.getElementById("currentFile");
    var idx = currentFile.textContent.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) currentFile.textContent = currentFile.textContent + "*";
    } else {
      if (idx >= 0) currentFile.textContent = currentFile.textContent.substr(0, idx);
    }
  });


  //------------------------------------------  Palette   ----------------------------------------------

  // default structures
  var myPalette =
    $(go.Palette, "myPalette",
      { nodeTemplateMap: palTemplateMap,
        groupTemplateMap: palGroupTemplateMap,
        "contextMenuTool.isEnabled": false,  // but disable context menus
        allowZoom: false,
        layout: $(go.GridLayout, { cellSize: new go.Size(1, 1), spacing: new go.Size(5, 5) })
      });  // end Palette

  var level1 = $(go.GraphLinksModel,
    {
      nodeDataArray: [
        {
          key: 701,
          category: "annotation",
          text: "note"
        },
      // -------------------------- Event Nodes
      {
        key: 101,
        category: "event",
        text: "Start",
        eventType: 1,
        eventDimension: 1,
        item: "start"
      },
      {
        key: 102,
        category: "event",
        text: "Message",
        eventType: 2,  // BpmnTaskMessage
        eventDimension: 2,
        item: "Message"
      },
       {
         key: 103,
         category: "event",
         text: "Timer",
         eventType: 3,
         eventDimension: 3,
         item: "Timer"
       },
      {
        key: 104,
        category: "event",
        text: "End",
        eventType: 1,
        eventDimension: 8,
        item: "End"
      },
      {
        key: 105,
        category: "event",
        text: "Message",
        eventType: 2,  // BpmnTaskMessage
        eventDimension: 8,
        item: "Message"
      },
       {
         key: 106,
         category: "event",
         text: "Timer",
         eventType: 3,
         eventDimension: 8,
         item: "Timer"
       },
       {
         key: 5,
         category: "activity",
         text: "Task",
         item: "generic task",
         taskType: 0
       },
       {
         key: 6,
         category: "activity",
         text: "Service\nTask",
         item: "service task",
         taskType: 6
       },
       {
         key: 7,
         category: "activity",
         text: "User Task",
         item: "User task",
         taskType: 2
       },
        {
          key: 201,
          category: "gateway",
          text: "Parallel",
          gatewayType: 1
        },
        {
          key: 204,
          category: "gateway",
          text: "Exclusive",
          gatewayType: 4
        },
        {
          key: 301,
          category: "dataobject",
          text: "Data\nObject"
        },
        {
          key: 302,
          category: "datastore",
          text: "Data\nStorage"
        },
        {
          key: 777,
          category: "privateProcess",
          text: "Process"
        },
        {
          key: 1,
          category: "activity",
          text: "Message",
          taskType: 1,
          item: "Message Task",
          boundaryEventArray: [{ "portId": "be0", alignmentIndex: 0, eventType: 2, color: "white" }]   // portId # and alignmentIndex should match
        },

        { key: 801, loc: "0 0", text: "Subprocess", isGroup: true, isSubProcess: true, category: "subprocess", taskType: 0 },
        { key: -802, loc: "0 0", group: 801, category: "event", text: "Start", eventType: 1, eventDimension: 1, item: "start" },
        { key: -803, loc: "350 0", group: 801, category: "event", text: "End", eventType: 1, eventDimension: 8, item: "end", name: "end" }

      ]  // end nodeDataArray
    });  // end model

  myPalette.model = level1;

  var level2 = [
    { key: 1, category: "activity", taskType: 1, text: "Message", item: "Message Task" },
    { key: 2, category: "activity", taskType: 2, isCompensation: true, text: "User", item: "User Task",
      isCall: true, isLoop: true, isParallel: true, isSequential: true
    },
    { key: 811, loc: "0 0", text: "Adhoc\nSubprocess", isGroup: true, isSubProcess: true, category: "subprocess", isAdHoc: true, taskType: 0 },
    { key: -812, loc: "0 0", group: 811, category: "event", text: "Start", eventType: 1, eventDimension: 1, item: "start" },
    { key: -813, loc: "350 0", group: 811, category: "event", text: "End", eventType: 1, eventDimension: 8, item: "end", name: "end" },

    { key: 821, loc: "0 0", text: "Transactional\nSubprocess", isGroup: true, isSubProcess: true, category: "subprocess", isTransaction: true, taskType: 0 },
    { key: -822, loc: "0 0", group: 821, category: "event", text: "Start", eventType: 1, eventDimension: 1, item: "start" },
    { key: -823, loc: "350 0", group: 821, category: "event", text: "End", eventType: 1, eventDimension: 8, item: "end", name: "end" },

    { key: 831, loc: "0 0", text: "Call Subprocess", isGroup: true, isSubProcess: true, category: "subprocess", isCall: true, taskType: 0 },
    { key: -832, loc: "0 0", group: 831, category: "event", text: "Start", eventType: 1, eventDimension: 1, item: "start" },
    { key: -833, loc: "350 0", group: 831, category: "event", text: "End", eventType: 1, eventDimension: 8, item: "end", name: "end" }
  ];

  for (var i = 0; i < level2.length; i++) {
    myPalette.model.addNodeData(level2[i]);
  }

  var debugPalette = [
    { key: 101, category: "event", eventType: 4, eventDimension: 8, text: "Escalation", item: "BpmnEventEscalation" },
    { key: 102, category: "event", eventType: 5, eventDimension: 5, text: "Conditional", item: "BpmnEventConditional" },
    { key: 105, category: "event", eventType: 6, eventDimension: 4, text: "OffPage", item: "BpmnEventOffPage" },
    { key: 106, category: "event", eventType: 6, eventDimension: 7, text: "OffPage", item: "BpmnEventOffPage" },
    { key: 107, category: "event", eventType: 7, eventDimension: 8, text: "Error", item: "BpmnEventError" },
    { key: 108, category: "event", eventType: 8, eventDimension: 5, text: "Cancel", item: "BpmnEventCancel" },
    { key: 109, category: "event", eventType: 9, eventDimension: 5, text: "Compensation", item: "BpmnEventCompensation"},
    { key: 110, category: "event", eventType: 10, eventDimension: 8, text: "Signal", item: "Signal" },
    { key: 111, category: "event", eventType: 11, eventDimension: 1, text: "Multiple", item: "Multiple" },
    { key: 112, category: "event", eventType: 12, eventDimension: 1, text: "Parallel", item: "Parallel" },
    // activity nodes
    { key: 3, category: "activity", taskType: 3, isAdHoc: true, text: "Manual", item: "Manual Task" },
    { key: 4, category: "activity", taskType: 4, isSequential: true, text: "Script", item: "Script Task" },
    { key: 5, category: "activity", taskType: 5, isParallel: true, text: "Send Msg", item: "Send Msg Task" },
    { key: 6, category: "activity", taskType: 6, isLoop: true, isSubProcess: true, isTransaction: true, text: "Service", item: "service task" },
    { key: 7, category: "activity", taskType: 7, isSubProcess: true, text: "Business Rule", item: "Business Rule Task" },
    // gateway nodes
    { key: 202, category: "gateway", gatewayType: 2, text: "Inclusive" },
    { key: 203, category: "gateway", gatewayType: 3, text: "Complex" }
  ];  // end nodeDataArray

  for (var i = 0; i < debugPalette.length; i++) {
    myPalette.model.addNodeData(debugPalette[i]);
  }


  //------------------------------------------  Overview   ----------------------------------------------

  var myOverview =
    $(go.Overview, "myOverview",
      { observed: myDiagram, maxScale: 0.5, contentAlignment: go.Spot.Center });
  // change color of viewport border in Overview
  myOverview.box.elt(0).stroke = "dodgerblue";


  // start with a blank canvas:
  // myDiagram.isModified = false;
  // newDocument();

  // start with a simple preset model:
  loadModel();
} // end init


// When copying a node, we need to copy the data that the node is bound to.
// This JavaScript object includes properties for the node as a whole, and
// four properties that are Arrays holding data for each port.
// Those arrays and port data objects need to be copied too.

function copyNodeData(data) {
  var copy = {};
  copy.category = data.category;
  copy.item = data.item;
  copy.key = data.key; // adding to the Model will make the key value unique
  copy.loc = data.loc;
  copy.text = data.text;
  if (data.isGroup) {
    copy.isGroup = true;
  }
  if (data.category === "event") {
    copy.eventType = data.eventType;
    copy.eventDimension = data.eventDimension;
  }
  else if (data.category === "activity" || data.category === "subprocess") {
    copy.taskType = data.taskType;
    copy.isTransaction = data.isTransaction;
    copy.isCall = data.isCall;
    copy.isLoop = data.isLoop;
    copy.isSubProcess = data.isSubProcess;
    copy.isParallel = data.isParallel;
    copy.isSequential = data.isSequential;
    copy.isAdHoc = data.isAdHoc;
    copy.isCompensation = data.isCompensation;
    copy.boundaryEventArray = copyBoundaryEventArray(data.boundaryEventArray);
  }
  else if (data.category === "gateway") {
    copy.gatewayType = data.gatewayType;
  }
  // if you add data properties, you should copy them here too
  return copy;
}

function copyBoundaryEventArray(arr) {
  var copy = [];
  if (Array.isArray(arr)) {
    for (var i = 0; i < arr.length; i++) {
      copy.push(copyBoundaryEventData(arr[i]));
    }
  }
  return copy;
}

function copyBoundaryEventData(data) {
  var copy = {};
  copy.portId = data.portId;
  copy.alignmentIndex = data.alignmentIndex;
  copy.eventType = data.eventType;
  copy.color = data.color;
  // if you add BoundaryEvent data properties, you should copy them here too
  return copy;
}


//------------------------------------------  Commands for this application  ----------------------------------------------

// Add a port to the specified side of the selected nodes.   name is beN  (be0, be1)
function addActivityNodeBoundaryEvent(evType) {
  myDiagram.startTransaction("addBoundaryEvent");
  myDiagram.selection.each(function(node) {
    // skip any selected Links
    if (!(node instanceof go.Node)) return;
    if (node.data.category === "activity" || node.data.category === "subprocess") {
      // compute the next available index number for the side
      var i = 0;
      var defaultPort = node.findPort("");
      while (node.findPort("be" + i.toString()) !== defaultPort) i++;           // now this new port name is unique within the whole Node because of the side prefix
      var name = "be" + i.toString();
      // get the Array of port data to be modified
      var arr = node.data["boundaryEventArray"];
      if (arr) {
        // create a new port data object
        var newportdata = {
          portId: name,
          eventType: evType,
          color: "white",
          alignmentIndex: i
          // if you add port data properties here, you should copy them in copyPortData above
        };
        // and add it to the Array of port data
        myDiagram.model.insertArrayItem(arr, -1, newportdata);
      }
    }
  });
  myDiagram.commitTransaction("addBoundaryEvent");
}

// changes the item of the object
function rename(obj) {
  myDiagram.startTransaction("rename");
  var newName = prompt("Rename " + obj.part.data.item + " to:");
  myDiagram.model.setDataProperty(obj.part.data, "item", newName);
  myDiagram.commitTransaction("rename");
}

// shows/hides gridlines
// to be implemented onclick of a button
function updateGridOption() {
  myDiagram.startTransaction("grid");
  var grid = document.getElementById("grid");
  myDiagram.grid.visible = grid.checked;
  myDiagram.commitTransaction("grid");
}

// enables/disables snapping tools, to be implemented by buttons
function updateSnapOption() {
  // no transaction needed, because we are modifying tools for future use
  var snap = document.getElementById("snap");
  if (snap.checked) {
    myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
    myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;
  } else {
    myDiagram.toolManager.draggingTool.isGridSnapEnabled = false;
    myDiagram.toolManager.resizingTool.isGridSnapEnabled = false;
  }
}

// user specifies the amount of space between nodes when making rows and column
function askSpace() {
  var space = prompt("Desired space between nodes (in pixels):", "0");
  return space;
}

var UnsavedFileName = "(Unsaved File)";

function getCurrentFileName() {
  var currentFile = document.getElementById("currentFile");
  var name = currentFile.textContent;
  if (name[name.length - 1] === "*") return name.substr(0, name.length - 1);
  return name;
}

function setCurrentFileName(name) {
  var currentFile = document.getElementById("currentFile");
  if (myDiagram.isModified) {
    name += "*";
  }
  currentFile.textContent = name;
}

function newDocument() {
  // checks to see if all changes have been saved
  if (myDiagram.isModified) {
    var save = confirm("Would you like to save changes to " + getCurrentFileName() + "?");
    if (save) {
      saveDocument();
    }
  }
  setCurrentFileName(UnsavedFileName);
  // loads an empty diagram
  myDiagram.model = new go.GraphLinksModel();
  myDiagram.model.undoManager.isEnabled = true;
  myDiagram.isModified = false;
  ModelReset();
}

function ModelReset() {
  myDiagram.model.undoManager.isEnabled = true;
  myDiagram.model.linkFromPortIdProperty = "fromPort";
  myDiagram.model.linkToPortIdProperty = "toPort";

  myDiagram.isModified = false;
  // Customize the node data copying function
  // to avoid sharing of port data arrays and of the port data themselves.
  // (Functions cannot be written/read in JSON format.)
  myDiagram.model.copyNodeDataFunction = copyNodeData;
}

function checkLocalStorage() {
  return (typeof (Storage) !== "undefined") && (window.localStorage !== undefined);
}

// saves the current floor plan to local storage
function saveDocument() {
  if (checkLocalStorage()) {
    var saveName = getCurrentFileName();
    if (saveName === UnsavedFileName) {
      saveDocumentAs();
    } else {
      saveDiagramProperties()
      window.localStorage.setItem(saveName, myDiagram.model.toJson());
      myDiagram.isModified = false;
    }
  }
}

// saves floor plan to local storage with a new name
function saveDocumentAs() {
  if (checkLocalStorage()) {
    var saveName = prompt("Save file as...", getCurrentFileName());
    if (saveName && saveName !== UnsavedFileName) {
      setCurrentFileName(saveName);
      saveDiagramProperties()
      window.localStorage.setItem(saveName, myDiagram.model.toJson());
      myDiagram.isModified = false;
    }
  }
}

// checks to see if all changes have been saved -> shows the open HTML element
function openDocument() {
  if (checkLocalStorage()) {
    if (myDiagram.isModified) {
      var save = confirm("Would you like to save changes to " + getCurrentFileName() + "?");
      if (save) {
        saveDocument();
      }
    }
    openElement("openDocument", "mySavedFiles");
  }
}

// shows the remove HTML element
function removeDocument() {
  if (checkLocalStorage()) {
    openElement("removeDocument", "mySavedFiles2");
  }
}

// these functions are called when panel buttons are clicked

function loadFile() {
  var listbox = document.getElementById("mySavedFiles");
  // get selected filename
  var fileName = undefined;
  for (var i = 0; i < listbox.options.length; i++) {
    if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
  }
  if (fileName !== undefined) {
    // changes the text of "currentFile" to be the same as the floor plan now loaded
    setCurrentFileName(fileName);
    // actually load the model from the JSON format string
    var savedFile = window.localStorage.getItem(fileName);
    myDiagram.model = go.Model.fromJson(savedFile);
    myDiagram.model.undoManager.isEnabled = true;
    myDiagram.isModified = false;
    // eventually loadDiagramProperties will be called to finish
    // restoring shared saved model/diagram properties
  }
  closeElement("openDocument");
}

// Store shared model state in the Model.modelData property
// (will be loaded by loadDiagramProperties)
function saveDiagramProperties() {
  myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
}

// Called by myDiagram.addDiagramListener("InitialLayoutCompleted" ...,
// NOT directly by loadFile.
function loadDiagramProperties(e) {
  var pos = myDiagram.model.modelData.position;
  if (pos) myDiagram.position = go.Point.parse(pos);
}


// deletes the selected file from local storage
function removeFile() {
  var listbox = document.getElementById("mySavedFiles2");
  // get selected filename
  var fileName = undefined;
  for (var i = 0; i < listbox.options.length; i++) {
    if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
  }
  if (fileName !== undefined) {
    // removes file from local storage
    window.localStorage.removeItem(fileName);
    // the current document remains open, even if its storage was deleted
  }
  closeElement("removeDocument");
}

function updateFileList(id) {
  // displays cached floor plan files in the listboxes
  var listbox = document.getElementById(id);
  // remove any old listing of files
  var last;
  while (last = listbox.lastChild) listbox.removeChild(last);
  // now add all saved files to the listbox
  for (var key in window.localStorage) {
    var storedFile = window.localStorage.getItem(key);
    if (!storedFile) continue;
    var option = document.createElement("option");
    option.value = key;
    option.text = key;
    listbox.add(option, null);
  }
}

function openElement(id, listid) {
  var panel = document.getElementById(id);
  if (panel.style.visibility === "hidden") {
    updateFileList(listid);
    panel.style.visibility = "visible";
  }
}

// hides the open/remove elements when the "cancel" button is pressed
function closeElement(id) {
  var panel = document.getElementById(id);
  if (panel.style.visibility === "visible") {
    panel.style.visibility = "hidden";
  }
}


// save a model to and load a model from Json text, displayed below the Diagram
function saveModel() {
  var str = myDiagram.model.toJson();
  document.getElementById("mySavedModel").value = str;
}
function loadModel() {
  var str = document.getElementById("mySavedModel").value;
  if (str !== "") {
    myDiagram.model = go.Model.fromJson(str);
    // moving and linking Nodes, and deletions, can be undone with ctrl-z
    myDiagram.undoManager.isEnabled = true;
    ModelReset();
  }
}
