/**
 * Copyright (C) 1998-2021 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * FLOOR PLANNER - WALL BUILDING TOOL
 * Used to construct new Walls in a Floorplan with mouse clicking / mouse point
 */

import * as go from '../../../release/go';
import { Floorplan } from './Floorplan.js';
import { WallReshapingTool } from './WallReshapingTool.js';

export class WallBuildingTool extends go.Tool {

  private _startPoint: go.Point | null;
  private _endPoint: go.Point | null;
  private _wallReshapingTool: WallReshapingTool | null;
  private _buildingWall: go.Group | null = null; // the wall being built
  // whether or not the "wall" we're building is really just a room / floor divider (not a physical wall)
  private _isBuildingDivider: boolean = false;

  constructor() {
    super();

    this.name = 'WallBuilding';
    this._startPoint = null;
    this._endPoint = null;
    this._wallReshapingTool = null;
    this._isBuildingDivider = false;
  }

  // Get / set the current startPoint
  get startPoint(): go.Point | null { return this._startPoint; }
  set startPoint(value: go.Point | null) { this._startPoint = value; }

  // Get / set the current endPoint
  get endPoint(): go.Point | null { return this._endPoint; }
  set endPoint(value: go.Point | null) { this._endPoint = value; }

  // Get / set the floorplan's WallReshapingTool
  get wallReshapingTool(): WallReshapingTool | null { return this._wallReshapingTool; }
  set wallReshapingTool(value: WallReshapingTool | null) { this._wallReshapingTool = value; }

  // Get / set the wall being built
  get buildingWall(): go.Group | null { return this._buildingWall; }
  set buildingWall(value: go.Group | null) { this._buildingWall = value; }

  // Get / set whether or not we're actually building a room / floor divider, not a wall
  get isBuildingDivider(): boolean { return this._isBuildingDivider; }
  set isBuildingDivider(value: boolean) { this._isBuildingDivider = value; }

  /**
   * Start wall building transaction.
   * If the mouse point is inside a wall or near a wall endpoint, snap to that wall or endpoint
   */
  public doActivate(): void {
    this.endPoint = null;
    this.startTransaction(this.name);
    this.diagram.isMouseCaptured = true;
    const tool = this;
    const fp: Floorplan = tool.diagram as Floorplan;

    let clickPt: go.Point = tool.diagram.lastInput.documentPoint;
    let isSnapped: boolean = false;
    // if the clickPt is inside some other wall's geometry, project it onto that wall's segment
    const walls: go.Iterator<go.Group> = fp.findNodesByExample({ category: 'WallGroup' }) as go.Iterator<go.Group>;
    walls.iterator.each(function(w: go.Group) {
      if (fp.isPointInWall(w, clickPt)) {
        // don't check if you're inside the wall you're building, you obviously are
        if (tool.buildingWall === null) {
          const snapPt: go.Point = clickPt.projectOntoLineSegmentPoint(w.data.startpoint, w.data.endpoint);
          clickPt = snapPt;
          isSnapped = true;
        }
      }
    });

    // if the click point is close to another wall's start/endpoint, use that as the startpoint of the new wall
    walls.iterator.each(function(w: go.Group) {
      const sp: go.Point = w.data.startpoint; const ep: go.Point = w.data.endpoint;
      const distSp: number = Math.sqrt(sp.distanceSquaredPoint(clickPt));
      // TODO probably need a better "closeness" metric than just a raw number -- it could be an optional parameter?
      if (distSp < 15) {
        clickPt = sp;
        isSnapped = true;
      }
      const distEp: number = Math.sqrt(ep.distanceSquaredPoint(clickPt));
      if (distEp < 15) {
        clickPt = ep;
        isSnapped = true;
      }
    });

    // assign startpoint based on grid (iff startpoint was not determined by another wall's endpoint)
    if (true) {
      let gs: number = fp.model.modelData.gridSize;
      if (!(tool.diagram.toolManager.draggingTool.isGridSnapEnabled) || isSnapped) gs = .0001;
      const newx: number = gs * Math.round(clickPt.x / gs);
      const newy: number = gs * Math.round(clickPt.y / gs);
      clickPt = new go.Point(newx, newy);
    }

    this.startPoint = clickPt;

    this.wallReshapingTool = fp.toolManager.mouseDownTools.elt(3) as WallReshapingTool;
    // Default functionality:
    this.isActive = true;
  }

