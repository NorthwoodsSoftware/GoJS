import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Belts and Rollers Diagram Showing Continuous Belts Winding Around Circular Rollers`,titleShort:`Belts and Rollers`,indexDescription:`Show continuous belts winding by circular rollers`,screenshot:`belts`,priority:1,tags:[`animation`,`geometries`],description:`Belts & gears: chains, pulleys, tensioners, conveyor belts, rollers.`},htmlContent:`<div style="display: flex">\r
    <div id="myDiagramDiv" style="flex-grow: 1"></div>\r
  </div>\r
  <div style="margin-block: .5em;">\r
    <button id="SaveButton" onclick="save()">Save</button>\r
    <button onclick="load()">Load</button>\r
    Diagram Model saved in JSON format:\r
  </div>\r
  <textarea id="mySavedModel" style="width: 100%; height: 300px"> </textarea>`,jsCode:`// =================== GLOBAL VARIABLES ===================\r
\r
  const ROLLER_DEFAULT_DIAMETER = 30;\r
  const BELT_STROKE_WIDTH = 4;\r
  const DEFAULT_COLOR = '#d3d3d3'; // default roller & belt color\r
  const BACKGROUND_COLOR = '#262626';\r
\r
  // defined in init()\r
  let myDiagram;\r
  let rollersLists = {};\r
\r
  // =================== TEMPLATES ===================\r
\r
  const rollerTemplate = new go.Node('Auto', {\r
      locationSpot: go.Spot.Center,\r
      selectionAdorned: false,\r
      dragComputation: rollerDragComputation\r
    })\r
    .add(\r
      // roller outline circle\r
      new go.Shape('Circle', {\r
          name: 'GUIDE',\r
          stroke: DEFAULT_COLOR,\r
          strokeWidth: 2,\r
          fill: 'transparent',\r
          width: ROLLER_DEFAULT_DIAMETER,\r
          height: ROLLER_DEFAULT_DIAMETER\r
        })\r
        .bind('stroke', 'color')\r
        .bind('width', 'diameter')\r
        .bind('height', 'diameter')\r
        .bindObject('fill', '', (obj) => {\r
          const beltKeys = getNodesBeltKeys(obj.part);\r
          if (beltKeys.length > 1) {\r
            const color = obj.part.data.color || DEFAULT_COLOR;\r
            return go.Brush.mix(color, BACKGROUND_COLOR, 0.5);\r
          } else return 'transparent';\r
        }),\r
      // center dot, visible if roller is attached to a belt\r
      new go.Shape('Circle', {\r
          width: 5,\r
          fill: 'white',\r
          stroke: null\r
        })\r
        .bind('fill', 'color')\r
        .bind('width', 'diameter', d => {\r
          if (d > 15)\r
            return 5; // if diameter is less than 15, make the center dot smaller\r
          else return d / 4;\r
        })\r
        .bindObject('visible', '', (obj) => {\r
          const beltKeys = getNodesBeltKeys(obj.part);\r
          if (beltKeys.length === 0) {\r
            return false;\r
          } else return true;\r
        })\r
    )\r
    .bindTwoWay('location', 'xy', go.Point.parse, go.Point.stringify);\r
\r
  const beltTemplate =\r
    new go.Node({\r
        selectionAdorned: false,\r
        layerName: 'Foreground',\r
        movable: false\r
      })\r
      .add(\r
        new go.Shape({\r
            name: 'BELT',\r
            fill: null,\r
            stroke: DEFAULT_COLOR,\r
            strokeWidth: BELT_STROKE_WIDTH,\r
            // to create the dotted lines\r
            // 8 px of line, 4 px of space, repeat\r
            strokeDashArray: [8, 4]\r
          })\r
          .bind('stroke', 'color')\r
      );\r
