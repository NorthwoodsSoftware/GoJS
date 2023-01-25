"use strict";
/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* A custom {@link TreeLayout} that can be used for laying out stylized flowcharts.
* Each layout requires a single "Split" node and a single "Merge" node.
* The "Split" node should be the root of a tree-like structure if one excludes links to the "Merge" node.
* This will position the "Merge" node to line up with the "Split" node.
*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends TreeLayout
* @class
* You can set all of the TreeLayout properties that you like,
* except that for simplicity this code just works for angle === 0 or angle === 90.
*/
function ParallelLayout() {
  go.TreeLayout.call(this);
  this._splitNode = null;
  this._mergeNode = null;
  // these are desired for the Parallel Layout:
  this.isRealtime = false;
  this.alignment = go.TreeLayout.AlignmentCenterChildren;
  this.compaction = go.TreeLayout.CompactionNone;
  this.alternateAlignment = go.TreeLayout.AlignmentCenterChildren;
  this.alternateCompaction = go.TreeLayout.CompactionNone;
}
go.Diagram.inherit(ParallelLayout, go.TreeLayout);

/**
 * Overridable predicate for deciding if a Node is a Split node.
 * By default this checks the node's {@link Part#category} to see if it is
 * "Split", "Start", "For", "While", "If", or "Switch".
 * @param {Node} node
 * @return {boolean}
 */
ParallelLayout.prototype.isSplit = function(node) {
  if (!(node instanceof go.Node)) return false;
  var cat = node.category;
  return (cat === "Split" || cat === "Start" || cat === "For" || cat === "While" || cat === "If" || cat === "Switch");
}

/**
 * Overridable predicate for deciding if a Node is a Merge node.
 * By default this checks the node's {@link Part#category} to see if it is
 * "Merge", "End", "EndFor", "EndWhile", "EndIf", or "EndSwitch".
 * @param {Node} node
 * @return {boolean}
 */
ParallelLayout.prototype.isMerge = function(node) {
  if (!(node instanceof go.Node)) return false;
  var cat = node.category;
  return (cat === "Merge" || cat === "End" || cat === "EndFor" || cat === "EndWhile" || cat === "EndIf" || cat === "EndSwitch");
}

/**
 * Overridable predicate for deciding if a Node is a conditional or "If" type of Split Node
 * expecting to have two links coming out of the sides.
 * @param {Node} node
 * @return {boolean}
 */
ParallelLayout.prototype.isConditional = function(node) {
  if (!(node instanceof go.Node)) return false;
  return node.category === "If";
}

/**
 * Overridable predicate for deciding if a Node is a "Switch" type of Split Node
 * expecting to have three links coming out of the bottom/right side.
 * @param {Node} node
 * @return {boolean}
 */
ParallelLayout.prototype.isSwitch = function(node) {
  if (!(node instanceof go.Node)) return false;
  return node.category === "Switch";
}

/**
 * Find and remember the Split node and the Merge node for this layout.
 * This signals an error if there is not exactly one Node that {@link #isSplit}
 * and exactly one Node that {@link #isMerge}.
 * This can be overridden; any override must set {@link #splitNode} and {@link #mergeNode}.
 * @param {*} vertexes
 */
ParallelLayout.prototype.findSplitMerge = function(vertexes) {
  var split = null;
  var merge = null;
  var it = vertexes.iterator;
  while (it.next()) {
    var v = it.value;
    if (!v.node) continue;
    if (this.isSplit(v.node)) {
      if (split) throw new Error("Split node already exists in " + this + " -- existing: " + split + " new: " + v.node);
      split = v.node;
    } else if (this.isMerge(v.node)) {
      if (merge) throw new Error("Merge node already exists in " + this + " -- existing: " + merge + " new: " + v.node);
      merge = v.node;
    }
  }
  if (!split) throw new Error("Missing Split node in " + this);
  if (!merge) throw new Error("Missing Merge node in " + this);
  this._splitNode = split;
  this._mergeNode = merge;
}

/**
 * @hidden @internal
 * @param {*} coll
 */
ParallelLayout.prototype.makeNetwork = function(coll) {
  var net = go.TreeLayout.prototype.makeNetwork.call(this, coll);
  // Groups might be unbalanced -- position them so that the Split node is centered under the parent node.
  var it = net.vertexes.iterator;
  while (it.next()) {
    var v = it.value;
    var g = v.node;
    if (g instanceof go.Group && g.isSubGraphExpanded && g.placeholder !== null && g.layout instanceof ParallelLayout) {
      var split = g.layout.splitNode;
      if (split) {
        if (this.angle === 0) {
          v.focusY = split.location.y - g.position.y;
        } else if (this.angle === 90) {
          v.focusX = split.location.x - g.position.x;
        }
      }
    }
  }
  if (this.group && !this.group.isSubGraphExpanded) return net;
  // look for and remember the one Split node and the one Merge node
  this.findSplitMerge(net.vertexes);
  // don't have TreeLayout lay out the Merge node; commitNodes will do it
  if (this.mergeNode) net.deleteNode(this.mergeNode);
  if (this.splitNode) {
    // for each vertex that does not have an incoming edge,
    // connect to it from the splitNode vertex with a dummy edge
    var splitv = net.findVertex(this.splitNode);
    net.vertexes.each(function(v) {
      if (splitv === null || v === splitv) return;
      if (v.sourceEdges.count === 0) {
        net.linkVertexes(splitv, v, null);
      }
    });
  }
  return net;
};

/**
 * @hidden @internal
 */
