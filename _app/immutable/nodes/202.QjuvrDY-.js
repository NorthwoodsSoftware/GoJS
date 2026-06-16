import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Packed Layout for Packing Nodes into an Area`,titleShort:`Packed Layout Demo`,indexDescription:`A custom Layout that positions nodes in a packed area.`,screenshot:`packedlayout`,priority:2,tags:[`customlayout`,`extensions`],description:`TypeScript: Arrange nodes into rectangular or elliptical areas, ignoring any links.`,module:!0,tailwind:!0},htmlContent:`<iframe id="apiFrame" src="https://gojs.net/latest/api/symbols/PackedLayout.html" style="display: none;"></iframe>\r
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
        <details open class="group py-1 text-lg select-none">\r
          <summary class="flex cursor-pointer flex-row items-center whitespace-nowrap justify-between py-1 font-semibold marker:[font-size:0px]">Node Settings\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>\r
            </svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table " style="padding-right: 15px;">\r
              <div class="row" > <!--Num Nodes-->\r
                <div class="cell whitespace-nowrap p-1 select-none" style="font-size: large; padding-right: 15px;">Number of Nodes</div>\r
                <div class="cell max-w-xs">\r
                  <label for="numNodes" class="items-center cursor-pointer">\r
                    <div class="relative flex items-center max-w-[6.5rem] ">\r
                      <button type="button" onclick="getElementById('numNodes').value = Math.max(getElementById('numNodes').value - 10, 1)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                          </svg>\r
                      </button>\r
                      <input type="text" id="numNodes" onchange="this.value = Math.max(this.value, 1)" aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-1 border-gray-300 h-7 text-center outline-none text-gray-900 text-sm w-11 m-[-4.5px] z-10" value="100" required />\r
                      <button type="button" onclick="getElementById('numNodes').value = Math.max(getElementById('numNodes').value - -10, 1)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[7px] pl-[12px]">\r
                          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                          </svg>\r
                      </button>\r
                    </div>\r
                  </label>\r
                </div>\r
              </div>\r
\r
              <div class="row"> <!--Min Side Length-->\r
                <div id= "nodeWidthText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large">Minimum Size</div>\r
                <div class="cell max-w-xs" id="nodeWidthForm">\r
                  <label for="minLinks" class="items-center cursor-pointer">\r
                    <div class="relative flex items-center max-w-[6.5rem]">\r
                      <button type="button" onclick="changeNodes(false, -5)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                          </svg>\r
                      </button>\r
                      <input type="text" id="nodeMinSide" onclick="changeNodes(false, 0)" aria-describedby="helper-text-explanation" onchange="" class="bg-gray-50 border-x-1 border-gray-300 h-7 text-center text-gray-900 text-sm outline-none w-11 m-[-4.5px] z-10" value="30" required />\r
                      <button type="button" onclick="changeNodes(false, 5)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none  m-0 pr-[7px] pl-[12px]">\r
                          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                          </svg>\r
                      </button>\r
                    </div>\r
                  </label>\r
                </div>\r
              </div>\r
\r
              <div class="row"> <!--Max Side Length-->\r
                <div id= "nodeHeightText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large">Maximum Size</div>\r
                <div class="cell max-w-xs" id="nodeHeightForm">\r
                  <label for="minLinks" class="items-center cursor-pointer">\r
                    <div class="relative flex items-center max-w-[6.5rem]">\r
                      <button type="button" onclick="changeNodes(true, -5)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                          </svg>\r
                      </button>\r
                      <input type="text" id="nodeMaxSide" onclick="changeNodes(true, 0)" aria-describedby="helper-text-explanation" onchange="" class="bg-gray-50 border-x-1 outline-none border-gray-300 h-7 text-center text-gray-900 text-sm block  w-11 m-[-4.5px] z-10" value="50" required />\r
                      <button type="button" onclick="changeNodes(true, 5)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none  m-0 pr-[7px] pl-[12px]">\r
                          <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                          </svg>\r
                      </button>\r
                    </div>\r
                  </label>\r
                </div>\r
              </div>\r
            </div>\r
            <div>\r
              <div class="row" id="hasCircularNodesRow"><!--Node Shape-->\r
                <svg onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-right: 2px; margin-bottom: 6px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>\r
                </svg>\r
                <div class="cell whitespace-nowrap tooltip-trigger align-middle select-none p-1" style= "padding-right: 10px;">Node Shape</div>\r
                <div class="celldif">\r
                  <select id="hasCircularNodes" onchange="layout(true)" class="input align-middle bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[120px] p-1.5">\r
                    <option value="Rectangle" selected="selected">Rectangle</option>\r
                    <option value="Ellipse">Ellipse</option>\r
                    <option value="Square">Square</option>\r
                    <option value="Circle">Circle</option>\r
                  </select>\r
                </div>\r
              </div>\r
              <button type="button" class="mt-2 ml-[60px]" onclick="rebuildGraph()">Generate Graph</button>\r
            </div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg select-none">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]">Packed Layout Settings\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table" id="table1"></div>\r
            <div class="table mt-[-15px]" id="table2"></div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]  select-none">Packed Layout Builder\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">\r
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>\r
            </svg>\r
          </summary>\r
          <div class="p-1" style="position: relative;">\r
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
  </div>\r
