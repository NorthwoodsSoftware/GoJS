import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Data Visualization of Multi-Dimensional Data using Nodes and ToolTips`,titleShort:`Data Visualization`,indexDescription:`A data-visualization demonstration that showcases GoJS interacting with other elements on the page.`,screenshot:`datavisualization`,priority:2,tags:[`tooltips`,`html`,`animation`],description:`Interactive visualization of multi-dimensional data with HTML tooltips.`},htmlContent:`<div style="display: inline-block; position: relative">\r
    <!--The DIV for the Diagram needs an explicit size or else we won't see anything.\r
        Also add a border to help see the edges. -->\r
    <div\r
      id="myDiagramDiv"\r
      style="\r
        background-color: #3d3d3d;\r
        border: solid 1px black;\r
        width: 500px;\r
        height: 500px;\r
        float: left;\r
        margin-right: 10px;\r
      "></div>\r
    <!-- This sibling of the Diagram provides information when the mouse is near a Diagram Node -->\r
    <div id="infoBoxHolder">\r
      <!-- Initially Empty, it is populated when updateInfoBox is called -->\r
    </div>\r
\r
    <div id="controls">\r
      <div style="border: solid 1px gray; float: left; padding: 2px; margin-right: 10px; margin-bottom: 10px;">\r
        <p style="text-align: center">X-axis</p>\r
        <hr />\r
        <input\r
          type="radio"\r
          name="X"\r
          onclick="changeAxes(this)"\r
          value="sepalLength"\r
          id="SLx"\r
          checked />\r
        <label for="SLx">Sepal Length</label><br />\r
        <input\r
          type="radio"\r
          name="X"\r
          onclick="changeAxes(this)"\r
          value="sepalWidth"\r
          id="SWx" />\r
        <label for="SWx">Sepal Width</label><br />\r
        <input\r
          type="radio"\r
          name="X"\r
          onclick="changeAxes(this)"\r
          value="petalLength"\r
          id="PLx" />\r
        <label for="PLx">Petal Length</label><br />\r
        <input\r
          type="radio"\r
          name="X"\r
          onclick="changeAxes(this)"\r
          value="petalWidth"\r
          id="PWx" />\r
        <label for="PWx">Petal Width</label><br />\r
      </div>\r
      <div\r
        style="\r
          border: solid 1px gray;\r
          float: left;\r
          padding: 2px;\r
        ">\r
        <p style="text-align: center">Y-axis</p>\r
        <hr />\r
        <input\r
          type="radio"\r
          name="Y"\r
          onclick="changeAxes(this)"\r
          value="sepalLength"\r
          id="SLy" />\r
        <label for="SLy">Sepal Length</label><br />\r
        <input\r
          type="radio"\r
          name="Y"\r
          onclick="changeAxes(this)"\r
          value="sepalWidth"\r
          id="SWy"\r
          checked />\r
        <label for="SWy">Sepal Width</label><br />\r
        <input\r
          type="radio"\r
          name="Y"\r
          onclick="changeAxes(this)"\r
          value="petalLength"\r
          id="PLy" />\r
        <label for="PLy">Petal Length</label><br />\r
        <input\r
          type="radio"\r
          name="Y"\r
          onclick="changeAxes(this)"\r
          value="petalWidth"\r
          id="PWy" />\r
        <label for="PWy">Petal Width</label><br />\r
      </div>\r
    </div>\r
    \r
  </div>`,jsCode:`var myLocation = {\r
    // this controls the data properties used by data binding conversions\r
    x: 'sepalLength',\r
    y: 'sepalWidth'\r
  };\r
  var lastStroked = null; // this remembers the last highlight Shape\r
