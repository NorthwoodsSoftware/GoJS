/*
* Copyright (C) 1998-2022 by Northwoods Software Corporation
* All Rights Reserved.
*
* Floorplan Class
* A Floorplan is a Diagram with special rules
* Dependencies: Floorplanner-Templates-General.js, Floorplanner-Templates-Furniture.js, Floorplanner-Templates-Walls.js
*/

/*
* Floorplan Constructor
* @param {HTMLDivElement|string} div A reference to a div or its ID as a string
*/
function Floorplan(div) {

    /*
    * Floor Plan Setup:
    * Initialize Floor Plan, Floor Plan Listeners, Floor Plan Overview
    */

    go.Diagram.call(this, div);
    // By default there is no filesystem / UI control for a floorplan, though they can be added
    this._floorplanFilesystem = null;
    this._floorplanUI = null;

    // When a FloorplanPalette instance is made, it is automatically added to a Floorplan's "palettes" property
    this._palettes = [];

    // Point Nodes, Dimension Links, Angle Nodes on the Floorplan (never in model data)
    this._pointNodes = new go.Set(/*go.Node*/);
    this._dimensionLinks = new go.Set(/*go.Link*/);
    this._angleNodes = new go.Set(/*go.Node*/);

    var $ = go.GraphObject.make;

    this.allowLink = false;
    this.undoManager.isEnabled = true;
    this.layout.isOngoing = false;
    this.model = $(go.GraphLinksModel, {
        modelData: {
            "units": "centimeters",
            "unitsAbbreviation": "cm",
            "unitsConversionFactor": 2,
            "gridSize": 10,
            "wallThickness": 5,
            "preferences": {
                showWallGuidelines: true,
                showWallLengths: true,
                showWallAngles: true,
                showOnlySmallWallAngles: true,
                showGrid: true,
                gridSnap: true
            }
        }
    });

    this.grid = $(go.Panel, "Grid",
        { gridCellSize: new go.Size(this.model.modelData.gridSize, this.model.modelData.gridSize), visible: true },
        $(go.Shape, "LineH", { stroke: "lightgray" }),
        $(go.Shape, "LineV", { stroke: "lightgray" }));
    this.contextMenu = makeContextMenu();
    this.commandHandler.canGroupSelection = true;
    this.commandHandler.canUngroupSelection = true;
    this.commandHandler.archetypeGroupData = { isGroup: true };

    // When floorplan model is changed, update stats in Statistics Window
    this.addModelChangedListener(function (e) {
        if (e.isTransactionFinished) {
            // find floorplan changed
            var floorplan = null;
            if (e.object !== null) {
                e.object.changes.each(function (change) {
                    if (change.diagram instanceof Floorplan) floorplan = change.diagram;
                });
            }
            if (floorplan) {
                if (floorplan.floorplanUI) floorplan.floorplanUI.updateStatistics();
            }
        }
    });

    // When floorplan is modified, change document title to include a *
    this.addDiagramListener("Modified", function (e) {
        var floorplan = e.diagram;
        if (floorplan.floorplanFilesystem) {
            var currentFile = document.getElementById(floorplan.floorplanFilesystem.state.currentFileId);
            if (currentFile) {
                var idx = currentFile.textContent.indexOf("*");
                if (floorplan.isModified) {
                    if (idx < 0) currentFile.textContent = currentFile.textContent + "*";
                }
                else {
                    if (idx >= 0) currentFile.textContent = currentFile.textContent.slice(0, idx);
                }
            }
        }
    });

    // if a wall is copied, update its geometry
    this.addDiagramListener("SelectionCopied", function (e) {
        e.diagram.selection.iterator.each(function(part){
            if (part.category == "WallGroup") {
                e.diagram.updateWall(part);
            }
        });
    });

    // If floorplan scale has been changed update the 'Scale' item in the View menu
    this.addDiagramListener("ViewportBoundsChanged", function (e) {
        var floorplan = e.diagram;
        if (floorplan.floorplanUI) {
            var scaleEl = document.getElementById(floorplan.floorplanUI.state.scaleDisplayId);
            if (scaleEl) scaleEl.innerHTML = "Scale: " + (e.diagram.scale * 100).toFixed(2) + "%";
        }
    });

    // If a node has been dropped onto the Floorplan from a Palette...
    this.addDiagramListener("ExternalObjectsDropped", function (e) {
        var garbage = [];
        var paletteWallNodes = [];
        var otherNodes = [];
        e.diagram.selection.iterator.each(function(node){
            // Event 1: handle a drag / drop of a wall node from the Palette (as opposed to wall construction via WallBuildingTool)
            if (node.category === "PaletteWallNode") {
                paletteWallNodes.push(node);
            }
            if (e.diagram.floorplanUI) {
                otherNodes.push(node);
            }
        });
        for (var i in paletteWallNodes) {
            var node = paletteWallNodes[i];
            var paletteWallNode = node;
            var endpoints = getWallPartEndpoints(paletteWallNode);
            var data = { key: "wall", category: "WallGroup", caption: "Wall", startpoint: endpoints[0], endpoint: endpoints[1], thickness: parseFloat(e.diagram.model.modelData.wallThickness), isGroup: true, notes: "" };
            e.diagram.model.addNodeData(data);
            var wall = e.diagram.findPartForKey(data.key);
            e.diagram.updateWall(wall);
            garbage.push(paletteWallNode);
        }
        for (var i in otherNodes) {
            var node = otherNodes[i];
            var floorplanUI = e.diagram.floorplanUI;
            // Event 2: Update the text of the Diagram Helper
            if (node.category === "WindowNode" || node.category === "DoorNode") floorplanUI.setDiagramHelper("Drag part so the cursor is over a wall to add this part to a wall");
            else floorplanUI.setDiagramHelper("Drag, resize, or rotate your selection (hold SHIFT for no grid-snapping)");
            // Event 3: If the select tool is not active, make it active
            if (e.diagram.toolManager.mouseDownTools.elt(0).isEnabled) floorplanUI.setBehavior('dragging', e.diagram);
        }
        for (var i in garbage) {
            e.diagram.remove(garbage[i]);
        }
    });

    // When a wall is copied / pasted, update the wall geometry, angle, etc
    this.addDiagramListener("ClipboardPasted", function (e) {
        e.diagram.selection.iterator.each(function (node) { if (node.category === "WallGroup") e.diagram.updateWall(node); });
    });

    // Display different help depending on selection context
    this.addDiagramListener("ChangedSelection", function (e) {
        var floorplan = e.diagram;
        floorplan.skipsUndoManager = true;
        floorplan.startTransaction("remove dimension links and angle nodes");
        floorplan.pointNodes.iterator.each(function (node) { e.diagram.remove(node) });
        floorplan.dimensionLinks.iterator.each(function (link) { e.diagram.remove(link) });

        var missedDimensionLinks = []; // used only in undo situations
        floorplan.links.iterator.each(function (link) { if (link.data.category == "DimensionLink") missedDimensionLinks.push(link); });
        for (var i = 0; i < missedDimensionLinks.length; i++) {
            e.diagram.remove(missedDimensionLinks[i]);
        }

        floorplan.pointNodes.clear();
        floorplan.dimensionLinks.clear();
        floorplan.angleNodes.iterator.each(function (node) { e.diagram.remove(node); });
        floorplan.angleNodes.clear();

        floorplan.commitTransaction("remove dimension links and angle nodes");
        floorplan.skipsUndoManager = false;
        floorplan.updateWallDimensions();
        floorplan.updateWallAngles();
        if (floorplan.floorplanUI) {
            var floorplanUI = floorplan.floorplanUI;
            var selection = floorplan.selection;
            var node = floorplan.selection.first(); // only used if selection.count === 1

            if (selection.count === 0) floorplan.floorplanUI.setSelectionInfo('Nothing selected');
            else if (selection.count === 1) floorplan.floorplanUI.setSelectionInfo(floorplan.selection.first());
            else floorplan.floorplanUI.setSelectionInfo('Selection: ');

            if (selection.count === 0) floorplanUI.setDiagramHelper("Click to select a part, drag one from a Palette, or draw a wall with the Wall Tool (Ctr + 1)");
            else if (selection.count > 1) {
                var ungroupable = false;
                selection.iterator.each(function (node) { if (node.category === "WindowNode" || node.category === "DoorNode" || node.category === "WallGroup") ungroupable = true; });
                if (!ungroupable) floorplanUI.setDiagramHelper("You may group your selection with the context menu (Right Click anywhere)");
            }
            else if (node.category === "WallGroup") floorplanUI.setDiagramHelper("Drag wall endpoints or add doors and windows to the wall from the Wall Parts Palette");
            else if (selection.first().category === "WindowNode" || selection.first().category === "DoorNode") {
                if (node.containingGroup !== null) floorplanUI.setDiagramHelper("Drag and resize wall part along the wall; drag away from wall to detach");
                else floorplanUI.setDiagramHelper("Drag part so the cursor is over a wall to add this part to a wall");
            }
            else if (selection.first().category === "MultiPurposeNode") floorplanUI.setDiagramHelper("Double click on part text to revise it");
            else floorplanUI.setDiagramHelper("Drag, resize, or rotate (hold SHIFT for no snap) your selection");

        }
    });

    /*
    * Node Templates
    * Add Default Node, Multi-Purpose Node, Window Node, Palette Wall Node, and Door Node to the Node Template Map
    * Template functions defined in FloorPlanner-Templates-* js files
    */

    this.nodeTemplateMap.add("", makeDefaultNode()); // Default Node (furniture)
    this.nodeTemplateMap.add("MultiPurposeNode", makeMultiPurposeNode()); // Multi-Purpose Node
    this.nodeTemplateMap.add("WindowNode", makeWindowNode()); // Window Node
    this.nodeTemplateMap.add("PaletteWallNode", makePaletteWallNode()); // Palette Wall Node
    this.nodeTemplateMap.add("DoorNode", makeDoorNode()); // Door Node

    /*
    * Group Templates
    * Add Default Group, Wall Group to Group Template Map
    * Template functions defined in FloorPlanner-Templates-* js files
    */

    this.groupTemplateMap.add("", makeDefaultGroup()); // Default Group
    this.groupTemplateMap.add("WallGroup", makeWallGroup()); // Wall Group

    /*
    * Install Custom Tools
    * Wall Building Tool, Wall Reshaping Tool
    * Tools are defined in their own FloorPlanner-<Tool>.js files
    */

    var wallBuildingTool = new WallBuildingTool();
    this.toolManager.mouseDownTools.insertAt(0, wallBuildingTool);

    var wallReshapingTool = new WallReshapingTool();
    this.toolManager.mouseDownTools.insertAt(3, wallReshapingTool);
    wallBuildingTool.isEnabled = false;

    /*
    * Tool Overrides
    */

    // If a wall was dragged to intersect another wall, update angle displays
    this.toolManager.draggingTool.doMouseUp = function () {
        go.DraggingTool.prototype.doMouseUp.call(this);
        this.diagram.updateWallAngles();
        this.isGridSnapEnabled = this.diagram.model.modelData.preferences.gridSnap;
    }

    // If user holds SHIFT while dragging, do not use grid snap
    this.toolManager.draggingTool.doMouseMove = function () {
        if (this.diagram.lastInput.shift) {
            this.isGridSnapEnabled = false;
        } else this.isGridSnapEnabled = this.diagram.model.modelData.preferences.gridSnap;
        go.DraggingTool.prototype.doMouseMove.call(this);
    }

    // When resizing, constantly update the node info box with updated size info; constantly update Dimension Links
    this.toolManager.resizingTool.doMouseMove = function () {
        var floorplan = this.diagram;
        var node = this.adornedObject;
        // if node is the only thing selected, display its info as its resized
        if (floorplan.selection.count === 1 && floorplan.floorplanUI) floorplan.floorplanUI.setSelectionInfo(node);
        this.diagram.updateWallDimensions();
        go.ResizingTool.prototype.doMouseMove.call(this);
    }

    // When resizing a wallPart, do not allow it to be resized past the nearest wallPart / wall endpoints
    this.toolManager.resizingTool.computeMaxSize = function () {
        var tool = this;
        var obj = tool.adornedObject.part;
        var wall = this.diagram.findPartForKey(obj.data.group);
        if ((obj.category === 'DoorNode' || obj.category === 'WindowNode') && wall !== null) {
            var stationaryPt; var movingPt;
            var resizeAdornment = null;
            obj.adornments.iterator.each(function (adorn) { if (adorn.name === "WallPartResizeAdornment") resizeAdornment = adorn; });
            resizeAdornment.elements.iterator.each(function (el) {
                if (el instanceof go.Shape && el.alignment === tool.handle.alignment) movingPt = el.getDocumentPoint(go.Spot.Center);
                if (el instanceof go.Shape && el.alignment !== tool.handle.alignment) stationaryPt = el.getDocumentPoint(go.Spot.Center);
            });
            // find the constrainingPt; that is, the endpoint (wallPart endpoint or wall endpoint) that is the one closest to movingPt but still farther from stationaryPt than movingPt
            // this loop checks all other wallPart endpoints of the wall that the resizing wallPart is a part of
            var constrainingPt; var closestDist = Number.MAX_VALUE;
            wall.memberParts.iterator.each(function (part) {
                if (part.data.key !== obj.data.key) {
                    var endpoints = getWallPartEndpoints(part);
                    for (var i = 0; i < endpoints.length; i++) {
                        var point = endpoints[i];
                        var distanceToMovingPt = Math.sqrt(point.distanceSquaredPoint(movingPt));
                        if (distanceToMovingPt < closestDist) {
                            var distanceToStationaryPt = Math.sqrt(point.distanceSquaredPoint(stationaryPt));
                            if (distanceToStationaryPt > distanceToMovingPt) {
                                closestDist = distanceToMovingPt;
                                constrainingPt = point;
                            }
                        }
                    }
                }
            });
            // if we're not constrained by a wallPart endpoint, the constraint will come from a wall endpoint; figure out which one
            if (constrainingPt === undefined || constrainingPt === null) {
                if (wall.data.startpoint.distanceSquaredPoint(movingPt) > wall.data.startpoint.distanceSquaredPoint(stationaryPt)) constrainingPt = wall.data.endpoint;
                else constrainingPt = wall.data.startpoint;
            }
            // set the new max size of the wallPart according to the constrainingPt
            var maxLength = Math.sqrt(stationaryPt.distanceSquaredPoint(constrainingPt));
            return new go.Size(maxLength, wall.data.thickness);
        }
        return go.ResizingTool.prototype.computeMaxSize.call(tool);
    }

    this.toolManager.draggingTool.isGridSnapEnabled = true;
} go.Diagram.inherit(Floorplan, go.Diagram);

