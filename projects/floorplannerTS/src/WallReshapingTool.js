/*
* Copyright (C) 1998-2021 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANNER: WALL RESHAPING TOOL
* Used to reshape walls via their endpoints in a Floorplan
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
        define(["require", "exports", "../../../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var go = require("../../../release/go");
    var WallReshapingTool = /** @class */ (function (_super) {
        __extends(WallReshapingTool, _super);
        /**
         * @constructor
         * This tool is responsible for allowing walls in a Floorplan to be reshaped via handles on either side.
         */
        function WallReshapingTool() {
            var _this = _super.call(this) || this;
            var h = new go.Shape();
            h.figure = 'Diamond';
            h.desiredSize = new go.Size(12, 12);
            h.fill = 'lightblue';
            h.stroke = 'dodgerblue';
            h.cursor = 'move';
            _this._handleArchetype = h;
            _this._handle = null;
            _this._adornedShape = null;
            _this._reshapeObjectName = 'SHAPE';
            _this._angle = 0;
            _this._length = 0;
            _this._isBuilding = false; // only true when a wall is first being constructed, set in WallBuildingTool's doMouseUp function
            _this._isIntersecting = false;
            _this._joinedWalls = new go.Set();
            _this._returnPoint = null; // used if reshape is cancelled; return reshaping wall endpoint to its previous location
            _this._returnData = null; // used if reshape is cancelled; return all windows/doors of a reshaped wall to their old place
            _this._joinedWalls = new go.Set();
            _this._wallIntersecting = null;
            return _this;
        }
        Object.defineProperty(WallReshapingTool.prototype, "handleArchetype", {
            // Get the archetype for the handle (a Shape)
            get: function () { return this._handleArchetype; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "handle", {
            // Get / set current handle being used to reshape the wall
            get: function () { return this._handle; },
            set: function (value) { this._handle = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "adornedShape", {
            // Get / set adorned shape (shape of the Wall Group being reshaped)
            get: function () { return this._adornedShape; },
            set: function (value) { this._adornedShape = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "angle", {
            // Get / set current angle
            get: function () { return this._angle; },
            set: function (value) { this._angle = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "length", {
            // Get / set length of the wall being reshaped (used only with SHIFT + drag)
            get: function () { return this._length; },
            set: function (value) { this._length = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "reshapeObjectName", {
            // Get / set the name of the object being reshaped
            get: function () { return this._reshapeObjectName; },
            set: function (value) { this._reshapeObjectName = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "isBuilding", {
            // Get / set flag telling tool whether it's reshaping a new wall (isBuilding = true) or reshaping an old wall (isBuilding = false)
            get: function () { return this._isBuilding; },
            set: function (value) { this._isBuilding = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "returnData", {
            // Get set loc data for wallParts to return to if reshape is cancelled
            get: function () { return this._returnData; },
            set: function (value) { this._returnData = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "returnPoint", {
            // Get / set the point to return the reshaping wall endpoint to if reshape is cancelled
            get: function () { return this._returnPoint; },
            set: function (value) { this._returnPoint = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "isIntersecting", {
            // Get / set whether the reshaping wall is intersecting at least one other wall. if so, ignore grid snap
            get: function () { return this._isIntersecting; },
            set: function (value) { this._isIntersecting = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "wallIntersecting", {
            // Get / set the wall the reshaping endpoint is currently intersecting
            get: function () { return this._wallIntersecting; },
            set: function (value) { this._wallIntersecting = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WallReshapingTool.prototype, "joinedWalls", {
            // Get / set the wall created during after a reshape event by combining some colinear walls
            get: function () { return this._joinedWalls; },
            set: function (value) { this._joinedWalls = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * Places reshape handles on either end of a wall node.
         * @param {go.Part} part The wall to adorn
         */
        WallReshapingTool.prototype.updateAdornments = function (part) {
            if (part === null || part instanceof go.Link)
                return;
            if (part.isSelected && !this.diagram.isReadOnly) {
                var seleltgo = part.findObject(this.reshapeObjectName);
                if (seleltgo !== null && seleltgo.part !== null && seleltgo.part.data.category === 'WallGroup') {
                    var selelt = seleltgo;
                    var adornment = part.findAdornment(this.name);
                    if (adornment === null) {
                        adornment = this.makeAdornment(selelt);
                    }
                    if (adornment !== null && selelt.part !== null && selelt.geometry != null) {
                        // update the position/alignment of each handle
                        var geo = selelt.geometry;
                        var b_1 = geo.bounds;
                        var pb_1 = selelt.part.actualBounds;
                        // update the size of the adornment
                        var graphObj = adornment.findObject('BODY');
                        if (graphObj === null)
                            return;
                        graphObj.desiredSize = b_1.size;
                        adornment.elements.each(function (h) {
                            if (h.name === undefined)
                                return;
                            var x = 0;
                            var y = 0;
                            switch (h.name) {
                                case 'sPt': {
                                    x = part.data.startpoint.x - pb_1.x;
                                    y = part.data.startpoint.y - pb_1.y;
                                    break;
                                }
                                case 'ePt': {
                                    x = part.data.endpoint.x - pb_1.x;
                                    y = part.data.endpoint.y - pb_1.y;
                                    break;
                                }
                            }
                            var xCheck = Math.min((x - b_1.x) / b_1.width, 1);
                            var yCheck = Math.min((y - b_1.y) / b_1.height, 1);
                            if (xCheck < 0)
                                xCheck = 0;
                            if (yCheck < 0)
                                yCheck = 0;
                            if (xCheck > 1)
                                xCheck = 1;
                            if (yCheck > 1)
                                yCheck = 1;
                            if (isNaN(xCheck))
                                xCheck = 0;
                            if (isNaN(yCheck))
                                yCheck = 0;
                            h.alignment = new go.Spot(Math.max(0, xCheck), Math.max(0, yCheck));
                        });
                        part.addAdornment(this.name, adornment);
                        adornment.location = selelt.getDocumentPoint(go.Spot.Center);
                        return;
                    }
                }
            }
            part.removeAdornment(this.name);
        };
        /**
         * If the user has clicked down at a visible handle on a wall node, then the tool may start.
         * @return {boolean}
         */
        WallReshapingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            var diagram = this.diagram;
            if (diagram === null || diagram.isReadOnly)
                return false;
            if (!diagram.allowReshape)
                return false;
            if (!diagram.lastInput.left)
                return false;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
            return (h !== null || this.isBuilding);
        };
        /**
         * Start a new transaction for the wall reshaping.
         * Store pre-reshape location of reshaping wall's reshaping endpoint.
         * Store pre-reshape locations of all wall's members (windows / doors).
         */
        WallReshapingTool.prototype.doActivate = function () {
            var diagram = this.diagram;
            if (diagram === null)
                return;
            if (this.isBuilding) {
                // this.adornedShape has already been set in WallBuildingTool's doMouseDown function
                if (this.adornedShape !== null && this.adornedShape.part !== null) {
                    var wall = this.adornedShape.part;
                    this.handle = this.findToolHandleAt(wall.data.endpoint, this.name);
                    this.returnPoint = wall.data.startpoint;
                }
            }
            else {
                this.handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
                if (this.handle === null)
                    return;
                var adorn = this.handle.part;
                var shape = adorn.adornedObject;
                var wall = shape.part;
                if (!shape)
                    return;
                this.adornedShape = shape;
                // store pre-reshape location of wall's reshaping endpoint
                this.returnPoint = this.handle.name === 'sPt' ? wall.data.startpoint : wall.data.endpoint;
                // store pre-reshape locations of all wall's members (windows / doors)
                var wallParts = wall.memberParts;
                if (wallParts.count !== 0) {
                    var locationsMap_1 = new go.Map();
                    wallParts.iterator.each(function (wallPart) {
                        locationsMap_1.add(wallPart.data.key, wallPart.location);
                    });
                    this.returnData = locationsMap_1;
                }
            }
            // diagram.isMouseCaptured = true;
            this.startTransaction(this.name);
            this.isActive = true;
        };
        /**
         * Adjust the handle's coordinates, along with the wall's points.
         */
        WallReshapingTool.prototype.doMouseMove = function () {
            var fp = this.diagram;
            var tool = this;
            if (tool.handle === null)
                return;
            var adorn = tool.handle.part;
            var wall = adorn.adornedPart;
            // the stationaryPt
            var mousePt = fp.lastInput.documentPoint;
            if (tool.isActive && fp !== null) {
                // if user is holding shift, make sure the angle of the reshaping wall (from stationaryPt to mousePt) is a multiple of 45
                if (fp.lastInput.shift) {
                    // what's the current angle made from stationaryPt to mousePt?
                    var type = tool.handle.name;
                    var stationaryPt = (type === 'sPt') ? wall.data.endpoint : wall.data.startpoint;
                    var ang = stationaryPt.directionPoint(mousePt);
                    var length_1 = Math.sqrt(stationaryPt.distanceSquaredPoint(mousePt));
                    ang = Math.round(ang / 45) * 45;
                    var newPoint = new go.Point(stationaryPt.x + length_1, stationaryPt.y);
                    // rotate the new point ang degrees
                    var dx = stationaryPt.x;
                    var dy = stationaryPt.y;
                    newPoint = newPoint.offset(-dx, -dy); // move point to origin
                    newPoint = newPoint.rotate(ang); // rotate ang degrees around origin
                    newPoint = newPoint.offset(dx, dy); // add back offset
                    mousePt = newPoint;
                }
                // if the mousePt is close to some wall's endpoint, snap the mousePt to that endpoint
                var walls = fp.findNodesByExample({ category: 'WallGroup' });
                walls.iterator.each(function (w) {
                    if (w.data.key !== wall.data.key) {
                        var spt = w.data.startpoint;
                        var ept = w.data.endpoint;
                        // if the mousePt is inside the geometry of another wall, project the point onto that wall
                        if (fp.isPointInWall(w, mousePt)) {
                            mousePt = mousePt.projectOntoLineSegmentPoint(w.data.startpoint, w.data.endpoint);
                            tool.isIntersecting = true; // yes, the current reshaping wall is intersecting another wall
                        }
                        // if the mousePt is close to some wall's endpoint, snap the mousePt to that endpoint
                        if (Math.sqrt(spt.distanceSquaredPoint(mousePt)) < 10) {
                            mousePt = spt;
                        }
                        else if (Math.sqrt(ept.distanceSquaredPoint(mousePt)) < 10) {
                            mousePt = ept;
                        }
                    }
                });
                // if the resulting segment between stationary pt and mousePt would intersect other wall(s), project mousePt onto the first wall it would intersect
                var iw = tool.getClosestIntersectingWall(mousePt);
                // if we are or just were intersecting some wall, miter it
                if (iw === null || tool.wallIntersecting !== null) {
                    if (tool.wallIntersecting !== null && tool.wallIntersecting !== undefined && tool.wallIntersecting.data !== null) {
                        tool.performMiteringOnWall(tool.wallIntersecting);
                    }
                }
                if (iw != null) {
                    tool.isIntersecting = true; // yes, the current reshaping wall is intersecting another wall
                    tool.wallIntersecting = iw;
                    mousePt = mousePt.projectOntoLineSegmentPoint(iw.data.startpoint, iw.data.endpoint);
                    // if the mousePt is really close to an endpoint of its intersecting wall, make it that endpoint
                    var distToSpt = Math.sqrt(mousePt.distanceSquaredPoint(iw.data.startpoint));
                    var distToEpt = Math.sqrt(mousePt.distanceSquaredPoint(iw.data.endpoint));
                    if (distToSpt < 25) {
                        mousePt = iw.data.startpoint;
                    }
                    else if (distToEpt < 10) {
                        mousePt = iw.data.endpoint;
                    }
                }
                else {
                    tool.isIntersecting = false;
                    // if the wall we were previously intersecting is not touching the reshaping wall, forget it
                    if (tool.wallIntersecting !== null && tool.wallIntersecting !== undefined &&
                        tool.wallIntersecting.data !== null && fp.getWallsIntersection(wall, tool.wallIntersecting) === null) {
                        tool.wallIntersecting = null;
                    }
                }
                tool.calcAngleAndLengthFromHandle(mousePt); // sets this.angle and this.length (useful for when SHIFT is held)
                tool.reshape(mousePt);
            }
            tool.performMiteringOnWall(wall);
            fp.updateWallDimensions();
            fp.updateWallAngles();
        };
        /**
         * Get the closest wall the reshaping wall intersects with.
         * Returns null if reshaping wall does not intersect with any other wall.
         * @param {go.Point} proposedPt The proposed point for the reshaping wall's moving pt
         * @return {go.Group | null} The closest wall the reshaping wall's reshaping endpoint intersects with
         */
        WallReshapingTool.prototype.getClosestIntersectingWall = function (proposedPt) {
            var tool = this;
            if (tool.handle === null)
                return null;
            var adorn = tool.handle.part;
            var wall = adorn.adornedPart;
            var type = tool.handle.name;
            var stationaryPt = (type === 'sPt') ? wall.data.endpoint : wall.data.startpoint;
            // dummy wall is used for intersection checks, since the reshaping wall has not had its data yet set
            var dummyWallData = {
                key: 'wall', category: 'WallGroup', caption: 'Wall', type: 'Wall', startpoint: stationaryPt,
                smpt1: stationaryPt, smpt2: stationaryPt, endpoint: proposedPt, empt1: proposedPt, empt2: proposedPt,
                thickness: parseFloat(tool.diagram.model.modelData.wallThickness), isGroup: true, notes: ''
            };
            tool.diagram.model.addNodeData(dummyWallData);
            var dummyWall = tool.diagram.findPartForKey(dummyWallData.key);
            var fp = tool.diagram;
            var walls = tool.diagram.findNodesByExample({ category: 'WallGroup' });
            var closestWall = null;
            var closestDistance = Number.MAX_VALUE;
            walls.iterator.each(function (w) {
                if (w.data.key !== wall.data.key && w.data.key !== dummyWall.data.key) {
                    // check if wall and w intersect, and if so, where
                    var intersectPoint = fp.getWallsIntersection(dummyWall, w);
                    // also, don't project onto a wall the stationaryPt is already along (this would make two walls on top of each other)
                    var isStationaryPtOnW = false;
                    var ab = parseFloat(Math.sqrt(w.data.startpoint.distanceSquaredPoint(stationaryPt)).toFixed(2));
                    var bc = parseFloat(Math.sqrt(stationaryPt.distanceSquaredPoint(w.data.endpoint)).toFixed(2));
                    var ac = parseFloat(Math.sqrt(w.data.startpoint.distanceSquaredPoint(w.data.endpoint)).toFixed(2));
                    if (Math.abs((ab + bc) - ac) <= .1) {
                        isStationaryPtOnW = true;
                    }
                    if (intersectPoint !== null && !isStationaryPtOnW) {
                        // calc distance from stationaryPoint to proposed intersection point
                        var dist = Math.sqrt(stationaryPt.distanceSquaredPoint(intersectPoint));
                        if (dist < closestDistance) {
                            closestDistance = dist;
                            closestWall = w;
                        }
                    }
                }
            });
            // remove the dummy wall
            fp.remove(dummyWall);
            return closestWall;
        };
        /**
         * Returns whether or not 2 points are "close enough" to each other.
         * "Close enough" is, by default, defined as a point whose x and y values are within .05
         * document units of another point's x and y values.
         * @param {go.Point} p1
         * @param {go.Point} p2
         * @return {boolean}
         */
        WallReshapingTool.prototype.pointsApproximatelyEqual = function (p1, p2) {
            var x1 = p1.x;
            var x2 = p2.x;
            var y1 = p1.y;
            var y2 = p2.y;
            var diff1 = Math.abs(x2 - x1);
            var diff2 = Math.abs(y2 - y1);
            if (diff2 < .05 && diff1 < .05) {
                return true;
            }
            return false;
        };
        /**
         * Sets the counterclockwise mitering point for wallA / clockwise mitering point for wallB.
         * This algorithm based on https://math.stackexchange.com/questions/1849784/calculate-miter-points-of-stroked-vectors-in-cartesian-plane.
         * @param {go.Group} wa wallA
         * @param {go.Group} wb wallB
         */
        WallReshapingTool.prototype.performMitering = function (wa, wb) {
            var tool = this;
            var diagram = this.diagram;
            // wall endpoints, thicknesses, lengths
            var as = wa.data.startpoint;
            var ae = wa.data.endpoint;
            var bs = wb.data.startpoint;
            var be = wb.data.endpoint;
            var wat = wa.data.thickness;
            var wbt = wb.data.thickness;
            var wal = Math.sqrt(as.distanceSquaredPoint(ae));
            var wbl = Math.sqrt(bs.distanceSquaredPoint(be));
            // points
            var B = diagram.getWallsIntersection(wa, wb); // intersection point
            if (B === null) {
                return;
            }
            var A = (tool.pointsApproximatelyEqual(as, B)) ? ae : as; // wallA non-intersection point
            var C = (tool.pointsApproximatelyEqual(bs, B)) ? be : bs; // wallB non-intersection point
            // edge case: non-endpoint intersection
            // must know which wall is outer wall (the one who has no endpoint in the intersection)
            // and which wall is inner wall (the one with an endpoint in the intersection)
            var ow = null;
            var iw = null;
            if (!tool.pointsApproximatelyEqual(as, B) && !tool.pointsApproximatelyEqual(ae, B)) {
                ow = wa;
                iw = wb;
            }
            else if (!tool.pointsApproximatelyEqual(bs, B) && !tool.pointsApproximatelyEqual(be, B)) {
                ow = wb;
                iw = wa;
            }
            // if wall A is the inner wall, use the endpoint of wall B that counterclockwise from point A for point C
            if (ow !== null && iw !== null && wa.data.key === iw.data.key) {
                if (tool.isClockwise(A, B, ow.data.startpoint)) {
                    C = ow.data.startpoint;
                }
                else {
                    C = ow.data.endpoint;
                }
            }
            // if wall B is the inner wall, use endpoint of wall A that's clockwise from point C for point A
            if (ow !== null && iw !== null && wb.data.key === iw.data.key) {
                if (tool.isClockwise(B, C, ow.data.startpoint)) {
                    A = ow.data.startpoint;
                }
                else {
                    A = ow.data.endpoint;
                }
            }
            // angle between wallA and wallB, clockwise, in degrees
            var a1 = B.directionPoint(A);
            var a2 = B.directionPoint(C);
            var ang = Math.abs(a1 - a2 + 360) % 360;
            if (Math.abs(ang - 180) < .1) {
                return;
            }
            ang = ang * (Math.PI / 180); // radians
            // create a parallelogram with altitudes wat/2 and wbt/2, s.t. u and v are the lengths from B to reach D (counterclockwise mitering point)
            var u = Math.abs(wbt / (2 * (Math.sin(ang))));
            var v = Math.abs(wat / (2 * (Math.sin(ang))));
            // get u and v vectors
            var ab = Math.sqrt(A.distanceSquaredPoint(B));
            var bc = Math.sqrt(B.distanceSquaredPoint(C));
            var ux = ((A.x - B.x) / ab) * u;
            var uy = ((A.y - B.y) / ab) * u;
            // only for endpoint-endpoint?
            var vx = ((C.x - B.x) / bc) * v;
            var vy = ((C.y - B.y) / bc) * v;
            // these are the mitering points
            var D = new go.Point(B.x + ux + vx, B.y + uy + vy);
            var E = new go.Point(B.x - ux - vx, B.y - uy - vy);
            // miter limit TODO???
            var minLength = Math.min(wal, wbl);
            if (Math.sqrt(D.distanceSquaredPoint(B)) > minLength) {
                return;
            }
            // mitering point / other mitering point
            var mpt = tool.isClockwise(B, A, D) ? E : D;
            if (isNaN(mpt.x) || isNaN(mpt.y)) {
                return;
            }
            // now figure out which mitering point of wallA's data to modify
            // only modify a mitering point in data if B is one of wallA's endpoints
            if (tool.pointsApproximatelyEqual(as, B) || tool.pointsApproximatelyEqual(ae, B)) {
                var prop = null;
                // wall A's direction to point B is from startpoint to endpoint
                if (tool.pointsApproximatelyEqual(A, as)) {
                    // if ang2 is clockwise of ang1, update empt1
                    if (tool.isClockwise(A, B, mpt)) {
                        prop = 'empt1';
                    }
                    else {
                        prop = 'empt2';
                    }
                }
                else if (tool.pointsApproximatelyEqual(A, ae)) {
                    // wall A's direction to point B is from endpoint to startpoint
                    if (tool.isClockwise(A, B, mpt)) {
                        prop = 'smpt2';
                    }
                    else {
                        prop = 'smpt1';
                    }
                }
                if (prop !== null) {
                    diagram.model.setDataProperty(wa.data, prop, mpt);
                    diagram.updateWall(wa);
                }
            }
            // same, but for wall B
            if (tool.pointsApproximatelyEqual(bs, B) || tool.pointsApproximatelyEqual(be, B)) {
                var prop = null;
                // wall A's direction to point B is from startpoint to endpoint
                if (tool.pointsApproximatelyEqual(C, bs)) {
                    // if ang2 < ang1, update empt1
                    if (tool.isClockwise(C, B, mpt)) {
                        prop = 'empt1';
                    }
                    else {
                        prop = 'empt2';
                    }
                }
                else if (tool.pointsApproximatelyEqual(C, be)) {
                    // wall A's direction to point B is from endpoint to startpoint
                    if (tool.isClockwise(C, B, mpt)) {
                        prop = 'smpt2';
                    }
                    else {
                        prop = 'smpt1';
                    }
                }
                if (prop !== null) {
                    diagram.model.setDataProperty(wb.data, prop, mpt);
                    diagram.updateWall(wb);
                }
            }
        };
        /**
         * Returns a set of all the wall intersections in the entire floorplan.
         * Each entry is a stringified points (i.e. "0 0").
         * @return {go.Set<string>}
         */
        WallReshapingTool.prototype.getAllWallIntersectionPoints = function () {
            var tool = this;
            var diagram = tool.diagram;
            // get all walls
            var walls = diagram.findNodesByExample({ category: 'WallGroup' });
            var intersectionPoints = new go.Set(); // set of Points where walls intersect
            walls.iterator.each(function (w) {
                // for each wall, go through all other walls; if this wall intersects another wall, mark it as an intersection point
                var otherWalls = diagram.findNodesByExample({ category: 'WallGroup' });
                otherWalls.iterator.each(function (ow) {
                    if (ow.data.key === w.data.key)
                        return; // do not check for intersection with self
                    var ip = diagram.getWallsIntersection(w, ow);
                    var doAdd = true;
                    if (ip !== null) {
                        // make sure there is not already an intersection point in the set that's really close to this one
                        intersectionPoints.iterator.each(function (ips) {
                            var ip2 = go.Point.parse(ips);
                            if (tool.pointsApproximatelyEqual(ip2, ip)) {
                                doAdd = false;
                            }
                        });
                        if (doAdd) {
                            intersectionPoints.add(go.Point.stringify(ip));
                        }
                    }
                });
            });
            return intersectionPoints;
        };
        /**
         * Get all the walls with an endpoint at a given Point.
         * Returns a List of all walls involved in that intersection.
         * @param {go.Point | null} intersectionPoint
         * @param {boolean} includeDividers Whether or not to also include Room Dividers with endpoints at intersectionPoint. Default is true.
         * @return {go.List<go.Group>}
         */
        WallReshapingTool.prototype.getAllWallsAtIntersection = function (intersectionPoint, includeDividers) {
            if (includeDividers === undefined || includeDividers === null) {
                includeDividers = true;
            }
            var tool = this;
            var diagram = tool.diagram;
            var wallsInvolved = new go.List(); // list of walls, which will be sorted clockwise
            if (intersectionPoint === null) {
                return wallsInvolved;
            }
            diagram.findObjectsNear(intersectionPoint, 1, function (x) {
                if (x.part !== null) {
                    return x.part;
                }
                return null;
            }, function (p) {
                if (!(p instanceof go.Group && p.category === 'WallGroup' && (includeDividers || !p.data.isDivider) && !wallsInvolved.contains(p)))
                    return false;
                // make sure the wall's segment includes ip
                var s = p.data.startpoint;
                var e = p.data.endpoint;
                return tool.isPointOnSegment(s, e, intersectionPoint);
            }, true, wallsInvolved);
            return wallsInvolved;
        };
        /**
         * Returns whether or not 2 walls share at least one endpoint
         * @param {go.Group} wa
         * @param {go.Group} wb
         * @return {boolean}
         */
        WallReshapingTool.prototype.doWallsShareAnEndpoint = function (wa, wb) {
            var tool = this;
            var as = wa.data.startpoint;
            var ae = wa.data.endpoint;
            var bs = wb.data.startpoint;
            var be = wb.data.endpoint;
            if (tool.pointsApproximatelyEqual(as, bs) || tool.pointsApproximatelyEqual(as, be)
                || tool.pointsApproximatelyEqual(ae, bs) || tool.pointsApproximatelyEqual(ae, be)) {
                return true;
            }
            return false;
        };
        /**
         * This function, called on {@link doMouseUp} event, checks if the reshaping wall's reshaping endpoint is now intersecting a wall.
         * If so, that intersected wall is split into 2 walls at the intersection point. All walls at the intersection point are then mitered.
         * Next, it checks if the reshapingWall has become a new, big wall (via {@link joinColinearWalls}).
         * If so, we must split the new wall at any points it intersects with others.
         * Room boundary data that depended on the split wall is then updated to reflect the split.
         */
        WallReshapingTool.prototype.maybeSplitWall = function () {
            var tool = this;
            if (tool.handle === null)
                return;
            var adorn = tool.handle.part;
            var reshapingWall = adorn.adornedPart;
            var movingProp = tool.handle.name;
            var movingPt = movingProp === 'sPt' ? reshapingWall.data.startpoint : reshapingWall.data.endpoint;
            var jw = tool.joinedWalls;
            var wallsAtEndpoint = tool.getAllWallsAtIntersection(movingPt);
            // exclude the reshapingWall from wallsAtEndpoint
            wallsAtEndpoint.remove(reshapingWall);
            jw.iterator.each(function (ww) {
                wallsAtEndpoint.remove(ww);
            });
            if (wallsAtEndpoint.count === 1) {
                var wallToSplit = wallsAtEndpoint.first();
                if (wallToSplit !== null) {
                    // make sure this is not an endpoint to endpoint connection
                    if (!tool.doWallsShareAnEndpoint(reshapingWall, wallToSplit)) {
                        tool.maybePerformWallSplit(wallToSplit, movingPt);
                    }
                }
            }
            // if we're building a wall, it's possible we need to split at the stationary pt too
            if (tool.isBuilding) {
                var stationaryPt = movingPt === reshapingWall.data.startpoint ? reshapingWall.data.endpoint : reshapingWall.data.startpoint;
                var wallsAtStationaryPt = tool.getAllWallsAtIntersection(stationaryPt);
                wallsAtStationaryPt.remove(reshapingWall);
                jw.iterator.each(function (ww) {
                    wallsAtEndpoint.remove(ww);
                });
                if (wallsAtStationaryPt.count === 1) {
                    var wallToSplit = wallsAtStationaryPt.first();
                    if (wallToSplit !== null) {
                        // make sure this is not an endpoint to endpoint connection
                        if (!tool.doWallsShareAnEndpoint(reshapingWall, wallToSplit)) {
                            tool.maybePerformWallSplit(wallToSplit, stationaryPt);
                        }
                    }
                }
            }
            // if this reshape event has created a big joined wall, the joined wall may need to be split
            // find out if either endpoint of the original reshaping wall is NOT one of the endpoints of joinedWall
            // if so, split the joinedWall at that endpoint
            if (jw !== null) {
                jw.iterator.each(function (ww) {
                    // find all points along the joined wall where it intersects with other walls and split along them
                    tool.splitNewWall(ww);
                });
            }
        };
        /**
         * Finds all points along a new wall (created via {@link joinColinearWalls}) and splits / miters at each.
         * @param w The newly joined wall
         */
        WallReshapingTool.prototype.splitNewWall = function (w) {
            var tool = this;
            var fp = this.diagram;
            // find all walls that intersect this wall
            var walls = fp.findNodesByExample({ category: 'WallGroup' });
            var ips = new go.Set();
            walls.iterator.each(function (ww) {
                var ip = fp.getWallsIntersection(w, ww);
                if (ip !== null) {
                    ips.add(ip);
                }
            });
            ips.iterator.each(function (ip) {
                var wi = tool.getAllWallsAtIntersection(ip);
                wi.iterator.each(function (ww) {
                    var s = ww.data.startpoint;
                    var e = ww.data.endpoint;
                    if (!tool.pointsApproximatelyEqual(s, ip) && !tool.pointsApproximatelyEqual(e, ip)) {
                        tool.maybePerformWallSplit(ww, ip);
                    }
                });
            });
        };
        /**
         * Split a given wall into 2 at a given intersection point, if the given point is on the wall and not on one of the wall's endpoints.
         * The resultant two walls are then mitered.
         * Room boundary data that depended on the split wall is then updated to reflect the split.
         * @param {go.Group} w wall to split
         * @param {go.Point} ip intersection point where the split should occur
         */
        WallReshapingTool.prototype.maybePerformWallSplit = function (w, ip) {
            var tool = this;
            var fp = tool.diagram;
            var s = w.data.startpoint;
            var e = w.data.endpoint;
            var type = w.data.isDivider ? 'Divider' : 'Wall';
            // this wall has neither endpoint in the intersection -- it must be split into 2 walls
            var data1 = {
                key: 'wall', category: 'WallGroup', caption: type, type: type, color: w.data.color,
                startpoint: s, endpoint: ip, smpt1: s, smpt2: s, empt1: ip, empt2: ip,
                thickness: w.data.thickness, isGroup: true, notes: '',
                isDivider: w.data.isDivider
            };
            var data2 = {
                key: 'wall', category: 'WallGroup', caption: type, type: type, color: w.data.color,
                startpoint: ip, endpoint: e, smpt1: ip, smpt2: ip, empt1: e, empt2: e,
                thickness: w.data.thickness, isGroup: true, notes: '',
                isDivider: w.data.isDivider
            };
            // only actually split the wall if the 2 new walls would both have at least length 1
            // and if there are no walls with endpoints very close to these proposed ones
            var l1 = Math.sqrt(data1.startpoint.distanceSquaredPoint(data1.endpoint));
            var l2 = Math.sqrt(data2.startpoint.distanceSquaredPoint(data2.endpoint));
            var walls = fp.findNodesByExample({ category: 'WallGroup' });
            var alreadyExists = false;
            walls.iterator.each(function (wc) {
                var ws = wc.data.startpoint;
                var we = wc.data.endpoint;
                if ((tool.pointsApproximatelyEqual(s, ws) && tool.pointsApproximatelyEqual(ip, we)) ||
                    (tool.pointsApproximatelyEqual(s, we) && tool.pointsApproximatelyEqual(ip, ws))) {
                    alreadyExists = true;
                }
                if ((tool.pointsApproximatelyEqual(ip, ws) && tool.pointsApproximatelyEqual(e, we)) ||
                    (tool.pointsApproximatelyEqual(ip, we) && tool.pointsApproximatelyEqual(e, ws))) {
                    alreadyExists = true;
                }
            });
            if (l1 > 1 && l2 > 1 && !alreadyExists) {
                fp.model.addNodeData(data1);
                fp.model.addNodeData(data2);
                var w1_1 = fp.findNodeForData(data1);
                var w2_1 = fp.findNodeForData(data2);
                // Before removing the original wall from the Floorplan, update relevant room boundarywalls data
                // iff this method is being called as a result of a user-prompted wall reshape action
                // needed so proper mitering side of replacement entry walls can be determined
                tool.premiterWall(w1_1);
                tool.premiterWall(w2_1);
                tool.performMiteringAtPoint(ip, false);
                if (tool.handle !== null) {
                    var rooms = fp.findNodesByExample({ category: 'RoomNode' });
                    var adorn = tool.handle.part;
                    var rw_1 = adorn.adornedPart; // reshaping wall
                    // go through rooms, find any whose boundary walls contain w (the wall that was split, soon to be removed)
                    rooms.iterator.each(function (r) {
                        var bw = r.data.boundaryWalls;
                        var _loop_1 = function (i) {
                            var entry = bw[i];
                            var wk = entry[0];
                            if (wk === w.data.key) {
                                // then, find out if the reshaping wall, at the non-ip endpoint, is connected to another wall in that room's boundary walls
                                var isConnectedToBounds_1 = false;
                                var nonIpEndpoint = (tool.pointsApproximatelyEqual(rw_1.data.startpoint, ip)) ? rw_1.data.endpoint : rw_1.data.startpoint;
                                var iw = tool.getAllWallsAtIntersection(nonIpEndpoint);
                                iw.iterator.each(function (ww) {
                                    // if boundary walls contains ww and ww is not the reshaping wall, reshaping wall is connected to room boundary walls at non ip endpoint
                                    for (var j = 0; j < bw.length; j++) {
                                        var ee = bw[j];
                                        var wk2 = ee[0];
                                        if (ww.data.key === wk2 && ww.data.key !== rw_1.data.key) {
                                            isConnectedToBounds_1 = true;
                                        }
                                    }
                                });
                                // if yes, replace the w entry in boundary walls with just one new entry, using the split wall that is connected to some other wall in bounds
                                if (isConnectedToBounds_1) {
                                    // find out whether w1 or w2 is connected to another wall in boundary walls
                                    var isW1ConnectedToBounds_1 = false;
                                    var w1NonIpEndpoint_1 = (tool.pointsApproximatelyEqual(w1_1.data.startpoint, ip)) ? w1_1.data.endpoint : w1_1.data.startpoint;
                                    var iw2 = tool.getAllWallsAtIntersection(w1NonIpEndpoint_1);
                                    iw2.remove(w); // do not include the wall soon to be destroyed
                                    // go through all walls at w1's non-ip endpoint and find out if one of those is in r's boundary walls
                                    iw2.iterator.each(function (ww) {
                                        var _loop_2 = function (j) {
                                            var entry2 = bw[j];
                                            var wk2 = entry2[0];
                                            if (ww.data.key === wk2 && w1_1.data.key !== ww.data.key) {
                                                // additional followup -- make sure ww2 is still connected to r's boundary walls at other endpoint (not connected to w1NonIpEndpoint)
                                                var ww2_1 = fp.findNodeForKey(wk2);
                                                var ww2OtherEndpoint = (tool.pointsApproximatelyEqual(ww2_1.data.startpoint, w1NonIpEndpoint_1)) ? ww2_1.data.endpoint : ww2_1.data.startpoint;
                                                var iw3 = tool.getAllWallsAtIntersection(ww2OtherEndpoint);
                                                iw3.iterator.each(function (ww3) {
                                                    for (var k = 0; k < bw.length; k++) {
                                                        var entry3 = bw[k];
                                                        var wk3 = entry3[0];
                                                        if (wk3 === ww3.data.key && wk3 !== ww2_1.data.key) {
                                                            isW1ConnectedToBounds_1 = true;
                                                        }
                                                    }
                                                });
                                            }
                                        };
                                        for (var j = 0; j < bw.length; j++) {
                                            _loop_2(j);
                                        }
                                    });
                                    // replace this entry of r's boundary walls with the replacementWall
                                    var replacementWall = (isW1ConnectedToBounds_1) ? w1_1 : w2_1;
                                    var replacementEntry = tool.getUpdatedEntry(entry, replacementWall);
                                    fp.startTransaction();
                                    var newBounds = bw.slice();
                                    newBounds[i] = replacementEntry;
                                    fp.model.setDataProperty(r.data, 'boundaryWalls', newBounds);
                                    fp.commitTransaction();
                                }
                                else {
                                    // if no, replace the w entry with both split walls. Order those 2 entries CC, relative to reshaping wall
                                    // get a List of walls involved (reshaping wall, w1, and w2)
                                    var wi = new go.List();
                                    wi.add(rw_1);
                                    wi.add(w1_1);
                                    wi.add(w2_1);
                                    wi = fp.sortWallsClockwiseWithSetStartWall(wi, rw_1);
                                    // get replacement entries for the entry with w
                                    var replacementEntry2 = tool.getUpdatedEntry(entry, wi.toArray()[1]);
                                    var replacementEntry1 = tool.getUpdatedEntry(entry, wi.toArray()[2]);
                                    // insert these replacement entries into the bw at index i, remove
                                    fp.startTransaction();
                                    var newBounds = bw.slice();
                                    newBounds.splice(i, 1, replacementEntry1);
                                    newBounds.splice(i + 1, 0, replacementEntry2);
                                    fp.model.setDataProperty(r.data, 'boundaryWalls', newBounds);
                                    fp.commitTransaction();
                                }
                            }
                        };
                        for (var i = 0; i < bw.length; i++) {
                            _loop_1(i);
                        }
                    }); // end rooms iteration
                }
                // Maintain wall parts that were on the big wall -- give them new locations on the most appropriate of the split walls, if possible
                var wallParts = fp.findNodesByExample({ group: w.data.key });
                var wallsSet = new go.Set();
                wallsSet.add(w1_1);
                wallsSet.add(w2_1);
                tool.maintainWallParts(wallParts, wallsSet);
                // remove original wall
                fp.remove(w);
                // perform mitering
                tool.premiterWall(w1_1);
                tool.premiterWall(w2_1);
                var w1op = tool.pointsApproximatelyEqual(w1_1.data.startpoint, ip) ? w1_1.data.endpoint : w1_1.data.startpoint;
                var w2op = tool.pointsApproximatelyEqual(w2_1.data.startpoint, ip) ? w2_1.data.endpoint : w2_1.data.startpoint;
                tool.performMiteringAtPoint(ip, false);
                tool.performMiteringAtPoint(w1op, false);
                tool.performMiteringAtPoint(w2op, false);
            }
        };
        /**
         * Go through all walls -- if a wall crosses another at a non-endpoint-to-endpoint connection, split that wall in 2
         * such that only endpoint to endpoint connections exist (this makes mitering much easier).
         * NOTE: Since this goes through all walls in the Floorplan, performance can get bad quickly. Use this method sparingly, if at all
         */
        WallReshapingTool.prototype.splitAllWalls = function () {
            var tool = this;
            var intersectionPoints = tool.getAllWallIntersectionPoints();
            intersectionPoints.iterator.each(function (ips) {
                var ip = go.Point.parse(ips);
                var wallsInvolved = tool.getAllWallsAtIntersection(ip);
                // find all walls involved that do not have their start or endpoint at the intersection point
                wallsInvolved.iterator.each(function (w) {
                    var s = w.data.startpoint;
                    var e = w.data.endpoint;
                    if (!tool.pointsApproximatelyEqual(s, ip) && !tool.pointsApproximatelyEqual(e, ip)) {
                        tool.maybePerformWallSplit(w, ip);
                    }
                });
            });
        };
        /**
         * Return whether or not wall A is parallel to wall B.
         * @param {go.Group} wa Wall A
         * @param {go.Group} wb Wall B
         * @return {boolean}
         */
        WallReshapingTool.prototype.areWallsParallel = function (wa, wb) {
            var tool = this;
            var fp = this.diagram;
            var as = wa.data.startpoint;
            var ae = wa.data.endpoint;
            var bs = wb.data.startpoint;
            var be = wb.data.endpoint;
            var isParallel = false;
            var a1 = +as.directionPoint(ae);
            var a2 = +bs.directionPoint(be);
            if (Math.abs(a1 - a2) < 1 || (Math.abs(a1 - a2) > 179 && Math.abs(a1 - a2) < 181)) {
                isParallel = true;
            }
            return isParallel;
        };
        /**
         * Returns whether wall B is colinear to wall A.
         * Wall A is colinear with Wall B if it:
         *  0) Is the same wall type as Wall B (wall | divider)
         *  1) Is parallel with Wall B
         *  2) Shares an endpoint, 'p', with Wall B, and
         *    2a) Any / all walls with endpoints at p are all parallel to wall A / B
         * @param {go.Group} wa wall A
         * @param {go.Group} wb wall B
         * @return {boolean}
         */
        WallReshapingTool.prototype.isWallColinear = function (wa, wb) {
            var tool = this;
            var fp = this.diagram;
            if (wa.data.isDivider !== wb.data.isDivider) {
                return false;
            }
            var as = wa.data.startpoint;
            var ae = wa.data.endpoint;
            var bs = wb.data.startpoint;
            var be = wb.data.endpoint;
            var isColinear = false;
            // 1) Is wall A parallel with Wall B? (or close enough to parallel)
            if (tool.areWallsParallel(wa, wb)) {
                // get the endpoint shared by wa and wb, if it exists
                var sharedEndpoint = null;
                if (tool.pointsApproximatelyEqual(as, bs) || tool.pointsApproximatelyEqual(as, be)) {
                    sharedEndpoint = as;
                }
                else if (tool.pointsApproximatelyEqual(ae, bs) || tool.pointsApproximatelyEqual(ae, be)) {
                    sharedEndpoint = ae;
                }
                if (sharedEndpoint !== null) {
                    // Make sure all walls with an endpoint at sharedEndpoint are parallel to wa
                    var wi = tool.getAllWallsAtIntersection(sharedEndpoint);
                    var endpointHasNonColinearWall_1 = false;
                    wi.iterator.each(function (w) {
                        if (!tool.areWallsParallel(w, wa)) {
                            endpointHasNonColinearWall_1 = true;
                        }
                    });
                    if (!endpointHasNonColinearWall_1) {
                        isColinear = true;
                    }
                }
            }
            return isColinear;
        };
        /**
         * Get all walls colinear to wall w and store them in a given Set.
         * @param {go.Group} w
         * @param {go.Set<go.Group>} set Optional
         * @return {go.Set<go.Group>}
         */
        WallReshapingTool.prototype.findAllColinearWalls = function (w, set) {
            if (set === null || set === undefined) {
                set = new go.Set();
            }
            // make sure Set contains w
            set.add(w);
            var tool = this;
            var diagram = tool.diagram;
            var walls = diagram.findNodesByExample({ category: 'WallGroup' });
            walls.iterator.each(function (ow) {
                if (tool.isWallColinear(w, ow) && set !== undefined && !set.contains(ow)) {
                    set.add(ow);
                    tool.findAllColinearWalls(ow, set);
                }
            });
            return set;
        };
        /**
         * This function, called after each {@link doMouseUp} event, checks for colinear pairs of walls at two places.
         * First, it checks for colinear walls with the reshaping wall.
         * Second, it checks for colinear walls at {@link returnPoint}.
         * If there are colinear walls found, they are joined into one big wall. Resultant wall(s) are then mitered.
         * Additionally, any rooms whose geometries depended on one of the walls that was just joined have their data updated,
         * replacing the old (removed) wall(s) in data with the new one.
         * Note: These rooms will have the final update to their geometry / data done later, in updateRoomBoundaries().
         * The data manipulation done here is just to ensure the walls removed by this function are not referenced anywhere in room data anymore.
         */
        WallReshapingTool.prototype.joinColinearWalls = function () {
            var tool = this;
            if (tool.handle === null)
                return;
            // 1) Check if the reshaping wall is colinear with another wall at one of its endpoints
            var adorn = tool.handle.part;
            var reshapingWall = adorn.adornedPart;
            var cw1 = tool.findAllColinearWalls(reshapingWall);
            var jw = tool.performColinearWallJoining(cw1, reshapingWall);
            if (jw !== null) {
                tool.joinedWalls.add(jw);
            }
            // 2) Check if there are 2 colinear walls at returnPoint (where the reshaping endpoint originally was)
            var wallsAtReturnPoint = tool.getAllWallsAtIntersection(tool.returnPoint);
            if (wallsAtReturnPoint.count === 2) {
                var wallsArr = wallsAtReturnPoint.toArray();
                var w1 = wallsArr[0];
                var w2 = wallsArr[1];
                if (tool.isWallColinear(w1, w2)) {
                    var cw2 = new go.Set();
                    cw2.add(w1);
                    cw2.add(w2);
                    var jw2 = tool.performColinearWallJoining(cw2, w1);
                    if (jw2 !== null) {
                        tool.joinedWalls.add(jw2);
                    }
                }
            }
        };
        /**
         * Join a set of colinear walls into one big wall. The big wall is then mitered.
         * Constituent walls in colinear wall set are removed.
         * As such, if any rooms depend on them for boundary data, those room's data is updated
         * @param {go.Set<go.Group>} colinearWalls The set of colinear walls
         * @param {go.Group} w The wall to use as reference for color / thickness when joining the walls.
         * If this is not supplied, the first wall in the colinearWalls set is used
         * @return {go.Group | null} The new, big wall created by joining colinear walls
         */
        WallReshapingTool.prototype.performColinearWallJoining = function (colinearWalls, w) {
            var tool = this;
            var fp = tool.diagram;
            var garbage = new go.Set();
            // all colinear "walls" must be Walls OR they must all be Room Dividers, they may not be a mix
            var cwf = colinearWalls.first();
            if (cwf === null) {
                return null;
            }
            if (w === undefined) {
                w = cwf;
            }
            var acceptedCategory = cwf.data.category;
            colinearWalls.iterator.each(function (cw) {
                if (cw.data.category !== acceptedCategory) {
                    return;
                }
            });
            // Find the 2 farthest endpoints in colinear walls set
            if (colinearWalls.count > 1) {
                var pt1_1 = null;
                var pt2_1 = null;
                var farthestDist_1 = 0;
                var cw2_1 = colinearWalls.copy();
                // remember all the wall parts (doors / windows) that the colinear walls have
                var wallParts_1 = new go.Set();
                // iterate over colinear walls, finding the furthest distance between all endpoints
                colinearWalls.iterator.each(function (cw1) {
                    // get all wallParts that belong to cw1 and add them to wallParts Set
                    var cwParts = fp.findNodesByExample({ group: cw1.data.key });
                    wallParts_1.addAll(cwParts);
                    cw2_1.iterator.each(function (cw2w) {
                        var s1 = cw1.data.startpoint;
                        var e1 = cw1.data.endpoint;
                        var s2 = cw2w.data.startpoint;
                        var e2 = cw2w.data.endpoint;
                        var pts1 = [s1, e1];
                        var pts2 = [s2, e2];
                        for (var i = 0; i < pts1.length; i++) {
                            var p1 = pts1[i];
                            for (var j = 0; j < pts2.length; j++) {
                                var p2 = pts2[j];
                                var dist = Math.sqrt(p1.distanceSquaredPoint(p2));
                                if (dist > farthestDist_1) {
                                    farthestDist_1 = dist;
                                    pt1_1 = p1;
                                    pt2_1 = p2;
                                }
                            }
                        }
                    });
                    // all colinear walls will be destroyed later (after replaced by one big wall)
                    garbage.add(cw1);
                }); // end colinearWalls iteration
                // we should now have the farthest points the colinear walls make -- just add a single wall with those endpoints
                var data = {
                    key: 'wall', category: 'WallGroup', caption: 'Wall', type: 'Wall', color: w.data.color,
                    startpoint: pt1_1, endpoint: pt2_1, smpt1: pt1_1, smpt2: pt1_1, empt1: pt2_1, empt2: pt2_1,
                    thickness: w.data.thickness, isGroup: true, notes: ''
                };
                fp.model.addNodeData(data);
                var newWall_1 = fp.findNodeForData(data);
                // Before the constituent walls are removed from Floorplan, update relevant room boundaryWalls
                // find all rooms that have any of the colinear walls in this roomBoundaryWalls or holes
                // replace those entries with constituent walls with the new wall key
                // make sure the mitering side is analogous to what it was with the consituent wall too
                var rooms = fp.findNodesByExample({ category: 'RoomNode' });
                rooms.iterator.each(function (r) {
                    var bw = r.data.boundaryWalls;
                    // replace entries in boundaryWalls with references to soon-to-be nonexistent walls
                    for (var i = 0; i < bw.length; i++) {
                        var e = bw[i];
                        var wk = e[0];
                        var ww = fp.findNodeForKey(wk);
                        if (colinearWalls.contains(ww)) {
                            // ???
                            tool.performMiteringOnWall(newWall_1);
                            var newEntry = tool.getUpdatedEntry(e, newWall_1);
                            // replace the old entry with the new one
                            fp.startTransaction();
                            var newBounds = bw.slice();
                            newBounds[i] = newEntry;
                            fp.model.setDataProperty(r.data, 'boundaryWalls', newBounds);
                            fp.commitTransaction();
                        }
                    } // end boundary walls outdated entry replacement
                }); // end rooms iteration
                // Maintain relative position of all wall parts
                var newWallSet = new go.Set();
                newWallSet.add(newWall_1);
                tool.performMiteringOnWall(newWall_1);
                tool.maintainWallParts(wallParts_1, newWallSet);
                // remove the constituent walls from Floorplan
                garbage.iterator.each(function (ww) {
                    fp.remove(ww);
                });
                // perform mitering on the new, big wall
                tool.performMiteringOnWall(newWall_1);
                return newWall_1;
            }
            return null;
        };
        /**
         * Given a set of wall parts (doors, windows) and a set of walls, place the wall parts on the proper wall based on its location, if possible.
         * @param {go.Iterable<go.Node>} wallParts
         * @param {go.Iterable<go.Group>} walls
         */
        WallReshapingTool.prototype.maintainWallParts = function (wallParts, walls) {
            var tool = this;
            var fp = tool.diagram;
            var garbage = [];
            wallParts.iterator.each(function (wp) {
                var loc = wp.location;
                // find the wall that has this loc in its geometry's boundaries
                walls.iterator.each(function (w) {
                    if (fp.isPointInWall(w, loc)) {
                        var newLoc = fp.findClosestLocOnWall(w, wp);
                        // if the wall part can fit on this wall, add it to the wall
                        if (newLoc !== null) {
                            fp.model.setDataProperty(wp.data, 'group', w.data.key);
                            wp.location = newLoc.projectOntoLineSegmentPoint(w.data.startpoint, w.data.endpoint);
                            // wp.angle = w.data.startpoint.directionPoint(w.data.endpoint);
                            if (wp.category === 'WindowNode') {
                                fp.model.setDataProperty(wp.data, 'height', w.data.thickness);
                            }
                            if (wp.category === 'DoorNode') {
                                fp.model.setDataProperty(wp.data, 'doorOpeningHeight', w.data.thickness);
                            }
                        }
                        else {
                            // otherwise, remove it from the diagram
                            garbage.push(wp);
                        }
                    }
                });
            });
            for (var i = 0; i < garbage.length; i++) {
                fp.remove(garbage[i]);
            }
        };
        /**
         * Get a replacement entry in a room's boundaryWalls or hole path for an old entry that used one of the walls
         * that was just joined together (since that wall won't exist anymore in just a moment).
         * This will replace the old entry's wall key (Array element 0) with newWall.key.
         * It will also make sure the mitering side of the replacement entry is analogous to the mitering side of the old entry.
         * @param {Array<any>} oldEntry the old entry to replace
         * @param {go.Group} nw new wall
         * @return {Array<any>} The updated entry with the new wall and analogous mitering side
         */
        WallReshapingTool.prototype.getUpdatedEntry = function (oldEntry, nw) {
            var tool = this;
            var fp = tool.diagram;
            var oldWallKey = oldEntry[0];
            var oldWall = fp.findNodeForKey(oldWallKey);
            var oldMiteringSide = oldEntry[1];
            var newEntry = [nw.data.key, null];
            // Get the mitering side of newWall that is analogous to the mitering side of oldWall
            // see if the distance between the midpoint between newWall.smpt1 and newWall.empt1 is closer to oldWall's oldMiteringSide
            // if so, use 1 as new mitering side. Else use 2
            var oms = oldWall.data['smpt' + oldMiteringSide];
            var ome = oldWall.data['empt' + oldMiteringSide];
            /**
             * Get the point on a line at a given x value
             * @param {go.Point} a line point 1
             * @param {go.Point} b line point 2
             * @param {number} x x coordinate
             * @return {go.Point}
             */
            function pointAtX(a, b, x) {
                var slope = (b.y - a.y) / (b.x - a.x);
                var y = a.y + (x - a.x) * slope;
                return new go.Point(x, y);
            }
            // Get the point on the line implied by oms and ome at nw.smpt1 and nw.smpt2
            var pt1 = pointAtX(oms, ome, nw.data.smpt1.x);
            var pt2 = pointAtX(oms, ome, nw.data.smpt2.x);
            var dist1 = nw.data.smpt1.distanceSquaredPoint(pt1);
            var dist2 = nw.data.smpt2.distanceSquaredPoint(pt2);
            if (dist1 < dist2) {
                newEntry[1] = 1;
            }
            else {
                newEntry[1] = 2;
            }
            return newEntry;
        };
        /**
         * Join all sets of colinear walls in the Floorplan.
         * Note: This can get expensive quickly, as it goes over every single wall in the Floorplan. Use this method sparingly, if at all.
         * It may be better to call {@link joinColinearWalls}
         */
        WallReshapingTool.prototype.joinAllColinearWalls = function () {
            var tool = this;
            var diagram = tool.diagram;
            var walls = diagram.findNodesByExample({ category: 'WallGroup' });
            // const garbage: go.Set<go.Group> = new go.Set<go.Group>();
            var handledWalls = new go.Set();
            // iterate over all walls
            walls.iterator.each(function (w) {
                if (!handledWalls.contains(w)) {
                    handledWalls.add(w);
                    // find all walls connected to an endpoint of this wall w that are also parallel
                    var colinearWalls = new go.Set();
                    colinearWalls.add(w);
                    tool.findAllColinearWalls(w, colinearWalls);
                    handledWalls.addAll(colinearWalls);
                    tool.performColinearWallJoining(colinearWalls, w);
                } // end handledWalls check
            }); // end walls iteration
            tool.premiterAllWalls();
        };
        /**
         * Get a point a given distance away from a given point at a given angle
         * @param {go.Point} point
         * @param {number} angle
         * @param {number} offset
         * @return {go.Point}
         */
        WallReshapingTool.prototype.translateAndRotatePoint = function (point, angle, offset) {
            var oldPoint = point.copy();
            var newPoint = point.copy();
            newPoint.offset(0, offset);
            newPoint.offset(-oldPoint.x, -oldPoint.y).rotate(angle).offset(oldPoint.x, oldPoint.y);
            return newPoint;
        };
        /**
         * Set a wall's mitering points in data to points thickness/2 distance from start/endpoint at perpindicular angle
         * Then, update the wall to reflect this new geometry
         * @param {go.Group} w
         * @param {string} prop Optional: 'smpt1' | 'smpt2' | 'empt1' | 'empt2'. If this is provided, only premiter that point of the wall
         */
        WallReshapingTool.prototype.premiterWall = function (w, prop) {
            var tool = this;
            var diagram = tool.diagram;
            var ang = w.data.startpoint.directionPoint(w.data.endpoint);
            var t = w.data.thickness;
            var sp = w.data.startpoint;
            var ep = w.data.endpoint;
            switch (prop) {
                case 'smpt1': {
                    var smp1 = tool.translateAndRotatePoint(sp, ang, t / 2);
                    diagram.model.setDataProperty(w.data, 'smpt1', smp1);
                    break;
                }
                case 'smpt2': {
                    var smp2 = tool.translateAndRotatePoint(sp, ang + 180, t / 2);
                    diagram.model.setDataProperty(w.data, 'smpt2', smp2);
                    break;
                }
                case 'empt1': {
                    var emp1 = tool.translateAndRotatePoint(ep, ang, t / 2);
                    diagram.model.setDataProperty(w.data, 'empt1', emp1);
                    break;
                }
                case 'empt2': {
                    var emp2 = tool.translateAndRotatePoint(ep, ang + 180, t / 2);
                    diagram.model.setDataProperty(w.data, 'empt2', emp2);
                    break;
                }
                default: {
                    // Perpindicular mitering points (updated later during mitering function)
                    // end miterpoint point 1 is the point "below" endpoint (add vector)
                    var emp1 = tool.translateAndRotatePoint(ep, ang, t / 2);
                    diagram.model.setDataProperty(w.data, 'empt1', emp1);
                    // end mitering point 2 is the point "above" endpoint (subtract vector)
                    var emp2 = tool.translateAndRotatePoint(ep, ang + 180, t / 2);
                    diagram.model.setDataProperty(w.data, 'empt2', emp2);
                    // start mitering point 1 is the point "below" startpoint (add vector)
                    var smp1 = tool.translateAndRotatePoint(sp, ang, t / 2);
                    diagram.model.setDataProperty(w.data, 'smpt1', smp1);
                    // end mitering point 2 is the point "above" endpoint (subtract vector)
                    var smp2 = tool.translateAndRotatePoint(sp, ang + 180, t / 2);
                    diagram.model.setDataProperty(w.data, 'smpt2', smp2);
                    break;
                }
            }
            diagram.updateWall(w);
        };
        /**
         * Goes through all walls and sets their mitering points in data to points
         * thickness/2 distance from start/endpoint at perpindicular angle
         * Note: Since this method goes through all walls in the Floorplan, it can get expensive quickly. Use this method sparingly, if at all.
         */
        WallReshapingTool.prototype.premiterAllWalls = function () {
            var tool = this;
            var diagram = tool.diagram;
            var walls = diagram.findNodesByExample({ category: 'WallGroup' });
            walls.iterator.each(function (w) {
                tool.premiterWall(w);
            });
        };
        /**
         * Perform corner mitering at both endpoints of a given wall
         * @param {go.Group} w The wall to perform corner mitering on
         */
        WallReshapingTool.prototype.performMiteringOnWall = function (w) {
            var tool = this;
            var sp = w.data.startpoint;
            var ep = w.data.endpoint;
            tool.premiterWall(w);
            tool.performMiteringAtPoint(sp, true);
            tool.performMiteringAtPoint(ep, true);
        };
        /**
         * Perform corner mitering on all walls that interesct at a given point.
         * This is a more granular, cheaper operation than the larger scale {@link performAllMitering} function.
         * @param {go.Point} pt The point to perform mitering at
         * @param {boolea} performPremitering Whether or not to perform pre-miterign before this op. If true, premitering will only be done at the endpoint of walls equal to pt
         */
        WallReshapingTool.prototype.performMiteringAtPoint = function (pt, performPremitering) {
            if (performPremitering === null || performPremitering === undefined) {
                performPremitering = true;
            }
            var tool = this;
            var fp = tool.diagram;
            // walls involved at intersection point
            var wi = tool.getAllWallsAtIntersection(pt, false);
            // premiter each wall in wi, maybe
            if (performPremitering) {
                wi.iterator.each(function (w) {
                    // only perform premiter on w if one of w's endpoints is ot
                    if (tool.pointsApproximatelyEqual(w.data.startpoint, pt) || tool.pointsApproximatelyEqual(w.data.endpoint, pt)) {
                        // which of w's endpoints is pt?
                        var prop = (tool.pointsApproximatelyEqual(w.data.startpoint, pt)) ? 's' : 'e';
                        tool.premiterWall(w, prop + 'mpt1');
                        tool.premiterWall(w, prop + 'mpt2');
                    }
                });
            }
            // sort all involved walls in any COUNTERCLOCWISE order
            wi.sort(function (a, b) {
                var B = fp.getWallsIntersection(a, b);
                if (B === null)
                    return 0;
                var as = a.data.startpoint;
                var ae = a.data.endpoint;
                var bs = b.data.startpoint;
                var be = b.data.endpoint;
                var A = tool.pointsApproximatelyEqual(pt, as) ? ae : as;
                var C = tool.pointsApproximatelyEqual(pt, bs) ? be : bs;
                var angA = B.directionPoint(A);
                var angB = B.directionPoint(C);
                if (angA > angB)
                    return 1;
                else if (angA < angB)
                    return -1;
                else
                    return 0;
            });
            wi.reverse();
            var wiArr = wi.toArray();
            for (var i = 0; i < wiArr.length; i++) {
                var wa = wiArr[i];
                var wb = null;
                if (i + 1 === wiArr.length) {
                    wb = wiArr[0];
                }
                else {
                    wb = wiArr[i + 1];
                }
                // only miter these 2 walls if they are both walls or if they are both room dividers. no mixing
                // if (wa.data.isDivider === wb.data.isDivider) {
                tool.performMitering(wa, wb);
                // }
            }
        };
        /**
         * Performs all mitering for all walls in Floorplan.
         * Note: Since this method goes through all walls in the Floorplan, it can get expensive quickly. Use this method sparingly, if at all.
         */
        WallReshapingTool.prototype.performAllMitering = function () {
            var tool = this;
            var diagram = tool.diagram;
            tool.premiterAllWalls();
            var intersectionPoints = tool.getAllWallIntersectionPoints();
            // iterate over all points where walls intersect
            intersectionPoints.iterator.each(function (ips) {
                var ip = go.Point.parse(ips);
                // get all walls involved in intersection
                var wallsInvolved = tool.getAllWallsAtIntersection(ip);
                // sort all involved walls in any COUNTERCLOCWISE order
                wallsInvolved.sort(function (a, b) {
                    var B = diagram.getWallsIntersection(a, b);
                    if (B === null)
                        return 0;
                    var as = a.data.startpoint;
                    var ae = a.data.endpoint;
                    var bs = b.data.startpoint;
                    var be = b.data.endpoint;
                    var A = tool.pointsApproximatelyEqual(ip, as) ? ae : as;
                    var C = tool.pointsApproximatelyEqual(ip, bs) ? be : bs;
                    var angA = B.directionPoint(A);
                    var angB = B.directionPoint(C);
                    if (angA > angB)
                        return 1;
                    else if (angA < angB)
                        return -1;
                    else
                        return 0;
                });
                wallsInvolved.reverse();
                // iterate over wallsInvolved, performing cc mitering on each pair
                var wi = wallsInvolved.toArray();
                for (var i = 0; i < wi.length; i++) {
                    var wa = wi[i];
                    var wb = null;
                    if (i + 1 === wi.length) {
                        wb = wi[0];
                    }
                    else {
                        wb = wi[i + 1];
                    }
                    // only miter these 2 walls if they are both walls or if they are both room dividers. no mixing
                    // if (wa.data.isDivider === wb.data.isDivider) {
                    tool.performMitering(wa, wb);
                    // }
                }
            }); // end iterate over intersection points
        }; // end performAllMitering
        /**
         * Checks whether segment AB is clockwise of segment BC.
         * B must be the intersection point.
         * @param {go.Point} a
         * @param {go.Point} b
         * @param {go.Point} c
         * @return {boolean}
         */
        WallReshapingTool.prototype.isClockwise = function (a, b, c) {
            return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0;
        };
        /**
         * Check if point c is on the segment between points a and b
         * @param {go.Point} a
         * @param {go.Point} b
         * @param {go.Point} c
         * @return {boolean}
         */
        WallReshapingTool.prototype.isPointOnSegment = function (a, b, c) {
            var ac = Math.sqrt(a.distanceSquaredPoint(c));
            var bc = Math.sqrt(b.distanceSquaredPoint(c));
            var ab = Math.sqrt(a.distanceSquaredPoint(b));
            if (Math.abs(ab - (ac + bc)) <= .1) {
                return true;
            }
            return false;
        };
        /**
         * Joins colinear walls, splits walls, performs mitering, ommits transaction, stops tool.
         */
        WallReshapingTool.prototype.doMouseUp = function () {
            var tool = this;
            var fp = this.diagram;
            if (tool.handle === null)
                return;
            tool.doMouseMove();
            var adorn = tool.handle.part;
            var wall = adorn.adornedPart;
            tool.joinColinearWalls();
            tool.maybeSplitWall();
            // reset joinedWall
            tool.joinedWalls.clear();
            // update all rooms TODO only update relevant rooms
            var set = new go.Set();
            set.add(wall);
            fp.updateAllRoomBoundaries(set);
            this.stopTool();
        };
        /**
         * End the wall reshaping transaction.
         * If a wall is reshaped to less than 1 document unit long, remove it from the Floorplan.
         * If tool was cancelled with Esc key, reset reshaping wall / wall parts to what they were before.
         * Remove guidelines and update wall dimension links. Commit transaction.
         */
        WallReshapingTool.prototype.doDeactivate = function () {
            var diagram = this.diagram;
            var fp = diagram;
            // if a wall reshaped to length < 1 px, remove it
            if (this.handle === null)
                return;
            var adorn = this.handle.part;
            var wall = adorn.adornedPart;
            var sPt = wall.data.startpoint;
            var ePt = wall.data.endpoint;
            var length = Math.sqrt(sPt.distanceSquared(ePt.x, ePt.y));
            if (length < 1) {
                diagram.remove(wall); // remove wall
                wall.memberParts.iterator.each(function (member) { diagram.remove(member); }); // remove wall's parts
                var wallDimensionLinkPointNodes_1 = [];
                fp.pointNodes.iterator.each(function (node) { if (node.data.key.indexOf(wall.data.key) !== -1)
                    wallDimensionLinkPointNodes_1.push(node); });
                if (wallDimensionLinkPointNodes_1.length === 2) {
                    diagram.remove(wallDimensionLinkPointNodes_1[0]);
                    diagram.remove(wallDimensionLinkPointNodes_1[1]);
                }
            }
            // remove wall's dimension links if tool cancelled via esc key
            if (diagram.lastInput.key === 'Esc' && !this.isBuilding) {
                diagram.skipsUndoManager = true;
                diagram.startTransaction('reset to old data');
                if (this.handle.name === 'sPt')
                    wall.data.startpoint = this.returnPoint;
                else
                    wall.data.endpoint = this.returnPoint;
                this.performAllMitering();
                fp.updateWall(wall);
                if (this.returnData) {
                    this.returnData.iterator.each(function (kvp) {
                        var key = kvp.key;
                        var loc = kvp.value;
                        var wallPart = diagram.findPartForKey(key);
                        wallPart.location = loc;
                        wallPart.rotateObject.angle = wall.rotateObject.angle;
                    });
                }
                diagram.commitTransaction('reset to old data');
                diagram.skipsUndoManager = false;
            }
            // remove guide line point nodes
            var glPoints = this.diagram.findNodesByExample({ category: 'GLPointNode' });
            diagram.removeParts(glPoints, true);
            fp.updateWallDimensions();
            // commit transaction, deactivate tool
            diagram.commitTransaction(this.name);
            this.isActive = false;
        };
        /**
         * Creates an adornment with 2 handles
         * @param {go.Shape} selelt The adorned wall's Shape element
         * @return {go.Adornment}
         */
        WallReshapingTool.prototype.makeAdornment = function (selelt) {
            var adornment = new go.Adornment();
            adornment.type = go.Panel.Spot;
            adornment.locationObjectName = 'BODY';
            adornment.locationSpot = go.Spot.Center;
            var h = new go.Shape();
            h.name = 'BODY';
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
        };
        /**
         * Creates a basic handle archetype (a small blue diamond)
         * @return {go.Shape}
         */
        WallReshapingTool.prototype.makeHandle = function () {
            var h = this.handleArchetype;
            return h.copy();
        };
        /**
         * Calculate the angle and length made from the mousepoint and the non-moving handle; used to reshape wall when holding SHIFT
         * @param {go.Point} mousePt The mouse cursors coordinate position
         */
        WallReshapingTool.prototype.calcAngleAndLengthFromHandle = function (mousePt) {
            var tool = this;
            var h = this.handle;
            if (h === null)
                return;
            if (tool.adornedShape === null)
                return;
            var otherH = null;
            var node = tool.adornedShape.part;
            if (node === null)
                return;
            var adornments = node.adornments.iterator;
            var adornment;
            while (adornments.next()) {
                var a = adornments.value;
                if (a.category === tool.name) {
                    adornment = a;
                }
            }
            if (adornment === undefined)
                return;
            var atr = adornment.elements;
            while (atr.next()) {
                var e = atr.value;
                if (e.name !== undefined && e.name !== h.name) {
                    otherH = e;
                }
            }
            // calc angle from otherH against the horizontal
            if (otherH === null)
                return;
            var otherHandlePt = otherH.getDocumentPoint(go.Spot.Center);
            var deltaY = mousePt.y - otherHandlePt.y;
            var deltaX = mousePt.x - otherHandlePt.x;
            var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            // because atan2 goes from -180 to +180 and we want it to be 0-360
            // so -90 becomes 270, etc.
            if (angle < 0)
                angle += 360;
            tool.angle = angle;
            var distanceBetween = Math.sqrt(mousePt.distanceSquared(otherHandlePt.x, otherHandlePt.y));
            tool.length = distanceBetween;
        };
        /**
         * Takes a point -- returns a new point that is closest to the original point that conforms to the grid snap
         * @param {go.Point} point The point to snap to grid
         * @return {go.Point}
         */
        WallReshapingTool.prototype.snapPointToGrid = function (point) {
            var diagram = this.diagram;
            var gs = diagram.toolManager.draggingTool.isGridSnapEnabled ? diagram.model.modelData.gridSize : 1;
            var newx = gs * Math.round(point.x / gs);
            var newy = gs * Math.round(point.y / gs);
            var newPt = new go.Point(newx, newy);
            return newPt;
        };
        /**
         * Reshapes the wall's geometry, updates model data
         * @param {go.Point} newPoint The point to move the reshaping wall's reshaping endpoint to
         */
        WallReshapingTool.prototype.reshape = function (newPoint) {
            var diagram = this.diagram;
            var tool = this;
            var shape = this.adornedShape;
            if (shape === null)
                return;
            if (tool.handle === null)
                return;
            var node = shape.part;
            if (node === null)
                return;
            // if user holds SHIFT, make angle between startPoint / endPoint and the horizontal line a multiple of 45
            if (this.diagram.lastInput.shift && !this.isIntersecting) {
                var sPt = void 0; // the stationary point -- the point at the handle that is not being adjusted
                if (tool.handle.name === 'sPt')
                    sPt = node.data.endpoint;
                else
                    sPt = node.data.startpoint;
                var oldGridSize = diagram.model.modelData.gridSize;
                var gridSize = diagram.model.modelData.gridSize;
                // if gridSnapping is disabled, just set 'gridSize' var to 1 so it doesn't affect endPoint calculations
                if (!(this.diagram.toolManager.draggingTool.isGridSnapEnabled))
                    gridSize = 1;
                // these are set in mouseMove's call to calcAngleAndLengthFromHandle()
                var angle = tool.angle;
                var length_2 = tool.length;
                // snap to 90 degrees
                if (angle > 67.5 && angle < 112.5) {
                    var newy = sPt.y + length_2;
                    newy = gridSize * Math.round(newy / gridSize);
                    newPoint = new go.Point(sPt.x, newy);
                }
                // snap to 180 degrees
                if (angle > 112.5 && angle < 202.5) {
                    var newx = sPt.x - length_2;
                    newx = gridSize * Math.round(newx / gridSize);
                    newPoint = new go.Point(newx, sPt.y);
                }
                // snap to 270 degrees
                if (angle > 247.5 && angle < 292.5) {
                    var newy = sPt.y - length_2;
                    newy = gridSize * Math.round(newy / gridSize);
                    newPoint = new go.Point(sPt.x, newy);
                }
                // snap to 360 degrees
                if (angle > 337.5 || angle < 22.5) {
                    var newx = sPt.x + length_2;
                    newx = gridSize * Math.round(newx / gridSize);
                    newPoint = new go.Point(newx, sPt.y);
                }
                // snap to 45 degrees
                if (angle > 22.5 && angle < 67.5) {
                    var newx = (Math.sin(.785) * length_2);
                    newx = gridSize * Math.round(newx / gridSize) + sPt.x;
                    var newy = (Math.cos(.785) * length_2);
                    newy = gridSize * Math.round(newy / gridSize) + sPt.y;
                    newPoint = new go.Point(newx, newy);
                }
                // snap to 135 degrees
                if (angle > 112.5 && angle < 157.5) {
                    var newx = (Math.sin(.785) * length_2);
                    newx = sPt.x - (gridSize * Math.round(newx / gridSize));
                    var newy = (Math.cos(.785) * length_2);
                    newy = gridSize * Math.round(newy / gridSize) + sPt.y;
                    newPoint = new go.Point(newx, newy);
                }
                // snap to 225 degrees
                if (angle > 202.5 && angle < 247.5) {
                    var newx = (Math.sin(.785) * length_2);
                    newx = sPt.x - (gridSize * Math.round(newx / gridSize));
                    var newy = (Math.cos(.785) * length_2);
                    newy = sPt.y - (gridSize * Math.round(newy / gridSize));
                    newPoint = new go.Point(newx, newy);
                }
                // snap to 315 degrees
                if (angle > 292.5 && angle < 337.5) {
                    var newx = (Math.sin(.785) * length_2);
                    newx = sPt.x + (gridSize * Math.round(newx / gridSize));
                    var newy = (Math.cos(.785) * length_2);
                    newy = sPt.y - (gridSize * Math.round(newy / gridSize));
                    newPoint = new go.Point(newx, newy);
                }
                gridSize = oldGridSize; // set gridSize back to what it used to be in case gridSnap is enabled again
            }
            if (this.diagram.toolManager.draggingTool.isGridSnapEnabled && !tool.isIntersecting && !this.diagram.lastInput.shift) {
                newPoint = this.snapPointToGrid(newPoint);
            }
            else {
                newPoint = new go.Point(newPoint.x, newPoint.y);
            }
            var type = tool.handle.name;
            if (type === undefined)
                return;
            var stationaryPt = (type === 'sPt') ? node.data.endpoint : node.data.startpoint;
            var movingPt = (type === 'sPt') ? node.data.startpoint : node.data.endpoint;
            this.reshapeWall(node, stationaryPt, movingPt, newPoint, diagram);
            this.updateAdornments(node);
            this.showMatches();
            var fp = diagram;
            fp.updateWallDimensions();
        }; // end reshape()
        /**
         * Show if the wall (at the adjustment handle being moved) lines up with other wall edges
         */
        WallReshapingTool.prototype.showMatches = function () {
            var tool = this;
            var diagram = tool.diagram;
            if (!diagram.model.modelData.preferences.showWallGuidelines)
                return;
            if (tool.adornedShape === null)
                return;
            if (tool.handle === null)
                return;
            var wall = tool.adornedShape.part;
            var comparePt;
            if (tool.handle.name === 'sPt')
                comparePt = wall.data.startpoint;
            else
                comparePt = wall.data.endpoint;
            // the wall attached to the handle being manipulated
            var hWall = tool.adornedShape.part;
            // delete any old guideline points (these are used to show guidelines, must be cleared before a new guideline can be shown)
            var glPoints = diagram.findNodesByExample({ category: 'GLPointNode' });
            diagram.removeParts(glPoints, true);
            var walls = this.diagram.findNodesByExample({ category: 'WallGroup' });
            walls.iterator.each(function (w) {
                if (hWall !== null && w.data.key !== hWall.data.key) {
                    var shape = w.findObject('SHAPE');
                    var pt1 = w.data.startpoint;
                    var pt2 = w.data.endpoint;
                    tool.checkPtLinedUp(pt1, comparePt.x, pt1.x, comparePt);
                    tool.checkPtLinedUp(pt1, comparePt.y, pt1.y, comparePt);
                    tool.checkPtLinedUp(pt2, comparePt.x, pt2.x, comparePt);
                    tool.checkPtLinedUp(pt2, comparePt.y, pt2.y, comparePt);
                }
            });
        };
        /**
         * Checks if there exists a horiontal or vertical line (decided by 'coord' parameter) between pt and compare pt
         * if so, draws a link between the two, letting the user know the wall they're reshaping lines up with another's edge
         * @param {go.Point} pt
         * @param {number} comparePtCoord
         * @param {number} ptCoord
         * @param {go.Point} comparePt
         */
        WallReshapingTool.prototype.checkPtLinedUp = function (pt, comparePtCoord, ptCoord, comparePt) {
            function makeGuideLinePoint() {
                var $ = go.GraphObject.make;
                return $(go.Node, 'Spot', { locationSpot: go.Spot.TopLeft, locationObjectName: 'SHAPE', desiredSize: new go.Size(1, 1) }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, { stroke: null, strokeWidth: 1, name: 'SHAPE', fill: 'black' }));
            }
            function makeGuideLineLink() {
                var $ = go.GraphObject.make;
                return $(go.Link, $(go.Shape, { stroke: 'black', strokeWidth: 2, name: 'SHAPE' }, new go.Binding('strokeWidth', 'width'), new go.Binding('stroke', 'stroke')));
            }
            var diagram = this.diagram;
            var errorMargin = Math.abs(comparePtCoord - ptCoord);
            if (errorMargin < 2) {
                var data = { category: 'GLPointNode', loc: go.Point.stringify(pt), key: 'glpt' };
                var data2 = { key: 'movingPt', category: 'GLPointNode', loc: go.Point.stringify(comparePt) };
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
        };
        /**
         * Maintain position of all wallParts as best as possible when a wall is being reshaped.
         * Position is relative to the distance a wallPart's location is from the stationaryPoint of the wall.
         * This is called during WallReshapingTool's reshape function.
         * @param {go.Group} wall The wall being reshaped
         * @param {go.Point} stationaryPoint The endpoint of the wall not being reshaped
         * @param {go.Point} movingPoint The endpoint of the wall being reshaped
         * @param {go.Point} newPoint The point that movingPoint is going to
         * @param {go.Diagram} diagram The diagram belonging WallReshapingTool belongs to
         */
        WallReshapingTool.prototype.reshapeWall = function (wall, stationaryPoint, movingPoint, newPoint, diagram) {
            var tool = this;
            var wallParts = wall.memberParts;
            var arr = [];
            var oldAngle = wall.data.startpoint.directionPoint(wall.data.endpoint);
            wallParts.iterator.each(function (part) { arr.push(part); });
            // remember the distance each wall part's location was from the stationary point; store these in a Map
            var distancesMap = new go.Map( /*"string", "number"*/);
            var closestPart = null;
            var closestDistance = Number.MAX_VALUE;
            for (var i = 0; i < arr.length; i++) {
                var part = arr[i];
                var distanceToStationaryPt = Math.sqrt(part.location.distanceSquaredPoint(stationaryPoint));
                distancesMap.add(part.data.key, distanceToStationaryPt);
                // distanceToMovingPt is determined by whichever endpoint of the wallpart is closest to movingPoint
                var endpoints = tool.getWallPartEndpoints(part);
                var distanceToMovingPt = Math.min(Math.sqrt(endpoints[0].distanceSquaredPoint(movingPoint)), Math.sqrt(endpoints[1].distanceSquaredPoint(movingPoint)));
                // find and store the closest wallPart to the movingPt
                if (distanceToMovingPt < closestDistance) {
                    closestDistance = distanceToMovingPt;
                    closestPart = part;
                }
            }
            // if the proposed newPoint would make it so the wall would reshape past closestPart, set newPoint to the edge point of closest part
            if (closestPart !== null) {
                var loc = closestPart.location;
                var partLength = closestPart.data.length;
                var angle = oldAngle;
                var point1 = new go.Point((loc.x + (partLength / 2)), loc.y);
                var point2 = new go.Point((loc.x - (partLength / 2)), loc.y);
                point1.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
                point2.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
                var distance1 = Math.sqrt(stationaryPoint.distanceSquaredPoint(point1));
                var distance2 = Math.sqrt(stationaryPoint.distanceSquaredPoint(point2));
                var minLength = void 0;
                var newLoc = void 0;
                if (distance1 > distance2) {
                    minLength = distance1;
                    newLoc = point1;
                }
                else {
                    minLength = distance2;
                    newLoc = point2;
                }
                var testDistance = Math.sqrt(stationaryPoint.distanceSquaredPoint(newPoint));
                if (testDistance < minLength)
                    newPoint = newLoc;
            }
            // reshape the wall
            if (movingPoint === wall.data.endpoint) {
                diagram.model.setDataProperty(wall.data, 'endpoint', newPoint);
            }
            else {
                diagram.model.setDataProperty(wall.data, 'startpoint', newPoint);
            }
            var fp = diagram;
            fp.updateWall(wall);
            // for each wallPart, maintain relative distance from the stationaryPoint
            distancesMap.iterator.each(function (kvp) {
                var wallPart = diagram.findPartForKey(kvp.key);
                var distance = kvp.value;
                var wallLength = Math.sqrt(stationaryPoint.distanceSquaredPoint(movingPoint));
                var newLoc = new go.Point(stationaryPoint.x + ((distance / wallLength) * (movingPoint.x - stationaryPoint.x)), stationaryPoint.y + ((distance / wallLength) * (movingPoint.y - stationaryPoint.y)));
                wallPart.location = newLoc;
                // calculate the new angle
                var sToE = wall.data.startpoint.directionPoint(wall.data.endpoint);
                var eToS = wall.data.endpoint.directionPoint(wall.data.startpoint);
                var diffS = Math.abs(wallPart.angle - sToE);
                var diffE = Math.abs(wallPart.angle - eToS);
                var newAngle = (diffS < diffE) ? sToE : eToS;
                wallPart.angle = newAngle;
            });
        }; // end reshapeWall()
        /**
         * Find and return an array of the endpoints of a given wallpart (window or door)
         * @param {go.Part} wallPart A Wall Part -- i.e. Door Node, Window Node
         * @return {Array<go.Point>}
         */
        WallReshapingTool.prototype.getWallPartEndpoints = function (wallPart) {
            var loc = wallPart.location;
            var partLength = wallPart.data.length;
            var angle = 0;
            if (wallPart.containingGroup !== null)
                angle = wallPart.containingGroup.rotateObject.angle;
            else
                angle = 180;
            var point1 = new go.Point((loc.x + (partLength / 2)), loc.y);
            var point2 = new go.Point((loc.x - (partLength / 2)), loc.y);
            point1.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
            point2.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
            var arr = [];
            arr.push(point1);
            arr.push(point2);
            return arr;
        };
        return WallReshapingTool;
    }(go.Tool));
    exports.WallReshapingTool = WallReshapingTool;
});
// export = WallReshapingTool;
