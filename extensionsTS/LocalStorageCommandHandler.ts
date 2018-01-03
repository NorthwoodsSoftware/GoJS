"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

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
export class LocalStorageCommandHandler extends go.CommandHandler {
	private StorageKey: string = "go._clipboard";
	private FormatKey: string = "go._clipboardFormat";

  /**
		* @override
		* @this {LocalStorageCommandHandler}
		* @param {Iterable.<Part>} coll a collection of {@link Part}s.
		*/
	public copyToClipboard(coll: go.Iterable<go.Part>): void {
		try {
			if (coll === null) {
				window.localStorage.setItem(this.StorageKey, "");
				window.localStorage.setItem(this.FormatKey, "");
			} else {
				const clipdiag = new go.Diagram();  // create a temporary Diagram
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
	}

	/**
		* @override
		* @this {LocalStorageCommandHandler}
		* @return {Set.<Part>} a collection of newly pasted {@link Part}s
		*/
	public pasteFromClipboard(): go.Set<go.Part> {
		const coll = new go.Set(go.Part);
		try {
			const clipstr = window.localStorage.getItem(this.StorageKey);
			const clipfrmt = window.localStorage.getItem(this.FormatKey);
			if (clipstr === null || clipstr === "" || clipfrmt !== this.diagram.model.dataFormat) {
				return coll as go.Set<go.Part>;
			} else {
				const clipdiag = new go.Diagram();  // create a temporary Diagram
				// recover the model from the clipboard rendering
				clipdiag.model = go.Model.fromJson(clipstr);
				// copy all the CLIPDIAG Parts into this Diagram
				const allparts  = new go.Set(go.Part) as go.Set<go.Part>;
				allparts.addAll(clipdiag.parts).addAll(clipdiag.nodes).addAll(clipdiag.links);
				const copymap = this.diagram.copyParts(allparts, this.diagram, false);
				// return a Set of the copied Parts
				return new go.Set(go.Part).addAll(copymap.iteratorValues) as go.Set<go.Part>;
			}
		} catch (ex) {
			// fallback implementation
			return go.CommandHandler.prototype.pasteFromClipboard.call(this);
		}
	}

	/**
		* @override
		* @this {LocalStorageCommandHandler}
		* @return {boolean}
		*/
	public canPasteSelection(): boolean {
		const diagram = this.diagram;
		if (diagram.isReadOnly || diagram.isModelReadOnly) return false;
		if (!diagram.allowInsert || !diagram.allowClipboard) return false;
		try {
			const clipstr = window.localStorage.getItem(this.StorageKey);
			const clipfrmt = window.localStorage.getItem(this.FormatKey);
			if (clipstr === null || clipstr === "") return false;
			if (clipfrmt !== diagram.model.dataFormat) return false;
			return true;
		} catch (ex) {
			// fallback implementation
			return go.CommandHandler.prototype.canPasteSelection();
		}
	}
}