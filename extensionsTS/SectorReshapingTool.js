/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
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
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The SectorReshapingTool class lets the user interactively modify the angles of a "pie"-shaped sector of a circle.
     * When a node is selected, this shows two handles for changing the angles of the sides of the sector and one handle for changing the radius.
     *
     * This depends on there being three data properties, "angle", "sweep", and "radius",
     * that hold the needed information to be able to reproduce the sector.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/SectorReshaping.html">Sector Reshaping</a> sample.
     * @category Tool Extension
     */
    var SectorReshapingTool = /** @class */ (function (_super) {
        __extends(SectorReshapingTool, _super);
        /**
         * Constructs a SectorReshapingTool and sets the name for the tool.
         */
        function SectorReshapingTool() {
            var _this = _super.call(this) || this;
            _this._handle = null;
            _this._originalRadius = 0;
            _this._originalAngle = 0;
            _this._originalSweep = 0;
            _this._radiusProperty = 'radius';
            _this._angleProperty = 'angle';
            _this._sweepProperty = 'sweep';
            _this.name = 'SectorReshaping';
            return _this;
        }
        Object.defineProperty(SectorReshapingTool.prototype, "radiusProperty", {
            /**
             * Gets or sets the name of the data property for the sector radius.
             *
             * The default value is "radius".
             */
            get: function () { return this._radiusProperty; },
            set: function (val) { this._radiusProperty = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SectorReshapingTool.prototype, "angleProperty", {
            /**
             * Gets or sets the name of the data property for the sector start angle.
             *
             * The default value is "angle".
             */
            get: function () { return this._angleProperty; },
            set: function (val) { this._angleProperty = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SectorReshapingTool.prototype, "sweepProperty", {
            /**
             * Gets or sets the name of the data property for the sector sweep angle.
             *
             * The default value is "sweep".
             */
            get: function () { return this._sweepProperty; },
            set: function (val) { this._sweepProperty = val; },
            enumerable: true,
            configurable: true
        });
        /**
         * This tool can only start if Diagram.allowReshape is true and the mouse-down event
         * is at a tool handle created by this tool.
         */
        SectorReshapingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            var diagram = this.diagram;
            if (diagram.isReadOnly)
                return false;
            if (!diagram.allowReshape)
                return false;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
            return (h !== null);
        };
        /**
         * If the Part is selected, show two angle-changing tool handles and one radius-changing tool handle.
         */
        SectorReshapingTool.prototype.updateAdornments = function (part) {
            var data = part.data;
            if (part.isSelected && data !== null && !this.diagram.isReadOnly) {
                var ad = part.findAdornment(this.name);
                if (ad === null) {
                    var $ = go.GraphObject.make;
                    ad =
                        $(go.Adornment, 'Spot', $(go.Placeholder), $(go.Shape, 'Diamond', { name: 'RADIUS', fill: 'lime', width: 10, height: 10, cursor: 'move' }, new go.Binding('alignment', '', function (d) {
                            var angle = SectorReshapingTool.getAngle(d);
                            var sweep = SectorReshapingTool.getSweep(d);
                            var p = new go.Point(0.5, 0).rotate(angle + sweep / 2);
                            return new go.Spot(0.5 + p.x, 0.5 + p.y);
                        })), $(go.Shape, 'Circle', { name: 'ANGLE', fill: 'lime', width: 8, height: 8, cursor: 'move' }, new go.Binding('alignment', '', function (d) {
                            var angle = SectorReshapingTool.getAngle(d);
                            var p = new go.Point(0.5, 0).rotate(angle);
                            return new go.Spot(0.5 + p.x, 0.5 + p.y);
                        })), $(go.Shape, 'Circle', { name: 'SWEEP', fill: 'lime', width: 8, height: 8, cursor: 'move' }, new go.Binding('alignment', '', function (d) {
                            var angle = SectorReshapingTool.getAngle(d);
                            var sweep = SectorReshapingTool.getSweep(d);
                            var p = new go.Point(0.5, 0).rotate(angle + sweep);
                            return new go.Spot(0.5 + p.x, 0.5 + p.y);
                        })));
                    ad.adornedObject = part.locationObject;
                    part.addAdornment(this.name, ad);
                }
                else {
                    ad.location = part.position;
                    var ns = part.naturalBounds;
                    if (ad.placeholder !== null)
                        ad.placeholder.desiredSize = new go.Size((ns.width) * part.scale, (ns.height) * part.scale);
                    ad.updateTargetBindings();
                }
            }
            else {
                part.removeAdornment(this.name);
            }
        };
        /**
         * Remember the original angles and radius and start a transaction.
         */
        SectorReshapingTool.prototype.doActivate = function () {
            var diagram = this.diagram;
            this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
            if (this._handle === null)
                return;
            var part = this._handle.part.adornedPart;
            if (part === null || part.data === null)
                return;
            var data = part.data;
            this._originalRadius = SectorReshapingTool.getRadius(data);
            this._originalAngle = SectorReshapingTool.getAngle(data);
            this._originalSweep = SectorReshapingTool.getSweep(data);
            this.startTransaction(this.name);
            this.isActive = true;
        };
        /**
         * Stop the transaction.
         */
        SectorReshapingTool.prototype.doDeactivate = function () {
            this.stopTransaction();
            this._handle = null;
            this.isActive = false;
        };
        /**
         * Restore the original angles and radius and then stop this tool.
         */
        SectorReshapingTool.prototype.doCancel = function () {
            if (this._handle !== null) {
                var part = this._handle.part.adornedPart;
                if (part !== null) {
                    var model = this.diagram.model;
                    model.setDataProperty(part.data, this._radiusProperty, this._originalRadius);
                    model.setDataProperty(part.data, this._angleProperty, this._originalAngle);
                    model.setDataProperty(part.data, this._sweepProperty, this._originalSweep);
                }
            }
            this.stopTool();
        };
        /**
         * Depending on the current handle being dragged, update the "radius", the "angle", or the "sweep"
         * properties on the model data.
         * Those property names are currently parameterized as static members of SectorReshapingTool.
         */
        SectorReshapingTool.prototype.doMouseMove = function () {
            var diagram = this.diagram;
            var h = this._handle;
            if (this.isActive && h !== null) {
                var adorned = h.part.adornedObject;
                if (adorned === null)
                    return;
                var center = adorned.getDocumentPoint(go.Spot.Center);
                var node = adorned.part;
                if (node === null || node.data === null)
                    return;
                var mouse = diagram.lastInput.documentPoint;
                if (h.name === 'RADIUS') {
                    var dst = Math.sqrt(center.distanceSquaredPoint(mouse));
                    diagram.model.setDataProperty(node.data, this._radiusProperty, dst);
                }
                else if (h.name === 'ANGLE') {
                    var dir = center.directionPoint(mouse);
                    diagram.model.setDataProperty(node.data, this._angleProperty, dir);
                }
                else if (h.name === 'SWEEP') {
                    var dir = center.directionPoint(mouse);
                    var ang = SectorReshapingTool.getAngle(node.data);
                    var swp = (dir - ang + 360) % 360;
                    if (swp > 359)
                        swp = 360; // make it easier to get a full circle
                    diagram.model.setDataProperty(node.data, this._sweepProperty, swp);
                }
            }
        };
        /**
         * Finish the transaction and stop the tool.
         */
        SectorReshapingTool.prototype.doMouseUp = function () {
            var diagram = this.diagram;
            if (this.isActive) {
                this.transactionResult = this.name; // successful finish
            }
            this.stopTool();
        };
        // static functions for getting data
        /** @hidden @internal */
        SectorReshapingTool.getRadius = function (data) {
            var radius = data['radius'];
            if (!(typeof radius === 'number') || isNaN(radius) || radius <= 0)
                radius = 50;
            return radius;
        };
        /** @hidden @internal */
        SectorReshapingTool.getAngle = function (data) {
            var angle = data['angle'];
            if (!(typeof angle === 'number') || isNaN(angle))
                angle = 0;
            else
                angle = angle % 360;
            return angle;
        };
        /** @hidden @internal */
        SectorReshapingTool.getSweep = function (data) {
            var sweep = data['sweep'];
            if (!(typeof sweep === 'number') || isNaN(sweep))
                sweep = 360;
            return sweep;
        };
        return SectorReshapingTool;
    }(go.Tool));
    exports.SectorReshapingTool = SectorReshapingTool;
});
