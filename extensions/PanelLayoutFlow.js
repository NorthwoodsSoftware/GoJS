"use strict";
/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* A custom {@link PanelLayout} that arranges panel elements in rows or columns.
* A typical use might be:
* <pre>
* $(go.Node,
*   ...
*   $(go.Panel, "Flow",
*     ... the elements to be laid out in rows with no space between them ...
*   )
*   ...
* )
* </pre>
* A customized use might be:
* <pre>
* $(go.Node,
*   ...
*   $(go.Panel,
*     $(PanelLayoutFlow, { spacing: new go.Size(5, 5), direction: 90 }),
*     { defaultAlignment: go.Spot.Left },
*     ... the elements to be laid out in columns downwards,
*         each column aligned on the left side...
*   )
*   ...
* )
* </pre>
*
* The {@link #direction} property determines whether the elements are arranged in rows (if 0 or 180)
* or in columns (if 90 or 270).
*
* Use the {@link #spacing} property to control how much space there is between elements in a row or column
* as well as between rows or columns.
*
* This layout respects the {@link GraphObject#visible}, {@link GraphObject#stretch},
* and {@link GraphObject#alignment} properties on each element, along with the Panel's
* {@link Panel#defaultStretch}, {@link Panel#defaultAlignment}, and {@link Panel#padding} properties.
*
* If you want elements in <i>both</i> rows and columns, use a "Table" Panel.
*/
function PanelLayoutFlow() {
  go.PanelLayout.call(this);
  this.name = "Flow";
  this._direction = 0;  // only 0 or 180 (rows) or 90 or 270 (columns)
  this._spacing = new go.Size(0, 0);
  // these need to go as the Panel.panelLayoutState, because they are computed by measure and later used by arrange
  // lineBreadths = []; // row height or column width, excluding spacing
  // lineLengths = [];  // line length, excluding padding and external spacing
}
go.Diagram.inherit(PanelLayoutFlow, go.PanelLayout);

/**
 * Gets or sets the initial direction in which elements are laid out.
 * The value must be 0 or 180, which results in rows, or 90 or 270, which results in columns.
 *
 * The default value is 0, resulting in rows that go rightward.
 * A value of 90 results in columns that go downward.
 *
 * Setting this property does not notify about any changed event,
 * nor does a change in value automatically cause the panel layout to be performed again.
 */
Object.defineProperty(PanelLayoutFlow.prototype, "direction", {
  get: function() { return this._direction; },
  set: function(d) {
    if (d !== 0 && d !== 90 && d !== 180 && d !== 270) throw new Error("bad direction for PanelLayoutFlow: " + d);
    this._direction = d;
  }
});

/**
 * Gets or sets the space between adjacent elements in the panel and the space between adjacent rows or columns.
 *
 * The default value is (0, 0).  The size is in the panel's coordinate system.
 *
 * Setting this property does not notify about any changed event,
 * nor does a change in value automatically cause the panel layout to be performed again.
 */
Object.defineProperty(PanelLayoutFlow.prototype, "spacing", {
  get: function() { return this._spacing; },
  set: function(s) { this._spacing = s; }
});

PanelLayoutFlow.prototype.measure = function(panel, width, height, elements, union, minw, minh) {
  var lineBreadths = [];  // attach properties on panel
  var lineLengths = [];
  panel.panelLayoutState = { lineBreadths: lineBreadths, lineLengths: lineLengths };
  var pad = panel.padding;
  var wrapx = width + pad.left;  // might be Infinity
  var wrapy = height + pad.top;
  var x = pad.left;  // account for padding
  var y = pad.top;
  var xstart = x;  // remember start
  var ystart = y;
  // assume that measuring is the same for either direction
  if (this.direction === 0 || this.direction === 180) {
    var maxx = x;  // track total width
    var rowh = 0;  // compute row height
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      if (!elem.visible) continue;
      this.measureElement(elem, Infinity, height, minw, minh);
      var mb = elem.measuredBounds;
      var marg = elem.margin;
      var gw = marg.left + mb.width + marg.right;  // gross size including margins
      var gh = marg.top + mb.height + marg.bottom;
      if (x + gw > wrapx && i > 0) {  // next row
        lineBreadths.push(rowh);  // remember previous row info
        lineLengths.push(x - pad.left);
        y += rowh + this.spacing.height;  // advance x and y
        if (y + gh <= wrapy) {  // next row fits???
          x = xstart + gw + this.spacing.width;
          rowh = gh;
        } else {  // clipped, assume zero size
          x = xstart;
          rowh = 0;
          break;
        }
      } else {  // advance x
        x += gw + this.spacing.width;
        rowh = Math.max(rowh, gh);
      }
      maxx = Math.max(maxx, x);
    }
    lineBreadths.push(rowh);
    lineLengths.push(x - pad.left);
    union.width = Math.max(0, Math.min(maxx, wrapx) - pad.left);  // don't add padding to union
    union.height = Math.max(0, y + rowh - pad.top);
  } else if (this.direction === 90 || this.direction === 270) {
    var maxy = y;
    var colw = 0;
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      if (!elem.visible) continue;
      this.measureElement(elem, width, Infinity, minw, minh);
      var mb = elem.measuredBounds;
      var marg = elem.margin;
      var gw = marg.left + mb.width + marg.right;
      var gh = marg.top + mb.height + marg.bottom;
      if (y + gh > wrapy && i > 0) {
        lineBreadths.push(colw);
        lineLengths.push(y - pad.top);
        x += colw + this.spacing.width;
        if (x + gw <= wrapx) {
          y = ystart + gh + this.spacing.height;
          colw = gw;
        } else {
          y = ystart;
          colw = 0;
          break;
        }
      } else {
        y += gh + this.spacing.height;
        colw = Math.max(colw, gw);
      }
      maxy = Math.max(maxy, y);
    }
    lineBreadths.push(colw);
    lineLengths.push(y - pad.top);
    union.width = Math.max(0, x + colw - pad.left);
    union.height = Math.max(0, Math.min(maxy, wrapy) - pad.top);
  }
}

PanelLayoutFlow.prototype.isStretched = function(horiz, elt, panel) {
  var s = elt.stretch;
  if (s === go.GraphObject.Default) s = panel.defaultStretch;
  if (s === go.GraphObject.Fill) return true;
  return s === (horiz ? go.GraphObject.Vertical : go.GraphObject.Horizontal);
}

PanelLayoutFlow.prototype.align = function(elt, panel) {
  var a = elt.alignment;
  if (a.isDefault()) a = panel.defaultAlignment;
  if (!a.isSpot()) a = go.Spot.Center;
  return a;
}

PanelLayoutFlow.prototype.arrange = function(panel, elements, union) {
  var lineBreadths = panel.panelLayoutState.lineBreadths;
  var lineLengths = panel.panelLayoutState.lineLengths;
  var pad = panel.padding;
  var x = (this.direction === 180) ? union.width - pad.right : pad.left;
  var y = (this.direction === 270) ? union.height - pad.bottom : pad.top;
  var xstart = x;
  var ystart = y;
  if (this.direction === 0) {
    var row = 0;
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      if (!elem.visible) continue;
      var mb = elem.measuredBounds;
      var marg = elem.margin;
      var gw = marg.left + mb.width + marg.right;
      // use computed row length to decide whether to wrap, account for error accumulation
      if (x - pad.left > lineLengths[row] - 0.00000005 && i > 0) {
        y += lineBreadths[row++] + this.spacing.height;
        x = xstart;
        if (row === lineLengths.length) row--;  // if on last row, stay there
      }
      var lastbr = lineBreadths[row];  // if row was clipped,
      var h = (lastbr > 0) ? lastbr - marg.top - marg.bottom : 0;  // use zero height
      var ya = (lastbr > 0) ? y + marg.top : y;  // and stay at same Y point
      if ((lastbr > 0) && !this.isStretched(true, elem, panel)) {  // if aligning...
        var align = this.align(elem, panel);  // compute alignment Spot
        ya += align.y * (h - mb.height) + align.offsetY;
        h = mb.height;  // only considering Y axis
      }
      var xa = x + ((lastbr > 0) ? marg.left : 0);
      this.arrangeElement(elem, xa, ya, mb.width, h);
      x += gw + this.spacing.width;
    }
  } else if (this.direction === 180) {
    var row = 0;
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      if (!elem.visible) continue;
      var mb = elem.measuredBounds;
      var marg = elem.margin;
      var gw = marg.left + mb.width + marg.right;
      if (x - gw - pad.left < 0.00000005 && i > 0) {
        y += lineBreadths[row++] + this.spacing.height;
        x = xstart;
        if (row === lineLengths.length) row--;
      }
      var lastbr = lineBreadths[row];
      var h = (lastbr > 0) ? lastbr - marg.top - marg.bottom : 0;
      var ya = (lastbr > 0) ? y + marg.top : y;
      if ((lastbr > 0) && !this.isStretched(true, elem, panel)) {
        var align = this.align(elem, panel);
        ya += align.y * (h - mb.height) + align.offsetY;
        h = mb.height;
      }
      var xa = x - gw + ((lastbr > 0) ? marg.left : 0);
      this.arrangeElement(elem, xa, ya, mb.width, h);
      x -= gw + this.spacing.width;
    }
  } else if (this.direction === 90) {
    var col = 0;
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      if (!elem.visible) continue;
      var mb = elem.measuredBounds;
      var marg = elem.margin;
      var gh = marg.top + mb.height + marg.bottom;
      if (y - pad.top > lineLengths[col] - 0.00000005 && i > 0) {
        x += lineBreadths[col++] + this.spacing.width;
        y = ystart;
        if (col === lineLengths.length) col--;
      }
      var lastbr = lineBreadths[col];
      var w = (lastbr > 0) ? lastbr - marg.left - marg.right : 0;
      var xa = (lastbr > 0) ? x + marg.left : x;
      if ((lastbr > 0) && !this.isStretched(false, elem, panel)) {
        var align = this.align(elem, panel);
        xa += align.x * (w - mb.width) + align.offsetX;
        w = mb.width;
      }
      var ya = y + ((lastbr > 0) ? marg.top : 0);
      this.arrangeElement(elem, xa, ya, w, mb.height);
      y += gh + this.spacing.height;
    }
  } else if (this.direction === 270) {
    var col = 0;
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      if (!elem.visible) continue;
      var mb = elem.measuredBounds;
      var marg = elem.margin;
      var gh = marg.top + mb.height + marg.bottom;
      if (y - gh - pad.top < 0.00000005 && i > 0) {
        x += lineBreadths[col++] + this.spacing.width;
        y = ystart - gh;
        if (col === lineLengths.length) col--;
      } else {
        y -= gh;
      }
      var lastbr = lineBreadths[col];
      var w = (lastbr > 0) ? lastbr - marg.left - marg.right : 0;
      var xa = (lastbr > 0) ? x + marg.left : x;
      if ((lastbr > 0) && !this.isStretched(false, elem, panel)) {
        var align = this.align(elem, panel);
        xa += align.x * (w - mb.width) + align.offsetX;
        w = mb.width;
      }
      var ya = y + ((lastbr > 0) ? marg.top : 0);
      this.arrangeElement(elem, xa, ya, w, mb.height);
      y -= this.spacing.height;
    }
  }
  panel.panelLayoutState = null;  // free up the temporary Arrays
}

go.Panel.definePanelLayout('Flow', new PanelLayoutFlow());
