"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Tool for moving a label on a Link that keeps the label on the link's path.

/**
* @constructor
* @extends Tool
* @class
* This tool only works when the Link has a label marked by the "_isLinkLabel" property.
*/
function LinkLabelOnPathDraggingTool() {
  go.Tool.call(this);
  this.name = "LinkLabelOnPathDragging";

  /** @type {GraphObject} */
  this.label = null;
  /** @type {number} */
  this._originalIndex = null;
  /** @type {number} */
  this._originalFraction = null;
}
go.Diagram.inherit(LinkLabelOnPathDraggingTool, go.Tool);

/**
* This tool can only start if the mouse has moved enough so that it is not a click,
* and if the mouse down point is on a GraphObject "label" in a Link Panel,
* as determined by findLabel().
* @this {LinkLabelOnPathDraggingTool}
* @return {boolean}
*/
LinkLabelOnPathDraggingTool.prototype.canStart = function() {
  if (!go.Tool.prototype.canStart.call(this)) return false;
  var diagram = this.diagram;
  if (diagram === null) return false;
  // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
  var e = diagram.lastInput;
  if (!e.left) return false;
  if (!this.isBeyondDragSize()) return false;

  return this.findLabel() !== null;
}

/**
* From the GraphObject at the mouse point, search up the visual tree until we get to
* an object that has the "_isLinkLabel" property set to true and that is an immediate child of a Link Panel.
* @this {LinkLabelOnPathDraggingTool}
* @return {GraphObject} This returns null if no such label is at the mouse down point.
*/
LinkLabelOnPathDraggingTool.prototype.findLabel = function() {
  var diagram = this.diagram;
  var e = diagram.lastInput;
  var elt = diagram.findObjectAt(e.documentPoint, null, null);

  if (elt === null || !(elt.part instanceof go.Link)) return null;
  while (elt.panel !== elt.part) {
    elt = elt.panel;
  }
  // If it's not marked as "_isLinkLabel", don't consider it a label:
  if (!elt._isLinkLabel) return null;
  return elt;
};

/**
* Start a transaction, call findLabel and remember it as the "label" property,
* and remember the original values for the label's segment properties.
* @this {LinkLabelOnPathDraggingTool}
*/
LinkLabelOnPathDraggingTool.prototype.doActivate = function() {
  this.startTransaction("Shifted Label");
  this.label = this.findLabel();
  if (this.label !== null) {
    this._originalIndex = this.label.segmentIndex;
    this._originalFraction = this.label.segmentFraction;
  }
  go.Tool.prototype.doActivate.call(this);
}

/**
* Stop any ongoing transaction.
* @this {LinkLabelOnPathDraggingTool}
*/
LinkLabelOnPathDraggingTool.prototype.doDeactivate = function() {
  go.Tool.prototype.doDeactivate.call(this);
  this.stopTransaction();
}

/**
* Clear any reference to a label element.
* @this {LinkLabelOnPathDraggingTool}
*/
LinkLabelOnPathDraggingTool.prototype.doStop = function() {
  this.label = null;
  go.Tool.prototype.doStop.call(this);
}

/**
* Restore the label's original value for GraphObject.segment... properties.
* @this {LinkLabelOnPathDraggingTool}
*/
LinkLabelOnPathDraggingTool.prototype.doCancel = function() {
  if (this.label !== null) {
    this.label.segmentIndex = this._originalIndex;
    this.label.segmentFraction = this._originalFraction;
  }
  go.Tool.prototype.doCancel.call(this);
}

/**
* During the drag, call updateSegmentOffset in order to set the segment... properties of the label.
* @this {LinkLabelOnPathDraggingTool}
*/
LinkLabelOnPathDraggingTool.prototype.doMouseMove = function() {
  if (!this.isActive) return;
  this.updateSegmentOffset();
}

/**
* At the end of the drag, update the segment properties of the label and finish the tool,
* completing a transaction.
* @this {LinkLabelOnPathDraggingTool}
*/
LinkLabelOnPathDraggingTool.prototype.doMouseUp = function() {
  if (!this.isActive) return;
  this.updateSegmentOffset();
  this.transactionResult = "Shifted Label";
  this.stopTool();
}

/**
* Save the label's GraphObject.segmentIndex and segmentFraction at the closest point to the mouse.
* @this {LinkLabelOnPathDraggingTool}
*/
LinkLabelOnPathDraggingTool.prototype.updateSegmentOffset = function() {
  var lab = this.label;
  if (lab === null) return;
  var link = lab.part;
  if (!(link instanceof go.Link)) return;

  var last = this.diagram.lastInput.documentPoint;
  var idx = link.findClosestSegment(last);
  idx = Math.min(Math.max(link.firstPickIndex, idx), link.lastPickIndex - 1);
  var p1 = link.getPoint(idx);
  var p2 = link.getPoint(idx + 1);
  var total = Math.sqrt(p1.distanceSquaredPoint(p2));
  var p = last.copy().projectOntoLineSegmentPoint(p1, p2);
  var frac = Math.sqrt(p1.distanceSquaredPoint(p)) / total;
  lab.segmentIndex = idx;
  lab.segmentFraction = frac;
}
