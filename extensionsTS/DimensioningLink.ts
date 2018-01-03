"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom routed Link for showing the distances between a point on one node and a point on another node.

// Note that because this is a Link, the points being measured must be on Nodes, not simple Parts.
// The exact point on each Node is determined by the Link.fromSpot and Link.toSpot.

// Several properties of the DimensioningLink customize the appearance of the dimensioning:
// direction, for orientation of the dimension line and which side it is on,
// extension, for how far the dimension line is from the measured points,
// inset, for leaving room for a text label, and
// gap, for distance that the extension line starts from the measured points

/**
* @constructor
* @extends Link
* @class
*/
export class DimensioningLink extends go.Link {
	public isLayoutPositioned: boolean = false;
	public isTreeLink: boolean = false;
	public routing: go.EnumValue = go.Link.Orthogonal;
	/** @type {number} */
	private _direction: number = 0;
	/** @type {number} */
	private _extension: number = 30;
	/** @type {number} */
	private _inset: number = 10;
	/** @type {number} */
	private _gap: number = 10;

  /**
  * The general angle at which the measurement should be made.
  * The default value is 0, meaning to go measure only along the X axis,
  * with the dimension line and label above the two nodes (at lower Y coordinates).
  * New values must be one of: 0, 90, 180, 270, or NaN.
  * The value NaN indicates that the measurement is point-to-point and not orthogonal.
  * @name DimensioningLink#direction
  * @function.
  * @return {number}
  */
	get direction(): number { return this._direction }
	set direction(val: number) {
		if (isNaN(val) || val === 0 || val === 90 || val === 180 || val === 270) {
			this._direction = val;
		} else {
			throw new Error("DimensioningLink: invalid new direction: " + val);
		}
	}

  /** 
  * The distance at which the dimension line should be from the points being measured.
  * The default value is 30.
  * Larger values mean further away from the nodes.
  * The new value must be greater than or equal to zero.
  * @name DimensioningLink#extension
  * @function.
  * @return {number}
  */
	get extension(): number { return this._extension; }
	set extension(val: number) { this._extension = val; }

  /**
  * The distance that the dimension line should be "indented" from the ends of the
  * extension lines that are orthogonal to the dimension line.
  * The default value is 10.
  * @name DimensioningLink#inset
  * @function.
  * @return {number}
  */
	get inset(): number { return this._inset }
	set inset(val: number) {
		if (val >= 0) {
			this._inset = val;
		} else {
			throw new Error("DimensionLink: invalid new inset: " + val);
		}
	}

  /**
  * The distance that the extension lines should come short of the measured points.
  * The default value is 10.
  * @name DimensioningLink#gap
  * @function.
  * @return {number}
  */
	get gap(): number { return this._gap; }
	set gap(val: number) {
		if (val >= 0) {
			this._gap = val;
		} else {
			throw new Error("DimensionLink: invalid new gap: " + val);
		}
	}

  /**
  * @override
  * @return {boolean} true if it computed a route of points
  */
	public computePoints(): boolean {
		var fromnode = this.fromNode;
		if (!fromnode) return false;
		var fromport = this.fromPort;
		var fromspot = this.computeSpot(true);
		var tonode = this.toNode;
		if (!tonode) return false;
		var toport = this.toPort;
		var tospot = this.computeSpot(false);
		var frompoint = this.getLinkPoint(fromnode, fromport, fromspot, true, true, tonode, toport);
		if (!frompoint.isReal()) return false;
		var topoint = this.getLinkPoint(tonode, toport, tospot, false, true, fromnode, fromport);
		if (!topoint.isReal()) return false;

		this.clearPoints();

		var ang = this.direction;
		if (isNaN(ang)) {
			ang = frompoint.directionPoint(topoint);
			var p = new go.Point(this.extension, 0);
			p.rotate(ang + 90);
			var q = new go.Point(this.extension - this.inset, 0);
			q.rotate(ang + 90);
			var g = new go.Point(this.gap, 0);
			g.rotate(ang + 90);
			this.addPointAt(frompoint.x + g.x, frompoint.y + g.y);
			this.addPointAt(frompoint.x + p.x, frompoint.y + p.y);
			this.addPointAt(frompoint.x + q.x, frompoint.y + q.y);
			this.addPointAt(topoint.x + q.x, topoint.y + q.y);
			this.addPointAt(topoint.x + p.x, topoint.y + p.y);
			this.addPointAt(topoint.x + g.x, topoint.y + g.y);
		} else {
			var dist = this.extension;
			var r = 0.0;
			var s = 0.0;
			var t0 = 0.0;
			var t1 = 0.0;
			if (ang === 0 || ang === 180) {
				if (ang === 0) {
					r = Math.min(frompoint.y, topoint.y) - this.extension;
					s = r + this.inset;
					t0 = frompoint.y - this.gap;
					t1 = topoint.y - this.gap;
				} else {
					r = Math.max(frompoint.y, topoint.y) + this.extension;
					s = r - this.inset;
					t0 = frompoint.y + this.gap;
					t1 = topoint.y + this.gap;
				}
				this.addPointAt(frompoint.x, t0);
				this.addPointAt(frompoint.x + 0.01, r);
				this.addPointAt(frompoint.x, s);
				this.addPointAt(topoint.x, s);
				this.addPointAt(topoint.x - 0.01, r);
				this.addPointAt(topoint.x, t1);
			} else if (ang === 90 || ang === 270) {
				if (ang === 90) {
					r = Math.max(frompoint.x, topoint.x) + this.extension;
					s = r - this.inset;
					t0 = frompoint.x + this.gap;
					t1 = topoint.x + this.gap;
				} else {
					r = Math.min(frompoint.x, topoint.x) - this.extension;
					s = r + this.inset;
					t0 = frompoint.x - this.gap;
					t1 = topoint.x - this.gap;
				}
				this.addPointAt(t0, frompoint.y);
				this.addPointAt(r, frompoint.y + 0.01);
				this.addPointAt(s, frompoint.y);
				this.addPointAt(s, topoint.y);
				this.addPointAt(r, topoint.y - 0.01);
				this.addPointAt(t1, topoint.y);
			}
		}

		this.updateTargetBindings();
		return true;
	};

}