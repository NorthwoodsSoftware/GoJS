import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Security Monitor Dashboard`,titleShort:`Security Monitor`,description:`Example of a security dashboard made with GoJS. Diagram for monitoring live video feeds and swipe access doors.`,indexDescription:`Example of a security dashboard made with GoJS. Diagram for monitoring live video feeds and swipe access doors.`,screenshot:`security`,priority:.9,tags:[`animation`,`geometries`,`monitoring`,`palette`,`tooltips`,`scada`]},htmlContent:`<div style="width: 100%; display: flex; border: solid 1px black;">\r
    <div\r
      id="myPaletteDiv"\r
      style="width: 100px; height: 600px; background: whitesmoke; border-right: solid 1px black;">\r
    </div>\r
    <div id="myDiagramDiv" style="height: 600px; flex-grow: 1;"></div>\r
  </div>\r
\r
  <div style="width: 100%; display: flex; flex-wrap: wrap;">\r
    <div style="flex: 1; min-width: 500px; margin-bottom: 1rem; margin-right: 0.5rem;">\r
      <p style="margin-block: .5em">\r
        Clicking a (simulated) video feed below will highlight the corresponding camera in the Diagram. A single camera is offline to demonstrate a signal connection error.\r
      </p>\r
      <div id="cameraFeeds" style="border: solid 1px black; width: 100%; min-height: 100px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));"></div>\r
    </div>\r
    <div style="flex: none; width: 500px; min-height: 200px; display: flex; flex-direction: column; margin-bottom: 1rem;">\r
      <p style="margin-block: .5em">Event Log</p>\r
      <textarea id="outputLog" style="width: 100%; height: 100%; resize: none;" autocomplete="off"></textarea>\r
    </div>\r
  </div>\r
\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 400px" autocomplete="off">\r
{ "class": "GraphLinksModel",\r
  "nodeDataArray": [\r
{"category":"door","loc":"535 641.85","ang":270,"width":62.7,"height":15,"key":"sub office 1"},\r
{"category":"door","loc":"588.45 665","width":56.1,"height":15,"key":"office 1"},\r
{"category":"door","loc":"721.8 738","key":"bath 1","width":48.4,"height":15},\r
{"category":"door","loc":"942.4 664","key":"office 2","width":57.2,"height":15},\r
{"category":"door","loc":"401.45 942","key":"main entrance","width":100.1,"height":15},\r
{"loc":"715 1125.35","category":"door","key":"lounge 1","ang":270,"width":62.7,"height":15},\r
{"loc":"721.2 1007","category":"door","key":"storage 1","width":61.6,"height":15},\r
{"loc":"1119.25 738","category":"door","key":"meeting 1","width":60.5,"height":15},\r
{"loc":"1607.2 407","category":"door","key":"meeting 2","width":61.6,"height":15},\r
{"loc":"2133 671.2","category":"door","key":"office 3","ang":90,"width":61.6,"height":15},\r
{"loc":"2310 669.65","category":"door","key":"second entrance","ang":90,"width":62.7,"height":15},\r
{"loc":"1996.25 407","category":"door","key":"lounge 2","width":60.5,"height":15},\r
{"loc":"1808.75 561","category":"door","key":"bath 2","width":49.5,"height":15},\r
{"loc":"1898.7 561","category":"door","key":"bath 3","width":50.6,"height":15},\r
{"loc":"2310 947.15","category":"door","key":"sub office 4","ang":90,"width":62.7,"height":15},\r
{"loc":"2133 935.35","category":"door","key":"sub office 2","ang":270,"width":62.7,"height":15},\r
{"loc":"2133 949.2","category":"door","key":"sub office 3","ang":90,"width":61.6,"height":15},\r
{"loc":"2285.8 1018","category":"door","key":"sub office 5","width":61.6,"height":15,"ang":180},\r
{"loc":"2310 568.75","category":"door","key":"office 4","width":60.5,"height":15,"ang":90},\r
{"loc":"2310 451.1","category":"door","key":"storage 2","ang":90,"width":63.8,"height":15},\r
{"loc":"2310 371.25","category":"door","key":"meeting 3","ang":270,"width":60.5,"height":15},\r
{"status":"Camera offline since 6/30/2025, 11:06:17 AM","loc":"546 675","category":"camera","sweep":90,"radius":160,"key":1},\r
{"status":"Live","loc":"704 1194","category":"camera","sweep":90,"radius":280,"key":2,"angle":180},\r
{"status":"Live","loc":"1937 683","category":"camera","sweep":92,"radius":111,"key":3,"angle":179},\r
{"status":"Live","loc":"2460 663","category":"camera","sweep":90,"radius":128,"key":4,"angle":90},\r
{"status":"Live","loc":"524 674","category":"camera","sweep":90,"radius":162,"key":5,"angle":90},\r
{"category":"camera","sweep":90,"radius":430,"angle":180,"status":"Live","key":-27,"loc":"2117 1167"},\r
{"category":"camera","sweep":90,"radius":475,"angle":90,"status":"Live","key":-28,"loc":"1577 142"},\r
{"category":"camera","sweep":90,"radius":430,"angle":90,"status":"Live","key":-29,"loc":"867 150"},\r
{"category":"camera","sweep":90,"radius":225,"angle":180,"status":"Live","key":-30,"loc":"1236 998"},\r
{"category":"camera","sweep":90,"radius":270,"angle":90,"status":"Live","key":-31,"loc":"1937 118"},\r
{"category":"camera","sweep":90,"radius":210,"angle":270,"status":"Live","key":-32,"loc":"1968 370"},\r
{"category":"camera","sweep":90,"radius":282,"angle":360,"status":"Live","key":-33,"loc":"2328 120"},\r
{"category":"camera","sweep":90,"radius":145,"angle":270,"status":"Live","key":-34,"loc":"1970 643"}\r
],\r
  "linkDataArray": []}\r
  </textarea>`,jsCode:`const scaleMult = 2.5;\r
  let currentScale = 1 * scaleMult;\r
