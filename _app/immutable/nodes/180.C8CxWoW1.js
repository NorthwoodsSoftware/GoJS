import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Logic Circuit Diagram with Simple Simulation`,titleShort:`Logic Circuit`,indexDescription:`A functioning logic circuit diagram, which allows the user to make circuits using gates and wires.`,screenshot:`logiccircuit`,priority:1,tags:[`tooltips`,`palette`,`grid`,`process`],description:`A simple logic circuit editor and simulator.`},htmlContent:`<div style="width: 100%; display: flex; justify-content: space-between">\r
    <div\r
      id="palette"\r
      style="\r
        width: 100px;\r
        height: 600px;\r
        margin-right: 2px;\r
        background-color: #f3f4f6;\r
        border: solid 1px black;\r
      "></div>\r
    <div id="myDiagramDiv" style="background-color: #f3f4f6; flex-grow: 1; height: 600px; border: solid 1px black"></div>\r
  </div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 200px">\r
{ "class": "GraphLinksModel",\r
  "linkFromPortIdProperty": "fromPort",\r
  "linkToPortIdProperty": "toPort",\r
  "nodeDataArray": [\r
{"category":"xor","key":-1,"loc":"-210 -870"},\r
{"category":"xor","key":-2,"loc":"-120 -900"},\r
{"category":"and","key":-3,"loc":"-150 -810"},\r
{"category":"and","key":-4,"loc":"-150 -730"},\r
{"category":"switch","isOn":true,"key":-5,"loc":"-330 -880"},\r
{"category":"switch","isOn":true,"key":-6,"loc":"-330 -720"},\r
{"category":"or","key":-7,"loc":"-80 -770"},\r
{"category":"or","key":-8,"loc":"60 -550"},\r
{"category":"switch","isOn":true,"key":-9,"loc":"-230 -500"},\r
{"category":"switch","isOn":true,"key":-10,"loc":"-230 -690"},\r
{"category":"and","key":-11,"loc":"-10 -510"},\r
{"category":"and","key":-12,"loc":"-10 -590"},\r
{"category":"xor","key":-13,"loc":"60 -640"},\r
{"category":"xor","key":-14,"loc":"-150 -650"},\r
{"category":"or","key":-15,"loc":"230 -400"},\r
{"category":"switch","isOn":true,"key":-16,"loc":"-230 -400"},\r
{"category":"switch","isOn":true,"key":-17,"loc":"-230 -450"},\r
{"category":"and","key":-18,"loc":"-10 -390"},\r
{"category":"and","key":-19,"loc":"160 -430"},\r
{"category":"xor","key":-20,"loc":"160 -510"},\r
{"category":"xor","key":-21,"loc":"60 -440"},\r
{"category":"output","key":-22,"loc":"40 -960","isOn":true},\r
{"category":"output","key":-23,"loc":"90 -960","isOn":true},\r
{"category":"output","key":-24,"loc":"140 -960","isOn":false},\r
{"category":"output","key":-25,"loc":"-10 -960","isOn":true},\r
{"category":"switch","isOn":true,"key":-26,"loc":"-430 -680"},\r
{"category":"switch","isOn":true,"key":-27,"loc":"-430 -650"},\r
{"category":"switch","isOn":true,"key":-28,"loc":"-430 -620"},\r
{"category":"switch","isOn":true,"key":-29,"loc":"-430 -530"},\r
{"category":"switch","isOn":true,"key":-30,"loc":"-430 -500"},\r
{"category":"switch","isOn":true,"key":-31,"loc":"-430 -470"},\r
{"category":"input","isOn":true,"key":-32,"loc":"-520 -650"},\r
{"category":"input","isOn":true,"key":-33,"loc":"-520 -500"},\r
{"category":"input","isOn":false,"key":-34,"loc":"-520 -800"}\r
],\r
  "linkDataArray": [\r
{"from":-5,"to":-1,"fromPort":"out","toPort":"in1","points":[-307.5,-880,-297.5,-880,-280.04,-880,-280.04,-880,-234.58,-880,-224.58,-880]},\r
{"from":-6,"to":-1,"fromPort":"out","toPort":"in2","points":[-307.5,-720,-297.5,-720,-275.8650862905213,-720,-275.8650862905213,-860,-234.58,-860,-224.58,-860]},\r
{"from":-1,"to":-2,"fromPort":"out","toPort":"in2","points":[-189.5,-870,-179.5,-870,-177.2874653558896,-870,-177.2874653558896,-890,-144.58,-890,-134.58,-890]},\r
{"from":-1,"to":-3,"fromPort":"out","toPort":"in1","points":[-189.5,-870,-179.5,-870,-177.58820721908566,-870,-177.58820721908566,-820,-183,-820,-173,-820]},\r
{"from":-6,"to":-4,"fromPort":"out","toPort":"in2","points":[-307.5,-720,-297.5,-720,-234.25,-720,-234.25,-720,-183,-720,-173,-720]},\r
{"from":-3,"to":-7,"fromPort":"out","toPort":"in1","points":[-127,-810,-117,-810,-112.89,-810,-112.89,-780,-108.78,-780,-98.78,-780]},\r
{"from":-4,"to":-7,"fromPort":"out","toPort":"in2","points":[-127,-730,-117,-730,-112.89,-730,-112.89,-760,-108.78,-760,-98.78,-760]},\r
{"from":-9,"to":-11,"fromPort":"out","toPort":"in2","points":[-207.5,-500,-197.5,-500,-179.7643563068775,-500,-179.7643563068775,-500,-43,-500,-33,-500]},\r
{"from":-11,"to":-8,"fromPort":"out","toPort":"in2","points":[13,-510,23,-510,28.39911648605326,-510,28.39911648605326,-540,31.22,-540,41.22,-540]},\r
{"from":-12,"to":-8,"fromPort":"out","toPort":"in1","points":[13,-590,23,-590,28.462564136516566,-590,28.462564136516566,-560,31.22,-560,41.22,-560]},\r
{"from":-10,"to":-14,"fromPort":"out","toPort":"in1","points":[-207.5,-690,-197.5,-690,-179.91225278010745,-690,-179.91225278010745,-660,-174.58,-660,-164.58,-660]},\r
{"from":-9,"to":-14,"fromPort":"out","toPort":"in2","points":[-207.5,-500,-197.5,-500,-179.6604290554186,-500,-179.6604290554186,-640,-174.58,-640,-164.58,-640]},\r
{"from":-14,"to":-13,"fromPort":"out","toPort":"in1","points":[-129.5,-650,-119.5,-650,-47.04,-650,-47.04,-650,35.42,-650,45.42,-650]},\r
{"from":-14,"to":-12,"fromPort":"out","toPort":"in1","points":[-129.5,-650,-119.5,-650,-42.41809671174902,-650,-42.41809671174902,-600,-43,-600,-33,-600]},\r
{"from":-7,"to":-13,"fromPort":"out","toPort":"in2","points":[-59.5,-770,-49.5,-770,-25.941227682576745,-770,-25.941227682576745,-630,35.42,-630,45.42,-630]},\r
{"from":-7,"to":-12,"fromPort":"out","toPort":"in2","points":[-59.5,-770,-49.5,-770,-52.404614822261685,-770,-52.404614822261685,-580,-43,-580,-33,-580]},\r
{"from":-16,"to":-18,"fromPort":"out","toPort":"in2","points":[-207.5,-400,-197.5,-400,-100.16135474889069,-400,-100.16135474889069,-380,-43,-380,-33,-380]},\r
{"from":-18,"to":-15,"fromPort":"out","toPort":"in2","points":[13,-390,23,-390,127.11,-390,127.11,-390,201.22,-390,211.22,-390]},\r
{"from":-19,"to":-15,"fromPort":"out","toPort":"in1","points":[183,-430,193,-430,191.39010469700875,-430,191.39010469700875,-410,201.22,-410,211.22,-410]},\r
{"from":-17,"to":-21,"fromPort":"out","toPort":"in1","points":[-207.5,-450,-197.5,-450,-20.04,-450,-20.04,-450,35.42,-450,45.42,-450]},\r
{"from":-16,"to":-21,"fromPort":"out","toPort":"in2","points":[-207.5,-400,-197.5,-400,-100.09531642451535,-400,-100.09531642451535,-430,35.42,-430,45.42,-430]},\r
{"from":-21,"to":-20,"fromPort":"out","toPort":"in1","points":[80.5,-440,90.5,-440,99.61149109468168,-440,99.61149109468168,-520,135.42,-520,145.42,-520]},\r
{"from":-21,"to":-19,"fromPort":"out","toPort":"in1","points":[80.5,-440,90.5,-440,98.75,-440,98.75,-440,127,-440,137,-440]},\r
{"from":-8,"to":-20,"fromPort":"out","toPort":"in2","points":[80.5,-550,90.5,-550,130.01322353171253,-550,130.01322353171253,-500,135.42,-500,145.42,-500]},\r
{"from":-8,"to":-19,"fromPort":"out","toPort":"in2","points":[80.5,-550,90.5,-550,117.28941911474058,-550,117.28941911474058,-420,127,-420,137,-420]},\r
{"from":-2,"to":-24,"fromPort":"out","toPort":"","points":[-99.5,-900,-89.5,-900,140,-900,140,-925.8000000000001,140,-925.8000000000001,140,-935.8000000000001]},\r
{"from":-13,"to":-23,"fromPort":"out","toPort":"","points":[80.5,-640,90.5,-640,90,-640,90,-925.8000000000001,90,-925.8000000000001,90,-935.8000000000001]},\r
{"from":-20,"to":-22,"fromPort":"out","toPort":"","points":[180.5,-510,190.5,-510,190.5,-731.9000000000001,40,-731.9000000000001,40,-925.8000000000001,40,-935.8000000000001]},\r
{"from":-15,"to":-25,"fromPort":"out","toPort":"","points":[250.5,-400,260.5,-400,260.5,-666.9000000000001,-10,-666.9000000000001,-10,-925.8000000000001,-10,-935.8000000000001]},\r
{"from":-32,"to":-26,"fromPort":"","toPort":"in","points":[-500.3125,-650,-490.3125,-650,-477.40625,-650,-477.40625,-680,-462.5,-680,-452.5,-680]},\r
{"from":-32,"to":-27,"fromPort":"","toPort":"in","points":[-500.3125,-650,-490.3125,-650,-477.40625,-650,-477.40625,-650,-462.5,-650,-452.5,-650]},\r
{"from":-32,"to":-28,"fromPort":"","toPort":"in","points":[-500.3125,-650,-490.3125,-650,-477.40625,-650,-477.40625,-620,-462.5,-620,-452.5,-620]},\r
{"from":-33,"to":-29,"fromPort":"","toPort":"in","points":[-500.3125,-500,-490.3125,-500,-477.40625,-500,-477.40625,-530,-462.5,-530,-452.5,-530]},\r
{"from":-33,"to":-30,"fromPort":"","toPort":"in","points":[-500.3125,-500,-490.3125,-500,-477.40625,-500,-477.40625,-500,-462.5,-500,-452.5,-500]},\r
{"from":-33,"to":-31,"fromPort":"","toPort":"in","points":[-500.3125,-500,-490.3125,-500,-477.40625,-500,-477.40625,-470,-462.5,-470,-452.5,-470]},\r
{"from":-26,"to":-5,"fromPort":"out","toPort":"in","points":[-407.5,-680,-397.5,-680,-385,-680,-385,-880,-362.5,-880,-352.5,-880]},\r
{"from":-29,"to":-6,"fromPort":"out","toPort":"in","points":[-407.5,-530,-397.5,-530,-375,-530,-375,-720,-362.5,-720,-352.5,-720]},\r
{"from":-34,"to":-3,"fromPort":"","toPort":"in2","points":[-500.3125,-800,-490.3125,-800,-316.65625,-800,-316.65625,-800,-183,-800,-173,-800]},\r
{"from":-27,"to":-10,"fromPort":"out","toPort":"in","points":[-407.5,-650,-397.5,-650,-300.1347886532465,-650,-300.1347886532465,-690,-262.5,-690,-252.5,-690]},\r
{"from":-30,"to":-9,"fromPort":"out","toPort":"in","points":[-407.5,-500,-397.5,-500,-326.35678231764655,-500,-326.35678231764655,-500,-262.5,-500,-252.5,-500]},\r
{"from":-28,"to":-17,"fromPort":"out","toPort":"in","points":[-407.5,-620,-397.5,-620,-299.7719252242147,-620,-299.7719252242147,-450,-262.5,-450,-252.5,-450]},\r
{"from":-31,"to":-16,"fromPort":"out","toPort":"in","points":[-407.5,-470,-397.5,-470,-324.6448525201331,-470,-324.6448525201331,-400,-262.5,-400,-252.5,-400]},\r
{"from":-10,"to":-11,"fromPort":"out","toPort":"in1","points":[-207.5,-690,-197.5,-690,-85.75108112090732,-690,-85.75108112090732,-520,-43,-520,-33,-520]},\r
{"from":-17,"to":-18,"fromPort":"out","toPort":"in1","points":[-207.5,-450,-197.5,-450,-60.6494063519714,-450,-60.6494063519714,-400,-43,-400,-33,-400]},\r
{"from":-5,"to":-4,"fromPort":"out","toPort":"in1","points":[-307.5,-880,-297.5,-880,-250.5495083496439,-880,-250.5495083496439,-740,-183,-740,-173,-740]},\r
{"from":-34,"to":-2,"fromPort":"","toPort":"in1","points":[-500.3125,-800,-490.3125,-800,-405.2145817859016,-800,-405.2145817859016,-910,-144.58,-910,-134.58,-910]}\r
]}\r
    </textarea>\r
  </div>`,jsCode:`const red = '#b91c1c';\r
  const red2 = '#fca5a5';\r
  const green = '#15803d';\r
  const green2 = '#86efac';\r
