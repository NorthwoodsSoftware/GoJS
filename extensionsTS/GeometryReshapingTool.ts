/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
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
  private _midHandleArchetype: go.GraphObject;
  private _isResegmenting: boolean;
  private _resegmentingDistance: number;
  private _reshapeObjectName: string;  // ??? can't add Part.reshapeObjectName property
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
    this.name = 'GeometryReshaping';

    let h: go.Shape = new go.Shape();
    h.figure = 'Diamond';
    h.desiredSize = new go.Size(8, 8);
    h.fill = 'lightblue';
    h.stroke = 'dodgerblue';
    h.cursor = 'move';
    this._handleArchetype = h;

    h = new go.Shape();
    h.figure = 'Circle';
    h.desiredSize = new go.Size(7, 7);
    h.fill = 'lightblue';
    h.stroke = 'dodgerblue';
    h.cursor = 'move';
    this._midHandleArchetype = h;

    this._isResegmenting = false;
    this._resegmentingDistance = 3;

    this._reshapeObjectName = 'SHAPE';
  }

  /**
   * A small GraphObject used as a reshape handle for each segment.
   * The default GraphObject is a small blue diamond.
   */
  get handleArchetype(): go.GraphObject { return this._handleArchetype; }
  set handleArchetype(value: go.GraphObject) { this._handleArchetype = value; }

  /**
   * A small GraphObject used as a reshape handle at the middle of each segment for inserting a new segment.
   * The default GraphObject is a small blue circle.
   */
  get midHandleArchetype(): go.GraphObject { return this._midHandleArchetype; }
  set midHandleArchetype(value: go.GraphObject) { this._midHandleArchetype = value; }

  /**
  * Gets or sets whether this tool supports the user's addition or removal of segments in the geometry.
  * The default value is false.
  * When the value is true, copies of the {@link #midHandleArchetype} will appear in the middle of each segment.
  * At the current time, resegmenting is limited to straight segments, not curved ones.
  */
  get isResegmenting(): boolean { return this._isResegmenting; }
  set isResegmenting(val: boolean) { this._isResegmenting = val; }

  /**
  * The maximum distance at which a resegmenting handle being positioned on a straight line
  * between the adjacent points will cause one of the segments to be removed from the geometry.
  * The default value is 3.
  */
  get resegmentingDistance(): number { return this._resegmentingDistance; }
  set resegmentingDistance(val: number) { this._resegmentingDistance = val; }

  /**
   * The name of the GraphObject to be reshaped.
   * The default name is "SHAPE".
   */
  get reshapeObjectName(): string { return this._reshapeObjectName; }
  set reshapeObjectName(value: string) { this._reshapeObjectName = value; }

  /**
   * This read-only property returns the {@link GraphObject} that is the tool handle being dragged by the user.
   * This will be contained by an {@link Adornment} whose category is "GeometryReshaping".
   * Its {@link Adornment#adornedObject} is the same as the {@link #adornedShape}.
   */
 get handle(): go.GraphObject | null { return this._handle; }
 set handle(val: go.GraphObject | null) { this._handle = val; }

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
   * Don't show anything if {@link #reshapeObjectName} doesn't return a {@link Shape}
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
        const geo = selelt.geometry;
        let adornment = part.findAdornment(this.name);
        if (adornment === null || (this._countHandles(geo) !== adornment.elements.count - 1)) {
          adornment = this.makeAdornment(selelt);
        }
        if (adornment !== null) {
          // update the position/alignment of each handle
          const b = geo.bounds;
          // update the size of the adornment
          const body = adornment.findObject('BODY');
          if (body !== null) body.desiredSize = b.size;
          let unneeded = null;
          const elts = adornment.elements;
          for (let i = 0; i < elts.count; i++) {
            const h = adornment.elt(i);
            if (typeof (h as any)._typ !== "number") continue;
            const typ = (h as any)._typ as number;
            if (typeof (h as any)._fig !== "number") continue;
            const figi = (h as any)._fig as number;
            if (figi >= geo.figures.count) {
              if (unneeded === null) unneeded = [];
              unneeded.push(h);
              continue;
            }
            var fig = geo.figures.elt(figi);
            if (typeof (h as any)._seg !== "number") continue;
            const segi = (h as any)._seg as number;
            if (segi >= fig.segments.count) {
              if (unneeded === null) unneeded = [];
              unneeded.push(h);
              continue;
            }
            var seg = fig.segments.elt(segi);
            var x = 0;
            var y = 0;
            switch (typ) {
              case 0: x = fig.startX; y = fig.startY; break;
              case 1: x = seg.endX; y = seg.endY; break;
              case 2: x = seg.point1X; y = seg.point1Y; break;
              case 3: x = seg.point2X; y = seg.point2Y; break;
              case 4: x = (fig.startX + seg.endX) / 2; y = (fig.startY + seg.endY) / 2; break;
              case 5: x = (fig.segments.elt(segi-1).endX + seg.endX) / 2; y = (fig.segments.elt(segi-1).endY + seg.endY) / 2; break;
              case 6: x = (fig.startX + seg.endX) / 2; y = (fig.startY + seg.endY) / 2; break;
              default: throw new Error('unexpected handle type')
            }
            h.alignment = new go.Spot(0, 0, x - b.x, y - b.y);
          }
          if (unneeded !== null) {
            unneeded.forEach(function(h) { if (adornment) adornment.remove(h); });
          }
  
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
  private _countHandles(geo: go.Geometry): number {
    var reseg = this.isResegmenting;
    var c = 0;
    geo.figures.each(function(fig) {
      c++;
      fig.segments.each(function(seg) {
        if (reseg) {
          if (seg.type === go.PathSegment.Line) c++;
          if (seg.isClosed) c++;
        }
        c++;
        if (seg.type === go.PathSegment.QuadraticBezier) c++;
        else if (seg.type === go.PathSegment.Bezier) c += 2;
      })
    });
    return c;
  };

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
      if (this.isResegmenting) {
        for (let f = 0; f < geo.figures.count; f++) {
          const fig = geo.figures.elt(f);
          for (let g = 0; g < fig.segments.count; g++) {
            const seg = fig.segments.elt(g);
            let h: go.GraphObject | null;
            if (seg.type === go.PathSegment.Line) {
              h = this.makeResegmentHandle(selelt, fig, seg);
              if (h !== null) {
                (h as any)._typ = (g === 0) ? 4 : 5;
                (h as any)._fig = f;
                (h as any)._seg = g;
                adornment.add(h);
              }
            }
            if (seg.isClosed) {
              h = this.makeResegmentHandle(selelt, fig, seg);
              if (h !== null) {
                (h as any)._typ = 6;
                (h as any)._fig = f;
                (h as any)._seg = g;
                adornment.add(h);
              }
            }
          }
        }
      }
    
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
  public makeHandle(selelt: go.Shape, fig: go.PathFigure, seg: go.PathSegment): go.GraphObject | null {
    const h = this.handleArchetype;
    if (h === null) return null;
    return h.copy();
  }

  /**
   * @hidden @internal
   */
  public makeResegmentHandle(pathshape: go.Shape, fig: go.PathFigure, seg: go.PathSegment) {
    var h = this.midHandleArchetype;
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
    if (diagram === null) return;
    this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    const h = this._handle;
    if (h === null) return;
    const shape = (h.part as go.Adornment).adornedObject as go.Shape;
    if (!shape || !shape.part) return;
    this._adornedShape = shape;
    diagram.isMouseCaptured = true;
    this.startTransaction(this.name);

    const typ = (h as any)._typ as number;
    const figi = (h as any)._fig as number;
    const segi = (h as any)._seg as number;
    if (this.isResegmenting && typ >= 4 && shape.geometry !== null) {
      const locpt = shape.getLocalPoint(diagram.firstInput.documentPoint);
      const geo = shape.geometry.copy();
      const fig = geo.figures.elt(figi);
      const seg = fig.segments.elt(segi);
      const newseg = seg.copy();
      switch (typ) {
        case 4: {
          newseg.endX = (fig.startX + seg.endX) / 2;
          newseg.endY = (fig.startY + seg.endY) / 2;
          newseg.isClosed = false;
          fig.segments.insertAt(segi, newseg);
          break;
        }
        case 5: {
          const prevseg = fig.segments.elt(segi - 1);
          newseg.endX = (prevseg.endX + seg.endX) / 2;
          newseg.endY = (prevseg.endY + seg.endY) / 2;
          newseg.isClosed = false;
          fig.segments.insertAt(segi, newseg);
          break;
        }
        case 6: {
          newseg.endX = (fig.startX + seg.endX) / 2;
          newseg.endY = (fig.startY + seg.endY) / 2;
          newseg.isClosed = seg.isClosed;
          seg.isClosed = false;
          fig.add(newseg);
          break;
        }
      }
      shape.geometry = geo;  // modify the Shape
      var part = shape.part;
      part.ensureBounds();
      this.updateAdornments(part);  // update any Adornments of the Part
      this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
      if (this._handle === null) {
        this.doDeactivate();  // need to rollback the transaction and not set .isActive
        return;
      }
    }
  
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
    if (diagram !== null) diagram.isMouseCaptured = false;
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
    if (this.isActive && diagram !== null) {
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
    if (this.isActive && diagram !== null) {
      const newpt = this.computeReshape(diagram.lastInput.documentPoint);
      this.reshape(newpt);
      const shape = this.adornedShape;
      if (this.isResegmenting && shape && shape.geometry && shape.part) {
        const typ = (this.handle as any)._typ as number;
        const figi = (this.handle as any)._fig as number;
        const segi = (this.handle as any)._seg as number;
        const fig = shape.geometry.figures.elt(figi);
        if (fig && fig.segments.count > 2) {  // avoid making a degenerate polygon
          let ax, ay, bx, by, cx, cy;
          if (typ === 0) {
            const lastseg = fig.segments.length-1;
            ax = fig.segments.elt(lastseg).endX; ay = fig.segments.elt(lastseg).endY;
            bx = fig.startX; by = fig.startY;
            cx = fig.segments.elt(0).endX; cy = fig.segments.elt(0).endY;
          } else {
            if (segi <= 0) {
              ax = fig.startX; ay = fig.startY;
            } else {
              ax = fig.segments.elt(segi - 1).endX; ay = fig.segments.elt(segi - 1).endY;
            }
            bx = fig.segments.elt(segi).endX; by = fig.segments.elt(segi).endY;
            if (segi >= fig.segments.length-1) {
              cx = fig.startX; cy = fig.startY;
            } else {
              cx = fig.segments.elt(segi + 1).endX; cy = fig.segments.elt(segi + 1).endY;
            }
          }
          const q = new go.Point(bx, by);
          q.projectOntoLineSegment(ax, ay, cx, cy);
          // if B is within resegmentingDistance of the line from A to C,
          // and if Q is between A and C, remove that point from the geometry
          const dist = q.distanceSquaredPoint(new go.Point(bx, by));
          if (dist < this.resegmentingDistance * this.resegmentingDistance) {
            const geo = shape.geometry.copy();
            const fig = geo.figures.elt(figi);
            if (typ === 0) {
              const first = fig.segments.first();
              if (first) { fig.startX = first.endX; fig.startY = first.endY; }
            }
            if (segi > 0) {
              const prev = fig.segments.elt(segi - 1);
              const seg = fig.segments.elt(segi);
              prev.isClosed = seg.isClosed;
            }
            fig.segments.removeAt(segi);
            shape.geometry = geo;
            shape.part.removeAdornment(this.name);
            this.updateAdornments(shape.part);
          }
        }
      }
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
    const h = this.handle;
    if (!h) return;
    const type = (h as any)._typ;
    if (type === undefined) return;
    if ((h as any)._fig >= geo.figures.count) return;
    const fig = geo.figures.elt((h as any)._fig);
    if ((h as any)._seg >= fig.segments.count) return;
    const seg = fig.segments.elt((h as any)._seg);
    switch (type) {
      case 0: fig.startX = locpt.x; fig.startY = locpt.y; break;
      case 1: seg.endX = locpt.x; seg.endY = locpt.y; break;
      case 2: seg.point1X = locpt.x; seg.point1Y = locpt.y; break;
      case 3: seg.point2X = locpt.x; seg.point2Y = locpt.y; break;
    }
    const offset = geo.normalize();  // avoid any negative coordinates in the geometry
    shape.desiredSize = new go.Size(NaN, NaN); // clear the desiredSize so Geometry can determine size
    shape.geometry = geo;  // modify the Shape
    const part = shape.part;  // move the Part holding the Shape
    if (part === null) return;
    part.ensureBounds();
    if (part.locationObject !== shape && !part.locationSpot.equals(go.Spot.Center)) {  // but only if the locationSpot isn't Center
      // support the whole Node being rotated
      part.move(part.position.copy().subtract(offset.rotate(part.angle)));
    }
    this.updateAdornments(part);  // update any Adornments of the Part
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
