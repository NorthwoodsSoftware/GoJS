/*
* Copyright (C) 1998-2018 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANNER: WALL RESHAPING TOOL
* Used to reshape walls via their endpoints in a Floorplan
* Depends on functionality in Floorplan.js
*/

// Constructor
function WallReshapingTool() {
    go.Tool.call(this);
    this.name = "WallReshaping";

    var h = new go.Shape();
    h.figure = "Diamond";
    h.desiredSize = new go.Size(7, 7);
    h.fill = "lightblue";
    h.stroke = "dodgerblue";
    h.cursor = "move";
    this._handleArchetype = h;

    this._handle = null;
    this._adornedShape = null;
    this._reshapeObjectName = 'SHAPE';
    this._angle = 0;
    this._length;
    this._isBuilding = false; // only true when a wall is first being constructed, set in WallBuildingTool's doMouseUp function

    this._returnPoint = null; // used if reshape is cancelled; return reshaping wall endpoint to its previous location
    this._returnData = null; // used if reshape is cancelled; return all windows/doors of a reshaped wall to their old place
} go.Diagram.inherit(WallReshapingTool, go.Tool);

// Get the archetype for the handle (a Shape)
Object.defineProperty(WallReshapingTool.prototype, "handleArchetype", {
    get: function () { return this._handleArchetype; }
});

// Get / set current handle being used to reshape the wall
Object.defineProperty(WallReshapingTool.prototype, "handle", {
    get: function () { return this._handle; },
    set: function (val) { this._handle = val; }
});

// Get / set adorned shape (shape of the Wall Group being reshaped)
Object.defineProperty(WallReshapingTool.prototype, "adornedShape", {
    get: function () { return this._adornedShape; },
    set: function (val) { this._adornedShape = val;}
});

// Get / set current angle
Object.defineProperty(WallReshapingTool.prototype, "angle", {
    get: function () { return this._angle; },
    set: function (val) { this._angle = val; }
});

// Get / set length of the wall being reshaped (used only with SHIFT + drag)
Object.defineProperty(WallReshapingTool.prototype, "length", {
    get: function () { return this._length; },
    set: function (val) { this._length = val; }
});

// Get / set the name of the object being reshaped
Object.defineProperty(WallReshapingTool.prototype, "reshapeObjectName", {
    get: function () { return this._reshapeObjectName; },
    set: function (val) { this._reshapeObjectName = val; }
});

// Get / set flag telling tool whether it's reshaping a new wall (isBuilding = true) or reshaping an old wall (isBuilding = false)
Object.defineProperty(WallReshapingTool.prototype, "isBuilding", {
    get: function () { return this._isBuilding; },
    set: function (val) { this._isBuilding = val; }
});

// Get set loc data for wallParts to return to if reshape is cancelled
Object.defineProperty(WallReshapingTool.prototype, "returnData", {
    get: function () { return this._returnData; },
    set: function (val) { this._returnData = val; }
});

// Get / set the point to return the reshaping wall endpoint to if reshape is cancelled
Object.defineProperty(WallReshapingTool.prototype, "returnPoint", {
    get: function () { return this._returnPoint; },
    set: function (val) { this._returnPoint = val;}
});

