import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Custom Node Animations Demonstration`,titleShort:`Custom Node Animations`,indexDescription:`Shows how to create several custom Node animations.`,screenshot:`customanimations`,priority:2,tags:[`animation`],description:`Custom animation examples for GoJS.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px"></div>\r
\r
  <div class="flex-container">\r
    <p><strong>Options:</strong></p>\r
    <div>\r
      Creation Animation\r
      <select id="creation">\r
        <option value="spinIn">Spin In</option>\r
        <option value="fadeIn">Fade In</option>\r
        <option value="floatIn">Float In</option>\r
        <option value="zoomIn">Zoom In</option>\r
        <option>--None--</option>\r
      </select>\r
    </div>\r
    <div>\r
      Deletion Animation\r
      <select id="deletion">\r
        <option value="spinOut">Spin Out</option>\r
        <option value="fadeOut">Fade Out</option>\r
        <option value="floatOut">Float Out</option>\r
        <option value="zoomOut">Zoom Out</option>\r
        <option value="bounceOut">Bounce Out</option>\r
        <option>--None--</option>\r
      </select>\r
    </div>\r
    <div>\r
      Drawn Link Style\r
      <select id="links">\r
        <option value="bezier">Bezier Curve</option>\r
        <option value="orthogonal">Orthogonal Curve</option>\r
        <option>Linear (no animation)</option>\r
      </select>\r
    </div>\r
  </div>\r
  <button id="addNode">Add Node + Link from selected Node</button>\r
  <button id="reloadModel">Reload model</button>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'clickCreatingTool.archetypeNodeData': {\r
        color: 'palegreen',\r
        text: 'node'\r
      },\r
      'undoManager.isEnabled': true,\r
      'animationManager.isInitial': false, // To use custom initial animation instead\r
      InitialLayoutCompleted: animateFadeIn // animate with this function\r
    });\r
\r
    function animateFadeIn(e) {\r
      var diagram = e.diagram;\r
      var animation = new go.Animation();\r
      animation.isViewportUnconstrained = true;\r
      animation.easing = go.Animation.EaseOutExpo; // Looks better for a fade in animation\r
      animation.duration = 900;\r
      animation.add(diagram, 'position', diagram.position.copy().offset(0, diagram instanceof go.Palette ? 200 : -200), diagram.position);\r
      animation.add(diagram, 'opacity', 0, 1);\r
      animation.start();\r
    }\r
\r
    var addNodeAdornment =\r
      new go.Adornment('Spot')\r
        .add(\r
          new go.Panel('Auto')\r
            .add(\r
              new go.Shape({ fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),\r
              new go.Placeholder()\r
            ),\r
          // the button to create a "next" node, at the top-right corner\r
          go.GraphObject.build('Button', {\r
              alignment: go.Spot.TopRight,\r
              click: addNode // this function is defined below\r
            })\r
            .add(\r
              new go.Shape('PlusLine', { desiredSize: new go.Size(6, 6) })\r
            )\r
        );\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          selectionAdornmentTemplate: addNodeAdornment,\r
          locationSpot: go.Spot.Center\r
        })\r
        .bindTwoWay('location', 'loc')\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              strokeWidth: 2,\r
              portId: '', // this Shape is the Node's port, not the whole Node\r
              fromLinkable: true,\r
              fromLinkableSelfNode: true,\r
              fromLinkableDuplicates: true,\r
              toLinkable: true,\r
              toLinkableSelfNode: true,\r
              toLinkableDuplicates: true,\r
              cursor: 'pointer'\r
            })\r
            .bind('fill', 'color'),\r
          new go.TextBlock({ margin: 10, font: '14px sans-serif' })\r
            .bind('text')\r
        );\r
\r
    myDiagram.model = new go.GraphLinksModel(\r
      [\r
        { key: 1, text: 'Alpha', loc: new go.Point(0, 0), color: 'lightblue' },\r
        { key: 2, text: 'Beta', loc: new go.Point(150, 0), color: 'orange' },\r
        { key: 3, text: 'Gamma', loc: new go.Point(0, 150), color: 'lightgreen' },\r
        { key: 4, text: 'Delta', loc: new go.Point(150, 150), color: 'pink' }\r
      ],\r
      [\r
        // No links to start\r
      ]\r
    );\r
