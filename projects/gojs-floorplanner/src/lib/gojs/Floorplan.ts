/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Copyright (C) 1998-2024 by Northwoods Software Corporation
 * All Rights Reserved.
 *
 * Floorplan Class
 * A Floorplan is a Diagram with special rules
 */

import go from 'gojs';
// import { NodeLabelDraggingTool } from './NodeLabelDraggingTool';
import { WallBuildingTool } from './WallBuildingTool';
import { WallReshapingTool } from './WallReshapingTool';
import { fpUtils } from './FloorplanUtils';
import { FURNITURE_NODE_DATA_ARRAY, WALLPARTS_NODE_DATA_ARRAY } from './FurnitureDefinitions';
import { makeContextMenu, makeGroupToolTip } from './templates/Shared';
import { getWallPartEndpoints, nodeTemplateMap } from './templates/Nodes';
import { Wall } from './templates/Wall';

export class Floorplan extends go.Diagram {
  public pointNodes: go.Set<go.Node>;
  public dimensionLinks: go.Set<go.Link>;
  public angleNodes: go.Set<go.Node>;

  /**
   * A Floorplan is a special kind of Diagram. It supports walls, rooms, and many other common features a Floorplan might have.
   * @param div The HTML DIV element or DIV element id for the Floorplan to use
   */
  constructor(div: HTMLDivElement | string, init?: go.DiagramInitOptions) {
    super(div, init);

    // Point Nodes, Dimension Links, Angle Nodes on the Floorplan (never in model data)
    this.pointNodes = new go.Set<go.Node>();
    this.dimensionLinks = new go.Set<go.Link>();
    this.angleNodes = new go.Set<go.Node>();

    const $ = go.GraphObject.make;

    this.allowLink = false;
    this.undoManager.isEnabled = true;
    this.layout.isInitial = false;
    this.layout.isOngoing = false;
    this.model = new go.GraphLinksModel({
      modelData: {
        showTextures: false,
        units: 'meters',
        unitsAbbreviation: 'm',
        unitsConversionFactor: 0.02,
        gridSize: 10,
        wallThickness: 10,
        preferences: {
          showWallGuidelines: true,
          showWallLengths: true,
          showWallAngles: true,
          showOnlySmallWallAngles: true,
          showGrid: true,
          gridSnap: true
        }
      }
    });

    this.grid = new go.Panel('Grid', {
      gridCellSize: new go.Size(this.model.modelData.gridSize, this.model.modelData.gridSize),
      visible: true
    }).add(
      new go.Shape('LineH', { stroke: 'lightgray' }),
      new go.Shape('LineV', { stroke: 'lightgray' })
    );

    this.contextMenu = makeContextMenu();
    this.commandHandler.canGroupSelection = function () {
      return true;
    };
    this.commandHandler.canUngroupSelection = function () {
      return true;
    };
    this.commandHandler.archetypeGroupData = { isGroup: true };

    // Listeners

    // if a wall is copied, update its geometry
    this.addDiagramListener('SelectionCopied', function (e) {
      const fp: Floorplan = e.diagram as Floorplan;
      fp.selection.iterator.each(function (part) {
        if (part.category === 'Wall') {
          const w: go.Group = part as go.Group;
          fp.updateWall(w);
        }
      });
    });

    // If a node has been dropped onto the Floorplan from a Palette...
    this.addDiagramListener('ExternalObjectsDropped', function (e) {
      const garbage: Array<go.Part> = [];
      const fp: Floorplan = e.diagram as Floorplan;
      fp.selection.iterator.each(function (node) {
        // if floor node dropped, try to make a room node here with that floor brush style
        if (node.category === 'FloorNode') {
          const floorNode = node;
          const pt: go.Point = fp.lastInput.documentPoint;
          // try to make a room here
          fp.maybeAddRoomNode(pt, floorNode.data.floorImage);

          garbage.push(floorNode);
        }
      });
      for (const i in garbage) {
        e.diagram.remove(garbage[i]);
      }
    });

    // When a wall is copied / pasted, update the wall geometry, angle, etc
    this.addDiagramListener('ClipboardPasted', function (e) {
      const fp: Floorplan = e.diagram as Floorplan;
      e.diagram.selection.iterator.each(function (node) {
        if (node.category === 'Wall') {
          const w: go.Group = node as go.Group;
          fp.updateWall(w);
        }
      });
    });

    // Display different help depending on selection context

    this.addDiagramListener('ChangedSelection', function (e) {
      const floorplan: Floorplan = e.diagram as Floorplan;
      floorplan.skipsUndoManager = true;
      floorplan.startTransaction('remove dimension links and angle nodes');
      floorplan.pointNodes.iterator.each(function (node) {
        e.diagram.remove(node);
      });
      floorplan.dimensionLinks.iterator.each(function (link) {
        e.diagram.remove(link);
      });

      const missedDimensionLinks: Array<go.Link> = []; // used only in undo situations
      floorplan.links.iterator.each(function (link) {
        if (link.data.category === 'DimensionLink') missedDimensionLinks.push(link);
      });
      for (let i: number = 0; i < missedDimensionLinks.length; i++) {
        e.diagram.remove(missedDimensionLinks[i]);
      }

      floorplan.pointNodes.clear();
      floorplan.dimensionLinks.clear();
      floorplan.angleNodes.iterator.each(function (node) {
        e.diagram.remove(node);
      });
      floorplan.angleNodes.clear();

      floorplan.commitTransaction('remove dimension links and angle nodes');
      floorplan.skipsUndoManager = false;
      floorplan.updateWallDimensions();
      floorplan.updateWallAngles();
    });

    // if user deletes a wall, update rooms
    this.addDiagramListener('SelectionDeleted', function (e) {
      const wrt = e.diagram.toolManager.findTool('WallReshaping') as WallReshapingTool;
      wrt.joinAllColinearWalls();
      wrt.splitAllWalls();
      wrt.performAllMitering();

      // also update rooms
      const deletedParts: go.Set<go.Part> = e.subject as go.Set<go.Part>;
      // make sure to get all the walls that were just deleted, so updateAllRoomBoundaries knows about what change triggered it
      const walls: go.Set<go.Group> = new go.Set<go.Group>();
      deletedParts.iterator.each(function (p) {
        if (p instanceof go.Group && p.data.category === 'Wall') {
          const w: go.Group = p as go.Group;
          walls.add(w);
        }
      });

      const fp: Floorplan = e.diagram as Floorplan;
      fp.updateAllRoomBoundaries(walls);
    });

    // Node Templates
    this.nodeTemplateMap = nodeTemplateMap;

    // Group Templates
    this.groupTemplateMap.add('', makeDefaultGroup()); // Default Group
    this.groupTemplateMap.add('Wall', Wall); // Wall Group

    // Install Custom Tools: Wall Building Tool, Wall Reshaping Tool
    const wallBuildingTool = new WallBuildingTool();
    this.toolManager.mouseDownTools.insertAt(0, wallBuildingTool);

    const wallReshapingTool = new WallReshapingTool();
    this.toolManager.mouseDownTools.insertAt(3, wallReshapingTool);
    wallBuildingTool.isEnabled = false;

    // const nodeLabelDraggingTool = new NodeLabelDraggingTool();
    // this.toolManager.mouseMoveTools.insertAt(3, nodeLabelDraggingTool);

    /*
     * Tool Overrides
     */

    // If a wall was dragged to intersect another wall, update angle displays
    this.toolManager.draggingTool.doDeactivate = function () {
      const fp: Floorplan = this.diagram as Floorplan;

      fp.updateWallAngles();
      this.isGridSnapEnabled = this.diagram.model.modelData.preferences.gridSnap;
      // maybe recalculate rooms, if dragging a wall
      let selectedWall: go.Group | null | undefined = null;
      fp.selection.iterator.each(function (p: go.Part) {
        if (p.category === 'Wall' && selectedWall == null) {
          const w: go.Group = p as go.Group;
          selectedWall = w;
        } else if (p.category === 'Wall' && selectedWall !== null) {
          // only worry about selectedWall if there is a single selected wall (cannot drag multiple walls at once)
          selectedWall = undefined;
        }
      });
      if (selectedWall) {
        const selWallSet = new go.Set<go.Group>();
        selWallSet.add(selectedWall);

        fp.updateAllRoomBoundaries(selWallSet);
        const wrt = fp.toolManager.findTool('WallReshaping') as WallReshapingTool;
        wrt.performMiteringOnWall(selectedWall);
        fp.updateWall(selectedWall);
      }

      go.DraggingTool.prototype.doDeactivate.call(this);
    };

    // If user holds SHIFT while dragging, do not use grid snap
    this.toolManager.draggingTool.doMouseMove = function () {
      if (this.diagram.lastInput.shift) {
        this.isGridSnapEnabled = false;
      } else this.isGridSnapEnabled = this.diagram.model.modelData.preferences.gridSnap;
      go.DraggingTool.prototype.doMouseMove.call(this);
    };

    // When resizing, constantly update the node info box with updated size info; constantly update Dimension Links
    this.toolManager.resizingTool.doMouseMove = function () {
      const floorplan: Floorplan = this.diagram as Floorplan;
      floorplan.updateWallDimensions();
      go.ResizingTool.prototype.doMouseMove.call(this);
    };

    // When resizing a wallPart, do not allow it to be resized past the nearest wallPart / wall endpoints
    this.toolManager.resizingTool.computeMaxSize = function () {
      const adornedObject = this.adornedObject;
      if (adornedObject !== null) {
        const obj = adornedObject.part;
        let wall: go.Group | null = null;
        if (obj !== null) {
          wall = this.diagram.findPartForKey(obj.data.group) as go.Group;
        }
        if (
          wall !== null &&
          obj !== null &&
          (obj.category === 'Door' || obj.category === 'Window')
        ) {
          let stationaryPt = new go.Point();
          let movingPt = new go.Point();
          let resizeAdornment: go.Adornment | null = null;
          const oItr = obj.adornments.iterator;
          while (oItr.next()) {
            const adorn: go.Adornment = oItr.value;
            if (adorn.name === 'WallPartResizeAdornment') {
              resizeAdornment = adorn;
            }
          }
          if (resizeAdornment !== null) {
            const rItr = resizeAdornment.elements.iterator;
            while (rItr.next()) {
              const el: go.GraphObject = rItr.value;
              const handle: go.GraphObject | null = this.handle;
              if (handle !== null) {
                if (el instanceof go.Shape && el.alignment === handle.alignment) {
                  movingPt = el.getDocumentPoint(go.Spot.Center);
                }
                if (el instanceof go.Shape && el.alignment !== handle.alignment) {
                  stationaryPt = el.getDocumentPoint(go.Spot.Center);
                }
              }
            }
          }
          // find the constrainingPt; that is, the endpoint (wallPart endpoint or wall endpoint)
          // that is the one closest to movingPt but still farther from stationaryPt than movingPt
          // this loop checks all other wallPart endpoints of the wall that the resizing wallPart is a part of
          let constrainingPt;
          let closestDist = Number.MAX_VALUE;
          wall.memberParts.iterator.each(function (part: go.Part) {
            if (part.data.key !== obj.data.key) {
              const endpoints = getWallPartEndpoints(part);
              for (let i: number = 0; i < endpoints.length; i++) {
                const point = endpoints[i];
                const distanceToMovingPt = Math.sqrt(point.distanceSquaredPoint(movingPt));
                if (distanceToMovingPt < closestDist) {
                  const distanceToStationaryPt = Math.sqrt(
                    point.distanceSquaredPoint(stationaryPt)
                  );
                  if (distanceToStationaryPt > distanceToMovingPt) {
                    closestDist = distanceToMovingPt;
                    constrainingPt = point;
                  }
                }
              }
            }
          });
          // if we're not constrained by a wallPart endpoint, the constraint will come from a wall endpoint; figure out which one
          if (constrainingPt === undefined || constrainingPt === null) {
            if (
              wall.data.startpoint.distanceSquaredPoint(movingPt) >
              wall.data.startpoint.distanceSquaredPoint(stationaryPt)
            )
              constrainingPt = wall.data.endpoint;
            else constrainingPt = wall.data.startpoint;
          }
          // set the new max size of the wallPart according to the constrainingPt
          let maxLength: number = 0;
          if (stationaryPt !== null) {
            maxLength = Math.sqrt(stationaryPt.distanceSquaredPoint(constrainingPt));
          }
          return new go.Size(maxLength, wall.data.thickness);
        }
      }
      return go.ResizingTool.prototype.computeMaxSize.call(this);
    };

    this.toolManager.draggingTool.isGridSnapEnabled = true;
  } // end Floorplan constructor

  /**
   * Convert num number of pixels (document units) to units, using the adjustable conversion factor stored in modeldata
   * @param {number} num This is in document units (colloquially, if inaccurately, referred to as "pixels")
   * @return {number}
   */
  public convertPixelsToUnits(num: number): number {
    const factor: number = this.model.modelData.unitsConversionFactor;
    return num * factor;
  }

  /**
   * Take a number of units, convert to cm, then divide by 2, (1px = 2cm, change this if you want to use a different paradigm)
   * @param {number} num This is in document units (colloquially, if inaccurately, referred to as "pixels")
   * @return {number}
   */
  public convertUnitsToPixels(num: number): number {
    const factor: number = this.model.modelData.unitsConversionFactor;
    return num / factor;
  }

  /**
   * @param units string
   */
  protected getUnitsAbbreviation(units: string): string {
    switch (units) {
      case 'centimeters':
        return 'cm';
      case 'meters':
        return 'm';
      case 'inches':
        return 'in';
      case 'feet':
        return 'ft';
    }
    return units;
  }

  /**
   * Convert a number of oldUnits to newUnits
   * @param {string} oldUnits cm | m | ft | in
   * @param {string} newUnits cm | m | ft | in
   * @param {number} num The number of old units to convert to new ones
   * @return {number} The number of new units
   */
  public convertUnits(oldUnits: string, newUnits: string, num: number): number {
    let newNum: number = num;
    oldUnits = this.getUnitsAbbreviation(oldUnits);
    newUnits = this.getUnitsAbbreviation(newUnits);
    switch (oldUnits) {
      case 'cm': {
        switch (newUnits) {
          case 'm': {
            newNum *= 0.01;
            break;
          }
          case 'ft': {
            newNum *= 0.0328084;
            break;
          }
          case 'in': {
            newNum *= 0.393701;
            break;
          }
        }
        break;
      } // end cm oldUnits case
      case 'm': {
        switch (newUnits) {
          case 'cm': {
            newNum *= 100;
            break;
          }
          case 'ft': {
            newNum *= 3.28084;
            break;
          }
          case 'in': {
            newNum *= 39.3701;
            break;
          }
        }
        break;
      } // end m oldUnits case
      case 'ft': {
        switch (newUnits) {
          case 'cm': {
            newNum *= 30.48;
            break;
          }
          case 'm': {
            newNum *= 0.3048;
            break;
          }
          case 'in': {
            newNum *= 12;
            break;
          }
        }
        break;
      } // end ft oldUnits case
      case 'in': {
        switch (newUnits) {
          case 'cm': {
            newNum *= 2.54;
            break;
          }
          case 'm': {
            newNum *= 0.0254;
            break;
          }
          case 'ft': {
            newNum *= 0.0833333;
            break;
          }
        }
        break;
      } // end in oldUnitsCase
    }
    return newNum;
  }

