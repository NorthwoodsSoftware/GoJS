"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Tool for moving a label on a Node

/**
* @constructor
* @extends Tool
* @class
* This tool only works when the Node has a label (any GraphObject) marked with
* { _isNodeLabel: true } that is positioned in a Spot Panel.
* It works by modifying that label's GraphObject.alignment property to have an
* offset from the center of the panel.
*/
export class NodeLabelDraggingTool extends go.Tool {
	public readonly name = "NodeLabelDragging";

	/** @type {GraphObject} */
	public label: go.GraphObject = null;
	/** @type {Point} */
	private _offset: go.Point = new go.Point();  // of the mouse relative to the center of the label object
	/** @type {Spot} */
	private _originalAlignment: go.Spot = null;
	/** @type {Point} */
	private _originalCenter: go.Point = null;

  /**
* This tool can only start if the mouse has moved enough so that it is not a click,
* and if the mouse down point is on a GraphObject "label" in a Spot Panel,
* as determined by findLabel().
* @this {NodeLabelDraggingTool}
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
  * an object that has the "_isNodeLabel" property set to true, that is in a Spot Panel,
  * and that is not the first element of that Panel (i.e. not the main element of the panel).
  * @this {NodeLabelDraggingTool}
  * @return {GraphObject} This returns null if no such label is at the mouse down point.
  */
	public findLabel(): go.GraphObject {
		var diagram = this.diagram;
		var e = diagram.firstInput;
		var elt: any = diagram.findObjectAt(e.documentPoint, null, null);

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
	public doActivate() {
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
	public doDeactivate() {
		go.Tool.prototype.doDeactivate.call(this);
		this.stopTransaction();
	}

  /**
  * Clear any reference to a label element.
  * @this {NodeLabelDraggingTool}
  */
	public doStop() {
		this.label = null;
		go.Tool.prototype.doStop.call(this);
	}

  /**
  * Restore the label's original value for GraphObject.alignment.
  * @this {NodeLabelDraggingTool}
  */
	public doCancel() {
		if (this.label !== null) {
			this.label.alignment = this._originalAlignment;
		}
		go.Tool.prototype.doCancel.call(this);
	}

  /**
  * During the drag, call updateAlignment in order to set the GraphObject.alignment of the label.
  * @this {NodeLabelDraggingTool}
  */
	public doMouseMove() {
		if (!this.isActive) return;
		this.updateAlignment();
	}

  /**
  * At the end of the drag, update the alignment of the label and finish the tool,
  * completing a transaction.
  * @this {NodeLabelDraggingTool}
  */
	public doMouseUp() {
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
	public updateAlignment() {
		if (this.label === null) return;
		var last = this.diagram.lastInput.documentPoint;
		var cntr = this._originalCenter;
		this.label.alignment = new go.Spot(0.5, 0.5, last.x - this._offset.x - cntr.x, last.y - this._offset.y - cntr.y);
	}

}