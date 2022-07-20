/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js", "./Robot.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pan = exports.doubleClickLambda = exports.clickLambda = exports.deleteSelection = exports.clickContextMenu = exports.dragSelectNodes = exports.copyNode = exports.dragFromPalette = exports.init = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    var Robot_js_1 = require("./Robot.js");
    var myRobot; // this global variable will hold an instance of the Robot class for myDiagram
    var myDiagram;
    var myPalette;
    function init() {
        if (window.goSamples)
            window.goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        function showProperties(e, obj) {
            var node = obj.part.adornedPart;
            if (node === null || node.data === null)
                return;
            var msg = 'Context clicked: ' + node.data.key + '. ';
            msg += 'Selection includes:';
            myDiagram.selection.each(function (part) {
                msg += ' ' + part.toString();
            });
            var stat = document.getElementById('myStatus');
            if (stat !== null)
                stat.textContent = msg;
        }
        function nodeClicked(e, obj) {
            var evt = e.copy();
            var node = obj.part;
            if (node === null || node.data === null)
                return;
            var type = evt.clickCount === 2 ? 'Double-Clicked: ' : 'Clicked: ';
            var msg = type + node.data.key + '. ';
            var stat = document.getElementById('myStatus');
            if (stat !== null)
                stat.textContent = msg;
        }
        myDiagram =
            $(go.Diagram, 'myDiagramDiv', // must name or refer to the DIV HTML element
            {
                nodeTemplate: $(go.Node, 'Auto', {
                    click: nodeClicked,
                    doubleClick: nodeClicked,
                    contextMenu: $('ContextMenu', $('ContextMenuButton', $(go.TextBlock, 'Properties'), { click: showProperties }))
                }, $(go.Shape, 'Rectangle', { fill: 'lightgray' }, { portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' }), $(go.TextBlock, { margin: 3 }, new go.Binding('text', 'key'))),
                model: new go.GraphLinksModel([
                    { key: 'Lambda' },
                    { key: 'Mu' }
                ], [
                    { from: 'Lambda', to: 'Mu' }
                ]),
                'undoManager.isEnabled': true
            });
        // a shared Robot that can be used by all commands for this one Diagram
        myRobot = new Robot_js_1.Robot(myDiagram); // defined in Robot.js
        // initialize the Palette that is on the left side of the page
        myPalette =
            $(go.Palette, 'myPaletteDiv', // must name or refer to the DIV HTML element
            {
                nodeTemplate: myDiagram.nodeTemplate,
                model: new go.GraphLinksModel([
                    { key: 'Alpha' },
                    { key: 'Beta' },
                    { key: 'Gamma' },
                    { key: 'Delta' }
                ])
            });
    }
    exports.init = init;
    function dragFromPalette() {
        // simulate a drag-and-drop between Diagrams:
        var dragdrop = { sourceDiagram: myPalette, targetDiagram: myDiagram };
        myRobot.mouseDown(5, 5, 0, dragdrop); // this should be where the Alpha node is in the source myPalette
        myRobot.mouseMove(60, 60, 100, dragdrop);
        myRobot.mouseUp(100, 100, 200, dragdrop); // this is where the node will be dropped in the target myDiagram
        // If successful in dragging a node from the Palette into the Diagram,
        // the DraggingTool will perform a transaction.
    }
    exports.dragFromPalette = dragFromPalette;
    function copyNode() {
        var alpha = myDiagram.findNodeForKey('Alpha');
        if (alpha === null)
            return;
        var loc = alpha.actualBounds.center;
        var options = { control: true, alt: true };
        // Simulate a mouse drag to move the Alpha node:
        myRobot.mouseDown(loc.x, loc.y, 0, options);
        myRobot.mouseMove(loc.x + 80, loc.y + 50, 50, options);
        myRobot.mouseMove(loc.x + 20, loc.y + 100, 100, options);
        myRobot.mouseUp(loc.x + 20, loc.y + 100, 150, options);
        // If successful, will have made a copy of the "Alpha" node below it.
        // Alternatively you could copy the Node using commands:
        // myDiagram.commandHandler.copySelection();
        // myDiagram.commandHandler.pasteSelection(new go.Point(loc.x+20, loc.y+100));
    }
    exports.copyNode = copyNode;
    function dragSelectNodes() {
        var alpha = myDiagram.findNodeForKey('Alpha');
        if (alpha === null)
            return;
        var alpha2 = myDiagram.findNodeForKey('Alpha2');
        if (alpha2 === null)
            return;
        var coll = new go.Set();
        coll.add(alpha);
        coll.add(alpha2);
        var area = myDiagram.computePartsBounds(coll);
        area.inflate(30, 30);
        // Simulate dragging in the background around the two Alpha nodes.
        // This uses timestamps to pretend to wait a while to avoid activating the PanningTool.
        // Hopefully this mouse down does not hit any Part, but in the Diagram's background:
        myRobot.mouseDown(area.x, area.y, 0);
        // NOTE that this mouseMove timestamp needs to be > myDiagram.toolManager.dragSelectingTool.delay:
        myRobot.mouseMove(area.centerX, area.centerY, 200);
        myRobot.mouseUp(area.right, area.bottom, 250);
        // Now should have selected both "Alpha" and "Alpha2" using the DragSelectingTool.
        // Alternatively you could select the Nodes programmatically:
        // alpha.isSelected = true;
        // alpha2.isSelected = true;
    }
    exports.dragSelectNodes = dragSelectNodes;
    function clickContextMenu() {
        var alpha = myDiagram.findNodeForKey('Alpha');
        if (alpha === null)
            return;
        var loc = alpha.location;
        // right click on Alpha
        myRobot.mouseDown(loc.x + 10, loc.y + 10, 0, { right: true });
        myRobot.mouseUp(loc.x + 10, loc.y + 10, 100, { right: true });
        // Alternatively you could invoke the Show Context Menu command directly:
        // myDiagram.commandHandler.showContextMenu(alpha);
        // move mouse over first context menu button
        myRobot.mouseMove(loc.x + 20, loc.y + 20, 200);
        // and click that button
        myRobot.mouseDown(loc.x + 20, loc.y + 20, 300);
        myRobot.mouseUp(loc.x + 20, loc.y + 20, 350);
        // This should have invoked the ContextMenuButton's click function, showProperties,
        // which should have put a green message in the myStatus DIV.
    }
    exports.clickContextMenu = clickContextMenu;
    function deleteSelection() {
        // Simulate clicking the "Del" key:
        myRobot.keyDown('Del');
        myRobot.keyUp('Del');
        // Now the selected Nodes are deleted.
        // Alternatively you could invoke the Delete command directly:
        // myDiagram.commandHandler.deleteSelection();
    }
    exports.deleteSelection = deleteSelection;
    function clickLambda() {
        var lambda = myDiagram.findNodeForKey('Lambda');
        if (lambda === null)
            return;
        var loc = lambda.location;
        // click on Lambda
        myRobot.mouseDown(loc.x + 10, loc.y + 10, 0, {});
        myRobot.mouseUp(loc.x + 10, loc.y + 10, 100, {});
        // Clicking is just a sequence of input events.
        // There is no command in CommandHandler for such a basic gesture.
    }
    exports.clickLambda = clickLambda;
    function doubleClickLambda() {
        var lambda = myDiagram.findNodeForKey('Lambda');
        if (lambda === null)
            return;
        var loc = lambda.location;
        // double-click on Lambda
        myRobot.mouseDown(loc.x + 10, loc.y + 10, 0, {});
        myRobot.mouseUp(loc.x + 10, loc.y + 10, 100, {});
        myRobot.mouseDown(loc.x + 10, loc.y + 10, 200, { clickCount: 2 });
        myRobot.mouseUp(loc.x + 10, loc.y + 10, 300, { clickCount: 2 });
    }
    exports.doubleClickLambda = doubleClickLambda;
    function pan() {
        var pos1 = myDiagram.position.copy();
        var pt = new go.Point(myDiagram.viewportBounds.x + 30, myDiagram.viewportBounds.centerY);
        myRobot.mouseDown(pt.x, pt.y, 0, {});
        // Minimal wait after mouseDown when moving, else the PanningTool will be pre-empted
        // by the DragSelectingTool, which is controlled by the DragSelectingTool.delay property.
        // Remember that these are document coordinates, which are shifted by the panning motion.
        myRobot.mouseMove(pt.x + 20, pt.y + 10, 10, {});
        myRobot.mouseMove(pt.x + 20, pt.y + 10, 30, {});
        myRobot.mouseMove(pt.x + 20, pt.y + 10, 50, {});
        myRobot.mouseUp(pt.x + 20, pt.y + 10, 70, {});
        var pos2 = myDiagram.position.copy();
        document.getElementById("myStatus").textContent =
            "Document.position before: " + pos1.toString() + " " +
                "Document.position after: " + pos2.toString();
    }
    exports.pan = pan;
});
