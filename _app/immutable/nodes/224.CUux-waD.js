import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Radial Adornment Buttons for Primary Selected Node`,titleShort:`Radial Adornment`,indexDescription:`An adornment showing buttons in a circle on one selected node.`,screenshot:`radialadornment`,priority:2,tags:[`buttons`,`geometries`],description:`When a diagram node is selected show a selection Adornment holding buttons on which a click invokes a command or a drag starts a tool`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`// Produce a "Button" that is shaped as the intersection of a circular sector and an annular ring.\r
  // The first argument is the angle at which the button will be placed relative to the center.\r
  // The second argument is the sweep angle over which the button will extend;\r
  // by default this is 90 degrees, as if there are exactly four buttons around the whole circle.\r
  go.GraphObject.defineBuilder('SectorButton', args => {\r
    var angle = go.GraphObject.takeBuilderArgument(args, 0.0, a => typeof a === 'number');\r
    var sweep = go.GraphObject.takeBuilderArgument(args, 90.0, a => typeof a === 'number');\r
\r
    // default brushes for "Button" shape\r
    var buttonFillNormal = 'whitesmoke';\r
    var buttonStrokeNormal = 'gray';\r
\r
    var buttonFillOver = 'dodgerblue';\r
    var buttonStrokeOver = 'blue';\r
\r
    var buttonFillDisabled = 'darkgray';\r
\r
    function makeAnnularWedge(angle, sweep, outer, inner) {\r
      // the Geometry will be centered about (0,0)\r
      var p = new go.Point(outer, 0).rotate(angle - sweep / 2);\r
      var q = new go.Point(inner, 0).rotate(angle + sweep / 2);\r
      var geo = new go.Geometry()\r
        .add(new go.PathFigure(-outer, -outer)) // always make sure the Geometry includes the top left corner\r
        .add(new go.PathFigure(outer, outer)) // and the bottom right corner of the whole circular area\r
        .add(\r
          new go.PathFigure(p.x, p.y) // start at outer corner, go clockwise\r
            .add(new go.PathSegment(go.SegmentType.Arc, angle - sweep / 2, sweep, 0, 0, outer, outer))\r
            .add(new go.PathSegment(go.SegmentType.Line, q.x, q.y)) // to opposite inner corner, then anticlockwise\r
            .add(new go.PathSegment(go.SegmentType.Arc, angle + sweep / 2, -sweep, 0, 0, inner, inner).close())\r
        );\r
      return geo;\r
    }\r
\r
    var geo = makeAnnularWedge(angle, sweep, 80, 40);\r
\r
    var pt = new go.Point(60, 0).rotate(angle);\r
    var align = new go.Spot(0.5, 0.5, pt.x, pt.y);\r
    args.forEach(obj => {\r
      if (obj instanceof go.GraphObject) obj.alignment = align;\r
    });\r
\r
    var button =\r
      new go.Panel('Spot', {\r
          isActionable: true, // needed so that the ActionTool intercepts mouse events\r
          enabledChanged: (button, enabled) => {\r
            const shape = button.findObject('ButtonBorder');\r
            if (shape !== null) {\r
              shape.fill = enabled ? button['_buttonFillNormal'] : button['_buttonFillDisabled'];\r
            }\r
          }\r
        })\r
        .attach({\r
          // save these values for the mouseEnter and mouseLeave event handlers\r
          _buttonFillNormal: buttonFillNormal,\r
          _buttonStrokeNormal: buttonStrokeNormal,\r
          _buttonFillOver: buttonFillOver,\r
          _buttonStrokeOver: buttonStrokeOver,\r
          _buttonFillDisabled: buttonFillDisabled\r
        })\r
        .add(\r
          new go.Shape({ // the border\r
            name: 'ButtonBorder',\r
            fill: buttonFillNormal,\r
            stroke: buttonStrokeNormal,\r
            geometry: geo\r
          })\r
        );\r
\r
    // There's no GraphObject inside the button shape -- it must be added as part of the button definition.\r
    // This way the object could be a TextBlock or a Shape or a Picture or arbitrarily complex Panel.\r
\r
    // mouse-over behavior\r
    button.mouseEnter = (e, button, prev) => {\r
      var shape = button.findObject('ButtonBorder'); // the border Shape\r
      if (shape instanceof go.Shape) {\r
        shape.fill = button['_buttonFillOver'];\r
        shape.stroke = button['_buttonStrokeOver'];\r
      }\r
    };\r
\r
    button.mouseLeave = (e, button, prev) => {\r
      var shape = button.findObject('ButtonBorder'); // the border Shape\r
      if (shape instanceof go.Shape) {\r
        shape.fill = button['_buttonFillNormal'];\r
        shape.stroke = button['_buttonStrokeNormal'];\r
      }\r
    };\r
\r
    return button;\r
  });\r
