/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./SerpentineLayout"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var go = require("../release/go");
    var SerpentineLayout_1 = require("./SerpentineLayout");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, 'myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            isTreePathToChildren: false,
            layout: $(SerpentineLayout_1.SerpentineLayout) // defined in SerpentineLayout.js
        });
        myDiagram.nodeTemplate =
            $(go.Node, go.Panel.Auto, $(go.Shape, { figure: 'RoundedRectangle', fill: 'white' }, new go.Binding('fill', 'color')), $(go.TextBlock, { margin: 4 }, new go.Binding('text', 'key')));
        myDiagram.linkTemplate =
            $(go.Link, go.Link.Orthogonal, { corner: 5 }, $(go.Shape), $(go.Shape, { toArrow: 'Standard' }));
        myDiagram.model = $(go.TreeModel, {
            nodeParentKeyProperty: 'next',
            nodeDataArray: [
                { key: 'Alpha', next: 'Beta', color: 'coral' },
                { key: 'Beta', next: 'Gamma', color: 'tomato' },
                { key: 'Gamma', next: 'Delta', color: 'goldenrod' },
                { key: 'Delta', next: 'Epsilon', color: 'orange' },
                { key: 'Epsilon', next: 'Zeta', color: 'coral' },
                { key: 'Zeta', next: 'Eta', color: 'tomato' },
                { key: 'Eta', next: 'Theta', color: 'goldenrod' },
                { key: 'Theta', next: 'Iota', color: 'orange' },
                { key: 'Iota', next: 'Kappa', color: 'coral' },
                { key: 'Kappa', next: 'Lambda', color: 'tomato' },
                { key: 'Lambda', next: 'Mu', color: 'goldenrod' },
                { key: 'Mu', next: 'Nu', color: 'orange' },
                { key: 'Nu', next: 'Xi', color: 'coral' },
                { key: 'Xi', next: 'Omicron', color: 'tomato' },
                { key: 'Omicron', next: 'Pi', color: 'goldenrod' },
                { key: 'Pi', next: 'Rho', color: 'orange' },
                { key: 'Rho', next: 'Sigma', color: 'coral' },
                { key: 'Sigma', next: 'Tau', color: 'tomato' },
                { key: 'Tau', next: 'Upsilon', color: 'goldenrod' },
                { key: 'Upsilon', next: 'Phi', color: 'orange' },
                { key: 'Phi', next: 'Chi', color: 'coral' },
                { key: 'Chi', next: 'Psi', color: 'tomato' },
                { key: 'Psi', next: 'Omega', color: 'goldenrod' },
                { key: 'Omega', color: 'orange' }
            ]
        });
    }
    exports.init = init;
});
