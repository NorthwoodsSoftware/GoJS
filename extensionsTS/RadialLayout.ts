"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

/**
* Given a root Node this arranges connected nodes in concentric rings,
* layered by the minimum link distance from the root.
*/
export class RadialLayout extends go.Layout {
	private _root: go.Node = null;
	private _layerThickness: number = 100;  // how thick each ring should be
	private _maxLayers: number = Infinity;

  /**
  * Copies properties to a cloned Layout.
  */
	public cloneProtected(copy: this) {
		super.cloneProtected(copy);
		// don't copy .root
		copy._layerThickness = this._layerThickness;
		copy._maxLayers = this._maxLayers;
	}

  /*
  * The Node to act as the root or central node of the radial layout.
  */
	get root(): go.Node { return this._root; }
	set root(value: go.Node) {
		if (this._root !== value) {
			this._root = value;
			this.invalidateLayout();
		}
	}

  /*
  * The thickness of each ring representing a layer.
  */
	get layerThickness(): number { return this._layerThickness; }
	set layerThickness(value: number) {
		if (this._layerThickness !== value) {
			this._layerThickness = value;
			this.invalidateLayout();
		}
	}

  /*
  * The maximum number of layers to be shown, in addition to the root node at layer zero.
  * The default value is Infinity.
  */
	get maxLayers(): number { return this._maxLayers; }
	set maxLayers(value: number) {
		if (this._maxLayers !== value) {
			this._maxLayers = value;
			this.invalidateLayout();
		}
	}

  /**
  * Use a LayoutNetwork that always creates RadialVertexes.
  */
	public createNetwork() {
		var net = new go.LayoutNetwork();
		net.createVertex = () => new RadialVertex();
		return net;
	}

  /**
  */
	public doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
		if (this.network === null) {
			this.network = this.makeNetwork(coll);
		}
    if (this.network.vertexes.count === 0) return;

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
		if (this.root === null) return;  // nothing to do

		var rootvert = this.network.findVertex(this.root) as RadialVertex;
		if (rootvert === null) throw new Error("RadialLayout.root must be a Node in the LayoutNetwork that the RadialLayout is operating on")

		this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
		this.findDistances(rootvert);

		// sort all results into Arrays of RadialVertexes with the same distance
		var verts = [];
		var maxlayer = 0;
		var it = this.network.vertexes.iterator;
		while (it.next()) {
			var vv = it.value as RadialVertex;
			vv.laid = false;
			var layer = vv.distance;
			if (layer === Infinity) continue; // Infinity used as init value (set in findDistances())
			if (layer > maxlayer) maxlayer = layer;
			var layerverts: Array<go.LayoutVertex> = verts[layer];
			if (layerverts === undefined) {
				layerverts = [];
				verts[layer] = layerverts;
			}
			layerverts.push(vv);
		}

		// now recursively position nodes (using radlay1()), starting with the root
		rootvert.centerX = this.arrangementOrigin.x;
		rootvert.centerY = this.arrangementOrigin.y;
		this.radlay1(rootvert, 1, 0, 360);

		// Update the "physical" positions of the nodes and links.
		this.updateParts();
		this.network = null;
	}

  /**
  * recursively position vertexes in a radial layout
  */
	private radlay1(vert: RadialVertex, layer: number, angle: number, sweep: number) {
		if (layer > this.maxLayers) return; // no need to position nodes outside of maxLayers
		var verts: Array<RadialVertex> = []; // array of all RadialVertexes connected to 'vert' in layer 'layer'
		vert.vertexes.each(function (v: RadialVertex) {
			if (v.laid) return;
			if (v.distance === layer) verts.push(v);
		});
		var found = verts.length;
		if (found === 0) return;

		var radius = layer * this.layerThickness;
		var separator = sweep / found; // distance between nodes in their sweep portion
		var start = angle - sweep / 2 + separator / 2;
		// for each vertex in this layer, place it in its correct layer and position
		for (var i = 0; i < found; i++) {
			var v = verts[i];
			var a = start + i * separator; // the angle to rotate the node to
			if (a < 0) a += 360; else if (a > 360) a -= 360;
			// the point to place the node at -- this corresponds with the layer the node is in
			// all nodes in the same layer are placed at a constant point, then rotated accordingly
			var p = new go.Point(radius, 0);
			p.rotate(a);
			v.centerX = p.x + this.arrangementOrigin.x;
			v.centerY = p.y + this.arrangementOrigin.y;
			v.laid = true;
			v.angle = a;
			v.sweep = separator;
			v.radius = radius;
			// keep going for all layers
			this.radlay1(v, layer + 1, a, sweep / found);
		}
	}

  /**
  * Update RadialVertex.distance for every vertex.
  */
	private findDistances(source: RadialVertex) {
		var diagram = this.diagram;
		// keep track of distances from the source node
		this.network.vertexes.each(function (v: RadialVertex) { v.distance = Infinity; });
		// the source node starts with distance 0
		source.distance = 0;
		// keep track of nodes for we have set a non-Infinity distance,
		// but which we have not yet finished examining
		var seen = new go.Set(RadialVertex);
		seen.add(source);

		// local function for finding a vertex with the smallest distance in a given collection
		function leastVertex(coll: go.Set<RadialVertex>) {
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
		var finished = new go.Set(RadialVertex);
		while (seen.count > 0) {
			// look at the unfinished vertex with the shortest distance so far
			var least = leastVertex(seen as go.Set<RadialVertex>);
			var leastdist = least.distance;
			// by the end of this loop we will have finished examining this LEAST vertex
			seen.remove(least);
			finished.add(least);
			// look at all edges connected with this vertex
			least.edges.each(function (e) {
				var neighbor = e.getOtherVertex(least);
				// skip vertexes that we have finished
				if (finished.contains(<any>neighbor)) return;
				var neighbordist = (<any>neighbor).distance;
				// assume "distance" along a link is unitary, but could be any non-negative number.
				var dist = leastdist + 1;
				if (dist < neighbordist) {
					// if haven't seen that vertex before, add it to the SEEN collection
					if (neighbordist == Infinity) {
						seen.add(<any>neighbor);
					}
					// record the new best distance so far to that node
					(<any>neighbor).distance = dist;
				}
			});
		}
	}

  /**
  * This override positions each Node and also calls {@link #rotateNode}.
  */
	commitLayout() {
		super.commitLayout();

		var it = this.network.vertexes.iterator;
		while (it.next()) {
			var v = it.value as RadialVertex;
			var n = v.node;
			if (n !== null) {
				n.visible = (v.distance <= this.maxLayers);
				this.rotateNode(n, v.angle, v.sweep, v.radius);
			}
		}

		this.commitLayers();
	}

  /**
  * Override this method in order to modify each node as it is laid out.
  * By default this method does nothing.
  */
	rotateNode(node: go.Node, angle: number, sweep: number, radius: number) {
	}

  /**
  * Override this method in order to create background circles indicating the layers of the radial layout.
  * By default this method does nothing.
  */
	commitLayers() {
	}
} // end RadialLayout


/**
* @ignore
* @constructor
* @extends LayoutVertex
* @class
*/
class RadialVertex extends go.LayoutVertex {
	distance: number = Infinity;  // number of layers from the root, non-negative integers
	laid: boolean = false;  // used internally to keep track
	angle: number = 0;  // the direction at which the node is placed relative to the root node
	sweep: number = 0;  // the angle subtended by the vertex
	radius: number = 0;  // the inner radius of the layer containing this vertex
}