\r
  function init() {\r
    // clear the output log, some browsers will save text in textareas\r
    document.getElementById('outputLog').innerText = '';\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      contentAlignment: go.Spot.Center,\r
      initialAutoScale: go.AutoScale.Uniform,\r
      allowClipboard: false,\r
      allowCopy: false,\r
      'grid.gridCellSize': new go.Size(1, 1),\r
      'draggingTool.isGridSnapEnabled': true,\r
      'toolManager.hoverDelay': 350, // changes delay for tooltips\r
      'animationManager.isInitial': false\r
    });\r
\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) { if (idx < 0) document.title += '*'; }\r
      else { if (idx >= 0) document.title = document.title.slice(0, idx); }\r
    });\r
\r
    // install the SectorReshapingTool as a mouse-down tool\r
    myDiagram.toolManager.mouseDownTools.add(new SectorReshapingTool());\r
\r
    // the background image, a floor plan\r
    myDiagram.add(\r
      new go.Part({ // this Part is not bound to any model data\r
          layerName: 'Background',\r
          position: new go.Point(0, 0),\r
          selectable: false,\r
          pickable: false\r
        })\r
        .add(\r
          new go.Picture("https://gojs.net/latest/samples/images/officeFloorPlan.png", { width: 2833, height: 1333 })\r
        ));\r
