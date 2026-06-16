import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Tools`,figures:!0},htmlContent:`<h1>Tools</h1>\r
<p>\r
  <a href="../api/symbols/Tool.html" target="api">Tool</a>s handle all of the input events.\r
  There are many kinds of predefined Tool classes that implement all of the common operations that users do.\r
</p>\r
<p>\r
  For flexibility and simplicity, all input events are canonicalized as <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s and\r
  redirected by the diagram to go to the <a href="../api/symbols/Diagram.html#currenttool" target="api">Diagram.currentTool</a>.\r
  By default, the Diagram.currentTool is an instance of <a href="../api/symbols/ToolManager.html" target="api">ToolManager</a> held as the <a href="../api/symbols/Diagram.html#toolmanager" target="api">Diagram.toolManager</a>.\r
  The ToolManager implements support for all mode-less tools.\r
  The ToolManager is responsible for finding another tool that is ready to run and then making it the new current tool.\r
  This causes the new tool to process all of the input events (mouse, keyboard, and touch) until the tool decides\r
  that it is finished, at which time the diagram's current tool reverts back to the <a href="../api/symbols/Diagram.html#defaulttool" target="api">Diagram.defaultTool</a>,\r
  which is normally the ToolManager, again.\r
</p>\r
<p>\r
  Although the terminology includes the word "mouse", often that refers to both mouse events and touch events.\r
</p>\r
<p>\r
  See samples that make use of <a href="../api/symbols/Tool.html" target="api">Tool</a>s in the <a href="../samples/#tools">samples index</a>.\r
</p>\r
\r
<h2 id="PredefinedTools"><a class="not-prose heading-anchor" href="#PredefinedTools">Predefined Tools</a></h2>\r
<p>\r
  Each <a href="../api/symbols/Diagram.html" target="api">Diagram</a> has an instance of most of the tool classes, all managed by the diagram's <a href="../api/symbols/ToolManager.html" target="api">ToolManager</a>.\r
  If you want to change the interactive behavior, in many common cases you may be able to do so by setting properties\r
  on the <a href="../api/symbols/Diagram.html" target="api">Diagram</a>, on your <a href="../api/symbols/Part.html" target="api">Part</a>s, or on individual <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s.\r
  But more generally you may need to modify one or more of the tools, which are accessible as properties of the <a href="../api/symbols/Diagram.html#toolmanager" target="api">Diagram.toolManager</a>.\r
</p>\r
\r
<p>\r
  Some tools want to run when a mouse-down occurs. These tools include:\r
</p>\r
<table>\r
  <thead>\r
    <tr>\r
      <th>Tool</th>\r
      <th>Class</th>\r
      <th>Purpose</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#actiontool" target="api">ToolManager.actionTool</a></td>\r
      <td><a href="../api/symbols/ActionTool.html" target="api">ActionTool</a></td>\r
      <td>for allowing "buttons" and other <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s to grab events from the regular tools</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#relinkingtool" target="api">ToolManager.relinkingTool</a></td>\r
      <td><a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a></td>\r
      <td>for reconnecting an existing <a href="../api/symbols/Link.html" target="api">Link</a></td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#linkreshapingtool" target="api">ToolManager.linkReshapingTool</a></td>\r
      <td><a href="../api/symbols/LinkReshapingTool.html" target="api">LinkReshapingTool</a></td>\r
      <td>for changing the route of a <a href="../api/symbols/Link.html" target="api">Link</a></td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#resizingtool" target="api">ToolManager.resizingTool</a></td>\r
      <td><a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a></td>\r
      <td>for changing the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> of a <a href="../api/symbols/Part.html" target="api">Part</a> or an object within a <a href="../api/symbols/Part.html" target="api">Part</a></td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#rotatingtool" target="api">ToolManager.rotatingTool</a></td>\r
      <td><a href="../api/symbols/RotatingTool.html" target="api">RotatingTool</a></td>\r
      <td>for changing the <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> of a <a href="../api/symbols/Part.html" target="api">Part</a> or an object within a <a href="../api/symbols/Part.html" target="api">Part</a></td>\r
    </tr>\r
  </tbody>\r
</table>\r
\r
<p>\r
  Some tools want to run when a mouse-move occurs after a mouse-down. These tools include:\r
</p>\r
<table>\r
  <thead>\r
    <tr>\r
      <th>Tool</th>\r
      <th>Class</th>\r
      <th>Purpose</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#linkingtool" target="api">ToolManager.linkingTool</a></td>\r
      <td><a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a></td>\r
      <td>for drawing a new <a href="../api/symbols/Link.html" target="api">Link</a></td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#draggingtool" target="api">ToolManager.draggingTool</a></td>\r
      <td><a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a></td>\r
      <td>for moving or copying selected <a href="../api/symbols/Part.html" target="api">Part</a>s</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#dragselectingtool" target="api">ToolManager.dragSelectingTool</a></td>\r
      <td><a href="../api/symbols/DragSelectingTool.html" target="api">DragSelectingTool</a></td>\r
      <td>for rubber-band selection of some <a href="../api/symbols/Part.html" target="api">Part</a>s within a rectangular area</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#panningtool" target="api">ToolManager.panningTool</a></td>\r
      <td><a href="../api/symbols/PanningTool.html" target="api">PanningTool</a></td>\r
      <td>for panning/scrolling the diagram</td>\r
    </tr>\r
  </tbody>\r
</table>\r
\r
<p>\r
  Some tools only want to run upon a mouse-up event after a mouse-down. These tools include:\r
</p>\r
<table>\r
  <thead>\r
    <tr>\r
      <th>Tool</th>\r
      <th>Class</th>\r
      <th>Purpose</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#contextmenutool" target="api">ToolManager.contextMenuTool</a></td>\r
      <td><a href="../api/symbols/ContextMenuTool.html" target="api">ContextMenuTool</a></td>\r
      <td>for showing a context menu for a <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a></td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#texteditingtool" target="api">ToolManager.textEditingTool</a></td>\r
      <td><a href="../api/symbols/TextEditingTool.html" target="api">TextEditingTool</a></td>\r
      <td>for in-place editing of <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a>s in selected <a href="../api/symbols/Part.html" target="api">Part</a>s</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#clickcreatingtool" target="api">ToolManager.clickCreatingTool</a></td>\r
      <td><a href="../api/symbols/ClickCreatingTool.html" target="api">ClickCreatingTool</a></td>\r
      <td>for inserting a new <a href="../api/symbols/Part.html" target="api">Part</a> when the user clicked</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html#clickselectingtool" target="api">ToolManager.clickSelectingTool</a></td>\r
      <td><a href="../api/symbols/ClickSelectingTool.html" target="api">ClickSelectingTool</a></td>\r
      <td>for selecting or de-selecting a <a href="../api/symbols/Part.html" target="api">Part</a></td>\r
    </tr>\r
  </tbody>\r
