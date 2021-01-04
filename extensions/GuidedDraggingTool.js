"use strict";
/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends DraggingTool
* @class
* This draggingTool class makes guidelines visible as the parts are dragged around a diagram
* when the selected part is nearly aligned with another part.
*/
function GuidedDraggingTool() {
  go.DraggingTool.call(this);

  // temporary parts for horizonal guidelines
  var $ = go.GraphObject.make;
  var partProperties = { layerName: "Tool", isInDocumentBounds: false };
  var shapeProperties = { stroke: "gray", isGeometryPositioned: true };
  /** @ignore */
  this.guidelineHtop =
      $(go.Part, partProperties,
          $(go.Shape, shapeProperties, { geometryString: "M0 0 100 0" }));
  /** @ignore */
  this.guidelineHbottom =
      $(go.Part, partProperties,
          $(go.Shape, shapeProperties, { geometryString: "M0 0 100 0" }));
  /** @ignore */
  this.guidelineHcenter =
      $(go.Part, partProperties,
          $(go.Shape, shapeProperties, { geometryString: "M0 0 100 0" }));
  // temporary parts for vertical guidelines
  /** @ignore */
  this.guidelineVleft =
      $(go.Part, partProperties,
          $(go.Shape, shapeProperties, { geometryString: "M0 0 0 100" }));
  /** @ignore */
  this.guidelineVright =
      $(go.Part, partProperties,
          $(go.Shape, shapeProperties, { geometryString: "M0 0 0 100" }));
  /** @ignore */
  this.guidelineVcenter =
      $(go.Part, partProperties,
          $(go.Shape, shapeProperties, { geometryString: "M0 0 0 100" }));

  // properties that the programmer can modify
  /** @type {number} */
  this._guidelineSnapDistance = 6;
  /** @type {boolean} */
  this._isGuidelineEnabled = true;
  /** @type {string} */
  this._horizontalGuidelineColor = "gray";
  /** @type {string} */
  this._verticalGuidelineColor = "gray";
  /** @type {string} */
  this._centerGuidelineColor = "gray";
  /** @type {number} */
  this._guidelineWidth = 1;
  /** @type {number} */
  this._searchDistance = 1000;
  /** @type {boolean} */
  this._isGuidelineSnapEnabled = true;
}
go.Diagram.inherit(GuidedDraggingTool, go.DraggingTool);

/**
* Removes all of the guidelines from the grid.
* @this {GuidedDraggingTool}
*/
GuidedDraggingTool.prototype.clearGuidelines = function() {
  this.diagram.remove(this.guidelineHbottom);
  this.diagram.remove(this.guidelineHcenter);
  this.diagram.remove(this.guidelineHtop);
  this.diagram.remove(this.guidelineVleft);
  this.diagram.remove(this.guidelineVright);
  this.diagram.remove(this.guidelineVcenter);
}

/**
* Calls the base method from {@link DraggingTool#doDeactivate}
* and removes the guidelines from the graph.
* @this {GuidedDraggingTool}
*/
GuidedDraggingTool.prototype.doDeactivate = function() {
  go.DraggingTool.prototype.doDeactivate.call(this);
  // clear any guidelines when dragging is done
  this.clearGuidelines();
};

GuidedDraggingTool.prototype.doDragOver = function(pt, obj) {
  // clear all existing guidelines in case either show... method decides to show a guideline
  this.clearGuidelines();

  // gets the selected part
  var partItr = (this.copiedParts || this.draggedParts).iterator;
  if (partItr.next()) {
    var part = partItr.key;

    this.showHorizontalMatches(part, this.isGuidelineEnabled, false);
    this.showVerticalMatches(part, this.isGuidelineEnabled, false);
  }
}

