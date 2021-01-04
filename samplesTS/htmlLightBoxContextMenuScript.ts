'use strict';
/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go.js';

let myDiagram = null;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  // Initialize the Diagram
  myDiagram =
    $(go.Diagram, 'myDiagramDiv',  // create a Diagram for the DIV HTML element
      { 'undoManager.isEnabled': true });
  // define a simple Node template (but use the default Link template)
  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',
      { contextMenu: (window as any).myHTMLLightBox }, // window.myHTMLLightBox is defined in extensions/LightBoxContextMenu.js
      $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8 },  // some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding('text', 'key'))
    );

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

  myDiagram.contextMenu = (window as any).myHTMLLightBox; // window.myHTMLLightBox is defined in extensions/LightBoxContextMenu.js

} // end init
