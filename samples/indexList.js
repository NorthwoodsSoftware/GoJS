/* Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved. */
/**
 * Be sure to add any new samples to this list, to assets/js/goSamples.js, and to samples/all.html.
 */

/**
 * Full array of all tags
 * This is useful for both creating an initial tag list and keeping the list in a consistent order
 * in case we use tag filtering.
 */
var tags = [
  "animation",
  "tables",
  "itemarrays",
  "collections",
  "links",
  "ports",
  "gridlayout",
  "treelayout",
  "forcedirectedlayout",
  "layereddigraphlayout",
  "circularlayout",
  "customlayout",
  "groups",
  "tooltips",
  "contextmenus",
  "tools",
  "palette",
  "overview",
  "buttons",
  "extensions",
  "geometries",
  "grid",
  "svg",
  "performance",
  "circle-like",
  "process",
  "monitoring",
  "gauges",
  "charts",
  "html",
  "inspector",
  "frameworks",
  "storage",
  "export"
].sort();
tags.unshift("all", "featured");

/**
 * Full array of all samples
 * Each sample is made up of:
 * [0]: relative path
 * [1]: title
 * [2]: description
 * [3]: screenshot name
 * [4]: tags
 */
var arr = [];
// SAMPLES
// Featured
arr.push([
  "flowchart",
  "Flowchart",
  "A standard flowchart, showing different node templates and several data bindings. Each node has 3 or 4 port elements. Links are orthogonal and avoid nodes.",
  "flowchart",
  ["featured", "palette", "svg", "process"]
]);

arr.push([
  "orgChartStatic",
  "OrgChart (Static)",
  "Shows an organizational chart, uses an in-laid Overview to aid the user in navigation, and allows the user to search by example.",
  "orgChartStatic",
  ["featured", "tables", "treelayout", "overview"]
]);

arr.push([
  "orgChartEditor",
  "OrgChart Editor",
  "An organizational chart that allows user editing and re-organizing of the hierarchy.",
  "orgChartEditor",
  ["featured", "tables", "treelayout", "contextmenus", "buttons", "inspector"]
]);

arr.push([
  "stateChart",
  "State Chart",
  "A state chart diagram that also shows dynamic creation of new nodes and links on a button press.",
  "stateChart",
  ["featured", "buttons", "process"]
]);

arr.push([
  "basic",
  "Basic",
  "Shows many of the commands possible in GoJS, templates for Links and for Groups, plus tooltips and context menus for Nodes, for Links, for Groups, and for the Diagram.",
  "basic",
  ["groups", "tooltips", "contextmenus", "buttons"]
]);

arr.push(["blockEditor",
  "Block Diagram",
  "A simple block diagram editor that makes it easy for the user to chain together new nodes, with context menus for changing shapes and colors.",
  "blockEditor",
  ["featured"]
]);

arr.push([
  "genogram",
  "Genogram",
  "A genogram or pedigree chart is an extended family tree diagram that show information about each person or each relationship.",
  "genogram",
  ["featured", "itemarrays", "collections", "layereddigraphlayout", "customlayout", "geometries"]
]);

arr.push([
  "entityRelationship",
  "Entity Relationship",
  "An entity relationship diagram, showcasing data binding with item arrays.",
  "entityRelationship",
  ["tables", "itemarrays", "forcedirectedlayout", "buttons"]
]);

arr.push([
  "icons",
  "SVG Icons",
  "Create your own custom Shapes using SVG path strings. This sample uses SVG strings from a free icon set.",
  "icons",
  ["gridlayout", "treelayout", "tooltips", "geometries", "svg"]
]);

// Commonly Used Charts/Diagrams
arr.push([
  "sankey",
  "Sankey",
  "Sankey diagrams show the amount of flow between nodes by the width of the links.",
  "sankey",
  ["featured", "links", "layereddigraphlayout", "customlayout"]
]);

arr.push([
  "PERT",
  "PERT",
  "A simple PERT chart, showcasing GoJS table panels and RowColumnDefinition properties.",
  "pert",
  ["tables", "layereddigraphlayout"]
]);

arr.push([
  "gantt",
  "Gantt",
  "Demonstrates a simple Gantt chart.",
  "gantt",
  ["grid"]
]);

arr.push([
  "euler",
  "Euler Diagram",
  "A read-only diagram where clicking on a node will open a new webpage.",
  "euler",
  ["extensions"]
]);

arr.push([
  "shapes",
  "Shapes",
  "Showcases all pre-defined GoJS figures. You can define your own named Shape figures.",
  "shapes",
  ["gridlayout", "geometries"]
]);

arr.push([
  "umlClass",
  "UML Class",
  "A UML Class diagram shows software classes and their properties and methods, and the relationships between them.",
  "umlClass",
  ["tables", "itemarrays", "treelayout", "buttons"]
]);

arr.push(["planogram",
  "Planogram",
  "Drag-and-drop items from the Palette onto racks in the Diagram.",
  "planogram",
  ["groups", "palette", "grid", "frameworks"]
]);

// Trees
arr.push([
  "classHierarchy",
  "Class Hierarchy",
  "Displays the GoJS Class Hierarchy as a series of trees. Double-click to go to the class's API documentation.",
  "classHierarchy",
  ["treelayout"]
]);

arr.push([
  "DOMTree",
  "DOM Tree",
  "Shows the DOM of this page displayed as a tree. Selection highlights the DOM element in the page.",
  "DOMTree",
  ["treelayout", "buttons"]
]);

arr.push([
  "visualTree",
  "Visual Tree",
  "This sample shows the actual visual tree of a running Diagram, using a second Diagram.",
  "visualTree",
  ["treelayout"]
]);

arr.push([
  "familyTree",
  "Family Tree",
  "Shows a standard family tree.",
  "familyTree",
  ["tables", "treelayout", "tooltips"]
]);

arr.push([
  "familyTreeJP",
  "Family Tree (Japanese)",
  "Shows a standard family tree.",
  "familyTreeJP",
  ["tables", "treelayout", "tooltips"]
]);

arr.push([
  "orgChartExtras",
  "Org Chart Extras",
  "Shows an org chart with extra links and expand/collapse functionality.",
  "orgChartExtras",
  ["tables", "treelayout", "tooltips", "buttons"]
]);

