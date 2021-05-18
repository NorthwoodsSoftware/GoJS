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
import { PolylineLinkingTool } from './PolylineLinkingTool.js';

let myDiagram: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;

  myDiagram =
    $(go.Diagram, 'myDiagramDiv',
      { "undoManager.isEnabled": true });

  // install custom linking tool, defined in PolylineLinkingTool.js
  const tool = new PolylineLinkingTool();
  // tool.temporaryLink.routing = go.Link.Orthogonal;  // optional, but need to keep link template in sync, below
  myDiagram.toolManager.linkingTool = tool;

  myDiagram.nodeTemplate =
    $(go.Node, 'Spot',
      { locationSpot: go.Spot.Center },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape,
        {
          width: 100, height: 100, fill: 'lightgray',
          portId: '', cursor: 'pointer',
          fromLinkable: true,
          fromLinkableSelfNode: true, fromLinkableDuplicates: true,  // optional
          toLinkable: true,
          toLinkableSelfNode: true, toLinkableDuplicates: true  // optional
        },
        new go.Binding('fill')),
      $(go.Shape, { width: 70, height: 70, fill: 'transparent', stroke: null }),
      $(go.TextBlock,
        new go.Binding('text')));

  myDiagram.linkTemplate =
    $(go.Link,
      { reshapable: true, resegmentable: true },
      // { routing: go.Link.Orthogonal },  // optional, but need to keep LinkingTool.temporaryLink in sync, above
      { adjusting: go.Link.Stretch },  // optional
      new go.Binding('points', 'points').makeTwoWay(),
      $(go.Shape, { strokeWidth: 1.5 }),
      $(go.Shape, { toArrow: 'OpenTriangle' }));

  load();  // load a simple diagram from the textarea
}

// save a model to and load a model from Json text, displayed below the Diagram
export function save() {
  (document.getElementById('mySavedModel') as any).value = myDiagram.model.toJson();
  myDiagram.isModified = false;
}
export function load() {
  myDiagram.model = go.Model.fromJson((document.getElementById('mySavedModel') as any).value);
}
