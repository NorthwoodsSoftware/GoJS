import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Constant Size Nodes While Zooming in or out`,indexDescription:`Kitten Monitor with constant size markers and tooltips when zooming out.`,screenshot:`kittenmonitor`,priority:2,tags:[`tooltips`,`monitoring`],description:`A variation of a monitoring diagram where the objects of interest maintain a constant size while the user zooms in and out on the map.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
    const TIME_STEP = 2000;\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialContentAlignment: go.Spot.TopLeft,\r
      isReadOnly: true, // allow selection but not moving or copying or deleting\r
      'toolManager.hoverDelay': 100, // how quickly tooltips are shown\r
      'toolManager.mouseWheelBehavior': go.WheelMode.Zoom // mouse wheel zooms instead of scrolls\r
    });\r
\r
    // the background image, a floor plan\r
    myDiagram.add(\r
      new go.Part({ // this Part is not bound to any model data\r
          width: 840,\r
          height: 570,\r
          layerName: 'Background',\r
          position: new go.Point(0, 0),\r
          selectable: false,\r
          pickable: false\r
        })\r
        .add(\r
          new go.Picture('https://upload.wikimedia.org/wikipedia/commons/9/9a/Sample_Floorplan.jpg')\r
        )\r
    );\r
\r
    // the template for each kitten, for now just a colored circle\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          locationSpot: go.Spot.Center,\r
\r
          // this tooltip shows the name and picture of the kitten\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.Panel('Vertical')\r
                  .add(\r
                    new go.Picture()\r
                      .bind('source', 'src', s => 'images/' + s + '.png'),\r
                    new go.TextBlock({ margin: 3 })\r
                      .bind('text', 'key')\r
                  )\r
              ) // end Adornment\r
        }) // at center of node\r
        .bind('location', 'loc') // specified by data\r
        .trigger('location', { duration: TIME_STEP, easing: go.Animation.EaseLinear })\r
        .add(\r
          new go.Shape('Circle', { width: 12, height: 12, stroke: null })\r
            .bind('fill', 'color') // also specified by data\r
        );\r
\r
    // pretend there are four kittens\r
    myDiagram.model.nodeDataArray = [\r
      { key: 'Alonzo', src: '50x40', loc: new go.Point(220, 130), color: 'blue' },\r
      { key: 'Coricopat', src: '55x55', loc: new go.Point(420, 250), color: 'green' },\r
      { key: 'Garfield', src: '60x90', loc: new go.Point(640, 450), color: 'red' },\r
      { key: 'Demeter', src: '80x50', loc: new go.Point(140, 350), color: 'purple' }\r
    ];\r
\r
    // This code keeps all nodes at a constant size in the viewport,\r
    // by adjusting for any scaling done by zooming in or out.\r
    // This code ignores simple Parts;\r
    // Links will automatically be rerouted as Nodes change size.\r
    var origscale = NaN;\r
    myDiagram.addDiagramListener('InitialLayoutCompleted', e => origscale = myDiagram.scale);\r
    myDiagram.addDiagramListener('ViewportBoundsChanged', e => {\r
      if (isNaN(origscale)) return;\r
      var newscale = myDiagram.scale;\r
      if (e.subject.scale === newscale) return; // optimization: don't scale Nodes when just scrolling/panning\r
      myDiagram.skipsUndoManager = true;\r
      myDiagram.startTransaction('scale Nodes');\r
      myDiagram.nodes.each(node => {\r
        node.scale = origscale / newscale;\r
      });\r
      myDiagram.commitTransaction('scale Nodes');\r
      myDiagram.skipsUndoManager = false;\r
    });\r
\r
    // simulate some real-time position monitoring, once every 2 seconds\r
    function randomMovement() {\r
      var model = myDiagram.model;\r
      model.startTransaction('update locations');\r
      var arr = model.nodeDataArray;\r
      var picture = myDiagram.parts.first();\r
      for (var i = 0; i < arr.length; i++) {\r
        var data = arr[i];\r
        var pt = data.loc;\r
        var x = pt.x + 20 * Math.random() - 10;\r
        var y = pt.y + 20 * Math.random() - 10;\r
        // make sure the kittens stay inside the house\r
        var b = picture.actualBounds;\r
        if (x < b.x || x > b.right) x = pt.x;\r
        if (y < b.y || y > b.bottom) y = pt.y;\r
        model.set(data, 'loc', new go.Point(x, y));\r
      }\r
      model.commitTransaction('update locations');\r
    }\r
    function loop() {\r
      setTimeout(() => {\r
        randomMovement();\r
        loop();\r
      }, TIME_STEP);\r
    }\r
    loop(); // start the simulation\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This diagram displays a monitored floor plan with several nodes\r
    (representing kittens) to view in real-time. Every two seconds the <a>Part.location</a>\r
    of the kittens is updated. The location has a linear <a>AnimationTrigger</a>\r
    so that the motion appears smooth.\r
  </p>\r
  <p>The <a href="../intro/tooltips">Tooltip</a> for each kitten shows its name and photo.</p>\r
  <p>\r
    When you zoom in or out the effective size of each Node is kept constant by changing its\r
    <a>GraphObject.scale</a>.\r
  </p>\r
  <p>\r
    See <a href="./#monitoring">monitoring samples</a> for more samples like this.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tooltips`,`monitoring`];var g=y();l(`vcpryq`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};