arr.push([
  "orgChartAssistants",
  "Org Chart Assistants",
  "Shows an org chart with assistant nodes at the side, above regular child nodes.",
  "orgChartAssistants",
  ["tables", "treelayout", "tooltips", "buttons"]
]);

arr.push([
  "localView",
  "Local View",
  "Two diagrams, the one on top showing a full tree and the one below focusing on a specific node in the tree and those nodes that are logically \"near\" it.",
  "localView",
  ["treelayout"]
]);

arr.push([
  "decisionTree",
  "Decision Tree",
  "Allows a user to make progressive decisions.",
  "decisionTree",
  ["treelayout", "tooltips", "buttons"]
]);

arr.push([
  "incrementalTree",
  "Incremental Tree",
  "Demonstrates the expansion of a tree where nodes are only created \"on-demand\", when the user clicks on the \"expand\" Button.",
  "incrementalTree",
  ["forcedirectedlayout", "buttons"]
]);

arr.push([
  "doubleTree",
  "Double Tree",
  "Displays a single diagram of two trees sharing a single root node growing in opposite directions, using the DoubleTreeLayout extension.",
  "doubleTree",
  ["collections", "treelayout"]
]);

arr.push([
  "mindMap",
  "Mind Map",
  "A Mind Map, a double-tree whose nodes have an \"add\" button when selected and a context menu.",
  "mindMap",
  ["collections", "treelayout", "contextmenus", "buttons"]
]);

arr.push([
  "tournament",
  "Tournament",
  "Tournament bracket with dynamic advancement as scores are entered.",
  "tournament",
  ["tables", "treelayout"]
]);

arr.push([
  "treeView",
  "Tree View",
  "Demonstrates a traditional \"Tree View\" in a GoJS diagram, with optional orthogonal links between the nodes.",
  "treeView",
  ["treelayout", "buttons"]
]);

arr.push([
  "triStateCheckBoxTree",
  "Tri-state CheckBox Tree",
  "Demonstrates a traditional \"Tree View\" in a GoJS diagram, where each item has a checkbox with three states.",
  "triStateCheckBoxTree",
  ["treelayout", "buttons"]
]);

arr.push([
  "treeMapper",
  "Tree Mapper",
  "Displays two trees, allowing the user to dynamically draw or reconnect links mapping data from field to another.",
  "treeMapper",
  ["featured", "groups", "treelayout", "buttons"]]);

arr.push([
  "parseTree",
  "Parse Tree",
  "A Parse tree representing the syntactic structure of a sentence. The leaf nodes are shown in a horizontal line.",
  "parseTree",
  ["treelayout", "customlayout", "buttons"]
]);

arr.push([
  "pipeTree",
  "Pipe Tree",
  "A tree layout with rectangular nodes at alternating angles and no links.",
  "pipeTree",
  ["treelayout"]
]);

arr.push([
  "faultTree",
  "Fault Tree",
  "A fault tree diagram with collapsing/expanding subtrees and gates at each non-root node.",
  "faultTree",
  ["treelayout", "buttons"]
]);

arr.push([
  "IVRtree",
  "IVR Tree",
  "Diagram representation of an Interactive Voice Response Tree (IVR tree). Nodes may have a collapsible list of details.",
  "ivrTree",
  ["tables", "itemarrays", "treelayout", "buttons"]
]);



// Graph Links
arr.push([
  "beatPaths",
  "Beat Paths",
  "Demonstrates reading JSON data describing the relative rankings of NFL teams at a particular moment in time and generating a diagram from that data.",
  "beatPaths",
  ["layereddigraphlayout"]
]);

arr.push([
  "conceptMap",
  "Concept Map",
  "A web of interlinked concepts displayed with a ForceDirected Layout, showcasing link labels.",
  "conceptMap",
  ["forcedirectedlayout"]
]);

arr.push([
  "pathAnimation",
  "Path Animation",
  "Animation of diagram parts (tokens) along link paths.",
  "pathAnimation",
  ["collections", "forcedirectedlayout", "animation"]
]);

arr.push([
  "distances",
  "Distances & Paths",
  "Show distances between two nodes and highlights one of all possible paths between the nodes.",
  "distances",
  ["collections", "forcedirectedlayout", "html"]
]);

// Linking
arr.push([
  "arrowheads",
  "Arrowheads",
  "Showcases all pre-defined Link arrowheads. You can define your own named arrowhead geometries.",
  "arrowheads",
  ["links", "circularlayout", "tooltips", "geometries", "circle-like"]
]);

arr.push([
  "relationships",
  "Relationships",
  "Shows how you can create custom renderings for Links by repeatedly drawing GraphObjects along the route.",
  "relationships",
  ["collections", "links", "treelayout", "geometries"]
]);

arr.push([
  "multiNodePathLinks",
  "Multi-Node Path Links",
  "Demonstrates custom routing for Links running through other Nodes.",
  "multiNodePathLinks",
  ["collections", "links"]
]);

arr.push([
  "multiColorLinks",
  "Multi-color Links",
  "Demonstrates a custom Link that can be stroked with multiple consecutive colors.",
  "multiColorLinks",
  ["links", "forcedirectedlayout", "geometries"]
]);

arr.push([
  "taperedLinks",
  "Tapered Links",
  "Demonstrates a custom Geometry for Link paths.",
  "taperedLinks",
  ["links", "forcedirectedlayout", "geometries"]
]);

arr.push([
  "multiArrow",
  "Multiple Arrowheads",
  "A custom orthogonal Link that draws arrowheads at the end of each segment.",
  "multiArrow",
  ["links", "forcedirectedlayout", "geometries"]
]);

arr.push([
  "draggableLink",
  "Draggable Link",
  "Showcases draggable disconnectable links that can be connected by dropping one or both ends at a valid port.",
  "draggableLink",
  ["collections", "links", "tools", "palette", "geometries", "grid"]
]);

arr.push([
  "linksToLinks",
  "Links to Links",
  "Demonstrates the ability for a Link to appear to connect with another Link, using label nodes that belong to links. ",
  "linksToLinks",
  ["links"]
]);

