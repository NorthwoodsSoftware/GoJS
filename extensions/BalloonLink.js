"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Link that draws a "balloon" shape around the Link.fromNode

/**
* @constructor
* @extends Link
* @class
* This custom Link class customizes its Shape to surround the comment node.
* If the Shape is filled, it will obscure the comment itself unless the Link is behind the comment node.
* Thus the default layer for BalloonLinks is "Background".
*/
function BalloonLink() {
  go.Link.call(this);
  this.layerName = "Background";
  this.base = 10;
}
go.Diagram.inherit(BalloonLink, go.Link);

/*
* The width of the base of the triangle at the center point of the Link.fromNode.
* The default value is 10.
* @name BalloonLink#base
* @function.
* @return {number}
*/
Object.defineProperty(BalloonLink.prototype, "base", {
  get: function() { return this._base; },
  set: function(value) { this._base = value; }
});

/**
* Produce a Geometry from the Link's route that draws a "balloon" shape around the Link.fromNode
* and has a triangular shape with the base at the fromNode and the top at the toNode.
* @override
* @this {BalloonLink}
*/
BalloonLink.prototype.makeGeometry = function() {
  // assume the fromNode is the comment and the toNode is the commented-upon node
  var bb = this.fromNode.actualBounds;
  var nb = this.toNode.actualBounds;

  var numpts = this.pointsCount;
  var p0 = bb.center;
  var pn = this.getPoint(numpts - 1);
  if (bb.intersectsRect(nb)) {
    pn = nb.center;
  }
  var pos = this.routeBounds;

  // compute the intersection points for the triangular arrow
  var ang = pn.directionPoint(p0);
  var L = new go.Point(this.base, 0).rotate(ang - 90).add(p0);
  var R = new go.Point(this.base, 0).rotate(ang + 90).add(p0);
  this.getLinkPointFromPoint(this.fromNode, this.fromNode, L, pn, true, L);
  this.getLinkPointFromPoint(this.fromNode, this.fromNode, R, pn, true, R);

  // form a triangular arrow from the comment to the commented node
  var fig = new go.PathFigure(pn.x - pos.x, pn.y - pos.y, true);  // filled; start at arrow point at commented node
  fig.add(new go.PathSegment(go.PathSegment.Line, R.x - pos.x, R.y - pos.y));  // a triangle base point on comment's edge
  var side = 0;
  if (L.y >= bb.bottom || R.y >= bb.bottom) side = 2;
  else if (L.x <= bb.x && R.x <= bb.x) side = 1;
  else if (L.x >= bb.right && R.x >= bb.right) side = 3;
  this.pathToCorner(side, bb, fig, pos, L, R);
  this.pathToCorner(side + 1, bb, fig, pos, L, R);
  this.pathToCorner(side + 2, bb, fig, pos, L, R);
  this.pathToCorner(side + 3, bb, fig, pos, L, R);
  fig.add(new go.PathSegment(go.PathSegment.Line, L.x - pos.x, L.y - pos.y).close());  // the other triangle base point on comment's edge

  // return a Geometry
  return new go.Geometry().add(fig);
};

/**
* @ignore
* Draw a line to a corner, but not if the comment arrow encompasses that corner.
* @this {BalloonLink}
*/
BalloonLink.prototype.pathToCorner = function(side, bb, fig, pos, L, R) {
  switch (side % 4) {
    case 0: if (!(L.y <= bb.y && R.x <= bb.x)) fig.add(new go.PathSegment(go.PathSegment.Line, bb.x - pos.x, bb.y - pos.y)); break;
    case 1: if (!(L.x <= bb.x && R.y >= bb.bottom)) fig.add(new go.PathSegment(go.PathSegment.Line, bb.x - pos.x, bb.bottom - pos.y)); break;
    case 2: if (!(L.y >= bb.bottom && R.x >= bb.right)) fig.add(new go.PathSegment(go.PathSegment.Line, bb.right - pos.x, bb.bottom - pos.y)); break;
    case 3: if (!(L.x >= bb.right && R.y <= bb.y)) fig.add(new go.PathSegment(go.PathSegment.Line, bb.right - pos.x, bb.y - pos.y)); break;
  }
};
// end BalloonLink class
