import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Force Directed Layout Demonstration of ForceDirectedLayout Options`,titleShort:`Force Directed Layout Demo`,indexDescription:`Shows ForceDirectedLayout and options. Treats the graph as if it were a system of physical bodies with forces acting on them and between them.`,screenshot:`fdlayout`,priority:2,tags:[`collections`,`force-directed`,`html`],description:`Interactive demonstration of physics layout features by the ForceDirectedLayout class.`,tailwind:!0},htmlContent:`<template id="buttonRow">\r
  <div class="row tooltip" >\r
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
        <button type="button" onclick="changeInput(this)" class="button2  bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-none h-7  m-0 pr-[11px] pl-[6px]">\r
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
\r
  <iframe id="apiFrame" src="https://gojs.net/latest/api/symbols/ForceDirectedLayout.html" style="display: none;"></iframe>\r
  <div id="frame" style="z-index: 100; pointer-events: none; position: absolute; display: none; ">\r
      <div id="container" style="border: 1px solid #ddd; border-radius: 5px; padding: 15px; max-width: 600px;margin: 20px auto; font-family: Arial, sans-serif; background-color: #fff;">\r
        <div id="name" class="name" style="font-weight: bold; font-size: 16px;  display: flex; align-items: center;"></div>\r
        \r
      </div>\r
  </div>\r
\r
  <div class="sampleWrapper">\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 550px; border: solid 1px black; margin-right: 10px;"></div>\r
\r
    <div style="flex: 1;">\r
      <section class="grid grid-cols-1 gap-y-3 divide-y">\r
        <details open class="group py-1 text-lg">\r
          <summary class="flex cursor-pointer flex-row items-center whitespace-nowrap justify-between py-1 font-semibold marker:[font-size:0px] select-none">Nodes and Links\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>\r
            </svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
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
              <div class="row"> <!--min children-->\r
                <div id= "nodeHeightText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large">Minumum Children</div>\r
                <div class="cell max-w-xs" id="nodeHeightForm"> <!--min children-->\r
                  <label for="minLinks" class="items-center cursor-pointer">\r
                    <div class="relative flex items-center max-w-[6.5rem]">\r
                      <button type="button" id="decrement-button" onclick="changeChildren(false, -1)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                        </svg>\r
                      </button>\r
                      <input type="text" id="minChil" onclick="changeChildren(false, 0)" onchange="changeChildren(false, 0)" aria-describedby="helper-text-explanation" onchange="" class="bg-gray-50 border-x-1 outline-none border-gray-300 h-7 text-center text-gray-900 text-sm block  w-11 m-[-4.5px] z-10" value="1" required />\r
                      <button type="button" id="increment-button" onclick="changeChildren(false, 1)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none  m-0 pr-[7px] pl-[12px]">\r
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                        </svg>\r
                      </button>\r
                    </div>\r
                  </label>\r
                </div>\r
              </div>\r
              <div class="row"> <!--max children-->\r
                <div id="minLinkText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large; ">Maximum Children</div>\r
                <div class="cell max-w-xs" id="minLinksForm"> <!--max children-->\r
                  <label for="minLinks" class="items-center cursor-pointer">\r
                    <div class="relative flex items-center max-w-[6.5rem]">\r
                      <button type="button" id="decrement-button" onclick="changeChildren(true, -1)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100  focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                        </svg>\r
                      </button>\r
                      <input type="text" id="maxChil" aria-describedby="helper-text-explanation" onchange="changeChildren(true, 0)" onclick="changeChildren(true, 0)" class="bg-gray-50 border-x-1 outline-none border-gray-300 h-7 text-center text-gray-900 text-sm block  w-11 m-[-4.5px] z-10" value="10" required />\r
                      <button type="button" id="increment-button" onclick="changeChildren(true, 1)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100  focus:ring-2 focus:outline-none m-0 pr-[7px] pl-[12px]">\r
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
              <button style="white-space: nowrap;" type="button" onclick="rebuildGraph()">Generate Tree</button>\r
            </span>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px] select-none">Layout Properties\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table" id="table1"></div>\r
            <div class="table" id="table2"></div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg" >\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px] select-none">Force Directed Layout Builder\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
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
  </div>`,jsCode:`// define a custom ForceDirectedLayout for this sample\r
  class DemoForceDirectedLayout extends go.ForceDirectedLayout {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    // Override the makeNetwork method to also initialize\r
    // ForceDirectedVertex.isFixed from the corresponding Node.isSelected.\r
    makeNetwork(coll) {\r
      // call base method for standard behavior\r
      const net = super.makeNetwork(coll);\r
      net.vertexes.each(vertex => {\r
        const node = vertex.node;\r
        if (node !== null) vertex.isFixed = node.isSelected;\r
      });\r
      return net;\r
    }\r
  }\r
  // end DemoForceDirectedLayout class\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform, // zoom to make everything fit in the viewport\r
      layout: new DemoForceDirectedLayout() // use custom layout\r
      // other Layout properties are set by the layout function, defined below\r
    });\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          // make sure the Node.location is different from the Node.position\r
          locationSpot: go.Spot.Center\r
        })\r
        .bind('text', 'text') // for sorting\r
        .add(\r
          new go.Shape('Ellipse', {\r
              fill: 'lightgray',\r
              stroke: null,\r
              desiredSize: new go.Size(30, 30)\r
            })\r
            .bind('fill', 'layer', c => randomLayerColors[c % 25]),\r
          new go.TextBlock()\r
            .bind('text', 'text')\r
        )\r
