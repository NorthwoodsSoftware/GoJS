(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./FreehandDrawingTool", "./GeometryReshapingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var FreehandDrawingTool_1 = require("./FreehandDrawingTool");
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
        myDiagram.nodeTemplateMap.add("FreehandDrawing", $(go.Part, { locationSpot: go.Spot.Center, isLayoutPositioned: false }, new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
            selectionAdorned: true, selectionObjectName: "SHAPE",
            selectionAdornmentTemplate: // custom selection adornment: a blue rectangle
            $(go.Adornment, "Auto", $(go.Shape, { stroke: "dodgerblue", fill: null }), $(go.Placeholder, { margin: -1 }))
        }, { resizable: true, resizeObjectName: "SHAPE" }, { rotatable: true, rotateObjectName: "SHAPE" }, { reshapable: true }, // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
        $(go.Shape, { name: "SHAPE", fill: null, strokeWidth: 1.5 }, new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), new go.Binding("angle").makeTwoWay(), new go.Binding("geometryString", "geo").makeTwoWay(), new go.Binding("fill"), new go.Binding("stroke"), new go.Binding("strokeWidth"))));
        // create drawing tool for myDiagram, defined in FreehandDrawingTool.js
        var tool = new FreehandDrawingTool_1.FreehandDrawingTool();
        // provide the default JavaScript object for a new polygon in the model
        tool.archetypePartData =
            { stroke: "green", strokeWidth: 3, category: "FreehandDrawing" };
        // allow the tool to start on top of an existing Part
        tool.isBackgroundOnly = false;
        // install as first mouse-move-tool
        myDiagram.toolManager.mouseMoveTools.insertAt(0, tool);
        load(); // load a simple diagram from the textarea
    }
    exports.init = init;
    function mode(draw) {
        var tool = myDiagram.toolManager.findTool("FreehandDrawing");
        tool.isEnabled = draw;
    }
    exports.mode = mode;
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
        mode(false);
    }
    exports.select = select;
    function drawMode() {
        mode(true);
    }
    exports.drawMode = drawMode;
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
