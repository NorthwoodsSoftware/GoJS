/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
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
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotateMultipleTool = void 0;
    var go = require("../release/go.js");
    /**
     * The RotateMultipleTool class lets the user rotate multiple objects at a time.
     * When more than one part is selected, rotates all parts, revolving them about their collective center.
     * If the control key is held down during rotation, rotates all parts individually.
     *
     * Caution: this only works for Groups that do *not* have a Placeholder.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/RotateMultiple.html">Rotate Multiple</a> sample.
     * @category Tool Extension
     */
    var RotateMultipleTool = /** @class */ (function (_super) {
        __extends(RotateMultipleTool, _super);
        /**
         * Constructs a RotateMultipleTool and sets the name for the tool.
         */
        function RotateMultipleTool() {
            var _this = _super.call(this) || this;
            /**
             * Holds references to all selected non-Link Parts and their offset & angles
             */
            _this._initialInfo = null;
            /**
             * Initial angle when rotating as a whole
             */
            _this._initialAngle = 0;
            /**
             * Rotation point of selection
             */
            _this._centerPoint = new go.Point();
            _this.name = 'RotateMultiple';
            return _this;
        }
        /**
         * Calls {@link RotatingTool#doActivate}, and then remembers the center point of the collection,
         * and the initial distances and angles of selected parts to the center.
         */
        RotateMultipleTool.prototype.doActivate = function () {
            _super.prototype.doActivate.call(this);
            var diagram = this.diagram;
            // center point of the collection
            this._centerPoint = diagram.computePartsBounds(diagram.selection).center;
            // remember the angle relative to the center point when rotating the whole collection
            this._initialAngle = this._centerPoint.directionPoint(diagram.lastInput.documentPoint);
            // remember initial angle and distance for each Part
            var infos = new go.Map();
            var tool = this;
            diagram.selection.each(function (part) {
                tool.walkTree(part, infos);
            });
            this._initialInfo = infos;
        };
        /**
         * @hidden @internal
         */
        RotateMultipleTool.prototype.walkTree = function (part, infos) {
            if (part === null || part instanceof go.Link)
                return;
            // distance from _centerPoint to locationSpot of part
            var dist = Math.sqrt(this._centerPoint.distanceSquaredPoint(part.location));
            // calculate initial relative angle
            var dir = this._centerPoint.directionPoint(part.location);
            // saves part-angle combination in array
            infos.add(part, new PartInfo(dir, dist, part.rotateObject.angle));
            // recurse into Groups
            if (part instanceof go.Group) {
                var it = part.memberParts.iterator;
                while (it.next())
                    this.walkTree(it.value, infos);
            }
        };
        /**
         * Clean up any references to Parts.
         */
        RotateMultipleTool.prototype.doDeactivate = function () {
            this._initialInfo = null;
            _super.prototype.doDeactivate.call(this);
        };
        /**
         * Rotate all selected objects about their collective center.
         * When the control key is held down while rotating, all selected objects are rotated individually.
         */
        RotateMultipleTool.prototype.rotate = function (newangle) {
            var diagram = this.diagram;
            if (this._initialInfo === null)
                return;
            var node = this.adornedObject !== null ? this.adornedObject.part : null;
            if (node === null)
                return;
            var e = diagram.lastInput;
            // when rotating individual parts, remember the original angle difference
            var angleDiff = newangle - node.rotateObject.angle;
            var tool = this;
            this._initialInfo.each(function (kvp) {
                var part = kvp.key;
                if (part instanceof go.Link)
                    return; // only Nodes and simple Parts
                var partInfo = kvp.value;
                // rotate every selected non-Link Part
                // find information about the part set in RotateMultipleTool._initialInformation
                if (e.control || e.meta) {
                    if (node === part) {
                        part.rotateObject.angle = newangle;
                    }
                    else {
                        part.rotateObject.angle += angleDiff;
                    }
                }
                else {
                    var radAngle = newangle * (Math.PI / 180); // converts the angle traveled from degrees to radians
                    // calculate the part's x-y location relative to the central rotation point
                    var offsetX = partInfo.distance * Math.cos(radAngle + partInfo.placementAngle);
                    var offsetY = partInfo.distance * Math.sin(radAngle + partInfo.placementAngle);
                    // move part
                    part.location = new go.Point(tool._centerPoint.x + offsetX, tool._centerPoint.y + offsetY);
                    // rotate part
                    part.rotateObject.angle = partInfo.rotationAngle + newangle;
                }
            });
        };
        /**
         * Calculate the desired angle with different rotation points,
         * depending on whether we are rotating the whole selection as one, or Parts individually.
         * @param {Point} newPoint in document coordinates
         */
        RotateMultipleTool.prototype.computeRotate = function (newPoint) {
            var diagram = this.diagram;
            if (this.adornedObject === null)
                return 0.0;
            var angle = 0.0;
            var e = diagram.lastInput;
            if (e.control || e.meta) { // relative to the center of the Node whose handle we are rotating
                var part = this.adornedObject.part;
                if (part !== null) {
                    var rotationPoint = part.getDocumentPoint(part.locationSpot);
                    angle = rotationPoint.directionPoint(newPoint);
                }
            }
            else { // relative to the center of the whole selection
                angle = this._centerPoint.directionPoint(newPoint) - this._initialAngle;
            }
            if (angle >= 360)
                angle -= 360;
            else if (angle < 0)
                angle += 360;
            var interval = Math.min(Math.abs(this.snapAngleMultiple), 180);
            var epsilon = Math.min(Math.abs(this.snapAngleEpsilon), interval / 2);
            // if it's close to a multiple of INTERVAL degrees, make it exactly so
            if (!diagram.lastInput.shift && interval > 0 && epsilon > 0) {
                if (angle % interval < epsilon) {
                    angle = Math.floor(angle / interval) * interval;
                }
                else if (angle % interval > interval - epsilon) {
                    angle = (Math.floor(angle / interval) + 1) * interval;
                }
                if (angle >= 360)
                    angle -= 360;
                else if (angle < 0)
                    angle += 360;
            }
            return angle;
        };
        return RotateMultipleTool;
    }(go.RotatingTool));
    exports.RotateMultipleTool = RotateMultipleTool;
    /**
     * Internal class to remember a Part's offset and angle.
     */
    var PartInfo = /** @class */ (function () {
        function PartInfo(placementAngle, distance, rotationAngle) {
            this.placementAngle = placementAngle * (Math.PI / 180); // in radians
            this.distance = distance;
            this.rotationAngle = rotationAngle; // in degrees
        }
        return PartInfo;
    }());
});
