/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./SpiralLayout.js"], factory);
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
    var SpiralLayout_js_1 = require("./SpiralLayout.js");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = new go.Diagram('myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            initialAutoScale: go.Diagram.Uniform,
            isTreePathToChildren: false,
            layout: $(SpiralLayout_js_1.SpiralLayout) // defined in SpiralLayout.js
        });
        myDiagram.nodeTemplate =
            $(go.Node, go.Panel.Auto, { locationSpot: go.Spot.Center }, $(go.Shape, { figure: 'Circle', fill: 'white' }, new go.Binding('fill', 'color')), $(go.TextBlock, { margin: 4 }, new go.Binding('text', 'key')));
        myDiagram.linkTemplate =
            $(go.Link, { curve: go.Link.Bezier, curviness: 10 }, $(go.Shape), $(go.Shape, { toArrow: 'Standard' }));
        var model = new go.TreeModel();
        model.nodeParentKeyProperty = 'next';
        model.nodeDataArray = [
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
            { key: 'Omega', next: 'Alpha2', color: 'orange' },
            { key: 'Alpha2', next: 'Beta2', color: 'coral' },
            { key: 'Beta2', next: 'Gamma2', color: 'tomato' },
            { key: 'Gamma2', next: 'Delta2', color: 'goldenrod' },
            { key: 'Delta2', next: 'Epsilon2', color: 'orange' },
            { key: 'Epsilon2', next: 'Zeta2', color: 'coral' },
            { key: 'Zeta2', next: 'Eta2', color: 'tomato' },
            { key: 'Eta2', next: 'Theta2', color: 'goldenrod' },
            { key: 'Theta2', next: 'Iota2', color: 'orange' },
            { key: 'Iota2', next: 'Kappa2', color: 'coral' },
            { key: 'Kappa2', next: 'Lambda2', color: 'tomato' },
            { key: 'Lambda2', next: 'Mu2', color: 'goldenrod' },
            { key: 'Mu2', next: 'Nu2', color: 'orange' },
            { key: 'Nu2', next: 'Xi2', color: 'coral' },
            { key: 'Xi2', next: 'Omicron2', color: 'tomato' },
            { key: 'Omicron2', next: 'Pi2', color: 'goldenrod' },
            { key: 'Pi2', next: 'Rho2', color: 'orange' },
            { key: 'Rho2', next: 'Sigma2', color: 'coral' },
            { key: 'Sigma2', next: 'Tau2', color: 'tomato' },
            { key: 'Tau2', next: 'Upsilon2', color: 'goldenrod' },
            { key: 'Upsilon2', next: 'Phi2', color: 'orange' },
            { key: 'Phi2', next: 'Chi2', color: 'coral' },
            { key: 'Chi2', next: 'Psi2', color: 'tomato' },
            { key: 'Psi2', next: 'Omega2', color: 'goldenrod' },
            { key: 'Omega2', color: 'orange' }
        ];
        myDiagram.model = model;
    }
    exports.init = init;
});
