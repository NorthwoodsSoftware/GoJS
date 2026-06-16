import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Layered Digraph Demonstration of LayeredDigraphLayout Options`,titleShort:`Layered Digraph Layout Demo`,indexDescription:`Shows LayeredDigraphLayout and options. Arranges nodes of directed graphs into layers (rows or columns).`,screenshot:`ldlayout`,priority:2,tags:[`collections`,`layered-digraph`,`html`],description:`Interactive demonstration of hierarchical layout features by the LayeredDigraphLayout class.`,tailwind:!0},htmlContent:`<template id="buttonRow">\r
  <div class="row" >\r
    <svg onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-right: 2px; margin-bottom: 6px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>\r
    </svg>\r
    <div class="title cell whitespace-nowrap p-1 select-none" style="font-size: large;"></div>\r
    <div class="cell">\r
      <div class="relative flex items-center">\r
        <div class="maximum" ></div>\r
        <div class="minimum" ></div>\r
        <div class="decimal" ></div>\r
        <button type="button" onclick="resetButton(this)" class="button1 rounded-s-lg rounded-e-none h-7 m-0 pr-[2px] pl-[2px]" style="background-color: lightgray;">\r
          <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12px" height="12px" viewBox="0 0 528.919 528.919" xml:space="preserve">\r
            <path id="reset" stroke-width="2" d= "M70.846,324.059c3.21,3.926,8.409,3.926,11.619,0l69.162-84.621c3.21-3.926,1.698-7.108-3.372-7.108h-36.723 c-5.07,0-8.516-4.061-7.427-9.012c18.883-85.995,95.625-150.564,187.207-150.564c105.708,0,191.706,85.999,191.706,191.706 c0,105.709-85.998,191.707-191.706,191.707c-12.674,0-22.95,10.275-22.95,22.949s10.276,22.949,22.95,22.949 c131.018,0,237.606-106.588,237.606-237.605c0-131.017-106.589-237.605-237.606-237.605 c-116.961,0-214.395,84.967-233.961,196.409c-0.878,4.994-5.52,9.067-10.59,9.067H5.057c-5.071,0-6.579,3.182-3.373,7.108 L70.846,324.059z"/>\r
          </svg>\r
        </button>\r
        <button type="button" onclick="changeInput(this)" class="button2 bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-none h-7  m-0 pr-[11px] pl-[6px]">\r
          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
          </svg>\r
        </button>\r
        <input type="text" onchange="changeInput(this, false)" class="input inputBox bg-gray-50 border-x-1 border-gray-300 h-7 text-center outline-none text-gray-900 text-sm w-10 m-[-4.5px] z-10" required />\r
        <button type="button" onclick="changeInput(this)" class="button3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 m-0 pr-[7px] pl-[12px]">\r
          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
          </svg>\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<template id="dropdown">\r
  <div class="row">\r
    <svg  onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-top: 17px; margin-right: 2px; margin-left: 4px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>\r
    </svg>\r
    <div class="title cell whitespace-nowrap p-1 select-none pt-4"></div>\r
    <div class="cell pt-4">\r
      <div class="relative flex">\r
          <button type="button" onclick="resetButton(this)" class="button1 rounded-s-lg rounded-e-none h-8.1 m-0 pr-[2px] pl-[2px] align-middle" style="background-color: lightgray;">\r
            <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12px" height="12px" viewBox="0 0 528.919 528.919" xml:space="preserve">\r
              <path id="reset" stroke-width="2" d= "M70.846,324.059c3.21,3.926,8.409,3.926,11.619,0l69.162-84.621c3.21-3.926,1.698-7.108-3.372-7.108h-36.723 c-5.07,0-8.516-4.061-7.427-9.012c18.883-85.995,95.625-150.564,187.207-150.564c105.708,0,191.706,85.999,191.706,191.706 c0,105.709-85.998,191.707-191.706,191.707c-12.674,0-22.95,10.275-22.95,22.949s10.276,22.949,22.95,22.949 c131.018,0,237.606-106.588,237.606-237.605c0-131.017-106.589-237.605-237.606-237.605 c-116.961,0-214.395,84.967-233.961,196.409c-0.878,4.994-5.52,9.067-10.59,9.067H5.057c-5.071,0-6.579,3.182-3.373,7.108 L70.846,324.059z"/>\r
            </svg>\r
          </button>\r
          <select onchange="changeDropdown(this)" style="width: 100%;" class="input outline-none bg-gray-50 border rounded-s-none rounded-e-lg border-gray-300 text-gray-900 text-sm block p-1.5"></select>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<template id="switch">\r
  <label class="row">\r
    <svg  onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-top: 2px; margin-right: 2px; margin-left: 4px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>\r
    </svg>\r
    <div class="title cell whitespace-nowrap select-none pt-2"></div>\r
    <div class="cell inline-flex items-center cursor-pointer ml-[3px]">\r
      <input type="checkbox" onclick="layout()" class="input sr-only peer">\r
      <div height=5 class="relative w-9 h-5 mt-[7px] bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>\r
    </div>\r
  </label>\r
