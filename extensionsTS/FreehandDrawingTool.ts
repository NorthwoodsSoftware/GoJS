"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A custom Tool for freehand drawing

/**
* @constructor
* @extends Tool
* @class
* This tool allows the user to draw a shape using the mouse.
* It collects all of the points from a mouse-down, all mouse-moves, until a mouse-up,
* and puts all of those points in a {@link Geometry} used by a {@link Shape}.
* It then adds a node data object to the diagram's model.
* <p/>
* This tool may be installed as the first mouse down tool:
* <code>myDiagram.toolManager.mouseDownTools.insertAt(0, new FreehandDrawingTool());</code>
* <p/>
* The Shape used during the drawing operation can be customized by setting {@link #temporaryShape}.
* The node data added to the model can be customized by setting {@link #archetypePartData}.
*/
export class FreehandDrawingTool extends go.Tool {
  public readonly name: string = "FreehandDrawing";
  private _archetypePartData: {} = {}; // the data to copy for a new polyline Part
  private _isBackgroundOnly: boolean = true; // affects canStart()

  // this is the Shape that is shown during a drawing operation
  private _temporaryShape: go.GraphObject = go.GraphObject.make(go.Shape, { name: "SHAPE", fill: null, strokeWidth: 1.5 });
  // the Shape has to be inside a temporary Part that is used during the drawing operation
  private temp: go.GraphObject = go.GraphObject.make(go.Part, { layerName: "Tool" }, this._temporaryShape);

  /**
  * Only start if the diagram is modifiable and allows insertions.
  * OPTIONAL: if the user is starting in the diagram's background, not over an existing Part.
  * @this {FreehandDrawingTool}
  */
  public canStart(): boolean {
    if (!this.isEnabled) return false;
    var diagram = this.diagram;
    if (diagram === null || diagram.isReadOnly || diagram.isModelReadOnly) return false;
    if (!diagram.allowInsert) return false;
    // don't include the following check when this tool is running modally
    if (diagram.currentTool !== this && this.isBackgroundOnly) {
      // only operates in the background, not on some Part
      var part = diagram.findPartAt(diagram.lastInput.documentPoint, true);
      if (part !== null) return false;
    }
    return true;
  };

  /**
  * Capture the mouse and use a "crosshair" cursor.
  * @this {FreehandDrawingTool}
  */
  public doActivate() {
    super.doActivate.call(this);
    this.diagram.isMouseCaptured = true;
    this.diagram.currentCursor = "crosshair";
  };

  /**
  * Cleanup.
  * @this {FreehandDrawingTool}
  */
  public doDeactivate() {
    super.doDeactivate.call(this);
    if (this.temporaryShape !== null) {
      this.diagram.remove(this.temporaryShape.part);
    }
    this.diagram.currentCursor = "";
    this.diagram.isMouseCaptured = false;
  };

  /**
  * This adds a Point to the {@link #temporaryShape}'s geometry.
  * <p/>
  * If the Shape is not yet in the Diagram, its geometry is initialized and
  * its parent Part is added to the Diagram.
  * <p/>
  * If the point is less than half a pixel away from the previous point, it is ignored.
  * @this {FreehandDrawingTool}
  * @param {Point} p
  */
  public addPoint(p: go.Point) {
    var shape = this.temporaryShape;
    if (shape === null) return;

    // for the temporary Shape, normalize the geometry to be in the viewport
    var viewpt = this.diagram.viewportBounds.position;
    var q = new go.Point(p.x - viewpt.x, p.y - viewpt.y);

    var part = shape.part;
    if (part.diagram === null) {
      var fig = new go.PathFigure(q.x, q.y, true);  // possibly filled, depending on Shape.fill
      var geo = new go.Geometry().add(fig);  // the Shape.geometry consists of a single PathFigure
      this.temporaryShape.geometry = geo;
      // position the Shape's Part, accounting for the strokeWidth
      part.position = new go.Point(viewpt.x - shape.strokeWidth/2, viewpt.y - shape.strokeWidth/2);
      this.diagram.add(part);
    }

    // only add a point if it isn't too close to the last one
    var segs = shape.geometry.figures.first().segments;
    var idx = segs.count - 1;
    if (idx >= 0) {
      var last = segs.elt(idx);
      if (Math.abs(q.x - last.endX) < 0.5 && Math.abs(q.y - last.endY) < 0.5) return;
    }

    // must copy whole Geometry in order to add a PathSegment
    var geo = shape.geometry.copy();
    var fig = geo.figures.first();
    var seg = new go.PathSegment(go.PathSegment.Line, q.x, q.y);
    fig.add(seg);
    shape.geometry = geo;
  };

