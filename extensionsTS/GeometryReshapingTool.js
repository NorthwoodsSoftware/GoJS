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
     * The GeometryReshapingTool class allows for a Shape's Geometry to be modified by the user
     * via the dragging of tool handles.
     * This does not handle Links, whose routes should be reshaped by the LinkReshapingTool.
     * The {@link #reshapeObjectName} needs to identify the named {@link Shape} within the
     * selected {@link Part}.
     * If the shape cannot be found or if its {@link Shape#geometry} is not of type {@link Geometry.Path},
     * this will not show any GeometryReshaping {@link Adornment}.
     * At the current time this tool does not support adding or removing {@link PathSegment}s to the Geometry.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/GeometryReshaping.html">Geometry Reshaping</a> sample.
     * @category Tool Extension
     */
    var GeometryReshapingTool = /** @class */ (function (_super) {
        __extends(GeometryReshapingTool, _super);
        /**
         * Constructs a GeometryReshapingTool and sets the handle and name of the tool.
         */
        function GeometryReshapingTool() {
            var _this = _super.call(this) || this;
            _this._reshapeObjectName = 'SHAPE'; // ??? can't add Part.reshapeObjectName property
            // there's no Part.reshapeAdornmentTemplate either
            // internal state
            _this._handle = null;
            _this._adornedShape = null;
            _this._originalGeometry = null; // in case the tool is cancelled and the UndoManager is not enabled
            var h = new go.Shape();
            h.figure = 'Diamond';
            h.desiredSize = new go.Size(7, 7);
            h.fill = 'lightblue';
            h.stroke = 'dodgerblue';
            h.cursor = 'move';
            _this._handleArchetype = h;
            _this.name = 'GeometryReshaping';
            return _this;
        }
        Object.defineProperty(GeometryReshapingTool.prototype, "handleArchetype", {
            /**
             * A small GraphObject used as a reshape handle for each segment.
             * The default GraphObject is a small blue diamond.
             */
            get: function () { return this._handleArchetype; },
            set: function (value) { this._handleArchetype = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryReshapingTool.prototype, "reshapeObjectName", {
            /**
             * The name of the GraphObject to be reshaped.
             */
            get: function () { return this._reshapeObjectName; },
            set: function (value) { this._reshapeObjectName = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryReshapingTool.prototype, "handle", {
            /**
             * This read-only property returns the {@link GraphObject} that is the tool handle being dragged by the user.
             * This will be contained by an {@link Adornment} whose category is "GeometryReshaping".
             * Its {@link Adornment#adornedObject} is the same as the {@link #adornedShape}.
             */
            get: function () { return this._handle; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryReshapingTool.prototype, "adornedShape", {
            /**
             * Gets the {@link Shape} that is being reshaped.
             * This must be contained within the selected Part.
             */
            get: function () { return this._adornedShape; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryReshapingTool.prototype, "originalGeometry", {
            /**
             * This read-only property remembers the original value for {@link Shape#geometry},
             * so that it can be restored if this tool is cancelled.
             */
            get: function () { return this._originalGeometry; },
            enumerable: true,
            configurable: true
        });
        /**
         * Show an {@link Adornment} with a reshape handle at each point of the geometry.
         * Don't show anything if {@link #reshapeObjectName} doesn't identify a {@link Shape}
         * that has a {@link Shape#geometry} of type {@link Geometry.Path}.
         */
        GeometryReshapingTool.prototype.updateAdornments = function (part) {
            if (part === null || part instanceof go.Link)
                return; // this tool never applies to Links
            if (part.isSelected && !this.diagram.isReadOnly) {
                var selelt = part.findObject(this.reshapeObjectName);
                if (selelt instanceof go.Shape && selelt.geometry !== null &&
                    selelt.actualBounds.isReal() && selelt.isVisibleObject() &&
                    part.canReshape() && part.actualBounds.isReal() && part.isVisible() &&
                    selelt.geometry.type === go.Geometry.Path) {
                    var adornment = part.findAdornment(this.name);
                    if (adornment === null) {
                        adornment = this.makeAdornment(selelt);
                    }
                    if (adornment !== null) {
                        // update the position/alignment of each handle
                        var geo_1 = selelt.geometry;
                        var b_1 = geo_1.bounds;
                        // update the size of the adornment
                        var body = adornment.findObject('BODY');
                        if (body !== null)
                            body.desiredSize = b_1.size;
                        adornment.elements.each(function (h) {
                            if (h._typ === undefined)
                                return;
                            var fig = geo_1.figures.elt(h._fig);
                            var seg = fig.segments.elt(h._seg);
                            var x = 0;
                            var y = 0;
                            switch (h._typ) {
                                case 0:
                                    x = fig.startX;
                                    y = fig.startY;
                                    break;
                                case 1:
                                    x = seg.endX;
                                    y = seg.endY;
                                    break;
                                case 2:
                                    x = seg.point1X;
                                    y = seg.point1Y;
                                    break;
                                case 3:
                                    x = seg.point2X;
                                    y = seg.point2Y;
                                    break;
                            }
                            h.alignment = new go.Spot(0, 0, x - b_1.x, y - b_1.y);
                        });
                        part.addAdornment(this.name, adornment);
                        adornment.location = selelt.getDocumentPoint(go.Spot.TopLeft);
                        adornment.angle = selelt.getDocumentAngle();
                        return;
                    }
                }
            }
            part.removeAdornment(this.name);
        };
        /**
         * @hidden @internal
         */
        GeometryReshapingTool.prototype.makeAdornment = function (selelt) {
            var adornment = new go.Adornment();
            adornment.type = go.Panel.Spot;
            adornment.locationObjectName = 'BODY';
            adornment.locationSpot = new go.Spot(0, 0, -selelt.strokeWidth / 2, -selelt.strokeWidth / 2);
            var h = new go.Shape();
            h.name = 'BODY';
            h.fill = null;
            h.stroke = null;
            h.strokeWidth = 0;
            adornment.add(h);
            var geo = selelt.geometry;
            if (geo !== null) {
                // requires Path Geometry, checked above in updateAdornments
                for (var f = 0; f < geo.figures.count; f++) {
                    var fig = geo.figures.elt(f);
                    for (var g = 0; g < fig.segments.count; g++) {
                        var seg = fig.segments.elt(g);
                        if (g === 0) {
                            h = this.makeHandle(selelt, fig, seg);
                            if (h !== null) {
                                h._typ = 0;
                                h._fig = f;
                                h._seg = g;
                                adornment.add(h);
                            }
                        }
                        h = this.makeHandle(selelt, fig, seg);
                        if (h !== null) {
                            h._typ = 1;
                            h._fig = f;
                            h._seg = g;
                            adornment.add(h);
                        }
                        if (seg.type === go.PathSegment.QuadraticBezier || seg.type === go.PathSegment.Bezier) {
                            h = this.makeHandle(selelt, fig, seg);
                            if (h !== null) {
                                h._typ = 2;
                                h._fig = f;
                                h._seg = g;
                                adornment.add(h);
                            }
                            if (seg.type === go.PathSegment.Bezier) {
                                h = this.makeHandle(selelt, fig, seg);
                                if (h !== null) {
                                    h._typ = 3;
                                    h._fig = f;
                                    h._seg = g;
                                    adornment.add(h);
                                }
                            }
                        }
                    }
                }
            }
            adornment.category = this.name;
            adornment.adornedObject = selelt;
            return adornment;
        };
        /**
         * @hidden @internal
         */
        GeometryReshapingTool.prototype.makeHandle = function (selelt, fig, seg) {
            var h = this.handleArchetype;
            if (h === null)
                return null;
            return h.copy();
        };
        /**
         * This tool may run when there is a mouse-down event on a reshape handle.
         */
        GeometryReshapingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            var diagram = this.diagram;
            if (diagram.isReadOnly)
                return false;
            if (!diagram.allowReshape)
                return false;
            if (!diagram.lastInput.left)
                return false;
            var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
            return (h !== null);
        };
        /**
         * Start reshaping, if {@link #findToolHandleAt} finds a reshape handle at the mouse down point.
         *
         * If successful this sets {@link #handle} to be the reshape handle that it finds
         * and {@link #adornedShape} to be the {@link Shape} being reshaped.
         * It also remembers the original geometry in case this tool is cancelled.
         * And it starts a transaction.
         */
        GeometryReshapingTool.prototype.doActivate = function () {
            var diagram = this.diagram;
            this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
            if (this._handle === null)
                return;
            var shape = this._handle.part.adornedObject;
            if (!shape)
                return;
            this._adornedShape = shape;
            diagram.isMouseCaptured = true;
            this.startTransaction(this.name);
            this._originalGeometry = shape.geometry;
            this.isActive = true;
        };
        /**
         * This stops the current reshaping operation with the Shape as it is.
         */
        GeometryReshapingTool.prototype.doDeactivate = function () {
            this.stopTransaction();
            this._handle = null;
            this._adornedShape = null;
            var diagram = this.diagram;
            diagram.isMouseCaptured = false;
            this.isActive = false;
        };
        /**
         * Restore the shape to be the original geometry and stop this tool.
         */
        GeometryReshapingTool.prototype.doCancel = function () {
            var shape = this._adornedShape;
            if (shape !== null) {
                // explicitly restore the original route, in case !UndoManager.isEnabled
                shape.geometry = this._originalGeometry;
            }
            this.stopTool();
        };
        /**
         * Call {@link #reshape} with a new point determined by the mouse
         * to change the geometry of the {@link #adornedShape}.
         */
        GeometryReshapingTool.prototype.doMouseMove = function () {
            var diagram = this.diagram;
            if (this.isActive) {
                var newpt = this.computeReshape(diagram.lastInput.documentPoint);
                this.reshape(newpt);
            }
        };
        /**
         * Reshape the Shape's geometry with a point based on the most recent mouse point by calling {@link #reshape},
         * and then stop this tool.
         */
        GeometryReshapingTool.prototype.doMouseUp = function () {
            var diagram = this.diagram;
            if (this.isActive) {
                var newpt = this.computeReshape(diagram.lastInput.documentPoint);
                this.reshape(newpt);
                this.transactionResult = this.name; // success
            }
            this.stopTool();
        };
        /**
         * Change the geometry of the {@link #adornedShape} by moving the point corresponding to the current
         * {@link #handle} to be at the given {@link Point}.
         * This is called by {@link #doMouseMove} and {@link #doMouseUp} with the result of calling
         * {@link #computeReshape} to constrain the input point.
         * @param {Point} newPoint the value of the call to {@link #computeReshape}.
         */
        GeometryReshapingTool.prototype.reshape = function (newPoint) {
            var shape = this.adornedShape;
            if (shape === null || shape.geometry === null)
                return;
            var locpt = shape.getLocalPoint(newPoint);
            var geo = shape.geometry.copy();
            shape.desiredSize = new go.Size(NaN, NaN); // set the desiredSize once we've gotten our Geometry so we don't clobber
            var type = this.handle._typ;
            if (type === undefined)
                return;
            var fig = geo.figures.elt(this.handle._fig);
            var seg = fig.segments.elt(this.handle._seg);
            switch (type) {
                case 0:
                    fig.startX = locpt.x;
                    fig.startY = locpt.y;
                    break;
                case 1:
                    seg.endX = locpt.x;
                    seg.endY = locpt.y;
                    break;
                case 2:
                    seg.point1X = locpt.x;
                    seg.point1Y = locpt.y;
                    break;
                case 3:
                    seg.point2X = locpt.x;
                    seg.point2Y = locpt.y;
                    break;
            }
            var offset = geo.normalize(); // avoid any negative coordinates in the geometry
            shape.geometry = geo; // modify the Shape
            var part = shape.part; // move the Part holding the Shape
            if (part === null)
                return;
            part.ensureBounds();
            if (part.locationObject !== shape && !part.locationSpot.equals(go.Spot.Center)) { // but only if the locationSpot isn't Center
                // support the whole Node being rotated
                part.move(part.position.copy().subtract(offset.rotate(part.angle)));
            }
            this.diagram.maybeUpdate(); // force more frequent drawing for smoother looking behavior
        };
        /**
         * This is called by {@link #doMouseMove} and {@link #doMouseUp} to limit the input point
         * before calling {@link #reshape}.
         * By default, this doesn't limit the input point.
         * @param {Point} p the point where the handle is being dragged.
         * @return {Point}
         */
        GeometryReshapingTool.prototype.computeReshape = function (p) {
            return p; // no constraints on the points
        };
        return GeometryReshapingTool;
    }(go.Tool));
    exports.GeometryReshapingTool = GeometryReshapingTool;
});