ParallelLayout.prototype.commitNodes = function() {
  go.TreeLayout.prototype.commitNodes.call(this);
  // Line up the Merge node to the center of the Split node
  var mergeNode = this.mergeNode;
  var splitNode = this.splitNode;
  if (mergeNode === null || splitNode === null || this.network === null) return;
  var splitVertex = this.network.findVertex(splitNode);
  if (splitVertex === null) return;
  if (this.angle === 0) {
    mergeNode.location = new go.Point(splitVertex.x + splitVertex.subtreeSize.width + this.layerSpacing + mergeNode.actualBounds.width/2,
                                      splitVertex.centerY);
  } else if (this.angle === 90) {
    mergeNode.location = new go.Point(splitVertex.centerX,
                                      splitVertex.y + splitVertex.subtreeSize.height + this.layerSpacing + mergeNode.actualBounds.height/2);
  }
  mergeNode.ensureBounds();
};

/**
 * @hidden @internal
 */
ParallelLayout.prototype.commitLinks = function() {
  var splitNode = this.splitNode;
  var mergeNode = this.mergeNode;
  if (splitNode === null || mergeNode === null || this.network === null) return;
  // set default link spots based on this.angle
  var it = this.network.edges.iterator;
  while (it.next()) {
    var e = it.value;
    var link = e.link;
    if (!link) continue;
    if (this.angle === 0) {
      if (this.setsPortSpot) link.fromSpot = go.Spot.Right;
      if (this.setsChildPortSpot) link.toSpot = go.Spot.Left;
    } else if (this.angle === 90) {
      if (this.setsPortSpot) link.fromSpot = go.Spot.Bottom;
      if (this.setsChildPortSpot) link.toSpot = go.Spot.Top;
    }
  }
  // Make sure links coming into and going out of a Split node come in the correct way
  if (splitNode) {
    // Handle links coming into the Split node
    var cond = this.isConditional(splitNode);
    var swtch = this.isSwitch(splitNode);
    // Handle links going out of the Split node
    var first = true;  // handle "If" nodes specially
    var lit = splitNode.findLinksOutOf();
    while (lit.next()) {
      var link = lit.value;
      if (this.angle === 0) {
        if (this.setsPortSpot) link.fromSpot = cond ? (first ? go.Spot.Top : go.Spot.Bottom) : (swtch ? go.Spot.RightSide : go.Spot.Right);
        if (this.setsChildPortSpot) link.toSpot = go.Spot.Left;
      } else if (this.angle === 90) {
        if (this.setsPortSpot) link.fromSpot = cond ? (first ? go.Spot.Left : go.Spot.Right) : (swtch ? go.Spot.BottomSide : go.Spot.Bottom);
        if (this.setsChildPortSpot) link.toSpot = go.Spot.Top;
      }
      first = false;
    }
  }
  if (mergeNode) {
    // Handle links going into the Merge node
    var it = mergeNode.findLinksInto();
    while (it.next()) {
      var link = it.value;
      if (!this.isSplit(link.fromNode)) {  // if link connects Split with Merge directly, only set fromSpot once
        if (this.angle === 0) {
          if (this.setsPortSpot) link.fromSpot = go.Spot.Right;
          if (this.setsChildPortSpot) link.toSpot = go.Spot.Left;
        } else if (this.angle === 90) {
          if (this.setsPortSpot) link.fromSpot = go.Spot.Bottom;
          if (this.setsChildPortSpot) link.toSpot = go.Spot.Top;
        }
      }
      if (!link.isOrthogonal) continue;
      // have all of the links coming into the Merge node have segments
      // that share a common X (or if angle==90, Y) coordinate
      link.updateRoute();
      if (link.pointsCount >= 6) {
        var pts = link.points.copy();
        var p2 = pts.elt(pts.length - 4);
        var p3 = pts.elt(pts.length - 3);
        if (this.angle === 0 && p2.x === p3.x) {
          var x = mergeNode.position.x - this.layerSpacing / 2;
          pts.setElt(pts.length - 4, new go.Point(x, p2.y));
          pts.setElt(pts.length - 3, new go.Point(x, p3.y));
        } else if (this.angle === 90 && p2.y === p3.y) {
          var y = mergeNode.position.y - this.layerSpacing / 2;
          pts.setElt(pts.length - 4, new go.Point(p2.x, y));
          pts.setElt(pts.length - 3, new go.Point(p3.x, y));
        }
        link.points = pts;
      }
    }
    // handle links coming out of the Merge node, looping back left/up
    var it = mergeNode.findLinksOutOf();
    while (it.next()) {
      var link = it.value;
      // if connects internal with external node, it isn't a loop-back link
      if (link.toNode.containingGroup !== mergeNode.containingGroup) continue;
      if (this.angle === 0) {
        if (this.setsPortSpot) link.fromSpot = go.Spot.TopBottomSides;
        if (this.setsChildPortSpot) link.toSpot = go.Spot.TopBottomSides;
      } else if (this.angle === 90) {
        if (this.setsPortSpot) link.fromSpot = go.Spot.LeftRightSides;
        if (this.setsChildPortSpot) link.toSpot = go.Spot.LeftRightSides;
      }
      link.routing = go.Link.AvoidsNodes;
    }
  }
};

/**
* This read-only property returns the Split Node of the Diagram or Group.
* The value is only available once the layout has been performed.
* @name ParallelLayout#splitNode

* @return {Node}
*/
Object.defineProperty(ParallelLayout.prototype, "splitNode", {
  get: function() { return this._splitNode; },
  set: function(n) { this._splitNode = n; }
});

/**
* This read-only property returns the Merge Node of the Diagram or Group.
* The value is only available once the layout has been performed.
* @name ParallelLayout#splitNode

* @return {Node}
*/
Object.defineProperty(ParallelLayout.prototype, "mergeNode", {
  get: function() { return this._mergeNode; },
  set: function(n) { this._mergeNode = n; }
})