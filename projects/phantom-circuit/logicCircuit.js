// Example of (server-side or headless) image creation using PhantomJS
// PhantomJS can be found at: http://phantomjs.org/

// Our page will contain nothing but a div tag and an img tag.
// We will create our Diagram on the div and use Diagram.makeImageData to give the img a source.
// Then we will render only the image created.
var page = require('webpage').create();

page.onConsoleMessage = function(msg) {  // show console messages from WebKit
  console.log('--- ' + msg);
};

page.content = '<html><body style="margin:0px"><div id="myDiagram"></div><img id="myImg" /></body></html>';

// We include go.js before acting on our page, assuming it is in the same directory
page.injectJs('./node_modules/gojs/release/go.js');

page.onLoadFinished = function(status) {
  page.evaluate(function() {
    // GoJS and the skeleton page are loaded, now we set up a diagram and make the image we want

    // This example GoJS code is taken from the logicCircuit.html sample.
    // Note that much of the interactivity customizations have been excised:
    // tools, tooltips, palette, undo, the Save and Load buttons and model textarea,
    // and continuous updating of the state.

    var red = "orangered";  // 0 or false
    var green = "forestgreen";  // 1 or true

    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagram",  // create a new Diagram in the HTML DIV element "myDiagram"
        {
          initialContentAlignment: go.Spot.Center,
          hasHorizontalScrollbar: false,
          hasVerticalScrollbar: false
        });

    // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths
    myDiagram.linkTemplate =
      $(go.Link,
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 3,
          relinkableFrom: true, relinkableTo: true,
          selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.
          shadowOffset: new go.Point(0, 0), shadowBlur: 5, shadowColor: "blue",
        },
        new go.Binding("isShadowed", "isSelected").ofObject(),
        $(go.Shape,
          { name: "SHAPE", strokeWidth: 2, stroke: red }));

    // define some common property settings
    function nodeStyle() {
      return [new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
              new go.Binding("isShadowed", "isSelected").ofObject(),
              {
                selectionAdorned: false,
                shadowOffset: new go.Point(0, 0),
                shadowBlur: 15,
                shadowColor: "blue"
              }];
    }

    function shapeStyle() {
      return {
        name: "NODESHAPE",
        fill: "lightgray",
        stroke: "darkslategray",
        desiredSize: new go.Size(40, 40),
        strokeWidth: 2
      };
    }

    function portStyle(input) {
      return {
        desiredSize: new go.Size(6, 6),
        fill: "black",
        fromSpot: go.Spot.Right,
        fromLinkable: !input,
        toSpot: go.Spot.Left,
        toLinkable: input,
        toMaxLinks: 1,
        cursor: "pointer"
      };
    }

    // define templates for each type of node
    var inputTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Circle", shapeStyle(),
          { fill: red }),  // override the default fill (from shapeStyle()) to be red
        $(go.Shape, "Rectangle", portStyle(false),  // the only port
          { portId: "", alignment: new go.Spot(1, 0.5) }),
        { // if double-clicked, an input node will change its value, represented by the color.
          doubleClick: function(e, obj) {
            e.diagram.startTransaction("Toggle Input");
            var shp = obj.findObject("NODESHAPE");
            shp.fill = (shp.fill === green) ? red : green;
            updateStates();
            e.diagram.commitTransaction("Toggle Input");
          }
        }
      );

    var outputTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle(),
          { fill: green }),  // override the default fill (from shapeStyle()) to be green
        $(go.Shape, "Rectangle", portStyle(true),  // the only port
          { portId: "", alignment: new go.Spot(0, 0.5) })
      );

    var andTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "AndGate", shapeStyle()),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in1", alignment: new go.Spot(0, 0.3) }),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in2", alignment: new go.Spot(0, 0.7) }),
        $(go.Shape, "Rectangle", portStyle(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) })
      );

    var orTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "OrGate", shapeStyle()),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
        $(go.Shape, "Rectangle", portStyle(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) })
      );

    var xorTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "XorGate", shapeStyle()),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
        $(go.Shape, "Rectangle", portStyle(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) })
      );

    var norTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "NorGate", shapeStyle()),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
        $(go.Shape, "Rectangle", portStyle(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) })
      );

    var xnorTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "XnorGate", shapeStyle()),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
        $(go.Shape, "Rectangle", portStyle(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) })
      );

    var nandTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "NandGate", shapeStyle()),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in1", alignment: new go.Spot(0, 0.3) }),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in2", alignment: new go.Spot(0, 0.7) }),
        $(go.Shape, "Rectangle", portStyle(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) })
      );

    var notTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Inverter", shapeStyle()),
        $(go.Shape, "Rectangle", portStyle(true),
          { portId: "in", alignment: new go.Spot(0, 0.5) }),
        $(go.Shape, "Rectangle", portStyle(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) })
      );

    // add the templates created above to myDiagram and palette
    myDiagram.nodeTemplateMap.add("input", inputTemplate);
    myDiagram.nodeTemplateMap.add("output", outputTemplate);
    myDiagram.nodeTemplateMap.add("and", andTemplate);
    myDiagram.nodeTemplateMap.add("or", orTemplate);
    myDiagram.nodeTemplateMap.add("xor", xorTemplate);
    myDiagram.nodeTemplateMap.add("not", notTemplate);
    myDiagram.nodeTemplateMap.add("nand", nandTemplate);
    myDiagram.nodeTemplateMap.add("nor", norTemplate);
    myDiagram.nodeTemplateMap.add("xnor", xnorTemplate);

    // load the initial diagram directly from a string
    myDiagram.model = go.Model.fromJson('\
{ "class": "go.GraphLinksModel",\
  "linkFromPortIdProperty": "fromPort",\
  "linkToPortIdProperty": "toPort",\
  "nodeDataArray": [\
{"category":"input", "key":"input1", "loc":"-150 -80" },\
{"category":"or", "key":"or1", "loc":"-70 0" },\
{"category":"not", "key":"not1", "loc":"10 0" },\
{"category":"xor", "key":"xor1", "loc":"100 0" },\
{"category":"or", "key":"or2", "loc":"200 0" },\
{"category":"output", "key":"output1", "loc":"200 -100" }\
  ],\
  "linkDataArray": [\
{"from":"input1", "fromPort":"out", "to":"or1", "toPort":"in1"},\
{"from":"or1", "fromPort":"out", "to":"not1", "toPort":"in"},\
{"from":"not1", "fromPort":"out", "to":"or1", "toPort":"in2"},\
{"from":"not1", "fromPort":"out", "to":"xor1", "toPort":"in1"},\
{"from":"xor1", "fromPort":"out", "to":"or2", "toPort":"in1"},\
{"from":"or2", "fromPort":"out", "to":"xor1", "toPort":"in2"},\
{"from":"xor1", "fromPort":"out", "to":"output1", "toPort":""}\
  ]}');

    // update the diagram only once
    updateStates();

    // update the value and appearance of each node according to its type and input values
    function updateStates() {
      var oldskip = myDiagram.skipsUndoManager;
      myDiagram.skipsUndoManager = true;
      // do all "input" nodes first
      myDiagram.nodes.each(function(node) {
        if (node.category === "input") {
          doInput(node);
        }
      });
      // now we can do all other kinds of nodes
      myDiagram.nodes.each(function(node) {
        switch (node.category) {
          case "and": doAnd(node); break;
          case "or": doOr(node); break;
          case "xor": doXor(node); break;
          case "not": doNot(node); break;
          case "nand": doNand(node); break;
          case "nor": doNor(node); break;
          case "xnor": doXnor(node); break;
          case "output": doOutput(node); break;
          case "input": break;  // doInput already called, above
        }
      });
      myDiagram.skipsUndoManager = oldskip;
    }

    // helper predicate
    function linkIsTrue(link) {  // assume the given Link has a Shape named "SHAPE"
      return link.findObject("SHAPE").stroke === green;
    }

    // helper function for propagating results
    function setOutputLinks(node, color) {
      node.findLinksOutOf().each(function(link) { link.findObject("SHAPE").stroke = color; });
    }

    // update nodes by the specific function for its type
    // determine the color of links coming out of this node based on those coming in and node type

    function doInput(node) {
      // the output is just the node's Shape.fill
      setOutputLinks(node, node.findObject("NODESHAPE").fill);
    }

    function doAnd(node) {
      var color = node.findLinksInto().all(linkIsTrue) ? green : red;
      setOutputLinks(node, color);
    }
    function doNand(node) {
      var color = !node.findLinksInto().all(linkIsTrue) ? green : red;
      setOutputLinks(node, color);
    }
    function doNot(node) {
      var color = !node.findLinksInto().all(linkIsTrue) ? green : red;
      setOutputLinks(node, color);
    }

    function doOr(node) {
      var color = node.findLinksInto().any(linkIsTrue) ? green : red;
      setOutputLinks(node, color);
    }
    function doNor(node) {
      var color = !node.findLinksInto().any(linkIsTrue) ? green : red;
      setOutputLinks(node, color);
    }

    function doXor(node) {
      var truecount = 0;
      node.findLinksInto().each(function(link) { if (linkIsTrue(link)) truecount++; });
      var color = truecount % 2 === 0 ? green : red;
      setOutputLinks(node, color);
    }
    function doXnor(node) {
      var truecount = 0;
      node.findLinksInto().each(function(link) { if (linkIsTrue(link)) truecount++; });
      var color = truecount % 2 !== 0 ? green : red;
      setOutputLinks(node, color);
    }

    function doOutput(node) {
      // assume there is just one input link
      // we just need to update the node's Shape.fill
      node.linksConnected.each(function(link) { node.findObject("NODESHAPE").fill = link.findObject("SHAPE").stroke; });
    }
    // end of code from logicCircuit.html sample
    
    var img = document.getElementById('myImg');
    img.src = myDiagram.makeImageData({
      scale: 1,
      // PhantomJS tends to handle transparency poorly in the images it renders,
      // so we prefer to use a white background:
      background: "white"
    })
  });  // end onLoadFinished

  // We want to ensure that the image is done loading before we render
  setInterval(function() {
    var imgComplete = page.evaluate(function() {
      return document.getElementById('myImg').complete;
    });

    if (imgComplete) {
      // PhantomJS renders the entire page, and we just want to output the <img>,
      // so we must clip to its bounding rect:
      var clipRect = page.evaluate(function() {
        return document.getElementById('myImg').getBoundingClientRect();
      });
      page.clipRect = {
        top: clipRect.top,
        left: clipRect.left,
        width: clipRect.width,
        height: clipRect.height
      }
      page.render('logicCircuit.png');
      phantom.exit();
    }
  }, 100);
};
