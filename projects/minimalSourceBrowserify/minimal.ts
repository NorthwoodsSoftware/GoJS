/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

// This is one way of exposing init() to minimal.html. You could also use require, like the other projects do

import { go } from './minimal-index';

window.init = function() {
  const $ = go.GraphObject.make;  // for conciseness in defining templates

  const myDiagram = $(go.Diagram, 'myDiagramDiv',  // create a Diagram for the DIV HTML element
    {
      'undoManager.isEnabled': true  // enable undo & redo
    });

  // define a simple Node template
  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      { rotatable: true },
      $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8 },  // some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding('text', 'key'))
    );

  // but use the default Link template, by not setting Diagram.linkTemplate

  myDiagram.model = new go.Model(
    [
      { key: 'Alpha', color: 'lightblue' },
      { key: 'Beta', color: 'orange' },
      { key: 'Gamma', color: 'lightgreen' },
      { key: 'Delta', color: 'pink' }
    ]);

  // Attach to the window so you can manipulate in the console
  (window as any).myDiagram = myDiagram;


  // Attach to the window so you can manipulate in the console
  (window as any).myDiagram = myDiagram;
};
