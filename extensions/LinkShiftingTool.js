"use strict"
/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Tool for shifting the end point of a Link to be anywhere along the edges of the port.

/**
* This constructor produces a tool for shifting the end of a link;
* use it in a diagram.toolManager.mouseDownTools list:
* <pre>myDiagram.toolManager.mouseDownTools.add(new LinkShiftingTool());</pre>
* @constructor
* @extends Tool
* @class
*/
function LinkShiftingTool() {
  go.Tool.call(this);
  this.name = "LinkShifting";

  // these are archetypes for the two shift handles, one at each end of the Link:
  var h = new go.Shape();
  h.geometryString = "F1 M0 0 L8 0 M8 4 L0 4";
  h.fill = null;
  h.stroke = "dodgerblue";
  h.background = "lightblue";
  h.cursor = "pointer";
  h.segmentIndex = 0;
  h.segmentFraction = 1;
  h.segmentOrientation = go.Link.OrientAlong;

  /** @type {GraphObject} */
  this._fromHandleArchetype = h;

  h = new go.Shape();
  h.geometryString = "F1 M0 0 L8 0 M8 4 L0 4";
  h.fill = null;
  h.stroke = "dodgerblue";
  h.background = "lightblue";
  h.cursor = "pointer";
  h.segmentIndex = -1;
  h.segmentFraction = 1;
  h.segmentOrientation = go.Link.OrientAlong;
  /** @type {GraphObject} */
  this._toHandleArchetype = h;

  // transient state
  /** @type {GraphObject} */
  this._handle = null;
  /** @type {List} */
  this._originalPoints = null;
}
go.Diagram.inherit(LinkShiftingTool, go.Tool);

/*
* A small GraphObject used as a shifting handle.
* @name LinkShiftingTool#fromHandleArchetype

* @return {GraphObject}
*/
Object.defineProperty(LinkShiftingTool.prototype, "fromHandleArchetype", {
  get: function() { return this._fromHandleArchetype; },
  set: function(value) { this._fromHandleArchetype = value; }
});

/*
* A small GraphObject used as a shifting handle.
* @name LinkShiftingTool#toHandleArchetype

* @return {GraphObject}
*/
Object.defineProperty(LinkShiftingTool.prototype, "toHandleArchetype", {
  get: function() { return this._toHandleArchetype; },
  set: function(value) { this._toHandleArchetype = value; }
});

/**
* @this {LinkShiftingTool}
* @param {Part} part
*/
LinkShiftingTool.prototype.updateAdornments = function(part) {
  if (part === null || !(part instanceof go.Link)) return;  // this tool only applies to Links
  var link = part;
  // show handles if link is selected, remove them if no longer selected
  var category = "LinkShiftingFrom";
  var adornment = null;
  if (link.isSelected && !this.diagram.isReadOnly && link.fromPort) {
    var selelt = link.selectionObject;
    if (selelt !== null && link.actualBounds.isReal() && link.isVisible() &&
        selelt.actualBounds.isReal() && selelt.isVisibleObject()) {
      var spot = link.computeSpot(true);
      if (spot.isSide() || spot.isSpot()) {
        adornment = link.findAdornment(category);
        if (adornment === null) {
          adornment = this.makeAdornment(selelt, false);
          adornment.category = category;
          link.addAdornment(category, adornment);
        } else {
          // This is just to invalidate the measure, so it recomputes itself based on the adorned link
          adornment.segmentFraction = Math.random();
        }
      }
    }
  }
  if (adornment === null) link.removeAdornment(category);

  category = "LinkShiftingTo";
  adornment = null;
  if (link.isSelected && !this.diagram.isReadOnly && link.toPort) {
    var selelt = link.selectionObject;
    if (selelt !== null && link.actualBounds.isReal() && link.isVisible() &&
        selelt.actualBounds.isReal() && selelt.isVisibleObject()) {
      var spot = link.computeSpot(false);
      if (spot.isSide() || spot.isSpot()) {
        adornment = link.findAdornment(category);
        if (adornment === null) {
          adornment = this.makeAdornment(selelt, true);
          adornment.category = category;
          link.addAdornment(category, adornment);
        } else {
          // This is just to invalidate the measure, so it recomputes itself based on the adorned link
          adornment.segmentFraction = Math.random();
        }
      }
    }
  }
  if (adornment === null) link.removeAdornment(category);
};

