/*
* Copyright (C) 1998-2018 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANN UI CLASS
* Handle GUI manipulation (showing/changing data, populating windows, etc) for Floorplanner.html  
*/

/*
* Floorplan UI Constructor
* @param {Floorplan} floorplan A reference to a valid instance of Floorplan
* @param {String} name The name of this FloorplanUI instance known to the DOM 
* @param {String} The name of this UI's floorplan known to the DOM
* @param {Object} state A JSON object with string ids for UI HTML elements. Format is as follows:
	menuButtons: {
		selectionInfoWindowButtonId:
		palettesWindowButtonId:
		overviewWindowButtonId:
		optionsWindowButtonId:
		statisticsWindowButtonId:
	}
	windows: {
		diagramHelpDiv: {
			id:
		}
		selectionInfoWindow: {
			id:
			textDivId:
			handleId:
			colorPickerId:
			heightLabelId:
			heightInputId:
			widthInputId:
			nodeGroupInfoId:
			nameInputId:
			notesTextareaId:
		}
		palettesWindow:{
			id:
			furnitureSearchInputId:
			furniturePaletteId: 
		}
		overviewWindow: {
			id:
		}
		optionsWindow: {
			id:
			gridSizeInputId:
			unitsConversionFactorInputId: 
			unitsFormId:
			unitsFormName:
			checkboxes: {
				showGridCheckboxId:
				gridSnapCheckboxId:
				wallGuidelinesCheckboxId:
				wallLengthsCheckboxId:
				wallAnglesCheckboxId:
				smallWallAnglesCheckboxId:
			}
		}
		statisticsWindow: {
			id:
			textDivId:
			numsTableId:
			totalsTableId:
		}
	}
	scaleDisplayId:
	setBehaviorClass:
	wallThicknessInputId:
	wallThicknessBoxId:
	unitsBoxId:
	unitsInputId:
*/
function FloorplanUI(floorplan, name, floorplanName, state) {
	this._floorplan = floorplan;
	this._name = name;
	this._floorplanName = floorplanName;
	this._state = state;
	this._furnitureNodeData = null; // used for searchFurniture function. set only once
	this.floorplan.floorplanUI = this;
}

// Get Floorplan associated with this UI
Object.defineProperty(FloorplanUI.prototype, "floorplan", {
	get: function () { return this._floorplan; }
});

// Get state object containing many ids of various UI elements
Object.defineProperty(FloorplanUI.prototype, "state", {
	get: function () { return this._state; }
});

// Get name of this FloorplanUI instance known to the DOM
Object.defineProperty(FloorplanUI.prototype, "name", {
	get: function () { return this._name; }
});

// Get name of the Floorplan associated with this FloorplanUI instance known to the DOM
Object.defineProperty(FloorplanUI.prototype, "floorplanName", {
	get: function () { return this._floorplanName; }
});

Object.defineProperty(FloorplanUI.prototype, "furnitureData", {
	get: function () { return this._furnitureData; },
	set: function (val) { this._furnitureData = val; }
});

/*
* UI manipulation:
* Hide/Show Element, Adjust Scale, ChangeGridSize, Change Units Conversion Factor
* Search Furniture, Checkbox Changed, Change Units, Set Behavior, Update UI
*/

/*
* Hide or show specific help/windows (used mainly with hotkeys)
* @param {String} id The ID of the window to show / hide
*/
FloorplanUI.prototype.hideShow = function(id) {
	var element = document.getElementById(id); var str;
	var windows = this.state.windows;
	switch (id) {
		case windows.diagramHelpDiv.id: str = 'Diagram Help'; char = 'H'; break;
		case windows.selectionInfoWindow.id: str = 'Selection Help'; char = 'I'; break;
		case windows.overviewWindow.id: str = 'Overview'; char = 'E'; break;
		case windows.optionsWindow.id: str = 'Options'; char = 'B'; break;
		case windows.statisticsWindow.id: str = 'Statistics'; char = 'G'; break;
		case windows.palettesWindow.id: str = 'Palettes'; char = 'P'; {
			furniturePalette.layoutDiagram(true);
			wallPartsPalette.layoutDiagram(true);
			break;
		}
	}
	var button = document.getElementById(id + 'Button');
	element.style.visibility = element.style.visibility === "visible" ? "hidden" : "visible";
	var verb = element.style.visibility === "visible" ? "Hide " : "Show ";
	if (button) button.innerHTML = verb + str + "<p class='shortcut'> (Ctrl + " + char + " )</p>";
}

/*
* Set text under Diagram to suggest most common functions user could perform
* @param {String} str The text to display in the Diagram Help div
*/
FloorplanUI.prototype.setDiagramHelper = function(str) {
	var helper = document.getElementById(this.state.windows.diagramHelpDiv.id);
	if (helper) helper.innerHTML = '<p>' + str + '</p>';
}

