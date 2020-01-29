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
import { SectorReshapingTool } from './SectorReshapingTool.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  const myDiagram =
    $(go.Diagram, 'myDiagramDiv',
      {
        'animationManager.isEnabled': false,
        'undoManager.isEnabled': true
      });

  // install the SectorReshapingTool as a mouse-down tool
  myDiagram.toolManager.mouseDownTools.add(new SectorReshapingTool());

  function makeSector(data: go.ObjectData) {  // Geometry converter for the node's "LAMP" Shape
    const radius = SectorReshapingTool.getRadius(data);
    const angle = SectorReshapingTool.getAngle(data);
    const sweep = SectorReshapingTool.getSweep(data);
    const start = new go.Point(radius, 0).rotate(angle);
    // this is much more efficient than calling go.GraphObject.make:
    const geo = new go.Geometry()
      .add(new go.PathFigure(radius + start.x, radius + start.y)  // start point
        .add(new go.PathSegment(go.PathSegment.Arc,
          angle, sweep,  // angles
          radius, radius,  // center
          radius, radius))  // radius
        .add(new go.PathSegment(go.PathSegment.Line, radius, radius).close()))
      .add(new go.PathFigure(0, 0))  // make sure the Geometry always includes the whole circle
      .add(new go.PathFigure(2 * radius, 2 * radius));  // even if only a small sector is "lit"
    return geo;
  }

  myDiagram.nodeTemplate =
    $(go.Node, 'Spot',
      {
        locationSpot: go.Spot.Center, locationObjectName: 'LAMP',
        selectionObjectName: 'LAMP', selectionAdorned: false
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      // selecting a Node brings it forward in the z-order
      new go.Binding('layerName', 'isSelected', (s) => s ? 'Foreground' : '').ofObject(),
      $(go.Panel, 'Spot',
        { name: 'LAMP' },
        $(go.Shape,  // arc
          { fill: 'yellow', stroke: 'lightgray', strokeWidth: 0.5 },
          new go.Binding('geometry', '', makeSector)),
        $(go.Shape, 'Circle',
          { name: 'SHAPE', width: 6, height: 6 })
      ),
      $(go.TextBlock,
        {
          alignment: new go.Spot(0.5, 0.5, 0, 3), alignmentFocus: go.Spot.Top,
          stroke: 'blue', background: 'rgba(255,255,255,0.3)'
        },
        new go.Binding('alignment', 'spot', go.Spot.parse).makeTwoWay(go.Spot.stringify),
        new go.Binding('text', 'name'))
    );

  myDiagram.model = new go.GraphLinksModel([
    { name: 'Alpha', radius: 70, sweep: 120 },
    { name: 'Beta', radius: 70, sweep: 80, angle: 200 }
  ]);

  myDiagram.commandHandler.selectAll();  // to show the tool handles
}