\r
  const gray = '#cbd5e1';\r
  const darkGray = '#334155';\r
\r
  const CELLSIZE = 10;\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'draggingTool.isGridSnapEnabled': true, // dragged nodes will snap to a grid of 10x10 cells\r
      linkReshapingTool: new OrthogonalLinkReshapingTool(),\r
      'grid.gridCellSize': new go.Size(CELLSIZE, CELLSIZE),\r
      'undoManager.isEnabled': true,\r
      'grid.visible': true,\r
      initialAutoScale: go.AutoScale.Uniform\r
    });\r
\r
    // Enables the polyline linking tool to manually add link points\r
    myDiagram.toolManager.linkingTool = new PolylineLinkingTool();\r
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Routing.Orthogonal;\r
\r
    // when the document is modified, add a "*" to the title and enable the "Save" button\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
    });\r
\r
    // create a new Palette in the HTML DIV element "palette"\r
    const palette = new go.Palette('palette', {\r
      layout: new go.GridLayout({\r
        wrappingColumn: 1,\r
        spacing: new go.Size(0, 20)\r
      }),\r
    });\r
\r
    // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths\r
    myDiagram.linkTemplate = new go.Link({\r
      routing: go.Routing.Orthogonal,\r
      adjusting: go.LinkAdjusting.End, // Allows nodes to be dragged while keeping most link points\r
      curve: go.Curve.JumpOver,\r
      corner: 3,\r
      reshapable: true,\r
      relinkableFrom: true,\r
      relinkableTo: true,\r
      selectionAdorned: false, // Links are not adorned when selected so that their color remains visible\r
      shadowOffset: new go.Point(0, 0),\r
      shadowBlur: 5,\r
      shadowColor: 'blue',\r
      layerName: 'Background'\r
    })\r
      .bindTwoWay('points') // Saves link points to model data\r
      .bindObject('isShadowed', 'isSelected')\r
      .add(new go.Shape({ name: 'SHAPE', strokeWidth: 2, stroke: red }));\r
