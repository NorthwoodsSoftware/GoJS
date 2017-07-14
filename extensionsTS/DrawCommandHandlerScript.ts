"use strict";
/*
*  Copyright (C) 1998-2017 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { DrawCommandHandlerTool } from "./DrawcommandHandlerTool";

var myDiagram: go.Diagram = null;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this  

	var $ = go.GraphObject.make;  // for conciseness in defining templates

	myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
		{
			initialContentAlignment: go.Spot.Center,  // center the content
			commandHandler: new DrawCommandHandlerTool(),  // defined in DrawCommandHandler.js
			"undoManager.isEnabled": true  // enable undo & redo
		});

	// define a simple Node template
	myDiagram.nodeTemplate =
		$(go.Node, "Auto",  // the Shape will go around the TextBlock
			{ locationSpot: go.Spot.Center },
			$(go.Shape, "RoundedRectangle", { strokeWidth: 0 },
				// Shape.fill is bound to Node.data.color
				new go.Binding("fill", "color")),
			$(go.TextBlock,
				{ margin: 8 },  // some room around the text
				// TextBlock.text is bound to Node.data.key
				new go.Binding("text", "key"))
		);

	// but use the default Link template, by not setting Diagram.linkTemplate

	// create the model data that will be represented by Nodes and Links
	myDiagram.model = new go.GraphLinksModel(
		[
			{ key: "Alpha", color: "lightblue" },
			{ key: "Beta", color: "orange" },
			{ key: "Gamma", color: "lightgreen" },
			{ key: "Delta", color: "pink" }
		],
		[
			{ from: "Alpha", to: "Beta" },
			{ from: "Alpha", to: "Gamma" },
			{ from: "Beta", to: "Beta" },
			{ from: "Gamma", to: "Delta" },
			{ from: "Delta", to: "Alpha" }
		]);
}

export function askSpace() {
	var space: number = parseInt(prompt("Desired space between nodes (in pixels):", "0"));
	return space;
}

// update arrowkey function
export function arrowMode() {
	// no transaction needed, because we are modifying the CommandHandler for future use
	var move = (document.getElementById("move") as any);
	var select = (document.getElementById("select") as any);
	var scroll = (document.getElementById("scroll") as any);
	if (move.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandlerTool).arrowKeyBehavior = "move";
	} else if (select.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandlerTool).arrowKeyBehavior = "select";
	} else if (scroll.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandlerTool).arrowKeyBehavior = "scroll";
	}
}

export function lefts() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignLeft(); }
export function rights() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignRight(); }
export function tops() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignTop(); }
export function bottoms() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignBottom(); }
export function cenX() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignCenterX(); }
export function cenY() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignCenterY(); }
export function row() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignRow(askSpace()); }
export function column() { (myDiagram.commandHandler as DrawCommandHandlerTool).alignColumn(askSpace()); }
export function rotate45() { (myDiagram.commandHandler as DrawCommandHandlerTool).rotate(45); }
export function rotateNeg45() { (myDiagram.commandHandler as DrawCommandHandlerTool).rotate(-45); }
export function rotate90() { (myDiagram.commandHandler as DrawCommandHandlerTool).rotate(90); }
export function rotateNeg90() { (myDiagram.commandHandler as DrawCommandHandlerTool).rotate(-90); }
export function rotate180() { (myDiagram.commandHandler as DrawCommandHandlerTool).rotate(180); }