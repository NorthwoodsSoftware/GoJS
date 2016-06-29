"use strict"
/*
*  Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Tool for dragging a segment of an orthogonal link.

/**
* This OrthogonalLinkReshapingTool class allows for a Link's path to be modified by the user
* via the dragging of a tool handle at the middle of the link segment, which will move the whole segment.
* @constructor
* @extends LinkReshapingTool
* @class
*/
function OrthogonalLinkReshapingTool() {
  go.LinkReshapingTool.call(this);
  this.name = "OrthogonalLinkReshaping";
}
go.Diagram.inherit(OrthogonalLinkReshapingTool, go.LinkReshapingTool);

/**
* For orthogonal, straight links, create the central handles and set reshaping bahavior
* @override
* @this {OrthogonalLinkReshapingTool}
* @param {Shape} pathshape
* @return {Adornment}
*/
OrthogonalLinkReshapingTool.prototype.makeAdornment = function(pathshape) {
  var link = pathshape.part;

  // add all normal handles first
  var adornment = go.LinkReshapingTool.prototype.makeAdornment.call(this, pathshape);

  // add long reshaping handles for orthogonal, straight links
  if (link !== null && link.isOrthogonal && link.curve !== go.Link.Bezier) {
    var firstindex = link.firstPickIndex;
    var lastindex = link.lastPickIndex;
    for (var i = firstindex + 1; i < lastindex - 1; i++) {
      // define a geometry which gives some indication of direction for moving the segment
      var h = this.makeSegmentDragHandle(link);
      // needs to be a GraphObject so we can set its Cursor
      if (h !== null) {
        // identify this particular handle within the LinkPanel
        h.segmentIndex = i;
        h.segmentFraction = 0.5;
        h.toMaxLinks = 999; // set this unsused property to easily identify that we have a segment dragging handle
        // check nearby points to determine reshaping behavior;
        // the handle can only be dragged perpendicular to the segment
        var a = link.getPoint(i);
        var b = link.getPoint(i + 1);
        if (OrthogonalLinkReshapingTool.isApprox(a.x, b.x) && OrthogonalLinkReshapingTool.isApprox(a.y, b.y)) {
          var b = link.getPoint(i - 1);
          if (OrthogonalLinkReshapingTool.isApprox(a.x, b.x)) {
            this.setReshapingBehavior(h, go.LinkReshapingTool.Horizontal);
            h.cursor = 'w-resize';
          } else if (OrthogonalLinkReshapingTool.isApprox(a.y, b.y)) {
            this.setReshapingBehavior(h, go.LinkReshapingTool.Vertical);
            h.cursor = 'n-resize';
          }
        } else {
          if (OrthogonalLinkReshapingTool.isApprox(a.x, b.x)) {
            this.setReshapingBehavior(h, go.LinkReshapingTool.Horizontal);
            h.cursor = "w-resize";
          } else if (OrthogonalLinkReshapingTool.isApprox(a.y, b.y)) {
            this.setReshapingBehavior(h, go.LinkReshapingTool.Vertical);
            h.cursor = "n-resize";
          }
        }
        adornment.add(h);
      }
    }
  }
  return adornment;
};

/**
* Once we finish a reshape, make sure any handles are properly updated
* @override
* @this {OrthogonalLinkReshapingTool}
*/
OrthogonalLinkReshapingTool.prototype.doDeactivate = function() {
  // when we finish, recreate adornment to assure proper reshaping behavior/cursor
  var link = this.adornedLink;
  if (link !== null && link.isOrthogonal && link.curve !== go.Link.Bezier) {
    var pathshape = link.path;
    var adornment = this.makeAdornment(pathshape);
    if (adornment !== null) {
      link.addAdornment(this.name, adornment);
      adornment.location = link.position;
    }
  }
  go.LinkReshapingTool.prototype.doDeactivate.call(this);
};

/**
* Set the reshaping behavior for segment dragging handles
* @override
* @this {OrthogonalLinkReshapingTool}
* @param {Point} newpt
*/
OrthogonalLinkReshapingTool.prototype.reshape = function(newpt) {
  var link = this.adornedLink;
  if (link !== null && link.isOrthogonal && link.curve !== go.Link.Bezier && this.handle.toMaxLinks === 999) {
    link.startRoute();
    var index = this.handle.segmentIndex; // for these handles, firstPickIndex + 1 <= index < lastPickIndex - 1
    var behavior = this.getReshapingBehavior(this.handle);
    if (behavior === go.LinkReshapingTool.Vertical) {
      // move segment vertically
      link.setPointAt(index, link.getPoint(index - 1).x, newpt.y);
      link.setPointAt(index + 1, link.getPoint(index + 2).x, newpt.y);
    } else if (behavior === go.LinkReshapingTool.Horizontal) {
      // move segment horizontally
      link.setPointAt(index, newpt.x, link.getPoint(index - 1).y);
      link.setPointAt(index + 1, newpt.x, link.getPoint(index + 2).y);
    }
    link.commitRoute();
  } else {
    go.LinkReshapingTool.prototype.reshape.call(this, newpt);
  }
};

/**
* Create the segment dragging handle with geometry based on whether we need to account for the resegment handle
* @param {Link} link
* @this {OrthogonalLinkReshapingTool}
*/
OrthogonalLinkReshapingTool.prototype.makeSegmentDragHandle = function(link) {
  var h = new go.Shape();
  h.fill = "#1B3471"; // different from other handles to make sure it stands out
  h.stroke = "dodgerblue";
  h.segmentOrientation = go.Link.OrientAlong;
  // for resegmentable links, leave space for the resegment handle
  if (link.resegmentable) {
    h.geometryString = "F M 0 0 L 8 0 L 6 2 L 8 4 L 0 4 Z X F M 12 0 L 20 0 L 20 4 L 12 4 L 14 2 Z " +
                       "M 4 0 L 4 -3 X M 4 4 L 4 7 M 16 0 L 16 -3 X M 16 4 L 16 7";
  } else {
    h.geometryString = "F M 0 0 L 12 0 L 12 4 L 0 4 Z X M 6 0 L 6 -3 X M 6 4 L 6 7";
  }
  return h;
};

// Custom isApprox so we don't need to use Geo
OrthogonalLinkReshapingTool.isApprox = function(x, y) {
  var d = x - y;
  return d < 0.5 && d > -0.5;
}