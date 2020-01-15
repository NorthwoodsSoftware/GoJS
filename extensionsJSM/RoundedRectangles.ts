/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go-module.js';

// This file holds the definitions of two useful figures: "RoundedTopRectangle" and "RoundedBottomRectangle".
// These are demonstrated at ../samples/twoHalves.html and ../samples/roundedGroups.html.

go.Shape.defineFigureGenerator('RoundedTopRectangle', function (shape: go.Shape, w: number, h: number) {
  // this figure takes one parameter, the size of the corner
  let p1 = 5;  // default corner size
  if (shape !== null) {
    const param1 = shape.parameter1;
    if (!isNaN(param1) && param1 >= 0) p1 = param1;  // can't be negative or NaN
  }
  p1 = Math.min(p1, w / 2);
  p1 = Math.min(p1, h / 2);  // limit by whole height or by half height?
  const geo = new go.Geometry();
  // a single figure consisting of straight lines and quarter-circle arcs
  geo.add(new go.PathFigure(0, p1)
    .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
    .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
    .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
    .add(new go.PathSegment(go.PathSegment.Line, w, h))
    .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
  // don't intersect with two top corners when used in an "Auto" Panel
  geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1);
  geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0);
  return geo;
});

go.Shape.defineFigureGenerator('RoundedBottomRectangle', function (shape: go.Shape, w: number, h: number) {
  // this figure takes one parameter, the size of the corner
  let p1 = 5;  // default corner size
  if (shape !== null) {
    const param1 = shape.parameter1;
    if (!isNaN(param1) && param1 >= 0) p1 = param1;  // can't be negative or NaN
  }
  p1 = Math.min(p1, w / 2);
  p1 = Math.min(p1, h / 2);  // limit by whole height or by half height?
  const geo = new go.Geometry();
  // a single figure consisting of straight lines and quarter-circle arcs
  geo.add(new go.PathFigure(0, 0)
    .add(new go.PathSegment(go.PathSegment.Line, w, 0))
    .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
    .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
    .add(new go.PathSegment(go.PathSegment.Line, p1, h))
    .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close()));
  // don't intersect with two bottom corners when used in an "Auto" Panel
  geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0);
  geo.spot2 = new go.Spot(1, 1, -0.3 * p1, -0.3 * p1);
  return geo;
});
