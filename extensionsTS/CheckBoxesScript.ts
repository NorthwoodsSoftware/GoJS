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

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  const myDiagram = $(go.Diagram, 'myDiagramDiv',  // create a Diagram for the DIV HTML element
    {
      'undoManager.isEnabled': true  // enable undo & redo
    });

  // this template includes a lot of CheckBoxes, each configured in different manners
  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the whole table
      $(go.Shape, { strokeWidth: 0 },  // no border
        new go.Binding('fill', 'color')),
      $(go.Panel, 'Table',
        { padding: 3 },
        $(go.TextBlock,
          { row: 0, column: 0, columnSpan: 2 },
          { margin: 3, font: 'bold 10pt sans-serif' },  // some room around the bold text
          new go.Binding('text', 'key')),
        // the first column has an assortment of CheckBoxes
        $(go.Panel, 'Vertical',
          { row: 1, column: 0, defaultAlignment: go.Spot.Left },
          $('CheckBox', 'choice1',
            $(go.TextBlock, 'default')
          ),
          $('CheckBox', 'choice2',
            { 'ButtonIcon.stroke': 'green' },
            $(go.TextBlock, 'green')
          ),
          $('CheckBox', 'choice3',
            { 'ButtonIcon.stroke': 'red', 'ButtonIcon.figure': 'XLine' },
            $(go.TextBlock, 'red X')
          ),
          $('CheckBox', 'choice4',
            { '_buttonFillOver': 'pink', '_buttonStrokeOver': 'red' },
            $(go.TextBlock, 'pink over')
          ),
          $('CheckBox', 'choice5',
            { 'Button.width': 32, 'Button.height': 32 },
            $(go.TextBlock, 'BIG',
              { font: 'bold 12pt sans-serif' })
          ),
          $('CheckBox', 'choice6',
            {
              'Button.width': 20, 'Button.height': 20,
              'ButtonBorder.figure': 'Circle', 'ButtonBorder.stroke': 'blue',
              'ButtonIcon.figure': 'Circle', 'ButtonIcon.fill': 'blue',
              'ButtonIcon.strokeWidth': 0, 'ButtonIcon.desiredSize': new go.Size(10, 10)
            },
            $(go.TextBlock, 'blue circle')
          ),
          $('CheckBox', 'choice7', go.Panel.Vertical,
            $(go.TextBlock, 'vertical')
          )
        ),
        // the second column is a list of CheckBoxes
        $(go.Panel, 'Table',
          {
            row: 1, column: 1,
            alignment: go.Spot.Top,
            minSize: new go.Size(50, NaN),
            itemTemplate:
              $('CheckBox', 'checked', go.Panel.TableRow,
                $(go.TextBlock,  // align text towards the right, next to the Button
                  { column: 0, alignment: go.Spot.Right },
                  new go.Binding('text', 'name')),
                { 'Button.column': 1 }  // put Button in second column, to the right of text
              )
          },
          new go.Binding('itemArray', 'items')
        ),
        // now a checkbox at the bottom of the whole table
        $('CheckBox', '',  // not data bound
          { row: 3, columnSpan: 2, alignment: go.Spot.Left },
          // this checkbox is not bound to model data, but it does toggle the Part.movable
          // property of the Node that this is in
          $(go.TextBlock, 'Node is not movable'),
          { // _doClick is executed within a transaction by the CheckBoxButton click function
            '_doClick': function (e: go.DiagramEvent, obj: go.GraphObject) {
              if (obj.part !== null) obj.part.movable = !obj.part.movable;  // toggle the Part.movable flag
            }
          }
        )
      )
    );

  // but use the default Link template, by not setting Diagram.linkTemplate

  // create the model data that will be represented by Nodes and Links
  myDiagram.model =
    new go.GraphLinksModel(
      {
        copiesArrays: true,
        copiesArrayObjects: true,
        nodeDataArray:
          [
            {
              key: 'Alpha', color: 'lightblue', choice1: true, choice2: true, choice3: true, choice4: true, choice5: true, choice6: true, choice7: true,
              items: [{ name: 'item 0' },
              { name: 'item 1' },
              { name: 'item 2' }]
            },
            {
              key: 'Beta', color: 'orange',
              items: [{ name: 'B1', checked: false },
              { name: 'Bee2', checked: true }]
            },
            {
              key: 'Gamma', color: 'lightgreen',
              items: [{ name: 'C-one', checked: true },
              { name: 'C-two', checked: true },
              { name: 'C-three' }]
            },
            {
              key: 'Delta', color: 'pink', choice1: true, choice2: false,
              items: []
            }
          ],
        linkDataArray:
          [
            { from: 'Alpha', to: 'Beta' },
            { from: 'Alpha', to: 'Gamma' },
            { from: 'Gamma', to: 'Delta' },
            { from: 'Delta', to: 'Alpha' }
          ]
      }).addChangedListener(
        function (e: go.ChangedEvent) {
          if (e.isTransactionFinished) {
            const elt = document.getElementById('mySavedModel');
            if (elt !== null) elt.textContent = myDiagram.model.toJson();
          }
        }
      );

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
}