</table>\r
\r
<p>\r
  To change the behavior of a tool, you may be able to set properties on the tool, on the <a href="../api/symbols/Diagram.html" target="api">Diagram</a>,\r
  on a particular <a href="../api/symbols/Part.html" target="api">Part</a>, or on a particular <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>.\r
</p>\r
<table>\r
  <thead>\r
    <tr>\r
      <th>Tool</th>\r
      <th>Setting</th>\r
      <th>Effect</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td><a href="../api/symbols/DragSelectingTool.html" target="api">DragSelectingTool</a></td>\r
      <td><code>diagram.toolManager.dragSelectingTool.isEnabled = false;</code></td>\r
      <td>Disable the rubber-band selection tool.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ClickSelectingTool.html" target="api">ClickSelectingTool</a></td>\r
      <td><a href="../api/symbols/Part.html#selectionadornmenttemplate" target="api">Part.selectionAdornmentTemplate</a></td>\r
      <td>Change the appearance of a selected Part (actually its selection Adornment). (See <a href="selection">Selection</a> for more discussion.)</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a></td>\r
      <td><a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a>, <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a></td>\r
      <td>Enable users to draw new links interactively by setting these on the port objects of your nodes.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a></td>\r
      <td><a href="../api/symbols/Part.html#movable" target="api">Part.movable</a></td>\r
      <td>Disable the movement of a Part, including Nodes and Groups, by setting this to false.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a></td>\r
      <td><a href="../api/symbols/Part.html#minlocation" target="api">Part.minLocation</a>, <a href="../api/symbols/Part.html#maxlocation" target="api">Part.maxLocation</a>, <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a></td>\r
      <td>Limit the movement of a Part. For more general limitations, set <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a> to a function that computes the desired new location.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a></td>\r
      <td><a href="../api/symbols/Diagram.html#allowresize" target="api">Diagram.allowResize</a></td>\r
      <td>Disable resizing any part by setting this to false.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ToolManager.html" target="api">ToolManager</a></td>\r
      <td>&mdash;</td>\r
      <td>Tooltips are discussed in <a href="tooltips">ToolTips</a>.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ContextMenuTool.html" target="api">ContextMenuTool</a></td>\r
      <td>&mdash;</td>\r
      <td>Context menus are discussed in <a href="contextMenus">Context Menus</a>.</td>\r
    </tr>\r
  </tbody>\r
</table>\r
<p>\r
  More detail is available in the section about <a href="permissions">Permissions</a>.\r
</p>\r
<p>\r
  Some commonly set properties include:\r
</p>\r
<table>\r
  <thead>\r
    <tr>\r
      <th>Tool</th>\r
      <th>Properties</th>\r
      <th>Effect</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td><a href="../api/symbols/ClickCreatingTool.html" target="api">ClickCreatingTool</a></td>\r
      <td><a href="../api/symbols/ClickCreatingTool.html#archetypenodedata" target="api">ClickCreatingTool.archetypeNodeData</a></td>\r
      <td>Enable inserting parts via double-clicking by setting this to a node data object.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/DragSelectingTool.html" target="api">DragSelectingTool</a></td>\r
      <td><a href="../api/symbols/DragSelectingTool.html#ispartialinclusion" target="api">DragSelectingTool.isPartialInclusion</a></td>\r
      <td>Control what parts become selected.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a></td>\r
      <td><a href="../api/symbols/LinkingTool.html#archetypelinkdata" target="api">LinkingTool.archetypeLinkData</a></td>\r
      <td>Customize the link data that is copied when a new link is drawn.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a></td>\r
      <td><a href="../api/symbols/ResizingTool.html#cellsize" target="api">ResizingTool.cellSize</a>, <a href="../api/symbols/ResizingTool.html#maxsize" target="api">ResizingTool.maxSize</a>, <a href="../api/symbols/ResizingTool.html#minsize" target="api">ResizingTool.minSize</a></td>\r
      <td>Limit how parts are resized.</td>\r
    </tr>\r
    <tr>\r
      <td><a href="../api/symbols/RotatingTool.html" target="api">RotatingTool</a></td>\r
      <td><a href="../api/symbols/RotatingTool.html#snapangleepsilon" target="api">RotatingTool.snapAngleEpsilon</a>, <a href="../api/symbols/RotatingTool.html#snapanglemultiple" target="api">RotatingTool.snapAngleMultiple</a></td>\r
      <td>Limit how parts are rotated.</td>\r
    </tr>\r
  </tbody>\r
</table>\r
<p>\r
  Remember that all of the individual tools are available via the <a href="../api/symbols/Diagram.html#toolmanager" target="api">Diagram.toolManager</a>.\r
  For example, to enable the <a href="../api/symbols/ClickCreatingTool.html" target="api">ClickCreatingTool</a>:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  You can also set tool properties when using the constructor to define your <a href="../api/symbols/Diagram.html" target="api">Diagram</a>:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  At this time the syntax for setting properties on predefined subobjects only works for the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> constructor.\r
</p>\r
\r
<h2 id="ToolLifecycle"><a class="not-prose heading-anchor" href="#ToolLifecycle">The Tool lifecycle</a></h2>\r
<p>\r
  While each prebuilt tool in GoJS is used for a different purpose, all Tools are guaranteed to share some functions and properties.\r
  All tools share a general "lifecycle" -- that is, the order in which these common functions are called.\r
  One can think of this cycle as "starting" when the ToolManager is alerted of some input event and begins searching\r
  through the pertinent list of tools (i.e., if the mouse-down event is registered, ToolManager starts searching its\r
  <a href="../api/symbols/ToolManager.html#mousedowntools" target="api">ToolManager.mouseDownTools</a> list).\r
  Below is a diagram representing the general lifecycle of a tool.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
