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
import { RealtimeDragSelectingTool } from './RealtimeDragSelectingTool.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  const myDiagram =
    new go.Diagram('myDiagramDiv',
      {
        initialDocumentSpot: go.Spot.Center,
        initialViewportSpot: go.Spot.Center,

        // replace the standard DragSelectingTool with one that selects while dragging,
        // and also only requires overlapping bounds with the dragged box to be selected
        dragSelectingTool:
          $(RealtimeDragSelectingTool,
            {
              isPartialInclusion: true, delay: 50,
              box: $(go.Part,  // replace the magenta box with a red one
                { layerName: 'Tool', selectable: false },
                $(go.Shape,
                  {
                    name: 'SHAPE', fill: 'rgba(255,0,0,0.1)',
                    stroke: 'red', strokeWidth: 2
                  }))
            }
          ),

        // Define the template for Nodes, just some text inside a colored rectangle
        nodeTemplate:
          $(go.Node, 'Spot',
            { width: 70, height: 20 },
            $(go.Shape, 'Rectangle',
              new go.Binding('fill', 'c')),
            $(go.TextBlock,
              { margin: 2 },
              new go.Binding('text', 'c'))),

        // Define the template for Links, just a simple line
        linkTemplate:
          $(go.Link,
            $(go.Shape, { stroke: 'black' })),

        layout: $(go.TreeLayout)
      });

  myDiagram.model = loadTree();
}

function loadTree() {
  // create some tree data
  const total = 49;
  const treedata = [];
  for (let i = 0; i < total; i++) {
    // these property names are also specified when creating the TreeModel
    const d = {
      key: i,  // this node data's key
      c: go.Brush.randomColor(),  // the node's color
      parent: (i > 0 ? Math.floor(Math.random() * i / 2) : undefined)  // the random parent's key
    };
    treedata.push(d);
  }
  return new go.TreeModel(treedata);
}
