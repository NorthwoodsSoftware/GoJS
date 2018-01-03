"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { DragCreatingTool } from "./DragCreatingTool";

var myDiagram: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this  

	const $ = go.GraphObject.make;  // for conciseness in defining templates

	myDiagram =
		$(go.Diagram, "myDiagramDiv",
			{
        initialContentAlignment: go.Spot.Center,
			  // Define the template for Nodes, just some text inside a colored rectangle
				nodeTemplate:
				$(go.Node, "Auto",
					{ minSize: new go.Size(60, 20), resizable: true },
					new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
					new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
					// temporarily put selected nodes in ForegFround layer
					new go.Binding("layerName", "isSelected", (s) => { return s ? "Foreground" : ""; }).ofObject(),
					$(go.Shape, "Rectangle",
						new go.Binding("fill", "color")),
					$(go.TextBlock,
						{ margin: 2 },
						new go.Binding("text", "color"))),
				"undoManager.isEnabled": true
			});

	myDiagram.add(
		$(go.Part,
			{ layerName: "Grid", location: new go.Point(0, 0) },
			$(go.TextBlock, "Mouse-down and then drag in the background\nto add a Node there with the drawn size.",
				{ stroke: "brown" })
		));

	// Add an instance of the custom tool defined in DragCreatingTool.js.
	// This needs to be inserted before the standard DragSelectingTool,
	// which is normally the third Tool in the ToolManager.mouseMoveTools list.
	// Note that if you do not set the DragCreatingTool.delay, the default value will
	// require a wait after the mouse down event.  Not waiting will allow the DragSelectingTool
	// and the PanningTool to be able to run instead of the DragCreatingTool, depending on the delay.
	myDiagram.toolManager.mouseMoveTools.insertAt(2,
		$(DragCreatingTool,
			{
				isEnabled: true,  // disabled by the checkbox
				delay: 0,  // always canStart(), so PanningTool never gets the chance to run
				box: $(go.Part,
					{ layerName: "Tool" },
					$(go.Shape,
						{ name: "SHAPE", fill: null, stroke: "cyan", strokeWidth: 2 })
				),
				archetypeNodeData: { color: "white" }, // initial properties shared by all nodes
				insertPart: function (bounds: go.Rect) {  // override DragCreatingTool.insertPart
					// use a different color each time
					this.archetypeNodeData.color = go.Brush.randomColor();
					// call the base method to do normal behavior and return its result
					return DragCreatingTool.prototype.insertPart.call(this, bounds);
				}
			}));
}

export function toolEnabled() {
	var enable = (document.getElementById("ToolEnabled") as any).checked;
	var tool = myDiagram.toolManager.findTool("DragCreating");
	if (tool !== null) tool.isEnabled = enable;
}