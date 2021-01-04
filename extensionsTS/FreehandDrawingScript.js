/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./FreehandDrawingTool.js", "./GeometryReshapingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.allowRotating = exports.allowReshaping = exports.allowResizing = exports.drawMode = exports.select = exports.load = exports.save = exports.updateAllAdornments = exports.mode = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var FreehandDrawingTool_js_1 = require("./FreehandDrawingTool.js");
    var GeometryReshapingTool_js_1 = require("./GeometryReshapingTool.js");
    var myDiagram;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        myDiagram =
            $(go.Diagram, 'myDiagramDiv');
        myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool_js_1.GeometryReshapingTool());
        myDiagram.nodeTemplateMap.add('FreehandDrawing', $(go.Part, { locationSpot: go.Spot.Center, isLayoutPositioned: false }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), {
            selectionAdorned: true, selectionObjectName: 'SHAPE',
            selectionAdornmentTemplate: // custom selection adornment: a blue rectangle
            $(go.Adornment, 'Auto', $(go.Shape, { stroke: 'dodgerblue', fill: null }), $(go.Placeholder, { margin: -1 }))
        }, { resizable: true, resizeObjectName: 'SHAPE' }, { rotatable: true, rotateObjectName: 'SHAPE' }, { reshapable: true }, // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
        $(go.Shape, { name: 'SHAPE', fill: null, strokeWidth: 1.5 }, new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify), new go.Binding('angle').makeTwoWay(), new go.Binding('geometryString', 'geo').makeTwoWay(), new go.Binding('fill'), new go.Binding('stroke'), new go.Binding('strokeWidth'))));
        // create drawing tool for myDiagram, defined in FreehandDrawingTool.js
        var tool = new FreehandDrawingTool_js_1.FreehandDrawingTool();
        // provide the default JavaScript object for a new polygon in the model
        tool.archetypePartData = { stroke: 'green', strokeWidth: 3, category: 'FreehandDrawing' };
        // allow the tool to start on top of an existing Part
        tool.isBackgroundOnly = false;
        // install as first mouse-move-tool
        myDiagram.toolManager.mouseMoveTools.insertAt(0, tool);
        load(); // load a simple diagram from the textarea
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
    function mode(draw) {
        var tool = myDiagram.toolManager.findTool('FreehandDrawing');
        if (tool !== null)
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
