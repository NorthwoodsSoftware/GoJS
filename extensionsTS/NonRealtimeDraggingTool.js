var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
        define(["require", "exports", "../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    // A custom DraggingTool for dragging an image instead of actually moving any selected nodes,
    // until the mouse-up event.
    /**
    * @constructor
    * @extends DraggingTool
    * @class
    */
    var NonRealtimeDraggingTool = /** @class */ (function (_super) {
        __extends(NonRealtimeDraggingTool, _super);
        function NonRealtimeDraggingTool() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** @type {Part} */
            _this._imagePart = null; // a Part holding a translucent image of what would be dragged
            /** @type {Map.<Part,DraggingInfo>} */
            _this._ghostDraggedParts = null; // a Map of the _imagePart and its dragging information
            /** @type {Map.<Part,DraggingInfo>} */
            _this._originalDraggedParts = null; // the saved normal value of DraggingTool.draggedParts
            return _this;
        }
        /**
          * Call the base method, and then make an image of the returned collection,
          * show it using a Picture, and hold the Picture in a temporary Part, as _imagePart.
          * @this {NonRealtimeDraggingTool}
          * @param {Iterable.<Part>} parts A {@link Set} or {@link List} of {@link Part}s.
          * @return {Map.<Part,DraggingInfo>}
          */
        NonRealtimeDraggingTool.prototype.computeEffectiveCollection = function (coll) {
            var map = go.DraggingTool.prototype.computeEffectiveCollection.call(this, coll);
            if (this.isActive && this._imagePart === null) {
                var bounds = this.diagram.computePartsBounds(map.toKeySet());
                var offset = this.diagram.lastInput.documentPoint.copy().subtract(bounds.position);
                var $ = go.GraphObject.make;
                this._imagePart =
                    $(go.Part, { layerName: "Tool", opacity: 0.5, locationSpot: new go.Spot(0, 0, offset.x, offset.y) }, $(go.Picture, { element: this.diagram.makeImage({ parts: map.toKeySet() }) }));
            }
            return map;
        };
        ;
        /**
        * When activated, replace the DraggingTool.draggedParts with the _ghostDraggedParts, which
        * consists of just one Part, the _imagePart, added to the Diagram at the current mouse point.
        * @this {NonRealtimeDraggingTool}
        */
        NonRealtimeDraggingTool.prototype.doActivate = function () {
            go.DraggingTool.prototype.doActivate.call(this);
            if (this._imagePart !== null) {
                this._imagePart.location = this.diagram.lastInput.documentPoint;
                this.diagram.add(this._imagePart);
                this._originalDraggedParts = this.draggedParts;
                this._ghostDraggedParts = go.DraggingTool.prototype.computeEffectiveCollection.call(this, new go.List().addAll([this._imagePart]));
                this.draggedParts = this._ghostDraggedParts;
            }
        };
        ;
        /**
        * When deactivated, make sure any _imagePart is removed from the Diagram and all references are cleared out.
        * @this {NonRealtimeDraggingTool}
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
        ;
        /**
        * Do the normal mouse-up behavior, but only after restoring DraggingTool.draggedParts.
        * @this {NonRealtimeDraggingTool}
        */
        NonRealtimeDraggingTool.prototype.doMouseUp = function () {
            if (this._originalDraggedParts !== null) {
                this.draggedParts = this._originalDraggedParts;
            }
            _super.prototype.doMouseUp.call(this);
        };
        ;
        /**
        * If the user changes to "copying" mode by holding down the Control key,
        * return to the regular behavior and remove the _imagePart.
        * @this {NonRealtimeDraggingTool}
        */
        NonRealtimeDraggingTool.prototype.doKeyDown = function () {
            if (this._imagePart !== null && this._originalDraggedParts !== null &&
                (this.diagram.lastInput.control || this.diagram.lastInput.meta) && this.mayCopy()) {
                this.draggedParts = this._originalDraggedParts;
                this.diagram.remove(this._imagePart);
            }
            _super.prototype.doKeyDown.call(this);
        };
        ;
        /**
        * If the user changes back to "moving" mode,
        * show the _imagePart again and go back to dragging the _ghostDraggedParts.
        * @this {NonRealtimeDraggingTool}
        */
        NonRealtimeDraggingTool.prototype.doKeyUp = function () {
            if (this._imagePart !== null && this._ghostDraggedParts !== null && this.mayMove()) {
                this._imagePart.location = this.diagram.lastInput.documentPoint;
                this.diagram.add(this._imagePart);
                this.draggedParts = this._ghostDraggedParts;
            }
            _super.prototype.doKeyUp.call(this);
        };
        ;
        return NonRealtimeDraggingTool;
    }(go.DraggingTool));
    exports.NonRealtimeDraggingTool = NonRealtimeDraggingTool;
});
