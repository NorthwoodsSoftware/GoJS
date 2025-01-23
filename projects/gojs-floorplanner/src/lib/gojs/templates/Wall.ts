import go from 'gojs';
import type { Floorplan } from '../Floorplan';
import type { WallReshapingTool } from '../WallReshapingTool';
import { makeContextMenu, makeGroupToolTip, TemplateColors } from './Shared';

type Connecteds = { connectedFrom: string; connectedTo: string };

// MouseDrop event for wall groups; if a door or window is dropped on a wall, add it to the wall group
// Do not allow dropping wallParts that would extend beyond wall endpoints or intrude into another wallPart
const addWallPart = function (e: go.InputEvent, wall: go.GraphObject): void {
  if (!(wall instanceof go.Group)) return;
  if (wall.data.isDivider) return;
  const floorplan: Floorplan = e.diagram as Floorplan;
  const wallPart = floorplan.selection.first();
  if (
    wallPart &&
    (wallPart.category === 'Window' || wallPart.category === 'Door') &&
    wallPart.containingGroup === null
  ) {
    const newLoc = floorplan.findClosestLocOnWall(wall, wallPart);
    if (newLoc !== null) {
      const shape: go.Shape = wall.findObject('SHAPE') as go.Shape;
      shape.stroke = 'black';
      floorplan.model.setDataProperty(wallPart.data, 'group', wall.data.key);
      wallPart.location = newLoc.projectOntoLineSegmentPoint(
        wall.data.startpoint,
        wall.data.endpoint
      );
      wallPart.angle = wall.data.startpoint.directionPoint(wall.data.endpoint);
      if (wallPart.category === 'Window') {
        floorplan.model.setDataProperty(wallPart.data, 'height', wall.data.thickness);
      }
      if (wallPart.category === 'Door') {
        floorplan.model.setDataProperty(wallPart.data, 'doorOpeningHeight', wall.data.thickness);
      }
    } else {
      floorplan.remove(wallPart);
      alert("There's not enough room on the wall!");
      return;
    }
  }
  floorplan.updateWallDimensions();
};

// MouseDragEnter event for walls; if a door or window is dragged over a wall, highlight the wall and change its angle
const wallPartDragOver = function (e: go.InputEvent, wall: go.GraphObject): void {
  if (!(wall instanceof go.Group)) return;
  if (wall.data.isDivider) return;
  const floorplan = e.diagram;
  let draggingParts = floorplan.toolManager.draggingTool.draggedParts;
  if (draggingParts === null) {
    draggingParts = floorplan.toolManager.draggingTool.copiedParts;
  }
  if (draggingParts !== null) {
    draggingParts.iterator.each(function (kvp: go.IKeyValuePair<go.Part, go.DraggingInfo>) {
      const part: go.Part = kvp.key;
      if (
        (part.category === 'Window' || part.category === 'Door') &&
        part.containingGroup === null
      ) {
        const shape: go.Shape = wall.findObject('SHAPE') as go.Shape;
        shape.stroke = 'lightblue';
        part.angle = wall.rotateObject.angle;
      }
    });
  }
};

// MouseDragLeave event for walls; if a wall part is dragged past a wall, unhighlight the wall and change back the wall part's angle to 0
const wallPartDragAway = function (e: go.InputEvent, wall: go.GraphObject) {
  if (!(wall instanceof go.Group)) return;
  const floorplan = e.diagram;
  const shape = wall.findObject('SHAPE') as go.Shape;
  if (shape !== null) {
    shape.stroke = 'black';
    let draggingParts = floorplan.toolManager.draggingTool.draggedParts;
    if (draggingParts === null) {
      draggingParts = floorplan.toolManager.draggingTool.copiedParts;
    }
    if (draggingParts !== null) {
      draggingParts.iterator.each(function (kvp: go.IKeyValuePair<go.Part, go.DraggingInfo>) {
        const part = kvp.key;
        if (
          (part.category === 'Window' || part.category === 'Door') &&
          part.containingGroup === null
        ) {
          part.angle = 0;
        }
      });
    }
  }
};

