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