/*
* Places reshape handles on either end of a wall node
* @param {part} The wall to adorn
*/
WallReshapingTool.prototype.updateAdornments = function (part) {
    if (part === null || part instanceof go.Link) return;
    if (part.isSelected && !this.diagram.isReadOnly) {
        var selelt = part.findObject(this.reshapeObjectName);
        if (selelt.part.data.category === "WallGroup") {
            var adornment = part.findAdornment(this.name);
            if (adornment === null) {
                adornment = this.makeAdornment(selelt);
            }
            if (adornment !== null && selelt.geometry != null) {
                // update the position/alignment of each handle
                var geo = selelt.geometry;
                var b = geo.bounds;
                // update the size of the adornment
                adornment.findObject("BODY").desiredSize = b.size;
                adornment.elements.each(function (h) {
                    if (h.name === undefined) return;
                    var x = 0;
                    var y = 0;
                    switch (h.name) {
                        case 'sPt': x = geo.startX; y = geo.startY; break;
                        case 'ePt': x = geo.endX; y = geo.endY; break;
                    }
                    var xCheck = Math.min((x - b.x) / b.width, 1);
                    var yCheck = Math.min((y - b.y) / b.height, 1);
                    if (xCheck < 0) xCheck = 0;
                    if (yCheck < 0) yCheck = 0;
                    if (xCheck > 1) xCheck = 1;
                    if (yCheck > 1) yCheck = 1;
                    if (isNaN(xCheck)) xCheck = 0;
                    if (isNaN(yCheck)) yCheck = 0;
                    h.alignment = new go.Spot(Math.max(0, xCheck), Math.max(0, yCheck));
                });

                part.addAdornment(this.name, adornment);
                adornment.location = selelt.getDocumentPoint(go.Spot.Center);
                adornment.angle = selelt.getDocumentAngle();
                return;
            }
        }
    }
    part.removeAdornment(this.name);
}

// If the user has clicked down at a visible handle on a wall node, then the tool may start
WallReshapingTool.prototype.canStart = function () {
    if (!this.isEnabled) return false;
    var diagram = this.diagram;
    if (diagram === null || diagram.isReadOnly) return false;
    if (!diagram.allowReshape) return false;
    if (!diagram.lastInput.left) return false;
    var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    return (h !== null || this.isBuilding);
}

// Start a new transaction for the wall reshaping
WallReshapingTool.prototype.doActivate = function () {
    var diagram = this.diagram;
    if (diagram === null) return;
    if (this.isBuilding) {
        // this.adornedShape has already been set in WallBuildingTool's doMouseDown function
        var wall = this.adornedShape.part;
        this.handle = this.findToolHandleAt(wall.data.endpoint, this.name);
    } else {
        this.handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
        if (this.handle === null) return;
        var shape = this.handle.part.adornedObject;
        var wall = shape.part;
        if (!shape) return;
        this.adornedShape = shape;

        // store pre-reshape location of wall's reshaping endpoint
        this.returnPoint = this.snapPointToGrid(diagram.firstInput.documentPoint);

        // store pre-reshape locations of all wall's members (windows / doors)
        var wallParts = wall.memberParts;
        if (wallParts.count != 0) {
            var locationsMap = new go.Map("string", go.Point);
            wallParts.iterator.each(function (wallPart) {
                locationsMap.add(wallPart.data.key, wallPart.location);
            });
            this.returnData = locationsMap;
        }
    }

    diagram.isMouseCaptured = true;
    this.startTransaction(this.name);
    this.isActive = true;
}

// Adjust the handle's coordinates, along with the wall's points
WallReshapingTool.prototype.doMouseMove = function () {
    var diagram = this.diagram;
    var tool = this;
    var wall = this.handle.part.adornedPart;

    if (this.isActive && diagram !== null) {
        var mousePt = diagram.lastInput.documentPoint;
        tool.calcAngleAndLengthFromHandle(mousePt); // sets this.angle and this.length (useful for when SHIFT is held)
        var newpt = diagram.lastInput.documentPoint;
        if (diagram.floorplanUI) diagram.floorplanUI.setSelectionInfo(this.adornedShape.part, diagram); // update selection info window
        this.reshape(newpt);
    }
    diagram.updateWallAngles();
}

// Does one final reshape, commits the transaction, then stops the tool
WallReshapingTool.prototype.doMouseUp = function () {
    var diagram = this.diagram;
    if (this.isActive && diagram !== null) {
        var newpt = diagram.lastInput.documentPoint;
        this.reshape(newpt);
        this.transactionResult = this.name;  // success
    }
    this.stopTool();
}

