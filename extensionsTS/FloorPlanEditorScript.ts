"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/
import * as go from "../release/go";
import { DrawCommandHandler } from "./DrawCommandHandler";
import { RotateMultipleTool } from "./RotateMultipleTool";
import { ResizeMultipleTool } from "./ResizeMultipleTool";
import { GuidedDraggingTool } from "./GuidedDraggingTool";


/*function checkLocalStorage () {
        try {
            window.localStorage.setItem('item', 'item');
            window.localStorage.removeItem('item');
            return true;
        } catch (e) {
            return false;
        }
    }*/

var myDiagram: go.Diagram;

export function init() {

	// hides open HTML Element
	var openDocument = document.getElementById("openDocument");
	openDocument.style.visibility = "hidden";
	// hides remove HTML Element
	var removeDocument = document.getElementById("removeDocument");
	removeDocument.style.visibility = "hidden";

	const $ = go.GraphObject.make;  // for more concise visual tree definitions

	myDiagram =
		$(go.Diagram, "myDiagramDiv",
			{
        initialContentAlignment: go.Spot.Center,
			  allowDrop: true,  // accept drops from palette
				allowLink: false,  // no user-drawn links

				commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js
				// default to having arrow keys move selected nodes
				"commandHandler.arrowKeyBehavior": "move",
				// allow Ctrl-G to call groupSelection()
				"commandHandler.archetypeGroupData": { text: "Group", isGroup: true },

				rotatingTool: new RotateMultipleTool(),  // defined in RotateMultipleTool.js

				resizingTool: new ResizeMultipleTool(),  // defined in ResizeMultipleTool.js

				draggingTool: new GuidedDraggingTool(),  // defined in GuidedDraggingTool.js
				"draggingTool.horizontalGuidelineColor": "blue",
				"draggingTool.verticalGuidelineColor": "blue",
				"draggingTool.centerGuidelineColor": "green",
				"draggingTool.guidelineWidth": 1,

				// notice whenever the selection may have changed
				"ChangedSelection": enableAll,  // defined below, to enable/disable commands

				// notice when the Paste command may need to be reenabled
				"ClipboardChanged": enableAll,

				// notice when an object has been dropped from the palette
				"ExternalObjectsDropped": function (e: go.DiagramEvent) {
					document.getElementById("myDiagramDiv").focus();  // assume keyboard focus should be on myDiagram
					(myDiagram.toolManager.draggingTool as GuidedDraggingTool).clearGuidelines();  // remove any guidelines
				}

			});


	// sets the qualities of the tooltip
	var tooltiptemplate =
		$(go.Adornment, go.Panel.Auto,
			$(go.Shape, "RoundedRectangle",
				{ fill: "whitesmoke", stroke: "gray" }),
			$(go.TextBlock,
				{ margin: 3, editable: true },
				// converts data about the part into a string
				new go.Binding("text", "", function (data) {
					if (data.item != undefined) return data.item;
					return "(unnamed item)";
				}))
		);

	// Define the generic furniture and structure Nodes.
	// The Shape gets it Geometry from a geometry path string in the bound data.
	myDiagram.nodeTemplate =
		$(go.Node, "Spot",
			{
				locationObjectName: "SHAPE",
				locationSpot: go.Spot.Center,
				toolTip: tooltiptemplate,
				selectionAdorned: false  // use a Binding on the Shape.stroke to show selection
			},
			// remember the location of this Node
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			// move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts
			new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(),
			// can be resided according to the user's desires
			{ resizable: true, resizeObjectName: "SHAPE" },
			{ rotatable: true, rotateObjectName: "SHAPE" },
			$(go.Shape,
				{
					name: "SHAPE",
					// the following are default values;
					// actual values may come from the node data object via data-binding
					geometryString: "F1 M0 0 L20 0 20 20 0 20 z",
					fill: "rgb(130, 130, 256)"
				},
				// this determines the actual shape of the Shape
				new go.Binding("geometryString", "geo"),
				// allows the color to be determined by the node data
				new go.Binding("fill", "color"),
				// selection causes the stroke to be blue instead of black
				new go.Binding("stroke", "isSelected", function (s) { return s ? "dodgerblue" : "black"; }).ofObject(),
				// remember the size of this node
				new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
				// can set the angle of this Node
				new go.Binding("angle", "angle").makeTwoWay()
			)
		);

	myDiagram.nodeTemplate.contextMenu =
		$(go.Adornment, "Vertical",
			$("ContextMenuButton",
				$(go.TextBlock, "Rename", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { rename(obj); } }),
			$("ContextMenuButton",
				$(go.TextBlock, "Cut", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { myDiagram.commandHandler.cutSelection(); } }),
			$("ContextMenuButton",
				$(go.TextBlock, "Copy", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { myDiagram.commandHandler.copySelection(); } }),
			$("ContextMenuButton",
				$(go.TextBlock, "Rotate +45", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { (myDiagram.commandHandler as DrawCommandHandler).rotate(45); } }),
			$("ContextMenuButton",
				$(go.TextBlock, "Rotate -45", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { (myDiagram.commandHandler as DrawCommandHandler).rotate(-45); } }),
			$("ContextMenuButton",
				$(go.TextBlock, "Rotate +90", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { (myDiagram.commandHandler as DrawCommandHandler).rotate(90); } }),
			$("ContextMenuButton",
				$(go.TextBlock, "Rotate -90", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { (myDiagram.commandHandler as DrawCommandHandler).rotate(-90); } }),
			$("ContextMenuButton",
				$(go.TextBlock, "Rotate 180", { margin: 3 }),
				{ click: function (e: go.InputEvent, obj: go.GraphObject) { (myDiagram.commandHandler as DrawCommandHandler).rotate(180); } })
		);


	// group settings from basic.html to lock things together
	myDiagram.groupTemplate =
		$(go.Group, go.Panel.Auto,
			{
				ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
				toolTip: tooltiptemplate
			},
			$(go.Shape, "Rectangle",  // the Group is not seen but can be selected due to the transparent fill
				{ fill: "transparent", stroke: "lightgray", strokeWidth: 1 }),
			$(go.Placeholder)
		);

	// make grouped Parts unselectable
	myDiagram.addDiagramListener("SelectionGrouped", (e: go.DiagramEvent) => {
		// e.subject should be the new Group
		e.subject.memberParts.each((part: go.Part) => { part.selectable = false; });
	});

	myDiagram.addDiagramListener("SelectionUngrouped", (e: go.DiagramEvent) => {
		// e.parameter should be collection of ungrouped former members
		e.parameter.each((part: go.Part) => {
			part.selectable = true;
			part.isSelected = true;
		});
	});

	myDiagram.addDiagramListener("SelectionCopied", (e: go.DiagramEvent) => {
		// selection collection will be modified during this loop,
		// so make a copy of it first
		var sel = myDiagram.selection.toArray();
		for (var i = 0; i < sel.length; i++) {
			var part = sel[i];
			// don't have any members of Groups be selected or selectable
			if (part instanceof go.Group) {
				var mems = new go.Set().addAll(part.memberParts);
				mems.each(function (member) {
					(<any>member).isSelected = false;
					(<any>member).selectable = false;
				});
			}
		}
	});

	// change the title to indicate that the diagram has been modified
	myDiagram.addDiagramListener("Modified", (e: go.DiagramEvent) => {
		var currentFile = document.getElementById("currentFile");
		var idx = currentFile.textContent.indexOf("*");
		if (myDiagram.isModified) {
			if (idx < 0) currentFile.textContent = currentFile.textContent + "*";
		} else {
			if (idx >= 0) currentFile.textContent = currentFile.textContent.substr(0, idx);
		}
	});


	// the Palette

	// brushes for furniture structures
	var wood = $(go.Brush, "Linear", { 0: "#964514", 1: "#5E2605" });
	var wall = $(go.Brush, "Linear", { 0: "#A8A8A8", 1: "#545454" });
	var blue = $(go.Brush, "Linear", { 0: "#42C0FB", 1: "#009ACD" });
	var metal = $(go.Brush, "Linear", { 0: "#A8A8A8", 1: "#474747" });
	var green = $(go.Brush, "Linear", { 0: "#9CCB19", 1: "#698B22" });

	// default structures and furniture
	let myPalette =
		$(go.Palette, "myPaletteDiv",
			{
				nodeTemplate: myDiagram.nodeTemplate,  // shared with the main Diagram
				"contextMenuTool.isEnabled": false,  // but disable context menus
				allowZoom: false,
				layout: $(go.GridLayout, { cellSize: new go.Size(1, 1), spacing: new go.Size(5, 5) }),
				// initialize the Palette with a few furniture and structure nodes
				model: $(go.GraphLinksModel,
					{
						nodeDataArray: [
							{
								key: 1,
								geo: "F1 M0 0 L5,0 5,40 0,40 0,0z x M0,0 a40,40 0 0,0 -40,40 ",
								item: "left door",
								color: wall
							},
							{
								key: 2,
								geo: "F1 M0 0 L5,0 5,40 0,40 0,0z x M5,0 a40,40 0 0,1 40,40 ",
								item: "right door",
								color: wall
							},
							{
								key: 3, angle: 90,
								geo: "F1 M0,0 L0,100 12,100 12,0 0,0z",
								item: "wall",
								color: wall
							},
							{
								key: 4, angle: 90,
								geo: "F1 M0,0 L0,50 10,50 10,0 0,0 x M5,0 L5,50z",
								item: "window",
								color: "whitesmoke"
							},
							{
								key: 5,
								geo: "F1 M0,0 L50,0 50,12 12,12 12,50 0,50 0,0 z",
								item: "corner",
								color: wall
							},
							{
								key: 6,
								geo: "F1 M0 0 L40 0 40 40 0 40 0 0 x M0 10 L40 10 x M 8 10 8 40 x M 32 10 32 40 z",
								item: "arm chair",
								color: blue
							},
							{
								key: 7,
								geo: "F1 M0 0 L80,0 80,40 0,40 0 0 x M0,10 L80,10 x M 7,10 7,40 x M 73,10 73,40 z",
								item: "couch",
								color: blue
							},
							{
								key: 8,
								geo: "F1 M0 0 L30 0 30 30 0 30 z",
								item: "Side Table",
								color: wood
							},
							{
								key: 9,
								geo: "F1 M0 0 L80,0 80,90 0,90 0,0 x M0,7 L80,7 x M 0,30 80,30 z",
								item: "queen bed",
								color: green
							},
							{
								key: 10,
								geo: "F1 M5 5 L30,5 35,30 0,30 5,5 x F M0 0 L 35,0 35,5 0,5 0,0 z",
								item: "chair",
								color: wood
							},
							{
								key: 11,
								geo: "F1 M0 0 L50,0 50,90 0,90 0,0 x M0,7 L50,7 x M 0,30 50,30 z",
								item: "twin bed",
								color: green
							},
							{
								key: 12,
								geo: "F1 M0 0 L0 60 80 60 80 0z",
								item: "kitchen table",
								color: wood
							},
							{
								key: 13,
								geo: "F1 M 0,0 a35,35 0 1,0 1,-1 z",
								item: "round table",
								color: wood
							},
							{
								key: 14,
								geo: "F1 M 0,0 L35,0 35,30 0,30 0,0 x M 5,5 L 30, 5 30,25 5,25 5,5 x M 17,2 L 17,10 19,10 19,2 17,2 z",
								item: "kitchen sink",
								color: metal
							},
							{
								key: 15,
								geo: "F1 M0,0 L55,0, 55,50, 0,50 0,0 x M 40,7 a 7,7 0 1 0 0.00001 0z x M 40,10 a 4,4 0 1 0 0.00001 0z x M 38,27 a 7,7 0 1 0 0.00001 0z x M 38,30 a 4,4 0 1 0 0.00001 0z x M 16,27 a 7,7 0 1 0 0.00001 0z xM 16,30 a 4,4 0 1 0 0.00001 0z x M 14,7 a 7,7 0 1 0 0.00001 0z x M 14,10 a 4,4 0 1 0 0.00001 0z",
								item: "stove",
								color: metal
							},
							{
								key: 16,
								geo: "F1 M0,0 L55,0, 55,50, 0,50 0,0 x F1 M0,51 L55,51 55,60 0,60 0,51 x F1 M5,60 L10,60 10,63 5,63z",
								item: "refrigerator",
								color: metal
							},
							{
								key: 17,
								geo: "F1 M0,0 100,0 100,40 0,40z",
								item: "bookcase",
								color: wood
							},
							{
								key: 18,
								geo: "F1 M0,0 70,0 70,50 0,50 0,0 x F1 M15,58 55,58 55,62 15,62 x F1 M17,58 16,50 54,50 53,58z",
								item: "desk",
								color: wood
							},
						]  // end nodeDataArray
					})  // end model
			});  // end Palette


	// the Overview

	let myOverview =
		$(go.Overview, "myOverviewDiv",
			{ observed: myDiagram, maxScale: 0.5 });

	// change color of viewport border in Overview
	(myOverview.box.elt(0) as go.Shape).stroke = "dodgerblue";


	// start off with an empty document
	myDiagram.isModified = false;
	newDocument();

	if (!checkLocalStorage()) {
		var currentFile = document.getElementById("currentFile");
		currentFile.textContent = "Sorry! No web storage support. If you're using Internet Explorer / Microsoft Edge, you must load the page from a server for local storage to work.";
	}

} // end init


