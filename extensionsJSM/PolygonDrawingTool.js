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
import * as go from '../release/go-module.js';
/**
 * The PolygonDrawingTool class lets the user draw a new polygon or polyline shape by clicking where the corners should go.
 * Right click or type ENTER to finish the operation.
 *
 * Set {@link #isPolygon} to false if you want this tool to draw open unfilled polyline shapes.
 * Set {@link #archetypePartData} to customize the node data object that is added to the model.
 * Data-bind to those properties in your node template to customize the appearance and behavior of the part.
 *
 * This tool uses a temporary {@link Shape}, {@link #temporaryShape}, held by a {@link Part} in the "Tool" layer,
 * to show interactively what the user is drawing.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/PolygonDrawing.html">Polygon Drawing</a> sample.
 * @category Tool Extension
 */
export class PolygonDrawingTool extends go.Tool {
    /**
     * Constructs an PolygonDrawingTool and sets the name for the tool.
     */
    constructor() {
        super();
        this._isPolygon = true;
        this._hasArcs = false;
        this._isOrthoOnly = false;
        this._isGridSnapEnabled = false;
        this._archetypePartData = {}; // the data to copy for a new polygon Part
        // this is the Shape that is shown during a drawing operation
        this._temporaryShape = go.GraphObject.make(go.Shape, { name: 'SHAPE', fill: 'lightgray', strokeWidth: 1.5 });
        // the Shape has to be inside a temporary Part that is used during the drawing operation
        this.temp = go.GraphObject.make(go.Part, { layerName: 'Tool' }, this._temporaryShape);
        this.name = 'PolygonDrawing';
    }
    /**
     * Gets or sets whether this tools draws a filled polygon or an unfilled open polyline.
     *
     * The default value is true.
     */
    get isPolygon() { return this._isPolygon; }
    set isPolygon(val) { this._isPolygon = val; }
    /**
     * Gets or sets whether this tool draws shapes with quadratic bezier curves for each segment, or just straight lines.
     *
     * The default value is false -- only use straight lines.
     */
    get hasArcs() { return this._hasArcs; }
    set hasArcs(val) { this._hasArcs = val; }
    /**
     * Gets or sets whether this tool draws shapes with only orthogonal segments, or segments in any direction.
     * The default value is false -- draw segments in any direction. This does not restrict the closing segment, which may not be orthogonal.
     */
    get isOrthoOnly() { return this._isOrthoOnly; }
    set isOrthoOnly(val) { this._isOrthoOnly = val; }
    /**
     * Gets or sets whether this tool only places the shape's corners on the Diagram's visible grid.
     * The default value is false
     */
    get isGridSnapEnabled() { return this._isGridSnapEnabled; }
    set isGridSnapEnabled(val) { this._isGridSnapEnabled = val; }
    /**
     * Gets or sets the node data object that is copied and added to the model
     * when the drawing operation completes.
     */
    get archetypePartData() { return this._archetypePartData; }
    set archetypePartData(val) { this._archetypePartData = val; }
    /**
     * Gets or sets the Shape that is used to hold the line as it is being drawn.
     *
     * The default value is a simple Shape drawing an unfilled open thin black line.
     */
    get temporaryShape() { return this._temporaryShape; }
    set temporaryShape(val) {
        if (this._temporaryShape !== val && val !== null) {
            val.name = 'SHAPE';
            const panel = this._temporaryShape.panel;
            if (panel !== null) {
                if (panel !== null)
                    panel.remove(this._temporaryShape);
                this._temporaryShape = val;
                if (panel !== null)
                    panel.add(this._temporaryShape);
            }
        }
    }
    /**
     * Don't start this tool in a mode-less fashion when the user's mouse-down is on an existing Part.
     * When this tool is a mouse-down tool, it requires using the left mouse button in the background of a modifiable Diagram.
     * Modal uses of this tool will not call this canStart predicate.
     */
    canStart() {
        if (!this.isEnabled)
            return false;
        const diagram = this.diagram;
        if (diagram.isReadOnly || diagram.isModelReadOnly)
            return false;
        const model = diagram.model;
        if (model === null)
            return false;
        // require left button
        if (!diagram.firstInput.left)
            return false;
        // can't start when mouse-down on an existing Part
        const obj = diagram.findObjectAt(diagram.firstInput.documentPoint, null, null);
        return (obj === null);
    }
    /**
    * Start a transaction, capture the mouse, use a "crosshair" cursor,
    * and start accumulating points in the geometry of the {@link #temporaryShape}.
    * @this {PolygonDrawingTool}
    */
    doStart() {
        super.doStart();
        var diagram = this.diagram;
        if (!diagram)
            return;
        this.startTransaction(this.name);
        diagram.currentCursor = diagram.defaultCursor = "crosshair";
        if (!diagram.lastInput.isTouchEvent)
            diagram.isMouseCaptured = true;
    }
    /**
     * Start a transaction, capture the mouse, use a "crosshair" cursor,
     * and start accumulating points in the geometry of the {@link #temporaryShape}.
     */
    doActivate() {
        super.doActivate();
        var diagram = this.diagram;
        if (!diagram)
            return;
        // the first point
        if (!diagram.lastInput.isTouchEvent)
            this.addPoint(diagram.lastInput.documentPoint);
    }
    /**
     * Stop the transaction and clean up.
     */
    doStop() {
        super.doStop();
        var diagram = this.diagram;
        if (!diagram)
            return;
        diagram.currentCursor = diagram.defaultCursor = "auto";
        if (this.temporaryShape !== null && this.temporaryShape.part !== null) {
            diagram.remove(this.temporaryShape.part);
        }
        if (diagram.isMouseCaptured)
            diagram.isMouseCaptured = false;
        this.stopTransaction();
    }
    /**
     * @hidden @internal
     * Given a potential Point for the next segment, return a Point it to snap to the grid, and remain orthogonal, if either is applicable.
     */
    modifyPointForGrid(p) {
        const pregrid = p.copy();
        const grid = this.diagram.grid;
        if (grid !== null && grid.visible && this.isGridSnapEnabled) {
            const cell = grid.gridCellSize;
            const orig = grid.gridOrigin;
            p = p.copy();
            p.snapToGrid(orig.x, orig.y, cell.width, cell.height); // compute the closest grid point (modifies p)
        }
        if (this.temporaryShape.geometry === null)
            return p;
        const geometry = this.temporaryShape.geometry;
        if (geometry === null)
            return p;
        const fig = geometry.figures.first();
        if (fig === null)
            return p;
        const segments = fig.segments;
        if (this.isOrthoOnly && segments.count > 0) {
            let lastPt = new go.Point(fig.startX, fig.startY); // assuming segments.count === 1
            if (segments.count > 1) {
                // the last segment is the current temporary segment, which we might be altering. We want the segment before
                const secondLastSegment = (segments.elt(segments.count - 2));
                lastPt = new go.Point(secondLastSegment.endX, secondLastSegment.endY);
            }
            if (pregrid.distanceSquared(lastPt.x, pregrid.y) < pregrid.distanceSquared(pregrid.x, lastPt.y)) { // closer to X coord
                return new go.Point(lastPt.x, p.y);
            }
            else { // closer to Y coord
                return new go.Point(p.x, lastPt.y);
            }
        }
        return p;
    }
    /**
     * @hidden @internal
     * This internal method adds a segment to the geometry of the {@link #temporaryShape}.
     */
    addPoint(p) {
        const diagram = this.diagram;
        const shape = this.temporaryShape;
        if (shape === null)
            return;
        // for the temporary Shape, normalize the geometry to be in the viewport
        const viewpt = diagram.viewportBounds.position;
        const q = this.modifyPointForGrid(new go.Point(p.x - viewpt.x, p.y - viewpt.y));
        const part = shape.part;
        let geo = null;
        // if it's not in the Diagram, re-initialize the Shape's geometry and add the Part to the Diagram
        if (part !== null && part.diagram === null) {
            const fig = new go.PathFigure(q.x, q.y, true); // possibly filled, depending on Shape.fill
            geo = new go.Geometry().add(fig); // the Shape.geometry consists of a single PathFigure
            this.temporaryShape.geometry = geo;
            // position the Shape's Part, accounting for the stroke width
            part.position = viewpt.copy().offset(-shape.strokeWidth / 2, -shape.strokeWidth / 2);
            diagram.add(part);
        }
        else if (shape.geometry !== null) {
            // must copy whole Geometry in order to add a PathSegment
            geo = shape.geometry.copy();
            const fig = geo.figures.first();
            if (fig !== null) {
                if (this.hasArcs) {
                    const lastseg = fig.segments.last();
                    if (lastseg === null) {
                        fig.add(new go.PathSegment(go.PathSegment.QuadraticBezier, q.x, q.y, (fig.startX + q.x) / 2, (fig.startY + q.y) / 2));
                    }
                    else {
                        fig.add(new go.PathSegment(go.PathSegment.QuadraticBezier, q.x, q.y, (lastseg.endX + q.x) / 2, (lastseg.endY + q.y) / 2));
                    }
                }
                else {
                    fig.add(new go.PathSegment(go.PathSegment.Line, q.x, q.y));
                }
            }
        }
        shape.geometry = geo;
    }
    /**
     * @hidden @internal
     * This internal method changes the last segment of the geometry of the {@link #temporaryShape} to end at the given point.
     */
    moveLastPoint(p) {
        p = this.modifyPointForGrid(p);
        const diagram = this.diagram;
        // must copy whole Geometry in order to change a PathSegment
        const shape = this.temporaryShape;
        if (shape.geometry === null)
            return;
        const geo = shape.geometry.copy();
        const fig = geo.figures.first();
        if (fig === null)
            return;
        const segs = fig.segments;
        if (segs.count > 0) {
            // for the temporary Shape, normalize the geometry to be in the viewport
            const viewpt = diagram.viewportBounds.position;
            const seg = segs.elt(segs.count - 1);
            // modify the last PathSegment to be the given Point p
            seg.endX = p.x - viewpt.x;
            seg.endY = p.y - viewpt.y;
            if (seg.type === go.PathSegment.QuadraticBezier) {
                let prevx = 0.0;
                let prevy = 0.0;
                if (segs.count > 1) {
                    const prevseg = segs.elt(segs.count - 2);
                    prevx = prevseg.endX;
                    prevy = prevseg.endY;
                }
                else {
                    prevx = fig.startX;
                    prevy = fig.startY;
                }
                seg.point1X = (seg.endX + prevx) / 2;
                seg.point1Y = (seg.endY + prevy) / 2;
            }
            shape.geometry = geo;
        }
    }
    /**
     * @hidden @internal
     * This internal method removes the last segment of the geometry of the {@link #temporaryShape}.
     */
    removeLastPoint() {
        // must copy whole Geometry in order to remove a PathSegment
        const shape = this.temporaryShape;
        if (shape.geometry === null)
            return;
        const geo = shape.geometry.copy();
        const fig = geo.figures.first();
        if (fig === null)
            return;
        const segs = fig.segments;
        if (segs.count > 0) {
            segs.removeAt(segs.count - 1);
            shape.geometry = geo;
        }
    }
    /**
     * Add a new node data JavaScript object to the model and initialize the Part's
     * position and its Shape's geometry by copying the {@link #temporaryShape}'s {@link Shape#geometry}.
     */
    finishShape() {
        const diagram = this.diagram;
        const shape = this.temporaryShape;
        if (shape !== null && this.archetypePartData !== null) {
            // remove the temporary point, which is last, except on touch devices
            if (!diagram.lastInput.isTouchEvent)
                this.removeLastPoint();
            const tempgeo = shape.geometry;
            // require 3 points (2 segments) if polygon; 2 points (1 segment) if polyline
            if (tempgeo !== null) {
                const tempfig = tempgeo.figures.first();
                if (tempfig !== null && tempfig.segments.count >= (this.isPolygon ? 2 : 1)) {
                    // normalize geometry and node position
                    const viewpt = diagram.viewportBounds.position;
                    const copygeo = tempgeo.copy();
                    const copyfig = copygeo.figures.first();
                    if (this.isPolygon && copyfig !== null) {
                        // if polygon, close the last segment
                        const segs = copyfig.segments;
                        const seg = segs.elt(segs.count - 1);
                        seg.isClosed = true;
                    }
                    // create the node data for the model
                    const d = diagram.model.copyNodeData(this.archetypePartData);
                    if (d !== null) {
                        // adding data to model creates the actual Part
                        diagram.model.addNodeData(d);
                        const part = diagram.findPartForData(d);
                        if (part !== null) {
                            // assign the position for the whole Part
                            const pos = copygeo.normalize();
                            pos.x = viewpt.x - pos.x - shape.strokeWidth / 2;
                            pos.y = viewpt.y - pos.y - shape.strokeWidth / 2;
                            part.position = pos;
                            // assign the Shape.geometry
                            const pShape = part.findObject('SHAPE');
                            if (pShape !== null)
                                pShape.geometry = copygeo;
                            this.transactionResult = this.name;
                        }
                    }
                }
            }
        }
        this.stopTool();
    }
    /**
     * Add another point to the geometry of the {@link #temporaryShape}.
     */
    doMouseDown() {
        const diagram = this.diagram;
        if (!this.isActive) {
            this.doActivate();
        }
        // a new temporary end point, the previous one is now "accepted"
        this.addPoint(diagram.lastInput.documentPoint);
        if (!diagram.lastInput.left) { // e.g. right mouse down
            this.finishShape();
        }
        else if (diagram.lastInput.clickCount > 1) { // e.g. double-click
            this.removeLastPoint();
            this.finishShape();
        }
    }
    /**
     * Move the last point of the {@link #temporaryShape}'s geometry to follow the mouse point.
     */
    doMouseMove() {
        const diagram = this.diagram;
        if (this.isActive) {
            this.moveLastPoint(diagram.lastInput.documentPoint);
        }
    }
    /**
     * Do not stop this tool, but continue to accumulate Points via mouse-down events.
     */
    doMouseUp() {
        // don't stop this tool (the default behavior is to call stopTool)
    }
    /**
     * Typing the "ENTER" key accepts the current geometry (excluding the current mouse point)
     * and creates a new part in the model by calling {@link #finishShape}.
     *
     * Typing the "Z" key causes the previous point to be discarded.
     *
     * Typing the "ESCAPE" key causes the temporary Shape and its geometry to be discarded and this tool to be stopped.
     */
    doKeyDown() {
        const diagram = this.diagram;
        if (!this.isActive)
            return;
        const e = diagram.lastInput;
        if (e.key === '\r') { // accept
            this.finishShape(); // all done!
        }
        else if (e.key === 'Z') { // undo
            this.undo();
        }
        else {
            super.doKeyDown();
        }
    }
    /**
     * Undo: remove the last point and continue the drawing of new points.
     */
    undo() {
        const diagram = this.diagram;
        // remove a point, and then treat the last one as a temporary one
        this.removeLastPoint();
        const lastInput = diagram.lastInput;
        if (lastInput.event instanceof MouseEvent)
            this.moveLastPoint(lastInput.documentPoint);
    }
}