// Grouping
arr.push([
  "navigation",
  "Navigation",
  "Displays relationships between different parts of a diagram.",
  "navigation",
  ["collections", "groups", "tooltips"]
]);

arr.push([
  "grouping",
  "Grouping",
  "Demonstrates subgraphs that are created only as groups are expanded.",
  "grouping",
  ["treelayout", "groups", "buttons"]
]);

arr.push([
  "regrouping",
  "Regrouping",
  "Allows the user to drag nodes, including groups, into and out of groups, both from the Palette as well as from within the Diagram.",
  "regrouping",
  ["gridlayout", "groups", "palette", "buttons"]
]);

arr.push([
  "roundedGroups",
  "Rounded Groups",
  "BPMN Choreography that demonstrates subgraphs that have rounded headers and rounded footers.",
  "roundedGroups",
  ["groups", "geometries"]
]);

arr.push([
  "kanban",
  "Kanban Board",
  "A Kanban board editor, allowing the categorization of editable tasks.",
  "kanban",
  ["featured", "tables", "gridlayout", "customlayout", "groups", "buttons", "process"]
]);

arr.push([
  "swimBands",
  "Layer Bands",
  "Layer Bands are automatically created for each \"layer\" of a TreeLayout, and run perpendicular to the layout.",
  "swimBands",
  ["featured", "itemarrays", "treelayout", "customlayout"]
]);

arr.push([
  "swimLanes",
  "Swim Lanes",
  "Demonstrates collapsible, resizable, re-orderable swimlanes, a kind of process-flow diagram, with custom dragging rules that disallow nodes from leaving their lane.",
  "swimLanes",
  ["featured", "tables", "gridlayout", "layereddigraphlayout", "customlayout", "groups", "tools", "buttons"]
]);

arr.push([
  "swimLanesVertical",
  "Swim Lanes Vertical",
  "Demonstrates collapsible, resizable, re-orderable swimlanes, a kind of process-flow diagram, with custom dragging rules that disallow nodes from leaving their lane.",
  "swimLanesVertical",
  ["tables", "gridlayout", "layereddigraphlayout", "customlayout", "groups", "tools", "buttons"]
]);

arr.push([
  "visualTreeGrouping",
  "Visual Tree Using Groups",
  "This shows the same visual tree using nested Groups instead of nodes and links.",
  "visualTreeGrouping",
  ["gridlayout", "treelayout", "groups"]
]);

arr.push([
  "sharedStates",
  "Shared States",
  "As an alternative to using Groups, this manages Nodes that simultaneously belong to multiple containers.",
  "sharedStates",
  ["collections", "customlayout", "groups", "tools"]
]);

// Layouts
arr.push([
  "gLayout",
  "Grid Layout",
  "Shows GridLayout and options. Places all of the Parts in a grid-like arrangement, ordered, spaced apart, and wrapping as needed.",
  "gLayout",
  ["gridlayout", "html"]
]);

arr.push([
  "tLayout",
  "Tree Layout",
  "Shows TreeLayout and options. Positions nodes of a tree-structured graph in layers (rows or columns). ",
  "tLayout",
  ["collections", "treelayout", "html"]
]);

arr.push([
  "fdLayout",
  "Force Directed",
  "Shows ForceDirectedLayout and options. Treats the graph as if it were a system of physical bodies with forces acting on them and between them.",
  "fdLayout",
  ["collections", "forcedirectedlayout", "html"]
]);

arr.push([
  "ldLayout",
  "Layered Digraph",
  "Shows LayeredDigraphLayout and options. Arranges nodes of directed graphs into layers (rows or columns).",
  "ldLayout",
  ["collections", "layereddigraphlayout", "html"]
]);

arr.push([
  "cLayout",
  "Circular Layout",
  "Shows CircularLayout and options. This layout positions nodes in a circular arrangement.",
  "cLayout",
  ["collections", "circularlayout", "circle-like", "html"]
]);

arr.push([
  "interactiveForce",
  "Interactive Force",
  "A continuous ForceDirectedLayout that occurs as the user drags around a node.",
  "interactiveForce",
  ["forcedirectedlayout", "customlayout"]
]);

// Circle-like
arr.push([
  "doubleCircle",
  "Double Circle",
  "Multiple circles using repeated CircularLayouts.",
  "doubleCircle",
  ["collections", "circularlayout", "circle-like"]
]);

arr.push([
  "friendWheel",
  "Friend Wheel",
  "Demonstrates a customized CircularLayout.",
  "friendWheel",
  ["circularlayout", "customlayout", "circle-like"]
]);

arr.push([
  "radial",
  "Recentering Radial",
  "Arrange people in circles around a central person, in layers according to distance from the central person.",
  "radial",
  ["collections", "tooltips", "circle-like", "customlayout", "extensions"]
]);

arr.push([
  "radialPartition",
  "Radial Partition",
  "Arrange people in rings around a central person, in layers according to distance from the central person.",
  "radialPartition",
  ["collections", "tooltips", "geometries", "circle-like", "customlayout", "extensions"]
]);

// Processes
arr.push([
  "pageFlow",
  "Page Flow",
  "A diagram representation of webpage flow.",
  "pageFlow",
  ["itemarrays", "layereddigraphlayout", "palette", "buttons", "process"]
]);

arr.push([
  "processFlow",
  "Process Flow",
  "Tanks, valves, and pipes, with animated flow in the pipes.",
  "processFlow",
  ["geometries", "grid", "process", "monitoring", "animation"]
]);

arr.push([
  "productionProcess",
  "Production Process",
  "Partially describes the production process for converting natural gas and oil byproducts into their end products.",
  "productionProcess",
  ["tooltips", "geometries", "svg", "process", "monitoring", "html"]
]);

arr.push([
  "productionEditor",
  "Process Editor",
  "A designer for creating production process diagrams.",
  "productionEditor",
  ["featured", "geometries", "svg", "process", "palette", "inspector", "html"]
]);

arr.push([
  "systemDynamics",
  "System Dynamics",
  "A System Dynamics diagram shows the storages and flows of material in some system, and the factors that influence the rates of flow.",
  "systemDynamics",
  ["featured", "process"]
]);

