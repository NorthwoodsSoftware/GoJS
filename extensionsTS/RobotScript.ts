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
import { Robot } from './Robot.js';

let robot: Robot;  // this global variable will hold an instance of the Robot class for myDiagram
let myDiagram: go.Diagram;
let myPalette: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  function showProperties(e: go.InputEvent, obj: go.GraphObject) {  // executed by ContextMenuButton
    const node = (obj.part as go.Adornment).adornedPart;
    if (node === null || node.data === null) return;
    let msg = 'Context clicked: ' + node.data.key + '. ';
    msg += 'Selection includes:';
    myDiagram.selection.each(function (part) {
      msg += ' ' + part.toString();
    });
    const stat = document.getElementById('myStatus');
    if (stat !== null) stat.textContent = msg;
  }

  function nodeClicked(e: go.InputEvent, obj: go.GraphObject) {  // executed by click and doubleclick handlers
    const evt = e.copy();
    const node = obj.part;
    if (node === null || node.data === null) return;
    const type = evt.clickCount === 2 ? 'Double-Clicked: ' : 'Clicked: ';
    const msg = type + node.data.key + '. ';
    const stat = document.getElementById('myStatus');
    if (stat !== null) stat.textContent = msg;
  }

  myDiagram =
    $(go.Diagram, 'myDiagramDiv',  // must name or refer to the DIV HTML element
      {
        nodeTemplate:
          $(go.Node, 'Auto',
            {
              click: nodeClicked,
              doubleClick: nodeClicked,
              contextMenu:
                $<go.Adornment>('ContextMenu',
                  $('ContextMenuButton',
                    $(go.TextBlock, 'Properties'),
                    { click: showProperties })
                )
            },
            $(go.Shape, 'Rectangle',
              { fill: 'lightgray' },
              { portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' }),
            $(go.TextBlock,
              { margin: 3 },
              new go.Binding('text', 'key'))),
        model: new go.GraphLinksModel([
          { key: 'Lambda' },
          { key: 'Mu' }
        ], [
            { from: 'Lambda', to: 'Mu' }
          ]),
        'undoManager.isEnabled': true
      });

  // a shared Robot that can be used by all commands for this one Diagram
  robot = new Robot(myDiagram);  // defined in Robot.js

  // initialize the Palette that is on the left side of the page
  myPalette =
    $(go.Palette, 'myPaletteDiv',  // must name or refer to the DIV HTML element
      {
        nodeTemplate: myDiagram.nodeTemplate,
        model: new go.GraphLinksModel([  // specify the contents of the Palette
          { key: 'Alpha' },
          { key: 'Beta' },
          { key: 'Gamma' },
          { key: 'Delta' }
        ])
      });
}

export function dragFromPalette() {
  // simulate a drag-and-drop between Diagrams:
  const dragdrop = { sourceDiagram: myPalette, targetDiagram: myDiagram };
  robot.mouseDown(5, 5, 0, dragdrop);  // this should be where the Alpha node is in the source myPalette
  robot.mouseMove(60, 60, 100, dragdrop);
  robot.mouseUp(100, 100, 200, dragdrop);  // this is where the node will be dropped in the target myDiagram
  // If successful in dragging a node from the Palette into the Diagram,
  // the DraggingTool will perform a transaction.
}

export function copyNode() {
  const alpha = myDiagram.findNodeForKey('Alpha');
  if (alpha === null) return;
  const loc = alpha.actualBounds.center;

  const options = { control: true, alt: true };
  // Simulate a mouse drag to move the Alpha node:
  robot.mouseDown(loc.x, loc.y, 0, options);
  robot.mouseMove(loc.x + 80, loc.y + 50, 50, options);
  robot.mouseMove(loc.x + 20, loc.y + 100, 100, options);
  robot.mouseUp(loc.x + 20, loc.y + 100, 150, options);
  // If successful, will have made a copy of the "Alpha" node below it.

  // Alternatively you could copy the Node using commands:
  // myDiagram.commandHandler.copySelection();
  // myDiagram.commandHandler.pasteSelection(new go.Point(loc.x+20, loc.y+100));
}

export function dragSelectNodes() {
  const alpha = myDiagram.findNodeForKey('Alpha');
  if (alpha === null) return;
  const alpha2 = myDiagram.findNodeForKey('Alpha2');
  if (alpha2 === null) return;
  const coll: any = new go.Set();
  coll.add(alpha);
  coll.add(alpha2);
  const area = myDiagram.computePartsBounds(coll);
  area.inflate(30, 30);

  // Simulate dragging in the background around the two Alpha nodes.
  // This uses timestamps to pretend to wait a while to avoid activating the PanningTool.
  // Hopefully this mouse down does not hit any Part, but in the Diagram's background:
  robot.mouseDown(area.x, area.y, 0);
  // NOTE that this mouseMove timestamp needs to be > myDiagram.toolManager.dragSelectingTool.delay:
  robot.mouseMove(area.centerX, area.centerY, 200);
  robot.mouseUp(area.right, area.bottom, 250);
  // Now should have selected both "Alpha" and "Alpha2" using the DragSelectingTool.

  // Alternatively you could select the Nodes programmatically:
  // alpha.isSelected = true;
  // alpha2.isSelected = true;
}

export function clickContextMenu() {
  const alpha = myDiagram.findNodeForKey('Alpha');
  if (alpha === null) return;
  const loc = alpha.location;

  // right click on Alpha
  robot.mouseDown(loc.x + 10, loc.y + 10, 0, { right: true });
  robot.mouseUp(loc.x + 10, loc.y + 10, 100, { right: true });

  // Alternatively you could invoke the Show Context Menu command directly:
  // myDiagram.commandHandler.showContextMenu(alpha);

  // move mouse over first context menu button
  robot.mouseMove(loc.x + 20, loc.y + 20, 200);
  // and click that button
  robot.mouseDown(loc.x + 20, loc.y + 20, 300);
  robot.mouseUp(loc.x + 20, loc.y + 20, 350);
  // This should have invoked the ContextMenuButton's click function, showProperties,
  // which should have put a green message in the myStatus DIV.
}

export function deleteSelection() {
  // Simulate clicking the "Del" key:
  robot.keyDown('Del');
  robot.keyUp('Del');
  // Now the selected Nodes are deleted.

  // Alternatively you could invoke the Delete command directly:
  // myDiagram.commandHandler.deleteSelection();
}

export function clickLambda() {
  const lambda = myDiagram.findNodeForKey('Lambda');
  if (lambda === null) return;
  const loc = lambda.location;

  // click on Lambda
  robot.mouseDown(loc.x + 10, loc.y + 10, 0, {});
  robot.mouseUp(loc.x + 10, loc.y + 10, 100, {});

  // Clicking is just a sequence of input events.
  // There is no command in CommandHandler for such a basic gesture.
}

export function doubleClickLambda() {
  const lambda = myDiagram.findNodeForKey('Lambda');
  if (lambda === null) return;
  const loc = lambda.location;

  // double-click on Lambda
  robot.mouseDown(loc.x + 10, loc.y + 10, 0, {});
  robot.mouseUp(loc.x + 10, loc.y + 10, 100, {});
  robot.mouseDown(loc.x + 10, loc.y + 10, 200, { clickCount: 2 });
  robot.mouseUp(loc.x + 10, loc.y + 10, 300, { clickCount: 2 });
}