// End the wall reshaping transaction
WallReshapingTool.prototype.doDeactivate = function () {
    var diagram = this.diagram;
    var returnData = this.returnData;
    // if a wall reshaped to length < 1 px, remove it
    var wall = this.handle.part.adornedPart;
    var sPt = wall.data.startpoint;
    var ePt = wall.data.endpoint;
    var length = Math.sqrt(sPt.distanceSquared(ePt.x, ePt.y));
    if (length < 1) {
        diagram.remove(wall); // remove wall
        wall.memberParts.iterator.each(function (member) { diagram.remove(member); }) // remove wall's parts
        var wallDimensionLinkPointNodes = [];
        diagram.pointNodes.iterator.each(function (node) { if (node.data.key.indexOf(wall.data.key) !== -1) wallDimensionLinkPointNodes.push(node); });
        diagram.remove(wallDimensionLinkPointNodes[0]);
        diagram.remove(wallDimensionLinkPointNodes[1]);
    }

    // remove wall's dimension links if tool cancelled via esc key
    if (diagram.lastInput.key === "Esc" && !this.isBuilding) {
        diagram.skipsUndoManager = true;
        diagram.startTransaction("reset to old data");
        if (this.handle.name === "sPt") wall.data.startpoint = this.returnPoint;
        else wall.data.endpoint = this.returnPoint;

        diagram.updateWall(wall);

        if (this.returnData) {
            this.returnData.iterator.each(function (kvp) {
                var key = kvp.key;
                var loc = kvp.value;
                var wallPart = diagram.findPartForKey(key);
                wallPart.location = loc;
                wallPart.rotateObject.angle = wall.rotateObject.angle;
            });
        }
        diagram.commitTransaction("reset to old data");
        diagram.skipsUndoManager = false;
    }

    // remove guide line points
    var glPoints = this.diagram.findNodesByExample({ category: 'GLPointNode' });
    diagram.removeParts(glPoints, true);

    diagram.updateWallDimensions();
    // commit transaction, deactivate tool
    diagram.commitTransaction(this.name);
    this.isActive = false;
}

/*
* Creates an adornment with 2 handles
* @param {Shape} The adorned wall's Shape element
*/
WallReshapingTool.prototype.makeAdornment = function (selelt) {
    var adornment = new go.Adornment;
    adornment.type = go.Panel.Spot;
    adornment.locationObjectName = "BODY";
    adornment.locationSpot = go.Spot.Center;
    var h = new go.Shape();
    h.name = "BODY"
    h.fill = null;
    h.stroke = null;
    h.strokeWidth = 0;
    adornment.add(h);

    h = this.makeHandle();
    h.name = 'sPt';
    adornment.add(h);
    h = this.makeHandle();
    h.name = 'ePt';
    adornment.add(h);

    adornment.category = this.name;
    adornment.adornedObject = selelt;
    return adornment;
}

// Creates a basic handle archetype
WallReshapingTool.prototype.makeHandle = function () {
    var h = this.handleArchetype;
    return h.copy();
}

/*
* Calculate the angle and length made from the mousepoint and the non-moving handle; used to reshape wall when holding SHIFT
* @param {Point} mousePt The mouse cursors coordinate position
*/
WallReshapingTool.prototype.calcAngleAndLengthFromHandle = function (mousePt) {
    var tool = this;
    var diagram = this.diagram;
    var h = this.handle;
    var otherH;
    var node = this.adornedShape.part;
    var adornments = node.adornments.iterator;
    var adornment;
    adornments.each(function (a) { if (a.category === tool.name) adornment = a; })
    adornment.elements.each(function (e) {
        if (e.name != undefined && e.name != h.name) otherH = e;
    });

    // calc angle from otherH against the horizontal
    var otherHandlePt = otherH.getDocumentPoint(go.Spot.Center);

    deltaY = mousePt.y - otherHandlePt.y
    deltaX = mousePt.x - otherHandlePt.x
    var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    // because atan2 goes from -180 to +180 and we want it to be 0-360
    // so -90 becomes 270, etc.
    if (angle < 0) angle += 360;
    tool.angle = angle;

    var distanceBetween = Math.sqrt(mousePt.distanceSquared(otherHandlePt.x, otherHandlePt.y));
    tool.length = distanceBetween;
}

