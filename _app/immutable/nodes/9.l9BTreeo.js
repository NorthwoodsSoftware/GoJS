import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Animation`,figures:!0},htmlContent:`<h1>GoJS animation</h1>\r
<p>\r
  GoJS offers several built-in animations, enabled by default, as well as the ability to create arbitrary animations.\r
</p>\r
<p>\r
  The <a href="../api/symbols/Diagram.html#animationmanager" target="api">Diagram.animationManager</a> handles animations within a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>.\r
  The <a href="../api/symbols/AnimationManager.html" target="api">AnimationManager</a> automatically sets up and dispatches default animations, and has properties to customize and disable them.\r
  Custom animations are possible by creating instances of <a href="../api/symbols/Animation.html" target="api">Animation</a> or <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>.\r
</p>\r
\r
<div class="box bg-info">\r
  <p>\r
    This introduction page details the different classes used for GoJS animation.\r
  </p>\r
  <p class="mb-0">\r
    To see more demonstrations of custom animations, visit the <a href="../samples/customAnimations">Custom Animations extension sample</a>.\r
  </p>\r
</div>\r
\r
\r
<h2 id="DefaultAnimations"><a class="not-prose heading-anchor" href="#DefaultAnimations">Default animations</a></h2>\r
\r
<p>\r
  By default, the AnimationManager creates and runs several animations for its Diagram using a single\r
  instance of Animation, the <a href="../api/symbols/AnimationManager.html#defaultanimation" target="api">AnimationManager.defaultAnimation</a>.\r
  These animations occur on various commands, when the <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a> setter is used, and upon changing the layout.\r
  Unlike other Animations, they will be stopped if a new transaction is started during animation.\r
</p>\r
<p>\r
  GoJS will begin an animation automatically for these reasons:\r
</p>\r
\r
<p>\r
  Invoked by <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>:\r
</p>\r
<ul>\r
  <li>"Collapse SubGraph" - Animates the collapsing nodes by "disappearing" them, animating their scales and positions into their group.</li>\r
  <li>"Expand SubGraph" - Expands groups by animating the scales and positions of nodes starting within the collapsed group.</li>\r
  <li>"Collapse Tree" - Animates the collapsing nodes by "disappearing" them, animating their scales and positions into the root node.</li>\r
  <li>"Expand Tree" - Expands subtrees by animating the scales and positions of descendant nodes starting within the collapsed root node.</li>\r
  <li>"Scroll To Part" - Animates the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> and may expand groups or expand subtrees to make the node visible.</li>\r
  <li>"Zoom To Fit" - Animates the <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> and <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a>.</li>\r
</ul>\r
\r
<p>\r
  Invoked by <a href="../api/symbols/Diagram.html" target="api">Diagram</a>:\r
</p>\r
<ul>\r
<li>"Model" - Animates all node positions when a new model is set.</li>\r
<li>"Layout" - Animates all changed node positions on a layout.</li>\r
</ul>\r
\r
\r
<p>\r
  Invoked by <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>s, if any are declared.\r
</p>\r
\r
<p>\r
The above quoted names are strings passed to <a href="../api/symbols/AnimationManager.html#canstart" target="api">AnimationManager.canStart</a>\r
This method can be overridden to return <code>false</code> if you wish to stop specific automatic animations.\r
</p>\r
\r
<h3 id="DefaultAnimations"><a class="not-prose heading-anchor" href="#DefaultAnimations">Default initial animation</a></h3>\r
\r
<p>\r
  The default initial animation fades the diagram upwards into view. However as of GoJS 4.0, the default loading animation is turned off by default.\r
  You can turn it on by setting <a href="../api/symbols/AnimationManager.html#isinitial" target="api">AnimationManager.isInitial</a> to <code>true</code>.\r
  To control the initial animation behavior, there exists <a href="../api/symbols/AnimationManager.html#initialanimationstyle" target="api">AnimationManager.initialAnimationStyle</a>.\r
  You can also set this property to <a href="../api/symbols/AnimationStyle.html#none" target="api">AnimationStyle.None</a> and define your own initial animation using the <code>"InitialAnimationStarting"</code> <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a>.\r
