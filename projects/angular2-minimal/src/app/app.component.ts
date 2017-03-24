import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as go from "gojs";

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1><div #myDiagramDiv style="border: solid blue 1px; width:350px; height:350px"></div>`,
})

export class AppComponent implements AfterViewInit {
  name = 'GoJS';

  @ViewChild('myDiagramDiv')
  element: ElementRef;

  ngAfterViewInit() {
    //(go as any).licenseKey = "...";

    const $ = go.GraphObject.make;  // for conciseness in defining templates

    const myDiagram: go.Diagram = $(go.Diagram, this.element.nativeElement,
      {
        initialContentAlignment: go.Spot.Center,  // center the content
        "undoManager.isEnabled": true  // enable undo & redo
      });

    // define a simple Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",  // the Shape will go around the TextBlock
        $(go.Shape, "RoundedRectangle", { strokeWidth: 0 },
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8 },  // some room around the text
          // TextBlock.text is bound to Node.data.key
          new go.Binding("text", "key"))
      );

    // but use the default Link template, by not setting Diagram.linkTemplate

    // create the model data that will be represented by Nodes and Links
    myDiagram.model = new go.GraphLinksModel(
      [
        { key: "Alpha", color: "lightblue" },
        { key: "Beta", color: "orange" },
        { key: "Gamma", color: "lightgreen" },
        { key: "Delta", color: "pink" }
      ],
      [
        { from: "Alpha", to: "Beta" },
        { from: "Alpha", to: "Gamma" },
        { from: "Beta", to: "Beta" },
        { from: "Gamma", to: "Delta" },
        { from: "Delta", to: "Alpha" }
      ]);
  }

}
