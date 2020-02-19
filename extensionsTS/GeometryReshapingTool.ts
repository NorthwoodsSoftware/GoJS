/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';

/**
 * The GeometryReshapingTool class allows for a Shape's Geometry to be modified by the user
 * via the dragging of tool handles.
 * This does not handle Links, whose routes should be reshaped by the LinkReshapingTool.
 * The {@link #reshapeObjectName} needs to identify the named {@link Shape} within the
 * selected {@link Part}.
 * If the shape cannot be found or if its {@link Shape#geometry} is not of type {@link Geometry.Path},
 * this will not show any GeometryReshaping {@link Adornment}.
 * At the current time this tool does not support adding or removing {@link PathSegment}s to the Geometry.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/GeometryReshaping.html">Geometry Reshaping</a> sample.
 * @category Tool Extension
 */
export class GeometryReshapingTool extends go.Tool {

  private _handleArchetype: go.GraphObject;
  private _reshapeObjectName = 'SHAPE';  // ??? can't add Part.reshapeObjectName property
  // there's no Part.reshapeAdornmentTemplate either

  // internal state
  private _handle: go.GraphObject | null = null;
  private _adornedShape: go.Shape | null = null;
  private _originalGeometry: go.Geometry | null = null;  // in case the tool is cancelled and the UndoManager is not enabled

  /**
   * Constructs a GeometryReshapingTool and sets the handle and name of the tool.
   */
  constructor() {
    super();
    const h: go.Shape = new go.Shape();
    h.figure = 'Diamond';
    h.desiredSize = new go.Size(7, 7);
    h.fill = 'lightblue';
    h.stroke = 'dodgerblue';
    h.cursor = 'move';
    this._handleArchetype = h;
    this.name = 'GeometryReshaping';
  }

  /**
   * A small GraphObject used as a reshape handle for each segment.
   * The default GraphObject is a small blue diamond.
   */
  get handleArchetype(): go.GraphObject { return this._handleArchetype; }
  set handleArchetype(value: go.GraphObject) { this._handleArchetype = value; }

  /**
   * The name of the GraphObject to be reshaped.
   */
  get reshapeObjectName(): string { return this._reshapeObjectName; }
  set reshapeObjectName(value: string) { this._reshapeObjectName = value; }

  /**
   * This read-only property returns the {@link GraphObject} that is the tool handle being dragged by the user.
   * This will be contained by an {@link Adornment} whose category is "GeometryReshaping".
   * Its {@link Adornment#adornedObject} is the same as the {@link #adornedShape}.
   */
  get handle(): go.GraphObject | null { return this._handle; }

  /**
   * Gets the {@link Shape} that is being reshaped.
   * This must be contained within the selected Part.
   */
  get adornedShape(): go.Shape | null { return this._adornedShape; }

  /**
   * This read-only property remembers the original value for {@link Shape#geometry},
   * so that it can be restored if this tool is cancelled.
   */
  get originalGeometry(): go.Geometry | null { return this._originalGeometry; }

