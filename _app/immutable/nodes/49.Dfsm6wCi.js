import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`User permissions`},htmlContent:`<h1>User permissions</h1>\r
<p>Programmatically there are no restrictions on what you can do. However you may want to restrict the actions that your users may perform.</p>\r
\r
<h3 id="DiagramIsEnabled"><a class="not-prose heading-anchor" href="#DiagramIsEnabled">Diagram.isEnabled</a></h3>\r
<p>\r
  The simplest restriction is to set <a href="../api/symbols/Diagram.html#isenabled" target="api">Diagram.isEnabled</a> to false. Users will not be able to do much of anything. In this example, even though the\r
  grouping, undo, and redo commands are enabled, the commands cannot execute because the diagram is disabled.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<h3 id="DiagramIsReadOnly"><a class="not-prose heading-anchor" href="#DiagramIsReadOnly">Diagram.isReadOnly</a></h3>\r
<p>\r
  More common is to set <a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> to true. This allows users to scroll and zoom and to select parts, but not to insert or delete or drag or\r
  modify parts. (If you want to allow scroll and zoom but not selection, you can disable selection, as discussed below.)\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<h3 id="DiagramIsModelReadOnly"><a class="not-prose heading-anchor" href="#DiagramIsModelReadOnly">Diagram.isModelReadOnly</a></h3>\r
<p>\r
  Another possibility is to set <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> to true. This allows users to scroll, zoom, select, and move parts, but not to insert or delete parts,\r
  including not adding or removing links nor adding or removing group members.\r
</p>\r
<p>\r
  The <a href="../api/symbols/Diagram.html#ismodelreadonly" target="api">Diagram.isModelReadOnly</a> property just gets and sets the <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> property. If you are loading new Models, you will need to set this\r
  Diagram property after setting <a href="../api/symbols/Diagram.html#model" target="api">Diagram.model</a>.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h3 id="AllowingCollapseExpand"><a class="not-prose heading-anchor" href="#AllowingCollapseExpand">Allowing collapse and expand</a></h3>\r
<p>\r
  One common situation with diagrams that are <a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> is that the user can not collapse or expand trees or subgraphs. Instead of setting\r
  <a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a>, you can set these properties:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h2 id="SpecificPermissions"><a class="not-prose heading-anchor" href="#SpecificPermissions">Specific permissions</a></h2>\r
<p>\r
  More precise restrictions on the user can be imposed by setting properties of the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> or of a particular <a href="../api/symbols/Layer.html" target="api">Layer</a> or of a particular\r
  <a href="../api/symbols/Part.html" target="api">Part</a> or <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>.\r
</p>\r
<p>\r
  Some restrictions, such as <a href="../api/symbols/Diagram.html#allowzoom" target="api">Diagram.allowZoom</a>, only make sense when applying to the whole diagram. Others may also apply to individual parts, such as\r
  <a href="../api/symbols/Part.html#copyable" target="api">Part.copyable</a> and <a href="../api/symbols/Layer.html#allowcopy" target="api">Layer.allowCopy</a> corresponding to <a href="../api/symbols/Diagram.html#allowcopy" target="api">Diagram.allowCopy</a>. Finally some may apply to any <a href="../api/symbols/GraphObject.html" target="api">GraphObject</a>, for example\r
  properties for ports such as <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a>, or to text objects such as <a href="../api/symbols/TextBlock.html#editable" target="api">TextBlock.editable</a>.\r
</p>\r
<p>\r
  Any <a href="../api/symbols/Tool.html" target="api">Tool</a> can be disabled by setting <a href="../api/symbols/Tool.html#isenabled" target="api">Tool.isEnabled</a> to false. By default all Tools are enabled, but many cannot run because the conditions are\r
  not right for <a href="../api/symbols/Tool.html#canstart" target="api">Tool.canStart</a> to return true.\r
</p>\r
<p>Here is a listing of what users can do and the properties that limit that functionality. Most of these properties have a default value of true.</p>\r
\r
<h3 id="CutCommand"><a class="not-prose heading-anchor" href="#CutCommand">Cut command (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowcopy" target="api">Diagram.allowCopy</a>, <a href="../api/symbols/Diagram.html#allowdelete" target="api">Diagram.allowDelete</a>, <a href="../api/symbols/Diagram.html#allowclipboard" target="api">Diagram.allowClipboard</a></li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
</ul>\r
\r
<h3 id="CopyCommand"><a class="not-prose heading-anchor" href="#CopyCommand">Copy command (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowcopy" target="api">Diagram.allowCopy</a>, <a href="../api/symbols/Diagram.html#allowclipboard" target="api">Diagram.allowClipboard</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowcopy" target="api">Layer.allowCopy</a></li>\r
  <li><a href="../api/symbols/Part.html#copyable" target="api">Part.copyable</a></li>\r
</ul>\r
\r
<h3 id="PasteCommand"><a class="not-prose heading-anchor" href="#PasteCommand">Paste command (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowinsert" target="api">Diagram.allowInsert</a>, <a href="../api/symbols/Diagram.html#allowclipboard" target="api">Diagram.allowClipboard</a></li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
  <li>The clipboard's data format must be the same as the <a href="../api/symbols/Model.html#dataformat" target="api">Model.dataFormat</a></li>\r
</ul>\r
\r
<h3 id="DeleteCommand"><a class="not-prose heading-anchor" href="#DeleteCommand">Delete command (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowdelete" target="api">Diagram.allowDelete</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowdelete" target="api">Layer.allowDelete</a></li>\r
  <li><a href="../api/symbols/Part.html#deletable" target="api">Part.deletable</a></li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
</ul>\r
\r
<h3 id="DragAndDropWithinDiagram"><a class="not-prose heading-anchor" href="#DragAndDropWithinDiagram">Drag-and-drop within diagram (<a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowmove" target="api">Diagram.allowMove</a>, <a href="../api/symbols/Diagram.html#allowcopy" target="api">Diagram.allowCopy</a>, <a href="../api/symbols/Diagram.html#allowinsert" target="api">Diagram.allowInsert</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowmove" target="api">Layer.allowMove</a>, <a href="../api/symbols/Layer.html#allowcopy" target="api">Layer.allowCopy</a></li>\r
  <li><a href="../api/symbols/Part.html#movable" target="api">Part.movable</a>, <a href="../api/symbols/Part.html#copyable" target="api">Part.copyable</a></li>\r
  <li><a href="../api/symbols/DraggingTool.html#iscopyenabled" target="api">DraggingTool.isCopyEnabled</a></li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> for moving (default value is false)</li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> for copying (default values are false)</li>\r
  <li>Many properties affect dragging, including: <a href="../api/symbols/Part.html#maxlocation" target="api">Part.maxLocation</a>, <a href="../api/symbols/Part.html#minlocation" target="api">Part.minLocation</a>, <a href="../api/symbols/Part.html#dragcomputation" target="api">Part.dragComputation</a>, and\r
    <a href="../api/symbols/DraggingTool.html#isgridsnapenabled" target="api">DraggingTool.isGridSnapEnabled</a>. Read about limiting user drags to be only horizontal or only vertical or only within the containing <a href="../api/symbols/Group.html" target="api">Group</a> in\r
    the documentation for <a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>.\r
  </li>\r
  <li><a href="../api/symbols/DraggingTool.html#isenabled" target="api">DraggingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="DragAndDropOutOfDiagram"><a class="not-prose heading-anchor" href="#DragAndDropOutOfDiagram">Drag-and-drop out of diagram (<a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowdragout" target="api">Diagram.allowDragOut</a> (default value is false except for <a href="../api/symbols/Palette.html" target="api">Palette</a> where it is true)</li>\r
  <li><a href="../api/symbols/DraggingTool.html#isenabled" target="api">DraggingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="DragAndDropIntoDiagram"><a class="not-prose heading-anchor" href="#DragAndDropIntoDiagram">Drag-and-drop into diagram (<a href="../api/symbols/DraggingTool.html" target="api">DraggingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowdrop" target="api">Diagram.allowDrop</a> (default value is true)</li>\r
  <li><a href="../api/symbols/Diagram.html#allowinsert" target="api">Diagram.allowInsert</a></li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
  <li><a href="../api/symbols/DraggingTool.html#isenabled" target="api">DraggingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="InPlaceTextEditing"><a class="not-prose heading-anchor" href="#InPlaceTextEditing">In-place text editing (<a href="../api/symbols/TextEditingTool.html" target="api">TextEditingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowtextedit" target="api">Diagram.allowTextEdit</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowtextedit" target="api">Layer.allowTextEdit</a></li>\r
  <li><a href="../api/symbols/Part.html#texteditable" target="api">Part.textEditable</a></li>\r
  <li><a href="../api/symbols/TextBlock.html#editable" target="api">TextBlock.editable</a>, <a href="../api/symbols/TextBlock.html#textvalidation" target="api">TextBlock.textValidation</a>, and <a href="../api/symbols/TextEditingTool.html#textvalidation" target="api">TextEditingTool.textValidation</a> affect text editing (these are discussed in the\r
    section about <a href="validation">Validation</a>)\r
  </li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> (default value is false)</li>\r
  <li><a href="../api/symbols/TextEditingTool.html#isenabled" target="api">TextEditingTool.isEnabled</a></li>\r
  <li><a href="../api/symbols/TextEditingTool.html#starting" target="api">TextEditingTool.starting</a> controls how the editing may be initiated.</li>\r
</ul>\r
\r
<h3 id="GroupCommand"><a class="not-prose heading-anchor" href="#GroupCommand">Group command (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowgroup" target="api">Diagram.allowGroup</a>, <a href="../api/symbols/Diagram.html#allowinsert" target="api">Diagram.allowInsert</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowgroup" target="api">Layer.allowGroup</a></li>\r
  <li><a href="../api/symbols/Part.html#groupable" target="api">Part.groupable</a></li>\r
  <li>The <a href="../api/symbols/CommandHandler.html#groupselection" target="api">CommandHandler.groupSelection</a> command requires that <a href="../api/symbols/CommandHandler.html#archetypegroupdata" target="api">CommandHandler.archetypeGroupData</a> has been set to a data object to be copied into the\r
    model to be represented by a new group in the diagram; this property is null by default, causing the command to be disabled. You will need to set the\r
    property to an object so that newly created groups have the desired property values for any data binding by the group template.\r
  </li>\r
  <li><a href="../api/symbols/Group.html#membervalidation" target="api">Group.memberValidation</a> and <a href="../api/symbols/CommandHandler.html#membervalidation" target="api">CommandHandler.memberValidation</a> also control which Parts may become members of a Group</li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
</ul>\r
\r
<h3 id="UngroupCommand"><a class="not-prose heading-anchor" href="#UngroupCommand">Ungroup command (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowungroup" target="api">Diagram.allowUngroup</a>, <a href="../api/symbols/Diagram.html#allowdelete" target="api">Diagram.allowDelete</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowungroup" target="api">Layer.allowUngroup</a></li>\r
  <li><a href="../api/symbols/Group.html#ungroupable" target="api">Group.ungroupable</a> (default value is false)</li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
</ul>\r
\r
<h3 id="ClickCreating"><a class="not-prose heading-anchor" href="#ClickCreating">Click-creating (<a href="../api/symbols/ClickCreatingTool.html" target="api">ClickCreatingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowinsert" target="api">Diagram.allowInsert</a></li>\r
  <li>The <a href="../api/symbols/ClickCreatingTool.html" target="api">ClickCreatingTool</a> requires that <a href="../api/symbols/ClickCreatingTool.html#archetypenodedata" target="api">ClickCreatingTool.archetypeNodeData</a>\r
    has been set to a data object to be copied into the model to be represented by a new part in the diagram; this property is null by default, causing the tool\r
    to be disabled. You will need to set the property to an object so that newly created nodes have the desired property values for any data binding by the node\r
    template.\r
  </li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
  <li><a href="../api/symbols/ClickCreatingTool.html#isenabled" target="api">ClickCreatingTool.isEnabled</a></li>\r
  <li><a href="../api/symbols/ClickCreatingTool.html#isdoubleclick" target="api">ClickCreatingTool.isDoubleClick</a> whether to insert on single click or double click.</li>\r
</ul>\r
\r
<h3 id="DrawingNewLink"><a class="not-prose heading-anchor" href="#DrawingNewLink">Drawing a new link (<a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowlink" target="api">Diagram.allowLink</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowlink" target="api">Layer.allowLink</a></li>\r
  <li><a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a>, <a href="../api/symbols/GraphObject.html#fromlinkableduplicates" target="api">GraphObject.fromLinkableDuplicates</a>, <a href="../api/symbols/GraphObject.html#fromlinkableselfnode" target="api">GraphObject.fromLinkableSelfNode</a>, <a href="../api/symbols/GraphObject.html#frommaxlinks" target="api">GraphObject.fromMaxLinks</a>,\r
    <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a>, <a href="../api/symbols/GraphObject.html#tolinkableduplicates" target="api">GraphObject.toLinkableDuplicates</a>, <a href="../api/symbols/GraphObject.html#tolinkableselfnode" target="api">GraphObject.toLinkableSelfNode</a>, <a href="../api/symbols/GraphObject.html#tomaxlinks" target="api">GraphObject.toMaxLinks</a> (these are\r
    discussed in the section about <a href="validation">Validation</a>)\r
  </li>\r
  <li>The <a href="../api/symbols/LinkingTool.html" target="api">LinkingTool</a> requires that <a href="../api/symbols/LinkingTool.html#archetypelinkdata" target="api">LinkingTool.archetypeLinkData</a> has been set to a data object to be copied into the model to be represented by a\r
    new link in the diagram; this property is by default set to an empty JavaScript object. You may need to want to set properties on this object so that newly\r
    created links have the desired property values for any data binding by the link template.\r
  </li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
  <li><a href="../api/symbols/LinkingTool.html#isenabled" target="api">LinkingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="RelinkingExistingLink"><a class="not-prose heading-anchor" href="#RelinkingExistingLink">Relinking an existing link (<a href="../api/symbols/RelinkingTool.html" target="api">RelinkingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowrelink" target="api">Diagram.allowRelink</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowrelink" target="api">Layer.allowRelink</a></li>\r
  <li><a href="../api/symbols/Link.html#relinkablefrom" target="api">Link.relinkableFrom</a>, <a href="../api/symbols/Link.html#relinkableto" target="api">Link.relinkableTo</a> (default values are false)</li>\r
  <li><a href="../api/symbols/GraphObject.html#fromlinkable" target="api">GraphObject.fromLinkable</a>, <a href="../api/symbols/GraphObject.html#fromlinkableduplicates" target="api">GraphObject.fromLinkableDuplicates</a>, <a href="../api/symbols/GraphObject.html#fromlinkableselfnode" target="api">GraphObject.fromLinkableSelfNode</a>, <a href="../api/symbols/GraphObject.html#frommaxlinks" target="api">GraphObject.fromMaxLinks</a>,\r
    <a href="../api/symbols/GraphObject.html#tolinkable" target="api">GraphObject.toLinkable</a>, <a href="../api/symbols/GraphObject.html#tolinkableduplicates" target="api">GraphObject.toLinkableDuplicates</a>, <a href="../api/symbols/GraphObject.html#tolinkableselfnode" target="api">GraphObject.toLinkableSelfNode</a>, <a href="../api/symbols/GraphObject.html#tomaxlinks" target="api">GraphObject.toMaxLinks</a> (these are\r
    discussed in the section about <a href="validation">Validation</a>)\r
  </li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
  <li><a href="../api/symbols/RelinkingTool.html#isenabled" target="api">RelinkingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="ReshapingLink"><a class="not-prose heading-anchor" href="#ReshapingLink">Reshaping a link (<a href="../api/symbols/LinkReshapingTool.html" target="api">LinkReshapingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowreshape" target="api">Diagram.allowReshape</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowreshape" target="api">Layer.allowReshape</a></li>\r
  <li><a href="../api/symbols/Part.html#reshapable" target="api">Part.reshapable</a> (default value is false)</li>\r
  <li><a href="../api/symbols/Link.html#resegmentable" target="api">Link.resegmentable</a> also affects whether segments can be added or removed (default value is false)</li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> (default value is false)</li>\r
  <li><a href="../api/symbols/LinkReshapingTool.html#isenabled" target="api">LinkReshapingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="ResizingObject"><a class="not-prose heading-anchor" href="#ResizingObject">Resizing an object (<a href="../api/symbols/ResizingTool.html" target="api">ResizingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowresize" target="api">Diagram.allowResize</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowresize" target="api">Layer.allowResize</a></li>\r
  <li><a href="../api/symbols/Part.html#resizable" target="api">Part.resizable</a> (default value is false)</li>\r
  <li><a href="../api/symbols/Part.html#resizecellsize" target="api">Part.resizeCellSize</a>, <a href="../api/symbols/GraphObject.html#maxsize" target="api">GraphObject.maxSize</a>, and <a href="../api/symbols/GraphObject.html#minsize" target="api">GraphObject.minSize</a> limit the size to which the user may resize the\r
    <a href="../api/symbols/Part.html#resizeobject" target="api">Part.resizeObject</a>\r
  </li>\r
  <li><a href="../api/symbols/ResizingTool.html#maxsize" target="api">ResizingTool.maxSize</a>, <a href="../api/symbols/ResizingTool.html#minsize" target="api">ResizingTool.minSize</a>, and <a href="../api/symbols/ResizingTool.html#cellsize" target="api">ResizingTool.cellSize</a> limit the size to which the user may resize the\r
    <a href="../api/symbols/Part.html#resizeobject" target="api">Part.resizeObject</a>\r
  </li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> (default value is false)</li>\r
  <li><a href="../api/symbols/ResizingTool.html#isenabled" target="api">ResizingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="RotatingObject"><a class="not-prose heading-anchor" href="#RotatingObject">Rotating an object (<a href="../api/symbols/RotatingTool.html" target="api">RotatingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowrotate" target="api">Diagram.allowRotate</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowrotate" target="api">Layer.allowRotate</a></li>\r
  <li><a href="../api/symbols/Part.html#rotatable" target="api">Part.rotatable</a> (default value is false)</li>\r
  <li><a href="../api/symbols/RotatingTool.html#snapanglemultiple" target="api">RotatingTool.snapAngleMultiple</a> and <a href="../api/symbols/RotatingTool.html#snapangleepsilon" target="api">RotatingTool.snapAngleEpsilon</a> limit the angles to which the user may rotate the <a href="../api/symbols/Part.html#rotateobject" target="api">Part.rotateObject</a>\r
  </li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> (default value is false)</li>\r
  <li><a href="../api/symbols/RotatingTool.html#isenabled" target="api">RotatingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="ArrowAndPageCommands"><a class="not-prose heading-anchor" href="#ArrowAndPageCommands">Arrow and Page commands (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>), panning/scrolling the diagram (<a href="../api/symbols/PanningTool.html" target="api">PanningTool</a> and scrollbars)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowhorizontalscroll" target="api">Diagram.allowHorizontalScroll</a>, <a href="../api/symbols/Diagram.html#allowverticalscroll" target="api">Diagram.allowVerticalScroll</a></li>\r
  <li><a href="../api/symbols/Diagram.html#hashorizontalscrollbar" target="api">Diagram.hasHorizontalScrollbar</a>, <a href="../api/symbols/Diagram.html#hasverticalscrollbar" target="api">Diagram.hasVerticalScrollbar</a></li>\r
  <li><a href="../api/symbols/Diagram.html#scrollmargin" target="api">Diagram.scrollMargin</a> and <a href="../api/symbols/Diagram.html#padding" target="api">Diagram.padding</a></li>\r
  <li><a href="../api/symbols/Diagram.html#scrollmode" target="api">Diagram.scrollMode</a> and <a href="../api/symbols/Diagram.html#positioncomputation" target="api">Diagram.positionComputation</a> for controlling how far the user may scroll</li>\r
  <li><a href="../api/symbols/ToolManager.html#mousewheelbehavior" target="api">ToolManager.mouseWheelBehavior</a> controls whether mouse wheel events scroll or zoom</li>\r
  <li>See the DrawCommandHandler in the <a href="../extensions">Extensions</a> directory for a <a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a> that customizes the behavior of the arrow\r
    keys\r
  </li>\r
  <li><a href="../api/symbols/PanningTool.html#isenabled" target="api">PanningTool.isEnabled</a></li>\r
  <li><a href="../api/symbols/PanningTool.html#bubbles" target="api">PanningTool.bubbles</a> controls whether panning gestures scroll the page rather than the viewport.</li>\r
</ul>\r
\r
<h3 id="SelectAllCommand"><a class="not-prose heading-anchor" href="#SelectAllCommand">SelectAll command (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>), click selecting (<a href="../api/symbols/ClickSelectingTool.html" target="api">ClickSelectingTool</a>), drag selecting (<a href="../api/symbols/DragSelectingTool.html" target="api">DragSelectingTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowselect" target="api">Diagram.allowSelect</a></li>\r
  <li><a href="../api/symbols/Layer.html#allowselect" target="api">Layer.allowSelect</a></li>\r
  <li><a href="../api/symbols/Part.html#selectable" target="api">Part.selectable</a></li>\r
  <li><a href="../api/symbols/Diagram.html#maxselectioncount" target="api">Diagram.maxSelectionCount</a> limits how many selectable <a href="../api/symbols/Part.html" target="api">Part</a>s the user may select</li>\r
  <li><a href="../api/symbols/DragSelectingTool.html#isenabled" target="api">DragSelectingTool.isEnabled</a></li>\r
</ul>\r
\r
<h3 id="UndoRedoCommands"><a class="not-prose heading-anchor" href="#UndoRedoCommands">Undo/Redo commands (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowundo" target="api">Diagram.allowUndo</a></li>\r
  <li><a href="../api/symbols/UndoManager.html#isenabled" target="api">UndoManager.isEnabled</a> (default value is false)</li>\r
  <li><a href="../api/symbols/Diagram.html#isreadonly" target="api">Diagram.isReadOnly</a> and <a href="../api/symbols/Model.html#isreadonly" target="api">Model.isReadOnly</a> (default values are false)</li>\r
</ul>\r
\r
<h3 id="ZoomCommands"><a class="not-prose heading-anchor" href="#ZoomCommands">Zoom commands (<a href="../api/symbols/CommandHandler.html" target="api">CommandHandler</a>), zooming/rescaling the diagram (<a href="../api/symbols/ToolManager.html" target="api">ToolManager</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/Diagram.html#allowzoom" target="api">Diagram.allowZoom</a></li>\r
  <li><a href="../api/symbols/ToolManager.html#mousewheelbehavior" target="api">ToolManager.mouseWheelBehavior</a> controls whether mouse wheel events scroll or zoom</li>\r
  <li><a href="../api/symbols/Diagram.html#minscale" target="api">Diagram.minScale</a>, <a href="../api/symbols/Diagram.html#maxscale" target="api">Diagram.maxScale</a>, and <a href="../api/symbols/Diagram.html#scalecomputation" target="api">Diagram.scaleComputation</a> for controlling how far the user may zoom.</li>\r
</ul>\r
\r
<h3 id="ContextMenus"><a class="not-prose heading-anchor" href="#ContextMenus">Context Menus (<a href="../api/symbols/ContextMenuTool.html" target="api">ContextMenuTool</a>)</a></h3>\r
<ul>\r
  <li><a href="../api/symbols/GraphObject.html#contextmenu" target="api">GraphObject.contextMenu</a></li>\r
  <li><a href="../api/symbols/Diagram.html#contextmenu" target="api">Diagram.contextMenu</a></li>\r
  <li><a href="../api/symbols/ContextMenuTool.html#isenabled" target="api">ContextMenuTool.isEnabled</a></li>\r
</ul>\r
`,codeBlocks:[{id:`isEnabled`,code:`// Disable the diagram!\r
diagram.isEnabled = false;\r
\r
diagram.undoManager.isEnabled = true;\r
\r
diagram.add(  // this is just a visual comment\r
  new go.Part({ location: new go.Point(0, 270) })\r
    .add(\r
      new go.TextBlock("Diagram.isEnabled == false", { font: "16pt bold", stroke: "red" })\r
    )\r
);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    isShadowed: true,\r
    shadowOffset: new go.Spot(3,4),\r
    shadowColor: '#555',\r
    mouseEnter: (e, o) => { o.shadowOffset = new go.Spot(0,1) },\r
    mouseLeave: (e, o) => { o.shadowOffset = new go.Spot(3,4) }\r
  })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#313131", stroke: "#888", strokeWidth: 1,\r
        parameter1: 8, width: 70, height: 70\r
      }),\r
      new go.TextBlock({ font: "bold 22pt tahoma", alignment: new go.Spot(0.1, 0.2, -2, -3) })\r
        .bind("text", "num"),\r
      new go.TextBlock({ font: "20pt tahoma", stroke: "#ccc", alignment: new go.Spot(0.1, 0.2) })\r
        .bind("text", "num"),\r
      new go.TextBlock({ stroke: "#ccc", alignment: new go.Spot(0.1, 0.9) })\r
        .bind("text", "alt")\r
        .bind("font", "alt", n => (n.length > 1)? "bold 8pt tahoma" : "bold 14pt tahoma")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "k7", num: "7", alt: "Home", loc: "0 0" },\r
  { key: "k8", num: "8", alt: "↑", loc: "80 0" },\r
  { key: "k9", num: "9", alt: "PgUp", loc: "160 0" },\r
  { key: "k4", num: "4", alt: "←", loc: "0 80" },\r
  { key: "k5", num: "5", alt: "", loc: "80 80" },\r
  { key: "k6", num: "6", alt: "→", loc: "160 80" },\r
  { key: "k1", num: "1", alt: "End", loc: "0 160" },\r
  { key: "k2", num: "2", alt: "↓", loc: "80 160" },\r
  { key: "k3", num: "3", alt: "PgDn", loc: "160 160" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`isReadOnly`,code:`// Disable diagram modifications, but allow navigation and selection\r
diagram.isReadOnly = true;\r
\r
diagram.undoManager.isEnabled = true;\r
\r
diagram.add(  // this is just a visual comment\r
  new go.Part({ location: new go.Point(0, 270) })\r
    .add(\r
      new go.TextBlock("Diagram.isEnabled == false", { font: "16pt bold", stroke: "red" })\r
    )\r
);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    isShadowed: true,\r
    shadowOffset: new go.Spot(3,4),\r
    shadowColor: '#555',\r
    mouseEnter: (e, o) => { o.shadowOffset = new go.Spot(0,1) },\r
    mouseLeave: (e, o) => { o.shadowOffset = new go.Spot(3,4) }\r
  })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#313131", stroke: "#888", strokeWidth: 1,\r
        parameter1: 8, width: 70, height: 70\r
      }),\r
      new go.TextBlock({ font: "bold 22pt tahoma", alignment: new go.Spot(0.1, 0.2, -2, -3) })\r
        .bind("text", "num"),\r
      new go.TextBlock({ font: "20pt tahoma", stroke: "#ccc", alignment: new go.Spot(0.1, 0.2) })\r
        .bind("text", "num"),\r
      new go.TextBlock({ stroke: "#ccc", alignment: new go.Spot(0.1, 0.9) })\r
        .bind("text", "alt")\r
        .bind("font", "alt", n => (n.length > 1)? "bold 8pt tahoma" : "bold 14pt tahoma")\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: "k7", num: "7", alt: "Home", loc: "0 0" },\r
  { key: "k8", num: "8", alt: "↑", loc: "80 0" },\r
  { key: "k9", num: "9", alt: "PgUp", loc: "160 0" },\r
  { key: "k4", num: "4", alt: "←", loc: "0 80" },\r
  { key: "k5", num: "5", alt: "", loc: "80 80" },\r
  { key: "k6", num: "6", alt: "→", loc: "160 80" },\r
  { key: "k1", num: "1", alt: "End", loc: "0 160" },\r
  { key: "k2", num: "2", alt: "↓", loc: "80 160" },\r
  { key: "k3", num: "3", alt: "PgDn", loc: "160 160" }\r
]);`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`isModelReadOnly`,code:`diagram.model = new go.GraphLinksModel([\r
  { key: "k7", num: "7", alt: "Home", loc: "0 0" },\r
  { key: "k8", num: "8", alt: "↑", loc: "80 0" },\r
  { key: "k9", num: "9", alt: "PgUp", loc: "160 0" },\r
  { key: "k4", num: "4", alt: "←", loc: "0 80" },\r
  { key: "k5", num: "5", alt: "", loc: "80 80" },\r
  { key: "k6", num: "6", alt: "→", loc: "160 80" },\r
  { key: "k1", num: "1", alt: "End", loc: "0 160" },\r
  { key: "k2", num: "2", alt: "↓", loc: "80 160" },\r
  { key: "k3", num: "3", alt: "PgDn", loc: "160 160" }\r
]);\r
\r
// Disable adding or removing parts\r
diagram.model.isReadOnly = true;\r
\r
diagram.undoManager.isEnabled = true;\r
\r
diagram.add(  // this is just a visual comment\r
  new go.Part({ location: new go.Point(0, 270) })\r
    .add(\r
      new go.TextBlock("Diagram.isEnabled == false", { font: "16pt bold", stroke: "red" })\r
    )\r
);\r
\r
diagram.nodeTemplate =\r
  new go.Node("Auto", {\r
    isShadowed: true,\r
    shadowOffset: new go.Spot(3,4),\r
    shadowColor: '#555',\r
    mouseEnter: (e, o) => { o.shadowOffset = new go.Spot(0,1) },\r
    mouseLeave: (e, o) => { o.shadowOffset = new go.Spot(3,4) }\r
  })\r
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)\r
    .add(\r
      new go.Shape("RoundedRectangle", {\r
        fill: "#313131", stroke: "#888", strokeWidth: 1,\r
        parameter1: 8, width: 70, height: 70\r
      }),\r
      new go.TextBlock({ font: "bold 22pt tahoma", alignment: new go.Spot(0.1, 0.2, -2, -3) })\r
        .bind("text", "num"),\r
      new go.TextBlock({ font: "20pt tahoma", stroke: "#ccc", alignment: new go.Spot(0.1, 0.2) })\r
        .bind("text", "num"),\r
      new go.TextBlock({ stroke: "#ccc", alignment: new go.Spot(0.1, 0.9) })\r
        .bind("text", "alt")\r
        .bind("font", "alt", n => (n.length > 1)? "bold 8pt tahoma" : "bold 14pt tahoma")\r
    );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`collapseExpand`,code:`new go.Palette("myPaletteDiv", {\r
  isReadOnly: false,\r
  isModelReadOnly: true,\r
  allowDelete: false,\r
  allowInsert: false,\r
  allowLink: false,\r
  allowMove: false,\r
  allowTextEdit: false,\r
  // maybe other Diagram.allow... properties too, depending on your templates\r
  // also consider disabling Tools\r
  "contextMenuTool.isEnabled": false,\r
  nodeTemplateMap: . . .\r
})`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1yv39re`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};