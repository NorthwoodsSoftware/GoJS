"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { FreehandDrawingTool } from "./FreehandDrawingTool";
import { GeometryReshapingTool } from "./GeometryReshapingTool";

var myDiagram: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;

	myDiagram =
    $(go.Diagram, "myDiagramDiv",
      {
        initialContentAlignment: go.Spot.Center
			});

	myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool());

	myDiagram.nodeTemplateMap.add("FreehandDrawing",
		$(go.Part,
			{ locationSpot: go.Spot.Center, isLayoutPositioned: false },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			{
				selectionAdorned: true, selectionObjectName: "SHAPE",
				selectionAdornmentTemplate:  // custom selection adornment: a blue rectangle
				$(go.Adornment, "Auto",
					$(go.Shape, { stroke: "dodgerblue", fill: null }),
					$(go.Placeholder, { margin: -1 }))
			},
			{ resizable: true, resizeObjectName: "SHAPE" },
			{ rotatable: true, rotateObjectName: "SHAPE" },
			{ reshapable: true },  // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
			$(go.Shape,
				{ name: "SHAPE", fill: null, strokeWidth: 1.5 },
				new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
				new go.Binding("angle").makeTwoWay(),
				new go.Binding("geometryString", "geo").makeTwoWay(),
				new go.Binding("fill"),
				new go.Binding("stroke"),
				new go.Binding("strokeWidth"))
		));

	// create drawing tool for myDiagram, defined in FreehandDrawingTool.js
	var tool = new FreehandDrawingTool();
	// provide the default JavaScript object for a new polygon in the model
	tool.archetypePartData =
		{ stroke: "green", strokeWidth: 3, category: "FreehandDrawing" };
	// allow the tool to start on top of an existing Part
	tool.isBackgroundOnly = false;
	// install as first mouse-move-tool
	myDiagram.toolManager.mouseMoveTools.insertAt(0, tool);

	load();  // load a simple diagram from the textarea
}

export function mode(draw: boolean) {
	var tool = myDiagram.toolManager.findTool("FreehandDrawing");
	tool.isEnabled = draw;
}

export function updateAllAdornments() {  // called after checkboxes change Diagram.allow...
	myDiagram.selection.each(function (p) { p.updateAdornments(); });
}

// save a model to and load a model from Json text, displayed below the Diagram
export function save() {
	var str = '{ "position": "' + go.Point.stringify(myDiagram.position) + '",\n  "model": ' + myDiagram.model.toJson() + ' }';
	(document.getElementById("mySavedDiagram") as any).value = str;
}
export function load() {
	var str = (document.getElementById("mySavedDiagram") as any).value;
	try {
		var json = JSON.parse(str);
		myDiagram.initialPosition = go.Point.parse(json.position || "0 0");
		myDiagram.model = go.Model.fromJson(json.model);
		myDiagram.model.undoManager.isEnabled = true;
	} catch (ex) {
		alert(ex);
	}
}

export function select() {
	mode(false);
}
export function drawMode() {
	mode(true);
}
export function allowResizing() {
	myDiagram.allowResize = !myDiagram.allowResize; updateAllAdornments();
}
export function allowReshaping() {
	myDiagram.allowReshape = !myDiagram.allowReshape; updateAllAdornments();
}
export function allowRotating() {
	myDiagram.allowRotate = !myDiagram.allowRotate; updateAllAdornments();
}