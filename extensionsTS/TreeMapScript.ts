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
import { TreeMapLayout } from './TreeMapLayout.js';

let myDiagram: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, 'myDiagramDiv',  // must be the ID or reference to div
      {
        initialAutoScale: go.Diagram.Uniform,
        'animationManager.isEnabled': false,
        layout: $(TreeMapLayout,
          { isTopLevelHorizontal: false }),
        allowMove: false, allowCopy: false, allowDelete: false
      });

  // change selection behavior to cycle up the chain of containing Groups
  myDiagram.toolManager.clickSelectingTool.standardMouseSelect = function() {
    const diagram = this.diagram;
    if (diagram === null || !diagram.allowSelect) return;
    const e = diagram.lastInput;
    if (!(e.control || e.meta) && !e.shift) {
      const part = diagram.findPartAt(e.documentPoint, false);
      if (part !== null) {
        let firstselected = null;  // is this or any containing Group selected?
        let node: go.Part | null = part;
        while (node !== null) {
          if (node.isSelected) {
            firstselected = node;
            break;
          } else {
            node = node.containingGroup;
          }
        }
        if (firstselected !== null) {  // deselect this and select its containing Group
          firstselected.isSelected = false;
          const group = firstselected.containingGroup;
          if (group !== null) group.isSelected = true;
          return;
        }
      }
    }
    go.ClickSelectingTool.prototype.standardMouseSelect.call(this);
  };

  // Nodes and Groups are the absolute minimum template: no elements at all!
  myDiagram.nodeTemplate =
    $(go.Node,
      { background: 'rgba(99,99,99,0.2)' },
      new go.Binding('background', 'fill'),
      {
        toolTip: $<go.Adornment>('ToolTip',
          $(go.TextBlock, new go.Binding('text', '', tooltipString).ofObject())
        )
      }
    );

  myDiagram.groupTemplate =
    $(go.Group, 'Auto',
      { layout: null },
      { background: 'rgba(99,99,99,0.2)' },
      new go.Binding('background', 'fill'),
      {
        toolTip: $<go.Adornment>('ToolTip',
          $(go.TextBlock, new go.Binding('text', '', tooltipString).ofObject())
        )
      }
    );

  function tooltipString(part: go.Part): string {
    if (part instanceof go.Adornment && part.adornedPart !== null) part = part.adornedPart;
    let msg = createPath(part);
    msg += '\nsize: ' + part.data.size;
    if (part instanceof go.Group) {
      const group = part;
      msg += '\n# children: ' + group.memberParts.count;
      msg += '\nsubtotal size: ' + group.data.total;
    }
    return msg;
  }

  function createPath(part: go.Part): string {
    const parent = part.containingGroup;
    return (parent !== null ? createPath(parent) + '/' : '') + part.data.text;
  }

  // generate a tree with the default values
  rebuildGraph();
}

export function rebuildGraph() {
  let minNodes = (document.getElementById('minNodes') as any).value;
  minNodes = parseInt(minNodes, 10);

  let maxNodes = (document.getElementById('maxNodes') as any).value;
  maxNodes = parseInt(maxNodes, 10);

  let minChil = (document.getElementById('minChil') as any).value;
  minChil = parseInt(minChil, 10);

  let maxChil = (document.getElementById('maxChil') as any).value;
  maxChil = parseInt(maxChil, 10);

  // create and assign a new model
  const model = new go.GraphLinksModel();
  model.nodeGroupKeyProperty = 'parent';
  model.nodeDataArray = generateNodeData(minNodes, maxNodes, minChil, maxChil);
  myDiagram.model = model;
}

class Nodes {
  public key: number;
  public isGroup: boolean;
  public parent: any;
  public text: string;
  public fill: string;
  public size: number;
  public total: number;
  constructor(key: number, isGroup: boolean, parent: any, text: string, fill: string, size: number, total: number) {
    this.key = key; this.isGroup = isGroup; this.parent = parent; this.text = text; this.fill = fill; this.size = size; this.total = total;
  }
}

// Creates a random number (between MIN and MAX) of randomly colored nodes.
export function generateNodeData(minNodes: number, maxNodes: number, minChil: number, maxChil: number) {
  const nodeArray = [];
  if (minNodes === undefined || isNaN(minNodes) || minNodes < 1) minNodes = 1;
  if (maxNodes === undefined || isNaN(maxNodes) || maxNodes < minNodes) maxNodes = minNodes;

  // Create a bunch of node data
  const numNodes = Math.floor(Math.random() * (maxNodes - minNodes + 1)) + minNodes;
  for (let i = 0; i < numNodes; i++) {
    const size = Math.random() * Math.random() * 10000;  // non-uniform distribution
    // nodeArray.push(new nodes(i, false, undefined, i.toString(), go.Brush.randomColor(), size, -1));
    nodeArray.push({
      key: i,  // the unique identifier
      isGroup: false,  // many of these turn into groups, by code below
      parent: undefined as (number | undefined),  // is set by code below that assigns children
      text: i.toString(),  // some text to be shown by the node template
      fill: go.Brush.randomColor(),  // a color to be shown by the node template
      size: size,
      total: -1  // use a negative value to indicate that the total for the group has not been computed
    });
  }

  // Takes the random collection of node data and creates a random tree with them.
  // Respects the minimum and maximum number of links from each node.
  // The minimum can be disregarded if we run out of nodes to link to.
  if (nodeArray.length > 1) {
    if (minChil === undefined || isNaN(minChil) || minChil < 0) minChil = 0;
    if (maxChil === undefined || isNaN(maxChil) || maxChil < minChil) maxChil = minChil;

    // keep the Set of node data that do not yet have a parent
    const available = new go.Set();
    available.addAll(nodeArray);
    for (let i = 0; i < nodeArray.length; i++) {
      const parent = nodeArray[i];
      available.remove(parent);

      // assign some number of node data as children of this parent node data
      const children = Math.floor(Math.random() * (maxChil - minChil + 1)) + minChil;
      for (let j = 0; j < children; j++) {
        const child: any = available.first();
        if (child === null) break;  // oops, ran out already
        available.remove(child);
        // have the child node data refer to the parent node data by its key
        child.parent = parent.key;
        if (!parent.isGroup) {  // make sure PARENT is a group
          parent.isGroup = true;
        }
        let par = parent;
        while (par !== null) {
          par.total += child.total;  // sum up sizes of all children
          if (par.parent !== undefined) {
            par = nodeArray[par.parent];
          } else {
            break;
          }
        }
      }
    }
  }
  return nodeArray;
}
