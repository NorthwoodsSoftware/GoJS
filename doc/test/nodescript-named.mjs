// $ node nodescript-named.mjs

// This example loads the GoJS library, creates a Diagram with a layout and
// compares the updated model with the known correct result.

// Load GoJS.  This assumes importing ES modules and go.mjs.
import { GraphObject, Diagram, Size, LayeredDigraphLayout, Node, Binding, Point, Shape, TextBlock, GraphLinksModel } from "gojs";

const $ = GraphObject.make;  // for conciseness in defining templates

const myDiagram =
  $(Diagram, '', // No DOM, so there can be no DIV!
    {
      viewSize: new Size(400,400), // Set this property in DOM-less environments
      layout: $(LayeredDigraphLayout)
    });

myDiagram.nodeTemplate =
  $(Node, 'Auto',
    // specify the size of the node rather than measuring the size of the text
    { width: 80, height: 40 },
    // automatically save the Node.location to the node's data object
    new Binding('location', 'loc', Point.parse).makeTwoWay(Point.stringify),
    $(Shape, 'RoundedRectangle', { strokeWidth: 0},
      new Binding('fill', 'color')),
    $(TextBlock,
      new Binding('text', 'key'))
  );

// After the layout, output results:
myDiagram.addDiagramListener('InitialLayoutCompleted', function() {
  const json = myDiagram.model.toJson();
  const expected = `{ "class": "GraphLinksModel",
  "nodeDataArray": [
{"key":"Alpha","color":"lightblue","loc":"0 32.5"},
{"key":"Beta","color":"orange","loc":"125 0"},
{"key":"Gamma","color":"lightgreen","loc":"125 65"},
{"key":"Delta","color":"pink","loc":"250 65"}
],
  "linkDataArray": [
{"from":"Alpha","to":"Beta"},
{"from":"Alpha","to":"Gamma"},
{"from":"Gamma","to":"Delta"},
{"from":"Delta","to":"Alpha"}
]}`;
  console.log(json === expected ? "test is OK" : "test got unexpected model: " + json);
});

// load a model:
myDiagram.model = new GraphLinksModel(
[
  { key: 'Alpha', color: 'lightblue' },
  { key: 'Beta', color: 'orange' },
  { key: 'Gamma', color: 'lightgreen' },
  { key: 'Delta', color: 'pink' }
],
[
  { from: 'Alpha', to: 'Beta' },
  { from: 'Alpha', to: 'Gamma' },
  { from: 'Gamma', to: 'Delta' },
  { from: 'Delta', to: 'Alpha' }
]);
