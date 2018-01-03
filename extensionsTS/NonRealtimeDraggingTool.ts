"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom DraggingTool for dragging an image instead of actually moving any selected nodes,
// until the mouse-up event.

/**
* @constructor
* @extends DraggingTool
* @class
*/
export class NonRealtimeDraggingTool extends go.DraggingTool {
	/** @type {Part} */
	private _imagePart: go.Part = null;  // a Part holding a translucent image of what would be dragged
	/** @type {Map.<Part,DraggingInfo>} */
	private _ghostDraggedParts: go.Map<go.Part, go.DraggingInfo> = null;  // a Map of the _imagePart and its dragging information
	/** @type {Map.<Part,DraggingInfo>} */
	private _originalDraggedParts: go.Map<go.Part, go.DraggingInfo> = null;  // the saved normal value of DraggingTool.draggedParts

  /**
	* Call the base method, and then make an image of the returned collection,
	* show it using a Picture, and hold the Picture in a temporary Part, as _imagePart.
	* @this {NonRealtimeDraggingTool}
	* @param {Iterable.<Part>} parts A {@link Set} or {@link List} of {@link Part}s.
	* @return {Map.<Part,DraggingInfo>}
	*/
	public computeEffectiveCollection(coll: go.Iterable<go.Part>): go.Map<go.Part, go.DraggingInfo> {
		var map = go.DraggingTool.prototype.computeEffectiveCollection.call(this, coll);
		if (this.isActive && this._imagePart === null) {
			var bounds = this.diagram.computePartsBounds(map.toKeySet());
			var offset = this.diagram.lastInput.documentPoint.copy().subtract(bounds.position);
			const $ = go.GraphObject.make;
			this._imagePart =
				$(go.Part,
					{ layerName: "Tool", opacity: 0.5, locationSpot: new go.Spot(0, 0, offset.x, offset.y) },
					$(go.Picture,
						{ element: this.diagram.makeImage({ parts: map.toKeySet() }) })
				);
		}
		return map;
	};

	/**
	* When activated, replace the DraggingTool.draggedParts with the _ghostDraggedParts, which
	* consists of just one Part, the _imagePart, added to the Diagram at the current mouse point.
	* @this {NonRealtimeDraggingTool}
	*/
	public doActivate() {
		go.DraggingTool.prototype.doActivate.call(this);
		if (this._imagePart !== null) {
			this._imagePart.location = this.diagram.lastInput.documentPoint;
			this.diagram.add(this._imagePart);
			this._originalDraggedParts = this.draggedParts;
			this._ghostDraggedParts = go.DraggingTool.prototype.computeEffectiveCollection.call(this,
				new go.List().addAll([this._imagePart]));
			this.draggedParts = this._ghostDraggedParts;
		}
	};

	/**
	* When deactivated, make sure any _imagePart is removed from the Diagram and all references are cleared out.
	* @this {NonRealtimeDraggingTool}
	*/
	public doDeactivate() {
		if (this._imagePart !== null) {
			this.diagram.remove(this._imagePart);
		}
		this._imagePart = null;
		this._ghostDraggedParts = null;
		this._originalDraggedParts = null;
		super.doDeactivate.call(this);
	};

	/**
	* Do the normal mouse-up behavior, but only after restoring DraggingTool.draggedParts.
	* @this {NonRealtimeDraggingTool}
	*/
	public doMouseUp() {
		if (this._originalDraggedParts !== null) {
			this.draggedParts = this._originalDraggedParts;
		}
		super.doMouseUp.call(this);
	};

	/**
	* If the user changes to "copying" mode by holding down the Control key,
	* return to the regular behavior and remove the _imagePart.
	* @this {NonRealtimeDraggingTool}
	*/
	public doKeyDown() {
		if (this._imagePart !== null && this._originalDraggedParts !== null &&
			(this.diagram.lastInput.control || this.diagram.lastInput.meta) && this.mayCopy()) {
			this.draggedParts = this._originalDraggedParts;
			this.diagram.remove(this._imagePart);
		}
		super.doKeyDown.call(this);
	};

	/**
	* If the user changes back to "moving" mode,
	* show the _imagePart again and go back to dragging the _ghostDraggedParts.
	* @this {NonRealtimeDraggingTool}
	*/
	public doKeyUp() {
		if (this._imagePart !== null && this._ghostDraggedParts !== null && this.mayMove()) {
			this._imagePart.location = this.diagram.lastInput.documentPoint;
			this.diagram.add(this._imagePart);
			this.draggedParts = this._ghostDraggedParts;
		}
		super.doKeyUp.call(this);
	};

}

