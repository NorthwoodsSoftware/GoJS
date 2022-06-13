/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./DrawCommandHandler.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.back = exports.front = exports.rotate180 = exports.rotateNeg90 = exports.rotate90 = exports.rotateNeg45 = exports.rotate45 = exports.column = exports.row = exports.cenY = exports.cenX = exports.bottoms = exports.tops = exports.rights = exports.lefts = exports.arrowMode = exports.askSpace = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var DrawCommandHandler_js_1 = require("./DrawCommandHandler.js");
    var myDiagram;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram = $(go.Diagram, 'myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            commandHandler: new DrawCommandHandler_js_1.DrawCommandHandler(),
            "commandHandler.archetypeGroupData": { isGroup: true },
            'undoManager.isEnabled': true // enable undo & redo
        });
        // define a simple Node template
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', // the Shape will go around the TextBlock
            { locationSpot: go.Spot.Center }, $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, 
            // Shape.fill is bound to Node.data.color
            new go.Binding('fill', 'color')), $(go.TextBlock, { margin: 8 }, // some room around the text
            // TextBlock.text is bound to Node.data.key
            new go.Binding('text', 'key')));
        // but use the default Link template, by not setting Diagram.linkTemplate
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
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
    function askSpace() {
        var space = parseInt(prompt('Desired space between nodes (in pixels):') || '0');
        return space;
    }
    exports.askSpace = askSpace;
    // update arrowkey function
    function arrowMode() {
        // no transaction needed, because we are modifying the CommandHandler for future use
        var move = document.getElementById('move');
        var select = document.getElementById('select');
        var scroll = document.getElementById('scroll');
        if (move.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = 'move';
        }
        else if (select.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = 'select';
        }
        else if (scroll.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = 'scroll';
        }
    }
    exports.arrowMode = arrowMode;
    function lefts() { myDiagram.commandHandler.alignLeft(); }
    exports.lefts = lefts;
    function rights() { myDiagram.commandHandler.alignRight(); }
    exports.rights = rights;
    function tops() { myDiagram.commandHandler.alignTop(); }
    exports.tops = tops;
    function bottoms() { myDiagram.commandHandler.alignBottom(); }
    exports.bottoms = bottoms;
    function cenX() { myDiagram.commandHandler.alignCenterX(); }
    exports.cenX = cenX;
    function cenY() { myDiagram.commandHandler.alignCenterY(); }
    exports.cenY = cenY;
    function row() { myDiagram.commandHandler.alignRow(askSpace()); }
    exports.row = row;
    function column() { myDiagram.commandHandler.alignColumn(askSpace()); }
    exports.column = column;
    function rotate45() { myDiagram.commandHandler.rotate(45); }
    exports.rotate45 = rotate45;
    function rotateNeg45() { myDiagram.commandHandler.rotate(-45); }
    exports.rotateNeg45 = rotateNeg45;
    function rotate90() { myDiagram.commandHandler.rotate(90); }
    exports.rotate90 = rotate90;
    function rotateNeg90() { myDiagram.commandHandler.rotate(-90); }
    exports.rotateNeg90 = rotateNeg90;
    function rotate180() { myDiagram.commandHandler.rotate(180); }
    exports.rotate180 = rotate180;
    function front() { myDiagram.commandHandler.pullToFront(); }
    exports.front = front;
    function back() { myDiagram.commandHandler.pushToBack(); }
    exports.back = back;
});
