# gojs-floorplanner

### By Northwoods Software for [GoJS](https://gojs.net)

This project provides a basic example of using GoJS to create a floor planner in a Svelte app.

## Installation

Start by running `npm install` to install all necessary dependencies.
`npm run dev` runs the app in the development mode.

## GoJS in Svelte Components

This GoJS Floorplanner sample demonstrates the <a
    href="https://gojs.net/latest/index.html"
    target="_blank">GoJS</a> diagramming library used in a simple Svelte app. The demo contains:

<ul>
  <li>
    A custom Diagram class, called Floorplan, which attempts to determine rooms and compute
    their sizes based on the walls in the diagram.
  </li>
  <li>A Palette in a component to drag and drop furniture items onto the main Diagram.</li>
  <li>A Node Information box that updates based on the current selection</li>
  <li>
    An Overview in a component to view a mini-map of the Floorplan Diagram. This is chiefly to
    demonstrate passing the Diagram to another component.
  </li>
  <li>
    Several other customizations specific to floor planning:
    <ol>
      <li>A custom tool to build new wall nodes and another one to reshape them.</li>
      <li>Drag computation functions for window and doors, to keep them inside walls.</li>
      <li>Selection adornments to visualize the size of windows, doors, and walls.</li>
    </ol>
  </li>
</ul>

Because of this sample's complexity, it is meant as a demonstration of several GoJS features
and a demonstration of GoJS alongside Svelte, rather than a starting point for your own
project. We are happy to help you begin a proof-of-concept for your own project, regardless of
your needs. <a href="https://nwoods.com/support.html" target="_blank">Contact us</a> for more information.

<a href="https://gojs.net/latest/samples/">See all GoJS samples</a>

## [Project source code](https://github.com/NorthwoodsSoftware/GoJS/tree/master/projects)

## [See more GoJS Samples](https://gojs.net/latest/samples/)