/*
* Increase / decrease diagram scale to the nearest 10%
* @param {String} sign Accepted values are "+" and "-"
*/
FloorplanUI.prototype.adjustScale = function(sign) {
	var floorplan = this.floorplan;
	var el = document.getElementById(this.state.scaleDisplayId);
	floorplan.startTransaction('Change Scale');
	switch (sign) {
		case '-': floorplan.scale -= .1; break;
		case '+': floorplan.scale += .1; break;
	}
	floorplan.scale = parseFloat((Math.round(floorplan.scale / .1) * .1).toFixed(2));
	var scale = (floorplan.scale * 100).toFixed(2);
	el.innerHTML = 'Scale: ' + scale + '%';
	floorplan.commitTransaction('Change Scale');
}

// Change edge length of the grid based on input
FloorplanUI.prototype.changeGridSize = function () {
	var floorplan = this.floorplan;
	floorplan.skipsUndoManager = true;
	floorplan.startTransaction("change grid size");
	var el = document.getElementById(this.state.windows.optionsWindow.gridSizeInputId); var input;
	if (!isNaN(el.value) && el.value != null && el.value != '' && el.value != undefined && el.value > 1) input = parseFloat(el.value);
	else {
		el.value = floorplan.convertPixelsToUnits(10); // if bad input given, revert to 20cm (10px) or unit equivalent
		input = parseFloat(el.value);
	}
	input = floorplan.convertUnitsToPixels(input);
	floorplan.grid.gridCellSize = new go.Size(input, input);
	floorplan.toolManager.draggingTool.gridCellSize = new go.Size(input, input);
	floorplan.model.setDataProperty(floorplan.model.modelData, "gridSize", input);
	floorplan.commitTransaction("change grid size");
	floorplan.skipsUndoManager = false;
}

FloorplanUI.prototype.changeUnitsConversionFactor = function () {
	var floorplan = this.floorplan;
	var val = document.getElementById(this.state.windows.optionsWindow.unitsConversionFactorInputId).value;
	if (isNaN(val) || !val || val == undefined) return;
	floorplan.skipsUndoManager = true;
	floorplan.model.set(floorplan.model.modelData, "unitsConversionFactor", val);
	floorplan.skipsUndoManager = false;
}

// Search through all elements in the furniture palette (useful for a palette with many furniture nodes)
FloorplanUI.prototype.searchFurniture = function () {
	var ui = this;
	var floorplan = this.floorplan;
	var furniturePaletteId = ui.state.windows.palettesWindow.furniturePaletteId;
	var str = document.getElementById(ui.state.windows.palettesWindow.furnitureSearchInputId).value;
	var furniturePalette = null;
	for (var i = 0; i < floorplan.palettes.length; i++) {
		var palette = floorplan.palettes[i];
		if (palette.div.id == furniturePaletteId) {
			furniturePalette = floorplan.palettes[i];
		}
	}
	if (ui.furnitureData == null) ui.furnitureData = furniturePalette.model.nodeDataArray;
	var items = furniturePalette.model.nodeDataArray.slice();
	if (str !== null && str !== undefined && str !== "") {
		for (var i = 0; i < items.length; i += 0) {
			var item = items[i];
			if (item.type.toLowerCase().indexOf(str.toLowerCase()) === -1) {
				items.splice(i, 1);
			}
			else i++;
		}
		furniturePalette.model.nodeDataArray = items;
	}
	else furniturePalette.model.nodeDataArray = ui.furnitureData;
	furniturePalette.updateAllRelationshipsFromData();
}

/*
* Change the "checked" value of checkboxes in the Options Menu, and to have those changes reflected in app behavior / model data
* @param {String} id The ID of the changed checkbox
*/
FloorplanUI.prototype.checkboxChanged = function (id) {
	var floorplan = this.floorplan;
	var checkboxes = this.state.windows.optionsWindow.checkboxes;
	floorplan.skipsUndoManager = true;
	floorplan.startTransaction("change preference");
	var element = document.getElementById(id);
	switch (id) {
		case checkboxes.showGridCheckboxId: {
			floorplan.grid.visible = element.checked;
			floorplan.model.modelData.preferences.showGrid = element.checked;
			break;
		}
		case checkboxes.gridSnapCheckboxId: {
			floorplan.toolManager.draggingTool.isGridSnapEnabled = element.checked;
			floorplan.model.modelData.preferences.gridSnap = element.checked;
			break;
		}
		case checkboxes.wallGuidelinesCheckboxId: floorplan.model.modelData.preferences.showWallGuidelines = element.checked; break;
		case checkboxes.wallLengthsCheckboxId: floorplan.model.modelData.preferences.showWallLengths = element.checked; floorplan.updateWallDimensions(); break;
		case checkboxes.wallAnglesCheckboxId: floorplan.model.modelData.preferences.showWallAngles = element.checked; floorplan.updateWallAngles(); break;
		case checkboxes.smallWallAnglesCheckboxId: floorplan.model.modelData.preferences.showOnlySmallWallAngles = element.checked; floorplan.updateWallAngles(); break;
	}
	floorplan.commitTransaction("change preference");
	floorplan.skipsUndoManager = false;
}

