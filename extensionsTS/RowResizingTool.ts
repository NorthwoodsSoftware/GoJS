"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Tool for resizing each row of a named Table Panel in a selected Part.

/**
* @constructor
* @extends Tool
* @class
*/

export class RowResizingTool extends go.Tool {
	/** @type {GraphObject} */
	private _handleArchetype: go.GraphObject;

	constructor() {
		super();
		const h: go.Shape = new go.Shape;
		h.geometryString = "M0 0 H14 M0 2 H14";
		h.desiredSize = new go.Size(14, 2);
		h.cursor = "row-resize";
		h.geometryStretch = go.GraphObject.None;
		h.background = "rgba(255,255,255,0.5)";
		h.stroke = "rgba(30,144,255,0.5)";

		this._handleArchetype = h;
		this.name = "RowResizing";
	}

	/** @type {string} */
	private _tableName: string = "TABLE";

	// internal state
	/** @type {GraphObject} */
	private _handle: go.GraphObject = null;
	/** @type {Panel} */
	private _adornedTable: go.Panel = null;

  /*
  * A small GraphObject used as a resize handle for each row.
  * This tool expects that this object's {@link GraphObject#desiredSize} (a.k.a width and height) has been set to real numbers.
  * @name RowResizingTool#handleArchetype
  * @function.
  * @return {GraphObject}
  */
	get handleArchetype(): go.GraphObject { return this._handleArchetype; }
	set handleArchetype(val: go.GraphObject) { this._handleArchetype = val; }

  /*
  * The name of the Table Panel to be resized, by default the name "TABLE".
  * @name RowResizingTool#tableName
  * @function.
  * @return {string}
  */
	get tableName(): string { return this._tableName; }
	set tableName(val: string) { this._tableName = val; }

  /*
  * This read-only property returns the {@link GraphObject} that is the tool handle being dragged by the user.
  * This will be contained by an {@link Adornment} whose category is "RowResizing".
  * Its {@link Adornment#adornedObject} is the same as the {@link #adornedTable}.
  * @name RowResizingTool#handle
  * @function.
  * @return {GraphObject}
  */
	get handle(): go.GraphObject { return this._handle; }

  /*
  * Gets the {@link Panel} of type {@link Panel#Table} whose rows may be resized.
  * This must be contained within the selected Part.
  * @name RowResizingTool#adornedTable
  * @function.
  * @return {Panel}
  */
	get adornedTable(): go.Panel { return this._adornedTable; }


  /**
  * Show an {@link Adornment} with a resize handle at each row.
  * Don't show anything if {@link #tableName} doesn't identify a {@link Panel}
  * that has a {@link Panel#type} of type {@link Panel#Table}.
  * @this {RowResizingTool}
  * @param {Part} part the part.
  */
	public updateAdornments(part: go.Part) {
		if (part === null || part instanceof go.Link) return;  // this tool never applies to Links
		if (part.isSelected && !this.diagram.isReadOnly) {
			var selelt = part.findObject(this.tableName);
			if (selelt instanceof go.Panel && selelt.actualBounds.isReal() && selelt.isVisibleObject() &&
				part.actualBounds.isReal() && part.isVisible() &&
				selelt.type === go.Panel.Table) {
				var table = selelt;
				var adornment = part.findAdornment(this.name);
				if (adornment === null) {
					adornment = this.makeAdornment(table);
					part.addAdornment(this.name, adornment);
				}
				if (adornment !== null) {
					var pad = table.padding as go.Margin;
					var numrows = table.rowCount;
					// update the position/alignment of each handle
					adornment.elements.each((h) => {
						if (!h.pickable) return;
						var rowdef = table.getRowDefinition(h.row);
						var hgt = rowdef.actual;
						if (hgt > 0) hgt = rowdef.total;
						var sep = 0;
						// find next non-zero-height row's separatorStrokeWidth
						var idx = h.row + 1;
						while (idx < numrows && table.getRowDefinition(idx).actual === 0) idx++;
						if (idx < numrows) {
							sep = table.getRowDefinition(idx).separatorStrokeWidth;
							if (isNaN(sep)) sep = table.defaultRowSeparatorStrokeWidth;
						}
						h.alignment = new go.Spot(0, 0, pad.left + h.width / 2, pad.top + rowdef.position + hgt + sep / 2);
					});
					adornment.locationObject.desiredSize = table.actualBounds.size;
					adornment.location = table.getDocumentPoint(adornment.locationSpot);
					adornment.angle = table.getDocumentAngle();
					return;
				}
			}
		}
		part.removeAdornment(this.name);
	};

