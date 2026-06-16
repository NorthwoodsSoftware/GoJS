import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Custom Animations Loading Tree`,indexDescription:`Shows how to create a custom Diagram loading animation.`,screenshot:`treeloadanimation`,priority:2,tags:[`animation`],description:`Loading a tree with custom GoJS animation.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       This also adds a border to help see the edges of the viewport. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 800px"></div>\r
  <button id="orth">Load Orthogonal Links</button>\r
  <button id="bez">Load Bezier Links</button>\r
  <button id="linear">Load Linear Links</button><br />\r
  Duration: <input type="range" min="100" max="3000" value="500" class="slider" id="duration" /> <span id="durationDisplay"></span><br />\r
  Corner: <input type="range" min="0" max="100" value="0" class="slider" id="corner" /> <span id="cornerDisplay"></span><br />\r
  Curvature: <input type="range" min="-50" max="50" value="40" class="slider" id="curvature" /> <span id="curvatureDisplay"></span><br />`,jsCode:`function init() {\r
    var animationDiagram = null;\r
    // Sliders for customizing the links and duration of the animation\r
    var durationSlider = document.getElementById('duration');\r
    var durationOutput = document.getElementById('durationDisplay');\r
    durationOutput.innerHTML = durationSlider.value;\r
    durationSlider.oninput = function () {\r
      durationOutput.innerHTML = this.value;\r
    };\r
    var cornerSlider = document.getElementById('corner');\r
    var cornerOutput = document.getElementById('cornerDisplay');\r
    cornerOutput.innerHTML = cornerSlider.value;\r
    cornerSlider.oninput = function () {\r
      cornerOutput.innerHTML = this.value;\r
    };\r
    var curvatureSlider = document.getElementById('curvature');\r
    var curvatureOutput = document.getElementById('curvatureDisplay');\r
    curvatureOutput.innerHTML = curvatureSlider.value;\r
    curvatureSlider.oninput = function () {\r
      curvatureOutput.innerHTML = this.value;\r
    };\r
\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      // We want no default animation when the diagram loads\r
      'animationManager.isInitial': false,\r
      autoScale: go.AutoScale.Uniform,\r
      // Disable the diagram during the animation so that the links cannot be moved, which would call compute points\r
      // The Diagram is reset to enabled when the animation is finished\r
      isEnabled: false,\r
      layout: new go.ForceDirectedLayout({\r
        defaultSpringLength: 20, // forces nodes closer together (default: 50)\r
        defaultSpringStiffness: 0.2, // forces nodes closer together (default: 0.05)\r
        isOngoing: false,\r
        isRealtime: false\r
      })\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          locationSpot: go.Spot.Center,\r
          resizable: true,\r
          rotatable: true,\r
          opacity: 0\r
        })\r
        .bindTwoWay('location')\r
        .bind('desiredSize')\r
        .add(\r
          new go.Shape('RoundedRectangle', { fill: 'lightBlue' }),\r
          new go.TextBlock()\r
            .bind('text', 'key')\r
        );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({ opacity: 0 })\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    // Generate a tree\r
    var treeArr = [{ key: 0 }];\r
    var childCount = 0;\r
    var currParent = 0;\r
    for (var i = 1; i < 100; i++) {\r
      var newNode = {\r
        key: i,\r
        parent: treeArr[currParent].key\r
      };\r
      treeArr.push(newNode);\r
      childCount++;\r
      // How many Children the node will have\r
      if (childCount > 3) {\r
        childCount = 0;\r
        currParent++;\r
      }\r
    }\r
    myDiagram.model = new go.TreeModel(treeArr);\r
\r
    var queue = [myDiagram.nodes.first()];\r
    // Start with the root node visible\r
    myDiagram.commit(diag => {\r
      diag.nodes.first().opacity = 1;\r
    }, null);\r
\r
    // Begin\r
    animateLinks(queue);\r