// Adjust units based on the selected radio button in the Options Menu
FloorplanUI.prototype.changeUnits = function() {
	var floorplan = this.floorplan;
	floorplan.startTransaction("set units");
	var prevUnits = floorplan.model.modelData.units;
	var radios = document.forms[this.state.windows.optionsWindow.unitsFormId].elements[this.state.windows.optionsWindow.unitsFormName];
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			floorplan.model.setDataProperty(floorplan.model.modelData, "units", radios[i].id);
		}
	}
	var units = floorplan.model.modelData.units;
	switch (units) {
		case 'centimeters': floorplan.model.setDataProperty(floorplan.model.modelData, "unitsAbbreviation", 'cm'); break;
		case 'meters': floorplan.model.setDataProperty(floorplan.model.modelData, "unitsAbbreviation", 'm'); break;
		case 'feet': floorplan.model.setDataProperty(floorplan.model.modelData, "unitsAbbreviation", 'ft'); break;
		case 'inches': floorplan.model.setDataProperty(floorplan.model.modelData, "unitsAbbreviation", 'in'); break;
	}
	var unitsAbbreviation = floorplan.model.modelData.unitsAbbreviation;
	// update all units boxes with new units
	var unitAbbrevInputs = document.getElementsByClassName(this.state.unitsBoxClass);
	for (var i = 0; i < unitAbbrevInputs.length; i++) {
		unitAbbrevInputs[i].value = unitsAbbreviation;
	}
	var unitInputs = document.getElementsByClassName(this.state.unitsInputClass);
	for (var i = 0; i < unitInputs.length; i++) {
		var input = unitInputs[i];
		floorplan.model.setDataProperty(floorplan.model.modelData, "units", prevUnits);
		var value = floorplan.convertUnitsToPixels(input.value);
		floorplan.model.setDataProperty(floorplan.model.modelData, "units", units)
		value = floorplan.convertPixelsToUnits(value);
		input.value = value;
	}
	if (floorplan.selection.count === 1) this.setSelectionInfo(floorplan.selection.first()); // reload node info measurements according to new units
	floorplan.commitTransaction("set units");
}

/*
* Set current tool (selecting/dragging or wallbuilding/reshaping)
* @param {String} string Informs what behavior to switch to. Accepted values: "dragging", "wallbuilding"
*/
FloorplanUI.prototype.setBehavior = function (string) {
	var floorplan = this.floorplan;
	var ui = this;
	var wallBuildingTool = floorplan.toolManager.mouseDownTools.elt(0);
	var wallReshapingTool = floorplan.toolManager.mouseDownTools.elt(3);
	// style the current tool HTML button accordingly
	var elements = document.getElementsByClassName(this.state.setBehaviorClass);
	for (var i = 0; i < elements.length; i++) {
		var el = elements[i];
		if (el.id === string + "Button") el.style.backgroundColor = '#4b545f';
		else el.style.backgroundColor = '#bbbbbb';
	}
	var wallThicknessBox = document.getElementById(this.state.wallThicknessBoxId)
	if (string === 'wallBuilding') {
		wallBuildingTool.isEnabled = true;
		wallReshapingTool.isEnabled = false;

		floorplan.skipsUndoManager = true;
		floorplan.startTransaction("change wallThickness");
		// create walls with wallThickness in input box
		floorplan.model.setDataProperty(floorplan.model.modelData, 'wallThickness', parseFloat(document.getElementById(ui.state.wallThicknessInputId).value));
		var wallThickness = floorplan.model.modelData.wallThickness;
		if (isNaN(wallThickness)) floorplan.model.setDataProperty(floorplan.model.modelData, 'wallThickness', 5);
		else {
			var width = floorplan.convertUnitsToPixels(wallThickness);
			floorplan.model.setDataProperty(floorplan.model.modelData, 'wallThickness', width);
		}
		floorplan.commitTransaction("change wallThickness");
		floorplan.skipsUndoManager = false;
		wallThicknessBox.style.visibility = 'visible';
		wallThicknessBox.style.display = 'inline-block';
		ui.setDiagramHelper("Click and drag on the diagram to draw a wall (hold SHIFT for 45 degree angles)");
	}
	if (string === 'dragging') {
		wallBuildingTool.isEnabled = false;
		wallReshapingTool.isEnabled = true;
		wallThicknessBox.style.visibility = 'hidden';
		wallThicknessBox.style.display = 'none';
	}
	// clear resize adornments on walls/windows, if there are any
	floorplan.nodes.iterator.each(function (n) { n.clearAdornments(); })
	floorplan.clearSelection();
}

/* 
* Populating UI Windows from Floorplan data:
* Update UI, Update Statistics, Fill Rows With Nodes, Set Selection Info, Set Color, Set Height, Set Width, Apply Selection Changes
*/

