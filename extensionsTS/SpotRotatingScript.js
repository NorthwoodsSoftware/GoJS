/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./SpotRotatingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = void 0;
    var go = require("../release/go.js");
    var SpotRotatingTool_js_1 = require("./SpotRotatingTool.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = $(go.Diagram, "myDiagramDiv", {
            rotatingTool: new SpotRotatingTool_js_1.SpotRotatingTool(),
            "undoManager.isEnabled": true,
            "ModelChanged": function (e) {
                if (e.isTransactionFinished) {
                    var ta = document.getElementById("mySavedModel");
                    if (ta)
                        ta.value = myDiagram.model.toJson();
                }
            }
        });
        myDiagram.nodeTemplate =
            $(go.Node, go.Panel.Spot, {
                locationObjectName: "SHAPE",
                locationSpot: go.Spot.Center,
                selectionObjectName: "SHAPE",
                resizable: true,
                resizeObjectName: "SHAPE",
                rotatable: true,
                rotateObjectName: "SHAPE",
                rotationSpot: go.Spot.Center
            }, new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), new go.Binding("rotationSpot", "rotSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify), $(go.Shape, "RoundedRectangle", { name: "SHAPE", fill: "orange", strokeWidth: 2 }, new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), new go.Binding("angle").makeTwoWay()), $(go.TextBlock, new go.Binding("text")));
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, text: "Alpha", color: "lightblue" },
            { key: 2, text: "Beta", color: "orange" },
            { key: 3, text: "Gamma", color: "lightgreen" },
            { key: 4, text: "Delta", color: "pink" }
        ], [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 3, to: 4 }
        ]);
    }
    exports.init = init;
});
