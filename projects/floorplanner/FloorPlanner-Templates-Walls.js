/*
* Copyright (C) 1998-2020 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANNER CODE: TEMPLATES - WALLS
* GraphObject templates for Wall Groups, Wall Part Nodes (and their dependecies) used in the Floor Planner sample   
* Includes Wall Group, Palette Wall Node, Window Node, Door Node
*/

/*
* Wall Group Dependencies:
* Snap Walls, Find Closest Loc on Wall, Add Wall Part, Wall Part Drag Over, Wall Part Drag Away
*/

/*
* Drag computation function to snap walls to the grid properly while dragging
* @param {Node} part A reference to dragged Part
* @param {Point} pt The Point describing the proposed location
* @param {Point} gridPt Snapped location
*/
var snapWalls = function (part, pt, gridPt) {
    var floorplan = part.diagram;
    floorplan.updateWallDimensions();
    floorplan.updateWallAngles();
    floorplan.updateWall(part);
    var grid = part.diagram.grid;
    var sPt = part.data.startpoint.copy();
    var ePt = part.data.endpoint.copy();
    var dx = pt.x - part.location.x;
    var dy = pt.y - part.location.y;
    var newSpt = sPt.offset(dx, dy);
    var newEpt = ePt.offset(dx, dy);
    if (floorplan.toolManager.draggingTool.isGridSnapEnabled) {
        newSpt = newSpt.snapToGridPoint(grid.gridOrigin, grid.gridCellSize);
        newEpt = newEpt.snapToGridPoint(grid.gridOrigin, grid.gridCellSize);
    }
    floorplan.model.setDataProperty(part.data, "startpoint", newSpt);
    floorplan.model.setDataProperty(part.data, "endpoint", newEpt);
    return new go.Point((newSpt.x + newEpt.x) / 2, (newSpt.y + newEpt.y) / 2);
}

/*
* Find closest loc (to mouse point) on wall a wallPart can be dropped onto without extending beyond wall endpoints or intruding into another wallPart
* @param {Group} wall A reference to a Wall Group
* @param {Node} part A reference to a Wall Part Node -- i.e. Door Node, Window Node
*/
function findClosestLocOnWall(wall, part) {
    var orderedConstrainingPts = []; // wall endpoints and wallPart endpoints
    var startpoint = wall.data.startpoint.copy();
    var endpoint = wall.data.endpoint.copy();
    // store all possible constraining endpoints (wall endpoints and wallPart endpoints) in the order in which they appear (left/top to right/bottom)
    var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
    var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
    var wallPartEndpoints = [];
    wall.memberParts.iterator.each(function (wallPart) {
        var endpoints = getWallPartEndpoints(wallPart);
        wallPartEndpoints.push(endpoints[0]);
        wallPartEndpoints.push(endpoints[1]);
    });
    // sort all wallPartEndpoints by x coordinate left to right
    wallPartEndpoints.sort(function (a, b) {
        if ((a.x + a.y) > (b.x + b.y)) return 1;
        if ((a.x + a.y) < (b.x + b.y)) return -1;
        else return 0;
    });
    orderedConstrainingPts.push(firstWallPt);
    orderedConstrainingPts = orderedConstrainingPts.concat(wallPartEndpoints);
    orderedConstrainingPts.push(lastWallPt);

    // go through all constraining points; if there's a free stretch along the wall "part" could fit in, remember it
    var possibleStretches = [];
    for (var i = 0; i < orderedConstrainingPts.length; i += 2) {
        var point1 = orderedConstrainingPts[i];
        var point2 = orderedConstrainingPts[i + 1];
        var distanceBetween = Math.sqrt(point1.distanceSquaredPoint(point2));
        if (distanceBetween >= part.data.length) possibleStretches.push({ pt1: point1, pt2: point2 });
    }

    // go through all possible stretches along the wall the part *could* fit in; find the one closest to the part's current location
    var closestDist = Number.MAX_VALUE; var closestStretch = null;
    for (var i = 0; i < possibleStretches.length; i++) {
        var testStretch = possibleStretches[i];
        var testPoint1 = testStretch.pt1;
        var testPoint2 = testStretch.pt2;
        var testDistance1 = Math.sqrt(testPoint1.distanceSquaredPoint(part.location));
        var testDistance2 = Math.sqrt(testPoint2.distanceSquaredPoint(part.location));
        if (testDistance1 < closestDist) {
            closestDist = testDistance1;
            closestStretch = testStretch;
        }
        if (testDistance2 < closestDist) {
            closestDist = testDistance2;
            closestStretch = testStretch;
        }
    }

    // Edge Case: If there's no space for the wallPart, return null
    if (closestStretch === null) return null;

    // using the closest free stretch along the wall, calculate endpoints that make the stretch's line segment, then project part.location onto the segment
    var closestStretchLength = Math.sqrt(closestStretch.pt1.distanceSquaredPoint(closestStretch.pt2));
    var offset = part.data.length / 2;
    var point1 = new go.Point(closestStretch.pt1.x + ((offset / closestStretchLength) * (closestStretch.pt2.x - closestStretch.pt1.x)),
        closestStretch.pt1.y + ((offset / closestStretchLength) * (closestStretch.pt2.y - closestStretch.pt1.y)));
    var point2 = new go.Point(closestStretch.pt2.x + ((offset / closestStretchLength) * (closestStretch.pt1.x - closestStretch.pt2.x)),
    closestStretch.pt2.y + ((offset / closestStretchLength) * (closestStretch.pt1.y - closestStretch.pt2.y)));
    var newLoc = part.location.copy().projectOntoLineSegmentPoint(point1, point2);
    return newLoc;
}

