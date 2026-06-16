import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Geographic Diagram in Front of Leaflet.js Map`,titleShort:`Diagrams and Leaflet.js`,indexDescription:`A GoJS diagram atop a Leaflet.js map, with nodes placed at latitude and longitude based locations.`,screenshot:`leaflet`,priority:2,tags:[`tooltips`,`tools`],description:`A map integrating a GoJS Diagram and the Leaflet mapping library.`},htmlContent:`<div id="map" class="mapDiagram">\r
    <div id="myDiagramDiv" class="mapDiagram"></div>\r
  </div>`,jsCode:`// customize dragging to avoid built-in dragging by Leaflet\r
  class LeafletDraggingTool extends go.DraggingTool {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
    doActivate() {\r
      myLeafletMap.dragging.disable();\r
      super.doActivate();\r
    }\r
    doDeactivate() {\r
      myLeafletMap.dragging.enable();\r
      super.doDeactivate();\r
    }\r
  }\r
\r
  function init() {\r
\r
    /* Leaflet init */\r
\r
    const defaultZoom = 6;\r
    const defaultOrigin = [50.02185841773444, 0.15380859375];\r
\r
    myLeafletMap = L.map('map', {}).setView(defaultOrigin, defaultZoom);\r
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',\r
      maxZoom: 19,\r
      minZoom: 2\r
    }).addTo(myLeafletMap);\r
\r
    myLeafletMap.on('zoomend', updateNodes);\r
    //myLeafletMap.on('zoom', updateNodes); //maybe this is slow? who knows...\r
    myLeafletMap.on('move', updatePosition);\r
    myLeafletMap.on('moveend', updatePosition);\r
\r
    let myUpdatingGoJS = false; // prevent modifying data.latlong properties upon Leaflet "move" events\r
    function updateNodes() {\r
      // called when zoom level has changed\r
      myUpdatingGoJS = true;\r
      myDiagram.commit(diag => {\r
        diag.nodes.each(n => n.updateTargetBindings('latlong')); // without virtualization this can be slow if there are many nodes\r
      }, null);\r
      myUpdatingGoJS = false;\r
    }\r
    function updatePosition() {\r
      // called when map has been panned (i.e. top-left corner is at a different latlong)\r
      const mapb = myLeafletMap.getBounds();\r
      const pos = myLeafletMap.project([mapb.getNorth(), mapb.getWest()], myLeafletMap.getZoom());\r
      myDiagram.position = new go.Point(pos.x, pos.y);\r
    }\r
\r
    /* GoJS init */\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      InitialLayoutCompleted: e => updatePosition(),\r
      draggingTool: new LeafletDraggingTool(),\r
      'dragSelectingTool.isEnabled': false,\r
      'animationManager.isEnabled': false,\r
      scrollMode: go.ScrollMode.Infinite,\r
      allowZoom: false,\r
      allowHorizontalScroll: false,\r
      allowVerticalScroll: false,\r
      hasHorizontalScrollbar: false,\r
      hasVerticalScrollbar: false,\r
      padding: 0,\r
      defaultCursor: 'default',\r
      'toolManager.hoverDelay': 100, // how quickly tooltips are shown\r
      'undoManager.isEnabled': true,\r
      ModelChanged: e => {\r
        if (e.change === go.ChangeType.Transaction &&\r
            (e.propertyName === 'FinishedUndo' || e.propertyName === 'FinishedRedo')) {\r
          setTimeout(() => updateNodes());\r
        }\r
      }\r
    });\r