<p>\r
  For more information on how these specific functions work, see the <a href="../api/symbols/Tool.html" target="api">Tool</a> documentation.\r
</p>\r
\r
<h2 id="ToolsAndAdornments"><a class="not-prose heading-anchor" href="#ToolsAndAdornments">Tools and Adornments</a></h2>\r
<p>\r
  <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s are used for more than indicating that a <a href="../api/symbols/Part.html" target="api">Part</a> is selected.\r
  Each <a href="../api/symbols/Tool.html" target="api">Tool</a> that is in the <a href="../api/symbols/ToolManager.html#mousedowntools" target="api">ToolManager.mouseDownTools</a> list (in other words, any mode-less tool that is started\r
  with a mouse-down or finger-down event) gets the opportunity to add its own Adornments for its own purposes when a Part is selected.\r
</p>\r
\r
<h3 id="ResizingTool"><a class="not-prose heading-anchor" href="#ResizingTool">ResizingTool</a></h3>\r
<p>\r
  When a <a href="../api/symbols/Part.html" target="api">Part</a> is resizable, the <a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a> adds an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> containing eight resize handles,\r
  four at the corners and four at the middles of the sides.\r
</p>\r
<p>\r
  If you want to let the user resize the whole node, just set <a href="../api/symbols/Part.html#resizable" target="api">Part.resizable</a> to true.\r
  In this case resizing will set the Node's <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  If you want the user to resize a particular object within the node, you need to name that object and assign <a href="../api/symbols/Part.html#resizeobjectname" target="api">Part.resizeObjectName</a>.\r
  Resizing will set the <a href="../api/symbols/Part.html#resizeobject" target="api">Part.resizeObject</a>'s <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a>, in this case the Shape's desiredSize.\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  You can limit the minimum and maximum size for the resized object by setting <a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a> and <a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a>.\r
  Note that these GraphObject properties are set on the <a href="../api/symbols/Part.html#resizeobject" target="api">Part.resizeObject</a>, not on the <a href="../api/symbols/Part.html" target="api">Part</a> itself.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  You can also cause resizing to be multiples of a given size by setting <a href="../api/symbols/Part.html#resizecellsize" target="api">Part.resizeCellSize</a>.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>\r
  When an object is resizable, it is commonplace to try to remember the new size by updating the model data,\r
  so that it can be saved and loaded later.\r
  This can be accomplished with a TwoWay <a href="../api/symbols/Binding.html" target="api">Binding</a> on the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> property.\r
  But note that the binding needs to be on the actual GraphObject that is resized, not on the whole Node.\r
  In this case, because the <a href="../api/symbols/Part.html#resizeobjectname" target="api">Part.resizeObjectName</a> is referring to a Shape, that means the binding needs to be on the Shape.\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
<p>\r
  You can customize all eight standard resize handles by setting <a href="../api/symbols/ResizingTool.html#archetypehandle" target="api">ResizingTool.archetypeHandle</a>.\r
  For example, to change all of the handles to be slightly larger yellow circles:\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  Note that the ResizingTool will automatically set each resize handle's <a href="../api/symbols/GraphObject.html#cursor" target="api">GraphObject.cursor</a> appropriately.\r
  Note also that because <a href="../api/symbols/Part.html#selectionadorned" target="api">Part.selectionAdorned</a> is false, there is no blue rectangle default selection adornment.\r
</p>\r
\r
<p>\r
  You can customize the resize handles by setting <a href="../api/symbols/Part.html#resizeadornmenttemplate" target="api">Part.resizeAdornmentTemplate</a>.\r
  For example, to allow the user to only change the width of a Shape in a Node, the <a href="../api/symbols/Adornment.html" target="api">Adornment</a> should have only\r
  two resize handles: one at the left and one at the right.\r
  The Adornment is implemented as a Spot Panel that surrounds a <a href="../api/symbols/Placeholder.html" target="api">Placeholder</a>, representing the adorned Shape,\r
  with two rectangular blue Shapes, each representing a handle.\r
  There is also a TextBlock placed above the adorned shape showing the shape's current width.\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>\r
  There are examples custom resizing tools defined in the samples and extensions directories:\r
  <a href="../samples/ResizeMultiple">Resize Multiple Tool</a>,\r
  <a href="../samples/swimLanes">Lane Resizing Tool (in Swim Lanes)</a>, and\r
  <a href="../samples/swimLanesVertical">Lane Resizing Tool (in Swim Lanes Vertical)</a>.\r
</p>\r
\r
<h3 id="RotatingTool"><a class="not-prose heading-anchor" href="#RotatingTool">RotatingTool</a></h3>\r
<p>\r
  When a <a href="../api/symbols/Part.html" target="api">Part</a> is rotatable, the <a href="../api/symbols/RotatingTool.html" target="api">RotatingTool</a> adds an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> containing one rotate handle a\r
  short distance from the object at the object's angle.\r
  Since the default <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> is zero, the rotate handle typically starts to the right of the object.\r
</p>\r
<p>\r
  If you want to let the user rotate the whole node, just set <a href="../api/symbols/Part.html#rotatable" target="api">Part.rotatable</a> to true.\r
  Rotating will set the Node's <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a>.\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
\r
<p>\r
  If you want the user to rotate a particular object within the node, you need to name that object and assign <a href="../api/symbols/Part.html#rotateobjectname" target="api">Part.rotateObjectName</a>.\r
  Rotating will set the <a href="../api/symbols/Part.html#rotateobject" target="api">Part.rotateObject</a>'s <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a>, in this case the Shape's angle.\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
\r
<p>\r
  When an object is rotatable, it is commonplace to try to remember the new angle by updating the model data,\r
  so that it can be saved and loaded later.\r
  This can be accomplished with a TwoWay <a href="../api/symbols/Binding.html" target="api">Binding</a> on the <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> property.\r
  But note that the binding needs to be on the actual GraphObject that is rotated, not on the whole Node.\r
  In this case, because the <a href="../api/symbols/Part.html#rotateobjectname" target="api">Part.rotateObjectName</a> is referring to a Shape, that means the binding needs to be on the Shape.\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
