import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Events`},htmlContent:`<h1>Events</h1>\r
<p>\r
There are three basic kinds of events that GoJS deals with:\r
<a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a>s, <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s, and <a href="../api/symbols/ChangedEvent.html" target="api">ChangedEvent</a>s.\r
This page discusses the first two; see <a href="changedEvents">Changed Events</a> for the last kind of event.\r
</p>\r
\r
<h2 id="DiagramEvents"><a class="not-prose heading-anchor" href="#DiagramEvents">DiagramEvents</a></h2>\r
<p>\r
<a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a>s represent general user-initiated changes to a diagram.\r
You can register one or more diagram event handlers by calling <a href="../api/symbols/Diagram.html#adddiagramlistener" target="api">Diagram.addDiagramListener</a>.\r
You can also register a diagram event handler in <a href="../api/symbols/Diagram.html" target="api">Diagram</a> initialization options\r
when calling the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> constructor.\r
Each kind of diagram event is distinguished by its name.\r
</p>\r
<p>\r
Currently defined diagram event names include:\r
</p>\r
<div>\r
  <table>\r
    <thead>\r
      <tr>\r
        <th>Event Name</th>\r
        <th>Description</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      <tr id="InitialAnimationStarting">\r
        <td><a href="#InitialAnimationStarting">InitialAnimationStarting</a></td>\r
        <td>The initial default animation is about to start;\r
          do not modify the diagram or its model in the event listener.\r
          This can be useful for modifying the <a href="../api/symbols/AnimationManager.html#defaultanimation" target="api">AnimationManager.defaultAnimation</a> to make a custom initial animation.\r
          See <a href="../api/symbols/AnimationManager.html#initialanimationstyle" target="api">AnimationManager.initialAnimationStyle</a> for details.\r
        </td>\r
      </tr>\r
      <tr id="AnimationStarting">\r
        <td><a href="#AnimationStarting">AnimationStarting</a></td>\r
        <td>A default animation (<a href="../api/symbols/AnimationManager.html#defaultanimation" target="api">AnimationManager.defaultAnimation</a>) is about to start;\r
          do not modify the diagram or its model in the event listener.\r
        </td>\r
      </tr>\r
      <tr id="AnimationFinished">\r
        <td><a href="#AnimationFinished">AnimationFinished</a></td>\r
        <td>A default animation (<a href="../api/symbols/AnimationManager.html#defaultanimation" target="api">AnimationManager.defaultAnimation</a>) just completed;\r
          do not modify the diagram or its model in the event listener.\r
        </td>\r
      </tr>\r
      <tr id="BackgroundSingleClicked">\r
        <td><a href="#BackgroundSingleClicked">BackgroundSingleClicked</a></td>\r
        <td>When a mouse left-button single-click happened in the background of the Diagram, not on a Part;\r
          if you make any changes, start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="BackgroundDoubleClicked">\r
        <td><a href="#BackgroundDoubleClicked">BackgroundDoubleClicked</a></td>\r
        <td>When a mouse left-button double-click happened in the background of the Diagram, not on a Part;\r
          if you make any changes, start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="BackgroundContextClicked">\r
        <td><a href="#BackgroundContextClicked">BackgroundContextClicked</a></td>\r
        <td>When a mouse right-button single-click happened in the background of the Diagram, not on a Part;\r
          if you make any changes, start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="ChangingSelection">\r
        <td><a href="#ChangingSelection">ChangingSelection</a></td>\r
        <td>An operation is about to change the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a> collection,\r
          which is also the value of the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a>;\r
          do not make any changes to the selection or the diagram or the model in the event listener;\r
          note that just setting <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> will not raise this event, but tools and commands will.\r
        </td>\r
      </tr>\r
      <tr id="ChangedSelection">\r
        <td><a href="#ChangedSelection">ChangedSelection</a></td>\r
        <td>An operation has just changed the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a> collection,\r
          which is also the value of the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a>;\r
          do not make any changes to the selection or the diagram or the model in the event listener;\r
          note that just setting <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> will not raise this event, but tools and commands will.\r
        </td>\r
      </tr>\r
      <tr id="ClipboardChanged">\r
        <td><a href="#ClipboardChanged">ClipboardChanged</a></td>\r
        <td>Parts have been copied to the clipboard by <a href="../api/symbols/CommandHandler.html#copyselection" target="api">CommandHandler.copySelection</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the collection of Parts;\r
          if you make any changes, start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="ClipboardPasted">\r
        <td><a href="#ClipboardPasted">ClipboardPasted</a></td>\r
        <td>Parts have been copied from the clipboard into the Diagram by <a href="../api/symbols/CommandHandler.html#pasteselection" target="api">CommandHandler.pasteSelection</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a>,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="DocumentBoundsChanged">\r
        <td><a href="#DocumentBoundsChanged">DocumentBoundsChanged</a></td>\r
        <td>The area of the diagram's Parts, <a href="../api/symbols/Diagram.html#documentbounds" target="api">Diagram.documentBounds</a>, has changed;\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the old Rect.\r
        </td>\r
      </tr>\r
      <tr id="ExternalObjectsDropped">\r
        <td><a href="#ExternalObjectsDropped">ExternalObjectsDropped</a></td>\r
        <td>Parts have been copied into the Diagram by drag-and-drop from outside of the Diagram;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the set of Parts that were dropped (which is also the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a>),\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the source Diagram,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="GainedFocus">\r
        <td><a href="#GainedFocus">GainedFocus</a></td>\r
        <td>The diagram has gained keyboard focus, such as after a call to <a href="../api/symbols/Diagram.html#focus" target="api">Diagram.focus</a>.\r
        </td>\r
      </tr>\r
      <tr id="InitialLayoutCompleted">\r
        <td><a href="#InitialLayoutCompleted">InitialLayoutCompleted</a></td>\r
        <td>The whole diagram layout has updated for the first time since a major change to the Diagram,\r
          such as replacing the Model;\r
          if you make any changes, you do not need to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="LayoutCompleted">\r
        <td><a href="#LayoutCompleted">LayoutCompleted</a></td>\r
        <td>The whole diagram layout has just been updated;\r
          if you make any changes, you do not need to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="LinkDrawn">\r
        <td><a href="#LinkDrawn">LinkDrawn</a></td>\r
        <td>The user has just created a new Link using <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the new Link,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="LinkRelinked">\r
        <td><a href="#LinkRelinked">LinkRelinked</a></td>\r
        <td>The user has just reconnected an existing Link using <a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a> or <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the modified Link,\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the GraphObject port that the link was disconnected from,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="LinkReshaped">\r
        <td><a href="#LinkReshaped">LinkReshaped</a></td>\r
        <td>The user has just rerouted an existing Link using <a href="../api/symbols/LinkReshapingTool.html" target="api">LinkReshapingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the modified Link,\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the List of Points of the link's original route,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="LostFocus">\r
        <td><a href="#LostFocus">LostFocus</a></td>\r
        <td>The diagram has lost keyboard focus ("blur").\r
        </td>\r
      </tr>\r
      <tr id="Modified">\r
        <td><a href="#Modified">Modified</a></td>\r
        <td>The <a href="../api/symbols/Diagram.html#ismodified" target="api">Diagram.isModified</a> property has been set to a new value --\r
          useful for marking a window as having been modified since the last save;\r
          do not modify the Diagram or its Model in the event listener.\r
        </td>\r
      </tr>\r
      <tr id="ObjectSingleClicked">\r
        <td><a href="#ObjectSingleClicked">ObjectSingleClicked</a></td>\r
        <td>A click that occurred on a GraphObject;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the GraphObject;\r
          if you make any changes, start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="ObjectDoubleClicked">\r
        <td><a href="#ObjectDoubleClicked">ObjectDoubleClicked</a></td>\r
        <td>A double-click that occurred on a GraphObject;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the GraphObject;\r
          if you make any changes, start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="ObjectContextClicked">\r
        <td><a href="#ObjectContextClicked">ObjectContextClicked</a></td>\r
        <td>A context-click that occurred on a GraphObject;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the GraphObject;\r
          if you make any changes, start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="PartCreated">\r
        <td><a href="#PartCreated">PartCreated</a></td>\r
        <td>The user inserted a new Part by <a href="../api/symbols/ClickCreatingTool.html" target="api">ClickCreatingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the new Part,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="PartResized">\r
        <td><a href="#PartResized">PartResized</a></td>\r
        <td>The user has changed the size of a GraphObject by <a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the GraphObject,\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the original Size,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="PartRotated">\r
        <td><a href="#PartRotated">PartRotated</a></td>\r
        <td>The user has changed the angle of a GraphObject by <a href="../api/symbols/RotatingTool.html" target="api">RotatingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the GraphObject,\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the original angle in degrees,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SelectionMoved">\r
        <td><a href="#SelectionMoved">SelectionMoved</a></td>\r
        <td>The user has moved selected Parts by <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is a Set of the moved Parts,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SelectionCopied">\r
        <td><a href="#SelectionCopied">SelectionCopied</a></td>\r
        <td>The user has copied selected Parts by <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is Set of the newly copied Parts,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SelectionDeleting">\r
        <td><a href="#SelectionDeleting">SelectionDeleting</a></td>\r
        <td>The user is about to delete selected Parts by <a href="../api/symbols/CommandHandler.html#deleteselection" target="api">CommandHandler.deleteSelection</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a> collection of Parts to be deleted,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SelectionDeleted">\r
        <td><a href="#SelectionDeleted">SelectionDeleted</a></td>\r
        <td>The user has deleted selected Parts by <a href="../api/symbols/CommandHandler.html#deleteselection" target="api">CommandHandler.deleteSelection</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the collection of Parts that were deleted,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SelectionGrouped">\r
        <td><a href="#SelectionGrouped">SelectionGrouped</a></td>\r
        <td>The user has made a new Group out of the selected Parts by <a href="../api/symbols/CommandHandler.html#groupselection" target="api">CommandHandler.groupSelection</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the new Group,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SelectionUngrouped">\r
        <td><a href="#SelectionUngrouped">SelectionUngrouped</a></td>\r
        <td>The user has removed a selected Group but kept its members by <a href="../api/symbols/CommandHandler.html#ungroupselection" target="api">CommandHandler.ungroupSelection</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the collection of Groups that were ungrouped,\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the collection of former member Parts that were ungrouped,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SubGraphCollapsed">\r
        <td><a href="#SubGraphCollapsed">SubGraphCollapsed</a></td>\r
        <td>The user has collapsed selected Groups by <a href="../api/symbols/CommandHandler.html#collapsesubgraph" target="api">CommandHandler.collapseSubGraph</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the collection of Groups that were collapsed,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="SubGraphExpanded">\r
        <td><a href="#SubGraphExpanded">SubGraphExpanded</a></td>\r
        <td>The user has expanded selected Groups by <a href="../api/symbols/CommandHandler.html#expandsubgraph" target="api">CommandHandler.expandSubGraph</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the collection of Groups that were expanded,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="TextEdited">\r
        <td><a href="#TextEdited">TextEdited</a></td>\r
        <td>The user has changed the string value of a TextBlock by <a href="../api/symbols/TextEditingTool.html" target="api">TextEditingTool</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the edited TextBlock,\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is the original string,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="ThemeChanged">\r
        <td><a href="#ThemeChanged">ThemeChanged</a></td>\r
        <td>The diagram's theme has changed, maybe as a result of setting <a href="../api/symbols/ThemeManager.html#currenttheme" target="api">ThemeManager.currentTheme</a>\r
          or calling <a href="../api/symbols/ThemeManager.html#set" target="api">ThemeManager.set</a>.\r
        </td>\r
      </tr>\r
      <tr id="TreeCollapsed">\r
        <td><a href="#TreeCollapsed">TreeCollapsed</a></td>\r
        <td>The user has collapsed selected Nodes with subtrees by <a href="../api/symbols/CommandHandler.html#collapsetree" target="api">CommandHandler.collapseTree</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the collection of Nodes that were collapsed,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="TreeExpanded">\r
        <td><a href="#TreeExpanded">TreeExpanded</a></td>\r
        <td>The user has expanded selected Nodes with subtrees by <a href="../api/symbols/CommandHandler.html#expandtree" target="api">CommandHandler.expandTree</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is the collection of Nodes that were expanded,\r
          and this is called within a transaction, so that you do not have to start and commit your own transaction.\r
        </td>\r
      </tr>\r
      <tr id="ViewportBoundsChanged">\r
        <td><a href="#ViewportBoundsChanged">ViewportBoundsChanged</a></td>\r
        <td>The visible area of the Diagram, <a href="../api/symbols/Diagram.html#viewportbounds" target="api">Diagram.viewportBounds</a>, has changed;\r
          the <a href="../api/symbols/DiagramEvent.html#subject" target="api">DiagramEvent.subject</a> is an object whose "scale" property is the old <a href="../api/symbols/Diagram.html#scale" target="api">Diagram.scale</a> value,\r
          whose "position" property is the old <a href="../api/symbols/Diagram.html#position" target="api">Diagram.position</a> value,\r
          whose "bounds" property is the old <a href="../api/symbols/Diagram.html#viewportbounds" target="api">Diagram.viewportBounds</a> value,\r
          whose "canvasSize" property is the old size of the <a href="../api/symbols/Diagram.html#div" target="api">Diagram.div</a>, and\r
          whose "newCanvasSize" property is the new size of the <a href="../api/symbols/Diagram.html#div" target="api">Diagram.div</a>;\r
          the <a href="../api/symbols/DiagramEvent.html#parameter" target="api">DiagramEvent.parameter</a> is also the old viewportBounds Rect.\r
          Do not modify the Diagram position or scale (i.e. the viewport bounds) in the listener.\r
        </td>\r
      </tr>\r
    </tbody>\r
  </table>\r