/*
* Takes a point -- returns a new point that is closest to the original point that conforms to the grid snap
* @param {Point} point The point to snap to grid
*/
WallReshapingTool.prototype.snapPointToGrid = function (point) {
    var diagram = this.diagram;
    var newx = diagram.model.modelData.gridSize * Math.round(point.x / diagram.model.modelData.gridSize);
    var newy = diagram.model.modelData.gridSize * Math.round(point.y / diagram.model.modelData.gridSize);
    var newPt = new go.Point(newx, newy);
    return newPt;
}

/*
* Reshapes the shape's geometry, updates model data
* @param {Point} newPoint The point to move the reshaping wall's reshaping endpoint to
*/
WallReshapingTool.prototype.reshape = function (newPoint) {
    var diagram = this.diagram;
    var tool = this;
    var shape = this.adornedShape;
    var node = shape.part;

    // if user holds SHIFT, make angle between startPoint / endPoint and the horizontal line a multiple of 45
    if (this.diagram.lastInput.shift) {

        var sPt; // the stationary point -- the point at the handle that is not being adjusted
        if (tool.handle.name === 'sPt') sPt = node.data.endpoint;
        else sPt = node.data.startpoint;

        var oldGridSize = diagram.model.modelData.gridSize;
        var gridSize = diagram.model.modelData.gridSize;
        //if gridSnapping is disabled, just set 'gridSize' var to 1 so it doesn't affect endPoint calculations
        if (!(this.diagram.toolManager.draggingTool.isGridSnapEnabled)) gridSize = 1;

        // these are set in mouseMove's call to calcAngleAndLengthFromHandle()
        var angle = tool.angle;
        var length = tool.length;

        // snap to 90 degrees
        if (angle > 67.5 && angle < 112.5) {
            var newy = sPt.y + length;
            newy = gridSize * Math.round(newy / gridSize);
            newPoint = new go.Point(sPt.x, newy);
        }
        // snap to 180 degrees
        if (angle > 112.5 && angle < 202.5) {
            var newx = sPt.x - length;
            newx = gridSize * Math.round(newx / gridSize);
            newPoint = new go.Point(newx, sPt.y);
        }
        // snap to 270 degrees
        if (angle > 247.5 && angle < 292.5) {
            var newy = sPt.y - length;
            newy = gridSize * Math.round(newy / gridSize);
            newPoint = new go.Point(sPt.x, newy);
        }
        // snap to 360 degrees
        if (angle > 337.5 || angle < 22.5) {
            var newx = sPt.x + length;
            newx = gridSize * Math.round(newx / gridSize);
            newPoint = new go.Point(newx, sPt.y);
        }
        // snap to 45 degrees
        if (angle > 22.5 && angle < 67.5) {
            var newx = (Math.sin(.785) * length);
            newx = gridSize * Math.round(newx / gridSize) + sPt.x;
            var newy = (Math.cos(.785) * length);
            newy = gridSize * Math.round(newy / gridSize) + sPt.y;
            newPoint = new go.Point(newx, newy);
        }
        // snap to 135 degrees
        if (angle > 112.5 && angle < 157.5) {
            var newx = (Math.sin(.785) * length);
            newx = sPt.x - (gridSize * Math.round(newx / gridSize));
            var newy = (Math.cos(.785) * length);
            newy = gridSize * Math.round(newy / gridSize) + sPt.y;
            newPoint = new go.Point(newx, newy);
        }
        // snap to 225 degrees
        if (angle > 202.5 && angle < 247.5) {
            var newx = (Math.sin(.785) * length);
            newx = sPt.x - (gridSize * Math.round(newx / gridSize));
            var newy = (Math.cos(.785) * length);
            newy = sPt.y - (gridSize * Math.round(newy / gridSize));
            newPoint = new go.Point(newx, newy);
        }
        // snap to 315 degrees
        if (angle > 292.5 && angle < 337.5) {
            var newx = (Math.sin(.785) * length);
            newx = sPt.x + (gridSize * Math.round(newx / gridSize));
            var newy = (Math.cos(.785) * length);
            newy = sPt.y - (gridSize * Math.round(newy / gridSize));
            newPoint = new go.Point(newx, newy);
        }
        gridSize = oldGridSize; //set gridSize back to what it used to be in case gridSnap is enabled again
    }
    if (this.diagram.toolManager.draggingTool.isGridSnapEnabled) newPoint = this.snapPointToGrid(newPoint);
    else newPoint = new go.Point(newPoint.x, newPoint.y);

    var type = this.handle.name;
    if (type === undefined) return;
    // set the appropriate point in the node's data to the newPoint value
    switch (type) {
        case 'sPt':
            reshapeWall(node, node.data.endpoint, node.data.startpoint, newPoint, diagram, tool);
            break;
        case 'ePt':
            reshapeWall(node, node.data.startpoint, node.data.endpoint, newPoint, diagram, tool);
            break;
    }
    this.updateAdornments(shape.part);
    this.showMatches();
    diagram.updateWallDimensions();
}

