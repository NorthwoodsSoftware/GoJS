(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Center,
            "PartResized": function (e) {
                var node = e.subject;
                var scroller = node.findObject("SCROLLER");
                if (scroller !== null)
                    scroller._updateScrollBar(scroller.findObject("TABLE"));
            }
        });
        myDiagram.nodeTemplate =
            $(go.Node, "Vertical", {
                selectionObjectName: "SCROLLER",
                resizable: true, resizeObjectName: "SCROLLER",
                portSpreading: go.Node.SpreadingNone
            }, new go.Binding("location").makeTwoWay(), $(go.TextBlock, { font: "bold 14px sans-serif" }, new go.Binding("text", "key")), $(go.Panel, "Auto", $(go.Shape, { fill: "white" }), $("ScrollingTable", {
                name: "SCROLLER",
                desiredSize: new go.Size(NaN, 60),
                stretch: go.GraphObject.Fill,
                defaultColumnSeparatorStroke: "gray",
                defaultColumnSeparatorStrokeWidth: 0.5
            }, new go.Binding("TABLE.itemArray", "items"), new go.Binding("TABLE.column", "left", function (left) { return left ? 2 : 0; }), new go.Binding("desiredSize", "size").makeTwoWay(), {
                "TABLE.itemTemplate": $(go.Panel, "TableRow", {
                    defaultStretch: go.GraphObject.Horizontal,
                    fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides,
                    fromLinkable: true, toLinkable: true
                }, new go.Binding("portId", "name"), $(go.TextBlock, { column: 0 }, new go.Binding("text", "name")), $(go.TextBlock, { column: 1 }, new go.Binding("text", "value"))),
                "TABLE.defaultColumnSeparatorStroke": "gray",
                "TABLE.defaultColumnSeparatorStrokeWidth": 0.5,
                "TABLE.defaultRowSeparatorStroke": "gray",
                "TABLE.defaultRowSeparatorStrokeWidth": 0.5,
                "TABLE.defaultSeparatorPadding": new go.Margin(1, 3, 0, 3)
            })));
        myDiagram.model = $(go.GraphLinksModel, {
            linkFromPortIdProperty: "fromPort",
            linkToPortIdProperty: "toPort",
            nodeDataArray: [
                {
                    key: "Alpha", left: true, location: new go.Point(0, 0), size: new go.Size(100, 50),
                    items: [
                        { name: "A", value: 1 },
                        { name: "B", value: 2 },
                        { name: "C", value: 3 },
                        { name: "D", value: 4 },
                        { name: "E", value: 5 },
                        { name: "F", value: 6 },
                        { name: "G", value: 7 }
                    ]
                },
                {
                    key: "Beta", location: new go.Point(150, 0),
                    items: [
                        { name: "Aa", value: 1 },
                        { name: "Bb", value: 2 },
                        { name: "Cc", value: 3 },
                        { name: "Dd", value: 4 },
                        { name: "Ee", value: 5 },
                        { name: "Ff", value: 6 },
                        { name: "Gg", value: 7 },
                        { name: "Hh", value: 8 },
                        { name: "Ii", value: 9 },
                        { name: "Jj", value: 10 },
                        { name: "Kk", value: 11 },
                        { name: "Ll", value: 12 },
                        { name: "Mm", value: 13 },
                        { name: "Nn", value: 14 }
                    ]
                }
            ],
            linkDataArray: [
                { from: "Alpha", fromPort: "D", to: "Beta", toPort: "Ff" },
                { from: "Alpha", fromPort: "A", to: "Beta", toPort: "Nn" },
                { from: "Alpha", fromPort: "G", to: "Beta", toPort: "Aa" }
            ]
        });
    }
    exports.init = init;
});