\r
  function init() {\r
    const myToolTip = new go.HTMLInfo({\r
      show: showToolTip\r
      // do nothing on hide: This tooltip doesn't hide unless the mouse leaves the diagram\r
    });\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.initialAnimationStyle': go.AnimationStyle.AnimateLocations,\r
      contentAlignment: go.Spot.Center, // content is always centered in the viewport\r
      autoScale: go.AutoScale.Uniform, // scale always has all content fitting in the viewport\r
      'toolManager.hoverDelay': 10, // how quickly tooltips are shown\r
      isReadOnly: true, // don't let users modify anything\r
      mouseOver: doMouseOver, // this event handler is defined below\r
      click: doMouseOver // this event handler is defined below\r
    });\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          selectable: false,\r
          toolTip: myToolTip\r
        })\r
        //.trigger('position', null, go.TriggerStart.Bundled)\r
        .bind('location', '',\r
              data => new go.Point(data[myLocation.x] * 200, data[myLocation.y] * 200))\r
        .add(\r
          new go.Shape('Hexagon', {\r
              name: 'SHAPE',\r
              width: 20,\r
              height: 20,\r
              strokeWidth: 4,\r
              stroke: null\r
            })\r
            .bind('fill', 'species', name => {\r
                switch (name) {\r
                  case 'Iris-setosa':\r
                    return 'rgba(240, 120,  50, .6)';\r
                  case 'Iris-versicolor':\r
                    return 'rgba(240, 230, 120, .6)';\r
                  case 'Iris-virginica':\r
                    return 'rgba(125, 200, 120, .6)';\r
                }\r
                return 'black';\r
              })\r
        );\r
