import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Tree Layout Demonstration of TreeLayout Options`,titleShort:`Tree Layout Demo`,indexDescription:`Shows TreeLayout and options. Positions nodes of a tree-structured graph in layers (rows or columns). `,screenshot:`tlayout`,priority:2,tags:[`collections`,`treelayout`,`html`],description:`Interactive demonstration of tree layout features by the TreeLayout class.`,tailwind:!0},htmlContent:`<template id="buttonRow">\r
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
          <select onchange="changeDropdown(this)" style="width: 160px;" class="input outline-none bg-gray-50 border rounded-s-none rounded-e-lg border-gray-300 text-gray-900 text-sm block p-1.5"></select>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<template id="switch">\r
  <label class="row">\r
    <svg  onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-top: 2px; margin-left: 4px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>\r
    </svg>\r
    <div class="title cell whitespace-nowrap select-none pt-2"></div>\r
    <div class="cell inline-flex items-center cursor-pointer">\r
      <input type="checkbox" onclick="layout()" class="input sr-only peer">\r
      <div height=5 class="relative w-9 h-5  bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>\r
    </div>\r
  </label>\r
</template>\r
\r
\r
  <iframe id="apiFrame" src="https://gojs.net/latest/api/symbols/TreeLayout.html" style="display: none;"></iframe>\r
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
          <summary class="flex cursor-pointer flex-row items-center whitespace-nowrap justify-between py-1 font-semibold marker:[font-size:0px]">Tree Settings\r
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
                    <input type="text" id="maxNodes" onclick="changeNodes(true, 0)" onchange="changeNodes(true, 0)" aria-describedby="helper-text-explanation" onchange="" class="bg-gray-50 border-x-1 border-gray-300 h-7 text-center text-gray-900 text-sm outline-none w-11 m-[-4.5px] z-10" value="50" required />\r
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
                    <input type="text" id="maxChil" aria-describedby="helper-text-explanation" onchange="changeChildren(true, 0)" onclick="changeChildren(true, 0)" class="bg-gray-50 border-x-1 outline-none border-gray-300 h-7 text-center text-gray-900 text-sm block  w-11 m-[-4.5px] z-10" value="3" required />\r
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
          <div>\r
            <label class="row"> <!--Random Sizes-->\r
              <div class="cell whitespace-nowrap select-none p-1">Random Sizes</div>\r
              <div class="cell inline-flex items-center cursor-pointer"> <!--Random Sizes-->\r
                <input type="checkbox" value="" class="sr-only peer" id="randomSizes" >\r
                <div height=5 class="relative w-9 h-5  bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>\r
              </div>\r
            </label>\r
            <div class="table">\r
              <div class="row">\r
                  <svg onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-right: 2px; margin-bottom: 6px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>\r
                  </svg>\r
                  <div class="cell whitespace-nowrap tooltip-trigger align-middle select-none p-1" style= "padding-right: 10px;">Tree Style</div>\r
                  <div class="celldif">\r
                    <select id="treeStyle" name="Layered" onchange="layout(true)" class="input align-middle bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[120px] p-1.5">\r
                      <option value="Layered" selected="selected">Layered</option>\r
                      <option value="Alternating">Alternating</option>\r
                      <option value="LastParents">Last Parents</option>\r
                      <option value="RootOnly">Root Only</option>\r
                    </select>\r
                  </div>\r
              </div>\r
              <div class="row">\r
                  <svg onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-right: 2px; margin-bottom: 6px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>\r
                  </svg>\r
                  <div class="cell whitespace-nowrap tooltip-trigger align-middle select-none p-1" style= "padding-right: 10px;">Layer Style</div>\r
                  <div class="celldif">\r
                    <select id="layerStyle" name="Individual" onchange="layout()" class="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[120px] p-1.5">\r
                      <option value="Individual" selected="selected">Individual</option>\r
                      <option value="Siblings">Siblings</option>\r
                      <option value="Uniform">Uniform</option>\r
                    </select>\r
                  </div>\r
              </div>\r
            </div>\r
            <button type="button" class="mt-2 ml-[60px]" onclick="rebuildGraph()">Generate Tree</button>\r
          </div>\r
        </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg select-none" id="defaultProperties">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]">Default Properties\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table" id="table2"></div>\r
            <div>\r
              <div class="table ml-[15px]" id="table3"></div>\r
              <div class="table ml-[15px]" id="table4"></div>\r
            </div>\r
          </span>\r
        </details>\r
