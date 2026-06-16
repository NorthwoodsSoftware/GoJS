import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Wafer Map Analysis Diagram`,titleShort:`Wafer Map`,indexDescription:`Example of a semiconductor manufacturing wafer map tool.`,screenshot:`wafermap`,priority:.9,tags:[`customlayout`,`extensions`,`groups`,`monitoring`],description:`Example of a semiconductor manufacturing wafer map tool.`},htmlContent:`<div id="controls" style="margin-bottom: 8px;">\r
    <table>\r
      <tr>\r
        <td><label for="dieWidth">Die width (mm)</label></td>\r
        <td><label for="dieHeight">Die height (mm)</label></td>\r
        <td><label for="waferSize">Wafer size (mm)</label></td>\r
      </tr>\r
      <tr>\r
        <td><input id="dieWidth" type="number" min="1" step="1" value="10" style="width: 100%; padding: 4px;" /></td>\r
        <td><input id="dieHeight" type="number" min="1" step="1" value="10" style="width: 100%; padding: 4px;" /></td>\r
        <td><input id="waferSize" type="number" min="1" step="1" value="300" style="width: 100%; padding: 4px;" /></td>\r
        <td><button id="calculate" type="button" onclick="calculateDPW()" style="padding-inline: 20px;">Calculate</button></td>\r
      </tr>\r
    </table>\r
  </div>\r
  <div\r
    id="myDiagramDiv"\r
    style="\r
      border: solid 1px black;\r
      background-color: #151c26;\r
      width: 100%;\r
      height: 650px;\r
    "></div>`,jsCode:`// Current display mode toggle for thickness or defects\r
  let displayMode = "heat";\r
  // Reference to viewport info Parts\r
  let legendPart = null;\r
  let statusPart = null;\r
\r
  // Die fill colors for the usable/defective view\r
  const USABLE_COLOR = "#05fa2a";\r
  const DEFECTIVE_COLOR = "#fa0505";\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      "toolManager.hoverDelay": 25,\r
      // disable user scrolling and zooming\r
      allowHorizontalScroll: false,\r
      allowVerticalScroll: false,\r
      allowZoom: false\r
    });\r