\r
    // Given an array of nodes, recursively animate their outgoing links and connected nodes, layer by layer.\r
    // All the nodes in a layer will be stored and therefore animated before the function moves onto the next layer\r
    function animateLinks(q) {\r
      var newQueue = [];\r
      var originalValues = new go.List();\r
      // One animation per layer, which will contain all links in the layer\r
      var animation = new go.Animation();\r
      animation.duration = Number(durationSlider.value);\r
      animation.easing = go.Animation.EaseLinear;\r
      // Each time the function is called, the queue represents the entire layer, iterate through it removing each one\r
      while (q.length > 0) {\r
        var tempNode = q.shift();\r
        // Add animation for all links that stem from the given node\r
        tempNode.linksConnected.each(link => {\r
          if (link.fromNode === tempNode) {\r
            myDiagram.startTransaction('animate link');\r
            originalValues.push({\r
              link: link,\r
              makeGeometry: link.makeGeometry,\r
              oldPoints: link.points,\r
              geometry: link.elt(0).geometry.copy()\r
            });\r
            // If there is an arrow, record the initial segment index and orientation to reset at the end, then animate the scale with the link\r
            if (link.elements.count > 1) {\r
              originalValues.last().oldSegIndex = [];\r
              originalValues.last().oldSegOrientation = link.elt(1).segmentOrientation;\r
              for (var i = 1; i < link.elements.count; i++) {\r
                // Calculate waiting time for the element depending on how far it is along the link\r
                if (link.geometry.figures.length === 0 || link.elt(i).segmentFraction < 0) {\r
                  offsetTime = link.elt(i).segmentFraction * animation.duration;\r
                } else {\r
                  offsetTime = (link.elt(i).segmentIndex / link.points.count) * animation.duration;\r
                }\r
                // Start scale animations after an offset\r
                animation.add(link.elt(i), 'customScale', 0.01, { endValue: link.elt(1).scale, offsetTime: offsetTime });\r
                originalValues.last().oldSegIndex.push(link.elt(i).segmentIndex);\r
              }\r
            }\r
            animation.add(link, 'opacity', 0.01, 1);\r
            // Node should fade in while the link is moving\r
            animation.add(link.toNode, 'opacity', 0, 1);\r
            // linear links have no geometry, and are treated differently\r
            if (link.geometry.figures.length === 0) {\r
              animation.add(link, 'linearLinkAnim', link.geometry, myDiagram.layout);\r
            } else {\r
              animation.add(link, 'segmentLinkAnim', link.geometry, myDiagram.layout);\r
            }\r
            // New queue to store the next layer\r
            newQueue.push(link.toNode);\r
            myDiagram.commitTransaction('animate link');\r
          }\r
        });\r
      }\r
      q = newQueue;\r
      // Exit if the next layer is empty, meaning there are no more links to animate\r
      if (q.length === 0) {\r
        myDiagram.isEnabled = true;\r
        return;\r
      }\r
\r
      // Chain animatons for each layer\r
      animation.finished = () => {\r
        myDiagram.startTransaction('change link');\r
        originalValues.each(newVal => {\r
          var link = newVal.link;\r
          if (link.elements.count > 1) {\r
            // Set original values of each part of the link back to what they were\r
            link.elt(1).segmentOrientation = newVal.oldSegOrientation;\r
            for (var i = 1; i < link.elements.count; i++) {\r
              link.elt(i).segmentIndex = newVal.oldSegIndex[i - 1];\r
            }\r
          }\r
          // Set the changed properties of the link back to what they were before the animation.\r
          link.elt(0).geometry = newVal.geometry;\r
          link.makeGeometry = newVal.makeGeometry;\r
          // Setting the points back to what they were will call the default makeGeometry\r
          link.points = newVal.oldPoints;\r
        });\r
        animateLinks(q);\r
        myDiagram.commitTransaction('change link');\r
      };\r
      animation.start();\r
    }\r
\r
    // Functions called by buttons that reset the layout and reanimate the links\r
    document.getElementById('orth').addEventListener('click', orthog);\r
