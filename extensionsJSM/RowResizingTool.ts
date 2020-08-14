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
 * The RowResizingTool class lets the user resize each row of a named Table Panel in a selected Part.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/ColumnResizing.html">Column Resizing</a> sample.
 * @category Tool Extension
 */
export class RowResizingTool extends go.Tool {
  private _handleArchetype: go.GraphObject;
  private _tableName: string = 'TABLE';

  // internal state
  private _handle: go.GraphObject | null = null;
  private _adornedTable: go.Panel | null = null;

  /**
   * Constructs a RowResizingTool and sets the handle and name of the tool.
   */
  constructor() {
    super();
    const h: go.Shape = new go.Shape();
    h.geometryString = 'M0 0 H14 M0 2 H14';
    h.desiredSize = new go.Size(14, 2);
    h.cursor = 'row-resize';
    h.geometryStretch = go.GraphObject.None;
    h.background = 'rgba(255,255,255,0.5)';
    h.stroke = 'rgba(30,144,255,0.5)';
    this._handleArchetype = h;
    this.name = 'RowResizing';
  }

  /**
   * Gets or sets small GraphObject that is copied as a resize handle for each row.
   * This tool expects that this object's {@link GraphObject#desiredSize} (a.k.a width and height) has been set to real numbers.
   *
   * The default value is a {@link Shape} that is a narrow rectangle.
   */
  get handleArchetype(): go.GraphObject { return this._handleArchetype; }
  set handleArchetype(val: go.GraphObject) { this._handleArchetype = val; }

  /**
   * Gets or sets the name of the Table Panel to be resized.
   *
   * The default value is the name "TABLE".
   */
  get tableName(): string { return this._tableName; }
  set tableName(val: string) { this._tableName = val; }

  /**
   * This read-only property returns the {@link GraphObject} that is the tool handle being dragged by the user.
   * This will be contained by an {@link Adornment} whose category is "RowResizing".
   * Its {@link Adornment#adornedObject} is the same as the {@link #adornedTable}.
   */
  get handle(): go.GraphObject | null { return this._handle; }

  /**
   * This read-only property returns the {@link Panel} of type {@link Panel.Table} whose rows are being resized.
   * This must be contained within the selected {@link Part}.
   */
  get adornedTable(): go.Panel | null { return this._adornedTable; }

  /**
   * Show an {@link Adornment} with a resize handle at each row.
   * Don't show anything if {@link #tableName} doesn't identify a {@link Panel}
   * that has a {@link Panel#type} of type {@link Panel.Table}.
   */
  public updateAdornments(part: go.Part): void {
    if (part === null || part instanceof go.Link) return;  // this tool never applies to Links
    if (part.isSelected && !this.diagram.isReadOnly) {
      const selelt = part.findObject(this.tableName);
      if (selelt instanceof go.Panel && selelt.actualBounds.isReal() && selelt.isVisibleObject() &&
        part.actualBounds.isReal() && part.isVisible() &&
        selelt.type === go.Panel.Table) {
        const table = selelt;
        let adornment = part.findAdornment(this.name);
        if (adornment === null) {
          adornment = this.makeAdornment(table);
          part.addAdornment(this.name, adornment);
        }
        if (adornment !== null) {
          const pad = table.padding as go.Margin;
          const numrows = table.rowCount;
          // update the position/alignment of each handle
          adornment.elements.each((h) => {
            if (!h.pickable) return;
            const rowdef = table.getRowDefinition(h.row);
            let hgt = rowdef.actual;
            if (hgt > 0) hgt = rowdef.total;
            let sep = 0;
            // find next non-zero-height row's separatorStrokeWidth
            let idx = h.row + 1;
            while (idx < numrows && table.getRowDefinition(idx).actual === 0) idx++;
            if (idx < numrows) {
              sep = table.getRowDefinition(idx).separatorStrokeWidth;
              if (isNaN(sep)) sep = table.defaultRowSeparatorStrokeWidth;
            }
            h.alignment = new go.Spot(0, 0, pad.left + h.width / 2, pad.top + rowdef.position + hgt + sep / 2);
          });
          adornment.locationObject.desiredSize = table.actualBounds.size;
          adornment.location = table.getDocumentPoint(adornment.locationSpot);
          adornment.angle = table.getDocumentAngle();
          return;
        }
      }
    }
    part.removeAdornment(this.name);
  }

  /**
   * @hidden @internal
   * @param {Panel} table the Table Panel whose rows may be resized
   * @return {Adornment}
   */
  public makeAdornment(table: go.Panel): go.Adornment {
    // the Adornment is a Spot Panel holding resize handles
    const adornment = new go.Adornment();
    adornment.category = this.name;
    adornment.adornedObject = table;
    adornment.type = go.Panel.Spot;
    adornment.locationObjectName = 'BLOCK';
    // create the "main" element of the Spot Panel
    const block = new go.TextBlock();  // doesn't matter much what this is
    block.name = 'BLOCK';
    block.pickable = false;  // it's transparent and not pickable
    adornment.add(block);
    // now add resize handles for each row
    for (let i = 0; i < table.rowCount; i++) {
      const rowdef = table.getRowDefinition(i);
      const h = this.makeHandle(table, rowdef);
      if (h !== null) adornment.add(h);
    }
    return adornment;
  }

