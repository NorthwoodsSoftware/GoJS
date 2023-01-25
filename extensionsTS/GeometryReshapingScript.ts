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
import { GeometryReshapingTool } from './GeometryReshapingTool.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  const myDiagram = new go.Diagram('myDiagramDiv', // create a Diagram for the DIV HTML element
    {
      'undoManager.isEnabled': true // enable undo & redo
    });

  myDiagram.toolManager.mouseDownTools.insertAt(3,
    $(GeometryReshapingTool, { isResegmenting: true }));

  myDiagram.nodeTemplate =
    $(go.Node,
      {
        resizable: true, resizeObjectName: "SHAPE",
        reshapable: true,  // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
        rotatable: true, rotationSpot: go.Spot.Center
      },
      $(go.Shape,
        { name: 'SHAPE', fill: 'lightgray', strokeWidth: 1.5 },
        new go.Binding('geometryString', 'geo').makeTwoWay())
    );

  myDiagram.model = new go.GraphLinksModel([
      { geo: "F M20 0 40 20 20 40 0 20z" },
      { geo: "F M0 145 L75 8 C100 20 120 40 131 87 C160 70 180 50 195 0 L249 133z" }
    ]);

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
}
