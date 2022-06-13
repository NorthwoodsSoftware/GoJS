/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/**
 * The OverviewResizingTool class lets the user resize the box within an overview.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/OverviewResizing.html">Overview Resizing</a> sample.
 * @constructor
 * @extends ResizingTool
 * @class
 */
function OverviewResizingTool() {
  go.ResizingTool.call(this);
  this.name = 'OverviewResizing';
  this._handleSize = new go.Size(6, 6);
}
go.Diagram.inherit(OverviewResizingTool, go.ResizingTool);

/**
 * @this {OverviewResizingTool}
 * @param {Shape} resizeBox the overview box which may be resized
 * @return {Adornment}
 */
OverviewResizingTool.prototype.makeAdornment = function(resizeBox) {
  this._handleSize.setTo(resizeBox.strokeWidth * 3, resizeBox.strokeWidth * 3);
  // Set up the resize adornment
  var ad = new go.Adornment();
  ad.type = go.Panel.Spot;
  ad.locationSpot = go.Spot.Center;
  var ph = new go.Placeholder();
  ph.isPanelMain = true;
  ad.add(ph);
  var hnd = new go.Shape();
  hnd.name = 'RSZHND';
  hnd.figure = 'Rectangle';
  hnd.desiredSize = this._handleSize;
  hnd.cursor = 'se-resize';
  hnd.alignment = go.Spot.BottomRight;
  hnd.alignmentFocus = go.Spot.Center;
  ad.add(hnd);
  ad.adornedObject = resizeBox;
  return ad;
};

/**
 * @hidden @internal
 * Keep the resize handle properly sized as the scale is changing.
 * This overrides an undocumented method on the ResizingTool.
 * @this {OverviewResizingTool}
 * @param {GraphObject} elt
 * @param {number} angle
 */
OverviewResizingTool.prototype.updateResizeHandles = function(elt, angle) {
  if (elt === null) return;
  var handle = elt.findObject('RSZHND');
  var box = elt.adornedObject;
  this._handleSize.setTo(box.strokeWidth * 3, box.strokeWidth * 3);
  handle.desiredSize = this._handleSize;
}

/**
 * Overrides {@link ResizingTool#resize} to resize the overview box via setting the observed diagram's scale.
 * @this {OverviewResizingTool}
 * @param {Rect} newr the intended new rectangular bounds the overview box.
 */
OverviewResizingTool.prototype.resize = function(newr) {
  var overview = this.diagram;
  var observed = overview.observed;
  if (observed === null)
      return;
  var oldr = observed.viewportBounds.copy();
  var oldscale = observed.scale;
  if (oldr.width !== newr.width || oldr.height !== newr.height) {
      if (newr.width > 0 && newr.height > 0) {
          observed.scale = Math.min(oldscale * oldr.width / newr.width, oldscale * oldr.height / newr.height);
      }
  }
};