\r
  const modelTemplate = [\r
    { key: '11', category: 'Roller', xy: '450 450' },\r
    {\r
      key: '12',\r
      category: 'Roller',\r
      xy: '350 600'\r
    },\r
    { key: '13', category: 'Roller', xy: '300 800', diameter: 40 },\r
    { key: '14', category: 'Roller', xy: '150 650' },\r
    {\r
      key: '15',\r
      category: 'Roller',\r
      xy: '0 550',\r
      color: '#daab2d'\r
    },\r
    {\r
      key: '16',\r
      category: 'Roller',\r
      xy: '130 500'\r
    },\r
    { key: '17', category: 'Roller', xy: '300 430', diameter: 100 },\r
    { key: '01', category: 'Roller', xy: '300 326', diameter: 100 },\r
    {\r
      key: 'B1',\r
      category: 'Belt',\r
      // the guides list defines the rollers that can interact with the belt\r
      // the rollers the belt bends around\r
      guides: [\r
        { k: '11' },\r
        { k: '12', outside: true, touchingBelt: true },\r
        { k: '13' },\r
        { k: '14', outside: true, touchingBelt: true },\r
        { k: '15' },\r
        { k: '16', outside: true, touchingBelt: true },\r
        { k: '17' }\r
      ]\r
    },\r
    {\r
      key: '21',\r
      category: 'Roller',\r
      xy: '-100 700',\r
      color: '#daab2d'\r
    },\r
    {\r
      key: '22',\r
      category: 'Roller',\r
      xy: '100 800',\r
      color: '#daab2d'\r
    },\r
    {\r
      key: 'B2',\r
      category: 'Belt',\r
      color: '#daab2d',\r
      guides: [{ k: '21' }, { k: '15' }, { k: '22' }, { k: '12', outside: true }]\r
    }\r
  ];\r
\r
  // =================== MATH FUNCTIONS ===================\r
\r
  // imagine a square with corners at from and to\r
  // returns true if pt is inside the square\r
  function isBetween(pt, from, to) {\r
    const bounds = {\r
      x: Math.min(from.x, to.x),\r
      y: Math.min(from.y, to.y),\r
      width: Math.abs(to.x - from.x),\r
      height: Math.abs(to.y - from.y)\r
    };\r
    if (\r
      pt.x >= bounds.x &&\r
      pt.x <= bounds.x + bounds.width &&\r
      pt.y >= bounds.y &&\r
      pt.y <= bounds.y + bounds.height\r
    ) {\r
      return true;\r
    } else {\r
      return false;\r
    }\r
  }\r
\r
  // only used for clampDistance()\r
  // returns a point that is dist away from pt1 towards pt2\r
  // dist is the distance to move towards pt2, not the distance between pt1 and pt2\r
  function partwayBetween(pt1, pt2, dist) {\r
    return new go.Point(pt1.x - vector.x * dist, pt1.y - vector.y * dist);\r
  }\r
\r
  function circleTouchingLine(pt1, pt2, center, r) {\r
    const dist = go.Point.distanceLineSegmentSquared(\r
      center.x,\r
      center.y,\r
      pt1.x,\r
      pt1.y,\r
      pt2.x,\r
      pt2.y\r
    );\r
    if (dist < r * r) {\r
      return true;\r
    } else {\r
      return false;\r
    }\r
  }\r
\r
  function segmentFullyCrossesCircle(roller, line) {\r
    const dx = line[1].x - line[0].x;\r
    const dy = line[1].y - line[0].y;\r
    const r = roller.radius; // radius of the roller\r
    const A = dx * dx + dy * dy; // A = dx^2 + dy^2\r
    const fx = line[0].x - roller.center.x; // fx = x1 - cx\r
    const fy = line[0].y - roller.center.y; // fy = y1 - cy\r
    const B = 2 * (fx * dx + fy * dy); // B = 2 * (fx * dx + fy * dy)\r
    const C = fx * fx + fy * fy - r * r; // C = fx^2 + fy^2 - r^2\r
    const discriminant = B * B - 4 * A * C; // discriminant\r
    if (discriminant < 0) {\r
      // no intersection\r
      return false;\r
    } else {\r
      // there is an intersection\r
      const t1 = (-B + Math.sqrt(discriminant)) / (2 * A);\r
      const t2 = (-B - Math.sqrt(discriminant)) / (2 * A);\r
      // check if intersection points are between the line segment points\r
      return t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1 && Math.abs(t1 - t2) > 0.01; // check if the intersection points are different enough\r
    }\r
  }\r
