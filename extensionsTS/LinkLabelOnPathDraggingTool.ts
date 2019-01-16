/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go';

/**
 * The LinkLabelOnPathDraggingTool class lets the user move a label on a {@link Link} while keeping the label on the link's path.
 * This tool only works when the Link has a label marked by the "_isLinkLabel" property.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/LinkLabelOnPathDragging.html">Link Label On Path Dragging</a> sample.
 * @category Tool Extension
 */
export class LinkLabelOnPathDraggingTool extends go.Tool {
  private label: go.GraphObject | null = null;
  private _originalIndex: number = 0;
  private _originalFraction: number = 0.0;

  /**
   * Constructs a LinkLabelOnPathDraggingTool and sets the name for the tool.
   */
  constructor() {
    super();
    this.name = 'LinkLabelOnPathDragging';
  }

  /**
   * From the GraphObject at the mouse point, search up the visual tree until we get to
   * an object that has the "_isLinkLabel" property set to true and that is an immediate child of a Link Panel.
   * @return {GraphObject} This returns null if no such label is at the mouse down point.
   */
  public findLabel(): go.GraphObject | null {
    const diagram = this.diagram;
    const e = diagram.lastInput;
    let elt = diagram.findObjectAt(e.documentPoint, null, null);

    if (elt === null || !(elt.part instanceof go.Link)) return null;
    while (elt !== null && elt.panel !== elt.part) {
      elt = elt.panel;
    }
    // If it's not marked as "_isLinkLabel", don't consider it a label:
    if (!(elt as any)['_isLinkLabel']) return null;
    return elt;
  }

  /**
   * This tool can only start if the mouse has moved enough so that it is not a click,
   * and if the mouse down point is on a GraphObject "label" in a Link Panel,
   * as determined by {@link #findLabel}.
   */
  public canStart(): boolean {
    if (!super.canStart()) return false;
    const diagram = this.diagram;
    // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
    const e = diagram.lastInput;
    if (!e.left) return false;
    if (!this.isBeyondDragSize()) return false;

    return this.findLabel() !== null;
  }

  /**
   * Start a transaction, call findLabel and remember it as the "label" property,
   * and remember the original values for the label's segment properties.
   */
  public doActivate(): void {
    this.startTransaction('Shifted Label');
    this.label = this.findLabel();
    if (this.label !== null) {
      this._originalIndex = this.label.segmentIndex;
      this._originalFraction = this.label.segmentFraction;
    }
    super.doActivate();
  }

  /**
   * Stop any ongoing transaction.
   */
  public doDeactivate(): void {
    super.doDeactivate();
    this.stopTransaction();
  }

  /**
   * Clear any reference to a label element.
   */
  public doStop(): void {
    this.label = null;
    super.doStop();
  }

  /**
   * Restore the label's original value for GraphObject.segment... properties.
   */
  public doCancel(): void {
    if (this.label !== null) {
      this.label.segmentIndex = this._originalIndex;
      this.label.segmentFraction = this._originalFraction;
    }
    super.doCancel();
  }

  /**
   * During the drag, call {@link #updateSegmentOffset} in order to set the segment... properties of the label.
   */
  public doMouseMove(): void {
    if (!this.isActive) return;
    this.updateSegmentOffset();
  }

  /**
   * At the end of the drag, update the segment properties of the label and finish the tool,
   * completing a transaction.
   */
  public doMouseUp(): void {
    if (!this.isActive) return;
    this.updateSegmentOffset();
    this.transactionResult = 'Shifted Label';
    this.stopTool();
  }

  /**
   * Save the label's {@link GraphObject#segmentIndex} and {@link GraphObject#segmentFraction}
   * at the closest point to the mouse.
   */
  public updateSegmentOffset(): void {
    const lab = this.label;
    if (lab === null) return;
    const link = lab.part;
    if (!(link instanceof go.Link)) return;

    const last = this.diagram.lastInput.documentPoint;
    let idx = link.findClosestSegment(last);
    idx = Math.min(Math.max(link.firstPickIndex, idx), link.lastPickIndex - 1);
    const p1 = link.getPoint(idx);
    const p2 = link.getPoint(idx + 1);
    const total = Math.sqrt(p1.distanceSquaredPoint(p2));
    const p = last.copy().projectOntoLineSegmentPoint(p1, p2);
    const frac = Math.sqrt(p1.distanceSquaredPoint(p)) / total;
    lab.segmentIndex = idx;
    lab.segmentFraction = frac;
  }
}
