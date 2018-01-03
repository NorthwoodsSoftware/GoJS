var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
        define(["require", "exports", "../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    // A custom LinkReshapingTool that snaps dragged reshaping handles to grid points.
    /**
    * @constructor
    * @extends LinkReshapingTool
    * @class
    * This SnapLinkReshapingTool class supports snapping reshaping handles to go to the nearest grid point.
    */
    var SnapLinkReshapingTool = /** @class */ (function (_super) {
        __extends(SnapLinkReshapingTool, _super);
        function SnapLinkReshapingTool() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** @type {Size} */
            _this._gridCellSize = new go.Size(NaN, NaN);
            /** @type {Point} */
            _this._gridOrigin = new go.Point(NaN, NaN);
            /** @type {boolean} */
            _this._isGridSnapEnabled = true;
            return _this;
        }
        Object.defineProperty(SnapLinkReshapingTool.prototype, "gridCellSize", {
            /**
            * Gets or sets the {@link Size} of each grid cell to which link points will be snapped.
            * The default value is NaNxNaN, which means use the {@link Diagram#grid}'s {@link Panel#gridCellSize}.
            * @name SnapLinkReshapingTool#gridCellSize
            * @function.
            * @return {Size}
            */
            get: function () { return this._gridCellSize; },
            set: function (val) {
                if (!(val instanceof go.Size))
                    throw new Error("new value for SnapLinkReshapingTool.gridCellSize must be a Size, not: " + val);
                this._gridCellSize = val.copy();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapLinkReshapingTool.prototype, "gridOrigin", {
            /**
            * Gets or sets the {@link Point} origin for the grid to which link points will be snapped.
            * The default value is NaN,NaN, which means use the {@link Diagram#grid}'s {@link Panel#gridOrigin}.
            * @name SnapLinkReshapingTool#gridOrigin
            * @function.
            * @return {Point}
            */
            get: function () { return this._gridOrigin; },
            set: function (val) {
                if (!(val instanceof go.Point))
                    throw new Error("new value for SnapLinkReshapingTool.gridOrigin must be a Point, not: " + val);
                this._gridOrigin = val.copy();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SnapLinkReshapingTool.prototype, "isGridSnapEnabled", {
            /**
            * Gets or sets whether a reshape handle's position should be snapped to a grid point.
            * The default value is true.
            * This affects the behavior of {@link #computeReshape}.
            */
            get: function () { return this._isGridSnapEnabled; },
            set: function (val) {
                if (typeof val !== "boolean")
                    throw new Error("new value for SnapLinkReshapingTool.isGridSnapEnabled must be a boolean, not: " + val);
                this._isGridSnapEnabled = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @override
        * Pretend while dragging a reshape handle the mouse point is at the nearest grid point,
        * if {@link #isGridSnapEnabled} is true.
        * This uses {@link #gridCellSize} and {@link #gridOrigin}, unless those are not real values,
        * in which case this uses the {@link Diagram#grid}'s {@link Panel#gridCellSize} and {@link Panel#gridOrigin}.
        * @this {SnapLinkReshapingTool}
        * @param {Point} p
        * @return {Point}
        */
        SnapLinkReshapingTool.prototype.computeReshape = function (p) {
            var pt = p;
            if (this.isGridSnapEnabled) {
                // first, find the grid to which we should snap
                var cell = this.gridCellSize;
                var orig = this.gridOrigin;
                if (!cell.isReal() || cell.width === 0 || cell.height === 0)
                    cell = this.diagram.grid.gridCellSize;
                if (!orig.isReal())
                    orig = this.diagram.grid.gridOrigin;
                // second, compute the closest grid point
                pt = p.copy().snapToGrid(orig.x, orig.y, cell.width, cell.height);
            }
            // then do whatever LinkReshapingTool would normally do as if the mouse were at that point
            return _super.prototype.computeReshape.call(this, pt);
        };
        return SnapLinkReshapingTool;
    }(go.LinkReshapingTool));
    exports.SnapLinkReshapingTool = SnapLinkReshapingTool;
});
