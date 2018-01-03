"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

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
function ParallelLayout() {
  go.TreeLayout.call(this);
  this.isRealtime = false;
  // these are desired for the Parallel Layout:
  this.alignment = go.TreeLayout.AlignmentCenterChildren;
  this.compaction = go.TreeLayout.CompactionNone;
  this.alternateAlignment = go.TreeLayout.AlignmentCenterChildren;
  this.alternateCompaction = go.TreeLayout.CompactionNone;
}
go.Diagram.inherit(ParallelLayout, go.TreeLayout);

ParallelLayout.prototype.makeNetwork = function(coll) {
  var net = go.TreeLayout.prototype.makeNetwork.call(this, coll);
  // look for and remember the one "Split" node and the one "Merge" node
  for (var it = net.vertexes.iterator; it.next(); ) {
    var v = it.value;
    // handle asymmetric Groups, where the Placeholder is not centered
    if (v.node instanceof go.Group && v.node.isSubGraphExpanded && v.node.placeholder !== null) {
      v.focus = v.node.placeholder.getDocumentPoint(go.Spot.Center).subtract(v.node.position);
    }
    if (v.node.category === "Split") {
      if (net.splitNode) throw new Error("Split node already exists in " + this + " -- existing: " + net.splitNode + " new: " + v.node);
      net.splitNode = v.node;
    } else if (v.node.category === "Merge") {
      if (net.mergeNode) throw new Error("Merge node already exists in " + this + " -- existing: " + net.mergeNode + " new: " + v.node);
      net.mergeNode = v.node;
    }
  }
  if (net.splitNode || net.mergeNode) {
    if (!net.splitNode) throw new Error("Missing Split node in " + this);
    if (!net.mergeNode) throw new Error("Missing Merge node in " + this);
  }
  // don't lay out the Merge node
  if (net.mergeNode) net.deleteNode(net.mergeNode);
  return net;
};

ParallelLayout.prototype.commitNodes = function() {
  go.TreeLayout.prototype.commitNodes.call(this);
  var mergeNode = this.network.mergeNode;
  var splitNode = this.network.splitNode;
  var splitVertex = this.network.findVertex(splitNode);
  if (mergeNode && splitVertex) {
    // line up the "Merge" node to the center of the "Split" node
    if (this.angle === 0) {
      mergeNode.position = new go.Point(splitVertex.x + splitVertex.subtreeSize.width + this.layerSpacing,
                                        splitVertex.centerY - mergeNode.actualBounds.height/2);
    } else if (this.angle === 90) {
      mergeNode.position = new go.Point(splitVertex.centerX - mergeNode.actualBounds.width / 2,
                                        splitVertex.y + splitVertex.subtreeSize.height + this.layerSpacing);
    }
  }
};

ParallelLayout.prototype.commitLinks = function() {
  go.TreeLayout.prototype.commitLinks.call(this);
  var mergeNode = this.network.mergeNode;
  if (mergeNode) {
    for (var it = mergeNode.findLinksInto(); it.next();) {
      var link = it.value;
      if (this.angle === 0) {
        link.fromSpot = go.Spot.Right;
        link.toSpot = go.Spot.Left;
      } else if (this.angle === 90) {
        link.fromSpot = go.Spot.Bottom;
        link.toSpot = go.Spot.Top;
      }
      if (!link.isOrthogonal) continue;
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
        } else if (this.angle === 90) {
          var y = mergeNode.position.y - this.layerSpacing / 2;
          pts.setElt(pts.length - 4, new go.Point(p2.x, y));
          pts.setElt(pts.length - 3, new go.Point(p3.x, y));
        }
        link.points = pts;
      }
    }
  }
};
