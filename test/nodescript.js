// nodescript.js
// This example loads the GoJS library, creates a Diagram with a layout and
// compares the updated model with the known correct result.

// Load GoJS.  This assumes using require and CommonJS:
const go = require("gojs");

const $ = go.GraphObject.make;  // for conciseness in defining templates

const myDiagram =
  $(go.Diagram, '', // No DOM, so there can be no DIV!
    {
      viewSize: new go.Size(400,400), // Set this property in DOM-less environments
      layout: $(go.LayeredDigraphLayout)
    });

myDiagram.nodeTemplate =
  $(go.Node, 'Auto',
    // specify the size of the node rather than measuring the size of the text
    { width: 80, height: 40 },
    // automatically save the Node.location to the node's data object
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Shape, 'RoundedRectangle', { strokeWidth: 0},
      new go.Binding('fill', 'color')),
    $(go.TextBlock,
      new go.Binding('text', 'key'))
  );

// After the layout, output results:
myDiagram.addDiagramListener('InitialLayoutCompleted', function() {
  const json = myDiagram.model.toJson();
  const expected = `{ "class": "GraphLinksModel",
  "nodeDataArray": [
{"key":"Alpha","color":"lightblue","loc":"0 25"},
{"key":"Beta","color":"orange","loc":"125 0"},
{"key":"Gamma","color":"lightgreen","loc":"125 75"},
{"key":"Delta","color":"pink","loc":"250 75"}
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
myDiagram.model = new go.GraphLinksModel(
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