  public makeDefaultFurniturePaletteNodeData(): Array<any> {
    return FURNITURE_NODE_DATA_ARRAY;
  }

  public makeDefaultWallpartsPaletteNodeData(): Array<any> {
    return WALLPARTS_NODE_DATA_ARRAY;
  }

  /**
   * Turn on wall building tool, set WallBuildingTool.isBuildingDivider to false
   */
  public enableWallBuilding(): void {
    const wallBuildingTool = this.toolManager.findTool('WallBuilding') as WallBuildingTool;
    wallBuildingTool.isBuildingDivider = false;
    const wallReshapingTool = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
    wallBuildingTool.isEnabled = true;
    wallReshapingTool.isEnabled = false;
    this.currentCursor = 'crosshair';

    // clear resize adornments on walls/windows, if there are any
    this.nodes.iterator.each(function (n) {
      n.clearAdornments();
    });
    this.clearSelection();
  }

  /**
   * Turn on wall building tool, set WallBuildingTool.isBuildingDivider to true
   */
  public enableDividerBuilding(): void {
    const wallBuildingTool: WallBuildingTool = this.toolManager.findTool(
      'WallBuilding'
    ) as WallBuildingTool;
    this.enableWallBuilding();
    wallBuildingTool.isBuildingDivider = true;
    this.currentCursor = 'crosshair';
  }

  /**
   * Turn off wall building tool
   */
  public disableWallBuilding(): void {
    const wallBuildingTool = this.toolManager.findTool('WallBuilding') as WallBuildingTool;
    const wallReshapingTool = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
    wallBuildingTool.isEnabled = false;
    wallReshapingTool.isEnabled = true;
    wallBuildingTool.isBuildingDivider = false;
    this.currentCursor = '';

    // clear resize adornments on walls/windows, if there are any
    this.nodes.iterator.each(function (n) {
      n.clearAdornments();
    });
    this.clearSelection();
  }

  /**
   * Called when a checkbox in the options window is changed.
   * Perform the appropriate changes to model data.
   * @param checkboxId The string id of the HTML checkbox element that's been changed
   */
  public checkboxChanged(checkboxId: string): void {
    this.skipsUndoManager = true;
    this.startTransaction('change preference');
    const element: HTMLInputElement = document.getElementById(checkboxId) as HTMLInputElement;
    switch (checkboxId) {
      case 'showGridCheckbox': {
        this.grid.visible = element.checked;
        this.model.modelData.preferences.showGrid = element.checked;
        break;
      }
      case 'gridSnapCheckbox': {
        this.toolManager.draggingTool.isGridSnapEnabled = element.checked;
        this.model.modelData.preferences.gridSnap = element.checked;
        break;
      }
      case 'wallGuidelinesCheckbox':
        this.model.modelData.preferences.showWallGuidelines = element.checked;
        break;
      case 'wallLengthsCheckbox':
        this.model.modelData.preferences.showWallLengths = element.checked;
        this.updateWallDimensions();
        break;
      case 'wallAnglesCheckbox':
        this.model.modelData.preferences.showWallAngles = element.checked;
        this.updateWallAngles();
        break;
      case 'onlySmallWallAnglesCheckbox': {
        this.model.modelData.preferences.showOnlySmallWallAngles = element.checked;
        this.updateWallAngles();
        break;
      }
    }
    this.commitTransaction('change preference');
    this.skipsUndoManager = false;
  }

  /**
   * Change the grid size being used for the Floorplan.
   * @param gridSizeInput The input that contains the grid size to use
   */
  public changeGridSize(gridSizeInput: HTMLInputElement): void {
    this.skipsUndoManager = true;
    this.startTransaction('change grid size');
    let inputVal: number = 0;
    if (
      !isNaN(parseFloat(gridSizeInput.value)) &&
      gridSizeInput.value != null &&
      gridSizeInput.value !== '' &&
      gridSizeInput.value !== undefined &&
      parseFloat(gridSizeInput.value) > 0
    )
      inputVal = parseFloat(gridSizeInput.value);
    else {
      gridSizeInput.value = this.convertPixelsToUnits(10).toString(); // if bad input given, revert to 20cm (10px) or unit equivalent
      inputVal = parseFloat(gridSizeInput.value);
    }
    inputVal = this.convertUnitsToPixels(inputVal);
    this.grid.gridCellSize = new go.Size(inputVal, inputVal);
    // fp.toolManager.draggingTool.gridCellSize = new go.Size(inputVal, inputVal);
    this.model.setDataProperty(this.model.modelData, 'gridSize', inputVal);
    this.commitTransaction('change grid size');
    this.skipsUndoManager = false;
  }

  /**
   * Get the side of a wall (1 or 2) to use as the room boundary
   * @param {go.Group} w
   * @param {go.Point} ip
   * @return {number}
   */
  private getCounterClockwiseWallSide(w: go.Group, ip: go.Point): number {
    const wrt = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
    // these are the mitering point data properties of the wall opposite from the intersection point
    let prop1: string | null = null;
    let prop2: string | null = null;

    // If intersection point (ip) is wall (w)'s data.endpoint, prop1 = smpt1, prop2 = smpt2
    if (wrt.pointsApproximatelyEqual(w.data.endpoint, ip)) {
      prop1 = 'smpt1';
      prop2 = 'smpt2';
    } else {
      prop1 = 'empt1';
      prop2 = 'empt2';
    }

    const A: go.Point = ip;
    const B: go.Point = w.data[prop2];
    const C: go.Point = w.data[prop1];

    // A = intersection point, B = w.data[prop1], C = w.data.[prop2]
    // if AC is counterclockwise of AB, return 2; else return 1
    function isClockwise(a: go.Point, b: go.Point, c: go.Point) {
      const bool: boolean = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0;
      return bool;
    }

    if (!isClockwise(A, B, C)) {
      return 1;
    } else return 2;
  }

  /**
   * Returns the intersection point between the two lines.
   * Lines are implied by two endpoints each.
   * @param {go.Point} a1 Point Endpoint 1 of line A
   * @param {go.Point} a2 Point Endpoint 2 of line A
   * @param {go.Point} b1 Point Endpoint 1 of line B
   * @param {go.Point} b2 Point Endpoint 2 of line B
   * @return {go.Point | null}
   */
  public getLinesIntersection(
    a1: go.Point,
    a2: go.Point,
    b1: go.Point,
    b2: go.Point
  ): go.Point | null {
    const am: number = (a1.y - a2.y) / (a1.x - a2.x); // slope of line 1
    const bm: number = (b1.y - b2.y) / (b1.x - b2.x); // slope of line 2

    // Line A is vertical
    if (am === Infinity || am === -Infinity) {
      const ipx: number = a1.x;
      // line B y-intercept
      const bi: number = -1 * (bm * b1.x - b1.y);
      // Solve for line B's y at x=ipx
      const ipy: number = bm * ipx + bi;
      return new go.Point(ipx, ipy);
    }
    // Line B is vertical
    if (bm === Infinity || bm === -Infinity) {
      const ipx: number = b1.x;
      // line A y-intercept
      const ai: number = -1 * (am * a1.x - a1.y);
      // Solve for line A's y at x=ipx
      const ipy: number = am * ipx + ai;
      return new go.Point(ipx, ipy);
    }

    if (Math.abs(am - bm) < Math.pow(2, -52)) {
      return null;
    } else {
      const ipx: number = (am * a1.x - bm * b1.x + b1.y - a1.y) / (am - bm);
      const ipy: number = (am * bm * (b1.x - a1.x) + bm * a1.y - am * b1.y) / (bm - am);
      const ip: go.Point = new go.Point(ipx, ipy);
      return ip;
    }
  }

  /**
   * Update the geometries of all rooms in the floorplan. This is called when a wall is added or reshaped or deleted
   * @param {go.Set<go.Group>} changedWalls This is the set of walls that was just added / updated / removed. Often this is a single element
   */
  public updateAllRoomBoundaries(changedWalls: go.Set<go.Group>): void {
    const wrt = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
    const rooms: go.Iterator<go.Node> = this.findNodesByExample({ category: 'Room' });
    // rooms to remove
    const garbage: Array<go.Node> = [];

    rooms.iterator.each((r: go.Node) => {
      // do this until you've tried all wall intersections for the room OR the room boundaries have been successfully updated
      let boundsFound: boolean = false;
      let triedAllIntersections: boolean = false;
      const seenW1: go.Set<go.Group> = new go.Set<go.Group>(); // the walls that have been used as w1 (later)

      while (!boundsFound && !triedAllIntersections) {
        // find a point "pt" that will definitely be in the room implied by the r.boundaryWalls (if the area is still enclosed)
        // to do so, find 2 boundaryWalls that are connected and get a point just outside their intersection (along the proper mitering side)
        // Note: Neither of these 2 walls may be in "changedWalls" (the walls that were added / modified)
        // The first of these walls must still be valid (i.e. it was not split or joined with another wall in the action that triggered this function)
        const bw: Array<any> = r.data.boundaryWalls;
        let e1 = null;
        let e2 = null; // entries that represent wall / mitering side pairs to use to find pt
        for (let i = 0; i < bw.length + 1; i++) {
          const entry = bw[i % bw.length];
          const wk: string = entry[0];
          const ww: go.Group = this.findNodeForKey(wk) as go.Group;
          if (ww === null) continue;
          if (!changedWalls.contains(ww) && !seenW1.contains(ww)) {
            if (e1 === null) {
              e1 = entry;
            } else if (e1 !== null && e2 === null) {
              e2 = entry;
            }
          } else if (e1 !== null && e2 === null) {
            e2 = entry;
          } else if (e1 === null) {
            e1 = null;
            e2 = null;
          }
        }

        // with these 2 entries (walls / mitering sides), we now get a point that would definitely be in the room (if the area is still enclosed)
        // first, get the segments implied by mitering sides of the walls
        let w1: go.Group | null = null;
        let w2: go.Group | null = null;
        let s1: number | null = null;
        let s2: number | null = null;
        if (e1 !== null && e2 !== null) {
          w1 = this.findNodeForKey(e1[0]) as go.Group;
          s1 = e1[1];
          w2 = this.findNodeForKey(e2[0]) as go.Group;
          s2 = e2[1];
        } else {
          triedAllIntersections = true;
          continue;
        }

        if (e1 !== null && w1 !== null) {
          seenW1.add(w1);
        }

        const w1s: go.Point = w1.data['smpt' + s1];
        const w1e: go.Point = w1.data['empt' + s1];
        const w2s: go.Point = w2.data['smpt' + s2];
        const w2e: go.Point = w2.data['empt' + s2];
        // at which point do these 2 wall sides intersect?
        const ip: go.Point | null = this.getSegmentsIntersection(w1s, w1e, w2s, w2e);
        if (ip === null) {
          continue;
        }

        // the prop name of the point on the other mitering side of ip. we'll use this to get the angle of the intersection
        const w1os: number = s1 === 1 ? 2 : 1;
        // let prop: string = wrt.pointsApproximatelyEqual(ip, w1s) ? "smpt" + w1os : "empt" + w1os;
        const distToS = ip.distanceSquaredPoint(w1.data['smpt' + w1os]);
        const distToE = ip.distanceSquaredPoint(w1.data['empt' + w1os]);
        // which other side pt is closer to ip? That's the oip
        const oip: go.Point = distToS <= distToE ? w1.data.startpoint : w1.data.endpoint;

        const ang: number = oip.directionPoint(ip);
        const newPt: go.Point = wrt.translateAndRotatePoint(ip, ang - 90, 0.5);

        boundsFound = this.maybeAddRoomNode(newPt, r.data.floorImage, r);
      }

      // if the room boundaries are never found, this room must be removed
      if (!boundsFound) {
        garbage.push(r);
      }
    });

    for (let i = 0; i < garbage.length; i++) {
      this.remove(garbage[i]);
    }

    // ensure proper room position by updating target bindings
    this.updateAllTargetBindings(); // ??
  }

  /**
   * Tries to add a Room Node from a given point.
   * The point must be enclosed by walls.
   * @param {go.Point} pt
   * @param {string} floorImage The image relative path to use as the Pattern brush for the room's flooring
   * @param {go.Node} roomToUpdate Optional. If this is provided, the walls found for the area will be assigned to this room node
   * @return {boolean} Whether or not the pt is enclosed by room boundaries
   */
  public maybeAddRoomNode(
    pt: go.Point,
    floorImage: string,
    roomToUpdate?: go.Node | null
  ): boolean {
    if (roomToUpdate === undefined || roomToUpdate === null) {
      roomToUpdate = null;
    }

    // if the pt is on a Room or Wall, do nothing
    const walls: go.Iterator<go.Group> = this.findNodesByExample({
      category: 'Wall'
    }) as go.Iterator<go.Group>;
    let isPtOnRoomOrWall: boolean = false;
    // make sure "pt" is not inside a wall or room node. If it is, do not run this function
    walls.iterator.each((w: go.Group) => {
      if (fpUtils.isPointInWall(w, pt)) isPtOnRoomOrWall = true;
    });
    const rooms: go.Iterator<go.Node> = this.findNodesByExample({
      category: 'Room'
    }) as go.Iterator<go.Node>;
    rooms.iterator.each((r: go.Node) => {
      if (
        roomToUpdate === null ||
        (roomToUpdate !== null &&
          roomToUpdate !== undefined &&
          roomToUpdate.data.key !== r.data.key)
      ) {
        const isInRoom: boolean = fpUtils.isPointInRoom(r, pt, this);
        if (isInRoom) {
          // Edge: it's possible we're within the polygon created by the rooms boundary walls, but over one of its holes
          // if so, we may still be able to make new room here
          let isPtInHole: boolean = false;
          for (let i: number = 0; i < r.data.holes.length; i++) {
            const hole: Array<any> = r.data.holes[i];
            const polygon: go.List<go.Point> | null = fpUtils.makePolygonFromRoomBoundaries(
              hole,
              this
            );
            if (polygon !== null && fpUtils.isPointInPolygon(polygon.toArray(), pt)) {
              isPtInHole = true;
            }
          }

          if (!isPtInHole) {
            isPtOnRoomOrWall = true;
          }
        }
      }
    });
    if (isPtOnRoomOrWall) {
      return false;
    }

    // get thr boundary walls for the room
    const boundaryWalls = this.getRoomWalls(pt);
    if (boundaryWalls === null) {
      return false;
    }

    // also include holes in room
    const holes: Array<Array<any>> = this.findRoomHoles(boundaryWalls, pt);

    // check if this is an update or add op
    if (roomToUpdate !== null) {
      this.startTransaction('update room boundaryWalls and holes');
      this.model.setDataProperty(roomToUpdate.data, 'boundaryWalls', boundaryWalls);
      this.model.setDataProperty(roomToUpdate.data, 'holes', holes);
      this.commitTransaction('update room boundaryWalls and holes');
    } else {
      if (floorImage === null || floorImage === undefined) {
        floorImage = 'floor1.jpg';
      }
      const roomData = {
        key: 'Room',
        category: 'Room',
        name: 'Room Name',
        boundaryWalls: boundaryWalls,
        holes: holes,
        floorImage: floorImage,
        showLabel: true,
        showFlooringOptions: true
      };
      this.model.addNodeData(roomData);
      roomToUpdate = this.findPartForData(roomData) as go.Node;
    }
    this.updateRoom(roomToUpdate);
    return true;
  }