// Get/set the Floorplan Filesystem instance associated with this Floorplan
Object.defineProperty(Floorplan.prototype, "floorplanFilesystem", {
    get: function () { return this._floorplanFilesystem; },
    set: function (val) {
        val instanceof FloorplanFilesystem ? this._floorplanFilesystem = val : this._floorplanFilesystem = null;
    }
});

// Get/set the FloorplanUI instance associated with this Floorplan
Object.defineProperty(Floorplan.prototype, "floorplanUI", {
    get: function () { return this._floorplanUI; },
    set: function (val) {
        val instanceof FloorplanUI ? this._floorplanUI = val : this._floorplanUI = null;
    }
});

// Get array of all FloorplanPalettes associated with this Floorplan
Object.defineProperty(Floorplan.prototype, "palettes", {
    get: function () { return this._palettes; }
});

// Get / set Set of all Point Nodes in the Floorplan
Object.defineProperty(Floorplan.prototype, "pointNodes", {
    get: function () { return this._pointNodes; },
    set: function (val) { this._pointNodes = val; }
});

// Get / set Set of all Dimension Links in the Floorplan
Object.defineProperty(Floorplan.prototype, "dimensionLinks", {
    get: function () { return this._dimensionLinks; },
    set: function () { this._dimensionLinks = val; }
});