arr.push([
  "sequentialFunction",
  "Sequential Function",
  "A sequence diagram that shows different node templates, LayeredDigraphLayout and in-place text editing.",
  "sequentialFunction",
  ["layereddigraphlayout", "process"]
]);

arr.push([
  "grafcet",
  "Grafcet Diagrams",
  "A Grafcet is a kind of sequential function chart used in automation design.",
  "grafcet",
  ["links", "tooltips", "tools", "buttons", "geometries", "process"]
]);

arr.push([
  "sequenceDiagram",
  "Sequence Diagram",
  "A sequence diagram illustrates how different processes interact with one-another and in what order.",
  "sequenceDiagram",
  ["links", "groups", "tools", "grid", "process"]
]);

arr.push([
  "logicCircuit",
  "Logic Circuit",
  "A functioning logic circuit diagram, which allows the user to make circuits using gates and wires.",
  "logicCircuit",
  ["featured", "tooltips", "palette", "grid", "process"]
]);

arr.push([
  "dataFlow",
  "Data Flow",
  "Show the processing steps involved in a database transformation or query, with labeled ports.",
  "dataFlow",
  ["tables", "layereddigraphlayout", "ports", "process"]
]);

arr.push([
  "dataFlowVertical",
  "Data Flow Vertical",
  "Same as Data Flow, but vertically oriented, and with slightly different styling.",
  "dataFlowVertical",
  ["tables", "layereddigraphlayout", "ports", "process"]
]);

// Ports
arr.push([
  "dynamicPorts",
  "Dynamic Ports",
  "Add ports to a selected node by clicking buttons or by using a context menu. Draw links by dragging between ports. If you select a link you can relink or reshape it.",
  "dynamicPorts",
  ["featured", "tables", "itemarrays", "links", "ports", "contextmenus", "buttons"]
]);

arr.push([
  "connectionBoxNode",
  "Connection Box",
  "A Node containing ports that allow linking between them, within the node as well as between nodes, with custom link validation.",
  "connectionBoxNode",
  ["tables", "itemarrays", "links", "ports"]
]);

arr.push([
  "selectablePorts",
  "Selectable Ports",
  "A Node with ports that can be selected and deleted.",
  "selectablePorts",
  ["itemarrays", "ports", "geometries"]
]);

// Charts
arr.push([
  "barCharts",
  "Bar Charts",
  "Simple bar charts or histograms within nodes.",
  "barCharts",
  ["tables", "itemarrays", "tooltips", "charts"]
]);

arr.push([
  "pieCharts",
  "Pie Charts",
  "Simple pie charts within nodes.",
  "pieCharts",
  ["itemarrays", "tooltips", "geometries", "charts"]
]);

arr.push([
  "dynamicPieChart",
  "Dynamic Pie Chart",
  "Dynamic pie chart with selectable slices that can change size.",
  "dynamicPieChart",
  ["tables", "itemarrays", "collections", "tooltips", "buttons", "geometries", "charts"]
]);

arr.push([
  "donutCharts",
  "Donut Charts",
  "Ring-shaped pie charts within nodes.",
  "donutCharts",
  ["itemarrays", "geometries", "charts"]
]);

arr.push([
  "candlestickCharts",
  "Candlestick Charts",
  "Simple candlestick or range charts within nodes.",
  "candlestickCharts",
  ["tables", "itemarrays", "geometries", "charts"]
]);

arr.push([
  "sparklineGraphs",
  "Sparkline Graphs",
  "Simple sparkline charts within nodes.",
  "sparklineGraphs",
  ["treelayout", "geometries", "charts"]
]);

// Gauges
arr.push([
  "thermometer",
  "Thermometer",
  "Graduated thermometer scales using Graduated Panel.",
  "thermometer",
  ["gauges", "geometries"]
]);

arr.push([
  "instrumentGauge",
  "Instrument Gauge",
  "A gauge using a scale made with a Graduated Panel.",
  "instrumentGauge",
  ["gauges", "geometries"]
]);

arr.push([
  "controlGauges",
  "Meter and Gauge Controls",
  "Various meters and gauges that show particular values and can be modified by the user by dragging.",
  "controlGauges",
  ["featured", "gauges", "geometries", "tools"]
]);

// HTML
arr.push([
  "contentAlign",
  "Content Alignment",
  "Showcases alignment properties of the Diagram.",
  "contentAlign",
  ["html"]
]);

arr.push([
  "htmlInteraction",
  "HTML Interaction",
  "Contains two draggable HTML elements (using jQuery UI). One of the two HTML elements houses a panel that interacts with the main Diagram.",
  "htmlInteraction",
  ["palette", "html", "inspector", "frameworks"]
]);

arr.push([
  "customTextEditingTool",
  "Custom Text Editor",
  "Demonstrates using a custom HTML element for in-place editing of a TextBlock.",
  "customTextEditingTool",
  ["html"]
]);

arr.push([
  "customContextMenu",
  "Context Menu",
  "Demonstrates the implementation of a custom HTML context menu.",
  "customContextMenu",
  ["contextmenus", "html"]
]);

arr.push([
  "canvases",
  "Charts in Nodes",
  "Shows how to render a data-driven chart within each Node using the Chart.js library.",
  "canvases",
  ["charts", "html", "frameworks"]
]);

arr.push([
  "dataVisualization",
  "Data Visualization",
  "A data-visualization demonstration that showcases GoJS interacting with other elements on the page.",
  "dataVisualization",
  ["tooltips", "html", "animation"]
]);

// Other
arr.push([
  "customAnimations",
  "Custom Animations",
  "Shows how to create several custom Node animations.",
  "customAnimations",
  ["animation"]
]);

arr.push([
  "animatedFocus",
  "Animated Scroll and Attention",
  "Aninmated focus by scrolling to a node along with animation of the size of the node to draw attention to it..",
  "animatedFocus",
  ["animation"]
]);

arr.push([
  "treeLoadAnimation",
  "Tree Load Animation",
  "Shows how to create a custom Diagram loading animation.",
  "treeLoadAnimation",
  ["animation"]
]);

