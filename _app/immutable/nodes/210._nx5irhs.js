import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Path Finder Animation of Nodes along AvoidsNodes Routed Paths`,titleShort:`Path Finder`,indexDescription:`GoJS diagram demonstrating the versatility of the available tools. Using the avoid nodes link router to give nodes path finding for navigating through a house with fluid movements from animations.`,screenshot:`pathfinder`,priority:1.5,tags:[`animation`,`links`,`monitoring`],description:`GoJS diagram demonstrating the versatility of the available tools. Using the avoid nodes link router to give nodes path finding for navigating through a house with fluid movements from animations.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 720px"></div>\r
  <div style="margin-block: .5em;">\r
    <button onclick="toggleBounds(this)">Toggle Boundaries</button>\r
    <button onclick="toggleActivities(this)">Toggle Activities</button>\r
    <button onclick="toggleLinks(this)">Toggle Links</button>\r
  </div>`,jsCode:`class Person {\r
    static #nPeople = 0;\r
    static activites = [];\r
\r
    #activity = null;\r
    #prevActivity = null;\r
\r
    speed = 75 + Math.random() * 50; // document units per seconds\r
    dia = null;\r
    number = -1;\r
    data = {};\r
    node = null;\r
\r
    constructor(diagram, color) {\r
      this.dia = diagram;\r
      this.number = Person.#nPeople++;\r
      this.data = {\r
        key: 'person' + this.number,\r
        color: color,\r
        // loc: new go.Point(500, 300), // inside "Formal Living"\r
        loc: new go.Point(415 + Math.random() * 10 - 5, 630 + Math.random() * 10 - 5) // under the front door\r
      };\r
\r
      this.dia.model.addNodeData(this.data);\r
      this.node = this.dia.findNodeForKey(this.data.key);\r
\r
      let _loop = act => {\r
        this.doActivity(_loop);\r
        // if (act) console.log('finished ' + act.name);\r
      };\r
\r
      // pause for a moment before starting the loop\r
      setTimeout(() => {\r
        _loop();\r
      }, 750);\r
      // this.doActivity(act => console.log('done ' + act.name));\r
    }\r
\r
    // used for debugging\r
    // str=activity name, idx=if multiple results which to look at, default 0\r
    static findActivityForString(str, idx) {\r
      str = str.toLowerCase();\r
      return Person.activites.filter(act => act.name.toLowerCase() == str)[idx || 0];\r
    }\r
\r
    // do specified activity, or a random one if none are specified\r
    doActivity(onComplete, activity, idx) {\r
      // get the activity, specified by string or activity object, otherwise pick a random one\r
      const act =\r
        (typeof activity == 'string' ? Person.findActivityForString(activity, idx) : activity) ||\r
        this.pickRandomActivity();\r
\r
      const toNodeData = {\r
        key: 'to' + this.number,\r
        color: null,\r
        loc: act.loc,\r
        avoidable: true\r
      };\r
      const fromNodeData = {\r
        key: 'from' + this.number,\r
        color: null,\r
        loc: this.node.location,\r
        avoidable: true\r
      };\r
\r
      const linkData = {\r
        from: fromNodeData.key,\r
        to: toNodeData.key\r
      };\r
\r
      // remove the old nodes if they are still present\r
      if (this.dia.findNodeForKey(toNodeData.key)) {\r
        const pre_existing = this.dia.findNodeForKey(toNodeData.key);\r
        this.dia.remove(pre_existing);\r
        const pre_existing2 = this.dia.findNodeForKey(fromNodeData.key);\r
        this.dia.remove(pre_existing2);\r
      }\r
\r
      const dir_dict = {\r
        LEFT: go.Spot.Left,\r
        RIGHT: go.Spot.Right,\r
        UP: go.Spot.Top,\r
        DOWN: go.Spot.Bottom\r
      };\r
\r
      this.dia.model.addNodeData(toNodeData);\r
      this.dia.model.addNodeData(fromNodeData);\r
\r
      // set toSpot and fromSpot so people go the correct direction more often\r
      this.dia.findNodeForKey(toNodeData.key).toSpot = dir_dict[act.dir];\r
      if (this.#prevActivity) {\r
        this.dia.findNodeForKey(fromNodeData.key).fromSpot = dir_dict[this.#prevActivity.dir];\r
      }\r
\r
      // create a link between hidden nodes at the current position and end position\r
      this.dia.model.addLinkData(linkData);\r
\r
      const link = this.dia.findLinkForData(linkData);\r
\r
      // follow the points in the link\r
      let points;\r
      const nextStep = i => {\r
        if (i >= points.length) {\r
          // once we reach the final point remove the hidden nodes\r
          const toNode = this.dia.findNodeForKey(toNodeData.key);\r
          this.dia.remove(toNode);\r
          const fromNode = this.dia.findNodeForKey(fromNodeData.key);\r
          this.dia.remove(fromNode);\r
\r
          // "do" the activity (wait specified time)\r
          setTimeout(\r
            () => {\r
              this.completeActivity();\r
              if (onComplete) onComplete(this.#prevActivity); // call the callback function if one is supplied\r
            },\r
            this.#activity.time * 1000 * 0.4 * (Math.random() + 0.5)\r
          );\r
          return;\r
        }\r
\r
        // animate the motion between link points\r
        const anim = new go.Animation();\r
        anim.add(this.node, 'location', this.node.location, points[i]);\r
        anim.easing = go.Animation.EaseLinear;\r
        let dur =\r
          (Math.sqrt(this.node.location.distanceSquaredPoint(points[i])) / this.speed) * 1000;\r
        anim.duration = dur >= 1 ? dur : 1;\r
        anim.finished = () => nextStep(++i);\r
        anim.start();\r
      };\r
\r
      // this makes sure the router finished before looking at the link points\r
      window.requestAnimationFrame(() => {\r
        points = [...link.points.iterator];\r
        points.push(toNodeData.loc);\r
        nextStep(0);\r
      });\r
    }\r
\r
    pickRandomActivity() {\r
      let act = null;\r
      do {\r
        act = Person.activites[parseInt(Math.random() * Person.activites.length)];\r
      } while (!act.isOpen || this.#prevActivity == act || this.#prevActivity?.name == act?.name);\r
\r
      this.#activity = act;\r
      this.#activity.isOpen = false;\r
      return this.#activity;\r
    }\r
\r
    completeActivity() {\r
      this.#activity.isOpen = true;\r
      this.#prevActivity = this.#activity;\r
      this.#activity = null;\r
    }\r
  }\r
\r
  const houseBounds = [\r
    // main house bounds\r
    { angle: 0, x: 540, y: 110, width: 250, height: 30 },\r
    { angle: 0, x: 760, y: 130, width: 30, height: 430 },\r
    { angle: 0, x: 20, y: 540, width: 370, height: 20 },\r
    { angle: 0, x: 20, y: 120, width: 20, height: 420 },\r
    { angle: 0, x: 20, y: 80, width: 80, height: 50 },\r
    { angle: 0, x: 270, y: 90, width: 270, height: 80 },\r
    { angle: 0, x: 130, y: 10, width: 110, height: 30 },\r
    { angle: 53, x: 245, y: 2, width: 110, height: 30 },\r
    { angle: 303, x: 70, y: 90, width: 100, height: 30 },\r
    { angle: 0, x: 290, y: 170, width: 10, height: 240 },\r
    { angle: 0, x: 300, y: 360, width: 30, height: 10 },\r
    { angle: 0, x: 370, y: 360, width: 200, height: 10 },\r
    { angle: 0, x: 610, y: 360, width: 160, height: 10 },\r
    { angle: 0, x: 530, y: 370, width: 10, height: 170 },\r
    { angle: 0, x: 290, y: 440, width: 10, height: 100 },\r
    { angle: 0, x: 230, y: 440, width: 60, height: 10 },\r
    { angle: 0, x: 150, y: 440, width: 50, height: 10 },\r
    { angle: 0, x: 150, y: 450, width: 10, height: 90 },\r
    { angle: 0, x: 170, y: 340, width: 10, height: 60 },\r
    { angle: 0, x: 40, y: 340, width: 130, height: 10 },\r
    { angle: 0, x: 40, y: 300, width: 170, height: 10 },\r
    { angle: 0, x: 250, y: 300, width: 40, height: 10 },\r
    { angle: 0, x: 170, y: 430, width: 10, height: 11 },\r
    { angle: 0, x: 440, y: 540, width: 320, height: 20 },\r
    { angle: 0, x: 130, y: 170, width: 40, height: 130 },\r
\r
    // chairs\r
    { angle: 0, x: 570, y: 200, width: 10, height: 60 },\r
\r
    // tables\r
    { angle: 0, x: 350, y: 240, width: 80, height: 40 },\r
    { angle: 0, x: 630, y: 210, width: 40, height: 40 },\r
    { angle: 0, x: 160, y: 80, width: 50, height: 50 },\r
\r
    // activites\r
    {"angle":0,"x":163.66663074493408,"y":507.3333282470703,"width":10,"height":10,"data":{"type":"interactable","name":"toilet","time":15,"dir":"RIGHT"}},{"angle":0,"x":78.33332538604736,"y":323.3333282470703,"width":10,"height":10,"data":{"type":"interactable","name":"pantry","time":3,"dir":"RIGHT"}},{"angle":0,"x":256.20492238352756,"y":501.9566044981982,"width":10,"height":10,"data":{"type":"interactable","name":"sink","time":5,"dir":"LEFT"}},{"angle":0,"x":79.40614297593106,"y":511.17083706622554,"width":10,"height":10,"data":{"type":"interactable","name":"washer","time":15,"dir":"UP"}},{"angle":0,"x":52.915132075042955,"y":510.5949804835129,"width":10,"height":10,"data":{"type":"interactable","name":"dryer","time":15,"dir":"UP"}},{"angle":0,"x":63.857079383480226,"y":240.50174043451716,"width":10,"height":10,"data":{"type":"interactable","name":"oven","time":10,"dir":"RIGHT"}},{"angle":0,"x":632.3606159295472,"y":460.8227113576087,"width":10,"height":10,"data":{"type":"interactable","name":"chair","time":30,"dir":"LEFT"}},{"angle":0,"x":633.5123818194348,"y":506.31817578842066,"width":10,"height":10,"data":{"type":"interactable","name":"chair","time":30,"dir":"LEFT"}},{"angle":0,"x":583.4098011046093,"y":236.65353268663625,"width":10,"height":10,"data":{"type":"interactable","name":"chair","time":30,"dir":"RIGHT"}},{"angle":0,"x":583.0509459583972,"y":213.7596303763082,"width":10,"height":10,"data":{"type":"interactable","name":"chair","time":30,"dir":"RIGHT"}},{"angle":0,"x":629.5424521622729,"y":163.2627625730647,"width":10,"height":10,"data":{"type":"interactable","name":"chair","time":30,"dir":"DOWN"}},{"angle":0,"x":653.5933070668215,"y":162.62140154911776,"width":10,"height":10,"data":{"type":"interactable","name":"chair","time":30,"dir":"DOWN"}},{"angle":0,"x":62.13561526324199,"y":188.17259680012856,"width":10,"height":10,"data":{"type":"interactable","name":"sink","time":8,"dir":"RIGHT"}}\r
\r
  ];\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': true\r
    });\r
\r
    // Create the Diagram's Model:\r
    myDiagram.model = new go.GraphLinksModel([], []);\r
    myDiagram.model.modelData = {\r
      isLinkVisible: false,\r
      isActivityVisible: false,\r
      isBoundaryVisible: false\r
    };\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.AvoidsNodes, // this is what performs the "path finding"\r
          pickable: false,\r
          layername: 'Background'\r
        })\r
        .add(\r
          new go.Shape({\r
              name: 'SHAPE',\r
              strokeWidth: 2,\r
              strokeDashArray: [10, 6]\r
            })\r
            .bindObject('stroke', 'fromNode', fromNode => // make the link the same color as the person\r
              myDiagram.findNodeForKey('person' + fromNode.key.slice(4)).data.color\r
            )\r
            .bindModel('opacity', 'isLinkVisible', isVisible => isVisible ? 1 : 0)\r
        );\r
