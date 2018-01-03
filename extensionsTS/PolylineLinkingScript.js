(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./PolylineLinkingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var PolylineLinkingTool_1 = require("./PolylineLinkingTool");
    var myDiagram;
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        myDiagram =
            $(go.Diagram, "myDiagramDiv", {
                initialContentAlignment: go.Spot.Center
            });
        // install custom linking tool, defined in PolylineLinkingTool.js
        var tool = new PolylineLinkingTool_1.PolylineLinkingTool();
        //tool.temporaryLink.routing = go.Link.Orthogonal;  // optional, but need to keep link template in sync, below
        myDiagram.toolManager.linkingTool = tool;
        myDiagram.nodeTemplate =
            $(go.Node, "Spot", { locationSpot: go.Spot.Center }, new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, {
                width: 100, height: 100, fill: "lightgray",
                portId: "", cursor: "pointer",
                fromLinkable: true,
                fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                toLinkable: true,
                toLinkableSelfNode: true, toLinkableDuplicates: true // optional
            }, new go.Binding("fill")), $(go.Shape, { width: 70, height: 70, fill: "transparent", stroke: null }), $(go.TextBlock, new go.Binding("text")));
        myDiagram.linkTemplate =
            $(go.Link, { reshapable: true, resegmentable: true }, 
            //{ routing: go.Link.Orthogonal },  // optional, but need to keep LinkingTool.temporaryLink in sync, above
            { adjusting: go.Link.Stretch }, // optional
            new go.Binding("points", "points").makeTwoWay(), $(go.Shape, { strokeWidth: 1.5 }), $(go.Shape, { toArrow: "OpenTriangle" }));
        load(); // load a simple diagram from the textarea
    }
    exports.init = init;
    // save a model to and load a model from Json text, displayed below the Diagram
    function save() {
        var str = myDiagram.model.toJson();
        document.getElementById("mySavedModel").value = str;
    }
    exports.save = save;
    function load() {
        var str = document.getElementById("mySavedModel").value;
        myDiagram.model = go.Model.fromJson(str);
        myDiagram.model.undoManager.isEnabled = true;
    }
    exports.load = load;
});
