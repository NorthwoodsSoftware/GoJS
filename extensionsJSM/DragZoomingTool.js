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
import * as go from '../release/go-module.js';
/**
 * The DragZoomingTool lets the user zoom into a diagram by stretching a box
 * to indicate the new contents of the diagram's viewport (the area of the
 * model shown by the Diagram).
 * Hold down the Shift key in order to zoom out.
 *
 * The default drag selection box is a magenta rectangle.
 * You can modify the {@link #box} to customize its appearance.
 *
 * The diagram that is zoomed by this tool is specified by the {@link #zoomedDiagram} property.
 * If the value is null, the tool zooms its own {@link Tool#diagram}.
 *
 * You can use this tool in a modal manner by executing:
 * ```js
 *   diagram.currentTool = new DragZoomingTool();
 * ```
 *
 * Use this tool in a mode-less manner by executing:
 * ```js
 *   myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragZoomingTool());
 * ```
 *
 * However when used mode-lessly as a mouse-move tool, in {@link ToolManager#mouseMoveTools},
 * this cannot start running unless there has been a motionless delay
 * after the mouse-down event of at least {@link #delay} milliseconds.
 *
 * This tool does not utilize any {@link Adornment}s or tool handles,
 * but it does temporarily add the {@link #box} part to the diagram.
 * This tool does not modify the model or conduct any transaction.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/DragZooming.html">Drag Zooming</a> sample.
 * @category Tool Extension
 */
export class DragZoomingTool extends go.Tool {
    /**
     * Constructs a DragZoomingTool, sets {@link #box} to a magenta rectangle, and sets name of the tool.
     */
    constructor() {
        super();
        this._delay = 175;
        this._zoomedDiagram = null;
        const b = new go.Part();
        const r = new go.Shape();
        b.layerName = 'Tool';
        b.selectable = false;
        r.name = 'SHAPE';
        r.figure = 'Rectangle';
        r.fill = null;
        r.stroke = 'magenta';
        r.position = new go.Point(0, 0);
        b.add(r);
        this._box = b;
        this.name = 'DragZooming';
    }
    /**
     * Gets or sets the {@link Part} used as the "rubber-band zoom box"
     * that is stretched to follow the mouse, as feedback for what area will
     * be passed to {@link #zoomToRect} upon a mouse-up.
     *
     * Initially this is a {@link Part} containing only a simple magenta rectangular {@link Shape}.
     * The object to be resized should be named "SHAPE".
     * Setting this property does not raise any events.
     *
     * Modifying this property while this tool {@link Tool#isActive} might have no effect.
     */
    get box() { return this._box; }
    set box(val) { this._box = val; }
    /**
     * Gets or sets the time in milliseconds for which the mouse must be stationary
     * before this tool can be started.
     *
     * The default value is 175 milliseconds.
     * Setting this property does not raise any events.
     */
    get delay() { return this._delay; }
    set delay(val) { this._delay = val; }
    /**
     * Gets or sets the {@link Diagram} whose {@link Diagram#position} and {@link Diagram#scale}
     * should be set to display the drawn {@link #box} rectangular bounds.
     *
     * The default value is null, which causes {@link #zoomToRect} to modify this tool's {@link Tool#diagram}.
     * Setting this property does not raise any events.
     */
    get zoomedDiagram() { return this._zoomedDiagram; }
    set zoomedDiagram(val) { this._zoomedDiagram = val; }
    /**
     * This tool can run when there has been a mouse-drag, far enough away not to be a click,
     * and there has been delay of at least {@link #delay} milliseconds
     * after the mouse-down before a mouse-move.
     */
    canStart() {
        if (!this.isEnabled)
            return false;
        const diagram = this.diagram;
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
        }
        return true;
    }
    /**
     * Capture the mouse and show the {@link #box}.
     */
    doActivate() {
        const diagram = this.diagram;
        this.isActive = true;
        diagram.isMouseCaptured = true;
        diagram.skipsUndoManager = true;
        diagram.add(this.box);
        this.doMouseMove();
    }
    /**
     * Release the mouse and remove any {@link #box}.
     */
    doDeactivate() {
        const diagram = this.diagram;
        diagram.remove(this.box);
        diagram.skipsUndoManager = false;
        diagram.isMouseCaptured = false;
        this.isActive = false;
    }
    /**
     * Update the {@link #box}'s position and size according to the value
     * of {@link #computeBoxBounds}.
     */
    doMouseMove() {
        const diagram = this.diagram;
        if (this.isActive && this.box !== null) {
            const r = this.computeBoxBounds();
            let shape = this.box.findObject('SHAPE');
            if (shape === null)
                shape = this.box.findMainElement();
            if (shape !== null)
                shape.desiredSize = r.size;
            this.box.position = r.position;
        }
    }
    /**
     * Call {@link #zoomToRect} with the value of a call to {@link #computeBoxBounds}.
     */
    doMouseUp() {
        if (this.isActive) {
            const diagram = this.diagram;
            diagram.remove(this.box);
            try {
                diagram.currentCursor = 'wait';
                this.zoomToRect(this.computeBoxBounds());
            }
            finally {
                diagram.currentCursor = '';
            }
        }
        this.stopTool();
    }
    /**
     * This just returns a {@link Rect} stretching from the mouse-down point to the current mouse point
     * while maintaining the aspect ratio of the {@link #zoomedDiagram}.
     * @return {Rect} a {@link Rect} in document coordinates.
     */
    computeBoxBounds() {
        const diagram = this.diagram;
        const start = diagram.firstInput.documentPoint;
        const latest = diagram.lastInput.documentPoint;
        const adx = latest.x - start.x;
        const ady = latest.y - start.y;
        let observed = this.zoomedDiagram;
        if (observed === null)
            observed = diagram;
        if (observed === null) {
            return new go.Rect(start, latest);
        }
        const vrect = observed.viewportBounds;
        if (vrect.height === 0 || ady === 0) {
            return new go.Rect(start, latest);
        }
        const vratio = vrect.width / vrect.height;
        let lx;
        let ly;
        if (Math.abs(adx / ady) < vratio) {
            lx = start.x + adx;
            ly = start.y + Math.ceil(Math.abs(adx) / vratio) * (ady < 0 ? -1 : 1);
        }
        else {
            lx = start.x + Math.ceil(Math.abs(ady) * vratio) * (adx < 0 ? -1 : 1);
            ly = start.y + ady;
        }
        return new go.Rect(start, new go.Point(lx, ly));
    }
    /**
     * This method is called to change the {@link #zoomedDiagram}'s viewport to match the given rectangle.
     * @param {Rect} r a rectangular bounds in document coordinates.
     */
    zoomToRect(r) {
        if (r.width < 0.1)
            return;
        const diagram = this.diagram;
        let observed = this.zoomedDiagram;
        if (observed === null)
            observed = diagram;
        if (observed === null)
            return;
        // zoom out when using the Shift modifier
        if (diagram.lastInput.shift) {
            observed.scale = Math.max(observed.scale * r.width / observed.viewportBounds.width, observed.minScale);
            observed.centerRect(r);
        }
        else {
            // do scale first, so the Diagram's position normalization isn't constrained unduly when increasing scale
            observed.scale = Math.min(observed.viewportBounds.width * observed.scale / r.width, observed.maxScale);
            observed.position = new go.Point(r.x, r.y);
        }
    }
}
