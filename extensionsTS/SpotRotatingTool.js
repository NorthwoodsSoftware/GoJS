/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpotRotatingTool = void 0;
    var go = require("../release/go.js");
    /**
    * A custom RotatingTool that also supports the user moving the point about which the object is rotated.
    *
    * This tool uses two separate Adornments -- the regular one holding the rotation handle and an
    * additional one named "MovingSpot" that holds the handle for interactively moving the
    * {@link RotatingTool#rotationPoint} by changing the {@link Part#rotationSpot}.
    * @category Tool Extension
    */
    var SpotRotatingTool = /** @class */ (function (_super) {
        __extends(SpotRotatingTool, _super);
        function SpotRotatingTool() {
            var _this = _super.call(this) || this;
            _this._originalRotationSpot = go.Spot.Default;
            var $ = go.GraphObject.make;
            _this._spotAdornmentTemplate =
                $(go.Adornment, "Spot", { locationSpot: go.Spot.Center, cursor: "move" }, $(go.Shape, "Circle", { fill: "lightblue", stroke: "dodgerblue", width: 10, height: 10 }), $(go.Shape, "Circle", { fill: "dodgerblue", strokeWidth: 0, width: 4, height: 4 }));
            return _this;
        }
        /**
         * In addition to updating the standard "Rotating" Adornment, this updates a "MovingSpot"
         * Adornment that the user may drag in order to move the {@link RotatingTool#rotationPoint}.
         * @param {Part} part
         */
        SpotRotatingTool.prototype.updateAdornments = function (part) {
            _super.prototype.updateAdornments.call(this, part);
            if (part === null)
                return;
            if (part.isSelected && !this.diagram.isReadOnly) {
                var rotateObj = part.rotateObject;
                if (rotateObj !== null && part.canRotate() && part.actualBounds.isReal() &&
                    part.isVisible() && rotateObj.actualBounds.isReal() && rotateObj.isVisibleObject()) {
                    var ad = part.findAdornment("RotateSpot");
                    if (ad === null || ad.adornedObject !== rotateObj) {
                        ad = this._spotAdornmentTemplate.copy();
                        ad.adornedObject = part.rotateObject;
                    }
                    if (ad !== null) {
                        ad.location = this.computeRotationPoint(ad.adornedObject);
                        part.addAdornment("RotateSpot", ad);
                        return;
                    }
                }
            }
            part.removeAdornment("RotateSpot");
        };
        ;
        /**
         * Change the positioning of the "Rotating" Adornment to adapt to the rotation point
         * potentially being well outside of the object being rotated.
         *
         * This assumes that {@link RotatingTool#handleAngle} is zero.
         * @param {GraphObject} obj the object being rotated
         * @returns Point in document coordinates
         */
        SpotRotatingTool.prototype.computeAdornmentLocation = function (obj) {
            var p = this.rotationPoint;
            if (!p.isReal())
                p = this.computeRotationPoint(obj);
            var q = obj.getLocalPoint(p);
            //??? ignores this.handleAngle
            q.x = Math.max(obj.naturalBounds.right, q.x) + this.handleDistance;
            return obj.getDocumentPoint(q);
        };
        /**
         * In addition to the standard behavior of {@link RotatingTool#canStart},
         * also start when the user starts dragging the "MovingSpot" adornment/handle.
         * @returns boolean
         */
        SpotRotatingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            var diagram = this.diagram;
            if (diagram.isReadOnly)
                return false;
            if (!diagram.allowRotate)
                return false;
            if (!diagram.lastInput.left)
                return false;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
            if (h !== null)
                return true;
            h = this.findToolHandleAt(diagram.firstInput.documentPoint, "RotateSpot");
            return (h !== null);
        };
        /**
         * @hidden @internal
         */
        SpotRotatingTool.prototype.doActivate = function () {
            // might be dragging the spot handle instead of the rotate handle
            this.handle = this.findToolHandleAt(this.diagram.firstInput.documentPoint, "RotateSpot");
            if (this.handle !== null) {
                var ad = this.handle.part;
                if (ad.adornedObject !== null) {
                    var part = ad.adornedPart;
                    if (part !== null)
                        this._originalRotationSpot = part.rotationSpot;
                }
            }
            // doActivate uses this.handle if it is set beforehand, rather than searching for a rotate handle
            _super.prototype.doActivate.call(this);
        };
        /**
         * @hidden @internal
         */
        SpotRotatingTool.prototype.doCancel = function () {
            if (this.adornedObject !== null) {
                var part = this.adornedObject.part;
                if (part !== null) {
                    part.rotationSpot = this._originalRotationSpot;
                    this.rotationPoint.set(this.computeRotationPoint(this.adornedObject));
                    this.updateAdornments(part);
                }
            }
            _super.prototype.doCancel.call(this);
        };
        /**
         * @hidden @internal
         */
        SpotRotatingTool.prototype.doMouseMove = function () {
            if (this.isActive) {
                if (this.handle !== null && this.handle.part && this.handle.part.category === "RotateSpot") {
                    // modify part.rotationSpot and this.rotationPoint
                    this.shiftRotationPoint();
                }
                else {
                    _super.prototype.doMouseMove.call(this);
                }
            }
        };
        /**
         * @hidden @internal
         */
        SpotRotatingTool.prototype.doMouseUp = function () {
            if (this.isActive) {
                if (this.handle !== null && this.handle.part && this.handle.part.category === "RotateSpot") {
                    // modify part.rotationSpot and this.rotationPoint
                    this.shiftRotationPoint();
                    this.transactionResult = "Shifted rotationSpot";
                    this.stopTool();
                }
                else {
                    _super.prototype.doMouseUp.call(this);
                }
            }
        };
        /**
         * This is called by mouse moves and mouse up events when the handle being dragged is "MovingSpot".
         * This needs to update the {@link Part#rotationSpot} and {@link RotatingTool#rotationPoint} properties.
         *
         * For each of the X and Y directions, when the handle is within the bounds of the rotated object,
         * the new rotation Spot will be purely fractional; when it is outside the Spot will be limited to
         * a fraction of zero or one (whichever is closer) and an absolute offset that places the rotation point
         * where the handle is.
         * @expose
         */
        SpotRotatingTool.prototype.shiftRotationPoint = function () {
            var dp = this.diagram.lastInput.documentPoint;
            var obj = this.adornedObject;
            if (obj === null)
                return;
            var w = obj.naturalBounds.width || 1; // disallow zero
            var h = obj.naturalBounds.height || 1;
            var part = obj.part;
            if (part === null)
                return;
            var op = obj.getLocalPoint(dp);
            var fx = (op.x < 0) ? 0 : (op.x > w ? 1 : op.x / w);
            var fy = (op.y < 0) ? 0 : (op.y > h ? 1 : op.y / h);
            var ox = (op.x < 0) ? op.x : (op.x > w ? op.x - w : 0);
            var oy = (op.y < 0) ? op.y : (op.y > h ? op.y - h : 0);
            part.rotationSpot = new go.Spot(fx, fy, ox, oy);
            this.rotationPoint.set(this.computeRotationPoint(obj));
            this.updateAdornments(part);
        };
        return SpotRotatingTool;
    }(go.RotatingTool));
    exports.SpotRotatingTool = SpotRotatingTool;
});
