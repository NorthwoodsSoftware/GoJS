import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Circular Layout Demonstration of CircularLayout options`,titleShort:`Circular Layout Demo`,indexDescription:`Shows CircularLayout and options. This layout positions nodes in a circular arrangement.`,screenshot:`clayout`,priority:2,tags:[`collections`,`circularlayout`,`html`],description:`Interactive demonstration of circular layout features by the CircularLayout class.`,tailwind:!0},htmlContent:`<template id="buttonRow">\r
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
  <iframe id="apiFrame" src="https://gojs.net/latest/api/symbols/CircularLayout.html" style="display: none;"></iframe>\r
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
            <div class="table">\r
                  <div class="row" >\r
                    <div class="cell whitespace-nowrap p-1 select-none" style="font-size: large; padding-right: 0px;">Number of Nodes\r
                    </div>\r
                    <div class="cell"> <!--Number of Nodes-->\r
                      <label for="numNodes" class="items-center cursor-pointer">\r
                        <div class="relative flex items-center max-w-[6.5rem] ">\r
                          <button type="button" onclick="getElementById('numNodes').value = (getElementById('numNodes').value > 0)? getElementById('numNodes').value - 1 : 0" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                              </svg>\r
                          </button>\r
                          <input type="text" id="numNodes" aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-1 border-gray-300 h-7 text-center outline-none text-gray-900 text-sm w-11 m-[-4.5px] z-10" value="16" required />\r
                          <button type="button" onclick="getElementById('numNodes').value = getElementById('numNodes').value - -1" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[7px] pl-[12px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                              </svg>\r
                          </button>\r
                        </div>\r
                      </label>\r
                    </div>\r
                  </div>\r
\r
                  <div class="row">\r
                    <div id= "nodeWidthText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large">Node Width</div>\r
                    <div class="cell max-w-xs" id="nodeWidthForm"> <!--node width-->\r
                      <label for="minLinks" class="items-center cursor-pointer">\r
                        <div class="relative flex items-center max-w-[6.5rem]">\r
                          <button type="button" onclick="getElementById('width').value = Math.max(getElementById('width').value - 1, 0)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                              </svg>\r
                          </button>\r
                          <input type="text" id="width" aria-describedby="helper-text-explanation" onchange="" class="bg-gray-50 border-x-1 border-gray-300 h-7 text-center text-gray-900 text-sm outline-none w-11 m-[-4.5px] z-10" value="25" required />\r
                          <button type="button" onclick="getElementById('width').value = getElementById('width').value - -1" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none  m-0 pr-[7px] pl-[12px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                              </svg>\r
                          </button>\r
                        </div>\r
                      </label>\r
                    </div>\r
                  </div>\r
\r
                  <div class="row">\r
                    <div id= "nodeHeightText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large">Node Height</div>\r
                    <div class="cell max-w-xs" id="nodeHeightForm"> <!--node height-->\r
                      <label for="minLinks" class="items-center cursor-pointer">\r
                        <div class="relative flex items-center max-w-[6.5rem]">\r
                          <button type="button" onclick="getElementById('height').value = Math.max(getElementById('height').value - 1, 0)" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                              </svg>\r
                          </button>\r
                          <input type="text" id="height" aria-describedby="helper-text-explanation" onchange="" class="bg-gray-50 border-x-1 outline-none border-gray-300 h-7 text-center text-gray-900 text-sm block  w-11 m-[-4.5px] z-10" value="25" required />\r
                          <button type="button" onclick="getElementById('height').value = getElementById('height').value - -1" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none  m-0 pr-[7px] pl-[12px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                              </svg>\r
                          </button>\r
                        </div>\r
                      </label>\r
                    </div>\r
                  </div>\r
\r
                  <div class="row">\r
                    <div id="minLinkText" class="cell whitespace-nowrap p-1 select-none" style="font-size: large; ">Minimum Links</div>\r
                    <div class="cell max-w-xs" id="minLinksForm"> <!--Min Links from Node-->\r
                      <label for="minLinks" class="items-center cursor-pointer">\r
\r
                        <div class="relative flex items-center max-w-[6.5rem]">\r
                          <button type="button" onclick="changeLinks(false, -1)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100  focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                              </svg>\r
                          </button>\r
                          <input type="text" id="minLinks" aria-describedby="helper-text-explanation" onchange="changeLinks(false, 0)" class="bg-gray-50 border-x-1 outline-none border-gray-300 h-7 text-center text-gray-900 text-sm block  w-11 m-[-4.5px] z-10" value="1" required />\r
                          <button type="button" onclick="changeLinks(false, 1)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100  focus:ring-2 focus:outline-none m-0 pr-[7px] pl-[12px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                              </svg>\r
                          </button>\r
                        </div>\r
                      </label>\r
                    </div>\r
                  </div>\r
\r
                  <div class="row">\r
                    <div id= "maxLinkText" class= "cell whitespace-nowrap p-1 select-none" style="font-size: large">Maximum Links</div>\r
                    <div class="cell max-w-xs" id="maxLinksForm"> <!--Max Links from Node-->\r
                      <label for="maxLinks" class="items-center cursor-pointer">\r
                        <div class="relative flex items-center max-w-[6.5rem]">\r
                          <button type="button" onclick="changeLinks(true, -1)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[12px] pl-[7px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\r
                              </svg>\r
                          </button>\r
                          <input type="text" id="maxLinks" aria-describedby="helper-text-explanation" onchange="changeLinks(true, 0)" class="bg-gray-50 border-x-1 outline-none border-gray-300 h-7 text-center text-gray-900 text-sm block w-11 m-[-4.5px] z-10" value="2" required />\r
                          <button type="button" onclick="changeLinks(true, 1)" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none m-0 pr-[7px] pl-[12px]">\r
                              <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\r
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\r
                              </svg>\r
                          </button>\r
                        </div>\r
                      </label>\r
\r
                    </div>\r
                  </div>\r
            </div>\r
            <div>\r
              <div class="table pl-[35px] pr-[125px]" >\r
                    <label class="row">\r
                      <div class="cell whitespace-nowrap  select-none" style="padding-right: 15px;">Random Sizes</div>\r
                      <div class="cell inline-flex items-center cursor-pointer"> <!--Random Sizes-->\r
                        <input type="checkbox" value="" class="sr-only peer" id="randSizes" onchange="heightVisibility()">\r
                        <div height=5 class="relative w-9 h-5  bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>\r
                      </div>\r
                    </label>\r
\r
                    <label class="row">\r
                      <div class="cell whitespace-nowrap  select-none">Circular Nodes</div>\r
                      <div class="cell inline-flex items-center cursor-pointer"> <!--Circular Nodes-->\r
                        <input type="checkbox" value="" class="sr-only peer" id="circ" onchange="heightVisibility()">\r
                        <div height=5 class="relative w-9 h-5  bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>\r
                      </div>\r
                    </label>\r
\r
                    <label class="row">\r
                      <div class="cell whitespace-nowrap  select-none">Simple Ring</div>\r
                      <div class="cell inline-flex items-center cursor-pointer"> <!--Graph is simple Ring-->\r
                        <input type="checkbox" value="" class="sr-only peer" id="cyclic" onchange="linkVisibility()">\r
                        <div height=5 class="relative w-9 h-5  bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>\r
                      </div>\r
                    </label>\r
\r
                    <label class="row">\r
                      <button type="button" class="mt-4 ml-2 whitespace-nowrap" onclick="rebuildGraph()">Generate Circle</button>\r
                    </label>\r
              </div>\r
            </div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px] select-none">Layout Properties\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table" id="table1"></div>\r
            <div class="table mt-[-15px]" id="table2"></div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg" >\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px] select-none">Circular Layout Builder\r
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
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.UniformToFill,\r
      layout: new go.CircularLayout()\r
      // other properties are set by the layout function, defined below\r
    });\r
