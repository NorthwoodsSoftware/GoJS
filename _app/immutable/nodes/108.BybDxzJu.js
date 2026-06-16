import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Meter and Gauge Controls Drawn in Nodes Connected by Flows`,titleShort:`Meters and Gauges`,indexDescription:`Various meters and gauges that show particular values and can be modified by the user by dragging.`,screenshot:`controlgauges`,priority:1.5,tags:[`gauges`,`geometries`,`tools`],description:`Gauges and Meters that allow the user to control the values that those instruments show`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px;"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });\r
\r
    // These properties are what change an object from being a value indicator,\r
    // such as a needle or a bar or a thumb of a slider, to being a controller\r
    // that the user can drag to change the value of the instrument.\r
    // This assumes that the scale (a "Graduated" Panel) is named "SCALE".\r
    // The alwaysVisible parameter determines whether the object's visibility\r
    // is controlled by the "SCALE"'s Panel.isEnabled property.\r
    function sliderActions(obj, alwaysVisible) {\r
      obj.isActionable = true;\r
      obj.actionDown = (e, obj) => {\r
        obj._dragging = true;\r
        obj._original = obj.part.data.value;\r
      };\r
      obj.actionMove = (e, obj) => {\r
        if (!obj._dragging) return;\r
        var scale = obj.part.findObject('SCALE');\r
        var pt = e.diagram.lastInput.documentPoint;\r
        var loc = scale.getLocalPoint(pt);\r
        var val = Math.round(scale.graduatedValueForPoint(loc));\r
        // just set the data.value temporarily, not recorded in UndoManager\r
        e.diagram.model.commit(m => {\r
          m.set(obj.part.data, 'value', val);\r
        }, null); // null means skipsUndoManager\r
      };\r
      obj.actionUp = (e, obj) => {\r
        if (!obj._dragging) return;\r
        obj._dragging = false;\r
        var scale = obj.part.findObject('SCALE');\r
        var pt = e.diagram.lastInput.documentPoint;\r
        var loc = scale.getLocalPoint(pt);\r
        var val = Math.round(scale.graduatedValueForPoint(loc));\r
        e.diagram.model.commit(m => {\r
          m.set(obj.part.data, 'value', obj._original);\r
        }, null); // null means skipsUndoManager\r
        // now set the data.value for real\r
        e.diagram.model.commit(m => {\r
          m.set(obj.part.data, 'value', val);\r
        }, 'dragged slider');\r
      };\r
      obj.actionCancel = (e, obj) => {\r
        obj._dragging = false;\r
        e.diagram.model.commit(m => {\r
          m.set(obj.part.data, 'value', obj._original);\r
        }, null); // null means skipsUndoManager\r
      };\r
    }\r
\r
    function applySliderBindings(object, alwaysVisible) {\r
      if (alwaysVisible) object.bindObject('visible', 'isEnabled', null, null, 'SCALE');\r
      object.bindObject('cursor', 'isEnabled', e => e ? 'pointer' : '', null, null, 'SCALE');\r
      return object;\r
    }\r
\r
    function applyCommonScaleBindings(object) {\r
      object\r
        .bind('graduatedMin', 'min')\r
        .bind('graduatedMax', 'max')\r
        .bind('graduatedTickUnit', 'unit')\r
        .bind('isEnabled', 'editable');\r
    }\r
\r
    function commonSlider(vert) {\r
      return new go.Shape('RoundedRectangle', {\r
        name: 'SLIDER',\r
        fill: 'white',\r
        desiredSize: vert ? new go.Size(20, 6) : new go.Size(6, 20),\r
        alignment: vert ? go.Spot.Top : go.Spot.Right\r
      })\r
      .apply(sliderActions, false);\r
    }\r
\r
    function nodeStyle(node) {\r
      node.locationSpot = go.Spot.Center;\r
      node.fromSpot = go.Spot.BottomRightSides;\r
      node.toSpot = go.Spot.TopLeftSides;\r
      node.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);\r
    }\r
\r
    myDiagram.nodeTemplateMap.add('Horizontal',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape({ fill: 'lightgray', stroke: 'gray' }),\r
          new go.Panel('Table', { margin: 1, stretch: go.Stretch.Fill })\r
            .add(\r
              // header information\r
              new go.TextBlock({ row: 0, font: 'bold 10pt sans-serif' })\r
                .bind('text'),\r
              new go.Panel('Spot', { row: 1 })\r
                .add(\r
                  new go.Panel('Graduated', {\r
                      name: 'SCALE',\r
                      margin: new go.Margin(0, 6),\r
                      graduatedTickUnit: 10,\r
                      isEnabled: false\r
                    })\r
                    .apply(applyCommonScaleBindings)\r
                    .add(\r
                      new go.Shape({ geometryString: 'M0 0 H200', height: 0, name: 'PATH' }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V16',\r
                        alignmentFocus: go.Spot.Center,\r
                        stroke: 'gray'\r
                      }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V20',\r
                        alignmentFocus: go.Spot.Center,\r
                        interval: 5,\r
                        strokeWidth: 1.5\r
                      })\r
                    ),\r
                  new go.Panel('Spot', {\r
                      alignment: go.Spot.Left,\r
                      alignmentFocus: go.Spot.Left,\r
                      alignmentFocusName: 'BAR'\r
                    })\r
                    // the indicator (a bar)\r
                    .add(\r
                      new go.Shape({ name: 'BAR', fill: 'red', strokeWidth: 0, height: 8 })\r
                        .bind('fill', 'color')\r
                        .bind('desiredSize', 'value', (v, shp) => {\r
                          var scale = shp.part.findObject('SCALE');\r
                          var path = scale.findMainElement();\r
                          var len =\r
                            ((v - scale.graduatedMin) / (scale.graduatedMax - scale.graduatedMin)) *\r
                            path.geometry.bounds.width;\r
                          return new go.Size(len, 10);\r
                        }),\r
                      commonSlider(false)\r
                    )\r
                ),\r
              // state information\r
              new go.TextBlock('0', { row: 2, alignment: go.Spot.Left })\r
                .bind('text', 'min'),\r
              new go.TextBlock('100', { row: 2, alignment: go.Spot.Right })\r
                .bind('text', 'max'),\r
              new go.TextBlock({\r
                  row: 2,\r
                  background: 'white',\r
                  font: 'bold 10pt sans-serif',\r
                  isMultiline: false,\r
                  editable: true\r
                })\r
                .bindTwoWay('text', 'value', v => v.toString(), s => parseFloat(s))\r
            )\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('Vertical',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape({ fill: 'lightgray', stroke: 'gray' }),\r
          new go.Panel('Table', { margin: 1, stretch: go.Stretch.Fill })\r
            // header information\r
            .add(\r
              new go.TextBlock({ row: 0, font: 'bold 10pt sans-serif' })\r
                .bind('text'),\r
              new go.Panel('Spot', { row: 1 })\r
                .add(\r
                    new go.Panel('Graduated', {\r
                      name: 'SCALE',\r
                      margin: new go.Margin(6, 0),\r
                      graduatedTickUnit: 10,\r
                      isEnabled: false\r
                    })\r
                    .apply(applyCommonScaleBindings)\r
                    .add(\r
                      // NOTE: path goes upward!\r
                      new go.Shape({ geometryString: 'M0 0 V-200', width: 0, name: 'PATH' }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V16',\r
                        alignmentFocus: go.Spot.Center,\r
                        stroke: 'gray'\r
                      }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V20',\r
                        alignmentFocus: go.Spot.Center,\r
                        interval: 5,\r
                        strokeWidth: 1.5\r
                      })\r
                    ),\r
                  new go.Panel('Spot', {\r
                      alignment: go.Spot.Bottom,\r
                      alignmentFocus: go.Spot.Bottom,\r
                      alignmentFocusName: 'BAR'\r
                    })\r
                    // the indicator (a bar)\r
                    .add(\r
                      new go.Shape({ name: 'BAR', fill: 'red', strokeWidth: 0, height: 8 })\r
                        .bind('fill', 'color')\r
                        .bind('desiredSize', 'value', (v, shp) => {\r
                          var scale = shp.part.findObject('SCALE');\r
                          var path = scale.findMainElement();\r
                          var len =\r
                            ((v - scale.graduatedMin) /\r
                              (scale.graduatedMax - scale.graduatedMin)) *\r
                            path.geometry.bounds.height;\r
                          return new go.Size(10, len);\r
                        }),\r
                      commonSlider(true)\r
                    )\r
                ),\r
              // state information\r
              new go.TextBlock('0', { row: 2, alignment: go.Spot.Left })\r
                .bind('text', 'min'),\r
              new go.TextBlock('100', { row: 2, alignment: go.Spot.Right })\r
                .bind('text', 'max'),\r
              new go.TextBlock({\r
                  row: 2,\r
                  background: 'white',\r
                  font: 'bold 10pt sans-serif',\r
                  isMultiline: false,\r
                  editable: true\r
                })\r
                .bindTwoWay('text', 'value', v => v.toString(), s => parseFloat(s))\r
            )\r
        )\r
    );\r
\r
    function needleMeterGeometry(v, shp) {\r
      var scale = shp.part.findObject('SCALE');\r
      var pt = scale.graduatedPointForValue(v);\r
      var geo = new go.Geometry(go.GeometryType.Line);\r
      geo.startX = 100 + scale.margin.left;\r
      geo.startY = 90 + scale.margin.top;\r
      geo.endX = pt.x + scale.margin.left;\r
      geo.endY = pt.y + scale.margin.top;\r
      return geo;\r
    }\r
\r
    myDiagram.nodeTemplateMap.add('NeedleMeter',\r
      new go.Node('Auto')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Shape({ fill: 'darkslategray' }),\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Panel('Position')\r
                .add(\r
                  new go.Panel('Graduated', { name: 'SCALE', margin: 10 })\r
                    .apply(applyCommonScaleBindings)\r
                    .add(\r
                      new go.Shape({\r
                        name: 'PATH',\r
                        geometryString: 'M0 0 A120 120 0 0 1 200 0',\r
                        stroke: 'white'\r
                      }),\r
                      new go.Shape({ geometryString: 'M0 0 V10', stroke: 'white' }),\r
                      new go.TextBlock({\r
                        segmentOffset: new go.Point(0, 12),\r
                        segmentOrientation: go.Orientation.Along,\r
                        stroke: 'white'\r
                      })\r
                    ),\r
                  new go.Shape({\r
                      stroke: 'red',\r
                      strokeWidth: 2,\r
                      isGeometryPositioned: true\r
                    })\r
                    .apply(sliderActions, true)\r
                    .bind('geometry', 'value', needleMeterGeometry)\r
                ),\r
              new go.TextBlock({\r
                  alignment: new go.Spot(0.5, 0.5, 0, 20),\r
                  stroke: 'white',\r
                  font: 'bold 10pt sans-serif'\r
                })\r
                .bind('text')\r
                .bind('stroke', 'color'),\r
              new go.TextBlock({\r
                  alignment: go.Spot.Top,\r
                  margin: new go.Margin(4, 0, 0, 0),\r
                  stroke: 'white',\r
                  font: 'bold italic 13pt sans-serif',\r
                  isMultiline: false,\r
                  editable: true\r
                })\r
                .bindTwoWay('text', 'value', v => v.toString(), s => parseFloat(s))\r
                .bind('stroke', 'color')\r
            )\r
        )\r
    );\r
\r
    myDiagram.nodeTemplateMap.add('CircularMeter',\r
      new go.Node('Table')\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Panel('Auto', { row: 0 })\r
            .add(\r
              new go.Shape('Circle', {\r
                  stroke: 'orange',\r
                  strokeWidth: 5,\r
                  spot1: go.Spot.TopLeft,\r
                  spot2: go.Spot.BottomRight\r
                })\r
                .bind('stroke', 'color'),\r
              new go.Panel('Spot')\r
                .add(\r
                  new go.Panel('Graduated', {\r
                      name: 'SCALE',\r
                      margin: 14,\r
                      graduatedTickUnit: 2.5, // tick marks at each multiple of 2.5\r
                      stretch: go.Stretch.None // needed to avoid unnecessary re-measuring!!!\r
                    })\r
                    .apply(applyCommonScaleBindings)\r
                    .add(\r
                      // the main path of the graduated panel, an arc starting at 135 degrees and sweeping for 270 degrees\r
                      new go.Shape({\r
                        name: 'PATH',\r
                        geometryString: 'M-70.7107 70.7107 B135 270 0 0 100 100 M0 100',\r
                        stroke: 'white',\r
                        strokeWidth: 4\r
                      }),\r
                      // three differently sized tick marks\r
                      new go.Shape({ geometryString: 'M0 0 V10', stroke: 'white', strokeWidth: 1 }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V12',\r
                        stroke: 'white',\r
                        strokeWidth: 2,\r
                        interval: 2\r
                      }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V15',\r
                        stroke: 'white',\r
                        strokeWidth: 3,\r
                        interval: 4\r
                      }),\r
                      new go.TextBlock({\r
                        // each tick label\r
                        interval: 4,\r
                        alignmentFocus: go.Spot.Center,\r
                        font: 'bold italic 14pt sans-serif',\r
                        stroke: 'white',\r
                        segmentOffset: new go.Point(0, 30)\r
                      })\r
                    ),\r
                  new go.TextBlock({\r
                      alignment: new go.Spot(0.5, 0.9),\r
                      stroke: 'white',\r
                      font: 'bold italic 14pt sans-serif',\r
                      editable: true\r
                    })\r
                    .bindTwoWay('text', 'value', v => v.toString(), s => parseFloat(s))\r
                    .bind('stroke', 'color'),\r
                  new go.Shape({\r
                      fill: 'red',\r
                      strokeWidth: 0,\r
                      geometryString: 'F1 M-6 0 L0 -6 100 0 0 6z x M-100 0'\r
                    })\r
                    .apply(sliderActions, true)\r
                    .bind('angle', 'value', (v, shp) => {\r
                      // this determines the angle of the needle, based on the data.value argument\r
                      var scale = shp.part.findObject('SCALE');\r
                      var p = scale.graduatedPointForValue(v);\r
                      var path = shp.part.findObject('PATH');\r
                      var c = path.actualBounds.center;\r
                      return c.directionPoint(p);\r
                    }),\r
                  new go.Shape('Circle', { width: 2, height: 2, fill: '#444' })\r
                )\r
            ),\r
          new go.TextBlock({ row: 1, font: 'bold 11pt sans-serif' })\r
            .bind('text')\r
        )\r
    );\r
\r
    function barMeterGeometry(v, shp) {\r
      var scale = shp.part.findObject('SCALE');\r
      var p0 = scale.graduatedPointForValue(scale.graduatedMin);\r
      var pv = scale.graduatedPointForValue(v);\r
      var path = shp.part.findObject('PATH');\r
      var radius = path.actualBounds.width / 2;\r
      var c = path.actualBounds.center;\r
      var a0 = c.directionPoint(p0);\r
      var av = c.directionPoint(pv);\r
      var sweep = av - a0;\r
      if (sweep < 0) sweep += 360;\r
      var layerThickness = 8;\r
      return new go.Geometry()\r
        .add(new go.PathFigure(-radius, -radius)) // always make sure the Geometry includes the top left corner\r
        .add(new go.PathFigure(radius, radius)) // and the bottom right corner of the whole circular area\r
        .add(\r
          new go.PathFigure(p0.x - radius, p0.y - radius)\r
            .add(\r
              new go.PathSegment(\r
                go.SegmentType.Arc,\r
                a0,\r
                sweep,\r
                0,\r
                0,\r
                radius,\r
                radius\r
              )\r
            )\r
            .add(\r
              new go.PathSegment(go.SegmentType.Line, pv.x - radius, pv.y - radius)\r
            )\r
            .add(\r
              new go.PathSegment(\r
                go.SegmentType.Arc,\r
                av,\r
                -sweep,\r
                0,\r
                0,\r
                radius - layerThickness,\r
                radius - layerThickness\r
              ).close()\r
            )\r
        );\r
    }\r
\r
    myDiagram.nodeTemplateMap.add('BarMeter',\r
      new go.Node('Table', { scale: 0.8 })\r
        .apply(nodeStyle)\r
        .add(\r
          new go.Panel('Auto', { row: 0 })\r
            .add(\r
              new go.Shape('Circle', {\r
                  stroke: 'orange',\r
                  strokeWidth: 5,\r
                  spot1: go.Spot.TopLeft,\r
                  spot2: go.Spot.BottomRight\r
                })\r
                .bind('stroke', 'color'),\r
              new go.Panel('Spot')\r
                .add(\r
                  new go.Panel('Graduated', {\r
                      name: 'SCALE',\r
                      margin: 14,\r
                      graduatedTickUnit: 2.5, // tick marks at each multiple of 2.5\r
                      stretch: go.Stretch.None // needed to avoid unnecessary re-measuring!!!\r
                    })\r
                    .apply(applyCommonScaleBindings)\r
                    .add(\r
                      // the main path of the graduated panel, an arc starting at 135 degrees and sweeping for 270 degrees\r
                      new go.Shape({\r
                        name: 'PATH',\r
                        geometryString: 'M-70.7107 70.7107 B135 270 0 0 100 100 M0 100',\r
                        stroke: 'white',\r
                        strokeWidth: 4\r
                      }),\r
                      // three differently sized tick marks\r
                      new go.Shape({ geometryString: 'M0 0 V10', stroke: 'white', strokeWidth: 1 }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V12',\r
                        stroke: 'white',\r
                        strokeWidth: 2,\r
                        interval: 2\r
                      }),\r
                      new go.Shape({\r
                        geometryString: 'M0 0 V15',\r
                        stroke: 'white',\r
                        strokeWidth: 3,\r
                        interval: 4\r
                      }),\r
                      new go.TextBlock({\r
                        // each tick label\r
                        interval: 4,\r
                        alignmentFocus: go.Spot.Center,\r
                        font: 'bold italic 14pt sans-serif',\r
                        stroke: 'white',\r
                        segmentOffset: new go.Point(0, 30)\r
                      })\r
                    ),\r
                  new go.TextBlock({\r
                      alignment: go.Spot.Center,\r
                      stroke: 'white',\r
                      font: 'bold italic 14pt sans-serif',\r
                      editable: true\r
                    })\r
                    .bindTwoWay('text', 'value', v => v.toString(), s => parseFloat(s))\r
                    .bind('stroke', 'color'),\r
                  new go.Shape({ fill: 'red', strokeWidth: 0 })\r
                    .apply(sliderActions, true)\r
                    .bind('geometry', 'value', barMeterGeometry),\r
                  new go.Shape('Circle', { width: 2, height: 2, fill: '#444' })\r
                )\r
            ),\r
          new go.TextBlock({ row: 1, font: 'bold 11pt sans-serif' })\r
            .bind('text')\r
        )\r
    );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 12\r
        })\r
        .add(\r
          new go.Shape({ isPanelMain: true, stroke: 'gray', strokeWidth: 9 }),\r
          new go.Shape({ isPanelMain: true, stroke: 'lightgray', strokeWidth: 5 }),\r
          new go.Shape({ isPanelMain: true, stroke: 'whitesmoke' })\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        {\r
          key: 1,\r
          value: 87,\r
          text: 'Vertical',\r
          category: 'Vertical',\r
          loc: '30 0',\r
          editable: true,\r
          color: 'yellow'\r
        },\r
        {\r
          key: 2,\r
          value: 23,\r
          text: 'Circular Meter',\r
          category: 'CircularMeter',\r
          loc: '250 -120',\r
          editable: true,\r
          color: 'skyblue'\r
        },\r
        {\r
          key: 3,\r
          value: 56,\r
          text: 'Needle Meter',\r
          category: 'NeedleMeter',\r
          loc: '250 110',\r
          editable: true,\r
          color: 'lightsalmon'\r
        },\r
        {\r
          key: 4,\r
          value: 16,\r
          max: 120,\r
          text: 'Horizontal',\r
          category: 'Horizontal',\r
          loc: '550 0',\r
          editable: true,\r
          color: 'green'\r
        },\r
        {\r
          key: 5,\r
          value: 23,\r
          max: 200,\r
          unit: 5,\r
          text: 'Bar Meter',\r
          category: 'BarMeter',\r
          loc: '550 200',\r
          editable: true,\r
          color: 'orange'\r
        }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 4 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 5 }\r
      ]\r
    );\r
\r
    loop(); // start a simple simulation\r
  }\r
\r
  function loop() {\r
    setTimeout(() => {\r
      myDiagram.commit(diag => {\r
        diag.links.each(l => {\r
          if (Math.random() < 0.2) return;\r
          var prev = l.fromNode.data.value;\r
          var now = l.toNode.data.value;\r
          if (prev > (l.fromNode.data.min || 0) && now < (l.toNode.data.max || 100)) {\r
            diag.model.set(l.fromNode.data, 'value', prev - 1);\r
            diag.model.set(l.toNode.data, 'value', now + 1);\r
          }\r
        });\r
      });\r
      loop();\r
    }, 500);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>Instruments are Panels that include:</p>\r
  <ul>\r
    <li>a scale which is a "Graduated" Panel showing a possible range of values</li>\r
    <li>one or more indicators that show the instrument's value</li>\r
  </ul>\r
  <p>\r
    Optionally there are other TextBlocks or Shapes that show additional information. Indicators can\r
    be Shapes or TextBlocks or more complicated Panels. For more about scales, please read\r
    <a href="../intro/graduatedPanels">Graduated Panels</a>. For simplicity, all of these\r
    instruments only show one value. But you could define instruments that show multiple values on\r
    the same scale, or that have multiple scales.\r
  </p>\r
  <p>\r
    When an instrument is also a control, the user can modify the instrument's value. When the\r
    instrument is editable, there may be a handle that the user can drag. This might be the same as\r
    the indicator or might be a different object.\r
  </p>\r
  <p>This sample defines five different types of instruments.</p>\r
\r
  <ul>\r
    <li><b>Horizontal</b>, a horizontal scale with a bar indicator and a slider handle</li>\r
    <li><b>Vertical</b>, a vertical scale with a bar indicator and a slider handle</li>\r
    <li><b>NeedleMeter</b>, a curved scale with a straight needle indicator</li>\r
    <li><b>CircularMeter</b>, a circular scale with a polygonal needle indicator</li>\r
    <li><b>BarMeter</b>, a circular scale with an annular bar indicator</li>\r
  </ul>\r
  <p>\r
    The value to be shown by the instrument is assumed to be the <code>data.value</code> property.\r
    The value is shown both textually in a TextBlock and graphically using an indicator on the\r
    scale. If the value of <code>data.editable</code> is true,\r
  </p>\r
  <ul>\r
    <li>\r
      the user can drag something to change the instrument's value -- the value is limited by the\r
      <a>Panel.graduatedMin</a> and <a>Panel.graduatedMax</a> values\r
    </li>\r
    <li>\r
      the user can in-place edit the TextBlock showing the value (if the node is selected, hit the\r
      F2 key)\r
    </li>\r
  </ul>\r
  <p>\r
    Of course you can change the details of anything you want to use. You might want to add more\r
    TextBlocks to show more information. A few properties already have data Bindings, such as:\r
  </p>\r
  <ul>\r
    <li><a>TextBlock.text</a> from <code>data.text</code>, for the name of the instrument</li>\r
    <li><a>Panel.graduatedMin</a> from <code>data.min</code>, to control the range of the scale</li>\r
    <li><a>Panel.graduatedMax</a> from <code>data.max</code>, to control the range of the scale</li>\r
    <li>(various) from <code>data.color</code>, to control some colors used by the instrument</li>\r
  </ul>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gauges`,`geometries`,`tools`];var g=y();l(`2oot0y`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};