arr.push([
  "leaflet",
  "GoJS and Leaflet Map",
  "A GoJS diagram atop a Leaflet.js map, with nodes placed at latitude and longitude based locations.",
  "leaflet",
  ["tooltips", "tools"]
]);

arr.push([
  "seatingChart",
  "Seating Chart",
  "This sample demonstrates custom logic in a GoJS diagram - a \"Person\" node can be dropped onto a \"Table\" node, causing the person to be assigned a position at the closest empty seat at that table.",
  "seatingChart",
  ["featured", "tools", "palette"]
]);

arr.push([
  "pipes",
  "Pipes",
  "Showcasing nodes (Pipes) that can be joined, and will snap and drag together.",
  "pipes",
  ["featured", "itemarrays", "collections", "contextmenus", "tools", "palette", "buttons", "geometries"]
]);

arr.push([
  "adornmentButtons",
  "Adornment Buttons",
  "Selected nodes show a row of buttons that execute commands or start tools.",
  "adornmentButtons",
  ["buttons", "geometries"]
]);

arr.push([
  "radialAdornment",
  "Radial Adornment Buttons",
  "An adornment showing buttons in a circle on one selected node.",
  "radialAdornment",
  ["buttons", "geometries"]
]);

arr.push([
  "timeline",
  "Timeline",
  "A simple timeline with events arranged along a line.",
  "timeline",
  ["tables", "itemarrays", "links", "customlayout"]
]);

arr.push([
  "ruleredDiagram",
  "Rulered Diagram",
  "A diagram with Graduated Panels at the edges acting as rulers.",
  "ruleredDiagram",
  ["geometries", "grid"]
]);

arr.push([
  "shopFloorMonitor",
  "Shop Floor Monitor",
  "Shows the continuously updating state of a number of stations on an imaginary shop floor.",
  "shopFloorMonitor",
  ["monitoring", "animation"]
]);

arr.push([
  "kittenMonitor",
  "Kitten Monitor",
  "A monitoring diagram where the nodes (kittens) move on a background image (a house plan), with tooltips describing kittens.",
  "kittenMonitor",
  ["tooltips", "monitoring", "animation"]
]);

arr.push([
  "spreadsheet",
  "Spreadsheet",
  "An example of nested Table Panels forming a spreadsheet-like grid.",
  "spreadsheet",
  ["tables", "itemarrays", "buttons", "geometries"]
]);

arr.push([
  "records",
  "Record Mapper",
  "Displays a variable number of fields for each record, with links mapping one field to another.",
  "records",
  ["featured", "tables", "itemarrays"]
]);

arr.push([
  "selectableFields",
  "Selectable Fields",
  "Records with fields that the user can select.",
  "selectableFields",
  ["tables", "itemarrays"]
]);

arr.push([
  "addRemoveColumns",
  "Add/Remove Table Columns",
  "Demonstrates adding and removing columns of a Table Panel.",
  "addRemoveColumns",
  ["tables", "itemarrays"]
]);

arr.push([
  "updateDemo",
  "Update Demo",
  "Showcases two Diagrams observing the same Model. Modifying positions in one Diagram will modify them in the model, updating the other Diagram as well.",
  "updateDemo",
  ["treelayout", "buttons", "html"]
]);

arr.push([
  "singlePage",
  "Single Page View",
  "Show a diagram on a sheet of paper, limiting dragging and resizing to stay within the page minus margins.",
  "singlePage",
  []
]);

arr.push([
  "absolute",
  "Absolute Positioning",
  "A diagram that does not scroll or zoom or allow parts to be dragged out of a fixed area.",
  "absolute",
  []
]);

arr.push([
  "magnifier",
  "Magnifier",
  "An Overview used as a magnifying glass.",
  "magnifier",
  ["tables", "treelayout", "overview"]
]);

arr.push([
  "comments",
  "Comments",
  "GoJS supports the notion of \"Comments\", including the ability to create balloon-like comments.",
  "comments",
  ["links", "treelayout", "geometries"]
]);

arr.push([
  "wordcloud",
  "Word Cloud",
  "A word cloud visualization using the PackedLayout extension.",
  "wordcloud",
  ["links", "treelayout", "geometries"]
]);

arr.push([
  "../extensionsJSM/PackedHierarchy",
  "Packed Hierarchy",
  "A customized PackedLayout that arranges nested circular groups.",
  "PackedHierarchy",
  ["customlayout", "extensions"]
]);

arr.push([
  "svgDataUrl",
  "SVG Data URL",
  "In makeSvg, replace image sources with Base64",
  "svgDataUrl",
  ["svg", "export"]
]);

arr.push([
  "tiger",
  "SVG Tiger",
  "Shows a tiger rendered in SVG without using a Picture",
  "tiger",
  ["geometries", "svg"]
]);

// EXTENSIONS
// Layouts
arr.push([
  "../extensions/Arranging",
  "Arranging Layout",
  "The Arranging layout is a layout of layouts, plus a third layout for arranging left-overs.",
  "Arranging",
  ["gridlayout", "customlayout", "extensions"]
]);

arr.push([
  "../extensions/Fishbone",
  "Fishbone Layout",
  "The Fishbone or Ishikawa layout is a tree layout for cause-and-effect relationships.",
  "Fishbone",
  ["collections", "links", "treelayout", "customlayout", "extensions"]
]);

arr.push([
  "../extensions/Parallel",
  "Parallel Layout",
  "A custom Layout that assumes there is a single 'split' and a single 'merge' node with parallel lines of nodes connecting them.",
  "Parallel",
  ["treelayout", "customlayout", "groups", "buttons", "extensions"]
]);

arr.push([
  "../extensions/Serpentine",
  "Serpentine Layout",
  "A custom Layout that positions a chain of nodes in rows of alternating direction.",
  "Serpentine",
  ["customlayout", "extensions"]
]);

arr.push([
  "../extensions/Spiral",
  "Spiral Layout",
  "A custom Layout that positions a chain of nodes in a spiral.",
  "Spiral",
  ["customlayout", "extensions"]
]);

arr.push([
  "../extensions/SwimLaneLayout",
  "Swim Lane Layout",
  "A custom Layout that puts nodes into swimlanes with dependencies that cross lanes.",
  "SwimLaneLayout",
  ["customlayout", "extensions"]
]);