/**
* @this {LinkShiftingTool}
* @param {GraphObject} selelt the {@link GraphObject} of the {@link Link} being shifted.
* @param {boolean} toend
* @return {Adornment}
*/
LinkShiftingTool.prototype.makeAdornment = function(selelt, toend) {
  var adornment = new go.Adornment();
  adornment.type = go.Panel.Link;
  var h = (toend ? this.toHandleArchetype : this.fromHandleArchetype);
  if (h !== null) {
    // add a single handle for shifting at one end
    adornment.add(h.copy());
  }
  adornment.adornedObject = selelt;
  return adornment;
};

/**
* @this {LinkShiftingTool}
* @return {boolean}
*/
LinkShiftingTool.prototype.canStart = function() {
  if (!this.isEnabled) return false;
  var diagram = this.diagram;
  if (diagram === null || diagram.isReadOnly || diagram.isModelReadOnly) return false;
  if (!diagram.lastInput.left) return false;
  var h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingFrom");
  if (h === null) h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingTo");
  return (h !== null);
}

/**
* @this {LinkShiftingTool}
*/
LinkShiftingTool.prototype.doActivate = function() {
  var diagram = this.diagram;
  if (diagram === null) return;
  var h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingFrom");
  if (h === null) h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingTo");
  if (h === null) return;
  var ad = h.part;
  var link = ad.adornedObject.part;
  if (!(link instanceof go.Link)) return;

  this._handle = h;
  this._originalPoints = link.points.copy();
  this.startTransaction(this.name);
  diagram.isMouseCaptured = true;
  diagram.currentCursor = 'pointer';
  this.isActive = true;
};

/**
* @this {LinkShiftingTool}
*/
LinkShiftingTool.prototype.doDeactivate = function() {
  this.isActive = false;
  var diagram = this.diagram;
  if (diagram === null) return;

  diagram.isMouseCaptured = false;
  diagram.currentCursor = '';
  this.stopTransaction();
};

/**
* Clean up tool state.
* @this {LinkShiftingTool}
*/
LinkShiftingTool.prototype.doStop = function() {
  this._handle = null;
  this._originalPoints = null;
};

/**
* Clean up tool state.
* @this {LinkShiftingTool}
*/
LinkShiftingTool.prototype.doCancel = function() {
  var ad = this._handle.part;
  var link = ad.adornedObject.part;
  link.points = this._originalPoints;
  this.stopTool();
};

/**
* @this {LinkShiftingTool}
*/
LinkShiftingTool.prototype.doMouseMove = function() {
  if (this.isActive) {
    this.doReshape(this.diagram.lastInput.documentPoint);
  }
};

/**
* @this {LinkShiftingTool}
*/
LinkShiftingTool.prototype.doMouseUp = function() {
  if (this.isActive) {
    this.doReshape(this.diagram.lastInput.documentPoint);
    this.transactionResult = this.name;
  }
  this.stopTool();
};

/**
* @this {LinkShiftingTool}
* @param {Point} pt
*/
LinkShiftingTool.prototype.doReshape = function(pt) {
  var ad = this._handle.part;
  var link = ad.adornedObject.part;
  var fromend = ad.category === "LinkShiftingFrom";
  var port = null;
  if (fromend) {
    port = link.fromPort;
  } else {
    port = link.toPort;
  }
  if (port === null) return;
  // support rotated ports
  var portang = port.getDocumentAngle();
  var center = port.getDocumentPoint(go.Spot.Center);
  var portb = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft).subtract(center).rotate(-portang).add(center),
                          port.getDocumentPoint(go.Spot.BottomRight).subtract(center).rotate(-portang).add(center));
  var lp = link.getLinkPointFromPoint(port.part, port, center, pt, fromend);
  lp = lp.copy().subtract(center).rotate(-portang).add(center);
  var spot = new go.Spot(Math.max(0, Math.min(1, (lp.x - portb.x) / (portb.width || 1))),
                         Math.max(0, Math.min(1, (lp.y - portb.y) / (portb.height || 1))));
  if (fromend) {
    link.fromSpot = spot;
  } else {
    link.toSpot = spot;
  }
};
