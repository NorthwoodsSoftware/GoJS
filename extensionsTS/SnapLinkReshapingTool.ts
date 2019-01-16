/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go';

/**
 * The SnapLinkReshapingTool class lets the user snap link reshaping handles to the nearest grid point.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/SnapLinkReshaping.html">Snap Link Reshaping</a> sample.
 * @category Tool Extension
 */
export class SnapLinkReshapingTool extends go.LinkReshapingTool {
  private _gridCellSize = new go.Size(NaN, NaN);
  private _gridOrigin = new go.Point(NaN, NaN);
  private _isGridSnapEnabled = true;

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
   * Pretend while dragging a reshape handle the mouse point is at the nearest grid point, if {@link #isGridSnapEnabled} is true.
   * This uses {@link #gridCellSize} and {@link #gridOrigin}, unless those are not real values,
   * in which case this uses the {@link Diagram#grid}'s {@link Panel#gridCellSize} and {@link Panel#gridOrigin}.
   */
  public computeReshape(p: go.Point): go.Point {
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
    // then do whatever LinkReshapingTool would normally do as if the mouse were at that point
    return super.computeReshape(pt);
  }

}