\r
  function getFromTo(guideA, guideB) {\r
    const locA = guideA.center;\r
    const locB = guideB.center;\r
    const { x: x1, y: y1 } = locA;\r
    const { x: x2, y: y2 } = locB;\r
    const r1 = guideA.radius;\r
    const r2 = guideB.radius;\r
\r
    const vector = new go.Point(x2 - x1, y2 - y1);\r
    // angle in radians from A to B center\r
    let centerAngle = Math.atan2(vector.y, vector.x);\r
    // dist between A and B center\r
    let hypotenuse = Math.hypot(vector.x, vector.y);\r
    const opposite = guideA.outside === guideB.outside ? r2 - r1 : r2 + r1;\r
\r
    // sine of the angle between the center-to-center line segment and the tangent line\r
    // imagine a right triangle with the center-to-center line segment as the hypotenuse\r
    let offsetSine = opposite / hypotenuse; // sine = opposite / hypotenuse\r
\r
    // clamp offsetSine to [-1, 1] to avoid NaN in Math.asin\r
    // in case of floating point errors\r
    if (offsetSine < -1) offsetSine = -1;\r
    else if (offsetSine > 1) offsetSine = 1;\r
\r
    // angle between the center-to-center line segment and the tangent line\r
    // tangent offset\r
    let offset = Math.asin(offsetSine);\r
\r
    let a;\r
    if (guideB.outside) {\r
      a = guideA.outside\r
        ? Math.PI / 2 - offset - centerAngle\r
        : Math.PI / 2 - Math.abs(offset) - centerAngle;\r
    } else {\r
      a = guideA.outside\r
        ? Math.abs(offset) - Math.PI / 2 - centerAngle\r
        : Math.PI / 2 + offset - centerAngle;\r
    }\r
    const cosa = Math.cos(a);\r
    const sina = Math.sin(a);\r
\r
    const from =\r
      guideB.outside && guideA.outside\r
        ? new go.Point(x1 - r1 * cosa, y1 + r1 * sina)\r
        : new go.Point(x1 + r1 * cosa, y1 - r1 * sina);\r
    const to =\r
      !guideB.outside && !guideA.outside\r
        ? new go.Point(x2 + r2 * cosa, y2 - r2 * sina)\r
        : new go.Point(x2 - r2 * cosa, y2 + r2 * sina);\r
\r
    return {\r
      from: from,\r
      to: to\r
    };\r
  }\r
\r
  // uses q1 to q2 as anchor line segment\r
  // returns true if p1 and p2 are on opposite sides of the line segment q\r
  // credit for concept: https://stackoverflow.com/a/3842240\r
  function segmentsIntersect(segment1, segment2) {\r
    function oppositeSide(p1, p2, anchorLine) {\r
      // negative = on right side of the line segment\r
      // positive = on left side of the line segment\r
      // zero = on the line segment\r
      const side1 = p1.compareWithLineSegmentPoint(anchorLine[0], anchorLine[1]);\r
      const side2 = p2.compareWithLineSegmentPoint(anchorLine[0], anchorLine[1]);\r
      if (side1 > 0 !== side2 > 0) {\r
        // if one is on the right side and the other is on the left side\r
        return true;\r
      } else {\r
        // otherwise, they do not intersect or only the endpoints touch\r
        return false;\r
      }\r
    }\r
\r
    if (\r
      oppositeSide(segment1[0], segment1[1], segment2) &&\r
      oppositeSide(segment2[0], segment2[1], segment1)\r
    ) {\r
      return true;\r
    } else {\r
      return false;\r
    }\r
  }\r
\r
  function areRollersOverlapping(node, newloc) {\r
    let nodeRadius = node.findObject('GUIDE').actualBounds.width / 2;\r
    let overlapping = false;\r
    let it = node.diagram.nodes.iterator;\r
    myDiagram.nodes.each(n => {\r
      if (n === node || n.category === 'Belt') return;\r
      let dist2 = newloc.distanceSquaredPoint(n.location);\r
      let radius = n.findObject('GUIDE').actualBounds.width / 2;\r
      if (dist2 < (nodeRadius + radius) ** 2) {\r
        // they are overlapping - now check if they share a belt\r
        const nBeltKeys = getNodesBeltKeys(n);\r
        const nodeBeltKeys = getNodesBeltKeys(node);\r
        if (nBeltKeys.some((key) => nodeBeltKeys.includes(key))) {\r
          overlapping = true;\r
        }\r
      }\r
    });\r
    return overlapping;\r
  }\r
\r
  // =================== GET FUNCTIONS ===================\r