</p>\r
\r
<p>\r
  Here is an example with buttons which set <a href="../api/symbols/AnimationManager.html#initialanimationstyle" target="api">AnimationManager.initialAnimationStyle</a> to the three different values, then reload the Diagram.\r
  A fourth button illustrates how one might use the <code>"InitialAnimationStarting"</code> <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a> to make a custom "zoom in" animation.\r
</p>\r
\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<h3 id="Limitations"><a class="not-prose heading-anchor" href="#Limitations">Limitations of default animations</a></h3>\r
\r
<p>\r
  The AnimationManager can be turned off by setting <a href="../api/symbols/AnimationManager.html#isenabled" target="api">AnimationManager.isEnabled</a> to <code>false</code>.\r
  Specific default animations can be turned off or modified by overriding <a href="../api/symbols/AnimationManager.html#canstart" target="api">AnimationManager.canStart</a>\r
  and returning <code>false</code> as desired.\r
</p>\r
\r
<p>\r
  The default animation will be stopped if a new transaction begins during the animation.\r
  The same is not true of other <a href="../api/symbols/Animation.html" target="api">Animation</a>s, which are not stopped by new transactions, and can continue indefinitely.\r
</p>\r
\r
\r
<h2 id="AnimatableProperties"><a class="not-prose heading-anchor" href="#AnimatableProperties">Animatable properties</a></h2>\r
<p>\r
  By default, <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>s and <a href="../api/symbols/Animation.html" target="api">Animation</a>s can animate these properties of GraphObjects:\r
</p>\r
<ul>\r
  <li><code>position</code></li>\r
  <li><code>location</code> (on Parts)</li>\r
  <li><code>scale</code></li>\r
  <li><code>opacity</code></li>\r
  <li><code>angle</code></li>\r
  <li><code>desiredSize</code></li>\r
  <li><code>background</code> (for solid string colors only)</li>\r
  <li><code>fill</code> (on Shapes, for solid string colors only)</li>\r
  <li><code>strokeWidth</code> (on Shapes)</li>\r
  <li><code>strokeDashOffset</code> (on Shapes)</li>\r
  <li><code>stroke</code> (on Shapes, TextBlocks, for solid string colors only)</li>\r
</ul>\r
\r
<p>\r
  Additionally, <a href="../api/symbols/Animation.html" target="api">Animation</a>s (but not <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>s) can animate these properties of Diagram:\r
</p>\r
<ul>\r
  <li><code>width</code></li>\r
  <li><code>height</code></li>\r
</ul>\r
\r
<p>\r
It is possible to animate other properties if they are defined by the programmer -- see the section "Custom Animation Effects" below.\r
</p>\r
\r
<h2 id="AnimationTriggerClass"><a class="not-prose heading-anchor" href="#AnimationTriggerClass">The AnimationTrigger class</a></h2>\r
\r
<p>\r
  An <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a> is used to declare GraphObject properties to animate when their value has changed.\r
  When a trigger is defined, changes to the target property will animate from the old value to the new value.\r
  In templates, triggers are defined in a similar fashion to Bindings:\r
</p>\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
Here is an example, with an HTML button that sets the <code>position</code> of the clouds to new random values:\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<p>\r
  AnimationTriggers can invoke an animation immediately, starting a new animation with each property of each GraphObject that has been modified,\r
  or they can (much more efficiently) be bundled together into the default\r
  animation (<a href="../api/symbols/AnimationManager.html#defaultanimation" target="api">AnimationManager.defaultAnimation</a>) and begin at the end of the next transaction.\r
  These behaviors can be set with <a href="../api/symbols/AnimationTrigger.html#startcondition" target="api">AnimationTrigger.startCondition</a> by the values\r
  <a href="../api/symbols/TriggerStart.html#immediate" target="api">TriggerStart.Immediate</a> and <a href="../api/symbols/TriggerStart.html#bundled" target="api">TriggerStart.Bundled</a>, respectively.\r
  The default value, <a href="../api/symbols/TriggerStart.html#default" target="api">TriggerStart.Default</a>, attempts to infer which is best.\r
  It will start immediately if there is no ongoing transaction or if <a href="../api/symbols/Diagram.html#skipsundomanager" target="api">Diagram.skipsUndoManager</a> is true.\r
