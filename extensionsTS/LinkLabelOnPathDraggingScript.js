(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./LinkLabelOnPathDraggingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var LinkLabelOnPathDraggingTool_1 = require("./LinkLabelOnPathDraggingTool");
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, "myDiagramDiv", // the ID of the DIV HTML element
        {
            initialContentAlignment: go.Spot.Center,
            layout: $(go.ForceDirectedLayout, { defaultSpringLength: 50, defaultElectricalCharge: 50 }),
            "undoManager.isEnabled": true
        });
        // install the LinkLabelDraggingTool as a "mouse move" tool
        myDiagram.toolManager.mouseMoveTools.insertAt(0, new LinkLabelOnPathDraggingTool_1.LinkLabelOnPathDraggingTool());
        myDiagram.nodeTemplate =
            $(go.Node, go.Panel.Auto, { locationSpot: go.Spot.Center }, $(go.Shape, {
                fill: "orange",
                portId: "",
                fromLinkable: true,
                fromSpot: go.Spot.AllSides,
                toLinkable: true,
                toSpot: go.Spot.AllSides,
                cursor: "pointer"
            }, new go.Binding("fill", "color")), $(go.TextBlock, { margin: 10, font: "bold 12pt sans-serif" }, new go.Binding("text")));
        myDiagram.linkTemplate =
            $(go.Link, {
                routing: go.Link.AvoidsNodes,
                corner: 5,
                relinkableFrom: true,
                relinkableTo: true,
                reshapable: true,
                resegmentable: true
            }, $(go.Shape), $(go.Shape, { toArrow: "OpenTriangle" }), $(go.Panel, "Auto", { _isLinkLabel: true }, // marks this Panel as being a draggable label
            $(go.Shape, { fill: "white" }), $(go.TextBlock, "?", { margin: 3 }, new go.Binding("text", "color")), 
            // remember any modified segment properties in the link data object
            new go.Binding("segmentIndex").makeTwoWay(), new go.Binding("segmentFraction").makeTwoWay()));
        // create a few nodes and links
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, text: "one", color: "lightyellow" },
            { key: 2, text: "two", color: "brown" },
            { key: 3, text: "three", color: "green" },
            { key: 4, text: "four", color: "slateblue" },
            { key: 5, text: "five", color: "aquamarine" },
            { key: 6, text: "six", color: "lightgreen" },
            { key: 7, text: "seven" }
        ], [
            { from: 5, to: 6, color: "orange" },
            { from: 1, to: 2, color: "red" },
            { from: 1, to: 3, color: "blue" },
            { from: 1, to: 4, color: "goldenrod" },
            { from: 2, to: 5, color: "fuchsia" },
            { from: 3, to: 5, color: "green" },
            { from: 4, to: 5, color: "black" },
            { from: 6, to: 7 }
        ]);
    }
    exports.init = init;
});
