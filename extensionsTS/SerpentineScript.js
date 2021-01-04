/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./SerpentineLayout.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var SerpentineLayout_js_1 = require("./SerpentineLayout.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, 'myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            isTreePathToChildren: false,
            layout: $(SerpentineLayout_js_1.SerpentineLayout) // defined in SerpentineLayout.js
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
