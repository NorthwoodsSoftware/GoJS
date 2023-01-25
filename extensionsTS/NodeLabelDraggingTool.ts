/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';

/**
 * The NodeLabelDraggingTool class lets the user move a label on a Node.
 *
 * This tool only works when the Node has a label (any GraphObject) marked with
 * { _isNodeLabel: true } that is positioned in a Spot Panel.
 * It works by modifying that label's {@link GraphObject#alignment} property to have an
 * offset from the center of the panel.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/NodeLabelDragging.html">Node Label Dragging</a> sample.
 * @category Tool Extension
 */
export class NodeLabelDraggingTool extends go.Tool {
  /**
   * The label being dragged.
   */
  public label: go.GraphObject | null = null;
  private _offset: go.Point = new go.Point();  // of the mouse relative to the center of the label object
  private _originalAlignment: go.Spot = go.Spot.Default;
  private _originalCenter: go.Point = new go.Point();

  /**
   * Constructs a NodeLabelDraggingTool and sets the name for the tool.
   */
  constructor() {
    super();
    this.name = 'NodeLabelDragging';
  }

  /**
   * From the GraphObject at the mouse point, search up the visual tree until we get to
   * an object that has the "_isNodeLabel" property set to true, that is in a Spot Panel,
   * and that is not the first element of that Panel (i.e. not the main element of the panel).
   * @return {GraphObject} This returns null if no such label is at the mouse down point.
   */
  public findLabel(): go.GraphObject | null {
    const diagram = this.diagram;
    const e = diagram.firstInput;
    let elt = diagram.findObjectAt(e.documentPoint, null, null);

    if (elt === null || !(elt.part instanceof go.Node)) return null;
    while (elt.panel !== null) {
      if ((elt as any)['_isNodeLabel'] && elt.panel.type === go.Panel.Spot && elt.panel.findMainElement() !== elt) return elt;
      elt = elt.panel;
    }
    return null;
  }

  /**
   * This tool can only start if the mouse has moved enough so that it is not a click,
   * and if the mouse down point is on a GraphObject "label" in a Spot Panel,
   * as determined by findLabel().
   */
  public override canStart(): boolean {
    if (!super.canStart()) return false;
    const diagram = this.diagram;
    // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
    const e = diagram.lastInput;
    if (!e.left) return false;
    if (!this.isBeyondDragSize()) return false;

    return this.findLabel() !== null;
  }

  /**
   * Start a transaction, call {@link #findLabel} and remember it as the "label" property,
   * and remember the original value for the label's {@link GraphObject#alignment} property.
   */
  public override doActivate(): void {
    this.startTransaction('Shifted Label');
    this.label = this.findLabel();
    if (this.label !== null) {
      // compute the offset of the mouse-down point relative to the center of the label
      this._offset = this.diagram.firstInput.documentPoint.copy().subtract(this.label.getDocumentPoint(go.Spot.Center));
      this._originalAlignment = this.label.alignment.copy();
      const panel = this.label.panel;
      if (panel !== null) {
        const main = panel.findMainElement();
        if (main !== null) this._originalCenter = main.getDocumentPoint(go.Spot.Center);
      }
    }
    super.doActivate();
  }

  /**
   * Stop any ongoing transaction.
   */
  public override doDeactivate(): void {
    super.doDeactivate();
    this.stopTransaction();
  }

  /**
   * Clear any reference to a label element.
   */
  public override doStop(): void {
    this.label = null;
    super.doStop();
  }

  /**
   * Restore the label's original value for GraphObject.alignment.
   */
  public override doCancel(): void {
    if (this.label !== null) {
      this.label.alignment = this._originalAlignment;
    }
    super.doCancel();
  }

  /**
   * During the drag, call updateAlignment in order to set the {@link GraphObject#alignment} of the label.
   */
  public override doMouseMove(): void {
    if (!this.isActive) return;
    this.updateAlignment();
  }

  /**
   * At the end of the drag, update the alignment of the label and finish the tool,
   * completing a transaction.
   */
  public override doMouseUp(): void {
    if (!this.isActive) return;
    this.updateAlignment();
    this.transactionResult = 'Shifted Label';
    this.stopTool();
  }

  /**
   * Save the label's {@link GraphObject#alignment} as an absolute offset from the center of the Spot Panel
   * that the label is in.
   */
  public updateAlignment(): void {
    if (this.label === null) return;
    const last = this.diagram.lastInput.documentPoint;
    const cntr = this._originalCenter;
    this.label.alignment = new go.Spot(0.5, 0.5, last.x - this._offset.x - cntr.x, last.y - this._offset.y - cntr.y);
  }
}