// enable or disable a particular button
export function enable(name: string, ok: boolean) {
	var button = document.getElementById(name) as any;
	if (button) button.disabled = !ok;
}

// enable or disable all context-sensitive command buttons
export function enableAll() {
	var cmdhnd = myDiagram.commandHandler as DrawCommandHandler;
	enable("Rename", myDiagram.selection.count > 0);
	enable("Undo", cmdhnd.canUndo());
	enable("Redo", cmdhnd.canRedo());
	enable("Cut", cmdhnd.canCutSelection());
	enable("Copy", cmdhnd.canCopySelection());
	enable("Paste", cmdhnd.canPasteSelection());
	enable("Delete", cmdhnd.canDeleteSelection());
	enable("SelectAll", cmdhnd.canSelectAll());
	enable("AlignLeft", cmdhnd.canAlignSelection());
	enable("AlignRight", cmdhnd.canAlignSelection());
	enable("AlignTop", cmdhnd.canAlignSelection());
	enable("AlignBottom", cmdhnd.canAlignSelection());
	enable("AlignCenterX", cmdhnd.canAlignSelection());
	enable("AlignCenterY", cmdhnd.canAlignSelection());
	enable("AlignRows", cmdhnd.canAlignSelection());
	enable("AlignColumns", cmdhnd.canAlignSelection());
	enable("AlignGrid", cmdhnd.canAlignSelection());
	enable("Rotate45", cmdhnd.canRotate(45));
	enable("Rotate_45", cmdhnd.canRotate(-45));
	enable("Rotate90", cmdhnd.canRotate(90));
	enable("Rotate_90", cmdhnd.canRotate(-90));
	enable("Rotate180", cmdhnd.canRotate(180));
}

