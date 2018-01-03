(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./DragCreatingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var DragCreatingTool_1 = require("./DragCreatingTool");
    var myDiagram;
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this  
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            $(go.Diagram, "myDiagramDiv", {
                initialContentAlignment: go.Spot.Center,
                // Define the template for Nodes, just some text inside a colored rectangle
                nodeTemplate: $(go.Node, "Auto", { minSize: new go.Size(60, 20), resizable: true }, new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify), 
                // temporarily put selected nodes in ForegFround layer
                new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(), $(go.Shape, "Rectangle", new go.Binding("fill", "color")), $(go.TextBlock, { margin: 2 }, new go.Binding("text", "color"))),
                "undoManager.isEnabled": true
            });
        myDiagram.add($(go.Part, { layerName: "Grid", location: new go.Point(0, 0) }, $(go.TextBlock, "Mouse-down and then drag in the background\nto add a Node there with the drawn size.", { stroke: "brown" })));
        // Add an instance of the custom tool defined in DragCreatingTool.js.
        // This needs to be inserted before the standard DragSelectingTool,
        // which is normally the third Tool in the ToolManager.mouseMoveTools list.
        // Note that if you do not set the DragCreatingTool.delay, the default value will
        // require a wait after the mouse down event.  Not waiting will allow the DragSelectingTool
        // and the PanningTool to be able to run instead of the DragCreatingTool, depending on the delay.
        myDiagram.toolManager.mouseMoveTools.insertAt(2, $(DragCreatingTool_1.DragCreatingTool, {
            isEnabled: true,
            delay: 0,
            box: $(go.Part, { layerName: "Tool" }, $(go.Shape, { name: "SHAPE", fill: null, stroke: "cyan", strokeWidth: 2 })),
            archetypeNodeData: { color: "white" },
            insertPart: function (bounds) {
                // use a different color each time
                this.archetypeNodeData.color = go.Brush.randomColor();
                // call the base method to do normal behavior and return its result
                return DragCreatingTool_1.DragCreatingTool.prototype.insertPart.call(this, bounds);
            }
        }));
    }
    exports.init = init;
    function toolEnabled() {
        var enable = document.getElementById("ToolEnabled").checked;
        var tool = myDiagram.toolManager.findTool("DragCreating");
        if (tool !== null)
            tool.isEnabled = enable;
    }
    exports.toolEnabled = toolEnabled;
});