export const Wall = new go.Group('Spot', {
  contextMenu: makeContextMenu(),
  toolTip: makeGroupToolTip(),
  selectionObjectName: 'SHAPE',
  rotateObjectName: 'SHAPE',
  locationSpot: go.Spot.TopLeft,
  reshapable: true,
  minSize: new go.Size(1, 1),
  selectionAdorned: false,
  mouseDrop: addWallPart,
  mouseDragEnter: wallPartDragOver,
  mouseDragLeave: wallPartDragAway,
  dragComputation: function (part: go.Part, pt: go.Point, gridPt: go.Point) {
    let curLoc = part.location;
    const origLoc = part.location.copy();
    const fp: Floorplan = part.diagram as Floorplan;
    // only allow drag if only one wall is selected at a time
    let wallCount = 0;
    fp.selection.iterator.each(function (p: go.Part) {
      if (p.category === 'Wall') {
        wallCount++;
        if (p.data.key !== part.data.key) {
          // p.isSelected = false;
        }
      }
      if (p.category === 'Room') {
        p.isSelected = false;
      }
    });

    if (wallCount > 1) {
      return curLoc;
    }

    const gs = fp.grid.gridCellSize;
    gridPt.x -= gs.width / 2;
    gridPt.y -= gs.height / 2;
    const wrt: WallReshapingTool = fp.toolManager.findTool('WallReshaping') as WallReshapingTool;

    // Generate a map of all walls connected to this wall's endpoints (and at which endpoints those walls are connected at/to)
    const connectedWallsMap = new go.Map<string, Connecteds>();
    const wallsAtStartpoint = wrt.getAllWallsAtIntersection(part.data.startpoint, true);
    wallsAtStartpoint.iterator.each(function (w: go.Group) {
      if (w.data.key !== part.data.key) {
        if (wrt.pointsApproximatelyEqual(w.data.startpoint, part.data.startpoint)) {
          connectedWallsMap.add(w.data.key, {
            connectedTo: 'startpoint',
            connectedFrom: 'startpoint'
          });
        } else if (wrt.pointsApproximatelyEqual(w.data.endpoint, part.data.startpoint)) {
          connectedWallsMap.add(w.data.key, {
            connectedTo: 'startpoint',
            connectedFrom: 'endpoint'
          });
        }
      }
    });

    const wallsAtEndpoint = wrt.getAllWallsAtIntersection(part.data.endpoint, true);
    wallsAtEndpoint.iterator.each(function (w: go.Group) {
      if (w.data.key !== part.data.key) {
        if (wrt.pointsApproximatelyEqual(w.data.startpoint, part.data.endpoint)) {
          connectedWallsMap.add(w.data.key, {
            connectedTo: 'endpoint',
            connectedFrom: 'startpoint'
          });
        } else if (wrt.pointsApproximatelyEqual(w.data.endpoint, part.data.endpoint)) {
          connectedWallsMap.add(w.data.key, {
            connectedTo: 'endpoint',
            connectedFrom: 'endpoint'
          });
        }
      }
    });

    const ptToUse = fp.toolManager.draggingTool.isGridSnapEnabled ? gridPt : pt;
    const wall = part as go.Group;
    const changedWalls = new go.Set<go.Group>();
    moveAndUpdate(ptToUse);
    /**
     * Helper function -- actually moves wall / connected walls, based on a given point to use as reference
     * @param pointToUse
     */
    function moveAndUpdate(pointToUse: go.Point) {
      // Offset this wall's startpoint and endpoints
      const dx = pointToUse.x - curLoc.x;
      const dy = pointToUse.y - curLoc.y;
      fp.model.set(
        part.data,
        'startpoint',
        new go.Point(part.data.startpoint.x + dx, part.data.startpoint.y + dy)
      );
      fp.model.set(
        part.data,
        'endpoint',
        new go.Point(part.data.endpoint.x + dx, part.data.endpoint.y + dy)
      );
      wrt.performMiteringOnWall(wall);

      // Reset each connected wall's connected endpoints to the proper new start or endpoint of the dragging wall
      connectedWallsMap.iterator.each(function (kvp: go.IKeyValuePair<string, Connecteds>) {
        const wKey = kvp.key;
        const d = kvp.value;
        const w = fp.findNodeForKey(wKey) as go.Group;
        if (w != null && w.data.key !== wall.data.key) {
          fp.model.set(w.data, d.connectedFrom, part.data[d.connectedTo]);
          wrt.performMiteringOnWall(w);
        }
      });

      // Miter, which will also update the walls
      wrt.performMiteringAtPoint(wall.data.startpoint, true);
      wrt.performMiteringAtPoint(wall.data.endpoint, true);
      curLoc = wall.location;

      connectedWallsMap.iterator.each(function (kvp: go.IKeyValuePair<string, Connecteds>) {
        const w = fp.findNodeForKey(kvp.key) as go.Group;
        changedWalls.add(w);
      });
      changedWalls.add(wall);

      fp.updateWallDimensions(changedWalls);
      fp.updateWallAngles();
    }

    // check if selected wall is now overlapping some wall it shouldn't be
    const allWalls = fp.findNodesByExample({ category: 'Wall' });
    // let cannotMove = false;
    allWalls.iterator.each(function (n: go.Node) {
      const w = n as go.Group;
      if (wall && wall.data.key !== w.data.key && fp.getWallsIntersection(wall, w)) {
        if (!changedWalls.contains(w)) {
          moveAndUpdate(origLoc);
          return origLoc;
        }
      }
    });

    return wall.location;
  },
  copyable: false
}).add(
  new go.Shape({
    name: 'SHAPE',
    fill: TemplateColors.wall1,
    stroke: TemplateColors.wall1stroke,
    strokeWidth: 1
  })
    // .bind('fill', 'color')
    .bindObject('stroke', 'isSelected', function (s, obj) {
      if (obj.part.containingGroup != null) {
        const group = obj.part.containingGroup;
        if (s) {
          group.data.isSelected = true;
        }
      }
      return s ? 'dodgerblue' : TemplateColors.wall1stroke;
    })
);
