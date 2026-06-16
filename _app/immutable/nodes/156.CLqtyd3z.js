import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`High-Performance HMI Operator Screen`,titleShort:`HMI Operator Screen`,indexDescription:`A modern ISA-101 style high-performance HMI for a process skid: live simulation, an alarm banner, moving analog indicators, and clickable equipment icons.`,screenshot:`hmioperatorscreen`,priority:.99,tags:[`monitoring`,`scada`,`process`,`gauges`,`itemarrays`,`geometries`],description:`An ISA-101 high-performance HMI operator screen for a beverage mix & transfer skid: a live first-order-lag simulation, an alarm banner with per-row acknowledge and a 1 Hz unacknowledged blink, moving analog indicators, and click-to-command pumps and valves.`},htmlContent:`<div id="myDiagramDiv" style="background-color: #c8c8c8; border: 1px solid #999; width: 100%; height: 700px"></div>`,jsCode:`// ISA-101 style color palette: mostly gray, color used only for abnormal conditions\r
  const C = Object.freeze({\r
    panel: '#b6b6b6', panel2: '#c2c2c2', panelDk: '#a9a9a9',\r
    outline: '#7a7a7a', pipe: '#8c8c8c',\r
    text: '#2f2f2f', text2: '#5a5a5a',\r
    on: '#f4f4f4', off: '#6b6b6b',          // running/open vs stopped/closed fill\r
    band: '#9fb3c0', level: '#a7bac6', track: '#bdbdbd',\r
    p1: '#e12c2c', p2: '#f2b134', p3: '#46c2e0' // the only colors on screen\r
  });\r
  const PRI = { 1: C.p1, 2: C.p2, 3: C.p3 };\r
  const F = 'sans-serif';\r
\r
  // Instrument ranges, normal operating band, and decimals/units for the moving analog indicators\r
  const CFG = {\r
    'FT-101': { min: 0, max: 600, band: [350, 470], dec: 0, unit: 'L/min' },\r
    'LT-103': { min: 0, max: 100, band: [40, 80], dec: 1, unit: '%' },\r
    'TT-104': { min: 0, max: 120, band: [65, 78], dec: 1, unit: '°C' },\r
    'PT-105': { min: 0, max: 10, band: [1, 6], dec: 1, unit: 'bar' }\r
  };\r
  // Alarm limits: tag -> { level: [limit, priority] }; the devices show a square alarm indictor\r
  const LIMITS = {\r
    'LT-103': { hi: [85, 2], lo: [15, 2] },\r
    'TT-104': { hi: [75, 1] },\r
    'PT-105': { hi: [6, 2] }\r
  };\r
  const ALM_DEVICE = { 'LT-103': 'TK-101', 'TT-104': 'TIC-104', 'PT-105': 'PT-105' };\r
\r
  let myDiagram;\r
  let interval = 200, tickTimer = null;\r
\r
  function setTickInterval(ms) {\r
    interval = clamp(ms, 50, 500);\r
    clearInterval(tickTimer);\r
    tickTimer = setInterval(tick, interval);\r
  }\r
\r
  // Simulation state object, pv is process values, alarms contains the alarm list\r
  const S = { pv: { 'FT-101': 390, 'LT-103': 56, 'TT-104': 71, 'PT-105': 3.4 }, alarms: [] };\r
\r
  // Utility functions\r
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v); // bind values\r
  const fmt = (tag, v) => Number(v).toFixed(CFG[tag].dec) + ' ' + CFG[tag].unit;\r
  const clock = () => new Date().toLocaleTimeString('en-US', { hour12: false });\r
  // Finds earest bound data by walking up the panel chain\r
  function nearestData(o) { while (o) { if (o.data) return o.data; o = o.panel; } return null; }\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { // fix diagram to make it look like a monitor screen\r
      autoScale: go.AutoScale.Uniform, contentAlignment: go.Spot.Center,\r
      allowHorizontalScroll: false, allowVerticalScroll: false, allowZoom: false,\r
      allowMove: false, allowSelect: false, allowCopy: false, allowDelete: false,\r
      'animationManager.isEnabled': false, 'undoManager.isEnabled': false,\r
      'toolManager.hoverDelay': 200\r
    });\r
\r
    buildTemplates();\r
    myDiagram.model = buildModel();\r
\r
    // one standing acknowledged advisory, so the screen is realistically never empty\r
    S.alarms.push({ id: 'XV-114/oos', time: clock(), pri: 3, tag: 'XV-114', msg: 'XV-114 out of service', acked: true });\r
    renderAlarms();\r
\r
    setTickInterval(interval); // single heartbeat drives the simulation\r
  }\r
\r
  // TEMPLATES\r
  function buildTemplates() {\r
    const tip = (fn) => go.GraphObject.build('ToolTip').add(\r
      new go.TextBlock({ margin: 5, font: '11px ' + F, stroke: C.text }).bind('text', '', fn));\r
\r
    // a small alarm priority square shown next to a device, blinks while unacked\r
    const alarmSquare = () => new go.Panel('Auto', { alignment: go.Spot.TopRight, alignmentFocus: go.Spot.Center, width: 25, height: 25 })\r
      .bind('visible', 'almpri', (p) => p > 0)\r
      .add(\r
        new go.Shape('Rectangle', { strokeWidth: 0 }).bind(new go.Binding('fill', 'blink', squareFill).ofModel()),\r
        new go.TextBlock({ font: 'bold 11px ' + F })\r
          .bind('text', 'almpri', (p) => '' + p)\r
          .bind('stroke', 'almpri', (p) => (p === 1 ? 'white' : '#222')));\r
\r
    // header\r
    myDiagram.nodeTemplateMap.add('header',\r
      new go.Node('Spot', { selectable: false, locationSpot: go.Spot.TopLeft })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape('Rectangle', { width: 1120, height: 38, fill: C.panel, strokeWidth: 0 }),\r
          new go.TextBlock('UNIT 100 — MIX & TRANSFER SKID', { font: 'bold 14px ' + F, stroke: C.text, alignment: new go.Spot(0, 0.5, 14, 0), alignmentFocus: go.Spot.Left }),\r
          new go.TextBlock({ font: 'bold 13px ' + F, stroke: C.text, alignment: new go.Spot(1, 0.5, -14, 0), alignmentFocus: go.Spot.Right }).bind('text', 'clock')));\r
\r
    // alarm banner\r
    myDiagram.nodeTemplateMap.add('banner',\r
      new go.Node('Auto', { selectable: false, locationSpot: go.Spot.TopLeft })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape('Rectangle', { fill: '#bfbfbf', stroke: null, width: 1120, height: 74 }),\r
          new go.Panel('Vertical', { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft, defaultAlignment: go.Spot.Left })\r
            .add(\r
              new go.Panel('Horizontal', { width: 1120, height: 18, background: C.panelDk })\r
                .add(\r
                  new go.TextBlock('ALARMS', { font: 'bold 12px ' + F, stroke: C.text, margin: new go.Margin(2, 8) }),\r
                  new go.TextBlock({ font: '12px ' + F, stroke: C.text2, margin: new go.Margin(2, 8) }).bind('text', 'summary'),\r
                  new go.Panel('Auto', { margin: new go.Margin(1, 8), cursor: 'pointer', click: () => ackAll(), toolTip: tip(() => 'Acknowledge all alarms') })\r
                    .add(new go.Shape('Rectangle', { fill: C.panel2, stroke: C.outline, strokeWidth: 0.75 }),\r
                      new go.TextBlock('ACK ALL', { font: 'bold 12px ' + F, stroke: C.text, margin: new go.Margin(2, 7) }))),\r
              new go.Panel('Vertical', { itemTemplate: alarmRow(), defaultAlignment: go.Spot.Left }).bind('itemArray', 'alarms'))));\r
\r
    // room temp slider, impacts process temp indicator\r
    const SL_MIN = 15, SL_MAX = 45, SL_W = 120;\r
    function setSliderTemp(e, obj) {\r
      // map the pointer's x across the TRACK shape to a value; the ActionTool calls this on down + drag\r
      const track = obj.findObject('TRACK');\r
      const frac = clamp(track.getLocalPoint(e.documentPoint).x / track.actualBounds.width, 0, 1);\r
      const val = Math.round(SL_MIN + frac * (SL_MAX - SL_MIN));\r
      const data = obj.part.data;\r
      if (data.temp !== val) e.diagram.commit((d) => d.model.set(data, 'temp', val), null);\r
    }\r
    myDiagram.nodeTemplateMap.add('roomTemp',\r
      new go.Node('Auto', { selectable: false, locationSpot: go.Spot.TopLeft, width: 200 })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape('Rectangle', { fill: C.panel2, stroke: C.outline }),\r
          new go.Panel('Vertical', { margin: 6, defaultAlignment: go.Spot.Left })\r
            .add(\r
              new go.TextBlock('ROOM TEMP', { font: 'bold 10px ' + F, stroke: C.text2 }),\r
              new go.Panel('Horizontal', { margin: new go.Margin(4, 0, 0, 0) })\r
                .add(\r
                  new go.Panel('Spot', { isActionable: true, cursor: 'pointer', actionDown: setSliderTemp, actionMove: setSliderTemp })\r
                    .add(\r
                      new go.Shape('Rectangle', { name: 'TRACK', width: SL_W, height: 18, fill: 'transparent', strokeWidth: 0 }),\r
                      new go.Shape('Rectangle', { width: SL_W, height: 5, fill: C.track, stroke: C.outline, strokeWidth: 0.5, alignment: go.Spot.Center }),\r
                      new go.Shape('Rectangle', { width: 8, height: 16, fill: C.panel, stroke: C.outline, strokeWidth: 1 })\r
                        .bind('alignment', 'temp', (t) => new go.Spot((t - SL_MIN) / (SL_MAX - SL_MIN), 0.5))\r
                    ),\r
                  new go.TextBlock({ font: 'bold 11px ' + F, stroke: C.text, width: 44, textAlign: 'right', margin: new go.Margin(0, 0, 0, 6) })\r
                    .bind('text', 'temp', (t) => t + ' °C')\r
                )\r
            )\r
        ));\r
\r
    myDiagram.nodeTemplateMap.add('tickSpeed',\r
      new go.Node('Auto', { selectable: false, locationSpot: go.Spot.TopLeft, width: 200 })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape("Rectangle", { fill: C.panel2, stroke: C.outline }),\r
          new go.Panel('Horizontal')\r
            .add(\r
              go.GraphObject.build("Button", {\r
                margin: 3,\r
                click: () => { setTickInterval(interval + 15) },\r
                "ButtonBorder.fill": C.panel2,\r
                "ButtonBorder.stroke": C.panelDk\r
              })\r
                .add(\r
                  new go.Shape("MinusLine", { width: 10, height: 10, strokeWidth: 2, stroke: C.text2 })\r
                ),\r
              new go.TextBlock("Change Sim Speed", { font: "10pt" + F, stroke: C.text2, margin: new go.Margin(2, 20) }),\r
              go.GraphObject.build("Button", {\r
                margin: 3,\r
                click: () => { setTickInterval(interval - 15) },\r
                "ButtonBorder.fill": C.panel2,\r
                "ButtonBorder.stroke": C.panelDk\r
              })\r
                .add(\r
                  new go.Shape("PlusLine", { width: 10, height: 10, strokeWidth: 2, stroke: C.text2 })\r
                )\r
            )\r
        ));\r
\r
    // off-sheet connector chevron\r
    // flow nodes are anchored by their PORT element's center to align links\r
    myDiagram.nodeTemplateMap.add('chevron',\r
      new go.Node('Spot', { locationObjectName: 'PORT', locationSpot: go.Spot.Center }).bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape({ name: 'PORT', geometryString: 'F1 M0 0 L30 0 L42 10 L30 20 L0 20 z', fill: C.panel2, stroke: C.outline, portId: '' }).bind('angle', 'angle'),\r
          new go.TextBlock({ font: '9px ' + F, stroke: C.text, textAlign: 'center', maxSize: new go.Size(70, NaN) })\r
            .bind('text', 'label')\r
            .bind('alignment', 'side', (s) => (s === 'right' ? new go.Spot(1, 0.5, 28, 0) : new go.Spot(0, 0.5, -28, 0)))\r
            .bind('alignmentFocus', 'side', (s) => (s === 'right' ? go.Spot.Left : go.Spot.Right))));\r
\r
    // mix tank with level fill\r
    const TH = 200, INNER = TH - 6;\r
    myDiagram.nodeTemplateMap.add('tank',\r
      new go.Node('Spot', { locationObjectName: 'V', locationSpot: go.Spot.Center, toolTip: tip(() => 'TK-101  Mix Tank — level LT-103') })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape('Rectangle', { name: 'V', width: 180, height: TH, fill: C.panel2, stroke: C.outline, strokeWidth: 1.5, portId: '' }),\r
          new go.Shape('Rectangle', { fill: C.level, stroke: null, width: 176, alignment: new go.Spot(0.5, 1, 0, -2), alignmentFocus: go.Spot.Bottom, height: 1 })\r
            .bind('height', 'lt103', (v) => clamp(v, 0, 100) / 100 * INNER),\r
          new go.Panel('Vertical', { alignment: new go.Spot(0.5, 0, 0, 12) })\r
            .add(new go.TextBlock('TK-101', { font: 'bold 11px ' + F, stroke: C.text })),\r
          new go.Panel('Vertical', { alignment: go.Spot.Center })\r
            .add(\r
              new go.TextBlock({ font: 'bold 20px ' + F, stroke: C.text }).bind('text', 'lt103', (v) => v.toFixed(1)),\r
              new go.TextBlock('LT-103  %', { font: '10px ' + F, stroke: C.text2 })),\r
          alarmSquare()));\r
\r
    //  on/off feed valve (click to toggle)\r
    myDiagram.nodeTemplateMap.add('valve',\r
      new go.Node('Spot', { locationObjectName: 'PORT', locationSpot: go.Spot.Center, cursor: 'pointer', click: toggleDevice, background: 'transparent',\r
        mouseEnter: (e, node) => { node.scale = 1.25; },\r
        mouseLeave: (e, node) => { node.scale = 1; },\r
        toolTip: tip((d) => d.key + ' — click to ' + (d.state === 'OPEN' ? 'CLOSE' : 'OPEN')) })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape({ name: 'PORT', geometryString: 'F1 M0 0 L0 22 L17 11 z M34 0 L34 22 L17 11 z', stroke: C.outline, strokeWidth: 1.2, portId: '' })\r
            .bind('fill', 'state', (s) => (s === 'OPEN' ? C.on : C.off)),\r
          new go.TextBlock({ font: '9px ' + F, stroke: C.text, alignment: new go.Spot(0.5, 1, 0, 2), alignmentFocus: go.Spot.Top }).bind('text', 'key')));\r
\r
    // modulating control valve (display only, shows % open)\r
    myDiagram.nodeTemplateMap.add('cvalve',\r
      new go.Node('Spot', { locationObjectName: 'PORT', locationSpot: go.Spot.Center, toolTip: tip((d) => d.key + ' — control valve, ' + Math.round(d.out) + '% open') })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape({ name: 'PORT', geometryString: 'F1 M0 0 L0 22 L17 11 z M34 0 L34 22 L17 11 z', fill: C.panel2, stroke: C.outline, strokeWidth: 1.2, portId: '' }),\r
              new go.Shape({ geometryString: 'M17 11 V-7', stroke: C.outline, strokeWidth: 1.5, alignment: go.Spot.Center }),\r
              new go.Shape({ geometryString: 'F1 M-8 0 L8 0 L6 -6 L-6 -6 z', fill: C.panel, stroke: C.outline, alignment: new go.Spot(0.5, 0, 0, -7), alignmentFocus: go.Spot.Bottom })),\r
          new go.TextBlock({ font: '9px ' + F, stroke: C.text, alignment: new go.Spot(0.5, 1, 0, 2), alignmentFocus: go.Spot.Top, textAlign: 'center' })\r
            .bind('text', '', (d) => d.key + '\\n' + Math.round(d.out) + '%')));\r
\r
    // centrifugal transfer pump (click to start/stop)\r
    myDiagram.nodeTemplateMap.add('pump',\r
      new go.Node('Spot', { locationObjectName: 'PORT', locationSpot: go.Spot.Center, cursor: 'pointer', click: toggleDevice, background: 'transparent',\r
        mouseEnter: (e, node) => { node.scale = 1.25; },\r
        mouseLeave: (e, node) => { node.scale = 1; },\r
        toolTip: tip((d) => d.key + ' — click to ' + (d.state === 'RUNNING' ? 'STOP' : 'START')) })\r
        .bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Shape('Circle', { name: 'PORT', width: 30, height: 30, stroke: C.outline, strokeWidth: 1.2, portId: '' }).bind('fill', 'state', (s) => (s === 'RUNNING' ? C.on : C.off)),\r
              new go.Shape('triangleDown', { width: 10, height: 10, stroke: C.outline, strokeWidth: 0.75, alignment: go.Spot.Center }).bind('fill', 'state', (s) => (s === 'RUNNING' ? C.text : C.outline))),\r
          new go.TextBlock({ font: '9px ' + F, stroke: C.text, alignment: new go.Spot(0.5, 1, 0, 4), alignmentFocus: go.Spot.Top, textAlign: 'center' }).bind('text', '', (d) => d.key + '\\n' + d.state),\r
          alarmSquare()));\r
\r
    // PV / SP readout box\r
    myDiagram.nodeTemplateMap.add('readout',\r
      new go.Node('Auto', { toolTip: tip(readoutTip) }).bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape('Rectangle', { fill: C.panel2, stroke: C.outline, strokeWidth: 0.75 }),\r
          new go.Panel('Vertical', { margin: new go.Margin(3, 6), defaultAlignment: go.Spot.Left })\r
            .add(\r
              new go.TextBlock({ font: 'bold 9px ' + F, stroke: C.text }).bind('text', 'tag'),\r
              new go.Panel('Horizontal')\r
                .add(\r
                  new go.TextBlock({ font: 'bold 15px ' + F, stroke: C.text })\r
                    .bind('text', 'pv', (v, tb) => v.toFixed(CFG[tb.part.data.pvTag].dec))\r
                    .bind('stroke', 'almpri', (p) => (p ? PRI[p] : C.text)),\r
                  new go.TextBlock({ font: '9px ' + F, stroke: C.text2, margin: new go.Margin(0, 0, 0, 3) }).bind('text', 'unit')),\r
              new go.Panel('Horizontal').bind('visible', 'sp', (s) => s !== undefined)\r
                .add(\r
                  new go.TextBlock('SP ', { font: '9px ' + F, stroke: C.text2 }),\r
                  new go.TextBlock({ font: '10px ' + F, stroke: C.text2 }).bind('text', 'sp', (v) => (v === undefined ? '' : v.toFixed(1))))),\r
                  alarmSquare()));\r
\r
    // moving analog indicator\r
    myDiagram.nodeTemplateMap.add('mai', maiTemplate(tip));\r
\r
    // status / legend panel\r
    myDiagram.nodeTemplateMap.add('status',\r
      new go.Node('Auto').bind('location', 'pos', go.Point.parse)\r
        .add(\r
          new go.Shape('Rectangle', { fill: '#c0c0c0', stroke: C.outline, strokeWidth: 1 }),\r
          new go.Panel('Vertical', { margin: 8, width: 250, defaultAlignment: go.Spot.Left })\r
            .add(\r
              new go.TextBlock('PROCESS STATUS', { font: 'bold 10px ' + F, stroke: C.text2 }),\r
              new go.TextBlock({ font: '11px ' + F, stroke: C.text, margin: new go.Margin(4, 0) }).bind('text', 'line1'),\r
              new go.TextBlock({ font: '11px ' + F, stroke: C.text }).bind('text', 'line2'),\r
              new go.TextBlock({ font: 'italic 10px ' + F, stroke: C.text2, margin: new go.Margin(8, 0, 0, 0), width: 250 })\r
                .bind('text', '', () => 'Click a feed valve or the pump to command it. White = open/running, dark = closed/stopped.'))));\r
\r
    // Pipe link\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, corner: 0, layerName: 'Background', selectable: false, fromEndSegmentLength: 12, toEndSegmentLength: 12 })\r
        .bind('fromSpot', 'fs', go.Spot.parse).bind('toSpot', 'ts', go.Spot.parse)\r
        .add(\r
          new go.Shape({ stroke: C.pipe, strokeWidth: 3.5, isPanelMain: true }),\r
          new go.Shape({ geometryString: 'F1 M0 0 L9 5 L0 10 z', fill: C.pipe, strokeWidth: 0, segmentOrientation: go.Orientation.Along }));\r
\r
    function readoutTip(d) {\r
      const c = CFG[d.pvTag], l = LIMITS[d.pvTag] || {};\r
      let s = d.tag + '\\nRange ' + c.min + '–' + c.max + ' ' + c.unit;\r
      if (l.hi) s += '\\nHi ' + l.hi[0];\r
      if (l.lo) s += '   Lo ' + l.lo[0];\r
      return s;\r
    }\r
  }\r
\r
  // gets fill for a priority square, blank background while blinking an unacked alarm\r
  function squareFill(blink, obj) {\r
    const d = nearestData(obj);\r
    const pri = d ? (d.pri !== undefined ? d.pri : d.almpri) : 0;\r
    const ack = d ? (d.acked !== undefined ? d.acked : d.almack) : true;\r
    if (!pri) return 'transparent';\r
    return (!ack && blink) ? '#bfbfbf' : PRI[pri];\r
  }\r
\r
  // one alarm banner row\r
  function alarmRow() {\r
    return new go.Panel('Horizontal', { height: 25, margin: new go.Margin(1, 0, 0, 6) })\r
      .add(\r
        new go.TextBlock({ font: '11px ' + F, stroke: C.text2, width: 64 }).bind('text', 'time'),\r
        new go.Panel('Auto', { width: 25, height: 25, margin: new go.Margin(0, 8, 0, 0) })\r
          .add(\r
            new go.Shape('Rectangle', { strokeWidth: 0 }).bind(new go.Binding('fill', 'blink', squareFill).ofModel()),\r
            new go.TextBlock({ font: 'bold 12px ' + F }).bind('text', 'pri', (p) => '' + p).bind('stroke', 'pri', (p) => (p === 1 ? 'white' : '#222'))),\r
        new go.TextBlock({ font: '12px ' + F, stroke: C.text, width: 360 }).bind('text', 'msg'),\r
        new go.TextBlock({ font: 'bold 12px ' + F, width: 70 }).bind('text', 'acked', (a) => (a ? 'ACK' : 'UNACK')).bind('stroke', 'acked', (a) => (a ? C.text2 : C.text)),\r
        new go.Panel('Auto', { cursor: 'pointer', click: (e, o) => ackAlarm(nearestData(o)) }).bind('visible', 'acked', (a) => !a)\r
          .add(new go.Shape('Rectangle', { fill: C.panel2, stroke: C.outline, strokeWidth: 0.75 }),\r
            new go.TextBlock('ACK', { font: 'bold 12px ' + F, stroke: C.text, margin: new go.Margin(1, 7) })));\r
  }\r
\r
  // moving analog indicator with track, normal band, min/max labels, PV pointer, and value\r
  function maiTemplate(tip) {\r
    const H = 200;\r
    return new go.Node('Vertical', { toolTip: tip((d) => d.tag + '\\nRange ' + CFG[d.tag].min + '–' + CFG[d.tag].max + ' ' + CFG[d.tag].unit) })\r
      .bind('location', 'pos', go.Point.parse)\r
      .add(\r
        new go.TextBlock({ font: 'bold 9px ' + F, stroke: C.text }).bind('text', 'tag'),\r
        new go.Panel('Spot', { height: H, width: 56 })\r
          .add(\r
            new go.Shape('Rectangle', { width: 12, height: H, fill: C.track, stroke: C.outline, strokeWidth: 0.5, alignment: go.Spot.Center }),\r
            new go.Shape('Rectangle', { width: 12, strokeWidth: 0, fill: C.band, alignment: go.Spot.Center })\r
              .bind('height', 'tag', (t) => (CFG[t].band[1] - CFG[t].band[0]) / (CFG[t].max - CFG[t].min) * H)\r
              .bind('alignment', 'tag', (t) => new go.Spot(0.5, 1 - (CFG[t].band[0] + CFG[t].band[1]) / 2 / (CFG[t].max - CFG[t].min))),\r
            new go.TextBlock({ font: '7px ' + F, stroke: C.text2, alignment: new go.Spot(0.5, 0, 0, -1), alignmentFocus: go.Spot.Bottom }).bind('text', 'tag', (t) => '' + CFG[t].max),\r
            new go.TextBlock({ font: '7px ' + F, stroke: C.text2, alignment: new go.Spot(0.5, 1, 0, 1), alignmentFocus: go.Spot.Top }).bind('text', 'tag', (t) => '' + CFG[t].min),\r
            new go.Shape({ geometryString: 'F1 M9 0 L0 5 L9 10 z', strokeWidth: 0, alignment: new go.Spot(0.62, 0.5), alignmentFocus: go.Spot.Left })\r
              .bind('alignment', '', (d) => new go.Spot(0.62, 1 - clamp((d.pv - CFG[d.tag].min) / (CFG[d.tag].max - CFG[d.tag].min), 0, 1)))\r
              .bind('fill', 'almpri', (p) => (p ? PRI[p] : C.text))),\r
        new go.TextBlock({ font: 'bold 10px ' + F, stroke: C.text }).bind('text', '', (d) => fmt(d.tag, d.pv)).bind('stroke', 'almpri', (p) => (p ? PRI[p] : C.text)));\r
  }\r
\r
  // MODEL\r
  function buildModel() {\r
    const nodes = [\r
      { category: 'header', key: 'HEADER', pos: '0 0', clock: '' },\r
      { category: 'banner', key: 'BANNER', pos: '0 38', alarms: [], summary: '' },\r
      { category: 'tickSpeed', key: 'TICKSPEED', pos: '0 620' },\r
      { category: 'roomTemp', key: 'ROOMTEMP', pos: '0 560', temp: 21 },\r
\r
      { category: 'chevron', key: 'SRC-W', pos: '135 200', label: 'WATER', side: 'left' },\r
      { category: 'chevron', key: 'SRC-C', pos: '135 280', label: 'CONCENTRATE', side: 'left' },\r
      { category: 'chevron', key: 'SINK', pos: '700 585', label: 'TO STORAGE', side: 'right' },\r
\r
      { category: 'valve', key: 'XV-110', pos: '215 200', state: 'OPEN' },\r
      { category: 'cvalve', key: 'FV-101', pos: '325 200', out: 90 },\r
      { category: 'readout', key: 'FIC-101', pos: '290 130', tag: 'FIC-101', pvTag: 'FT-101', pv: 390, sp: 420, unit: 'L/min', almpri: 0, almack: true },\r
\r
      { category: 'valve', key: 'XV-111', pos: '215 280', state: 'OPEN' },\r
      { category: 'cvalve', key: 'FV-102', pos: '325 280', out: 22 },\r
\r
      { category: 'tank', key: 'TK-101', pos: '480 400', lt103: 56, almpri: 0, almack: true },\r
      { category: 'readout', key: 'TIC-104', pos: '585 238', tag: 'TIC-104', pvTag: 'TT-104', pv: 71, sp: 72, unit: '°C', almpri: 0, almack: true },\r
\r
      { category: 'pump', key: 'P-102', pos: '480 585', state: 'RUNNING', almpri: 0, almack: true },\r
      { category: 'readout', key: 'PT-105', pos: '560 538', tag: 'PT-105', pvTag: 'PT-105', pv: 3.4, unit: 'bar', almpri: 0, almack: true },\r
\r
      { category: 'mai', key: 'MAI-FT', pos: '850 235', tag: 'FT-101', pv: 390, almpri: 0, almack: true },\r
      { category: 'mai', key: 'MAI-LT', pos: '912 235', tag: 'LT-103', pv: 56, almpri: 0, almack: true },\r
      { category: 'mai', key: 'MAI-TT', pos: '974 235', tag: 'TT-104', pv: 71, almpri: 0, almack: true },\r
      { category: 'mai', key: 'MAI-PT', pos: '1036 235', tag: 'PT-105', pv: 3.4, almpri: 0, almack: true },\r
      { category: 'status', key: 'STATUS', pos: '850 520', line1: '', line2: '' }\r
    ];\r
    const links = [\r
      { from: 'SRC-W', to: 'XV-110', fs: 'Right', ts: 'Left' },\r
      { from: 'XV-110', to: 'FV-101', fs: 'Right', ts: 'Left' },\r
      { from: 'FV-101', to: 'TK-101', fs: 'Right', ts: '0.35 0' },\r
      { from: 'SRC-C', to: 'XV-111', fs: 'Right', ts: 'Left' },\r
      { from: 'XV-111', to: 'FV-102', fs: 'Right', ts: 'Left' },\r
      { from: 'FV-102', to: 'TK-101', fs: 'Right', ts: '0.6 0' },\r
      { from: 'TK-101', to: 'P-102', fs: '0.5 1', ts: 'Top' },\r
      { from: 'P-102', to: 'SINK', fs: 'Right', ts: 'Left' }\r
    ];\r
    return new go.GraphLinksModel({ nodeKeyProperty: 'key', nodeDataArray: nodes, linkDataArray: links });\r
  }\r
\r
  // SIMULATION — runs on single 500 ms heartbeat\r
  function tick() {\r
    myDiagram.commit((d) => {\r
      const m = d.model;\r
      m.set(m.modelData, 'blink', !m.modelData.blink);\r
      m.set(d.findNodeForKey('HEADER').data, 'clock', clock());\r
\r
      // device states\r
      const water = d.findNodeForKey('XV-110').data.state === 'OPEN';\r
      const conc = d.findNodeForKey('XV-111').data.state === 'OPEN';\r
      const pumpOn = d.findNodeForKey('P-102').data.state === 'RUNNING';\r
      const room = d.findNodeForKey('ROOMTEMP').data.temp; // ambient (°C) from the slider\r
\r
      // feed control, modulate FV-101 to try to hold level near 65 % when water is lined up (ends up being around 56)\r
      const fvOut = water ? clamp(6 * (65 - S.pv['LT-103']) + 40, 0, 100) : 0;\r
      const feed = (water ? fvOut / 100 * 420 : 0) + (conc ? 80 : 0); // L/min in\r
      const draw = pumpOn ? 470 : 0;                                  // L/min out\r
\r
      // first-order lag and noise toward each target\r
      const lag = (tag, target, k, sig) => { S.pv[tag] += (target - S.pv[tag]) * k + (Math.random() - 0.5) * sig; if (S.pv[tag] < 0) S.pv[tag] = 0; };\r
      lag('FT-101', water ? fvOut / 100 * 420 : 0, 0.3, 4);\r
      S.pv['LT-103'] = clamp(S.pv['LT-103'] + (feed - draw) / 280, 0, 100); // integrate into the tank (time-compressed)\r
      lag('TT-104', 72 + (room - 21) * 0.5, 0.08, 0.15); // room temp adds heat load; high ambient drives TT-104 past its hi alarm\r
      lag('PT-105', pumpOn ? 3.4 : 0, 0.3, 0.05);\r
\r
      // push values to the displays\r
      set(d, 'FV-101', 'out', Math.round(fvOut));\r
      set(d, 'TK-101', 'lt103', round1(S.pv['LT-103']));\r
      set(d, 'FIC-101', 'pv', Math.round(S.pv['FT-101']));\r
      set(d, 'TIC-104', 'pv', round1(S.pv['TT-104']));\r
      set(d, 'PT-105', 'pv', round1(S.pv['PT-105']));\r
      set(d, 'MAI-FT', 'pv', round1(S.pv['FT-101']));\r
      set(d, 'MAI-LT', 'pv', round1(S.pv['LT-103']));\r
      set(d, 'MAI-TT', 'pv', round1(S.pv['TT-104']));\r
      set(d, 'MAI-PT', 'pv', round1(S.pv['PT-105']));\r
\r
      // status panel\r
      set(d, 'STATUS', 'line1', 'Pump P-102: ' + (pumpOn ? 'RUNNING' : 'STOPPED') + '   Feeds: ' + ((water ? 1 : 0) + (conc ? 1 : 0)) + ' of 2 open');\r
      set(d, 'STATUS', 'line2', 'Level ' + round1(S.pv['LT-103']) + ' %   Temp ' + round1(S.pv['TT-104']) + ' °C   Flow ' + Math.round(S.pv['FT-101']) + ' L/min');\r
\r
      evaluateAlarms(d);\r
    }, null);\r
  }\r
  const round1 = (v) => Math.round(v * 10) / 10;\r
  function set(d, key, prop, val) { const n = d.findNodeForKey(key); if (n && n.data[prop] !== val) d.model.set(n.data, prop, val); }\r
\r
  // Raise/clear alarms from the limits table with a small deadband to avoid chatter\r
  function evaluateAlarms(d) {\r
    for (const tag in LIMITS) {\r
      const v = S.pv[tag], lim = LIMITS[tag], span = CFG[tag].max - CFG[tag].min, db = span * 0.01;\r
      [['hi', true], ['lo', false]].forEach(([level, high]) => {\r
        const spec = lim[level];\r
        if (!spec) return;\r
        const id = tag + '/' + level;\r
        const exists = S.alarms.find((a) => a.id === id);\r
        const active = high ? v >= spec[0] : v <= spec[0];\r
        const clear = high ? v < spec[0] - db : v > spec[0] + db;\r
        if (active && !exists) {\r
          S.alarms.unshift({ id, time: clock(), pri: spec[1], tag, msg: tag + ' ' + (high ? 'HIGH' : 'LOW') + ' — ' + fmt(tag, v), acked: false });\r
        } else if (exists && clear) {\r
          if (exists.acked) S.alarms = S.alarms.filter((a) => a.id !== id);\r
        } else if (exists) {\r
          exists.msg = tag + ' ' + (high ? 'HIGH' : 'LOW') + ' — ' + fmt(tag, v);\r
        }\r
      });\r
    }\r
    renderAlarms();\r
    // mirror each active alarm onto its mimic device square\r
    const byDev = {};\r
    S.alarms.forEach((a) => { const dev = ALM_DEVICE[a.tag]; if (dev && (!byDev[dev] || a.pri < byDev[dev].pri)) byDev[dev] = { pri: a.pri, ack: a.acked }; });\r
    ['TK-101', 'TIC-104', 'PT-105'].forEach((k) => { const st = byDev[k]; set(d, k, 'almpri', st ? st.pri : 0); set(d, k, 'almack', st ? st.ack : true); });\r
  }\r
\r
  function renderAlarms() {\r
    S.alarms.sort((a, b) => (a.acked === b.acked ? 0 : a.acked ? 1 : -1));\r
    const bn = myDiagram.model.findNodeDataForKey('BANNER');\r
    myDiagram.model.set(bn, 'alarms', S.alarms.slice(0, 3));\r
    const unack = S.alarms.filter((a) => !a.acked).length;\r
    myDiagram.model.set(bn, 'summary', S.alarms.length + ' active (' + unack + ' unacknowledged)');\r
  }\r
\r
  // INTERACTION\r
  function toggleDevice(e, node) {\r
    const d = node.data;\r
    myDiagram.commit((dg) => {\r
      if (d.category === 'pump') dg.model.set(d, 'state', d.state === 'RUNNING' ? 'STOPPED' : 'RUNNING');\r
      else dg.model.set(d, 'state', d.state === 'OPEN' ? 'CLOSED' : 'OPEN');\r
    }, null);\r
  }\r
  function ackAlarm(item) {\r
    const a = S.alarms.find((x) => x.id === item.id);\r
    if (a) { a.acked = true; myDiagram.commit((d) => { renderAlarms(); evaluateAlarms(d); }, null); }\r
  }\r
  function ackAll() {\r
    S.alarms.forEach((a) => { a.acked = true; });\r
    myDiagram.commit((d) => { renderAlarms(); evaluateAlarms(d); }, null);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    A modern <b>high-performance HMI (HPHMI)</b> operator screen built entirely with GoJS, inspired by the\r
    <a href="https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa101">ISA-101</a>\r
    design philosophy used in control rooms. The HPHMI screen is deliberately gray and color, motion,\r
    and blinking are reserved for abnormal situations. A gray screen signifies a healthy process.\r
  </p>\r
  <p>\r
    The mimic shows a beverage mix &amp; transfer skid: a jacketed mix tank (TK-101) fed by a\r
    water and a concentrate stream, with a transfer pump (P-102) to storage. Process values update live with\r
    first-order lag and noise. Click the feed valves or the pump to toggle them (white&nbsp;= open/running,\r
    dark&nbsp;= closed/stopped) and watch the level, flow, and pressure respond.\r
  </p>\r
  <p>\r
    The alarm banner shows a priority square (1&nbsp;=&nbsp;urgent red, 2&nbsp;=&nbsp;warning amber,\r
    3&nbsp;=&nbsp;advisory cyan) for each alarm that blinks at 1&nbsp;Hz while unacknowledged. Click <b>ACK</b> on a row or\r
    <b>ACK&nbsp;ALL</b> to acknowledge; an alarm clears on its own once the value returns to normal. The skid runs as a\r
    continuous flow-through: stop the pump to watch the level climb toward a high alarm, or close the feed valves to\r
    drain it toward a low alarm.\r
  </p>\r
  <p>\r
    This sample demonstrates a <a href="https://gojs.net/latest/api/symbols/Diagram">Diagram</a> used as a non-editable but clickable application screen that scales\r
    with <a href="https://gojs.net/latest/api/symbols/Diagram.html#autoScale">Diagram.autoScale</a> set to <a href="https://gojs.net/latest/api/symbols/AutoScale">AutoScale.Uniform</a>. \r
    It uses <a href="../learn/itemArrays">item arrays</a> to build the alarm banner. A <a href="../learn/dataBinding">model-data binding</a> (<a>Binding.ofModel</a>)\r
    updates the synchronized blink from a single source-of-truth object holding the process data.\r
  </p>\r
  <div class="bg-info rounded-xl p-2">\r
    Try clicking on the white <b>XV-110</b> and <b>XV-111</b> valves on the left to toggle them on and off and watch the tank and meters react:\r
  </div>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`monitoring`,`scada`,`process`,`gauges`,`itemarrays`,`geometries`];var g=y();l(`1wy3rup`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};