  /**
   * Returns a specially formatted array that represents the boundaries of a room.
   * These boundaries are the walls enclosing the room, which must include the given point
   * The array is formatted with entries [wall, mitering side]
   * @param {go.Point} pt
   * @return {Array<any>}
   */
  public getRoomWalls(pt: go.Point): Array<any> | null {
    // get the all the walls, in order from closest to farthest, the line from pt upwards would hit
    const walls: go.Iterator<go.Group> = this.findNodesByExample({
      category: 'Wall'
    }) as go.Iterator<go.Group>;
    const oPt: go.Point = new go.Point(pt.x, pt.y - 10000);
    const wallsDistArr: Array<any> = []; // array of wall/dist pairs [[wallA, 15], [wallB, 30]] -- this makes sorting easier than if we were using a Map
    walls.iterator.each((w) => {
      const ip: go.Point | null = this.getSegmentsIntersection(
        pt,
        oPt,
        w.data.startpoint,
        w.data.endpoint
      );
      if (ip !== null) {
        const dist: number = Math.sqrt(ip.distanceSquaredPoint(pt));
        wallsDistArr.push([w, dist]);
      }
    });

    // sort all walls the line from pt to oPt intersects, in order of proximity to pt
    wallsDistArr.sort(function (a, b) {
      const distA: number = a[1];
      const distB: number = b[1];
      if (distA === distB) return 0;
      else if (distA < distB) return -1;
      else return 1;
    });

    // helper function -- copies a "path" (list of walls) up to a certain wall node
    const selectivelyCopyPath = (path: Array<any>, nodeToStopAt: go.Node) => {
      const p = new Array<Array<any>>();
      let copyNoMore: boolean = false;
      for (let i: number = 0; i < path.length; i++) {
        const entry = path[i];
        const wk: string = entry[0];
        const w: go.Group = this.findNodeForKey(wk) as go.Group;
        const side: number = entry[1];
        if (!copyNoMore) {
          p.push([w.data.key, side]);
          if (w.data.key === nodeToStopAt.data.key) {
            copyNoMore = true;
          }
        }
      }

      return p;
    };

    /**
     * Recursively walk counter-clockwise along all walls connected to firstWall until you get back to first wall
     * @param {go.Group | null} wall
     * @param {Array<any>} path
     * @param {go.Set<Array<any>>} possiblePaths
     * @param {go.Set<go.Group> | null} seenWalls
     * @param {go.Group} origWall
     * @param {go.Point | null} prevPt
     * @return {go.Set<Array<any>>}
     */
    const recursivelyFindPaths = (
      wall: go.Group,
      path: Array<any> | null,
      possiblePaths: go.Set<Array<any>>,
      seenWalls: go.Set<go.Group> | null,
      origWall: go.Group,
      prevPt: go.Point | null
    ): go.Set<Array<any>> | null => {
      if (wall === null) {
        return null;
      }

      if (seenWalls === undefined || seenWalls === null) {
        seenWalls = new go.Set<go.Group>();
      }
      seenWalls.add(wall);

      // find which wall endpoint has angle between 180 and 270 from the right
      const wrt = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
      const sPt: go.Point = wall.data.startpoint;
      const ePt: go.Point = wall.data.endpoint;
      const mpt: go.Point = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
      const sa: number = mpt.directionPoint(sPt); // angle from mpt to spt
      let ip: go.Point; // intersection point
      // let op: go.Point; // other point
      if (prevPt === undefined || prevPt === null) {
        ip = sa >= 90 && sa <= 270 ? sPt : ePt; // cc point
        // op = sa >= 90 && sa <= 270 ? ePt : sPt;
      } else {
        ip = wrt.pointsApproximatelyEqual(sPt, prevPt) ? ePt : sPt;
        // op = wrt.pointsApproximatelyEqual(sPt, prevPt) ? sPt : ePt;
      }

      // get all walls at ip
      const ccWalls: go.List<go.Group> = wrt.getAllWallsAtIntersection(ip, true);

      // sort these walls based on their clockwise angle, relative to wall
      // sort all involved walls in any clockwise order
      ccWalls.sort((a: go.Group, b: go.Group) => {
        // fp.sortWallsClockwise(a,b);
        const B: go.Point | null = this.getWallsIntersection(a, b);
        if (B === null) return 0;
        const as: go.Point = a.data.startpoint;
        const ae: go.Point = a.data.endpoint;
        const bs: go.Point = b.data.startpoint;
        const be: go.Point = b.data.endpoint;
        const A: go.Point = wrt.pointsApproximatelyEqual(ip, as) ? ae : as;
        const C: go.Point = wrt.pointsApproximatelyEqual(ip, bs) ? be : bs;

        const angA: number = B.directionPoint(A);
        const angB: number = B.directionPoint(C);
        if (angA > angB) return 1;
        else if (angA < angB) return -1;
        else return 0;
      });

      // offset the intersection walls (maintain relative order) s.t. wall "wall" is first
      const intersectionWalls: Array<go.Group> = ccWalls.toArray();
      const intersectionWallsReordered: Array<go.Group> = [];

      let j: number = intersectionWalls.indexOf(wall);
      for (let i: number = 0; i < intersectionWalls.length; i++) {
        const w: go.Group = intersectionWalls[j];
        intersectionWallsReordered.push(w);
        j = (j + 1) % intersectionWalls.length;
      }

      ccWalls.clear();
      for (let i: number = 0; i < intersectionWallsReordered.length; i++) {
        const w: go.Group = intersectionWallsReordered[i];
        ccWalls.add(w);
      }

      ccWalls.iterator.each((w: go.Group) => {
        // failsafe
        if (w === undefined || w === null) {
          possiblePaths = new go.Set<any>();
          return possiblePaths;
        }

        // Base case : if we've found our way back to originalWall (add path to possiblePaths)
        if (
          (w.data.key === origWall.data.key || ccWalls.contains(origWall)) &&
          wall.data.key !== origWall.data.key
        ) {
          if (path !== null) {
            possiblePaths.add(path);
          }
        } else if (seenWalls !== null && !seenWalls.contains(w)) {
          // define path as all walls that came up until this wall
          if (path === undefined || path === null) {
            path = [];
            // First wall is special case; just find out which mitering side is closer to the original point used for this room construction
            // get intersection point from pt-oPt each of walls's mitering sides

            // It's possible pt-oPt does not intersect one or both of the actual segments making up the mitering sides of wall,
            // so use the lines implied by the mitering points, not just finite segments
            const ip1: go.Point | null = this.getLinesIntersection(
              pt,
              oPt,
              wall.data.smpt1,
              wall.data.empt1
            );
            const ip2: go.Point | null = this.getLinesIntersection(
              pt,
              oPt,
              wall.data.smpt2,
              wall.data.empt2
            );

            if (ip1 !== null && ip2 !== null) {
              // whichever mitering side pt-oPt strikes first (which intersection point is closer to pt) is the one to start with
              const dist1: number = Math.sqrt(ip1.distanceSquaredPoint(pt));
              const dist2: number = Math.sqrt(ip2.distanceSquaredPoint(pt));
              const side1: number = dist1 < dist2 ? 1 : 2;
              path.push([wall.data.key, side1]);
            }
          } else {
            path = selectivelyCopyPath(path, wall);
          }

          // get the "side" of the wall to use for the room boundary (side 1 or side 2, as defined by the mitering points in data)
          const side: number = this.getCounterClockwiseWallSide(w, ip);

          // add w to path
          path.push([w.data.key, side]);
          recursivelyFindPaths(w, path, possiblePaths, seenWalls, origWall, ip);
        }
      });

      return possiblePaths;
    }; // end recursivelyFindPaths

    // iterate over these ordered walls until one allows for us to identify the room boundaries
    // if none of these walls allow for that, "pt" is not enclosed by walls, so there is no room
    let roomOuterBoundaryPts: null | go.List<go.Point> = null;
    let roomOuterBoundaryPath: null | Array<any> = null; // an array with entries [[wall, side], [wall, side]...]
    for (let i: number = 0; i < wallsDistArr.length; i++) {
      const entry = wallsDistArr[i];
      const w: go.Group = entry[0];

      // I'm pretty sure the first possbilePath is always the right one
      // This is an ordered path of all the walls that make up this room. It's  Map, where keys are walls and values are the wall sides used for room boundaries (1 or 2)
      let path = new Array<any>();
      let possiblePaths: go.Set<any> | null = new go.Set<any>();
      possiblePaths = recursivelyFindPaths(w, null, possiblePaths, null, w, null);
      if (possiblePaths === null || possiblePaths.count === 0) continue; // no path
      path = possiblePaths.first();

      // construct a polygon (Points) from this path
      const polygon: go.List<go.Point> | null = fpUtils.makePolygonFromRoomBoundaries(path, this);

      if (polygon !== null) {
        // make sure none of the walls in "path" have an endpoint inside the resulting polygon (this means an internal wall is included, those are dealt with later)
        let pathIncludesInternalWall: boolean = false;
        for (let j: number = 0; j < path.length; j++) {
          const e = path[j];
          const wwk: string = e[0];
          const ww: go.Group = this.findNodeForKey(wwk) as go.Group;
          const ept: go.Point = ww.data.endpoint;
          const spt: go.Point = ww.data.startpoint;
          if (
            fpUtils.isPointInPolygon(polygon.toArray(), ept) ||
            fpUtils.isPointInPolygon(polygon.toArray(), spt)
          ) {
            pathIncludesInternalWall = true;
          }
        }

        // make sure "pt" is enclosed by the polygon -- if so, these are the outer room bounds
        if (fpUtils.isPointInPolygon(polygon.toArray(), pt) /*&& !pathIncludesInternalWall*/) {
          roomOuterBoundaryPts = polygon;
          roomOuterBoundaryPath = path;
          break;
        }
      }
    }

    // if we've found outer room boundary pts, we now need to account for some edge cases
    // 1) Be sure to include "internal" walls in room boundaries (walls inside the room that connect to an outer boundary wall)
    // 2) "Holes" -- walls / rooms inside these outer boundaries that do not connect to an outer boundary wall
    if (roomOuterBoundaryPts !== null) {
      // check if there are any walls with an endpoint in the room's outer boundaries polygon.
      // If so, update room's boundaryWalls data and geometry to add those internal wall(s)
      const newRoomBoundaryWalls: Array<any> = this.addInternalWallsToRoom(
        roomOuterBoundaryPts,
        roomOuterBoundaryPath!
      );
      // let newRoomBoundaryWalls = roomOuterBoundaryPath;

      return newRoomBoundaryWalls;
    } else {
      return null;
    }
  }

  /**
   * Sort a list of walls in clockwise order, relative to a given wall (that given wall will be the first element of the returned list)
   * @param {go.List<go.Group>} walls The list to sort
   * @param {go.Group} wall The reference wall
   * @return {go.List<go.Group>}
   */
  public sortWallsClockwiseWithSetStartWall(
    walls: go.List<go.Group>,
    wall: go.Group
  ): go.List<go.Group> {
    walls.sort((a, b) => {
      return fpUtils.sortWallsClockwise(a, b, this);
    });

    // offset the intersection walls (maintain relative order) s.t. wall "wall" is first
    const intersectionWalls: Array<go.Group> = walls.toArray();
    const intersectionWallsReordered: Array<go.Group> = [];

    let j: number = intersectionWalls.indexOf(wall);
    for (let i: number = 0; i < intersectionWalls.length; i++) {
      const w: go.Group = intersectionWalls[j];
      intersectionWallsReordered.push(w);
      j = (j + 1) % intersectionWalls.length;
    }

    walls.clear();
    for (let i: number = 0; i < intersectionWallsReordered.length; i++) {
      const w: go.Group = intersectionWallsReordered[i];
      walls.add(w);
    }

    return walls;
  }