  /**
  * @this {RowResizingTool}
  * @param {Panel} table the Table Panel whose rows may be resized
  * @return {Adornment}
  */
	public makeAdornment(table: go.Panel): go.Adornment {
		// the Adornment is a Spot Panel holding resize handles
		var adornment = new go.Adornment();
		adornment.category = this.name;
		adornment.adornedObject = table;
		adornment.type = go.Panel.Spot;
		adornment.locationObjectName = "BLOCK";
		// create the "main" element of the Spot Panel
		var block = new go.TextBlock();  // doesn't matter much what this is
		block.name = "BLOCK";
		block.pickable = false;  // it's transparent and not pickable
		adornment.add(block);
		// now add resize handles for each row
		for (var i = 0; i < table.rowCount; i++) {
			var rowdef = table.getRowDefinition(i);
			adornment.add(this.makeHandle(table, rowdef));
		}
		return adornment;
	};

  /**
  * @this {RowResizingTool}
  * @param {Panel} table the Table Panel whose rows may be resized
  * @param {RowColumnDefinition} rowdef the row definition to be resized
  * @return a copy of the {@link #handleArchetype}
  */
	public makeHandle(table: go.Panel, rowdef: go.RowColumnDefinition): go.GraphObject {
		var h = this.handleArchetype;
		if (h === null) return null;
		var c = h.copy();
		c.row = rowdef.index;
		return c;
	};


  /**
  * This predicate is true when there is a resize handle at the mouse down point.
  * @this {RowResizingTool}
  * @return {boolean}
  */
	public canStart(): boolean {
		if (!this.isEnabled) return false;

		var diagram = this.diagram;
		if (diagram === null || diagram.isReadOnly) return false;
		if (!diagram.lastInput.left) return false;
		var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
		return (h !== null);
	};

  /**
  * @this {RowResizingTool}
  */
	public doActivate() {
		var diagram = this.diagram;
		if (diagram === null) return;
		this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
		if (this.handle === null) return;
		var panel = (this.handle.part as go.Adornment).adornedObject as go.Adornment;
		if (!panel || panel.type !== go.Panel.Table) return;
		this._adornedTable = panel;
		diagram.isMouseCaptured = true;
		this.startTransaction(this.name);
		this.isActive = true;
	};

  /**
  * @this {RowResizingTool}
  */
	public doDeactivate() {
		this.stopTransaction();
		this._handle = null;
		this._adornedTable = null;
		var diagram = this.diagram;
		if (diagram !== null) diagram.isMouseCaptured = false;
		this.isActive = false;
	};

  /**
  * @this {RowResizingTool}
  */
	public doMouseMove() {
		var diagram = this.diagram;
		if (this.isActive && diagram !== null) {
			var newpt = this.computeResize(diagram.lastInput.documentPoint);
			this.resize(newpt);
		}
	};

  /**
  * @this {RowResizingTool}
  */
	public doMouseUp() {
		var diagram = this.diagram;
		if (this.isActive && diagram !== null) {
			var newpt = this.computeResize(diagram.lastInput.documentPoint);
			this.resize(newpt);
			this.transactionResult = this.name;  // success
		}
		this.stopTool();
	};

  /**
  * This should change the {@link RowRowDefinition#height} of the row being resized
  * to a value corresponding to the given mouse point.
  * @expose
  * @this {RowResizingTool}
  * @param {Point} newPoint the value of the call to {@link #computeResize}.
  */
	public resize(newPoint: go.Point) {
		var table = this.adornedTable;
		var pad = table.padding as go.Margin;
		var numrows = table.rowCount;
		var locpt = table.getLocalPoint(newPoint);
		var h = this.handle;
		var rowdef = table.getRowDefinition(h.row);
		var sep = 0;
		var idx = h.row + 1;
		while (idx < numrows && table.getRowDefinition(idx).actual === 0) idx++;
		if (idx < numrows) {
			sep = table.getRowDefinition(idx).separatorStrokeWidth;
			if (isNaN(sep)) sep = table.defaultRowSeparatorStrokeWidth;
		}
		rowdef.height = Math.max(0, locpt.y - pad.top - rowdef.position - (rowdef.total - rowdef.actual) - sep / 2);
	};


  /**
  * This can be overridden in order to customize the resizing process.
  * @expose
  * @this {RowResizingTool}
  * @param {Point} p the point where the handle is being dragged.
  * @return {Point}
  */
	public computeResize(p: go.Point): go.Point {
		return p;
	};

  /**
  * Pressing the Delete key removes any row width setting and stops this tool.
  * @this {RowResizingTool}
  */
	public doKeyDown() {
		if (!this.isActive) return;
		var e = this.diagram.lastInput;
		if (e.key === 'Del' || e.key === '\t') {  // remove height setting
			var rowdef = this.adornedTable.getRowDefinition(this.handle.row);
			rowdef.height = NaN;
			this.transactionResult = this.name;  // success
			this.stopTool();
		} else {
			super.doKeyDown.call(this);
		}
	};

}