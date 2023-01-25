/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./GeometryReshapingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var GeometryReshapingTool_js_1 = require("./GeometryReshapingTool.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = new go.Diagram('myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            'undoManager.isEnabled': true // enable undo & redo
        });
        myDiagram.toolManager.mouseDownTools.insertAt(3, $(GeometryReshapingTool_js_1.GeometryReshapingTool, { isResegmenting: true }));
        myDiagram.nodeTemplate =
            $(go.Node, {
                resizable: true, resizeObjectName: "SHAPE",
                reshapable: true,
                rotatable: true, rotationSpot: go.Spot.Center
            }, $(go.Shape, { name: 'SHAPE', fill: 'lightgray', strokeWidth: 1.5 }, new go.Binding('geometryString', 'geo').makeTwoWay()));
        myDiagram.model = new go.GraphLinksModel([
            { geo: "F M20 0 40 20 20 40 0 20z" },
            { geo: "F M0 145 L75 8 C100 20 120 40 131 87 C160 70 180 50 195 0 L249 133z" }
        ]);
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
});
