"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { NonRealtimeDraggingTool } from "./NonRealtimeDraggingTool";

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;

	let myDiagram =
		$(go.Diagram, "myDiagramDiv",
      {
        initialContentAlignment: go.Spot.Center,
			  // install the replacement DraggingTool:
				draggingTool: new NonRealtimeDraggingTool(),
				"undoManager.isEnabled": true
			});

	myDiagram.nodeTemplate =
		$(go.Node, "Auto",
			{ locationSpot: go.Spot.Center },
			$(go.Shape, "Circle",
				{
					fill: "white", // the default fill, if there is no data-binding
					portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
					// allow all kinds of links from and to this port
					fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
					toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
				},
				new go.Binding("fill", "color")),
			$(go.TextBlock,
				{
					font: "bold 14px sans-serif",
					stroke: '#333',
					margin: 6,  // make some extra space for the shape around the text
					isMultiline: false,  // don't allow newlines in text
					editable: true  // allow in-place editing by user
				},
				new go.Binding("text", "text").makeTwoWay())  // the label shows the node data's text
		);

	myDiagram.model = new go.GraphLinksModel([
		{ key: 1, text: "Alpha", color: "lightblue" },
		{ key: 2, text: "Beta", color: "orange" },
		{ key: 3, text: "Gamma", color: "lightgreen", group: 5 },
		{ key: 4, text: "Delta", color: "pink", group: 5 },
		{ key: 5, text: "Epsilon", color: "green", isGroup: true }
	],
	[
		{ from: 1, to: 2, color: "blue" },
		{ from: 2, to: 2 },
		{ from: 3, to: 4, color: "green" },
		{ from: 3, to: 1, color: "purple" }
	]);
}