\r
  // only used in getAllRollers()\r
  // returns data for a roller by index: center point, radius, and extra flags\r
  function getGuideData(guides, i) {\r
    // guide has the data about how the roller interacts with the BELT:\r
    // if it's outside/inside, if it's touching the belt\r
    const guide = guides[i];\r
    const guideKey = guide.k;\r
    // guideData is the data about the roller ITSELF:\r
    // location, diameter\r
    const guideData = myDiagram.model.findNodeDataForKey(guideKey);\r
    if (guideData && guideData.xy) {\r
      const xy = guideData.xy.split(' ').map((str) => parseInt(str));\r
      return {\r
        center: new go.Point(xy[0], xy[1]),\r
        // adding half of beltWidth to the radius is is how the belt isn't directly on top of the rollers but rather looped around them\r
        radius:\r
          (guideData.diameter || ROLLER_DEFAULT_DIAMETER) / 2 + BELT_STROKE_WIDTH / 2,\r
        outside: guide.outside,\r
        touchingBelt: guide.touchingBelt,\r
        key: guideKey\r
      };\r
    } else {\r
      console.warn(\`Roller with key \${guideKey} not found. (or it has no xy)\`);\r
      return null;\r
    }\r
  }\r
\r
  // used only in getOrderedRollers()\r
  // get a list of roller data from the beltData (which has the rollers' keys)\r
  function getAllRollers(beltData) {\r
    const rollers = [];\r
    for (let i = 0; i < beltData.guides.length; i++) {\r
      rollers.push(getGuideData(beltData.guides, i));\r
    }\r
    return rollers;\r
  }\r
\r
  // used only for orderRollers()\r
  function getOrderedRollers(beltKey) {\r
    const beltData = myDiagram.model.findNodeDataForKey(beltKey);\r
\r
    const rollers = getAllRollers(beltData);\r
\r
    let ordered = rollers.filter((roller) => !roller.outside || roller.touchingBelt);\r
    let unordered = rollers.filter((roller) => roller.outside && !roller.touchingBelt);\r
\r
    ordered = computeContacts(ordered.slice() /* copy array */);\r
    ordered = deleteRollersNotTouching(ordered, beltKey).ordered;\r
\r
    const obj = considerAddingUnorderedRollersBack(ordered, unordered);\r
\r
    // all items in rollers that are not in ordered\r
    unordered = [];\r
    for (const roller of rollers) {\r
      if (!ordered.some(r => r.key === roller.key)) {\r
        unordered.push(roller);\r
      }\r
    }\r
    return {\r
      ordered: ordered,\r
      unordered: unordered\r
    };\r
  }\r
\r
  function getAllBeltKeys() {\r
    return myDiagram.model.nodeDataArray\r
      .filter(n => n.category === 'Belt')\r
      .map(n => n.key);\r
  }\r
\r
  function getNodesBeltKeys(node) {\r
    let beltKeys = [];\r
    for (let beltKey in rollersLists) {\r
      const hasNode = (key) =>\r
        rollersLists[beltKey][key].some((roller) => roller.key === node.key);\r
      if (hasNode('ordered') || hasNode('unordered')) {\r
        beltKeys.push(beltKey);\r
      }\r
    }\r
    return beltKeys;\r
  }\r
\r
  // =================== HELPFUL FUNCTIONS ===================\r
\r
  // returns a point that is dist away from pt1 towards pt2\r
  // dist is the distance to move towards pt2, not the distance between pt1 and pt2\r
  function partwayBetween(pt1, pt2, dist) {\r
    const vector = new go.Point(pt1.x - pt2.x, pt1.y - pt2.y);\r
    vector.normalize();\r
    return new go.Point(pt1.x - vector.x * dist, pt1.y - vector.y * dist);\r
  }\r
\r
  // for preventing rollers from jumping around when dragged\r
  function clampDistance(newloc, oldloc) {\r
    // so rollers can't jump through each other\r
    const dist = ROLLER_DEFAULT_DIAMETER;\r
    const tooFarApart = newloc.distanceSquaredPoint(oldloc) > dist * dist;\r
    if (tooFarApart) {\r
      // make it move less far\r
      newloc = partwayBetween(oldloc, newloc, dist);\r
    }\r
    return newloc;\r
  }\r
\r
  // used to set the initial order of rollers when the belt is created\r
  // either when program is just starting or you load new data\r
  function orderRollers(beltKeys) {\r
    for (const beltKey of beltKeys || getAllBeltKeys()) {\r
      rollersLists[beltKey] = getOrderedRollers(beltKey);\r
    }\r
  }\r
\r
  function drawAllInitialBelts(beltKeys) {\r
    for (const beltKey of beltKeys || getAllBeltKeys()) {\r
      const rollers = recalcRollerLists(beltKey).ordered;\r
      beltGeom(rollers, beltKey);\r
    }\r
  }\r
\r
  function updateRollerLocations(rollers, guides, node, newLoc) {\r
    // updates the rollers' locations based on the guides\r
    for (let i = 0; i < rollers.length; i++) {\r
      if (node && rollers[i].key === node.key) {\r
        // if the roller is being dragged, update its location\r
        rollers[i].center = newLoc;\r
      } else {\r
        const centerString = myDiagram.model.findNodeDataForKey(rollers[i].key).xy;\r
        rollers[i].center = go.Point.parse(centerString);\r
      }\r
    }\r
    return rollers;\r
  }\r
\r
  // =================== MAIN FUNCTIONS ===================\r
\r
  // returns a new rollers list that has .to and .from on each roller\r
  function computeContacts(rollers) {\r
    for (let i = 0; i < rollers.length; i++) {\r
      const guideA = rollers[i];\r
      // get next guide, wrap around to 0 if needed\r
      const nexti = (i + 1) % rollers.length;\r
      const guideB = rollers[nexti];\r
\r
      const { from, to } = getFromTo(guideA, guideB);\r
\r
      rollers[i].from = from;\r
      rollers[nexti].to = to;\r
    }\r
    return rollers;\r
  }\r
\r
  // prevents belt looping around roller for no reason\r
  // cause sometimes the belt can loop around a roller that is very close to the next roller\r
  // and in that case the next roller is not actually touching the belt\r
  // it will usually have the to and from points very close to each other so we check for that\r
  function weirdGlitchWillHappen(roller, rollers) {\r
    const isVeryShortSegment = (p1, p2) =>\r
      Math.abs(p1.x - p2.x) < 3 && Math.abs(p1.y - p2.y) < 3;\r
\r
    const isTouchingOtherRoller = (roller1, roller2) => {\r
      const dist = roller1.center.distanceSquaredPoint(roller2.center);\r
      const hypotheticalDist = (roller1.radius + roller2.radius) ** 2;\r
      if (dist < hypotheticalDist + hypotheticalDist * 0.05) {\r
        return true;\r
      }\r
    };\r
\r
    if (isVeryShortSegment(roller.to, roller.from)) {\r
      // have to check that it's close enough to another roller's for that glitch to happen\r
      for (const r of rollers) {\r
        if (r === roller) {\r
          continue;\r
        }\r
        if (isTouchingOtherRoller(r, roller)) {\r
          return true;\r
        }\r
      }\r
    }\r
  }\r
\r
  // skip any guides that should not contact the Belt, because they cannot touch the path\r
  function deleteRollersNotTouching(rollers, beltKey) {\r
    function deleteRollers(outsideOnly) {\r
      let deletedRollers = [];\r
      // outside rollers\r
      let i = 0;\r
      while (rollers.length > 2 && i < rollers.length) {\r
        const guide = rollers[i];\r
        const next = rollers[(i + 1) % rollers.length];\r
        const follow = rollers[(i + 2) % rollers.length];\r
\r
        if (weirdGlitchWillHappen(next, rollers)) {\r
          deletedRollers.push(rollers.splice((i + 1) % rollers.length, 1)[0]);\r
          break;\r
        }\r
\r
        if ((next.outside || false) !== outsideOnly) {\r
          i++;\r
          continue;\r
        }\r
\r
        const { from, to } = getFromTo(guide, follow);\r
        let between = isBetween(next.from, from, to);\r
        let wrongside = false;\r
        if (between) {\r
          // check if the next roller is on the wrong side of the line segment\r
          wrongside = next.from.compareWithLineSegmentPoint(from, to) < 0;\r
          if (next.outside) {\r
            wrongside = !wrongside;\r
          }\r
        }\r
        if (wrongside) {\r
          // get rid of NEXT\r
          deletedRollers.push(rollers.splice((i + 1) % rollers.length, 1)[0]);\r
          // now also need to check whether GUIDE has become on the wrong side!\r
          if (i > 0) i--;\r
        } else {\r
          i++;\r
        }\r
      }\r
      return deletedRollers;\r
    }\r
\r
    let deletedRollers = [];\r
    deletedRollers.push(...deleteRollers(true)); // outside rollers\r
    deletedRollers.push(...deleteRollers(false)); // inside rollers\r
\r
    for (const roller of deletedRollers) {\r
      roller.touchingBelt = false; // also update the roller object\r
    }\r
    return {\r
      ordered: rollers,\r
      unordered: deletedRollers\r
    };\r
  }\r
\r
  function beltGeom(rollers, beltKey) {\r
    // construct the Geometry for the belt Shape\r
    const geo = new go.Geometry();\r
    let fig = null;\r
    for (let i = 0; i < rollers.length; i++) {\r
      const guide = rollers[i];\r
      // next guide (loops back to zero if current guide is the last one)\r
      const nexti = (i + 1) % rollers.length;\r
      const next = rollers[nexti];\r
      if (fig === null) {\r
        // PathFigure is a piece of a Geometry. This one starts from guide.from and this function will add PathSegments to complete it\r
        fig = new go.PathFigure(guide.from.x, guide.from.y);\r
        geo.add(fig);\r
\r
        const beltNode = myDiagram.findNodeForKey(beltKey);\r
        beltNode.location = guide.from;\r
      }\r
      // lines between\r
      fig.add(new go.PathSegment(go.SegmentType.Line, next.to.x, next.to.y));\r
\r
      // lines around the rollers\r
      // next.center, next.to, and next.from are Points.\r
      // directionPoint is a method of Points that returns the angle, in degrees, of the line from this Point to the given point.\r
      let startang = next.center.directionPoint(next.to);\r
      let endang = next.center.directionPoint(next.from);\r
      let sweep = endang > startang ? endang - startang : 360 - startang + endang;\r
\r
      if (next.outside) {\r
        // go counter-clockwise\r
        fig.add(\r
          new go.PathSegment(\r
            go.SegmentType.Arc,\r
            startang,\r
            sweep - 360,\r
            next.center.x,\r
            next.center.y,\r
            next.radius,\r
            next.radius\r
          )\r
        );\r
      } else {\r
        // positive sweep angle\r
        fig.add(\r
          new go.PathSegment(\r
            go.SegmentType.Arc,\r
            startang,\r
            sweep,\r
            next.center.x,\r
            next.center.y,\r
            next.radius,\r
            next.radius\r
          )\r
        );\r
      }\r
    }\r
\r
    // add the geometry to the belt Shape\r
    const beltNode = myDiagram.findNodeForKey(beltKey);\r
    if (beltNode) {\r
      const beltShape = beltNode.findObject('BELT');\r
      if (beltShape) {\r
        let pos = geo.normalize();\r
        beltShape.geometry = geo;\r
\r
        // account for the thickness of the belt shape's stroke\r
        beltNode.position = new go.Point(\r
          -pos.x - BELT_STROKE_WIDTH / 2,\r
          -pos.y - BELT_STROKE_WIDTH / 2\r
        );\r
      }\r
    } else {\r
      console.warn(\`Belt node with key \${beltKey} not found.\`);\r
    }\r
  }\r
\r
  function considerAddingUnorderedRollersBack(ordered, unordered) {\r
    const addBackRollers = [];\r
\r
    // go thru all lines & see if it's touching the line\r
    for (let j = 0; j < unordered.length; j++) {\r
      const roller = unordered[j];\r
      for (let i = 0; i < ordered.length; i++) {\r
        const before = ordered[i];\r
        const after = ordered[(i + 1) % ordered.length];\r
        if (circleTouchingLine(before.from, after.to, roller.center, roller.radius)) {\r
          const obj = {\r
            roller: roller,\r
            i: i + 1,\r
            unorderedI: j\r
          };\r
          if (roller.outside) {\r
            obj.roller.touchingBelt = true;\r
          }\r
          addBackRollers.push(obj);\r
        }\r
      }\r
    }\r
\r
    for (const info of addBackRollers) {\r
      ordered.splice(info.i, 0, info.roller);\r
      unordered.splice(info.unorderedI, 1);\r
    }\r
    return {\r
      ordered: ordered,\r
      unordered: unordered\r
    };\r
  }\r
\r
  function recalcRollerLists(beltKey, node, newloc) {\r
    // same stuff as drawBelt()\r
    const beltData = myDiagram.model.findNodeDataForKey(beltKey);\r
\r
    // get roller order\r
    let rollers = rollersLists[beltKey].ordered.slice();\r
    let unorderedRollers = rollersLists[beltKey].unordered.slice();\r
\r
    // have to update all roller locations based on diagram location\r
    rollers = updateRollerLocations(rollers, beltData.guides, node, newloc);\r
    unorderedRollers = updateRollerLocations(\r
      unorderedRollers,\r
      beltData.guides,\r
      node,\r
      newloc\r
    );\r
\r
    rollers = considerAddingUnorderedRollersBack(rollers, unorderedRollers).ordered;\r
    rollers = computeContacts(rollers);\r
    const obj = deleteRollersNotTouching(rollers, beltKey);\r
    rollers = obj.ordered;\r
    unorderedRollers = [...unorderedRollers, ...obj.unordered];\r
    rollers = computeContacts(rollers);\r
    return {\r
      ordered: rollers,\r
      unordered: unorderedRollers\r
    };\r
  }\r
\r
  function areOverlappingLines(rollers) {\r
    // make allLines list\r
    const allLines = [];\r
    for (let i = 0; i < rollers.length; i++) {\r
      allLines.push([rollers[i].from, rollers[(i + 1) % rollers.length].to]);\r
    }\r
\r
    const rollersToAdd = [];\r
\r
    // for EVERY line, check if it crosses another line\r
    for (const line of allLines) {\r
      for (const line2 of allLines) {\r
        // skip if it's the same line\r
        if (line === line2) continue;\r
\r
        if (segmentsIntersect(line, line2)) {\r
          return true;\r
        }\r
      }\r
\r
      // also check if it crosses a circle\r
      for (let i = 0; i < rollers.length; i++) {\r
        const roller = rollers[i];\r
        if (segmentFullyCrossesCircle(roller, line)) {\r
          return true;\r
        }\r
      }\r
    }\r
    return false;\r
  }\r
\r
  function computeUpdatedRollersLists(node, newloc, beltKeys) {\r
    const newRollersLists = {};\r
    for (const beltKey of beltKeys) {\r
      newRollersLists[beltKey] = recalcRollerLists(beltKey, node, newloc);\r
    }\r
\r
    return newRollersLists;\r
  }\r
\r
\r
\r
  function moveNode(node, newRollersLists, beltKeys) {\r
    for (beltKey of beltKeys) {\r
      beltGeom(newRollersLists[beltKey].ordered, beltKey);\r
      rollersLists[beltKey] = newRollersLists[beltKey];\r
    }\r
  }\r
\r
  function drawBelt(beltKey) {\r
    const { ordered, unordered } = recalcRollerLists(beltKey);\r
    beltGeom(ordered, beltKey);\r
    rollersLists[beltKey].ordered = {\r
      ordered: ordered,\r
      unordered: unordered\r
    };\r
  }\r
\r
  function rollerDragComputation(node, newloc, snaploc) {\r
    // don't allow rollers or drums to overlap each other\r
    let oldloc = node.location;\r
\r
    // prevents rollers from jumping around when dragged where they're not supposed to be\r
    // this is what makes moving rollers slower though\r
    newloc = clampDistance(newloc, oldloc);\r
\r
    const beltKeys = getNodesBeltKeys(node);\r
    const newRollersLists = computeUpdatedRollersLists(node, newloc, beltKeys);\r
    if (!isNodeMoveAllowed(node, newloc, beltKeys)) {\r
      return oldloc;\r
    } else {\r
      moveNode(node, newRollersLists, beltKeys);\r
    }\r
\r
    myDiagram.updateAllTargetBindings();\r
\r
    // rounds so we only have integer locations\r
    return new go.Point(Math.round(newloc.x), Math.round(newloc.y));\r
  }\r
\r
  function isNodeMoveAllowed(node, newloc, beltKeys) {\r
    if (areRollersOverlapping(node, newloc)) return false;\r
    for (const beltKey of beltKeys) {\r
      let { ordered, unordered } = recalcRollerLists(beltKey, node, newloc);\r
      if (areOverlappingLines(ordered)) {\r
        return false;\r
      }\r
    }\r
    return true;\r
  }\r
  // =================== INIT ===================\r
\r
  function startAnimation() {\r
    // Animate the flow in the pipes\r
    let animation = new go.Animation();\r
    animation.easing = go.Animation.EaseLinear;\r
    animation.duration = 1000; // 1 second instead of default 600 milliseconds\r
    myDiagram.nodes.each(node => {\r
      if (node.category !== 'Belt') return;\r
      const belt = node.findObject('BELT');\r
      // animate the strokeDashOffset from 36 to 0 create the illusion of a moving belt\r
      animation.add(belt, 'strokeDashOffset', 36, 0);\r
    });\r
    // Run indefinitely\r
    animation.runCount = Infinity;\r
    animation.start();\r
\r
    const beltKeys = getAllBeltKeys();\r
    orderRollers(beltKeys);\r
    drawAllInitialBelts(beltKeys);\r
  }\r
\r
  function init() {\r
    // initialize the GoJS Diagram\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'undoManager.isEnabled': true\r
    });\r
\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
    });\r
\r
    myDiagram.nodeTemplateMap.add('Roller', rollerTemplate);\r
    myDiagram.nodeTemplateMap.add('Belt', beltTemplate);\r
\r
    myDiagram.model = new go.GraphLinksModel(modelTemplate);\r
\r
    startAnimation();\r
    save(); // initial model appears in the textarea\r
  }\r
  document.addEventListener('DOMContentLoaded', init);\r
\r
  // =================== SAVE AND LOAD ===================\r
\r
  function save() {\r
    myDiagram.startTransaction('save');\r
    // save it in the order it currently is in\r
    for (let beltKey in rollersLists) {\r
      const guides = [];\r
      for (let roller of [\r
        ...rollersLists[beltKey].ordered,\r
        ...rollersLists[beltKey].unordered\r
      ]) {\r
        const obj = { k: roller.key };\r
        if (roller.outside) {\r
          obj.outside = true;\r
        }\r
        if (roller.touchingBelt) {\r
          obj.touchingBelt = true;\r
        }\r
        guides.push(obj);\r
      }\r
      const beltNode = myDiagram.model.findNodeDataForKey(beltKey);\r
      myDiagram.model.set(beltNode, 'guides', guides);\r
    }\r
    document.getElementById('mySavedModel').value = myDiagram.model.toJson();\r
    myDiagram.isModified = false;\r
    myDiagram.commitTransaction('save');\r
  }\r
\r
  function load() {\r
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);\r
\r
    for (const data of myDiagram.model.nodeDataArray) {\r
      if (!data.diameter && data.category === 'Roller') {\r
        myDiagram.model.set(data, 'diameter', ROLLER_DEFAULT_DIAMETER);\r
      }\r
    }\r
\r
    startAnimation();\r
  }`,cssCode:`#myDiagramDiv {\r
    width: 900px;\r
    height: 800px;\r
    background-color: #262626;\r
  }\r
\r
  code {\r
    font-family: monospace;\r
    background-color: #d3d3d3;\r
    padding: 0 3px;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample uses <a>Animation</a>s and <a>Node</a>s to give the illusion of a\r
    continuous conveyor belt. The belt is guided by rollers and bends around them using a\r
    custom <a>Geometry</a> built of\r
    <code><a href="../api/symbols/PathSegment.html">PathSegments</a></code\r
    >. Each <code>PathSegment</code> is either a line segment between two rollers or an\r
    arc wrapping around a roller.\r
  </p>\r
  <p>\r
    Rollers can be dragged around, and the belt will update automatically. The program\r
    prevents you from moving the rollers in a way that would make:\r
  </p>\r
  <ul>\r
    <li>a belt overlap itself</li>\r
    <li>a belt go through its rollers</li>\r
    <li>a roller overlap another roller in the same belt</li>\r
  </ul>\r
  <p>\r
    Rollers can be contained to one belt or be part of multiple belts. In the model, the\r
    <code>guides</code> list for a belt defines the rollers that can interact with the\r
    belt. Some rollers in this sample have a fill color, meaning that they are part of\r
    both belts shown. Try it out: you'll see that normal rollers will go right through\r
    other belts, but rollers with a fill color will affect both belts.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`animation`,`geometries`];var g=y();l(`v3dh35`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};