\r
  <template id="buttonRow">\r
    <div class="row tooltip" >\r
      <svg onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-right: 2px; margin-bottom: 0px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
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
  <template id="dropdown">\r
    <div class="row">\r
      <svg  onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-top: 17px; margin-right: 3px; margin-left: 4px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
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
            <select onchange="changeDropdown(this)" style="width: 160px;" class="input outline-none bg-gray-50 border rounded-s-none rounded-e-lg border-gray-300 text-gray-900 text-sm block p-1.5"></select>\r
        </div>\r
      </div>\r
    </div>\r
  </template>`,jsCode:`import go from 'gojs';\r
  import {\r
    PackedLayout,\r
    PackMode,\r
    PackShape,\r
    SortMode,\r
    SortOrder\r
  } from '../extensionsJSM/PackedLayout.js';\r
\r
  var myDiagram;\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must be the ID or reference to div\r
      'animationManager.isEnabled': true,\r
      layout: new PackedLayout(),\r
      scale: 0.75,\r
      isReadOnly: true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .bind('visible')\r
        .add(\r
          new go.Shape({ strokeWidth: 0 })\r
            .bind('figure')\r
            .bind('width')\r
            .bind('height')\r
            .bind('fill')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel([]);\r
\r
    buildSettingsMenu();\r
    rebuildGraph();\r
    layout();\r
  }\r