/**
* On a mouse-up, snaps the selected part to the nearest guideline.
* If not snapping, the part remains at its position.
* This calls {@link #guidelineSnap}.
* @this {GuidedDraggingTool}
*/
GuidedDraggingTool.prototype.doDropOnto = function(pt, obj) {
  this.clearGuidelines();
  // gets the selected (perhaps copied) Part
  var partItr = (this.copiedParts || this.draggedParts).iterator;
  if (partItr.next()) {
    var part = partItr.key;

    // snaps only when the mouse is released without shift modifier
    var e = this.diagram.lastInput;
    var snap = this.isGuidelineSnapEnabled && !e.shift;

    this.showHorizontalMatches(part, false, snap);  // false means don't show guidelines
    this.showVerticalMatches(part, false, snap);
  }
}

/**
* When nodes are shifted due to being guided upon a drop, make sure all connected link routes are invalidated,
* since the node is likely to have moved a different amount than all its connected links in the regular
* operation of the DraggingTool.
* @this {GuidedDraggingTool}
*/
GuidedDraggingTool.prototype.invalidateLinks = function(node) {
  if (node instanceof go.Node) node.invalidateConnectedLinks();
}

/**
 * This predicate decides whether or not the given Part should guide the dragged part.
 * @param {Part} part  a stationary Part to which the dragged part might be aligned
 * @param {Part} guidedpart  the Part being dragged
 */
GuidedDraggingTool.prototype.isGuiding = function(part, guidedpart) {
  return part instanceof go.Part &&
         !part.isSelected &&
         !(part instanceof go.Link) &&
         guidedpart instanceof go.Part &&
         part.containingGroup === guidedpart.containingGroup &&
         !part.layer.isTemporary;
}

/**
* This finds parts that are aligned near the selected part along horizontal lines. It compares the selected
* part to all parts within a rectangle approximately twice the {@link #searchDistance} wide.
* The guidelines appear when a part is aligned within a margin-of-error equal to {@link #guidelineSnapDistance}.
* The parameters used for {@link #guidelineSnap} are also set here.
* @this {GuidedDraggingTool}
* @param {Part} part
* @param {boolean} guideline if true, show guideline
* @param {boolean} snap if true, snap the part to where the guideline would be
*/
GuidedDraggingTool.prototype.showHorizontalMatches = function(part, guideline, snap) {
  var objBounds = part.locationObject.getDocumentBounds();
  var p0 = objBounds.y;
  var p1 = objBounds.y + objBounds.height/2;
  var p2 = objBounds.y + objBounds.height;

  var marginOfError = this.guidelineSnapDistance;
  var distance = this.searchDistance;
  // compares with parts (or location objects) within narrow vertical area
  var area = objBounds.copy();
  area.inflate(distance, marginOfError + 1);
  var tool = this;
  var otherParts = this.diagram.findObjectsIn(area,
      function(obj) { return obj.part; },
      function(other) { return tool.isGuiding(other, part); },
      true);

  var bestDiff = marginOfError;
  var bestPart = null;
  var bestSpot;
  var bestOtherSpot;
  // horizontal line -- comparing y-values
  otherParts.each(function(other) {
    if (other === part) return; // ignore itself

    var otherBounds = other.locationObject.getDocumentBounds();
    var q0 = otherBounds.y;
    var q1 = otherBounds.y + otherBounds.height/2;
    var q2 = otherBounds.y + otherBounds.height;

    // compare center with center of OTHER part
    if (Math.abs(p1 - q1) < bestDiff) { bestDiff = Math.abs(p1 - q1); bestPart = other; bestSpot = go.Spot.Center; bestOtherSpot = go.Spot.Center; }

    // compare top side with top and bottom sides of OTHER part
    if (Math.abs(p0-q0) < bestDiff) { bestDiff = Math.abs(p0-q0); bestPart = other; bestSpot = go.Spot.Top; bestOtherSpot = go.Spot.Top; }
    else if (Math.abs(p0-q2) < bestDiff) { bestDiff = Math.abs(p0-q2); bestPart = other; bestSpot = go.Spot.Top; bestOtherSpot = go.Spot.Bottom; }

    // compare bottom side with top and bottom sides of OTHER part
    if (Math.abs(p2-q0) < bestDiff) { bestDiff = Math.abs(p2-q0); bestPart = other; bestSpot = go.Spot.Bottom; bestOtherSpot = go.Spot.Top; }
    else if (Math.abs(p2-q2) < bestDiff) { bestDiff = Math.abs(p2-q2); bestPart = other; bestSpot = go.Spot.Bottom; bestOtherSpot = go.Spot.Bottom; }
  });

  if (bestPart !== null) {
    var offsetX = objBounds.x - part.actualBounds.x;
    var offsetY = objBounds.y - part.actualBounds.y;
    var bestBounds = bestPart.locationObject.getDocumentBounds();
    // line extends from x0 to x2
    var x0 = Math.min(objBounds.x, bestBounds.x) - 10;
    var x2 = Math.max(objBounds.x + objBounds.width, bestBounds.x + bestBounds.width) + 10;
    // find bestPart's desired Y
    var bestPoint = new go.Point().setRectSpot(bestBounds, bestOtherSpot);
    if (bestSpot === go.Spot.Center) {
      if (snap) {
        // call Part.move in order to automatically move member Parts of Groups
        part.move(new go.Point(objBounds.x - offsetX, bestPoint.y - objBounds.height / 2 - offsetY));
        this.invalidateLinks(part);
      }
      if (guideline) {
        this.guidelineHcenter.position = new go.Point(x0, bestPoint.y);
        this.guidelineHcenter.elt(0).width = x2 - x0;
        this.diagram.add(this.guidelineHcenter);
      }
    } else if (bestSpot === go.Spot.Top) {
      if (snap) {
        part.move(new go.Point(objBounds.x - offsetX, bestPoint.y - offsetY));
        this.invalidateLinks(part);
      }
      if (guideline) {
        this.guidelineHtop.position = new go.Point(x0, bestPoint.y);
        this.guidelineHtop.elt(0).width = x2 - x0;
        this.diagram.add(this.guidelineHtop);
      }
    } else if (bestSpot === go.Spot.Bottom) {
      if (snap) {
        part.move(new go.Point(objBounds.x - offsetX, bestPoint.y - objBounds.height - offsetY));
        this.invalidateLinks(part);
      }
      if (guideline) {
        this.guidelineHbottom.position = new go.Point(x0, bestPoint.y);
        this.guidelineHbottom.elt(0).width = x2 - x0;
        this.diagram.add(this.guidelineHbottom);
      }
    }
  }
}

