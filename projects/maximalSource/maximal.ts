/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
    The code in this file is typical of a "minimal" sample.

    The code which includes all  modules can be found in maximal-index.ts
*/


import { go } from './maximal-index';

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

  // Attach to the window so you can manipulate in the console
  window.myDiagram = myDiagram;
};