// Get / set Set of all Angle Nodes in the Floorplan
Object.defineProperty(Floorplan.prototype, "angleNodes", {
    get: function () { return this._angleNodes; },
    set: function () { this._angleNodes = val; }
});


// Check what units are being used, convert to cm then multiply by 2, (1px = 2cm, change this if you want to use a different paradigm)
Floorplan.prototype.convertPixelsToUnits = function (num) {
    var units = this.model.modelData.units;
    var factor = this.model.modelData.unitsConversionFactor;
    if (units === 'meters') return (num / 100) * factor;
    if (units === 'feet') return (num / 30.48) * factor;
    if (units === 'inches') return (num / 2.54) * factor;
    return num * factor;
}

// Take a number of units, convert to cm, then divide by 2, (1px = 2cm, change this if you want to use a different paradigm)
Floorplan.prototype.convertUnitsToPixels = function (num) {
    var units = this.model.modelData.units;
    var factor = this.model.modelData.unitsConversionFactor;
    if (units === 'meters') return (num * 100) / factor;
    if (units === 'feet') return (num * 30.48) / factor;
    if (units === 'inches') return (num * 2.54) / factor;
    return num / factor;
}

/*
* Update the geometry, angle, and location of a given wall
* @param {Wall} wall A reference to a valid Wall Group (defined in Templates-Walls)
*/
Floorplan.prototype.updateWall = function (wall) {
    if (wall.data.startpoint && wall.data.endpoint) {
        var shape = wall.findObject("SHAPE");
        var geo = new go.Geometry(go.Geometry.Line);
        var sPt = wall.data.startpoint;
        var ePt = wall.data.endpoint;
        var mPt = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
        // define a wall's geometry as a simple horizontal line, then rotate it
        geo.startX = 0;
        geo.startY = 0;
        geo.endX = Math.sqrt(sPt.distanceSquaredPoint(ePt));
        geo.endY = 0;
        shape.geometry = geo;
        wall.location = mPt; // a wall's location is the midpoint between it's startpoint and endpoint
        var angle = sPt.directionPoint(ePt);
        wall.rotateObject.angle = angle;
        this.updateWallDimensions();
    }
}

