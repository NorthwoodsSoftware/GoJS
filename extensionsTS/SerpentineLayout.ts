"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Layout that lays out a chain of nodes in a snake-like fashion

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
export class SerpentineLayout extends go.Layout {
  private _spacing: go.Size = new go.Size(30, 30);
  private _wrap: number = NaN;

  constructor() {
    super();
    this.isViewportSized = true;
  }

  /**
  * @ignore
  * Copies properties to a cloned Layout.
  * @this {SerpentineLayout}
  * @param {Layout} copy
  * @override
  */
  public cloneProtected(copy: SerpentineLayout) {
    super.cloneProtected.call(this, copy);
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
  public doLayout(coll: go.Iterable<go.Part>) {
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
        var pad = diagram.padding as go.Margin;
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
      var b = node.actualBounds;
      // get the next node, if any
      var nextlink = node.findLinksOutOf().first();
      var nextnode = (nextlink !== null ? nextlink.toNode : null);
      var nb = (nextnode !== null ? nextnode.actualBounds : new go.Rect());
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
  * @function.
  * @return {Size}
  */
  get spacing(): go.Size { return this._spacing }
  set spacing(val: go.Size) {
    if (!(val instanceof go.Size)) throw new Error("new value for SerpentineLayout.spacing must be a Size, not: " + val);
    if (!this._spacing.equals(val)) {
      this._spacing = val;
      this.invalidateLayout();
    }
  }

  /**
  * Gets or sets the total width of the layout.
  * The default value is NaN, which for {@link Diagram#layout}s means that it uses
  * the {@link Diagram#viewportBounds}.
  * @name SerpentineLayout#wrap
  * @function.
  * @return {number}
  */
  get wrap(): number { return this._wrap }
  set wrap(val: number) {
    if (this._wrap !== val) {
      this._wrap = val;
      this.invalidateLayout();
    }
  }

}

