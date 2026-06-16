import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Multi-color Link Paths`,indexDescription:`Demonstrates a custom Link that can be stroked with multiple consecutive colors.`,screenshot:`multicolorlinks`,priority:2,tags:[`links`,`force-directed`,`geometries`],description:`Links that can render different colors for equal lengths along the link path.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 400px; background: #444"></div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 250px">\r
{ "class": "go.GraphLinksModel",\r
  "nodeDataArray": [\r
{"key":1, "text":"Alpha", "color":"lightblue"},\r
{"key":2, "text":"Beta", "color":"orange"},\r
{"key":3, "text":"Gamma", "color":"lightgreen"},\r
{"key":4, "text":"Delta", "color":"pink"},\r
{"key":5, "text":"Epsilon", "color":"gold"}\r
 ],\r
  "linkDataArray": [\r
{"from":1, "to":2, "colors":[ "red","orange","gold","green","blue" ]},\r
{"from":1, "to":3, "colors":[ "red","blue" ]},\r
{"from":1, "to":4, "colors":[ "purple","orange","green" ]},\r
{"from":4, "to":5, "colors":[ "fuchsia" ]},\r
{"from":5, "to":2}\r
 ]}\r
  </textarea>`,jsCode:`// Assume that a Link may have a  linkdata.colors  property that is an Array of CSS color strings.\r
  // Also assume that each Link has as many Shapes in it that are marked with  isPanelMain: true\r
  // as you want to get a color from the linkdata.colors Array, because each Shape can only show one color.\r
  class MultiColorLink extends go.Link {\r
    constructor(init) {\r
      super();\r
      if (init) Object.assign(this, init);\r
    }\r
\r
    makeGeometry() {\r
      const geo = super.makeGeometry();\r
      const colors = this.data.colors;\r
      if (Array.isArray(colors) && colors.length > 0) {\r
        const paths = []; // find all path Shapes\r
        this.elements.each(elt => {\r
          if (elt.isPanelMain && elt instanceof go.Shape) {\r
            paths.push(elt);\r
          }\r
        });\r
        const numcolors = Math.min(colors.length, paths.length);\r
        if (numcolors > 0) {\r
          const seclen = geo.flattenedTotalLength / numcolors; // length of each color section\r
          for (let i = 0; i < paths.length; i++) {\r
            // go through all path Shapes\r
            const shape = paths[i];\r
            if (i < numcolors) {\r
              shape.visible = true; // make sure this Shape can be seen\r
              shape.stroke = colors[i]; // and assign a color\r
              if (i > 0) {\r
                // and a stroke dash array so that it only draws the needed fraction\r
                shape.strokeDashArray = [0, i * seclen, seclen, 99999];\r
              }\r
            } else {\r
              // unneeded Shapes are not visible\r
              shape.visible = false;\r
            }\r
          }\r
        }\r
      }\r
      return geo;\r
    }\r
  }\r
  // end of MultiColorLink class\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      layout: new go.ForceDirectedLayout(),\r
      'undoManager.isEnabled': true\r
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
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          fromSpot: go.Spot.AllSides,\r
          toSpot: go.Spot.AllSides\r
        })\r
        .add(\r
          new go.Shape({ fill: 'white', strokeWidth: 0 })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 12 })\r
            .bind('text')\r
        );\r
\r
    function linkPath() {\r
      // common styling for each colored section, each rendered by a different Shape\r
      return new go.Shape({\r
        isPanelMain: true,\r
        strokeWidth: 5\r
      });\r
    }\r
\r
    myDiagram.linkTemplate =\r
      new MultiColorLink({  // defined above\r
          routing: go.Routing.AvoidsNodes,\r
          corner: 10,\r
          relinkableFrom: true,\r
          relinkableTo: true,\r
          reshapable: true,\r
          resegmentable: true\r
        })\r
        .add(\r
          linkPath(), // this template can show at most 5 colors,\r
          linkPath(), // one for each link path Shape\r
          linkPath(),\r
          linkPath(),\r
          linkPath() // remove any unneeded path Shapes here, if you never need to show 5 colors at once in a single link\r
        );\r
\r
    load();\r
  }\r
\r
  // Show the diagram's model in JSON format\r
  function save() {\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
  }\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    The Link template depends on a custom <b>MultiColorLink</b> class to render sections of each of the path Shapes that it has in a different color. The colors\r
    are specified in the link data object's <b>colors</b> property, an Array of CSS color strings. The template must have as many\r
    <a>GraphObject.isPanelMain</a> Shapes in it as the maximum length of the Arrays of colors. This sample's template has five path Shapes in it so that it can\r
    render in five different colors. But if for example you need to show at most two colors, for efficiency you should change the template to have only two path\r
    Shapes in it.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`force-directed`,`geometries`];var g=y();l(`1ii62ie`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};