\r
    // node template helpers\r
    const sharedToolTip =\r
      go.GraphObject.build('ToolTip', { 'Border.figure': 'RoundedRectangle' })\r
        .add(\r
          new go.TextBlock({ margin: 2 })\r
            .bind('text', '', d => d.category)\r
        );\r
\r
    // define some common property settings\r
    function nodeStyle() {\r
      return {\r
        locationSpot: go.Spot.Center,\r
        selectionAdorned: false,\r
        shadowOffset: new go.Point(0, 0),\r
        shadowBlur: 15,\r
        shadowColor: 'blue',\r
        toolTip: sharedToolTip\r
      };\r
    }\r
\r
    function applyNodeBindings(node) {\r
      node.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);\r
      node.bindObject('isShadowed', 'isSelected');\r
      return node;\r
    }\r
\r
    function shapeStyle() {\r
      return {\r
        name: 'NODESHAPE',\r
        fill: gray,\r
        stroke: darkGray,\r
        desiredSize: new go.Size(40, 40),\r
        strokeWidth: 2\r
      };\r
    }\r
\r
    function portStyle(input, spot) {\r
      return {\r
        figure: 'Rectangle',\r
        desiredSize: new go.Size(4, 4),\r
        fill: darkGray,\r
        stroke: 'transparent',\r
        strokeWidth: 6,\r
        fromLinkable: !input,\r
        fromSpot: spot ?? new go.Spot(1, 0.5, -3, 0),\r
        toSpot: spot ?? new go.Spot(0, 0.5, 3, 0),\r
        toLinkable: input,\r
        toMaxLinks: 1,\r
        cursor: 'pointer'\r
      };\r
    }\r
