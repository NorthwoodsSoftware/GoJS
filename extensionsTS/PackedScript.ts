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
import { PackedLayout } from './PackedLayout.js';

// define an interface for PackedLayout parameters so that they can easily be passed between functions
interface PackedLayoutParams {
  packShape: number;
  packMode: number;
  sortMode: number;
  sortOrder: number;
  aspectRatio: number;
  size: go.Size;
  spacing: number;
  hasCircularNodes: boolean;
  arrangesToOrigin: boolean;
}

let myDiagram: go.Diagram;

let aspectRatio: HTMLInputElement;
let layoutWidth: HTMLInputElement;
let layoutHeight: HTMLInputElement;
let nodeSpacing: HTMLInputElement;
let hasCircularNodes: HTMLInputElement;
let numNodes: HTMLInputElement;
let nodeMinSide: HTMLInputElement;
let nodeMaxSide: HTMLInputElement;
let sameSides: HTMLInputElement;

// nodes need to be randomized again if any of these change
let minSidePrevious: number;
let maxSidePrevious: number;
let sameSidesPrevious: boolean;

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, 'myDiagramDiv',  // must be the ID or reference to div
      {
        'animationManager.isEnabled': true,
        layout: $(PackedLayout),
        scale: 0.75, isReadOnly: true
      });

  // Nodes have a template with bindings for size, shape, and fill color
  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',
      new go.Binding('visible', 'visible'),
      $(go.Shape,
        {strokeWidth: 0},
        new go.Binding('figure', 'figure'),
        new go.Binding('width', 'width'),
        new go.Binding('height', 'height'),
        new go.Binding('fill', 'fill'))
    );

  myDiagram.model = new go.GraphLinksModel([]);

  // find the elements in the DOM which control configuration
  aspectRatio = document.getElementById('aspectRatio') as HTMLInputElement;
  layoutWidth = document.getElementById('width') as HTMLInputElement;
  layoutHeight = document.getElementById('height') as HTMLInputElement;
  nodeSpacing = document.getElementById('nodeSpacing') as HTMLInputElement;
  hasCircularNodes = document.getElementById('hasCircularNodes') as HTMLInputElement;
  numNodes = document.getElementById('numNodes') as HTMLInputElement;
  nodeMinSide = document.getElementById('nodeMinSide') as HTMLInputElement;
  nodeMaxSide = document.getElementById('nodeMaxSide') as HTMLInputElement;
  sameSides = document.getElementById('sameSides') as HTMLInputElement;

  aspectRatio.onkeydown = aspectRatioHandler;

  // create a layout with the default values
  rebuildGraph();
}

// when arrow keys are pressed and the aspect ratio is below 1, increment using the harmonic sequence
// this makes the aspect ratio change as follows: 3:1, 2:1, 1:1, 1:2, 1:3, etc.
function aspectRatioHandler(e: KeyboardEvent) {
  if (e.key === 'ArrowUp' && parseFloat(aspectRatio.value) < 1) {
    e.preventDefault();
    const denom = Math.round(1 / parseFloat(aspectRatio.value));
    aspectRatio.value = (+(1 / (denom - 1)).toFixed(2)) + '';
    rebuildGraph();
  } else if (e.key === 'ArrowDown' && parseFloat(aspectRatio.value) <= 1) {
    e.preventDefault();
    const denom = Math.round(1 / parseFloat(aspectRatio.value));
    if (denom < 10) {
      aspectRatio.value = (+(1 / (denom + 1)).toFixed(2)) + '';
      rebuildGraph();
    }
  }
}

function validateInput() {
  if (!aspectRatio.value || parseFloat(aspectRatio.value) <= 0) {
    aspectRatio.value = '0.1';
  }
  if (!layoutWidth.value || parseFloat(layoutWidth.value) <= 0) {
    layoutWidth.value = '1';
  }
  if (!layoutHeight.value || parseFloat(layoutHeight.value) <= 0) {
    layoutHeight.value = '1';
  }
  if (!nodeSpacing.value) {
    nodeSpacing.value = '0';
  }
  if (!numNodes.value || parseInt(numNodes.value) < 1) {
    numNodes.value = '1';
  }
  if (!nodeMinSide.value || parseFloat(nodeMinSide.value) < 1) {
    nodeMinSide.value = '1';
  }
  if (!nodeMaxSide.value || parseFloat(nodeMaxSide.value) < 1) {
    nodeMaxSide.value = '1';
  }
}

