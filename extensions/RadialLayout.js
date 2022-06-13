"use strict";
/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends Layout
* @class
* Given a root Node this arranges connected nodes in concentric rings,
* layered by the minimum link distance from the root.
*/
function RadialLayout() {
  go.Layout.call(this);
  this._root = null;
  this._layerThickness = 100;  // how thick each ring should be
  this._maxLayers = Infinity;
}
go.Diagram.inherit(RadialLayout, go.Layout);

/**
* @ignore
* Copies properties to a cloned Layout.
* @this {RadialLayout}
* @param {Layout} copy
*/
RadialLayout.prototype.cloneProtected = function(copy) {
  go.Layout.prototype.cloneProtected.call(this, copy);
  // don't copy .root
  copy._layerThickness = this._layerThickness;
  copy._maxLayers = this._maxLayers;
};

/*
* The Node to act as the root or central node of the radial layout.
* @name RadialLayout#root

* @return {Node}
*/
Object.defineProperty(RadialLayout.prototype, "root", {
  get: function() { return this._root; },
  set: function(value) {
    if (this._root !== value) {
      this._root = value;
      this.invalidateLayout();
    }
  }
});

/*
* The thickness of each ring representing a layer.
* @name RadialLayout#layerThickness

* @return {number}
*/
Object.defineProperty(RadialLayout.prototype, "layerThickness", {
  get: function() { return this._layerThickness; },
  set: function(value) {
    if (this._layerThickness !== value) {
      this._layerThickness = value;
      this.invalidateLayout();
    }
  }
});

/*
* The maximum number of layers to be shown, in addition to the root node at layer zero.
* The default value is Infinity.
* @name RadialLayout#maxLayers

* @return {number}
*/
Object.defineProperty(RadialLayout.prototype, "maxLayers", {
  get: function() { return this._maxLayers; },
  set: function(value) {
    if (this._maxLayers !== value) {
      this._maxLayers = value;
      this.invalidateLayout();
    }
  }
});

/**
* Use a LayoutNetwork that always creates RadialVertexes.
* @this {RadialLayout}
* @return {LayoutNetwork}
*/
RadialLayout.prototype.createNetwork = function() {
  var net = new go.LayoutNetwork(this);
  net.createVertex = function() { return new RadialVertex(net); };
  return net;
}

/**
* @this {RadialLayout}
* @param {Diagram|Group|Iterable} coll the collection of Parts to layout.
*/
RadialLayout.prototype.doLayout = function(coll) {
  if (this.network === null) {
    this.network = this.makeNetwork(coll);
  }
  if (this.network.vertexes.count === 0) {
    this.network = null;
    return;
  }

  if (this.root === null) {
    // If no root supplied, choose one without any incoming edges
    var it = this.network.vertexes.iterator;
    while (it.next()) {
      var v = it.value;
      if (v.node !== null && v.sourceEdges.count === 0) {
        this.root = v.node;
        break;
      }
    }
  }
  if (this.root === null) {
    // If could not find any default root, choose a random one
    this.root = this.network.vertexes.first().node;
  }
  if (this.root === null) {  // nothing to do
    this.network = null;
    return;
  }

  var rootvert = this.network.findVertex(this.root);
  if (rootvert === null) throw new Error("RadialLayout.root must be a Node in the LayoutNetwork that the RadialLayout is operating on")

  this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
  this.findDistances(rootvert);

  // now recursively position nodes (using radlay1()), starting with the root
  rootvert.centerX = this.arrangementOrigin.x;
  rootvert.centerY = this.arrangementOrigin.y;
  this.radlay1(rootvert, 1, 0, 360);

  // Update the "physical" positions of the nodes and links.
  this.updateParts();
  this.network = null;
}

/**
* @ignore
* recursively position vertexes in a radial layout
* @this {RadialLayout}
* @param {RadialVertex} vert
* @param {number} layer
* @param {number} angle
* @param {number} sweep
*/
RadialLayout.prototype.radlay1 = function(vert, layer, angle, sweep) {
  if (layer > this.maxLayers) return; // no need to position nodes outside of maxLayers
  var verts = vert.children; // array of all RadialVertexes connected to 'vert' in layer 'layer'
  var found = verts.length;
  if (found === 0) return;

  var fracs = []; // relative proportions that each child vertex should occupy
  var tot = 0;
  for (var i = 0; i < found; i++) {
    var v = verts[i];
    var f = this.computeBreadth(v);
    fracs.push(f);
    tot += f;
  }
  if (tot <= 0) return;
  // convert into fractions 0.0 <= frac <= 1.0
  for (var i = 0; i < found; i++) fracs[i] /= tot;

  var radius = layer * this.layerThickness;
  var a = angle - sweep / 2; // the angle to rotate the node to
  // for each vertex in this layer, place it in its correct layer and position
  for (var i = 0; i < found; i++) {
    var v = verts[i];
    var breadth = fracs[i] * sweep;
    a += breadth / 2;
    if (a < 0) a += 360; else if (a > 360) a -= 360;
    // the point to place the node at -- this corresponds with the layer the node is in
    // all nodes in the same layer are placed at a constant point, then rotated accordingly
    var p = new go.Point(radius, 0);
    p.rotate(a);
    v.centerX = p.x + this.arrangementOrigin.x;
    v.centerY = p.y + this.arrangementOrigin.y;
    v.angle = a;
    v.sweep = breadth;
    v.radius = radius;
    // keep going for all layers
    this.radlay1(v, layer + 1, a, sweep * fracs[i]);
    a += breadth / 2;
    if (a < 0) a += 360; else if (a > 360) a -= 360;
  }
};