  /**
   * Returns updated room boundaries to include any internal walls to a room's geometry (if there are any)
   * @param {go.List<go.Point>} roomOuterBoundaryPts a Set of go.Points that describe the outer boundaries of a room
   * @param {Array<any>} roomOuterBoundaryPath an Array that describes the outer boundary walls of a room
   *  entries in the form of [[wall, side], [wall, side]...]
   * @return {Array<any>}
   */
  public addInternalWallsToRoom(
    roomOuterBoundaryPts: go.List<go.Point>,
    roomOuterBoundaryPath: Array<any>
  ): Array<any> {
    const fp: Floorplan = this as Floorplan;
    const walls: go.Iterator<go.Group> = fp.findNodesByExample({
      category: 'Wall'
    }) as go.Iterator<go.Group>;
    const offendingWalls: go.Set<go.Group> = new go.Set<go.Group>();
    walls.iterator.each(function (w: go.Group) {
      // if (!w.data.isDivider) {
      const s: go.Point = w.data.startpoint;
      const e: go.Point = w.data.endpoint;
      if (
        fpUtils.isPointInPolygon(roomOuterBoundaryPts.toArray(), s) ||
        fpUtils.isPointInPolygon(roomOuterBoundaryPts.toArray(), e)
      ) {
        offendingWalls.add(w);
      }
      // }
    });

    /**
     * Recursively finds all internal walls that eventually tie back to an initial intersection point along a room boundary wall
     * Returned path is an array with entries in the form of <wall key><wall side> (i.e. [ wallA1, wallB1, wallB2, wallA2 ] )
     * @param {go.Group} wall The current wall we're at
     * @param {go.List<go.Group>} iwalls Walls with an endpoint at ip
     * @param {go.Point} ip The current intersection point
     * @param {go.Set<string>} seenIp Set of pairs of stringified Points / wall keys that represent intersection points
     *   we're already accounting (from a specific wall) for somewhere in the stack
     *   Note: you may encounter the same intersection point from a different wall (if there is a cycle in this cluster)
     * @param {Array<any>} path Array of 2 entry arrays, [[wall, number], [wall, number]] (representing walls and sides of walls)
     * @param {go.Group} bw1 Boundary wall 1 -- the first boundary wall this cluster intersects
     * @param {go.Group} bw2 Boundary wall 2 -- when we reach this wall, we're done
     * @return {Array<any>} The internal cluster path
     */
    function recursivelyFindClusterPath(
      wall: go.Group,
      iwalls: go.List<go.Group>,
      ip: go.Point,
      seenIp: go.Set<string>,
      path: Array<any>,
      bw1: go.Group,
      bw2: go.Group
    ): Array<any> {
      seenIp.add(go.Point.stringify(ip)); // remember we've handled this intersection point

      iwalls.iterator.each(function (fw) {
        // fw = "first" wall in intersection walls (that's not "wall"). This is always the wall immediately counterclockwise of wall
        if (fw.data.key !== wall.data.key) {
          // if fw is bw2, return path, we're done
          if (fw.data.key === bw2.data.key) {
            if (path.indexOf('isDone') === -1) {
              path.push('isDone');
            }
            return path;
          }
          // alternatively, if the path contains "isDone" string, don't do anything more
          if (path.indexOf('isDone') !== -1) {
            return path;
          }

          // find out which mitering side of the first wall in iwalls is immediately clockwise of "wall"
          let side: number | null = null;
          side = fp.getCounterClockwiseWallSide(fw, ip);

          // push fw.data.key + side to path
          const entry = [fw.data.key, side];
          // if path already contains this exact entry, do not add it, we're starting to loop infinitely. stop now
          for (let i: number = 0; i < path.length; i++) {
            const e = path[i];
            const wk: string = e[0];
            const w: go.Group = fp.findNodeForKey(wk) as go.Group;
            const s: number = e[1];
            if (fw.data.key === w.data.key && s === side) {
              return;
            }
          }
          path.push(entry);
          const otherEndpoint: go.Point = wrt.pointsApproximatelyEqual(ip, fw.data.startpoint)
            ? fw.data.endpoint
            : fw.data.startpoint;

          // get all walls connected to other endpoint of fw (if any exist, and if seenIp does not include this other endpoint)
          // (recursion)
          let iw: go.List<go.Group> = wrt.getAllWallsAtIntersection(otherEndpoint, true);
          // sort intersectionWalls s.t. they are clockwise, starting with bw1
          if (iw !== null && iw.count > 1) {
            iw = fp.sortWallsClockwiseWithSetStartWall(iw, fw);
          }

          let hasNotSeenIp: boolean = false;
          if (!seenIp.contains(go.Point.stringify(otherEndpoint))) {
            hasNotSeenIp = true;
          }

          // if we have seen this ip, maybe its OK -- iff the counter-clockwise side of the first wall in iw is nowhere in the path yet
          let alreadySeen: boolean = false;
          if (!hasNotSeenIp) {
            // get first wall in iw
            const fiw: go.Group = iw.toArray()[1];
            const side2: number = fp.getCounterClockwiseWallSide(fiw, otherEndpoint);
            for (let i = 0; i < path.length; i++) {
              const entry1 = path[i];
              const wk: string = entry1[0];
              const w: go.Group = fp.findNodeForKey(wk) as go.Group;
              const s: number = entry1[1];
              if (w.data.key === fiw.data.key && s === side2) {
                alreadySeen = true;
              }
            }
          }

          // have we come full circle?
          const atFinalIp: boolean = iw.contains(bw1);

          const doContinue = hasNotSeenIp ? true : !alreadySeen && !atFinalIp;

          if (iw.count > 1 && doContinue) {
            return recursivelyFindClusterPath(fw, iw, otherEndpoint, seenIp, path, bw1, bw2);
          } else if (!atFinalIp) {
            const otherSide: number = side === 1 ? 2 : 1;
            const entry2 = [fw.data.key, otherSide];
            path.push(entry2);
            let iw2: go.List<go.Group> = wrt.getAllWallsAtIntersection(ip, true);
            // sort intersectionWalls s.t. they are clockwise, starting with bw1
            if (iw2 !== null && iw2.count > 1) {
              iw2 = fp.sortWallsClockwiseWithSetStartWall(iw2, fw);
            }
            return recursivelyFindClusterPath(fw, iw2, ip, seenIp, path, bw1, bw2);
          } else if (path.indexOf('isDone') === -1) {
            path.push('isDone');
            return;
          }
        }
      });

      return path;
    } // end recursivelyFindInternalClusterPath

    const wrt = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
    // now go through offending walls
    const handledWalls: go.Set<go.Group> = new go.Set<go.Group>();
    const internalPathsToInsert: go.Map<go.Group, Array<any>> = new go.Map<go.Group, Array<any>>();
    offendingWalls.iterator.each(function (ow) {
      if (!handledWalls.contains(ow)) {
        const ows: go.Point = ow.data.startpoint;
        const owe: go.Point = ow.data.endpoint;

        // find the 2 boundaryWalls this offending wall shares an intersection point with
        let bw1: go.Group | null = null;
        let bw2: go.Group | null = null;
        let ip: go.Point | null = null;

        for (let i: number = 0; i < roomOuterBoundaryPath.length; i++) {
          const entry = roomOuterBoundaryPath[i];
          if (typeof entry === 'string') continue;
          const wk: string = entry[0];
          const w: go.Group = fp.findNodeForKey(wk) as go.Group;
          if (!w) continue;
          const s: go.Point = w.data.startpoint;
          const e: go.Point = w.data.endpoint;

          if (
            wrt.pointsApproximatelyEqual(s, ows) ||
            wrt.pointsApproximatelyEqual(s, owe) ||
            wrt.pointsApproximatelyEqual(e, ows) ||
            wrt.pointsApproximatelyEqual(e, owe)
          ) {
            if (bw1 === null) {
              bw1 = w; // bw1 must exist in the boundaryWalls array before bw2
              ip = fp.getSegmentsIntersection(bw1.data.startpoint, bw1.data.endpoint, ows, owe);
            } else {
              bw2 = w;
            }
          }
        }

        // edge case -- bw1 is the first entry in boundaryWalls array and bw2 is the last -- if so, switch them
        if (
          ip !== null &&
          bw1 !== null &&
          bw2 !== null &&
          roomOuterBoundaryPath[0][0] === bw1.data.key &&
          roomOuterBoundaryPath[roomOuterBoundaryPath.length - 1][0] === bw2.data.key
        ) {
          let temp: null | go.Group = null;
          temp = bw1;
          bw1 = bw2;
          bw2 = temp;
        }

        if (ip !== null) {
          let intersectionWalls: go.List<go.Group> = new go.List<go.Group>();
          if (bw1 !== null) {
            // this is important -- this gives us a reference for "clockwise" when dealing with intersection walls
            intersectionWalls.add(bw1);
          }
          // now, find any other offendingWalls that share this intersection point
          offendingWalls.iterator.each(function (ow2: go.Group) {
            const ow2s: go.Point = ow2.data.startpoint;
            const ow2e: go.Point = ow2.data.endpoint;
            if (ip !== null) {
              if (
                wrt.pointsApproximatelyEqual(ow2s, ip) ||
                wrt.pointsApproximatelyEqual(ow2e, ip)
              ) {
                intersectionWalls.add(ow2);
                handledWalls.add(ow2);
              }
            }
          });
          if (bw2 !== null) {
            // this lets us know we are done in recursion when we get to this wall
            intersectionWalls.add(bw2);
          }

          // sort intersectionWalls s.t. they are clockwise, starting with bw1
          if (bw1 !== null) {
            intersectionWalls = fp.sortWallsClockwiseWithSetStartWall(intersectionWalls, bw1);
          }

          const path: Array<any> = []; // path of walls/sides for the offending walls as key+side (i.e. [[wall, number], [wall, number]] )
          // recurse through all intersection walls until you reach bw2
          const seenIp: go.Set<string> = new go.Set<string>();
          if (bw1 !== null && bw2 !== null) {
            let p = recursivelyFindClusterPath(bw1, intersectionWalls, ip, seenIp, path, bw1, bw2);
            // cut the "isDone" flag
            p = p.slice(0, p.length - 1);
            // Remember to insert this path after bw1 in the roomOuterBoundaryPath after all this iteration
            internalPathsToInsert.add(bw1, p);
          }
        } // end intersection point check
      } // end handled wall check
    }); // end offendingWalls iterator

    // Insert internal paths into room boundaries now
    internalPathsToInsert.iterator.each(function (kvp) {
      const bw: go.Group = kvp.key; // the boundary wall to insert this internal path directly after
      const path: Array<any> = kvp.value; // the path to insert
      let insertionIndex: number | undefined;
      for (let i: number = 0; i < roomOuterBoundaryPath.length; i++) {
        const entry = roomOuterBoundaryPath[i];
        if (typeof entry === 'string') continue;
        const entryWk: string = entry[0];
        const entryW: go.Group = fp.findNodeForKey(entryWk) as go.Group;
        if (entryW.data.key === bw.data.key) {
          insertionIndex = i + 1;
        }
      }
      const firstArr = roomOuterBoundaryPath.slice(0, insertionIndex);
      const secondArr = roomOuterBoundaryPath.slice(insertionIndex, roomOuterBoundaryPath.length);
      roomOuterBoundaryPath = firstArr.concat(path).concat(secondArr);
    });

    // roomOuterBoundaryPath now includes internal walls connected to the original outer boundaries
    return roomOuterBoundaryPath;
  } // end addInternalWallsToRoom

  /**
   * Given a wall and a mitering side (1 or 2), return the endpoint of the wall s.t. the "inside" remains on the right
   * This aids in the clockwise traversal of wall edges
   * @param {go.Group} w
   * @param {number} side The mitering side of w being used
   * @return {go.Point | null}
   */
  public getClockwiseWallEndpoint(w: go.Group, side: number): go.Point | null {
    const wrt = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
    let ip: go.Point | null = null;
    // in this context, sPt and ePt refer to the start and end points of w's mitering side, "side"
    const sPt: go.Point = w.data['smpt' + side];
    const ePt: go.Point = w.data['empt' + side];
    // get two points, one "outside" mitering side "side" of w, and within "inside"
    const mPt: go.Point = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
    const a: number = sPt.directionPoint(ePt) + 180; // perpendicular to angle of w
    const offset: number = w.data.thickness / 2;
    // get 2 points 1/2 w thickness from w's midpoint at angles a and a+180
    const pt1: go.Point = wrt.translateAndRotatePoint(mPt, a, offset);
    const pt2: go.Point = wrt.translateAndRotatePoint(mPt, a + 180, offset);
    let insidePt: go.Point | null = null;

    /**
     * Helper function, returns whether a point is to the left or right of a segment (if one thinks of orienting themselves, standing at one endpoint, looking to the other)
     * @param {go.Point} pt The point to check
     * @param {go.Point} rayS The first point of the segment
     * @param {go.Point} rayE The second point of the segment
     * @return {boolean}
     */
    function isPointLeftOfRay(pt: go.Point, rayS: go.Point, rayE: go.Point): boolean {
      return (pt.y - rayS.y) * (rayE.x - rayS.x) > (pt.x - rayS.x) * (rayE.y - rayS.y);
    }

    if (fpUtils.isPointInWall(w, pt1)) {
      insidePt = pt1;
    } else {
      insidePt = pt2;
    }

    // now, imagine standing on this mitering side of w and looking from sPt to ePt, or from ePt to sPt
    // in which situation is the "inside" pt on your right?
    // whichever one that is, use the second endpoint (ePt or sPt) as the ip to go to next
    // this will ensure we are always moving clockwise around the walls in this hole, so our room geometry is constructed properly later
    if (isPointLeftOfRay(insidePt, sPt, ePt)) {
      ip = w.data.endpoint;
    } else {
      ip = w.data.startpoint;
    }

    return ip;
  }

