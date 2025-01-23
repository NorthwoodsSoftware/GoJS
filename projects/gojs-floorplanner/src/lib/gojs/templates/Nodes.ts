import go from 'gojs';
import { makeContextMenu, TemplateColors, TemplateGeometries } from './Shared';
import type { Floorplan } from '../Floorplan';

export const RoomNode = new go.Node('Spot', {
  contextMenu: makeContextMenu(),
  selectionObjectName: 'SHAPE',
  rotateObjectName: 'SHAPE',
  locationSpot: go.Spot.TopLeft,
  reshapable: true,
  copyable: false,
  minSize: new go.Size(1, 1),
  movable: false,
  locationObjectName: 'SHAPE',
  layerName: 'Background',
  selectionAdorned: false
}).add(
  // this geometry is dependent on the walls this room is bound by, defined in its data
  new go.Shape({
    name: 'SHAPE',
    fill: TemplateColors.room,
    stroke: 'black',
    strokeWidth: 1
  }).bindObject('fill', 'isSelected', function (s) {
    return s ? TemplateColors.roomSelected : TemplateColors.room;
  }),
  new go.Panel('Horizontal', {
    cursor: 'move',
    name: 'ROOM_LABEL'
  })
    .bind('alignment', 'labelAlignment')
    .add(
      new go.Panel('Auto').bind('visible', 'showLabel').add(
        new go.Shape('RoundedRectangle', {
          fill: 'beige',
          opacity: 0.5,
          stroke: null,
          strokeWidth: 3,
          name: 'ROOM_LABEL_SHAPE'
        }).bindObject('stroke', 'isSelected', function (is) {
          return is ? 'dodgerblue' : null;
        }),
        new go.Panel('Vertical').add(
          new go.TextBlock('Room Name', {
            editable: true,
            cursor: 'text',
            font: 'normal normal bold 13px sans-serif'
          }).bindTwoWay('text', 'name'),
          new go.TextBlock('Room Size', { name: 'ROOM_LABEL_SIZE' }).bindObject(
            'text',
            '',
            function (room) {
              const fp: Floorplan = room.diagram as Floorplan;
              const area: number = fp.getRoomArea(room);
              // convert raw area to units (gotta do it twice, because its units squared)
              const adjustedArea: string = fp
                .convertPixelsToUnits(fp.convertPixelsToUnits(area))
                .toFixed(2);
              return adjustedArea + fp.model.modelData.unitsAbbreviation + String.fromCharCode(178);
            }
          )
        )
      ) // end Auto Panel
    )
); // end Node

/*
 * Furniture Node Templates:
 * Default Node, MultiPurpose Node
 */

// Default Node
export const DefaultNode = new go.Node('Spot', {
  resizable: true,
  rotatable: true,
  toolTip: makeNodeToolTip(),
  contextMenu: makeContextMenu(),
  locationObjectName: 'SHAPE',
  resizeObjectName: 'SHAPE',
  rotateObjectName: 'SHAPE',
  minSize: new go.Size(5, 5),
  locationSpot: go.Spot.Center,
  selectionAdorned: false
})
  // remember Node location
  .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
  // move selected Node to Foreground layer so it's not obscured by non-selected Parts
  .bindObject('layerName', 'isSelected', function (s) {
    return s ? 'Foreground' : '';
  })
  .add(
    // Primary node shape
    new go.Shape('Ellipse', {
      name: 'SHAPE',
      stroke: '#000000',
      fill: TemplateColors.furn1
    })
      .bind('fill', 'color', (c) => {
        // See if the color is referencing a value in TemplateColors
        if (TemplateColors[c] !== undefined) return TemplateColors[c];
        return c;
      })
      .bind('geometryString', 'geo', (g: keyof typeof TemplateGeometries) => {
        if (TemplateGeometries[g] !== undefined) return TemplateGeometries[g];
        return g;
      })
      .bindTwoWay('figure', 'shape')
      .bindTwoWay('width')
      .bindTwoWay('height')
      .bindTwoWay('angle'),

    // Label
    new go.Panel('Auto', {
      visible: false
    })
      .bind('visible', 'showLabel')
      .add(
        new go.Shape('RoundedRectangle', { fill: 'beige', opacity: 0.5, stroke: null }),
        new go.TextBlock({
          margin: 5,
          wrap: go.Wrap.Fit,
          textAlign: 'center',
          editable: true,
          isMultiline: false,
          stroke: 'black',
          font: '10pt sans-serif'
        })
          .bindTwoWay('text')
          .bindTwoWay('angle', 'angle')
          .bind('font', 'height', function (height) {
            if (height > 25) {
              return '10pt sans-serif';
            }
            if (height < 25 && height > 15) {
              return '8pt sans-serif';
            } else {
              return '6pt sans-serif';
            }
          })
      )
  );

