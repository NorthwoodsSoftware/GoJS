import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Industrial Monitor SCADA Diagram`,titleShort:`SCADA Industrial Monitor`,indexDescription:`Example of a SCADA industrial monitoring diagram with updating data.`,screenshot:`industrialmonitor`,priority:.8,tags:[`geometries`,`links`,`process`,`monitoring`,`itemarrays`,`scada`],description:`SCADA industrial monitoring diagram with updating data.`},htmlContent:`<div\r
    id="myDiagramDiv"\r
    style="\r
      border: solid 1px black;\r
      background-color: #151c26;\r
      width: 100%;\r
      height: 700px;\r
    "></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      'undoManager.isEnabled': true,\r
      'rotatingTool.snapAngleMultiple': 90,\r
      'rotatingTool.snapAngleEpsilon': 45,\r
    });\r
\r
    // This sample defines several custom Shape geometries\r
    const tank1 = 'F M 0 0 L 0 75 25 100 50 75 50 0z'; // 50x100 sized-shape\r
    const tank2 = 'F M 0 0 L 0 100 10 100 10 90 40 90 40 100 50 100 50 0z'; // 50x100 sized-shape\r
    const tank3 = 'F M 0 100 L 0 25 A 25 25 0 0 1 50 25 L 50 100 z'; // 50x100 sized-shape\r
\r
    const labelLeft = 'F M 0 20 L 30 40 100 40 100 0 30 0 z';\r
    const labelRight = 'F M 0 0 L 70 0 100 20 70 40 0 40 z';\r
\r
    const valve = 'F1 M0 0 L40 20 40 0 0 20z M20 10 L20 30 M12 30 L28 30';\r
    const pump = 'F M 8 10 A 2 2 0 1 1 6 8 L 9 8 L 9 10 Z M 5 11 A 1 1 0 0 1 7 9';\r
    const sensor =\r
      'F M 0 0 L 15 15 L 15 20 L 5 20 L 5 15 L 0 15 L 0 10 L -2 10 L -2 4 L 0 4 Z';\r
\r
    const colors = {\r
      black: '#151c26',\r
      white: '#ffffff',\r
      gray: '#2c323b',\r
      green: '#7ba961',\r
      blue: '#00a9b0',\r
      pink: '#e483a2',\r
      yellow: '#f9c66a',\r
      orange: '#e48042',\r
      red: '#ed2d44',\r
    };\r
\r
    const textDefaults = { font: '10px InterVariable, sans-serif', stroke: colors.white };\r
\r
    // Tanks have a variable number of connection ports.\r
    // Each port must specify its location on the tank (alignment spot)\r
    // And potentially its fromSpot or toSpot\r
    const tankPort =\r
      new go.Panel()\r
        .bind('alignment', 'a')\r
        .bind('portId', 'p')\r
        .bind('fromSpot', 'fs')\r
        .bind('toSpot', 'ts')\r
        .add(new go.Shape('Diamond', { width: 10, height: 10, fill: colors.white }));\r