// Update the UI properly in accordance with model.modelData (called only when a new floorplan is loaded or created)
FloorplanUI.prototype.updateUI = function () {
	var floorplan = this.floorplan;
	var modelData = floorplan.model.modelData;
	var checkboxes = this.state.windows.optionsWindow.checkboxes;
	if (floorplan.floorplanUI) floorplan.floorplanUI.changeUnits();
	document.getElementById(this.state.wallThicknessInputId).value = floorplan.convertPixelsToUnits(modelData.wallThickness);
	// update options GUI based on floorplan.model.modelData.preferences
	var preferences = modelData.preferences;
	document.getElementById(checkboxes.showGridCheckboxId).checked = preferences.showGrid;
	document.getElementById(checkboxes.gridSnapCheckboxId).checked = preferences.gridSnap;
	document.getElementById(checkboxes.wallGuidelinesCheckboxId).checked = preferences.showWallGuidelines;
	document.getElementById(checkboxes.wallLengthsCheckboxId).checked = preferences.showWallLengths;
	document.getElementById(checkboxes.wallAnglesCheckboxId).checked = preferences.showWallAngles;
	document.getElementById(checkboxes.smallWallAnglesCheckboxId).checked = preferences.showOnlySmallWallAngles;
}

// Update all statistics in Statistics Window - called when a Floorplan's model is changed
FloorplanUI.prototype.updateStatistics = function () {
	var floorplan = this.floorplan;
	var statsWindow = this.state.windows.statisticsWindow;
	var element = document.getElementById(statsWindow.textDivId);
	if (element) {
		element.innerHTML = "<div class='row'><div class='col-2' style='height: 165px; overflow: auto;'> Item Types <table id='" + statsWindow.numsTableId + "'></table></div><div class='col-2'> Totals <table id='totalsTable'></table></div></div>";
		// fill Item Types table with node type/count of all nodes in diagram
		var numsTable = document.getElementById(statsWindow.numsTableId);

		// get all palette nodes associated with this Floorplan
		var palettes = floorplan.palettes;
		var allPaletteNodes = [];
		for (var i = 0; i < palettes.length; i++) {
			allPaletteNodes = allPaletteNodes.concat(palettes[i].model.nodeDataArray);
		}

		for (var i = 0; i < allPaletteNodes.length; i++) {
			var type = allPaletteNodes[i].type;
			var num = floorplan.findNodesByExample({ type: type }).count;
			if (num > 0) // only display data for nodes that exist on the diagram
				numsTable.innerHTML += "<tr class='data'> <td style='float: left;'>" + type + "</td> <td style='float: right;'> " + num + "</td></tr>";
		}
		// fill Totals table with lengths of all walls
		totalsTable = document.getElementById('totalsTable');
		var walls = floorplan.findNodesByExample({ category: "WallGroup" });
		var totalLength = 0;
		walls.iterator.each(function (wall) {
			var wallLength = Math.sqrt(wall.data.startpoint.distanceSquaredPoint(wall.data.endpoint));
			totalLength += wallLength;
		});
		totalLength = floorplan.convertPixelsToUnits(totalLength).toFixed(2);
		var unitsAbbreviation = floorplan.model.modelData.unitsAbbreviation;
		totalsTable.innerHTML += "<tr class='data'><td style='float: left;'>Wall Lengths</td><td style='float: right;'>" + totalLength + unitsAbbreviation + "</td></tr>";
	}
}

/* Helper function for setSelectionInfo(); displays all nodes in a given set in a given 1 or 2 rows in a given HTML element
* @param {Iterable | Array} iterator A iterable collection of nodes to display in rows
* @param {String} element The ID of the HTML element to fill with this data
* @param {String} selectedKey The key of the currently selected node -- this node's name will be styled differently in the rows
*/
// TODO some repetitive code here
FloorplanUI.prototype.fillRowsWithNodes = function(iterator, element, selectedKey) {
	var floorplan = this.floorplan;
	var ui = this;
	var arr = [];
	if (iterator.constructor !== Array) iterator.each(function (p) { arr.push(p); });
	else arr = iterator;

	// helper
	function makeOnClick(key) {
		return ui.name + '.setSelectionInfo(' + ui.floorplanName + '.findPartForKey(' + "'" + key + "'" + '))';
	}

	for (var i = 0; i < arr.length; i += 2) {
		if (arr[i].data === null) { this.setSelectionInfo('Nothing selected'); return; }
		var key1 = arr[i].data.key; // keys used to locate the node if clicked on...
		var name1 = (arr[i].data.caption !== "MultiPurposeNode") ? arr[i].data.caption : arr[i].data.text; // ... names are editable, so users can distinguish between nodes
		// if there are two nodes for this row...
		if (arr[i + 1] != undefined && arr[i + 1] != null) {
			var key2 = arr[i + 1].data.key;
			var name2 = (arr[i + 1].data.caption !== "MultiPurposeNode") ? arr[i + 1].data.caption : arr[i + 1].data.text;
			// if there's a non-null selectedKey, highlight the selected node in the list
			if (key1 === selectedKey) element.innerHTML += '<div class="row"><div class="col-2"><p class="data clickable selectedKey" onclick="' + makeOnClick(key1) + '">' + name1 +
				'</p></div><div class="col-2"><p class="data clickable" onclick="' + makeOnClick(key2) + '">' + name2 + '</p></div></div>';

			else if (key2 === selectedKey) element.innerHTML += '<div class="row"><div class="col-2"><p class="data clickable" onclick="' + makeOnClick(key1) + '">' + name1 +
				'</p></div><div class="col-2"><p class="data clickable selectedKey" onclick="' + makeOnClick(key2) + '">' + name2 + '</p></div></div>';

			else element.innerHTML += '<div class="row"><div class="col-2"><p class="data clickable"' + 'onclick="' + makeOnClick(key1) + '">' + name1 +
				'</p></div><div class="col-2"><p class="data clickable"' + 'onclick="' + makeOnClick(key2) + '">' + name2 + '</p></div></div>';
		}
		// if there's only one node for this row...
		else {
			if (key1 === selectedKey) element.innerHTML += '<div class="row"><div class="col-2"><p class="data clickable selectedKey" onclick="' + makeOnClick(key1) + '">' + name1 + '</p></div></div>';
			else element.innerHTML += '<div class="row"><div class="col-2"><p class="data clickable" onclick="' + makeOnClick(key1) + '">' + name1 + '</p></div></div>';
		}
	}
}

