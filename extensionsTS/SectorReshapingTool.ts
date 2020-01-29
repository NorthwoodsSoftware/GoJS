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

import * as go from '../release/go.js';

/**
 * The SectorReshapingTool class lets the user interactively modify the angles of a "pie"-shaped sector of a circle.
 * When a node is selected, this shows two handles for changing the angles of the sides of the sector and one handle for changing the radius.
 *
 * This depends on there being three data properties, "angle", "sweep", and "radius",
 * that hold the needed information to be able to reproduce the sector.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/SectorReshaping.html">Sector Reshaping</a> sample.
 * @category Tool Extension
 */
export class SectorReshapingTool extends go.Tool {
  private _handle: go.GraphObject | null = null;
  private _originalRadius: number = 0;
  private _originalAngle: number = 0;
  private _originalSweep: number = 0;

  private _radiusProperty: string = 'radius';
  private _angleProperty: string = 'angle';
  private _sweepProperty: string = 'sweep';

  /**
   * Constructs a SectorReshapingTool and sets the name for the tool.
   */
  constructor() {
    super();
    this.name = 'SectorReshaping';
  }

  /**
   * Gets or sets the name of the data property for the sector radius.
   *
   * The default value is "radius".
   */
  get radiusProperty(): string { return this._radiusProperty; }
  set radiusProperty(val: string) { this._radiusProperty = val; }

  /**
   * Gets or sets the name of the data property for the sector start angle.
   *
   * The default value is "angle".
   */
  get angleProperty(): string { return this._angleProperty; }
  set angleProperty(val: string) { this._angleProperty = val; }

  /**
   * Gets or sets the name of the data property for the sector sweep angle.
   *
   * The default value is "sweep".
   */
  get sweepProperty(): string { return this._sweepProperty; }
  set sweepProperty(val: string) { this._sweepProperty = val; }

  /**
   * This tool can only start if Diagram.allowReshape is true and the mouse-down event
   * is at a tool handle created by this tool.
   */
  public canStart(): boolean {
    if (!this.isEnabled) return false;
    const diagram = this.diagram;
    if (diagram.isReadOnly) return false;
    if (!diagram.allowReshape) return false;
    const h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    return (h !== null);
  }

  /**
   * If the Part is selected, show two angle-changing tool handles and one radius-changing tool handle.
   */
  public updateAdornments(part: go.Part): void {
    const data = part.data;
    if (part.isSelected && data !== null && !this.diagram.isReadOnly) {
      let ad = part.findAdornment(this.name);
      if (ad === null) {
        const $ = go.GraphObject.make;
        ad =
          $(go.Adornment, 'Spot',
            $(go.Placeholder),
            $(go.Shape, 'Diamond',
              { name: 'RADIUS', fill: 'lime', width: 10, height: 10, cursor: 'move' },
              new go.Binding('alignment', '', (d) => {
                const angle = SectorReshapingTool.getAngle(d);
                const sweep = SectorReshapingTool.getSweep(d);
                const p = new go.Point(0.5, 0).rotate(angle + sweep / 2);
                return new go.Spot(0.5 + p.x, 0.5 + p.y);
              })),
            $(go.Shape, 'Circle',
              { name: 'ANGLE', fill: 'lime', width: 8, height: 8, cursor: 'move' },
              new go.Binding('alignment', '', (d) => {
                const angle = SectorReshapingTool.getAngle(d);
                const p = new go.Point(0.5, 0).rotate(angle);
                return new go.Spot(0.5 + p.x, 0.5 + p.y);
              })),
            $(go.Shape, 'Circle',
              { name: 'SWEEP', fill: 'lime', width: 8, height: 8, cursor: 'move' },
              new go.Binding('alignment', '', (d) => {
                const angle = SectorReshapingTool.getAngle(d);
                const sweep = SectorReshapingTool.getSweep(d);
                const p = new go.Point(0.5, 0).rotate(angle + sweep);
                return new go.Spot(0.5 + p.x, 0.5 + p.y);
              }))
          ) as go.Adornment;
        ad.adornedObject = part.locationObject;
        part.addAdornment(this.name, ad);
      } else {
        ad.location = part.position;
        const ns = part.naturalBounds;
        if (ad.placeholder !== null) ad.placeholder.desiredSize = new go.Size((ns.width) * part.scale, (ns.height) * part.scale);
        ad.updateTargetBindings();
      }
    } else {
      part.removeAdornment(this.name);
    }
  }