\r
    // define templates for each type of node\r
\r
    const inputTemplate = new go.Node('Spot', nodeStyle())\r
      .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
      .set({\r
        cursor: 'pointer',\r
        margin: new go.Margin(-15, 0, 0, 0),\r
        click: (e, obj) => {\r
          if (e.diagram instanceof go.Palette) return;\r
          e.diagram.startTransaction('Toggle Input');\r
\r
          const isOn = !obj.data.isOn;\r
          myDiagram.model.set(obj.data, 'isOn', isOn);\r
\r
          updateStates();\r
          e.diagram.commitTransaction('Toggle Input');\r
        },\r
        mouseEnter: (e, obj) => {\r
          while (obj.part && obj.part !== obj) obj = obj.part;\r
          e.diagram.commit(diag => {\r
            obj.isShadowed = true;\r
          })\r
        },\r
        mouseLeave: (e, obj) => {\r
          while (obj.part && obj.part !== obj) obj = obj.part;\r
          e.diagram.commit(diag => {\r
            obj.isShadowed = false;\r
          })\r
        }\r
      })\r
      .add(\r
        new go.Shape(shapeStyle())\r
          .set({\r
            fill: go.Brush.lighten(green),\r
            margin: 3,\r
            strokeWidth: 1.5,\r
            desiredSize: new go.Size(NaN, NaN),\r
            scale: 1.75,\r
            geometry: go.Geometry.parse('F M19.5 3 L19.875 3 C20.4963 3 21 3.5037000000000003 21 4.125 L21 6.375 C21 6.9963 20.4963 7.5 19.875 7.5 L19.5 7.5 M2.25 10.5 L17.25 10.5 C18.4926 10.5 19.5 9.4926 19.5 8.25 L19.5 2.25 C19.5 1.0073600000000003 18.4926 0 17.25 0 L2.25 0 C1.0073599999999998 0 0 1.0073600000000003 0 2.25 L0 8.25 C0 9.4926 1.0073599999999998 10.5 2.25 10.5z', true)\r
          })\r
            .bind('fill', 'isOn', isOn => go.Brush.lighten(isOn ? green : red)),\r
        new go.Shape('BpmnEventError', {\r
          alignment: new go.Spot(0.5, 0.5, -1, 0),\r
          width: 18,\r
          height: 10,\r
          fill: green2,\r
          strokeWidth: 0\r
        })\r
          .bind('fill', 'isOn', isOn => isOn ? green2 : red2),\r
        new go.Shape(portStyle(false)) // the only port\r
          .set({\r
            opacity: 0,\r
            portId: '',\r
            alignment: new go.Spot(1, 0.5, -2, 0)\r
          })\r
      );\r
