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
    // A custom TreeLayout that requires a "Split" node and a "Merge" node, by category.
    // The "Split" node should be the root of a tree-like structure if one excludes links to the "Merge" node.
    // This will position the "Merge" node to line up with the "Split" node.
    /**
    * @constructor
    * @extends TreeLayout
    * @class
    * Assume there is a pair of nodes that "Split" and "Merge",
    * along with any number of nodes extending in a tree-structure from the "Split" node.
    * You can set all of the TreeLayout properties that you like,
    * except that for simplicity this code just works for angle === 0 or angle === 90.
    */
    var ParallelLayout = /** @class */ (function (_super) {
        __extends(ParallelLayout, _super);
        function ParallelLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isRealtime = false;
            // these are desired for the Parallel Layout:
            _this.alignment = go.TreeLayout.AlignmentCenterChildren;
            _this.compaction = go.TreeLayout.CompactionNone;
            _this.alternateAlignment = go.TreeLayout.AlignmentCenterChildren;
            _this.alternateCompaction = go.TreeLayout.CompactionNone;
            return _this;
        }
        ParallelLayout.prototype.makeNetwork = function (coll) {
            var net = _super.prototype.makeNetwork.call(this, coll);
            // look for and remember the one "Split" node and the one "Merge" node
            for (var it = net.vertexes.iterator; it.next();) {
                var v = it.value;
                // handle asymmetric Groups, where the Placeholder is not centered
                if (v.node instanceof go.Group && v.node.isSubGraphExpanded && v.node.placeholder !== null) {
                    v.focus = v.node.placeholder.getDocumentPoint(go.Spot.Center).subtract(v.node.position);
                }
                if (v.node.category === "Split") {
                    if (net.splitNode)
                        throw new Error("Split node already exists in " + this + " -- existing: " + net.splitNode + " new: " + v.node);
                    net.splitNode = v.node;
                }
                else if (v.node.category === "Merge") {
                    if (net.mergeNode)
                        throw new Error("Merge node already exists in " + this + " -- existing: " + net.mergeNode + " new: " + v.node);
                    net.mergeNode = v.node;
                }
            }
            if (net.splitNode || net.mergeNode) {
                if (!net.splitNode)
                    throw new Error("Missing Split node in " + this);
                if (!net.mergeNode)
                    throw new Error("Missing Merge node in " + this);
            }
            // don't lay out the Merge node
            if (net.mergeNode)
                net.deleteNode(net.mergeNode);
            return net;
        };
        ;
        ParallelLayout.prototype.commitNodes = function () {
            _super.prototype.commitNodes.call(this);
            var mergeNode = this.network.mergeNode;
            var splitNode = this.network.splitNode;
            var splitVertex = this.network.findVertex(splitNode);
            if (mergeNode && splitVertex) {
                // line up the "Merge" node to the center of the "Split" node
                if (this.angle === 0) {
                    mergeNode.position = new go.Point(splitVertex.x + splitVertex.subtreeSize.width + this.layerSpacing, splitVertex.centerY - mergeNode.actualBounds.height / 2);
                }
                else if (this.angle === 90) {
                    mergeNode.position = new go.Point(splitVertex.centerX - mergeNode.actualBounds.width / 2, splitVertex.y + splitVertex.subtreeSize.height + this.layerSpacing);
                }
            }
        };
        ;
        ParallelLayout.prototype.commitLinks = function () {
            _super.prototype.commitLinks.call(this);
            var mergeNode = this.network.mergeNode;
            if (mergeNode) {
                for (var it = mergeNode.findLinksInto(); it.next();) {
                    var link = it.value;
                    if (this.angle === 0) {
                        link.fromSpot = go.Spot.Right;
                        link.toSpot = go.Spot.Left;
                    }
                    else if (this.angle === 90) {
                        link.fromSpot = go.Spot.Bottom;
                        link.toSpot = go.Spot.Top;
                    }
                    if (!link.isOrthogonal)
                        continue;
                    // have all of the links coming into the "Merge" node have segments
                    // that share a common X (or if angle==90, Y) coordinate
                    link.updateRoute();
                    if (link.pointsCount >= 6) {
                        var pts = link.points.copy();
                        var p2 = pts.elt(pts.length - 4);
                        var p3 = pts.elt(pts.length - 3);
                        if (this.angle === 0) {
                            var x = mergeNode.position.x - this.layerSpacing / 2;
                            pts.setElt(pts.length - 4, new go.Point(x, p2.y));
                            pts.setElt(pts.length - 3, new go.Point(x, p3.y));
                        }
                        else if (this.angle === 90) {
                            var y = mergeNode.position.y - this.layerSpacing / 2;
                            pts.setElt(pts.length - 4, new go.Point(p2.x, y));
                            pts.setElt(pts.length - 3, new go.Point(p3.x, y));
                        }
                        link.points = pts;
                    }
                }
            }
        };
        ;
        return ParallelLayout;
    }(go.TreeLayout));
    exports.ParallelLayout = ParallelLayout;
});
