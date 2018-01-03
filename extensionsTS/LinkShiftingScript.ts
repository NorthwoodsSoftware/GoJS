"use strict"
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { LinkShiftingTool } from "./LinkShiftingTool";

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;

	let myDiagram =
		$(go.Diagram, "myDiagramDiv",
			{
        initialContentAlignment: go.Spot.Center,
			  "undoManager.isEnabled": true
			});
	myDiagram.toolManager.mouseDownTools.add($(LinkShiftingTool));

	myDiagram.nodeTemplate =
		$(go.Node, "Auto",
			{
				fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,
				fromLinkable: true, toLinkable: true,
				locationSpot: go.Spot.Center
			},
			new go.Binding("location"),
			$(go.Shape, { fill: "lightgray" }),
			$(go.TextBlock, { margin: 10 },
				{ fromLinkable: false, toLinkable: false },
				new go.Binding("text", "key"))
		);

	myDiagram.linkTemplate =
		$(go.Link,
			{
				reshapable: true, resegmentable: true,
				relinkableFrom: true, relinkableTo: true,
				adjusting: go.Link.Stretch
			},
			$(go.Shape),
			$(go.Shape, { toArrow: "Standard" })
		);

	myDiagram.model = new go.GraphLinksModel([
		{ key: "Alpha", location: new go.Point(0, 0) },
		{ key: "Beta", location: new go.Point(0, 100) }
	], [
			{ from: "Alpha", to: "Beta" }
		]);

	myDiagram.addDiagramListener("InitialLayoutCompleted", function (e: go.DiagramEvent) {
		// select the Link in order to show its two additional Adornments, for shifting the ends
		myDiagram.links.first().isSelected = true;
	});
}