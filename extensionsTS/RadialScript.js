/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./RadialLayout.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.adjustMaxLayers = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var RadialLayout_js_1 = require("./RadialLayout.js");
    var myDiagram;
    var CustomRadialLayout = /** @class */ (function (_super) {
        __extends(CustomRadialLayout, _super);
        function CustomRadialLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CustomRadialLayout.prototype.rotateNode = function (node, angle, sweep, radius) {
            // rotate the nodes and make sure the text is not upside-down
            node.angle = angle;
            var label = node.findObject('TEXTBLOCK');
            if (label !== null) {
                label.angle = ((angle > 90 && angle < 270 || angle < -90) ? 180 : 0);
            }
        };
        CustomRadialLayout.prototype.commitLayers = function () {
            // optional: add circles in the background
            // need to remove any old ones first
            var diagram = this.diagram;
            if (diagram === null)
                return;
            var gridlayer = diagram.findLayer('Grid');
            if (gridlayer === null)
                return;
            var root = this.root;
            if (root === null)
                return;
            var circles = new go.Set();
            gridlayer.parts.each(function (circle) {
                if (circle.name === 'CIRCLE')
                    circles.add(circle);
            });
            circles.each(function (circle) {
                diagram.remove(circle);
            });
            // add circles centered at the root
            var $$ = go.GraphObject.make; // for conciseness in defining templates
            for (var lay = 1; lay <= this.maxLayers; lay++) {
                var radius = lay * this.layerThickness;
                var circle = $$(go.Part, { name: 'CIRCLE', layerName: 'Grid' }, { locationSpot: go.Spot.Center, location: root.location }, $$(go.Shape, 'Circle', { width: radius * 2, height: radius * 2 }, { fill: 'rgba(200,200,200,0.2)', stroke: null }));
                diagram.add(circle);
            }
        };
        return CustomRadialLayout;
    }(RadialLayout_js_1.RadialLayout));
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            new go.Diagram('myDiagramDiv', // must be the ID or reference to div
            {
                initialAutoScale: go.Diagram.Uniform,
                padding: 10,
                isReadOnly: true,
                layout: $(CustomRadialLayout, { maxLayers: 2 }),
                'animationManager.isEnabled': false
            });
        // shows when hovering over a node
        var commonToolTip = $('ToolTip', $(go.Panel, 'Vertical', { margin: 3 }, $(go.TextBlock, // bound to node data
        { margin: 4, font: 'bold 12pt sans-serif' }, new go.Binding('text')), $(go.TextBlock, // bound to node data
        new go.Binding('text', 'color', function (c) { return 'Color: ' + c; })), $(go.TextBlock, // bound to Adornment because of call to Binding.ofObject
        new go.Binding('text', '', function (ad) { return 'Connections: ' + ad.adornedPart.linksConnected.count; }).ofObject())) // end Vertical Panel
        ); // end Adornment
        // define the Node template
        myDiagram.nodeTemplate =
            $(go.Node, 'Spot', {
                locationSpot: go.Spot.Center,
                locationObjectName: 'SHAPE',
                selectionAdorned: false,
                click: nodeClicked,
                toolTip: commonToolTip
            }, $(go.Shape, 'Circle', {
                name: 'SHAPE',
                fill: 'lightgray',
                stroke: 'transparent',
                strokeWidth: 2,
                desiredSize: new go.Size(20, 20),
                portId: '' // so links will go to the shape, not the whole node
            }, new go.Binding('fill', 'color')), $(go.TextBlock, {
                name: 'TEXTBLOCK',
                alignment: go.Spot.Right,
                alignmentFocus: go.Spot.Left
            }, new go.Binding('text')));
        // this is the root node, at the center of the circular layers
        myDiagram.nodeTemplateMap.add('Root', $(go.Node, 'Auto', {
            locationSpot: go.Spot.Center,
            selectionAdorned: false,
            toolTip: commonToolTip
        }, $(go.Shape, 'Circle', { fill: 'white' }), $(go.TextBlock, { font: 'bold 12pt sans-serif', margin: 5 }, new go.Binding('text'))));
        // define the Link template
        myDiagram.linkTemplate =
            $(go.Link, {
                routing: go.Link.Normal,
                curve: go.Link.Bezier,
                selectionAdorned: false,
                layerName: 'Background'
            }, $(go.Shape, {
                stroke: 'black',
                strokeWidth: 1
            }, new go.Binding('stroke', 'color')));
        generateGraph();
    }
    exports.init = init;
    function generateGraph() {
        var names = [
            'Joshua', 'Daniel', 'Robert', 'Noah', 'Anthony',
            'Elizabeth', 'Addison', 'Alexis', 'Ella', 'Samantha',
            'Joseph', 'Scott', 'James', 'Ryan', 'Benjamin',
            'Walter', 'Gabriel', 'Christian', 'Nathan', 'Simon',
            'Isabella', 'Emma', 'Olivia', 'Sophia', 'Ava',
            'Emily', 'Madison', 'Tina', 'Elena', 'Mia',
            'Jacob', 'Ethan', 'Michael', 'Alexander', 'William',
            'Natalie', 'Grace', 'Lily', 'Alyssa', 'Ashley',
            'Sarah', 'Taylor', 'Hannah', 'Brianna', 'Hailey',
            'Christopher', 'Aiden', 'Matthew', 'David', 'Andrew',
            'Kaylee', 'Juliana', 'Leah', 'Anna', 'Allison',
            'John', 'Samuel', 'Tyler', 'Dylan', 'Jonathan'
        ];
        var nodeDataArray = [];
        for (var i = 0; i < names.length; i++) {
            nodeDataArray.push({ key: i, text: names[i], color: go.Brush.randomColor(128, 240) });
        }
        var linkDataArray = [];
        var num = nodeDataArray.length;
        for (var i = 0; i < num * 2; i++) {
            var a = Math.floor(Math.random() * num);
            var b = Math.floor(Math.random() * num / 4) + 1;
            linkDataArray.push({ from: a, to: (a + b) % num, color: go.Brush.randomColor(0, 127) });
        }
        myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
        var someone = nodeDataArray[Math.floor(Math.random() * nodeDataArray.length)];
        nodeClicked(null, myDiagram.findNodeForData(someone));
    }
    function nodeClicked(e, root) {
        if (!(root instanceof go.Node))
            return;
        var diagram = root.diagram;
        if (diagram === null)
            return;
        // all other nodes should be visible and use the default category
        diagram.nodes.each(function (n) {
            n.visible = true;
            if (n !== root)
                n.category = '';
        });
        // make this Node the root
        root.category = 'Root';
        // tell the RadialLayout what the root node should be
        diagram.layout.root = root;
        diagram.layoutDiagram(true);
    }
    // called when "Set Max Layers" button is clicked
    function adjustMaxLayers() {
        var newMaxLayers = parseInt(document.getElementById('maxLayersChanger').value);
        function isInteger(val) {
            return typeof val === 'number' &&
                isFinite(val) &&
                Math.floor(val) === val;
        }
        if (!isInteger(newMaxLayers) || newMaxLayers < 1 || newMaxLayers > 10) {
            alert('Please enter an integer larger than zero and less than or equal to 10.');
        }
        else {
            var lay = myDiagram.layout;
            lay.maxLayers = Math.max(1, Math.min(newMaxLayers, 10));
            nodeClicked(null, lay.root);
        }
    }
    exports.adjustMaxLayers = adjustMaxLayers;
});