// MouseDrop event for wall groups; if a door or window is dropped on a wall, add it to the wall group
// Do not allow dropping wallParts that would extend beyond wall endpoints or intrude into another wallPart
var addWallPart = function (e, wall) {
    var floorplan = e.diagram;
    var wallPart = floorplan.selection.first();
    if ((wallPart && (wallPart.category === "WindowNode" || wallPart.category === "DoorNode") && wallPart.containingGroup === null)) {
        var newLoc = findClosestLocOnWall(wall, wallPart);
        if (newLoc !== null) {
            wall.findObject("SHAPE").stroke = "black";
            floorplan.model.setDataProperty(wallPart.data, "group", wall.data.key);
            wallPart.location = newLoc.projectOntoLineSegmentPoint(wall.data.startpoint, wall.data.endpoint);
            wallPart.angle = wall.rotateObject.angle;
            if (wallPart.category === "WindowNode") floorplan.model.setDataProperty(wallPart.data, "height", wall.data.thickness);
            if (wallPart.category === "DoorNode") floorplan.model.setDataProperty(wallPart.data, "doorOpeningHeight", wall.data.thickness);
        } else {
            floorplan.remove(wallPart);
            alert("There's not enough room on the wall!");
            return;
        }
    }
    if (floorplan.floorplanUI) floorplan.floorplanUI.setSelectionInfo(floorplan.selection.first(), floorplan);
    floorplan.updateWallDimensions();
}

// MouseDragEnter event for walls; if a door or window is dragged over a wall, highlight the wall and change its angle
var wallPartDragOver = function (e, wall) {
    var floorplan = e.diagram;
    var parts = floorplan.toolManager.draggingTool.draggingParts;
    parts.iterator.each(function (part) {
        if ((part.category === "WindowNode" || part.category === "DoorNode") && part.containingGroup === null) {
            wall.findObject("SHAPE").stroke = "lightblue";
            part.angle = wall.rotateObject.angle;
        }
    });
}

