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
import { FishboneLayout, FishboneLink } from './FishboneLayout.js';

let myDiagram: go.Diagram;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this  F

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, 'myDiagramDiv',  // refers to its DIV HTML element by id
      { isReadOnly: true });  // do not allow the user to modify the diagram

  // define the normal node template, just some text
  myDiagram.nodeTemplate =
    $(go.Node,
      $(go.TextBlock,
        new go.Binding('text'),
        new go.Binding('font', '', convertFont))
    );

  function convertFont(data: any) {
    let size = data.size;
    if (size === undefined) size = 13;
    let weight = data.weight;
    if (weight === undefined) weight = '';
    return weight + ' ' + size + 'px sans-serif';
  }

  // This demo switches the Diagram.linkTemplate between the "normal" and the "fishbone" templates.
  // If you are only doing a FishboneLayout, you could just set Diagram.linkTemplate
  // to the template named "fishbone" here, and not switch templates dynamically.

  // define the non-fishbone link template
  myDiagram.linkTemplateMap.add('normal',
    $(go.Link,
      { routing: go.Link.Orthogonal, corner: 4 },
      $(go.Shape)
    ));

  // use this link template for fishbone layouts
  myDiagram.linkTemplateMap.add('fishbone',
    $(FishboneLink,  // defined above
      $(go.Shape)
    ));

  // here is the structured data used to build the model
  const json = {
    'text': 'Incorrect Deliveries', 'size': 18, 'weight': 'Bold', 'causes': [
      {
        'text': 'Skills', 'size': 14, 'weight': 'Bold', 'causes': [
          {
            'text': 'knowledge', 'weight': 'Bold', 'causes': [
              {
                'text': 'procedures', 'causes': [
                  { 'text': 'documentation' }
                ]
              },
              { 'text': 'products' }
            ]
          },
          { 'text': 'literacy', 'weight': 'Bold' }
        ]
      },
      {
        'text': 'Procedures', 'size': 14, 'weight': 'Bold', 'causes': [
          {
            'text': 'manual', 'weight': 'Bold', 'causes': [
              { 'text': 'consistency' }
            ]
          },
          {
            'text': 'automated', 'weight': 'Bold', 'causes': [
              { 'text': 'correctness' },
              { 'text': 'reliability' }
            ]
          }
        ]
      },
      {
        'text': 'Communication', 'size': 14, 'weight': 'Bold', 'causes': [
          { 'text': 'ambiguity', 'weight': 'Bold' },
          {
            'text': 'sales staff', 'weight': 'Bold', 'causes': [
              {
                'text': 'order details', 'causes': [
                  { 'text': 'lack of knowledge' }
                ]
              }
            ]
          },
          {
            'text': 'telephone orders', 'weight': 'Bold', 'causes': [
              { 'text': 'lack of information' }
            ]
          },
          {
            'text': 'picking slips', 'weight': 'Bold', 'causes': [
              { 'text': 'details' },
              { 'text': 'legibility' }
            ]
          }
        ]
      },
      {
        'text': 'Transport', 'size': 14, 'weight': 'Bold', 'causes': [
          {
            'text': 'information', 'weight': 'Bold', 'causes': [
              { 'text': 'incorrect person' },
              {
                'text': 'incorrect addresses', 'causes': [
                  {
                    'text': 'customer data base', 'causes': [
                      { 'text': 'not up-to-date' },
                      { 'text': 'incorrect program' }
                    ]
                  }
                ]
              },
              { 'text': 'incorrect dept' }
            ]
          },
          {
            'text': 'carriers', 'weight': 'Bold', 'causes': [
              { 'text': 'efficiency' },
              { 'text': 'methods' }
            ]
          }
        ]
      }
    ]
  };

  function walkJson(obj: any, arr: any) {
    const key = arr.length;
    obj.key = key;
    arr.push(obj);

    const children = obj.causes;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const o = children[i];
        o.parent = key;  // reference to parent node data
        walkJson(o, arr);
      }
    }
  }

  // build the tree model
  const nodeDataArray: Array<Object> = [];
  walkJson(json, nodeDataArray);
  myDiagram.model = new go.TreeModel(nodeDataArray);

  layoutFishbone();

  // Attach to the window for console manipulation
  (window as any).myDiagram = myDiagram;
}

// use FishboneLayout and FishboneLink
export function layoutFishbone() {
  myDiagram.startTransaction('fishbone layout');
  myDiagram.linkTemplate = myDiagram.linkTemplateMap.getValue('fishbone') as go.Link;
  myDiagram.layout = go.GraphObject.make(FishboneLayout, {  // defined above
    angle: 180,
    layerSpacing: 10,
    nodeSpacing: 20,
    rowSpacing: 10
  });
  myDiagram.commitTransaction('fishbone layout');
}

// make the layout a branching tree layout and use a normal link template
export function layoutBranching() {
  myDiagram.startTransaction('branching layout');
  myDiagram.linkTemplate = myDiagram.linkTemplateMap.getValue('normal') as go.Link;
  myDiagram.layout = go.GraphObject.make(go.TreeLayout, {
    angle: 180,
    layerSpacing: 20,
    alignment: go.TreeLayout.AlignmentBusBranching
  });
  myDiagram.commitTransaction('branching layout');
}

// make the layout a basic tree layout and use a normal link template
export function layoutNormal() {
  myDiagram.startTransaction('normal layout');
  myDiagram.linkTemplate = myDiagram.linkTemplateMap.getValue('normal') as go.Link;
  myDiagram.layout = go.GraphObject.make(go.TreeLayout, {
    angle: 180,
    breadthLimit: 1000,
    alignment: go.TreeLayout.AlignmentStart
  });
  myDiagram.commitTransaction('normal layout');
}
