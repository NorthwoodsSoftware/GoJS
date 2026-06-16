import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Accessibility`},htmlContent:`<h1>Accessibility: keyboard control of GoJS Diagrams and screen readers</h1>\r
<p>\r
  If you haven't already, please read about ARIA and WCAG accessibility guidelines, as introduced at\r
  <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Information_for_Web_authors" target="_blank">Accessibility Information (MDN)</a>.\r
</p>\r
<p>\r
  By default each GoJS Diagram provides the ability for users who cannot or do not want to use a mouse\r
  but who can use a keyboard to use most tools that diagrams provide for manipulation.\r
  The focus navigation and virtual pointer capabilities must be enabled in each diagram,\r
  either programmatically or interactively.\r
</p>\r
<p>\r
  By default each GoJS Diagram provides generic support for screen readers when using focus navigation.\r
  However, because the GoJS library cannot know what is important to say and when,\r
  it is important for each diagram to customize exactly what is said for each state that the diagram might be in.\r
</p>\r
\r
<h2 id="focus-navigation-and-virtual-pointer"><a class="not-prose heading-anchor" href="#focus-navigation-and-virtual-pointer">Focus navigation and virtual pointer</a></h2>\r
<p>\r
  The <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> supports a "keyboard control" mode in which\r
  the user can use the keyboard to interact with a diagram without using the mouse.\r
  Nearly any kind of diagram can be controlled this way, except for commands or tools that\r
  are very time-dependent or that require specific pointing precision such as freehand drawing\r
  or cursive writing.\r
</p>\r
<p>\r
  This keyboard control mechanism supports a way to use the keyboard instead of the mouse\r
  to focus on a node or a link or on a button or editable TextBlock or port within a node or a link,\r
  and to act on it or to change focus to a nearby or related node or link or button or port.\r
  This kind of GoJS focus depends on but is in addition to the regular HTML DOM focus mechanism,\r
  because <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>s are not HTML elements and cannot by themselves receive DOM keyboard events.\r
</p>\r
<p>\r
  This mechanism only works as long as the diagram has HTML keyboard focus.\r
  If another HTML element gains HTML focus, including when the user <kbd>Tab</kbd>s out of the diagram,\r
  the commands described in this page no longer apply.\r
</p>\r
<p>\r
  The GoJS focus navigation mechanism is independent of the diagram's selection mechanism,\r
  although it does make it easy to select or deselect a focused node or link.\r
  Focus is shown using a single <a href="../api/symbols/Adornment.html" target="api">Adornment</a> that is the <a href="../api/symbols/CommandHandler.html#focusbox" target="api">CommandHandler.focusBox</a>.\r
  It is added to the <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a> that is the <a href="../api/symbols/CommandHandler.html#focus" target="api">CommandHandler.focus</a>, the GraphObject that has GoJS focus.\r
</p>\r
<p>\r
  The keyboard control mechanism also supports a virtual pointer to allow keyboard events to produce\r
  mouse <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s for invoking and controlling tools.\r
  The virtual pointer is shown as a single <a href="../api/symbols/Part.html" target="api">Part</a>, the <a href="../api/symbols/CommandHandler.html#virtualpointerbox" target="api">CommandHandler.virtualPointerBox</a>\r
  in the "Tool" <a href="../api/symbols/Layer.html" target="api">Layer</a>, when a <kbd>Shift</kbd> key is held down.\r
  <kbd>Shift</kbd> + arrow or numpad keys move it around, and other <kbd>Shift</kbd> modified keys\r
  perform actions to generate mouse <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s or modify future generated mouse <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s.\r
</p>\r
<p>\r
  Enable the GoJS keyboard control functionality in any Diagram by <kbd>Ctrl + Alt + Enter</kbd>.\r
  That command actually toggles whether or not the focus navigation and virtual pointer system are enabled.\r
  When <a href="../api/symbols/CommandHandler.html#isfocusenabled" target="api">CommandHandler.isFocusEnabled</a> and <a href="../api/symbols/CommandHandler.html#isvirtualpointerenabled" target="api">CommandHandler.isVirtualPointerEnabled</a> are false (the default)\r
  there is no difference in behavior from earlier versions of GoJS,\r
  except for the addition of this <kbd>Ctrl + Alt + Enter</kbd> command to toggle those two properties on and off.\r
</p>\r
\r
<h3 id="KeyboardCommandTable"><a class="not-prose heading-anchor" href="#KeyboardCommandTable">Keyboard commands</a></h3>\r
<p>\r
  For all of these commands, you can freely interchange <kbd>Meta</kbd> (<kbd>⌘</kbd> on macOS) with <kbd>Ctrl</kbd>.\r
