/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/LocalStorageCommandHandler.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */
import * as go from 'gojs';
/**
 * This CommandHandler class uses localStorage as the repository for the clipboard,
 * rather than an in-memory global variable.
 * It requires that the {@link Diagram.model} be serializable and deserializable using {@link Model.toJson} and {@link Model.fromJson}.
 *
 * As of version 3.1, the functionality is built into the {@link CommandHandler} class.
 * Enable it by setting {@link CommandHandler.storageLocation} to "localStorage".
 * However, the functionality is duplicated here for compatibility with versions earlier than 3.1.
 * @category Extension
 * @deprecated See {@link CommandHandler.storageLocation}
 */
export class LocalStorageCommandHandler extends go.CommandHandler {
    constructor(init) {
        super();
        this._StorageKey = 'go._clipboard';
        this._FormatKey = 'go._clipboardFormat';
        if (init)
            Object.assign(this, init);
    }
    // Storing the clipboard in localStorage
    // This functionality has been subsumed by go.CommandHandler.storageLocation in version 3.1.
    // It remains here for compatibility with versions before 3.1.
    /**
     * This functionality has been subsumed by {@link go.CommandHandler.storageLocation} in version 3.1.
     * Makes a copy of the given collection of {@link go.Part}s
     * and stores it as JSON in LocalStorage.
     * @param coll - a collection of {@link go.Part}s.
     */
    copyToClipboard(coll) {
        if (!this['storageLocation']) {
            try {
                if (coll === null) {
                    window.localStorage.setItem(this._StorageKey, '');
                    window.localStorage.setItem(this._FormatKey, '');
                }
                else {
                    const clipdiag = new go.Diagram(); // create a temporary Diagram
                    // copy from this diagram to the temporary diagram some properties that affects copying:
                    clipdiag.isTreePathToChildren = this.diagram.isTreePathToChildren;
                    clipdiag.toolManager.draggingTool.dragsLink =
                        this.diagram.toolManager.draggingTool.dragsLink;
                    // create a model like this one but with no data
                    clipdiag.model = this.diagram.model.copy();
                    // copy the given Parts into this temporary Diagram
                    this.diagram.copyParts(coll, clipdiag, false);
                    window.localStorage.setItem(this._StorageKey, clipdiag.model.toJson());
                    window.localStorage.setItem(this._FormatKey, clipdiag.model.dataFormat);
                }
                this.diagram.raiseDiagramEvent('ClipboardChanged', coll);
            }
            catch (ex) {
                return;
            }
        }
        else {
            super.copyToClipboard(coll);
        }
    }
    /**
     * This functionality has been subsumed by {@link go.CommandHandler.storageLocation} in version 3.1.
     * If LocalStorage holds JSON for a collection of {@link go.Part}s,
     * and if the {@link go.Model.dataFormat} matches that stored in the clipboard,
     * this makes a copy of the clipboard's parts and adds the copies to this {@link go.Diagram}.
     * @returns a collection of newly pasted {@link go.Part}s
     */
    pasteFromClipboard() {
        if (!this['storageLocation']) {
            const coll = new go.Set();
            try {
                const clipstr = window.localStorage.getItem(this._StorageKey);
                const clipfrmt = window.localStorage.getItem(this._FormatKey);
                if (clipstr === null || clipstr === '' || clipfrmt !== this.diagram.model.dataFormat) {
                    return coll;
                }
                else {
                    const clipdiag = new go.Diagram(); // create a temporary Diagram
                    // recover the model from the clipboard rendering
                    clipdiag.model = go.Model.fromJson(clipstr);
                    // copy all the CLIPDIAG Parts into this Diagram
                    const allparts = new go.Set();
                    allparts.addAll(clipdiag.parts).addAll(clipdiag.nodes).addAll(clipdiag.links);
                    const copymap = this.diagram.copyParts(allparts, this.diagram, false);
                    // return a Set of the copied Parts
                    return new go.Set().addAll(copymap.iteratorValues);
                }
            }
            catch (ex) {
                return coll;
            }
        }
        else {
            return super.pasteFromClipboard();
        }
    }
    /**
     * This functionality has been subsumed by {@link go.CommandHandler.storageLocation} in version 3.1.
     * This predicate controls whether or not the user can invoke the {@link pasteSelection} command.
     * This works just like {@link go.CommandHandler.canPasteSelection}, but looks at LocalStorage instead of a static variable.
     */
    canPasteSelection(pos) {
        if (!this['storageLocation']) {
            const diagram = this.diagram;
            if (diagram.isReadOnly || diagram.isModelReadOnly)
                return false;
            if (!diagram.allowInsert || !diagram.allowClipboard)
                return false;
            try {
                const clipstr = window.localStorage.getItem(this._StorageKey);
                const clipfrmt = window.localStorage.getItem(this._FormatKey);
                if (clipstr === null || clipstr === '')
                    return false;
                if (clipfrmt !== diagram.model.dataFormat)
                    return false;
                return true;
            }
            catch (ex) {
                return false;
            }
        }
        else {
            return super.canPasteSelection(pos);
        }
    }
}
