/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';
import { ZoomSlider } from './ZoomSlider.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  const myDiagram = $(go.Diagram, 'myDiagramDiv',  // create a Diagram for the DIV HTML element
                      {
                        'undoManager.isEnabled': true  // enable undo & redo
                      });

  // define a simple Node template
  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      $(go.Shape, 'RoundedRectangle', { strokeWidth: 0, fill: 'white' },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8 },  // some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding('text', 'key'))
    );

  // but use the default Link template, by not setting Diagram.linkTemplate

  // create the model data that will be represented by Nodes and Links
  myDiagram.model = new go.GraphLinksModel(
  [
    { key: 'Alpha', color: 'lightblue' },
    { key: 'Beta', color: 'orange' },
    { key: 'Gamma', color: 'lightgreen' },
    { key: 'Delta', color: 'pink' }
  ],
  [
    { from: 'Alpha', to: 'Beta' },
    { from: 'Alpha', to: 'Gamma' },
    { from: 'Beta', to: 'Beta' },
    { from: 'Gamma', to: 'Delta' },
    { from: 'Delta', to: 'Alpha' }
  ]);

  const zoomSlider = new ZoomSlider(myDiagram);

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
  (window as any).zoomSlider = zoomSlider;
}
