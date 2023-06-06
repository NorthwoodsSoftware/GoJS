/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./PanelLayoutFlow.js"], factory);
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
    var PanelLayoutFlow_js_1 = require("./PanelLayoutFlow.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = new go.Diagram("myDiagramDiv", { "undoManager.isEnabled": true });
        myDiagram.nodeTemplate =
            $(go.Node, "Vertical", $(go.TextBlock, { font: "bold 10pt sans-serif" }, new go.Binding("text")), $(go.Shape, {
                width: 40, height: 40,
                fill: "white",
                portId: "",
                fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides
            }, new go.Binding("fill", "color"), new go.Binding("figure").makeTwoWay()), $(go.Panel, "Flow", new go.Binding("itemArray", "values"), {
                maxSize: new go.Size(40, NaN),
                background: "transparent",
                itemTemplate: $(go.Panel, $(go.TextBlock, { font: "9pt sans-serif", margin: new go.Margin(1, 1, 0, 1) }, new go.Binding("text", "")))
            }));
        myDiagram.nodeTemplate.contextMenu =
            $(go.Adornment, "Table", { background: "gray", defaultAlignment: go.Spot.Top, padding: 10 }, $(go.Panel, "Vertical", { column: 0, stretch: go.GraphObject.Vertical, defaultStretch: go.GraphObject.Horizontal }, makeTabLabel("A Figures", true), makeTabLabel("B Figures"), makeTabLabel("C Figures")), $(go.RowColumnDefinition, { column: 1, width: 10 }), makeFlowPanel("A Figures", ["Square", "Circle", "RoundedRectangle", "Diamond"], true), makeFlowPanel("B Figures", ["TriangleUp", "TriangleRight", "TriangleDown", "TriangleLeft"]), makeFlowPanel("C Figures", ["LineH", "LineV", "BarH", "BarV", "MinusLine", "PlusLine", "XLine"]));
        function makeTabLabel(name, selected) {
            return $(go.TextBlock, name, {
                margin: new go.Margin(2, 2, 0, 2),
                mouseEnter: function (e, obj) {
                    var tb = obj;
                    var ad = tb.part;
                    var stb = ad["selectedTextBlock"];
                    if (stb === tb)
                        return;
                    if (stb) { // this keeps a reference to the selected TextBlock
                        stb.background = null;
                        var oldpan = ad.findObject(stb.text);
                        if (oldpan)
                            oldpan.visible = false;
                    }
                    ad["selectedTextBlock"] = tb;
                    tb.background = "white";
                    var newpan = ad.findObject(tb.text);
                    if (newpan)
                        newpan.visible = true;
                }
            });
        }
        function makeFlowPanel(name, figures, selected) {
            return $(go.Panel, $(PanelLayoutFlow_js_1.PanelLayoutFlow, { spacing: new go.Size(5, 5), direction: 90 }), {
                name: name,
                column: 2,
                maxSize: new go.Size(NaN, 130),
                visible: !!selected
            }, figures.map(makeShape));
        }
        function makeShape(fig) {
            return $(go.Shape, fig, {
                width: 30, height: 30,
                fill: "white",
                background: "transparent",
                click: function (e, shape) {
                    var ad = shape.part;
                    e.diagram.commit(function (diag) {
                        diag.model.set(ad.data, "figure", fig);
                        ad.adornedPart.invalidateConnectedLinks();
                    }, "modified figure");
                }
            });
        }
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, text: "Alpha", color: "lightblue", values: ["A", "B", "C", "D", "E", "F", "G", "H"] },
            { key: 2, text: "Beta", color: "orange", figure: "Diamond", values: ["I", "J"] },
            { key: 3, text: "Gamma", color: "lightgreen", figure: "Circle", values: ["123", "456", "7890"] },
            { key: 4, text: "Delta", color: "pink", figure: "Triangle" }
        ], [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 1 }
        ]);
    }
    exports.init = init;
});