/*
* Helper function for Build Dimension Link: get a to/from point for a Dimension Link
* @param {Wall} wall The Wall Group being given a Dimension Link
* @param {Number} angle The angle of "wall"
* @param {Number} wallOffset The distance the Dimension Link will be from wall (in pixels)
*/
Floorplan.prototype.getAdjustedPoint = function (point, wall, angle, wallOffset) {
    var oldPoint = point.copy();
    point.offset(0, -(wall.data.thickness * .5) - wallOffset);
    point.offset(-oldPoint.x, -oldPoint.y).rotate(angle).offset(oldPoint.x, oldPoint.y);
    return point;
}

/*
* Helper function for Update Wall Dimensions; used to build Dimension Links
* @param {Wall} wall The wall the Link runs along (either describing the wall itself or some wallPart on "wall")
* @param {Number} index A number appended to PointNode keys; used for finding PointNodes of Dimension Links later
* @param {Point} point1 The first point of the wallPart being described by the Link
* @param {Point} point2 The second point of the wallPart being described by the Link
* @param {Number} angle The angle of the wallPart
* @param {Number} wallOffset How far from the wall (in px) the Link should be
* @param {Boolean} soloWallFlag If this Link is the only Dimension Link for "wall" (no other wallParts on "wall" selected) this is true; else, false
* @param {Floorplan} floorplan A reference to a valid Floorplan
*/
Floorplan.prototype.buildDimensionLink = function (wall, index, point1, point2, angle, wallOffset, soloWallFlag, floorplan) {
    point1 = floorplan.getAdjustedPoint(point1, wall, angle, wallOffset);
    point2 = floorplan.getAdjustedPoint(point2, wall, angle, wallOffset);
    var data1 = { key: wall.data.key + "PointNode" + index, category: "PointNode", loc: go.Point.stringify(point1) };
    var data2 = { key: wall.data.key + "PointNode" + (index + 1), category: "PointNode", loc: go.Point.stringify(point2) };
    var data3 = { key: wall.data.key + "DimensionLink", category: 'DimensionLink', from: data1.key, to: data2.key, stroke: 'gray', angle: angle, wall: wall.data.key, soloWallFlag: soloWallFlag };
    var pointNode1 = makePointNode();
    var pointNode2 = makePointNode();
    var link = makeDimensionLink();

    floorplan.pointNodes.add(pointNode1);
    floorplan.pointNodes.add(pointNode2);
    floorplan.dimensionLinks.add(link);
    floorplan.add(pointNode1);
    floorplan.add(pointNode2);
    floorplan.add(link);

    pointNode1.data = data1;
    pointNode2.data = data2;
    link.data = data3;
    link.fromNode = pointNode1;
    link.toNode = pointNode2;
}