  /**
   * Add wall data to Floorplan and begin reshaping the new wall
   */
  public doMouseDown(): void {
    const diagram: go.Diagram = this.diagram;
    const tool = this;
    tool.diagram.currentCursor = 'crosshair';
    const data = {
      key: 'wall', category: 'WallGroup', caption: tool.isBuildingDivider ? 'Divider' : 'Wall', type: tool.isBuildingDivider ? 'Divider' : 'Wall',
      startpoint: tool.startPoint, endpoint: tool.startPoint, smpt1: tool.startPoint, smpt2: tool.startPoint, empt1: tool.startPoint, empt2: tool.startPoint,
      thickness: tool._isBuildingDivider ? .005 : parseFloat(diagram.model.modelData.wallThickness), color: 'lightgray', isGroup: true, notes: '',
      isDivider: tool.isBuildingDivider
    };
    this.diagram.model.addNodeData(data);
    const wall: go.Group = diagram.findPartForKey(data.key) as go.Group;
    this.buildingWall = wall;
    const fp: Floorplan = diagram as Floorplan;
    fp.updateWall(wall);
    const part: go.Part | null = diagram.findPartForData(data);
    if (part === null) return;
    // set the TransactionResult before raising event, in case it changes the result or cancels the tool
    tool.transactionResult = tool.name;
    diagram.raiseDiagramEvent('PartCreated', part);

    if (tool.wallReshapingTool === null) return;
    // start the wallReshapingTool, tell it what wall it's reshaping (more accurately, the shape that will have the reshape handle)
    tool.wallReshapingTool.isEnabled = true;
    diagram.select(part);
    tool.wallReshapingTool.isBuilding = true;
    tool.wallReshapingTool.adornedShape = part.findObject('SHAPE') as go.Shape;
    tool.wallReshapingTool.doActivate();
  }

  /**
   * If user presses Esc key, cancel the wall building
   */
  public doKeyDown(): void {
    const fp: Floorplan = this.diagram as Floorplan;
    const e: go.InputEvent = fp.lastInput;
    if (e.key === 'Esc') {
      const wall: go.Group = fp.selection.first() as go.Group;
      fp.remove(wall);
      fp.pointNodes.iterator.each(function(node) { fp.remove(node); });
      fp.dimensionLinks.iterator.each(function(link) { fp.remove(link); });
      fp.pointNodes.clear();
      fp.dimensionLinks.clear();
      this.doDeactivate();
    }
    go.Tool.prototype.doKeyDown.call(this);
  }

  /**
   * When the mouse moves, reshape the wall
   */
  public doMouseMove(): void {
    if (this.wallReshapingTool === null) return;
    this.diagram.currentCursor = 'crosshair';
    this.wallReshapingTool.doMouseMove();
  }

  /**
   * End transaction, update wall dimensions and geometries (mitering?)
   */
  public doDeactivate(): void {
    const diagram: go.Diagram = this.diagram;
    this.buildingWall = null;
    this.diagram.currentCursor = '';
    this.diagram.isMouseCaptured = false;

    if (this.wallReshapingTool !== null) {
      this.wallReshapingTool.isEnabled = false;
      this.wallReshapingTool.adornedShape = null;
      this.wallReshapingTool.doMouseUp(); // perform mitering
      this.wallReshapingTool.doDeactivate();
      this.wallReshapingTool.isBuilding = false;
    }

    const fp: Floorplan = diagram as Floorplan;
    fp.updateWallDimensions();

    this.stopTransaction();

    this.isActive = false; // Default functionality
  }

}

// export = WallBuildingTool;