\r
    // Base template is a shape with a label\r
    myDiagram.nodeTemplateMap.add('',\r
      // Outer spot panel holding inner spot panel (main element) and ports\r
      new go.Node('Spot', { itemTemplate: tankPort })\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .bind('itemArray', 'ports')\r
        .add(\r
          // Inner spot panel holding Shape and Text label\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape({\r
                  geometryString: tank1,\r
                  strokeWidth: 1,\r
                  stroke: 'gray',\r
                  width: 75,\r
                  height: 140,\r
                  fill: new go.Brush('Linear', {\r
                    0: go.Brush.darken(colors.white),\r
                    0.2: colors.white,\r
                    0.33: go.Brush.lighten(colors.white),\r
                    0.5: colors.white,\r
                    1: go.Brush.darken(colors.white),\r
                    start: go.Spot.Left,\r
                    end: go.Spot.Right,\r
                  }),\r
                })\r
                .bind('width')\r
                .bind('height')\r
                .bind('geometryString', 'tankType'),\r
              // tank label\r
              new go.TextBlock({\r
                  font: 'bold 13px InterVariable, sans-serif',\r
                  stroke: colors.black,\r
                })\r
                .bind('text', 'key')\r
            )\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('label',\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({\r
              portId: '',\r
              fromSpot: go.Spot.Right,\r
              toSpot: go.Spot.LeftRightSides,\r
              geometryString: labelRight,\r
              strokeWidth: 4,\r
              // width: 100, height: 40,\r
              fill: colors.black,\r
            })\r
            .bind('width')\r
            .bind('height')\r
            .bind('geometryString', 'direction', d => d === 'right' ? labelRight : labelLeft)\r
            .bind('stroke', 'color'),\r
          new go.TextBlock({\r
              margin: new go.Margin(8, 40, 8, 8),\r
              textAlign: 'center',\r
              font: '12px sans-serif',\r
              stroke: colors.white,\r
              alignment: new go.Spot(0.1, 0.5),\r
            })\r
            .bind('margin', 'direction',\r
              d => d === 'right' ? new go.Margin(8, 40, 8, 8) : new go.Margin(8, 8, 8, 40))\r
            .bind('alignment', 'direction',\r
              d => d === 'right' ? new go.Spot(0.3, 0.5) : new go.Spot(0.7, 0.5))\r
            .bind('text')\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('valve',\r
      new go.Node('Vertical', {\r
          locationSpot: new go.Spot(0.5, 1, 0, -21),\r
          locationObjectName: 'SHAPE',\r
          selectionObjectName: 'SHAPE',\r
          rotatable: true,\r
        })\r
        .bindTwoWay('angle')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.TextBlock({\r
              background: colors.black,\r
              alignment: go.Spot.Center,\r
              textAlign: 'center',\r
              margin: 2,\r
              editable: true,\r
            })\r
            .set(textDefaults)\r
            .bind('text', 'key')\r
            // keep the text upright, even when the whole node has been rotated upside down\r
            .bindObject('angle', 'angle', a => a === 180 ? 180 : 0),\r
          new go.Shape({\r
              name: 'SHAPE',\r
              geometryString: valve,\r
              strokeWidth: 2,\r
              portId: '',\r
              fromSpot: new go.Spot(1, 0.35),\r
              toSpot: new go.Spot(0, 0.35),\r
            })\r
            .bind('fill', 'color')\r
            .bind('stroke', 'color', c => go.Brush.darkenBy(c, 0.3))\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('pump',\r
      new go.Node('Vertical', {\r
          locationSpot: new go.Spot(0.5, 1, 0, -21),\r
          locationObjectName: 'SHAPE',\r
          selectionObjectName: 'SHAPE',\r
          rotatable: true,\r
        })\r
        .bindTwoWay('angle')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.TextBlock({\r
              background: colors.black,\r
              alignment: go.Spot.Center,\r
              textAlign: 'center',\r
              margin: 2,\r
              editable: true,\r
            })\r
            .set(textDefaults)\r
            .bind('text', 'key')\r
            // keep the text upright, even when the whole node has been rotated upside down\r
            .bindObject('angle', 'angle', a => a === 180 ? 180 : 0),\r
          new go.Shape({\r
              name: 'SHAPE',\r
              geometryString: pump,\r
              width: 45,\r
              height: 40,\r
              strokeWidth: 2,\r
              portId: '',\r
              fromSpot: new go.Spot(1, 0.25),\r
              toSpot: new go.Spot(0, 0.5),\r
            })\r
            .bind('fill', 'color')\r
            .bind('stroke', 'color', c => Brush.darkenBy(c, 0.3))\r
        ));\r
\r
    // This is a component of the "monitor" node template\r
    const valuesTableItem =\r
      new go.Panel('TableRow')\r
        .add(\r
          new go.TextBlock('')\r
            .set(textDefaults)\r
            .bind('text', 'label'),\r
          new go.Panel('Spot', { column: 1 })\r
            .add(\r
              new go.Shape({\r
                stroke: colors.orange,\r
                fill: colors.black,\r
                margin: 2,\r
                width: 40,\r
                height: 15,\r
              }),\r
              new go.TextBlock('')\r
                .set(textDefaults)\r
                .bind('text', 'value')\r
            ),\r
          new go.TextBlock('', { column: 2, alignment: go.Spot.Left })\r
            .set(textDefaults)\r
            .bind('text', 'unit')\r
        );\r
\r
    const valuesTable =\r
      new go.Panel('Table', { itemTemplate: valuesTableItem })\r
        .bind('itemArray', 'values');\r
\r
    // This is a component of the "monitor" node template, showing a dynamic number of status blocks\r
    const statusPanelTemplate =\r
    new go.Panel('Spot')\r
      .add(\r
        new go.Shape({ width: 18, height: 18, fill: colors.white })\r
          .bind('fill'),\r
        new go.TextBlock()\r
          .set(textDefaults)\r
          .bind('text')\r
      );\r
    const statusPanel =\r
      new go.Panel('Horizontal', {\r
          width: 90,\r
          height: 20,\r
          itemTemplate: statusPanelTemplate,\r
        })\r
        .bind('itemArray', 'statuses');\r
\r
    // Monitor node for monitoring values, linked to a pump or valve\r
    myDiagram.nodeTemplateMap.add('monitor',\r
      new go.Node('Auto')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({ fill: colors.black, stroke: colors.white, strokeWidth: 2 }),\r
          new go.Panel('Vertical', { margin: 4 })\r
            .add(\r
              // Title\r
              new go.TextBlock('Title')\r
                .set(textDefaults)\r
                .bind('text', 'title'),\r
              // Notifications\r
              statusPanel,\r
              // Values\r
              valuesTable\r
            )\r
        ));\r
