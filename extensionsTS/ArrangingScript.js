/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./ArrangingLayout.js"], factory);
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
    var ArrangingLayout_js_1 = require("./ArrangingLayout.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = new go.Diagram("myDiagramDiv", // create a Diagram for the DIV HTML element
        {
            initialAutoScale: go.Diagram.Uniform,
            layout: $(ArrangingLayout_js_1.ArrangingLayout, {
                primaryLayout: $(go.CircularLayout),
                arrangingLayout: $(go.CircularLayout, { nodeDiameterFormula: go.CircularLayout.Circular, spacing: 30 }),
                // Uncommenting this filter will force all of the nodes and links to go into the main subset and thus
                // will cause all those nodes to be arranged by this.arrangingLayout, here a CircularLayout,
                // rather than by the this.sideLayout, which by default is a GridLayout.
                //filter: function(part: go.Part) { return true; },
                // additional custom properties for use by preparePrimaryLayout
                _colors: ["red", "orange", "yellow", "lime", "cyan"],
                _colorIndex: 0,
                // called for each separate connected subgraph
                preparePrimaryLayout: function (lay, coll) {
                    var self = this;
                    var root = null; // find the root node in this subgraph
                    coll.each(function (node) {
                        if (node instanceof go.Node && node.findLinksInto().count === 0)
                            root = node;
                    });
                    var color = "white"; // determine the color for the nodes in this subgraph
                    if (root !== null) {
                        // root.key will be the name of the class that this node represents
                        // Special case: "LayoutNetwork", "LayoutVertex", and "LayoutEdge" classes are "violet"
                        if (root.key.indexOf("Layout") === 0 && root.key.length > "Layout".length) {
                            color = "violet";
                        }
                        else { // otherwise cycle through the Array of colors
                            var ca = self._colors;
                            color = ca[self._colorIndex++ % ca.length];
                        }
                    }
                    coll.each(function (node) {
                        if (node instanceof go.Node) {
                            var shape = node.findObject("SHAPE");
                            if (shape !== null)
                                shape.fill = color;
                        }
                    });
                },
                prepareSideLayout: function (lay, coll, b) {
                    // adjust how wide the GridLayout lays out
                    var self = this;
                    if (self.diagram)
                        lay.wrappingWidth = Math.max(b.width, self.diagram.viewportBounds.width);
                }
            })
        });
        myDiagram.nodeTemplate =
            $(go.Node, go.Panel.Auto, $(go.Shape, { name: "SHAPE", figure: "RoundedRectangle", fill: "lightgray" }, new go.Binding("fill", "color")), $(go.TextBlock, { margin: 2, textAlign: "center" }, new go.Binding("text", "key", function (s) {
                // insert newlines between lowercase followed by uppercase characters
                var arr = s.split("");
                for (var i = 1; i < arr.length - 1; i++) {
                    var a = arr[i - 1];
                    var b = arr[i];
                    if (a === a.toLowerCase() && b === b.toUpperCase()) {
                        arr.splice(i, 0, "\n");
                        i += 2;
                    }
                }
                return arr.join("");
            })));
        myDiagram.linkTemplate =
            $(go.Link, { layerName: "Background" }, $(go.Shape));
        // Collect all of the data for the model of the class hierarchy
        var nodeDataArray = [];
        // Iterate over all of the classes in "go"
        for (var k in go) {
            var cls = go[k];
            if (!cls)
                continue;
            var proto = cls.prototype;
            if (!proto)
                continue;
            proto.constructor.className = k; // remember name
            // find base class constructor
            var base = Object.getPrototypeOf(proto).constructor;
            if (base === Object) { // "root" node?
                nodeDataArray.push({ key: k });
            }
            else {
                // add a node for this class and a tree-parent reference to the base class name
                nodeDataArray.push({ key: k, parent: base.className });
            }
        }
        // Create the model for the hierarchy diagram
        myDiagram.model = new go.TreeModel(nodeDataArray);
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
});
