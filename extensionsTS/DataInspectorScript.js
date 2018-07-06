(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./DataInspector"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var DataInspector_1 = require("./DataInspector");
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        var myDiagram = $(go.Diagram, 'myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            'animationManager.isEnabled': false,
            // position the graph in the middle of the diagram
            initialContentAlignment: go.Spot.Center,
            // allow double-click in background to create a new node
            'clickCreatingTool.archetypeNodeData': { text: 'Node', color: 'white' },
            // allow Ctrl-G to call groupSelection()
            'commandHandler.archetypeGroupData': { text: 'Group', isGroup: true, color: 'blue' },
            // enable undo & redo
            'undoManager.isEnabled': true,
            // automatically show the state of the diagram's model on the page
            'ModelChanged': function (e) {
                if (e.isTransactionFinished) {
                    var elt = document.getElementById('savedModel');
                    if (elt !== null)
                        elt.textContent = myDiagram.model.toJson();
                }
            }
        });
        // These nodes have text surrounded by a rounded rectangle
        // whose fill color is bound to the node data.
        // The user can drag a node by dragging its TextBlock label.
        // Dragging from the Shape will start drawing a new link.
        myDiagram.nodeTemplate =
            $(go.Node, 'Auto', { locationSpot: go.Spot.Center }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, 'Rectangle', {
                stroke: null, strokeWidth: 0,
                fill: 'white',
                portId: '', cursor: 'pointer',
                // allow all kinds of links from and to this port
                fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
            }, new go.Binding('fill', 'color')), $(go.TextBlock, {
                font: 'bold 18px sans-serif',
                stroke: '#111',
                margin: 8,
                isMultiline: false,
                editable: true // allow in-place editing by user
            }, new go.Binding('text', 'text').makeTwoWay()));
        // The link shape and arrowhead have their stroke brush data bound to the "color" property
        myDiagram.linkTemplate =
            $(go.Link, { toShortLength: 3, relinkableFrom: true, relinkableTo: true }, // allow the user to relink existing links
            $(go.Shape, { strokeWidth: 2 }, new go.Binding('stroke', 'color')), $(go.Shape, { toArrow: 'Standard', stroke: null }, new go.Binding('fill', 'color')));
        // Groups consist of a title in the color given by the group node data
        // above a translucent gray rectangle surrounding the member parts
        myDiagram.groupTemplate =
            $(go.Group, 'Vertical', {
                selectionObjectName: 'PANEL',
                ungroupable: true
            }, // enable Ctrl-Shift-G to ungroup a selected Group
            $(go.TextBlock, {
                font: 'bold 19px sans-serif',
                isMultiline: false,
                editable: true // allow in-place editing by user
            }, new go.Binding('text', 'text').makeTwoWay(), new go.Binding('stroke', 'color')), $(go.Panel, 'Auto', { name: 'PANEL' }, $(go.Shape, 'Rectangle', // the rectangular shape around the members
            { fill: 'rgba(128,128,128,0.2)', stroke: 'gray', strokeWidth: 3 }), $(go.Placeholder, { padding: 10 }) // represents where the members are
            ));
        // Create the Diagram's Model:
        var nodeDataArray = [
            { key: 1, text: 'Alpha', color: '#B2DFDB', state: 'one' },
            { key: 2, text: 'Beta', color: '#B2B2DB', state: 'two', password: '1234' },
            { key: 3, text: 'Gamma', color: '#1DE9B6', state: 2, group: 5, flag: false, choices: [1, 2, 3, 4, 5] },
            { key: 4, text: 'Delta', color: '#00BFA5', state: 'three', group: 5, flag: true },
            { key: 5, text: 'Epsilon', color: '#00BFA5', isGroup: true }
        ];
        var linkDataArray = [
            { from: 1, to: 2, color: '#5E35B1' },
            { from: 2, to: 2, color: '#5E35B1' },
            { from: 3, to: 4, color: '#6200EA' },
            { from: 3, to: 1, color: '#6200EA' }
        ];
        myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
        // some shared model data
        myDiagram.model.modelData = { test: true, hello: 'world', version: 42 };
        // select a Node, so that the first Inspector shows something
        myDiagram.select(myDiagram.nodes.first());
        // Declare which properties to show and how.
        // By default, all properties on the model data objects are shown unless the inspector option "includesOwnProperties" is set to false.
        // Show the primary selection's data, or blanks if no Part is selected:
        var inspector1 = new DataInspector_1.Inspector('myInspectorDiv1', myDiagram, {
            // allows for multiple nodes to be inspected at once
            multipleSelection: true,
            // max number of node properties will be shown when multiple selection is true
            showSize: 4,
            // when multipleSelection is true, when showAllProperties is true it takes the union of properties
            // otherwise it takes the intersection of properties
            showAllProperties: true,
            // uncomment this line to only inspect the named properties below instead of all properties on each object:
            // includesOwnProperties: false,
            properties: {
                'text': {},
                // key would be automatically added for nodes, but we want to declare it read-only also:
                'key': { readOnly: true, show: DataInspector_1.Inspector.showIfPresent },
                // color would be automatically added for nodes, but we want to declare it a color also:
                'color': { show: DataInspector_1.Inspector.showIfPresent, type: 'color' },
                // Comments and LinkComments are not in any node or link data (yet), so we add them here:
                'Comments': { show: DataInspector_1.Inspector.showIfNode },
                'LinkComments': { show: DataInspector_1.Inspector.showIfLink },
                'isGroup': { readOnly: true, show: DataInspector_1.Inspector.showIfPresent },
                'flag': { show: DataInspector_1.Inspector.showIfNode, type: 'checkbox' },
                'state': {
                    show: DataInspector_1.Inspector.showIfNode,
                    type: 'select',
                    choices: function (node, propName) {
                        if (Array.isArray(node.data.choices))
                            return node.data.choices;
                        return ['one', 'two', 'three', 'four', 'five'];
                    }
                },
                'choices': { show: false },
                // an example of specifying the <input> type
                'password': { show: DataInspector_1.Inspector.showIfPresent, type: 'password' }
            }
        });
        // Always show the first Node:
        var inspector2 = new DataInspector_1.Inspector('myInspectorDiv2', myDiagram, {
            // By default the inspector works on the Diagram selection.
            // This property lets us inspect a specific object by calling Inspector.inspectObject(object)
            inspectSelection: false,
            properties: {
                'text': {},
                // This property we want to declare as a color, to show a color-picker:
                'color': { type: 'color' },
                // key would be automatically added for node data, but we want to declare it read-only also:
                'key': { readOnly: true, show: DataInspector_1.Inspector.showIfPresent(myDiagram.selection.first(), 'key') }
            }
        });
        // If not inspecting a selection, you can programatically decide what to inspect (a Part, or a JavaScript object)
        // Here, we inspect the first node, if available
        var firstnode = myDiagram.nodes.first();
        if (firstnode !== null)
            inspector2.inspectObject(firstnode.data);
        // Always show the model.modelData:
        var inspector3 = new DataInspector_1.Inspector('myInspectorDiv3', myDiagram, {
            inspectSelection: false
        });
        inspector3.inspectObject(myDiagram.model.modelData);
        // Attach to the window for console manipulation
        window.myDiagram = myDiagram;
    }
    exports.init = init;
});