\r
    // the node template describes how each Node should be constructed\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          cursor: 'pointer',\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4, textAlign: 'center' })\r
                  .bind('text', '',\r
                        d => \`\${d.key}\\n[\${d.latlong[0].toFixed(6)}, \${d.latlong[1].toFixed(6)}]\`)\r
              )\r
        })\r
        // A two-way data binding with an Array of latitude,longitude numbers.\r
        // We have to explicitly avoid updating the source data Array\r
        // when myUpdatingGoJS is true; otherwise there would be accumulating errors.\r
        .bindTwoWay('location', 'latlong',\r
          data => {\r
            const pos = myLeafletMap.project(data, myLeafletMap.getZoom());\r
            return new go.Point(pos.x, pos.y);\r
          },\r
          (pt, data) => {\r
            if (myUpdatingGoJS) {\r
              return data.latlong; // no-op\r
            } else {\r
              const ll = myLeafletMap.unproject(L.point(pt.x, pt.y), myLeafletMap.getZoom());\r
              return [ll.lat, ll.lng];\r
            }\r
          })\r
        .add(\r
          new go.Shape('Circle', {\r
            fill: 'rgba(0, 255, 0, .4)',\r
            stroke: '#082D47',\r
            strokeWidth: 1,\r
            width: 7,\r
            height: 7\r
          })\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          layerName: 'Background',\r
          curve: go.Curve.Bezier,\r
          curviness: 5,\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4, textAlign: 'center' })\r
                  .bind('text', '', d => \`\${d.from} -- \${d.to}\`)\r
              )\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 3, stroke: 'rgba(100,100,255,.7)' })\r
        );\r
\r
    // create the model data that will be represented by Nodes and Links\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        // France\r
        { key: 'Paris', latlong: [48.876569, 2.359017] },\r
        { key: 'Brest', latlong: [48.387778, -4.479921] },\r
        { key: 'Rennes', latlong: [48.103375, -1.672809] },\r
        { key: 'Le Mans', latlong: [47.995562, 0.192413] },\r
        { key: 'Nantes', latlong: [47.217579, -1.541839] },\r
        { key: 'Tours', latlong: [47.388502, 0.6945] },\r
        { key: 'Le Havre', latlong: [49.492755, 0.125278] },\r
        { key: 'Rouen', latlong: [49.449031, 1.094128] },\r
        { key: 'Lille', latlong: [50.636379, 3.07062] },\r
\r
        // Belgium\r
        { key: 'Brussels', latlong: [50.836271, 4.333963] },\r
        { key: 'Antwerp', latlong: [51.217495, 4.421204] },\r
        { key: 'Liege', latlong: [50.624168, 5.566008] },\r
\r
        // UK\r
        { key: 'London', latlong: [51.531132, -0.125132] },\r
        { key: 'Bristol', latlong: [51.449541, -2.581118] },\r
        { key: 'Birmingham', latlong: [52.477405, -1.898494] },\r
        { key: 'Liverpool', latlong: [53.408396, -2.978809] },\r
        { key: 'Manchester', latlong: [53.476346, -2.229651] },\r
        { key: 'Leeds', latlong: [53.79548, -1.548345] },\r
        { key: 'Glasgow', latlong: [55.863287, -4.250989] }\r
      ],\r
      [\r
        { from: 'Brest', to: 'Rennes' },\r
        { from: 'Rennes', to: 'Le Mans' },\r
        { from: 'Nantes', to: 'Le Mans' },\r
        { from: 'Le Mans', to: 'Paris' },\r
        { from: 'Tours', to: 'Paris' },\r
        { from: 'Le Havre', to: 'Rouen' },\r
        { from: 'Rouen', to: 'Paris' },\r
        { from: 'Lille', to: 'Paris' },\r
        { from: 'London', to: 'Lille' },\r
\r
        { from: 'Lille', to: 'Brussels' },\r
        { from: 'Brussels', to: 'Antwerp' },\r
        { from: 'Brussels', to: 'Liege' },\r
\r
        { from: 'Bristol', to: 'London' },\r
        { from: 'Birmingham', to: 'London' },\r
        { from: 'Leeds', to: 'London' },\r
        { from: 'Liverpool', to: 'Birmingham' },\r
        { from: 'Manchester', to: 'Liverpool' },\r
        { from: 'Manchester', to: 'Leeds' },\r
        { from: 'Glasgow', to: 'Manchester' },\r
        { from: 'Glasgow', to: 'Leeds' }\r
\r
        //more here later\r
      ]\r
    );\r
  } // end init\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`/* CSS applied to the Leaflet map */\r
  .mapDiagram {\r
    border: solid 1px black;\r
    width: 500px;\r
    height: 500px;\r
  }\r
\r
  #myDiagramDiv {\r
    z-index: 701;\r
    background: transparent;\r
  }`,externalStyles:[`https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css`],externalScripts:[`https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js`],descriptionHtml:`<p>\r
    This sample integrates GoJS as a layer in front of the <a href="https://leafletjs.com/">Leaflet mapping library</a>. This demonstrates how to use GoJS\r
    within a GIS application by displaying a Diagram of nodes and links atop the map, using latitude and longitude for their coordinates.\r
  </p>\r
  <p>\r
    You can pan and zoom with Leaflet, and select and drag with GoJS. The GoJS div is on top of the Leaflet map, but this sample selectively bubbles events to\r
    leaflet by using a custom Tool. Dragged nodes will update their latitude and longitude data in the <a>Diagram.model</a>.\r
  </p>\r
  <p>\r
    This diagram displays a few train stations and routes in France, Belgium, and the UK. The data is only meant as an example of using GoJS and is not meant to\r
    be accurate.  We also have a separate sample that demonstrates the ability to reshape routes between points, instead of only having a simple point-to-point curve.\r
  </p>\r
  <p>\r
    Note that the map is fetched through the <a href="https://mapbox.com/">Mapbox</a> API. Access tokens can expire, and you'll need to get your own token.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tooltips`,`tools`];var g=y();l(`qvxg6q`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};