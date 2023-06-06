/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./Figures.js", "./PortShiftingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.load = exports.save = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    require("./Figures.js");
    var PortShiftingTool_js_1 = require("./PortShiftingTool.js");
    var red = 'orangered'; // 0 or false
    var green = 'forestgreen'; // 1 or true
    var myDiagram;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            new go.Diagram('myDiagramDiv', // create a new Diagram in the HTML DIV element "myDiagramDiv"
            {
                'draggingTool.isGridSnapEnabled': true,
                'undoManager.isEnabled': true
            });
        // install the PortShiftingTool as a "mouse move" tool
        myDiagram.toolManager.mouseMoveTools.insertAt(0, new PortShiftingTool_js_1.PortShiftingTool());
        // when the document is modified, add a "*" to the title and enable the "Save" button
        myDiagram.addDiagramListener('Modified', function (e) {
            var button = document.getElementById('saveModel');
            if (button)
                button.disabled = !myDiagram.isModified;
            var idx = document.title.indexOf('*');
            if (myDiagram.isModified) {
                if (idx < 0)
                    document.title += '*';
            }
            else {
                if (idx >= 0)
                    document.title = document.title.slice(0, idx);
            }
        });
        var palette = new go.Palette('palette'); // create a new Palette in the HTML DIV element "palette"
        // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths
        myDiagram.linkTemplate =
            $(go.Link, {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 3,
                relinkableFrom: true, relinkableTo: true,
                selectionAdorned: false,
                shadowOffset: new go.Point(0, 0), shadowBlur: 5, shadowColor: 'blue'
            }, new go.Binding('isShadowed', 'isSelected').ofObject(), $(go.Shape, { name: 'SHAPE', strokeWidth: 2, stroke: red }));
        // node template helpers
        var sharedToolTip = $('ToolTip', { 'Border.figure': 'RoundedRectangle' }, $(go.TextBlock, { margin: 2 }, new go.Binding('text', '', function (d) { return d.category; })));
        // define some common property settings
        function nodeStyle() {
            return [new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                new go.Binding('isShadowed', 'isSelected').ofObject(),
                {
                    selectionAdorned: false,
                    shadowOffset: new go.Point(0, 0),
                    shadowBlur: 15,
                    shadowColor: 'blue',
                    resizable: true,
                    resizeObjectName: 'NODESHAPE',
                    toolTip: sharedToolTip
                }];
        }
        function shapeStyle() {
            return {
                name: 'NODESHAPE',
                fill: 'lightgray',
                stroke: 'darkslategray',
                desiredSize: new go.Size(40, 40),
                strokeWidth: 2
            };
        }
        function portStyle(input) {
            return {
                desiredSize: new go.Size(6, 6),
                fill: 'black',
                fromSpot: go.Spot.Right,
                fromLinkable: !input,
                toSpot: go.Spot.Left,
                toLinkable: input,
                toMaxLinks: 1,
                cursor: 'pointer'
            };
        }
        // define templates for each type of node
        var inputTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'Circle', shapeStyle(), { fill: red }), // override the default fill (from shapeStyle()) to be red
        $(go.Shape, 'Rectangle', portStyle(false), // the only port
        { portId: '', alignment: new go.Spot(1, 0.5) }), {
            doubleClick: function (e, obj) {
                if (!(obj instanceof go.Node))
                    return;
                e.diagram.startTransaction('Toggle Input');
                var shp = obj.findObject('NODESHAPE');
                shp.fill = (shp.fill === green) ? red : green;
                updateStates();
                e.diagram.commitTransaction('Toggle Input');
            }
        });
        var outputTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'Rectangle', shapeStyle(), { fill: green }), // override the default fill (from shapeStyle()) to be green
        $(go.Shape, 'Rectangle', portStyle(true), // the only port
        { portId: '', alignment: new go.Spot(0, 0.5) }));
        var andTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'AndGate', shapeStyle()), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in1', alignment: new go.Spot(0, 0.3) }), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in2', alignment: new go.Spot(0, 0.7) }), $(go.Shape, 'Rectangle', portStyle(false), { portId: 'out', alignment: new go.Spot(1, 0.5) }));
        var orTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'OrGate', shapeStyle()), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in1', alignment: new go.Spot(0.16, 0.3) }), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in2', alignment: new go.Spot(0.16, 0.7) }), $(go.Shape, 'Rectangle', portStyle(false), { portId: 'out', alignment: new go.Spot(1, 0.5) }));
        var xorTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'XorGate', shapeStyle()), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in1', alignment: new go.Spot(0.26, 0.3) }), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in2', alignment: new go.Spot(0.26, 0.7) }), $(go.Shape, 'Rectangle', portStyle(false), { portId: 'out', alignment: new go.Spot(1, 0.5) }));
        var norTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'NorGate', shapeStyle()), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in1', alignment: new go.Spot(0.16, 0.3) }), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in2', alignment: new go.Spot(0.16, 0.7) }), $(go.Shape, 'Rectangle', portStyle(false), { portId: 'out', alignment: new go.Spot(1, 0.5) }));
        var xnorTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'XnorGate', shapeStyle()), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in1', alignment: new go.Spot(0.26, 0.3) }), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in2', alignment: new go.Spot(0.26, 0.7) }), $(go.Shape, 'Rectangle', portStyle(false), { portId: 'out', alignment: new go.Spot(1, 0.5) }));
        var nandTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'NandGate', shapeStyle()), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in1', alignment: new go.Spot(0, 0.3) }), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in2', alignment: new go.Spot(0, 0.7) }), $(go.Shape, 'Rectangle', portStyle(false), { portId: 'out', alignment: new go.Spot(1, 0.5) }));
        var notTemplate = $(go.Node, 'Spot', nodeStyle(), $(go.Shape, 'Inverter', shapeStyle()), $(go.Shape, 'Rectangle', portStyle(true), { portId: 'in', alignment: new go.Spot(0, 0.5) }), $(go.Shape, 'Rectangle', portStyle(false), { portId: 'out', alignment: new go.Spot(1, 0.5) }));
        // add the templates created above to myDiagram and palette
        myDiagram.nodeTemplateMap.add('input', inputTemplate);
        myDiagram.nodeTemplateMap.add('output', outputTemplate);
        myDiagram.nodeTemplateMap.add('and', andTemplate);
        myDiagram.nodeTemplateMap.add('or', orTemplate);
        myDiagram.nodeTemplateMap.add('xor', xorTemplate);
        myDiagram.nodeTemplateMap.add('not', notTemplate);
        myDiagram.nodeTemplateMap.add('nand', nandTemplate);
        myDiagram.nodeTemplateMap.add('nor', norTemplate);
        myDiagram.nodeTemplateMap.add('xnor', xnorTemplate);
        // share the template map with the Palette
        palette.nodeTemplateMap = myDiagram.nodeTemplateMap;
        palette.model.nodeDataArray = [
            { category: 'input' },
            { category: 'output' },
            { category: 'and' },
            { category: 'or' },
            { category: 'xor' },
            { category: 'not' },
            { category: 'nand' },
            { category: 'nor' },
            { category: 'xnor' }
        ];
        // load the initial diagram
        load();
        // continually update the diagram
        loop();
    }
    exports.init = init;
    // update the diagram every 250 milliseconds
    function loop() {
        setTimeout(function () { updateStates(); loop(); }, 250);
    }
    // update the value and appearance of each node according to its type and input values
    function updateStates() {
        var oldskip = myDiagram.skipsUndoManager;
        myDiagram.skipsUndoManager = true;
        // do all "input" nodes first
        myDiagram.nodes.each(function (node) {
            if (node.category === 'input') {
                doInput(node);
            }
        });
        // now we can do all other kinds of nodes
        myDiagram.nodes.each(function (node) {
            switch (node.category) {
                case 'and':
                    doAnd(node);
                    break;
                case 'or':
                    doOr(node);
                    break;
                case 'xor':
                    doXor(node);
                    break;
                case 'not':
                    doNot(node);
                    break;
                case 'nand':
                    doNand(node);
                    break;
                case 'nor':
                    doNor(node);
                    break;
                case 'xnor':
                    doXnor(node);
                    break;
                case 'output':
                    doOutput(node);
                    break;
                case 'input': break; // doInput already called, above
            }
        });
        myDiagram.skipsUndoManager = oldskip;
    }
    // helper predicate
    function linkIsTrue(link) {
        return link.findObject('SHAPE').stroke === green;
    }
    // helper function for propagating results
    function setOutputLinks(node, color) {
        node.findLinksOutOf().each(function (link) { link.findObject('SHAPE').stroke = color; });
    }
    // update nodes by the specific function for its type
    // determine the color of links coming out of this node based on those coming in and node type
    function doInput(node) {
        // the output is just the node's Shape.fill
        setOutputLinks(node, node.findObject('NODESHAPE').fill);
    }
    function doAnd(node) {
        var color = node.findLinksInto().all(linkIsTrue) ? green : red;
        setOutputLinks(node, color);
    }
    function doNand(node) {
        var color = !node.findLinksInto().all(linkIsTrue) ? green : red;
        setOutputLinks(node, color);
    }
    function doNot(node) {
        var color = !node.findLinksInto().all(linkIsTrue) ? green : red;
        setOutputLinks(node, color);
    }
    function doOr(node) {
        var color = node.findLinksInto().any(linkIsTrue) ? green : red;
        setOutputLinks(node, color);
    }
    function doNor(node) {
        var color = !node.findLinksInto().any(linkIsTrue) ? green : red;
        setOutputLinks(node, color);
    }
    function doXor(node) {
        var truecount = 0;
        node.findLinksInto().each(function (link) { if (linkIsTrue(link))
            truecount++; });
        var color = truecount % 2 !== 0 ? green : red;
        setOutputLinks(node, color);
    }
    function doXnor(node) {
        var truecount = 0;
        node.findLinksInto().each(function (link) { if (linkIsTrue(link))
            truecount++; });
        var color = truecount % 2 === 0 ? green : red;
        setOutputLinks(node, color);
    }
    function doOutput(node) {
        // assume there is just one input link
        // we just need to update the node's Shape.fill
        node.linksConnected.each(function (link) { node.findObject('NODESHAPE').fill = link.findObject('SHAPE').stroke; });
    }
    // save a model to and load a model from Json text, displayed below the Diagram
    function save() {
        document.getElementById('mySavedModel').value = myDiagram.model.toJson();
        myDiagram.isModified = false;
    }
    exports.save = save;
    function load() {
        myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);
    }
    exports.load = load;
});
