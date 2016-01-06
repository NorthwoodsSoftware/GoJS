"use strict"
/*
*  Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved.
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
  if (link.isSelected && !this.diagram.isReadOnly) {
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
        }
      }
    }
  }
  if (adornment === null) link.removeAdornment(category);

  category = "LinkShiftingTo";
  adornment = null;
  if (link.isSelected && !this.diagram.isReadOnly) {
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
  var h = (toend ? this._toHandleArchetype : this._fromHandleArchetype);
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
  var portb = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
                          port.getDocumentPoint(go.Spot.BottomRight));
  // determine new connection point based on closest point to bounds of port property
  var x = portb.width > 0 ? (pt.x - portb.x) / portb.width : 0;
  var y = portb.height > 0 ? (pt.y - portb.y) / portb.height : 0;

  var sx = undefined;
  var sy = undefined;

  if (x <= 0) {
    sx = 0;
    if (y <= 0) {
      sy = 0;
    } else if (y >= 1) {
      sy = 1;
    } else {
      sy = y;
    }
  } else if (x >= 1) {
    sx = 1;
    if (y <= 0) {
      sy = 0;
    } else if (y >= 1) {
      sy = 1;
    } else {
      sy = y;
    }
  } else {
    if (y <= 0) {
      sx = x;
      sy = 0;
    } else if (y >= 1) {
      sx = x;
      sy = 1;
    } else {  // in the middle
      if (x > y) {
        if (x > 1 - y) {
          sx = 1;  // right side
          sy = y;
        } else {
          sx = x;
          sy = 0;  // top side
        }
      } else {  // y <= x
        if (x > 1 - y) {
          sx = x;
          sy = 1;  // bottom side
        } else {
          sx = 0;  // left side
          sy = y;
        }
      }
    }
  }

  if (sx !== undefined && sy !== undefined) {
    if (fromend) {
      link.fromSpot = new go.Spot(sx, sy);
    } else {
      link.toSpot = new go.Spot(sx, sy);
    }
  }
};
