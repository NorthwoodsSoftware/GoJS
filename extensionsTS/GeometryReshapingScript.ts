"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { GeometryReshapingTool } from "./GeometryReshapingTool";

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;

	let myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
		{
      initialContentAlignment: go.Spot.Center,
			"undoManager.isEnabled": true  // enable undo & redo
		});

	myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool());

	myDiagram.nodeTemplate =
		$(go.Node,
			{ reshapable: true },  // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
			$(go.Shape,
				{ name: "SHAPE", fill: "lightgray", strokeWidth: 1.5 },
				new go.Binding("geometryString", "geo").makeTwoWay()
			)
		);

	myDiagram.model = new go.GraphLinksModel([{ geo: "F M0 145 L75 2 L131 87 L195 0 L249 143z", key: -1 }], []);
}