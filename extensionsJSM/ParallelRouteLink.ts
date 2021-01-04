/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go-module.js';

/**
 * This custom {@link Link} class customizes its route to go parallel to other links connecting the same ports,
 * if the link is not orthogonal and is not Bezier curved.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/ParallelRoute.html">Parallel Route Links</a> sample.
 * @category Part Extension
 */
export class ParallelRouteLink extends go.Link {
  /**
   * Constructs the link's route by modifying {@link #points}.
   * @return {boolean} true if it computed a route of points
   */
  public computePoints(): boolean {
    const result = super.computePoints();
    if (!this.isOrthogonal && this.curve !== go.Link.Bezier && this.hasCurviness()) {
      const curv = this.computeCurviness();
      if (curv !== 0) {
        const num = this.pointsCount;
        let pidx = 0;
        let qidx = num - 1;
        if (num >= 4) {
          pidx++;
          qidx--;
        }

        const frompt = this.getPoint(pidx);
        const topt = this.getPoint(qidx);
        const dx = topt.x - frompt.x;
        const dy = topt.y - frompt.y;

        let mx = frompt.x + dx * 1 / 8;
        let my = frompt.y + dy * 1 / 8;
        let px = mx;
        let py = my;
        if (-0.01 < dy && dy < 0.01) {
          if (dx > 0) py -= curv; else py += curv;
        } else {
          const slope = -dx / dy;
          let e = Math.sqrt(curv * curv / (slope * slope + 1));
          if (curv < 0) e = -e;
          px = (dy < 0 ? -1 : 1) * e + mx;
          py = slope * (px - mx) + my;
        }

        mx = frompt.x + dx * 7 / 8;
        my = frompt.y + dy * 7 / 8;
        let qx = mx;
        let qy = my;
        if (-0.01 < dy && dy < 0.01) {
          if (dx > 0) qy -= curv; else qy += curv;
        } else {
          const slope = -dx / dy;
          let e = Math.sqrt(curv * curv / (slope * slope + 1));
          if (curv < 0) e = -e;
          qx = (dy < 0 ? -1 : 1) * e + mx;
          qy = slope * (qx - mx) + my;
        }

        this.insertPointAt(pidx + 1, px, py);
        this.insertPointAt(qidx + 1, qx, qy);
      }
    }
    return result;
  }
}
