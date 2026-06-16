import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Production Process Diagram with Details and Animated Flows`,titleShort:`Production Process`,indexDescription:`Partially describes the production process for converting natural gas and oil byproducts into their end products.`,screenshot:`productionprocess`,priority:1.6,tags:[`tooltips`,`geometries`,`svg`,`process`,`monitoring`,`html`],description:`Oil and gas production diagram viewer, for end-users.`},htmlContent:`<div style="width: 100%">\r
    <div\r
      id="myDiagramDiv"\r
      style="\r
        border: solid 1px black;\r
        width: 70%;\r
        height: 550px;\r
        display: inline-block;\r
        vertical-align: top;\r
      "></div>\r
    <div\r
      id="infobox"\r
      style="\r
        display: inline-block;\r
        vertical-align: top;\r
        width: 256px;\r
        background: hsl(var(--popover, 60 4.8% 95.9%));\r
        color: hsl(var(--popover-foreground, 20 14.3% 4.1%));\r
        border: solid 1px hsl(var(--border, 0 0% 83%));\r
        padding: 20px;\r
      ">\r
      <img id="Image" width="216" alt="" src="" />\r
      <h3 id="Title"></h3>\r
      <p id="Description">Select a node to see more information.</p>\r
    </div>\r
  </div>\r
  <div>\r
    <textarea id="mySavedModel" style="display: none">\r
{ "class": "GraphLinksModel",\r
  "pointsDigits": 0,\r
  "nodeDataArray": [\r
{"key":1, "pos":"-170 -48", "icon":"natgas", "color":"blue", "text":"Gas\\nCompanies", "description":"Provides natural gas liquids (NGLs).", "caption":"Gas Drilling Well", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/BarnettShaleDrilling-9323.jpg?width=256"},\r
{"key":2, "pos":"-170 96", "icon":"oil", "color":"blue", "text":"Oil\\nCompanies", "description":"Provides associated petroleum gas (APG). This type of gas used to be released as waste from oil drilling, but is now commonly captured for processing.", "caption":"Offshore oil well", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/Oil_platform_P-51_%28Brazil%29.jpg?width=512"},\r
{"key":3, "pos":"-70 90", "icon":"gasprocessing", "color":"blue", "text":"Gas Processing", "description":"APG processing turns associated petrolium gas into natural gas liquids (NGLs) and stable natural gas (SGN).", "caption":"Natural gas plant", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/Solohiv_natural_gas_plant_-_fragment.jpg?width=256"},\r
{"key":4, "pos":"40 -50", "icon":"fractionation", "color":"blue", "text":"Gas Fractionation", "description":"Natural gas liquids are separated into individual hydrocarbons like propane and butanes, hydrocarbon mixtures (naphtha) and liquefied petroleum gases (LPGs).", "caption":"Gas Plant", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/Gasblok.jpg?width=256"},\r
{"key":5, "pos":"140 -50", "icon":"pyrolysis", "color":"orange", "text":"Pyrolysis (Cracking)", "description":"Liquefied petroleum gases (LPGs) are transformed into Ethylene, propylene, benzene, and other by-products.", "caption":"Pyrolysis plant", "imgsrc":"https://upload.wikimedia.org/wikipedia/commons/6/6c/Guelph.jpg"},\r
{"key":6, "pos":"340 -130", "icon":"polymerization", "color":"red", "text":"Basic Polymers", "description":"Ethylene and propylene (monomers) are processed into end products using various methods (polymerization).", "caption":"Plastics engineering-Polymer products", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/Plastics_engineering-Polymer_products.jpg?width=256"},\r
{"key":7, "pos":"340 -40", "icon":"polymerization", "color":"green", "text":"Plastics", "description":"Polymerization produces PET, glycols, alcohols, expandable polystyrene, acrylates, BOPP-films and geosynthetics.", "caption":"Lego Color Bricks", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/Lego_Color_Bricks.jpg?width=256"},\r
{"key":8, "pos":"340 50", "icon":"polymerization", "color":"lightgreen", "text":"Synthetic Rubbers", "description":"Polymerization produces commodity and specialty rubbers and thermoplastic elastomers.", "caption":"Sheet of synthetic rubber coming off the rolling mill at the plant of Goodrich", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/Sheet_of_synthetic_rubber_coming_off_the_rolling_mill_at_the_plant_of_Goodrich.jpg?width=512"},\r
{"key":9, "pos":"340 120", "color":"orange", "text":"Intermediates", "description":"Produced Ethylene, Propylene, Butenes, Benzene, and other by-products.", "caption":"Propylene Containers", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/XVJ-12_Propylene_%288662385917%29.jpg?width=256"},\r
{"key":10, "pos":"340 210", "icon":"finishedgas", "color":"blue", "text":"LPG, Naphtha,\\nMTBE", "description":"Propane, butane, and other general purpose fuels and byproducts.", "caption":"Liquid Petroleum Gas Truck", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/LPG_Truck.jpg?width=256"},\r
{"key":11, "pos":"340 300", "icon":"finishedgas", "color":"blue", "text":"Natural Gas, NGLs", "description":"Used for heating, cooking, and electricity generation", "caption":"Natural Gas Flame", "imgsrc":"https://commons.wikimedia.org/wiki/Special:FilePath/%22LPG_flame%22.JPG?width=512"}\r
 ],\r
  "linkDataArray": [\r
{"from":1, "to":4, "points":[-150,-41,-140,-41,-69,-41,-69,-41.33333333333333,2,-41.33333333333333,20,-41.33333333333333]},\r
{"from":2, "to":3, "points":[-150,103,-140,103,-120,103,-120,103,-100,103,-90,103]},\r
{"from":3, "to":4, "points":[-50,98.66666666666667,-40,98.66666666666667,-15,98.66666666666667,-15,-32.666666666666664,10,-32.666666666666664,20,-32.666666666666664]},\r
{"from":3, "to":5, "toSpot":"BottomSide", "points":[-50,107.33333333333333,-32,107.33333333333333,140,107.33333333333333,140,46.666666666666664,140,-14,140,-24]},\r
{"from":4, "to":5, "points":[60,-37,70,-37,90,-37,90,-37,110,-37,120,-37]},\r
{"from":3, "to":11, "fromSpot":"BottomSide", "points":[-70,116,-70,126,-70,307,120,307,310,307,320,307]},\r
{"from":4, "to":10, "fromSpot":"BottomSide", "points":[40,-12,40,-2,40,217,175,217,310,217,320,217]},\r
{"from":5, "to":6, "fromSpot":"Right", "points":[160,-37,170,-37,240,-37,240,-123,310,-123,320,-123]},\r
{"from":5, "to":7, "fromSpot":"Right", "points":[160,-37,170,-37,240,-37,240,-33,310,-33,320,-33]},\r
{"from":5, "to":8, "fromSpot":"Right", "points":[160,-37,170,-37,240,-37,240,57,310,57,320,57]},\r
{"from":5, "to":9, "fromSpot":"Right", "points":[160,-37,170,-37,240,-37,240,127,310,127,320,127]}\r
 ]}\r
    </textarea>\r
  </div>`,jsCode:`function init() {\r
    // Abstract colors\r
    const Colors = {\r
      red: '#be4b15',\r
      green: '#52ce60',\r
      blue: '#6ea5f8',\r
      lightred: '#fd8852',\r
      lightblue: '#afd4fe',\r
      lightgreen: '#b9e986',\r
      pink: '#faadc1',\r
      purple: '#d689ff',\r
      orange: '#f08c00'\r
    };\r
\r
    const ColorNames = [];\r
    for (var n in Colors) ColorNames.push(n);\r
\r
    // a conversion function for translating general color names to specific colors\r
    function colorFunc(colorname) {\r
      var c = Colors[colorname];\r
      if (c) return c;\r
      return 'gray';\r
    }\r
\r
    // Icons derived from SVG paths designed by freepik: http://www.freepik.com/\r
    const Icons = {};\r
    Icons.natgas =\r
      'F M244.414,133.231 L180.857,133.231 178.509,156.191 250.527,192.94z\\\r
        M179.027,276.244 262.328,308.179 253.451,221.477z\\\r
        M267.717,360.866 264.845,332.807 220.179,360.866z\\\r
        M167.184,266.775 247.705,207.524 176.95,171.421z\\\r
        M157.551,360.866 192.975,360.866 256.447,320.996 165.218,286.021z\\\r
        M141.262,374.366 141.262,397.935 161.396,397.935 161.396,425.268 179.197,425.268 179.197,397.935\\\r
        246.07,397.935 246.07,425.268 263.872,425.268 263.872,397.935 284.006,397.935 284.006,374.366z';\r
\r
    Icons.oil =\r
      'F M190.761,109.999c-3.576-9.132-8.076-22.535,7.609-37.755c0.646,13.375,14.067,13.99,11.351,36.794\\\r
        c6.231-2.137,6.231-2.137,9.188-3.781c17.285-9.612,20.39-25.205,7.64-42.896c-7.316-10.153-11.945-20.58-10.927-33.23\\\r
        c-4.207,4.269-5.394,9.444-6.744,17.129c-5.116-3.688,3.067-41.28-22.595-46.26c5.362,13.836,7.564,25.758-2.607,40.076\\\r
        c-0.667-5.422-3.255-12.263-8.834-17.183c-0.945,16.386,0.97,23.368-9.507,44.682c-2.945,8.902-5.02,17.635,0.533,26.418\\\r
        C171.354,102.673,180.555,108.205,190.761,109.999z\\\r
        M330.738,371.614h-15.835v-61.829l-74.409-78.541v-21.516c0-6.073-4.477-11.087-10.309-11.957v-82.156h-63.632v82.156\\\r
        c-5.831,0.869-10.308,5.883-10.308,11.957v21.516l-74.409,78.541v61.829H66l-25.124,25.123h314.984L330.738,371.614z\\\r
        M166.554,371.614h-61.717v-29.782h61.717V371.614z M166.554,319.956h-61.717v-1.007l51.471-54.329\\\r
        c0.555,5.513,4.813,9.919,10.246,10.729V319.956L166.554,319.956z M291.903,371.614h-61.718v-29.782h61.718V371.614z\\\r
        M291.903,319.956h-61.718V275.35c5.435-0.811,9.691-5.217,10.246-10.729l51.472,54.329V319.956z';\r
\r
    Icons.pyrolysis =\r
      'F M226.46,198.625v-75.5h-87.936v-19.391h-14.304V92.319h-5.079l-3.724-82.777H91.766l-3.724,82.777h-6.18v11.415H68.535\\\r
        V92.319h-5.079L59.731,9.542H36.08l-3.724,82.777h-6.18v11.415H11.872v94.891H0v35.167h243.333v-35.167H226.46z M61.355,191.792h-28\\\r
        v-69.333h28V191.792z M117.041,191.792h-28v-69.333h28V191.792z M168.46,198.625h-29.936v-17.5h29.936V198.625z M206.46,198.625h-18\\\r
        v-37.5h-49.936v-18h67.936V198.625z';\r
\r
    Icons.fractionation =\r
      'F M224.609,218.045l-5.24-173.376h9.172V18.297h-9.969L218.019,0h-32.956l-0.553,18.297h-9.969v26.372h9.171l-2.475,81.878\\\r
        h-39.196l-1.833-52.987h8.998V47.188h-9.91l-0.633-18.297h-32.913l-0.633,18.297h-9.911V73.56h8.999l-1.833,52.987H62.081\\\r
        l-0.974-24.097h8.767V76.079h-9.833l-0.74-18.298H26.446l-0.739,18.298h-9.832v26.371h8.766L19.97,218.045H3.041v26.371h238.333\\\r
        v-26.371z  M144.536,198.667h34.522l-0.586,19.378h-33.267L144.536,198.667z M143.624,172.296l-0.67-19.378h37.487\\\r
        l-0.586,19.378H143.624z M100.792,172.296H63.93l-0.783-19.378h38.315L100.792,172.296z M99.88,198.667l-0.67,19.378h-33.43\\\r
        l-0.783-19.378H99.88z';\r
\r
    Icons.gasprocessing =\r
      'F M242.179,212.635V58.634h-80.936v40.877h-13.465l-1.351-33.828h5.284V45.247h-6.1l-0.415-10.382h6.515V14.431h-46.927\\\r
      v20.435h6.515l-0.415,10.382h-6.1v20.436h5.284l-2.8,70.125H96.186V95.007H10.642v117.628H0v25.755h252.82v-25.755H242.179z\\\r
      M73.501,135.808H51.714v76.827H33.327v-94.942h40.174V135.808z M137.797,213.516h-19.099v-88h19.099V213.516z M219.494,212.635\\\r
      h-18.316v-51.411h18.316V212.635z M219.494,138.539h-18.316V99.511h-17.25V81.319h35.566V138.539z';\r
\r
    Icons.polymerization =\r
      'F M399.748,237.029 L363.965,174.401 345.094,174.401 343.113,155.463 326.566,155.463 322.797,29.385 290.486,29.385\\\r
        286.715,155.463 270.17,155.463 261.634,237.029 242.029,237.029 242.029,190.314 192.029,190.314 192.029,230.587 109.84,187.329\\\r
        109.84,230.486 27.84,187.329 27.84,237.029 0,237.029 0,394.674 424.059,394.674 424.059,237.029z';\r
\r
    Icons.finishedgas =\r
      'F M422.504,346.229v-68.306h-16.678v-24.856c0-21.863-16.199-39.935-37.254-42.882v-0.798\\\r
        c0-26.702-21.723-48.426-48.426-48.426h-1.609c-26.699,0-48.426,21.724-48.426,48.426v87.633h-23.641v-93.169\\\r
        c0-6.083-3.248-11.394-8.096-14.333c5.662-1.667,9.799-6.896,9.799-13.098c0-7.544-6.117-13.661-13.662-13.661h-10.981v-12.727h-17\\\r
        v12.727h-10.984c-7.545,0-13.66,6.116-13.66,13.661c0,6.202,4.137,11.431,9.799,13.098c-4.848,2.94-8.098,8.25-8.098,14.333v93.169\\\r
        h-23v-85.596c0-4.458-3.613-8.071-8.07-8.071h-16.412v-87.591c0-16.03-13.041-29.071-29.07-29.071v-1.267\\\r
        c0-23.608-19.139-42.748-42.748-42.748S21.54,61.817,21.54,85.425v260.805H0v55.139h444.045v-55.139H422.504z M286.256,209.387\\\r
        c0-17.801,14.48-32.284,32.281-32.284h1.609c17.803,0,32.285,14.483,32.285,32.284v1.559\\\r
        c-19.059,4.545-33.232,21.673-33.232,42.124v24.855h-16.676v19.098h-16.27v-87.635H286.256z M302.525,313.162v33.067h-16.27\\\r
        v-33.067H302.525z M270.113,313.162v33.067h-23.641v-33.067H270.113z M144.447,219.496v85.596c0,4.458,3.613,8.071,8.07,8.071\\\r
        h31.07v33.068h-47.482V219.496H144.447z M107.035,102.834c7.129,0,12.93,5.8,12.93,12.929v87.591h-12.93V102.834z M107.035,219.496\\\r
        h12.93v126.733h-12.93V219.496z';\r
\r
    const IconNames = [];\r
    for (var n in Icons) IconNames.push(n);\r
\r
    // A data binding conversion function. Given a name, return the Geometry.\r
    // If there is only a string, replace it with a Geometry object, which can be shared by multiple Shapes.\r
    function geoFunc(geoname) {\r
      var geo = Icons[geoname];\r
      if (typeof geo === 'string') {\r
        geo = Icons[geoname] = go.Geometry.parse(geo, true);\r
      }\r
      return geo;\r
    }\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialAutoScale: go.AutoScale.Uniform, // scale to show all of the contents\r
      ChangedSelection: onSelectionChanged, // view additional information\r
      maxSelectionCount: 1, // don't allow users to select more than one thing at a time\r
      isReadOnly: true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Spot', {\r
          locationObjectName: 'PORT',\r
          locationSpot: go.Spot.Top, // location point is the middle top of the PORT\r
          linkConnected: updatePortHeight,\r
          linkDisconnected: updatePortHeight,\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4, width: 140 })\r
                  .bind('text', '',\r
                      data => data.text + ':\\n\\n' + data.description)\r
              )\r
        })\r
        .bindTwoWay('location', 'pos', go.Point.parse, go.Point.stringify)\r
        .add(\r
          // The main element of the Spot panel is a vertical panel housing an optional icon,\r
          // plus a rectangle that acts as the port\r
          new go.Panel('Vertical')\r
            .add(\r
              new go.Shape({\r
                  width: 40,\r
                  height: 0,\r
                  stroke: null,\r
                  strokeWidth: 0,\r
                  fill: 'gray'\r
                })\r
                .bind('height', 'icon', () => 40)\r
                .bind('fill', 'color', colorFunc)\r
                .bind('geometry', 'icon', geoFunc),\r
              new go.Shape({\r
                  name: 'PORT',\r
                  width: 40,\r
                  height: 24,\r
                  margin: new go.Margin(-1, 0, 0, 0),\r
                  stroke: null,\r
                  strokeWidth: 0,\r
                  fill: 'gray',\r
                  portId: '',\r
                  fromLinkable: true,\r
                  toLinkable: true\r
                })\r
                .bind('fill', 'color', colorFunc),\r
              new go.TextBlock({\r
                  font: 'Bold 14px Lato, sans-serif',\r
                  textAlign: 'center',\r
                  margin: 3,\r
                  maxSize: new go.Size(100, NaN),\r
                  alignment: go.Spot.Top,\r
                  alignmentFocus: go.Spot.Bottom,\r
                  editable: true\r
                })\r
                .bindTwoWay('text')\r
            )\r
        );\r
\r
    function updatePortHeight(node, link, port) {\r
      var sideinputs = 0;\r
      var sideoutputs = 0;\r
      node.findLinksConnected().each(l => {\r
        if (l.toNode === node && l.toSpot === go.Spot.LeftSide) sideinputs++;\r
        if (l.fromNode === node && l.fromSpot === go.Spot.RightSide) sideoutputs++;\r
      });\r
      var tot = Math.max(sideinputs, sideoutputs);\r
      tot = Math.max(1, Math.min(tot, 2));\r
      port.height = tot * (10 + 2) + 2; // where 10 is the link path's strokeWidth\r
    }\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          layerName: 'Background',\r
          routing: go.Routing.Orthogonal,\r
          corner: 15,\r
          reshapable: true,\r
          resegmentable: true,\r
          fromSpot: go.Spot.RightSide,\r
          toSpot: go.Spot.LeftSide\r
        })\r
        // make sure links come in from the proper direction and go out appropriately\r
        .bind('fromSpot', 'fromSpot', go.Spot.parse)\r
        .bind('toSpot', 'toSpot', go.Spot.parse)\r
        .bindTwoWay('points')\r
        .add(\r
          // mark each Shape to get the link geometry with isPanelMain: true\r
          new go.Shape({ isPanelMain: true, stroke: 'gray', strokeWidth: 10 })\r
            // get the default stroke color from the fromNode\r
            .bindObject('stroke', 'fromNode',\r
              n => go.Brush.lighten((n && Colors[n.data.color]) || 'gray'))\r
            // but use the link's data.color if it is set\r
            .bind('stroke', 'color', colorFunc),\r
          new go.Shape({\r
            isPanelMain: true,\r
            stroke: 'white',\r
            strokeWidth: 3,\r
            name: 'PIPE',\r
            strokeDashArray: [20, 40]\r
          })\r
        );\r
\r
    var SpotNames = [\r
      'Top',\r
      'Left',\r
      'Right',\r
      'Bottom',\r
      'TopSide',\r
      'LeftSide',\r
      'RightSide',\r
      'BottomSide'\r
    ];\r
\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').textContent);\r
\r
    loop(); // animate some flow through the pipes\r
  }\r
\r
  var opacity = 1;\r
  var down = true;\r
  function loop() {\r
    var diagram = myDiagram;\r
    setTimeout(() => {\r
      var oldskips = diagram.skipsUndoManager;\r
      diagram.skipsUndoManager = true;\r
      diagram.links.each(link => {\r
        var shape = link.findObject('PIPE');\r
        var off = shape.strokeDashOffset - 3;\r
        // animate (move) the stroke dash\r
        shape.strokeDashOffset = off <= 0 ? 60 : off;\r
        // animte (strobe) the opacity:\r
        if (down) opacity = opacity - 0.01;\r
        else opacity = opacity + 0.003;\r
        if (opacity <= 0) {\r
          down = !down;\r
          opacity = 0;\r
        }\r
        if (opacity > 1) {\r
          down = !down;\r
          opacity = 1;\r
        }\r
        shape.opacity = opacity;\r
      });\r
      diagram.skipsUndoManager = oldskips;\r
      loop();\r
    }, 60);\r
  }\r
\r
  function onSelectionChanged() {\r
    var node = myDiagram.selection.first();\r
    if (!(node instanceof go.Node)) return;\r
    var data = node.data;\r
    var image = document.getElementById('Image');\r
    var title = document.getElementById('Title');\r
    var description = document.getElementById('Description');\r
\r
    if (data.imgsrc) {\r
      image.src = data.imgsrc;\r
      image.alt = data.caption;\r
    } else {\r
      image.src = '';\r
      image.alt = '';\r
    }\r
    title.textContent = data.text;\r
    description.textContent = data.description;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[`https://fonts.googleapis.com/css?family=Lato:400,700`],externalScripts:[],descriptionHtml:`<p>\r
    This process flow diagram partially simulates the production process for gas and oil\r
    byproducts into their end products.\r
  </p>\r
  <p>\r
    This diagram cannot be modified by the user, but its model was created in the corresponding\r
    editor:\r
    <a href="productionEditor">Production Process Editor</a>, which shares the same templates\r
    and has additional tools for editing diagrams.\r
  </p>\r
  <p>\r
    This viewer also has some animation of the pipes (links) that the editor does not show, to\r
    avoid distractions. A real application would also show additional information about the nodes\r
    and the links.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tooltips`,`geometries`,`svg`,`process`,`monitoring`,`html`];var g=y();l(`bbs9hf`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};