"use strict";
/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends RotatingTool
* @class
* A custom RotatingTool that also supports the user moving the point about which the object is rotated.
*
* This tool uses two separate Adornments -- the regular one holding the rotation handle and an
* additional one named "MovingSpot" that holds the handle for interactively moving the
* {@link RotatingTool#rotationPoint} by changing the {@link Part#rotationSpot}.
*/
function SpotRotatingTool() {
  go.RotatingTool.call(this);
  var $ = go.GraphObject.make;
  this._spotAdornmentTemplate =
    $(go.Adornment, "Spot",
      { locationSpot: go.Spot.Center, cursor: "move" },
      $(go.Shape, "Circle",
        { fill: "lightblue", stroke: "dodgerblue", width: 10, height: 10 }),
      $(go.Shape, "Circle",
        { fill: "dodgerblue", strokeWidth: 0, width: 4, height: 4 })
    );
  this._originalRotationSpot = go.Spot.Default;
}
go.Diagram.inherit(SpotRotatingTool, go.RotatingTool);

/**
 * In addition to updating the standard "Rotating" Adornment, this updates a "MovingSpot"
 * Adornment that the user may drag in order to move the {@link RotatingTool#rotationPoint}.
 * @this {SpotRotatingTool}
 * @param {*} part 
 */
SpotRotatingTool.prototype.updateAdornments = function(part) {
  go.RotatingTool.prototype.updateAdornments.call(this, part);
  if (part === null) return;
  if (part.isSelected && !this.diagram.isReadOnly) {
    var rotateObj = part.rotateObject;
    if (rotateObj !== null && part.canRotate() && part.actualBounds.isReal() &&
        part.isVisible() && rotateObj.actualBounds.isReal() && rotateObj.isVisibleObject()) {
      var ad = part.findAdornment("MovingSpot");
      if (ad === null || ad.adornedObject !== rotateObj) {
        ad = this._spotAdornmentTemplate.copy();
        ad.adornedObject = part.rotateObject;
      }
      if (ad !== null) {
        ad.location = this.computeRotationPoint(ad.adornedObject);
        part.addAdornment("MovingSpot", ad);
        return;
      }
    }
  }
  part.removeAdornment("MovingSpot");
};

/**
 * Change the positioning of the "Rotating" Adornment to adapt to the rotation point
 * potentially being well outside of the object being rotated.
 * 
 * This assumes that {@link RotatingTool@handleAngle} is zero.
 * @this {SpotRotatingTool}
 * @param {*} obj the object being rotated
 * @returns Point in document coordinates
 */
SpotRotatingTool.prototype.computeAdornmentLocation = function(obj) {
  var p = this.rotationPoint;
  if (!p.isReal()) p = this.computeRotationPoint(obj);
  var q = obj.getLocalPoint(p);
  //??? ignores this.handleAngle
  q.x = Math.max(obj.naturalBounds.right, q.x) + this.handleDistance;
  return obj.getDocumentPoint(q);
}

/**
 * In addition to the standard behavior of {@link RotatingTool#canStart},
 * also start when the user starts dragging the "MovingSpot" adornment/handle.
 * @this {SpotRotatingTool}
 * @returns boolean
 */
SpotRotatingTool.prototype.canStart = function() {
  if (!this.isEnabled) return false;
  var diagram = this.diagram;
  if (diagram.isReadOnly) return false;
  if (!diagram.allowRotate) return false;
  if (!diagram.lastInput.left) return false;

  var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
  if (h !== null) return true;

  h = this.findToolHandleAt(diagram.firstInput.documentPoint, "MovingSpot");
  return (h !== null);
}

/**
 * @hidden @internal
 */
SpotRotatingTool.prototype.doActivate = function() {
  // might be dragging the spot handle instead of the rotate handle
  this.handle = this.findToolHandleAt(this.diagram.firstInput.documentPoint, "MovingSpot");
  if (this.handle !== null) {
    var ad = this.handle.part;
    if (ad.adornedObject !== null) this._originalRotationSpot = ad.adornedPart.rotationSpot;
  }
  // doActivate uses this.handle if it is set beforehand, rather than searching for a rotate handle
  go.RotatingTool.prototype.doActivate.call(this);
}
  
/**
 * @hidden @internal
 */
 SpotRotatingTool.prototype.doCancel = function() {
  if (this.adornedObject !== null) {
    this.adornedObject.part.rotationSpot = this._originalRotationSpot;
    this.rotationPoint.set(this.computeRotationPoint(this.adornedObject));
    this.updateAdornments(this.adornedObject.part);
  }
  go.RotatingTool.prototype.doCancel.call(this);
}

/**
 * @hidden @internal
 */
 SpotRotatingTool.prototype.doMouseMove = function() {
  if (this.isActive) {
    if (this.handle !== null && this.handle.part.category === "MovingSpot") {
      // modify part.rotationSpot and this.rotationPoint
      this.shiftRotationPoint();
    } else {
      go.RotatingTool.prototype.doMouseMove.call(this);
    }
  }
}

/**
 * @hidden @internal
 */
 SpotRotatingTool.prototype.doMouseUp = function() {
  if (this.isActive) {
    if (this.handle !== null && this.handle.part.category === "MovingSpot") {
      // modify part.rotationSpot and this.rotationPoint
      this.shiftRotationPoint();
      this.transactionResult = "SpotShifted";
      this.stopTool();
    } else {
      go.RotatingTool.prototype.doMouseUp.call(this);
    }
  }
}

/**
 * This is called by mouse moves and mouse up events when the handle being dragged is "MovingSpot".
 * This needs to update the {@link Part#rotationSpot} and {@link RotatingTool.rotationPoint} properties.
 * 
 * For each of the X and Y directions, when the handle is within the bounds of the rotated object,
 * the new rotation Spot will be purely fractional; when it is outside the Spot will be limited to
 * a fraction of zero or one (whichever is closer) and an absolute offset that places the rotation point
 * where the handle is.
 * @expose
 * @this {SpotRotatingTool}
 */
SpotRotatingTool.prototype.shiftRotationPoint = function() {
  var dp = this.diagram.lastInput.documentPoint;
  var obj = this.adornedObject;
  var w = obj.naturalBounds.width || 1;  // disallow zero
  var h = obj.naturalBounds.height || 1;
  var part = obj.part;
  var op = obj.getLocalPoint(dp);
  var fx = (op.x < 0) ? 0 : (op.x > w ? 1 : op.x/w);
  var fy = (op.y < 0) ? 0 : (op.y > h ? 1 : op.y/h);
  var ox = (op.x < 0) ? op.x : (op.x > w ? op.x-w : 0);
  var oy = (op.y < 0) ? op.y : (op.y > h ? op.y-h : 0);
  part.rotationSpot = new go.Spot(fx, fy, ox, oy);
  this.rotationPoint.set(this.computeRotationPoint(obj));
  this.updateAdornments(part);
}