\r
    // Default group template, creates the circle wafer outline\r
    myDiagram.groupTemplate =\r
      new go.Group("Spot", { \r
        // uses a custom layout to fit the die into a circle in as little space as possible\r
        layout: new PackedLayout(),\r
        movable: false,\r
        selectable: false\r
      })\r
        .add(\r
          new go.Placeholder(),   // measures group members\r
          new go.Shape("Circle", {\r
            fill: null,\r
            stroke: "white",\r
            strokeWidth: 3,\r
            alignment: go.Spot.Center\r
          })\r
            .bind("width")\r
            .bind("height", "width"),\r
          new go.TextBlock({ \r
            alignment: new go.Spot(0.5, 0, 0, -10), \r
            alignmentFocus: go.Spot.Bottom,\r
            stroke: "white"\r
          })\r
            .bind("text", "dpw", t => t + " DPW")\r
            // font scales its size to look the same in the viewport regardless of diagram scale\r
            .bind("font", "width", w => \`\${12 * (w / 300)}pt sans-serif\`)\r
        )\r
\r
    // Node template for die\r
    myDiagram.nodeTemplate = \r
      new go.Node("Auto", {\r
        movable: false,\r
        selectable: false,\r
        mouseEnter: (e, node) => {\r
          const shape = node.findObject("SHAPE");\r
          if (shape !== null) shape.stroke = "dodgerblue";\r
        },\r
        mouseLeave: (e, node) => {\r
          const shape = node.findObject("SHAPE");\r
          if (shape !== null) shape.stroke = "transparent";\r
        },\r
        toolTip: // shows oxide thickness and if its defective or usable on hover\r
          go.GraphObject.build("ToolTip")\r
            .add(\r
              new go.Panel("Vertical").add(\r
              new go.TextBlock({ margin: 4 })\r
                .bind("text", "thickness", t => t + " Å"),\r
              new go.TextBlock({ margin: 4 })\r
                .bind("text", "status")                \r
              )\r
            ) \r
      })\r
        .add(\r
          new go.Shape("Rectangle", {\r
            name: "SHAPE",\r
            fill: "white",\r
            stroke: "transparent",\r
            strokeWidth: 1,   // the default, here for clarity\r
            width: 20\r
          })\r
            .bind("fill")\r
            // subtract dimensions by stroke width so layout uses the correct width\r
            .bind("width", "width", w => w - 1)\r
            .bind("height", "height", h => h - 1)\r
        )\r
\r
    // Rescales the diagram to make the wafer appear the same size in the viewport\r
    // and generates new data when a new wafer is calculated\r
    myDiagram.addDiagramListener("LayoutCompleted", (e) => {\r
      scaleToFitCircle(e.diagram);\r
      generateData(e.diagram);\r
    });\r
\r
    // Rescales and centers the wafer when the viewport changes\r
    myDiagram.addDiagramListener("ViewportBoundsChanged", (e => {\r
      scaleToFitCircle(e.diagram);\r
    }))\r
\r
    // Initializes the model\r
    myDiagram.model = new go.GraphLinksModel();\r
\r
    // Add the thickness key and status viewer before the first layout so the status\r
    // viewer is measured (has a real naturalBounds) when scaleToFitCircle first runs\r
    legendPart = makeLegend();\r
    statusPart = makeStatusViewer();\r
    myDiagram.add(legendPart);\r
    myDiagram.add(statusPart);\r
    // Give the status viewer an empty data object so its bindings are realized\r
    statusPart.data = {};\r
\r
    // Calculate initial die per wafer and initialize nodes\r
    calculateDPW();\r
\r
  } // end init\r
\r
  // Scale the wafer to a fraction of the viewport and center it, insetting to the left\r
  // if a centered wafer would overlap the status viewer\r
  function scaleToFitCircle(diagram) {\r
    const group = diagram.findNodeForKey("main");\r
    if (group === null) return;\r
    const div = diagram.div;\r
    if (div === null) return;\r
\r
    const vw = div.clientWidth;\r
    const vh = div.clientHeight;\r
    const waferDoc = group.data.width;  // wafer diameter, in document units\r
\r
    // Reserved screen width for the status viewer in pixels\r
    const measured = statusPart !== null && statusPart.naturalBounds.isReal();\r
    const statusPx = measured ? statusPart.naturalBounds.width : 0;\r
    const reservePx = statusPx > 0 ? statusPx + 32 : 0;  // 16px box inset + 16px gap to wafer\r
\r
    // Fit to 85% of the viewport, if a centered wafer would overlap the status viewer,\r
    // fit and center it in the space to the left of the viewer instead\r
    const fullScale = 0.85 * Math.min(vw, vh) / waferDoc;\r
    const overlaps = (vw + waferDoc * fullScale) / 2 > vw - reservePx;\r
    let scale, targetCx;\r
    if (overlaps && reservePx > 0) {\r
      const availPx = Math.max(50, vw - reservePx);\r
      scale = 0.85 * Math.min(availPx, vh) / waferDoc;\r
      targetCx = availPx / 2;   // center within the space left of the viewer\r
    } else {\r
      scale = fullScale;\r
      targetCx = vw / 2;        // center in the whole viewport\r
    }\r
\r
    // Apply scale to wafer and use the diagram position to center\r
    if (Math.abs(diagram.scale - scale) > 0.001) diagram.scale = scale;\r
    const c = group.actualBounds.center;\r
    diagram.position = new go.Point(c.x - targetCx / scale, c.y - vh / 2 / scale);\r
  }\r
\r
  // Font and stroke for the status viewer\r
  const STATUS_TEXT_FONT = { font: "12pt sans-serif", stroke: "white" };\r
\r
  // Format a modelData count for display; shows "—" before any data is generated\r
  function countToText(n) {\r
    return n == null ? "—" : String(n);\r
  }\r
\r
  // Create a status viewer Part in the viewport layer to show number of defective die\r
  function makeStatusViewer() {\r
    return new go.Part("Auto", {\r
      layerName: "ViewportForeground", // unaffected by zooming or scrolling\r
      alignment: new go.Spot(1, 0, -16, 16),\r
      alignmentFocus: go.Spot.TopRight,\r
      selectable: false\r
    })\r
      .add(\r
        new go.Shape("RoundedRectangle", {\r
          fill: "#151c26",\r
          stroke: "lightgray",\r
          strokeWidth: 0.5\r
        }),\r
        new go.Panel("Table", {\r
          padding: 12,\r
          defaultAlignment: go.Spot.Left,\r
          defaultColumnSeparatorStroke: null,\r
          defaultRowSeparatorStroke: null\r
        })\r
          .addColumnDefinition(0, { stretch: go.Stretch.Horizontal })\r
          .addColumnDefinition(1, { alignment: go.Spot.Right })\r
          .addRowDefinition(1, {\r
            separatorStroke: "lightgray",\r
            separatorStrokeWidth: 1,\r
            separatorPadding: new go.Margin(8, 0, 0, 0)\r
          })\r
          .add(\r
            // table with text that is bound to the model\r
            new go.TextBlock("Status", {\r
              row: 0, column: 0, columnSpan: 2,\r
              font: "bold 14pt sans-serif",\r
              stroke: "white",\r
              alignment: go.Spot.Left\r
            }),\r
            new go.TextBlock("Die Per Wafer", {\r
              row: 1, column: 0, ...STATUS_TEXT_FONT,\r
              margin: new go.Margin(3, 40, 3, 0)\r
            }),\r
            new go.TextBlock({\r
              row: 1, column: 1, ...STATUS_TEXT_FONT,\r
              margin: new go.Margin(3, 0)\r
            })\r
              .bindModel("text", "dpw", countToText),\r
            new go.TextBlock("Usable", {\r
              row: 2, column: 0, ...STATUS_TEXT_FONT,\r
              margin: new go.Margin(3, 40, 3, 0)\r
            }),\r
            new go.TextBlock({\r
              row: 2, column: 1, ...STATUS_TEXT_FONT,\r
              margin: new go.Margin(3, 0)\r
            })\r
              .bindModel("text", "usable", countToText),\r
            new go.TextBlock("Defective", {\r
              row: 3, column: 0, ...STATUS_TEXT_FONT,\r
              margin: new go.Margin(3, 40, 3, 0)\r
            }),\r
            new go.TextBlock({\r
              row: 3, column: 1, ...STATUS_TEXT_FONT,\r
              margin: new go.Margin(3, 0)\r
            })\r
              .bindModel("text", "defective", countToText),\r
            go.GraphObject.build("Button", {    // button to switch viewing modes\r
              row: 4, column: 0, columnSpan: 2,\r
              stretch: go.Stretch.Horizontal,\r
              margin: new go.Margin(10, 0, 0, 0),\r
              click: (e, obj) => toggleMode(obj),\r
              "ButtonBorder.fill": "white",\r
              "ButtonBorder.stroke": "transparent",\r
              "_buttonFillOver": "lightgray"\r
            })\r
              .add(\r
                new go.TextBlock("See Defects", {\r
                  name: "LABEL",\r
                  stroke: "#151c26",\r
                  font: "12pt sans-serif",\r
                  margin: 5\r
                })\r
              )\r
          )\r
      );\r
  }\r
\r
  // Oxide film thickness target in Angstroms\r
  const TARGET_THICKNESS = 1000;\r
\r
  // Field shape amplitudes in Angstroms. Tuned so the total spread stays within a roughly +/-3% window\r
  const RADIAL_AMP = 22;   // center-thick radial profile (peak-to-edge swing)\r
  const EDGE_DROP = 14;    // additional sharp roll-off in the outer edge band\r
  const TILT_AMP = 4;      // gentle wafer-wide tilt from chamber asymmetry\r
  const NOISE_AMP = 5;     // spatially-correlated process noise (NOT per-die noise)\r
  const EDGE_START = 0.85; // normalized radius where the edge roll-off begins (between 0 and 1)\r
\r
  // Thickness bounds in Angstroms for data generation\r
  const MIN_THICKNESS = 958;\r
  const MAX_THICKNESS = 1022;\r
\r
  // Map an oxide thickness onto a color scale\r
  function thicknessToColor(thickness) {\r
    let t = (thickness - MIN_THICKNESS) / (MAX_THICKNESS - MIN_THICKNESS);\r
    t = Math.max(0, Math.min(1, t));\r
    const hue = (1 - t) * 240; // 240 = blue (thin), 0 = red (thick)\r
    return \`hsl(\${hue}, 100%, 50%)\`;\r
  }\r
\r
  // Builds a single row of the defect key\r
  function makeKeyRow(color, text) {\r
    return new go.Panel("Horizontal", { margin: new go.Margin(6, 0, 0, 0) })\r
      .add(\r
        new go.Shape("Rectangle", {\r
          width: 22,\r
          height: 22,\r
          fill: color,\r
          stroke: "lightgray",\r
          strokeWidth: 0.5,\r
          margin: new go.Margin(0, 10, 0, 0)\r
        }),\r
        new go.TextBlock(text, { stroke: "white", font: "15px sans-serif" })\r
      );\r
  }\r
\r
  // Builds the legend at the bottom right of the diagram, contains two panels "HEAT_KEY" and "DEFECT_KEY", \r
  // applyMode shows whichever matches the current displayMode\r
  function makeLegend() {\r
    // gradient brush matching thicknessToColor: blue (thin) at bottom, red (thick) at top\r
    const grad = new go.Brush("Linear", { start: go.Spot.Bottom, end: go.Spot.Top });\r
    const STOPS = 8;\r
    for (let i = 0; i <= STOPS; i++) {\r
      const f = i / STOPS;\r
      grad.addColorStop(f, thicknessToColor(MIN_THICKNESS + f * (MAX_THICKNESS - MIN_THICKNESS)));\r
    }\r
    // fraction from top where the target thickness falls on the bar\r
    const targetFrac = 1 - (TARGET_THICKNESS - MIN_THICKNESS) / (MAX_THICKNESS - MIN_THICKNESS);\r
\r
    return new go.Part("Auto", {\r
      layerName: "ViewportForeground", // unaffected by zooming or scrolling\r
      alignment: new go.Spot(1, 1, -16, -16),\r
      alignmentFocus: go.Spot.BottomRight,\r
      selectable: false,\r
      pickable: false\r
    })\r
      .add(\r
        new go.Shape("RoundedRectangle", {\r
          fill: "#151c26",\r
          stroke: "lightgray",\r
          strokeWidth: 0.5\r
        }),\r
        new go.Panel("Vertical", { margin: 14, defaultAlignment: go.Spot.Left })\r
          .add(\r
            // thickness scale, shown in heat mode\r
            new go.Panel("Vertical", { name: "HEAT_KEY", defaultAlignment: go.Spot.Left })\r
              .add(\r
                new go.TextBlock("Oxide thickness (Å)", {\r
                  stroke: "white",\r
                  font: "bold 16px sans-serif",\r
                  margin: new go.Margin(0, 0, 10, 0)\r
                }),\r
                new go.Panel("Spot")\r
                  .add(\r
                    new go.Shape("Rectangle", {\r
                      width: 26,\r
                      height: 210,\r
                      fill: grad,\r
                      stroke: "lightgray",\r
                      strokeWidth: 0.5\r
                    }),\r
                    // target tick mark across the bar\r
                    new go.Shape("Rectangle", {\r
                      width: 36,\r
                      height: 3,\r
                      fill: "white",\r
                      stroke: null,\r
                      alignment: new go.Spot(0.5, targetFrac)\r
                    }),\r
                    // value labels to the right of the bar\r
                    new go.TextBlock(\`\${MAX_THICKNESS}\`, {\r
                      alignment: new go.Spot(1, 0, 10, 0),\r
                      alignmentFocus: go.Spot.Left,\r
                      stroke: "white",\r
                      font: "15px sans-serif"\r
                    }),\r
                    new go.TextBlock(\`\${TARGET_THICKNESS} (target)\`, {\r
                      alignment: new go.Spot(1, targetFrac, 10, 0),\r
                      alignmentFocus: go.Spot.Left,\r
                      stroke: "white",\r
                      font: "15px sans-serif"\r
                    }),\r
                    new go.TextBlock(\`\${MIN_THICKNESS}\`, {\r
                      alignment: new go.Spot(1, 1, 10, 0),\r
                      alignmentFocus: go.Spot.Left,\r
                      stroke: "white",\r
                      font: "15px sans-serif"\r
                    })\r
                  )\r
              ),\r
            // usable/defective key, shown in defects mode\r
            new go.Panel("Vertical", { name: "DEFECT_KEY", visible: false, defaultAlignment: go.Spot.Left })\r
              .add(\r
                new go.TextBlock("Die status", {\r
                  stroke: "white",\r
                  font: "bold 16px sans-serif",\r
                  margin: new go.Margin(0, 0, 6, 0)\r
                }),\r
                makeKeyRow(USABLE_COLOR, "Usable"),\r
                makeKeyRow(DEFECTIVE_COLOR, "Defective")\r
              )\r
          )\r
      );\r
  }\r
\r
  // Generate a realistic oxide film thickness for each die and store it on the die's data\r
  function generateData(diagram) {\r
    const chips = [];\r
    diagram.nodes.each((node) => {\r
      if (node instanceof go.Group) return;\r
      chips.push(node);\r
    });\r
    if (chips.length === 0) return;\r
\r
    // find the wafer center (centroid) and radius (max die distance) after layout\r
    let cx = 0, cy = 0;\r
    chips.forEach((node) => {\r
      const loc = node.location;\r
      cx += loc.x;\r
      cy += loc.y;\r
    });\r
    cx /= chips.length;\r
    cy /= chips.length;\r
    let maxR = 1;\r
    chips.forEach((node) => {\r
      const dx = node.location.x - cx;\r
      const dy = node.location.y - cy;\r
      maxR = Math.max(maxR, Math.sqrt(dx * dx + dy * dy));\r
    });\r
\r
    // randomize the signature per run so each wafer looks different but plausible\r
    const tiltAngle = Math.random() * Math.PI * 2;\r
\r
    // Spatially-correlated noise = sum of a few low-frequency plane-wave modes\r
    // Low spatial frequency means adjacent dies share nearly the same value (a smooth field),\r
    // unlike independent per-die noise, amplitudes split so the total stays ~+/-NOISE_AMP.\r
    const NMODES = 4;\r
    const modes = [];\r
    for (let i = 0; i < NMODES; i++) {\r
      modes.push({\r
        fx: 1 + Math.random() * 2,            // ~1-1.5 wavelengths across the wafer\r
        fy: 1 + Math.random() * 2,\r
        phase: Math.random() * Math.PI * 2,\r
        amp: NOISE_AMP / NMODES\r
      });\r
    }\r
\r
    let usable = 0, defective = 0;\r
    diagram.model.commit((m) => {\r
      chips.forEach((node) => {\r
        const dx = (node.location.x - cx) / maxR;       // normalized -1..1\r
        const dy = (node.location.y - cy) / maxR;\r
        const r = Math.min(1, Math.sqrt(dx * dx + dy * dy));\r
\r
        // center-thick radial profile, centered so its disk mean is ~0\r
        let dev = RADIAL_AMP * (0.5 - r * r);\r
\r
        // sharp edge roll-off only in the outer band, accelerating toward the rim\r
        if (r > EDGE_START) {\r
          const e = (r - EDGE_START) / (1 - EDGE_START); // 0..1 across the edge band\r
          dev -= EDGE_DROP * e * e;\r
        }\r
\r
        // gentle wafer-wide tilt\r
        dev += TILT_AMP * (dx * Math.cos(tiltAngle) + dy * Math.sin(tiltAngle));\r
\r
        // smooth, spatially-correlated process noise\r
        for (let i = 0; i < NMODES; i++) {\r
          const md = modes[i];\r
          dev += md.amp * Math.sin(md.fx * dx + md.fy * dy + md.phase);\r
        }\r
\r
        // set thickness and usable/defective status on node data, coloring is handled by applyMode\r
        const status = Math.random() < .05 ? "Defective" : "Usable";\r
        if (status === "Defective") defective++; else usable++;\r
        m.set(node.data, "thickness", Math.round(TARGET_THICKNESS + dev));\r
        m.set(node.data, "status", status);\r
      });\r
\r
      // store wafer-wide totals on the model so the status viewer can bind to them\r
      m.set(m.modelData, "dpw", chips.length);\r
      m.set(m.modelData, "usable", usable);\r
      m.set(m.modelData, "defective", defective);\r
    }, "generate data");\r
\r
    // color the die for the current display mode\r
    applyMode(diagram);\r
  }\r
\r
  // Recolor every die from the data already on each node according to the current displayMode\r
  // "heat" uses oxide thickness and "defects" uses usable/defective status\r
  function applyMode(diagram) {\r
    diagram.model.commit((m) => {\r
      diagram.nodes.each((node) => {\r
        if (node instanceof go.Group) return;\r
        const d = node.data;\r
        const fill = displayMode === "heat"\r
          ? thicknessToColor(d.thickness)\r
          : (d.status === "Defective" ? DEFECTIVE_COLOR : USABLE_COLOR);\r
        m.set(d, "fill", fill);\r
      });\r
    }, "apply mode");\r
    // switch the legend between the thickness scale and the usable/defective key\r
    if (legendPart !== null) {\r
      const heatKey = legendPart.findObject("HEAT_KEY");\r
      const defectKey = legendPart.findObject("DEFECT_KEY");\r
      if (heatKey !== null) heatKey.visible = displayMode === "heat";\r
      if (defectKey !== null) defectKey.visible = displayMode === "defects";\r
    }\r
  }\r
\r
  // Switch between heat map and defect views\r
  function toggleMode(button) {\r
    displayMode = displayMode === "heat" ? "defects" : "heat";\r
    applyMode(myDiagram);\r
    const label = button.findObject("LABEL");\r
    if (label !== null) label.text = displayMode === "heat" ? "See Defects" : "See Thickness Map";\r
  }\r
\r
  // Calculates the die per wafer from user input and creates a new node array\r
  function calculateDPW() {\r
    const dieWidth = parseFloat(document.getElementById('dieWidth').value) || 10;\r
    const dieHeight = parseFloat(document.getElementById('dieHeight').value) || 10;\r
    const waferDiameter = parseFloat(document.getElementById('waferSize').value) || 300;\r
\r
    // DPW formula\r
    const diePerWafer = Math.floor(waferDiameter * Math.PI * ((waferDiameter / (4 * dieWidth * dieHeight)) - (1 / Math.sqrt(2 * dieWidth * dieHeight))));\r
    if (diePerWafer > 10000) { // prevents very large layouts to avoid crashing\r
      return\r
    }\r
\r
    // creates a group node to make the wafer border\r
    const chipArray = [{ key: "main", width: waferDiameter, dpw: diePerWafer, isGroup: true }];\r
    // pushes each die to the node data array\r
    for (let i = 0; i < diePerWafer; i++) {\r
      chipArray.push({ group: "main", width: dieWidth, height: dieHeight })\r
    }\r
    // sets the new array to the model\r
    myDiagram.model.nodeDataArray = chipArray;\r
  }\r
\r
  // Initialize with the DOM loads\r
  document.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Quadtree.js`,`../extensions/PackedLayout.js`],descriptionHtml:`<p>\r
    This sample depicts a wafer map diagram, a tool used in semiconductor manufacturing. It shows both the oxide thickness \r
    and usability of each die (chip) on the wafer via a <a href="../learn/tooltips">tool tip</a>, and the overview viewing modes can be toggled at the top right of the diagram. \r
    Enter the desired die dimensions and wafer size to calculate the die per wafer and see generated mock data.\r
  </p>\r
  <p>\r
    It uses the <a href="PackedLayout">PackedLayout</a> extension to fit several die nodes into an optimal circle shape, and a <a href="../learn/groups">Group</a> \r
    to create the wafer border. The status of each die is stored in the node data array, and its color is determined \r
    by a corresponding <a href="../learn/dataBinding">data binding</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`customlayout`,`extensions`,`groups`,`monitoring`];var g=y();l(`1d3vy0y`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};