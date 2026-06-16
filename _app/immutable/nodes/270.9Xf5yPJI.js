import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Thermometer Nodes using Graduated Panels`,indexDescription:`Graduated thermometer scales using Graduated Panel.`,screenshot:`thermometer`,priority:2,tags:[`gauges`,`geometries`],description:`A thermometer.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function getMercuryBrush(color) {\r
    return new go.Brush('Linear', {\r
      0: color,\r
      0.2: go.Brush.lighten(color),\r
      0.33: 'rgba(255, 255, 255, 1)',\r
      0.5: go.Brush.lighten(color),\r
      0.9: color,\r
      1: go.Brush.darken(color),\r
      start: go.Spot.Left,\r
      end: go.Spot.Right\r
    });\r
  }\r
\r
  function getBulbBrush(color) {\r
    return new go.Brush('Radial', {\r
      0.0: 'rgba(255, 255, 255, 1)',\r
      0.5: go.Brush.lighten(color),\r
      0.9: color,\r
      1: go.Brush.darken(color),\r
      start: new go.Spot(0.3, 0.3)\r
      // end: go.Spot.BottomRight,\r
    });\r
  }\r
\r
  function getStemBrush(color) {\r
    return new go.Brush('Linear', {\r
      0: color,\r
      0.2: go.Brush.lighten(color),\r
      0.5: go.Brush.lighten(color),\r
      0.9: color,\r
      1: go.Brush.darken(color),\r
      start: go.Spot.Left,\r
      end: go.Spot.Right\r
    });\r
  }\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.GridLayout({ isOngoing: false, wrappingColumn: 4 }),\r
      'animationManager.isEnabled': false,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // ResizingTool override: add just one handle, instead of eight\r
    myDiagram.toolManager.resizingTool.makeAdornment = function (resizeObj) {\r
      // method override must be function, not =>\r
      return new go.Adornment('Spot', {\r
          locationSpot: go.Spot.Center,\r
          category: this.name,\r
          adornedObject: resizeObj\r
        })\r
        .add(\r
          new go.Placeholder(),\r
          this.makeHandle(resizeObj, go.Spot.Top)\r
        );\r
    };\r
\r
    var ORIGINAL_HEIGHT = 400;\r