\r
      // define the Link template\r
      myDiagram.linkTemplate =\r
        new go.Link({ selectable: false })\r
          .add(\r
            new go.Shape({ strokeWidth: 3, stroke: '#333' })\r
          );\r
\r
      // generate a tree using the default values\r
      buildSettingsMenu();\r
      rebuildGraph();\r
    }\r
\r
  function rebuildGraph() {\r
    let minNodes = document.getElementById('minNodes').value;\r
    minNodes = parseInt(minNodes, 10);\r
\r
    let maxNodes = document.getElementById('maxNodes').value;\r
    maxNodes = parseInt(maxNodes, 10);\r
\r
    let minChil = document.getElementById('minChil').value;\r
    minChil = parseInt(minChil, 10);\r
\r
    let maxChil = document.getElementById('maxChil').value;\r
    maxChil = parseInt(maxChil, 10);\r
\r
    generateTree(minNodes, maxNodes, minChil, maxChil);\r
  }\r
\r
  function generateTree(minNodes, maxNodes, minChil, maxChil) {\r
    myDiagram.startTransaction('generateTree');\r
    // replace the diagram's model's nodeDataArray\r
    generateNodes(minNodes, maxNodes);\r
    // replace the diagram's model's linkDataArray\r
    generateLinks(minChil, maxChil);\r
    // perform a diagram layout with the latest parameters\r
    layout();\r
    shuffleColors(); // Shuffles palette to look like new random colors\r
    layerNodes(); // Sets layer value for all the new nodes\r
    myDiagram.commitTransaction('generateTree');\r
  }\r
\r
  // Creates a random number of randomly colored nodes.\r
  function generateNodes(min, max) {\r
    const nodeArray = [];\r
    if (isNaN(min) || min < 0) min = 0;\r
    if (isNaN(max) || max < min) max = min;\r
    const numNodes = Math.floor(Math.random() * (max - min + 1)) + min;\r
    for (let i = 0; i < numNodes; i++) {\r
      nodeArray.push({\r
        key: i,\r
        text: i.toString(),\r
        fill: go.Brush.randomColor()\r
      });\r
    }\r
\r
    // randomize the node data\r
    for (i = 0; i < nodeArray.length; i++) {\r
      const swap = Math.floor(Math.random() * nodeArray.length);\r
      const temp = nodeArray[swap];\r
      nodeArray[swap] = nodeArray[i];\r
      nodeArray[i] = temp;\r
    }\r
\r
    // set the nodeDataArray to this array of objects\r
    myDiagram.model.nodeDataArray = nodeArray;\r
  }\r