\r
    // This animation can be used in LinkDrawn Diagram listeners to animate\r
    // from a straight temporary link to a Bezier finished link\r
    // Custom animation for the curviness of a bezier link\r
    go.AnimationManager.defineAnimationEffect('curviness', (obj, startValue, endValue, easing, currentTime, duration, animationState) => {\r
      if (isNaN(startValue)) startValue = 0;\r
      if (isNaN(endValue)) endValue = 20;\r
      obj.curviness = easing(currentTime, startValue, endValue - startValue, duration);\r
    });\r
\r
    // This animation can be used in LinkDrawn Diagram listeners to animate\r
    // from a straight temporary link to an Orthogonal finished link\r
    go.AnimationManager.defineAnimationEffect('orthogonalLinkanim', (link, initPoints, tempPoints, easing, currentTime, duration, animation) => {\r
      var animationState = animation.getTemporaryState(link);\r
      if (animationState.initial === undefined) {\r
        // On the first animaiton tick, save the initial points\r
        animationState.initial = true;\r
        var pts = link.points.copy();\r
        tempPoints.points = pts;\r
        animationState.startPt = pts.first();\r
        animationState.toPt1 = pts.elt(2);\r
        animationState.toPt2 = pts.elt(3);\r
        animationState.endPt = pts.last();\r
      }\r
      var newpt1 = new go.Point(\r
        easing(currentTime, animationState.startPt.x, animationState.toPt1.x - animationState.startPt.x, duration),\r
        easing(currentTime, animationState.startPt.y, animationState.toPt1.y - animationState.startPt.y, duration)\r
      );\r
      var newpt2 = new go.Point(\r
        easing(currentTime, animationState.endPt.x, -(animationState.endPt.x - animationState.toPt2.x), duration),\r
        easing(currentTime, animationState.endPt.y, -(animationState.endPt.y - animationState.toPt2.y), duration)\r
      );\r
\r
      // Setting the array of points will automatically call makeGeometry which will redraw the segments of the line\r
      link.points = [animationState.startPt, tempPoints.points.elt(1), newpt1, newpt2, tempPoints.points.elt(4), animationState.endPt];\r
    });\r
\r
    go.AnimationManager.defineAnimationEffect('corner', (obj, startValue, endValue, easing, currentTime, duration, animation) => {\r
      // If no corner set, default to 0 -> 20\r
      startValue = startValue || 0;\r
      endValue = endValue || 20;\r
      obj.corner = easing(currentTime, startValue, endValue - startValue, duration);\r
    });\r
\r
    myDiagram.addDiagramListener('LinkDrawn', e => {\r
      var link = e.subject;\r
      var animation = new go.Animation();\r
      var linkChoice = document.getElementById('links').value;\r
      if (linkChoice == 'bezier') {\r
        link.curve = go.Curve.Bezier;\r
        animation.easing = elasticEase;\r
        animation.add(link, 'curviness', 0, link.curviness);\r
        animation.duration = 500;\r
      } else if (linkChoice == 'orthogonal') {\r
        // The orthogonal animation is two animations, chained together. One to modify the points,\r
        // and then another to modify the link.corner value.\r
\r
        // Store the initial link.corner value,\r
        // then set it to 0 so that in between animations it does not revert back to the original state\r
        var initCorner = link.corner;\r
        link.corner = 0;\r
        // Store the original points to this object\r
        var tempPoints = {};\r
        animation.add(link, 'orthogonalLinkanim', link.points, tempPoints);\r
        animation.duration = 300;\r
        // Chain animation after first one is completed\r
        animation.finished = () => {\r
          // Set points back to what they were before the animation\r
          myDiagram.startTransaction('Fix Points');\r
          link.points = tempPoints.points;\r
          myDiagram.commitTransaction('Fix Points');\r
          // Need to make a new animation object\r
          var animation2 = new go.Animation();\r
          animation2.add(link, 'corner', 0, initCorner);\r
          animation2.duration = 250;\r
          animation2.start();\r
        };\r
        animation.start();\r
\r
        link.routing = go.Routing.Orthogonal;\r
        // NYI ortho animation\r
        link.ensureBounds();\r
      }\r
      animation.start();\r
    });\r