\r
    // This is the fundamental data set, taken from:\r
    // https://en.wikipedia.org/wiki/Iris_flower_data_set\r
    var irisData = [\r
      [5.1, 3.5, 1.4, 0.2, 'Iris-setosa'],\r
      [4.9, 3.0, 1.4, 0.2, 'Iris-setosa'],\r
      [4.7, 3.2, 1.3, 0.2, 'Iris-setosa'],\r
      [4.6, 3.1, 1.5, 0.2, 'Iris-setosa'],\r
      [5.0, 3.6, 1.4, 0.2, 'Iris-setosa'],\r
      [5.4, 3.9, 1.7, 0.4, 'Iris-setosa'],\r
      [4.6, 3.4, 1.4, 0.3, 'Iris-setosa'],\r
      [5.0, 3.4, 1.5, 0.2, 'Iris-setosa'],\r
      [4.4, 2.9, 1.4, 0.2, 'Iris-setosa'],\r
      [4.9, 3.1, 1.5, 0.1, 'Iris-setosa'],\r
      [5.4, 3.7, 1.5, 0.2, 'Iris-setosa'],\r
      [4.8, 3.4, 1.6, 0.2, 'Iris-setosa'],\r
      [4.8, 3.0, 1.4, 0.1, 'Iris-setosa'],\r
      [4.3, 3.0, 1.1, 0.1, 'Iris-setosa'],\r
      [5.8, 4.0, 1.2, 0.2, 'Iris-setosa'],\r
      [5.7, 4.4, 1.5, 0.4, 'Iris-setosa'],\r
      [5.4, 3.9, 1.3, 0.4, 'Iris-setosa'],\r
      [5.1, 3.5, 1.4, 0.3, 'Iris-setosa'],\r
      [5.7, 3.8, 1.7, 0.3, 'Iris-setosa'],\r
      [5.1, 3.8, 1.5, 0.3, 'Iris-setosa'],\r
      [5.4, 3.4, 1.7, 0.2, 'Iris-setosa'],\r
      [5.1, 3.7, 1.5, 0.4, 'Iris-setosa'],\r
      [4.6, 3.6, 1.0, 0.2, 'Iris-setosa'],\r
      [5.1, 3.3, 1.7, 0.5, 'Iris-setosa'],\r
      [4.8, 3.4, 1.9, 0.2, 'Iris-setosa'],\r
      [5.0, 3.0, 1.6, 0.2, 'Iris-setosa'],\r
      [5.0, 3.4, 1.6, 0.4, 'Iris-setosa'],\r
      [5.2, 3.5, 1.5, 0.2, 'Iris-setosa'],\r
      [5.2, 3.4, 1.4, 0.2, 'Iris-setosa'],\r
      [4.7, 3.2, 1.6, 0.2, 'Iris-setosa'],\r
      [4.8, 3.1, 1.6, 0.2, 'Iris-setosa'],\r
      [5.4, 3.4, 1.5, 0.4, 'Iris-setosa'],\r
      [5.2, 4.1, 1.5, 0.1, 'Iris-setosa'],\r
      [5.5, 4.2, 1.4, 0.2, 'Iris-setosa'],\r
      [4.9, 3.1, 1.5, 0.2, 'Iris-setosa'],\r
      [5.0, 3.2, 1.2, 0.2, 'Iris-setosa'],\r
      [5.5, 3.5, 1.3, 0.2, 'Iris-setosa'],\r
      [4.9, 3.6, 1.4, 0.1, 'Iris-setosa'],\r
      [4.4, 3.0, 1.3, 0.2, 'Iris-setosa'],\r
      [5.1, 3.4, 1.5, 0.2, 'Iris-setosa'],\r
      [5.0, 3.5, 1.3, 0.3, 'Iris-setosa'],\r
      [4.5, 2.3, 1.3, 0.3, 'Iris-setosa'],\r
      [4.4, 3.2, 1.3, 0.2, 'Iris-setosa'],\r
      [5.0, 3.5, 1.6, 0.6, 'Iris-setosa'],\r
      [5.1, 3.8, 1.9, 0.4, 'Iris-setosa'],\r
      [4.8, 3.0, 1.4, 0.3, 'Iris-setosa'],\r
      [5.1, 3.8, 1.6, 0.2, 'Iris-setosa'],\r
      [4.6, 3.2, 1.4, 0.2, 'Iris-setosa'],\r
      [5.3, 3.7, 1.5, 0.2, 'Iris-setosa'],\r
      [5.0, 3.3, 1.4, 0.2, 'Iris-setosa'],\r
      [7.0, 3.2, 4.7, 1.4, 'Iris-versicolor'],\r
      [6.4, 3.2, 4.5, 1.5, 'Iris-versicolor'],\r
      [6.9, 3.1, 4.9, 1.5, 'Iris-versicolor'],\r
      [5.5, 2.3, 4.0, 1.3, 'Iris-versicolor'],\r
      [6.5, 2.8, 4.6, 1.5, 'Iris-versicolor'],\r
      [5.7, 2.8, 4.5, 1.3, 'Iris-versicolor'],\r
      [6.3, 3.3, 4.7, 1.6, 'Iris-versicolor'],\r
      [4.9, 2.4, 3.3, 1.0, 'Iris-versicolor'],\r
      [6.6, 2.9, 4.6, 1.3, 'Iris-versicolor'],\r
      [5.2, 2.7, 3.9, 1.4, 'Iris-versicolor'],\r
      [5.0, 2.0, 3.5, 1.0, 'Iris-versicolor'],\r
      [5.9, 3.0, 4.2, 1.5, 'Iris-versicolor'],\r
      [6.0, 2.2, 4.0, 1.0, 'Iris-versicolor'],\r
      [6.1, 2.9, 4.7, 1.4, 'Iris-versicolor'],\r
      [5.6, 2.9, 3.6, 1.3, 'Iris-versicolor'],\r
      [6.7, 3.1, 4.4, 1.4, 'Iris-versicolor'],\r
      [5.6, 3.0, 4.5, 1.5, 'Iris-versicolor'],\r
      [5.8, 2.7, 4.1, 1.0, 'Iris-versicolor'],\r
      [6.2, 2.2, 4.5, 1.5, 'Iris-versicolor'],\r
      [5.6, 2.5, 3.9, 1.1, 'Iris-versicolor'],\r
      [5.9, 3.2, 4.8, 1.8, 'Iris-versicolor'],\r
      [6.1, 2.8, 4.0, 1.3, 'Iris-versicolor'],\r
      [6.3, 2.5, 4.9, 1.5, 'Iris-versicolor'],\r
      [6.1, 2.8, 4.7, 1.2, 'Iris-versicolor'],\r
      [6.4, 2.9, 4.3, 1.3, 'Iris-versicolor'],\r
      [6.6, 3.0, 4.4, 1.4, 'Iris-versicolor'],\r
      [6.8, 2.8, 4.8, 1.4, 'Iris-versicolor'],\r
      [6.7, 3.0, 5.0, 1.7, 'Iris-versicolor'],\r
      [6.0, 2.9, 4.5, 1.5, 'Iris-versicolor'],\r
      [5.7, 2.6, 3.5, 1.0, 'Iris-versicolor'],\r
      [5.5, 2.4, 3.8, 1.1, 'Iris-versicolor'],\r
      [5.5, 2.4, 3.7, 1.0, 'Iris-versicolor'],\r
      [5.8, 2.7, 3.9, 1.2, 'Iris-versicolor'],\r
      [6.0, 2.7, 5.1, 1.6, 'Iris-versicolor'],\r
      [5.4, 3.0, 4.5, 1.5, 'Iris-versicolor'],\r
      [6.0, 3.4, 4.5, 1.6, 'Iris-versicolor'],\r
      [6.7, 3.1, 4.7, 1.5, 'Iris-versicolor'],\r
      [6.3, 2.3, 4.4, 1.3, 'Iris-versicolor'],\r
      [5.6, 3.0, 4.1, 1.3, 'Iris-versicolor'],\r
      [5.5, 2.5, 4.0, 1.3, 'Iris-versicolor'],\r
      [5.5, 2.6, 4.4, 1.2, 'Iris-versicolor'],\r
      [6.1, 3.0, 4.6, 1.4, 'Iris-versicolor'],\r
      [5.8, 2.6, 4.0, 1.2, 'Iris-versicolor'],\r
      [5.0, 2.3, 3.3, 1.0, 'Iris-versicolor'],\r
      [5.6, 2.7, 4.2, 1.3, 'Iris-versicolor'],\r
      [5.7, 3.0, 4.2, 1.2, 'Iris-versicolor'],\r
      [5.7, 2.9, 4.2, 1.3, 'Iris-versicolor'],\r
      [6.2, 2.9, 4.3, 1.3, 'Iris-versicolor'],\r
      [5.1, 2.5, 3.0, 1.1, 'Iris-versicolor'],\r
      [5.7, 2.8, 4.1, 1.3, 'Iris-versicolor'],\r
      [6.3, 3.3, 6.0, 2.5, 'Iris-virginica'],\r
      [5.8, 2.7, 5.1, 1.9, 'Iris-virginica'],\r
      [7.1, 3.0, 5.9, 2.1, 'Iris-virginica'],\r
      [6.3, 2.9, 5.6, 1.8, 'Iris-virginica'],\r
      [6.5, 3.0, 5.8, 2.2, 'Iris-virginica'],\r
      [7.6, 3.0, 6.6, 2.1, 'Iris-virginica'],\r
      [4.9, 2.5, 4.5, 1.7, 'Iris-virginica'],\r
      [7.3, 2.9, 6.3, 1.8, 'Iris-virginica'],\r
      [6.7, 2.5, 5.8, 1.8, 'Iris-virginica'],\r
      [7.2, 3.6, 6.1, 2.5, 'Iris-virginica'],\r
      [6.5, 3.2, 5.1, 2.0, 'Iris-virginica'],\r
      [6.4, 2.7, 5.3, 1.9, 'Iris-virginica'],\r
      [6.8, 3.0, 5.5, 2.1, 'Iris-virginica'],\r
      [5.7, 2.5, 5.0, 2.0, 'Iris-virginica'],\r
      [5.8, 2.8, 5.1, 2.4, 'Iris-virginica'],\r
      [6.4, 3.2, 5.3, 2.3, 'Iris-virginica'],\r
      [6.5, 3.0, 5.5, 1.8, 'Iris-virginica'],\r
      [7.7, 3.8, 6.7, 2.2, 'Iris-virginica'],\r
      [7.7, 2.6, 6.9, 2.3, 'Iris-virginica'],\r
      [6.0, 2.2, 5.0, 1.5, 'Iris-virginica'],\r
      [6.9, 3.2, 5.7, 2.3, 'Iris-virginica'],\r
      [5.6, 2.8, 4.9, 2.0, 'Iris-virginica'],\r
      [7.7, 2.8, 6.7, 2.0, 'Iris-virginica'],\r
      [6.3, 2.7, 4.9, 1.8, 'Iris-virginica'],\r
      [6.7, 3.3, 5.7, 2.1, 'Iris-virginica'],\r
      [7.2, 3.2, 6.0, 1.8, 'Iris-virginica'],\r
      [6.2, 2.8, 4.8, 1.8, 'Iris-virginica'],\r
      [6.1, 3.0, 4.9, 1.8, 'Iris-virginica'],\r
      [6.4, 2.8, 5.6, 2.1, 'Iris-virginica'],\r
      [7.2, 3.0, 5.8, 1.6, 'Iris-virginica'],\r
      [7.4, 2.8, 6.1, 1.9, 'Iris-virginica'],\r
      [7.9, 3.8, 6.4, 2.0, 'Iris-virginica'],\r
      [6.4, 2.8, 5.6, 2.2, 'Iris-virginica'],\r
      [6.3, 2.8, 5.1, 1.5, 'Iris-virginica'],\r
      [6.1, 2.6, 5.6, 1.4, 'Iris-virginica'],\r
      [7.7, 3.0, 6.1, 2.3, 'Iris-virginica'],\r
      [6.3, 3.4, 5.6, 2.4, 'Iris-virginica'],\r
      [6.4, 3.1, 5.5, 1.8, 'Iris-virginica'],\r
      [6.0, 3.0, 4.8, 1.8, 'Iris-virginica'],\r
      [6.9, 3.1, 5.4, 2.1, 'Iris-virginica'],\r
      [6.7, 3.1, 5.6, 2.4, 'Iris-virginica'],\r
      [6.9, 3.1, 5.1, 2.3, 'Iris-virginica'],\r
      [5.8, 2.7, 5.1, 1.9, 'Iris-virginica'],\r
      [6.8, 3.2, 5.9, 2.3, 'Iris-virginica'],\r
      [6.7, 3.3, 5.7, 2.5, 'Iris-virginica'],\r
      [6.7, 3.0, 5.2, 2.3, 'Iris-virginica'],\r
      [6.3, 2.5, 5.0, 1.9, 'Iris-virginica'],\r
      [6.5, 3.0, 5.2, 2.0, 'Iris-virginica'],\r
      [6.2, 3.4, 5.4, 2.3, 'Iris-virginica'],\r
      [5.9, 3.0, 5.1, 1.8, 'Iris-virginica']\r
    ];\r