\r
  // Takes the random collection of nodes and creates a random tree with them.\r
  // Respects the minimum and maximum number of links from each node.\r
  // (The minimum can be disregarded if we run out of nodes to link to)\r
  function generateLinks(min, max) {\r
    if (myDiagram.nodes.count < 2) return;\r
    if (isNaN(min) || min < 1) min = 1;\r
    if (isNaN(max) || max < min) max = min;\r
    const linkArray = [];\r
    // make two Lists of nodes to keep track of where links already exist\r
    const nit = myDiagram.nodes;\r
    const nodes = new go.List(/*go.Node*/);\r
    nodes.addAll(nit);\r
    const available = new go.List(/*go.Node*/);\r
    available.addAll(nodes);\r
    for (let i = 0; i < nodes.length; i++) {\r
      const next = nodes.get(i);\r
      available.remove(next);\r
      const children = Math.floor(Math.random() * (max - min + 1)) + min;\r
      for (let j = 1; j <= children; j++) {\r
        if (available.length === 0) break;\r
        const to = available.get(0);\r
        available.remove(to);\r
        // get keys from the Node.text strings\r
        const nextKey = parseInt(next.text, 10);\r
        const toKey = parseInt(to.text, 10);\r
        linkArray.push({ from: nextKey, to: toKey });\r
      }\r
    }\r
    myDiagram.model.linkDataArray = linkArray;\r
  }\r
