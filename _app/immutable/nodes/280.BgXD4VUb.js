import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Tri-state CheckBox Tree Showing Partially Checked SubTrees`,titleShort:`Tri-state CheckBox Tree`,indexDescription:`Demonstrates a traditional 'Tree View' in a GoJS diagram, where each item has a checkbox with three states.`,screenshot:`tristatecheckboxtree`,priority:2,tags:[`treelayout`,`buttons`],description:`A traditional tree view using TreeLayout with tri-state checkboxes showing partially checked subtrees.`},htmlContent:`<div id="myDiagramDiv" style="border: 1px solid black; width: 100%; height: 500px"></div>`,jsCode:`// This button assumes data binding to the "checked" property.\r
  go.GraphObject.defineBuilder('TriStateCheckBoxButton', args => {\r
    const button =\r
      go.GraphObject.build('Button', {\r
          width: 14, height: 14,\r
          'ButtonBorder.fill': 'white',\r
          'ButtonBorder.spot1': new go.Spot(0, 0, 1, 1),\r
          'ButtonBorder.spot2': new go.Spot(1, 1, -1, -1)\r
        })\r
        .add(\r
          new go.Shape({\r
              name: 'ButtonIcon',\r
              geometryString: 'M0 0 M0 8.85 L4.9 13.75 16.2 2.45 M16.2 16.2', // a 'check' mark\r
              strokeWidth: 2,\r
              stretch: go.Stretch.Fill, // this Shape expands to fill the Button\r
              geometryStretch: go.GeometryStretch.Uniform, // the check mark fills the Shape without distortion\r
              background: null,\r
              visible: false // visible set to false: not checked, unless data.checked is true\r
            })\r
            .bind('visible', 'checked', p => p === true || p === null)\r
            .bind('stroke', 'checked', p => p === null ? null : 'black')\r
            .bind('background', 'checked', p => p === null ? 'gray' : null)\r
        );\r
\r
    function updateCheckBoxesDown(node, val) {\r
      node.diagram.model.set(node.data, 'checked', val);\r
      node.findTreeChildrenNodes().each(child => updateCheckBoxesDown(child, val));\r
    }\r
\r
    function updateCheckBoxesUp(node) {\r
      var parent = node.findTreeParentNode();\r
      if (parent !== null) {\r
        var anychecked = parent.findTreeChildrenNodes().any(n => n.data.checked !== false && n.data.checked !== undefined);\r
        var allchecked = parent.findTreeChildrenNodes().all(n => n.data.checked === true);\r
        node.diagram.model.set(parent.data, 'checked', allchecked ? true : anychecked ? null : false);\r
        updateCheckBoxesUp(parent);\r
      }\r
    }\r
\r
    button.click = (e, button) => {\r
      if (!button.isEnabledObject()) return;\r
      var diagram = e.diagram;\r
      if (diagram === null || diagram.isReadOnly) return;\r
      if (diagram.model.isReadOnly) return;\r
      e.handled = true;\r
      var shape = button.findObject('ButtonIcon');\r
      diagram.startTransaction('checkbox');\r
      // Assume the name of the data property is "checked".\r
      var node = button.part;\r
      var oldval = node.data.checked;\r
      var newval = oldval !== true; // newval will always be either true or false, never null\r
      // Set this data.checked property and those of all its children to the same value\r
      updateCheckBoxesDown(node, newval);\r
      // Walk up the tree and update all of their checkboxes\r
      updateCheckBoxesUp(node);\r
      // support extra side-effects without clobbering the click event handler:\r
      if (typeof button['_doClick'] === 'function') button['_doClick'](e, button);\r
      diagram.commitTransaction('checkbox');\r
    };\r
\r
    return button;\r
  });\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowMove: false,\r
      allowCopy: false,\r
      allowDelete: false,\r
      allowHorizontalScroll: false,\r
      layout: new go.TreeLayout({\r
        alignment: go.TreeAlignment.Start,\r
        angle: 0,\r
        compaction: go.TreeCompaction.None,\r
        layerSpacing: 16,\r
        layerSpacingParentOverlap: 1,\r
        nodeIndentPastParent: 1.0,\r
        nodeSpacing: 0,\r
        setsPortSpot: false,\r
        setsChildPortSpot: false\r
      })\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node({\r
          // no Adornment: instead change panel background color by binding to Node.isSelected\r
          selectionAdorned: false,\r
          // a custom function to allow expanding/collapsing on double-click\r
          // this uses similar logic to a TreeExpanderButton\r
          doubleClick: (e, node) => {\r
            var cmd = myDiagram.commandHandler;\r
            if (node.isTreeExpanded) {\r
              if (!cmd.canCollapseTree(node)) return;\r
            } else {\r
              if (!cmd.canExpandTree(node)) return;\r
            }\r
            e.handled = true;\r
            if (node.isTreeExpanded) {\r
              cmd.collapseTree(node);\r
            } else {\r
              cmd.expandTree(node);\r
            }\r
          }\r
        })\r
        .add(\r
          go.GraphObject.build("TreeExpanderButton", {\r
            width: 14,\r
            'ButtonBorder.fill': 'whitesmoke',\r
            'ButtonBorder.stroke': 'lightgray',\r
            _buttonFillOver: 'rgba(0,128,255,0.25)',\r
            _buttonStrokeOver: null\r
          }),\r
          new go.Panel('Horizontal', {\r
              position: new go.Point(16, 0),\r
              margin: new go.Margin(0, 2, 0, 0),\r
              defaultAlignment: go.Spot.Center\r
            })\r
            .bindObject('background', 'isSelected', s => s ? 'lightblue' : 'white')\r
            .add(\r
              go.GraphObject.build("TriStateCheckBoxButton"),\r
              new go.TextBlock({ font: '9pt Verdana, sans-serif', margin: new go.Margin(0, 0, 0, 2) })\r
                .bind('text', 'key', s => 'item ' + s)\r
            ) // end Horizontal Panel\r
      ); // end Node\r
