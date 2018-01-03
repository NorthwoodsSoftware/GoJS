(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./DimensioningLink"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var DimensioningLink_1 = require("./DimensioningLink");
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true
        });
        // A simple resizable node
        myDiagram.nodeTemplate =
            $(go.Node, "Auto", { locationSpot: go.Spot.Center }, new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), { resizable: true }, $(go.Shape, { strokeWidth: 0, fill: "lightgray" }, new go.Binding("fill", "color")), $(go.TextBlock, { margin: 10 }, new go.Binding("text", "key")));
        // A generalized example template using a DimensioningLink.
        // Most usage might not have so many Bindings.
        myDiagram.linkTemplateMap.add("Dimensioning", $(DimensioningLink_1.DimensioningLink, new go.Binding("fromSpot", "fromSpot", go.Spot.parse), new go.Binding("toSpot", "toSpot", go.Spot.parse), new go.Binding("direction"), new go.Binding("extension"), new go.Binding("inset"), $(go.Shape, { stroke: "gray" }, new go.Binding("stroke", "color")), $(go.Shape, { fromArrow: "BackwardOpenTriangle", segmentIndex: 2, stroke: "gray" }, new go.Binding("stroke", "color")), $(go.Shape, { toArrow: "OpenTriangle", segmentIndex: -3, stroke: "gray" }, new go.Binding("stroke", "color")), $(go.TextBlock, {
            segmentIndex: 2,
            segmentFraction: 0.5,
            segmentOrientation: go.Link.OrientUpright,
            alignmentFocus: go.Spot.Bottom,
            stroke: "gray",
            font: "8pt sans-serif"
        }, new go.Binding("text", "", showDistance).ofObject(), new go.Binding("stroke", "color"))));
        // Return a string representing the distance between the two points.
        // This is the cartesian distance if this.direction is NaN;
        // otherwise it is the orthogonal distance along that axis.
        function showDistance(link) {
            var numpts = link.pointsCount;
            if (numpts < 2)
                return "";
            var p0 = link.getPoint(0);
            var pn = link.getPoint(numpts - 1);
            var ang = link.direction;
            if (isNaN(ang))
                return Math.floor(Math.sqrt(p0.distanceSquaredPoint(pn))) + "";
            var rad = ang * Math.PI / 180;
            return Math.floor(Math.abs(Math.cos(rad) * (p0.x - pn.x)) +
                Math.abs(Math.sin(rad) * (p0.y - pn.y))) + "";
        }
        myDiagram.model = new go.GraphLinksModel([
            { key: "Alpha", loc: "0 50" },
            { key: "Beta", loc: "150 0" },
            { key: "Gamma", loc: "100 150" }
        ], [
            {
                from: "Alpha", to: "Beta", category: "Dimensioning",
                fromSpot: "TopRight", toSpot: "TopLeft"
            },
            {
                from: "Alpha", to: "Beta", category: "Dimensioning",
                fromSpot: "TopLeft", toSpot: "TopRight", extension: 50, color: "blue"
            },
            {
                from: "Alpha", to: "Beta", category: "Dimensioning",
                fromSpot: "TopLeft", toSpot: "TopLeft", direction: 270, color: "green"
            },
            {
                from: "Alpha", to: "Beta", category: "Dimensioning",
                fromSpot: "BottomRight", toSpot: "BottomRight", direction: 90, color: "purple"
            },
            {
                from: "Alpha", to: "Beta", category: "Dimensioning",
                fromSpot: "Center", toSpot: "Center", extension: 50, direction: NaN, color: "red"
            },
            {
                from: "Gamma", to: "Gamma", category: "Dimensioning",
                fromSpot: "TopLeft", toSpot: "TopRight", direction: 0
            },
            {
                from: "Gamma", to: "Gamma", category: "Dimensioning",
                fromSpot: "TopRight", toSpot: "BottomRight", direction: 90
            },
            {
                from: "Gamma", to: "Gamma", category: "Dimensioning",
                fromSpot: "BottomRight", toSpot: "BottomLeft", direction: 180
            },
            {
                from: "Gamma", to: "Gamma", category: "Dimensioning",
                fromSpot: "BottomLeft", toSpot: "TopLeft", direction: 270
            }
        ]);
    }
    exports.init = init;
});
