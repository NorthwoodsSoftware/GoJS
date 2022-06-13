"use strict";
/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom DraggingTool for dragging an image instead of actually moving any selected nodes,
// until the mouse-up event.

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends DraggingTool
* @class
*/
function NonRealtimeDraggingTool() {
  go.DraggingTool.call(this);
  this._duration = 0;  // duration of movement animation; <= 0 to disable
  /** @type {Part} */
  this._imagePart = null;  // a Part holding a translucent image of what would be dragged
  /** @type {Map.<Part,DraggingInfo>} */
  this._ghostDraggedParts = null;  // a Map of the _imagePart and its dragging information
  /** @type {Map.<Part,DraggingInfo>} */
  this._originalDraggedParts = null;  // the saved normal value of DraggingTool.draggedParts
}
go.Diagram.inherit(NonRealtimeDraggingTool, go.DraggingTool);

/**
* Gets or sets how long the movement animation should be to move the actual parts upon a mouse-up.
* The default value is zero -- there is no animation of the movement.
* @this {NonRealtimeDraggingTool}
* @return {number}
*/
Object.defineProperty(NonRealtimeDraggingTool.prototype, "duration", {
  get: function() { return this._duration; },
  set: function(val) { this._duration = val; }
});

/**
* Call the base method, and then make an image of the returned collection,
* show it using a Picture, and hold the Picture in a temporary Part, as _imagePart.
* @this {NonRealtimeDraggingTool}
* @param {Iterable.<Part>} parts A {@link Set} or {@link List} of {@link Part}s.
* @return {Map.<Part,DraggingInfo>}
*/
NonRealtimeDraggingTool.prototype.computeEffectiveCollection = function(coll) {
  var map = go.DraggingTool.prototype.computeEffectiveCollection.call(this, coll);
  if (this.isActive && this._imagePart === null) {
    var bounds = this.diagram.computePartsBounds(map.toKeySet());
    var offset = this.diagram.lastInput.documentPoint.copy().subtract(bounds.position);
    var $ = go.GraphObject.make;
    this._imagePart =
      $(go.Part,
        { layerName: "Tool", opacity: 0.5, locationSpot: new go.Spot(0, 0, offset.x, offset.y) },
        $(go.Picture,
          { element: this.diagram.makeImage({ parts: map.toKeySet() }) })
      );
  }
  return map;
};

/**
* When activated, replace the DraggingTool.draggedParts with the _ghostDraggedParts, which
* consists of just one Part, the _imagePart, added to the Diagram at the current mouse point.
* @this {NonRealtimeDraggingTool}
*/
NonRealtimeDraggingTool.prototype.doActivate = function() {
  go.DraggingTool.prototype.doActivate.call(this);
  if (this._imagePart !== null) {
    this._imagePart.location = this.diagram.lastInput.documentPoint;
    this.diagram.add(this._imagePart);
    this._originalDraggedParts = this.draggedParts;
    this._ghostDraggedParts = go.DraggingTool.prototype.computeEffectiveCollection.call(this,
                                                         new go.List().add(this._imagePart));
    this.draggedParts = this._ghostDraggedParts;
  }
};

/**
* When deactivated, make sure any _imagePart is removed from the Diagram and all references are cleared out.
* @this {NonRealtimeDraggingTool}
*/
NonRealtimeDraggingTool.prototype.doDeactivate = function() {
  if (this._imagePart !== null) {
    this.diagram.remove(this._imagePart);
  }
  this._imagePart = null;
  this._ghostDraggedParts = null;
  this._originalDraggedParts = null;
  go.DraggingTool.prototype.doDeactivate.call(this);
};

/**
* Do the normal mouse-up behavior, but only after restoring DraggingTool.draggedParts.
* @this {NonRealtimeDraggingTool}
*/
NonRealtimeDraggingTool.prototype.doMouseUp = function() {
  var partsmap = this._originalDraggedParts;
  if (partsmap !== null) {
    this.draggedParts = partsmap;
  }
  go.DraggingTool.prototype.doMouseUp.call(this);
  if (partsmap !== null && this.duration > 0) {
    var anim = new go.Animation();
    anim.duration = this.duration;
    partsmap.each(function(kvp) {
      var part = kvp.key;
      anim.add(part, "location", kvp.value.point, part.location);
    });
    anim.start();
  }
};

/**
* If the user changes to "copying" mode by holding down the Control key,
* return to the regular behavior and remove the _imagePart.
* @this {NonRealtimeDraggingTool}
*/
NonRealtimeDraggingTool.prototype.doKeyDown = function() {
  if (this._imagePart !== null && this._originalDraggedParts !== null &&
      (this.diagram.lastInput.control || this.diagram.lastInput.meta) && this.mayCopy()) {
    this.draggedParts = this._originalDraggedParts;
    this.diagram.remove(this._imagePart);
  }
  go.DraggingTool.prototype.doKeyDown.call(this);
};

/**
* If the user changes back to "moving" mode,
* show the _imagePart again and go back to dragging the _ghostDraggedParts.
* @this {NonRealtimeDraggingTool}
*/
NonRealtimeDraggingTool.prototype.doKeyUp = function() {
  if (this._imagePart !== null && this._ghostDraggedParts !== null && this.mayMove()) {
    this._imagePart.location = this.diagram.lastInput.documentPoint;
    this.diagram.add(this._imagePart);
    this.draggedParts = this._ghostDraggedParts;
  }
  go.DraggingTool.prototype.doKeyUp.call(this);
};
