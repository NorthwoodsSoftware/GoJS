"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Tool for moving a label on a Link

/**
* @constructor
* @extends Tool
* @class
* This tool only works when the Link has a label
* that is positioned at the Link.midPoint plus some offset.
* It does not work for labels that have a particular segmentIndex.
*/
export class LinkLabelDraggingTool extends go.Tool {
  /** @type {GraphObject} */
  public label: go.GraphObject = null;
  /** @type {Point} */
  private _offset: go.Point = new go.Point();  // of the mouse relative to the center of the label object
  /** @type {Point} */
  private _originalOffset: go.Point = null;

  constructor() {
    super();
    this.name = 'LinkLabelDragging';
  }

  /**
  * This tool can only start if the mouse has moved enough so that it is not a click,
  * and if the mouse down point is on a GraphObject "label" in a Link Panel,
  * as determined by findLabel().
  * @this {LinkLabelDraggingTool}
  * @return {boolean}
  */
  public canStart(): boolean {
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
  public findLabel(): go.GraphObject {
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
  public doActivate() {
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
  public doDeactivate() {
    go.Tool.prototype.doDeactivate.call(this);
    this.stopTransaction();
  }

  /**
  * Clear any reference to a label element.
  * @this {LinkLabelDraggingTool}
  */
  public doStop() {
    this.label = null;
    go.Tool.prototype.doStop.call(this);
  }

  /**
  * Restore the label's original value for GraphObject.segmentOffset.
  * @this {LinkLabelDraggingTool}
  */
  public doCancel() {
    if (this.label !== null) {
      this.label.segmentOffset = this._originalOffset;
    }
    go.Tool.prototype.doCancel.call(this);
  }

  /**
  * During the drag, call updateSegmentOffset in order to set
  * the GraphObject.segmentOffset of the label.
  * @this {LinkLabelDraggingTool}
  */
  public doMouseMove() {
    if (!this.isActive) return;
    this.updateSegmentOffset();
  }

  /**
  * At the end of the drag, update the segment offset of the label and finish the tool,
  * completing a transaction.
  * @this {LinkLabelDraggingTool}
  */
  public doMouseUp() {
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
  public updateSegmentOffset() {
    var lab = this.label;
    if (lab === null) return;
    var link = lab.part;
    if (!(link instanceof go.Link)) return;
    var last = this.diagram.lastInput.documentPoint;
    var idx = lab.segmentIndex;
    var numpts = link.pointsCount;
    // if the label is a "mid" label, assume it is positioned differently from a label at a particular segment
    if (idx < -numpts || idx >= numpts) {
      var mid = link.midPoint;
      // need to rotate this point to account for the angle of the link segment at the mid-point
      var p = new go.Point(last.x - this._offset.x - mid.x, last.y - this._offset.y - mid.y);
      lab.segmentOffset = p.rotate(-link.midAngle);
    } else {  // handle the label point being on a partiular segment with a given fraction
      var frac = lab.segmentFraction;
      var a, b;
      if (idx >= 0) {  // indexing forwards
        a = link.getPoint(idx);
        b = (idx < numpts - 1) ? link.getPoint(idx + 1) : a;
      } else {  // or backwards if segmentIndex is negative
        var i = numpts + idx;
        a = link.getPoint(i);
        b = (i > 0) ? link.getPoint(i - 1) : a;
      }
      var labx = a.x + (b.x - a.x) * frac;
      var laby = a.y + (b.y - a.y) * frac;
      var p = new go.Point(last.x - this._offset.x - labx, last.y - this._offset.y - laby);
      var segangle = (idx >= 0) ? a.directionPoint(b) : b.directionPoint(a);
      lab.segmentOffset = p.rotate(-segangle);
    }
  }

}

