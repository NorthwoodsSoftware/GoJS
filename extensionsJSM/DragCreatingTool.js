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
import * as go from '../release/go-module.js';
/**
 * The DragCreatingTool lets the user create a new node by dragging in the background
 * to indicate its size and position.
 *
 * The default drag selection box is a magenta rectangle.
 * You can modify the {@link #box} to customize its appearance.
 *
 * This tool will not be able to start running unless you have set the
 * {@link #archetypeNodeData} property to an object that can be copied and added to the diagram's model.
 *
 * You can use this tool in a modal manner by executing:
 * ```js
 *   diagram.currentTool = new DragCreatingTool();
 * ```
 *
 * Use this tool in a mode-less manner by executing:
 * ```js
 *   myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragCreatingTool());
 * ```
 *
 * However when used mode-lessly as a mouse-move tool, in {@link ToolManager#mouseMoveTools},
 * this cannot start running unless there has been a motionless delay
 * after the mouse-down event of at least {@link #delay} milliseconds.
 *
 * This tool does not utilize any {@link Adornment}s or tool handles,
 * but it does temporarily add the {@link #box} Part to the diagram.
 * This tool does conduct a transaction when inserting the new node.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/DragCreating.html">Drag Creating</a> sample.
 * @category Tool Extension
 */
export class DragCreatingTool extends go.Tool {
    /**
     * Constructs a DragCreatingTool, sets {@link #box} to a magenta rectangle, and sets name of the tool.
     */
    constructor() {
        super();
        this._archetypeNodeData = null;
        this._delay = 175;
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
        this.name = 'DragCreating';
    }
    /**
     * Gets or sets the {@link Part} used as the "rubber-band box"
     * that is stretched to follow the mouse, as feedback for what area will
     * be passed to {@link #insertPart} upon a mouse-up.
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
     * A value of zero will allow this tool to run without any wait after the mouse down.
     * Setting this property does not raise any events.
     */
    get delay() { return this._delay; }
    set delay(val) { this._delay = val; }
    /**
     * Gets or sets a data object that will be copied and added to the diagram's model each time this tool executes.
     *
     * The default value is null.
     * The value must be non-null for this tool to be able to run.
     * Setting this property does not raise any events.
     */
    get archetypeNodeData() { return this._archetypeNodeData; }
    set archetypeNodeData(val) { this._archetypeNodeData = val; }
    /**
     * This tool can run when there has been a mouse-drag, far enough away not to be a click,
     * and there has been delay of at least {@link #delay} milliseconds
     * after the mouse-down before a mouse-move.
     */
    canStart() {
        if (!this.isEnabled)
            return false;
        // gotta have some node data that can be copied
        if (this.archetypeNodeData === null)
            return false;
        const diagram = this.diagram;
        // heed IsReadOnly & AllowInsert
        if (diagram.isReadOnly || diagram.isModelReadOnly)
            return false;
        if (!diagram.allowInsert)
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
        diagram.add(this.box);
        this.doMouseMove();
    }
    /**
     * Release the mouse and remove any {@link #box}.
     */
    doDeactivate() {
        const diagram = this.diagram;
        diagram.remove(this.box);
        diagram.isMouseCaptured = false;
        this.isActive = false;
    }
    /**
     * Update the {@link #box}'s position and size according to the value
     * of {@link #computeBoxBounds}.
     */
    doMouseMove() {
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
     * Call {@link #insertPart} with the value of a call to {@link #computeBoxBounds}.
     */
    doMouseUp() {
        if (this.isActive) {
            const diagram = this.diagram;
            diagram.remove(this.box);
            try {
                diagram.currentCursor = 'wait';
                this.insertPart(this.computeBoxBounds());
            }
            finally {
                diagram.currentCursor = '';
            }
        }
        this.stopTool();
    }
    /**
     * This just returns a {@link Rect} stretching from the mouse-down point to the current mouse point.
     * @return {Rect} a {@link Rect} in document coordinates.
     */
    computeBoxBounds() {
        const diagram = this.diagram;
        const start = diagram.firstInput.documentPoint;
        const latest = diagram.lastInput.documentPoint;
        return new go.Rect(start, latest);
    }
    /**
     * Create a node by adding a copy of the {@link #archetypeNodeData} object
     * to the diagram's model, assign its {@link GraphObject#position} and {@link GraphObject#desiredSize}
     * according to the given bounds, and select the new part.
     *
     * The actual part that is added to the diagram may be a {@link Part}, a {@link Node},
     * or even a {@link Group}, depending on the properties of the {@link #archetypeNodeData}
     * and the type of the template that is copied to create the part.
     * @param {Rect} bounds a Point in document coordinates.
     * @return {Part} the newly created Part, or null if it failed.
     */
    insertPart(bounds) {
        const diagram = this.diagram;
        const arch = this.archetypeNodeData;
        if (arch === null)
            return null;
        diagram.raiseDiagramEvent('ChangingSelection', diagram.selection);
        this.startTransaction(this.name);
        let part = null;
        if (arch !== null) {
            const data = diagram.model.copyNodeData(arch);
            if (data) {
                diagram.model.addNodeData(data);
                part = diagram.findPartForData(data);
            }
        }
        if (part !== null) {
            part.position = bounds.position;
            part.resizeObject.desiredSize = bounds.size;
            if (diagram.allowSelect) {
                diagram.clearSelection();
                part.isSelected = true;
            }
        }
        // set the TransactionResult before raising event, in case it changes the result or cancels the tool
        this.transactionResult = this.name;
        this.stopTransaction();
        diagram.raiseDiagramEvent('ChangedSelection', diagram.selection);
        return part;
    }
}
