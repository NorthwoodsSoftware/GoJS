/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go-module.js';

/**
 * The RotateMultipleTool class lets the user rotate multiple objects at a time.
 * When more than one part is selected, rotates all parts, revolving them about their collective center.
 * If the control key is held down during rotation, rotates all parts individually.
 *
 * Caution: this only works for Groups that do *not* have a Placeholder.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/RotateMultiple.html">Rotate Multiple</a> sample.
 * @category Tool Extension
 */
export class RotateMultipleTool extends go.RotatingTool {
  /**
   * Holds references to all selected non-Link Parts and their offset & angles
   */
  public initialInfo: go.Map<go.Part, PartInfo> | null = null;
  /**
   * Initial angle when rotating as a whole
   */
  public initialAngle: number = 0;
  /**
   * Rotation point of selection
   */
  public centerPoint: go.Point = new go.Point();

  /**
   * Constructs a RotateMultipleTool and sets the name for the tool.
   */
  constructor() {
    super();
    this.name = 'RotateMultiple';
  }

  /**
   * Calls {@link RotatingTool#doActivate}, and then remembers the center point of the collection,
   * and the initial distances and angles of selected parts to the center.
   */
  public doActivate(): void {
    super.doActivate();
    const diagram = this.diagram;
    // center point of the collection
    this.centerPoint = diagram.computePartsBounds(diagram.selection).center;

    // remember the angle relative to the center point when rotating the whole collection
    this.initialAngle = this.centerPoint.directionPoint(diagram.lastInput.documentPoint);

    // remember initial angle and distance for each Part
    const infos = new go.Map<go.Part, PartInfo>();
    const tool = this;
    diagram.selection.each(function(part) {
      tool.walkTree(part, infos);
    });
    this.initialInfo = infos;
  }

  /**
   * @hidden @internal
   */
  private walkTree(part: go.Part, infos: go.Map<go.Part, PartInfo>): void {
    if (part === null || part instanceof go.Link) return;
    // distance from centerPoint to locationSpot of part
    const dist = Math.sqrt(this.centerPoint.distanceSquaredPoint(part.location));
    // calculate initial relative angle
    const dir = this.centerPoint.directionPoint(part.location);
    // saves part-angle combination in array
    infos.add(part, new PartInfo(dir, dist, part.rotateObject.angle));
    // recurse into Groups
    if (part instanceof go.Group) {
      const it = part.memberParts.iterator;
      while (it.next()) this.walkTree(it.value, infos);
    }
  }

  /**
   * Clean up any references to Parts.
   */
  public doDeactivate(): void {
    this.initialInfo = null;
    super.doDeactivate();
  }

  /**
   * Rotate all selected objects about their collective center.
   * When the control key is held down while rotating, all selected objects are rotated individually.
   */
  public rotate(newangle: number): void {
    const diagram = this.diagram;
    if (this.initialInfo === null) return;
    const node = this.adornedObject !== null ? this.adornedObject.part : null;
    if (node === null) return;
    const e = diagram.lastInput;
    // when rotating individual parts, remember the original angle difference
    const angleDiff = newangle - node.rotateObject.angle;
    const tool = this;
    this.initialInfo.each(function(kvp) {
      const part = kvp.key;
      if (part instanceof go.Link) return; // only Nodes and simple Parts
      const partInfo = kvp.value;
      // rotate every selected non-Link Part
      // find information about the part set in RotateMultipleTool.initialInformation
      if (e.control || e.meta) {
        if (node === part) {
          part.rotateObject.angle = newangle;
        } else {
          part.rotateObject.angle += angleDiff;
        }
      } else {
        const radAngle = newangle * (Math.PI / 180); // converts the angle traveled from degrees to radians
        // calculate the part's x-y location relative to the central rotation point
        const offsetX = partInfo.distance * Math.cos(radAngle + partInfo.placementAngle);
        const offsetY = partInfo.distance * Math.sin(radAngle + partInfo.placementAngle);
        // move part
        part.location = new go.Point(tool.centerPoint.x + offsetX, tool.centerPoint.y + offsetY);
        // rotate part
        part.rotateObject.angle = partInfo.rotationAngle + newangle;
      }
    });
  }

  /**
   * Calculate the desired angle with different rotation points,
   * depending on whether we are rotating the whole selection as one, or Parts individually.
   * @param {Point} newPoint in document coordinates
   */
  public computeRotate(newPoint: go.Point): number {
    const diagram = this.diagram;
    if (this.adornedObject === null) return 0.0;
    let angle = 0.0;
    const e = diagram.lastInput;
    if (e.control || e.meta) {  // relative to the center of the Node whose handle we are rotating
      const part = this.adornedObject.part;
      if (part !== null) {
        const rotationPoint = part.getDocumentPoint(part.locationSpot);
        angle = rotationPoint.directionPoint(newPoint);
      }
    } else {  // relative to the center of the whole selection
      angle = this.centerPoint.directionPoint(newPoint) - this.initialAngle;
    }
    if (angle >= 360) angle -= 360;
    else if (angle < 0) angle += 360;
    const interval = Math.min(Math.abs(this.snapAngleMultiple), 180);
    const epsilon = Math.min(Math.abs(this.snapAngleEpsilon), interval / 2);
    // if it's close to a multiple of INTERVAL degrees, make it exactly so
    if (!diagram.lastInput.shift && interval > 0 && epsilon > 0) {
      if (angle % interval < epsilon) {
        angle = Math.floor(angle / interval) * interval;
      } else if (angle % interval > interval - epsilon) {
        angle = (Math.floor(angle / interval) + 1) * interval;
      }
      if (angle >= 360) angle -= 360;
      else if (angle < 0) angle += 360;
    }
    return angle;
  }

}

/**
 * Internal class to remember a Part's offset and angle.
 */
class PartInfo {
  public placementAngle: number;
  public distance: number;
  public rotationAngle: number;
  constructor(placementAngle: number, distance: number, rotationAngle: number) {
    this.placementAngle = placementAngle * (Math.PI / 180);  // in radians
    this.distance = distance;
    this.rotationAngle = rotationAngle;  // in degrees
  }
}