</p>\r
\r
<p>\r
  AnimationTriggers are only definable on GraphObjects in templates, and cannot be used on RowColumnDefinitions or Diagrams.\r
</p>\r
\r
<h2 id="AnimationClass"><a class="not-prose heading-anchor" href="#AnimationClass">The Animation class</a></h2>\r
\r
<p>\r
  General animation of GraphObject and Diagram properties is possible by creating one or more instances of the <a href="../api/symbols/Animation.html" target="api">Animation</a> class.\r
</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  <a href="../api/symbols/Animation.html#add" target="api">Animation.add</a> is used to specify which objects should animate, their properties to animate,\r
  and for each property the starting and ending values:\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  Here's the above animation in an example, where each node is animated by an HTML button.\r
  Note carefully that each node is added to the same animation. The same effect would be had with one animation per node,\r
  but it is always more efficient to group the properties you are animating into a single animation, if possible\r
  (for instance, it is possible if they are all going to start at the same time and have the same duration).\r
</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
\r
\r
\r
<p>\r
  Animating the Diagram is possible by passing it as the object to be animated:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>\r
  Animations can also be reversed, as is common with animations that are intended to be cosmetic in nature, by setting <a href="../api/symbols/Animation.html#reversible" target="api">Animation.reversible</a> to true.\r
  This doubles the effective duration of the Animation.\r
</p>\r
<p>\r
  Below are several example Animations, all with <a href="../api/symbols/Animation.html#reversible" target="api">Animation.reversible</a> set to true. The first animates Nodes, the other three animate Diagram position and scale.\r
</p>\r
\r
<!-- CODE_BLOCK_7 -->\r
  <p>\r
    Without the call to <a href="../api/symbols/AnimationManager.html#stopanimation" target="api">AnimationManager.stopAnimation</a> to protect against rapid button clicks,\r
    you would notice that if you clicked Zoom Out, and then during the animation clicked the same button again,\r
    the Diagram's scale would not return to its initial value of 1.0.\r
    This is because the Animation animates from the <em>current</em> Diagram scale value, to its final value, and back again,\r
    but the current value is also what's being changed due to the ongoing animation.\r
  </p>\r
\r
  <h3 id="CustomAnimationEffects"><a class="not-prose heading-anchor" href="#CustomAnimationEffects">Custom animation effects</a></h3>\r
\r
  <p>\r
    It is sometimes helpful to add custom ways to modify one or more properties during an animation.\r
    You can register new animatable effects with <a href="../api/symbols/AnimationManager.html#defineanimationeffect" target="api">AnimationManager.defineAnimationEffect</a>.\r
    The name passed is an arbitrary string, but often reflects a property of a GraphObject class.\r
    The body of the function passed determines what property or properties are animated.\r
  </p>\r
  <p>\r
\r
  </p>\r
  <p>\r
    Here is an example, creating an <code>"fraction"</code> Animation effect to animate the value of <a href="../api/symbols/GraphObject.html#segmentfraction" target="api">GraphObject.segmentFraction</a>,\r
    which will give the appearance of a Link label moving along its path.\r
  </p>\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  After defining this, we can use it as a property name in an Animation.\r
  The following example sets up an indefinite (<a href="../api/symbols/Animation.html#runcount" target="api">Animation.runCount</a> = <code>Infinity</code>) and reversible\r
  animation, where each link is assigned a random duration to cycle the fill color and segmentFraction of its label.\r
  This produces labels that appear to move along their path while pulsating colors. The setting of <a href="../api/symbols/Animation.html#reversible" target="api">Animation.reversible</a>\r
  causes them to go backwards once finished, to start from their beginning again.\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
\r
<!-- CODE_BLOCK_10 -->\r
\r
<p>\r
  Since <a href="../api/symbols/Animation.html#runcount" target="api">Animation.runCount</a> was set to <code>Infinity</code>, this Animation will run indefinitely.\r