// Commands for this application

// changes the item of the object
function rename(obj: go.GraphObject) {
	if (!obj) obj = myDiagram.selection.first();
	if (!obj) return;
	myDiagram.startTransaction("rename");
	var newName = prompt("Rename " + obj.part.data.item + " to:", obj.part.data.item);
	myDiagram.model.setDataProperty(obj.part.data, "item", newName);
	myDiagram.commitTransaction("rename");
}

// shows/hides gridlines
// to be implemented onclick of a button
export function updateGridOption() {
	myDiagram.startTransaction("grid");
	var grid = document.getElementById("grid") as any;
	myDiagram.grid.visible = (grid.checked === true);
	myDiagram.commitTransaction("grid");
}

// enables/disables guidelines when dragging
export function updateGuidelinesOption() {
	// no transaction needed, because we are modifying a tool for future use
	var guide = document.getElementById("guidelines") as any;
	if (guide.checked === true) {
		(myDiagram.toolManager.draggingTool as GuidedDraggingTool).isGuidelineEnabled = true;
	} else {
		(myDiagram.toolManager.draggingTool as GuidedDraggingTool).isGuidelineEnabled = false;
	}
}

// enables/disables snapping tools, to be implemented by buttons
export function updateSnapOption() {
	// no transaction needed, because we are modifying tools for future use
	var snap = document.getElementById("snap") as any;
	if (snap.checked === true) {
		(myDiagram.toolManager.draggingTool as GuidedDraggingTool).isGridSnapEnabled = true;
		myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;
	} else {
		myDiagram.toolManager.draggingTool.isGridSnapEnabled = false;
		myDiagram.toolManager.resizingTool.isGridSnapEnabled = false;
	}
}

