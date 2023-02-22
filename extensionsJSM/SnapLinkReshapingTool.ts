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
 * The SnapLinkReshapingTool class lets the user snap link reshaping handles to the nearest grid point.
 * If {@link #avoidsNodes} is true and the link is orthogonal,
 * it also avoids reshaping the link so that any adjacent segments cross over any avoidable nodes.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/SnapLinkReshaping.html">Snap Link Reshaping</a> sample.
 * @category Tool Extension
 */
export class SnapLinkReshapingTool extends go.LinkReshapingTool {
  private _gridCellSize = new go.Size(NaN, NaN);
  private _gridOrigin = new go.Point(NaN, NaN);
  private _isGridSnapEnabled = true;
  private _avoidsNodes = true;
  // internal state
  private _safePoint = new go.Point(NaN, NaN);
  private _prevSegHoriz = false;
  private _nextSegHoriz = false;

  /**
   * Gets or sets the {@link Size} of each grid cell to which link points will be snapped.
   *
   * The default value is NaNxNaN, which means use the {@link Diagram#grid}'s {@link Panel#gridCellSize}.
   */
  get gridCellSize(): go.Size { return this._gridCellSize; }
  set gridCellSize(val: go.Size) {
    if (!(val instanceof go.Size)) throw new Error('new value for SnapLinkReshapingTool.gridCellSize must be a Size, not: ' + val);
    this._gridCellSize = val.copy();
  }

  /**
   * Gets or sets the {@link Point} origin for the grid to which link points will be snapped.
   *
   * The default value is NaN,NaN, which means use the {@link Diagram#grid}'s {@link Panel#gridOrigin}.
   */
  get gridOrigin(): go.Point { return this._gridOrigin; }
  set gridOrigin(val: go.Point) {
    if (!(val instanceof go.Point)) throw new Error('new value for SnapLinkReshapingTool.gridOrigin must be a Point, not: ' + val);
    this._gridOrigin = val.copy();
  }

  /**
   * Gets or sets whether a reshape handle's position should be snapped to a grid point.
   * This affects the behavior of {@link #computeReshape}.
   *
   * The default value is true.
   */
  get isGridSnapEnabled(): boolean { return this._isGridSnapEnabled; }
  set isGridSnapEnabled(val: boolean) {
    if (typeof val !== 'boolean') throw new Error('new value for SnapLinkReshapingTool.isGridSnapEnabled must be a boolean, not: ' + val);
    this._isGridSnapEnabled = val;
  }

  /**
   * Gets or sets whether a reshape handle's position should only be dragged where the
   * adjacent segments do not cross over any nodes.
   * This affects the behavior of {@link #computeReshape}.
   *
   * The default value is true.
   */
  get avoidsNodes(): boolean { return this._avoidsNodes; }
  set avoidsNodes(val: boolean) {
    if (typeof val !== 'boolean') throw new Error('new value for SnapLinkReshapingTool.avoidsNodes must be a boolean, not: ' + val);
    this._avoidsNodes = val;
  }

  /**
   * This override records information about the original point of the handle being dragged,
   * if the {@link #adornedLink} is Orthogonal and if {@link #avoidsNodes} is true.
   */
  public override doActivate(): void {
    super.doActivate();
    if (this.isActive && this.avoidsNodes && this.adornedLink !== null && this.adornedLink.isOrthogonal && this.handle !== null) {
      // assume the Link's route starts off correctly avoiding all nodes
      this._safePoint = this.diagram.lastInput.documentPoint.copy();
      const link = this.adornedLink;
      const idx = this.handle.segmentIndex;
      this._prevSegHoriz = Math.abs(link.getPoint(idx-1).y - link.getPoint(idx).y) < 0.5;
      this._nextSegHoriz = Math.abs(link.getPoint(idx+1).y - link.getPoint(idx).y) < 0.5;
    }
  };

  /**
   * Pretend while dragging a reshape handle the mouse point is at the nearest grid point, if {@link #isGridSnapEnabled} is true.
   * This uses {@link #gridCellSize} and {@link #gridOrigin}, unless those are not real values,
   * in which case this uses the {@link Diagram#grid}'s {@link Panel#gridCellSize} and {@link Panel#gridOrigin}.
   *
   * If {@link #avoidsNodes} is true and the adorned Link is {@link Link#isOrthogonal},
   * this method also avoids returning a Point that causes the adjacent segments, both before and after
   * the current handle's index, to cross over any Nodes that are {@link Node#avoidable}.
   */
  public override computeReshape(p: go.Point): go.Point {
    let pt = p;
    const diagram = this.diagram;
    if (this.isGridSnapEnabled) {
      // first, find the grid to which we should snap
      let cell = this.gridCellSize;
      let orig = this.gridOrigin;
      if (!cell.isReal() || cell.width === 0 || cell.height === 0) cell = diagram.grid.gridCellSize;
      if (!orig.isReal()) orig = diagram.grid.gridOrigin;
      // second, compute the closest grid point
      pt = p.copy().snapToGrid(orig.x, orig.y, cell.width, cell.height);
    }
    if (this.avoidsNodes && this.adornedLink !== null && this.adornedLink.isOrthogonal) {
      if (this._checkSegmentsOverlap(pt)) {
        this._safePoint = pt.copy();
      } else {
        pt = this._safePoint.copy();
      }
    }
    // then do whatever LinkReshapingTool would normally do as if the mouse were at that point
    return super.computeReshape(pt);
  }

  /**
   * @hidden @internal
   * Internal method for seeing whether a moved handle will cause any
   * adjacent orthogonal segments to cross over any avoidable nodes.
   * Returns true if everything would be OK.
   */
  private _checkSegmentsOverlap(pt: go.Point): boolean {
    if (this.handle === null) return true;
    if (this.adornedLink === null) return true;
    const index = this.handle.segmentIndex;

    if (index >= 1) {
      const p1 = this.adornedLink.getPoint(index-1);
      const r = new go.Rect(pt.x, pt.y, 0, 0);
      const q1 = p1.copy();
      if (this._prevSegHoriz) {
        q1.y = pt.y;
      } else {
        q1.x = pt.x;
      }
      r.unionPoint(q1);
      const overlaps = this.diagram.findPartsIn(r, true, false);
      if (overlaps.any(p => p instanceof go.Node && p.avoidable)) return false;

      if (index >= 2) {
        const p0 = this.adornedLink.getPoint(index-2);
        const r = new go.Rect(q1.x, q1.y, 0, 0);
        if (this._prevSegHoriz) {
          r.unionPoint(new go.Point(q1.x, p0.y));
        } else {
          r.unionPoint(new go.Point(p0.x, q1.y));
        }
        const overlaps = this.diagram.findPartsIn(r, true, false);
        if (overlaps.any(p => p instanceof go.Node && p.avoidable)) return false;
      }
    }

    if (index < this.adornedLink.pointsCount-1) {
      const p2 = this.adornedLink.getPoint(index+1);
      const r = new go.Rect(pt.x, pt.y, 0, 0);
      const q2 = p2.copy();
      if (this._nextSegHoriz) {
        q2.y = pt.y;
      } else {
        q2.x = pt.x;
      }
      r.unionPoint(q2);
      const overlaps = this.diagram.findPartsIn(r, true, false);
      if (overlaps.any(p => p instanceof go.Node && p.avoidable)) return false;

      if (index < this.adornedLink.pointsCount-2) {
        const p3 = this.adornedLink.getPoint(index+2);
        const r = new go.Rect(q2.x, q2.y, 0, 0);
        if (this._nextSegHoriz) {
          r.unionPoint(new go.Point(q2.x, p3.y));
        } else {
          r.unionPoint(new go.Point(p3.x, q2.y));
        }
        const overlaps = this.diagram.findPartsIn(r, true, false);
        if (overlaps.any(p => p instanceof go.Node && p.avoidable)) return false;
      }
    }

    return true;
  };
}
