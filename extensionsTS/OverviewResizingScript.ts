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
import { OverviewResizingTool } from './OverviewResizingTool.js';

let myDiagram: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram = $(go.Diagram, 'myDiagramDiv',  // create a Diagram for the DIV HTML element
    {
      layout: $(go.ForceDirectedLayout),
      'undoManager.isEnabled': true  // enable undo & redo
    });

  // Define the Node template.
  // This uses a Spot Panel to position a button relative
  // to the ellipse surrounding the text.
  myDiagram.nodeTemplate =
    $(go.Node, 'Spot',
      {
        selectionObjectName: 'PANEL',
        isTreeExpanded: false,
        isTreeLeaf: false
      },
      // the node's outer shape, which will surround the text
      $(go.Panel, 'Auto',
        { name: 'PANEL' },
        $(go.Shape, 'Circle',
          { fill: '#03A9F4', stroke: 'black' }
        ),
        $(go.TextBlock,
          { font: '12pt sans-serif', margin: 5 },
          new go.Binding('text', 'key'))
      ),
      // the expand/collapse button, at the top-right corner
      $('TreeExpanderButton',
        {
          name: 'TREEBUTTON',
          width: 20, height: 20,
          alignment: go.Spot.TopRight,
          alignmentFocus: go.Spot.Center,
          // customize the expander behavior to
          // create children if the node has never been expanded
          click: function (e: go.InputEvent, obj: go.GraphObject) {  // OBJ is the Button
              const node = obj.part as go.Node;  // get the Node containing this Button
              if (node === null) return;
              e.handled = true;
              expandNode(node);
            }
        }
      )  // end TreeExpanderButton
    );  // end Node

  // create the model with a root node data
  myDiagram.model = new go.TreeModel([
    { key: 0, everExpanded: false }
  ]);

  // Overview
  const myOverview =
    $(go.Overview, 'myOverviewDiv',  // the HTML DIV element for the Overview
      {
        observed: myDiagram,
        contentAlignment: go.Spot.Center,
        'box.resizable': true,
        'resizingTool': new OverviewResizingTool()
      });

  (document.getElementById('zoomToFit') as HTMLElement).addEventListener('click', function() {
    myDiagram.zoomToFit();
  });

  (document.getElementById('expandAtRandom') as HTMLElement).addEventListener('click', function() {
    expandAtRandom();
  });
}

function expandNode(node: go.Node) {
  const diagram = node.diagram;
  if (diagram === null) return;
  diagram.startTransaction('CollapseExpandTree');
  // this behavior is specific to this incrementalTree sample:
  const data = node.data;
  if (!data.everExpanded) {
    // only create children once per node
    diagram.model.setDataProperty(data, 'everExpanded', true);
    const numchildren = createSubTree(data);
    if (numchildren === 0) {  // now known no children: don't need Button!
      const btn = node.findObject('TREEBUTTON');
      if (btn !== null) btn.visible = false;
    }
  }
  // this behavior is generic for most expand/collapse tree buttons:
  if (node.isTreeExpanded) {
    diagram.commandHandler.collapseTree(node);
  } else {
    diagram.commandHandler.expandTree(node);
  }
  diagram.commitTransaction('CollapseExpandTree');
}

// This dynamically creates the immediate children for a node.
// The sample assumes that we have no idea of whether there are any children
// for a node until we look for them the first time, which happens
// upon the first tree-expand of a node.
function createSubTree(parentdata: any) {
  let numchildren = Math.floor(Math.random() * 10);
  if (myDiagram.nodes.count <= 1) {
    numchildren += 1;  // make sure the root node has at least one child
  }
  // create several node data objects and add them to the model
  const model = myDiagram.model;
  const parent = myDiagram.findNodeForData(parentdata);
  if (parent === null) return;

  for (let i = 0; i < numchildren; i++) {
    const childdata = {
      key: model.nodeDataArray.length,
      parent: parentdata.key
    };
    // add to model.nodeDataArray and create a Node
    model.addNodeData(childdata);
    // position the new child node close to the parent
    const child = myDiagram.findNodeForData(childdata);
    if (child !== null) child.location = parent.location;
  }
  return numchildren;
}

function expandAtRandom() {
  const eligibleNodes: Array<go.Node> = [];
  myDiagram.nodes.each(function(n) {
    if (!n.isTreeExpanded) eligibleNodes.push(n);
  });
  const node = eligibleNodes[Math.floor(Math.random() * (eligibleNodes.length))];
  expandNode(node);
}
