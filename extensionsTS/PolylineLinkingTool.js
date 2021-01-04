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
    exports.PolylineLinkingTool = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The PolylineLinkingTool class the user to draw a new {@link Link} by clicking where the route should go,
     * until clicking on a valid target port.
     *
     * This tool supports routing both orthogonal and straight links.
     * You can customize the {@link LinkingBaseTool#temporaryLink} as needed to affect the
     * appearance and behavior of the temporary link that is shown during the linking operation.
     * You can customize the {@link LinkingTool#archetypeLinkData} to specify property values
     * that can be data-bound by your link template for the Links that are actually created.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/PolylineLinking.html">Polyline Linking</a> sample.
     * @category Tool Extension
     */
    var PolylineLinkingTool = /** @class */ (function (_super) {
        __extends(PolylineLinkingTool, _super);
        /**
         * Constructs an PolylineLinkingTool, sets {@link #portGravity} to 0, and sets the name for the tool.
         */
        function PolylineLinkingTool() {
            var _this = _super.call(this) || this;
            _this._firstMouseDown = false;
            _this._horizontal = false;
            _this.portGravity = 0; // must click on a target port in order to complete the link
            _this.name = 'PolylineLinking';
            return _this;
        }
        /**
         * @hidden @internal
         * This internal method adds a point to the route.
         * During the operation of this tool, the very last point changes to follow the mouse point.
         * This method is called by {@link #doMouseDown} in order to add a new "last" point.
         * @param {Point} p
         */
        PolylineLinkingTool.prototype.addPoint = function (p) {
            if (this._firstMouseDown)
                return;
            var pts = this.temporaryLink.points.copy();
            this._horizontal = !this._horizontal;
            pts.add(p.copy());
            this.temporaryLink.points = pts;
        };
        /**
         * @hidden @internal
         * This internal method moves the last point of the temporary Link's route.
         * This is called by {@link #doMouseMove} and other methods that want to adjust the end of the route.
         * @param {Point} p
         */
        PolylineLinkingTool.prototype.moveLastPoint = function (p) {
            if (this._firstMouseDown)
                return;
            var pts = this.temporaryLink.points.copy();
            if (this.temporaryLink.isOrthogonal) {
                var q = pts.elt(pts.length - 3).copy();
                if (this._horizontal) {
                    q.y = p.y;
                }
                else {
                    q.x = p.x;
                }
                pts.setElt(pts.length - 2, q);
            }
            pts.setElt(pts.length - 1, p.copy());
            this.temporaryLink.points = pts;
        };
        /**
         * @hidden @internal
         * This internal method removes the last point of the temporary Link's route.
         * This is called by the "Z" command in {@link #doKeyDown}
         * and by {@link #doMouseUp} when a valid target port is found and we want to
         * discard the current mouse point from the route.
         */
        PolylineLinkingTool.prototype.removeLastPoint = function () {
            if (this._firstMouseDown)
                return;
            var pts = this.temporaryLink.points.copy();
            if (pts.length === 0)
                return;
            pts.removeAt(pts.length - 1);
            this.temporaryLink.points = pts;
            this._horizontal = !this._horizontal;
        };
        /**
         * Use a "crosshair" cursor.
         */
        PolylineLinkingTool.prototype.doActivate = function () {
            _super.prototype.doActivate.call(this);
            this.diagram.currentCursor = 'crosshair';
            // until a mouse down occurs, allow the temporary link to be routed to the temporary node/port
            this._firstMouseDown = true;
        };
        /**
         * Add a point to the route that the temporary Link is accumulating.
         */
        PolylineLinkingTool.prototype.doMouseDown = function () {
            if (!this.isActive) {
                this.doActivate();
            }
            if (this.diagram.lastInput.left) {
                if (this._firstMouseDown) {
                    this._firstMouseDown = false;
                    // disconnect the temporary node/port from the temporary link
                    // so that it doesn't lose the points that are accumulating
                    if (this.isForwards) {
                        this.temporaryLink.toNode = null;
                    }
                    else {
                        this.temporaryLink.fromNode = null;
                    }
                    var pts = this.temporaryLink.points;
                    var ult = pts.elt(pts.length - 1);
                    var penult = pts.elt(pts.length - 2);
                    this._horizontal = (ult.x === penult.x);
                }
                // a new temporary end point, the previous one is now "accepted"
                this.addPoint(this.diagram.lastInput.documentPoint);
            }
            else { // e.g. right mouse down
                this.doCancel();
            }
        };
        /**
         * Have the temporary link reach to the last mouse point.
         */
        PolylineLinkingTool.prototype.doMouseMove = function () {
            if (this.isActive) {
                this.moveLastPoint(this.diagram.lastInput.documentPoint);
                _super.prototype.doMouseMove.call(this);
            }
        };
        /**
         * If this event happens on a valid target port (as determined by {@link LinkingBaseTool#findTargetPort}),
         * we complete the link drawing operation.  {@link #insertLink} is overridden to transfer the accumulated
         * route drawn by user clicks to the new {@link Link} that was created.
         *
         * If this event happens elsewhere in the diagram, this tool is not stopped: the drawing of the route continues.
         */
        PolylineLinkingTool.prototype.doMouseUp = function () {
            if (!this.isActive)
                return;
            var target = this.findTargetPort(this.isForwards);
            if (target !== null) {
                if (this._firstMouseDown) {
                    _super.prototype.doMouseUp.call(this);
                }
                else {
                    var pts = void 0;
                    this.removeLastPoint(); // remove temporary point
                    var spot = this.isForwards ? target.toSpot : target.fromSpot;
                    if (spot.equals(go.Spot.None)) {
                        var pt = this.temporaryLink.getLinkPointFromPoint(target.part, target, target.getDocumentPoint(go.Spot.Center), this.temporaryLink.points.elt(this.temporaryLink.points.length - 2), !this.isForwards);
                        this.moveLastPoint(pt);
                        pts = this.temporaryLink.points.copy();
                        if (this.temporaryLink.isOrthogonal) {
                            pts.insertAt(pts.length - 2, pts.elt(pts.length - 2));
                        }
                    }
                    else {
                        // copy the route of saved points, because we're about to recompute it
                        pts = this.temporaryLink.points.copy();
                        // terminate the link in the expected manner by letting the
                        // temporary link connect with the temporary node/port and letting the
                        // normal route computation take place
                        if (this.isForwards) {
                            this.copyPortProperties(target.part, target, this.temporaryToNode, this.temporaryToPort, true);
                            this.temporaryLink.toNode = target.part;
                        }
                        else {
                            this.copyPortProperties(target.part, target, this.temporaryFromNode, this.temporaryFromPort, false);
                            this.temporaryLink.fromNode = target.part;
                        }
                        this.temporaryLink.updateRoute();
                        // now copy the final one or two points of the temporary link's route
                        // into the route built up in the PTS List.
                        var natpts = this.temporaryLink.points;
                        var numnatpts = natpts.length;
                        if (numnatpts >= 2) {
                            if (numnatpts >= 3) {
                                var penult = natpts.elt(numnatpts - 2);
                                pts.insertAt(pts.length - 1, penult);
                                if (this.temporaryLink.isOrthogonal) {
                                    pts.insertAt(pts.length - 1, penult);
                                }
                            }
                            var ult = natpts.elt(numnatpts - 1);
                            pts.setElt(pts.length - 1, ult);
                        }
                    }
                    // save desired route in temporary link;
                    // insertLink will copy the route into the new real Link
                    this.temporaryLink.points = pts;
                    _super.prototype.doMouseUp.call(this);
                }
            }
        };
        /**
         * This method overrides the standard link creation method by additionally
         * replacing the default link route with the custom one laid out by the user.
         */
        PolylineLinkingTool.prototype.insertLink = function (fromnode, fromport, tonode, toport) {
            var link = _super.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);
            if (link !== null && !this._firstMouseDown) {
                // ignore natural route by replacing with route accumulated by this tool
                link.points = this.temporaryLink.points;
            }
            return link;
        };
        /**
         * This supports the "Z" command during this tool's operation to remove the last added point of the route.
         * Type ESCAPE to completely cancel the operation of the tool.
         */
        PolylineLinkingTool.prototype.doKeyDown = function () {
            if (!this.isActive)
                return;
            var e = this.diagram.lastInput;
            if (e.key === 'Z' && this.temporaryLink.points.length > (this.temporaryLink.isOrthogonal ? 4 : 3)) { // undo
                // remove a point, and then treat the last one as a temporary one
                this.removeLastPoint();
                this.moveLastPoint(e.documentPoint);
            }
            else {
                _super.prototype.doKeyDown.call(this);
            }
        };
        return PolylineLinkingTool;
    }(go.LinkingTool));
    exports.PolylineLinkingTool = PolylineLinkingTool;
});
