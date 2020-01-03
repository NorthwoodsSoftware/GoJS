"use strict"
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// The SectorReshapingTool shows three handles:
// two for changing the angles of the sides of the filled sector,
// and one for controlling the diameter of the sector.

// This depends on there being three data properties, "angle", "sweep", and "radius",
// that hold the needed information to be able to reproduce the sector.

/**
* This SectorReshapingTool class allows for the user to interactively modify the angles of a "pie"-shaped sector of a circle.
* When a node is selected, this shows two handles for changing the angles of the sides of the sector and one handle for changing the radius.
* @constructor
* @extends Tool
* @class
*/
function SectorReshapingTool() {
  go.Tool.call(this);
  this.name = "SectorReshaping";
  this._handle = null;
  this._originalRadius = 0;
  this._originalAngle = 0;
  this._originalSweep = 0;
}
go.Diagram.inherit(SectorReshapingTool, go.Tool);

// these are the names of the data properties to read and write
SectorReshapingTool.radiusProperty = "radius";
SectorReshapingTool.angleProperty = "angle";
SectorReshapingTool.sweepProperty = "sweep";

/**
* This tool can only start if Diagram.allowReshape is true and the mouse-down event
* is at a tool handle created by this tool.
* @this {SectorReshapingTool}
*/
SectorReshapingTool.prototype.canStart = function() {
  if (!this.isEnabled) return false;
  var diagram = this.diagram;
  if (diagram === null || diagram.isReadOnly) return false;
  if (!diagram.allowReshape) return false;
  var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
  return (h !== null);
};

/**
* If the Part is selected, show two angle-changing tool handles and one radius-changing tool handle.
* @this {SectorReshapingTool}
* @param {Part} part
*/
SectorReshapingTool.prototype.updateAdornments = function(part) {
  var data = part.data;
  if (part.isSelected && data !== null && this.diagram !== null && !this.diagram.isReadOnly) {
    var ad = part.findAdornment(this.name);
    if (ad === null) {
      var $ = go.GraphObject.make;
      ad =
        $(go.Adornment, "Spot",
          $(go.Placeholder),
          $(go.Shape, "Diamond",
            { name: "RADIUS", fill: "lime", width: 10, height: 10, cursor: "move" },
            new go.Binding("alignment", "", function(data) {
              var angle = SectorReshapingTool.getAngle(data);
              var sweep = SectorReshapingTool.getSweep(data);
              var p = new go.Point(0.5, 0).rotate(angle + sweep / 2);
              return new go.Spot(0.5 + p.x, 0.5 + p.y);
            })),
          $(go.Shape, "Circle",
            { name: "ANGLE", fill: "lime", width: 8, height: 8, cursor: "move" },
            new go.Binding("alignment", "", function(data) {
              var angle = SectorReshapingTool.getAngle(data);
              var p = new go.Point(0.5, 0).rotate(angle);
              return new go.Spot(0.5 + p.x, 0.5 + p.y);
            })),
          $(go.Shape, "Circle",
            { name: "SWEEP", fill: "lime", width: 8, height: 8, cursor: "move" },
            new go.Binding("alignment", "", function(data) {
              var angle = SectorReshapingTool.getAngle(data);
              var sweep = SectorReshapingTool.getSweep(data);
              var p = new go.Point(0.5, 0).rotate(angle + sweep);
              return new go.Spot(0.5 + p.x, 0.5 + p.y);
            }))
        );
      ad.adornedObject = part.locationObject;
      part.addAdornment(this.name, ad);
    } else {
      ad.location = part.position;
      var ns = part.naturalBounds;
      ad.placeholder.desiredSize = new go.Size((ns.width) * part.scale, (ns.height) * part.scale);
      ad.updateTargetBindings();
    }
  } else {
    part.removeAdornment(this.name);
  }
}

/**
* Remember the original angles and radius and start a transaction.
* @this {SectorReshapingTool}
*/
SectorReshapingTool.prototype.doActivate = function() {
  var diagram = this.diagram;
  if (diagram === null) return;
  this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
  if (this._handle === null) return;
  var part = this._handle.part.adornedPart;
  if (part === null || part.data === null) return;

  var data = part.data;
  this._originalRadius = SectorReshapingTool.getRadius(data);
  this._originalAngle = SectorReshapingTool.getAngle(data);
  this._originalSweep = SectorReshapingTool.getSweep(data);

  this.startTransaction(this.name);
  this.isActive = true;
}

/**
* Stop the transaction.
* @this {SectorReshapingTool}
*/
SectorReshapingTool.prototype.doDeactivate = function() {
  this.stopTransaction();

  this._handle = null;
  this.isActive = false;
};

/**
* Restore the original angles and radius and then stop this tool.
* @this {SectorReshapingTool}
*/
SectorReshapingTool.prototype.doCancel = function() {
  if (this._handle !== null && this.diagram !== null) {
    var part = this._handle.part.adornedPart;
    if (part !== null) {
      var model = this.diagram.model;
      model.setDataProperty(part.data, SectorReshapingTool.radiusProperty, this._originalRadius);
      model.setDataProperty(part.data, SectorReshapingTool.angleProperty, this._originalAngle);
      model.setDataProperty(part.data, SectorReshapingTool.sweepProperty, this._originalSweep);
    }
  }
  this.stopTool();
};

/**
* Depending on the current handle being dragged, update the "radius", the "angle", or the "sweep"
* properties on the model data.
* Those property names are currently parameterized as static members of SectorReshapingTool.
* @this {SectorReshapingTool}
*/
SectorReshapingTool.prototype.doMouseMove = function() {
  var diagram = this.diagram;
  if (this.isActive && diagram !== null) {
    var h = this._handle;
    var center = h.part.adornedObject.getDocumentPoint(go.Spot.Center);
    var node = h.part.adornedPart;
    var mouse = diagram.lastInput.documentPoint;
    if (h.name === "RADIUS") {
      var dst = Math.sqrt(center.distanceSquaredPoint(mouse));
      diagram.model.setDataProperty(node.data, SectorReshapingTool.radiusProperty, dst);
    } else if (h.name === "ANGLE") {
      var dir = center.directionPoint(mouse);
      diagram.model.setDataProperty(node.data, SectorReshapingTool.angleProperty, dir);
    } else if (h.name === "SWEEP") {
      var dir = center.directionPoint(mouse);
      var ang = SectorReshapingTool.getAngle(node.data);
      var swp = (dir - ang + 360) % 360;
      if (swp > 359) swp = 360;  // make it easier to get a full circle
      diagram.model.setDataProperty(node.data, SectorReshapingTool.sweepProperty, swp);
    }
  }
};

/**
* Finish the transaction and stop the tool.
* @this {SectorReshapingTool}
*/
SectorReshapingTool.prototype.doMouseUp = function() {
  var diagram = this.diagram;
  if (this.isActive && diagram !== null) {
    this.transactionResult = this.name;  // successful finish
  }
  this.stopTool();
};

// static functions for getting data
SectorReshapingTool.getRadius = function(data) {
  var radius = data[SectorReshapingTool.radiusProperty];
  if (!(typeof radius === "number") || isNaN(radius) || radius <= 0) radius = 50;
  return radius;
}

SectorReshapingTool.getAngle = function(data) {
  var angle = data[SectorReshapingTool.angleProperty];
  if (!(typeof angle === "number") || isNaN(angle)) angle = 0; else angle = angle % 360;
  return angle;
}

SectorReshapingTool.getSweep = function(data) {
  var sweep = data[SectorReshapingTool.sweepProperty];
  if (!(typeof sweep === "number") || isNaN(sweep)) sweep = 360;
  return sweep;
}
