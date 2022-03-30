GoJS, a JavaScript Library for HTML Diagrams
============================================

<img align="right" height="150" src="https://www.nwoods.com/images/go.png">

[GoJS](https://gojs.net) is a JavaScript and TypeScript library for creating and manipulating diagrams, charts, and graphs.

[![npm](https://img.shields.io/github/release/NorthwoodsSoftware/GoJS.svg)](https://www.npmjs.com/package/gojs)
[![open issues](https://img.shields.io/github/issues-raw/NorthwoodsSoftware/GoJS.svg)](https://github.com/NorthwoodsSoftware/GoJS/issues)
[![last commit](https://img.shields.io/github/last-commit/NorthwoodsSoftware/GoJS.svg)](https://github.com/NorthwoodsSoftware/GoJS/commits/master)
[![downloads](https://img.shields.io/npm/dw/gojs.svg)](https://www.npmjs.com/package/gojs)
[![Twitter Follow](https://img.shields.io/twitter/follow/NorthwoodsGo.svg?style=social&label=Follow)](https://twitter.com/NorthwoodsGo)

[See GoJS Samples](https://gojs.net/latest/samples)

[Get Started with GoJS](https://gojs.net/latest/learn)


GoJS is a flexible library that can be used to create a number of different kinds of interactive diagrams, including data visualizations, drawing tools, and graph editors. There are samples for [flowchart](https://gojs.net/latest/samples/flowchart.html), [org chart](https://gojs.net/latest/samples/orgChartEditor.html), [business process BPMN](https://gojs.net/latest/projects/bpmn/BPMN.html), [swimlanes](https://gojs.net/latest/samples/swimlanes.html), [timelines](https://gojs.net/latest/samples/timeline.html), [state charts](https://gojs.net/latest/samples/statechart.html), [kanban](https://gojs.net/latest/samples/kanban.html), [network](https://gojs.net/latest/samples/network.html), [mindmap](https://gojs.net/latest/samples/mindMap.html), [sankey](https://gojs.net/latest/samples/sankey.html), [family trees](https://gojs.net/latest/samples/familyTree.html) and [genogram charts](https://gojs.net/latest/samples/genogram.html), [fishbone diagrams](https://gojs.net/latest/extensions/Fishbone.html), [floor plans](https://gojs.net/latest/projects/floorplanner/FloorPlanner.html), [UML](https://gojs.net/latest/samples/umlClass.html), [decision trees](https://gojs.net/latest/samples/decisionTree.html), [pert charts](https://gojs.net/latest/samples/PERT.html), [Gantt](https://gojs.net/latest/samples/gantt.html), and [hundreds more](https://gojs.net/latest/samples/index.html). GoJS includes a number of built in layouts including tree layout, force directed, radial, and layered digraph layout, and a number of custom layout examples.

GoJS is rendered with an HTML Canvas element (with export to SVG or image formats). GoJS can run in a web browser, or server side in [Node](https://nodejs.org/en/) or [Puppeteer](https://github.com/GoogleChrome/puppeteer). GoJS Diagrams are backed by Models, with saving and loading typically via JSON.

[<img src="https://raw.githubusercontent.com/NorthwoodsSoftware/GoJS/master/.github/github-970x354.png">](https://gojs.net/latest/samples/index.html)

Read more about GoJS at [gojs.net](https://gojs.net)

This repository contains both the library and the sources for all samples, extensions, and documentation.
You can use the GitHub repository to quickly [search through all of the sources](https://github.com/NorthwoodsSoftware/GoJS-Samples/search?q=setDataProperty&type=Code).

<h2>Minimal Sample</h2>

Graphs are constructed by creating one or more templates, with desired properties data-bound, and adding model data.

```html
<div id="myDiagramDiv"></div>

<script src="https://unpkg.com/gojs"></script>

<script>
const myDiagram =
  new go.Diagram("myDiagramDiv",  // create a Diagram for the HTML Div element
    { "undoManager.isEnabled": true });  // enable undo & redo

// define a simple Node template
myDiagram.nodeTemplate =
  new go.Node("Auto")  // the Shape will automatically surround the TextBlock
    // add a Shape and a TextBlock to this "Auto" Panel
    .add(new go.Shape("RoundedRectangle",
        { strokeWidth: 0, fill: "white" })  // no border; default fill is white
        .bind("fill", "color"))  // Shape.fill is bound to Node.data.color
    .add(new go.TextBlock({ margin: 8, stroke: "#333" })  // some room around the text
        .bind("text", "key"));  // TextBlock.text is bound to Node.data.key

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
</script>
```

The above diagram and model code creates the following graph.
The user can now click on nodes or links to select them, copy-and-paste them, drag them, delete them, scroll, pan, and zoom, with a mouse or with fingers.

[<img width="200" height="200" src="https://gojs.net/latest/assets/images/screenshots/minimal.png">](https://gojs.net/latest/samples/minimal.html)

*Click the image to see the interactive GoJS Diagram*


<h2>Support</h2>

Northwoods Software offers a month of free developer-to-developer support for GoJS to help you get started on your project.

Read and search the official <a href="https://forum.nwoods.com/c/gojs">GoJS forum</a> for any topics related to your questions.

Posting in the forum is the fastest and most effective way of obtaining support for any GoJS related inquiries.
Please register for support at Northwoods Software's <a href="https://www.nwoods.com/register.html">registration form</a> before posting in the forum.

For any nontechnical questions about GoJS, such as about sales or licensing,
please visit Northwoods Software's <a href="https://www.nwoods.com/contact.html">contact form</a>.


<h2>License</h2>

The GoJS <a href="https://gojs.net/latest/license.html">software license</a>.


Copyright (c) Northwoods Software Corporation
