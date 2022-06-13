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
    exports.DimensioningLink = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * A custom routed {@link Link} for showing the distances between a point on one node and a point on another node.
     *
     * Note that because this is a Link, the points being measured must be on {@link Node}s, not simple {@link Part}s.
     * The exact point on each Node is determined by the {@link Link#fromSpot} and {@link Link#toSpot}.
     *
     * Several properties of the DimensioningLink customize the appearance of the dimensioning:
     * {@link #direction}, for orientation of the dimension line and which side it is on,
     * {@link #extension}, for how far the dimension line is from the measured points,
     * {@link #inset}, for leaving room for a text label, and
     * {@link #gap}, for distance that the extension line starts from the measured points.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsJSM/Dimensioning.html">Dimensioning</a> sample.
     * @category Part Extension
     */
    var DimensioningLink = /** @class */ (function (_super) {
        __extends(DimensioningLink, _super);
        /**
         * Constructs a DimensioningLink and sets the following properties:
         *   - {@link #isLayoutPositioned} = false
         *   - {@link #isTreeLink} = false
         *   - {@link #routing} = {@link Link.Orthogonal}
         */
        function DimensioningLink() {
            var _this = _super.call(this) || this;
            _this._direction = 0;
            _this._extension = 30;
            _this._inset = 10;
            _this._gap = 10;
            _this.isLayoutPositioned = false;
            _this.isTreeLink = false;
            _this.routing = go.Link.Orthogonal;
            return _this;
        }
        /**
         * Copies properties to a cloned DimensioningLink.
         */
        DimensioningLink.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._direction = this._direction;
            copy._extension = this._extension;
            copy._inset = this._inset;
            copy._gap = this._gap;
        };
        Object.defineProperty(DimensioningLink.prototype, "direction", {
            /**
             * The general angle at which the measurement should be made.
             *
             * The default value is 0, meaning to go measure only along the X axis,
             * with the dimension line and label above the two nodes (at lower Y coordinates).
             * New values must be one of: 0, 90, 180, 270, or NaN.
             * The value NaN indicates that the measurement is point-to-point and not orthogonal.
             */
            get: function () { return this._direction; },
            set: function (val) {
                if (isNaN(val) || val === 0 || val === 90 || val === 180 || val === 270) {
                    this._direction = val;
                }
                else {
                    throw new Error('DimensioningLink: invalid new direction: ' + val);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DimensioningLink.prototype, "extension", {
            /**
             * The distance at which the dimension line should be from the points being measured.
             *
             * The default value is 30.
             * Larger values mean further away from the nodes.
             * The new value must be greater than or equal to zero.
             */
            get: function () { return this._extension; },
            set: function (val) { this._extension = val; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DimensioningLink.prototype, "inset", {
            /**
             * The distance that the dimension line should be "indented" from the ends of the
             * extension lines that are orthogonal to the dimension line.
             *
             * The default value is 10.
             */
            get: function () { return this._inset; },
            set: function (val) {
                if (val >= 0) {
                    this._inset = val;
                }
                else {
                    throw new Error('DimensionLink: invalid new inset: ' + val);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DimensioningLink.prototype, "gap", {
            /**
             * The distance that the extension lines should come short of the measured points.
             *
             * The default value is 10.
             */
            get: function () { return this._gap; },
            set: function (val) {
                if (val >= 0) {
                    this._gap = val;
                }
                else {
                    throw new Error('DimensionLink: invalid new gap: ' + val);
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Constructs the link's route by modifying {@link #points}.
         * @return {boolean} true if it computed a route of points
         */
        DimensioningLink.prototype.computePoints = function () {
            var fromnode = this.fromNode;
            if (!fromnode)
                return false;
            var fromport = this.fromPort;
            if (!fromport)
                return false;
            var fromspot = this.computeSpot(true);
            var tonode = this.toNode;
            if (!tonode)
                return false;
            var toport = this.toPort;
            if (!toport)
                return false;
            var tospot = this.computeSpot(false);
            var frompoint = this.getLinkPoint(fromnode, fromport, fromspot, true, true, tonode, toport);
            if (!frompoint.isReal())
                return false;
            var topoint = this.getLinkPoint(tonode, toport, tospot, false, true, fromnode, fromport);
            if (!topoint.isReal())
                return false;
            this.clearPoints();
            var ang = this.direction;
            if (isNaN(ang)) {
                ang = frompoint.directionPoint(topoint);
                var p = new go.Point(this.extension, 0);
                p.rotate(ang + 90);
                var q = new go.Point(this.extension - this.inset, 0);
                q.rotate(ang + 90);
                var g = new go.Point(this.gap, 0);
                g.rotate(ang + 90);
                this.addPointAt(frompoint.x + g.x, frompoint.y + g.y);
                this.addPointAt(frompoint.x + p.x, frompoint.y + p.y);
                this.addPointAt(frompoint.x + q.x, frompoint.y + q.y);
                this.addPointAt(topoint.x + q.x, topoint.y + q.y);
                this.addPointAt(topoint.x + p.x, topoint.y + p.y);
                this.addPointAt(topoint.x + g.x, topoint.y + g.y);
            }
            else {
                var dist = this.extension;
                var r = 0.0;
                var s = 0.0;
                var t0 = 0.0;
                var t1 = 0.0;
                if (ang === 0 || ang === 180) {
                    if (ang === 0) {
                        r = Math.min(frompoint.y, topoint.y) - this.extension;
                        s = r + this.inset;
                        t0 = frompoint.y - this.gap;
                        t1 = topoint.y - this.gap;
                    }
                    else {
                        r = Math.max(frompoint.y, topoint.y) + this.extension;
                        s = r - this.inset;
                        t0 = frompoint.y + this.gap;
                        t1 = topoint.y + this.gap;
                    }
                    this.addPointAt(frompoint.x, t0);
                    this.addPointAt(frompoint.x + 0.01, r);
                    this.addPointAt(frompoint.x, s);
                    this.addPointAt(topoint.x, s);
                    this.addPointAt(topoint.x - 0.01, r);
                    this.addPointAt(topoint.x, t1);
                }
                else if (ang === 90 || ang === 270) {
                    if (ang === 90) {
                        r = Math.max(frompoint.x, topoint.x) + this.extension;
                        s = r - this.inset;
                        t0 = frompoint.x + this.gap;
                        t1 = topoint.x + this.gap;
                    }
                    else {
                        r = Math.min(frompoint.x, topoint.x) - this.extension;
                        s = r + this.inset;
                        t0 = frompoint.x - this.gap;
                        t1 = topoint.x - this.gap;
                    }
                    this.addPointAt(t0, frompoint.y);
                    this.addPointAt(r, frompoint.y + 0.01);
                    this.addPointAt(s, frompoint.y);
                    this.addPointAt(s, topoint.y);
                    this.addPointAt(r, topoint.y - 0.01);
                    this.addPointAt(t1, topoint.y);
                }
            }
            this.updateTargetBindings();
            return true;
        };
        return DimensioningLink;
    }(go.Link));
    exports.DimensioningLink = DimensioningLink;
});