</div>\r
\r
<p></p>\r
\r
<p>\r
DiagramEvents do not necessarily correspond to mouse events or keyboard events or touch events.\r
Nor do they necessarily correspond to changes to the diagram's model --\r
for tracking such changes, use <a href="../api/symbols/Model.html#addchangedlistener" target="api">Model.addChangedListener</a> or <a href="../api/symbols/Diagram.html#addmodelchangedlistener" target="api">Diagram.addModelChangedListener</a>.\r
DiagramEvents only occur because the user did something, perhaps indirectly.\r
</p>\r
\r
<p>\r
In addition to the DiagramEvent listeners, there are also circumstances where detecting such changes is common\r
enough to warrant having properties that are event handlers, such as <a href="../api/symbols/GraphObject.html#click" target="api">GraphObject.click</a>.\r
Because these events do not necessarily correspond to any particular input or diagram event,\r
these event handlers have custom arguments that are specific to the situation. See the\r
<a href="#HigherLevelInputEvents">higher-level input events</a> section for more.\r
</p>\r
\r
<p>\r
Model <a href="../api/symbols/ChangedEvent.html" target="api">ChangedEvent</a>s are more complete and reliable than depending on <a href="../api/symbols/DiagramEvent.html" target="api">DiagramEvent</a>s.\r
For example, the "LinkDrawn" DiagramEvent is not raised when code adds a link to a diagram.\r
That DiagramEvent is only raised when the user draws a new link using the <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a>.\r
Furthermore the link has not yet been routed, so <a href="../api/symbols/Link.html#points" target="api">Link.points</a> will not have been computed.\r
In fact, creating a new link may invalidate a <a href="../api/symbols/Layout.html" target="api">Layout</a>, so all of the nodes may be moved in the near future.\r
</p>\r
\r
<p class="box bg-info">\r
Sometimes you want to update a database as the user makes changes to a diagram.\r
Usually you will want to implement a <a href="../api/symbols/Model.html" target="api">Model</a> <a href="../api/symbols/ChangedEvent.html" target="api">ChangedEvent</a> listener,\r
by calling <a href="../api/symbols/Model.html#addchangedlistener" target="api">Model.addChangedListener</a> or <a href="../api/symbols/Diagram.html#addmodelchangedlistener" target="api">Diagram.addModelChangedListener</a>,\r
that notices the changes to the model and decides what to record in the database.\r
See the discussion of <a href="changedEvents">Changed Events</a> and the <a href="../samples/updateDemo">Update Demo</a>.\r
</p>\r
\r
<p>\r
This example demonstrates handling several diagram events: <b>"ObjectSingleClicked"</b>,\r
<b>"BackgroundDoubleClicked"</b>, and <b>"ClipboardPasted"</b>.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
\r
\r
<h2 id="InputEvents"><a class="not-prose heading-anchor" href="#InputEvents">InputEvents</a></h2>\r
<p>\r
When a low-level HTML DOM event occurs, GoJS canonicalizes the keyboard/mouse/touch event information\r
into a new <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a> that can be passed to various event-handling methods and saved for later examination.\r
</p>\r
<p>\r
An InputEvent keeps the <a href="../api/symbols/InputEvent.html#key" target="api">InputEvent.key</a> and <a href="../api/symbols/InputEvent.html#code" target="api">InputEvent.code</a> for keyboard events,\r
the <a href="../api/symbols/InputEvent.html#button" target="api">InputEvent.button</a> for mouse events,\r
the <a href="../api/symbols/InputEvent.html#viewpoint" target="api">InputEvent.viewPoint</a> for mouse and touch events,\r
and <a href="../api/symbols/InputEvent.html#modifiers" target="api">InputEvent.modifiers</a> for keyboard and mouse events.\r
</p>\r
<p>\r
The diagram's event handlers also record the <a href="../api/symbols/InputEvent.html#documentpoint" target="api">InputEvent.documentPoint</a>,\r
which is the <a href="../api/symbols/InputEvent.html#viewpoint" target="api">InputEvent.viewPoint</a> in document coordinates at the time of the mouse event,\r
and the <a href="../api/symbols/InputEvent.html#timestamp" target="api">InputEvent.timestamp</a>, which records the time that the event occurred in milliseconds.\r
</p>\r
<p>\r
The InputEvent class also provides many handy properties for particular kinds of events.\r
<a href="../api/symbols/InputEvent.html#commandkey" target="api">InputEvent.commandKey</a> is a read-only property that is convenient for use in overrides of\r
<a href="../api/symbols/CommandHandler.html#dokeydown" target="api">CommandHandler.doKeyDown</a> or <a href="../api/symbols/Tool.html#dokeydown" target="api">Tool.doKeyDown</a>, instead of looking at both <a href="../api/symbols/InputEvent.html#key" target="api">InputEvent.key</a> and <a href="../api/symbols/InputEvent.html#code" target="api">InputEvent.code</a>\r
in order to decide how to handle the keyboard event.\r
Examples include <a href="../api/symbols/InputEvent.html#control" target="api">InputEvent.control</a> (if the control key had been pressed) and\r
<a href="../api/symbols/InputEvent.html#left" target="api">InputEvent.left</a> (if the left/primary mouse button was pressed).\r
</p>\r
<p>\r
Some tools find the "current" <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> at the mouse point.\r
This is remembered as the <a href="../api/symbols/InputEvent.html#targetobject" target="api">InputEvent.targetObject</a>.\r
</p>\r
\r
<h2 id="HigherLevelInputEvents"><a class="not-prose heading-anchor" href="#HigherLevelInputEvents">Higher-level InputEvents</a></h2>\r
\r
<p>\r
Some tools detect a sequence of input events to compose somewhat more abstract user events.\r
Examples include "click" (mouse-down-and-up very close to each other) and "hover" (motionless mouse for some time).\r
The tools will call an event handler (if there is any) for the current <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> at the mouse point.\r
The event handler is held as the value of a property on the object.\r
It then also "bubbles" the event up the chain of <a href="../api/symbols/GraphObject.html#panel" target="api">GraphObject.panel</a>s until it ends with a <a href="../api/symbols/Part.html" target="api">Part</a>.\r
This allows a "click" event handler to be declared on a <a href="../api/symbols/Panel.html" target="api">Panel</a> and have it apply even if the click actually happens on an element deep inside the panel.\r
If there is no object at the mouse point, the event occurs on the diagram.\r
</p>\r
<p>\r
Click-like event properties include <a href="../api/symbols/GraphObject.html#click" target="api">GraphObject.click</a>, <a href="../api/symbols/GraphObject.html#doubleclick" target="api">GraphObject.doubleClick</a>, and <a href="../api/symbols/GraphObject.html#contextclick" target="api">GraphObject.contextClick</a>.\r
They also occur when there is no GraphObject -- the event happened in the diagram's background:\r
<a href="../api/symbols/Diagram.html#click" target="api">Diagram.click</a>, <a href="../api/symbols/Diagram.html#doubleclick" target="api">Diagram.doubleClick</a>, and <a href="../api/symbols/Diagram.html#contextclick" target="api">Diagram.contextClick</a>.\r
These are all properties that you can set to a function that is the event handler.\r
These events are caused by both mouse events and touch events.\r
</p>\r
<p>\r
Mouse-over-like event properties include <a href="../api/symbols/GraphObject.html#mouseenter" target="api">GraphObject.mouseEnter</a>, <a href="../api/symbols/GraphObject.html#mouseover" target="api">GraphObject.mouseOver</a>, and <a href="../api/symbols/GraphObject.html#mouseleave" target="api">GraphObject.mouseLeave</a>.\r
But only <a href="../api/symbols/Diagram.html#mouseover" target="api">Diagram.mouseOver</a> applies to the diagram.\r
</p>\r
<p>\r
Hover-like event properties include <a href="../api/symbols/GraphObject.html#mousehover" target="api">GraphObject.mouseHover</a> and <a href="../api/symbols/GraphObject.html#mousehold" target="api">GraphObject.mouseHold</a>.\r
The equivalent diagram properties are <a href="../api/symbols/Diagram.html#mousehover" target="api">Diagram.mouseHover</a> and <a href="../api/symbols/Diagram.html#mousehold" target="api">Diagram.mouseHold</a>.\r
</p>\r
<p>\r
There are also event properties for dragging operations: <a href="../api/symbols/GraphObject.html#mousedragenter" target="api">GraphObject.mouseDragEnter</a>, <a href="../api/symbols/GraphObject.html#mousedragleave" target="api">GraphObject.mouseDragLeave</a>, and <a href="../api/symbols/GraphObject.html#mousedrop" target="api">GraphObject.mouseDrop</a>.\r
These apply to stationary objects, not the objects being dragged.\r
And they also occur when dragging by touch events, not just mouse events.\r
</p>\r
\r
<p>\r
This example demonstrates handling three higher-level input events:\r
clicking on nodes and entering/leaving groups.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h2 id="ClickingAndSelecting"><a class="not-prose heading-anchor" href="#ClickingAndSelecting">Clicking and selecting</a></h2>\r
<p>\r
Another common event property is <a href="../api/symbols/Part.html#selectionchanged" target="api">Part.selectionChanged</a>,\r
which (if non-null) is called whenever <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> changes.\r
In this case, the event handler function is passed a single argument, the Part.\r
There is no need for additional arguments because the function can check the current value of <a href="../api/symbols/Part.html#isselected" target="api">Part.isSelected</a> to decide what to do.\r
</p>\r
<p>\r
This example demonstrates both the "click" and the "selectionChanged" events:\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
Try Ctrl-A to select everything.\r
Note the distinction between the <a href="../api/symbols/GraphObject.html#click" target="api">GraphObject.click</a> event property and the <a href="../api/symbols/Part.html#selectionchanged" target="api">Part.selectionChanged</a> event property.\r
Both are methods that get called when something has happened to the node.\r
The <a href="../api/symbols/GraphObject.html#click" target="api">GraphObject.click</a> occurs when the user clicks on the node, which happens to select the node,\r
but the <a href="../api/symbols/Part.html#selectionchanged" target="api">Part.selectionChanged</a> occurs even when there is no click event or even any mouse event.\r
It is due to a property change to the node.\r
</p>\r
`,codeBlocks:[{id:`diagramEvents`,code:`function showMessage(s) {\r
  document.getElementById("diagramEventsMsg").textContent = s;\r
}\r
\r
diagram.addDiagramListener("ObjectSingleClicked", e => {\r
  const part = e.subject.part;\r
  if (!(part instanceof go.Link)) showMessage("Clicked on " + part.data.text);\r
});\r
\r
diagram.addDiagramListener("BackgroundDoubleClicked",\r
  e => showMessage("Double-clicked at " + e.diagram.lastInput.documentPoint)\r
);\r
\r
diagram.addDiagramListener("ClipboardPasted",\r
  e => showMessage("Pasted " + e.diagram.selection.count + " parts")\r
);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto")\r
    .add(\r
      new go.Shape("Capsule", { fill: "white", stroke: "#007AFF" })\r
        .bind("fill", "group", g => {\r
          if (g) return "#007AFF";\r
          else return "white";\r
        }),\r
      new go.TextBlock({ stroke: "#007AFF", font: "11pt system-ui, sans-serif", margin: 4 })\r
        .bind("text")\r
        .bind("stroke", "group", g => {\r
          if (g) return "white";\r
          else return "#007AFF";\r
        })\r
    );\r
