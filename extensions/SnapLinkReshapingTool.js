"use strict";
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom LinkReshapingTool that snaps dragged reshaping handles to grid points.

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends LinkReshapingTool
* @class
* This SnapLinkReshapingTool class supports snapping reshaping handles to go to the nearest grid point.
* If {@link #avoidsNodes} is true and the link is orthogonal,
* it also avoids reshaping the link so that any adjacent segments cross over any avoidable nodes.
*/
function SnapLinkReshapingTool() {
  go.LinkReshapingTool.call(this);
  /** @type {Size} */
  this._gridCellSize = new go.Size(NaN, NaN);
  /** @type {Point} */
  this._gridOrigin = new go.Point(NaN, NaN);
  /** @type {boolean} */
  this._isGridSnapEnabled = true;
  /** @type {boolean} */
  this._avoidsNodes = true;
  // internal state
  this._safePoint = new go.Point(NaN, NaN);
  this._prevSegHoriz = false;
  this._nextSegHoriz = false;
}
go.Diagram.inherit(SnapLinkReshapingTool, go.LinkReshapingTool);

/**
* Gets or sets the {@link Size} of each grid cell to which link points will be snapped.
* The default value is NaNxNaN, which means use the {@link Diagram#grid}'s {@link Panel#gridCellSize}.
* @name SnapLinkReshapingTool#gridCellSize
* @function.
* @return {Size}
*/
Object.defineProperty(SnapLinkReshapingTool.prototype, "gridCellSize", {
  get: function() { return this._gridCellSize; },
  set: function(val) {
    if (!(val instanceof go.Size)) throw new Error("new value for SnapLinkReshapingTool.gridCellSize must be a Size, not: " + val);
    this._gridCellSize = val.copy();
  }
});

/**
* Gets or sets the {@link Point} origin for the grid to which link points will be snapped.
* The default value is NaN,NaN, which means use the {@link Diagram#grid}'s {@link Panel#gridOrigin}.
* @name SnapLinkReshapingTool#gridOrigin
* @function.
* @return {Point}
*/
Object.defineProperty(SnapLinkReshapingTool.prototype, "gridOrigin", {
  get: function() { return this._gridOrigin; },
  set: function(val) {
    if (!(val instanceof go.Point)) throw new Error("new value for SnapLinkReshapingTool.gridOrigin must be a Point, not: " + val);
    this._gridOrigin = val.copy();
  }
});

/**
* Gets or sets whether a reshape handle's position should be snapped to a grid point.
* The default value is true.
* This affects the behavior of {@link #computeReshape}.
*/
Object.defineProperty(SnapLinkReshapingTool.prototype, "isGridSnapEnabled", {
  get: function() { return this._isGridSnapEnabled; },
  set: function(val) {
    if (typeof val !== "boolean") throw new Error("new value for SnapLinkReshapingTool.isGridSnapEnabled must be a boolean, not: " + val);
    this._isGridSnapEnabled = val;
  }
});

/**
* Gets or sets whether a reshape handle's position should only be dragged where the
* adjacent segments do not cross over any nodes.
* The default value is true.
* This affects the behavior of {@link #computeReshape}.
*/
Object.defineProperty(SnapLinkReshapingTool.prototype, "avoidsNodes", {
  get: function() { return this._avoidsNodes; },
  set: function(val) {
    if (typeof val !== "boolean") throw new Error("new value for SnapLinkReshapingTool.avoidsNodes must be a boolean, not: " + val);
    this._avoidsNodes = val;
  }
});

/**
 * This override records information about the original point of the handle being dragged,
 * if the {@link #adornedLink} is Orthogonal and if {@link #avoidsNodes} is true.
 */
SnapLinkReshapingTool.prototype.doActivate = function() {
  go.LinkReshapingTool.prototype.doActivate.call(this);
  if (this.isActive && this.avoidsNodes && this.adornedLink.isOrthogonal) {
    // assume the Link's route starts off correctly avoiding all nodes
    this._safePoint = this.diagram.lastInput.documentPoint.copy();
    var link = this.adornedLink;
    var idx = this.handle.segmentIndex;
    this._prevSegHoriz = Math.abs(link.getPoint(idx-1).y - link.getPoint(idx).y) < 0.5;
    this._nextSegHoriz = Math.abs(link.getPoint(idx+1).y - link.getPoint(idx).y) < 0.5;
  }
};

/**
* Pretend while dragging a reshape handle the mouse point is at the nearest grid point,
* if {@link #isGridSnapEnabled} is true.
* This uses {@link #gridCellSize} and {@link #gridOrigin}, unless those are not real values,
* in which case this uses the {@link Diagram#grid}'s {@link Panel#gridCellSize} and {@link Panel#gridOrigin}.
*
* If {@link #avoidsNodes} is true and the adorned Link is {@link Link#isOrthogonal},
* this method also avoids returning a Point that causes the adjacent segments, both before and after
* the current handle's index, to cross over any Nodes that are {@link Node#avoidable}.
* @this {SnapLinkReshapingTool}
* @param {Point} p
* @return {Point}
*/
SnapLinkReshapingTool.prototype.computeReshape = function(p) {
  var pt = p;
  if (this.isGridSnapEnabled) {
    // first, find the grid to which we should snap
    var cell = this.gridCellSize;
    var orig = this.gridOrigin;
    if (!cell.isReal() || cell.width === 0 || cell.height === 0) cell = this.diagram.grid.gridCellSize;
    if (!orig.isReal()) orig = this.diagram.grid.gridOrigin;
    // second, compute the closest grid point
    pt = p.copy().snapToGrid(orig.x, orig.y, cell.width, cell.height);
  }
  if (this.avoidsNodes && this.adornedLink.isOrthogonal) {
    if (this._checkSegmentsOverlap(pt)) {
      this._safePoint = pt.copy();
    } else {
      pt = this._safePoint.copy();
    }
  }
  // then do whatever LinkReshapingTool would normally do as if the mouse were at that point
  return go.LinkReshapingTool.prototype.computeReshape.call(this, pt);
};

/**
 * @hidden @internal
 * Internal method for seeing whether a moved handle will cause any
 * adjacent orthogonal segments to cross over any avoidable nodes.
 * Returns true if everything would be OK.
 */
SnapLinkReshapingTool.prototype._checkSegmentsOverlap = function(pt) {
  var index = this.handle.segmentIndex;

  if (index >= 1) {
    var p1 = this.adornedLink.getPoint(index-1);
    var r = new go.Rect(pt.x, pt.y, 0, 0);
    var q1 = p1.copy();
    if (this._prevSegHoriz) {
      q1.y = pt.y;
    } else {
      q1.x = pt.x;
    }
    r.unionPoint(q1);
    var overlaps = this.diagram.findPartsIn(r, true, false);
    if (overlaps.any(function(p) { return p instanceof go.Node && p.avoidable; })) return false;

    if (index >= 2) {
      var p0 = this.adornedLink.getPoint(index-2);
      var r = new go.Rect(q1.x, q1.y, 0, 0);
      if (this._prevSegHoriz) {
        r.unionPoint(new go.Point(q1.x, p0.y));
      } else {
        r.unionPoint(new go.Point(p0.x, q1.y));
      }
      var overlaps = this.diagram.findPartsIn(r, true, false);
      if (overlaps.any(function(p) { return p instanceof go.Node && p.avoidable; })) return false;
    }
  }

  if (index < this.adornedLink.pointsCount-1) {
    var p2 = this.adornedLink.getPoint(index+1);
    var r = new go.Rect(pt.x, pt.y, 0, 0);
    var q2 = p2.copy();
    if (this._nextSegHoriz) {
      q2.y = pt.y;
    } else {
      q2.x = pt.x;
    }
    r.unionPoint(q2);
    var overlaps = this.diagram.findPartsIn(r, true, false);
    if (overlaps.any(function(p) { return p instanceof go.Node && p.avoidable; })) return false;

    if (index < this.adornedLink.pointsCount-2) {
      var p3 = this.adornedLink.getPoint(index+2);
      var r = new go.Rect(q2.x, q2.y, 0, 0);
      if (this._nextSegHoriz) {
        r.unionPoint(new go.Point(q2.x, p3.y));
      } else {
        r.unionPoint(new go.Point(p3.x, q2.y));
      }
      var overlaps = this.diagram.findPartsIn(r, true, false);
      if (overlaps.any(function(p) { return p instanceof go.Node && p.avoidable; })) return false;
    }
  }

  return true;
};