/*
* Update Dimension Links shown along walls, based on which walls and wallParts are selected
*/
Floorplan.prototype.updateWallDimensions = function () {
    var floorplan = this;
    floorplan.skipsUndoManager = true;
    floorplan.startTransaction("update wall dimensions");
    // if showWallLengths === false, remove all pointNodes (used to build wall dimensions)
    if (!floorplan.model.modelData.preferences.showWallLengths) {
        floorplan.pointNodes.iterator.each(function (node) { floorplan.remove(node); });
        floorplan.dimensionLinks.iterator.each(function (link) { floorplan.remove(link); });
        floorplan.pointNodes.clear();
        floorplan.dimensionLinks.clear();
        floorplan.commitTransaction("update wall dimensions");
        floorplan.skipsUndoManager = false;
        return;
    }
    // make visible all dimension links (zero-length dimension links are set to invisible at the end of the function)
    floorplan.dimensionLinks.iterator.each(function (link) { link.visible = true; });

    var selection = floorplan.selection;
    // gather all selected walls, including walls of selected DoorNodes and WindowNodes
    var walls = new go.Set(/*go.Group*/);
    selection.iterator.each(function (part) {
        if ((part.category === 'WindowNode' || part.category === 'DoorNode') && part.containingGroup !== null) walls.add(part.containingGroup);
        if (part.category === 'WallGroup' && part.data && part.data.startpoint && part.data.endpoint) {
            var soloWallLink = null;
            floorplan.dimensionLinks.iterator.each(function (link) { if (link.data.soloWallFlag && link.data.wall === part.data.key) soloWallLink = link; });
            // if there's 1 Dimension Link for this wall (link has soloWallFlag), adjust to/from pointNodes of link, rather than deleting / redrawing
            if (soloWallLink !== null) {
                // since this is the only Dimension Link for this wall, keys of its pointNodes will be (wall.data.key) + 1 / (wall.data.key) + 2
                var linkPoint1 = null; var linkPoint2 = null;
                floorplan.pointNodes.iterator.each(function (node) {
                    if (node.data.key === part.data.key + "PointNode1") linkPoint1 = node;
                    if (node.data.key === part.data.key + "PointNode2") linkPoint2 = node;
                });
                var startpoint = part.data.startpoint; var endpoint = part.data.endpoint;
                // adjust  left/top-most / right/bottom-most wall endpoints so link angle is correct (else text appears on wrong side of Link)
                var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var newLoc1 = floorplan.getAdjustedPoint(firstWallPt.copy(), part, part.rotateObject.angle, 10);
                var newLoc2 = floorplan.getAdjustedPoint(lastWallPt.copy(), part, part.rotateObject.angle, 10);
                // cannot use model.setDataProperty, since pointNodes and dimensionLinks are not stored in the model
                linkPoint1.data.loc = go.Point.stringify(newLoc1);
                linkPoint2.data.loc = go.Point.stringify(newLoc2);
                soloWallLink.data.angle = part.rotateObject.angle;
                linkPoint1.updateTargetBindings();
                linkPoint2.updateTargetBindings();
                soloWallLink.updateTargetBindings();
            }
            // else build a Dimension Link for this wall; this is removed / replaced if Dimension Links for wallParts this wall are built
            else {
                var startpoint = part.data.startpoint;
                var endpoint = part.data.endpoint;
                var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                floorplan.buildDimensionLink(part, 1, firstWallPt.copy(), lastWallPt.copy(), part.rotateObject.angle, 10, true, floorplan);
            }
        }
    });
    // create array of selected wall endpoints and selected wallPart endpoints along the wall that represent measured stretches
    walls.iterator.each(function (wall) {
        var startpoint = wall.data.startpoint;
        var endpoint = wall.data.endpoint;
        var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
        var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;

        // store all endpoints along with the part they correspond to (used later to either create DimensionLinks or simply adjust them)
        var wallPartEndpoints = [];
        wall.memberParts.iterator.each(function (wallPart) {
            if (wallPart.isSelected) {
                var endpoints = getWallPartEndpoints(wallPart);
                wallPartEndpoints.push(endpoints[0]);
                wallPartEndpoints.push(endpoints[1]);
            }
        });
        // sort all wallPartEndpoints by x coordinate left to right/ up to down
        wallPartEndpoints.sort(function (a, b) {
            if ((a.x + a.y) > (b.x + b.y)) return 1;
            if ((a.x + a.y) < (b.x + b.y)) return -1;
            else return 0;
        });
        wallPartEndpoints.unshift(firstWallPt);
        wallPartEndpoints.push(lastWallPt);

        var angle = wall.rotateObject.angle;
        var k = 1; // k is a counter for the indices of PointNodes
        // build / edit dimension links for each stretch, defined by pairs of points in wallPartEndpoints
        for (var j = 0; j < wallPartEndpoints.length - 1; j++) {
            var linkPoint1 = null; linkPoint2 = null;
            floorplan.pointNodes.iterator.each(function (node) {
                if (node.data.key === wall.data.key + "PointNode" + k) linkPoint1 = node;
                if (node.data.key === wall.data.key + "PointNode" + (k + 1)) linkPoint2 = node;
            });
            if (linkPoint1 !== null) {
                var newLoc1 = floorplan.getAdjustedPoint(wallPartEndpoints[j].copy(), wall, angle, 5);
                var newLoc2 = floorplan.getAdjustedPoint(wallPartEndpoints[j + 1].copy(), wall, angle, 5);
                linkPoint1.data.loc = go.Point.stringify(newLoc1);
                linkPoint2.data.loc = go.Point.stringify(newLoc2);
                linkPoint1.updateTargetBindings();
                linkPoint2.updateTargetBindings();
            }
            // only build new links if needed -- normally simply change pointNode locations
            else floorplan.buildDimensionLink(wall, k, wallPartEndpoints[j].copy(), wallPartEndpoints[j + 1].copy(), angle, 5, false, floorplan);
            k += 2;
        }
        // total wall Dimension Link constructed of a kth and k+1st pointNode
        var totalWallDimensionLink = null;
        floorplan.dimensionLinks.iterator.each(function (link) {
            if ((link.fromNode.data.key === wall.data.key + "PointNode" + k) &&
                (link.toNode.data.key === wall.data.key + "PointNode" + (k + 1))) totalWallDimensionLink = link;
        });
        // if a total wall Dimension Link already exists, adjust its constituent point nodes
        if (totalWallDimensionLink !== null) {
            var linkPoint1 = null; var linkPoint2 = null;
            floorplan.pointNodes.iterator.each(function (node) {
                if (node.data.key === wall.data.key + "PointNode" + k) linkPoint1 = node;
                if (node.data.key === wall.data.key + "PointNode" + (k + 1)) linkPoint2 = node;
            });
            var newLoc1 = floorplan.getAdjustedPoint(wallPartEndpoints[0].copy(), wall, angle, 25);
            var newLoc2 = floorplan.getAdjustedPoint(wallPartEndpoints[wallPartEndpoints.length - 1].copy(), wall, angle, 25);
            linkPoint1.data.loc = go.Point.stringify(newLoc1);
            linkPoint2.data.loc = go.Point.stringify(newLoc2);
            linkPoint1.updateTargetBindings();
            linkPoint2.updateTargetBindings();
        }
            // only build total wall Dimension Link (far out from wall to accomodate wallPart Dimension Links) if one does not already exist
        else floorplan.buildDimensionLink(wall, k, wallPartEndpoints[0].copy(), wallPartEndpoints[wallPartEndpoints.length - 1].copy(), angle, 25, false, floorplan);
    });

    // Cleanup: hide zero-length Dimension Links, DimensionLinks with null wall points
    floorplan.dimensionLinks.iterator.each(function (link) {
        var canStay = false;
        floorplan.pointNodes.iterator.each(function (node) {
            if (node.data.key == link.data.to) canStay = true;
        });
        if (!canStay) floorplan.remove(link);
        else {
            var length = Math.sqrt(link.toNode.location.distanceSquaredPoint(link.fromNode.location));
            if (length < 1 && !link.data.soloWallFlag) link.visible = false;
        }
    });

    floorplan.commitTransaction("update wall dimensions");
    floorplan.skipsUndoManager = false;
}

