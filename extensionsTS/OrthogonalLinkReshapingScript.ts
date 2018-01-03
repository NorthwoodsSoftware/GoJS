"use strict"
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { OrthogonalLinkReshapingTool } from "./OrthogonalLinkReshapingTool";

var myDiagram: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;

	myDiagram =
		$(go.Diagram, "myDiagramDiv",
			{
        initialContentAlignment: go.Spot.Center,
			  "undoManager.isEnabled": true,
				"linkReshapingTool": new OrthogonalLinkReshapingTool()
			});

	myDiagram.nodeTemplate =
		$(go.Node, "Auto",
			{
				width: 80,
				height: 50,
				locationSpot: go.Spot.Center
			},
			new go.Binding("location"),
			$(go.Shape, { fill: "lightgray" }),
			$(go.TextBlock, { margin: 10 },
				new go.Binding("text", "key"))
		);

	myDiagram.linkTemplate =
		$(go.Link,
			{
				routing: go.Link.AvoidsNodes,
				reshapable: true,
				resegmentable: true
			},
			$(go.Shape, { strokeWidth: 2 })
		);

	myDiagram.model = new go.GraphLinksModel([
		{ key: "Alpha", location: new go.Point(0, 0) },
		{ key: "Beta", location: new go.Point(200, 0) },
		{ key: "Gamma", location: new go.Point(100, 0) }
	], [
			{ from: "Alpha", to: "Beta" }
		]);

	myDiagram.addDiagramListener("InitialLayoutCompleted", (e) => {
		// select the Link in order to show its two additional Adornments, for shifting the ends
		myDiagram.links.first().isSelected = true;
	});
}

export function updateRouting() {
	var routing = getRadioValue("routing");
	var newRouting = (routing === "orthogonal") ? go.Link.Orthogonal : go.Link.AvoidsNodes;
	myDiagram.startTransaction("update routing");
	myDiagram.linkTemplate.routing = newRouting;
	myDiagram.links.each((l) => {
		l.routing = newRouting;
	});
	myDiagram.commitTransaction("update routing");
}

export function getRadioValue(name: string) {
	var radio = (document.getElementsByName(name) as any);
	for (var i = 0; i < radio.length; i++)
		if (radio[i].checked) return radio[i].value;
}