/**
* This finds parts that are aligned near the selected part along vertical lines. It compares the selected
* part to all parts within a rectangle approximately twice the {@link #searchDistance} tall.
* The guidelines appear when a part is aligned within a margin-of-error equal to {@link #guidelineSnapDistance}.
* The parameters used for {@link #guidelineSnap} are also set here.
* @this {GuidedDraggingTool}
* @param {Part} part
* @param {boolean} guideline if true, show guideline
* @param {boolean} snap if true, don't show guidelines but just snap the part to where the guideline would be
*/
GuidedDraggingTool.prototype.showVerticalMatches = function(part, guideline, snap) {
  var objBounds = part.locationObject.getDocumentBounds();
  var p0 = objBounds.x;
  var p1 = objBounds.x + objBounds.width/2;
  var p2 = objBounds.x + objBounds.width;

  var marginOfError = this.guidelineSnapDistance;
  var distance = this.searchDistance;
  // compares with parts within narrow vertical area
  var area = objBounds.copy();
  area.inflate(marginOfError + 1, distance);
  var tool = this;
  var otherParts = this.diagram.findObjectsIn(area,
      function(obj) { return obj.part; },
      function(other) { return tool.isGuiding(other, part); },
      true);

  var bestDiff = marginOfError;
  var bestPart = null;
  var bestSpot;
  var bestOtherSpot;
  // vertical line -- comparing x-values
  otherParts.each(function(other) {
    if (other === part) return; // ignore itself

    var otherBounds = other.locationObject.getDocumentBounds();
    var q0 = otherBounds.x;
    var q1 = otherBounds.x + otherBounds.width/2;
    var q2 = otherBounds.x + otherBounds.width;

    // compare center with center of OTHER part
    if (Math.abs(p1 - q1) < bestDiff) { bestDiff = Math.abs(p1 - q1); bestPart = other; bestSpot = go.Spot.Center; bestOtherSpot = go.Spot.Center; }

    // compare left side with left and right sides of OTHER part
    if (Math.abs(p0-q0) < bestDiff) { bestDiff = Math.abs(p0-q0); bestPart = other; bestSpot = go.Spot.Left; bestOtherSpot = go.Spot.Left; }
    else if (Math.abs(p0-q2) < bestDiff) { bestDiff = Math.abs(p0-q2); bestPart = other; bestSpot = go.Spot.Left; bestOtherSpot = go.Spot.Right; }

    // compare right side with left and right sides of OTHER part
    if (Math.abs(p2-q0) < bestDiff) { bestDiff = Math.abs(p2-q0); bestPart = other; bestSpot = go.Spot.Right; bestOtherSpot = go.Spot.Left; }
    else if (Math.abs(p2-q2) < bestDiff) { bestDiff = Math.abs(p2-q2); bestPart = other; bestSpot = go.Spot.Right; bestOtherSpot = go.Spot.Right; }
  });

  if (bestPart !== null) {
    var offsetX = objBounds.x - part.actualBounds.x;
    var offsetY = objBounds.y - part.actualBounds.y;
    var bestBounds = bestPart.locationObject.getDocumentBounds();
    // line extends from y0 to y2
    var y0 = Math.min(objBounds.y, bestBounds.y) - 10;
    var y2 = Math.max(objBounds.y + objBounds.height, bestBounds.y + bestBounds.height) + 10;
    // find bestPart's desired X
    var bestPoint = new go.Point().setRectSpot(bestBounds, bestOtherSpot);
    if (bestSpot === go.Spot.Center) {
      if (snap) {
        // call Part.move in order to automatically move member Parts of Groups
        part.move(new go.Point(bestPoint.x - objBounds.width / 2 - offsetX, objBounds.y - offsetY));
        this.invalidateLinks(part);
      }
      if (guideline) {
        this.guidelineVcenter.position = new go.Point(bestPoint.x, y0);
        this.guidelineVcenter.elt(0).height = y2 - y0;
        this.diagram.add(this.guidelineVcenter);
      }
    } else if (bestSpot === go.Spot.Left) {
      if (snap) {
        part.move(new go.Point(bestPoint.x - offsetX, objBounds.y - offsetY));
        this.invalidateLinks(part);
      }
      if (guideline) {
        this.guidelineVleft.position = new go.Point(bestPoint.x, y0);
        this.guidelineVleft.elt(0).height = y2 - y0;
        this.diagram.add(this.guidelineVleft);
      }
    } else if (bestSpot === go.Spot.Right) {
      if (snap) {
        part.move(new go.Point(bestPoint.x - objBounds.width - offsetX, objBounds.y - offsetY));
        this.invalidateLinks(part);
      }
      if (guideline) {
        this.guidelineVright.position = new go.Point(bestPoint.x, y0);
        this.guidelineVright.elt(0).height = y2 - y0;
        this.diagram.add(this.guidelineVright);
      }
    }
  }
}