\r
    go.AnimationManager.defineAnimationEffect('bounceDelete', (obj, startValue, endValue, easing, currentTime, duration, animation) => {\r
      var animationState = animation.getTemporaryState(obj);\r
      if (animationState.initial === undefined) {\r
        // Set the initial positions as part of the animationState data\r
        animationState.yPos = obj.location.y;\r
        animationState.xPos = obj.location.x;\r
        animationState.yVelo = 0;\r
        animationState.xVelo = 0;\r
        animationState.newTime = 0;\r
        animationState.oldTime = 0;\r
        animationState.initial = true;\r
      }\r
      obj.location = getPointBounceDelete(currentTime, obj, animationState, obj.diagram);\r
    });\r
\r
    // Get the point the object should be at based upon the time and original point\r
    function getPointBounceDelete(currentTime, obj, animationState, diagram) {\r
      if (diagram === null) return new go.Point(animationState.xPos, animationState.yPos);\r
      let height = obj.actualBounds.height;\r
      animationState.newTime = currentTime;\r
      // Animation uses a change in time in order to be more consistant\r
      let delTime = (animationState.newTime - animationState.oldTime) / 3;\r
      animationState.yVelo += 0.05 * delTime;\r
      // Add a slight easing to the x movement at the beginning of the animation\r
      if (currentTime < 200) {\r
        animationState.xVelo = currentTime / 300;\r
      }\r
      // Adjust positions based on the velocities and the change in time\r
      animationState.yPos += animationState.yVelo * delTime;\r
      animationState.xPos += animationState.xVelo * delTime;\r
      // Check to see if the Y position will be less than the bottom of the diagram, if so,\r
      // change the direction and scale down the velocity and set the position to the bottom of the diagram\r
      if (animationState.yPos > diagram.viewportBounds.height / 2 - height) {\r
        animationState.yVelo = -0.75 * animationState.yVelo;\r
        animationState.yPos = diagram.viewportBounds.height / 2 - height;\r
      }\r
      let myPoint = new go.Point(animationState.xPos, animationState.yPos);\r
      // Get the new old time for use in the next iteration\r
      animationState.oldTime = animationState.newTime;\r
      return myPoint;\r
    }\r
\r
    myDiagram.addDiagramListener('SelectionDeleting', e => {\r
      var deletionSelection = document.getElementById('deletion');\r
      var animation = new go.Animation();\r
      var diagram = e.diagram;\r
      e.subject.each(p => {\r
        // Because we are deleting this part, we cannot animate it, instead we must animate a temporary copy\r
        // The animation handles this via addTemporaryPart, which must be passed a copy\r
        var part = p.copy();\r
        animation.addTemporaryPart(part, diagram);\r
        var initPosition = part.position.copy();\r
        part.locationSpot = go.Spot.Center;\r
        part.position = initPosition;\r
        switch (deletionSelection.value) {\r
          case 'spinOut':\r
            animation.add(part, 'angle', part.angle, part.angle + 1000);\r
            animation.add(part, 'scale', part.scale, 0.01);\r
            break;\r
          case 'fadeOut':\r
            animation.add(part, 'opacity', part.opacity, 0);\r
            break;\r
          case 'zoomOut':\r
            animation.add(part, 'scale', part.scale, 0.01);\r
            break;\r
          case 'floatOut':\r
            animation.add(part, 'opacity', part.opacity, 0);\r
            animation.add(part, 'position', part.position, part.position.copy().add(new go.Point(0, -80)));\r
            break;\r
          case 'bounceOut':\r
            animation.add(part, 'bounceDelete', part.location); // does't need an end value, bounceDelete determines one\r
            animation.add(part, 'scale', part.scale, 0.01);\r
            animation.duration = 1500;\r
            animation.isViewportUnconstrained = true;\r
            break;\r
          default:\r
            // nothing animates\r
            break;\r
        }\r
      });\r
      animation.start();\r
    });\r
\r
    myDiagram.addDiagramListener('ClipboardPasted', e => {\r
      var creationSelection = document.getElementById('creation');\r
      // For best performance, be sure to use only one Animation for the entire selection\r
      // instead of creating one animation for each object in the selection\r
      var animation = new go.Animation();\r
      e.subject.each(part => {\r
        addCreatedPart(part, animation, creationSelection.value);\r
      });\r
      animation.start();\r
    });\r
