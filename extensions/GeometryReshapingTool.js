'use strict';
/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends Tool
* @class
* This GeometryReshapingTool class allows for a Shape's Geometry to be modified by the user
* via the dragging of tool handles.
* This does not handle Links, whose routes should be reshaped by the LinkReshapingTool.
* The {@link #reshapeObjectName} needs to identify the named {@link Shape} within the
* selected {@link Part}.
* If the shape cannot be found or if its {@link Shape#geometry} is not of type {@link Geometry#Path},
* this will not show any GeometryReshaping {@link Adornment}.
*/
function GeometryReshapingTool() {
	go.Tool.call(this);
	this.name = 'GeometryReshaping';

	var h = new go.Shape();
  h.figure = 'Diamond';
  h.desiredSize = new go.Size(8, 8);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';
  h.cursor = 'move';
  /** @type {GraphObject} */
	this._handleArchetype = h;

  h = new go.Shape();
  h.figure = 'Circle';
  h.desiredSize = new go.Size(7, 7);
  h.fill = 'lightblue';
  h.stroke = 'dodgerblue';
  h.cursor = 'move';
  /** @type {GraphObject} */
  this._midHandleArchetype = h;

  /** @type {boolean} */
  this._isResegmenting = false;

  /** @type {number} */
  this._resegmentingDistance = 3;

  /** @type {string} */
	this._reshapeObjectName = 'SHAPE';  //??? can't add Part.reshapeObjectName property
  // there's no Part.reshapeAdornmentTemplate either

  // internal state
  /** @type {GraphObject} */
	this._handle = null;
  /** @type {Shape} */
	this._adornedShape = null;
  /** @type {Geometry} */
	this._originalGeometry = null;  // in case the tool is cancelled and the UndoManager is not enabled
}
go.Diagram.inherit(GeometryReshapingTool, go.Tool);


/*
* A small GraphObject used as a reshape handle for each segment.
* The default GraphObject is a small blue diamond.
* @name GeometryReshapingTool#handleArchetype
* @return {GraphObject}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'handleArchetype', {
  get: function() { return this._handleArchetype; },
  set: function(val) { this._handleArchetype = val; }
});

/*
* A small GraphObject used as a reshape handle at the middle of each segment for inserting a new segment.
* The default GraphObject is a small blue circle.
* @name GeometryReshapingTool#midHandleArchetype
* @return {GraphObject}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'midHandleArchetype', {
  get: function() { return this._midHandleArchetype; },
  set: function(val) { this._midHandleArchetype = val; }
});

/*
* Gets or sets whether this tool supports the user's addition or removal of segments in the geometry.
* The default value is false.
* When the value is true, copies of the {@link #midHandleArchetype} will appear in the middle of each segment.
* At the current time, resegmenting is limited to straight segments, not curved ones.
* @name GeometryReshapingTool#isResegmenting
* @return {boolean}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'isResegmenting', {
  get: function() { return this._isResegmenting; },
  set: function(val) { this._isResegmenting = val; }
});

/*
* The maximum distance at which a resegmenting handle being positioned on a straight line
* between the adjacent points will cause one of the segments to be removed from the geometry.
* The default value is 3.
* @name GeometryReshapingTool#resegmentingDistance
* @return {number}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'resegmentingDistance', {
  get: function() { return this._resegmentingDistance; },
  set: function(val) { this._resegmentingDistance = val; }
});

/*
* The name of the GraphObject to be reshaped.
* The default name is "SHAPE".
* @name GeometryReshapingTool#reshapeObjectName
* @return {string}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'reshapeObjectName', {
  get: function() { return this._reshapeObjectName; },
  set: function(val) { this._reshapeObjectName = val; }
});

/*
* This read-only property returns the {@link GraphObject} that is the tool handle being dragged by the user.
* This will be contained by an {@link Adornment} whose category is 'GeometryReshaping'.
* Its {@link Adornment#adornedObject} is the same as the {@link #adornedShape}.
* @name GeometryReshapingTool#handle
* @return {GraphObject}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'handle', {
  get: function() { return this._handle; },
  set: function(val) { this._handle = val; }
});

/*
* Gets the {@link Shape} that is being reshaped.
* This must be contained within the selected Part.
* @name GeometryReshapingTool#adornedShape
* @return {Shape}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'adornedShape', {
  get: function() { return this._adornedShape; }
});

/*
* This read-only property remembers the original value for {@link Shape#geometry},
* so that it can be restored if this tool is cancelled.
* @name GeometryReshapingTool#originalGeometry
* @return {Geometry}
*/
Object.defineProperty(GeometryReshapingTool.prototype, 'originalGeometry', {
  get: function() { return this._originalGeometry; }
});


/**
* Show an {@link Adornment} with a reshape handle at each point of the geometry.
* Don't show anything if {@link #reshapeObjectName} doesn't return a {@link Shape}
* that has a {@link Shape#geometry} of type {@link Geometry#Path}.
* @this {GeometryReshapingTool}
* @param {Part} part the part.
*/
GeometryReshapingTool.prototype.updateAdornments = function(part) {
  if (part === null || part instanceof go.Link) return;  // this tool never applies to Links
  if (part.isSelected && !this.diagram.isReadOnly) {
    var selelt = part.findObject(this.reshapeObjectName);
    if (selelt instanceof go.Shape &&
        selelt.actualBounds.isReal() && selelt.isVisibleObject() &&
        part.canReshape() && part.actualBounds.isReal() && part.isVisible() &&
        selelt.geometry.type === go.Geometry.Path) {
      var geo = selelt.geometry;
      var adornment = part.findAdornment(this.name);
      // do we need to make a new adornment?
      if (adornment === null || (this._countHandles(geo) !== adornment.elements.count - 1)) {
        adornment = this.makeAdornment(selelt);
      }
      if (adornment !== null) {
        // update the position/alignment of each handle
        var b = geo.bounds;
        // update the size of the adornment
        adornment.findObject('BODY').desiredSize = b.size;
        var unneeded = null;
        var elts = adornment.elements;
        for (var i = 0; i < elts.count; i++) {
          var h = adornment.elt(i);
          if (typeof h._typ !== "number") continue;
          var typ = h._typ;
          if (typeof h._fig !== "number") continue;
          var figi = h._fig;
          if (figi >= geo.figures.count) {
            if (unneeded === null) unneeded = [];
            unneeded.push(h);
            continue;
          }
          var fig = geo.figures.elt(figi);
          if (typeof h._seg !== "number") continue;
          var segi = h._seg;
          if (segi >= fig.segments.count) {
            if (unneeded === null) unneeded = [];
            unneeded.push(h);
            continue;
          }
          var seg = fig.segments.elt(segi);
          var x = 0;
          var y = 0;
          switch (typ) {
            case 0: x = fig.startX; y = fig.startY; break;
            case 1: x = seg.endX; y = seg.endY; break;
            case 2: x = seg.point1X; y = seg.point1Y; break;
            case 3: x = seg.point2X; y = seg.point2Y; break;
            case 4: x = (fig.startX + seg.endX) / 2; y = (fig.startY + seg.endY) / 2; break;
            case 5: x = (fig.segments.elt(segi-1).endX + seg.endX) / 2; y = (fig.segments.elt(segi-1).endY + seg.endY) / 2; break;
            case 6: x = (fig.startX + seg.endX) / 2; y = (fig.startY + seg.endY) / 2; break;
            default: throw new Error('unexpected handle type')
          }
          h.alignment = new go.Spot(0, 0, x - b.x, y - b.y);
        }
        if (unneeded !== null) {
          unneeded.forEach(function(h) { adornment.remove(h); });
        }

        part.addAdornment(this.name, adornment);
        adornment.location = selelt.getDocumentPoint(go.Spot.TopLeft);
        adornment.angle = selelt.getDocumentAngle();
        return;
      }
    }
  }
  part.removeAdornment(this.name);
};

GeometryReshapingTool.prototype._countHandles = function(geo) {
  var reseg = this.isResegmenting;
  var c = 0;
  geo.figures.each(function(fig) {
    c++;
    fig.segments.each(function(seg) {
      if (reseg) {
        if (seg.type === go.PathSegment.Line) c++;
        if (seg.isClosed) c++;
      }
      c++;
      if (seg.type === go.PathSegment.QuadraticBezier) c++;
      else if (seg.type === go.PathSegment.Bezier) c += 2;
    })
  });
  return c;
};

/*
* @this {GeometryReshapingTool}
*/
GeometryReshapingTool.prototype.makeAdornment = function(selelt) {
  var adornment = new go.Adornment();
  adornment.type = go.Panel.Spot;
  adornment.locationObjectName = 'BODY';
  adornment.locationSpot = new go.Spot(0, 0, -selelt.strokeWidth / 2, -selelt.strokeWidth / 2);
  var h = new go.Shape();
  h.name = 'BODY';
  h.fill = null;
  h.stroke = null;
  h.strokeWidth = 0;
  adornment.add(h);

  var geo = selelt.geometry;
  if (this.isResegmenting) {
    for (var f = 0; f < geo.figures.count; f++) {
      var fig = geo.figures.elt(f);
      for (var g = 0; g < fig.segments.count; g++) {
        var seg = fig.segments.elt(g);
        var h;
        if (seg.type === go.PathSegment.Line) {
          h = this.makeResegmentHandle(selelt, fig, seg);
          if (h !== null) {
            h._typ = (g === 0) ? 4 : 5;
            h._fig = f;
            h._seg = g;
            adornment.add(h);
          }
        }
        if (seg.isClosed) {
          h = this.makeResegmentHandle(selelt, fig, seg);
          if (h !== null) {
            h._typ = 6;
            h._fig = f;
            h._seg = g;
            adornment.add(h);
          }
        }
      }
    }
  }

  // requires Path Geometry, checked above in updateAdornments
  for (var f = 0; f < geo.figures.count; f++) {
    var fig = geo.figures.elt(f);
    for (var g = 0; g < fig.segments.count; g++) {
      var seg = fig.segments.elt(g);
      var h;
      if (g === 0) {
        h = this.makeHandle(selelt, fig, seg);
        if (h !== null) {
          h._typ = 0;
          h._fig = f;
          h._seg = g;
          adornment.add(h);
        }
      }
      h = this.makeHandle(selelt, fig, seg);
      if (h !== null) {
        h._typ = 1;
        h._fig = f;
        h._seg = g;
        adornment.add(h);
      }
      if (seg.type === go.PathSegment.QuadraticBezier || seg.type === go.PathSegment.Bezier) {
        h = this.makeHandle(selelt, fig, seg);
        if (h !== null) {
          h._typ = 2;
          h._fig = f;
          h._seg = g;
          adornment.add(h);
        }
        if (seg.type === go.PathSegment.Bezier) {
          h = this.makeHandle(selelt, fig, seg);
          if (h !== null) {
            h._typ = 3;
            h._fig = f;
            h._seg = g;
            adornment.add(h);
          }
        }
      }
    }
  }
  adornment.category = this.name;
  adornment.adornedObject = selelt;
  return adornment;
};

/**
 * @this {GeometryReshapingTool}
 * @param {*} selelt
 * @param {*} fig
 * @param {*} seg
 * @returns
 */
GeometryReshapingTool.prototype.makeHandle = function(selelt, fig, seg) {
  var h = this.handleArchetype;
  if (h === null) return null;
  return h.copy();
};

/**
 * @this {GeometryReshapingTool}
 * @param {*} pathshape
 * @param {*} fig
 * @param {*} seg
 * @returns
 */
GeometryReshapingTool.prototype.makeResegmentHandle = function(pathshape, fig, seg) {
  var h = this.midHandleArchetype;
  if (h === null) return null;
  return h.copy();
}


/**
* @this {GeometryReshapingTool}
*/
GeometryReshapingTool.prototype.canStart = function() {
  if (!this.isEnabled) return false;

  var diagram = this.diagram;
  if (diagram === null || diagram.isReadOnly) return false;
  if (!diagram.allowReshape) return false;
  if (!diagram.lastInput.left) return false;
  var h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
  return (h !== null);
};

/**
* @this {GeometryReshapingTool}
*/
GeometryReshapingTool.prototype.doActivate = function() {
  var diagram = this.diagram;
  if (diagram === null) return;
  this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
  var h = this._handle;
  if (h === null) return;
  var shape = h.part.adornedObject;
  if (!shape) return;
  this._adornedShape = shape;
  diagram.isMouseCaptured = true;
  this.startTransaction(this.name);

  var typ = h._typ;
  var figi = h._fig;
  var segi = h._seg;
  if (this.isResegmenting && typ >= 4) {
    var locpt = shape.getLocalPoint(diagram.firstInput.documentPoint);
    var geo = shape.geometry.copy();
    var fig = geo.figures.elt(figi);
    var seg = fig.segments.elt(segi);
    var newseg = seg.copy();
    switch (typ) {
      case 4: {
        newseg.endX = (fig.startX + seg.endX) / 2;
        newseg.endY = (fig.startY + seg.endY) / 2;
        newseg.isClosed = false;
        fig.segments.insertAt(segi, newseg);
        break;
      }
      case 5: {
        var prevseg = fig.segments.elt(segi - 1);
        newseg.endX = (prevseg.endX + seg.endX) / 2;
        newseg.endY = (prevseg.endY + seg.endY) / 2;
        newseg.isClosed = false;
        fig.segments.insertAt(segi, newseg);
        break;
      }
      case 6: {
        newseg.endX = (fig.startX + seg.endX) / 2;
        newseg.endY = (fig.startY + seg.endY) / 2;
        newseg.isClosed = seg.isClosed;
        seg.isClosed = false;
        fig.add(newseg);
        break;
      }
    }
    shape.geometry = geo;  // modify the Shape
    var part = shape.part;
    part.ensureBounds();
    this.updateAdornments(part);  // update any Adornments of the Part
    this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    if (this._handle === null) {
      this.doDeactivate();  // need to rollback the transaction and not set .isActive
      return;
    }
  }

  this._originalGeometry = shape.geometry;
  this.isActive = true;
};

/**
* @this {GeometryReshapingTool}
*/
GeometryReshapingTool.prototype.doDeactivate = function() {
  this.stopTransaction();

  this._handle = null;
  this._adornedShape = null;
  var diagram = this.diagram;
  if (diagram !== null) diagram.isMouseCaptured = false;
  this.isActive = false;
};

/**
* @this {GeometryReshapingTool}
*/
GeometryReshapingTool.prototype.doCancel = function() {
  var shape = this._adornedShape;
  if (shape !== null) {
    // explicitly restore the original route, in case !UndoManager.isEnabled
    shape.geometry = this._originalGeometry;
  }
  this.stopTool();
};

/**
* @this {GeometryReshapingTool}
*/
GeometryReshapingTool.prototype.doMouseMove = function() {
  var diagram = this.diagram;
  if (this.isActive && diagram !== null) {
    var newpt = this.computeReshape(diagram.lastInput.documentPoint);
    this.reshape(newpt);
  }
};

/**
* @this {GeometryReshapingTool}
*/
GeometryReshapingTool.prototype.doMouseUp = function() {
  var diagram = this.diagram;
  if (this.isActive && diagram !== null) {
    var newpt = this.computeReshape(diagram.lastInput.documentPoint);
    this.reshape(newpt);
    var shape = this.adornedShape;
    if (this.isResegmenting) {
      var typ = this.handle._typ;
      var figi = this.handle._fig;
      var segi = this.handle._seg;
      var fig = shape.geometry.figures.elt(figi);
      if (fig && fig.segments.count > 2) {  // avoid making a degenerate polygon
        var ax, ay, bx, by, cx, cy;
        if (typ === 0) {
          var lastseg = fig.segments.length-1;
          ax = fig.segments.elt(lastseg).endX; ay = fig.segments.elt(lastseg).endY;
          bx = fig.startX; by = fig.startY;
          cx = fig.segments.elt(0).endX; cy = fig.segments.elt(0).endY;
        } else {
          if (segi <= 0) {
            ax = fig.startX; ay = fig.startY;
          } else {
            ax = fig.segments.elt(segi - 1).endX; ay = fig.segments.elt(segi - 1).endY;
          }
          bx = fig.segments.elt(segi).endX; by = fig.segments.elt(segi).endY;
          if (segi >= fig.segments.length-1) {
            cx = fig.startX; cy = fig.startY;
          } else {
            cx = fig.segments.elt(segi + 1).endX; cy = fig.segments.elt(segi + 1).endY;
          }
        }
        var q = new go.Point(bx, by);
        q.projectOntoLineSegment(ax, ay, cx, cy);
        // if B is within resegmentingDistance of the line from A to C,
        // and if Q is between A and C, remove that point from the geometry
        var dist = q.distanceSquaredPoint(new go.Point(bx, by));
        if (dist < this.resegmentingDistance * this.resegmentingDistance) {
          var geo = shape.geometry.copy();
          var fig = geo.figures.elt(figi);
          if (typ === 0) {
            var first = fig.segments.first();
            fig.startX = first.endX; fig.startY = first.endY;
          }
          if (segi > 0) {
            var prev = fig.segments.elt(segi - 1);
            var seg = fig.segments.elt(segi);
            prev.isClosed = seg.isClosed;
          }
          fig.segments.removeAt(segi);
          shape.geometry = geo;
          shape.part.removeAdornment(this.name);
          this.updateAdornments(shape.part);
        }
      }
    }
    this.transactionResult = this.name;  // success
  }
  this.stopTool();
};

/**
* @expose
* @this {GeometryReshapingTool}
* @param {Point} newPoint the value of the call to {@link #computeReshape}.
*/
GeometryReshapingTool.prototype.reshape = function(newPoint) {
  var shape = this.adornedShape;
  if (shape === null || shape.geometry === null) return;
  var locpt = shape.getLocalPoint(newPoint);
  var geo = shape.geometry.copy();
  var type = this.handle._typ;
  if (type === undefined) return;
  if (this.handle._fig >= geo.figures.count) return;
  var fig = geo.figures.elt(this.handle._fig);
  if (this.handle._seg >= fig.segments.count) return;
  var seg = fig.segments.elt(this.handle._seg);
  switch (type) {
    case 0: fig.startX = locpt.x; fig.startY = locpt.y; break;
    case 1: seg.endX = locpt.x; seg.endY = locpt.y; break;
    case 2: seg.point1X = locpt.x; seg.point1Y = locpt.y; break;
    case 3: seg.point2X = locpt.x; seg.point2Y = locpt.y; break;
  }
  var offset = geo.normalize();  // avoid any negative coordinates in the geometry
  shape.desiredSize = new go.Size(NaN, NaN); // clear the desiredSize so Geometry can determine size
  shape.geometry = geo;  // modify the Shape
  var part = shape.part;  // move the Part holding the Shape
  part.ensureBounds();
  if (part.locationObject !== shape && !part.locationSpot.equals(go.Spot.Center)) {  // but only if the locationSpot isn't Center
    // support the whole Node being rotated
    part.move(part.position.copy().subtract(offset.rotate(part.angle)));
  }
  this.updateAdornments(part);  // update any Adornments of the Part
  this.diagram.maybeUpdate();  // force more frequent drawing for smoother looking behavior
};


/**
* @expose
* @this {GeometryReshapingTool}
* @param {Point} p the point where the handle is being dragged.
* @return {Point}
*/
GeometryReshapingTool.prototype.computeReshape = function(p) {
  return p;  // no constraints on the points
};
