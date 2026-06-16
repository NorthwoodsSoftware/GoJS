import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Grid Layout Demonstration of GridLayout Options`,titleShort:`Grid Layout Demo`,indexDescription:`Shows GridLayout and options. Places all of the Parts in a grid-like arrangement, ordered, spaced apart, and wrapping as needed.`,screenshot:`glayout`,priority:2,tags:[`gridlayout`],description:`Interactive demonstration of layout-on-a-grid features by the GridLayout class.`,tailwind:!0},htmlContent:`<template id="buttonRow">\r
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
    <svg  onclick="" class="cell info shrink-0 inline w-4 h-4 align-middle" style="margin-top: 26px; margin-right: 2px; margin-left: 4px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">\r
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
  <iframe id="apiFrame" src="https://gojs.net/latest/api/symbols/GridLayout.html" style="display: none;"></iframe>\r
  <div id="frame" style="z-index: 100; pointer-events: none; position: absolute; display: none; ">\r
      <div id="container" style="border: 1px solid #ddd; border-radius: 5px; padding: 15px; max-width: 600px;margin: 20px auto; font-family: Arial, sans-serif; background-color: #fff;">\r
        <div id="name" class="name" style="font-weight: bold; font-size: 16px;  display: flex; align-items: center;"></div>\r
        \r
      </div>\r
  </div>\r
  <div class="sampleWrapper">\r
    <div id="myDiagramDiv" style="flex-grow: 1; height: 550px; border: solid 1px black; margin-right: 10px;"></div>\r
\r
    <div style="flex: 1;">\r
      <section class="grid grid-cols-1 gap-y-3 divide-y">\r
        <details open class="group py-1 text-lg">\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px] select-none">Layout Properties\r
            <svg class="h-6 w-6 rotate-0 transform text-gray-400 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>\r
          </summary>\r
          <span class="sampleWrapper">\r
            <div class="table" id="table1"></div>\r
            <div class="table mt-[-15px]" style="vertical-align: top;" id="table2"></div>\r
          </span>\r
        </details>\r
\r
        <details open class="group py-1 text-lg" >\r
          <summary class="flex cursor-pointer flex-row items-center justify-between py-1 font-semibold marker:[font-size:0px] select-none">Grid Layout Builder\r
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
\r
    myDiagram = new go.Diagram('myDiagramDiv', { // must be the ID or reference to div\r
      layout: new go.GridLayout({ comparer: go.GridLayout.smartComparer })\r
      // other properties are set by the layout function, defined below\r
    });\r
\r
    // define the Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', { locationSpot: go.Spot.Center })\r
        // make sure the Node.location is different from the Node.position\r
        .bind('text') // for sorting\r
        .add(\r
          new go.Shape('Ellipse', {\r
              fill: 'lightgray',\r
              stroke: null,\r
              desiredSize: new go.Size(30, 30)\r
            })\r
            .bind('fill')\r
            .bind('desiredSize', 'size'),\r
          new go.TextBlock()\r
            // the default alignment is go.Spot.Center\r
            .bind('text')\r
        );\r
\r
    // create an array of data describing randomly colored and sized nodes\r
    const nodeDataArray = [];\r
    for (let i = 0; i < 100; i++) {\r
      nodeDataArray.push({\r
        key: i,\r
        text: i.toString(),\r
        fill: go.Brush.randomColor(),\r
        size: new go.Size(30 + Math.floor(Math.random() * 50), 30 + Math.floor(Math.random() * 50))\r
      });\r
    }\r
\r
    // randomize the data\r
    for (let i = 0; i < nodeDataArray.length; i++) {\r
      const swap = Math.floor(Math.random() * nodeDataArray.length);\r
      const temp = nodeDataArray[swap];\r
      nodeDataArray[swap] = nodeDataArray[i];\r
      nodeDataArray[i] = temp;\r
    }\r
\r
    // create a Model that does not know about link or group relationships\r
    myDiagram.model = new go.Model(nodeDataArray);\r
\r
    // layout using the latest parameters\r
    buildSettingsMenu();\r
    layout();\r
  }\r