\r
    // the background image, a floor plan\r
    myDiagram.add(\r
      new go.Part({\r
          // this Part is not bound to any model data\r
          width: 840,\r
          height: 570,\r
          layerName: 'Background',\r
          position: new go.Point(0, 0),\r
          selectable: false,\r
          pickable: false,\r
          avoidable: false\r
        })\r
        .add(\r
          new go.Picture('https://upload.wikimedia.org/wikipedia/commons/9/9a/Sample_Floorplan.jpg')\r
        )\r
    );\r
\r
    // the Node representation of an activity\r
    myDiagram.nodeTemplateMap.add('activity',\r
      new go.Node({\r
          layerName: 'Background',\r
          pickable: false,\r
          avoidable: false\r
        })\r
        .bind('location')\r
        .bind('angle')\r
        .add(\r
          new go.Shape({\r
              strokeWidth: 0,\r
              fill: 'blue'\r
            })\r
            .bindModel('opacity', 'isActivityVisible', isVisible => isVisible ? 0.5 : 0)\r
            .bind('width')\r
            .bind('height')\r
        )\r
    );\r
\r
    // the Node representation of a boundary\r
    myDiagram.nodeTemplateMap.add('bound',\r
      new go.Node({\r
          layerName: 'Background',\r
          pickable: false,\r
          avoidable: true\r
        })\r
        .bind('location')\r
        .bind('angle')\r
        .add(\r
          new go.Shape({\r
              strokeWidth: 0,\r
              fill: 'black'\r
            })\r
            .bindModel('opacity', 'isBoundaryVisible', isVisible => isVisible ? 0.5 : 0)\r
            .bind('width')\r
            .bind('height')\r
        )\r
    );\r
