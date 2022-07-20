/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js"], factory);
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
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, 'myDiagramDiv', {
            "LayoutCompleted": function (e) {
                e.diagram.nodes.each(function (n) {
                    var table = n.findObject("TABLE");
                    if (table !== null && table.panel._updateScrollBar)
                        table.panel._updateScrollBar(table);
                });
            }
        });
        // support mouse wheel scrolling of table when the mouse is in the table
        myDiagram.toolManager.doMouseWheel = function () {
            var e = this.diagram.lastInput;
            var tab = this.diagram.findObjectAt(e.documentPoint);
            while (tab !== null && !tab._updateScrollBar)
                tab = tab.panel;
            if (tab instanceof go.Panel) {
                var table = tab.findObject("TABLE");
                if (table instanceof go.Panel) {
                    var delta = e.delta;
                    var incr = e.shift ? 5 : 1;
                    if (delta > 0) {
                        table.topIndex = Math.max(0, table.topIndex - incr);
                    }
                    else if (delta < 0) {
                        table.topIndex = Math.min(table.topIndex + incr, table.rowCount - 1);
                    }
                }
                tab._updateScrollBar(table);
                e.handled = true;
                return;
            }
            go.ToolManager.prototype.doMouseWheel.call(this);
        };
        myDiagram.nodeTemplate =
            $(go.Node, 'Vertical', {
                selectionObjectName: 'SCROLLER',
                resizable: true, resizeObjectName: 'SCROLLER',
                portSpreading: go.Node.SpreadingNone
            }, new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), $(go.TextBlock, { font: 'bold 14px sans-serif' }, new go.Binding('text', 'key')), $(go.Panel, 'Auto', $(go.Shape, { fill: 'white' }), $('ScrollingTable', {
                name: 'SCROLLER',
                desiredSize: new go.Size(NaN, 60),
                stretch: go.GraphObject.Fill,
                defaultColumnSeparatorStroke: 'gray',
                defaultColumnSeparatorStrokeWidth: 0.5
            }, new go.Binding('TABLE.itemArray', 'items'), new go.Binding('TABLE.column', 'left', function (left) { return left ? 2 : 0; }), new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), {
                'TABLE.itemTemplate': $(go.Panel, 'TableRow', {
                    defaultStretch: go.GraphObject.Horizontal,
                    fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides,
                    fromLinkable: true, toLinkable: true
                }, new go.Binding('portId', 'name'), $(go.TextBlock, { column: 0 }, new go.Binding('text', 'name')), $(go.TextBlock, { column: 1 }, new go.Binding('text', 'value'))),
                'TABLE.defaultColumnSeparatorStroke': 'gray',
                'TABLE.defaultColumnSeparatorStrokeWidth': 0.5,
                'TABLE.defaultRowSeparatorStroke': 'gray',
                'TABLE.defaultRowSeparatorStrokeWidth': 0.5,
                'TABLE.defaultSeparatorPadding': new go.Margin(1, 3, 0, 3)
            })));
        myDiagram.model = new go.GraphLinksModel({
            linkFromPortIdProperty: 'fromPort',
            linkToPortIdProperty: 'toPort',
            nodeDataArray: [
                {
                    key: 'Alpha', left: true, loc: "0 0", size: "100 50",
                    items: [
                        { name: 'A', value: 1 },
                        { name: 'B', value: 2 },
                        { name: 'C', value: 3 },
                        { name: 'D', value: 4 },
                        { name: 'E', value: 5 },
                        { name: 'F', value: 6 },
                        { name: 'G', value: 7 }
                    ]
                },
                {
                    key: 'Beta', loc: "150 0", size: "80 70",
                    items: [
                        { name: 'Aa', value: 1 },
                        { name: 'Bb', value: 2 },
                        { name: 'Cc', value: 3 },
                        { name: 'Dd', value: 4 },
                        { name: 'Ee', value: 5 },
                        { name: 'Ff', value: 6 },
                        { name: 'Gg', value: 7 },
                        { name: 'Hh', value: 8 },
                        { name: 'Ii', value: 9 },
                        { name: 'Jj', value: 10 },
                        { name: 'Kk', value: 11 },
                        { name: 'Ll', value: 12 },
                        { name: 'Mm', value: 13 },
                        { name: 'Nn', value: 14 }
                    ]
                }
            ],
            linkDataArray: [
                { from: 'Alpha', fromPort: 'D', to: 'Beta', toPort: 'Ff' },
                { from: 'Alpha', fromPort: 'A', to: 'Beta', toPort: 'Nn' },
                { from: 'Alpha', fromPort: 'G', to: 'Beta', toPort: 'Aa' }
            ]
        });
    }
    exports.init = init;
});
