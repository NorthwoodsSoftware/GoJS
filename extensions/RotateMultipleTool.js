"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

/**
* @constructor
* @extends RotatingTool
* @class
* A custom tool for rotating multiple objects at a time. When more than one
* part is selected, rotates all parts, revolving them about their collective center.
* If the control key is held down during rotation, rotates all parts individually.
* <p>
* Caution: this only works for Groups that do *not* have a Placeholder.
*/
function RotateMultipleTool() {
  go.RotatingTool.call(this);
  this.name = "RotateMultiple";
  // holds references to all selected non-Link Parts and their offset & angles
  this.initialInfo = null;
  // initial angle when rotating as a whole
  this.initialAngle = 0;
  // rotation point of selection
  this.centerPoint = null;
 }
go.Diagram.inherit(RotateMultipleTool, go.RotatingTool);

/**
* Calls RotatingTool.doActivate, and then remembers the center point of the collection,
* and the initial distances and angles of selected parts to the center.
* @this {RotateMultipleTool}
*/
RotateMultipleTool.prototype.doActivate = function() {
  go.RotatingTool.prototype.doActivate.call(this);
  var diagram = this.diagram;
  // center point of the collection
  this.centerPoint = diagram.computePartsBounds(diagram.selection).center;

  // remember the angle relative to the center point when rotating the whole collection
  this.initialAngle = this.centerPoint.directionPoint(diagram.lastInput.documentPoint);

  // remember initial angle and distance for each Part
  var infos = new go.Map(go.Part, PartInfo);
  var tool = this;
  diagram.selection.each(function(part) {
    tool.walkTree(part, infos);
  });
  this.initialInfo = infos;
}

/**
* @ignore
* @param {Part} part
* @param {Map} infos
*/
RotateMultipleTool.prototype.walkTree = function(part, infos) {
  if (part === null || part instanceof go.Link) return;
  // distance from centerPoint to locationSpot of part
  var dist = Math.sqrt(this.centerPoint.distanceSquaredPoint(part.location));
  // calculate initial relative angle
  var dir = this.centerPoint.directionPoint(part.location);
  // saves part-angle combination in array
  infos.add(part, new PartInfo(dir, dist, part.rotateObject.angle));
  // recurse into Groups
  if (part instanceof go.Group) {
    var it = part.memberParts.iterator;
    while (it.next()) this.walkTree(it.value, infos);
  }
};

/**
* @ignore
* Internal class that remembers a Part's offset & angle.
*/
function PartInfo(placementAngle, distance, rotationAngle) {
  this.placementAngle = placementAngle * (Math.PI / 180);  // in radians
  this.distance = distance;
  this.rotationAngle = rotationAngle;  // in degrees
}

/**
* Clean up any references to Parts.
* @this {RotateMultipleTool}
*/
RotateMultipleTool.prototype.doDeactivate = function() {
  this.initialInfo = null;
  go.RotatingTool.prototype.doDeactivate.call(this);
};

/**
* Overrides rotatingTool.rotate to rotate all selected objects about their collective center.
* When the control key is held down while rotating, all selected objects are rotated individually.
* @this {RotateMultipleTool}
* @param {number} newangle
*/
RotateMultipleTool.prototype.rotate = function(newangle) {
  var diagram = this.diagram;
  var e = diagram.lastInput;
  // when rotating individual parts, remember the original angle difference
  var angleDiff = newangle - this.adornedObject.part.rotateObject.angle;
  var tool = this;
  this.initialInfo.each(function(kvp) {
    var part = kvp.key;
    if (part instanceof go.Link) return; // only Nodes and simple Parts
    var partInfo = kvp.value;
    // rotate every selected non-Link Part
    // find information about the part set in RotateMultipleTool.initialInformation
    if (e.control || e.meta) {
      if (tool.adornedObject.part === part) {
        part.rotateObject.angle = newangle;
      } else {
        part.rotateObject.angle += angleDiff;
      }
    } else {
      var radAngle = newangle * (Math.PI / 180); // converts the angle traveled from degrees to radians
      // calculate the part's x-y location relative to the central rotation point
      var offsetX = partInfo.distance * Math.cos(radAngle + partInfo.placementAngle);
      var offsetY = partInfo.distance * Math.sin(radAngle + partInfo.placementAngle);
      // move part
      part.location = new go.Point(tool.centerPoint.x + offsetX, tool.centerPoint.y + offsetY);
      // rotate part
      part.rotateObject.angle = partInfo.rotationAngle + newangle;
    }
  });
}

/**
* This override needs to calculate the desired angle with different rotation points,
* depending on whether we are rotating the whole selection as one, or Parts individually.
* @this {RotateMultipleTool}
* @param {Point} newPoint in document coordinates
*/
RotateMultipleTool.prototype.computeRotate = function(newPoint) {
  var diagram = this.diagram;
  var angle;
  var e = diagram.lastInput;
  if (e.control || e.meta) {  // relative to the center of the Node whose handle we are rotating
    var part = this.adornedObject.part;
    var rotationPoint = part.getDocumentPoint(part.locationSpot);
    angle = rotationPoint.directionPoint(newPoint);
  } else {  // relative to the center of the whole selection
    angle = this.centerPoint.directionPoint(newPoint) - this.initialAngle;
  }
  if (angle >= 360) angle -= 360;
  else if (angle < 0) angle += 360;
  var interval = Math.min(Math.abs(this.snapAngleMultiple), 180);
  var epsilon = Math.min(Math.abs(this.snapAngleEpsilon), interval / 2);
  // if it's close to a multiple of INTERVAL degrees, make it exactly so
  if (!diagram.lastInput.shift && interval > 0 && epsilon > 0) {
    if (angle % interval < epsilon) {
      angle = Math.floor(angle / interval) * interval;
    } else if (angle % interval > interval - epsilon) {
      angle = (Math.floor(angle / interval) + 1) * interval;
    }
    if (angle >= 360) angle -= 360;
    else if (angle < 0) angle += 360;
  }
  return angle;
};
