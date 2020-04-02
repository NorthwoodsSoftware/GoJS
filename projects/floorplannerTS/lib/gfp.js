/*! Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved. */
window["gfp"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() { module.exports = window["go"]; }());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(0);
var WallBuildingTool = (function (_super) {
    __extends(WallBuildingTool, _super);
    function WallBuildingTool() {
        var _this = _super.call(this) || this;
        _this._buildingWall = null;
        _this._isBuildingDivider = false;
        _this.name = 'WallBuilding';
        _this._startPoint = null;
        _this._endPoint = null;
        _this._wallReshapingTool = null;
        _this._isBuildingDivider = false;
        return _this;
    }
    Object.defineProperty(WallBuildingTool.prototype, "startPoint", {
        get: function () { return this._startPoint; },
        set: function (value) { this._startPoint = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallBuildingTool.prototype, "endPoint", {
        get: function () { return this._endPoint; },
        set: function (value) { this._endPoint = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallBuildingTool.prototype, "wallReshapingTool", {
        get: function () { return this._wallReshapingTool; },
        set: function (value) { this._wallReshapingTool = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallBuildingTool.prototype, "buildingWall", {
        get: function () { return this._buildingWall; },
        set: function (value) { this._buildingWall = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallBuildingTool.prototype, "isBuildingDivider", {
        get: function () { return this._isBuildingDivider; },
        set: function (value) { this._isBuildingDivider = value; },
        enumerable: true,
        configurable: true
    });
    WallBuildingTool.prototype.doActivate = function () {
        this.endPoint = null;
        this.startTransaction(this.name);
        this.diagram.isMouseCaptured = true;
        var tool = this;
        var fp = tool.diagram;
        var clickPt = tool.diagram.lastInput.documentPoint;
        var isSnapped = false;
        var walls = fp.findNodesByExample({ category: 'WallGroup' });
        walls.iterator.each(function (w) {
            if (fp.isPointInWall(w, clickPt)) {
                if (tool.buildingWall === null) {
                    var snapPt = clickPt.projectOntoLineSegmentPoint(w.data.startpoint, w.data.endpoint);
                    clickPt = snapPt;
                    isSnapped = true;
                }
            }
        });
        walls.iterator.each(function (w) {
            var sp = w.data.startpoint;
            var ep = w.data.endpoint;
            var distSp = Math.sqrt(sp.distanceSquaredPoint(clickPt));
            if (distSp < 15) {
                clickPt = sp;
                isSnapped = true;
            }
            var distEp = Math.sqrt(ep.distanceSquaredPoint(clickPt));
            if (distEp < 15) {
                clickPt = ep;
                isSnapped = true;
            }
        });
        if (true) {
            var gs = fp.model.modelData.gridSize;
            if (!(tool.diagram.toolManager.draggingTool.isGridSnapEnabled) || isSnapped)
                gs = .0001;
            var newx = gs * Math.round(clickPt.x / gs);
            var newy = gs * Math.round(clickPt.y / gs);
            clickPt = new go.Point(newx, newy);
        }
        this.startPoint = clickPt;
        this.wallReshapingTool = fp.toolManager.mouseDownTools.elt(3);
        this.isActive = true;
    };
    WallBuildingTool.prototype.doMouseDown = function () {
        var diagram = this.diagram;
        var tool = this;
        tool.diagram.currentCursor = 'crosshair';
        var data = {
            key: 'wall', category: 'WallGroup', caption: tool.isBuildingDivider ? 'Divider' : 'Wall', type: tool.isBuildingDivider ? 'Divider' : 'Wall',
            startpoint: tool.startPoint, endpoint: tool.startPoint, smpt1: tool.startPoint, smpt2: tool.startPoint, empt1: tool.startPoint, empt2: tool.startPoint,
            thickness: tool._isBuildingDivider ? .005 : parseFloat(diagram.model.modelData.wallThickness), color: 'lightgray', isGroup: true, notes: '',
            isDivider: tool.isBuildingDivider
        };
        this.diagram.model.addNodeData(data);
        var wall = diagram.findPartForKey(data.key);
        this.buildingWall = wall;
        var fp = diagram;
        fp.updateWall(wall);
        var part = diagram.findPartForData(data);
        if (part === null)
            return;
        tool.transactionResult = tool.name;
        diagram.raiseDiagramEvent('PartCreated', part);
        if (tool.wallReshapingTool === null)
            return;
        tool.wallReshapingTool.isEnabled = true;
        diagram.select(part);
        tool.wallReshapingTool.isBuilding = true;
        tool.wallReshapingTool.adornedShape = part.findObject('SHAPE');
        tool.wallReshapingTool.doActivate();
    };
    WallBuildingTool.prototype.doKeyDown = function () {
        var fp = this.diagram;
        var e = fp.lastInput;
        if (e.key === 'Esc') {
            var wall = fp.selection.first();
            fp.remove(wall);
            fp.pointNodes.iterator.each(function (node) { fp.remove(node); });
            fp.dimensionLinks.iterator.each(function (link) { fp.remove(link); });
            fp.pointNodes.clear();
            fp.dimensionLinks.clear();
            this.doDeactivate();
        }
        go.Tool.prototype.doKeyDown.call(this);
    };
    WallBuildingTool.prototype.doMouseMove = function () {
        if (this.wallReshapingTool === null)
            return;
        this.diagram.currentCursor = 'crosshair';
        this.wallReshapingTool.doMouseMove();
    };
    WallBuildingTool.prototype.doDeactivate = function () {
        var diagram = this.diagram;
        this.buildingWall = null;
        this.diagram.currentCursor = '';
        this.diagram.isMouseCaptured = false;
        if (this.wallReshapingTool !== null) {
            this.wallReshapingTool.isEnabled = false;
            this.wallReshapingTool.adornedShape = null;
            this.wallReshapingTool.doMouseUp();
            this.wallReshapingTool.doDeactivate();
            this.wallReshapingTool.isBuilding = false;
        }
        var fp = diagram;
        fp.updateWallDimensions();
        this.stopTransaction();
        this.isActive = false;
    };
    return WallBuildingTool;
}(go.Tool));
exports.WallBuildingTool = WallBuildingTool;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(0);
var WallReshapingTool = (function (_super) {
    __extends(WallReshapingTool, _super);
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
        _this._isBuilding = false;
        _this._isIntersecting = false;
        _this._joinedWalls = new go.Set();
        _this._returnPoint = null;
        _this._returnData = null;
        _this._joinedWalls = new go.Set();
        _this._wallIntersecting = null;
        return _this;
    }
    Object.defineProperty(WallReshapingTool.prototype, "handleArchetype", {
        get: function () { return this._handleArchetype; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "handle", {
        get: function () { return this._handle; },
        set: function (value) { this._handle = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "adornedShape", {
        get: function () { return this._adornedShape; },
        set: function (value) { this._adornedShape = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "angle", {
        get: function () { return this._angle; },
        set: function (value) { this._angle = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "length", {
        get: function () { return this._length; },
        set: function (value) { this._length = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "reshapeObjectName", {
        get: function () { return this._reshapeObjectName; },
        set: function (value) { this._reshapeObjectName = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "isBuilding", {
        get: function () { return this._isBuilding; },
        set: function (value) { this._isBuilding = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "returnData", {
        get: function () { return this._returnData; },
        set: function (value) { this._returnData = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "returnPoint", {
        get: function () { return this._returnPoint; },
        set: function (value) { this._returnPoint = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "isIntersecting", {
        get: function () { return this._isIntersecting; },
        set: function (value) { this._isIntersecting = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "wallIntersecting", {
        get: function () { return this._wallIntersecting; },
        set: function (value) { this._wallIntersecting = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WallReshapingTool.prototype, "joinedWalls", {
        get: function () { return this._joinedWalls; },
        set: function (value) { this._joinedWalls = value; },
        enumerable: true,
        configurable: true
    });
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
                    var geo = selelt.geometry;
                    var b_1 = geo.bounds;
                    var pb_1 = selelt.part.actualBounds;
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
    WallReshapingTool.prototype.doActivate = function () {
        var diagram = this.diagram;
        if (diagram === null)
            return;
        if (this.isBuilding) {
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
            this.returnPoint = this.handle.name === 'sPt' ? wall.data.startpoint : wall.data.endpoint;
            var wallParts = wall.memberParts;
            if (wallParts.count !== 0) {
                var locationsMap_1 = new go.Map();
                wallParts.iterator.each(function (wallPart) {
                    locationsMap_1.add(wallPart.data.key, wallPart.location);
                });
                this.returnData = locationsMap_1;
            }
        }
        this.startTransaction(this.name);
        this.isActive = true;
    };
    WallReshapingTool.prototype.doMouseMove = function () {
        var fp = this.diagram;
        var tool = this;
        if (tool.handle === null)
            return;
        var adorn = tool.handle.part;
        var wall = adorn.adornedPart;
        var mousePt = fp.lastInput.documentPoint;
        if (tool.isActive && fp !== null) {
            if (fp.lastInput.shift) {
                var type = tool.handle.name;
                var stationaryPt = (type === 'sPt') ? wall.data.endpoint : wall.data.startpoint;
                var ang = stationaryPt.directionPoint(mousePt);
                var length_1 = Math.sqrt(stationaryPt.distanceSquaredPoint(mousePt));
                ang = Math.round(ang / 45) * 45;
                var newPoint = new go.Point(stationaryPt.x + length_1, stationaryPt.y);
                var dx = stationaryPt.x;
                var dy = stationaryPt.y;
                newPoint = newPoint.offset(-dx, -dy);
                newPoint = newPoint.rotate(ang);
                newPoint = newPoint.offset(dx, dy);
                mousePt = newPoint;
            }
            var walls = fp.findNodesByExample({ category: 'WallGroup' });
            walls.iterator.each(function (w) {
                if (w.data.key !== wall.data.key) {
                    var spt = w.data.startpoint;
                    var ept = w.data.endpoint;
                    if (fp.isPointInWall(w, mousePt)) {
                        mousePt = mousePt.projectOntoLineSegmentPoint(w.data.startpoint, w.data.endpoint);
                        tool.isIntersecting = true;
                    }
                    if (Math.sqrt(spt.distanceSquaredPoint(mousePt)) < 10) {
                        mousePt = spt;
                    }
                    else if (Math.sqrt(ept.distanceSquaredPoint(mousePt)) < 10) {
                        mousePt = ept;
                    }
                }
            });
            var iw = tool.getClosestIntersectingWall(mousePt);
            if (iw === null || tool.wallIntersecting !== null) {
                if (tool.wallIntersecting !== null && tool.wallIntersecting !== undefined && tool.wallIntersecting.data !== null) {
                    tool.performMiteringOnWall(tool.wallIntersecting);
                }
            }
            if (iw != null) {
                tool.isIntersecting = true;
                tool.wallIntersecting = iw;
                mousePt = mousePt.projectOntoLineSegmentPoint(iw.data.startpoint, iw.data.endpoint);
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
                if (tool.wallIntersecting !== null && tool.wallIntersecting !== undefined &&
                    tool.wallIntersecting.data !== null && fp.getWallsIntersection(wall, tool.wallIntersecting) === null) {
                    tool.wallIntersecting = null;
                }
            }
            tool.calcAngleAndLengthFromHandle(mousePt);
            tool.reshape(mousePt);
        }
        tool.performMiteringOnWall(wall);
        fp.updateWallDimensions();
        fp.updateWallAngles();
    };
    WallReshapingTool.prototype.getClosestIntersectingWall = function (proposedPt) {
        var tool = this;
        if (tool.handle === null)
            return null;
        var adorn = tool.handle.part;
        var wall = adorn.adornedPart;
        var type = tool.handle.name;
        var stationaryPt = (type === 'sPt') ? wall.data.endpoint : wall.data.startpoint;
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
                var intersectPoint = fp.getWallsIntersection(dummyWall, w);
                var isStationaryPtOnW = false;
                var ab = parseFloat(Math.sqrt(w.data.startpoint.distanceSquaredPoint(stationaryPt)).toFixed(2));
                var bc = parseFloat(Math.sqrt(stationaryPt.distanceSquaredPoint(w.data.endpoint)).toFixed(2));
                var ac = parseFloat(Math.sqrt(w.data.startpoint.distanceSquaredPoint(w.data.endpoint)).toFixed(2));
                if (Math.abs((ab + bc) - ac) <= .1) {
                    isStationaryPtOnW = true;
                }
                if (intersectPoint !== null && !isStationaryPtOnW) {
                    var dist = Math.sqrt(stationaryPt.distanceSquaredPoint(intersectPoint));
                    if (dist < closestDistance) {
                        closestDistance = dist;
                        closestWall = w;
                    }
                }
            }
        });
        fp.remove(dummyWall);
        return closestWall;
    };
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
    WallReshapingTool.prototype.performMitering = function (wa, wb) {
        var tool = this;
        var diagram = this.diagram;
        var as = wa.data.startpoint;
        var ae = wa.data.endpoint;
        var bs = wb.data.startpoint;
        var be = wb.data.endpoint;
        var wat = wa.data.thickness;
        var wbt = wb.data.thickness;
        var wal = Math.sqrt(as.distanceSquaredPoint(ae));
        var wbl = Math.sqrt(bs.distanceSquaredPoint(be));
        var B = diagram.getWallsIntersection(wa, wb);
        if (B === null) {
            return;
        }
        var A = (tool.pointsApproximatelyEqual(as, B)) ? ae : as;
        var C = (tool.pointsApproximatelyEqual(bs, B)) ? be : bs;
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
        if (ow !== null && iw !== null && wa.data.key === iw.data.key) {
            if (tool.isClockwise(A, B, ow.data.startpoint)) {
                C = ow.data.startpoint;
            }
            else {
                C = ow.data.endpoint;
            }
        }
        if (ow !== null && iw !== null && wb.data.key === iw.data.key) {
            if (tool.isClockwise(B, C, ow.data.startpoint)) {
                A = ow.data.startpoint;
            }
            else {
                A = ow.data.endpoint;
            }
        }
        var a1 = B.directionPoint(A);
        var a2 = B.directionPoint(C);
        var ang = Math.abs(a1 - a2 + 360) % 360;
        if (Math.abs(ang - 180) < .1) {
            return;
        }
        ang = ang * (Math.PI / 180);
        var u = Math.abs(wbt / (2 * (Math.sin(ang))));
        var v = Math.abs(wat / (2 * (Math.sin(ang))));
        var ab = Math.sqrt(A.distanceSquaredPoint(B));
        var bc = Math.sqrt(B.distanceSquaredPoint(C));
        var ux = ((A.x - B.x) / ab) * u;
        var uy = ((A.y - B.y) / ab) * u;
        var vx = ((C.x - B.x) / bc) * v;
        var vy = ((C.y - B.y) / bc) * v;
        var D = new go.Point(B.x + ux + vx, B.y + uy + vy);
        var E = new go.Point(B.x - ux - vx, B.y - uy - vy);
        var minLength = Math.min(wal, wbl);
        if (Math.sqrt(D.distanceSquaredPoint(B)) > minLength) {
            return;
        }
        var mpt = tool.isClockwise(B, A, D) ? E : D;
        if (isNaN(mpt.x) || isNaN(mpt.y)) {
            return;
        }
        if (tool.pointsApproximatelyEqual(as, B) || tool.pointsApproximatelyEqual(ae, B)) {
            var prop = null;
            if (tool.pointsApproximatelyEqual(A, as)) {
                if (tool.isClockwise(A, B, mpt)) {
                    prop = 'empt1';
                }
                else {
                    prop = 'empt2';
                }
            }
            else if (tool.pointsApproximatelyEqual(A, ae)) {
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
        if (tool.pointsApproximatelyEqual(bs, B) || tool.pointsApproximatelyEqual(be, B)) {
            var prop = null;
            if (tool.pointsApproximatelyEqual(C, bs)) {
                if (tool.isClockwise(C, B, mpt)) {
                    prop = 'empt1';
                }
                else {
                    prop = 'empt2';
                }
            }
            else if (tool.pointsApproximatelyEqual(C, be)) {
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
    WallReshapingTool.prototype.getAllWallIntersectionPoints = function () {
        var tool = this;
        var diagram = tool.diagram;
        var walls = diagram.findNodesByExample({ category: 'WallGroup' });
        var intersectionPoints = new go.Set();
        walls.iterator.each(function (w) {
            var otherWalls = diagram.findNodesByExample({ category: 'WallGroup' });
            otherWalls.iterator.each(function (ow) {
                if (ow.data.key === w.data.key)
                    return;
                var ip = diagram.getWallsIntersection(w, ow);
                var doAdd = true;
                if (ip !== null) {
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
    WallReshapingTool.prototype.getAllWallsAtIntersection = function (intersectionPoint, includeDividers) {
        if (includeDividers === undefined || includeDividers === null) {
            includeDividers = true;
        }
        var tool = this;
        var diagram = tool.diagram;
        var wallsInvolved = new go.List();
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
            var s = p.data.startpoint;
            var e = p.data.endpoint;
            return tool.isPointOnSegment(s, e, intersectionPoint);
        }, true, wallsInvolved);
        return wallsInvolved;
    };
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
        wallsAtEndpoint.remove(reshapingWall);
        jw.iterator.each(function (ww) {
            wallsAtEndpoint.remove(ww);
        });
        if (wallsAtEndpoint.count === 1) {
            var wallToSplit = wallsAtEndpoint.first();
            if (wallToSplit !== null) {
                if (!tool.doWallsShareAnEndpoint(reshapingWall, wallToSplit)) {
                    tool.maybePerformWallSplit(wallToSplit, movingPt);
                }
            }
        }
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
                    if (!tool.doWallsShareAnEndpoint(reshapingWall, wallToSplit)) {
                        tool.maybePerformWallSplit(wallToSplit, stationaryPt);
                    }
                }
            }
        }
        if (jw !== null) {
            jw.iterator.each(function (ww) {
                tool.splitNewWall(ww);
            });
        }
    };
    WallReshapingTool.prototype.splitNewWall = function (w) {
        var tool = this;
        var fp = this.diagram;
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
    WallReshapingTool.prototype.maybePerformWallSplit = function (w, ip) {
        var tool = this;
        var fp = tool.diagram;
        var s = w.data.startpoint;
        var e = w.data.endpoint;
        var type = w.data.isDivider ? 'Divider' : 'Wall';
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
            tool.premiterWall(w1_1);
            tool.premiterWall(w2_1);
            tool.performMiteringAtPoint(ip, false);
            if (tool.handle !== null) {
                var rooms = fp.findNodesByExample({ category: 'RoomNode' });
                var adorn = tool.handle.part;
                var rw_1 = adorn.adornedPart;
                rooms.iterator.each(function (r) {
                    var bw = r.data.boundaryWalls;
                    var _loop_1 = function (i) {
                        var entry = bw[i];
                        var wk = entry[0];
                        if (wk === w.data.key) {
                            var isConnectedToBounds_1 = false;
                            var nonIpEndpoint = (tool.pointsApproximatelyEqual(rw_1.data.startpoint, ip)) ? rw_1.data.endpoint : rw_1.data.startpoint;
                            var iw = tool.getAllWallsAtIntersection(nonIpEndpoint);
                            iw.iterator.each(function (ww) {
                                for (var j = 0; j < bw.length; j++) {
                                    var ee = bw[j];
                                    var wk2 = ee[0];
                                    if (ww.data.key === wk2 && ww.data.key !== rw_1.data.key) {
                                        isConnectedToBounds_1 = true;
                                    }
                                }
                            });
                            if (isConnectedToBounds_1) {
                                var isW1ConnectedToBounds_1 = false;
                                var w1NonIpEndpoint_1 = (tool.pointsApproximatelyEqual(w1_1.data.startpoint, ip)) ? w1_1.data.endpoint : w1_1.data.startpoint;
                                var iw2 = tool.getAllWallsAtIntersection(w1NonIpEndpoint_1);
                                iw2.remove(w);
                                iw2.iterator.each(function (ww) {
                                    var _loop_2 = function (j) {
                                        var entry2 = bw[j];
                                        var wk2 = entry2[0];
                                        if (ww.data.key === wk2 && w1_1.data.key !== ww.data.key) {
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
                                var replacementWall = (isW1ConnectedToBounds_1) ? w1_1 : w2_1;
                                var replacementEntry = tool.getUpdatedEntry(entry, replacementWall);
                                fp.startTransaction();
                                var newBounds = bw.slice();
                                newBounds[i] = replacementEntry;
                                fp.model.setDataProperty(r.data, 'boundaryWalls', newBounds);
                                fp.commitTransaction();
                            }
                            else {
                                var wi = new go.List();
                                wi.add(rw_1);
                                wi.add(w1_1);
                                wi.add(w2_1);
                                wi = fp.sortWallsClockwiseWithSetStartWall(wi, rw_1);
                                var replacementEntry2 = tool.getUpdatedEntry(entry, wi.toArray()[1]);
                                var replacementEntry1 = tool.getUpdatedEntry(entry, wi.toArray()[2]);
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
                });
            }
            var wallParts = fp.findNodesByExample({ group: w.data.key });
            var wallsSet = new go.Set();
            wallsSet.add(w1_1);
            wallsSet.add(w2_1);
            tool.maintainWallParts(wallParts, wallsSet);
            fp.remove(w);
            tool.premiterWall(w1_1);
            tool.premiterWall(w2_1);
            var w1op = tool.pointsApproximatelyEqual(w1_1.data.startpoint, ip) ? w1_1.data.endpoint : w1_1.data.startpoint;
            var w2op = tool.pointsApproximatelyEqual(w2_1.data.startpoint, ip) ? w2_1.data.endpoint : w2_1.data.startpoint;
            tool.performMiteringAtPoint(ip, false);
            tool.performMiteringAtPoint(w1op, false);
            tool.performMiteringAtPoint(w2op, false);
        }
    };
    WallReshapingTool.prototype.splitAllWalls = function () {
        var tool = this;
        var intersectionPoints = tool.getAllWallIntersectionPoints();
        intersectionPoints.iterator.each(function (ips) {
            var ip = go.Point.parse(ips);
            var wallsInvolved = tool.getAllWallsAtIntersection(ip);
            wallsInvolved.iterator.each(function (w) {
                var s = w.data.startpoint;
                var e = w.data.endpoint;
                if (!tool.pointsApproximatelyEqual(s, ip) && !tool.pointsApproximatelyEqual(e, ip)) {
                    tool.maybePerformWallSplit(w, ip);
                }
            });
        });
    };
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
        if (tool.areWallsParallel(wa, wb)) {
            var sharedEndpoint = null;
            if (tool.pointsApproximatelyEqual(as, bs) || tool.pointsApproximatelyEqual(as, be)) {
                sharedEndpoint = as;
            }
            else if (tool.pointsApproximatelyEqual(ae, bs) || tool.pointsApproximatelyEqual(ae, be)) {
                sharedEndpoint = ae;
            }
            if (sharedEndpoint !== null) {
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
    WallReshapingTool.prototype.findAllColinearWalls = function (w, set) {
        if (set === null || set === undefined) {
            set = new go.Set();
        }
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
    WallReshapingTool.prototype.joinColinearWalls = function () {
        var tool = this;
        if (tool.handle === null)
            return;
        var adorn = tool.handle.part;
        var reshapingWall = adorn.adornedPart;
        var cw1 = tool.findAllColinearWalls(reshapingWall);
        var jw = tool.performColinearWallJoining(cw1, reshapingWall);
        if (jw !== null) {
            tool.joinedWalls.add(jw);
        }
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
    WallReshapingTool.prototype.performColinearWallJoining = function (colinearWalls, w) {
        var tool = this;
        var fp = tool.diagram;
        var garbage = new go.Set();
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
        if (colinearWalls.count > 1) {
            var pt1_1 = null;
            var pt2_1 = null;
            var farthestDist_1 = 0;
            var cw2_1 = colinearWalls.copy();
            var wallParts_1 = new go.Set();
            colinearWalls.iterator.each(function (cw1) {
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
                garbage.add(cw1);
            });
            var data = {
                key: 'wall', category: 'WallGroup', caption: 'Wall', type: 'Wall', color: w.data.color,
                startpoint: pt1_1, endpoint: pt2_1, smpt1: pt1_1, smpt2: pt1_1, empt1: pt2_1, empt2: pt2_1,
                thickness: w.data.thickness, isGroup: true, notes: ''
            };
            fp.model.addNodeData(data);
            var newWall_1 = fp.findNodeForData(data);
            var rooms = fp.findNodesByExample({ category: 'RoomNode' });
            rooms.iterator.each(function (r) {
                var bw = r.data.boundaryWalls;
                for (var i = 0; i < bw.length; i++) {
                    var e = bw[i];
                    var wk = e[0];
                    var ww = fp.findNodeForKey(wk);
                    if (colinearWalls.contains(ww)) {
                        tool.performMiteringOnWall(newWall_1);
                        var newEntry = tool.getUpdatedEntry(e, newWall_1);
                        fp.startTransaction();
                        var newBounds = bw.slice();
                        newBounds[i] = newEntry;
                        fp.model.setDataProperty(r.data, 'boundaryWalls', newBounds);
                        fp.commitTransaction();
                    }
                }
            });
            var newWallSet = new go.Set();
            newWallSet.add(newWall_1);
            tool.performMiteringOnWall(newWall_1);
            tool.maintainWallParts(wallParts_1, newWallSet);
            garbage.iterator.each(function (ww) {
                fp.remove(ww);
            });
            tool.performMiteringOnWall(newWall_1);
            return newWall_1;
        }
        return null;
    };
    WallReshapingTool.prototype.maintainWallParts = function (wallParts, walls) {
        var tool = this;
        var fp = tool.diagram;
        var garbage = [];
        wallParts.iterator.each(function (wp) {
            var loc = wp.location;
            walls.iterator.each(function (w) {
                if (fp.isPointInWall(w, loc)) {
                    var newLoc = fp.findClosestLocOnWall(w, wp);
                    if (newLoc !== null) {
                        fp.model.setDataProperty(wp.data, 'group', w.data.key);
                        wp.location = newLoc.projectOntoLineSegmentPoint(w.data.startpoint, w.data.endpoint);
                        if (wp.category === 'WindowNode') {
                            fp.model.setDataProperty(wp.data, 'height', w.data.thickness);
                        }
                        if (wp.category === 'DoorNode') {
                            fp.model.setDataProperty(wp.data, 'doorOpeningHeight', w.data.thickness);
                        }
                    }
                    else {
                        garbage.push(wp);
                    }
                }
            });
        });
        for (var i = 0; i < garbage.length; i++) {
            fp.remove(garbage[i]);
        }
    };
    WallReshapingTool.prototype.getUpdatedEntry = function (oldEntry, nw) {
        var tool = this;
        var fp = tool.diagram;
        var oldWallKey = oldEntry[0];
        var oldWall = fp.findNodeForKey(oldWallKey);
        var oldMiteringSide = oldEntry[1];
        var newEntry = [nw.data.key, null];
        var oms = oldWall.data['smpt' + oldMiteringSide];
        var ome = oldWall.data['empt' + oldMiteringSide];
        function pointAtX(a, b, x) {
            var slope = (b.y - a.y) / (b.x - a.x);
            var y = a.y + (x - a.x) * slope;
            return new go.Point(x, y);
        }
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
    WallReshapingTool.prototype.joinAllColinearWalls = function () {
        var tool = this;
        var diagram = tool.diagram;
        var walls = diagram.findNodesByExample({ category: 'WallGroup' });
        var handledWalls = new go.Set();
        walls.iterator.each(function (w) {
            if (!handledWalls.contains(w)) {
                handledWalls.add(w);
                var colinearWalls = new go.Set();
                colinearWalls.add(w);
                tool.findAllColinearWalls(w, colinearWalls);
                handledWalls.addAll(colinearWalls);
                tool.performColinearWallJoining(colinearWalls, w);
            }
        });
        tool.premiterAllWalls();
    };
    WallReshapingTool.prototype.translateAndRotatePoint = function (point, angle, offset) {
        var oldPoint = point.copy();
        var newPoint = point.copy();
        newPoint.offset(0, offset);
        newPoint.offset(-oldPoint.x, -oldPoint.y).rotate(angle).offset(oldPoint.x, oldPoint.y);
        return newPoint;
    };
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
                var emp1 = tool.translateAndRotatePoint(ep, ang, t / 2);
                diagram.model.setDataProperty(w.data, 'empt1', emp1);
                var emp2 = tool.translateAndRotatePoint(ep, ang + 180, t / 2);
                diagram.model.setDataProperty(w.data, 'empt2', emp2);
                var smp1 = tool.translateAndRotatePoint(sp, ang, t / 2);
                diagram.model.setDataProperty(w.data, 'smpt1', smp1);
                var smp2 = tool.translateAndRotatePoint(sp, ang + 180, t / 2);
                diagram.model.setDataProperty(w.data, 'smpt2', smp2);
                break;
            }
        }
        diagram.updateWall(w);
    };
    WallReshapingTool.prototype.premiterAllWalls = function () {
        var tool = this;
        var diagram = tool.diagram;
        var walls = diagram.findNodesByExample({ category: 'WallGroup' });
        walls.iterator.each(function (w) {
            tool.premiterWall(w);
        });
    };
    WallReshapingTool.prototype.performMiteringOnWall = function (w) {
        var tool = this;
        var sp = w.data.startpoint;
        var ep = w.data.endpoint;
        tool.premiterWall(w);
        tool.performMiteringAtPoint(sp, true);
        tool.performMiteringAtPoint(ep, true);
    };
    WallReshapingTool.prototype.performMiteringAtPoint = function (pt, performPremitering) {
        if (performPremitering === null || performPremitering === undefined) {
            performPremitering = true;
        }
        var tool = this;
        var fp = tool.diagram;
        var wi = tool.getAllWallsAtIntersection(pt, false);
        if (performPremitering) {
            wi.iterator.each(function (w) {
                if (tool.pointsApproximatelyEqual(w.data.startpoint, pt) || tool.pointsApproximatelyEqual(w.data.endpoint, pt)) {
                    var prop = (tool.pointsApproximatelyEqual(w.data.startpoint, pt)) ? 's' : 'e';
                    tool.premiterWall(w, prop + 'mpt1');
                    tool.premiterWall(w, prop + 'mpt2');
                }
            });
        }
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
            tool.performMitering(wa, wb);
        }
    };
    WallReshapingTool.prototype.performAllMitering = function () {
        var tool = this;
        var diagram = tool.diagram;
        tool.premiterAllWalls();
        var intersectionPoints = tool.getAllWallIntersectionPoints();
        intersectionPoints.iterator.each(function (ips) {
            var ip = go.Point.parse(ips);
            var wallsInvolved = tool.getAllWallsAtIntersection(ip);
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
                tool.performMitering(wa, wb);
            }
        });
    };
    WallReshapingTool.prototype.isClockwise = function (a, b, c) {
        return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0;
    };
    WallReshapingTool.prototype.isPointOnSegment = function (a, b, c) {
        var ac = Math.sqrt(a.distanceSquaredPoint(c));
        var bc = Math.sqrt(b.distanceSquaredPoint(c));
        var ab = Math.sqrt(a.distanceSquaredPoint(b));
        if (Math.abs(ab - (ac + bc)) <= .1) {
            return true;
        }
        return false;
    };
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
        tool.joinedWalls.clear();
        var set = new go.Set();
        set.add(wall);
        fp.updateAllRoomBoundaries(set);
        this.stopTool();
    };
    WallReshapingTool.prototype.doDeactivate = function () {
        var diagram = this.diagram;
        var fp = diagram;
        if (this.handle === null)
            return;
        var adorn = this.handle.part;
        var wall = adorn.adornedPart;
        var sPt = wall.data.startpoint;
        var ePt = wall.data.endpoint;
        var length = Math.sqrt(sPt.distanceSquared(ePt.x, ePt.y));
        if (length < 1) {
            diagram.remove(wall);
            wall.memberParts.iterator.each(function (member) { diagram.remove(member); });
            var wallDimensionLinkPointNodes_1 = [];
            fp.pointNodes.iterator.each(function (node) { if (node.data.key.indexOf(wall.data.key) !== -1)
                wallDimensionLinkPointNodes_1.push(node); });
            if (wallDimensionLinkPointNodes_1.length === 2) {
                diagram.remove(wallDimensionLinkPointNodes_1[0]);
                diagram.remove(wallDimensionLinkPointNodes_1[1]);
            }
        }
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
        var glPoints = this.diagram.findNodesByExample({ category: 'GLPointNode' });
        diagram.removeParts(glPoints, true);
        fp.updateWallDimensions();
        diagram.commitTransaction(this.name);
        this.isActive = false;
    };
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
    WallReshapingTool.prototype.makeHandle = function () {
        var h = this.handleArchetype;
        return h.copy();
    };
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
        if (otherH === null)
            return;
        var otherHandlePt = otherH.getDocumentPoint(go.Spot.Center);
        var deltaY = mousePt.y - otherHandlePt.y;
        var deltaX = mousePt.x - otherHandlePt.x;
        var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        if (angle < 0)
            angle += 360;
        tool.angle = angle;
        var distanceBetween = Math.sqrt(mousePt.distanceSquared(otherHandlePt.x, otherHandlePt.y));
        tool.length = distanceBetween;
    };
    WallReshapingTool.prototype.snapPointToGrid = function (point) {
        var diagram = this.diagram;
        var gs = diagram.toolManager.draggingTool.isGridSnapEnabled ? diagram.model.modelData.gridSize : 1;
        var newx = gs * Math.round(point.x / gs);
        var newy = gs * Math.round(point.y / gs);
        var newPt = new go.Point(newx, newy);
        return newPt;
    };
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
        if (this.diagram.lastInput.shift && !this.isIntersecting) {
            var sPt = void 0;
            if (tool.handle.name === 'sPt')
                sPt = node.data.endpoint;
            else
                sPt = node.data.startpoint;
            var oldGridSize = diagram.model.modelData.gridSize;
            var gridSize = diagram.model.modelData.gridSize;
            if (!(this.diagram.toolManager.draggingTool.isGridSnapEnabled))
                gridSize = 1;
            var angle = tool.angle;
            var length_2 = tool.length;
            if (angle > 67.5 && angle < 112.5) {
                var newy = sPt.y + length_2;
                newy = gridSize * Math.round(newy / gridSize);
                newPoint = new go.Point(sPt.x, newy);
            }
            if (angle > 112.5 && angle < 202.5) {
                var newx = sPt.x - length_2;
                newx = gridSize * Math.round(newx / gridSize);
                newPoint = new go.Point(newx, sPt.y);
            }
            if (angle > 247.5 && angle < 292.5) {
                var newy = sPt.y - length_2;
                newy = gridSize * Math.round(newy / gridSize);
                newPoint = new go.Point(sPt.x, newy);
            }
            if (angle > 337.5 || angle < 22.5) {
                var newx = sPt.x + length_2;
                newx = gridSize * Math.round(newx / gridSize);
                newPoint = new go.Point(newx, sPt.y);
            }
            if (angle > 22.5 && angle < 67.5) {
                var newx = (Math.sin(.785) * length_2);
                newx = gridSize * Math.round(newx / gridSize) + sPt.x;
                var newy = (Math.cos(.785) * length_2);
                newy = gridSize * Math.round(newy / gridSize) + sPt.y;
                newPoint = new go.Point(newx, newy);
            }
            if (angle > 112.5 && angle < 157.5) {
                var newx = (Math.sin(.785) * length_2);
                newx = sPt.x - (gridSize * Math.round(newx / gridSize));
                var newy = (Math.cos(.785) * length_2);
                newy = gridSize * Math.round(newy / gridSize) + sPt.y;
                newPoint = new go.Point(newx, newy);
            }
            if (angle > 202.5 && angle < 247.5) {
                var newx = (Math.sin(.785) * length_2);
                newx = sPt.x - (gridSize * Math.round(newx / gridSize));
                var newy = (Math.cos(.785) * length_2);
                newy = sPt.y - (gridSize * Math.round(newy / gridSize));
                newPoint = new go.Point(newx, newy);
            }
            if (angle > 292.5 && angle < 337.5) {
                var newx = (Math.sin(.785) * length_2);
                newx = sPt.x + (gridSize * Math.round(newx / gridSize));
                var newy = (Math.cos(.785) * length_2);
                newy = sPt.y - (gridSize * Math.round(newy / gridSize));
                newPoint = new go.Point(newx, newy);
            }
            gridSize = oldGridSize;
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
    };
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
        var hWall = tool.adornedShape.part;
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
    WallReshapingTool.prototype.reshapeWall = function (wall, stationaryPoint, movingPoint, newPoint, diagram) {
        var tool = this;
        var wallParts = wall.memberParts;
        var arr = [];
        var oldAngle = wall.data.startpoint.directionPoint(wall.data.endpoint);
        wallParts.iterator.each(function (part) { arr.push(part); });
        var distancesMap = new go.Map();
        var closestPart = null;
        var closestDistance = Number.MAX_VALUE;
        for (var i = 0; i < arr.length; i++) {
            var part = arr[i];
            var distanceToStationaryPt = Math.sqrt(part.location.distanceSquaredPoint(stationaryPoint));
            distancesMap.add(part.data.key, distanceToStationaryPt);
            var endpoints = tool.getWallPartEndpoints(part);
            var distanceToMovingPt = Math.min(Math.sqrt(endpoints[0].distanceSquaredPoint(movingPoint)), Math.sqrt(endpoints[1].distanceSquaredPoint(movingPoint)));
            if (distanceToMovingPt < closestDistance) {
                closestDistance = distanceToMovingPt;
                closestPart = part;
            }
        }
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
        if (movingPoint === wall.data.endpoint) {
            diagram.model.setDataProperty(wall.data, 'endpoint', newPoint);
        }
        else {
            diagram.model.setDataProperty(wall.data, 'startpoint', newPoint);
        }
        var fp = diagram;
        fp.updateWall(wall);
        distancesMap.iterator.each(function (kvp) {
            var wallPart = diagram.findPartForKey(kvp.key);
            var distance = kvp.value;
            var wallLength = Math.sqrt(stationaryPoint.distanceSquaredPoint(movingPoint));
            var newLoc = new go.Point(stationaryPoint.x + ((distance / wallLength) * (movingPoint.x - stationaryPoint.x)), stationaryPoint.y + ((distance / wallLength) * (movingPoint.y - stationaryPoint.y)));
            wallPart.location = newLoc;
            var sToE = wall.data.startpoint.directionPoint(wall.data.endpoint);
            var eToS = wall.data.endpoint.directionPoint(wall.data.startpoint);
            var diffS = Math.abs(wallPart.angle - sToE);
            var diffE = Math.abs(wallPart.angle - eToS);
            var newAngle = (diffS < diffE) ? sToE : eToS;
            wallPart.angle = newAngle;
        });
    };
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    Floorplan: __webpack_require__(4).Floorplan,
    FloorplanPalette: __webpack_require__(6).FloorplanPalette,
    WallBuildingTool: __webpack_require__(1).WallBuildingTool,
    WallReshapingTool: __webpack_require__(2).WallReshapingTool
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(0);
var NodeLabelDraggingTool_js_1 = __webpack_require__(5);
var WallBuildingTool_js_1 = __webpack_require__(1);
var WallReshapingTool_js_1 = __webpack_require__(2);
var Floorplan = (function (_super) {
    __extends(Floorplan, _super);
    function Floorplan(div) {
        var _this = _super.call(this, div) || this;
        _this._palettes = [];
        _this._pointNodes = new go.Set();
        _this._dimensionLinks = new go.Set();
        _this._angleNodes = new go.Set();
        var $ = go.GraphObject.make;
        _this.allowLink = false;
        _this.undoManager.isEnabled = true;
        _this.layout.isInitial = false;
        _this.layout.isOngoing = false;
        _this.model = $(go.GraphLinksModel, {
            modelData: {
                'units': 'meters',
                'unitsAbbreviation': 'm',
                'unitsConversionFactor': .02,
                'gridSize': 10,
                'wallThickness': 10,
                'preferences': {
                    showWallGuidelines: true,
                    showWallLengths: true,
                    showWallAngles: true,
                    showOnlySmallWallAngles: true,
                    showGrid: true,
                    gridSnap: true
                }
            }
        });
        _this.grid = $(go.Panel, 'Grid', { gridCellSize: new go.Size(_this.model.modelData.gridSize, _this.model.modelData.gridSize), visible: true }, $(go.Shape, 'LineH', { stroke: 'lightgray' }), $(go.Shape, 'LineV', { stroke: 'lightgray' }));
        _this.contextMenu = makeContextMenu();
        _this.commandHandler.canGroupSelection = function () { return true; };
        _this.commandHandler.canUngroupSelection = function () { return true; };
        _this.commandHandler.archetypeGroupData = { isGroup: true };
        _this.addDiagramListener('SelectionCopied', function (e) {
            var fp = e.diagram;
            fp.selection.iterator.each(function (part) {
                if (part.category === 'WallGroup') {
                    var w = part;
                    fp.updateWall(w);
                }
            });
        });
        _this.addDiagramListener('ExternalObjectsDropped', function (e) {
            var garbage = [];
            var fp = e.diagram;
            fp.selection.iterator.each(function (node) {
                if (node.category === 'FloorNode') {
                    var floorNode = node;
                    var pt = fp.lastInput.documentPoint;
                    fp.maybeAddRoomNode(pt, floorNode.data.floorImage);
                    garbage.push(floorNode);
                }
            });
            for (var i in garbage) {
                e.diagram.remove(garbage[i]);
            }
        });
        _this.addDiagramListener('ClipboardPasted', function (e) {
            var fp = e.diagram;
            e.diagram.selection.iterator.each(function (node) {
                if (node.category === 'WallGroup') {
                    var w = node;
                    fp.updateWall(w);
                }
            });
        });
        _this.addDiagramListener('ChangedSelection', function (e) {
            var floorplan = e.diagram;
            floorplan.skipsUndoManager = true;
            floorplan.startTransaction('remove dimension links and angle nodes');
            floorplan.pointNodes.iterator.each(function (node) { e.diagram.remove(node); });
            floorplan.dimensionLinks.iterator.each(function (link) { e.diagram.remove(link); });
            var missedDimensionLinks = [];
            floorplan.links.iterator.each(function (link) { if (link.data.category === 'DimensionLink')
                missedDimensionLinks.push(link); });
            for (var i = 0; i < missedDimensionLinks.length; i++) {
                e.diagram.remove(missedDimensionLinks[i]);
            }
            floorplan.pointNodes.clear();
            floorplan.dimensionLinks.clear();
            floorplan.angleNodes.iterator.each(function (node) { e.diagram.remove(node); });
            floorplan.angleNodes.clear();
            floorplan.commitTransaction('remove dimension links and angle nodes');
            floorplan.skipsUndoManager = false;
            floorplan.updateWallDimensions();
            floorplan.updateWallAngles();
        });
        _this.addDiagramListener('SelectionDeleted', function (e) {
            var wrt = e.diagram.toolManager.mouseDownTools.elt(3);
            wrt.joinAllColinearWalls();
            wrt.splitAllWalls();
            wrt.performAllMitering();
            var deletedParts = e.subject;
            var walls = new go.Set();
            deletedParts.iterator.each(function (p) {
                if (p instanceof go.Group && p.data.category === 'WallGroup') {
                    var w = p;
                    walls.add(w);
                }
            });
            var fp = e.diagram;
            fp.updateAllRoomBoundaries(walls);
        });
        _this.nodeTemplateMap.add('', makeDefaultNode());
        _this.nodeTemplateMap.add('MultiPurposeNode', makeMultiPurposeNode());
        _this.nodeTemplateMap.add('WindowNode', makeWindowNode());
        _this.nodeTemplateMap.add('PaletteWallNode', makePaletteWallNode());
        _this.nodeTemplateMap.add('DoorNode', makeDoorNode());
        _this.nodeTemplateMap.add('RoomNode', makeRoomNode());
        _this.groupTemplateMap.add('', makeDefaultGroup());
        _this.groupTemplateMap.add('WallGroup', makeWallGroup());
        var wallBuildingTool = new WallBuildingTool_js_1.WallBuildingTool();
        _this.toolManager.mouseDownTools.insertAt(0, wallBuildingTool);
        var wallReshapingTool = new WallReshapingTool_js_1.WallReshapingTool();
        _this.toolManager.mouseDownTools.insertAt(3, wallReshapingTool);
        wallBuildingTool.isEnabled = false;
        var nodeLabelDraggingTool = new NodeLabelDraggingTool_js_1.NodeLabelDraggingTool();
        _this.toolManager.mouseMoveTools.insertAt(3, nodeLabelDraggingTool);
        _this.toolManager.draggingTool.doDeactivate = function () {
            var fp = this.diagram;
            var tool = this;
            fp.updateWallAngles();
            this.isGridSnapEnabled = this.diagram.model.modelData.preferences.gridSnap;
            var selectedWall = null;
            fp.selection.iterator.each(function (p) {
                if (p.category === 'WallGroup' && selectedWall == null) {
                    var w = p;
                    selectedWall = w;
                }
                else if (p.category === 'WallGroup' && selectedWall !== null) {
                    selectedWall = undefined;
                }
            });
            if (selectedWall) {
                var selWallSet = new go.Set();
                selWallSet.add(selectedWall);
                fp.updateAllRoomBoundaries(selWallSet);
                var wrt = fp.toolManager.mouseDownTools.elt(3);
                wrt.performMiteringOnWall(selectedWall);
                fp.updateWall(selectedWall);
            }
            go.DraggingTool.prototype.doDeactivate.call(this);
        };
        _this.toolManager.draggingTool.doMouseMove = function () {
            if (this.diagram.lastInput.shift) {
                this.isGridSnapEnabled = false;
            }
            else
                this.isGridSnapEnabled = this.diagram.model.modelData.preferences.gridSnap;
            go.DraggingTool.prototype.doMouseMove.call(this);
        };
        _this.toolManager.resizingTool.doMouseMove = function () {
            var floorplan = this.diagram;
            floorplan.updateWallDimensions();
            go.ResizingTool.prototype.doMouseMove.call(this);
        };
        _this.toolManager.resizingTool.computeMaxSize = function () {
            var tool = this;
            var adornedObject = tool.adornedObject;
            if (adornedObject !== null) {
                var obj_1 = adornedObject.part;
                var wall = null;
                if (obj_1 !== null) {
                    wall = this.diagram.findPartForKey(obj_1.data.group);
                }
                if ((wall !== null && obj_1 !== null && (obj_1.category === 'DoorNode' || obj_1.category === 'WindowNode'))) {
                    var stationaryPt_1 = null;
                    var movingPt_1 = null;
                    var resizeAdornment = null;
                    var oitr = obj_1.adornments.iterator;
                    while (oitr.next()) {
                        var adorn = oitr.value;
                        if (adorn.name === 'WallPartResizeAdornment') {
                            resizeAdornment = adorn;
                        }
                    }
                    if (resizeAdornment !== null) {
                        var ritr = resizeAdornment.elements.iterator;
                        while (ritr.next()) {
                            var el = ritr.value;
                            var handle = tool.handle;
                            if (handle !== null) {
                                if (el instanceof go.Shape && el.alignment === handle.alignment) {
                                    movingPt_1 = el.getDocumentPoint(go.Spot.Center);
                                }
                                if (el instanceof go.Shape && el.alignment !== handle.alignment) {
                                    stationaryPt_1 = el.getDocumentPoint(go.Spot.Center);
                                }
                            }
                        }
                    }
                    var constrainingPt_1;
                    var closestDist_1 = Number.MAX_VALUE;
                    wall.memberParts.iterator.each(function (part) {
                        if (part.data.key !== obj_1.data.key) {
                            var endpoints = getWallPartEndpoints(part);
                            for (var i = 0; i < endpoints.length; i++) {
                                var point = endpoints[i];
                                var distanceToMovingPt = Math.sqrt(point.distanceSquaredPoint(movingPt_1));
                                if (distanceToMovingPt < closestDist_1) {
                                    var distanceToStationaryPt = Math.sqrt(point.distanceSquaredPoint(stationaryPt_1));
                                    if (distanceToStationaryPt > distanceToMovingPt) {
                                        closestDist_1 = distanceToMovingPt;
                                        constrainingPt_1 = point;
                                    }
                                }
                            }
                        }
                    });
                    if (constrainingPt_1 === undefined || constrainingPt_1 === null) {
                        if (wall.data.startpoint.distanceSquaredPoint(movingPt_1) > wall.data.startpoint.distanceSquaredPoint(stationaryPt_1))
                            constrainingPt_1 = wall.data.endpoint;
                        else
                            constrainingPt_1 = wall.data.startpoint;
                    }
                    var maxLength = 0;
                    if (stationaryPt_1 !== null) {
                        maxLength = Math.sqrt(stationaryPt_1.distanceSquaredPoint(constrainingPt_1));
                    }
                    return new go.Size(maxLength, wall.data.thickness);
                }
            }
            return go.ResizingTool.prototype.computeMaxSize.call(tool);
        };
        _this.toolManager.draggingTool.isGridSnapEnabled = true;
        return _this;
    }
    Object.defineProperty(Floorplan.prototype, "palettes", {
        get: function () { return this._palettes; },
        set: function (value) { this._palettes = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Floorplan.prototype, "pointNodes", {
        get: function () { return this._pointNodes; },
        set: function (value) { this._pointNodes = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Floorplan.prototype, "dimensionLinks", {
        get: function () { return this._dimensionLinks; },
        set: function (value) { this._dimensionLinks = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Floorplan.prototype, "angleNodes", {
        get: function () { return this._angleNodes; },
        set: function (value) { this._angleNodes = value; },
        enumerable: true,
        configurable: true
    });
    Floorplan.prototype.convertPixelsToUnits = function (num) {
        var units = this.model.modelData.units;
        var factor = this.model.modelData.unitsConversionFactor;
        return num * factor;
    };
    Floorplan.prototype.convertUnitsToPixels = function (num) {
        var units = this.model.modelData.units;
        var factor = this.model.modelData.unitsConversionFactor;
        return num / factor;
    };
    Floorplan.prototype.getUnitsAbbreviation = function (units) {
        switch (units) {
            case 'centimeters': {
                return 'cm';
            }
            case 'meters': {
                return 'm';
            }
            case 'inches': {
                return 'in';
            }
            case 'feet': {
                return 'ft';
            }
        }
        return units;
    };
    Floorplan.prototype.convertUnits = function (oldUnits, newUnits, num) {
        var fp = this;
        var newNum = num;
        oldUnits = fp.getUnitsAbbreviation(oldUnits);
        newUnits = fp.getUnitsAbbreviation(newUnits);
        switch (oldUnits) {
            case 'cm': {
                switch (newUnits) {
                    case 'm': {
                        newNum *= .01;
                        break;
                    }
                    case 'ft': {
                        newNum *= 0.0328084;
                        break;
                    }
                    case 'in': {
                        newNum *= 0.393701;
                        break;
                    }
                }
                break;
            }
            case 'm': {
                switch (newUnits) {
                    case 'cm': {
                        newNum *= 100;
                        break;
                    }
                    case 'ft': {
                        newNum *= 3.28084;
                        break;
                    }
                    case 'in': {
                        newNum *= 39.3701;
                        break;
                    }
                }
                break;
            }
            case 'ft': {
                switch (newUnits) {
                    case 'cm': {
                        newNum *= 30.48;
                        break;
                    }
                    case 'm': {
                        newNum *= 0.3048;
                        break;
                    }
                    case 'in': {
                        newNum *= 12;
                        break;
                    }
                }
                break;
            }
            case 'in': {
                switch (newUnits) {
                    case 'cm': {
                        newNum *= 2.54;
                        break;
                    }
                    case 'm': {
                        newNum *= 0.0254;
                        break;
                    }
                    case 'ft': {
                        newNum *= 0.0833333;
                        break;
                    }
                }
                break;
            }
        }
        return newNum;
    };
    Floorplan.prototype.makeDefaultFurniturePaletteNodeData = function () {
        return FURNITURE_NODE_DATA_ARRAY;
    };
    Floorplan.prototype.makeDefaultWallpartsPaletteNodeData = function () {
        return WALLPARTS_NODE_DATA_ARRAY;
    };
    Floorplan.prototype.enableWallBuilding = function () {
        var fp = this;
        var wallBuildingTool = fp.toolManager.mouseDownTools.elt(0);
        wallBuildingTool.isBuildingDivider = false;
        var wallReshapingTool = fp.toolManager.mouseDownTools.elt(3);
        wallBuildingTool.isEnabled = true;
        wallReshapingTool.isEnabled = false;
        fp.currentCursor = 'crosshair';
        fp.nodes.iterator.each(function (n) { n.clearAdornments(); });
        fp.clearSelection();
    };
    Floorplan.prototype.enableDividerBuilding = function () {
        var fp = this;
        var wallBuildingTool = fp.toolManager.mouseDownTools.elt(0);
        fp.enableWallBuilding();
        wallBuildingTool.isBuildingDivider = true;
        fp.currentCursor = 'crosshair';
    };
    Floorplan.prototype.disableWallBuilding = function () {
        var fp = this;
        var wallBuildingTool = fp.toolManager.mouseDownTools.elt(0);
        var wallReshapingTool = fp.toolManager.mouseDownTools.elt(3);
        wallBuildingTool.isEnabled = false;
        wallReshapingTool.isEnabled = true;
        wallBuildingTool.isBuildingDivider = false;
        fp.currentCursor = '';
        fp.nodes.iterator.each(function (n) { n.clearAdornments(); });
        fp.clearSelection();
    };
    Floorplan.prototype.checkboxChanged = function (checkboxId) {
        var floorplan = this;
        floorplan.skipsUndoManager = true;
        floorplan.startTransaction('change preference');
        var element = document.getElementById(checkboxId);
        switch (checkboxId) {
            case 'showGridCheckbox': {
                floorplan.grid.visible = element.checked;
                floorplan.model.modelData.preferences.showGrid = element.checked;
                break;
            }
            case 'gridSnapCheckbox': {
                floorplan.toolManager.draggingTool.isGridSnapEnabled = element.checked;
                floorplan.model.modelData.preferences.gridSnap = element.checked;
                break;
            }
            case 'wallGuidelinesCheckbox':
                floorplan.model.modelData.preferences.showWallGuidelines = element.checked;
                break;
            case 'wallLengthsCheckbox':
                floorplan.model.modelData.preferences.showWallLengths = element.checked;
                floorplan.updateWallDimensions();
                break;
            case 'wallAnglesCheckbox':
                floorplan.model.modelData.preferences.showWallAngles = element.checked;
                floorplan.updateWallAngles();
                break;
            case 'onlySmallWallAnglesCheckbox': {
                floorplan.model.modelData.preferences.showOnlySmallWallAngles = element.checked;
                floorplan.updateWallAngles();
                break;
            }
        }
        floorplan.commitTransaction('change preference');
        floorplan.skipsUndoManager = false;
    };
    Floorplan.prototype.changeUnits = function (form) {
        var fp = this;
        var radios = form.getElementsByTagName('input');
        var prevUnits = fp.model.modelData.units;
        for (var i = 0; i < radios.length; i++) {
            var radio = radios[i];
            if (radio.checked) {
                var unitsStr = radio.id;
                fp.model.setDataProperty(fp.model.modelData, 'units', unitsStr);
                switch (radio.id) {
                    case 'centimeters':
                        fp.model.setDataProperty(fp.model.modelData, 'unitsAbbreviation', 'cm');
                        break;
                    case 'meters':
                        fp.model.setDataProperty(fp.model.modelData, 'unitsAbbreviation', 'm');
                        break;
                    case 'feet':
                        fp.model.setDataProperty(fp.model.modelData, 'unitsAbbreviation', 'ft');
                        break;
                    case 'inches':
                        fp.model.setDataProperty(fp.model.modelData, 'unitsAbbreviation', 'in');
                        break;
                }
            }
        }
        var unitsAbbreviation = fp.model.modelData.unitsAbbreviation;
        var unitAbbrevInputs = document.getElementsByClassName('unitsBox');
        for (var i = 0; i < unitAbbrevInputs.length; i++) {
            var uaInput = unitAbbrevInputs[i];
            uaInput.value = unitsAbbreviation;
        }
        var unitsConversionFactorInput = document.getElementById('unitsConversionFactorInput');
        var oldUnitsConversionFactor = parseFloat(unitsConversionFactorInput.value);
        var units = fp.model.modelData.units;
        var newUnitsConverstionFactor = fp.convertUnits(prevUnits, units, oldUnitsConversionFactor);
        fp.model.setDataProperty(fp.model.modelData, 'unitsConversionFactor', newUnitsConverstionFactor);
        unitsConversionFactorInput.value = newUnitsConverstionFactor.toString();
        var unitInputs = document.getElementsByClassName('unitsInput');
        for (var i = 0; i < unitInputs.length; i++) {
            var input = unitInputs[i];
            if (input.id !== 'unitsConversionFactorInput') {
                var value = parseFloat(input.value);
                value = parseFloat(fp.convertUnits(prevUnits, units, value).toFixed(4));
                input.value = value.toString();
            }
        }
    };
    Floorplan.prototype.changeUnitsConversionFactor = function (unitsConversionFactorInput, gridSizeInput) {
        var floorplan = this;
        var val = parseFloat(unitsConversionFactorInput.value);
        if (isNaN(val) || !val || val === undefined)
            return;
        floorplan.skipsUndoManager = true;
        floorplan.model.set(floorplan.model.modelData, 'unitsConversionFactor', val);
        if (gridSizeInput) {
            floorplan.changeGridSize(gridSizeInput);
        }
        floorplan.skipsUndoManager = false;
    };
    Floorplan.prototype.changeGridSize = function (gridSizeInput) {
        var fp = this;
        fp.skipsUndoManager = true;
        fp.startTransaction('change grid size');
        var inputVal = 0;
        if (!isNaN(parseFloat(gridSizeInput.value)) && gridSizeInput.value != null && gridSizeInput.value !== '' &&
            gridSizeInput.value !== undefined && parseFloat(gridSizeInput.value) > 0)
            inputVal = parseFloat(gridSizeInput.value);
        else {
            gridSizeInput.value = fp.convertPixelsToUnits(10).toString();
            inputVal = parseFloat(gridSizeInput.value);
        }
        inputVal = fp.convertUnitsToPixels(inputVal);
        fp.grid.gridCellSize = new go.Size(inputVal, inputVal);
        fp.model.setDataProperty(fp.model.modelData, 'gridSize', inputVal);
        fp.commitTransaction('change grid size');
        fp.skipsUndoManager = false;
    };
    Floorplan.prototype.getCounterClockwiseWallSide = function (w, ip) {
        var fp = this;
        var wrt = fp.toolManager.mouseDownTools.elt(3);
        var prop1 = null;
        var prop2 = null;
        if (wrt.pointsApproximatelyEqual(w.data.endpoint, ip)) {
            prop1 = 'smpt1';
            prop2 = 'smpt2';
        }
        else {
            prop1 = 'empt1';
            prop2 = 'empt2';
        }
        var A = ip;
        var B = w.data[prop2];
        var C = w.data[prop1];
        function isClockwise(a, b, c) {
            var bool = ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0;
            return bool;
        }
        if (!isClockwise(A, B, C)) {
            return 1;
        }
        else
            return 2;
    };
    Floorplan.prototype.getLinesIntersection = function (a1, a2, b1, b2) {
        var am = (a1.y - a2.y) / (a1.x - a2.x);
        var bm = (b1.y - b2.y) / (b1.x - b2.x);
        if (am === Infinity || am === -Infinity) {
            var ipx = a1.x;
            var bi = -1 * ((bm * b1.x) - b1.y);
            var ipy = (bm * ipx) + bi;
            return new go.Point(ipx, ipy);
        }
        if (bm === Infinity || bm === -Infinity) {
            var ipx = b1.x;
            var ai = -1 * ((am * a1.x) - a1.y);
            var ipy = (am * ipx) + ai;
            return new go.Point(ipx, ipy);
        }
        if (Math.abs(am - bm) < Math.pow(2, -52)) {
            return null;
        }
        else {
            var ipx = (am * a1.x - bm * b1.x + b1.y - a1.y) / (am - bm);
            var ipy = (am * bm * (b1.x - a1.x) + bm * a1.y - am * b1.y) / (bm - am);
            var ip = new go.Point(ipx, ipy);
            return ip;
        }
    };
    Floorplan.prototype.updateAllRoomBoundaries = function (changedWalls) {
        var fp = this;
        var wrt = fp.toolManager.mouseDownTools.elt(3);
        var rooms = fp.findNodesByExample({ category: 'RoomNode' });
        var garbage = [];
        rooms.iterator.each(function (r) {
            var boundsFound = false;
            var triedAllIntersections = false;
            var seenW1 = new go.Set();
            while (!boundsFound && !triedAllIntersections) {
                var bw = r.data.boundaryWalls;
                var e1 = null;
                var e2 = null;
                for (var i = 0; i < bw.length + 1; i++) {
                    var entry = bw[i % (bw.length)];
                    var wk = entry[0];
                    var ww = fp.findNodeForKey(wk);
                    if (ww === null)
                        continue;
                    if (!changedWalls.contains(ww) && !seenW1.contains(ww)) {
                        if (e1 === null) {
                            e1 = entry;
                        }
                        else if (e1 !== null && e2 === null) {
                            e2 = entry;
                        }
                    }
                    else if (e1 !== null && e2 === null) {
                        e2 = entry;
                    }
                    else if (e1 === null) {
                        e1 = null;
                        e2 = null;
                    }
                }
                var w1 = null;
                var w2 = null;
                var s1 = null;
                var s2 = null;
                if (e1 !== null && e2 !== null) {
                    w1 = fp.findNodeForKey(e1[0]);
                    s1 = e1[1];
                    w2 = fp.findNodeForKey(e2[0]);
                    s2 = e2[1];
                }
                else {
                    triedAllIntersections = true;
                    continue;
                }
                if (e1 !== null && w1 !== null) {
                    seenW1.add(w1);
                }
                var w1s = w1.data['smpt' + s1];
                var w1e = w1.data['empt' + s1];
                var w2s = w2.data['smpt' + s2];
                var w2e = w2.data['empt' + s2];
                var ip = fp.getSegmentsIntersection(w1s, w1e, w2s, w2e);
                if (ip === null) {
                    continue;
                }
                var w1os = (s1 === 1) ? 2 : 1;
                var distToS = ip.distanceSquaredPoint(w1.data['smpt' + w1os]);
                var distToE = ip.distanceSquaredPoint(w1.data['empt' + w1os]);
                var oip = distToS <= distToE ? w1.data.startpoint : w1.data.endpoint;
                var ang = oip.directionPoint(ip);
                var newPt = wrt.translateAndRotatePoint(ip, ang - 90, 0.5);
                boundsFound = fp.maybeAddRoomNode(newPt, r.data.floorImage, r);
            }
            if (!boundsFound) {
                garbage.push(r);
            }
        });
        for (var i = 0; i < garbage.length; i++) {
            fp.remove(garbage[i]);
        }
        fp.updateAllTargetBindings();
    };
    Floorplan.prototype.maybeAddRoomNode = function (pt, floorImage, roomToUpdate) {
        if (roomToUpdate === undefined || roomToUpdate === null) {
            roomToUpdate = null;
        }
        var fp = this;
        var walls = fp.findNodesByExample({ category: 'WallGroup' });
        var isPtOnRoomOrWall = false;
        walls.iterator.each(function (w) {
            if (fp.isPointInWall(w, pt)) {
                isPtOnRoomOrWall = true;
            }
        });
        var rooms = fp.findNodesByExample({ category: 'RoomNode' });
        rooms.iterator.each(function (r) {
            if (roomToUpdate === null || (roomToUpdate !== null && roomToUpdate !== undefined && roomToUpdate.data.key !== r.data.key)) {
                var isInRoom = fp.isPointInRoom(r, pt);
                if (isInRoom) {
                    var isPtInHole = false;
                    for (var i = 0; i < r.data.holes.length; i++) {
                        var hole = r.data.holes[i];
                        var polygon = fp.makePolygonFromRoomBoundaries(hole);
                        if (polygon !== null) {
                            if (fp.isPointInPolygon(polygon.toArray(), pt)) {
                                isPtInHole = true;
                            }
                        }
                    }
                    if (!isPtInHole) {
                        isPtOnRoomOrWall = true;
                    }
                }
            }
        });
        if (isPtOnRoomOrWall) {
            return false;
        }
        var boundaryWalls = fp.getRoomWalls(pt);
        if (boundaryWalls === null) {
            return false;
        }
        var holes = fp.findRoomHoles(boundaryWalls, pt);
        if (roomToUpdate !== null) {
            fp.startTransaction('update room boundaryWalls and holes');
            fp.model.setDataProperty(roomToUpdate.data, 'boundaryWalls', boundaryWalls);
            fp.model.setDataProperty(roomToUpdate.data, 'holes', holes);
            fp.commitTransaction('update room boundaryWalls and holes');
        }
        else {
            if (floorImage === null || floorImage === undefined) {
                floorImage = 'images/textures/floor1.jpg';
            }
            var roomData = {
                key: 'Room', category: 'RoomNode', name: 'Room Name',
                boundaryWalls: boundaryWalls, holes: holes, floorImage: floorImage, showLabel: true, showFlooringOptions: true
            };
            fp.model.addNodeData(roomData);
            roomToUpdate = fp.findPartForData(roomData);
        }
        fp.updateRoom(roomToUpdate);
        return true;
    };
    Floorplan.prototype.getRoomWalls = function (pt) {
        var fp = this;
        var walls = fp.findNodesByExample({ category: 'WallGroup' });
        var oPt = new go.Point(pt.x, pt.y - 10000);
        var wallsDistArr = [];
        walls.iterator.each(function (w) {
            var ip = fp.getSegmentsIntersection(pt, oPt, w.data.startpoint, w.data.endpoint);
            if (ip !== null) {
                var dist = Math.sqrt(ip.distanceSquaredPoint(pt));
                wallsDistArr.push([w, dist]);
            }
        });
        wallsDistArr.sort(function (a, b) {
            var distA = a[1];
            var distB = b[1];
            if (distA === distB)
                return 0;
            else if (distA < distB)
                return -1;
            else
                return 1;
        });
        function selectivelyCopyPath(path, nodeToStopAt) {
            var p = [];
            var copyNoMore = false;
            for (var i = 0; i < path.length; i++) {
                var entry = path[i];
                var wk = entry[0];
                var w = fp.findNodeForKey(wk);
                var side = entry[1];
                if (!copyNoMore) {
                    p.push([w.data.key, side]);
                    if (w.data.key === nodeToStopAt.data.key) {
                        copyNoMore = true;
                    }
                }
            }
            return p;
        }
        function recursivelyFindPaths(wall, path, possiblePaths, seenWalls, origWall, prevPt) {
            if (wall === null) {
                return null;
            }
            if (seenWalls === undefined || seenWalls === null) {
                seenWalls = new go.Set();
            }
            seenWalls.add(wall);
            var wrt = fp.toolManager.mouseDownTools.elt(3);
            var sPt = wall.data.startpoint;
            var ePt = wall.data.endpoint;
            var mpt = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
            var sa = mpt.directionPoint(sPt);
            var ip;
            var op;
            if (prevPt === undefined || prevPt === null) {
                ip = (sa >= 90 && sa <= 270) ? sPt : ePt;
                op = (sa >= 90 && sa <= 270) ? ePt : sPt;
            }
            else {
                ip = (wrt.pointsApproximatelyEqual(sPt, prevPt)) ? ePt : sPt;
                op = (wrt.pointsApproximatelyEqual(sPt, prevPt)) ? sPt : ePt;
            }
            var ccWalls = wrt.getAllWallsAtIntersection(ip, true);
            ccWalls.sort(function (a, b) {
                var B = fp.getWallsIntersection(a, b);
                if (B === null)
                    return 0;
                var as = a.data.startpoint;
                var ae = a.data.endpoint;
                var bs = b.data.startpoint;
                var be = b.data.endpoint;
                var A = wrt.pointsApproximatelyEqual(ip, as) ? ae : as;
                var C = wrt.pointsApproximatelyEqual(ip, bs) ? be : bs;
                var angA = B.directionPoint(A);
                var angB = B.directionPoint(C);
                if (angA > angB)
                    return 1;
                else if (angA < angB)
                    return -1;
                else
                    return 0;
            });
            var intersectionWalls = ccWalls.toArray();
            var intersectionWallsReordered = [];
            var j = intersectionWalls.indexOf(wall);
            for (var i = 0; i < intersectionWalls.length; i++) {
                var w = intersectionWalls[j];
                intersectionWallsReordered.push(w);
                j = (j + 1) % intersectionWalls.length;
            }
            ccWalls.clear();
            for (var i = 0; i < intersectionWallsReordered.length; i++) {
                var w = intersectionWallsReordered[i];
                ccWalls.add(w);
            }
            ccWalls.iterator.each(function (w) {
                if (w === undefined || w === null) {
                    possiblePaths = new go.Set();
                    return possiblePaths;
                }
                if ((w.data.key === origWall.data.key || ccWalls.contains(origWall)) && wall.data.key !== origWall.data.key) {
                    if (path !== null) {
                        possiblePaths.add(path);
                    }
                }
                else if (seenWalls !== null && !seenWalls.contains(w)) {
                    if (path === undefined || path === null) {
                        path = [];
                        var ip1 = fp.getLinesIntersection(pt, oPt, wall.data.smpt1, wall.data.empt1);
                        var ip2 = fp.getLinesIntersection(pt, oPt, wall.data.smpt2, wall.data.empt2);
                        if (ip1 !== null && ip2 !== null) {
                            var dist1 = Math.sqrt(ip1.distanceSquaredPoint(pt));
                            var dist2 = Math.sqrt(ip2.distanceSquaredPoint(pt));
                            var side1 = (dist1 < dist2) ? 1 : 2;
                            path.push([wall.data.key, side1]);
                        }
                    }
                    else {
                        path = selectivelyCopyPath(path, wall);
                    }
                    var side = fp.getCounterClockwiseWallSide(w, ip);
                    path.push([w.data.key, side]);
                    recursivelyFindPaths(w, path, possiblePaths, seenWalls, origWall, ip);
                }
            });
            return possiblePaths;
        }
        var roomOuterBoundaryPts = null;
        var roomOuterBoundaryPath = null;
        for (var i = 0; i < wallsDistArr.length; i++) {
            var entry = wallsDistArr[i];
            var w = entry[0];
            var path = [];
            var possiblePaths = new go.Set();
            possiblePaths = recursivelyFindPaths(w, null, possiblePaths, null, w, null);
            if (possiblePaths === null || possiblePaths.count === 0)
                continue;
            path = possiblePaths.first();
            var polygon = fp.makePolygonFromRoomBoundaries(path);
            if (polygon !== null) {
                var pathIncludesInternalWall = false;
                for (var j = 0; j < path.length; j++) {
                    var e = path[j];
                    var wwk = e[0];
                    var ww = fp.findNodeForKey(wwk);
                    var ept = ww.data.endpoint;
                    var spt = ww.data.startpoint;
                    if (fp.isPointInPolygon(polygon.toArray(), ept) || fp.isPointInPolygon(polygon.toArray(), spt)) {
                        pathIncludesInternalWall = true;
                    }
                }
                if (fp.isPointInPolygon(polygon.toArray(), pt)) {
                    roomOuterBoundaryPts = polygon;
                    roomOuterBoundaryPath = path;
                    break;
                }
            }
        }
        if (roomOuterBoundaryPts !== null) {
            var newRoomBoundaryWalls = fp.addInternalWallsToRoom(roomOuterBoundaryPts, roomOuterBoundaryPath);
            return newRoomBoundaryWalls;
        }
        else {
            return null;
        }
    };
    Floorplan.prototype.makePolygonFromRoomBoundaries = function (path) {
        var fp = this;
        var polygon = new go.List();
        var boundaryWalls = path;
        if (boundaryWalls === null || boundaryWalls.length < 2) {
            return null;
        }
        var firstWallKey = boundaryWalls[0][0];
        var firstWall = fp.findNodeForKey(firstWallKey);
        var firstSide = boundaryWalls[0][1];
        var secondWallKey = boundaryWalls[1][0];
        var secondWall = fp.findNodeForKey(secondWallKey);
        if (firstWall === null || secondWall === null) {
            return null;
        }
        var ip = fp.getWallsIntersection(firstWall, secondWall);
        if (ip === null)
            return null;
        var propS = 'smpt' + firstSide;
        var propE = 'empt' + firstSide;
        var ptS = firstWall.data[propS];
        var ptE = firstWall.data[propE];
        var distS = Math.sqrt(ip.distanceSquaredPoint(ptS));
        var distE = Math.sqrt(ip.distanceSquaredPoint(ptE));
        var closestPt = (distS < distE) ? ptS : ptE;
        var farthestPt = closestPt.equals(ptS) ? ptE : ptS;
        polygon.add(farthestPt);
        polygon.add(closestPt);
        var prevPt = closestPt;
        var prevWall = firstWall;
        for (var i = 0; i < boundaryWalls.length; i++) {
            var entry = boundaryWalls[i];
            if (typeof entry === 'string')
                continue;
            var wk = entry[0];
            var w = fp.findNodeForKey(wk);
            if (w === null) {
                return null;
            }
            var s = entry[1];
            if (w.data.key !== firstWall.data.key) {
                var propS1 = 'smpt' + s;
                var propE1 = 'empt' + s;
                var ptS1 = w.data[propS1];
                var ptE1 = w.data[propE1];
                var distS1 = Math.sqrt(prevPt.distanceSquaredPoint(ptS1));
                var distE1 = Math.sqrt(prevPt.distanceSquaredPoint(ptE1));
                var closestPt1 = (distS1 < distE1) ? ptS1 : ptE1;
                var farthestPt1 = closestPt1.equals(ptS1) ? ptE1 : ptS1;
                polygon.add(closestPt1);
                polygon.add(farthestPt1);
                prevPt = farthestPt1;
                prevWall = w;
            }
        }
        return polygon;
    };
    Floorplan.prototype.sortWallsClockwise = function (a, b) {
        var fp = this;
        var wrt = fp.toolManager.mouseDownTools.elt(3);
        var B = fp.getWallsIntersection(a, b);
        if (B === null) {
            return 0;
        }
        var as = a.data.startpoint;
        var ae = a.data.endpoint;
        var bs = b.data.startpoint;
        var be = b.data.endpoint;
        var ip = fp.getSegmentsIntersection(as, ae, bs, be);
        if (ip === null) {
            return 0;
        }
        var A = wrt.pointsApproximatelyEqual(ip, as) ? ae : as;
        var C = wrt.pointsApproximatelyEqual(ip, bs) ? be : bs;
        var angA = B.directionPoint(A);
        var angB = B.directionPoint(C);
        if (angA > angB)
            return 1;
        else if (angA < angB)
            return -1;
        else
            return 0;
    };
    Floorplan.prototype.sortWallsClockwiseWithSetStartWall = function (walls, wall) {
        var fp = this;
        walls.sort(function (a, b) {
            return fp.sortWallsClockwise(a, b);
        });
        var intersectionWalls = walls.toArray();
        var intersectionWallsReordered = [];
        var j = intersectionWalls.indexOf(wall);
        for (var i = 0; i < intersectionWalls.length; i++) {
            var w = intersectionWalls[j];
            intersectionWallsReordered.push(w);
            j = (j + 1) % intersectionWalls.length;
        }
        walls.clear();
        for (var i = 0; i < intersectionWallsReordered.length; i++) {
            var w = intersectionWallsReordered[i];
            walls.add(w);
        }
        return walls;
    };
    Floorplan.prototype.addInternalWallsToRoom = function (roomOuterBoundaryPts, roomOuterBoundaryPath) {
        var fp = this;
        var walls = fp.findNodesByExample({ category: 'WallGroup' });
        var offendingWalls = new go.Set();
        walls.iterator.each(function (w) {
            var s = w.data.startpoint;
            var e = w.data.endpoint;
            if (fp.isPointInPolygon(roomOuterBoundaryPts.toArray(), s) || fp.isPointInPolygon(roomOuterBoundaryPts.toArray(), e)) {
                offendingWalls.add(w);
            }
        });
        function recursivelyFindInteralClusterPath(wall, iwalls, ip, seenIp, path, bw1, bw2) {
            seenIp.add(go.Point.stringify(ip));
            iwalls.iterator.each(function (fw) {
                if (fw.data.key !== wall.data.key) {
                    if (fw.data.key === bw2.data.key) {
                        if (path.indexOf('isDone') === -1) {
                            path.push('isDone');
                        }
                        return path;
                    }
                    if (path.indexOf('isDone') !== -1) {
                        return path;
                    }
                    var side = null;
                    side = fp.getCounterClockwiseWallSide(fw, ip);
                    var entry = [fw.data.key, side];
                    for (var i = 0; i < path.length; i++) {
                        var e = path[i];
                        var wk = e[0];
                        var w = fp.findNodeForKey(wk);
                        var s = e[1];
                        if (fw.data.key === w.data.key && s === side) {
                            return;
                        }
                    }
                    path.push(entry);
                    var otherEndpoint = (wrt.pointsApproximatelyEqual(ip, fw.data.startpoint)) ? fw.data.endpoint : fw.data.startpoint;
                    var iw = wrt.getAllWallsAtIntersection(otherEndpoint, true);
                    if (iw !== null && iw.count > 1) {
                        iw = fp.sortWallsClockwiseWithSetStartWall(iw, fw);
                    }
                    var hasNotSeenIp = false;
                    if (!seenIp.contains(go.Point.stringify(otherEndpoint))) {
                        hasNotSeenIp = true;
                    }
                    var alreadySeen = false;
                    if (!hasNotSeenIp) {
                        var fiw = iw.toArray()[1];
                        var side2 = fp.getCounterClockwiseWallSide(fiw, otherEndpoint);
                        for (var i = 0; i < path.length; i++) {
                            var entry1 = path[i];
                            var wk = entry1[0];
                            var w = fp.findNodeForKey(wk);
                            var s = entry1[1];
                            if (w.data.key === fiw.data.key && s === side2) {
                                alreadySeen = true;
                            }
                        }
                    }
                    var atFinalIp = iw.contains(bw1);
                    var doContinue = hasNotSeenIp ? true : (!alreadySeen && !atFinalIp);
                    if (iw.count > 1 && doContinue) {
                        return recursivelyFindInteralClusterPath(fw, iw, otherEndpoint, seenIp, path, bw1, bw2);
                    }
                    else if (!atFinalIp) {
                        var otherSide = (side === 1) ? 2 : 1;
                        var entry2 = [fw.data.key, otherSide];
                        path.push(entry2);
                        var iw2 = wrt.getAllWallsAtIntersection(ip, true);
                        if (iw2 !== null && iw2.count > 1) {
                            iw2 = fp.sortWallsClockwiseWithSetStartWall(iw2, fw);
                        }
                        return recursivelyFindInteralClusterPath(fw, iw2, ip, seenIp, path, bw1, bw2);
                    }
                    else if (path.indexOf('isDone') === -1) {
                        path.push('isDone');
                        return;
                    }
                }
            });
            return path;
        }
        var wrt = fp.toolManager.mouseDownTools.elt(3);
        var handledWalls = new go.Set();
        var internalPathsToInsert = new go.Map();
        offendingWalls.iterator.each(function (ow) {
            if (!handledWalls.contains(ow)) {
                var ows = ow.data.startpoint;
                var owe = ow.data.endpoint;
                var bw1 = null;
                var bw2 = null;
                var ip_1 = null;
                for (var i = 0; i < roomOuterBoundaryPath.length; i++) {
                    var entry = roomOuterBoundaryPath[i];
                    if (typeof entry === 'string')
                        continue;
                    var wk = entry[0];
                    var w = fp.findNodeForKey(wk);
                    var s = w.data.startpoint;
                    var e = w.data.endpoint;
                    if (wrt.pointsApproximatelyEqual(s, ows) || wrt.pointsApproximatelyEqual(s, owe)
                        || wrt.pointsApproximatelyEqual(e, ows) || wrt.pointsApproximatelyEqual(e, owe)) {
                        if (bw1 === null) {
                            bw1 = w;
                            ip_1 = fp.getSegmentsIntersection(bw1.data.startpoint, bw1.data.endpoint, ows, owe);
                        }
                        else {
                            bw2 = w;
                        }
                    }
                }
                if (ip_1 !== null && bw1 !== null && bw2 !== null &&
                    roomOuterBoundaryPath[0][0] === bw1.data.key && roomOuterBoundaryPath[roomOuterBoundaryPath.length - 1][0] === bw2.data.key) {
                    var temp = null;
                    temp = bw1;
                    bw1 = bw2;
                    bw2 = temp;
                }
                if (ip_1 !== null) {
                    var intersectionWalls_1 = new go.List();
                    if (bw1 !== null) {
                        intersectionWalls_1.add(bw1);
                    }
                    offendingWalls.iterator.each(function (ow2) {
                        var ow2s = ow2.data.startpoint;
                        var ow2e = ow2.data.endpoint;
                        if (ip_1 !== null) {
                            if (wrt.pointsApproximatelyEqual(ow2s, ip_1) || wrt.pointsApproximatelyEqual(ow2e, ip_1)) {
                                intersectionWalls_1.add(ow2);
                                handledWalls.add(ow2);
                            }
                        }
                    });
                    if (bw2 !== null) {
                        intersectionWalls_1.add(bw2);
                    }
                    if (bw1 !== null) {
                        intersectionWalls_1 = fp.sortWallsClockwiseWithSetStartWall(intersectionWalls_1, bw1);
                    }
                    var path = [];
                    var seenIp = new go.Set();
                    if (bw1 !== null && bw2 !== null) {
                        var p = recursivelyFindInteralClusterPath(bw1, intersectionWalls_1, ip_1, seenIp, path, bw1, bw2);
                        p = p.slice(0, p.length - 1);
                        internalPathsToInsert.add(bw1, p);
                    }
                }
            }
        });
        internalPathsToInsert.iterator.each(function (kvp) {
            var bw = kvp.key;
            var path = kvp.value;
            var insertionIndex;
            for (var i = 0; i < roomOuterBoundaryPath.length; i++) {
                var entry = roomOuterBoundaryPath[i];
                if (typeof entry === 'string')
                    continue;
                var entryWk = entry[0];
                var entryW = fp.findNodeForKey(entryWk);
                if (entryW.data.key === bw.data.key) {
                    insertionIndex = i + 1;
                }
            }
            var firstArr = roomOuterBoundaryPath.slice(0, insertionIndex);
            var secondArr = roomOuterBoundaryPath.slice(insertionIndex, roomOuterBoundaryPath.length);
            roomOuterBoundaryPath = firstArr.concat(path).concat(secondArr);
        });
        return roomOuterBoundaryPath;
    };
    Floorplan.prototype.getClockwiseWallEndpoint = function (w, side) {
        var fp = this;
        var wrt = fp.toolManager.mouseDownTools.elt(3);
        var ip = null;
        var op = null;
        var sPt = w.data['smpt' + side];
        var ePt = w.data['empt' + side];
        var mPt = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
        var a = sPt.directionPoint(ePt) + 180;
        var offset = w.data.thickness / 2;
        var pt1 = wrt.translateAndRotatePoint(mPt, a, offset);
        var pt2 = wrt.translateAndRotatePoint(mPt, a + 180, offset);
        var insidePt = null;
        var outsidePt = null;
        function isPointLeftOfRay(pt, rayS, rayE) {
            return (pt.y - rayS.y) * (rayE.x - rayS.x)
                > (pt.x - rayS.x) * (rayE.y - rayS.y);
        }
        if (fp.isPointInWall(w, pt1)) {
            insidePt = pt1;
            outsidePt = pt2;
        }
        else {
            insidePt = pt2;
            outsidePt = pt1;
        }
        if (isPointLeftOfRay(insidePt, sPt, ePt)) {
            ip = w.data.endpoint;
            op = w.data.startpoint;
        }
        else {
            ip = w.data.startpoint;
            op = w.data.endpoint;
        }
        return ip;
    };
    Floorplan.prototype.findRoomHoles = function (roomBoundaryWalls, pt) {
        var fp = this;
        var wrt = fp.toolManager.mouseDownTools.elt(3);
        var walls = fp.findNodesByExample({ category: 'WallGroup' });
        var offendingWalls = new go.Set();
        var roomOuterBoundaryPts = fp.makePolygonFromRoomBoundaries(roomBoundaryWalls);
        walls.iterator.each(function (w) {
            var s = w.data.startpoint;
            var e = w.data.endpoint;
            if (roomOuterBoundaryPts !== null && (fp.isPointInPolygon(roomOuterBoundaryPts.toArray(), s) || fp.isPointInPolygon(roomOuterBoundaryPts.toArray(), e))) {
                var isBoundaryWall = false;
                for (var i = 0; i < roomBoundaryWalls.length; i++) {
                    var entry = roomBoundaryWalls[i];
                    var wallKey = entry[0];
                    var wall = fp.findNodeForKey(wallKey);
                    if (wall.data.key === w.data.key) {
                        isBoundaryWall = true;
                    }
                }
                if (!isBoundaryWall) {
                    offendingWalls.add(w);
                }
            }
        });
        var seenWalls = new go.Set();
        function recursivelyFindHolePath(w, seenIp, path, prevPt, origWall) {
            var side = null;
            if (path === null || path === undefined) {
                path = [];
                var ws = w.data.startpoint;
                var we = w.data.endpoint;
                var mPt = new go.Point((ws.x + we.x) / 2, (ws.y + we.y) / 2);
                var ip1 = fp.getLinesIntersection(pt, mPt, w.data.smpt1, w.data.empt1);
                var ip2 = fp.getLinesIntersection(pt, mPt, w.data.smpt2, w.data.empt2);
                if (ip1 !== null && ip2 !== null) {
                    var dist1 = Math.sqrt(ip1.distanceSquaredPoint(pt));
                    var dist2 = Math.sqrt(ip2.distanceSquaredPoint(pt));
                    side = (dist1 < dist2) ? 1 : 2;
                    seenWalls.add(w);
                    path.push([w.data.key, side]);
                }
            }
            if (path.indexOf('isDone') !== -1) {
                return path;
            }
            var ip = null;
            var op = null;
            var sPt = w.data.startpoint;
            var ePt = w.data.endpoint;
            if (prevPt !== null && prevPt !== undefined) {
                ip = (wrt.pointsApproximatelyEqual(sPt, prevPt)) ? ePt : sPt;
                op = (wrt.pointsApproximatelyEqual(sPt, prevPt)) ? sPt : ePt;
            }
            else {
                if (side !== null) {
                    ip = fp.getClockwiseWallEndpoint(w, side);
                    if (ip !== null) {
                        op = (wrt.pointsApproximatelyEqual(ip, sPt)) ? ePt : sPt;
                    }
                }
            }
            if (seenIp === null || seenIp === undefined) {
                seenIp = new go.Set();
            }
            if (ip !== null) {
                seenIp.add(go.Point.stringify(ip));
            }
            var iw = wrt.getAllWallsAtIntersection(ip, true);
            var oiw = wrt.getAllWallsAtIntersection(op, true);
            if (iw !== null && iw.count > 1) {
                iw = fp.sortWallsClockwiseWithSetStartWall(iw, w);
            }
            var hasNotSeenIp = false;
            if (ip !== null && !seenIp.contains(go.Point.stringify(ip))) {
                hasNotSeenIp = true;
            }
            var alreadySeen = false;
            if (!hasNotSeenIp && iw.toArray().length > 0) {
                var fiw = null;
                if (iw.toArray().length > 1) {
                    fiw = iw.toArray()[1];
                }
                else {
                    fiw = iw.toArray()[0];
                }
                if (ip !== null) {
                    var side2 = fp.getCounterClockwiseWallSide(fiw, ip);
                    for (var i = 0; i < path.length; i++) {
                        var entry = path[i];
                        var wk = entry[0];
                        var ww = fp.findNodeForKey(wk);
                        var s = entry[1];
                        if (ww.data.key === fiw.data.key && s === side2) {
                            alreadySeen = true;
                        }
                    }
                }
            }
            var s1 = false;
            var s2 = false;
            for (var i = 0; i < path.length; i++) {
                var entry = path[i];
                var wwk = entry[0];
                var ww = fp.findNodeForKey(wwk);
                if (ww.data.key === w.data.key && !s1) {
                    s1 = true;
                }
                else if (ww.data.key === w.data.key && s1 && !s2) {
                    s2 = true;
                }
            }
            var isSoloWallHole = s1 && s2 && alreadySeen && path.length < 3;
            var isNextClockwiseWallOrigWall = (iw.count > 1 && iw.toArray()[1].data.key === origWall.data.key);
            var atFinalIp = isNextClockwiseWallOrigWall && (w.data.key !== origWall.data.key || (isSoloWallHole)) || (isSoloWallHole && w.data.key === origWall.data.key);
            var doContinue = hasNotSeenIp ? true : (!alreadySeen);
            if (!doContinue && path.indexOf('isDone') === -1) {
                path.push('isDone');
            }
            if (doContinue) {
                iw.iterator.each(function (fw) {
                    if (path !== null && fw.data.key !== w.data.key && path.indexOf('isDone') === -1) {
                        if (ip !== null) {
                            var side1 = fp.getCounterClockwiseWallSide(fw, ip);
                            var entry = [fw.data.key, side1];
                            path.push(entry);
                            seenWalls.add(fw);
                            recursivelyFindHolePath(fw, seenIp, path, ip, origWall);
                        }
                    }
                    else if (iw.count === 1 && path !== null && path.indexOf('isDone') === -1) {
                        var entry = null;
                        for (var i = 0; i < path.length; i++) {
                            var pwk = path[i][0];
                            var pw = fp.findNodeForKey(pwk);
                            if (pw.data.key === fw.data.key) {
                                var s = path[i][1];
                                var os = (s === 1) ? 2 : 1;
                                entry = [pw.data.key, os];
                            }
                        }
                        path.push(entry);
                        if (oiw.count === 1) {
                            path.push('isDone');
                        }
                    }
                });
            }
            if (path.indexOf('isDone') !== -1) {
                return path.slice(0, path.length - 1);
            }
            else if (oiw.count > 1) {
                var lw = iw.last();
                if (oiw !== null && lw !== null) {
                    oiw = fp.sortWallsClockwiseWithSetStartWall(oiw, lw);
                }
                var parentw = oiw.toArray()[1];
                if (op !== null) {
                    var side1 = fp.getCounterClockwiseWallSide(parentw, op);
                    var entry = [parentw.data.key, side1];
                    var entryExists = false;
                    for (var i = 0; i < path.length; i++) {
                        var entry2 = path[i];
                        var w1k = entry[0];
                        var w1 = fp.findNodeForKey(w1k);
                        var w2k = entry2[0];
                        var w2 = fp.findNodeForKey(w2k);
                        if (w1.data.key === w2.data.key && entry[1] === entry2[1]) {
                            entryExists = true;
                        }
                    }
                    if (entry !== null && !entryExists) {
                        path.push(entry);
                        seenWalls.add(parentw);
                        recursivelyFindHolePath(parentw, seenIp, path, op, origWall);
                    }
                    else if (entryExists) {
                        return path;
                    }
                }
            }
            if (path.indexOf('isDone') !== -1) {
                path = path.slice(0, path.length - 1);
            }
            return path;
        }
        var holes = [];
        offendingWalls.iterator.each(function (ow) {
            if (!seenWalls.contains(ow)) {
                var sPt = ow.data.startpoint;
                var ePt = ow.data.endpoint;
                var mPt_1 = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
                var wallsDistArr_1 = [];
                offendingWalls.iterator.each(function (w) {
                    var ip = fp.getSegmentsIntersection(pt, mPt_1, w.data.startpoint, w.data.endpoint);
                    if (ip !== null) {
                        var dist = Math.sqrt(ip.distanceSquaredPoint(pt));
                        wallsDistArr_1.push([w, dist]);
                    }
                });
                wallsDistArr_1.sort(function (a, b) {
                    var distA = a[1];
                    var distB = b[1];
                    if (distA === distB)
                        return 0;
                    else if (distA < distB)
                        return -1;
                    else
                        return 1;
                });
                var fw = null;
                for (var i = 0; i < wallsDistArr_1.length; i++) {
                    var entryWall = wallsDistArr_1[i][0];
                    if (!seenWalls.contains(entryWall) && fw === null) {
                        fw = entryWall;
                    }
                }
                if (fw !== null) {
                    var path = recursivelyFindHolePath(fw, null, null, null, fw);
                    var polygon_1 = fp.makePolygonFromRoomBoundaries(path);
                    if (polygon_1 !== null) {
                        offendingWalls.iterator.each(function (ow2) {
                            var s = ow2.data.smpt1;
                            if (fp.isPointInPolygon(polygon_1.toArray(), s) || fp.isPointInPolygon(polygon_1.toArray(), s)) {
                                seenWalls.add(ow2);
                            }
                        });
                        holes.push(path);
                    }
                }
            }
        });
        return holes;
    };
    Floorplan.prototype.getPathPts = function (path) {
        var fp = this;
        var pts = new go.List();
        var firstWallKey = path[0][0];
        var firstWall = fp.findNodeForKey(firstWallKey);
        var firstSide = path[0][1];
        var secondWallKey = path[1][0];
        var secondWall = fp.findNodeForKey(secondWallKey);
        var ip = fp.getWallsIntersection(firstWall, secondWall);
        if (firstWall.data.key === secondWall.data.key) {
            ip = fp.getClockwiseWallEndpoint(firstWall, firstSide);
        }
        if (ip !== null) {
            var propS = 'smpt' + firstSide;
            var propE = 'empt' + firstSide;
            var ptS = firstWall.data[propS];
            var ptE = firstWall.data[propE];
            var distS = Math.sqrt(ip.distanceSquaredPoint(ptS));
            var distE = Math.sqrt(ip.distanceSquaredPoint(ptE));
            var closestPt = (distS < distE) ? ptS : ptE;
            var farthestPt = closestPt.equals(ptS) ? ptE : ptS;
            pts.add(farthestPt);
            pts.add(closestPt);
            var prevPt = closestPt;
            var prevWall = firstWall;
            for (var i = 0; i < path.length; i++) {
                var entry = path[i];
                if (typeof entry === 'string')
                    continue;
                var wk = entry[0];
                var w = fp.findNodeForKey(wk);
                var s = entry[1];
                if (i !== 0) {
                    var propS1 = 'smpt' + s;
                    var propE1 = 'empt' + s;
                    var ptS1 = w.data[propS1];
                    var ptE1 = w.data[propE1];
                    var distS1 = Math.sqrt(prevPt.distanceSquaredPoint(ptS1));
                    var distE1 = Math.sqrt(prevPt.distanceSquaredPoint(ptE1));
                    var closestPt1 = (distS1 < distE1) ? ptS1 : ptE1;
                    var farthestPt1 = closestPt.equals(ptS1) ? ptE1 : ptS1;
                    if (prevWall.data.key === w.data.key) {
                        pts.add(prevPt);
                        pts.add(closestPt1);
                    }
                    pts.add(closestPt1);
                    pts.add(farthestPt1);
                    prevPt = farthestPt1;
                    prevWall = w;
                }
            }
        }
        return pts;
    };
    Floorplan.prototype.getPolygonArea = function (vs) {
        var j = 0;
        var area = 0;
        for (var i = 0; i < vs.length; i++) {
            j = (i + 1) % vs.length;
            area += vs[i].x * vs[j].y;
            area -= vs[i].y * vs[j].x;
        }
        area /= 2;
        return (area < 0 ? -area : area);
    };
    Floorplan.prototype.getRoomArea = function (r) {
        var fp = this;
        var pts = fp.getPathPts(r.data.boundaryWalls);
        var area1 = fp.getPolygonArea(pts.toArray());
        var area2 = 0;
        var holes = r.data.holes;
        for (var i = 0; i < holes.length; i++) {
            var h = holes[i];
            var hPts = fp.getPathPts(h);
            var hArea = fp.getPolygonArea(hPts.toArray());
            area2 += hArea;
        }
        return area1 - area2;
    };
    Floorplan.prototype.isPointInWall = function (w, p) {
        var floorplan = this;
        var orderedPoints = [
            w.data.startpoint,
            w.data.smpt1,
            w.data.empt1,
            w.data.endpoint,
            w.data.empt2,
            w.data.smpt2,
            w.data.startpoint
        ];
        return floorplan.isPointInPolygon(orderedPoints, p);
    };
    Floorplan.prototype.isPointInRoom = function (r, p) {
        var fp = this;
        if (r === null || r === undefined || !(r instanceof go.Node) || r.data.category !== 'RoomNode')
            return false;
        var polygon = fp.makePolygonFromRoomBoundaries(r.data.boundaryWalls);
        if (polygon !== null) {
            var polyArr = polygon.toArray();
            var isInRoom = fp.isPointInPolygon(polyArr, p);
            return isInRoom;
        }
        return false;
    };
    Floorplan.prototype.isPointInPolygon = function (vs, point) {
        var x = point.x;
        var y = point.y;
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].x;
            var yi = vs[i].y;
            var xj = vs[j].x;
            var yj = vs[j].y;
            var intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    Floorplan.prototype.updateWall = function (wall) {
        if (wall.data.startpoint && wall.data.endpoint) {
            var shape = wall.findObject('SHAPE');
            var data = wall.data;
            var geo = null;
            var pts = [data.startpoint, data.endpoint, data.smpt1, data.smpt2, data.empt1, data.empt2];
            if (wall.data.isDivider) {
                shape.strokeWidth = 2;
                shape.opacity = .5;
            }
            pts = [data.startpoint, data.endpoint, data.smpt1, data.smpt2, data.empt1, data.empt2];
            geo = new go.Geometry()
                .add(new go.PathFigure(data.startpoint.x, data.startpoint.y)
                .add(new go.PathSegment(go.PathSegment.Line, data.smpt1.x, data.smpt1.y))
                .add(new go.PathSegment(go.PathSegment.Line, data.empt1.x, data.empt1.y))
                .add(new go.PathSegment(go.PathSegment.Line, data.endpoint.x, data.endpoint.y))
                .add(new go.PathSegment(go.PathSegment.Line, data.empt2.x, data.empt2.y))
                .add(new go.PathSegment(go.PathSegment.Line, data.smpt2.x, data.smpt2.y))
                .add(new go.PathSegment(go.PathSegment.Line, data.startpoint.x, data.startpoint.y)));
            geo.normalize();
            shape.geometry = geo;
            var smallestX = Number.MAX_VALUE;
            var smallestY = Number.MAX_VALUE;
            for (var i = 0; i < pts.length; i++) {
                var pt = pts[i];
                if (pt.x < smallestX) {
                    smallestX = pt.x;
                }
                if (pt.y < smallestY) {
                    smallestY = pt.y;
                }
            }
            wall.position = new go.Point(smallestX, smallestY);
            wall.location = new go.Point(smallestX, smallestY);
        }
    };
    Floorplan.prototype.updateRoom = function (room) {
        var fp = this;
        var shape = room.findObject('SHAPE');
        var geo = new go.Geometry();
        var pts = [];
        var bw = room.data.boundaryWalls;
        if (bw === null)
            return;
        var fig = null;
        addPathToGeo(bw);
        function addPathToGeo(boundaryWalls) {
            var firstWallKey = boundaryWalls[0][0];
            var firstWall = fp.findNodeForKey(firstWallKey);
            var firstSide = boundaryWalls[0][1];
            var secondWallKey = boundaryWalls[1][0];
            var secondWall = fp.findNodeForKey(secondWallKey);
            var ip = fp.getWallsIntersection(firstWall, secondWall);
            if (firstWall.data.key === secondWall.data.key) {
                ip = fp.getClockwiseWallEndpoint(firstWall, firstSide);
            }
            if (ip === null)
                return;
            var propS = 'smpt' + firstSide;
            var propE = 'empt' + firstSide;
            var ptS = firstWall.data[propS];
            var ptE = firstWall.data[propE];
            var distS = Math.sqrt(ip.distanceSquaredPoint(ptS));
            var distE = Math.sqrt(ip.distanceSquaredPoint(ptE));
            var closestPt = (distS < distE) ? ptS : ptE;
            var farthestPt = closestPt.equals(ptS) ? ptE : ptS;
            var firstPt = farthestPt.copy();
            pts.push(farthestPt);
            pts.push(closestPt);
            if (fig === null) {
                fig = new go.PathFigure(farthestPt.x, farthestPt.y);
            }
            else {
                fig.add(new go.PathSegment(go.PathSegment.Move, farthestPt.x, farthestPt.y));
            }
            fig.add(new go.PathSegment(go.PathSegment.Line, closestPt.x, closestPt.y));
            var prevPt = closestPt;
            var prevWall = firstWall;
            for (var i = 0; i < boundaryWalls.length; i++) {
                var entry = boundaryWalls[i];
                if (typeof entry === 'string')
                    continue;
                var wk = entry[0];
                var w = fp.findNodeForKey(wk);
                var s = entry[1];
                if (i !== 0) {
                    var propS1 = 'smpt' + s;
                    var propE1 = 'empt' + s;
                    var ptS1 = w.data[propS1];
                    var ptE1 = w.data[propE1];
                    var distS1 = Math.sqrt(prevPt.distanceSquaredPoint(ptS1));
                    var distE1 = Math.sqrt(prevPt.distanceSquaredPoint(ptE1));
                    var closestPt1 = (distS1 < distE1) ? ptS1 : ptE1;
                    var farthestPt1 = closestPt1.equals(ptS1) ? ptE1 : ptS1;
                    if (prevWall.data.key === w.data.key) {
                        fig.add(new go.PathSegment(go.PathSegment.Line, prevPt.x, prevPt.y));
                        fig.add(new go.PathSegment(go.PathSegment.Line, closestPt1.x, closestPt1.y));
                    }
                    fig.add(new go.PathSegment(go.PathSegment.Line, closestPt1.x, closestPt1.y));
                    fig.add(new go.PathSegment(go.PathSegment.Line, farthestPt1.x, farthestPt1.y));
                    pts.push(closestPt1);
                    pts.push(farthestPt1);
                    prevPt = farthestPt1;
                    prevWall = w;
                }
            }
            fig.add(new go.PathSegment(go.PathSegment.Line, firstPt.x, firstPt.y));
        }
        var holes = room.data.holes;
        if (holes !== null && holes.length !== 0) {
            for (var i = 0; i < holes.length; i++) {
                var holePath = holes[i];
                addPathToGeo(holePath);
            }
        }
        if (fig !== null) {
            geo.add(fig);
        }
        geo.normalize();
        shape.geometry = geo;
        var smallestX = Number.MAX_VALUE;
        var smallestY = Number.MAX_VALUE;
        for (var i = 0; i < pts.length; i++) {
            var pt = pts[i];
            if (pt.x < smallestX) {
                smallestX = pt.x;
            }
            if (pt.y < smallestY) {
                smallestY = pt.y;
            }
        }
        room.position = new go.Point(smallestX, smallestY);
        room.location = new go.Point(smallestX, smallestY);
        fp.model.setDataProperty(room.data, 'loc', new go.Point(smallestX, smallestY));
        var area = fp.getRoomArea(room);
        fp.model.setDataProperty(room.data, 'area', area);
    };
    Floorplan.prototype.getAdjustedPoint = function (point, wall, angle, wallOffset) {
        var oldPoint = point.copy();
        point.offset(0, -(wall.data.thickness * .5) - wallOffset);
        point.offset(-oldPoint.x, -oldPoint.y).rotate(angle).offset(oldPoint.x, oldPoint.y);
        return point;
    };
    Floorplan.prototype.buildDimensionLink = function (wall, index, point1, point2, angle, wallOffset, soloWallFlag, floorplan, miteringSide, opacity, stroke, strokeWidth) {
        point1 = floorplan.getAdjustedPoint(point1, wall, angle, wallOffset);
        point2 = floorplan.getAdjustedPoint(point2, wall, angle, wallOffset);
        if (opacity === undefined || opacity === null || isNaN(opacity)) {
            opacity = 1;
        }
        if (strokeWidth === undefined || strokeWidth === null || isNaN(strokeWidth)) {
            strokeWidth = 2;
        }
        if (stroke === undefined || stroke === null) {
            stroke = 'gray';
        }
        var data1 = { key: wall.data.key + 'PointNode' + miteringSide + index, category: 'PointNode', loc: go.Point.stringify(point1) };
        var data2 = { key: wall.data.key + 'PointNode' + miteringSide + (index + 1), category: 'PointNode', loc: go.Point.stringify(point2) };
        var data3 = {
            key: wall.data.key + 'DimensionLink', category: 'DimensionLink', from: data1.key, to: data2.key,
            angle: angle, wall: wall.data.key, soloWallFlag: soloWallFlag
        };
        var pointNode1 = makePointNode();
        var pointNode2 = makePointNode();
        var link = makeDimensionLink(opacity, stroke, strokeWidth);
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
        link.data.length = Math.sqrt(pointNode1.location.distanceSquaredPoint(pointNode2.location));
    };
    Floorplan.prototype.updateWallDimensions = function (wallsToDisplayFor) {
        var floorplan = this;
        floorplan.skipsUndoManager = true;
        floorplan.startTransaction('update wall dimensions');
        if (!floorplan.model.modelData.preferences.showWallLengths) {
            floorplan.pointNodes.iterator.each(function (node) { floorplan.remove(node); });
            floorplan.dimensionLinks.iterator.each(function (link) { floorplan.remove(link); });
            floorplan.pointNodes.clear();
            floorplan.dimensionLinks.clear();
            floorplan.commitTransaction('update wall dimensions');
            floorplan.skipsUndoManager = false;
            return;
        }
        floorplan.pointNodes.iterator.each(function (node) { floorplan.remove(node); });
        floorplan.dimensionLinks.iterator.each(function (link) { floorplan.remove(link); });
        floorplan.pointNodes.clear();
        floorplan.dimensionLinks.clear();
        var selection = (wallsToDisplayFor !== null && wallsToDisplayFor !== undefined) ? wallsToDisplayFor : floorplan.selection;
        var walls = new go.Set();
        selection.iterator.each(function (part) {
            if ((part.category === 'WindowNode' || part.category === 'DoorNode') && part.containingGroup !== null) {
                walls.add(part.containingGroup);
            }
            if (part.category === 'WallGroup' && part.data && part.data.startpoint && part.data.endpoint) {
                var wall = part;
                var areWallPartsSelected_1 = false;
                wall.memberParts.each(function (wp) {
                    if (wp.isSelected) {
                        areWallPartsSelected_1 = true;
                    }
                });
                if (!areWallPartsSelected_1) {
                    var ang = wall.data.startpoint.directionPoint(wall.data.endpoint);
                    var s1 = wall.data.smpt1;
                    var e1 = wall.data.empt1;
                    var first = ((s1.x + s1.y) <= (e1.x + e1.y)) ? s1 : e1;
                    var second = ((s1.x + s1.y) > (e1.x + e1.y)) ? s1 : e1;
                    floorplan.buildDimensionLink(wall, 1, first.copy(), second.copy(), (ang + 180) % 360, 10, true, floorplan, 1);
                    var s2 = wall.data.smpt2;
                    var e2 = wall.data.empt2;
                    first = ((s2.x + s2.y) <= (e2.x + e2.y)) ? s2 : e2;
                    second = ((s2.x + s2.y) > (e2.x + e2.y)) ? s2 : e2;
                    floorplan.buildDimensionLink(wall, 2, first.copy(), second.copy(), ang, 10, true, floorplan, 1);
                }
            }
        });
        walls.iterator.each(function (wall) {
            var _loop_1 = function (i) {
                var startpoint = wall.data['smpt' + i];
                var endpoint = wall.data['empt' + i];
                var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var angle = wall.data.startpoint.directionPoint(wall.data.endpoint);
                if (i === 1) {
                    angle = (angle + 180) % 360;
                }
                var wallPartEndpoints = [];
                wall.memberParts.iterator.each(function (wallPart) {
                    if (wallPart.isSelected) {
                        var endpoints = getWallPartEndpoints(wallPart);
                        var ep1 = endpoints[0];
                        var ep2 = endpoints[1];
                        var newEp1 = floorplan.rotateAndTranslatePoint(ep1, angle + 0, wall.data.thickness / 2);
                        var newEp2 = floorplan.rotateAndTranslatePoint(ep2, angle + 0, wall.data.thickness / 2);
                        wallPartEndpoints.push(ep1);
                        wallPartEndpoints.push(ep2);
                    }
                });
                wallPartEndpoints.sort(function (a, b) {
                    if ((a.x + a.y) > (b.x + b.y))
                        return 1;
                    if ((a.x + a.y) < (b.x + b.y))
                        return -1;
                    else
                        return 0;
                });
                wallPartEndpoints.unshift(firstWallPt);
                wallPartEndpoints.push(lastWallPt);
                var k = 1;
                for (var j = 0; j < wallPartEndpoints.length - 1; j++) {
                    var linkPoint1 = null;
                    var linkPoint2 = null;
                    var itr = floorplan.pointNodes.iterator;
                    while (itr.next()) {
                        var node = itr.value;
                        if (node.data.key === wall.data.key + 'PointNode' + k) {
                            linkPoint1 = node;
                        }
                        if (node.data.key === wall.data.key + 'PointNode' + (k + 1)) {
                            linkPoint2 = node;
                        }
                    }
                    if (linkPoint1 !== null && linkPoint2 !== null) {
                        var newLoc1 = floorplan.getAdjustedPoint(wallPartEndpoints[j].copy(), wall, angle, 15);
                        var newLoc2 = floorplan.getAdjustedPoint(wallPartEndpoints[j + 1].copy(), wall, angle, 15);
                        linkPoint1.data.loc = go.Point.stringify(newLoc1);
                        linkPoint2.data.loc = go.Point.stringify(newLoc2);
                        linkPoint1.updateTargetBindings();
                        linkPoint2.updateTargetBindings();
                    }
                    else {
                        floorplan.buildDimensionLink(wall, k, wallPartEndpoints[j].copy(), wallPartEndpoints[j + 1].copy(), angle, 15, false, floorplan, i, .5, 'gray', 1);
                    }
                    k += 2;
                }
                var totalWallDimensionLink = null;
                floorplan.dimensionLinks.iterator.each(function (link) {
                    if (link.fromNode !== null && link.toNode !== null && (link.fromNode.data.key === wall.data.key + 'PointNode' + i + k) &&
                        (link.toNode.data.key === wall.data.key + 'PointNode' + i + (k + 1))) {
                        totalWallDimensionLink = link;
                    }
                });
                if (totalWallDimensionLink !== null) {
                    var linkPoint1 = null;
                    var linkPoint2 = null;
                    var itr = floorplan.pointNodes.iterator;
                    while (itr.next()) {
                        var node = itr.value;
                        if (node.data.key === wall.data.key + 'PointNode' + k) {
                            linkPoint1 = node;
                        }
                        if (node.data.key === wall.data.key + 'PointNode' + (k + 1)) {
                            linkPoint2 = node;
                        }
                    }
                    if (linkPoint1 !== null && linkPoint2 !== null) {
                        var newLoc1 = floorplan.getAdjustedPoint(wallPartEndpoints[0].copy(), wall, angle, 25);
                        var newLoc2 = floorplan.getAdjustedPoint(wallPartEndpoints[wallPartEndpoints.length - 1].copy(), wall, angle, 25);
                        linkPoint1.data.loc = go.Point.stringify(newLoc1);
                        linkPoint2.data.loc = go.Point.stringify(newLoc2);
                        linkPoint1.updateTargetBindings();
                        linkPoint2.updateTargetBindings();
                    }
                }
                else {
                    floorplan.buildDimensionLink(wall, k, wallPartEndpoints[0].copy(), wallPartEndpoints[wallPartEndpoints.length - 1].copy(), angle, 25, false, floorplan, i);
                }
            };
            for (var i = 1; i < 3; i++) {
                _loop_1(i);
            }
        });
        floorplan.dimensionLinks.iterator.each(function (link) {
            var canStay = false;
            floorplan.pointNodes.iterator.each(function (node) {
                if (node.data.key === link.data.to)
                    canStay = true;
            });
            if (!canStay)
                floorplan.remove(link);
            else {
                if (link !== null && link.toNode !== null && link.fromNode !== null) {
                    var length_1 = Math.sqrt(link.toNode.location.distanceSquaredPoint(link.fromNode.location));
                    if (length_1 < 1 && !link.data.soloWallFlag)
                        link.visible = false;
                }
            }
        });
        floorplan.commitTransaction('update wall dimensions');
        floorplan.skipsUndoManager = false;
    };
    Floorplan.prototype.rotateAndTranslatePoint = function (pt, angle, distance) {
        var x = pt.x;
        var y = pt.y;
        var newX = Math.cos(x * Math.PI / 180) * distance + x;
        var newY = Math.sin(x * Math.PI / 180) * distance + y;
        var newPt = new go.Point(newX, newY);
        return newPt;
    };
    Floorplan.prototype.getWallsIntersection = function (w1, w2) {
        if (w1 === null || w2 === null) {
            return null;
        }
        var x1 = w1.data.startpoint.x;
        var y1 = w1.data.startpoint.y;
        var x2 = w1.data.endpoint.x;
        var y2 = w1.data.endpoint.y;
        var x3 = w2.data.startpoint.x;
        var y3 = w2.data.startpoint.y;
        var x4 = w2.data.endpoint.x;
        var y4 = w2.data.endpoint.y;
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            return null;
        }
        var denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        function pointsApproximatelyEqual(p1, p2) {
            var xa = p1.x;
            var xb = p2.x;
            var ya = p1.y;
            var yb = p2.y;
            var diff1 = Math.abs(xb - xa);
            var diff2 = Math.abs(yb - ya);
            if (diff2 < .05 && diff1 < .05) {
                return true;
            }
            return false;
        }
        if (denominator === 0) {
            if (pointsApproximatelyEqual(w1.data.startpoint, w2.data.startpoint) || pointsApproximatelyEqual(w1.data.startpoint, w2.data.endpoint))
                return w1.data.startpoint;
            if (pointsApproximatelyEqual(w1.data.endpoint, w2.data.startpoint) || pointsApproximatelyEqual(w1.data.endpoint, w2.data.endpoint))
                return w1.data.endpoint;
            return null;
        }
        var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
        var ua1 = +ua.toFixed(2);
        var ub1 = +ub.toFixed(2);
        if (ua1 < 0 || ua1 > 1 || ub1 < 0 || ub1 > 1) {
            return null;
        }
        var x = x1 + ua * (x2 - x1);
        var y = y1 + ua * (y2 - y1);
        return new go.Point(x, y);
    };
    Floorplan.prototype.getSegmentsIntersection = function (p1, p2, p3, p4) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var x3 = p3.x;
        var y3 = p3.y;
        var x4 = p4.x;
        var y4 = p4.y;
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            return null;
        }
        var denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        function pointsApproximatelyEqual(pa, pb) {
            var xa = pa.x;
            var xb = pb.x;
            var ya = pa.y;
            var yb = pb.y;
            var diff1 = Math.abs(xb - xa);
            var diff2 = Math.abs(yb - ya);
            if (diff2 < .05 && diff1 < .05) {
                return true;
            }
            return false;
        }
        if (denominator === 0) {
            if (pointsApproximatelyEqual(p1, p3) || pointsApproximatelyEqual(p1, p4))
                return p1;
            if (pointsApproximatelyEqual(p2, p3) || pointsApproximatelyEqual(p2, p4))
                return p2;
            return null;
        }
        var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
        var ua1 = +ua.toFixed(4);
        var ub1 = +ub.toFixed(4);
        if (ua1 < 0 || ua1 > 1 || ub1 < 0 || ub1 > 1) {
            return null;
        }
        var x = x1 + ua * (x2 - x1);
        var y = y1 + ua * (y2 - y1);
        return new go.Point(x, y);
    };
    Floorplan.prototype.updateWallAngles = function () {
        var floorplan = this;
        floorplan.skipsUndoManager = true;
        floorplan.startTransaction('display angles');
        if (floorplan.model.modelData.preferences.showWallAngles) {
            floorplan.angleNodes.iterator.each(function (node) { node.visible = true; });
            var selectedWalls_1 = [];
            floorplan.selection.iterator.each(function (part) {
                if (part.category === 'WallGroup') {
                    var w = part;
                    selectedWalls_1.push(w);
                }
            });
            var _loop_2 = function (i) {
                var seen = new go.Set();
                var wall = selectedWalls_1[i];
                var possibleWalls = floorplan.findNodesByExample({ category: 'WallGroup' });
                possibleWalls.iterator.each(function (otherWall) {
                    if (otherWall.data === null || wall.data === null || seen.contains(otherWall.data.key))
                        return;
                    if ((otherWall.data.key !== wall.data.key) && (floorplan.getWallsIntersection(wall, otherWall) !== null) && (!seen.contains(otherWall.data.key))) {
                        seen.add(otherWall.data.key);
                        var intersectionPoint_1 = floorplan.getWallsIntersection(wall, otherWall);
                        if (intersectionPoint_1 !== null) {
                            var wrt = floorplan.toolManager.mouseDownTools.elt(3);
                            var wallsInvolved = wrt.getAllWallsAtIntersection(intersectionPoint_1);
                            var endpoints_1 = [];
                            wallsInvolved.iterator.each(function (w) {
                                var tolerance = (floorplan.model.modelData.gridSize >= 10) ? floorplan.model.modelData.gridSize : 10;
                                if (Math.sqrt(w.data.startpoint.distanceSquaredPoint(intersectionPoint_1)) > tolerance)
                                    endpoints_1.push({ point: w.data.startpoint, wall: w.data.key });
                                if (Math.sqrt(w.data.endpoint.distanceSquaredPoint(intersectionPoint_1)) > tolerance)
                                    endpoints_1.push({ point: w.data.endpoint, wall: w.data.key });
                            });
                            var maxRadius = 30;
                            for (var j = 0; j < endpoints_1.length; j++) {
                                var distance = Math.sqrt(endpoints_1[j].point.distanceSquaredPoint(intersectionPoint_1));
                                if (distance < maxRadius)
                                    maxRadius = distance;
                            }
                            endpoints_1.sort(function (a, b) {
                                a = a.point;
                                b = b.point;
                                if (a.x - intersectionPoint_1.x >= 0 && b.x - intersectionPoint_1.x < 0)
                                    return 1;
                                if (a.x - intersectionPoint_1.x < 0 && b.x - intersectionPoint_1.x >= 0)
                                    return -1;
                                if (a.x - intersectionPoint_1.x === 0 && b.x - intersectionPoint_1.x === 0) {
                                    if (a.y - intersectionPoint_1.y >= 0 || b.y - intersectionPoint_1.y >= 0)
                                        return a.y > b.y ? 1 : -1;
                                    return b.y > a.y ? 1 : -1;
                                }
                                var det = (a.x - intersectionPoint_1.x) * (b.y - intersectionPoint_1.y) - (b.x - intersectionPoint_1.x) * (a.y - intersectionPoint_1.y);
                                if (det < 0)
                                    return 1;
                                if (det > 0)
                                    return -1;
                                var d1 = (a.x - intersectionPoint_1.x) * (a.x - intersectionPoint_1.x) + (a.y - intersectionPoint_1.y) * (a.y - intersectionPoint_1.y);
                                var d2 = (b.x - intersectionPoint_1.x) * (b.x - intersectionPoint_1.x) + (b.y - intersectionPoint_1.y) * (b.y - intersectionPoint_1.y);
                                return d1 > d2 ? 1 : -1;
                            });
                            var _loop_3 = function (j) {
                                var p1 = endpoints_1[j];
                                var p2 = void 0;
                                if (endpoints_1[j + 1] != null) {
                                    p2 = endpoints_1[j + 1];
                                }
                                else {
                                    p2 = endpoints_1[0];
                                }
                                var a1 = intersectionPoint_1.directionPoint(p1.point);
                                var a2 = intersectionPoint_1.directionPoint(p2.point);
                                var sweep = Math.abs(a2 - a1 + 360) % 360;
                                var angle = a1;
                                var keyArray = [];
                                wallsInvolved.iterator.each(function (w) { keyArray.push(w); });
                                keyArray.sort(function (a, b) {
                                    var aIndex = a.data.key.match(/\d+/g);
                                    var bIndex = b.data.key.match(/\d+/g);
                                    if (isNaN(aIndex))
                                        return 1;
                                    if (isNaN(bIndex))
                                        return -1;
                                    else
                                        return aIndex > bIndex ? 1 : -1;
                                });
                                var key = '';
                                for (var k = 0; k < keyArray.length; k++)
                                    key += keyArray[k].data.key;
                                key += 'angle' + j;
                                var angleNode = null;
                                var aitr = floorplan.angleNodes.iterator;
                                while (aitr.next()) {
                                    var aNode = aitr.value;
                                    if (aNode.data.key === key) {
                                        angleNode = aNode;
                                    }
                                }
                                if (angleNode !== null) {
                                    angleNode.data.angle = angle;
                                    angleNode.data.sweep = sweep;
                                    angleNode.data.loc = go.Point.stringify(intersectionPoint_1);
                                    angleNode.data.maxRadius = maxRadius;
                                    angleNode.updateTargetBindings();
                                }
                                else {
                                    var data = {
                                        key: key, category: 'AngleNode', loc: go.Point.stringify(intersectionPoint_1),
                                        stroke: 'dodgerblue', angle: angle, sweep: sweep, maxRadius: maxRadius
                                    };
                                    var newAngleNode = makeAngleNode();
                                    newAngleNode.data = data;
                                    floorplan.add(newAngleNode);
                                    newAngleNode.updateTargetBindings();
                                    floorplan.angleNodes.add(newAngleNode);
                                }
                            };
                            for (var j = 0; j < endpoints_1.length; j++) {
                                _loop_3(j);
                            }
                        }
                    }
                });
            };
            for (var i = 0; i < selectedWalls_1.length; i++) {
                _loop_2(i);
            }
            var garbage_1 = [];
            floorplan.angleNodes.iterator.each(function (node) {
                var keyNums = node.data.key.match(/\d+/g);
                var numWalls = (node.data.key.match(/wall/g) || []).length;
                var wallsInvolved = [];
                for (var i = 0; i < keyNums.length - 1; i++) {
                    wallsInvolved.push('wall' + keyNums[i]);
                }
                if (numWalls !== keyNums.length - 1) {
                    wallsInvolved.push('wall');
                }
                for (var i = 0; i < wallsInvolved.length - 1; i++) {
                    var wall1 = floorplan.findPartForKey(wallsInvolved[i]);
                    var wall2 = floorplan.findPartForKey(wallsInvolved[i + 1]);
                    var intersectionPoint = floorplan.getWallsIntersection(wall1, wall2);
                    if (intersectionPoint === null)
                        garbage_1.push(node);
                }
                var possibleAngleNodes = new go.Set();
                var allWalls = node.data.key.slice(0, node.data.key.indexOf('angle'));
                floorplan.angleNodes.iterator.each(function (other) { if (other.data.key.indexOf(allWalls) !== -1)
                    possibleAngleNodes.add(other); });
                possibleAngleNodes.iterator.each(function (pNode) {
                    if (pNode.data.loc !== node.data.loc) {
                        garbage_1.push(pNode);
                    }
                });
                if (node.data.sweep === 0)
                    garbage_1.push(node);
            });
            for (var i = 0; i < garbage_1.length; i++) {
                floorplan.remove(garbage_1[i]);
                floorplan.angleNodes.remove(garbage_1[i]);
            }
        }
        if (floorplan.model.modelData.preferences.showOnlySmallWallAngles) {
            floorplan.angleNodes.iterator.each(function (node) { if (node.data.sweep >= 180)
                node.visible = false; });
        }
        if (!floorplan.model.modelData.preferences.showWallAngles) {
            floorplan.angleNodes.iterator.each(function (node) { node.visible = false; });
        }
        floorplan.commitTransaction('display angles');
        floorplan.skipsUndoManager = false;
    };
    Floorplan.prototype.findClosestLocOnWall = function (wall, part) {
        var orderedConstrainingPts = [];
        var startpoint = wall.data.startpoint.copy();
        var endpoint = wall.data.endpoint.copy();
        var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
        var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
        var wallPartEndpoints = [];
        wall.memberParts.iterator.each(function (wallPart) {
            var endpoints = getWallPartEndpoints(wallPart);
            wallPartEndpoints.push(endpoints[0]);
            wallPartEndpoints.push(endpoints[1]);
        });
        wallPartEndpoints.sort(function (a, b) {
            if ((a.x + a.y) > (b.x + b.y)) {
                return 1;
            }
            if ((a.x + a.y) < (b.x + b.y)) {
                return -1;
            }
            else {
                return 0;
            }
        });
        orderedConstrainingPts.push(firstWallPt);
        orderedConstrainingPts = orderedConstrainingPts.concat(wallPartEndpoints);
        orderedConstrainingPts.push(lastWallPt);
        var possibleStretches = [];
        for (var i = 0; i < orderedConstrainingPts.length; i += 2) {
            var point1 = orderedConstrainingPts[i];
            var point2 = orderedConstrainingPts[i + 1];
            var distanceBetween = Math.sqrt(point1.distanceSquaredPoint(point2));
            if (distanceBetween >= part.data.length) {
                possibleStretches.push({ pt1: point1, pt2: point2 });
            }
        }
        var closestDist = Number.MAX_VALUE;
        var closestStretch = null;
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
        if (closestStretch === null) {
            return null;
        }
        var closestStretchLength = Math.sqrt(closestStretch.pt1.distanceSquaredPoint(closestStretch.pt2));
        var offset = part.data.length / 2;
        var pt1 = new go.Point(closestStretch.pt1.x + ((offset / closestStretchLength) * (closestStretch.pt2.x - closestStretch.pt1.x)), closestStretch.pt1.y + ((offset / closestStretchLength) * (closestStretch.pt2.y - closestStretch.pt1.y)));
        var pt2 = new go.Point(closestStretch.pt2.x + ((offset / closestStretchLength) * (closestStretch.pt1.x - closestStretch.pt2.x)), closestStretch.pt2.y + ((offset / closestStretchLength) * (closestStretch.pt1.y - closestStretch.pt2.y)));
        var newLoc = part.location.copy().projectOntoLineSegmentPoint(pt1, pt2);
        return newLoc;
    };
    return Floorplan;
}(go.Diagram));
exports.Floorplan = Floorplan;
function makeSelectionGroup(floorplan) {
    floorplan.startTransaction('group selection');
    var sel = floorplan.selection;
    var nodes = [];
    sel.iterator.each(function (n) {
        if (n instanceof go.Group) {
            n.memberParts.iterator.each(function (part) {
                nodes.push(part);
            });
        }
        else {
            nodes.push(n);
        }
    });
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].isSelected = true;
    }
    ungroupSelection(floorplan);
    floorplan.commandHandler.groupSelection();
    var group = floorplan.selection.first();
    if (group !== null) {
        floorplan.model.setDataProperty(group.data, 'caption', 'Group');
        floorplan.model.setDataProperty(group.data, 'notes', '');
    }
    clearEmptyGroups(floorplan);
    floorplan.clearSelection();
    floorplan.select(group);
    floorplan.commitTransaction('group selection');
}
function ungroupSelection(floorplan) {
    floorplan.startTransaction('ungroup selection');
    function ungroupNode(node) {
        var group = node.containingGroup;
        node.containingGroup = null;
        if (group !== null) {
            if (group.memberParts.count === 0) {
                floorplan.remove(group);
            }
            else if (group.memberParts.count === 1) {
                var mpf = group.memberParts.first();
                if (mpf !== null) {
                    mpf.containingGroup = null;
                }
            }
        }
    }
    var sel = floorplan.selection;
    var groups = [];
    sel.iterator.each(function (n) {
        if (!(n instanceof go.Group)) {
            ungroupNode(n);
        }
        else {
            groups.push(n);
        }
    });
    var nodes = [];
    for (var i = 0; i < groups.length; i++) {
        groups[i].memberParts.iterator.each(function (n) { nodes.push(n); });
    }
    for (var i = 0; i < nodes.length; i++) {
        ungroupNode(nodes[i]);
    }
    clearEmptyGroups(floorplan);
    floorplan.commitTransaction('ungroup selection');
}
function clearEmptyGroups(floorplan) {
    var nodes = floorplan.nodes;
    var arr = [];
    nodes.iterator.each(function (node) {
        if (node instanceof go.Group && node.memberParts.count === 0 && node.category !== 'WallGroup') {
            arr.push(node);
        }
    });
    for (var i = 0; i < arr.length; i++) {
        floorplan.remove(arr[i]);
    }
}
function makeGroupToolTip() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, 'Auto', $(go.Shape, { fill: '#FFFFCC' }), $(go.TextBlock, { margin: 4 }, new go.Binding('text', '', function (text, obj) {
        var data = obj.part.adornedObject.data;
        var name = (obj.part.adornedObject.category === 'MultiPurposeNode') ? data.text : data.caption;
        return 'Name: ' + name + '\nNotes: ' + data.notes + '\nMembers: ' + obj.part.adornedObject.memberParts.count;
    }).ofObject()));
}
function makeContextMenu() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, 'Vertical', $('ContextMenuButton', $(go.TextBlock, 'Make Room'), {
        click: function (e, obj) {
            var fp = e.diagram;
            var pt = e.diagram.lastInput.documentPoint;
            fp.maybeAddRoomNode(pt, 'images/textures/floor1.jpg');
        }
    }), $('ContextMenuButton', $(go.TextBlock, 'Make Group'), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null) {
                var fp = part.diagram;
                makeSelectionGroup(fp);
            }
        }
    }, new go.Binding('visible', 'visible', function (v, obj) {
        var floorplan = obj.part.diagram;
        if (floorplan.selection.count <= 1) {
            return false;
        }
        var flag = true;
        floorplan.selection.iterator.each(function (node) {
            if (node.category === 'WallGroup' || node.category === 'WindowNode' || node.category === 'DoorNode' || node.category === 'RoomNode') {
                flag = false;
            }
        });
        return flag;
    }).ofObject()), $('ContextMenuButton', $(go.TextBlock, 'Ungroup'), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null) {
                var fp = part.diagram;
                ungroupSelection(fp);
            }
        }
    }, new go.Binding('visible', '', function (v, obj) {
        var floorplan = obj.part.diagram;
        if (floorplan !== null) {
            var node = floorplan.selection.first();
            return ((node instanceof go.Node && node.containingGroup != null && node.containingGroup.category !== 'WallGroup') ||
                (node instanceof go.Group && node.category === ''));
        }
        return false;
    }).ofObject()), $('ContextMenuButton', $(go.TextBlock, 'Copy'), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null && part.diagram !== null) {
                part.diagram.commandHandler.copySelection();
            }
        }
    }, new go.Binding('visible', '', function (v, obj) {
        if (obj.part.diagram !== null) {
            var sel = obj.part.diagram.selection;
            var flag_1 = sel.count > 0;
            sel.iterator.each(function (p) {
                if (p.category === 'WallGroup' || p.category === 'WindowNode' || p.category === 'DoorNode' || p.category === 'RoomNode') {
                    flag_1 = false;
                }
            });
            return flag_1;
        }
        return false;
    }).ofObject()), $('ContextMenuButton', $(go.TextBlock, 'Cut'), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null && part.diagram !== null) {
                part.diagram.commandHandler.cutSelection();
            }
        }
    }, new go.Binding('visible', '', function (v, obj) {
        if (obj.part.diagram !== null) {
            var sel = obj.part.diagram.selection;
            var flag_2 = sel.count > 0;
            sel.iterator.each(function (p) {
                if (p.category === 'WallGroup' || p.category === 'WindowNode' || p.category === 'DoorNode' || p.category === 'RoomNode') {
                    flag_2 = false;
                }
            });
            return flag_2;
        }
        return false;
    }).ofObject()), $('ContextMenuButton', $(go.TextBlock, 'Delete'), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null && part.diagram !== null) {
                part.diagram.commandHandler.deleteSelection();
            }
        }
    }, new go.Binding('visible', '', function (v, obj) {
        if (obj.part.diagram !== null) {
            return obj.part.diagram.selection.count > 0;
        }
        return false;
    }).ofObject()), $('ContextMenuButton', $(go.TextBlock, 'Paste'), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null && part.diagram !== null) {
                part.diagram.commandHandler.pasteSelection(part.diagram.toolManager.contextMenuTool.mouseDownPoint);
            }
        }
    }));
}
function makeDefaultGroup() {
    var $ = go.GraphObject.make;
    return $(go.Group, 'Vertical', {
        contextMenu: makeContextMenu(),
        toolTip: makeGroupToolTip()
    }, new go.Binding('location', 'loc'), $(go.Panel, 'Auto', $(go.Shape, 'RoundedRectangle', { fill: 'rgba(128,128,128,0.15)', stroke: 'rgba(128, 128, 128, .05)', name: 'SHAPE', strokeCap: 'square' }, new go.Binding('fill', 'isSelected', function (s, obj) {
        return s ? 'rgba(128, 128, 128, .15)' : 'rgba(128, 128, 128, 0.10)';
    }).ofObject()), $(go.Placeholder, { padding: 5 })));
}
function makeArc(node) {
    var ang = node.data.angle;
    var sweep = node.data.sweep;
    var rad = Math.min(30, node.data.maxRadius);
    if (typeof sweep === 'number' && sweep > 0) {
        var start = new go.Point(rad, 0).rotate(ang);
        return new go.Geometry()
            .add(new go.PathFigure(start.x + rad, start.y + rad)
            .add(new go.PathSegment(go.PathSegment.Arc, ang, sweep, rad, rad, rad, rad)))
            .add(new go.PathFigure(0, 0))
            .add(new go.PathFigure(2 * rad, 2 * rad));
    }
    else {
        return new go.Geometry()
            .add(new go.PathFigure(0, 0))
            .add(new go.PathFigure(2 * rad, 2 * rad));
    }
}
function makePointNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Position', new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify));
}
function makeAngleNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Spot', { locationSpot: go.Spot.Center, locationObjectName: 'SHAPE', selectionAdorned: false }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, 'Circle', { name: 'SHAPE', height: 0, width: 0 }), $(go.Shape, { strokeWidth: 1.5, fill: null }, new go.Binding('geometry', '', makeArc).ofObject(), new go.Binding('stroke', 'sweep', function (sweep) {
        return (sweep % 45 < 1 || sweep % 45 > 44) ? 'dodgerblue' : 'lightblue';
    })), $(go.Panel, 'Auto', { name: 'ARCLABEL' }, new go.Binding('alignment', 'sweep', function (sweep, panel) {
        var rad = Math.min(30, panel.part.data.maxRadius);
        var angle = panel.part.data.angle;
        var cntr = new go.Point(rad, 0).rotate(angle + sweep / 2);
        return new go.Spot(0.5, 0.5, cntr.x, cntr.y);
    }), $(go.Shape, { fill: 'white' }, new go.Binding('stroke', 'sweep', function (sweep) {
        return (sweep % 45 < 1 || sweep % 45 > 44) ? 'dodgerblue' : 'lightblue';
    })), $(go.TextBlock, { font: '7pt sans-serif', margin: 2 }, new go.Binding('text', 'sweep', function (sweep) {
        return sweep.toFixed(2) + String.fromCharCode(176);
    }))));
}
function makeDimensionLink(opacity, stroke, strokeWidth) {
    if (opacity === null || opacity === undefined || isNaN(opacity)) {
        opacity = 1;
    }
    if (strokeWidth === null || strokeWidth === undefined || isNaN(strokeWidth)) {
        strokeWidth = 2;
    }
    if (stroke === null || stroke === undefined) {
        stroke = 'gray';
    }
    var $ = go.GraphObject.make;
    return $(go.Link, $(go.Shape, { stroke: stroke, strokeWidth: strokeWidth, name: 'SHAPE', opacity: opacity }), $(go.Shape, { toArrow: 'OpenTriangle', stroke: stroke, strokeWidth: strokeWidth, opacity: opacity }), $(go.Shape, { fromArrow: 'BackwardOpenTriangle', stroke: stroke, strokeWidth: strokeWidth, opacity: opacity }), $(go.Panel, 'Auto', new go.Binding('angle', 'angle', function (angle, link) {
        if (angle > 90 && angle < 270) {
            return (angle + 180) % 360;
        }
        return angle;
    }), $(go.Shape, 'RoundedRectangle', { fill: 'beige', opacity: .8, stroke: null }), $(go.TextBlock, { text: 'sometext', segmentOffset: new go.Point(0, -10), font: '13px sans-serif' }, new go.Binding('text', '', function (link) {
        var floorplan = link.diagram;
        var pxDist = link.data.length;
        var unitsDist = floorplan.convertPixelsToUnits(pxDist).toFixed(2);
        var unitsAbbreviation = floorplan.model.modelData.unitsAbbreviation;
        return unitsDist.toString() + unitsAbbreviation;
    }).ofObject(), new go.Binding('segmentOffset', 'angle', function (angle, textblock) {
        return new go.Point(0, 10);
    }).ofObject(), new go.Binding('font', '', function (link) {
        var distance = link.data.length;
        if (distance > 40) {
            return '13px sans-serif';
        }
        if (distance <= 40 && distance >= 20) {
            return '11px sans-serif';
        }
        else {
            return '9px sans-serif';
        }
    }).ofObject())));
}
function makeNodeToolTip() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, 'Auto', $(go.Shape, { fill: '#FFFFCC' }), $(go.TextBlock, { margin: 4 }, new go.Binding('text', '', function (text, obj) {
        var data = obj.part.adornedObject.data;
        var name = (obj.part.adornedObject.category === 'MultiPurposeNode') ? data.text : data.caption;
        return 'Name: ' + name + '\nNotes: ' + data.notes;
    }).ofObject()));
}
function makeFurnitureResizeAdornmentTemplate() {
    var $ = go.GraphObject.make;
    function makeHandle(alignment, cursor) {
        return $(go.Shape, { alignment: alignment, cursor: cursor, figure: 'Rectangle', desiredSize: new go.Size(7, 7), fill: 'lightblue', stroke: 'dodgerblue' });
    }
    return $(go.Adornment, 'Spot', $(go.Placeholder), makeHandle(go.Spot.Top, 'n-resize'), makeHandle(go.Spot.TopRight, 'n-resize'), makeHandle(go.Spot.BottomRight, 'se-resize'), makeHandle(go.Spot.Right, 'e-resize'), makeHandle(go.Spot.Bottom, 's-resize'), makeHandle(go.Spot.BottomLeft, 'sw-resize'), makeHandle(go.Spot.Left, 'w-resize'), makeHandle(go.Spot.TopLeft, 'nw-resize'));
}
function makeFurnitureRotateAdornmentTemplate() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, $(go.Shape, 'Circle', { cursor: 'pointer', desiredSize: new go.Size(7, 7), fill: 'lightblue', stroke: 'dodgerblue' }));
}
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
    var g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
    var b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str) {
    var len = 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
function makeDefaultNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Spot', {
        resizable: true,
        rotatable: true,
        toolTip: makeNodeToolTip(),
        resizeAdornmentTemplate: makeFurnitureResizeAdornmentTemplate(),
        rotateAdornmentTemplate: makeFurnitureRotateAdornmentTemplate(),
        contextMenu: makeContextMenu(),
        locationObjectName: 'SHAPE',
        resizeObjectName: 'SHAPE',
        rotateObjectName: 'SHAPE',
        minSize: new go.Size(5, 5),
        locationSpot: go.Spot.Center,
        selectionAdornmentTemplate: makeTextureSelectionAdornment(null)
    }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), new go.Binding('layerName', 'isSelected', function (s) {
        return s ? 'Foreground' : '';
    }).ofObject(), $(go.Shape, 'Ellipse', {
        name: 'SHAPE', stroke: '#000000',
        fill: 'white'
    }, new go.Binding('geometryString', 'geo'), new go.Binding('figure', 'shape').makeTwoWay(), new go.Binding('width').makeTwoWay(), new go.Binding('height').makeTwoWay(), new go.Binding('angle').makeTwoWay(), new go.Binding('fill', 'texture', function (t, obj) {
        return updateNodeTexture(obj, t);
    }), new go.Binding('fill', 'usesTexture', function (usesTexture, obj) {
        var node = obj.part;
        if (node === null)
            return null;
        var t = node.data.texture;
        return updateNodeTexture(obj, t);
    })));
}
function makeMultiPurposeNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Spot', {
        contextMenu: makeContextMenu(),
        toolTip: makeNodeToolTip(),
        locationSpot: go.Spot.Center,
        resizeAdornmentTemplate: makeFurnitureResizeAdornmentTemplate(),
        rotateAdornmentTemplate: makeFurnitureRotateAdornmentTemplate(),
        selectionAdornmentTemplate: makeTextureSelectionAdornment(null),
        locationObjectName: 'SHAPE',
        resizable: true,
        rotatable: true,
        resizeObjectName: 'SHAPE',
        rotateObjectName: 'SHAPE',
        minSize: new go.Size(5, 5)
    }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), new go.Binding('layerName', 'isSelected', function (s) { return s ? 'Foreground' : ''; }).ofObject(), $(go.Shape, { strokeWidth: 1, name: 'SHAPE', fill: 'rgba(128, 128, 128, 0.5)' }, new go.Binding('angle').makeTwoWay(), new go.Binding('width').makeTwoWay(), new go.Binding('height').makeTwoWay(), new go.Binding('fill', 'texture', function (t, obj) {
        return updateNodeTexture(obj, t);
    }), new go.Binding('fill', 'usesTexture', function (usesTexture, obj) {
        var node = obj.part;
        if (node === null)
            return null;
        var t = node.data.texture;
        return updateNodeTexture(obj, t);
    }), new go.Binding('stroke', 'isSelected', function (s, obj) {
        return s ? go.Brush.lightenBy(obj.stroke, .5) : invertColor(obj.part.data.color);
    }).ofObject()), $(go.Panel, 'Auto', new go.Binding('visible', 'showLabel'), $(go.Shape, 'RoundedRectangle', { fill: 'beige', opacity: .5, stroke: null }), $(go.TextBlock, {
        margin: 5,
        wrap: go.TextBlock.WrapFit,
        textAlign: 'center',
        editable: true,
        isMultiline: false,
        stroke: 'black',
        font: '10pt sans-serif'
    }, new go.Binding('text').makeTwoWay(), new go.Binding('angle', 'angle').makeTwoWay(), new go.Binding('font', 'height', function (height) {
        if (height > 25) {
            return '10pt sans-serif';
        }
        if (height < 25 && height > 15) {
            return '8pt sans-serif';
        }
        else {
            return '6pt sans-serif';
        }
    }))));
}
function updateNodeTexture(obj, t) {
    var node = obj.part;
    if (node === null)
        return '';
    if (node.data.usesTexture !== undefined && node.data.usesTexture) {
        if (t === '') {
            return makeTextureBrush(null);
        }
        else {
            var str = t.indexOf('images/textures') === -1 ? 'images/textures/' + t : t;
            return makeTextureBrush(str);
        }
    }
    else {
        if (node.data.color !== undefined) {
            return node.data.color;
        }
        else {
            return 'white';
        }
    }
}
var addWallPart = function (e, wall) {
    if (!(wall instanceof go.Group))
        return;
    if (wall.data.isDivider)
        return;
    var floorplan = e.diagram;
    var wallPart = floorplan.selection.first();
    if ((wallPart && (wallPart.category === 'WindowNode' || wallPart.category === 'DoorNode') && wallPart.containingGroup === null)) {
        var newLoc = floorplan.findClosestLocOnWall(wall, wallPart);
        if (newLoc !== null) {
            var shape = wall.findObject('SHAPE');
            shape.stroke = 'black';
            floorplan.model.setDataProperty(wallPart.data, 'group', wall.data.key);
            wallPart.location = newLoc.projectOntoLineSegmentPoint(wall.data.startpoint, wall.data.endpoint);
            wallPart.angle = wall.data.startpoint.directionPoint(wall.data.endpoint);
            if (wallPart.category === 'WindowNode') {
                floorplan.model.setDataProperty(wallPart.data, 'height', wall.data.thickness);
            }
            if (wallPart.category === 'DoorNode') {
                floorplan.model.setDataProperty(wallPart.data, 'doorOpeningHeight', wall.data.thickness);
            }
        }
        else {
            floorplan.remove(wallPart);
            alert("There's not enough room on the wall!");
            return;
        }
    }
    floorplan.updateWallDimensions();
};
var wallPartDragOver = function (e, wall) {
    if (!(wall instanceof go.Group))
        return;
    if (wall.data.isDivider)
        return;
    var floorplan = e.diagram;
    var draggingParts = floorplan.toolManager.draggingTool.draggedParts;
    if (draggingParts === null) {
        draggingParts = floorplan.toolManager.draggingTool.copiedParts;
    }
    if (draggingParts !== null) {
        draggingParts.iterator.each(function (kvp) {
            var part = kvp.key;
            if ((part.category === 'WindowNode' || part.category === 'DoorNode') && part.containingGroup === null) {
                var shape = wall.findObject('SHAPE');
                shape.stroke = 'lightblue';
                part.angle = wall.rotateObject.angle;
            }
        });
    }
};
var wallPartDragAway = function (e, wall) {
    if (!(wall instanceof go.Group))
        return;
    var floorplan = e.diagram;
    var shape = wall.findObject('SHAPE');
    if (shape !== null) {
        shape.stroke = 'black';
        var draggingParts = floorplan.toolManager.draggingTool.draggedParts;
        if (draggingParts === null) {
            draggingParts = floorplan.toolManager.draggingTool.copiedParts;
        }
        if (draggingParts !== null) {
            draggingParts.iterator.each(function (kvp) {
                var part = kvp.key;
                if ((part.category === 'WindowNode' || part.category === 'DoorNode') && part.containingGroup === null) {
                    part.angle = 0;
                }
            });
        }
    }
};
function makeWallGroup() {
    var $ = go.GraphObject.make;
    return $(go.Group, 'Spot', {
        contextMenu: makeContextMenu(),
        toolTip: makeGroupToolTip(),
        selectionObjectName: 'SHAPE',
        rotateObjectName: 'SHAPE',
        locationSpot: go.Spot.TopLeft,
        reshapable: true,
        minSize: new go.Size(1, 1),
        selectionAdorned: false,
        mouseDrop: addWallPart,
        mouseDragEnter: wallPartDragOver,
        mouseDragLeave: wallPartDragAway,
        dragComputation: function (part, pt, gridPt) {
            var curLoc = part.location;
            var origLoc = part.location.copy();
            var fp = part.diagram;
            var dt = fp.toolManager.draggingTool;
            var wallCount = 0;
            fp.selection.iterator.each(function (p) {
                if (p.category === 'WallGroup') {
                    wallCount++;
                    if (p.data.key !== part.data.key) {
                    }
                }
                if (p.category === 'RoomNode') {
                    p.isSelected = false;
                }
            });
            if (wallCount > 1) {
                return curLoc;
            }
            var gs = fp.grid.gridCellSize;
            gridPt.x -= gs.width / 2;
            gridPt.y -= gs.height / 2;
            var wrt = fp.toolManager.mouseDownTools.elt(3);
            var connectedWallsMap = new go.Map();
            var wallsAtStartpoint = wrt.getAllWallsAtIntersection(part.data.startpoint, true);
            wallsAtStartpoint.iterator.each(function (w) {
                if (w.data.key !== part.data.key) {
                    if (wrt.pointsApproximatelyEqual(w.data.startpoint, part.data.startpoint)) {
                        connectedWallsMap.add(w.data.key, { connectedTo: 'startpoint', connectedFrom: 'startpoint' });
                    }
                    else if (wrt.pointsApproximatelyEqual(w.data.endpoint, part.data.startpoint)) {
                        connectedWallsMap.add(w.data.key, { connectedTo: 'startpoint', connectedFrom: 'endpoint' });
                    }
                }
            });
            var wallsAtEndpoint = wrt.getAllWallsAtIntersection(part.data.endpoint, true);
            wallsAtEndpoint.iterator.each(function (w) {
                if (w.data.key !== part.data.key) {
                    if (wrt.pointsApproximatelyEqual(w.data.startpoint, part.data.endpoint)) {
                        connectedWallsMap.add(w.data.key, { connectedTo: 'endpoint', connectedFrom: 'startpoint' });
                    }
                    else if (wrt.pointsApproximatelyEqual(w.data.endpoint, part.data.endpoint)) {
                        connectedWallsMap.add(w.data.key, { connectedTo: 'endpoint', connectedFrom: 'endpoint' });
                    }
                }
            });
            var ptToUse = fp.toolManager.draggingTool.isGridSnapEnabled ? gridPt : pt;
            var wall = part;
            var changedWalls = new go.Set();
            moveAndUpdate(ptToUse);
            function moveAndUpdate(pointToUse) {
                var dx = pointToUse.x - curLoc.x;
                var dy = pointToUse.y - curLoc.y;
                fp.model.set(part.data, 'startpoint', new go.Point(part.data.startpoint.x + dx, part.data.startpoint.y + dy));
                fp.model.set(part.data, 'endpoint', new go.Point(part.data.endpoint.x + dx, part.data.endpoint.y + dy));
                wrt.performMiteringOnWall(wall);
                connectedWallsMap.iterator.each(function (kvp) {
                    var wKey = kvp.key;
                    var d = kvp.value;
                    var w = fp.findNodeForKey(wKey);
                    if (w != null && w.data.key !== wall.data.key) {
                        fp.model.set(w.data, d.connectedFrom, part.data[d.connectedTo]);
                        wrt.performMiteringOnWall(w);
                    }
                });
                wrt.performMiteringAtPoint(wall.data.startpoint, true);
                wrt.performMiteringAtPoint(wall.data.endpoint, true);
                curLoc = wall.location;
                connectedWallsMap.iterator.each(function (kvp) {
                    var w = fp.findNodeForKey(kvp.key);
                    changedWalls.add(w);
                });
                changedWalls.add(wall);
                fp.updateWallDimensions(changedWalls);
                fp.updateWallAngles();
            }
            var allWalls = fp.findNodesByExample({ category: 'WallGroup' });
            allWalls.iterator.each(function (n) {
                var w = n;
                if (wall && wall.data.key !== w.data.key && fp.getWallsIntersection(wall, w)) {
                    if (!changedWalls.contains(w)) {
                        moveAndUpdate(origLoc);
                        return origLoc;
                    }
                }
            });
            return wall.location;
        },
        copyable: false
    }, $(go.Shape, {
        name: 'SHAPE',
        fill: 'lightgray', stroke: 'black', strokeWidth: 1
    }, new go.Binding('fill', 'color'), new go.Binding('stroke', 'isSelected', function (s, obj) {
        if (obj.part.containingGroup != null) {
            var group = obj.part.containingGroup;
            if (s) {
                group.data.isSelected = true;
            }
        }
        return s ? 'dodgerblue' : 'black';
    }).ofObject()));
}
function makeTextureBrush(src) {
    var $ = go.GraphObject.make;
    if (src === null || src === undefined) {
        src = 'images/textures/floor1.jpg';
    }
    var textureImage = new Image();
    textureImage.src = src;
    return $(go.Brush, 'Pattern', { pattern: textureImage });
}
function makeTextureSelectionAdornment(textures) {
    var $ = go.GraphObject.make;
    return $(go.Adornment, 'Spot', { locationObjectName: 'BIGPANEL' }, new go.Binding('location', '', function (obj) {
        if (obj.data.category === 'RoomNode') {
            var roomLabel = obj.adornedPart.findObject('ROOM_LABEL');
            var loc = roomLabel.getDocumentPoint(go.Spot.BottomLeft);
            return loc;
        }
        else {
            return obj.adornedPart.getDocumentPoint(go.Spot.BottomLeft);
        }
    }).ofObject(), new go.Binding('visible', '', function (adorn) {
        var node = adorn.adornedPart;
        if (node.category !== 'RoomNode') {
            return node.data.usesTexture;
        }
        return true;
    }).ofObject(), $(go.Placeholder), $(go.Panel, 'Horizontal', { name: 'BIGPANEL' }, $('Button', {
        desiredSize: new go.Size(15, 15),
        click: function (e, obj) {
            var adorn = obj.part;
            var node = adorn.adornedPart;
            if (node !== null) {
                var fp = node.diagram;
                fp.model.setDataProperty(node.data, 'showTextureOptions', !node.data.showTextureOptions);
                node.updateAdornments();
            }
        }
    }, new go.Binding('visible', '', function (adorn) {
        var node = adorn.adornedPart;
        if (node !== null && (node.diagram instanceof go.Palette || node.category === 'RoomNode')) {
            return false;
        }
        return true;
    }).ofObject(), $(go.Shape, 'TriangleLeft', { desiredSize: new go.Size(10, 10), name: 'BUTTONSHAPE' }, new go.Binding('figure', 'showTextureOptions', function (sto) {
        return sto ? 'TriangleLeft' : 'TriangleRight';
    }))), $(go.Panel, 'Horizontal', {
        name: 'PANEL',
        itemArray: textures,
        itemTemplate: $('Button', {
            desiredSize: new go.Size(30, 30),
            click: function (e, button) {
                if (button.part === null || !(button instanceof go.Panel))
                    return;
                var adorn = button.part;
                var node = adorn.adornedPart;
                var imagePicture = button.findObject('BUTTON_IMAGE');
                var imageSource = imagePicture.source;
                if (node.category === 'RoomNode') {
                    e.diagram.model.setDataProperty(node.data, 'floorImage', imageSource);
                }
                else {
                    e.diagram.model.setDataProperty(node.data, 'texture', imageSource);
                }
            }
        }, $(go.Picture, { name: 'BUTTON_IMAGE' }, new go.Binding('source', '', function (str, b) {
            if (typeof str !== 'string')
                return '';
            return './images/textures/' + str;
        })))
    }, new go.Binding('visible', '', function (a) {
        var node = a.adornedPart;
        if (node.diagram instanceof go.Palette)
            return false;
        if (node.category === 'RoomNode') {
            return node.data.showFlooringOptions;
        }
        else {
            var button = a.findObject('BUTTONSHAPE');
            if (button !== null) {
                return button.figure === 'TriangleLeft';
            }
        }
    }).ofObject(), new go.Binding('itemArray', '', function (data) {
        if (data.textures === undefined || data.textures === null) {
            return textures;
        }
        else {
            return data.textures;
        }
    }))));
}
function makeRoomNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Spot', {
        contextMenu: makeContextMenu(),
        toolTip: makeGroupToolTip(),
        selectionObjectName: 'SHAPE',
        rotateObjectName: 'SHAPE',
        locationSpot: go.Spot.TopLeft,
        reshapable: true,
        copyable: false,
        minSize: new go.Size(1, 1),
        movable: false,
        selectionAdornmentTemplate: makeTextureSelectionAdornment(['floor1.jpg', 'floor2.jpg', 'floor3.jpg', 'floor4.jpg', 'floor5.jpg', 'floor6.jpg', 'floor7.jpg']),
        locationObjectName: 'SHAPE',
        layerName: 'Background'
    }, new go.Binding('location', 'isSelected', function (s, node) {
        var loc = node.data.loc;
        if (s) {
            var sw = node.findObject('SHAPE').strokeWidth;
            var newPt = new go.Point(loc.x - sw * 2, loc.y - sw * 2);
            return newPt;
        }
        else {
            return (loc !== undefined) ? loc : node.location;
        }
    }).ofObject(), $(go.Shape, {
        name: 'SHAPE',
        fill: makeTextureBrush(null), stroke: 'black', strokeWidth: 1
    }, new go.Binding('stroke', 'isSelected', function (s, obj) {
        if (obj.part.containingGroup != null) {
            var group = obj.part.containingGroup;
            if (s) {
                group.data.isSelected = true;
            }
        }
        return s ? 'dodgerblue' : 'black';
    }).ofObject(), new go.Binding('strokeWidth', 'isSelected', function (s, obj) {
        return s ? 5 : 1;
    }).ofObject(), new go.Binding('fill', 'floorImage', function (src) {
        return makeTextureBrush(src);
    })), $(go.Panel, 'Horizontal', {
        cursor: 'move',
        name: 'ROOM_LABEL',
        _isNodeLabel: true
    }, new go.Binding('alignment', 'labelAlignment'), $(go.Panel, 'Auto', new go.Binding('visible', 'showLabel'), $(go.Shape, 'RoundedRectangle', { fill: 'beige', opacity: .5, stroke: null, strokeWidth: 3, name: 'ROOM_LABEL_SHAPE' }, new go.Binding('stroke', 'isSelected', function (is) {
        return is ? 'dodgerblue' : null;
    }).ofObject()), $(go.Panel, 'Vertical', $(go.TextBlock, 'Room Name', { editable: true, cursor: 'text', font: 'normal normal bold 13px sans-serif' }, new go.Binding('text', 'name').makeTwoWay()), $(go.TextBlock, 'Room Size', { name: 'ROOM_LABEL_SIZE' }, new go.Binding('text', '', function (room) {
        var fp = room.diagram;
        var area = fp.getRoomArea(room);
        var adjustedArea = fp.convertPixelsToUnits(fp.convertPixelsToUnits(area)).toFixed(2);
        return adjustedArea + fp.model.modelData.unitsAbbreviation + String.fromCharCode(178);
    }).ofObject()))), $('Button', {
        desiredSize: new go.Size(15, 15),
        click: function (e, button) {
            var r = button.part;
            if (r === null)
                return;
            e.diagram.model.setDataProperty(r.data, 'showFlooringOptions', !r.data.showFlooringOptions);
            var fp = e.diagram;
            fp.select(r);
        },
        toolTip: $(go.Adornment, 'Auto', $(go.Shape, { fill: '#FFFFCC' }), $(go.TextBlock, { margin: 4, text: 'Show/ hide floor types' }))
    }, new go.Binding('visible', 'isSelected').ofObject(), $(go.Shape, 'TriangleDown', { desiredSize: new go.Size(10, 10) }, new go.Binding('figure', 'showFlooringOptions', function (showFlooringOptions) {
        return showFlooringOptions ? 'TriangleUp' : 'TriangleDown';
    })))));
}
function getWallPartEndpoints(wallPart) {
    var loc = wallPart.location;
    var partLength = wallPart.data.length;
    var angle = 0;
    if (wallPart.containingGroup !== null) {
        var w = wallPart.containingGroup;
        angle = w.data.startpoint.directionPoint(w.data.endpoint);
    }
    else {
        angle = 180;
    }
    var point1 = new go.Point((loc.x + (partLength / 2)), loc.y);
    var point2 = new go.Point((loc.x - (partLength / 2)), loc.y);
    point1.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
    point2.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
    var arr = [];
    arr.push(point1);
    arr.push(point2);
    return arr;
}
function getWallPartStretch(part) {
    var wall = part.containingGroup;
    if (wall === null)
        return;
    var startpoint = wall.data.startpoint.copy();
    var endpoint = wall.data.endpoint.copy();
    var leftOrAbove = new go.Set();
    var rightOrBelow = new go.Set();
    wall.memberParts.iterator.each(function (wallPart) {
        if (wallPart.data.key !== part.data.key) {
            var endpoints = getWallPartEndpoints(wallPart);
            for (var i = 0; i < endpoints.length; i++) {
                if (endpoints[i].x < part.location.x || (endpoints[i].y > part.location.y && endpoints[i].x === part.location.x)) {
                    leftOrAbove.add(endpoints[i]);
                }
                else {
                    rightOrBelow.add(endpoints[i]);
                }
            }
        }
    });
    if (parseFloat(startpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) ||
        (startpoint.y > part.location.y && parseFloat(startpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))) {
        leftOrAbove.add(startpoint);
    }
    else {
        rightOrBelow.add(startpoint);
    }
    if (parseFloat(endpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) ||
        (endpoint.y > part.location.y && parseFloat(endpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))) {
        leftOrAbove.add(endpoint);
    }
    else {
        rightOrBelow.add(endpoint);
    }
    var leftOrAbovePt;
    var closestDistLeftOrAbove = Number.MAX_VALUE;
    leftOrAbove.iterator.each(function (point) {
        var pt = point;
        var distance = Math.sqrt(pt.distanceSquaredPoint(part.location));
        if (distance < closestDistLeftOrAbove) {
            closestDistLeftOrAbove = distance;
            leftOrAbovePt = pt;
        }
    });
    var rightOrBelowPt;
    var closestDistRightOrBelow = Number.MAX_VALUE;
    rightOrBelow.iterator.each(function (point) {
        var pt = point;
        var distance = Math.sqrt(pt.distanceSquaredPoint(part.location));
        if (distance < closestDistRightOrBelow) {
            closestDistRightOrBelow = distance;
            rightOrBelowPt = pt;
        }
    });
    var stretch = { point1: leftOrAbovePt, point2: rightOrBelowPt };
    return stretch;
}
var dragWallParts = function (part, pt, gridPt) {
    if (part.containingGroup !== null && part.containingGroup.category === 'WallGroup') {
        var floorplan_1 = part.diagram;
        var wall = part.containingGroup;
        var wStart = wall.data.startpoint;
        var wEnd = wall.data.endpoint;
        var dist1 = Math.sqrt(wStart.distanceSquaredPoint(part.location));
        var dist2 = Math.sqrt(part.location.distanceSquaredPoint(wEnd));
        var totalDist = Math.sqrt(wStart.distanceSquaredPoint(wEnd));
        if (dist1 + dist2 !== totalDist) {
            part.location = part.location.copy().projectOntoLineSegmentPoint(wStart, wEnd);
        }
        var stretch = getWallPartStretch(part);
        var leftOrAbovePt = stretch.point1;
        var rightOrBelowPt = stretch.point2;
        var totalLength = Math.sqrt(leftOrAbovePt.distanceSquaredPoint(rightOrBelowPt));
        var distance = (part.data.length / 2);
        var point1 = new go.Point(leftOrAbovePt.x + ((distance / totalLength) * (rightOrBelowPt.x - leftOrAbovePt.x)), leftOrAbovePt.y + ((distance / totalLength) * (rightOrBelowPt.y - leftOrAbovePt.y)));
        var point2 = new go.Point(rightOrBelowPt.x + ((distance / totalLength) * (leftOrAbovePt.x - rightOrBelowPt.x)), rightOrBelowPt.y + ((distance / totalLength) * (leftOrAbovePt.y - rightOrBelowPt.y)));
        var distFromWall = Math.abs(((wEnd.y - wStart.y) * pt.x) - ((wEnd.x - wStart.x) * pt.y) + (wEnd.x * wStart.y) - (wEnd.y * wStart.x)) /
            Math.sqrt(Math.pow((wEnd.y - wStart.y), 2) + Math.pow((wEnd.x - wStart.x), 2));
        var tolerance = (20 * wall.data.thickness < 100) ? (20 * wall.data.thickness) : 100;
        if (distFromWall > tolerance) {
            part.containingGroup = null;
            delete part.data.group;
            part.angle = 0;
            floorplan_1.pointNodes.iterator.each(function (node) { floorplan_1.remove(node); });
            floorplan_1.dimensionLinks.iterator.each(function (link) { floorplan_1.remove(link); });
            floorplan_1.pointNodes.clear();
            floorplan_1.dimensionLinks.clear();
            floorplan_1.updateWallDimensions();
        }
        pt = pt.copy().projectOntoLineSegmentPoint(point1, point2);
        floorplan_1.skipsUndoManager = true;
        floorplan_1.startTransaction('set loc');
        floorplan_1.model.setDataProperty(part.data, 'loc', go.Point.stringify(pt));
        floorplan_1.commitTransaction('set loc');
        floorplan_1.skipsUndoManager = false;
        floorplan_1.updateWallDimensions();
    }
    return pt;
};
function makeWallPartResizeAdornment() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, 'Spot', { name: 'WallPartResizeAdornment' }, $(go.Placeholder), $(go.Shape, { alignment: go.Spot.Left, cursor: 'w-resize', figure: 'Diamond', desiredSize: new go.Size(7, 7), fill: '#ffffff', stroke: '#808080' }), $(go.Shape, { alignment: go.Spot.Right, cursor: 'e-resize', figure: 'Diamond', desiredSize: new go.Size(7, 7), fill: '#ffffff', stroke: '#808080' }));
}
function makeDoorSelectionAdornment() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, 'Vertical', { name: 'DoorSelectionAdornment' }, $(go.Panel, 'Auto', $(go.Shape, { fill: null, stroke: null }), $(go.Placeholder)), $(go.Panel, 'Horizontal', { defaultStretch: go.GraphObject.Vertical }, $('Button', $(go.Picture, { source: 'images/flipDoorOpeningLeft.png', column: 0, desiredSize: new go.Size(12, 12) }, new go.Binding('source', '', function (obj) {
        if (obj.adornedPart === null) {
            return 'images/flipDoorOpeningRight.png';
        }
        else if (obj.adornedPart.data.swing === 'left') {
            return 'images/flipDoorOpeningRight.png';
        }
        else {
            return 'images/flipDoorOpeningLeft.png';
        }
    }).ofObject()), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null && part.diagram !== null) {
                var floorplan = part.diagram;
                floorplan.startTransaction('flip door');
                var adorn = obj.part;
                var door = adorn.adornedPart;
                if (door !== null) {
                    if (door.data.swing === 'left') {
                        floorplan.model.setDataProperty(door.data, 'swing', 'right');
                    }
                    else {
                        floorplan.model.setDataProperty(door.data, 'swing', 'left');
                    }
                    floorplan.commitTransaction('flip door');
                }
            }
        },
        toolTip: $(go.Adornment, 'Auto', $(go.Shape, { fill: '#FFFFCC' }), $(go.TextBlock, { margin: 4, text: 'Flip Door Opening' }))
    }, new go.Binding('visible', '', function (obj) { return (obj.adornedPart === null) ? false : (obj.adornedPart.containingGroup !== null); }).ofObject()), $('Button', $(go.Picture, { source: 'images/flipDoorSide.png', column: 0, desiredSize: new go.Size(12, 12) }), {
        click: function (e, obj) {
            var part = obj.part;
            if (part !== null && part.diagram !== null) {
                var floorplan = part.diagram;
                floorplan.startTransaction('rotate door');
                var adorn = obj.part;
                var door = adorn.adornedPart;
                door.angle = (door.angle + 180) % 360;
                floorplan.commitTransaction('rotate door');
            }
        },
        toolTip: $(go.Adornment, 'Auto', $(go.Shape, { fill: '#FFFFCC' }), $(go.TextBlock, { margin: 4, text: 'Flip Door Side' }))
    }), new go.Binding('visible', '', function (obj) { return (obj.adornedPart === null) ? false : (obj.adornedPart.containingGroup !== null); }).ofObject()));
}
function makeWindowNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Spot', {
        contextMenu: makeContextMenu(),
        selectionObjectName: 'SHAPE',
        selectionAdorned: false,
        locationSpot: go.Spot.Center,
        toolTip: makeNodeToolTip(),
        minSize: new go.Size(5, 5),
        resizable: true,
        resizeAdornmentTemplate: makeWallPartResizeAdornment(),
        resizeObjectName: 'SHAPE',
        rotatable: false,
        dragComputation: dragWallParts,
        layerName: 'Foreground'
    }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), new go.Binding('angle').makeTwoWay(), $(go.Shape, { name: 'SHAPE', fill: 'white', strokeWidth: 0 }, new go.Binding('width', 'length').makeTwoWay(), new go.Binding('height').makeTwoWay(), new go.Binding('stroke', 'isSelected', function (s, obj) { return s ? 'dodgerblue' : 'black'; }).ofObject(), new go.Binding('fill', 'isSelected', function (s, obj) { return s ? 'lightgray' : 'white'; }).ofObject()), $(go.Shape, { name: 'LINESHAPE', fill: 'darkgray', strokeWidth: 0, height: 10 }, new go.Binding('width', 'length', function (width, obj) { return width - 10; }), new go.Binding('height', 'height', function (height, obj) { return (height / 5); }), new go.Binding('stroke', 'isSelected', function (s, obj) { return s ? 'dodgerblue' : 'black'; }).ofObject()));
}
function makeDoorNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Spot', {
        contextMenu: makeContextMenu(),
        selectionObjectName: 'SHAPE',
        selectionAdornmentTemplate: makeDoorSelectionAdornment(),
        locationSpot: go.Spot.BottomCenter,
        resizable: true,
        resizeObjectName: 'OPENING_SHAPE',
        toolTip: makeNodeToolTip(),
        minSize: new go.Size(10, 10),
        dragComputation: dragWallParts,
        resizeAdornmentTemplate: makeWallPartResizeAdornment(),
        layerName: 'Foreground'
    }, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), new go.Binding('angle').makeTwoWay(), new go.Binding('locationSpot', 'doorOpeningHeight', function (doh, obj) { return new go.Spot(0.5, 1, 0, -(doh / 2)); }), $(go.Shape, { name: 'SHAPE', fill: 'rgba(0, 0, 0, 0)' }, new go.Binding('width', 'length'), new go.Binding('height', 'length').makeTwoWay(), new go.Binding('stroke', 'isSelected', function (s, obj) { return s ? 'dodgerblue' : 'black'; }).ofObject(), new go.Binding('geometryString', 'swing', function (swing) {
        if (swing === 'left') {
            return 'F1 M0,0 v-150 a150,150 0 0,1 150,150 ';
        }
        else {
            return 'F1 M275,175 v-150 a150,150 0 0,0 -150,150 ';
        }
    })), $(go.Shape, {
        name: 'OPENING_SHAPE', fill: 'white',
        strokeWidth: 0, height: 5, width: 40,
        alignment: go.Spot.BottomCenter, alignmentFocus: go.Spot.Top
    }, new go.Binding('height', 'doorOpeningHeight').makeTwoWay(), new go.Binding('stroke', 'isSelected', function (s, obj) { return s ? 'dodgerblue' : 'black'; }).ofObject(), new go.Binding('fill', 'isSelected', function (s, obj) { return s ? 'lightgray' : 'white'; }).ofObject(), new go.Binding('width', 'length').makeTwoWay()));
}
function makePaletteWallNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, 'Spot', { selectionAdorned: false }, $(go.Shape, { name: 'SHAPE', fill: 'black', strokeWidth: 0, height: 10, figure: 'Rectangle' }, new go.Binding('width', 'length').makeTwoWay(), new go.Binding('height').makeTwoWay(), new go.Binding('fill', 'isSelected', function (s, obj) { return s ? 'dodgerblue' : 'black'; }).ofObject(), new go.Binding('stroke', 'isSelected', function (s, obj) { return s ? 'dodgerblue' : 'black'; }).ofObject()));
}
var FURNITURE_NODE_DATA_ARRAY = [
    {
        category: 'MultiPurposeNode',
        key: 'MultiPurposeNode',
        caption: 'Multi Purpose Node',
        color: '#ffffff',
        stroke: '#000000',
        name: 'Writable Node',
        type: 'Writable Node',
        shape: 'Rectangle',
        text: 'Write here',
        showLabel: true,
        width: 60,
        height: 60,
        notes: '',
        texture: 'granite1.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['wood1.jpg', 'wood2.jpg', 'granite1.jpg', 'porcelain1.jpg', 'steel1.jpg']
    },
    {
        key: 'roundTable',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Round Table',
        type: 'Round Table',
        shape: 'Ellipse',
        width: 61,
        height: 61,
        notes: '',
        texture: 'wood1.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['wood1.jpg', 'wood2.jpg', 'floor3.jpg', 'granite1.jpg', 'porcelain1.jpg']
    },
    {
        key: 'armChair',
        color: 'purple',
        stroke: '#000000',
        caption: 'Arm Chair',
        type: 'Arm Chair',
        geo: 'F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30',
        width: 45,
        height: 45,
        notes: '',
        texture: 'fabric1.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['fabric1.jpg', 'fabric2.jpg', 'fabric3.jpg']
    },
    {
        key: 'sofaMedium',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Sofa',
        type: 'Sofa',
        geo: 'F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35',
        height: 45,
        width: 90,
        notes: '',
        texture: 'fabric2.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['fabric1.jpg', 'fabric2.jpg', 'fabric3.jpg']
    },
    {
        key: 'sink',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Sink',
        type: 'Sink',
        geo: 'F1 M0 0 L40 0 40 40 0 40 0 0z M5 7.5 L18.5 7.5 M 21.5 7.5 L35 7.5 35 35 5 35 5 7.5 M 15 21.25 A 5 5 180 1 0 15 21.24' +
            'M23 3.75 A 3 3 180 1 1 23 3.74 M21.5 6.25 L 21.5 12.5 18.5 12.5 18.5 6.25 M15 3.75 A 1 1 180 1 1 15 3.74' +
            'M 10 4.25 L 10 3.25 13 3.25 M 13 4.25 L 10 4.25 M27 3.75 A 1 1 180 1 1 27 3.74 M 26.85 3.25 L 30 3.25 30 4.25 M 26.85 4.25 L 30 4.25',
        width: 27,
        height: 27,
        notes: '',
        texture: 'steel1.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['copper1.jpg', 'steel1.jpg', 'steel2.jpg', 'porcelain1.jpg']
    },
    {
        key: 'doubleSink',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Double Sink',
        type: 'Double Sink',
        geo: 'F1 M0 0 L75 0 75 40 0 40 0 0 M5 7.5 L35 7.5 35 35 5 35 5 7.5 M44 7.5 L70 7.5 70 35 40 35 40 9' +
            'M15 21.25 A5 5 180 1 0 15 21.24 M50 21.25 A 5 5 180 1 0 50 21.24 M40.5 3.75 A3 3 180 1 1 40.5 3.74' +
            'M40.5 3.75 L50.5 13.75 47.5 16.5 37.5 6.75 M32.5 3.75 A 1 1 180 1 1 32.5 3.74 M 27.5 4.25 L 27.5 3.25 30.5 3.25' +
            'M 30.5 4.25 L 27.5 4.25 M44.5 3.75 A 1 1 180 1 1 44.5 3.74 M 44.35 3.25 L 47.5 3.25 47.5 4.25 M 44.35 4.25 L 47.5 4.25',
        height: 27,
        width: 52,
        notes: '',
        texture: 'steel2.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['copper1.jpg', 'steel1.jpg', 'steel2.jpg', 'porcelain1.jpg']
    },
    {
        key: 'toilet',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Toilet',
        type: 'Toilet',
        geo: 'F1 M0 0 L25 0 25 10 0 10 0 0 M20 10 L20 15 5 15 5 10 20 10 M5 15 Q0 15 0 25 Q0 40 12.5 40 Q25 40 25 25 Q25 15 20 15',
        width: 25,
        height: 35,
        notes: '',
        texture: 'porcelain1.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['copper1.jpg', 'steel1.jpg', 'porcelain1.jpg']
    },
    {
        key: 'shower',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Shower/Tub',
        type: 'Shower/Tub',
        geo: 'F1 M0 0 L40 0 40 60 0 60 0 0 M35 15 L35 55 5 55 5 15 Q5 5 20 5 Q35 5 35 15 M22.5 20 A2.5 2.5 180 1 1 22.5 19.99',
        width: 45,
        height: 75,
        notes: '',
        texture: 'copper1.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['copper1.jpg', 'steel1.jpg', 'porcelain1.jpg']
    },
    {
        key: 'bed',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Bed',
        type: 'Bed',
        geo: 'F1 M0 0 L40 0 40 60 0 60 0 0 M 7.5 2.5 L32.5 2.5 32.5 17.5 7.5 17.5 7.5 2.5 M0 20 L40 20 M0 25 L40 25',
        width: 76.2,
        height: 101.6,
        notes: '',
        texture: 'fabric3.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['fabric1.jpg', 'fabric2.jpg', 'fabric3.jpg']
    },
    {
        key: 'staircase',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Staircase',
        type: 'Staircase',
        geo: 'F1 M0 0 L 0 100 250 100 250 0 0 0 M25 100 L 25 0 M 50 100 L 50 0 M 75 100 L 75 0' +
            'M 100 100 L 100 0 M 125 100 L 125 0 M 150 100 L 150 0 M 175 100 L 175 0 M 200 100 L 200 0 M 225 100 L 225 0',
        width: 125,
        height: 50,
        notes: '',
        texture: '',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['wood1.jpg', 'floor1.jpg', 'wood2.jpg', 'steel2.jpg', 'floor2.jpg']
    },
    {
        key: 'stove',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Stove',
        type: 'Stove',
        geo: 'F1 M 0 0 L 0 100 100 100 100 0 0 0' +
            'M 30 15 A 15 15 180 1 0 30.01 15' +
            'M 30 20 A 10 10 180 1 0 30.01 20' +
            'M 30 25 A 5 5 180 1 0 30.01 25' +
            'M 70 15 A 15 15 180 1 0 70.01 15' +
            'M 70 20 A 10 10 180 1 0 70.01 20' +
            'M 70 25 A 5 5 180 1 0 70.01 25' +
            'M 30 55 A 15 15 180 1 0 30.01 55' +
            'M 30 60 A 10 10 180 1 0 30.01 60' +
            'M 30 65 A 5 5 180 1 0 30.01 65' +
            'M 70 55 A 15 15 180 1 0 70.01 55' +
            'M 70 60 A 10 10 180 1 0 70.01 60' +
            'M 70 65 A 5 5 180 1 0 70.01 65',
        width: 75,
        height: 75,
        notes: '',
        texture: 'plaster1.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['steel1.jpg', 'porcelain1.jpg', 'copper1.jpg', 'plaster1.jpg']
    },
    {
        key: 'diningTable',
        color: '#ffffff',
        stroke: '#000000',
        caption: 'Dining Table',
        type: 'Dining Table',
        geo: 'F1 M 0 0 L 0 100 200 100 200 0 0 0 M 25 0 L 25 -10 75 -10 75 0 M 125 0 L 125 -10 175 -10 175 0' +
            ' M 200 25 L 210 25 210 75 200 75 M 125 100 L 125 110 L 175 110 L 175 100 M 25 100 L 25 110 75 110 75 100 M 0 75 -10 75 -10 25 0 25',
        width: 125,
        height: 62.5,
        notes: '',
        texture: 'wood2.jpg',
        usesTexture: true,
        showTextureOptions: true,
        textures: ['wood1.jpg', 'wood2.jpg', 'floor3.jpg', 'granite1.jpg', 'porcelain1.jpg', 'steel2.jpg']
    }
];
var WALLPARTS_NODE_DATA_ARRAY = [
    {
        category: 'WindowNode',
        key: 'window',
        color: 'white',
        caption: 'Window',
        type: 'Window',
        shape: 'Rectangle',
        height: 10,
        length: 60,
        notes: ''
    },
    {
        key: 'door',
        category: 'DoorNode',
        caption: 'Door',
        type: 'Door',
        length: 40,
        doorOpeningHeight: 5,
        swing: 'left',
        notes: ''
    },
    {
        key: 'floor',
        category: 'FloorNode',
        src: 'images/textures/floor1.jpg'
    }
];


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(0);
var NodeLabelDraggingTool = (function (_super) {
    __extends(NodeLabelDraggingTool, _super);
    function NodeLabelDraggingTool() {
        var _this = _super.call(this) || this;
        _this.name = 'NodeLabelDragging';
        _this.label = null;
        _this._offset = new go.Point();
        _this._originalAlignment = null;
        _this._originalCenter = null;
        return _this;
    }
    NodeLabelDraggingTool.prototype.canStart = function () {
        if (!go.Tool.prototype.canStart.call(this))
            return false;
        var diagram = this.diagram;
        if (diagram === null)
            return false;
        var e = diagram.lastInput;
        if (!e.left)
            return false;
        if (!this.isBeyondDragSize())
            return false;
        return this.findLabel() !== null;
    };
    NodeLabelDraggingTool.prototype.findLabel = function () {
        var diagram = this.diagram;
        var e = diagram.firstInput;
        var elt = diagram.findObjectAt(e.documentPoint, null, null);
        if (elt === null || !(elt.part instanceof go.Node))
            return null;
        if (elt.part instanceof go.Node) {
            elt.part.isSelected = true;
        }
        while (elt.panel !== null) {
            if (elt._isNodeLabel && elt.panel.type === go.Panel.Spot && elt.panel.findMainElement() !== elt)
                return elt;
            elt = elt.panel;
        }
        return null;
    };
    NodeLabelDraggingTool.prototype.doActivate = function () {
        this.startTransaction('Shifted Label');
        this.label = this.findLabel();
        if (this.label !== null) {
            this._offset = this.diagram.firstInput.documentPoint.copy().subtract(this.label.getDocumentPoint(go.Spot.Center));
            this._originalAlignment = this.label.alignment.copy();
            if (this.label !== null && this.label.panel !== null) {
                var main = this.label.panel.findMainElement();
                if (main !== null) {
                    this._originalCenter = main.getDocumentPoint(go.Spot.Center);
                }
            }
        }
        go.Tool.prototype.doActivate.call(this);
    };
    NodeLabelDraggingTool.prototype.doDeactivate = function () {
        go.Tool.prototype.doDeactivate.call(this);
        this.stopTransaction();
    };
    NodeLabelDraggingTool.prototype.doStop = function () {
        this.label = null;
        go.Tool.prototype.doStop.call(this);
    };
    NodeLabelDraggingTool.prototype.doCancel = function () {
        if (this.label !== null && this._originalAlignment !== null) {
            var node = this.label.part;
            this.diagram.model.set(node.data, 'labelAlignment', this._originalAlignment);
        }
        go.Tool.prototype.doCancel.call(this);
    };
    NodeLabelDraggingTool.prototype.doMouseMove = function () {
        if (!this.isActive)
            return;
        this.updateAlignment();
    };
    NodeLabelDraggingTool.prototype.doMouseUp = function () {
        if (!this.isActive)
            return;
        this.updateAlignment();
        this.transactionResult = 'Shifted Label';
        this.stopTool();
    };
    NodeLabelDraggingTool.prototype.updateAlignment = function () {
        if (this.label === null)
            return;
        var last = this.diagram.lastInput.documentPoint;
        var cntr = this._originalCenter;
        if (cntr !== null) {
            var align = new go.Spot(0.5, 0.5, last.x - this._offset.x - cntr.x, last.y - this._offset.y - cntr.y);
            var node = this.label.part;
            this.diagram.model.set(node.data, 'labelAlignment', align);
        }
    };
    return NodeLabelDraggingTool;
}(go.Tool));
exports.NodeLabelDraggingTool = NodeLabelDraggingTool;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(0);
var FloorplanPalette = (function (_super) {
    __extends(FloorplanPalette, _super);
    function FloorplanPalette(div, floorplan) {
        var _this = _super.call(this, div) || this;
        var $ = go.GraphObject.make;
        _this.contentAlignment = go.Spot.Center;
        _this.nodeTemplateMap = floorplan.nodeTemplateMap;
        _this.nodeTemplateMap.add('FloorNode', $(go.Node, 'Auto', $(go.Shape, { fill: makeFloorBrush(null), desiredSize: new go.Size(100, 100) }, new go.Binding('fill', 'floorImage', function (src) {
            return makeFloorBrush(src);
        })), $(go.TextBlock, 'Drag me out to a wall-enclosed space to create a room', { desiredSize: new go.Size(90, NaN) }, new go.Binding('visible', '', function (node) {
            if (node.diagram instanceof go.Palette) {
                return true;
            }
            return false;
        }).ofObject())));
        _this.toolManager.contextMenuTool.isEnabled = false;
        floorplan.palettes.push(_this);
        return _this;
    }
    return FloorplanPalette;
}(go.Palette));
exports.FloorplanPalette = FloorplanPalette;
function makeFloorBrush(src) {
    var $ = go.GraphObject.make;
    if (src === null || src === undefined) {
        src = 'images/textures/floor1.jpg';
    }
    var floorImage = new Image();
    floorImage.src = src;
    return $(go.Brush, 'Pattern', { pattern: floorImage });
}


/***/ })
/******/ ]);
//# sourceMappingURL=gfp.js.map