\r
    const switchTemplate = new go.Node('Spot', nodeStyle())\r
      .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
      .set({\r
        isShadowed: true,\r
        margin: new go.Margin(-35, 0, 0, 0),\r
        mouseEnter: (e, obj) => {\r
          while (obj.part && obj !== obj.part) obj = obj.part;\r
          e.diagram.commit(diag => {\r
            // Shadows the shadow shape when the switch is closed, shadows the\r
            // switch itself when its open\r
            if (!obj.data.isOn) {\r
              obj.findObject('NODESHAPE').shadowVisible = true;\r
            } else {\r
              obj.findObject('SHADOWSHAPE').visible = true;\r
            }\r
          })\r
        },\r
        mouseLeave: (e, obj) => {\r
          while (obj.part && obj !== obj.part) obj = obj.part;\r
          e.diagram.commit(diag => {\r
            if (!obj.data.isOn) {\r
              obj.findObject('NODESHAPE').shadowVisible = false;\r
            } else {\r
              obj.findObject('SHADOWSHAPE').visible = false;\r
            }\r
          })\r
        }\r
      })\r
      .add(\r
        // Creates shadow for the switch shape since it is being clipped when closed\r
        new go.Shape('Rectangle', {\r
          name: 'SHADOWSHAPE',\r
          desiredSize: new go.Size(40, 5),\r
          fill: 'white',\r
          stroke: null,\r
          alignment: go.Spot.Center,\r
          shadowVisible: true,\r
          visible: false,\r
          shadowBlur: 15,\r
          shadowOffset: new go.Point(0, 0),\r
          shadowColor: 'blue'\r
        }),\r
        new go.Panel('Horizontal', {\r
          // this prevents the ports from moving when the shape rotates\r
          minSize: new go.Size(42, 60)\r
        })\r
          .add(\r
            new go.Panel('Spot', {\r
              isClipping: true\r
            })\r
              .add(\r
                new go.Shape({fill: 'blue', strokeWidth: 0}),\r
                new go.Panel({\r
                  alignment: go.Spot.Left,\r
                  alignmentFocus: go.Spot.Center,\r
                  angle: 359.99 // rotate counter clock wise\r
                })\r
                  .add(\r
                    new go.Shape({width: 1, height: 1}),\r
                    new go.Shape(shapeStyle())\r
                      .set({\r
                        strokeWidth: 1,\r
                        fill: green,\r
                        width: 40,\r
                        height: 4,\r
                        position: new go.Point(40,0),\r
                        shadowVisible: false\r
                      })\r
                  )\r
                  .bind('angle', 'isOn', isOn => isOn ? 359.99 : 359.99 - 30)\r
                  .trigger('angle', {\r
                    duration: 250,\r
                    easing: go.Animation.EaseOutQuad,\r
                    finished: updateStates\r
                  })\r
              )\r
          ),\r
        // this rectangle is the clickable area\r
        new go.Shape('Rectangle', {\r
          fill: 'transparent',\r
          strokeWidth: 0,\r
          width: 40,\r
          height: 30,\r
          alignment: go.Spot.Center,\r
          alignmentFocus: new go.Spot(0.5, 1, 0, -8),\r
          cursor: 'pointer',\r
          click: (e, obj) => {\r
            if (e.diagram instanceof go.Palette) return;\r
            e.diagram.startTransaction('Toggle Switch');\r
\r
            while (obj.part && obj.part !== obj) obj = obj.part; // find node\r
            const shp = obj.findObject('NODESHAPE');\r
            const isOn = !obj.data.isOn;\r
            myDiagram.model.set(obj.data, 'isOn', isOn);\r
            obj.findObject('SHADOWSHAPE').visible = false;\r
\r
            e.diagram.commitTransaction('Toggle Switch');\r
\r
            if (!obj.data.isOn)\r
              updateStates();\r
          }\r
        }),\r
        // ports\r
        new go.Shape(portStyle(false)) // the only port\r
          .set({\r
            figure: 'Circle',\r
            portId: 'out',\r
            desiredSize: new go.Size(7, 7),\r
            alignment: new go.Spot(1, 0.5),\r
            fromSpot: new go.Spot(1, 0.5, -5, 0),\r
            toSpot: new go.Spot(1, 0.5, -5, 0)\r
          }),\r
        new go.Shape(portStyle(true)) // the only port\r
          .set({\r
            figure: 'Circle',\r
            portId: 'in',\r
            desiredSize: new go.Size(7, 7),\r
            alignment: new go.Spot(0, 0.5),\r
            fromSpot: new go.Spot(0, 0.5, 5, 0),\r
            toSpot: new go.Spot(0, 0.5, 5, 0)\r
          })\r
      );\r
