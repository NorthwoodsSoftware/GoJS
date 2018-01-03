(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./NonRealtimeDraggingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var NonRealtimeDraggingTool_1 = require("./NonRealtimeDraggingTool");
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Center,
            // install the replacement DraggingTool:
            draggingTool: new NonRealtimeDraggingTool_1.NonRealtimeDraggingTool(),
            "undoManager.isEnabled": true
        });
        myDiagram.nodeTemplate =
            $(go.Node, "Auto", { locationSpot: go.Spot.Center }, $(go.Shape, "Circle", {
                fill: "white",
                portId: "", cursor: "pointer",
                // allow all kinds of links from and to this port
                fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
            }, new go.Binding("fill", "color")), $(go.TextBlock, {
                font: "bold 14px sans-serif",
                stroke: '#333',
                margin: 6,
                isMultiline: false,
                editable: true // allow in-place editing by user
            }, new go.Binding("text", "text").makeTwoWay()) // the label shows the node data's text
            );
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, text: "Alpha", color: "lightblue" },
            { key: 2, text: "Beta", color: "orange" },
            { key: 3, text: "Gamma", color: "lightgreen", group: 5 },
            { key: 4, text: "Delta", color: "pink", group: 5 },
            { key: 5, text: "Epsilon", color: "green", isGroup: true }
        ], [
            { from: 1, to: 2, color: "blue" },
            { from: 2, to: 2 },
            { from: 3, to: 4, color: "green" },
            { from: 3, to: 1, color: "purple" }
        ]);
    }
    exports.init = init;
});
