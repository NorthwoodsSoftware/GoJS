/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./ParallelLayout.js"], factory);
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
    var ParallelLayout_js_1 = require("./ParallelLayout.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = new go.Diagram('myDiagramDiv', // must be the ID or reference to div
        {
            allowCopy: false,
            allowDelete: false,
            layout: $(ParallelLayout_js_1.ParallelLayout, { layerSpacing: 20, nodeSpacing: 10 })
        });
        // define the Node templates
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', { locationSpot: go.Spot.Center }, $(go.Shape, 'Rectangle', { fill: 'wheat', stroke: null, strokeWidth: 0 }), $(go.TextBlock, { margin: 3 }, new go.Binding('text')));
        myDiagram.nodeTemplateMap.add('Split', $(go.Node, 'Auto', { locationSpot: go.Spot.Center }, $(go.Shape, 'Diamond', {
            fill: 'deepskyblue', stroke: null, strokeWidth: 0,
            desiredSize: new go.Size(28, 28)
        }), $(go.TextBlock, new go.Binding('text'))));
        myDiagram.nodeTemplateMap.add('Merge', $(go.Node, 'Auto', { locationSpot: go.Spot.Center }, $(go.Shape, 'Circle', {
            fill: 'deepskyblue', stroke: null, strokeWidth: 0,
            desiredSize: new go.Size(28, 28)
        }), $(go.TextBlock, new go.Binding('text'))));
        // define the Link template to be minimal
        myDiagram.linkTemplate =
            $(go.Link, { routing: go.Link.Orthogonal, corner: 5 }, $(go.Shape, { stroke: 'gray', strokeWidth: 1.5 }));
        // define the Group template to be fairly simple
        myDiagram.groupTemplate =
            $(go.Group, 'Auto', {
                layout: $(ParallelLayout_js_1.ParallelLayout, { layerSpacing: 20, nodeSpacing: 10 })
            }, $(go.Shape, { fill: 'transparent', stroke: 'darkgoldenrod' }), $(go.Placeholder, { padding: 10 }), $('SubGraphExpanderButton', { alignment: go.Spot.TopLeft }));
        myDiagram.model = new go.GraphLinksModel([
            { key: -1, isGroup: true },
            { key: -2, isGroup: true },
            { key: -3, isGroup: true },
            { key: 1, text: 'S', category: 'Split', group: -1 },
            { key: 2, text: 'C', group: -1 },
            { key: 3, text: 'Longer Node', group: -1 },
            { key: 4, text: 'A', group: -1 },
            { key: 5, text: 'B\nB', group: -1 },
            { key: 6, text: 'Another', group: -1 },
            { key: 9, text: 'J', category: 'Merge', group: -1 },
            { key: 11, text: 'T', category: 'Split', group: -2 },
            { key: 12, text: 'C', group: -2 },
            { key: 13, text: 'Here', group: -2 },
            { key: 14, text: 'D', group: -2 },
            { key: 15, text: 'Everywhere', group: -2 },
            { key: 16, text: 'EEEEE', group: -2 },
            { key: 19, text: 'K', category: 'Merge', group: -2 },
            { key: 21, text: 'U', category: 'Split', group: -3 },
            { key: 22, text: 'F', group: -3 },
            { key: 23, text: 'Medium\nTall\nNode', group: -3 },
            { key: 24, text: 'G', group: -3 },
            { key: 25, text: 'AS', group: -3 },
            { key: 26, text: 'H\nHH\nHHH', group: -3 },
            { key: 27, text: 'I', group: -3 },
            { key: 29, text: 'L', category: 'Merge', group: -3 },
            { key: 101, text: '0', category: 'Split' },
            { key: 107, text: 'ABCDEFG' },
            { key: 109, text: '*', category: 'Merge' }
        ], [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 9 },
            { from: 1, to: 5 },
            { from: 5, to: 6 },
            { from: 6, to: 9 },
            { from: 9, to: 11 },
            { from: 9, to: 21 },
            { from: 11, to: 12 },
            { from: 12, to: 13 },
            { from: 13, to: 14 },
            { from: 14, to: 19 },
            { from: 11, to: 15 },
            { from: 15, to: 16 },
            { from: 16, to: 19 },
            { from: 21, to: 22 },
            { from: 22, to: 24 },
            { from: 24, to: 26 },
            { from: 23, to: 29 },
            { from: 21, to: 25 },
            { from: 25, to: 23 },
            { from: 21, to: 27 },
            { from: 26, to: 29 },
            { from: 27, to: 29 },
            { from: 101, to: 1 },
            { from: 19, to: 109 },
            { from: 29, to: 107 },
            { from: 107, to: 109 }
        ]);
    }
    exports.init = init;
});