\r
    // load all of the activites and boundaries\r
    houseBounds.forEach(b => {\r
      let nodeData = {\r
        width: b.width,\r
        height: b.height,\r
        location: new go.Point(b.x, b.y),\r
        angle: b.angle,\r
        category: b.data?.type == 'interactable' ? 'activity' : 'bound'\r
      };\r
\r
      if (b.data?.type == 'interactable') {\r
        Person.activites.push(\r
          Object.assign(\r
            {\r
              isOpen: true,\r
              loc: new go.Point(b.x + b.width / 2, b.y + b.height / 2)\r
            },\r
            b.data\r
          )\r
        );\r
      }\r
\r
      myDiagram.model.addNodeData(nodeData);\r
    });\r
\r
    // default template for people\r
    myDiagram.nodeTemplateMap.add('',\r
      new go.Node({\r
          locationSpot: go.Spot.Center,\r
          avoidable: false,\r
          layerName: 'Foreground'\r
        })\r
        .bindTwoWay('location', 'loc')\r
        .bind('avoidable')\r
        .bind('fromSpot')\r
        .bind('toSpot')\r
        .add(\r
          new go.Shape('Ellipse', {\r
              width: 18,\r
              height: 18,\r
              strokeWidth: 2\r
            })\r
            .bind('fill', 'color')\r
            .bind('stroke', 'color', c => {\r
              if (!c || c == 'rgba(0,0,0,0)') return null;\r
              const br = typeof c == 'string' ? new go.Brush(c) : c;\r
              br.isDark() ? br.lightenBy(0.3) : br.darkenBy(0.2);\r
              return br;\r
            })\r
        )\r
    );\r
