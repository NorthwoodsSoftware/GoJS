/**
 * Copyright (C) 1998-2023 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * FLOOR PLANNER - WALL BUILDING TOOL
 * Used to construct new Walls in a Floorplan with mouse clicking / mouse point
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
    exports.WallBuildingTool = void 0;
    var go = require("../../../release/go");
    var WallBuildingTool = /** @class */ (function (_super) {
        __extends(WallBuildingTool, _super);
        function WallBuildingTool() {
            var _this = _super.call(this) || this;
            _this._buildingWall = null; // the wall being built
            // whether or not the "wall" we're building is really just a room / floor divider (not a physical wall)
            _this._isBuildingDivider = false;
            _this.name = 'WallBuilding';
            _this._startPoint = null;
            _this._endPoint = null;
            _this._wallReshapingTool = null;
            _this._isBuildingDivider = false;
            return _this;
        }
        Object.defineProperty(WallBuildingTool.prototype, "startPoint", {
            // Get / set the current startPoint
            get: function () { return this._startPoint; },
            set: function (value) { this._startPoint = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WallBuildingTool.prototype, "endPoint", {
            // Get / set the current endPoint
            get: function () { return this._endPoint; },
            set: function (value) { this._endPoint = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WallBuildingTool.prototype, "wallReshapingTool", {
            // Get / set the floorplan's WallReshapingTool
            get: function () { return this._wallReshapingTool; },
            set: function (value) { this._wallReshapingTool = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WallBuildingTool.prototype, "buildingWall", {
            // Get / set the wall being built
            get: function () { return this._buildingWall; },
            set: function (value) { this._buildingWall = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WallBuildingTool.prototype, "isBuildingDivider", {
            // Get / set whether or not we're actually building a room / floor divider, not a wall
            get: function () { return this._isBuildingDivider; },
            set: function (value) { this._isBuildingDivider = value; },
            enumerable: false,
            configurable: true
        });
        /**
         * Start wall building transaction.
         * If the mouse point is inside a wall or near a wall endpoint, snap to that wall or endpoint
         */
        WallBuildingTool.prototype.doActivate = function () {
            this.endPoint = null;
            this.startTransaction(this.name);
            this.diagram.isMouseCaptured = true;
            var tool = this;
            var fp = tool.diagram;
            var clickPt = tool.diagram.lastInput.documentPoint;
            var isSnapped = false;
            // if the clickPt is inside some other wall's geometry, project it onto that wall's segment
            var walls = fp.findNodesByExample({ category: 'WallGroup' });
            walls.iterator.each(function (w) {
                if (fp.isPointInWall(w, clickPt)) {
                    // don't check if you're inside the wall you're building, you obviously are
                    if (tool.buildingWall === null) {
                        var snapPt = clickPt.projectOntoLineSegmentPoint(w.data.startpoint, w.data.endpoint);
                        clickPt = snapPt;
                        isSnapped = true;
                    }
                }
            });
            // if the click point is close to another wall's start/endpoint, use that as the startpoint of the new wall
            walls.iterator.each(function (w) {
                var sp = w.data.startpoint;
                var ep = w.data.endpoint;
                var distSp = Math.sqrt(sp.distanceSquaredPoint(clickPt));
                // TODO probably need a better "closeness" metric than just a raw number -- it could be an optional parameter?
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
            // assign startpoint based on grid (iff startpoint was not determined by another wall's endpoint)
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
            // Default functionality:
            this.isActive = true;
        };
        /**
         * Add wall data to Floorplan and begin reshaping the new wall
         */
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
            // set the TransactionResult before raising event, in case it changes the result or cancels the tool
            tool.transactionResult = tool.name;
            diagram.raiseDiagramEvent('PartCreated', part);
            if (tool.wallReshapingTool === null)
                return;
            // start the wallReshapingTool, tell it what wall it's reshaping (more accurately, the shape that will have the reshape handle)
            tool.wallReshapingTool.isEnabled = true;
            diagram.select(part);
            tool.wallReshapingTool.isBuilding = true;
            tool.wallReshapingTool.adornedShape = part.findObject('SHAPE');
            tool.wallReshapingTool.doActivate();
        };
        /**
         * If user presses Esc key, cancel the wall building
         */
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
        /**
         * When the mouse moves, reshape the wall
         */
        WallBuildingTool.prototype.doMouseMove = function () {
            if (this.wallReshapingTool === null)
                return;
            this.diagram.currentCursor = 'crosshair';
            this.wallReshapingTool.doMouseMove();
        };
        /**
         * End transaction, update wall dimensions and geometries (mitering?)
         */
        WallBuildingTool.prototype.doDeactivate = function () {
            var diagram = this.diagram;
            this.buildingWall = null;
            this.diagram.currentCursor = '';
            this.diagram.isMouseCaptured = false;
            if (this.wallReshapingTool !== null) {
                this.wallReshapingTool.isEnabled = false;
                this.wallReshapingTool.adornedShape = null;
                this.wallReshapingTool.doMouseUp(); // perform mitering
                this.wallReshapingTool.doDeactivate();
                this.wallReshapingTool.isBuilding = false;
            }
            var fp = diagram;
            fp.updateWallDimensions();
            this.stopTransaction();
            this.isActive = false; // Default functionality
        };
        return WallBuildingTool;
    }(go.Tool));
    exports.WallBuildingTool = WallBuildingTool;
});
// export = WallBuildingTool;