\r
        <details class="group py-1 text-lg select-none" id="alternatePropertiesMenu" style="opacity: .5; pointer-events: none;">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]">Alternate Properties\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper" >\r
            <div class="table" id="table5"></div>\r
            <div>\r
              <div class="table ml-[15px]" id="table6"></div>\r
              <div class="table ml-[15px]" id="table7"></div>\r
            </div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg" id="treeLayoutBuilder">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px]  select-none">Tree Layout Builder\r
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
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.UniformToFill,\r
      layout: new go.TreeLayout({ comparer: go.LayoutVertex.smartComparer }) // have the comparer sort by numbers as well as letters\r
      // other properties are set by the layout function, defined below\r
    });\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', { locationSpot: go.Spot.Center })\r
        .bind('text', 'text') // for sorting\r
        .add(\r
          new go.Shape('Ellipse', {\r
              fill: 'lightgray', // the initial value, but data binding may provide different value\r
              stroke: null,\r
              desiredSize: new go.Size(30, 30)\r
            })\r
            .bind('desiredSize', 'size')\r
            .bind('fill', 'layer', c => randomLayerColors[c % 25]),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, selectable: false, corner: 10 })\r
        .add(\r
          new go.Shape({ strokeWidth: 3, stroke: '#333' })\r
        );\r
\r
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
    var minChil = document.getElementById('minChil').value;\r
    minChil = parseInt(minChil, 10);\r
\r
    var maxChil = document.getElementById('maxChil').value;\r
    maxChil = parseInt(maxChil, 10);\r
\r
    var hasRandomSizes = document.getElementById('randomSizes').checked;\r
