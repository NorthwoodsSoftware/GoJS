/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./GeometryReshapingTool.js", "./PolygonDrawingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.allowRotating = exports.allowReshaping = exports.allowResizing = exports.cancelDrawing = exports.finishDrawing = exports.drawPolyline = exports.drawPolygon = exports.select = exports.load = exports.save = exports.toggleResegmenting = exports.updateAllAdornments = exports.undo = exports.finish = exports.mode = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var GeometryReshapingTool_js_1 = require("./GeometryReshapingTool.js");
    var PolygonDrawingTool_js_1 = require("./PolygonDrawingTool.js");
    var myDiagram;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        myDiagram =
            new go.Diagram('myDiagramDiv');
        myDiagram.toolManager.mouseDownTools.insertAt(3, $(GeometryReshapingTool_js_1.GeometryReshapingTool, { isResegmenting: true }));
        myDiagram.nodeTemplate =
            $(go.Node, new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
                selectionObjectName: "SHAPE",
                selectionAdornmentTemplate: // custom selection adornment: a blue rectangle
                $(go.Adornment, "Auto", $(go.Shape, { stroke: "dodgerblue", fill: null }), $(go.Placeholder, { margin: -1 })),
                resizable: true, resizeObjectName: "SHAPE",
                rotatable: true, rotationSpot: go.Spot.Center,
                reshapable: true
            }, new go.Binding("angle").makeTwoWay(), $(go.Shape, { name: "SHAPE", fill: "lightgray", strokeWidth: 1.5 }, new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), new go.Binding("geometryString", "geo").makeTwoWay(), new go.Binding("fill"), new go.Binding("stroke"), new go.Binding("strokeWidth")));
        // create polygon drawing tool for myDiagram, defined in PolygonDrawingTool.js
        var tool = new PolygonDrawingTool_js_1.PolygonDrawingTool();
        // provide the default JavaScript object for a new polygon in the model
        tool.archetypePartData = { fill: 'yellow', stroke: 'blue', strokeWidth: 3 };
        tool.isPolygon = true; // for a polyline drawing tool set this property to false
        tool.isEnabled = false;
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
        tool.archetypePartData.fill = (polygon ? 'yellow' : null);
        tool.temporaryShape.fill = (polygon ? 'yellow' : null);
        if (draw)
            myDiagram.currentTool = tool;
    }
    exports.mode = mode;
    // this command ends the PolygonDrawingTool
    function finish(commit) {
        var tool = myDiagram.currentTool;
        if (commit && tool instanceof PolygonDrawingTool_js_1.PolygonDrawingTool) {
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
        if (tool instanceof PolygonDrawingTool_js_1.PolygonDrawingTool) {
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
    function toggleResegmenting() {
        var tool = myDiagram.toolManager.findTool("GeometryReshaping");
        tool.isResegmenting = !tool.isResegmenting;
        updateAllAdornments();
    }
    exports.toggleResegmenting = toggleResegmenting;
    // save a model to and load a model from Json text, displayed below the Diagram
    function save() {
        var str = '{ "position": "' + go.Point.stringify(myDiagram.position) + '",\n  "model": ' + myDiagram.model.toJson() + ' }';
        document.getElementById('mySavedDiagram').value = str;
        myDiagram.isModified = false;
    }
    exports.save = save;
    function load() {
        var str = document.getElementById('mySavedDiagram').value;
        try {
            var json = JSON.parse(str);
            myDiagram.initialPosition = go.Point.parse(json.position || '0 0');
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