/*
* Displays dynamic, editable info about selection in Selection Info window (height/length, width, name, group info, color, etc.)
* @param {Node | String} node Can be: Reference to Node / Group, go.Node/go.Group key, "Selection" (indicating multi-selection), "Nothing selected"
*/
FloorplanUI.prototype.setSelectionInfo = function(node) {
	var floorplan = this.floorplan;
	var ui = this;
	if (node instanceof go.GraphObject) node = node.part;
	var selectionInfoWindow = this.state.windows.selectionInfoWindow;
	var element = document.getElementById(selectionInfoWindow.textDivId);
	var state = this.state;
	var infoWindow = document.getElementById(selectionInfoWindow.id);
	if (element === null || infoWindow === null) return;
	if (node === 'Nothing selected' || node.layer === null || node === null) { element.innerHTML = '<p>' + node + '</p>'; return; }

	// if there are multiple nodes selected, show all their names, allowing user to click on the node they want
	if (node === 'Selection: ') {
		var selectionIterator = floorplan.selection.iterator; var arr = [];
		element.innerHTML = '<p id="name"> Selection (' + selectionIterator.count + ' items selected): </p>';
		this.fillRowsWithNodes(selectionIterator, element, null);
		infoWindow.style.height = document.getElementById(selectionInfoWindow.textDivId).offsetHeight + document.getElementById(selectionInfoWindow.handleId).offsetHeight + 5 + 'px';
		return;
	}

	// TODO clean this to be usable by a more general template scheme
	// if we have one node selected, gather pertinent information for that node....
	floorplan.select(node);
	var name = ''; var length; var width; var nodeGroupCount = 0; var notes = node.data.notes;
	// get node name
	if (node.category === 'MultiPurposeNode') name = node.data.text;
	else name = node.data.caption;
	// get node height / width / length (dependent on node category)
	// Wall Groups
	if (node.category === 'WallGroup') {
		length = floorplan.convertPixelsToUnits(Math.sqrt(node.data.startpoint.distanceSquared(node.data.endpoint.x, node.data.endpoint.y))).toFixed(2); // wall length
		thickness = floorplan.convertPixelsToUnits(node.data.thickness).toFixed(2); // wall thickness
	}
	// Wall Parts (i.e. Door / Window Nodes)
	else if (node.category === 'DoorNode' || node.category === "WindowNode") {
		length = floorplan.convertPixelsToUnits(node.data.length).toFixed(2);
	}
	// Generic Groups
	else if (node.data.isGroup && node.category !== "WallGroup") {
		height = floorplan.convertPixelsToUnits(node.actualBounds.height).toFixed(2);
		width = floorplan.convertPixelsToUnits(node.actualBounds.width).toFixed(2);
	}
	// Furniture Nodes
	else {
		height = floorplan.convertPixelsToUnits(node.data.height).toFixed(2);
		width = floorplan.convertPixelsToUnits(node.data.width).toFixed(2);
	}
	// get node group info
	if (node.containingGroup != null && node.containingGroup != undefined) {
		var nodeGroupParts = node.containingGroup.memberParts;
		nodeGroupCount = nodeGroupParts.count;
	}
	if (node.data.isGroup) {
		var nodeGroupParts = node.memberParts;
		nodeGroupCount = nodeGroupParts.count;
	}
	var unitsAbbreviation = floorplan.model.modelData.unitsAbbreviation;

	// display information in the selection info window
	element.innerHTML = '<p id="name" >Name: ' + '<input id="nameInput" class="nameNotesInput" value="' + name + '"/>' + '</p>'; // name
	element.innerHTML += "<p>Notes: <textarea id='"+ selectionInfoWindow.notesTextareaId +"' class='nameNotesInput' >" + notes + "</textarea></p>"; // notes
	// display color as a color picker element (furniture nodes only)
	if (!node.data.isGroup && node.data.category !== "DoorNode" && node.data.category !== "WindowNode") {
		element.innerHTML += '<p>Color: <input type="color" id="'+ selectionInfoWindow.colorPickerId +'" value="' + node.data.color + '" name="selectionColor"></input></p>';
	}

	// display ONLY "Length" input (Door / Window Nodes only) (this is still technically the "width input" as far as IDs are concerned)
	if (node.category === "DoorNode" || node.category === "WindowNode") element.innerHTML += '<div class="row"><p id="'+ selectionInfoWindow.widthLabelId +'" class="data">Length: <br/><input id = "' + selectionInfoWindow.widthInputId + '" class = "dimensionsInput" name = "width" value = "' + length + '"/>'
		+ '<input id="widthUnits" class="' + state.unitsBoxClass + '" value=' + unitsAbbreviation + ' disabled/></p>';
	// for walls "width" is displayed as "length", "height" is displayed as "Thickness"
	else if (node.category === 'WallGroup') {
		element.innerHTML += '<div class="row"><div class="col-2"><p id="' + selectionInfoWindow.heightLabelId + '" class="data">Thickness: <br/><input id ="' + selectionInfoWindow.heightInputId + '" class = "dimensionsInput" name = "height" value = "' + thickness
		+ '"/><input id="heightUnits" class="' + state.unitsBoxClass + '" value=' + unitsAbbreviation + ' disabled/></p> ' + '</div><div class="col-2"><p class="data">Length: <br/><input id="' + selectionInfoWindow.widthInputId + '" class="dimensionsInput" value = "'
		+ length + '"/><input id="widthUnits" class="' + state.unitsBoxClass + '" value="' + unitsAbbreviation + '" disabled/></p>' + '</p></div></div>';
	}
	// display editable properties height and width (non Door / Window nodes)
	else element.innerHTML += '<div class="row"><div class="col-2"><p id="' + selectionInfoWindow.heightLabelId + '" class="data">Height: <br/><input id ="' + selectionInfoWindow.heightInputId + '" class = "dimensionsInput" name = "height" value = "' + height
		+ '"/><input id="heightUnits" class="' + state.unitsBoxClass + '" value=' + unitsAbbreviation + ' disabled/></p> ' + '</div><div class="col-2"><p class="data">Width: <br/><input id="' + selectionInfoWindow.widthInputId + '" class="dimensionsInput" value = "'
		+ width + '"/><input id="widthUnits" class="' + state.unitsBoxClass + '" value="' + unitsAbbreviation + '" disabled/></p>' + '</p></div></div>';
	
	// do not allow height or width adjustment for group info
	if (node.data.isGroup && node.category !== "WallGroup") {
		document.getElementById(selectionInfoWindow.heightInputId).disabled = true;
		document.getElementById(selectionInfoWindow.widthInputId).disabled = true;
	}

	// "Apply Changes" button
	element.innerHTML += '<div class="row"> <button id="applySelectionChanges" onClick="' + this.name + '.applySelectionChanges()">Apply Changes</button></div>';

	// display group info for standard groups, wallParts for walls
	var groupName = null; var groupKey = null; var selectedKey = "";
	if (node.data.isGroup === true) {
		groupName = node.data.caption;
		groupKey = node.data.key;
		selectedKey = "selectedKey"; // the 'group' node is selected; make it blue to show this
	}
	if (node.containingGroup !== null) {
		groupName = node.containingGroup.data.caption;
		groupKey = node.containingGroup.data.key;
	}
	if (groupName !== null) {
		groupKey = "'" + groupKey + "'";
		element.innerHTML += '<div class="row data" id="' + selectionInfoWindow.nodeGroupInfoId +'"> <span class="clickable ' + selectedKey + '" onclick="' + ui.name + '.setSelectionInfo(' + ui.floorplanName + '.findPartForKey(' + groupKey + '))">' +
			groupName + '</span> Info (' + nodeGroupCount + ' member(s) in <span class="clickable ' + selectedKey + '" onclick="' + ui.name + '.setSelectionInfo(' + ui.floorplanName + '.findPartForKey(' + groupKey + '))">' + groupName + '</span>) </div>';
		if (nodeGroupCount != 0) ui.fillRowsWithNodes(nodeGroupParts, document.getElementById(selectionInfoWindow.nodeGroupInfoId), node.data.key);
	}

	var nameInput = document.getElementById(selectionInfoWindow.nameInputId);
	if (!floorplan.isReadOnly) {
		// dynamically adjust name of selected node based on user input
		nameInput.addEventListener('input', function (e) {
			var value = nameInput.value;
			floorplan.skipsUndoManager = true;
			floorplan.startTransaction("rename node");
			if (value === null || value === "" || value === undefined) { floorplan.commitTransaction("rename node"); return; }
			floorplan.model.setDataProperty(node.data, "caption", value);
			floorplan.model.setDataProperty(node.data, "text", value); // if node is a multi purpose node, update the text on it
			floorplan.commitTransaction("rename node");
			floorplan.skipsUndoManager = false;
		});

		// dynamically adjust notes of selected node based on user input
		var notesTextarea = document.getElementById(selectionInfoWindow.notesTextareaId);
		notesTextarea.addEventListener('input', function (e) {
			var value = notesTextarea.value;
			floorplan.skipsUndoManager = true;
			floorplan.startTransaction("edit node notes");
			if (value === null || value === undefined) return;
			floorplan.model.setDataProperty(node.data, "notes", value);
			floorplan.commitTransaction("edit node notes");
			floorplan.skipsUndoManager = false;
		});
		infoWindow.style.height = document.getElementById(selectionInfoWindow.textDivId).offsetHeight + document.getElementById(selectionInfoWindow.handleId).offsetHeight + 5 + 'px';
	}
}

