"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

// Contains PoolLink and BPMNLinkingTool classes for the BPMN sample

// PoolLink, a special Link class for message flows from edges of pools

function PoolLink() {
  go.Link.call(this);
}
go.Diagram.inherit(PoolLink, go.Link);

/** @override */
PoolLink.prototype.getLinkPoint = function(node, port, spot, from, ortho, othernode, otherport) {
  var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
                      port.getDocumentPoint(go.Spot.BottomRight));
  var op = go.Link.prototype.getLinkPoint.call(this, othernode, otherport, spot, from, ortho, node, port);

  var below = op.y > r.centerY;
  var y = below ? r.bottom : r.top;
  if (node.category === "privateProcess") {
    if (op.x < r.left) return new go.Point(r.left, y);
    if (op.x > r.right) return new go.Point(r.right, y);
    return new go.Point(op.x, y);
  } else { // otherwise get the standard link point by calling the base class method
    return go.Link.prototype.getLinkPoint.call(this, node, port, spot, from, ortho, othernode, otherport);
  }
};

// If there are two links from & to same node... and pool is offset in X from node... the link toPoints collide on pool
/** @override */
PoolLink.prototype.computeOtherPoint = function(othernode, otherport) {
  var op = go.Link.prototype.computeOtherPoint(this, othernode, otherport);
  var node = this.toNode;
  if (node === othernode) node = this.fromNode;
  if (othernode.category === "privateProcess") {
    op.x = node.getDocumentPoint(go.Spot.MiddleBottom).x;
  } else {
    if ((node === this.fromNode) ^ (node.actualBounds.centerY < othernode.actualBounds.centerY)) {
      op.x -= 1;
    } else {
      op.x += 1;
    }
  }
  return op;
};

/** @override */
PoolLink.prototype.getLinkDirection = function(node, port, linkpoint, spot, from, ortho, othernode, otherport) {
  if (node.category === "privateProcess") {
    var p = port.getDocumentPoint(go.Spot.Center);
    var op = otherport.getDocumentPoint(go.Spot.Center);
    var below = op.y > p.y;
    return below ? 90 : 270;
  } else {
    return go.Link.prototype.getLinkDirection.call(this, node, port, linkpoint, spot, from, ortho, othernode, otherport);
  }
};


// BPMNLinkingTool, a custom linking tool to switch the class of the link created.

function BPMNLinkingTool() {
  go.LinkingTool.call(this);
  // don't allow user to create link starting on the To node
  this.direction = go.LinkingTool.ForwardsOnly;
  this.temporaryLink.routing = go.Link.Orthogonal;
  this.linkValidation = function(fromnode, fromport, tonode, toport) {
      return BPMNLinkingTool.validateSequenceLinkConnection(fromnode, fromport, tonode, toport) ||
             BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport);
    };    
}
go.Diagram.inherit(BPMNLinkingTool, go.LinkingTool);

/** @override */
BPMNLinkingTool.prototype.insertLink = function(fromnode, fromport, tonode, toport) {
  var lsave = null;
  // maybe temporarily change the link data that is copied to create the new link
  if (BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport)) {
    lsave = this.archetypeLinkData;
    this.archetypeLinkData = { category: "msg" };
  }

  // create the link in the standard manner by calling the base method
  var newlink = go.LinkingTool.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);

  // maybe make the label visible
  if (fromnode.category === "gateway") {
    var label = newlink.findObject("Label");
    if (label !== null) label.visible = true;
  }

  // maybe restore the original archetype link data
  if (lsave !== null) this.archetypeLinkData = lsave;
  return newlink;
};

// static utility validation routines for linking & relinking as well as insert link logic

// in BPMN, can't link sequence flows across subprocess or pool boundaries
BPMNLinkingTool.validateSequenceLinkConnection = function(fromnode, fromport, tonode, toport) {
  if (fromnode.category === null || tonode.category === null) return true;

  // if either node is in a subprocess, both nodes must be in same subprocess (not even Message Flows) 
  if ((fromnode.containingGroup !== null && fromnode.containingGroup.category === "subprocess") || 
      (tonode.containingGroup !== null && tonode.containingGroup.category === "subprocess")) {
    if (fromnode.containingGroup !== tonode.containingGroup) return false;
  }

  if (fromnode.containingGroup === tonode.containingGroup) return true;  // a valid Sequence Flow
  // also check for children in common pool
  var common = fromnode.findCommonContainingGroup(tonode);
  return common != null;
};

// in BPMN, Message Links must cross pool boundaries
BPMNLinkingTool.validateMessageLinkConnection = function(fromnode, fromport, tonode, toport) {
  if (fromnode.category === null || tonode.category === null) return true;
    
  if (fromnode.category === "privateProcess" || tonode.category === "privateProcess") return true;    

  // if either node is in a subprocess, both nodes must be in same subprocess (not even Message Flows) 
  if ((fromnode.containingGroup !== null && fromnode.containingGroup.category === "subprocess") || 
      (tonode.containingGroup !== null && tonode.containingGroup.category === "subprocess")) {
    if (fromnode.containingGroup !== tonode.containingGroup) return false;
  }

  if (fromnode.containingGroup === tonode.containingGroup) return false;  // an invalid Message Flow
  // also check for children in common pool
  var common = fromnode.findCommonContainingGroup(tonode);
  return common === null;
};