\r
    // now convert that data into an Array of JavaScript Objects,\r
    // to be used as the Model.nodeDataArray\r
    var array = [];\r
    for (var i = 0; i < irisData.length; i++) {\r
      var line = irisData[i];\r
      var data = {\r
        sepalLength: line[0],\r
        sepalWidth: line[1],\r
        petalLength: line[2],\r
        petalWidth: line[3],\r
        species: line[4]\r
      };\r
      array.push(data);\r
    }\r
\r
    // create the Model for the Diagram to display\r
    myDiagram.model = new go.Model(array);\r
\r
    // Called when the mouse is over the diagram's background\r
    function doMouseOver(e) {\r
      if (performance.now() - e.timestamp > 200) return; // ignore old events\r
      if (e === undefined) e = myDiagram.lastInput;\r
      var doc = e.documentPoint;\r
      // find all Nodes that are within 100 units\r
      var list = myDiagram.findObjectsNear(\r
        doc,\r
        100,\r
        null,\r
        x => x instanceof go.Node\r
      );\r
      // now find the one that is closest to e.documentPoint\r
      var closest = null;\r
      var closestDist = 999999999;\r
      list.each(node => {\r
        var dist = doc.distanceSquaredPoint(\r
          node.getDocumentPoint(go.Spot.Center)\r
        );\r
        if (dist < closestDist) {\r
          closestDist = dist;\r
          closest = node;\r
        }\r
      });\r
      showToolTip(closest, myDiagram);\r
    }\r