\r
<p>\r
  You can customize the rotate handle by setting <a href="../api/symbols/Part.html#rotateadornmenttemplate" target="api">Part.rotateAdornmentTemplate</a>.\r
  Another common customization is to position the rotate handle above the object when it is not rotated,\r
  i.e. when its <a href="../api/symbols/GraphObject.html#angle" target="api">GraphObject.angle</a> is zero.\r
  This is accomplished by setting <a href="../api/symbols/RotatingTool.html#handleangle" target="api">RotatingTool.handleAngle</a> to 270.\r
</p>\r
<!-- CODE_BLOCK_13 -->\r
<p>\r
  There are example custom rotating tools defined in the samples and extensions directories:\r
  <a href="../samples/RotateMultiple">Rotate Multiple Tool </a> and\r
  <a href="../samples/seatingChart">Horizontal Text Rotating Tool (in Seating Chart)</a>.\r
</p>\r
\r
<h3 id="RelinkingTool"><a class="not-prose heading-anchor" href="#RelinkingTool">RelinkingTool</a></h3>\r
<p>\r
  When a <a href="../api/symbols/Link.html" target="api">Link</a> is <a href="../api/symbols/Link.html#relinkablefrom" target="api">Link.relinkableFrom</a> and/or <a href="../api/symbols/Link.html#relinkableto" target="api">Link.relinkableTo</a>, the <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a> adds one or\r
  two <a href="../api/symbols/Adornment.html" target="api">Adornment</a>s, a diamond at each relinkable end of a selected link.\r
  The user can drag a relinking handle to reconnect that end of the link to another port.\r
</p>\r
<p>\r
  The <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a> will automatically update the relationships between the nodes/ports, both in the diagram and in the model.\r
  No <a href="../api/symbols/Binding.html" target="api">Binding</a>s are needed for such model updates.\r
</p>\r
<!-- CODE_BLOCK_14 -->\r
<p>\r
  The relinking handles can be customized by setting <a href="../api/symbols/RelinkingTool.html#fromhandlearchetype" target="api">RelinkingTool.fromHandleArchetype</a> and <a href="../api/symbols/RelinkingTool.html#tohandlearchetype" target="api">RelinkingTool.toHandleArchetype</a>.\r
  At the current time they cannot be customized by setting a property on the Link.\r
</p>\r
<p>\r
  You can limit which pairs of ports between which the user may draw new links or reconnect existing links.\r
  This topic is covered by <a href="validation">Link Validation</a>.\r
</p>\r
\r
<h3 id="LinkReshapingTool"><a class="not-prose heading-anchor" href="#LinkReshapingTool">LinkReshapingTool</a></h3>\r
<p>\r
  When a <a href="../api/symbols/Link.html" target="api">Link</a> is <a href="../api/symbols/Part.html#reshapable" target="api">Part.reshapable</a>, the <a href="../api/symbols/LinkReshapingTool.html" target="api">LinkReshapingTool</a> adds an <a href="../api/symbols/Adornment.html" target="api">Adornment</a> with several reshape\r
  handles at the interior points of a selected link's route.\r
  When the user drags a reshape handle, the route of the Link, held by <a href="../api/symbols/Link.html#points" target="api">Link.points</a>, is modified.\r
</p>\r
<p>\r
  When a link is reshapable, it is commonplace to try to remember the new route by updating the link data in the <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a>,\r
  so that it can be saved and loaded later.\r
  This can be accomplished with a TwoWay <a href="../api/symbols/Binding.html" target="api">Binding</a> on the <a href="../api/symbols/Link.html#points" target="api">Link.points</a> property.\r
  If one also uses the property name "points" on the link data, <a href="../api/symbols/Model.html#tojson" target="api">Model.toJson</a> will automatically convert\r
  the <a href="../api/symbols/List.html" target="api">List</a> of <a href="../api/symbols/Point.html" target="api">Point</a>s into an Array of numbers and vice-versa.\r
</p>\r
<!-- CODE_BLOCK_15 -->\r
<p>\r
  The reshape handles are small blue squares.\r
  The reshape handles can be customized by setting <a href="../api/symbols/LinkReshapingTool.html#handlearchetype" target="api">LinkReshapingTool.handleArchetype</a>.\r
  At the current time they cannot be customized by setting a property on the Link.\r
</p>\r
<p>\r
  By setting <a href="../api/symbols/Link.html#resegmentable" target="api">Link.resegmentable</a> to true, users can add or remove segments from links.\r
  The resegmenting handles are even smaller blue diamonds at the middle of each segment.\r
  When the user drags a resegmenting handle, a new segment is inserted into the link's route.\r
  For orthogonal links, two new segments are introduced in order to maintain orthogonality.\r
  When the user reshapes the link so that adjacent segments are co-linear (or nearly so), the segment(s) are removed from the route.\r
</p>\r
<!-- CODE_BLOCK_16 -->\r
<p>\r
  The resegmenting handles can be customized by setting <a href="../api/symbols/LinkReshapingTool.html#midhandlearchetype" target="api">LinkReshapingTool.midHandleArchetype</a>.\r
  At the current time they cannot be customized by setting a property on the Link.\r
  Also at the current time resegmenting is not supported on Bezier-curved links.\r
</p>\r
<p>\r
  If you want your users to be able to reshape Shape geometries that are not Link paths, there is the\r
  <a href="../extensions/GeometryReshapingTool.js">Geometry Reshaping Tool</a> used by the\r
  <a href="../samples/PolygonDrawing">Polygon Drawing</a> and\r
  <a href="../samples/FreehandDrawing">Freehand Drawing</a> samples in the extensions directory.\r
  It is defined in a separate JS file that you can load into your app.\r
</p>\r
\r
<h2 id="ToolsAndToolParts"><a class="not-prose heading-anchor" href="#ToolsAndToolParts">Tools and Tool Parts</a></h2>\r
<p>\r
  Some tools make use of special <a href="../api/symbols/Part.html" target="api">Part</a>s that they add to the "Tool" <a href="../api/symbols/Layer.html" target="api">Layer</a> as feedback during the tool's operation.\r
