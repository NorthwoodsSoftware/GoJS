/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./ParallelRouteLink.js"], factory);
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
    var ParallelRouteLink_js_1 = require("./ParallelRouteLink.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, 'myDiagramDiv', {
            'undoManager.isEnabled': true
        });
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, {
                portId: '',
                fromLinkable: true, toLinkable: true,
                fromLinkableDuplicates: true, toLinkableDuplicates: true,
                cursor: 'pointer'
            }, new go.Binding('fill', 'color')), $(go.TextBlock, { margin: 8 }, new go.Binding('text')));
        myDiagram.linkTemplate =
            $(ParallelRouteLink_js_1.ParallelRouteLink, {
                relinkableFrom: true, relinkableTo: true,
                reshapable: true // , resegmentable: true
            }, $(go.Shape, { strokeWidth: 2 }, new go.Binding('stroke', 'fromNode', function (node) { return node.port.fill; }).ofObject()), $(go.Shape, { toArrow: 'OpenTriangle', strokeWidth: 1.5 }, new go.Binding('stroke', 'fromNode', function (node) { return node.port.fill; }).ofObject()));
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, text: 'Alpha', color: 'lightblue', loc: '0 0' },
            { key: 2, text: 'Beta', color: 'orange', loc: '130 70' },
            { key: 3, text: 'Gamma', color: 'lightgreen', loc: '0 130' }
        ], [
            { from: 1, to: 2 },
            { from: 2, to: 1 },
            { from: 1, to: 3 },
            { from: 1, to: 3 },
            { from: 3, to: 1 },
            { from: 1, to: 3 },
            { from: 1, to: 3 }
        ]);
    }
    exports.init = init;
});
