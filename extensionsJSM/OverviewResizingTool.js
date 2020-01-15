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
 * The OverviewResizingTool class lets the user resize the box within an overview.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/OverviewResizing.html">Overview Resizing</a> sample.
 * @category Tool Extension
 */
export class OverviewResizingTool extends go.ResizingTool {
    /**
     * Constructs an OverviewResizingTool and sets the name for the tool.
     */
    constructor() {
        super();
        this.name = 'OverviewResizing';
        this._handleSize = new go.Size(6, 6);
    }
    /**
     * @hidden @internal
     * @param {Shape} resizeBox
     * @return {Adornment}
     */
    makeAdornment(resizeBox) {
        this._handleSize.setTo(resizeBox.strokeWidth * 3, resizeBox.strokeWidth * 3);
        // Set up the resize adornment
        const ad = new go.Adornment();
        ad.type = go.Panel.Spot;
        ad.locationSpot = go.Spot.Center;
        const ph = new go.Placeholder();
        ph.isPanelMain = true;
        ad.add(ph);
        const hnd = new go.Shape();
        hnd.name = 'RSZHND';
        hnd.figure = 'Rectangle';
        hnd.desiredSize = this._handleSize;
        hnd.cursor = 'se-resize';
        hnd.alignment = go.Spot.BottomRight;
        hnd.alignmentFocus = go.Spot.Center;
        ad.add(hnd);
        ad.adornedObject = resizeBox;
        return ad;
    }
    /**
     * @hidden @internal
     * Keep the resize handle properly sized as the scale is changing.
     * This overrides an undocumented method on the ResizingTool.
     * @param {Adornment} elt
     * @param {number} angle
     */
    updateResizeHandles(elt, angle) {
        if (elt === null)
            return;
        const handle = elt.findObject('RSZHND');
        const box = elt.adornedObject;
        this._handleSize.setTo(box.strokeWidth * 3, box.strokeWidth * 3);
        handle.desiredSize = this._handleSize;
    }
    /**
     * Overrides {@link ResizingTool#resize} to resize the overview box via setting the observed diagram's scale.
     * @param {Rect} newr the intended new rectangular bounds the overview box.
     */
    resize(newr) {
        const overview = this.diagram;
        const observed = overview.observed;
        if (observed === null)
            return;
        const oldr = observed.viewportBounds.copy();
        const oldscale = observed.scale;
        if (oldr.width !== newr.width || oldr.height !== newr.height) {
            if (newr.width > 0 && newr.height > 0) {
                observed.scale = Math.min(oldscale * oldr.width / newr.width, oldscale * oldr.height / newr.height);
            }
        }
    }
}
