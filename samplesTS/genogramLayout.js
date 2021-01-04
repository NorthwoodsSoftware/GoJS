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
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenogramLayout = void 0;
    /*
    *  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go.js");
    // A custom layout that shows the two families related to a person's parents
    var GenogramLayout = /** @class */ (function (_super) {
        __extends(GenogramLayout, _super);
        function GenogramLayout() {
            var _this = _super.call(this) || this;
            _this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
            _this.spouseSpacing = 30; // minimum space between spouses
            return _this;
        }
        GenogramLayout.prototype.makeNetwork = function (coll) {
            // generate LayoutEdges for each parent-child Link
            var net = this.createNetwork();
            if (coll instanceof go.Diagram) {
                this.add(net, coll.nodes, true);
                this.add(net, coll.links, true);
            }
            else if (coll instanceof go.Group) {
                this.add(net, coll.memberParts, false);
            }
            else if (coll.iterator) {
                this.add(net, coll.iterator, false);
            }
            return net;
        };
        // internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
        // by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
        GenogramLayout.prototype.add = function (net, coll, nonmemberonly) {
            var multiSpousePeople = new go.Set();
            // consider all Nodes in the given collection
            var it = coll.iterator;
            var _loop_1 = function () {
                var node = it.value;
                if (!(node instanceof go.Node))
                    return "continue";
                if (!node.isLayoutPositioned || !node.isVisible())
                    return "continue";
                if (nonmemberonly && node.containingGroup !== null)
                    return "continue";
                // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
                if (node.isLinkLabel) {
                    // get marriage Link
                    var link = node.labeledLink;
                    if (link) {
                        var spouseA = link.fromNode;
                        var spouseB = link.toNode;
                        // create vertex representing both husband and wife
                        var vertex = net.addNode(node);
                        // now define the vertex size to be big enough to hold both spouses
                        if (spouseA && spouseB) {
                            vertex.width = spouseA.actualBounds.width + this_1.spouseSpacing + spouseB.actualBounds.width;
                            vertex.height = Math.max(spouseA.actualBounds.height, spouseB.actualBounds.height);
                            vertex.focus = new go.Point(spouseA.actualBounds.width + this_1.spouseSpacing / 2, vertex.height / 2);
                        }
                    }
                }
                else {
                    // don't add a vertex for any married person!
                    // instead, code above adds label node for marriage link
                    // assume a marriage Link has a label Node
                    var marriages_1 = 0;
                    node.linksConnected.each(function (l) { if (l.isLabeledLink)
                        marriages_1++; });
                    if (marriages_1 === 0) {
                        var vertex = net.addNode(node);
                    }
                    else if (marriages_1 > 1) {
                        multiSpousePeople.add(node);
                    }
                }
            };
            var this_1 = this;
            while (it.next()) {
                _loop_1();
            }
            // now do all Links
            it.reset();
            var _loop_2 = function () {
                var link = it.value;
                if (!(link instanceof go.Link))
                    return "continue";
                if (!link.isLayoutPositioned || !link.isVisible())
                    return "continue";
                if (nonmemberonly && link.containingGroup !== null)
                    return "continue";
                // if it's a parent-child link, add a LayoutEdge for it
                if (!link.isLabeledLink) {
                    var fromNode = link.fromNode;
                    var toNode = link.toNode;
                    if (fromNode !== null && toNode !== null) {
                        var parent_1 = net.findVertex(fromNode); // should be a label node
                        var child = net.findVertex(toNode);
                        if (parent_1 !== null && child !== null) { // an unmarried child
                            net.linkVertexes(parent_1, child, link);
                        }
                        else if (parent_1 !== null) { // a married child
                            toNode.linksConnected.each(function (l) {
                                if (!l.isLabeledLink)
                                    return; // if it has no label node, it's a parent-child link
                                // found the Marriage Link, now get its label Node
                                var mlab = l.labelNodes.first();
                                // parent-child link should connect with the label node,
                                // so the LayoutEdge should connect with the LayoutVertex representing the label node
                                if (mlab !== null) {
                                    var mlabvert = net.findVertex(mlab);
                                    if (mlabvert !== null) {
                                        net.linkVertexes(parent_1, mlabvert, link);
                                    }
                                }
                            });
                        }
                    }
                }
            };
            while (it.next()) {
                _loop_2();
            }
            var _loop_3 = function () {
                // find all collections of people that are indirectly married to each other
                var node = multiSpousePeople.first();
                var cohort = new go.Set();
                this_2.extendCohort(cohort, node);
                // then encourage them all to be the same generation by connecting them all with a common vertex
                var dummyvert = net.createVertex();
                net.addVertex(dummyvert);
                var marriages = new go.Set();
                cohort.each(function (n) {
                    n.linksConnected.each(function (l) {
                        marriages.add(l);
                    });
                });
                marriages.each(function (link) {
                    // find the vertex for the marriage link (i.e. for the label node)
                    var mlab = link.labelNodes.first();
                    if (mlab !== null) {
                        var v = net.findVertex(mlab);
                        if (v !== null) {
                            net.linkVertexes(dummyvert, v, null);
                        }
                    }
                });
                // done with these people, now see if there are any other multiple-married people
                multiSpousePeople.removeAll(cohort);
            };
            var this_2 = this;
            while (multiSpousePeople.count > 0) {
                _loop_3();
            }
        };
        // collect all of the people indirectly married with a person
        GenogramLayout.prototype.extendCohort = function (coll, node) {
            if (coll.contains(node))
                return;
            coll.add(node);
            var lay = this;
            node.linksConnected.each(function (l) {
                if (l.isLabeledLink) { // if it's a marriage link, continue with both spouses
                    if (l.fromNode !== null)
                        lay.extendCohort(coll, l.fromNode);
                    if (l.toNode !== null)
                        lay.extendCohort(coll, l.toNode);
                }
            });
        };
        GenogramLayout.prototype.assignLayers = function () {
            _super.prototype.assignLayers.call(this);
            var horiz = this.direction === 0.0 || this.direction === 180.0;
            // for every vertex, record the maximum vertex width or height for the vertex's layer
            var maxsizes = [];
            var net = this.network;
            if (net !== null) {
                var vit = net.vertexes.iterator;
                while (vit.next()) {
                    var v = vit.value;
                    var lay = v.layer;
                    var max = maxsizes[lay];
                    if (max === undefined)
                        max = 0;
                    var sz = (horiz ? v.width : v.height);
                    if (sz > max)
                        maxsizes[lay] = sz;
                }
                vit.reset();
                // now make sure every vertex has the maximum width or height according to which layer it is in,
                // and aligned on the left (if horizontal) or the top (if vertical)
                while (vit.next()) {
                    var v = vit.value;
                    var lay = v.layer;
                    var max = maxsizes[lay];
                    if (horiz) {
                        v.focus = new go.Point(0, v.height / 2);
                        v.width = max;
                    }
                    else {
                        v.focus = new go.Point(v.width / 2, 0);
                        v.height = max;
                    }
                }
                // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
                // (other than the ones that are the widest or tallest in their respective layer).
            }
        };
        GenogramLayout.prototype.commitNodes = function () {
            _super.prototype.commitNodes.call(this);
            var net = this.network;
            // position regular nodes
            if (net !== null) {
                var vit = net.vertexes.iterator;
                while (vit.next()) {
                    var v = vit.value;
                    if (v.node !== null && !v.node.isLinkLabel) {
                        v.node.position = new go.Point(v.x, v.y);
                    }
                }
                vit.reset();
                // position the spouses of each marriage vertex
                var layout = this;
                while (vit.next()) {
                    var v = vit.value;
                    if (v.node === null)
                        continue;
                    if (!v.node.isLinkLabel)
                        continue;
                    var labnode = v.node;
                    var lablink = labnode.labeledLink;
                    if (lablink !== null) {
                        // In case the spouses are not actually moved, we need to have the marriage link
                        // position the label node, because LayoutVertex.commit() was called above on these vertexes.
                        // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
                        lablink.invalidateRoute();
                        var spouseA = lablink.fromNode;
                        var spouseB = lablink.toNode;
                        if (spouseA !== null && spouseB != null) {
                            // prefer fathers on the left, mothers on the right
                            if (spouseA.data.s === 'F') { // sex is female
                                var temp = spouseA;
                                spouseA = spouseB;
                                spouseB = temp;
                            }
                            // see if the parents are on the desired sides, to avoid a link crossing
                            var aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
                            var bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
                            if (aParentsNode !== null && bParentsNode !== null && aParentsNode.position.x > bParentsNode.position.x) {
                                // swap the spouses
                                var temp = spouseA;
                                spouseA = spouseB;
                                spouseB = temp;
                            }
                            spouseA.position = new go.Point(v.x, v.y);
                            spouseB.position = new go.Point(v.x + spouseA.actualBounds.width + layout.spouseSpacing, v.y);
                            if (spouseA.opacity === 0) {
                                var pos = new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);
                                spouseA.position = pos;
                                spouseB.position = pos;
                            }
                            else if (spouseB.opacity === 0) {
                                var pos = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
                                spouseA.position = pos;
                                spouseB.position = pos;
                            }
                        }
                    }
                }
                vit.reset();
                var _loop_4 = function () {
                    var v = vit.value;
                    if (v.node === null || v.node.linksConnected.count > 1)
                        return "continue";
                    var mnode = layout.findParentsMarriageLabelNode(v.node);
                    if (mnode !== null && mnode.linksConnected.count === 1) { // if only one child
                        if (layout.network === null)
                            return "continue";
                        var mvert = layout.network.findVertex(mnode);
                        if (mvert !== null) {
                            var newbnds = v.node.actualBounds.copy();
                            newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
                            // see if there's any empty space at the horizontal mid-point in that layer
                            if (layout.diagram !== null) {
                                var overlaps = layout.diagram.findObjectsIn(newbnds, function (x) { var p = x.part; return (p instanceof go.Part) ? p : null; }, function (p) { return p !== v.node; }, true);
                                if (overlaps.count === 0) {
                                    v.node.move(newbnds.position);
                                }
                            }
                        }
                    }
                };
                // position only-child nodes to be under the marriage label node
                while (vit.next()) {
                    _loop_4();
                }
            }
        };
        GenogramLayout.prototype.findParentsMarriageLabelNode = function (node) {
            var it = node.findNodesInto();
            while (it.next()) {
                var n = it.value;
                if (n.isLinkLabel)
                    return n;
            }
            return null;
        };
        return GenogramLayout;
    }(go.LayeredDigraphLayout));
    exports.GenogramLayout = GenogramLayout;
});
// end GenogramLayout class