</template>\r
\r
  <iframe id="apiFrame" src="https://gojs.net/latest/api/symbols/LayeredDigraphLayout.html" style="display: none;"></iframe>\r
  <div id="frame" style="z-index: 100; pointer-events: none; position: absolute; display: none; ">\r
      <div id="container" style="border: 1px solid #ddd; border-radius: 5px; padding: 15px; max-width: 600px;margin: 20px auto; font-family: Arial, sans-serif; background-color: #fff;">\r
        <div id="name" class="name" style="font-weight: bold; font-size: 16px;  display: flex; align-items: center;"></div>\r
        \r
      </div>\r
  </div>\r
\r
  <div class="sampleWrapper">\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 600px; border: solid 1px black; margin-right: 10px;"></div>\r
\r
    <div style="flex: 1;">\r
      <section class="grid grid-cols-1 gap-y-3 divide-y">\r
        <details open class="group py-1 text-lg select-none" id="treeSettings">\r
          <summary class="flex cursor-pointer flex-row items-center whitespace-nowrap justify-between py-1 font-semibold marker:[font-size:0px]">Node Settings\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>\r
            </svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
\r
          <div class="table " style="padding-right: 15px;">\r
            <div class="row" > <!--Min Nodes-->\r
              <div class="cell whitespace-nowrap p-1 select-none" style="font-size: large; padding-right: 15px;">Minimum Nodes\r
              </div>\r
              <div class="cell max-w-xs"> <!--Min Nodes-->\r
                <label for="numNodes" class="items-center cursor-pointer">\r
                  <div class="relative flex items-center max-w-[6.5rem] ">\r
                    <button type="button" id="decrement-button" onclick="changeNodes(false,-5)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                      <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                      </svg>\r
                    </button>\r
                    <input type="text" id="minNodes" onclick="changeNodes(false, 0)" onchange="changeNodes(false, 0)" aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-1 border-gray-300 h-7 text-center outline-none text-gray-900 text-sm w-11 m-[-4.5px] z-10" value="20" required />\r
                    <button type="button" id="increment-button" onclick="changeNodes(false, 5)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[7px] pl-[12px]">\r
                      <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                      </svg>\r
                    </button>\r
                  </div>\r
                </label>\r
              </div>\r
            </div>\r
            <div class="row"> <!--Max Nodes-->\r
              <div id= "nodeWidthText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large">Maximum Nodes</div>\r
              <div class="cell max-w-xs" id="nodeWidthForm"> <!--Max Nodes-->\r
                <label for="minLinks" class="items-center cursor-pointer">\r
                  <div class="relative flex items-center max-w-[6.5rem]">\r
                    <button type="button" id="decrement-button" onclick="changeNodes(true, -5)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                      <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                      </svg>\r
                    </button>\r
                    <input type="text" id="maxNodes" onclick="changeNodes(true, 0)" onchange="changeNodes(true, 0)" aria-describedby="helper-text-explanation" onchange="" class="bg-gray-50 border-x-1 border-gray-300 h-7 text-center text-gray-900 text-sm outline-none w-11 m-[-4.5px] z-10" value="100" required />\r
                    <button type="button" id="increment-button" onclick="changeNodes(true, 5)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none  m-0 pr-[7px] pl-[12px]">\r
                      <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                      </svg>\r
                    </button>\r
                  </div>\r
                </label>\r
              </div>\r
            </div>\r
          </div>\r
          <span style="display: inline-block; vertical-align: top; padding: 5px">\r
            <button type="button" class="mt-2 ml-[60px] whitespace-nowrap" onclick="rebuildGraph()">Generate Digraph</button>\r
          </span>\r
        </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg select-none" id="defaultProperties">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]">Default Properties\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table" id="table1"></div>\r
            <div class="table ml-[15px]" id="table2"></div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg select-none" id="defaultProperties">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]">Pack and Align\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table" id="table3"></div>\r
            <div class="table ml-[15px]" id="table4"></div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg" id="treeLayoutBuilder">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]  select-none">Layered Digraph Builder\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>\r
            </svg>\r
          </summary>\r
          <div class="p-1" style="position: relative;"><!--Layout Output-->\r
            <pre style="overflow: auto;">\r
              <code id="layoutBuilder" class="lang-js" style="font-size: large;"></code>\r
            </pre>\r
            <button onclick="copyCode()" style="position: absolute; top: 14px; right: 8px; width: 35px; height: 35px;" id="copyButton" class="copyButton text-gray-900 m-1 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">\r
                  <svg id="default" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">\r
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>\r
                  </svg>\r
                  <svg id="clicked" class="w-4 h-4" style="display: none;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">\r
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>\r
                  </svg>\r
            </button>\r
          </div>\r
        </details>\r
      </section>\r
    </div>\r
  </div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must be the ID or reference to div\r
        initialAutoScale: go.AutoScale.UniformToFill,\r
        layout: new go.LayeredDigraphLayout()\r
        // other Layout properties are set by the layout function, defined below\r
      }\r
    );\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', { locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape('Rectangle', {\r
              fill: 'lightgray', // the initial value, but data binding may provide different value\r
              stroke: null,\r
              desiredSize: new go.Size(30, 30)\r
            })\r
            .bind('fill'),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    // define the Link template to be minimal\r
    myDiagram.linkTemplate =\r
      new go.Link({ selectable: false, corner: 10 })\r
        .add(\r
          new go.Shape({ strokeWidth: 3, stroke: '#333' })\r
        );\r
