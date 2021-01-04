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

import * as go from "../release/go.js";
import { RescalingTool } from "./RescalingTool.js";

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  const myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
    {
      layout: $(go.TreeLayout),
      "undoManager.isEnabled": true  // enable undo & redo
    });

  // install the RescalingTool as a mouse-down tool
  myDiagram.toolManager.mouseDownTools.add(new RescalingTool());

  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      { locationSpot: go.Spot.Center },
      new go.Binding("scale").makeTwoWay(),
      $(go.Shape, "RoundedRectangle", { strokeWidth: 0 },
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 8 },
        new go.Binding("text"))
    );

  // but use the default Link template, by not setting Diagram.linkTemplate

  // create the model data that will be represented by Nodes and Links
  myDiagram.model = new go.GraphLinksModel(
  [
    { key: 1, text: "Alpha", color: "lightblue" },
    { key: 2, text: "Beta", color: "orange" },
    { key: 3, text: "Gamma", color: "lightgreen" },
    { key: 4, text: "Delta", color: "pink" }
  ],
  [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 3, to: 4 }
  ]);
}
