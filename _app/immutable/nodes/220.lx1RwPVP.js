import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Process Flow SCADA Diagram with Tanks, Valves, Pipes and Animated Flow`,titleShort:`Process Flow`,indexDescription:`Industrial process flow diagram containing tanks, valves, and pipes, with animated flow in the pipes.`,screenshot:`processflow`,priority:.9,tags:[`geometries`,`grid`,`process`,`monitoring`,`animation`,`scada`],description:`A simple process flow or SCADA diagram editor, simulating equipment monitoring and control.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  <div>\r
    <div style="margin-block: .5em;">\r
      <button id="SaveButton" onclick="save()">Save</button>\r
      <button onclick="load()">Load</button>\r
      Diagram Model saved in JSON format:\r
    </div>\r
    <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "GraphLinksModel",\r
  "pointsDigits": 1,\r
  "linkFromPortIdProperty": "fromPort",\r
  "linkToPortIdProperty": "toPort",\r
  "nodeDataArray": [\r
{"key":"Tank1","category":"Tank","pos":"-30 200","text":"Feed Tank","height":100,"width":200,"fillLevel":"0.8"},\r
{"key":"Valve1","category":"Valve","pos":"150 200","text":"Valve","angle":0,"isOn":true},\r
{"key":"Tank2","category":"DistillationColumn","pos":"300 200","text":"Distillation Column","height":275,"width":75,"fillLevel":"0.15"},\r
{"key":"Condenser1","category":"Condenser","pos":"390 0","text":"Condenser","isOn":true},\r
{"key":"Tank3","category":"Tank","pos":"600 20","text":"Reflux Drum","height":75,"width":150,"fillLevel":"0.1"},\r
{"key":"Pump1","category":"Pump","pos":"550 100","text":"Pump","isOn":true},\r
{"key":"Boiler1","category":"Boiler","pos":"390 360","text":"Reboiler","isOn":true},\r
{"key":"Valve2","category":"Valve","pos":"480 260","text":"Valve","angle":270,"isOn":true},\r
{"key":"Tank4","category":"Tank","pos":"750 180","text":"Holding Tank","height":75,"width":120,"fillLevel":"0.8"},\r
{"key":"Tank5","category":"Tank","pos":"750 380","text":"Holding Tank","height":75,"width":120,"fillLevel":"0.8"}\r
],\r
  "linkDataArray": [\r
{"from":"Tank1","to":"Valve1","stroke":"rgba(117, 147, 175, 0.5)","points":[71.0,200.0,81.0,200.0,100.3,200.0,100.3,200.0,119.5,200.0,129.5,200.0]},\r
{"from":"Valve1","to":"Tank2","stroke":"rgba(117, 147, 175, 0.5)","points":[170.5,200.0,180.5,200.0,203.5,200.0,203.5,200.0,226.5,200.0,236.5,200.0]},\r
{"from":"Tank2","to":"Condenser1","points":[300.0,61.5,300.0,51.5,300.0,52.0,300.0,52.0,300.0,18.0,402.5,18.0,412.5,18.0]},\r
{"from":"Condenser1","to":"Tank3","stroke":"rgba(117, 147, 175, 0.5)","points":[446.5,18.0,456.5,18.0,458.0,18.0,458.0,18.0,514.0,18.0,524.0,20.0]},\r
{"from":"Tank3","to":"Pump1","stroke":"rgba(117, 147, 175, 0.5)","points":[600.0,58.5,600.0,68.5,600.0,79.3,570.6,79.3,570.6,90.0,570.6,100.0]},\r
{"from":"Pump1","to":"Tank2","stroke":"rgba(117, 147, 175, 0.5)", "points":[561.0,116.5,551.0,116.5,548.0,116.5,548.0,66.4,333.6,66.4,326.5,73.5]},\r
{"from":"Pump1","to":"Tank4","stroke":"rgba(117, 147, 175, 0.5)","text":"Overhead product","points":[586.0,116.5,596.0,116.5,596.0,116.5,596.0,180.0,679.0,180.0,689.0,180.0]},\r
{"from":"Tank2","to":"Boiler1","stroke":"rgba(117, 147, 175, 0.5)", "points":[300.0,338.5,300.0,348.5,300.0,349.2,422.0,349.2,422.0,350.0,422.0,360.0]},\r
{"from":"Boiler1","to":"Valve2","points":[422.0,360.0,422.0,350.0,422.0,320.3,480.0,320.3,480.0,290.5,480.0,280.5]},\r
{"from":"Valve2","to":"Tank2","points":[480.0,239.5,480.0,229.5,480.0,200.0,426.8,200.0,373.5,200.0,363.5,200.0]},\r
{"from":"Boiler1","to":"Tank5","stroke":"rgba(117, 147, 175, 0.5)","text":"Bottom product\\n(condensate from reboiler)","points":[438.5,376.5,448.5,376.5,455.0,376.5,455.0,376.5,679.0,376.5,689.0,380.0]}\r
]}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    const FONT = 'bold 13px InterVariable, sans-serif';\r
		go.Shape.defineFigureGenerator('Wave', (shape, w, h) => {\r
			const geo = new go.Geometry();\r
			const fig = new go.PathFigure(0, 0, true);\r
      const param1 = shape?.parameter1 ?? 0;\r
			geo.add(fig);\r
      // w -= 1; // remove slight overlap\r
			fig.add(new go.PathSegment(go.SegmentType.Line, w, 0));\r
			fig.add(new go.PathSegment(go.SegmentType.Line, w, h*3/4));\r
			fig.add(new go.PathSegment(go.SegmentType.QuadraticBezier, 0, h*3/4, w/2, h/4 + h*param1));\r
			fig.add(new go.PathSegment(go.SegmentType.Line, 0, 0));\r
			return geo;\r
		});\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'grid.visible': true,\r
      'grid.gridCellSize': new go.Size(30, 20),\r
      'draggingTool.isGridSnapEnabled': true,\r
      'resizingTool.isGridSnapEnabled': true,\r
      'rotatingTool.snapAngleMultiple': 90,\r
      'rotatingTool.snapAngleEpsilon': 45,\r
      'undoManager.isEnabled': true,\r
      ModelChanged: e => {\r
        if (e.isTransactionFinished) updateAnimation();\r
      }\r
    });\r
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
    function makeDistillationColumnPlatePanel(alignment, side) {\r
      return new go.Panel('Graduated', {\r
          alignment: new go.Spot(alignment, 0),\r
          alignmentFocus: new go.Spot(alignment, 0),\r
        })\r
        .bind('height', 'height', value => value * 0.85)\r
        .add(\r
          new go.Shape({ geometryString: "M0 0 V400", strokeWidth: 0 })\r
            .bind('geometryString', 'height', value => \`M0 0 V\${value}\`),\r
          new go.Shape({\r
              interval: 1,\r
              geometryString: "M0 0 V40",\r
              graduatedSkip: n => Boolean(n % 20) ^ side,\r
              stroke: 'black',\r
              strokeDashArray: [10, 1]\r
            })\r
            .bind('geometryString', 'width', value => \`M0 0 V\${value * 0.8}\`),\r
        );\r
    }\r
\r
    function makeMetalBrush() {\r
      let color = '#fff';\r
      return new go.Brush('Linear', {\r
        0: go.Brush.darken(color),\r
        0.2: color,\r
        0.33: go.Brush.lighten(color),\r
        0.5: color,\r
        1: go.Brush.darken(color),\r
        start: go.Spot.Left,\r
        end: go.Spot.Right\r
      });\r
    }\r
\r
    function makeWaveBrush() {\r
      return new go.Brush('Linear', {\r
        0: 'rgba(163, 183, 202, 1)',\r
        0.9: 'rgba(209, 219, 228, 1)',\r
        1: 'rgba(209, 219, 228, 1)',\r
        start: go.Spot.Top,\r
        end: go.Spot.Bottom\r
      });\r
    }\r
\r
\r
    var WAVE_WIDTH = 50;\r
		var WAVE_HEIGHT = 10;\r
		var ORIGINAL_WIDTH = 100 * WAVE_WIDTH;\r
\r
    myDiagram.nodeTemplateMap.add('DistillationColumn',\r
      new go.Node('Spot', {\r
          selectionObjectName: 'CAPSULE',\r
          resizable: true,\r
          resizeObjectName: 'CAPSULE',\r
          locationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Capsule', {\r
              fill: makeMetalBrush(),\r
              stroke: 'black',\r
              strokeWidth: 1,\r
            })\r
            .bind('height', 'height', value => value + 1)\r
            .bind('width', 'width', value => value + 1),\r
          new go.Panel('Spot', {isClipping: true})\r
            .add(\r
              new go.Shape('Capsule', {\r
                  name: "CAPSULE",\r
                  strokeWidth: 0,\r
                })\r
                .bindTwoWay('height')\r
                .bindTwoWay('width'),\r
              new go.Panel('Spot')\r
                .bind('height')\r
                .bind('width')\r
                .add(\r
                  new go.Shape({fill: 'white', strokeWidth: 0}),\r
                  new go.Panel('Vertical', {\r
                      alignmentFocus: go.Spot.BottomCenter,\r
                      alignment: go.Spot.BottomCenter,\r
                      stretch: go.Stretch.Horizontal\r
                    })\r
                    .add(\r
                      new go.Panel('Graduated', {\r
                          background: 'transparent',\r
                          graduatedMin: 0,\r
                          graduatedMax: 100,\r
                          graduatedTickBase: 0,\r
                          graduatedTickUnit: 1,\r
                          width: ORIGINAL_WIDTH,\r
                          margin: 0,\r
                          stretch: go.Stretch.Horizontal,\r
                          name: 'WAVE_GRADUATED_PANEL'\r
                        })\r
                        .add(\r
                          new go.Shape({\r
                            name: 'line',\r
                            geometryString: 'M0 0 H-' + ORIGINAL_WIDTH,\r
                            stroke: 'gray',\r
                            strokeWidth: 0\r
                          }),\r
                          new go.Shape('Wave', {\r
                            interval: 1,\r
                            parameter1: 0,\r
                            name: 'WAVE1',\r
                            fill: makeWaveBrush(),\r
                            strokeWidth: 0,\r
                            desiredSize: new go.Size(WAVE_WIDTH + 1, WAVE_HEIGHT),\r
                            graduatedSkip: n => n % 2\r
                          }),\r
                          new go.Shape('Wave', {\r
                            interval: 1,\r
                            parameter1: 1,\r
                            name: 'WAVE2',\r
                            graduatedSkip: n => !(n % 2),\r
                            desiredSize: new go.Size(WAVE_WIDTH + 1, WAVE_HEIGHT),\r
                            fill: makeWaveBrush(),\r
                            strokeWidth: 0\r
                          })\r
                        ),\r
                      new go.Shape({\r
                          fill: new go.Brush('Linear', {\r
                            0: 'rgba(163, 183, 202, 1)',\r
                            0.25: 'rgba(117, 147, 175, 1)',\r
                            0.5: 'rgba(71, 111, 149, 1)',\r
                            0.75: 'rgba(25, 74, 122, 1)',\r
                            start: go.Spot.Top,\r
                            end: go.Spot.Bottom\r
                          }),\r
                          margin: new go.Margin(-1, 0, 0, 0),\r
                          strokeWidth: 0,\r
                          stretch: go.Stretch.Horizontal\r
                        })\r
                        .bind('height', '', data => {\r
                          let fill_height = data.fillLevel * data.height;\r
                          return fill_height - (WAVE_HEIGHT / 2);\r
                        })\r
                    )\r
                ),\r
                makeDistillationColumnPlatePanel(0, true),\r
                makeDistillationColumnPlatePanel(1, false),\r
            ),\r
            new go.Panel('Auto')\r
              .add(\r
                new go.Shape({fill: 'rgba(255, 255, 255, 0.9)', stroke: 'black'}),\r
                new go.TextBlock('test', {stroke: 'black', margin: 3, font: FONT})\r
                  .bind('text')\r
              )\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Tank',\r
      new go.Node('Spot', {\r
          selectionObjectName: 'CAPSULE',\r
          resizable: true,\r
          resizeObjectName: 'CAPSULE',\r
          locationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('Capsule', {\r
              fill: makeMetalBrush(),\r
              stroke: 'black',\r
              strokeWidth: 1,\r
            })\r
            .bind('height', 'height', value => value + 1)\r
            .bind('width', 'width', value => value + 1),\r
          new go.Panel('Spot', {isClipping: true})\r
            .add(\r
              new go.Shape('Capsule', {\r
                  name: "CAPSULE",\r
                  strokeWidth: 0,\r
                })\r
                .bindTwoWay('height')\r
                .bindTwoWay('width'),\r
              new go.Panel('Spot')\r
                .bind('height')\r
                .bind('width')\r
                .add(\r
                  new go.Shape({fill: 'white', strokeWidth: 0}),\r
                  new go.Panel('Vertical', {\r
                      alignmentFocus: go.Spot.BottomCenter,\r
                      alignment: go.Spot.BottomCenter,\r
                      stretch: go.Stretch.Horizontal\r
                    })\r
                    .add(\r
                      new go.Panel('Graduated', {\r
                          background: 'transparent',\r
                          graduatedMin: 0,\r
                          graduatedMax: 100,\r
                          graduatedTickBase: 0,\r
                          graduatedTickUnit: 1,\r
                          width: ORIGINAL_WIDTH,\r
                          margin: 0,\r
                          stretch: go.Stretch.Horizontal,\r
                          name: 'WAVE_GRADUATED_PANEL'\r
                        })\r
                        .add(\r
                          new go.Shape({\r
                            name: 'line',\r
                            geometryString: 'M0 0 H-' + ORIGINAL_WIDTH,\r
                            stroke: 'gray',\r
                            strokeWidth: 0\r
                          }),\r
                          new go.Shape('Wave', {\r
                            interval: 1,\r
                            parameter1: 0,\r
                            name: 'WAVE1',\r
                            fill: makeWaveBrush(),\r
                            strokeWidth: 0,\r
                            desiredSize: new go.Size(WAVE_WIDTH + 1, WAVE_HEIGHT),\r
                            graduatedSkip: n => n % 2\r
                          }),\r
                          new go.Shape('Wave', {\r
                            interval: 1,\r
                            parameter1: 1,\r
                            name: 'WAVE2',\r
                            graduatedSkip: n => !(n % 2),\r
                            desiredSize: new go.Size(WAVE_WIDTH + 1, WAVE_HEIGHT),\r
                            fill: makeWaveBrush(),\r
                            strokeWidth: 0\r
                          })\r
                        ),\r
                      new go.Shape({\r
                          fill: new go.Brush('Linear', {\r
                            0: 'rgba(163, 183, 202, 1)',\r
                            0.25: 'rgba(117, 147, 175, 1)',\r
                            0.5: 'rgba(71, 111, 149, 1)',\r
                            0.75: 'rgba(25, 74, 122, 1)',\r
                            start: go.Spot.Top,\r
                            end: go.Spot.Bottom\r
                          }),\r
                          margin: new go.Margin(-1, 0, 0, 0),\r
                          strokeWidth: 0,\r
                          stretch: go.Stretch.Horizontal\r
                        })\r
                        .bind('height', '', data => {\r
                          let fill_height = data.fillLevel * data.height;\r
                          return fill_height - (WAVE_HEIGHT / 2);\r
                        })\r
                    )\r
                ),\r
            ),\r
            new go.Panel('Auto')\r
              .add(\r
                new go.Shape({fill: 'rgba(255, 255, 255, 0.9)', stroke: 'black'}),\r
                new go.TextBlock('test', {stroke: 'black', margin: 3, font: FONT})\r
                  .bind('text')\r
              )\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Pump',\r
      new go.Node('Vertical')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Vertical', {portId: ''})\r
            .add(\r
              new go.Shape('Circle', {\r
                desiredSize: new go.Size(25, 25),\r
                fill: makeMetalBrush(),\r
                strokeWidth: 1,\r
                margin: new go.Margin(0, 0, -2, 0)\r
              }),\r
              new go.Shape({\r
                desiredSize: new go.Size(30, 8),\r
                fill: makeMetalBrush(),\r
                strokeWidth: 1\r
              })\r
            ),\r
          new go.TextBlock({\r
              alignment: go.Spot.Center,\r
              textAlign: 'center',\r
              margin: 5,\r
              editable: true,\r
              font: FONT\r
            })\r
            .bindTwoWay('text'),\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Condenser',\r
      new go.Node('Vertical')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Circle', {\r
                desiredSize: new go.Size(32, 32),\r
                fill: makeMetalBrush(),\r
                strokeWidth: 1,\r
                portId: '',\r
                fromSpot: go.Spot.Right,\r
                toSpot: go.Spot.Left\r
              }),\r
              new go.Shape({\r
                geometryString: 'F M0 36 L0 40 4 40 0 40 20 16 20 24 40 0',\r
                desiredSize: new go.Size(35, 35),\r
                strokeWidth: 1,\r
                fill: makeMetalBrush()\r
              })\r
            ),\r
          new go.TextBlock({\r
              alignment: go.Spot.Center,\r
              textAlign: 'center',\r
              margin: 5,\r
              editable: true,\r
              font: FONT\r
            })\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Valve',\r
      new go.Node('Vertical', {\r
          locationSpot: new go.Spot(0.5, 0.3333),\r
          locationObjectName: 'SHAPE',\r
          selectionObjectName: 'SHAPE',\r
          rotatable: true\r
        })\r
        .bindTwoWay('angle')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.TextBlock({\r
              alignment: go.Spot.Center,\r
              textAlign: 'center',\r
              margin: 5,\r
              editable: true,\r
              font: FONT\r
            })\r
            .bindTwoWay('text')\r
            // keep the text upright, even when the whole node has been rotated upside down\r
            .bindObject('angle', 'angle', a => a === 180 ? 180 : 0),\r
          new go.Shape({\r
            name: 'SHAPE',\r
            geometryString: 'F1 M0 0 L40 20 40 0 0 20z M20 10 L20 30 M12 30 L28 30',\r
            strokeWidth: 1,\r
            fill: makeMetalBrush(),\r
            portId: '',\r
            fromSpot: new go.Spot(1, 0.3333),\r
            toSpot: new go.Spot(0, 0.3333)\r
          })\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Boiler',\r
      new go.Node('Vertical')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Circle', {\r
                desiredSize: new go.Size(32, 32),\r
                portId: '',\r
                fill: makeMetalBrush(),\r
                strokeWidth: 1\r
              }),\r
              new go.Shape("Circle", {\r
                desiredSize: new go.Size(16, 16),\r
                strokeWidth: 1,\r
                alignment: go.Spot.BottomCenter,\r
                alignmentFocus: go.Spot.BottomCenter,\r
                fill: makeMetalBrush()\r
              })\r
            ),\r
          new go.TextBlock({\r
              alignment: go.Spot.Center,\r
              textAlign: 'center',\r
              margin: 5,\r
              editable: true,\r
              font: FONT\r
            })\r
            .bindTwoWay('text')\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Label',\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({fill: 'white', stroke: 'black'}),\r
          new go.TextBlock('test', {stroke: 'black', margin: 3, font: FONT})\r
            .bind('text')\r
        )\r
    );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          curve: go.Curve.JumpGap,\r
          corner: 10,\r
          reshapable: true,\r
          toShortLength: 7\r
        })\r
        .bindTwoWay('points')\r
        .add(\r
          // mark each Shape to get the link geometry with isPanelMain: true\r
          new go.Shape({ isPanelMain: true, stroke: 'black', strokeWidth: 5 }),\r
          new go.Shape({ isPanelMain: true, stroke: '#aaa', strokeWidth: 3 })\r
            .bind('stroke'),\r
          new go.Shape({\r
            isPanelMain: true,\r
            stroke: 'white',\r
            strokeWidth: 3,\r
            name: 'PIPE',\r
            strokeDashArray: [10, 10]\r
          }),\r
          new go.Shape({ toArrow: 'Triangle', fill: 'white', stroke: 'black' }),\r
          new go.Panel('Auto', { visible: false })\r
            .bind('visible', 'text', value => value && value != '')\r
            .add(\r
              new go.Shape({ fill: 'rgba(255, 255, 255, 0.9)', stroke: 'black', strokeDashArray: [5, 5] }),\r
              new go.TextBlock({ stroke: 'black', margin: 3, font: FONT })\r
                .bind('text')\r
            )\r
        );\r
\r
    load();\r
  }\r
\r
  var myAnimation = null;\r
  var myWavesAnimation = null;\r
  var myWavesOffsetAnimation = null;\r
\r
  //parameter1 isn't something you can animate by default :(\r
  //see documentation for more details: https://gojs.net/latest/api/symbols/AnimationManager.html#defineAnimationEffect\r
  //also see the learn page on animations: https://gojs.net/learn/animation\r
  go.AnimationManager.defineAnimationEffect('waves', (obj, startValue, endValue, easing, currentTime, duration, animation) => {\r
    let value = easing(currentTime, startValue, endValue - startValue, duration);\r
    obj.parameter1 = value;\r
  });\r
\r
  go.AnimationManager.defineAnimationEffect('offset', (obj, startValue, endValue, easing, currentTime, duration, animation) => {\r
    let value = easing(currentTime, startValue, endValue - startValue, duration);\r
    obj.alignment = new go.Spot(0, 0, value, 0);\r
  });\r
\r
  function updateAnimation() {\r
    //for the flow in the pipes\r
    if (myAnimation) myAnimation.stop();\r
    // Animate the flow in the pipes\r
    myAnimation = new go.Animation();\r
    myAnimation.easing = go.Animation.EaseLinear;\r
    myDiagram.links.each(link =>\r
      myAnimation.add(link.findObject('PIPE'), 'strokeDashOffset', 20, 0)\r
    );\r
    // Run indefinitely\r
    myAnimation.runCount = Infinity;\r
    myAnimation.start();\r
    //for the waves movement\r
    if (myWavesAnimation) myWavesAnimation.stop();\r
    myWavesAnimation = new go.Animation();\r
    myWavesAnimation.easing = go.Animation.EaseInOutQuad;\r
    myWavesAnimation.reversible = true;\r
    myWavesAnimation.duration = 2000;\r
    myDiagram.nodes.each(node => {\r
      let wave1 = node.findObject('WAVE1');\r
      let wave2 = node.findObject('WAVE2');\r
      if (wave1) myWavesAnimation.add(wave1, 'waves', 0, 1);\r
      if (wave2) myWavesAnimation.add(wave2, 'waves', 1, 0);\r
    });\r
    myWavesAnimation.runCount = Infinity;\r
    myWavesAnimation.start();\r
    //waves offset movement\r
    if (myWavesOffsetAnimation) myWavesOffsetAnimation.stop();\r
    myWavesOffsetAnimation = new go.Animation();\r
    myWavesOffsetAnimation.easing = go.Animation.EaseInOutQuad;\r
    myWavesOffsetAnimation.reversible = true;\r
    myWavesOffsetAnimation.duration = 5000;\r
    myDiagram.nodes.each(node => {\r
      let waveGraduatedPanel = node.findObject('WAVE_GRADUATED_PANEL');\r
      if (waveGraduatedPanel) myWavesOffsetAnimation.add(waveGraduatedPanel, 'offset', -30, 0);\r
    });\r
    myWavesOffsetAnimation.runCount = Infinity;\r
    myWavesOffsetAnimation.start();\r
  }\r
\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>\r
    A <em>process flow diagram</em> is commonly used in chemical and process engineering to indicate\r
    the general flow of plant processes and equipment. A simple SCADA diagram, with animation of the\r
    flow along the pipes, is implemented here. It shows a basic distillation process — more information available on\r
    <a href='https://en.wikipedia.org/wiki/Reflux'>Wikipedia</a>.\r
  </p>\r
  <p>\r
    The diagram displays the background grid layer by setting <b>grid.visible</b> to true, and also\r
    allows snapping to the grid using <a>DraggingTool.isGridSnapEnabled</a>,\r
    <a>ResizingTool.isGridSnapEnabled</a>, and <a>RotatingTool.snapAngleMultiple</a> alongside\r
    <a>RotatingTool.snapAngleEpsilon</a>. It also makes use of\r
    <a href="../intro/graduatedPanels">Graduated Panels</a> for the water effect inside the tanks.\r
  </p>\r
  <p>\r
    There are two custom animations in this diagram: one that modifies the <a>Shape.strokeDashOffset</a> for each link\r
    and one that uses <a>AnimationManager.defineAnimationEffect</a> to animate the waves in the tanks.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`geometries`,`grid`,`process`,`monitoring`,`animation`,`scada`];var g=y();l(`9fzq46`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};