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
import { OrthogonalLinkReshapingTool } from './OrthogonalLinkReshapingTool.js';

let myDiagram: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  myDiagram =
    $(go.Diagram, 'myDiagramDiv',
      {
        'undoManager.isEnabled': true,
        'linkReshapingTool': new OrthogonalLinkReshapingTool()
      });

  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',
      {
        width: 80,
        height: 50,
        locationSpot: go.Spot.Center
      },
      new go.Binding('location', 'location', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, { fill: 'lightgray' }),
      $(go.TextBlock, { margin: 10 },
        new go.Binding('text', 'key'))
    );

  myDiagram.linkTemplate =
    $(go.Link,
      {
        routing: go.Link.AvoidsNodes,
        reshapable: true,
        resegmentable: true
      },
      new go.Binding('points').makeTwoWay(),
      $(go.Shape, { strokeWidth: 2 })
    );

  myDiagram.model = new go.GraphLinksModel([
      { key: 'Alpha', location: '0 0' },
      { key: 'Beta', location: '200 0' },
      { key: 'Gamma', location: '100 0' }
    ], [
      { from: 'Alpha', to: 'Beta' }
    ]);

  myDiagram.addDiagramListener('InitialLayoutCompleted', (e) => {
    // select the Link in order to show its two additional Adornments, for shifting the ends
    const link = myDiagram.links.first();
    if (link !== null) link.isSelected = true;
  });
}

export function updateRouting() {
  const routing = getRadioValue('routing');
  const newRouting = (routing === 'orthogonal') ? go.Link.Orthogonal : go.Link.AvoidsNodes;
  myDiagram.startTransaction('update routing');
  myDiagram.linkTemplate.routing = newRouting;
  myDiagram.links.each((l) => {
    l.routing = newRouting;
  });
  myDiagram.commitTransaction('update routing');
}

export function getRadioValue(name: string) {
  const radio = (document.getElementsByName(name) as any);
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) return radio[i].value;
  }
}