  /**
   * @hidden @internal
   * @param {Panel} table the Table Panel whose rows may be resized
   * @param {RowColumnDefinition} coldef the row definition to be resized
   * @return a copy of the {@link #handleArchetype}
   */
  public makeHandle(table: go.Panel, rowdef: go.RowColumnDefinition): go.GraphObject | null {
    const h = this.handleArchetype;
    if (h === null) return null;
    const c = h.copy();
    c.row = rowdef.index;
    return c;
  }


  /**
   * This tool may run when there is a mouse-down event on a "RowResizing" handle,
   * the diagram is not read-only, the left mouse button is being used,
   * and this tool's adornment's resize handle is at the current mouse point.
   */
  public canStart(): boolean {
    if (!this.isEnabled) return false;

    const diagram = this.diagram;
    if (diagram.isReadOnly) return false;
    if (!diagram.lastInput.left) return false;
    const h = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    return (h !== null);
  }

  /**
   * Find the {@link #handle}, ensure type {@link Panel.Table}, capture the mouse, and start a transaction.
   *
   * If the call to {@link Tool#findToolHandleAt} finds no "RowResizing" tool handle, this method returns without activating this tool.
   */
  public doActivate(): void {
    const diagram = this.diagram;
    this._handle = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    if (this.handle === null) return;
    const panel = (this.handle.part as go.Adornment).adornedObject as go.Adornment;
    if (!panel || panel.type !== go.Panel.Table) return;
    this._adornedTable = panel;
    diagram.isMouseCaptured = true;
    this.startTransaction(this.name);
    this.isActive = true;
  }

  /**
   * Stop the current transaction and release the mouse.
   */
  public doDeactivate(): void {
    this.stopTransaction();
    this._handle = null;
    this._adornedTable = null;
    const diagram = this.diagram;
    diagram.isMouseCaptured = false;
    this.isActive = false;
  }

  /**
   * Call {@link #resize} with a new size determined by the current mouse point.
   * This determines the new bounds by calling {@link #computeResize}.
   */
  public doMouseMove(): void {
    const diagram = this.diagram;
    if (this.isActive) {
      const newpt = this.computeResize(diagram.lastInput.documentPoint);
      this.resize(newpt);
    }
  }

  /**
   * Call {@link #resize} with the final bounds based on the most recent mouse point, and commit the transaction.
   * This determines the new bounds by calling {@link #computeResize}.
   */
  public doMouseUp(): void {
    const diagram = this.diagram;
    if (this.isActive) {
      const newpt = this.computeResize(diagram.lastInput.documentPoint);
      this.resize(newpt);
      this.transactionResult = this.name;  // success
    }
    this.stopTool();
  }

  /**
   * Change the {@link RowColumnDefinition#height} of the row being resized
   * to a value corresponding to the given mouse point.
   * @param {Point} newPoint the value returned by the call to {@link #computeResize}
   */
  public resize(newPoint: go.Point): void {
    const table = this.adornedTable;
    if (table === null) return;
    const h = this.handle;
    if (h === null) return;
    const pad = table.padding as go.Margin;
    const numrows = table.rowCount;
    const locpt = table.getLocalPoint(newPoint);
    const rowdef = table.getRowDefinition(h.row);
    let sep = 0;
    let idx = h.row + 1;
    while (idx < numrows && table.getRowDefinition(idx).actual === 0) idx++;
    if (idx < numrows) {
      sep = table.getRowDefinition(idx).separatorStrokeWidth;
      if (isNaN(sep)) sep = table.defaultRowSeparatorStrokeWidth;
    }
    rowdef.height = Math.max(0, locpt.y - pad.top - rowdef.position - (rowdef.total - rowdef.actual) - sep / 2);
  }


  /**
   * This can be overridden in order to customize the resizing process.
   * @expose
   * @param {Point} p the point where the handle is being dragged.
   * @return {Point}
   */
  public computeResize(p: go.Point): go.Point {
    return p;
  }

  /**
   * Pressing the Delete key removes any column width setting and stops this tool.
   */
  public doKeyDown(): void {
    if (!this.isActive) return;
    const diagram = this.diagram;
    const e = diagram.lastInput;
    if (e.key === 'Del' || e.key === '\t') {  // remove height setting
      if (this.adornedTable !== null && this.handle !== null) {
        const rowdef = this.adornedTable.getRowDefinition(this.handle.row);
        rowdef.height = NaN;
        this.transactionResult = this.name;  // success
        this.stopTool();
      }
    } else {
      super.doKeyDown();
    }
  }

}