\r
  // Update the layout from the controls, and then perform the layout again\r
  function layout() {\r
    myDiagram.startTransaction('change Layout');\r
    var lay = myDiagram.layout;\r
    var d = document;\r
    var code = 'new go.GridLayout({ ';\r
\r
    var wrappingColumn = d.getElementById('wrappingColumn').value;\r
    lay.wrappingColumn = parseFloat(wrappingColumn, 10);\r
    if (wrappingColumn != d.getElementById('wrappingColumn').name) code += \`\\n  wrappingColumn: \${wrappingColumn},\`;\r
\r
    var wrappingWidth = d.getElementById('wrappingWidth').value;\r
    lay.wrappingWidth = parseFloat(wrappingWidth, 10);\r
    if (wrappingWidth != d.getElementById('wrappingWidth').name) code += \`\\n  wrappingWidth: \${wrappingWidth},\`;\r
\r
    var cellWidth = d.getElementById('cellWidth').value;\r
    var cellHeight = d.getElementById('cellHeight').value;\r
    lay.cellSize = new go.Size(parseFloat(cellWidth, 10), parseFloat(cellHeight, 10));\r
    if (cellWidth != d.getElementById('cellWidth').name || cellHeight != d.getElementById('cellHeight').name) code += \`\\n  cellSize: new go.Size(\${cellWidth}, \${cellHeight}),\`;\r
\r
    var spacingWidth = d.getElementById('spacingWidth').value;\r
    var spacingHeight = d.getElementById('spacingHeight').value;\r
    lay.spacing = new go.Size(parseFloat(spacingWidth, 10), parseFloat(spacingHeight, 10));\r
    if (spacingWidth != d.getElementById('spacingWidth').name || spacingHeight != d.getElementById('spacingHeight').name) code += \`\\n  spacing: new go.Size(\${spacingWidth}, \${spacingHeight}),\`;\r
\r
    var alignment = d.getElementById('alignment').value;\r
    if (alignment === 'Location') {\r
      lay.alignment = go.GridLayout.Location;\r
    } else {\r
      lay.alignment = go.GridLayout.Position;\r
    }\r
    if (alignment != d.getElementById('alignment').name) code += \`\\n  alignment: go.GridLayout.\${alignment},\`;\r
\r
    var arrangement = d.getElementById('arrangement').value.split(/\\s+/).join('');\r
    if (arrangement === 'LeftToRight') {\r
      lay.arrangement = go.GridArrangement.LeftToRight;\r
    } else {\r
      lay.arrangement = go.GridArrangement.RightToLeft;\r
    }\r
    if (arrangement != d.getElementById('arrangement').name.split(/\\s+/).join('')) code += \`\\n  arrangement: go.GridArrangement.\${arrangement},\`;\r
\r
    var sorting = d.getElementById('sorting').value;\r
    if (sorting === 'Forwards') {\r
      lay.sorting = go.GridLayout.Forwards;\r
    } else if (sorting === 'Reverse') {\r
      lay.sorting = go.GridLayout.Reverse;\r
    } else if (sorting === 'Ascending') {\r
      lay.sorting = go.GridLayout.Ascending;\r
    } else {\r
      lay.sorting = go.GridLayout.Descending;\r
    }\r
    if (sorting != d.getElementById('sorting').name) code += \`\\n  sorting: go.GridLayout.\${sorting},\`;\r
\r
    if (code === 'new go.GridLayout({ ') code = 'new go.GridLayout()'; // If no changes made to layout\r
    else code = code.slice(0, -1) + '\\n})'; // Removes last comma and adds closing bracket\r
    d.getElementById('layoutBuilder').textContent = code;\r
    myDiagram.commitTransaction('change Layout');\r
  }\r
\r
  function buildButtonRow(id, change, start, title, table, min = null) {\r
    var template = document.getElementById('buttonRow');\r
    var clone = template.content.cloneNode(true);\r
    clone.querySelector('.button3').name = change;\r
    clone.querySelector('.button2').name = -change;\r
    clone.querySelector('.inputBox').name = start;\r
    clone.querySelector('.inputBox').id = id;\r
    clone.querySelector('.inputBox').value = start;\r
    clone.querySelector('.minimum').name = min;\r
    clone.querySelector('.title').textContent = title;\r
\r
    document.getElementById(table).appendChild(clone);\r
  }\r
\r
  function buildDropdown(id, title, table, options) {\r
    const template = document.getElementById('dropdown');\r
    const clone = template.content.cloneNode(true);\r
    dropdown = clone.querySelector('.input')\r
    dropdown.name = options[0];\r
    dropdown.id = id;\r
    clone.querySelector('.title').textContent = title;\r
    options.forEach(element => {\r
      const option = document.createElement('option');\r
      option.value = element; // Set the value to be the index + 1\r
      option.text = element; // Set the text to be the element from the array\r
      dropdown.add(option);\r
    });\r
    dropdown.options[0].selected = true;\r
    document.getElementById(table).appendChild(clone);\r
  }\r
\r
  function buildSettingsMenu() {\r
    // Builds the setting menu through calls to respective builder\r
    buildButtonRow('wrappingColumn', 1, NaN, 'Columns','table1', 0);\r
    buildButtonRow('wrappingWidth', 10, NaN, 'Width','table1', 0);\r
    buildButtonRow('cellWidth', 10, NaN, 'Cell Width','table1', 0);\r
    buildButtonRow('cellHeight', 10, NaN, 'Cell Height','table1', 0);\r
    buildButtonRow('spacingWidth', 5, 10, 'Horizontal Spacing','table1', 0);\r
    buildButtonRow('spacingHeight', 5, 10, 'Vertical Spacing','table1', 0);\r
\r
    buildDropdown('alignment', 'Alignment','table2', ['Location', 'Position']);\r
    buildDropdown('arrangement', 'Arrangement','table2', ['Left To Right', 'Right To Left']);\r
    buildDropdown('sorting', 'Sorting', 'table2', ['Forwards', 'Reverse', 'Ascending', 'Descending']);\r
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
    const min = element.parentNode.querySelector('.minimum').name;\r
    const decimal = element.parentNode.querySelector('.decimal').name;\r
    value = e.value;\r
    (isNaN(value))? value = 0 : value = parseFloat(e.value, 10);\r
    value += parseFloat(number, 10);\r
    if (min !== null) value = Math.max(value, min) // Checks for max and min values]\r
    e.value = (value === 0 && !(e.id.includes('spacing')))? NaN : value;\r
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
  }`,externalStyles:[],externalScripts:[],descriptionHtml:``,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gridlayout`];var g=y();l(`1smbw6k`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};