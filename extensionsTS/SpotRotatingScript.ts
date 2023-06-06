/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as  go from '../release/go.js';
import { SpotRotatingTool } from './SpotRotatingTool.js';

export function init() {
  if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make; // for conciseness in defining templates

  const myDiagram =
    new go.Diagram("myDiagramDiv",
      {
        rotatingTool: new SpotRotatingTool(),
        "undoManager.isEnabled": true,
        "ModelChanged": function(e: go.ChangedEvent) {
          if (e.isTransactionFinished) {
            const ta = document.getElementById("mySavedModel") as HTMLTextAreaElement;
            if (ta) ta.value = myDiagram.model.toJson();
          }
        }
      });

  myDiagram.nodeTemplate =
    $(go.Node, go.Panel.Spot,
      {
        locationObjectName: "SHAPE",
        locationSpot: go.Spot.Center,
        selectionObjectName: "SHAPE",
        resizable: true,
        resizeObjectName: "SHAPE", // name of the graph object to be resized
        rotatable: true,
        rotateObjectName: "SHAPE", // name of the graph object to be rotate
        rotationSpot: go.Spot.Center
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("rotationSpot", "rotSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
      $(go.Shape, "RoundedRectangle",
        { name: "SHAPE", fill: "orange", strokeWidth: 2 },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        new go.Binding("angle").makeTwoWay()),
      $(go.TextBlock, new go.Binding("text"))
    );

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