/**
* Gets or sets the margin of error for which guidelines show up.
* The default value is 6.
* Guidelines will show up when the aligned nods are ± 6px away from perfect alignment.
* @name GuidedDraggingTool#guidelineSnapDistance

* @return {number}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "guidelineSnapDistance", {
    get: function() { return this._guidelineSnapDistance; },
    set: function(val) {
        if (typeof val !== "number" || isNaN(val) || val < 0) throw new Error("new value for GuidedDraggingTool.guidelineSnapDistance must be a non-negative number.");
        if (this._guidelineSnapDistance !== val) {
          this._guidelineSnapDistance = val;
        }
    }
});

/**
* Gets or sets whether the guidelines are enabled or disable.
* The default value is true.
* @name GuidedDraggingTool#isGuidelineEnabled

* @return {boolean}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "isGuidelineEnabled", {
    get: function() { return this._isGuidelineEnabled; },
    set: function(val) {
        if (typeof val !== "boolean") throw new Error("new value for GuidedDraggingTool.isGuidelineEnabled must be a boolean value.");
        if (this._isGuidelineEnabled !== val) {
          this._isGuidelineEnabled = val;
        }
    }
});

/**
* Gets or sets the color of horizontal guidelines.
* The default value is "gray".
* @name GuidedDraggingTool#horizontalGuidelineColor

* @return {string}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "horizontalGuidelineColor", {
    get: function() { return this._horizontalGuidelineColor; },
    set: function(val) {
        if (this._horizontalGuidelineColor !== val) {
          this._horizontalGuidelineColor = val;
          this.guidelineHbottom.elements.first().stroke = this._horizontalGuidelineColor;
          this.guidelineHtop.elements.first().stroke = this._horizontalGuidelineColor;
        }
    }
});

/**
* Gets or sets the color of vertical guidelines.
* The default value is "gray".
* @name GuidedDraggingTool#verticalGuidelineColor

* @return {string}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "verticalGuidelineColor", {
    get: function() { return this._verticalGuidelineColor; },
    set: function(val) {
        if (this._verticalGuidelineColor !== val) {
          this._verticalGuidelineColor = val;
          this.guidelineVleft.elements.first().stroke = this._verticalGuidelineColor;
          this.guidelineVright.elements.first().stroke = this._verticalGuidelineColor;
        }
    }
});

/**
* Gets or sets the color of center guidelines.
* The default value is "gray".
* @name GuidedDraggingTool#centerGuidelineColor

* @return {string}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "centerGuidelineColor", {
    get: function() { return this._centerGuidelineColor; },
    set: function(val) {
        if (this._centerGuidelineColor !== val) {
          this._centerGuidelineColor = val;
          this.guidelineVcenter.elements.first().stroke = this._centerGuidelineColor;
          this.guidelineHcenter.elements.first().stroke = this._centerGuidelineColor;
        }
    }
});

/**
* Gets or sets the width guidelines.
* The default value is 1.
* @name GuidedDraggingTool#guidelineWidth

* @return {number}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "guidelineWidth", {
    get: function() { return this._guidelineWidth; },
    set: function(val) {
        if (typeof val !== "number" || isNaN(val) || val < 0) throw new Error("New value for GuidedDraggingTool.guidelineWidth must be a non-negative number.");
        if (this._guidelineWidth !== val) {
          this._guidelineWidth = val;
          this.guidelineVcenter.elements.first().strokeWidth = val;
          this.guidelineHcenter.elements.first().strokeWidth = val;
          this.guidelineVleft.elements.first().strokeWidth = val;
          this.guidelineVright.elements.first().strokeWidth = val;
          this.guidelineHbottom.elements.first().strokeWidth = val;
          this.guidelineHtop.elements.first().strokeWidth = val;
        }
    }
});
/**
* Gets or sets the distance around the selected part to search for aligned parts.
* The default value is 1000.
* Set this to Infinity if you want to search the entire diagram no matter how far away.
* @name GuidedDraggingTool#searchDistance

* @return {number}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "searchDistance", {
    get: function() { return this._searchDistance; },
    set: function(val) {
        if (typeof val !== "number" || isNaN(val) || val <= 0) throw new Error("new value for GuidedDraggingTool.searchDistance must be a positive number.");
        if (this._searchDistance !== val) {
          this._searchDistance = val;
        }
    }
});

/**
* Gets or sets whether snapping to guidelines is enabled.
* The default value is true.
* @name GuidedDraggingTool#isGuidelineSnapEnabled

* @return {Boolean}
*/
Object.defineProperty(GuidedDraggingTool.prototype, "isGuidelineSnapEnabled", {
    get: function() { return this._isGuidelineSnapEnabled; },
    set: function(val) {
        if (typeof val !== "boolean") throw new Error("new value for GuidedDraggingTool.isGuidelineSnapEnabled must be a boolean.");
        if (this._isGuidelineSnapEnabled !== val) {
          this._isGuidelineSnapEnabled = val;
        }
    }
});