  /**
   * Find all the "holes" in a room.
   * These are walls / wall clusters that are inside a room's boundaries but do not connect to the room boundary walls.
   * They are used to construct "holes" in the room's polygon, and their area is subtracted from the room's polygon's area to correctly represent floor space
   * IMPORTANT: This function must be run after the internal walls that DO connect to room outer boundaries have been added. This is done in addInternalWallsToRoom()
   *  It is assumed the roomBoundaryWalls parameter includes all connected room boundary walls, as it is used to find interior walls not connected to the room boundaries
   * @param {Array<any>} roomBoundaryWalls Specially formatted Array for the boundaries of the room, where entries are [wall, mitering side]
   * @param {go.Point} pt The original pt used to generate the room. See {@link getRoomWalls} for more detail
   * @return {go.Array<Array<any>>} @TODO CHANGE THIS TO AN ARRAY OF ARRAYS
   *  A go.Set of Arrays. Each Array represents a hole path. Array entries are in the form of [wall, mitering side]. These are used to construct
   *  the holes in the room geometry later, and their areas are subtracted from the polygon area of the room boundaries to correctly get floor area
   */
  public findRoomHoles(roomBoundaryWalls: Array<any>, pt: go.Point): Array<Array<any>> {
    const wrt = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
    const walls: go.Iterator<go.Group> = this.findNodesByExample({
      category: 'Wall'
    }) as go.Iterator<go.Group>;
    // offendingWalls is a Set of walls inside the room boundaries, not included in the room boundaries (these walls will make the holes)
    const offendingWalls: go.Set<go.Group> = new go.Set<go.Group>();
    const roomOuterBoundaryPts: go.List<go.Point> | null = fpUtils.makePolygonFromRoomBoundaries(
      roomBoundaryWalls,
      this
    );
    /* eslint-disable */
    const fp = this;
    walls.iterator.each((w: go.Group) => {
      const s: go.Point = w.data.startpoint;
      const e: go.Point = w.data.endpoint;
      if (
        roomOuterBoundaryPts !== null &&
        (fpUtils.isPointInPolygon(roomOuterBoundaryPts.toArray(), s) ||
          fpUtils.isPointInPolygon(roomOuterBoundaryPts.toArray(), e))
      ) {
        // make sure this wall w is not in the roomBoundaryWalls anywhere
        let isBoundaryWall: boolean = false;
        for (let i: number = 0; i < roomBoundaryWalls.length; i++) {
          const entry = roomBoundaryWalls[i];
          const wallKey: string = entry[0];
          const wall: go.Group = this.findNodeForKey(wallKey) as go.Group;
          if (wall.data.key === w.data.key) {
            isBoundaryWall = true;
          }
        }
        if (!isBoundaryWall) {
          offendingWalls.add(w);
        }
      }
    });

    // keep track of the offendingWalls we have handled so far
    const seenWalls: go.Set<go.Group> = new go.Set<go.Group>();

    /**
     * Recursively find the path of the hole starting at origWall.
     * @param {go.Group} w
     * @param {go.Set<string> | null} seenIp
     * @param {Array<any> | null} path
     * @param {go.Point | null} prevPt
     * @param {go.Group} origWall
     * @return {Array<any>}
     */
    function recursivelyFindHolePath(
      w: go.Group,
      seenIp: go.Set<string> | null,
      path: Array<any> | null,
      prevPt: go.Point | null,
      origWall: go.Group
    ): Array<any> {
      // one time thing: if path is null (not made yet), add w to path
      // need to do special calculation to get the proper mitering side for w
      let side: number | null = null; // the mitering side of w, will only be set if w is the first wall
      if (path === null || path === undefined) {
        path = [];
        // First wall is special case; just find out which mitering side is closer to the original point used for this room construction
        // get intersection point from pt-mPt each of walls's mitering sides

        // It's possible pt-mPt does not intersect one or both of the actual segments making up the mitering sides of w,
        // so use the lines implied by the mitering points, not just finite segments
        const ws: go.Point = w.data.startpoint;
        const we: go.Point = w.data.endpoint;
        const mPt: go.Point = new go.Point((ws.x + we.x) / 2, (ws.y + we.y) / 2);
        const ip1: go.Point | null = fp.getLinesIntersection(pt, mPt, w.data.smpt1, w.data.empt1);
        const ip2: go.Point | null = fp.getLinesIntersection(pt, mPt, w.data.smpt2, w.data.empt2);

        if (ip1 !== null && ip2 !== null) {
          // whichever mitering side pt-mPt strikes first (which intersection point is closer to pt) is the one to start with
          const dist1: number = Math.sqrt(ip1.distanceSquaredPoint(pt));
          const dist2: number = Math.sqrt(ip2.distanceSquaredPoint(pt));
          side = dist1 < dist2 ? 1 : 2;
          seenWalls.add(w);
          path.push([w.data.key, side]);
        }
      }

      if (path.indexOf('isDone') !== -1) {
        return path;
      }

      // get clockwise endpoint, ip, for w (only if prevPt is null or undefined, otherwise, just use the endpoint of w that is not prevPt)
      let ip: go.Point | null = null; // intersection point (one of w's endpoints), the one we're gonna move to
      let op: go.Point | null = null; // other endpoint of w
      const sPt: go.Point = w.data.startpoint;
      const ePt: go.Point = w.data.endpoint;

      if (prevPt !== null && prevPt !== undefined) {
        ip = wrt.pointsApproximatelyEqual(sPt, prevPt) ? ePt : sPt;
        op = wrt.pointsApproximatelyEqual(sPt, prevPt) ? sPt : ePt;
      } else {
        if (side !== null) {
          ip = fp.getClockwiseWallEndpoint(w, side);
          if (ip !== null) {
            op = wrt.pointsApproximatelyEqual(ip, sPt) ? ePt : sPt;
          }
        }
      }

      if (seenIp === null || seenIp === undefined) {
        seenIp = new go.Set<string>();
      }
      // add ip to seenIp
      if (ip !== null) {
        seenIp.add(go.Point.stringify(ip));
      }

      // get all walls at ip, call that iw; sort clockwise with wall as the first element
      let iw: go.List<go.Group> = wrt.getAllWallsAtIntersection(ip, true);
      let oiw: go.List<go.Group> = wrt.getAllWallsAtIntersection(op, true);
      // sort iw s.t. they are clockwise, starting with w
      if (iw !== null && iw.count > 1) {
        iw = fp.sortWallsClockwiseWithSetStartWall(iw, w);
      }

      let hasNotSeenIp: boolean = false;
      if (ip !== null && !seenIp.contains(go.Point.stringify(ip))) {
        hasNotSeenIp = true;
      }

      // if we have seen this ip, maybe its OK -- iff the counter-clockwise side of the first wall in iw is nowhere in the path yet
      let alreadySeen: boolean = false;
      if (!hasNotSeenIp && iw.toArray().length > 0) {
        // get first wall in iw
        let fiw: go.Group | null = null;
        if (iw.toArray().length > 1) {
          fiw = iw.toArray()[1];
        } else {
          fiw = iw.toArray()[0];
        }
        if (ip !== null) {
          const side2: number = fp.getCounterClockwiseWallSide(fiw, ip);
          for (let i = 0; i < path.length; i++) {
            const entry = path[i];
            const wk: string = entry[0];
            const ww: go.Group = fp.findNodeForKey(wk) as go.Group;
            const s: number = entry[1];
            if (ww.data.key === fiw.data.key && s === side2) {
              alreadySeen = true;
            }
          }
        }
      }

      // check if the path already contains both sides of w
      let s1: boolean = false;
      let s2: boolean = false;
      for (let i = 0; i < path.length; i++) {
        const entry = path[i];
        const wwk: string = entry[0];
        const ww: go.Group = fp.findNodeForKey(wwk) as go.Group;

        if (ww.data.key === w.data.key && !s1) {
          s1 = true;
        } else if (ww.data.key === w.data.key && s1 && !s2) {
          s2 = true;
        }
      }

      const doContinue = hasNotSeenIp ? true : !alreadySeen; /*&& !atFinalIp*/

      if (!doContinue && path.indexOf('isDone') === -1) {
        path.push('isDone');
      }

      if (doContinue) {
        // iterate over iw, with namespace fw
        iw.iterator.each(function (fw: go.Group) {
          // if there is more than one element in iw, skip first fw (it's w)
          if (path !== null && fw.data.key !== w.data.key && path.indexOf('isDone') === -1) {
            // get proper (CC?) mitering side, add entry to path, then recurse
            if (ip !== null) {
              const side1: number = fp.getCounterClockwiseWallSide(fw, ip);
              const entry = [fw.data.key, side1];
              path.push(entry);
              seenWalls.add(fw);
              recursivelyFindHolePath(fw, seenIp, path, ip, origWall);
            }
          } else if (iw.count === 1 && path !== null && path.indexOf('isDone') === -1) {
            // find the current entry in path with fw
            let entry: null | Array<any> = null;
            for (let i = 0; i < path.length; i++) {
              const pwk: string = path[i][0];
              const pw: go.Group = fp.findNodeForKey(pwk) as go.Group;
              if (pw.data.key === fw.data.key) {
                const s: number = path[i][1];
                const os: number = s === 1 ? 2 : 1;
                entry = [pw.data.key, os];
              }
            }
            path.push(entry);

            // if this is the only wall in the hole, add isDone to path
            if (oiw.count === 1) {
              path.push('isDone');
            }
          }
        });
      }
      if (path.indexOf('isDone') !== -1) {
        return path.slice(0, path.length - 1);
      } else if (oiw.count > 1) {
        // this is the last wall we traced
        const lw: go.Group | null = iw.last();

        // sort iw s.t. they are clockwise, starting with lw
        if (oiw !== null && lw !== null) {
          oiw = fp.sortWallsClockwiseWithSetStartWall(oiw, lw);
        }
        // the "parent wall" (the one that led to all walls in oiw) is the next, non "lw" wall in the clockwise-sorted oiw
        const parentW: go.Group = oiw.toArray()[1];

        // add the mitering side of parent wall to the path that's not already in the path
        if (op !== null) {
          const side1: number = fp.getCounterClockwiseWallSide(parentW, op);
          const entry = [parentW.data.key, side1];

          // if this entry already exists, we've come full circle and are done
          let entryExists: boolean = false;
          for (let i = 0; i < path.length; i++) {
            const entry2 = path[i];
            const w1k: string = entry[0];
            const w1: go.Group = fp.findNodeForKey(w1k) as go.Group;
            const w2k: string = entry2[0];
            const w2: go.Group = fp.findNodeForKey(w2k) as go.Group;
            if (w1.data.key === w2.data.key && entry[1] === entry2[1]) {
              entryExists = true;
            }
          }

          if (entry !== null && !entryExists) {
            path.push(entry);
            seenWalls.add(parentW);

            // now recurse
            recursivelyFindHolePath(parentW, seenIp, path, op, origWall);
          } else if (entryExists) {
            return path;
          }
        }
      }

      if (path.indexOf('isDone') !== -1) {
        path = path.slice(0, path.length - 1);
      }
      return path;
    } // end recursivelyFindHolePath

    // A set of specially formatted Arrays, representing the paths of the holes
    // IMPORTANT: Hole paths must be clockwise to ensure proper geometry construction in updateRoom() function!
    const holes: Array<Array<any>> = [];
    offendingWalls.iterator.each((ow) => {
      // if we haven't gotten a path for a hole that contains this wall yet...
      if (!seenWalls.contains(ow)) {
        // draw segment from pt to the ow's midpoint (mPt). Find all walls intersected by this segment
        const sPt: go.Point = ow.data.startpoint;
        const ePt: go.Point = ow.data.endpoint;
        const mPt: go.Point = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
        const wallsDistArr: Array<any> = []; // array of wall/dist pairs [[wallA, 15], [wallB, 30]] -- this makes sorting easier than if we were using a Map
        offendingWalls.iterator.each((w) => {
          const ip: go.Point | null = this.getSegmentsIntersection(
            pt,
            mPt,
            w.data.startpoint,
            w.data.endpoint
          );
          if (ip !== null) {
            const dist: number = Math.sqrt(ip.distanceSquaredPoint(pt));
            wallsDistArr.push([w, dist]);
          }
        });

        // sort all walls the line from pt to mPt intersects, in order of proximity to pt
        wallsDistArr.sort(function (a, b) {
          const distA: number = a[1];
          const distB: number = b[1];
          if (distA === distB) return 0;
          else if (distA < distB) return -1;
          else return 1;
        });

        // find the first wall, fw, this segment intersects that is not in the roomBoundaryWalls AND not already in seenWalls
        let fw: go.Group | null = null;
        for (let i = 0; i < wallsDistArr.length; i++) {
          const entryWall: go.Group = wallsDistArr[i][0];
          if (!seenWalls.contains(entryWall) && fw === null) {
            fw = entryWall;
          }
        }

        if (fw !== null) {
          // fw is guaranteed to be a boundary wall for a hole; use it to get the cycle path for the hole
          const path = recursivelyFindHolePath(fw, null, null, null, fw);

          // Add any walls inside the polygon made by this path to seenWalls (we don't want to create holes within holes)
          const polygon: go.List<go.Point> | null = fpUtils.makePolygonFromRoomBoundaries(
            path,
            this
          );
          if (polygon !== null) {
            offendingWalls.iterator.each(function (ow2: go.Group) {
              const s: go.Point = ow2.data.smpt1;
              if (
                fpUtils.isPointInPolygon(polygon.toArray(), s) ||
                fpUtils.isPointInPolygon(polygon.toArray(), s)
              ) {
                seenWalls.add(ow2);
              }
            });

            holes.push(path);
          }
        }
      }
    }); // end offendingWalls iterator

    return holes;
  } // end findRoomHoles

  /**
   * Returns an ordered List of Points for a given path.
   * A path is a special Array whose entries are of the form [wall, miteringSide]
   * This is mostly used with roomBoundaryWall and room hole paths
   * @param {Array<any>} path
   * @returns {go.List<go.Point>}
   */
  public getPathPts(path: Array<any>): go.List<go.Point> {
    const pts = new go.List<go.Point>();
    const firstWallKey: string = path[0][0];
    const firstWall: go.Group = this.findNodeForKey(firstWallKey) as go.Group;
    const firstSide: number = path[0][1];

    const secondWallKey: string = path[1][0];
    const secondWall: go.Group = this.findNodeForKey(secondWallKey) as go.Group;
    if (!secondWall) return new go.List();

    // find where first and second wall meet
    // if that's near firstWall's smpt[side] pt, start with empt[side] pt; else, vice versa (i.e. pick the farthest pt)
    let ip: go.Point | null = this.getWallsIntersection(firstWall, secondWall);

    // SPECIAL case -- if firstWall and secondWall are the same, make sure you get the ip that is clockwise
    // this means we are wrapping around a single wall to start, and we need to make sure we are doing so in a clockwise manner
    if (firstWall.data.key === secondWall.data.key) {
      ip = this.getClockwiseWallEndpoint(firstWall, firstSide);
    }

    if (ip !== null) {
      const propS: string = 'smpt' + firstSide;
      const propE: string = 'empt' + firstSide;
      const ptS: go.Point = firstWall.data[propS];
      const ptE: go.Point = firstWall.data[propE];

      const distS: number = Math.sqrt(ip.distanceSquaredPoint(ptS));
      const distE: number = Math.sqrt(ip.distanceSquaredPoint(ptE));
      const closestPt: go.Point = distS < distE ? ptS : ptE;
      const farthestPt: go.Point = closestPt.equals(ptS) ? ptE : ptS;

      pts.add(farthestPt);
      pts.add(closestPt);

      let prevPt: go.Point = closestPt;
      let prevWall: go.Group = firstWall;
      for (let i: number = 0; i < path.length; i++) {
        const entry = path[i];
        if (typeof entry === 'string') continue;
        const wk: string = entry[0];
        const w: go.Group = this.findNodeForKey(wk) as go.Group;
        if (!w) continue;
        const s: number = entry[1];

        if (i !== 0) {
          const propS1: string = 'smpt' + s;
          const propE1: string = 'empt' + s;
          const ptS1: go.Point = w.data[propS1];
          const ptE1: go.Point = w.data[propE1];
          const distS1: number = Math.sqrt(prevPt.distanceSquaredPoint(ptS1));
          const distE1: number = Math.sqrt(prevPt.distanceSquaredPoint(ptE1));

          const closestPt1: go.Point = distS1 < distE1 ? ptS1 : ptE1;
          const farthestPt1: go.Point = closestPt.equals(ptS1) ? ptE1 : ptS1;

          // if the previous wall is the same as current wall, we're looping around the wall's geometry, so be sure to include its thickness border
          if (prevWall.data.key === w.data.key) {
            pts.add(prevPt);
            pts.add(closestPt1);
          }

          pts.add(closestPt1);
          pts.add(farthestPt1);
          prevPt = farthestPt1;
          prevWall = w;
        }
      }
    }

    return pts;
  }

  /**
   * Get the area of a given polygon.
   * The answer will be in document units -- to convert to floorplan units (cm, m, whatever)
   * you must call convertPixelsToUnits twice!
   * @param {Array<go.Point>} vs An ordered array of polygon vertices
   * @return {number}
   */
  public getPolygonArea(vs: Array<go.Point>): number {
    let j = 0;
    let area = 0;
    for (let i = 0; i < vs.length; i++) {
      j = (i + 1) % vs.length;
      area += vs[i].x * vs[j].y;
      area -= vs[i].y * vs[j].x;
    }
    area /= 2;
    return area < 0 ? -area : area;
  }

  /**
   * Get the area of a given room.
   * This is the area of the polygon created by the outer boundary walls of the room, less the area of all the room holes.
   * @param {go.Node} r Room node
   * @return {number} This will be in document units, not floorplan units
   */
  public getRoomArea(r: go.Node) {
    const pts: go.List<go.Point> = this.getPathPts(r.data.boundaryWalls);
    const area1 = this.getPolygonArea(pts.toArray());

    // get the area of all the holes
    let area2 = 0;
    const holes: Array<Array<any>> = r.data.holes;
    for (let i = 0; i < holes.length; i++) {
      const h: Array<any> = holes[i];
      // get holes points
      const hPts: go.List<go.Point> = this.getPathPts(h);
      const hArea = this.getPolygonArea(hPts.toArray());
      // get area of hole, add it to area2
      area2 += hArea;
    }
    return area1 - area2;
  }

  /**
   * Update the geometry, angle, and location of a given wall
   * @param {go.Group} wall A reference to a valid Wall Group (defined below)
   */
  public updateWall(wall: go.Group): void {
    if (wall.data.startpoint && wall.data.endpoint) {
      const shape: go.Shape = wall.findObject('SHAPE') as go.Shape;
      const data: any = wall.data;

      // geometry is slightly different for Room Dividers vs. Walls
      let geo: go.Geometry | null = null;
      let pts: Array<go.Point> = [
        data.startpoint,
        data.endpoint,
        data.smpt1,
        data.smpt2,
        data.empt1,
        data.empt2
      ];
      if (wall.data.isDivider) {
        shape.strokeWidth = 2;
        shape.opacity = 0.5;
      }

      pts = [data.startpoint, data.endpoint, data.smpt1, data.smpt2, data.empt1, data.empt2];
      geo = new go.Geometry().add(
        new go.PathFigure(data.startpoint.x, data.startpoint.y)
          .add(new go.PathSegment(go.SegmentType.Line, data.smpt1.x, data.smpt1.y))
          .add(new go.PathSegment(go.SegmentType.Line, data.empt1.x, data.empt1.y))
          .add(new go.PathSegment(go.SegmentType.Line, data.endpoint.x, data.endpoint.y))
          .add(new go.PathSegment(go.SegmentType.Line, data.empt2.x, data.empt2.y))
          .add(new go.PathSegment(go.SegmentType.Line, data.smpt2.x, data.smpt2.y))
          .add(new go.PathSegment(go.SegmentType.Line, data.startpoint.x, data.startpoint.y))
      );

      geo.normalize();
      shape.geometry = geo;

      let smallestX = Number.MAX_VALUE;
      let smallestY = Number.MAX_VALUE;
      for (const pt of pts) {
        if (pt.x < smallestX) smallestX = pt.x;
        if (pt.y < smallestY) smallestY = pt.y;
      }

      wall.location = new go.Point(smallestX, smallestY);
    }
  }

