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
     * A custom {@link Layout} that lays out hierarchical data using nested rectangles.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/TreeMap.html">Tree Map Layout</a> sample.
     * @category Layout Extension
     */
    var TreeMapLayout = /** @class */ (function (_super) {
        __extends(TreeMapLayout, _super);
        function TreeMapLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isTopLevelHorizontal = false;
            return _this;
        }
        Object.defineProperty(TreeMapLayout.prototype, "isTopLevelHorizontal", {
            /**
             * Gets or sets whether top level Parts are laid out horizontally.
             */
            get: function () { return this._isTopLevelHorizontal; },
            set: function (val) {
                if (this._isTopLevelHorizontal !== val) {
                    this._isTopLevelHorizontal = val;
                    this.invalidateLayout();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Copies properties to a cloned Layout.
         */
        TreeMapLayout.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._isTopLevelHorizontal = this._isTopLevelHorizontal;
        };
        /**
         * This method actually positions all of the nodes by determining total area and then recursively tiling nodes from the top-level down.
         * @param {Diagram|Group|Iterable.<Part>} coll A {@link Diagram} or a {@link Group} or a collection of {@link Part}s.
         */
        TreeMapLayout.prototype.doLayout = function (coll) {
            if (!(coll instanceof go.Diagram))
                throw new Error('TreeMapLayout only works as the Diagram.layout');
            var diagram = coll;
            this.computeTotals(diagram); // make sure data.total has been computed for every node
            // figure out how large an area to cover;
            // perhaps this should be a property that could be set, rather than depending on the current viewport
            this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
            var x = this.arrangementOrigin.x;
            var y = this.arrangementOrigin.y;
            var w = diagram.viewportBounds.width;
            var h = diagram.viewportBounds.height;
            if (isNaN(w))
                w = 1000;
            if (isNaN(h))
                h = 1000;
            // collect all top-level nodes, and sum their totals
            var tops = new go.Set();
            var total = 0;
            diagram.nodes.each(function (n) {
                if (n.isTopLevel) {
                    tops.add(n);
                    total += n.data.total;
                }
            });
            var horiz = this.isTopLevelHorizontal; // initially horizontal layout?
            // the following was copied from the layoutNode method
            var gx = x;
            var gy = y;
            var lay = this;
            tops.each(function (n) {
                var tot = n.data.total;
                if (horiz) {
                    var pw = w * tot / total;
                    lay.layoutNode(!horiz, n, gx, gy, pw, h);
                    gx += pw;
                }
                else {
                    var ph = h * tot / total;
                    lay.layoutNode(!horiz, n, gx, gy, w, ph);
                    gy += ph;
                }
            });
        };
        /**
         * @hidden @internal
         */
        TreeMapLayout.prototype.layoutNode = function (horiz, n, x, y, w, h) {
            n.position = new go.Point(x, y);
            n.desiredSize = new go.Size(w, h);
            if (n instanceof go.Group) {
                var g = n;
                var total_1 = g.data.total;
                var gx_1 = x;
                var gy_1 = y;
                var lay_1 = this;
                g.memberParts.each(function (p) {
                    if (p instanceof go.Link)
                        return;
                    var tot = p.data.total;
                    if (horiz) {
                        var pw = w * tot / total_1;
                        lay_1.layoutNode(!horiz, p, gx_1, gy_1, pw, h);
                        gx_1 += pw;
                    }
                    else {
                        var ph = h * tot / total_1;
                        lay_1.layoutNode(!horiz, p, gx_1, gy_1, w, ph);
                        gy_1 += ph;
                    }
                });
            }
        };
        /**
         * Compute the `data.total` for each node in the Diagram, with a {@link Group}'s being a sum of its members.
         */
        TreeMapLayout.prototype.computeTotals = function (diagram) {
            if (!diagram.nodes.all(function (g) { return !(g instanceof go.Group) || g.data.total >= 0; })) {
                var groups_1 = new go.Set();
                diagram.nodes.each(function (n) {
                    if (n instanceof go.Group) { // collect all groups
                        groups_1.add(n);
                    }
                    else { // regular nodes just have their total == size
                        n.data.total = n.data.size;
                    }
                });
                var _loop_1 = function () {
                    var grps = new go.Set();
                    groups_1.each(function (g) {
                        // for a group all of whose member nodes have an initialized data.total,
                        if (g.memberParts.all(function (m) { return !(m instanceof go.Group) || m.data.total >= 0; })) {
                            // compute the group's total as the sum of the sizes of all of the member nodes
                            g.data.total = 0;
                            g.memberParts.each(function (m) { if (m instanceof go.Node)
                                g.data.total += m.data.total; });
                        }
                        else { // remember for the next iteration
                            grps.add(g);
                        }
                    });
                    groups_1 = grps;
                };
                // keep looking for groups whose total can be computed, until all groups have been processed
                while (groups_1.count > 0) {
                    _loop_1();
                }
            }
        };
        return TreeMapLayout;
    }(go.Layout));
    exports.TreeMapLayout = TreeMapLayout;
});