arr.push([
  "../extensions/TreeMap",
  "Tree Map Layout",
  "A custom Layout that renders nested Groups into the viewport with each Node having an area proportional to its declared 'size'.",
  "TreeMap",
  ["collections", "customlayout", "groups", "tooltips", "extensions", "html"]
]);

arr.push([
  "../extensions/Table",
  "Table Layout",
  "A custom Layout that arranges Nodes just as a Table Panel arranges GraphObjects.",
  "Table",
  ["tables", "collections", "customlayout", "groups", "tools", "palette", "extensions"]
]);

arr.push([
  "../extensions/PackedLayout",
  "Packed Layout",
  "A custom Layout that positions nodes in a packed area.",
  "PackedLayout",
  ["customlayout", "extensions"]
]);

arr.push([
  "../extensions/PanelLayoutFlow",
  "Flow PanelLayout",
  "A custom PanelLayout that arranges panel elements into rows or columns.",
  "PanelLayoutFlow",
  ["customlayout", "extensions"]
]);

// Tools
arr.push([
  "../extensions/RealtimeDragSelecting",
  "Realtime Drag Selecting",
  "A custom Tool that lets a user drag and create a box to select nodes and links.",
  "realtimeDragSelecting",
  ["collections", "treelayout", "tools", "extensions"]]);

arr.push([
  "../extensions/DragCreating",
  "DragCreating",
  "A custom Tool that lets a user draw a box showing where and how large a new node should be.",
  "DragCreating",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/DragZooming",
  "Drag Zooming",
  "A custom Tool that lets a user draw a box showing what to zoom in to.",
  "DragZooming",
  ["treelayout", "tools", "extensions"]
]);

arr.push([
  "../extensions/ResizeMultiple",
  "Resize Multiple",
  "A custom ResizingTool that lets the user resize many selected objects at once.",
  "ResizeMultiple",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/RotateMultiple",
  "Rotate Multiple",
  "A custom RotatingTool that lets the user rotate many selected objects at once.",
  "RotateMultiple",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/SpotRotating",
  "Spot Rotating",
  "A custom RotatingTool that lets the user shift the rotation point.",
  "SpotRotating",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/Rescaling",
  "Rescaling",
  "A custom Tool that lets a user change the scale of an object.",
  "Rescaling",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/CurvedLinkReshaping",
  "Curved Link Reshaping",
  "A custom Tool that lets the user reshape curved links with a single handle.",
  "CurvedLinkReshaping",
  ["links", "tools", "buttons", "extensions"]
]);

arr.push([
  "../extensions/OrthogonalLinkReshaping",
  "Orthogonal Link Reshaping",
  "A custom Tool that lets the user reshape orthogonal links by dragging entire segments.",
  "OrthogonalLinkReshaping",
  ["links", "tools", "extensions", "geometries"]
]);

arr.push([
  "../extensions/OverviewResizing",
  "Overview Resizing",
  "A custom Tool which allows the user to resize the overview box.",
  "OverviewResizing",
  ["tools", "overview", "extensions"]
]);

arr.push([
  "../extensions/SnapLinkReshaping",
  "Snap Link Reshaping",
  "A custom Tool that allows reshaping links with grid snapping.",
  "SnapLinkReshaping",
  ["links", "tools", "palette", "extensions", "grid"]
]);

arr.push([
  "../extensions/GeometryReshaping",
  "Geometry Reshaping",
  "A custom Tool that supports interactive reshaping of Geometries.",
  "GeometryReshaping",
  ["tools", "extensions", "geometries"]
]);

arr.push([
  "../extensions/SectorReshaping",
  "Sector Reshaping",
  "A custom Tool that supports interactive reshaping of pie-shaped sectors of circles.",
  "SectorReshaping",
  ["tools", "extensions", "geometries"]
]);

arr.push([
  "../extensions/FreehandDrawing",
  "Freehand Drawing",
  "A custom Tool that lets the user interactively draw a line, converting it into a Shape.",
  "FreehandDrawing",
  ["tools", "extensions", "geometries"]
]);

arr.push([
  "../extensions/PolygonDrawing",
  "Polygon Drawing",
  "A custom Tool that lets the user interactively draw polygons and polyline Shapes.",
  "PolygonDrawing",
  ["tools", "extensions", "geometries"]
]);

arr.push([
  "../extensions/PolylineLinking",
  "Polyline Linking",
  "A custom LinkingTool that lets the user determine the route of a new Link by clicking.",
  "PolylineLinking",
  ["links", "tools", "extensions"]
]);

arr.push([
  "../extensions/LinkShifting",
  "Link Shifting",
  "A custom Tool that adds handles on Links to allow the user to shift the end point of the Link along the sides of the port without disconnecting it.",
  "LinkShifting",
  ["links", "tools", "extensions", "geometries"]
]);

arr.push([
  "../extensions/LinkLabelDragging",
  "Link Label Dragging",
  "A custom Tool that lets the user drag a label on a Link and that keeps its relative position to the link.",
  "LinkLabelDragging",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/LinkLabelOnPathDragging",
  "Link Label On Path Dragging",
  "A custom Tool that lets the user drag a label on a Link and that keeps the label along the path of the link.",
  "LinkLabelOnPathDragging",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/NodeLabelDragging",
  "Node Label Dragging",
  "A custom Tool that lets the user drag a label in a Spot Panel of a Node.",
  "NodeLabelDragging",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/NonRealtimeDragging",
  "Non Realtime Dragging",
  "A custom DraggingTool that lets the user drag a translucent image of the Nodes and Links to be moved, leaving them in place until the mouse up.",
  "NonRealtimeDragging",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/GuidedDragging",
  "Guided Dragging",
  "A custom DraggingTool that makes guidelines visible as a Part is dragged around a Diagram and is nearly aligned with another Part.",
  "GuidedDragging",
  ["tools", "extensions"]
]);

arr.push([
  "../extensions/PortShifting",
  "Port Shifting",
  "A custom Tool that lets the user drag a port in a Spot Panel of a Node.",
  "PortShifting",
  ["ports", "tooltips", "tools", "palette", "extensions", "grid"]
]);

