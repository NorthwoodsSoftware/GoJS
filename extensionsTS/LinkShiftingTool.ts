"use strict"
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Tool for shifting the end point of a Link to be anywhere along the edges of the port.

/**
* This constructor produces a tool for shifting the end of a link;
* use it in a diagram.toolManager.mouseDownTools list:
* <pre>myDiagram.toolManager.mouseDownTools.add(new LinkShiftingTool());</pre>
* @constructor
* @extends Tool
* @class
*/

export class LinkShiftingTool extends go.Tool {
	// these are archetypes for the two shift handles, one at each end of the Link:
	/** @type {GraphObject} */
  private _fromHandleArchetype: go.GraphObject | null;

	/** @type {GraphObject} */
  private _toHandleArchetype: go.GraphObject | null;

	constructor() {
		super();
		const h: go.Shape = new go.Shape();
		h.geometryString = "F1 M0 0 L8 0 M8 4 L0 4";
		h.fill = null;
		h.stroke = "dodgerblue";
		h.background = "lightblue";
		h.cursor = "pointer";
		h.segmentIndex = 0;
		h.segmentFraction = 1;
		h.segmentOrientation = go.Link.OrientAlong;
		const g: go.Shape = new go.Shape();
		g.geometryString = "F1 M0 0 L8 0 M8 4 L0 4";
		g.fill = null;
		g.stroke = "dodgerblue";
		g.background = "lightblue";
		g.cursor = "pointer";
		g.segmentIndex = -1;
		g.segmentFraction = 1;
		g.segmentOrientation = go.Link.OrientAlong;

		this._fromHandleArchetype = h;
		this._toHandleArchetype = g;
	}

	public readonly name: string = "LinkShifting";

	// transient state
	/** @type {GraphObject} */
	private _handle: go.GraphObject | null = null;
	/** @type {List} */
	private _originalPoints: go.List<go.Point> | null;

  /*
  * A small GraphObject used as a shifting handle.
  * @name LinkShiftingTool#fromHandleArchetype 
  * @function.
  * @return {GraphObject}
  */
  get fromHandleArchetype(): go.GraphObject | null { return this._fromHandleArchetype; }
  set fromHandleArchetype(value: go.GraphObject | null) { this._fromHandleArchetype = value; }

  /*
  * A small GraphObject used as a shifting handle.
  * @name LinkShiftingTool#toHandleArchetype 
  * @function.
  * @return {GraphObject}
  */
  get toHandleArchetype(): go.GraphObject | null { return this._toHandleArchetype; }
  set toHandleArchetype(value: go.GraphObject | null) { this._toHandleArchetype = value; }

  /**
  * @this {LinkShiftingTool}
  * @param {Part} part
  */
	public updateAdornments(part: go.Part): void {
		if (part === null || !(part instanceof go.Link)) return;  // this tool only applies to Links
		var link: go.Link = part;
		// show handles if link is selected, remove them if no longer selected
		var category = "LinkShiftingFrom";
		var adornment = null;
		if (link.isSelected && !this.diagram.isReadOnly) {
			var selelt = link.selectionObject;
			if (selelt !== null && link.actualBounds.isReal() && link.isVisible() &&
				selelt.actualBounds.isReal() && selelt.isVisibleObject()) {
				var spot = (<any>link).computeSpot(true);
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
				var spot = (<any>link).computeSpot(false);
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
	public makeAdornment(selelt: go.GraphObject, toend: boolean): go.Adornment {
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
	public canStart(): boolean {
		if (!this.isEnabled) return false;
		var diagram = this.diagram;
		if (diagram.isReadOnly || diagram.isModelReadOnly) return false;
		if (!diagram.lastInput.left) return false;
		var h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingFrom");
		if (h === null) h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingTo");
		return (h !== null);
	}

  /**
  * @this {LinkShiftingTool}
  */
	public doActivate(): void {
		var diagram = this.diagram;
		var h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingFrom");
		if (h === null) h = this.findToolHandleAt(diagram.firstInput.documentPoint, "LinkShiftingTo");
		if (h === null) return;
		var ad = h.part as go.Adornment;
    if (ad === null || ad.adornedObject === null) return;
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
	public doDeactivate(): void {
		this.isActive = false;
		var diagram = this.diagram;
		diagram.isMouseCaptured = false;
		diagram.currentCursor = '';
		this.stopTransaction();
	};

  /**
  * Clean up tool state.
  * @this {LinkShiftingTool}
  */
	public doStop(): void {
		this._handle = null;
		this._originalPoints = null;
	};

  /**
  * Clean up tool state.
  * @this {LinkShiftingTool}
  */
	public doCancel(): void {
    if (this._handle !== null) {
		  var ad = this._handle.part as go.Adornment;
      if (ad.adornedObject === null) return;
		  var link = ad.adornedObject.part as go.Link;
		  if (this._originalPoints !== null) link.points = this._originalPoints;
    }
		this.stopTool();
	};

  /**
  * @this {LinkShiftingTool}
  */
	public doMouseMove(): void {
		if (this.isActive) {
			this.doReshape(this.diagram.lastInput.documentPoint);
		}
	};

  /**
  * @this {LinkShiftingTool}
  */
	public doMouseUp(): void {
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
	public doReshape(pt: go.Point): void {
    if (this._handle === null) return;
		var ad = this._handle.part as go.Adornment;
    if (ad.adornedObject === null) return;
		var link = ad.adornedObject.part as go.Link;
		var fromend = ad.category === "LinkShiftingFrom";
		var port = null;
		if (fromend) {
			port = link.fromPort;
		} else {
			port = link.toPort;
		}
    if (port === null) return;
    var portb = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
                            port.getDocumentPoint(go.Spot.BottomRight));
    var lp = link.getLinkPointFromPoint(port.part as go.Node, port, port.getDocumentPoint(go.Spot.Center), pt, fromend);
    var spot = new go.Spot((lp.x - portb.x) / (portb.width || 1), (lp.y - portb.y) / (portb.height || 1));
    if (fromend) {
      link.fromSpot = spot;
    } else {
      link.toSpot = spot;
    }
	};

}
