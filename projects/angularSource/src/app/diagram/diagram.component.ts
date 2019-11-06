import { Component, EventEmitter, Input, Output } from '@angular/core';

import * as go from 'src/srcTS/go-unminified';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent {

  public diagram: go.Diagram = null;

  @Input()
  public model: go.Model;

  @Output()
  public nodeClicked = new EventEmitter();


  constructor() {
  }

  public ngAfterViewInit() {
    this.diagram = $(go.Diagram, 'myDiagramDiv',
      {
        layout:
          $(go.TreeLayout,
            {
              isOngoing: true,
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 20
            }),
        'undoManager.isEnabled': true
      }
    );

    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        // for sorting, have the Node.text be the data.name
        new go.Binding('text', 'name'),
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding('layerName', 'isSelected', function(sel) { return sel ? 'Foreground' : ''; }).ofObject(),
        // define the node's outer shape
        $(go.Shape, 'Rectangle',
          {
            name: 'SHAPE', fill: 'lightblue', stroke: null,
            // set the port properties:
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
          },
          new go.Binding('fill', '', function(node) {
            // modify the fill based on the tree depth level
            const levelColors = ['#AC193D', '#2672EC', '#8C0095', '#5133AB',
              '#008299', '#D24726', '#008A00', '#094AB2'];
            let color = node.findObject('SHAPE').fill;
            const dia: go.Diagram = node.diagram;
            if (dia && dia.layout.network) {
              dia.layout.network.vertexes.each(function(v: go.TreeVertex) {
                if (v.node && v.node.key === node.data.key) {
                  const level: number = v.level % (levelColors.length);
                  color = levelColors[level];
                }
              });
            }
            return color;
          }).ofObject()
        ),
        $(go.Panel, 'Horizontal',
          $(go.Picture,
            {
              name: 'Picture',
              desiredSize: new go.Size(39, 50),
              margin: new go.Margin(6, 8, 6, 10)
            },
            new go.Binding('source', 'key', function(key) {
              if (key < 0 || key > 16) return ''; // There are only 16 images on the server
              return 'assets/HS' + key + '.png';
            })
          ),
          // define the panel where the text will appear
          $(go.Panel, 'Table',
            {
              maxSize: new go.Size(150, 999),
              margin: new go.Margin(6, 10, 0, 3),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the name
              {
                row: 0, column: 0, columnSpan: 5,
                font: '12pt Segoe UI,sans-serif',
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 16)
              },
              new go.Binding('text', 'name').makeTwoWay()),
            $(go.TextBlock, 'Title: ', { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              { row: 1, column: 0 }),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              {
                row: 1, column: 1, columnSpan: 4,
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 14),
                margin: new go.Margin(0, 0, 0, 3)
              },
              new go.Binding('text', 'title').makeTwoWay()),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              { row: 2, column: 0 },
              new go.Binding('text', 'key', function(v) { return 'ID: ' + v; })),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              { name: 'boss', row: 2, column: 3 }, // we include a name so we can access this TextBlock when deleting Nodes/Links
              new go.Binding('text', 'parent', function(v) { return 'Boss: ' + v; })),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the comments
              {
                row: 3, column: 0, columnSpan: 5,
                font: 'italic 9pt sans-serif',
                wrap: go.TextBlock.WrapFit,
                editable: true,  // by default newlines are allowed
                minSize: new go.Size(10, 14)
              },
              new go.Binding('text', 'comments').makeTwoWay())
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node

    this.diagram.model = this.model;

    // when the selection changes, emit event to app-component updating the selected node
    this.diagram.addDiagramListener('ChangedSelection', (e) => {
      const node = this.diagram.selection.first();
      this.nodeClicked.emit(node);
    });
  }

}