\r
    ['red', 'green', 'blue', 'pink', 'lightgreen', 'lightblue'].forEach(c => {\r
      new Person(myDiagram, c);\r
    });\r
  }\r
  document.addEventListener('DOMContentLoaded', init);\r
\r
  function toggleButton(elem, isSelected) {\r
    elem.style.filter = isSelected ? 'brightness(180%)' : '';\r
  }\r
\r
  function toggleBounds(elem) {\r
    isVisible = !myDiagram.model.modelData.isBoundaryVisible;\r
    toggleButton(elem, isVisible);\r
    myDiagram.model.set(myDiagram.model.modelData, 'isBoundaryVisible', isVisible);\r
  }\r
\r
  function toggleActivities(elem) {\r
    isVisible = !myDiagram.model.modelData.isActivityVisible;\r
    toggleButton(elem, isVisible);\r
    myDiagram.model.set(myDiagram.model.modelData, 'isActivityVisible', isVisible);\r
  }\r
\r
  function toggleLinks(elem) {\r
    isVisible = !myDiagram.model.modelData.isLinkVisible;\r
    toggleButton(elem, isVisible);\r
    myDiagram.model.set(myDiagram.model.modelData, 'isLinkVisible', isVisible);\r
  }`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample uses the <a>Routing.AvoidsNodes</a> as a form of rudimentary path finding with\r
    hidden <a>Link</a>s and <a>Node</a>s to move simulated people around a house. Each person will\r
    pick a random unique activity and then add a new <a>Link</a> to the diagram between them and the\r
    activity. Then the <a>Node</a> representing the person has their location changed to each point\r
    in <a>Link.Points</a>, this change uses an <a>Animation</a> with the easing function\r
    <a>Animation.EaseLinear</a> to appear like constant fluid motion.\r
  </p>\r
  <p>\r
    Each activity also has a direction associated with it. So when a <a>Link</a> is created between\r
    two <a>Node</a>s they will have their <a>GraphObject.toSpot</a> and\r
    <a>GraphObject.fromSpot</a> properties set so that the <a>Link</a> will go in the correct\r
    direction. This is important for the chairs so that people always get in and out of them without\r
    going through the back of the chair. This also helps with small spaces like the pantry.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`animation`,`links`,`monitoring`];var g=y();l(`1hnsce4`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};