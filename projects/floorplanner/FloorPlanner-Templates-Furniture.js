/*
* Copyright (C) 1998-2022 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANNER CODE: TEMPLATES - FURNITURE
* GraphObject templates for interactional furniture nodes (and their dependecies) used in the Floor Planner sample
* Includes Default Node (Furniture), MultiPurpose Node
*/

/*
* Furniture Node Dependencies:
* Node Tool Tip, Furniture Resize Adornment Template, Furniture Rotate Adornment Template, Invert Color
*/

// Node Tool Tip
function makeNodeToolTip() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, "Auto",
        $(go.Shape, { fill: "#FFFFCC" }),
        $(go.TextBlock, { margin: 4 },
            new go.Binding("text", "", function (text, obj) {
                var data = obj.part.adornedObject.data;
                var name = (obj.part.adornedObject.category === "MultiPurposeNode") ? data.text : data.caption;
                return "Name: " + name + "\nNotes: " + data.notes;
            }).ofObject())
    )
}

// Furniture Resize Adornment
function makeFurnitureResizeAdornmentTemplate() {
    var $ = go.GraphObject.make;
    function makeHandle(alignment, cursor) {
        return $(go.Shape, { alignment: alignment, cursor: cursor, figure: "Rectangle", desiredSize: new go.Size(7, 7), fill: "#ffffff", stroke: "#808080" },
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "stroke"));
    }

    return $(go.Adornment, "Spot",
        $(go.Placeholder),
        makeHandle(go.Spot.Top, "n-resize"),
        makeHandle(go.Spot.TopRight, "n-resize"),
        makeHandle(go.Spot.BottomRight, "se-resize"),
        makeHandle(go.Spot.Right, "e-resize"),
        makeHandle(go.Spot.Bottom, "s-resize"),
        makeHandle(go.Spot.BottomLeft, "sw-resize"),
        makeHandle(go.Spot.Left, "w-resize"),
        makeHandle(go.Spot.TopLeft, "nw-resize")
    );
}

// Furniture Rotate Adornment
function makeFurnitureRotateAdornmentTemplate() {
    var $ = go.GraphObject.make;
    return $(go.Adornment,
        $(go.Shape, "Circle", { cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "#ffffff", stroke: "#808080" },
            new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
            new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject())
    );
}

// Return inverted color (in hex) of a given hex code color; used to determine furniture node stroke color
function invertColor(hexnum) {
    if (hexnum.includes('#')) hexnum = hexnum.substring(1);
    if (hexnum.length != 6) {
        console.error("Hex color must be six hex numbers in length.");
        return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for (i = 0; i < 6; i++) {
        if (!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if (complexnum[splitnum[i]]) {
            resultnum += complexnum[splitnum[i]];
        } else {
            console.error("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }
    return '#' + resultnum;
}

/*
* Furniture Node Templates:
* Default Node, MultiPurpose Node
*/

// Default Node
function makeDefaultNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Spot",
        {
            resizable: true,
            rotatable: true,
            toolTip: makeNodeToolTip(),
            resizeAdornmentTemplate: makeFurnitureResizeAdornmentTemplate(),
            rotateAdornmentTemplate: makeFurnitureRotateAdornmentTemplate(),
            contextMenu: makeContextMenu(),
            locationObjectName: "SHAPE",
            resizeObjectName: "SHAPE",
            rotateObjectName: "SHAPE",
            minSize: new go.Size(5, 5),
            locationSpot: go.Spot.Center,
            selectionAdorned: false,  // use a Binding on the Shape.stroke to show selection
            doubleClick: function (e) {
                if (e.diagram.floorplanUI) e.diagram.floorplanUI.hideShow("selectionInfoWindow")
            }
        },
        // remember Node location
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // move selected Node to Foreground layer so it's not obscuerd by non-selected Parts
        new go.Binding("layerName", "isSelected", function (s) {
            return s ? "Foreground" : "";
        }).ofObject(),
        $(go.Shape,
            {
                name: "SHAPE", stroke: "#000000",
                fill: "rgba(128, 128, 128, 0.5)"
            },
            new go.Binding("figure", "shape"),
            new go.Binding("geometryString", "geo"),
            new go.Binding("width").makeTwoWay(),
            new go.Binding("height").makeTwoWay(),
            new go.Binding("angle").makeTwoWay(),
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "isSelected", function (s, obj) {
            return s ? go.Brush.lightenBy(obj.stroke, .5) : invertColor(obj.part.data.color);
          }).ofObject())
    )
}

// MultiPurpose Node
function makeMultiPurposeNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Spot",
        {
            contextMenu: makeContextMenu(),
            toolTip: makeNodeToolTip(),
            locationSpot: go.Spot.Center,
            resizeAdornmentTemplate: makeFurnitureResizeAdornmentTemplate(),
            rotateAdornmentTemplate: makeFurnitureRotateAdornmentTemplate(),
            locationObjectName: "SHAPE",
            resizable: true,
            rotatable: true,
            resizeObjectName: "SHAPE",
            rotateObjectName: "SHAPE",
            minSize: new go.Size(5, 5),
            selectionAdorned: false,
            doubleClick: function (e) {
                if (e.diagram.floorplanUI) e.diagram.floorplanUI.hideShow("selectionInfoWindow")
            }
        },
        // remember location, angle, height, and width of the node
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // move a selected part into the Foreground layer so it's not obscuerd by non-selected Parts
        new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(),
        $(go.Shape,
            { strokeWidth: 1, name: "SHAPE", fill: "rgba(128, 128, 128, 0.5)", },
            new go.Binding("angle").makeTwoWay(),
            new go.Binding("width").makeTwoWay(),
            new go.Binding("height").makeTwoWay(),
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "isSelected", function (s, obj) {
                return s ? go.Brush.lightenBy(obj.stroke, .5) : invertColor(obj.part.data.color);
            }).ofObject()
        ),
        $(go.TextBlock,
            {
                margin: 5,
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true,
                isMultiline: false,
                stroke: '#454545',
                font: "10pt sans-serif"
            },
            new go.Binding("text").makeTwoWay(),
            new go.Binding("angle", "angle").makeTwoWay(),
            new go.Binding("font", "height", function (height) {
                if (height > 25) return "10pt sans-serif";
                if (height < 25 && height > 15) return "8pt sans-serif";
                else return "6pt sans-serif";
            }),
            new go.Binding("stroke", "color", function (color) { return invertColor(color); })
        )
    )
}