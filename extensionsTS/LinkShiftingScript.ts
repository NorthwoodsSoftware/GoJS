/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';
import { LinkShiftingTool } from './LinkShiftingTool.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  const myDiagram =
    new go.Diagram('myDiagramDiv',
      {
        'undoManager.isEnabled': true
      });
  myDiagram.toolManager.mouseDownTools.add($(LinkShiftingTool));

  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',
      {
        fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,
        fromLinkable: true, toLinkable: true,
        locationSpot: go.Spot.Center
      },
      new go.Binding('location', 'location', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, { fill: 'lightgray' }),
      $(go.TextBlock, { margin: 10 },
        { fromLinkable: false, toLinkable: false },
        new go.Binding('text', 'key'))
    );

  myDiagram.linkTemplate =
    $(go.Link,
      {
        reshapable: true, resegmentable: true,
        relinkableFrom: true, relinkableTo: true,
        adjusting: go.Link.Stretch
      },
      // remember the (potentially) user-modified route
      new go.Binding('points').makeTwoWay(),
      // remember any spots modified by LinkShiftingTool
      new go.Binding('fromSpot', 'fromSpot', go.Spot.parse).makeTwoWay(go.Spot.stringify),
      new go.Binding('toSpot', 'toSpot', go.Spot.parse).makeTwoWay(go.Spot.stringify),
      $(go.Shape),
      $(go.Shape, { toArrow: 'Standard' })
    );

  myDiagram.model = new go.GraphLinksModel([
    { key: 'Alpha', location: '0 0' },
    { key: 'Beta', location: '0 100' }
  ], [
    { from: 'Alpha', to: 'Beta' }
  ]);

  myDiagram.addDiagramListener('InitialLayoutCompleted', function (e: go.DiagramEvent) {
    // select the Link in order to show its two additional Adornments, for shifting the ends
    const firstlink = myDiagram.links.first();
    if (firstlink !== null) firstlink.isSelected = true;
  });

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
}
