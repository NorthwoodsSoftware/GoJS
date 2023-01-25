"use strict";
/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Link whose routing is parallel to other links connecting the same pair of ports

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends Link
* @class
* This custom Link class customizes its route to go parallel to other links connecting the same ports,
* if the link is not orthogonal and is not Bezier curved.
*/
function ParallelRouteLink() {
  go.Link.call(this);
}
go.Diagram.inherit(ParallelRouteLink, go.Link);

/**
* @this {ParallelRouteLink}
* @return {boolean}
*/
ParallelRouteLink.prototype.computePoints = function() {
  var result = go.Link.prototype.computePoints.call(this);
  if (!this.isOrthogonal && this.curve !== go.Link.Bezier && this.hasCurviness()) {
    var curv = this.computeCurviness();
    if (curv !== 0) {
      var num = this.pointsCount;
      var pidx = 0;
      var qidx = num-1;
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

      this.insertPointAt(pidx+1, px, py);
      this.insertPointAt(qidx+1, qx, qy);
    }
  }
  return result;
};