\r
    // Sensor node, linked to a tank\r
    myDiagram.nodeTemplateMap.add('sensor',\r
      new go.Node('Vertical')\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Horizontal', { margin: 4 })\r
            .add(\r
              new go.Shape({\r
                fill: colors.black,\r
                stroke: colors.white,\r
                strokeWidth: 2,\r
                geometryString: sensor,\r
                portId: '',\r
                fromSpot: new go.Spot(0, 0.4, 0, 0),\r
              }),\r
              new go.TextBlock({ margin: 2 })\r
                .set(textDefaults)\r
                .bind('text', 'key')\r
            ),\r
          new go.Panel('Horizontal')\r
            .add(\r
              new go.Panel('Spot', { column: 1 })\r
                .add(\r
                  new go.Shape({\r
                    stroke: colors.orange,\r
                    fill: colors.black,\r
                    margin: 2,\r
                    width: 40,\r
                    height: 15,\r
                  }),\r
                  new go.TextBlock('')\r
                    .set(textDefaults)\r
                    .bind('text', 'value')\r
                ),\r
              new go.TextBlock('', { column: 2, alignment: go.Spot.Left })\r
                .set(textDefaults)\r
                .bind('text', 'unit')\r
            )\r
        ));\r
\r
    myDiagram.linkTemplateMap.add('',\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 12,\r
          layerName: 'Background',\r
          toShortLength: 3,\r
        })\r
        .bind('fromEndSegmentLength', 'fromEndSeg')\r
        .bind('toEndSegmentLength', 'toEndSeg')\r
        .add(\r
          new go.Shape({ strokeWidth: 8, stroke: colors.black, isPanelMain: true }),\r
          new go.Shape({\r
              strokeWidth: 3.5,\r
              stroke: colors.green,\r
              isPanelMain: true,\r
            })\r
            .bind('stroke', 'color'),\r
          new go.Shape({ stroke: colors.green, fill: colors.green, toArrow: 'Triangle' })\r
            .bind('stroke', 'color')\r
            .bind('fill', 'color'),\r
          // Link label, invisible unless text is specified\r
          new go.Panel('Auto', { visible: false })\r
            .bind('visible', 'text', t => true)\r
            .add(\r
              new go.Shape('RoundedRectangle', { strokeWidth: 1, fill: colors.gray }),\r
              new go.TextBlock({ margin: new go.Margin(3, 1, 1, 1) })\r
                .set(textDefaults)\r
                .bind('text')\r
            )\r
        ));\r
\r
    myDiagram.linkTemplateMap.add('monitor',\r
      new go.Link({\r
          curve: go.Curve.Bezier,\r
          layerName: 'Background',\r
          fromSpot: go.Spot.Top,\r
          fromEndSegmentLength: 30,\r
        })\r
        .bind('fromSpot', 'fs')\r
        .bind('toSpot', 'ts')\r
        .add(\r
          new go.Shape({\r
              strokeWidth: 3,\r
              stroke: colors.white,\r
              strokeDashArray: [3, 4],\r
              isPanelMain: true,\r
            })\r
            .bind('stroke', 'color')\r
        ));\r