\r
diagram.groupTemplate =\r
  new go.Group("Vertical")\r
    .add(\r
      new go.TextBlock({ stroke: "#1D1D1F", font: "bold 12pt system-ui, sans-serif", margin: 4 })\r
        .bind("text"),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "white", stroke: "lightgray" }),\r
          new go.Placeholder({ padding: 10 })\r
        )\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({ stroke: "#1D1D1F", strokeWidth: 1 })\r
    );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "Beta", group: 4 },\r
  { key: 3, text: "Gamma", group: 4 },\r
  { key: 4, text: "Omega", isGroup: true },\r
  { key: 5, text: "Delta" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 },  // from outside the Group to inside it\r
  { from: 2, to: 3 },  // this link is a member of the Group\r
  { from: 4, to: 5 }  // from the Group to a Node\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,html:`<span id="diagramEventsMsg">(message)</span>`,language:`js`,initiallyVisible:!0},{id:`inputEvents`,code:`function showMessage(s) {\r
  document.getElementById("inputEventsMsg").textContent = s;\r
}\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
      click: (e, obj) => showMessage("Clicked on " + obj.part.data.text)\r
    })\r
    .add(\r
      new go.Shape("Capsule", { fill: "white", stroke: "#007AFF" })\r
        .bind("fill", "group", g => {\r
          if (g) return "#007AFF";\r
          else return "white";\r
        }),\r
      new go.TextBlock({ stroke: "#007AFF", font: "11pt system-ui, sans-serif", margin: 4 })\r
        .bind("text")\r
        .bind("stroke", "group", g => {\r
          if (g) return "white";\r
          else return "#007AFF";\r
        })\r
    );\r