  /**
   * Update the geometry, angle, and location of a given wall
   * @param {go.Node} room A reference to a valid Room Node (defined below)
   */
  public updateRoom(room: go.Node): void {
    const shape: go.Shape = room.findObject('SHAPE') as go.Shape;
    const geo: go.Geometry = new go.Geometry();
    // build the room geo from wall boundary array in data
    const pts: Array<go.Point> = [];
    const bw: Array<any> = room.data.boundaryWalls;
    if (bw === null) return;
    let fig: go.PathFigure | null = null;

    /**
     * Internal, helper function. Add a path of boundary walls (specially formatted array) of walls/mitering sides to room's geo figure.
     * @param {Array<any>} boundaryWalls
     */
    const addPathToGeo = (boundaryWalls: Array<any>) => {
      const firstWallKey: string = boundaryWalls[0][0];
      const firstWall: go.Group = this.findNodeForKey(firstWallKey) as go.Group;
      const firstSide: number = boundaryWalls[0][1];

      const secondWallKey: string = boundaryWalls[1][0];
      const secondWall: go.Group = this.findNodeForKey(secondWallKey) as go.Group;

      // find where first and second wall meet
      // if that's near firstWall's smpt[side] pt, start with empt[side] pt; else, vice versa (i.e. pick the farthest pt)
      let ip: go.Point | null = this.getWallsIntersection(firstWall, secondWall);

      // SPECIAL case -- if firstWall and secondWall are the same, make sure you get the ip that is clockwise
      // this means we are wrapping around a single wall to start, and we need to make sure we are doing so in a clockwise manner
      if (firstWall.data.key === secondWall.data.key) {
        ip = this.getClockwiseWallEndpoint(firstWall, firstSide);
      }

      if (ip === null) return;

      const propS: string = 'smpt' + firstSide;
      const propE: string = 'empt' + firstSide;
      const ptS: go.Point = firstWall.data[propS];
      const ptE: go.Point = firstWall.data[propE];

      const distS: number = Math.sqrt(ip.distanceSquaredPoint(ptS));
      const distE: number = Math.sqrt(ip.distanceSquaredPoint(ptE));
      const closestPt: go.Point = distS < distE ? ptS : ptE;
      const farthestPt: go.Point = closestPt.equals(ptS) ? ptE : ptS;
      const firstPt: go.Point = farthestPt.copy();

      pts.push(farthestPt);
      pts.push(closestPt);
      if (fig === null) {
        fig = new go.PathFigure(farthestPt.x, farthestPt.y);
      } else {
        fig.add(new go.PathSegment(go.SegmentType.Move, farthestPt.x, farthestPt.y));
      }
      fig.add(new go.PathSegment(go.SegmentType.Line, closestPt.x, closestPt.y));

      let prevPt: go.Point = closestPt;
      let prevWall: go.Group = firstWall;
      for (let i: number = 0; i < boundaryWalls.length; i++) {
        const entry = boundaryWalls[i];
        if (typeof entry === 'string') continue;
        const wk: string = entry[0];
        const w: go.Group = this.findNodeForKey(wk) as go.Group;
        if (!w) continue;
        const s: number = entry[1];

        if (i !== 0) {
          const propS1: string = 'smpt' + s;
          const propE1: string = 'empt' + s;
          const ptS1: go.Point = w.data[propS1];
          const ptE1: go.Point = w.data[propE1];
          const distS1: number = Math.sqrt(prevPt.distanceSquaredPoint(ptS1));
          const distE1: number = Math.sqrt(prevPt.distanceSquaredPoint(ptE1));

          const closestPt1: go.Point = distS1 < distE1 ? ptS1 : ptE1;
          const farthestPt1: go.Point = closestPt1.equals(ptS1) ? ptE1 : ptS1;

          // if the previous wall is the same as current wall, we're looping around the wall's geometry, so be sure to include its thickness border
          if (prevWall.data.key === w.data.key) {
            fig.add(new go.PathSegment(go.SegmentType.Line, prevPt.x, prevPt.y));
            fig.add(new go.PathSegment(go.SegmentType.Line, closestPt1.x, closestPt1.y));
          }

          fig.add(new go.PathSegment(go.SegmentType.Line, closestPt1.x, closestPt1.y));
          fig.add(new go.PathSegment(go.SegmentType.Line, farthestPt1.x, farthestPt1.y));
          pts.push(closestPt1);
          pts.push(farthestPt1);
          prevPt = farthestPt1;
          prevWall = w;
        }
      }

      // close geometry?
      fig.add(new go.PathSegment(go.SegmentType.Line, firstPt.x, firstPt.y));
    };

    addPathToGeo(bw);

    // add holes to the room geo
    const holes: Array<Array<any>> = room.data.holes;
    if (holes !== null && holes.length !== 0) {
      for (let i = 0; i < holes.length; i++) {
        const holePath: Array<any> = holes[i];
        addPathToGeo(holePath);
      }
    }

    // add fig to geo
    if (fig !== null) {
      geo.add(fig);
    }

    geo.normalize();
    shape.geometry = geo;

    let smallestX: number = Number.MAX_VALUE;
    let smallestY: number = Number.MAX_VALUE;
    for (let i: number = 0; i < pts.length; i++) {
      const pt: go.Point = pts[i];
      if (pt.x < smallestX) {
        smallestX = pt.x;
      }
      if (pt.y < smallestY) {
        smallestY = pt.y;
      }
    }

    // find smallest x and y values of all points and set that to the position of the room node
    room.position = new go.Point(smallestX, smallestY);
    room.location = new go.Point(smallestX, smallestY);
    this.model.setDataProperty(room.data, 'loc', new go.Point(smallestX, smallestY));

    // also update room area in data
    const area: number = this.getRoomArea(room);
    this.model.setDataProperty(room.data, 'area', area);
  }

  /**
   * Helper function for Build Dimension Link: get a to/from point for a Dimension Link
   * @param {go.Group} wall The Wall Group being given a Dimension Link
   * @param {number} angle The angle of "wall"
   * @param {number} wallOffset The distance the Dimension Link will be from wall (in pixels)
   * @return {go.Point}
   */
  private getAdjustedPoint(
    point: go.Point,
    wall: go.Group,
    angle: number,
    wallOffset: number
  ): go.Point {
    const oldPoint: go.Point = point.copy();
    point.offset(0, -(wall.data.thickness * 0.5) - wallOffset);
    point.offset(-oldPoint.x, -oldPoint.y).rotate(angle).offset(oldPoint.x, oldPoint.y);
    return point;
  }

  /**
   * Helper function for Update Wall Dimensions; used to build Dimension Links
   * @param {go.Group} wall The wall the Link runs along (either describing the wall itself or some wallPart on "wall")
   * @param {number} index A number appended to PointNode keys; used for finding PointNodes of Dimension Links later
   * @param {go.Point} point1 The first point of the wallPart being described by the Link
   * @param {go.Point} point2 The second point of the wallPart being described by the Link
   * @param {number} angle The angle of the wallPart
   * @param {number} wallOffset How far from the wall (in px) the Link should be
   * @param {boolean} soloWallFlag If this Link is the only Dimension Link for "wall" (no other wallParts on "wall" selected) this is true; else, false
   * @param {Floorplan} floorplan A reference to a valid Floorplan
   * @param {number} miteringSide The mitering side of the wall we're labelling with a dimension link. Can be 1 or 2
   * @param {number} opacity How opaque the link is. Optional. Default is 1
   * @param {string} stroke The stroke color for the link. Optional. Default is gray
   * @param {number} strokeWidth The stroke width for the link. Optional. Default is 2.
   */
  public buildDimensionLink(
    wall: go.Group,
    index: number,
    point1: go.Point,
    point2: go.Point,
    angle: number,
    wallOffset: number,
    soloWallFlag: boolean,
    floorplan: Floorplan,
    miteringSide: number,
    opacity?: number,
    stroke?: string,
    strokeWidth?: number
  ): void {
    point1 = floorplan.getAdjustedPoint(point1, wall, angle, wallOffset);
    point2 = floorplan.getAdjustedPoint(point2, wall, angle, wallOffset);
    if (opacity === undefined || opacity === null || isNaN(opacity)) {
      opacity = 1;
    }
    if (strokeWidth === undefined || strokeWidth === null || isNaN(strokeWidth)) {
      strokeWidth = 2;
    }
    if (stroke === undefined || stroke === null) {
      stroke = 'gray';
    }
    const data1 = {
      key: wall.data.key + 'PointNode' + miteringSide + index,
      category: 'PointNode',
      loc: go.Point.stringify(point1)
    };
    const data2 = {
      key: wall.data.key + 'PointNode' + miteringSide + (index + 1),
      category: 'PointNode',
      loc: go.Point.stringify(point2)
    };
    const data3 = {
      key: wall.data.key + 'DimensionLink',
      category: 'DimensionLink',
      from: data1.key,
      to: data2.key,
      angle: angle,
      wall: wall.data.key,
      soloWallFlag: soloWallFlag
    };
    const pointNode1: go.Node = makePointNode();
    const pointNode2: go.Node = makePointNode();
    const link: go.Link = makeDimensionLink(opacity, stroke, strokeWidth);

    floorplan.pointNodes.add(pointNode1);
    floorplan.pointNodes.add(pointNode2);
    floorplan.dimensionLinks.add(link);
    floorplan.add(pointNode1);
    floorplan.add(pointNode2);
    floorplan.add(link);

    pointNode1.data = data1;
    pointNode2.data = data2;
    link.data = data3;
    link.fromNode = pointNode1;
    link.toNode = pointNode2;
    link.data.length = Math.sqrt(pointNode1.location.distanceSquaredPoint(pointNode2.location));
  }