</p>\r
\r
<h3 id="DragSelectingTool"><a class="not-prose heading-anchor" href="#DragSelectingTool">DragSelectingTool</a></h3>\r
<p>\r
  The <a href="../api/symbols/DragSelectingTool.html" target="api">DragSelectingTool</a> uses the <a href="../api/symbols/DragSelectingTool.html#box" target="api">DragSelectingTool.box</a> to show the area in which it will select Parts.\r
  Normally this is a simple magenta rectangular shape, which you can customize.\r
  For example here is a drag-selecting box that is in the shape of a blue-outlined cloud.\r
</p>\r
<!-- CODE_BLOCK_17 -->\r
<p>\r
  Note that the <a href="../api/symbols/DragSelectingTool.html" target="api">DragSelectingTool</a> expects that the object in the "box" to be resized is named "SHAPE".\r
  The object should be rectangular too, or else the user might be misled by the area in which parts will be selected.\r
  Finally note also that the box is not an Adornment because it does not "adorn" any Part.\r
  It is just an unbound Part that is used temporarily by the DragSelectingTool.\r
</p>\r
<p>\r
  There are examples of in-the-background-dragging tools defined in the extensions directory:\r
  <a href="../samples/RealtimeDragSelecting">Realtime Drag Selecting Tool</a>,\r
  <a href="../samples/DragCreating">Drag Creating Tool</a>, and\r
  <a href="../samples/DragZooming">Drag Zooming Tool</a>.\r
  Each is defined in a separate JS file that you can load into your app.\r
</p>\r
\r
<h3 id="LinkingToolAndRelinkingTool"><a class="not-prose heading-anchor" href="#LinkingToolAndRelinkingTool">LinkingTool and RelinkingTool</a></h3>\r
<p>\r
  The linking tools, <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a> and <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a>, inherit from a base class, <a href="../api/symbols/LinkingBaseTool.html" target="api">LinkingBaseTool</a>,\r
  that uses several Parts: a temporary Link and temporary "to" and "from" Nodes.\r
</p>\r
<p>\r
  To customize the appearance and behavior of the temporary Link that is shown during a linking operation,\r
  you need to modify or replace the <a href="../api/symbols/LinkingBaseTool.html#temporarylink" target="api">LinkingBaseTool.temporaryLink</a>. Same goes with the \r
  <a href="../api/symbols/LinkingBaseTool.html#temporaryfromnode" target="api">LinkingBaseTool.temporaryFromNode</a> and <a href="../api/symbols/LinkingBaseTool.html#temporarytonode" target="api">LinkingBaseTool.temporaryToNode</a>. You may also want to set the \r
  corresponding temporary port properties as well.\r
  The default temporary link is a blue line with a standard arrowhead.\r
  The originating port and the potential target port are shown by the <a href="../api/symbols/LinkingBaseTool.html#temporaryfromnode" target="api">LinkingBaseTool.temporaryFromNode</a>\r
  and <a href="../api/symbols/LinkingBaseTool.html#temporarytonode" target="api">LinkingBaseTool.temporaryToNode</a>.\r
  The default temporary ports are magenta rectangles.\r
</p>\r
<!-- CODE_BLOCK_18 -->\r
<p>\r
  Try drawing a link from one node to the other.\r
  You will notice that the nodes (actually the ports) are highlighted by the temporary nodes in chartreuse and cyan.\r
  The temporary link is a dashed red line without an arrowhead.\r
</p>\r
<p>\r
  If your app also supports relinking you will probably want to do the same customizations on the <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a>.\r
</p>\r
<p>\r
  There are examples of linking tools defined in the samples and extensions directories:\r
  <a href="../samples/PolylineLinking">Polyline Linking Tool</a>,\r
  <a href="../samples/sequenceDiagram">Messaging Tool (in Sequence Diagram)</a>, and\r
  <a href="../samples/sequenceDiagram">Custom Linking Tool (in Grafcet Diagram)</a>\r
</p>\r
\r
<h2 id="CustomTools"><a class="not-prose heading-anchor" href="#CustomTools">Custom Tools</a></h2>\r
<p>\r
  The GoJS samples and extensions demonstrate a number of custom tools, including:\r
</p>\r
<ul>\r
  <li><a href="../samples/ColumnResizing">Column Resizing Tool and Row Resizing Tool</a></li>\r
  <li><a href="../samples/CurvedLinkReshaping">Curved Link Reshaping Tool</a></li>\r
  <li><a href="../samples/DragCreating">Drag Creating Tool</a></li>\r
  <li><a href="../samples/DragZooming">Drag Zooming Tool</a></li>\r
  <li><a href="../samples/FreehandDrawing">Freehand Drawing Tool</a></li>\r
  <li><a href="../samples/GeometryReshaping">Geometry Reshaping Tool</a> also used by the <a href="../samples/PolygonDrawing">Polygon Drawing</a>, and\r
    the <a href="../samples/FreehandDrawing">Freehand Drawing</a> samples\r
  </li>\r
  <li><a href="../samples/GuidedDragging">Guided Dragging Tool</a></li>\r
  <li><a href="../samples/LassoSelecting">Lasso Selecting Tool</a></li>\r
  <li><a href="../samples/LinkLabelDragging">Link Label Dragging Tool</a></li>\r
  <li><a href="../samples/LinkLabelOnPathDragging">Link Label On Path Dragging Tool</a></li>\r
  <li><a href="../samples/LinkShifting">Link Shifting Tool</a></li>\r
  <li><a href="../samples/NodeLabelDragging">Node Label Dragging Tool</a></li>\r
  <li><a href="../samples/NonRealtimeDragging">Non-Realtime Dragging Tool</a></li>\r
  <li><a href="../samples/OrthogonalLinkReshaping">Orthogonal Link Reshaping Tool</a></li>\r
  <li><a href="../samples/OverviewResizing">Overview Resizing Tool</a></li>\r
  <li><a href="../samples/PolygonDrawing">Polygon Drawing Tool</a></li>\r
  <li><a href="../samples/PolylineLinking">Polyline Linking Tool</a></li>\r
  <li><a href="../samples/PortShifting">Port Shifting Tool</a></li>\r
  <li><a href="../samples/RealtimeDragSelecting">Realtime Drag Selecting Tool</a></li>\r
  <li><a href="../samples/Rescaling">Rescaling Tool</a></li>\r
  <li><a href="../samples/ResizeMultiple">Resize Multiple Tool</a></li>\r
  <li><a href="../samples/RotateMultiple">Rotate Multiple Tool</a></li>\r
  <li><a href="../samples/SectorReshaping">Sector Reshaping Tool</a></li>\r
  <li><a href="../samples/SnapLinkReshaping">Snap Link Reshaping Tool</a></li>\r
  <li><a href="../samples/SpotRotating">Spot Rotating Tool</a></li>\r
  <li><a href="../samples/dragDropFields">Field Dragging Tool</a></li>\r
  <li><a href="../samples/swimLanes">Lane Resizing Tool (in Swim Lanes)</a></li>\r
  <li><a href="../samples/swimLanesVertical">Lane Resizing Tool (in Swim Lanes Vertical)</a></li>\r