\r
    function orthog() {\r
      myDiagram.startTransaction('change links');\r
      myDiagram.linkTemplate =\r
        new go.Link({\r
            opacity: 0, // links start out invisible\r
            routing: go.Routing.Orthogonal,\r
            corner: Number(cornerSlider.value)\r
          })\r
          .add(\r
            new go.Shape(),\r
            new go.Shape({ toArrow: 'Standard' })\r
          );\r
      myDiagram.layout.doLayout(myDiagram);\r
      // Root node should start visible\r
      myDiagram.nodes.first().opacity = 1;\r
      myDiagram.commitTransaction('change links');\r
      // Begin to recursively animate links\r
      animateLinks([myDiagram.nodes.first()]);\r
    }\r
\r
    document.getElementById('bez').addEventListener('click', bezierLinks);\r
\r
    function bezierLinks() {\r
      myDiagram.startTransaction('change links');\r
      myDiagram.linkTemplate =\r
        new go.Link({\r
            opacity: 0, // links start out invisible\r
            curve: go.Curve.Bezier,\r
            curviness: Number(curvatureSlider.value)\r
          })\r
          .add(\r
            new go.Shape(),\r
            new go.Shape({ toArrow: 'Standard' })\r
          );\r
      myDiagram.layout.doLayout(myDiagram);\r
      // Root node should start visible\r
      myDiagram.nodes.first().opacity = 1;\r
      myDiagram.commitTransaction('change links');\r
      // Begin to recursively animate links\r
      animateLinks([myDiagram.nodes.first()]);\r
    }\r
\r
    document.getElementById('linear').addEventListener('click', linearLinks);\r
\r
    function linearLinks() {\r
      myDiagram.startTransaction('change links');\r
      myDiagram.linkTemplate =\r
        new go.Link({\r
            opacity: 0 // links start out invisible\r
          })\r
          .add(\r
            new go.Shape(),\r
            new go.Shape({ toArrow: 'Standard' })\r
          );\r
      myDiagram.layout.doLayout(myDiagram);\r
      // Root node should start visible\r
      myDiagram.nodes.first().opacity = 1;\r
      myDiagram.commitTransaction('change links');\r
      // Begin to recursively animate links\r
      animateLinks([myDiagram.nodes.first()]);\r
    }\r
  }\r
\r
  // Animation for changing the scale after a delay, endObj must contain the end scale but also the delay (offsetTime)\r
  go.AnimationManager.defineAnimationEffect('customScale', (part, startValue, endObj, easing, currentTime, duration, animation) => {\r
    if (endObj.offsetTime < currentTime) {\r
      part.scale = easing(currentTime - endObj.offsetTime, startValue, endObj.endValue - startValue, duration - endObj.offsetTime);\r
    } else {\r
      part.scale = startValue;\r
    }\r
  });\r
