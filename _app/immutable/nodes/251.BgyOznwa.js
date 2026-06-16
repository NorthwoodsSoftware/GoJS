import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Shop Floor Monitor`,indexDescription:`Shows the continuously updating state of a number of stations on an imaginary shop floor.`,screenshot:`shopfloormonitor`,priority:2,tags:[`monitoring`,`animation`],description:`A state monitoring diagram.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 80%; height: 400px"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":"1", "text":"Switch 23", "type":"S2", "loc":"195 218"},\r
{"key":"2", "text":"Machine 17", "type":"M4", "loc":"195 94"},\r
{"key":"3", "text":"Panel 7", "type":"P2", "loc":"75 218"},\r
{"key":"4", "text":"Switch 24", "type":"S3", "loc":"306 218"},\r
{"key":"5", "text":"Machine 18", "type":"M5", "loc":"306 95"},\r
{"key":"6", "text":"Panel 9", "type":"P1", "loc":"426 218"},\r
{"key":"7", "text":"Instr 3", "type":"I1", "loc":"-50 218"} ],\r
  "linkDataArray": [\r
{"from":"1", "to":"2"},\r
{"from":"1", "to":"3"},\r
{"from":"1", "to":"4"},\r
{"from":"4", "to":"5"},\r
{"from":"4", "to":"6"},\r
{"from":"7", "to":"2"},\r
{"from":"7", "to":"3"}\r
 ]}\r
 </textarea\r
  >`,jsCode:`function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv');\r
\r
    // conversion functions for Bindings in the Node template:\r
\r
    function nodeTypeImage(type) {\r
      switch (type) { // Image sizes\r
        case 'S2':\r
          return 'images/voice atm switch.jpg'; // 55x55\r
        case 'S3':\r
          return 'images/server switch.jpg'; // 55x55\r
        case 'P1':\r
          return 'images/general processor.jpg'; // 60x85\r
        case 'P2':\r
          return 'images/storage array.jpg'; // 55x80\r
        case 'M4':\r
          return 'images/iptv broadcast server.jpg'; // 80x50\r
        case 'M5':\r
          return 'images/content engine.jpg'; // 90x65\r
        case 'I1':\r
          return 'images/pc.jpg'; // 80x70\r
        default:\r
          return 'images/pc.jpg'; // 80x70\r
      }\r
    }\r
\r
    function nodeTypeSize(type) {\r
      switch (type) {\r
        case 'S2':\r
          return new go.Size(55, 55);\r
        case 'S3':\r
          return new go.Size(55, 55);\r
        case 'P1':\r
          return new go.Size(60, 85);\r
        case 'P2':\r
          return new go.Size(55, 80);\r
        case 'M4':\r
          return new go.Size(80, 50);\r
        case 'M5':\r
          return new go.Size(90, 65);\r
        case 'I1':\r
          return new go.Size(80, 70);\r
        default:\r
          return new go.Size(80, 70);\r
      }\r
    }\r
\r
    function nodeProblemConverter(msg) {\r
      if (msg) return 'red';\r
      return 'rgba(0,0,0,0)';\r
    }\r
\r
    function nodeOperationConverter(s) {\r
      if (s >= 2) return 'TriangleDown';\r
      if (s >= 1) return 'Rectangle';\r
      return 'Circle';\r
    }\r
\r
    function nodeStatusConverter(s) {\r
      if (s >= 2) return 'red';\r
      if (s >= 1) return 'yellow';\r
      return 'green';\r
    }\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', {\r
          locationObjectName: 'ICON',\r
          locationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Panel('Spot')\r
            .add(\r
              new go.Panel('Auto', { name: 'ICON' })\r
                .add(\r
                  new go.Shape({\r
                      fill: null,\r
                      stroke: null,\r
                      background: 'rgba(0,0,0,0)'\r
                    })\r
                    .bind('background', 'problem', nodeProblemConverter)\r
                    //you really should just be able to do .trigger('background') here--if you're reading this that has\r
                    //probably been fixed by now\r
                    .trigger(new go.AnimationTrigger('background')),\r
                  new go.Picture({ margin: 5 })\r
                    .bind('source', 'type', nodeTypeImage)\r
                    .bind('desiredSize', 'type', nodeTypeSize)\r
                ), // end Auto Panel\r
              new go.Shape('Circle', {\r
                  alignment: go.Spot.TopLeft,\r
                  alignmentFocus: go.Spot.TopLeft,\r
                  width: 12,\r
                  height: 12,\r
                  fill: 'orange'\r
                })\r
                .bind('figure', 'operation', nodeOperationConverter),\r
              new go.Shape('Triangle', {\r
                  alignment: go.Spot.TopRight,\r
                  alignmentFocus: go.Spot.TopRight,\r
                  width: 12,\r
                  height: 12,\r
                  fill: 'blue'\r
                })\r
                .bind('fill', 'status', nodeStatusConverter)\r
                .trigger(new go.AnimationTrigger('fill'))\r
            ), // end Spot Panel\r
          new go.TextBlock()\r
            .bind('text')\r
        ); // end Node\r
\r
    // conversion function for Bindings in the Link template:\r
\r
    function linkProblemConverter(msg) {\r
      if (msg) return 'red';\r
      return 'gray';\r
    }\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.AvoidsNodes, corner: 3 })\r
        .add(\r
          new go.Shape({ strokeWidth: 2, stroke: 'gray' })\r
            .bind('stroke', 'problem', linkProblemConverter)\r
            .trigger(new go.AnimationTrigger('stroke'))\r
        );\r
\r
    load();\r
\r
    // simulate some real-time problem monitoring, once every two seconds:\r
    function randomProblems() {\r
      var model = myDiagram.model;\r
      model.commit(m => {\r
        // update all nodes\r
        var arr = m.nodeDataArray;\r
        for (var i = 0; i < arr.length; i++) {\r
          data = arr[i];\r
          m.set(data, 'problem', Math.random() < 0.8 ? '' : 'Power loss due to ...');\r
          m.set(data, 'status', Math.random() * 3);\r
          m.set(data, 'operation', Math.random() * 3);\r
        }\r
        // and update all links\r
        arr = m.linkDataArray;\r
        for (i = 0; i < arr.length; i++) {\r
          data = arr[i];\r
          m.set(data, 'problem', Math.random() < 0.7 ? '' : 'No Power');\r
        }\r
      }, null); // null temporarily sets skipsUndoManager to true, to avoid recording these changes\r
    }\r
\r
    function loop() {\r
      setTimeout(() => {\r
        randomProblems();\r
        loop();\r
      }, 2000);\r
    }\r
    loop(); // start the simulation\r
  }\r
\r
  // Show the diagram's model in JSON format.\r
  // Note: this monitor autonomously updates the model every 2 seconds, so there is no\r
  // "Modified" listener / Save-button toggling here -- the Save button is always enabled.\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This monitoring diagram continuously shows the state of a number of stations on an imaginary shop floor. Every two seconds it updates the display, showing\r
    some random problems via highlighting. You can add nodes and links by adding data to the model text below and then clicking "Load".\r
  </p>\r
  <p>For another monitoring example, see the <a href="kittenMonitor">Kitten Monitor</a> sample.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`monitoring`,`animation`];var g=y();l(`16wvt5x`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};