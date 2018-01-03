"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { FishboneLayout } from "./FishboneLayout";
import { FishboneLink } from "./FishboneLayout";

var myDiagram: go.Diagram;

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this  F

	const $ = go.GraphObject.make;  // for conciseness in defining templates

	myDiagram =
		$(go.Diagram, "myDiagramDiv",  // refers to its DIV HTML element by id
      {
        initialContentAlignment: go.Spot.Center,
			  isReadOnly: true });  // do not allow the user to modify the diagram

	// define the normal node template, just some text
	myDiagram.nodeTemplate =
		$(go.Node, "Auto",
			$(go.TextBlock,
				new go.Binding("text"),
				new go.Binding("font", "", convertFont))
		);

	function convertFont(data: any) {
		var size = data.size;
		if (size === undefined) size = 13;
		var weight = data.weight;
		if (weight === undefined) weight = "";
		return weight + " " + size + "px sans-serif";
	}

	// This demo switches the Diagram.linkTemplate between the "normal" and the "fishbone" templates.
	// If you are only doing a FishboneLayout, you could just set Diagram.linkTemplate
	// to the template named "fishbone" here, and not switch templates dynamically.

	// define the non-fishbone link template
	myDiagram.linkTemplateMap.add("normal",
		$(go.Link,
			{ routing: go.Link.Orthogonal, corner: 4 },
			$(go.Shape)
		));

	// use this link template for fishbone layouts
	myDiagram.linkTemplateMap.add("fishbone",
		$(FishboneLink,  // defined above
			$(go.Shape)
		));

	// here is the structured data used to build the model
	var json =
		{
			"text": "Incorrect Deliveries", "size": 18, "weight": "Bold", "causes": [
				{
					"text": "Skills", "size": 14, "weight": "Bold", "causes": [
						{
							"text": "knowledge", "weight": "Bold", "causes": [
								{
									"text": "procedures", "causes": [
										{ "text": "documentation" }
									]
								},
								{ "text": "products" }
							]
						},
						{ "text": "literacy", "weight": "Bold" }
					]
				},
				{
					"text": "Procedures", "size": 14, "weight": "Bold", "causes": [
						{
							"text": "manual", "weight": "Bold", "causes": [
								{ "text": "consistency" }
							]
						},
						{
							"text": "automated", "weight": "Bold", "causes": [
								{ "text": "correctness" },
								{ "text": "reliability" }
							]
						}
					]
				},
				{
					"text": "Communication", "size": 14, "weight": "Bold", "causes": [
						{ "text": "ambiguity", "weight": "Bold" },
						{
							"text": "sales staff", "weight": "Bold", "causes": [
								{
									"text": "order details", "causes": [
										{ "text": "lack of knowledge" }
									]
								}
							]
						},
						{
							"text": "telephone orders", "weight": "Bold", "causes": [
								{ "text": "lack of information" }
							]
						},
						{
							"text": "picking slips", "weight": "Bold", "causes": [
								{ "text": "details" },
								{ "text": "legibility" }
							]
						}
					]
				},
				{
					"text": "Transport", "size": 14, "weight": "Bold", "causes": [
						{
							"text": "information", "weight": "Bold", "causes": [
								{ "text": "incorrect person" },
								{
									"text": "incorrect addresses", "causes": [
										{
											"text": "customer data base", "causes": [
												{ "text": "not up-to-date" },
												{ "text": "incorrect program" }
											]
										}
									]
								},
								{ "text": "incorrect dept" }
							]
						},
						{
							"text": "carriers", "weight": "Bold", "causes": [
								{ "text": "efficiency" },
								{ "text": "methods" }
							]
						}
					]
				}
			]
		};

	function walkJson(obj: any, arr: any) {
		var key = arr.length;
		obj.key = key;
		arr.push(obj);

		var children = obj.causes;
		if (children) {
			for (var i = 0; i < children.length; i++) {
				var o = children[i];
				o.parent = key;  // reference to parent node data
				walkJson(o, arr);
			}
		}
	}

	// build the tree model
	var nodeDataArray: Array<Object> = [];
	walkJson(json, nodeDataArray);
	myDiagram.model = new go.TreeModel(nodeDataArray);

	layoutFishbone();
}

// use FishboneLayout and FishboneLink
export function layoutFishbone() {
	myDiagram.startTransaction("fishbone layout");
	myDiagram.linkTemplate = myDiagram.linkTemplateMap.getValue("fishbone");
	myDiagram.layout = go.GraphObject.make(FishboneLayout, {  // defined above
		angle: 180,
		layerSpacing: 10,
		nodeSpacing: 20,
		rowSpacing: 10
	});
	myDiagram.commitTransaction("fishbone layout");
}

// make the layout a branching tree layout and use a normal link template
export function layoutBranching() {
	myDiagram.startTransaction("branching layout");
	myDiagram.linkTemplate = myDiagram.linkTemplateMap.getValue("normal");
	myDiagram.layout = go.GraphObject.make(go.TreeLayout, {
		angle: 180,
		layerSpacing: 20,
		alignment: go.TreeLayout.AlignmentBusBranching
	});
	myDiagram.commitTransaction("branching layout");
}

// make the layout a basic tree layout and use a normal link template
export function layoutNormal() {
	myDiagram.startTransaction("normal layout");
	myDiagram.linkTemplate = myDiagram.linkTemplateMap.getValue("normal");
	myDiagram.layout = go.GraphObject.make(go.TreeLayout, {
		angle: 180,
		breadthLimit: 1000,
		alignment: go.TreeLayout.AlignmentStart
	});
	myDiagram.commitTransaction("normal layout");
}