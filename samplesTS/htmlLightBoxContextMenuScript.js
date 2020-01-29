(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go.js");
    var myDiagram = null;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        // Initialize the Diagram
        myDiagram =
            $(go.Diagram, 'myDiagramDiv', // create a Diagram for the DIV HTML element
            { 'undoManager.isEnabled': true });
        // define a simple Node template (but use the default Link template)
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', { contextMenu: window.myHTMLLightBox }, // window.myHTMLLightBox is defined in extensions/LightBoxContextMenu.js
            $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, 
            // Shape.fill is bound to Node.data.color
            new go.Binding('fill', 'color')), $(go.TextBlock, { margin: 8 }, // some room around the text
            // TextBlock.text is bound to Node.data.key
            new go.Binding('text', 'key')));
        // create the model data that will be represented by Nodes and Links
        myDiagram.model = new go.GraphLinksModel([
            { key: 'Alpha', color: 'lightblue' },
            { key: 'Beta', color: 'orange' },
            { key: 'Gamma', color: 'lightgreen' },
            { key: 'Delta', color: 'pink' }
        ], [
            { from: 'Alpha', to: 'Beta' },
            { from: 'Alpha', to: 'Gamma' },
            { from: 'Beta', to: 'Beta' },
            { from: 'Gamma', to: 'Delta' },
            { from: 'Delta', to: 'Alpha' }
        ]);
        myDiagram.contextMenu = window.myHTMLLightBox; // window.myHTMLLightBox is defined in extensions/lightbox.js
    } // end init
    exports.init = init;
});
