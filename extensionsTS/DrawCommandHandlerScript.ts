"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { DrawCommandHandler } from "./DrawcommandHandler";

var myDiagram: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;  // for conciseness in defining templates

	myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
		{
      initialContentAlignment: go.Spot.Center,
			commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js
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
		(myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = "move";
	} else if (select.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = "select";
	} else if (scroll.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = "scroll";
	}
}

export function lefts() { (myDiagram.commandHandler as DrawCommandHandler).alignLeft(); }
export function rights() { (myDiagram.commandHandler as DrawCommandHandler).alignRight(); }
export function tops() { (myDiagram.commandHandler as DrawCommandHandler).alignTop(); }
export function bottoms() { (myDiagram.commandHandler as DrawCommandHandler).alignBottom(); }
export function cenX() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterX(); }
export function cenY() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterY(); }
export function row() { (myDiagram.commandHandler as DrawCommandHandler).alignRow(askSpace()); }
export function column() { (myDiagram.commandHandler as DrawCommandHandler).alignColumn(askSpace()); }
export function rotate45() { (myDiagram.commandHandler as DrawCommandHandler).rotate(45); }
export function rotateNeg45() { (myDiagram.commandHandler as DrawCommandHandler).rotate(-45); }
export function rotate90() { (myDiagram.commandHandler as DrawCommandHandler).rotate(90); }
export function rotateNeg90() { (myDiagram.commandHandler as DrawCommandHandler).rotate(-90); }
export function rotate180() { (myDiagram.commandHandler as DrawCommandHandler).rotate(180); }