/*
* Helper function for updateWallAngles(); returns the Point where two walls intersect; if they do not intersect, return null
* @param {Wall} wall1
* @param {Wall} wall2
*/
Floorplan.prototype.getWallsIntersection = function (wall1, wall2) {
    if (wall1 === null || wall2 === null) return null;
    // treat walls as lines; get lines in formula of ax + by = c
    var a1 = wall1.data.endpoint.y - wall1.data.startpoint.y;
    var b1 = wall1.data.startpoint.x - wall1.data.endpoint.x;
    var c1 = (a1 * wall1.data.startpoint.x) + (b1 * wall1.data.startpoint.y);
    var a2 = wall2.data.endpoint.y - wall2.data.startpoint.y;
    var b2 = wall2.data.startpoint.x - wall2.data.endpoint.x;
    var c2 = (a2 * wall2.data.startpoint.x) + (b2 * wall2.data.startpoint.y);
    // Solve the system of equations, finding where the lines (not segments) would intersect
    /** Algebra Explanation:
        Line 1: a1x + b1y = c1
        Line 2: a2x + b2y = c2

        Multiply Line1 equation by b2, Line2 equation by b1, get:
        a1b1x + b1b2y = b2c1
        a2b1x + b1b2y = b1c2

        Subtract bottom from top:
        a1b2x - a2b1x = b2c1 - b1c2

        Divide both sides by a1b2 - a2b1, get equation for x. Equation for y is analogous
    **/
    var det = a1 * b2 - a2 * b1;
    var x = null; var y = null;
    // Edge Case: Lines are paralell
    if (det === 0) {
        // Edge Case: wall1 and wall2 have an endpoint to endpoint intersection (the only instance in which paralell walls could intersect at a specific point)
        if (wall1.data.startpoint.equals(wall2.data.startpoint) || wall1.data.startpoint.equals(wall2.data.endpoint)) return wall1.data.startpoint;
        if (wall1.data.endpoint.equals(wall2.data.startpoint) || wall1.data.endpoint.equals(wall2.data.endpoint)) return wall1.data.endpoint;
        return null;
    }
    else {
        x = (b2 * c1 - b1 * c2) / det;
        y = (a1 * c2 - a2 * c1) / det;
    }
    // ensure proposed intersection is contained in both line segments (walls)
    var inWall1 = ((Math.min(wall1.data.startpoint.x, wall1.data.endpoint.x) <= x) && (Math.max(wall1.data.startpoint.x, wall1.data.endpoint.x) >= x)
        && (Math.min(wall1.data.startpoint.y, wall1.data.endpoint.y) <= y) && (Math.max(wall1.data.startpoint.y, wall1.data.endpoint.y) >= y));
    var inWall2 = ((Math.min(wall2.data.startpoint.x, wall2.data.endpoint.x) <= x) && (Math.max(wall2.data.startpoint.x, wall2.data.endpoint.x) >= x)
        && (Math.min(wall2.data.startpoint.y, wall2.data.endpoint.y) <= y) && (Math.max(wall2.data.startpoint.y, wall2.data.endpoint.y) >= y));
    if (inWall1 && inWall2) return new go.Point(x, y);
    else return null;
}

