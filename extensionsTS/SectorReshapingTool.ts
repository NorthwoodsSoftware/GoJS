"use strict"
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

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
export class SectorReshapingTool extends go.Tool {
	constructor() {
		super();
	}
	public readonly name: string = "SectorReshaping";
	private _handle: go.GraphObject | null = null;
	private _originalRadius: number = 0;
	private _originalAngle: number = 0;
	private _originalSweep: number = 0;

	// these are the names of the data properties to read and write
	radiusProperty: string = "radius";
	angleProperty: string = "angle";
	sweepProperty: string = "sweep";

	/**
	* This tool can only start if Diagram.allowReshape is true and the mouse-down event
	* is at a tool handle created by this tool.
	* @override
	* @this {SectorReshapingTool}
	*/
  public canStart(): boolean {
		if (!this.isEnabled) return false;
		var diagram = this.diagram;
		if (diagram === null || diagram.isReadOnly) return false;
		if (!diagram.allowReshape) return false;
		var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
		return (h !== null);
	};

	/**
	* If the Part is selected, show two angle-changing tool handles and one radius-changing tool handle.
	* @override
	* @this {SectorReshapingTool}
	* @param {Part} part
	*/
	public updateAdornments(part: go.Part) {
		var data = part.data;
		if (part.isSelected && data !== null && this.diagram !== null && !this.diagram.isReadOnly) {
			var ad = part.findAdornment(this.name);
			if (ad === null) {
				const $ = go.GraphObject.make;
				ad =
					$(go.Adornment, "Spot",
						$(go.Placeholder),
						$(go.Shape, "Diamond",
							{ name: "RADIUS", fill: "lime", width: 10, height: 10, cursor: "move" },
							new go.Binding("alignment", "", (data) => {
								var angle = SectorReshapingTool.prototype.getAngle(data);
								var sweep = SectorReshapingTool.prototype.getSweep(data);
								var p = new go.Point(0.5, 0).rotate(angle + sweep / 2);
								return new go.Spot(0.5 + p.x, 0.5 + p.y);
							})),
						$(go.Shape, "Circle",
							{ name: "ANGLE", fill: "lime", width: 8, height: 8, cursor: "move" },
							new go.Binding("alignment", "", (data) => {
								var angle = SectorReshapingTool.prototype.getAngle(data);
								var p = new go.Point(0.5, 0).rotate(angle);
								return new go.Spot(0.5 + p.x, 0.5 + p.y);
							})),
						$(go.Shape, "Circle",
							{ name: "SWEEP", fill: "lime", width: 8, height: 8, cursor: "move" },
							new go.Binding("alignment", "", (data) => {
								var angle = SectorReshapingTool.prototype.getAngle(data);
								var sweep = SectorReshapingTool.prototype.getSweep(data);
								var p = new go.Point(0.5, 0).rotate(angle + sweep);
								return new go.Spot(0.5 + p.x, 0.5 + p.y);
							}))
					);
				ad.adornedObject = part.locationObject;
				part.addAdornment(this.name, ad);
			}
		} else {
			part.removeAdornment(this.name);
		}
	}

	/**
	* Remember the original angles and radius and start a transaction.
	* @override
	* @this {SectorReshapingTool}
	*/
	public doActivate() {
		var diagram = this.diagram;
		if (diagram === null) return;
		this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
		if (this._handle === null) return;
		var part = (this._handle.part as go.Adornment).adornedPart;
		if (part === null || part.data === null) return;

		var data = part.data;
		this._originalRadius = SectorReshapingTool.prototype.getRadius(data);
		this._originalAngle = SectorReshapingTool.prototype.getAngle(data);
		this._originalSweep = SectorReshapingTool.prototype.getSweep(data);

		this.startTransaction(this.name);
		this.isActive = true;
	}

	/**
	* Stop the transaction.
	* @override
	* @this {SectorReshapingTool}
	*/
	public doDeactivate() {
		this.stopTransaction();

		this._handle = null;
		this.isActive = false;
	};

	/**
	* Restore the original angles and radius and then stop this tool.
	* @override
	* @this {SectorReshapingTool}
	*/
	public doCancel() {
		if (this._handle !== null && this.diagram !== null) {
			var part = (this._handle.part as go.Adornment).adornedPart;
			if (part !== null) {
				var model = this.diagram.model;
				model.setDataProperty(part.data, this.radiusProperty, this._originalRadius);
				model.setDataProperty(part.data, this.angleProperty, this._originalAngle);
				model.setDataProperty(part.data, this.sweepProperty, this._originalSweep);
			}
		}
		this.stopTool();
	};

	/**
	* Depending on the current handle being dragged, update the "radius", the "angle", or the "sweep"
	* properties on the model data.
	* Those property names are currently parameterized as static members of SectorReshapingTool.
	* @override
	* @this {SectorReshapingTool}
	*/
	public doMouseMove() {
		var diagram = this.diagram;
    var h = this._handle;
		if (this.isActive && diagram !== null && h !== null) {
			var center = (h.part as go.Adornment).adornedObject.getDocumentPoint(go.Spot.Center);
			var node = (h.part as go.Adornment).adornedPart;
			var mouse = diagram.lastInput.documentPoint;
			if (h.name === "RADIUS") {
				var dst = Math.sqrt(center.distanceSquaredPoint(mouse));
				diagram.model.setDataProperty(node.data, this.radiusProperty, dst);
			} else if (h.name === "ANGLE") {
				var dir = center.directionPoint(mouse);
				diagram.model.setDataProperty(node.data, this.angleProperty, dir);
			} else if (h.name === "SWEEP") {
				var dir = center.directionPoint(mouse);
				var ang = SectorReshapingTool.prototype.getAngle(node.data);
				var swp = (dir - ang + 360) % 360;
				diagram.model.setDataProperty(node.data, this.sweepProperty, swp);
			}
		}
	};

	/**
	* Finish the transaction and stop the tool.
	* @override
	* @this {SectorReshapingTool}
	*/
	public doMouseUp() {
		var diagram = this.diagram;
		if (this.isActive && diagram !== null) {
			this.transactionResult = this.name;  // successful finish
		}
		this.stopTool();
	};

	// static functions for getting data
	public getRadius(data: Object): number {
		var radius = (<any>data)["radius"];
		if (!(typeof radius === "number") || isNaN(radius) || radius <= 0)
			radius = 50;
		return radius;
	}

	public getAngle(data: Object): number {
		var angle = (<any>data)["angle"];
		if (!(typeof angle === "number") || isNaN(angle))
			angle = 0;
		else angle = angle % 360;
		return angle;
	}

	public getSweep(data: Object): number {
		var sweep = (<any>data)["sweep"];
		if (!(typeof sweep === "number") || isNaN(sweep))
			sweep = 360;
		return sweep;
	}
}