// user specifies the amount of space between nodes when making rows and column
function askSpace(): number {
	var space = prompt("Desired space between nodes (in pixels):", "0");
	return parseFloat(space);
}

// update arrowkey function
export function arrowMode() {
	// no transaction needed, because we are modifying the CommandHandler for future use
	var move = document.getElementById("move") as any;
	var select = document.getElementById("select") as any;
	var scroll = document.getElementById("scroll") as any;
	if (move.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = "move";
	} else if (select.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = "select";
	} else if (scroll.checked === true) {
		(myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = "scroll";
	}
}


var UnsavedFileName = "(Unsaved File)";

export function checkLocalStorage() {
	try {
		window.localStorage.setItem('item', 'item');
		window.localStorage.removeItem('item');
		return true;
	} catch (e) {
		return false;
	}
}

export function getCurrentFileName() {
	var currentFile = document.getElementById("currentFile");
	var name = currentFile.textContent;
	if (name[name.length - 1] === "*") return name.substr(0, name.length - 1);
	return name;
}

export function setCurrentFileName(name: string) {
	var currentFile = document.getElementById("currentFile");
	if (myDiagram.isModified) {
		name += "*";
	}
	currentFile.textContent = name;
}

export function newDocument() {
	// checks to see if all changes have been saved
	if (myDiagram.isModified) {
		var save = confirm("Would you like to save changes to " + getCurrentFileName() + "?");
		if (save) {
			saveDocument();
		}
	}
	setCurrentFileName(UnsavedFileName);
	// loads an empty diagram
	myDiagram.model = new go.GraphLinksModel();
	myDiagram.undoManager.isEnabled = true;
	myDiagram.addModelChangedListener((e) => {
		if (e.isTransactionFinished) enableAll();
	});
	myDiagram.isModified = false;
}

// saves the current floor plan to local storage
export function saveDocument() {
	if (checkLocalStorage()) {
		var saveName = getCurrentFileName();
		if (saveName === UnsavedFileName) {
			saveDocumentAs();
		} else {
			saveDiagramProperties()
			window.localStorage.setItem(saveName, myDiagram.model.toJson());
			myDiagram.isModified = false;
		}
	}
}

// saves floor plan to local storage with a new name
export function saveDocumentAs() {
	if (checkLocalStorage()) {
		var saveName = prompt("Save file as...", getCurrentFileName());
		if (saveName && saveName !== UnsavedFileName) {
			setCurrentFileName(saveName);
			saveDiagramProperties()
			window.localStorage.setItem(saveName, myDiagram.model.toJson());
			myDiagram.isModified = false;
		}
	}
}

// checks to see if all changes have been saved -> shows the open HTML element
export function openDocument() {
	if (checkLocalStorage()) {
		if (myDiagram.isModified) {
			var save = confirm("Would you like to save changes to " + getCurrentFileName() + "?");
			if (save) {
				saveDocument();
			}
		}
		openElement("openDocument", "mySavedFiles");
	}
}

// shows the remove HTML element
export function removeDocument() {
	if (checkLocalStorage()) {
		openElement("removeDocument", "mySavedFiles2");
	}
}

// these functions are called when panel buttons are clicked

export function loadFile() {
	var listbox = document.getElementById("mySavedFiles") as any;
	// get selected filename
	var fileName = undefined;
	for (var i = 0; i < listbox.options.length; i++) {
		if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
	}
	if (fileName !== undefined) {
		// changes the text of "currentFile" to be the same as the floor plan now loaded
		setCurrentFileName(fileName);
		// actually load the model from the JSON format string
		var savedFile = window.localStorage.getItem(fileName);

		myDiagram.model = go.Model.fromJson(savedFile);
		loadDiagramProperties();
		myDiagram.undoManager.isEnabled = true;
		myDiagram.addModelChangedListener(function (e) {
			if (e.isTransactionFinished) enableAll();
		});
		myDiagram.isModified = false;
		// eventually loadDiagramProperties will be called to finish
		// restoring shared saved model/diagram properties
	}
	closeElement("openDocument");
}

// Store shared model state in the Model.modelData property
// (will be loaded by loadDiagramProperties)
export function saveDiagramProperties() {
	myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
}

// Called by loadFile.
export function loadDiagramProperties(e?: go.ChangedEvent) {
	// set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
	var pos = myDiagram.model.modelData.position;
	if (pos) myDiagram.initialPosition = go.Point.parse(pos);
}


// deletes the selected file from local storage
export function removeFile() {
	var listbox = document.getElementById("mySavedFiles2") as any;
	// get selected filename
	var fileName = undefined;
	for (var i = 0; i < listbox.options.length; i++) {
		if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
	}
	if (fileName !== undefined) {
		// removes file from local storage
		window.localStorage.removeItem(fileName);
		// the current document remains open, even if its storage was deleted
	}
	closeElement("removeDocument");
}

export function updateFileList(id: string) {
	// displays cached floor plan files in the listboxes
	var listbox = document.getElementById(id) as any;
	// remove any old listing of files
	var last;
	while (last = listbox.lastChild) listbox.removeChild(last);
	// now add all saved files to the listbox
	for (var key in window.localStorage) {
		var storedFile = window.localStorage.getItem(key);
		if (!storedFile) continue;
		var option = document.createElement("option");
		option.value = key;
		option.text = key;
		listbox.add(option, null)
	}
}

export function openElement(id: string, listid: string) {
	var panel = document.getElementById(id);
	if (panel.style.visibility === "hidden") {
		updateFileList(listid);
		panel.style.visibility = "visible";
	}
}

// hides the open/remove elements when the "cancel" button is pressed
export function closeElement(id: string) {
	var panel = document.getElementById(id);
	if (panel.style.visibility === "visible") {
		panel.style.visibility = "hidden";
	}
}

export function undo() { myDiagram.commandHandler.undo(); }
export function redo() { myDiagram.commandHandler.redo(); }
export function cutSelection() { myDiagram.commandHandler.cutSelection(); }
export function copySelection() { myDiagram.commandHandler.copySelection(); }
export function pasteSelection() { myDiagram.commandHandler.pasteSelection(); }
export function deleteSelection() { myDiagram.commandHandler.deleteSelection(); }
export function selectAll() { myDiagram.commandHandler.selectAll(); }
export function alignLeft() { (myDiagram.commandHandler as DrawCommandHandler).alignLeft(); }
export function alignRight() { (myDiagram.commandHandler as DrawCommandHandler).alignRight(); }
export function alignTop() { (myDiagram.commandHandler as DrawCommandHandler).alignTop(); }
export function alignBottom() { (myDiagram.commandHandler as DrawCommandHandler).alignBottom(); }
export function alignCemterX() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterX(); }
export function alignCenterY() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterY(); }
export function rotate45() { (myDiagram.commandHandler as DrawCommandHandler).rotate(45); }
export function rotate_45() { (myDiagram.commandHandler as DrawCommandHandler).rotate(-45); }
export function rotate90() { (myDiagram.commandHandler as DrawCommandHandler).rotate(90); }
export function rotate_90() { (myDiagram.commandHandler as DrawCommandHandler).rotate(-90); }
export function rotate180() { (myDiagram.commandHandler as DrawCommandHandler).rotate(180); }
export function cancel1() { closeElement('openDocument'); }
export function cancel2() { closeElement('removeDocument'); }
export function alignRows() { (myDiagram.commandHandler as DrawCommandHandler).alignRow(askSpace()); }
export function alignColumns() { (myDiagram.commandHandler as DrawCommandHandler).alignColumn(askSpace()); }