\r
    myDiagram.addDiagramListener('PartCreated', e => {\r
      // From ClickCreatingTool\r
      var creationSelection = document.getElementById('creation');\r
      var animation = new go.Animation();\r
      addCreatedPart(e.subject, animation, creationSelection.value);\r
      animation.start();\r
    });\r
\r
    function addCreatedPart(part, animation, creationSelection) {\r
      switch (creationSelection) {\r
        case 'spinIn':\r
          animation.add(part, 'angle', part.angle + 1000, part.angle);\r
          animation.add(part, 'scale', 0.01, part.scale);\r
          break;\r
        case 'fadeIn':\r
          animation.add(part, 'opacity', 0, part.opacity);\r
          break;\r
        case 'zoomIn':\r
          animation.add(part, 'scale', 0.01, part.scale);\r
          break;\r
        case 'floatIn':\r
          animation.add(part, 'opacity', 0, part.opacity);\r
          animation.add(part, 'location', part.location.copy().add(new go.Point(0, -80)), part.location);\r
          break;\r
        default:\r
          // nothing animates\r
          break;\r
      }\r
    }\r
\r
    document.getElementById('addNode').addEventListener('click', e => addNode());\r
\r
    function addNode() {\r
      var diagram = myDiagram;\r
      var tempNodes = new go.List();\r
      diagram.startTransaction('Add States');\r
      diagram.nodes.each(node => {\r
        if (node.isSelected) {\r
          tempNodes.push(node);\r
        }\r
      });\r
      var animation = new go.Animation();\r
      // Set the easing to a custom easing function\r
      animation.easing = elasticEase;\r
      // Add a new node to the right of each node\r
      tempNodes.each(part => {\r
        // get the node data for which the user clicked the button\r
        var fromNode = part;\r
        var fromData = part.data;\r
        // create a new "State" data object, positioned off to the right of the adorned Node\r
        var toData = { key: 'new' };\r
        toData.color = 'purple';\r
        var p = fromNode.location.copy();\r
        // Place the new node randomly somewhere along a circular 200px radius\r
        var angle = Math.random() * Math.PI * 2;\r
        p.x += Math.cos(angle) * 200;\r
        p.y += Math.sin(angle) * 200;\r
        toData.loc = p;\r
        // add the new node data to the model\r
        var model = diagram.model;\r
        model.addNodeData(toData);\r
\r
        // create a link data from the old node data to the new node data\r
        var linkdata = {\r
          from: model.getKeyForNodeData(fromData), // or just: fromData.key\r
          to: model.getKeyForNodeData(toData)\r
        };\r
        // and add the link data to the model\r
        model.addLinkData(linkdata);\r
\r
        var newnode = diagram.findNodeForData(toData);\r
        // Animate each newly created node\r
        animation.add(newnode, 'position', part.location, newnode.location);\r
      });\r
\r
      animation.start();\r
      diagram.commitTransaction('Add States');\r
    }\r
\r
    document.getElementById('reloadModel').addEventListener('click', e => {\r
      myDiagram.model = go.Model.fromJson(myDiagram.model.toJson());\r
    });\r
\r
    // Custom easing function used in some animations\r
    function elasticEase(currentTime, startValue, byValue, duration) {\r
      var ts = (currentTime /= duration) * currentTime;\r
      var tc = ts * currentTime;\r
      return startValue + byValue * (56 * tc * ts + -175 * ts * ts + 200 * tc + -100 * ts + 20 * currentTime);\r
    }\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:`.flex-container {\r
    display: flex;\r
    flex-wrap: nowrap;\r
    flex-direction: column;\r
  }\r
  .flex-container > div {\r
    margin-bottom: 10px;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This extension implements several custom animations within GoJS. It may be useful to copy some of them into your own project.\r
  </p>\r
  <ul>\r
    <li>Double click in the Diagram background to create a node, or copy and paste nodes, to view creation animations.</li>\r
    <li>Delete a node to view deletion animations.</li>\r
    <li>Draw links to see new link creation animations.</li>\r
    <li>Select a node and press the + button or the button below to see a link-and-node creation animation.</li>\r
    <li>Reload the model using the button below to see the custom load animation</li>\r
  </ul>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`animation`];var g=y();l(`1l7ijll`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};