\r
    // brush for the "light" in the LED\r
    const outBrush = new go.Brush('Radial', {\r
      0.0: 'rgba(255, 255, 255, 0.2)',\r
      0.5: 'rgba(250,215,87,0.8)',\r
      0.75: 'rgba(250,215,87,0.5)',\r
      0.85: 'rgba(250,215,87,0.2)',\r
      0.95: 'rgba(250,215,87,0.1)',\r
      1: 'rgba(250,215,87,0)',\r
      start: new go.Spot(0.5, 0.8)\r
    })\r
\r
    const outputTemplate = new go.Node('Spot', nodeStyle())\r
      .set({\r
        isShadowed: true\r
      })\r
      .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
      .add(\r
        new go.Panel('Spot')\r
          .add(\r
            new go.Shape('RoundedRectangle', {\r
              fill: 'transparent',\r
              parameter1: Infinity,\r
              parameter2: 0b0011, // top rounded\r
              width: 25,\r
              height: 22,\r
              strokeWidth: 2,\r
              shadowVisible: false\r
            }),\r
            new go.Shape('Rectangle', {\r
              alignment: go.Spot.Bottom,\r
              alignmentFocus: new go.Spot(0.5, 0.8),\r
              strokeWidth: 0,\r
              fill: null,\r
              width: 40,\r
              height: 43\r
            })\r
              .bind('fill', 'isOn', isOn => isOn ? outBrush : 'transparent'),\r
            new go.Shape('Rectangle', shapeStyle())\r
              .set({\r
                width: 32,\r
                height: 15,\r
                alignment: go.Spot.Bottom,\r
                alignmentFocus: new go.Spot(0.5, 0, 0, 2)\r
              })\r
                .bindObject('shadowVisible', 'isSelected')\r
          ),\r
        new go.Shape(portStyle(true, new go.Spot(0.5, 1, 0, -3))).set({\r
          // the only port\r
          portId: '',\r
          alignment: new go.Spot(0.5, 1)\r
        })\r
      );\r
