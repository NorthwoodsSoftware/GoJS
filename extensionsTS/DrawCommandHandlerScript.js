(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./DrawcommandHandler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var DrawcommandHandler_1 = require("./DrawcommandHandler");
    var myDiagram;
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram = $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
        {
            initialContentAlignment: go.Spot.Center,
            commandHandler: new DrawcommandHandler_1.DrawCommandHandler(),
            "undoManager.isEnabled": true // enable undo & redo
        });
        // define a simple Node template
        myDiagram.nodeTemplate =
            $(go.Node, "Auto", // the Shape will go around the TextBlock
            { locationSpot: go.Spot.Center }, $(go.Shape, "RoundedRectangle", { strokeWidth: 0 }, 
            // Shape.fill is bound to Node.data.color
            new go.Binding("fill", "color")), $(go.TextBlock, { margin: 8 }, // some room around the text
            // TextBlock.text is bound to Node.data.key
            new go.Binding("text", "key")));
        // but use the default Link template, by not setting Diagram.linkTemplate
        // create the model data that will be represented by Nodes and Links
        myDiagram.model = new go.GraphLinksModel([
            { key: "Alpha", color: "lightblue" },
            { key: "Beta", color: "orange" },
            { key: "Gamma", color: "lightgreen" },
            { key: "Delta", color: "pink" }
        ], [
            { from: "Alpha", to: "Beta" },
            { from: "Alpha", to: "Gamma" },
            { from: "Beta", to: "Beta" },
            { from: "Gamma", to: "Delta" },
            { from: "Delta", to: "Alpha" }
        ]);
    }
    exports.init = init;
    function askSpace() {
        var space = parseInt(prompt("Desired space between nodes (in pixels):", "0"));
        return space;
    }
    exports.askSpace = askSpace;
    // update arrowkey function
    function arrowMode() {
        // no transaction needed, because we are modifying the CommandHandler for future use
        var move = document.getElementById("move");
        var select = document.getElementById("select");
        var scroll = document.getElementById("scroll");
        if (move.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = "move";
        }
        else if (select.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = "select";
        }
        else if (scroll.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = "scroll";
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
});
