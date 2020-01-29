'use strict';
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go.js';
import { GenogramLayout } from './GenogramLayout.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this
  const $ = go.GraphObject.make;
  const myDiagram =
    $(go.Diagram, 'myDiagramDiv',
      {
        initialAutoScale: go.Diagram.Uniform,
        'undoManager.isEnabled': true,
        // when a node is selected, draw a big yellow circle behind it
        nodeSelectionAdornmentTemplate:
          $(go.Adornment, 'Auto',
            { layerName: 'Grid' },  // the predefined layer that is behind everything else
            $(go.Shape, 'Circle', { fill: 'yellow', stroke: null }),
            $(go.Placeholder)
          ),
        layout:  // use a custom layout, defined below
          $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 })
      });

  // determine the color for each attribute shape
  function attrFill(a: string): string {
    switch (a) {
      case 'A': return 'green';
      case 'B': return 'orange';
      case 'C': return 'red';
      case 'D': return 'cyan';
      case 'E': return 'gold';
      case 'F': return 'pink';
      case 'G': return 'blue';
      case 'H': return 'brown';
      case 'I': return 'purple';
      case 'J': return 'chartreuse';
      case 'K': return 'lightgray';
      case 'L': return 'magenta';
      case 'S': return 'red';
      default: return 'transparent';
    }
  }

  // determine the geometry for each attribute shape in a male;
  // except for the slash these are all squares at each of the four corners of the overall square
  const tlsq = go.Geometry.parse('F M1 1 l19 0 0 19 -19 0z');
  const trsq = go.Geometry.parse('F M20 1 l19 0 0 19 -19 0z');
  const brsq = go.Geometry.parse('F M20 20 l19 0 0 19 -19 0z');
  const blsq = go.Geometry.parse('F M1 20 l19 0 0 19 -19 0z');
  const slash = go.Geometry.parse('F M38 0 L40 0 40 2 2 40 0 40 0 38z');
  function maleGeometry(a: string): go.Geometry {
    switch (a) {
      case 'A': return tlsq;
      case 'B': return tlsq;
      case 'C': return tlsq;
      case 'D': return trsq;
      case 'E': return trsq;
      case 'F': return trsq;
      case 'G': return brsq;
      case 'H': return brsq;
      case 'I': return brsq;
      case 'J': return blsq;
      case 'K': return blsq;
      case 'L': return blsq;
      case 'S': return slash;
      default: return tlsq;
    }
  }

  // determine the geometry for each attribute shape in a female;
  // except for the slash these are all pie shapes at each of the four quadrants of the overall circle
  const tlarc = go.Geometry.parse('F M20 20 B 180 90 20 20 19 19 z');
  const trarc = go.Geometry.parse('F M20 20 B 270 90 20 20 19 19 z');
  const brarc = go.Geometry.parse('F M20 20 B 0 90 20 20 19 19 z');
  const blarc = go.Geometry.parse('F M20 20 B 90 90 20 20 19 19 z');
  function femaleGeometry(a: string): go.Geometry {
    switch (a) {
      case 'A': return tlarc;
      case 'B': return tlarc;
      case 'C': return tlarc;
      case 'D': return trarc;
      case 'E': return trarc;
      case 'F': return trarc;
      case 'G': return brarc;
      case 'H': return brarc;
      case 'I': return brarc;
      case 'J': return blarc;
      case 'K': return blarc;
      case 'L': return blarc;
      case 'S': return slash;
      default: return tlarc;
    }
  }


  // two different node templates, one for each sex,
  // named by the category value in the node data object
  myDiagram.nodeTemplateMap.add('M',  // male
    $(go.Node, 'Vertical',
      { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
      $(go.Panel,
        { name: 'ICON' },
        $(go.Shape, 'Square',
          { width: 40, height: 40, strokeWidth: 2, fill: 'white', portId: '' }),
        $(go.Panel,
          { // for each attribute show a Shape at a particular place in the overall square
            itemTemplate:
              $(go.Panel,
                $(go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', maleGeometry))
              ),
            margin: 1
          },
          new go.Binding('itemArray', 'a')
        )
      ),
      $(go.TextBlock,
        { textAlign: 'center', maxSize: new go.Size(80, NaN) },
        new go.Binding('text', 'n'))
    ));

  myDiagram.nodeTemplateMap.add('F',  // female
    $(go.Node, 'Vertical',
      { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
      $(go.Panel,
        { name: 'ICON' },
        $(go.Shape, 'Circle',
          { width: 40, height: 40, strokeWidth: 2, fill: 'white', portId: '' }),
        $(go.Panel,
          { // for each attribute show a Shape at a particular place in the overall circle
            itemTemplate:
              $(go.Panel,
                $(go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', femaleGeometry))
              ),
            margin: 1
          },
          new go.Binding('itemArray', 'a')
        )
      ),
      $(go.TextBlock,
        { textAlign: 'center', maxSize: new go.Size(80, NaN) },
        new go.Binding('text', 'n'))
    ));

  // the representation of each label node -- nothing shows on a Marriage Link
  myDiagram.nodeTemplateMap.add('LinkLabel',
    $(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 20 }));


  myDiagram.linkTemplate =  // for parent-child relationships
    $(go.Link,
      {
        routing: go.Link.Orthogonal, curviness: 15,
        layerName: 'Background', selectable: false,
        fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top
      },
      $(go.Shape, { strokeWidth: 2 })
    );

  myDiagram.linkTemplateMap.add('Marriage',  // for marriage relationships
    $(go.Link,
      { selectable: false },
      $(go.Shape, { strokeWidth: 2, stroke: 'blue' })
    ));


  // n: name, s: sex, m: mother, f: father, ux: wife, vir: husband, a: attributes/markers
  setupDiagram(myDiagram, [
    { key: 0, n: 'Aaron', s: 'M', m: -10, f: -11, ux: 1, a: ['C', 'F', 'K'] },
    { key: 1, n: 'Alice', s: 'F', m: -12, f: -13, a: ['B', 'H', 'K'] },
    { key: 2, n: 'Bob', s: 'M', m: 1, f: 0, ux: 3, a: ['C', 'H', 'L'] },
    { key: 3, n: 'Barbara', s: 'F', a: ['C'] },
    { key: 4, n: 'Bill', s: 'M', m: 1, f: 0, ux: 5, a: ['E', 'H'] },
    { key: 5, n: 'Brooke', s: 'F', a: ['B', 'H', 'L'] },
    { key: 6, n: 'Claire', s: 'F', m: 1, f: 0, a: ['C'] },
    { key: 7, n: 'Carol', s: 'F', m: 1, f: 0, a: ['C', 'I'] },
    { key: 8, n: 'Chloe', s: 'F', m: 1, f: 0, vir: 9, a: ['E'] },
    { key: 9, n: 'Chris', s: 'M', a: ['B', 'H'] },
    { key: 10, n: 'Ellie', s: 'F', m: 3, f: 2, a: ['E', 'G'] },
    { key: 11, n: 'Dan', s: 'M', m: 3, f: 2, a: ['B', 'J'] },
    { key: 12, n: 'Elizabeth', s: 'F', vir: 13, a: ['J'] },
    { key: 13, n: 'David', s: 'M', m: 5, f: 4, a: ['B', 'H'] },
    { key: 14, n: 'Emma', s: 'F', m: 5, f: 4, a: ['E', 'G'] },
    { key: 15, n: 'Evan', s: 'M', m: 8, f: 9, a: ['F', 'H'] },
    { key: 16, n: 'Ethan', s: 'M', m: 8, f: 9, a: ['D', 'K'] },
    { key: 17, n: 'Eve', s: 'F', vir: 16, a: ['B', 'F', 'L'] },
    { key: 18, n: 'Emily', s: 'F', m: 8, f: 9 },
    { key: 19, n: 'Fred', s: 'M', m: 17, f: 16, a: ['B'] },
    { key: 20, n: 'Faith', s: 'F', m: 17, f: 16, a: ['L'] },
    { key: 21, n: 'Felicia', s: 'F', m: 12, f: 13, a: ['H'] },
    { key: 22, n: 'Frank', s: 'M', m: 12, f: 13, a: ['B', 'H'] },

    // "Aaron"'s ancestors
    { key: -10, n: 'Paternal Grandfather', s: 'M', m: -33, f: -32, ux: -11, a: ['A', 'S'] },
    { key: -11, n: 'Paternal Grandmother', s: 'F', a: ['E', 'S'] },
    { key: -32, n: 'Paternal Great', s: 'M', ux: -33, a: ['F', 'H', 'S'] },
    { key: -33, n: 'Paternal Great', s: 'F', a: ['S'] },
    { key: -40, n: 'Great Uncle', s: 'M', m: -33, f: -32, a: ['F', 'H', 'S'] },
    { key: -41, n: 'Great Aunt', s: 'F', m: -33, f: -32, a: ['B', 'I', 'S'] },
    { key: -20, n: 'Uncle', s: 'M', m: -11, f: -10, a: ['A', 'S'] },

    // "Alice"'s ancestors
    { key: -12, n: 'Maternal Grandfather', s: 'M', ux: -13, a: ['D', 'L', 'S'] },
    { key: -13, n: 'Maternal Grandmother', s: 'F', m: -31, f: -30, a: ['H', 'S'] },
    { key: -21, n: 'Aunt', s: 'F', m: -13, f: -12, a: ['C', 'I'] },
    { key: -22, n: 'Uncle', s: 'M', ux: -21 },
    { key: -23, n: 'Cousin', s: 'M', m: -21, f: -22 },
    { key: -30, n: 'Maternal Great', s: 'M', ux: -31, a: ['D', 'J', 'S'] },
    { key: -31, n: 'Maternal Great', s: 'F', m: -50, f: -51, a: ['B', 'H', 'L', 'S'] },
    { key: -42, n: 'Great Uncle', s: 'M', m: -30, f: -31, a: ['C', 'J', 'S'] },
    { key: -43, n: 'Great Aunt', s: 'F', m: -30, f: -31, a: ['E', 'G', 'S'] },
    { key: -50, n: 'Maternal Great Great', s: 'F', ux: -51, a: ['D', 'I', 'S'] },
    { key: -51, n: 'Maternal Great Great', s: 'M', a: ['B', 'H', 'S'] }
  ],
    4 /* focus on this person */);
}

interface Data {
  key: number;
  // n: name, s: sex, m: mother, f: father, ux: wife, vir: husband, a: attributes/markers
  n: string;
  s: string;
  m: number;
  f: number;
  ux: number;
  vir: number;
  a: string;
}

// create and initialize the Diagram.model given an array of node data representing people
export function setupDiagram(diagram: go.Diagram, array: Array<Object>, focusId: number) {
  diagram.model =
    go.GraphObject.make(go.GraphLinksModel,
      { // declare support for link label nodes
        linkLabelKeysProperty: 'labelKeys',
        // this property determines which template is used
        nodeCategoryProperty: 's',
        // create all of the nodes for people
        nodeDataArray: array
      });
  setupMarriages(diagram);
  setupParents(diagram);

  const node = diagram.findNodeForKey(focusId);
  if (node !== null) {
    diagram.select(node);
    // remove any spouse for the person under focus:
    // node.linksConnected.each(function(l) {
    //   if (!l.isLabeledLink) return;
    //   l.opacity = 0;
    //   var spouse = l.getOtherNode(node);
    //   spouse.opacity = 0;
    //   spouse.pickable = false;
    // });
  }
}

export function findMarriage(diagram: go.Diagram, a: number, b: number) {  // A and B are node keys
  const nodeA = diagram.findNodeForKey(a);
  const nodeB = diagram.findNodeForKey(b);
  if (nodeA !== null && nodeB !== null) {
    const it = nodeA.findLinksBetween(nodeB);  // in either direction
    while (it.next()) {
      const link = it.value;
      // Link.data.category === "Marriage" means it's a marriage relationship
      if (link.data !== null && link.data.category === 'Marriage') return link;
    }
  }
  return null;
}

// now process the node data to determine marriages
export function setupMarriages(diagram: go.Diagram) {
  const model = diagram.model as go.GraphLinksModel;
  const nodeDataArray = model.nodeDataArray;
  for (let i = 0; i < nodeDataArray.length; i++) {
    const data = nodeDataArray[i] as Data;
    const key = data.key;
    if (data.ux !== undefined) {
      let uxs: Array<number> = [];
      if (typeof data.ux === 'number') uxs = [data.ux] as Array<number>;
      for (let j = 0; j < uxs.length; j++) {
        const wife = uxs[j];
        if (key === wife) {
          // or warn no reflexive marriages
          continue;
        }
        const link = findMarriage(diagram, key, wife);
        if (link === null) {
          // add a label node for the marriage link
          const mlab = { s: 'LinkLabel' } as Data;
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          const mdata = { from: key, to: wife, labelKeys: [mlab.key], category: 'Marriage' };
          model.addLinkData(mdata);
        }
      }
    }
    if (data.vir !== undefined) {
      const virs: Array<number> = (typeof data.vir === 'number') ? [data.vir] : data.vir as Array<number>;
      for (let j = 0; j < virs.length; j++) {
        const husband = virs[j];
        if (key === husband) {
          // or warn no reflexive marriages
          continue;
        }
        const link = findMarriage(diagram, key, husband);
        if (link === null) {
          // add a label node for the marriage link
          const mlab = { s: 'LinkLabel' } as Data;
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          const mdata = { from: key, to: husband, labelKeys: [mlab.key], category: 'Marriage' };
          model.addLinkData(mdata);
        }
      }
    }
  }
}

// process parent-child relationships once all marriages are known
export function setupParents(diagram: go.Diagram) {
  const model = diagram.model as go.GraphLinksModel;
  const nodeDataArray = model.nodeDataArray;
  for (let i = 0; i < nodeDataArray.length; i++) {
    const data = nodeDataArray[i] as Data;
    const key = data.key;
    const mother = data.m;
    const father = data.f;
    if (mother !== undefined && father !== undefined) {
      const link = findMarriage(diagram, mother, father);
      if (link === null) {
        // or warn no known mother or no known father or no known marriage between them
        if (window.console) window.console.log('unknown marriage: ' + mother + ' & ' + father);
        continue;
      }
      const mdata = link.data;
      const mlabkey = mdata.labelKeys[0];
      const cdata = { from: mlabkey, to: key };
      model.addLinkData(cdata);
    }
  }
}
