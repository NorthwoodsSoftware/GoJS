"use strict";
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

function DoubleTreeLayout() {
  go.Layout.call(this);
  this._vertical = false;
  this._directionFunction = function(node) { return true; };
  this._bottomRightOptions = null;
  this._topLeftOptions = null;
}
go.Diagram.inherit(DoubleTreeLayout, go.Layout);

/*
* When false, the layout should grow towards the left and towards the right;
* when true, the layout show grow upwards and downwards.
* The default value is false.
* @name DoubleTreeLayout#vertical
* @function.
* @return {boolean}
*/
Object.defineProperty(DoubleTreeLayout.prototype, "vertical", {
  get: function() { return this._vertical; },
  set: function(val) {
    if (typeof val !== "boolean") throw new Error("new value for DoubleTreeLayout.vertical must be a boolean value.");
    if (this._vertical !== val) {
      this._vertical = val;
      this.invalidateLayout();
    }
  }
});

/*
* This function is called on each child node of the root node
* in order to determine whether the subtree starting from that child node
* will grow towards larger coordinates or towards smaller ones.
* The value must be a function and must not be null.
* It must return true if #isPositiveDirection should return true; otherwise it should return false.
* @name DoubleTreeLayout#directionFunction
* @function.
* @return {function}
*/
Object.defineProperty(DoubleTreeLayout.prototype, "directionFunction", {
  get: function() { return this._directionFunction; },
  set: function(val) {
    if (typeof val !== "function") {
      throw new Error("new value for DoubleTreeLayout.directionFunction must be a function taking a node data object and returning a boolean.");
    }
    if (this._directionFunction !== val) {
      this._directionFunction = val;
      this.invalidateLayout();
    }
  }
});

/**
 * Gets or sets the options to be applied to a {@link TreeLayout}.
 * By default this is null -- no properties are set on the TreeLayout
 * other than the {@link TreeLayout#angle}, depending on {@link #vertical} and
 * the result of calling {@link #directionFunction}.
 */
Object.defineProperty(DoubleTreeLayout.prototype, "bottomRightOptions", {
  get: function() { return this._bottomRightOptions; },
  set: function(value) {
    if (this._bottomRightOptions !== value) {
      this._bottomRightOptions = value;
      this.invalidateLayout();
    }
  }
});

/**
 * Gets or sets the options to be applied to a {@link TreeLayout}.
 * By default this is null -- no properties are set on the TreeLayout
 * other than the {@link TreeLayout#angle}, depending on {@link #vertical} and
 * the result of calling {@link #directionFunction}.
 */
Object.defineProperty(DoubleTreeLayout.prototype, "topLeftOptions", {
  get: function() { return this._topLeftOptions; },
  set: function(value) {
    if (this._topLeftOptions !== value) {
      this._topLeftOptions = value;
      this.invalidateLayout();
    }
  }
});

  /**
* @ignore
* Copies properties to a cloned Layout.
* @this {DoubleTreeLayout}
* @param {Layout} copy
*/
DoubleTreeLayout.prototype.cloneProtected = function(copy) {
  go.Layout.prototype.cloneProtected.call(this, copy);
  copy._vertical = this._vertical;
  copy._directionFunction = this._directionFunction;
  copy._bottomRightOptions = this._bottomRightOptions;
  copy._topLeftOptions = this._topLeftOptions;
};

/**
 * Perform two {@link TreeLayout}s by splitting the collection of Parts
 * into two separate subsets but sharing only a single root Node.
 * @param coll
 */
DoubleTreeLayout.prototype.doLayout = function(coll) {
  coll = this.collectParts(coll);
  if (coll.count === 0) return;
  var diagram = this.diagram;
  if (diagram !== null) diagram.startTransaction("Double Tree Layout");

  // split the nodes and links into two Sets, depending on direction
  var leftParts = new go.Set();
  var rightParts = new go.Set();
  this.separatePartsForLayout(coll, leftParts, rightParts);
  // but the ROOT node will be in both collections

  // create and perform two TreeLayouts, one in each direction,
  // without moving the ROOT node, on the different subsets of nodes and links
  var layout1 = this.createTreeLayout(false);
  layout1.angle = this.vertical ? 270 : 180;
  layout1.arrangement = go.TreeLayout.ArrangementFixedRoots;

  var layout2 = this.createTreeLayout(true);
  layout2.angle = this.vertical ? 90 : 0;
  layout2.arrangement = go.TreeLayout.ArrangementFixedRoots;

  layout1.doLayout(leftParts);
  layout2.doLayout(rightParts);

  if (diagram !== null) diagram.commitTransaction("Double Tree Layout");
}

/**
 * This just returns an instance of {@link TreeLayout}.
 * The caller will set the {@link TreeLayout#angle}.
 * @param {boolean} positive true for growth downward or rightward
 * @return {TreeLayout}
 */
DoubleTreeLayout.prototype.createTreeLayout = function(positive) {
  var lay = new go.TreeLayout();
  var opts = this.topLeftOptions;
  if (positive) opts = this.bottomRightOptions;
  if (opts) for (var p in opts) { lay[p] = opts[p]; }
  return lay;
}

/**
 * This is called by #doLayout to split the collection of Nodes and Links into two Sets,
 * one for the subtrees growing towards the left or upwards, and one for the subtrees
 * growing towards the right or downwards.
 */
DoubleTreeLayout.prototype.separatePartsForLayout = function(coll, leftParts, rightParts) {
  var root = null;  // the one root
  var roots = new go.Set();  // in case there are multiple roots
  coll.each(function(node) {
    if (node instanceof go.Node && node.findTreeParentNode() === null) roots.add(node);
  });
  if (roots.count === 0) {  // just choose the first node as the root
    var it = coll.iterator;
    while (it.next()) {
      if (it.value instanceof go.Node) {
        root = it.value;
        break;
      }
    }
  } else if (roots.count === 1) {  // normal case: just one root node
    root = roots.first();
  } else {  // multiple root nodes -- create a dummy node to be the one real root
    root = new go.Node();  // the new root node
    root.location = new go.Point(0, 0);
    var forwards = (this.diagram ? this.diagram.isTreePathToChildren : true);
    // now make dummy links from the one root node to each node
    roots.each(function(child) {
      var link = new go.Link();
      if (forwards) {
        link.fromNode = root;
        link.toNode = child;
      } else {
        link.fromNode = child;
        link.toNode = root;
      }
    });
  }

  // the ROOT node is shared by both subtrees
  leftParts.add(root);
  rightParts.add(root);
  var lay = this;
  // look at all of the immediate children of the ROOT node
  root.findTreeChildrenNodes().each(function(child) {
      // in what direction is this child growing?
      var bottomright = lay.isPositiveDirection(child);
      var coll = bottomright ? rightParts : leftParts;
      // add the whole subtree starting with this child node
      coll.addAll(child.findTreeParts());
      // and also add the link from the ROOT node to this child node
      coll.add(child.findTreeParentLink());
    });
}

/**
 * This predicate is called on each child node of the root node,
 * and only on immediate children of the root.
 * It should return true if this child node is the root of a subtree that should grow
 * rightwards or downwards, or false otherwise.
 * @param {Node} child
 * @returns {boolean} true if grows towards right or towards bottom; false otherwise
 */
DoubleTreeLayout.prototype.isPositiveDirection = function(child) {
  var f = this.directionFunction;
  if (!f) throw new Error("No DoubleTreeLayout.directionFunction supplied on the layout");
  return f(child);
}