\r
  function init() {\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // show the selection Adornment only on the first selection if it is a Node\r
      ChangedSelection: e => {\r
        var node = e.diagram.selection.first();\r
        if (node === null) {\r
          var oldnode = selectionAdornment.adornedPart;\r
          if (oldnode) oldnode.removeAdornment('Radial');\r
          selectionAdornment.adornedObject = null;\r
        } else if (node instanceof go.Node) {\r
          selectionAdornment.adornedObject = node;\r
          node.addAdornment('Radial', selectionAdornment);\r
        }\r
      },\r
      InitialLayoutCompleted: e => {\r
        // show the adornment on the "Beta" node\r
        e.diagram.select(e.diagram.findNodeForKey(2));\r
      },\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { resizable: true })\r
        .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)\r
        .add(\r
          new go.Shape({ portId: '', fromLinkable: true, toLinkable: true })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 8, editable: true })\r
            .bindTwoWay('text')\r
        );\r
\r
    // prevent the tool from starting on without radial menu\r
    myDiagram.toolManager.linkingTool.canStart = () => false;\r
\r
    // Show a radial Adornment holding buttons when a node is selected.\r
    // This is not a template, so there is only one instance of it that can be shown at a time.\r
    // If you want every selected node to have their own copy of this adornment,\r
    // set Node.selectionAdornmentTemplate to this and remove the "ChangedSelection" DiagramEvent listener.\r
    var selectionAdornment =\r
      new go.Adornment('Spot', { layerName: 'Tool' }) // so that it's in front of other Adornments\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({\r
                fill: null,\r
                stroke: 'dodgerblue',\r
                strokeWidth: 4,\r
                pickable: false\r
              }),\r
              new go.Placeholder({ margin: 2 })\r
            ),\r
          new go.Panel()\r
            .add(\r
              go.GraphObject.build('SectorButton', {\r
                  // start drawing a new link from this node\r
                  click: (e, button) => {\r
                    var node = button.part.adornedPart; // this Node\r
                    e.diagram.clearSelection(); // hide all Adornments for clarity\r
                    var tool = e.diagram.toolManager.linkingTool; // the LinkingTool\r
                    tool.startObject = node.port; // the default port of the Node\r
                    e.diagram.currentTool = tool; // start the LinkingTool\r
                    tool.doActivate(); // and activate it\r
                  }\r
                }, 0, 90) // start angle, sweep angle,\r
                .add(\r
                  new go.TextBlock('New\\nLink', {\r
                    alignment: new go.Spot(0.95, 0.5),\r
                    alignmentFocus: go.Spot.Right\r
                  })\r
                ),\r
              go.GraphObject.build('SectorButton', {\r
                  click: (e, button) => {\r
                    // maybe use a DataInspector?\r
                    alert('Show Settings for ' + button.part.adornedPart.data.text);\r
                  }\r
                }, 90, 90)\r
                .add(\r
                  new go.Shape({\r
                    alignment: new go.Spot(0.5, 0.97),\r
                    alignmentFocus: go.Spot.Bottom,\r
                    geometryString: 'F1 M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z'\r
                  })\r
                ),\r
              go.GraphObject.build('SectorButton', {\r
                  click: (e, button) => {\r
                    // maybe show some info in HTML?\r
                    alert('Show Information about ' + button.part.adornedPart.data.text);\r
                  }\r
                }, 180, 90)\r
                .add(\r
                  new go.TextBlock('?', {\r
                    font: 'bold 14pt sans-serif',\r
                    alignment: new go.Spot(0.1, 0.5),\r
                    alignmentFocus: go.Spot.Left\r
                  })\r
                ),\r
              go.GraphObject.build('SectorButton', {\r
                  click: (e, button) => {\r
                    // this is different from CommandHandler.deleteSelection because this\r
                    // only deletes the one node, not all selected parts\r
                    e.diagram.commit(d => d.remove(button.part.adornedPart), 'deleted node');\r
                  }\r
                }, 270, 90)\r
                .add(\r
                  new go.Shape('XLine', {\r
                    stroke: 'red',\r
                    strokeWidth: 4,\r
                    width: 16,\r
                    height: 16,\r
                    alignment: new go.Spot(0.5, 0.07),\r
                    alignmentFocus: go.Spot.Top\r
                  })\r
                )\r
            )\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', color: 'lightblue' },\r
        { key: 2, text: 'Beta', color: 'orange' },\r
        { key: 3, text: 'Gamma', color: 'lightgreen' },\r
        { key: 4, text: 'Delta', color: 'pink' }\r
      ],\r
      [\r
        { from: 1, to: 2 },\r
        { from: 1, to: 3 },\r
        { from: 2, to: 2 },\r
        { from: 3, to: 4 },\r
        { from: 4, to: 1 }\r
      ]\r
    );\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Selecting a Node shows not only a dodgerblue rectangle around the selected node, but also a circular arrangement of Buttons. The red "X" deletes the node.\r
    The "?" and cog/gear Shape currently just call \`alert\`, but they could do anything that you want. The "New Link" starts the <a>LinkingTool</a> drawing a new\r
    Link from that Node.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`buttons`,`geometries`];var g=y();l(`u0igh4`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};