/*
 * Wall Part Nodes:
 * Window Node, Door Node, Palette Wall Node
 */

/**
 * Drag computation function for Windows and Doors; ensure wall parts stay in walls when dragged
 * @param {go.Part} part A reference to dragged Part
 * @param {go.Point} pt The Point describing the proposed location
 * @return {go.Point}
 */
const dragWallParts = function (part: go.Part, pt: go.Point): go.Point {
  if (part.containingGroup !== null && part.containingGroup.category === 'Wall') {
    const floorplan: Floorplan = part.diagram as Floorplan;
    // Edge Case: if part is not on its wall (due to incorrect load) snap part.loc onto its wall immediately; ideally this is never called
    const wall = part.containingGroup;
    const wStart = wall.data.startpoint;
    const wEnd = wall.data.endpoint;
    const dist1 = Math.sqrt(wStart.distanceSquaredPoint(part.location));
    const dist2 = Math.sqrt(part.location.distanceSquaredPoint(wEnd));
    const totalDist = Math.sqrt(wStart.distanceSquaredPoint(wEnd));
    if (dist1 + dist2 !== totalDist) {
      part.location = part.location.copy().projectOntoLineSegmentPoint(wStart, wEnd);
    }

    // main behavior
    const stretch = getWallPartStretch(part);
    const leftOrAbovePt = stretch.point1;
    const rightOrBelowPt = stretch.point2;

    // calc points along line created by the endpoints that are half the width of the moving window/door
    const totalLength = Math.sqrt(leftOrAbovePt.distanceSquaredPoint(rightOrBelowPt));
    const distance = part.data.length / 2;
    const point1 = new go.Point(
      leftOrAbovePt.x + (distance / totalLength) * (rightOrBelowPt.x - leftOrAbovePt.x),
      leftOrAbovePt.y + (distance / totalLength) * (rightOrBelowPt.y - leftOrAbovePt.y)
    );
    const point2 = new go.Point(
      rightOrBelowPt.x + (distance / totalLength) * (leftOrAbovePt.x - rightOrBelowPt.x),
      rightOrBelowPt.y + (distance / totalLength) * (leftOrAbovePt.y - rightOrBelowPt.y)
    );

    // calc distance from pt to line (part's wall) - use point to 2pt line segment distance formula
    const distFromWall =
      Math.abs(
        (wEnd.y - wStart.y) * pt.x -
          (wEnd.x - wStart.x) * pt.y +
          wEnd.x * wStart.y -
          wEnd.y * wStart.x
      ) / Math.sqrt(Math.pow(wEnd.y - wStart.y, 2) + Math.pow(wEnd.x - wStart.x, 2));
    const tolerance = 20 * wall.data.thickness < 100 ? 20 * wall.data.thickness : 100;

    // if distance from pt to line > some tolerance, detach the wallPart from the wall
    if (distFromWall > tolerance) {
      part.containingGroup = null;
      delete part.data.group;
      part.angle = 0;
      floorplan.pointNodes.iterator.each(function (node) {
        floorplan.remove(node);
      });
      floorplan.dimensionLinks.iterator.each(function (link) {
        floorplan.remove(link);
      });
      floorplan.pointNodes.clear();
      floorplan.dimensionLinks.clear();
      floorplan.updateWallDimensions();
    }

    // project the proposed location onto the line segment created by the new points (ensures wall parts are constrained properly when dragged)
    pt = pt.copy().projectOntoLineSegmentPoint(point1, point2);
    floorplan.skipsUndoManager = true;
    floorplan.startTransaction('set loc');
    floorplan.model.setDataProperty(part.data, 'loc', go.Point.stringify(pt));
    floorplan.commitTransaction('set loc');
    floorplan.skipsUndoManager = false;

    floorplan.updateWallDimensions(); // update the dimension links created by having this wall part selected
  }
  return pt;
};

