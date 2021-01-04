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
    exports.SpiralLayout = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * A custom {@link Layout} that lays out a chain of nodes in a spiral.
     *
     * This layout assumes the graph is a chain of {@link Node}s,
     * {@link #spacing} controls the spacing between nodes.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/Spiral.html">Spiral Layout</a> sample.
     * @category Layout Extension
     */
    var SpiralLayout = /** @class */ (function (_super) {
        __extends(SpiralLayout, _super);
        function SpiralLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._radius = NaN;
            _this._spacing = 10;
            _this._clockwise = true;
            return _this;
        }
        Object.defineProperty(SpiralLayout.prototype, "radius", {
            /**
             * Gets or sets the radius distance.
             *
             * The default value is NaN.
             */
            get: function () { return this._radius; },
            set: function (val) {
                if (typeof val !== 'number')
                    throw new Error('new value ofr SpiralLayout.radius must be a number, not ' + val);
                if (this._radius !== val) {
                    this._radius = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpiralLayout.prototype, "spacing", {
            /**
             * Gets or sets the spacing between nodes.
             *
             * The default value is 100.
             */
            get: function () { return this._spacing; },
            set: function (val) {
                if (typeof val !== 'number')
                    throw new Error('new value for SpiralLayout.spacing must be a number, not: ' + val);
                if (this._spacing !== val) {
                    this._spacing = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpiralLayout.prototype, "clockwise", {
            /**
             * Gets or sets whether the spiral should go clockwise or counter-clockwise.
             *
             * The default value is true.
             */
            get: function () { return this._clockwise; },
            set: function (val) {
                if (typeof val !== 'boolean')
                    throw new Error('new value for SpiralLayout.clockwise must be a boolean, not: ' + val);
                if (this._clockwise !== val) {
                    this._clockwise = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Copies properties to a cloned Layout.
         */
        SpiralLayout.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._radius = this._radius;
            copy._spacing = this._spacing;
            copy._clockwise = this._clockwise;
        };
        /**
         * This method actually positions all of the Nodes, assuming that the ordering of the nodes
         * is given by a single link from one node to the next.
         * This respects the {@link #spacing} property to affect the layout.
         * @param {Diagram|Group|Iterable.<Part>} coll A {@link Diagram} or a {@link Group} or a collection of {@link Part}s.
         */
        SpiralLayout.prototype.doLayout = function (coll) {
            if (this.network === null) {
                this.network = this.makeNetwork(coll);
            }
            this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
            var originx = this.arrangementOrigin.x;
            var originy = this.arrangementOrigin.y;
            var root = null;
            // find a root vertex -- one without any incoming edges
            var it = this.network.vertexes.iterator;
            while (it.next()) {
                var v = it.value;
                if (root === null)
                    root = v; // in case there are only circles
                if (v.sourceEdges.count === 0) {
                    root = v;
                    break;
                }
            }
            // couldn't find a root vertex
            if (root === null) {
                this.network = null;
                return;
            }
            var space = this.spacing;
            var cw = (this.clockwise ? 1 : -1);
            var rad = this.radius;
            if (rad <= 0 || isNaN(rad) || !isFinite(rad))
                rad = this.diameter(root) / 4;
            // treat the root node specially: it goes in the center
            var angle = cw * Math.PI;
            root.centerX = originx;
            root.centerY = originy;
            var edge = root.destinationEdges.first();
            // if (edge === null || edge.link === null) return;
            var link = (edge !== null ? edge.link : null);
            if (link !== null)
                link.curviness = cw * rad;
            // now locate each of the following nodes, in order, along a spiral
            var vert = (edge !== null ? edge.toVertex : null);
            while (vert !== null) {
                // involute spiral
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var x = rad * (cos + angle * sin);
                var y = rad * (sin - angle * cos);
                // the link might connect to a member node of a group
                if (link !== null && vert.node instanceof go.Group && link.toNode !== null && link.toNode !== vert.node) {
                    var offset = link.toNode.location.copy().subtract(vert.node.location);
                    x -= offset.x;
                    y -= offset.y;
                }
                vert.centerX = x + originx;
                vert.centerY = y + originy;
                var nextedge = vert.destinationEdges.first();
                var nextvert = (nextedge !== null ? nextedge.toVertex : null);
                if (nextvert !== null) {
                    // clockwise curves want positive Link.curviness
                    if (this.isRouting && nextedge !== null && nextedge.link !== null) {
                        if (!isNaN(nextedge.link.curviness)) {
                            var c = nextedge.link.curviness;
                            nextedge.link.curviness = cw * Math.abs(c);
                        }
                    }
                    // determine next node's angle
                    var dia = this.diameter(vert) / 2 + this.diameter(nextvert) / 2;
                    angle += cw * Math.atan((dia + space) / Math.sqrt(x * x + y * y));
                }
                edge = nextedge;
                vert = nextvert;
            }
            this.updateParts();
            this.network = null;
        };
        /**
         * Compute the effective diameter of a Node.
         */
        SpiralLayout.prototype.diameter = function (v) {
            if (!v)
                return 0;
            var b = v.bounds;
            return Math.sqrt(b.width * b.width + b.height * b.height);
        };
        return SpiralLayout;
    }(go.Layout));
    exports.SpiralLayout = SpiralLayout;
});