</ul>\r
`,codeBlocks:[{id:null,code:`myDiagram.toolManager.clickCreatingTool.archetypeNodeData =\r
    { key: "Node", text: "some description", color: "green" };`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const diagram =\r
  new go.Diagram("myDiagramDiv", {\r
    allowCopy: false,\r
    "grid.visible": true,\r
    "grid.gridCellSize": new go.Size(30, 20),\r
    "clickCreatingTool.archetypeNodeData":  // a node data JavaScript object\r
      { key: "Node", text: "some description", color: "green" },\r
    "dragSelectingTool.box":  // an unbound Part\r
      new go.Part({ layerName: "Tool" })\r
        .add(\r
          new go.Shape({ name: "SHAPE", fill: null, stroke: "blue", strokeWidth: 3 })\r
        ),\r
    "draggingTool.isGridSnapEnabled": true,\r
    "linkReshapingTool.handleArchetype":  // a GraphObject that is copied for each handle\r
      new go.Shape({ width: 10, height: 10, fill: "yellow" }),\r
    "resizingTool.isGridSnapEnabled": true,\r
    "rotatingTool.snapAngleMultiple": 90,\r
    "rotatingTool.snapAngleEpsilon": 45\r
  });`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:`toolLifecycle`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto", { locationSpot: go.Spot.Center })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "lightgreen", stroke: "lightgray" })\r
        .bind("fill", "color"),\r
      new go.TextBlock({\r
        margin: 8,\r
        wrap: go.Wrap.Fit,\r
        width: 170,\r
        font: "bold 10pt sans-serif",\r
        textAlign: "center"\r
      })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .bind("curve")\r
    .add(\r
      new go.Shape(),\r
      new go.Shape({ toArrow: "OpenTriangle", fill: null }),   // the arrowhead\r
      new go.TextBlock({ margin: 1, segmentOffset: new go.Point(0,0) })\r
        .bind("text")\r
        .bind("segmentOffset")\r
        .bind("segmentOrientation")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "ToolManager receives mouse event and searches a tool list such as mouseDownTools" },\r
  { key: 2, text: "tool.canStart()", color: "lightyellow" },\r
  { key: 3, text: "toolManager.currentTool = the chosen tool" },\r
  { key: 4, text: "tool.doStart()", color: "lightyellow" },\r
  { key: 5, text: "tool.doActivate()", color: "lightyellow" },\r
  { key: 6, text: "isActive === true" },\r
  { key: 7, text: "tool.doMouseDown() or\\ntool.doMouseMove() or\\ntool.doMouseUp() or\\ntool.doMouseWheel() or\\ntool.doKeyDown() or\\ntool.doKeyUp()",\r
    color: "lightyellow" },\r
  { key: 8, text: "tool.doCancel()", color: "lightyellow" },\r
  { key: 9, text: "tool.stopTool()", color: "lightyellow" },\r
  { key: 10, text: "toolManager.currentTool = toolManager.defaultTool" },\r
  { key: 11, text: "tool.doDeactivate()", color: "lightyellow" },\r
  { key: 12, text: "tool.doStop()", color: "lightyellow" }\r
], [\r
  { from: 1, to: 2, text: "on each tool call", segmentOffset: new go.Point(0,-50) },\r
  { from: 2, to: 3, text: "if it returns true", segmentOffset: new go.Point(0,-50) },\r
  { from: 3, to: 4 },\r
  { from: 4, to: 5 },\r
  { from: 5, to: 6 },\r
  { from: 6, to: 7, text: "Receives input", curve: go.Curve.Bezier, segmentOrientation: go.Orientation.Upright, segmentOffset: new go.Point(10,10) },\r
  { from: 7, to: 6, text: "Input continues", curve: go.Curve.Bezier, segmentOrientation: go.Orientation.Upright, segmentOffset: new go.Point(0,10) },\r
  { from: 7, to: 9, text: "Input stops tool", segmentOrientation: go.Orientation.Along, segmentOffset: new go.Point(-5,10) },\r
  { from: 6, to: 8, text: "User cancels tool", segmentOrientation: go.Orientation.Along, segmentOffset: new go.Point(0,-10)},\r
  { from: 8, to: 9 },\r
  { from: 9, to: 10 },\r
  { from: 10, to: 11 },\r
  { from: 11, to: 12 }\r
]);\r
\r
diagram.layout = new go.LayeredDigraphLayout({\r
  setsPortSpots: false,\r
  columnSpacing: 60,\r
  alignOption: go.LayeredDigraphLayout.AlignNone\r
});\r
diagram.layout.isOngoing = false;\r
\r
// Nudge node 7 relative to wherever the layout places it, once the layout finishes\r
diagram.addDiagramListener("LayoutCompleted", function handler(e) {\r
  e.diagram.removeDiagramListener("LayoutCompleted", handler);\r
  e.diagram.commit((d) => {\r
    const largeNode = d.findNodeForKey(7);\r
    if (largeNode) largeNode.moveTo(largeNode.location.x, largeNode.location.y - 100, true);\r
  }, "nudge node");\r
});`,isExecutable:!0,animation:!1,hideCode:!0,language:`js`,initiallyVisible:!0},{id:`resizing`,code:`diagram.add(\r
  new go.Node("Auto", { resizable: true })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange" }),\r
      new go.TextBlock("Hello!", { margin: 5 })\r
    )\r
);\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:190,language:`js`,initiallyVisible:!0},{id:`resizingObject`,code:`diagram.add(\r
  new go.Node("Vertical", {\r
    resizable: true,\r
    resizeObjectName: "SHAPE",  // resize the Shape, not the Node\r
    selectionObjectName: "SHAPE"\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 100, height: 60,\r
        name: "SHAPE",\r
      }),\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:265,language:`js`,initiallyVisible:!0},{id:`resizingMaxMin`,code:`diagram.add(\r
  new go.Node("Vertical", {\r
    resizable: true,\r
    resizeObjectName: "SHAPE",\r
    selectionObjectName: "SHAPE"\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 100, height: 60,\r
        name: "SHAPE",\r
        // limit size by setting or binding maxSize and/or minSize\r
        maxSize: new go.Size(150, 90),\r
        minSize: new go.Size(30, 30)\r
      }),\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:317,language:`js`,initiallyVisible:!0},{id:`resizingCellSize`,code:`diagram.grid.visible = true; // show gridlines\r
diagram.add(\r
  new go.Node("Vertical", {\r
    resizable: true,\r
    resizeObjectName: "SHAPE",\r
    // new size will be multiples of resizeCellSize\r
    resizeCellSize: new go.Size(10, 10),\r
    selectionObjectName: "SHAPE"\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 100, height: 60,\r
        name: "SHAPE",\r
        maxSize: new go.Size(150, 90),\r
        minSize: new go.Size(30, 30)\r
      }),\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:360,language:`js`,initiallyVisible:!0},{id:`resizingObjectBinding`,code:`diagram.add(\r
  new go.Node("Vertical", {\r
    resizable: true,\r
    resizeObjectName: "SHAPE",\r
    selectionObjectName: "SHAPE"\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 100, height: 60,\r
        name: "SHAPE"\r
      })\r
        // TwoWay Binding of the desiredSize\r
        .bindTwoWay("desiredSize", "size", go.Size.parse, go.Size.stringify),\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:300,language:`js`,initiallyVisible:!0},{id:`resizingArchetype`,code:`diagram.toolManager.resizingTool.handleArchetype =\r
  new go.Shape("Circle", { \r
    width: 10, height: 10, fill: "yellow", cursor: "pointer" \r
  });\r
\r
diagram.add(\r
  new go.Node("Vertical", {\r
    resizable: true,\r
    resizeObjectName: "SHAPE",\r
    selectionAdorned: false  // don't show selection Adornment\r
  })\r
    .add( \r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 100, height: 60,\r
        name: "SHAPE",\r
        maxSize: new go.Size(150, 90),\r
        minSize: new go.Size(30, 30)\r
      }),\r
      new go.TextBlock("Hello!", { margin: 10 })\r
    )\r
);\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:400,language:`js`,initiallyVisible:!0},{id:`resizingTemplate`,code:`diagram.add(\r
  new go.Node("Vertical", {\r
    resizable: true,\r
    resizeObjectName: "SHAPE",\r
    selectionAdorned: false,  // don't show selection Adornment\r
    resizeAdornmentTemplate:  // specify the resize handles and how they look\r
      new go.Adornment("Spot")\r
        .add(\r
          new go.Placeholder(),  // takes size and position of adorned object\r
          // left resize handle\r
          new go.Shape("Circle", { fill: "lightblue", stroke: "dodgerblue",\r
            alignment: go.Spot.Left,\r
            cursor: "col-resize",\r
            desiredSize: new go.Size(9, 9)\r
          }),\r
          // right resize handle\r
          new go.Shape("Circle", { fill: "lightblue", stroke: "dodgerblue",\r
            alignment: go.Spot.Right,\r
            cursor: "col-resize",\r
            desiredSize: new go.Size(9, 9)\r
          }),\r
          // show the width as text\r
          new go.TextBlock({ \r
            alignmentFocus: new go.Spot(0.5, 1, 0, 14), stroke: "dodgerblue" \r
          })\r
            .bindObject("text", "adornedObject", shp => {\r
              return shp.naturalBounds.width.toFixed(0);\r
            })\r
        )\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 50, height: 30,\r
        name: "SHAPE",\r
        maxSize: new go.Size(200, 40),\r
        minSize: new go.Size(20, 20)\r
      }),\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`rotating`,code:`diagram.add(\r
  new go.Node("Auto", { rotatable: true, locationSpot: go.Spot.Center })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange" }),\r
      new go.TextBlock("Hello!", { margin: 5 })\r
    )\r
);\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:190,language:`js`,initiallyVisible:!0},{id:`rotatingObject`,code:`diagram.add(\r
  new go.Node("Vertical", {\r
    rotatable: true,\r
    rotateObjectName: "SHAPE",  // rotate the Shape, not the Node\r
    locationSpot: go.Spot.Center,\r
    locationObjectName: "SHAPE",\r
    selectionObjectName: "SHAPE"\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 50, height: 30,\r
        name: "SHAPE"\r
      }),\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:352,language:`js`,initiallyVisible:!0},{id:`rotatingObjectBinding`,code:`diagram.add(\r
  new go.Node("Vertical", {\r
    rotatable: true,\r
    rotateObjectName: "SHAPE",\r
    locationSpot: go.Spot.Center,\r
    locationObjectName: "SHAPE",\r
    selectionObjectName: "SHAPE"\r
  })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 50, height: 30,\r
        name: "SHAPE", \r
      })\r
        .bindTwoWay("angle"),  // TwoWay Binding of angle\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:369,language:`js`,initiallyVisible:!0},{id:`rotatingTemplate`,code:`diagram.add(\r
  new go.Node("Vertical", {\r
    rotatable: true,\r
    rotateObjectName: "SHAPE",\r
    locationSpot: go.Spot.Center,\r
    locationObjectName: "SHAPE",\r
    selectionObjectName: "SHAPE",\r
    rotateAdornmentTemplate:  // specify appearance of rotation handle\r
      new go.Adornment({ locationSpot: go.Spot.Center })\r
        .add(\r
          new go.Shape("BpmnActivityLoop", { \r
            width: 12, height: 12, background: "transparent",\r
            cursor: "pointer", stroke: "#0ea5e9", strokeWidth: 2\r
          })\r
        )\r
    })\r
    .add(\r
      new go.Shape("RoundedRectangle", { fill: "orange", width: 50, height: 30,\r
        name: "SHAPE"\r
      }),\r
      new go.TextBlock("Hello!", { margin: 3 })\r
    )\r
);\r
\r
diagram.toolManager.rotatingTool.handleAngle = 270;\r
diagram.commandHandler.selectAll();`,isExecutable:!0,animation:!1,minHeight:500,language:`js`,initiallyVisible:!0},{id:`relinking`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Capsule", { fill: "white", stroke: "dodgerblue",\r
        portId: "",\r
        fromLinkable: true,\r
        toLinkable: true\r
      }),\r
      new go.TextBlock({ margin: 5, stroke: "dodgerblue" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ \r
    relinkableFrom: true, relinkableTo: true, selectionAdorned: false \r
  })\r
    .add(\r
      new go.Shape({ stroke: "dodgerblue" }),\r
      new go.Shape({ toArrow: "Standard", fill: "dodgerblue", stroke: null })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "Beta" },\r
  { key: 3, text: "Gamma" },\r
  { key: 4, text: "Delta" }\r
], [\r
  { from: 1, to: 4 }\r
]);\r
\r
diagram.select(diagram.findLinkForData(diagram.model.linkDataArray[0]));`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`linkReshaping`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Capsule", { fill: "white", stroke: "dodgerblue" }),\r
      new go.TextBlock({ margin: 5, stroke: "dodgerblue" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({ \r
    reshapable: true, routing: go.Routing.Orthogonal, selectionAdorned: false \r
  })\r
    .bindTwoWay("points")  // TwoWay Binding of Link.points\r
    .add(\r
      new go.Shape({ stroke: "dodgerblue" }),\r
      new go.Shape({ toArrow: "Standard", fill: "dodgerblue", stroke: null })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha", loc: "0 0" },\r
  { key: 2, text: "Beta", loc: "200 50" }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
diagram.select(diagram.findLinkForData(diagram.model.linkDataArray[0]));`,isExecutable:!0,animation:!1,minHeight:500,language:`js`,initiallyVisible:!0},{id:`linkResegmenting`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("Capsule", { fill: "white", stroke: "dodgerblue" }),\r
      new go.TextBlock({ margin: 5, stroke: "dodgerblue" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link({\r
    reshapable: true,\r
    resegmentable: true,\r
    routing: go.Routing.Orthogonal,\r
    selectionAdorned: false\r
  })\r
    .bindTwoWay("points")  // TwoWay Binding of Link.points\r
    .add(\r
      new go.Shape({ stroke: "dodgerblue" }),\r
      new go.Shape({ toArrow: "Standard", fill: "dodgerblue", stroke: null })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha", loc: "0 0" },\r
  { key: 2, text: "Beta", loc: "200 50" }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
diagram.select(diagram.findLinkForData(diagram.model.linkDataArray[0]));`,isExecutable:!0,animation:!1,minHeight:570,language:`js`,initiallyVisible:!0},{id:`dragSelecting`,code:`diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { stroke: null })\r
        .bind("fill"),\r
      new go.TextBlock({ \r
        margin: 8, stroke: "white", font: "bold 14px sans-serif" \r
      })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate = new go.Link({ toShortLength: 6 }).add(\r
  new go.Shape({ stroke: "dimgray", strokeWidth: 3 }),\r
  new go.Shape({ toArrow: "standard", fill: "dimgray", stroke: "dimgray" })\r
)\r
\r
diagram.toolManager.dragSelectingTool.isPartialInclusion = true;\r
diagram.toolManager.dragSelectingTool.box =\r
  new go.Part({ layerName: "Tool" })\r
    .add(\r
      new go.Shape("Cloud", { fill: null, stroke: "dodgerblue", strokeWidth: 4,\r
        name: "SHAPE", strokeDashArray: [10, 5]\r
      })\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: "Alpha", fill: "coral", loc: "0 0" },\r
  { key: 2, text: "Beta", fill: "seagreen", loc: "200 50" }\r
], [\r
  { from: 1, to: 2 }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`linkingTools`,code:`diagram.nodeTemplate =\r
  new go.Node("Spot")\r
    .bind("location", "loc", go.Point.parse)\r
    .add(\r
      new go.Shape("RoundedRectangle", { \r
        width: 100, height: 40, \r
        fill: "lightyellow",\r
        stroke: "lightgray",\r
        portId: "",\r
        fromLinkable: true,\r
        toLinkable: true,\r
        cursor: "pointer"\r
      }),\r
      new go.TextBlock({ stroke: "#333" })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate = new go.Link().add(\r
  new go.Shape({ stroke: "dimgray" }) // minimal link\r
);\r
\r
// Used in place of the default temporary link shown while creating a link\r
diagram.toolManager.linkingTool.temporaryLink =\r
  new go.Link({ layerName: "Tool" })\r
    .add(\r
      new go.Shape({ stroke: "red", strokeWidth: 2, strokeDashArray: [8, 4] })\r
    );\r
\r
// Temporary nodes that the linking tool places over the nodes being linked\r
const tempfromnode =\r
  new go.Node({ layerName: "Tool" })\r
    .add(\r
      new go.Shape("RoundedRectangle", { \r
        stroke: "cyan", strokeWidth: 3, fill: null,\r
        portId: "", width: 1, height: 1\r
      })\r
    );\r
diagram.toolManager.linkingTool.temporaryFromNode = tempfromnode;\r
diagram.toolManager.linkingTool.temporaryFromPort = tempfromnode.port;\r
\r
const temptonode =\r
  new go.Node({ layerName: "Tool" })\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        stroke: "chartreuse", strokeWidth: 3, fill: null,\r
        portId: "", width: 1, height: 1\r
      })\r
    );\r
diagram.toolManager.linkingTool.temporaryToNode = temptonode;\r
diagram.toolManager.linkingTool.temporaryToPort = temptonode.port;\r
\r
diagram.model = new go.GraphLinksModel([\r
  { text: "Alpha", loc: "0 0" },\r
  { text: "Beta", loc: "150 100" },\r
  { text: "Gamma", loc: "300 0" }\r
]);  // start off with no links`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[`/extensions/Figures.js`],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`3m3fu1`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};