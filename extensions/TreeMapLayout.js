"use strict";
/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Layout that lays out nested Groups according to how much area they should have
// within the viewport as a proportion of the total area.

// A simple layout for positioning and sizing all nodes in a diagram to make a tree map.
// Assume that all Group.layout == null and that it's OK to set the Node.desiredSize for all nodes, including groups.
// Also assume that there is a number property named "size" on the node data;
// this computes the "total" property for each node as the sum of the group's member nodes.
// This layout ignores all Links.
function TreeMapLayout() {
  go.Layout.call(this);
  this._isTopLevelHorizontal = false;
}
go.Diagram.inherit(TreeMapLayout, go.Layout);

/**
* @ignore
* Copies properties to a cloned Layout.
* @this {TreeMapLayout}
* @param {Layout} copy
*/
TreeMapLayout.prototype.cloneProtected = function(copy) {
  go.Layout.prototype.cloneProtected.call(this, copy);
  copy._isTopLevelHorizontal = this._isTopLevelHorizontal;
};

// First call computeTotals to make sure all of the node data have values for data.total.
// Then do a top-down walk through the diagram's structure of group relationships,
// positioning everything to fit in the viewport.
TreeMapLayout.prototype.doLayout = function(coll) {
  if (!(coll instanceof go.Diagram)) throw new Error("TreeMapLayout only works as the Diagram.layout");
  var diagram = coll;
  this.computeTotals(diagram);  // make sure data.total has been computed for every node
  // figure out how large an area to cover;
  // perhaps this should be a property that could be set, rather than depending on the current viewport
  this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
  var x = this.arrangementOrigin.x;
  var y = this.arrangementOrigin.y;
  var w = diagram.viewportBounds.width;
  var h = diagram.viewportBounds.height;
  if (isNaN(w)) w = 1000;
  if (isNaN(h)) h = 1000;
  // collect all top-level nodes, and sum their totals
  var tops = new go.Set();
  var total = 0;
  diagram.nodes.each(function(n) {
    if (n.isTopLevel) {
      tops.add(n);
      total += n.data.total;
    }
  });
  var horiz = this.isTopLevelHorizontal;  // initially horizontal layout?
  // the following was copied from the layoutNode method
  var gx = x;
  var gy = y;
  var lay = this;
  tops.each(function(n) {
    var tot = n.data.total;
    if (horiz) {
      var pw = w * tot / total;
      lay.layoutNode(!horiz, n, gx, gy, pw, h);
      gx += pw;
    } else {
      var ph = h * tot / total;
      lay.layoutNode(!horiz, n, gx, gy, w, ph);
      gy += ph;
    }
  })
};

// Position and size the given node, and recurse if the node is a group
TreeMapLayout.prototype.layoutNode = function(horiz, n, x, y, w, h) {
  n.moveTo(x, y);
  n.desiredSize = new go.Size(w, h);
  if (n instanceof go.Group) {
    var g = n;
    var total = g.data.total;
    var gx = x;
    var gy = y;
    var lay = this;
    g.memberParts.each(function(p) {
      if (p instanceof go.Link) return;
      var tot = p.data.total;
      if (horiz) {
        var pw = w * tot / total;
        lay.layoutNode(!horiz, p, gx, gy, pw, h);
        gx += pw;
      } else {
        var ph = h * tot / total;
        lay.layoutNode(!horiz, p, gx, gy, w, ph);
        gy += ph;
      }
    })
  }
};

// Make sure all nodes have initialized data.total property
TreeMapLayout.prototype.computeTotals = function(diagram) {
  if (!diagram.nodes.all(function(g) { return !(g instanceof go.Group) || g.data.total >= 0; })) {
    var groups = new go.Set();
    diagram.nodes.each(function(n) {
      if (n instanceof go.Group) {  // collect all groups
        groups.add(n);
      } else {  // regular nodes just have their total == size
        n.data.total = n.data.size;
      }
    });
    // keep looking for groups whose total can be computed, until all groups have been processed
    while (groups.count > 0) {
      var grps = new go.Set();
      groups.each(function(g) {
        // for a group all of whose member nodes have an initialized data.total,
        if (g.memberParts.all(function(m) { return !(m instanceof go.Group) || m.data.total >= 0; })) {
          // compute the group's total as the sum of the sizes of all of the member nodes
          g.data.total = 0;
          g.memberParts.each(function(m) { if (m instanceof go.Node) g.data.total += m.data.total; });
        } else {  // remember for the next iteration
          grps.add(g);
        }
      });
      groups = grps;
    }
  }
};

/**
* Gets or sets whether the top-level organization is horizontal or vertical.
* The default value is false.
* @name TreeMapLayout#isTopLevelHorizontal

* @return {boolean}
*/
Object.defineProperty(TreeMapLayout.prototype, "isTopLevelHorizontal", {
  get: function() { return this._isTopLevelHorizontal; },
  set: function(val) {
    if (this._isTopLevelHorizontal !== val) {
      this._isTopLevelHorizontal = val;
      this.invalidateLayout();
    }
  }
});
// end TreeMapLayout
