"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Link whose routing is parallel to other links connecting the same pair of ports

/**
* @constructor
* @extends Link
* @class
* This custom Link class customizes its route to go parallel to other links connecting the same ports,
* if the link is not orthogonal and is not Bezier curved.
*/
export class ParallelRouteLink extends go.Link {
	/**
	* @this {ParallelRouteLink}
	* @return {boolean}
	*/
	public computePoints() {
		var result = super.computePoints.call(this);
		if (!this.isOrthogonal && this.curve !== go.Link.Bezier && this.hasCurviness()) {
			var curv = this.computeCurviness();
			if (curv !== 0) {
				var num = this.pointsCount;
				var pidx = 0;
				var qidx = num - 1;
				if (num >= 4) {
					pidx++;
					qidx--;
				}

				var frompt = this.getPoint(pidx);
				var topt = this.getPoint(qidx);
				var dx = topt.x - frompt.x;
				var dy = topt.y - frompt.y;

				var mx = frompt.x + dx * 1 / 8;
				var my = frompt.y + dy * 1 / 8;
				var px = mx;
				var py = my;
				if (-0.01 < dy && dy < 0.01) {
					if (dx > 0) py -= curv; else py += curv;
				} else {
					var slope = -dx / dy;
					var e = Math.sqrt(curv * curv / (slope * slope + 1));
					if (curv < 0) e = -e;
					px = (dy < 0 ? -1 : 1) * e + mx;
					py = slope * (px - mx) + my;
				}

				mx = frompt.x + dx * 7 / 8;
				my = frompt.y + dy * 7 / 8;
				var qx = mx;
				var qy = my;
				if (-0.01 < dy && dy < 0.01) {
					if (dx > 0) qy -= curv; else qy += curv;
				} else {
					var slope = -dx / dy;
					var e = Math.sqrt(curv * curv / (slope * slope + 1));
					if (curv < 0) e = -e;
					qx = (dy < 0 ? -1 : 1) * e + mx;
					qy = slope * (qx - mx) + my;
				}

				this.insertPointAt(pidx + 1, px, py);
				this.insertPointAt(qidx + 1, qx, qy);
			}
		}
		return result;
	};
}