"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// Contains PoolLink and BPMNLinkingTool classes for the BPMN sample

// PoolLink, a special Link class for message flows from edges of pools

export class PoolLink extends go.Link {

	/** @override */
	public getLinkPoint(node: go.Node, port: go.GraphObject, spot: go.Spot, from: boolean, ortho: boolean, othernode: go.Node, otherport: go.GraphObject) {
		var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
			port.getDocumentPoint(go.Spot.BottomRight));
		var op = go.Link.prototype.getLinkPoint.call(this, othernode, otherport, spot, from, ortho, node, port);

		var below = op.y > r.centerY;
		var y = below ? r.bottom : r.top;
		if (node.category === "privateProcess") {
			if (op.x < r.left) return new go.Point(r.left, y);
			if (op.x > r.right) return new go.Point(r.right, y);
			return new go.Point(op.x, y);
		} else { // otherwise get the standard link point by calling the base class method
			return go.Link.prototype.getLinkPoint.call(this, node, port, spot, from, ortho, othernode, otherport);
		}
	};

	// If there are two links from & to same node... and pool is offset in X from node... the link toPoints collide on pool
	/** @override */
	public computeOtherPoint(othernode: go.Node, otherport: go.GraphObject) {
		var op = super.computeOtherPoint(othernode, otherport);
		var node = this.toNode;
		if (node === othernode) node = this.fromNode;
		if (othernode.category === "privateProcess") {
			op.x = node.getDocumentPoint(go.Spot.MiddleBottom).x;
		} else {
			if ((node === this.fromNode) !== (node.actualBounds.centerY < othernode.actualBounds.centerY)) {
				op.x -= 1;
			} else {
				op.x += 1;
			}
		}
		return op;
	};

	/** @override */
	public getLinkDirection(node: go.Node, port: go.GraphObject, linkpoint: go.Point, spot: go.Spot, from: boolean, ortho: boolean, othernode: go.Node, otherport: go.GraphObject) {
		if (node.category === "privateProcess") {
			var p = port.getDocumentPoint(go.Spot.Center);
			var op = otherport.getDocumentPoint(go.Spot.Center);
			var below = op.y > p.y;
			return below ? 90 : 270;
		} else {
			return super.getLinkDirection.call(this, node, port, linkpoint, spot, from, ortho, othernode, otherport);
		}
	};
}




// BPMNLinkingTool, a custom linking tool to switch the class of the link created.

export class BPMNLinkingTool extends go.LinkingTool {
	// don't allow user to create link starting on the To node
	public direction: go.EnumValue = go.LinkingTool.ForwardsOnly;
	public temporaryLink: go.Link;

	constructor() {
		super();
		this.temporaryLink.routing = go.Link.Orthogonal;
	}

	public linkValidation = (fromnode: go.Node, fromport: go.GraphObject, tonode: go.Node, toport: go.GraphObject) => {
		return this.validateSequenceLinkConnection(fromnode, fromport, tonode, toport) ||
			this.validateMessageLinkConnection(fromnode, fromport, tonode, toport);
	};

	/** @override */
	public insertLink(fromnode: go.Node, fromport: go.GraphObject, tonode: go.Node, toport: go.GraphObject) {
		var lsave = null;
		// maybe temporarily change the link data that is copied to create the new link
		if (this.validateMessageLinkConnection(fromnode, fromport, tonode, toport)) {
			lsave = this.archetypeLinkData;
			this.archetypeLinkData = { category: "msg" };
		}

		// create the link in the standard manner by calling the base method
		var newlink = super.insertLink.call(this, fromnode, fromport, tonode, toport);

		// maybe make the label visible
		if (fromnode.category === "gateway") {
			var label = newlink.findObject("Label");
			if (label !== null) label.visible = true;
		}

		// maybe restore the original archetype link data
		if (lsave !== null) this.archetypeLinkData = lsave;
		return newlink;
	};

	// static utility validation routines for linking & relinking as well as insert link logic

	// in BPMN, can't link sequence flows across subprocess or pool boundaries
	public validateSequenceLinkConnection(fromnode: go.Node, fromport: go.GraphObject, tonode: go.Node, toport: go.GraphObject) {
		if (fromnode.category === null || tonode.category === null) return true;

		// if either node is in a subprocess, both nodes must be in same subprocess (not even Message Flows) 
		if ((fromnode.containingGroup !== null && fromnode.containingGroup.category === "subprocess") ||
			(tonode.containingGroup !== null && tonode.containingGroup.category === "subprocess")) {
			if (fromnode.containingGroup !== tonode.containingGroup) return false;
		}

		if (fromnode.containingGroup === tonode.containingGroup) return true;  // a valid Sequence Flow
		// also check for children in common pool
		var common = fromnode.findCommonContainingGroup(tonode);
		return common != null;
	};

	// in BPMN, Message Links must cross pool boundaries
	public validateMessageLinkConnection(fromnode: go.Node, fromport: go.GraphObject, tonode: go.Node, toport: go.GraphObject) {
		if (fromnode.category === null || tonode.category === null) return true;

		if (fromnode.category === "privateProcess" || tonode.category === "privateProcess") return true;

		// if either node is in a subprocess, both nodes must be in same subprocess (not even Message Flows) 
		if ((fromnode.containingGroup !== null && fromnode.containingGroup.category === "subprocess") ||
			(tonode.containingGroup !== null && tonode.containingGroup.category === "subprocess")) {
			if (fromnode.containingGroup !== tonode.containingGroup) return false;
		}

		if (fromnode.containingGroup === tonode.containingGroup) return false;  // an invalid Message Flow
		// also check for children in common pool
		var common = fromnode.findCommonContainingGroup(tonode);
		return common === null;
	};

}