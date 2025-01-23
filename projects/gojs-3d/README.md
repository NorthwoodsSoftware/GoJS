# gojs-3d

### By Northwoods Software for [GoJS](https://gojs.net)

This project provides a basic example of using GoJS alongside a 3D view (using ThreeJS) in a Svelte app.

## Installation

Start by running `npm install` to install all necessary dependencies.
`npm run dev` runs the app in the development mode.

## GoJS with ThreeJS in Svelte

This sample demonstrates GoJS Diagrams alongside a 3D model made with ThreeJS.

Three separate GoJS Diagrams observe a single model, each showing two of three coordinate
planes. When Nodes are moved or resized, two-way bindings on the Node Templates transmit
those changes back to the model, automatically updating the other GoJS Diagrams. The ThreeJS
view is updated with a Model change listener (<a target="\_blank" href="https://gojs.net/latest/api/symbols/Model.html#addChangedListener"> <code>model.addChangedListener</code></a> ).

This sample also demonstrates GoJS alongside Svelte, where one component creates a GoJS
model and passes it to children components. Those components bind the model and a selection
variable, to pass upwards to update the state of other diagrams and the UI. A simple node
information component is included to show details about a selected object.

## [Project source code](https://github.com/NorthwoodsSoftware/GoJS/tree/master/projects)

## [See more GoJS Samples](https://gojs.net/latest/samples/)