  /**
   * Show an {@link Adornment} with a reshape handle at each point of the geometry.
   * Don't show anything if {@link #reshapeObjectName} doesn't identify a {@link Shape}
   * that has a {@link Shape#geometry} of type {@link Geometry.Path}.
   */
  public updateAdornments(part: go.Part): void {
    if (part === null || part instanceof go.Link) return;  // this tool never applies to Links
    if (part.isSelected && !this.diagram.isReadOnly) {
      const selelt = part.findObject(this.reshapeObjectName);
      if (selelt instanceof go.Shape && selelt.geometry !== null &&
        selelt.actualBounds.isReal() && selelt.isVisibleObject() &&
        part.canReshape() && part.actualBounds.isReal() && part.isVisible() &&
        selelt.geometry.type === go.Geometry.Path) {
        let adornment = part.findAdornment(this.name);
        if (adornment === null) {
          adornment = this.makeAdornment(selelt);
        }
        if (adornment !== null) {
          // update the position/alignment of each handle
          const geo = selelt.geometry;
          const b = geo.bounds;
          // update the size of the adornment
          const body = adornment.findObject('BODY');
          if (body !== null) body.desiredSize = b.size;
          adornment.elements.each(function(h: any) {
            if (h._typ === undefined) return;
            const fig = geo.figures.elt(h._fig);
            const seg = fig.segments.elt(h._seg);
            let x = 0;
            let y = 0;
            switch (h._typ) {
              case 0: x = fig.startX; y = fig.startY; break;
              case 1: x = seg.endX; y = seg.endY; break;
              case 2: x = seg.point1X; y = seg.point1Y; break;
              case 3: x = seg.point2X; y = seg.point2Y; break;
            }
            h.alignment = new go.Spot(0, 0, x - b.x, y - b.y);
          });

          part.addAdornment(this.name, adornment);
          adornment.location = selelt.getDocumentPoint(go.Spot.TopLeft);
          adornment.angle = selelt.getDocumentAngle();
          return;
        }
      }
    }
    part.removeAdornment(this.name);
  }

  /**
   * @hidden @internal
   */
  public makeAdornment(selelt: go.Shape): go.Adornment {
    const adornment = new go.Adornment();
    adornment.type = go.Panel.Spot;
    adornment.locationObjectName = 'BODY';
    adornment.locationSpot = new go.Spot(0, 0, -selelt.strokeWidth / 2, -selelt.strokeWidth / 2);
    let h: any = new go.Shape();
    h.name = 'BODY';
    h.fill = null;
    h.stroke = null;
    h.strokeWidth = 0;
    adornment.add(h);

    const geo = selelt.geometry;
    if (geo !== null) {
      // requires Path Geometry, checked above in updateAdornments
      for (let f = 0; f < geo.figures.count; f++) {
        const fig = geo.figures.elt(f);
        for (let g = 0; g < fig.segments.count; g++) {
          const seg = fig.segments.elt(g);
          if (g === 0) {
            h = this.makeHandle(selelt, fig, seg);
            if (h !== null) {
              h._typ = 0;
              h._fig = f;
              h._seg = g;
              adornment.add(h);
            }
          }
          h = this.makeHandle(selelt, fig, seg);
          if (h !== null) {
            h._typ = 1;
            h._fig = f;
            h._seg = g;
            adornment.add(h);
          }
          if (seg.type === go.PathSegment.QuadraticBezier || seg.type === go.PathSegment.Bezier) {
            h = this.makeHandle(selelt, fig, seg);
            if (h !== null) {
              h._typ = 2;
              h._fig = f;
              h._seg = g;
              adornment.add(h);
            }
            if (seg.type === go.PathSegment.Bezier) {
              h = this.makeHandle(selelt, fig, seg);
              if (h !== null) {
                h._typ = 3;
                h._fig = f;
                h._seg = g;
                adornment.add(h);
              }
            }
          }
        }
      }
    }
    adornment.category = this.name;
    adornment.adornedObject = selelt;
    return adornment;
  }

  /**
   * @hidden @internal
   */
  public makeHandle(selelt: go.GraphObject, fig: go.PathFigure, seg: go.PathSegment): go.GraphObject | null {
    const h = this.handleArchetype;
    if (h === null) return null;
    return h.copy();
  }

  /**
   * This tool may run when there is a mouse-down event on a reshape handle.
   */
  public canStart(): boolean {
    if (!this.isEnabled) return false;

    const diagram = this.diagram;
    if (diagram.isReadOnly) return false;
    if (!diagram.allowReshape) return false;
    if (!diagram.lastInput.left) return false;
    const h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    return (h !== null);
  }

  /**
   * Start reshaping, if {@link #findToolHandleAt} finds a reshape handle at the mouse down point.
   *
   * If successful this sets {@link #handle} to be the reshape handle that it finds
   * and {@link #adornedShape} to be the {@link Shape} being reshaped.
   * It also remembers the original geometry in case this tool is cancelled.
   * And it starts a transaction.
   */
  public doActivate(): void {
    const diagram = this.diagram;
    this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    if (this._handle === null) return;
    const shape = (this._handle.part as go.Adornment).adornedObject as go.Shape;
    if (!shape) return;
    this._adornedShape = shape;
    diagram.isMouseCaptured = true;
    this.startTransaction(this.name);
    this._originalGeometry = shape.geometry;
    this.isActive = true;
  }

