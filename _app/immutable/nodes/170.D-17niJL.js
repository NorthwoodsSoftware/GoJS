import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Kitten Monitor Using Background Image`,titleShort:`Monitor with Background`,indexDescription:`A monitoring diagram where the nodes (kittens) move on a background image (a house plan), with
tooltips describing kittens.`,screenshot:`kittenmonitor`,priority:3,tags:[`tooltips`,`monitoring`,`animation`],description:`A visual monitor of the position of kittens in a house.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
  const INTERVAL = 2000; // this constant parameter cannot be set later\r
\r
  myDiagram = new go.Diagram('myDiagramDiv', {\r
    initialContentAlignment: go.Spot.TopLeft,\r
    isReadOnly: true, // allow selection but not moving or copying or deleting\r
    scaleComputation: (d, newsc) => {\r
      // only allow scales that are a multiple of 0.1\r
      var oldsc = Math.round(d.scale * 10);\r
      var sc = oldsc + (newsc * 10 > oldsc ? 1 : -1);\r
      if (sc < 1) sc = 1; // but disallow zero or negative!\r
      return sc / 10;\r
    },\r
    'toolManager.hoverDelay': 100 // how quickly tooltips are shown\r
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
    new go.Node({ locationSpot: go.Spot.Center })\r
      .bind('location', 'loc') // specified by data\r
      .add(\r
        new go.Shape('Circle', {\r
            width: 15, height: 15,\r
            strokeWidth: 3,\r
            // this tooltip shows the name and picture of the kitten\r
            toolTip:\r
              go.GraphObject.build('ToolTip')\r
                .add(\r
                  new go.Panel('Vertical')\r
                    .add(\r
                      new go.Picture({ margin: 3 })\r
                        .bind('source', 'src', s => 'images/' + s + '.png'),\r
                      new go.TextBlock({ margin: 3 })\r
                        .bind('text', 'key')\r
                    )\r
                )\r
          })\r
          .bind('fill', 'color', makeFill)\r
          .bind('stroke', 'color', makeStroke)\r
      );\r
\r
  if (INTERVAL > 20) {  // don't animate if INTERVAL is <= 20 milliseconds\r
    myDiagram.nodeTemplate.trigger('position', { duration: INTERVAL, easing: go.Animation.EaseLinear })\r
  };\r
\r
\r
  // pretend there are four kittens\r
  myDiagram.model.nodeDataArray = [\r
    { key: 'Alonzo', src: '50x40', loc: new go.Point(220, 130), color: 2 },\r
    { key: 'Coricopat', src: '55x55', loc: new go.Point(420, 250), color: 4 },\r
    { key: 'Garfield', src: '60x90', loc: new go.Point(640, 450), color: 6 },\r
    { key: 'Demeter', src: '80x50', loc: new go.Point(140, 350), color: 8 }\r
  ];\r
\r
  // simulate some real-time position monitoring, once every INTERVAL milliseconds\r
  function randomMovement() {\r
    var model = myDiagram.model;\r
    model.startTransaction('update locations');\r
    var arr = model.nodeDataArray;\r
    var picture = myDiagram.parts.first();\r
    for (var i = 0; i < arr.length; i++) {\r
      var data = arr[i];\r
      // determine the new random location\r
      var pt = data.loc;\r
      var x = pt.x + 25 * (Math.random() - 0.5);\r
      var y = pt.y + 25 * (Math.random() - 0.5);\r
      // make sure the kittens stay inside the house\r
      var b = picture.actualBounds;\r
      if (x < b.x + 40 || x > b.right - 80) x = pt.x;\r
      if (y < b.y + 40 || y > b.bottom - 40) y = pt.y;\r
      model.set(data, 'loc', new go.Point(x, y));\r
    }\r
    model.commitTransaction('update locations');\r
  }\r
  function loop() {\r
    setTimeout(() => {\r
      randomMovement();\r
      loop();\r
    }, INTERVAL);\r
  }\r
  loop(); // start the simulation\r
\r
  // generate some colors based on hue value\r
  function makeFill(number) {\r
    return HSVtoRGB(0.1 * number, 0.5, 0.7);\r
  }\r
  function makeStroke(number) {\r
    return HSVtoRGB(0.1 * number, 0.5, 0.5); // same color but darker (less V in HSV)\r
  }\r
  function HSVtoRGB(h, s, v) {\r
    var r, g, b, i, f, p, q, t;\r
    i = Math.floor(h * 6);\r
    f = h * 6 - i;\r
    p = v * (1 - s);\r
    q = v * (1 - f * s);\r
    t = v * (1 - (1 - f) * s);\r
    switch (i % 6) {\r
      case 0:\r
        (r = v), (g = t), (b = p);\r
        break;\r
      case 1:\r
        (r = q), (g = v), (b = p);\r
        break;\r
      case 2:\r
        (r = p), (g = v), (b = t);\r
        break;\r
      case 3:\r
        (r = p), (g = q), (b = v);\r
        break;\r
      case 4:\r
        (r = t), (g = p), (b = v);\r
        break;\r
      case 5:\r
        (r = v), (g = p), (b = q);\r
        break;\r
    }\r
    return 'rgb(' + Math.floor(r * 255) + ',' + Math.floor(g * 255) + ',' + Math.floor(b * 255) + ')';\r
  }\r
}\r
window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This diagram displays a monitored floor plan with several nodes (representing kittens) to view in real-time.</p>\r
  <p>Every two seconds the kitten positions are updated</p>\r
  <p>The <a href="../intro/tooltips">tooltip</a> for each kitten shows its name and photo.</p>\r
  <p>There is a custom <a>Diagram.scaleComputation</a> that limits the <a>Diagram.scale</a> values to multiples of 0.1.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tooltips`,`monitoring`,`animation`];var g=y();l(`r69c4w`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};