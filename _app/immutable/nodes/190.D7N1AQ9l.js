import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Programmatic Navigation Through Related Nodes/Links/Groups`,titleShort:`Navigation`,indexDescription:`Displays relationships between different parts of a diagram.`,screenshot:`navigation`,priority:2,tags:[`collections`,`groups`,`tooltips`],description:`Show the relationships of nodes and links and groups.`},htmlContent:`<div id="displays" style="width: 100%; white-space: nowrap;">\r
    <div id="myDiagramDiv" style="border: solid 1px black; height: 560px; display: inline-block; vertical-align: top; width: 70%"></div>\r
    <div id="controls" style="border: solid 1px black; display: inline-block; vertical-align: top">\r
      <div id="buttons" style="border-radius: 10px; border: solid 1px gray; background-color: #eaeaea; margin: 5px">\r
        <b style="margin: 5px">Related Parts Highlighted</b> <br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="None" />Unhighlight All</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="linksIn" />Links Into</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="linksOut" />Links Out Of</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="linksAll" />Links Connected</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="nodesIn" />Nodes Into</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="nodesOut" />Nodes Out Of</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="nodesConnect" />Nodes Connected</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="nodesReach" checked="checked" />Nodes Reachable</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="group" />Containing Group (Parent)</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="groupsAll" />Containing Groups (All)</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="nodesMember" />Member Nodes (Children)</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="nodesMembersAll" />Member Nodes (All)</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="linksMember" />Member Links (Children)</label><br />\r
        <label><input type="radio" name="highlight" onclick="updateHighlights(this)" id="linksMembersAll" />Member Links (All)</label><br />\r
      </div>\r
      <div id="colorKey" style="border-radius: 10px; border: solid 1px gray; background-color: #eaeaea; margin: 5px">\r
        <b style="margin: 5px">Relationship Colors</b>\r
        <table>\r
          <tr>\r
            <td><div style="float: left; margin: 5px; height: 20px; width: 20px; background-color: black"></div></td>\r
            <td>Not related</td>\r
          </tr>\r
          <tr>\r
            <td><div style="float: left; margin: 5px; height: 20px; width: 20px; background-color: blue"></div></td>\r
            <td>Directly related</td>\r
          </tr>\r
          <tr>\r
            <td><div style="float: left; margin: 5px; height: 20px; width: 20px; background-color: green"></div></td>\r
            <td>2 relationships apart</td>\r
          </tr>\r
          <tr>\r
            <td><div style="float: left; margin: 5px; height: 20px; width: 20px; background-color: orange"></div></td>\r
            <td>3 relationships apart</td>\r
          </tr>\r
          <tr>\r
            <td><div style="float: left; margin: 5px; height: 20px; width: 20px; background-color: red"></div></td>\r
            <td>4 relationships apart</td>\r
          </tr>\r
          <tr>\r
            <td><div style="float: left; margin: 5px; height: 20px; width: 20px; background-color: purple"></div></td>\r
            <td>Very indirectly related</td>\r
          </tr>\r
        </table>\r
      </div>\r
    </div>\r
  </div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      maxSelectionCount: 1 // no more than 1 element can be selected at a time\r
    });\r
\r
    // define the node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          toEndSegmentLength: 30,\r
          fromEndSegmentLength: 30,\r
          //  define a tooltip for each node that displays its information\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4 })\r
                  .bind('text', '', getInfo)\r
              )\r
        })\r
        .bindTwoWay('location')\r
        .add(\r
          new go.Shape('Rectangle', {\r
            name: 'OBJSHAPE',\r
            fill: 'white',\r
            desiredSize: new go.Size(30, 30)\r
          }),\r
          new go.TextBlock({ margin: 4 })\r
            .bind('text', 'key')\r
        );\r