// Triggered by "Apply Changes"; set model data for fill color of the current selection
FloorplanUI.prototype.setColor = function () {
	var floorplan = this.floorplan;
	var node = floorplan.selection.first();
	var colorPicker = document.getElementById(this.state.windows.selectionInfoWindow.colorPickerId);
	if (colorPicker !== null) {
		floorplan.startTransaction("recolor node");
		floorplan.model.setDataProperty(node.data, "color", colorPicker.value);
		floorplan.model.setDataProperty(node.data, "stroke", invertColor(colorPicker.value))
		floorplan.commitTransaction("recolor node");
	}
}

// Triggered by "Apply Changes"; set model data for height of the currently selected node (also handles door length for doors, wall length for walls)
FloorplanUI.prototype.setHeight = function () {
	var heightInput = document.getElementById(this.state.windows.selectionInfoWindow.heightInputId);
	if (heightInput) {
		var floorplan = this.floorplan;
		var ui = this;
		var node = floorplan.selection.first();
		var value = parseFloat(floorplan.convertUnitsToPixels(heightInput.value));
		if (isNaN(value)) {
			alert("Please enter a valid number");
			ui.setSelectionInfo(node, floorplan);
			return;
		}
		floorplan.skipsUndoManager = true;
		floorplan.startTransaction("resize node");
		if (!floorplan.isReadOnly) {
			// Case: Furniture Nodes and Window Nodes; basic height adjustment 
			if (node.category !== 'WallGroup' && node.category !== 'DoorNode') {
				floorplan.model.setDataProperty(node.data, "height", value);
			}
			// Case: Wall Groups; set wall's data.strokeWidth
			else if (node.category === 'WallGroup') {
				floorplan.model.setDataProperty(node.data, "thickness", value);
				node.memberParts.iterator.each(function (part) {
					if (part.category === 'DoorNode') floorplan.model.setDataProperty(part.data, "doorOpeningHeight", value);
					if (part.category === 'WindowNode') floorplan.model.setDataProperty(part.data, "height", value);
				});
			}
			// Note: Door Nodes are purposefully unaccounted for, as width (length) adjustment (in setWidth()) also adjusts node height
		}
		floorplan.commitTransaction("resize node");
		floorplan.updateWallDimensions(floorplan);
		floorplan.skipsUndoManager = false;
	}
}

