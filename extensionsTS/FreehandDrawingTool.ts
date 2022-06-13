/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';

/**
 * The FreehandDrawingTool allows the user to draw a shape using the mouse.
 * It collects all of the points from a mouse-down, all mouse-moves, until a mouse-up,
 * and puts all of those points in a {@link Geometry} used by a {@link Shape}.
 * It then adds a node data object to the diagram's model.
 *
 * This tool may be installed as the first mouse down tool:
 * ```js
 *   myDiagram.toolManager.mouseDownTools.insertAt(0, new FreehandDrawingTool());
 * ```
 *
 * The Shape used during the drawing operation can be customized by setting {@link #temporaryShape}.
 * The node data added to the model can be customized by setting {@link #archetypePartData}.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/FreehandDrawing.html">Freehand Drawing</a> sample.
 * @category Tool Extension
 */
export class FreehandDrawingTool extends go.Tool {
  // this is the Shape that is shown during a drawing operation
  private _temporaryShape: go.GraphObject = go.GraphObject.make(go.Shape, { name: 'SHAPE', fill: null, strokeWidth: 1.5 });
  private _archetypePartData: go.ObjectData = {}; // the data to copy for a new polyline Part
  private _isBackgroundOnly: boolean = true; // affects canStart()

  // the Shape has to be inside a temporary Part that is used during the drawing operation
  private temp: go.GraphObject = go.GraphObject.make(go.Part, { layerName: 'Tool' }, this._temporaryShape);

  constructor() {
    super();
    this.name = 'FreehandDrawing';
  }

  /**
   * Gets or sets the Shape that is used to hold the line as it is being drawn.
   *
   * The default value is a simple Shape drawing an unfilled open thin black line.
   */
  get temporaryShape(): go.Shape { return this._temporaryShape as go.Shape; }
  set temporaryShape(val: go.Shape) {
    if (this._temporaryShape !== val && val !== null) {
      val.name = 'SHAPE';
      const panel = this._temporaryShape.panel;
      if (panel !== null) {
        panel.remove(this._temporaryShape);
        this._temporaryShape = val;
        panel.add(this._temporaryShape);
      }
    }
  }

  /**
   * Gets or sets the node data object that is copied and added to the model
   * when the freehand drawing operation completes.
   */
  get archetypePartData(): go.ObjectData { return this._archetypePartData; }
  set archetypePartData(val: go.ObjectData) { this._archetypePartData = val; }

  /**
   * Gets or sets whether this tool can only run if the user starts in the diagram's background
   * rather than on top of an existing Part.
   *
   * The default value is true.
   */
  get isBackgroundOnly(): boolean { return this._isBackgroundOnly; }
  set isBackgroundOnly(val: boolean) { this._isBackgroundOnly = val; }

  /**
   * Only start if the diagram is modifiable and allows insertions.
   * OPTIONAL: if the user is starting in the diagram's background, not over an existing Part.
   */
  public canStart(): boolean {
    if (!this.isEnabled) return false;
    const diagram = this.diagram;
    if (diagram.isReadOnly || diagram.isModelReadOnly) return false;
    if (!diagram.allowInsert) return false;
    // don't include the following check when this tool is running modally
    if (diagram.currentTool !== this && this.isBackgroundOnly) {
      // only operates in the background, not on some Part
      const part = diagram.findPartAt(diagram.lastInput.documentPoint, true);
      if (part !== null) return false;
    }
    return true;
  }

  /**
   * Capture the mouse and use a "crosshair" cursor.
   */
  public doActivate(): void {
    super.doActivate();
    this.diagram.isMouseCaptured = true;
    this.diagram.currentCursor = 'crosshair';
  }

  /**
   * Release the mouse and reset the cursor.
   */
  public doDeactivate(): void {
    super.doDeactivate();
    if (this.temporaryShape !== null && this.temporaryShape.part !== null) {
      this.diagram.remove(this.temporaryShape.part);
    }
    this.diagram.currentCursor = '';
    this.diagram.isMouseCaptured = false;
  }

