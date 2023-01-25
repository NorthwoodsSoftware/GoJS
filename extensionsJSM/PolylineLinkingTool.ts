/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go-module.js';

/**
 * The PolylineLinkingTool class the user to draw a new {@link Link} by clicking where the route should go,
 * until clicking on a valid target port.
 *
 * This tool supports routing both orthogonal and straight links.
 * You can customize the {@link LinkingBaseTool#temporaryLink} as needed to affect the
 * appearance and behavior of the temporary link that is shown during the linking operation.
 * You can customize the {@link LinkingTool#archetypeLinkData} to specify property values
 * that can be data-bound by your link template for the Links that are actually created.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/PolylineLinking.html">Polyline Linking</a> sample.
 * @category Tool Extension
 */
export class PolylineLinkingTool extends go.LinkingTool {
  private _firstMouseDown: boolean = false;
  private _horizontal: boolean = false;

  /**
   * Constructs an PolylineLinkingTool, sets {@link #portGravity} to 0, and sets the name for the tool.
   */
  constructor() {
    super();
    this.portGravity = 0; // must click on a target port in order to complete the link
    this.name = 'PolylineLinking';
  }

  /**
   * @hidden @internal
   * This internal method adds a point to the route.
   * During the operation of this tool, the very last point changes to follow the mouse point.
   * This method is called by {@link #doMouseDown} in order to add a new "last" point.
   * @param {Point} p
   */
  private addPoint(p: go.Point): void {
    if (this._firstMouseDown) return;
    const pts = this.temporaryLink.points.copy();
    this._horizontal = !this._horizontal;
    pts.add(p.copy());
    this.temporaryLink.points = pts;
  }

  /**
   * @hidden @internal
   * This internal method moves the last point of the temporary Link's route.
   * This is called by {@link #doMouseMove} and other methods that want to adjust the end of the route.
   * @param {Point} p
   */
  private moveLastPoint(p: go.Point): void {
    if (this._firstMouseDown) return;
    const pts = this.temporaryLink.points.copy();
    if (this.temporaryLink.isOrthogonal) {
      const q = pts.elt(pts.length - 3).copy();
      if (this._horizontal) {
        q.y = p.y;
      } else {
        q.x = p.x;
      }
      pts.setElt(pts.length - 2, q);
    }
    pts.setElt(pts.length - 1, p.copy());
    this.temporaryLink.points = pts;
  }

  /**
   * @hidden @internal
   * This internal method removes the last point of the temporary Link's route.
   * This is called by the "Z" command in {@link #doKeyDown}
   * and by {@link #doMouseUp} when a valid target port is found and we want to
   * discard the current mouse point from the route.
   */
  private removeLastPoint(): void {
    if (this._firstMouseDown) return;
    const pts = this.temporaryLink.points.copy();
    if (pts.length === 0) return;
    pts.removeAt(pts.length - 1);
    this.temporaryLink.points = pts;
    this._horizontal = !this._horizontal;
  }

  /**
   * Use a "crosshair" cursor.
   */
  public override doActivate(): void {
    super.doActivate();
    this.diagram.currentCursor = 'crosshair';
    // until a mouse down occurs, allow the temporary link to be routed to the temporary node/port
    this._firstMouseDown = true;
  }

  /**
   * Add a point to the route that the temporary Link is accumulating.
   */
  public override doMouseDown(): void {
    if (!this.isActive) {
      this.doActivate();
    }
    if (this.diagram.lastInput.left) {
      if (this._firstMouseDown) {
        this._firstMouseDown = false;
        // disconnect the temporary node/port from the temporary link
        // so that it doesn't lose the points that are accumulating
        if (this.isForwards) {
          this.temporaryLink.toNode = null;
        } else {
          this.temporaryLink.fromNode = null;
        }
        const pts = this.temporaryLink.points;
        const ult = pts.elt(pts.length - 1);
        const penult = pts.elt(pts.length - 2);
        this._horizontal = (ult.x === penult.x);
      }
      // a new temporary end point, the previous one is now "accepted"
      this.addPoint(this.diagram.lastInput.documentPoint);
    } else {  // e.g. right mouse down
      this.doCancel();
    }
  }

