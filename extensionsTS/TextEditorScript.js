(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./TextEditor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    require("./TextEditor");
    function init() {
        if (typeof window["goSamples"] === 'function')
            window["goSamples"](); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
        {
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true // enable undo & redo
        });
        myDiagram.toolManager.textEditingTool.defaultTextEditor = window.TextEditor;
        // this predicate is true if the new string has at least three characters
        // and has a vowel in it
        function okName(textblock, oldstr, newstr) {
            return newstr.length >= 3 && /[aeiouy]/i.test(newstr);
        }
        ;
        // define a simple Node template
        myDiagram.nodeTemplate =
            $(go.Node, "Auto", // the Shape will go around the TextBlock
            $(go.Shape, "RoundedRectangle", { strokeWidth: 0 }, new go.Binding("fill", "color")), $(go.TextBlock, { margin: 8, editable: true, textValidation: okName }, // some room around the text
            new go.Binding("text", "key")));
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
});