  /**
  * Start drawing the line by starting to accumulate points in the {@link #temporaryShape}'s geometry.
  * @this {FreehandDrawingTool}
  */
  public doMouseDown() {
    if (!this.isActive) {
      this.doActivate();
      // the first point
      this.addPoint(this.diagram.lastInput.documentPoint);
    }
  };

  /**
  * Keep accumulating points in the {@link #temporaryShape}'s geometry.
  * @this {FreehandDrawingTool}
  */
  public doMouseMove() {
    if (this.isActive) {
      this.addPoint(this.diagram.lastInput.documentPoint);
    }
  };

  /**
  * Finish drawing the line by adding a node data object holding the
  * geometry string and the node position that the node template can bind to.
  * This copies the {@link #archetypePartData} and adds it to the model.
  * @this {FreehandDrawingTool}
  */
  public doMouseUp() {
    var started = false;
    if (this.isActive) {
      started = true;
      var diagram = this.diagram;
      // the last point
      this.addPoint(diagram.lastInput.documentPoint);
      // normalize geometry and node position
      var viewpt = diagram.viewportBounds.position;
      var geo = this.temporaryShape.geometry.copy();
      var pos = geo.normalize();
      pos.x = viewpt.x - pos.x;
      pos.y = viewpt.y - pos.y;

      diagram.startTransaction(this.name);
      // create the node data for the model
      var d = diagram.model.copyNodeData(this.archetypePartData);
      // adding data to model creates the actual Part
      diagram.model.addNodeData(d);
      var part = diagram.findPartForData(d);
      // assign the location
      part.location = new go.Point(pos.x + geo.bounds.width / 2, pos.y + geo.bounds.height / 2);
      // assign the Shape.geometry
      var shape = part.findObject("SHAPE") as go.Shape;
      if (shape !== null) shape.geometry = geo;
    }
    this.stopTool();
    if (started) diagram.commitTransaction(this.name);
  };

  // Public properties

  /**
  * Gets or sets the Shape that is used to hold the line as it is being drawn.
  * The default value is a simple Shape drawing an unfilled open thin black line.
  * @name FreehandDrawingTool#temporaryShape
  * @function.
  * @return {Shape}
  */
  get temporaryShape(): go.Shape { return this._temporaryShape as go.Shape; }
  set temporaryShape(val: go.Shape) {
    if (this._temporaryShape !== val && val !== null) {
      val.name = "SHAPE";
      var panel = this._temporaryShape.panel;
      panel.remove(this._temporaryShape);
      this._temporaryShape = val;
      panel.add(this._temporaryShape);
    }
  }
  /**
  * Gets or sets the node data object that is copied and added to the model
  * when the freehand drawing operation completes.
  * @name FreehandDrawingTool#archetypePartData
  * @function.
  * @return {Object}
  */
  get archetypePartData(): Object { return this._archetypePartData }
  set archetypePartData(val: Object) { this._archetypePartData = val }

  /**
  * Gets or sets whether this tool can only run if the user starts in the diagram's background
  * rather than on top of an existing Part.
  * The default value is true.
  * @name FreehandDrawingTool#isBackgroundOnly
  * @function.
  * @return {boolean}
  */
  get isBackgroundOnly(): boolean { return this._isBackgroundOnly; }
  set isBackgroundOnly(val: boolean) { this._isBackgroundOnly = val; }

}

