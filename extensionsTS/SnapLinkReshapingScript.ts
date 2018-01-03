"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { SnapLinkReshapingTool } from "./SnapLinkReshapingTool"

var myDiagram: go.Diagram;
var myPalette: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this
	
	const $ = go.GraphObject.make;  // for conciseness in defining templates

	myDiagram =
		$(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
			{
        initialContentAlignment: go.Spot.Center,
			  // supply a simple narrow grid that manually reshaped link routes will follow
				grid: $(go.Panel, "Grid",
					{ gridCellSize: new go.Size(8, 8) },
					$(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
					$(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 })
				),
				allowDrop: true,  // must be true to accept drops from the Palette
				"draggingTool.isGridSnapEnabled": true,
				linkReshapingTool: $(SnapLinkReshapingTool),
				// when the user reshapes a Link, change its Link.routing from AvoidsNodes to Orthogonal,
				// so that combined with Link.adjusting == End the link will retain its reshaped mid points
				// even after nodes are moved
				"LinkReshaped": (e: go.DiagramEvent) => { e.subject.routing = go.Link.Orthogonal; },
				"animationManager.isEnabled": false,
				"undoManager.isEnabled": true
			});

	// when the document is modified, add a "*" to the title and enable the "Save" button
	myDiagram.addDiagramListener("Modified", (e) => {
		var button = (document.getElementById("SaveButton") as any);
		if (button) button.disabled = !myDiagram.isModified;
		var idx = document.title.indexOf("*");
		if (myDiagram.isModified) {
			if (idx < 0) document.title += "*";
		} else {
			if (idx >= 0) document.title = document.title.substr(0, idx);
		}
	});

	// Define a function for creating a "port" that is normally transparent.
	// The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
	// and where the port is positioned on the node, and the boolean "output" and "input" arguments
	// control whether the user can draw links from or to the port.
	function makePort(name: string, spot: go.Spot, output: boolean, input: boolean) {
		// the port is basically just a small transparent square
		return $(go.Shape, "Circle",
			{
				fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
				stroke: null,
				desiredSize: new go.Size(7, 7),
				alignment: spot,  // align the port on the main Shape
				alignmentFocus: spot,  // just inside the Shape
				portId: name,  // declare this object to be a "port"
				fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
				fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
				cursor: "pointer"  // show a different cursor to indicate potential link point
			});
	}

	myDiagram.nodeTemplate =
		$(go.Node, "Spot",
			{ locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			{ selectable: true },
			{ resizable: true, resizeObjectName: "PANEL" },
			// the main object is a Panel that surrounds a TextBlock with a Shape
			$(go.Panel, "Auto",
				{ name: "PANEL" },
				new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
				$(go.Shape, "Rectangle",  // default figure
					{
						portId: "", // the default port: if no spot on link data, use closest side
						fromLinkable: true, toLinkable: true, cursor: "pointer",
						fill: "white"  // default color
					},
					new go.Binding("figure"),
					new go.Binding("fill")),
				$(go.TextBlock,
					{
						font: "bold 11pt Helvetica, Arial, sans-serif",
						margin: 8,
						maxSize: new go.Size(160, NaN),
						wrap: go.TextBlock.WrapFit,
						editable: true
					},
					new go.Binding("text").makeTwoWay())
			),
			// four small named ports, one on each side:
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false),
			{ // handle mouse enter/leave events to show/hide the ports
				mouseEnter: (e: go.InputEvent, node: go.Node) => { showSmallPorts(node, true); },
				mouseLeave: (e: go.InputEvent, node: go.Node) => { showSmallPorts(node, false); }
			}
		);

	function showSmallPorts(node: go.Node, show: boolean) {
		node.ports.each(function (port: go.Shape) {
			if (port.portId !== "") {  // don't change the default port, which is the big shape
				port.fill = show ? "rgba(0,0,0,.3)" : null;
			}
		});
	}

	myDiagram.linkTemplate =
		$(go.Link,  // the whole link panel
			{ relinkableFrom: true, relinkableTo: true, reshapable: true, resegmentable: true },
			{
				routing: go.Link.AvoidsNodes,  // but this is changed to go.Link.Orthgonal when the Link is reshaped
				adjusting: go.Link.End,
				curve: go.Link.JumpOver,
				corner: 5,
				toShortLength: 4
			},
			new go.Binding("points").makeTwoWay(),
			// remember the Link.routing too
			new go.Binding("routing", "routing", go.Binding.parseEnum(go.Link, go.Link.AvoidsNodes))
				.makeTwoWay(go.Binding.toString),
			$(go.Shape,  // the link path shape
				{ isPanelMain: true, strokeWidth: 2 }),
			$(go.Shape,  // the arrowhead
				{ toArrow: "Standard", stroke: null })
		);

	load();  // load an initial diagram from some JSON text

	var link = myDiagram.links.first();
	if (link) link.isSelected = true;

	// initialize the Palette that is on the left side of the page
	myPalette =
		$(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
			{
				maxSelectionCount: 1,
				nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
				model: new go.GraphLinksModel([  // specify the contents of the Palette
					{ text: "Start", figure: "Circle", fill: "green" },
					{ text: "Step" },
					{ text: "DB", figure: "Database", fill: "lightgray" },
					{ text: "???", figure: "Diamond", fill: "lightskyblue" },
					{ text: "End", figure: "Circle", fill: "red" },
					{ text: "Comment", figure: "RoundedRectangle", fill: "lightyellow" }
				])
			});
}


// Show the diagram's model in JSON format that the user may edit
export function save() {
	saveDiagramProperties();  // do this first, before writing to JSON
	(document.getElementById("mySavedModel") as any).value = myDiagram.model.toJson();
	myDiagram.isModified = false;
}
export function load() {
	myDiagram.model = go.Model.fromJson((document.getElementById("mySavedModel") as any).value);
	loadDiagramProperties();
}

function saveDiagramProperties() {
	myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
}
// Called by "InitialLayoutCompleted" DiagramEvent listener, NOT directly by load()!
function loadDiagramProperties() {
	// set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
	var pos = myDiagram.model.modelData.position;
	if (pos) myDiagram.initialPosition = go.Point.parse(pos);
}