/**
 * Returns a "stretch" (2 Points) that constrains a wallPart (door or window), comprised of "part"'s containing wall endpoints or other wallPart endpoints
 * @param {go.Part} part A Wall Part Node -- i.e. Door Node, Window Node, that is attached to a wall
 * @return {any} An object with fields 'point1' and 'point2'
 */
function getWallPartStretch(part: go.Part): { point1: go.Point; point2: go.Point } {
  const wall = part.containingGroup;
  if (wall === null) return { point1: new go.Point(), point2: new go.Point() };
  const startpoint = wall.data.startpoint.copy();
  const endpoint = wall.data.endpoint.copy();

  // sort all possible endpoints into either left/above or right/below
  const leftOrAbove = new go.Set(/*go.Point*/);
  const rightOrBelow = new go.Set(/*go.Point*/);
  wall.memberParts.iterator.each(function (wallPart) {
    if (wallPart.data.key !== part.data.key) {
      const endpoints = getWallPartEndpoints(wallPart);
      for (let i = 0; i < endpoints.length; i++) {
        if (
          endpoints[i].x < part.location.x ||
          (endpoints[i].y > part.location.y && endpoints[i].x === part.location.x)
        ) {
          leftOrAbove.add(endpoints[i]);
        } else {
          rightOrBelow.add(endpoints[i]);
        }
      }
    }
  });

  // do the same with the startpoint and endpoint of the dragging part's wall
  if (
    parseFloat(startpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) ||
    (startpoint.y > part.location.y &&
      parseFloat(startpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))
  ) {
    leftOrAbove.add(startpoint);
  } else {
    rightOrBelow.add(startpoint);
  }
  if (
    parseFloat(endpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) ||
    (endpoint.y > part.location.y &&
      parseFloat(endpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))
  ) {
    leftOrAbove.add(endpoint);
  } else {
    rightOrBelow.add(endpoint);
  }

  // of each set, find the closest point to the dragging part
  let leftOrAbovePt = new go.Point();
  let closestDistLeftOrAbove = Number.MAX_VALUE;
  leftOrAbove.iterator.each(function (point) {
    const pt: go.Point = point as go.Point;
    const distance = Math.sqrt(pt.distanceSquaredPoint(part.location));
    if (distance < closestDistLeftOrAbove) {
      closestDistLeftOrAbove = distance;
      leftOrAbovePt = pt;
    }
  });
  let rightOrBelowPt = new go.Point();
  let closestDistRightOrBelow = Number.MAX_VALUE;
  rightOrBelow.iterator.each(function (point) {
    const pt: go.Point = point as go.Point;
    const distance = Math.sqrt(pt.distanceSquaredPoint(part.location));
    if (distance < closestDistRightOrBelow) {
      closestDistRightOrBelow = distance;
      rightOrBelowPt = pt;
    }
  });

  const stretch = { point1: leftOrAbovePt, point2: rightOrBelowPt };
  return stretch;
}

// Window Node
export const Window = new go.Node('Spot', {
  contextMenu: makeContextMenu(),
  selectionObjectName: 'SHAPE',
  selectionAdorned: false,
  locationSpot: go.Spot.Center,
  toolTip: makeNodeToolTip(),
  minSize: new go.Size(5, 5),
  resizable: true,
  resizeAdornmentTemplate: makeWallPartResizeAdornment(),
  resizeObjectName: 'SHAPE',
  rotatable: false,
  dragComputation: dragWallParts,
  layerName: 'Foreground' // make sure windows are always in front of walls
})
  .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
  .bindTwoWay('angle')
  .add(
    new go.Shape({ name: 'SHAPE', fill: 'white', strokeWidth: 0 })
      .bindTwoWay('width', 'length')
      .bindTwoWay('height')
      .bindObject('stroke', 'isSelected', function (s) {
        return s ? 'dodgerblue' : 'black';
      })
      .bindObject('fill', 'isSelected', function (s) {
        return s ? 'lightgray' : 'white';
      }),
    new go.Shape({ name: 'LINESHAPE', fill: 'darkgray', strokeWidth: 0, height: 10 })
      .bind('width', 'length', (width) => {
        return width - 10;
      })
      .bind('height', 'height', (height) => {
        return height / 5;
      })
      .bindObject('stroke', 'isSelected', (s) => {
        return s ? 'dodgerblue' : 'black';
      })
  );