</p>\r
<p>\r
  Activating a GraphObject (including a Part) means calling its <b>click</b> event handler,\r
  or editing a TextBlock if it is <a href="../api/symbols/TextBlock.html#editable" target="api">TextBlock.editable</a>, or showing its <b>toolTip</b>.\r
  Use the <kbd>ContextMenu</kbd> key (or <kbd>Shift + F10</kbd> if your keyboard doesn't have that button) to show a <a href="../api/symbols/GraphObject.html#contextmenu" target="api">GraphObject.contextMenu</a>.\r
</p>\r
<table class="keytable">\r
  <thead>\r
    <tr>\r
      <th>Keys</th>\r
      <th>Focus and Virtual Pointer Effect</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + Alt + Enter</kbd>\r
      </td>\r
      <td>toggle keyboard control mode</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>↑</kbd>\r
        <kbd>↓</kbd>\r
        <kbd>←</kbd>\r
        <kbd>→</kbd>\r
      </td>\r
      <td>\r
        change focus to nearby object within scope\r
        (top-level Parts, Group members, or GraphObjects within a Part)\r
      </td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + ↑</kbd>\r
        <kbd>Ctrl + ↓</kbd>\r
        <kbd>Ctrl + ←</kbd>\r
        <kbd>Ctrl + →</kbd>\r
      </td>\r
      <td>change focus from Node to a connected Link or to the next or the previous connected Link or Node</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Enter</kbd>\r
      </td>\r
      <td>focus enters Group subgraph or Part's GraphObjects or activates focused GraphObject within a Part</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Escape</kbd></td>\r
      <td>focus leaves for containing Part or containing Group</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + Enter</kbd>\r
      </td>\r
      <td>activates focused GraphObject, even if the focus is a Part</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Space</kbd></td>\r
      <td>select focused Part or show tooltip for focused GraphObject</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Ctrl + Space</kbd></td>\r
      <td>toggle focused Part selection or show tooltip for focused GraphObject</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + Space</kbd></td>\r
      <td>add focused Part to selection or show tooltip for focused GraphObject</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Shift</kbd>\r
      </td>\r
      <td>show virtual pointer when a <kbd>Shift</kbd> key is down and not when the key is up</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Shift + ↑</kbd>\r
        <kbd>Shift + ↓</kbd>\r
        <kbd>Shift + ←</kbd>\r
        <kbd>Shift + →</kbd>\r
      </td>\r
      <td>move virtual pointer 10 units in given direction</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + Shift + ↑</kbd>\r
        <kbd>Ctrl + Shift + ↓</kbd>\r
        <kbd>Ctrl + Shift + ←</kbd>\r
        <kbd>Ctrl + Shift + →</kbd>\r
      </td>\r
      <td>move virtual pointer 1 unit in given direction</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Shift + Numpad1</kbd> - <kbd>Shift + Numpad9</kbd>\r
        (except 5)\r
      </td>\r
      <td>move virtual pointer 10 units in given direction; 2, 4, 6, 8 down, left, right, up; 1, 3, 7, and 9 on the diagonal</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Ctrl + Shift + Numpad1</kbd> - <kbd>Ctrl + Shift + Numpad9</kbd>\r
        (except 5)\r
      </td>\r
      <td>move virtual pointer 1 unit in given direction; 2, 4, 6, 8 down, left, right, up; 1, 3, 7, and 9 on the diagonal</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Shift + Enter</kbd>\r
        <kbd>Shift + Numpad5</kbd>\r
      </td>\r
      <td>mouse button down or up</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + A</kbd></td>\r
      <td>toggle alt modifier for next mouse button event</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + C</kbd></td>\r
      <td>toggle control modifier for next mouse button event</td>\r
    </tr>\r
    <tr>\r
      <td>\r
        <kbd>Shift + D</kbd>\r
        <kbd>Shift + NumpadDecimal</kbd>\r
      </td>\r
      <td>toggles the click count between 1 and 2 for the next mouse button up event, which auto-resets to 1</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + M</kbd></td>\r
      <td>toggle meta modifier for next mouse button event</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + S</kbd></td>\r
      <td>toggle shift modifier for next mouse button event</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + 1</kbd></td>\r
      <td>use left button modifier on next mouse button event</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + 2</kbd></td>\r
      <td>use middle button modifier on next mouse button event</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + 3</kbd></td>\r
      <td>use right button modifier on next mouse button event</td>\r
    </tr>\r
    <tr>\r
      <td><kbd>Shift + Numpad0</kbd></td>\r
      <td>toggles between the left and right button modifiers for the next mouse button event</td>\r
    </tr>\r
  </tbody>\r
</table>\r
<p>\r
  All other commands operate in the standard manner, as listed in the\r
  <a href="commands#KeyboardCommandBindings">commands learn page</a>.\r
  They mostly operate on the current <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a>;\r
  none of them operate on the current <a href="../api/symbols/CommandHandler.html#focus" target="api">CommandHandler.focus</a>.\r
</p>\r
\r
<h3 id="focus-navigation"><a class="not-prose heading-anchor" href="#focus-navigation">Focus navigation</a></h3>\r
<p>\r
  The focus navigation mode handles arrow keys and the <kbd>Enter</kbd>, <kbd>Escape</kbd>, <kbd>Space</kbd>,\r
  and <kbd>ContextMenu</kbd> keys to allow the user to change\r
  which GraphObject has focus and to perform operations on what has focus.  The focus is completely independent of\r
  the <a href="../api/symbols/Diagram.html#selection" target="api">Diagram.selection</a> and <a href="../api/symbols/Diagram.html#highlighteds" target="api">Diagram.highlighteds</a> collections and mechanisms.\r
  All other keyboard commands should operate normally.\r
  For example, the <kbd>Delete</kbd> command will always operate on the selection, not on the focus.\r
</p>\r
<p>\r
  As focus changes, either a built-in element or a programmer supplied one can provide a screen reader\r
  some descriptive text to read aloud.\r
  Read more about this at <a href="#CustomizingforScreenReaders">Customizing for Screen Readers</a>.\r
</p>\r
\r
<h4>A simulation</h4>\r
<p>\r
  Here is a simulation, using emitted InputEvents, of using Arrow keys and Enter, Space, and Escape\r
  as if the user is controlling the focus in a diagram.\r
  As the simulation emits keyboard commands, they are recorded in a list that you can see.\r
</p>\r
<p>\r
  The first keyboard command is <kbd>Ctrl + Alt + Enter</kbd> in order to enable <a href="../api/symbols/CommandHandler.html#isfocusenabled" target="api">CommandHandler.isFocusEnabled</a>.\r
  Focus is given to a root Node, in this case the "Alpha" Node.\r
</p>\r
<p>\r
  <kbd>Ctrl</kbd> + arrow keys follow connected Links from a focused Node, so\r
  the first <kbd>Ctrl + ↓</kbd> key changes focus from the "Alpha" Node to the Link going to the "Beta" Node.\r
  A <kbd>Ctrl + →</kbd> would change focus to the second Link coming out of the "Alpha" Node.\r
  The next command, <kbd>Ctrl + ↓</kbd>, changes focus to that "Beta" Node.\r
</p>\r
<p>\r
  Then the <kbd>Enter</kbd> key changes focus to be on editable TextBlocks, buttons, and ports of the Node.\r
  Now the arrow keys focus on the next GraphObject within the Node in the direction determined by the arrow key.\r
  The <kbd>→</kbd> key focuses on the "TreeExpanderButton", which is then clicked twice with the <kbd>Enter</kbd> key.\r
</p>\r
<p>\r
  The <kbd>Escape</kbd> key leaves the context inside the Node back to the Node itself.\r
  Then the <kbd>→</kbd> key chooses the first Part to the right of the current focus, which is the "Gamma" Node.\r
  It is selected with the <kbd>Space</kbd> key, and deleted by the <kbd>Delete</kbd> key.\r
  (Remember that <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> commands operate on the selection, not on the focus.)\r
</p>\r
<p>\r
  Then it undoes the deletion, and programmatically focuses on the "Epsilon" Node.\r
  A couple arrow key commands changes focus to the "Delta" Node and then the "Beta" Node.\r
  The <kbd>ContextMenu</kbd> key brings up the context menu.\r
</p>\r
<p>\r
  There are two "ContextMenuButtons", with focus on the first one, which is invoked by the <kbd>Enter</kbd> key.\r
  The context menu command puts out a string to the Log.\r
  Focus is automatically returned to the Node, and finally an <kbd>↑</kbd> key changes focus back to the "Alpha" node.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>\r
  There are no Groups in this example, but if there had been, once a Group gets focus, the <kbd>Enter</kbd> key acts\r
  just as it does on any Node -- it changes focus to a GraphObject in the Group that is a button or port or editable TextBlock.\r
  Hitting <kbd>Escape</kbd>, if the Group has any member Parts, would change focus to one of those member Nodes.\r
  Once a member Part has focus, the <kbd>Escape</kbd> key changes focus back up to the Group itself.\r
</p>\r
\r
<h4>Try it</h4>\r
<p>\r
  You can try using focus navigation in any of our samples, or in your own app.\r
  For example you can try it in the <a href="../samples/incrementalTree" target="_blank">Incremental Tree</a> sample.\r
  Click in the diagram and type <kbd>Ctrl + Alt + Enter</kbd> to enable focus changing behavior.\r
</p>\r
<p>\r
  When a Node (or a Link) has focus you need to type <kbd>Enter</kbd> to change focus to any buttons\r
  (clickable GraphObjects) or editable TextBlocks or ports or GraphObjects with context menus or tool tips\r
  that are within the Node.\r
  When there is more than one, use the arrow keys to get to the GraphObject that you want.\r
  In the case of the Incremental Tree sample, the only eligible GraphObject within the Node is a "TreeExpanderButton".\r
  When it has focus you can type <kbd>Enter</kbd> to click on the button,\r
  expanding or collapsing its subtree.\r
</p>\r
<p>\r
  When you are navigating amongst the GraphObjects of a Node or a Link, the arrow keys stay within the Part.\r
  They only change focus to other eligible GraphObjects within that Part, if there are any.\r
  Remember to type <kbd>Escape</kbd> to change focus back to the containing Node,\r
  so that you can use the arrow keys to navigate to a different Node.\r
</p>\r
<p>\r
  If you are navigating in a diagram with Groups, you need to <kbd>Enter</kbd> a Group in order to focus on\r
  any of its member Parts.\r
  The arrow keys are limited to navigating amongst the member Parts of that one Group.\r
  You need to <kbd>Escape</kbd> to leave the subgraph and focus on the Group as a whole again,\r
  so that you can navigate to other Nodes in the diagram.\r
</p>\r
\r
<h3 id="virtual-pointer"><a class="not-prose heading-anchor" href="#virtual-pointer">Virtual pointer</a></h3>\r
<p>\r
  When the user holds down a <kbd>Shift</kbd> key, it goes into virtual pointer mode, where the <code>virtualPointerBox</code> shows where the virtual pointer is,\r
  and <kbd>Shift</kbd> + arrow keys move that <code>virtualPointerBox</code> around.  Moving the <code>virtualPointerBox</code> results in mouse-move <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s.\r
  Also holding down the <kbd>Ctrl</kbd> modifier when typing arrow keys offers finer positioning at one document unit per keystroke.\r
  <kbd>Shift + Enter</kbd> toggles whether the virtual pointer is 'down' or 'up', also shown in the <code>virtualPointerBox</code> with a thick dark-cyan circle\r
  indicating 'down', and results in mouse-down or mouse-up <a href="../api/symbols/InputEvent.html" target="api">InputEvent</a>s.\r
</p>\r
<p>\r
  Basically, to drag a node, type <kbd>Shift + Enter</kbd> to do the mouse-down,\r
  type <kbd>Shift</kbd> + arrow keys to move the virtual pointer around,\r
  and finally type <kbd>Shift + Enter</kbd> again to do the mouse-up and stop the drag.\r
  Note that <kbd>Shift</kbd> does not need to be held down the whole time during what would be a mouse-down/moves/up sequence.\r
  This allows almost any mouse <a href="../api/symbols/Tool.html" target="api">Tool</a> to run, except ones that involve timing which can be hard to control.\r
  Changing the current <code>focus</code> object automatically cancels any <a href="../api/symbols/Tool.html" target="api">Tool</a> running due to the virtual pointer mechanism,\r
  which helps with the times that the user forgets to do the second <kbd>Shift + Enter</kbd> for the mouse-up effect.\r
</p>\r
<p>\r
  <kbd>Shift + Space</kbd> changes the <code>focus</code> to be the <a href="../api/symbols/Part.html" target="api">Part</a> at the current <code>virtualPointerLocation</code>.\r
</p>\r
<p>\r
  Because <kbd>Shift</kbd> and <kbd>Ctrl</kbd> are used to control the virtual pointer, there is no natural way to specify modifiers\r
  during virtual mouse events, such as control-drag-and-drop in order to copy the selection.\r
  Nor is there a reasonable way to specify which button to use for mouse-down or mouse-up events,\r
  nor to control whether it's a single click or a double click.  So there are additional commands to control those\r
  aspects of future simulated mouse input events:\r
  <ul>\r
    <li>Type <kbd>Shift + A</kbd></span>, <span><kbd>Shift + S</kbd></span>, <span><kbd>Shift + C</kbd></span>, <span><kbd>Shift + M</kbd> to toggle each of\r
      <a href="../api/symbols/InputEvent.html#alt" target="api">InputEvent.alt</a>, <a href="../api/symbols/InputEvent.html#shift" target="api">InputEvent.shift</a>, <a href="../api/symbols/InputEvent.html#control" target="api">InputEvent.control</a>, <a href="../api/symbols/InputEvent.html#meta" target="api">InputEvent.meta</a>\r
    </li>\r
    <li>Type <kbd>Shift + 1</kbd></span>, <span><kbd>Shift + 2</kbd></span>, <span><kbd>Shift + 3</kbd> for one of\r
      <a href="../api/symbols/InputEvent.html#left" target="api">InputEvent.left</a>, <a href="../api/symbols/InputEvent.html#middle" target="api">InputEvent.middle</a>, <a href="../api/symbols/InputEvent.html#right" target="api">InputEvent.right</a>.\r
      Or type <kbd>Shift + Numpad0</kbd> to toggle between left and right mouse buttons.\r
    </li>\r
    <li>Type <kbd>Shift + D</kbd></span> (or <span><kbd>Shift + NumpadDecimal</kbd>) to specify a <a href="../api/symbols/InputEvent.html#clickcount" target="api">InputEvent.clickCount</a> of 2\r
      for the next <kbd>Shift + Enter</kbd> event that performs a mouse-up.\r
      After a simulated mouse up event the <a href="../api/symbols/InputEvent.html#clickcount" target="api">InputEvent.clickCount</a> is automatically reset to 1.\r
    </li>\r
  </ul>\r
</p>\r
\r
<h4>Virtual pointer appearance</h4>\r
<p>\r
  The current modifiers/button/clickCount state is reflected in the standard <code>virtualPointerBox</code>,\r
  as shown in the following simulation.\r
  The <a href="../api/symbols/Diagram.html#contextclick" target="api">Diagram.contextClick</a> event handler has been set to a function that logs "context clicked!".\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h4>A simulation</h4>\r
<p>\r
  This demonstration involves both focus navigation and use of the virtual pointer to draw a new Link and to resize a Node.\r
</p>\r
<p>\r
  First the user types <kbd>Ctrl + Alt + Enter</kbd> in order to enable <a href="../api/symbols/CommandHandler.html#isvirtualpointerenabled" target="api">CommandHandler.isVirtualPointerEnabled</a>.\r
  The user then uses the arrow keys to navigate to the "Delta" Node.\r
  An <kbd>Enter</kbd> changes focus to the GraphObjects within the Node.\r
  Arrow keys change focus to the bottom left port.\r
</p>\r
<p>\r
  Now the user starts the virtual pointer mode by holding down the <kbd>Shift</kbd> key.\r
  The virtual pointer starts at the center of the current <a href="../api/symbols/CommandHandler.html#focus" target="api">CommandHandler.focus</a>.\r
  An <kbd>Enter</kbd> key produces a mouse down event.\r
  Note that the virtual pointer has a darker circle, showing that the mouse is down during the mouse move.\r
  Then the following <kbd>Shift</kbd> + arrow keys start the <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a> to draw a new link.\r
  Then an <kbd>Enter</kbd> key produces a mouse up event, finishing drawing the new link.\r
</p>\r
<p>\r
  The focus has remained on the starting port in the "Delta" Node, so an <kbd>Escape</kbd> key changes focus to that Node.\r
  A <kbd>↓</kbd> and a <kbd>Space</kbd> key cause the "Epsilon" Node to be selected, showing its resize handles.\r
</p>\r
<p>\r
  The virtual pointer starts with a <kbd>Shift</kbd>, and right arrow keys move it to the resize handle on the right side.\r
  Note that one can use the <kbd>Ctrl</kbd> modifier with the <kbd>Shift</kbd> + arrow keys in order to move it just one document unit at a time,\r
  instead of the default 10 document units.\r
</p>\r
<p>\r
  The <a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a> is started by a mouse down caused by a <kbd>Shift + Enter</kbd>.\r
  Following <kbd>Shift</kbd> + arrow keys drag that resize handle, and another <kbd>Shift + Enter</kbd> produces a mouse up event,\r
  finishing the resizing of the node.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h3 id="general-concepts"><a class="not-prose heading-anchor" href="#general-concepts">General concepts</a></h3>\r
<p>\r
  The <kbd>Ctrl</kbd> and <kbd>Meta</kbd> modifier keys are interchangeable for all built-in command keyboard shortcuts.\r
  Use whatever works well on your keyboard.  But note that not all Tools are that way.\r
  For example, the <kbd>Ctrl</kbd> modifier when using the <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a> is replaced by the <kbd>Alt</kbd>\r
  modifier on macOS, following the convention there.\r
</p>\r
<p>\r
  The <kbd>Caps Lock</kbd>, <kbd>Insert</kbd>, and <kbd>Scroll Lock</kbd>\r
  keys are not used for GoJS keyboard control, and thus can be used by screen readers.\r
</p>\r
<p>\r
  <kbd>Tab</kbd> normally changes the HTML element that has DOM keyboard focus,\r
  and that behavior is unmodified while the diagram has keyboard focus.\r
  If the diagram is showing scrollbars, <kbd>Tab</kbd> will focus on the diagram's HTML element holding the scrollbars,\r
  allowing for the arrow keys to scroll normally.\r
</p>\r
<p>\r
  Note that nearly all of the regular keyboard-shortcut commands are unaffected by focus navigation.\r
  This includes the <a href="commands#KeyboardCommandBindings">common commands</a>:\r
  delete, cut, copy, paste, selectAll, undo, redo, *Zoom, group, ungroup, editTextBlock.\r
  However the arrow keys do not scroll, and the <kbd>ContextMenu</kbd> key works on the focus, not on the selection,\r
  unless there is no focus object.\r
</p>\r
<p>\r
  Events from an actual mouse input device, perhaps caused by accidentally moving it,\r
  may interfere with the intended behaviors using the virtual pointer.\r
</p>\r
\r
<h2 id="CustomizingforScreenReaders"><a class="not-prose heading-anchor" href="#CustomizingforScreenReaders">Customizing for screen readers</a></h2>\r
<p>\r
  You will want to provide your own function as the <a href="../api/symbols/CommandHandler.html#focuschanged" target="api">CommandHandler.focusChanged</a> event handler\r
  in order to customize exactly what is said and shown as the user changes the <a href="../api/symbols/CommandHandler.html#focus" target="api">CommandHandler.focus</a>\r
  to a new Node or Link, or to a button or editable TextBlock or port within a Node, or to null.\r
</p>\r
<p>\r
  Your page will probably want to have an &lt;output&gt; element\r
  that is updated as your <a href="../api/symbols/CommandHandler.html#focuschanged" target="api">CommandHandler.focusChanged</a> function is called.\r
  The CommandHandler needs to know about that element, so you also need to set <a href="../api/symbols/CommandHandler.html#liveelementid" target="api">CommandHandler.liveElementId</a>\r
  to refer to that element.\r
  It will set the <code>aria-labelledby</code> attribute to refer to your element.\r
  Do <em>not</em> set the <code>aria-live</code> attribute on that element.\r
</p>\r
<p>\r
  Exactly what information you put there should be very specific to your particular diagram.\r
  Only you the programmer can know exactly what your users will want or need to know as they traverse your diagram,\r
  and what language and terminology they will be expecting.\r
</p>\r
<p>\r
  You can call <a href="../api/symbols/CommandHandler.html#describe" target="api">CommandHandler.describe</a> in order to generate the default description for a focused\r
  GraphObject, given the previous focus.\r
</p>\r
<p>\r
  In Windows Narrator, when focus gets to the diagram,\r
  turn off scan mode (<kbd>CapsLock + Space</kbd>) so that the diagram is not considered a simple image,\r
  thereby allowing GoJS focus navigation.\r
  This action is not needed when using NVDA on Windows or Voice Over on macOS.\r
</p>\r
<p>\r
  Although you can programmatically turn on focus navigation mode in the diagram by setting the\r
  <a href="../api/symbols/CommandHandler.html#isfocusenabled" target="api">CommandHandler.isFocusEnabled</a> and <a href="../api/symbols/CommandHandler.html#isvirtualpointerenabled" target="api">CommandHandler.isVirtualPointerEnabled</a> properties,\r
  you could document to your users that they can invoke the <kbd>Ctrl + Alt + Enter</kbd> keyboard command\r
  in order to enable all of this functionality.\r
</p>\r
<p>\r
  For examples, examine the <a href="../samples/Accessibility">Accessibility</a> sample,\r
  which provides some customizations for the Org Chart Editor sample,\r
  or the <a href="../samples/IVRtree">IVR Tree</a> sample.\r
</p>\r
<p>\r
  If you compare the implementations of the <a href="../samples/Accessibility">Accessibility</a>\r
  and <a href="../samples/orgChartEditor">Org Chart Editor</a> samples,\r
  you will see that a function named <code>describe</code> has been added to better describe\r
  each of the Nodes, Links, and GraphObjects within Nodes.\r
</p>\r
<ul>\r
  <li>When the <a href="../api/symbols/CommandHandler.html#focus" target="api">CommandHandler.focus</a> is a Node, instead of reading all of the text visible in the node,\r
    it reads the important information, plus it lists the employees who report to that person.\r
    It uses application-specific terminology such as "employee" instead of "node".\r
  </li>\r
  <li>When the focus is a Link, it reads the standard information about a Link by calling the <a href="../api/symbols/CommandHandler.html#describe" target="api">CommandHandler.describe</a> method.\r
  </li>\r
  <li>For focused objects within a Node, it uses the standard description but also adds tooltip information.\r
    This is useful in providing meaningful information about the buttons that have no text.\r
  </li>\r
  <li>When there is no <a href="../api/symbols/CommandHandler.html#focus" target="api">CommandHandler.focus</a> GraphObject, it reads summary information about the diagram.\r
  </li>\r
  <li>When an employee role is added to the diagram, focus is changed to that new Node.\r
  </li>\r
</ul>\r
`,codeBlocks:[{id:`focus`,code:`diagram.layout = new go.LayeredDigraphLayout({ direction: 90 });\r
\r
diagram.div.style.backgroundColor = "#111827";\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot", {\r
    contextMenu:\r
      go.GraphObject.build("ContextMenu")\r
        .add(\r
          go.GraphObject.build("ContextMenuButton", {\r
            click: (e, button) => log("'Hello World!'")\r
          })\r
            .add(new go.TextBlock("Log 'Hello'")),\r
          go.GraphObject.build("ContextMenuButton", {\r
            click: (e, button) => log(\`'Bye \${button.part.adornedPart.data.text}'\`)\r
          })\r
            .add(new go.TextBlock("Log 'Goodbye'"))\r
        )\r
  })\r
  .add(\r
    new go.Panel("Auto", { portId: "" })\r
      .add(\r
        new go.Shape("RoundedRectangle", { fill: "#212B39", strokeWidth: 3, stroke: "#374151", parameter1: 4 }),\r
        new go.Panel("Horizontal", { margin: 8 }).add(\r
          new go.TextBlock({ editable: true, stroke: "white" })\r
            .bind("text"),\r
          go.GraphObject.build("TreeExpanderButton", {\r
            alignment: go.Spot.Right,\r
            alignmentFocus: go.Spot.Left,\r
            margin: new go.Margin(0, 0, 0, 8),\r
            "ButtonBorder.figure": "Circle",\r
            "ButtonBorder.fill": "#212B39",\r
            "ButtonBorder.stroke": "#4b5563", "ButtonBorder.strokeWidth": 1.5,\r
            "ButtonIcon.stroke": "white",\r
            mouseOver: (e, obj) => { obj.findObject("ButtonBorder").fill = "#374151"; },\r
        })\r
        )\r
      )\r
  );\r
\r
diagram.model =\r
  new go.GraphLinksModel({\r
    nodeDataArray: [\r
      { key: 1, text: "Alpha" },\r
      { key: 2, text: "Beta" },\r
      { key: 3, text: "Gamma" },\r
      { key: 4, text: "Delta" },\r
      { key: 5, text: "Epsilon" },\r
    ],\r
    linkDataArray: [\r
      { from: 1, to: 2 },\r
      { from: 1, to: 3 },\r
      { from: 2, to: 4 },\r
      { from: 2, to: 5 },\r
    ]\r
  });\r
\r
diagram.undoManager.isEnabled = true;\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 8 })\r
    .add(new go.Shape({ stroke: "#4b5563", strokeWidth: 2 }));\r
\r
// implement a log of actions\r
const myLog =\r
  new go.Part("Auto", {\r
    layerName: "ViewportBackground",\r
    selectable: false, pickable: false,\r
    alignment: new go.Spot(1, 0, -5, 5), alignmentFocus: go.Spot.TopRight,\r
    minSize: new go.Size(180, 350)\r
  })\r
  .add(\r
    new go.Shape("RoundedRectangle", { fill: "white" }),\r
    new go.Panel("Vertical", {\r
      margin: 5,\r
      alignment: go.Spot.TopLeft, stretch: go.Stretch.Horizontal\r
    })\r
    .add(\r
      new go.TextBlock("Log", { font: "bold 11pt sans-serif" }),\r
      new go.Panel("Vertical", {\r
        alignment: go.Spot.Left,\r
        defaultAlignment: go.Spot.Left,\r
        margin: 8,\r
        itemTemplate:\r
          new go.Panel()\r
            .add(\r
              new go.TextBlock({ stroke: "#212B39", font: "12px monospace", margin: 4 })\r
                .bind("text", "" )\r
            )\r
        }\r
      )\r
        .bind("itemArray", "logs")\r
    )\r
  )\r
diagram.add(myLog);\r
myLog.data = { logs: [] };\r
\r
function log(str, isKey) {\r
  diagram.model.commit(m => {\r
    m.addArrayItem(myLog.data.logs, isKey ? "> "+str : str);\r
  }, null);  // skipsUndoManager\r
}\r
\r
// implement simulation of keyboard input\r
let t = 0;\r
\r
function doKey(key, options) {\r
  log(\`\${options?.control ? "Ctrl-" : ""}\${options?.alt ? "Alt-" : ""}\${options?.shift ? "Shift-" : ""}\${key}\`, true);\r
  diagram.emitKeyDown(key, t++, options);\r
}\r
\r
let myActions1 = [];\r
function queueActions1() {\r
  myActions1 = [\r
    () => doKey('Enter', { control: true, alt: true }),  // turn on isFocusEnabled, focus on root Node\r
    () => doKey('ArrowDown', { control: true }),  // focus on link to Beta Node\r
    () => doKey('ArrowDown', { control: true }),  // focus on Beta Node\r
    () => doKey('Enter'),  // focus on Beta TextBlock\r
    () => doKey('ArrowRight'),  // focus on Beta Node's TreeExpanderButton\r
    () => doKey('Enter'),  // click on that button, collapsing subtree\r
    () => doKey('Enter'),  // click on that button again, expanding subtree\r
    () => doKey('Escape'),  // focus on Node again\r
    () => doKey('ArrowRight'),  // focus on Gamma Node\r
    () => doKey('Space'),  // select the Gamma Node\r
    () => doKey('Delete'),  // delete the selection\r
    () => doKey('z', { control: true }),  // undo\r
    () => { diagram.commandHandler.focus = diagram.findNodeForKey(5) },  // focus on Epsilon\r
    () => doKey('ArrowLeft'),  // focus on Delta Node\r
    () => doKey('ArrowUp'),  // focus on Beta Node\r
    () => doKey('ContextMenu'),  // activate contextMenu\r
    () => doKey('Enter'),  // click on Log 'Hello' context menu button\r
    () => doKey('ArrowUp')  // focus on Alpha Node\r
  ];\r
}\r
\r
function execute1() {\r
  const act = myActions1.shift();\r
  if (act) {\r
    act();\r
    setTimeout(execute1, 1500);\r
  }\r
}\r
\r
window.start1 = () => {\r
  // reset and restart\r
  diagram.clearSelection();\r
  diagram.commandHandler.isFocusEnabled = false;\r
  diagram.commandHandler.isVirtualPointerEnabled = false;\r
  diagram.model.commit(m => m.set(myLog.data, "logs", []), null);\r
  queueActions1();\r
  execute1();\r
}`,isExecutable:!0,animation:!1,html:`<div>
    <button onclick="start1()" style="
        background-color: #2563eb;
        color: white;
        border: none;
        padding: 10px 18px;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;">
        Start Simulation
      </button>
  </div>`,hideCode:!0,minHeight:415,language:`js`,initiallyVisible:!1},{id:`virtualpointerappearance`,code:`diagram.contextClick = e => log("context clicked!");\r
\r
diagram.div.style.backgroundColor = "#111827";\r
\r
// implement a log of actions\r
const myLog =\r
  new go.Part("Auto", {\r
    layerName: "ViewportBackground",\r
    selectable: false, pickable: false,\r
    alignment: new go.Spot(1, 0, -5, 5), alignmentFocus: go.Spot.TopRight,\r
    minSize: new go.Size(180, 215)\r
  })\r
  .add(\r
    new go.Shape("RoundedRectangle", { fill: "white" }),\r
    new go.Panel("Vertical", {\r
      margin: 5,\r
      alignment: go.Spot.TopLeft, stretch: go.Stretch.Horizontal\r
    })\r
    .add(\r
      new go.TextBlock("Log", { font: "bold 11pt sans-serif" }),\r
      new go.Panel("Vertical", {\r
        alignment: go.Spot.Left,\r
        defaultAlignment: go.Spot.Left,\r
        margin: 8,\r
        itemTemplate:\r
          new go.Panel()\r
            .add(\r
              new go.TextBlock({ stroke: "#212B39", font: "12px monospace", margin: 4 })\r
                .bind("text", "" )\r
            )\r
        }\r
      )\r
        .bind("itemArray", "logs")\r
    )\r
  )\r
diagram.add(myLog);\r
myLog.data = { logs: [] };\r
\r
function log(str, isKey) {\r
  diagram.model.commit(m => {\r
    m.addArrayItem(myLog.data.logs, isKey ? "> "+str : str);\r
  }, null);  // skipsUndoManager\r
}\r
\r
// implement simulation of keyboard input\r
let t = 0;\r
\r
function doKey(key, options) {\r
  log(\`\${options?.control ? "Ctrl-" : ""}\${options?.alt ? "Alt-" : ""}\${options?.shift ? "Shift-" : ""}\${key}\`, true);\r
  diagram.emitKeyDown(key, t++, options);\r
}\r
\r
let myActionsA = [];\r
function queueActions() {\r
  const shift = { shift: true };\r
  myActionsA = [\r
    () => doKey('Enter', { control: true, alt: true }),  // turn on isVirtualPointerEnabled\r
    () => doKey('ShiftLeft', shift),  // show virtual pointer\r
    () => doKey('ArrowRight', shift), // move the virtual pointer\r
    () => doKey('ArrowRight', shift), // move the virtual pointer\r
    () => doKey('Digit3', shift),     // use right mouse button\r
    () => doKey('Digit1', shift),     // no, use left mouse button?\r
    () => doKey('Digit3', shift),     // yes, use right mouse button after all\r
    () => doKey('Enter', shift),      // right mouse button down\r
    () => doKey('Enter', shift)       // right mouse button up\r
  ];\r
}\r
\r
function execute() {\r
  const act = myActionsA.shift();\r
  if (act) {\r
    act();\r
    setTimeout(execute, 1500);\r
  }\r
}\r
\r
window.startA = () => {\r
  // reset and restart\r
  diagram.clearSelection();\r
  diagram.commandHandler.isFocusEnabled = false;\r
  diagram.commandHandler.isVirtualPointerEnabled = false;\r
  diagram.model.commit(m => m.set(myLog.data, "logs", []), null);\r
  queueActions();\r
  execute();\r
}`,isExecutable:!0,animation:!1,html:`<div>
      <button onclick="startA()" style="
        background-color: #2563eb;
        color: white;
        border: none;
        padding: 10px 18px;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;">
        Start Simulation
      </button>
    </div>`,hideCode:!0,minHeight:280,language:`js`,initiallyVisible:!1},{id:`virtualpointer`,code:`diagram.layout = new go.LayeredDigraphLayout({ direction: 90, isOngoing: false });\r
\r
diagram.div.style.backgroundColor = "#111827";\r
\r
function makePort(name, spot, output) {\r
  // the port is basically just a small transparent circle\r
  return new go.Shape({\r
    fill: output ? "#10b981" : "#06b6d4",\r
    strokeWidth: 0,\r
    desiredSize: new go.Size(12, 4),\r
    alignment: spot, // align the port on the main Shape\r
    alignmentFocus: spot.opposite(), // just inside the Shape\r
    portId: name, // declare this object to be a "port"\r
    fromSpot: go.Spot.Bottom,\r
    toSpot: go.Spot.Top, // declare where links may connect at this port\r
    fromLinkable: output,\r
    toLinkable: !output, // declare whether the user may draw links to/from here\r
    cursor: 'pointer' // show a different cursor to indicate potential link point\r
  });\r
}\r
\r
diagram.nodeTemplate =\r
  new go.Node("Spot", {\r
      selectionObjectName: "BODY",\r
      resizable: true, resizeObjectName: "BODY"\r
    })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Panel("Auto", { name: "BODY" })\r
        .bindTwoWay("desiredSize", "size", go.Size.parse, go.Size.stringify)\r
        .add(\r
          new go.Shape("RoundedRectangle", { fill: "#212B39", strokeWidth: 3, stroke: "#374151", parameter1: 4 }),\r
          new go.TextBlock({ stroke: "white", font: "14px system-ui, sans-serif", margin: new go.Margin(8, 16), editable: true })\r
            .bind("text")\r
        ),\r
        makePort("i0", new go.Spot(0.25, 0), false),\r
        makePort("i1", new go.Spot(0.5, 0), false),\r
        makePort("i2", new go.Spot(0.75, 0), false),\r
        makePort("o0", new go.Spot(0.25, 1), true),\r
        makePort("o1", new go.Spot(0.5, 1), true),\r
        makePort("o2", new go.Spot(0.75, 1), true)\r
      );\r
\r
// implement a log of actions\r
const myLog =\r
  new go.Part("Auto", {\r
    layerName: "ViewportBackground",\r
    selectable: false, pickable: false,\r
    alignment: new go.Spot(1, 0, -5, 5), alignmentFocus: go.Spot.TopRight,\r
    minSize: new go.Size(200, 515)\r
  })\r
  .add(\r
    new go.Shape("RoundedRectangle", { fill: "white" }),\r
    new go.Panel("Vertical", {\r
      margin: 5,\r
      alignment: go.Spot.TopLeft, stretch: go.Stretch.Horizontal\r
    })\r
    .add(\r
      new go.TextBlock("Log", { font: "bold 11pt sans-serif" }),\r
      new go.Panel("Vertical", {\r
        alignment: go.Spot.Left,\r
        defaultAlignment: go.Spot.Left,\r
        margin: 8,\r
        itemTemplate:\r
          new go.Panel()\r
            .add(\r
              new go.TextBlock({ stroke: "#212B39", font: "12px monospace", margin: 4 })\r
                .bind( "text", "", t => "> " + t )\r
            )\r
        }\r
      )\r
        .bind("itemArray", "logs")\r
    )\r
  )\r
\r
diagram.model =\r
  new go.GraphLinksModel({\r
    linkFromPortIdProperty: "fid",\r
    linkToPortIdProperty: "tid",\r
    nodeDataArray: [\r
      { key: 1, text: "Alpha" },\r
      { key: 2, text: "Beta" },\r
      { key: 3, text: "Gamma" },\r
      { key: 4, text: "Delta" },\r
      { key: 5, text: "Epsilon" },\r
    ],\r
    linkDataArray: [\r
      { from: 1, fid: "o1", to: 3, tid: "i0" },\r
      { from: 2, fid: "o0", to: 3, tid: "i2" },\r
      { from: 2, fid: "o2", to: 4, tid: "i1" },\r
      { from: 3, fid: "o2", to: 5, tid: "i0" },\r
      { from: 4, fid: "o1", to: 5, tid: "i1" },\r
    ]\r
  });\r
\r
diagram.add(myLog);\r
myLog.data = { logs: [] };\r
\r
diagram.undoManager.isEnabled = true;\r
\r
function log2(str) {\r
diagram.model.commit(m => {\r
  m.addArrayItem(myLog.data.logs, str);\r
}, null);  // skipsUndoManager\r
}\r
\r
// implement simulation of keyboard input\r
let t = 0;\r
\r
function doKey2(key, options) {\r
log2(\`\${options?.control ? "Ctrl-" : ""}\${options?.alt ? "Alt-" : ""}\${options?.shift ? "Shift-" : ""}\${key}\`);\r
diagram.emitKeyDown(key, t++, options);\r
}\r
\r
let myActions2 = [];\r
function queueActions2() {\r
const shift = { shift: true };\r
myActions2 = [\r
  () => doKey2('Enter', { control: true, alt: true }),  // turn on isVirtualPointerEnabled\r
  () => doKey2('ArrowRight'),  // focus on Beta Node\r
  () => doKey2('ArrowDown', { control: true }),  // focus on Link to Gamma Node\r
  () => doKey2('ArrowRight', { control: true }),  // focus on Link to Delta Node\r
  () => doKey2('ArrowDown', { control: true }),  // focus on Gamma Node\r
  () => doKey2('Enter'),  // focus on editable TextBlock of Delta Node\r
  () => doKey2('ArrowDown'),  // focus on Delta Node's middle output port\r
  () => doKey2('ArrowLeft'),  // focus on Delta Node's left output port\r
  () => doKey2('ShiftLeft', shift),  // start virtual pointer at middle of port\r
  () => doKey2('Enter', shift),  // mouse down, starting drawing new Link\r
  () => doKey2('ArrowDown', shift),  // move the virtual pointer\r
  () => doKey2('ArrowDown', shift),  // move the virtual pointer\r
  () => doKey2('ArrowRight', shift),  // change target port\r
  () => doKey2('ArrowDown', shift),  // move the virtual pointer\r
  () => doKey2('Enter', shift),  // mouse up, finish drawing new Link\r
  () => doKey2('Escape'),  // change focus back up to Delta Node\r
  () => doKey2('ArrowDown'),  // focus on Epsilon Node\r
  () => doKey2('Space'),  // select Epsilon Node (for resizing)\r
  () => doKey2('ShiftLeft', shift),  // start virtual pointer\r
  () => doKey2('ArrowRight', shift), // move virtual pointer rightward\r
  () => doKey2('ArrowRight', shift), // move virtual pointer rightward\r
  () => doKey2('ArrowRight', shift), // move virtual pointer rightward\r
  () => doKey2('ArrowRight', shift), // move virtual pointer rightward\r
  () => doKey2('ArrowRight', { shift: true, control: true }), // move virtual pointer rightward by a smaller amount (1 instead of 10)\r
  () => doKey2('Enter', shift),  // mouse down, start resizing Node\r
  () => doKey2('ArrowRight', shift),  // resize rightward\r
  () => doKey2('ArrowRight', shift),  // resize rightward\r
  () => doKey2('Enter', shift),  // mouse up, finish resizing Node\r
  () => doKey2('Escape')  // remove focus box\r
];\r
}\r
\r
function execute2() {\r
const act = myActions2.shift();\r
if (act) {\r
  act();\r
  setTimeout(execute2, 1500);\r
}\r
}\r
\r
window.start2 = () => {\r
// reset and restart\r
diagram.clearSelection();\r
diagram.commandHandler.isFocusEnabled = false;\r
diagram.commandHandler.isVirtualPointerEnabled = false;\r
diagram.model.commit(m => m.set(myLog.data, "logs", []), null);\r
queueActions2();\r
execute2();\r
}\r
\r
diagram.linkTemplate =\r
  new go.Link({ routing: go.Routing.Orthogonal, corner: 8 })\r
    .add(new go.Shape({ stroke: "#4b5563", strokeWidth: 2 }));`,isExecutable:!0,animation:!1,html:`<div>
    <button onclick="start2()" style="
        background-color: #2563eb;
        color: white;
        border: none;
        padding: 10px 18px;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;">
        Start simulation
      </button>
  </div>`,hideCode:!0,minHeight:580,language:`js`,initiallyVisible:!1}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1jshf0e`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};