\r
  // General animation for links that are made up of path segments, linear links do not have this, so therefore must use a special case\r
  go.AnimationManager.defineAnimationEffect('segmentLinkAnim', (link, geometry, layout, easing, currentTime, duration, animation) => {\r
    var animationState = animation.getTemporaryState(link);\r
    animationState.currentTime = currentTime;\r
    if (animationState.initial === undefined) {\r
      // Only do these things once\r
      animationState.points = [];\r
      // The shapes geometry requires an offset from the links bounds so that it will line up properly\r
      animationState.offsetX = link.elt(0).actualBounds.x;\r
      animationState.offsetY = link.elt(0).actualBounds.y;\r
\r
      // Points that when added to the list of points will be used to create the bounds of the link, therefore they are the corner points of the original bounds\r
      var boundX = link.actualBounds.x;\r
      var boundY = link.actualBounds.y;\r
      animationState.boundPoint1 = new go.Point(boundX, boundY);\r
      animationState.boundPoint2 = new go.Point(boundX + link.actualBounds.width, boundY + link.actualBounds.height);\r
\r
      //Points used to hold the initial points of a quadratic bezier\r
      animationState.point1 = null;\r
      animationState.startValue = new go.Point(geometry.figures.first().startX, geometry.figures.first().startY);\r
      animationState.endValue = null;\r
\r
      //Point from the link which will be used to create the new points that the arrow will follow along on\r
      animationState.initPoint = link.points.elt(0).copy();\r
      // Assuming the second shape is the arrow which will follow\r
      if (link.elements.count > 1) {\r
        // Change the segment index so that it will follow the segment which is being created\r
        link.elt(1).segmentIndex = 2;\r
        // Set this to none so that the angle can be manually set\r
        link.elt(1).segmentOrientation = go.Orientation.None;\r
      }\r
      animationState.origPoints = link.points.copy();\r
      // Shift all other objects segment indexes over so that they maintain their positions as the first four points are being used to animate the arrow\r
      for (var i = 2; i < link.elements.count; i++) {\r
        if (link.elt(i).segmentIndex < link.points.count) {\r
          link.elt(i).segmentIndex += 4;\r
        }\r
      }\r
\r
      animationState.currX = 0;\r
      animationState.currY = 0;\r
      animationState.delX = 0;\r
      animationState.delY = 0;\r
\r
      // Add these to the animationState so they can be used in the custom make geometry\r
      animationState.totalDuration = duration;\r
      animationState.easing = easing;\r
\r
      //Set the links makeGeometry to the custom one, passing in the objects that it will use each time it is called\r
      link.makeGeometry = segmentMakeGeometry(animationState, geometry.copy(), link);\r
\r
      // Calculate the duration for all beziers since they all are the same length in the given link\r
      var totalSegmentLength = 0;\r
      var prevValueX = animationState.startValue.x;\r
      var prevValueY = animationState.startValue.y;\r
      var bezSegments = 0;\r
      // find the total length of all the linear segments\r
      geometry.figures.first().segments.each(sgmt => {\r
        if (sgmt.type === go.SegmentType.QuadraticBezier) {\r
          bezSegments++;\r
        } else {\r
          var length = Math.max(Math.abs(prevValueX - sgmt.endX), Math.abs(prevValueY - sgmt.endY));\r
          totalSegmentLength += length;\r
        }\r
        prevValueX = sgmt.endX;\r
        prevValueY = sgmt.endY;\r
      });\r
      // The duration for the Bezier corners on an orthogonal link is calculated by taking a fraction of the total duration based on how long the bezier corners are,\r
      // Then that is divided by how many corners there are to get the average time needed for each segment\r
      animationState.bezierDuration =\r
        (duration * Math.abs(geometry.flattenedTotalLength - Math.abs(totalSegmentLength))) / (bezSegments * geometry.flattenedTotalLength);\r
\r
      animationState.changedSegments = new go.List();\r
      animationState.firstItr = true;\r
      animationState.currSegment = 0;\r
      animationState.elaDuration = 0;\r
      animationState.duration = 0;\r
      animationState.initial = true;\r
    }\r
\r
    animationState.hasTicked = false;\r
\r
    /*\r
          Create a new set of points for the bounds, arrows, and labels.\r
          There are a total of eight points which are used to make two bezier curves. The first one to generate the bounds of the link along\r
          with the position of the arrowhead, and the second one to be used to hold the position of all the labels. The link uses the start and end points of\r
          each four point bezier to calculate its bounds along with the geometries, so the start and end of the first one are the corners of the actual bounds\r
          of the link at the beginning of the animation.\r
        */\r
    var tempPoints = new go.List();\r
    // Add points for the first bezier, bound point 1 and 2 are used to create the actual bounds of the link\r
    tempPoints.push(animationState.boundPoint1);\r
    var newPoint = new go.Point(animationState.initPoint.x + animationState.currX, animationState.initPoint.y + animationState.currY);\r
    tempPoints.push(newPoint);\r
    tempPoints.push(newPoint);\r
    tempPoints.push(animationState.boundPoint2);\r
\r
    // Add points from the original bezier which will be used to hold the position of the objects\r
    animationState.origPoints.each(point => {\r
      tempPoints.push(point);\r
    });\r
    // Changing the points will cause GoJS to call the modified makeGeometry which will remake the geometry\r
    link.points = tempPoints;\r
    if (link.elements.count > 1) {\r
      // Set angle of the arrow using the most recent points\r
      var newAngle = Math.atan2(animationState.delY, animationState.delX);\r
      link.elt(1).angle = (newAngle * 180) / Math.PI;\r
    }\r
  });\r