</p>\r
<p>\r
  <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>s for <code>stroke</code> and <code>fill</code> only work on solid colors (i.e. not gradients).\r
  However, you can define your own gradient color animation using <a href="../api/symbols/AnimationManager.html#defineanimationeffect" target="api">AnimationManager.defineAnimationEffect</a>.\r
  Below is an example of how you could do this:\r
</p>\r
\r
<!-- CODE_BLOCK_11 -->\r
\r
<h3 id="AnimatingDeletion"><a class="not-prose heading-anchor" href="#AnimatingDeletion">Animating deletion</a></h3>\r
\r
<p>\r
  Parts to be deleted can be animated, but since they will no longer exist in the Diagram after removal,\r
  a copy must be added to the Animation so that there is an object to animate.\r
  This can be done with <a href="../api/symbols/Animation.html#addtemporarypart" target="api">Animation.addTemporaryPart</a>.\r
  The part can then have its deletion animated using <a href="../api/symbols/Animation.html#add" target="api">Animation.add</a>.\r
  This temporary part will be the object that animates,\r
  and will automatically appear when animation begins and be removed when animation completes.\r
  It is typical for deletion animations to shrink the mock Part, move it off-screen, reduce its opacity to zero,\r
  or otherwise show it disappearing in some way.\r
</p>\r
<p>\r
  In this example, each Part being deleted will be scaled to an imperceptible size (by animating scale to 0.01)\r
  and spun around (by animating angle), to give the appearance of swirling away. There are other example\r
  deletion (and creation) effects in the <a href="../samples/customAnimations">Custom Animations extension sample</a>.\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
\r
\r
<!-- CODE_BLOCK_13 -->\r
\r
\r
\r
<h3 id="AnimationExamples"><a class="not-prose heading-anchor" href="#AnimationExamples">Animation examples</a></h3>\r
\r
<p>\r
  To see more examples of custom animations, visit the <a href="../samples/customAnimations">Custom Animations extension sample</a>.\r
  It demonstrates a number of Node creation/deletion animations, linking animations, and more.\r
  There are also several samples which contain animation:\r
</p>\r
\r
<ul>\r
  <li><a href="../samples/animatedFocus" target="_blank">Animated Focus</a> - Scroll to center a Node in the viewport, while zooming a copy of that node for attention.</li>\r
  <li><a href="../samples/treeLoadAnimation" target="_blank">Tree Load Animation</a> - Recursive animation upon model load.</li>\r
  <li><a href="../samples/dataVisualization" target="_blank">Data Visualization</a> - Nodes now move using an <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>.</li>\r
  <li><a href="../samples/kittenMonitor" target="_blank">Kitten Monitor</a> - Kittens now move using an <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>.</li>\r
  <li><a href="../samples/processFlow" target="_blank">Process Flow</a> - Custom animation defined to animate the Link Shape's strokeDashArray.</li>\r
  <li><a href="../samples/belts" target="_blank">Belts and Rollers</a> - Apparent movement of the belts by animating the strokeDashArray.</li>\r
  <li><a href="../samples/shopFloorMonitor" target="_blank">Shop Floor Monitor</a> - Link color changes now use an <a href="../api/symbols/AnimationTrigger.html" target="api">AnimationTrigger</a>.</li>\r
  <li><a href="../samples/stateChart" target="_blank">State Chart</a> - Initial animation is disabled in favor of a custom zoom fade-in animation.</li>\r
</ul>\r
`,codeBlocks:[{id:`animationStyles`,code:`diagram.div.style.backgroundColor = "#27272a";\r
diagram.animationManager.isInitial = true;  // defaults to false\r
\r
const animation = diagram.animationManager.defaultAnimation;\r
\r
function customAnimation() {\r
  animation.easing = go.Animation.EaseOutExpo;\r
  animation.duration = 1500;\r
  animation.add(diagram, 'scale', 0.1, 1);\r
  animation.add(diagram, 'opacity', 0, 1);\r
}\r
\r
function animate(style, custom = false) {\r
  // set to defaults\r
  diagram.animationManager.initialAnimationStyle = style;\r
  animation.easing = go.Animation.EaseInOutQuad;\r
  animation.duration = 600;\r
\r
  diagram.removeDiagramListener("InitialAnimationStarting", customAnimation);\r
  if (custom) {\r
    diagram.addDiagramListener("InitialAnimationStarting", customAnimation);\r
  }\r
\r
  // forces diagram to rebuild, triggering the initial animation\r
  diagram.model = go.Model.fromJson(diagram.model.toJson());\r
}\r
\r
window.animateDefault   = () => animate(go.AnimationStyle.Default);\r
window.animateLocations = () => animate(go.AnimationStyle.AnimateLocations);\r
window.animateNone      = () => animate(go.AnimationStyle.None);\r
window.animateCustom    = () => animate(go.AnimationStyle.None, true);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Vertical", {\r
    locationSpot: go.Spot.Center\r
  })\r
  .bind("location", "loc", go.Point.parse)\r
  .add(\r
    new go.Shape("Circle", {\r
      width: 8,\r
      height: 8,\r
      fill: "white",\r
      strokeWidth: 0,\r
    })\r
  );\r
