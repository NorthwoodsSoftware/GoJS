(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var myDiagram;
    function init() {
        // displays cached floor plan files in the listbox
        var listbox = document.getElementById("file list");
        for (var key in localStorage) {
            var storedFile = localStorage.getItem(key);
            if (storedFile === null || storedFile === undefined)
                continue;
            var option = document.createElement('option');
            option.value = key;
            option.text = key;
            listbox.add(option, null);
        }
        var $ = go.GraphObject.make; // for more concise visual tree definitions
        myDiagram =
            $(go.Diagram, "myDiagramDiv", {
                initialContentAlignment: go.Spot.Center,
                isReadOnly: true // allow selection but not moving or copying or deleting
            });
        // converts data about the item into a string
        function tooltipTextConverter(data) {
            if (data.item != undefined)
                return data.item;
            return "(unnamed item)";
        }
        // sets the qualities of the tooltip
        var tooltiptemplate = $(go.Adornment, go.Panel.Auto, $(go.Shape, "RoundedRectangle", { fill: "whitesmoke", stroke: "gray" }), $(go.TextBlock, { margin: 3, editable: true }, new go.Binding("text", "", tooltipTextConverter)));
        // Define the generic furniture and structure Nodes.
        // The Shape gets its Geometry from a geometry path string in the bound data.
        myDiagram.nodeTemplate =
            $(go.Node, "Spot", {
                locationObjectName: "SHAPE",
                locationSpot: go.Spot.Center,
                toolTip: tooltiptemplate,
                selectionAdorned: false // use a Binding on the Shape.stroke to show selection
            }, 
            // remember the location of this Node
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), 
            // move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts
            new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(), $(go.Shape, {
                name: "SHAPE",
                // the following are default values;
                // actual values may come from the node data object via data-binding
                geometryString: "F1 M0 0 L20 0 20 20 0 20 z",
                fill: "rgb(130, 130, 256)"
            }, 
            // this determines the actual shape of the Shape
            new go.Binding("geometryString", "geo"), 
            // allows the color to be determined by the node data
            new go.Binding("fill", "color"), 
            // selection causes the stroke to be blue instead of black
            new go.Binding("stroke", "isSelected", function (s) { return s ? "dodgerblue" : "black"; }).ofObject(), 
            // remember the size of this node
            new go.Binding("desiredSize", "size", go.Size.parse), 
            // can set the angle of this Node
            new go.Binding("angle", "angle")));
        //group settings from basic.html to lock things together
        myDiagram.groupTemplate =
            $(go.Group, go.Panel.Auto, { toolTip: tooltiptemplate }, $(go.Shape, "Rectangle", // the Group is not seen but can be selected due to the transparent fill
            { fill: "transparent", stroke: "lightgray", strokeWidth: 1 }), $(go.Placeholder));
        var myOverview = $(go.Overview, "myOverviewDiv", { observed: myDiagram, maxScale: 0.5 });
        // change color of viewport border in Overview
        myOverview.box.elt(0).stroke = "dodgerblue";
        // linear brushes for the gradient of the alert adornment
        var redAlertBrush = go.GraphObject.make(go.Brush, "Linear", { 0: "#EEB4B4", 1: "#FF0000" });
        var greenAlertBrush = go.GraphObject.make(go.Brush, "Linear", { 0: "#BCED91", 1: "#397D02" });
        // Call this to add an Adornment for a particular GraphObject.
        // Pass "" or undefined as the text value to remove any Adornment for that GraphObject.
        function adorn(obj, id, text, color, info) {
            // for changing the brush
            var red = (color == "red");
            // removes adornment
            if (!text) {
                obj.part.removeAdornment(id.toString());
            }
            else {
                var $_1 = go.GraphObject.make;
                var ad = $_1(go.Adornment, "Auto", {
                    locationSpot: go.Spot.Center,
                    mouseOver: function (e, obj) { displayAlertInfo(e, info); },
                    mouseLeave: function (e, obj1, obj2) { hideAlertInfo(); }
                }, $_1(go.Shape, {
                    geometryString: "F1 M0,0 L30,0 30,60 15,95 0,60z",
                    fill: (red ? redAlertBrush : greenAlertBrush),
                    stroke: "black", strokeWidth: 1
                }), $_1(go.TextBlock, text, {
                    font: "small-caps bold 20px sans-serif",
                    stroke: "white",
                    textAlign: "center",
                    margin: 5
                }));
                var p = obj.getDocumentPoint(go.Spot.Center);
                p.y = p.y - 10;
                ad.location = p;
                ad.adornedObject = obj;
                obj.part.addAdornment(id.toString(), ad);
            }
        }
        // a Part for displaying information about alerts
        var displayBox = $(go.Part, go.Panel.Auto, { layerName: "Tool" }, $(go.Shape, "RoundedRectangle", { fill: "whitesmoke", stroke: "red", strokeWidth: 1 }), $(go.TextBlock, { margin: 3, text: " " }));
        function displayAlertInfo(e, myText) {
            displayBox.elt(1).text = myText;
            displayBox.move(new go.Point(e.documentPoint.x, e.documentPoint.y));
            myDiagram.add(displayBox);
        }
        function hideAlertInfo() {
            myDiagram.remove(displayBox);
        }
        // simulate some real-time monitoring
        function randomState() {
            // for each node, randomly determines if it will have an alert or not
            for (var i = 0; i < chairArr.length; i++) {
                var node = chairArr[i];
                var randColor = Math.random();
                adorn(node, i, (Math.random() < .5 ? "!" : ""), (randColor < .5 ? "red" : "green"), (randColor < .5 ? "Need assistance." : "Checking in."));
            }
        }
        function loop() {
            setTimeout(function () { randomState(); loop(); }, 5000);
        }
        loop(); // start the simulation
    } //END init
    exports.init = init;
    // keep track of places where people will be and thus will get "alerts"
    var chairArr = new Array();
    // call this after modifying the diagram's contents
    function updateChairArray() {
        chairArr.length = 0; // clear the Array
        myDiagram.nodes.each(function (node) {
            if (node.data === null)
                return;
            if (node.data.item === "chair" || node.data.item === "arm chair" || node.data.item === "couch"
                || node.data.item === "queen bed" || node.data.item === "twin bed") {
                chairArr.push(node);
            }
        });
    }
    // opens the selected floorplan in the diagram
    function load() {
        var str = null;
        var sel = document.getElementById('file list');
        for (var i = 0; i < sel.options.length; i++) {
            if (sel.options[i].selected) {
                str = localStorage.getItem(sel.options[i].text);
            }
        }
        if (str !== null) {
            myDiagram.model = go.Model.fromJson(str);
            myDiagram.undoManager.isEnabled = true;
            updateChairArray();
        }
    }
    exports.load = load;
});
