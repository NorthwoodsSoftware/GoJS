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
     * The NonRealtimeDraggingTool class lets the user drag an image instead of actually moving any selected nodes,
     * until the mouse-up event.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/NonRealtimeDragging.html">Non Realtime Dragging</a> sample.
     * @category Tool Extension
     */
    var NonRealtimeDraggingTool = /** @class */ (function (_super) {
        __extends(NonRealtimeDraggingTool, _super);
        function NonRealtimeDraggingTool() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._imagePart = null; // a Part holding a translucent image of what would be dragged
            _this._ghostDraggedParts = null; // a Map of the _imagePart and its dragging information
            _this._originalDraggedParts = null; // the saved normal value of DraggingTool.draggedParts
            return _this;
        }
        /**
         * Call the base method, and then make an image of the returned collection,
         * show it using a Picture, and hold the Picture in a temporary Part, as _imagePart.
         * @param {Iterable.<Part>} parts A {@link Set} or {@link List} of {@link Part}s.
         * @return {Map.<Part,DraggingInfo>}
         */
        NonRealtimeDraggingTool.prototype.computeEffectiveCollection = function (coll) {
            var map = _super.prototype.computeEffectiveCollection.call(this, coll, this.dragOptions);
            if (this.isActive && this._imagePart === null) {
                var bounds = this.diagram.computePartsBounds(map.toKeySet());
                var offset = this.diagram.lastInput.documentPoint.copy().subtract(bounds.position);
                var $ = go.GraphObject.make;
                this._imagePart =
                    $(go.Part, { layerName: 'Tool', opacity: 0.5, locationSpot: new go.Spot(0, 0, offset.x, offset.y) }, $(go.Picture, { element: this.diagram.makeImage({ parts: map.toKeySet() }) }));
            }
            return map;
        };
        /**
         * When activated, replace the {@link #draggedParts} with the ghost dragged parts, which
         * consists of just one Part, the image, added to the Diagram at the current mouse point.
         */
        NonRealtimeDraggingTool.prototype.doActivate = function () {
            _super.prototype.doActivate.call(this);
            if (this._imagePart !== null) {
                this._imagePart.location = this.diagram.lastInput.documentPoint;
                this.diagram.add(this._imagePart);
                this._originalDraggedParts = this.draggedParts;
                this._ghostDraggedParts = _super.prototype.computeEffectiveCollection.call(this, new go.List().add(this._imagePart), this.dragOptions);
                this.draggedParts = this._ghostDraggedParts;
            }
        };
        /**
         * When deactivated, make sure any image is removed from the Diagram and all references are cleared out.
         */
        NonRealtimeDraggingTool.prototype.doDeactivate = function () {
            if (this._imagePart !== null) {
                this.diagram.remove(this._imagePart);
            }
            this._imagePart = null;
            this._ghostDraggedParts = null;
            this._originalDraggedParts = null;
            _super.prototype.doDeactivate.call(this);
        };
        /**
         * Do the normal mouse-up behavior, but only after restoring {@link #draggedParts}.
         */
        NonRealtimeDraggingTool.prototype.doMouseUp = function () {
            if (this._originalDraggedParts !== null) {
                this.draggedParts = this._originalDraggedParts;
            }
            _super.prototype.doMouseUp.call(this);
        };
        /**
         * If the user changes to "copying" mode by holding down the Control key,
         * return to the regular behavior and remove the image.
         */
        NonRealtimeDraggingTool.prototype.doKeyDown = function () {
            if (this._imagePart !== null && this._originalDraggedParts !== null &&
                (this.diagram.lastInput.control || this.diagram.lastInput.meta) && this.mayCopy()) {
                this.draggedParts = this._originalDraggedParts;
                this.diagram.remove(this._imagePart);
            }
            _super.prototype.doKeyDown.call(this);
        };
        /**
         * If the user changes back to "moving" mode,
         * show the image again and go back to dragging the ghost dragged parts.
         */
        NonRealtimeDraggingTool.prototype.doKeyUp = function () {
            if (this._imagePart !== null && this._ghostDraggedParts !== null && this.mayMove()) {
                this._imagePart.location = this.diagram.lastInput.documentPoint;
                this.diagram.add(this._imagePart);
                this.draggedParts = this._ghostDraggedParts;
            }
            _super.prototype.doKeyUp.call(this);
        };
        return NonRealtimeDraggingTool;
    }(go.DraggingTool));
    exports.NonRealtimeDraggingTool = NonRealtimeDraggingTool;
});
