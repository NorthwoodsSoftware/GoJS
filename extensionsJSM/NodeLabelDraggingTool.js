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
 * The NodeLabelDraggingTool class lets the user move a label on a Node.
 *
 * This tool only works when the Node has a label (any GraphObject) marked with
 * { _isNodeLabel: true } that is positioned in a Spot Panel.
 * It works by modifying that label's {@link GraphObject#alignment} property to have an
 * offset from the center of the panel.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/NodeLabelDragging.html">Node Label Dragging</a> sample.
 * @category Tool Extension
 */
export class NodeLabelDraggingTool extends go.Tool {
    /**
     * Constructs a NodeLabelDraggingTool and sets the name for the tool.
     */
    constructor() {
        super();
        /**
         * The label being dragged.
         */
        this.label = null;
        this._offset = new go.Point(); // of the mouse relative to the center of the label object
        this._originalAlignment = go.Spot.Default;
        this._originalCenter = new go.Point();
        this.name = 'NodeLabelDragging';
    }
    /**
     * From the GraphObject at the mouse point, search up the visual tree until we get to
     * an object that has the "_isNodeLabel" property set to true, that is in a Spot Panel,
     * and that is not the first element of that Panel (i.e. not the main element of the panel).
     * @return {GraphObject} This returns null if no such label is at the mouse down point.
     */
    findLabel() {
        const diagram = this.diagram;
        const e = diagram.firstInput;
        let elt = diagram.findObjectAt(e.documentPoint, null, null);
        if (elt === null || !(elt.part instanceof go.Node))
            return null;
        while (elt.panel !== null) {
            if (elt['_isNodeLabel'] && elt.panel.type === go.Panel.Spot && elt.panel.findMainElement() !== elt)
                return elt;
            elt = elt.panel;
        }
        return null;
    }
    /**
     * This tool can only start if the mouse has moved enough so that it is not a click,
     * and if the mouse down point is on a GraphObject "label" in a Spot Panel,
     * as determined by findLabel().
     */
    canStart() {
        if (!super.canStart())
            return false;
        const diagram = this.diagram;
        // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
        const e = diagram.lastInput;
        if (!e.left)
            return false;
        if (!this.isBeyondDragSize())
            return false;
        return this.findLabel() !== null;
    }
    /**
     * Start a transaction, call {@link findLabel} and remember it as the "label" property,
     * and remember the original value for the label's {@link GraphObject#alignment} property.
     */
    doActivate() {
        this.startTransaction('Shifted Label');
        this.label = this.findLabel();
        if (this.label !== null) {
            // compute the offset of the mouse-down point relative to the center of the label
            this._offset = this.diagram.firstInput.documentPoint.copy().subtract(this.label.getDocumentPoint(go.Spot.Center));
            this._originalAlignment = this.label.alignment.copy();
            const panel = this.label.panel;
            if (panel !== null) {
                const main = panel.findMainElement();
                if (main !== null)
                    this._originalCenter = main.getDocumentPoint(go.Spot.Center);
            }
        }
        super.doActivate();
    }
    /**
     * Stop any ongoing transaction.
     */
    doDeactivate() {
        super.doDeactivate();
        this.stopTransaction();
    }
    /**
     * Clear any reference to a label element.
     */
    doStop() {
        this.label = null;
        super.doStop();
    }
    /**
     * Restore the label's original value for GraphObject.alignment.
     */
    doCancel() {
        if (this.label !== null) {
            this.label.alignment = this._originalAlignment;
        }
        super.doCancel();
    }
    /**
     * During the drag, call updateAlignment in order to set the {@link GraphObject#alignment} of the label.
     */
    doMouseMove() {
        if (!this.isActive)
            return;
        this.updateAlignment();
    }
    /**
     * At the end of the drag, update the alignment of the label and finish the tool,
     * completing a transaction.
     */
    doMouseUp() {
        if (!this.isActive)
            return;
        this.updateAlignment();
        this.transactionResult = 'Shifted Label';
        this.stopTool();
    }
    /**
     * Save the label's {@link GraphObject#alignment} as an absolute offset from the center of the Spot Panel
     * that the label is in.
     */
    updateAlignment() {
        if (this.label === null)
            return;
        const last = this.diagram.lastInput.documentPoint;
        const cntr = this._originalCenter;
        this.label.alignment = new go.Spot(0.5, 0.5, last.x - this._offset.x - cntr.x, last.y - this._offset.y - cntr.y);
    }
}
