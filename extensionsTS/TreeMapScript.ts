"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { TreeMapLayout } from "./TreeMapLayout";

var myDiagram: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;  // for conciseness in defining templates

	myDiagram =
		$(go.Diagram, "myDiagramDiv",  // must be the ID or reference to div
			{
        initialContentAlignment: go.Spot.Center,
			  initialAutoScale: go.Diagram.Uniform,
				"animationManager.isEnabled": false,
				layout: $(TreeMapLayout,
					{ isTopLevelHorizontal: false }),
				allowMove: false, allowCopy: false, allowDelete: false
			});

	// change selection behavior to cycle up the chain of containing Groups
	myDiagram.toolManager.clickSelectingTool.standardMouseSelect = function() {
		var diagram = this.diagram;
		if (diagram === null || !diagram.allowSelect) return;
		var e = diagram.lastInput;
		if (!(e.control || e.meta) && !e.shift) {
			var part = diagram.findPartAt(e.documentPoint, false);
			if (part !== null) {
				var firstselected = null;  // is this or any containing Group selected?
				var node = part;
				while (node !== null) {
					if (node.isSelected) {
						firstselected = node;
						break;
					} else {
						node = node.containingGroup;
					}
				}
				if (firstselected !== null) {  // deselect this and select its containing Group
					firstselected.isSelected = false;
					var group = firstselected.containingGroup;
					if (group !== null) group.isSelected = true;
					return;
				}
			}
		}
		go.ClickSelectingTool.prototype.standardMouseSelect.call(this);
	};

	// Nodes and Groups are the absolute minimum template: no elements at all!
	myDiagram.nodeTemplate =
		$(go.Node,
			{ background: "rgba(99,99,99,0.2)" },
			new go.Binding("background", "fill"),
			{
				toolTip: $(go.Adornment,
					$(go.TextBlock, new go.Binding("text", "", tooltipString).ofObject())
				)
			}
		);

	myDiagram.groupTemplate =
		$(go.Group, "Auto",
			{ layout: null },
			{ background: "rgba(99,99,99,0.2)" },
			new go.Binding("background", "fill"),
			{
				toolTip: $(go.Adornment,
					$(go.TextBlock, new go.Binding("text", "", tooltipString).ofObject())
				)
			}
		);

	function tooltipString(part: go.Part): string {
		if (part instanceof go.Adornment) part = part.adornedPart;
		var msg = createPath(part);
		msg += "\nsize: " + part.data.size;
		if (part instanceof go.Group) {
			var group = part;
			msg += "\n# children: " + group.memberParts.count;
			msg += "\nsubtotal size: " + group.data.total;
		}
		return msg;
	}

	function createPath(part: go.Part): string {
		var parent = part.containingGroup;
		return (parent !== null ? createPath(parent) + "/" : "") + part.data.text;
	}

	// generate a tree with the default values
	rebuildGraph();
}

export function rebuildGraph() {
	var minNodes = (document.getElementById("minNodes") as any).value;
	minNodes = parseInt(minNodes, 10);

	var maxNodes = (document.getElementById("maxNodes") as any).value;
	maxNodes = parseInt(maxNodes, 10);

	var minChil = (document.getElementById("minChil") as any).value;
	minChil = parseInt(minChil, 10);

	var maxChil = (document.getElementById("maxChil") as any).value;
	maxChil = parseInt(maxChil, 10);

	// create and assign a new model
	var model = new go.GraphLinksModel();
	model.nodeGroupKeyProperty = "parent";
	model.nodeDataArray = generateNodeData(minNodes, maxNodes, minChil, maxChil);
	myDiagram.model = model;
}

class nodes {
	key: number; isGroup: boolean; parent: any; text: string; fill: string; size: number; total: number;
	constructor(key: number, isGroup: boolean, parent: any, text: string, fill: string, size: number, total: number) {
		this.key = key; this.isGroup = isGroup; this.parent = parent; this.text = text; this.fill = fill; this.size = size; this.total = total;
	}
}

// Creates a random number (between MIN and MAX) of randomly colored nodes.
export function generateNodeData(minNodes: number, maxNodes: number, minChil: number, maxChil: number) {
	var nodeArray = [];
	if (minNodes === undefined || isNaN(minNodes) || minNodes < 1) minNodes = 1;
	if (maxNodes === undefined || isNaN(maxNodes) || maxNodes < minNodes) maxNodes = minNodes;

	// Create a bunch of node data
	var numNodes = Math.floor(Math.random() * (maxNodes - minNodes + 1)) + minNodes;
	for (var i = 0; i < numNodes; i++) {
		var size = Math.random() * Math.random() * 10000;  // non-uniform distribution
		//nodeArray.push(new nodes(i, false, undefined, i.toString(), go.Brush.randomColor(), size, -1));
		nodeArray.push({
			key: i,  // the unique identifier
			isGroup: false,  // many of these turn into groups, by code below
			parent: undefined as number,  // is set by code below that assigns children
			text: i.toString(),  // some text to be shown by the node template
			fill: go.Brush.randomColor(),  // a color to be shown by the node template
			size: size,
			total: -1  // use a negative value to indicate that the total for the group has not been computed
		});
	}

	// Takes the random collection of node data and creates a random tree with them.
	// Respects the minimum and maximum number of links from each node.
	// The minimum can be disregarded if we run out of nodes to link to.
	if (nodeArray.length > 1) {
		if (minChil === undefined || isNaN(minChil) || minChil < 0) minChil = 0;
		if (maxChil === undefined || isNaN(maxChil) || maxChil < minChil) maxChil = minChil;

		// keep the Set of node data that do not yet have a parent
		var available = new go.Set();
		available.addAll(nodeArray);
		for (var i = 0; i < nodeArray.length; i++) {
			var parent = nodeArray[i];
			available.remove(parent);

			// assign some number of node data as children of this parent node data
			var children = Math.floor(Math.random() * (maxChil - minChil + 1)) + minChil;
			for (var j = 0; j < children; j++) {
				var child: any = available.first();
				if (child === null) break;  // oops, ran out already
				available.remove(child);
				// have the child node data refer to the parent node data by its key
				child.parent = parent.key;
				if (!parent.isGroup) {  // make sure PARENT is a group
					parent.isGroup = true;
				}
				var par = parent;
				while (par !== null) {
					par.total += child.total;  // sum up sizes of all children
					if (par.parent !== undefined) {
						par = nodeArray[par.parent];
					} else {
						break;
					}
				}
			}
		}
	}
	return nodeArray;
}