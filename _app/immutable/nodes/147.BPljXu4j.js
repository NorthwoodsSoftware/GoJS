import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Game of Life Cellular Automation`,indexDescription:`A cellular automation simulation.`,screenshot:`gameoflife`,priority:2,description:`A cellular automation simulation in GoJS`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  <p>\r
    Game Controls:\r
    <input id="start" onclick="toggleSimulation()" type="button" value="Start" />\r
    <input id="step" onclick="stepOnclick()" type="button" value="Step" />\r
    <input id="clear" onclick="goLClear()" type="button" value="Clear" style="margin-bottom: 10px" />\r
    Sample patterns:\r
    <select id="samplePatterns" onchange="loadSample(this.options[this.selectedIndex].value)" style="margin-bottom: 10px">\r
      <option value="symm4">Symmetry</option>\r
      <option value="pulsar">Pulsar</option>\r
      <option value="spaceships">Spaceships</option>\r
      <option value="bigGliders">Big gliders</option>\r
    </select>\r
  </p>`,jsCode:`// two dimensional array which will represent the board state\r
  // this will be filled with Nodes once they are created\r
  const goLGrid = [];\r
\r
  // the size of the board\r
  const rows = 40;\r
  const cols = 40;\r
\r
  const interval = 15; // the interval between steps in ms when the simulation is enabled\r
  let initializing = true;\r
  let enabled = false; // flag to turn the simulation on or off\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': false,\r
      // disable movement/edit controls, since the myDiagram is a static grid\r
      'panningTool.isEnabled': false,\r
      isReadOnly: true,\r
      allowZoom: false,\r
      allowSelect: false,\r
      hasHorizontalScrollbar: false,\r
      hasVerticalScrollbar: false,\r
      initialAutoScale: go.AutoScale.Uniform\r
    });\r
\r
    const nodeSize = 25;\r
    const nodeDataArray = []; // array to hold Node data for the model\r
    // populate data array by initializing Nodes in a grid and setting their "isAlive" state to false\r
    for (let i = 0; i < rows; i++) {\r
      const row = new Array(cols);\r
      for (let j = 0; j < cols; j++) {\r
        nodeDataArray.push({ location: new go.Point(j * nodeSize, i * nodeSize), row: i, col: j, isAlive: false });\r
      }\r
      goLGrid.push(row);\r
    }\r
\r
    // stroke color and width of the grid lines\r
    const gridStroke = '#A2A2A2';\r
    const gridStrokeWidth = 1;\r
\r
    // define the node template, which also includes interactive functionality, such as clicking to toggle a node's state\r
    myDiagram.nodeTemplate =\r
      new go.Part({\r
          isLayoutPositioned: false,\r
          mouseEnter: (e, part, prev) => {\r
            // set mouseover border\r
            if (!initializing && !enabled) {\r
              const shape = part.elt(0);\r
              if (shape) {\r
                shape.stroke = 'steelblue';\r
                shape.strokeWidth = 3;\r
              }\r
              part.zOrder = 2; // ensure that the selection border is in front of all other Nodes by increasing its zOrder\r
\r
              // drag with a button down to add or erase cells\r
              if ((e.buttons === 1 && !part.data.isAlive) || (e.buttons === 2 && part.data.isAlive)) {\r
                select(part);\r
              }\r
            }\r
          },\r
          mouseLeave: (e, part, next) => {\r
            // restore to original borders\r
            const shape = part.elt(0);\r
            if (shape) {\r
              shape.stroke = gridStroke;\r
              shape.strokeWidth = gridStrokeWidth;\r
            }\r
            part.zOrder = 1;\r
          },\r
          click: (e, part) => {\r
            // left click to toggle cell\r
            initializing = false;\r
            if (!enabled) {\r
              select(part);\r
            }\r
          },\r
          contextClick: (e, part) => {\r
            // right click to clear cell\r
            initializing = false;\r
            if (!enabled && part.data.isAlive) {\r
              select(part);\r
            }\r
          },\r
          zOrder: 1\r
        })\r
        .bind('location')\r
        .add(\r
          new go.Shape({\r
            figure: 'Rectangle',\r
            fill: 'white',\r
            stroke: gridStroke,\r
            strokeWidth: gridStrokeWidth,\r
            width: nodeSize,\r
            height: nodeSize\r
          })\r
        );\r
\r
    // use a simple model for our node data\r
    myDiagram.model = new go.Model(nodeDataArray);\r
\r
    // myDiagram.parts is populated after a model is assigned;\r
    // populate the internal gamestate array with the newly created nodes\r
    for (const it = myDiagram.parts.iterator; it.next(); ) {\r
      const part = it.value;\r
      goLGrid[part.data.row][part.data.col] = part;\r
    }\r
\r
    // load the default sample\r
    const e = document.getElementById('samplePatterns');\r
    loadSample(e.options[e.selectedIndex].value);\r
  }\r
\r
  // toggles a given node's state, both visually and in the internal gamestate\r
  function select(part) {\r
    const shape = part.elt(0);\r
    if (shape) {\r
      if (shape.fill === 'white') {\r
        shape.fill = 'steelblue';\r
      } else {\r
        shape.fill = 'white';\r
      }\r
    }\r
    part.data.isAlive = !part.data.isAlive;\r
  }\r
\r
  // toggles the state of the simulation, changing the button text from "Start" to "Pause" or back again\r
  function toggleSimulation() {\r
    initializing = false;\r
    const button = document.getElementById('start');\r
    if (!enabled) {\r
      button.value = 'Pause';\r
      enabled = true;\r
      goLStep();\r
    } else {\r
      button.value = 'Start';\r
      enabled = false;\r
    }\r
  }\r
\r
  // the callback for the step button, only steps forward if the simulation is currently stopped\r
  function stepOnclick() {\r
    initializing = false;\r
    if (enabled) { toggleSimulation(); return; }\r
    goLStep(true);\r
  }\r
\r
  // performs a single step in the Game of Life\r
  function goLStep(isManualStep) {\r
    if (goLGrid.length === 0) {\r
      return; // don't do anything if things aren't initialized yet\r
    }\r
\r
    let isAlive = false;\r
    const toSelect = [];\r
    let liveCellCount = 0; // count the number of live cells to determine if there are no more left\r
    for (let i = 0; i < rows; i++) {\r
      for (let j = 0; j < cols; j++) {\r
        if (isAlive) {\r
          liveCellCount++;\r
        }\r
\r
        // count the number of cells in the 8 squares adjacent to this one\r
        let total = 0;\r
\r
        const above = goLGrid[i > 0 ? i - 1 : rows - 1];\r
        const below = goLGrid[i + 1 < rows ? i + 1 : 0];\r
        const left = j > 0 ? j - 1 : cols - 1;\r
        const right = j + 1 < cols ? j + 1 : 0;\r
\r
        total += above[left].data.isAlive;\r
        total += above[j].data.isAlive;\r
        total += above[right].data.isAlive;\r
        total += goLGrid[i][left].data.isAlive;\r
        total += goLGrid[i][right].data.isAlive;\r
        total += below[left].data.isAlive;\r
        total += below[j].data.isAlive;\r
        total += below[right].data.isAlive;\r
\r
        // toggle the cell if necessary according to the three rules\r
        const part = goLGrid[i][j];\r
        isAlive = part.data.isAlive;\r
        if ((total <= 1 && isAlive) || (total > 3 && isAlive) || (total === 3 && !isAlive)) {\r
          if (!isAlive) {\r
            liveCellCount++;\r
          } else {\r
            liveCellCount--;\r
          }\r
          toSelect.push(part); // don't actually toggle the cell yet, this happens all at once after everything is done\r
        }\r
      }\r
    }\r
\r
    // change the board state according the earlier loop\r
    if (enabled || isManualStep) {\r
      for (let i = 0; i < toSelect.length; i++) {\r
        select(toSelect[i]);\r
      }\r
    }\r
\r
    if (enabled) {\r
      if (liveCellCount === 0) {\r
        toggleSimulation(); // stop the simulation if there are no more live cells\r
      } else {\r
        setTimeout(goLStep, interval); // queue another step if the simuation is still enabled\r
      }\r
    }\r
  }\r
\r
  // clear the board of all live cells, stopping the simulation if it's currently enabled\r
  function goLClear() {\r
    if (enabled) {\r
      toggleSimulation();\r
    }\r
    for (let i = 0; i < rows; i++) {\r
      for (let j = 0; j < cols; j++) {\r
        const part = goLGrid[i][j];\r
        if (part.data.isAlive) {\r
          select(part);\r
        }\r
      }\r
    }\r
  }\r
\r
  // this function contains all of the data for the four included sample patterns as well as the logic for drawing them\r
  function loadSample(value) {\r
    goLClear(); // clear the board first, stopping the simulation if it's enabled\r
    // select the correct sample data based on the option value passed to the function\r
    let sampleData = [];\r
    switch (value) {\r
      case 'symm4':\r
        sampleData = [\r
          [, , , , , , , , , , 1, 1, 1, , , , , , , , 0],\r
          [, , , , , , , , , , 1, , , 1, , , , , , , 0],\r
          [, , , , , , , , , , 1, , , 1, , , , , , , 0],\r
          [, , , , , , , , , , , , 1, 1, , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , , , , , 0],\r
          [, 1, 1, 1, , , , , , , , , , , , , , , , , 0],\r
          [1, , , 1, , , , , , , , , , , , , , , , , 0],\r
          [1, , , , , , , , , , , , , , , , , , , , 0],\r
          [1, 1, 1, , , , , , , , , , , , , , , , 1, 1, 1],\r
          [, , , , , , , , , , , , , , , , , , , , 1],\r
          [, , , , , , , , , , , , , , , , , 1, , , 1],\r
          [, , , , , , , , , , , , , , , , , 1, 1, 1, 0],\r
          [, , , , , , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , 1, 1, , , , , , , , , , , , 0],\r
          [, , , , , , , 1, , , 1, , , , , , , , , , 0],\r
          [, , , , , , , 1, , , 1, , , , , , , , , , 0],\r
          [, , , , , , , , 1, 1, 1, , , , , , , , , , 0]\r
        ];\r
        break;\r
      case 'pulsar':\r
        sampleData = [\r
          [, 1, 1, 1, , , , 1, 1, 1, 0],\r
          [1, , , , 1, , 1, , , , 1],\r
          [1, , , , 1, , 1, , , , 1],\r
          [1, , , , 1, , 1, , , , 1],\r
          [, 1, 1, 1, , , , 1, 1, 1, 0],\r
          [, , , , , , , , , , 0],\r
          [, 1, 1, 1, , , , 1, 1, 1, 0],\r
          [1, , , , 1, , 1, , , , 1],\r
          [1, , , , 1, , 1, , , , 1],\r
          [1, , , , 1, , 1, , , , 1],\r
          [, 1, 1, 1, , , , 1, 1, 1, 0]\r
        ];\r
        break;\r
      case 'spaceships':\r
        sampleData = [\r
          [1, , , 1, , , , , , , , , , , , , 0],\r
          [, , , , 1, , , , , , , , , , , , 0],\r
          [1, , , , 1, , , , , , , , , , , , 0],\r
          [, 1, 1, 1, 1, , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , 1, , 0],\r
          [, , , , , , , , , , , , 1, , , , 1],\r
          [, , , , , , , , , , , 1, , , , , 0],\r
          [, , , , , , , , , , , 1, , , , , 1],\r
          [, , , , , , , , , , , 1, 1, 1, 1, 1, 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , 0],\r
          [, , , , , 1, , 1, 1, , , , , , , , 0],\r
          [, , , , 1, , , , , , , 1, , , , , 0],\r
          [, , , 1, 1, , , , 1, , , 1, , , , , 0],\r
          [1, 1, , 1, , , , , , 1, 1, , , , , , 0],\r
          [1, 1, , 1, , , , , , 1, 1, , , , , , 0],\r
          [, , , 1, 1, , , , 1, , , 1, , , , , 0],\r
          [, , , , 1, , , , , , , 1, , , , , 0],\r
          [, , , , , 1, , 1, 1, , , , , , , , 0]\r
        ];\r
        break;\r
      case 'bigGliders':\r
        sampleData = [\r
          [, , , , , , , , , , , , , 1, 1, 1, , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , 1, , , 1, 1, 1, , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , , 0],\r
          [, , , , , , , , , , 1, 1, , , , , , , , 1, , , , , , , , 0],\r
          [, , , , , , , , , , 1, , 1, , , , , 1, , , 1, , , , , , , 0],\r
          [, , , , , , , , , , 1, , , , , , , , , 1, 1, , , , , , , 0],\r
          [, , , , , , , , , , , 1, 1, , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , 1, , , 1, , , , , , 1, , 1, 1, , , , 0],\r
          [, , , , , , , , , , , 1, , , , , , , , , , 1, 1, , 1, , , 0],\r
          [, , , , , , , , , , , , , 1, , 1, , , , , , , 1, 1, , , 1, 0],\r
          [, , , , , , , , , , , , , , 1, 1, , 1, , , , , 1, 1, , , , 1],\r
          [, , , , , , , , , , , , , , , , , , 1, , , , , , , , 1, 0],\r
          [, , , , , , , , , , , , , , , , , 1, 1, 1, 1, , , , 1, , 1, 0],\r
          [, , , , , , , , , , , , , , , , , 1, , 1, 1, , , , 1, 1, 1, 1],\r
          [, , , , , , , , , , , , , , , , , , 1, , , , 1, 1, , 1, , 0],\r
          [, , , , , , , , 1, 1, , , , , , , , , , , , , , 1, 1, , , 0],\r
          [, , , , , , , 1, 1, , , , , , , , , , , 1, , 1, 1, 1, , , , 0],\r
          [, , , , , , , , , 1, , , , , , , , , , , 1, , , 1, , , , 0],\r
          [, , , , , , , , , , , 1, 1, , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , 1, , , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , , , , , , , , , , , , , , , , , , , 0],\r
          [, , , , , , , , , 1, , , 1, , , , , , , , , , , , , , , 0],\r
          [, 1, 1, , , , , , 1, 1, , , , , , , , , , , , , , , , , , 0],\r
          [1, 1, , , , , , 1, , , , , , , , , , , , , , , , , , , , 0],\r
          [, , 1, , , , , 1, , 1, , , , , , , , , , , , , , , , , , 0],\r
          [, , , , 1, 1, , , 1, , , , , , , , , , , , , , , , , , , 0],\r
          [, , , , 1, 1, , , , , , , , , , , , , , , , , , , , , , 0]\r
        ];\r
        break;\r
    }\r
\r
    // draw the sample pattern in the middle of the board\r
    const startRow = Math.floor(rows / 2 - sampleData.length / 2);\r
    const startCol = Math.floor(cols / 2 - sampleData[0].length / 2);\r
    for (let i = startRow; i < startRow + sampleData.length; i++) {\r
      for (let j = startCol; j < startCol + sampleData[0].length; j++) {\r
        if (sampleData[i - startRow][j - startCol] === 1) {\r
          select(goLGrid[i][j]);\r
        }\r
      }\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample shows an implementation of <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a> in GoJS. Conway's Game of\r
    Life is a simple cellular automaton devised by British mathematician John Horton Conway in 1970. To start or advance the simulation, use the controls above.\r
  </p>\r
  <p>\r
    Whether or not a given cell lives, dies, or is born in a step is determined by the number of live cells in the 8 squares adjacent to it. For a cell\r
    <i>x</i> with <i>n</i> adjacent live cells:\r
  </p>\r
  <ul>\r
    <li>If <i>n</i> &lt;= 1, cell <i>x</i> dies or stays dead (from underpopulation).</li>\r
    <li>If <i>n</i> &gt; 3, cell <i>x</i> dies or stays dead (from overpopulation).</li>\r
    <li>If <i>n</i> = 3, then <i>x</i> is born or stays alive.</li>\r
    <li>If <i>n</i> = 2, then <i>x</i> maintains its status.</li>\r
  </ul>\r
  <p>\r
    Though the rules are simple, they can produce complex patterns, some of which are shown in the dropdown above. To create your own patterns, click or drag\r
    anywhere on the grid when the simulation is not running.\r
  </p>\r
  <p>Each cell is implemented by a simple <a>Part</a> holding a small square <a>Shape</a>.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[];var g=y();l(`1ogzx0a`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};