  /**
   * Have the temporary link reach to the last mouse point.
   */
  public override doMouseMove(): void {
    if (this.isActive) {
      this.moveLastPoint(this.diagram.lastInput.documentPoint);
      super.doMouseMove();
    }
  }

  /**
   * If this event happens on a valid target port (as determined by {@link LinkingBaseTool#findTargetPort}),
   * we complete the link drawing operation.  {@link #insertLink} is overridden to transfer the accumulated
   * route drawn by user clicks to the new {@link Link} that was created.
   *
   * If this event happens elsewhere in the diagram, this tool is not stopped: the drawing of the route continues.
   */
  public override doMouseUp(): void {
    if (!this.isActive) return;
    const target = this.findTargetPort(this.isForwards);
    if (target !== null) {
      if (this._firstMouseDown) {
        super.doMouseUp();
      } else {
        let pts;
        this.removeLastPoint();  // remove temporary point
        const spot = this.isForwards ? target.toSpot : target.fromSpot;
        if (spot.equals(go.Spot.None)) {
          const pt = this.temporaryLink.getLinkPointFromPoint(target.part as go.Node, target,
            target.getDocumentPoint(go.Spot.Center),
            this.temporaryLink.points.elt(this.temporaryLink.points.length - 2),
            !this.isForwards);
          this.moveLastPoint(pt);
          pts = this.temporaryLink.points.copy();
          if (this.temporaryLink.isOrthogonal) {
            pts.insertAt(pts.length - 2, pts.elt(pts.length - 2));
          }
        } else {
          // copy the route of saved points, because we're about to recompute it
          pts = this.temporaryLink.points.copy();
          // terminate the link in the expected manner by letting the
          // temporary link connect with the temporary node/port and letting the
          // normal route computation take place
          if (this.isForwards) {
            this.copyPortProperties(target.part as go.Node, target, this.temporaryToNode, this.temporaryToPort, true);
            this.temporaryLink.toNode = target.part as go.Node;
          } else {
            this.copyPortProperties(target.part as go.Node, target, this.temporaryFromNode, this.temporaryFromPort, false);
            this.temporaryLink.fromNode = target.part as go.Node;
          }
          this.temporaryLink.updateRoute();
          // now copy the final one or two points of the temporary link's route
          // into the route built up in the PTS List.
          const natpts = this.temporaryLink.points;
          const numnatpts = natpts.length;
          if (numnatpts >= 2) {
            if (numnatpts >= 3) {
              const penult = natpts.elt(numnatpts - 2);
              pts.insertAt(pts.length - 1, penult);
              if (this.temporaryLink.isOrthogonal) {
                pts.insertAt(pts.length - 1, penult);
              }
            }
            const ult = natpts.elt(numnatpts - 1);
            pts.setElt(pts.length - 1, ult);
          }
        }
        // save desired route in temporary link;
        // insertLink will copy the route into the new real Link
        this.temporaryLink.points = pts;
        super.doMouseUp();
      }
    }
  }

  /**
   * This method overrides the standard link creation method by additionally
   * replacing the default link route with the custom one laid out by the user.
   */
  public override insertLink(fromnode: go.Node, fromport: go.GraphObject, tonode: go.Node, toport: go.GraphObject): go.Link | null {
    const link = super.insertLink(fromnode, fromport, tonode, toport);
    if (link !== null && !this._firstMouseDown) {
      // ignore natural route by replacing with route accumulated by this tool
      link.points = this.temporaryLink.points;
    }
    return link;
  }

  /**
   * This supports the "Z" command during this tool's operation to remove the last added point of the route.
   * Type ESCAPE to completely cancel the operation of the tool.
   */
  public override doKeyDown(): void {
    if (!this.isActive) return;
    const e = this.diagram.lastInput;
    if (e.key === 'Z' && this.temporaryLink.points.length > (this.temporaryLink.isOrthogonal ? 4 : 3)) {  // undo
      // remove a point, and then treat the last one as a temporary one
      this.removeLastPoint();
      this.moveLastPoint(e.documentPoint);
    } else {
      super.doKeyDown();
    }
  }
}