\r
    // define  the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          // make sure the Node.location is different from the Node.position\r
          locationSpot: go.Spot.Center\r
        })\r
        .bind('text') // for sorting\r
        .add(\r
          new go.Shape('Ellipse', { // the default value for the Shape.figure property\r
              fill: 'lightgray',\r
              strokeWidth: 0,\r
              desiredSize: new go.Size(30, 30)\r
            })\r
            .bind('figure')\r
            .bind('fill')\r
            .bind('desiredSize', 'size'),\r
          new go.TextBlock()\r
            .bind('text')\r
        );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({ selectable: false })\r
        .add(new go.Shape({ strokeWidth: 3, stroke: '#333' }));\r
\r
    // generate a circle using the default values\r
    buildSettingsMenu();\r
\r
    rebuildGraph();\r
  }\r
\r
  function rebuildGraph() {\r
    var numNodes = document.getElementById('numNodes').value;\r
    numNodes = parseInt(numNodes, 10);\r
    if (isNaN(numNodes)) numNodes = 16;\r
\r
    var width = document.getElementById('width').value;\r
    width = parseFloat(width, 10);\r
\r
    var height = document.getElementById('height').value;\r
    height = parseFloat(height, 10);\r
\r
    var randSizes = document.getElementById('randSizes').checked;\r
\r
    var circ = document.getElementById('circ').checked;\r
\r
    var cyclic = document.getElementById('cyclic').checked;\r
\r
    var minLinks = document.getElementById('minLinks').value;\r
    minLinks = parseInt(minLinks, 10);\r
\r
    var maxLinks = document.getElementById('maxLinks').value;\r
    maxLinks = parseInt(maxLinks, 10);\r
\r
\r
    generateCircle(numNodes, width, height, minLinks, maxLinks, randSizes, circ, cyclic);\r
    myDiagram.zoomToFit();\r
  }\r
