"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Layout that lays out a chain of nodes in a spiral

/**
* @constructor
* @extends Layout
* @class
* This layout assumes the graph is a chain of Nodes,
* {@link #spacing} controls the spacing between nodes.
*/
export class SpiralLayout extends go.Layout {
	private _radius: number = NaN;
	private _spacing: number = 10;
	private _clockwise: boolean = true;

  /**
  * @ignore
  * Copies properties to a cloned Layout.
  * @this {SpiralLayout}
  * @param {Layout} copy
  * @override
  */
	public cloneProtected(copy: SpiralLayout) {
		super.cloneProtected.call(this, copy);
		copy._radius = this._radius;
		copy._spacing = this._spacing;
		copy._clockwise = this._clockwise;
	};

  /**
  * This method actually positions all of the Nodes, assuming that the ordering of the nodes
  * is given by a single link from one node to the next.
  * This respects the {@link #spacing} property to affect the layout.
  * @this {SpiralLayout}
  * @param {Diagram|Group|Iterable} coll the collection of Parts to layout.
  */
	public doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
		if (this.network === null) {
			this.network = this.makeNetwork(coll);
		}
		this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
		var originx = this.arrangementOrigin.x;
		var originy = this.arrangementOrigin.y;
		var root = null;
		// find a root vertex -- one without any incoming edges
		var it = this.network.vertexes.iterator;
		while (it.next()) {
			var v = it.value;
			if (root === null) root = v;  // in case there are only circles
			if (v.sourceEdges.count === 0) {
				root = v;
				break;
			}
		}
		// couldn't find a root vertex
		if (root === null) {
			this.network = null;
			return;
		}

		var space = this.spacing;
		var cw = (this.clockwise ? 1 : -1);
		var rad = this.radius;
		if (rad <= 0 || isNaN(rad) || !isFinite(rad)) rad = this.diameter(root) / 4;

		// treat the root node specially: it goes in the center
		var dia = this.diameter(root);
		var angle = cw * Math.PI;
		root.centerX = originx;
		root.centerY = originy;

		var edge = root.destinationEdges.first();
		if (edge !== null && edge.link !== null) edge.link.curviness = cw * rad;

		// now locate each of the following nodes, in order, along a spiral
		var vert = (edge !== null ? edge.toVertex : null);
		while (vert !== null) {
			// involute spiral
			var cos = Math.cos(angle);
			var sin = Math.sin(angle);
			var x = rad * (cos + angle * sin);
			var y = rad * (sin - angle * cos);
			// the link might connect to a member node of a group
			if (vert.node instanceof go.Group && edge.link.toNode !== vert.node) {
				var offset = edge.link.toNode.location.copy().subtract(vert.node.location);
				x -= offset.x;
				y -= offset.y;
			}
			vert.centerX = x + originx;
			vert.centerY = y + originy;

			var nextedge = vert.destinationEdges.first();
			var nextvert = (nextedge !== null ? nextedge.toVertex : null);

			// clockwise curves want positive Link.curviness
			if (this.isRouting && nextedge !== null && nextedge.link !== null) {
				if (!isNaN(nextedge.link.curviness)) {
					var c = nextedge.link.curviness;
					nextedge.link.curviness = cw * Math.abs(c);
				}
			}

			// determine next node's angle
			var dia = this.diameter(vert) / 2 + this.diameter(nextvert) / 2;
			angle += cw * Math.atan((dia + space) / Math.sqrt(x * x + y * y));

			edge = nextedge;
			vert = nextvert;
		}

		this.updateParts();
		this.network = null;
	};

  /**
  * @ignore
  * Compute the effective diameter of a Node.
  * @this {SpiralLayout}
  * @param {LayoutVertex} v
  * @return {number}
  */
	public diameter(v: go.LayoutVertex): number {
		if (!v) return 0;
		var b = v.bounds;
		return Math.sqrt(b.width * b.width + b.height * b.height);
	};

	// Public properties

  /**
  * Gets or sets the radius distance.
  * The default value is NaN.
  * @name SpiralLayout#radius
  * @function.
  * @return {number}
  */
	get radius(): number { return this._radius }
	set radius(val: number) {
		if (typeof val !== "number") throw new Error("new value ofr SPrialLayout.radius must be a number, not " + val)
		if (this._radius !== val) {
			this._radius = val;
			this.invalidateLayout();
		}
	}

  /**
  * Gets or sets the spacing between nodes.
  * The default value is 100.
  * @name SpiralLayout#spacing
  * @function.
  * @return {number}
  */
	get spacing(): number { return this._spacing }
	set spacing(val: number) {
		if (typeof val !== "number") throw new Error("new value for SpiralLayout.spacing must be a number, not: " + val);
		if (this._spacing !== val) {
			this._spacing = val;
			this.invalidateLayout();
		}
	}

  /**
  * Gets or sets whether the spiral should go clockwise or counter-clockwise.
  * The default value is true.
  * @name SpiralLayout#clockwise
  * @function.
  * @return {boolean}
  */
	get clockwise(): boolean { return this._clockwise; }
	set clockwise(val: boolean) {
		if (typeof val !== "boolean") throw new Error("new value for SpiralLayout.clockwise must be a boolean, not: " + val);
		if (this._clockwise !== val) {
			this._clockwise = val;
			this.invalidateLayout();
		}
	}
}