\r
  function layout(change = false) {\r
    myDiagram.startTransaction('change Layout');\r
    var lay = myDiagram.layout;\r
    var d = document;\r
    disable('aspectRatio', false);\r
    disable('width', false);\r
    disable('height', false);\r
    disable('spacing', false);\r
    disable('hasCircularNodes', false);\r
    var code = 'new PackedLayout({'\r
\r
    var packShape = d.getElementById('packShape').value;\r
    if (packShape === 'Elliptical') lay.packShape = PackShape.Elliptical;\r
    else if (packShape === 'Rectangular') lay.packShape = PackShape.Rectangular;\r
    else if (packShape === 'Spiral') {\r
      lay.packShape = PackShape.Spiral;\r
      disable('aspectRatio', true);\r
      disable('width', true);\r
      disable('height', true);\r
      disable('hasCircularNodes', true);\r
      d.getElementById('hasCircularNodes').value = 'Circle';\r
      change = true;\r
    }\r
    if (packShape != d.getElementById('packShape').name) code += \`\\n  packShape: go.PackShape.\${packShape},\`\r
\r
    var packMode = d.getElementById('packMode').value.split(/\\s+/).join('');\r
    if (packMode === 'AspectRatio') {lay.packMode = PackMode.AspectOnly; disable('width', true); disable('height', true);}\r
    else if (packMode === 'ExpandtoFit') {lay.packMode = PackMode.ExpandToFit; disable('aspectRatio', true); disable('spacing', true); }\r
    else if (packMode === 'Fit') {lay.packMode = PackMode.Fit; disable('aspectRatio', true);}\r
    if (packMode != d.getElementById('packMode').name.split(/\\s+/).join('')) code += \`\\n  packMode: go.PackMode.\${packMode},\`\r
\r
    var sortOrder = d.getElementById('sortOrder').value;\r
    if (sortOrder === 'Descending') lay.sortOrder = SortOrder.Descending;\r
    else if (sortOrder === 'Ascending') lay.sortOrder = SortOrder.Ascending;\r
    if (sortOrder != d.getElementById('sortOrder').name) code += \`\\n  sortOrder: go.SortOrder.\${sortOrder},\`\r
\r
    var sortMode = d.getElementById('sortMode').value.split(/\\s+/).join('');\r
    if (sortMode === 'None') lay.sortMode = SortMode.None;\r
    else if (sortMode === 'MaxSide') lay.sortMode = SortMode.MaxSide;\r
    else if (sortMode === 'Area') lay.sortMode = SortMode.Area;\r
    if (sortMode != d.getElementById('sortMode').name.split(/\\s+/).join('')) code += \`\\n  sortMode: go.SortMode.\${sortMode},\`\r
\r
    var aspectRatio = d.getElementById('aspectRatio').value;\r
    lay.aspectRatio = parseFloat(aspectRatio);\r
    if ((d.getElementById('aspectRatio').name != aspectRatio) && (packShape !== 'Spiral') && (packMode === 'AspectRatio')) code += \`\\n  aspectRatio: \${aspectRatio},\`\r
\r
    var layoutWidth = d.getElementById('width').value;\r
    var layoutHeight = d.getElementById('height').value;\r
    lay.size = new go.Size(parseFloat(layoutWidth), parseFloat(layoutHeight));\r
    if (((d.getElementById('width').name !== layoutWidth) || (d.getElementById('height').name !== layoutHeight)) && (packShape !== 'Spiral') && (packMode !== 'AspectRatio')) code += \`\\n  size: new go.Size(\${layoutWidth}, \${layoutHeight}),\`\r
\r
    var spacing = d.getElementById('spacing').value;\r
    lay.spacing = parseFloat(spacing);\r
    if ((d.getElementById('spacing').name != spacing) && (packMode !== 'ExpandtoFit')) code += \`\\n  spacing: \${spacing},\`\r
\r
    var hasCircularNodes = (d.getElementById('hasCircularNodes').value === 'Circle');\r
    lay.hasCircularNodes = hasCircularNodes;\r
    if (hasCircularNodes) code += \`\\n  hasCircularNodes: \${hasCircularNodes},\`\r
\r
    if (code === 'new PackedLayout({') code = 'new PackedLayout()'; // If no changes made to layout\r
    else code = code.slice(0, -1) + '\\n})'; // Removes last comma and adds closing bracket\r
    d.getElementById('layoutBuilder').textContent = code;\r
\r
    myDiagram.commitTransaction('change Layout');\r
    myDiagram.zoomToFit();\r
    if (change) rebuildGraph();\r
  }\r
\r
  function disable(element, bool) {\r
    document.getElementById(element + 'Row').style.opacity = (bool)? 0.5 : 1;\r
    document.getElementById(element + 'Row').style.pointerEvents = (bool)? 'none' : 'auto';\r
  }\r
\r
  function rebuildGraph() {\r
    var numNodes = document.getElementById('numNodes').value;\r
    numNodes = parseInt(numNodes, 10);\r
\r
    var minSide = document.getElementById('nodeMinSide').value;\r
    minSide = parseInt(minSide, 10);\r
\r
    var maxSide = document.getElementById('nodeMaxSide').value;\r
    maxSide = parseInt(maxSide, 10);\r
\r
    var sameSides = false;\r
    var shape = document.getElementById('hasCircularNodes').value;\r
    if (shape === 'Ellipse') {shape = 'Ellipse'}\r
    else if (shape === 'Rectangle') {shape = 'Rectangle'}\r
    else if (shape === 'Square') {shape = 'Rectangle'; sameSides = true;}\r
    else if (shape === 'Circle') {shape = 'Ellipse'; sameSides = true;}\r
\r
    generateNodeData(numNodes, minSide, maxSide, shape, sameSides);\r
    myDiagram.zoomToFit();\r
  }\r
\r
  function generateNodeData(numNodes, min, max, shape, sameSides) {\r
    var nodeArray = [];\r
\r
    for (var i = 0; i < numNodes; i++) {\r
      var height = min + (Math.random()* (max - min));\r
      var width = min + (Math.random()* (max - min));\r
      if (sameSides) height = width;\r
      nodeArray.push({\r
        key: i,\r
        figure: shape,\r
        fill: go.Brush.randomColor(),\r
        width: width,\r
        height: height\r
      });\r
    }\r
\r
    for (i = 0; i < nodeArray.length; i++) {\r
      var swap = Math.floor(Math.random() * nodeArray.length);\r
      var temp = nodeArray[swap];\r
      nodeArray[swap] = nodeArray[i];\r
      nodeArray[i] = temp;\r
    }\r
\r
    myDiagram.model.nodeDataArray = nodeArray;\r
  }\r
\r
  function buildSettingsMenu() {\r
    buildButtonRow('aspectRatio', 0.05, 1.00, 'Aspect Ratio', 'table1', 0.1, 100, 2);\r
    buildButtonRow('width', 50, 600, 'Layout Width',  'table1', 0);\r
    buildButtonRow('height', 50, 600, 'Layout Height', 'table1', 0);\r
    buildButtonRow('spacing', 10, 0, 'Spacing', 'table1');\r
\r
    buildDropdown('packShape', 'Pack Shape', 'table2', ['Elliptical', 'Rectangular', 'Spiral'])\r
    buildDropdown('packMode', 'Pack Mode',  'table2', ['Aspect Ratio', 'Expand to Fit', 'Fit'])\r
    buildDropdown('sortOrder', 'Sort Order', 'table2', ['Descending', 'Ascending'])\r
    buildDropdown('sortMode', 'Sort Mode', 'table2', ['None', 'Max Side Length', 'Area'])\r
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
  function changeNodes(max, value) {\r
    var e = document;\r
    if (max) {\r
      e.getElementById('nodeMaxSide').value = Math.max(e.getElementById('nodeMaxSide').value - -value, 1);\r
    } else {\r
      e.getElementById('nodeMinSide').value = Math.max(e.getElementById('nodeMinSide').value - -value, 1);\r
    }\r
    if (parseInt(e.getElementById('nodeMinSide').value) > parseInt(e.getElementById('nodeMaxSide').value)) {\r
      (max)? e.getElementById('nodeMinSide').value = e.getElementById('nodeMaxSide').value : e.getElementById('nodeMaxSide').value = e.getElementById('nodeMinSide').value;\r
    }\r
  }\r
\r
  function changeDropdown(element) {\r
    element.parentNode.querySelector('.button1').style = (element.value != element.name)? "background-color: lightcoral;" : "background-color: lightgray;";\r
    layout();\r
  }\r
\r
  function resetButton(element) {\r
    var e = element.parentNode.querySelector('.input');\r
    e.value = e.name;\r
    element.style = "background-color: lightgray;";\r
    layout();\r
  }\r
\r
  function changeInput(element, change = true) {\r
    var e = element.parentNode.querySelector('.inputBox');\r
    var number = change? element.name: number = 0;\r
    const max = element.parentNode.querySelector('.maximum').name;\r
    const min = element.parentNode.querySelector('.minimum').name;\r
    const decimal = element.parentNode.querySelector('.decimal').name;\r
    var value = (e.value - -number);\r
    if (max !== null) value = Math.min(value, max);\r
    if (min !== null) value = Math.max(value, min);\r
    e.value = (value).toFixed(((value - value.toFixed(0)) == 0)? 0 : decimal);\r
    e.parentNode.querySelector('.button1').style = (e.name == e.value)? "background-color: lightgray;" : "background-color: lightcoral;";\r
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
\r
    document.getElementById(table).appendChild(clone);\r
  }\r
\r
  function buildDropdown(id, title, table, options) {\r
    var template = document.getElementById('dropdown');\r
    var clone = template.content.cloneNode(true);\r
    var dropdown = clone.querySelector('.input')\r
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
  window.addEventListener('DOMContentLoaded', init);\r
  window.layout = layout;\r
  window.copyCode = copyCode;\r
  window.rebuildGraph = rebuildGraph;\r
  window.changeInput = changeInput;\r
  window.resetButton = resetButton;\r
  window.changeDropdown = changeDropdown;\r
  window.changeNodes = changeNodes`,cssCode:`.table {\r
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
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`customlayout`,`extensions`];var g=y();l(`i9wwdf`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};