\r
    // define the link template\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          selectionAdornmentTemplate:\r
            new go.Adornment()\r
              .add(\r
                new go.Shape({ isPanelMain: true, stroke: 'dodgerblue', strokeWidth: 3 }),\r
                new go.Shape({ toArrow: 'Standard', fill: 'dodgerblue', stroke: null, scale: 1 })\r
              ),\r
          routing: go.Routing.Normal,\r
          curve: go.Curve.Bezier,\r
          toShortLength: 2,\r
          //  define a tooltip for each link that displays its information\r
          toolTip:\r
            go.GraphObject.build('ToolTip')\r
              .add(\r
                new go.TextBlock({ margin: 4 })\r
                  .bind('text', '', getInfo)\r
              )\r
        })\r
        .add(\r
          new go.Shape({ name: 'OBJSHAPE' }), //  the link shape\r
          new go.Shape({ name: 'ARWSHAPE', toArrow: 'Standard' }) //  the arrowhead\r
        );\r
\r
    // define the group template\r
    myDiagram.groupTemplate =\r
      new go.Group('Spot', {\r
        // adornment when a group is selected\r
        selectionAdornmentTemplate:\r
          new go.Adornment('Auto')\r
            .add(\r
              new go.Shape('Rectangle', { fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),\r
              new go.Placeholder()\r
            ),\r
        toSpot: go.Spot.AllSides, // links coming into groups at any side\r
        toEndSegmentLength: 30,\r
        fromEndSegmentLength: 30,\r
        //  define a tooltip for each group that displays its information\r
        toolTip:\r
          go.GraphObject.build('ToolTip')\r
            .add(\r
              new go.TextBlock({ margin: 4 })\r
                .bind('text', '', getInfo)\r
            )\r
      })\r
      .add(\r
        new go.Panel('Auto')\r
          .add(\r
            new go.Shape('Rectangle', {\r
                name: 'OBJSHAPE',\r
                parameter1: 14,\r
                fill: 'rgba(255,0,0,0.10)'\r
              })\r
              .bind('desiredSize', 'ds'),\r
            new go.Placeholder({ padding: 16 })\r
          ),\r
        new go.TextBlock({\r
            name: 'GROUPTEXT',\r
            alignment: go.Spot.TopLeft,\r
            alignmentFocus: new go.Spot(0, 0, -4, -4),\r
            font: 'Bold 10pt Sans-Serif'\r
          })\r
          .bind('text', 'key')\r
      );\r
\r
    // add nodes, including groups, and links to the model\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        // node data\r
        { key: 'A', location: new go.Point(320, 100) },\r
        { key: 'B', location: new go.Point(420, 270) },\r
        { key: 'C', group: 'Psi', location: new go.Point(270, 215) },\r
        { key: 'D', group: 'Omega', location: new go.Point(270, 325) },\r
        { key: 'E', group: 'Phi', location: new go.Point(120, 225) },\r
        { key: 'F', group: 'Omega', location: new go.Point(200, 350) },\r
        { key: 'G', location: new go.Point(180, 450) },\r
        { key: 'Chi', isGroup: true },\r
        { key: 'Psi', isGroup: true, group: 'Chi' },\r
        { key: 'Phi', isGroup: true, group: 'Psi' },\r
        { key: 'Omega', isGroup: true, group: 'Psi' }\r
      ],\r
      [\r
        // link data\r
        { from: 'A', to: 'B' },\r
        { from: 'A', to: 'C' },\r
        { from: 'A', to: 'C' },\r
        { from: 'B', to: 'B' },\r
        { from: 'B', to: 'C' },\r
        { from: 'B', to: 'Omega' },\r
        { from: 'C', to: 'A' },\r
        { from: 'C', to: 'Psi' },\r
        { from: 'C', to: 'D' },\r
        { from: 'D', to: 'F' },\r
        { from: 'E', to: 'F' },\r
        { from: 'F', to: 'G' }\r
      ]\r
    );\r
\r
    // whenever selection changes, run updateHighlights\r
    myDiagram.addDiagramListener('ChangedSelection', () => updateHighlights(getRadioButton()));\r
