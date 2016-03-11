"use strict";
/*
*  Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Tool for moving a label on a Link

/**
* @constructor
* @extends Tool
* @class
* This tool only works when the Link has a label
* that is positioned at the Link.midPoint plus some offset.
* It does not work for labels that have a particular segmentIndex.
*/
function LinkLabelDraggingTool() {
  go.Tool.call(this);
  this.name = "LinkLabelDragging";

  /** @type {GraphObject} */
  this.label = null;
  /** @type {Point} */
  this._offset = new go.Point();  // of the mouse relative to the center of the label object
  /** @type {Point} */
  this._originalOffset = null;
}
go.Diagram.inherit(LinkLabelDraggingTool, go.Tool);

/**
* This tool can only start if the mouse has moved enough so that it is not a click,
* and if the mouse down point is on a GraphObject "label" in a Link Panel,
* as determined by findLabel().
* @this {LinkLabelDraggingTool}
* @return {boolean}
*/
LinkLabelDraggingTool.prototype.canStart = function() {
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
* an object that is a label of a Link.
* @this {LinkLabelDraggingTool}
* @return {GraphObject} This returns null if no such label is at the mouse down point.
*/
LinkLabelDraggingTool.prototype.findLabel = function() {
  var diagram = this.diagram;
  var e = diagram.lastInput;
  var elt = diagram.findObjectAt(e.documentPoint, null, null);

  if (elt === null || !(elt.part instanceof go.Link)) return null;
  while (elt.panel !== elt.part) {
    elt = elt.panel;
  }
  // If it's at an arrowhead segment index, don't consider it a label:
  if (elt.segmentIndex === 0 || elt.segmentIndex === -1) return null;
  return elt;
};

/**
* Start a transaction, call findLabel and remember it as the "label" property,
* and remember the original value for the label's segmentOffset property.
* @this {LinkLabelDraggingTool}
*/
LinkLabelDraggingTool.prototype.doActivate = function() {
  this.startTransaction("Shifted Label");
  this.label = this.findLabel();
  if (this.label !== null) {
    // compute the offset of the mouse-down point relative to the center of the label
    this._offset = this.diagram.firstInput.documentPoint.copy().subtract(this.label.getDocumentPoint(go.Spot.Center));
    this._originalOffset = this.label.segmentOffset.copy();
  }
  go.Tool.prototype.doActivate.call(this);
}

/**
* Stop any ongoing transaction.
* @this {LinkLabelDraggingTool}
*/
LinkLabelDraggingTool.prototype.doDeactivate = function() {
  go.Tool.prototype.doDeactivate.call(this);
  this.stopTransaction();
}

/**
* Clear any reference to a label element.
* @this {LinkLabelDraggingTool}
*/
LinkLabelDraggingTool.prototype.doStop = function() {
  this.label = null;
  go.Tool.prototype.doStop.call(this);
}

/**
* Restore the label's original value for GraphObject.segmentOffset.
* @this {LinkLabelDraggingTool}
*/
LinkLabelDraggingTool.prototype.doCancel = function() {
  if (this.label !== null) {
    this.label.segmentOffset =  this._originalOffset;
  }
  go.Tool.prototype.doCancel.call(this);
}

/**
* During the drag, call updateSegmentOffset in order to set
* the GraphObject.segmentOffset of the label.
* @this {LinkLabelDraggingTool}
*/
LinkLabelDraggingTool.prototype.doMouseMove = function() {
  if (!this.isActive) return;
  this.updateSegmentOffset();
}

/**
* At the end of the drag, update the segment offset of the label and finish the tool,
* completing a transaction.
* @this {LinkLabelDraggingTool}
*/
LinkLabelDraggingTool.prototype.doMouseUp = function() {
  if (!this.isActive) return;
  this.updateSegmentOffset();
  this.transactionResult = "Shifted Label";
  this.stopTool();
}

/**
* Save the label's GraphObject.segmentOffset as a rotated offset from the midpoint of the
* Link that the label is in.
* @this {LinkLabelDraggingTool}
*/
LinkLabelDraggingTool.prototype.updateSegmentOffset = function() {
  if (this.label === null) return;
  var link = this.label.part;
  if (link === null) return;
  var last = this.diagram.lastInput.documentPoint;
  var mid = link.midPoint;
  // need to rotate this point to account for the angle of the link segment at the mid-point
  var p = new go.Point(last.x - this._offset.x - mid.x, last.y - this._offset.y - mid.y);
  this.label.segmentOffset = p.rotate(-link.midAngle);
}
