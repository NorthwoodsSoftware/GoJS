import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Pie Chart Supporting Selection of Slices and Dynamically Changing Values`,titleShort:`Dynamic Pie Chart`,indexDescription:`Dynamic pie chart with selectable slices that can change size.`,screenshot:`dynamicpiechart`,priority:2,tags:[`tables`,`itemarrays`,`collections`,`tooltips`,`buttons`,`geometries`,`charts`,`commands`],description:`A GoJS pie chart that updates dynamically as counts change.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
    const pieRadius = 100;\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'textEditingTool.starting': go.TextEditingStarting.SingleClick,\r
      ModelChanged: onModelChanged,\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // When a count changes in our model, ensure we trigger a redrawing of each slice in the pie\r
    function onModelChanged(e) {\r
      if (e.change === go.ChangeType.Property && e.propertyName === 'count') {\r
        var slicedata = e.object;\r
        var nodedata = findNodeDataForSlice(slicedata);\r
        if (nodedata) {\r
          // Update the count binding to force makeGeo/positionSlice\r
          myDiagram.model.updateTargetBindings(nodedata, 'count');\r
          // If the count went to 0, hide the slice\r
          var sliceindex = nodedata.slices.indexOf(slicedata);\r
          var slice = myDiagram.findNodeForKey(nodedata.key).findObject('PIE').elt(sliceindex);\r
          var sliceshape = slice.findObject('SLICE');\r
          if (slicedata.count === 0) sliceshape.visible = false;\r
          else sliceshape.visible = true;\r
        }\r
      }\r
    }\r
\r
    var sliceTemplate =\r
      new go.Panel({\r
        // Allow the user to "select" slices when clicking them\r
        click: (e, slice) => {\r
          var sliceShape = slice.findObject('SLICE');\r
          var oldskips = slice.diagram.skipsUndoManager;\r
          slice.diagram.skipsUndoManager = true;\r
          if (sliceShape.stroke === 'transparent') {\r
            sliceShape.stroke = go.Brush.darkenBy(slice.data.color, 0.4);\r
            // Move the slice out from the pie when selected\r
            var nodedata = findNodeDataForSlice(slice.data);\r
            if (nodedata) {\r
              var sliceindex = nodedata.slices.indexOf(slice.data);\r
              var angles = getAngles(nodedata, sliceindex);\r
              if (angles.sweep !== 360) {\r
                var angle = angles.start + angles.sweep / 2;\r
                var offsetPoint = new go.Point(pieRadius / 10, 0);\r
                slice.position = offsetPoint.rotate(angle).offset(pieRadius / 10, pieRadius / 10);\r
              }\r
            }\r
          } else {\r
            sliceShape.stroke = 'transparent';\r
            slice.position = new go.Point(pieRadius / 10, pieRadius / 10);\r
          }\r
          slice.diagram.skipsUndoManager = oldskips;\r
        },\r
        toolTip:\r
          go.GraphObject.build('ToolTip', {\r
              'Border.fill': 'lightgray'\r
            })\r
            .add(\r
              new go.TextBlock({\r
                  font: '10pt Verdana, sans-serif',\r
                  margin: 4\r
                })\r
                .bind('text', '', data => {\r
                  // Display text and percentage rounded to 2 decimals\r
                  var nodedata = findNodeDataForSlice(data);\r
                  if (nodedata) {\r
                    var percent = Math.round((data.count / getTotalCount(nodedata)) * 100 * 100) / 100;\r
                    return data.text + ': ' + percent + '%';\r
                  }\r
                  return '';\r
                })\r
            )\r
        })\r
        .bind('position', '', positionSlice)\r
        .add(\r
          new go.Shape({\r
              name: 'SLICE',\r
              strokeWidth: 2,\r
              stroke: 'transparent',\r
              isGeometryPositioned: true\r
            })\r
            .bind('fill', 'color')\r
            .bind('geometry', '', makeGeo)\r
        );\r
