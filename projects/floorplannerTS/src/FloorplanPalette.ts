/*
* Copyright (C) 1998-2022 by Northwoods Software Corporation
* All Rights Reserved.
*
* FloorplanPalette Class
* A FloorplanPalette is a Palette with special rules
*/

import * as go from '../../../release/go';
import { Floorplan } from './Floorplan.js';

export class FloorplanPalette extends go.Palette {

  constructor(div: HTMLDivElement | string, floorplan: Floorplan/*, nodeDataArray: Array<any>*/) {
    super(div);

    const $ = go.GraphObject.make;
    this.contentAlignment = go.Spot.Center;
    this.nodeTemplateMap = floorplan.nodeTemplateMap;

    // palette also contains "floor" nodes -- nodes of particular floor types that can be dragged and dropped into wall-enclosed areas to create Room Nodes
    this.nodeTemplateMap.add('FloorNode',
      $(go.Node, 'Auto',
        $(go.Shape, { fill: makeFloorBrush(null), desiredSize: new go.Size(100, 100) },
          new go.Binding('fill', 'floorImage', function(src) {
            return makeFloorBrush(src);
          })
        ),
        $(go.TextBlock, 'Drag me out to a wall-enclosed space to create a room', { desiredSize: new go.Size(90, NaN) },
          new go.Binding('visible', '', function(node: go.Node) {
            if (node.diagram instanceof go.Palette) {
              return true;
            }
            return false;
          }).ofObject()
        )
      )
    );

    this.toolManager.contextMenuTool.isEnabled = false;

    // add this new FloorplanPalette to the "palettes" field of its associated Floorplan
    floorplan.palettes.push(this);

  } // end FloorplanPalette constructor

}

/**
 * Make a Pattern brush for floor nodes
 * @param src The relative path of the image to use for the pattern brush. If this is not specified, a default path is tried
 */
function makeFloorBrush(src: string | null) {
  const $ = go.GraphObject.make;
  if (src === null || src === undefined) { src = 'images/textures/floor1.jpg'; }
  const floorImage = new Image();
  floorImage.src = src;
  return $(go.Brush, 'Pattern', { pattern: floorImage });
}

// export = FloorplanPalette;