// Door Node
export const Door = new go.Node('Spot', {
  contextMenu: makeContextMenu(),
  selectionObjectName: 'SHAPE',
  selectionAdornmentTemplate: makeDoorSelectionAdornment(),
  locationSpot: go.Spot.BottomCenter,
  resizable: true,
  resizeObjectName: 'OPENING_SHAPE',
  toolTip: makeNodeToolTip(),
  minSize: new go.Size(10, 10),
  dragComputation: dragWallParts,
  resizeAdornmentTemplate: makeWallPartResizeAdornment(),
  layerName: 'Foreground' // make sure windows are always in front of walls
})
  // remember location of the Node
  .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
  .bindTwoWay('angle')
  // the door's locationSpot is affected by it's openingHeight, which is affected by the thickness of its containing wall
  .bind('locationSpot', 'doorOpeningHeight', function (doh) {
    return new go.Spot(0.5, 1, 0, -(doh / 2));
  })
  // this is the shape that reprents the door itself and its swing
  .add(
    new go.Shape({ name: 'SHAPE', fill: 'rgba(0, 0, 0, 0)' })
      .bind('width', 'length')
      .bindTwoWay('height', 'length')
      .bindObject('stroke', 'isSelected', (s) => (s ? 'dodgerblue' : 'black'))
      .bind('geometryString', 'swing', function (swing) {
        if (swing === 'left') {
          return 'F1 M0,0 v-150 a150,150 0 0,1 150,150 ';
        } else {
          return 'F1 M275,175 v-150 a150,150 0 0,0 -150,150 ';
        }
      }),
    // door opening shape
    new go.Shape({
      name: 'OPENING_SHAPE',
      fill: TemplateColors.room,
      strokeWidth: 0,
      height: 5,
      width: 40,
      alignment: go.Spot.BottomCenter,
      alignmentFocus: go.Spot.Top
    })
      .bindTwoWay('height', 'doorOpeningHeight')
      .bindTwoWay('width', 'length')
  );

// Palette Wall Node (becomes Wall when dropped from Palette onto diagram)
export const PaletteWallNode = new go.Node('Spot', { selectionAdorned: false }).add(
  new go.Shape({ name: 'SHAPE', fill: 'black', strokeWidth: 0, height: 10, figure: 'Rectangle' })
    .bind('width', 'length')
    .bind('height')
    .bindObject('fill', 'isSelected', (s) => (s ? 'dodgerblue' : 'black'))
    .bindObject('stroke', 'isSelected', (s) => (s ? 'dodgerblue' : 'black'))
);

/*
 * Furniture Node Dependencies:
 * Node Tool Tip, Furniture Resize Adornment Template, Furniture Rotate Adornment Template, Invert Color
 */

// Node Tool Tip
function makeNodeToolTip() {
  return new go.Adornment('Auto').add(
    new go.Shape({ fill: '#FFFFCC', strokeWidth: 0 }),
    new go.TextBlock({ margin: 4 }).bindObject('text', '', function (text, obj) {
      const data = obj.part.adornedObject.data;
      return data.text + (data.notes !== '' ? '\nNotes: ' + data.notes : '');
    })
  );
}

// Resize Adornment for Wall Part Nodes
function makeWallPartResizeAdornment() {
  return new go.Adornment('Spot', { name: 'WallPartResizeAdornment' }).add(
    new go.Placeholder(),
    new go.Shape({
      alignment: go.Spot.Left,
      cursor: 'w-resize',
      figure: 'Diamond',
      desiredSize: new go.Size(7, 7),
      fill: '#ffffff',
      stroke: '#808080'
    }),
    new go.Shape({
      alignment: go.Spot.Right,
      cursor: 'e-resize',
      figure: 'Diamond',
      desiredSize: new go.Size(7, 7),
      fill: '#ffffff',
      stroke: '#808080'
    })
  );
}