export function rebuildGraph() {
  validateInput();

  let packShape = PackedLayout.Elliptical;
  switch (getRadioValue('packShape')) {
    case 'Elliptical':
      packShape = PackedLayout.Elliptical;
      break;
    case 'Rectangular':
      packShape = PackedLayout.Rectangular;
      break;
    case 'Spiral':
      packShape = PackedLayout.Spiral;
      break;
  }
  let packMode = PackedLayout.AspectOnly;
  switch (getRadioValue('packMode')) {
    case 'AspectOnly':
      packMode = PackedLayout.AspectOnly;
      break;
    case 'Fit':
      packMode = PackedLayout.Fit;
      break;
    case 'ExpandToFit':
      packMode = PackedLayout.ExpandToFit;
      break;
  }
  let sortMode = PackedLayout.None;
  switch (getRadioValue('sortMode')) {
    case 'None':
      sortMode = PackedLayout.None;
      break;
    case 'MaxSide':
      sortMode = PackedLayout.MaxSide;
      break;
    case 'Area':
      sortMode = PackedLayout.Area;
      break;
  }
  let sortOrder = PackedLayout.Descending;
  switch (getRadioValue('sortOrder')) {
    case 'Descending':
      sortOrder = PackedLayout.Descending;
      break;
    case 'Ascending':
      sortOrder = PackedLayout.Ascending;
      break;
  }

  const params: PackedLayoutParams = {
    packMode: packMode,
    packShape: packShape,
    sortMode: sortMode,
    sortOrder: sortOrder,
    aspectRatio: parseFloat(aspectRatio.value),
    size: new go.Size(parseFloat(layoutWidth.value), parseFloat(layoutHeight.value)),
    spacing: parseFloat(nodeSpacing.value),
    hasCircularNodes: hasCircularNodes.checked,
    arrangesToOrigin: false
  };

  disableInputs(params);

  if (sameSides.checked !== sameSidesPrevious
      || parseFloat(nodeMinSide.value) !== minSidePrevious
      || parseFloat(nodeMaxSide.value) !== maxSidePrevious) {
    sameSidesPrevious = sameSides.checked;
    minSidePrevious = parseFloat(nodeMinSide.value);
    maxSidePrevious = parseFloat(nodeMaxSide.value);
    randomize();
    return;
  }

  myDiagram.startTransaction('packed layout');
  generateNodeData();
  myDiagram.layout = go.GraphObject.make(PackedLayout, params /* defined above */);
  myDiagram.commitTransaction('packed layout');
}

export function randomize() {
  myDiagram.model = new go.GraphLinksModel([]);
  rebuildGraph();
}

function generateNodeData() {
  const nodeDataArray = myDiagram.model.nodeDataArray;
  const count = parseInt(numNodes.value);
  const min = parseFloat(nodeMinSide.value);
  const max = parseFloat(nodeMaxSide.value);
  const shapeToPack = getRadioValue('shapeToPack');

  if (count > nodeDataArray.length) {
    const arr = new Array();
    for (let i = nodeDataArray.length; i < count; i++) {
      const width = Math.floor(Math.random() * (max - min + 1)) + min;
      const height = sameSides.checked ? width : Math.floor(Math.random() * (max - min + 1)) + min;
      const color = go.Brush.randomColor(128, 235);
      arr.push({width: width, height: height, fill: color, figure: shapeToPack});
    }
    myDiagram.model.addNodeDataCollection(arr);
  } else if (count < nodeDataArray.length) {
    while (count < nodeDataArray.length) {
      myDiagram.model.removeNodeData(nodeDataArray[nodeDataArray.length - 1]);
    }
  } else {
    for (const data of nodeDataArray) {
      myDiagram.model.set(data, 'figure', shapeToPack);
    }
  }

  sameSidesPrevious = sameSides.checked;
  minSidePrevious = min;
  maxSidePrevious = max;

}

let hasCircularNodesSavedState: boolean | null = null;
let sameSidesSavedState: boolean | null = null;
function disableInputs(params: PackedLayoutParams) {
  setRadioButtonsDisabled('packMode', params.packShape === PackedLayout.Spiral);

  aspectRatio.disabled = params.packMode !== PackedLayout.AspectOnly || params.packShape === PackedLayout.Spiral;
  layoutWidth.disabled = params.packMode === PackedLayout.AspectOnly || params.packShape === PackedLayout.Spiral;
  layoutHeight.disabled = params.packMode === PackedLayout.AspectOnly || params.packShape === PackedLayout.Spiral;

  nodeSpacing.disabled = params.packMode === PackedLayout.ExpandToFit;

  hasCircularNodes.disabled = params.packShape === PackedLayout.Spiral;
  if (params.packShape === PackedLayout.Spiral) {
    if (hasCircularNodesSavedState === null) {
      hasCircularNodesSavedState = hasCircularNodes.checked;
    }
    hasCircularNodes.checked = true;
    params.hasCircularNodes = true;
  } else if (hasCircularNodesSavedState !== null) {
    hasCircularNodes.checked = hasCircularNodesSavedState;
    params.hasCircularNodes = false;
    hasCircularNodesSavedState = null;
  }

  sameSides.disabled = params.hasCircularNodes;
  if (params.hasCircularNodes) {
    if (sameSidesSavedState === null) {
      sameSidesSavedState = sameSides.checked;
    }
    sameSides.checked = true;
  } else if (sameSidesSavedState !== null) {
    sameSides.checked = sameSidesSavedState;
    sameSidesSavedState = null;
  }
}

function getRadioValue(name: string): string | undefined {
    const radio = document.getElementsByName(name);
    for (let i = 0; i < radio.length; i++) {
      if ((radio[i] as HTMLInputElement).checked) return (radio[i]as HTMLInputElement).value;
    }
}

function setRadioButtonsDisabled(name: string, disabled: boolean) {
  const radio = document.getElementsByName(name);
    for (let i = 0; i < radio.length; i++) {
      (radio[i] as HTMLInputElement).disabled = disabled;
    }
}
