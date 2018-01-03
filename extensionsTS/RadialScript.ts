"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { RadialLayout } from "./RadialLayout";

var myDiagram: go.Diagram;

export function init() {
  if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, "myDiagramDiv", // must be the ID or reference to div
      {
        initialContentAlignment: go.Spot.Center,
			  initialAutoScale: go.Diagram.Uniform,
        padding: 10,
        isReadOnly: true,
        layout: $(RadialLayout, {
          maxLayers: 2,
          rotateNode: function(node: go.Node, angle: number, sweep: number, radius: number) {
            // rotate the nodes and make sure the text is not upside-down
            node.angle = angle;
            var label = node.findObject("TEXTBLOCK");
            if (label !== null) {
              label.angle = ((angle > 90 && angle < 270 || angle < -90) ? 180 : 0);
            }
          },
          commitLayers: function() {
            // optional: add circles in the background
            // need to remove any old ones first
            var diagram = this.diagram;
            var gridlayer = diagram.findLayer("Grid");
            var circles = new go.Set(go.Part);
            gridlayer.parts.each(function(circle: go.Shape) {
              if (circle.name === "CIRCLE") circles.add(circle);
            });
            circles.each(function(circle) {
              diagram.remove(circle);
            });
            // add circles centered at the root
            const $ = go.GraphObject.make;  // for conciseness in defining templates
            for (var lay = 1; lay <= this.maxLayers; lay++) {
              var radius = lay * this.layerThickness;
              var circle =
                $(go.Part,
                  { name: "CIRCLE", layerName: "Grid" },
                  { locationSpot: go.Spot.Center, location: this.root.location },
                  $(go.Shape, "Circle",
                    { width: radius * 2, height: radius * 2 },
                    { fill: "rgba(200,200,200,0.2)", stroke: null }));
              diagram.add(circle);
            }
          }
        }),
        "animationManager.isEnabled": false
      });

  // shows when hovering over a node
  var commonToolTip =
    $(go.Adornment, "Auto",
      { isShadowed: true },
      $(go.Shape, { fill: "#FFFFCC" }),
      $(go.Panel, "Vertical",
        { margin: 3 },
        $(go.TextBlock,  // bound to node data
          { margin: 4, font: "bold 12pt sans-serif" },
          new go.Binding("text")),
        $(go.TextBlock,  // bound to node data
          new go.Binding("text", "color", function(c) { return "Color: " + c; })),
        $(go.TextBlock,  // bound to Adornment because of call to Binding.ofObject
          new go.Binding("text", "", function(ad) { return "Connections: " + ad.adornedPart.linksConnected.count; }).ofObject())
      )  // end Vertical Panel
    );  // end Adornment

  // define the Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",  // Node.location is the center of the Shape
        selectionAdorned: false,
        click: nodeClicked,
        toolTip: commonToolTip
      },
      $(go.Shape, "Circle",
        {
          name: "SHAPE",
          fill: "lightgray",  // default value, but also data-bound
          stroke: "transparent",
          strokeWidth: 2,
          desiredSize: new go.Size(20, 20),
          portId: ""  // so links will go to the shape, not the whole node
        },
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        {
          name: "TEXTBLOCK",
          alignment: go.Spot.Right,
          alignmentFocus: go.Spot.Left
        },
        new go.Binding("text"))
    );

  // this is the root node, at the center of the circular layers
  myDiagram.nodeTemplateMap.add("Root",
    $(go.Node, "Auto",
      {
        locationSpot: go.Spot.Center,
        selectionAdorned: false,
        toolTip: commonToolTip
      },
      $(go.Shape, "Circle",
        { fill: "white" }),
      $(go.TextBlock,
        { font: "bold 12pt sans-serif", margin: 5 },
        new go.Binding("text"))
    ));

  // define the Link template
  myDiagram.linkTemplate =
    $(go.Link,
      {
        routing: go.Link.Normal,
        curve: go.Link.Bezier,
        selectionAdorned: false,
        layerName: "Background"
      },
      $(go.Shape,
        {
          stroke: "black",  // default value, but is data-bound
          strokeWidth: 1
        },
        new go.Binding("stroke", "color"))
    );

  generateGraph();
}

function generateGraph() {
  var names = [
    "Joshua", "Daniel", "Robert", "Noah", "Anthony",
    "Elizabeth", "Addison", "Alexis", "Ella", "Samantha",
    "Joseph", "Scott", "James", "Ryan", "Benjamin",
    "Walter", "Gabriel", "Christian", "Nathan", "Simon",
    "Isabella", "Emma", "Olivia", "Sophia", "Ava",
    "Emily", "Madison", "Tina", "Elena", "Mia",
    "Jacob", "Ethan", "Michael", "Alexander", "William",
    "Natalie", "Grace", "Lily", "Alyssa", "Ashley",
    "Sarah", "Taylor", "Hannah", "Brianna", "Hailey",
    "Christopher", "Aiden", "Matthew", "David", "Andrew",
    "Kaylee", "Juliana", "Leah", "Anna", "Allison",
    "John", "Samuel", "Tyler", "Dylan", "Jonathan"
  ];

  var nodeDataArray = [];
  for (var i = 0; i < names.length; i++) {
    nodeDataArray.push({ key: i, text: names[i], color: go.Brush.randomColor(128, 240) });
  }

  var linkDataArray = [];
  var num = nodeDataArray.length;
  for (var i = 0; i < num * 2; i++) {
    var a = Math.floor(Math.random() * num);
    var b = Math.floor(Math.random() * num / 4) + 1;
    linkDataArray.push({ from: a, to: (a + b) % num, color: go.Brush.randomColor(0, 127) });
  }

  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  var someone = nodeDataArray[Math.floor(Math.random() * nodeDataArray.length)];
  nodeClicked(null, myDiagram.findNodeForData(someone));
}

function nodeClicked(e: go.InputEvent, root: go.Node) {
  var diagram = root.diagram;
  if (diagram === null) return;
  // all other nodes should be visible and use the default category
  diagram.nodes.each(function(n) {
    n.visible = true;
    if (n !== root) n.category = "";
  })
  // make this Node the root
  root.category = "Root";
  // tell the RadialLayout what the root node should be
  (diagram.layout as RadialLayout).root = root;
  diagram.layoutDiagram(true);
}

// called when "Set Max Layers" button is clicked
export function adjustMaxLayers() {
  var newMaxLayers = (document.getElementById("maxLayersChanger") as any).value;
  function IsNumeric(val: number) {
    return Number(parseInt(val.toString())) == val;
  }
  if (!IsNumeric(newMaxLayers) || newMaxLayers < 1 || newMaxLayers > 10) {
    alert("Please enter an integer larger than zero and less than or equal to 10.");
  } else {
    var lay = myDiagram.layout as RadialLayout;
    lay.maxLayers = Math.max(1, Math.min(newMaxLayers, 10));
    nodeClicked(null, lay.root);
  }
}