  /**
   * This stops the current reshaping operation with the Shape as it is.
   */
  public doDeactivate(): void {
    this.stopTransaction();

    this._handle = null;
    this._adornedShape = null;
    const diagram = this.diagram;
    diagram.isMouseCaptured = false;
    this.isActive = false;
  }

  /**
   * Restore the shape to be the original geometry and stop this tool.
   */
  public doCancel(): void {
    const shape = this._adornedShape;
    if (shape !== null) {
      // explicitly restore the original route, in case !UndoManager.isEnabled
      shape.geometry = this._originalGeometry;
    }
    this.stopTool();
  }

  /**
   * Call {@link #reshape} with a new point determined by the mouse
   * to change the geometry of the {@link #adornedShape}.
   */
  public doMouseMove(): void {
    const diagram = this.diagram;
    if (this.isActive) {
      const newpt = this.computeReshape(diagram.lastInput.documentPoint);
      this.reshape(newpt);
    }
  }

  /**
   * Reshape the Shape's geometry with a point based on the most recent mouse point by calling {@link #reshape},
   * and then stop this tool.
   */
  public doMouseUp(): void {
    const diagram = this.diagram;
    if (this.isActive) {
      const newpt = this.computeReshape(diagram.lastInput.documentPoint);
      this.reshape(newpt);
      this.transactionResult = this.name;  // success
    }
    this.stopTool();
  }

  /**
   * Change the geometry of the {@link #adornedShape} by moving the point corresponding to the current
   * {@link #handle} to be at the given {@link Point}.
   * This is called by {@link #doMouseMove} and {@link #doMouseUp} with the result of calling
   * {@link #computeReshape} to constrain the input point.
   * @param {Point} newPoint the value of the call to {@link #computeReshape}.
   */
  public reshape(newPoint: go.Point): void {
    const shape = this.adornedShape;
    if (shape === null || shape.geometry === null) return;
    const locpt = shape.getLocalPoint(newPoint);
    const geo = shape.geometry.copy();
    shape.desiredSize = new go.Size(NaN, NaN); // set the desiredSize once we've gotten our Geometry so we don't clobber
    const type = (this.handle as any)._typ;
    if (type === undefined) return;
    const fig = geo.figures.elt((this.handle as any)._fig);
    const seg = fig.segments.elt((this.handle as any)._seg);
    switch (type) {
      case 0: fig.startX = locpt.x; fig.startY = locpt.y; break;
      case 1: seg.endX = locpt.x; seg.endY = locpt.y; break;
      case 2: seg.point1X = locpt.x; seg.point1Y = locpt.y; break;
      case 3: seg.point2X = locpt.x; seg.point2Y = locpt.y; break;
    }
    const offset = geo.normalize();  // avoid any negative coordinates in the geometry
    shape.geometry = geo;  // modify the Shape
    const part = shape.part;  // move the Part holding the Shape
    if (part === null) return;
    part.ensureBounds();
    if (part.locationObject !== shape && !part.locationSpot.equals(go.Spot.Center)) {  // but only if the locationSpot isn't Center
      // support the whole Node being rotated
      part.move(part.position.copy().subtract(offset.rotate(part.angle)));
    }
    this.diagram.maybeUpdate();  // force more frequent drawing for smoother looking behavior
  }

  /**
   * This is called by {@link #doMouseMove} and {@link #doMouseUp} to limit the input point
   * before calling {@link #reshape}.
   * By default, this doesn't limit the input point.
   * @param {Point} p the point where the handle is being dragged.
   * @return {Point}
   */
  public computeReshape(p: go.Point): go.Point {
    return p;  // no constraints on the points
  }
}
