/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./DragZoomingTool.js"], factory);
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
    var DragZoomingTool_js_1 = require("./DragZoomingTool.js");
    var myDiagram;
    var myLoading;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            new go.Diagram('myDiagramDiv', {
                initialDocumentSpot: go.Spot.Center,
                initialViewportSpot: go.Spot.Center,
                // Define the template for Nodes, just some text inside a colored rectangle
                nodeTemplate: $(go.Node, 'Spot', { width: 70, height: 20 }, $(go.Shape, 'Rectangle', new go.Binding('fill', 'c')), $(go.TextBlock, { margin: 2 }, new go.Binding('text', 'c'))),
                // Define the template for Links, just a simple line
                linkTemplate: $(go.Link, $(go.Shape, { stroke: 'black' })),
                layout: $(go.TreeLayout, {
                    angle: 90,
                    nodeSpacing: 4,
                    compaction: go.TreeLayout.CompactionNone
                }),
                model: new go.TreeModel({
                    nodeKeyProperty: 'k',
                    nodeParentKeyProperty: 'p'
                })
            });
        // Add an instance of the custom tool defined in DragZoomingTool.js.
        // This needs to be inserted before the standard DragSelectingTool,
        // which is normally the third Tool in the ToolManager.mouseMoveTools list.
        myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragZoomingTool_js_1.DragZoomingTool());
        // This is a status message
        myLoading =
            $(go.Part, { selectable: false, location: new go.Point(0, 0) }, $(go.TextBlock, 'loading...', { stroke: 'red', font: '20pt sans-serif' }));
        // temporarily add the status indicator
        myDiagram.add(myLoading);
        // allow the myLoading indicator to be shown now,
        // but allow objects added in loadTree to also be considered part of the initial Diagram
        myDiagram.delayInitialization(loadTree);
    }
    exports.init = init;
    function loadTree() {
        // create some tree data
        var total = 99;
        var treedata = [];
        for (var i = 0; i < total; i++) {
            // these property names are also specified when creating the TreeModel
            var d = {
                k: i,
                c: go.Brush.randomColor(),
                p: (i > 0 ? Math.floor(Math.random() * i / 2) : undefined) // the random parent's key
            };
            treedata.push(d);
        }
        // give the Diagram's model all the data
        myDiagram.model.nodeDataArray = treedata;
        // remove the status indicator
        myDiagram.remove(myLoading);
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
});
