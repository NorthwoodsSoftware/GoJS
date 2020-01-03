"use strict";
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Tool for moving a port on a Node

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
* This tool only works when the Node has a port (any GraphObject) marked with
* a non-null and non-empty portId that is positioned in a Spot Panel,
* and the user holds down the Shift key.
* It works by modifying that port's GraphObject.alignment property.
*/
function PortShiftingTool() {
  go.Tool.call(this);
  this.name = "PortShifting";

  /** @type {GraphObject} */
  this.port = null;
  /** @type {Point} */
  this._originalAlignment = null;
}
go.Diagram.inherit(PortShiftingTool, go.Tool);

/**
* This tool can only start if the mouse has moved enough so that it is not a click,
* and if the mouse down point is on a GraphObject "port" in a Spot Panel,
* as determined by findPort().
* @this {PortShiftingTool}
* @return {boolean}
*/
PortShiftingTool.prototype.canStart = function() {
  if (!go.Tool.prototype.canStart.call(this)) return false;
  var diagram = this.diagram;
  if (diagram === null) return false;
  // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
  var e = diagram.lastInput;
  if (!e.left || !e.shift) return false;
  if (!this.isBeyondDragSize()) return false;

  return this.findPort() !== null;
}

/**
* From the GraphObject at the mouse point, search up the visual tree until we get to
* an object that has the portId property set to a non-empty string, that is in a Spot Panel,
* and that is not the main element of the panel (typically the first element).
* @this {PortShiftingTool}
* @return {GraphObject} This returns null if no such port is at the mouse down point.
*/
PortShiftingTool.prototype.findPort = function() {
  var diagram = this.diagram;
  var e = diagram.firstInput;
  var elt = diagram.findObjectAt(e.documentPoint, null, null);
  if (elt === null || !(elt.part instanceof go.Node)) return null;

  while (elt !== null && elt.panel !== null) {
    if (elt.panel.type === go.Panel.Spot && elt.panel.findMainElement() !== elt &&
        elt.portId !== null && elt.portId !== "") return elt;
    elt = elt.panel;
  }
  return null;
};

/**
* Start a transaction, call findPort and remember it as the "port" property,
* and remember the original value for the port's alignment property.
* @this {PortShiftingTool}
*/
PortShiftingTool.prototype.doActivate = function() {
  this.startTransaction("Shifted Label");
  this.port = this.findPort();
  if (this.port !== null) {
    this._originalAlignment = this.port.alignment.copy();
    var main = this.port.panel.findMainElement();
  }
  go.Tool.prototype.doActivate.call(this);
}

/**
* Stop any ongoing transaction.
* @this {PortShiftingTool}
*/
PortShiftingTool.prototype.doDeactivate = function() {
  go.Tool.prototype.doDeactivate.call(this);
  this.stopTransaction();
}

/**
* Clear any reference to a port element.
* @this {PortShiftingTool}
*/
PortShiftingTool.prototype.doStop = function() {
  this.port = null;
  go.Tool.prototype.doStop.call(this);
}

/**
* Restore the port's original value for GraphObject.alignment.
* @this {PortShiftingTool}
*/
PortShiftingTool.prototype.doCancel = function() {
  if (this.port !== null) {
    this.port.alignment = this._originalAlignment;
  }
  go.Tool.prototype.doCancel.call(this);
}

/**
* During the drag, call updateAlignment in order to set the GraphObject.alignment of the port.
* @this {PortShiftingTool}
*/
PortShiftingTool.prototype.doMouseMove = function() {
  if (!this.isActive) return;
  this.updateAlignment();
}

/**
* At the end of the drag, update the alignment of the port and finish the tool,
* completing a transaction.
* @this {PortShiftingTool}
*/
PortShiftingTool.prototype.doMouseUp = function() {
  if (!this.isActive) return;
  this.updateAlignment();
  this.transactionResult = "Shifted Label";
  this.stopTool();
}

/**
* Save the port's GraphObject.alignment as a fractional Spot in the Spot Panel
* that the port is in.  Thus if the main element changes size, the relative positions
* of the ports will be maintained.  But that does assume that the port must remain
* inside the main element -- it cannot wander away from the node.
* This does not modify the port's GraphObject.alignmentFocus property.
* @this {PortShiftingTool}
*/
PortShiftingTool.prototype.updateAlignment = function() {
  if (this.port === null) return;
  var last = this.diagram.lastInput.documentPoint;
  var main = this.port.panel.findMainElement();
  var tl = main.getDocumentPoint(go.Spot.TopLeft);
  var br = main.getDocumentPoint(go.Spot.BottomRight);
  var x = Math.max(0, Math.min((last.x - tl.x) / (br.x - tl.x), 1));
  var y = Math.max(0, Math.min((last.y - tl.y) / (br.y - tl.y), 1));
  this.port.alignment = new go.Spot(x, y);
}