// MouseDragLeave event for walls; if a wall part is dragged past a wall, unhighlight the wall and change back the wall part's angle to 0
var wallPartDragAway = function (e, wall) {
    var floorplan = e.diagram;
    wall.findObject("SHAPE").stroke = "black";
    var parts = floorplan.toolManager.draggingTool.draggingParts;
    parts.iterator.each(function (part) {
        if ((part.category === "WindowNode" || part.category === "DoorNode") && part.containingGroup === null) part.angle = 0
    });
}

/*
* Wall Group Template
*/

// Wall Group
function makeWallGroup() {
    var $ = go.GraphObject.make;
    return $(go.Group, "Spot",
        {
            contextMenu: makeContextMenu(),
            toolTip: makeGroupToolTip(),
            selectionObjectName: "SHAPE",
            rotateObjectName: "SHAPE",
            locationSpot: go.Spot.Center,
            reshapable: true,
            minSize: new go.Size(1, 1),
            dragComputation: snapWalls,
            selectionAdorned: false,
            mouseDrop: addWallPart,
            mouseDragEnter: wallPartDragOver,
            mouseDragLeave: wallPartDragAway,
            doubleClick: function (e) { if (e.diagram.floorplanUI) e.diagram.floorplanUI.hideShow("selectionInfoWindow"); }
        },
        $(go.Shape,
        {
            name: "SHAPE",
            fill: "black",
        },
        new go.Binding("strokeWidth", "thickness"),
        new go.Binding("stroke", "isSelected", function (s, obj) {
            if (obj.part.containingGroup != null) {
                var group = obj.part.containingGroup;
                if (s) { group.data.isSelected = true; }
            }
            return s ? "dodgerblue" : "black";
        }).ofObject()
      ))
}

/*
* Wall Part Node Dependencies:
* Get Wall Part Endpoints, Get Wall Part Stretch, Drag Wall Parts (Drag Computation Function),
* Wall Part Resize Adornment, Door Selection Adornment (Door Nodes only)
*/

/*
* Find and return an array of the endpoints of a given wallpart (window or door)
* @param {Node} wallPart A Wall Part Node -- i.e. Door Node, Window Node
*/
function getWallPartEndpoints(wallPart) {
    var loc = wallPart.location;
    var partLength = wallPart.data.length;
    if (wallPart.containingGroup !== null) var angle = wallPart.containingGroup.rotateObject.angle;
    else var angle = 180;
    var point1 = new go.Point((loc.x + (partLength / 2)), loc.y);
    var point2 = new go.Point((loc.x - (partLength / 2)), loc.y);
    point1.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
    point2.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
    var arr = []; arr.push(point1); arr.push(point2);
    return arr;
}

/*
* Returns a "stretch" (2 Points) that constrains a wallPart (door or window), comprised of "part"'s containing wall endpoints or other wallPart endpoints
* @param {Node} part A Wall Part Node -- i.e. Door Node, Window Node, that is attached to a wall
*/
function getWallPartStretch(part) {
    var wall = part.containingGroup;
    var startpoint = wall.data.startpoint.copy();
    var endpoint = wall.data.endpoint.copy();

    // sort all possible endpoints into either left/above or right/below
    var leftOrAbove = new go.Set(/*go.Point*/); var rightOrBelow = new go.Set(/*go.Point*/);
    wall.memberParts.iterator.each(function (wallPart) {
        if (wallPart.data.key !== part.data.key) {
            var endpoints = getWallPartEndpoints(wallPart);
            for (var i = 0; i < endpoints.length; i++) {
                if (endpoints[i].x < part.location.x || (endpoints[i].y > part.location.y && endpoints[i].x === part.location.x)) leftOrAbove.add(endpoints[i]);
                else rightOrBelow.add(endpoints[i]);
            }
        }
    });

    // do the same with the startpoint and endpoint of the dragging part's wall
    if (parseFloat(startpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) || (startpoint.y > part.location.y && parseFloat(startpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))) leftOrAbove.add(startpoint);
    else rightOrBelow.add(startpoint);
    if (parseFloat(endpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) || (endpoint.y > part.location.y && parseFloat(endpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))) leftOrAbove.add(endpoint);
    else rightOrBelow.add(endpoint);

    // of each set, find the closest point to the dragging part
    var leftOrAbovePt; var closestDistLeftOrAbove = Number.MAX_VALUE;
    leftOrAbove.iterator.each(function (point) {
        var distance = Math.sqrt(point.distanceSquaredPoint(part.location));
        if (distance < closestDistLeftOrAbove) {
            closestDistLeftOrAbove = distance;
            leftOrAbovePt = point;
        }
    });
    var rightOrBelowPt; var closestDistRightOrBelow = Number.MAX_VALUE;
    rightOrBelow.iterator.each(function (point) {
        var distance = Math.sqrt(point.distanceSquaredPoint(part.location));
        if (distance < closestDistRightOrBelow) {
            closestDistRightOrBelow = distance;
            rightOrBelowPt = point;
        }
    });

    var stretch = { point1: leftOrAbovePt, point2: rightOrBelowPt };
    return stretch;
}

