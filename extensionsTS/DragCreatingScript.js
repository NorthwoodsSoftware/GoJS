/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./DragCreatingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toolEnabled = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var DragCreatingTool_js_1 = require("./DragCreatingTool.js");
    var myDiagram;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            $(go.Diagram, 'myDiagramDiv', {
                // Define the template for Nodes, just some text inside a colored rectangle
                nodeTemplate: $(go.Node, 'Auto', { minSize: new go.Size(60, 20), resizable: true }, new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify), new go.Binding('position', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify), 
                // temporarily put selected nodes in ForegFround layer
                new go.Binding('layerName', 'isSelected', function (s) { return s ? 'Foreground' : ''; }).ofObject(), $(go.Shape, 'Rectangle', new go.Binding('fill', 'color')), $(go.TextBlock, { margin: 2 }, new go.Binding('text', 'color'))),
                'undoManager.isEnabled': true
            });
        myDiagram.add($(go.Part, { layerName: 'Grid', location: new go.Point(0, 0) }, $(go.TextBlock, 'Mouse-down and then drag in the background\nto add a Node there with the drawn size.', { stroke: 'brown' })));
        var CustomDragCreatingTool = /** @class */ (function (_super) {
            __extends(CustomDragCreatingTool, _super);
            function CustomDragCreatingTool() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CustomDragCreatingTool.prototype.insertPart = function (bounds) {
                if (this.archetypeNodeData === null)
                    return null;
                // use a different color each time
                this.archetypeNodeData.color = go.Brush.randomColor();
                // call the base method to do normal behavior and return its result
                return DragCreatingTool_js_1.DragCreatingTool.prototype.insertPart.call(this, bounds);
            };
            return CustomDragCreatingTool;
        }(DragCreatingTool_js_1.DragCreatingTool));
        // Add an instance of the custom tool defined in DragCreatingTool.js.
        // This needs to be inserted before the standard DragSelectingTool,
        // which is normally the third Tool in the ToolManager.mouseMoveTools list.
        // Note that if you do not set the DragCreatingTool.delay, the default value will
        // require a wait after the mouse down event.  Not waiting will allow the DragSelectingTool
        // and the PanningTool to be able to run instead of the DragCreatingTool, depending on the delay.
        myDiagram.toolManager.mouseMoveTools.insertAt(2, $(CustomDragCreatingTool, {
            isEnabled: true,
            delay: 0,
            box: $(go.Part, { layerName: 'Tool' }, $(go.Shape, { name: 'SHAPE', fill: null, stroke: 'cyan', strokeWidth: 2 })),
            archetypeNodeData: { color: 'white' } // initial properties shared by all nodes
        }));
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
    function toolEnabled() {
        var enable = document.getElementById('ToolEnabled').checked;
        var tool = myDiagram.toolManager.findTool('DragCreating');
        if (tool !== null)
            tool.isEnabled = enable;
    }
    exports.toolEnabled = toolEnabled;
});