/*
* Update Angle Nodes shown along a wall, based on which wall(s) is/are selected
*/
Floorplan.prototype.updateWallAngles = function () {
    var floorplan = this;
    floorplan.skipsUndoManager = true; // do not store displaying angles as a transaction
    floorplan.startTransaction("display angles");
    if (floorplan.model.modelData.preferences.showWallAngles) {
        floorplan.angleNodes.iterator.each(function (node) { node.visible = true; });
        var selectedWalls = [];
        floorplan.selection.iterator.each(function (part) { if (part.category === "WallGroup") selectedWalls.push(part); });
        for (var i = 0; i < selectedWalls.length; i++) {
            var seen = new go.Set(/*"string"*/); // Set of all walls "seen" thus far for "wall"
            var wall = selectedWalls[i];
            var possibleWalls = floorplan.findNodesByExample({ category: "WallGroup" });

            // go through all other walls; if the other wall intersects this wall, make angles
            possibleWalls.iterator.each(function (otherWall) {
                if (otherWall.data === null || wall.data === null || seen.contains(otherWall.data.key)) return;
                if ((otherWall.data.key !== wall.data.key) && (floorplan.getWallsIntersection(wall, otherWall) !== null) && (!seen.contains(otherWall.data.key))) {

                    seen.add(otherWall.data.key);
                    // "otherWall" intersects "wall"; make or update angle nodes
                    var intersectionPoint = floorplan.getWallsIntersection(wall, otherWall);
                    var wallsInvolved = floorplan.findObjectsNear(intersectionPoint,
                        1,
                        function (x) { if (x.part !== null) return x.part; },
                        function (p) { return p.category === "WallGroup"; },
                        false);

                    var endpoints = []; // store endpoints and their corresponding walls here
                    // gather endpoints of each wall in wallsInvolved; discard endpoints within a tolerance distance of intersectionPoint
                    wallsInvolved.iterator.each(function (w) {
                        var tolerance = (floorplan.model.modelData.gridSize >= 10) ? floorplan.model.modelData.gridSize : 10;
                        if (Math.sqrt(w.data.startpoint.distanceSquaredPoint(intersectionPoint)) > tolerance) endpoints.push({ point: w.data.startpoint, wall: w.data.key });
                        if (Math.sqrt(w.data.endpoint.distanceSquaredPoint(intersectionPoint)) > tolerance) endpoints.push({ point: w.data.endpoint, wall: w.data.key });
                    });

                    // find maxRadius (shortest distance from an involved wall's endpoint to intersectionPoint or 30, whichever is smaller)
                    var maxRadius = 30;
                    for (var i = 0; i < endpoints.length; i++) {
                        var distance = Math.sqrt(endpoints[i].point.distanceSquaredPoint(intersectionPoint));
                        if (distance < maxRadius) maxRadius = distance;
                    }

                    // sort endpoints in a clockwise fashion around the intersectionPoint
                    endpoints.sort(function (a, b) {
                        a = a.point; b = b.point;
                        if (a.x - intersectionPoint.x >= 0 && b.x - intersectionPoint.x < 0) return true;
                        if (a.x - intersectionPoint.x < 0 && b.x - intersectionPoint.x >= 0) return false;
                        if (a.x - intersectionPoint.x == 0 && b.x - intersectionPoint.x == 0) {
                            if (a.y - intersectionPoint.y >= 0 || b.y - intersectionPoint.y >= 0) return a.y > b.y;
                            return b.y > a.y;
                        }

                        // compute the cross product of vectors (center -> a) x (center -> b)
                        var det = (a.x - intersectionPoint.x) * (b.y - intersectionPoint.y) - (b.x - intersectionPoint.x) * (a.y - intersectionPoint.y);
                        if (det < 0) return true;
                        if (det > 0) return false;

                        // points a and b are on the same line from the center; check which point is closer to the center
                        var d1 = (a.x - intersectionPoint.x) * (a.x - intersectionPoint.x) + (a.y - intersectionPoint.y) * (a.y - intersectionPoint.y);
                        var d2 = (b.x - intersectionPoint.x) * (b.x - intersectionPoint.x) + (b.y - intersectionPoint.y) * (b.y - intersectionPoint.y);
                        return d1 > d2;
                    }); // end endpoints sort

                    // for each pair of endpoints, construct or modify an angleNode
                    for (var i = 0; i < endpoints.length; i++) {
                        var p1 = endpoints[i];
                        if (endpoints[i + 1] != null) var p2 = endpoints[i + 1];
                        else var p2 = endpoints[0];
                        var a1 = intersectionPoint.directionPoint(p1.point);
                        var a2 = intersectionPoint.directionPoint(p2.point);
                        var sweep = Math.abs(a2 - a1 + 360) % 360;
                        var angle = a1;

                        /*
                            construct proper key for angleNode
                            proper angleNode key syntax is "wallWwallX...wallYangleNodeZ" such that W < Y < Y; angleNodes are sorted clockwise around the intersectionPoint by Z
                        */
                        var keyArray = []; // used to construct proper key
                        wallsInvolved.iterator.each(function (wall) { keyArray.push(wall); });
                        keyArray.sort(function (a, b) {
                            var aIndex = a.data.key.match(/\d+/g);
                            var bIndex = b.data.key.match(/\d+/g);
                            if (isNaN(aIndex)) return true;
                            if (isNaN(bIndex)) return false;
                            else return aIndex > bIndex;
                        });

                        var key = "";
                        for (var j = 0; j < keyArray.length; j++) key += keyArray[j].data.key;
                        key += "angle" + i;

                        // check if this angleNode already exists -- if it does, adjust data (instead of deleting/redrawing)
                        var angleNode = null;
                        floorplan.angleNodes.iterator.each(function (aNode) { if (aNode.data.key === key) angleNode = aNode; });
                        if (angleNode !== null) {
                            angleNode.data.angle = angle;
                            angleNode.data.sweep = sweep;
                            angleNode.data.loc = go.Point.stringify(intersectionPoint);
                            angleNode.data.maxRadius = maxRadius;
                            angleNode.updateTargetBindings();
                        }
                            // if this angleNode does not already exist, create it and add it to the diagram
                        else {
                            var data = { key: key, category: "AngleNode", loc: go.Point.stringify(intersectionPoint), stroke: "dodgerblue", angle: angle, sweep: sweep, maxRadius: maxRadius };
                            var newAngleNode = makeAngleNode();
                            newAngleNode.data = data;
                            floorplan.add(newAngleNode);
                            newAngleNode.updateTargetBindings();
                            floorplan.angleNodes.add(newAngleNode);
                        }
                    }
                }
            });
        }
        // garbage collection (angleNodes that should not exist any more)
        var garbage = [];
        floorplan.angleNodes.iterator.each(function (node) {
            var keyNums = node.data.key.match(/\d+/g); // values X for all wall keys involved, given key "wallX"
            var numWalls = (node.data.key.match(/wall/g) || []).length; // # of walls involved in in "node"'s construction
            var wallsInvolved = [];
            // add all walls involved in angleNode's construction to wallsInvolved
            for (var i = 0; i < keyNums.length - 1; i++) wallsInvolved.push("wall" + keyNums[i]);
            // edge case: if the numWalls != keyNums.length, that means the wall with key "wall" (no number in key) is involved
            if (numWalls !== keyNums.length - 1) wallsInvolved.push("wall");

            // Case 1: if any wall pairs involved in this angleNode are no longer intersecting, add this angleNode to "garbage"
            for (var i = 0; i < wallsInvolved.length - 1; i++) {
                var wall1 = floorplan.findPartForKey(wallsInvolved[i]);
                var wall2 = floorplan.findPartForKey(wallsInvolved[i + 1]);
                var intersectionPoint = floorplan.getWallsIntersection(wall1, wall2);
                if (intersectionPoint === null) garbage.push(node);
            }
            // Case 2: if there are angleNode clusters with the same walls in their keys as "node" but different locations, destroy and rebuild
            // collect all angleNodes with same walls in their construction as "node"
            var possibleAngleNodes = new go.Set(/*go.Node*/);
            var allWalls = node.data.key.slice(0, node.data.key.indexOf("angle"));
            floorplan.angleNodes.iterator.each(function (other) { if (other.data.key.indexOf(allWalls) !== -1) possibleAngleNodes.add(other); });
            possibleAngleNodes.iterator.each(function (pNode) {
                if (pNode.data.loc !== node.data.loc) {
                    garbage.push(pNode);
                }
            });

            // Case 3: put any angleNodes with sweep === 0 in garbage
            if (node.data.sweep === 0) garbage.push(node);
        });

        for (var i = 0; i < garbage.length; i++) {
            floorplan.remove(garbage[i]); // remove garbage
            floorplan.angleNodes.remove(garbage[i]);
        }
    }
    // hide all angles > 180 if show only small angles == true in preferences
    if (floorplan.model.modelData.preferences.showOnlySmallWallAngles) {
        floorplan.angleNodes.iterator.each(function (node) { if (node.data.sweep >= 180) node.visible = false; });
    }
    // hide all angles if show wall angles == false in preferences
    if (!floorplan.model.modelData.preferences.showWallAngles) {
        floorplan.angleNodes.iterator.each(function (node) { node.visible = false; });
    }
    floorplan.commitTransaction("display angles");
    floorplan.skipsUndoManager = false;
}