\r
    // Doors represent an access-controlled door (eg, by keycard). They open and close automatically when simulated persons use them.\r
    myDiagram.nodeTemplateMap.add('door',\r
      new go.Node({\r
          resizeObjectName: 'DOOR',\r
          locationSpot: go.Spot.Left,\r
          pickable: false,\r
          selectable: false\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .bindTwoWay('angle', 'ang')\r
        .add(\r
          new go.Shape({\r
            name: 'DOOR',\r
            strokeWidth: 1,\r
            fill: 'rgb(0,255,0)',\r
            height: 9,\r
            width: 50\r
          })\r
          .bind('width')\r
          .bind('height')\r
        ));\r
\r
    // Cameras represent a security camera's visible area\r
    myDiagram.nodeTemplateMap.add('camera',\r
      new go.Node('Spot', {\r
          isInDocumentBounds: false,\r
          isShadowed: true,\r
          shadowOffset: new go.Point(2,2),\r
          shadowColor: 'black',\r
          locationSpot: go.Spot.Center,\r
          locationObjectName: 'LAMP',\r
          selectionObjectName: 'LAMP',\r
          selectionAdorned: false,\r
          toolTip:\r
            new go.Adornment('Auto')\r
              .add(\r
                new go.Shape('RoundedRectangle', {\r
                  fill: 'white'\r
                }),\r
                new go.TextBlock('Live', { margin: 6 })\r
                  .bind('text', 'status')\r
              )\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Spot', { name: 'LAMP' })\r
            .add(\r
              new go.Shape({ // arc\r
                  name: 'ARC',\r
                  fill: 'skyblue',\r
                  strokeWidth: 5,\r
                  opacity: 0.5,\r
                  shadowVisible: false\r
                })\r
                .bindObject('stroke', 'isSelected', s => s ? 'blue' : null)\r
                .bind('fill', 'status', s => s !== 'Live' ? 'red' : 'skyblue')\r
                .bind('geometry', '', makeSector),\r
              new go.Shape('Circle', { name: 'SHAPE', width: 6, height: 6 }),\r
              new go.TextBlock('!', {\r
                  alignmentFocus: new go.Spot(1, 0, -30, -30),\r
                  font: '64pt Arial',\r
                  stroke: 'red',\r
                  shadowVisible: true\r
                })\r
                .bind('visible', 'status', s => s!== 'Live')\r
            ),\r
          new go.TextBlock({\r
              alignment: new go.Spot(0.5, 0.5, 0, 3),\r
              alignmentFocus: go.Spot.Top,\r
              stroke: 'blue',\r
              background: 'rgba(255,255,255,0.3)'\r
            })\r
            .bindTwoWay('alignment', 'spot', go.Spot.parse, go.Spot.stringify)\r
            .bind('text', 'name')\r
        ));\r
\r
    // This code keeps certain parts at a constant size in the viewport, by\r
    // adjusting for any scaling done by zooming in or out.\r
    let origscale = NaN;\r
    myDiagram.addDiagramListener('InitialLayoutCompleted', e => {\r
      origscale = myDiagram.scale;\r
    });\r
    myDiagram.addDiagramListener('ViewportBoundsChanged', e => {\r
      if (isNaN(origscale)) return;\r
      var newscale = myDiagram.scale;\r
      if (e.subject.scale === newscale) return; // optimization: don't scale Nodes when just scrolling/panning\r
      myDiagram.skipsUndoManager = true;\r
      myDiagram.startTransaction('scale Nodes');\r
      currentScale = scaleMult * origscale / newscale;\r
      myDiagram.parts.each(p => {\r
        if (p.layerName !== 'Adornment') return; // don't scale background image\r
        p.scale = currentScale;\r
      });\r
      myDiagram.commitTransaction('scale Nodes');\r
      myDiagram.skipsUndoManager = false;\r
    });\r
\r
    // Create the Diagram's Model\r
    load();\r
    // Toggle random events on\r
    toggleEvents();\r
\r
    // palette\r
    myPalette = new go.Palette('myPaletteDiv', {\r
      layout: new go.GridLayout({\r
        cellSize: new go.Size(1, 1),\r
        wrappingColumn: 1\r
      }),\r
      'dragSelectingTool.isEnabled': false,\r
      hasHorizontalScrollbar: false,\r
      hasVerticalScrollbar: false,\r
      allowHorizontalScroll: false,\r
      allowVerticalScroll: false,\r
      allowZoom: false,\r
      contentAlignment: go.Spot.Center,\r
      'toolManager.hoverDelay': myDiagram.toolManager.hoverDelay,\r
      scale: 0.6,\r
      scrollMode: go.Diagram.InfiniteScroll,\r
      nodeTemplate: myDiagram.nodeTemplate, // shared with the main Diagram\r
      nodeTemplateMap: myDiagram.nodeTemplateMap, // shared with the main Diagram\r
      model: new go.GraphLinksModel({\r
        nodeDataArray: [\r
          { category: 'camera', sweep: 90, radius: 90, angle: 315, status: 'Live' },\r
          { category: 'camera', sweep: 90, radius: 90, angle: 315, status: 'Offline' }\r
        ]\r
      })\r
    });\r
\r
    // center the elements in the palette, this is needed because the "center"\r
    // of the camera is technically the black circle\r
    myPalette.addDiagramListener('InitialLayoutCompleted', () => {\r
      myPalette.nodes.each(n => {\r
        const p = n.position.copy();\r
        p.x -= n.getDocumentBounds().width / 2 * myPalette.scale;\r
        n.position = p;\r
      });\r
    });\r
\r
    // link each camera to a "Live" video feed\r
    myDiagram.addDiagramListener("InitialLayoutCompleted", e => {\r
        myDiagram.nodes.each(linkCam);\r
    });\r
\r
    // unlink deleted cameras\r
    myDiagram.addDiagramListener('SelectionDeleting', e => {\r
      // the DiagramEvent.subject is the collection of Parts about to be deleted\r
      // reverse to put back in the same order for load\r
      [... e.subject].reverse().forEach(part => {\r
        if (part.category !== 'camera') return;\r
        if (part.data?._cameraDiv?.firstChild?.src) {\r
          camIMGs.unshift(part.data._cameraDiv.firstChild.src);\r
        }\r
        part.data._cameraDiv.remove();\r
      });\r
    });\r
\r
    // highlight current camera\r
    let prevSelection = null;\r
    myDiagram.addDiagramListener('ChangedSelection', e => {\r
      if (prevSelection) {\r
        prevSelection.each(part => { // undo old highlights\r
          if (!part) return;\r
          if (part.category !== 'camera') return;\r
          if (!part.data._cameraDiv) return;\r
\r
          part.data._cameraDiv.style.borderColor = 'rgba(0,0,0,0)';\r
        });\r
      }\r
      prevSelection = e.subject.copy();\r
\r
      e.subject.each(part => { // highlight currently selected\r
        if (!part) return;\r
        if (part.category !== 'camera') return;\r
        if (!part.data._cameraDiv) linkCam(part);\r
\r
        part.data._cameraDiv.style.borderColor = 'white';\r
      });\r
    });\r
\r
    /** "malfunctioning" camera(s) **/\r
\r
    // set camera 1 to offline\r
    const cam = myDiagram.findNodeForKey(1);\r
    const date = new Date();\r
    date.setHours(date.getHours() * (Math.random() * 0.5 + 0.25));\r
    myDiagram.model.set(cam.data, 'status', \`Camera offline since \${date.toLocaleString()}\`);\r
\r
    // alternate opacity of all "malfunctioning" cameras\r
    let cur_op = 0.4;\r
    setInterval(() => {\r
      cur_op = cur_op !== 0.4 ? 0.4 : 0.63;\r
      myDiagram.nodes.each(n => {\r
        if (n.data.category !== 'camera') return;\r
        if (n.data.status === 'Live') return;\r
        const arc = n.findObject('ARC');\r
        myDiagram.model.set(arc, 'opacity', cur_op);\r
      });\r
    }, 650);\r
\r
    save(); // update model to match random camera status\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);\r
\r
  function makeSector(data) {\r
    // Geometry converter for the node's "LAMP" Shape\r
    var radius = SectorReshapingTool.getRadius(data);\r
    var angle = SectorReshapingTool.getAngle(data);\r
    var sweep = SectorReshapingTool.getSweep(data);\r
    var start = new go.Point(radius, 0).rotate(angle);\r
    var geo = new go.Geometry()\r
      .add(\r
        new go.PathFigure(radius + start.x, radius + start.y) // start point\r
          .add(\r
            new go.PathSegment(\r
              go.SegmentType.Arc,\r
              angle, sweep, // angles\r
              radius, radius, radius, radius\r
            )\r
          )\r
          .add(new go.PathSegment(go.SegmentType.Line, radius, radius).close())\r
      )\r
      .add(new go.PathFigure(0, 0)) // make sure the Geometry always includes the whole circle\r
      .add(new go.PathFigure(2 * radius, 2 * radius)); // even if only a small sector is "lit"\r
    return geo;\r
  }\r
\r
  // Desired width=320 endpoint on all links to get closest available width\r
  const camIMGs = [\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/01_01_RIMG0002.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/2000_core-repository02_hg.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/2000_core-repository03_hg.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/2019-06_arolsen_archives_01.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Albert_Schr%C3%B6der_Raum_mit_Aktenschrank.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/AMVB.JPG?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Archiv_hlavn%C3%ADho_m%C4%9Bsta_Prahy%2C_archiv%C3%A1lie.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Archiv_hlavn%C3%ADho_m%C4%9Bsta_Prahy%2C_spisy_okresn%C3%ADho_soudu_Kr%C3%A1lovsk%C3%A9_Vinohrady.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Benutzersaal_des_Evangelischen_Zentralarchivs_in_Berlin.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Stanford%2C_California%2C_United_States_Post_Office%2C_interior%2C_March_2019.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Office_interior_in_Tamil_Nadu.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Centralia%2C_WA_-_main_post_office_interior_04.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chehalis_Post_Office_interior_02.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Peles_Castle_Interior_-_Queens_Office_%281%29.jpg?width=320',\r
    'https://commons.wikimedia.org/wiki/Special:FilePath/Ticket_Office_Interior_-_geograph.org.uk_-_3967333.jpg?width=320'\r
  ]\r
  // link the given node to a new camera feed\r
  function linkCam(node) {\r
    if (!node) return;\r
    if (node.category !== 'camera') return;\r
    const feedDiv = document.getElementById('cameraFeeds');\r
\r
    const div = document.createElement('div');\r
    div.className = 'cameraDiv';\r
    feedDiv.appendChild(div);\r
    node.data._cameraDiv = div; // starts with "_" to prevent the property from being saved in JSON\r
\r
    if (node.data.status === 'Live' && camIMGs[0]) {\r
      const img = document.createElement('img');\r
      div.appendChild(img)\r
      img.src = camIMGs[0];\r
      img.draggable = false;\r
      camIMGs.splice(0,1);\r
      img.style = 'width: 100%; height: 100%; object-fit: cover;';\r
      img.style.userSelect = 'none';\r
    } else {\r
      if (node.data.status === 'Live') { // no more feeds\r
        myDiagram.model.set(node.data, 'status', 'No video feed');\r
      }\r
\r
      const div2 = document.createElement('div');\r
      div2.className = 'innerCamera';\r
      div.appendChild(div2);\r
      const text = document.createElement('p');\r
      text.className = 'cameraLabel';\r
      text.innerHTML = 'NO SIGNAL';\r
      div2.appendChild(text);\r
    }\r
\r
    div.onclick = () => {\r
      myDiagram.select(node);\r
      myDiagram.focus();\r
    };\r
  }\r
\r
  function load() {\r
    // this way the SelectionDeleting event is triggered and the camera feed is correctly cleared\r
    myDiagram.selectCollection(myDiagram.nodes);\r
    myDiagram.commandHandler.deleteSelection();\r
\r
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);\r
  }\r
\r
  function save() {\r
    let text = myDiagram.model.toJson();\r
    document.getElementById("mySavedModel").value = text;\r
    myDiagram.isModified = false;\r
  }\r
\r
  // create an event popup, with log message\r
  function createEvent(node, diaTxt, logTxt) {\r
    // output log\r
    const elem = document.getElementById('outputLog');\r
    elem.value = \`\${new Date().toLocaleString()} \${logTxt}\\r\\n\` + (elem.value || elem.innerText || '');\r
\r
    // add the text animation\r
    const p =\r
      new go.Part('Auto', { pickable: false, layerName: 'Adornment', scale: currentScale })\r
        .add(\r
          new go.Shape('RoundedRectangle', { fill: 'white' }),\r
          new go.TextBlock(diaTxt, { margin: 8 })\r
        );\r
    myDiagram.add(p);\r
\r
    // position for doors, location for cameras\r
    const isDoor = node.data.category === 'door';\r
    const pos2 = (isDoor ? node.position.copy() : node.location.copy());\r
    if (isDoor) {\r
      pos2.x += node.getDocumentBounds().width;\r
    } else {\r
      pos2.y -= 25;\r
    }\r
    pos2.x += 10;\r
    pos2.y -= 20;\r
    const pos1 = pos2.copy();\r
    pos1.y += 40;\r
\r
    const anim3 = new go.Animation();\r
    anim3.easing = go.Animation.EaseOutExpo;\r
    anim3.duration = 2000;\r
    anim3.add(p, (isDoor ? 'position' : 'location'), pos1, pos2);\r
    anim3.finished = () => myDiagram.remove(p);\r
    anim3.start();\r
  }\r
\r
  // open the specified door\r
  const doorTriggers = {}; // map of door nodes to animation count\r
  function openDoor(node) {\r
    if (node.data.category !== 'door') return;\r
    if (doorTriggers[node.key]) return;\r
\r
    const data = node.data;\r
    const door = node.findObject('DOOR');\r
    const randomUserId = 1000 + parseInt(Math.random() * 2500);\r
\r
    // multiple nodes can be modified by a single animation,\r
    // however since each one here has a different duration\r
    // they use separate Animations\r
\r
    // animate door color\r
    const animColor = new go.Animation();\r
    animColor.easing = go.Animation.EaseOutExpo;\r
    animColor.duration = 1350;\r
    animColor.add(door, 'fill', door.fill, 'rgb(255,0,0)');\r
\r
    // animate door opening\r
    const anim = new go.Animation();\r
    const originalWidth =  door.width;\r
    anim.add(door, 'width', door.width, Math.max(0, door.width * 0.2 - door.strokeWidth));\r
    anim.easing = go.Animation.EaseOutExpo;\r
    anim.duration = 1000;\r
    anim.finished = () => {\r
      // reset color\r
      const animColor2 = new go.Animation();\r
      animColor2.easing = go.Animation.EaseOutExpo;\r
      animColor2.duration = 1350;\r
      animColor2.add(door, 'fill', 'rgb(255,0,0)', 'rgb(0,255,0)');\r
\r
      // close door\r
      const anim2 = new go.Animation();\r
      anim2.add(door, 'width', door.width, originalWidth);\r
      anim2.easing = go.Animation.EaseOutExpo;\r
      anim2.duration = 500;\r
      anim2.finished = () => { doorTriggers[node.key] = false; }\r
\r
      anim2.start();\r
      animColor2.start();\r
    };\r
    doorTriggers[node.key] = true;\r
\r
    // diagram text popup and event log\r
    createEvent(node, \`Opened by USER \${randomUserId}\`, \`USER \${randomUserId} opened \${data.key}\`);\r
\r
    anim.start();\r
    animColor.start();\r
  }\r
\r
  // open the specified camera\r
  const cameraTriggers = {} // map of camera nodes to how many times they have been triggered\r
  triggerCamera = function (node) {\r
    if (node?.data?.category !== 'camera') return;\r
    if (node.data.status !== 'Live') return; // don't animate "broken" cameras\r
\r
    const data = node.data;\r
    const light = node.findObject('ARC');\r
\r
    // animations\r
\r
    // animate door color\r
    const animColor = new go.Animation();\r
    animColor.easing = go.Animation.EaseOutExpo;\r
    animColor.duration = 750;\r
    animColor.add(light, 'fill', light.fill, 'rgb(255,255,0)');\r
\r
    animColor.finished = () => {\r
      cameraTriggers[node]--;\r
      if (cameraTriggers[node]) return;\r
\r
      setTimeout(() => {\r
        const animColor2 = new go.Animation();\r
        // reset color\r
        animColor2.easing = go.Animation.EaseOutExpo;\r
        animColor2.duration = animColor.duration * 1.2;\r
        animColor2.add(light, 'fill', light.fill, myDiagram.nodeTemplateMap.get('camera').findObject('ARC').fill);\r
        animColor2.start();\r
      }, 250); // let the camera stay yellow before changing back\r
    };\r
    if (isNaN(cameraTriggers[node])) cameraTriggers[node] = 1;\r
    else cameraTriggers[node]++;\r
\r
    // diagram text popup and event log\r
    createEvent(node, \`Motion detected\`, \`MOTION on cam \${[... document.getElementById('cameraFeeds').children].indexOf(node.data._cameraDiv) + 1}\`);\r
\r
    animColor.start();\r
  }\r
\r
  // emit random events\r
  let _timeout = null;\r
  let _prevNode = null;\r
  function toggleEvents() {\r
    if (!_timeout) { // start\r
      const doEvent = () => {\r
        // pick a random door/camera\r
        let pickRand = () => [... myDiagram.nodes][parseInt(Math.random() * myDiagram.nodes.count)];\r
        let node = pickRand();\r
        // reduce chance of picking the same node twice in a row\r
        if (node === _prevNode) node = pickRand();\r
        _prevNode = node;\r
\r
        if (node.category === 'door') {\r
          openDoor(node);\r
        } else {\r
          triggerCamera(node);\r
        }\r
        // call this function again after a random amount of time\r
        _timeout = setTimeout(() => {\r
          doEvent();\r
        }, 600 + Math.random()*1150);\r
      }\r
      doEvent();\r
    } else { // stop\r
      clearInterval(_timeout);\r
      _timeout = null;\r
    }\r
  }`,cssCode:`.cameraDiv {\r
    float: left;\r
    border: 4px solid;\r
    border-color: rgba(0,0,0,0);\r
    aspect-ratio: 16 / 9;\r
  }\r
\r
  .innerCamera {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(64,64,64);\r
  }\r
\r
  .cameraLabel {\r
    user-select: none;\r
    margin: 0;\r
    color: white;\r
  }`,externalStyles:[],externalScripts:[`../extensions/SectorReshapingTool.js`],descriptionHtml:`<p>\r
    This sample demonstrates a security dashboard built with GoJS. <a>Node</a>s are used to represent the doors and\r
    cameras. When hovering over the camera a <a>Tooltip</a> will show its status. You can make new cameras\r
    by dragging one into the <a>Diagram</a> from the <a>Palette</a>. Then it can be rotated, resized, and have the field\r
    of view changed using the <a href="../samples/SectorReshaping">Sector Reshaping Tool</a>.\r
  </p>\r
  <p>\r
    This sample simulates doors opening and cameras detecting motion. This information is conveyed via <a>Animation</a>s in the\r
    Diagram and an "Event Log" in the HTML below.\r
  </p>\r
  <p>\r
    Because of this sample's complexity, it is meant for a demonstration of several GoJS features, rather than a starting point for your own project.\r
    We are happy to help you begin a proof-of-concept for your own project if you have similar needs.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`animation`,`geometries`,`monitoring`,`palette`,`tooltips`,`scada`];var g=y();l(`15hfq0z`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};