\r
    myDiagram.linkTemplateMap.add('sensor',\r
      new go.Link({ layerName: 'Background' })\r
        .add(\r
          new go.Shape({ strokeWidth: 1.5, stroke: colors.red, strokeDashArray: [2, 2] })\r
        ));\r
\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      linkFromPortIdProperty: 'fromPort',\r
      linkToPortIdProperty: 'toPort',\r
      nodeDataArray: [\r
        // LABELS\r
        {\r
          key: '1',\r
          category: 'label',\r
          text: 'Steam Condensate\\nHeader',\r
          color: colors.red,\r
          direction: 'left',\r
          pos: '0 -20',\r
        },\r
        {\r
          key: '2',\r
          category: 'label',\r
          text: 'From LP Steam\\nHeader',\r
          color: colors.red,\r
          pos: '0 160',\r
        },\r
        {\r
          key: '3',\r
          category: 'label',\r
          text: 'Soft Water',\r
          color: colors.green,\r
          pos: '80 240',\r
        },\r
        {\r
          key: '4',\r
          category: 'label',\r
          text: 'From ME-01A',\r
          color: colors.yellow,\r
          pos: '0 299.5',\r
        },\r
        {\r
          key: '5',\r
          category: 'label',\r
          text: 'To MRF-02',\r
          color: colors.yellow,\r
          direction: 'left',\r
          pos: '0 360.5',\r
        },\r
        {\r
          key: '6',\r
          category: 'label',\r
          text: 'CPO+PFAO\\nFrom Storage Tank',\r
          color: colors.yellow,\r
          pos: '0 423',\r
        },\r
        {\r
          key: '7',\r
          category: 'label',\r
          text: 'To MCOT',\r
          color: colors.yellow,\r
          direction: 'left',\r
          pos: '0 541',\r
        },\r
        {\r
          key: '8',\r
          category: 'label',\r
          text: 'To MPHE-02',\r
          color: colors.yellow,\r
          direction: 'left',\r
          pos: '0 615',\r
        },\r
        // TANKS\r
        {\r
          key: 'MHWT',\r
          tankType: tank3,\r
          color: colors.black,\r
          pos: '287 19',\r
          ports: [\r
            { p: 'BL1', a: new go.Spot(0, 1, 0, -50) },\r
            { p: 'BL2', a: new go.Spot(0, 1, 0, -30) },\r
            { p: 'BL3', a: new go.Spot(0, 1, 0, -10) },\r
            { p: 'BR', fs: go.Spot.RightSide, a: new go.Spot(1, 1, 0, -30) },\r
            {\r
              p: 'SensorR',\r
              type: 'sensor',\r
              ts: go.Spot.RightSide,\r
              a: new go.Spot(1, 0.5, 0, 0),\r
            },\r
          ],\r
        },\r
        {\r
          key: 'MSF',\r
          color: colors.black,\r
          pos: '244 418',\r
          ports: [\r
            { p: 'TL', a: new go.Spot(0, 0, 0, 30) },\r
            { p: 'BR', a: new go.Spot(1, 1, 0, -50), fs: go.Spot.Right },\r
            { p: 'B', a: new go.Spot(0.5, 1, 0, 0) },\r
          ],\r
        },\r
        {\r
          key: 'ME-01',\r
          color: colors.black,\r
          tankType: tank2,\r
          pos: '297 261',\r
          width: 70,\r
          height: 120,\r
          ports: [\r
            { p: 'TL', a: new go.Spot(0, 0, 0, 30) },\r
            { p: 'BL', a: new go.Spot(0, 1, 0, -30) },\r
            { p: 'TR', fs: go.Spot.RightSide, a: new go.Spot(1, 0, 0, 30) },\r
            { p: 'BR', ts: go.Spot.RightSide, a: new go.Spot(1, 1, 0, -30) },\r
          ],\r
        },\r
        {\r
          key: 'MRM',\r
          color: colors.black,\r
          pos: '529 370',\r
          width: 60,\r
          height: 80,\r
          ports: [\r
            { p: 'T1', a: new go.Spot(0, 0, 10, 0), ts: go.Spot.Top },\r
            { p: 'T2', a: new go.Spot(0, 0, 30, 0), ts: go.Spot.Top },\r
            { p: 'T3', a: new go.Spot(0, 0, 50, 0), ts: go.Spot.Top },\r
            { p: 'B', a: new go.Spot(0.5, 1, 0, 0), fs: go.Spot.Bottom },\r
          ],\r
        },\r
        {\r
          key: 'MZM',\r
          color: colors.black,\r
          pos: '680 440',\r
          width: 50,\r
          height: 80,\r
          ports: [\r
            { p: 'T', a: new go.Spot(0.5, 0, 0, 0), fs: go.Spot.Top },\r
            { p: 'B', a: new go.Spot(0.5, 1, 0, 0), ts: go.Spot.Bottom },\r
          ],\r
        },\r
        {\r
          key: 'MPAT',\r
          color: colors.black,\r
          pos: '865 30',\r
          ports: [{ p: 'L', a: new go.Spot(0, 0.5, 0, 0), fs: go.Spot.Left }],\r
        },\r
        {\r
          key: 'MPHE-01',\r
          color: colors.black,\r
          tankType: tank2,\r
          pos: '860 282',\r
          width: 70,\r
          height: 120,\r
          ports: [\r
            { p: 'TL', a: new go.Spot(0, 0, 0, 30), fs: go.Spot.LeftSide },\r
            { p: 'BL', a: new go.Spot(0, 1, 0, -30) },\r
            {\r
              p: 'TR',\r
              fs: go.Spot.RightSide,\r
              a: new go.Spot(1, 0, 0, 30),\r
              ts: go.Spot.RightSide,\r
            },\r
            { p: 'BR', fs: go.Spot.RightSide, a: new go.Spot(1, 1, 0, -30) },\r
          ],\r
        },\r
        {\r
          key: 'MHT',\r
          color: colors.black,\r
          pos: '769 440',\r
          ports: [\r
            { p: 'T', a: new go.Spot(0.5, 0, 0, 0), fs: go.Spot.Top },\r
            { p: 'B', a: new go.Spot(0.5, 1, 0, 0), fs: go.Spot.Bottom },\r
            {\r
              p: 'SensorB',\r
              a: new go.Spot(1, 0.7, 0, 0),\r
              type: 'sensor',\r
              ts: go.Spot.RightSide,\r
            },\r
          ],\r
        },\r
        // VALVES\r
        { key: 'TCV102', category: 'valve', color: colors.red, pos: '197 130' },\r
        { key: 'FCV101', category: 'valve', color: colors.red, pos: '477 585' },\r
        {\r
          key: 'LCV101',\r
          category: 'valve',\r
          color: colors.red,\r
          pos: '620 615.88',\r
          angle: 180,\r
        },\r
        { key: 'FM102', category: 'valve', color: colors.white, pos: '508 167' },\r
        {\r
          key: 'FM103',\r
          category: 'valve',\r
          color: colors.white,\r
          pos: '706 184',\r
          angle: 180,\r
        },\r
        { key: 'FIC101', category: 'valve', color: colors.white, pos: '396 585' },\r
        { key: 'P03', category: 'pump', color: colors.pink, pos: '429 178' },\r
        {\r
          key: 'P04',\r
          category: 'pump',\r
          color: colors.pink,\r
          pos: '800 173.5',\r
          angle: 180,\r
        },\r
        {\r
          key: 'P102',\r
          category: 'pump',\r
          color: colors.pink,\r
          pos: '720 605.3',\r
          angle: 180,\r
        },\r
        // MONITOR PANELS\r
        {\r
          key: 'cTCV102',\r
          title: 'Monitor TCV102',\r
          category: 'monitor',\r
          pos: '32 35',\r
          values: [\r
            { label: 'SV', unit: '°C', value: '12.0' },\r
            { label: 'PV', unit: '°C', value: '12.0' },\r
            { label: 'OP', unit: '%', value: '25.0' },\r
          ],\r
          statuses: [\r
            { fill: colors.green },\r
            { fill: colors.green },\r
            { fill: colors.green },\r
          ],\r
        },\r
        {\r
          key: 'cFCV101',\r
          title: 'Monitor FCV101',\r
          category: 'monitor',\r
          pos: '360 413',\r
          values: [\r
            { label: 'SV', unit: 'KG/hr', value: '0.0' },\r
            { label: 'PV', unit: 'KG/hr', value: '0.0' },\r
            { label: 'OP', unit: '%', value: '25.0' },\r
          ],\r
          statuses: [\r
            { fill: colors.green },\r
            { fill: colors.white },\r
            { fill: colors.white },\r
          ],\r
        },\r
        {\r
          key: 'cFM102',\r
          title: 'Monitor FM102',\r
          category: 'monitor',\r
          pos: '465 18',\r
          values: [\r
            { label: 'SV', unit: 'KG/hr', value: '0.0' },\r
            { label: 'PV', unit: 'KG/hr', value: '0.0' },\r
            { label: 'OP', unit: '%', value: '25.0' },\r
          ],\r
          statuses: [{ fill: colors.white }, { fill: colors.white }],\r
        },\r
        {\r
          key: 'cFM103',\r
          title: 'Monitor FM103',\r
          category: 'monitor',\r
          pos: '594 28',\r
          values: [\r
            { label: 'SV', unit: 'KG/hr', value: '0.0' },\r
            { label: 'PV', unit: 'KG/hr', value: '0.0' },\r
            { label: 'OP', unit: '%', value: '25.0' },\r
          ],\r
          statuses: [\r
            { fill: colors.green },\r
            { fill: colors.white },\r
            { fill: colors.white },\r
          ],\r
        },\r
        // SENSORS:\r
        { key: 'S1', category: 'sensor', value: '12.0', pos: '385 68', unit: '°C' },\r
        { key: 'S2', category: 'sensor', value: '12.0', pos: '870 515', unit: '°C' },\r
      ],\r
      linkDataArray: [\r
        { from: 'MHWT', to: '1', text: 'LPS', color: colors.red, fromPort: 'BL1' },\r
        {\r
          from: 'MPHE-01',\r
          to: '1',\r
          text: 'SCH',\r
          color: colors.red,\r
          fromPort: 'BR',\r
          fromEndSeg: 25,\r
        },\r
        { from: '2', to: 'TCV102', text: 'SC', color: colors.red },\r
        { from: 'TCV102', to: 'MHWT', color: colors.red, toPort: 'BL2' },\r
        { from: '2', to: 'MPHE-01', color: colors.red, toPort: 'TR' },\r
        { from: '3', to: 'MHWT', toPort: 'BL3' },\r
\r
        { from: '4', to: 'ME-01', text: 'DO', toPort: 'TL', color: colors.yellow },\r
        { from: '5', to: 'ME-01', text: 'DO', toPort: 'BL', color: colors.yellow },\r
        { from: '6', to: 'MSF', text: 'CPO', color: colors.yellow, toPort: 'TL' },\r
        { from: 'MSF', to: '7', text: 'CPO', color: colors.yellow, fromPort: 'B' },\r
        { from: 'LCV101', to: '8', text: 'CPO', color: colors.yellow },\r
\r
        { from: 'MSF', to: 'FIC101', fromPort: 'BR' },\r
        { from: 'FIC101', to: 'FCV101' },\r
        { from: 'FCV101', to: 'ME-01', toPort: 'BR' },\r
        { from: 'ME-01', to: 'MRM', color: colors.green, fromPort: 'TR', toPort: 'T2' },\r
\r
        { from: 'MHWT', to: 'P03', color: colors.green, fromPort: 'BR' },\r
        { from: 'P03', to: 'FM102', color: colors.green },\r
        { from: 'FM102', to: 'MRM', color: colors.green, toPort: 'T1' },\r
        { from: 'MPAT', to: 'P04', color: colors.yellow, fromPort: 'L' },\r
        { from: 'P04', to: 'FM103', color: colors.yellow },\r
        { from: 'FM103', to: 'MRM', color: colors.yellow, toPort: 'T3' },\r
        { from: 'MRM', to: 'MZM', fromPort: 'B', toPort: 'B', toEndSeg: 15 },\r
        { from: 'MZM', to: 'MPHE-01', fromPort: 'T', toPort: 'BL' },\r
        { from: 'MPHE-01', to: 'MHT', fromPort: 'TL', toPort: 'T' },\r
        { from: 'P102', to: 'LCV101' },\r
        { from: 'MHT', to: 'P102', fromPort: 'B' },\r
\r
        { category: 'monitor', from: 'TCV102', to: 'cTCV102', ts: go.Spot.Right },\r
        { category: 'monitor', from: 'FCV101', to: 'cFCV101', ts: go.Spot.Right },\r
        { category: 'monitor', from: 'FCV101', to: 'FIC101', ts: go.Spot.Top },\r
        { category: 'monitor', from: 'FM102', to: 'cFM102', ts: go.Spot.Bottom },\r
        {\r
          category: 'monitor',\r
          from: 'FM103',\r
          to: 'cFM103',\r
          fs: go.Spot.Bottom,\r
          ts: go.Spot.Bottom,\r
        },\r
        // sensor links (same category)\r
        { category: 'sensor', from: 'S1', to: 'MHWT', toPort: 'SensorR' },\r
        { category: 'sensor', from: 'S2', to: 'MHT', toPort: 'SensorB' },\r
      ],\r
    }); // end model assignment\r