  /**
   * Remember the original angles and radius and start a transaction.
   */
  public doActivate(): void {
    const diagram = this.diagram;
    this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    if (this._handle === null) return;
    const part = (this._handle.part as go.Adornment).adornedPart;
    if (part === null || part.data === null) return;

    const data = part.data;
    this._originalRadius = SectorReshapingTool.getRadius(data);
    this._originalAngle = SectorReshapingTool.getAngle(data);
    this._originalSweep = SectorReshapingTool.getSweep(data);

    this.startTransaction(this.name);
    this.isActive = true;
  }

  /**
   * Stop the transaction.
   */
  public doDeactivate(): void {
    this.stopTransaction();

    this._handle = null;
    this.isActive = false;
  }

  /**
   * Restore the original angles and radius and then stop this tool.
   */
  public doCancel(): void {
    if (this._handle !== null) {
      const part = (this._handle.part as go.Adornment).adornedPart;
      if (part !== null) {
        const model = this.diagram.model;
        model.setDataProperty(part.data, this._radiusProperty, this._originalRadius);
        model.setDataProperty(part.data, this._angleProperty, this._originalAngle);
        model.setDataProperty(part.data, this._sweepProperty, this._originalSweep);
      }
    }
    this.stopTool();
  }

  /**
   * Depending on the current handle being dragged, update the "radius", the "angle", or the "sweep"
   * properties on the model data.
   * Those property names are currently parameterized as static members of SectorReshapingTool.
   */
  public doMouseMove(): void {
    const diagram = this.diagram;
    const h = this._handle;
    if (this.isActive && h !== null) {
      const adorned = (h.part as go.Adornment).adornedObject;
      if (adorned === null) return;
      const center = adorned.getDocumentPoint(go.Spot.Center);
      const node = adorned.part;
      if (node === null || node.data === null) return;
      const mouse = diagram.lastInput.documentPoint;
      if (h.name === 'RADIUS') {
        const dst = Math.sqrt(center.distanceSquaredPoint(mouse));
        diagram.model.setDataProperty(node.data, this._radiusProperty, dst);
      } else if (h.name === 'ANGLE') {
        const dir = center.directionPoint(mouse);
        diagram.model.setDataProperty(node.data, this._angleProperty, dir);
      } else if (h.name === 'SWEEP') {
        const dir = center.directionPoint(mouse);
        const ang = SectorReshapingTool.getAngle(node.data);
        let swp = (dir - ang + 360) % 360;
        if (swp > 359) swp = 360;  // make it easier to get a full circle
        diagram.model.setDataProperty(node.data, this._sweepProperty, swp);
      }
    }
  }

  /**
   * Finish the transaction and stop the tool.
   */
  public doMouseUp(): void {
    const diagram = this.diagram;
    if (this.isActive) {
      this.transactionResult = this.name;  // successful finish
    }
    this.stopTool();
  }

  // static functions for getting data
  /** @hidden @internal */
  public static getRadius(data: go.ObjectData): number {
    let radius = data['radius'];
    if (!(typeof radius === 'number') || isNaN(radius) || radius <= 0) radius = 50;
    return radius;
  }

  /** @hidden @internal */
  public static getAngle(data: go.ObjectData): number {
    let angle = data['angle'];
    if (!(typeof angle === 'number') || isNaN(angle)) angle = 0;
    else angle = angle % 360;
    return angle;
  }

  /** @hidden @internal */
  public static getSweep(data: go.ObjectData): number {
    let sweep = data['sweep'];
    if (!(typeof sweep === 'number') || isNaN(sweep)) sweep = 360;
    return sweep;
  }
}
