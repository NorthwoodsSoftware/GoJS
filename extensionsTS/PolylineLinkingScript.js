/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./PolylineLinkingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.load = exports.save = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var PolylineLinkingTool_js_1 = require("./PolylineLinkingTool.js");
    var myDiagram;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        myDiagram =
            $(go.Diagram, 'myDiagramDiv', { "undoManager.isEnabled": true });
        // install custom linking tool, defined in PolylineLinkingTool.js
        var tool = new PolylineLinkingTool_js_1.PolylineLinkingTool();
        // tool.temporaryLink.routing = go.Link.Orthogonal;  // optional, but need to keep link template in sync, below
        myDiagram.toolManager.linkingTool = tool;
        myDiagram.nodeTemplate =
            $(go.Node, 'Spot', { locationSpot: go.Spot.Center }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, {
                width: 100, height: 100, fill: 'lightgray',
                portId: '', cursor: 'pointer',
                fromLinkable: true,
                fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                toLinkable: true,
                toLinkableSelfNode: true, toLinkableDuplicates: true // optional
            }, new go.Binding('fill')), $(go.Shape, { width: 70, height: 70, fill: 'transparent', stroke: null }), $(go.TextBlock, new go.Binding('text')));
        myDiagram.linkTemplate =
            $(go.Link, { reshapable: true, resegmentable: true }, 
            // { routing: go.Link.Orthogonal },  // optional, but need to keep LinkingTool.temporaryLink in sync, above
            { adjusting: go.Link.Stretch }, // optional
            new go.Binding('points', 'points').makeTwoWay(), $(go.Shape, { strokeWidth: 1.5 }), $(go.Shape, { toArrow: 'OpenTriangle' }));
        load(); // load a simple diagram from the textarea
    }
    exports.init = init;
    // save a model to and load a model from Json text, displayed below the Diagram
    function save() {
        document.getElementById('mySavedModel').value = myDiagram.model.toJson();
        myDiagram.isModified = false;
    }
    exports.save = save;
    function load() {
        myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);
    }
    exports.load = load;
});
