import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Instrument Gauge Using Graduated Panel`,titleShort:`Instrument Gauges`,indexDescription:`A gauge using a scale made with a Graduated Panel.`,screenshot:`instrumentgauge`,priority:2,tags:[`gauges`,`geometries`],description:`An instrument gauge implemented in GoJS using a Graduated Panel.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 350px"></div>`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv');\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto')\r
        .add(\r
          new go.Shape('Circle', {\r
              stroke: 'orange',\r
              strokeWidth: 5,\r
              spot1: go.Spot.TopLeft,\r
              spot2: go.Spot.BottomRight\r
            })\r
            .bind('stroke', 'color'),\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Panel('Graduated', {\r
                  name: 'SCALE',\r
                  margin: 14,\r
                  graduatedTickUnit: 2.5, // tick marks at each multiple of 2.5\r
                  graduatedMax: 100, // this is actually the default value\r
                  stretch: go.Stretch.None // needed to avoid unnecessary re-measuring!!!\r
                })\r
                .bind('graduatedMax', 'max') // controls the range of the gauge\r
                .add(\r
                  // the main path of the graduated panel, an arc starting at 135 degrees and sweeping for 270 degrees\r
                  new go.Shape({\r
                    name: 'SHAPE',\r
                    geometryString: 'M-70.7107 70.7107 B135 270 0 0 100 100 M0 100',\r
                    stroke: 'white',\r
                    strokeWidth: 4\r
                  }),\r
                  // three differently sized tick marks\r
                  new go.Shape({\r
                    geometryString: 'M0 0 V10',\r
                    stroke: 'white',\r
                    strokeWidth: 1.5\r
                  }),\r
                  new go.Shape({\r
                    geometryString: 'M0 0 V12',\r
                    stroke: 'white',\r
                    strokeWidth: 2.5,\r
                    interval: 2\r
                  }),\r
                  new go.Shape({\r
                    geometryString: 'M0 0 V15',\r
                    stroke: 'white',\r
                    strokeWidth: 3.5,\r
                    interval: 4\r
                  }),\r
                  new go.TextBlock({\r
                    // each tick label\r
                    interval: 4,\r
                    alignmentFocus: go.Spot.Center,\r
                    font: 'bold italic 14pt sans-serif',\r
                    stroke: 'white',\r
                    segmentOffset: new go.Point(0, 30)\r
                  })\r
                ),\r
              new go.TextBlock({\r
                  alignment: new go.Spot(0.5, 0.9),\r
                  stroke: 'orange',\r
                  font: 'bold italic 14pt sans-serif'\r
                })\r
                .bind('text')\r
                .bind('stroke', 'color'),\r
              new go.Shape({\r
                  fill: 'red',\r
                  strokeWidth: 0,\r
                  geometryString: 'F1 M-6 0 L0 -6 100 0 0 6z x M-100 0'\r
                })\r
                .bind('angle', 'value', convertValueToAngle),\r
              new go.Shape('Circle', { width: 2, height: 2, fill: '#444' })\r
            )\r
        );\r
\r
    // this determines the angle of the needle, based on the data.value argument\r
    function convertValueToAngle(v, shape) {\r
      var scale = shape.part.findObject('SCALE');\r
      var p = scale.graduatedPointForValue(v);\r
      var shape = shape.part.findObject('SHAPE');\r
      var c = shape.actualBounds.center;\r
      return c.directionPoint(p);\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', value: 35 },\r
        { key: 2, text: 'Beta', color: 'green', max: 140, value: 70 }\r
      ],\r
      [{ from: 1, to: 2 }]\r
    );\r
\r
    loop();\r
  }\r
\r
  // change each gauge's value several times a second\r
  function loop() {\r
    setTimeout(() => {\r
      myDiagram.startTransaction();\r
      myDiagram.nodes.each(node => {\r
        var scale = node.findObject('SCALE');\r
        if (scale === null || scale.type !== go.Panel.Graduated) return;\r
        // keep the new value within the range of the graduated panel\r
        var min = scale.graduatedMin;\r
        var max = scale.graduatedMax;\r
        var v = node.data.value;\r
        if (v === undefined) v = Math.floor((max - min) / 2); // default to middle value\r
        if (v < min) v++;\r
        else if (v > max) v--;\r
        else v += Math.random() < 0.5 ? -0.5 : 0.5; // random walk\r
        myDiagram.model.set(node.data, 'value', v);\r
      });\r
      myDiagram.commitTransaction('modified Graduated Panel');\r
      loop();\r
    }, 1000 / 6);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This makes use of a <a href="../intro/graduatedPanels">"Graduated"</a> <a>Panel</a>, which holds the main path of the scale, a Shape whose\r
    <a>Shape.geometry</a> is a circular arc. In addition that Graduated Panel holds three different Shapes acting as templates for tick marks and a TextBlock\r
    acting as a template for tick labels.\r
  </p>\r
  <p>\r
    In a Spot Panel with the Graduated Panel scale are an italic TextBlock showing the node identifier and a red elongated diamond "needle" Shape. The needle's\r
    angle is determined by <code>convertValueToAngle</code>, which finds the point on the Graduated Panel's main path element corresponding to\r
    <code>data.value</code> and computes the angle from the center to that point. The data value is updated several times per second. A circle Shape surrounds\r
    the Spot Panel.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`gauges`,`geometries`];var g=y();l(`xp3n5b`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};