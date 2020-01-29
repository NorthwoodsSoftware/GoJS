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
     * The LinkShiftingTool class lets the user shift the end of a link to be anywhere along the edges of the port;
     * use it in a diagram.toolManager.mouseDownTools list:
     * ```js
     * myDiagram.toolManager.mouseDownTools.add(new LinkShiftingTool());
     * ```
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/LinkShifting.html">Link Shifting</a> sample.
     * @category Tool Extension
     */
    var LinkShiftingTool = /** @class */ (function (_super) {
        __extends(LinkShiftingTool, _super);
        /**
         * Constructs a LinkShiftingTool and sets the handles and name of the tool.
         */
        function LinkShiftingTool() {
            var _this = _super.call(this) || this;
            // transient state
            _this._handle = null;
            var h = new go.Shape();
            h.geometryString = 'F1 M0 0 L8 0 M8 4 L0 4';
            h.fill = null;
            h.stroke = 'dodgerblue';
            h.background = 'lightblue';
            h.cursor = 'pointer';
            h.segmentIndex = 0;
            h.segmentFraction = 1;
            h.segmentOrientation = go.Link.OrientAlong;
            var g = new go.Shape();
            g.geometryString = 'F1 M0 0 L8 0 M8 4 L0 4';
            g.fill = null;
            g.stroke = 'dodgerblue';
            g.background = 'lightblue';
            g.cursor = 'pointer';
            g.segmentIndex = -1;
            g.segmentFraction = 1;
            g.segmentOrientation = go.Link.OrientAlong;
            _this._fromHandleArchetype = h;
            _this._toHandleArchetype = g;
            _this._originalPoints = null;
            _this.name = 'LinkShifting';
            return _this;
        }
        Object.defineProperty(LinkShiftingTool.prototype, "fromHandleArchetype", {
            /**
             * A small GraphObject used as a shifting handle.
             */
            get: function () { return this._fromHandleArchetype; },
            set: function (value) { this._fromHandleArchetype = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkShiftingTool.prototype, "toHandleArchetype", {
            /**
             * A small GraphObject used as a shifting handle.
             */
            get: function () { return this._toHandleArchetype; },
            set: function (value) { this._toHandleArchetype = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * Show an {@link Adornment} with a reshape handle at each end of the link which allows for shifting of the end points.
         */
        LinkShiftingTool.prototype.updateAdornments = function (part) {
            if (part === null || !(part instanceof go.Link))
                return; // this tool only applies to Links
            var link = part;
            // show handles if link is selected, remove them if no longer selected
            var category = 'LinkShiftingFrom';
            var adornment = null;
            if (link.isSelected && !this.diagram.isReadOnly) {
                var selelt = link.selectionObject;
                if (selelt !== null && link.actualBounds.isReal() && link.isVisible() &&
                    selelt.actualBounds.isReal() && selelt.isVisibleObject()) {
                    var spot = link.computeSpot(true);
                    if (spot.isSide() || spot.isSpot()) {
                        adornment = link.findAdornment(category);
                        if (adornment === null) {
                            adornment = this.makeAdornment(selelt, false);
                            adornment.category = category;
                            link.addAdornment(category, adornment);
                        }
                        else {
                            // This is just to invalidate the measure, so it recomputes itself based on the adorned link
                            adornment.segmentFraction = Math.random();
                        }
                    }
                }
            }
            if (adornment === null)
                link.removeAdornment(category);
            category = 'LinkShiftingTo';
            adornment = null;
            if (link.isSelected && !this.diagram.isReadOnly) {
                var selelt = link.selectionObject;
                if (selelt !== null && link.actualBounds.isReal() && link.isVisible() &&
                    selelt.actualBounds.isReal() && selelt.isVisibleObject()) {
                    var spot = link.computeSpot(false);
                    if (spot.isSide() || spot.isSpot()) {
                        adornment = link.findAdornment(category);
                        if (adornment === null) {
                            adornment = this.makeAdornment(selelt, true);
                            adornment.category = category;
                            link.addAdornment(category, adornment);
                        }
                        else {
                            // This is just to invalidate the measure, so it recomputes itself based on the adorned link
                            adornment.segmentFraction = Math.random();
                        }
                    }
                }
            }
            if (adornment === null)
                link.removeAdornment(category);
        };
        /**
         * @hidden @internal
         * @param {GraphObject} selelt the {@link GraphObject} of the {@link Link} being shifted.
         * @param {boolean} toend
         * @return {Adornment}
         */
        LinkShiftingTool.prototype.makeAdornment = function (selelt, toend) {
            var adornment = new go.Adornment();
            adornment.type = go.Panel.Link;
            var h = (toend ? this.toHandleArchetype : this.fromHandleArchetype);
            if (h !== null) {
                // add a single handle for shifting at one end
                adornment.add(h.copy());
            }
            adornment.adornedObject = selelt;
            return adornment;
        };
        /**
         * This tool may run when there is a mouse-down event on a reshaping handle.
         */
        LinkShiftingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            var diagram = this.diagram;
            if (diagram.isReadOnly || diagram.isModelReadOnly)
                return false;
            if (!diagram.lastInput.left)
                return false;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, 'LinkShiftingFrom');
            if (h === null)
                h = this.findToolHandleAt(diagram.firstInput.documentPoint, 'LinkShiftingTo');
            return (h !== null);
        };
        /**
         * Start shifting, if {@link #findToolHandleAt} finds a reshaping handle at the mouse down point.
         *
         * If successful this sets the handle to be the reshape handle that it finds.
         * It also remembers the original points in case this tool is cancelled.
         * And it starts a transaction.
         */
        LinkShiftingTool.prototype.doActivate = function () {
            var diagram = this.diagram;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, 'LinkShiftingFrom');
            if (h === null)
                h = this.findToolHandleAt(diagram.firstInput.documentPoint, 'LinkShiftingTo');
            if (h === null)
                return;
            var ad = h.part;
            if (ad === null || ad.adornedObject === null)
                return;
            var link = ad.adornedObject.part;
            if (!(link instanceof go.Link))
                return;
            this._handle = h;
            this._originalPoints = link.points.copy();
            this.startTransaction(this.name);
            diagram.isMouseCaptured = true;
            diagram.currentCursor = 'pointer';
            this.isActive = true;
        };
        /**
         * This stops the current shifting operation with the link as it is.
         */
        LinkShiftingTool.prototype.doDeactivate = function () {
            this.isActive = false;
            var diagram = this.diagram;
            diagram.isMouseCaptured = false;
            diagram.currentCursor = '';
            this.stopTransaction();
        };
        /**
         * Perform cleanup of tool state.
         */
        LinkShiftingTool.prototype.doStop = function () {
            this._handle = null;
            this._originalPoints = null;
        };
        /**
         * Restore the link route to be the original points and stop this tool.
         */
        LinkShiftingTool.prototype.doCancel = function () {
            if (this._handle !== null) {
                var ad = this._handle.part;
                if (ad.adornedObject === null)
                    return;
                var link = ad.adornedObject.part;
                if (this._originalPoints !== null)
                    link.points = this._originalPoints;
            }
            this.stopTool();
        };
        /**
         * Call {@link #doReshape} with a new point determined by the mouse
         * to change the end point of the link.
         */
        LinkShiftingTool.prototype.doMouseMove = function () {
            if (this.isActive) {
                this.doReshape(this.diagram.lastInput.documentPoint);
            }
        };
        /**
         * Reshape the link's end with a point based on the most recent mouse point by calling {@link #doReshape},
         * and then stop this tool.
         */
        LinkShiftingTool.prototype.doMouseUp = function () {
            if (this.isActive) {
                this.doReshape(this.diagram.lastInput.documentPoint);
                this.transactionResult = this.name;
            }
            this.stopTool();
        };
        /**
         * Find the closest point along the edge of the link's port and shift the end of the link to that point.
         */
        LinkShiftingTool.prototype.doReshape = function (pt) {
            if (this._handle === null)
                return;
            var ad = this._handle.part;
            if (ad.adornedObject === null)
                return;
            var link = ad.adornedObject.part;
            var fromend = ad.category === 'LinkShiftingFrom';
            var port = null;
            if (fromend) {
                port = link.fromPort;
            }
            else {
                port = link.toPort;
            }
            if (port === null)
                return;
            // support rotated ports
            var portang = port.getDocumentAngle();
            var center = port.getDocumentPoint(go.Spot.Center);
            var portb = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft).subtract(center).rotate(-portang).add(center), port.getDocumentPoint(go.Spot.BottomRight).subtract(center).rotate(-portang).add(center));
            var lp = link.getLinkPointFromPoint(port.part, port, center, pt, fromend);
            lp = lp.copy().subtract(center).rotate(-portang).add(center);
            var spot = new go.Spot(Math.max(0, Math.min(1, (lp.x - portb.x) / (portb.width || 1))), Math.max(0, Math.min(1, (lp.y - portb.y) / (portb.height || 1))));
            if (fromend) {
                link.fromSpot = spot;
            }
            else {
                link.toSpot = spot;
            }
        };
        return LinkShiftingTool;
    }(go.Tool));
    exports.LinkShiftingTool = LinkShiftingTool;
});