\r
    // generate a tree with the default values\r
    buildSettingsMenu();\r
    rebuildGraph();\r
  }\r
\r
  function rebuildGraph() {\r
    var minNodes = document.getElementById('minNodes').value;\r
    minNodes = parseInt(minNodes, 10);\r
\r
    var maxNodes = document.getElementById('maxNodes').value;\r
    maxNodes = parseInt(maxNodes, 10);\r
\r
    generateDigraph(minNodes, maxNodes);\r
  }\r
\r
  function generateDigraph(minNodes, maxNodes) {\r
    myDiagram.startTransaction('generateDigraph');\r
    // replace the diagram's model's nodeDataArray\r
    generateNodes(minNodes, maxNodes);\r
    // replace the diagram's model's linkDataArray\r
    generateLinks();\r
    // force a diagram layout\r
    layout();\r
    myDiagram.commitTransaction('generateDigraph');\r
    myDiagram.zoomToFit();\r
  }\r
\r
  // Creates a random number of randomly colored nodes.\r
  function generateNodes(minNodes, maxNodes) {\r
    var nodeArray = [];\r
    // get the values from the fields and create a random number of nodes within the range\r
    var min = parseInt(minNodes, 10);\r
    var max = parseInt(maxNodes, 10);\r
    if (isNaN(min)) min = 0;\r
    if (isNaN(max) || max < min) max = min;\r
    var numNodes = Math.floor(Math.random() * (max - min + 1)) + min;\r
    var i;\r
    for (i = 0; i < numNodes; i++) {\r
      nodeArray.push({\r
        key: i,\r
        text: i.toString(),\r
        fill: go.Brush.randomColor()\r
      });\r
    }\r
\r
    // randomize the node data\r
    for (i = 0; i < nodeArray.length; i++) {\r
      var swap = Math.floor(Math.random() * nodeArray.length);\r
      var temp = nodeArray[swap];\r
      nodeArray[swap] = nodeArray[i];\r
      nodeArray[i] = temp;\r
    }\r
\r
    // set the nodeDataArray to this array of objects\r
    myDiagram.model.nodeDataArray = nodeArray;\r
  }\r
