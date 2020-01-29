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
     * The RealtimeDragSelectingTool class lets the user select and deselect Parts within the {@link DragSelectingTool#box}
     * during a drag, not just at the end of the drag.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/RealtimeDragSelecting.html">Realtime Drag Selecting</a> sample.
     * @category Tool Extension
     */
    var RealtimeDragSelectingTool = /** @class */ (function (_super) {
        __extends(RealtimeDragSelectingTool, _super);
        function RealtimeDragSelectingTool() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._originalSelection = new go.Set();
            _this._temporarySelection = new go.Set();
            return _this;
        }
        /**
         * Remember the original collection of selected Parts.
         */
        RealtimeDragSelectingTool.prototype.doActivate = function () {
            _super.prototype.doActivate.call(this);
            // keep a copy of the original Set of selected Parts
            this._originalSelection = this.diagram.selection.copy();
            // these Part.isSelected may have been temporarily modified
            this._temporarySelection.clear();
            this.diagram.raiseDiagramEvent('ChangingSelection');
        };
        /**
         * Release any references to selected Parts.
         */
        RealtimeDragSelectingTool.prototype.doDeactivate = function () {
            this.diagram.raiseDiagramEvent('ChangedSelection');
            this._originalSelection.clear();
            this._temporarySelection.clear();
            _super.prototype.doDeactivate.call(this);
        };
        /**
         * Restore the selection which may have been modified during a drag.
         */
        RealtimeDragSelectingTool.prototype.doCancel = function () {
            var orig = this._originalSelection;
            orig.each(function (p) { p.isSelected = true; });
            this._temporarySelection.each(function (p) { if (!orig.contains(p))
                p.isSelected = false; });
            _super.prototype.doCancel.call(this);
        };
        /**
         * Select Parts within the bounds of the drag-select box.
         */
        RealtimeDragSelectingTool.prototype.doMouseMove = function () {
            if (this.isActive) {
                _super.prototype.doMouseMove.call(this);
                this.selectInRect(this.computeBoxBounds());
            }
        };
        /**
         * Select Parts within the bounds of the drag-select box.
         */
        RealtimeDragSelectingTool.prototype.doKeyDown = function () {
            if (this.isActive) {
                _super.prototype.doKeyDown.call(this);
                this.selectInRect(this.computeBoxBounds());
            }
        };
        /**
         * Select Parts within the bounds of the drag-select box.
         */
        RealtimeDragSelectingTool.prototype.doKeyUp = function () {
            if (this.isActive) {
                _super.prototype.doKeyUp.call(this);
                this.selectInRect(this.computeBoxBounds());
            }
        };
        /**
         * For a given rectangle, select Parts that are within that rectangle.
         * @param {Rect} r rectangular bounds in document coordinates.
         */
        RealtimeDragSelectingTool.prototype.selectInRect = function (r) {
            var diagram = this.diagram;
            var orig = this._originalSelection;
            var temp = this._temporarySelection;
            var e = diagram.lastInput;
            var found = diagram.findPartsIn(r, this.isPartialInclusion);
            if (e.control || e.meta) { // toggle or deselect
                if (e.shift) { // deselect only
                    temp.each(function (p) { if (!found.contains(p))
                        p.isSelected = orig.contains(p); });
                    found.each(function (p) { p.isSelected = false; temp.add(p); });
                }
                else { // toggle selectedness of parts based on _originalSelection
                    temp.each(function (p) { if (!found.contains(p))
                        p.isSelected = orig.contains(p); });
                    found.each(function (p) { p.isSelected = !orig.contains(p); temp.add(p); });
                }
            }
            else if (e.shift) { // extend selection only
                temp.each(function (p) { if (!found.contains(p))
                    p.isSelected = orig.contains(p); });
                found.each(function (p) { p.isSelected = true; temp.add(p); });
            }
            else { // select found parts, and unselect all other previously selected parts
                temp.each(function (p) { if (!found.contains(p))
                    p.isSelected = false; });
                orig.each(function (p) { if (!found.contains(p))
                    p.isSelected = false; });
                found.each(function (p) { p.isSelected = true; temp.add(p); });
            }
        };
        return RealtimeDragSelectingTool;
    }(go.DragSelectingTool));
    exports.RealtimeDragSelectingTool = RealtimeDragSelectingTool;
});