\r
    myDiagram.select(myDiagram.findNodeForKey('A'));\r
  }\r
\r
  // This highlights all graph objects that should be highlighted\r
  // whenever a radio button is checked or selection changes.\r
  // Parameter e is the checked radio button.\r
  function updateHighlights(e) {\r
    // Set highlight to 0 for everything before updating\r
    myDiagram.nodes.each(node => (node.highlight = 0));\r
    myDiagram.links.each(link => (link.highlight = 0));\r
\r
    // Get the selected GraphObject and run the appropriate method\r
    var sel = myDiagram.selection.first();\r
    if (sel !== null) {\r
      switch (e.id) {\r
        case 'linksIn':\r
          linksTo(sel, 1);\r
          break;\r
        case 'linksOut':\r
          linksFrom(sel, 1);\r
          break;\r
        case 'linksAll':\r
          linksAll(sel, 1);\r
          break;\r
        case 'nodesIn':\r
          nodesTo(sel, 1);\r
          break;\r
        case 'nodesOut':\r
          nodesFrom(sel, 1);\r
          break;\r
        case 'nodesConnect':\r
          nodesConnect(sel, 1);\r
          break;\r
        case 'nodesReach':\r
          nodesReach(sel, 1);\r
          break;\r
        case 'group':\r
          containing(sel, 1);\r
          break;\r
        case 'groupsAll':\r
          containingAll(sel, 1);\r
          break;\r
        case 'nodesMember':\r
          childNodes(sel, 1);\r
          break;\r
        case 'nodesMembersAll':\r
          allMemberNodes(sel, 1);\r
          break;\r
        case 'linksMember':\r
          childLinks(sel, 1);\r
          break;\r
        case 'linksMembersAll':\r
          allMemberLinks(sel, 1);\r
          break;\r
      }\r
    }\r
\r
    // Give everything the appropriate highlighting ( color and width of stroke )\r
    // nodes, including groups\r
    myDiagram.nodes.each(node => {\r
      var shp = node.findObject('OBJSHAPE');\r
      var grp = node.findObject('GROUPTEXT');\r
      var hl = node.highlight;\r
      highlight(shp, grp, hl);\r
    });\r
    // links\r
    myDiagram.links.each(link => {\r
      var hl = link.highlight;\r
      var shp = link.findObject('OBJSHAPE');\r
      var arw = link.findObject('ARWSHAPE');\r
      highlight(shp, arw, hl);\r
    });\r
  }\r
\r
  // Functions for highlighting, called by updateHighlights.\r
  // x in each case is the selected object or the object being treated as such.\r
  // Some have return values for use by each other or for tooltips.\r
\r
  // if the link connects to this node, highlight it\r
  function linksTo(x, i) {\r
    if (x instanceof go.Node) {\r
      x.findLinksInto().each(link => (link.highlight = i));\r
    }\r
  }\r
\r
  // if the link comes from this node, highlight it\r
  function linksFrom(x, i) {\r
    if (x instanceof go.Node) {\r
      x.findLinksOutOf().each(link => (link.highlight = i));\r
    }\r
  }\r
\r
  // highlight all links connected to this node\r
  function linksAll(x, i) {\r
    if (x instanceof go.Node) {\r
      x.linksConnected.each(link => (link.highlight = i));\r
    }\r
  }\r
\r
  // If selected object is a link, highlight its fromNode.\r
  // Otherwise highlight the fromNode of each link coming into the selected node.\r
  // Return a List of the keys of the nodes.\r
  function nodesTo(x, i) {\r
    var nodesToList = new go.List(/*"string"*/);\r
    if (x instanceof go.Link) {\r
      x.fromNode.highlight = i;\r
      nodesToList.add(x.data.from);\r
    } else {\r
      x.findNodesInto().each(node => {\r
        node.highlight = i;\r
        nodesToList.add(node.data.key);\r
      });\r
    }\r
    return nodesToList;\r
  }\r