  /**
   * Update Dimension Links shown along walls, based on which walls and wallParts are selected
   * @param {go.Set<go.Group>} wallsToDisplayFor An optional set of walls to show dimensions for. If this is not provided,
   *  just show dimensions for selected walls.
   */
  public updateWallDimensions(wallsToDisplayFor?: go.Set<go.Group>): void {
    this.skipsUndoManager = true;
    this.startTransaction('update wall dimensions');
    // if showWallLengths === false, remove all pointNodes (used to build wall dimensions)
    if (!this.model.modelData.preferences.showWallLengths) {
      this.pointNodes.iterator.each((node) => {
        this.remove(node);
      });
      this.dimensionLinks.iterator.each((link) => {
        this.remove(link);
      });
      this.pointNodes.clear();
      this.dimensionLinks.clear();
      this.commitTransaction('update wall dimensions');
      this.skipsUndoManager = false;
      return;
    }

    // destroy all previous pointNodes and dimensionLinks
    this.pointNodes.iterator.each((node) => {
      this.remove(node);
    });
    this.dimensionLinks.iterator.each((link) => {
      this.remove(link);
    });
    this.pointNodes.clear();
    this.dimensionLinks.clear();

    // make visible all dimension links (zero-length dimension links are set to invisible at the end of the function)
    // floorplan.dimensionLinks.iterator.each(function (link) { link.visible = true; });

    const selection =
      wallsToDisplayFor !== null && wallsToDisplayFor !== undefined
        ? wallsToDisplayFor
        : this.selection;
    // const selection: go.Set<go.Part> = floorplan.selection;

    // gather all selected walls, including walls of selected Doors and Windows
    const walls: go.Set<go.Group> = new go.Set();
    selection.iterator.each((part: go.Part) => {
      if (
        (part.category === 'Window' || part.category === 'Door') &&
        part.containingGroup !== null
      ) {
        walls.add(part.containingGroup);
      }
      if (part.category === 'Wall' && part.data && part.data.startpoint && part.data.endpoint) {
        // ensure there are no parts on this wall that are also selected
        const wall: go.Group = part as go.Group;
        let areWallPartsSelected: boolean = false;
        wall.memberParts.each((wp: go.Part) => {
          if (wp.isSelected) {
            areWallPartsSelected = true;
          }
        });

        if (!areWallPartsSelected) {
          const ang: number = wall.data.startpoint.directionPoint(wall.data.endpoint);

          // build dimension link for side1
          const s1: go.Point = wall.data.smpt1;
          const e1: go.Point = wall.data.empt1;
          let first: go.Point = s1.x + s1.y <= e1.x + e1.y ? s1 : e1;
          let second: go.Point = s1.x + s1.y > e1.x + e1.y ? s1 : e1;
          this.buildDimensionLink(
            wall,
            1,
            first.copy(),
            second.copy(),
            (ang + 180) % 360,
            10,
            true,
            this,
            1
          );

          const s2: go.Point = wall.data.smpt2;
          const e2: go.Point = wall.data.empt2;
          first = s2.x + s2.y <= e2.x + e2.y ? s2 : e2;
          second = s2.x + s2.y > e2.x + e2.y ? s2 : e2;
          this.buildDimensionLink(wall, 2, first.copy(), second.copy(), ang, 10, true, this, 1);
        }
      }
    });

    // create array of selected wall endpoints and selected wallPart endpoints along the wall that represent measured stretches
    walls.iterator.each((wall) => {
      for (let i = 1; i < 3; i++) {
        const startpoint: go.Point = wall.data['smpt' + i];
        const endpoint: go.Point = wall.data['empt' + i];
        const firstWallPt: go.Point =
          startpoint.x + startpoint.y <= endpoint.x + endpoint.y ? startpoint : endpoint;
        const lastWallPt: go.Point =
          startpoint.x + startpoint.y > endpoint.x + endpoint.y ? startpoint : endpoint;
        let angle: number = wall.data.startpoint.directionPoint(wall.data.endpoint);
        if (i === 1) {
          angle = (angle + 180) % 360;
        }

        // store all endpoints along with the part they correspond to (used later to either create DimensionLinks or simply adjust them)
        const wallPartEndpoints: Array<go.Point> = [];
        wall.memberParts.iterator.each((wallPart) => {
          if (wallPart.isSelected) {
            const endpoints = getWallPartEndpoints(wallPart);
            const ep1: go.Point = endpoints[0];
            const ep2: go.Point = endpoints[1];
            const newEp1: go.Point = this.rotateAndTranslatePoint(
              ep1,
              angle + 0,
              wall.data.thickness / 2
            );
            const newEp2: go.Point = this.rotateAndTranslatePoint(
              ep2,
              angle + 0,
              wall.data.thickness / 2
            );
            // const newEp1: go.Point = ep1.projectOntoLineSegmentPoint(startpoint, endpoint);
            // const newEp2: go.Point = ep2.projectOntoLineSegmentPoint(startpoint, endpoint);

            wallPartEndpoints.push(ep1);
            wallPartEndpoints.push(ep2);
          }
        });
        // sort all wallPartEndpoints by x coordinate left to right/ up to down
        wallPartEndpoints.sort(function (a, b) {
          if (a.x + a.y > b.x + b.y) return 1;
          if (a.x + a.y < b.x + b.y) return -1;
          else return 0;
        });
        wallPartEndpoints.unshift(firstWallPt);
        wallPartEndpoints.push(lastWallPt);

        let k: number = 1; // k is a counter for the indices of PointNodes
        // build / edit dimension links for each stretch, defined by pairs of points in wallPartEndpoints
        for (let j: number = 0; j < wallPartEndpoints.length - 1; j++) {
          let linkPoint1: go.Node | null = null;
          let linkPoint2: go.Node | null = null;
          const itr = this.pointNodes.iterator;
          while (itr.next()) {
            const node: go.Node = itr.value;
            if (node.data.key === wall.data.key + 'PointNode' + k) {
              linkPoint1 = node;
            }
            if (node.data.key === wall.data.key + 'PointNode' + (k + 1)) {
              linkPoint2 = node;
            }
          }

          if (linkPoint1 !== null && linkPoint2 !== null) {
            const newLoc1: go.Point = this.getAdjustedPoint(
              wallPartEndpoints[j].copy(),
              wall,
              angle,
              15
            );
            const newLoc2: go.Point = this.getAdjustedPoint(
              wallPartEndpoints[j + 1].copy(),
              wall,
              angle,
              15
            );
            linkPoint1.data.loc = go.Point.stringify(newLoc1);
            linkPoint2.data.loc = go.Point.stringify(newLoc2);
            linkPoint1.updateTargetBindings();
            linkPoint2.updateTargetBindings();
          } else {
            this.buildDimensionLink(
              wall,
              k,
              wallPartEndpoints[j].copy(),
              wallPartEndpoints[j + 1].copy(),
              angle,
              15,
              false,
              this,
              i,
              0.5,
              'gray',
              1
            );
          }
          k += 2;
        }
        // total wall Dimension Link constructed of a kth and k+1st pointNode
        let totalWallDimensionLink: null | go.Link = null;
        this.dimensionLinks.iterator.each(function (link) {
          if (
            link.fromNode !== null &&
            link.toNode !== null &&
            link.fromNode.data.key === wall.data.key + 'PointNode' + i + k &&
            link.toNode.data.key === wall.data.key + 'PointNode' + i + (k + 1)
          ) {
            totalWallDimensionLink = link;
          }
        });
        // if a total wall Dimension Link already exists, adjust its constituent point nodes
        if (totalWallDimensionLink !== null) {
          let linkPoint1: go.Node | null = null;
          let linkPoint2: go.Node | null = null;
          const itr = this.pointNodes.iterator;
          while (itr.next()) {
            const node: go.Node = itr.value;
            if (node.data.key === wall.data.key + 'PointNode' + k) {
              linkPoint1 = node;
            }
            if (node.data.key === wall.data.key + 'PointNode' + (k + 1)) {
              linkPoint2 = node;
            }
          }

          if (linkPoint1 !== null && linkPoint2 !== null) {
            const newLoc1: go.Point = this.getAdjustedPoint(
              wallPartEndpoints[0].copy(),
              wall,
              angle,
              25
            );
            const newLoc2: go.Point = this.getAdjustedPoint(
              wallPartEndpoints[wallPartEndpoints.length - 1].copy(),
              wall,
              angle,
              25
            );
            linkPoint1.data.loc = go.Point.stringify(newLoc1);
            linkPoint2.data.loc = go.Point.stringify(newLoc2);
            linkPoint1.updateTargetBindings();
            linkPoint2.updateTargetBindings();
          }
        } else {
          this.buildDimensionLink(
            wall,
            k,
            wallPartEndpoints[0].copy(),
            wallPartEndpoints[wallPartEndpoints.length - 1].copy(),
            angle,
            25,
            false,
            this,
            i
          );
        }
      } // end for loop (ensures both sides of the wall are dimensioned)
    });

    // Cleanup: hide zero-length Dimension Links, DimensionLinks with null wall points
    this.dimensionLinks.iterator.each((link) => {
      let canStay: boolean = false;
      this.pointNodes.iterator.each((node) => {
        if (node.data.key === link.data.to) canStay = true;
      });
      if (!canStay) this.remove(link);
      else {
        if (link !== null && link.toNode !== null && link.fromNode !== null) {
          const length: number = Math.sqrt(
            link.toNode.location.distanceSquaredPoint(link.fromNode.location)
          );
          if (length < 1 && !link.data.soloWallFlag) link.visible = false;
        }
      }
    });

    this.commitTransaction('update wall dimensions');
    this.skipsUndoManager = false;
  } // end updateWallDimensions()

  /**
   * @param {go.Point} pt
   * @param {number} angle
   * @param {number} distance
   */
  public rotateAndTranslatePoint(pt: go.Point, angle: number, distance: number) {
    const x: number = pt.x;
    const y: number = pt.y;
    const newX: number = Math.cos((x * Math.PI) / 180) * distance + x;
    const newY: number = Math.sin((x * Math.PI) / 180) * distance + y;
    const newPt: go.Point = new go.Point(newX, newY);
    return newPt;
  }

  /**
   * Return the point where two walls intersect. If they do not intersect, return null.
   * @param {go.Group} w1
   * @param {go.Group} w2
   * @return {go.Point | null}
   */
  public getWallsIntersection(w1: go.Group, w2: go.Group): go.Point | null {
    if (w1 === null || w2 === null) {
      return null;
    }
    const x1: number = w1.data.startpoint.x;
    const y1: number = w1.data.startpoint.y;
    const x2: number = w1.data.endpoint.x;
    const y2: number = w1.data.endpoint.y;
    const x3: number = w2.data.startpoint.x;
    const y3: number = w2.data.startpoint.y;
    const x4: number = w2.data.endpoint.x;
    const y4: number = w2.data.endpoint.y;

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return null;
    }

    const denominator: number = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    /**
     * Returns whether or not 2 points are "close enough" to each other
     * @param {go.Point} p1
     * @param {go.Point} p2
     * @return {boolean}
     */
    function pointsApproximatelyEqual(p1: go.Point, p2: go.Point): boolean {
      const xa: number = p1.x;
      const xb: number = p2.x;
      const ya: number = p1.y;
      const yb: number = p2.y;

      const diff1: number = Math.abs(xb - xa);
      const diff2: number = Math.abs(yb - ya);

      if (diff2 < 0.05 && diff1 < 0.05) {
        return true;
      }
      return false;
    }

    // Lines are parallel -- edge case, endpoint-endpoint connection of parallel walls
    if (denominator === 0) {
      // Edge Case: wall1 and wall2 have an endpoint to endpoint intersection (the only instance in which parallel walls could intersect at a specific point)
      if (
        pointsApproximatelyEqual(w1.data.startpoint, w2.data.startpoint) ||
        pointsApproximatelyEqual(w1.data.startpoint, w2.data.endpoint)
      )
        return w1.data.startpoint;
      if (
        pointsApproximatelyEqual(w1.data.endpoint, w2.data.startpoint) ||
        pointsApproximatelyEqual(w1.data.endpoint, w2.data.endpoint)
      )
        return w1.data.endpoint;
      return null;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
    const ua1 = +ua.toFixed(2);
    const ub1 = +ub.toFixed(2);

    // is the intersection along the segments
    if (ua1 < 0 || ua1 > 1 || ub1 < 0 || ub1 > 1) {
      return null;
    }

    // Return a object with the x and y coordinates of the intersection
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);