\r
    // Called with a Node (or null) that the mouse is over or near\r
    function showToolTip(obj, diagram) {\r
      if (obj !== null) {\r
        var node = obj.part;\r
        var e = diagram.lastInput;\r
        var shape = node.findObject('SHAPE');\r
        shape.stroke = 'white';\r
        if (lastStroked !== null && lastStroked !== shape) {\r
          lastStroked.stroke = null;\r
        }\r
        lastStroked = shape;\r
        updateInfoBox(e.viewPoint, node.data);\r
      } else {\r
        if (lastStroked !== null) lastStroked.stroke = null;\r
        lastStroked = null;\r
        document.getElementById('infoBoxHolder').innerHTML = '';\r
      }\r
    }\r
\r
    // Make sure the infoBox is momentarily hidden if the user tries to mouse over it\r
    var infoBoxH = document.getElementById('infoBoxHolder');\r
    infoBoxH.addEventListener('mousemove',\r
      () => {\r
        var box = document.getElementById('infoBoxHolder');\r
        box.style.left = parseInt(box.style.left) + 'px';\r
        box.style.top = parseInt(box.style.top) + 30 + 'px';\r
      },\r
      false\r
    );\r
\r
    var diagramDiv = document.getElementById('myDiagramDiv');\r
    // Make sure the infoBox is hidden when the mouse is not over the Diagram\r
    diagramDiv.addEventListener('mouseout',\r
      e => {\r
        if (lastStroked !== null) lastStroked.stroke = null;\r
        lastStroked = null;\r
\r
        var infoBox = document.getElementById('infoBox');\r
        var elem = document.elementFromPoint(e.clientX, e.clientY);\r
        if (\r
          elem !== null &&\r
          (elem === infoBox || elem.parentNode === infoBox)\r
        ) {\r
          var box = document.getElementById('infoBoxHolder');\r
          box.style.left = parseInt(box.style.left) + 'px';\r
          box.style.top = parseInt(box.style.top) + 30 + 'px';\r
        } else {\r
          var box = document.getElementById('infoBoxHolder');\r
          box.innerHTML = '';\r
        }\r
      },\r
      false\r
    );\r
  } // end init\r