\r
  go.AnimationManager.defineAnimationEffect('linearLinkAnim', (link, geometry, endValue, easing, currentTime, duration, animation) => {\r
    var animationState = animation.getTemporaryState(link);\r
    animationState.currentTime = currentTime;\r
    if (animationState.initial === undefined) {\r
      // Put properties on the animationState so it can be referenced by the modified makeGeometry function\r
      animationState.duration = duration;\r
      animationState.easing = easing;\r
      animationState.initial = true;\r
      link.makeGeometry = linearMakeGeometry(animationState, geometry.copy(), link);\r
      // Changing the points will cause GoJS to call the modified makeGeometry\r
      link.points = link.points.copy();\r
    }\r
    if (link.elements.count !== 1) {\r
      link.elt(1).segmentFraction = 1 - easing(currentTime, 0, 1, duration);\r
    }\r
  });\r
\r
  // Function returns points to draw a cubic bezier\r
  function sliceCubicBezier(currentTime, p1, p2, p3, p4, segment, duration, offsetX, offsetY) {\r
    var t = currentTime / duration;\r
    var u = 1 - t;\r
    /*\r
        This function takes the original points of the link's bezier curve and returns four different points that will draw a segment of the curve\r
        The algorithm consists of four equations which use the start t to the end t, where t represents the point of the curve going from 0 to 1 which\r
        in this case is related to the time, however the t0 is always 0 which simplifies the equations. The first point should always stay the same\r
        because the segment of the curve drawn will always start at the fromNode\r
      */\r
    newp2 = addPoints(scalarMult(p1, u), scalarMult(p2, t));\r
    newp3 = scalarMult(p1, u * u)\r
      .add(scalarMult(p2, 2 * t * u))\r
      .add(scalarMult(p3, t * t));\r
    newp4 = scalarMult(p1, u * u * u)\r
      .add(scalarMult(p2, 3 * t * u * u))\r
      .add(scalarMult(p3, 3 * t * t * u))\r
      .add(scalarMult(p4, t * t * t));\r
    segment.point1X = newp2.x + offsetX;\r
    segment.point1Y = newp2.y + offsetY;\r
    segment.point2X = newp3.x + offsetX;\r
    segment.point2Y = newp3.y + offsetY;\r
    segment.endX = newp4.x + offsetX;\r
    segment.endY = newp4.y + offsetY;\r
  }\r
\r
  // Uses same algorithm just for a quadratic bezier\r
  function sliceQuadBezier(currentTime, p1, p2, p3, segment, duration, offsetX, offsetY) {\r
    var t = currentTime / duration;\r
    var u = 1 - t;\r
    // Same concept as the cubic algorithm minus a point\r
    newp2 = addPoints(scalarMult(p1, u), scalarMult(p2, t));\r
    newp3 = scalarMult(p1, u * u)\r
      .add(scalarMult(p2, 2 * t * u))\r
      .add(scalarMult(p3, t * t));\r
    segment.point1X = newp2.x + offsetX;\r
    segment.point1Y = newp2.y + offsetY;\r
    segment.endX = newp3.x + offsetX;\r
    segment.endY = newp3.y + +offsetY;\r
  }\r
\r
  function scalarMult(point, factor) {\r
    return new go.Point(point.x * factor, point.y * factor);\r
  }\r
\r
  function addPoints(a, b) {\r
    return new go.Point().add(a).add(b);\r
  }\r