\r
    var optionTemplate =\r
      new go.Panel('TableRow')\r
        .add(\r
          new go.TextBlock({\r
              column: 0,\r
              font: '10pt Verdana, sans-serif',\r
              alignment: go.Spot.Left,\r
              margin: 5\r
            })\r
            .bind('text'),\r
          new go.Panel('Auto', { column: 1 })\r
            .add(\r
              new go.Shape({ fill: '#F2F2F2' }),\r
              new go.TextBlock({\r
                  font: '10pt Verdana, sans-serif',\r
                  textAlign: 'right',\r
                  margin: 2,\r
                  wrap: go.Wrap.None,\r
                  width: 40,\r
                  editable: true,\r
                  isMultiline: false,\r
                  textValidation: isValidCount\r
                })\r
                .bindTwoWay('text', 'count', null, count => parseInt(count, 10))\r
            ),\r
          new go.Panel('Horizontal', { column: 2 })\r
            .add(\r
              go.GraphObject.build('Button', { click: incrementCount })\r
                .add(\r
                  new go.Shape('PlusLine', {\r
                    margin: 3,\r
                    desiredSize: new go.Size(7, 7)\r
                  })\r
                ),\r
              go.GraphObject.build('Button', { click: decrementCount })\r
                .add(\r
                  new go.Shape('MinusLine', {\r
                    margin: 3,\r
                    desiredSize: new go.Size(7, 7)\r
                  })\r
                )\r
            )\r
        );\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Vertical', { deletable: false })\r
        .add(\r
          new go.TextBlock({\r
              font: '11pt Verdana, sans-serif',\r
              margin: 5\r
            })\r
            .bind('text'),\r
          new go.Panel('Horizontal')\r
            .add(\r
              new go.Panel('Position', {\r
                  name: 'PIE',\r
                  // account for slices offsetting when selected so the node won't change size\r
                  desiredSize: new go.Size(pieRadius * 2.2 + 5, pieRadius * 2.2 + 5),\r
                  itemTemplate: sliceTemplate\r
                })\r
                .bind('itemArray', 'slices'),\r
              new go.Panel('Table', {\r
                  margin: 5,\r
                  itemTemplate: optionTemplate\r
                })\r
                .bind('itemArray', 'slices')\r
            )\r
        );\r
\r
    myDiagram.model = new go.Model({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: [\r
        {\r
          key: 0,\r
          text: 'Sample Poll',\r
          slices: [\r
            { text: 'Option 1', count: 21, color: '#B378C1' },\r
            { text: 'Option 2', count: 11, color: '#F25F5C' },\r
            { text: 'Option 3', count: 5, color: '#FFE066' },\r
            { text: 'Option 4', count: 2, color: '#2B98C5' },\r
            { text: 'Option 5', count: 1, color: '#70C1B3' }\r
          ]\r
        }\r
      ]\r
    });\r
\r
    // Validation function for editing text\r
    function isValidCount(textblock, oldstr, newstr) {\r
      if (newstr === '') return false;\r
      var num = +newstr; // quick way to convert a string to a number\r
      return !isNaN(num) && Number.isInteger(num) && num >= 0;\r
    }\r
\r
    // Given some slice data, find the corresponding node data\r
    function findNodeDataForSlice(slice) {\r
      var arr = myDiagram.model.nodeDataArray;\r
      for (var i = 0; i < arr.length; i++) {\r
        var data = arr[i];\r
        if (data.slices.indexOf(slice) >= 0) {\r
          return data;\r
        }\r
      }\r
    }\r
\r
    function makeGeo(data) {\r
      var nodedata = findNodeDataForSlice(data);\r
      var sliceindex = nodedata.slices.indexOf(data);\r
      var angles = getAngles(nodedata, sliceindex);\r
\r
      // Constructing the Geomtery this way is much more efficient than calling go.GraphObject.ma ke:\r
      return new go.Geometry()\r
        .add(\r
          new go.PathFigure(pieRadius, pieRadius) // start point\r
            .add(\r
              new go.PathSegment(\r
                go.SegmentType.Arc,\r
                angles.start,\r
                angles.sweep, // angles\r
                pieRadius,\r
                pieRadius, // center\r
                pieRadius,\r
                pieRadius\r
              ) // radius\r
                .close()\r
            )\r
        );\r
    }\r
\r
    // Ensure slices get the proper positioning after we update any counts\r
    function positionSlice(data, obj) {\r
      var nodedata = findNodeDataForSlice(data);\r
      var sliceindex = nodedata.slices.indexOf(data);\r
      var angles = getAngles(nodedata, sliceindex);\r
\r
      var selected = obj.findObject('SLICE').stroke !== 'transparent';\r
      if (selected && angles.sweep !== 360) {\r
        var offsetPoint = new go.Point(pieRadius / 10, 0); // offset by 1/10 the radius\r
        offsetPoint = offsetPoint.rotate(angles.start + angles.sweep / 2); // rotate to the correct angle\r
        offsetPoint = offsetPoint.offset(pieRadius / 10, pieRadius / 10); // translate center toward middle of pie panel\r
        return offsetPoint;\r
      }\r
      return new go.Point(pieRadius / 10, pieRadius / 10);\r
    }\r
