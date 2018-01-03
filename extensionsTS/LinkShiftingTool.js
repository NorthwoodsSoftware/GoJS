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
    // A custom Tool for shifting the end point of a Link to be anywhere along the edges of the port.
    /**
    * This constructor produces a tool for shifting the end of a link;
    * use it in a diagram.toolManager.mouseDownTools list:
    * <pre>myDiagram.toolManager.mouseDownTools.add(new LinkShiftingTool());</pre>
    * @constructor
    * @extends Tool
    * @class
    */
    var LinkShiftingTool = /** @class */ (function (_super) {
        __extends(LinkShiftingTool, _super);
        function LinkShiftingTool() {
            var _this = _super.call(this) || this;
            _this.name = "LinkShifting";
            // transient state
            /** @type {GraphObject} */
            _this._handle = null;
            var h = new go.Shape();
            h.geometryString = "F1 M0 0 L8 0 M8 4 L0 4";
            h.fill = null;
            h.stroke = "dodgerblue";
            h.background = "lightblue";
            h.cursor = "pointer";
            h.segmentIndex = 0;
            h.segmentFraction = 1;
            h.segmentOrientation = go.Link.OrientAlong;
            var g = new go.Shape();
            g.geometryString = "F1 M0 0 L8 0 M8 4 L0 4";
            g.fill = null;
            g.stroke = "dodgerblue";
            g.background = "lightblue";
            g.cursor = "pointer";
            g.segmentIndex = -1;
            g.segmentFraction = 1;
            g.segmentOrientation = go.Link.OrientAlong;
            _this._fromHandleArchetype = h;
            _this._toHandleArchetype = g;
            return _this;
        }
        Object.defineProperty(LinkShiftingTool.prototype, "fromHandleArchetype", {
            /*
            * A small GraphObject used as a shifting handle.
            * @name LinkShiftingTool#fromHandleArchetype
            * @function.
            * @return {GraphObject}
            */
            get: function () { return this._fromHandleArchetype; },
            set: function (value) { this._fromHandleArchetype = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkShiftingTool.prototype, "toHandleArchetype", {
            /*
            * A small GraphObject used as a shifting handle.
            * @name LinkShiftingTool#toHandleArchetype
            * @function.
            * @return {GraphObject}
            */
            get: function () { return this._toHandleArchetype; },
            set: function (value) { this._toHandleArchetype = value; },
            enumerable: true,
            configurable: true
        });
        /**
        * @this {LinkShiftingTool}
        * @param {Part} part
        */
        LinkShiftingTool.prototype.updateAdornments = function (part) {
            if (part === null || !(part instanceof go.Link))
                return; // this tool only applies to Links
            var link = part;
            // show handles if link is selected, remove them if no longer selected
            var category = "LinkShiftingFrom";
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
                    }
                }
            }
            if (adornment === null)
                link.removeAdornment(category);
            category = "LinkShiftingTo";
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
                    }
                }
            }
            if (adornment === null)
                link.removeAdornment(category);
        };
        ;
        /**
        * @this {LinkShiftingTool}
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
        ;
        /**
        * @this {LinkShiftingTool}
        * @return {boolean}
        */
        LinkShiftingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            var diagram = this.diagram;
            if (diagram.isReadOnly || diagram.isModelReadOnly)
                return false;
            if (!diagram.lastInput.left)
                return false;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingFrom");
            if (h === null)
                h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingTo");
            return (h !== null);
        };
        /**
        * @this {LinkShiftingTool}
        */
        LinkShiftingTool.prototype.doActivate = function () {
            var diagram = this.diagram;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingFrom");
            if (h === null)
                h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingTo");
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
        ;
        /**
        * @this {LinkShiftingTool}
        */
        LinkShiftingTool.prototype.doDeactivate = function () {
            this.isActive = false;
            var diagram = this.diagram;
            diagram.isMouseCaptured = false;
            diagram.currentCursor = '';
            this.stopTransaction();
        };
        ;
        /**
        * Clean up tool state.
        * @this {LinkShiftingTool}
        */
        LinkShiftingTool.prototype.doStop = function () {
            this._handle = null;
            this._originalPoints = null;
        };
        ;
        /**
        * Clean up tool state.
        * @this {LinkShiftingTool}
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
        ;
        /**
        * @this {LinkShiftingTool}
        */
        LinkShiftingTool.prototype.doMouseMove = function () {
            if (this.isActive) {
                this.doReshape(this.diagram.lastInput.documentPoint);
            }
        };
        ;
        /**
        * @this {LinkShiftingTool}
        */
        LinkShiftingTool.prototype.doMouseUp = function () {
            if (this.isActive) {
                this.doReshape(this.diagram.lastInput.documentPoint);
                this.transactionResult = this.name;
            }
            this.stopTool();
        };
        ;
        /**
        * @this {LinkShiftingTool}
        * @param {Point} pt
        */
        LinkShiftingTool.prototype.doReshape = function (pt) {
            if (this._handle === null)
                return;
            var ad = this._handle.part;
            if (ad.adornedObject === null)
                return;
            var link = ad.adornedObject.part;
            var fromend = ad.category === "LinkShiftingFrom";
            var port = null;
            if (fromend) {
                port = link.fromPort;
            }
            else {
                port = link.toPort;
            }
            if (port === null)
                return;
            var portb = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft), port.getDocumentPoint(go.Spot.BottomRight));
            var lp = link.getLinkPointFromPoint(port.part, port, port.getDocumentPoint(go.Spot.Center), pt, fromend);
            var spot = new go.Spot((lp.x - portb.x) / (portb.width || 1), (lp.y - portb.y) / (portb.height || 1));
            if (fromend) {
                link.fromSpot = spot;
            }
            else {
                link.toSpot = spot;
            }
        };
        ;
        return LinkShiftingTool;
    }(go.Tool));
    exports.LinkShiftingTool = LinkShiftingTool;
});
