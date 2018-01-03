"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { LinkLabelDraggingTool } from "./LinkLabelDraggingTool";

var myDiagram: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;  // for conciseness in defining templates

	myDiagram =
		$(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
			{
        initialContentAlignment: go.Spot.Center,
			  // have mouse wheel events zoom in and out instead of scroll up and down
				"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
				// support double-click in background creating a new node
				"clickCreatingTool.archetypeNodeData": { text: "new node" },
				// enable undo & redo
				"undoManager.isEnabled": true
			});

	// install the LinkLabelDraggingTool as a "mouse move" tool
	myDiagram.toolManager.mouseMoveTools.insertAt(0, new LinkLabelDraggingTool());

	// when the document is modified, add a "*" to the title and enable the "Save" button
	myDiagram.addDiagramListener("Modified", (e: go.DiagramEvent) => {
		var button = (document.getElementById("SaveButton") as any);
		if (button) button.disabled = !myDiagram.isModified;
		var idx = document.title.indexOf("*");
		if (myDiagram.isModified) {
			if (idx < 0) document.title += "*";
		} else {
			if (idx >= 0) document.title = document.title.substr(0, idx);
		}
	});

	// define the Node template
	myDiagram.nodeTemplate =
		$(go.Node, "Auto",
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			// define the node's outer shape, which will surround the TextBlock
			$(go.Shape, "RoundedRectangle",
				{
					parameter1: 20,  // the corner has a large radius
					fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
					stroke: "black",
					portId: "",
					fromLinkable: true,
					fromLinkableSelfNode: true,
					fromLinkableDuplicates: true,
					toLinkable: true,
					toLinkableSelfNode: true,
					toLinkableDuplicates: true,
					cursor: "pointer"
				}),
			$(go.TextBlock,
				{
					font: "bold 11pt helvetica, bold arial, sans-serif",
					editable: true  // editing the text automatically updates the model data
				},
				new go.Binding("text", "text").makeTwoWay())
		);

	// unlike the normal selection Adornment, this one includes a Button
	myDiagram.nodeTemplate.selectionAdornmentTemplate =
		$(go.Adornment, "Spot",
			$(go.Panel, "Auto",
				$(go.Shape, { fill: null, stroke: "blue", strokeWidth: 2 }),
				$(go.Placeholder)  // this represents the selected Node
			),
			// the button to create a "next" node, at the top-right corner
			$("Button",
				{
					alignment: go.Spot.TopRight,
					click: addNodeAndLink  // this function is defined below
				},
				$(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
			) // end button
		); // end Adornment

	// clicking the button inserts a new node to the right of the selected node,
	// and adds a link to that new node
	function addNodeAndLink(e: go.InputEvent, obj: go.GraphObject) {
		var adorn = obj.part;
		e.handled = true;
		var diagram = adorn.diagram;
		diagram.startTransaction("Add State");

		// get the node data for which the user clicked the button
		var fromNode = (adorn as go.Adornment).adornedPart;
		var fromData = fromNode.data;
		// create a new "State" data object, positioned off to the right of the adorned Node
		var toData: any = { text: "new" };
		var p = fromNode.location.copy();
		p.x += 200;
		toData.loc = go.Point.stringify(p);  // the "loc" property is a string, not a Point object
		// add the new node data to the model
		var model = diagram.model as go.GraphLinksModel;
		model.addNodeData(toData);

		// create a link data from the old node data to the new node data
		var linkdata = {
			from: model.getKeyForNodeData(fromData),  // or just: fromData.id
			to: model.getKeyForNodeData(toData),
			text: "transition"
		};
		// and add the link data to the model
		model.addLinkData(linkdata);

		// select the new Node
		var newnode = diagram.findNodeForData(toData);
		diagram.select(newnode);

		diagram.commitTransaction("Add State");

		// if the new node is off-screen, scroll the diagram to show the new node
		diagram.scrollToRect(newnode.actualBounds);
	}

	// replace the default Link template in the linkTemplateMap
	myDiagram.linkTemplate =
		$(go.Link,  // the whole link panel
			{ curve: go.Link.Bezier, adjusting: go.Link.Stretch, reshapable: true },
			new go.Binding("points").makeTwoWay(),
			new go.Binding("curviness", "curviness"),
			$(go.Shape,  // the link shape
				{ strokeWidth: 1.5 }),
			$(go.Shape,  // the arrowhead
				{ toArrow: "standard", stroke: null }),
			$(go.Panel, "Auto",
				{ cursor: "move" },  // visual hint that the user can do something with this link label
				$(go.Shape,  // the label background, which becomes transparent around the edges
					{
						fill: $(go.Brush, "Radial",
							{ 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
						stroke: null
					}),
				$(go.TextBlock, "transition",  // the label text
					{
						textAlign: "center",
						font: "10pt helvetica, arial, sans-serif",
						stroke: "black",
						margin: 4,
						editable: true  // editing the text automatically updates the model data
					},
					new go.Binding("text", "text").makeTwoWay()),
				// The GraphObject.segmentOffset property is what the LinkLabelDraggingTool modifies.
				// This TwoWay binding saves any changes to the same named property on the link data.
				new go.Binding("segmentOffset", "segmentOffset", go.Point.parse).makeTwoWay(go.Point.stringify)
			)
		);

	// read in the JSON-format data from the "mySavedModel" element
	load();
}

// Show the diagram's model in JSON format
export function save() {
	(document.getElementById("mySavedModel") as any).value = myDiagram.model.toJson();
	myDiagram.isModified = false;
}
export function load() {
	myDiagram.model = go.Model.fromJson((document.getElementById("mySavedModel") as any).value);
}