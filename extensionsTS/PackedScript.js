/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./PackedLayout.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var PackedLayout_js_1 = require("./PackedLayout.js");
    var myDiagram;
    var aspectRatio;
    var layoutWidth;
    var layoutHeight;
    var nodeSpacing;
    var hasCircularNodes;
    var numNodes;
    var nodeMinSide;
    var nodeMaxSide;
    var sameSides;
    // nodes need to be randomized again if any of these change
    var minSidePrevious;
    var maxSidePrevious;
    var sameSidesPrevious;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            $(go.Diagram, 'myDiagramDiv', // must be the ID or reference to div
            {
                'animationManager.isEnabled': true,
                layout: $(PackedLayout_js_1.PackedLayout),
                scale: 0.75, isReadOnly: true
            });
        // Nodes have a template with bindings for size, shape, and fill color
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', new go.Binding('visible', 'visible'), $(go.Shape, { strokeWidth: 0 }, new go.Binding('figure', 'figure'), new go.Binding('width', 'width'), new go.Binding('height', 'height'), new go.Binding('fill', 'fill')));
        myDiagram.model = new go.GraphLinksModel([]);
        // find the elements in the DOM which control configuration
        aspectRatio = document.getElementById('aspectRatio');
        layoutWidth = document.getElementById('width');
        layoutHeight = document.getElementById('height');
        nodeSpacing = document.getElementById('nodeSpacing');
        hasCircularNodes = document.getElementById('hasCircularNodes');
        numNodes = document.getElementById('numNodes');
        nodeMinSide = document.getElementById('nodeMinSide');
        nodeMaxSide = document.getElementById('nodeMaxSide');
        sameSides = document.getElementById('sameSides');
        aspectRatio.onkeydown = aspectRatioHandler;
        // create a layout with the default values
        rebuildGraph();
    }
    exports.init = init;
    // when arrow keys are pressed and the aspect ratio is below 1, increment using the harmonic sequence
    // this makes the aspect ratio change as follows: 3:1, 2:1, 1:1, 1:2, 1:3, etc.
    function aspectRatioHandler(e) {
        if (e.key === 'ArrowUp' && parseFloat(aspectRatio.value) < 1) {
            e.preventDefault();
            var denom = Math.round(1 / parseFloat(aspectRatio.value));
            aspectRatio.value = (+(1 / (denom - 1)).toFixed(2)) + '';
            rebuildGraph();
        }
        else if (e.key === 'ArrowDown' && parseFloat(aspectRatio.value) <= 1) {
            e.preventDefault();
            var denom = Math.round(1 / parseFloat(aspectRatio.value));
            if (denom < 10) {
                aspectRatio.value = (+(1 / (denom + 1)).toFixed(2)) + '';
                rebuildGraph();
            }
        }
    }
    function validateInput() {
        if (!aspectRatio.value || parseFloat(aspectRatio.value) <= 0) {
            aspectRatio.value = '0.1';
        }
        if (!layoutWidth.value || parseFloat(layoutWidth.value) <= 0) {
            layoutWidth.value = '1';
        }
        if (!layoutHeight.value || parseFloat(layoutHeight.value) <= 0) {
            layoutHeight.value = '1';
        }
        if (!nodeSpacing.value) {
            nodeSpacing.value = '0';
        }
        if (!numNodes.value || parseInt(numNodes.value) < 1) {
            numNodes.value = '1';
        }
        if (!nodeMinSide.value || parseFloat(nodeMinSide.value) < 1) {
            nodeMinSide.value = '1';
        }
        if (!nodeMaxSide.value || parseFloat(nodeMaxSide.value) < 1) {
            nodeMaxSide.value = '1';
        }
    }
    function rebuildGraph() {
        validateInput();
        var packShape = PackedLayout_js_1.PackedLayout.Elliptical;
        switch (getRadioValue('packShape')) {
            case 'Elliptical':
                packShape = PackedLayout_js_1.PackedLayout.Elliptical;
                break;
            case 'Rectangular':
                packShape = PackedLayout_js_1.PackedLayout.Rectangular;
                break;
            case 'Spiral':
                packShape = PackedLayout_js_1.PackedLayout.Spiral;
                break;
        }
        var packMode = PackedLayout_js_1.PackedLayout.AspectOnly;
        switch (getRadioValue('packMode')) {
            case 'AspectOnly':
                packMode = PackedLayout_js_1.PackedLayout.AspectOnly;
                break;
            case 'Fit':
                packMode = PackedLayout_js_1.PackedLayout.Fit;
                break;
            case 'ExpandToFit':
                packMode = PackedLayout_js_1.PackedLayout.ExpandToFit;
                break;
        }
        var sortMode = PackedLayout_js_1.PackedLayout.None;
        switch (getRadioValue('sortMode')) {
            case 'None':
                sortMode = PackedLayout_js_1.PackedLayout.None;
                break;
            case 'MaxSide':
                sortMode = PackedLayout_js_1.PackedLayout.MaxSide;
                break;
            case 'Area':
                sortMode = PackedLayout_js_1.PackedLayout.Area;
                break;
        }
        var sortOrder = PackedLayout_js_1.PackedLayout.Descending;
        switch (getRadioValue('sortOrder')) {
            case 'Descending':
                sortOrder = PackedLayout_js_1.PackedLayout.Descending;
                break;
            case 'Ascending':
                sortOrder = PackedLayout_js_1.PackedLayout.Ascending;
                break;
        }
        var params = {
            packMode: packMode,
            packShape: packShape,
            sortMode: sortMode,
            sortOrder: sortOrder,
            aspectRatio: parseFloat(aspectRatio.value),
            size: new go.Size(parseFloat(layoutWidth.value), parseFloat(layoutHeight.value)),
            spacing: parseFloat(nodeSpacing.value),
            hasCircularNodes: hasCircularNodes.checked,
            arrangesToOrigin: false
        };
        disableInputs(params);
        if (sameSides.checked !== sameSidesPrevious
            || parseFloat(nodeMinSide.value) !== minSidePrevious
            || parseFloat(nodeMaxSide.value) !== maxSidePrevious) {
            sameSidesPrevious = sameSides.checked;
            minSidePrevious = parseFloat(nodeMinSide.value);
            maxSidePrevious = parseFloat(nodeMaxSide.value);
            randomize();
            return;
        }
        myDiagram.startTransaction('packed layout');
        generateNodeData();
        myDiagram.layout = go.GraphObject.make(PackedLayout_js_1.PackedLayout, params /* defined above */);
        myDiagram.commitTransaction('packed layout');
    }
    exports.rebuildGraph = rebuildGraph;
    function randomize() {
        myDiagram.model = new go.GraphLinksModel([]);
        rebuildGraph();
    }
    exports.randomize = randomize;
    function generateNodeData() {
        var nodeDataArray = myDiagram.model.nodeDataArray;
        var count = parseInt(numNodes.value);
        var min = parseFloat(nodeMinSide.value);
        var max = parseFloat(nodeMaxSide.value);
        var shapeToPack = getRadioValue('shapeToPack');
        if (count > nodeDataArray.length) {
            var arr = new Array();
            for (var i = nodeDataArray.length; i < count; i++) {
                var width = Math.floor(Math.random() * (max - min + 1)) + min;
                var height = sameSides.checked ? width : Math.floor(Math.random() * (max - min + 1)) + min;
                var color = go.Brush.randomColor(128, 235);
                arr.push({ width: width, height: height, fill: color, figure: shapeToPack });
            }
            myDiagram.model.addNodeDataCollection(arr);
        }
        else if (count < nodeDataArray.length) {
            while (count < nodeDataArray.length) {
                myDiagram.model.removeNodeData(nodeDataArray[nodeDataArray.length - 1]);
            }
        }
        else {
            for (var _i = 0, nodeDataArray_1 = nodeDataArray; _i < nodeDataArray_1.length; _i++) {
                var data = nodeDataArray_1[_i];
                myDiagram.model.set(data, 'figure', shapeToPack);
            }
        }
        sameSidesPrevious = sameSides.checked;
        minSidePrevious = min;
        maxSidePrevious = max;
    }
    var hasCircularNodesSavedState = null;
    var sameSidesSavedState = null;
    function disableInputs(params) {
        setRadioButtonsDisabled('packMode', params.packShape === PackedLayout_js_1.PackedLayout.Spiral);
        aspectRatio.disabled = params.packMode !== PackedLayout_js_1.PackedLayout.AspectOnly || params.packShape === PackedLayout_js_1.PackedLayout.Spiral;
        layoutWidth.disabled = params.packMode === PackedLayout_js_1.PackedLayout.AspectOnly || params.packShape === PackedLayout_js_1.PackedLayout.Spiral;
        layoutHeight.disabled = params.packMode === PackedLayout_js_1.PackedLayout.AspectOnly || params.packShape === PackedLayout_js_1.PackedLayout.Spiral;
        nodeSpacing.disabled = params.packMode === PackedLayout_js_1.PackedLayout.ExpandToFit;
        hasCircularNodes.disabled = params.packShape === PackedLayout_js_1.PackedLayout.Spiral;
        if (params.packShape === PackedLayout_js_1.PackedLayout.Spiral) {
            if (hasCircularNodesSavedState === null) {
                hasCircularNodesSavedState = hasCircularNodes.checked;
            }
            hasCircularNodes.checked = true;
            params.hasCircularNodes = true;
        }
        else if (hasCircularNodesSavedState !== null) {
            hasCircularNodes.checked = hasCircularNodesSavedState;
            params.hasCircularNodes = false;
            hasCircularNodesSavedState = null;
        }
        sameSides.disabled = params.hasCircularNodes;
        if (params.hasCircularNodes) {
            if (sameSidesSavedState === null) {
                sameSidesSavedState = sameSides.checked;
            }
            sameSides.checked = true;
        }
        else if (sameSidesSavedState !== null) {
            sameSides.checked = sameSidesSavedState;
            sameSidesSavedState = null;
        }
    }
    function getRadioValue(name) {
        var radio = document.getElementsByName(name);
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked)
                return radio[i].value;
        }
    }
    function setRadioButtonsDisabled(name, disabled) {
        var radio = document.getElementsByName(name);
        for (var i = 0; i < radio.length; i++) {
            radio[i].disabled = disabled;
        }
    }
});
