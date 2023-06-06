/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./NonRealtimeDraggingTool.js"], factory);
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
    var NonRealtimeDraggingTool_js_1 = require("./NonRealtimeDraggingTool.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = new go.Diagram('myDiagramDiv', {
            draggingTool: $(NonRealtimeDraggingTool_js_1.NonRealtimeDraggingTool, { duration: 600 }),
            'undoManager.isEnabled': true
        });
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', { locationSpot: go.Spot.Center }, $(go.Shape, 'Circle', {
                fill: 'white',
                portId: '', cursor: 'pointer',
                // allow all kinds of links from and to this port
                fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
            }, new go.Binding('fill', 'color')), $(go.TextBlock, {
                font: 'bold 14px sans-serif',
                stroke: '#333',
                margin: 6,
                isMultiline: false,
                editable: true // allow in-place editing by user
            }, new go.Binding('text', 'text').makeTwoWay()) // the label shows the node data's text
            );
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, text: 'Alpha', color: 'lightblue' },
            { key: 2, text: 'Beta', color: 'orange' },
            { key: 3, text: 'Gamma', color: 'lightgreen', group: 5 },
            { key: 4, text: 'Delta', color: 'pink', group: 5 },
            { key: 5, text: 'Epsilon', color: 'green', isGroup: true }
        ], [
            { from: 1, to: 2, color: 'blue' },
            { from: 2, to: 2 },
            { from: 3, to: 4, color: 'green' },
            { from: 3, to: 1, color: 'purple' }
        ]);
    }
    exports.init = init;
});