\r
  // same as nodesTo, but 'from' instead of 'to'\r
  function nodesFrom(x, i) {\r
    var nodesFromList = new go.List(/*"string"*/);\r
    if (x instanceof go.Link) {\r
      x.toNode.highlight = i;\r
      nodesFromList.add(x.data.to);\r
    } else {\r
      x.findNodesOutOf().each(node => {\r
        node.highlight = i;\r
        nodesFromList.add(node.data.key);\r
      });\r
    }\r
    return nodesFromList;\r
  }\r
\r
  // If x is a link, highlight its toNode, or if it is a node, the node(s) it links to,\r
  // and then call nodesReach on the highlighted node(s), with the next color.\r
  // Do not highlight any node that has already been highlit with a color\r
  // indicating a closer relationship to the original node.\r
  function nodesReach(x, i) {\r
    if (x instanceof go.Link) {\r
      x.toNode.highlight = i;\r
      nodesReach(x.toNode, i + 1);\r
    } else {\r
      x.findNodesOutOf().each(node => {\r
        if (node.highlight === 0 || node.highlight > i) {\r
          node.highlight = i;\r
          nodesReach(node, i + 1);\r
        }\r
      });\r
    }\r
  }\r
\r
  // highlight all nodes linked to this one\r
  function nodesConnect(x, i) {\r
    if (x instanceof go.Link) {\r
      x.toNode.highlight = i;\r
      x.fromNode.highlight = i;\r
    } else {\r
      x.findNodesConnected().each(node => (node.highlight = i));\r
    }\r
  }\r
\r
  // highlights the group containing this object, specific method for links\r
  // returns the containing group of x\r
  function containing(x, i) {\r
    var container = x.containingGroup;\r
    if (container !== null) container.highlight = i;\r
    return container;\r
  }\r
\r
  // container is the group that contains this node and\r
  // will be the parameter x for the next call of this function.\r
  // Calling containing(x,i) highlights each group the appropriate color\r
  function containingAll(x, i) {\r
    containing(x, i);\r
    var container = x.containingGroup;\r
    if (container !== null) containingAll(container, i + 1);\r
  }\r
\r
  // if the Node"s containingGroup is x, highlight it\r
  function childNodes(x, i) {\r
    var childLst = new go.List(/*"string"*/);\r
    if (x instanceof go.Group) {\r
      myDiagram.nodes.each(node => {\r
        if (node.containingGroup === x) {\r
          node.highlight = i;\r
          childLst.add(node.data.key);\r
        }\r
      });\r
    }\r
    return childLst;\r
  }\r
\r
  // same as childNodes, then run allMemberNodes for each child Group with the next color\r
  function allMemberNodes(x, i) {\r
    if (x instanceof go.Group) {\r
      myDiagram.nodes.each(node => {\r
        if (node.containingGroup === x) {\r
          node.highlight = i;\r
          allMemberNodes(node, i + 1);\r
        }\r
      });\r
    }\r
  }\r
\r
  // if the link"s containing Group is x, highlight it\r
  function childLinks(x, i) {\r
    var childLst = new go.List(/*go.Link*/);\r
    myDiagram.links.each(link => {\r
      if (link.containingGroup === x) {\r
        link.highlight = i;\r
        childLst.add(link);\r
      }\r
    });\r
    return childLst;\r
  }\r
\r
  // same as childLinks, then run allMemberLinks for each child Group with the next color\r
  function allMemberLinks(x, i) {\r
    childLinks(x, i);\r
    myDiagram.nodes.each(node => {\r
      if (node instanceof go.Group && node.containingGroup === x) {\r
        allMemberLinks(node, i + 1);\r
      }\r
    });\r
  }\r