// Triggered by "Apply Changes"; set model data for width of the currently selected node
FloorplanUI.prototype.setWidth = function() {
	var floorplan = this.floorplan;
	var ui = this;
	var node = floorplan.selection.first();
	var widthInput = document.getElementById(this.state.windows.selectionInfoWindow.widthInputId);
	if (widthInput === null) return;
	var value = parseFloat(floorplan.convertUnitsToPixels(widthInput.value));
	if (isNaN(value)) {
		alert("Please enter a valid number");
		ui.setSelectionInfo(node, floorplan);
		return;
	}
	floorplan.skipsUndoManager = true;
	floorplan.startTransaction("resize node");
	if (!floorplan.isReadOnly) {
		// Case: Window / Door Nodes (part.width is part.data.length), keeps windows and doors within wall boundaries (and surrounding wall part boundaries)
		if (node.category === 'WindowNode' || node.category === "DoorNode") {
			var wall = floorplan.findPartForKey(node.data.group);
			var loc = node.location.copy();
			// constrain max width "value" by the free stretch on the wall "node" is in
			if (wall !== null) {
				var containingStretch = getWallPartStretch(node);
				var stretchLength = Math.sqrt(containingStretch.point1.distanceSquaredPoint(containingStretch.point2));
				if (stretchLength < value) {
					value = stretchLength;
					loc = new go.Point((containingStretch.point1.x + containingStretch.point2.x) / 2,
						(containingStretch.point1.y + containingStretch.point2.y) / 2);
				}
			}
			floorplan.model.setDataProperty(node.data, "length", value);
			node.location = loc;
			floorplan.updateWallDimensions();
		}
		// Case: Wall Groups; wall length adjustment; do not allow walls to be shorter than the distance between their fathest apart wallParts
		else if (node.category === "WallGroup") {
			var sPt = node.data.startpoint.copy();
			var ePt = node.data.endpoint.copy();
			var angle = sPt.directionPoint(ePt);

			var midPoint = new go.Point(((sPt.x + ePt.x) / 2), ((sPt.y + ePt.y) / 2));
			var newEpt = new go.Point((midPoint.x + (value / 2)), midPoint.y);
			var newSpt = new go.Point((midPoint.x - (value / 2)), midPoint.y);
			newEpt.offset(-midPoint.x, -midPoint.y).rotate(angle).offset(midPoint.x, midPoint.y);
			newSpt.offset(-midPoint.x, -midPoint.y).rotate(angle).offset(midPoint.x, midPoint.y);

			// Edge Case 1: The user has input a length shorter than the edge wallPart's endpoints allow
			// find the endpoints of the wallparts closest to the endpoints of the wall
			var closestPtToSpt = null; var farthestPtFromSpt;
			var closestDistToSpt = Number.MAX_VALUE; var farthestDistFromSpt = 0;
			node.memberParts.iterator.each(function (wallPart) {
				var endpoints = getWallPartEndpoints(wallPart);
				var endpoint1 = endpoints[0];
				var endpoint2 = endpoints[1];
				var distance1 = Math.sqrt(endpoint1.distanceSquaredPoint(sPt));
				var distance2 = Math.sqrt(endpoint2.distanceSquaredPoint(sPt));

				if (distance1 < closestDistToSpt) {
					closestDistToSpt = distance1;
					closestPtToSpt = endpoint1;
				} if (distance1 > farthestDistFromSpt) {
					farthestDistFromSpt = distance1;
					farthestPtFromSpt = endpoint1;
				} if (distance2 < closestDistToSpt) {
					closestDistToSpt = distance2;
					closestPtToSpt = endpoint2;
				} if (distance2 > farthestDistFromSpt) {
					farthestDistFromSpt = distance2;
					farthestPtFromSpt = endpoint2;
				}
			});

			if (closestPtToSpt !== null) {
				// if the proposed length is smaller than the minDistance, set wall length to minDistance
				var proposedDistance = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
				var minDistance = Math.sqrt(closestPtToSpt.distanceSquaredPoint(farthestPtFromSpt));
				if (proposedDistance < minDistance) {
					newSpt = closestPtToSpt;
					newEpt = farthestPtFromSpt;
				}
			}

			/*
			 * Edge Case 2: The new wall endpoints constructed based on user input do not generate a wall too short for the wall's edge wallPart's endpoints;
			 * however, there is/are a/some wallPart(s) that do not fit along the new wall endpoints (due to midpoint construction)
			 * if a wallPart endpoint is outside the line created by newSpt and newEpt, adjust the endpoints accordingly
			*/
			var farthestPtFromWallPt = null; var farthestFromWallPtDist = 0;
			node.memberParts.iterator.each(function (part) {
				var endpoints = getWallPartEndpoints(part);
				// check for endpoints of wallParts not along the line segment made by newSpt and newEpt
				for (var i = 0; i < endpoints.length; i++) {
					var point = endpoints[i];
					var distanceToStartPoint = parseFloat(Math.sqrt(point.distanceSquaredPoint(newSpt)).toFixed(2));
					var distanceToEndPoint = parseFloat(Math.sqrt(point.distanceSquaredPoint(newEpt)).toFixed(2));
					var wallLength = parseFloat(Math.sqrt(newSpt.distanceSquaredPoint(newEpt)).toFixed(2));
					if ((distanceToStartPoint + distanceToEndPoint).toFixed(2) !== wallLength.toFixed(2)) {
						var testDistance = Math.sqrt(point.distanceSquaredPoint(newSpt));
						if (testDistance > farthestFromWallPtDist) {
							farthestFromWallPtDist = testDistance;
							farthestPtFromWallPt = point;
						}
					}
				}
			});

			// if a wallPart endpoint is outside the wall, adjust the endpoints of the wall to accomodate it
			if (farthestPtFromWallPt !== null) {
				var distance = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
				if (farthestPtFromWallPt.distanceSquaredPoint(newSpt) < farthestPtFromWallPt.distanceSquaredPoint(newEpt)) {
					newSpt = farthestPtFromWallPt;
					var totalLength = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
					newEpt = new go.Point(newSpt.x + ((distance / totalLength) * (newEpt.x - newSpt.x)),
				newSpt.y + ((distance / totalLength) * (newEpt.y - newSpt.y)));
				} else {
					newEpt = farthestPtFromWallPt;
					var totalLength = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
					newSpt = new go.Point(newEpt.x + ((distance / totalLength) * (newSpt.x - newEpt.x)),
				newEpt.y + ((distance / totalLength) * (newSpt.y - newEpt.y)));
				}
			}

			floorplan.model.setDataProperty(node.data, "startpoint", newSpt);
			floorplan.model.setDataProperty(node.data, "endpoint", newEpt);
			floorplan.updateWall(node);
		}		
		// Case: Standard / Multi-Purpose Nodes; basic width ajustment
		else floorplan.model.setDataProperty(node.data, "width", value);
	}
	floorplan.commitTransaction("resize node");
	floorplan.skipsUndoManager = false;
}

// Set height, width, and color of the selection based on user input in the Selection Info Window
FloorplanUI.prototype.applySelectionChanges = function() {
	var floorplan = this.floorplan;
	var ui = this;
	this.setHeight();
	this.setWidth();
	this.setColor();
	ui.setSelectionInfo(floorplan.selection.first(), floorplan);
}