\r
    // Simulate data coming in to the monitor\r
    // This randomly assigns new data to the itemArrays in the monitor nodes\r
    // and the data in the sensor nodes\r
    setInterval(() => {\r
      myDiagram.commit(() => {\r
        const sensorKeys = ['S1', 'S2'].map(k => myDiagram.findNodeForKey(k));\r
        for (const n of sensorKeys) {\r
          const d = n.data;\r
          myDiagram.model.set(\r
            d,\r
            'value',\r
            roundAndFloor(parseFloat(d.value) + random(-0.5, 0.55), 1)\r
          );\r
        }\r
      }, null); // null tells the Diagram to skip the undo manager\r
\r
      if (+new Date() % 2 === 0) return; // do the updates below half as often\r
      myDiagram.commit(() => {\r
        const controlNodes = ['cTCV102', 'cFCV101', 'cFM102', 'cFM103']\r
            .map(k => myDiagram.findNodeForKey(k));\r
        for (const n of controlNodes) {\r
          const vals = n.data.values;\r
          myDiagram.model.set(\r
            vals[0],\r
            'value',\r
            roundAndFloor(parseFloat(vals[0].value) + random(-0.5, 0.55), 1)\r
          );\r
          myDiagram.model.set(\r
            vals[1],\r
            'value',\r
            roundAndFloor(parseFloat(vals[1].value) + random(-0.3, 0.35), 1)\r
          );\r
          myDiagram.model.set(\r
            vals[2],\r
            'value',\r
            roundAndFloor(parseFloat(vals[2].value) + random(-0.2, 0.2), 1)\r
          );\r
        }\r
      }, null); // null tells the Diagram to skip the undo manager\r
\r
      // rarely, randomly change a monitor color block\r
      if (+new Date() % 15 === 0) return;\r
      myDiagram.commit(() => {\r
        const controlNodes = ['cTCV102', 'cFCV101', 'cFM102', 'cFM103']\r
            .map(k => myDiagram.findNodeForKey(k));\r
        for (const n of controlNodes) {\r
          const vals = n.data.statuses;\r
          myDiagram.model.set(\r
            vals[0],\r
            'fill',\r
            Math.random() > 0.5 ? colors.green : colors.white\r
          );\r
          myDiagram.model.set(\r
            vals[1],\r
            'fill',\r
            Math.random() > 0.5 ? colors.yellow : colors.white\r
          );\r
        }\r
      }, null); // null tells the Diagram to skip the undo manager\r
    }, 550);\r
  } // end init\r
\r
  function roundAndFloor(num, decimalPlaces = 0) {\r
    num = Math.round(num + 'e' + decimalPlaces);\r
    return Math.max(Number(num + 'e' + -decimalPlaces), 0);\r
  }\r
  function random(min, max) {\r
    return Math.random() * (max - min) + min;\r
  }\r
\r
  window.click = function () {};\r
\r
  document.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This SCADA industrial diagram displays a mock water treatment setup. Some nodes act as\r
    monitoring panels, and simulated data is updated periodically. GoJS is a common choice for industries\r
    wishing to make SCADA diagrams, Manufacturing Operations Management diagrams, process flows, and more.\r
  </p>\r
  <p>\r
    Although this sample is meant to demonstrate monitoring, users can rotate valves, and\r
    move nodes to see the link's built-in\r
    <a href="../learn/links#Routing">AvoidsNodes routing</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`geometries`,`links`,`process`,`monitoring`,`itemarrays`,`scada`];var g=y();l(`wsym20`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};