\r
  // This function is called to update the tooltip information\r
  // depending on the bound data of the Node that is closest to the pointer.\r
  function updateInfoBox(mousePt, data) {\r
    const box = document.getElementById('infoBoxHolder');\r
    box.innerHTML = '';\r
    const infobox = document.createElement('div');\r
    infobox.id = 'infoBox';\r
    box.appendChild(infobox);\r
    for (let i = 0; i < 9; i++) {\r
      const child = document.createElement('div');\r
      switch (i) {\r
        case 0:\r
          child.textContent = data.species;\r
          break;\r
        case 1:\r
          child.className = 'infoTitle';\r
          child.textContent = 'Sepal Length';\r
          break;\r
        case 2:\r
          child.className = 'infoValues';\r
          child.textContent = data.sepalLength;\r
          break;\r
        case 3:\r
          child.className = 'infoTitle';\r
          child.textContent = 'Sepal Width';\r
          break;\r
        case 4:\r
          child.className = 'infoValues';\r
          child.textContent = data.sepalWidth;\r
          break;\r
        case 5:\r
          child.className = 'infoTitle';\r
          child.textContent = 'Petal Length';\r
          break;\r
        case 6:\r
          child.className = 'infoValues';\r
          child.textContent = data.petalLength;\r
          break;\r
        case 7:\r
          child.className = 'infoTitle';\r
          child.textContent = 'Petal Width';\r
          break;\r
        case 8:\r
          child.className = 'infoValues';\r
          child.textContent = data.petalWidth;\r
          break;\r
      }\r
      infobox.appendChild(child);\r
    }\r
    box.style.left = mousePt.x + 30 + 'px';\r
    box.style.top = mousePt.y + 20 + 'px';\r
  }\r
\r
  // This function is called which a radio button is pressed.\r
  // It changes the value of a variable that the node template's location conversion function uses.\r
  // It then updates all target bindings, causing all node locations to change.\r
  function changeAxes(e) {\r
    var value = e.value;\r
    if (e.name === 'X') {\r
      myLocation.x = value;\r
    } else {\r
      myLocation.y = value;\r
    }\r
    myDiagram.startTransaction('updateBindings');\r
    myDiagram.updateAllTargetBindings();\r
    myDiagram.commitTransaction('updateBindings');\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`#infoBoxHolder {\r
    z-index: 300;\r
    position: absolute;\r
    left: 5px;\r
  }\r
\r
  #infoBox {\r
    border: 1px solid #999;\r
    padding: 8px;\r
    background-color: whitesmoke;\r
    opacity: 0.9;\r
    position: relative;\r
    width: 170px;\r
    font-family: arial, helvetica, sans-serif;\r
    font-weight: bold;\r
    font-size: 11px;\r
  }\r
\r
  /* this is known as the "clearfix" hack to allow\r
     floated objects to add to the height of a div */\r
  #infoBox:after, #controls::after {\r
    visibility: hidden;\r
    display: block;\r
    font-size: 0;\r
    content: ' ';\r
    clear: both;\r
    height: 0;\r
  }\r
\r
  div.infoTitle {\r
    width: 100px;\r
    font-weight: normal;\r
    color: #787878;\r
    float: left;\r
    margin-left: 4px;\r
  }\r
\r
  div.infoValues {\r
    width: 30px;\r
    text-align: right;\r
    float: right;\r
  }\r
\r
  label:hover,\r
  label:focus {\r
    background: #cedff2;\r
  }`,externalStyles:[],externalScripts:[`../extensions/Figures.js`],descriptionHtml:`<p>\r
        This sample gives an example of a Diagram interacting with other HTML\r
        elements on the page.\r
      </p>\r
      <p>\r
        As the mouse moves over the diagram, a formatted HTML DIV element\r
        displays information about the nearest Node.\r
      </p>\r
      <p>\r
        The data displayed is from the\r
        <a href="https://en.wikipedia.org/wiki/Iris_flower_data_set"\r
          >Iris flower data set</a\r
        >, describing the variations in dimensions of three related flower\r
        species.\r
      </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tooltips`,`html`,`animation`];var g=y();l(`1w6mhtv`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};