\r
  // Geometry for basic linear case\r
  function linearMakeGeometry(animationState, geometry, link) {\r
    var startValue = new go.Point(geometry.startX, geometry.startY);\r
    var endValue = new go.Point(geometry.endX, geometry.endY);\r
\r
    function tempMakeGeometry() {\r
      var currX = animationState.easing(animationState.currentTime, startValue.x, endValue.x - startValue.x, animationState.duration);\r
      var currY = animationState.easing(animationState.currentTime, startValue.y, endValue.y - startValue.y, animationState.duration);\r
      var tempGeo = link.elt(0).geometry.copy();\r
      tempGeo.endX = currX;\r
      tempGeo.endY = currY;\r
      return tempGeo;\r
    }\r
    return tempMakeGeometry;\r
  }\r
\r
  /*\r
      This custom makeGeometry slowly builds the geometry of the link, animating a segment then adding it to the geometry until all of the segments\r
      have been iterated through. Orthogonal links are made up of linear path segments and quadratic bezier corners which have to be treated\r
      differently. The current point that the animation is on is then returned so the arrowhead can be drawn.\r
    */\r
  function segmentMakeGeometry(animationState, geometry, link) {\r
    var startValX = geometry.figures.first().startX + animationState.offsetX;\r
    var startValY = geometry.figures.first().startY + animationState.offsetY;\r
    var prevptX = 0;\r
    var prevptY = 0;\r
    var currptX = 0;\r
    var currptY = 0;\r
\r
    function tempMakeGeometry() {\r
      animationState.newGeometry = geometry.copy();\r
\r
      // Offset the position values so it is in the right spot relative to the document coordinates\r
      animationState.newGeometry.figures.first().startX += animationState.offsetX;\r
      animationState.newGeometry.figures.first().startY += animationState.offsetY;\r
      if (animationState.currSegment > geometry.figures.first().segments.length - 1) {\r
        return animationState.newGeometry;\r
      }\r
      var shouldPop = true;\r
      var scaledTime = animationState.currentTime - animationState.elaDuration;\r
      /*\r
        Because multiple segments are being modified in order in this animation and each one has a separate duration, the time used in the\r
        easing functions must be at or below the duration. Usually the animation would stop if the current time exceeded the duration but\r
        because it is continuing to animate other segments after, the time has to be brought within the duration of the current segment being modified\r
      */\r
      var usedTime = scaledTime;\r
      if (scaledTime > animationState.duration) {\r
        usedTime = animationState.duration;\r
      }\r
      // Segment can only be modified once before it becomes frozen, which means that a copy must be made and modified\r
      var currSegment = geometry.figures.first().segments.elt(animationState.currSegment).copy();\r
      // Corner / Quadratic Bezier case\r
      if (currSegment.type === go.SegmentType.QuadraticBezier) {\r
        // Only do once per segment\r
        if (animationState.firstItr === true) {\r
          // Set the initial points of the curve which are used to calculate the piece of the bezier at a given time within the duration\r
          animationState.point1 = new go.Point(currSegment.point1X, currSegment.point1Y);\r
          animationState.endValue = new go.Point(currSegment.endX, currSegment.endY);\r
          animationState.duration = animationState.bezierDuration;\r
          animationState.firstItr = false;\r
          // Check to see if the scaled time is less than the duration on the first iteration\r
          if (scaledTime > animationState.duration) {\r
            usedTime = animationState.duration;\r
          }\r
        }\r
        sliceQuadBezier(\r
          usedTime,\r
          animationState.startValue,\r
          animationState.point1,\r
          animationState.endValue,\r
          currSegment,\r
          animationState.duration,\r
          animationState.offsetX,\r
          animationState.offsetY\r
        );\r
      } else if (currSegment.type === go.SegmentType.Bezier) {\r
        if (animationState.firstItr === true) {\r
          animationState.points = [];\r
\r
          animationState.points.push(new go.Point(geometry.figures.first().startX, geometry.figures.first().startY));\r
          animationState.points.push(new go.Point(geometry.figures.first().segments.first().point1X, geometry.figures.first().segments.first().point1Y));\r
          animationState.points.push(new go.Point(geometry.figures.first().segments.first().point2X, geometry.figures.first().segments.first().point2Y));\r
          animationState.points.push(new go.Point(geometry.figures.first().segments.first().endX, geometry.figures.first().segments.first().endY));\r
          animationState.duration = animationState.totalDuration;\r
          animationState.firstItr = false;\r
          if (scaledTime > animationState.duration) {\r
            usedTime = animationState.duration;\r
          }\r
        }\r
        var tempGeo = geometry.copy();\r
\r
        // Function which modifies the segment to make a portion of the bezier curve depending on the time relative to the duration\r
        sliceCubicBezier(\r
          usedTime,\r
          animationState.points[0],\r
          animationState.points[1],\r
          animationState.points[2],\r
          animationState.points[3],\r
          currSegment,\r
          animationState.duration,\r
          animationState.offsetX,\r
          animationState.offsetY\r
        );\r
      } else {\r
        // Line segment case\r
        // Only do once per segment\r
        if (animationState.firstItr === true) {\r
          animationState.endValue = new go.Point(currSegment.endX, currSegment.endY);\r
          // Calculate duration based on the total duration and the size of this segment compared to the entire link\r
          animationState.duration =\r
            (animationState.totalDuration *\r
              Math.max(Math.abs(animationState.startValue.x - animationState.endValue.x), Math.abs(animationState.startValue.y - animationState.endValue.y))) /\r
            geometry.flattenedTotalLength;\r
          animationState.firstItr = false;\r
          // Check to see if the scaled time is less than the duration on the first iteration\r
          if (scaledTime > animationState.duration) {\r
            usedTime = animationState.duration;\r
          }\r
        }\r
        // Lines uses the given easing function to get their end values\r
        var currX = animationState.easing(\r
          usedTime,\r
          animationState.startValue.x,\r
          animationState.endValue.x - animationState.startValue.x,\r
          animationState.duration\r
        );\r
        var currY = animationState.easing(\r
          usedTime,\r
          animationState.startValue.y,\r
          animationState.endValue.y - animationState.startValue.y,\r
          animationState.duration\r
        );\r
        if (animationState.duration === 0) {\r
          currX = animationState.endValue.x;\r
          currY = animationState.endValue.y;\r
        }\r
        currSegment.endX = currX + animationState.offsetX;\r
        currSegment.endY = currY + animationState.offsetY;\r
      }\r
      animationState.changedSegments.push(currSegment);\r
      // List will freeze after being changed once so a copy is made and used every tick\r
      animationState.newGeometry.figures.first().segments = animationState.changedSegments.copy();\r
      if (scaledTime > animationState.duration) {\r
        var tempList = new go.List();\r
        animationState.startValue = animationState.endValue;\r
        animationState.elaDuration += scaledTime;\r
        // Reset first Iteration so that the correct points will be set and used throughout that given part of the animation\r
        animationState.firstItr = true;\r
        animationState.currSegment++;\r
        currptX = currSegment.endX - startValX;\r
        currptY = currSegment.endY - startValY;\r
        // Do not remove the segment the last time in order to build up the geometry\r
        shouldPop = false;\r
      }\r
      currptX = currSegment.endX - startValX;\r
      currptY = currSegment.endY - startValY;\r
      animationState.currX = currptX;\r
      animationState.currY = currptY;\r
      // Only set the delta X and Ys every tick as the makeGeometry is called multiple times within a tick\r
      if (!animationState.hasTicked) {\r
        animationState.delX = currptX - prevptX;\r
        animationState.delY = currptY - prevptY;\r
        animationState.hasTicked = true;\r
      }\r
      prevptY = currptY;\r
      prevptX = currptX;\r
\r
      // Remove last segment from the changedSegments list because it will be added the next time makeGeometry is called\r
      if (shouldPop) {\r
        animationState.changedSegments.pop();\r
      }\r
      return animationState.newGeometry;\r
    }\r
    return tempMakeGeometry;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates defining custom animation effects with <a>AnimationManager.defineAnimationEffect</a>, and chaining animations to recursively\r
    animate a tree.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`animation`];var g=y();l(`op84lh`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};