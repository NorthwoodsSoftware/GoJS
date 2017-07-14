"use strict";
/*
*  Copyright (C) 1998-2017 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

var myDiagram: go.Diagram = null;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this  

	var $ = go.GraphObject.make;

	myDiagram =
		$(go.Diagram, "myDiagramDiv",
			{ initialContentAlignment: go.Spot.Center });

	myDiagram.nodeTemplate =
		$(go.Node, "Auto",
			$(go.Shape, "Ellipse", { fill: "lightskyblue" }),
			$("HyperlinkText",
				function (node: go.Node) { return "https://gojs.net/" + node.data.version; },
				function (node: go.Node) { return "Visit GoJS " + node.data.version; },
				{ margin: 10 }
			)
		);

	myDiagram.model = new go.GraphLinksModel([
		{ key: 1, version: "beta" },
		{ key: 2, version: "latest" },
	], [
			{ from: 1, to: 2 }
		]);
}