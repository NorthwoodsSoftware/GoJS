"use strict";
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Tool for moving a label on a Node

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends Tool
* @class
* This tool only works when the Node has a label (any GraphObject) marked with
* { _isNodeLabel: true } that is positioned in a Spot Panel.
* It works by modifying that label's GraphObject.alignment property to have an
* offset from the center of the panel.
*/
function NodeLabelDraggingTool() {
  go.Tool.call(this);
  this.name = "NodeLabelDragging";

  /** @type {GraphObject} */
  this.label = null;
  /** @type {Point} */
  this._offset = new go.Point();  // of the mouse relative to the center of the label object
  /** @type {Point} */
  this._originalAlignment = null;
  /** @type {Point} */
  this._originalCenter = null;
}
go.Diagram.inherit(NodeLabelDraggingTool, go.Tool);

/**
* This tool can only start if the mouse has moved enough so that it is not a click,
* and if the mouse down point is on a GraphObject "label" in a Spot Panel,
* as determined by findLabel().
* @this {NodeLabelDraggingTool}
* @return {boolean}
*/
NodeLabelDraggingTool.prototype.canStart = function() {
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
* an object that has the "_isNodeLabel" property set to true, that is in a Spot Panel,
* and that is not the first element of that Panel (i.e. not the main element of the panel).
* @this {NodeLabelDraggingTool}
* @return {GraphObject} This returns null if no such label is at the mouse down point.
*/
NodeLabelDraggingTool.prototype.findLabel = function() {
  var diagram = this.diagram;
  var e = diagram.firstInput;
  var elt = diagram.findObjectAt(e.documentPoint, null, null);

  if (elt === null || !(elt.part instanceof go.Node)) return null;
  while (elt.panel !== null) {
    if (elt._isNodeLabel && elt.panel.type === go.Panel.Spot && elt.panel.findMainElement() !== elt) return elt;
    elt = elt.panel;
  }
  return null;
};

/**
* Start a transaction, call findLabel and remember it as the "label" property,
* and remember the original value for the label's alignment property.
* @this {NodeLabelDraggingTool}
*/
NodeLabelDraggingTool.prototype.doActivate = function() {
  this.startTransaction("Shifted Label");
  this.label = this.findLabel();
  if (this.label !== null) {
    // compute the offset of the mouse-down point relative to the center of the label
    this._offset = this.diagram.firstInput.documentPoint.copy().subtract(this.label.getDocumentPoint(go.Spot.Center));
    this._originalAlignment = this.label.alignment.copy();
    var main = this.label.panel.findMainElement();
    this._originalCenter = main.getDocumentPoint(go.Spot.Center);
  }
  go.Tool.prototype.doActivate.call(this);
}

/**
* Stop any ongoing transaction.
* @this {NodeLabelDraggingTool}
*/
NodeLabelDraggingTool.prototype.doDeactivate = function() {
  go.Tool.prototype.doDeactivate.call(this);
  this.stopTransaction();
}

/**
* Clear any reference to a label element.
* @this {NodeLabelDraggingTool}
*/
NodeLabelDraggingTool.prototype.doStop = function() {
  this.label = null;
  go.Tool.prototype.doStop.call(this);
}

/**
* Restore the label's original value for GraphObject.alignment.
* @this {NodeLabelDraggingTool}
*/
NodeLabelDraggingTool.prototype.doCancel = function() {
  if (this.label !== null) {
    this.label.alignment = this._originalAlignment;
  }
  go.Tool.prototype.doCancel.call(this);
}

/**
* During the drag, call updateAlignment in order to set the GraphObject.alignment of the label.
* @this {NodeLabelDraggingTool}
*/
NodeLabelDraggingTool.prototype.doMouseMove = function() {
  if (!this.isActive) return;
  this.updateAlignment();
}

/**
* At the end of the drag, update the alignment of the label and finish the tool,
* completing a transaction.
* @this {NodeLabelDraggingTool}
*/
NodeLabelDraggingTool.prototype.doMouseUp = function() {
  if (!this.isActive) return;
  this.updateAlignment();
  this.transactionResult = "Shifted Label";
  this.stopTool();
}

/**
* Save the label's GraphObject.alignment as an absolute offset from the center of the Spot Panel
* that the label is in.
* @this {NodeLabelDraggingTool}
*/
NodeLabelDraggingTool.prototype.updateAlignment = function() {
  if (this.label === null) return;
  var last = this.diagram.lastInput.documentPoint;
  var cntr = this._originalCenter;
  this.label.alignment = new go.Spot(0.5, 0.5, last.x - this._offset.x - cntr.x, last.y - this._offset.y - cntr.y);
}