/*
* Drag computation function for WindowNodes and DoorNodes; ensure wall parts stay in walls when dragged
* @param {Node} part A reference to dragged Part
* @param {Point} pt The Point describing the proposed location
* @param {Point} gridPt Snapped location
*/
var dragWallParts = function (part, pt, gridPt) {
    if (part.containingGroup !== null && part.containingGroup.category === 'WallGroup') {
        var floorplan = part.diagram;
        // Edge Case: if part is not on its wall (due to incorrect load) snap part.loc onto its wall immediately; ideally this is never called
        var wall = part.containingGroup;
        var wStart = wall.data.startpoint;
        var wEnd = wall.data.endpoint;
        var dist1 = Math.sqrt(wStart.distanceSquaredPoint(part.location));
        var dist2 = Math.sqrt(part.location.distanceSquaredPoint(wEnd));
        var totalDist = Math.sqrt(wStart.distanceSquaredPoint(wEnd));
        if (dist1 + dist2 !== totalDist) part.location = part.location.copy().projectOntoLineSegmentPoint(wStart, wEnd);

        // main behavior
        var stretch = getWallPartStretch(part);
        var leftOrAbovePt = stretch.point1;
        var rightOrBelowPt = stretch.point2;

        // calc points along line created by the endpoints that are half the width of the moving window/door
        var totalLength = Math.sqrt(leftOrAbovePt.distanceSquaredPoint(rightOrBelowPt));
        var distance = (part.data.length / 2);
        var point1 = new go.Point(leftOrAbovePt.x + ((distance / totalLength) * (rightOrBelowPt.x - leftOrAbovePt.x)),
        leftOrAbovePt.y + ((distance / totalLength) * (rightOrBelowPt.y - leftOrAbovePt.y)));
        var point2 = new go.Point(rightOrBelowPt.x + ((distance / totalLength) * (leftOrAbovePt.x - rightOrBelowPt.x)),
        rightOrBelowPt.y + ((distance / totalLength) * (leftOrAbovePt.y - rightOrBelowPt.y)));

        // calc distance from pt to line (part's wall) - use point to 2pt line segment distance formula
        var distFromWall = Math.abs(((wEnd.y - wStart.y) * pt.x) - ((wEnd.x - wStart.x) * pt.y) + (wEnd.x * wStart.y) - (wEnd.y * wStart.x)) /
            Math.sqrt(Math.pow((wEnd.y - wStart.y), 2) + Math.pow((wEnd.x - wStart.x), 2));
        var tolerance = (20 * wall.data.thickness < 100) ? (20 * wall.data.thickness) : 100;

        // if distance from pt to line > some tolerance, detach the wallPart from the wall
        if (distFromWall > tolerance) {
            part.containingGroup = null;
            delete part.data.group;
            part.angle = 0;
            floorplan.pointNodes.iterator.each(function (node) { floorplan.remove(node) });
            floorplan.dimensionLinks.iterator.each(function (link) { floorplan.remove(link) });
            floorplan.pointNodes.clear();
            floorplan.dimensionLinks.clear();
            floorplan.updateWallDimensions();
            if (floorplan.floorplanUI) floorplan.floorplanUI.setSelectionInfo(part);
        }

        // project the proposed location onto the line segment created by the new points (ensures wall parts are constrained properly when dragged)
        pt = pt.copy().projectOntoLineSegmentPoint(point1, point2);
        floorplan.skipsUndoManager = true;
        floorplan.startTransaction("set loc");
        floorplan.model.setDataProperty(part.data, "loc", go.Point.stringify(pt));
        floorplan.commitTransaction("set loc");
        floorplan.skipsUndoManager = false;

        floorplan.updateWallDimensions(); // update the dimension links created by having this wall part selected
    } return pt;
}