\r
diagram.linkTemplate = new go.Link()\r
  .add(new go.Shape({ stroke: "rgba(255, 255, 255, 0.15)" }));\r
\r
const nodeDataArray = [\r
  { key: "Alkaid", loc: "30 140" },\r
  { key: "Mizar",  loc: "90 110" },\r
  { key: "Alioth", loc: "150 95" },\r
  { key: "Megrez", loc: "220 90" },\r
  { key: "Phecda", loc: "230 160" },\r
  { key: "Merak",  loc: "310 150" },\r
  { key: "Dubhe",  loc: "320 70" }\r
];\r
const linkDataArray = [\r
  { from: "Alkaid", to: "Mizar" },\r
  { from: "Mizar", to: "Alioth" },\r
  { from: "Alioth", to: "Megrez" },\r
  { from: "Megrez", to: "Phecda" },\r
  { from: "Phecda", to: "Merak" },\r
  { from: "Merak", to: "Dubhe" },\r
  { from: "Dubhe", to: "Megrez" }\r
];\r
\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!0,html:`<div style="text-align:center;"><p>animationStyle:</p>
  <button onclick="animateDefault()">Default</button>
  <button onclick="animateLocations()">AnimateLocations</button>
  <button onclick="animateNone()">None (does nothing!)</button>
  <button onclick="animateCustom()">None + Custom Animation</button>
</div>`,language:`js`,initiallyVisible:!0},{id:null,code:`// In this shape definition, one trigger is defined on a Shape.\r
// It will cause all changes to Shape.fill to animate\r
// from their old values to their new values.\r
new go.Shape("Rectangle", { strokeWidth: 12, stroke: 'black', fill: 'white' })\r
  .trigger('fill')`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`animateTrigger1`,code:`diagram.div.style.backgroundColor = "#A0E0FF";\r
\r
// cloud template\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("position", "loc")\r
    // Notice that if you get rid of the line below,\r
    // then the clouds will change position without animating\r
    .trigger('position')\r
    .add(\r
      new go.Shape("Cloud", {\r
        width: 120, height: 70,\r
        strokeWidth: 4, stroke: "darkgray",\r
        fill: "white"\r
      })\r
    );\r
\r
// sun\r
diagram.add(new go.Node({ position: new go.Point(200, 20) })\r
  .add(\r
    new go.Shape("EightPointedStar", { strokeWidth: 5, stroke: "goldenrod", fill: "#FFF066" })\r
  )\r
);\r
\r
// cloud data\r
diagram.model = new go.Model([\r
  { loc: new go.Point(40, 90) },\r
  { loc: new go.Point(180, 140) },\r
  { loc: new go.Point(320, 80) }\r
]);\r
\r
// attach this Diagram to the window to use a button\r
window.animateTrigger1 = () => {\r
  diagram.model.commit(model => {\r
    model.nodeDataArray.forEach(data => {\r
      const newX = Math.random() * 400;\r
      const newY = 60 + Math.random() * 120;\r
\r
      // changing the property automatically triggers the template's animation\r
      model.setDataProperty(data, "loc", new go.Point(newX, newY));\r
    });\r
  });\r
}`,isExecutable:!0,animation:!0,html:`<div>
  <button onclick="animateTrigger1()">Animate Clouds</button>
</div>`,minHeight:0,highlight:[9,40],language:`js`,initiallyVisible:!0},{id:null,code:`const animation = new go.Animation();\r
// Animate the node's angle from its current value to a random value between 0 and 180 degrees\r
animation.add(node, "angle", node.angle, Math.random() * 180);\r
animation.duration = 1000; // Animate over 1 second, instead of the default 600 milliseconds\r
animation.start(); // starts the animation immediately`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`animation.add(GraphObjectOrDiagram, "EffectName", StartingValue, EndingValue);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`animate1`,code:`// define a simple Node template\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { locationSpot: go.Spot.Center, margin: 100 })\r
    .bind("angle")\r
    .add(\r
      new go.Shape("Hand", { strokeWidth: 5, width: 75, height: 75, scale: 1.2, margin: 20 })\r
        .bind("fill", "color")\r
        .bind("stroke", "color", c => go.Brush.mix(c, "black"))\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, color: "#45425A" /* purple */ },\r
    { key: 2, color: "#F97068" /* pink */, angle: 90 },\r
    { key: 3, group: 'G1',  color: "#6C7D47" /* green */, angle: 270 },\r
    { key: 4, group: 'G1',  color: "white", angle: 180 }\r
  ]);\r
