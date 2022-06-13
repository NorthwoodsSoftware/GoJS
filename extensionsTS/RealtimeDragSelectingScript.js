/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./RealtimeDragSelectingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var RealtimeDragSelectingTool_js_1 = require("./RealtimeDragSelectingTool.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = $(go.Diagram, 'myDiagramDiv', {
            initialDocumentSpot: go.Spot.Center,
            initialViewportSpot: go.Spot.Center,
            // replace the standard DragSelectingTool with one that selects while dragging,
            // and also only requires overlapping bounds with the dragged box to be selected
            dragSelectingTool: $(RealtimeDragSelectingTool_js_1.RealtimeDragSelectingTool, {
                isPartialInclusion: true, delay: 50,
                box: $(go.Part, // replace the magenta box with a red one
                { layerName: 'Tool', selectable: false }, $(go.Shape, {
                    name: 'SHAPE', fill: 'rgba(255,0,0,0.1)',
                    stroke: 'red', strokeWidth: 2
                }))
            }),
            // Define the template for Nodes, just some text inside a colored rectangle
            nodeTemplate: $(go.Node, 'Spot', { width: 70, height: 20 }, $(go.Shape, 'Rectangle', new go.Binding('fill', 'c')), $(go.TextBlock, { margin: 2 }, new go.Binding('text', 'c'))),
            // Define the template for Links, just a simple line
            linkTemplate: $(go.Link, $(go.Shape, { stroke: 'black' })),
            layout: $(go.TreeLayout)
        });
        myDiagram.model = loadTree();
    }
    exports.init = init;
    function loadTree() {
        // create some tree data
        var total = 49;
        var treedata = [];
        for (var i = 0; i < total; i++) {
            // these property names are also specified when creating the TreeModel
            var d = {
                key: i,
                c: go.Brush.randomColor(),
                parent: (i > 0 ? Math.floor(Math.random() * i / 2) : undefined) // the random parent's key
            };
            treedata.push(d);
        }
        return new go.TreeModel(treedata);
    }
});