/**
 * Compute the proportion of arc that the given vertex should take relative to its siblings.
 *
 * The default behavior is to give each child arc according to the sum of the maximum breadths of each of its children.
 * This assumes that all nodes have the same breadth -- i.e. that they will occupy the same sweep of arc.
 * It does not take the Node.actualBounds into account, nor the angle at which the node will be location relative to the origin,
 * nor the distance the node will be from the root node.
 *
 * In order to give each child of a vertex the same fraction of arc, override this method:
 * <code>computeBreadth(v) { return 1; }</code>
 *
 * In order to give each child of a vertex a fraction of arc proportional to how many children the child has:
 * <code>computeBreadth(v) { return Math.max(1, v.children.length); }
 *
 * @this {RadialLayout}
 * @param {RadialVertex} v
 * @return {number}
 */
 RadialLayout.prototype.computeBreadth = function(v) {
  var lay = this;
  var b = 0;
  v.children.forEach(function(w) { b += lay.computeBreadth(w); });  // inefficient
  return Math.max(b, 1);
}

/**
* @ignore
* Update RadialVertex.distance and .children for every vertex.
* @this {RadialLayout}
* @param {RadialVertex} source
*/
RadialLayout.prototype.findDistances = function(source) {
  if (this.network === null) return;

  // keep track of distances from the source node
  this.network.vertexes.each(function(v) { v.distance = Infinity; v.laid = false; });
  // the source node starts with distance 0
  source.distance = 0;
  // keep track of nodes for we have set a non-Infinity distance,
  // but which we have not yet finished examining
  var seen = new go.Set(/*go.RadialVertex*/);
  seen.add(source);

  // local function for finding a vertex with the smallest distance in a given collection
  function leastVertex(coll) {
    var bestdist = Infinity;
    var bestvert = null;
    var it = coll.iterator;
    while (it.next()) {
      var v = it.value;
      var dist = v.distance;
      if (dist < bestdist) {
        bestdist = dist;
        bestvert = v;
      }
    }
    return bestvert;
  }

  // keep track of vertexes we have finished examining;
  // this avoids unnecessary traversals and helps keep the SEEN collection small
  var finished = new go.Set(/*go.RadialVertex*/);
  while (seen.count > 0) {
    // look at the unfinished vertex with the shortest distance so far
    var least = leastVertex(seen);
    var leastdist = least.distance;
    // by the end of this loop we will have finished examining this LEAST vertex
    seen.remove(least);
    finished.add(least);
    // look at all edges connected with this vertex
    least.edges.each(function(e) {
      var neighbor = e.getOtherVertex(least);
      // skip vertexes that we have finished
      if (finished.contains(neighbor)) return;
      var neighbordist = neighbor.distance;
      // assume "distance" along a link is unitary, but could be any non-negative number.
      var dist = leastdist + 1;
      if (dist < neighbordist) {
        // if haven't seen that vertex before, add it to the SEEN collection
        if (neighbordist == Infinity) {
          seen.add(neighbor);
        }
        // record the new best distance so far to that node
        neighbor.distance = dist;
      }
    });
  }

  // now update the RadialVertex.children Arrays to form a tree-structure
  this.network.vertexes.each(function(v) {
    var dist = v.distance;
    var arr = v.children;
    if (!arr) arr = v.children = [];
    v.vertexes.each(function(w) {  // use LayoutVertex.vertexes to remove duplicates
      // use the RadialVertex.laid property for avoiding already-traversed vertexes
      if (!w.laid && w !== v && w.distance === dist+1) {
        arr.push(w);
        w.laid = true;
      }
    });
  });

  // reset RadialVertex.laid in case of future use
  this.network.vertexes.each(function(v) { v.laid = false; });
}

/**
* This override positions each Node and also calls {@link #rotateNode}.
* @this {RadialLayout}
*/
RadialLayout.prototype.commitLayout = function() {
  go.Layout.prototype.commitLayout.call(this);

  var it = this.network.vertexes.iterator;
  while (it.next()) {
    var v = it.value;
    var n = v.node;
    if (n !== null) {
      n.visible = (v.distance <= this.maxLayers);
      this.rotateNode(n, v.angle, v.sweep, v.radius);
    }
  }

  this.commitLayers();
};

/**
* Override this method in order to modify each node as it is laid out.
* By default this method does nothing.
* @this {RadialLayout}
* @param {Node} node
* @param {number} angle in degrees relative to the center point
* @param {number} sweep in degrees
* @param {number} radius the inner radius for this node's layer
*/
RadialLayout.prototype.rotateNode = function(node, angle, sweep, radius) {
};

/**
* Override this method in order to create background circles indicating the layers of the radial layout.
* By default this method does nothing.
* @this {RadialLayout}
*/
RadialLayout.prototype.commitLayers = function() {
};
// end RadialLayout


/**
* @ignore
* @constructor
* @extends LayoutVertex
* @class
*/
function RadialVertex(network) {
  go.LayoutVertex.call(this, network);
  this.distance = Infinity;  // number of layers from the root, non-negative integers
  this.laid = false;  // used internally to keep track
  this.angle = 0;  // the direction at which the node is placed relative to the root node
  this.sweep = 0;  // the angle subtended by the vertex
  this.radius = 0;  // the inner radius of the layer containing this vertex
  this.children = [];  // vertexes connected to this vertex that have a distance one greater than this distance
}
go.Diagram.inherit(RadialVertex, go.LayoutVertex);

