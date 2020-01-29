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
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = $(go.Diagram, 'myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            isReadOnly: true,
            layout: $(go.CircularLayout, {
                radius: 100,
                spacing: 0,
                nodeDiameterFormula: go.CircularLayout.Circular,
                startAngle: 270 // first node will be at top
            }),
            // define a DiagramEvent listener
            'LayoutCompleted': function (e) {
                // now that the CircularLayout has finished, we know where its center is
                var cntr = myDiagram.findNodeForKey('Center');
                if (cntr !== null)
                    cntr.location = myDiagram.layout.actualCenter;
            }
        });
        // construct a shared radial gradient brush
        var radBrush = $(go.Brush, 'Radial', { 0: '#550266', 1: '#80418C' });
        // these are the nodes that are in a circle
        myDiagram.nodeTemplate =
            $(go.Node, $(go.Shape, 'Circle', {
                desiredSize: new go.Size(28, 28),
                fill: radBrush, strokeWidth: 0, stroke: null
            }), // no outline
            {
                locationSpot: go.Spot.Center,
                click: showArrowInfo,
                toolTip: // define a tooltip for each link that displays its information
                $('ToolTip', $(go.TextBlock, { margin: 4 }, new go.Binding('text', '', infoString).ofObject()))
            });
        // use a special template for the center node
        myDiagram.nodeTemplateMap.add('Center', $(go.Node, 'Spot', {
            selectable: false,
            isLayoutPositioned: false,
            locationSpot: go.Spot.Center
        }, $(go.Shape, 'Circle', { fill: radBrush, strokeWidth: 0, stroke: null, desiredSize: new go.Size(200, 200) }), // no outline
        $(go.TextBlock, 'Arrowheads', { margin: 1, stroke: 'white', font: 'bold 14px sans-serif' })));
        // all Links have both "toArrow" and "fromArrow" Shapes,
        // where both arrow properties are data bound
        myDiagram.linkTemplate =
            $(go.Link, // the whole link panel
            { routing: go.Link.Normal }, $(go.Shape, // the link shape
            // the first element is assumed to be main element: as if isPanelMain were true
            { stroke: 'gray', strokeWidth: 2 }), $(go.Shape, // the "from" arrowhead
            new go.Binding('fromArrow', 'fromArrow'), { scale: 2, fill: '#D4B52C' }), $(go.Shape, // the "to" arrowhead
            new go.Binding('toArrow', 'toArrow'), { scale: 2, fill: '#D4B52C' }), {
                click: showArrowInfo,
                toolTip: // define a tooltip for each link that displays its information
                $('ToolTip', $(go.TextBlock, { margin: 4 }, new go.Binding('text', '', infoString).ofObject()))
            });
        // collect all of the predefined arrowhead names
        var arrowheads = go.Shape.getArrowheadGeometries().toKeySet().toArray();
        if (arrowheads.length % 2 === 1)
            arrowheads.push(''); // make sure there's an even number
        // create all of the link data, two arrowheads per link
        var linkdata = [];
        var i = 0;
        for (var j = 0; j < arrowheads.length; j = j + 2) {
            linkdata.push({ from: 'Center', to: i++, toArrow: arrowheads[j], fromArrow: arrowheads[j + 1] });
        }
        myDiagram.model =
            $(go.GraphLinksModel, {
                // and is then added to the nodeDataArray
                archetypeNodeData: {},
                // the node array starts with just the special Center node
                nodeDataArray: [{ category: 'Center', key: 'Center' }],
                // the link array was created above
                linkDataArray: linkdata
            });
    }
    exports.init = init;
    // a conversion function used to get arrowhead information for a Part
    function infoString(obj) {
        var part = obj.part;
        if (part instanceof go.Adornment)
            part = part.adornedPart;
        var msg = '';
        if (part instanceof go.Link) {
            var link = part;
            msg = 'toArrow: ' + link.data.toArrow + ';\nfromArrow: ' + link.data.fromArrow;
        }
        else if (part instanceof go.Node) {
            var node = part;
            var link = node.linksConnected.first();
            if (link)
                msg = 'toArrow: ' + link.data.toArrow + ';\nfromArrow: ' + link.data.fromArrow;
        }
        return msg;
    }
    exports.infoString = infoString;
    // a GraphObject.click event handler to show arrowhead information
    function showArrowInfo(e, obj) {
        var msg = infoString(obj);
        if (msg) {
            var status_1 = document.getElementById('myArrowheadInfo');
            if (status_1)
                status_1.textContent = msg;
        }
    }
    exports.showArrowInfo = showArrowInfo;
});