\r
    // create and assign a new model\r
    var nodeDataArray = generateNodeData(minNodes, maxNodes, minChil, maxChil, hasRandomSizes);\r
    myDiagram.model = new go.TreeModel(nodeDataArray);\r
    shuffleColors(); // Shuffles palette to look like new random colors\r
    layerNodes(); // Sets layer value for all the new nodes\r
    layout();\r
    myDiagram.zoomToFit();\r
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
  function buildSettingsMenu() {\r
    // Calls to build each setting to the respective builder - Default Properties\r
    buildButtonRow('nodeSpacing', 5, 20, 'Node Spacing', 'table2');\r
    buildButtonRow('nodeIndent', 5, 0, 'Node Indent', 'table2', 0);\r
    buildButtonRow('nodeIndentPastParent', 0.05, 0, 'Indent Past Parent', 'table2', -1, 1, 2);\r
    buildButtonRow('layerSpacing', 5, 50, 'Layer Spacing', 'table2');\r
    buildButtonRow('layerSpacingParentOverlap', 0.05, 0, 'Parent Overlap', 'table2', 0, 1, 2);\r
    buildButtonRow('breadthLimit', 50, 0, 'Breadth Limit', 'table2', 0);\r
    buildButtonRow('rowSpacing', 10, 25, 'Row Spacing', 'table2');\r
    buildButtonRow('rowIndent', 10, 10, 'Row Indent', 'table2', 0);\r
\r
    buildSwitch('compaction', 'Compaction', 'table3', 'checked')\r
    buildSwitch('setsPortSpot', 'Port Spot', 'table3', 'checked')\r
    buildSwitch('setsChildPortSpot', 'Child Port Spot', 'table3', 'checked')\r
\r
    buildDropdown('angle', 'Angle', 'table4', ['Right', 'Down', 'Left', 'Up'])\r
    buildDropdown('alignment', 'Alignment', 'table4', ['Center Children', 'Center Subtrees', 'Start', 'End', 'Bus', 'Bus Branching', 'Top Left Bus', 'Bottom Right Bus'])\r
    buildDropdown('sorting', 'Sorting', 'table4', ['Forwards', 'Reverse', 'Ascending', 'Descending'])\r
    // Alternate Properties\r
    buildButtonRow('alternateNodeSpacing', 5, 20, 'Node Spacing', 'table5');\r
    buildButtonRow('alternateNodeIndent', 5, 0, 'Node Indent',  'table5', 0);\r
    buildButtonRow('alternateNodeIndentPastParent', 0.05, 0, 'Indent Past Parent', 'table5', -1, 1, 2);\r
    buildButtonRow('alternateLayerSpacing', 5, 50, 'Layer Spacing', 'table5');\r
    buildButtonRow('alternateLayerSpacingParentOverlap', 0.05, 0, 'Parent Overlap', 'table5', 0, 1, 2);\r
    buildButtonRow('alternateBreadthLimit', 50, 0, 'Breadth Limit', 'table5', 0);\r
    buildButtonRow('alternateRowSpacing', 10, 25, 'Row Spacing', 'table5');\r
    buildButtonRow('alternateRowIndent', 10, 10, 'Row Indent', 'table5', 0);\r
\r
    buildSwitch('alternateCompaction', 'Compaction', 'table6', 'checked')\r
    buildSwitch('alternateSetsPortSpot', 'Port Spot', 'table6', 'checked')\r
    buildSwitch('alternateSetsChildPortSpot', 'Child Port Spot', 'table6', 'checked')\r
\r
    buildDropdown('alternateAngle', 'Angle', 'table7', ['Right', 'Down', 'Left', 'Up'])\r
    buildDropdown('alternateAlignment', 'Alignment', 'table7', ['Center Children', 'Center Subtrees', 'Start', 'End', 'Bus', 'Bus Branching', 'Top Left Bus', 'Bottom Right Bus'])\r
    buildDropdown('alternateSorting', 'Sorting', 'table7', ['Forwards', 'Reverse', 'Ascending', 'Descending'])\r
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
  // Creates a random number (between MIN and MAX) of randomly colored nodes.\r
  function generateNodeData(minNodes, maxNodes, minChil, maxChil, hasRandomSizes) {\r
    var nodeArray = [];\r
    if (minNodes === undefined || isNaN(minNodes) || minNodes < 1) minNodes = 1;\r
    if (maxNodes === undefined || isNaN(maxNodes) || maxNodes < minNodes) maxNodes = minNodes;\r
\r
    // Create a bunch of node data\r
    var numNodes = Math.floor(Math.random() * (maxNodes - minNodes + 1)) + minNodes;\r
    for (var i = 0; i < numNodes; i++) {\r
      nodeArray.push({\r
        key: i, // the unique identifier\r
        // "parent" is set by code below that assigns children\r
        text: i.toString(), // some text to be shown by the node template\r
        size: hasRandomSizes ? new go.Size(Math.random() * 50 + 20, Math.random() * 50 + 20) : new go.Size(30, 30)\r
      });\r
    }\r
\r
    // Randomize the node data\r
    for (i = 0; i < nodeArray.length; i++) {\r
      var swap = Math.floor(Math.random() * nodeArray.length);\r
      var temp = nodeArray[swap];\r
      nodeArray[swap] = nodeArray[i];\r
      nodeArray[i] = temp;\r
    }\r
\r
    // Takes the random collection of node data and creates a random tree with them.\r
    // Respects the minimum and maximum number of links from each node.\r
    // The minimum can be disregarded if we run out of nodes to link to.\r
    if (nodeArray.length > 1) {\r
      if (minChil === undefined || isNaN(minChil) || minChil < 0) minChil = 0;\r
      if (maxChil === undefined || isNaN(maxChil) || maxChil < minChil) maxChil = minChil;\r
\r
      // keep the Set of node data that do not yet have a parent\r
      var available = new go.Set();\r
      available.addAll(nodeArray);\r
      for (var i = 0; i < nodeArray.length; i++) {\r
        var parent = nodeArray[i];\r
        available.remove(parent);\r
\r
        // assign some number of node data as children of this parent node data\r
        var children = Math.floor(Math.random() * (maxChil - minChil + 1)) + minChil;\r
        for (var j = 0; j < children; j++) {\r
          var child = available.first();\r
          if (child === null) break; // oops, ran out already\r
          available.remove(child);\r
          // have the child node data refer to the parent node data by its key\r
          child.parent = parent.key;\r
        }\r
        if (available.count === 0) break; // nothing left?\r
      }\r
    }\r
    return nodeArray;\r
  }\r
  // Update the layout from the controls, and then perform the layout again\r
  function layout(styleChange = false) {\r
    myDiagram.startTransaction('change Layout');\r
    var lay = myDiagram.layout;\r
    d = document;\r
    var code = 'new go.TreeLayout({'\r
\r
    var treeStyle = d.getElementById('treeStyle').value;\r
    if (treeStyle === 'Layered') lay.treeStyle = go.TreeStyle.Layered;\r
    else if (treeStyle === 'Alternating') lay.treeStyle = go.TreeStyle.Alternating;\r
    else if (treeStyle === 'LastParents') lay.treeStyle = go.TreeStyle.LastParents;\r
    else if (treeStyle === 'RootOnly') lay.treeStyle = go.TreeStyle.RootOnly;\r
    if (treeStyle != d.getElementById('treeStyle').name) code += \`\\n  treeStyle: go.TreeStyle.\${treeStyle},\`;\r
\r
    var layerStyle = d.getElementById('layerStyle').value;\r
    if (layerStyle === 'Individual') lay.layerStyle = go.TreeLayerStyle.Individual;\r
    else if (layerStyle === 'Siblings') lay.layerStyle = go.TreeLayerStyle.Siblings;\r
    else if (layerStyle === 'Uniform') lay.layerStyle = go.TreeLayerStyle.Uniform;\r
    if (layerStyle != d.getElementById('layerStyle').name) code += \`\\n  layerStyle: go.TreeLayerStyle.\${layerStyle},\`;\r
\r
    var angle = d.getElementById('angle').value;\r
    if (angle === 'Right') lay.angle = 0;\r
    else if (angle === 'Down') lay.angle = 90;\r
    else if (angle === 'Left') lay.angle = 180;\r
    else if (angle === 'Up') lay.angle = 270;\r
    if (angle != d.getElementById('angle').name) code += \`\\n  angle: \${lay.angle},\`;\r
\r
    var alignment = d.getElementById('alignment').value.split(/\\s+/).join('');\r
    if (alignment === 'CenterChildren') lay.alignment = go.TreeAlignment.CenterChildren;\r
    else if (alignment === 'CenterSubtrees') lay.alignment = go.TreeAlignment.CenterSubtrees;\r
    else if (alignment === 'Start') lay.alignment = go.TreeAlignment.Start;\r
    else if (alignment === 'End') lay.alignment = go.TreeAlignment.End;\r
    else if (alignment === 'Bus') lay.alignment = go.TreeAlignment.Bus;\r
    else if (alignment === 'BusBranching') lay.alignment = go.TreeAlignment.BusBranching;\r
    else if (alignment === 'TopLeftBus') lay.alignment = go.TreeAlignment.TopLeftBus;\r
    else if (alignment === 'BottomRightBus') lay.alignment = go.TreeAlignment.BottomRightBus;\r
    if (alignment != d.getElementById('alignment').name.split(/\\s+/).join('')) code += \`\\n  alignment: go.TreeAlignment.\${alignment},\`;\r
\r
    var nodeSpacing = d.getElementById('nodeSpacing').value;\r
    nodeSpacing = parseFloat(nodeSpacing, 10);\r
    lay.nodeSpacing = nodeSpacing;\r
    if (nodeSpacing != d.getElementById('nodeSpacing').name) code += \`\\n  nodeSpacing: \${nodeSpacing},\`;\r
\r
    var nodeIndent = d.getElementById('nodeIndent').value;\r
    nodeIndent = parseFloat(nodeIndent, 10);\r
    lay.nodeIndent = nodeIndent;\r
    if (nodeIndent != d.getElementById('nodeIndent').name) code += \`\\n  nodeIndent: \${nodeIndent},\`;\r
\r
    var nodeIndentPastParent = d.getElementById('nodeIndentPastParent').value;\r
    nodeIndentPastParent = parseFloat(nodeIndentPastParent, 10);\r
    lay.nodeIndentPastParent = nodeIndentPastParent;\r
    if (nodeIndentPastParent != d.getElementById('nodeIndentPastParent').name) code += \`\\n  nodeIndentPastParent: \${nodeIndentPastParent},\`;\r
\r
    var layerSpacing = d.getElementById('layerSpacing').value;\r
    layerSpacing = parseFloat(layerSpacing, 10);\r
    lay.layerSpacing = layerSpacing;\r
    if (layerSpacing != d.getElementById('layerSpacing').name) code += \`\\n  layerSpacing: \${layerSpacing},\`;\r
\r
    var layerSpacingParentOverlap = d.getElementById('layerSpacingParentOverlap').value;\r
    layerSpacingParentOverlap = parseFloat(layerSpacingParentOverlap, 10);\r
    lay.layerSpacingParentOverlap = layerSpacingParentOverlap;\r
    if (layerSpacingParentOverlap != d.getElementById('layerSpacingParentOverlap').name) code += \`\\n  layerSpacingParentOverlap: \${layerSpacingParentOverlap},\`;\r
\r
    var sorting = d.getElementById('sorting').value;\r
    if (sorting === 'Forwards') lay.sorting = go.TreeSorting.Forwards;\r
    else if (sorting === 'Reverse') lay.sorting = go.TreeSorting.Reverse;\r
    else if (sorting === 'Ascending') lay.sorting = go.TreeSorting.Ascending;\r
    else if (sorting === 'Descending') lay.sorting = go.TreeSorting.Descending;\r
    if (sorting != d.getElementById('sorting').name) code += \`\\n  sorting: go.Tree.\${sorting},\`;\r
\r
    var compaction = d.getElementById('compaction').checked;\r
    lay.compaction = (compaction)? go.TreeCompaction.Block : go.TreeCompaction.None;\r
    if (!compaction) code += \`\\n  compaction: go.TreeCompaction.None,\`;\r
\r
    var breadthLimit = d.getElementById('breadthLimit').value;\r
    breadthLimit = parseFloat(breadthLimit, 10);\r
    lay.breadthLimit = breadthLimit;\r
    if (breadthLimit != d.getElementById('breadthLimit').name) code += \`\\n  breadthLimit: \${breadthLimit},\`;\r
\r
    var rowSpacing = d.getElementById('rowSpacing').value;\r
    rowSpacing = parseFloat(rowSpacing, 10);\r
    lay.rowSpacing = rowSpacing;\r
    if ((rowSpacing != d.getElementById('rowSpacing').name) && (breadthLimit != 0)) code += \`\\n  rowSpacing: \${rowSpacing},\`;\r
    d.getElementById('rowSpacingRow').style.pointerEvents = (breadthLimit == 0)? "none" : "auto";\r
    d.getElementById('rowSpacingRow').style.opacity = (breadthLimit == 0)? 0.5 : 1;\r
\r
    var rowIndent = d.getElementById('rowIndent').value;\r
    rowIndent = parseFloat(rowIndent, 10);\r
    lay.rowIndent = rowIndent;\r
    if ((rowIndent != d.getElementById('rowIndent').name) && (breadthLimit != 0) && !(alignment.includes('Center'))) code += \`\\n  rowIndent: \${rowIndent},\`;\r
    d.getElementById('rowIndentRow').style.pointerEvents = (breadthLimit == 0 || alignment.includes('Center'))? "none" : "auto";\r
    d.getElementById('rowIndentRow').style.opacity = (breadthLimit == 0 || alignment.includes('Center'))? 0.5 : 1;\r
\r
    var setsPortSpot = d.getElementById('setsPortSpot').checked;\r
    lay.setsPortSpot = setsPortSpot;\r
    if (!setsPortSpot) code += \`\\n  setsPortSpot: false,\`;\r
\r
    var setsChildPortSpot = d.getElementById('setsChildPortSpot').checked;\r
    lay.setsChildPortSpot = setsChildPortSpot;\r
    if (!setsChildPortSpot) code += \`\\n  setsChildPortSpot: false,\`;\r
\r
    if (treeStyle != 'Layered') {\r
      var alternateAngle = d.getElementById('alternateAngle').value;\r
      if (alternateAngle === 'Right') lay.alternateAngle = 0;\r
      else if (alternateAngle === 'Down') lay.alternateAngle = 90;\r
      else if (alternateAngle === 'Left') lay.alternateAngle = 180;\r
      else if (alternateAngle === 'Up') lay.alternateAngle = 270;\r
      if (alternateAngle != d.getElementById('alternateAngle').name) code += \`\\n  alternateAngle: \${lay.alternateAngle},\`;\r
\r
      var alternateAlignment = d.getElementById('alternateAlignment').value.split(/\\s+/).join('');\r
      if (alternateAlignment === 'CenterChildren') lay.alternateAlignment = go.TreeAlignment.CenterChildren;\r
      else if (alternateAlignment === 'CenterSubtrees') lay.alternateAlignment = go.TreeAlignment.CenterSubtrees;\r
      else if (alternateAlignment === 'Start') lay.alternateAlignment = go.TreeAlignment.Start;\r
      else if (alternateAlignment === 'End') lay.alternateAlignment = go.TreeAlignment.End;\r
      else if (alternateAlignment === 'Bus') lay.alternateAlignment = go.TreeAlignment.Bus;\r
      else if (alternateAlignment === 'BusBranching') lay.alternateAlignment = go.TreeAlignment.BusBranching;\r
      else if (alternateAlignment === 'TopLeftBus') lay.alternateAlignment = go.TreeAlignment.TopLeftBus;\r
      else if (alternateAlignment === 'BottomRightBus') lay.alternateAlignment = go.TreeAlignment.BottomRightBus;\r
      if (alternateAlignment != d.getElementById('alternateAlignment').name.split(/\\s+/).join('')) code += \`\\n  alternateAlignment: go.TreeAlignment.\${alternateAlignment},\`;\r
\r
      var alternateNodeSpacing = d.getElementById('alternateNodeSpacing').value;\r
      alternateNodeSpacing = parseFloat(alternateNodeSpacing, 10);\r
      lay.alternateNodeSpacing = alternateNodeSpacing;\r
      if (alternateNodeSpacing != d.getElementById('alternateNodeSpacing').name) code += \`\\n  alternateNodeSpacing: \${alternateNodeSpacing},\`;\r
\r
      var alternateNodeIndent = d.getElementById('alternateNodeIndent').value;\r
      alternateNodeIndent = parseFloat(alternateNodeIndent, 10);\r
      lay.alternateNodeIndent = alternateNodeIndent;\r
      if (alternateNodeIndent != d.getElementById('alternateNodeIndent').name) code += \`\\n  alternateNodeIndent: \${alternateNodeIndent},\`;\r
\r
      var alternateNodeIndentPastParent = d.getElementById('alternateNodeIndentPastParent').value;\r
      alternateNodeIndentPastParent = parseFloat(alternateNodeIndentPastParent, 10);\r
      lay.alternateNodeIndentPastParent = alternateNodeIndentPastParent;\r
      if (alternateNodeIndentPastParent != d.getElementById('alternateNodeIndentPastParent').name) code += \`\\n  alternateNodeIndentPastParent: \${alternateNodeIndentPastParent},\`;\r
\r
      var alternateLayerSpacing = d.getElementById('alternateLayerSpacing').value;\r
      alternateLayerSpacing = parseFloat(alternateLayerSpacing, 10);\r
      lay.alternateLayerSpacing = alternateLayerSpacing;\r
      if (alternateLayerSpacing != d.getElementById('alternateLayerSpacing').name) code += \`\\n  alternateLayerSpacing: \${alternateLayerSpacing},\`;\r
\r
      var alternateLayerSpacingParentOverlap = d.getElementById('alternateLayerSpacingParentOverlap').value;\r
      alternateLayerSpacingParentOverlap = parseFloat(alternateLayerSpacingParentOverlap, 10);\r
      lay.alternateLayerSpacingParentOverlap = alternateLayerSpacingParentOverlap;\r
      if (alternateLayerSpacingParentOverlap != d.getElementById('alternateLayerSpacingParentOverlap').name) code += \`\\n  alternateLayerSpacingParentOverlap: \${alternateLayerSpacingParentOverlap},\`;\r
\r
      var alternateSorting = d.getElementById('alternateSorting').value;\r
      if (alternateSorting === 'Forwards') lay.alternateSorting = go.TreeSorting.Forwards;\r
      else if (alternateSorting === 'Reverse') lay.alternateSorting = go.TreeSorting.Reverse;\r
      else if (alternateSorting === 'Ascending') lay.alternateSorting = go.TreeSorting.Ascending;\r
      else if (alternateSorting === 'Descending') lay.alternateSorting = go.TreeSorting.Descending;\r
      if (alternateSorting != d.getElementById('alternateSorting').name) code += \`\\n  alternateSorting: go.Tree.\${alternateSorting},\`;\r
\r
      var alternateCompaction = d.getElementById('alternateCompaction').checked;\r
      lay.alternateCompaction = (alternateCompaction)? go.TreeCompaction.Block : go.TreeCompaction.None;\r
      if (!compaction) code += \`\\n  alternateCompaction: go.TreeCompaction.None,\`;\r
\r
      var alternateBreadthLimit = d.getElementById('alternateBreadthLimit').value;\r
      alternateBreadthLimit = parseFloat(alternateBreadthLimit, 10);\r
      lay.alternateBreadthLimit = alternateBreadthLimit;\r
      if (alternateBreadthLimit != d.getElementById('alternateBreadthLimit').name) code += \`\\n  alternateBreadthLimit: \${alternateBreadthLimit},\`;\r
\r
      var alternateRowSpacing = d.getElementById('alternateRowSpacing').value;\r
      alternateRowSpacing = parseFloat(alternateRowSpacing, 10);\r
      lay.alternateRowSpacing = alternateRowSpacing;\r
      if ((alternateRowSpacing != d.getElementById('alternateRowSpacing').name) && (alternateBreadthLimit != 0)) code += \`\\n  alternateRowSpacing: \${alternateRowSpacing},\`;\r
      d.getElementById('alternateRowSpacingRow').style.pointerEvents = (breadthLimit == 0)? "none" : "auto";\r
      d.getElementById('alternateRowSpacingRow').style.opacity = (alternateBreadthLimit == 0)? 0.5 : 1;\r
\r
      var alternateRowIndent = d.getElementById('alternateRowIndent').value;\r
      alternateRowIndent = parseFloat(alternateRowIndent, 10);\r
      lay.alternateRowIndent = alternateRowIndent;\r
      if ((alternateRowIndent != d.getElementById('alternateRowIndent').name) && (alternateBreadthLimit != 0) && !(alternateAlignment.includes('Center'))) code += \`\\n  alternateRowIndent: \${alternateRowIndent},\`;\r
      d.getElementById('alternateRowIndentRow').style.pointerEvents = (alternateBreadthLimit == 0 || alternateAlignment.includes('Center'))? "none" : "auto";\r
      d.getElementById('alternateRowIndentRow').style.opacity = (alternateBreadthLimit == 0 || alternateAlignment.includes('Center'))? 0.5 : 1;\r
\r
      var alternateSetsPortSpot = d.getElementById('alternateSetsPortSpot').checked;\r
      lay.alternateSetsPortSpot = alternateSetsPortSpot;\r
      if (!alternateSetsPortSpot) code += \`\\n  alternateSetsPortSpot: false,\`;\r
\r
      var alternateSetsChildPortSpot = d.getElementById('alternateSetsChildPortSpot').checked;\r
      lay.alternateSetsChildPortSpot = alternateSetsChildPortSpot;\r
      if (!alternateSetsChildPortSpot) code += \`\\n  alternateSetsChildPortSpot: false,\`;\r
    }\r
\r
    if (styleChange) {\r
      d.getElementById('alternatePropertiesMenu').open = (treeStyle !== 'Layered');\r
      d.getElementById('alternatePropertiesMenu').style.opacity = (treeStyle !== 'Layered')? 1 :0.5;\r
      d.getElementById('alternatePropertiesMenu').style.pointerEvents = (treeStyle !== 'Layered')? 'all' : 'none';\r
    }\r
\r
    if (code === 'new go.TreeLayout({') code = 'new go.TreeLayout()'; // If no changes made to layout\r
    else code = code.slice(0, -1) + '\\n})'; // Removes last comma and adds closing bracket\r
    d.getElementById('layoutBuilder').textContent = code;\r
\r
    myDiagram.commitTransaction('change Layout');\r
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
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`treelayout`,`html`];var g=y();l(`i8cr4d`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};