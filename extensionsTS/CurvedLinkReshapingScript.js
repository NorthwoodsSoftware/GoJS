/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./CurvedLinkReshapingTool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.load = exports.save = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var CurvedLinkReshapingTool_js_1 = require("./CurvedLinkReshapingTool.js");
    var myDiagram;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
            $(go.Diagram, 'myDiagramDiv', // must name or refer to the DIV HTML element
            {
                // have mouse wheel events zoom in and out instead of scroll up and down
                'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
                // support double-click in background creating a new node
                'clickCreatingTool.archetypeNodeData': { text: 'new node' },
                'linkReshapingTool': new CurvedLinkReshapingTool_js_1.CurvedLinkReshapingTool(),
                // enable undo & redo
                'undoManager.isEnabled': true
            });
        // when the document is modified, add a "*" to the title and enable the "Save" button
        myDiagram.addDiagramListener('Modified', function (e) {
            var button = document.getElementById('SaveButton');
            if (button)
                button.disabled = !myDiagram.isModified;
            var idx = document.title.indexOf('*');
            if (myDiagram.isModified) {
                if (idx < 0)
                    document.title += '*';
            }
            else {
                if (idx >= 0)
                    document.title = document.title.substr(0, idx);
            }
        });
        // define the Node template
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), 
            // define the node's outer shape, which will surround the TextBlock
            $(go.Shape, 'RoundedRectangle', {
                parameter1: 20,
                fill: $(go.Brush, 'Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }),
                stroke: 'black',
                portId: '',
                fromLinkable: true,
                fromLinkableSelfNode: true,
                fromLinkableDuplicates: true,
                toLinkable: true,
                toLinkableSelfNode: true,
                toLinkableDuplicates: true,
                cursor: 'pointer'
            }), $(go.TextBlock, {
                font: 'bold 11pt helvetica, bold arial, sans-serif',
                editable: true // editing the text automatically updates the model data
            }, new go.Binding('text', 'text').makeTwoWay()));
        // unlike the normal selection Adornment, this one includes a Button
        myDiagram.nodeTemplate.selectionAdornmentTemplate =
            $(go.Adornment, 'Spot', $(go.Panel, 'Auto', $(go.Shape, { fill: null, stroke: 'blue', strokeWidth: 2 }), $(go.Placeholder) // this represents the selected Node
            ), 
            // the button to create a "next" node, at the top-right corner
            $('Button', {
                alignment: go.Spot.TopRight,
                click: addNodeAndLink // this function is defined below
            }, $(go.Shape, 'PlusLine', { desiredSize: new go.Size(6, 6) })) // end button
            ); // end Adornment
        // clicking the button inserts a new node to the right of the selected node,
        // and adds a link to that new node
        function addNodeAndLink(e, obj) {
            var adorn = obj.part;
            var fromNode = adorn.adornedPart;
            if (fromNode === null)
                return;
            e.handled = true;
            var diagram = e.diagram;
            diagram.startTransaction('Add State');
            // get the node data for which the user clicked the button
            var fromData = fromNode.data;
            // create a new "State" data object, positioned off to the right of the adorned Node
            var toData = { text: 'new' };
            var p = fromNode.location.copy();
            p.x += 200;
            toData.loc = go.Point.stringify(p); // the "loc" property is a string, not a Point object
            // add the new node data to the model
            var model = diagram.model;
            model.addNodeData(toData);
            // create a link data from the old node data to the new node data
            var linkdata = {
                from: model.getKeyForNodeData(fromData),
                to: model.getKeyForNodeData(toData),
                text: 'transition'
            };
            // and add the link data to the model
            model.addLinkData(linkdata);
            // select the new Node
            var newnode = diagram.findNodeForData(toData);
            diagram.select(newnode);
            diagram.commitTransaction('Add State');
            // if the new node is off-screen, scroll the diagram to show the new node
            if (newnode !== null)
                diagram.scrollToRect(newnode.actualBounds);
        }
        // replace the default Link template in the linkTemplateMap
        myDiagram.linkTemplate =
            $(go.Link, // the whole link panel
            { curve: go.Link.Bezier, reshapable: true }, 
            // don't need to save Link.points, so don't need TwoWay Binding on "points"
            new go.Binding('curviness', 'curviness').makeTwoWay(), // but save "curviness" automatically
            $(go.Shape, // the link shape
            { strokeWidth: 1.5 }), $(go.Shape, // the arrowhead
            { toArrow: 'standard', stroke: null }), $(go.Panel, 'Auto', $(go.Shape, // the label background, which becomes transparent around the edges
            {
                fill: $(go.Brush, 'Radial', { 0: 'rgb(240, 240, 240)', 0.3: 'rgb(240, 240, 240)', 1: 'rgba(240, 240, 240, 0)' }),
                stroke: null
            }), $(go.TextBlock, 'transition', // the label text
            {
                textAlign: 'center',
                font: '10pt helvetica, arial, sans-serif',
                stroke: 'black',
                margin: 4,
                editable: true // editing the text automatically updates the model data
            }, new go.Binding('text', 'text').makeTwoWay())));
        // read in the JSON-format data from the "mySavedModel" element
        load();
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
    // Show the diagram's model in JSON format
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