  /**
   * This adds a Point to the {@link #temporaryShape}'s geometry.
   *
   * If the Shape is not yet in the Diagram, its geometry is initialized and
   * its parent Part is added to the Diagram.
   *
   * If the point is less than half a pixel away from the previous point, it is ignored.
   */
  public addPoint(p: go.Point): void {
    const shape = this.temporaryShape;
    if (shape === null) return;
    const part = shape.part;
    if (part === null) return;

    // for the temporary Shape, normalize the geometry to be in the viewport
    const viewpt = this.diagram.viewportBounds.position;
    const q = new go.Point(p.x - viewpt.x, p.y - viewpt.y);

    if (part.diagram === null) {
      const f = new go.PathFigure(q.x, q.y, true);  // possibly filled, depending on Shape.fill
      const g = new go.Geometry().add(f);  // the Shape.geometry consists of a single PathFigure
      shape.geometry = g;
      // position the Shape's Part, accounting for the strokeWidth
      part.position = new go.Point(viewpt.x - shape.strokeWidth / 2, viewpt.y - shape.strokeWidth / 2);
      this.diagram.add(part);
    }

    // only add a point if it isn't too close to the last one
    const geo = shape.geometry;
    if (geo !== null) {
      const fig = geo.figures.first();
      if (fig !== null) {
        const segs = fig.segments;
        const idx = segs.count - 1;
        if (idx >= 0) {
          const last = segs.elt(idx);
          if (Math.abs(q.x - last.endX) < 0.5 && Math.abs(q.y - last.endY) < 0.5) return;
        }

        // must copy whole Geometry in order to add a PathSegment
        const geo2 = geo.copy();
        const fig2 = geo2.figures.first();
        if (fig2 !== null) {
          fig2.add(new go.PathSegment(go.PathSegment.Line, q.x, q.y));
          shape.geometry = geo2;
        }
      }
    }
  }

  /**
   * Start drawing the line by starting to accumulate points in the {@link #temporaryShape}'s geometry.
   */
  public doMouseDown(): void {
    if (!this.isActive) {
      this.doActivate();
      // the first point
      this.addPoint(this.diagram.lastInput.documentPoint);
    }
  }

  /**
   * Keep accumulating points in the {@link #temporaryShape}'s geometry.
   */
  public doMouseMove(): void {
    if (this.isActive) {
      this.addPoint(this.diagram.lastInput.documentPoint);
    }
  }

  /**
   * Finish drawing the line by adding a node data object holding the
   * geometry string and the node position that the node template can bind to.
   * This copies the {@link #archetypePartData} and adds it to the model.
   */
  public doMouseUp(): void {
    const diagram = this.diagram;
    let started = false;
    if (this.isActive) {
      started = true;
      // the last point
      this.addPoint(diagram.lastInput.documentPoint);
      // normalize geometry and node position
      const viewpt = diagram.viewportBounds.position;
      if (this.temporaryShape.geometry !== null) {
        const geo = this.temporaryShape.geometry.copy();
        const pos = geo.normalize();
        pos.x = viewpt.x - pos.x;
        pos.y = viewpt.y - pos.y;

        diagram.startTransaction(this.name);
        // create the node data for the model
        const d = diagram.model.copyNodeData(this.archetypePartData);
        if (d !== null) {
          // adding data to model creates the actual Part
          diagram.model.addNodeData(d);
          const part = diagram.findPartForData(d);
          if (part !== null) {
            // assign the location
            part.location = new go.Point(pos.x + geo.bounds.width / 2, pos.y + geo.bounds.height / 2);
            // assign the Shape.geometry
            const shape = part.findObject('SHAPE') as go.Shape;
            if (shape !== null) shape.geometry = geo;
          }
        }
      }
    }
    this.stopTool();
    if (started) diagram.commitTransaction(this.name);
  }
}
