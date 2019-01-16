/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/
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
    var go = require("../release/go");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, 'myDiagramDiv');
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', $(go.Shape, 'Ellipse', { fill: 'lightskyblue' }), $('HyperlinkText', function (node) { return 'https://gojs.net/' + node.data.version; }, function (node) { return 'Visit GoJS ' + node.data.version; }, { margin: 10 }));
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, version: 'beta' },
            { key: 2, version: 'latest' }
        ], [
            { from: 1, to: 2 }
        ]);
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
});
