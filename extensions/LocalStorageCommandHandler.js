"use strict";
/*
*  Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved.
*/

/**
* @constructor
* @extends CommandHandler
* @class 
* This CommandHandler class uses localStorage as the repository for the clipboard,
* rather than an in-memory global variable.
* It requires that the {@link Diagram#model} be serializable and deserializable using {@link Model#toJson} and {@link Model.fromJson}.
* <p>
* The {@link #copyToClipboard} and {@link #pasteFromClipboard} functions fall back to using the standard definitions
* if there are any errors calling <code>Storage.getItem</code> or <code>Storage.setItem</code>.
* <p>
* Typical usage:
* <pre>
*   $(go.Diagram, "myDiagramDiv",
*     {
*       commandHandler: $(LocalStorageCommandHandler),
*       . . .
*     }
*   )
* </pre>
* or:
* <pre>
*    myDiagram.commandHandler = new LocalStorageCommandHandler();
* </pre>
*/
function LocalStorageCommandHandler() {
  go.CommandHandler.call(this);
  this.StorageKey = "go._clipboard";
  this.FormatKey = "go._clipboardFormat";
}
go.Diagram.inherit(LocalStorageCommandHandler, go.CommandHandler);

/**
* @override
* @this {LocalStorageCommandHandler}
* @param {Iterable.<Part>} coll a collection of {@link Part}s.
*/
LocalStorageCommandHandler.prototype.copyToClipboard = function(coll) {
  try {
    if (coll === null) {
      window.localStorage.setItem(this.StorageKey, "");
      window.localStorage.setItem(this.FormatKey, "");
    } else {
      var clipdiag = new go.Diagram();  // create a temporary Diagram
      // copy from this diagram to the temporary diagram some properties that affects copying:
      clipdiag.isTreePathToChildren = this.diagram.isTreePathToChildren;
      clipdiag.toolManager.draggingTool.dragsLink = this.diagram.toolManager.draggingTool.dragsLink;
      // create a model like this one but with no data
      clipdiag.model = this.diagram.model.copy();
      // copy the given Parts into this temporary Diagram
      this.diagram.copyParts(coll, clipdiag, false);

      window.localStorage.setItem(this.StorageKey, clipdiag.model.toJson());
      window.localStorage.setItem(this.FormatKey, clipdiag.model.dataFormat);
    }
  } catch (ex) {
    // fallback implementation
    go.CommandHandler.prototype.copyToClipboard.call(this, coll);
  }
};

/**
* @override
* @this {LocalStorageCommandHandler}
* @return {Set.<Part>} a collection of newly pasted {@link Part}s
*/
LocalStorageCommandHandler.prototype.pasteFromClipboard = function() {
  var coll = new go.Set(go.Part);
  try {
    var clipstr = window.localStorage.getItem(this.StorageKey);
    var clipfrmt = window.localStorage.getItem(this.FormatKey);
    if (clipstr === null || clipstr === "" || clipfrmt !== this.diagram.model.dataFormat) {
      return coll;
    } else {
      var clipdiag = new go.Diagram();  // create a temporary Diagram
      // recover the model from the clipboard rendering
      clipdiag.model = go.Model.fromJson(clipstr);
      // copy all the CLIPDIAG Parts into this Diagram
      var copymap = this.diagram.copyParts(clipdiag.parts.concat(clipdiag.nodes).concat(clipdiag.links), this.diagram, false);
      // return a Set of the copied Parts
      return new go.Set(go.Part).addAll(copymap.iteratorValues);
    }
  } catch (ex) {
    // fallback implementation
    return go.CommandHandler.prototype.pasteFromClipboard.call(this);
  }
};

/**
* @override
* @this {LocalStorageCommandHandler}
* @return {boolean}
*/
LocalStorageCommandHandler.prototype.canPasteSelection = function() {
  var diagram = this.diagram;
  if (diagram === null || diagram.isReadOnly || diagram.isModelReadOnly) return false;
  if (!diagram.allowInsert || !diagram.allowClipboard) return false;
  try {
    var clipstr = window.localStorage.getItem(this.StorageKey);
    var clipfrmt = window.localStorage.getItem(this.FormatKey);
    if (clipstr === null || clipstr === "") return false;
    if (clipfrmt !== diagram.model.dataFormat) return false;
    return true;
  } catch (ex) {
    // fallback implementation
    return go.CommandHandler.prototype.canPasteSelection();
  }
};