\r
  // perform the actual highlighting\r
  function highlight(shp, obj2, hl) {\r
    var color;\r
    var width = 3;\r
    if (hl === 0) {\r
      color = 'black';\r
      width = 1;\r
    } else if (hl === 1) {\r
      color = 'blue';\r
    } else if (hl === 2) {\r
      color = 'green';\r
    } else if (hl === 3) {\r
      color = 'orange';\r
    } else if (hl === 4) {\r
      color = 'red';\r
    } else {\r
      color = 'purple';\r
    }\r
    shp.stroke = color;\r
    shp.strokeWidth = width;\r
    if (obj2 !== null) {\r
      obj2.stroke = color;\r
      obj2.fill = color;\r
    }\r
  }\r
\r
  // return the selected radio button in "highlight"\r
  function getRadioButton() {\r
    var radio = document.getElementsByName('highlight');\r
    for (var i = 0; i < radio.length; i++) if (radio[i].checked) return radio[i];\r
  }\r
\r
  // returns the text for a tooltip, param obj is the text itself\r
  function getInfo(model, obj) {\r
    var x = obj.panel.adornedPart; // the object that the mouse is over\r
    var text = ''; // what will be displayed\r
    if (x instanceof go.Node) {\r
      if (x instanceof go.Group) text += 'Group: ';\r
      else text += 'Node: ';\r
      text += x.data.key;\r
      var toLst = nodesTo(x, 0); // display names of nodes going into this node\r
      if (toLst.count > 0) {\r
        toLst.sort((a, b) => (a < b ? -1 : 1));\r
        text += '\\nNodes into: ';\r
        toLst.each(key => {\r
          if (key !== text.substring(text.length - 3, text.length - 2)) {\r
            text += key + ', ';\r
          }\r
        });\r
        text = text.substring(0, text.length - 2);\r
      }\r
      var frLst = nodesFrom(x, 0); // display names of nodes coming out of this node\r
      if (frLst.count > 0) {\r
        frLst.sort((a, b) => (a < b ? -1 : 1));\r
        text += '\\nNodes out of: ';\r
        frLst.each(key => {\r
          if (key !== text.substring(text.length - 3, text.length - 2)) {\r
            text += key + ', ';\r
          }\r
        });\r
        text = text.substring(0, text.length - 2);\r
      }\r
      var grpC = containing(x, 0); // if the node is in a group, display its name\r
      if (grpC !== null) text += '\\nContaining SubGraph: ' + grpC.data.key;\r
      if (x instanceof go.Group) {\r
        // if it"s a group, also display nodes and links contained in it\r
        text += '\\nMember nodes: ';\r
        var children = childNodes(x, 0);\r
        children.sort((a, b) => (a < b ? -1 : 1));\r
        children.each(key => {\r
          if (key !== text.substring(text.length - 3, text.length - 2)) {\r
            text += key + ', ';\r
          }\r
        });\r
        text = text.substring(0, text.length - 2);\r
\r
        var linkChildren = childLinks(x, 0);\r
        if (linkChildren.count > 0) {\r
          text += '\\nMember links: ';\r
          var linkStrings = new go.List(/*"string"*/);\r
          linkChildren.each(link => {\r
            linkStrings.add(link.data.from + ' --> ' + link.data.to);\r
          });\r
          linkStrings.sort((a, b) => (a < b ? -1 : 1));\r
          linkStrings.each(str => {\r
            text += str + ', ';\r
          });\r
          text = text.substring(0, text.length - 2);\r
        }\r
      }\r
    } else if (x instanceof go.Link) {\r
      // if it"s a link, display its to and from nodes\r
      text += 'Link: ' + x.data.from + ' --> ' + x.data.to + '\\nNode To: ' + x.data.to + '\\nNode From: ' + x.data.from;\r
      var grp = containing(x, 0); // and containing group, if it has one\r
      if (grp !== null) text += '\\nContaining SubGraph: ' + grp.data.key;\r
    }\r
    return text;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample displays relationships between different parts of a diagram.</p>\r
  <p>\r
    Select a node or link and one of the radio buttons to highlight parts with a certain relationship to the one selected. The highlighting color depends on\r
    the "distance" between the parts.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`collections`,`groups`,`tooltips`];var g=y();l(`e0yp7f`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};