arr.push([
  "../extensions/ColumnResizing",
  "Column Resizing",
  "Two custom Tools that let the user resize the width of columns or the height of rows in a Table Panel of a Node.",
  "ColumnResizing",
  ["tables", "itemarrays", "tools", "extensions", "geometries"]
]);

// Inspectors
arr.push([
  "../extensions/DataInspector",
  "Data Inspector",
  "A simple drop-in for inspecting and editing Part data.",
  "DataInspector",
  ["groups", "extensions", "inspector", "html"]
]);

// Other
arr.push([
  "../extensions/CheckBoxes",
  "Checkboxes",
  "Demonstrates simple uses of CheckBoxButtons.",
  "Checkboxes",
  ["tables", "itemarrays", "buttons", "extensions"]
]);

arr.push([
  "../extensions/Hyperlink",
  "Hyperlinks",
  "Demonstrates usage of the HyperlinkText extension.",
  "Hyperlink",
  ["extensions"]
]);

arr.push([
  "../extensions/TextEditor",
  "HTMLInfo Text Editor",
  "Demonstrates using an HTMLInfo that acts as a re-implementation of the default text editor.",
  "TextEditor",
  ["html", "extensions"]
]);

arr.push([
  "../extensions/ScrollingTable",
  "Scrolling Table",
  "Demonstrates a custom Table Panel with a scrollbar implemented in GoJS, including two AutoRepeatButtons.",
  "ScrollingTable",
  ["tables", "itemarrays", "buttons", "extensions"]
]);

arr.push([
  "twoHalves",
  "Two Halves",
  "Demonstrates a Node with a top half and a bottom half, with rounded corners.",
  "twoHalves",
  ["geometries"]
]);

arr.push([
  "../extensions/BalloonLink",
  "Balloon Links",
  "Demonstrates custom Links that create a \"Balloon\" around the fromNode.",
  "BalloonLink",
  ["links", "geometries", "extensions"]
]);

arr.push([
  "../extensions/ParallelRoute",
  "Parallel Route Links",
  "Demonstrates custom Links that route parallel to other Links between the same two ports.",
  "ParallelRoute",
  ["links", "geometries", "extensions"]
]);

arr.push([
  "../extensions/Dimensioning",
  "Dimensioning",
  "Demonstrates custom Links that show the distance between two points.",
  "Dimensioning",
  ["links", "extensions"]
]);

arr.push([
  "../extensions/DrawCommandHandler",
  "Drawing Commands",
  "Demonstrates custom CommandHandler which provides alignment commands and additional behaviors for the arrow keys.",
  "DrawCommandHandler",
  ["extensions"]
]);

arr.push([
  "../extensions/LocalStorageCommandHandler",
  "Local Storage Commands",
  "Demonstrates custom CommandHandler which uses localStorage as the repository for the clipboard, rather than an in-memory global variable, allowing for copying between tabs and windows.",
  "minimal",
  ["extensions", "storage"]
]);

arr.push([
  "../projects/storage/samples/GoCloudStorageManager",
  "Cloud Storage Manager",
  "Demonstrates dynamically choosing the user's cloud storage service (using the user's credentials) or localStorage.",
  "GoCloudStorageManager",
  ["extensions", "storage"]
]);

/*
arr.push([
  "../projects/storage/samples/GoDropBox",
  "DropBox Storage",
  "Demonstrates saving models in the user's DropBox storage.",
  "GoDropBox",
  ["extensions", "storage"]
]);

arr.push([
  "../projects/storage/samples/GoGoogleDrive",
  "Google Drive Storage",
  "Demonstrates saving models in the user's Google Drive storage.",
  "GoGoogleDrive",
  ["extensions", "storage"]
]);

arr.push([
  "../projects/storage/samples/GoOneDrive",
  "Microsoft One Drive Storage",
  "Demonstrates saving models in the user's OneDrive storage.",
  "GoOneDrive",
  ["extensions", "storage"]
]);

arr.push([
  "../projects/storage/samples/GoLocalStorage",
  "Local Web Storage",
  "Demonstrates saving models in the browser's limited localStorage.",
  "GoLocalStorage",
  ["extensions", "storage"]
]);
*/

arr.push([
  "../extensions/Robot",
  "Simulating Input",
  "Demonstrates use of the Robot class to simulate mouse events.",
  "robot",
  ["collections", "contextmenus", "palette", "buttons", "extensions", "html"]
]);

arr.push([
  "../extensions/ZoomSlider",
  "Zoom Slider",
  "Demonstrates use of the ZoomSlider class to zoom in/out using a control.",
  "zoomSlider",
  ["extensions", "html"]
]);

arr.push([
  "../projects/pdf/minimalPDF",
  "PDF generation",
  "Generating a PDF file holding all of the pages of a Diagram's rendering.",
  "minimal",
  ["export"]
]);

arr.push([
  "../projects/bpmn/BPMN",
  "BPMN Editor",
  "The start of a Business Process Model and Notation editor.",
  "BPMN",
  ["tables", "itemarrays", "collections", "customlayout", "groups", "tooltips", "contextmenus", "tools", "palette", "overview", "buttons", "geometries", "html", "frameworks"]
]);

arr.push([
  "../projects/floorplannerTS/floorplannerTSSample",
  "Floor Planner (TypeScript)",
  "A feature-rich editor for users to create robust, detailed floor plans.",
  "FloorPlannerTS",
  ["featured", "collections", "groups", "tooltips", "contextmenus", "tools", "palette", "overview", "buttons", "geometries", "grid", "html"]
]);

arr.push(["minimal",
  "Minimal",
  "Shows default Diagram interactivity and basic data binding. Select, move, copy, delete, undo, redo with keyboard or touch.",
  "minimal",
  []
]);

// Previously unlisted samples
arr.push([
  "minimalBlob",
  "Minimal Image Download",
  "Minimal, showing image Blob creation with Diagram.makeImageData, and download.",
  "minimal",
  ["export"]
]);

arr.push([
  "minimalSvg",
  "Minimal SVG Download",
  "Minimal, showing SVG creation with Diagram.makeSvg, and download.",
  "minimal",
  ["svg", "export"]
]);