/*Maintain position of all wallParts as best as possible when a wall is being reshaped
* Position is relative to the distance a wallPart's location is from the stationaryPoint of the wall
* This is called during WallReshapingTool's reshape function
* @param {Group} wall The wall being reshaped
* @param {Point} stationaryPoint The endpoint of the wall not being reshaped
* @param {Point} movingPoint The endpoint of the wall being reshaped
* @param {Point} newPoint The point that movingPoint is going to
* @param {Diagram} diagram The diagram belonging WallReshapingTool belongs to
* @param {WallReshapingTool} tool
*/
function reshapeWall(wall, stationaryPoint, movingPoint, newPoint, diagram, tool) {
    var wallParts = wall.memberParts;
    var arr = [];
    var oldAngle = wall.rotateObject.angle;
    wallParts.iterator.each(function (part) { arr.push(part); });
    // remember the distance each wall part's location was from the stationary point; store these in a Map
    var distancesMap = new go.Map("string", "number");
    var closestPart  = null; var closestDistance = Number.MAX_VALUE;
    for (var i = 0; i < arr.length; i++) {
        var part = arr[i];
        var distanceToStationaryPt = Math.sqrt(part.location.distanceSquaredPoint(stationaryPoint));
        distancesMap.add(part.data.key, distanceToStationaryPt);
        // distanceToMovingPt is determined by whichever endpoint of the wallpart is closest to movingPoint
        var endpoints = getWallPartEndpoints(part);
        var distanceToMovingPt = Math.min(Math.sqrt(endpoints[0].distanceSquaredPoint(movingPoint)),
                                Math.sqrt(endpoints[1].distanceSquaredPoint(movingPoint)));
        // find and store the closest wallPart to the movingPt
        if (distanceToMovingPt < closestDistance) {
            closestDistance = distanceToMovingPt;
            closestPart = part;
        }
    }
    // if the proposed newPoint would make it so the wall would reshape past closestPart, set newPoint to the edge point of closest part
    if (closestPart !== null) {
        var loc = closestPart.location;
        var partLength = closestPart.data.width;
        var angle = oldAngle;
        var point1 = new go.Point((loc.x + (partLength / 2)), loc.y);
        var point2 = new go.Point((loc.x - (partLength / 2)), loc.y);
        point1.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
        point2.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
        var distance1 = Math.sqrt(stationaryPoint.distanceSquaredPoint(point1));
        var distance2 = Math.sqrt(stationaryPoint.distanceSquaredPoint(point2));

        var minLength; var newLoc;
        if (distance1 > distance2) {
            minLength = distance1;
            newLoc = point1;
        } else {
            minLength = distance2;
            newLoc = point2;
        }

        var testDistance = Math.sqrt(stationaryPoint.distanceSquaredPoint(newPoint));
        if (testDistance < minLength) newPoint = newLoc;
    }
    // reshape the wall
    if (movingPoint === wall.data.endpoint) diagram.model.setDataProperty(wall.data, "endpoint", newPoint);
    else diagram.model.setDataProperty(wall.data, "startpoint", newPoint);
    diagram.updateWall(wall);
    // calculate the new angle offset
    var newAngle = wall.rotateObject.angle;
    var angleOffset = newAngle - oldAngle;
    // for each wallPart, maintain relative distance from the stationaryPoint
    distancesMap.iterator.each(function (kvp) {
        var wallPart = diagram.findPartForKey(kvp.key);
        var distance = kvp.value;
        var wallLength = Math.sqrt(stationaryPoint.distanceSquaredPoint(movingPoint));
        var newLoc = new go.Point(stationaryPoint.x + ((distance / wallLength) * (movingPoint.x - stationaryPoint.x)),
            stationaryPoint.y + ((distance / wallLength) * (movingPoint.y - stationaryPoint.y)));
        wallPart.location = newLoc;
        wallPart.angle = (wallPart.angle + angleOffset) % 360;
    });
}