\r
window.animate1 = () => {\r
  const animation = new go.Animation();\r
  diagram.nodes.each(node => {\r
    // Animate the clockwise turning of a node from its current angle to a random value\r
    animation.add(node, "angle", node.angle, node.angle + Math.random() * 180);\r
  });\r
  animation.duration = 1000; // Animate over 1 second, instead of the default 600 milliseconds\r
  animation.start(); // starts the animation immediately\r
}`,isExecutable:!0,animation:!0,expanded:!0,html:` <p> <button onclick="animate1()">Animate Node Angles</button> </p> `,highlight:[23],language:`js`,initiallyVisible:!0},{id:null,code:`animation.add(myDiagram, "position", myDiagram.position, myDiagram.position.copy().offset(200, 15));\r
  ...\r
  animation.add(myDiagram, "scale", myDiagram.scale, 0.2);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`animate2`,code:`// define a simple Node template\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { locationSpot: go.Spot.Center, margin: 100 })\r
    .bind("angle")\r
    .add(\r
      new go.Shape("Hand", { strokeWidth: 5, width: 75, height: 75, margin: 20 })\r
        .bind("fill", "color")\r
        .bind("stroke", "color", c => go.Brush.mix(c, "black"))\r
    );\r
\r
diagram.model = new go.Model(\r
  [\r
    { key: 1, color: "#45425A" /* purple */ },\r
    { key: 2, color: "#F97068" /* pink */, angle: 90 },\r
    { key: 3, group: 'G1',  color: "#6C7D47" /* green */, angle: 270 },\r
    { key: 4, group: 'G1',  color: "white", angle: 180 }\r
  ]);\r
\r
function makeButtonAnimation(f) {  // return a button event handler to start an animation\r
  return () => {\r
    // Stop any currently running animations\r
    diagram.animationManager.stopAnimation(true);\r
\r
    const animation = new go.Animation();\r
    animation.reversible = true; // reverse the animation at the end, doubling its total time\r
    f(animation);  // initialize the Animation\r
    animation.start(); // start the animation immediately\r
  };\r
}\r
\r
window.animateAngleReverse =\r
  makeButtonAnimation(animation => {\r
    diagram.nodes.each(node => {\r
      // Animate the node's angle from its current value a random value between 0 and 90\r
      animation.add(node, "angle", node.angle, Math.random() * 90);\r
    });\r
  });\r
\r
window.animateDiagramPosition =\r
  makeButtonAnimation(animation => {\r
    // shift the diagram contents towards the right and then back\r
    animation.add(diagram, "position", diagram.position, diagram.position.copy().offset(100, 15));\r
    animation.duration = 700;\r
  });\r
\r
window.animateZoomOut =\r
  makeButtonAnimation(animation => {\r
    animation.add(diagram, "scale", diagram.scale, 0.2);\r
  });\r
\r
window.animateZoomIn =\r
  makeButtonAnimation(animation => {\r
    animation.add(diagram, "scale", diagram.scale, 4);\r
  });`,isExecutable:!0,animation:!0,html:`
  <p>
    <button onclick="animateAngleReverse()">Animate Angles (reverse)</button>
    <button onclick="animateDiagramPosition()">Animate Diagram Position (reverse)</button>
    <button onclick="animateZoomOut()">Zoom Out (reverse)</button>
    <button onclick="animateZoomIn()">Zoom In (reverse)</button>
  </p>
  `,language:`js`,initiallyVisible:!0},{id:null,code:`// This presumes the object to be animated is a label within a Link\r
go.AnimationManager.defineAnimationEffect('fraction',\r
(obj, startValue, endValue, easing, currentTime, duration, animation) => {\r
  obj.segmentFraction = easing(currentTime, startValue, endValue - startValue, duration);\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`function animateColorAndFraction() {\r
    // create one Animation for each link, so that they have independent durations\r
    myDiagram.links.each(link => {\r
      const animation = new go.Animation()\r
      animation.add(link.elt(1), "fill", link.elt(0).fill, go.Brush.randomColor());\r
      animation.add(link.elt(1), "fraction", 0, 1);\r
      animation.duration = 1000 + (Math.random()*2000);\r
      animation.reversible = true; // Re-run backwards\r
      animation.runCount = Infinity; // Animate forever\r
      animation.start();\r
    });\r
  }`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`animate3`,code:`// This presumes the object to be animated is a label within a Link\r
// since the segmentFraction value only exists on Links\r
go.AnimationManager.defineAnimationEffect('fraction',\r
  (obj, startValue, endValue, easing, currentTime, duration, animation) => {\r
    obj.segmentFraction = easing(currentTime, startValue, endValue - startValue, duration);\r
  }\r
);\r
\r
window.animateColorAndFraction = () => {\r
  // create one Animation for each link, so that they have independent durations\r
  diagram.links.each(link => {\r
    const animation = new go.Animation();\r
    const indicator = link.elt(1); // target the circle shape\r
\r
    animation.add(indicator, 'fill', 'seagreen', 'crimson');\r
    animation.add(indicator, 'fraction', 0, 1);\r
\r
    animation.duration = 2000 + (Math.random() * 2000);\r
    animation.reversible = true; // Re-run backwards\r
    animation.runCount = Infinity; // Animate forever\r
    animation.start();\r
  });\r
};\r
\r
diagram.layout = new go.GridLayout({\r
  wrappingColumn: 2,\r
  spacing: new go.Size(150, 30)\r
});\r
\r
diagram.linkTemplate = new go.Link()\r
  .add(\r
    // line\r
    new go.Shape({ strokeWidth: 2, stroke: 'lightgray' }),\r
\r
    // moving budget indicator\r
    new go.Shape('Circle', {\r
      segmentIndex: 0,\r
      width: 20,\r
      height: 20,\r
      fill: 'seagreen',\r
      strokeWidth: 2,\r
      stroke: 'white'\r
    })\r
  );\r
\r
diagram.nodeTemplate = new go.Node('Auto')\r
  .add(\r
    new go.Shape('MinusLine', {\r
      stroke: 'lightgray',\r
      strokeWidth: 2,\r
      angle: 90,\r
      width: 20\r
    })\r
  );\r
\r
const nodeDataArray = [];\r
const links = [];\r
for (let i = 0; i < 3; i++) {\r
  const i1 = \`\${i}-1\`, i2 = \`\${i}-2\`\r
  nodeDataArray.push({ key: i1 }, { key: i2 });\r
  links.push( { from: i1, to: i2 } );\r
}\r
diagram.model = new go.GraphLinksModel(nodeDataArray, links);`,isExecutable:!0,animation:!0,html:`<div><button onclick="animateColorAndFraction()">Animate Color and Segment Fraction</button></div>`,language:`js`,initiallyVisible:!1},{id:`animateGradient`,code:`go.AnimationManager.defineAnimationEffect('gradientFill', (shape, startColors, endColors, easing, currentTime, duration) => {\r
  const progress = easing(currentTime, 0, 1, duration);\r
\r
  const color0 = go.Brush.mix(startColors[0], endColors[0], progress);\r
  const color1 = go.Brush.mix(startColors[1], endColors[1], progress);\r
\r
  shape.fill = new go.Brush("Linear", { 0.0: color0, 1.0: color1 });\r
});\r
\r
const colors = [ "blue", "#F97068" ];\r
\r
let status = 0;\r
\r
diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        name: "SHAPE",\r
        strokeWidth: 0,\r
        height: 200,\r
        fill: new go.Brush("Linear", { 0.0: colors[0], 1.0: colors[1] })\r
      })\r
    )\r
);\r
\r
window.animateGradient = () => {\r
  diagram.commit(diag => {\r
    const oldStatus = status;\r
    status = (status + 1) % 2;\r
\r
    const node = diag.nodes.first();\r
    const shape = node.findObject("SHAPE");\r
\r
    const startColors = oldStatus === 0 ? [colors[0], colors[1]] : [colors[1], colors[0]];\r
    const endColors = status === 0 ? [colors[0], colors[1]] : [colors[1], colors[0]];\r
\r
    const anim = new go.Animation();\r
    anim.duration = 600;\r
\r
    // Use the custom 'gradientFill' effect we registered above\r
    anim.add(shape, "gradientFill", startColors, endColors);\r
\r
    anim.start();\r
  });\r
}`,isExecutable:!0,animation:!0,html:`<div><button onclick="animateGradient()">Animate Gradient</button></div>`,language:`js`,initiallyVisible:!1},{id:null,code:`myDiagram.addDiagramListener('SelectionDeleting', e => {\r
  // the DiagramEvent.subject is the collection of Parts about to be deleted\r
  e.subject.each(part => {\r
    if (!(part instanceof go.Node)) return; // only animate Nodes\r
    const animation = new go.Animation();\r
    const deletePart = part.copy();\r
    animation.add(deletePart, "scale", deletePart.scale, 0.01);\r
    animation.add(deletePart, "angle", deletePart.angle, 360);\r
    animation.addTemporaryPart(deletePart, myDiagram);\r
    animation.start();\r
  });\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`animate4`,code:`diagram.addDiagramListener('SelectionDeleting', e => {\r
  // the DiagramEvent.subject is the collection of Parts about to be deleted\r
  e.subject.each(part => {\r
    if (!(part instanceof go.Node)) return; // only animate Nodes\r
    const animation = new go.Animation();\r
    const deletePart = part.copy();\r
    animation.add(deletePart, "scale", deletePart.scale, 0.01);\r
    animation.add(deletePart, "angle", deletePart.angle, 360);\r
    animation.addTemporaryPart(deletePart, diagram);\r
    animation.start();\r
  });\r
});\r
\r
window.deleteNode = () => {\r
  if (diagram.selection.count === 0) diagram.select(diagram.nodes.first());\r
  diagram.commandHandler.deleteSelection();\r
}\r
\r
  // define a simple Node template\r
diagram.nodeTemplate =\r
  new go.Node("Spot", { locationSpot: go.Spot.Center })\r
    .bind("angle")\r
    .add(\r
      new go.Shape("Circle", {\r
        fill: null,\r
        stroke: "lightgray",\r
        strokeDashArray: [8, 8],\r
        width: 75, height: 75\r
      }),\r
      new go.Shape("Circle",\r
        {\r
          strokeWidth: 2,\r
          width: 58, height: 58\r
        })\r
          .bind("fill"),\r
      new go.TextBlock({\r
        font: "bold 13px system-ui"\r
      })\r
        .bind("text", "name")\r
    );\r
\r
const nodeDataArray = [\r
  { name: "Alpha" },\r
  { name: "Beta" },\r
  { name: "Gamma" },\r
  { name: "Delta" }\r
];\r
nodeDataArray.forEach(n => {n.fill = "hsl(" + ((Math.random() * 360) | 0) + ", 65%, 85%)" });\r
diagram.model = new go.GraphLinksModel(nodeDataArray);`,isExecutable:!0,animation:!0,html:`<p><button onclick="deleteNode()">Delete a Node</button></p>`,language:`js`,initiallyVisible:!1}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`mda8yk`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};