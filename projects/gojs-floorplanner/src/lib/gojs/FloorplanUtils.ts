/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Floorplan } from './Floorplan';
import go from 'gojs';
import type { WallReshapingTool } from './WallReshapingTool';

/**
 * Static utils that do not need any floorplan instance
 */
export abstract class fpUtils {
  /**
   * Tells whether a point is in a wall's geometry.
   * @param {go.Group} w
   * @param {go.Point} p
   * @return {boolean}
   */
  public static isPointInWall(w: go.Group, p: go.Point): boolean {
    const orderedPoints: Array<go.Point> = [
      w.data.startpoint,
      w.data.smpt1,
      w.data.empt1,
      w.data.endpoint,
      w.data.empt2,
      w.data.smpt2,
      w.data.startpoint
    ];
    return fpUtils.isPointInPolygon(orderedPoints, p);
  }

  /**
   * Return whether or not a given point is inside a given polygon
   * @param {Array<go.Point>} vs An ordered Array of polygon vertices
   * @param {go.Point} point The point to check
   * @return {boolean}
   */
  public static isPointInPolygon(vs: Array<go.Point>, point: go.Point): boolean {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    const x: number = point.x;
    const y: number = point.y;
    let inside: boolean = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi: number = vs[i].x;
      const yi: number = vs[i].y;
      const xj: number = vs[j].x;
      const yj: number = vs[j].y;

      const intersect: boolean = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  /**
   * Tells whether a point is in a room's geometry
   * @param {go.Node} r room node
   * @param {go.Point} p point to check
   * @return {boolean}
   */
  public static isPointInRoom(r: go.Node, p: go.Point, fp: Floorplan): boolean {
    if (r === null || r === undefined || !(r instanceof go.Node) || r.data.category !== 'Room')
      return false;
    const polygon: go.List<go.Point> | null = fpUtils.makePolygonFromRoomBoundaries(
      r.data.boundaryWalls,
      fp
    );
    if (polygon !== null) {
      const polyArr = polygon.toArray();
      const isInRoom: boolean = fpUtils.isPointInPolygon(polyArr, p);
      return isInRoom;
    }
    return false;
  }

  /**
   * Returns an ordered List of Points that represents the polygon of a room, given a room's boundaryWalls array
   * @param {Array<any>} path -- a specially formatted array, where entries are 2 entry arrays [wall, mitering side]
   * This type of structure is used for a room's "boundaryWalls" data property
   * @return {go.List<go.Point> | null}
   */
  public static makePolygonFromRoomBoundaries(
    path: Array<any>,
    fp: Floorplan
  ): go.List<go.Point> | null {
    const polygon: go.List<go.Point> = new go.List<go.Point>();

    const boundaryWalls: Array<any> = path;
    if (boundaryWalls === null || boundaryWalls.length < 2) {
      return null;
    }
    const firstWallKey: string = boundaryWalls[0][0];
    const firstWall: go.Group = fp.findNodeForKey(firstWallKey) as go.Group;
    const firstSide: number = boundaryWalls[0][1];

    const secondWallKey: string = boundaryWalls[1][0];
    const secondWall: go.Group = fp.findNodeForKey(secondWallKey) as go.Group;

    if (firstWall === null || secondWall === null) {
      return null;
    }

    // find where first and second wall meet
    // if that's near firstWall's smpt[side] pt, start with empt[side] pt; else, vice versa (i.e. pick the farthest pt)
    const ip: go.Point | null = fp.getWallsIntersection(firstWall, secondWall);
    if (ip === null) return null;
    const propS: string = 'smpt' + firstSide;
    const propE: string = 'empt' + firstSide;
    const ptS: go.Point = firstWall.data[propS];
    const ptE: go.Point = firstWall.data[propE];

    const distS: number = Math.sqrt(ip.distanceSquaredPoint(ptS));
    const distE: number = Math.sqrt(ip.distanceSquaredPoint(ptE));
    const closestPt: go.Point = distS < distE ? ptS : ptE;
    const farthestPt: go.Point = closestPt.equals(ptS) ? ptE : ptS;

    polygon.add(farthestPt);
    polygon.add(closestPt);

    let prevPt: go.Point = closestPt;
    for (let i: number = 0; i < boundaryWalls.length; i++) {
      const entry = boundaryWalls[i];
      if (typeof entry === 'string') continue;
      const wk: string = entry[0];
      const w: go.Group = fp.findNodeForKey(wk) as go.Group;
      if (w === null) {
        return null;
      }
      const s: number = entry[1];
      if (w.data.key !== firstWall.data.key) {
        const propS1: string = 'smpt' + s;
        const propE1: string = 'empt' + s;
        const ptS1: go.Point = w.data[propS1];
        const ptE1: go.Point = w.data[propE1];
        const distS1: number = Math.sqrt(prevPt.distanceSquaredPoint(ptS1));
        const distE1: number = Math.sqrt(prevPt.distanceSquaredPoint(ptE1));

        const closestPt1: go.Point = distS1 < distE1 ? ptS1 : ptE1;
        const farthestPt1: go.Point = closestPt1.equals(ptS1) ? ptE1 : ptS1;

        polygon.add(closestPt1);
        polygon.add(farthestPt1);
        prevPt = farthestPt1;
      }
    }

    return polygon;
  }

  /**
   * Used to a/b sort walls in a clockwise order
   * @param {go.Group} a wall a
   * @param {go.Group} b wall b
   * @return {number}
   */
  public static sortWallsClockwise(a: go.Group, b: go.Group, fp: Floorplan): number {
    const wrt = fp.toolManager.findTool('WallReshaping') as WallReshapingTool;
    const B: go.Point | null = fp.getWallsIntersection(a, b);
    if (B === null) {
      return 0;
    }
    const as: go.Point = a.data.startpoint;
    const ae: go.Point = a.data.endpoint;
    const bs: go.Point = b.data.startpoint;
    const be: go.Point = b.data.endpoint;
    const ip: go.Point | null = fp.getSegmentsIntersection(as, ae, bs, be);
    if (ip === null) {
      return 0;
    }
    const A: go.Point = wrt.pointsApproximatelyEqual(ip, as) ? ae : as;
    const C: go.Point = wrt.pointsApproximatelyEqual(ip, bs) ? be : bs;

    const angA: number = B.directionPoint(A);
    const angB: number = B.directionPoint(C);
    if (angA > angB) return 1;
    else if (angA < angB) return -1;
    else return 0;
  }
}