    return new go.Point(x, y);
  }

  /**
   * Return the intersection point of two segments
   * @param {go.Point} p1 Seg 1 point 1
   * @param {go.Point} p2 Seg 1 point 2
   * @param {go.Point} p3 Seg 2 point 1
   * @param {go.Point} p4 Seg 2 point 2
   * @return {go.Point | null}
   */
  public getSegmentsIntersection(
    p1: go.Point,
    p2: go.Point,
    p3: go.Point,
    p4: go.Point
  ): go.Point | null {
    const x1: number = p1.x;
    const y1: number = p1.y;
    const x2: number = p2.x;
    const y2: number = p2.y;
    const x3: number = p3.x;
    const y3: number = p3.y;
    const x4: number = p4.x;
    const y4: number = p4.y;

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return null;
    }

    const denominator: number = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    /**
     * Returns whether or not 2 points are "close enough" to each other
     * @param {go.Point} pa
     * @param {go.Point} pb
     * @return {boolean}
     */
    function pointsApproximatelyEqual(pa: go.Point, pb: go.Point): boolean {
      const xa: number = pa.x;
      const xb: number = pb.x;
      const ya: number = pa.y;
      const yb: number = pb.y;

      const diff1: number = Math.abs(xb - xa);
      const diff2: number = Math.abs(yb - ya);

      if (diff2 < 0.05 && diff1 < 0.05) {
        return true;
      }
      return false;
    }

    // Lines are parallel -- edge case, endpoint-endpoint connection of parallel walls
    if (denominator === 0) {
      // Edge Case: wall1 and wall2 have an endpoint to endpoint intersection (the only instance in which parallel walls could intersect at a specific point)
      if (pointsApproximatelyEqual(p1, p3) || pointsApproximatelyEqual(p1, p4)) return p1;
      if (pointsApproximatelyEqual(p2, p3) || pointsApproximatelyEqual(p2, p4)) return p2;
      return null;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
    const ua1 = +ua.toFixed(4);
    const ub1 = +ub.toFixed(4);

    // is the intersection along the segments
    if (ua1 < 0 || ua1 > 1 || ub1 < 0 || ub1 > 1) {
      return null;
    }

    // Return a object with the x and y coordinates of the intersection
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);

    return new go.Point(x, y);
  }

  /**
   * Update Angle Nodes shown along a wall, based on which wall(s) is/are selected
   */
  public updateWallAngles() {
    this.skipsUndoManager = true; // do not store displaying angles as a transaction
    this.startTransaction('display angles');
    if (this.model.modelData.preferences.showWallAngles) {
      this.angleNodes.iterator.each((node) => {
        node.visible = true;
      });
      const selectedWalls: Array<go.Group> = [];
      this.selection.iterator.each((part) => {
        if (part.category === 'Wall') {
          const w: go.Group = part as go.Group;
          selectedWalls.push(w);
        }
      });
      for (let i: number = 0; i < selectedWalls.length; i++) {
        const seen: go.Set<string> = new go.Set(); // Set of all walls "seen" thus far for "wall"
        const wall: go.Group = selectedWalls[i];
        const possibleWalls: go.Iterator<go.Group> = this.findNodesByExample({
          category: 'Wall'
        }) as go.Iterator<go.Group>;

        // go through all other walls; if the other wall intersects this wall, make angles
        possibleWalls.iterator.each((otherWall) => {
          if (otherWall.data === null || wall.data === null || seen.contains(otherWall.data.key))
            return;
          if (
            otherWall.data.key !== wall.data.key &&
            this.getWallsIntersection(wall, otherWall) !== null &&
            !seen.contains(otherWall.data.key)
          ) {
            seen.add(otherWall.data.key);
            // "otherWall" intersects "wall"; make or update angle nodes
            const intersectionPoint: go.Point | null = this.getWallsIntersection(wall, otherWall);
            if (intersectionPoint !== null) {
              const wrt = this.toolManager.findTool('WallReshaping') as WallReshapingTool;
              const wallsInvolved: go.List<go.Group> =
                wrt.getAllWallsAtIntersection(intersectionPoint);
              const endpoints: Array<any> = []; // store endpoints and their corresponding walls here
              // gather endpoints of each wall in wallsInvolved; discard endpoints within a tolerance distance of intersectionPoint
              wallsInvolved.iterator.each((w) => {
                const tolerance: number =
                  this.model.modelData.gridSize >= 10 ? this.model.modelData.gridSize : 10;
                if (
                  Math.sqrt(w.data.startpoint.distanceSquaredPoint(intersectionPoint)) > tolerance
                )
                  endpoints.push({ point: w.data.startpoint, wall: w.data.key });
                if (Math.sqrt(w.data.endpoint.distanceSquaredPoint(intersectionPoint)) > tolerance)
                  endpoints.push({ point: w.data.endpoint, wall: w.data.key });
              });

              // find maxRadius (shortest distance from an involved wall's endpoint to intersectionPoint or 30, whichever is smaller)
              let maxRadius: number = 30;
              for (let j: number = 0; j < endpoints.length; j++) {
                const distance: number = Math.sqrt(
                  endpoints[j].point.distanceSquaredPoint(intersectionPoint)
                );
                if (distance < maxRadius) maxRadius = distance;
              }

              // sort endpoints in a clockwise fashion around the intersectionPoint
              endpoints.sort(function (a, b) {
                a = a.point;
                b = b.point;
                if (a.x - intersectionPoint.x >= 0 && b.x - intersectionPoint.x < 0) return 1;
                if (a.x - intersectionPoint.x < 0 && b.x - intersectionPoint.x >= 0) return -1;
                if (a.x - intersectionPoint.x === 0 && b.x - intersectionPoint.x === 0) {
                  if (a.y - intersectionPoint.y >= 0 || b.y - intersectionPoint.y >= 0)
                    return a.y > b.y ? 1 : -1;
                  return b.y > a.y ? 1 : -1;
                }

                // compute the cross product of vectors (center -> a) x (center -> b)
                const det: number =
                  (a.x - intersectionPoint.x) * (b.y - intersectionPoint.y) -
                  (b.x - intersectionPoint.x) * (a.y - intersectionPoint.y);
                if (det < 0) return 1;
                if (det > 0) return -1;

                // points a and b are on the same line from the center; check which point is closer to the center
                const d1: number =
                  (a.x - intersectionPoint.x) * (a.x - intersectionPoint.x) +
                  (a.y - intersectionPoint.y) * (a.y - intersectionPoint.y);
                const d2: number =
                  (b.x - intersectionPoint.x) * (b.x - intersectionPoint.x) +
                  (b.y - intersectionPoint.y) * (b.y - intersectionPoint.y);
                return d1 > d2 ? 1 : -1;
              }); // end endpoints sort

              // for each pair of endpoints, construct or modify an angleNode
              for (let j: number = 0; j < endpoints.length; j++) {
                const p1: any = endpoints[j];
                let p2: any;
                if (endpoints[j + 1] != null) {
                  p2 = endpoints[j + 1];
                } else {
                  p2 = endpoints[0];
                }
                const a1: number = intersectionPoint.directionPoint(p1.point);
                const a2: number = intersectionPoint.directionPoint(p2.point);
                const sweep: number = Math.abs(a2 - a1 + 360) % 360;
                const angle: number = a1;

                //    construct proper key for angleNode
                //    proper angleNode key syntax is "wallWwallX...wallYangleNodeZ" such that W < Y < Y; angleNodes are sorted clockwise around the intersectionPoint by Z
                const keyArray: Array<go.Group> = []; // used to construct proper key
                wallsInvolved.iterator.each(function (w) {
                  keyArray.push(w);
                });
                keyArray.sort(function (a, b) {
                  const aIndex = a.data.key.match(/\d+/g);
                  const bIndex = b.data.key.match(/\d+/g);
                  if (isNaN(aIndex)) return 1;
                  if (isNaN(bIndex)) return -1;
                  else return aIndex > bIndex ? 1 : -1;
                });

                let key: string = '';
                for (let k: number = 0; k < keyArray.length; k++) key += keyArray[k].data.key;
                key += 'angle' + j;

                // check if this angleNode already exists -- if it does, adjust data (instead of deleting/redrawing)
                let angleNode: go.Node | null = null;
                const aItr = this.angleNodes.iterator;
                while (aItr.next()) {
                  const aNode: go.Node = aItr.value;
                  if (aNode.data.key === key) {
                    angleNode = aNode;
                  }
                }

                if (angleNode !== null) {
                  angleNode.data.angle = angle;
                  angleNode.data.sweep = sweep;
                  angleNode.data.loc = go.Point.stringify(intersectionPoint);
                  angleNode.data.maxRadius = maxRadius;
                  angleNode.updateTargetBindings();
                } else {
                  const data = {
                    key: key,
                    category: 'AngleNode',
                    loc: go.Point.stringify(intersectionPoint),
                    stroke: 'dodgerblue',
                    angle: angle,
                    sweep: sweep,
                    maxRadius: maxRadius
                  };
                  const newAngleNode: go.Node = makeAngleNode();
                  newAngleNode.data = data;
                  this.add(newAngleNode);
                  newAngleNode.updateTargetBindings();
                  this.angleNodes.add(newAngleNode);
                }
              }
            } // end intersectionPt null check
          }
        });
      }
      // garbage collection (angleNodes that should not exist any more)
      const garbage: Array<go.Node> = [];
      this.angleNodes.iterator.each((node) => {
        const keyNums = node.data.key.match(/\d+/g); // values X for all wall keys involved, given key "wallX"
        const numWalls: number = (node.data.key.match(/wall/g) || []).length; // # of walls involved in in "node"'s construction
        const wallsInvolved: Array<string> = [];

        // add all walls involved in angleNode's construction to wallsInvolved
        for (let i: number = 0; i < keyNums.length - 1; i++) {
          wallsInvolved.push('wall' + keyNums[i]);
        }
        // edge case: if the numWalls != keyNums.length, that means the wall with key "wall" (no number in key) is involved
        if (numWalls !== keyNums.length - 1) {
          wallsInvolved.push('wall');
        }

        // Case 1: if any wall pairs involved in this angleNode are no longer intersecting, add this angleNode to "garbage"
        for (let i: number = 0; i < wallsInvolved.length - 1; i++) {
          const wall1: go.Group = this.findPartForKey(wallsInvolved[i]) as go.Group;
          const wall2: go.Group = this.findPartForKey(wallsInvolved[i + 1]) as go.Group;
          const intersectionPoint: go.Point | null = this.getWallsIntersection(wall1, wall2);
          if (intersectionPoint === null) garbage.push(node);
        }
        // Case 2: if there are angleNode clusters with the same walls in their keys as "node" but different locations, destroy and rebuild
        // collect all angleNodes with same walls in their construction as "node"
        const possibleAngleNodes: go.Set<go.Node> = new go.Set();
        const allWalls = node.data.key.slice(0, node.data.key.indexOf('angle'));
        this.angleNodes.iterator.each(function (other) {
          if (other.data.key.indexOf(allWalls) !== -1) possibleAngleNodes.add(other);
        });
        possibleAngleNodes.iterator.each(function (pNode) {
          if (pNode.data.loc !== node.data.loc) {
            garbage.push(pNode);
          }
        });

        // Case 3: put any angleNodes with sweep === 0 in garbage
        if (node.data.sweep === 0) garbage.push(node);
      });

      for (let i: number = 0; i < garbage.length; i++) {
        this.remove(garbage[i]); // remove garbage
        this.angleNodes.remove(garbage[i]);
      }
    }
    // hide all angles > 180 if show only small angles == true in preferences
    if (this.model.modelData.preferences.showOnlySmallWallAngles) {
      this.angleNodes.iterator.each(function (node) {
        if (node.data.sweep >= 180) node.visible = false;
      });
    }
    // hide all angles if show wall angles == false in preferences
    if (!this.model.modelData.preferences.showWallAngles) {
      this.angleNodes.iterator.each(function (node) {
        node.visible = false;
      });
    }
    this.commitTransaction('display angles');
    this.skipsUndoManager = false;
  }

  /**
   * Find closest loc (to a wall part's loc) on wall a wallPart can be dropped onto without extending beyond wall endpoints or intruding into another wallPart
   * @param {go.Group} wall A reference to a Wall Group
   * @param {go.Part} part A reference to a Wall Part Node -- i.e. Door Node, Window Node
   * @return {go.Point}
   */
  public findClosestLocOnWall(wall: go.Group, part: go.Part): go.Point | null {
    let orderedConstrainingPts = []; // wall endpoints and wallPart endpoints
    const startpoint = wall.data.startpoint.copy();
    const endpoint = wall.data.endpoint.copy();
    // store all possible constraining endpoints (wall endpoints and wallPart endpoints) in the order in which they appear (left/top to right/bottom)
    const firstWallPt =
      startpoint.x + startpoint.y <= endpoint.x + endpoint.y ? startpoint : endpoint;
    const lastWallPt =
      startpoint.x + startpoint.y > endpoint.x + endpoint.y ? startpoint : endpoint;
    const wallPartEndpoints: Array<any> = [];
    wall.memberParts.iterator.each(function (wallPart) {
      const endpoints = getWallPartEndpoints(wallPart);
      wallPartEndpoints.push(endpoints[0]);
      wallPartEndpoints.push(endpoints[1]);
    });
    // sort all wallPartEndpoints by x coordinate left to right
    wallPartEndpoints.sort(function (a, b) {
      if (a.x + a.y > b.x + b.y) {
        return 1;
      }
      if (a.x + a.y < b.x + b.y) {
        return -1;
      } else {
        return 0;
      }
    });
    orderedConstrainingPts.push(firstWallPt);
    orderedConstrainingPts = orderedConstrainingPts.concat(wallPartEndpoints);
    orderedConstrainingPts.push(lastWallPt);

    // go through all constraining points; if there's a free stretch along the wall "part" could fit in, remember it
    const possibleStretches = [];
    for (let i = 0; i < orderedConstrainingPts.length; i += 2) {
      const point1 = orderedConstrainingPts[i];
      const point2 = orderedConstrainingPts[i + 1];
      const distanceBetween = Math.sqrt(point1.distanceSquaredPoint(point2));
      if (distanceBetween >= part.data.length) {
        possibleStretches.push({ pt1: point1, pt2: point2 });
      }
    }

    // go through all possible stretches along the wall the part *could* fit in; find the one closest to the part's current location
    let closestDist = Number.MAX_VALUE;
    let closestStretch: any = null;
    for (let i = 0; i < possibleStretches.length; i++) {
      const testStretch = possibleStretches[i];
      const testPoint1 = testStretch.pt1;
      const testPoint2 = testStretch.pt2;
      const testDistance1 = Math.sqrt(testPoint1.distanceSquaredPoint(part.location));
      const testDistance2 = Math.sqrt(testPoint2.distanceSquaredPoint(part.location));
      if (testDistance1 < closestDist) {
        closestDist = testDistance1;
        closestStretch = testStretch;
      }
      if (testDistance2 < closestDist) {
        closestDist = testDistance2;
        closestStretch = testStretch;
      }
    }

    // Edge Case: If there's no space for the wallPart, return null
    if (closestStretch === null) {
      return null;
    }

    // using the closest free stretch along the wall, calculate endpoints that make the stretch's line segment, then project part.location onto the segment
    const closestStretchLength = Math.sqrt(
      closestStretch.pt1.distanceSquaredPoint(closestStretch.pt2)
    );
    const offset = part.data.length / 2;
    const pt1 = new go.Point(
      closestStretch.pt1.x +
        (offset / closestStretchLength) * (closestStretch.pt2.x - closestStretch.pt1.x),
      closestStretch.pt1.y +
        (offset / closestStretchLength) * (closestStretch.pt2.y - closestStretch.pt1.y)
    );
    const pt2 = new go.Point(
      closestStretch.pt2.x +
        (offset / closestStretchLength) * (closestStretch.pt1.x - closestStretch.pt2.x),
      closestStretch.pt2.y +
        (offset / closestStretchLength) * (closestStretch.pt1.y - closestStretch.pt2.y)
    );
    const newLoc = part.location.copy().projectOntoLineSegmentPoint(pt1, pt2);
    return newLoc;
  }
} // end Floorplan class definition

/*
 * General Templates:
 * Context Menu, Default Group
 */

// Default Group
function makeDefaultGroup() {
  return (
    new go.Group('Vertical', {
      contextMenu: makeContextMenu(),
      toolTip: makeGroupToolTip()
    })
      // .bind('location', 'loc')
      .add(
        new go.Panel('Auto').add(
          new go.Shape('RoundedRectangle', {
            fill: 'rgba(128,128,128,0.15)',
            stroke: 'rgba(128, 128, 128, .05)',
            name: 'SHAPE',
            strokeCap: 'square'
          }).bindObject('fill', 'isSelected', function (s, obj) {
            return s ? 'rgba(128, 128, 128, .15)' : 'rgba(128, 128, 128, 0.10)';
          }),
          new go.Placeholder({ padding: 5 })
        )
      )
  );
}

/*
 * Dependencies for Angle Nodes:
 * Make Arc
 */

// Return arc geometry for Angle Nodes
function makeArc(node: go.Node) {
  const ang = node.data.angle;
  const sweep = node.data.sweep;
  const rad = Math.min(30, node.data.maxRadius);
  if (typeof sweep === 'number' && sweep > 0) {
    const start = new go.Point(rad, 0).rotate(ang);
    // this is much more efficient than calling go.GraphObject.make:
    return new go.Geometry()
      .add(
        new go.PathFigure(start.x + rad, start.y + rad) // start point
          .add(
            new go.PathSegment(
              go.SegmentType.Arc,
              ang,
              sweep, // angles
              rad,
              rad, // center
              rad,
              rad
            ) // radius
          )
      )
      .add(new go.PathFigure(0, 0))
      .add(new go.PathFigure(2 * rad, 2 * rad));
  } else {
    // make sure this arc always occupies the same circular area of RAD radius
    return new go.Geometry().add(new go.PathFigure(0, 0)).add(new go.PathFigure(2 * rad, 2 * rad));
  }
}

/*
 * Dependencies for Dimension Links
 * Make Point Node
 */

// Return a Point Node (used for Dimension Links)
function makePointNode() {
  return new go.Node('Position').bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);
}

/*
 * Dynamically appearing parts:
 * Angle Node, Dimension Link
 */

// Return an Angle Node (for each angle needed in the diagram, one angle node is made)
function makeAngleNode() {
  return new go.Node('Spot', {
    locationSpot: go.Spot.Center,
    locationObjectName: 'SHAPE',
    selectionAdorned: false
  })
    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
    .add(
      new go.Shape('Circle', { name: 'SHAPE', height: 0, width: 0 }),
      new go.Shape({ strokeWidth: 1.5, fill: null })
        .bindObject('geometry', '', makeArc)
        .bind('stroke', 'sweep', function (sweep) {
          return sweep % 45 < 1 || sweep % 45 > 44 ? 'dodgerblue' : 'lightblue';
        }),
      // Arc label panel
      new go.Panel('Auto', { name: 'ARCLABEL' })
        // position the label in the center of the arc
        .bind('alignment', 'sweep', function (sweep, panel) {
          const rad = Math.min(30, panel.part.data.maxRadius);
          const angle = panel.part.data.angle;
          const center = new go.Point(rad, 0).rotate(angle + sweep / 2);
          return new go.Spot(0.5, 0.5, center.x, center.y);
        })
        .add(
          // rectangle containing angle text
          new go.Shape({ fill: 'white' }).bind('stroke', 'sweep', function (sweep) {
            return sweep % 45 < 1 || sweep % 45 > 44 ? 'dodgerblue' : 'lightblue';
          }),
          // angle text
          new go.TextBlock({ font: '7pt sans-serif', margin: 2 }).bind(
            'text',
            'sweep',
            function (sweep) {
              return sweep.toFixed(2) + String.fromCharCode(176);
            }
          )
        )
    );
}

/**
 * Returns a Dimension Link
 * @param {number} opacity How opaque the link is, 0-1. Optional. Default is 1.
 * @param {string} stroke The color of the link stroke. Optional. Default is gray.
 * @param {number} strokeWidth The width of the link stroke. Optional. Default is 2.
 */
function makeDimensionLink(opacity?: number, stroke?: string, strokeWidth?: number) {
  if (opacity === null || opacity === undefined || isNaN(opacity)) {
    opacity = 1;
  }
  if (strokeWidth === null || strokeWidth === undefined || isNaN(strokeWidth)) {
    strokeWidth = 2;
  }
  if (stroke === null || stroke === undefined) {
    stroke = 'gray';
  }

  return new go.Link().add(
    new go.Shape({ stroke: stroke, strokeWidth: strokeWidth, name: 'SHAPE', opacity: opacity }),
    // to arrow shape
    new go.Shape({
      toArrow: 'OpenTriangle',
      stroke: stroke,
      strokeWidth: strokeWidth,
      opacity: opacity
    }),
    new go.Shape(
      // from arrow shape
      {
        fromArrow: 'BackwardOpenTriangle',
        stroke: stroke,
        strokeWidth: strokeWidth,
        opacity: opacity
      }
    ),
    new go.Panel('Auto')
      // bind angle of textblock to angle of link -- always make text rightside up and readable
      .bind('angle', 'angle', function (angle, link) {
        if (angle > 90 && angle < 270) {
          return (angle + 180) % 360;
        }
        return angle;
      })
      .add(
        new go.Shape('RoundedRectangle', { fill: 'beige', opacity: 0.8, stroke: null }),
        // dimension link text
        new go.TextBlock({
          text: 'sometext',
          segmentOffset: new go.Point(0, -10),
          font: '13px sans-serif'
        })
          .bindObject('text', '', function (link) {
            const floorplan = link.diagram;
            if (!floorplan) return '';
            const pxDist = link.data.length;
            const unitsDist = floorplan.convertPixelsToUnits(pxDist).toFixed(2);
            const unitsAbbreviation = floorplan.model.modelData.unitsAbbreviation;
            return unitsDist.toString() + unitsAbbreviation;
          })
          // default position text above / below dimension link based on angle
          .bindObject('segmentOffset', 'angle', function () {
            return new go.Point(0, 10);
          })
          // scale font size according to the length of the link
          .bindObject('font', '', function (link) {
            const distance = link.data.length;
            if (distance > 40) {
              return '13px sans-serif';
            }
            if (distance >= 20) {
              return '11px sans-serif';
            }
            return '9px sans-serif';
          })
      )
  );
}