// Selection Adornment for Door Nodes
function makeDoorSelectionAdornment() {
  const $ = go.GraphObject.make;
  return new go.Adornment('Vertical', { name: 'DoorSelectionAdornment' }).add(
    new go.Panel('Auto').add(new go.Shape({ fill: null, stroke: null }), new go.Placeholder()),
    new go.Panel('Horizontal', { defaultStretch: go.Stretch.Vertical })
      .add(
        $(
          'Button',
          $(
            go.Picture,
            {
              source: 'images/flipDoorOpeningLeft.png',
              column: 0,
              desiredSize: new go.Size(12, 12)
            },
            new go.Binding('source', '', function (obj) {
              if (obj.adornedPart === null) {
                return 'images/flipDoorOpeningRight.png';
              } else if (obj.adornedPart.data.swing === 'left') {
                return 'images/flipDoorOpeningRight.png';
              } else {
                return 'images/flipDoorOpeningLeft.png';
              }
            }).ofObject()
          ),
          {
            click(e: go.InputEvent, obj: go.GraphObject) {
              const part = obj.part;
              if (part !== null && part.diagram !== null) {
                const floorplan = part.diagram;
                floorplan.startTransaction('flip door');
                const adorn: go.Adornment = obj.part as go.Adornment;
                const door = adorn.adornedPart;
                if (door !== null) {
                  if (door.data.swing === 'left') {
                    floorplan.model.setDataProperty(door.data, 'swing', 'right');
                  } else {
                    floorplan.model.setDataProperty(door.data, 'swing', 'left');
                  }
                  floorplan.commitTransaction('flip door');
                }
              }
            },
            toolTip: $(
              go.Adornment,
              'Auto',
              $(go.Shape, { fill: '#FFFFCC' }),
              $(go.TextBlock, { margin: 4, text: 'Flip Door Opening' })
            )
          },
          new go.Binding('visible', '', function (obj) {
            return obj.adornedPart === null ? false : obj.adornedPart.containingGroup !== null;
          }).ofObject()
        ),
        $(
          'Button',
          $(go.Picture, {
            source: 'images/flipDoorSide.png',
            column: 0,
            desiredSize: new go.Size(12, 12)
          }),
          {
            click(e: go.InputEvent, obj: go.GraphObject) {
              const part = obj.part;
              if (part !== null && part.diagram !== null) {
                const floorplan = part.diagram;
                floorplan.startTransaction('rotate door');
                const adorn: go.Adornment = obj.part as go.Adornment;
                const door: go.Node = adorn.adornedPart as go.Node;
                door.angle = (door.angle + 180) % 360;
                floorplan.commitTransaction('rotate door');
              }
            },
            toolTip: $(
              go.Adornment,
              'Auto',
              $(go.Shape, { fill: '#FFFFCC' }),
              $(go.TextBlock, { margin: 4, text: 'Flip Door Side' })
            )
          }
        )
      )
      .bindObject('visible', '', function (obj) {
        return obj.adornedPart === null ? false : obj.adornedPart.containingGroup !== null;
      })
  );
}

/*
 * Wall Part Node Dependencies:
 * Get Wall Part Endpoints, Get Wall Part Stretch, Drag Wall Parts (Drag Computation Function),
 * Wall Part Resize Adornment, Door Selection Adornment (Door Nodes only)
 */

/**
 * Find and return an array of the endpoints of a given wallpart (window or door)
 * @param {go.Part} wallPart A Wall Part Node -- i.e. Door Node, Window Node
 * @return {Array<any>}
 */
export function getWallPartEndpoints(wallPart: go.Part): Array<go.Point> {
  const loc = wallPart.location;
  const partLength = wallPart.data.length;
  let angle = 0;
  if (wallPart.containingGroup !== null) {
    const w: go.Group = wallPart.containingGroup;
    angle = w.data.startpoint.directionPoint(w.data.endpoint);
  } else {
    angle = 180;
  }
  const point1 = new go.Point(loc.x + partLength / 2, loc.y);
  const point2 = new go.Point(loc.x - partLength / 2, loc.y);
  point1.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
  point2.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
  return [point1, point2];
}

export const nodeTemplateMap = new go.Map<string, go.Node>();
nodeTemplateMap.add('', DefaultNode); // Default Node (furniture)
nodeTemplateMap.add('Window', Window);
nodeTemplateMap.add('PaletteWallNode', PaletteWallNode);
nodeTemplateMap.add('Door', Door);
nodeTemplateMap.add('Room', RoomNode);
