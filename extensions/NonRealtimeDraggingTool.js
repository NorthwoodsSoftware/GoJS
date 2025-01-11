/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/NonRealtimeDraggingTool.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

/**
 * The NonRealtimeDraggingTool class lets the user drag an image instead of actually moving any selected nodes,
 * until the mouse-up event.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/NonRealtimeDragging.html">Non Realtime Dragging</a> sample.
 * @category Tool Extension
 */
class NonRealtimeDraggingTool extends go.DraggingTool {
    constructor(init) {
        super();
        this._duration = 0;
        this._imagePart = null;
        this._ghostDraggedParts = null;
        this._originalDraggedParts = null;
        if (init)
            Object.assign(this, init);
    }
    /**
     * Gets or sets how long the movement animation should be to move the actual parts upon a mouse-up.
     * The default value is zero -- there is no animation of the movement.
     */
    get duration() {
        return this._duration;
    }
    set duration(val) {
        if (typeof val !== 'number' || isNaN(val) || val < 0)
            throw new Error('New value for NonRealtimeDraggingTool.duration must be a non-negative number.');
        this._duration = val;
    }
    /**
     * Call the base method, and then make an image of the returned collection,
     * show it using a Picture, and hold the Picture in a temporary Part, as _imagePart.
     * @param parts - A {@link go.Set} or {@link go.List} of {@link go.Part}s.
     */
    computeEffectiveCollection(parts) {
        const map = super.computeEffectiveCollection(parts, this.dragOptions);
        if (this.isActive && this._imagePart === null) {
            const bounds = this.diagram.computePartsBounds(map.toKeySet());
            const offset = this.diagram.lastInput.documentPoint.copy().subtract(bounds.position);
            this._imagePart = new go.Part({ layerName: 'Tool', opacity: 0.5, locationSpot: new go.Spot(0, 0, offset.x, offset.y) })
                .add(new go.Picture({ source: this.diagram.makeImageData({ parts: map.toKeySet() }) }));
        }
        return map;
    }
    /**
     * When activated, replace the {@link draggedParts} with the ghost dragged parts, which
     * consists of just one Part, the image, added to the Diagram at the current mouse point.
     */
    doActivate() {
        super.doActivate();
        if (this._imagePart !== null) {
            this._imagePart.location = this.diagram.lastInput.documentPoint;
            this.diagram.add(this._imagePart);
            this._originalDraggedParts = this.draggedParts;
            this._ghostDraggedParts = super.computeEffectiveCollection(new go.List().add(this._imagePart), this.dragOptions);
            this.draggedParts = this._ghostDraggedParts;
        }
    }
    /**
     * When deactivated, make sure any image is removed from the Diagram and all references are cleared out.
     */
    doDeactivate() {
        if (this._imagePart !== null) {
            this.diagram.remove(this._imagePart);
        }
        this._imagePart = null;
        this._ghostDraggedParts = null;
        this._originalDraggedParts = null;
        super.doDeactivate();
    }
    /**
     * Do the normal mouse-up behavior, but only after restoring {@link draggedParts}.
     */
    doMouseUp() {
        const partsmap = this._originalDraggedParts;
        if (partsmap !== null) {
            this.draggedParts = partsmap;
        }
        super.doMouseUp();
        if (partsmap !== null && this.duration > 0) {
            const anim = new go.Animation();
            anim.duration = this.duration;
            partsmap.each((kvp) => {
                const part = kvp.key;
                anim.add(part, 'location', kvp.value.point, part.location);
            });
            anim.start();
        }
    }
    /**
     * If the user changes to "copying" mode by holding down the Control key,
     * return to the regular behavior and remove the image.
     */
    doKeyDown() {
        if (this._imagePart !== null &&
            this._originalDraggedParts !== null &&
            (this.diagram.lastInput.control || this.diagram.lastInput.meta) &&
            this.mayCopy()) {
            this.draggedParts = this._originalDraggedParts;
            this.diagram.remove(this._imagePart);
        }
        super.doKeyDown();
    }
    /**
     * If the user changes back to "moving" mode,
     * show the image again and go back to dragging the ghost dragged parts.
     */
    doKeyUp() {
        if (this._imagePart !== null && this._ghostDraggedParts !== null && this.mayMove()) {
            this._imagePart.location = this.diagram.lastInput.documentPoint;
            this.diagram.add(this._imagePart);
            this.draggedParts = this._ghostDraggedParts;
        }
        super.doKeyUp();
    }
}
