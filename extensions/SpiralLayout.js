"use strict";
/*
*  Copyright (C) 1998-2015 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Layout that lays out a chain of nodes in a spiral

/**
* @constructor
* @extends Layout
* @class
* This layout assumes the graph is a chain of Nodes,
* {@link #spacing} controls the spacing between nodes.
*/
function SpiralLayout() {
  go.Layout.call(this);
  this._spacing = 100;
  this._clockwise = true;
}
go.Diagram.inherit(SpiralLayout, go.Layout);

/**
* This method actually positions all of the Nodes, assuming that the ordering of the nodes
* is given by a single link from one node to the next.
* This respects the {@link #spacing} property to affect the layout.
* @this {SpiralLayout}
* @param {Diagram|Group|Iterable} coll the collection of Parts to layout.
*/
SpiralLayout.prototype.doLayout = function(coll) {
  var diagram = this.diagram;
  if (coll instanceof go.Diagram) {
    diagram = coll;
    coll = coll.nodes;  // use all links connecting with these nodes
  } else if (coll instanceof go.Group) {
    diagram = coll.diagram;
    coll = coll.memberParts;
  }

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

  var space = this.spacing;

  // implementations of doLayout that do not make use of a LayoutNetwork
  // need to perform their own transactions
  if (diagram !== null) diagram.startTransaction("Spiral Layout");

  // treat the root node specially: it goes in the center
  var r = this.diameter(root)/4;
  var c = (this.clockwise ? 1 : -1);
  var angle = c * Math.PI;
  root.location = new go.Point(0, 0);
  var rootlink = root.findLinksOutOf().first();
  if (rootlink !== null) rootlink.curviness = c * r;

  // now locate each of the following nodes, in order, along a spiral
  var node = (rootlink !== null ? rootlink.toNode : null);
  while (node !== null) {
    var nextlink = node.findLinksOutOf().first();
    var nextnode = (nextlink !== null ? nextlink.toNode : null);

    // involute spiral
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var x = r * (cos + angle * sin);
    var y = r * (sin - angle * cos);
    node.location = new go.Point(x, y);

    var dia = this.diameter(node)/2 + this.diameter(nextnode)/2;
    angle += c * Math.atan((dia + space) / Math.sqrt(x * x + y * y));
    node = nextnode;
  }

  if (diagram !== null) diagram.commitTransaction("Spiral Layout");
};

/**
* @ignore
* Compute the effective diameter of a Node.
* @this {SpiralLayout}
* @param {Node} node
* @return {number}
*/
SpiralLayout.prototype.diameter = function(node) {
  if (!node) return 0;
  var b = node.actualBounds;
  return Math.sqrt(b.width*b.width + b.height*b.height);
};

// Public properties

/**
* Gets or sets the spacing between nodes.
* The default value is 100.
* @name SpiralLayout#spacing
* @function.
* @return {number}
*/
Object.defineProperty(SpiralLayout.prototype, "spacing", {
  get: function() { return this._spacing; },
  set: function(val) {
    if (typeof val !== "number") throw new Error("new value for SpiralLayout.spacing must be a number, not: " + val);
    if (this._spacing !== val) {
      this._spacing = val;
      this.invalidateLayout();
    }
  }
});

/**
* Gets or sets whether the spiral should go clockwise or counter-clockwise.
* The default value is true.
* @name SpiralLayout#clockwise
* @function.
* @return {boolean}
*/
Object.defineProperty(SpiralLayout.prototype, "clockwise", {
  get: function() { return this._clockwise; },
  set: function(val) {
    if (typeof val !== "boolean") throw new Error("new value for SpiralLayout.clockwise must be a boolean, not: " + val);
    if (this._clockwise !== val) {
      this._clockwise = val;
      this.invalidateLayout();
    }
  }
});
