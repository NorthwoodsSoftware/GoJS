/**
 * Copyright (C) 1998-2024 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * FLOOR PLANNER - WALL BUILDING TOOL
 * Used to construct new Walls in a Floorplan with mouse clicking / mouse point
 */

import go from 'gojs';
import { Floorplan } from './Floorplan.js';
import { fpUtils } from './FloorplanUtils.js';
import type { WallReshapingTool } from './WallReshapingTool.js';

export class WallBuildingTool extends go.Tool {
  public startPoint: go.Point | null;
  public endPoint: go.Point | null;
  public wallReshapingTool: WallReshapingTool | null;
  public buildingWall: go.Group | null = null; // the wall being built
  // whether or not the "wall" we're building is really just a room / floor divider (not a physical wall)
  public isBuildingDivider: boolean = false;

  constructor(init?: Partial<WallBuildingTool>) {
    super();

    this.name = 'WallBuilding';
    this.startPoint = null;
    this.endPoint = null;
    this.isBuildingDivider = false;
    this.wallReshapingTool = null;

    if (init) Object.assign(this, init);
  }

  /**
   * Start wall building transaction.
   * If the mouse point is inside a wall or near a wall endpoint, snap to that wall or endpoint
   */
  public doActivate(): void {
    this.endPoint = null;
    this.startTransaction(this.name);
    this.diagram.isMouseCaptured = true;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const tool = this;

    let clickPt: go.Point = tool.diagram.lastInput.documentPoint;
    let isSnapped: boolean = false;
    // if the clickPt is inside some other wall's geometry, project it onto that wall's segment
    const walls: go.Iterator<go.Group> = this.diagram.findNodesByExample({
      category: 'Wall'
    }) as go.Iterator<go.Group>;
    walls.iterator.each(function (w: go.Group) {
      if (fpUtils.isPointInWall(w, clickPt)) {
        // don't check if you're inside the wall you're building, you obviously are
        if (tool.buildingWall === null) {
          const snapPt: go.Point = clickPt.projectOntoLineSegmentPoint(
            w.data.startpoint,
            w.data.endpoint
          );
          clickPt = snapPt;
          isSnapped = true;
        }
      }
    });

    // if the click point is close to another wall's start/endpoint, use that as the startpoint of the new wall
    walls.iterator.each(function (w: go.Group) {
      const sp: go.Point = w.data.startpoint;
      const ep: go.Point = w.data.endpoint;
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

    // assign startpoint based on grid
    let gs: number = this.diagram.model.modelData.gridSize;
    if (!tool.diagram.toolManager.draggingTool.isGridSnapEnabled || isSnapped) gs = 0.0001;
    const newX: number = gs * Math.round(clickPt.x / gs);
    const newY: number = gs * Math.round(clickPt.y / gs);
    clickPt = new go.Point(newX, newY);

    this.startPoint = clickPt;

    this.wallReshapingTool = this.diagram.toolManager.findTool(
      'WallReshaping'
    ) as WallReshapingTool;
    // Default functionality:
    this.isActive = true;
  }

  /**
   * Add wall data to Floorplan and begin reshaping the new wall
   */
  public doMouseDown(): void {
    const diagram: go.Diagram = this.diagram;

    this.diagram.currentCursor = 'crosshair';
    const data = {
      key: 'wall',
      category: 'Wall',
      text: this.isBuildingDivider ? 'Divider' : 'Wall',
      startpoint: this.startPoint,
      endpoint: this.startPoint,
      smpt1: this.startPoint,
      smpt2: this.startPoint,
      empt1: this.startPoint,
      empt2: this.startPoint,
      thickness: this.isBuildingDivider ? 0.005 : parseFloat(diagram.model.modelData.wallThickness),
      color: 'lightgray',
      isGroup: true,
      notes: '',
      isDivider: this.isBuildingDivider
    };
    this.diagram.model.addNodeData(data);
    const wall: go.Group = diagram.findPartForKey(data.key) as go.Group;
    this.buildingWall = wall;
    const fp: Floorplan = diagram as Floorplan;
    fp.updateWall(wall);
    const part: go.Part | null = diagram.findPartForData(data);
    if (part === null) return;
    // set the TransactionResult before raising event, in case it changes the result or cancels the tool
    this.transactionResult = this.name;
    diagram.raiseDiagramEvent('PartCreated', part);

    if (this.wallReshapingTool === null) return;
    // start the wallReshapingTool, tell it what wall it's reshaping (more accurately, the shape that will have the reshape handle)
    this.wallReshapingTool.isEnabled = true;
    diagram.select(part);
    this.wallReshapingTool.isBuilding = true;
    this.wallReshapingTool.adornedShape = part.findObject('SHAPE') as go.Shape;
    this.wallReshapingTool.doActivate();
  }

  /**
   * If user presses Esc key, cancel the wall building
   */
  public doKeyDown(): void {
    const fp: Floorplan = this.diagram as Floorplan;
    const e: go.InputEvent = fp.lastInput;
    if (e.commandKey === 'Escape') {
      const wall: go.Group = fp.selection.first() as go.Group;
      fp.remove(wall);
      fp.pointNodes.iterator.each((node: go.Node) => {
        fp.remove(node);
      });
      fp.dimensionLinks.iterator.each(function (link: go.Link) {
        fp.remove(link);
      });
      fp.pointNodes.clear();
      fp.dimensionLinks.clear();
      this.doDeactivate();
    }
    super.doKeyDown();
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

    this.isActive = false;
  }
}
