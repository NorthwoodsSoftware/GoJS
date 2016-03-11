"use strict";
/*
*  Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom DragSelectingTool for selecting and deselecting Parts during a drag.

/**
* @constructor
* @extends DragSelectingTool
* @class
* The RealtimeDragSelectingTool selects and deselects Parts within the {@link DragSelectingTool#box}
* during a drag, not just at the end of the drag.
*/
function RealtimeDragSelectingTool() {
  go.DragSelectingTool.call(this);
  this._originalSelection = null;
  this._temporarySelection = null;
}

go.Diagram.inherit(RealtimeDragSelectingTool, go.DragSelectingTool);

/**
* Remember the original collection of selected Parts.
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doActivate = function() {
  go.DragSelectingTool.prototype.doActivate.call(this);
  // keep a copy of the original Set of selected Parts
  this._originalSelection = this.diagram.selection.copy();
  // these Part.isSelected may have been temporarily modified
  this._temporarySelection = new go.Set(go.Part);
};

/**
* Release any references to selected Parts.
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doDeactivate = function() {
  this._originalSelection = null;
  this._temporarySelection = null;
  go.DragSelectingTool.prototype.doDeactivate.call(this);
};

/**
* Restore the selection which may have been modified during a drag.
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doCancel = function() {
  var orig = this._originalSelection;
  if (orig !== null) {
    orig.each(function(p) { p.isSelected = true; });
    this._temporarySelection.each(function(p) { if (!orig.contains(p)) p.isSelected = false; });
  }
  go.DragSelectingTool.prototype.doCancel.call(this);
};

/**
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doMouseMove = function() {
  if (this.isActive) {
    go.DragSelectingTool.prototype.doMouseMove.call(this);
    this.selectInRect(this.computeBoxBounds());
  }
};

/**
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doKeyDown = function() {
  if (this.isActive) {
    go.DragSelectingTool.prototype.doKeyDown.call(this);
    this.selectInRect(this.computeBoxBounds());
  }
};

/**
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doKeyUp = function() {
  if (this.isActive) {
    go.DragSelectingTool.prototype.doKeyUp.call(this);
    this.selectInRect(this.computeBoxBounds());
  }
};

/**
* @expose
* @this {RealtimeDragSelectingTool}
* @param {Rect} r a rectangular bounds in document coordinates.
*/
RealtimeDragSelectingTool.prototype.selectInRect = function(r) {
  var diagram = this.diagram;
  var orig = this._originalSelection;
  var temp = this._temporarySelection;
  if (diagram === null || orig === null) return;
  var e = diagram.lastInput;
  diagram.raiseDiagramEvent("ChangingSelection");
  var found = diagram.findObjectsIn(r, null,
                                    function(p) { return (p instanceof go.Part) && p.canSelect(); },
                                    this.isPartialInclusion,
                                    new go.Set(go.Part));
  if (e.control || e.meta) {  // toggle or deselect
    if (e.shift) {  // deselect only
      temp.each(function(p) { if (!found.contains(p)) p.isSelected = orig.contains(p); });
      found.each(function(p) { p.isSelected = false; temp.add(p); });
    } else {  // toggle selectedness of parts based on _originalSelection
      temp.each(function(p) { if (!found.contains(p)) p.isSelected = orig.contains(p); });
      found.each(function(p) { p.isSelected = !orig.contains(p); temp.add(p); });
    }
  } else if (e.shift) {  // extend selection only
    temp.each(function(p) { if (!found.contains(p)) p.isSelected = orig.contains(p); });
    found.each(function(p) { p.isSelected = true; temp.add(p); });
  } else {  // select found parts, and unselect all other previously selected parts
    temp.each(function(p) { if (!found.contains(p)) p.isSelected = false; });
    orig.each(function(p) { if (!found.contains(p)) p.isSelected = false; });
    found.each(function(p) { p.isSelected = true; temp.add(p); });
  }
  diagram.raiseDiagramEvent("ChangedSelection");
};
