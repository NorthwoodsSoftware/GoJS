/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/RescalingTool.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

// A custom Tool to change the scale of an object in a Part.
/**
 * A custom tool for rescaling an object.
 *
 * Install the RescalingTool as a mouse-down tool by calling:
 * myDiagram.toolManager.mouseDownTools.add(new RescalingTool());
 *
 * Normally it would not make sense for the same object to be both resizable and rescalable.
 *
 * Note that there is no <code>Part.rescaleObjectName</code> property and there is no <code>Part.rescalable</code> property.
 * So although you cannot customize any Node to affect this tool, you can set
 * <a>RescalingTool.rescaleObjectName</a> and set <a>RescalingTool.isEnabled</a> to control
 * whether objects are rescalable and when.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/Rescaling.html">Rescaling</a> sample.
 * @category Tool Extension
 */
class RescalingTool extends go.Tool {
    constructor(init) {
        super();
        this.name = 'Rescaling';
        this._rescaleObjectName = '';
        this._handleArchetype =
            new go.Shape({
                alignment: go.Spot.BottomRight,
                width: 8, height: 8,
                fill: 'lightblue', stroke: 'dodgerblue',
                cursor: 'nwse-resize'
            });
        this._adornmentTemplate =
            new go.Adornment(go.Panel.Spot)
                .add(new go.Placeholder(), this._handleArchetype)
                .freezeBindings();
        // internal state
        this._adornedObject = null;
        this._handle = null;
        this.originalPoint = new go.Point();
        this.originalTopLeft = new go.Point();
        this.originalScale = 1.0;
        if (init)
            Object.assign(this, init);
    }
    /**
     * Gets the {@link go.GraphObject} that is being rescaled.
     * This may be the same object as the selected {@link go.Part} or it may be contained within that Part.
     *
     * This property is also settable, but should only be set when overriding functions
     * in RescalingTool, and not during normal operation.
     */
    get adornedObject() {
        return this._adornedObject;
    }
    set adornedObject(val) {
        this._adornedObject = val;
    }
    /**
     * Gets or sets a small GraphObject that is copied as a rescale handle for the selected part.
     * By default this is a {@link go.Shape} that is a small blue square.
     * Setting this property does not raise any events.
     *
     * Here is an example of changing the default handle to be green "X":
     * ```js
     *   tool.handleArchetype =
     *     new go.Shape("XLine",
     *       { width: 8, height: 8, stroke: "green", fill: "transparent" })
     * ```
     */
    get handleArchetype() { return this._handleArchetype; }
    set handleArchetype(val) {
        if (!(val instanceof go.GraphObject))
            return;
        this._handleArchetype = val;
        this._adornmentTemplate =
            new go.Adornment(go.Panel.Spot)
                .add(new go.Placeholder(), val)
                .freezeBindings();
    }
    /**
     * This property returns the {@link go.GraphObject} that is the tool handle being dragged by the user.
     * This will be contained by an {@link go.Adornment} whose category is "RescalingTool".
     * Its {@link go.Adornment.adornedObject} is the same as the {@link adornedObject}.
     *
     * This property is also settable, but should only be set either within an override of {@link doActivate}
     * or prior to calling {@link doActivate}.
     */
    get handle() {
        return this._handle;
    }
    set handle(val) {
        this._handle = val;
    }
    /**
     * This property returns the name of the GraphObject that identifies the object to be rescaled by this tool.
     *
     * The default value is the empty string, resulting in the whole Node being rescaled.
     * This property is used by findRescaleObject when calling {@link go.Panel.findObject}.
     */
    get rescaleObjectName() {
        return this._rescaleObjectName;
    }
    set rescaleObjectName(val) {
        this._rescaleObjectName = val;
    }
    /**
     * @param part
     */
    updateAdornments(part) {
        if (part === null || part instanceof go.Link)
            return;
        if (part.isSelected && !this.diagram.isReadOnly) {
            const rescaleObj = this.findRescaleObject(part);
            if (rescaleObj !== null &&
                part.actualBounds.isReal() &&
                part.isVisible() &&
                rescaleObj.actualBounds.isReal() &&
                rescaleObj.isVisibleObject()) {
                let adornment = part.findAdornment(this.name);
                if (adornment === null || adornment.adornedObject !== rescaleObj) {
                    adornment = this.makeAdornment(rescaleObj);
                }
                if (adornment !== null) {
                    adornment.location = rescaleObj.getDocumentPoint(go.Spot.BottomRight);
                    part.addAdornment(this.name, adornment);
                    return;
                }
            }
        }
        part.removeAdornment(this.name);
    }
    /**
     * @param rescaleObj
     */
    makeAdornment(rescaleObj) {
        const adornment = this._adornmentTemplate.copy();
        adornment.adornedObject = rescaleObj;
        return adornment;
    }
    /**
     * Return the GraphObject to be rescaled by the user.
     */
    findRescaleObject(part) {
        const obj = part.findObject(this.rescaleObjectName);
        if (obj)
            return obj;
        return part;
    }
    /**
     * This tool can start running if the mouse-down happens on a "Rescaling" handle.
     */
    canStart() {
        const diagram = this.diagram;
        if (diagram === null || diagram.isReadOnly)
            return false;
        if (!diagram.lastInput.left)
            return false;
        const h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
        return h !== null;
    }
    /**
     * Activating this tool remembers the {@link handle} that was dragged,
     * the {@link adornedObject} that is being rescaled,
     * starts a transaction, and captures the mouse.
     */
    doActivate() {
        const diagram = this.diagram;
        if (diagram === null)
            return;
        this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
        if (this._handle === null)
            return;
        const ad = this._handle.part;
        this._adornedObject = ad instanceof go.Adornment ? ad.adornedObject : null;
        if (!this._adornedObject)
            return;
        this.originalPoint = this._handle.getDocumentPoint(go.Spot.Center);
        this.originalTopLeft = this._adornedObject.getDocumentPoint(go.Spot.TopLeft);
        this.originalScale = this._adornedObject.scale;
        diagram.isMouseCaptured = true;
        diagram.delaysLayout = true;
        this.startTransaction(this.name);
        this.isActive = true;
    }
    /**
     * Stop the current transaction, forget the {@link handle} and {@link adornedObject}, and release the mouse.
     */
    doDeactivate() {
        const diagram = this.diagram;
        if (diagram === null)
            return;
        this.stopTransaction();
        this._handle = null;
        this._adornedObject = null;
        diagram.isMouseCaptured = false;
        this.isActive = false;
    }
    /**
     * Restore the original {@link go.GraphObject.scale} of the adorned object.
     */
    doCancel() {
        const diagram = this.diagram;
        if (diagram !== null)
            diagram.delaysLayout = false;
        this.scale(this.originalScale);
        this.stopTool();
    }
    /**
     * Call {@link scale} with a new scale determined by the current mouse point.
     * This determines the new scale by calling {@link computeScale}.
     */
    doMouseMove() {
        const diagram = this.diagram;
        if (this.isActive && diagram !== null) {
            const newScale = this.computeScale(diagram.lastInput.documentPoint);
            this.scale(newScale);
        }
    }
    /**
     * Call {@link scale} with a new scale determined by the most recent mouse point,
     * and commit the transaction.
     */
    doMouseUp() {
        const diagram = this.diagram;
        if (this.isActive && diagram !== null) {
            diagram.delaysLayout = false;
            const newScale = this.computeScale(diagram.lastInput.documentPoint);
            this.scale(newScale);
            this.transactionResult = this.name;
        }
        this.stopTool();
    }
    /**
     * Set the {@link go.GraphObject.scale} of the {@link findRescaleObject}.
     * @param newScale
     */
    scale(newScale) {
        if (this._adornedObject !== null) {
            this._adornedObject.scale = newScale;
        }
    }
    /**
     * Compute the new scale given a point.
     *
     * This method is called by both {@link doMouseMove} and {@link doMouseUp}.
     * This method may be overridden.
     * Please read the Introduction page on <a href="../../intro/extensions.html">Extensions</a> for how to override methods and how to call this base method.
     * @param newPoint - in document coordinates
     */
    computeScale(newPoint) {
        const scale = this.originalScale;
        const origdist = Math.sqrt(this.originalPoint.distanceSquaredPoint(this.originalTopLeft));
        const newdist = Math.sqrt(newPoint.distanceSquaredPoint(this.originalTopLeft));
        return scale * (newdist / origdist);
    }
}
