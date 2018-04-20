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
    var TreeMapLayout = /** @class */ (function (_super) {
        __extends(TreeMapLayout, _super);
        function TreeMapLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isTopLevelHorizontal = false;
            return _this;
        }
        /**
        * @ignore
        * Copies properties to a cloned Layout.
        * @this {TreeMapLayout}
        * @param {Layout} copy
        * @override */
        TreeMapLayout.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._isTopLevelHorizontal = this._isTopLevelHorizontal;
        };
        TreeMapLayout.prototype.doLayout = function (coll) {
            if (!(coll instanceof go.Diagram))
                throw new Error("TreeMapLayout only works as the Diagram.layout");
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
        ;
        TreeMapLayout.prototype.layoutNode = function (horiz, n, x, y, w, h) {
            n.position = new go.Point(x, y);
            n.desiredSize = new go.Size(w, h);
            if (n instanceof go.Group) {
                var g = n;
                var total = g.data.total;
                var gx = x;
                var gy = y;
                var lay = this;
                g.memberParts.each(function (p) {
                    if (p instanceof go.Link)
                        return;
                    var tot = p.data.total;
                    if (horiz) {
                        var pw = w * tot / total;
                        lay.layoutNode(!horiz, p, gx, gy, pw, h);
                        gx += pw;
                    }
                    else {
                        var ph = h * tot / total;
                        lay.layoutNode(!horiz, p, gx, gy, w, ph);
                        gy += ph;
                    }
                });
            }
        };
        ;
        TreeMapLayout.prototype.computeTotals = function (diagram) {
            if (!diagram.nodes.all(function (g) { return !(g instanceof go.Group) || g.data.total >= 0; })) {
                var groups = new go.Set();
                diagram.nodes.each(function (n) {
                    if (n instanceof go.Group) { // collect all groups
                        groups.add(n);
                    }
                    else { // regular nodes just have their total == size
                        n.data.total = n.data.size;
                    }
                });
                // keep looking for groups whose total can be computed, until all groups have been processed
                while (groups.count > 0) {
                    var grps = new go.Set();
                    groups.each(function (g) {
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
                    groups = grps;
                }
            }
        };
        ;
        Object.defineProperty(TreeMapLayout.prototype, "isTopLevelHorizontal", {
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
        return TreeMapLayout;
    }(go.Layout));
    exports.TreeMapLayout = TreeMapLayout;
});
