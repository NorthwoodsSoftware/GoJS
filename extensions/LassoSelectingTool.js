/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/GuidedDraggingTool.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

/**
 * This replacement for the <a>DragSelectingTool</a> operates similarly but instead of drawing a rectangular area
 * where Parts may be selected, follows the mouse to draw a polygon.
 *
 * Instead of the <a>DragSelectingTool.box</a> this tool has the <a>LassoSelectingTool.shape</a>
 * whose <a>Shape.fill</a> and <a>Shape.stroke</a> may be styled.
 *
 * Install by replacing the <a>CommandHandler.dragSelectingTool</a>.  For example:
 * ```js
 * new go.Diagram("myDiagramDiv", {
 *   dragSelectingTool: new LassoSelectingTool(),
 *   . . .
 * })
 * ```
 *
 * @category Tool Extension
 */
class LassoSelectingTool extends go.Tool {
    constructor(init) {
        super();
        // this is the Shape that is shown during a drawing operation
        this._shape = new go.Shape({ name: 'SHAPE', fill: "rgba(256,0,256,0.1)", stroke: "magenta", strokeWidth: 1.5 });
        // the Shape has to be inside a temporary Part that is used during the drawing operation
        new go.Part({ layerName: 'Tool', selectable: false }).add(this._shape);
        this._delay = 175;
        this.name = 'LassoSelecting';
        if (init)
            Object.assign(this, init);
    }
    /**
     * Gets or sets the Shape that is used to hold the line as it is being drawn.
     *
     * The default value is a simple Shape drawing a translucent polygon.
     * The shape may not be null.
     */
    get shape() { return this._shape; }
    set shape(val) {
        if (this._shape !== val && val !== null) {
            val.name = 'SHAPE';
            const panel = this._shape.panel;
            if (panel !== null) {
                panel.remove(this._shape);
                this._shape = val;
                panel.add(this._shape);
            }
        }
    }
    /**
     * Gets or sets the time in milliseconds for which the mouse must be stationary
     * before this tool can be started.
     * The default value is 175 milliseconds.
     * Setting this property does not raise any events.
     */
    get delay() { return this._delay; }
    set delay(value) { this._delay = value; }
    /**
     */
    canStart() {
        if (!this.isEnabled)
            return false;
        const diagram = this.diagram;
        if (!diagram.allowSelect)
            return false;
        const e = diagram.lastInput;
        // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
        if (!e.left)
            return false;
        // don't include the following checks when this tool is running modally
        if (diagram.currentTool !== this) {
            if (!this.isBeyondDragSize())
                return false;
            // must wait for "delay" milliseconds before that tool can run
            if (e.timestamp - diagram.firstInput.timestamp < this.delay)
                return false;
            // don't start if we're over a selectable part
            if (diagram.findPartAt(e.documentPoint, true) !== null)
                return false;
        }
        return true;
    }
    /**
     * Capture the mouse and use a "crosshair" cursor.
     */
    doActivate() {
        super.doActivate();
        this.diagram.isMouseCaptured = true;
        this.diagram.currentCursor = 'crosshair';
    }
    /**
     * Release the mouse and reset the cursor.
     */
    doDeactivate() {
        super.doDeactivate();
        if (this.shape !== null && this.shape.part !== null) {
            this.diagram.remove(this.shape.part);
        }
        this.diagram.currentCursor = '';
        this.diagram.isMouseCaptured = false;
    }
    /**
     * This adds a Point to the {@link shape}'s geometry.
     *
     * If the Shape is not yet in the Diagram, its geometry is initialized and
     * its parent Part is added to the Diagram.
     *
     * If the point is less than half a pixel away from the previous point, it is ignored.
     */
    addPoint(p) {
        const shape = this.shape;
        if (shape === null)
            return;
        const part = shape.part;
        if (part === null)
            return;
        // for the temporary Shape, normalize the geometry to be in the viewport
        const viewpt = this.diagram.viewportBounds.position;
        const q = new go.Point(p.x - viewpt.x, p.y - viewpt.y);
        if (part.diagram === null) {
            const f = new go.PathFigure(q.x, q.y, true); // possibly filled, depending on Shape.fill
            const g = new go.Geometry().add(f); // the Shape.geometry consists of a single PathFigure
            shape.geometry = g;
            // position the Shape's Part, accounting for the strokeWidth
            part.moveTo(viewpt.x - shape.strokeWidth / 2, viewpt.y - shape.strokeWidth / 2);
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
                    if (Math.abs(q.x - last.endX) < 0.5 && Math.abs(q.y - last.endY) < 0.5)
                        return;
                }
                // must copy whole Geometry in order to add a PathSegment
                const geo2 = geo.copy();
                const fig2 = geo2.figures.first();
                if (fig2 !== null) {
                    fig2.add(new go.PathSegment(go.SegmentType.Line, q.x, q.y));
                    shape.geometry = geo2;
                }
            }
        }
    }
    /**
     * Start drawing the line by starting to accumulate points in the {@link shape}'s geometry.
     */
    doMouseDown() {
        if (!this.isActive) {
            this.doActivate();
            // the first point
            this.addPoint(this.diagram.lastInput.documentPoint);
        }
    }
    /**
     * Keep accumulating points in the {@link shape}'s geometry.
     */
    doMouseMove() {
        if (this.isActive) {
            this.addPoint(this.diagram.lastInput.documentPoint);
        }
    }
    /**
     * Finish drawing the line by selecting Parts whose {@link Part.selectionObject} is within the drawn polygon.
     */
    doMouseUp() {
        var _a;
        const diagram = this.diagram;
        if (this.isActive) {
            try {
                // the last point
                this.addPoint(diagram.lastInput.documentPoint);
                // normalize geometry and node position
                (_a = this.shape.part) === null || _a === void 0 ? void 0 : _a.ensureBounds();
                diagram.currentCursor = 'wait';
                diagram.raiseDiagramEvent('ChangingSelection', diagram.selection);
                this.selectInShape(this.shape);
                diagram.raiseDiagramEvent('ChangedSelection', diagram.selection);
            }
            finally {
                diagram.currentCursor = '';
            }
        }
        this.stopTool();
    }
    /**
     * Modify the diagram's selection according to whether a Part is within the given Shape.
     * This is called from {@link doMouseUp}.
     *
     * This method may be overridden.
     * @virtual
     * @param shp normally this will be {@link shape}
     */
    selectInShape(shp) {
        var _a;
        const diagram = this.diagram;
        if (!diagram || ((_a = shp.part) === null || _a === void 0 ? void 0 : _a.diagram) !== diagram)
            return;
        const e = diagram.lastInput;
        const temp = new go.Rect();
        const parts = diagram.findPartsIn(shp.part.actualBounds, false /*this.isPartialInclusion*/);
        if (e.meta || e.control) { // toggle or deselect
            if (e.shift) { // deselect only
                const it = parts.iterator;
                while (it.next()) {
                    const p = it.value;
                    p.selectionObject.getDocumentBounds(temp);
                    if (p.isSelected && shp.polygonContainsRect(temp))
                        p.isSelected = false;
                }
            }
            else { // toggle selectedness of parts
                const it = parts.iterator;
                while (it.next()) {
                    const tp = it.value;
                    tp.selectionObject.getDocumentBounds(temp);
                    if (shp.polygonContainsRect(temp))
                        tp.isSelected = !tp.isSelected;
                }
            }
        }
        else if (e.shift) { // extend selection only
            const it = parts.iterator;
            while (it.next()) {
                const ep = it.value;
                ep.selectionObject.getDocumentBounds(temp);
                if (!ep.isSelected && shp.polygonContainsRect(temp))
                    ep.isSelected = true;
            }
        }
        else { // select parts, and unselect all other previously selected parts
            // this tries to avoid deselecting and then reselecting any Part
            const tounselect = new go.List();
            const sit = diagram.selection.iterator;
            while (sit.next()) {
                const sp = sit.value;
                if (!parts.has(sp))
                    tounselect.add(sp);
            }
            const uit = tounselect.iterator;
            while (uit.next()) {
                const up = uit.value;
                up.isSelected = false;
            }
            const it = parts.iterator;
            while (it.next()) {
                const ps = it.value;
                ps.selectionObject.getDocumentBounds(temp);
                if (!ps.isSelected && shp.polygonContainsRect(temp))
                    ps.isSelected = true;
            }
        }
    }
}
