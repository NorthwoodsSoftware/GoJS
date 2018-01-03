(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./PolygonDrawingTool", "./GeometryReshapingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var PolygonDrawingTool_1 = require("./PolygonDrawingTool");
    var GeometryReshapingTool_1 = require("./GeometryReshapingTool");
    var myDiagram;
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this  
        var $ = go.GraphObject.make;
        myDiagram =
            $(go.Diagram, "myDiagramDiv", {
                initialContentAlignment: go.Spot.Center
            });
        myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool_1.GeometryReshapingTool());
        myDiagram.nodeTemplateMap.add("PolygonDrawing", $(go.Node, { locationSpot: go.Spot.Center }, // to support rotation about the center
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
            selectionAdorned: true, selectionObjectName: "SHAPE",
            selectionAdornmentTemplate: // custom selection adornment: a blue rectangle
            $(go.Adornment, "Auto", $(go.Shape, { stroke: "dodgerblue", fill: null }), $(go.Placeholder, { margin: -1 }))
        }, { resizable: true, resizeObjectName: "SHAPE" }, { rotatable: true, rotateObjectName: "SHAPE" }, { reshapable: true }, // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
        $(go.Shape, { name: "SHAPE", fill: "lightgray", strokeWidth: 1.5 }, new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), new go.Binding("angle").makeTwoWay(), new go.Binding("geometryString", "geo").makeTwoWay(), new go.Binding("fill"), new go.Binding("stroke"), new go.Binding("strokeWidth"))));
        // create polygon drawing tool for myDiagram, defined in PolygonDrawingTool.js
        var tool = new PolygonDrawingTool_1.PolygonDrawingTool();
        // provide the default JavaScript object for a new polygon in the model
        tool.archetypePartData =
            { fill: "yellow", stroke: "blue", strokeWidth: 3, category: "PolygonDrawing" };
        tool.isPolygon = true; // for a polyline drawing tool set this property to false
        // install as first mouse-down-tool
        myDiagram.toolManager.mouseDownTools.insertAt(0, tool);
        load(); // load a simple diagram from the textarea
    }
    exports.init = init;
    function mode(draw, polygon) {
        // assume PolygonDrawingTool is the first tool in the mouse-down-tools list
        var tool = myDiagram.toolManager.mouseDownTools.elt(0);
        tool.isEnabled = draw;
        tool.isPolygon = polygon;
        tool.archetypePartData.fill = (polygon ? "yellow" : null);
        tool.temporaryShape.fill = (polygon ? "yellow" : null);
    }
    exports.mode = mode;
    // this command ends the PolygonDrawingTool
    function finish(commit) {
        var tool = myDiagram.currentTool;
        if (commit && tool instanceof PolygonDrawingTool_1.PolygonDrawingTool) {
            var lastInput = myDiagram.lastInput;
            if (lastInput.event instanceof MouseEvent)
                tool.removeLastPoint(); // remove point from last mouse-down
            tool.finishShape();
        }
        else {
            tool.doCancel();
        }
    }
    exports.finish = finish;
    // this command removes the last clicked point from the temporary Shape
    function undo() {
        var tool = myDiagram.currentTool;
        if (tool instanceof PolygonDrawingTool_1.PolygonDrawingTool) {
            var lastInput = myDiagram.lastInput;
            if (lastInput.event instanceof MouseEvent)
                tool.removeLastPoint(); // remove point from last mouse-down
            tool.undo();
        }
    }
    exports.undo = undo;
    function updateAllAdornments() {
        myDiagram.selection.each(function (p) { p.updateAdornments(); });
    }
    exports.updateAllAdornments = updateAllAdornments;
    // save a model to and load a model from Json text, displayed below the Diagram
    function save() {
        var str = '{ "position": "' + go.Point.stringify(myDiagram.position) + '",\n  "model": ' + myDiagram.model.toJson() + ' }';
        document.getElementById("mySavedDiagram").value = str;
    }
    exports.save = save;
    function load() {
        var str = document.getElementById("mySavedDiagram").value;
        try {
            var json = JSON.parse(str);
            myDiagram.initialPosition = go.Point.parse(json.position || "0 0");
            myDiagram.model = go.Model.fromJson(json.model);
            myDiagram.model.undoManager.isEnabled = true;
        }
        catch (ex) {
            alert(ex);
        }
    }
    exports.load = load;
    function select() {
        mode(false, false);
    }
    exports.select = select;
    function drawPolygon() {
        mode(true, true);
    }
    exports.drawPolygon = drawPolygon;
    function drawPolyline() {
        mode(true, false);
    }
    exports.drawPolyline = drawPolyline;
    function finishDrawing() {
        finish(true);
    }
    exports.finishDrawing = finishDrawing;
    function cancelDrawing() {
        finish(false);
    }
    exports.cancelDrawing = cancelDrawing;
    function allowResizing() {
        myDiagram.allowResize = !myDiagram.allowResize;
        updateAllAdornments();
    }
    exports.allowResizing = allowResizing;
    function allowReshaping() {
        myDiagram.allowReshape = !myDiagram.allowReshape;
        updateAllAdornments();
    }
    exports.allowReshaping = allowReshaping;
    function allowRotating() {
        myDiagram.allowRotate = !myDiagram.allowRotate;
        updateAllAdornments();
    }
    exports.allowRotating = allowRotating;
});
