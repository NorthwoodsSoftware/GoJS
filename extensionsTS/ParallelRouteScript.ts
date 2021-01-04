/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';
import { ParallelRouteLink } from './ParallelRouteLink.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  const myDiagram =
    $(go.Diagram, 'myDiagramDiv',
      {
        'undoManager.isEnabled': true
      });

  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',
      new go.Binding('location', 'loc', go.Point.parse),
      $(go.Shape,
        {
          portId: '',
          fromLinkable: true, toLinkable: true,
          fromLinkableDuplicates: true, toLinkableDuplicates: true,
          cursor: 'pointer'
        },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8 },
        new go.Binding('text'))
    );

  myDiagram.linkTemplate =
    $(ParallelRouteLink,
      {
        relinkableFrom: true, relinkableTo: true,
        reshapable: true // , resegmentable: true
      },
      $(go.Shape, { strokeWidth: 2 },
        new go.Binding('stroke', 'fromNode', (node) => node.port.fill).ofObject()),
      $(go.Shape, { toArrow: 'OpenTriangle', strokeWidth: 1.5 },
        new go.Binding('stroke', 'fromNode', (node) => node.port.fill).ofObject())
    );

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: 1, text: 'Alpha', color: 'lightblue', loc: '0 0' },
      { key: 2, text: 'Beta', color: 'orange', loc: '130 70' },
      { key: 3, text: 'Gamma', color: 'lightgreen', loc: '0 130' }
    ],
    [
      { from: 1, to: 2 },
      { from: 2, to: 1 },
      { from: 1, to: 3 },
      { from: 1, to: 3 },
      { from: 3, to: 1 },
      { from: 1, to: 3 },
      { from: 1, to: 3 }
    ]);
}