\r
\r
    // with lines\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          selectable: false,\r
          routing: go.Routing.Orthogonal,\r
          fromEndSegmentLength: 4,\r
          toEndSegmentLength: 4,\r
          fromSpot: new go.Spot(0.001, 1, 7, 0),\r
          toSpot: go.Spot.Left\r
        })\r
        .add(\r
          new go.Shape({ stroke: 'gray', strokeDashArray: [1, 2] })\r
        );\r
\r
    // create a random tree\r
    var nodeDataArray = [{ key: 0 }];\r
    var max = 25;\r
    var count = 0;\r
    while (count < max) {\r
      count = makeTree(3, count, max, nodeDataArray, nodeDataArray[0]);\r
    }\r
    myDiagram.model = new go.TreeModel(nodeDataArray);\r
  }\r
\r
  function makeTree(level, count, max, nodeDataArray, parentdata) {\r
    var numchildren = Math.floor(Math.random() * 10);\r
    for (var i = 0; i < numchildren; i++) {\r
      if (count >= max) return count;\r
      count++;\r
      var childdata = { key: count, parent: parentdata.key };\r
      nodeDataArray.push(childdata);\r
      if (level > 0 && Math.random() > 0.5) {\r
        count = makeTree(level - 1, count, max, nodeDataArray, childdata);\r
      }\r
    }\r
    return count;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample is derived from the <a href="treeView" target="_blank">Tree View</a> sample. It adds the definition of the "TriStateCheckBoxButton" which\r
    is defined only to be used in a tree.\r
  </p>\r
  <p>\r
    Each <a>Node</a> in the tree has a checkbox. Try checking them and see how\r
    it affects the <a>Node</a>s parent.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`buttons`];var g=y();l(`1uuseo4`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};