\r
    // This is a bit inefficient, but should be OK for normal-sized graphs with reasonable numbers of slices per node\r
    function findAllSelectedItems() {\r
      var slices = [];\r
      for (var nit = myDiagram.nodes; nit.next(); ) {\r
        var node = nit.value;\r
        var pie = node.findObject('PIE');\r
        if (pie) {\r
          for (var sit = pie.elements; sit.next(); ) {\r
            var slicepanel = sit.value;\r
            if (slicepanel.findObject('SLICE').stroke !== 'transparent') slices.push(slicepanel);\r
          }\r
        }\r
      }\r
      return slices;\r
    }\r
\r
    // Override the standard CommandHandler deleteSelection behavior.\r
    // If there are any selected slices, delete them instead of deleting any selected nodes or links.\r
    myDiagram.commandHandler.canDeleteSelection = function () {\r
      // method override must be function, not =>\r
      // True if there are any selected deletable nodes or links,\r
      // or if there are any selected slices within nodes\r
      return go.CommandHandler.prototype.canDeleteSelection.call(this) || findAllSelectedItems().length > 0;\r
    };\r
\r
    myDiagram.commandHandler.deleteSelection = function () {\r
      // method override must be function, not =>\r
      var slices = findAllSelectedItems();\r
      if (slices.length > 0) {\r
        // if there are any selected slices, delete them\r
        myDiagram.startTransaction('delete slices');\r
        var nodeset = new go.Set();\r
        for (var i = 0; i < slices.length; i++) {\r
          var panel = slices[i];\r
          var nodedata = panel.part.data;\r
          var slicearray = nodedata.slices;\r
          var slicedata = panel.data;\r
          var sliceindex = slicearray.indexOf(slicedata);\r
          // Remove the slice from the model\r
          myDiagram.model.removeArrayItem(slicearray, sliceindex);\r
          nodeset.add(nodedata);\r
        }\r
        // Force geometries to be redrawn on any node that had slices deleted\r
        nodeset.each(data => {\r
          myDiagram.model.updateTargetBindings(data, 'count');\r
        });\r
        myDiagram.commitTransaction('delete slices');\r
      } else {\r
        // otherwise just delete nodes and/or links, as usual\r
        go.CommandHandler.prototype.deleteSelection.call(this);\r
      }\r
    };\r
\r
    // Return total count of a given node\r
    function getTotalCount(nodedata) {\r
      var totCount = 0;\r
      for (var i = 0; i < nodedata.slices.length; i++) {\r
        totCount += nodedata.slices[i].count;\r
      }\r
      return totCount;\r
    }\r
\r
    // Determine start and sweep angles given some node data and the index of the slice\r
    function getAngles(nodedata, index) {\r
      var totCount = getTotalCount(nodedata);\r
      var startAngle = -90;\r
      for (var i = 0; i < index; i++) {\r
        startAngle += (360 * nodedata.slices[i].count) / totCount;\r
      }\r
      return { start: startAngle, sweep: (360 * nodedata.slices[index].count) / totCount };\r
    }\r
\r
    // When user hits + button, increment count on that option\r
    function incrementCount(e, obj) {\r
      myDiagram.model.startTransaction('increment count');\r
      var slicedata = obj.panel.panel.data;\r
      myDiagram.model.set(slicedata, 'count', slicedata.count + 1);\r
      myDiagram.model.commitTransaction('increment count');\r
    }\r
\r
    // When user hits - button, decrement count on that option\r
    function decrementCount(e, obj) {\r
      myDiagram.model.startTransaction('decrement count');\r
      var slicedata = obj.panel.panel.data;\r
      if (slicedata.count > 0) myDiagram.model.set(slicedata, 'count', slicedata.count - 1);\r
      myDiagram.model.commitTransaction('decrement count');\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates the ability to build an updateable pie chart with selectable slices. The Geometry for each slice is built using a\r
    <a>PathFigure</a> with a <a>SegmentType.Arc</a>. Slices use a custom <b>click</b> function, which sets a stroke and offsets slices as they are selected.\r
    Functionality for "selection" and deletion of these slices is similar to the <a href="selectableFields">Selectable Fields sample</a>, using some\r
    overridden <a>CommandHandler</a> functions. Each slice also has a tooltip showing the text and percentage of votes.\r
  </p>\r
  <p>\r
    Poll results can be adjusted and the pie chart will automatically update to reflect any changes. This includes deleting selected slices, updating the count\r
    using a TextBlock, or using the +/- buttons.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`collections`,`tooltips`,`buttons`,`geometries`,`charts`,`commands`];var g=y();l(`1g3eh4s`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};