// Show if the wall (at the adjustment handle being moved) lines up with other wall edges
WallReshapingTool.prototype.showMatches = function () {
    //if (!(document.getElementById('wallGuidelinesCheckbox').checked)) return;
    var diagram = this.diagram;
    if (!diagram.model.modelData.preferences.showWallGuidelines) return;
    var tool = this;
    var wall = this.adornedShape.part;
    var comparePt;
    if (this.handle.name === 'sPt') comparePt = wall.data.startpoint;
    else comparePt = wall.data.endpoint;

    // the wall attached to the handle being manipulated
    var hWall = this.adornedShape.part;

    // delete any old guideline points (these are used to show guidelines, must be cleared before a new guideline can be shown)
    var glPoints = diagram.findNodesByExample({ category: 'GLPointNode' });
    diagram.removeParts(glPoints, true);

    var walls = this.diagram.findNodesByExample({ category: 'WallGroup' });
    walls.iterator.each(function (w) {
        if (w.data.key != hWall.data.key) {
            var shape = w.findObject('SHAPE');
            var geo = shape.geometry;

            var pt1 = w.data.startpoint;
            var pt2 = w.data.endpoint;

            tool.checkPtLinedUp(pt1, comparePt.x, pt1.x, comparePt);
            tool.checkPtLinedUp(pt1, comparePt.y, pt1.y, comparePt);
            tool.checkPtLinedUp(pt2, comparePt.x, pt2.x, comparePt);
            tool.checkPtLinedUp(pt2, comparePt.y, pt2.y, comparePt);
        }
    })
}

/* Static function -- checks if there exists a horiontal or vertical line (decided by 'coord' parameter) between pt and compare pt
* if so, draws a link between the two, letting the user know the wall they're reshaping lines up with another's edge
* @param {Point} pt
* @param {Number} comparePtCoord
* @param {Number} ptCoord
* @param {Point} comparePt
*/
WallReshapingTool.prototype.checkPtLinedUp = function (pt, comparePtCoord, ptCoord, comparePt) {
    function makeGuideLinePoint() {
        var $ = go.GraphObject.make;
        return $(go.Node, "Spot", { locationSpot: go.Spot.TopLeft, locationObjectName: "SHAPE", desiredSize: new go.Size(1, 1), },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, { stroke: null, strokeWidth: 1, name: "SHAPE", fill: "black", })
      );}

    function makeGuideLineLink() {
        var $ = go.GraphObject.make;
        return $(go.Link,
        $(go.Shape, { stroke: "black", strokeWidth: 2, name: 'SHAPE', },
        new go.Binding("strokeWidth", "width"),
        new go.Binding('stroke', 'stroke')
        )
    );}

    var diagram = this.diagram;
    var errorMargin = Math.abs(comparePtCoord - ptCoord);
    if (errorMargin < 2) {

        var data = { category: "GLPointNode", loc: go.Point.stringify(pt) };
        var data2 = { key: 'movingPt', category: "GLPointNode", loc: go.Point.stringify(comparePt) };
        var data3 = { key: 'guideline', category: 'guideLine', from: 'movingPt', to: data.key, stroke: 'blue' };
        var GLPoint1 = makeGuideLinePoint();
        var GLPoint2 = makeGuideLinePoint();
        var GLLink = makeGuideLineLink();
        diagram.add(GLPoint1);
        diagram.add(GLPoint2);
        diagram.add(GLLink);

        GLPoint1.data = data;
        GLPoint2.data = data2;
        GLLink.data = data3;
        GLLink.fromNode = GLPoint1;
        GLLink.toNode = GLPoint2;
    }
}
