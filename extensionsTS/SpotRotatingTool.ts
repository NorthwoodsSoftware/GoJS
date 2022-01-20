/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go.js';

/**
* A custom RotatingTool that also supports the user moving the point about which the object is rotated.
*
* This tool uses two separate Adornments -- the regular one holding the rotation handle and an
* additional one named "MovingSpot" that holds the handle for interactively moving the
* {@link RotatingTool#rotationPoint} by changing the {@link Part#rotationSpot}.
* @category Tool Extension
*/
export class SpotRotatingTool extends go.RotatingTool {
  private _spotAdornmentTemplate: go.Adornment;
  private _originalRotationSpot: go.Spot = go.Spot.Default;

  public constructor() {
    super();
    const $ = go.GraphObject.make;
    this._spotAdornmentTemplate =
      $(go.Adornment, "Spot",
        { locationSpot: go.Spot.Center, cursor: "move" },
        $(go.Shape, "Circle",
          { fill: "lightblue", stroke: "dodgerblue", width: 10, height: 10 }),
        $(go.Shape, "Circle",
          { fill: "dodgerblue", strokeWidth: 0, width: 4, height: 4 })
      );
  }

  /**
   * In addition to updating the standard "Rotating" Adornment, this updates a "MovingSpot"
   * Adornment that the user may drag in order to move the {@link RotatingTool#rotationPoint}.
   * @param {Part} part
   */
  updateAdornments(part: go.Part): void {
    super.updateAdornments(part);
    if (part === null) return;
    if (part.isSelected && !this.diagram.isReadOnly) {
      const rotateObj = part.rotateObject;
      if (rotateObj !== null && part.canRotate() && part.actualBounds.isReal() &&
          part.isVisible() && rotateObj.actualBounds.isReal() && rotateObj.isVisibleObject()) {
        let ad = part.findAdornment("RotateSpot");
        if (ad === null || ad.adornedObject !== rotateObj) {
          ad = this._spotAdornmentTemplate.copy();
          ad.adornedObject = part.rotateObject;
        }
        if (ad !== null) {
          ad.location = this.computeRotationPoint(ad.adornedObject);
          part.addAdornment("RotateSpot", ad);
          return;
        }
      }
    }
    part.removeAdornment("RotateSpot");
  };

  /**
   * Change the positioning of the "Rotating" Adornment to adapt to the rotation point
   * potentially being well outside of the object being rotated.
   *
   * This assumes that {@link RotatingTool#handleAngle} is zero.
   * @param {GraphObject} obj the object being rotated
   * @returns Point in document coordinates
   */
  computeAdornmentLocation(obj: go.GraphObject): go.Point {
    let p = this.rotationPoint;
    if (!p.isReal()) p = this.computeRotationPoint(obj);
    const q = obj.getLocalPoint(p);
    //??? ignores this.handleAngle
    q.x = Math.max(obj.naturalBounds.right, q.x) + this.handleDistance;
    return obj.getDocumentPoint(q);
  }

  /**
   * In addition to the standard behavior of {@link RotatingTool#canStart},
   * also start when the user starts dragging the "MovingSpot" adornment/handle.
   * @returns boolean
   */
  canStart(): boolean {
    if (!this.isEnabled) return false;
    const diagram = this.diagram;
    if (diagram.isReadOnly) return false;
    if (!diagram.allowRotate) return false;
    if (!diagram.lastInput.left) return false;

    let h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    if (h !== null) return true;

    h = this.findToolHandleAt(diagram.firstInput.documentPoint, "RotateSpot");
    return (h !== null);
  }

  /**
   * @hidden @internal
   */
  doActivate(): void {
    // might be dragging the spot handle instead of the rotate handle
    this.handle = this.findToolHandleAt(this.diagram.firstInput.documentPoint, "RotateSpot");
    if (this.handle !== null) {
      const ad = this.handle.part as go.Adornment;
      if (ad.adornedObject !== null) {
        const part = ad.adornedPart;
        if (part !== null) this._originalRotationSpot = part.rotationSpot;
      }
    }
    // doActivate uses this.handle if it is set beforehand, rather than searching for a rotate handle
    super.doActivate();
  }

  /**
   * @hidden @internal
   */
  doCancel(): void {
    if (this.adornedObject !== null) {
      const part = this.adornedObject.part;
      if (part !== null) {
        part.rotationSpot = this._originalRotationSpot;
        this.rotationPoint.set(this.computeRotationPoint(this.adornedObject));
        this.updateAdornments(part);
      }
    }
    super.doCancel();
  }

  /**
   * @hidden @internal
   */
  doMouseMove(): void {
    if (this.isActive) {
      if (this.handle !== null && this.handle.part && this.handle.part.category === "RotateSpot") {
        // modify part.rotationSpot and this.rotationPoint
        this.shiftRotationPoint();
      } else {
        super.doMouseMove();
      }
    }
  }

  /**
   * @hidden @internal
   */
  doMouseUp(): void {
    if (this.isActive) {
      if (this.handle !== null && this.handle.part && this.handle.part.category === "RotateSpot") {
        // modify part.rotationSpot and this.rotationPoint
        this.shiftRotationPoint();
        this.transactionResult = "Shifted rotationSpot";
        this.stopTool();
      } else {
        super.doMouseUp();
      }
    }
  }

  /**
   * This is called by mouse moves and mouse up events when the handle being dragged is "MovingSpot".
   * This needs to update the {@link Part#rotationSpot} and {@link RotatingTool#rotationPoint} properties.
   *
   * For each of the X and Y directions, when the handle is within the bounds of the rotated object,
   * the new rotation Spot will be purely fractional; when it is outside the Spot will be limited to
   * a fraction of zero or one (whichever is closer) and an absolute offset that places the rotation point
   * where the handle is.
   * @expose
   */
  shiftRotationPoint(): void {
    const dp = this.diagram.lastInput.documentPoint;
    const obj = this.adornedObject;
    if (obj === null) return;
    const w = obj.naturalBounds.width || 1;  // disallow zero
    const h = obj.naturalBounds.height || 1;
    const part = obj.part;
    if (part === null) return;
    const op = obj.getLocalPoint(dp);
    const fx = (op.x < 0) ? 0 : (op.x > w ? 1 : op.x/w);
    const fy = (op.y < 0) ? 0 : (op.y > h ? 1 : op.y/h);
    const ox = (op.x < 0) ? op.x : (op.x > w ? op.x-w : 0);
    const oy = (op.y < 0) ? op.y : (op.y > h ? op.y-h : 0);
    part.rotationSpot = new go.Spot(fx, fy, ox, oy);
    this.rotationPoint.set(this.computeRotationPoint(obj));
    this.updateAdornments(part);
  }
}