\r
    // Nodes space their ports based on the cell size so that links can line up horizontally\r
    const andTemplate = applyNodeBindings(new go.Node('Spot', nodeStyle()))\r
      .add(\r
        new go.Shape('AndGate', shapeStyle()),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in1',\r
          alignment: new go.Spot(0, 0.5, 0, -CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in2',\r
          alignment: new go.Spot(0, 0.5, 0, CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(false)).set({\r
          portId: 'out',\r
          alignment: new go.Spot(1, 0.5)\r
        })\r
      );\r
\r
    const orTemplate = applyNodeBindings(new go.Node('Spot', nodeStyle()))\r
      .add(\r
        new go.Shape('OrGate', shapeStyle()),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in1',\r
          alignment: new go.Spot(0.16, 0.5, 0, -CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in2',\r
          alignment: new go.Spot(0.16, 0.5, 0, CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(false)).set({\r
          portId: 'out',\r
          alignment: new go.Spot(1, 0.5)\r
        })\r
      );\r
\r
    const xorTemplate = applyNodeBindings(new go.Node('Spot', nodeStyle()))\r
      .add(\r
        new go.Shape('XorGate', shapeStyle()),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in1',\r
          alignment: new go.Spot(0.26, 0.5, 0, -CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in2',\r
          alignment: new go.Spot(0.26, 0.5, 0, CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(false)).set({\r
          portId: 'out',\r
          alignment: new go.Spot(1, 0.5)\r
        })\r
      );\r
\r
    const norTemplate = applyNodeBindings(new go.Node('Spot', nodeStyle()))\r
      .add(\r
        new go.Shape('NorGate', shapeStyle()),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in1',\r
          alignment: new go.Spot(0.16, 0.5, 0, -CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in2',\r
          alignment: new go.Spot(0.16, 0.5, 0, CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(false)).set({\r
          portId: 'out',\r
          opacity: 0,\r
          alignment: new go.Spot(1, 0.5, -5, 0)\r
        })\r
      );\r
\r
    const xnorTemplate = applyNodeBindings(new go.Node('Spot', nodeStyle()))\r
      .add(\r
        new go.Shape('XnorGate', shapeStyle()),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in1',\r
          alignment: new go.Spot(0.26, 0.5, 0, -CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in2',\r
          alignment: new go.Spot(0.26, 0.5, 0, CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(false)).set({\r
          portId: 'out',\r
          opacity: 0,\r
          alignment: new go.Spot(1, 0.5, -5, 0)\r
        })\r
      );\r
\r
    const nandTemplate = applyNodeBindings(new go.Node('Spot', nodeStyle()))\r
      .add(\r
        new go.Shape('NandGate', shapeStyle()),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in1',\r
          alignment: new go.Spot(0, 0.5, 0, -CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in2',\r
          alignment: new go.Spot(0, 0.5, 0, CELLSIZE)\r
        }),\r
        new go.Shape(portStyle(false)).set({\r
          portId: 'out',\r
          opacity: 0,\r
          alignment: new go.Spot(1, 0.5, -5, 0)\r
        })\r
      );\r
\r
    const notTemplate = applyNodeBindings(new go.Node('Spot', nodeStyle()))\r
      .add(\r
        new go.Shape('Inverter', shapeStyle()),\r
        new go.Shape(portStyle(true)).set({\r
          portId: 'in',\r
          alignment: new go.Spot(0, 0.5)\r
        }),\r
        new go.Shape(portStyle(false)).set({\r
          portId: 'out',\r
          opacity: 0,\r
          alignment: new go.Spot(1, 0.5, -5, 0)\r
        })\r
      );\r
\r
    // add the templates created above to myDiagram and palette\r
    myDiagram.nodeTemplateMap.add('input', inputTemplate);\r
    myDiagram.nodeTemplateMap.add('switch', switchTemplate);\r
    myDiagram.nodeTemplateMap.add('output', outputTemplate);\r
    myDiagram.nodeTemplateMap.add('and', andTemplate);\r
    myDiagram.nodeTemplateMap.add('or', orTemplate);\r
    myDiagram.nodeTemplateMap.add('xor', xorTemplate);\r
    myDiagram.nodeTemplateMap.add('not', notTemplate);\r
    myDiagram.nodeTemplateMap.add('nand', nandTemplate);\r
    myDiagram.nodeTemplateMap.add('nor', norTemplate);\r
    myDiagram.nodeTemplateMap.add('xnor', xnorTemplate);\r
\r
    // share the template map with the Palette\r
    palette.nodeTemplateMap = myDiagram.nodeTemplateMap;\r
\r
    palette.model.nodeDataArray = [\r
      { category: 'input', isOn: true },\r
      { category: 'switch', isOn: true },\r
      { category: 'output' },\r
      { category: 'and' },\r
      { category: 'or' },\r
      { category: 'xor' },\r
      { category: 'not' },\r
      { category: 'nand' },\r
      { category: 'nor' },\r
      { category: 'xnor' }\r
    ];\r
\r
    // load the initial diagram\r
    load();\r
\r
    // continually update the diagram\r
    loop();\r
  }\r
\r
  // update the diagram every 250 milliseconds\r
  function loop() {\r
    setTimeout(() => {\r
      updateStates();\r
      loop();\r
    }, 250);\r
  }\r
\r
  // update the value and appearance of each node according to its type and input values\r
  function updateStates() {\r
    const oldskip = myDiagram.skipsUndoManager;\r
    myDiagram.skipsUndoManager = true;\r
    // do all "input" nodes first\r
    myDiagram.nodes.each(node => {\r
      if (node.category === 'input') {\r
        doInput(node);\r
      }\r
    });\r
    // now we can do all other kinds of nodes\r
    myDiagram.nodes.each(node => {\r
      switch (node.category) {\r
        case 'switch':\r
          doSwitch(node);\r
          break;\r
        case 'and':\r
          doAnd(node);\r
          break;\r
        case 'or':\r
          doOr(node);\r
          break;\r
        case 'xor':\r
          doXor(node);\r
          break;\r
        case 'not':\r
          doNot(node);\r
          break;\r
        case 'nand':\r
          doNand(node);\r
          break;\r
        case 'nor':\r
          doNor(node);\r
          break;\r
        case 'xnor':\r
          doXnor(node);\r
          break;\r
        case 'output':\r
          doOutput(node);\r
          break;\r
        case 'input':\r
          break; // doInput already called, above\r
      }\r
    });\r
    myDiagram.skipsUndoManager = oldskip;\r
  }\r
\r
  // helper predicate\r
  function linkIsTrue(link) {\r
    // assume the given Link has a Shape named "SHAPE"\r
    return link.findObject('SHAPE').stroke === green;\r
  }\r
\r
  // helper function for propagating results\r
  function setOutputLinks(node, color) {\r
    node.findLinksOutOf().each(link => (link.findObject('SHAPE').stroke = color));\r
  }\r
\r
  // update nodes by the specific function for its type\r
  // determine the color of links coming out of this node based on those coming in and node type\r
\r
  function doInput(node) {\r
    setOutputLinks(node, node.data.isOn ? green : red);\r
  }\r
\r
  function doSwitch(node) {\r
    const linksInto = node.findLinksInto();\r
    const color = linksInto.count > 0 && linksInto.all(linkIsTrue) ? green : red;\r
    node.findObject('NODESHAPE').fill = color;\r
    let ang = node.findObject('NODESHAPE').panel.angle;\r
    let isGoodAngle = ang >= 357 || ang <= 3;\r
    setOutputLinks(node, node.data.isOn && isGoodAngle ? color : red);\r
  }\r
\r
  function doAnd(node) {\r
    const linksInto = node.findLinksInto();\r
    const color = linksInto.count > 0 && linksInto.all(linkIsTrue) && linksInto.count % 2 == 0 ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
  function doNand(node) {\r
    const color = !node.findLinksInto().all(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
  function doNot(node) {\r
    const color = !node.findLinksInto().all(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doOr(node) {\r
    const color = node.findLinksInto().any(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
  function doNor(node) {\r
    const color = !node.findLinksInto().any(linkIsTrue) ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doXor(node) {\r
    let truecount = 0;\r
    node.findLinksInto().each(link => {\r
      if (linkIsTrue(link)) truecount++;\r
    });\r
    const color = truecount % 2 !== 0 ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
  function doXnor(node) {\r
    let truecount = 0;\r
    node.findLinksInto().each(link => {\r
      if (linkIsTrue(link)) truecount++;\r
    });\r
    const color = truecount % 2 === 0 ? green : red;\r
    setOutputLinks(node, color);\r
  }\r
\r
  function doOutput(node) {\r
    // assume there is just one input link\r
    // we just need to update the node's data.isOn\r
    node.linksConnected.each(link => {\r
      myDiagram.model.set(node.data, 'isOn', link.findObject('SHAPE').stroke == green);\r
    });\r
  }\r
\r
  // save a model to and load a model from JSON text, displayed below the Diagram\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/PolylineLinkingTool.js`,`../extensions/OrthogonalLinkReshapingTool.js`],descriptionHtml:`<p>\r
    Try clicking on the switch or the battery to toggle them.\r
  </p>\r
  <p>\r
    This logic circuit implements a three-bit adder (see\r
    <a href="https://en.wikipedia.org/wiki/Adder_(electronics)">Wikipedia</a> for more information).\r
    The switches connected to the batteries on the left side of the diagram are the inputs, and the\r
    lamps at the top are the outputs. By opening or closing the switches, different numbers can be\r
    added (up to 7+7=14), with the lamps reflecting the sum of those numbers in real time.\r
  </p>\r
  <p>\r
    This sample allows the user to make circuits using gates and wires, which are\r
    updated whenever a Link is modified and at intervals by a looped setTimeout function.\r
  </p>\r
  <p>\r
    The <b>updateStates</b> function calls a function to update each node according to type, which\r
    uses the color of the links into the node to determine the color of those exiting it. Red means\r
    zero or false; green means one or true. Clicking an input node (battery or switch) will toggle\r
    true/false.\r
  </p>\r
  <p>\r
    Mouse over a node to see its category, displayed using a shared <a>Adornment</a> set as the\r
    tooltip. A <a>Palette</a> to the left of the main diagram allows the user to drag and drop new\r
    nodes. These nodes can then be linked using ports which are defined on the various node\r
    templates. Each input port can only have one input link, while output ports can have many output\r
    links. This is controlled by the <a>GraphObject.toMaxLinks</a> property.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tooltips`,`palette`,`grid`,`process`];var g=y();l(`r52ghm`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};