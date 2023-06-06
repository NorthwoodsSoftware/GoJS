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
import { DrawCommandHandler } from './DrawCommandHandler.js';

let myDiagram: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram = new go.Diagram('myDiagramDiv',  // create a Diagram for the DIV HTML element
    {
      commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js
      "commandHandler.archetypeGroupData": { isGroup: true },
      'undoManager.isEnabled': true  // enable undo & redo
    });

  // define a simple Node template
  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      { locationSpot: go.Spot.Center },
      $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
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

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
}

export function askSpace() {
  const space: number = parseInt(prompt('Desired space between nodes (in pixels):') || '0');
  return space;
}

// update arrowkey function
export function arrowMode() {
  // no transaction needed, because we are modifying the CommandHandler for future use
  const move = (document.getElementById('move') as any);
  const select = (document.getElementById('select') as any);
  const scroll = (document.getElementById('scroll') as any);
  if (move.checked === true) {
    (myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = 'move';
  } else if (select.checked === true) {
    (myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = 'select';
  } else if (scroll.checked === true) {
    (myDiagram.commandHandler as DrawCommandHandler).arrowKeyBehavior = 'scroll';
  }
}

export function lefts() { (myDiagram.commandHandler as DrawCommandHandler).alignLeft(); }
export function rights() { (myDiagram.commandHandler as DrawCommandHandler).alignRight(); }
export function tops() { (myDiagram.commandHandler as DrawCommandHandler).alignTop(); }
export function bottoms() { (myDiagram.commandHandler as DrawCommandHandler).alignBottom(); }
export function cenX() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterX(); }
export function cenY() { (myDiagram.commandHandler as DrawCommandHandler).alignCenterY(); }
export function row() { (myDiagram.commandHandler as DrawCommandHandler).alignRow(askSpace()); }
export function column() { (myDiagram.commandHandler as DrawCommandHandler).alignColumn(askSpace()); }
export function rotate45() { (myDiagram.commandHandler as DrawCommandHandler).rotate(45); }
export function rotateNeg45() { (myDiagram.commandHandler as DrawCommandHandler).rotate(-45); }
export function rotate90() { (myDiagram.commandHandler as DrawCommandHandler).rotate(90); }
export function rotateNeg90() { (myDiagram.commandHandler as DrawCommandHandler).rotate(-90); }
export function rotate180() { (myDiagram.commandHandler as DrawCommandHandler).rotate(180); }
export function front() { (myDiagram.commandHandler as DrawCommandHandler).pullToFront(); }
export function back() { (myDiagram.commandHandler as DrawCommandHandler).pushToBack(); }