\r
    /* The thermometer node consists of a Spot Panel with 6 children:\r
          0: The BarSpace, which is the main element and\r
          1: The Farenheit scale, on the left\r
          2: The Celsius scale, on the right\r
          3: The shape that represents alcohol or mercury in the thermometer\r
          4: (Cosmetic) The stem that attaches to the bulb\r
          5: (Cosmetic) The bulb\r
\r
          The two Graduated Panels use alignmentFocusName to make sure their main Shapes\r
          line up with the Spot Panel"s main element, BarSpace.\r
\r
          1|0|2\r
          1|0|2\r
          1|0|2\r
          1|0|2\r
          1|3|2\r
          1|3|2\r
           |4|\r
           |5|\r
      */\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          resizable: true,\r
          resizeObjectName: 'BarSpace',\r
          locationObjectName: 'Bulb',\r
          locationSpot: go.Spot.Center,\r
          isShadowed: true,\r
          shadowOffset: new go.Point(6, 6),\r
          margin: 5\r
        })\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
            fill: new go.Brush('Linear', {\r
              0: '#fff',\r
              1: '#eee',\r
              start: go.Spot.TopLeft,\r
              end: go.Spot.TopRight\r
            })\r
          }),\r
          new go.Panel('Spot', { padding: 5 })\r
            .add(\r
              new go.Shape({\r
                  name: 'BarSpace',\r
                  width: 25,\r
                  height: ORIGINAL_HEIGHT,\r
                  strokeWidth: 0,\r
                  fill: new go.Brush('Linear', {\r
                    0: '#a2a19f',\r
                    0.33: '#fff',\r
                    0.6: '#a2a19f',\r
                    0.8: go.Brush.lighten('#a2a19f'),\r
                    1: go.Brush.darken('#a2a19f'),\r
                    start: go.Spot.Left,\r
                    end: go.Spot.Right\r
                  }),\r
                  isShadowed: true,\r
                  shadowVisible: true,\r
                  shadowOffset: new go.Point(2, 2),\r
                  shadowColor: '#eee'\r
                })\r
                .bindTwoWay('height'),\r
              // Farenheit scale, on the left:\r
              new go.Panel('Graduated', {\r
                  background: 'transparent',\r
                  graduatedMin: -40,\r
                  graduatedMax: 80,\r
                  graduatedTickBase: 0,\r
                  graduatedTickUnit: 1,\r
                  alignment: go.Spot.BottomLeft,\r
                  alignmentFocus: go.Spot.BottomLeft,\r
                  alignmentFocusName: 'line'\r
                })\r
                .bind('graduatedMax', '', data => {\r
                  if (data.type === 'scaling') return 80;\r
                  return data.height * 0.3 - 40;\r
                })\r
                .add(\r
                  new go.Shape({\r
                      name: 'line',\r
                      geometryString: 'M0 0 V-' + ORIGINAL_HEIGHT,\r
                      stroke: 'gray'\r
                    })\r
                    .bind('height'),\r
                  new go.Shape({\r
                    alignmentFocus: go.Spot.Bottom,\r
                    interval: 2,\r
                    strokeWidth: 1,\r
                    geometryString: 'M0 0 V15'\r
                  }),\r
                  new go.Shape({\r
                    alignmentFocus: go.Spot.Bottom,\r
                    interval: 10,\r
                    strokeWidth: 2,\r
                    geometryString: 'M0 0 V20'\r
                  }),\r
                  new go.TextBlock({\r
                    interval: 20,\r
                    font: 'bold 18px sans-serif',\r
                    alignmentFocus: new go.Spot(1, 0.5, 25, 0)\r
                  }),\r
                  // Mark 32 degrees on the farenheit scale:\r
                  new go.TextBlock({\r
                    interval: 16,\r
                    graduatedFunction: n => n === 32 ? '32—' : '',\r
                    font: 'bold 12px sans-serif',\r
                    stroke: 'red',\r
                    alignmentFocus: new go.Spot(1, 0.5, 22, 0)\r
                  })\r
                ),\r
              // Mercury/alcohol bar, which represents the values of farenheit and celsius\r
              new go.Shape({\r
                  width: 25,\r
                  strokeWidth: 0,\r
                  fill: getMercuryBrush('#797dbe'),\r
                  alignment: go.Spot.Bottom,\r
                  alignmentFocus: go.Spot.Bottom\r
                })\r
                .bind('fill', 'type', t => {\r
                  let baseColor = (t === 'scaling') ? 'red' : '#797dbe';\r
                  return getMercuryBrush(baseColor);\r
                })\r
                // .bind('shadowColor', 'type', t => {\r
                //   let baseColor = (t === 'scaling') ? 'red' : '#797dbe';\r
                //   return go.Brush.lighten(baseColor);\r
                // })\r
                // To determine the level, look at both data.farenheit and data.celsius, but prefer celsius\r
                .bind('height', '', data => {\r
                  var thermometerHeight = ORIGINAL_HEIGHT;\r
                  if (data.type === 'scaling') thermometerHeight = data.height;\r
                  if (data.celsius !== undefined) {\r
                    // (celsius + minimum value) / (total celsius range) * height\r
                    return Math.max(0, ((data.celsius + 40) / 67) * thermometerHeight);\r
                  } else if (data.farenheit !== undefined) {\r
                    // (farenheit + minimum value) / (total farenheit range) * height\r
                    return Math.max(0, ((data.farenheit + 40) / 120) * thermometerHeight);\r
                  } else {\r
                    return 0;\r
                  }\r
                })\r
                .bind('maxSize', 'height', h => new go.Size(NaN, h)),\r
\r
              // Celsius scale, on the right:\r
              new go.Panel('Graduated', {\r
                  background: 'transparent',\r
                  // -40 to 27 because we picked -40 to 80 for farenheit, and want them to line up\r
                  graduatedMin: -40,\r
                  graduatedMax: 27,\r
                  graduatedTickBase: 0,\r
                  graduatedTickUnit: 1,\r
                  alignment: go.Spot.BottomRight,\r
                  alignmentFocus: go.Spot.BottomRight,\r
                  alignmentFocusName: 'line2'\r
                })\r
                .bind('graduatedMax', '', data => {\r
                  if (data.type === 'scaling') return 27;\r
                  return data.height * 0.1675 - 40;\r
                })\r
                .add(\r
                  new go.Shape({\r
                      name: 'line2',\r
                      geometryString: 'M0 0 V-' + ORIGINAL_HEIGHT,\r
                      stroke: 'gray'\r
                    })\r
                    .bind('height'),\r
                  new go.Shape({\r
                    interval: 2,\r
                    strokeWidth: 1,\r
                    geometryString: 'M0 0 V15'\r
                  }),\r
                  new go.Shape({\r
                    interval: 10,\r
                    strokeWidth: 2,\r
                    geometryString: 'M0 0 V20'\r
                  }),\r
                  new go.TextBlock({\r
                    interval: 20,\r
                    textAlign: 'left',\r
                    font: 'bold 18px sans-serif',\r
                    alignmentFocus: go.Spot.Left,\r
                    segmentOffset: new go.Point(0, 25)\r
                  })\r
                ),\r
\r
              // Cosmetic: The stem and bulb\r
              new go.Shape({\r
                  width: 25,\r
                  height: 10,\r
                  strokeWidth: 0,\r
                  fill: getStemBrush('#797dbe'),\r
                  alignment: go.Spot.Bottom\r
                })\r
                .bind('fill', 'type', t => {\r
                  let baseColor = (t === 'scaling') ? 'red' : '#797dbe';\r
                  return getStemBrush(baseColor);\r
                }),\r
              new go.Shape('Circle', {\r
                  name: 'Bulb',\r
                  width: 55,\r
                  height: 55,\r
                  strokeWidth: 0,\r
                  fill: getBulbBrush('#797dbe'),\r
                  alignment: go.Spot.Bottom,\r
                  alignmentFocus: go.Spot.Top,\r
                  isShadowed: true,\r
                  shadowVisible: true,\r
                  shadowOffset: new go.Point(0, 0)\r
                })\r
                .bind('fill', 'type', t => {\r
                  let baseColor = (t === 'scaling') ? 'red' : '#797dbe';\r
                  return getBulbBrush(baseColor);\r
                })\r
            )\r
      ); // end node template\r
\r
    myDiagram.model = new go.GraphLinksModel([\r
      { height: 400, celsius: 20 },\r
      { height: 250, celsius: -10 },\r
\r
      { type: 'scaling', height: 400, farenheit: 22 /*, celsius: 0*/ },\r
      { type: 'scaling', height: 250, farenheit: 68 /*, celsius: 20*/ }\r
    ]);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample uses <a href="../intro/graduatedPanels">Graduated Panels</a> and <code>Panel.alignmentFocusName</code> to line up thermometer scales.</p>\r
  <p>\r
    The thermometers are resizable, with two types. For the first two (default), resizing the thermometer reduces or increases the range of the values. For the\r
    second two (<code>type: "scaling"</code>), resizing the thermometer keeps the range, and scales the thermometer.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gauges`,`geometries`];var g=y();l(`3scx6r`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};