arr.push([
  "vue",
  "Minimal Vue.js",
  "Minimal, using Vue.js.",
  "vue",
  ["frameworks"]
]);

arr.push([
  "spacingZoom",
  "Spacing Zoom",
  "When zooming, change the spacing of the Nodes, not the Diagram.scale.",
  "minimal",
  []
]);

arr.push([
  "gestureBehavior",
  "Gesture Behavior",
  "Shows different options for ToolManager's gestureBehavior.",
  "minimal",
  []
]);

arr.push([
  "pinchResizing",
  "Pinch Zooming",
  "Demonstrates customization of pinch-zooming to scale a node.",
  "minimal",
  ["tools"]
]);

arr.push([
  "hoverButtons",
  "Hover Buttons",
  "Shows buttons in an Adornment upon hover over a node.",
  "hoverButtons",
  ["buttons"]
]);

arr.push([
  "scrollModes",
  "Scroll Modes",
  "Shows infinite scrolling and positionComputation.",
  "scrollModes",
  ["grid"]
]);

arr.push([
  "customExpandCollapse",
  "Custom Expand and Collapse",
  "Shows how to create Buttons with custom behavior for expanding/collapsing of a graph.",
  "customExpandCollapse",
  ["layereddigraphlayout", "buttons"]
]);

arr.push([
  "constantSize",
  "Constant Size",
  "Kitten Monitor with constant size markers and tooltips when zooming out.",
  "kittenMonitor",
  ["tooltips"]
]);

arr.push([
  "virtualized",
  "Virtualized",
  "Virtualized no Layout, an example of virtualization where the model holds 123,456 node data yet the diagram only creates a few nodes at a time.",
  "virtualized",
  ["collections", "groups", "tooltips", "buttons", "performance"]
]);

arr.push([
  "virtualizedTree",
  "Virtualized Tree",
  "An example of virtualization where the model holds 123,456 node data yet the diagram only creates a few nodes at a time.",
  "virtualizedTree",
  ["treelayout", "tooltips", "performance"]
]);

arr.push([
  "virtualizedTreeLayout",
  "Virtualized TreeLayout",
  "Shows a virtualized TreeLayout with TreeModel.",
  "virtualizedTree",
  ["collections", "treelayout", "customlayout", "tooltips", "performance"]
]);

arr.push([
  "virtualizedForceLayout",
  "Virtualized ForceDirected Layout",
  "Shows a virtualized ForceDirectedLayout with GraphLinksModel.",
  "virtualizedForceLayout",
  ["collections", "forcedirectedlayout", "customlayout", "tooltips", "performance"]
]);

arr.push([
  "../extensionsJSM/VirtualizedPacked",
  "Virtualized Packed Layout",
  "A virtualized version of PackedLayout that positions nodes in a packed area.",
  "VirtualizedPacked",
  ["customlayout", "extensions", "performance"]
]);

arr.push([
  "flowBuilder",
  "Flow Builder",
  "Demonstrates a flow builder where nodes/links can be created or dropped onto a recycling node.",
  "flowBuilder",
  ["layereddigraphlayout", "contextmenus", "tools", "buttons"]
]);

arr.push([
  "flowgrammer",
  "Flowgrammer",
  "Demonstrates a flow-chart-like editor of a restricted syntax language.  Uses the ParallelLayout extension.",
  "flowgrammer",
  ["collections", "layereddigraphlayout", "palette", "overview"]
]);

arr.push([
  "network",
  "Network",
  "Shows a network configurator with a Palette and Overview.",
  "network",
  ["links", "palette", "overview"]
]);

arr.push([
  "stateChartIncremental",
  "Incremental State Chart",
  "State Chart using incremental JSON.",
  "stateChart",
  ["buttons", "html"]
]);

arr.push([
  "regroupingTreeView",
  "Regrouping Tree View",
  "Regrouping with tree view of grouping hierarchy.",
  "regrouping",
  ["collections", "gridlayout", "treelayout", "groups", "buttons"]
]);

arr.push([
  "dragOutFields",
  "Drag Out Fields",
  "Drag out fields from record Nodes to an HTML element.",
  "records",
  ["tables", "itemarrays", "collections", "tools", "html"]
]);

arr.push([
  "dragDropFields",
  "Drag and Drop Fields",
  "Drag and drop fields from/to record Nodes.",
  "records",
  ["tables", "itemarrays", "collections", "tools"]
]);

arr.push([
  "twoDiagrams",
  "Two Diagrams",
  "Demonstrates drag and drop between two different diagrams using a shared UndoManager.",
  "minimal",
  ["html"]
]);

arr.push([
  "htmlDragDrop",
  "HTML Drag and Drop",
  "Demonstrates dragging and dropping from HTML, and pasting from the external clipboard.",
  "htmlDragDrop",
  ["palette", "html"]
]);

arr.push([
  "macros",
  "Macros",
  "Demonstrates an automatic ungrouping of nodes when dropping an element on the diagram.",
  "macros",
  ["groups", "palette"]
]);

arr.push([
  "addToPalette",
  "Adding Nodes to the Palette",
  "Select and edit a node and add a copy of it to the palette.",
  "addToPalette",
  ["palette", "overview"]
]);

arr.push([
  "dragUnoccupied",
  "Drag Unoccupied",
  "Demonstrates a function to avoid any overlapping of nodes during dragging.",
  "dragUnoccupied",
  []
]);

arr.push([
  "htmlLightBoxContextMenu",
  "HTML LightBox Context Menu",
  "Shows a LightBox style HTML Context Menu.",
  "htmlLightBoxContextMenu",
  ["contextmenus", "html"]
]);

arr.push([
  "panelLayout",
  "Panel Layout",
  "Shows how to create a custom PaneLayout.",
  "minimal",
  []
]);

arr.push([
  "gameOfLife",
  "Game of Life",
  "A cellular automation simulation.",
  "gameOfLife",
  []
]);

arr.push([
  "belts",
  "Belts and Rollers",
  "Show continuous belts winding by circular rollers",
  "belts",
  ["animation", "geometries"]
])
