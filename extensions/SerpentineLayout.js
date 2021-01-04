"use strict";
/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Layout that lays out a chain of nodes in a snake-like fashion

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends Layout
* @class
* This layout assumes the graph is a chain of Nodes,
* positioning nodes in horizontal rows back and forth, alternating between left-to-right
* and right-to-left within the {@link #wrap} limit.
* {@link #spacing} controls the distance between nodes.
* <p/>
* When this layout is the Diagram.layout, it is automatically invalidated when the viewport changes size.
*/
function SerpentineLayout() {
  go.Layout.call(this);
  this.isViewportSized = true;
  this._spacing = new go.Size(30, 30);
  this._wrap = NaN;
}
go.Diagram.inherit(SerpentineLayout, go.Layout);

/**
* @ignore
* Copies properties to a cloned Layout.
* @this {SerpentineLayout}
* @param {Layout} copy
*/
SerpentineLayout.prototype.cloneProtected = function(copy) {
  go.Layout.prototype.cloneProtected.call(this, copy);
  copy._spacing = this._spacing;
  copy._wrap = this._wrap;
};

/**
* This method actually positions all of the Nodes, assuming that the ordering of the nodes
* is given by a single link from one node to the next.
* This respects the {@link #spacing} and {@link #wrap} properties to affect the layout.
* @this {SerpentineLayout}
* @param {Diagram|Group|Iterable} coll the collection of Parts to layout.
*/
SerpentineLayout.prototype.doLayout = function(coll) {
  var diagram = this.diagram;
  coll = this.collectParts(coll);

  var root = null;
  // find a root node -- one without any incoming links
  var it = coll.iterator;
  while (it.next()) {
    var n = it.value;
    if (!(n instanceof go.Node)) continue;
    if (root === null) root = n;
    if (n.findLinksInto().count === 0) {
      root = n;
      break;
    }
  }
  // couldn't find a root node
  if (root === null) return;

  var spacing = this.spacing;

  // calculate the width at which we should start a new row
  var wrap = this.wrap;
  if (diagram !== null && isNaN(wrap)) {
    if (this.group === null) {  // for a top-level layout, use the Diagram.viewportBounds
      var pad = diagram.padding;
      wrap = Math.max(spacing.width * 2, diagram.viewportBounds.width - 24 - pad.left - pad.right);
    } else {
      wrap = 1000; // provide a better default value?
    }
  }

  // implementations of doLayout that do not make use of a LayoutNetwork
  // need to perform their own transactions
  if (diagram !== null) diagram.startTransaction("Serpentine Layout");

  // start on the left, at Layout.arrangementOrigin
  this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
  var x = this.arrangementOrigin.x;
  var rowh = 0;
  var y = this.arrangementOrigin.y;
  var increasing = true;
  var node = root;
  while (node !== null) {
    var b = this.getLayoutBounds(node);
    // get the next node, if any
    var nextlink = node.findLinksOutOf().first();
    var nextnode = (nextlink !== null ? nextlink.toNode : null);
    var nb = (nextnode !== null ? this.getLayoutBounds(nextnode) : new go.Rect());
    if (increasing) {
      node.move(new go.Point(x, y));
      x += b.width;
      rowh = Math.max(rowh, b.height);
      if (x + spacing.width + nb.width > wrap) {
        y += rowh + spacing.height;
        x = wrap - spacing.width;
        rowh = 0;
        increasing = false;
        if (nextlink !== null) {
          nextlink.fromSpot = go.Spot.Right;
          nextlink.toSpot = go.Spot.Right;
        }
      } else {
        x += spacing.width;
        if (nextlink !== null) {
          nextlink.fromSpot = go.Spot.Right;
          nextlink.toSpot = go.Spot.Left;
        }
      }
    } else {
      x -= b.width;
      node.move(new go.Point(x, y));
      rowh = Math.max(rowh, b.height);
      if (x - spacing.width - nb.width < 0) {
        y += rowh + spacing.height;
        x = 0;
        rowh = 0;
        increasing = true;
        if (nextlink !== null) {
          nextlink.fromSpot = go.Spot.Left;
          nextlink.toSpot = go.Spot.Left;
        }
      } else {
        x -= spacing.width;
        if (nextlink !== null) {
          nextlink.fromSpot = go.Spot.Left;
          nextlink.toSpot = go.Spot.Right;
        }
      }
    }
    node = nextnode;
  }

  if (diagram !== null) diagram.commitTransaction("Serpentine Layout");
};

// Public properties

/**
* Gets or sets the {@link Size} whose width specifies the horizontal space between nodes
* and whose height specifies the minimum vertical space between nodes.
* The default value is 30x30.
* @name SerpentineLayout#spacing

* @return {Size}
*/
Object.defineProperty(SerpentineLayout.prototype, "spacing", {
  get: function() { return this._spacing; },
  set: function(val) {
    if (!(val instanceof go.Size)) throw new Error("new value for SerpentineLayout.spacing must be a Size, not: " + val);
    if (!this._spacing.equals(val)) {
      this._spacing = val;
      this.invalidateLayout();
    }
  }
});

/**
* Gets or sets the total width of the layout.
* The default value is NaN, which for {@link Diagram#layout}s means that it uses
* the {@link Diagram#viewportBounds}.
* @name SerpentineLayout#wrap

* @return {number}
*/
Object.defineProperty(SerpentineLayout.prototype, "wrap", {
  get: function() { return this._wrap; },
  set: function(val) {
    if (this._wrap !== val) {
      this._wrap = val;
      this.invalidateLayout();
    }
  }
});
