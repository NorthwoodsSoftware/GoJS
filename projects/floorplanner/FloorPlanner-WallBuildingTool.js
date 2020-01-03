/*
* Copyright (C) 1998-2020 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANNER - WALL BUILDING TOOL
* Used to construct new Walls in a Floorplan with mouse clicking / mouse point
* Depends on functionality in Floorplan.js
*/

// Constructor
function WallBuildingTool() {
    go.Tool.call(this);
    this.name = "WallBuilding";
    this._startPoint = null;
    this._endPoint = null;
    this._wallReshapingTool = null;
} go.Diagram.inherit(WallBuildingTool, go.Tool);

// Get / set the current startPoint
Object.defineProperty(WallBuildingTool.prototype, "startPoint", {
    get: function () { return this._startPoint; },
    set: function (val) { this._startPoint = val; }
});

// Get / set the current endPoint
Object.defineProperty(WallBuildingTool.prototype, "endPoint", {
    get: function () { return this._endPoint; },
    set: function (val) { this._endPoint = val; }
});

// Get / set the diagram's wallReshapingTool
Object.defineProperty(WallBuildingTool.prototype, "wallReshapingTool", {
    get: function () { return this._wallReshapingTool; },
    set: function (val) { this._wallReshapingTool = val; }
});

// Tool can start iff diagram exists, is editable, and tool is enabled
WallBuildingTool.prototype.canStart = function () {
    var diagram = this.diagram;
    if (diagram !== null && !diagram.isReadOnly && this.isEnabled) return true;
    return false;
}

// Start transaction, capture the mouse, use a crosshair cursor
WallBuildingTool.prototype.doActivate = function () {
    this.endPoint = null;
    this.startTransaction(this.name);
    this.isMouseCaptured = true;
    var diagram = this.diagram;
    var tool = this;

    // update wallThickness, based on the current value of the HTML input element 
    // pre-condition: diagram.floorplanUI exists
    if (diagram.floorplanUI) {
        var el = document.getElementById(diagram.floorplanUI.state.wallThicknessInputId);
        if (isNaN(el.value) || el.value === null || el.value === '' || el.value === undefined) el.value = diagram.convertPixelsToUnits(5);
        diagram.model.setDataProperty(diagram.model.modelData, "wallThickness", diagram.convertUnitsToPixels(parseFloat(el.value)));
    }
    else diagram.model.setDataProperty(diagram.model.modelData, "wallThickness", diagram.convertUnitsToPixels(parseFloat(5)));

    // assign startpoint based on grid
    var point1 = tool.diagram.lastInput.documentPoint;
    var gs = diagram.model.modelData.gridSize;
    if (!(tool.diagram.toolManager.draggingTool.isGridSnapEnabled)) gs = 1;
    var newx = gs * Math.round(point1.x / gs);
    var newy = gs * Math.round(point1.y / gs);
    var newPoint1 = new go.Point(newx, newy);
    this.startPoint = newPoint1;

    this.wallReshapingTool = tool.diagram.toolManager.mouseDownTools.elt(3);
    // Default functionality:
    this.isActive = true;
}

// When user clicks, add wall model data to model and initialize a Wall Reshaping Tool to handle the shaping of its construction
WallBuildingTool.prototype.doMouseDown = function () {
    var diagram = this.diagram;
    var tool = this;
    tool.diagram.currentCursor = 'crosshair';
    var data = { key: "wall", category: "WallGroup", caption: "Wall", type: "Wall", startpoint: tool.startPoint, endpoint: tool.startPoint, thickness: parseFloat(diagram.model.modelData.wallThickness), isGroup: true, notes: "" };
    this.diagram.model.addNodeData(data);
    var wall = diagram.findPartForKey(data.key);
    diagram.updateWall(wall);
    var part = diagram.findPartForData(data);
    // set the TransactionResult before raising event, in case it changes the result or cancels the tool
    tool.transactionResult = tool.name;
    diagram.raiseDiagramEvent('PartCreated', part);

    // start the wallReshapingTool, tell it what wall it's reshaping (more accurately, the shape that will have the reshape handle)
    tool.wallReshapingTool.isEnabled = true;
    diagram.select(part);
    tool.wallReshapingTool.isBuilding = true;
    tool.wallReshapingTool.adornedShape = part.findObject("SHAPE");
    tool.wallReshapingTool.doActivate();
}

// If user presses Esc key, cancel the wall building
WallBuildingTool.prototype.doKeyDown = function () {
    var diagram = this.diagram;
    var e = diagram.lastInput;
    if (e.key === "Esc") {
        var wall = diagram.selection.first();
        diagram.remove(wall);
        diagram.pointNodes.iterator.each(function (node) { diagram.remove(node); });
        diagram.dimensionLinks.iterator.each(function (link) { diagram.remove(link); });
        diagram.pointNodes.clear();
        diagram.dimensionLinks.clear();
        this.doDeactivate();
    }
    go.Tool.prototype.doKeyDown.call(this);
}

// When the mouse moves, reshape the wall
WallBuildingTool.prototype.doMouseMove = function () {
    this.wallReshapingTool.doMouseMove();
}

// End transaction
WallBuildingTool.prototype.doDeactivate = function () {
    var diagram = this.diagram;
    this.diagram.currentCursor = "";
    this.diagram.isMouseCaptured = false;

    this.wallReshapingTool.isEnabled = false;
    this.wallReshapingTool.adornedShape = null;
    this.wallReshapingTool.doDeactivate();
    this.wallReshapingTool.isBuilding = false;

    diagram.updateWallDimensions();

    this.stopTransaction(this.name);
    
    this.isActive = false; // Default functionality
}