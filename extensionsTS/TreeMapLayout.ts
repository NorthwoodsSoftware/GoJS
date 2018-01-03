"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

export class TreeMapLayout extends go.Layout {
	private _isTopLevelHorizontal: boolean = false;

  /**
  * @ignore
  * Copies properties to a cloned Layout.
  * @this {TreeMapLayout}
  * @param {Layout} copy
  * @override */
	public cloneProtected(copy: this) {
		super.cloneProtected(copy);
		copy._isTopLevelHorizontal = this._isTopLevelHorizontal;
	}

	public doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
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
		diagram.nodes.each((n) => {
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
		tops.each((n: go.Node) => {
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

	public layoutNode(horiz: boolean, n: go.Panel, x: number, y: number, w: number, h: number) {
		n.position = new go.Point(x, y);
		n.desiredSize = new go.Size(w, h);
		if (n instanceof go.Group) {
			var g = n;
			var total = g.data.total;
			var gx = x;
			var gy = y;
			var lay = this;
			g.memberParts.each((p) => {
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

	public computeTotals(diagram: go.Diagram) {
		if (!diagram.nodes.all((g: go.Group) => { return !(g instanceof go.Group) || g.data.total >= 0; })) {
			var groups = new go.Set();
			diagram.nodes.each((n: go.Panel) => {
				if (n instanceof go.Group) {  // collect all groups
					groups.add(n);
				} else {  // regular nodes just have their total == size
					n.data.total = n.data.size;
				}
			});
			// keep looking for groups whose total can be computed, until all groups have been processed
			while (groups.count > 0) {
				var grps = new go.Set();
				groups.each((g: go.Group) => {
					// for a group all of whose member nodes have an initialized data.total,
					if (g.memberParts.all((m) => { return !(m instanceof go.Group) || m.data.total >= 0; })) {
						// compute the group's total as the sum of the sizes of all of the member nodes
						g.data.total = 0;
						g.memberParts.each((m) => { if (m instanceof go.Node) g.data.total += m.data.total; });
					} else {  // remember for the next iteration
						grps.add(g);
					}
				});
				groups = grps;
			}
		}
	};

	get isTopLevelHorizontal(): boolean { return this._isTopLevelHorizontal; }
	set isTopLevelHorizontal(val: boolean) {
		if (this._isTopLevelHorizontal !== val) {
			this._isTopLevelHorizontal = val;
			this.invalidateLayout();
		}
	}
}