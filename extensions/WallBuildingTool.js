/*
* Copyright (C) 1998-2017 by Northwoods Software Corporation
* All Rights Reserved.
*
* WALL BUILDING TOOL
* Used to construct new walls with mouse clicking / mouse point
*/

// constructor
function WallBuildingTool() {
    go.Tool.call(this);
    this.name = "WallBuilding";
    this._startPoint = null;
    this._endPoint = null;
    this._wallReshapingTool = null;
} go.Diagram.inherit(WallBuildingTool, go.Tool);

// returns or modifies the current startPoint
Object.defineProperty(WallBuildingTool.prototype, "startPoint", {
    get: function () { return this._startPoint; },
    set: function (val) { this._startPoint = val; }
});

// returns or modifies the current endPoint
Object.defineProperty(WallBuildingTool.prototype, "endPoint", {
    get: function () { return this._endPoint; },
    set: function (val) { this._endPoint = val; }
});

// returns the diagram's wallReshapingTool
Object.defineProperty(WallBuildingTool.prototype, "wallReshapingTool", {
    get: function () { return this._wallReshapingTool; },
    set: function (val) { this._wallReshapingTool = val; }
});

WallBuildingTool.prototype.canStart = function () {
    var diagram = this.diagram;
    if (diagram !== null && !diagram.isReadOnly && this.isEnabled) return true;
    return false;
}

// start transaction, capture the mouse, use a crosshair cursor
WallBuildingTool.prototype.doActivate = function () {
    this.endPoint = null;
    this.startTransaction(this.name);
    this.isMouseCaptured = true;
    var diagram = this.diagram;

    // update wallWidth, based on the current value of the HTML input element
    var el = document.getElementById('wallWidthInput');
    if (isNaN(el.value) || el.value === null || el.value === '' || el.value === undefined) el.value = convertPixelsToUnits(5);
    diagram.model.setDataProperty(diagram.model.modelData, "wallWidth", convertUnitsToPixels(parseFloat(el.value)));

    // assign startpoint based on grid
    var point1 = this.diagram.lastInput.documentPoint;
    var gs = diagram.model.modelData.gridSize;
    if (!(this.diagram.toolManager.draggingTool.isGridSnapEnabled)) gs = 1;
    var newx = gs * Math.round(point1.x / gs);
    var newy = gs * Math.round(point1.y / gs);
    var newPoint1 = new go.Point(newx, newy);
    this.startPoint = newPoint1;

    this.wallReshapingTool = this.diagram.toolManager.mouseDownTools.elt(3);
    // Default functionality:
    this.isActive = true;
}

WallBuildingTool.prototype.doMouseDown = function () {
    var diagram = this.diagram;
    this.diagram.currentCursor = 'crosshair';
    var data = { key: "wall", category: "WallGroup", caption: "Wall", type: "Wall", startpoint: this.startPoint, endpoint: this.startPoint, strokeWidth: parseFloat(diagram.model.modelData.wallWidth), isGroup: true, notes: "" };
    this.diagram.model.addNodeData(data);
    var wall = diagram.findPartForKey(data.key);
    updateWall(wall);
    var part = diagram.findPartForData(data);
    // set the TransactionResult before raising event, in case it changes the result or cancels the tool
    this.transactionResult = this.name;
    diagram.raiseDiagramEvent('PartCreated', part);

    // start the wallReshapingTool, tell it what wall it's reshaping (more accurately, the shape the will have the reshape handle)
    this.wallReshapingTool.isEnabled = true;
    diagram.select(part);
    this.wallReshapingTool.isBuilding = true;
    this.wallReshapingTool.adornedShape = part.findObject("SHAPE");
    this.wallReshapingTool.doActivate();
}

WallBuildingTool.prototype.doKeyDown = function () {
    var e = this.diagram.lastInput;
    if (e.key === "Esc") {
        var wall = this.diagram.selection.first();
        var searchPhrase = (wall.data.key === "wall") ? "wallP" : wall.data.key;
        var dimensionLinks = this.diagram.findLinksByExample({ category: "dimensionLink" });
        var garbageLinks = [];
        dimensionLinks.iterator.each(function (link) { if (link.data.to.includes(searchPhrase)) garbageLinks.push(link); });
        for (var i = 0; i < garbageLinks.length; i++) { this.diagram.remove(garbageLinks[i]); }
        this.diagram.remove(wall);
        this.doDeactivate();
    }
    go.Tool.prototype.doKeyDown.call(this);
}

// when the mouse moves, reshape the wall
WallBuildingTool.prototype.doMouseMove = function () {
    this.wallReshapingTool.doMouseMove();
}

// end transaction
WallBuildingTool.prototype.doDeactivate = function () {
    var diagram = this.diagram;
    this.diagram.currentCursor = "";
    this.diagram.isMouseCaptured = false;

    this.wallReshapingTool.isEnabled = false;
    this.wallReshapingTool.isBuilding = false;
    this.wallReshapingTool.adornedShape = null;
    this.wallReshapingTool.doDeactivate();

    this.stopTransaction(this.name);
    this.isActive = false; // Default functionality
}

// END OF WALLBUILDINGTOOL CLASS