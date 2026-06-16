import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Dimensioning Links Showing Distances Between Spots on Two Nodes`,titleShort:`Dimensioning Links`,indexDescription:`Demonstrates custom Links that show the distance between two points.`,screenshot:`dimensioning`,priority:1.2,tags:[`links`,`extensions`],description:`Dimensioning Links show the distance from a spot on a node to another spot on a node.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // A simple resizable node\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          resizable: true\r
        })\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape({ strokeWidth: 0, fill: 'lightgray' })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 10 })\r
            .bind('text', 'key')\r
        );\r
\r
    // A generalized example template using a DimensioningLink.\r
    // Most usage might not have so many Bindings.\r
    myDiagram.linkTemplateMap.add('Dimensioning',\r
      new DimensioningLink()\r
        .bind('fromSpot', 'fromSpot', go.Spot.parse)\r
        .bind('toSpot', 'toSpot', go.Spot.parse)\r
        .bind('direction')\r
        .bind('extension')\r
        .bind('inset')\r
        .add(\r
          new go.Shape({ stroke: 'gray' })\r
            .bind('stroke', 'color'),\r
          new go.Shape({ fromArrow: 'BackwardOpenTriangle', segmentIndex: 2, stroke: 'gray' })\r
            .bind('stroke', 'color'),\r
          new go.Shape({ toArrow: 'OpenTriangle', segmentIndex: -3, stroke: 'gray' })\r
            .bind('stroke', 'color'),\r
          new go.TextBlock({\r
              segmentIndex: 2,\r
              segmentFraction: 0.5,\r
              segmentOrientation: go.Orientation.Upright,\r
              alignmentFocus: go.Spot.Bottom,\r
              stroke: 'gray',\r
              font: '8pt sans-serif'\r
            })\r
            .bindObject('text', '', showDistance)\r
            .bind('stroke', 'color')\r
        ));\r
\r
    // Return a string representing the distance between the two points.\r
    // This is the cartesian distance if this.direction is NaN;\r
    // otherwise it is the orthogonal distance along that axis.\r
    function showDistance(link) {\r
      const numpts = link.pointsCount;\r
      if (numpts < 2) return '';\r
      const p0 = link.getPoint(0);\r
      const pn = link.getPoint(numpts - 1);\r
      const ang = link.direction;\r
      if (isNaN(ang)) return Math.floor(Math.sqrt(p0.distanceSquaredPoint(pn))) + '';\r
      const rad = (ang * Math.PI) / 180;\r
      return '' + Math.floor(Math.abs(Math.cos(rad) * (p0.x - pn.x)) +\r
                             Math.abs(Math.sin(rad) * (p0.y - pn.y)));\r
    }\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 'Alpha', loc: '0 50' },\r
        { key: 'Beta', loc: '150 0' },\r
        { key: 'Gamma', loc: '100 150' }\r
      ],\r
      [\r
        {\r
          from: 'Alpha',\r
          to: 'Beta',\r
          category: 'Dimensioning',\r
          fromSpot: 'TopRight',\r
          toSpot: 'TopLeft'\r
        },\r
        {\r
          from: 'Alpha',\r
          to: 'Beta',\r
          category: 'Dimensioning',\r
          fromSpot: 'TopLeft',\r
          toSpot: 'TopRight',\r
          extension: 50,\r
          color: 'blue'\r
        },\r
        {\r
          from: 'Alpha',\r
          to: 'Beta',\r
          category: 'Dimensioning',\r
          fromSpot: 'TopLeft',\r
          toSpot: 'TopLeft',\r
          direction: 270,\r
          color: 'green'\r
        },\r
        {\r
          from: 'Alpha',\r
          to: 'Beta',\r
          category: 'Dimensioning',\r
          fromSpot: 'BottomRight',\r
          toSpot: 'BottomRight',\r
          direction: 90,\r
          color: 'purple'\r
        },\r
        {\r
          from: 'Alpha',\r
          to: 'Beta',\r
          category: 'Dimensioning',\r
          fromSpot: 'Center',\r
          toSpot: 'Center',\r
          extension: 50,\r
          direction: NaN,\r
          color: 'red'\r
        },\r
\r
        {\r
          from: 'Gamma',\r
          to: 'Gamma',\r
          category: 'Dimensioning',\r
          fromSpot: 'TopLeft',\r
          toSpot: 'TopRight',\r
          direction: 0\r
        },\r
        {\r
          from: 'Gamma',\r
          to: 'Gamma',\r
          category: 'Dimensioning',\r
          fromSpot: 'TopRight',\r
          toSpot: 'BottomRight',\r
          direction: 90\r
        },\r
        {\r
          from: 'Gamma',\r
          to: 'Gamma',\r
          category: 'Dimensioning',\r
          fromSpot: 'BottomRight',\r
          toSpot: 'BottomLeft',\r
          direction: 180\r
        },\r
        {\r
          from: 'Gamma',\r
          to: 'Gamma',\r
          category: 'Dimensioning',\r
          fromSpot: 'BottomLeft',\r
          toSpot: 'TopLeft',\r
          direction: 270\r
        }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/DimensioningLink.js`],descriptionHtml:`<p>\r
    This sample makes use of the DimensioningLink extension, which inherits from the <a>Link</a> class.\r
    The extension definition can be found at <a href="../extensions/DimensioningLink.js">DimensioningLink.js</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`extensions`];var g=y();l(`1nkp8tp`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};