// Resize Adornment for Wall Part Nodes
function makeWallPartResizeAdornment() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, "Spot",
    { name: "WallPartResizeAdornment" },
    $(go.Placeholder),
    $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", figure: "Diamond", desiredSize: new go.Size(7, 7), fill: "#ffffff", stroke: "#808080" }),
    $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", figure: "Diamond", desiredSize: new go.Size(7, 7), fill: "#ffffff", stroke: "#808080" })
  );
}

// Selection Adornment for Door Nodes
function makeDoorSelectionAdornment() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, "Vertical",
        { name: "DoorSelectionAdornment" },
        $(go.Panel, "Auto",
        $(go.Shape, { fill: null, stroke: null }),
        $(go.Placeholder)),
        $(go.Panel, "Horizontal", { defaultStretch: go.GraphObject.Vertical },
            $("Button",
                $(go.Picture, { source: "icons/flipDoorOpeningLeft.png", column: 0, desiredSize: new go.Size(12, 12) },
                    new go.Binding("source", "", function (obj) {
                        if (obj.adornedPart === null) return "icons/flipDoorOpeningRight.png";
                        else if (obj.adornedPart.data.swing === "left") return "icons/flipDoorOpeningRight.png";
                        else return "icons/flipDoorOpeningLeft.png";
                    }).ofObject()
                ),
                {
                    click: function (e, obj) {
                        var floorplan = obj.part.diagram;
                        floorplan.startTransaction("flip door");
                        var door = obj.part.adornedPart;
                        if (door.data.swing === "left") floorplan.model.setDataProperty(door.data, "swing", "right");
                        else floorplan.model.setDataProperty(door.data, "swing", "left");
                        floorplan.commitTransaction("flip door");
                    },
                    toolTip: $(go.Adornment, "Auto",
                        $(go.Shape, { fill: "#FFFFCC" }),
                        $(go.TextBlock, { margin: 4, text: "Flip Door Opening" }
                    ))
                },
                new go.Binding("visible", "", function (obj) { return (obj.adornedPart === null) ? false : (obj.adornedPart.containingGroup !== null); }).ofObject()
             ),
             $("Button",
                $(go.Picture, { source: "icons/flipDoorSide.png", column: 0, desiredSize: new go.Size(12, 12) }),
                {
                    click: function (e, obj) {
                        var floorplan = obj.part.diagram;
                        floorplan.startTransaction("rotate door");
                        var door = obj.part.adornedPart;
                        door.angle = (door.angle + 180) % 360;
                        floorplan.commitTransaction("rotate door");
                    },
                    toolTip: $(go.Adornment, "Auto",
                        $(go.Shape, { fill: "#FFFFCC" }),
                        $(go.TextBlock, { margin: 4, text: "Flip Door Side" }
                    ))
                }
             ),
             new go.Binding("visible", "", function (obj) { return (obj.adornedPart === null) ? false : (obj.adornedPart.containingGroup !== null); }).ofObject()
        )
      );
}

/*
* Wall Part Nodes:
* Window Node, Door Node, Palette Wall Node
*/

