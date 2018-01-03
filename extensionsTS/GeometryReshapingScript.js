(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./GeometryReshapingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var GeometryReshapingTool_1 = require("./GeometryReshapingTool");
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
        {
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true // enable undo & redo
        });
        myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool_1.GeometryReshapingTool());
        myDiagram.nodeTemplate =
            $(go.Node, { reshapable: true }, // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
            $(go.Shape, { name: "SHAPE", fill: "lightgray", strokeWidth: 1.5 }, new go.Binding("geometryString", "geo").makeTwoWay()));
        myDiagram.model = new go.GraphLinksModel([{ geo: "F M0 145 L75 2 L131 87 L195 0 L249 143z", key: -1 }], []);
    }
    exports.init = init;
});