\r
diagram.groupTemplate =\r
  new go.Group("Vertical", {\r
      click: (e, obj) => showMessage("Clicked on " + obj.part.data.text),\r
      mouseEnter: (e, obj, prev) => {  // change group's background color and invert member nodes\r
        const shape = obj.part.findObject("SHAPE");\r
        if (shape) shape.fill = "#007AFF";\r
        obj.part.memberParts.each(member => {\r
          if (member instanceof go.Node) {\r
            const memberShape = member.elt(0);\r
            const memberText = member.elt(1);\r
            if (memberShape) memberShape.fill = "white";\r
            if (memberText) memberText.stroke = "#007AFF";\r
          }\r
        });\r
      },\r
      mouseLeave: (e, obj, next) => {  // restore to original color and member node colors\r
        const shape = obj.part.findObject("SHAPE");\r
        if (shape) shape.fill = "white";\r
        obj.part.memberParts.each(member => {\r
          if (member instanceof go.Node) {\r
            const memberShape = member.elt(0);\r
            const memberText = member.elt(1);\r
            if (memberShape) memberShape.fill = "#007AFF";\r
            if (memberText) memberText.stroke = "white";\r
          }\r
        });\r
      }\r
    })\r
    .add(\r
      new go.TextBlock({ stroke: "#1D1D1F", font: "bold 12pt system-ui, sans-serif", margin: 4 })\r
        .bind("text"),\r
      new go.Panel("Auto")\r
        .add(\r
          new go.Shape("RoundedRectangle", {\r
              name: "SHAPE",\r
              fill: "white",\r
              stroke: "lightgray"\r
            }),\r
          new go.Placeholder({ padding: 10 })\r
        )\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({ stroke: "#1D1D1F", strokeWidth: 1 })\r
    );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "Beta", group: 4 },\r
  { key: 3, text: "Gamma", group: 4 },\r
  { key: 4, text: "Omega", isGroup: true },\r
  { key: 5, text: "Delta" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 },  // from outside the Group to inside it\r
  { from: 2, to: 3 },  // this link is a member of the Group\r
  { from: 4, to: 5 }  // from the Group to a Node\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,html:`<span id="inputEventsMsg">(message)</span>`,language:`js`,initiallyVisible:!0},{id:`changeMethods`,code:`function showMessage(s) {\r
  document.getElementById("changeMethodsMsg").textContent = s;\r
}\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
      click: (e, obj) => showMessage("Clicked on " + obj.part.data.text),\r
      selectionAdorned: false,\r
      selectionChanged: part => {\r
        const shape = part.elt(0);\r
        shape.fill = part.isSelected ? "#007AFF" : "white";\r
        const text = part.elt(1);\r
        text.stroke = part.isSelected ? "white" : "#007AFF";\r
      }\r
    })\r
    .add(\r
      new go.Shape("Capsule", { fill: "white", stroke: "#007AFF" }),\r
      new go.TextBlock({ stroke: "#007AFF", font: "11pt system-ui, sans-serif", margin: 4 })\r
        .bind("text")\r
    );\r
\r
diagram.linkTemplate =\r
  new go.Link()\r
    .add(\r
      new go.Shape({ stroke: "#1D1D1F", strokeWidth: 1 })\r
    );\r
\r
const nodeDataArray = [\r
  { key: 1, text: "Alpha" },\r
  { key: 2, text: "Beta" },\r
  { key: 3, text: "Gamma" }\r
];\r
const linkDataArray = [\r
  { from: 1, to: 2 },\r
  { from: 2, to: 3 }\r
];\r
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);`,isExecutable:!0,animation:!1,html:`<span id="changeMethodsMsg">(message)</span>`,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1govkrj`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};