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
import { LinkLabelOnPathDraggingTool } from './LinkLabelOnPathDraggingTool.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  const myDiagram =
    new go.Diagram('myDiagramDiv', // the ID of the DIV HTML element
      {
        layout: $(go.ForceDirectedLayout,
          { defaultSpringLength: 50, defaultElectricalCharge: 50 }),
        'undoManager.isEnabled': true
      });

  // install the LinkLabelDraggingTool as a "mouse move" tool
  myDiagram.toolManager.mouseMoveTools.insertAt(0, new LinkLabelOnPathDraggingTool());

  myDiagram.nodeTemplate =
    $(go.Node, go.Panel.Auto,
      { locationSpot: go.Spot.Center },
      $(go.Shape,
        {
          fill: 'orange',  // default fill color
          portId: '',
          fromLinkable: true,
          fromSpot: go.Spot.AllSides,
          toLinkable: true,
          toSpot: go.Spot.AllSides,
          cursor: 'pointer'
        },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 10, font: 'bold 12pt sans-serif' },
        new go.Binding('text'))
    );

  myDiagram.linkTemplate =
    $(go.Link,
      {
        routing: go.Link.AvoidsNodes,
        corner: 5,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true
      },
      $(go.Shape),
      $(go.Shape, { toArrow: 'OpenTriangle' }),
      $(go.Panel, 'Auto',
        // mark this Panel as being a draggable label, and set default segment props
        { _isLinkLabel: true, segmentIndex: NaN, segmentFraction: .5 },
        $(go.Shape, { fill: 'white' }),
        $(go.TextBlock, '?', { margin: 3 },
          new go.Binding('text', 'color')),
        // remember any modified segment properties in the link data object
        new go.Binding('segmentIndex').makeTwoWay(),
        new go.Binding('segmentFraction').makeTwoWay()
      )
    );

  // create a few nodes and links
  myDiagram.model = new go.GraphLinksModel([
    { key: 1, text: 'one', color: 'lightyellow' },
    { key: 2, text: 'two', color: 'brown' },
    { key: 3, text: 'three', color: 'green' },
    { key: 4, text: 'four', color: 'slateblue' },
    { key: 5, text: 'five', color: 'aquamarine' },
    { key: 6, text: 'six', color: 'lightgreen' },
    { key: 7, text: 'seven' }
  ], [
      { from: 5, to: 6, color: 'orange' },
      { from: 1, to: 2, color: 'red' },
      { from: 1, to: 3, color: 'blue' },
      { from: 1, to: 4, color: 'goldenrod' },
      { from: 2, to: 5, color: 'fuchsia' },
      { from: 3, to: 5, color: 'green' },
      { from: 4, to: 5, color: 'black' },
      { from: 6, to: 7 }
    ]);

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
}