\r
  function generateCircle(numNodes, width, height, minLinks, maxLinks, randSizes, circ, cyclic) {\r
    myDiagram.startTransaction('generateCircle');\r
    // replace the diagram's model's nodeDataArray\r
    generateNodes(numNodes, width, height, randSizes, circ);\r
    // replace the diagram's model's linkDataArray\r
    generateLinks(minLinks, maxLinks, cyclic);\r
    // force a diagram layout\r
    layout();\r
    myDiagram.commitTransaction('generateCircle');\r
  }\r
\r
  function randomBlueColor() { // Creates shades of blue for nodes\r
    var red = Math.floor(Math.random() * 36 + 40);\r
    var green = Math.floor(Math.random() * 56) + 140;\r
    var blue = Math.floor(Math.random() * 46 + 210);\r
    return "rgb(" + red + "," + green + "," + blue + ")";\r
  }\r
\r
  function generateNodes(numNodes, width, height, randSizes, circ) {\r
    var nodeArray = [];\r
    for (var i = 0; i < numNodes; i++) {\r
      var size;\r
      // If sizes randomized sets them\r
      if (randSizes) {\r
        size = new go.Size(Math.floor(Math.random() * (41)) + 25, Math.floor(Math.random() * (41)) + 25);\r
      } else {\r
        size = new go.Size(width, height);\r
      }\r
      // If circular sets height to width\r
      if (circ) size.height = size.width;\r
\r
      var figure = 'Rectangle';\r
      if (circ) figure = 'Ellipse';\r
\r
      nodeArray.push({\r
        key: i,\r
        text: i.toString(),\r
        figure: figure,\r
        fill: go.Brush.lightenBy(randomBlueColor(), .1), // Sets color to random shade of blue\r
        size: size\r
      });\r
    }\r
\r
    // randomize the data, to help demonstrate sorting\r
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
  function generateLinks(min, max, cyclic) {\r
    var linkArray = [];\r
    if (myDiagram.nodes.count < 2) myDiagram.model.linkDataArray = linkArray;\r
    var nit = myDiagram.nodes;\r
    var nodes = new go.List(/*go.Node*/);\r
    nodes.addAll(nit);\r
    var num = nodes.length;\r
    if (cyclic) {\r
      for (var i = 0; i < num; i++) {\r
        if (i >= num - 1) {\r
          linkArray.push({ from: i, to: 0 });\r
        } else {\r
          linkArray.push({ from: i, to: i + 1 });\r
        }\r
      }\r
    } else {\r
      if (isNaN(min) || min < 0) min = 0;\r
      if (isNaN(max) || max < min) max = min;\r
      for (var i = 0; i < num; i++) {\r
        var next = nodes.get(i);\r
        var children = Math.floor(Math.random() * (max - min + 1)) + min;\r
        for (var j = 1; j <= children; j++) {\r
          var to = nodes.get(Math.floor(Math.random() * num));\r
          // get keys from the Node.text strings\r
          var nextKey = parseInt(next.text, 10);\r
          var toKey = parseInt(to.text, 10);\r
          if (nextKey !== toKey) {\r
            linkArray.push({ from: nextKey, to: toKey });\r
          }\r
        }\r
      }\r
    }\r
    myDiagram.model.linkDataArray = linkArray;\r
  }\r
\r
  function buildSettingsMenu() {\r
    // Builds the setting menu through calls to respective builder\r
    buildButtonRow('radius', 10, 6, 'Radius','table1', 0);\r
    buildButtonRow('aspectRatio', 0.05, 1.00, 'Aspect Ratio','table1', 0, 100, 2);\r
    buildButtonRow('startAngle', 5, 0, 'Starting Angle','table1', 0, 360);\r
    buildButtonRow('sweepAngle', 5, 360, 'Sweep Angle','table1', 0, 360);\r
    buildButtonRow('spacing', 5, 6, 'Spacing','table1');\r
\r
    buildDropdown('arrangement', 'Arrangement','table2', ['Constant Distance', 'Constant Angle', 'Constant Spacing', 'Packed'])\r
    buildDropdown('direction', 'Direction','table2', ['Clockwise', 'Counterclockwise', 'Bidirectional Left', 'Bidirectional Right'])\r
    buildDropdown('sorting', 'Sorting','table2', ['Forwards', 'Reverse', 'Ascending', 'Descending', 'Optimized'])\r
    buildDropdown('nodeDiameterFormula', 'Diameter', 'table2', ['Pythagorean', 'Circular'])\r
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
  // Update the layout from the controls, and then perform the layout again\r
  function layout() {\r
    myDiagram.startTransaction('change Layout');\r
    var lay = myDiagram.layout;\r
    var d = document;\r
    var code = 'new go.CircularLayout({'\r
\r
    var radius = d.getElementById('radius').value;\r
    if (radius !== 0) radius = parseFloat(radius, 10);\r
    else radius = NaN;\r
    lay.radius = radius;\r
    if (radius != d.getElementById('radius').name) code += \`\\n  radius: \${radius},\`; // These update code block allowing for builder to display code\r
\r
    var aspectRatio = d.getElementById('aspectRatio').value;\r
    aspectRatio = parseFloat(aspectRatio, 10);\r
    lay.aspectRatio = aspectRatio;\r
    if (aspectRatio != d.getElementById('aspectRatio').name) code += \`\\n  aspectRatio: \${aspectRatio},\`;\r
\r
    var startAngle = d.getElementById('startAngle').value;\r
    startAngle = parseFloat(startAngle, 10);\r
    lay.startAngle = startAngle;\r
    if (startAngle != d.getElementById('startAngle').name) code += \`\\n  startAngle: \${startAngle},\`\r
\r
    var sweepAngle = d.getElementById('sweepAngle').value;\r
    sweepAngle = parseFloat(sweepAngle, 10);\r
    lay.sweepAngle = sweepAngle;\r
    if (sweepAngle != d.getElementById('sweepAngle').name) code += \`\\n  sweepAngle: \${sweepAngle},\`\r
\r
    var spacing = d.getElementById('spacing').value;\r
    spacing = parseFloat(spacing, 10);\r
    lay.spacing = spacing;\r
    if (spacing != d.getElementById('spacing').name) code += \`\\n  spacing: \${spacing},\`\r
\r
    var arrangement = d.getElementById('arrangement').value.split(/\\s+/).join('');\r
    if (arrangement === 'ConstantDistance') lay.arrangement = go.CircularArrangement.ConstantDistance;\r
    else if (arrangement === 'ConstantAngle') lay.arrangement = go.CircularArrangement.ConstantAngle;\r
    else if (arrangement === 'ConstantSpacing') lay.arrangement = go.CircularArrangement.ConstantSpacing;\r
    else if (arrangement === 'Packed') lay.arrangement = go.CircularArrangement.Packed;\r
    if (arrangement != d.getElementById('arrangement').name.split(/\\s+/).join('')) code += \`\\n  arrangement: go.CircularArrangement.\${arrangement},\`\r
\r
    var nodeDiameterFormula = d.getElementById('nodeDiameterFormula').value;\r
    if (nodeDiameterFormula === 'Pythagorean') lay.nodeDiameterFormula = go.CircularNodeDiameterFormula.Pythagorean;\r
    else if (nodeDiameterFormula === 'Circular') lay.nodeDiameterFormula = go.CircularNodeDiameterFormula.Circular;\r
    if (nodeDiameterFormula != d.getElementById('nodeDiameterFormula').name) code += \`\\n  nodeDiameterFormula: go.CircularNodeDiameterFormula.\${nodeDiameterFormula},\`\r
\r
    var direction = d.getElementById('direction').value.split(/\\s+/).join('');\r
    if (direction === 'Clockwise') lay.direction = go.CircularDirection.Clockwise;\r
    else if (direction === 'Counterclockwise') lay.direction = go.CircularDirection.Counterclockwise;\r
    else if (direction === 'BidirectionalLeft') lay.direction = go.CircularDirection.BidirectionalLeft;\r
    else if (direction === 'BidirectionalRight') lay.direction = go.CircularDirection.BidirectionalRight;\r
    if (direction != d.getElementById('direction').name.split(/\\s+/).join('')) code += \`\\n  direction: go.CircularDirection.\${direction},\`\r
\r
    var sorting = d.getElementById('sorting').value;\r
    if (sorting === 'Forwards') lay.sorting = go.CircularSorting.Forwards;\r
    else if (sorting === 'Reverse') lay.sorting = go.CircularSorting.Reverse;\r
    else if (sorting === 'Ascending') lay.sorting = go.CircularSorting.Ascending;\r
    else if (sorting === 'Descending') lay.sorting = go.CircularSorting.Descending;\r
    else if (sorting === 'Optimized') lay.sorting = go.CircularSorting.Optimized;\r
    if (sorting != d.getElementById('sorting').name) code += \`\\n  sorting: go.CircularSorting.\${sorting},\`\r
\r
    if (code === 'new go.CircularLayout({') code = 'new go.CircularLayout()'; // If no changes made to layout\r
    else code = code.slice(0, -1) + '\\n})'; // Removes last comma and adds closing bracket\r
    d.getElementById('layoutBuilder').textContent = code;\r
    myDiagram.commitTransaction('change Layout');\r
    myDiagram.zoomToFit();\r
  }\r
\r
  function changeLinks(max, value) {  // Makes sure min links is less than max links and vice versa\r
    e = document;\r
    if (max) {\r
      e.getElementById('maxLinks').value = Math.max(e.getElementById('maxLinks').value - -value, 0);\r
    } else {\r
      e.getElementById('minLinks').value = Math.max(e.getElementById('minLinks').value - -value, 0);\r
    }\r
    if (parseInt(e.getElementById('minLinks').value) > parseInt(e.getElementById('maxLinks').value)) {\r
      (max)? e.getElementById('minLinks').value = e.getElementById('maxLinks').value : e.getElementById('maxLinks').value = e.getElementById('minLinks').value;\r
    }\r
  }\r
\r
  function changeDropdown(element) {  // Changes dropdowns and updates code block and reset button\r
    element.parentNode.querySelector('.button1').style = (element.value != element.name)? "background-color: lightcoral;" : "background-color: lightgray;";\r
    layout();\r
  }\r
\r
  function resetButton(element) {  // Resets the value of the input box and updates respective divs\r
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
\r
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
  // Disables different inputs based on other properties\r
  function heightVisibility() {\r
    e = document;\r
    if (e.getElementById('circ').checked || e.getElementById('randSizes').checked) {\r
      e.getElementById('nodeHeightText').style.opacity = 0.5;\r
      e.getElementById('nodeHeightForm').style.opacity = 0.4;\r
      e.getElementById('nodeHeightForm').style.pointerEvents = 'none';\r
    } else {\r
      e.getElementById('nodeHeightText').style.opacity = 1;\r
      e.getElementById('nodeHeightForm').style.opacity = 1;\r
      e.getElementById('nodeHeightForm').style.pointerEvents = 'auto';\r
    }\r
    if (e.getElementById('randSizes').checked) {\r
      e.getElementById('nodeWidthText').style.opacity = 0.5;\r
      e.getElementById('nodeWidthForm').style.opacity = 0.4;\r
      e.getElementById('nodeWidthForm').style.pointerEvents = 'none';\r
    } else {\r
      e.getElementById('nodeWidthText').style.opacity = 1;\r
      e.getElementById('nodeWidthForm').style.opacity = 1;\r
      e.getElementById('nodeWidthForm').style.pointerEvents = 'auto';\r
    }\r
  }\r
\r
  function linkVisibility() {\r
    e = document;\r
    if (e.getElementById('cyclic').checked) {\r
      e.getElementById('minLinkText').style.opacity = 0.5;\r
      e.getElementById('maxLinkText').style.opacity = 0.5;\r
      e.getElementById('minLinksForm').style.opacity = 0.4;\r
      e.getElementById('minLinksForm').style.pointerEvents = 'none';\r
      e.getElementById('maxLinksForm').style.opacity = 0.4;\r
      e.getElementById('maxLinksForm').style.pointerEvents = 'none';\r
    } else {\r
      e.getElementById('minLinkText').style.opacity = 1;\r
      e.getElementById('maxLinkText').style.opacity = 1;\r
      e.getElementById('minLinksForm').style.opacity = 1;\r
      e.getElementById('minLinksForm').style.pointerEvents = 'auto';\r
      e.getElementById('maxLinksForm').style.opacity = 1;\r
      e.getElementById('maxLinksForm').style.pointerEvents = 'auto';\r
    }\r
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
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`circularlayout`,`html`];var g=y();l(`1giq8qo`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};