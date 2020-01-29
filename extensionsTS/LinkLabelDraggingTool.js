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
     * The LinkLabelDraggingTool class lets the user move a label on a {@link Link}.
     *
     * This tool only works when the Link has a label
     * that is positioned at the {@link Link#midPoint} plus some offset.
     * It does not work for labels that have a particular {@link GraphObject#segmentIndex}.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/LinkLabelDragging.html">Link Label Dragging</a> sample.
     * @category Tool Extension
     */
    var LinkLabelDraggingTool = /** @class */ (function (_super) {
        __extends(LinkLabelDraggingTool, _super);
        /**
         * Constructs a LinkLabelDraggingTool and sets the name for the tool.
         */
        function LinkLabelDraggingTool() {
            var _this = _super.call(this) || this;
            /**
             * The label being dragged.
             */
            _this.label = null;
            _this._offset = new go.Point(); // of the mouse relative to the center of the label object
            _this._originalOffset = null;
            _this.name = 'LinkLabelDragging';
            return _this;
        }
        /**
         * From the GraphObject at the mouse point, search up the visual tree until we get to
         * an object that is a label of a Link.
         * @return {GraphObject} This returns null if no such label is at the mouse down point.
         */
        LinkLabelDraggingTool.prototype.findLabel = function () {
            var diagram = this.diagram;
            var e = diagram.lastInput;
            var elt = diagram.findObjectAt(e.documentPoint, null, null);
            if (elt === null || !(elt.part instanceof go.Link))
                return null;
            while (elt !== null && elt.panel !== elt.part) {
                elt = elt.panel;
            }
            // If it's at an arrowhead segment index, don't consider it a label:
            if (elt !== null && (elt.segmentIndex === 0 || elt.segmentIndex === -1))
                return null;
            return elt;
        };
        /**
         * This tool can only start if the mouse has moved enough so that it is not a click,
         * and if the mouse down point is on a GraphObject "label" in a Link Panel,
         * as determined by {@link #findLabel}.
         */
        LinkLabelDraggingTool.prototype.canStart = function () {
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
         * and remember the original value for the label's {@link GraphObject#segmentOffset} property.
         */
        LinkLabelDraggingTool.prototype.doActivate = function () {
            this.startTransaction('Shifted Label');
            this.label = this.findLabel();
            if (this.label !== null) {
                // compute the offset of the mouse-down point relative to the center of the label
                this._offset = this.diagram.firstInput.documentPoint.copy().subtract(this.label.getDocumentPoint(go.Spot.Center));
                this._originalOffset = this.label.segmentOffset.copy();
            }
            _super.prototype.doActivate.call(this);
        };
        /**
         * Stop any ongoing transaction.
         */
        LinkLabelDraggingTool.prototype.doDeactivate = function () {
            _super.prototype.doDeactivate.call(this);
            this.stopTransaction();
        };
        /**
         * Clear any reference to a label element.
         */
        LinkLabelDraggingTool.prototype.doStop = function () {
            this.label = null;
            _super.prototype.doStop.call(this);
        };
        /**
         * Restore the label's original value for {@link GraphObject#segmentOffset}.
         */
        LinkLabelDraggingTool.prototype.doCancel = function () {
            if (this.label !== null && this._originalOffset !== null) {
                this.label.segmentOffset = this._originalOffset;
            }
            _super.prototype.doCancel.call(this);
        };
        /**
         * During the drag, call {@link #updateSegmentOffset} in order to set
         * the {@link GraphObject#segmentOffset} of the label.
         */
        LinkLabelDraggingTool.prototype.doMouseMove = function () {
            if (!this.isActive)
                return;
            this.updateSegmentOffset();
        };
        /**
         * At the end of the drag, update the segment offset of the label and finish the tool,
         * completing a transaction.
         */
        LinkLabelDraggingTool.prototype.doMouseUp = function () {
            if (!this.isActive)
                return;
            this.updateSegmentOffset();
            this.transactionResult = 'Shifted Label';
            this.stopTool();
        };
        /**
         * Save the label's {@link GraphObject#segmentOffset} as a rotated offset from the midpoint of the
         * Link that the label is in.
         */
        LinkLabelDraggingTool.prototype.updateSegmentOffset = function () {
            var lab = this.label;
            if (lab === null)
                return;
            var link = lab.part;
            if (!(link instanceof go.Link))
                return;
            var last = this.diagram.lastInput.documentPoint;
            var idx = lab.segmentIndex;
            var numpts = link.pointsCount;
            // if the label is a "mid" label, assume it is positioned differently from a label at a particular segment
            if (idx < -numpts || idx >= numpts) {
                var mid = link.midPoint;
                // need to rotate this point to account for the angle of the link segment at the mid-point
                var p = new go.Point(last.x - this._offset.x - mid.x, last.y - this._offset.y - mid.y);
                lab.segmentOffset = p.rotate(-link.midAngle);
            }
            else { // handle the label point being on a partiular segment with a given fraction
                var frac = lab.segmentFraction;
                var a = void 0;
                var b = void 0;
                if (idx >= 0) { // indexing forwards
                    a = link.getPoint(idx);
                    b = (idx < numpts - 1) ? link.getPoint(idx + 1) : a;
                }
                else { // or backwards if segmentIndex is negative
                    var i = numpts + idx;
                    a = link.getPoint(i);
                    b = (i > 0) ? link.getPoint(i - 1) : a;
                }
                var labx = a.x + (b.x - a.x) * frac;
                var laby = a.y + (b.y - a.y) * frac;
                var p = new go.Point(last.x - this._offset.x - labx, last.y - this._offset.y - laby);
                var segangle = (idx >= 0) ? a.directionPoint(b) : b.directionPoint(a);
                lab.segmentOffset = p.rotate(-segangle);
            }
        };
        return LinkLabelDraggingTool;
    }(go.Tool));
    exports.LinkLabelDraggingTool = LinkLabelDraggingTool;
});
