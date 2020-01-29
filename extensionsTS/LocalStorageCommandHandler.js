/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * This CommandHandler class uses localStorage as the repository for the clipboard,
     * rather than an in-memory global variable.
     * It requires that the {@link Diagram#model} be serializable and deserializable using {@link Model#toJson} and {@link Model.fromJson}.
     *
     * The {@link #copyToClipboard} and {@link #pasteFromClipboard} functions fall back to using the standard definitions
     * if there are any errors calling `Storage.getItem` or `Storage.setItem`.
     *
     * Typical usage:
     * ```js
     *   $(go.Diagram, "myDiagramDiv",
     *     {
     *       commandHandler: $(LocalStorageCommandHandler),
     *       ...
     *     }
     *   )
     * ```
     * or:
     * ```js
     *   myDiagram.commandHandler = new LocalStorageCommandHandler();
     * ```
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/LocalStorageCommandHandler.html">Local Storage Commands</a> sample.
     * @category Extension
     */
    var LocalStorageCommandHandler = /** @class */ (function (_super) {
        __extends(LocalStorageCommandHandler, _super);
        function LocalStorageCommandHandler() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.StorageKey = 'go._clipboard';
            _this.FormatKey = 'go._clipboardFormat';
            return _this;
        }
        /**
         * Makes a copy of the given collection of {@link Part}s
         * and stores it as JSON in LocalStorage.
         * @param {Iterable.<Part>} coll a collection of {@link Part}s.
         */
        LocalStorageCommandHandler.prototype.copyToClipboard = function (coll) {
            try {
                if (coll === null) {
                    window.localStorage.setItem(this.StorageKey, '');
                    window.localStorage.setItem(this.FormatKey, '');
                }
                else {
                    var clipdiag = new go.Diagram(); // create a temporary Diagram
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
            }
            catch (ex) {
                // fallback implementation
                _super.prototype.copyToClipboard.call(this, coll);
            }
        };
        /**
         * If LocalStorage holds JSON for a collection of {@link Part}s,
         * and if the {@link Model#dataFormat} matches that stored in the clipboard,
         * this makes a copy of the clipboard's parts and adds the copies to this {@link Diagram}.
         * @return {Set.<Part>} a collection of newly pasted {@link Part}s
         */
        LocalStorageCommandHandler.prototype.pasteFromClipboard = function () {
            var coll = new go.Set();
            try {
                var clipstr = window.localStorage.getItem(this.StorageKey);
                var clipfrmt = window.localStorage.getItem(this.FormatKey);
                if (clipstr === null || clipstr === '' || clipfrmt !== this.diagram.model.dataFormat) {
                    return coll;
                }
                else {
                    var clipdiag = new go.Diagram(); // create a temporary Diagram
                    // recover the model from the clipboard rendering
                    clipdiag.model = go.Model.fromJson(clipstr);
                    // copy all the CLIPDIAG Parts into this Diagram
                    var allparts = new go.Set();
                    allparts.addAll(clipdiag.parts).addAll(clipdiag.nodes).addAll(clipdiag.links);
                    var copymap = this.diagram.copyParts(allparts, this.diagram, false);
                    // return a Set of the copied Parts
                    return new go.Set().addAll(copymap.iteratorValues);
                }
            }
            catch (ex) {
                // fallback implementation
                return _super.prototype.pasteFromClipboard.call(this);
            }
        };
        /**
         * This predicate controls whether or not the user can invoke the {@link #pasteSelection} command.
         *
         * This works just like {@link CommandHandler#canPasteSelection}, but looks at LocalStorage instead of a static variable.
         */
        LocalStorageCommandHandler.prototype.canPasteSelection = function (pos) {
            var diagram = this.diagram;
            if (diagram.isReadOnly || diagram.isModelReadOnly)
                return false;
            if (!diagram.allowInsert || !diagram.allowClipboard)
                return false;
            try {
                var clipstr = window.localStorage.getItem(this.StorageKey);
                var clipfrmt = window.localStorage.getItem(this.FormatKey);
                if (clipstr === null || clipstr === '')
                    return false;
                if (clipfrmt !== diagram.model.dataFormat)
                    return false;
                return true;
            }
            catch (ex) {
                // fallback implementation
                return go.CommandHandler.prototype.canPasteSelection(pos);
            }
        };
        return LocalStorageCommandHandler;
    }(go.CommandHandler));
    exports.LocalStorageCommandHandler = LocalStorageCommandHandler;
});
