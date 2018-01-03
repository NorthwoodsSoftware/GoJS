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
            initialContentAlignment: go.Spot.Center
        });
        myDiagram.nodeTemplate =
            $(go.Node, "Auto", $(go.Shape, "Ellipse", { fill: "lightskyblue" }), $("HyperlinkText", function (node) { return "https://gojs.net/" + node.data.version; }, function (node) { return "Visit GoJS " + node.data.version; }, { margin: 10 }));
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, version: "beta" },
            { key: 2, version: "latest" },
        ], [
            { from: 1, to: 2 }
        ]);
    }
    exports.init = init;
});
