(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./BalloonLink"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var BalloonLink_1 = require("./BalloonLink");
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
        {
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true // enable undo & redo
        });
        // define a simple Node template
        myDiagram.nodeTemplate =
            $(go.Node, "Auto", // the Shape will go around the TextBlock
            $(go.Shape, "Rectangle", { strokeWidth: 0 }, 
            // Shape.fill is bound to Node.data.color
            new go.Binding("fill", "color")), $(go.TextBlock, { margin: 8 }, // some room around the text
            // TextBlock.text is bound to Node.data.key
            new go.Binding("text", "key")));
        myDiagram.linkTemplate =
            $(BalloonLink_1.BalloonLink, $(go.Shape, { stroke: "limegreen", strokeWidth: 3, fill: "limegreen" }));
        // create the model data that will be represented by Nodes and Links
        myDiagram.model = new go.GraphLinksModel([
            { key: "Alpha", color: "lightblue" },
            { key: "Beta", color: "orange" }
        ], [
            { from: "Alpha", to: "Beta" }
        ]);
    }
    exports.init = init;
});