\r
  // Create some link data\r
  function generateLinks() {\r
    if (myDiagram.nodes.count < 2) return;\r
    var linkArray = [];\r
    var nit = myDiagram.nodes;\r
    var nodes = new go.List(/*go.Node*/);\r
    nodes.addAll(nit);\r
    for (var i = 0; i < nodes.count - 1; i++) {\r
      var from = nodes.get(i);\r
      var numto = Math.floor(1 + (Math.random() * 3) / 2);\r
      for (var j = 0; j < numto; j++) {\r
        var idx = Math.floor(i + 5 + Math.random() * 10);\r
        if (idx >= nodes.count) idx = (i + Math.random() * (nodes.count - i)) | 0;\r
        var to = nodes.get(idx);\r
        linkArray.push({ from: from.data.key, to: to.data.key });\r
      }\r
    }\r
    myDiagram.model.linkDataArray = linkArray;\r
  }\r
\r
  function layout() {\r
    myDiagram.startTransaction('change Layout');\r
    var lay = myDiagram.layout;\r
    var d = document;\r
    var code = 'new go.LayeredDigraphLayout({';\r
\r
    var direction = d.getElementById('direction').value;\r
    if (direction === 'Right') lay.direction = 0;\r
    else if (direction === 'Down') lay.direction = 90;\r
    else if (direction === 'Left') lay.direction = 180;\r
    else if (direction === 'Up') lay.direction = 270;\r
    if (direction != d.getElementById('direction').name) code += \`\\n  direction: \${lay.direction},\`\r
\r
    var layerSpacing = d.getElementById('layerSpacing').value;\r
    layerSpacing = parseFloat(layerSpacing, 10);\r
    lay.layerSpacing = layerSpacing;\r
    if (layerSpacing != d.getElementById('layerSpacing').name) code += \`\\n  layerSpacing: \${lay.layerSpacing},\`\r
\r
    var columnSpacing = d.getElementById('columnSpacing').value;\r
    columnSpacing = parseFloat(columnSpacing, 10);\r
    lay.columnSpacing = columnSpacing;\r
    if (columnSpacing != d.getElementById('columnSpacing').name) code += \`\\n  columnSpacing: \${lay.columnSpacing},\`\r
\r
    var cycleRemove = d.getElementById('cycleRemoveOption').value.split(/\\s+/).join('');\r
    if (cycleRemove === 'DepthFirst') lay.cycleRemoveOption = go.LayeredDigraphCycleRemove.DepthFirst;\r
    else if (cycleRemove === 'Greedy') lay.cycleRemoveOption = go.LayeredDigraphCycleRemove.Greedy;\r
    if (cycleRemove != d.getElementById('cycleRemoveOption').name.split(/\\s+/).join('')) code += \`\\n  cycleRemoveOption: go.LayeredDigraphCycleRemove.\${cycleRemove},\`\r
\r
    var layering = d.getElementById('layeringOption').value.split(/\\s+/).join('');\r
    if (layering === 'OptimalLinkLength') lay.layeringOption = go.LayeredDigraphLayering.OptimalLinkLength;\r
    else if (layering === 'LongestPathSource') lay.layeringOption = go.LayeredDigraphLayering.LongestPathSource;\r
    else if (layering === 'LongestPathSink') lay.layeringOption = go.LayeredDigraphLayering.LongestPathSink;\r
    if (layering != d.getElementById('layeringOption').name.split(/\\s+/).join('')) code += \`\\n  layeringOption: go.LayeredDigraphLayering.\${layering},\`\r
\r
    var initialize = d.getElementById('initializeOption').value.split(/\\s+/).join('');\r
    if (initialize === 'DepthFirstOut') lay.initializeOption = go.LayeredDigraphInit.DepthFirstOut;\r
    else if (initialize === 'DepthFirstIn') lay.initializeOption = go.LayeredDigraphInit.DepthFirstIn;\r
    else if (initialize === 'Naive') lay.initializeOption = go.LayeredDigraphInit.Naive;\r
    if (initialize != d.getElementById('initializeOption').name.split(/\\s+/).join('')) code += \`\\n  initializeOption: go.LayeredDigraphInit.\${initialize},\`\r
\r
    var aggressive = d.getElementById('aggressiveOption').value.split(/\\s+/).join('');\r
    if (aggressive === 'Less') lay.aggressiveOption = go.LayeredDigraphAggressive.Less;\r
    else if (aggressive === 'None') lay.aggressiveOption = go.LayeredDigraphAggressive.None;\r
    else if (aggressive === 'More') lay.aggressiveOption = go.LayeredDigraphAggressive.More;\r
    if (aggressive != d.getElementById('aggressiveOption').name.split(/\\s+/).join('')) code += \`\\n  aggressiveOption: go.LayeredDigraphAggressive.\${aggressive},\`\r
\r
    var setsPortSpots = d.getElementById('setsPortSpots').checked;\r
    lay.setsPortSpots = setsPortSpots;\r
    if (!setsPortSpots) code += \`\\n  setsPortSpots: false,\`\r
\r
    var alignOption = 0;\r
    if (d.getElementById('upperLeftAlign').checked) alignOption |= 1;\r
    if (d.getElementById('upperRightAlign').checked) alignOption |= 2;\r
    if (d.getElementById('lowerLeftAlign').checked) alignOption |= 4;\r
    if (d.getElementById('lowerRightAlign').checked) alignOption |= 8;\r
    lay.alignOption = alignOption;\r
    if (alignOption == 0) code += \`\\n  alignOption: go.LayeredDigraphAlign.None,\`\r
    else if (alignOption == 15 ) code += ''\r
    else code += \`\\n  alignOption: \${alignOption},\`\r
\r
    disable('medianPack', !(alignOption == 0));\r
    disable('straightenPack', !(alignOption == 0));\r
    disable('expandPack', !(alignOption == 0));\r
\r
    if (alignOption == 0) {\r
      var medianPack = d.getElementById('medianPack').checked;\r
      var straightenPack = d.getElementById('straightenPack').checked;\r
      var expandPack = d.getElementById('expandPack').checked;\r
      packOption = 0;\r
      if (d.getElementById('medianPack').checked) packOption |= 4;\r
      if (d.getElementById('straightenPack').checked) packOption = 2;\r
      if (d.getElementById('expandPack').checked) packOption |= 1;\r
      lay.packOption = packOption;\r
      if (packOption == 0) code += \`\\n  packOption: go.LayeredDigraphPack.None,\`\r
      else if (packOption == 7) code += ''\r
      else code += \`\\n  packOption: \${packOption},\`\r
    }\r
    if (code === 'new go.LayeredDigraphLayout({') code = 'new go.LayeredDigraphLayout()'; // If no changes made to layout\r
    else code = code.slice(0, -1) + '\\n})'; // Removes last comma and adds closing bracket\r
    d.getElementById('layoutBuilder').textContent = code;\r
\r
    myDiagram.commitTransaction('change Layout');\r
    myDiagram.zoomToFit();\r
  }\r
\r
  function disable(element, bool) {\r
    document.getElementById(element + 'Row').style.opacity = (bool)? 0.5 : 1;\r
    document.getElementById(element + 'Row').style.pointerEvents = (bool)? 'none' : 'auto';\r
  }\r
\r
  function buildSettingsMenu() {\r
    // Calls to build each setting to the respective builder - Default Properties\r
    buildButtonRow('layerSpacing', 5, 25, 'Layer Spacing', 'table1', 0);\r
    buildButtonRow('columnSpacing', 5, 25, 'Column Spacing', 'table1', 0);\r
    buildSwitch('setsPortSpots', 'Sets Port Spots', 'table1', 'checked');\r
    buildDropdown('cycleRemoveOption', 'Cycle Remove', 'table1', ['Depth First', 'Greedy']);\r
\r
    buildDropdown('direction', 'Direction', 'table2', ['Right', 'Down', 'Left', 'Up']);\r
    buildDropdown('layeringOption', 'Layering', 'table2', ['Optimal Link Length', 'Longest Path Source', 'Longest Path Sink']);\r
    buildDropdown('initializeOption', 'Initialize', 'table2', ['Depth First Out', 'Depth First In', 'Native']);\r
    buildDropdown('aggressiveOption', 'Crossings', 'table2', ['Less', 'More', 'None']);\r
\r
    buildSwitch('upperLeftAlign', 'Upper Left', 'table3', 'checked');\r
    buildSwitch('upperRightAlign', 'Upper Right', 'table3', 'checked');\r
    buildSwitch('lowerLeftAlign', 'Lower Left', 'table3', 'checked');\r
    buildSwitch('lowerRightAlign', 'Lower Right', 'table3', 'checked');\r
\r
    buildSwitch('medianPack', 'Median', 'table4', 'checked');\r
    buildSwitch('straightenPack', 'Straighten', 'table4', 'checked');\r
    buildSwitch('expandPack', 'Expand', 'table4', 'checked');\r
\r
    document.querySelectorAll('.info').forEach(element => {\r
      element.addEventListener('mouseover', () => { iframe(element); });\r
      element.addEventListener('mouseout', () => {\r
        var frame = document.getElementById('frame');\r
        frame.style.display = 'none';\r
        frame.querySelector('#description').innerHTML = '';\r
      });\r
    })\r
  }\r
\r
  function changeNodes(max, value) {  // Allows for Node property to be changed and to make sure max and min never cross each other\r
    e = document;\r
    if (max) {\r
      e.getElementById('maxNodes').value = Math.max(e.getElementById('maxNodes').value - -value, 0);\r
    } else {\r
      e.getElementById('minNodes').value = Math.max(e.getElementById('minNodes').value - -value, 0);\r
    }\r
    if (parseInt(e.getElementById('minNodes').value) > parseInt(e.getElementById('maxNodes').value)) {\r
      (max)? e.getElementById('minNodes').value = e.getElementById('maxNodes').value : e.getElementById('maxNodes').value = e.getElementById('minNodes').value;\r
    }\r
  }\r
\r
  function changeDropdown(element) {  // Changes dropdowns and updates code block and reset button\r
    element.parentNode.querySelector('.button1').style = (element.value != element.name)? "background-color: lightcoral;" : "background-color: lightgray;";\r
    layout();\r
  }\r
\r
  function resetButton(element) {  // Sets property back to original and changes related divs accordingly\r
    e = element.parentNode.querySelector('.input');\r
    e.value = e.name;\r
    element.style = "background-color: lightgray;";\r
    layout();\r
  }\r
\r
  function changeInput(element, change = true) {  // Changes value and checks for default equality for the reset button\r
    e = element.parentNode.querySelector('.inputBox');\r
    change? number = element.name: number = 0;\r
    const max = element.parentNode.querySelector('.maximum').name;\r
    const min = element.parentNode.querySelector('.minimum').name;\r
    const decimal = element.parentNode.querySelector('.decimal').name;\r
    var value = (e.value - -number); // Changes by recorded interval\r
    if (max !== null) value = Math.min(value, max); // Checks for max and min values\r
    if (min !== null) value = Math.max(value, min);\r
    e.value = (value).toFixed(((value - value.toFixed(0)) == 0)? 0 : decimal); // Rounds to assigned place\r
    element.parentNode.querySelector('.button1').style = (e.value != e.name)? "background-color: lightcoral;" : "background-color: lightgray;";\r
    layout();\r
  }\r
\r
  function buildButtonRow(id, change, start, title, table, min = null, max = null,  decimal = 0) {\r
    var template = document.getElementById('buttonRow');\r
    var clone = template.content.cloneNode(true);\r
    clone.querySelector('.button3').name = change;\r
    clone.querySelector('.button2').name = -change;\r
    clone.querySelector('.inputBox').name = start;\r
    clone.querySelector('.inputBox').id = id;\r
    clone.querySelector('.inputBox').value = start;\r
    clone.querySelector('.maximum').name = max;\r
    clone.querySelector('.minimum').name = min;\r
    clone.querySelector('.decimal').name = decimal;\r
    clone.querySelector('.title').textContent = title;\r
    clone.querySelector('.row').id = (id + 'Row')\r
    document.getElementById(table).appendChild(clone);\r
  }\r
\r
  function buildDropdown(id, title, table, options) {\r
    var template = document.getElementById('dropdown');\r
    var clone = template.content.cloneNode(true);\r
    dropdown = clone.querySelector('.input')\r
    dropdown.name = options[0];\r
    dropdown.id = id;\r
    clone.querySelector('.title').textContent = title;\r
    clone.querySelector('.row').id = (id + 'Row')\r
    options.forEach(element => {\r
      let option = document.createElement('option');\r
      option.value = element; // Set the value to be the index + 1\r
      option.text = element; // Set the text to be the element from the array\r
      dropdown.add(option);\r
    });\r
    dropdown.options[0].selected = true;\r
    document.getElementById(table).appendChild(clone);\r
  }\r
\r
  function buildSwitch(id, title, table, checked) {\r
    var template = document.getElementById('switch');\r
    var clone = template.content.cloneNode(true);\r
    checkSwitch = clone.querySelector('.input')\r
    checkSwitch.id = id;\r
    checkSwitch.checked = checked;\r
    clone.querySelector('.title').textContent = title;\r
    clone.querySelector('.row').id = (id + 'Row')\r
\r
    document.getElementById(table).appendChild(clone);\r
  }\r
\r
  function copyCode() {\r
    navigator.clipboard.writeText(document.getElementById('layoutBuilder').textContent);\r
    document.getElementById('default').style.display = 'none'\r
    document.getElementById('clicked').style.display = 'inline-flex'\r
    document.getElementById('copyButton').style.pointerEvents = 'none'\r
    setTimeout(() => {\r
      document.getElementById('default').style.display = 'inline-flex'\r
      document.getElementById('clicked').style.display = 'none'\r
      document.getElementById('copyButton').style.pointerEvents = 'auto'\r
    }, 1500);\r
  }\r
\r
  function iframe(element) {\r
    var iframe = document.getElementById('apiFrame');\r
    var frame = document.getElementById('frame');\r
    frame.style.display = 'block';\r
    frame.style.left = (element.getBoundingClientRect().left) + 'px';\r
    frame.style.top = (element.getBoundingClientRect().top - 10 + window.pageYOffset) + 'px';\r
\r
    var id = element.parentElement.querySelector('.input').id;\r
    frame.querySelector('#name').textContent = id;\r
    frame.querySelector('#description').innerHTML = (iframe.contentWindow.document.getElementById(id).parentElement.children[2].firstChild.firstChild.innerHTML);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`.table {\r
    display: table;\r
    width: 100%;\r
  }\r
  .row {\r
    display: table-row;\r
  }\r
  .cell {\r
    display: table-cell;\r
    vertical-align: middle;\r
  }\r
  .celldif {\r
    display: table-cell;\r
  }\r
  .sampleWrapper {\r
    display: flex;\r
    flex-direction: column;\r
    @media (min-width: 800px) {\r
      flex-direction: row;\r
    }\r
\r
    & > div:first-child {\r
      margin-bottom: 0.5rem;\r
      @media (min-width: 800px) {\r
        margin-right: 0;\r
        margin-bottom: 0;\r
      }\r
    }\r
  }\r
  .info {\r
    display: inline-block;\r
    cursor: pointer;\r
  }\r
  .copyButton:hover {\r
    background-color: #e9e9e9 !important;\r
    color: #000000 !important;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`layered-digraph`,`html`];var g=y();l(`1xquvxb`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};