/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    exports.NodeLabelDraggingTool = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The NodeLabelDraggingTool class lets the user move a label on a Node.
     *
     * This tool only works when the Node has a label (any GraphObject) marked with
     * { _isNodeLabel: true } that is positioned in a Spot Panel.
     * It works by modifying that label's {@link GraphObject#alignment} property to have an
     * offset from the center of the panel.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsJSM/NodeLabelDragging.html">Node Label Dragging</a> sample.
     * @category Tool Extension
     */
    var NodeLabelDraggingTool = /** @class */ (function (_super) {
        __extends(NodeLabelDraggingTool, _super);
        /**
         * Constructs a NodeLabelDraggingTool and sets the name for the tool.
         */
        function NodeLabelDraggingTool() {
            var _this = _super.call(this) || this;
            /**
             * The label being dragged.
             */
            _this.label = null;
            _this._offset = new go.Point(); // of the mouse relative to the center of the label object
            _this._originalAlignment = go.Spot.Default;
            _this._originalCenter = new go.Point();
            _this.name = 'NodeLabelDragging';
            return _this;
        }
        /**
         * From the GraphObject at the mouse point, search up the visual tree until we get to
         * an object that has the "_isNodeLabel" property set to true, that is in a Spot Panel,
         * and that is not the first element of that Panel (i.e. not the main element of the panel).
         * @return {GraphObject} This returns null if no such label is at the mouse down point.
         */
        NodeLabelDraggingTool.prototype.findLabel = function () {
            var diagram = this.diagram;
            var e = diagram.firstInput;
            var elt = diagram.findObjectAt(e.documentPoint, null, null);
            if (elt === null || !(elt.part instanceof go.Node))
                return null;
            while (elt.panel !== null) {
                if (elt['_isNodeLabel'] && elt.panel.type === go.Panel.Spot && elt.panel.findMainElement() !== elt)
                    return elt;
                elt = elt.panel;
            }
            return null;
        };
        /**
         * This tool can only start if the mouse has moved enough so that it is not a click,
         * and if the mouse down point is on a GraphObject "label" in a Spot Panel,
         * as determined by findLabel().
         */
        NodeLabelDraggingTool.prototype.canStart = function () {
            if (!_super.prototype.canStart.call(this))
                return false;
            var diagram = this.diagram;
            // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
            var e = diagram.lastInput;
            if (!e.left)
                return false;
            if (!this.isBeyondDragSize())
                return false;
            return this.findLabel() !== null;
        };
        /**
         * Start a transaction, call {@link #findLabel} and remember it as the "label" property,
         * and remember the original value for the label's {@link GraphObject#alignment} property.
         */
        NodeLabelDraggingTool.prototype.doActivate = function () {
            this.startTransaction('Shifted Label');
            this.label = this.findLabel();
            if (this.label !== null) {
                // compute the offset of the mouse-down point relative to the center of the label
                this._offset = this.diagram.firstInput.documentPoint.copy().subtract(this.label.getDocumentPoint(go.Spot.Center));
                this._originalAlignment = this.label.alignment.copy();
                var panel = this.label.panel;
                if (panel !== null) {
                    var main = panel.findMainElement();
                    if (main !== null)
                        this._originalCenter = main.getDocumentPoint(go.Spot.Center);
                }
            }
            _super.prototype.doActivate.call(this);
        };
        /**
         * Stop any ongoing transaction.
         */
        NodeLabelDraggingTool.prototype.doDeactivate = function () {
            _super.prototype.doDeactivate.call(this);
            this.stopTransaction();
        };
        /**
         * Clear any reference to a label element.
         */
        NodeLabelDraggingTool.prototype.doStop = function () {
            this.label = null;
            _super.prototype.doStop.call(this);
        };
        /**
         * Restore the label's original value for GraphObject.alignment.
         */
        NodeLabelDraggingTool.prototype.doCancel = function () {
            if (this.label !== null) {
                this.label.alignment = this._originalAlignment;
            }
            _super.prototype.doCancel.call(this);
        };
        /**
         * During the drag, call updateAlignment in order to set the {@link GraphObject#alignment} of the label.
         */
        NodeLabelDraggingTool.prototype.doMouseMove = function () {
            if (!this.isActive)
                return;
            this.updateAlignment();
        };
        /**
         * At the end of the drag, update the alignment of the label and finish the tool,
         * completing a transaction.
         */
        NodeLabelDraggingTool.prototype.doMouseUp = function () {
            if (!this.isActive)
                return;
            this.updateAlignment();
            this.transactionResult = 'Shifted Label';
            this.stopTool();
        };
        /**
         * Save the label's {@link GraphObject#alignment} as an absolute offset from the center of the Spot Panel
         * that the label is in.
         */
        NodeLabelDraggingTool.prototype.updateAlignment = function () {
            if (this.label === null)
                return;
            var last = this.diagram.lastInput.documentPoint;
            var cntr = this._originalCenter;
            this.label.alignment = new go.Spot(0.5, 0.5, last.x - this._offset.x - cntr.x, last.y - this._offset.y - cntr.y);
        };
        return NodeLabelDraggingTool;
    }(go.Tool));
    exports.NodeLabelDraggingTool = NodeLabelDraggingTool;
});