\r
  function buildSettingsMenu() {\r
    // Builds the setting menu through calls to respective builder\r
    buildButtonRow('maxIterations', 10, 300, 'Max Iterations','table1', 0);\r
    buildButtonRow('epsilonDistance', 0.05, 1, 'Epsilon','table1', 0.05, null, 2);\r
    buildButtonRow('arrangementWidth', 10, 100, 'Spacing Width','table1', 0);\r
    buildButtonRow('arrangementHeight', 5, 100, 'Spacing Height','table1', 0);\r
    buildButtonRow('prelayoutQuality', 0.1, '', 'Prelayout Quality','table1', 0, null, 1);\r
\r
    buildButtonRow('defaultElectricalCharge', 10, 150, 'Electrical Charge','table2', 0);\r
    buildButtonRow('defaultGravitationalMass', 10, 0, 'Gravitational Mass','table2', 0);\r
    buildButtonRow('defaultSpringStiffness', 0.01, 0.05, 'Spring Stiffness','table2', 0, null, 2);\r
    buildButtonRow('defaultSpringLength', 10, 50, 'Spring Length','table2', 0);\r
    buildButtonRow('prelayoutSpread', 1, 10, 'Prelayout Spread','table2', 0);\r
\r
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
  function layerNodes(nodes = myDiagram.findTreeRoots(), layer = 0) {\r
    if (nodes.count == 0) return;\r
    nodes.each(node => { //recursively goes through all children of the graph sending a layer down to be set on each\r
      myDiagram.model.set(node.data, 'layer', layer);\r
      layerNodes(node.findTreeChildrenNodes(), layer + 1);\r
    });\r
  }\r
\r
  function shuffleColors() {\r
    var tempList = [];\r
    while (randomLayerColors.length > 0) {  // Goes through the color palette randomly pulling out colors to reorder them\r
      let item = randomLayerColors.splice(Math.round(Math.random() * randomLayerColors.length - 1), 1);\r
      tempList.push(item[0]);\r
    }\r
    randomLayerColors = tempList;\r
  }\r
\r
  var randomLayerColors = [ // Color Palette used to color the layers of the graph\r
    "hsl(54, 76%, 84%)",\r
    "hsl(208, 55%, 76%)",\r
    "hsl(44, 82%, 83%)",\r
    "hsl(30, 89%, 83%)",\r
    "hsl(26, 90%, 80%)",\r
    "hsl(10, 85%, 81%)",\r
    "hsl(354, 83%, 84%)",\r
    "hsl(340, 80%, 84%)",\r
    "hsl(319, 43%, 79%)",\r
    "hsl(287, 30%, 75%)",\r
    "hsl(255, 32%, 74%)",\r
    "hsl(220, 77%, 86%)",\r
    "hsl(187, 53%, 75%)",\r
    "hsl(175, 38%, 73%)",\r
    "hsl(136, 37%, 76%)",\r
    "hsl(98, 41%, 79%)",\r
    "hsl(72, 51%, 81%)",\r
    "hsl(84, 67%, 81%)",\r
    "hsl(88, 89%, 90%)",\r
    "hsl(44, 95%, 92%)",\r
    "hsl(24, 96%, 90%)",\r
    "hsl(2, 100%, 88%)",\r
    "hsl(351, 94%, 93%)",\r
    "hsl(192, 59%, 91%)",\r
    "hsl(191, 65%, 88%)"\r
  ];\r
\r
  // Update the layout from the controls.\r
  // Changing the properties will invalidate the layout.\r
  function layout() {\r
    myDiagram.startTransaction('changed Layout');\r
    const lay = myDiagram.layout;\r
    lay.arrangesToOrigin = true;\r
    d = document;\r
    var code = 'new DemoForceDirectedLayout({'\r
\r
    let maxIter = d.getElementById('maxIterations').value;\r
    maxIter = parseInt(maxIter, 10);\r
    lay.maxIterations = maxIter;\r
    if (maxIter != d.getElementById('maxIterations').name) code += \`\\n  maxIterations: \${maxIter},\`;\r
\r
    let epsilon = d.getElementById('epsilonDistance').value;\r
    epsilon = parseFloat(epsilon, 10);\r
    lay.epsilonDistance = epsilon;\r
    if (epsilon != d.getElementById('epsilonDistance').name) code += \`\\n  epsilonDistance: \${epsilon},\`;\r
\r
    let arrangementWidth = d.getElementById('arrangementWidth').value;\r
    let arrangementHeight = d.getElementById('arrangementHeight').value;\r
    lay.arrangementSpacing = new go.Size(parseFloat(arrangementWidth, 10), parseFloat(arrangementHeight, 10));\r
    if (arrangementWidth != d.getElementById('arrangementWidth').name || arrangementHeight != d.getElementById('arrangementHeight').name) code += \`\\n  arrangementSpacing: new go.Size(\${arrangementWidth}, \${arrangementHeight}),\`;\r
\r
    let charge = d.getElementById('defaultElectricalCharge').value;\r
    charge = parseFloat(charge, 10);\r
    lay.defaultElectricalCharge = charge;\r
    if (charge != d.getElementById('defaultElectricalCharge').name) code += \`\\n  defaultElectricalCharge: \${charge},\`;\r
\r
    let mass = d.getElementById('defaultGravitationalMass').value;\r
    mass = parseFloat(mass, 10);\r
    lay.defaultGravitationalMass = mass;\r
    if (mass != d.getElementById('defaultGravitationalMass').name) code += \`\\n  defaultGravitationalMass: \${mass},\`;\r
\r
    let stiffness = d.getElementById('defaultSpringStiffness').value;\r
    stiffness = parseFloat(stiffness, 10);\r
    lay.defaultSpringStiffness = stiffness;\r
    if (stiffness != d.getElementById('defaultSpringStiffness').name) code += \`\\n  defaultSpringStiffness: \${stiffness},\`;\r
\r
    let length = d.getElementById('defaultSpringLength').value;\r
    length = parseFloat(length, 10);\r
    lay.defaultSpringLength = length;\r
    if (length != d.getElementById('defaultSpringLength').name) code += \`\\n  defaultSpringLength: \${length},\`;\r
\r
    let preQuality = d.getElementById('prelayoutQuality').value;\r
    if (preQuality === '') preQuality = NaN;\r
    else preQuality = parseFloat(preQuality, 10);\r
    lay.prelayoutQuality = preQuality;\r
    if (!isNaN(preQuality)) code += \`\\n  prelayoutQuality: \${preQuality},\`;\r
\r
    let prelayoutSpread = d.getElementById('prelayoutSpread').value;\r
    prelayoutSpread = parseFloat(prelayoutSpread, 10);\r
    lay.prelayoutSpread = prelayoutSpread;\r
    if (prelayoutSpread != d.getElementById('prelayoutSpread').name) code += \`\\n  prelayoutSpread: \${prelayoutSpread},\`;\r
\r
    if (code === 'new DemoForceDirectedLayout({') code = 'new DemoForceDirectedLayout()'; // If no changes made to layout\r
    else code = code.slice(0, -1) + '\\n})'; // Removes last comma and adds closing bracket\r
    d.getElementById('layoutBuilder').textContent = code;\r
    myDiagram.commitTransaction('changed Layout');\r
    myDiagram.zoomToFit();\r
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
  function changeChildren(max, value) {  // Makes sure children number properties max and min don't cross\r
    e = document;\r
    if (max) {\r
      e.getElementById('maxChil').value = Math.max(e.getElementById('maxChil').value - -value, 0);\r
    } else {\r
      e.getElementById('minChil').value = Math.max(e.getElementById('minChil').value - -value, 0);\r
    }\r
    if (parseInt(e.getElementById('minChil').value) > parseInt(e.getElementById('maxChil').value)) {\r
      (max)? e.getElementById('minChil').value = e.getElementById('maxChil').value : e.getElementById('maxChil').value = e.getElementById('minChil').value;\r
    }\r
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
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`force-directed`,`html`];var g=y();l(`14khe11`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};