"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom LinkReshapingTool that shows only a single reshape handle on a Bezier curved Link.
// Dragging that handle changes the value of {@link Link#curviness}.

/**
* @constructor
* @extends LinkReshapingTool
* @class
* This CurvedLinkReshapingTool class allows for a Link's path to be modified by the user
* via the dragging of a single tool handle at the middle of the link. 
*/
export class CurvedLinkReshapingTool extends go.LinkReshapingTool {
	/** @type {number} */
	private _originalCurviness: number = NaN;

  /**
  * @override
  * @this {CurvedLinkReshapingTool}
  * @param {Shape} pathshape
  * @return {Adornment}
  */
	public makeAdornment(pathshape: go.GraphObject) {
		var link = pathshape.part as go.Link;
		if (link !== null && link.curve === go.Link.Bezier && link.pointsCount === 4) {
			var adornment = new go.Adornment();
			adornment.type = go.Panel.Link;
			var h = this.makeHandle(pathshape, 0);
			this.setReshapingBehavior(h, go.LinkReshapingTool.All);
			h.cursor = 'move';
			adornment.add(h);
			adornment.category = this.name;
			adornment.adornedObject = pathshape;
			return adornment;
		} else {
			return this.makeAdornment.call(this, pathshape);
		}
	};

  /**
  * @override
  * @this {CurvedLinkReshapingTool}
  */
	public doActivate() {
		super.doActivate.call(this);
		this._originalCurviness = this.adornedLink.curviness;
	};

  /**
  * @override
  * @this {CurvedLinkReshapingTool}
  */
	public doCancel() {
		this.adornedLink.curviness = this._originalCurviness;
		super.doCancel.call(this);
	};

  /**
  * @override
  * @this {CurvedLinkReshapingTool}
  * @param {Point} newpt
  * @return {Point}
  */
	public reshape(newpt: go.Point): go.Point {
		var link = this.adornedLink;
		if (link !== null && link.curve === go.Link.Bezier && link.pointsCount === 4) {
			var start = link.getPoint(0);
			var end = link.getPoint(3);
			var ang = start.directionPoint(end);
			var mid = new go.Point((start.x + end.x) / 2, (start.y + end.y) / 2);
			var a = new go.Point(9999, 0).rotate(ang + 90).add(mid);
			var b = new go.Point(9999, 0).rotate(ang - 90).add(mid);
			var q = newpt.copy().projectOntoLineSegmentPoint(a, b);
			var curviness = Math.sqrt(mid.distanceSquaredPoint(q));
			if (link.fromPort === link.toPort) {
				if (newpt.y < link.fromPort.getDocumentPoint(go.Spot.Center).y) curviness = -curviness;
			} else {
				var diff = mid.directionPoint(q) - ang;
				if ((diff > 0 && diff < 180) || (diff < -180)) curviness = -curviness;
			}
			link.curviness = curviness;
			return q;
		} else {
			this.reshape.call(this, newpt);
		}
	}

}