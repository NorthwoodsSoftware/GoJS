/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  const myDiagram =
    $(go.Diagram, 'myDiagramDiv');

  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',
      $(go.Shape, 'Ellipse', { fill: 'lightskyblue' }),
      $('HyperlinkText',
        (node: go.Node) => 'https://gojs.net/' + node.data.version,
        (node: go.Node) => 'Visit GoJS ' + node.data.version,
        { margin: 10 }
      )
    );

  myDiagram.model = new go.GraphLinksModel([
    { key: 1, version: 'beta' },
    { key: 2, version: 'latest' }
  ], [
    { from: 1, to: 2 }
  ]);

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
}