// Window Node
function makeWindowNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Spot",
        {
            contextMenu: makeContextMenu(),
            selectionObjectName: "SHAPE",
            selectionAdorned: false,
            locationSpot: go.Spot.Center,
            toolTip: makeNodeToolTip(),
            minSize: new go.Size(5, 5),
            resizable: true,
            resizeAdornmentTemplate: makeWallPartResizeAdornment(),
            resizeObjectName: "SHAPE",
            rotatable: false,
            doubleClick: function (e) { if (e.diagram.floorplanUI) e.diagram.floorplanUI.hideShow("selectionInfoWindow"); },
            dragComputation: dragWallParts,
            layerName: 'Foreground' // make sure windows are always in front of walls
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("angle").makeTwoWay(),
        $(go.Shape,
        { name: "SHAPE", fill: "white", strokeWidth: 0 },
        new go.Binding("width", "length").makeTwoWay(),
        new go.Binding("height").makeTwoWay(),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("fill", "isSelected", function (s, obj) { return s ? "lightgray" : "white"; }).ofObject()
        ),
        $(go.Shape,
        { name: "LINESHAPE", fill: "darkgray", strokeWidth: 0, height: 10 },
        new go.Binding("width", "length", function (width, obj) { return width - 10; }), // 5px padding each side
        new go.Binding("height", "height", function (height, obj) { return (height / 5); }),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject()
        )
      );
}

// Door Node
function makeDoorNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Spot",
        {
            contextMenu: makeContextMenu(),
            selectionObjectName: "SHAPE",
            selectionAdornmentTemplate: makeDoorSelectionAdornment(),
            locationSpot: go.Spot.BottomCenter,
            resizable: true,
            resizeObjectName: "OPENING_SHAPE",
            toolTip: makeNodeToolTip(),
            minSize: new go.Size(10, 10),
            doubleClick: function (e) { if (e.diagram.floorplanUI) e.diagram.floorplanUI.hideShow("selectionInfoWindow"); },
            dragComputation: dragWallParts,
            resizeAdornmentTemplate: makeWallPartResizeAdornment(),
            layerName: 'Foreground' // make sure windows are always in front of walls
        },
        // remember location of the Node
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("angle").makeTwoWay(),
        // the door's locationSpot is affected by it's openingHeight, which is affected by the thickness of its containing wall
        new go.Binding("locationSpot", "doorOpeningHeight", function (doh, obj) { return new go.Spot(0.5, 1, 0, -(doh / 2)); }),
        // this is the shape that reprents the door itself and its swing
        $(go.Shape,
        { name: "SHAPE" },
        new go.Binding("width", "length"),
        new go.Binding("height", "length").makeTwoWay(),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("fill", "color"),
        new go.Binding("geometryString", "swing", function (swing) {
            if (swing === "left") return "F1 M0,0 v-150 a150,150 0 0,1 150,150 ";
            else return "F1 M275,175 v-150 a150,150 0 0,0 -150,150 ";
        })
        ),
        // door opening shape
        $(go.Shape,
        {
            name: "OPENING_SHAPE", fill: "white",
            strokeWidth: 0, height: 5, width: 40,
            alignment: go.Spot.BottomCenter, alignmentFocus: go.Spot.Center
        },
        new go.Binding("height", "doorOpeningHeight").makeTwoWay(),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("fill", "isSelected", function (s, obj) { return s ? "lightgray" : "white"; }).ofObject(),
        new go.Binding("width", "length").makeTwoWay()
        )
      );
}

// Palette Wall Node (becomes WallGroup when dropped from Palette onto diagram)
function makePaletteWallNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Spot",
        { selectionAdorned: false },
        $(go.Shape,
        { name: "SHAPE", fill: "black", strokeWidth: 0, height: 10, figure: "Rectangle" },
        new go.Binding("width", "length").makeTwoWay(),
        new go.Binding("height").makeTwoWay(),
        new go.Binding("fill", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject())
    );
}